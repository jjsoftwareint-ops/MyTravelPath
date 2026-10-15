#!/usr/bin/env python3
"""Build a densified GPX (track + waypoints + elevation) from a route spec.

usage: build_gpx.py spec.json out.gpx [--spacing 8] [--max-points 1800] [--no-elevation] [--maplinks html|plain] [--kml out.kml]
  --max-points: Google My Maps only lets you edit a line with fewer than ~2000 vertices. Tracks above the cap are
                thinned (Douglas-Peucker on straight stretches; corners and the point nearest each pin are kept).
  --maplinks html : append '<br><a href=..>Open Naver Map</a>' to each description. Rendered by Google My Maps only
                    when imported as KML; a GPX import re, shows the tags as text.
  --maplinks plain: append a real line break + 'Open Naver Map: <url>' (My Maps auto-links bare URLs). Use for GPX/CSV.
  Both add GPX <link> elements. The KML written by --kml always uses the html form.
  --kml      also writes a KML (line + pins, HTML descriptions in CDATA), the format Google My Maps imports most faithfully.

spec.json:
{
  "name": "track name", "desc": "metadata description", "link": "https://youtu.be/...",
  "segments": [ {"label": "...", "approx": false, "coords": "lat,lon lat,lon ..."}, ... ],
  "waypoints": [ {"lat": 0, "lon": 0, "name": "1. ...", "desc": "...", "label": "Start", "icon": "start",
                  "naver_id": "1127977354" | "address": "서울 용산구 후암동 418-32"}, ... ]
Every waypoint needs "naver_id" (a venue, from naver_place.py) or "address" (a street/lot address, from
reverse_address.py); the build refuses a pin with neither, because coordinate searches don't work in the Naver app.
}
waypoint "icon" (optional): one of ICONS below. When omitted, the first pin is "start", the last "end", and the rest
are chosen from keywords in label/name/desc (AUTO_ICON). The build prints the chosen icon per pin: review that list.
"line_name" (optional): name of the KML line placemark (default "Walking route").
"naver_id" (optional, per waypoint): Naver place id from naver_place.py → the Naver link opens the place's own page.
Segments are chained in order (each starts where the previous ended). Points farther apart than --spacing are
linearly interpolated. Elevation comes from open-meteo (30 m DEM). Output is validated as XML.
"""
import argparse, json, math, re, subprocess, sys, urllib.parse, xml.dom.minidom
from datetime import datetime, timezone


def hav(a, b):
    R = 6371000; p1, p2 = math.radians(a[0]), math.radians(b[0])
    h = math.sin((p2 - p1) / 2) ** 2 + math.cos(p1) * math.cos(p2) * math.sin(math.radians(b[1] - a[1]) / 2) ** 2
    return 2 * R * math.asin(math.sqrt(h))


PIN_PREFIX = '*CLICK* '   # user preference 2026-10-14: every pin name starts with this so visitors know to tap it


KOREAN_BRACKET = re.compile(r'\s*\(([^()]*[\uac00-\ud7a3][^()]*)\)')


def name_parts(name):
    """Split 'English (한국어)' → ('English', 'English (한국어)'). Names without a Korean bracket give (name, None).
    The pin title shows only the English; the full form goes on the first line of the description (user rule
    2026-10-14) so the Korean is there for matching signs when the pin is opened."""
    name = name.replace(PIN_PREFIX, '')
    if KOREAN_BRACKET.search(name):
        return KOREAN_BRACKET.sub('', name).strip(), name
    return name, None


def pin_name(name):
    """Pin title for GPX/KML: English only, prefixed with PIN_PREFIX."""
    return PIN_PREFIX + name_parts(name)[0]


def with_korean_line(desc, name, html=True):
    """Prepend the 'English (한국어)' line to a description when the name carries a Korean bracket."""
    full = name_parts(name)[1]
    if not full:
        return desc
    return (f'<b>{esc(full)}</b><br>' if html else full + '\n') + desc


