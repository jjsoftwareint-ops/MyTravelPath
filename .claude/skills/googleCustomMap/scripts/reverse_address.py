#!/usr/bin/env python3
"""Fill "address" for every spec waypoint that has no "naver_id", so its Naver link is a searchable address.

usage: reverse_address.py spec.json [--max-m 60] [--dry-run]

Why: the Naver Map app cannot search "lat,lon", so pins that are not venues need a street or lot address.
How, per waypoint without naver_id/address:
  1. candidates = nearest OSM house numbers within 80 m (Overpass, mirrors with retry) + Nominatim's reverse
     result (road + house number) + the Korean part of the pin's own name as a place query;
  2. each candidate is sent to Naver's instant-search (the same endpoint naver_place.py uses); an address is
     accepted only if Naver's own point for it lies within --max-m of the pin (closest wins); a place hit
     within 45 m is used as naver_id instead;
  3. the spec is rewritten in place with "address" (or "naver_id") added; unresolved pins are listed so
     the user can supply the address by hand (e.g. "서울특별시 용산구 후암동 418-32").
Prints a review table: distance between the pin and Naver's point for the chosen address. Check anything > 30 m.
"""
import json, math, re, subprocess, sys, time, urllib.parse, urllib.request

UA = 'MyTravelPath-design-skill/1.0 (personal project; contact via github jjsoftwareint-ops)'
NUA = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/124 Safari/537.36'
OVERPASS = ['https://z.overpass-api.de/api/interpreter', 'https://lz4.overpass-api.de/api/interpreter',
            'https://overpass-api.de/api/interpreter', 'https://overpass.kumi.systems/api/interpreter']
PLACE_M = 45


def dist(a, b, c, d):
    return math.hypot((a - c) * 111000, (b - d) * 88000)


def overpass(lat, lon, r=80):
    q = (f'[out:json][timeout:40];(nwr(around:{r},{lat},{lon})["addr:housenumber"];'
         f'nwr(around:{r},{lat},{lon})["name"]["amenity"];nwr(around:{r},{lat},{lon})["name"]["tourism"];'
         f'nwr(around:{r},{lat},{lon})["name"]["historic"];nwr(around:{r},{lat},{lon})["name"]["leisure"];'
         f'nwr(around:{r},{lat},{lon})["name"]["shop"];nwr(around:{r},{lat},{lon})["name"]["highway"="bus_stop"];'
         f'nwr(around:{r},{lat},{lon})["name"]["railway"="station"];);out center tags 40;')
    for host in OVERPASS:
        for _ in range(2):
            try:
                req = urllib.request.Request(host, data=urllib.parse.urlencode({'data': q}).encode(), headers={'User-Agent': UA})
                return json.load(urllib.request.urlopen(req, timeout=50)).get('elements', [])
            except Exception:
                time.sleep(3)
    return []


def nominatim(lat, lon):
    try:
        req = urllib.request.Request(f'https://nominatim.openstreetmap.org/reverse?lat={lat}&lon={lon}&format=jsonv2&accept-language=ko&zoom=18', headers={'User-Agent': UA})
        return json.load(urllib.request.urlopen(req, timeout=30)).get('address', {})
    except Exception:
        return {}
    finally:
        time.sleep(1.1)


def naver(q, lat, lon):
    url = 'https://map.naver.com/p/api/search/instant-search?query=' + urllib.parse.quote(q) + f'&coords={lat},{lon}&lang=ko&caller=pcweb'
    out = subprocess.run(['curl', '-s', '-m', '25', '-A', NUA, '-H', 'Referer: https://map.naver.com/',
                          '-H', 'Accept: application/json', url], capture_output=True, text=True).stdout
    time.sleep(0.8)
    try:
        return json.loads(out)
    except Exception:
        return {}


def resolve(w, max_m):
    lat, lon = w['lat'], w['lon']
    nm = nominatim(lat, lon)
    gu = nm.get('borough') or nm.get('city_district') or ''
    cands = []
    if nm.get('road') and nm.get('house_number'):
        cands.append(f"서울 {gu} {nm['road']} {nm['house_number']}".replace('  ', ' '))
    names = []
    for e in overpass(lat, lon):
        t = e.get('tags', {}); la = e.get('lat') or e.get('center', {}).get('lat'); lo = e.get('lon') or e.get('center', {}).get('lon')
        if la is None:
            continue
        d = dist(lat, lon, la, lo)
        if t.get('addr:street') and t.get('addr:housenumber'):
            q = f"서울 {gu} {t['addr:street']} {t['addr:housenumber']}".replace('  ', ' ')
            if q not in cands:
                cands.append((d, q))
        elif t.get('name'):
            names.append((d, t['name']))
    cands = [c if isinstance(c, str) else c[1] for c in sorted(cands, key=lambda c: 0 if isinstance(c, str) else c[0])][:5]
    best = None
    for q in cands:
        for a in naver(q, lat, lon).get('address') or []:
            dm = dist(lat, lon, float(a['y']), float(a['x']))
            if dm <= max_m and (best is None or dm < best[1]):
                best = (a.get('fullAddress') or a.get('title'), dm)
    if best:
        return {'address': best[0]}, best[1]
    for m in re.findall(r'[가-힣][가-힣 ]+', w.get('name', '')):
        if len(m.strip()) >= 2:
            names.append((0, m.strip()))
    place = None
    for _, n in sorted(names, key=lambda x: x[0])[:6]:
        for p in naver(n, lat, lon).get('place') or []:
            dm = dist(lat, lon, float(p['y']), float(p['x']))
            if dm <= PLACE_M and (place is None or dm < place[1]):
                place = ({'naver_id': p['id'], 'naver_name': p['title']}, dm)
    if place:
        return place
    return None, None


def main():
    args = sys.argv[1:]
    max_m = 60
    if '--max-m' in args:
        i = args.index('--max-m'); max_m = float(args[i + 1]); del args[i:i + 2]
    dry = '--dry-run' in args
    spec_path = [a for a in args if not a.startswith('--')][0]
    spec = json.load(open(spec_path, encoding='utf-8'))
    unresolved = []
    for w in spec['waypoints']:
        if w.get('naver_id') or w.get('address'):
            continue
        fields, dm = resolve(w, max_m)
        if fields:
            w.update(fields)
            print(f"{dm:5.0f} m  {fields.get('address') or fields.get('naver_name')}  <- {w['name'][:50]}")
        else:
            unresolved.append(w['name'])
            print(f"   ?? m  UNRESOLVED  <- {w['name'][:50]}")
    if not dry:
        json.dump(spec, open(spec_path, 'w', encoding='utf-8'), ensure_ascii=False, indent=2)
        print(f'{spec_path} updated')
    if unresolved:
        print('Add "address" by hand for:', *unresolved, sep='\n  ')


if __name__ == '__main__':
    main()
