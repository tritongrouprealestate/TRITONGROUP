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

  /* The villa count appears in the hero facts, the land copy, the land stat
     and the masterplan, so it is stated once here and written into all of
     them. DATA.plots must hold the same number of entries — the masterplan
     draws a plot per entry, and a visitor can count them. */
  villaCount: 30,

  /* Heading above the site-plan inventory. The exact counts still appear in
     the rows beneath it, so this line can carry urgency without the panel
     losing the facts a buyer came for. */
  inventoryHeading: 'Only Few Villas Remaining!',

  /* The address shown to visitors. Where enquiries are DELIVERED is a
     separate setting — notify_email in config.php — so the public address can
     sit on the domain while the inbox behind it is wherever you read mail. */
  contact: {
    /* Shown on the page and used by the "call us" links in the enquiry
       section and footer. */
    phone: '+91 90366 82626',

    /* Confirmed as the same number as above. Set this to a different value
       only if a separate sales line is ever used for the call button. */
    callPhone: null,

    email: 'sales@tritongroup.in'
  },

  /* WhatsApp click-to-chat. The number is digits only with country code and
     no +, which is what wa.me expects; anything else silently opens WhatsApp
     with no conversation. The prefilled message arrives in the chat box so
     the person only has to press send, and tells you which page they came
     from. */
  whatsapp: {
    number: '919036682626',
    message: 'Hi, I would like to know more about Triton Humming Valley.'
  },

  /* Google Maps pin for the site. Written into every address on the page. */
  mapUrl: 'https://maps.app.goo.gl/qKgAu1p8eE1tc8KK6',

  /* Drive times from the gate, and where each place sits from it. `min` is
     what the label says; `deg` is a compass bearing, 0 being north, used
     only to place the point on the dial. The dial's outer ring is 60 min, so
     anything further away needs the ring scale below changed with it. */
  reach: [
    { name:'Nandi valley vineyards',   label:'15 min', min:15, deg:310 },
    { name:'Nandi Hills summit',       label:'20 min', min:20, deg:8   },
    { name:'Kempegowda International', label:'35 min', min:35, deg:214 },
    { name:'Hebbal, north Bengaluru',  label:'1 hr',   min:60, deg:176 }
  ],

  /* Read off the project's own floor-plan sheets. `land` is the plot, `area`
     the built-up figure printed beside it. `levels` is the layout in the
     order you climb it — enough for someone to picture the villa, not enough
     to hand a competitor the drawings. */
  villas: [
    { id:'3bhk', name:'3 BHK', area:'2,350&ndash;2,700', land:'1,000&ndash;1,115',
      price:'₹2.9 Cr', beds:3, baths:3, facing:'North and east facing',
      photo:'images/villa-3bhk.jpg',
      photoAlt:'A 3 BHK villa seen from the street, planting spilling from the upper balconies',
      blurb:'Three levels on a compact plot. The ground floor is one room &mdash; living, dining and kitchen running together to the garden &mdash; with a bedroom and a lounge above it, and the top floor given over to the primary suite and a terrace with the plunge pool.',
      levels:[
        {n:'Ground', rooms:['Living', 'Kitchen &amp; dining', 'Garden', 'Car porch']},
        {n:'First',  rooms:['Bedroom', 'Lounge', 'Balcony']},
        {n:'Second', rooms:['Primary suite', 'Lounge', 'Terrace &amp; pool']}
      ],
      features:['Lift to every floor','Private garden','15 ft indoor waterfall',
                'Roof terrace with plunge pool','Bar counter','Covered car porch'] },

    { id:'4bhk', name:'4 BHK', area:'3,474&ndash;3,724', land:'1,356&ndash;1,389',
      price:'₹3.5 Cr', beds:4, baths:4, facing:'North and east facing',
      photo:'images/villa-4bhk.jpg',
      photoAlt:'A 4 BHK villa standing against the wooded hillside, palms either side',
      blurb:'Two layouts, both four bedrooms over three floors. Living and kitchen-dining run the length of the ground floor to the garden; three bedrooms, their balconies and a walk-in closet sit above; the top floor keeps one bedroom and gives the rest of itself to the terrace, the bar and the pool. One of the two adds a home theatre.',
      levels:[
        {n:'Ground', rooms:['Living', 'Kitchen &amp; dining', 'Garden', 'Car porch']},
        {n:'First',  rooms:['Three bedrooms', 'Walk-in closet', 'Balconies']},
        {n:'Second', rooms:['Bedroom', 'Walk-in closet', 'Terrace &amp; pool']}
      ],
      features:['Lift to every floor','Walk-in closets','Private garden',
                '15 ft indoor waterfall','Open terrace with plunge pool',
                'Bar counter','Covered car porch'] },

    { id:'5bhk', name:'5 BHK', area:'4,448', land:'1,555',
      price:'₹4.5 Cr', beds:5, baths:5, facing:'North facing',
      photo:'images/villa-5bhk.jpg',
      photoAlt:'The pool below the 5 BHK villas, the valley opening beyond it',
      blurb:'The largest plan on the site, and the only one with a two-car porch. Five bedrooms over two upper floors, every one with its own balcony, and a top-floor terrace that runs the width of the villa around the pool and the bar.',
      levels:[
        {n:'Ground', rooms:['Living', 'Kitchen cum dining', 'Utility', 'Two-car porch']},
        {n:'First',  rooms:['Three bedrooms', 'Wardrobes', 'Balconies']},
        {n:'Second', rooms:['Two bedrooms', 'Terrace &amp; pool', 'Bar counter']}
      ],
      features:['Two-car porch','Lift to every floor','Private garden',
                '15 ft indoor waterfall','Utility and staff toilet',
                'Roof terrace with plunge pool','Bar counter'] }
  ],

  /* Real site layout, read from the project masterplan: three rows of ten,
     villas numbered 1-30, clubhouse at the south-west corner, approach road
     down the eastern edge. Areas are the figures printed on that plan.

     Statuses are the real ones: villas 8, 11, 20, 22 and 23 are unsold and
     everything else has gone. Nothing is on hold.

     Five villas are now confirmed against the client's own floor-plan
     sheets, and `land` is the plot figure printed on them:
       11  5 BHK   1,555 plot   4,448 built up   north facing
       21  4 BHK   1,356 plot   3,474 built up   north facing, home theatre
       17  3 BHK   1,080 plot   2,680 built up   north facing
       22  3 BHK   1,080 plot   2,680 built up   north facing
       23  3 BHK   1,080 plot   2,680 built up   north facing
     Villa 22 was carrying 3,680 sq ft and a 4 BHK label, both wrong.

       20  4 BHK   1,389 plot   3,724 built up   east facing
     which means every villa still for sale is confirmed from a sheet:
     8, 22 and 23 are 3 BHK, 20 is the 4 BHK, 11 is the 5 BHK.

     ⚠ The BHK on the twenty-five sold villas is still derived from built-up
     area. It costs nobody anything — none of them can be bought — but it is
     an inference, not a fact. */
  plots: [
    {n:'10',x:100,y:46,t:'5 BHK',sq:3724,s:'sold',a:'North row'},
    {n:'9',x:148,y:46,t:'4 BHK',sq:2725,s:'sold',a:'North row'},
    {n:'8',x:196,y:46,t:'3 BHK',sq:2660,s:'available',a:'North row'},
    {n:'7',x:244,y:46,t:'3 BHK',sq:2334,s:'sold',a:'North row'},
    {n:'6',x:292,y:46,t:'3 BHK',sq:2554,s:'sold',a:'North row'},
    {n:'5',x:340,y:46,t:'3 BHK',sq:2366,s:'sold',a:'North row'},
    {n:'4',x:388,y:46,t:'3 BHK',sq:2553,s:'sold',a:'North row'},
    {n:'3',x:436,y:46,t:'3 BHK',sq:2553,s:'sold',a:'North row'},
    {n:'2',x:484,y:46,t:'3 BHK',sq:2389,s:'sold',a:'North row'},
    {n:'1',x:532,y:46,t:'4 BHK',sq:3136,s:'sold',a:'North row'},
    {n:'11',x:100,y:176,t:'5 BHK',sq:4448,land:1555,s:'available',a:'Central row'},
    {n:'12',x:148,y:176,t:'5 BHK',sq:3780,s:'sold',a:'Central row'},
    {n:'13',x:196,y:176,t:'3 BHK',sq:2600,s:'sold',a:'Central row'},
    {n:'14',x:244,y:176,t:'3 BHK',sq:2600,s:'sold',a:'Central row'},
    {n:'15',x:292,y:176,t:'3 BHK',sq:2680,s:'sold',a:'Central row'},
    {n:'16',x:340,y:176,t:'3 BHK',sq:2680,s:'sold',a:'Central row'},
    {n:'17',x:388,y:176,t:'3 BHK',sq:2680,land:1080,s:'sold',a:'Central row'},
    {n:'18',x:436,y:176,t:'3 BHK',sq:2680,s:'sold',a:'Central row'},
    {n:'19',x:484,y:176,t:'3 BHK',sq:2680,s:'sold',a:'Central row'},
    {n:'20',x:532,y:176,t:'4 BHK',sq:3724,land:1389,s:'available',a:'Central row'},
    {n:'30',x:100,y:306,t:'3 BHK',sq:2680,s:'sold',a:'South row, clubhouse side'},
    {n:'29',x:148,y:306,t:'4 BHK',sq:3473,s:'sold',a:'South row, clubhouse side'},
    {n:'28',x:196,y:306,t:'3 BHK',sq:2673,s:'sold',a:'South row, clubhouse side'},
    {n:'27',x:244,y:306,t:'3 BHK',sq:2680,s:'sold',a:'South row, clubhouse side'},
    {n:'26',x:292,y:306,t:'3 BHK',sq:2680,s:'sold',a:'South row, clubhouse side'},
    {n:'25',x:340,y:306,t:'3 BHK',sq:2680,s:'sold',a:'South row, clubhouse side'},
    {n:'24',x:388,y:306,t:'3 BHK',sq:2680,s:'sold',a:'South row, clubhouse side'},
    {n:'23',x:436,y:306,t:'3 BHK',sq:2680,land:1080,s:'available',a:'South row, clubhouse side'},
    {n:'22',x:484,y:306,t:'3 BHK',sq:2680,land:1080,s:'available',a:'South row, clubhouse side'},
    {n:'21',x:532,y:306,t:'4 BHK',sq:3474,land:1356,s:'sold',a:'South row, clubhouse side'}
  ],

  /* The four frames of the scroll choreography in the Inside section. The
     last one is the hero: it is the frame that ends up filling the screen,
     so it should be the strongest photograph you have. */
  choreography: [
    {src:'images/choreo-1.jpg',
     alt:'The living room, the water wall and seated Buddha behind the seating'},
    {src:'images/choreo-2.jpg',
     alt:'The water court from the side, the hammock and the garden beyond the glass'},
    {src:'images/choreo-3.jpg',
     alt:'Lunch laid out on the street between two villa rows'},
    {src:'images/choreo-4.jpg',
     alt:'A family in the living room, the water wall and the garden behind them',
     caption:'The living room, gathered around the water court'}
  ],

  /* The three cards of the ownership model. `from` and `to` are the two
     ends of the panel that sits behind each card and glows through it —
     keep them inside the site's palette or the section stops matching the
     rest of the page. */
  ownership: [
    { n:'01', kicker:'Own',
      head:'Own the residence.',
      body:'A private residence in Humming Valley, created for a life closer to '
         + 'nature, hospitality and the hills.',
      cta:'Discover', from:'#DCE8E0', to:'#26463C' },
    { n:'02', kicker:'Forget the maintenance.',
      head:'We manage the rest.',
      body:'No day-to-day maintenance. No property management headaches. Your '
         + 'residence is managed through the hotel-managed residence program.',
      cta:'Discover', from:'#6FCBB0', to:'#12474A' },
    { n:'03', kicker:'Let it earn.',
      head:'Zero inventory tension.',
      body:'When you are away, your residence can be offered to guests. Revenue '
         + 'generated through the hotel-managed residence contributes to your '
         + 'defined owner share.',
      cta:'See how it works', from:'#8FD49B', to:'#1F5540' }
  ],

  /* The seven photographs in the coverflow above the masterplan. Point
     these at whatever you like — the carriage reads the list, so adding an
     eighth or dropping to five needs no other change. */
  coverflow: [
    {src:'images/cover-1.jpg', alt:'The pool at first light, the valley opening beyond it',
     title:'The pool, looking down the valley'},
    {src:'images/cover-2.jpg', alt:'The internal street between the two villa rows at sunset',
     title:'The street at sunset'},
    {src:'images/cover-3.jpg', alt:'The wooded slope seen from a bedroom window',
     title:'The hills from a bedroom'},
    {src:'images/cover-4.jpg', alt:'The living room, the water wall and seated Buddha behind the seating',
     title:'The living room and the water wall'},
    {src:'images/cover-5.jpg', alt:'The water court from the side, the garden beyond the glass',
     title:'The water court'},
    {src:'images/cover-6.jpg', alt:'A family in the living room, the garden behind them',
     title:'Living room, open to the garden'},
    {src:'images/cover-7.jpg', alt:'A villa standing against the wooded hillside',
     title:'A villa against the hillside'}
  ],

  /* The six captions the client wrote for this grid, in their order:
       1  Kitchen opening into the living space          ← photo needed
       2  Lounge overlooking the internal courtyard      ← photo needed
       3  Interior passage                               ← photo needed
       4  Infinity Pool facing the valley                ← in place below
       5  Private Jacuzzi                                ← photo needed
       6  Family room with panoramic mountain view       ← in place below
     Four of them describe rooms we have no photograph of, so those tiles
     keep a picture we do have and a caption that matches it. Drop the four
     photographs into images/ and the captions above go straight in.

     The frame keeps its shape and caption whether or not an image loads. */
  gallery: [
    {src:'images/gallery-1.jpg', cap:'The internal street between the two villa rows'},
    {src:'images/gallery-2.jpg', cap:'Infinity Pool facing the valley'},
    {src:'images/gallery-3.jpg', cap:'Family room with panoramic mountain view'},
    {src:'images/gallery-4.jpg', cap:'On site: the first row, structure complete'},
    {src:'images/gallery-5.jpg', cap:'On site: the rows from the approach road'},
    {src:'images/gallery-6.jpg', cap:'On site: looking back up the street under construction'}
  ]
};