def naver_url(lat, lon, naver_id=None, address=None):
    """Naver Map link: the place's own entry page when its id is known (from naver_place.py), else a search for
    the pin's street/lot address (from reverse_address.py or the user). Never a coordinate search: the Naver Map
    app cannot resolve "lat,lon" queries (found 2026-10-12), so such a link lands nowhere on phones."""
    if naver_id:
        return (f"https://map.naver.com/p/entry/place/{naver_id}?lng={lon:.7f}&lat={lat:.7f}"
                f"&placePath=%2Fhome&entry=plt&searchType=place&c=15.00,0,0,0,dh")
    if address:
        return 'https://map.naver.com/p/search/' + urllib.parse.quote(address)
    raise SystemExit(f"pin at {lat:.6f},{lon:.6f} has neither naver_id nor address: run scripts/reverse_address.py "
                     f"on the spec (or add \"address\") before building")


def map_links(lat, lon, label, naver_id=None, address=None):
    """Pin URL(s) to append to a description: Naver Map only.
    Kakao Map links are never generated (user preference, 2026-10-11); `label` is kept for call compatibility."""
    return {'Naver Map': naver_url(lat, lon, naver_id, address)}


def html_desc(w, maplinks):
    """Description text plus the 'Open Naver Map' line.
    maplinks: None | 'html' (<br><a href>, for KML) | 'plain' (newline + 'Open Naver Map: url', for GPX/CSV)."""
    desc = with_korean_line(w.get('desc', ''), w['name'], html=(maplinks != 'plain'))
    if maplinks:
        links = map_links(w['lat'], w['lon'], w.get('label') or w['name'], w.get('naver_id'), w.get('address'))
        if maplinks == 'html':
            desc += ''.join(f'<br><a href="{u}">Open {k}</a>' for k, u in links.items())
        else:
            desc += ''.join(f'\nOpen {k}: {u}' for k, u in links.items())
    return desc


# Google My Maps icon ids (its own "newer" icon set; ids/names extracted from the mapspro JS). On import, My Maps
# resolves styleUrl "#icon-<id>-<RRGGBB>"; the href below is the same image My Maps serves, so other apps show it too.
ICONS = {  # key: (id, colour, image name, GPX <sym>)
    'start':       ('1574', '0F9D58', 'flag',                'Flag, Green'),
    'end':         ('1661', 'DB4437', 'racetrack-flag',      'Flag, Red'),
    'funicular':   ('1533', '4186F0', 'cablecar-funicular',  'Car'),
    'elevator':    ('1782', '4186F0', 'elevator',            'Building'),
    'stairs':      ('1877', '4186F0', 'stairs',              'Trail Head'),
    'camera':      ('1535', 'E91E63', 'camera-photo',        'Scenic Area'),   # same as viewpoint
    'viewpoint':   ('1535', 'E91E63', 'camera-photo',        'Scenic Area'),   # pink camera; never binoculars (user rule 2026-10-14)
    'entrance':    ('1783', '4186F0', 'entrance',            'Waypoint'),
    'plaque':      ('1600', '4186F0', 'historic-plaque',     'Information'),
    'market':      ('1686', '4186F0', 'shop',                'Shopping Center'),
    'convenience': ('1631', '4186F0', 'moon',                'Convenience Store'),
    'cafe':        ('1534', 'E91E63', 'cafe-cup',            'Restaurant'),   # pink: food & drink (user rule 2026-10-15)
    'bar':         ('1517', 'E91E63', 'bar-cocktail',        'Bar'),   # pink: food & drink (user rule 2026-10-15)
    'restaurant':  ('1577', 'E91E63', 'food-fork-knife',     'Restaurant'),   # pink: food & drink (user rule 2026-10-15)
    'bus':         ('1532', '4186F0', 'bus',                 'Ground Transportation'),
    'subway':      ('1719', '4186F0', 'tram',                'Ground Transportation'),
    'church':      ('1706', '4186F0', 'temple',              'Church'),
    'monument':    ('1599', '4186F0', 'historic-monument',   'Museum'),
    'historic':    ('1598', '4186F0', 'historic-building',   'Museum'),
    'museum':      ('1636', '4186F0', 'museum',              'Museum'),
    'library':     ('1664', '4186F0', 'reading-library',     'Building'),
    'trail':       ('1597', '4186F0', 'hiking-trailhead',    'Trail Head'),
    'park':        ('1720', '4186F0', 'tree',                'Park'),
    'walking':     ('1731', '4186F0', 'walking-pedestrian',  'Waypoint'),
    'police':      ('1655', '4186F0', 'police-badge',        'Police Station'),
    'mountain':    ('1634', '4186F0', 'mountain',            'Summit'),
    'hotel':       ('1602', '4186F0', 'hotel-bed',           'Lodging'),
    'tent':        ('1765', 'DB4437', 'camping-tent',        'Shopping Center'),
    'flower':      ('1582', 'E91E63', 'garden-flower',       'Park'),   # cherry-blossom routes (pink)
    'toilet':      ('1733', '4186F0', 'wc-unisex',           'Restroom'),
    'dot':         ('1499', 'DB4437', 'shape_circle',        'Waypoint'),   # red dot: passing-by waypoint
    'stamp':       ('1862', '7B1FA2', 'seal',                'Waypoint'),   # Olle stamp station (purple seal)
    'harbor':      ('1623', '4186F0', 'marine-anchor',       'Marina'),
    'bridge':      ('1528', '4186F0', 'bridge',              'Bridge'),
    'waterfall':   ('1892', '4186F0', 'waterfall',           'Waterfall'),
    'spring':      ('1703', '4186F0', 'tap-flowing',         'Water Source'),
    'tidepool':    ('1882', '4186F0', 'tidepool-starfish',   'Scenic Area'),
    'beach':       ('1521', '4186F0', 'beach',               'Beach'),
    'info':        ('1608', '4186F0', 'info',                'Information'),
    'parking':     ('1644', '4186F0', 'parking',             'Parking Area'),
    'school':      ('1682', '4186F0', 'school-crossing',     'School'),
    'stadium':     ('1698', '4186F0', 'stadium-arena',       'Stadium'),
    'hall':        ('1591', '4186F0', 'headquarters',        'Building'),
    'picnic':      ('1650', '4186F0', 'picnic-table',        'Picnic Area'),
    'street':      ('1611', '4186F0', 'japanese-poi',        'Waypoint'),
    'medical':     ('1558', 'DB4437', 'doctor-bag',          'Medical Facility'),   # hospital, clinic, pharmacy
    'pin':         ('1899', '0288D1', 'blank-shape_pin',     'Waypoint'),
}
GPX_SYM = {k: v[3] for k, v in ICONS.items()}

