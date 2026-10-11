#!/usr/bin/env python3
"""Pedestrian routing sanity check via Valhalla (public OSM instance). Goes through curl on purpose:
macOS system Python (LibreSSL) fails the TLS handshake with this host.

usage: route.py '{"legName":[[lat,lon],[lat,lon],...], "leg2":[...]}'
prints turn-by-turn with street names, writes route_<legName>.json (decoded shape, list of [lat,lon]).
"""
import json, subprocess, sys


def decode(s, prec=1e6):
    i = lat = lon = 0; out = []
    while i < len(s):
        for j in range(2):
            sh = res = 0
            while True:
                b = ord(s[i]) - 63; i += 1; res |= (b & 0x1f) << sh; sh += 5
                if b < 0x20:
                    break
            dv = ~(res >> 1) if res & 1 else res >> 1
            if j == 0: lat += dv
            else: lon += dv
        out.append((lat / prec, lon / prec))
    return out


def route(pts, name):
    body = {'locations': [{'lat': a, 'lon': b, 'type': 'break'} for a, b in pts], 'costing': 'pedestrian',
            'directions_options': {'units': 'kilometers', 'language': 'ko-KR'}}
    out = subprocess.run(['curl', '-s', '-m', '90', '-A', 'gpx-route-builder/1.0', '-H', 'Content-Type: application/json',
                          'https://valhalla1.openstreetmap.de/route', '-d', json.dumps(body)], capture_output=True, text=True).stdout
    try:
        d = json.loads(out)['trip']
    except Exception:
        print(f'=== {name}: routing failed: {out[:200]}'); return
    shape = []
    print(f"=== {name}: {d['summary']['length'] * 1000:.0f} m")
    for leg in d['legs']:
        shape += decode(leg['shape'])
        for m in leg['maneuvers']:
            print(f"   {m['length'] * 1000:5.0f} m  {m['instruction']}  {m.get('street_names', '')}")
    json.dump(shape, open(f'route_{name}.json', 'w'))
    print('   shape points:', len(shape), '->', f'route_{name}.json')


if __name__ == '__main__':
    if len(sys.argv) != 2:
        print(__doc__); sys.exit(1)
    for name, pts in json.loads(sys.argv[1]).items():
        route(pts, name)
