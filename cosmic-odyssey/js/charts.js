/* Interactive graphs and mini-labs: ported Physics Quest labs + new charts.
   Chart series colours (validated for the dark surface): amber #b98424, blue #5f86e6, rose #d9587f. */
(function () {
  const SIMS = G.SIMS, TAU = Math.PI * 2;
  const { bg, text, arrow, dot, glow } = G.simkit;
  const S1 = "#b98424", S2 = "#5f86e6", S3 = "#d9587f", INK = "#eceffa", MUTED = "rgba(163,171,201,0.9)";
  const sig = G.sig;

  /* plot frame with ticks; returns mappers */
  function frame(ctx, W, H, o) {
    const x0 = o.l || 58, y0 = o.t || 18, w = W - x0 - (o.r || 18), h = H - y0 - (o.b || 42);
    const lx = v => o.xlog ? Math.log10(v) : v, ly = v => o.ylog ? Math.log10(v) : v;
    const X = v => x0 + w * (lx(v) - lx(o.xmin)) / (lx(o.xmax) - lx(o.xmin));
    const Y = v => y0 + h - h * (ly(v) - ly(o.ymin)) / (ly(o.ymax) - ly(o.ymin));
    ctx.strokeStyle = "rgba(170,186,255,0.09)"; ctx.lineWidth = 1; ctx.font = "500 11px 'JetBrains Mono', monospace";
    (o.yt || []).forEach(v => { const y = Y(v); ctx.beginPath(); ctx.moveTo(x0, y); ctx.lineTo(x0 + w, y); ctx.stroke(); ctx.fillStyle = MUTED; ctx.textAlign = "right"; ctx.fillText(o.yf ? o.yf(v) : String(v), x0 - 6, y + 4); });
    (o.xt || []).forEach(v => { const x = X(v); ctx.fillStyle = MUTED; ctx.textAlign = "center"; ctx.fillText(o.xf ? o.xf(v) : String(v), x, y0 + h + 16); });
    ctx.textAlign = "left";
    ctx.strokeStyle = "rgba(170,186,255,0.35)"; ctx.beginPath(); ctx.moveTo(x0, y0); ctx.lineTo(x0, y0 + h); ctx.lineTo(x0 + w, y0 + h); ctx.stroke();
    if (o.xl) text(ctx, o.xl, x0 + w, y0 + h + 34, MUTED, "right");
    if (o.yl) text(ctx, o.yl, x0 + 4, y0 + 10, MUTED);
    const xi = px => { const t = (px - x0) / w; const v = lx(o.xmin) + t * (lx(o.xmax) - lx(o.xmin)); return o.xlog ? Math.pow(10, v) : v; };
    return { X, Y, x0, y0, w, h, xi };
  }
  function curve(ctx, pts, col, w, dash) { ctx.strokeStyle = col; ctx.lineWidth = w || 2; ctx.setLineDash(dash || []); ctx.beginPath(); pts.forEach(([x, y], i) => i ? ctx.lineTo(x, y) : ctx.moveTo(x, y)); ctx.stroke(); ctx.setLineDash([]); }
  function tip(ctx, x, y, lines, W) {
    ctx.font = "500 11px 'JetBrains Mono', monospace";
    const w = Math.max(...lines.map(l => ctx.measureText(l).width)) + 16, h = lines.length * 16 + 10;
    const bx = Math.min(W - w - 6, x + 12), by = Math.max(6, y - h - 8);
    ctx.fillStyle = "rgba(17,24,52,0.95)"; ctx.strokeStyle = "rgba(170,186,255,0.35)"; ctx.lineWidth = 1;
    ctx.beginPath(); ctx.roundRect ? ctx.roundRect(bx, by, w, h, 8) : ctx.rect(bx, by, w, h); ctx.fill(); ctx.stroke();
    ctx.fillStyle = INK; lines.forEach((l, i) => ctx.fillText(l, bx + 8, by + 18 + i * 16));
  }
  function legend(ctx, items, x, y) { ctx.font = "500 11px 'JetBrains Mono', monospace"; let cx = x; items.forEach(([c, l]) => { ctx.fillStyle = c; ctx.fillRect(cx, y - 8, 14, 3); ctx.fillStyle = INK; ctx.fillText(l, cx + 20, y - 3); cx += ctx.measureText(l).width + 42; }); }
  const hoverMove = (x, y, p, st) => { st.hover = x; };

  /* ================= PORTED LABS ================= */
  SIMS.ohm = {
    name: "Ohm's law graph", ratio: 0.5, mratio: 0.8, move: hoverMove,
    controls: [{ k: "V", label: "Voltage", min: 0, max: 12, step: 0.2, v: 6, unit: "V" }, { k: "R", label: "Resistance", min: 1, max: 20, step: 0.5, v: 6, unit: "Ω" }],
    draw(ctx, W, H, p, st) {
      bg(ctx, W, H);
      const f = frame(ctx, W, H, { xmin: 0, xmax: 3, ymin: 0, ymax: 12, xt: [0, 1, 2, 3], yt: [0, 3, 6, 9, 12], xl: "current I (A) →", yl: "voltage V (V)" });
      curve(ctx, [[f.X(0), f.Y(0)], [f.X(Math.min(3, 12 / p.R)), f.Y(Math.min(12, 3 * p.R))]], S1, 2);
      curve(ctx, [[f.X(0), f.Y(0)], [f.X(Math.min(3, 12 / (p.R * 2))), f.Y(Math.min(12, 3 * p.R * 2))]], "rgba(95,134,230,0.6)", 2, [5, 4]);
      const I = p.V / p.R; dot(ctx, f.X(Math.min(I, 3)), f.Y(p.V), 6, INK);
      legend(ctx, [[S1, `R = ${p.R} Ω`], [S2, `R = ${p.R * 2} Ω (steeper)`]], f.x0 + 10, f.y0 + 16);
    },
    info(p) { const I = p.V / p.R; return `<div><b>${I.toFixed(2)} A</b><span>I = V/R</span></div><div><b>${(p.V * I).toFixed(1)} W</b><span>power P = VI</span></div><div style="grid-column:1/-1"><span>On a V–I graph the slope is the resistance. A steeper line means more resistance: more volts needed for the same current.</span></div>`; }
  };
  SIMS.invsq = {
    name: "The inverse-square law", ratio: 0.5, mratio: 0.8,
    controls: [{ k: "r", label: "Distance r", min: 1, max: 5, step: 0.05, v: 2 }, { k: "q", label: "Size of each charge (or mass)", min: 1, max: 5, step: 0.1, v: 2 }],
    draw(ctx, W, H, p) {
      bg(ctx, W, H);
      const f = frame(ctx, W, H, { xmin: 1, xmax: 5, ymin: 0, ymax: 1, xt: [1, 2, 3, 4, 5], yt: [0, 0.25, 0.5, 0.75, 1], xl: "distance r →", yl: "force (relative to r = 1)" });
      const pts = []; for (let r = 1; r <= 5; r += 0.02) pts.push([f.X(r), f.Y(1 / (r * r))]); curve(ctx, pts, S1, 2);
      const lin = []; for (let r = 1; r <= 5; r += 0.02) lin.push([f.X(r), f.Y(1 / r)]); curve(ctx, lin, "rgba(95,134,230,0.7)", 1.5, [5, 4]);
      dot(ctx, f.X(p.r), f.Y(1 / (p.r * p.r)), 6, INK);
      legend(ctx, [[S1, "1/r² (real law)"], [S2, "1/r (for comparison)"]], f.x0 + 10, f.y0 + 16);
    },
    info(p) { const F = p.q * p.q / (p.r * p.r); return `<div><b>${(1 / (p.r * p.r)).toFixed(3)}</b><span>1/r² at this distance</span></div><div><b>${F.toFixed(3)}</b><span>relative force ∝ q²/r²</span></div><div style="grid-column:1/-1"><span>Double the distance and the force drops to a quarter, not a half. Coulomb's law and Newton's gravity both follow this rule, because the 'influence' spreads over a sphere of area 4πr².</span></div>`; }
  };
  SIMS.vector = {
    name: "Vector components", ratio: 0.5, mratio: 0.8,
    controls: [{ k: "a", label: "Angle", min: 0, max: 360, v: 35, unit: "°" }, { k: "m", label: "Magnitude", min: 1, max: 10, step: 0.1, v: 7 }],
    draw(ctx, W, H, p) {
      bg(ctx, W, H);
      const cx = W / 2, cy = H / 2, s = Math.min(W, H) * 0.04;
      ctx.strokeStyle = "rgba(170,186,255,0.3)"; ctx.beginPath(); ctx.moveTo(20, cy); ctx.lineTo(W - 20, cy); ctx.moveTo(cx, 10); ctx.lineTo(cx, H - 10); ctx.stroke();
      const a = p.a * Math.PI / 180, x = p.m * Math.cos(a), y = p.m * Math.sin(a);
      arrow(ctx, cx, cy, cx + x * s, cy, S2, 2.5); arrow(ctx, cx + x * s, cy, cx + x * s, cy - y * s, S1, 2.5);
      arrow(ctx, cx, cy, cx + x * s, cy - y * s, INK, 3);
      text(ctx, "x-component", cx + x * s / 2, cy + (y >= 0 ? 16 : -8), "#9cc3ff", "center");
      text(ctx, "y-component", cx + x * s + (x >= 0 ? 8 : -8), cy - y * s / 2, "#e6b765", x >= 0 ? "left" : "right");
    },
    info(p) { const a = p.a * Math.PI / 180; return `<div><b>${(p.m * Math.cos(a)).toFixed(2)}</b><span>A_x = A cos θ</span></div><div><b>${(p.m * Math.sin(a)).toFixed(2)}</b><span>A_y = A sin θ</span></div><div style="grid-column:1/-1"><span>Any vector can be split into two perpendicular parts. Physics then treats each direction separately, exactly like a projectile's sideways and up-down motion.</span></div>`; }
  };
  SIMS.wave = {
    name: "Travelling wave: v = fλ", ratio: 0.42, mratio: 0.7,
    controls: [{ k: "f", label: "Frequency", min: 1, max: 10, step: 0.1, v: 3, unit: "Hz" }],
    draw(ctx, W, H, p, st, dt, t) {
      bg(ctx, W, H);
      const v = 10, lam = v / p.f, pxu = (W - 40) / 10;
      ctx.strokeStyle = "rgba(170,186,255,0.25)"; ctx.beginPath(); ctx.moveTo(20, H / 2); ctx.lineTo(W - 20, H / 2); ctx.stroke();
      const pts = []; for (let x = 0; x <= 10; x += 0.02) pts.push([20 + x * pxu, H / 2 - H * 0.28 * Math.sin(TAU * (x - v * t * 0.2) / lam)]);
      curve(ctx, pts, S1, 2.5);
      const x1 = 20 + pxu * 1, x2 = x1 + lam * pxu;
      if (x2 < W - 20) { ctx.strokeStyle = INK; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(x1, H * 0.88); ctx.lineTo(x2, H * 0.88); ctx.stroke(); text(ctx, "λ", (x1 + x2) / 2, H * 0.88 - 6, INK, "center"); }
      text(ctx, "the medium's wave speed is fixed at 10 units/s (slowed down 5× to watch)", 12, 16);
    },
    info(p) { return `<div><b>${(10 / p.f).toFixed(2)} units</b><span>wavelength λ = v/f</span></div><div style="grid-column:span 2"><span>In one medium the speed is fixed, so a higher frequency must squeeze the waves closer together.</span></div>`; }
  };
  SIMS.debroglie = {
    name: "Electron wavelength", ratio: 0.5, mratio: 0.8, move: hoverMove,
    controls: [{ k: "V", label: "Accelerating voltage", min: 1, max: 1000, v: 150, unit: "V" }],
    draw(ctx, W, H, p, st) {
      bg(ctx, W, H);
      const f = frame(ctx, W, H, { xmin: 1, xmax: 1000, xlog: true, ymin: 10, ymax: 2000, ylog: true, xt: [1, 10, 100, 1000], yt: [10, 30, 100, 300, 1000], xl: "accelerating voltage (V) →", yl: "wavelength λ (pm)" });
      ctx.fillStyle = "rgba(95,134,230,0.14)"; ctx.fillRect(f.x0, f.Y(300), f.w, f.Y(100) - f.Y(300));
      text(ctx, "spacing between atoms in a crystal (≈ 100–300 pm)", f.x0 + 8, f.Y(300) + 14, "#9cc3ff");
      const pts = []; for (let lv = 0; lv <= 3; lv += 0.01) { const V = Math.pow(10, lv); pts.push([f.X(V), f.Y(1227 / Math.sqrt(V))]); } curve(ctx, pts, S1, 2);
      dot(ctx, f.X(p.V), f.Y(1227 / Math.sqrt(p.V)), 6, INK);
      if (st.hover && st.hover > f.x0 && st.hover < f.x0 + f.w) { const V = f.xi(st.hover); tip(ctx, st.hover, f.Y(1227 / Math.sqrt(V)), [`V = ${sig(V)} V`, `λ = ${sig(1227 / Math.sqrt(V))} pm`], W); }
    },
    info(p) { const l = 1227 / Math.sqrt(p.V); return `<div><b>${l.toFixed(1)} pm</b><span>λ ≈ 1227/√V pm</span></div><div style="grid-column:span 2"><span>${l < 300 && l > 100 ? "Right inside the atomic-spacing band: a crystal acts like a diffraction grating for these electrons (Davisson–Germer, 1927)." : "Adjust the voltage until λ matches the spacing between atoms, and electrons diffract like light."}</span></div>`; }
  };
  SIMS.uncert = {
    name: "The uncertainty principle", ratio: 0.45, mratio: 0.8,
    controls: [{ k: "sx", label: "Position spread Δx", min: 0.25, max: 2.5, step: 0.05, v: 1 }],
    draw(ctx, W, H, p) {
      bg(ctx, W, H);
      const sp = 1 / (2 * p.sx), half = W / 2, g = (x, s) => Math.exp(-x * x / (2 * s * s));
      [[0, p.sx, S1, "where it might be (position)"], [half, sp, S2, "how it might be moving (momentum)"]].forEach(([ox, s, c, l]) => {
        const pts = []; for (let i = 0; i <= 200; i++) { const x = (i - 100) / 34; pts.push([ox + 20 + i * (half - 40) / 200, H - 34 - g(x, s) * (H - 80)]); }
        ctx.fillStyle = c + "33"; ctx.beginPath(); ctx.moveTo(ox + 20, H - 34); pts.forEach(([x, y]) => ctx.lineTo(x, y)); ctx.lineTo(ox + half - 20, H - 34); ctx.fill();
        curve(ctx, pts, c, 2); text(ctx, l, ox + half / 2, 18, INK, "center");
      });
    },
    info(p) { return `<div><b>${p.sx.toFixed(2)}</b><span>Δx (arbitrary units)</span></div><div><b>${(1 / (2 * p.sx)).toFixed(2)}</b><span>Δp at the minimum (ΔxΔp = ħ/2)</span></div><div style="grid-column:1/-1"><span>Squeeze one bump narrow and the other spreads wide. It is not clumsy measuring: a wave that is short in space is made of many wavelengths, so its momentum is spread out.</span></div>`; }
  };
  SIMS.tunnel = {
    name: "Quantum tunnelling", ratio: 0.45, mratio: 0.8,
    controls: [{ k: "L", label: "Barrier width", min: 0.2, max: 3, step: 0.05, v: 1 }, { k: "k", label: "Barrier strength κ", min: 0.2, max: 3, step: 0.05, v: 1.2 }],
    draw(ctx, W, H, p, st, dt, t) {
      bg(ctx, W, H);
      const bx = W * 0.42, bw = p.L * W * 0.08, cy = H / 2, A = H * 0.26, T = Math.exp(-2 * p.k * p.L);
      ctx.fillStyle = `rgba(217,88,127,${0.12 + p.k * 0.08})`; ctx.fillRect(bx, 20, bw, H - 40);
      const inc = []; for (let x = 16; x <= bx; x += 2) inc.push([x, cy - A * Math.sin((x - t * 90) / 18)]); curve(ctx, inc, S1, 2);
      const ph = Math.sin((bx - t * 90) / 18);
      const ins = []; for (let x = bx; x <= bx + bw; x += 2) ins.push([x, cy - A * ph * Math.exp(-p.k * (x - bx) / (W * 0.08))]); curve(ctx, ins, S1, 2, [4, 3]);
      const out = []; const At = A * Math.sqrt(T); for (let x = bx + bw; x <= W - 16; x += 2) out.push([x, cy - At * Math.sin((x - t * 90) / 18)]); curve(ctx, out, S2, 2);
      text(ctx, "barrier", bx + bw / 2, 16, INK, "center");
    },
    info(p) { const T = Math.exp(-2 * p.k * p.L); return `<div><b>${(T * 100).toFixed(T < 0.01 ? 3 : 1)}%</b><span>transmission T ≈ e^(−2κL)</span></div><div style="grid-column:span 2"><span>Classically the particle bounces back every time. The quantum wave leaks through, shrinking exponentially inside. Thicker or stronger barriers kill it fast. This lets the Sun fuse hydrogen and makes flash memory work.</span></div>`; }
  };
  SIMS.bell = {
    name: "Bell test correlations", ratio: 0.5, mratio: 0.85, move: hoverMove,
    controls: [{ k: "d", label: "Angle between detectors", min: 0, max: 180, v: 45, unit: "°" }],
    draw(ctx, W, H, p, st) {
      bg(ctx, W, H);
      const f = frame(ctx, W, H, { xmin: 0, xmax: 180, ymin: -1, ymax: 1, xt: [0, 45, 90, 135, 180], yt: [-1, -0.5, 0, 0.5, 1], xl: "angle difference (°) →", yl: "correlation E" });
      const q = [], c = []; for (let d = 0; d <= 180; d += 1) { q.push([f.X(d), f.Y(-Math.cos(d * Math.PI / 180))]); c.push([f.X(d), f.Y(-1 + 2 * d / 180)]); }
      curve(ctx, c, S2, 2, [5, 4]); curve(ctx, q, S1, 2);
      dot(ctx, f.X(p.d), f.Y(-Math.cos(p.d * Math.PI / 180)), 6, INK);
      legend(ctx, [[S1, "quantum: −cos θ"], [S2, "a simple local model"]], f.x0 + 10, f.y0 + 16);
      if (st.hover && st.hover > f.x0 && st.hover < f.x0 + f.w) { const d = f.xi(st.hover); tip(ctx, st.hover, f.Y(-Math.cos(d * Math.PI / 180)), [`θ = ${d.toFixed(0)}°`, `quantum ${(-Math.cos(d * Math.PI / 180)).toFixed(3)}`, `local ${(-1 + 2 * d / 180).toFixed(3)}`], W); }
    },
    info(p) { return `<div><b>${(-Math.cos(p.d * Math.PI / 180)).toFixed(3)}</b><span>quantum prediction at ${p.d}°</span></div><div style="grid-column:span 2"><span>The curves differ most near 22.5° and 67.5°. Combining four settings (the CHSH test), local models can reach at most 2, quantum physics reaches 2√2 ≈ 2.83. Experiments side with quantum physics: Nobel Prize 2022. This one plot is not the full test.</span></div>`; }
  };
  SIMS.qubit = {
    name: "A qubit and measurement", ratio: 0.5, mratio: 0.9,
    controls: [{ k: "th", label: "State angle θ", min: 0, max: 180, v: 60, unit: "°" }],
    buttons: [{ label: "Measure 1 qubit", primary: true, fn: (p, st) => meas(p, st, 1) }, { label: "Measure 100 copies", fn: (p, st) => meas(p, st, 100) }, { label: "Reset counts", fn: (p, st) => { st.c = [0, 0]; } }],
    init(p, st) { st.c = [0, 0]; st.last = null; },
    draw(ctx, W, H, p, st) {
      bg(ctx, W, H);
      const cx = W * 0.25, cy = H / 2, R = Math.min(W * 0.18, H * 0.38), th = p.th * Math.PI / 180, p0 = Math.cos(th / 2) ** 2;
      ctx.strokeStyle = "rgba(170,186,255,0.35)"; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.arc(cx, cy, R, 0, TAU); ctx.stroke();
      ctx.beginPath(); ctx.ellipse(cx, cy, R, R * 0.28, 0, 0, TAU); ctx.stroke();
      text(ctx, "|0⟩", cx, cy - R - 8, INK, "center"); text(ctx, "|1⟩", cx, cy + R + 18, INK, "center");
      arrow(ctx, cx, cy, cx + R * Math.sin(th), cy - R * Math.cos(th), S1, 3);
      const bx = W * 0.55, bw = W * 0.12, bh = H * 0.62, by = H * 0.18;
      [[p0, S2, "P(0)"], [1 - p0, S1, "P(1)"]].forEach(([v, c, l], i) => { const x = bx + i * (bw + 16); ctx.fillStyle = "rgba(170,186,255,0.08)"; ctx.fillRect(x, by, bw, bh); ctx.fillStyle = c; ctx.fillRect(x, by + bh * (1 - v), bw, bh * v); text(ctx, `${l} ${(v * 100).toFixed(0)}%`, x + bw / 2, by + bh + 16, INK, "center"); });
      const n = st.c[0] + st.c[1], tx = bx + 2 * (bw + 16) + 10;
      text(ctx, `measured: ${n}`, tx, by + 10, MUTED); text(ctx, `0: ${st.c[0]}`, tx, by + 30, "#9cc3ff"); text(ctx, `1: ${st.c[1]}`, tx, by + 48, "#e6b765");
      if (st.last !== null) text(ctx, `last result: ${st.last}`, tx, by + 74, INK);
    },
    info(p, st) { const p0 = Math.cos(p.th * Math.PI / 360) ** 2, n = st.c[0] + st.c[1]; return `<div><b>${p0.toFixed(3)}</b><span>P(0) = cos²(θ/2)</span></div><div><b>${n ? (st.c[0] / n).toFixed(3) : "–"}</b><span>fraction of 0s you measured</span></div><div style="grid-column:1/-1"><span>Before measurement the qubit is a blend of 0 and 1. Measuring gives just ONE answer, randomly. Only after many copies do the counts reveal the probabilities.</span></div>`; }
  };
  function meas(p, st, n) { const p0 = Math.cos(p.th * Math.PI / 360) ** 2; for (let i = 0; i < n; i++) { const r = Math.random() < p0 ? 0 : 1; st.c[r]++; st.last = r; } }
  SIMS.decay = {
    name: "Radioactive decay and half-life", ratio: 0.5, mratio: 0.9,
    controls: [{ k: "T", label: "Half-life", min: 1, max: 10, step: 0.2, v: 5, unit: "s" }],
    buttons: [{ label: "Start 100 atoms", primary: true, fn: (p, st) => { st.atoms = Array(100).fill(1); st.t = 0; st.run = true; } }],
    init(p, st) { st.atoms = Array(100).fill(1); st.t = 0; st.run = false; },
    draw(ctx, W, H, p, st, dt) {
      bg(ctx, W, H);
      if (st.run) { st.t += dt; const pr = 1 - Math.pow(0.5, dt / p.T); st.atoms = st.atoms.map(a => a && Math.random() < pr ? 0 : a); if (st.t > p.T * 6) st.run = false; }
      const gx = 16, gs = Math.min((W * 0.4 - 32) / 10, (H - 40) / 10);
      st.atoms.forEach((a, i) => dot(ctx, gx + (i % 10) * gs + gs / 2, 20 + Math.floor(i / 10) * gs + gs / 2, gs * 0.32, a ? "#e6b765" : "rgba(95,134,230,0.35)"));
      const fx = W * 0.44, f = { x0: fx + 40, y0: 18, w: W - fx - 58, h: H - 60 };
      const X = t => f.x0 + f.w * t / (p.T * 6), Y = v => f.y0 + f.h * (1 - v);
      ctx.strokeStyle = "rgba(170,186,255,0.35)"; ctx.beginPath(); ctx.moveTo(f.x0, f.y0); ctx.lineTo(f.x0, f.y0 + f.h); ctx.lineTo(f.x0 + f.w, f.y0 + f.h); ctx.stroke();
      const pts = []; for (let t = 0; t <= p.T * 6; t += p.T / 20) pts.push([X(t), Y(Math.pow(0.5, t / p.T))]); curve(ctx, pts, S1, 2);
      for (let k = 1; k <= 5; k++) { text(ctx, `${k}T`, X(k * p.T), f.y0 + f.h + 14, MUTED, "center"); }
      text(ctx, "fraction left", f.x0 + 4, f.y0 + 10, MUTED);
      dot(ctx, X(Math.min(st.t, p.T * 6)), Y(st.atoms.filter(Boolean).length / 100), 5, INK);
    },
    live: true,
    info(p, st) { const left = st.atoms.filter(Boolean).length; return `<div><b>${left}</b><span>atoms left (gold)</span></div><div><b>${(100 * Math.pow(0.5, st.t / p.T)).toFixed(0)}</b><span>expected: 100 × (½)^(t/T)</span></div><div style="grid-column:1/-1"><span>No one can predict WHICH atom decays next, yet half of them go every half-life. Randomness for one, perfect rules for many.</span></div>`; }
  };

  /* ================= NEW CHARTS ================= */
  SIMS.rocketeq = {
    name: "The rocket equation", ratio: 0.55, mratio: 0.9, move: hoverMove,
    controls: [{ k: "R", label: "Mass ratio (full ÷ empty)", min: 1.2, max: 25, step: 0.1, v: 8 }],
    draw(ctx, W, H, p, st) {
      bg(ctx, W, H);
      const f = frame(ctx, W, H, { xmin: 1, xmax: 25, ymin: 0, ymax: 15, xt: [1, 5, 10, 15, 20, 25], yt: [0, 3, 6, 9, 12, 15], xl: "mass ratio m₀/m_f →", yl: "Δv (km/s)" });
      ctx.strokeStyle = "rgba(236,239,250,0.5)"; ctx.setLineDash([4, 4]); ctx.beginPath(); ctx.moveTo(f.x0, f.Y(9.4)); ctx.lineTo(f.x0 + f.w, f.Y(9.4)); ctx.stroke(); ctx.setLineDash([]);
      text(ctx, "≈ 9.4 km/s needed to reach low Earth orbit", f.x0 + f.w - 4, f.Y(9.4) - 6, INK, "right");
      [[2.94, S1], [4.41, S2]].forEach(([ve, c]) => { const pts = []; for (let r = 1; r <= 25; r += 0.1) pts.push([f.X(r), f.Y(ve * Math.log(r))]); curve(ctx, pts, c, 2); dot(ctx, f.X(p.R), f.Y(ve * Math.log(p.R)), 6, c); });
      legend(ctx, [[S1, "kerosene engine (Isp ≈ 300 s)"], [S2, "cryogenic engine (Isp ≈ 450 s)"]], f.x0 + 10, f.y0 + 16);
      if (st.hover && st.hover > f.x0 && st.hover < f.x0 + f.w) { const r = f.xi(st.hover); tip(ctx, st.hover, f.Y(4.41 * Math.log(r)), [`mass ratio ${r.toFixed(1)}`, `kerosene ${(2.94 * Math.log(r)).toFixed(2)} km/s`, `cryogenic ${(4.41 * Math.log(r)).toFixed(2)} km/s`], W); }
    },
    info(p) { return `<div><b>${(2.94 * Math.log(p.R)).toFixed(2)} km/s</b><span>kerosene, Δv = v_e ln(m₀/m_f)</span></div><div><b>${(4.41 * Math.log(p.R)).toFixed(2)} km/s</b><span>cryogenic</span></div><div><b>${((1 - 1 / p.R) * 100).toFixed(0)}%</b><span>of the rocket is fuel</span></div><div style="grid-column:1/-1"><span>The curve flattens: adding fuel gives less and less extra speed. A single stage would need to be about 96% fuel to reach orbit. That is why rockets use stages and why ISRO worked for years on cryogenic engines.</span></div>`; }
  };
  const MU = 3.986e14, RE = 6371;
  const ORB = [[400, "ISS"], [747, "NISAR"], [20200, "GPS"], [35786, "GEO (GSAT)"]];
  SIMS.orbitchart = {
    name: "Orbit speed and period vs height", ratio: 0.55, mratio: 0.95, move: hoverMove,
    controls: [{ k: "m", label: "Show", v: "v", options: [["v", "Orbital speed"], ["T", "Orbital period"]] }, { k: "h", label: "Altitude", min: 2.2, max: 4.6, step: 0.01, v: Math.log10(400), fmt: v => Math.round(Math.pow(10, v)).toLocaleString("en-IN") + " km" }],
    draw(ctx, W, H, p, st) {
      bg(ctx, W, H);
      const val = h => { const r = (RE + h) * 1e3; return p.m === "v" ? Math.sqrt(MU / r) / 1000 : 2 * Math.PI * Math.sqrt(r * r * r / MU) / 3600; };
      const f = frame(ctx, W, H, p.m === "v" ? { xmin: 160, xmax: 40000, xlog: true, ymin: 2, ymax: 8, xt: [200, 1000, 5000, 20000], yt: [2, 4, 6, 8], xf: v => v >= 1000 ? v / 1000 + "k" : v, xl: "altitude (km, log scale) →", yl: "orbital speed (km/s)" } : { xmin: 160, xmax: 40000, xlog: true, ymin: 0, ymax: 26, xt: [200, 1000, 5000, 20000], yt: [0, 6, 12, 18, 24], xf: v => v >= 1000 ? v / 1000 + "k" : v, xl: "altitude (km, log scale) →", yl: "orbital period (hours)" });
      const pts = []; for (let l = Math.log10(160); l <= Math.log10(40000); l += 0.01) pts.push([f.X(Math.pow(10, l)), f.Y(val(Math.pow(10, l)))]); curve(ctx, pts, S1, 2);
      ORB.forEach(([h, n]) => { dot(ctx, f.X(h), f.Y(val(h)), 4, S2); text(ctx, n, f.X(h) + 6, f.Y(val(h)) - 8, "#9cc3ff"); });
      const h = Math.pow(10, p.h); dot(ctx, f.X(h), f.Y(val(h)), 7, INK);
      if (st.hover && st.hover > f.x0 && st.hover < f.x0 + f.w) { const hh = f.xi(st.hover); tip(ctx, st.hover, f.Y(val(hh)), [`${Math.round(hh).toLocaleString("en-IN")} km`, p.m === "v" ? `${val(hh).toFixed(2)} km/s` : `${val(hh).toFixed(2)} h`], W); }
    },
    info(p) { const h = Math.pow(10, p.h), r = (RE + h) * 1e3, v = Math.sqrt(MU / r) / 1000, T = 2 * Math.PI * Math.sqrt(r * r * r / MU) / 60; return `<div><b>${v.toFixed(2)} km/s</b><span>v = √(GM/r)</span></div><div><b>${T < 120 ? T.toFixed(1) + " min" : (T / 60).toFixed(2) + " h"}</b><span>T = 2π√(r³/GM)</span></div><div><b>${(Math.sqrt(2) * v).toFixed(2)} km/s</b><span>escape speed from this height</span></div>`; }
  };
  SIMS.hohmann = {
    name: "Hohmann transfer", ratio: 0.6, mratio: 1,
    controls: [{ k: "to", label: "Mission", v: "geo", options: [["geo", "LEO to GEO"], ["moon", "LEO to Moon's distance"], ["mars", "Earth to Mars"]] }],
    buttons: [{ label: "Launch transfer", primary: true, fn: (p, st) => { st.t = 0; } }],
    init(p, st) { st.t = 0; },
    calc(p) {
      if (p.to === "mars") { const mu = 1.327e20, r1 = 1.496e11, r2 = 1.524 * 1.496e11; return h(mu, r1, r2, "AU"); }
      const r1 = 6.671e6, r2 = p.to === "geo" ? 4.2164e7 : 3.844e8; return h(MU, r1, r2, "km");
      function h(mu, r1, r2) { const v1 = Math.sqrt(mu / r1), v2 = Math.sqrt(mu / r2), a = (r1 + r2) / 2; return { r1, r2, d1: v1 * (Math.sqrt(2 * r2 / (r1 + r2)) - 1), d2: v2 * (1 - Math.sqrt(2 * r1 / (r1 + r2))), t: Math.PI * Math.sqrt(a * a * a / mu) }; }
    },
    draw(ctx, W, H, p, st, dt) {
      bg(ctx, W, H);
      const c = SIMS.hohmann.calc(p), cx = W / 2, cy = H / 2, s = Math.min(W, H) * 0.44 / c.r2;
      const R1 = c.r1 * s, R2 = c.r2 * s, a = (R1 + R2) / 2, e = (R2 - R1) / (R2 + R1), b = a * Math.sqrt(1 - e * e);
      ctx.strokeStyle = "rgba(95,134,230,0.6)"; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.arc(cx, cy, Math.max(R1, 6), 0, TAU); ctx.stroke();
      ctx.strokeStyle = "rgba(217,88,127,0.6)"; ctx.beginPath(); ctx.arc(cx, cy, R2, 0, TAU); ctx.stroke();
      ctx.strokeStyle = S1; ctx.setLineDash([5, 4]); ctx.beginPath(); ctx.ellipse(cx - (a - R1), cy, a, b, 0, 0, Math.PI); ctx.stroke(); ctx.setLineDash([]);
      glow(ctx, cx, cy, p.to === "mars" ? 22 : 12, p.to === "mars" ? "rgba(255,210,122,0.9)" : "rgba(79,134,217,0.9)");
      dot(ctx, cx, cy, p.to === "mars" ? 7 : 5, p.to === "mars" ? "#ffd27a" : "#4f86d9");
      st.t = Math.min(1, st.t + dt * 0.25);
      const E = Math.PI * st.t, px = cx - (a - R1) + a * Math.cos(E), py = cy + b * Math.sin(E);
      dot(ctx, px, py, 5, INK);
      text(ctx, p.to === "mars" ? "Sun" : "Earth", cx, cy + 22, MUTED, "center");
      text(ctx, "burn 1", cx + R1 + 6, cy - 6, "#e6b765"); text(ctx, "burn 2", cx - R2 - 6, cy - 6, "#e6b765", "right");
      if (p.to !== "mars" && R1 < 8) text(ctx, "(inner orbit drawn larger to be visible)", 12, H - 10, MUTED);
    },
    info(p) { const c = SIMS.hohmann.calc(p), t = c.t; return `<div><b>${(c.d1 / 1000).toFixed(2)} km/s</b><span>burn 1 (speed up to enter the ellipse)</span></div><div><b>${(c.d2 / 1000).toFixed(2)} km/s</b><span>burn 2 (circularise at the top)</span></div><div><b>${t > 86400 * 2 ? (t / 86400).toFixed(0) + " days" : (t / 3600).toFixed(1) + " hours"}</b><span>transfer time (half an ellipse)</span></div><div style="grid-column:1/-1"><span>${p.to === "moon" ? "Real Moon missions also use the Moon's gravity, so the second burn differs; the idea is the same." : p.to === "mars" ? "Speeds are relative to the Sun. Mangalyaan's real cruise took about 10 months." : "From Sriharikota a plane-change is also needed to reach the equator's plane."}</span></div>`; }
  };
  const EP = [[1e-43, 1e32, "Planck era"], [1e-35, 1e28, "Inflation"], [1e-6, 1e12, "Protons form"], [180, 1e9, "First nuclei"], [1.2e13, 3000, "CMB released"], [3.2e15, 80, "First stars"], [4.35e17, 2.725, "Today"]];
  SIMS.cosmotemp = {
    name: "The universe cooling down", ratio: 0.55, mratio: 0.95, move: hoverMove,
    controls: [{ k: "i", label: "Jump to", v: 6, options: EP.map((e, i) => [i, e[2]]) }],
    draw(ctx, W, H, p, st) {
      bg(ctx, W, H);
      const f = frame(ctx, W, H, { xmin: 1e-44, xmax: 1e18, xlog: true, ymin: 1, ymax: 1e33, ylog: true, xt: [1e-40, 1e-30, 1e-20, 1e-10, 1, 1e10], yt: [1, 1e8, 1e16, 1e24, 1e32], xf: v => "10^" + Math.round(Math.log10(v)), yf: v => "10^" + Math.round(Math.log10(v)), xl: "time since the Big Bang (s, log) →", yl: "temperature (K, log)" });
      curve(ctx, EP.map(e => [f.X(e[0]), f.Y(e[1])]), S1, 2);
      EP.forEach((e, i) => { dot(ctx, f.X(e[0]), f.Y(e[1]), i === p.i ? 7 : 4, i === p.i ? INK : S1); if (i === p.i) text(ctx, e[2], f.X(e[0]) + 10, f.Y(e[1]) - 8, INK); });
      if (st.hover) { let best = 0, bd = 1e9; EP.forEach((e, i) => { const d = Math.abs(f.X(e[0]) - st.hover); if (d < bd) { bd = d; best = i; } }); if (bd < 40) { const e = EP[best]; tip(ctx, f.X(e[0]), f.Y(e[1]), [e[2], `t ≈ ${G.fmt(e[0])} s`, `T ≈ ${G.fmt(e[1])} K`], W); } }
    },
    info(p) { const e = EP[p.i]; return `<div><b>${e[2]}</b><span>epoch</span></div><div><b>${G.fmt(e[0])} s</b><span>time after the Big Bang</span></div><div><b>${G.fmt(e[1])} K</b><span>temperature</span></div><div style="grid-column:1/-1"><span>On log scales the cooling is almost a straight line. The early values are model estimates; the CMB and today's 2.725 K are measured.</span></div>`; }
  };
  const lumOf = m => m < 0.43 ? 0.23 * Math.pow(m, 2.3) : m < 2 ? Math.pow(m, 4) : 1.4 * Math.pow(m, 3.5);
  const lifeOf = m => Math.max(3e6, 1e10 * m / lumOf(m));
  SIMS.lifetime = {
    name: "Star lifetime vs mass", ratio: 0.55, mratio: 0.95, move: hoverMove,
    controls: [{ k: "m", label: "Star mass", min: -1, max: 1.6, step: 0.01, v: 0, fmt: v => sig(Math.pow(10, v)) + " × Sun" }],
    draw(ctx, W, H, p, st) {
      bg(ctx, W, H);
      const f = frame(ctx, W, H, { xmin: 0.1, xmax: 40, xlog: true, ymin: 1e6, ymax: 1e13, ylog: true, xt: [0.1, 0.3, 1, 3, 10, 40], yt: [1e6, 1e8, 1e10, 1e12], yf: v => v >= 1e9 ? v / 1e9 + " Gyr" : v / 1e6 + " Myr", xl: "mass (× Sun, log) →", yl: "main-sequence lifetime" });
      ctx.strokeStyle = "rgba(236,239,250,0.5)"; ctx.setLineDash([4, 4]); ctx.beginPath(); ctx.moveTo(f.x0, f.Y(1.38e10)); ctx.lineTo(f.x0 + f.w, f.Y(1.38e10)); ctx.stroke(); ctx.setLineDash([]);
      text(ctx, "age of the universe (13.8 Gyr)", f.x0 + f.w - 4, f.Y(1.38e10) - 6, INK, "right");
      const pts = []; for (let l = -1; l <= Math.log10(40); l += 0.01) pts.push([f.X(Math.pow(10, l)), f.Y(Math.min(1e13, lifeOf(Math.pow(10, l))))]); curve(ctx, pts, S1, 2);
      dot(ctx, f.X(1), f.Y(lifeOf(1)), 4, S2); text(ctx, "Sun", f.X(1) + 6, f.Y(lifeOf(1)) + 14, "#9cc3ff");
      const m = Math.pow(10, p.m); dot(ctx, f.X(m), f.Y(Math.min(1e13, lifeOf(m))), 7, INK);
      if (st.hover && st.hover > f.x0 && st.hover < f.x0 + f.w) { const mm = f.xi(st.hover); tip(ctx, st.hover, f.Y(Math.min(1e13, lifeOf(mm))), [`${sig(mm)} Suns`, `≈ ${G.duration(lifeOf(mm) * 3.156e7)}`], W); }
    },
    info(p) { const m = Math.pow(10, p.m), t = lifeOf(m); return `<div><b>${G.duration(t * 3.156e7)}</b><span>rough main-sequence life</span></div><div style="grid-column:span 2"><span>${t > 1.38e10 ? "Longer than the universe has existed: no star this small has died yet." : "Heavy stars burn their fuel furiously and die young."} (Simple model: t ≈ 10¹⁰ yr × M/L, with a floor of a few million years for the heaviest stars.)</span></div>`; }
  };
  const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const VIS = { orion: [12, 1, 2], "ursa-major": [3, 4, 5], "ursa-minor": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12], cassiopeia: [10, 11, 12], scorpius: [6, 7, 8], crux: [4, 5], leo: [3, 4, 5], cygnus: [7, 8, 9, 10], lyra: [6, 7, 8, 9], taurus: [11, 12, 1, 2] };
  SIMS.skymonth = {
    name: "What's up tonight? (evening sky from India)", ratio: 0.55, mratio: 1.05,
    controls: [{ k: "mo", label: "Month", v: new Date().getMonth() + 1, options: MONTHS.map((m, i) => [i + 1, m]) }],
    draw(ctx, W, H, p) {
      bg(ctx, W, H);
      const C = DATA.constellations, x0 = Math.min(140, W * 0.3), y0 = 24, w = W - x0 - 14, rh = (H - y0 - 24) / C.length;
      MONTHS.forEach((m, i) => text(ctx, W < 520 ? m[0] : m, x0 + (i + 0.5) * w / 12, y0 - 8, i + 1 === p.mo ? INK : MUTED, "center"));
      ctx.fillStyle = "rgba(185,132,36,0.12)"; ctx.fillRect(x0 + (p.mo - 1) * w / 12, y0, w / 12, rh * C.length);
      C.forEach((c, r) => {
        const y = y0 + r * rh, on = VIS[c.id].includes(p.mo);
        text(ctx, c.name, x0 - 8, y + rh / 2 + 4, on ? INK : MUTED, "right");
        VIS[c.id].forEach(mo => { ctx.fillStyle = mo === p.mo ? S1 : "rgba(95,134,230,0.55)"; ctx.fillRect(x0 + (mo - 1) * w / 12 + 1, y + rh * 0.25, w / 12 - 2, rh * 0.5); });
      });
    },
    info(p) { const on = DATA.constellations.filter(c => VIS[c.id].includes(p.mo)).map(c => c.name); return `<div style="grid-column:1/-1"><b style="font-family:var(--body);font-size:1rem">Best in the ${MONTHS[p.mo - 1]} evening sky: ${on.join(", ")}.</b><span>Constellations drift west a little every night, because Earth moves along its orbit. Morning skies show next season's stars early.</span></div>`; }
  };
  SIMS.gamma = {
    name: "How time stretches with speed", ratio: 0.5, mratio: 0.9, move: hoverMove,
    controls: [{ k: "v", label: "Speed", min: 0, max: 0.999, step: 0.001, v: 0.9, fmt: v => (v * 100).toFixed(1) + "% of c" }],
    draw(ctx, W, H, p, st) {
      bg(ctx, W, H);
      const gm = v => 1 / Math.sqrt(1 - v * v);
      const f = frame(ctx, W, H, { xmin: 0, xmax: 1, ymin: 1, ymax: 25, ylog: true, xt: [0, 0.25, 0.5, 0.75, 1], yt: [1, 2, 5, 10, 20], xf: v => v + "c", xl: "speed (fraction of light) →", yl: "time dilation factor γ (log)" });
      const pts = []; for (let v = 0; v <= 0.9992; v += 0.001) pts.push([f.X(v), f.Y(Math.min(25, gm(v)))]); curve(ctx, pts, S1, 2);
      dot(ctx, f.X(p.v), f.Y(Math.min(25, gm(p.v))), 7, INK);
      [[0.1, "10%: γ = 1.005"], [0.866, "86.6%: γ = 2"]].forEach(([v, l]) => { dot(ctx, f.X(v), f.Y(gm(v)), 4, S2); text(ctx, l, f.X(v) + 8, f.Y(gm(v)) + 14, "#9cc3ff"); });
      if (st.hover && st.hover > f.x0 && st.hover < f.x0 + f.w) { const v = Math.min(0.9992, Math.max(0, f.xi(st.hover))); tip(ctx, st.hover, f.Y(Math.min(25, gm(v))), [`v = ${(v * 100).toFixed(1)}% c`, `γ = ${gm(v).toFixed(3)}`], W); }
    },
    info(p) { const g = 1 / Math.sqrt(1 - p.v * p.v); return `<div><b>${g.toFixed(3)}</b><span>γ = 1/√(1 − v²/c²)</span></div><div><b>${(60 / g).toFixed(1)} min</b><span>pass on the ship per Earth hour</span></div><div style="grid-column:1/-1"><span>Almost flat until about half light speed, then it shoots up towards infinity. That wall is why nothing with mass reaches c.</span></div>`; }
  };
})();
