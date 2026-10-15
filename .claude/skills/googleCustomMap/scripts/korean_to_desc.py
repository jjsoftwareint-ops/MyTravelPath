#!/usr/bin/env python3
"""Move the '(한국어)' bracket out of pin titles into the description of an existing kmz.

usage: korean_to_desc.py file.kmz [file.kmz ...]
Title 'Keun-ung cliff path entrance (큰엉 입구)' becomes 'Keun-ung cliff path entrance'; the description gains a
first line '<b>Keun-ung cliff path entrance (큰엉 입구)</b><br>' (plain text + newline when the description is
not CDATA/HTML). Pins without a Korean bracket are left alone; already-moved pins are skipped. Validates XML.
"""
import os, re, shutil, sys, tempfile, zipfile, xml.dom.minidom
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from build_gpx import name_parts, esc, PIN_PREFIX

def fix_placemark(pm):
    if '<Point>' not in pm: return pm, 0
    m = re.search(r'<name>(.*?)</name>', pm, re.S)
    raw = m.group(1); cdata = raw.startswith('<![CDATA[')
    title = (raw[9:-3] if cdata else raw).strip()
    prefix = PIN_PREFIX if title.startswith(PIN_PREFIX) else ''
    short, full = name_parts(title)
    if not full: return pm, 0
    new_title = prefix + short
    pm = pm.replace(m.group(0), '<name>' + ('<![CDATA[' + new_title + ']]>' if cdata else esc(new_title)) + '</name>', 1)
    d = re.search(r'<description>(.*?)</description>', pm, re.S)
    line_html = f'<b>{esc(full)}</b><br>'
    if d:
        body = d.group(1)
        if full in body: return pm, 0
        if body.startswith('<![CDATA['): new = '<![CDATA[' + line_html + body[9:]
        else: new = '<![CDATA[' + line_html + body + ']]>'
        pm = pm.replace(d.group(0), '<description>' + new + '</description>', 1)
    else:
        pm = pm.replace('</name>', '</name><description><![CDATA[' + line_html + ']]></description>', 1)
    return pm, 1

def main():
    for path in sys.argv[1:]:
        z = zipfile.ZipFile(path); members = {n: z.read(n) for n in z.namelist()}; z.close()
        kml = members['doc.kml'].decode('utf-8'); n = 0
        def sub(m):
            nonlocal n
            out, k = fix_placemark(m.group(0)); n += k; return out
        kml = re.sub(r'<Placemark[^>]*>.*?</Placemark>', sub, kml, flags=re.S)
        xml.dom.minidom.parseString(kml.encode('utf-8'))
        members['doc.kml'] = kml.encode('utf-8')
        tmp = tempfile.NamedTemporaryFile(delete=False, suffix='.kmz').name
        with zipfile.ZipFile(tmp, 'w', zipfile.ZIP_DEFLATED) as out:
            out.writestr('doc.kml', members['doc.kml'])
            for k, dta in members.items():
                if k != 'doc.kml': out.writestr(k, dta)
        shutil.move(tmp, path)
        print(f'{os.path.basename(path)}: {n} pins moved Korean into the description')

if __name__ == '__main__':
    main()
