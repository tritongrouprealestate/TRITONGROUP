/* Shared HTML templates for placeholder artwork.
   Everything carries a visible PLACEHOLDER marker on purpose — nobody should
   ever show one of these to a client by accident. */

export const BADGE = `
<div class="ph-badge">PLACEHOLDER — replace before use</div>
<style>
.ph-badge{position:fixed;top:22px;right:22px;z-index:99;
  font:700 12px/1 Inter,system-ui,sans-serif;letter-spacing:.18em;text-transform:uppercase;
  color:#fff;background:rgba(190,60,40,.92);padding:9px 14px;border-radius:999px;
  box-shadow:0 6px 20px rgba(0,0,0,.3)}
</style>`;

const BASE = `
*{box-sizing:border-box;margin:0;padding:0}
body{font-family:Inter,"DejaVu Sans",system-ui,sans-serif;-webkit-font-smoothing:antialiased}
.grain{position:absolute;inset:0;opacity:.16;mix-blend-mode:overlay;
  background-image:url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='.8' numOctaves='4'/></filter><rect width='160' height='160' filter='url(%23n)'/></svg>")}
`;

/* ---- an abstract "architecture photo" stand-in ---------------------- */
export function scene({ w, h, sky, land, accent, mass, title, sub, kind }) {
  const towers = kind === 'villas'
    ? `<rect x="12%" y="58%" width="17%" height="20%" rx="1.4%" fill="${mass}" opacity=".92"/>
       <rect x="34%" y="54%" width="20%" height="24%" rx="1.4%" fill="${mass}" opacity=".82"/>
       <rect x="59%" y="60%" width="16%" height="18%" rx="1.4%" fill="${mass}" opacity=".88"/>
       <path d="M12 58 L20.5 50 L29 58 Z" transform="scale(${w/100},${h/100})" fill="${accent}" opacity=".55"/>
       <path d="M34 54 L44 45 L54 54 Z" transform="scale(${w/100},${h/100})" fill="${accent}" opacity=".45"/>
       <path d="M59 60 L67 53 L75 60 Z" transform="scale(${w/100},${h/100})" fill="${accent}" opacity=".5"/>`
    : `<rect x="8%"  y="30%" width="13%" height="48%" rx=".8%" fill="${mass}" opacity=".9"/>
       <rect x="24%" y="18%" width="15%" height="60%" rx=".8%" fill="${mass}" opacity=".97"/>
       <rect x="42%" y="26%" width="12%" height="52%" rx=".8%" fill="${mass}" opacity=".85"/>
       <rect x="57%" y="12%" width="16%" height="66%" rx=".8%" fill="${mass}" opacity=".93"/>
       <rect x="76%" y="34%" width="13%" height="44%" rx=".8%" fill="${mass}" opacity=".8"/>`;

  /* window grid — what makes it read as a building rather than a bar chart */
  let win = '';
  for (let c = 0; c < 42; c++) for (let r = 0; r < 26; r++) {
    if (Math.random() > .34) continue;
    win += `<rect x="${(c * 2.4 + 8).toFixed(1)}%" y="${(r * 2.6 + 14).toFixed(1)}%"
             width=".7%" height="1.1%" fill="${accent}" opacity="${(.12 + Math.random() * .4).toFixed(2)}"/>`;
  }

  return `<style>${BASE}
  body{width:${w}px;height:${h}px;overflow:hidden;position:relative;background:${sky}}
  .sky{position:absolute;inset:0;background:
      radial-gradient(90% 70% at 22% 8%, ${accent}44, transparent 62%),
      radial-gradient(80% 60% at 85% 22%, #ffffff33, transparent 60%),
      linear-gradient(178deg, ${sky} 0%, ${sky} 42%, ${land} 100%)}
  .haze{position:absolute;left:0;right:0;bottom:0;height:46%;
      background:linear-gradient(to top, ${land}ee, ${land}55 55%, transparent)}
  .wm{position:absolute;inset:-30%;transform:rotate(-24deg);
      display:flex;flex-direction:column;justify-content:space-around;pointer-events:none;opacity:.13}
  .wm div{white-space:nowrap;color:#fff;font:800 ${Math.round(w * .036)}px/1 Inter,sans-serif;
      letter-spacing:.3em;text-align:center}
  </style>
  <div class="sky"></div>
  <svg width="${w}" height="${h}" style="position:absolute;inset:0">${towers}${win}</svg>
  <div class="haze"></div>
  <div class="grain"></div>
  <div class="wm">${Array.from({ length: 7 }, () =>
      '<div>' + ('PLACEHOLDER · ').repeat(6) + '</div>').join('')}</div>
  ${BADGE}`;
}

/* ---- document chrome shared by the PDF templates -------------------- */
export const DOC_CSS = `${BASE}
@page{size:A4;margin:0}
body{color:#14161a;font-size:11pt;line-height:1.6}
.pg{width:210mm;height:297mm;padding:22mm 20mm;position:relative;page-break-after:always;
   display:flex;flex-direction:column}
.pg:last-child{page-break-after:auto}
.rule{height:1px;background:rgba(0,0,0,.12);margin:14px 0 22px}
.eyebrow{font:600 9pt/1 Inter,sans-serif;letter-spacing:.34em;text-transform:uppercase;color:#12514D}
h1{font-family:Georgia,serif;font-weight:400;font-size:34pt;line-height:1.02;margin:14px 0 0}
h2{font-family:Georgia,serif;font-weight:400;font-size:20pt;margin:0 0 6px}
h3{font:600 10pt/1 Inter,sans-serif;letter-spacing:.18em;text-transform:uppercase;color:#12514D;margin:22px 0 10px}
p{margin:0 0 11px;color:#3a3d44}
table{width:100%;border-collapse:collapse;font-size:9.5pt;margin-top:6px}
th{text-align:left;font:600 8pt/1 Inter,sans-serif;letter-spacing:.14em;text-transform:uppercase;
   color:#6b6f77;padding:9px 8px;border-bottom:1.5px solid rgba(0,0,0,.18)}
td{padding:9px 8px;border-bottom:1px solid rgba(0,0,0,.07)}
td.n{text-align:right;font-variant-numeric:tabular-nums}
.foot{margin-top:auto;padding-top:14px;border-top:1px solid rgba(0,0,0,.1);
   font:500 7.5pt/1.5 Inter,sans-serif;letter-spacing:.1em;text-transform:uppercase;color:#9aa0a8;
   display:flex;justify-content:space-between}
.stamp{position:absolute;top:12mm;right:20mm;font:700 8pt/1 Inter,sans-serif;letter-spacing:.16em;
   color:#fff;background:rgba(190,60,40,.92);padding:7px 11px;border-radius:99px}
.hero{height:78mm;border-radius:5mm;margin-bottom:9mm;position:relative;overflow:hidden;
   background:linear-gradient(160deg,#12514D,#0A1614 60%,#3A2E12)}
.hero .grain{opacity:.2}
.hero span{position:absolute;left:9mm;bottom:8mm;color:#fff;font:600 13pt/1 Inter,sans-serif;
   letter-spacing:.02em}
.kv{display:grid;grid-template-columns:1fr 1fr;gap:7px 22px;margin-top:8px}
.kv div{display:flex;justify-content:space-between;border-bottom:1px dotted rgba(0,0,0,.18);
   padding:7px 0;font-size:9.5pt}
.kv b{font-weight:600}
.note{margin-top:14px;padding:11px 13px;border-radius:7px;background:rgba(190,60,40,.07);
   border:1px solid rgba(190,60,40,.25);font-size:9pt;color:#8c3222}
`;
