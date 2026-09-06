/* Triton Humming Valley — application script.
   Order matters: DATA first, then the modules that read it. */

/* ═══════════════════════════════════════════════════════════════════════════
   DATA — the single place to edit project facts.
   ═══════════════════════════════════════════════════════════════════════ */
const DATA = {

  /* ⚠ NEEDS VERIFY — sourced from a third-party listing (99acres), not from
     Triton's own site, which this build environment could not reach. Confirm
     against your RERA certificate before publishing. Leave as null to make
     the footer say the number is not yet configured. */
  rera: 'PRM/KA/RERA/1254/460/PR/131224/007292',

  /* ⚠ NEEDS VERIFY — listings show Dec 2025, which has passed. Set the real
     date, or leave null and the possession row is omitted entirely. */
  possession: null,

  contact: { phone: '+91 80 0000 0000', email: 'sales@tritongroup.in' },

  villas: [
    { id:'3bhk', name:'3 BHK', area:'2,400', price:'₹2.5 Cr',
      beds:3, baths:3, verified:true,
      photo:'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=75',
      blurb:'The compact plan. Living, dining and kitchen wrap a single-height court with the waterfall at its head; three bedrooms above, all facing the valley.',
      features:['Private garden','15 ft indoor waterfall','Jacuzzi','Covered parking for two'] },
    { id:'4bhk', name:'4 BHK', area:'3,100', price:'₹3.6 Cr',
      beds:4, baths:4, verified:false,   /* ⚠ area interpolated — verify */
      photo:'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=75',
      blurb:'A second court opens the plan east, so the morning sun reaches the dining room before it clears the ridge. Family room on the upper floor.',
      features:['Private garden','15 ft indoor waterfall','Jacuzzi','Family lounge','Covered parking for three'] },
    { id:'5bhk', name:'5 BHK', area:'3,800', price:'₹4 Cr',
      beds:5, baths:5, verified:true,
      photo:'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1200&q=75',
      blurb:'The full plan. A guest suite sits apart across the court, the primary bedroom takes the whole west end, and the terrace runs the length of the ridge face.',
      features:['Private garden','15 ft indoor waterfall','Jacuzzi','Guest suite','Ridge terrace','Covered parking for three'] }
  ],

  /* Plot inventory. status: available | held | sold */
  plots: [
    {n:'A1',x:96, y:120,t:'5 BHK',s:'sold',     a:'West, ridge face'},
    {n:'A2',x:158,y:104,t:'5 BHK',s:'sold',     a:'West, ridge face'},
    {n:'A3',x:220,y:118,t:'4 BHK',s:'available',a:'West, ridge face'},
    {n:'A4',x:282,y:100,t:'4 BHK',s:'held',     a:'North-west'},
    {n:'A5',x:344,y:114,t:'4 BHK',s:'available',a:'North-west'},
    {n:'A6',x:406,y:96, y2:0,t:'5 BHK',s:'available',a:'North, valley view'},
    {n:'B1',x:96, y:186,t:'3 BHK',s:'sold',     a:'West'},
    {n:'B2',x:158,y:172,t:'3 BHK',s:'sold',     a:'West'},
    {n:'B3',x:220,y:184,t:'3 BHK',s:'held',     a:'Central'},
    {n:'B4',x:406,y:162,t:'4 BHK',s:'available',a:'North'},
    {n:'B5',x:468,y:148,t:'5 BHK',s:'available',a:'North, valley view'},
    {n:'B6',x:530,y:160,t:'5 BHK',s:'available',a:'North-east'},
    {n:'C1',x:96, y:258,t:'3 BHK',s:'sold',     a:'South-west'},
    {n:'C2',x:158,y:244,t:'3 BHK',s:'sold',     a:'South-west'},
    {n:'C3',x:220,y:256,t:'3 BHK',s:'available',a:'Central'},
    {n:'C4',x:282,y:270,t:'4 BHK',s:'available',a:'Central'},
    {n:'C5',x:406,y:236,t:'4 BHK',s:'held',     a:'East'},
    {n:'C6',x:468,y:222,t:'5 BHK',s:'available',a:'East, valley view'},
    {n:'C7',x:530,y:234,t:'5 BHK',s:'available',a:'East'},
    {n:'D1',x:96, y:330,t:'3 BHK',s:'available',a:'South-west'},
    {n:'D2',x:158,y:316,t:'3 BHK',s:'available',a:'South'},
    {n:'D3',x:220,y:328,t:'4 BHK',s:'sold',     a:'South'},
    {n:'D4',x:282,y:342,t:'4 BHK',s:'available',a:'South'},
    {n:'D5',x:406,y:308,t:'4 BHK',s:'available',a:'South-east'},
    {n:'D6',x:468,y:294,t:'5 BHK',s:'held',     a:'East'},
    {n:'D7',x:530,y:306,t:'5 BHK',s:'available',a:'East'},
    {n:'E1',x:96, y:402,t:'3 BHK',s:'available',a:'South-west'},
    {n:'E2',x:158,y:388,t:'3 BHK',s:'available',a:'South'},
    {n:'E3',x:220,y:400,t:'3 BHK',s:'available',a:'South'},
    {n:'E4',x:406,y:380,t:'4 BHK',s:'sold',     a:'South-east'},
    {n:'E5',x:468,y:366,t:'5 BHK',s:'available',a:'South-east'},
    {n:'E6',x:530,y:378,t:'5 BHK',s:'available',a:'East'}
  ],

  /* Replace every src with project photography. The frame keeps its shape
     and caption whether or not the image loads. */
  gallery: [
    {src:'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1100&q=75',
     cap:'The living volume, wrapped around the water court'},
    {src:'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1100&q=75',
     cap:'Double-height core, teak and stone'},
    {src:'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1100&q=75',
     cap:'Villa approach from the internal road'},
    {src:'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1100&q=75',
     cap:'Primary bedroom, west end'},
    {src:'https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?auto=format&fit=crop&w=1100&q=75',
     cap:'Jacuzzi terrace at the valley edge'},
    {src:'https://images.unsplash.com/photo-1416331108676-a22ccb276e35?auto=format&fit=crop&w=1100&q=75',
     cap:'Eucalyptus on the lower slope'}
  ]
};

