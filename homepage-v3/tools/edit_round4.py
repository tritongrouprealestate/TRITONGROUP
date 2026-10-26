"""Round 4 (26 Oct 2026): remove the whole 'Real estate, done right' section (pillars, founders quote, three category buttons)."""
import re, sys
p = sys.argv[1] if len(sys.argv) > 1 else 'dist/home.fragment.html'
h = open(p, encoding='utf8').read()
secs = list(re.finditer(r'<section\b.*?</section>', h, re.S))
hit = [m for m in secs if 'done right' in m.group(0)]
assert len(hit) == 1, len(hit)
seg = hit[0].group(0)
print('section contains:', [t for t in ('Research first', 'The right location', 'Residential projects', 'Villa projects', 'Commercial projects', 'Our story') if t in seg])
h = h[:hit[0].start()] + h[hit[0].end():]
h = re.sub(r'\n\s*\n\s*\n+', '\n\n  ', h)
open(p, 'w', encoding='utf8').write(h)
print('sections now', len(list(re.finditer(r'<section\b', h))), '| other "Residential projects" links left:', h.count('Residential projects'))
