#!/usr/bin/env python3
"""Share images (1200x630) for the blog: assets/og/<slug>.jpg, used as og:image by src/seo.ts.

Run from the repo root after adding a post:  python3 scripts/blog-og.py
Needs macOS (Chrome headless + sips). Put a photo in scripts/og-src/ (any size, ideally 1600px wide)
or pick a 3D emoji from assets/emoji (copy a large original there). Layout: cream card, title left,
photo or emoji tile right, brand mark bottom left. The slug must equal the post id (and `blog` is the list page).
"""
import html, os, subprocess
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC = f"{ROOT}/scripts/og-src"
OUT = f"{ROOT}/assets/og"
CH = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
# (slug, title, keyword line, photo or None, emoji png or None)
CARDS = [
    ("blog", "Blog", "A Korea travel diary", None, "books.png"),
    ("is-the-long-line-worth-it", "Is the long line really worth it?", "Queues · 두쫀쿠 · 버터떡", "mango.jpg", None),
    ("korea-falls-back-in-love-with-pens", "Why Korea is falling back in love with pens", "필사 · 다꾸 · 신꾸 · letters", None, "pen.png"),
    ("palace-dates-and-museum-shops", "The hottest date spot in Seoul is 600 years old", "궁캉스 · 뮷즈 · 생과방", "palace.jpg", None),
]
CSS = f"""
@font-face{{font-family:R;src:url('file://{ROOT}/assets/fonts/roboto-latin.woff2');font-weight:100 900}}
*{{box-sizing:border-box;margin:0}}
body{{width:1200px;height:630px;background:#fffaf1;font-family:R,'Apple SD Gothic Neo',sans-serif;color:#2b2118;display:flex;overflow:hidden}}
.l{{flex:0 0 700px;padding:56px 56px 48px 64px;display:flex;flex-direction:column;justify-content:space-between}}
.tag{{align-self:flex-start;background:#fdebd9;color:#c2410c;font-weight:700;font-size:26px;padding:8px 22px;border-radius:999px}}
h1{{line-height:1.1;font-weight:800;letter-spacing:-0.01em}}
.t{{font-size:30px;color:#7a6a5a;margin-top:22px}}
.f{{display:flex;align-items:center;gap:16px;font-size:28px;font-weight:700}}
.f img{{width:56px;height:56px;border-radius:50%}}
.r{{flex:1;background-size:cover;background-position:center}}
.e{{background:#fdebd9;display:flex;align-items:center;justify-content:center}}
.e img{{width:300px}}
"""
os.makedirs(OUT, exist_ok=True)
for slug, title, teaser, photo, emoji in CARDS:
    fs = 84 if len(title) < 24 else 62
    right = (f'<div class="r" style="background-image:url(\'file://{SRC}/{photo}\')"></div>' if photo
             else f'<div class="r e"><img src="file://{SRC}/{emoji}"></div>')
    page = f"""<!doctype html><meta charset=utf-8><style>{CSS}h1{{font-size:{fs}px}}</style>
<div class=l><span class=tag>{'Diary' if slug == 'blog' else 'Blog'}</span><div><h1>{html.escape(title)}</h1><div class=t>{html.escape(teaser)}</div></div>
<div class=f><img src="file://{ROOT}/assets/brand.png">My Travel Path</div></div>{right}"""
    tmp = f"/tmp/blog-og-{slug}"
    open(f"{tmp}.html", "w").write(page)
    subprocess.run([CH, "--headless", "--disable-gpu", "--hide-scrollbars", "--force-device-scale-factor=1",
                    "--window-size=1200,630", "--virtual-time-budget=3000", f"--screenshot={tmp}.png", f"file://{tmp}.html"],
                   stderr=subprocess.DEVNULL, check=True)
    subprocess.run(["sips", "-s", "format", "jpeg", "-s", "formatOptions", "82", f"{tmp}.png", "--out", f"{OUT}/{slug}.jpg"],
                   stdout=subprocess.DEVNULL, check=True)
    print(slug, os.path.getsize(f"{OUT}/{slug}.jpg") // 1024, "KB")