(() => {
'use strict';
const $  = (s, r=document) => r.querySelector(s);
const $$ = (s, r=document) => Array.from(r.querySelectorAll(s));
document.body.classList.remove('no-js');
$('#year').textContent = new Date().getFullYear();

const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
const hasGSAP = typeof window.gsap !== 'undefined';
if (hasGSAP && window.ScrollTrigger) gsap.registerPlugin(ScrollTrigger);

/* ── Images: fade in only once decoded, so a 404 leaves the drawn design
      intact rather than showing a broken-image glyph. ─────────────────── */
function loadImage(el, src, done){
  const probe = new Image();
  probe.decoding = 'async';
  probe.onload = () => { el.src = src; el.classList.add('is-loaded'); done && done(true); };
  probe.onerror = () => { el.dataset.failed = 'true'; done && done(false); };
  probe.src = src;
}
const heroImg = $('.hero-photo');
if (heroImg && heroImg.dataset.src) loadImage(heroImg, heroImg.dataset.src);

/* ── Footer RERA line: never invents a number ──────────────────────────── */
$('#rera-line').textContent = DATA.rera
  ? 'RERA registration ' + DATA.rera
  : 'RERA registration — not yet configured.';
if (!DATA.rera) $('#faq-rera').textContent =
  'Registration details are confirmed at the point of enquiry. Ask our sales team for the certificate.';

/* ── Contact details flow from DATA ────────────────────────────────────── */
$$('[data-field="phone"]').forEach(a => {
  a.textContent = DATA.contact.phone;
  a.href = 'tel:' + DATA.contact.phone.replace(/[^\d+]/g,'');
});
$$('[data-field="email"]').forEach(a => {
  a.textContent = DATA.contact.email; a.href = 'mailto:' + DATA.contact.email;
});

/* ═══ VILLAS ═══════════════════════════════════════════════════════════ */
const bedIcon = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" class="h-4 w-4" aria-hidden="true"><path d="M2 17v-5h20v5M2 17v3M22 17v3M4 12V8a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v4M8 12V9h8v3"/></svg>';
const bathIcon = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" class="h-4 w-4" aria-hidden="true"><path d="M3 12h18v3a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4v-3ZM6 12V6a2 2 0 0 1 4 0M6 19l-1 2M18 19l1 2"/></svg>';

$('#villa-list').innerHTML = DATA.villas.map(v => `
  <details class="villa" id="villa-${v.id}">
    <summary class="flex flex-wrap items-baseline gap-x-8 gap-y-3 p-6 sm:p-8">
      <h3 class="font-display shrink-0" style="font-size:var(--step-2)">${v.name}</h3>
      <p class="text-mist text-[.95rem] flex items-center gap-5">
        <span class="flex items-center gap-1.5">${bedIcon}${v.beds}</span>
        <span class="flex items-center gap-1.5">${bathIcon}${v.baths}</span>
        <span>${v.area} sq ft</span>
      </p>
      <p class="ml-auto flex items-center gap-4">
        <span class="font-display text-dawn-deep" style="font-size:var(--step-1)">${v.price}</span>
        <svg class="chev h-5 w-5 text-mist" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg>
      </p>
    </summary>
    <div class="villa-body grid gap-10 border-t border-ink/12 p-6 sm:p-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
      <div>
        <p class="text-mist">${v.blurb}</p>
        <ul class="mt-6 grid gap-2.5 sm:grid-cols-2">
          ${v.features.map(f => `<li class="flex items-start gap-2.5 text-[.94rem]">
            <svg viewBox="0 0 24 24" fill="none" stroke="#7A5A12" stroke-width="2" class="mt-1 h-3.5 w-3.5 shrink-0" aria-hidden="true"><path d="M20 6 9 17l-5-5"/></svg>
            <span>${f}</span></li>`).join('')}
        </ul>
        <a href="#viewing" class="btn btn-ink mt-8" data-villa="${v.name}">See this villa</a>
      </div>
      <div class="grid gap-5">
        <div class="villa-shot relative aspect-[16/10] overflow-hidden bg-cloud-2">
          <img alt="${v.name} villa interior" data-src="${v.photo}" loading="lazy"
               decoding="async" class="h-full w-full object-cover opacity-0
               transition-opacity duration-700">
        </div>
      <!-- Indicative plan diagram, drawn rather than photographed so it is
           always present and always legible in both grounds. -->
      <svg viewBox="0 0 320 240" class="w-full h-auto border border-ink/12" role="img"
           aria-label="Indicative plan of the ${v.name} villa: living volume around a central water court.">
        <rect width="320" height="240" fill="#F6F8F9"/>
        <g stroke="#101820" stroke-opacity=".55" fill="none" stroke-width="1.5">
          <rect x="24" y="24" width="272" height="192"/>
          <path d="M24,132 H132 M132,24 V216 M212,24 V132 M212,132 H296"/>
        </g>
        <rect x="140" y="60" width="64" height="64" fill="#2F4A3C" fill-opacity=".18" stroke="#2F4A3C" stroke-width="1.5"/>
        <path d="M172,60 V124" stroke="#7A5A12" stroke-width="2.5" stroke-linecap="round"/>
        <text x="172" y="146" text-anchor="middle" font-size="9" font-family="Manrope, sans-serif" fill="#5A6B7A">water court</text>
        <text x="78"  y="80"  text-anchor="middle" font-size="9" font-family="Manrope, sans-serif" fill="#5A6B7A">living</text>
        <text x="78"  y="180" text-anchor="middle" font-size="9" font-family="Manrope, sans-serif" fill="#5A6B7A">dining</text>
        <text x="254" y="80"  text-anchor="middle" font-size="9" font-family="Manrope, sans-serif" fill="#5A6B7A">kitchen</text>
        <text x="254" y="180" text-anchor="middle" font-size="9" font-family="Manrope, sans-serif" fill="#5A6B7A">terrace</text>
      </svg>
      </div>
    </div>
  </details>`).join('');

/* Villa and band photographs use the same rule as the gallery: they fade in
   once decoded, and a failure leaves the drawn artwork rather than a hole. */
$$('.villa-shot img, .band-photo').forEach(img => {
  const probe = new Image();
  probe.onload = () => { img.src = img.dataset.src; img.style.opacity = img.classList.contains('band-photo') ? '.55' : '1'; };
  probe.onerror = () => { const w = img.closest('.villa-shot'); if (w) w.style.background =
    'linear-gradient(150deg,#DFE5EB,#C9D3DC)'; img.remove(); };
  probe.src = img.dataset.src;
});

/* Animate the disclosure without owning its state: <details> stays the
   source of truth, so it works with JS off and reads correctly to AT. */
$$('.villa').forEach(d => {
  const body = $('.villa-body', d);
  d.addEventListener('toggle', () => {
    if (!hasGSAP || reduced.matches) return;
    if (d.open) gsap.fromTo(body, {height:0, opacity:0},
      {height:'auto', opacity:1, duration:.5, ease:'power3.out',
       onComplete:() => { gsap.set(body,{height:'auto'}); ScrollTrigger.refresh(); }});
  });
});

/* Choosing a villa from a card pre-selects it in the form. */
$$('[data-villa]').forEach(a => a.addEventListener('click', () => {
  const sel = $('#f-villa');
  const opt = Array.from(sel.options).find(o => o.value === a.dataset.villa);
  if (opt) sel.value = opt.value;
}));
})();

