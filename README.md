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

**Photo and video slots don't care about the file extension.** Cost sheets, the
master plan image, cover photos, floor plans and the walkthrough/AV films will all
open whatever is actually sitting under that name — drop in a `.jpg` where a `.png`
was named, or a `.mov` iPhone export where a `.mp4` was named, and it still shows up
correctly with no edits here. Only the part before the last dot has to match (e.g.
`Villa 8`), and only one file per slot — if two formats exist side by side, the one
listed first in the table below wins.

This does **not** extend to the Brochure, Price List, Availability and Comparison
Sheet files. Those must stay PDF/Excel exactly as named — there is no way for a page
running with no server to check whether a Word/Excel/PowerPoint file exists before
someone clicks it, and Chrome itself can only preview a PDF inline; anything else
just downloads. That's the same reason the Presentation Deck (`.pptx`) files were
dropped from both projects' Brochure folders earlier — keep the high-quality PDF as
the one file sales actually opens on-screen.

### Sanvi

| Put the file here | Named |
|---|---|
| `Sales Kit/Sanvi/` | `cover.jpg` — the photo on the project card |
| `Sales Kit/Sanvi/` | `logo.png` — Sanvi's own logo; see "Project logos" below |
| `Sales Kit/Sanvi/Brochure/` | `Brochure.pdf` |
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
| `Sales Kit/Hummingvalley/` | `logo.png` — Hummingvalley's own logo; see "Project logos" below |
| `Sales Kit/Hummingvalley/Brochure/` | `Brochure.pdf` |
| `Sales Kit/Hummingvalley/Cost Sheet/` | `Villa 8.png`, `Villa 10.png`, `Villa 11.png`, `Villa 20.png`, `Villa 22.png`, `Villa 23.png`, `Villa 30.png` |
| `Sales Kit/Hummingvalley/Master Plan/` | `Master Plan.png` |
| `Sales Kit/Hummingvalley/Master Plan/` | `Interactive Master Plan.html`, **hand-built, see below** |
| `Sales Kit/_Portal/Price Calculator/` | `Price Calculator.html` — shared with Sanvi, see below |
| `Sales Kit/Hummingvalley/Location Advantage/` | `Location Advantage.html`, **generated, do not replace** |
| `Sales Kit/Hummingvalley/EMI Calculator/` | `EMI Calculator.html`, **generated, do not replace** |
| `Sales Kit/Hummingvalley/ROI Calculator/` | `ROI Calculator.html`, **hand-built, see below** |
| `Sales Kit/Hummingvalley/Video/` | `Walkthrough.mp4` |
| `Sales Kit/Hummingvalley/Video/` | `AV Film.mp4` |

Villas 10 and 30 are confirmed and priced everywhere in the portal — the Price
Calculator, the EMI Calculator and the Interactive Master Plan all work for
them, and their scanned cost sheets (`Villa 10.png`, `Villa 30.png`) are now in
the Cost Sheet folder too, so both the folder listing and the Master Plan
popup's "View Cost Sheet" link work like the other five villas.

### Project logos

Each project can carry its own logo, separate from the Triton logo in the header/footer.
Save it once, at the project's own root:

| Put the file here | Shows up in |
|---|---|
| `Sales Kit/Sanvi/logo.png` | Sanvi's project card, project page, every folder page (Cost Sheet, Brochure, etc.), and the Price Calculator when Sanvi is selected |
| `Sales Kit/Hummingvalley/logo.png` | Hummingvalley's project card, project page, every folder page, the Price Calculator, the EMI Calculator header, and the Location Advantage page |

One file each, referenced everywhere it belongs, so there is nothing to keep in sync.
Until it exists, every one of those spots falls back to what it already showed (a generic
folder icon, the "T" monogram, or plain text) with no broken image and no layout shift.

### Online films

The Hummingvalley page carries two **YouTube links**, Old Film and New Film,
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

### Pre-launch projects (Codename Up in the Clouds, Codename Eloria)

Two upcoming villa projects sit on the home page as real cards with no real
collateral behind them yet. Every file in their folders is deliberately marked
missing in `PORTAL_DATA`, so each one shows an honest **"Not added yet"** tile
instead of a fabricated brochure or cost sheet.

