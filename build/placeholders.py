"""Substitute artwork for the preview build.

Artifact hosting blocks external images, so the Unsplash photography cannot
load there. Rather than ship broken frames or flat grey boxes, these draw
atmospheric stand-ins in the site's own palette — they read as intentional
at a glance, which is what the preview needs, while being unmistakably not
photographs on a second look.
"""
import base64, json

NIGHT, FROND, FROND2 = '#0E1621', '#2F4A3C', '#22382D'
DAWN, CLOUD, TEAK    = '#C9962E', '#EEF1F4', '#7A5A12'

def uri(svg):
    return 'data:image/svg+xml;base64,' + base64.b64encode(svg.encode()).decode()

def interior(w, h, seed):
    """A room: floor line, columns, and the bright vertical of the waterfall."""
    wf = 0.30 + (seed % 5) * 0.10          # where the water falls
    fl = 0.60 + (seed % 3) * 0.06          # floor line
    cols = ''.join(
        f'<rect x="{w*x:.0f}" y="0" width="{max(1,w*0.006):.0f}" height="{h*fl:.0f}" fill="{CLOUD}" opacity=".07"/>'
        for x in (0.12, 0.24, 0.70, 0.86))
    return f'''<svg xmlns="http://www.w3.org/2000/svg" width="{w}" height="{h}" viewBox="0 0 {w} {h}">
<defs>
<linearGradient id="g" x1="0" y1="0" x2="0" y2="1">
<stop offset="0" stop-color="{FROND}"/><stop offset="1" stop-color="{FROND2}"/></linearGradient>
<linearGradient id="w" x1="0" y1="0" x2="0" y2="1">
<stop offset="0" stop-color="{CLOUD}" stop-opacity=".55"/>
<stop offset="1" stop-color="{CLOUD}" stop-opacity=".10"/></linearGradient>
<radialGradient id="lamp" cx="{wf}" cy="{fl-0.18}" r="0.55">
<stop offset="0" stop-color="{DAWN}" stop-opacity=".38"/>
<stop offset="1" stop-color="{DAWN}" stop-opacity="0"/></radialGradient>
</defs>
<rect width="{w}" height="{h}" fill="url(#g)"/>
{cols}
<rect x="{w*wf:.0f}" y="0" width="{w*0.055:.0f}" height="{h*fl:.0f}" fill="url(#w)"/>
<ellipse cx="{w*(wf+0.027):.0f}" cy="{h*fl:.0f}" rx="{w*0.13:.0f}" ry="{h*0.035:.0f}"
  fill="{CLOUD}" opacity=".16"/>
<rect y="{h*fl:.0f}" width="{w}" height="{h*(1-fl):.0f}" fill="{NIGHT}" opacity=".34"/>
<rect width="{w}" height="{h}" fill="url(#lamp)"/>
</svg>'''

def exterior(w, h, seed):
    """Villa massing against the ridge, windows lit."""
    base = 0.66 + (seed % 3) * 0.04
    blocks = [(0.10, 0.34, 0.30), (0.40, 0.26, 0.42), (0.68, 0.24, 0.24)]
    out = ''
    for i, (x, bw, bh) in enumerate(blocks):
        x = (x + seed * 0.03) % 0.72
        y = base - bh
        out += f'<rect x="{w*x:.0f}" y="{h*y:.0f}" width="{w*bw:.0f}" height="{h*bh:.0f}" fill="{NIGHT}" opacity=".82"/>'
        for k in range(3):
            wx = x + 0.04 + k * 0.07
            if wx < x + bw - 0.05:
                out += (f'<rect x="{w*wx:.0f}" y="{h*(y+0.10+0.02*i):.0f}" '
                        f'width="{w*0.035:.0f}" height="{h*0.09:.0f}" fill="{DAWN}" opacity=".72"/>')
    return f'''<svg xmlns="http://www.w3.org/2000/svg" width="{w}" height="{h}" viewBox="0 0 {w} {h}">
<defs><linearGradient id="s" x1="0" y1="0" x2="0" y2="1">
<stop offset="0" stop-color="#101B26"/><stop offset=".62" stop-color="#2C3E4E"/>
<stop offset="1" stop-color="{TEAK}"/></linearGradient></defs>
<rect width="{w}" height="{h}" fill="url(#s)"/>
<path d="M0,{h*0.58:.0f} C{w*0.2:.0f},{h*0.50:.0f} {w*0.36:.0f},{h*0.62:.0f} {w*0.55:.0f},{h*0.55:.0f}
 C{w*0.74:.0f},{h*0.48:.0f} {w*0.9:.0f},{h*0.60:.0f} {w},{h*0.54:.0f} L{w},{h} L0,{h} Z"
 fill="#1B2A38" opacity=".9"/>
{out}
<rect y="{h*base:.0f}" width="{w}" height="{h*(1-base):.0f}" fill="#16241C"/>
</svg>'''

