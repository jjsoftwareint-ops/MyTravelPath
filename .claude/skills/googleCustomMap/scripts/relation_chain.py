#!/usr/bin/env python3
"""Chain an OSM hiking relation into one line between two official endpoints (used for Jeju Olle 5–7, 2026-10-13).

Inputs (cwd): <name>_rel.json = {"ways": {id: [[lat,lon],...]}} from api.openstreetmap.org/api/0.6/relation/<id>/full,
  official_endpoints.json = {"05": [slat, slon, elat, elon], ...}.
Builds a graph of way endpoints (merged within 15 m), adds "gap" edges (straight line, cost x6 + 200 m) and runs
Dijkstra from the official start to the official end. Mapped ways win where they connect; gaps appear only where
the relation really lacks data. Writes <name>_graph.json (segs: way/gap geometry) and legs.json for route.py.
Why: relation member order is jumbled on Jeju and nearest-neighbour chaining zig-zags (Olle 7 came out 2x too long).
"""
def dist(a, b): return math.hypot((a[0]-b[0])*111000, (a[1]-b[1])*88000)
off = json.load(open('official_endpoints.json'))
EXCL_LEN = {'olle7': (6089, 413, 40, 529), 'olle5': (), 'olle6': ()}
legs = {}
for name, key in (('olle5', '05'), ('olle6', '06'), ('olle7', '07')):
    rel = json.load(open(f'{name}_rel.json'))
    ways = [p for p in rel['ways'].values() if len(p) > 1]
    ways = [w for w in ways if not any(abs(sum(dist(w[i], w[i+1]) for i in range(len(w)-1)) - L) < 5 for L in EXCL_LEN[name])]
    start = (off[key][0], off[key][1]); end = (off[key][2], off[key][3])
    # nodes: way endpoints merged within 15 m; plus S and E
    pts = []
    def node(p):
        for i, q in enumerate(pts):
            if dist(p, q) < 15: return i
        pts.append(p); return len(pts) - 1
    S = node(start); E = node(end)
    edges = {}   # (u,v) -> (weight, kind, geometry)
    def add(u, v, w, kind, geom):
        if u == v: return
        if (u, v) not in edges or edges[(u, v)][0] > w: edges[(u, v)] = (w, kind, geom)
    for w in ways:
        u, v = node(w[0]), node(w[-1]); L = sum(dist(w[i], w[i+1]) for i in range(len(w)-1))
        add(u, v, L, 'way', w); add(v, u, L, 'way', w[::-1])
    n = len(pts)
    for u in range(n):
        for v in range(n):
            if u != v:
                d = dist(pts[u], pts[v])
                if d <= 2500 or u in (S, E) or v in (S, E):
                    add(u, v, d * 6 + 200, 'gap', [pts[u], pts[v]])
    adj = {}
    for (u, v), (w, kind, geom) in edges.items(): adj.setdefault(u, []).append((v, w))
    best = {S: 0}; prev = {}; pq = [(0, S)]
    while pq:
        d, u = heapq.heappop(pq)
        if d > best.get(u, 1e18): continue
        if u == E: break
        for v, w in adj.get(u, []):
            nd = d + w
            if nd < best.get(v, 1e18): best[v] = nd; prev[v] = u; heapq.heappush(pq, (nd, v))
    path = [E]
    while path[-1] != S: path.append(prev[path[-1]])
    path.reverse()
    segs = []; gaps = []; total = 0
    for u, v in zip(path, path[1:]):
        w, kind, geom = edges[(u, v)]
        if kind == 'way': segs.append(('way', geom)); total += w
        else: segs.append(('gap', geom)); gaps.append(round(dist(geom[0], geom[1])))
    print(f'{name}: path uses {sum(1 for k,_ in segs if k=="way")} ways ({total/1000:.1f} km mapped) + {len(gaps)} gaps {gaps}')
    for i, (k, g) in enumerate(segs):
        if k == 'gap': legs[f'{name}_g{i}'] = [list(g[0]), list(g[1])]
    json.dump({'segs': segs, 'start': start, 'end': end}, open(f'{name}_graph.json', 'w'))
json.dump(legs, open('legs.json', 'w')); print(len(legs), 'gap legs to route')
