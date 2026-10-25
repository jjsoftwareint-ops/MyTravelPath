#!/usr/bin/env python3
"""Patch an existing kmz (ours or a My Maps export) in one offline-first pass, and check it.

usage: patch_kmz.py file.kmz [patch.json] [--check] [--offline] [--against old.kmz] [--backup DIR]
                    [--no-photos] [--no-recolour]

What it does, in this order (all local; only photo URLs for ids missing from the cache need the network):
  1. backs the kmz up to DIR (default $TMPDIR/kmz-backups), unless --check
  2. patch.json (optional): add pins into a named folder, rename folders (see below)
  3. recolours every old blue (4186F0, not the toilet) / green (0F9D58) / pin-blue (0288D1) style to the
     palette colour of the same icon, by looking the icon id up in build_gpx.ICONS (restyle_kmz.py does the work)
  4. adds a Naver place photo to every pin that has a Naver place link and no photo, unless its icon is one of
     SKIP_ICONS or its name starts with a "no_photo" entry. Photo URLs come from ../cache/og_images.json;
     --offline never touches the network and just lists the ids it could not fill
  5. validates (xml, styles before the first Folder, bad icon colours, *CLICK* names, Hangul-first names, Kakao
     links, photo coverage, pins removed/added versus --against or the backup) and writes the kmz in place

patch.json:
{
  "add": [ {"folder": "Restaurants", "name": "Anmok Seomyeon – pork gukbap", "korean": "안목 서면점",
            "desc": "Address. What it is. Hours (Naver, date). Still in business on Naver as of date.",
            "icon": "restaurant", "naver_id": "1352917738", "lat": 35.151621, "lon": 129.058058,
            "image": "auto" | "none" | "https://…"} ],
  "rename_folder": [["(checked 2026-10-22)", "(checked 2026-10-25)"]],
  "no_photo": ["Starry Sea Busan Night Market"]
}
"folder" is matched as a prefix of the folder name (after XML-unescaping). "image": "auto" (default) uses the cache.
Placemarks are written in the same format layers_kml.py and the Busan file use. A desc may contain <a> links.
"""
import html, json, os, re, shutil, subprocess, sys, tempfile, time, zipfile
import xml.dom.minidom
HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, HERE)
from build_gpx import ICONS

CACHE = os.path.join(HERE, '..', 'cache', 'og_images.json')
MUA = 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1'
SKIP_ICONS = {'toilet', 'medical', 'dot', 'stamp', 'parking', 'bus', 'subway', 'start', 'info'}   # no photo on unimportant pins
BAD = ('4186F0', '0F9D58', '0288D1')
KEY_BY_ID = {}
for _k, _v in ICONS.items():
    KEY_BY_ID.setdefault(str(_v[0]), []).append(_k)
cl = lambda x: re.sub(r'<!\[CDATA\[|\]\]>', '', html.unescape(x))


def load_cache():
    try:
        return json.load(open(CACHE, encoding='utf8'))
    except Exception:
        return {}


def og(pid, cache, offline):
    if pid in cache:
        return cache[pid]
    if offline:
        return None
    d = subprocess.run(['curl', '-sL', '-m', '40', '-A', MUA, '-H', 'Accept-Language: ko-KR,ko;q=0.9',
                        f'https://m.place.naver.com/place/{pid}/home'], capture_output=True, text=True).stdout
    m = re.search(r'og:image" content="([^"]*)"', d)
    cache[pid] = html.unescape(m.group(1)) if m else None
    os.makedirs(os.path.dirname(CACHE), exist_ok=True)
    json.dump(cache, open(CACHE, 'w', encoding='utf8'), ensure_ascii=False, indent=0)
    time.sleep(1.8)                                    # pace Naver
    return cache[pid]


def naver_link(pid, lat, lon):
    return (f'https://map.naver.com/p/entry/place/{pid}?lng={lon:.7f}&lat={lat:.6f}&placePath=%2Fhome'
            f'&entry=plt&searchType=place&c=15.00,0,0,0,dh')


def style_for(icon):
    iid, color = ICONS[icon][0], ICONS[icon][1]
    return f'icon-{iid}-{color}'


def placemark(a, image):
    img = f'<img src="{image}" width="300"><br>' if image else '<!--nophoto-->'   # marker: later runs keep it photo-less
    return (f'<Placemark><name>*CLICK* {a["name"]}</name><description><![CDATA[{img}<b>{a["name"]} ({a["korean"]})</b>'
            f'<br>{a["desc"]}<br><a href="{naver_link(a["naver_id"], a["lat"], a["lon"])}">Open Naver Map</a>]]></description>'
            f'<styleUrl>#{style_for(a["icon"])}</styleUrl><Point><coordinates>{a["lon"]},{a["lat"]},0</coordinates></Point></Placemark>')


