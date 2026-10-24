# Triton Humming Valley landing page

Plain HTML, CSS and JS port of the Claude Design file `Humming Valley Landing v2.dc.html`.
No React, no Babel, no build step at runtime. Fonts load from Google Fonts.

## Files
- `index.html` standalone preview. Open it directly or serve the folder.
- `hv.css`, `hv.js` styles and interactions (used by `index.html`).
- `wordpress/humming-valley-embed.html` one file with CSS, markup and JS inlined, for a WordPress Custom HTML block.
- `assets/` images and icons the page uses.

## Put it on WordPress
1. Upload `assets/img` and `assets/icons` to the Media Library or a folder under `wp-content/uploads/hv/`.
2. In `wordpress/humming-valley-embed.html` replace every `__HV_ASSETS__/` with that folder URL, for example `https://tritongroup.in/wp-content/uploads/hv/`. The folder must contain `img/` and `icons/`.
3. Paste the file into a Custom HTML block on the page with the slug `triton-humming-valley-villas-in-nandi-hills-bangalore`. The page has no header or footer of its own, so the theme supplies them.
4. Set the page title, meta description, canonical and social tags in your SEO plugin. The standalone `index.html` shows the values from the design.

## Lead forms need configuring
The design sends leads to a Jetpack contact form, but `jetpackFormId` and `jetpackHash` are empty in `HV_CONFIG`.
Until they are filled in, submitting any form on the page only shows the thank you message and **no lead is delivered**.
It does push a `generate_lead` event to `dataLayer`.

## Notes
- All styles are scoped under `#hv-root` so the theme does not restyle the page, but test it once inside the real theme.
- The design shows prices ("from ₹2.4 Cr*") and revenue figures. Confirm them with sales before publishing.
