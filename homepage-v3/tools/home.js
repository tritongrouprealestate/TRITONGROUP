/* Triton Group homepage v3. Vanilla JS port of the Claude Design prototype behaviours. */
(function () {
  'use strict';
  var root = document.getElementById('tg-home');
  if (!root) return;
  window.__tgReady = true;

  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var $ = function (s, r) { return (r || root).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || root).querySelectorAll(s)); };
  var tg = function (n, r) { return $('[data-tg="' + n + '"]', r); };
  var raf2 = function (f) { requestAnimationFrame(function () { requestAnimationFrame(f); }); };
  var clamp01 = function (v) { return Math.max(0, Math.min(1, v)); };
  var ease = 'cubic-bezier(.16,1,.3,1)';

  /* ---------- scroll driven bits: progress bar, story frame, parallax ---------- */
  var progress = tg('progress'), storyFrame = tg('story-frame'), storyImg = tg('story-img');
  var parallax = $$('[data-speed]');
  var ticking = false;
  function tick() {
    ticking = false;
    var vh = window.innerHeight, y = window.pageYOffset;
    var max = document.documentElement.scrollHeight - vh;
    if (progress) progress.style.transform = 'scaleX(' + (max > 0 ? y / max : 0) + ')';
    if (reduce) return;
    if (storyFrame) {
      var r = storyFrame.getBoundingClientRect();
      var p = clamp01((vh - r.top) / (vh * 0.9)), e = 1 - Math.pow(1 - p, 3), k = 12 * (1 - e);
      storyFrame.style.clipPath = 'inset(' + k + '% ' + k + '% ' + k + '% ' + k + '%)';
      if (storyImg) storyImg.style.transform = 'scale(' + (1.18 - 0.18 * e) + ')';
    }
    parallax.forEach(function (el) {
      var rr = el.parentElement.getBoundingClientRect();
      var off = rr.top + rr.height / 2 - vh / 2;
      if (rr.bottom < -200 || rr.top > vh + 200) return;
      el.style.transform = 'translate3d(0,' + off * parseFloat(el.getAttribute('data-speed')) + 'px,0)';
    });
  }
  function onScroll() { if (!ticking) { ticking = true; requestAnimationFrame(tick); } }
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);
  tick();

  /* ---------- pointer glow on [data-ix] sections ---------- */
  var ixPending = null;
  window.addEventListener('pointermove', function (e) {
    var sec = e.target && e.target.closest && e.target.closest('[data-ix]');
    if (!sec || !root.contains(sec)) return;
    ixPending = [sec, e.clientX, e.clientY];
    if (ixPending.raf) return;
    requestAnimationFrame(function () {
      if (!ixPending) return;
      var s = ixPending[0], r = s.getBoundingClientRect();
      s.style.setProperty('--mx', (ixPending[1] - r.left) + 'px');
      s.style.setProperty('--my', (ixPending[2] - r.top) + 'px');
      ixPending = null;
    });
  }, { passive: true });

  /* ---------- reveals and counters ---------- */
  var cio = new IntersectionObserver(function (ents) {
    ents.forEach(function (en) {
      if (!en.isIntersecting) return;
      var el = en.target, to = parseInt(el.getAttribute('data-count'), 10) || 0, t0 = performance.now(), d = 1800;
      var step = function (t) {
        var p = Math.min(1, (t - t0) / d), v = Math.round(to * (1 - Math.pow(1 - p, 4)));
        el.textContent = v.toLocaleString('en-IN');
        if (p < 1) requestAnimationFrame(step);
      };
      if (!reduce) requestAnimationFrame(step);
      cio.unobserve(el);
    });
  }, { threshold: 0.4 });
  $$('[data-count]').forEach(function (el) { if (!reduce) el.textContent = '0'; cio.observe(el); });

  var rio = new IntersectionObserver(function (ents) {
    ents.forEach(function (en) {
      if (!en.isIntersecting) return;
      var t = en.target;
      var sibs = Array.prototype.filter.call(t.parentElement.children, function (c) { return c.hasAttribute('data-reveal'); });
      t.style.transitionDelay = Math.max(0, sibs.indexOf(t)) * 90 + 'ms';
      t.classList.add('is-in');
      rio.unobserve(t);
    });
  }, { threshold: 0.12 });
  $$('[data-reveal]').forEach(function (el) { rio.observe(el); });

  /* ---------- hero: dot-matrix headline that scatters on scroll ---------- */
  /* Only the headline dots live on the canvas. The resting dot grid is plain CSS (.tg-df-grid), which is why this is cheap.
     The letters start almost assembled, then a very small shimmer fades in, so the word always feels slightly restless. */
  (function hero() {
    var outer = tg('df-outer'), stage = tg('df-stage'), cv = tg('df-dots'), gl = tg('df-glow');
    if (!outer || !stage || !cv || !gl || !cv.getContext) return;
    var ctx = cv.getContext('2d'), gtx = gl.getContext('2d');
    var spot = tg('df-spot'), copy = tg('df-copy'), hint = tg('df-hint'), lab = tg('df-label'), ms = tg('df-mouse'), wheel = tg('df-wheel');
    var lowEnd = (navigator.hardwareConcurrency || 8) <= 4 || (navigator.deviceMemory || 8) <= 4;
    var o = { headline: 'Triton Group', font: 'Gloock, Georgia, serif', weight: 400, R: 130, fg: '#F4F1EA', accent: '#9FBAB2' };
    var GX = 18, GY = 12, NB = 8, NG = 4;
    var s = { W: 0, H: 0, N: 0, P: new Float32Array(0), t0: 0, scrollP: 0, last: 0, kick: 0, step: 3, dpr: 1, tick: 0, slow: 0, half: false, mouse: { x: -9999, y: -9999, on: false } };
    var rafId = 0, visible = true, alive = true, ready = false, readyTimer = 0, rt = 0, lastNow = 0, bx = [], by = [], bc = [], gx = [], gy = [], gc = [];
    var FLOW = function (x, y, t) { return (Math.sin(x * 0.004 + t * 0.7) + Math.cos(y * 0.005 - t * 0.5) + Math.sin((x + y) * 0.002 + t * 0.3)) * Math.PI; };
    var fades = $$('[data-df-fade]', stage);
    var meas = document.createElement('canvas').getContext('2d');

    function sample() {
      var W = s.W, H = s.H, font = function (px) { return o.weight + ' ' + px + 'px ' + o.font; }, words = o.headline.split(/\s+/);
      var sr = stage.getBoundingClientRect();
      var bTop = Math.max(120, H * 0.17);
      var bBot = fades[0] ? fades[0].getBoundingClientRect().top - sr.top - 28 : H * 0.75;
      var band = Math.max(60, bBot - bTop), mid = bTop + band / 2, narrow = W < 700;
      var size = narrow ? Math.min(W * 0.27, band * 0.5, 176) : Math.min(W * 0.115, band * 0.9, 176), lines = [], i;
      for (;;) {
        meas.font = font(size); lines = []; var cur = '';
        for (i = 0; i < words.length; i++) {
          var t = cur ? cur + ' ' + words[i] : words[i];
          if (meas.measureText(t).width > W * 0.86 && cur) { lines.push(cur); cur = words[i]; } else cur = t;
        }
        lines.push(cur);
        if ((lines.length <= 3 && lines.length * size <= band && lines.every(function (l) { return meas.measureText(l).width <= W * 0.9; })) || size < 22) break;
        size *= 0.9;
      }
      var lh = size, top = mid - ((lines.length - 1) * lh) / 2;
      // only rasterise the band the text occupies, not the whole stage
      var y0 = Math.max(0, Math.floor(top - size * 0.8)), y1 = Math.min(H, Math.ceil(top + (lines.length - 1) * lh + size * 0.8)), h = Math.max(1, y1 - y0);
      var c = document.createElement('canvas'); c.width = W; c.height = h;
      var g = c.getContext('2d', { willReadFrequently: true });
      g.font = font(size); g.textAlign = 'center'; g.textBaseline = 'middle';
      try { g.letterSpacing = (-size * 0.03) + 'px'; } catch (e) { }
      g.fillStyle = '#000'; lines.forEach(function (l, n) { g.fillText(l, W / 2, top + n * lh - y0); });
      var d = g.getImageData(0, 0, W, h).data, pts = [], step = Math.max(2, Math.round(size / 40));
      if (lowEnd) step += 1;
      s.step = step;
      for (var y = 0; y < h; y += step) for (var x = 0; x < W; x += step) if (d[(y * W + x) * 4 + 3] > 128) pts.push(x, y + y0);
      return pts;
    }
    function build() {
      var r = stage.getBoundingClientRect();
      s.dpr = Math.min(lowEnd ? 1 : 1.5, window.devicePixelRatio || 1);
      s.W = Math.max(1, Math.round(r.width)); s.H = Math.max(1, Math.round(r.height));
      cv.width = Math.round(s.W * s.dpr); cv.height = Math.round(s.H * s.dpr);
      gl.width = Math.ceil(s.W / 4); gl.height = Math.ceil(s.H / 4);       // low resolution glow: the browser smooths it, no blur filter needed
      ctx.setTransform(s.dpr, 0, 0, s.dpr, 0, 0); gtx.setTransform(0.25, 0, 0, 0.25, 0, 0);
      var tgt = sample(), N = tgt.length / 2, cols = Math.ceil(s.W / GX) + 1, rows = Math.ceil(s.H / GY) + 1, cells = cols * rows;
      s.N = N; var P = new Float32Array(N * 10), diag = Math.hypot(s.W, s.H);
      for (var n = 0; n < N; n++) {
        var k = n * 10, tx = tgt[n * 2], ty = tgt[n * 2 + 1], cell = (Math.random() * cells) | 0, ang = Math.random() * 6.2832, rad = 8 + Math.random() * 26;
        P[k] = tx + Math.cos(ang) * rad; P[k + 1] = ty + Math.sin(ang) * rad;      // start close to the final spot: calm, not a burst
        P[k + 4] = (cell % cols) * GX - 6; P[k + 5] = Math.floor(cell / cols) * GY - 1;   // home on the grid, used when scrolling away
        P[k + 6] = tx; P[k + 7] = ty;
        P[k + 8] = 0.05 + Math.min(0.9, Math.hypot(tx - s.W / 2, ty - s.H * 0.5) / diag) * 0.9 + Math.random() * 0.15;
        P[k + 9] = Math.random() * 6.2832;
      }
      s.P = P;
      bx = []; by = []; bc = new Int32Array(NB); gx = []; gy = []; gc = new Int32Array(NG);
      for (var b = 0; b < NB; b++) { bx.push(new Float32Array(N)); by.push(new Float32Array(N)); }
      for (b = 0; b < NG; b++) { gx.push(new Float32Array(N)); gy.push(new Float32Array(N)); }
    }
    function setCopy() {
      var p = s.scrollP;
      if (copy) copy.style.opacity = ready ? String(Math.max(0, 1 - p * 1.6)) : '1';
      if (hint && lab) {
        var up = p > 0.85;
        lab.textContent = up ? 'Scroll up to gather' : 'Scroll to scatter';
        if (ms) ms.style.transform = up ? 'rotate(180deg)' : 'none';
        hint.style.opacity = ready ? String(up ? 1 : Math.max(0, 1 - p * 5)) : '0';
      }
    }
    function restart() {
      build(); s.t0 = performance.now(); ready = false;
      clearTimeout(readyTimer);
      readyTimer = setTimeout(function () { ready = true; setCopy(); }, reduce ? 0 : 700);
    }
    function frame(now) {
      rafId = requestAnimationFrame(frame);
      if (!alive || !visible) return;
      // slow devices: after a run of long frames, draw every other frame for good
      if (lastNow && now - lastNow > 40) s.slow++; else if (s.slow > 0 && now - lastNow < 24) s.slow--;
      lastNow = now; if (s.slow > 18) s.half = true;
      var t = (now - s.t0) / 1000, SC = s.scrollP, q = Math.min(1, SC);
      var idle = t > 2.5 && SC < 0.01 && !s.mouse.on && s.kick < 0.02;
      if ((idle || s.half) && ((s.tick++) & 1)) return;     // 30fps while nothing is happening
      var W = s.W, H = s.H, N = s.N, P = s.P, R = o.R, R2 = R * R, m = s.mouse;
      s.kick = s.kick * 0.93 + Math.abs(SC - s.last) * 6; s.last = SC;
      var sweep = ((t * 0.35) % 1.6) - 0.3, ramp = Math.min(1, Math.max(0, (t - 0.4) / 2.6));
      var amb = reduce ? 0 : (0.03 + 0.1 * ramp) * (1 - q);   // the shimmer: very small at first, a little more after ~3s
      var r = Math.max(1.05, s.step * 0.36) * (1 - q * 0.45), r2 = r * 2, i, b;
      for (b = 0; b < NB; b++) bc[b] = 0; for (b = 0; b < NG; b++) gc[b] = 0;
      for (i = 0; i < N; i++) {
        var k = i * 10, local = t - P[k + 8], x = P[k], y = P[k + 1], vx = P[k + 2], vy = P[k + 3];
        if (reduce) {
          x = P[k + 6] + (P[k + 4] - P[k + 6]) * q; y = P[k + 7] + (P[k + 5] - P[k + 7]) * q; P[k] = x; P[k + 1] = y;
        } else if (local > 0) {
          var d = Math.min(1, SC * (0.8 + P[k + 8] * 0.6)), sp = Math.min(0.09, 0.02 + local * 0.08);
          var ax = (P[k + 6] + (P[k + 4] - P[k + 6]) * d - x) * sp, ay = (P[k + 7] + (P[k + 5] - P[k + 7]) * d - y) * sp;
          ax += amb * Math.sin(t * 1.9 + P[k + 9]) + amb * 0.5 * Math.sin(t * 7.3 + P[k + 9] * 2.1);
          ay += amb * Math.cos(t * 1.5 + P[k + 9] * 1.3) + amb * 0.5 * Math.cos(t * 6.1 + P[k + 9] * 1.7);
          if (s.kick > 0.01) { var fl = Math.min(1, s.kick) * 0.9, a0 = FLOW(x, y, t); ax += Math.cos(a0) * 1.6 * fl; ay += Math.sin(a0) * 1.6 * fl; }
          if (m.on) {
            var dx = x - m.x, dy = y - m.y, d2 = dx * dx + dy * dy;
            if (d2 < R2) { var dd = Math.sqrt(d2) || 1, f = (1 - dd / R) * 6; ax += (dx / dd) * f; ay += (dy / dd) * f; }
          }
          vx = (vx + ax) * 0.82; vy = (vy + ay) * 0.82; x += vx; y += vy;
          P[k] = x; P[k + 1] = y; P[k + 2] = vx; P[k + 3] = vy;
        }
        var settle = reduce ? 1 - q : Math.min(1, Math.max(0, local * 1.2)) * (1 - q);
        var gridA = Math.min(0.45, 0.1 + (Math.abs(vx) + Math.abs(vy)) * 0.05);
        var al = (0.34 + settle * 0.62) * (1 - q) + gridA * q;
        b = Math.min(NB - 1, (al * NB) | 0); bx[b][bc[b]] = x; by[b][bc[b]++] = y;
        if (q < 1 && !reduce) {
          var w = Math.max(0, 1 - Math.abs(x / W - sweep) * 7), ga = (w * 0.9 + (1 - settle) * 0.25) * (1 - q);
          if (ga > 0.05) { b = Math.min(NG - 1, (ga * NG) | 0); gx[b][gc[b]] = x; gy[b][gc[b]++] = y; }
        }
      }
      ctx.clearRect(0, 0, W, H); gtx.clearRect(0, 0, W, H);
      ctx.fillStyle = o.fg;
      for (b = 0; b < NB; b++) {
        if (!bc[b]) continue;
        ctx.globalAlpha = (b + 0.5) / NB; ctx.beginPath();
        for (i = 0; i < bc[b]; i++) ctx.rect(bx[b][i] - r, by[b][i] - r, r2, r2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
      gtx.fillStyle = o.accent;
      for (b = 0; b < NG; b++) {
        if (!gc[b]) continue;
        gtx.globalAlpha = (b + 0.5) / NG; gtx.beginPath();
        for (i = 0; i < gc[b]; i++) gtx.rect(gx[b][i] - 2, gy[b][i] - 2, 4, 4);
        gtx.fill();
      }
      gtx.globalAlpha = 1;
      if (wheel && !reduce) { var c = (t % 1.8) / 1.8; wheel.style.transform = 'translateY(' + (Math.min(1, c / 0.7) * 10) + 'px)'; wheel.style.opacity = c < 0.2 ? c / 0.2 : c < 0.7 ? 1 - (c - 0.2) / 0.5 : 0; }
    }
    function onHeroScroll() { var rc = outer.getBoundingClientRect(); s.scrollP = Math.min(1, Math.max(0, -rc.top / (window.innerHeight * 0.38))); setCopy(); }
    function move(e) {
      var rc = stage.getBoundingClientRect(); s.mouse.x = e.clientX - rc.left; s.mouse.y = e.clientY - rc.top; s.mouse.on = true;
      if (spot) { spot.style.opacity = '1'; spot.style.setProperty('--x', s.mouse.x + 'px'); spot.style.setProperty('--y', s.mouse.y + 'px'); }
    }
    function leave() { s.mouse.on = false; if (spot) spot.style.opacity = '0'; }
    // ignore tiny size changes (phone address bar, scrollbar) so the effect never restarts by accident
    var ro = new ResizeObserver(function () {
      clearTimeout(rt);
      rt = setTimeout(function () {
        var rc = stage.getBoundingClientRect();
        if (Math.abs(rc.width - s.W) < 3 && Math.abs(rc.height - s.H) < 3) return;
        build(); s.t0 = performance.now() - 2500;
      }, 250);
    });
    var io = new IntersectionObserver(function (es) { visible = es[0].isIntersecting; }, { threshold: 0 });
    stage.addEventListener('pointermove', move); stage.addEventListener('pointerleave', leave);
    window.addEventListener('scroll', onHeroScroll, { passive: true });
    var started = false, fontOk = false;
    function go() { if (started || !alive) return; started = true; restart(); onHeroScroll(); ro.observe(stage); io.observe(stage); rafId = requestAnimationFrame(frame); }
    var fr = document.fonts && document.fonts.load ? document.fonts.load(o.weight + ' 100px Gloock').catch(function () { return []; }) : Promise.resolve([]);
    fr.then(function () { var late = started; fontOk = true; if (late) restart(); else go(); });   // late font: redraw once with the right letters
    setTimeout(function () { go(); }, 900);        // fonts are preloaded, so this is only a safety net
  })();

  /* ---------- gallery: filter tabs and lightbox ---------- */
  (function gallery() {
    var tabs = $$('.tg-gal-tab'), grid = $('[data-m="gal"]'), lb = tg('lb');
    if (!grid) return;
    var items = $$('button', grid), cur = 0, list = items.slice(), opener = null, imgBox = null;
    function filter(name) {
      tabs.forEach(function (t) { t.setAttribute('aria-selected', t.getAttribute('data-filter') === name ? 'true' : 'false'); });
      list = [];
      items.forEach(function (b) {
        var show = name === 'All' || (b.getAttribute('data-tags') || '').indexOf(name) > -1;
        b.hidden = !show; if (show) list.push(b);
      });
    }
    tabs.forEach(function (t) { t.addEventListener('click', function () { filter(t.getAttribute('data-filter')); }); });
    if (!lb) return;
    var title = tg('lb-title', lb), meta = tg('lb-meta', lb), fig = tg('lb-fig', lb);
    function show(i) {
      cur = (i + list.length) % list.length;
      var b = list[cur];
      if (!imgBox) {
        imgBox = document.createElement('div'); imgBox.className = 'tg-lb-img'; imgBox.setAttribute('role', 'img');
        fig.insertBefore(imgBox, fig.firstChild);
      }
      imgBox.style.backgroundImage = 'url("' + b.getAttribute('data-big') + '")';
      imgBox.setAttribute('aria-label', b.getAttribute('data-alt') || '');
      title.textContent = b.getAttribute('data-title') || '';
      meta.textContent = (b.getAttribute('data-project') || '') + ' · ' + (cur + 1) + ' / ' + list.length;
    }
    function open(b) { opener = b; show(list.indexOf(b)); lb.classList.add('is-open'); lb.setAttribute('aria-hidden', 'false'); tg('lb-close', lb).focus(); }
    function close() { lb.classList.remove('is-open'); lb.setAttribute('aria-hidden', 'true'); if (imgBox) imgBox.style.backgroundImage = ''; if (opener) opener.focus(); }
    items.forEach(function (b) { b.addEventListener('click', function () { open(b); }); });
    tg('lb-prev', lb).addEventListener('click', function (e) { e.stopPropagation(); show(cur - 1); });
    tg('lb-next', lb).addEventListener('click', function (e) { e.stopPropagation(); show(cur + 1); });
    tg('lb-close', lb).addEventListener('click', function (e) { e.stopPropagation(); close(); });
    lb.addEventListener('click', close);
    fig.addEventListener('click', function (e) { e.stopPropagation(); });
    document.addEventListener('keydown', function (e) {
      if (!lb.classList.contains('is-open')) return;
      if (e.key === 'Escape') close(); else if (e.key === 'ArrowLeft') show(cur - 1); else if (e.key === 'ArrowRight') show(cur + 1);
    });
  })();

  /* ---------- events and offers carousel (desktop) ---------- */
  (function events() {
    var track = tg('ev-track'), panel = tg('ev-panel');
    if (!track || !panel) return;
    var wrap = track.closest('.tg-ev-desk'), sec = tg('ev'), count = tg('ev-count');
    var list = Array.prototype.slice.call(track.children), texts = Array.prototype.slice.call(panel.children);
    var H = 'clamp(180px,34cqi,460px)', HERO = 'calc(' + H + ' * 16 / 9)', ROOM = 'calc(100cqi - ' + HERO + ' - 8px - 48px - 8px)';
    var SH = [-0.06, 0.61, 0.3, 0.15], ST = [0, 0.71, 0.4, 0.25], SQ = [-0.12, 0.59, 0.28, 0.13];
    var col = 0, slid = 0, still = false, hover = -1, timer = 0, paused = false, fwd = true, onScreen = true;
    var slideOf = function (el) { return Array.prototype.indexOf.call(initial, el); };
    var initial = list.slice();
    function share(c) { return hover < 0 || reduce ? SH[c] : (hover === c ? ST[c] : SQ[c]); }
    function width(c) { return c < 0 || c > 3 ? '8px' : c === 0 ? 'calc(' + HERO + ' + (' + ROOM + ') * ' + share(0) + ')' : 'calc((' + ROOM + ') * ' + share(c) + ')'; }
    function layout() {
      track.classList.toggle('tg-ev-track-still', still);
      track.style.transform = 'translateX(' + (slid * 24) + 'px)';
      var open = list[Math.max(0, -col)] || list[0], openSlide = slideOf(open);
      list.forEach(function (el, place) {
        var c = place + col;
        el.style.width = width(c);
        el.style.marginLeft = place === 0 ? '0px' : c < 4 ? '16px' : '8px';
        el.setAttribute('aria-selected', c === 0 ? 'true' : 'false');
        el.tabIndex = c === 0 ? 0 : -1;
        el.style.order = place;
        var ov = el.querySelector('span'); if (ov) ov.style.opacity = c === 0 ? 1 : 0;
      });
      texts.forEach(function (t, i) {
        var on = i === openSlide;
        t.style.opacity = on ? 1 : 0; t.style.visibility = on ? 'visible' : 'hidden'; t.style.pointerEvents = on ? 'auto' : 'none';
        var a = t.querySelector('a'); if (a) a.tabIndex = on ? 0 : -1;
      });
      if (count) count.textContent = '0' + (openSlide + 1) + ' / 05';
    }
    function reorder() { list.forEach(function (el) { track.appendChild(el); }); }
    function step(by) {
      if (!by) return;
      clearTimeout(timer); fwd = by > 0;
      if (by > 0) { col -= by; slid -= by; still = false; layout(); }
      else {
        var b = -by, moved = list.splice(list.length - b, b); list = moved.concat(list);
        still = true; reorder(); col -= b; slid -= b; layout(); track.getBoundingClientRect();
        raf2(function () { still = false; col = 0; slid = 0; layout(); });
      }
      timer = setTimeout(function () {
        if (fwd) { list = list.concat(list.splice(0, by)); }
        col = 0; slid = 0; still = true; reorder(); layout();
        raf2(function () { still = false; layout(); });
      }, (reduce ? 0 : 1000) + 40);
    }
    list.forEach(function (el) {
      el.addEventListener('click', function () { var c = list.indexOf(el) + col; if (c > 0) step(c); });
      el.addEventListener('mousemove', function () { var c = list.indexOf(el) + col; if (hover !== c) { hover = c; layout(); } });
    });
    wrap.addEventListener('mouseenter', function () { paused = true; });
    wrap.addEventListener('mouseleave', function () { paused = false; if (hover !== -1) { hover = -1; layout(); } });
    var pv = tg('ev-prev', sec), nx = tg('ev-next', sec);
    if (pv) pv.addEventListener('click', function () { step(-1); });
    if (nx) nx.addEventListener('click', function () { step(1); });
    new IntersectionObserver(function (es) { onScreen = es[0].isIntersecting; }).observe(sec);
    setInterval(function () { if (!paused && !reduce && onScreen && !document.hidden) step(1); }, 6000);
    layout();
  })();

  /* ---------- featured testimonial slider ---------- */
  (function feat() {
    var box = tg('feat'); if (!box) return;
    var feats = [
      { project: 'Triton Humming Valley', usp: 'Developer-backed rental model', q: 'I usually don’t go for developer commitments easily, but the rental model at Humming Valley made sense. Still early, but I’m confident about the decision.', name: 'Nithin Reddy', role: 'Investor, Hyderabad', av: null },
      { project: 'Sanvi Aero Gardens', usp: 'Peaceful, low-density living', q: 'We were actually looking for end-use, not investment. The project feels peaceful and not overcrowded, which is rare in Bangalore now.', name: 'Kavya & Rahul', role: 'Young couple', av: 'https://i0.wp.com/tritongroup.in/wp-content/uploads/2026/04/4-2.png?fit=200%2C200&ssl=1' }
    ];
    var imgs = $$('[data-tg="feat-img"]', box), dots = $$('[data-tg="feat-dot"]', box);
    var proj = tg('feat-project', box), usp = tg('feat-usp', box), q = tg('feat-q', box), nm = tg('feat-name', box), rl = tg('feat-role', box), av = tg('feat-av', box);
    feats[0].av = av.getAttribute('src');
    var i = 0, t = 0;
    function show(n) {
      i = (n + feats.length) % feats.length; var f = feats[i];
      imgs.forEach(function (im, k) { im.classList.toggle('is-on', k === i); });
      dots.forEach(function (d, k) { d.classList.toggle('is-on', k === i); });
      proj.textContent = f.project; usp.lastChild.nodeValue = f.usp; q.textContent = '“' + f.q + '”';
      nm.textContent = f.name; rl.textContent = f.role; av.src = f.av; av.alt = f.name;
    }
    function auto() { clearInterval(t); if (!reduce) t = setInterval(function () { show(i + 1); }, 7000); }
    tg('feat-prev', box).addEventListener('click', function () { show(i - 1); auto(); });
    tg('feat-next', box).addEventListener('click', function () { show(i + 1); auto(); });
    auto();
  })();

  /* ---------- FAQ ---------- */
  (function faq() {
    var tabs = $$('.tg-faq-tab'), items = $$('.tg-faq-item');
    if (!items.length) return;
    function openItem(it, on) {
      it.classList.toggle('is-open', on);
      it.querySelector('button').setAttribute('aria-expanded', on ? 'true' : 'false');
    }
    items.forEach(function (it) {
      it.querySelector('button').addEventListener('click', function () {
        var on = !it.classList.contains('is-open');
        items.forEach(function (o) { openItem(o, false); });
        openItem(it, on);
      });
    });
    tabs.forEach(function (t) {
      t.addEventListener('click', function () {
        var cat = t.getAttribute('data-cat'), first = true;
        tabs.forEach(function (x) { x.setAttribute('aria-selected', x === t ? 'true' : 'false'); });
        items.forEach(function (it) {
          var show = it.getAttribute('data-cat') === cat;
          it.hidden = !show; openItem(it, show && first); if (show) first = false;
        });
      });
    });
  })();
})();
