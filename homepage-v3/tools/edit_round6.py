"""Round 6 (26 Oct 2026): mobile alignment fixes. Adds semantic hook classes used by the mobile CSS."""
import re, sys
p = sys.argv[1] if len(sys.argv) > 1 else 'dist/home.fragment.html'
h = open(p, encoding='utf8').read()
def add_class(h, opener_regex, cls):
    m = re.search(opener_regex, h); assert m, opener_regex
    tag = m.group(0)
    new = re.sub(r'class="([^"]*)"', lambda c: 'class="%s %s"' % (c.group(1), cls), tag, count=1)
    return h[:m.start()] + new + h[m.end():]
# "Why buyers choose" block and its footer row
i = h.find('Why buyers choose Triton'); s = h.rfind('<div', 0, h.rfind('<span', 0, i)); e = h.find('>', s)
tag = h[s:e]; h = h[:s] + tag.replace('class="', 'class="tg-why ', 1) + h[e:]
j = h.find('<span', h.find('class="s13"', s)); k = h.rfind('<div', 0, h.find('<span class="s5o"', s)); e2 = h.find('>', k)
t2 = h[k:e2]; h = h[:k] + t2.replace('class="', 'class="tg-why-foot ', 1) + h[e2:]
# stacked call-to-action groups
for c in ('s1a', 's26', 's6a'):
    h = h.replace('class="%s"' % c, 'class="tg-cta-col %s"' % c)
h = re.sub(r'\sdata-dc-[a-z]+="[^"]*"', '', h)
open(p, 'w', encoding='utf8').write(h)
print('tg-why', h.count('tg-why '), 'foot', h.count('tg-why-foot'), 'cta-col', h.count('tg-cta-col'), 'dc attrs left', h.count('data-dc'))