def names(k):
    return [cl(m) for m in re.findall(r'<Placemark><name>(.*?)</name>', k, re.S)]


def read_kmz(path):
    z = zipfile.ZipFile(path); mem = {n: z.read(n) for n in z.namelist()}; z.close()
    return mem


def write_kmz(path, mem, kml):
    mem = dict(mem); mem['doc.kml'] = kml.encode('utf-8')
    with zipfile.ZipFile(path, 'w', zipfile.ZIP_DEFLATED) as z:
        for n, b in mem.items():
            z.writestr(n, b)


def recolour(kmz_path, kml):
    """Return (kml, rules) with every bad-colour style swapped to the palette colour of the same icon."""
    used = sorted(set(re.findall(r'<styleUrl>#(icon-(\d+)-(?:' + '|'.join(BAD) + r'))', kml)))
    rules = [f'{sid}={KEY_BY_ID[i][0]}' for sid, i in used if i != '1733' and i in KEY_BY_ID]
    unknown = [sid for sid, i in used if i != '1733' and i not in KEY_BY_ID]
    if rules:
        tmp = tempfile.mkdtemp(); p = os.path.join(tmp, 'w.kmz')
        write_kmz(p, read_kmz(kmz_path), kml)
        subprocess.run([sys.executable, os.path.join(HERE, 'restyle_kmz.py'), p, *rules], check=True, capture_output=True)
        kml = zipfile.ZipFile(p).read('doc.kml').decode('utf-8'); shutil.rmtree(tmp)
    return kml, rules, unknown


def ensure_styles(kml):
    """Add the Style/StyleMap blocks of any icon a pin uses but the file does not define (before the first Folder)."""
    from build_gpx import icon_href, esc
    blocks = ''
    for sid in sorted(set(re.findall(r'<styleUrl>#(icon-\d+-[0-9A-F]{6})</styleUrl>', kml))):
        if f'<StyleMap id="{sid}"' in kml:
            continue
        _, iid, color = sid.split('-')
        key = next((k for k, v in ICONS.items() if str(v[0]) == iid and v[1] == color), None)
        if not key:
            print('WARNING no ICONS entry for style', sid); continue
        for variant in ('normal', 'highlight'):
            blocks += (f'<Style id="{sid}-{variant}"><IconStyle><color>ff{color[4:6]}{color[2:4]}{color[0:2]}</color><scale>1</scale>'
                       f'<Icon><href>{esc(icon_href(key))}</href></Icon><hotSpot x="32" xunits="pixels" y="64" yunits="insetPixels"/></IconStyle>'
                       f'<LabelStyle><scale>0</scale></LabelStyle></Style>')
        blocks += (f'<StyleMap id="{sid}"><Pair><key>normal</key><styleUrl>#{sid}-normal</styleUrl></Pair>'
                   f'<Pair><key>highlight</key><styleUrl>#{sid}-highlight</styleUrl></Pair></StyleMap>')
        print('added style', sid, f'({key})')
    i = kml.index('<Folder>')
    return kml[:i] + blocks + kml[i:]


def photos(kml, cache, offline, extra_skip):
    miss, added = [], 0
    def one(m):
        nonlocal added
        p = m.group(0)
        if '<Point>' not in p or '<img' in p or '<!--nophoto-->' in p:
            return p
        n = cl(re.search(r'<name>(.*?)</name>', p, re.S).group(1)).replace('*CLICK* ', '')
        st = re.search(r'<styleUrl>#icon-(\d+)-', p)
        keys = KEY_BY_ID.get(st.group(1), []) if st else []
        if (keys and keys[0] in SKIP_ICONS) or any(n.startswith(s) for s in extra_skip):
            return p
        ids = re.findall(r'entry/place/(\d+)', html.unescape(p))
        if not ids:
            miss.append((n, 'no Naver place id')); return p
        u = og(ids[0], cache, offline)
        if not u:
            miss.append((n, f'photo not cached ({ids[0]})' if offline else f'no og:image ({ids[0]})')); return p
        added += 1
        return p.replace('<description><![CDATA[', f'<description><![CDATA[<img src="{u}" width="300"><br>', 1)
    return re.sub(r'<Placemark>.*?</Placemark>', one, kml, flags=re.S), added, miss