# keyword → icon, first match wins (checked against label + name first, then desc; lower-cased). Korean and English.
AUTO_ICON = [
    ('funicular',   ['funicular', 'cable car', '경사형 승강기', '케이블카', '푸니쿨라']),
    ('elevator',    ['elevator', 'lift', '엘리베이터', '승강기']),
    ('camera',      ['photo', 'camera', '사진', '인증샷', '포토']),
    ('viewpoint',   ['viewpoint', 'view', 'overlook', 'lookout', 'rooftop', 'terrace', '전망', '야경', '옥상', '루프탑', '뷰']),
    ('entrance',    ['entrance', 'gate', 'exit', '입구', '정문', '출구']),
    ('plaque',      ['plaque', 'sign', 'stone', 'memorial', 'site', '표석', '표지판', '안내판', '비석', '터 ']),
    ('stairs',      ['stairs', 'steps', '계단']),
    ('market',      ['market', 'mall', 'arcade', '시장', '상가']),
    ('police',      ['police', '파출소', '경찰']),
    ('hotel',       ['hotel', 'guesthouse', 'hostel', '호텔', '숙소']),
    ('tent',        ['night market', 'tent', '야시장', '천막', '포장마차']),
    ('convenience', ['7-eleven', 'cu ', 'gs25', 'convenience', 'lottery', '편의점', '복권']),
    ('walking',     ['junction', 'crossing', 'cross ', 'join', 'intersection', 'corner', '오거리', '사거리', '삼거리', '건너', '합류', '모퉁이']),
    ('cafe',        ['cafe', 'café', 'coffee', '카페', '커피']),
    ('bar',         ['bar', 'wine', 'pub', 'brew', 'beer', 'makgeolli', '와인', '주점', '술집', '막걸리', '맥주']),
    ('restaurant',  ['restaurant', 'kebab', 'food', 'sikdang', 'diner', 'tteokbokki', 'gimbap', 'bindaetteok', 'yukhoe', 'snack', 'croquette', 'noodle', '식당', '맛집', '음식', '케밥', '떡볶이', '김밥', '빈대떡', '육회', '고로케']),
    ('bus',         ['bus', 'terminus', '버스', '정류장', '종점']),
    ('subway',      ['subway', 'metro', 'station', '지하철', '역 ']),
    ('church',      ['church', 'cathedral', 'temple', 'shrine', '교회', '성당', '사찰', '절 ', '신사']),
    ('monument',    ['statue', 'monument', 'square', '동상', '기념비', '광장']),
    ('historic',    ['wall', 'fortress', 'historic', 'palace', 'ruins', 'hanok', '성곽', '도성', '유적', '궁', '한옥']),
    ('mountain',    ['valley', 'mountain', 'hill', 'peak', '계곡', '산 ', '봉']),
    ('museum',      ['museum', 'exhibition', 'gallery', '박물관', '전시관', '갤러리']),
    ('library',     ['library', '도서관']),
    ('trail',       ['trail', 'path', 'hiking', '산책로', '둘레길', '등산']),
    ('park',        ['park', 'garden', '공원', '정원']),
]


