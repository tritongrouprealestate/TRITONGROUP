/* ============================================================
   TRITON GROUP — Offline Sales Portal
   Zero dependencies. Runs from file:// — no server, no build.
   ============================================================ */
(function () {
'use strict';

var D  = window.PORTAL_DATA || { projects: [] };
var BASELINE = (D.projects || []).slice();   // what shipped in data.js
function visible() { return (D.projects || []).filter(function (p) { return !p.hidden; }); }
var $  = function (s, r) { return (r || document).querySelector(s); };
var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
var esc = function (s) {
  return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
    return { '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;' }[c];
  });
};
var clamp = function (v, a, b) { return Math.min(Math.max(v, a), b); };
var uri = function (p) { return String(p).split('/').map(encodeURIComponent).join('/'); };
var isMobile = function () { return window.innerWidth < 768; };

/* ---------------- icons ---------------- */
var I = {
  pdf:   '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/><path d="M9 15h1.5a1.5 1.5 0 0 0 0-3H9v5"/><path d="M14 17v-5h1a2 2 0 0 1 0 4h-1"/>',
  video: '<rect x="2" y="5" width="14" height="14" rx="2"/><path d="m22 8-6 4 6 4z"/>',
  image: '<rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="m21 15-5-5L5 21"/>',
  sheet: '<rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M3 15h18M9 3v18M15 3v18"/>',
  doc:   '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6M8 13h8M8 17h6"/>',
  ppt:   '<path d="M3 3h18v12H3z"/><path d="M12 15v6M8 21h8M8 7h8M8 11h5"/>',
  file:  '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/>',
  page:  '<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M3 9h18M7 13h7M7 16h5"/>',
  folder:'<path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>',
  home:  '<path d="M3 10.5 12 3l9 7.5V20a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1z"/>',
  arrow: '<path d="M5 12h14M13 6l6 6-6 6"/>',
  back:  '<path d="M19 12H5M11 18l-6-6 6-6"/>',
  bld:   '<path d="M3 21h18M5 21V7l7-4 7 4v14"/><path d="M9 9h1M14 9h1M9 13h1M14 13h1M9 17h1M14 17h1"/>',
  mtn:   '<path d="m3 20 6.5-11 4 6 2.5-4L21 20z"/><circle cx="7.5" cy="6.5" r="1.6"/>',
  arch:  '<rect x="3" y="4" width="18" height="4" rx="1"/><path d="M5 8v11a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V8M10 12h4"/>',
  sync:  '<path d="M21 12a9 9 0 1 1-2.64-6.36"/><path d="M21 3v6h-6"/>',
  youtube: '<rect x="2" y="5" width="20" height="14" rx="4"/><path d="m10 9 5 3-5 3z"/>',
  play:  '<path d="M8 5.5v13l11-6.5z" fill="currentColor" stroke="none"/>',
  expand:'<path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/>'
};
var svg = function (k, cls) {
  return '<svg class="' + (cls || '') + '" viewBox="0 0 24 24">' + (I[k] || I.file) + '</svg>';
};

var LOGO = { residential: 'bld', corporate: 'bld', archive: 'arch' };
function projectIcon(p) {
  if (p.archive) return 'arch';
  if (/valley|green|hill|nature/i.test(p.name)) return 'mtn';
  return LOGO[(p.tag || '').toLowerCase()] || 'bld';
}

function kindOf(name) {
  var e = (name.split('.').pop() || '').toLowerCase();
  if (e === 'pdf') return 'pdf';
  if (e === 'html' || e === 'htm') return 'page';
  if (['mp4','mov','m4v','webm','ogv','avi','mkv'].indexOf(e) > -1) return 'video';
  if (['jpg','jpeg','png','webp','gif','avif','svg','bmp'].indexOf(e) > -1) return 'image';
  if (['xls','xlsx','xlsm','csv','tsv','numbers'].indexOf(e) > -1) return 'sheet';
  if (['doc','docx','rtf','txt','pages'].indexOf(e) > -1) return 'doc';
  if (['ppt','pptx','key'].indexOf(e) > -1) return 'ppt';
  return 'file';
}
var KIND_LABEL = { pdf:'PDF', page:'Page', video:'Video', image:'Image', sheet:'Sheet', youtube:'YouTube',
                   doc:'Document', ppt:'Deck', file:'File' };

function fileCount(p) {
  return (p.folders || []).reduce(function (n, f) {
    return n + (f.files || []).filter(function (x) { return !x.missing; }).length; }, 0);
}

/* ============================================================
   CURSOR
   ============================================================ */
