# Homepage v3 go-live report (25 Oct 2026)

## What changed
- Page 7285 (tritongroup.in) now renders the Claude Design "Triton Homepage v3" in 12 sections.
- Your header and footer are the untouched theme template parts (`template-blank`).
- URL, Yoast title/description/OG/Twitter and canonical are kept on the same page, so no SEO equity moves.
- The design's React runtime is not shipped. The page is plain HTML, one CSS file (9 KB gzipped) and one JS file (6 KB gzipped).
- Fonts (Gloock, Instrument Sans) are self hosted with preload. Images are the design's webp files in `wp-content/uploads/triton-home/`.

## Before and after (anonymous visitor, Chromium, desktop)
| Metric | Before | After |
|---|---|---|
| Transfer | 11.3 MB | 2.9 MB |
| Requests | 105 | 89 |
| Stylesheets / scripts | 21 / 49 | 15 / 37 |
| LCP | 1.2 s | 1.6 s |
| CLS | 0 | 0 |
| Load event | 3.4 s | 2.9 s |

LCP is slightly higher because the new hero is a dark canvas with no large photo. The first measurement was 5.8 s because the design hid the hero text until JS, fonts and a 1.7 s timer finished. That reveal is now pure CSS, so it no longer waits on JS or fonts.

## SEO
- One H1 (visually hidden, as designed), ten H2.
- Schema: existing Organization, RealEstateAgent, LocalBusiness (with the Devanahalli address) and WebSite kept. ItemList and FAQPage replaced. The FAQPage now lists the 17 questions that are visible on the page (it was 8 questions not shown on the page).
- All 31 internal links return 200. Seven links that went through a redirect were pointed at their final URLs.
- Title 59 characters, description 143 characters.

## Rollback
- Old page content: `wp-content/uploads/triton-home/backup/home-7285-before-v3-20261025-084749.html` and the WordPress revision history of page 7285.

## Needs your decision (not changed)
1. Numbers differ between old schema and the new design: villas "from 3.5 Cr" vs "from 2.4 Cr", apartments "from 53 Lakhs" vs "68 Lakhs", channel partner commission "3.5%" (FAQ) vs "from 2%" (offers ticker), airport "10 minutes" vs "3 to 6 km". The new page publishes the design's numbers. Please confirm they are current.
2. Plugin hygiene: File Manager Advanced is a known attack target and should be off unless needed. Crowdsignal (2), Akismet, Gravatar Enhanced and Layout Grid look unused on the homepage.
3. Speed: Jetpack, WooCommerce block CSS and animate.css (cdnjs) still load on the homepage. Dequeuing them on the front page would cut more, but they sit near the header and footer, so it should be tested separately.
4. Footer link `/investor-form/` redirects once to `/our-partners/investor-form/`.
5. Host level security headers (CSP, X-Frame-Options) are absent.
6. Posts use date permalinks. Posts are noindexed, so the SEO impact is low.
