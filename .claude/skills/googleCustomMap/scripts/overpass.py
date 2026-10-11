#!/usr/bin/env python3
"""OpenStreetMap geometry helpers (Overpass API). Uses urllib on purpose: curl gets HTTP 406 here.

usage:
  overpass.py ways  S W N E [--out ways.json]        all highway ways with node geometry; lists named streets
  overpass.py named S W N E "regex"                   nodes/ways/relations whose name matches + bus stops, steps,
                                                      elevators, viewpoints, cafes/restaurants in the bbox
  overpass.py dump  ways.json NAME [NAME ...]         node coordinates of every way with those names
  overpass.py box   ways.json S W N E                 every way (incl. unnamed) touching the sub-bbox
"""
import json, sys, time, urllib.parse, urllib.request

URL = 'https://overpass-api.de/api/interpreter'


def query(q, tries=3):
    for i in range(tries):
        try:
            req = urllib.request.Request(URL, data=urllib.parse.urlencode({'data': q}).encode(),
                                         headers={'User-Agent': 'gpx-route-builder/1.0'})
            return json.loads(urllib.request.urlopen(req, timeout=180).read())
        except Exception as e:
            print(f'overpass attempt {i + 1} failed: {e}', file=sys.stderr)
            time.sleep(10)
    sys.exit(2)


def fmt(g):
    return ' '.join(f"{p['lat']:.6f},{p['lon']:.6f}" for p in g)


def kind(t):
    return t.get('highway') or t.get('amenity') or t.get('tourism') or t.get('shop') or t.get('historic') or t.get('building')


def cmd_ways(a):
    s, w, n, e = a[:4]
    out = a[a.index('--out') + 1] if '--out' in a else 'ways.json'
    d = query(f'[out:json][timeout:120];(way["highway"]({s},{w},{n},{e}););out body geom;')
    json.dump(d, open(out, 'w'))
    names = {}
    for way in d['elements']:
        t = way['tags']
        if t.get('name'):
            names.setdefault((t['name'], t.get('highway')), 0)
            names[(t['name'], t.get('highway'))] += 1
    print(f"{len(d['elements'])} ways -> {out}")
    for (nm, hw), c in sorted(names.items()):
        print(f'  {nm} [{hw}] x{c}')


def cmd_named(a):
    s, w, n, e, rx = a[:5]
    q = f'''[out:json][timeout:120];(
      nwr["name"~"{rx}"]({s},{w},{n},{e});
      node["highway"~"bus_stop|elevator"]({s},{w},{n},{e});
      way["highway"="steps"]({s},{w},{n},{e});
      nwr["tourism"="viewpoint"]({s},{w},{n},{e});
      node["amenity"~"cafe|restaurant|bar|pub"]({s},{w},{n},{e});
      node["shop"]({s},{w},{n},{e});
    );out center tags;'''
    d = query(q)
    for el in d['elements']:
        t = el.get('tags', {})
        lat = el.get('lat') or el.get('center', {}).get('lat')
        lon = el.get('lon') or el.get('center', {}).get('lon')
        addr = f"{t.get('addr:street', '')} {t.get('addr:housenumber', '')}".strip()
        print(f"{el['type']} {el['id']} {lat:.6f},{lon:.6f} | {t.get('name')} | {t.get('name:en') or ''} | {kind(t)} | {addr}")


def cmd_dump(a):
    d = json.load(open(a[0]))
    want = set(a[1:])
    for way in d['elements']:
        t = way['tags']
        if t.get('name') in want:
            extra = {k: v for k, v in t.items() if k in ('oneway', 'incline', 'footway', 'surface', 'step_count')}
            print(f"\n## {t['name']} [{t.get('highway')}] id={way['id']} n={len(way['geometry'])} {extra}")
            print('  ' + fmt(way['geometry']))


def cmd_box(a):
    d = json.load(open(a[0]))
    s, w, n, e = map(float, a[1:5])
    for way in d['elements']:
        g = way['geometry']
        if any(s <= p['lat'] <= n and w <= p['lon'] <= e for p in g):
            t = way['tags']
            extra = {k: v for k, v in t.items() if k not in ('name', 'name:ko', 'name:en', 'highway')}
            print(f"\n## {t.get('name')} [{t.get('highway')}] id={way['id']} n={len(g)} {extra}")
            print('  ' + fmt(g))


if __name__ == '__main__':
    if len(sys.argv) < 3:
        print(__doc__); sys.exit(1)
    {'ways': cmd_ways, 'named': cmd_named, 'dump': cmd_dump, 'box': cmd_box}[sys.argv[1]](sys.argv[2:])