(function cursor() {
  var dot = $('#cursorDot'), ring = $('#cursorRing'), label = $('#cursorLabel');
  if (!dot || matchMedia('(pointer:coarse)').matches) return;
  var mx = innerWidth / 2, my = innerHeight / 2, rx = mx, ry = my;

  addEventListener('mousemove', function (e) {
    mx = e.clientX; my = e.clientY;
    dot.style.transform = 'translate(' + mx + 'px,' + my + 'px)';
  }, { passive: true });

  (function loop() {
    rx += (mx - rx) * 0.16; ry += (my - ry) * 0.16;
    ring.style.transform = 'translate(' + rx + 'px,' + ry + 'px)';
    requestAnimationFrame(loop);
  })();

  addEventListener('mouseover', function (e) {
    var t = e.target.closest('[data-cursor]');
    if (t) { document.body.classList.add('cur-hot'); label.textContent = t.dataset.cursor; }
    else   { document.body.classList.remove('cur-hot'); }
  });
  addEventListener('mouseleave', function () { dot.style.opacity = ring.style.opacity = 0; });
  addEventListener('mouseenter', function () { dot.style.opacity = ring.style.opacity = 1; });
})();

/* ============================================================
   HERO — scroll-expand (ported from ScrollExpandMedia)
   ============================================================ */
var Hero = (function () {
  var hero  = $('#hero'), box = $('#heroBox'), scrim = $('#heroMediaScrim'),
      bg    = $('#heroBg'), title = $('#heroTitle'),
      wA    = $('#heroWordA'), wB = $('#heroWordB'),
      date  = $('#heroDate'), cue = $('#heroCue'),
      bar   = $('#heroProgress').firstElementChild;

  var progress = 0, expanded = false, touchY = 0, done = false;

  function paint() {
    var m = isMobile();
    var w = 300 + progress * (m ? 650 : 1250);
    var h = 400 + progress * (m ? 200 : 400);
    var tx = progress * (m ? 180 : 150);

    box.style.width  = w + 'px';
    box.style.height = h + 'px';
    bg.style.opacity = 1 - progress;
    scrim.style.opacity = 0.5 - progress * 0.3;

    wA.style.transform   = 'translateX(-' + tx + 'vw)';
    wB.style.transform   = 'translateX(' + tx + 'vw)';
    date.style.transform = 'translateX(-' + tx + 'vw)';
    cue.style.transform  = 'translateX(' + tx + 'vw)';

    bar.style.width = (progress * 100) + '%';
  }

  function setProgress(p) {
    progress = clamp(p, 0, 1);
    paint();
    if (progress >= 1 && !expanded) open();
    else if (progress < 1 && expanded) close();
  }

  function open() {
    expanded = true; done = true;
    hero.classList.add('done');
    document.body.classList.remove('is-locked');
    $('#topbar').classList.add('show');
    $('#stage').classList.add('show');
    reveal();
  }
  function close() {
    expanded = false;
    hero.classList.remove('done');
    document.body.classList.add('is-locked');
    $('#stage').classList.remove('show');
  }

  function onWheel(e) {
    if (Route.away) return;                       // not on the home route
    if (expanded && e.deltaY < 0 && scrollY <= 5) { setProgress(0.999); e.preventDefault(); return; }
    if (expanded) return;
    e.preventDefault();
    setProgress(progress + e.deltaY * 0.0009);
  }
  function onTouchStart(e) { touchY = e.touches[0].clientY; }
  function onTouchMove(e) {
    if (Route.away || !touchY) return;
    var d = touchY - e.touches[0].clientY;
    if (expanded && d < -20 && scrollY <= 5) { setProgress(0.999); e.preventDefault(); return; }
    if (expanded) return;
    e.preventDefault();
    setProgress(progress + d * (d < 0 ? 0.008 : 0.005));
    touchY = e.touches[0].clientY;
  }
  function onScroll() { if (!expanded && !Route.away) scrollTo(0, 0); }

  addEventListener('wheel', onWheel, { passive: false });
  addEventListener('touchstart', onTouchStart, { passive: false });
  addEventListener('touchmove', onTouchMove, { passive: false });
  addEventListener('touchend', function () { touchY = 0; });
  addEventListener('scroll', onScroll);
  addEventListener('resize', paint);

  return {
    paint: paint,
    skip: function () { setProgress(1); },
    reset: function () { if (!done) setProgress(0); },
    get expanded() { return expanded; },
    hide: function (on) {
      hero.style.display = on ? 'none' : '';
      if (on) { document.body.classList.remove('is-locked');
                $('#topbar').classList.add('show'); $('#stage').classList.add('show'); }
    }
  };
})();

/* ============================================================
   REVEAL on scroll
   ============================================================ */
