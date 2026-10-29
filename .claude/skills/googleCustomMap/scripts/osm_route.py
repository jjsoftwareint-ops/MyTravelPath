#!/usr/bin/env python3
"""Shortest path over an overpass.py ways.json, preferring bike paths and riverside lanes over main roads.
usage: osm_route.py ways.json out.json "label|lat,lon|lat,lon" ["label|lat,lon|lat,lon" ...]
Each argument is one leg (start and end snap to the nearest OSM node). Cost = length x factor per highway tag
(cycleway 0.8, footway/path/track 1, residential/unclassified 1.1, tertiary 1.6, secondary 3.5, primary 4, trunk 6);
a way named *자전거* or tagged bicycle=designated costs 0.7, so a riverside bike path wins over the parallel national
road (Gapyeong river trail, 2026-10-30: Valhalla put the Gyeonggang → Chunseong leg on 경춘로, this put it on 북한강변길).
Prints each leg's length and street composition; out.json = [{label, coords: [[lat, lon], ...]}] for a layers_kml spec.
Run with /opt/homebrew/bin/python3 (any python works here; overpass.py itself needs the Homebrew one, see SKILL.md).
"""
import collections, heapq, json, math, sys
COST = {'cycleway': 0.8, 'footway': 1, 'path': 1, 'track': 1, 'pedestrian': 1, 'living_street': 1, 'steps': 1.5,
        'residential': 1.1, 'unclassified': 1.1, 'service': 1.2, 'tertiary': 1.6, 'tertiary_link': 1.6,
        'secondary': 3.5, 'secondary_link': 3.5, 'primary': 4, 'primary_link': 4, 'trunk': 6, 'trunk_link': 6}
def dist(a, b): return math.hypot((b[1] - a[1]) * 88000, (b[0] - a[0]) * 111000)
def main():
    ways = [e for e in json.load(open(sys.argv[1]))['elements'] if e['type'] == 'way' and 'geometry' in e]
    adj = collections.defaultdict(list); coord = {}
    for w in ways:
        t = w.get('tags', {}); hw = t.get('highway')
        if not hw or hw.startswith('motorway') or hw in ('construction', 'proposed'): continue
        if t.get('access') in ('private', 'no') and hw != 'footway': continue
        c = COST.get(hw, 2)
        if '자전거' in t.get('name', '') or t.get('bicycle') == 'designated': c = 0.7
        pts = [(p['lat'], p['lon']) for p in w['geometry']]
        for i1, i2, a, b in zip(w['nodes'], w['nodes'][1:], pts, pts[1:]):
            coord[i1] = a; coord[i2] = b; L = dist(a, b)
            adj[i1].append((i2, L * c, L, hw, t.get('name', ''))); adj[i2].append((i1, L * c, L, hw, t.get('name', '')))
    nearest = lambda p: min(coord, key=lambda n: dist(coord[n], p))
    def sp(s, e):
        pq = [(0, s)]; prev = {s: None}; best = {s: 0}
        while pq:
            c, n = heapq.heappop(pq)
            if n == e: break
            if c > best.get(n, 1e18): continue
            for m, cc, L, hw, name in adj[n]:
                if c + cc < best.get(m, 1e18): best[m] = c + cc; prev[m] = (n, L, hw, name); heapq.heappush(pq, (c + cc, m))
        path = []; n = e
        while prev.get(n): p, L, hw, name = prev[n]; path.append((n, L, hw, name)); n = p
        return [(s, 0, None, None)] + path[::-1]
    out = []; total = 0
    for arg in sys.argv[3:]:
        label, a, b = arg.split('|'); a = tuple(map(float, a.split(','))); b = tuple(map(float, b.split(',')))
        p = sp(nearest(a), nearest(b)); L = sum(x[1] for x in p); total += L
        comp = collections.OrderedDict()
        for n, l, hw, nm in p[1:]: k = f"{hw}:{nm or '-'}"; comp[k] = comp.get(k, 0) + l
        print(f'== {label}: {L:.0f} m'); [print(f'   {int(v):5d} m  {k}') for k, v in comp.items() if v > 40]
        out.append({'label': label, 'coords': [coord[x[0]] for x in p]})
    print('TOTAL', int(total), 'm'); json.dump(out, open(sys.argv[2], 'w'))
if __name__ == '__main__': main()