(() => {
'use strict';
const $  = (s, r=document) => r.querySelector(s);
const $$ = (s, r=document) => Array.from(r.querySelectorAll(s));
const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
const hasGSAP = typeof window.gsap !== 'undefined' && typeof window.ScrollTrigger !== 'undefined';
const NS = 'http://www.w3.org/2000/svg';

/* ═══ MASTERPLAN ═══════════════════════════════════════════════════════
   Each plot is a real <button> wrapped around an SVG rect, so it is
   focusable, announces its own name and reports pressed state — none of
   which you get from a click handler on a bare <path>.               */
const PW = 54, PH = 40;
const group = $('#plots');
const label = p => `Plot ${p.n}, ${p.t}, ${p.a}, ${p.s === 'held' ? 'on hold' : p.s}`;

DATA.plots.forEach(p => {
  const g = document.createElementNS(NS,'g');
  g.setAttribute('role','button');
  g.setAttribute('tabindex', p.s === 'sold' ? '-1' : '0');
  g.setAttribute('aria-label', label(p));
  g.setAttribute('aria-pressed','false');
  g.dataset.plot = p.n;
  if (p.s === 'sold') g.setAttribute('aria-disabled','true');

  const r = document.createElementNS(NS,'rect');
  r.setAttribute('class','plot');
  r.setAttribute('x',p.x); r.setAttribute('y',p.y);
  r.setAttribute('width',PW); r.setAttribute('height',PH);
  r.dataset.status = p.s;
  r.setAttribute('pointer-events','all');

  const t = document.createElementNS(NS,'text');
  t.setAttribute('x', p.x + PW/2); t.setAttribute('y', p.y + PH/2 + 4);
  t.setAttribute('text-anchor','middle');
  t.setAttribute('font-size','11'); t.setAttribute('font-family','Manrope, sans-serif');
  t.setAttribute('font-weight','600');
  t.setAttribute('fill', p.s === 'sold' ? '#8A99A6' : p.s === 'held' ? '#7A5A12' : '#2F4A3C');
  t.setAttribute('pointer-events','none');
  t.textContent = p.n;

  g.append(r, t);
  group.appendChild(g);
});

const detail = $('#plot-detail');
let current = null;

/* Default panel: live inventory counted from DATA.plots, so the numbers can
   never drift away from the map they describe. */
function renderSummary(){
  const count = st => DATA.plots.filter(p => p.s === st).length;
  const byType = t => DATA.plots.filter(p => p.t === t && p.s === 'available').length;
  detail.innerHTML = `
    <h4 class="font-display" style="font-size:var(--step-2)">${count('available')} of ${DATA.plots.length} still available</h4>
    <p class="mt-3 text-mist">Select a plot on the site plan for its villa type,
      built-up area, aspect and price.</p>
    <dl class="mt-7 divide-y divide-ink/12 border-y border-ink/12 text-[.95rem]">
      ${DATA.villas.map(v => `
        <div class="flex justify-between gap-4 py-3">
          <dt class="text-mist">${v.name} &middot; ${v.area} sq ft</dt>
          <dd>${byType(v.name)} available</dd>
        </div>`).join('')}
      <div class="flex justify-between gap-4 py-3">
        <dt class="text-mist">On hold</dt><dd>${count('held')}</dd>
      </div>
      <div class="flex justify-between gap-4 py-3">
        <dt class="text-mist">Sold</dt><dd>${count('sold')}</dd>
      </div>
    </dl>
    <p class="mt-5 text-[.8rem] text-mist">Availability shown is indicative and
      changes daily. Confirm current status with the sales team.</p>`;
}
renderSummary();

function selectPlot(p, node){
  if (p.s === 'sold') return;
  if (current) current.setAttribute('aria-pressed','false');
  node.setAttribute('aria-pressed','true');
  current = node;

  const villa = DATA.villas.find(v => v.name === p.t);
  detail.innerHTML = `
    <div class="flex items-baseline justify-between gap-4">
      <h4 class="font-display" style="font-size:var(--step-2)">Plot ${p.n}</h4>
      <span class="text-[.8rem] font-medium px-2.5 py-1 border"
            style="${p.s === 'available'
              ? 'color:#2F4A3C;border-color:#2F4A3C;background:rgba(47,74,60,.08)'
              : 'color:#7A5A12;border-color:#7A5A12;background:rgba(122,90,18,.08)'}">
        ${p.s === 'held' ? 'On hold' : 'Available'}
      </span>
    </div>
    <dl class="mt-6 divide-y divide-ink/12 border-y border-ink/12 text-[.95rem]">
      <div class="flex justify-between gap-4 py-3"><dt class="text-mist">Villa type</dt><dd>${p.t}</dd></div>
      <div class="flex justify-between gap-4 py-3"><dt class="text-mist">Built-up</dt><dd>${villa ? villa.area + ' sq ft' : '—'}</dd></div>
      <div class="flex justify-between gap-4 py-3"><dt class="text-mist">Aspect</dt><dd>${p.a}</dd></div>
      <div class="flex justify-between gap-4 py-3"><dt class="text-mist">From</dt><dd class="text-dawn-deep font-medium">${villa ? villa.price : '—'}</dd></div>
    </dl>
    <a href="#viewing" class="btn btn-ink mt-7 w-full" data-plot-cta="${p.n}">Enquire about plot ${p.n}</a>`;

  const cta = $('[data-plot-cta]', detail);
  if (cta) cta.addEventListener('click', () => {
    const note = $('#f-note');
    const line = `Interested in plot ${p.n} (${p.t}).`;
    if (!note.value.includes(line)) note.value = (note.value ? note.value.trim() + '\n' : '') + line;
    const sel = $('#f-villa');
    const opt = Array.from(sel.options).find(o => o.value === p.t);
    if (opt) sel.value = opt.value;
  });

  if (hasGSAP && !reduced.matches)
    gsap.from(detail.children, {opacity:0, y:10, duration:.4, stagger:.05, ease:'power2.out'});
}

$$('#plots [data-plot]').forEach(node => {
  const p = DATA.plots.find(x => x.n === node.dataset.plot);
  node.addEventListener('click', () => selectPlot(p, node));
  node.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); selectPlot(p, node); }
  });
});

