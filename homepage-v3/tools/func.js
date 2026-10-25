const { chromium } = require('playwright');
const URL = process.argv[2] || 'http://127.0.0.1:8766/index.html';
(async () => {
  const b = await chromium.launch();
  const ctx = await b.newContext({ viewport: { width: 1440, height: 900 } });
  const pg = await ctx.newPage(); const errs = [];
  pg.on('pageerror', e => errs.push(e.message)); pg.on('console', m => { if (m.type()==='error') errs.push(m.text().slice(0,160)); });
  await pg.goto(URL, { waitUntil: 'load' }); await pg.waitForTimeout(3500);
  const R = {};
  // hero painted?
  R.heroPixels = await pg.evaluate(() => { const c = document.querySelector('[data-tg=df-dots]'); const d = c.getContext('2d').getImageData(0,0,c.width,c.height).data; let n=0; for (let i=3;i<d.length;i+=4*50) if (d[i]>0) n++; return n; });
  R.heroCopyVisible = await pg.evaluate(() => getComputedStyle(document.querySelector('[data-df-fade]')).opacity);
  await pg.evaluate(() => window.scrollTo(0, 500)); await pg.waitForTimeout(600);
  R.copyFadedAtScroll = await pg.evaluate(() => document.querySelector('[data-tg=df-copy]').style.opacity);
  R.progress = await pg.evaluate(() => document.querySelector('[data-tg=progress]').style.transform);
  // stats counter
  await pg.evaluate(() => document.querySelector('[data-count]').scrollIntoView({block:'center'})); await pg.waitForTimeout(2500);
  R.counters = await pg.evaluate(() => [...document.querySelectorAll('[data-count]')].slice(0,3).map(e => e.textContent));
  // gallery
  await pg.evaluate(() => document.querySelector('#gallery').scrollIntoView()); await pg.waitForTimeout(600);
  await pg.click('.tg-gal-tab[data-filter="Aero Gardens"]');
  R.galAero = await pg.evaluate(() => [...document.querySelectorAll('#gallery [data-m=gal] > button')].filter(b => !b.hidden).length);
  await pg.click('.tg-gal-tab[data-filter="All"]');
  R.galAll = await pg.evaluate(() => [...document.querySelectorAll('#gallery [data-m=gal] > button')].filter(b => !b.hidden).length);
  await pg.click('#gallery [data-m=gal] > button:nth-child(2)'); await pg.waitForTimeout(700);
  R.lb = await pg.evaluate(() => ({ open: document.querySelector('[data-tg=lb]').classList.contains('is-open'), meta: document.querySelector('[data-tg=lb-meta]').textContent, bg: (document.querySelector('.tg-lb-img')||{style:{}}).style.backgroundImage.slice(0,70) }));
  await pg.keyboard.press('ArrowRight'); await pg.waitForTimeout(200);
  R.lbNext = await pg.evaluate(() => document.querySelector('[data-tg=lb-meta]').textContent);
  await pg.keyboard.press('Escape'); await pg.waitForTimeout(700);
  R.lbClosed = await pg.evaluate(() => !document.querySelector('[data-tg=lb]').classList.contains('is-open'));
  // events
  await pg.evaluate(() => document.querySelector('[data-tg=ev]').scrollIntoView()); await pg.waitForTimeout(500);
  await pg.click('[data-tg=ev-next]'); await pg.waitForTimeout(1500);
  R.evCount1 = await pg.evaluate(() => document.querySelector('[data-tg=ev-count]').textContent);
  await pg.click('[data-tg=ev-prev]'); await pg.waitForTimeout(1500); await pg.click('[data-tg=ev-prev]'); await pg.waitForTimeout(1500);
  R.evCountPrev = await pg.evaluate(() => document.querySelector('[data-tg=ev-count]').textContent);
  await pg.screenshot({ path: process.env.S + '/shots/func_events.png' });
  // feat
  await pg.evaluate(() => document.querySelector('[data-tg=feat]').scrollIntoView({block:'center'})); await pg.waitForTimeout(800);
  await pg.click('[data-tg=feat-next]'); await pg.waitForTimeout(300);
  R.feat = await pg.evaluate(() => document.querySelector('[data-tg=feat-name]').textContent);
  // faq
  await pg.evaluate(() => document.querySelector('#faq').scrollIntoView()); await pg.waitForTimeout(600);
  await pg.click('.tg-faq-tab[data-cat="Buying"]');
  R.faqBuying = await pg.evaluate(() => ({ visible: [...document.querySelectorAll('.tg-faq-item')].filter(i => !i.hidden).length, open: [...document.querySelectorAll('.tg-faq-item.is-open')].map(i => i.querySelector('button span').textContent) }));
  await pg.locator('.tg-faq-item:not([hidden]) button').nth(1).click(); await pg.waitForTimeout(400);
  R.faqToggle = await pg.evaluate(() => [...document.querySelectorAll('.tg-faq-item.is-open')].length);
  // horizontal overflow
  R.overflowX = await pg.evaluate(() => document.documentElement.scrollWidth - innerWidth);
  R.errors = errs;
  console.log(JSON.stringify(R, null, 1));
  await b.close();
})();
