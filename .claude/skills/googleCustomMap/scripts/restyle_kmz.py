#!/usr/bin/env python3
"""Re-icon pins in an existing kmz (My Maps export or ours) without rebuilding it.

usage: restyle_kmz.py file.kmz OLDPREFIX=newicon [OLDPREFIX=newicon ...]
  OLDPREFIX is the start of a style id as used in styleUrl, e.g. "icon-1523" (any colour) or "icon-1523-FF5252";
  newicon is a key of build_gpx.ICONS (e.g. viewpoint, walking). Every Style/StyleMap whose id starts with
  OLDPREFIX is cloned under the new id (icon-<id>-<RRGGBB>, keeping -nodesc/-normal/-highlight suffixes) with the
  icon href swapped for the My Maps CDN image of the new icon, and all styleUrl references are rewritten.
Example (2026-10-14): restyle_kmz.py "Naksan.kmz" icon-1469=walking icon-1523=viewpoint icon-1535=viewpoint
"""
import os, re, shutil, sys, tempfile, zipfile
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from build_gpx import ICONS, icon_href


def main():
    path = sys.argv[1]; rules = [a.split('=') for a in sys.argv[2:]]
    z = zipfile.ZipFile(path); members = {n: z.read(n) for n in z.namelist()}; z.close()
    kml = members['doc.kml'].decode('utf-8')
    for old, new in rules:
        iid, color, _, _ = ICONS[new]; newid = f'icon-{iid}-{color}'; href = icon_href(new).replace('&', '&amp;')   # XML-escape the URL
        ids = sorted(set(re.findall(r'id="(' + re.escape(old) + r'(?:-[0-9A-Fa-f]{6})?(-nodesc)?)(?:-normal|-highlight)?"', kml)), key=lambda x: x[0])
        bases = sorted(set(b for b, _ in ids) - {newid, newid + '-nodesc'})   # never treat the target as an old style
        changed = 0
        for base in bases:
            suffix = '-nodesc' if base.endswith('-nodesc') else ''
            target = newid + suffix
            # clone blocks if the target does not exist yet
            if f'id="{target}"' not in kml:
                for kind in ('Style', 'StyleMap'):
                    for m in re.finditer(r'<' + kind + r' id="' + re.escape(base) + r'(-normal|-highlight)?">.*?</' + kind + '>', kml, re.S):
                        block = m.group(0).replace(base, target)
                        block = re.sub(r'<href>[^<]*</href>', f'<href>{href}</href>', block)
                        kml = kml.replace('</Document>', block + '\n</Document>', 1)
            # rewrite references, then drop the old blocks
            kml, n = re.subn(r'<styleUrl>#' + re.escape(base) + r'</styleUrl>', f'<styleUrl>#{target}</styleUrl>', kml)
            changed += n
            kml = re.sub(r'\s*<(Style|StyleMap) id="' + re.escape(base) + r'(-normal|-highlight)?">.*?</\1>', '', kml, flags=re.S)
        print(f'{os.path.basename(path)}: {old} -> {new} ({newid}): {changed} pins restyled, old styles {bases}')
    members['doc.kml'] = kml.encode('utf-8')
    tmp = tempfile.NamedTemporaryFile(delete=False, suffix='.kmz').name
    with zipfile.ZipFile(tmp, 'w', zipfile.ZIP_DEFLATED) as out:
        out.writestr('doc.kml', members['doc.kml'])
        for n, d in members.items():
            if n != 'doc.kml': out.writestr(n, d)
    shutil.move(tmp, path)
    assert zipfile.ZipFile(path).testzip() is None
    import xml.dom.minidom; xml.dom.minidom.parseString(members['doc.kml'])   # refuse to leave a malformed file behind


if __name__ == '__main__':
    main()
