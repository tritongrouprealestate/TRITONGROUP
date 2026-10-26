// Builds home.css and the final HTML fragment from the snapshot output.
const fs = require('fs');
const S = process.env.S;
const B = `${S}/build`;
const DS = `${S}/x/triton-homepage-redesign/project/_ds/triton-group-design-system-2868fa51-c82e-4e41-aad7-4299a850f52f/tokens`;
const SRC = fs.readFileSync(`${S}/x/triton-homepage-redesign/project/Triton Homepage v3.dc.html`, 'utf8');
const { rules, extraRules } = JSON.parse(fs.readFileSync(`${B}/rules.json`, 'utf8'));
let body = fs.readFileSync(`${B}/body.raw.html`, 'utf8');

// ---------- CSS
const prefixFix = decl => decl
  .replace(/(^|;)\s*backdrop-filter:\s*([^;]+)/g, (m, a, v) => `${a}-webkit-backdrop-filter:${v};backdrop-filter:${v}`)
  .replace(/(^|;)\s*background-clip:\s*text/g, (m, a) => `${a}-webkit-background-clip:text;background-clip:text`);
const tokens = ['colors', 'typography', 'spacing', 'motion', 'elevation']
  .map(n => fs.readFileSync(`${DS}/${n}.css`, 'utf8').replace(/\/\*[\s\S]*?\*\//g, '').replace(/:root\s*\{/g, '.tg-home{')).join('\n');

const fonts = `
@font-face{font-family:"Gloock";font-style:normal;font-weight:400;font-display:swap;src:url(fonts/gloock-latin.woff2) format("woff2");unicode-range:U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+0304,U+0308,U+0329,U+2000-206F,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD}
@font-face{font-family:"Gloock";font-style:normal;font-weight:400;font-display:swap;src:url(fonts/gloock-latin-ext.woff2) format("woff2");unicode-range:U+0100-02BA,U+02BD-02C5,U+02C7-02CC,U+02CE-02D7,U+02DD-02FF,U+0304,U+0308,U+0329,U+1D00-1DBF,U+1E00-1E9F,U+1EF2-1EFF,U+2020,U+20A0-20AB,U+20AD-20C4,U+2113,U+2C60-2C7F,U+A720-A7FF}
@font-face{font-family:"Instrument Sans";font-style:normal;font-weight:400 600;font-display:swap;src:url(fonts/instrument-latin.woff2) format("woff2");unicode-range:U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+0304,U+0308,U+0329,U+2000-206F,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD}
@font-face{font-family:"Instrument Sans";font-style:normal;font-weight:400 600;font-display:swap;src:url(fonts/instrument-latin-ext.woff2) format("woff2");unicode-range:U+0100-02BA,U+02BD-02C5,U+02C7-02CC,U+02CE-02D7,U+02DD-02FF,U+0304,U+0308,U+0329,U+1D00-1DBF,U+1E00-1E9F,U+1EF2-1EFF,U+2020,U+20A0-20AB,U+20AD-20C4,U+2113,U+2C60-2C7F,U+A720-A7FF}
`.trim();

const base = `
.tg-home{position:relative;display:block;width:100%;max-width:none;margin:0!important;padding:0!important;overflow-x:clip;background:#04110F;color:var(--text-body);font-family:var(--font-sans);font-size:var(--type-body);font-weight:400;line-height:var(--leading-body);letter-spacing:0;font-variant-numeric:lining-nums tabular-nums;-webkit-font-smoothing:antialiased;-webkit-text-size-adjust:100%;text-align:left}
.tg-home *,.tg-home *::before,.tg-home *::after{box-sizing:border-box}
.tg-home h1,.tg-home h2,.tg-home h3,.tg-home h4{font-family:var(--font-display);font-weight:400;letter-spacing:-.015em;line-height:1.02;margin:0;padding:0;text-transform:none;text-wrap:pretty}
.tg-home p,.tg-home figure,.tg-home blockquote{margin:0;padding:0}
.tg-home section{display:block;margin:0;max-width:none}
.tg-home a{color:inherit;text-decoration:none;box-shadow:none;border:0}
.tg-home a.tg-a-hov:hover{color:var(--teal-500)}
.tg-home img{display:block;max-width:100%;height:auto;border:0;border-radius:0;box-shadow:none}
.tg-home button{font:inherit;color:inherit;background:none;border:0;padding:0;margin:0;border-radius:0;box-shadow:none;text-transform:none;letter-spacing:normal;min-height:0;min-width:0;line-height:inherit;appearance:none;-webkit-appearance:none}
.tg-home button:focus-visible,.tg-home a:focus-visible{outline:2px solid var(--teal-200);outline-offset:3px}
.tg-home canvas{display:block}
.tg-home ::selection{background:var(--teal-500);color:var(--paper-100)}
.tg-home [hidden]{display:none!important}
`.trim();

// helmet media block from the prototype, scoped
const helm = SRC.match(/@media \(max-width:760px\)\{([\s\S]*?)\n    \}\n/)[1];
const scopedMedia = '@media (max-width:760px){' + helm
  .replace(/section\[data-screen-label\]:not\(#top\)/g, '.tg-home section.tg-sec:not(.tg-hero)')
  .replace(/#top>div/g, '.tg-home .tg-hero>div').replace(/#top\{/g, '.tg-home .tg-hero{')
  .replace(/#why \[data-m="snap"\]/g, '.tg-home #why [data-m="snap"]')
  .replace(/(^|\n)(\s*)\[data-m=/g, '$1$2.tg-home [data-m=')
  .replace(/button span\[style\*="width:38px"\]/g, 'button .tg-gal-arrow')
  + '\n}';
const scopedStatic = `.tg-home [data-m="snap"]::-webkit-scrollbar,.tg-home [data-m="tabs"]::-webkit-scrollbar{display:none}`;

const classCss = rules.map(([n, st, hv]) => `.tg-home .${n}{${prefixFix(st)}}` + (hv ? `\n.tg-home .${n}:hover{${prefixFix(hv)}}` : '')).join('\n');
const extraCss = extraRules.map(([sel, d]) => `.tg-home ${sel}{${prefixFix(d)}}`).join('\n');

const motion = `
.tg-has-js .tg-home [data-reveal]{opacity:0;transform:translateY(28px);transition:opacity 1100ms cubic-bezier(.16,1,.3,1),transform 1100ms cubic-bezier(.16,1,.3,1)}
.tg-has-js .tg-home [data-reveal].is-in{opacity:1;transform:none}
.tg-home [data-df-fade]{opacity:0;transform:translateY(10px);animation:tg-fi 900ms cubic-bezier(.16,1,.3,1) 450ms forwards}
.tg-home [data-df-fade]+[data-df-fade]{animation-delay:570ms}
@keyframes tg-fi{to{opacity:1;transform:none}}
.tg-home .tg-ticker{animation:tg-tick 40s linear infinite}
@keyframes tg-tick{to{transform:translate3d(-50%,0,0)}}
.tg-home .tg-ev-mob{display:none}
.tg-home .tg-lb-img{width:min(1400px,calc(100vw - 64px));height:76vh;background-size:contain;background-position:center;background-repeat:no-repeat;border-radius:16px}
.tg-home .tg-faq-item .tg-faq-body{grid-template-rows:0fr}
.tg-home .tg-faq-item.is-open .tg-faq-body{grid-template-rows:1fr}
.tg-home .tg-ev-track-still,.tg-home .tg-ev-track-still *{transition:none!important}
.tg-home .tg-sig{position:relative;overflow:hidden;display:grid;grid-template-columns:minmax(0,1.6fr) minmax(0,1fr);gap:clamp(28px,5vw,80px);align-items:end;padding:clamp(40px,6vw,88px) clamp(24px,5vw,80px);border-radius:28px;border:1px solid rgba(111,203,176,.18);background:radial-gradient(60% 120% at 8% 0%,rgba(111,203,176,.17),transparent 62%),radial-gradient(55% 100% at 100% 100%,rgba(27,86,74,.6),transparent 66%),linear-gradient(160deg,#0E322C 0%,#071A17 55%,#04110F 100%);box-shadow:inset 0 1px 0 rgba(255,255,255,.09),0 40px 90px rgba(0,0,0,.45)}
.tg-home .tg-sig:before{content:"";position:absolute;inset:0;pointer-events:none;background:repeating-linear-gradient(90deg,rgba(159,186,178,.07) 0 1px,transparent 1px 96px),repeating-linear-gradient(0deg,rgba(159,186,178,.05) 0 1px,transparent 1px 96px);-webkit-mask-image:radial-gradient(80% 90% at 20% 30%,#000,transparent 75%);mask-image:radial-gradient(80% 90% at 20% 30%,#000,transparent 75%)}
.tg-home .tg-sig:after{content:"";position:absolute;right:-10%;top:-55%;width:clamp(280px,46vw,640px);aspect-ratio:1;border-radius:50%;pointer-events:none;border:1px solid rgba(159,186,178,.16);box-shadow:0 0 0 clamp(26px,4vw,56px) rgba(159,186,178,.035),0 0 0 clamp(52px,8vw,112px) rgba(159,186,178,.025)}
.tg-home .tg-sig>*{position:relative;z-index:1}
.tg-home .tg-sig-title{display:flex;flex-direction:column;align-items:flex-start;gap:clamp(6px,1vw,14px);margin:0}
.tg-home .tg-sig-a{display:flex;align-items:center;gap:16px;font-family:var(--font-sans);font-size:clamp(.78rem,1.2vw,1rem);font-weight:500;letter-spacing:.38em;text-transform:uppercase;color:var(--teal-200)}
.tg-home .tg-sig-a:before{content:"";width:clamp(32px,5vw,72px);height:1px;background:linear-gradient(90deg,transparent,var(--teal-200))}
.tg-home .tg-sig-b{font-family:var(--font-display);font-weight:400;font-size:clamp(3.4rem,11.5vw,10rem);line-height:.92;letter-spacing:-.035em;padding:0 .06em .14em 0;background:linear-gradient(100deg,#6FCBB0 0%,#FFFFFF 32%,#DCEBE6 52%,#6FCBB0 100%) 0 0/230% 100%;-webkit-background-clip:text;background-clip:text;color:transparent;animation:tg-shine 9s ease-in-out infinite}
@keyframes tg-shine{0%,100%{background-position:0 0}50%{background-position:100% 0}}
.tg-home .tg-sig-side{display:flex;flex-direction:column;align-items:flex-start;gap:20px;padding-bottom:.6em}
.tg-home .tg-sig-lead{font-size:var(--type-lead);line-height:1.5;color:var(--teal-100);max-width:30ch}
.tg-home .tg-sig-meta{display:flex;flex-wrap:wrap;gap:8px 22px;margin:0;padding:0;list-style:none;font-size:11px;font-weight:500;letter-spacing:.22em;text-transform:uppercase;color:var(--teal-200)}
.tg-home .tg-sig-meta li{display:flex;align-items:baseline}
.tg-home .tg-sig-meta b{font-family:var(--font-display);font-weight:400;font-size:1.9em;letter-spacing:0;color:var(--paper-100);margin-right:.35em}
.tg-has-js .tg-home .tg-sig-b{clip-path:inset(-8% 100% -12% 0);transition:clip-path 1.5s cubic-bezier(.16,1,.3,1) .15s}
.tg-has-js .tg-home .tg-sig.is-in .tg-sig-b{clip-path:inset(-8% -4% -12% 0)}
@media (max-width:860px){.tg-home .tg-sig{grid-template-columns:minmax(0,1fr);align-items:start;border-radius:22px}.tg-home .tg-sig-side{padding-bottom:0}}
.tg-home .tg-tq-row{display:contents}
@media (max-width:759.98px){
.tg-home .s16{grid-template-columns:repeat(3,minmax(0,1fr))!important;gap:0 14px!important}
.tg-home .s16 .s17{padding-top:18px!important;gap:5px!important}
.tg-home .s16 .s18{white-space:normal!important;font-size:clamp(.98rem,4.4vw,1.15rem)!important;line-height:1.18!important}
.tg-home .s16 .s17 .s19{font-size:12px!important;line-height:1.3}
.tg-home .tg-tq-row{display:flex;gap:12px;overflow-x:auto;scroll-snap-type:x mandatory;margin:0 calc(var(--page-margin,20px)*-1);padding:0 var(--page-margin,20px) 8px;scrollbar-width:none;-webkit-overflow-scrolling:touch}
.tg-home .tg-tq-row::-webkit-scrollbar{display:none}
.tg-home .tg-tq-row>article{flex:0 0 82%;scroll-snap-align:center;min-width:0}
.tg-home [data-tg="feat"]>div:first-child{min-height:210px!important;max-height:260px!important}
.tg-home [data-tg="bento"]>.tg-bn3{min-height:0!important}
}
@media (max-width:759.98px){
.tg-home .tg-ev-mob{margin-left:0!important;margin-right:0!important}
.tg-home .tg-cta-col{flex-direction:column!important;align-items:stretch!important}
.tg-home .tg-cta-col>a{justify-content:center;text-align:center}
.tg-home .tg-why{padding-left:0!important;border-left:0!important;border-top:1px solid var(--line-on-inverse);padding-top:20px!important}
.tg-home .tg-why-foot{flex-direction:column!important;align-items:stretch!important;gap:18px!important}
.tg-home .tg-why-foot>a{justify-content:center;text-align:center}
}
@media (prefers-reduced-motion:reduce){.tg-home .tg-sig-b{animation:none;clip-path:none!important;transition:none}}
@media (prefers-reduced-motion:reduce){
.tg-has-js .tg-home [data-reveal]{opacity:1;transform:none;transition:none}
.tg-home [data-df-fade]{opacity:1;transform:none;animation:none}
.tg-home .tg-ticker{animation:none}
.tg-home *{scroll-behavior:auto!important}
}
@media (max-width:759.98px){
.tg-home .tg-ev-desk{display:none!important}
.tg-home .tg-ev-mob{display:flex!important}
}
@media (min-width:760px) and (max-width:1199.98px){
.tg-home [data-tg="bento"]{grid-template-columns:minmax(0,1fr) minmax(0,1fr)!important}
.tg-home [data-tg="bento"]>.tg-bn1{grid-area:1/1/2/3!important}
.tg-home [data-tg="bento"]>.tg-bn2,.tg-home [data-tg="bento"]>.tg-bn3,.tg-home [data-tg="bento"]>.tg-bn4,.tg-home [data-tg="bento"]>.tg-bn5{grid-area:auto!important}
.tg-home [data-tg="bento"]>.tg-bn6{grid-area:auto/1/auto/3!important}
}
@media (max-width:759.98px){
.tg-home [data-tg="bento"]{grid-template-columns:minmax(0,1fr)!important}
.tg-home [data-tg="bento"]>*{grid-area:auto!important}
}
@media (max-width:1099.98px){.tg-home [data-m="sticky"]{position:static!important}}
`.trim();

const css = [fonts, tokens, base, scopedStatic, scopedMedia, classCss, extraCss, motion].join('\n');
fs.writeFileSync(`${B}/home.css`, css);

// ---------- HTML
body = body.replace(/^<div\b[^>]*>/, '<div class="tg-home alignfull" id="tg-home">');
body = body.replace(/(src|data-big)="img\//g, '$1="%%A%%/img/').replace(/url\(img\//g, 'url(img/');
// JSON-LD
const ld = [...SRC.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map(m => m[1]);
ld.forEach(j => JSON.parse(j));
const ldHtml = ld.map(j => `<script type="application/ld+json">${j}</script>`).join('\n');
const html = `<link rel="preload" as="font" type="font/woff2" href="%%A%%/fonts/gloock-latin.woff2" crossorigin>\n<link rel="preload" as="font" type="font/woff2" href="%%A%%/fonts/instrument-latin.woff2" crossorigin>\n<link rel="stylesheet" href="%%A%%/home.css?ver=%%V%%">\n<script>(function(d){d.classList.add('tg-has-js');setTimeout(function(){if(!window.__tgReady)d.classList.remove('tg-has-js')},6000)})(document.documentElement)</script>\n${body}\n${ldHtml}\n<script src="%%A%%/home.js?ver=%%V%%" defer></script>`;
fs.writeFileSync(`${B}/home.fragment.html`, html);
console.log('css', css.length, 'html', html.length, 'ld blocks', ld.length);
