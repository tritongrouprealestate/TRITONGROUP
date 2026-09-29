# Triton Humming Valley — project handover

Paste this whole file into a new chat and the next session has everything it
needs. Written 8 September 2026.

---

## 1 · What this is

A single-page marketing site for **Triton Humming Valley** — 30 Bali-inspired
boutique villas in North Bangalore, at the foothills of Nandi Hills, developed
by **Triton Group**. It sells by private viewing, so every part of the page
exists to get someone to ask for one.

It is **plain static files**. No Node, no build step on the server, no
framework. The client uploads the folder to **cPanel File Manager**.

| | |
|---|---|
| Live at | `villas.tritongroup.in` |
| Canonical URL in the markup | `https://tritongroup.in/triton-humming-valley-villas-in-nandi-hills-bangalore/` |
| Git repo | `tritongrouprealestate/tritongroup` |
| Branch — **never push anywhere else** | `claude/frontend-design-skill-0ufglv` |
| Deployable folder | `triton-humming-valley/` |
| Latest commit | `e4fddb1` "No gold, a header that shows, and a page a phone can use" |
| Preview artifact | https://claude.ai/code/artifact/d708e63f-d708-4c07-93f3-3439f3a40f8d |
| Parent site | https://tritongroup.in/ |

---

## 2 · File map

```
triton-humming-valley/
  index.html            the page. ~50KB. Sections in scroll order below.
  css/src.css           EDIT THIS. Tailwind v4 source + all hand-written CSS.
  css/styles.css        COMPILED — never hand-edit, it is overwritten.
  js/site.js            all behaviour, and the DATA object at the top.
  js/gsap.min.js        bundled, not from a CDN
  js/ScrollTrigger.min.js
  js/lenis.min.js       smooth scroll, v1.3.26
  fonts/*.woff2         Cormorant Garamond + Jost, self-hosted
  images/               29 files — photographs, favicons, the logo mark
  submit.php            enquiry endpoint: emails the lead + posts to Leadi5
  config.php            LIVE CREDENTIAL. Gitignored. Not in any archive.
  config.sample.php     the template to copy
  mailtest.php          one-off diagnostic — delete after use
  .htaccess             cache headers, denies config.php and *.log
  robots.txt, sitemap.xml
```

**Section order in `index.html`:**
`#hero` → `#film` → `#approach` (reach dial) → `#land` → `#views` (coverflow)
→ `#masterplan` → `#villas` → `#inside` / `#choreo` → `#ownership` →
`#case` → `#assurance` → `#viewing` → `#site-footer` → `#enquiry-modal` →
`#video-modal` → `#lightbox`

---

## 3 · The build command

Tailwind CSS v4, CSS-first config. **Run it from the repository root**, not
from inside `triton-humming-valley/` — that is the single most repeated
mistake in this project and it fails silently (or claims the input file does
not exist):

```bash
cd /path/to/repo-root
npx @tailwindcss/cli@4 -i triton-humming-valley/css/src.css \
                       -o triton-humming-valley/css/styles.css --minify
```

`src.css` declares `@source "../index.html"` and `@source "../js/site.js"`, so
any Tailwind class written in the JS template strings is picked up.

**Bump the cache-buster after any CSS change**: `index.html` links
`css/styles.css?v=3`. Images use `?v=BUILD` from `const BUILD = '2'` near the
top of the main IIFE in `site.js`.

---

## 4 · `DATA` — the single source of truth

At the top of `js/site.js`, above every IIFE. Change a fact here and it
updates everywhere on the page.

```js
rera:      'PRM/KA/RERA/1254/460/PR/131224/007292'   // confirmed by Triton
possession:'October 2026'
villaCount: 30
inventoryHeading: 'Only Few Villas Remaining!'
contact:   { phone: '+91 90366 82626', callPhone: null,
             email: 'sales@tritongroup.in' }
whatsapp:  { number: '919036682626', message: '…' }   // digits only, no +
mapUrl:    'https://maps.app.goo.gl/qKgAu1p8eE1tc8KK6'
```

