#!/usr/bin/env python3
"""Build a single self-contained offline HTML file of Cosmic Odyssey.
Inlines style.css and every js/*.js script, and embeds the Google Fonts
(latin, latin-ext and greek subsets) as base64 so it works with no internet.
Usage: python3 tools/build_offline.py [fonts.css path] [output path]"""
import base64, os, re, sys, urllib.request

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
out = sys.argv[2] if len(sys.argv) > 2 else os.path.join(ROOT, "dist", "cosmic-odyssey-offline.html")
fonts_css_path = sys.argv[1] if len(sys.argv) > 1 else None

html = open(os.path.join(ROOT, "index.html"), encoding="utf-8").read()
css = open(os.path.join(ROOT, "style.css"), encoding="utf-8").read()

font_css = ""
if fonts_css_path and os.path.exists(fonts_css_path):
    raw = open(fonts_css_path, encoding="utf-8").read()
    keep = ("U+0000-00FF", "U+0100-02BA", "U+0370-0377")
    for block in re.findall(r"@font-face\s*{[^}]*}", raw):
        if not any(k in block for k in keep):
            continue
        url = re.search(r"url\((https://[^)]+)\)", block).group(1)
        data = urllib.request.urlopen(url, timeout=60).read()
        b64 = base64.b64encode(data).decode()
        font_css += block.replace(url, "data:font/woff2;base64," + b64) + "\n"

# drop remote font links; keep the fallback stacks from style.css
html = re.sub(r'<link rel="preconnect"[^>]*>\n?', "", html)
html = re.sub(r'<link rel="stylesheet" href="https://fonts.googleapis.com[^>]*>\n?', "", html)
html = html.replace('<link rel="stylesheet" href="style.css">', "<style>\n" + font_css + css + "\n</style>")

def inline(m):
    src = m.group(1)
    js = open(os.path.join(ROOT, src), encoding="utf-8").read()
    js = js.replace("</script", "<\\/script")
    return "<script>/* " + src + " */\n" + js + "\n</script>"
html = re.sub(r'<script src="(js/[^"]+)"></script>', inline, html)

title = re.search(r"<title>.*?</title>", html).group(0)
body = html.replace(title, "", 1)
meta = re.search(r'<meta name="description"[^>]*>', body)
if meta:
    body = body.replace(meta.group(0), "", 1)
doc = ("<!doctype html>\n<html lang=\"en\">\n<head>\n<meta charset=\"utf-8\">\n"
       "<meta name=\"viewport\" content=\"width=device-width, initial-scale=1, viewport-fit=cover\">\n"
       + title + "\n" + (meta.group(0) if meta else "") + "\n</head>\n<body>\n" + body.strip() + "\n</body>\n</html>\n")
os.makedirs(os.path.dirname(out), exist_ok=True)
open(out, "w", encoding="utf-8").write(doc)
print(f"wrote {out} ({len(doc.encode()) / 1e6:.2f} MB)")