var io = null;
function reveal() {
  if (!('IntersectionObserver' in window)) {
    $$('.rv').forEach(function (el) { el.classList.add('in'); }); return;
  }
  if (io) io.disconnect();
  io = new IntersectionObserver(function (entries) {
    entries.forEach(function (en) {
      if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
    });
  }, { rootMargin: '0px 0px -8% 0px', threshold: 0.06 });
  $$('.rv:not(.in)').forEach(function (el) { io.observe(el); });
}

/* ============================================================
   POINTER SHEEN + TILT
   ============================================================ */
function bindInteractive(root) {
  $$('.pcard, .tile', root).forEach(function (el) {
    el.addEventListener('pointermove', function (e) {
      var r = el.getBoundingClientRect();
      var px = (e.clientX - r.left) / r.width;
      var py = (e.clientY - r.top) / r.height;
      el.style.setProperty('--mx', (px * 100) + '%');
      el.style.setProperty('--my', (py * 100) + '%');
      if (el.classList.contains('pcard') && !matchMedia('(pointer:coarse)').matches) {
        el.style.transform = 'perspective(1100px) rotateX(' + ((0.5 - py) * 5).toFixed(2) +
                             'deg) rotateY(' + ((px - 0.5) * 5).toFixed(2) + 'deg) translateY(-6px)';
      }
    });
    el.addEventListener('pointerleave', function () { el.style.transform = ''; });
  });
}

/* ============================================================
   RENDERERS
   ============================================================ */
/* The picture on a video tile.
   YouTube: the saved thumbnail first, then YouTube's own copy if there is a
   connection, then nothing — the panel behind it carries the play mark either way.
   Local film: the browser draws a frame from the file itself, so it needs no
   generated poster and keeps working when the film is replaced. */
function preview(file, k) {
  if (file.youtube)
    return '<img class="shot" alt="" src="' + esc(uri(file.thumb || '')) + '" data-fb="' +
           'https://img.youtube.com/vi/' + esc(file.youtube) + '/hqdefault.jpg">';
  if (k === 'image')
    /* the sheet itself, anchored to its top edge so the heading that identifies
       it is always the part on show */
    return '<img class="shot doc" alt="" loading="lazy" decoding="async" src="' +
           esc(uri(file.path)) + '">';
  return '<video class="shot" muted playsinline preload="metadata" tabindex="-1" src="' +
         esc(uri(file.path)) + '#t=1"></video>';
}

/* An online film. A plain <a target="_blank"> so the click just opens YouTube —
   embedding is not an option from a file:// page, which is what Error 153 was. */
function linkTile(l, i) {
  return '<a class="tile media online rv" href="' + esc(l.url) + '"' +
         ' target="_blank" rel="noopener noreferrer"' +
         ' style="transition-delay:' + (i * 45) + 'ms" data-cursor="youtube">' +
         '<span class="tile-shot">' + preview(l) +
         '<span class="tile-play">' + svg('play') + '</span></span>' +
         '<span class="tile-badge">YouTube</span>' +
         '<span class="tile-txt"><h3 class="tile-name">' + esc(l.label) + '</h3>' +
         '<p class="tile-sub online">Opens on YouTube · needs internet</p></span>' +
         '</a>';
}

/* Two-stage image fallback. The error event does not bubble, so it is caught
   on the way down instead. */
document.addEventListener('error', function (e) {
  var t = e.target;
  if (!t || t.tagName !== 'IMG' || !t.classList.contains('shot')) return;
  if (t.dataset.fb) { var u = t.dataset.fb; delete t.dataset.fb; t.src = u; }
  else t.remove();
}, true);

function projectCard(p, i) {
  var n = fileCount(p), folders = (p.folders || []).length;
  var figure = n > 0
      ? '<b>' + n + '</b><span>' + (n === 1 ? 'file' : 'files') + '</span>'
      : '<b>' + folders + '</b><span>' + (folders === 1 ? 'folder' : 'folders') + '</span>';

  return '' +
  '<a class="pcard rv' + (p.archive ? ' archive' : '') + '" href="#/p/' + esc(p.id) + '"' +
     ' style="--pc:' + esc(p.accent || '') + ';transition-delay:' + (i * 70) + 'ms"' +
     ' data-cursor="open">' +
    '<div class="pcard-media">' +
      '<div class="pcard-fallback"></div>' +
      (p.cover ? '<img src="' + esc(p.cover) + '" alt="" onerror="this.remove()">' : '') +
    '</div>' +
    '<div class="pcard-scrim"></div>' +
    '<div class="pcard-sheen"></div>' +
    (p.tag ? '<span class="pcard-flag">' + esc(p.tag) + '</span>' : '') +
    '<div class="pcard-inner">' +
      '<div class="pcard-top"><span class="pcard-logo">' + svg(projectIcon(p)) + '</span></div>' +
      '<div class="pcard-body">' +
        '<div>' +
          '<h3 class="pcard-name">' + esc(p.name) + '</h3>' +
          '<p class="pcard-loc">' + esc(p.location || (folders + ' folders · Triton Group Sales Kit')) + '</p>' +
        '</div>' +
        '<div class="pcard-ov">' +
          '<h4>OVERVIEW</h4>' +
          '<p>' + esc(p.tagline || '') + '</p>' +
        '</div>' +
      '</div>' +
    '</div>' +
    '<div class="pcard-foot">' +
      '<span class="pcard-figure">' + figure + '</span>' +
      '<span class="pcard-cta">Open Kit ' + svg('arrow') + '</span>' +
    '</div>' +
  '</a>';
}

