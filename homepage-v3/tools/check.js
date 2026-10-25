const { chromium } = require('playwright');
const URL = process.argv[2] || 'http://127.0.0.1:8766/index.html';
const tagp = process.argv[3] || 'new';
const SEL = process.argv[4] || 'section';
(async () => {
  const b = await chromium.launch();
  for (const [name, vp, mobile] of [['d',{width:1440,height:900},false],['m',{width:390,height:844},true]]) {
    const ctx = await b.newContext({ viewport: vp, isMobile: mobile, hasTouch: mobile, reducedMotion: 'reduce' });
    const pg = await ctx.newPage();
    const errs = [], bad = [];
    pg.on('console', m => { if (['error','warning'].includes(m.type())) errs.push(m.type()+': '+m.text().slice(0,200)); });
    pg.on('pageerror', e => errs.push('PAGEERROR '+e.message));
    pg.on('response', r => { if (r.status() >= 400) bad.push(r.status()+' '+r.url().slice(0,140)); });
    await pg.goto(URL, { waitUntil: 'load', timeout: 90000 });
    await pg.waitForTimeout(3500);
    const H = await pg.evaluate(() => document.documentElement.scrollHeight);
    for (let y = 0; y < H; y += 500) { await pg.evaluate(y => window.scrollTo(0, y), y); await pg.waitForTimeout(100); }
    await pg.evaluate(() => window.scrollTo(0, 0)); await pg.waitForTimeout(500);
    const secs = await pg.$$('#tg-home section');
    for (let i = 0; i < secs.length; i++) { await secs[i].scrollIntoViewIfNeeded(); await pg.waitForTimeout(250); await secs[i].screenshot({ path: `${process.env.S}/shots/${tagp}_${name}_${String(i+1).padStart(2,'0')}.png` }); }
    const info = await pg.evaluate(() => ({ h: document.documentElement.scrollHeight, w: document.documentElement.scrollWidth, vw: innerWidth }));
    console.log(name, 'sections', secs.length, JSON.stringify(info), 'errors', JSON.stringify(errs.slice(0,8)), 'bad', JSON.stringify(bad.slice(0,8)));
    await ctx.close();
  }
  await b.close();
})();
