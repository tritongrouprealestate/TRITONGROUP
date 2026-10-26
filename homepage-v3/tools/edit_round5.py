"""Round 5 (26 Oct 2026): mobile testimonials as a mixed layout. Three quote cards sit in one swipeable row."""
import re, sys
p = sys.argv[1] if len(sys.argv) > 1 else 'dist/home.fragment.html'
h = open(p, encoding='utf8').read()
i = h.find('data-tg="bento"'); s = h.find('>', i) + 1
# bento children are six sibling <article> blocks (no nested articles)
arts = {}
pos = s
for n in range(1, 7):
    a = h.find('<article', pos); e = h.find('</article>', a) + len('</article>')
    blk = h[a:e]; assert 'tg-bn%d ' % n in blk[:120], n
    arts[n] = blk; pos = e
region_end = pos
new = '\n        '.join([arts[1], '<div class="tg-tq-row">' + arts[2] + arts[4] + arts[5] + '</div>', arts[3], arts[6]])
h = h[:s] + '\n        ' + new + h[region_end:]
open(p, 'w', encoding='utf8').write(h)
print('bento reordered; row wrapper count:', h.count('tg-tq-row'))