| Put the file here | Named |
|---|---|
| `Sales Kit/Up in the Clouds/Brochure/` | `Brochure.pdf` |
| `Sales Kit/Up in the Clouds/Cost Sheet/` | `Cost Sheet.png` |
| `Sales Kit/Up in the Clouds/Location Advantage/` | `Location Advantage.html` |
| `Sales Kit/Up in the Clouds/Video/` | `Walkthrough.mp4` |
| `Sales Kit/Eloria/Brochure/` | `Brochure.pdf` |
| `Sales Kit/Eloria/Cost Sheet/` | `Cost Sheet.png` |
| `Sales Kit/Eloria/Location Advantage/` | `Location Advantage.html` |
| `Sales Kit/Eloria/Video/` | `Walkthrough.mp4` |

All eight folders above already exist in `Sales Kit/`, each holding a
`PLACEHOLDER.txt` that names the exact file it's waiting on — that's what makes
them show up to upload into on GitHub. Delete a `PLACEHOLDER.txt` once its real
file has replaced it.

Dropping a real file in does not turn the tile live by itself — the matching entry
in that project's `folders` array in `PORTAL_DATA` still carries `missing: true`.
Delete that flag (or the whole `missing:` line) once the file is actually in place.
Add a `cover.jpg` and `logo.png` at the project's own root the same way Sanvi and
Hummingvalley have theirs, and the card and folder pages pick them up automatically.

### Card heading vs. folder name

A project's `name` in `PORTAL_DATA` is also its folder name on disk — renaming one
without the other breaks every file link under it. Where the two need to differ (the
homepage should read "Sanvi Aero Gardens" while the folder on disk stays the short
`Sales Kit/Sanvi/`), add a `displayName` alongside `name`: `displayName` is what
the portal shows everywhere a project's name appears — the card, the project page,
breadcrumbs — while `name` keeps doing its quiet job of pointing at the right folder.
Leave `displayName` out and the portal just shows `name` in both roles, as before.

### Homepage card order

The project grid is a fixed 2-column layout (1 column on phones), and it fills
left-to-right, top-to-bottom in the exact order projects appear in the `projects`
array — there's no separate "row" setting. That's currently Sanvi and
Hummingvalley (row 1), the two Codename projects (row 2), then Triton Group alone
in row 3. To change which projects sit together, reorder the array; pairs will
follow automatically.

### Front screen

| Put the file here | Named |
|---|---|
| `Sales Kit/_Portal/` | `logo.png` — the Triton logo, for the header and footer |
| `Sales Kit/_Portal/hero/` | 8 images for the scrolling strip at the bottom of the hero; see "The hero section" below |
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

### The hero section

The first screen is a tagline, a title, a description, a button, and a strip of images
that scrolls sideways underneath, on a permanent dark background rather than the earlier
version's own scroll-to-expand video (that interaction has been retired). It's a normal
part of the page now, not a locked-in first screen: scroll past it, or press the button,
to reach the project grid below.

All of its text lives in `brand.hero` inside `PORTAL_DATA`, near the top of
`Triton Sales Portal.html`:

```js
hero: {
  tagline: "Sales Deck · Kit",
  titleLines: ["Every Project", "Presented with Confidence"],
  description: "...",
  ctaText: "Explore Projects",
  ctaHref: "#stage",
  images: [ "Sales Kit/_Portal/hero/villa-exterior.jpg", ... ]
}
```

Edit any of those fields directly; `titleLines` is an array so the title can wrap onto
more than one line on purpose, not just where the browser happens to break it.

The 8 images in `images` ship as generic placeholders (a labelled icon on a plain color,
same idea as the placeholders elsewhere in this kit). Replace them, same file names, same
folder, and the real photos take over; add or remove entries in the array to change how
many images scroll by. The strip pauses on hover so someone can actually look at a photo
that catches their eye, and it respects a system-level "reduce motion" setting by not
animating at all.
### The Hummingvalley location map

This page now runs on the same light, white-background palette as the rest of the kit
(previously it was near-black). Every color on it comes from a small set of CSS variables
at the top of the file, so a further palette change only means editing those, not hunting
through the page. Two things stayed intentionally dark regardless of theme: the popup's
close button and hover tooltip, since both sit on top of a photo and need to stay legible
no matter how bright that photo is.

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
and the seven highlighted villas — **8, 10, 11, 20, 22, 23 and 30** — were redrawn from
the reference master-plan image and villa-detail cards supplied by the sales team. Tapping
a highlighted villa opens a popup with a photo/video tab, a specification table, a
3-image floor plan overview (one per floor), a 15-photo floor plan gallery (5 per
floor) and, where one exists, a link straight to that villa's cost sheet.
There is deliberately no "Enquire" button — this kit has no backend to send an enquiry to.

