"""Round 2 edits from the review comments (26 Oct 2026). Operates on dist/home.fragment.html."""
import re, sys
p = sys.argv[1] if len(sys.argv) > 1 else 'dist/home.fragment.html'
h = open(p, encoding='utf8').read()
secs = list(re.finditer(r'<section\b.*?</section>', h, re.S))
assert len(secs) == 12, len(secs)
blocks = [m.group(0) for m in secs]
names = ['hero', 'stats', 'projects', 'gallery', 'done', 'story', 'design', 'events', 'why', 'testimonials', 'blogs', 'faq']
S = dict(zip(names, blocks))

# 1. gallery: remove circled photos
drop = ['Rooftop pool at golden hour', 'Block A tower', 'Sitting area', 'Reading pavilion', 'Garden lounge',
        'Multipurpose hall', 'Indoor games room', 'Children’s &amp; senior citizen park', 'Arrival tower', 'Entrance plaza']
g = S['gallery']; removed = 0
for t in drop:
    key = 'data-title="%s"' % t
    j = g.find(key); assert j > 0, t
    k = g.rfind('<button', 0, j); e = g.find('</button>', j) + len('</button>')
    g = g[:k] + g[e:]; removed += 1
# keep the grid free of holes: 24 cells in a 4 column grid (roof terrace becomes a single cell)
j = g.find('data-title="Private roof terrace"'); k = g.rfind('<button', 0, j); e = g.find('>', k)
tag = g[k:e]; assert ' s23' in tag or 's23"' in tag, tag[-80:]
g = g[:k] + tag.replace('s23', 's25') + g[e:]
S['gallery'] = g

# 2. stats: remove the arrow line under each card
st = S['stats']
st, n = re.subn(r'\s*<span class="sn">\s*<span class="so">↗</span>.*?</span>\s*</span>', '', st, flags=re.S)
assert n == 3, n
S['stats'] = st

# 3. remove "Promises you can verify"
del S['why']

# 4. new order
order = ['hero', 'stats', 'story', 'events', 'projects', 'gallery', 'done', 'design', 'testimonials', 'blogs', 'faq']
start, end = secs[0].start(), secs[-1].end()
gaps = '\n\n  '
h2 = h[:start] + gaps.join(S[k] for k in order) + h[end:]
open(p, 'w', encoding='utf8').write(h2)
print('removed photos', removed, '| sections', len(order), '| bytes', len(h), '->', len(h2))