Then: `reach` (4 drive times + compass bearings), `villas` (3 types),
`plots` (30), `choreography` (4), `ownership` (3), `coverflow` (7),
`gallery` (6).

### Villa types — read off the client's own floor-plan sheets

| | Built-up sq ft | Plot sq ft | Price (all inclusive) | Facing |
|---|---|---|---|---|
| 3 BHK | 2,350–2,700 | 1,000–1,115 | ₹2.9 Cr | North and east |
| 4 BHK | 3,474–3,724 | 1,356–1,389 | ₹3.5 Cr | North and east |
| 5 BHK | 4,448 | 1,555 | ₹4.5 Cr | North |

All three run over three levels with a lift to every floor, a 15 ft indoor
waterfall, a roof terrace with a plunge pool, a bar counter and a covered car
porch.

### Inventory — 5 of 30 available

**Available: 8, 11, 20, 22, 23.** Everything else is sold (25).

| Plot | Type | Built-up | Plot | Row |
|---|---|---|---|---|
| 8 | 3 BHK | 2,660 | — | North |
| 11 | 5 BHK | 4,448 | 1,555 | Central |
| 20 | 4 BHK | 3,724 | 1,389 | Central |
| 22 | 3 BHK | 2,680 | 1,080 | South, clubhouse side |
| 23 | 3 BHK | 2,680 | 1,080 | South, clubhouse side |

⚠️ The client once said "two 3 BHK and two 4 BHK available". **Their own floor
plan sheets contradict that** — it is three 3 BHK (8, 22, 23), one 4 BHK (20)
and one 5 BHK (11). The sheets were treated as authoritative. Worth
re-confirming with the sales team.

⚠️ The `sq` values in `DATA.plots` are **built-up** areas, not plot areas.
Villa 11's sheet reads 1,555 plot / 4,448 built-up.

---

## 5 · Design system

### Palette — black, green, teal, white. **No gold, no yellow.**

Tokens live in the `@theme` block of `css/src.css`. Every ratio below was
computed, not eyeballed.

```
--color-obsidian   #03100F   deepest ground
--color-night      #061A18   main dark ground        cloud on it 16.4:1
--color-night-2    #0B2A25   pine — panels on dark
--color-teal       #0C3330   the one teal surface
--color-haze       #A3B7AF   secondary text on dark  8.5:1 on night
--color-cloud      #F3F5F2   near-white
--color-cloud-2    #E4EAE4
--color-ink        #08191A   text on light           16.5:1 on cloud
--color-mist       #55676A   secondary on light      5.4:1
--color-frond      #16564A   jade, light-ground rules 7.8:1
--color-frond-2    #0F3F37
--color-dawn       #F5F7F4   THE PRIMARY ACTION (was gold) 16.7:1 on night
--color-dawn-deep  #0B3B33   the same on light       11.4:1 on cloud
--color-mint       #6FCBB0   the only accent left    9.3:1 on night
--color-mint-deep  #0E6E5A   the same on light       5.6:1 on cloud
```

The token *names* `dawn` / `dawn-deep` are historical — they used to be gold.
They are used as Tailwind classes (`btn-dawn`, `text-dawn-deep`) across
`index.html` and `site.js`, which is why they were re-valued rather than
renamed. `dawn` now means "the primary action colour".

**Mint is only ever used for information, never decoration** — section
eyebrows and availability. Everything else gets its emphasis from white on
dark and ink on light.

Kept deliberately: `#25D366` WhatsApp brand green, `#F0806A` form-error coral.

### Type

- **Display: Cormorant Garamond** — variable 300–600, self-hosted.
  Chosen because the Triton mark is an inscriptional Roman capital and
  Cormorant is the Garamond revival that holds that flared, high-contrast
  weight at display size.
