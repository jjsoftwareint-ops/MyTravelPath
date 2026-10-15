#!/usr/bin/env python3
"""Add the '<b>English (한국어)</b>' first line to every pin description that lacks one, in existing kmz files.

usage: korean_from_naver.py [--names names.json] file.kmz [file.kmz ...]
  --names: JSON {"<start of English title>": "한국어 이름"} used before any Naver lookup (for pins without a Naver link).
Korean source, per pin: the Naver place name (place/summary API, from the pin's 'Open Naver Map' entry link);
else the decoded Korean address from an address-search link; pins with neither are left unchanged.
Already-lined pins (description starts with <b>…한글…</b>) are skipped. Validates XML before saving.
"""
import json, os, re, shutil, subprocess, sys, tempfile, time, urllib.parse, zipfile, xml.dom.minidom
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from build_gpx import esc, PIN_PREFIX
NUA = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/124 Safari/537.36'
CACHE = os.path.join(os.path.dirname(os.path.abspath(__file__)), '.naver_names.json')
cache = json.load(open(CACHE)) if os.path.exists(CACHE) else {}

def naver_name(pid):
    if pid in cache: return cache[pid]
    out = subprocess.run(['curl', '-s', '-m', '20', '-A', NUA, '-H', 'Referer: https://map.naver.com/', f'https://map.naver.com/p/api/place/summary/{pid}'], capture_output=True, text=True).stdout
    time.sleep(0.6)
    try: name = json.loads(out)['data']['placeDetail']['name']
    except Exception: name = None
    cache[pid] = name; json.dump(cache, open(CACHE, 'w'), ensure_ascii=False); return name

NAMES = {}

def fix(pm):
    if '<Point>' not in pm: return pm, None
    if re.search(r'<description>(?:<!\[CDATA\[)?\s*<b>[^<]*[가-힣][^<]*</b>', pm, re.S): return pm, None
    m = re.search(r'<name>(.*?)</name>', pm, re.S); raw = m.group(1)
    title = re.sub(r'^<!\[CDATA\[|\]\]>$', '', raw).replace(PIN_PREFIX, '').strip()
    ko = next((v for k, v in NAMES.items() if title.startswith(k)), None)
    pid = re.search(r'map\.naver\.com/p/entry/place/(\d+)', pm)
    if not ko and pid: ko = naver_name(pid.group(1))
    if not ko:
        a = re.search(r'map\.naver\.com/p/search/([^"<)\s]+)', pm)
        if a:
            dec = urllib.parse.unquote(a.group(1))
            if re.search(r'[가-힣]', dec) and not re.match(r'[0-9.]+,', dec): ko = dec
    if not ko: return pm, 'skipped'
    line = f'<b>{esc(title)} ({esc(ko)})</b><br>'
    d = re.search(r'<description>(.*?)</description>', pm, re.S)
    if d:
        body = d.group(1)
        new = '<![CDATA[' + line + (body[9:] if body.startswith('<![CDATA[') else body + ']]>')
        pm = pm.replace(d.group(0), '<description>' + new + '</description>', 1)
    else:
        pm = pm.replace('</name>', '</name><description><![CDATA[' + line + ']]></description>', 1)
    return pm, ko

def main():
    args = sys.argv[1:]
    if args[:1] == ['--names']:
        NAMES.update(json.load(open(args[1], encoding='utf-8'))); args = args[2:]
    for path in args:
        z = zipfile.ZipFile(path); members = {n: z.read(n) for n in z.namelist()}; z.close()
        kml = members['doc.kml'].decode('utf-8'); done = []; skipped = []
        def sub(m):
            out, ko = fix(m.group(0))
            if ko == 'skipped': skipped.append(re.sub(r'<!\[CDATA\[|\]\]>|\*CLICK\* ', '', re.search(r'<name>(.*?)</name>', m.group(0), re.S).group(1)).strip())
            elif ko: done.append(ko)
            return out
        kml = re.sub(r'<Placemark[^>]*>.*?</Placemark>', sub, kml, flags=re.S)
        xml.dom.minidom.parseString(kml.encode('utf-8'))
        members['doc.kml'] = kml.encode('utf-8')
        tmp = tempfile.NamedTemporaryFile(delete=False, suffix='.kmz').name
        with zipfile.ZipFile(tmp, 'w', zipfile.ZIP_DEFLATED) as out:
            out.writestr('doc.kml', members['doc.kml'])
            for k, dta in members.items():
                if k != 'doc.kml': out.writestr(k, dta)
        shutil.move(tmp, path)
        print(f'{os.path.basename(path)}: {len(done)} pins got a Korean line; skipped (no Naver link): {skipped}')

if __name__ == '__main__':
    main()