def landscape(w, h, seed):
    """The cloud sea below the ridge at first light."""
    return f'''<svg xmlns="http://www.w3.org/2000/svg" width="{w}" height="{h}" viewBox="0 0 {w} {h}">
<defs>
<linearGradient id="sk" x1="0" y1="0" x2="0" y2="1">
<stop offset="0" stop-color="#0B121B"/><stop offset=".45" stop-color="#2C3E4E"/>
<stop offset=".72" stop-color="#8A93A0"/><stop offset="1" stop-color="#D8DFE6"/></linearGradient>
<radialGradient id="sun" cx=".5" cy=".78" r=".42">
<stop offset="0" stop-color="{DAWN}" stop-opacity=".62"/>
<stop offset="1" stop-color="{DAWN}" stop-opacity="0"/></radialGradient>
<filter id="b"><feGaussianBlur stdDeviation="{h*0.03:.0f}"/></filter>
</defs>
<rect width="{w}" height="{h}" fill="url(#sk)"/>
<rect width="{w}" height="{h}" fill="url(#sun)"/>
<path d="M0,{h*0.46:.0f} C{w*0.18:.0f},{h*0.36:.0f} {w*0.32:.0f},{h*0.50:.0f} {w*0.5:.0f},{h*0.42:.0f}
 C{w*0.68:.0f},{h*0.34:.0f} {w*0.84:.0f},{h*0.48:.0f} {w},{h*0.40:.0f} L{w},{h} L0,{h} Z"
 fill="#2E4257" opacity=".85"/>
<g filter="url(#b)" fill="{CLOUD}" opacity=".5">
<ellipse cx="{w*0.2:.0f}" cy="{h*0.70:.0f}" rx="{w*0.32:.0f}" ry="{h*0.07:.0f}"/>
<ellipse cx="{w*0.62:.0f}" cy="{h*0.66:.0f}" rx="{w*0.34:.0f}" ry="{h*0.06:.0f}"/>
<ellipse cx="{w*0.95:.0f}" cy="{h*0.72:.0f}" rx="{w*0.28:.0f}" ry="{h*0.07:.0f}"/>
</g>
<path d="M0,{h*0.62:.0f} C{w*0.22:.0f},{h*0.56:.0f} {w*0.4:.0f},{h*0.66:.0f} {w*0.6:.0f},{h*0.60:.0f}
 C{w*0.8:.0f},{h*0.54:.0f} {w*0.92:.0f},{h*0.64:.0f} {w},{h*0.60:.0f} L{w},{h} L0,{h} Z"
 fill="#15242F"/>
</svg>'''

art = {
  'hero':  uri(landscape(1600, 900, 0)),
  'band':  uri(landscape(1600, 700, 2)),
  'villa3': uri(interior(1200, 750, 1)),
  'villa4': uri(exterior(1200, 750, 2)),
  'villa5': uri(interior(1200, 750, 3)),
  'ch0': uri(exterior(1400, 900, 1)),
  'ch1': uri(interior(1400, 900, 2)),
  'ch2': uri(interior(1400, 900, 4)),
  'ch3': uri(interior(2000, 1200, 0)),
  'g0': uri(interior(1100, 825, 2)),
  'g1': uri(interior(1100, 825, 3)),
  'g2': uri(exterior(1100, 825, 0)),
  'g3': uri(interior(1100, 825, 1)),
  'g4': uri(exterior(1100, 825, 3)),
  'g5': uri(landscape(1100, 825, 1)),
}
open('build/art.json','w').write(json.dumps(art))
print('generated %d images, %.0f KB total' % (len(art), sum(len(v) for v in art.values())/1024))