- **Body/UI: Jost** — variable 200–600. A Futura, which is what the villas
  are: flat planes, right angles, no ornament.
- Headings are weight **500**, not 400 — a Garamond at 400 goes thin the
  moment it is set in white on black.
- `font-variant-numeric: lining-nums tabular-nums` is set on `body`.
  **Cormorant ships old-style figures by default**, so 15 renders with the 1
  at x-height and the 5 below the baseline. Every figure on this page is a
  price, an area, a drive time or a plot number.
- Steps 1–4 and `--display` were lifted ~12% when moving off Marcellus,
  because Cormorant's cap height is that much shorter at the same px size.

### Font files and the rupee-sign trick

`fonts/` holds six files. Only three are ever fetched (64 KB total):
`cormorant-latin`, `jost-latin`, `cormorant-symbols`.

**`cormorant-symbols.woff2` is 1.5 KB and carries exactly two glyphs: ₹ and
→.** The rupee sign lives in Google's latin-ext subset, so a page whose only
non-latin character is ₹ was downloading the whole Central European alphabet
(33 KB) to draw it. The symbols face is declared *after* latin-ext so it wins
the overlap. `latin-ext` stays defined for the day a name needs an accent —
it simply is not fetched.

### Spacing

- `--rail`: 7.5rem ≥1024px, 4.5rem default, **0 below 768px**. The decorative
  hairline rail is a desktop device; on a phone it was spending 44 of 390
  pixels and indenting every heading behind it.
- Section padding uses `py-[clamp(min,vh,max)]` utilities in the markup. The
  **min is what a phone gets** — those were retuned down (5rem → 3.25rem etc.)
  because eleven sections at 5rem top and bottom is 1,760px of nothing.

### Buttons

Pills (`border-radius: 980px`). `.btn-dawn` = filled white on dark / the
primary action. `.btn-quiet` = translucent outline. `.btn-ink` = dark fill on
light grounds. 48px min height, 52px from 640px up.

---

## 6 · The logo

`images/triton-mark.svg` — the crowned "T", **traced from the client's own
artwork** and normalised to a `viewBox="0 0 100 146.97"`. It is inlined once
in `index.html` as `<symbol id="triton-mark">` and referenced with
`<use href="#triton-mark">`, so it takes `currentColor` and costs 3 KB for the
whole page rather than per placement.

**It appears in exactly two places: the header and the footer.** The client
asked for it nowhere else. It is white.

Favicons are generated from it: `favicon.svg`, `favicon-32.png`,
`favicon-180.png`, `favicon-512.png`.

### ⚠️ Open item — the full wordmark

The client's brand folder in Google Drive has the complete lockup
(mark + "TRITON" + the tagline *Villas. Apartments. Commercial.*), but **the
Google Drive MCP connector truncates image downloads above about 5 KB**, and
`tritongroup.in` is blocked by the agent proxy. Only the mark came through
intact (from a 1,468-byte file, `Artboard 3 (1).png`).

So **the "Triton / Humming Valley" wordmark beside the mark is typeset in
Cormorant + Jost, not the client's artwork.** If the client drops
`triton-logo.png` into `images/`, swap the typeset half for the real one.

Brand gold, for reference, is **`#DFB441`** — sampled from the artwork. It is
no longer used anywhere on the site, by request.

Drive file IDs, in case a future session has a working connector:

- `1GMJFMt2UOpGYK1pSQKS4FM5QZuQ5ZnMI` — "TRITON NEW LOGO", 143 KB
- `12Hngtwm7qWEg4_D3hyBWx33YMvZYazmp` — "Triton white@8x.png", 34 KB
- `1Nsem9HSsrv16bUFXAJKFqGXpRNT4t5uw` — "Artboard 3 (1).png", 1.5 KB (the mark, this one works)
- `1unUcgt4G87Q5YXW24KIHyGZDizzSb5JH` — "Logos Only.zip", 121 KB
- Brand folder: `1RFAHF-8_fibqjPV2vL5jfNr-WP_5E5bU`

