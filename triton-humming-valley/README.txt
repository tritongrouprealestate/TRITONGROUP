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
js/lenis.min.js            smooth scrolling, bundled
js/gsap.min.js             animation library, bundled (no CDN dependency)
js/ScrollTrigger.min.js    scroll-driven animation, bundled
submit.php                 receives the enquiry form and forwards it to Leadi5
config.php                 your API key and webhook URL — never served
config.sample.php          template for config.php
.htaccess                  blocks access to config.php and log files

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
    Every image URL is in js/site.js (DATA.choreography for the four frames
    in the Inside sequence, DATA.gallery for the grid, and the villa entries)
    plus two in index.html (the hero and the wide landscape band). The last
    entry in DATA.choreography is the one that ends up filling the screen, so
    it should be your strongest photograph. They
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


MOTION
------
The page's fluidity comes from one thing rather than many: a smooth-scroll
layer runs underneath everything, so every scroll-linked animation reads from
the same eased position. That is why the page feels continuous instead of
feeling like a series of separate effects.

On top of it:
  - a custom cursor, a dot that tracks exactly with a ring that lags behind
    it; the ring opens over links and buttons and tightens over site-plan
    plots, where a large ring would cover the thing being pointed at
  - buttons lean toward the pointer, capped well short of moving out from
    under it
  - in the Inside section, four photographs sit in the corners of the screen,
    swap diagonally, gather to the centre and the last one opens to fill the
    screen; the gallery below it is deliberately still, because two
    scroll-driven sequences back to back is tiring rather than impressive
  - headings are split into lines and each line rises out of its own mask
  - photographs wipe open while the image counter-scales inside the frame,
    and drift slightly against the page as you scroll
  - the land figures count up as they arrive
  - a hairline progress bar along the top edge

All of it is off on touch devices and under "reduce motion", where the page
renders complete and still.

ACCESSIBILITY AND BEHAVIOUR NOTES
---------------------------------
- Works without JavaScript: text, prices and structure all still render.
- Respects the operating system's "reduce motion" setting — the whole motion
  layer is switched off, not softened, and the finished page is shown
  immediately. The custom cursor is removed and the normal pointer returns.
- The custom cursor never appears on touch devices or on any device without
  a precise pointer, and never replaces the text caret inside form fields.
- Keyboard focus outlines are unaffected by any of the motion work.
- The site plan can be operated by keyboard: Tab to a plot, Enter to select.
- The enquiry form checks fields when you leave them, and after a failed
  send it moves focus to a summary listing what to fix.
- Tested at 375px (small phone) and 1440px with no sideways scrolling.


THE ENQUIRY FORM (Leadi5)
-------------------------
The form is connected to Leadi5. A submission goes to submit.php on your own
server, which adds the API key and forwards the lead to the Leadi5 webhook.

config.php in this folder already holds your key and webhook URL, so it works
as soon as you upload. Requires PHP 7.4+ with cURL, which cPanel has by
default.

WHY THE KEY IS IN A PHP FILE AND NOT IN THE JAVASCRIPT
Everything under js/ and css/ is downloaded by the visitor's browser and can
be read by anyone with View Source. An API key placed there is public: anyone
could read it and post fake leads into your CRM, and bots scan for exactly
this. Keeping it in config.php means it stays on the server and is never sent
to the browser. Do not move it.

.htaccess denies web access to config.php and to any .log file, so the key
and enquirers' contact details cannot be fetched directly even if PHP is
misconfigured.

⚠ ROTATE THIS KEY. It appeared in a screenshot, so treat it as exposed.
   Generate a new one in Leadi5, put it in config.php, and the site keeps
   working with no other change.

Spam protection, with no CAPTCHA for real visitors to solve:
  - a hidden field people never see, which automated scripts fill in;
  - a minimum time on the form, since bots submit in under two seconds.
Both are silently accepted and discarded, so the bot does not learn to retry.

If Leadi5 is unreachable, the lead is appended to leads-failed.log in this
folder before the visitor is shown an error, so an outage costs a delay
rather than the enquiry. Check that file after any reported problem.

To send a copy of each enquiry to your inbox, set notify_email in config.php.

⚠ CHECK THE DATE FORMAT ON YOUR FIRST REAL LEAD.
   Leadi5's sample timestamp, "28-03-18 22:22:32", reads as either DD-MM-YY
   or YY-MM-DD. This build sends DD-MM-YY. If the first lead arrives with the
   wrong date, change LEAD_DATE_FORMAT near the top of submit.php to
   'y-m-d H:i:s'. That is the only edit needed.
