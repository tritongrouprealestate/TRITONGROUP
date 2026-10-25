// Converts the rendered Claude Design prototype into static HTML + deduplicated CSS.
const { chromium } = require('playwright');
const fs = require('fs');
const vm = require('vm');
const S = process.env.S;
const SRC = `${S}/x/triton-homepage-redesign/project/Triton Homepage v3.dc.html`;
const URL = 'http://127.0.0.1:8765/Triton%20Homepage%20v3.dc.html';
const OUT = `${S}/build`;
const src = fs.readFileSync(SRC, 'utf8');

const galAll = vm.runInNewContext('(' + src.match(/const galAll = (\[[\s\S]*?\n    \])\.map/)[1] + ')');
const faqData = vm.runInNewContext('(' + src.match(/const faqData = (\[.*\]);\n/)[1] + ')');

(async () => {
  const b = await chromium.launch();
  const grab = async (w, h, fn) => {
    const ctx = await b.newContext({ viewport: { width: w, height: h }, reducedMotion: 'reduce' });
    const pg = await ctx.newPage();
    await pg.goto(URL, { waitUntil: 'load' });
    await pg.waitForTimeout(3000);
    const r = await pg.evaluate(fn);
    await ctx.close();
    return r;
  };
  const desktop = await grab(1440, 900, () => document.querySelector('#dc-root .sc-host > div').outerHTML);
  const mobSnap = await grab(390, 844, () => {
    const secs = [...document.querySelectorAll('section')];
    return secs[7].querySelector('[data-m="snap"]').outerHTML;
  });

  const pg = await (await b.newContext({ viewport: { width: 1440, height: 900 } })).newPage();
  await pg.setContent('<!doctype html><html><body><div id="c"></div></body></html>');
  const result = await pg.evaluate(({ desktop, mobSnap, galAll, faqData }) => {
    const c = document.getElementById('c');
    c.innerHTML = desktop;
    const root = c.firstElementChild;
    const q = (s, r = root) => r.querySelector(s);
    const qa = (s, r = root) => [...r.querySelectorAll(s)];
    const tag = (el, v) => { if (el) el.setAttribute('data-tg', v); return el; };

    // ---- 1. strip runtime artefacts
    qa('.sc-interp').forEach(s => { s.replaceWith(...s.childNodes); });
    qa('*').forEach(el => {
      [...el.attributes].forEach(a => { if (/^(data-dc|data-sc|hint-)/.test(a.name)) el.removeAttribute(a.name); });
      el.classList.remove('scp0', 'scp1', 'scpa', 'sc-host', 'sc-interp');
      if (!el.classList.length) el.removeAttribute('class');
    });
    qa('canvas').forEach(cv => { cv.removeAttribute('width'); cv.removeAttribute('height'); });

    // ---- 2. hero hooks and runtime-owned styles
    const top = q('#top'); const stage = top.firstElementChild;
    tag(top, 'df-outer'); tag(stage, 'df-stage');
    const cvs = qa('canvas', stage); tag(cvs[0], 'df-glow'); tag(cvs[1], 'df-dots');
    tag(stage.children[2], 'df-spot');
    const copyWrap = q('[data-m="herocopy"]').parentElement; tag(copyWrap, 'df-copy'); copyWrap.style.removeProperty('opacity');
    qa('[data-df-fade]', stage).forEach(e => { ['opacity', 'transform', 'transition'].forEach(p => e.style.removeProperty(p)); });
    const hint = stage.lastElementChild; tag(hint, 'df-hint'); hint.style.removeProperty('opacity');
    const mouse = hint.children[0]; tag(mouse, 'df-mouse'); mouse.style.removeProperty('transform');
    tag(mouse.firstElementChild, 'df-wheel'); tag(hint.children[1], 'df-label');
    tag(root.firstElementChild, 'progress'); // fixed 2px bar

    // ---- 3. counters (final formatted values for no-JS / SEO)
    qa('[data-count]').forEach(e => { e.textContent = Number(e.getAttribute('data-count')).toLocaleString('en-IN'); });

    // ---- 4. gallery
    const gal = q('[data-m="gal"]');
    const galBtns = [...gal.children];
    galBtns.forEach((btn, i) => {
      const g = galAll[i];
      btn.setAttribute('data-tags', g[3].trim());
      const img = btn.querySelector('img');
      const s = img.getAttribute('src');
      btn.setAttribute('data-big', s.startsWith('img/') ? s : s.replace('w=1100', 'w=1900'));
      btn.setAttribute('data-title', g[1].replace(/&amp;/g, '&'));
      btn.setAttribute('data-project', g[2]);
      btn.setAttribute('data-alt', g[6]);
      const arrow = [...btn.querySelectorAll('span')].find(sp => /width:\s*38px/.test(sp.getAttribute('style') || ''));
      if (arrow) arrow.classList.add('tg-gal-arrow');
      if (i > 3) img.setAttribute('loading', 'lazy');
    });
    const gtabs = q('[data-tg-x], [role="tablist"][aria-label="Gallery filter"]');
    tag(gtabs, 'gal-tabs');
    const gtb = [...gtabs.children];
    const diffStyle = (a, b) => { // declarations in a that differ from b
      const parse = s => Object.fromEntries((s || '').split(';').map(x => x.trim()).filter(Boolean).map(x => { const i = x.indexOf(':'); return [x.slice(0, i).trim(), x.slice(i + 1).trim()]; }));
      const A = parse(a), B = parse(b); const out = {};
      for (const k in A) if (A[k] !== B[k]) out[k] = A[k];
      return out;
    };
    const decl = o => Object.entries(o).map(([k, v]) => `${k}:${v}`).join(';');
    const extraRules = []; // [selector, declarations]
    {
      const on = gtb[0].getAttribute('style'), off = gtb[1].getAttribute('style');
      gtb.forEach((t, i) => { t.setAttribute('style', off); t.setAttribute('data-filter', t.textContent.trim()); t.setAttribute('aria-selected', i === 0 ? 'true' : 'false'); });
      extraRules.push(['.tg-gal-tab[aria-selected="true"]', decl(diffStyle(on, off))]);
      gtb.forEach(t => t.classList.add('tg-gal-tab'));
    }

    // ---- 5. events: desktop carousel hooks, ticker, mobile list
    const ev = qa('section').find(s => /Events/.test(s.textContent) && s.querySelector('[role="tablist"]'));
    tag(ev, 'ev');
    const evHead = ev.children[0];
    tag(evHead.querySelector('[data-m="desk"] '), 'ev-count');
    qa('button[aria-label="Previous"]', ev).forEach(x => tag(x, 'ev-prev'));
    qa('button[aria-label="Next"]', ev).forEach(x => tag(x, 'ev-next'));
    const ticker = ev.children[1].firstElementChild; ticker.classList.add('tg-ticker'); ticker.style.removeProperty('transform'); ticker.style.removeProperty('will-change');
    const evDesk = ev.children[2]; evDesk.classList.add('tg-ev-desk');
    tag(evDesk.querySelector('[role="tablist"]'), 'ev-track');
    tag(evDesk.querySelector('[role="tabpanel"]'), 'ev-panel');
    const mobWrap = document.createElement('div'); mobWrap.innerHTML = mobSnap; const mob = mobWrap.firstElementChild;
    mob.querySelectorAll('.sc-interp').forEach(s => s.replaceWith(...s.childNodes));
    mob.querySelectorAll('*').forEach(el => { [...el.attributes].forEach(a => { if (/^(data-dc|data-sc|hint-)/.test(a.name)) el.removeAttribute(a.name); }); el.classList.remove('scp0', 'scp1', 'scpa', 'sc-interp'); if (!el.classList.length) el.removeAttribute('class'); });
    mob.classList.add('tg-ev-mob'); ev.appendChild(mob);

    // ---- 6. story and design hooks
    const story = q('#story'); tag(story.firstElementChild, 'story-frame'); tag(story.firstElementChild.firstElementChild, 'story-img');
    ['clip-path', 'will-change'].forEach(p => story.firstElementChild.style.removeProperty(p));
    ['transform', 'will-change'].forEach(p => story.firstElementChild.firstElementChild.style.removeProperty(p));

    // ---- 7. testimonials bento + featured carousel
    const tsec = q('#testimonials'); const bento = tsec.children[1]; tag(bento, 'bento');
    [...bento.children].forEach((a, i) => a.classList.add('tg-bn' + (i + 1)));
    const feat = bento.children[0]; tag(feat, 'feat');
    const fimgs = qa('img', feat.children[0]).slice(0, 2); fimgs.forEach(im => tag(im, 'feat-img'));
    {
      const on = fimgs[0].getAttribute('style'), off = fimgs[1].getAttribute('style');
      fimgs.forEach(im => im.setAttribute('style', off));
      extraRules.push(['.tg-feat-img.is-on', decl(diffStyle(on, off))]);
      fimgs.forEach(im => im.classList.add('tg-feat-img'));
      fimgs[0].classList.add('is-on');
    }
    const overlay = feat.children[0].lastElementChild; tag(overlay.children[0], 'feat-project');
    const fbtns = qa('button', overlay); tag(fbtns[0], 'feat-prev'); tag(fbtns[1], 'feat-next');
    const fbody = feat.children[1];
    tag(fbody.children[0], 'feat-usp'); tag(fbody.children[1], 'feat-q');
    const fauthor = fbody.children[2]; tag(fauthor.querySelector('img'), 'feat-av');
    tag(fauthor.children[1].children[0], 'feat-name'); tag(fauthor.children[1].children[1], 'feat-role');
    const dots = [...fauthor.children[2].children];
    {
      const on = dots[0].getAttribute('style'), off = dots[1].getAttribute('style');
      dots.forEach(d => { d.setAttribute('style', off); d.classList.add('tg-feat-dot'); tag(d, 'feat-dot'); });
      dots[0].classList.add('is-on');
      extraRules.push(['.tg-feat-dot.is-on', decl(diffStyle(on, off))]);
    }
    // the first feat quote text keeps its curly quotes in the p; keep as authored

    // ---- 8. FAQ
    const faq = q('#faq'); const faqRight = faq.children[1];
    tag(faqRight.children[0], 'faq-tabs'); tag(faqRight.children[1], 'faq-list');
    const ftabs = [...faqRight.children[0].children];
    {
      const on = ftabs[0].getAttribute('style'), off = ftabs[1].getAttribute('style');
      ftabs.forEach((t, i) => { t.setAttribute('style', off); t.classList.add('tg-faq-tab'); t.setAttribute('data-cat', t.firstChild.textContent.trim()); t.setAttribute('aria-selected', i === 0 ? 'true' : 'false'); });
      extraRules.push(['.tg-faq-tab[aria-selected="true"]', decl(diffStyle(on, off))]);
    }
    const list = faqRight.children[1];
    const openItem = list.children[0], closedItem = list.children[1];
    const parts = it => ({ item: it, btn: it.children[0], icon: it.children[0].children[1], body: it.children[1] });
    const O = parts(openItem), C = parts(closedItem);
    extraRules.push(['.tg-faq-item.is-open', decl(diffStyle(O.item.getAttribute('style'), C.item.getAttribute('style')))]);
    extraRules.push(['.tg-faq-item.is-open .tg-faq-icon', decl(diffStyle(O.icon.getAttribute('style'), C.icon.getAttribute('style')))]);
    extraRules.push(['.tg-faq-item.is-open .tg-faq-body', decl(diffStyle(O.body.getAttribute('style'), C.body.getAttribute('style')))]);
    const proto = closedItem.cloneNode(true);
    list.innerHTML = '';
    faqData.forEach((f, i) => {
      const it = proto.cloneNode(true);
      it.classList.add('tg-faq-item'); it.setAttribute('data-cat', f[0]);
      const p = parts(it);
      p.icon.classList.add('tg-faq-icon'); p.body.classList.add('tg-faq-body');
      p.btn.children[0].textContent = f[1];
      p.body.firstElementChild.firstElementChild.textContent = f[2];
      p.btn.setAttribute('aria-expanded', 'false');
      p.btn.setAttribute('aria-controls', 'tg-faq-a' + i); p.btn.id = 'tg-faq-q' + i;
      p.body.id = 'tg-faq-a' + i; p.body.setAttribute('role', 'region'); p.body.setAttribute('aria-labelledby', 'tg-faq-q' + i);
      if (f[0] !== 'General') it.hidden = true;
      if (i === 0) { it.classList.add('is-open'); p.btn.setAttribute('aria-expanded', 'true'); }
      list.appendChild(it);
    });
    extraRules.push(['.tg-faq-item[hidden]', 'display:none']);

    // ---- 9. lightbox (closed by default; image node created by JS)
    const lb = q('[role="dialog"]'); tag(lb, 'lb');
    lb.setAttribute('aria-hidden', 'true');
    const lbs = lb.getAttribute('style'); lb.setAttribute('style', lbs.replace(/opacity:[^;]+;?/, '').replace(/pointer-events:[^;]+;?/, ''));
    const cap = q('figcaption', lb); tag(cap.children[0].children[0], 'lb-title'); tag(cap.children[0].children[1], 'lb-meta');
    const lbb = qa('button', cap); tag(lbb[0], 'lb-prev'); tag(lbb[1], 'lb-next'); tag(lbb[2], 'lb-close');
    extraRules.push(['.tg-lb', 'opacity:0;pointer-events:none']);
    extraRules.push(['.tg-lb.is-open', 'opacity:1;pointer-events:auto']);
    lb.classList.add('tg-lb'); tag(lb.querySelector('figure'), 'lb-fig');

    // ---- 10. Slugs for responsive helper
    qa('section').forEach(s => s.classList.add('tg-sec'));
    top.classList.add('tg-hero');

    // ---- 11. classify inline styles
    const map = new Map(); const rules = [];
    const getCls = (st, hv) => { const k = st + '||' + (hv || ''); if (!map.has(k)) { const n = 's' + map.size.toString(36); map.set(k, n); rules.push([n, st, hv]); } return map.get(k); };
    qa('*').forEach(el => {
      const st = el.getAttribute('style'); const hv = el.getAttribute('style-hover');
      if (el.tagName === 'A' && !/(^|;\s*)color:/.test(st || '')) el.classList.add('tg-a-hov');
      if (st || hv) { el.classList.add(getCls(st || '', hv || '')); }
      el.removeAttribute('style'); el.removeAttribute('style-hover');
    });
    // mobile list classification uses the same map (done above since appended into root)
    // normalise accidental duplicates of hint text
    const html = root.outerHTML;
    return { html, rules, extraRules, nodes: qa('*').length };
  }, { desktop, mobSnap, galAll, faqData });

  fs.mkdirSync(OUT, { recursive: true });
  fs.writeFileSync(`${OUT}/body.raw.html`, result.html);
  fs.writeFileSync(`${OUT}/rules.json`, JSON.stringify({ rules: result.rules, extraRules: result.extraRules }));
  console.log('nodes', result.nodes, 'classes', result.rules.length, 'html bytes', result.html.length);
  await b.close();
})();
