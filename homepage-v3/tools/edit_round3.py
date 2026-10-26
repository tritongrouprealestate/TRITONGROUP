"""Round 3 edits (26 Oct 2026): premium Signature Projects header, four more gallery photos removed."""
import re, sys
p = sys.argv[1] if len(sys.argv) > 1 else 'dist/home.fragment.html'
h = open(p, encoding='utf8').read()

# 1. gallery: remove four more photos, rebalance tile sizes to 20 cells (4 columns x 5 rows)
for t in ['Infinity pool, Nandi Hills views', 'Master plan, 30 villas', 'Private garden &amp; barbeque', 'Zen lounge']:
    j = h.find('data-title="%s"' % t); assert j > 0, t
    k = h.rfind('<button', 0, j); e = h.find('</button>', j) + len('</button>')
    h = h[:k] + h[e:]
def swap(h, title, a, b):
    j = h.find('data-title="%s"' % title); k = h.rfind('<button', 0, j); e = h.find('>', k)
    tag = h[k:e]; m = re.search(r'class="([^"]*)"', tag); toks = m.group(1).split(); assert a in toks, (title, toks)
    toks[toks.index(a)] = b
    return h[:k] + tag[:m.start()] + 'class="%s"' % ' '.join(toks) + tag[m.end():] + h[e:]
h = swap(h, 'Private roof terrace', 's25', 's23')
h = swap(h, 'Tropical balcony retreat', 's25', 's23')

# 2. Signature Projects header, no photo
i = h.find('class="sr"'); s = h.rfind('<div', 0, i); e = h.find('<article', i)
new = '''<div data-reveal="" class="tg-sig">
      <h2 class="tg-sig-title">
        <span class="tg-sig-a">Our signature</span>
        <span class="tg-sig-b">Projects</span>
      </h2>
      <div class="tg-sig-side">
        <p class="tg-sig-lead">Real estate projects in North Bangalore, near the Airport and Nandi Hills</p>
        <ul class="tg-sig-meta"><li><b>02</b> communities</li><li>RERA registered</li></ul>
        <a href="https://tritongroup.in/our-projects/" class="sx">All projects →</a>
      </div>
    </div>
    '''
h = h[:s] + new + h[e:]
open(p, 'w', encoding='utf8').write(h)
print('ok; tiles now', h.count('data-big='))