---

## 7 · Architecture and behaviour

- **GSAP 3 + ScrollTrigger** for every scroll effect, with `gsap.matchMedia()`
  splitting desktop and mobile geometry.
- **Lenis 1.3.26** smooth scroll, driven from `gsap.ticker`.
  **Lenis owns the page scroll.** Any modal, sheet or lightbox must call
  `window.lenisInstance.stop()` / `.start()`. Setting `body.style.overflow`
  does nothing on its own — the smooth-scroll layer keeps going underneath.
- **CSS `position: sticky`** for the choreography pin, not ScrollTrigger's
  pin — no pin-spacer, one pinned section.
- **Images load through an IntersectionObserver** (`near()` / `loadImage()` /
  `loadWhenNear()`, top-level in `site.js` so every IIFE can see them), with a
  600px margin. A detached `new Image()` probe ignores `loading="lazy"`, which
  is why the page once fetched 6 MB on load.
- **`100dvh`, never `inset: 0`**, for full-screen fixed boxes — on Android
  Chrome a fixed box is laid out against the *large* viewport.

### The header, menu and dock (new, September 8)

- The bar is **opaque from scroll 0**. It used to be transparent until 80px
  down; on a phone, where the hero photo's top is a bright hillside, white
  type sat on a pale picture and the header read as absent.
- It **no longer inverts to white** over the pale sections. A gold— now
  white — mark that changes colour halfway down a page is two marks.
- Below 1024px: a `.nav-toggle` opens `#nav-sheet`, a full-screen sheet with
  eight section links, the enquiry button and the phone number. Focus trap,
  Escape, Lenis stop, staggered line entrance. **Before this, phone and tablet
  had no navigation at all** — the link list was `display:none` and nothing
  replaced it.
- `.dock` — a fixed bottom bar (Book a viewing + call) that rises once the
  hero's own CTA has scrolled past and **stands down over `#choreo`** so it
  does not cover the pinned composition. Hidden ≥1024px.

---

## 8 · The enquiry form

`submit.php` receives a JSON POST and delivers to **two** destinations. The
enquiry counts as delivered if *either* accepts it.

1. **Email** via `mail()`, to `config.php`'s `notify_email` — which now takes
   a **comma-separated list**. Currently `tritonhomz@gmail.com,
   sales@tritongroup.in`.
2. **Leadi5 webhook**, with the API key added server-side.

**Every lead is written to `leads.log` on the server, delivered or not.**
`.htaccess` denies `*.log`, so it is not readable from the web. This exists
because email is the one link nobody here controls.

Spam gate: a honeypot field (`company`) and a minimum 2-second time on form.

### ⚠️ Open item — mail may not be arriving

`config.php` in the working copy is correct, but that file is gitignored:
**whatever is on the server is what actually runs.** The likely causes, in
order:

1. The server's `config.php` differs from the working copy.
2. **Missing SPF record** — the From address is `no-reply@<domain>`; if the
   domain's SPF does not authorise the cPanel host, Gmail bins the message.
   This is the usual answer.
3. `mail()` disabled on the hosting account.
4. Landing in Gmail spam.

**`mailtest.php` answers 1, 3 and 2 in one page load.** Upload it, visit
`https://villas.tritongroup.in/mailtest.php`, read the report, then delete it.
It never prints the API key.

### ⚠️ The webhook is pointed at a test endpoint

`config.php`'s `webhook_url` contains `/webhooks/test/`, not a production
path. Leads may be landing in a Leadi5 test bucket.

---

## 9 · Security — non-negotiable

- **The Leadi5 API key must never appear in client-side JS.** The site is
  static; View Source exposes everything under `js/` and `css/`.
- `config.php` holds the live key, is **gitignored**, and is excluded from
  every archive. `.htaccess` denies it by name as a second line of defence.
- **The key should be rotated** — it appeared in a screenshot during an
  earlier session.
