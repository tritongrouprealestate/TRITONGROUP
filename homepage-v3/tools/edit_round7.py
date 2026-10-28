"""Round 7 (28 Oct 2026): hero performance. The resting dot grid becomes a CSS layer behind the canvas."""
import sys
p = sys.argv[1] if len(sys.argv) > 1 else 'dist/home.fragment.html'
h = open(p, encoding='utf8').read()
assert 'tg-df-grid' not in h
i = h.find('data-tg="df-stage"'); e = h.find('>', i) + 1
h = h[:e] + '\n      <div class="tg-df-grid" aria-hidden="true"></div>' + h[e:]
open(p, 'w', encoding='utf8').write(h); print('grid layer added')
