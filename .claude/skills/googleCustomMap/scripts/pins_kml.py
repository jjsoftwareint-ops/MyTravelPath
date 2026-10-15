#!/usr/bin/env python3
"""Pins-only KML (no route line) for a place collection: restaurants, cafés, shops. Google My Maps renders the
per-pin icons and an 'Open Naver Map' link (the place's own Naver page when naver_id is in the spec).

usage: pins_kml.py spec.json out.kml [--no-maplinks] [--plain]
  --plain: plain-text descriptions (line break + bare Naver URL) for the Google Maps mobile app, which does not
           render HTML descriptions; the default HTML form (<a>Open Naver Map</a>) is for the browser.
spec.json: {"name": "...", "desc": "...", "waypoints": [{"lat","lon","name","desc","label"?,"icon"?}, ...]}
Icons come from build_gpx.py (explicit "icon" or the keyword matcher).
"""
import json, os, sys, xml.dom.minidom
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from build_gpx import ICONS, icon_href, html_desc, auto_icon, esc, pin_name


def main():
    spec = json.load(open(sys.argv[1], encoding='utf-8'))
    out = sys.argv[2]
    maplinks = None if '--no-maplinks' in sys.argv else ('plain' if '--plain' in sys.argv else 'html')
    wpts = spec['waypoints']
    chosen = [w.get('icon') or auto_icon(dict(w, icon=None), 1, 3) for w in wpts]   # never start/end for a pin list
    K = ['<?xml version="1.0" encoding="UTF-8"?>', '<kml xmlns="http://www.opengis.net/kml/2.2"><Document>',
         f"<name>{esc(spec.get('name', 'places'))}</name>"]
    if spec.get('desc'):
        K.append(f"<description><![CDATA[{spec['desc']}]]></description>")
    for icon in sorted(set(chosen)):
        iid, color, _, _ = ICONS[icon]
        sid = f'icon-{iid}-{color}'
        for variant, scale in (('normal', 1.0), ('highlight', 1.1)):
            K.append(f'<Style id="{sid}-{variant}"><IconStyle><color>ff{color[4:6]}{color[2:4]}{color[0:2]}</color><scale>{scale}</scale>'
                     f'<Icon><href>{esc(icon_href(icon))}</href></Icon><hotSpot x="32" xunits="pixels" y="64" yunits="insetPixels"/></IconStyle>'
                     f'<LabelStyle><scale>0</scale></LabelStyle></Style>')
        K.append(f'<StyleMap id="{sid}"><Pair><key>normal</key><styleUrl>#{sid}-normal</styleUrl></Pair>'
                 f'<Pair><key>highlight</key><styleUrl>#{sid}-highlight</styleUrl></Pair></StyleMap>')
    K.append(f"<Folder><name>{esc(spec.get('name', 'places'))}</name>")
    for w, icon in zip(wpts, chosen):
        iid, color, _, _ = ICONS[icon]
        K.append(f"<Placemark><name>{esc(pin_name(w['name']))}</name><description><![CDATA[{html_desc(w, maplinks)}]]></description>"
                 f"<styleUrl>#icon-{iid}-{color}</styleUrl><Point><coordinates>{w['lon']:.6f},{w['lat']:.6f},0</coordinates></Point></Placemark>")
    K.append('</Folder></Document></kml>')
    kml = '\n'.join(K) + '\n'
    xml.dom.minidom.parseString(kml.encode('utf-8'))
    open(out, 'w', encoding='utf-8').write(kml)
    print(f'{out}: {len(wpts)} pins, XML OK')
    for w, icon in zip(wpts, chosen):
        print(f'  [{icon:>11}]  {w["name"]}')


if __name__ == '__main__':
    main()