**The specification table is confirmed data, transcribed from each villa's own cost
sheet** (`Sales Kit/Hummingvalley/Cost Sheet/Villa <N>.png`), not the earlier marketing
cards — checked by re-deriving each sheet's full charges/GST/Grand Total math and
confirming it matches exactly. "Aspect" is each villa's real compass facing from its
sheet, not the marketing wording:

| Villa | Type | Built-up | Plot | Aspect | Base Price | Grand Total (all-inclusive) |
|---|---|---|---|---|---|---|
| 8  | 3 BHK | 2,680 sq ft | 1,080 sq ft | East Facing | ₹2.35 Cr | ₹2.78 Cr |
| 10 | 4 BHK | 3,724 sq ft | 1,389 sq ft | East Facing | ₹3.26 Cr | ₹3.81 Cr |
| 11 | 5 BHK | 4,448 sq ft | 1,555 sq ft | North Facing | ₹3.89 Cr | ₹4.52 Cr |
| 20 | 4 BHK | 3,494 sq ft | 1,356 sq ft | North Facing | ₹3.06 Cr | ₹3.59 Cr |
| 22 | 3 BHK | 2,680 sq ft | 1,080 sq ft | North Facing | ₹2.41 Cr | ₹2.85 Cr |
| 23 | 3 BHK | 2,680 sq ft | 1,080 sq ft | North Facing | ₹2.35 Cr | ₹2.78 Cr |
| 30 | 3 BHK | 2,680 sq ft | 1,080 sq ft | North Facing | ₹2.35 Cr | ₹2.78 Cr |

**The popup's own "Base Price" row shows each sheet's Basic Price Total** (SBU ×
rate per sqft), before Recreation/KEB/Legal/PLC/Jacuzzi/DG Backup charges and 5% GST
— it used to show the all-inclusive Grand Total, but the sales team asked for the base
figure to lead instead. The Grand Total is still one click away via **View Cost Sheet**
or the **Price Calculator** link right below it, so nothing is hidden. Every villa's
popup links to **View Cost Sheet**, pointing at `Villa <N>.png` next to this page — save
each villa's cost sheet under that exact name for the link to resolve; all seven are in
place now. All seven cost sheets were re-verified against the actual scans in the Cost
Sheet folder (re-deriving each sheet's Base Price → Other Charges → GST → Grand Total
math) and match exactly. Villa 22 is priced at ₹9,000/sqft while Villa 23 — its
originally-identical sibling — is at ₹8,750/sqft; worth confirming with the sales desk
whether that's intentional.

Beside it, **Price Calculator** opens the shared calculator already on Hummingvalley,
with that exact villa preselected in the unit picker, same numbers as the popup itself,
ready to walk a customer through the full quote instead of just the headline price. The
link is `Price Calculator.html#hummingvalley/<N>`, a `/<N>` on top of the usual
`#hummingvalley` project link; the calculator's own boot code reads that second part and
selects the matching unit before the page ever paints.

A third link, **EMI Calculator**, follows the same pattern: `EMI Calculator.html#<N>`
opens Hummingvalley's home loan calculator with that villa preselected, its 80% loan
amount already filled in. See "The Hummingvalley EMI calculator" below for how that
80/20 split works.

A fourth link, **ROI Calculator**, opens the 15-year hospitality-revenue and
appreciation model on that villa's own BHK configuration (`ROI Calculator.html#3`,
`#4` or `#5`) — see "The Hummingvalley ROI calculator" below.

To change a figure, edit the `VILLAS` object near the top of the `<script>` block in
`Interactive Master Plan.html`. To highlight a different or additional plot, add an entry
there keyed by its plot number — the site plan picks it up automatically, no other change
needed. The remaining 25 plots are drawn for layout context only and carry no unit data.

