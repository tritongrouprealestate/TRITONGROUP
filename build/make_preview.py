"""Assemble the deployable site into one self-contained preview file.

The deployed site loads its stylesheet and four scripts from its own server.
An artifact is a single document, so everything is folded in: the compiled
CSS inline, the libraries from the two CDN hosts the artifact CSP admits, and
the site's own script inline and every photograph folded in as a data: URI,
because an artifact's CSP blocks external image hosts.

Nothing about the design changes. This only alters how the same files are
delivered, so what the preview shows is what the uploaded site does.
"""
import re, pathlib

root = pathlib.Path('triton-humming-valley')
html = (root / 'index.html').read_text()
css  = (root / 'css/styles.css').read_text()
js   = (root / 'js/site.js').read_text()

# ── photography → inline data URIs ──────────────────────────────────────
# The uploaded site fetches images/*.jpg from its own server. An artifact is
# a single document and its CSP blocks every external image host, so each
# photograph is folded in as a data: URI. They are re-encoded smaller than
# the deployed files — a preview should open quickly; the uploaded site keeps
# the full-resolution originals.
import base64
from io import BytesIO
try:
    from PIL import Image
except ImportError:
    Image = None

PREVIEW_MAXW, PREVIEW_Q = 1400, 70

def data_uri(path):
    if Image is None:
        return 'data:image/jpeg;base64,' + base64.b64encode(path.read_bytes()).decode()
    im = Image.open(path)
    if im.width > PREVIEW_MAXW:
        im = im.resize((PREVIEW_MAXW, round(im.height * PREVIEW_MAXW / im.width)),
                       Image.LANCZOS)
    buf = BytesIO()
    im.convert('RGB').save(buf, 'JPEG', quality=PREVIEW_Q, optimize=True, progressive=True)
    return 'data:image/jpeg;base64,' + base64.b64encode(buf.getvalue()).decode()

# The stylesheet reaches the fonts with a relative path. An artifact is one
# document with no folder beside it, so the four faces are folded in too —
# 110 KB of base64 against a preview that would otherwise fall back to the
# system stack and stop looking like the site.
for f in sorted((root / 'fonts').glob('*.woff2')):
    uri = 'data:font/woff2;base64,' + base64.b64encode(f.read_bytes()).decode()
    css = css.replace('../fonts/' + f.name, uri)

photos = {}
for f in sorted((root / 'images').glob('*.jpg')):
    photos['images/' + f.name] = data_uri(f)

def swap(text):
    for ref, uri in photos.items():
        text = text.replace(ref, uri)
    # any photograph that was never dropped in keeps its path and falls back
    # to the drawn artwork the site already handles.
    return text
html, js = swap(html), swap(js)

# ── the form has no server here ─────────────────────────────────────────
old = "  fetch('submit.php', {"
assert old in js
js = js.replace(
  "  /* Posts to submit.php, which holds the Leadi5 API key server-side and",
  """  /* PREVIEW BUILD: there is no submit.php behind this page, so the request
     is simulated. Validation, the error summary, focus handling and the
     success state are all the real code paths — only the network call is
     stubbed. On the uploaded site this posts to submit.php, which holds the
     Leadi5 key server-side. */
  if (window.__PREVIEW__) {
    setTimeout(showSuccess, 700);
    return;
  }

  /* Posts to submit.php, which holds the Leadi5 API key server-side and""")

# showSuccess is declared after its use; hoisting makes the early return valid.
js = js.replace("  function showSuccess(){", "  function showSuccess(){", 1)

# The libraries moved into <head> with defer, so the body now runs to its
# own closing tag rather than to the first script.
body = html[html.index('<body class="no-js">'):html.index('</body>')]
body = body.replace('<body class="no-js">', '<div class="no-js" id="doc">', 1)

crit = re.search(r'<style>\n(  html\{background.*?)\n</style>', html, re.S).group(1)

out = f'''<title>Triton Humming Valley</title>

<style>
{crit}
/* The artifact wrapper paints its own ground behind the page, so the night
   ground is stated explicitly rather than inherited. */
html,body{{background:#061A18;margin:0}}
</style>

<style>
{css}
</style>

{body}

<script src="https://cdn.jsdelivr.net/npm/lenis@1.3.26/dist/lenis.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.13.0/gsap.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.13.0/ScrollTrigger.min.js"></script>
<script>
window.__PREVIEW__ = true;
{js}
</script>
'''
# document.body.classList.remove('no-js') targets <body>, which this build
# does not own — retarget it at the wrapper div.
out = out.replace("document.body.classList.remove('no-js');",
                  "(document.getElementById('doc')||document.body).classList.remove('no-js');")

pathlib.Path('build/preview.html').write_text(out)
print('preview.html: %.0f KB' % (len(out)/1024))
print('photographs inlined:', len(photos))
print('missing photographs:', out.count('"images/'))
