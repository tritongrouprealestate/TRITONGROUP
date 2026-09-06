TRITON HUMMING VALLEY — static website
======================================

HOW TO PUT THIS LIVE ON cPANEL
------------------------------
1. Log in to cPanel and open File Manager.
2. Go to  public_html  (or the subfolder for this domain).
3. Click Upload and send  triton-humming-valley.zip
4. Back in File Manager, right-click the zip and choose Extract.
5. Move the contents of the extracted folder INTO public_html, so that
   index.html sits directly in public_html — not inside a subfolder.
6. Delete the zip. Visit your domain.

That is all. There is no Node, no build step, no database, and no server
configuration. It is plain HTML, CSS and JavaScript.


WHAT IS IN HERE
---------------
index.html                 the page
css/styles.css             compiled stylesheet — DO NOT hand-edit this file
css/src.css                the source it is compiled FROM — edit this instead
js/site.js                 all site behaviour, and the DATA object
js/gsap.min.js             animation library, bundled (no CDN dependency)
js/ScrollTrigger.min.js    scroll-driven animation, bundled

Only the fonts load from the internet (Google Fonts). Everything else is
served from your own hosting, so the site does not break if a CDN does.


⚠ THREE VALUES TO CONFIRM BEFORE YOU ADVERTISE THIS PAGE
--------------------------------------------------------
All three are marked  NEEDS VERIFY  at the top of js/site.js:

1. RERA number.  Currently PRM/KA/RERA/1254/460/PR/131224/007292
   This was read off a third-party property listing, not your own site.
   A registration number is a legal record — check it against your
   certificate. Set it to null and the footer will say the number is not
   configured, rather than showing a wrong one.

2. Possession date.  Listings show December 2025, which has passed.
   Currently left unset, so no possession date is displayed anywhere.

3. The 4 BHK built-up area.  Shown as 3,100 sq ft. Your published figures
   give 2,400 and 3,800 as the range endpoints; the middle one is an
   estimate, not something you published.


HOW TO CHANGE THINGS
--------------------
Project facts, prices, plot availability, photographs
    Edit the DATA object at the top of js/site.js. Everything on the page
    reads from it — prices, villa types, the site plan, the gallery.

Page text (headlines and paragraphs)
    Edit index.html directly. The prose lives in the HTML on purpose, so
    the page still reads if JavaScript is switched off, and so search
    engines see the words.

Phone number and email
    DATA.contact in js/site.js. They update everywhere at once.

Photographs
    Every image URL is in js/site.js (DATA.gallery and the villa entries)
    plus two in index.html (the hero and the wide landscape band). They
    currently point at Unsplash stock. Replace them with your own photos —
    upload the files to an  images/  folder and use  images/yourphoto.jpg
    as the URL. Any image that fails to load falls back to artwork drawn in
    code, so a wrong path degrades quietly instead of showing a broken icon.

Colours, type and spacing
    Edit css/src.css, then rebuild the stylesheet:
        npm install          (once)
        npm run build:css
    Run this from the repository root, not from this folder. If you are
    only editing content you never need to do this.


ACCESSIBILITY AND BEHAVIOUR NOTES
---------------------------------
- Works without JavaScript: text, prices and structure all still render.
- Respects the operating system's "reduce motion" setting — the animation
  is skipped and the finished page is shown immediately.
- The site plan can be operated by keyboard: Tab to a plot, Enter to select.
- The enquiry form checks fields when you leave them, and after a failed
  send it moves focus to a summary listing what to fix.
- Tested at 375px (small phone) and 1440px with no sideways scrolling.

The enquiry form does NOT send email yet. It validates and shows a success
message, but nothing is delivered. See the "WIRE THIS UP" comment in
js/site.js for where to POST it to your CRM or a form endpoint.
