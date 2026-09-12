# Triton Group — Offline Sales Portal

Two things make up the whole product:

```
Triton Sales Portal.html      ← one file. Double-click it.
Sales Kit/                    ← one folder. All the content.
```

Keep them **next to each other**. Copy both onto every sales laptop, or onto a USB
stick. No internet, no server, nothing to install. It opens in Chrome or Edge.

---

## Updating content — the whole procedure

**Replace the file in `Sales Kit/`, keeping the same file name. That's it.**

Every file has a fixed name. The portal is wired to those names, so a new brochure
saved as `Brochure.pdf` simply becomes the brochure. Nothing to re-run, nothing to
re-link. Close and reopen the portal to see it.

If you **add** a file that isn't in the standard list, or add a whole new project
folder, press **Update** in the top right and pick the `Sales Kit` folder once. The
portal remembers it from then on, including after restarting the laptop.

---

## The file names

Save files under exactly these names. Case does not matter; spelling does.

### Sanvi

| Put the file here | Named |
|---|---|
| `Sales Kit/Sanvi/` | `cover.jpg` — the photo on the project card |
| `Sales Kit/Sanvi/Brochure/` | `Brochure.pdf` |
| `Sales Kit/Sanvi/Brochure/` | `Presentation.pptx` |
| `Sales Kit/Sanvi/Cost Sheet/` | `Cost Sheet.png` |
| `Sales Kit/Sanvi/Cost Sheet/` | `Price List.xlsx` |
| `Sales Kit/_Portal/Price Calculator/` | `Price Calculator.html` — shared with Hummingvalley, see below |
| `Sales Kit/Sanvi/Availability Sheet/` | `Availability.xlsx` |
| `Sales Kit/Sanvi/Comparison Sheet/` | `Comparison.xlsx` |
| `Sales Kit/Sanvi/Location Advantage/` | `Location Advantage.html` |
| `Sales Kit/Sanvi/Video/` | `Walkthrough.mp4` |

### Hummingvalley

| Put the file here | Named |
|---|---|
| `Sales Kit/Hummingvalley/` | `cover.jpg` |
| `Sales Kit/Hummingvalley/Brochure/` | `Brochure.pdf` |
| `Sales Kit/Hummingvalley/Brochure/` | `Presentation.pptx` |
| `Sales Kit/Hummingvalley/Cost Sheet/` | `Villa 20.png`, `Villa 21.png` |
| `Sales Kit/Hummingvalley/Master Plan/` | `Master Plan.png` |
| `Sales Kit/Hummingvalley/Master Plan/` | `Interactive Master Plan.html`, **hand-built, see below** |
| `Sales Kit/_Portal/Price Calculator/` | `Price Calculator.html` — shared with Sanvi, see below |
| `Sales Kit/Hummingvalley/Location Advantage/` | `Location Advantage.html`, **generated, do not replace** |
| `Sales Kit/Hummingvalley/EMI Calculator/` | `EMI Calculator.html`, **generated, do not replace** |
| `Sales Kit/Hummingvalley/Video/` | `Walkthrough.mp4` |
| `Sales Kit/Hummingvalley/Video/` | `AV Film.mp4` |

### Online films

The Hummingvalley page carries two **YouTube links** — Old Film and New Film —
shown under the folders in their own *Online Films* row. Clicking one opens YouTube
in a new browser tab.

They are the only things in the kit that need an internet connection, so the portal
marks them in red. With no connection the browser shows its usual offline page; the
two `.mp4` films inside the Video folder play regardless, so show those instead.

They do not play inside the portal, and this is not a setting that can be changed:
YouTube refuses to embed into a page opened from a local file and returns *Error
153*. Opening a tab is the only reliable route from an offline HTML file.

To point them at different videos, edit the two `youtube:` IDs under `links:` in
`src/data.js` and rebuild.

**Thumbnails (optional, needs wifi once).** A film tile shows a picture if one is
saved here; otherwise it pulls YouTube's own thumbnail when online, and falls back
to a plain panel with a play mark. To make the tiles look right offline too, save
each thumbnail once:

