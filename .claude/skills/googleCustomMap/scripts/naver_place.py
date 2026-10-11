#!/usr/bin/env python3
"""Look up places on Naver Map (unofficial instant-search endpoint). Gives exact coordinates, road/lot address,
category and review count for Korean venues that OSM/Nominatim don't know.

usage: naver_place.py "query" ["query" ...] [--near LAT,LON] [--json out.json]
Prints the best matches per query; --json saves the first match of each query as a list of dicts
{query, id (Naver place id → https://map.naver.com/p/entry/place/<id>), name, lat, lon, roadAddress, jibunAddress, category, reviews}.
"""
import json, subprocess, sys, time, urllib.parse

UA = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/124 Safari/537.36'


def search(q, near):
    url = ('https://map.naver.com/p/api/search/instant-search?query=' + urllib.parse.quote(q)
           + f'&coords={near}&lang=ko&caller=pcweb')
    out = subprocess.run(['curl', '-s', '-m', '25', '-A', UA, '-H', 'Referer: https://map.naver.com/',
                          '-H', 'Accept: application/json', url], capture_output=True, text=True).stdout
    try:
        d = json.loads(out)
    except Exception:
        return []
    res = []
    for p in d.get('place', []):
        res.append({'query': q, 'id': p.get('id'), 'name': p.get('title'), 'lat': float(p['y']), 'lon': float(p['x']),
                    'roadAddress': p.get('roadAddress'), 'jibunAddress': p.get('jibunAddress'),
                    'category': p.get('ctg'), 'reviews': (p.get('review') or {}).get('count'),
                    'dist_km': p.get('dist')})
    return res


def main():
    args = sys.argv[1:]
    near = '37.5665,126.9780'
    out = None
    if '--near' in args:
        i = args.index('--near'); near = args[i + 1]; del args[i:i + 2]
    if '--json' in args:
        i = args.index('--json'); out = args[i + 1]; del args[i:i + 2]
    first = []
    for q in args:
        res = search(q, near)
        print('##', q)
        for r in res[:4]:
            print(f"   {r['lat']:.6f},{r['lon']:.6f} | {r['name']} | {r['category']} | {r['roadAddress']} | reviews {r['reviews']} | naver_id {r['id']}")
        if not res:
            print('   (no result)')
        else:
            first.append(res[0])
        time.sleep(1)
    if out:
        json.dump(first, open(out, 'w', encoding='utf-8'), ensure_ascii=False, indent=2)
        print('->', out, len(first), 'places')


if __name__ == '__main__':
    main()
