# Triton Humming Valley landing page

Plain HTML, CSS and JS version of the Claude Design file `Humming Valley Landing v2.dc.html`.
It is live at https://tritongroup.in/triton-humming-valley-villas-in-nandi-hills-bangalore/ (WordPress page 8690, template `template-blank`, theme header and footer unchanged).

## How it is deployed
- Page content: a full-width group holding the CSS and markup (one HTML block), four hidden Jetpack forms, and a deferred script tag.
- Assets (images, icons, fonts, `hv-*.js`) are in `wp-content/uploads/hv/`. Fonts are self-hosted.
- `index.html`, `hv.css`, `hv.js` are a standalone preview. `wordpress/part1.html` and `part3.html` are the page content with `__HV_ASSETS__/` as the asset folder placeholder.

## Lead capture (unchanged)
Every enquiry is handed to the site's existing Jetpack forms, so email notifications, the CRM webhook, spam checks and the redirect to `/thank-you-page-2/` work as before.
- Hero form, final form, "Schedule a private visit" and "Book a sunset visit": form "Hummingvalley Landing | Page" (Jetpack form 8261).
- "Get floor plans": "Get Floor Plan Details | Popup" form.
- "Download brochure": "Get Brochure | Popup" form.
- "Get the full revenue plan": "Rental Projection | Popup" form.
The Jetpack page form has its CRM webhook switched off, as it was before.
The design's "Interested in" chips were removed because the Jetpack forms have no matching field.

## Rollback
The previous page content is stored in post meta `_hv_prev_content` on page 8690 and in `wp-content/uploads/hv-backup/`.
WordPress revisions also hold it.