/* ═══ GALLERY ══════════════════════════════════════════════════════════ */
const gal = $('#gallery');
gal.innerHTML = DATA.gallery.map((g,i) => `
  <figure class="frame">
    <img alt="${g.cap}" data-src="${g.src}" data-i="${i}" loading="lazy" decoding="async" width="1100" height="1375">
    <figcaption>${g.cap}</figcaption>
    <button class="absolute inset-0 h-full w-full cursor-zoom-in" data-lb="${i}">
      <span class="sr-only">Open larger: ${g.cap}</span>
    </button>
  </figure>`).join('');

$$('#gallery img').forEach(img => {
  const probe = new Image();
  probe.onload  = () => { img.src = img.dataset.src; img.classList.add('is-loaded'); };
  probe.onerror = () => {
    /* Photo missing: the frame becomes a drawn panel rather than a hole.
       Capture the frame BEFORE detaching the image — closest() on a removed
       node returns null. */
    const frame = img.closest('.frame');
    img.remove();
    if (!frame) return;
    const f = document.createElement('div');
    f.className = 'absolute inset-0';
    f.style.background = 'linear-gradient(160deg,#2F4A3C,#22382D 60%,#1A2C23)';
    f.setAttribute('aria-hidden','true');
    frame.prepend(f);
  };
  probe.src = img.dataset.src;
});