function renderHome() {
  Hero.hide(false);
  crumbs([]);
  var body =
    '<div class="view">' +
      '<div class="sec-head rv">' +
        '<div>' +
          '<p class="sec-eyebrow">Sales Deck · Kit</p>' +
          '<h2 class="sec-title">Choose a <em>project</em></h2>' +
          '<p class="sec-sub">Every brochure, cost sheet, availability chart and film — ' +
            'stored on this machine and ready to present without a connection.</p>' +
        '</div>' +
        '<span class="sec-count">' + visible().length + ' Projects</span>' +
      '</div>' +
      '<div class="projects">' + visible().map(projectCard).join('') + '</div>' +
    '</div>';
  paint(body);
}

function renderProject(p) {
  Hero.hide(true);
  crumbs([{ t: p.name }]);
  var folders = p.folders || [];
  var links   = p.links   || [];
  var body =
    '<div class="view">' +
      '<a class="back" href="#/" data-cursor="back">' + svg('back') + ' All projects</a>' +
      '<div class="sec-head rv">' +
        '<div>' +
          '<p class="sec-eyebrow">' + esc(p.tag || 'Project') + '</p>' +
          '<h2 class="sec-title">' + esc(p.name) + '</h2>' +
          '<p class="sec-sub">' + esc(p.tagline || '') + '</p>' +
        '</div>' +
        '<span class="sec-count">' + folders.length + ' Folders · ' + fileCount(p) + ' Files' +
          (links.length ? ' · ' + links.length + ' Online' : '') + '</span>' +
      '</div>' +
      (folders.length || links.length
        ? '<div class="tiles">' + folders.map(function (f, i) {
            var n = (f.files || []).filter(function (x) { return !x.missing; }).length;
            return '<a class="tile rv" href="#/p/' + esc(p.id) + '/' + esc(f.id) + '"' +
                   ' style="transition-delay:' + (i * 55) + 'ms" data-cursor="open">' +
                   '<span class="tile-ico">' + svg('folder') + '</span>' +
                   '<span><h3 class="tile-name">' + esc(f.name) + '</h3>' +
                   '<p class="tile-sub">' + (n ? n + (n === 1 ? ' item' : ' items') : 'Empty') + '</p></span>' +
                   '</a>';
          }).join('') + '</div>'
        : emptyState('No folders defined for ' + esc(p.name) + ' yet.')) +
      (links.length
        ? '<div class="sec-split rv"><span>Online Films</span>' +
            '<em>Open on YouTube · these need an internet connection</em></div>' +
          '<div class="tiles">' + links.map(linkTile).join('') + '</div>'
        : '') +
    '</div>';
  paint(body);
}

