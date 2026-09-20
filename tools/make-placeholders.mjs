#!/usr/bin/env node
/* ============================================================
   Generates stand-in artwork and documents so the portal can be
   demonstrated before the real collateral is copied in.

   Every asset is visibly marked PLACEHOLDER — these must never
   reach a client.

   Usage:  node tools/make-placeholders.mjs
   ============================================================ */
import { chromium } from 'playwright';
import { mkdirSync, writeFileSync, existsSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { scene, DOC_CSS, BADGE } from './_placeholder-art.mjs';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const out  = p => { const f = join(ROOT, p); mkdirSync(dirname(f), { recursive: true }); return f; };
const log  = (t, p) => console.log(`  ${t.padEnd(6)} ${p}`);

const browser = await chromium.launch({
  executablePath: existsSync('/opt/pw-browsers/chromium') ? '/opt/pw-browsers/chromium' : undefined
});

/* ---------- images ---------------------------------------------------- */
async function shot(html, { w, h, path, quality = 82 }) {
  const pg = await browser.newPage({ viewport: { width: w, height: h }, deviceScaleFactor: 1 });
  await pg.setContent(html, { waitUntil: 'load' });
  await pg.waitForTimeout(120);
  await pg.screenshot({ path: out(path), type: path.endsWith('.png') ? 'png' : 'jpeg',
                        ...(path.endsWith('.png') ? {} : { quality }) });
  await pg.close();
  log('image', path);
}

/* ---------- pdf ------------------------------------------------------- */
async function pdf(html, path) {
  const pg = await browser.newPage();
  await pg.setContent(`<style>${DOC_CSS}</style>${html}`, { waitUntil: 'load' });
  await pg.waitForTimeout(120);
  await pg.pdf({ path: out(path), format: 'A4', printBackground: true,
                 margin: { top: 0, right: 0, bottom: 0, left: 0 } });
  await pg.close();
  log('pdf', path);
}

/* ============ 1. project covers + hero stills ============ */
const COVERS = [
  { path: 'Sales Kit/Sanvi/cover.jpg', title: 'Sanvi Aero Gardens',
    sub: '1, 2 & 3 BHK · Near Bengaluru Airport', kind: 'towers',
    sky: '#7FA5A1', land: '#0A2E2C', accent: '#E0C384', mass: '#0A1614' },
  { path: 'Sales Kit/Hummingvalley/cover.jpg', title: 'Triton Humming Valley',
    sub: 'Luxury Villas · Near Nandi Hills', kind: 'villas',
    sky: '#8FAE93', land: '#0D2A21', accent: '#E0C384', mass: '#0A1712' },
  { path: 'Sales Kit/Triton Branded/cover.jpg', title: 'Triton Group',
    sub: 'Corporate · Brand Collateral', kind: 'towers',
    sky: '#A79878', land: '#241D0C', accent: '#E8D3A0', mass: '#141310' }
];
console.log('\ncovers + hero');
for (const c of COVERS) await shot(scene({ w: 1600, h: 1200, ...c }), { w: 1600, h: 1200, path: c.path });

const HERO = { title: 'Triton Group', sub: 'Sales Deck · Kit', kind: 'towers',
               sky: '#6E9490', land: '#08100E', accent: '#C6A052', mass: '#0A1513' };
await shot(scene({ w: 1920, h: 1080, ...HERO }), { w: 1920, h: 1080, path: 'Sales Kit/_Portal/hero-bg.jpg' });
await shot(scene({ w: 1920, h: 1080, ...HERO }), { w: 1920, h: 1080, path: 'Sales Kit/_Portal/hero-poster.jpg' });

/* ============ 2. sheets rendered as PNG ============ */
function sheet({ title, sub, cols, rows, highlight }) {
  return `<style>${DOC_CSS}
    body{width:1400px;height:900px;padding:54px 60px;background:#fff;display:flex;flex-direction:column}
    h1{font-size:40px;margin:10px 0 2px}
    .sub{color:#6b6f77;font-size:15px;margin-bottom:26px}
    table{font-size:15px} th{font-size:11px;padding:14px 12px} td{padding:14px 12px}
    tr.hl td{background:rgba(168,118,44,.09);font-weight:600}
    </style>
    <div class="eyebrow">Triton Group</div><h1>${title}</h1><div class="sub">${sub}</div>
    <table><thead><tr>${cols.map((c, i) => `<th${i ? ' class="n"' : ''}>${c}</th>`).join('')}</tr></thead>
    <tbody>${rows.map((r, i) => `<tr class="${i === highlight ? 'hl' : ''}">${
      r.map((c, j) => `<td${j ? ' class="n"' : ''}>${c}</td>`).join('')}</tr>`).join('')}</tbody></table>
    <div class="foot"><span>Placeholder data — not for client use</span><span>Triton Group</span></div>
    ${BADGE}`;
}

console.log('\nsheets');
await shot(sheet({
  title: 'Cost Sheet — Sanvi Aero Gardens', sub: 'All-inclusive pricing · Effective placeholder date',
  cols: ['Configuration', 'Carpet (sq ft)', 'SBA (sq ft)', 'Base Price', 'All-inclusive'],
  highlight: 2,
  rows: [['1 BHK', '452', '672', '₹ 38,60,000', '₹ 42,10,000'],
         ['2 BHK — Compact', '684', '1,015', '₹ 52,40,000', '₹ 57,20,000'],
         ['2 BHK — Premium', '742', '1,102', '₹ 56,90,000', '₹ 62,00,000'],
         ['3 BHK', '1,038', '1,540', '₹ 79,50,000', '₹ 86,70,000'],
         ['3 BHK — Corner', '1,104', '1,638', '₹ 84,20,000', '₹ 91,80,000']]
}), { w: 1400, h: 900, path: 'Sales Kit/Sanvi/Cost Sheet/Cost Sheet.png' });

for (const n of [20, 21]) {
  await shot(sheet({
    title: `Villa ${n} — Cost Breakdown`, sub: 'Triton Humming Valley · Placeholder figures',
    cols: ['Component', 'Basis', 'Amount'], highlight: 4,
    rows: [['Land cost', '2,400 sq ft', '₹ 96,00,000'],
           ['Construction', '3,150 sq ft', '₹ 1,26,00,000'],
           ['Amenities & club', 'Lump sum', '₹ 8,50,000'],
           ['Statutory & legal', 'At actuals', '₹ 6,20,000'],
           ['Total', '—', '₹ 2,36,70,000']]
  }), { w: 1400, h: 900, path: `Sales Kit/Hummingvalley/Cost Sheet/Villa ${n}.png` });
}

await shot(`<style>${DOC_CSS}
  body{width:1600px;height:1100px;background:#f3f1ec;padding:50px;position:relative}
  .plan{position:absolute;inset:50px;border:2px solid #b9b0a0;border-radius:6px;background:#fbfaf7}
  .rd{position:absolute;background:#e3ded3}
  .plt{position:absolute;border:1.5px solid #a89e8c;background:#fff;
       font:600 12px/1 Inter,sans-serif;color:#8a8072;display:grid;place-items:center}
  .lbl{position:absolute;font:600 13px/1 Inter,sans-serif;letter-spacing:.24em;
       text-transform:uppercase;color:#8a8072}
  .grn{position:absolute;background:#dfe7d5;border-radius:50%}
  </style>
  <div class="plan">
    <div class="grn" style="left:6%;top:8%;width:22%;height:26%"></div>
    <div class="grn" style="right:7%;bottom:9%;width:26%;height:30%"></div>
    <div class="rd" style="left:0;top:46%;width:100%;height:5%"></div>
    <div class="rd" style="left:47%;top:0;width:5%;height:100%"></div>
    ${Array.from({ length: 34 }, (_, i) => {
      const col = i % 6, row = (i / 6) | 0;
      const x = 8 + col * 14.4 + (col > 2 ? 6 : 0), y = 8 + row * 15.5 + (row > 2 ? 7 : 0);
      return `<div class="plt" style="left:${x}%;top:${y}%;width:11%;height:11%">${101 + i}</div>`;
    }).join('')}
    <div class="lbl" style="left:6%;bottom:3%">Triton Humming Valley — Master Plan</div>
    <div class="lbl" style="right:6%;bottom:3%">Indicative only</div>
  </div>${BADGE}`,
  { w: 1600, h: 1100, path: 'Sales Kit/Hummingvalley/Master Plan/Master Plan.png' });


/* ============ 3. brochures & forms as real PDFs ============ */
const LOREM = 'This document is a stand-in generated for the offline sales portal. It exists so the ' +
  'viewer, page navigation and file handoff can be demonstrated end to end before the real ' +
  'collateral is copied in. Replace it with the approved file of the same name.';

function coverPage(eyebrow, title, sub, facts) {
  return `<div class="pg"><div class="stamp">PLACEHOLDER</div>
    <div class="hero"><div class="grain"></div><span>${sub}</span></div>
    <div class="eyebrow">${eyebrow}</div><h1>${title}</h1><div class="rule"></div>
    <p>${LOREM}</p>
    <h3>At a glance</h3><div class="kv">${
      facts.map(([k, v]) => `<div><span>${k}</span><b>${v}</b></div>`).join('')}</div>
    <div class="note"><b>Not for client use.</b> Every figure on these pages is invented.</div>
    <div class="foot"><span>Triton Group</span><span>Placeholder · page 1</span></div></div>`;
}
function tablePage(title, intro, cols, rows, n) {
  return `<div class="pg"><div class="stamp">PLACEHOLDER</div>
    <h2>${title}</h2><p>${intro}</p><div class="rule"></div>
    <table><thead><tr>${cols.map((c, i) => `<th${i ? ' class="n"' : ''}>${c}</th>`).join('')}</tr></thead>
    <tbody>${rows.map(r => `<tr>${r.map((c, j) => `<td${j ? ' class="n"' : ''}>${c}</td>`).join('')}</tr>`).join('')}</tbody></table>
    <div class="foot"><span>Triton Group</span><span>Placeholder · page ${n}</span></div></div>`;
}
function prosePage(title, paras, n) {
  return `<div class="pg"><div class="stamp">PLACEHOLDER</div>
    <h2>${title}</h2><div class="rule"></div>
    ${paras.map(t => `<p>${t}</p>`).join('')}
    <div class="foot"><span>Triton Group</span><span>Placeholder · page ${n}</span></div></div>`;
}

console.log('\ndocuments');
const SPECS = [['Configurations', '1, 2 & 3 BHK'], ['Total units', '486'], ['Towers', '4 · G+14'],
               ['Land parcel', '4.2 acres'], ['Possession', 'Placeholder date'], ['RERA', 'PRM/XX/000000']];

await pdf(
  coverPage('Sanvi Aero Gardens', 'Sanvi Brochure', 'Sanvi Aero Gardens — placeholder cover', SPECS) +
  tablePage('Unit plan and pricing', 'Indicative only. Replace with the approved cost sheet.',
    ['Configuration', 'Carpet', 'SBA', 'All-inclusive'],
    [['1 BHK', '452', '672', '₹ 42,10,000'], ['2 BHK Compact', '684', '1,015', '₹ 57,20,000'],
     ['2 BHK Premium', '742', '1,102', '₹ 62,00,000'], ['3 BHK', '1,038', '1,540', '₹ 86,70,000'],
     ['3 BHK Corner', '1,104', '1,638', '₹ 91,80,000']], 2) +
  prosePage('Location and connectivity', [
    'Placeholder copy describing distance to the airport, the ORR and the nearest metro line.',
    'A second paragraph would normally carry schools, hospitals and retail within a short drive.',
    'The final paragraph would set out the investment case and expected rental yield.'], 3) +
  prosePage('Amenities', [
    'Clubhouse, pool, gym and landscaped decks would be described here with real photography.',
    'Replace this file with the approved brochure before showing it to anyone.'], 4),
  'Sales Kit/Sanvi/Brochure/Brochure.pdf');

await pdf(
  coverPage('Triton Humming Valley', 'Humming Valley Brochure', 'Luxury villas near Nandi Hills',
    [['Typology', 'Independent villas'], ['Plot sizes', '2,400 – 4,800 sq ft'], ['Total villas', '96'],
     ['Land parcel', '18 acres'], ['Possession', 'Placeholder date'], ['RERA', 'PRM/XX/000000']]) +
  tablePage('Villa inventory', 'Indicative availability. Replace with the live sheet.',
    ['Villa', 'Plot (sq ft)', 'Built-up', 'Status'],
    [['Villa 18', '2,400', '3,150', 'Available'], ['Villa 20', '2,400', '3,150', 'Available'],
     ['Villa 21', '2,800', '3,480', 'Blocked'], ['Villa 24', '3,200', '3,900', 'Available'],
     ['Villa 27', '4,800', '4,650', 'Sold']], 2) +
  prosePage('The valley', [
    'Placeholder copy about the setting, elevation and the drive from the city.',
    'Replace this file with the approved brochure before use.'], 3),
  'Sales Kit/Hummingvalley/Brochure/Brochure.pdf');

await pdf(
  coverPage('Triton Group', 'Main Brochure', 'Corporate — placeholder cover',
    [['Founded', 'Placeholder'], ['Projects delivered', 'Placeholder'], ['Under development', 'Placeholder'],
     ['Cities', 'Bengaluru'], ['Team', 'Placeholder'], ['Certifications', 'Placeholder']]) +
  prosePage('About Triton Group', [
    'Company overview copy would sit here, followed by the leadership note.',
    'Replace with the approved corporate brochure.'], 2),
  'Sales Kit/Triton Branded/General/Main Brochure.pdf');

await pdf(
  `<div class="pg"><div class="stamp">PLACEHOLDER</div>
   <div class="eyebrow">Triton Group</div><h1>Sales Team<br>Feedback Form</h1><div class="rule"></div>
   <p>Stand-in for the real form. Replace before printing or circulating.</p>
   ${['Executive name', 'Date', 'Project shown', 'Client name', 'Contact number', 'Source of lead',
      'Units discussed', 'Budget indicated', 'Objections raised', 'Next action', 'Follow-up date']
     .map(l => `<div style="margin-top:15px"><div style="font:600 8.5pt/1 Inter,sans-serif;
       letter-spacing:.16em;text-transform:uppercase;color:#6b6f77">${l}</div>
       <div style="height:26px;border-bottom:1px solid rgba(0,0,0,.28)"></div></div>`).join('')}
   <div class="note">Placeholder — not the approved form.</div>
   <div class="foot"><span>Triton Group</span><span>Placeholder · page 1</span></div></div>`,
  'Sales Kit/Triton Branded/General/Feedback Form.pdf');

/* ============ 4. the Location Advantage HTML page ============ */
const LOC = [['Kempegowda International Airport', '8 km', '15 min'],
             ['Outer Ring Road junction', '14 km', '25 min'],
             ['Manyata Tech Park', '19 km', '35 min'],
             ['Hebbal Metro (proposed)', '11 km', '18 min'],
             ['International school', '3 km', '7 min'],
             ['Multi-speciality hospital', '5 km', '11 min']];
writeFileSync(out('Sales Kit/Sanvi/Location Advantage/Location Advantage.html'),
`<!doctype html><html lang="en"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Location Advantage — Placeholder</title><style>${DOC_CSS}
body{padding:56px 60px;max-width:900px;margin:0 auto;background:#fff}
.badge{display:inline-block;background:rgba(190,60,40,.92);color:#fff;padding:7px 12px;
  border-radius:99px;font:700 10px/1 Inter,sans-serif;letter-spacing:.18em;margin-bottom:18px}
</style></head><body>
<div class="badge">PLACEHOLDER — REPLACE BEFORE USE</div>
<div class="eyebrow">Sanvi Aero Gardens</div><h1>Location Advantage</h1>
<div class="rule"></div>
<p>Stand-in page so the portal can render an HTML collateral inline. Distances below are invented.</p>
<h3>Distances</h3>
<table><thead><tr><th>Destination</th><th class="n">Distance</th><th class="n">Drive time</th></tr></thead>
<tbody>${LOC.map(r => `<tr><td>${r[0]}</td><td class="n">${r[1]}</td><td class="n">${r[2]}</td></tr>`).join('')}</tbody></table>
<div class="note">Replace with the approved location page.</div>
</body></html>`);
log('html', 'Sales Kit/Sanvi/Location Advantage/Location Advantage.html');

await browser.close();

/* ============ 5. office files and videos ============ */
console.log('\noffice files');
execFileSync('python3', [join(ROOT, 'tools/_placeholder-office.py')], { stdio: 'inherit' });

console.log('\nvideos');
execFileSync('bash', [join(ROOT, 'tools/_placeholder-video.sh')], { stdio: 'inherit' });

console.log('\nDone. Every generated file is marked PLACEHOLDER.');
console.log('Replace them with the real collateral, then press Update in the portal.\n');

