# Triton homepage v3

Static port of the Claude Design prototype `Triton Homepage v3.dc.html` for the WordPress site.

- `src/` original prototype and the readable CSS
- `tools/` converter (`snapshot.js`, `assemble.js`), hand-written behaviour (`home.js`), checks (`check.js`, `func.js`)
- `dist/` what is deployed: `home.css`, `home.js`, `home.fragment.html` (placeholders `%%A%%` asset base, `%%V%%` version)

Assets (webp, fonts) live in `wp-content/uploads/triton-home/` on the site.