/* ── Images ───────────────────────────────────────────────────────────────
   Every photograph is fetched through a probe rather than set straight onto
   the element, so a missing file leaves the drawn design in place instead of
   a broken-image glyph.

   The probe has to be held back until the picture is near the viewport.
   `loading="lazy"` on the <img> does nothing here: the probe is a detached
   Image, and the browser has no idea it belongs to something off screen. The
   first build fetched all twenty-two photographs on load — six megabytes
   before a visitor had scrolled anywhere. `near` is the whole fix. */
const NEAR = '600px 0px';        // start fetching this far ahead of the fold

const near = (el, run) => {
  if (!('IntersectionObserver' in window)) { run(); return; }
  const io = new IntersectionObserver(entries => {
    if (!entries.some(e => e.isIntersecting)) return;
    io.disconnect();
    run();
  }, { rootMargin: NEAR });
  io.observe(el);
};

function loadImage(el, src, done){
  const probe = new Image();
  probe.decoding = 'async';
  probe.onload = () => { el.src = src; el.classList.add('is-loaded'); done && done(true); };
  probe.onerror = () => { el.dataset.failed = 'true'; done && done(false); };
  probe.src = src;
}

/* Watches the element the picture will appear in, not the picture itself:
   an <img> with no src can be zero-sized, which no observer ever reports. */