The page used to carry two pieces of text aimed at whoever was building the kit, not the
customer in front of it: a banner across the top naming which villas were confirmed and
warning that photos were placeholders, and a line inside every villa's popup spelling out
the exact file paths to drop real photos into. Both are gone now that the portal is
client-facing; the placeholder graphics still say "placeholder" on the image itself,
which is enough for whoever is filling this kit in, without saying so out loud in front
of a customer.

**The popup has two different floor-plan sections — don't confuse them.**
**Floor Plans** (new) is one 2D/3D overview render per floor — the whole layout in a
single image, the kind a customer reads to understand the villa's flow. **Floor Plan
Gallery** (below it) is the room-by-room photo set — 5 close-up shots per floor. Both
currently show the same 3 placeholder renders (Ground/First/Second Floor) copied across
all 7 villas, since real per-villa layout renders haven't come in yet — swap each
villa's 3 files for its own real layout render whenever they're ready.

**Photos and floor plans already ship with a placeholder**, sized so it reads sensibly
cropped into either the wide photo pane or the 4:3 floor gallery tiles. Each one is its
own file, individually labelled by villa, floor and photo number, so no two slots show
the exact same graphic. To swap in the real thing, save over the file, same name, same
place, and it appears next time the page opens, no rebuild needed:

| Replace this file | Shows as |
|---|---|
| `Sales Kit/Hummingvalley/Master Plan/photos/villa-<N>-hero.jpg` | Latest villa photo |
| `Sales Kit/Hummingvalley/Master Plan/floorplan-layouts/villa-<N>-ground-floor.png` | Ground Floor, in **Floor Plans** |
| `Sales Kit/Hummingvalley/Master Plan/floorplan-layouts/villa-<N>-first-floor.png` | First Floor, in **Floor Plans** |
| `Sales Kit/Hummingvalley/Master Plan/floorplan-layouts/villa-<N>-second-floor.png` | Second Floor, in **Floor Plans** |
| `Sales Kit/Hummingvalley/Master Plan/floorplans/villa-<N>-ground-floor-<1 to 5>.jpg` | Ground Floor, in the **Floor Plan Gallery** |
| `Sales Kit/Hummingvalley/Master Plan/floorplans/villa-<N>-first-floor-<1 to 5>.jpg` | First Floor, in the **Floor Plan Gallery** |
| `Sales Kit/Hummingvalley/Master Plan/floorplans/villa-<N>-second-floor-<1 to 5>.jpg` | Second Floor, in the **Floor Plan Gallery** |

The 3 **Floor Plans** tiles have their own lightbox and their own left/right navigation,
separate from the 15-photo **Floor Plan Gallery** below — clicking into one never mixes
its images with the other's.

Every tile in both sections also carries a small **download icon** (top-left on hover,
next to the zoom icon on the opposite corner) — a direct download of that one image,
named "Villa `<N>` Ground Floor Plan.png" or "Villa `<N>` Ground Floor Photo 1.jpg" and
so on, so a salesperson can save a specific plan or photo to send someone without
digging through the file browser.

(`<N>` is `8`, `10`, `11`, `20`, `22`, `23` or `30`.) Each villa has 15 floor photos in
total, 5 per floor (the section was renamed **Floor Plan Gallery** and bumped from 4 to
5 photos per floor once the sales team supplied the fifth). Clicking any tile opens it
in a full-screen lightbox with left/right arrow navigation and a "3 / 15" counter, so
someone can flip through every floor plan photo for that villa without closing and
reopening one at a time — arrow keys work too. To change how many photos a floor holds,
edit the loop count inside `floorPhotos()` near the top of the `<script>` block; the
gallery grid and the file-existence check both follow that count automatically. (Villa
20's Ground Floor is currently missing its 5th photo — the tile falls back to a
placeholder icon rather than breaking, but it's worth uploading that file to match the
other floors.)