def validate(kml, before=None):
    ok = True
    xml.dom.minidom.parseString(kml.encode('utf-8'))
    first_folder = kml.index('<Folder>') if '<Folder>' in kml else len(kml)
    styles = [m.start() for m in re.finditer(r'<(Style|StyleMap) id=', kml)]
    if styles and max(styles) > first_folder:
        print('FAIL styles after the first <Folder> (My Maps import error)'); ok = False
    used = sorted(set(re.findall(r'<styleUrl>#(icon-\d+-[0-9A-F]{6})', kml)))
    bad = [u for u in used if u.endswith(BAD) and not u.startswith('icon-1733')]
    if bad:
        print('FAIL blue/green icons still in use:', bad); ok = False
    pins = [p for p in re.findall(r'<Placemark>.*?</Placemark>', kml, re.S) if '<Point>' in p]
    noclick = [cl(re.search(r'<name>(.*?)</name>', p, re.S).group(1)) for p in pins if '<name>*CLICK* ' not in p]
    hangul = [n for n in (cl(re.search(r'<name>(?:\*CLICK\* )?(.*?)</name>', p, re.S).group(1)) for p in pins) if re.match(r'[가-힣]', n)]
    kakao = len(re.findall('kakao', kml.replace('KakaoTalk', ''), re.I))
    if noclick or hangul or kakao:
        print('FAIL names without *CLICK*:', noclick, '| Hangul-first titles:', hangul, '| Kakao mentions:', kakao); ok = False
    nophoto = [cl(re.search(r'<name>(.*?)</name>', p, re.S).group(1)).replace('*CLICK* ', '') for p in pins if '<img' not in p]
    print(f'pins {len(pins)}, with photo {len(pins) - len(nophoto)}; without photo: {nophoto}')
    if before is not None:
        now = names(kml)
        print('removed:', [n for n in before if n not in now], '| added:', [n for n in now if n not in before])
    print('CHECK', 'OK' if ok else 'FAILED')
    return ok


def main():
    a = sys.argv[1:]
    flags = {x for x in a if x.startswith('--')}
    def opt(name):
        return a[a.index(name) + 1] if name in a else None
    against, backup = opt('--against'), opt('--backup')
    pos = [x for i, x in enumerate(a) if not x.startswith('--') and (i == 0 or a[i - 1] not in ('--against', '--backup'))]
    if not pos:
        print(__doc__); return 1
    kmz = pos[0]; spec = json.load(open(pos[1], encoding='utf8')) if len(pos) > 1 else {}
    mem = read_kmz(kmz); kml = mem['doc.kml'].decode('utf-8')
    base = names(read_kmz(against)['doc.kml'].decode('utf-8')) if against else names(kml)
    if '--check' in flags:
        return 0 if validate(kml, base if against else None) else 1
    bdir = backup or os.path.join(tempfile.gettempdir(), 'kmz-backups'); os.makedirs(bdir, exist_ok=True)
    shutil.copy(kmz, os.path.join(bdir, os.path.basename(kmz))); print('backup ->', bdir)
    cache = load_cache(); offline = '--offline' in flags
    for old, new in spec.get('rename_folder', []):
        kml = kml.replace(old, new)
    for pin in spec.get('add', []):
        img = pin.get('image', 'auto')
        img = None if img == 'none' else (og(pin['naver_id'], cache, offline) if img == 'auto' else img)
        i = next((m.start() for m in re.finditer(r'<Folder><name>(.*?)</name>', kml) if cl(m.group(1)).startswith(pin['folder'])), None)
        if i is None:
            print('FAIL no folder starting with', pin['folder']); return 1
        j = kml.index('</Folder>', i)
        kml = kml[:j] + placemark(pin, img) + kml[j:]
        print('added', pin['name'], '| photo' if img else '| no photo')
    if '--no-recolour' not in flags:
        kml, rules, unknown = recolour(kmz, kml)
        print('recoloured', len(rules), 'icon styles', ('| UNKNOWN icon ids (add to ICONS): ' + str(unknown)) if unknown else '')
    kml = ensure_styles(kml)
    if '--no-photos' not in flags:
        kml, n, miss = photos(kml, cache, offline, spec.get('no_photo', []))
        print('photos added', n, '| could not fill:', miss)
    ok = validate(kml, base)
    if ok:
        write_kmz(kmz, mem, kml); print('written', kmz)
    return 0 if ok else 1


if __name__ == '__main__':
    sys.exit(main())