def auto_icon(w, index, count):
    """Icon for a waypoint: explicit w['icon'] wins; else first/last pin → start/end; else keyword match; else pin."""
    if w.get('icon'):
        return w['icon']
    if index == 0:
        return 'start'
    if index == count - 1:
        return 'end'
    # name/label first (what the pin IS), description second (what you do there)
    for text in (w.get('label', '') + ' ' + w.get('name', ''), w.get('desc', '')):
        text = text.lower() + ' '
        for icon, keys in AUTO_ICON:
            if any(k in text for k in keys):
                return icon
    return 'pin'


def icon_href(icon):
    iid, color, name, _ = ICONS[icon]
    return (f'https://mt.googleapis.com/vt/icon/name=icons/onion/SHARED-mymaps-container-bg_4x.png,'
            f'icons/onion/SHARED-mymaps-container_4x.png,icons/onion/{iid}-{name}_4x.png&highlight=ff000000,{color}&scale=2.0')


def write_kml(path, spec, pts, wpts, maplinks):
    K = ['<?xml version="1.0" encoding="UTF-8"?>', '<kml xmlns="http://www.opengis.net/kml/2.2"><Document>',
         f"<name>{esc(spec.get('name', 'route'))}</name>",
         '<Style id="line"><LineStyle><color>ff1a5cff</color><width>4</width></LineStyle></Style>']
    chosen = [auto_icon(w, i, len(wpts)) for i, w in enumerate(wpts)]
    used = sorted(set(chosen))
    for icon in used:
        iid, color, _, _ = ICONS[icon]
        sid = f'icon-{iid}-{color}'
        for variant, scale in (('normal', 1.0), ('highlight', 1.1)):
            K.append(f'<Style id="{sid}-{variant}"><IconStyle><color>ff{color[4:6]}{color[2:4]}{color[0:2]}</color><scale>{scale}</scale>'
                     f'<Icon><href>{esc(icon_href(icon))}</href></Icon><hotSpot x="32" xunits="pixels" y="64" yunits="insetPixels"/></IconStyle>'
                     f'<LabelStyle><scale>0</scale></LabelStyle></Style>')
        K.append(f'<StyleMap id="{sid}"><Pair><key>normal</key><styleUrl>#{sid}-normal</styleUrl></Pair>'
                 f'<Pair><key>highlight</key><styleUrl>#{sid}-highlight</styleUrl></Pair></StyleMap>')
    K.append('<Folder><name>Pins</name>')
    for w, icon in zip(wpts, chosen):
        iid, color, _, _ = ICONS[icon]
        K.append(f"<Placemark><name>{esc(pin_name(w['name']))}</name><description><![CDATA[{html_desc(w, maplinks)}]]></description>"
                 f"<styleUrl>#icon-{iid}-{color}</styleUrl><Point><coordinates>{w['lon']:.6f},{w['lat']:.6f},0</coordinates></Point></Placemark>")
    K.append('</Folder><Folder><name>Route</name>')
    K.append(f"<Placemark><name>{esc(spec.get('line_name') or 'Walking route')}</name><styleUrl>#line</styleUrl><LineString><tessellate>1</tessellate><coordinates>"
             + ' '.join(f'{p[1]:.6f},{p[0]:.6f},0' for p in pts) + '</coordinates></LineString></Placemark>')
    K.append('</Folder></Document></kml>')
    kml = '\n'.join(K) + '\n'
    xml.dom.minidom.parseString(kml.encode('utf-8'))
    open(path, 'w', encoding='utf-8').write(kml)
    print(f'{path}: KML written ({len(wpts)} pins, icons: {", ".join(used)})')