**The video tab now carries the real walkthrough film for all seven villas**, at
`Sales Kit/Hummingvalley/Master Plan/videos/villa-<N>-walkthrough.mp4`. (It briefly shipped
with a branded "Video Not Added Yet" placeholder in this same spot — a normal H.264 `.mp4`
export from any phone or editor drops in and plays with no other change, since the
extension on these files doesn't have to match the byte format; Chrome checks the file's
actual content, not its name, as long as the page and the video share a `file://`
origin — exactly this kit's setup.)

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

It is a self-contained file with its own fonts and styling, deliberately: it was built to
an exact specification for a standalone navy-and-emerald calculator, and keeping its look
independent means it can be dropped into any other project folder later without dragging
the whole portal's styling along. Its one dependency is `price-calculator-data.js`
(loaded from `Sales Kit/_Portal/Price Calculator/`), used only to read each villa's price;
that's a data file, not a styling one, so it doesn't affect how the page looks.

**A Villa dropdown at the top of Loan details** picks up Hummingvalley's confirmed units
from that same data file. Selecting one fills in 80% of that villa's final price as the
loan amount (the 20/80 booking-versus-loan split every Hummingvalley sale follows) and
shows a note with the full breakdown. The loan amount stays editable afterward, so a rep
can still explore a different loan size for the same villa without losing that context.
Picking **Custom loan amount**, the first option, drops the villa context and leaves
whatever amount is currently in the field for free editing, independent of any villa.
A villa's price is computed the same way the Price Calculator computes its Grand Total
(same charges, same GST rule, every charge at its default state), so the two numbers
never drift apart. Every available villa's Master Plan popup links here too
(`EMI Calculator.html#<villa number>`), landing with that exact villa preselected.

To change the loan-amount range, default interest rate, or any other input limit, open
`Sales Kit/Hummingvalley/EMI Calculator/EMI Calculator.html` and edit the `min`/`max`/`value`
attributes on the `<input type="range">` sliders near the top of the body. No rebuild step,
same as every other file in this kit.

### The Hummingvalley ROI calculator

`Hummingvalley → ROI Calculator` is a third interactive page, separate from the Price
and EMI calculators: a 15-year hospitality-revenue and appreciation model for walking a
customer through *why* a villa is worth what it's worth, year by year, instead of just
quoting a return percentage. A rep picks 3 BHK, 4 BHK or 5 BHK at the top — only one
configuration's numbers show at a time — and every important figure on the page (rack
rate, occupancy, owner revenue share, owner-stay value, appreciation, cash recovery
year, the gold/mutual-fund/fixed-deposit comparison) is clickable, opening a plain-English
explanation of exactly where that number comes from and how it was calculated.

It is a single self-contained file, same architecture as the EMI calculator: its own
fonts and styling, no dependency on the rest of the portal. Every villa's Master Plan
popup links here too, mapped to that villa's own BHK type (`ROI Calculator.html#3`, `#4`
or `#5`) so a rep opens it already on the right configuration for the villa they're
standing in front of.

**Two kinds of numbers, kept strictly separate.** *Owner Revenue Share* is projected
cash — the owner's cut of hospitality revenue. *Owner-Stay Lifestyle Value* is not
cash — it's what the owner's own free nights would have cost to book. Adding the two
together gives *Total Economic Benefit*, and its running total across years is
*Cumulative Economic Benefit* — deliberately not called "Cumulative Owner Share",
since that name would imply it's all cash when part of it isn't. Separately,
*Projected Cash Recovery* tracks cumulative **cash only** (owner-stay value and
appreciation excluded) against the all-inclusive investment, to answer "when would
the cash alone have covered what I paid in." *Projected Asset Value* compounds the
**all-inclusive investment**, not the BSP — the BSP stays visible in Model Inputs
purely as a pricing reference. The page runs its own runtime checks on load (open the
browser console) confirming every one of these stays wired to the right base figure;
if a future edit ever breaks that wiring, the console reports exactly which one.

Every assumption — rack rate, realisation %, revenue share, escalation, owner-stay
nights, occupancy for each of the 15 years, appreciation CAGR, and the three
comparison-asset CAGRs — lives in a collapsed **Model Inputs** panel, editable without
touching the file. To change a villa's own investment amount, BSP, room count or SBU
instead, edit the `PRODUCTS` object near the top of the `<script>` block in
`Sales Kit/Hummingvalley/ROI Calculator/ROI Calculator.html`. **Print / Save** produces
a one-page A4 landscape summary of whichever configuration is currently selected.

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

**Printing fits one A4 page**, even in the worst case (every optional charge ticked
on, a full payment schedule, every note showing). Verified by actually generating the
PDF for both projects with everything switched on, not just eyeballing the screen
layout. The print stylesheet only tightens spacing and type size; it never removes a
field or a note, so nothing is missing from what a customer sees, it is just set at a
size that belongs on paper instead of a laptop screen. The screen version is untouched.

