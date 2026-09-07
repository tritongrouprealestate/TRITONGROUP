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
| `Sales Kit/_Portal/` | `hero.mp4` — background film, muted loop, under ~20 MB |
| `Sales Kit/_Portal/` | `hero-poster.jpg` — its first frame |
| `Sales Kit/_Portal/` | `hero-bg.jpg` — the still behind the film |
| `Sales Kit/_Portal/thumbs/` | `<youtube-id>.jpg` — saved video thumbnails |

`_Portal` starts with an underscore, so the portal treats it as its own and never
shows it as a project.

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
| `Esc` | close the viewer or search, or go back |
| `H` | jump home |
| `Shift-R` | reset to the built-in list |

PDFs, videos, images and HTML pages open **inside** the portal, on-brand. Word, Excel
and PowerPoint files open in their own app via the **Open** button — no browser can
display those offline.

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
src/styles.css    all styling; the palette is eight lines at the top
src/data.js       projects, folders, file names and wording
src/app.js        router, hero, folder scanner, viewer, search
```

The hero's scroll-expand effect and the project cards were written in plain JS and CSS
rather than React, because the portal has to run from a double-clicked file with no
server behind it.
