/* Triton Humming Valley landing page: interactions. No dependencies. */
(function () {
  var root = document.getElementById('hv-root');
  if (!root) return;
  var D = window.HV_DATA;
  var GALLERY = D.GALLERY, TYPES = D.TYPES, REV = D.REV, AMEN = D.AMEN, STORY = D.STORY, MODALS = D.MODALS;
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var st = { story: 0, type: 0, facing: 0, rev: 0, amen: 0, faq: 0, sig: 0, night: false, heroAlt: false, modal: null, lb: -1, interest: [], pastHero: false };
  var hTotal = 0;

  function $(s, r) { return (r || root).querySelector(s); }
  function $$(s, r) { return Array.prototype.slice.call((r || root).querySelectorAll(s)); }
  function mob() { return window.innerWidth < 900; }
  function T(k, v) { $$('[data-t="' + k + '"]').forEach(function (e) { e.textContent = v; }); }
  function show(k, on) { $$('[data-show="' + k + '"]').forEach(function (e) { e.classList.toggle('hv-hide', !on); }); }
  function pad(n) { return String(n).padStart(2, '0'); }
  function bgUrl(u, mode) { return 'url("' + u + '") center/' + mode + ' no-repeat'; }

  /* ---------- state renderers ---------- */
  function renderSig() {
    $$('article[data-click^="sig:"]').forEach(function (a, i) {
      var cur = i === st.sig, on = mob() || cur;
      a.style.flex = mob() ? '0 0 auto' : (cur ? '2.4 1 0' : '1 1 0');
      a.querySelector('img').style.transform = cur ? 'scale(1)' : 'scale(1.08)';
      var b = a.querySelector('[data-grp="sig-body"]');
      b.style.maxHeight = on ? '240px' : '0px'; b.style.opacity = on ? 1 : 0;
    });
  }
  function renderStory() {
    var m = mob();
    $$('li[data-step]').forEach(function (li, i) { li.style.opacity = (m || i === st.story) ? 1 : 0.28; });
    $$('[data-grp="story-imgs"] > img').forEach(function (im, i) {
      im.style.opacity = (m || i === st.story) ? 1 : 0;
      im.style.transform = i === st.story ? 'scale(1)' : 'scale(1.06)';
    });
    T('storyFloor', STORY[st.story].floor); T('storyCount', pad(st.story + 1));
  }
  function renderTypes() {
    $$('button[data-click^="type:"]').forEach(function (b, i) {
      var on = i === st.type;
      b.setAttribute('aria-selected', on); b.style.background = on ? 'var(--ink-900)' : 'transparent'; b.style.color = on ? 'var(--paper-100)' : 'var(--ink-900)';
    });
    $$('[data-grp="type-imgs"] > img').forEach(function (im, i) {
      im.style.opacity = i === st.type ? 1 : 0; im.style.transform = i === st.type ? 'scale(1)' : 'scale(1.06)';
    });
    var plans = TYPES[st.type].plans, plan = plans[Math.min(st.facing, plans.length - 1)];
    var wrap = $$('span').filter(function (s) { return s.textContent.trim() === 'Facing'; })[0].parentElement;
    var btns = $$('button', wrap), proto = btns[0];
    btns.slice(1).forEach(function (b) { b.remove(); });
    plans.forEach(function (p, j) {
      var b = j === 0 ? proto : proto.cloneNode(true);
      b.textContent = p.facing; b.setAttribute('data-click', 'facing:' + j);
      b.style.color = j === st.facing ? 'var(--ink-900)' : 'var(--ink-400)';
      b.style.borderBottomColor = j === st.facing ? 'var(--ink-900)' : 'transparent';
      if (j > 0) wrap.appendChild(b);
    });
    T('plan.line', plan.line); T('plan.sba', plan.sba); T('plan.land', plan.land);
  }
  function renderRev() {
    $$('button[data-click^="rev:"]').forEach(function (b, i) {
      var on = i === st.rev;
      b.setAttribute('aria-selected', on); b.style.background = on ? 'var(--paper-200)' : 'transparent';
      b.style.color = on ? 'var(--teal-1000)' : 'var(--paper-200)'; b.style.borderColor = on ? 'var(--paper-200)' : 'rgba(244,241,234,.34)';
    });
    $$('[data-grp="rev-bars"] > div').forEach(function (d, i) {
      d.style.background = i === st.rev ? 'var(--paper-200)' : 'rgba(244,241,234,.18)';
    });
    T('revNow.v', REV[st.rev].v); T('revNow.occ', REV[st.rev].occ);
  }
  function renderAmen() {
    $$('button[data-click^="amen:"]').forEach(function (b, i) {
      var on = i === st.amen;
      b.setAttribute('aria-expanded', on); b.style.color = on ? 'var(--ink-900)' : 'var(--ink-400)';
      b.children[1].style.transform = on ? 'translateX(8px)' : 'none'; show('amen:' + i, on);
    });
    $$('[data-grp="amen-imgs"] > img').forEach(function (im, i) {
      im.style.opacity = i === st.amen ? 1 : 0; im.style.transform = i === st.amen ? 'scale(1)' : 'scale(1.06)';
    });
    T('amenCap', AMEN[st.amen].cap);
  }
  function renderFaq() {
    $$('button[data-click^="faq:"]').forEach(function (b) {
      var i = +b.getAttribute('data-click').split(':')[1], on = i === st.faq;
      b.setAttribute('aria-expanded', on); b.querySelector('span[aria-hidden]').style.transform = on ? 'rotate(45deg)' : 'none'; show('faq:' + i, on);
    });
  }
  function renderInterest() {
    $$('button[data-click^="interest:"]').forEach(function (b) {
      var l = b.getAttribute('data-click').slice(9), on = st.interest.indexOf(l) > -1;
      b.setAttribute('aria-pressed', on); b.style.background = on ? 'var(--paper-200)' : 'transparent';
      b.style.color = on ? 'var(--teal-1000)' : 'var(--paper-200)'; b.style.borderColor = on ? 'var(--paper-200)' : 'rgba(244,241,234,.34)';
    });
  }
  function renderNight() {
    var night = $('img[src$="rooftop-jacuzzi-night.webp"]'); if (night) night.style.opacity = st.night ? 1 : 0;
    $$('button[data-click^="night:"]').forEach(function (b) {
      var v = b.getAttribute('data-click') === 'night:true', on = st.night === v;
      b.setAttribute('aria-pressed', on); b.style.background = on ? 'var(--paper-100)' : 'transparent'; b.style.color = on ? 'var(--teal-1000)' : 'var(--paper-100)';
      b.firstElementChild.style.background = 'url(' + root.getAttribute('data-icons') + (v ? 'moon' : 'sun') + (on ? '-ink' : '-paper') + '.svg) center/contain no-repeat';
    });
    T('todCap', st.night ? 'The water glows long after the hills go dark' : 'Mist rests in the folds of the rock');
  }
  function renderFloat() { show('floatShow', !mob() && st.pastHero && !st.modal && st.lb < 0); }

  /* ---------- modal, lightbox, video ---------- */
  function openModal(key) {
    var m = MODALS[key]; st.modal = key;
    ['title', 'sub', 'quote', 'cta', 'thanks'].forEach(function (f) { T('modal.' + f, m[f]); });
    var dlg = $('[role="dialog"][aria-label]:not([aria-label="Image viewer"])'); if (dlg) dlg.setAttribute('aria-label', m.title);
    $('div[role="img"][aria-label="Triton Humming Valley"]').style.background = bgUrl(m.img, 'cover');
    show('modalSent', false); show('modalForm', true); show('modalOpen', true); renderFloat();
    var f = $('[data-show="modalForm"] input'); if (f) setTimeout(function () { f.focus(); }, 60);
  }
  function closeModal() { st.modal = null; show('modalOpen', false); renderFloat(); }
  function setLb(i) {
    st.lb = i; var g = GALLERY[i], dlg = $('[aria-label="Image viewer"]');
    dlg.querySelector('div[role="img"]').style.background = bgUrl(g.img.replace(/w=\d+/, 'w=2000'), 'contain');
    dlg.querySelector('div[role="img"]').setAttribute('aria-label', g.cap);
    T('lbCap', g.cap); T('lbNum', pad(i + 1) + ' / ' + pad(GALLERY.length));
  }
  function openLb(i) { setLb(i); show('lbOpen', true); renderFloat(); }
  function closeLb() { st.lb = -1; show('lbOpen', false); renderFloat(); }
  function stepLb(d) { setLb((st.lb + d + GALLERY.length) % GALLERY.length); }
  function playVid() {
    var f = $('iframe[data-src]'); if (f) f.src = f.getAttribute('data-src');
    show('vidIdle', false); show('vidPlay', true);
  }

  /* ---------- leads: bridge to the site's real Jetpack forms ---------- */
  // Every enquiry is passed to a hidden Jetpack form (.hv-pf--KEY form), so notifications, CRM webhook,
  // spam checks and the thank-you redirect behave exactly as before.
  var FORM_FOR = { hero: 'page', final: 'page', visit: 'page', sunset: 'page', floor: 'floor', brochure: 'brochure', revenue: 'rental' };
  var TEL = '+91 90366 82626';
  function proxy(key) { return document.querySelector('.hv-pf--' + key + ' form'); }
  function setVal(el, v) {
    if (!el) return;
    Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value').set.call(el, v);
    ['input', 'change'].forEach(function (t) { el.dispatchEvent(new Event(t, { bubbles: true })); });
  }
  function fields(f) {
    var els = Array.prototype.slice.call(f.querySelectorAll('input')).filter(function (e) { return ['hidden', 'submit', 'button', 'checkbox', 'radio'].indexOf(e.type) < 0 && !/honeypot|akismet|ak_/i.test(e.name || ''); });
    return {
      email: els.filter(function (e) { return e.type === 'email'; })[0],
      phone: els.filter(function (e) { return e.type === 'tel'; })[0],
      name: els.filter(function (e) { return e.type === 'text' && /name/i.test(e.name + ' ' + e.id); })[0] || els.filter(function (e) { return e.type === 'text'; })[0]
    };
  }
  function digits(v) { var d = String(v || '').replace(/[^\d+]/g, ''); if (/^\+?91\d{10}$/.test(d)) d = d.slice(-10); return d; }
  function mirror(src, key) {
    var dst = proxy(key); if (!dst) return;
    var s = fields(src), t = fields(dst);
    if (t.name && s.name) setVal(t.name, s.name.value.trim());
    if (t.phone && s.phone) setVal(t.phone, digits(s.phone.value));
    if (t.email && s.email) setVal(t.email, s.email.value.trim());
  }
  function formKey(f) { var k = f.getAttribute('data-submit'); return k === 'modal' ? FORM_FOR[st.modal || 'visit'] : FORM_FOR[k]; }
  root.addEventListener('input', function (e) { var f = e.target.closest && e.target.closest('form[data-submit]'); if (f) mirror(f, formKey(f)); });
  function note(f, msg) {
    var p = f.querySelector('.hv-msg');
    if (!p) { p = document.createElement('p'); p.className = 'hv-msg'; p.setAttribute('role', 'alert'); p.style.cssText = 'margin:0;font-size:13px;line-height:1.5;color:#F2C4B4'; var b = f.querySelector('button[type="submit"]'); f.insertBefore(p, b); }
    p.textContent = msg || '';
  }
  function submitLead(f) {
    var key = formKey(f), dst = proxy(key), btn = f.querySelector('button[type="submit"]'), label = btn.textContent;
    note(f, '');
    if (!dst) { note(f, 'The enquiry form could not load. Please call ' + TEL + '.'); return; }
    mirror(f, key);
    var done = false, jp = dst.closest('.hv-pf');
    btn.disabled = true; btn.textContent = 'Sending';
    function reset(msg) { done = true; obs.disconnect(); btn.disabled = false; btn.textContent = label; note(f, msg); }
    var obs = new MutationObserver(function () {
      if (done) return;
      var err = jp.querySelector('.contact-form__input-error.has-errors [data-wp-text], .contact-form__error, .form-errors');
      var msg = err && err.textContent.trim();
      if (msg) { reset(msg); return; }
      if (document.querySelector('.contact-form-submission, .contact-form__success, [class*="submission-success"]') || !document.contains(dst)) {
        done = true; obs.disconnect(); showThanks(f);
      }
    });
    obs.observe(document.body, { childList: true, subtree: true, characterData: true, attributes: true, attributeFilter: ['class'] });
    var sb = dst.querySelector('button[type="submit"], input[type="submit"], .wp-block-button__link, button:not([type="button"])');
    if (sb) sb.click(); else if (dst.requestSubmit) dst.requestSubmit(); else dst.submit();
    // Jetpack redirects to the thank-you page on success. If it does not within 15s, say so.
    setTimeout(function () { if (!done) reset('This is taking longer than usual. Please try again or call ' + TEL + '.'); }, 15000);
  }
  function showThanks(f) {
    var k = f.getAttribute('data-submit');
    if (k === 'hero') { show('heroSent', true); show('heroForm2', false); }
    else if (k === 'final') { show('finalSent', true); show('finalForm', false); }
    else { show('modalSent', true); show('modalForm', false); }
  }

  /* ---------- actions ---------- */
  var mp = function () { return $('img[data-ref="mp"]'); };
  var actions = {
    sig: function (a) { if (st.sig !== +a) { st.sig = +a; renderSig(); } },
    type: function (a) { st.type = +a; st.facing = 0; renderTypes(); },
    facing: function (a) { st.facing = +a; renderTypes(); },
    rev: function (a) { st.rev = +a; renderRev(); },
    amen: function (a) { st.amen = +a; renderAmen(); },
    amenHover: function (a) { if (!mob()) { st.amen = +a; renderAmen(); } },
    faq: function (a) { st.faq = st.faq === +a ? -1 : +a; renderFaq(); },
    interest: function (a) { var i = st.interest.indexOf(a); if (i > -1) st.interest.splice(i, 1); else st.interest.push(a); renderInterest(); },
    night: function (a) { st.night = a === 'true'; renderNight(); },
    modal: function (a) { openModal(a); },
    closeModal: closeModal,
    lb: function (a) { openLb(+a); }, lbClose: closeLb,
    lbPrev: function () { stepLb(-1); }, lbNext: function () { stepLb(1); },
    playVid: playVid,
    mpEnter: function () { if (!mob() && mp()) mp().style.transform = 'scale(1.25)'; },
    mpLeave: function () { if (mp()) mp().style.transform = 'scale(1)'; },
    mpOpen: function () { if (mob()) window.open(mp().getAttribute('src'), '_blank'); },
    mpMove: function (a, el, e) { if (mob() || !mp()) return; var r = el.getBoundingClientRect(); mp().style.transformOrigin = ((e.clientX - r.left) / r.width * 100) + '% ' + ((e.clientY - r.top) / r.height * 100) + '%'; }
  };
  function act(v, el, e) { var i = v.indexOf(':'), n = i < 0 ? v : v.slice(0, i), a = i < 0 ? null : v.slice(i + 1); if (actions[n]) actions[n](a, el, e); }

  root.addEventListener('click', function (e) { var el = e.target.closest('[data-click]'); if (el && root.contains(el)) act(el.getAttribute('data-click'), el, e); });
  root.addEventListener('mouseover', function (e) { var el = e.target.closest('[data-enter]'); if (el && !el.contains(e.relatedTarget)) act(el.getAttribute('data-enter'), el, e); });
  root.addEventListener('mouseout', function (e) { var el = e.target.closest('[data-leave]'); if (el && !el.contains(e.relatedTarget)) act(el.getAttribute('data-leave'), el, e); });
  root.addEventListener('mousemove', function (e) { var el = e.target.closest('[data-move]'); if (el) act(el.getAttribute('data-move'), el, e); });
  root.addEventListener('submit', function (e) {
    var f = e.target.closest('form[data-submit]'); if (!f) return; e.preventDefault(); submitLead(f);
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && st.modal) { closeModal(); return; }
    if (st.lb < 0) return;
    if (e.key === 'Escape') closeLb(); if (e.key === 'ArrowRight') stepLb(1); if (e.key === 'ArrowLeft') stepLb(-1);
  });

  /* ---------- scroll choreography ---------- */
  function measure() {
    var s = $('[data-ref="hSec"]'), t = $('[data-ref="hTrack"]'); if (!s || !t) return;
    if (window.innerWidth < 900 || reduce) { s.style.height = 'auto'; t.style.transform = 'none'; hTotal = 0; return; }
    hTotal = Math.max(0, t.scrollWidth - window.innerWidth);
    s.style.height = (hTotal + window.innerHeight) + 'px';
  }
  function frame() {
    var y = window.scrollY, vh = window.innerHeight, max = document.documentElement.scrollHeight - vh;
    var prog = $('#hv-prog'); if (prog) prog.style.transform = 'scaleX(' + (max > 0 ? y / max : 0) + ')';
    var ph = y > vh * 0.9; if (ph !== st.pastHero) { st.pastHero = ph; renderFloat(); }
    var hi = $('[data-ref="heroImg"]');
    if (hi && !reduce && y < vh * 1.3) hi.style.transform = hi.nextElementSibling.style.transform = 'translate3d(0,' + (y * 0.22).toFixed(1) + 'px,0) scale(' + (1 + y / vh * 0.06).toFixed(4) + ')';
    var s = $('[data-ref="hSec"]'), t = $('[data-ref="hTrack"]');
    if (s && t && hTotal) {
      var p = Math.min(1, Math.max(0, -s.getBoundingClientRect().top / hTotal));
      t.style.transform = 'translate3d(' + (-p * hTotal).toFixed(1) + 'px,0,0)';
      var bar = $('[data-ref="hBar"]'), cnt = $('[data-ref="hCount"]');
      if (bar) bar.style.transform = 'scaleX(' + Math.max(0.08, p) + ')';
      if (cnt) cnt.textContent = pad(Math.min(GALLERY.length, 1 + Math.floor(p * GALLERY.length)));
    }
    var steps = $$('[data-step]'), a = 0;
    steps.forEach(function (el, i) { if (el.getBoundingClientRect().top < vh * 0.5) a = i; });
    if (steps.length && a !== st.story) { st.story = a; renderStory(); }
  }
  var ticking = false;
  window.addEventListener('scroll', function () { if (ticking) return; ticking = true; requestAnimationFrame(function () { ticking = false; frame(); }); }, { passive: true });
  window.addEventListener('resize', function () { measure(); renderSig(); renderStory(); renderFloat(); frame(); });
  window.addEventListener('load', function () { measure(); frame(); });

  function count(el) {
    var node = el.firstChild; if (!node || node.nodeType !== 3) return;
    var target = parseFloat(el.getAttribute('data-count')), dec = +(el.getAttribute('data-dec') || 0), t0 = performance.now(), dur = 1600;
    (function step(t) {
      var p = Math.min(1, (t - t0) / dur), e = 1 - Math.pow(1 - p, 4);
      node.nodeValue = (target * e).toFixed(dec); if (p < 1) requestAnimationFrame(step);
    })(t0);
  }
  function setupReveal() {
    if (reduce || !('IntersectionObserver' in window)) return;
    var ease = 'cubic-bezier(.16,1,.3,1)';
    var io = new IntersectionObserver(function (ents) {
      ents.forEach(function (e) {
        if (!e.isIntersecting) return;
        var el = e.target; el.style.opacity = '1'; el.style.transform = 'none'; el.style.clipPath = 'inset(0 0 0 0)';
        $$('[data-count]', el).forEach(count); io.unobserve(el);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });
    $$('[data-rv]').forEach(function (el) {
      if (el.getBoundingClientRect().top < window.innerHeight * 0.9) { $$('[data-count]', el).forEach(count); return; }
      var k = el.getAttribute('data-rv'), d = +(el.getAttribute('data-d') || 0);
      el.style.transition = 'opacity 1.1s ' + ease + ' ' + d + 'ms, transform 1.4s ' + ease + ' ' + d + 'ms, clip-path 1.6s ' + ease + ' ' + d + 'ms';
      if (k === 'img') { el.style.clipPath = 'inset(14% 0 0 0)'; el.style.opacity = '0.001'; el.style.transform = 'translateY(40px)'; }
      else { el.style.opacity = '0'; el.style.transform = 'translateY(28px)'; }
      io.observe(el);
    });
  }

  var icons = (window.HV_ASSET_BASE || 'assets/') + 'icons/';
  root.setAttribute('data-icons', icons);
  setTimeout(function () { setupReveal(); measure(); frame(); }, 60);
  renderSig(); renderStory(); renderFloat();
  if (!reduce) setInterval(function () {
    st.heroAlt = !st.heroAlt; var hi = $('[data-ref="heroImg"]'); if (hi && hi.nextElementSibling) hi.nextElementSibling.style.opacity = st.heroAlt ? 1 : 0;
  }, 7000);
})();