/* ═══ LIGHTBOX ═════════════════════════════════════════════════════════
   Focus is trapped while open and restored to the trigger on close.  */
const lb = $('#lightbox'), lbImg = $('#lb-img'), lbCap = $('#lb-cap'), lbClose = $('#lb-close');
let lastFocus = null;

function openLB(i){
  const g = DATA.gallery[i];
  lbImg.src = g.src; lbImg.alt = g.cap; lbCap.textContent = g.cap;
  lastFocus = document.activeElement;
  lb.hidden = false;
  document.body.style.overflow = 'hidden';
  lbClose.focus();
  if (hasGSAP && !reduced.matches)
    gsap.fromTo(lb, {opacity:0}, {opacity:1, duration:.3, ease:'power2.out'});
}
function closeLB(){
  lb.hidden = true;
  document.body.style.overflow = '';
  if (lastFocus) lastFocus.focus();
}
$$('[data-lb]').forEach(b => b.addEventListener('click', () => openLB(+b.dataset.lb)));
lbClose.addEventListener('click', closeLB);
lb.addEventListener('click', e => { if (e.target === lb) closeLB(); });
document.addEventListener('keydown', e => {
  if (lb.hidden) return;
  if (e.key === 'Escape') closeLB();
  if (e.key === 'Tab') { e.preventDefault(); lbClose.focus(); }
});
})();