function renderFolder(p, f) {
  Hero.hide(true);
  crumbs([{ t: p.name, h: '#/p/' + p.id }, { t: f.name }]);
  var files = f.files || [];
  var body =
    '<div class="view">' +
      '<a class="back" href="#/p/' + esc(p.id) + '" data-cursor="back">' + svg('back') + ' ' + esc(p.name) + '</a>' +
      '<div class="sec-head rv">' +
        '<div>' +
          '<p class="sec-eyebrow">' + esc(p.name) + '</p>' +
          '<h2 class="sec-title">' + esc(f.name) + '</h2>' +
        '</div>' +
        '<span class="sec-count">' + files.length + (files.length === 1 ? ' File' : ' Files') + '</span>' +
      '</div>' +
      (files.length
        ? '<div class="tiles">' + files.map(function (file, i) {
            var k = kindOf(file.name);
            var sub = file.missing ? 'Not added yet'
                    : file.note   ? file.note
                    : file.size   ? file.name + '  ·  ' + file.size
                    : file.name;
            var media = !file.missing && (k === 'video' || k === 'image');
            var head = media
              ? '<span class="tile-shot' + (k === 'image' ? ' doc' : '') + '">' +
                preview(file, k) +
                (k === 'video' ? '<span class="tile-play">' + svg('play') + '</span>'
                               : '<span class="tile-zoom">' + svg('expand') + '</span>') +
                '</span>'
              : '<span class="tile-ico">' + svg(k) + '</span>';
            var inner = head +
                   '<span class="tile-badge">' + KIND_LABEL[k] + '</span>' +
                   '<span class="tile-txt"><h3 class="tile-name">' + esc(file.label) + '</h3>' +
                   '<p class="tile-sub' + (file.missing || file.note ? ' warn' : '') + '">' +
                   esc(sub) + '</p></span>';
            var delay = ' style="transition-delay:' + (i * 45) + 'ms"';
            /* One click, straight into a new tab. Nothing sits in between. */
            return file.missing
              ? '<div class="tile missing rv"' + delay + '>' + inner + '</div>'
              : '<a class="tile rv' + (media ? ' media' : '') + '"' + delay +
                ' href="' + esc(uri(file.path)) + '" target="_blank" rel="noopener"' +
                ' data-cursor="open">' + inner + '</a>';
          }).join('') + '</div>'
        : emptyState(
            'Put the files for <b>' + esc(p.name) + ' → ' + esc(f.name) + '</b> into<br>' +
            '<code>collaterals/' + esc(p.name) + '/' + esc(f.name) + '/</code><br>' +
            'then press Update and pick the <code>collaterals</code> folder.' +
            '<br><button class="empty-cta" data-update>' + svg('sync') + ' Update library</button>')) +
    '</div>';
  paint(body);
}

function emptyState(html) {
  return '<div class="empty rv"><h3>Nothing here yet</h3><p>' + html + '</p></div>';
}

function paint(html) {
  var stage = $('#stage');
  var wipe = $('#wipe');
  wipe.classList.remove('out'); wipe.classList.add('in');
  setTimeout(function () {
    stage.innerHTML = html;
    scrollTo(0, 0);
    bindInteractive(stage);
    reveal();
    wipe.classList.remove('in'); wipe.classList.add('out');
  }, 340);
}

function crumbs(path) {
  var el = $('#crumbs');
  if (!path.length) { el.innerHTML = ''; return; }
  var html = '<a href="#/">Home</a>';
  path.forEach(function (c, i) {
    html += '<span class="sep">/</span>' +
      (c.h ? '<a href="' + c.h + '">' + esc(c.t) + '</a>'
           : '<span class="cur">' + esc(c.t) + '</span>');
  });
  el.innerHTML = html;
}

/* ============================================================
   ROUTER
   ============================================================ */
var Route = { away: false };

function findProject(id) {
  return visible().filter(function (p) { return p.id === id; })[0];
}
function findFolder(p, id) {
  return (p.folders || []).filter(function (f) { return f.id === id; })[0];
}