| Open in a browser | Save as |
|---|---|
| `https://img.youtube.com/vi/1SuGJy0W7fY/maxresdefault.jpg` | `Sales Kit/_Portal/thumbs/1SuGJy0W7fY.jpg` |
| `https://img.youtube.com/vi/85QY818IoOc/maxresdefault.jpg` | `Sales Kit/_Portal/thumbs/85QY818IoOc.jpg` |

(If a link 404s, swap `maxresdefault` for `hqdefault`.) I could not fetch these for
you — this build machine has no access to YouTube.

### Triton Branded

| Put the file here | Named |
|---|---|
| `Sales Kit/Triton Branded/` | `cover.jpg` |
| `Sales Kit/Triton Branded/General/` | `Main Brochure.pdf` |
| `Sales Kit/Triton Branded/General/` | `Feedback Form.pdf` |

### Front screen

| Put the file here | Named |
|---|---|
| `Sales Kit/_Portal/` | `logo.png` — the Triton logo, for the header and footer |
| `Sales Kit/_Portal/` | `hero.mp4` — background film, muted loop, under ~20 MB |
| `Sales Kit/_Portal/` | `hero-poster.jpg` — its first frame |
| `Sales Kit/_Portal/` | `hero-bg.jpg` — the still behind the film |
| `Sales Kit/_Portal/thumbs/` | `<youtube-id>.jpg` — saved video thumbnails |

`_Portal` starts with an underscore, so the portal treats it as its own and never
shows it as a project.

### The logo

Save the Triton logo as `Sales Kit/_Portal/logo.png` and it appears in both the header
and the footer. Two things matter:

- **A transparent background.** Both bands are near-black, so a logo saved on a white
  rectangle will show that rectangle. Export a PNG with transparency, or an SVG saved
  as `logo.png`'s neighbour and renamed in `src/data.js`.
- **The gold artwork, not a dark version.** The bands were made dark specifically so the
  gold reads well against them.

Until the file is there, the portal falls back to setting "Triton" and the tagline in the
display typeface. That fallback is presentable — it is not a broken state — but the real
logo is better.

### The Hummingvalley location map

`Hummingvalley → Location Advantage` is an interactive page, not a file to swap out.
The project sits at the centre of a dial and every destination is plotted by its real
distance, with drive time and a line of positioning copy on tap. Filtering to one
category fans those places around the whole dial so their names stay readable.

Every distance and drive time comes from the project brochure, and every one of the
30 entries has been cross-checked against it: nothing is estimated. Placement on the dial
is by category and distance, so it is a schematic rather than a survey map, and the page
says so at the foot. If you want places positioned by true compass bearing I need the
project's latitude and longitude, plus coordinates for each destination.

Tap any place, on the dial or in the list, and a popup opens with its distance, drive
time and positioning copy, plus a photo. No real photos are embedded: this portal is
built to run with zero internet, and pulling live images from Google would break that
guarantee every time someone opened it. Instead, all 30 places ship with the same
generic "Placeholder Image" graphic at
`Sales Kit/Hummingvalley/Location Advantage/photos/<place-slug>.jpg`, so the popup never
shows a broken-icon state. To add a real photo, save it over that file, same name, same
place — the slug is shown in the popup's hint text (for example
`photos/nandi-hills-sunview-point.jpg`).

Below the dial, an **Upcoming infrastructure & major employers** section lists nine
region-wide developments researched for North Bangalore, each with a stated fact and its
source: the Bengaluru Airport City, Namma Metro Phase 2B, NH-44 widening, Foxconn's
Devanahalli campus, SAP Labs, Carl Zeiss, and others. These have no verified distance
from the project, so they sit in their own briefing list rather than on the dial itself.

To add or edit a place, open `src/location-data.js` and rebuild. You need its real km
and minutes; do not estimate them, because the sales team quotes these numbers. Twelve
places on the brochure map carry no distance in its tables (Prestige Tech Cloud, KIADB
Aerospace SEZ, Taj, Signature Park, NAFL National Public School, Vidyashilp University,
Stonehill International School and others), so they are not on the dial yet. Send the
numbers and they go in. To add or edit an infrastructure entry, open the `INFRA_DATA`
block at the bottom of the same file.