**Bank details print highlighted**, in a bordered, tinted box in the project's own
accent colour, in the footer next to the contact number. Comes from the same
`payee` / `bankAccount` fields already in `price-calculator-data.js`; nothing new to
fill in.

**On-screen reminder about the browser's own print header/footer.** Chrome (and
most browsers) can stamp a page title and the local file path onto every printed or
saved-as-PDF page — that stamp comes from the browser's print dialog, under
Options → "Headers and footers," not from this page. No CSS or JavaScript on a
webpage can turn that setting off; it is a browser-level checkbox only. The page now
shows a small tip above the quote sheet telling whoever is printing to switch that
checkbox off first, so the sheet handed to a customer never carries a
"Triton Humming Valley Price Calculator" title line or a `file:///...` path in the
margins. The tip itself is hidden in the actual print output.

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

**Hummingvalley's seven confirmed-available villas — 8, 10, 11, 20, 22, 23 and 30 —
now come straight from each villa's own cost sheet** (`Sales Kit/Hummingvalley/Cost
Sheet/Villa <N>.png`), not the earlier marketing cards. Every sheet was checked by
re-deriving its full Base Price → Other Charges → GST → Grand Total and confirming an
exact match before trusting its numbers.

- **Rate per sqft is not uniform across the project.** Villas 10, 11, 20 and 30 are
  ₹8,750/sqft; villa 22 is ₹9,000/sqft. Each unit in `price-calculator-data.js`
  now carries its own `rate`, which the app auto-fills into Basic Price per sqft on
  selection — a project's `ratePerSqft` is only the fallback for a unit that doesn't
  specify one (or the "— Custom / not listed —" option).
- **Villa 8 and Villa 23 moved to ₹8,750/sqft** when their updated cost sheets arrived
  (Villa 8's built-up area also corrected to 2,680 sqft). Villa 20's plot area was
  corrected to 1,356 sqft in that same update; its built-up area and rate were already
  right. Villa 22 was not part of that update and is still ₹9,000/sqft.

"Facing" is each villa's real compass facing from its own cost sheet
(North Facing for 11/20/22/23/30, East Facing for 8/10) rather than the marketing
wording ("Central row", "South row, clubhouse side") — this shows in the unit picker
dropdown, the Reference Sheet tab, and the interactive master plan's villa popups
alike, since all three read from the same corrected data. Another villa, 21 (4 BHK+HT, 3,474 sqft,
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
| scroll | past the hero, into the project grid |
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

### The screensaver

Built for a TV left running between customers. Browse into any project and stop
touching the mouse/keyboard for **3 minutes**, and a full-screen slideshow of that
project's own photos takes over — slow Ken Burns zoom, crossfade between images, the
project's name in the corner. Moving the mouse, pressing a key, scrolling or tapping
closes it immediately and resets the 3-minute clock. It only arms while you're inside a
project (any of its pages) — the homepage project grid never triggers it, since there's
no single project's photos to show there.

**Turning it off**: each project page has a **Screensaver** toggle next to the folder
count (top-right, under the project title). It's on by default; flip it off and that
project won't auto-play anymore. The setting is remembered per project in the browser's
local storage on that machine — it doesn't travel with the file if you copy the kit
elsewhere, and clearing browser data resets every project back to on.

**Adding real photos**: each project has its own `Screensaver/` folder —

| Project | Folder |
|---|---|
| Sanvi | `Sales Kit/Sanvi/Screensaver/` |
| Hummingvalley | `Sales Kit/Hummingvalley/Screensaver/` |
| Up in the Clouds | `Sales Kit/Up in the Clouds/Screensaver/` |
| Eloria | `Sales Kit/Eloria/Screensaver/` |
| Triton Branded | `Sales Kit/Triton Branded/Screensaver/` |

Right now each one holds the same 3 placeholder photos you supplied, listed in
`Triton Sales Portal.html`'s `screensaver: [...]` array on that project's entry (search
for `screensaver:`). To swap in a project's real photos: drop as many `.jpg`/`.png`
files as you want into its folder (10-15 works well for a slow-rotating loop), then
list their file names in that project's `screensaver` array in the same order you want
them to play. The slideshow works with however many images are listed — there's no
fixed count to hit.

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

The hero's image marquee and the project cards were written in plain JS and CSS rather
than React, because the portal has to run from a double-clicked file with no server
behind it.