function route() {
  var h = (location.hash || '#/').replace(/^#\/?/, '');
  var parts = h.split('/').filter(Boolean).map(decodeURIComponent);

  if (parts[0] === 'p' && parts[1]) {
    var p = findProject(parts[1]);
    if (!p) { location.hash = '#/'; return; }
    if (parts[2]) {
      var f = findFolder(p, parts[2]);
      if (!f) { location.hash = '#/p/' + p.id; return; }
      Route.away = true; renderFolder(p, f); return;
    }
    Route.away = true; renderProject(p); return;
  }
  Route.away = false;
  renderHome();
  Hero.paint();
  if (Hero.expanded) { $('#topbar').classList.add('show'); $('#stage').classList.add('show'); }
}

addEventListener('hashchange', route);

/* topbar solid on scroll */
addEventListener('scroll', function () {
  $('#topbar').classList.toggle('solid', scrollY > 30);
}, { passive: true });


/* ============================================================
   LIBRARY — scan the collaterals folder, no server, no commands
   ------------------------------------------------------------
   A <input webkitdirectory> hands us the whole recursive tree with
   relative paths. We only use it to LEARN filenames; files are then
   opened by relative path (not blob URLs), so videos stay seekable
   and nothing expires. The result is kept in localStorage, which
   survives a browser restart on file://, so the pick is a one-off.
   ============================================================ */
var Library = (function () {
  var KEY = 'triton.library.v1';

  var SKIP = /^(\.|~\$|desktop\.ini$|thumbs\.db$|\.ds_store$)/i;
  var COVER = /^cover\.(jpe?g|png|webp)$/i;

  function slug(s) {
    return String(s).toLowerCase().trim()
      .replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || 'item';
  }
  function human(b) {
    return b < 1024 ? b + ' B'
         : b < 1048576 ? Math.round(b / 1024) + ' KB'
         : b < 1073741824 ? (b / 1048576).toFixed(1) + ' MB'
         : (b / 1073741824).toFixed(2) + ' GB';
  }

  /* ---- turn a flat FileList into the project/folder/file tree ---- */
  function build(files) {
    var root = '', tree = {}, covers = {};

    for (var i = 0; i < files.length; i++) {
      var f = files[i];
      var parts = (f.webkitRelativePath || f.name).split('/');
      if (!root) root = parts[0];

      var project = parts[1];
      if (!project || SKIP.test(project) || parts.length < 3) continue;   // stray file at the top
      if (project.charAt(0) === '_') continue;      // _Portal etc — not a project

      /* register the project/folder from the path even when the file itself is
         skipped, so empty folders still appear and show what is missing */
      tree[project] = tree[project] || {};

      if (parts.length === 3 && COVER.test(parts[2])) { covers[project] = parts.join('/'); continue; }

      var folder = parts.length >= 4 ? parts[2] : 'General';
      if (SKIP.test(folder)) continue;
      tree[project][folder] = tree[project][folder] || [];

      var name = parts[parts.length - 1];
      if (SKIP.test(name)) continue;
      /* files nested deeper than one level are flattened into their top folder
         rather than dropped, so nothing on disk goes missing */

      tree[project][folder].push({ name: name, path: parts.join('/'), size: human(f.size) });
    }

    /* keep the copy someone wrote by hand in data.js */
    var prev = {};
    BASELINE.forEach(function (p) { prev[p.id] = p; });

    var projects = Object.keys(tree).map(function (pname) {
      var id  = slug(pname);
      var old = prev[id] || {};
      var oldF = {};
      (old.folders || []).forEach(function (f) { oldF[f.id] = f; });

      var folders = Object.keys(tree[pname]).map(function (fname) {
        var fid = slug(fname);
        /* the slots this folder is meant to hold, in their authored order */
        var slots = ((oldF[fid] || {}).files || []);
        var onDisk = {};
        tree[pname][fname].forEach(function (x) { onDisk[x.name] = x; });

        var files = slots.map(function (slot) {
          var hit = onDisk[slot.name];
          delete onDisk[slot.name];
          return hit
            ? { label: slot.label || slot.name, name: slot.name, path: hit.path,
                size: hit.size, note: slot.note }
            : { label: slot.label || slot.name, name: slot.name, path: slot.path,
                missing: true };
        });
        /* anything extra that was dropped in beyond the standard slots */
        Object.keys(onDisk).sort(function (a, b) {
          return a.localeCompare(b, undefined, { numeric: true }); })
          .forEach(function (n) {
            files.push({ label: onDisk[n].name, name: onDisk[n].name,
                         path: onDisk[n].path, size: onDisk[n].size });
          });
        return { id: fid, name: fname, files: files };
      });
      /* keep folders that the manifest knows about but that are absent from disk,
         so a deleted folder shows as empty rather than silently disappearing */
      (old.folders || []).forEach(function (of) {
        if (folders.some(function (f) { return f.id === of.id; })) return;
        folders.push({ id: of.id, name: of.name, files: (of.files || []).map(function (x) {
          return { label: x.label || x.name, name: x.name, path: x.path, missing: true }; }) });
      });
      folders.sort(function (a, b) {
        var oa = (old.folders || []).findIndex(function (f) { return f.id === a.id; });
        var ob = (old.folders || []).findIndex(function (f) { return f.id === b.id; });
        if (oa < 0) oa = 999; if (ob < 0) ob = 999;
        return oa !== ob ? oa - ob : a.name.localeCompare(b.name);
      });

      var archived = old.archive !== undefined ? old.archive : /^(old|archive|backup)$/i.test(pname);
      return {
        id: id, name: old.name || pname,
        location: old.location || '',
        tagline:  old.tagline  || (folders.length + ' folders of sales collateral.'),
        tag:      old.tag      || (archived ? 'Archive' : 'Project'),
        links:    old.links || [],
        cover:    covers[pname] || old.cover || '',
        accent:   old.accent   || 'linear-gradient(155deg,#6d8399,#3b4a5c 55%,#8a7a52)',
        archive:  archived || undefined,
        hidden:   old.hidden !== undefined ? old.hidden : archived,
        folders:  folders
      };
    }).sort(function (a, b) {
      var oa = BASELINE.findIndex(function (p) { return p.id === a.id; });
      var ob = BASELINE.findIndex(function (p) { return p.id === b.id; });
      if (oa < 0) oa = 999; if (ob < 0) ob = 999;
      if (!!a.hidden !== !!b.hidden) return a.hidden ? 1 : -1;
      return oa !== ob ? oa - ob : a.name.localeCompare(b.name);
    });

    return { root: root, at: Date.now(), projects: projects };
  }

  /* ---- persistence ---- */
  function save(lib) { try { localStorage.setItem(KEY, JSON.stringify(lib)); } catch (e) {} }
  function load() {
    try { var v = JSON.parse(localStorage.getItem(KEY)); return v && v.projects && v.projects.length ? v : null; }
    catch (e) { return null; }
  }
  function clear() { try { localStorage.removeItem(KEY); } catch (e) {} }

  function countFiles(ps) {
    return ps.reduce(function (n, p) {
      return n + (p.folders || []).reduce(function (m, f) { return m + f.files.filter(function (x) { return !x.missing; }).length; }, 0); }, 0);
  }

  function apply(lib) {
    D.projects = lib.projects;
    stamp(lib);
  }

  function stamp(lib) {
    var el = $('#libStamp');
    if (!el) return;
    if (!lib) { el.textContent = 'Built-in list'; return; }
    var d = new Date(lib.at);
    el.textContent = 'Updated ' + d.toLocaleDateString(undefined,
      { day: 'numeric', month: 'short' }) + ' · ' + countFiles(lib.projects) + ' files';
  }

  /* ---- the one interaction: pick the folder ---- */
  function scan(files) {
    if (!files || !files.length) return;
    var before = countFiles(D.projects || []);
    var lib = build(files);
    if (!lib.projects.length) { toast('Nothing found in that folder', 'That folder has no project sub-folders inside it.', true); return; }
    save(lib); apply(lib);
    var after = countFiles(lib.projects);
    var delta = after - before;
    toast('Library updated',
      lib.projects.filter(function (p) { return !p.hidden; }).length + ' projects · ' + after + ' files' +
      (delta > 0 ? ' · ' + delta + ' new' : delta < 0 ? ' · ' + (-delta) + ' removed' : '') +
      '  —  reading from ' + lib.root + '/');
    route();
  }

  function toast(title, body, warn) {
    var t = $('#toast');
    t.className = 'toast show' + (warn ? ' warn' : '');
    t.innerHTML = '<b>' + esc(title) + '</b><span>' + esc(body) + '</span>';
    clearTimeout(toast._t);
    toast._t = setTimeout(function () { t.className = 'toast'; }, 6000);
  }

  function init() {
    var input = $('#dirInput');
    $('#updateBtn').onclick = function () { input.value = ''; input.click(); };
    input.addEventListener('change', function () { scan(this.files); });

    var saved = load();
    if (saved) apply(saved); else stamp(null);
  }

  return { init: init, clear: clear, toast: toast, stamp: stamp,
           reset: function () { clear(); D.projects = BASELINE.slice(); stamp(null);
                                toast('Reset', 'Back to the list that shipped with the portal.'); route(); } };
})();

/* ============================================================
   SEARCH
   ============================================================ */
var Search = (function () {
  var el = $('#search'), input = $('#searchInput'), out = $('#searchResults');
  var index = [], sel = 0, rows = [];

  function build() {
    index = [];
    visible().forEach(function (p) {
      index.push({ t: 'project', name: p.name, path: 'Projects', href: '#/p/' + p.id, icon: 'folder' });
      (p.folders || []).forEach(function (f) {
        index.push({ t: 'folder', name: f.name, path: p.name,
                     href: '#/p/' + p.id + '/' + f.id, icon: 'folder' });
        (f.files || []).forEach(function (file) {
          if (file.missing) return;
          index.push({ t: 'file', name: file.label, alt: file.name,
                       path: p.name + ' · ' + f.name +
                             (file.youtube ? ' · YouTube' : ''),
                       file: file.youtube ? file.url : file.path,
                       icon: file.youtube ? 'youtube' : kindOf(file.name) });
        });
      });
    });
  }

  function score(hay, q) {
    hay = hay.toLowerCase();
    if (hay.indexOf(q) === 0) return 100;
    if (hay.indexOf(q) > -1) return 60;
    var i = 0;
    for (var c = 0; c < hay.length && i < q.length; c++) if (hay[c] === q[i]) i++;
    return i === q.length ? 25 : -1;
  }

  function mark(name, q) {
    var i = name.toLowerCase().indexOf(q);
    if (i < 0) return esc(name);
    return esc(name.slice(0, i)) + '<mark>' + esc(name.slice(i, i + q.length)) +
           '</mark>' + esc(name.slice(i + q.length));
  }

  function render() {
    var q = input.value.trim().toLowerCase();
    var list = q
      ? index.map(function (r) { return { r: r, s: Math.max(score(r.name, q), score(r.alt || '', q) - 5) }; })
             .filter(function (x) { return x.s > 0; })
             .sort(function (a, b) { return b.s - a.s; })
             .slice(0, 40).map(function (x) { return x.r; })
      : index.slice(0, 14);

    if (!list.length) { out.innerHTML = '<div class="sr-empty">No matches for “' + esc(q) + '”</div>'; rows = []; return; }
    sel = 0;
    out.innerHTML = list.map(function (r, i) {
      var tag = r.external ? 'a href="' + esc(r.external) + '" target="_blank" rel="noopener noreferrer"'
              : r.href     ? 'a href="' + r.href + '"'
              : 'a href="' + esc(uri(r.file)) + '" target="_blank" rel="noopener"';
      return '<' + tag + ' class="sr' + (i === 0 ? ' sel' : '') + (r.external ? ' ext' : '') + '">' +
             '<span class="sr-ico">' + svg(r.icon) + '</span>' +
             '<span class="sr-txt"><div class="sr-name">' + mark(r.name, q) + '</div>' +
             '<div class="sr-path">' + esc(r.path) + '</div></span>' +
             '</a>';
    }).join('');
    rows = $$('.sr', out);
  }

  function move(d) {
    if (!rows.length) return;
    rows[sel].classList.remove('sel');
    sel = (sel + d + rows.length) % rows.length;
    rows[sel].classList.add('sel');
    rows[sel].scrollIntoView({ block: 'nearest' });
  }

  function open() {
    build(); el.hidden = false;
    requestAnimationFrame(function () { el.classList.add('show'); });
    input.value = ''; render(); input.focus();
    document.body.style.overflow = 'hidden';
  }
  function close() {
    el.classList.remove('show'); document.body.style.overflow = '';
    setTimeout(function () { el.hidden = true; }, 300);
  }

  input.addEventListener('input', render);
  el.addEventListener('click', function (e) { if (e.target === el) close(); });
  out.addEventListener('click', function () { close(); });
  input.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowDown') { e.preventDefault(); move(1); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); move(-1); }
    else if (e.key === 'Enter') { e.preventDefault(); if (rows[sel]) rows[sel].click(); }
  });

  $('#searchBtn').onclick = open;
  return { open: open, close: close, get isOpen() { return !el.hidden; } };
})();

