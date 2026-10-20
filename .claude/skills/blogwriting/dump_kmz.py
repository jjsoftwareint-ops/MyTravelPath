#!/usr/bin/env python3
"""Print the folders, pin names and pin notes of one or more kmz files.

Usage: python3 -I dump_kmz.py "assets/maps/Incheon China Town.kmz" [more.kmz ...]

Strips HTML, Naver links and the "From the video …" credit so the output is
just the facts a guide text may use.
"""
import re
import sys
import zipfile
import xml.etree.ElementTree as ET

NS = {"k": "http://www.opengis.net/kml/2.2"}


def clean(text: str) -> str:
    text = re.sub(r"<[^>]+>", " ", text or "")
    text = re.sub(r"https?://\S+", "", text)
    text = re.sub(r"From the video.*?\)\.?", "", text)
    text = text.replace("Open Naver Map", "").replace("]]&gt;", "")
    return re.sub(r"\s+", " ", text).strip()


def walk(node, depth=0):
    for folder in node.findall("k:Folder", NS):
        print("  " * depth + "## " + (folder.findtext("k:name", default="", namespaces=NS)))
        walk(folder, depth + 1)
    for pin in node.findall("k:Placemark", NS):
        name = pin.findtext("k:name", default="", namespaces=NS)
        desc = clean(pin.findtext("k:description", default="", namespaces=NS))
        print("  " * depth + f"- {name} :: {desc[:300]}")


for path in sys.argv[1:]:
    print(f"\n###### {path}")
    with zipfile.ZipFile(path) as z:
        kml = next(n for n in z.namelist() if n.endswith(".kml"))
        root = ET.fromstring(z.read(kml))
    doc = root.find("k:Document", NS)
    walk(doc if doc is not None else root)
