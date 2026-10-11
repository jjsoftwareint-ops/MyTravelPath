#!/usr/bin/env python3
"""Export a spec's waypoints as a CSV layer for Google My Maps (Import → CSV, pick Latitude/Longitude as
position and Label or Name as the marker title).

usage: points_csv.py spec.json out.csv [--maplinks]   (--maplinks adds a Naver Map URL column)
The spec's waypoints may carry an optional short "label" (e.g. "Start", "End", "(hidden) market entrance");
when missing, the label is the name with its leading "N. " number stripped.
"""
import csv, json, os, re, sys
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from build_gpx import map_links, html_desc


def main():
    spec = json.load(open(sys.argv[1], encoding='utf-8'))
    with open(sys.argv[2], 'w', newline='', encoding='utf-8-sig') as f:  # BOM so Excel shows Korean correctly
        w = csv.writer(f)
        ml = '--maplinks' in sys.argv
        w.writerow(['Order', 'Label', 'Name', 'Latitude', 'Longitude', 'Description'] + (['Naver Map'] if ml else []))
        for i, p in enumerate(spec['waypoints'], 1):
            label = p.get('label') or re.sub(r'^\d+\.\s*', '', p['name'])
            row = [i, label, p['name'], f"{p['lat']:.6f}", f"{p['lon']:.6f}", html_desc(p, 'plain' if ml else None)]
            if ml:
                row += list(map_links(p['lat'], p['lon'], label).values())
            w.writerow(row)
    print(f"{sys.argv[2]}: {len(spec['waypoints'])} rows")


if __name__ == '__main__':
    main()
