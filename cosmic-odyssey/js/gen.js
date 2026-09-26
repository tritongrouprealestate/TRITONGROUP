/* Practice engine: question pools = hand-written questions + parameter-grid generators.
   Every generator enumerates a fixed grid of real values and computes the answer,
   so each variant is exact and the pool size is an honest count. */
(function () {
  const GENS = G.GENS = {};
  const POOLS = G.POOLS = {};
  const LV = G.LEVELS = ["", "Easy", "Medium", "Hard", "Super hard"];

  /* ---------- builders ---------- */
  const sig = (x, d = 3) => {
    if (!isFinite(x)) return "∞";
    const a = Math.abs(x);
    if (a !== 0 && (a >= 1e6 || a < 1e-3)) return G.fmt(x, d);
    return Number(x.toPrecision(d)).toLocaleString("en-IN", { maximumSignificantDigits: d });
  };
  G.sig = sig;
  /* numeric MCQ: v = correct value, w = likely-mistake values, then generic distractors */
  function numQ(o) {
    const u = o.u ? " " + o.u : "", f = x => (o.fmt ? o.fmt(x) : sig(x, o.d || 3)) + u;
    const right = f(o.v), opts = [right];
    const cands = (o.w || []).concat([o.v * 2, o.v / 2, o.v * 4, o.v / 4, o.v * 10, o.v / 10, o.v * 3, o.v * 1.5]);
    for (const x of cands) { if (opts.length >= 4) break; if (!isFinite(x) || x === 0 && o.v !== 0) continue; const s = f(x); if (!opts.includes(s)) opts.push(s); }
    const sh = G.shuffle(opts);
    return { q: o.q, o: sh, a: sh.indexOf(right), e: o.e, steps: o.steps, lv: o.lv, c: o.c, tip: o.tip };
  }
  /* text MCQ: right answer + pool of wrong answers */
  function pickQ(o) {
    const wrong = G.shuffle([...new Set(o.pool.filter(x => x !== o.right))]).slice(0, (o.n || 4) - 1);
    const sh = G.shuffle([o.right, ...wrong]);
    return { q: o.q, o: sh, a: sh.indexOf(o.right), e: o.e, steps: o.steps, lv: o.lv, c: o.c };
  }
  function tf(o) { return { q: o.q, o: ["Fact", "Myth"], a: o.fact ? 0 : 1, e: o.e, lv: o.lv || 1, c: o.c }; }
  G.qb = { numQ, pickQ, tf };

  /* generator: grid = array of value lists; fn receives one value from each */
  G.gen = function (id, lv, grid, fn, c) {
    const n = grid.reduce((p, g) => p * g.length, 1);
    if (GENS[id]) console.warn("Duplicate generator id: " + id);
    GENS[id] = { id, lv, n, c, make(i) {
      const vals = []; let k = i;
      for (let g = grid.length - 1; g >= 0; g--) { vals.unshift(grid[g][k % grid[g].length]); k = Math.floor(k / grid[g].length); }
      let r = fn(...vals);
      if (r.v !== undefined) r = numQ(r);
      r.lv = r.lv || lv; r.c = r.c || c; r.key = id + ":" + i;
      return r;
    } };
    return GENS[id];
  };
  const gen = G.gen;

  /* pools: fixed() returns question objects; gens are ids (prefix match allowed: "stars.*") */
  G.pool = function (id, def) { POOLS[id] = def; };
  function resolve(id) {
    const P = POOLS[id]; if (!P) return { fixed: [], gens: [] };
    if (!P._fixed) P._fixed = (P.fixed ? P.fixed() : []).map((q, i) => Object.assign({ key: id + "#" + i, lv: 2 }, q));
    if (!P._gens) {
      const ids = [];
      (P.gens || []).forEach(g => { if (g.endsWith("*")) Object.keys(GENS).filter(k => k.startsWith(g.slice(0, -1))).forEach(k => ids.push(k)); else if (GENS[g]) ids.push(g); });
      (P.include || []).forEach(pid => { const r = resolve(pid); ids.push(...r.gens.map(g => g.id)); });
      P._gens = [...new Set(ids)].map(k => GENS[k]);
      if (P.include) { const seen = new Set(); P._fixed = P._fixed.concat(...P.include.map(pid => resolve(pid).fixed)).filter(q => { const k = q.q + "|" + (q.o || []).join("|"); if (seen.has(k)) return false; seen.add(k); return true; }); }
    }
    return { fixed: P._fixed, gens: P._gens, name: P.name };
  }
  G.poolInfo = function (id) {
    const { fixed, gens } = resolve(id);
    const by = [0, 0, 0, 0, 0];
    fixed.forEach(q => by[q.lv]++);
    gens.forEach(g => by[g.lv] += g.n);
    return { total: by.reduce((a, b) => a + b, 0), by };
  };
  /* draw a question at a level (0 = any), avoiding keys in `seen` when possible */
  G.drawQ = function (id, lv, seen) {
    const { fixed, gens } = resolve(id);
    const F = fixed.filter(q => !lv || q.lv === lv), Gs = gens.filter(g => !lv || g.lv === lv);
    const total = F.length + Gs.reduce((s, g) => s + g.n, 0);
    if (!total) return null;
    for (let tries = 0; tries < 30; tries++) {
      let r = Math.floor(Math.random() * total), q;
      if (r < F.length) q = F[r];
      else { r -= F.length; for (const g of Gs) { if (r < g.n) { q = g.make(r); break; } r -= g.n; } }
      if (!seen || !seen.has(q.key) || tries === 29) {
        if (q.o && !q.fixedOrder && !q._shuf) { const idx = G.shuffle(q.o.map((_, i) => i)); if (q.o[0] !== "Fact") q = Object.assign({}, q, { o: idx.map(i => q.o[i]), a: idx.indexOf(q.a), whys: q.whys ? idx.map(i => q.whys[i]) : undefined }); }
        return q;
      }
    }
  };
  G.drawSet = function (id, n) { const seen = new Set(), out = []; for (let i = 0; i < n; i++) { const q = G.drawQ(id, 0, seen); if (!q) break; seen.add(q.key); out.push(q); } return out; };

  /* ================= SHARED DATA ================= */
  const PL = G.PLANETS = [
    { n: "Mercury", g: 3.70, R: 2440, a: 0.387, yr: 88, day: 1407.6, T: 167 },
    { n: "Venus", g: 8.87, R: 6052, a: 0.723, yr: 224.7, day: 5832.5, T: 464 },
    { n: "Earth", g: 9.81, R: 6371, a: 1, yr: 365.25, day: 23.93, T: 15 },
    { n: "Mars", g: 3.71, R: 3390, a: 1.524, yr: 687, day: 24.62, T: -65 },
    { n: "Jupiter", g: 24.79, R: 69911, a: 5.20, yr: 4333, day: 9.93, T: -110 },
    { n: "Saturn", g: 10.44, R: 58232, a: 9.58, yr: 10759, day: 10.66, T: -140 },
    { n: "Uranus", g: 8.69, R: 25362, a: 19.2, yr: 30687, day: 17.24, T: -195 },
    { n: "Neptune", g: 11.15, R: 24622, a: 30.05, yr: 60190, day: 16.11, T: -200 }
  ];
  const MOON = { n: "the Moon", g: 1.62, R: 1737 };
  const MU = 3.986e14, RE = 6.371e6;
  const STARS = [["Proxima Centauri", 3040], ["Betelgeuse", 3600], ["Antares", 3600], ["Aldebaran", 3900], ["Arcturus", 4290], ["the Sun", 5772], ["Procyon A", 6530], ["Vega", 9600], ["Sirius A", 9940], ["Rigel", 12100], ["Spica", 25300], ["Sirius B", 25000]];
  const PARALLAX = [["Proxima Centauri", 0.768], ["Alpha Centauri A", 0.747], ["Sirius", 0.379], ["Procyon", 0.285], ["Altair", 0.195], ["Vega", 0.130], ["Arcturus", 0.0889], ["Capella", 0.0763], ["Aldebaran", 0.0500]];
  const CITIES = [["Delhi", 28.6], ["Mumbai", 19.1], ["Kolkata", 22.6], ["Chennai", 13.1], ["Bengaluru", 13.0], ["Srinagar", 34.1], ["Guwahati", 26.1], ["Thiruvananthapuram", 8.5], ["Jaipur", 26.9], ["Lucknow", 26.8], ["Hyderabad", 17.4], ["Ahmedabad", 23.0], ["Bhopal", 23.3], ["Patna", 25.6], ["Chandigarh", 30.7], ["Shillong", 25.6]];
  const specOf = T => T > 30000 ? "O" : T > 10000 ? "B" : T > 7500 ? "A" : T > 6000 ? "F" : T > 5200 ? "G" : T > 3700 ? "K" : "M";
  const band = nm => nm < 10 ? "X-ray" : nm < 400 ? "ultraviolet" : nm <= 700 ? "visible light" : nm < 1e6 ? "infrared" : "microwave or radio";

  /* ================= ORIGIN ================= */
  const AGE = 13.8e9;
  const EVENTS = () => DATA.calendar;
  const calDate = ago => {
    const sec = (1 - ago / AGE) * 365 * 86400, d = new Date(Date.UTC(2025, 0, 1) + sec * 1000);
    const m = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"][d.getUTCMonth()];
    return d.getUTCMonth() === 11 && d.getUTCDate() === 31 ? `31 Dec, ${String(d.getUTCHours()).padStart(2, "0")}:${String(d.getUTCMinutes()).padStart(2, "0")}` : `${d.getUTCDate()} ${m}`;
  };
  gen("origin.calendar", 1, [DATA.calendar.map((_, i) => i)], i => {
    const ev = EVENTS()[i];
    return pickQ({ q: `Squeeze the universe's 13.8-billion-year history into one calendar year. Roughly when does this happen: <b>${ev.label}</b>?`, right: calDate(ev.ago), pool: EVENTS().map(e => calDate(e.ago)),
      e: `${ev.label} was about ${G.duration(ev.ago * 31557600)} ago. As a fraction of 13.8 billion years, that lands on ${calDate(ev.ago)}.`, c: "cosmic calendar" });
  });
  const LOOK = [["the Moon", "1.3 seconds"], ["the Sun", "about 8 minutes"], ["Proxima Centauri", "4.2 years"], ["Sirius", "8.6 years"], ["Vega", "25 years"], ["the centre of the Milky Way", "about 26,000 years"], ["the Andromeda Galaxy", "2.5 million years"]];
  gen("origin.look", 1, [LOOK], L => pickQ({ q: `When you look at ${L[0]}, you see light that left it how long ago?`, right: L[1], pool: LOOK.map(x => x[1]), e: `Light is fast but not instant. Looking far away means looking back in time. Light from ${L[0]} left it ${L[1]} ago.`, c: "light year" }));
  gen("origin.hubble", 2, [[10, 20, 50, 100, 200, 500, 1000]], d => ({ q: `Using Hubble's law with H₀ = 70 km/s per megaparsec, how fast does a galaxy ${d} Mpc away recede?`, v: 70 * d, u: "km/s", w: [70 / d, 70 * d * 3.26], e: "v = H₀ × d. Twice as far means twice as fast.", steps: [`v = H₀ d`, `v = 70 × ${d}`, `v = ${sig(70 * d)} km/s`], c: "Hubble's law" }));
  gen("origin.hubbleinv", 2, [[700, 3500, 7000, 14000, 35000]], v => ({ q: `A galaxy recedes at ${v.toLocaleString("en-IN")} km/s. With H₀ = 70 km/s/Mpc, how far away is it?`, v: v / 70, u: "Mpc", w: [v * 70], e: "d = v / H₀.", steps: [`d = v / H₀ = ${v} / 70`, `d = ${sig(v / 70)} Mpc (1 Mpc ≈ 3.26 million light years)`], c: "Hubble's law" }));
  gen("origin.htime", 3, [[60, 65, 67, 70, 73, 75, 80]], H => { const t = 3.086e19 / H / 3.156e16; return { q: `The 'Hubble time' 1/H₀ roughly estimates the age of the universe. If H₀ = ${H} km/s/Mpc, what is 1/H₀? (1 Mpc = 3.086 × 10¹⁹ km)`, v: t, u: "billion years", w: [t / 2, t * 1.5], d: 3, e: "Run expansion backwards at a steady rate and everything meets at time 1/H₀. The real age (13.8 billion years) also depends on how expansion slowed and then sped up.", steps: [`1/H₀ = 3.086 × 10¹⁹ km ÷ ${H} km/s = ${sig(3.086e19 / H)} s`, `÷ 3.156 × 10¹⁶ s per billion years`, `≈ ${sig(t)} billion years`], c: "Hubble's law" }; });
  gen("origin.z", 2, [[0.1, 0.5, 1, 2, 3, 6, 10], ["Hα", "Lyα"]], (z, line) => { const L0 = line === "Hα" ? 656.3 : 121.6, L = L0 * (1 + z); return { q: `The ${line} line is emitted at ${L0} nm. In a distant galaxy it is observed at ${sig(L, 4)} nm. What is the redshift z?`, v: z, w: [z + 1, L / L0 * 2, z / 2], fmt: x => x.toFixed(2).replace(/\.00$/, ""), e: "z = (λ_observed − λ_emitted) / λ_emitted. The light has been stretched by a factor (1 + z) as space expanded.", steps: [`z = (${sig(L, 4)} − ${L0}) / ${L0}`, `z = ${z}`, `The universe has grown ${1 + z} times larger since that light left`], c: "redshift" }; });
  gen("origin.cmbT", 3, [[1, 9, 99, 1099]], z => ({ q: `The CMB temperature scales as T = 2.725 K × (1 + z). What was it at redshift z = ${z}?`, v: 2.725 * (1 + z), u: "K", w: [2.725 * z, 2.725 / (1 + z)], e: "As space stretches, radiation cools in proportion. At z ≈ 1100 it was about 3000 K, hot enough to glow orange: that is when the CMB was released.", c: "cosmic microwave background" }));
  gen("origin.wien", 2, [[2.725, 10, 100, 1000, 3000, 5772]], T => { const nm = 2.898e6 / T; return pickQ({ q: `Radiation at ${T} K peaks at about ${sig(nm)} nm. Which part of the spectrum is that?`, right: band(nm), pool: ["X-ray", "ultraviolet", "visible light", "infrared", "microwave or radio"], e: `Wien's law: λ_max = 2.898 × 10⁻³ m·K ÷ T = ${sig(nm)} nm. ${T === 2.725 ? "That is why the Big Bang's afterglow is seen in microwaves today." : ""}`, c: "Wien's law" }); });
  gen("origin.order", 1, [(() => { const o = []; DATA.epochs.forEach((x, i) => DATA.epochs.forEach((y, j) => { if (i < j) o.push([x, y]); })); return o; })()], pr => {
    const [A, B] = pr;
    return { q: `Which happened first: <b>${A.title}</b> or <b>${B.title}</b>?`, o: [A.title, B.title], a: 0, e: `${A.title} (${A.t}) came before ${B.title} (${B.t}).`, c: "Big Bang" };
  });
  gen("origin.when", 1, [DATA.epochs.map((_, i) => i)], i => pickQ({ q: `When did this happen: <b>${DATA.epochs[i].title}</b>?`, right: DATA.epochs[i].t, pool: DATA.epochs.map(e => e.t), e: DATA.epochs[i].body, c: "Big Bang" }));

  /* ================= STARS ================= */
  gen("stars.life", 2, [[0.5, 0.8, 1, 2, 3, 5, 10, 15, 20]], M => { const t = 1e10 * Math.pow(M, -2.5); return { q: `Main-sequence lifetime roughly follows t ≈ 10 billion years × M^−2.5 (M in Suns). About how long does a ${M}-Sun star live?`, v: t / 1e9, u: "billion years", w: [10 * M, 10 / M], e: "Heavier stars have more fuel but burn it far faster, so they die much younger.", steps: [`t = 10¹⁰ × ${M}^−2.5 years`, `${M}^2.5 = ${sig(Math.pow(M, 2.5))}`, `t ≈ ${sig(t / 1e9)} billion years`], c: "main sequence" }; });
  gen("stars.wien", 2, [STARS], s => ({ q: `${s[0]} has a surface temperature of about ${s[1].toLocaleString("en-IN")} K. At what wavelength does its light peak? (Wien: λ_max T = 2.898 × 10⁻³ m·K)`, v: 2.898e6 / s[1], u: "nm", w: [2.898e6 / s[1] * 10, s[1] / 10], e: `Hotter means shorter peak wavelength. ${2.898e6 / s[1] < 400 ? "This star peaks in the ultraviolet, so it looks blue-white." : 2.898e6 / s[1] > 700 ? "It peaks in the infrared, so it looks red-orange." : "It peaks in visible light."}`, c: "Wien's law" }));
  gen("stars.band", 1, [STARS], s => { const nm = 2.898e6 / s[1]; return pickQ({ q: `${s[0]} (${s[1].toLocaleString("en-IN")} K): its light peaks in which region?`, right: band(nm), pool: ["ultraviolet", "visible light", "infrared", "X-ray"], e: `λ_max ≈ ${sig(nm)} nm.`, c: "Wien's law" }); });
  gen("stars.stefan", 3, [[0.5, 1, 2, 10, 100], [0.5, 1, 2]], (R, T) => { const L = R * R * Math.pow(T, 4); return { q: `A star has ${R}× the Sun's radius and ${T}× its surface temperature. How many times brighter than the Sun is it? (L ∝ R²T⁴)`, v: L, u: "× the Sun", w: [R * T, R * R * T * T, R * Math.pow(T, 4)], e: "Luminosity grows with surface area (R²) and with how brightly each square metre glows (T⁴).", steps: [`L/L☉ = (R/R☉)² × (T/T☉)⁴`, `= ${R}² × ${T}⁴ = ${sig(R * R)} × ${sig(Math.pow(T, 4))}`, `= ${sig(L)}`], c: "Stefan–Boltzmann law" }; });
  gen("stars.mag", 3, [[1, 2, 2.5, 5, 10, 15]], dm => ({ q: `Star A is ${dm} magnitudes brighter than star B. How many times more light does A send us? (5 magnitudes = 100×)`, v: Math.pow(100, dm / 5), u: "times", w: [dm * 20, Math.pow(10, dm), dm], e: "Each magnitude step is a factor of 100^(1/5) ≈ 2.512.", steps: [`ratio = 100^(Δm/5) = 100^(${dm}/5)`, `= ${sig(Math.pow(100, dm / 5))}`], c: "magnitude" }));
  gen("stars.plx", 2, [PARALLAX, ["pc", "ly"]], (s, u) => { const pc = 1 / s[1]; return { q: `${s[0]} has a parallax of ${s[1]} arcseconds. How far away is it in ${u === "pc" ? "parsecs" : "light years"}?`, v: u === "pc" ? pc : pc * 3.26, u: u === "pc" ? "pc" : "ly", w: [s[1], s[1] * 3.26, pc * (u === "pc" ? 3.26 : 1)], e: "d (parsecs) = 1 / p (arcseconds). 1 parsec = 3.26 light years.", steps: [`d = 1 / ${s[1]} = ${sig(pc)} pc`, u === "ly" ? `× 3.26 = ${sig(pc * 3.26)} light years` : "Done"], c: "parallax" }; });
  gen("stars.spec", 1, [[3000, 3500, 4200, 5000, 5800, 6500, 7200, 8500, 11000, 20000, 28000, 40000]], T => pickQ({ q: `A star's surface is ${T.toLocaleString("en-IN")} K. What is its spectral class?`, right: specOf(T), pool: ["O", "B", "A", "F", "G", "K", "M"], e: "O > 30,000 K, B 10,000–30,000, A 7,500–10,000, F 6,000–7,500, G 5,200–6,000, K 3,700–5,200, M below 3,700.", c: "spectral class" }));
  gen("stars.fate", 1, [[0.2, 0.4, 1, 2, 5, 10, 15, 20, 30, 40]], M => pickQ({ q: `A star begins life with ${M} times the Sun's mass. How does it end (simplified)?`, right: M < 0.5 ? "It is still burning: red dwarfs outlive the universe so far" : M < 8 ? "White dwarf" : M < 25 ? "Neutron star" : "Black hole", pool: ["It is still burning: red dwarfs outlive the universe so far", "White dwarf", "Neutron star", "Black hole"], e: "Rough cut-offs: below 8 Suns a white dwarf, 8 to about 25 a neutron star, heavier a black hole. Spin, chemistry and companions can change this.", c: "white dwarf" }));
  const pairs = a => { const o = []; a.forEach((x, i) => a.forEach((y, j) => { if (i < j) o.push([x, y]); })); return o; };
  gen("stars.hotter", 1, [pairs(STARS.filter(s => s[0] !== "Antares"))], p => { const [a, b] = p; if (a[1] === b[1]) return { q: `Which is hotter, ${a[0]} or ${b[0]}?`, o: [a[0], b[0], "About the same"], a: 2, e: "Both are about the same temperature." }; const h = a[1] > b[1] ? a : b; return { q: `Which star is hotter on the surface: ${a[0]} or ${b[0]}?`, o: [a[0], b[0]], a: h === a ? 0 : 1, e: `${a[0]} ≈ ${a[1].toLocaleString("en-IN")} K, ${b[0]} ≈ ${b[1].toLocaleString("en-IN")} K. Bluer means hotter.`, c: "spectral class" }; });
  gen("stars.rs", 2, [[3, 5, 10, 20, 50]], M => ({ q: `If a collapsed star of ${M} solar masses forms a black hole, what is its event horizon radius? (≈ 2.95 km per solar mass)`, v: 2.95 * M, u: "km", w: [2.95 / M, 2.95 * M * M], e: "r_s = 2GM/c² grows in direct proportion to mass.", c: "event horizon" }));
  gen("stars.ml", 3, [[2, 3, 5, 10]], M => ({ q: `For main-sequence stars L ≈ M^3.5 (in solar units). How luminous is a ${M}-Sun star?`, v: Math.pow(M, 3.5), u: "× the Sun", w: [M * 3.5, M * M], e: "A small increase in mass gives a huge increase in brightness. That is why heavy stars burn out fast.", c: "main sequence" }));

  /* ================= SKY ================= */
  const C = () => DATA.constellations;
  const skyStars = DATA.constellations.flatMap(c => c.stars.filter(s => s[3] < 3.2 && !/ /.test(s[0])).map(s => [s[0], c.name]));
  gen("sky.starin", 1, [skyStars], s => pickQ({ q: `The star <b>${s[0]}</b> belongs to which constellation?`, right: s[1], pool: C().map(c => c.name), e: `${s[0]} is in ${s[1]}. Open the Sky Atlas and draw it to remember.`, c: "constellation" }));
  const withIndian = DATA.constellations.filter(c => c.indian);
  gen("sky.indian", 1, [withIndian], c => pickQ({ q: `In Indian astronomy, which constellation is linked with: <b>${c.indian}</b>?`, right: c.name, pool: C().map(x => x.name), e: `${c.name} (${c.meaning}).`, c: "nakshatra" }));
  gen("sky.best", 1, [DATA.constellations], c => pickQ({ q: `When is ${c.name} best seen in the evening sky from India?`, right: c.best, pool: C().map(x => x.best), e: `${c.name}: ${c.best}, towards the ${c.dir.toLowerCase()}.`, c: "constellation" }));
  gen("sky.bright", 1, [DATA.constellations], c => { const b = [...c.stars].sort((x, y) => x[3] - y[3])[0][0]; return pickQ({ q: `Which is the brightest star in ${c.name}?`, right: b, pool: DATA.constellations.flatMap(x => x.stars.map(s => s[0])).filter(n => !/ /.test(n)), e: `${b}. Lower magnitude means brighter.`, c: "magnitude" }); });
  gen("sky.polaris", 2, [CITIES], c => ({ q: `From ${c[0]} (latitude ${c[1]}°N), how high above the northern horizon does Polaris stand?`, v: c[1], u: "°", w: [90 - c[1], c[1] / 2, 90], fmt: x => x.toFixed(1), e: "Polaris's altitude equals your latitude. At the North Pole it is overhead (90°); at the equator it sits on the horizon.", c: "latitude" }));
  const PH = [[0, "New moon"], [4, "Waxing crescent"], [7.4, "First quarter"], [11, "Waxing gibbous"], [14.8, "Full moon"], [18.5, "Waning gibbous"], [22.1, "Last quarter"], [26, "Waning crescent"]];
  gen("sky.phase", 1, [PH], p => pickQ({ q: `About ${p[0]} days after new moon, what phase is the Moon?`, right: p[1], pool: PH.map(x => x[1]), e: "The cycle takes about 29.5 days: new, crescent, first quarter (≈7.4 d), gibbous, full (≈14.8 d), then back.", c: "moon phase" }));
  gen("sky.lit", 2, [PH], p => { const f = (1 - Math.cos(p[0] / 29.53 * 2 * Math.PI)) / 2 * 100; return { q: `About ${p[0]} days after new moon, roughly what percentage of the Moon's face is lit? (f = (1 − cos θ)/2, θ = 360° × days/29.53)`, v: Math.round(f), u: "%", w: [Math.round(100 - f), Math.round(p[0] / 29.53 * 100)], fmt: x => String(Math.round(x)), e: "Half the Moon is always sunlit. We see more of that lit half as the Moon moves away from the Sun in our sky.", c: "moon phase" }; });
  gen("sky.rise", 2, [[1, 2, 3, 5, 7]], n => ({ q: `The Moon rises about 50 minutes later each day. If it rises at 7:00 pm today, about how much later will it rise after ${n} days?`, v: n * 50, u: "minutes", w: [n * 24, n * 60, 50], fmt: x => String(Math.round(x)), e: "The Moon moves about 13° eastward along its orbit each day, so Earth must turn about 50 minutes extra to bring it back into view.", c: "moon phase" }));

  /* ================= SPACETIME ================= */
  const MASSOBJ = [["Earth", 3.0e-6], ["the Sun", 1], ["a 10-Sun star", 10], ["a 30-Sun star", 30], ["Sagittarius A* (4.3 million Suns)", 4.3e6], ["M87* (6.5 billion Suns)", 6.5e9], ["Jupiter", 9.55e-4]];
  gen("st.rs", 2, [MASSOBJ], m => { const km = 2.95 * m[1]; return { q: `If ${m[0]} were squeezed into a black hole, what would its event horizon radius be? (≈ 2.95 km per solar mass)`, v: km, u: "km", w: [km * 1000, km / 2.95, 2.95 / m[1]], e: "r_s = 2GM/c². Earth would shrink to about 9 mm, the size of a marble.", c: "event horizon" }; });
  gen("st.rsbig", 1, [pairs(MASSOBJ)], p => { const big = p[0][1] > p[1][1] ? p[0] : p[1]; return { q: `Which would have the larger event horizon if made into a black hole: ${p[0][0]} or ${p[1][0]}?`, o: [p[0][0], p[1][0]], a: big === p[0] ? 0 : 1, e: "Event horizon radius is proportional to mass. More mass, bigger horizon.", c: "event horizon" }; });
  const VS = [0.1, 0.5, 0.6, 0.8, 0.866, 0.9, 0.95, 0.99, 0.999];
  const gam = v => 1 / Math.sqrt(1 - v * v);
  gen("st.gamma", 2, [VS], v => ({ q: `What is the time dilation factor γ = 1/√(1 − v²/c²) at ${v}c?`, v: gam(v), w: [1 / gam(v), 1 + v, gam(v) * gam(v)], fmt: x => x.toFixed(3), e: "At everyday speeds γ ≈ 1. It rockets towards infinity as v approaches c.", steps: [`v²/c² = ${sig(v * v)}`, `1 − v²/c² = ${sig(1 - v * v)}`, `γ = 1/√${sig(1 - v * v)} = ${gam(v).toFixed(3)}`], c: "time dilation" }));
  gen("st.ship", 3, [VS], v => ({ q: `A spaceship flies at ${v}c for 10 years as measured on Earth. How much time passes for the crew?`, v: 10 / gam(v), u: "years", w: [10 * gam(v), 10 * v], e: "Moving clocks run slow: t_crew = t_Earth / γ.", steps: [`γ = ${gam(v).toFixed(3)}`, `t = 10 / ${gam(v).toFixed(3)} = ${sig(10 / gam(v))} years`], c: "time dilation" }));
  gen("st.length", 3, [VS], v => ({ q: `A 100 m spaceship flies past you at ${v}c. How long does it look to you?`, v: 100 / gam(v), u: "m", w: [100 * gam(v), 100 * v], e: "Length contraction: L = L₀/γ, only along the direction of motion.", c: "length contraction" }));
  gen("st.grav", 3, [[1.1, 1.5, 2, 3, 5, 10]], x => { const f = 1 / Math.sqrt(1 - 1 / x); return { q: `You hover at ${x} times the event horizon radius of a black hole. For each hour on your watch, how many hours pass for a friend far away? (factor = 1/√(1 − r_s/r))`, v: f, u: "hours", w: [x, 1 / f, Math.sqrt(x)], fmt: x2 => x2.toFixed(2), e: "Deeper in a gravity well, clocks tick slower.", c: "time dilation" }; });
  gen("st.emc2", 2, [[["1 microgram", 1e-9], ["1 milligram", 1e-6], ["1 gram", 1e-3], ["1 kilogram", 1]]], m => ({ q: `How much energy is locked in ${m[0]} of mass? (E = mc², c = 3 × 10⁸ m/s)`, v: m[1] * 9e16, u: "J", w: [m[1] * 3e8, m[1] * 9e8], e: `That is about ${sig(m[1] * 9e16 / 3.6e6)} kWh. Tiny mass, enormous energy.`, c: "E = mc²" }));
  gen("st.trip", 4, [[["Proxima Centauri", 4.24], ["Sirius", 8.6], ["Vega", 25]], [0.5, 0.9, 0.99]], (d, v) => { const tE = 2 * d[1] / v, tS = tE / gam(v); return { q: `Kutush flies to ${d[0]} (${d[1]} light years) and straight back at ${v}c. How much does she age on the trip?`, v: tS, u: "years", w: [tE, tE * gam(v), 2 * d[1]], e: `Earth time = 2d/v = ${sig(tE)} years. Her time = Earth time / γ.`, steps: [`Earth time = 2 × ${d[1]} / ${v} = ${sig(tE)} years`, `γ = ${gam(v).toFixed(3)}`, `Her time = ${sig(tE)} / ${gam(v).toFixed(3)} = ${sig(tS)} years`], c: "twin paradox" }; });
  gen("st.needv", 3, [[1.5, 2, 3, 5, 10, 100]], k => ({ q: `How fast must you travel for time to slow by a factor γ = ${k}? (v/c = √(1 − 1/γ²))`, v: Math.sqrt(1 - 1 / (k * k)), u: "c", w: [1 - 1 / k, 1 / k], fmt: x => x.toFixed(4), e: "Big γ needs speeds extremely close to light.", c: "time dilation" }));
  gen("st.muon", 4, [[0.98, 0.99, 0.995, 0.999]], v => { const d = gam(v) * v * 3e8 * 2.2e-6; return { q: `A muon lives 2.2 μs at rest. Moving at ${v}c, about how far does it travel before decaying, as seen from the ground?`, v: d / 1000, u: "km", w: [v * 3e8 * 2.2e-6 / 1000, d / 1000 / gam(v) / gam(v)], e: "Without relativity it would go only ~660 m. Time dilation stretches its life by γ, so it reaches the ground from high in the atmosphere.", steps: [`γ = ${gam(v).toFixed(2)}`, `life seen from ground = ${sig(gam(v) * 2.2)} μs`, `distance = v × t = ${sig(d / 1000)} km`], c: "time dilation" }; });
  gen("st.photon", 3, [[1, 3, 10, 30, 100]], M => ({ q: `Light can orbit a black hole at 1.5 times its event horizon radius (the photon sphere). For a ${M}-Sun black hole, how far from the centre is that?`, v: 1.5 * 2.95 * M, u: "km", w: [2.95 * M, 3 * 2.95 * M], e: "r_photon = 1.5 r_s = 3GM/c².", c: "photon sphere" }));

  /* ================= NEWTON / MOTION / GRAVITY ================= */
  gen("nw.fma", 1, [[2, 5, 10, 20, 50], [1, 2, 3, 5]], (m, a) => ({ q: `What force gives a ${m} kg object an acceleration of ${a} m/s²?`, v: m * a, u: "N", w: [m / a, m + a], e: "F = ma.", c: "Newton's second law" }));
  gen("nw.acc", 1, [[10, 20, 50, 100, 200], [2, 4, 5, 10]], (F, m) => ({ q: `A ${F} N net force acts on a ${m} kg trolley. Find its acceleration.`, v: F / m, u: "m/s²", w: [F * m, m / F], e: "a = F/m.", c: "Newton's second law" }));
  const BODIES = PL.concat([MOON, { n: "Pluto", g: 0.62 }]);
  gen("nw.weight", 1, [[40, 50, 60, 70], BODIES], (m, b) => ({ q: `Kutush's mass is ${m} kg. What is her weight on ${b.n}? (g = ${b.g} m/s²)`, v: m * b.g, u: "N", w: [m, m * 9.81, m / b.g], e: `W = mg. Her mass stays ${m} kg everywhere; only the pull changes.`, c: "weight" }));
  const HS = [200, 400, 600, 800, 1000, 2000, 5000, 20200, 35786];
  gen("nw.orbv", 2, [HS], h => { const r = RE + h * 1e3, v = Math.sqrt(MU / r); return { q: `What is the orbital speed of a satellite ${h.toLocaleString("en-IN")} km above Earth? (GM = 3.986 × 10¹⁴ m³/s², R = 6371 km)`, v: v / 1000, u: "km/s", w: [Math.sqrt(2 * MU / r) / 1000, Math.sqrt(MU / (h * 1e3)) / 1000], e: "v = √(GM/r), where r is measured from Earth's centre, not the surface.", steps: [`r = 6371 + ${h} = ${(6371 + h).toLocaleString("en-IN")} km`, `v = √(3.986 × 10¹⁴ / ${sig(r)})`, `v = ${sig(v / 1000)} km/s`], c: "orbital speed" }; });
  gen("nw.orbT", 3, [HS], h => { const r = RE + h * 1e3, T = 2 * Math.PI * Math.sqrt(r * r * r / MU); return { q: `How long does a satellite ${h.toLocaleString("en-IN")} km above Earth take to complete one orbit?`, v: T / 60, u: "min", w: [2 * Math.PI * Math.sqrt(Math.pow(h * 1e3, 3) / MU) / 60, T / 3600], e: "T = 2π√(r³/GM). Higher orbits are slower and longer.", steps: [`r = ${sig(r)} m`, `T = 2π √(r³ / GM) = ${sig(T)} s`, `= ${sig(T / 60)} minutes (${sig(T / 3600)} hours)`], c: "Kepler's third law" }; });
  gen("nw.esc", 2, [PL.concat([MOON])], b => { const v = Math.sqrt(2 * b.g * b.R * 1000); return { q: `What is the escape speed from the surface of ${b.n}? (g = ${b.g} m/s², R = ${b.R.toLocaleString("en-IN")} km)`, v: v / 1000, u: "km/s", w: [Math.sqrt(b.g * b.R * 1000) / 1000, 2 * b.g * b.R / 1000], e: "v_esc = √(2gR) = √(2GM/R). It does not depend on the mass of the object you launch.", steps: [`v = √(2 × ${b.g} × ${sig(b.R * 1000)})`, `v = ${sig(v / 1000)} km/s`], c: "escape velocity" }; });
  gen("nw.kepler", 2, [PL.filter(p => p.n !== "Earth")], p => ({ q: `${p.n} orbits the Sun at ${p.a} AU. Using Kepler's third law (T² = a³, T in years), find its year.`, v: Math.pow(p.a, 1.5), u: "Earth years", w: [p.a, p.a * p.a, Math.pow(p.a, 2 / 3)], e: `The real value is ${sig(p.yr / 365.25)} years. Kepler nailed it.`, steps: [`T = a^1.5 = ${p.a}^1.5`, `T = ${sig(Math.pow(p.a, 1.5))} years`], c: "Kepler's third law" }));
  gen("nw.kepler2", 3, [[2, 4, 9, 16, 25, 100]], a => ({ q: `An asteroid orbits the Sun at ${a} AU. How long is its year?`, v: Math.pow(a, 1.5), u: "years", w: [a, a * a], e: "T = a^(3/2).", c: "Kepler's third law" }));
  gen("nw.recoil", 2, [[2, 3, 4, 5], [10, 20, 50], [300, 400, 500]], (M, mg, v) => ({ q: `A ${M} kg gun fires a ${mg} g bullet at ${v} m/s. Find the gun's recoil speed.`, v: mg / 1000 * v / M, u: "m/s", w: [mg * v / M, M * v / mg], e: "Total momentum is zero before and after: m_bullet × v_bullet = M_gun × V_gun.", steps: [`${mg / 1000} × ${v} = ${M} × V`, `V = ${sig(mg / 1000 * v / M)} m/s backwards`], c: "momentum" }));
  gen("nw.stick", 2, [[1, 2, 3], [2, 4, 6], [1, 2, 4]], (m1, v1, m2) => ({ q: `A ${m1} kg cart moving at ${v1} m/s hits a ${m2} kg cart at rest. They stick together. How fast do they move?`, v: m1 * v1 / (m1 + m2), u: "m/s", w: [v1 / 2, m1 * v1 / m2, v1], e: "Momentum is conserved (kinetic energy is not, in a sticking collision).", steps: [`m₁v₁ = (m₁ + m₂)v`, `v = ${m1} × ${v1} / ${m1 + m2} = ${sig(m1 * v1 / (m1 + m2))} m/s`], c: "momentum" }));
  const WG = [["Earth", 9.8], ["the Moon", 1.62], ["Mars", 3.71]];
  gen("nw.range", 2, [[10, 20, 30], [15, 30, 45, 60, 75], WG], (u, th, w) => { const R = u * u * Math.sin(2 * th * Math.PI / 180) / w[1]; return { q: `A ball is launched at ${u} m/s at ${th}° on ${w[0]} (g = ${w[1]} m/s²). Find its range (ignore air).`, v: R, u: "m", w: [u * u / w[1], u * u * Math.sin(th * Math.PI / 180) / w[1]], e: "R = u² sin 2θ / g. Complementary angles (like 30° and 60°) give equal range.", steps: [`sin 2θ = sin ${2 * th}° = ${sig(Math.sin(2 * th * Math.PI / 180))}`, `R = ${u}² × ${sig(Math.sin(2 * th * Math.PI / 180))} / ${w[1]} = ${sig(R)} m`], c: "projectile motion", lv: w[0] === "Earth" ? 2 : 3 }; });
  gen("nw.gh", 3, [[0.5, 1, 2, 3]], x => ({ q: `At a height of ${x}R above Earth's surface (R = Earth's radius), what is g? (g on surface = 9.8 m/s²)`, v: 9.8 / Math.pow(1 + x, 2), u: "m/s²", w: [9.8 / (1 + x), 9.8 * (1 - 2 * x)], e: "g ∝ 1/r², with r measured from Earth's centre: r = (1 + x)R.", c: "acceleration due to gravity" }));
  gen("nw.cent", 2, [[5, 10, 20], [5, 10, 20, 50]], (v, r) => ({ q: `A car goes round a ${r} m radius curve at ${v} m/s. Find its centripetal acceleration.`, v: v * v / r, u: "m/s²", w: [v / r, v * r], e: "a = v²/r, pointing to the centre of the curve.", c: "centripetal force" }));
  gen("nw.fric", 3, [[20, 30, 50], [2, 5], [0.1, 0.2, 0.3]], (F, m, mu) => { const f = mu * m * 9.8, a = F > f ? (F - f) / m : 0; return { q: `You push a ${m} kg box with ${F} N. The friction coefficient is ${mu} (g = 9.8 m/s²). What is its acceleration?`, v: a, u: "m/s²", w: [F / m, (F + f) / m, f / m].map(x => x || 1), fmt: x => x === 0 ? "0" : sig(x), e: F > f ? `Friction = μmg = ${sig(f)} N. Net force = ${sig(F - f)} N.` : `Friction can be up to μmg = ${sig(f)} N, which is more than your push, so the box does not move.`, c: "friction" }; });

  /* ================= MYTHS: planet facts ================= */
  const PROP = [
    ["gravity", p => p.g, (a, b) => `${a.n} has stronger surface gravity than ${b.n}.`, p => `${p.g} m/s²`],
    ["distance", p => p.a, (a, b) => `${a.n} is farther from the Sun than ${b.n}.`, p => `${p.a} AU`],
    ["year", p => p.yr, (a, b) => `A year on ${a.n} is longer than a year on ${b.n}.`, p => `${sig(p.yr)} Earth days`],
    ["size", p => p.R, (a, b) => `${a.n} is bigger than ${b.n}.`, p => `radius ${p.R.toLocaleString("en-IN")} km`]
  ];
  const ord = []; PL.forEach((a, i) => PL.forEach((b, j) => { if (i !== j) ord.push([a, b]); }));
  gen("myth.planets", 1, [PROP, ord], (pr, pair) => { const [a, b] = pair, fact = pr[1](a) > pr[1](b); return tf({ q: `Fact or myth: ${pr[2](a, b)}`, fact, e: `${a.n}: ${pr[3](a)}. ${b.n}: ${pr[3](b)}.`, c: "surface gravity" }); });
  gen("myth.hot", 1, [pairs(PL)], p => { const [a, b] = p, fact = a.T > b.T; return tf({ q: `Fact or myth: ${a.n} is hotter than ${b.n} (average temperature).`, fact, e: `${a.n} ≈ ${a.T} °C, ${b.n} ≈ ${b.T} °C.${a.n === "Mercury" && b.n === "Venus" ? " Venus's thick CO₂ blanket makes it hotter than Mercury." : ""}`, c: "greenhouse effect" }); });

  /* ================= HISTORY ================= */
  const DISC = [
    [1543, "Copernicus publishes his Sun-centred model", "Nicolaus Copernicus"], [1610, "Four moons of Jupiter discovered with a telescope", "Galileo Galilei"],
    [1609, "The first two laws of planetary motion published", "Johannes Kepler"], [1687, "The Principia, with the law of universal gravitation", "Isaac Newton"],
    [1781, "Uranus discovered", "William Herschel"], [1846, "Neptune found where maths predicted", "Johann Galle, using Le Verrier's prediction"],
    [1868, "Helium discovered in the Sun's spectrum", "Jules Janssen and Norman Lockyer"], [1887, "Radio waves produced in the lab", "Heinrich Hertz"],
    [1895, "X-rays discovered", "Wilhelm Röntgen"], [1897, "The electron discovered", "J. J. Thomson"],
    [1905, "Special relativity and the photon idea", "Albert Einstein"], [1911, "The atomic nucleus discovered", "Ernest Rutherford"],
    [1912, "Cepheid period-luminosity law", "Henrietta Swan Leavitt"], [1913, "Model of the atom with energy levels", "Niels Bohr"],
    [1915, "General relativity", "Albert Einstein"], [1920, "Ionisation equation for stellar spectra", "Meghnad Saha"],
    [1924, "New statistics for particles of light", "Satyendra Nath Bose"], [1925, "Stars are made mostly of hydrogen and helium", "Cecilia Payne"],
    [1928, "The Raman effect", "C. V. Raman"], [1929, "Galaxies recede faster the farther they are", "Edwin Hubble"],
    [1930, "Pluto discovered", "Clyde Tombaugh"], [1932, "The neutron discovered", "James Chadwick"],
    [1965, "The Cosmic Microwave Background detected", "Arno Penzias and Robert Wilson"], [1967, "The first pulsar discovered", "Jocelyn Bell Burnell"],
    [1974, "Black holes should glow faintly (Hawking radiation)", "Stephen Hawking"], [1995, "First planet found around a Sun-like star", "Michel Mayor and Didier Queloz"],
    [1998, "The universe's expansion is speeding up", "Perlmutter, Schmidt and Riess teams"], [2012, "Higgs boson discovered", "CERN's ATLAS and CMS teams"],
    [2015, "Gravitational waves detected", "The LIGO team"], [2019, "First image of a black hole's shadow", "The Event Horizon Telescope team"]
  ];
  gen("hist.who", 1, [DISC], d => pickQ({ q: `Who is credited with this (${d[0]}): <b>${d[1]}</b>?`, right: d[2], pool: DISC.map(x => x[2]), e: `${d[2]}, ${d[0]}.`, c: "scientific method" }));
  gen("hist.when", 2, [DISC], d => pickQ({ q: `In which year: <b>${d[1]}</b> (${d[2]})?`, right: String(d[0]), pool: [d[0] - 20, d[0] - 7, d[0] + 11, d[0] + 25, d[0] - 45].map(String), e: `${d[0]}.`, c: "scientific method" }));
  gen("hist.tag", 1, [DATA.heroes.map((_, i) => i)], i => pickQ({ q: `Which scientist is best known for this: <b>${DATA.heroes[i].tag}</b>?`, right: DATA.heroes[i].n, pool: DATA.heroes.map(h => h.n), e: DATA.heroes[i].b, c: "scientific method" }));
  gen("hist.name", 1, [DATA.heroes.map((_, i) => i)], i => pickQ({ q: `What is <b>${DATA.heroes[i].n}</b> best known for?`, right: DATA.heroes[i].tag, pool: DATA.heroes.map(h => h.tag), e: DATA.heroes[i].b, c: "scientific method" }));
  gen("hist.isro", 1, [DATA.isro.filter(m => /^\d/.test(m.y))], m => pickQ({ q: `Which Indian space milestone happened in ${m.y}?`, right: m.n, pool: DATA.isro.filter(x => x.y !== m.y).map(x => x.n), e: m.kid, c: "ISRO" }));
  gen("hist.isroyr", 2, [DATA.isro.filter(m => /^\d/.test(m.y))], m => pickQ({ q: `In which year: <b>${m.n}</b>?`, right: m.y, pool: [...new Set(DATA.isro.filter(x => /^\d/.test(x.y)).map(x => x.y))], e: m.kid, c: "ISRO" }));

  /* ================= SCALE ================= */
  gen("sc.travel", 2, [DATA.distances.slice(0, -1), DATA.speeds], (d, s) => { const t = d.km / s.kms; return pickQ({ q: `Travelling at the speed of ${s.name.toLowerCase().replace(/ \(.*\)/, "")} (${sig(s.kms < 1 ? s.kms * 3600 : s.kms)} ${s.kms < 1 ? "km/h" : "km/s"}), about how long would it take to reach ${d.name}?`, right: G.duration(t), pool: [G.duration(t * 10), G.duration(t / 10), G.duration(t * 1000), G.duration(t / 1000), G.duration(t * 100)], e: `time = distance / speed = ${G.fmt(d.km)} km ÷ ${sig(s.kms)} km/s.`, c: "light year", lv: s.id === "light" ? 1 : 2 }); });
  gen("sc.conv", 2, [[1, 2, 5, 10, 100], [["AU", 1.496e8, "km"], ["ly", 9.461e12, "km"], ["pc", 3.26, "light years"]]], (n, u) => ({ q: `Convert ${n} ${u[0]} into ${u[2]}. (1 ${u[0]} = ${G.fmt(u[1])} ${u[2]})`, v: n * u[1], u: u[2], w: [u[1] / n, n * u[1] / 1000], e: "Multiply by the conversion factor.", c: u[0] === "pc" ? "parsec" : u[0] === "AU" ? "astronomical unit" : "light year" }));
  gen("sc.lighttime", 2, [PL.filter(p => p.n !== "Earth")], p => { const s = p.a * 499; return { q: `${p.n} is ${p.a} AU from the Sun. How long does sunlight take to reach it? (1 AU takes about 499 s)`, v: s / 60, u: "minutes", w: [s / 3600, 499 / p.a / 60], e: "time = distance ÷ speed of light.", c: "astronomical unit" }; });
  gen("sc.mars", 2, [[55, 100, 225, 400]], d => ({ q: `Mars is ${d} million km away. How long does a radio command from ISRO take to reach it?`, v: d * 1e9 / 3e8 / 60, u: "minutes", w: [d * 1e6 / 3e8 / 60, d / 3], e: "Radio waves travel at light speed. Mars missions must be partly autonomous because of this delay.", c: "electromagnetic wave" }));
  const TH = [[1.7e-15, "a proton"], [1e-10, "an atom"], [1e-7, "a virus"], [8e-6, "a red blood cell"], [7e-5, "the width of a hair"], [3e-3, "an ant"], [1.6, "a person"], [8849, "Mount Everest"], [1.27e7, "Earth"], [1.39e9, "the Sun"], [9.46e15, "one light year"], [9.5e20, "the Milky Way"], [8.8e26, "the observable universe"]];
  gen("sc.pow", 1, [TH], t => { const e = Math.round(Math.log10(t[0])); return pickQ({ q: `Roughly how big is ${t[1]}?`, right: `10^${e} m`, pool: [e - 3, e - 2, e + 2, e + 3, e + 5].map(k => `10^${k} m`), e: `About ${G.fmt(t[0])} m.`, c: "powers of ten" }); });
  gen("sc.model", 3, [PL], p => ({ q: `Shrink the Sun to a 1 m ball. How far away would ${p.n} be? (Sun diameter 1.392 million km, 1 AU = 149.6 million km)`, v: 107.5 * p.a, u: "m", w: [p.a, 1.496e8 / 1.392e6], e: "Scale factor = 149.6 / 1.392 ≈ 107.5, so 1 AU becomes about 107.5 m. Space is mostly empty.", c: "astronomical unit" }));
  gen("sc.speed", 1, [[["a car", 100], ["a bullet train", 320], ["a jet plane", 900], ["the ISS", 27600], ["Earth around the Sun", 107000], ["Parker Solar Probe", 690000]]], s => ({ q: `${s[0][0].toUpperCase() + s[0].slice(1)} moves at about ${s[1].toLocaleString("en-IN")} km/h. What is that in metres per second?`, v: s[1] / 3.6, u: "m/s", w: [s[1] * 3.6, s[1] / 36], e: "Divide km/h by 3.6 to get m/s.", c: "units" }));

  /* ================= POOLS ================= */
  const T = id => () => DATA.topics.find(t => t.id === id).qs.map(x => ({ q: x[0], o: x[1], a: x[2], e: x[3], lv: x[4] || (["bh", "gravity", "quantum", "em"].includes(id) ? 2 : 1) }));
  const LVQ = l => () => DATA.quiz[l].map(x => Object.assign({ lv: l }, x));
  const cat = (...fs) => () => fs.flatMap(f => f());
  G.pool("origin", { name: "Big Bang and cosmology", fixed: cat(T("cosmos"), () => DATA.quiz[2].slice(0, 2).map(x => Object.assign({ lv: 2 }, x))), gens: ["origin.*"] });
  G.pool("stars", { name: "Stars", fixed: T("stars"), gens: ["stars.*"] });
  G.pool("sky", { name: "The night sky", fixed: T("moon"), gens: ["sky.*"] });
  G.pool("spacetime", { name: "Black holes and relativity", fixed: cat(T("bh"), LVQ(3)), gens: ["st.*"] });
  G.pool("newton", { name: "Motion, gravity and orbits", fixed: cat(T("motion"), T("gravity")), gens: ["nw.*"] });
  G.pool("myths", { name: "Fact or myth", fixed: () => DATA.myths.map(m => ({ q: `Fact or myth: ${m.s}`, o: ["Fact", "Myth"], a: m.fact ? 0 : 1, e: (m.deep || m.e) + (m.why && !/everyday shortcut/.test(m.why) ? " Why it fools people: " + m.why : ""), lv: m.id && m.id.startsWith("NEW") ? 2 : 1 })), gens: ["myth.*"] });
  G.pool("heroes", { name: "People and history of science", fixed: cat(T("explore"), () => DATA.heroes.filter(h => h.expanded && h.expanded.quiz).map(h => ({ q: `<span class="small muted">${h.n}:</span> ${h.expanded.quiz.q}`, o: h.expanded.quiz.options, a: h.expanded.quiz.answer, e: h.expanded.quiz.why, lv: 2 }))), gens: ["hist.*"] });
  G.pool("scale", { name: "Distance and scale", fixed: () => [], gens: ["sc.*"] });
  G.pool("quiz", { name: "Everything", fixed: () => [], include: ["origin", "stars", "sky", "spacetime", "newton", "myths", "heroes", "scale"] });
})();