/* ============================================================
   PRESENTATION MODE + KEYS
   ============================================================ */
$('#presentBtn').onclick = function () { document.body.classList.toggle('present'); };

addEventListener('keydown', function (e) {
  var typing = /^(INPUT|TEXTAREA)$/.test(document.activeElement.tagName);

  if (e.key === 'Escape') {
    if (Search.isOpen) return Search.close();
    if (document.body.classList.contains('present'))
      return document.body.classList.remove('present');
    if (Route.away) history.back();
    return;
  }
  if (typing) return;

  if (e.key === '/') { e.preventDefault(); Search.open(); }
  else if (e.key === 'k' && (e.metaKey || e.ctrlKey)) { e.preventDefault(); Search.open(); }
  else if (e.key.toLowerCase() === 'p') document.body.classList.toggle('present');
  else if (e.key.toLowerCase() === 'h') location.hash = '#/';
  else if (e.key.toLowerCase() === 'u') $('#updateBtn').click();
  else if (e.key.toLowerCase() === 'r' && e.shiftKey) Library.reset();
});

/* ============================================================
   BOOT
   ============================================================ */
(function boot() {
  var b = (D.brand && D.brand.hero) || {};
  if (b.wordA) $('#heroWordA').textContent = b.wordA;
  if (b.wordB) $('#heroWordB').textContent = b.wordB;
  if (b.date)  $('#heroDate').textContent  = b.date;
  if (b.cue)   $('#heroCue').firstChild.nodeValue = b.cue;

  var lg = (D.brand && D.brand.logo) || '';
  if (lg) { var bl = $('#brandLogo'), fl = $('#footLogo');
            if (bl) bl.src = uri(lg);
            if (fl) fl.src = uri(lg); }

  var hm = b || {};
  if (hm.video)  $('#heroVideo').src = hm.video;
  if (hm.poster) $('#heroVideo').poster = hm.poster;
  if (hm.bg)     { var bgi = $('#heroBgImg'); if (bgi) bgi.src = hm.bg; }

  // hero video may not exist offline yet — drop it so the gradient shows
  var v = $('#heroVideo');
  v.addEventListener('error', function () { v.remove(); }, true);
  if (v.querySelector) setTimeout(function () {
    if (v.readyState === 0 && v.networkState === 3) v.remove();
  }, 1200);

  Library.init();
  Hero.paint();

  // deep link straight to a project? skip the hero entirely
  if ((location.hash || '').length > 2) { Hero.skip(); }

  route();
})();

})();
