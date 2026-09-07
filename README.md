# Triton Group — Offline Sales Portal

A self-contained sales portal for the field team. **Double-click `index.html`** — it opens in
Chrome with no internet, no server and nothing to install. Copy the whole folder to a laptop
or a USB stick and it works anywhere.

It currently ships with **placeholder content** so it can be demonstrated immediately.
Every placeholder is visibly marked. See *What to replace* below.

---

## For the sales team: the only thing you ever do

1. Put the new file into the right folder inside `collaterals/`.
2. Open the portal, press **Update** (top right), and choose the `collaterals` folder.
3. Done.

The portal reads the folder and remembers it — including after you close the browser or
restart the laptop. You only press Update when files have changed. There is nothing to
install and no command to run.

> Keep the `collaterals` folder next to `index.html`. If you move it elsewhere on the disk
> the portal can list the files but will not be able to open them.

---

## What to replace

Everything below is a placeholder. Replace each file **keeping the same name**, then press
Update. Names must match Google Drive so the team recognises them.

### Project collateral

| Replace this file | With |
|---|---|
| `collaterals/Sanvi/Brochure/Sanvi Brochure September.pdf` | the real brochure (144 MB in Drive) |
| `collaterals/Sanvi/Brochure/Sanvi Brochure PPT.pptx` | the real deck (116 MB) |
| `collaterals/Sanvi/Cost Sheet/Main Cost Sheet 62 Lakhs.png` | the real cost sheet image |
| `collaterals/Sanvi/Cost Sheet/SANVI AERO GARDENS PRICE LIST.xlsx` | the real price list |
| `collaterals/Sanvi/Availability Sheet/SANVI AERO GARDENS LATEST AVAILABILITY SHEET.xlsx` | **export from Drive** — it is a Google Sheet |
| `collaterals/Sanvi/Comparision Sheet/Comparison Sheet.xlsx` | **export from Drive** — it is a Google Sheet |
| `collaterals/Sanvi/Location Advantage/Triton_Project_Advantage.html` | the real HTML page |
| `collaterals/Sanvi/Sanvi Video/Sanvi Aero Gardens _ 1, 2 & 3 BHK … .mp4` | the real film (62 MB) |
| `collaterals/Hummingvalley/Brochure/Brochure - HummingValley.pdf` | the real brochure (23 MB) |
| `collaterals/Hummingvalley/Brochure/PPT - Humming valley.pptx` | the real deck (43 MB) |
| `collaterals/Hummingvalley/Cost Sheet/Villa 20.png` · `Villa 21.png` | the real villa cost sheets |
| `collaterals/Hummingvalley/Master Plan/Master Plan THV.png` | the real master plan |
| `collaterals/Hummingvalley/Video/New AV Video.mp4` | the real film (102 MB) |
| `collaterals/Hummingvalley/Video/Triton Humming Valley … .mp4` | the real film (89 MB) |
| `collaterals/Triton Branded/General/MAIN BROCHURE.pdf` | the real brochure (116 MB) |
| `collaterals/Triton Branded/General/Sales Team Feedback Form.pdf` | the real form |

The two **Google Sheets** have no offline equivalent. Open each in Drive and use
**File → Download → Microsoft Excel (.xlsx)**, saving under the exact name above.

### Card photography — worth doing first

One landscape photo per project becomes the card image. This is the single biggest visual
improvement you can make.

| Replace | With | Ideal |
|---|---|---|
| `collaterals/Sanvi/cover.jpg` | Sanvi hero shot | ~1600×1200, under 500 KB |
| `collaterals/Hummingvalley/cover.jpg` | Humming Valley hero shot | same |
| `collaterals/Triton Branded/cover.jpg` | a corporate/brand image | same |

### Front screen

| Replace | With |
|---|---|
| `assets/media/hero.mp4` | the background film — muted loop, keep under ~20 MB |
| `assets/media/hero-poster.jpg` | its first frame |
| `assets/media/hero-bg.jpg` | the still behind the film |

All three are optional; without them the hero falls back to a gradient.

### Wording

`assets/js/data.js` holds each project's tagline, location line and tag (RESIDENTIAL /
VILLAS / CORPORATE). Edit it in any text editor. Pressing Update never overwrites this copy.

---

## Total size

The real collateral is roughly **730 MB** — the three big brochures alone are 144 MB, 116 MB
and 116 MB. Use a 2 GB or larger stick. The placeholders are about 5 MB.

---

## Using it in front of a client

| Key | Does |
|-----|------|
| scroll | expands the hero film, then enters the portal |
| `/` or `Ctrl/Cmd-K` | search every project, folder and file |
| `P` | presentation mode — hides all chrome |
| `U` | update library |
| `Esc` | close viewer / search, or go back |
| `H` | jump home |
| `Shift-R` | reset to the list that shipped with the portal |

PDFs, videos, images and HTML pages open **inside** the portal, on-brand. Office files
(`.pptx`, `.xlsx`) open in their native app via the **Open** button — no browser can render
those offline.

---

## Folder rules

```
collaterals/
└── <Project>/            → becomes a card on the front screen
    ├── cover.jpg         → that card's photo (not listed as a file)
    └── <Folder>/         → becomes a folder tile inside the project
        └── <any files>   → listed, and opened in the viewer
```

Loose files sitting directly in a project folder are gathered into a **General** folder.
A project named `Old` or `Archive` is hidden automatically. Empty folders stay visible so
you can see what is still missing.

---

## For whoever prepares the master copy

Two optional Node scripts. The sales team never needs either.

```bash
node tools/generate-manifest.mjs    # bake the current folder tree into data.js,
                                    # so even the very first open is populated
node tools/make-placeholders.mjs    # regenerate all placeholder artwork and documents
```

`generate-manifest.mjs` preserves hand-written taglines, tags, covers and ordering.

### Note on git

The placeholder files are committed so the portal demos from a fresh clone. **Before you
copy the real 730 MB of collateral in, run this once** so it never gets committed:

```bash
git rm -r --cached collaterals
```

`.gitignore` already excludes anything new under `collaterals/`.

---

## Layout

```
index.html                    the whole app shell
assets/css/styles.css         theme tokens live in :root — 8 lines to re-brand
assets/js/data.js             project / folder / file manifest and wording
assets/js/app.js              router, hero, library scanner, viewer, search
tools/                        optional prep scripts
collaterals/                  the actual files
```

No build step, no framework, no dependencies. The hero's scroll-expand effect and the
project cards were hand-ported to vanilla JS/CSS specifically so the portal keeps working
from `file://` with no server. The Update button uses a directory input, which is the only
way to read a folder listing without one.
