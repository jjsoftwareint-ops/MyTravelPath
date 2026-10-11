#!/usr/bin/env python3
"""Geocode place names with Nominatim (OSM). usage: geocode.py "query" ["query" ...] [--viewbox W,S,E,N]

Nominatim only knows what OSM has: markets, churches, schools, bus stops, big cafes. For small shops use
WebSearch for the road-name address and locate it on the street dump instead.
"""
import json, sys, time, urllib.parse, urllib.request


def main():
    args = sys.argv[1:]
    viewbox = None
    if '--viewbox' in args:
        i = args.index('--viewbox'); viewbox = args[i + 1]; del args[i:i + 2]
    for q in args:
        params = {'q': q, 'format': 'json', 'limit': 3, 'accept-language': 'ko,en'}
        if viewbox:
            params.update(viewbox=viewbox, bounded=0)
        req = urllib.request.Request('https://nominatim.openstreetmap.org/search?' + urllib.parse.urlencode(params),
                                     headers={'User-Agent': 'gpx-route-builder/1.0'})
        try:
            r = json.load(urllib.request.urlopen(req, timeout=30))
            print('##', q)
            for x in r:
                print(f"   {float(x['lat']):.6f},{float(x['lon']):.6f} {x.get('type')} | {x['display_name'][:100]}")
            if not r:
                print('   (no result)')
        except Exception as e:
            print('##', q, 'ERR', e)
        time.sleep(1.1)


if __name__ == '__main__':
    main()
