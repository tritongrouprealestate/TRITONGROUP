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
time and positioning copy, plus a photo slot. No real photos are embedded: this portal
is built to run with zero internet, and pulling live images from Google would break that
guarantee every time someone opened it, so the popup ships with a placeholder icon
instead. To add a real photo, drop a JPG at
`Sales Kit/Hummingvalley/Location Advantage/photos/<place-slug>.jpg` — the slug the popup
expects is shown inside it (for example `photos/nandi-hills-sunview-point.jpg`).

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
`Master Plan.png`. Four villa types are highlighted on the plan — **08, 20, 21 and 22** —
and tapping one opens a popup with a photo/video tab, three floor-plan slots, a
specification row and, where one exists, a link straight to that villa's cost sheet.

**The plot layout is diagrammatic, not the real site plan.** No architectural master
plan file was supplied, so the villas are drawn as four highlighted plots near the
entrance with plain, unlabelled plots filling out the rest of the community for scale.
Once the real site plan exists, open the file and, near the top of the `<script>` block,
edit each entry's `x`/`y`/`w`/`h` in the `VILLAS` array to match its true plot, and adjust
or replace the `siteplan()` drawing (road, clubhouse, filler plots) to match the real
layout.

**Every specification is a placeholder.** Configuration, plot size, built-up area and
price all show as **TBD** — the two existing cost sheets (Villa 20, Villa 21) are
themselves stamped "Placeholder figures — not for client use," and no real numbers exist
yet for types 08 or 22. Fill in the `config` / `plot` / `builtUp` / `price` fields on each
entry in `VILLAS` with confirmed figures before a client sees this.

**Photos, videos and floor plans use the same drop-in convention as the location map:**
save a file at the exact path shown inside each empty slot and it appears next time the
page opens, no rebuild needed.

| Add this file | Shows as |
|---|---|
| `Sales Kit/Hummingvalley/Master Plan/photos/type-<N>-hero.jpg` | Latest villa photo |
| `Sales Kit/Hummingvalley/Master Plan/videos/type-<N>-walkthrough.mp4` | Walkthrough video |
| `Sales Kit/Hummingvalley/Master Plan/floorplans/type-<N>-ground-floor.jpg` | Ground Floor tile |
| `Sales Kit/Hummingvalley/Master Plan/floorplans/type-<N>-first-floor.jpg` | First Floor tile |
| `Sales Kit/Hummingvalley/Master Plan/floorplans/type-<N>-terrace.jpg` | Terrace tile |

(`<N>` is `08`, `20`, `21` or `22`.) Any floor-plan tile can be clicked to zoom it
full-screen once an image is in place — useful for reading a plan off a TV across a room.

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
