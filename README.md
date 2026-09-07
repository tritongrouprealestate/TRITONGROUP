# Triton Group — Offline Sales Portal

A self-contained sales portal for the field team. **Double-click `index.html`** — it runs
in Chrome with no internet, no server, and no install. Copy the whole folder to a laptop
or USB stick and it works anywhere.

---

## Getting it onto a laptop

1. Copy this entire folder (keep the structure intact).
2. Download the collateral from Google Drive into `collaterals/` — the folders are already
   created and match Drive exactly (see **Folder map** below).
3. Run `node tools/generate-manifest.mjs` (once, after adding or changing files).
4. Double-click `index.html`.

Step 3 needs Node only on the machine preparing the kit. The salesperson's laptop needs
nothing but a browser.

---

## Folder map

Mirrors `My Drive → MARKETING !!! → Sales Deck (Kit)`.

```
collaterals/
├── Sanvi/
│   ├── Brochure/              Sanvi Brochure September.pdf · Sanvi Brochure PPT.pptx
│   ├── Cost Sheet/            Main Cost Sheet 62 Lakhs.png · SANVI AERO GARDENS PRICE LIST.xlsx
│   ├── Availability Sheet/    SANVI AERO GARDENS LATEST AVAILABILITY SHEET.xlsx  ← export from Drive
│   ├── Comparision Sheet/     Comparison Sheet.xlsx                              ← export from Drive
│   ├── Location Advantage/    Triton_Project_Advantage.html
│   └── Sanvi Video/           Sanvi Aero Gardens … .mp4
├── Hummingvalley/
│   ├── Brochure/              Brochure - HummingValley.pdf · PPT - Humming valley.pptx
│   ├── Cost Sheet/            Villa 20.png · Villa 21.png
│   ├── Video/                 New AV Video.mp4 · Triton Humming Valley … .mp4
│   └── Master Plan/           Master Plan THV.png
└── Triton Branded/
    └── General/               MAIN BROCHURE.pdf · Sales Team Feedback Form.pdf
```

`Old/` is deliberately **not** shown in the portal — it stays in Drive.

Two files are Google Sheets with no offline equivalent. In Drive open them and use
**File → Download → Microsoft Excel (.xlsx)**, saving under the names above. Until you do,
the portal shows them greyed with a note.

### Total size
Roughly **730 MB** — the two big brochures alone are 144 MB and 116 MB. Use a 2 GB+ stick.

---

## Cover images (optional but worth it)

Drop a `cover.jpg` in each project folder and it becomes the card photo:

```
collaterals/Sanvi/cover.jpg
collaterals/Hummingvalley/cover.jpg
collaterals/Triton Branded/cover.jpg
```

Landscape, ~1600×1200, under 500 KB. Without one the card falls back to a gradient.

### Hero (front screen)

```
assets/media/hero.mp4          background film, muted loop, keep under ~20 MB
assets/media/hero-poster.jpg   first frame, shown while the video loads
assets/media/hero-bg.jpg       still behind the film
```

All three are optional — the hero falls back to a gradient.

---

## Using it in front of a client

| Key | Does |
|-----|------|
| scroll | expands the hero film, then enters the portal |
| `/` or `Ctrl/Cmd-K` | search every project, folder and file |
| `P` | presentation mode — hides all chrome |
| `Esc` | close viewer / search, or go back |
| `H` | jump home |

PDFs, videos, images and HTML pages open **inside** the portal, on-brand. Office files
(`.pptx`, `.xlsx`) open in their native app via the **Open** button — browsers can't render
those offline.

---

## Adding or changing collateral

Drop files into the right folder, then:

```bash
node tools/generate-manifest.mjs
```

It rescans `collaterals/` and rewrites the project list in `assets/js/data.js`, keeping
your hand-written taglines, tags, covers and ordering. Loose files sitting directly in a
project folder are collected into a **General** folder automatically.

To change wording, edit `assets/js/data.js` directly — the generator preserves it.

---

## Layout

```
index.html                    the whole app shell
assets/css/styles.css         theme tokens live in :root — 8 lines to re-brand
assets/js/data.js             project / folder / file manifest
assets/js/app.js              router, hero, viewer, search
tools/generate-manifest.mjs   rescans collaterals/ and rewrites data.js
collaterals/                  the actual files
```

No build step, no framework, no dependencies. The hero's scroll-expand effect and the
project cards are hand-ported to vanilla JS/CSS specifically so the portal keeps working
from `file://` with no server.

`node_modules/` (if present) is only for the screenshot tooling — it is **not** needed to
run the portal and can be deleted before copying to a USB stick.