The positioning copy under each place is a first draft written for HNI and investor
audiences. Read it before the team uses it in front of clients.

### The Hummingvalley interactive master plan

`Hummingvalley → Master Plan → Interactive Master Plan` is a clickable site plan built
for a sales conversation on a laptop or a big-screen TV, sitting alongside the static
`Master Plan.png`. The 30-plot layout (10 columns × 3 rows, numbered in the serpentine
order 10→1, 11→20, 30→21, with the landscaped-green strip, clubhouse and approach road)
and the five highlighted villas — **8, 11, 20, 22 and 23** — were redrawn from the
reference master-plan image and villa-detail cards supplied by the sales team. Tapping
a highlighted villa opens a popup with a photo/video tab, three floor-plan slots, a
specification table and, where one exists, a link straight to that villa's cost sheet.
There is deliberately no "Enquire" button — this kit has no backend to send an enquiry to.

**The specification table is confirmed data, transcribed from each villa's own cost
sheet** (`Sales Kit/Hummingvalley/Cost Sheet/Villa <N>.png`), not the earlier marketing
cards — checked by re-deriving each sheet's full charges/GST/Grand Total math and
confirming it matches exactly. This corrected two things from the first pass: Villa 20
is really 3,494 sq ft built-up on a 1,360 sq ft plot (not 3,724 / 1,389), and "Aspect"
is now each villa's real compass facing from its sheet, not the marketing wording:

| Villa | Type | Built-up | Plot | Aspect | Price (Grand Total) |
|---|---|---|---|---|---|
| 8  | 3 BHK | 2,660 sq ft | 1,080 sq ft | East Facing | ₹2.83 Cr |
| 11 | 5 BHK | 4,448 sq ft | 1,555 sq ft | North Facing | ₹4.52 Cr |
| 20 | 4 BHK | 3,494 sq ft | 1,360 sq ft | North Facing | ₹3.59 Cr |
| 22 | 3 BHK | 2,680 sq ft | 1,080 sq ft | North Facing | ₹2.85 Cr |
| 23 | 3 BHK | 2,680 sq ft | 1,080 sq ft | North Facing | ₹2.85 Cr |