(() => {
'use strict';
const $  = (s, r=document) => r.querySelector(s);
const $$ = (s, r=document) => Array.from(r.querySelectorAll(s));

/* ═══ FORM ═════════════════════════════════════════════════════════════
   Validates on blur, not on keystroke. On a failed submit the summary is
   focused and each item links to its field; inline errors stay in place.
   ═══════════════════════════════════════════════════════════════════ */
const form = $('#viewing-form');
const summary = $('#form-summary');
const summaryList = $('#form-summary-list');
const formOpenedAt = Date.now();

const RULES = {
  'f-name':  { msg:'Enter your name so we know who to expect.',
               label:'Your name',
               test: v => v.trim().length >= 2 },
  'f-phone': { msg:'Enter a phone number of at least 10 digits.',
               label:'Phone',
               test: v => (v.replace(/\D/g,'').length >= 10) },
  'f-email': { msg:'Enter an email address in the form name@example.com.',
               label:'Email',
               test: v => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()) }
};

function validate(id, showError=true){
  const el = $('#' + id), rule = RULES[id];
  const ok = rule.test(el.value);
  const field = el.closest('.field');
  if (showError){
    field.classList.toggle('is-invalid', !ok);
    el.setAttribute('aria-invalid', String(!ok));
  }
  return ok;
}

Object.keys(RULES).forEach(id => {
  const el = $('#' + id);
  el.addEventListener('blur', () => { if (el.value !== '') validate(id); });
  /* Once a field is marked invalid, correct it live so the error clears
     the moment it is fixed — but never nag before first blur. */
  el.addEventListener('input', () => {
    if (el.getAttribute('aria-invalid') === 'true') validate(id);
  });
});

form.addEventListener('submit', e => {
  e.preventDefault();
  const failed = Object.keys(RULES).filter(id => !validate(id));

  if (failed.length){
    summaryList.innerHTML = failed.map(id =>
      `<li><a class="underline underline-offset-2" href="#${id}">${RULES[id].label} — ${RULES[id].msg}</a></li>`
    ).join('');
    summary.classList.add('is-shown');
    summary.focus();
    $$('#form-summary-list a').forEach(a => a.addEventListener('click', ev => {
      ev.preventDefault();
      $(a.getAttribute('href')).focus();
    }));
    return;
  }

  summary.classList.remove('is-shown');
  const btn = $('#f-submit');
  const label = btn.textContent;
  btn.disabled = true;
  btn.textContent = 'Sending…';

  /* Posts to submit.php, which holds the Leadi5 API key server-side and
     forwards the lead. The key is deliberately not in this file: everything
     under js/ is served to the browser and readable by any visitor. */
  fetch('submit.php', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      name:  $('#f-name').value.trim(),
      phone: $('#f-phone').value.trim(),
      email: $('#f-email').value.trim(),
      villa: $('#f-villa').value,
      date:  $('#f-date').value,
      note:  $('#f-note').value.trim(),
      source: location.pathname + location.hash,
      company: $('#f-company').value,          // honeypot — must stay empty
      elapsed: Date.now() - formOpenedAt       // bots submit in under 2s
    })
  })
  .then(async res => {
    const data = await res.json().catch(() => ({}));
    if (res.ok && data.ok) return showSuccess();

    /* The server validates independently of the browser. If it rejects a
       field, show that against the field rather than a generic failure. */
    if (data.fields) {
      Object.entries(data.fields).forEach(([k, msg]) => {
        const el = $('#f-' + k);
        if (!el) return;
        el.setAttribute('aria-invalid', 'true');
        const field = el.closest('.field');
        field.classList.add('is-invalid');
        const err = $('.err', field);
        if (err) err.textContent = msg;
      });
    }
    throw new Error(data.error || 'That did not send.');
  })
  .catch(err => {
    /* Never strand the visitor on a dead button. Restore it, say what
       happened, and leave the phone number as the way through. */
    btn.disabled = false;
    btn.textContent = label;
    summaryList.innerHTML =
      '<li>' + (err && err.message ? err.message : 'That did not send.') +
      ' You can also call <a class="underline underline-offset-2" href="tel:' +
      DATA.contact.phone.replace(/[^\d+]/g, '') + '">' + DATA.contact.phone + '</a>.</li>';
    summary.classList.add('is-shown');
    summary.focus();
  });

  function showSuccess(){
    form.querySelectorAll(':scope > .grid, :scope > #f-submit, :scope > p').forEach(n => n.hidden = true);
    const done = $('#form-done');
    done.hidden = false;
    done.focus();
  }
});
})();