- **RERA numbers are never fabricated.** `DATA.rera` is the client's confirmed
  registration; set it to `null` and the footer says "not yet configured"
  rather than showing something invented.
- Never push to a branch other than `claude/frontend-design-skill-0ufglv`.

---

## 10 · Verification

A local server, run **from inside `triton-humming-valley/`**:

```bash
python3 -m http.server 8899
```

Playwright is at `/opt/node22/lib/node_modules/playwright/index.js` and is
**CommonJS** — `import pw from '…'; const { chromium } = pw;`.

Current verified state, at the latest commit:

- **0 horizontal overflow** at 320 / 360 / 390 / 414 / 600 / 768 / 834 /
  1024 / 1280 / 1440 / 1920.
- **Nothing under the 24px WCAG 2.2 tap-target minimum** at any of those.
- 21 cross-device checks and 19 functional checks passing.
- No JS errors. Reduced-motion leaves nothing invisible.
- A scan of every computed colour on every element finds **no yellow** at any
  width.
- **988 KB on load.** Fonts 64 KB, images 541 KB, script 233 KB, CSS 95 KB.
- Page height: 17,058px on a phone (was 19,554px), 14,441px on desktop.

---

## 11 · Traps this project has already fallen into

Do not repeat these.

1. **Running the Tailwind build from inside `triton-humming-valley/`.** It
   fails, sometimes silently. Always from the repo root.
2. **Overwriting the client's uploaded photography.** They upload their own
   images to cPanel. Ship *code-only* archives unless they explicitly ask for
   images, and say so when you do.
3. **Class-name collisions.** `.video-frame` already belonged to the YouTube
   player inside `#video-modal` (`position:absolute; inset:0`). Reusing it for
   the poster wrapper collapsed the film card to 79px. Grep before naming.
4. **`a[data-field]` is an attribute selector and outranks a class.** It was
   overriding the layout of every contact link that had one.
5. **`textContent` on a link wipes what is inside it.** Setting the phone
   number that way destroyed the dock button's icon.
6. **`.villa-specs > span` (0,1,1) beats `.villa-plot` (0,1,0).** Check
   specificity before assuming a rule is dead.
7. **A `<button>` does not grow to fit a child sized only by
   `aspect-ratio`.** Give it `display:flex; flex-direction:column` and let the
   image carry a real laid-out height.
8. **Per-element IntersectionObservers fail for carousels.** The coverflow's
   off-centre cards are translated far to the sides and never intersect the
   viewport; watch the track, load all seven.
9. **Long horizontal scroll containers need `min-width: 0`** to actually
   shrink.
10. **Test on a real mobile emulation** (`isMobile: true, hasTouch: true`) and
    *look at the screenshots*. An earlier pass measured overflow and tap size,
    passed everything, and shipped a page the client called "a mess" — because
    nobody had looked at it.
11. **Duplicated markup.** Two whole sections shipped on the live site twice.
    A duplicate-ID check is in the functional suite now; keep it.

---

## 12 · Open questions for the client

1. **Do prices differ per villa?** Plot 20 (3,724 sq ft) and plot 21
   (3,474 sq ft) are both quoted ₹3.5 Cr.
2. **"Villa Nos: 8" on the 3 BHK east sheet** — is that villa *number* 8 (the
   current reading) or *eight villas* of that type?
3. **Four gallery captions have no photograph yet**: kitchen opening into the
   living space, lounge overlooking the internal courtyard, interior passage,
   private jacuzzi. The captions are parked in a comment above `DATA.gallery`.
4. **Two images on their server are oversized**: `villa-3bhk.jpg` (1.87 MB)
   and `villa-5bhk.jpg` (2.56 MB) should be re-exported at 1200px / q80.
5. **`triton-web/`** in the repo is an abandoned Next.js scaffold, redundant,
   and can be deleted.
6. The old `marcellus-*.woff2` and `manrope-*.woff2` are still on the server
   and unreferenced — safe to delete.