Price here is each sheet's exact Grand Total (rounded to the nearest lakh for display),
not a rounded marketing figure. Every villa's popup links to **View Cost Sheet**,
pointing at `Villa <N>.png` next to this page — save each villa's cost sheet under that
exact name (matching Villa 20's existing file) for the link to resolve.

To change a figure, edit the `VILLAS` object near the top of the `<script>` block in
`Interactive Master Plan.html`. To highlight a different or additional plot, add an entry
there keyed by its plot number — the site plan picks it up automatically, no other change
needed. The remaining 25 plots are drawn for layout context only and carry no unit data.

**Photos and floor plans already ship with a placeholder** — the same generic
"Placeholder Image" graphic used on the location map, sized so it reads sensibly cropped
into either the wide photo pane or the 4:3 floor-plan tiles. To swap in the real thing,
save over the file, same name, same place, and it appears next time the page opens, no
rebuild needed:

| Replace this file | Shows as |
|---|---|
| `Sales Kit/Hummingvalley/Master Plan/photos/villa-<N>-hero.jpg` | Latest villa photo |
| `Sales Kit/Hummingvalley/Master Plan/floorplans/villa-<N>-ground-floor.jpg` | Ground Floor tile |
| `Sales Kit/Hummingvalley/Master Plan/floorplans/villa-<N>-first-floor.jpg` | First Floor tile |
| `Sales Kit/Hummingvalley/Master Plan/floorplans/villa-<N>-terrace.jpg` | Terrace tile |

(`<N>` is `8`, `11`, `20`, `22` or `23`.) Any floor-plan tile can be clicked to zoom it
full-screen once a real image is in place — useful for reading a plan off a TV across a room.

**The video tab now has a real placeholder**, for all five villas, at
`Sales Kit/Hummingvalley/Master Plan/videos/villa-<N>-walkthrough.mp4` — a branded
"Video Not Added Yet" frame, not just an empty state. Worth knowing what it actually
is: the environment that built this kit has no H.264 *encoder* (only a decoder), so
these five files are VP8/WebM video saved with a `.mp4` extension. That sounds like it
shouldn't work, but Chrome determines playability from a local file's actual container
bytes, not its extension, as long as the page and the video share a `file://` origin —
exactly this kit's setup — so it plays correctly with no special handling. Save a real
file over any of these, same file name, and it replaces the placeholder with no other
change needed; a normal H.264 `.mp4` export from any phone or editor works fine.

This page is **hand-authored HTML**, not generated from a `src/` build step — this
project folder does not carry the `src/`/`tools/build.mjs` pipeline the rest of this
README describes, only the finished portal — so edit `Interactive Master Plan.html`
directly and there is nothing to rebuild afterwards.

### The Hummingvalley EMI calculator

`Hummingvalley → EMI Calculator` is a second interactive page: a home loan calculator
for use on the spot during a sales conversation. Buyers move three sliders (loan amount,
interest rate, tenure) and the monthly instalment, the principal/interest split and a
year-by-year amortisation table update instantly, all figures in the Indian numbering
system (lakhs and crores).

It is a completely separate, self-contained file with no shared fonts or styling from
the rest of the kit, deliberately: it was built to an exact specification for a standalone
navy-and-emerald calculator, and keeping it independent means it can be dropped into any
other project folder later without dragging the whole portal's styling along.

To change the loan-amount range, default interest rate, or any other input limit, open
`src/emi-calculator.html` and edit the `min`/`max`/`value` attributes on the three
`<input type="range">` sliders near the top of the body, then rebuild.

### The Price Calculator

Every project's "which unit, what price, what payment schedule" conversation with a
customer used to happen in a separate Excel sheet per project. `Price Calculator` is
one interactive page that replaces all of them — a project switcher at the top, then a
live quote sheet below: pick a unit, everything auto-fills, every number is still
editable, and it prints to a clean customer-ready page or PDF.

It is **one shared tool, not one per project.** The file lives outside any single
project's folder, at `Sales Kit/_Portal/Price Calculator/`, and both Sanvi and
Hummingvalley link to that same file from their own Cost Sheet folder — that's why
their `Price Calculator` entries in `src/data.js` carry an explicit `path:` instead of
the usual bare `name:`. Opening it from Sanvi's folder lands on Sanvi already selected
(via a `#sanvi` link), opening it from Hummingvalley's lands on Hummingvalley
(`#hummingvalley`) — same file, correct starting point either way.

**Everything about a project is data, not code.** `price-calculator-data.js`, next to
the HTML file, holds one array of projects; the HTML file has no project-specific
numbers in it anywhere. To add a third project, copy the shape of an existing entry in
that file — its own unit list, its own charges, its own GST rule, its own payment
milestones, its own logo and accent colour — and it appears in the project switcher
immediately, no code change. The comment block at the top of that file documents every
field the engine understands.

**Sanvi's 44 units are the real building.** Its master list (`Sheet3` in the original
workbook) and its Availability sheet disagreed on three flats' configuration —
Flat 120 (Sheet3 said 3 BHK, Availability said 2 BHK, and at 1,090 sqft it doesn't
match *any* named size on the official Price List either), Flat 320 (3 BHK vs 2 BHK —
its 1,215 sqft matches the "2 BHK Delta" size exactly, so Availability is very likely
right) and Flat 531 (1 BHK vs 2 BHK — its 1,075 sqft matches "2 BHK Gamma" exactly, same
conclusion). Availability's value was used for all three since it's the sheet your team
actually keeps current, but Flat 120 in particular is worth a manual check — it's
editable in the app regardless, so a wrong label there costs nothing to fix on the spot.
Flats 130, 225 and 235 have no Availability row at all (already sold) and are greyed out
and unselectable in the picker, exactly like the other two projects will be once their
sold units are recorded the same way.