(() => {
'use strict';
const $  = (s, r=document) => r.querySelector(s);
const $$ = (s, r=document) => Array.from(r.querySelectorAll(s));
/* If GSAP failed to load, clear every animation start-state before bailing.
   Without this the CSS initial opacity:0 would leave the page blank — a CDN
   hiccup must cost the choreography, never the content. */
if (typeof window.gsap === 'undefined' || typeof window.ScrollTrigger === 'undefined') {
  $$('[data-anim]').forEach(el => {
    el.style.opacity = '1'; el.style.transform = 'none'; el.style.clipPath = 'none';
  });
  $$('.word').forEach(el => { el.style.transform = 'none'; });
  const a = $('#alt-readout'); if (a) a.textContent = '1,478';
  const sw = $('.sunwash'); if (sw) sw.style.opacity = '.5';
  return;
}

/* ═══ MOTION ═══════════════════════════════════════════════════════════
   One idea, executed once: scroll is altitude. Everything below serves
   that — there are deliberately no per-section fade-and-slide-ups on
   every block, because a page of those is the generated-looking default.
   Exactly two sections pin: the ascent and the interior gallery.
   ═══════════════════════════════════════════════════════════════════ */
gsap.registerPlugin(ScrollTrigger);

const mm = gsap.matchMedia();

/* ── Reduced motion: render every end state immediately, animate nothing.
      The page must be complete and correct without a single tween. ──── */
mm.add('(prefers-reduced-motion: reduce)', () => {
  gsap.set('[data-anim]', {opacity:1, y:0, clipPath:'none'});
  gsap.set('.word', {y:0});
  gsap.set('.sunwash', {opacity:.5});
  $('#alt-readout').textContent = '1,478';
});

mm.add('(prefers-reduced-motion: no-preference)', () => {

  /* ── The one orchestrated moment: page load ────────────────────────── */
  const intro = gsap.timeline({defaults:{ease:'expo.out'}});
  intro
    .set('.word', {yPercent:110})
    .to('.word', {yPercent:0, duration:1.5, stagger:.075}, .15)
    .fromTo('#ascent [data-anim="rise"]',
            {opacity:0, y:16}, {opacity:1, y:0, duration:1, stagger:.09}, .55)
    .fromTo('#nav', {opacity:0}, {opacity:1, duration:.9}, .3);

  /* ── The ascent: scroll drives altitude ────────────────────────────── */
  const alt = $('#alt-readout');
  const climb = gsap.timeline({
    scrollTrigger:{
      trigger:'#ascent', start:'top top', end:'+=140%',
      scrub:1, pin:true, pinSpacing:true, anticipatePin:1
    }
  });

  /* Ridges and cloud part at diverging rates — background slowest,
     foreground fastest — which is what sells the depth. */
  $$('[data-parallax]').forEach(el => {
    const depth = parseFloat(el.dataset.parallax);
    climb.to(el, {yPercent: depth * 46, ease:'none'}, 0);
  });

  climb
    .to('.cloudbank', {opacity:.35, ease:'none'}, 0)
    .to('.stars',     {opacity:0,   ease:'none'}, 0)
    .to('.sunwash',   {opacity:.85, ease:'none'}, .15)
    .to('.hero-photo',{opacity:0,   ease:'none'}, .55)
    .to('#ascent .relative.z-10', {opacity:0, y:-30, ease:'none'}, .68);

  /* The elevation readout is the hero's live element: real numbers,
     920 m at the city to 1,478 m on the ridge. */
  const counter = {v:920};
  climb.to(counter, {
    v:1478, ease:'none', duration:1,
    onUpdate: () => { alt.textContent = Math.round(counter.v).toLocaleString('en-IN'); }
  }, 0);

  /* ── Nav: darkens over dark ground, lightens above the cloud line ──── */
  ScrollTrigger.create({
    start: 'top -80',
    onUpdate: self => $('#nav').classList.toggle('is-stuck', self.scroll() > 80)
  });
  ['#land','#masterplan','#villas','#case','#assurance'].forEach(sel => {
    ScrollTrigger.create({
      trigger: sel, start:'top 64px', end:'bottom 64px',
      onToggle: self => $('#nav').classList.toggle('is-light', self.isActive)
    });
  });

  /* ── Section reveals: a short fade, applied only to headings, ledes and
        data rows. Small y offset so it reads as a fade, not a slide. ─── */
  ScrollTrigger.batch('main > section:not(#ascent) [data-anim="rise"]', {
    start: 'top 88%',
    onEnter: batch => gsap.to(batch, {
      opacity:1, y:0, duration:.6, stagger:.06, ease:'power2.out', overwrite:true
    })
  });
  gsap.set('main > section:not(#ascent) [data-anim="rise"]', {opacity:0, y:14});

  /* ── The interior gallery: the second and last pin ─────────────────── */
  const track = $('#gallery');
  ScrollTrigger.create({
    trigger:'#gallery-wrap',
    start:'center center',
    end: () => '+=' + (track.scrollWidth - window.innerWidth + 120),
    pin:'#gallery-wrap', scrub:1, invalidateOnRefresh:true,
    animation: gsap.to(track, {
      x: () => -(track.scrollWidth - window.innerWidth + 120), ease:'none'
    })
  });

  /* ── Dawn breaks on the CTA. The only other place gold washes the page,
        and the reason the accent was held back everywhere else. ─────── */
  gsap.fromTo('#viewing .sunwash',
    {opacity:0, yPercent:22},
    {opacity:.55, yPercent:0, ease:'none',
     scrollTrigger:{trigger:'#viewing', start:'top 85%', end:'center center', scrub:1}});
});

/* Pinned sections need a re-measure once fonts and images settle,
   or the pin distances are computed against the wrong heights. */
if (document.fonts && document.fonts.ready)
  document.fonts.ready.then(() => ScrollTrigger.refresh());
window.addEventListener('load', () => ScrollTrigger.refresh());
})();


