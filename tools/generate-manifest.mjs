#!/usr/bin/env node
/* ============================================================
   Scans /collaterals and rewrites the `projects` array inside
   assets/js/data.js — between the GENERATED markers.
   Descriptions, tags and covers you have already written are
   preserved by id, so you never lose hand-written copy.

   Usage:  node tools/generate-manifest.mjs
   ============================================================ */
import { readdirSync, statSync, readFileSync, writeFileSync } from 'node:fs';
import { join, dirname, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT     = join(dirname(fileURLToPath(import.meta.url)), '..');
const SRC      = join(ROOT, 'collaterals');
const DATA     = join(ROOT, 'assets/js/data.js');
const IGNORE   = /^(\.|desktop\.ini$|Thumbs\.db$|__MACOSX$|cover\.(jpg|jpeg|png|webp)$)/i;
const COVERS   = ['cover.jpg', 'cover.jpeg', 'cover.png', 'cover.webp'];

const ACCENTS = [
  'linear-gradient(150deg,#1e2a3a,#0a0d12 60%,#2a2208)',
  'linear-gradient(150deg,#16281f,#080c0a 60%,#1f2a08)',
  'linear-gradient(150deg,#2a2208,#0d0b06 60%,#1a1a22)',
  'linear-gradient(150deg,#2a1520,#0d0a0c 60%,#12202a)',
  'linear-gradient(150deg,#1a1a1d,#0a0a0b 60%,#141416)'
];

const slug = s => s.toLowerCase().trim()
  .replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || 'item';

const human = b => b < 1024 ? b + ' B'
  : b < 1048576 ? (b / 1024).toFixed(0) + ' KB'
  : b < 1073741824 ? (b / 1048576).toFixed(1) + ' MB'
  : (b / 1073741824).toFixed(2) + ' GB';

const dirs  = p => { try { return readdirSync(p, { withFileTypes: true }); } catch { return []; } };
const isDir = e => e.isDirectory() && !IGNORE.test(e.name);
const isFile= e => e.isFile() && !IGNORE.test(e.name);

/* -- keep hand-written copy from the existing data.js -- */
let previous = {};
try {
  const src = readFileSync(DATA, 'utf8');
  const ctx = { window: {} };
  new Function('window', src.replace(/^\s*window\.PORTAL_DATA/m, 'window.PORTAL_DATA'))(ctx.window);
  ctx.window.PORTAL_DATA?.projects?.forEach((p, i) => { previous[p.id] = { ...p, _order: i }; });
} catch { /* first run — nothing to preserve */ }

/* -- walk the tree -- */
const projects = dirs(SRC).filter(isDir).map((pd, i) => {
  const pPath = join(SRC, pd.name);
  const id    = slug(pd.name);
  const old   = previous[id] ?? {};
  const oldF  = Object.fromEntries((old.folders ?? []).map(f => [f.id, f]));

  const entries = dirs(pPath);
  const folders = entries.filter(isDir).map(fd => {
    const fPath = join(pPath, fd.name);
    const fid   = slug(fd.name);
    const notes = Object.fromEntries((oldF[fid]?.files ?? []).map(x => [x.name, x.note]));
    const files = dirs(fPath).filter(isFile).map(f => ({
      name: f.name,
      path: relative(ROOT, join(fPath, f.name)).split(/[\\/]/).join('/'),
      size: human(statSync(join(fPath, f.name)).size),
      ...(notes[f.name] ? { note: notes[f.name] } : {})
    })).sort((a, b) => a.name.localeCompare(b.name, undefined, { numeric: true }));
    return { id: fid, name: oldF[fid]?.name ?? fd.name, files };
  });

  /* loose files sitting directly in the project folder */
  const loose = entries.filter(isFile).map(f => ({
    name: f.name,
    path: relative(ROOT, join(pPath, f.name)).split(/[\\/]/).join('/'),
    size: human(statSync(join(pPath, f.name)).size)
  }));
  if (loose.length) folders.unshift({ id: 'general', name: 'General', files: loose });

  const cover = COVERS
    .map(c => ({ c, abs: join(pPath, c) }))
    .find(x => { try { return statSync(x.abs).isFile(); } catch { return false; } });

  return {
    id,
    name:    old.name    ?? pd.name,
    tagline: old.tagline ?? `${folders.length} folders of sales collateral for ${pd.name}.`,
    tag:     old.tag     ?? (/^old|archive/i.test(pd.name) ? 'Archive' : 'Project'),
    ...(old.location ? { location: old.location } : {}),
    ...((old.archive ?? /^old|archive/i.test(pd.name)) ? { archive: true } : {}),
    ...(old.hidden ? { hidden: true } : {}),
    cover:   cover ? `collaterals/${pd.name}/${cover.c}` : (old.cover ?? ''),
    accent:  old.accent ?? ACCENTS[i % ACCENTS.length],
    folders
  };
});

/* keep the order you authored in data.js; archives always last */
projects.sort((a, b) => {
  if (!!a.archive !== !!b.archive) return a.archive ? 1 : -1;
  const oa = previous[a.id]?._order ?? 999, ob = previous[b.id]?._order ?? 999;
  return oa !== ob ? oa - ob : a.name.localeCompare(b.name);
});

if (!projects.length) {
  console.error('No project folders found in /collaterals — nothing written.');
  process.exit(1);
}

/* -- splice into data.js -- */
const file  = readFileSync(DATA, 'utf8');
const START = '/* --- BEGIN GENERATED PROJECTS --- */';
const END   = '/* --- END GENERATED PROJECTS --- */';
const a = file.indexOf(START), b = file.indexOf(END);
if (a < 0 || b < 0) { console.error('Markers missing in data.js'); process.exit(1); }

const body = '  projects: ' + JSON.stringify(projects, null, 2)
  .split('\n').map((l, i) => (i ? '  ' + l : l)).join('\n') + '\n  ';

writeFileSync(DATA, file.slice(0, a + START.length) + '\n' + body + file.slice(b), 'utf8');

const nFiles = projects.reduce((n, p) => n + p.folders.reduce((m, f) => m + f.files.length, 0), 0);
console.log(`✓ data.js rewritten — ${projects.length} projects, ` +
            `${projects.reduce((n, p) => n + p.folders.length, 0)} folders, ${nFiles} files`);
for (const p of projects) console.log(`  · ${p.name.padEnd(20)} ${p.folders.length} folders`);