function loadWhenNear(el, src, done, box){
  near(box || el.parentElement || el, () => loadImage(el, src, done));
}

(() => {
'use strict';
const $  = (s, r=document) => r.querySelector(s);
const $$ = (s, r=document) => Array.from(r.querySelectorAll(s));

/* ── Cache buster ──────────────────────────────────────────────────────────
   Photographs are replaced by overwriting the file under the same name, so a
   browser that has already been here shows the picture it kept rather than
   the one now on the server. Every image URL carries ?v=BUILD; raising this
   number by one is what makes a swap appear immediately, for everybody.

   AFTER YOU REPLACE ANYTHING IN images/, BUMP THIS NUMBER — and the two
   ?v=2 in index.html's <head> with it, or the hero is fetched twice.     */
const BUILD = '2';

const bust = p => /^images\//.test(p) ? p + '?v=' + BUILD : p;
$$('[data-src]').forEach(el => { el.dataset.src = bust(el.dataset.src); });
if (typeof DATA !== 'undefined') {
  (DATA.villas       || []).forEach(v => { v.photo = bust(v.photo); });
  (DATA.choreography || []).forEach(f => { f.src   = bust(f.src);   });
  (DATA.gallery      || []).forEach(g => { g.src   = bust(g.src);   });
}

document.body.classList.remove('no-js');
$('#year').textContent = new Date().getFullYear();

const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
const hasGSAP = typeof window.gsap !== 'undefined';
if (hasGSAP && window.ScrollTrigger) gsap.registerPlugin(ScrollTrigger);

/* The hero is the one exception. It is the first thing on the screen and it
   is what the page is judged on, so it is fetched at once and preloaded from
   the document head. */
const heroImg = $('.hero-photo');
if (heroImg && heroImg.dataset.src) loadImage(heroImg, heroImg.dataset.src);

/* ── Footer RERA line: never invents a number ──────────────────────────── */
$('#rera-line').textContent = DATA.rera
  ? 'RERA registration ' + DATA.rera
  : 'RERA registration — not yet configured.';
if (!DATA.rera) $('#faq-rera').textContent =
  'Registration details are confirmed at the point of enquiry. Ask our sales team for the certificate.';

/* Call links open the dialer on a phone and the default calling app on a
   desktop. The href keeps only digits and a leading +, because spaces in a
   tel: URI are unreliable across handsets. */
$$('[data-call]').forEach(a => {
  const num = DATA.contact.callPhone || DATA.contact.phone;
  a.href = 'tel:' + num.replace(/[^\d+]/g, '');
  const label = a.querySelector('[data-call-label]');
  if (label) label.textContent = num;
});

/* WhatsApp links. wa.me hands off to the app on a phone and to WhatsApp Web
   on a desktop, so one link covers both without sniffing the device. */
$$('[data-whatsapp]').forEach(a => {
  a.href = 'https://wa.me/' + DATA.whatsapp.number
         + '?text=' + encodeURIComponent(DATA.whatsapp.message);
  a.target = '_blank';
  a.rel = 'noopener noreferrer';
});

/* Addresses become links to the map pin. Opened in a new tab so a visitor
   part-way through the enquiry form does not lose what they have typed. */
$$('[data-map]').forEach(a => {
  a.href = DATA.mapUrl;
  a.target = '_blank';
  a.rel = 'noopener noreferrer';
});

/* The villa count is written wherever the page states it, from the one value. */
$$('[data-villa-count]').forEach(el => { el.textContent = DATA.villaCount; });
if (DATA.plots.length !== DATA.villaCount)
  console.warn('site.js: villaCount is ' + DATA.villaCount + ' but the site plan '
    + 'has ' + DATA.plots.length + ' plots. A visitor can count them — keep these in step.');

/* Possession fills in wherever the page states it. If it is unset the rows
   are removed rather than left showing an empty value. */
$$('[data-possession]').forEach(el => {
  if (DATA.possession) el.textContent = DATA.possession;
  else el.closest('[data-possession-row]')?.remove();
});

/* ── Contact details flow from DATA ──────────────────────────────────────
   Setting textContent on the whole anchor wipes out anything inside it. The
   dock's call button is an icon and the menu's is an icon plus a label, and
   both lost their <svg> the moment this ran. The rule now: the href is
   always rewritten, and the number is written into a <span> if there is
   one, or into the anchor only when the anchor is nothing but text. */
function setContact(a, value, href) {
  a.href = href;
  const slot = a.querySelector('span:not(.sr-only)');
  if (slot) slot.textContent = value;
  else if (!a.firstElementChild) a.textContent = value;
}
$$('a[data-field="phone"]').forEach(a =>
  setContact(a, DATA.contact.phone, 'tel:' + DATA.contact.phone.replace(/[^\d+]/g,'')));
$$('a[data-field="email"]').forEach(a =>
  setContact(a, DATA.contact.email, 'mailto:' + DATA.contact.email));

/* ═══ VILLAS ═══════════════════════════════════════════════════════════ */
const bedIcon = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" class="h-4 w-4" aria-hidden="true"><path d="M2 17v-5h20v5M2 17v3M22 17v3M4 12V8a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v4M8 12V9h8v3"/></svg>';
const bathIcon = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" class="h-4 w-4" aria-hidden="true"><path d="M3 12h18v3a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4v-3ZM6 12V6a2 2 0 0 1 4 0M6 19l-1 2M18 19l1 2"/></svg>';

$('#villa-list').innerHTML = DATA.villas.map(v => `
  <details class="villa" id="villa-${v.id}">
    <summary class="villa-summary">
      <!-- The photograph belongs in the closed state. It used to live inside
           the panel, so a shut card was a white rectangle with type in it,
           which on a phone is the whole section. -->
      <span class="villa-thumb villa-shot">
        <img alt="" data-src="${v.photo}" loading="lazy" decoding="async"
             width="400" height="400" class="opacity-0 transition-opacity duration-700">
      </span>
      <span class="villa-id">
        <h3 class="font-display" style="font-size:var(--step-2)">${v.name}</h3>
        <span class="villa-specs">
          <span>${bedIcon}${v.beds}</span>
          <span>${bathIcon}${v.baths}</span>
          <span>${v.area} sq ft</span>
          <span class="villa-plot">${v.land} sq ft plot</span>
        </span>
      </span>
      <span class="villa-price">
        <span class="font-display" style="font-size:var(--step-1)">${v.price}</span>
        <small class="incl">All inclusive</small>
      </span>
      <svg class="chev" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg>
    </summary>
    <div class="villa-body grid gap-10 border-t border-ink/12 p-6 sm:p-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
      <div>
        <p class="text-mist">${v.blurb}</p>
        <ul class="mt-6 grid gap-2.5 sm:grid-cols-2">
          ${v.features.map(f => `<li class="flex items-start gap-2.5 text-[.94rem]">
            <svg viewBox="0 0 24 24" fill="none" stroke="#0B3B33" stroke-width="2" class="mt-1 h-3.5 w-3.5 shrink-0" aria-hidden="true"><path d="M20 6 9 17l-5-5"/></svg>
            <span>${f}</span></li>`).join('')}
        </ul>
        <button type="button" class="btn btn-ink mt-8" data-enquire="Villa ${v.name}" data-villa="${v.name}">Enquire about the ${v.name}</button>
      </div>
      <div class="grid gap-5">
        <div class="villa-shot relative aspect-square overflow-hidden bg-cloud-2">
          <img alt="${v.photoAlt}" data-src="${v.photo}" loading="lazy"
               decoding="async" width="1200" height="1600" class="h-full w-full object-cover opacity-0
               transition-opacity duration-700">
        </div>
      <!-- The layout as a stack, not as a plan. Three levels, the rooms
           named in the order you climb them, drawn rather than photographed
           so it is always present and legible on either ground. It says what
           is on each floor without handing over the drawings. -->
      <div class="levels" role="group" aria-label="How the ${v.name} is arranged over three levels">
        ${v.levels.map((l, i) => `
          <div class="level">
            <p class="level-name">${l.n}</p>
            <div class="level-plan" aria-hidden="true">
              ${l.rooms.map(() => '<i></i>').join('')}
            </div>
            <p class="level-rooms">${l.rooms.join(' &middot; ')}</p>
          </div>`).join('')}
        <p class="levels-note">${v.facing} &middot; ${v.land} sq ft plot &middot;
           ${v.area} sq ft built up</p>
      </div>
      </div>
    </div>
  </details>`).join('');

/* Villa and band photographs use the same rule as the gallery: they fade in
   once decoded, and a failure leaves the drawn artwork rather than a hole. */
$$('.villa-shot img, .band-photo').forEach(img => {
  const wrap = img.closest('.villa-shot') || img.parentElement;
  loadWhenNear(img, img.dataset.src, ok => {
    if (ok) { img.style.opacity = img.classList.contains('band-photo') ? '.55' : '1'; return; }
    const w = img.closest('.villa-shot');
    if (w) w.style.background = 'linear-gradient(150deg,#E4EAE4,#C7D6CC)';
    if (w) w.classList.add('is-blank');
    img.remove();
  }, wrap);
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
const PW = 44, PH = 76;   // matches the real plot proportions
const group = $('#plots');
const label = p => `Villa ${p.n}, ${p.t}, ${p.sq.toLocaleString('en-IN')} square feet, ${p.a}, ${p.s === 'held' ? 'on hold' : p.s}`;

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
  t.setAttribute('font-size','11'); t.setAttribute('font-family','Jost, sans-serif');
  t.setAttribute('font-weight','600');
  t.setAttribute('fill', p.s === 'sold' ? '#7E9188' : p.s === 'held' ? '#0B3B33' : '#16564A');
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
    <h4 class="font-display" style="font-size:var(--step-2)">${DATA.inventoryHeading}</h4>
    <p class="mt-3 text-mist">Select a villa for its type, built-up area,
      aspect and price.</p>
    <dl class="mt-7 divide-y divide-ink/12 border-y border-ink/12 text-[.95rem]">
      ${DATA.villas.map(v => `
        <div class="flex justify-between gap-4 py-3">
          <dt class="text-mist">${v.name} &middot; ${v.area} sq ft built up</dt>
          <dd>${byType(v.name)} available</dd>
        </div>`).join('')}
      ${count('held') ? `
      <div class="flex justify-between gap-4 py-3">
        <dt class="text-mist">On hold</dt><dd>${count('held')}</dd>
      </div>` : ''}
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
      <h4 class="font-display" style="font-size:var(--step-2)">Villa ${p.n}</h4>
      <span class="text-[.8rem] font-medium px-2.5 py-1 border"
            style="${p.s === 'available'
              ? 'color:#16564A;border-color:#16564A;background:rgba(22,86,74,.08)'
              : 'color:#0B3B33;border-color:#0B3B33;background:rgba(11,59,51,.08)'}">
        ${p.s === 'held' ? 'On hold' : 'Available'}
      </span>
    </div>
    <dl class="mt-6 divide-y divide-ink/12 border-y border-ink/12 text-[.95rem]">
      <div class="flex justify-between gap-4 py-3"><dt class="text-mist">Villa type</dt><dd>${p.t}</dd></div>
      <div class="flex justify-between gap-4 py-3"><dt class="text-mist">Built-up</dt><dd>${p.sq ? p.sq.toLocaleString('en-IN') + ' sq ft' : '—'}</dd></div>
      ${p.land ? `<div class="flex justify-between gap-4 py-3"><dt class="text-mist">Plot</dt><dd>${p.land.toLocaleString('en-IN')} sq ft</dd></div>` : ''}
      <div class="flex justify-between gap-4 py-3"><dt class="text-mist">Aspect</dt><dd>${p.a}</dd></div>
      <div class="flex justify-between gap-4 py-3"><dt class="text-mist">Price <span class="whitespace-nowrap">(all inclusive)</span></dt><dd class="text-dawn-deep font-medium">${villa ? villa.price : '—'}</dd></div>
    </dl>
    <button type="button" class="btn btn-ink mt-7 w-full" data-enquire="Villa ${p.n}" data-plot-cta="${p.n}">Enquire about villa ${p.n}</button>`;

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

/* ── The same villas, for a phone ─────────────────────────────────────────
   Real <button> elements, so no keydown handling is needed here — Enter and
   Space come free, which is the whole reason the map needed its own and
   this does not. Only one of the two is in the layout at a time, so there
   is never a second set of tab stops. */
const chips = $('#plot-chips');
if (chips) {
  const rows = [];
  DATA.plots.forEach(p => {
    const row = rows.find(r => r.name === p.a) || (rows.push({name:p.a, list:[]}), rows[rows.length-1]);
    row.list.push(p);
  });

  chips.innerHTML = rows.map(r => `
    <div class="chip-row">
      <p class="chip-row-name">${r.name}</p>
      <div class="chip-grid">
        ${r.list.map(p => `
          <button type="button" class="plot-chip" data-chip="${p.n}"
                  data-status="${p.s}" aria-pressed="false"
                  ${p.s === 'sold' ? 'aria-disabled="true" tabindex="-1"' : ''}
                  aria-label="${label(p)}">
            ${p.n}${p.s === 'sold' ? '' : `<small>${p.t.replace(' BHK','')} BHK</small>`}
          </button>`).join('')}
      </div>
    </div>`).join('') + `
    <p class="chip-key">
      <span><i class="k-open"></i>Available</span>
      <span><i class="k-sold"></i>Sold</span>
    </p>`;

  $$('#plot-chips [data-chip]').forEach(node => {
    const p = DATA.plots.find(x => x.n === node.dataset.chip);
    node.addEventListener('click', () => selectPlot(p, node));
  });
}

/* ═══ THE REACH DIAL ═══════════════════════════════════════════════════
   Four drive times, drawn as distance from the gate. Rings every fifteen
   minutes, each place on its own bearing, so the vineyards sitting inside
   the airport is a thing you see rather than a pair of numbers you compare.

   The list beside it carries the same four facts as text. That is what a
   screen reader reads and what anyone gets if this never draws — the
   diagram is aria-hidden, and nothing is only in the picture. */
const reach = $('[data-reach]');
if (reach && DATA.reach) {
  const NSVG = 'http://www.w3.org/2000/svg';
  const C = 210, R = 186, MAX = 60;          // centre, outer radius, minutes at it
  const rings = $('.reach-rings', reach);
  const ticks = $('.reach-ticks', reach);
  const spokes = $('.reach-spokes', reach);
  const dots  = $('.reach-dots', reach);

  const at = (deg, r) => {
    const a = (deg - 90) * Math.PI / 180;    // 0deg is north, not east
    return [C + Math.cos(a) * r, C + Math.sin(a) * r];
  };
  const el = (n, attrs) => {
    const e = document.createElementNS(NSVG, n);
    for (const k in attrs) e.setAttribute(k, attrs[k]);
    return e;
  };

  /* Rings at 15, 30, 45 and 60 minutes, the outer one solid so the edge of
     the hour reads as an edge. */
  [15, 30, 45, 60].forEach(m => {
    const r = R * m / MAX;
    rings.appendChild(el('circle', {
      cx:C, cy:C, r, 'stroke-opacity': m === MAX ? .35 : .16,
      'stroke-dasharray': m === MAX ? 'none' : '2 6'
    }));
    const [tx, ty] = at(45, r);
    const t = el('text', {x:tx + 6, y:ty - 4, 'font-size':10,
      'font-family':'Jost, sans-serif', fill:'currentColor', 'fill-opacity':.45});
    t.textContent = m === MAX ? '60 min' : m;
    ticks.appendChild(t);
  });

  DATA.reach.forEach((d, i) => {
    const r = R * Math.min(d.min, MAX) / MAX;
    const [x, y] = at(d.deg, r);
    const line = el('line', {x1:C, y1:C, x2:x, y2:y, 'stroke-opacity':.3,
                            'data-reach-spoke':i});
    spokes.appendChild(line);

    const g = el('g', {'data-reach-dot':i});
    g.appendChild(el('circle', {cx:x, cy:y, r:14, fill:'transparent'}));
    g.appendChild(el('circle', {cx:x, cy:y, r:5.5, class:'reach-dot'}));
    dots.appendChild(g);
  });

  /* Each stroke gets its own length, so every ring and spoke draws at the
     same speed rather than the long ones lagging. */
  $$('.reach-rings circle', reach).forEach(c =>
    c.style.setProperty('--len', 2 * Math.PI * (+c.getAttribute('r'))));
  $$('.reach-spokes line', reach).forEach(l =>
    l.style.setProperty('--len',
      Math.hypot(+l.getAttribute('x2') - C, +l.getAttribute('y2') - C)));

  /* Drawn when it is actually on screen, not 600px ahead of it — this one is
     an animation to watch, not an image to have ready. */
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(es => {
      if (!es.some(e => e.isIntersecting)) return;
      io.disconnect();
      reach.classList.add('is-drawn');
    }, { threshold: .35 });
    io.observe(reach);
  } else {
    reach.classList.add('is-drawn');
  }

  $('.reach-list', reach).innerHTML = DATA.reach.map((d, i) => `
    <div class="reach-row" data-reach-row="${i}" tabindex="0">
      <dt>${d.name}</dt>
      <dd>${d.label}</dd>
    </div>`).join('');

  /* Pointing at either half lights the other. The row is the focusable one:
     the dot is decoration, inside an aria-hidden drawing. */
  const rows = $$('[data-reach-row]', reach);
  const mark = (i, on) => {
    const row = reach.querySelector(`[data-reach-row="${i}"]`);
    const dot = reach.querySelector(`[data-reach-dot="${i}"]`);
    const spoke = reach.querySelector(`[data-reach-spoke="${i}"]`);
    if (row) row.classList.toggle('is-lit', on);
    if (dot) dot.classList.toggle('is-lit', on);
    if (spoke) spoke.classList.toggle('is-lit', on);
  };
  rows.forEach((row, i) => {
    ['mouseenter','focus'].forEach(ev => row.addEventListener(ev, () => mark(i, true)));
    ['mouseleave','blur'].forEach(ev => row.addEventListener(ev, () => mark(i, false)));
  });
  $$('[data-reach-dot]', reach).forEach((g, i) => {
    g.addEventListener('mouseenter', () => mark(i, true));
    g.addEventListener('mouseleave', () => mark(i, false));
  });
}

/* ═══ OWNERSHIP MODEL ══════════════════════════════════════════════════
   Markup only. The skew, the glow and the panel that opens are all CSS, so
   the cards work with script disabled and cost nothing per frame. The two
   gradient ends are the only per-card values that reach the stylesheet. */
const own = $('#ownership-cards');
if (own && DATA.ownership) own.innerHTML = DATA.ownership.map(c => `
  <article class="skew-card" style="--from:${c.from};--to:${c.to}">
    <span class="skew-panel" aria-hidden="true"></span>
    <span class="skew-panel skew-panel-glow" aria-hidden="true"></span>
    <span class="skew-blob skew-blob-a" aria-hidden="true"></span>
    <span class="skew-blob skew-blob-b" aria-hidden="true"></span>
    <div class="skew-body">
      <p class="skew-kicker">${c.n} &mdash; ${c.kicker}</p>
      <h3 class="skew-head">${c.head}</h3>
      <p class="skew-copy">${c.body}</p>
      <button type="button" class="skew-cta" data-enquire="Ownership model &mdash; ${c.kicker}">
        ${c.cta}<span aria-hidden="true">&rarr;</span>
      </button>
    </div>
  </article>`).join('');

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
  const frame = img.closest('.frame');
  loadWhenNear(img, img.dataset.src, ok => {
    if (ok) return;
    /* Photo missing: the frame becomes a drawn panel rather than a hole.
       The frame is captured before the image is detached — closest() on a
       removed node returns null. */
    img.remove();
    if (!frame) return;
    const f = document.createElement('div');
    f.className = 'absolute inset-0';
    f.style.background = 'linear-gradient(160deg,#16564A,#0F3F37 60%,#092A22)';
    f.setAttribute('aria-hidden','true');
    frame.prepend(f);
  }, frame);
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

  /* ── The dock rises once the hero's own call to action has gone by ────
        Showing it over the hero would be two of the same button on one
        screen; showing it never would leave a phone with no way to ask for
        a viewing between the hero and the footer, which is nine sections. */
  const dock = $('.dock');
  if (dock) {
    ScrollTrigger.create({
      trigger: '#hero', start: 'bottom 85%', end: 'max',
      onToggle: self => dock.classList.toggle('is-up', self.isActive)
    });
    /* The choreography is a full-screen composition pinned to the viewport.
       A bar across the bottom of it covers the lower half of the frames, so
       the dock stands down for the length of that section and comes back
       after. */
    ScrollTrigger.create({
      trigger: '#choreo', start: 'top top', end: 'bottom bottom',
      onToggle: self => dock.classList.toggle('is-hidden', self.isActive)
    });
  }
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

    /* The light belongs to the dark sections, not to the pointer: each one
       carries it as a background layer that brightens where the pointer is.
       The section marks itself lit, so the fade in and out is CSS. */
    $$('#approach, #inside, #viewing, #site-footer')
      .forEach(g => g.classList.add('glow-ground'));

    let shown = false, litGround = null;
    window.addEventListener('pointermove', e => {
      if (e.pointerType !== 'mouse') return;
      dx(e.clientX); dy(e.clientY); rx(e.clientX); ry(e.clientY);
      if (!shown) { shown = true; gsap.to([dot, ring], {opacity:1, duration:.35}); }

      const g = e.target.closest ? e.target.closest('.glow-ground') : null;
      if (g !== litGround) {
        if (litGround) litGround.classList.remove('is-lit');
        litGround = g;
        if (g) g.classList.add('is-lit');
      }
      if (g) {
        const r = g.getBoundingClientRect();
        g.style.setProperty('--gx', (e.clientX - r.left) + 'px');
        g.style.setProperty('--gy', (e.clientY - r.top)  + 'px');
      }
    }, {passive:true});

    /* Leaving the window must hide it, or the ring is left stranded at the
       edge of the screen when the pointer is somewhere else entirely. */
    document.addEventListener('mouseleave', () => {
      shown = false;
      if (litGround) { litGround.classList.remove('is-lit'); litGround = null; }
      gsap.to([dot, ring], {opacity:0, duration:.25});
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

    /* data-lines pins the break points. Measured splitting is right for most
       headings — it re-flows with the width — but a two-part line like
       "More Space / More Life" only works broken in one place, and at some
       widths measurement would put the break in the wrong one. */
    if (el.dataset.lines){
      el.innerHTML = el.dataset.lines.split('|')
        .map(l => `<span class="line-mask"><span class="line-inner">${l.trim()}</span></span>`)
        .join('');
      return $$('.line-inner', el);
    }

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
     Every figure in the land summary counts up from zero as it arrives.

     Rather than match particular shapes, this splits the value into numbers
     and everything between them, and animates each number in place. So it
     handles a plain count, a percentage, a range like "2,400–3,800" and a
     list like "3 4 & 5" without knowing anything about them, and a future
     value in some other shape will work too.

     Two things it is careful about. The unit sits in its own element inside
     the cell ("sq ft", "BHK Villas"), so only the leading text node is
     rewritten — replacing the cell's text would delete the unit. And a value
     with no digits in it, like the possession date, is left alone rather
     than counted to nonsense. */
  const fmt = n => Math.round(n).toLocaleString('en-IN');

  $$('#land dd').forEach(dd => {
    const node = dd.firstChild;
    if (!node || node.nodeType !== Node.TEXT_NODE) return;

    /* A date is not a quantity. Counting it produced "October 2,026" — the
       year read as a number, complete with a thousands separator. And
       "3,4 & 5" is a list of villa types, not a number to count to: it read
       "1,1 & 2", then "2,2 & 3", then "3,3 & 4" on the way, which looks
       like a page still loading rather than a figure arriving. */
    if (dd.hasAttribute('data-possession') || dd.hasAttribute('data-no-count')) return;

    /* The capturing group keeps the separators, so they can be put back
       around the animated numbers exactly as they were written. */
    /* A comma is a thousands separator only when three digits follow it.
       Splitting on \d[\d,]* instead read "3,4 & 5" as the single number 34
       and counted to it, so the configurations cell animated to "34 & 5". */
    const NUM = /(\d{1,3}(?:,\d{3})+|\d+)/;
    const parts = node.nodeValue.trim().split(NUM);
    const slots = parts.reduce((acc, t, i) =>
      new RegExp('^' + NUM.source.slice(1, -1) + '$').test(t) ? acc.concat(i) : acc, []);
    if (!slots.length) return;

    const from = {}, to = {}, grouped = {};
    slots.forEach((i, k) => {
      from['n' + k] = 0;
      to['n' + k] = parseInt(parts[i].replace(/,/g, ''), 10);
      /* Only group a number that was written grouped. Adding separators to a
         value that never had them turns a year into a quantity. */
      grouped[k] = parts[i].includes(',');
    });

    gsap.to(from, Object.assign({}, to, {
      duration: 1.6, ease: 'power2.out',
      scrollTrigger: { trigger: dd, start: 'top 92%', once: true },
      onUpdate: () => {
        const out = parts.slice();
        slots.forEach((i, k) => {
          out[i] = grouped[k] ? fmt(from['n' + k]) : String(Math.round(from['n' + k]));
        });
        node.nodeValue = out.join('');
      }
    }));
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
           width="1500" height="1000"
           ${i === DATA.choreography.length - 1 ? '' : 'loading="lazy"'}>
    </figure>`).join('');

  const frames = Array.from(inner.querySelectorAll('.choreo-frame'));
  const imgs   = frames.map(f => f.querySelector('img'));

  /* Same loading rule as everywhere else on the page: show the picture once
     it has decoded, and leave the frame's own colour if it never arrives. */
  imgs.forEach(img => {
    const frame = img.closest('.choreo-frame');
    loadWhenNear(img, img.dataset.src, ok => { if (!ok) img.remove(); }, frame);
  });

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  const hasGSAP = typeof window.gsap !== 'undefined' && typeof window.ScrollTrigger !== 'undefined';
  if (reduced.matches || !hasGSAP) return;   // CSS has already made it a grid

  const caption = $('.choreo-caption');
  if (caption && DATA.choreography[3] && DATA.choreography[3].caption) {
    caption.textContent = DATA.choreography[3].caption;
  }

  /* The spread has to match the frame, and the frame differs by screen.
     The first mobile version kept the desktop spread against a much smaller
     frame: the four sat in a narrow band with a third of the screen empty
     above and below, and the sequence read as four stamps adrift rather
     than as a composition gathering.

     Landscape: a 42vw frame is 21vw either side of its centre, so 23vw of
     spread leaves a 4vw channel between the columns and 6vw of air outside.
     Portrait: 44vw x 32vh frames at 23vw and 17vh fill 90vw and 66vh —
     the same two-by-two, proportioned for a screen that is taller than it
     is wide. */
  const mm = gsap.matchMedia();
  mm.add({
    isDesktop: '(min-width: 768px) and (prefers-reduced-motion: no-preference)',
    isMobile:  '(max-width: 767.98px) and (prefers-reduced-motion: no-preference)'
  }, ctx => {
    const { isDesktop } = ctx.conditions;
    /* The two gaps are set to match in pixels, not in units: 1vw and 1vh are
       different distances on a portrait screen, and a grid whose columns sit
       closer than its rows looks like a mistake rather than a grid. */
    const X = isDesktop ? 23 : 24;     // vw from centre
    const Y = isDesktop ? 15 : 16.9;   // vh from centre

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

    /* At rest the four are laid down like prints on a table rather than set
       in a grid: a degree or two of rotation each, and the three that are
       not the hero held a little back in light. Both resolve as they gather,
       so the squaring-up is what the scroll is doing. */
    const TILT = [-1.7, 1.3, 1.9, -1.1];
    frames.forEach((f, i) => gsap.set(f, { rotation: TILT[i] }));
    gsap.set([topLeft, bottomRight, bottomLeft], { opacity: .82 });

    /* Each photograph starts larger than its frame so it has somewhere to
       travel. The frame moves one way, the picture inside it the other. */
    const halo = $('.choreo-halo');
    gsap.set(imgs, { scale: 1.16, yPercent: -2.5 });

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

    /* The photographs settle into their frames across the whole approach,
       slower than anything else on screen. */
      .to(imgs, { scale: 1, yPercent: 0, duration: .70, ease: 'power1.out' }, 0)

    /* Phase 2 — everything gathers on the centre and stacks, straightening
       as it comes. */
      .to(frames, { x: 0, y: 0, duration: .30 }, .35)
      .to(frames, { rotation: 0, duration: .34, ease: 'power2.out' }, .33)
      .to([topLeft, bottomRight, bottomLeft], { opacity: 1, duration: .25 }, .35)
      .to(halo, { opacity: 1, scale: 1.12, duration: .40, ease: 'power1.out' }, .30)

    /* Phase 3 — the last frame opens to fill the screen.
       width/height rather than a transform: the frames have different aspect
       ratios from the viewport, so a non-uniform scale would stretch the
       photograph. This is one absolutely-positioned element, so the layout
       work is contained and does not reflow anything around it. */
      .to(hero, { width: '100vw', height: '100svh', duration: .20 }, .70)

    /* The three beneath fade as the hero passes over them — without this the
       stack's edges show through at the corners as it grows. */
      .to([topLeft, bottomRight, bottomLeft], { opacity: 0, duration: .10 }, .75)
      .to(halo, { opacity: 0, duration: .12 }, .72);

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
      <div class="field" data-fieldname="${key}">
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
          <fieldset class="field field-wide choice" data-fieldname="villa">
            <legend>Villa type <span class="choice-hint">&mdash; choose any that interest you</span></legend>
            <div class="choice-set">
              ${DATA.villas.map((v, n) => `
                <label class="choice-chip">
                  <input type="checkbox" name="villa" value="${v.name}" id="${id}-villa-${n}">
                  <span>${v.name}<small>${v.area} sq ft</small></span>
                </label>`).join('')}
            </div>
          </fieldset>
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
          villa: full ? Array.from(form.querySelectorAll('input[name="villa"]:checked'))
                             .map(c => c.value).join(', ') : '',
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
        const box = form.querySelector(`input[name="villa"][value="${ctx.villa}"]`);
        if (box) box.checked = true;
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


/* ═══════════════════════════════════════════════════════════════════════════
   COVERFLOW  (The views)

   Ported from a React component. The mechanism is unchanged and worth
   stating, because it is the reason this is cheap to run:

   · One fractional index, `pos`, is the entire state. Every card's place is
     derived from its distance to it, so there is nothing to keep in sync.
   · The loop is arithmetic. A card's offset is folded into the shorter way
     round the ring, so the strip repeats without a single cloned node or
     any reordering of the DOM.
   · Nothing is written to layout. Position, recession and tilt are one
     transform per card, so a drag costs compositing and no reflow.

   Three things changed in the port, all forced by the surroundings:
   React's per-frame state became direct style writes (there was never any
   state React needed to see); the settle honours prefers-reduced-motion by
   arriving at once; and the frame keeps touch-action:pan-y so a drag on a
   phone still leaves the page its vertical scroll.
   ═══════════════════════════════════════════════════════════════════════ */
(() => {
'use strict';
const mount = document.querySelector('[data-coverflow]');
if (!mount || typeof DATA === 'undefined' || !DATA.coverflow) return;

const slides = DATA.coverflow, count = slides.length;
if (!count) return;

const ROTATE = 44, DEPTH = 0.6, FALLOFF = 0.56, FADE = 0.1, GAP = 0.05;

mount.innerHTML = `<div class="cf" role="region" aria-label="${mount.dataset.label || 'Gallery'}">
  <button type="button" class="cf-nav cf-prev" aria-label="Previous slide"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="15 18 9 12 15 6"></polyline></svg></button>
  <button type="button" class="cf-nav cf-next" aria-label="Next slide"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"></polyline></svg></button>
  <div class="cf-frame" tabindex="0">
    <div class="cf-track" role="region">
      ${slides.map((s, i) => `
        <button type="button" class="cf-card" data-index="${i}" aria-label="${s.title || 'View ' + (i + 1)}: ${s.alt}">
          <img alt="${s.alt || ''}" data-src="${s.src}" draggable="false" decoding="async" width="1000" height="750" ${i > 2 ? 'loading="lazy"' : ''}>
        </button>`).join('')}
    </div>
  </div>
  <div class="cf-caption" role="status" aria-live="polite" aria-atomic="true"></div>
  <div class="cf-dots" role="tablist" aria-label="Slides">
    ${slides.map((s, i) => `<button type="button" class="cf-dot" data-index="${i}" ${i === 0 ? 'aria-current="true"' : ''}" aria-label="Go to slide ${i + 1}"></button>`).join('')}
  </div>
</div>`;

const $ = (s, r = mount) => r.querySelector(s);
const $$ = (s, r = mount) => Array.from(r.querySelectorAll(s));
const frame = $('.cf-frame');
const track = $('.cf-track');
const cards = $$('.cf-card');
const dots = $$('.cf-dot');
const caption = $('.cf-caption');
const prev_btn = $('.cf-prev');
const next_btn = $('.cf-next');

let curr = 0, settle_req = null;

const ease = (x) => (1 - Math.cos(x * Math.PI)) / 2;

const render = () => {
  const card_width = cards[0]?.offsetWidth || 220;
  for (let i = 0; i < count; i++) {
    const rel = (i - curr + count) % count;
    const offset = rel > count / 2 ? rel - count : rel;
    const angle = offset * (Math.PI / ROTATE);
    const scale = 1 - Math.abs(offset) * (1 - DEPTH);
    const z = Math.sin(Math.abs(angle)) * FALLOFF;
    const opacity = 1 - Math.abs(offset) * FADE;

    cards[i].style.transform = `translateX(calc(-50% + ${offset * (card_width * (1 + GAP))}px)) translateZ(${z * 40}px) rotateY(${-angle * 180 / Math.PI}deg) scale(${scale})`;
    cards[i].style.opacity = opacity;
    cards[i].style.zIndex = Math.round(100 - Math.abs(offset) * 10);
    cards[i].setAttribute('aria-current', String(offset === 0));
  }
  const idx = Math.round(curr) % count;
  dots.forEach((d, i) => d.setAttribute('aria-current', String(i === idx)));
  if (caption) caption.textContent = slides[idx].title || `View ${idx + 1}`;
};

let drag_start = null, drag_curr = null, drag_vel = 0;

const on_pointer_down = (e) => {
  if (settle_req) cancelAnimationFrame(settle_req);
  drag_start = e.clientX || (e.touches?.[0]?.clientX);
  drag_curr = drag_start;
};

const on_pointer_move = (e) => {
  if (drag_start == null) return;
  const x = e.clientX || (e.touches?.[0]?.clientX);
  drag_vel = (x - drag_curr) / 10;
  drag_curr = x;
  curr -= (x - drag_start) / 200;
  render();
};

const on_pointer_up = () => {
  if (drag_start == null) return;
  drag_start = drag_curr = null;
  const target = Math.round(curr + Math.sign(drag_vel) * 0.3);
  settle_to(target);
};

const settle_to = (target) => {
  if (settle_req) cancelAnimationFrame(settle_req);
  const reduce = matchMedia('(prefers-reduced-motion)').matches;
  const from = curr, t0 = Date.now();

  const tick = () => {
    if (reduce) { curr = target; render(); return; }
    const t = (Date.now() - t0) / 300;
    if (t >= 1) {
      curr = target;
      render();
      select(((target % count) + count) % count);
      return;
    }
    curr = from + (target - from) * ease(t);
    render();
    settle_req = requestAnimationFrame(tick);
  };
  tick();
};

const go_to = (i) => { settle_to(i); };

cards.forEach((card, i) => {
  card.addEventListener('click', () => go_to(i));
});

dots.forEach((dot, i) => {
  dot.addEventListener('click', () => go_to(i));
});

if (prev_btn) prev_btn.addEventListener('click', () => go_to(curr - 1));
if (next_btn) next_btn.addEventListener('click', () => go_to(curr + 1));

document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowLeft') go_to(curr - 1);
  if (e.key === 'ArrowRight') go_to(curr + 1);
});

frame.addEventListener('pointerdown', on_pointer_down, { passive: true });
frame.addEventListener('pointermove', on_pointer_move, { passive: true });
frame.addEventListener('pointerup', on_pointer_up, { passive: true });
frame.addEventListener('pointerleave', on_pointer_up, { passive: true });

const start = () => {
  $$('.cf-card img').forEach(img => {
    loadImage(img, img.dataset.src, ok => { if (!ok) img.parentElement?.removeChild(img); });
  });
  render();
};

near(mount, start);
select(0);
})();


/* ═══════════════════════════════════════════════════════════════════════════
   THE FILM

   Ported from a React component. Three things changed, all because the page
   around it is not React:

   1. The trigger is a real <button>. The original was a div with tabindex and
      a keydown handler listening for Enter — three lines of code to get back
      what a button already does, and it still would not have answered Space.
   2. Scroll is locked through the same path as the enquiry popup. The
      original set document.body.style.overflow directly, which on this page
      would fight Lenis for the scroll and lose.
   3. The iframe is written on open and cleared on close. React unmounts it
      for you; here it has to be removed by hand or the audio keeps playing
      behind a closed dialog.

   The player is never on the page until someone asks for it: a YouTube embed
   is around half a megabyte and sets cookies before a visitor has decided to
   watch anything.
   ═══════════════════════════════════════════════════════════════════════ */
(() => {
'use strict';
const card  = document.querySelector('.video-card');
const modal = document.getElementById('video-modal');
if (!card || !modal) return;

const frame = modal.querySelector('.video-frame');
const closeBtn = modal.querySelector('.video-close');
let lastFocus = null;

/* Same scroll lock as the enquiry popup: Lenis owns the page scroll, so
   stopping it is the only thing that works. */
function lock(on){
  if (window.lenisInstance) on ? window.lenisInstance.stop() : window.lenisInstance.start();
  else document.body.style.overflow = on ? 'hidden' : '';
}

function openFilm(){
  const id = card.dataset.video;
  if (!id) return;
  lastFocus = document.activeElement;

  /* nocookie, and no related videos from other channels at the end. */
  const src = 'https://www.youtube-nocookie.com/embed/' + encodeURIComponent(id)
            + '?autoplay=1&rel=0&modestbranding=1&playsinline=1';
  frame.innerHTML =
    '<iframe src="' + src + '" title="Triton Humming Valley, the film" '
    + 'allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" '
    + 'allowfullscreen></iframe>';

  modal.hidden = false;
  lock(true);
  closeBtn.focus();

  if (typeof gsap !== 'undefined' && !matchMedia('(prefers-reduced-motion: reduce)').matches){
    gsap.fromTo(modal, {opacity:0}, {opacity:1, duration:.25, ease:'power2.out'});
    gsap.fromTo(modal.querySelector('.video-panel'),
      {y:20, scale:.98}, {y:0, scale:1, duration:.45, ease:'expo.out'});
  }
}

function shutFilm(){
  if (modal.hidden) return;
  modal.hidden = true;
  frame.innerHTML = '';        // stops the audio; the player is gone until next time
  lock(false);
  if (lastFocus) lastFocus.focus();
}

card.addEventListener('click', openFilm);
modal.addEventListener('click', e => { if (e.target.closest('[data-video-close]')) shutFilm(); });

document.addEventListener('keydown', e => {
  if (modal.hidden) return;
  if (e.key === 'Escape'){ shutFilm(); return; }
  /* One focusable thing inside, so the trap is a single line: anything that
     leaves the close button comes straight back to it. */
  if (e.key === 'Tab'){ e.preventDefault(); closeBtn.focus(); }
});

/* The poster follows the same rule as every other photograph on the page. */
const poster = card.querySelector('.video-poster');
if (poster && poster.dataset.src) {
  if (typeof loadWhenNear === 'function') loadWhenNear(poster, poster.dataset.src, null, card);
  else { poster.src = poster.dataset.src; poster.classList.add('is-loaded'); }
}
})();

/* ══════════════════════════════════════════════════════════════════════════
   THE MENU SHEET
   ──────────────────────────────────────────────────────────────────────────
   Below 1024px the page's eleven sections were unreachable: the link list
   was display:none there and nothing replaced it, so a phone had a brand,
   one button, and 19,000 pixels of scrolling.

   The sheet is markup, not a template string, so it exists before this file
   runs and for anyone whose JS never arrives. All this adds is the opening.
   ══════════════════════════════════════════════════════════════════════ */
(() => {
  const toggle = document.querySelector('.nav-toggle');
  const sheet  = document.getElementById('nav-sheet');
  const dock   = document.querySelector('.dock');
  if (!toggle || !sheet) return;

  const links = Array.from(sheet.querySelectorAll('a, button'));
  let open = false, lastFocus = null;

  /* Lenis owns the page's scroll, so hiding the overflow on <body> does
     nothing — the smooth-scroll layer keeps scrolling underneath. It has to
     be told to stop, with the overflow rule kept as the fallback for the
     case where Lenis failed to load. */
  const lock = on => {
    if (window.lenisInstance) on ? window.lenisInstance.stop() : window.lenisInstance.start();
    else document.body.style.overflow = on ? 'hidden' : '';
  };

  function setOpen(next) {
    if (next === open) return;
    open = next;
    toggle.setAttribute('aria-expanded', String(open));
    if (open) {
      lastFocus = document.activeElement;
      sheet.hidden = false;
      /* One frame between display and the class, or the transition has
         nothing to move from and the sheet simply appears. */
      requestAnimationFrame(() => sheet.classList.add('is-open'));
      lock(true);
      dock && dock.classList.remove('is-up');
      links[0] && links[0].focus({ preventScroll: true });
    } else {
      sheet.classList.remove('is-open');
      lock(false);
      const done = () => { sheet.hidden = true; };
      /* Wait for the fade out, but never longer than it should take —
         transitionend does not fire if the element is display:none'd or the
         user prefers reduced motion. */
      const t = setTimeout(done, 340);
      sheet.addEventListener('transitionend', function once(e) {
        if (e.target !== sheet) return;
        clearTimeout(t); sheet.removeEventListener('transitionend', once); done();
      });
      if (lastFocus) lastFocus.focus({ preventScroll: true });
    }
  }

  toggle.addEventListener('click', () => setOpen(!open));

  /* A link inside the sheet has to close it before the scroll starts, or
     the page moves behind a full-screen panel and arrives somewhere the
     visitor cannot see. */
  sheet.addEventListener('click', e => {
    const a = e.target.closest('a[href^="#"], [data-enquire]');
    if (a) setOpen(false);
  });

  document.addEventListener('keydown', e => {
    if (!open) return;
    if (e.key === 'Escape') { setOpen(false); return; }
    if (e.key !== 'Tab') return;
    /* Trap: a full-screen sheet that lets Tab reach the page behind it is a
       sheet a keyboard user gets lost in. */
    const first = links[0], last = links[links.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  });

  /* Rotating a phone to landscape can put the viewport above the breakpoint
     where the toggle no longer exists, which would leave the sheet open with
     no way to shut it. */
  matchMedia('(min-width: 1024px)').addEventListener('change', e => {
    if (e.matches) setOpen(false);
  });
})();