**Hummingvalley's five confirmed-available villas — 8, 11, 20, 22 and 23 — now come
straight from each villa's own cost sheet** (`Sales Kit/Hummingvalley/Cost Sheet/Villa
<N>.png`), not the earlier marketing cards. Every sheet was checked by re-deriving its
full Base Price → Other Charges → GST → Grand Total and confirming an exact match
before trusting its numbers. Two real corrections came out of that:

- **Villa 20 is actually 3,494 sqft built-up on a 1,360 sqft plot**, not 3,724 / 1,389
  as the earlier marketing card had it.
- **Rate per sqft is not uniform across the project.** Villas 11 and 20 are
  ₹8,750/sqft; villas 8, 22 and 23 are ₹9,000/sqft. Each unit in `price-calculator-data.js`
  now carries its own `rate`, which the app auto-fills into Basic Price per sqft on
  selection — a project's `ratePerSqft` is only the fallback for a unit that doesn't
  specify one (or the "— Custom / not listed —" option).

"Facing" for all five is now each villa's real compass facing from its own cost sheet
(North Facing for 11/20/22/23, East Facing for 8) rather than the marketing wording
("Central row", "South row, clubhouse side") — this shows in the unit picker dropdown,
the Reference Sheet tab, and the interactive master plan's villa popups alike, since
all three read from the same corrected data. A sixth villa, 21 (4 BHK+HT, 3,474 sqft,
₹8,750/sqft), was the original example used to work out the charges/GST/payment-schedule
rules every villa here uses — it is still not one of the five confirmed-available units,
so it isn't listed as a selectable unit. That same villa-21 reference had an internal
inconsistency worth knowing about: its "On Completion of Plinth" row was charged at
₹20,47,264 despite being labelled 5% (5% of that quote's ₹3,56,54,475 grand total is
₹17,82,724 — matching every *other* 5% row on the same sheet). The calculator computes
the percentage faithfully rather than reproducing that number.

**Two real differences between the two projects, by design, not a bug:** Sanvi charges
GST on Base Price *and* Other Charges; Hummingvalley's reference sheet charges it on
Base Price only. Sanvi's Preferential Location Charge is a footnote that was never
actually billed (off by default, tick the box to apply its ₹100/sqft); Hummingvalley's
reference sheet bills its ₹500/sqft PLC unconditionally (on by default). Both are
per-project settings in the data file, not something the engine assumes.

**Nothing is locked.** Every charge and every payment-schedule row can be renamed,
re-priced, ticked off, deleted, or added to per quote — this was a deliberate ask, so
the sales team isn't blocked waiting for a developer every time a deal needs a one-off
line item. The only values the app won't let you type over directly are Base Price
Total, Other Charges Total, GST Amount and Grand Total, since those are always the sum
of the editable numbers around them — to land on a different final number, change
Discount (always present, defaults to ₹0) or adjust the line item that should actually
be different. The payment schedule shows a green check when its rows add up to Grand
Total exactly, or an amber warning naming the gap if they don't, so a milestone
mistake is visible immediately instead of surfacing in front of the customer.

**Print / Save as PDF** hides the toolbar and turns every input into plain text, so the
same page that the rep fills in live is what gets handed to (or e-mailed to) the
customer, with no separate "quote template" to keep in sync.

**The Reference Sheet tab** (next to Quote Builder, at the top of the page) is a
read-only table of every unit in whichever project is currently selected — the same
list the Unit Selection dropdown draws from, so the two can never drift apart. Sold
units show a grey "Sold" pill instead of green "Available", matching the picker.
When a project sets a `referenceSheetUrl`, an **"Open live Google Sheet"** button
appears above the table, marked **needs internet** the same way the two YouTube film
links are — this environment's network policy blocks `docs.google.com` outright, so
this portal has no way to read or sync that sheet's contents itself; the button exists
purely so a rep with a connection can jump straight to whichever spreadsheet the team
actually keeps up to date. Hummingvalley's is already wired to
`https://docs.google.com/spreadsheets/d/13T_4bnqwi3Ewt8GFwd1hpdLye9K_-oxrANtJ8sPgYRQ/edit`.
There is no live sync in either direction: updating the Google Sheet does not change
what this page shows, and editing a unit in this app does not write back to the sheet —
whoever maintains the numbers needs to update `price-calculator-data.js` by hand to
match, the same as every other manually-maintained file in this kit. To give a project
this tab's live-sheet link, add a `referenceSheetUrl` string to its entry in
`price-calculator-data.js`; leave it unset (as Sanvi's is) to hide the button.

This page is **hand-authored HTML**, like the interactive master plan — not generated
from a `src/` build step. Edit `Price Calculator.html` or `price-calculator-data.js`
directly; there is nothing to rebuild afterwards.

### Typeface and colour

Headings are set in **Fraunces**, the working text in **Geist**. Both are embedded in the
HTML file itself, so they render identically on every machine with no connection and
nothing to install. The palette is near-black greens, deep teal for anything interactive,
and the logo's gold kept for brand moments only. To change any of it, edit the token block
at the top of `src/styles.css` and rebuild — every colour in the portal resolves from
there. To change the fonts, edit `tools/embed-fonts.mjs` and run it.

If a file is missing, its tile still appears, greyed, reading **"Not added yet"** with
the name it is waiting for. Nothing breaks.

---

## Everything in here now is a placeholder

The portal ships populated so it can be demonstrated straight away. Every placeholder
is stamped **PLACEHOLDER** — on the artwork it is a repeating diagonal watermark, so it
stays visible however the image is cropped. **Never show one to a client.**

Replace them using the tables above. Two notes:

- **The two Google Sheets** — Sanvi's Availability and Comparison sheets — have no
  offline form. Open each in Drive, choose **File → Download → Microsoft Excel
  (.xlsx)**, and save it under the name in the table.
- **Card photos first.** Replacing the three `cover.jpg` files is the single biggest
  visual improvement, and takes a minute.

The real collateral is roughly **730 MB** — Sanvi's brochure alone is 144 MB. Use a
2 GB or larger USB stick. The placeholders are about 5 MB.

---

## Using it in front of a client

| Key | Does |
|-----|------|
| scroll | expands the hero film, then enters the portal |
| `/` or `Ctrl-K` | search every project, folder and file |
| `P` | presentation mode — hides all chrome |
| `U` | update library |
| `Esc` | close search, or go back |
| `H` | jump home |
| `Shift-R` | reset to the built-in list |

**On a phone or tablet** the layout adapts: the project cards lay themselves out with
the file count and button already visible instead of revealing them on hover, which does
not exist on touch. The keyboard shortcuts above are hidden there, since there is no
keyboard to use them with.

**One click opens a file.** Clicking any tile opens that file straight away in a new
browser tab — no preview step in between.

Image and video tiles show the file itself as their picture, anchored to the top edge
so a sheet's heading is the part on show. Reps can tell two cost sheets apart without
opening either. PDFs, images, videos and HTML pages display
in the tab. Word, Excel and PowerPoint cannot be shown by a browser, so Chrome saves
them to Downloads and they open from there in their own app.

---

## Changing the wording

Project taglines, location lines and the tags (RESIDENTIAL / VILLAS / CORPORATE) live
in `src/data.js`. Edit it in any text editor, then rebuild (below). Pressing Update in
the portal never overwrites this wording.

---

## Rebuilding the HTML file

Only needed if you change the portal itself. Requires Node.

```bash
node tools/build.mjs             # src/ -> "Triton Sales Portal.html"
node tools/make-placeholders.mjs # regenerate all placeholder content
```

`Triton Sales Portal.html` is generated — edit `src/`, never the built file.

```
src/index.html    page structure
src/styles.css    all styling; the palette is one token block at the top
src/fonts.css     the two typefaces, base64-embedded (generated)
src/data.js       projects, folders, file names and wording
src/app.js        router, hero, folder scanner, search
```

The hero's scroll-expand effect and the project cards were written in plain JS and CSS
rather than React, because the portal has to run from a double-clicked file with no
server behind it.
