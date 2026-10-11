#!/usr/bin/env python3
"""Search Wikimedia Commons for wide, free-licensed photos.

usage: commons_search.py "query" ["query2" ...] [--min-width 2400] [--ratio 1.4]

Prints licence, size, title, author and the thumb path for the best candidates, preferring
KOGL / CC0 / Public domain, then CC BY, then CC BY-SA. Download a candidate with
  curl -A "<descriptive UA>" -o x.jpg "https://upload.wikimedia.org/wikipedia/commons/thumb/<path>/1280px-<file>"
"""
import json, re, sys, time, urllib.parse, urllib.request

UA = "MyTravelPath-design-skill/1.0 (personal project; contact via github jjsoftwareint-ops)"
API = "https://commons.wikimedia.org/w/api.php"


def search(query, min_width, ratio):
    params = {
        "action": "query", "generator": "search", "gsrsearch": f"{query} filetype:bitmap",
        "gsrnamespace": 6, "gsrlimit": 40, "prop": "imageinfo",
        "iiprop": "url|extmetadata|size", "format": "json",
    }
    req = urllib.request.Request(API + "?" + urllib.parse.urlencode(params), headers={"User-Agent": UA})
    with urllib.request.urlopen(req, timeout=30) as r:
        data = json.load(r)
    rows = []
    for p in data.get("query", {}).get("pages", {}).values():
        ii = (p.get("imageinfo") or [{}])[0]
        w, h = ii.get("width", 0), ii.get("height", 0)
        if not w or w < min_width or w / max(h, 1) < ratio:
            continue
        md = ii.get("extmetadata", {})
        lic = md.get("LicenseShortName", {}).get("value", "?")
        if not re.match(r"(CC0|CC BY( \d\.\d)?$|CC BY-SA|KOGL|Public)", lic):
            continue
        artist = re.sub(r"<[^>]+>", "", md.get("Artist", {}).get("value", "?")).strip()[:30]
        url = ii.get("url", "")
        path = url.split("/commons/")[1].split("?")[0] if "/commons/" in url else url
        rows.append((lic, w, h, p["title"].replace("File:", ""), artist, path))
    rank = lambda r: (0 if r[0].startswith(("KOGL", "CC0", "Public")) else 1 if r[0].startswith("CC BY ") else 2)
    rows.sort(key=lambda r: (rank(r), -r[1] * r[2]))
    return rows


def main(argv):
    min_width, ratio, queries = 2400, 1.4, []
    it = iter(argv)
    for a in it:
        if a == "--min-width":
            min_width = int(next(it))
        elif a == "--ratio":
            ratio = float(next(it))
        else:
            queries.append(a)
    if not queries:
        print(__doc__)
        return 1
    for q in queries:
        print(f"=== {q} ===")
        for lic, w, h, title, artist, path in search(q, min_width, ratio)[:10]:
            print(f"{lic:13} {w}x{h}  {title[:70]}  [{artist}]\n      {path}")
        time.sleep(1)
    return 0


if __name__ == "__main__":
    sys.exit(main(sys.argv[1:]))
