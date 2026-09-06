"""Assemble the deployable site into one self-contained preview file.

The deployed site loads its stylesheet and four scripts from its own server.
An artifact is a single document, so everything is folded in: the compiled
CSS inline, the libraries from the two CDN hosts the artifact CSP admits, and
the site's own script inline with the photography swapped for the generated
artwork in build/art.json.

Nothing about the design changes. This only alters how the same files are
delivered, so what the preview shows is what the uploaded site does.
"""
import json, re, pathlib

root = pathlib.Path('triton-humming-valley')
html = (root / 'index.html').read_text()
css  = (root / 'css/styles.css').read_text()
js   = (root / 'js/site.js').read_text()
art  = json.loads(pathlib.Path('build/art.json').read_text())

# ── photography → generated artwork ─────────────────────────────────────
swaps = [
  ('photo-1464822759023-fed622ff2c3b', art['hero']),
  ('photo-1439066615861-d1af74d74000', art['band']),
  ('photo-1600585154340-be6161a56a0c', art['ch3']),
  ('photo-1600596542815-ffad4c1539a9', art['villa4']),
  ('photo-1613977257363-707ba9348227', art['ch0']),
  ('photo-1600607687939-ce8a6c25118c', art['ch1']),
  ('photo-1502005229762-cf1b2da7c5d6', art['ch2']),
  ('photo-1600566753086-00f18fb6b3ea', art['g0']),
  ('photo-1416331108676-a22ccb276e35', art['g5']),
]
def swap(text):
    for frag, data in swaps:
        text = re.sub(r'https://images\.unsplash\.com/' + frag + r'[^\'"\s]*', data, text)
    # anything not named above falls back to an interior
    text = re.sub(r'https://images\.unsplash\.com/[^\'"\s]*', art['g3'], text)
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

body = html[html.index('<body class="no-js">'):html.index('<script src="js/lenis.min.js">')]
body = body.replace('<body class="no-js">', '<div class="no-js" id="doc">', 1)

crit = re.search(r'<style>\n(  html\{background.*?)\n</style>', html, re.S).group(1)

out = f'''<title>Triton Humming Valley</title>

<style>
{crit}
/* The artifact wrapper paints its own ground behind the page, so the night
   ground is stated explicitly rather than inherited. */
html,body{{background:#0E1621;margin:0}}
</style>

<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Marcellus&family=Manrope:wght@200..800&display=swap">

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
print('unsplash refs remaining:', out.count('images.unsplash.com'))
