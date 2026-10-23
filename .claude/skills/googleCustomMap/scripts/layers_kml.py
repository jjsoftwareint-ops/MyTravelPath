#!/usr/bin/env python3
"""Build a multi-layer KML for Google My Maps: several coloured lines (e.g. ascent / descent) and pin folders.

usage: layers_kml.py spec.json out.kml

spec.json:
{
  "name": "...", "desc": "...", "link": "https://youtu.be/...",
  "layers": [
    { "name": "Ascent",  "line": {"name": "...", "color": "D93025"},        # RRGGBB; optional "width" (default 4)
      "segments": [ {"label": "...", "approx": false, "coords": "lat,lon lat,lon ..."}, ... ],
      "more_lines": [ {"name": "...", "coords": "lat,lon ..."} ],   # optional: extra separate lines, same colour
      "pins": [ {"lat": 0, "lon": 0, "name": "1. ...", "desc": "...", "icon": "start", "naver_id": "...", "image": "https://… (optional)"}, ... ] },
    { "name": "Restaurants", "pins": [ ... ] }
  ]
}
Each top-level Folder becomes one layer when imported into My Maps. Pin icons use the My Maps styleUrl scheme
from build_gpx.ICONS; descriptions are HTML in CDATA with one "Open Naver Map" link. Lines are not densified
(a KML LineString is drawn straight between vertices); keep every line under ~2 000 vertices so it stays editable.
"""
import json, os, sys, xml.dom.minidom
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from build_gpx import ICONS, icon_href, esc, hav, naver_url, auto_icon, pin_name, with_korean_line


def parse(coords):
    return [tuple(map(float, c.split(','))) for c in coords.split()]


def main():
    spec = json.load(open(sys.argv[1], encoding='utf-8')); out = sys.argv[2]
    K = ['<?xml version="1.0" encoding="UTF-8"?>', '<kml xmlns="http://www.opengis.net/kml/2.2"><Document>',
         f"<name>{esc(spec['name'])}</name>"]
    if spec.get('desc'):
        src = f'<br><a href="{spec["link"]}">Source video</a>' if spec.get('link') else ''
        K.append(f"<description><![CDATA[{spec['desc']}{src}]]></description>")
    used_icons, used_lines = [], []
    for li, layer in enumerate(spec['layers']):
        if layer.get('line'):
            c = layer['line']['color']; sid = f'line-{li}'
            K.append(f'<Style id="{sid}"><LineStyle><color>ff{c[4:6]}{c[2:4]}{c[0:2]}</color><width>{layer["line"].get("width", 4)}</width></LineStyle></Style>')
        for pi, w in enumerate(layer.get('pins', [])):
            icon = w.get('icon') or auto_icon(w, pi, len(layer['pins']))
            w['icon'] = icon
            if icon in used_icons:
                continue
            used_icons.append(icon)
            iid, color, _, _ = ICONS[icon]; sid = f'icon-{iid}-{color}'
            for variant, scale in (('normal', 1), ('highlight', 1)):
                K.append(f'<Style id="{sid}-{variant}"><IconStyle><color>ff{color[4:6]}{color[2:4]}{color[0:2]}</color><scale>{scale}</scale>'
                         f'<Icon><href>{esc(icon_href(icon))}</href></Icon><hotSpot x="32" xunits="pixels" y="64" yunits="insetPixels"/></IconStyle>'
                         f'<LabelStyle><scale>0</scale></LabelStyle></Style>')
            K.append(f'<StyleMap id="{sid}"><Pair><key>normal</key><styleUrl>#{sid}-normal</styleUrl></Pair>'
                     f'<Pair><key>highlight</key><styleUrl>#{sid}-highlight</styleUrl></Pair></StyleMap>')
    report = []
    for li, layer in enumerate(spec['layers']):
        K.append(f"<Folder><name>{esc(layer['name'])}</name>")
        if layer.get('line'):
            pts = []
            for seg in layer['segments']:
                sp = parse(seg['coords'])
                if pts and hav(pts[-1], sp[0]) > 1:
                    gap = hav(pts[-1], sp[0])
                    if gap > 60:
                        print(f"WARNING: {gap:.0f} m jump before segment '{seg['label']}'", file=sys.stderr)
                pts += [p for p in sp if not pts or p != pts[-1]]
            length = sum(hav(pts[i], pts[i + 1]) for i in range(len(pts) - 1))
            approx = [s['label'] for s in layer['segments'] if s.get('approx')]
            legs = '<br>'.join(f"{i + 1}. {s['label']}{' (approx.)' if s.get('approx') else ''}" for i, s in enumerate(layer['segments']))
            K.append(f"<Placemark><name>{esc(layer['line']['name'])}</name><description><![CDATA[{length / 1000:.1f} km<br>{legs}]]></description>"
                     f"<styleUrl>#line-{li}</styleUrl><LineString><tessellate>1</tessellate><coordinates>"
                     + ' '.join(f'{p[1]:.6f},{p[0]:.6f},0' for p in pts) + '</coordinates></LineString></Placemark>')
            report.append(f"  line '{layer['line']['name']}': {len(pts)} vertices, {length:.0f} m" + (f", approx legs: {approx}" if approx else ''))
            # optional extra, disconnected lines in the same colour (e.g. side lanes of a street)
            for extra in layer.get('more_lines', []):
                ep = parse(extra['coords']); el = sum(hav(ep[i], ep[i + 1]) for i in range(len(ep) - 1))
                K.append(f"<Placemark><name>{esc(extra['name'])}</name><description><![CDATA[{el:.0f} m]]></description>"
                         f"<styleUrl>#line-{li}</styleUrl><LineString><tessellate>1</tessellate><coordinates>"
                         + ' '.join(f'{p[1]:.6f},{p[0]:.6f},0' for p in ep) + '</coordinates></LineString></Placemark>')
                report.append(f"    + line '{extra['name']}': {len(ep)} vertices, {el:.0f} m")
        for w in layer.get('pins', []):
            iid, color, _, _ = ICONS[w['icon']]
            desc = with_korean_line(w.get('desc', ''), w['name']) + f'<br><a href="{naver_url(w["lat"], w["lon"], w.get("naver_id"), w.get("address"))}">Open Naver Map</a>'
            if w.get('image'):  # hotlinked Naver/Google place photo (no copyright issue as a link), only for important pins
                desc = f'<img src="{w["image"]}" width="300"><br>' + desc
            K.append(f"<Placemark><name>{esc(pin_name(w['name']))}</name><description><![CDATA[{desc}]]></description>"
                     f"<styleUrl>#icon-{iid}-{color}</styleUrl><Point><coordinates>{w['lon']:.6f},{w['lat']:.6f},0</coordinates></Point></Placemark>")
            report.append(f"    [{w['icon']:>11}] {w['name']}")
        K.append('</Folder>')
        report.append(f"  layer '{layer['name']}': {len(layer.get('pins', []))} pins")
    K.append('</Document></kml>')
    kml = '\n'.join(K) + '\n'
    xml.dom.minidom.parseString(kml.encode('utf-8'))
    open(out, 'w', encoding='utf-8').write(kml)
    print(f'{out}: KML written ({len(spec["layers"])} layers), XML OK'); print('\n'.join(report))


if __name__ == '__main__':
    main()