def simplify(pts, meta, keep, tol):
    """Douglas-Peucker in metres; indices in `keep` are never dropped. Returns (pts, meta)."""
    def perp(p, a, b):
        if a == b:
            return hav(p, a)
        # local flat projection (metres)
        kx = 111320 * math.cos(math.radians(a[0])); ky = 110540
        ax, ay = 0, 0; bx, by = (b[1] - a[1]) * kx, (b[0] - a[0]) * ky; px, py = (p[1] - a[1]) * kx, (p[0] - a[0]) * ky
        t = max(0, min(1, (px * bx + py * by) / (bx * bx + by * by)))
        return math.hypot(px - t * bx, py - t * by)
    n = len(pts); flag = [False] * n; flag[0] = flag[-1] = True
    for k in keep:
        flag[k] = True
    stack = [(0, n - 1)]
    while stack:
        i, j = stack.pop()
        if j - i < 2:
            continue
        # split at any forced-keep point inside the span first
        forced = [k for k in range(i + 1, j) if flag[k]]
        if forced:
            m = forced[len(forced) // 2]; stack += [(i, m), (m, j)]; continue
        dmax, idx = 0, -1
        for k in range(i + 1, j):
            d = perp(pts[k], pts[i], pts[j])
            if d > dmax:
                dmax, idx = d, k
        if dmax > tol:
            flag[idx] = True; stack += [(i, idx), (idx, j)]
    return [p for p, f in zip(pts, flag) if f], [m for m, f in zip(meta, flag) if f]


def esc(s):
    return s.replace('&', '&amp;').replace('<', '&lt;').replace('>', '&gt;').replace('"', '&quot;')


def elevations(points):
    """open-meteo elevation, 100 points per call. The free limit counts coordinates (~600/min): pace and retry on 429."""
    import time
    ele = {}
    pts = list(dict.fromkeys(points))
    batches = [pts[i:i + 100] for i in range(0, len(pts), 100)]
    for bi, b in enumerate(batches):
        url = ('https://api.open-meteo.com/v1/elevation?latitude=' + ','.join(f'{p[0]:.6f}' for p in b)
               + '&longitude=' + ','.join(f'{p[1]:.6f}' for p in b))
        for attempt in range(4):
            out = subprocess.run(['curl', '-s', '-m', '60', url], capture_output=True, text=True).stdout
            try:
                data = json.loads(out)
                if 'elevation' in data:
                    for p, z in zip(b, data['elevation']):
                        ele[p] = z
                    break
                if 'limit' in str(data.get('reason', '')).lower():
                    print(f'elevation: rate limited on batch {bi + 1}/{len(batches)}, waiting 65 s', file=sys.stderr)
                    time.sleep(65); continue
                raise ValueError(data)
            except Exception as e:
                print('elevation batch failed:', e, out[:100], file=sys.stderr); time.sleep(5)
        if len(batches) > 5:
            time.sleep(11)    # the limit counts coordinates (~600/min): 100-point batches every 11 s stays under it
    return ele


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('spec'); ap.add_argument('out')
    ap.add_argument('--spacing', type=float, default=8.0)
    ap.add_argument('--max-points', type=int, default=1800)
    ap.add_argument('--no-elevation', action='store_true')
    ap.add_argument('--maplinks', choices=['html', 'plain'])
    ap.add_argument('--kml')
    a = ap.parse_args()
    spec = json.load(open(a.spec, encoding='utf-8'))

    pts, meta = [], []
    for seg in spec['segments']:
        coords = [tuple(map(float, c.split(','))) for c in seg['coords'].split()]
        for c in coords:
            if pts and hav(pts[-1], c) > a.spacing:
                n = int(math.ceil(hav(pts[-1], c) / a.spacing)); p0 = pts[-1]
                for k in range(1, n):
                    pts.append((p0[0] + (c[0] - p0[0]) * k / n, p0[1] + (c[1] - p0[1]) * k / n)); meta.append(seg)
            if not pts or hav(pts[-1], c) > 0.5:
                pts.append(c); meta.append(seg)
    wpts = spec.get('waypoints', [])
    if a.max_points and len(pts) > a.max_points:
        keep = set()
        for w in wpts:   # never drop the point nearest a pin
            keep.add(min(range(len(pts)), key=lambda i: hav(pts[i], (w['lat'], w['lon']))))
        for i in range(1, len(meta)):   # nor a segment boundary
            if meta[i] is not meta[i - 1]:
                keep.add(i)
        before = len(pts); tol = 0.5
        while len(pts) > a.max_points and tol < 20:
            pts, meta = simplify(pts, meta, keep, tol)
            keep = {i for i, p in enumerate(pts) if any(hav(p, (w['lat'], w['lon'])) < 1 for w in wpts)} | {i for i in range(1, len(meta)) if meta[i] is not meta[i - 1]}
            tol *= 1.5
        # re-densify evenly up to the budget so GPS apps still get a smooth line
        total0 = sum(hav(pts[i], pts[i + 1]) for i in range(len(pts) - 1))
        spacing2 = max(a.spacing, total0 / max(1, a.max_points - len(pts) + len(pts)))
        pts2, meta2 = [], []
        for p, m in zip(pts, meta):
            if pts2 and hav(pts2[-1], p) > spacing2:
                n = int(math.ceil(hav(pts2[-1], p) / spacing2)); p0 = pts2[-1]
                for k in range(1, n):
                    pts2.append((p0[0] + (p[0] - p0[0]) * k / n, p0[1] + (p[1] - p0[1]) * k / n)); meta2.append(m)
            pts2.append(p); meta2.append(m)
        while len(pts2) > a.max_points:   # rare: round-up overshoot → widen spacing slightly and redo
            spacing2 *= 1.05; pts2, meta2 = [], []
            for p, m in zip(pts, meta):
                if pts2 and hav(pts2[-1], p) > spacing2:
                    n = int(math.ceil(hav(pts2[-1], p) / spacing2)); p0 = pts2[-1]
                    for k in range(1, n):
                        pts2.append((p0[0] + (p[0] - p0[0]) * k / n, p0[1] + (p[1] - p0[1]) * k / n)); meta2.append(m)
                pts2.append(p); meta2.append(m)
        pts, meta = pts2, meta2
        print(f'thinned {before} → {len(pts)} points (corners kept, {spacing2:.1f} m spacing) to stay editable in Google My Maps', file=sys.stderr)
    gaps = [hav(pts[i], pts[i + 1]) for i in range(len(pts) - 1)]
    total = sum(gaps)
    cache_path = a.spec.rsplit('.', 1)[0] + '.ele.json'
    try:
        cache = {tuple(map(float, k.split(','))): v for k, v in json.load(open(cache_path)).items()}
    except Exception:
        cache = {}
    ele = {}
    if not a.no_elevation:
        need = [p for p in dict.fromkeys(pts + [(w['lat'], w['lon']) for w in wpts]) if (round(p[0], 6), round(p[1], 6)) not in cache]
        if need:
            print(f'elevation: {len(need)} new points to fetch ({len(cache)} cached)', file=sys.stderr)
            fetched = elevations(need)
            cache.update({(round(k[0], 6), round(k[1], 6)): v for k, v in fetched.items()})
            json.dump({f'{k[0]:.6f},{k[1]:.6f}': v for k, v in cache.items()}, open(cache_path, 'w'))
        ele = {p: cache.get((round(p[0], 6), round(p[1], 6))) for p in dict.fromkeys(pts + [(w['lat'], w['lon']) for w in wpts])}
        ele = {k: v for k, v in ele.items() if v is not None}

    L = ['<?xml version="1.0" encoding="UTF-8"?>',
         '<gpx version="1.1" creator="googleCustomMap skill – OSM node geometry" xmlns="http://www.topografix.com/GPX/1/1" '
         'xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" '
         'xsi:schemaLocation="http://www.topografix.com/GPX/1/1 http://www.topografix.com/GPX/1/1/gpx.xsd">',
         '  <metadata>', f"    <name>{esc(spec.get('name', 'route'))}</name>"]
    if spec.get('desc'):
        L.append(f"    <desc>{esc(spec['desc'])}</desc>")
    if spec.get('link'):
        L.append(f"    <link href=\"{esc(spec['link'])}\"><text>Source</text></link>")
    L += [f"    <time>{datetime.now(timezone.utc).strftime('%Y-%m-%dT%H:%M:%SZ')}</time>", '  </metadata>']
    L += ['  <!-- EDITING GUIDE',
          '       * Each <wpt> below is one numbered pin. The <trkseg> is annotated with "Leg k" comments (one per',
          '         route segment, saying which pin it starts at) and "pin N" markers at the track point nearest each pin.',
          '       * To end the route earlier at pin N: delete every <trkpt> after the "pin N" marker, delete the <wpt>',
          '         blocks after pin N, and rename pin N "End". To drop a middle stop, delete its <wpt>; the track can stay.',
          '       * Cleaner: edit the JSON spec this file was built from and rebuild (see the googleCustomMap skill). -->']
    for wi, w in enumerate(wpts):
        z = ele.get((w['lat'], w['lon']))
        L.append(f"  <wpt lat=\"{w['lat']:.6f}\" lon=\"{w['lon']:.6f}\">")
        if z is not None: L.append(f'    <ele>{z:.1f}</ele>')
        L.append(f"    <name>{esc(pin_name(w['name']))}</name>")
        desc = html_desc(w, a.maplinks)
        links = map_links(w['lat'], w['lon'], w.get('label') or w['name'], w.get('naver_id'), w.get('address')) if a.maplinks else {}
        if desc: L.append(f"    <desc>{esc(desc)}</desc>")
        for k, u in links.items():
            L.append(f'    <link href="{esc(u)}"><text>{k}</text></link>')
        L.append(f"    <sym>{GPX_SYM[auto_icon(w, wi, len(wpts))]}</sym>")
        L.append('  </wpt>')
    L += ['  <trk>', f"    <name>{esc(spec.get('name', 'route'))} ({total / 1000:.1f} km)</name>", '    <type>walking</type>', '    <trkseg>']
    # pin markers: index of the track point nearest each waypoint (only if within 40 m)
    markers = {}
    for wi, w in enumerate(wpts, 1):
        best = min(range(len(pts)), key=lambda i: hav(pts[i], (w['lat'], w['lon'])))
        if hav(pts[best], (w['lat'], w['lon'])) <= 40:
            markers.setdefault(best, []).append(f"pin {wi}: {w['name']}")
    def pin_at(i):
        return markers.get(i)
    last = None; legno = 0
    for i, (p, seg) in enumerate(zip(pts, meta)):
        if seg is not last:
            legno += 1
            start_pin = next((m for j in range(i, min(i + 3, len(pts))) for m in (markers.get(j) or [])), None)
            at = f" | starts at {start_pin.split(':')[0]}" if start_pin else ''
            L.append(f"      <!-- Leg {legno}: {seg['label']}{' (approx)' if seg.get('approx') else ''}{at} -->"); last = seg
        for m in (pin_at(i) or []):
            L.append(f"      <!-- {m} -->")
        z = ele.get(p)
        L.append(f'      <trkpt lat="{p[0]:.6f}" lon="{p[1]:.6f}">' + (f'<ele>{z:.1f}</ele>' if z is not None else '') + '</trkpt>')
    L += ['    </trkseg>', '  </trk>', '</gpx>']
    gpx = '\n'.join(L) + '\n'
    xml.dom.minidom.parseString(gpx.encode('utf-8'))
    open(a.out, 'w', encoding='utf-8').write(gpx)

    if a.kml:
        write_kml(a.kml, spec, pts, wpts, 'html' if a.maplinks else None)
    print(f'{a.out}: {len(pts)} track points, {total:.0f} m, max gap {max(gaps):.1f} m, {len(wpts)} waypoints, XML OK')
    for wi, w in enumerate(wpts):
        z = ele.get((w['lat'], w['lon']))
        print(f"  ele {z if z is not None else '   -':>6}  [{auto_icon(w, wi, len(wpts)):>11}]  {w['name']}")


if __name__ == '__main__':
    main()
