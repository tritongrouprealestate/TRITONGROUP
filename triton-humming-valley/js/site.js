/* Triton Humming Valley — application script.
   Order matters: DATA first, then the modules that read it. */

/* ═══════════════════════════════════════════════════════════════════════════
   DATA — the single place to edit project facts.
   ═══════════════════════════════════════════════════════════════════════ */
const DATA = {

  /* Confirmed by Triton. Set to null and the footer says the number is not
     configured, rather than showing a wrong one. */
  rera: 'PRM/KA/RERA/1254/460/PR/131224/007292',

  /* Confirmed by Triton. Shown in the land summary and the specification
     table; set to null and both rows are omitted rather than left blank. */
  possession: 'October 2026',

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

  /* The four frames of the scroll choreography in the Inside section. The
     last one is the hero: it is the frame that ends up filling the screen,
     so it should be the strongest photograph you have. */
  choreography: [
    {src:'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1400&q=75',
     alt:'Villa exterior seen from the internal road'},
    {src:'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1400&q=75',
     alt:'The double-height core, teak and stone'},
    {src:'https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?auto=format&fit=crop&w=1400&q=75',
     alt:'Jacuzzi terrace at the valley edge'},
    {src:'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2000&q=80',
     alt:'The living volume, wrapped around the water court',
     caption:'The living volume, wrapped around the water court'}
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

/* Possession fills in wherever the page states it. If it is unset the rows
   are removed rather than left showing an empty value. */
$$('[data-possession]').forEach(el => {
  if (DATA.possession) el.textContent = DATA.possession;
  else el.closest('[data-possession-row]')?.remove();
});

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
        <button type="button" class="btn btn-ink mt-8" data-enquire="Villa ${v.name}" data-villa="${v.name}">Enquire about the ${v.name}</button>
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
    <button type="button" class="btn btn-ink mt-7 w-full" data-enquire="Plot ${p.n}" data-plot-cta="${p.n}">Enquire about plot ${p.n}</button>`;

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
    <img alt="${g.cap}" data-src="${g.src}" data-i="${i}" loading="lazy" decoding="async" width="1100" height="825">
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
  if (window.lenisInstance) window.lenisInstance.stop();
  else document.body.style.overflow = 'hidden';
  lbClose.focus();
  if (hasGSAP && !reduced.matches)
    gsap.fromTo(lb, {opacity:0}, {opacity:1, duration:.3, ease:'power2.out'});
}
function closeLB(){
  lb.hidden = true;
  if (window.lenisInstance) window.lenisInstance.start();
  else document.body.style.overflow = '';
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

/* The enquiry form is built by the component in the block below, which
   serves the hero card, the popup and the enquiry section from one
   implementation. */

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
});

mm.add('(prefers-reduced-motion: no-preference)', () => {

  /* ── The one orchestrated moment: page load ────────────────────────── */
  const intro = gsap.timeline({defaults:{ease:'expo.out'}});
  intro
    .set('.word', {yPercent:110})
    .to('.word', {yPercent:0, duration:1.5, stagger:.075}, .15)
    .fromTo('.hero-eyebrow, #hero .lede, .hero-facts > div, .hero-actions',
            {opacity:0, y:18}, {opacity:1, y:0, duration:1, stagger:.07}, .5)
    .fromTo('.hero-card', {opacity:0, y:30}, {opacity:1, y:0, duration:1.1}, .75)
    .fromTo('#nav', {opacity:0}, {opacity:1, duration:.9}, .3);

  /* ── The hero ─────────────────────────────────────────────────────────
     The photograph drifts slowly as you leave, which reads as depth without
     holding you in place. The previous version pinned the hero and scrubbed
     an altitude counter through it — that made the first thing a visitor met
     a scroll they could not skip, on a page whose job is to collect an
     enquiry. */
  gsap.to('.hero-photo', {
    yPercent: 8, scale: 1.06, ease: 'none',
    scrollTrigger: { trigger: '#hero', start: 'top top', end: 'bottom top', scrub: 1 }
  });
  gsap.to('.hero-grid', {
    opacity: 0, y: -20, ease: 'none',
    scrollTrigger: { trigger: '#hero', start: '55% top', end: 'bottom top', scrub: 1 }
  });


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
  ScrollTrigger.batch('main > section:not(#hero) [data-anim="rise"]', {
    start: 'top 88%',
    onEnter: batch => gsap.to(batch, {
      opacity:1, y:0, duration:.6, stagger:.06, ease:'power2.out', overwrite:true
    })
  });
  gsap.set('main > section:not(#hero) [data-anim="rise"]', {opacity:0, y:14});

  /* The interior choreography lives in its own block below, driven by CSS
     sticky rather than a pin, which leaves the hero as the page's only
     pinned section. */

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


/* The sticky reveal footer was removed: it competed with the enquiry form
   directly above it for the same attention, and the form is what matters. */


/* ═══════════════════════════════════════════════════════════════════════════
   MOTION LAYER
   Order matters here: smooth scroll is installed first and ScrollTrigger is
   driven from it, so every scroll-linked animation on the page reads from the
   same eased position rather than from the raw wheel. That single wiring is
   what makes the whole page feel continuous; the effects after it are tuned
   to that rhythm.
   ═══════════════════════════════════════════════════════════════════════ */
(() => {
  'use strict';
  const $  = (s, r=document) => r.querySelector(s);
  const $$ = (s, r=document) => Array.from(r.querySelectorAll(s));

  const reduced   = window.matchMedia('(prefers-reduced-motion: reduce)');
  const finePoint = window.matchMedia('(hover:hover) and (pointer:fine)');
  const hasGSAP   = typeof window.gsap !== 'undefined' && typeof window.ScrollTrigger !== 'undefined';

  /* Reduced motion gets none of this. Not a gentler version — none, with the
     page already at its finished state. */
  if (reduced.matches || !hasGSAP) return;

  /* ── 1 · Smooth scroll ────────────────────────────────────────────────
     Lenis eases the scroll position and ScrollTrigger is updated from it, so
     pinned sections and scrubbed timelines track the eased value. Driving
     Lenis from GSAP's ticker keeps both on one rAF loop rather than two
     competing ones. */
  let lenis = null;
  if (typeof window.Lenis !== 'undefined') {
    lenis = new Lenis({
      duration: 1.1,
      easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)),  // expo out
      smoothWheel: true,
      /* Touch is left alone deliberately: native momentum on a phone is
         better than anything re-implemented, and overriding it makes a
         page feel wrong in the hand. */
      smoothTouch: false,
      touchMultiplier: 1.6
    });
    window.lenisInstance = lenis;   // the popup stops it while open
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add(time => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);

    /* In-page links must go through Lenis, or they jump while everything
       else eases and the page feels like two different documents. */
    $$('a[href^="#"]').forEach(a => {
      a.addEventListener('click', e => {
        const id = a.getAttribute('href');
        if (!id || id === '#') return;
        const target = document.querySelector(id);
        if (!target) return;
        e.preventDefault();
        lenis.scrollTo(target, { offset: -72, duration: 1.4 });
      });
    });
  }

  /* ── 2 · Scroll progress ─────────────────────────────────────────────── */
  const bar = document.createElement('div');
  bar.id = 'scroll-progress';
  document.body.appendChild(bar);
  gsap.to(bar, {
    scaleX: 1, ease: 'none',
    scrollTrigger: { start: 0, end: () => document.body.scrollHeight - innerHeight, scrub: .3 }
  });

  /* ── 3 · Custom cursor ───────────────────────────────────────────────────
     The dot tracks exactly; the ring is eased toward it with quickTo. The lag
     between them is the effect — a ring that tracked perfectly would read as
     a shape stuck to the pointer rather than as something with weight. */
  if (finePoint.matches) {
    const dot  = document.createElement('div'); dot.id  = 'cursor-dot';
    const ring = document.createElement('div'); ring.id = 'cursor-ring';
    ring.appendChild(document.createElement('i'));   // scales; the ring positions
    document.body.append(dot, ring);
    document.documentElement.classList.add('has-cursor');

    const dx = gsap.quickTo(dot,  'x', {duration:.12, ease:'power3'});
    const dy = gsap.quickTo(dot,  'y', {duration:.12, ease:'power3'});
    const rx = gsap.quickTo(ring, 'x', {duration:.55, ease:'power3'});
    const ry = gsap.quickTo(ring, 'y', {duration:.55, ease:'power3'});

    let shown = false;
    window.addEventListener('pointermove', e => {
      if (e.pointerType !== 'mouse') return;
      dx(e.clientX); dy(e.clientY); rx(e.clientX); ry(e.clientY);
      if (!shown) { shown = true; gsap.to([dot, ring], {opacity:1, duration:.35}); }
    }, {passive:true});

    /* Leaving the window must hide it, or the ring is left stranded at the
       edge of the screen when the pointer is somewhere else entirely. */
    document.addEventListener('mouseleave', () => {
      shown = false; gsap.to([dot, ring], {opacity:0, duration:.25});
    });

    /* Scale targets the inner element, never the ring itself: the ring's
       transform is owned by the position tweens.

       gsap.to, not quickTo. quickTo is built for per-frame updates of ONE
       resolved property and silently creates no tween for `scale`, which GSAP
       treats as shorthand for scaleX/scaleY — the ring stayed at 1 with no
       error. Scale changes on hover, a few times a second at most, so a plain
       tween with overwrite is both correct and cheaper. */
    const rs = v => gsap.to(ring.firstChild,
      {scale: v, duration: .34, ease: 'power3', overwrite: 'auto'});
    const OPEN    = 'a, button, summary, [role="button"], .frame, label';
    const PRECISE = '#plots [data-plot], input, textarea, select';
    document.addEventListener('pointerover', e => {
      if (e.target.closest(PRECISE)) {
        ring.classList.add('is-precise'); ring.classList.remove('is-active'); rs(0.58);
      } else if (e.target.closest(OPEN)) {
        ring.classList.add('is-active');  ring.classList.remove('is-precise'); rs(1.68);
      } else {
        ring.classList.remove('is-active', 'is-precise'); rs(1);
      }
    });
  }

  /* ── 4 · Magnetic pull ───────────────────────────────────────────────────
     Buttons lean toward the pointer within their own area. Capped well below
     the element's size: a control that moves far enough to slip out from
     under the pointer is a worse button, however good it looks. */
  if (finePoint.matches) {
    $$('.btn, [data-magnetic]').forEach(el => {
      el.setAttribute('data-magnetic', '');
      const mx = gsap.quickTo(el, 'x', {duration:.5, ease:'power3'});
      const my = gsap.quickTo(el, 'y', {duration:.5, ease:'power3'});
      el.addEventListener('pointermove', e => {
        const r = el.getBoundingClientRect();
        mx(gsap.utils.clamp(-14, 14, (e.clientX - (r.left + r.width/2)) * .32));
        my(gsap.utils.clamp(-10, 10, (e.clientY - (r.top + r.height/2)) * .32));
      });
      el.addEventListener('pointerleave', () => { mx(0); my(0); });
      /* Keyboard focus must reset the offset, or a tabbed-to button sits
         wherever the mouse last nudged it. */
      el.addEventListener('focus', () => { mx(0); my(0); });
    });
  }

  /* ── 5 · Heading reveals ─────────────────────────────────────────────────
     Each heading is split into lines and each line rises out of its own mask.
     Splitting by line rather than by word keeps the reveal readable: words
     arriving individually turn a sentence into a list.

     The original text is kept and restored on resize, because a line split
     is only valid for the width it was measured at. */
  const splitTargets = $$('main h2, #inside h2, .display:not(h1)')
    .filter(el => !el.closest('#hero'));

  function splitLines(el){
    if (el.dataset.origHtml === undefined) el.dataset.origHtml = el.innerHTML;
    el.innerHTML = el.dataset.origHtml;
    const words = el.textContent.trim().split(/\s+/);
    el.innerHTML = words.map(w => `<span class="w">${w}</span>`).join(' ');
    const spans = $$('.w', el);
    const lines = [];
    let top = null, cur = [];
    spans.forEach(sp => {
      const t = Math.round(sp.offsetTop);
      if (top === null || t === top) { cur.push(sp.textContent); top = t; }
      else { lines.push(cur); cur = [sp.textContent]; top = t; }
    });
    if (cur.length) lines.push(cur);
    el.innerHTML = lines
      .map(l => `<span class="line-mask"><span class="line-inner">${l.join(' ')}</span></span>`)
      .join('');
    return $$('.line-inner', el);
  }

  const lineTriggers = [];
  function buildLineReveals(){
    lineTriggers.forEach(t => t.kill());
    lineTriggers.length = 0;
    splitTargets.forEach(el => {
      const inners = splitLines(el);
      gsap.set(inners, {yPercent: 108});
      const tl = gsap.to(inners, {
        yPercent: 0, duration: 1.05, ease: 'expo.out', stagger: .085,
        scrollTrigger: { trigger: el, start: 'top 86%', once: true }
      });
      if (tl.scrollTrigger) lineTriggers.push(tl.scrollTrigger);
    });
  }
  buildLineReveals();

  let rt;
  window.addEventListener('resize', () => {
    clearTimeout(rt);
    rt = setTimeout(() => { buildLineReveals(); ScrollTrigger.refresh(); }, 250);
  });

  /* ── 6 · Image reveals ───────────────────────────────────────────────────
     The frame wipes open while the picture counter-scales inside it, so the
     image itself appears still and only the aperture moves. */
  $$('.villa-shot, .frame, figure.relative').forEach(box => {
    const img = box.querySelector('img');
    if (!img) return;
    box.setAttribute('data-reveal-img', '');
    gsap.set(box, {clipPath:'inset(0 0 100% 0)'});
    gsap.set(img, {scale:1.22});
    gsap.timeline({scrollTrigger:{trigger:box, start:'top 88%', once:true}})
      .to(box, {clipPath:'inset(0 0 0% 0)', duration:1.15, ease:'expo.out'})
      .to(img, {scale:1, duration:1.5, ease:'expo.out'}, 0);
  });

  /* ── 7 · Depth on scroll ─────────────────────────────────────────────────
     Photographs drift slower than the page. Kept small — beyond about 12% the
     foreground and background visibly desync and it reads as a glitch. */
  $$('.villa-shot img, figure.relative .band-photo').forEach(img => {
    gsap.fromTo(img, {yPercent:-6}, {
      yPercent: 6, ease:'none',
      scrollTrigger:{trigger: img.closest('figure, .villa-shot'), start:'top bottom', end:'bottom top', scrub:1}
    });
  });

  /* ── 8 · Counting statistics ─────────────────────────────────────────────
     The land figures count up once as they arrive. Only the numeric part is
     animated; units and ranges are left alone so "2,400–3,800" does not turn
     into nonsense mid-count. */
  $$('#land dd').forEach(dd => {
    const raw = dd.textContent.trim();
    const m = raw.match(/^(\d[\d,]*)(%?)$/);
    if (!m) return;
    const end = parseInt(m[1].replace(/,/g, ''), 10);
    const suffix = m[2];
    const o = {v: 0};
    gsap.to(o, {
      v: end, duration: 1.6, ease: 'power2.out',
      scrollTrigger: {trigger: dd, start: 'top 90%', once: true},
      onUpdate: () => { dd.textContent = Math.round(o.v).toLocaleString('en-IN') + suffix; }
    });
  });

  /* ── 9 · Section grounds ─────────────────────────────────────────────────
     The nav already switches at the cloud line. This eases the switch across
     the boundary instead of snapping it, which is the join most likely to
     betray that the page is made of separate sections. */
  ScrollTrigger.refresh();
})();


/* ═══════════════════════════════════════════════════════════════════════════
   SCROLL CHOREOGRAPHY  (Inside section)

   Four frames start in the quadrants. Two swap diagonally, all four gather to
   the centre, and the last one opens out to fill the screen while the three
   beneath it fade.

   Ported from a React/Framer Motion component. Two things changed in the
   port, both deliberate:

   1. Framer's useSpring is replaced by ScrollTrigger's scrub, which is
      already smoothing every other scroll-linked animation on this page.
      Adding a second, differently-tuned smoother would have made this one
      section move to a rhythm the rest of the page does not share.
   2. The original's alt text described the layout — "Top Left", "Top Right
      (Hero)" — which tells a screen-reader user nothing. Alt text here
      describes the photograph.
   ═══════════════════════════════════════════════════════════════════════ */
(() => {
  'use strict';
  const $  = (s, r=document) => r.querySelector(s);
  const inner = $('.choreo-inner');
  if (!inner || typeof DATA === 'undefined' || !DATA.choreography) return;

  /* Markup is built regardless of motion preference: with motion off the CSS
     lays these out as a plain grid, so the photographs are still delivered. */
  inner.innerHTML = DATA.choreography.map((f, i) => `
    <figure class="choreo-frame" style="z-index:${(i + 1) * 10}">
      <img alt="${f.alt}" data-src="${f.src}" decoding="async"
           ${i === DATA.choreography.length - 1 ? '' : 'loading="lazy"'}>
    </figure>`).join('');

  const frames = Array.from(inner.querySelectorAll('.choreo-frame'));
  const imgs   = frames.map(f => f.querySelector('img'));

  /* Same loading rule as everywhere else on the page: show the picture once
     it has decoded, and leave the frame's own colour if it never arrives. */
  imgs.forEach(img => {
    const probe = new Image();
    probe.onload  = () => { img.src = img.dataset.src; };
    probe.onerror = () => { img.remove(); };
    probe.src = img.dataset.src;
  });

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  const hasGSAP = typeof window.gsap !== 'undefined' && typeof window.ScrollTrigger !== 'undefined';
  if (reduced.matches || !hasGSAP) return;   // CSS has already made it a grid

  const caption = $('.choreo-caption');
  if (caption && DATA.choreography[3] && DATA.choreography[3].caption) {
    caption.textContent = DATA.choreography[3].caption;
  }

  /* Offsets differ by screen: 36vw is a postage stamp on a phone, and the
     quadrant spread has to shrink with it or the frames leave the viewport. */
  const mm = gsap.matchMedia();
  mm.add({
    isDesktop: '(min-width: 768px) and (prefers-reduced-motion: no-preference)',
    isMobile:  '(max-width: 767.98px) and (prefers-reduced-motion: no-preference)'
  }, ctx => {
    const { isDesktop } = ctx.conditions;
    const X = isDesktop ? 20 : 17;   // vw from centre
    const Y = isDesktop ? 14 : 11;   // vh from centre

    const [topLeft, bottomRight, bottomLeft, hero] = frames;

    /* Centring is stated here explicitly rather than inherited from the
       stylesheet's translate(-50%,-50%). Relying on GSAP to round-trip that
       CSS percentage was not reliable: at desktop widths it composed both
       axes, at 375px it kept only the Y half and every frame sat half its
       own width to the right — the effect looked correct on a laptop and
       broken on a phone. The stylesheet keeps its translate for the state
       before this script runs; from here GSAP owns the whole transform. */
    gsap.set(frames, { xPercent: -50, yPercent: -50 });

    gsap.set(topLeft,     { x: -X + 'vw', y: -Y + 'vh' });
    gsap.set(bottomRight, { x:  X + 'vw', y:  Y + 'vh' });
    gsap.set(bottomLeft,  { x: -X + 'vw', y:  Y + 'vh' });
    gsap.set(hero,        { x:  X + 'vw', y: -Y + 'vh' });
    gsap.set([topLeft, bottomRight, bottomLeft], { opacity: 1 });

    const tl = gsap.timeline({
      defaults: { ease: 'none' },
      scrollTrigger: {
        trigger: '#choreo',
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1,
        invalidateOnRefresh: true
      }
    });

    /* Phase 1 — the diagonal swap. Two frames trade corners while the other
       two hold, so the movement reads as an exchange rather than a drift. */
    tl.to(topLeft,     { y:  Y + 'vh', duration: .30 }, 0)
      .to(bottomRight, { y: -Y + 'vh', duration: .30 }, 0)

    /* Phase 2 — everything gathers on the centre and stacks. */
      .to(frames, { x: 0, y: 0, duration: .30 }, .35)

    /* Phase 3 — the last frame opens to fill the screen.
       width/height rather than a transform: the frames have different aspect
       ratios from the viewport, so a non-uniform scale would stretch the
       photograph. This is one absolutely-positioned element, so the layout
       work is contained and does not reflow anything around it. */
      .to(hero, { width: '100vw', height: '100svh', duration: .20 }, .70)

    /* The three beneath fade as the hero passes over them — without this the
       stack's edges show through at the corners as it grows. */
      .to([topLeft, bottomRight, bottomLeft], { opacity: 0, duration: .10 }, .75);

    if (caption) tl.to(caption, { opacity: 1, duration: .08 }, .88);

    /* Hint the compositor only while the expansion is actually running.
       Leaving will-change on a full-viewport element permanently costs
       memory for the whole length of the page. */
    ScrollTrigger.create({
      trigger: '#choreo', start: 'top bottom', end: 'bottom top',
      onToggle: self => {
        hero.style.willChange = self.isActive ? 'width, height, transform' : 'auto';
      }
    });
  });
})();


/* ═══════════════════════════════════════════════════════════════════════════
   ENQUIRY FORM — one component, three placements

   The same form appears in the hero card, in the popup that every call to
   action opens, and in the enquiry section. Writing it once and mounting it
   three times is not just less code: it means validation, error handling and
   the success state cannot drift apart between them, which is exactly what
   happens when a form gets copied.

   Every instance gets its own field ids, so three copies can sit in one
   document without their labels pointing at each other's inputs.
   ═══════════════════════════════════════════════════════════════════════ */
const Enquiry = (() => {
  'use strict';
  let seq = 0;

  const RULES = {
    name:  { label:'Your name', msg:'Enter your name so we know who to expect.',
             test: v => v.trim().length >= 2 },
    phone: { label:'Phone', msg:'Enter a phone number of at least 10 digits.',
             test: v => v.replace(/\D/g,'').length >= 10 },
    email: { label:'Email', msg:'Enter an email address in the form name@example.com.',
             test: v => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()) }
  };

  function build(mount, opts){
    const o = Object.assign({ variant:'full', source:'', tone:'dark' }, opts);
    const id = 'e' + (++seq);
    const full = o.variant === 'full';

    const field = (key, type, label, extra='') => `
      <div class="field" data-field="${key}">
        <label for="${id}-${key}">${label}${RULES[key] ? ' <span aria-hidden="true" class="req">*</span>' : ''}</label>
        <input id="${id}-${key}" name="${key}" type="${type}"
               ${type==='tel' ? 'inputmode="tel" autocomplete="tel"' : ''}
               ${type==='email' ? 'inputmode="email" autocomplete="email"' : ''}
               ${key==='name' ? 'autocomplete="name"' : ''}
               ${RULES[key] ? 'required' : ''} aria-describedby="${id}-${key}-err" ${extra}>
        <p class="err" id="${id}-${key}-err">${RULES[key] ? RULES[key].msg : ''}</p>
      </div>`;

    mount.innerHTML = `
      <form class="enquiry" novalidate data-source="${o.source}">
        <div class="form-summary" id="${id}-summary" tabindex="-1" role="alert">
          <h3>Check these before sending</h3>
          <ul></ul>
        </div>

        <div aria-hidden="true" class="hp">
          <label for="${id}-company">Company</label>
          <input id="${id}-company" name="company" type="text" tabindex="-1" autocomplete="off">
        </div>

        <div class="fields ${full ? 'is-full' : 'is-compact'}">
          ${field('name','text','Your name')}
          ${field('phone','tel','Phone')}
          ${field('email','email','Email')}
          ${full ? `
          <div class="field">
            <label for="${id}-villa">Villa type</label>
            <select id="${id}-villa" name="villa">
              <option value="">No preference yet</option>
              ${DATA.villas.map(v => `<option value="${v.name}">${v.name} — ${v.area} sq ft</option>`).join('')}
            </select>
          </div>
          <div class="field">
            <label for="${id}-date">Preferred date</label>
            <input id="${id}-date" name="date" type="date">
          </div>
          <div class="field field-wide">
            <label for="${id}-note">Anything we should know</label>
            <textarea id="${id}-note" name="note" rows="3"></textarea>
          </div>` : ''}
        </div>

        <button type="submit" class="btn btn-dawn form-submit">Request a viewing</button>
        <p class="form-note">We use these details only to arrange your viewing.</p>

        <div class="form-done" hidden tabindex="-1">
          <h3>Request sent</h3>
          <p>We will confirm your viewing within one working day.</p>
        </div>
      </form>`;

    const form    = mount.querySelector('form');
    const summary = mount.querySelector('.form-summary');
    const openedAt = Date.now();
    const get = k => mount.querySelector('#' + id + '-' + k);

    function check(key, show=true){
      const el = get(key), ok = RULES[key].test(el.value);
      if (show){
        el.closest('.field').classList.toggle('is-invalid', !ok);
        el.setAttribute('aria-invalid', String(!ok));
      }
      return ok;
    }

    Object.keys(RULES).forEach(key => {
      const el = get(key);
      el.addEventListener('blur',  () => { if (el.value !== '') check(key); });
      /* Correct live once a field is already marked wrong, but never nag
         before the person has finished with it. */
      el.addEventListener('input', () => { if (el.getAttribute('aria-invalid') === 'true') check(key); });
    });

    form.addEventListener('submit', e => {
      e.preventDefault();
      const bad = Object.keys(RULES).filter(k => !check(k));

      if (bad.length){
        summary.querySelector('ul').innerHTML = bad.map(k =>
          `<li><a href="#${id}-${k}">${RULES[k].label} — ${RULES[k].msg}</a></li>`).join('');
        summary.classList.add('is-shown');
        summary.focus();
        summary.querySelectorAll('a').forEach(a => a.addEventListener('click', ev => {
          ev.preventDefault(); get(a.getAttribute('href').split('-').pop()).focus();
        }));
        return;
      }

      summary.classList.remove('is-shown');
      const btn = form.querySelector('.form-submit');
      const label = btn.textContent;
      btn.disabled = true; btn.textContent = 'Sending…';

      const done = () => {
        form.querySelectorAll('.fields, .form-submit, .form-note').forEach(n => n.hidden = true);
        const d = form.querySelector('.form-done');
        d.hidden = false; d.focus();
      };

      if (window.__PREVIEW__) { setTimeout(done, 700); return; }

      fetch('submit.php', {
        method:'POST', headers:{'Content-Type':'application/json'},
        body: JSON.stringify({
          name: get('name').value.trim(),
          phone: get('phone').value.trim(),
          email: get('email').value.trim(),
          villa: full ? get('villa').value : '',
          date:  full ? get('date').value  : '',
          note:  full ? get('note').value.trim() : '',
          source: o.source || (location.pathname + location.hash),
          company: get('company').value,
          elapsed: Date.now() - openedAt
        })
      })
      .then(async res => {
        const data = await res.json().catch(() => ({}));
        if (res.ok && data.ok) return done();
        if (data.fields) Object.entries(data.fields).forEach(([k, msg]) => {
          const el = get(k); if (!el) return;
          el.setAttribute('aria-invalid','true');
          el.closest('.field').classList.add('is-invalid');
          const err = el.closest('.field').querySelector('.err'); if (err) err.textContent = msg;
        });
        throw new Error(data.error || 'That did not send.');
      })
      .catch(err => {
        /* Never leave a dead button. Restore it and give the phone number as
           the way through. */
        btn.disabled = false; btn.textContent = label;
        summary.querySelector('ul').innerHTML =
          '<li>' + (err && err.message ? err.message : 'That did not send.') +
          ' You can also call <a href="tel:' + DATA.contact.phone.replace(/[^\d+]/g,'') +
          '">' + DATA.contact.phone + '</a>.</li>';
        summary.classList.add('is-shown');
        summary.focus();
      });
    });

    return { form, focusFirst: () => get('name').focus() };
  }

  return { build };
})();


/* ═══════════════════════════════════════════════════════════════════════════
   MOUNTING THE FORMS, AND THE POPUP
   ═══════════════════════════════════════════════════════════════════════ */
(() => {
  'use strict';
  const $  = (s, r=document) => r.querySelector(s);
  const $$ = (s, r=document) => Array.from(r.querySelectorAll(s));

  /* Every [data-enquiry-mount] gets its own instance. */
  const instances = new Map();
  $$('[data-enquiry-mount]').forEach(m => {
    instances.set(m, Enquiry.build(m, {
      variant: m.dataset.variant || 'full',
      source:  m.dataset.source  || ''
    }));
  });

  /* ── Popup ──────────────────────────────────────────────────────────── */
  const modal = $('#enquiry-modal');
  if (!modal) return;
  const panel = $('.modal-panel', modal);
  const inst  = instances.get($('[data-enquiry-mount]', modal));
  let lastFocus = null;

  const focusable = () => $$('a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])', panel)
    .filter(el => el.offsetParent !== null);

  /* Freezing the page behind the popup.

     Setting overflow:hidden on <html> looked like the obvious way and was
     wrong: Lenis owns the scroll and sets its own rules on that element, and
     forcing overflow on it left the document 1305px wider than the viewport
     — permanently, even after the popup closed. Lenis's own stop() holds the
     page without touching layout. The overflow fallback is only for when
     Lenis is not running at all (reduced motion), where it is applied to
     <body>, which no library is managing. */
  function lockScroll(on){
    if (window.lenisInstance){
      on ? window.lenisInstance.stop() : window.lenisInstance.start();
    } else {
      document.body.style.overflow = on ? 'hidden' : '';
    }
  }

  function open(source, ctx){
    lastFocus = document.activeElement;
    modal.hidden = false;
    lockScroll(true);

    /* Carry the button's context into the form, so an enquiry from a villa
       card or a plot arrives saying which one. */
    const form = inst && inst.form;
    if (form){
      form.dataset.source = source || 'Popup';
      if (ctx && ctx.villa){
        const sel = form.querySelector('select[name="villa"]');
        const opt = sel && Array.from(sel.options).find(o => o.value === ctx.villa);
        if (opt) sel.value = opt.value;
      }
      if (ctx && ctx.plot){
        const note = form.querySelector('textarea[name="note"]');
        const line = `Interested in plot ${ctx.plot}.`;
        if (note && !note.value.includes(line)) note.value = (note.value ? note.value.trim() + '\n' : '') + line;
      }
    }

    if (typeof gsap !== 'undefined' && !matchMedia('(prefers-reduced-motion: reduce)').matches){
      gsap.fromTo(modal, {opacity:0}, {opacity:1, duration:.25, ease:'power2.out'});
      gsap.fromTo(panel, {y:24, scale:.985}, {y:0, scale:1, duration:.45, ease:'expo.out'});
    }
    /* Focus the panel, not the first input: dropping straight into a text
       field skips the heading and a screen reader never hears what the
       dialog is for. */
    panel.setAttribute('tabindex','-1');
    panel.focus();
  }

  function close(){
    modal.hidden = true;
    lockScroll(false);
    if (lastFocus) lastFocus.focus();
  }

  /* Delegated, so CTAs rendered later (villa cards, plot panel) work too. */
  document.addEventListener('click', e => {
    const trigger = e.target.closest('[data-enquire]');
    if (trigger){
      e.preventDefault();
      open(trigger.dataset.enquire, {
        villa: trigger.dataset.villa,
        plot:  trigger.dataset.plotCta
      });
      return;
    }
    if (e.target.closest('[data-close]')) close();
  });

  document.addEventListener('keydown', e => {
    if (modal.hidden) return;
    if (e.key === 'Escape'){ close(); return; }
    if (e.key !== 'Tab') return;
    /* Keep Tab inside the dialog while it is open. */
    const items = focusable();
    if (!items.length) return;
    const first = items[0], last = items[items.length - 1];
    if (e.shiftKey && (document.activeElement === first || document.activeElement === panel)){
      e.preventDefault(); last.focus();
    } else if (!e.shiftKey && document.activeElement === last){
      e.preventDefault(); first.focus();
    }
  });
})();