/* ═══ STICKY REVEAL FOOTER ═════════════════════════════════════════════════
   The footer is fixed behind the page; the content sheet slides up off it.
   All this needs from JS is (a) a spacer matching the footer's real height,
   so the reveal ends exactly as the footer is fully uncovered, and (b) the
   entrance for the footer's own content once it comes into view.
   ═══════════════════════════════════════════════════════════════════════ */
(() => {
  'use strict';
  const $ = (s, r=document) => r.querySelector(s);
  const $$ = (s, r=document) => Array.from(r.querySelectorAll(s));
  const footer = $('#site-footer');
  const spacer = $('.footer-spacer');
  if (!footer || !spacer) return;

  const desktop = window.matchMedia('(min-width: 768px)');
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  const hasST = typeof window.gsap !== 'undefined' && typeof window.ScrollTrigger !== 'undefined';

  /* Measure rather than guess: a hard-coded 100vh spacer leaves a gap or a
     clipped footer the moment the content reflows at a different width. */
  function sizeSpacer(){
    if (!desktop.matches) { spacer.style.height = ''; return; }
    spacer.style.height = footer.offsetHeight + 'px';
    if (hasST) ScrollTrigger.refresh();
  }

  let t;
  const onResize = () => { clearTimeout(t); t = setTimeout(sizeSpacer, 150); };
  window.addEventListener('resize', onResize);
  desktop.addEventListener('change', sizeSpacer);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(sizeSpacer);
  window.addEventListener('load', sizeSpacer);
  sizeSpacer();

  if (!hasST || reduced.matches) return;

  /* Footer content rises as the sheet clears it. Scrubbed, so it tracks the
     reveal rather than firing once and finishing out of step with it. */
  gsap.set('[data-foot]', {opacity:0, y:24});
  gsap.to('[data-foot]', {
    opacity:1, y:0, stagger:.06, ease:'power2.out',
    scrollTrigger:{ trigger:'.footer-spacer', start:'top 72%', end:'top 12%', scrub:.8 }
  });

  /* The wordmark drifts up a little slower than the rest, which reads as
     depth without moving far enough to be noticed as an effect. */
  gsap.fromTo('.wordmark', {yPercent:16}, {
    yPercent:0, ease:'none',
    scrollTrigger:{ trigger:'.footer-spacer', start:'top bottom', end:'bottom bottom', scrub:1 }
  });
})();
