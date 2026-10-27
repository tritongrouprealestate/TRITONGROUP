/* Interactive experiments, part B: Class 11 physics + space extras */
(function () {
  const TAU = Math.PI * 2, SIMS = G.SIMS;
  const { bg, text, arrow, dot, glow, plot } = G.simkit;

  /* Ch 1 (XI): powers of ten */
  const THINGS = [
    [1.7e-15, "a proton"], [1e-10, "an atom"], [2e-9, "width of DNA"], [1e-7, "a virus"], [8e-6, "a red blood cell"],
    [7e-5, "width of a hair"], [3e-3, "an ant"], [1.6, "Kutush"], [73, "Qutub Minar"], [8849, "Mount Everest"],
    [3.2e6, "India, north to south"], [1.27e7, "Earth"], [1.39e9, "the Sun"], [9e12, "Neptune's orbit"],
    [9.46e15, "one light year"], [4e16, "distance to Proxima Centauri"], [9.5e20, "the Milky Way"], [2.4e22, "Milky Way to Andromeda"], [8.8e26, "the observable universe"]
  ];
  SIMS.powers10 = {
    name: "Powers of ten", ratio: 0.42, mratio: 0.75,
    controls: [{ k: "e", label: "Zoom to 10ⁿ metres, n", min: -15, max: 27, v: 0 }],
    draw(ctx, W, H, p, st, dt, t) {
      bg(ctx, W, H);
      const x0 = 20, w = W - 40, y = H * 0.7;
      const X = e => x0 + w * (e + 15) / 42;
      ctx.strokeStyle = "rgba(170,186,255,0.35)"; ctx.beginPath(); ctx.moveTo(x0, y); ctx.lineTo(x0 + w, y); ctx.stroke();
      for (let e = -15; e <= 27; e += 3) { ctx.beginPath(); ctx.moveTo(X(e), y - 4); ctx.lineTo(X(e), y + 4); ctx.stroke(); text(ctx, "10" + e, X(e), y + 18, "rgba(170,186,255,0.6)", "center"); }
      let best = THINGS[0];
      THINGS.forEach(th => { const e = Math.log10(th[0]); dot(ctx, X(e), y, 3, "#86a8ff"); if (Math.abs(e - p.e) < Math.abs(Math.log10(best[0]) - p.e)) best = th; });
      dot(ctx, X(p.e), y, 7, "#ffd27a");
      ctx.font = "400 " + Math.min(56, W / 12) + "px 'Instrument Serif', Georgia, serif"; ctx.fillStyle = "#eceffa"; ctx.textAlign = "center";
      ctx.fillText(best[1], W / 2, H * 0.36); ctx.textAlign = "left";
      text(ctx, "about " + G.fmt(best[0]) + " m", W / 2, H * 0.36 + 26, "#ffd27a", "center");
    },
    info(p) {
      const n = p.e;
      return `<div><b>10<sup>${n}</sup> m</b><span>= ${n >= 0 ? "1 followed by " + n + " zeros" : "0." + "0".repeat(Math.max(0, -n - 1)) + "1"} metres</span></div>
        <div style="grid-column:span 2"><span>Each step multiplies by ten. From a proton to the edge of the observable universe is only about 42 steps. Scientists write huge and tiny numbers this way so they fit on one line.</span></div>`;
    }
  };

  /* Ch 2 (XI): velocity-time graph */
  SIMS.vt = {
    name: "Velocity-time graph", ratio: 0.55, mratio: 0.85, live: true,
    controls: [
      { k: "u", label: "Starting speed u", min: 0, max: 20, v: 5, unit: "m/s" },
      { k: "a", label: "Acceleration a", min: -3, max: 3, step: 0.5, v: 1.5, unit: "m/s²" }
    ],
    init(p, st) { st.t = 0; },
    draw(ctx, W, H, p, st, dt) {
      bg(ctx, W, H);
      st.t = (st.t + dt) % 10;
      const x0 = 46, y0 = H * 0.3, w = W - 70, h = H * 0.56, vmax = 35;
      plot(ctx, x0, y0, w, h, "time (s) →", "velocity (m/s)");
      const X = t => x0 + w * t / 10, Y = v => y0 + h / 2 - (h / 2) * v / vmax;
      ctx.strokeStyle = "rgba(170,186,255,0.25)"; ctx.beginPath(); ctx.moveTo(x0, Y(0)); ctx.lineTo(x0 + w, Y(0)); ctx.stroke();
      ctx.fillStyle = "rgba(255,210,122,0.18)"; ctx.beginPath(); ctx.moveTo(X(0), Y(0));
      for (let t = 0; t <= st.t; t += 0.05) ctx.lineTo(X(t), Y(p.u + p.a * t));
      ctx.lineTo(X(st.t), Y(0)); ctx.fill();
      ctx.strokeStyle = "#ffd27a"; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(X(0), Y(p.u)); ctx.lineTo(X(10), Y(p.u + p.a * 10)); ctx.stroke();
      dot(ctx, X(st.t), Y(p.u + p.a * st.t), 5, "#ef7aa0");
      const s = p.u * st.t + 0.5 * p.a * st.t * st.t;
      const cx = 30 + ((s % 200) + 200) % 200 / 200 * (W - 60);
      ctx.fillStyle = "#86a8ff"; ctx.fillRect(cx - 16, H * 0.12, 32, 14); dot(ctx, cx - 9, H * 0.12 + 16, 4, "#eceffa"); dot(ctx, cx + 9, H * 0.12 + 16, 4, "#eceffa");
      text(ctx, "Shaded area = displacement so far", x0, y0 - 8);
    },
    info(p, st) {
      const t = st.t || 0, v = p.u + p.a * t, s = p.u * t + 0.5 * p.a * t * t;
      return `<div><b>${t.toFixed(1)} s</b><span>time</span></div><div><b>${v.toFixed(1)} m/s</b><span>v = u + at</span></div><div><b>${s.toFixed(1)} m</b><span>s = ut + ½at² (the shaded area)</span></div><div><b>${p.a} m/s²</b><span>slope of the line = acceleration</span></div>`;
    }
  };

  /* Ch 3 (XI): projectile on different worlds */
  const WORLDS = { Earth: 9.8, Moon: 1.62, Mars: 3.71, Jupiter: 24.8 };
  SIMS.projectile = {
    name: "Projectile launcher", ratio: 0.5, mratio: 0.8,
    controls: [
      { k: "w", label: "World", v: "Earth", options: Object.keys(WORLDS).map(k => [k, k]) },
      { k: "u", label: "Launch speed", min: 5, max: 40, v: 20, unit: "m/s" },
      { k: "th", label: "Angle", min: 5, max: 85, v: 45, unit: "°" }
    ],
    buttons: [{ label: "Launch", primary: true, fn: (p, st) => { if (st.cur) st.old = st.cur; st.cur = { t: 0, u: p.u, th: p.th, g: WORLDS[p.w] }; } }],
    init(p, st) { st.cur = { t: 0, u: 20, th: 45, g: 9.8 }; },
    draw(ctx, W, H, p, st, dt) {
      bg(ctx, W, H);
      const gy = H - 30, x0 = 30;
      ctx.fillStyle = p.w === "Mars" ? "#7a3b2a" : p.w === "Moon" ? "#55596e" : p.w === "Jupiter" ? "#8a6a4a" : "#1f4f3a"; ctx.fillRect(0, gy, W, 30);
      const maxR = 40 * 40 / 1.62;
      const c0 = st.cur || { u: 20, g: 9.8, th: 45 }, thr = c0.th * Math.PI / 180;
      const Rng = Math.max(20, c0.u * c0.u * Math.sin(2 * thr) / c0.g), Hm = Math.max(5, c0.u * c0.u * Math.sin(thr) ** 2 / (2 * c0.g));
      const scale = Math.min((W - 60) / (Rng * 1.1), (gy - 30) / (Hm * 1.1));
      const path = (s, col, upto) => {
        const th = s.th * Math.PI / 180, T = 2 * s.u * Math.sin(th) / s.g;
        ctx.strokeStyle = col; ctx.lineWidth = 2; ctx.beginPath();
        const end = Math.min(upto, T);
        for (let t = 0; t <= end; t += T / 120) { const x = s.u * Math.cos(th) * t, y = s.u * Math.sin(th) * t - 0.5 * s.g * t * t; const X = x0 + x * scale, Y = gy - y * scale; t ? ctx.lineTo(X, Y) : ctx.moveTo(X, Y); }
        ctx.stroke();
        return { th, T, end };
      };
      if (st.old) path(st.old, "rgba(169,198,255,0.3)", 1e9);
      if (st.cur) {
        st.cur.t += dt * 1.5;
        const r = path(st.cur, "#ffd27a", st.cur.t);
        const t = Math.min(st.cur.t, r.T), x = st.cur.u * Math.cos(r.th) * t, y = st.cur.u * Math.sin(r.th) * t - 0.5 * st.cur.g * t * t;
        dot(ctx, x0 + x * scale, gy - y * scale, 6, "#fff");
      }
      text(ctx, `scale: ${(1 / scale * 100).toFixed(1)} m per 100 px`, 12, 18);
    },
    info(p) {
      const g = WORLDS[p.w], th = p.th * Math.PI / 180;
      return `<div><b>${(p.u * p.u * Math.sin(2 * th) / g).toFixed(1)} m</b><span>range R = u² sin 2θ / g</span></div>
        <div><b>${(p.u * p.u * Math.sin(th) ** 2 / (2 * g)).toFixed(1)} m</b><span>max height H = u² sin²θ / 2g</span></div>
        <div><b>${(2 * p.u * Math.sin(th) / g).toFixed(2)} s</b><span>time of flight T = 2u sin θ / g</span></div>
        <div><b>${(p.u * Math.cos(th)).toFixed(1)} m/s</b><span>speed at the very top (only horizontal)</span></div>`;
    }
  };

  /* Ch 4 (XI): F = ma with friction */
  SIMS.fma = {
    name: "Push a block: F = ma", ratio: 0.42, mratio: 0.7, live: true,
    controls: [
      { k: "F", label: "Your push", min: 0, max: 60, v: 30, unit: "N" },
      { k: "m", label: "Mass", min: 1, max: 20, v: 5, unit: "kg" },
      { k: "mu", label: "Friction coefficient μ", min: 0, max: 0.8, step: 0.05, v: 0.2 }
    ],
    init(p, st) { st.x = 0; st.v = 0; },
    draw(ctx, W, H, p, st, dt) {
      bg(ctx, W, H);
      const fmax = p.mu * p.m * 9.8;
      let a = 0;
      if (st.v > 0.001) a = (p.F - fmax) / p.m; else if (p.F > fmax) a = (p.F - fmax) / p.m;
      st.v = Math.max(0, st.v + a * dt); st.x += st.v * dt * 20;
      if (st.x > W + 60) st.x = -60;
      st.a = st.v > 0.001 || p.F > fmax ? a : 0;
      const gy = H * 0.7, bw = 30 + p.m * 3, bx = st.x + 40;
      ctx.fillStyle = "#1a2244"; ctx.fillRect(0, gy, W, H - gy);
      for (let x = -((st.x) % 30); x < W; x += 30) { ctx.fillStyle = "rgba(170,186,255,0.15)"; ctx.fillRect(x, gy, 14, 3); }
      ctx.fillStyle = "#86a8ff"; ctx.fillRect(bx, gy - bw, bw, bw);
      text(ctx, p.m + " kg", bx + bw / 2, gy - bw / 2 + 4, "#050814", "center");
      if (p.F > 0) arrow(ctx, bx - 10 - p.F * 1.4, gy - bw / 2, bx - 4, gy - bw / 2, "#ffd27a", 3);
      const f = st.v > 0.001 ? fmax : Math.min(p.F, fmax);
      if (f > 0) arrow(ctx, bx + bw / 2, gy + 6, bx + bw / 2 - f * 1.4, gy + 6, "#ef7aa0", 3);
      text(ctx, "gold: push · pink: friction", 12, 18);
    },
    info(p, st) {
      const fmax = p.mu * p.m * 9.8;
      return `<div><b>${fmax.toFixed(1)} N</b><span>max friction μmg</span></div><div><b>${(st.a || 0).toFixed(2)} m/s²</b><span>a = (F − f)/m</span></div>
        <div><b>${(st.v || 0).toFixed(1)} m/s</b><span>speed</span></div>
        <div style="grid-column:1/-1"><span>${p.F <= fmax && !(st.v > 0.001) ? "Push is not bigger than friction, so the block stays put. That is static friction." : "Stop pushing and friction slows it down. With μ = 0 it would slide forever: Newton's first law."}</span></div>`;
    }
  };

  /* Ch 5 (XI): pendulum energy */
  SIMS.pendulum = {
    name: "Energy swing", ratio: 0.55, mratio: 0.85, live: true,
    controls: [
      { k: "th", label: "Release angle", min: 10, max: 80, v: 50, unit: "°" },
      { k: "b", label: "Air friction", min: 0, max: 0.4, step: 0.02, v: 0 }
    ],
    buttons: [{ label: "Release", primary: true, fn: (p, st) => { st.a = p.th * Math.PI / 180; st.w = 0; } }],
    init(p, st) { st.a = 50 * Math.PI / 180; st.w = 0; },
    draw(ctx, W, H, p, st, dt) {
      bg(ctx, W, H);
      const L = 2, g = 9.8, m = 1;
      for (let i = 0; i < 4; i++) { const h = dt / 4; st.w += (-(g / L) * Math.sin(st.a) - p.b * st.w) * h; st.a += st.w * h; }
      const px = W * 0.35, py = 20, Lp = H * 0.7;
      const bx = px + Math.sin(st.a) * Lp, by = py + Math.cos(st.a) * Lp;
      ctx.strokeStyle = "rgba(200,210,240,0.6)"; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.moveTo(px, py); ctx.lineTo(bx, by); ctx.stroke();
      glow(ctx, bx, by, 26, "rgba(255,210,122,0.4)"); dot(ctx, bx, by, 12, "#ffd27a");
      const KE = 0.5 * m * (st.w * L) ** 2, PE = m * g * L * (1 - Math.cos(st.a)), E0 = m * g * L * (1 - Math.cos(p.th * Math.PI / 180));
      st.KE = KE; st.PE = PE;
      const bxs = W * 0.72, bw = 34, bh = H * 0.7, top = 20;
      [["KE", KE, "#ef7aa0"], ["PE", PE, "#86a8ff"], ["Total", KE + PE, "#74e0b5"]].forEach(([l, v, c], i) => {
        const x = bxs + i * (bw + 12), hh = bh * v / Math.max(E0, 0.01);
        ctx.fillStyle = "rgba(170,186,255,0.08)"; ctx.fillRect(x, top, bw, bh);
        ctx.fillStyle = c; ctx.fillRect(x, top + bh - hh, bw, hh);
        text(ctx, l, x + bw / 2, top + bh + 16, null, "center");
      });
    },
    info(p, st) {
      return `<div><b>${(st.KE || 0).toFixed(1)} J</b><span>kinetic energy ½mv²</span></div><div><b>${(st.PE || 0).toFixed(1)} J</b><span>potential energy mgh</span></div>
        <div style="grid-column:1/-1"><span>${p.b > 0 ? "With air friction, the total slowly leaks away as heat. Energy is never destroyed, it just changes form." : "Without friction the total stays perfectly constant. Energy just sloshes between moving (KE) and height (PE)."}</span></div>`;
    }
  };

  /* Ch 6 (XI): angular momentum, skater and collapsing star */
  SIMS.skater = {
    name: "Spin faster by pulling in", ratio: 0.55, mratio: 0.8, live: true,
    controls: [
      { k: "r", label: "Arms / star radius", min: 0.15, max: 1, step: 0.01, v: 1 },
      { k: "mode", label: "Show", v: "skater", options: [["skater", "Ice skater"], ["star", "Collapsing star"]] }
    ],
    init(p, st) { st.ang = 0; },
    draw(ctx, W, H, p, st, dt) {
      bg(ctx, W, H);
      const I = 1 + 4 * p.r * p.r, L = 5, w = L / I;
      st.w = w; st.I = I;
      st.ang += w * dt;
      const cx = W / 2, cy = H / 2, R = Math.min(W, H) * 0.4;
      if (p.mode === "skater") {
        dot(ctx, cx, cy, 20, "#86a8ff");
        for (let s = -1; s <= 1; s += 2) {
          const x = cx + Math.cos(st.ang) * R * p.r * s, y = cy + Math.sin(st.ang) * R * p.r * s * 0.35;
          ctx.strokeStyle = "#a9c6ff"; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(x, y); ctx.stroke();
          dot(ctx, x, y, 9, "#ffd27a");
        }
      } else {
        const rr = R * p.r;
        glow(ctx, cx, cy, rr * 1.4, p.r < 0.3 ? "rgba(200,220,255,0.7)" : "rgba(255,160,100,0.5)");
        dot(ctx, cx, cy, rr, p.r < 0.3 ? "#dde6ff" : "#ff9d5e");
        for (let i = 0; i < 6; i++) { const a = st.ang + i * TAU / 6; dot(ctx, cx + Math.cos(a) * rr * 0.75, cy + Math.sin(a) * rr * 0.25, 3, "rgba(80,40,20,0.6)"); }
      }
      text(ctx, "Angular momentum L = Iω stays the same", 12, H - 10);
    },
    info(p, st) {
      return `<div><b>${(st.I || 5).toFixed(2)}</b><span>moment of inertia I (units)</span></div><div><b>${(st.w || 1).toFixed(2)}</b><span>spin rate ω = L / I</span></div>
        <div style="grid-column:1/-1"><span>${p.mode === "star" ? "When a spinning star's core collapses from Sun-size to 20 km, the same effect makes it spin hundreds of times a second: a pulsar is born." : "Pull the weights in and you spin faster, without anyone pushing you. No outside torque means L cannot change."}</span></div>`;
    }
  };

  /* Ch 7 (XI): Kepler's second law */
  SIMS.kepler = {
    name: "Kepler's equal areas", ratio: 0.6, mratio: 0.9,
    controls: [{ k: "e", label: "Orbit stretch (eccentricity)", min: 0, max: 0.8, step: 0.05, v: 0.5 }],
    init(p, st) { st.M = 0; st.wedges = []; st.lastSlot = -1; },
    change(p, st) { st.wedges = []; st.M = 0; st.lastSlot = -1; },
    draw(ctx, W, H, p, st, dt) {
      bg(ctx, W, H);
      const a = Math.min(W * 0.4, H * 0.62), b = a * Math.sqrt(1 - p.e * p.e), cx = W / 2, cy = H / 2, fx = cx + a * p.e;
      st.M = (st.M + dt * 0.8) % TAU;
      let E = st.M; for (let i = 0; i < 8; i++) E = E - (E - p.e * Math.sin(E) - st.M) / (1 - p.e * Math.cos(E));
      const pos = E2 => [cx + a * Math.cos(E2), cy + b * Math.sin(E2)];
      const slot = Math.floor(st.M / (TAU / 12));
      if (slot !== st.lastSlot) { if (slot === 0) st.wedges = []; st.lastSlot = slot; }
      for (let k = 0; k <= slot; k++) {
        const m1 = k * TAU / 12, m2 = Math.min(st.M, (k + 1) * TAU / 12);
        ctx.fillStyle = k % 2 ? "rgba(134,168,255,0.22)" : "rgba(255,210,122,0.22)";
        ctx.beginPath(); ctx.moveTo(fx, cy);
        for (let m = m1; m <= m2 + 1e-6; m += (m2 - m1) / 20 || 1) { let e2 = m; for (let i = 0; i < 8; i++) e2 = e2 - (e2 - p.e * Math.sin(e2) - m) / (1 - p.e * Math.cos(e2)); const [x, y] = pos(e2); ctx.lineTo(x, y); }
        ctx.closePath(); ctx.fill();
      }
      ctx.strokeStyle = "rgba(170,186,255,0.4)"; ctx.lineWidth = 1; ctx.beginPath(); ctx.ellipse(cx, cy, a, b, 0, 0, TAU); ctx.stroke();
      glow(ctx, fx, cy, 30, "rgba(255,210,122,0.8)"); dot(ctx, fx, cy, 9, "#ffd27a");
      const [px, py] = pos(E); dot(ctx, px, py, 6, "#6fb7ff");
      text(ctx, "Each coloured slice takes the same time. Their areas are equal", 12, H - 10);
    },
    info(p) {
      return `<div><b>${((1 + p.e) / (1 - p.e)).toFixed(2)}×</b><span>fastest speed ÷ slowest speed</span></div>
        <div style="grid-column:span 2"><span>Near the Sun the planet sweeps a short fat slice, far away a long thin one, in the same time. It speeds up close in because angular momentum is conserved. Earth's orbit is nearly a circle (e ≈ 0.017). Halley's comet has e ≈ 0.97.</span></div>`;
    }
  };

  /* Ch 8 (XI): stress-strain curve */
  SIMS.stress = {
    name: "Stretch a metal wire", ratio: 0.55, mratio: 0.85,
    controls: [{ k: "s", label: "How hard you pull", min: 0, max: 100, v: 30, unit: "%" }],
    draw(ctx, W, H, p) {
      bg(ctx, W, H);
      const x0 = 46, y0 = 20, w = W * 0.55, h = H - 60;
      plot(ctx, x0, y0, w, h, "strain →", "stress");
      const curve = s => { // s in 0..100 -> [strain, stress]
        if (s <= 35) return [s / 35 * 0.2, s / 35 * 0.6];
        if (s <= 50) return [0.2 + (s - 35) / 15 * 0.12, 0.6 + (s - 35) / 15 * 0.08];
        if (s <= 85) return [0.32 + (s - 50) / 35 * 0.5, 0.68 + Math.sin((s - 50) / 35 * Math.PI / 2) * 0.27];
        return [0.82 + (s - 85) / 15 * 0.16, 0.95 - (s - 85) / 15 * 0.2];
      };
      const X = e => x0 + w * e, Y = sg => y0 + h - h * sg;
      ctx.strokeStyle = "#ffd27a"; ctx.lineWidth = 2; ctx.beginPath();
      for (let s = 0; s <= 100; s++) { const [e, sg] = curve(s); s ? ctx.lineTo(X(e), Y(sg)) : ctx.moveTo(X(e), Y(sg)); }
      ctx.stroke();
      [[35, "proportional limit"], [50, "yield point"], [85, "ultimate strength"], [100, "fracture"]].forEach(([s, l]) => { const [e, sg] = curve(s); dot(ctx, X(e), Y(sg), 3, "#86a8ff"); text(ctx, l, X(e) + 6, Y(sg) - 6, "rgba(169,198,255,0.8)"); });
      const [e, sg] = curve(p.s); dot(ctx, X(e), Y(sg), 6, "#ef7aa0");
      const wx = W * 0.8, len = H * 0.4 + e * H * 0.3;
      ctx.fillStyle = "#8b8fa8"; ctx.fillRect(wx - 30, 14, 60, 8);
      if (p.s < 100) { ctx.strokeStyle = "#c9c9d6"; ctx.lineWidth = Math.max(1, 4 - e * 3); ctx.beginPath(); ctx.moveTo(wx, 22); ctx.lineTo(wx, 22 + len); ctx.stroke(); ctx.fillStyle = "#ffd27a"; ctx.fillRect(wx - 12, 22 + len, 24, 18); }
      else { ctx.strokeStyle = "#c9c9d6"; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(wx, 22); ctx.lineTo(wx, 22 + len * 0.6); ctx.stroke(); text(ctx, "SNAP!", wx, 22 + len * 0.8, "#ff7a7a", "center"); }
    },
    info(p) {
      const msg = p.s <= 35 ? "Elastic and proportional: stress ∝ strain (Hooke's law). Let go and it springs back." : p.s <= 50 ? "Still elastic but no longer a straight line." : p.s <= 85 ? "Plastic region: it stays permanently stretched when you let go." : p.s < 100 ? "Necking: the wire thins at one spot. It is about to break." : "Broken. The stress needed for this is the breaking stress.";
      return `<div style="grid-column:1/-1"><b style="font-family:var(--body);font-size:1rem">${msg}</b><span>Young's modulus Y = stress/strain is the slope of the first straight part.</span></div>`;
    }
  };

  /* Ch 9 (XI): terminal velocity of a ball in a liquid */
  const LIQ = { gly: ["Glycerine", 1.4, 1260], oil: ["Castor oil", 0.99, 960], honey: ["Honey", 10, 1420] };
  SIMS.terminal = {
    name: "Terminal velocity", ratio: 0.55, mratio: 0.85,
    controls: [
      { k: "l", label: "Liquid", v: "gly", options: Object.entries(LIQ).map(([k, v]) => [k, v[0]]) },
      { k: "r", label: "Steel ball radius", min: 0.5, max: 3, step: 0.1, v: 1, unit: "mm" }
    ],
    buttons: [{ label: "Drop ball", primary: true, fn: (p, st) => { st.t = 0; st.y = 0; st.v = 0; st.hist = []; } }],
    init(p, st) { st.t = 0; st.y = 0; st.v = 0; st.hist = []; },
    draw(ctx, W, H, p, st, dt) {
      bg(ctx, W, H);
      const [, eta, rho] = LIQ[p.l], r = p.r * 1e-3, m = 7800 * 4 / 3 * Math.PI * r ** 3;
      const vt = 2 * r * r * (7800 - rho) * 9.8 / (9 * eta);
      const tau = m / (6 * Math.PI * eta * r);
      const sim = Math.min(dt * 0.4, 0.02);
      st.t += sim; st.v = vt * (1 - Math.exp(-st.t / tau)); st.y += st.v * sim;
      if (st.hist.length < 300) st.hist.push([st.t, st.v]);
      const jx = W * 0.15, jw = 60, jt = 20, jh = H - 40;
      ctx.fillStyle = p.l === "honey" ? "rgba(255,190,80,0.3)" : "rgba(180,200,255,0.12)"; ctx.fillRect(jx, jt, jw, jh);
      const py = jt + 10 + ((st.y / 0.15) * (jh - 20)) % (jh - 20);
      dot(ctx, jx + jw / 2, py, Math.max(3, p.r * 3), "#c9c9d6");
      const x0 = W * 0.4, y0 = 30, w = W * 0.55, h = H - 70;
      plot(ctx, x0, y0, w, h, "time →", "speed");
      const T = Math.max(tau * 6, 0.01);
      ctx.strokeStyle = "rgba(116,224,181,0.6)"; ctx.setLineDash([4, 4]); ctx.beginPath(); ctx.moveTo(x0, y0 + h * 0.15); ctx.lineTo(x0 + w, y0 + h * 0.15); ctx.stroke(); ctx.setLineDash([]);
      text(ctx, "terminal velocity", x0 + w, y0 + h * 0.15 - 6, "#74e0b5", "right");
      ctx.strokeStyle = "#ffd27a"; ctx.lineWidth = 2; ctx.beginPath();
      for (let i = 0; i <= 100; i++) { const t = T * i / 100, v = 1 - Math.exp(-t / tau); const x = x0 + w * i / 100, y = y0 + h - h * 0.85 * v; i ? ctx.lineTo(x, y) : ctx.moveTo(x, y); }
      ctx.stroke();
    },
    info(p) {
      const [, eta, rho] = LIQ[p.l], r = p.r * 1e-3, vt = 2 * r * r * (7800 - rho) * 9.8 / (9 * eta);
      return `<div><b>${(vt * 100).toFixed(2)} cm/s</b><span>v<sub>t</sub> = 2r²(ρ − σ)g / 9η</span></div><div><b>${eta} Pa·s</b><span>viscosity η</span></div>
        <div style="grid-column:1/-1"><span>Double the radius and terminal speed goes up 4 times (∝ r²). Raindrops reach terminal speed too, which is why rain does not hurt.</span></div>`;
    }
  };

  /* Ch 10 (XI): heating curve of ice to steam */
  SIMS.heating = {
    name: "Ice to steam heating curve", ratio: 0.55, mratio: 0.85,
    controls: [{ k: "Q", label: "Heat supplied to 1 kg of ice at −20°C", min: 0, max: 3100, step: 10, v: 200, unit: "kJ" }],
    draw(ctx, W, H, p) {
      bg(ctx, W, H);
      const seg = [[42, -20, 0, "ice warms"], [334, 0, 0, "melting"], [418.6, 0, 100, "water warms"], [2256, 100, 100, "boiling"], [40.2, 100, 120, "steam warms"]];
      const x0 = 46, y0 = 20, w = W - 70, h = H - 60, Qt = 3090.8;
      plot(ctx, x0, y0, w, h, "heat added (kJ) →", "temperature (°C)");
      const X = q => x0 + w * q / Qt, Y = T => y0 + h - h * (T + 20) / 140;
      ctx.strokeStyle = "#ffd27a"; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(X(0), Y(-20));
      let q = 0; seg.forEach(s => { q += s[0]; ctx.lineTo(X(q), Y(s[2])); }); ctx.stroke();
      [0, 100].forEach(T => text(ctx, T + "°", x0 - 30, Y(T) + 4));
      let acc = 0, T = -20, phase = "";
      for (const s of seg) { if (p.Q <= acc + s[0]) { T = s[1] + (s[2] - s[1]) * (p.Q - acc) / s[0]; phase = s[3]; break; } acc += s[0]; T = s[2]; phase = s[3]; }
      dot(ctx, X(Math.min(p.Q, Qt)), Y(T), 6, "#ef7aa0");
      this._s = { T, phase };
    },
    info(p) {
      const s = this._s || { T: -20, phase: "ice warms" };
      return `<div><b>${s.T.toFixed(1)} °C</b><span>temperature</span></div><div><b>${s.phase}</b><span>what is happening</span></div>
        <div style="grid-column:1/-1"><span>Flat parts: heat goes in but the temperature does not rise. It is used to break bonds (latent heat). Boiling takes almost 7 times more heat than melting!</span></div>`;
    },
    live: true
  };

  /* Ch 11 (XI): PV diagram processes */
  SIMS.pv = {
    name: "Thermodynamic processes on a PV diagram", ratio: 0.55, mratio: 0.9,
    controls: [
      { k: "proc", label: "Process", v: "iso", options: [["iso", "Isothermal"], ["adi", "Adiabatic"], ["bar", "Isobaric"], ["cho", "Isochoric"]] },
      { k: "r", label: "Final ÷ initial (volume, or pressure for isochoric)", min: 0.3, max: 3, step: 0.05, v: 2 }
    ],
    draw(ctx, W, H, p) {
      bg(ctx, W, H);
      const P1 = 1e5, V1 = 0.0249, g = 5 / 3;
      const x0 = 46, y0 = 20, w = W - 70, h = H - 60;
      plot(ctx, x0, y0, w, h, "volume →", "pressure");
      const X = V => x0 + w * V / (V1 * 3.2);
      const Yp = P => y0 + h - h * P / (P1 * 3.5);
      const pts = [];
      for (let i = 0; i <= 60; i++) {
        const k = 1 + (p.r - 1) * i / 60;
        if (p.proc === "iso") pts.push([V1 * k, P1 / k]);
        else if (p.proc === "adi") pts.push([V1 * k, P1 * Math.pow(1 / k, g)]);
        else if (p.proc === "bar") pts.push([V1 * k, P1]);
        else pts.push([V1, P1 * k]);
      }
      if (p.proc !== "cho") { ctx.fillStyle = "rgba(255,210,122,0.18)"; ctx.beginPath(); ctx.moveTo(X(pts[0][0]), Yp(0)); pts.forEach(([V, P]) => ctx.lineTo(X(V), Yp(P))); ctx.lineTo(X(pts[60][0]), Yp(0)); ctx.fill(); }
      ctx.strokeStyle = "#ffd27a"; ctx.lineWidth = 2.5; ctx.beginPath(); pts.forEach(([V, P], i) => i ? ctx.lineTo(X(V), Yp(P)) : ctx.moveTo(X(V), Yp(P))); ctx.stroke();
      dot(ctx, X(pts[0][0]), Yp(pts[0][1]), 5, "#86a8ff"); text(ctx, "A", X(pts[0][0]) - 14, Yp(pts[0][1]) - 6, "#86a8ff");
      dot(ctx, X(pts[60][0]), Yp(pts[60][1]), 5, "#ef7aa0"); text(ctx, "B", X(pts[60][0]) + 6, Yp(pts[60][1]) - 6, "#ef7aa0");
      text(ctx, "shaded area = work done by the gas", x0 + 8, y0 + 12);
    },
    info(p) {
      const n = 1, R = 8.314, P1 = 1e5, V1 = 0.0249, g = 5 / 3;
      let W_ = 0, dU = 0;
      if (p.proc === "iso") { W_ = n * R * 300 * Math.log(p.r); dU = 0; }
      else if (p.proc === "adi") { const P2 = P1 * Math.pow(1 / p.r, g), V2 = V1 * p.r; W_ = (P1 * V1 - P2 * V2) / (g - 1); dU = -W_; }
      else if (p.proc === "bar") { W_ = P1 * V1 * (p.r - 1); dU = 1.5 * W_; }
      else { W_ = 0; dU = 1.5 * V1 * P1 * (p.r - 1); }
      const Q = dU + W_;
      const note = { iso: "Temperature fixed, so internal energy does not change: all heat in becomes work.", adi: "No heat in or out (Q = 0). Expanding gas cools as it spends its own energy. Clouds form this way!", bar: "Pressure fixed. Heat both warms the gas and makes it push out.", cho: "Volume fixed, so no work is done. All heat goes into internal energy." }[p.proc];
      return `<div><b>${W_.toFixed(0)} J</b><span>work W by gas</span></div><div><b>${dU.toFixed(0)} J</b><span>change in internal energy ΔU</span></div><div><b>${Q.toFixed(0)} J</b><span>heat Q = ΔU + W (first law)</span></div>
        <div style="grid-column:1/-1"><span>${note} (1 mole of helium starting at 300 K.)</span></div>`;
    }
  };

  /* Ch 12 (XI): gas molecules in a box */
  const GAS = { H2: ["Hydrogen", 0.002], He: ["Helium", 0.004], N2: ["Nitrogen", 0.028], CO2: ["Carbon dioxide", 0.044] };
  SIMS.gas = {
    name: "Gas in a box", ratio: 0.55, mratio: 0.85,
    controls: [
      { k: "g", label: "Gas", v: "N2", options: Object.entries(GAS).map(([k, v]) => [k, v[0]]) },
      { k: "T", label: "Temperature", min: 50, max: 1000, step: 10, v: 300, unit: "K" }
    ],
    init(p, st) { st.m = []; for (let i = 0; i < 60; i++) { const a = Math.random() * TAU; st.m.push({ x: Math.random(), y: Math.random(), dx: Math.cos(a), dy: Math.sin(a), s: 0.5 + Math.random() }); } st.hits = 0; st.rate = 0; st.tt = 0; },
    draw(ctx, W, H, p, st, dt) {
      bg(ctx, W, H);
      const vr = Math.sqrt(3 * 8.314 * p.T / GAS[p.g][1]);
      const bx = 20, by = 20, bw = W * 0.6, bh = H - 40;
      ctx.strokeStyle = "rgba(200,210,240,0.5)"; ctx.lineWidth = 2; ctx.strokeRect(bx, by, bw, bh);
      const sp = vr / 1000 * 0.25;
      for (const m of st.m) {
        m.x += m.dx * m.s * sp * dt; m.y += m.dy * m.s * sp * dt;
        if (m.x < 0 || m.x > 1) { m.dx *= -1; m.x = G.clamp(m.x, 0, 1); st.hits++; }
        if (m.y < 0 || m.y > 1) { m.dy *= -1; m.y = G.clamp(m.y, 0, 1); st.hits++; }
        dot(ctx, bx + m.x * bw, by + m.y * bh, 3.5, G.rgb(G.kelvinRGB(1500 + p.T * 6)));
      }
      st.tt += dt; if (st.tt > 1) { st.rate = st.hits / st.tt; st.hits = 0; st.tt = 0; }
      const gx = bx + bw + 30, gw = W - gx - 20, gh = H - 40;
      [["Moon escape ÷ 6", 2380 / 6], ["Earth escape ÷ 6", 11200 / 6], ["v rms", vr]].forEach(([l, v], i) => {
        const hh = gh * 0.8 * Math.min(1, v / 2500), x = gx + i * gw / 3;
        ctx.fillStyle = i === 2 ? "#ffd27a" : "rgba(134,168,255,0.5)"; ctx.fillRect(x, by + gh - hh, gw / 3 - 8, hh);
        text(ctx, l, x, by + gh + 14 - (i % 2) * 0, null);
      });
      st.vr = vr;
    },
    live: true,
    info(p, st) {
      const vr = st.vr || 0, KE = 1.5 * 1.38e-23 * p.T;
      return `<div><b>${vr.toFixed(0)} m/s</b><span>v<sub>rms</sub> = √(3RT/M)</span></div><div><b>${G.fmt(KE)} J</b><span>average KE = (3/2)kT</span></div>
        <div style="grid-column:1/-1"><span>${vr > 2380 / 6 ? "Faster than 1/6 of the Moon's escape speed: over millions of years this gas would leak away from the Moon. That is why the Moon has no air." : "Slow enough that even the Moon could hold on to it for a long time."} (Rule of thumb: a planet keeps a gas for billions of years if v<sub>rms</sub> is below about 1/6 of its escape speed.)</span></div>`;
    }
  };

  /* Ch 13 (XI): spring-mass SHM */
  SIMS.shm = {
    name: "Spring and mass oscillator", ratio: 0.55, mratio: 0.85,
    controls: [
      { k: "m", label: "Mass m", min: 0.1, max: 2, step: 0.05, v: 0.5, unit: "kg" },
      { k: "k", label: "Spring constant k", min: 5, max: 100, v: 50, unit: "N/m" }
    ],
    init(p, st) { st.t = 0; st.h = []; },
    draw(ctx, W, H, p, st, dt) {
      bg(ctx, W, H);
      st.t += dt;
      const w = Math.sqrt(p.k / p.m), x = Math.cos(w * st.t);
      st.h.push(x); if (st.h.length > 360) st.h.shift();
      const cy = H * 0.3, x0 = 30, eq = W * 0.35, A = W * 0.18;
      ctx.fillStyle = "#3a4264"; ctx.fillRect(x0 - 10, cy - 30, 10, 60);
      const bx = eq + x * A;
      ctx.strokeStyle = "#a9c6ff"; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(x0, cy);
      const coils = 14; for (let i = 1; i <= coils; i++) ctx.lineTo(x0 + (bx - 20 - x0) * i / coils, cy + (i % 2 ? -12 : 12)); ctx.lineTo(bx - 20, cy); ctx.stroke();
      const sz = 20 + p.m * 12;
      ctx.fillStyle = "#ffd27a"; ctx.fillRect(bx - 20, cy - sz / 2, sz, sz);
      ctx.strokeStyle = "rgba(116,224,181,0.5)"; ctx.setLineDash([3, 4]); ctx.beginPath(); ctx.moveTo(eq, cy - 40); ctx.lineTo(eq, cy + 40); ctx.stroke(); ctx.setLineDash([]);
      const gy = H * 0.75, gh = H * 0.18;
      ctx.strokeStyle = "rgba(170,186,255,0.2)"; ctx.beginPath(); ctx.moveTo(20, gy); ctx.lineTo(W - 20, gy); ctx.stroke();
      ctx.strokeStyle = "#ef7aa0"; ctx.lineWidth = 2; ctx.beginPath();
      st.h.forEach((v, i) => { const X = W - 20 - (st.h.length - i) * (W - 40) / 360, Y = gy - v * gh; i ? ctx.lineTo(X, Y) : ctx.moveTo(X, Y); }); ctx.stroke();
      text(ctx, "displacement x vs time: a perfect sine wave", 20, H - 8);
    },
    info(p) {
      const T = TAU * Math.sqrt(p.m / p.k);
      return `<div><b>${T.toFixed(3)} s</b><span>period T = 2π√(m/k)</span></div><div><b>${(1 / T).toFixed(2)} Hz</b><span>frequency</span></div>
        <div style="grid-column:1/-1"><span>Heavier mass: slower. Stiffer spring: faster. The size of the swing does not change the period at all. That is what makes SHM special.</span></div>`;
    }
  };

  /* Ch 14 (XI): standing waves on a string */
  SIMS.standing = {
    name: "Standing waves on a string", ratio: 0.45, mratio: 0.75,
    controls: [
      { k: "n", label: "Harmonic n", min: 1, max: 8, v: 2 },
      { k: "T", label: "String tension", min: 10, max: 200, v: 100, unit: "N" }
    ],
    draw(ctx, W, H, p, st, dt, t) {
      bg(ctx, W, H);
      const x0 = 30, x1 = W - 30, cy = H / 2, A = H * 0.3;
      const v = Math.sqrt(p.T / 0.01), f = p.n * v / 2;
      const ph = Math.cos(t * (2 + f / 200));
      ctx.lineWidth = 1;
      for (const k of [1, -1]) { ctx.strokeStyle = "rgba(169,198,255,0.15)"; ctx.beginPath(); for (let i = 0; i <= 200; i++) { const x = x0 + (x1 - x0) * i / 200; const y = cy + k * A * Math.sin(p.n * Math.PI * i / 200); i ? ctx.lineTo(x, y) : ctx.moveTo(x, y); } ctx.stroke(); }
      ctx.strokeStyle = "#ffd27a"; ctx.lineWidth = 2.5; ctx.beginPath();
      for (let i = 0; i <= 200; i++) { const x = x0 + (x1 - x0) * i / 200, y = cy + ph * A * Math.sin(p.n * Math.PI * i / 200); i ? ctx.lineTo(x, y) : ctx.moveTo(x, y); }
      ctx.stroke();
      for (let k = 0; k <= p.n; k++) dot(ctx, x0 + (x1 - x0) * k / p.n, cy, 5, "#ef7aa0");
      text(ctx, "pink dots: nodes (never move)", 12, H - 10);
    },
    info(p) {
      const v = Math.sqrt(p.T / 0.01), f = p.n * v / 2;
      return `<div><b>${f.toFixed(0)} Hz</b><span>f<sub>n</sub> = n·v/2L</span></div><div><b>${v.toFixed(0)} m/s</b><span>wave speed v = √(T/μ)</span></div>
        <div><b>${(2 / p.n).toFixed(2)} m</b><span>wavelength λ = 2L/n</span></div><div><b>${p.n + 1} nodes, ${p.n} antinodes</b><span>1 m string, μ = 0.01 kg/m</span></div>`;
    }
  };

  /* ================= SPACE EXTRAS ================= */

  /* Blackbody: why star colour means temperature */
  SIMS.blackbody = {
    name: "Star colour thermometer", ratio: 0.55, mratio: 0.85,
    controls: [{ k: "T", label: "Star surface temperature", min: 2500, max: 30000, step: 100, v: 5800, unit: "K" }],
    draw(ctx, W, H, p) {
      bg(ctx, W, H);
      const x0 = 46, y0 = 20, w = W * 0.62, h = H - 60;
      plot(ctx, x0, y0, w, h, "wavelength (nm) →", "brightness");
      const B = (l, T) => { const lm = l * 1e-9; return 1 / (Math.pow(lm, 5) * (Math.exp(0.014388 / (lm * T)) - 1)); };
      const X = l => x0 + w * (l - 100) / 2400;
      for (let l = 380; l <= 750; l += 2) { ctx.fillStyle = G.rgb(G.wlRGB(l), 0.18); ctx.fillRect(X(l), y0, X(l + 2) - X(l) + 0.5, h); }
      let mx = 0; for (let l = 100; l <= 2500; l += 10) mx = Math.max(mx, B(l, p.T), B(l, 5772));
      [[5772, "rgba(170,186,255,0.45)"], [p.T, "#ffd27a"]].forEach(([T, c]) => {
        ctx.strokeStyle = c; ctx.lineWidth = T === p.T ? 2.5 : 1.5; ctx.beginPath();
        for (let l = 100; l <= 2500; l += 10) { const x = X(l), y = y0 + h - h * B(l, T) / mx; l === 100 ? ctx.moveTo(x, y) : ctx.lineTo(x, y); }
        ctx.stroke();
      });
      const peak = 2.898e6 / p.T;
      if (peak < 2500) { ctx.strokeStyle = "rgba(239,122,160,0.7)"; ctx.setLineDash([3, 3]); ctx.beginPath(); ctx.moveTo(X(peak), y0); ctx.lineTo(X(peak), y0 + h); ctx.stroke(); ctx.setLineDash([]); }
      const sx = W * 0.84, sy = H * 0.45, col = G.kelvinRGB(p.T);
      glow(ctx, sx, sy, 70, G.rgb(col, 0.7)); dot(ctx, sx, sy, 30, G.rgb(col));
      text(ctx, "faint line: our Sun", x0 + 6, y0 + 12, "rgba(170,186,255,0.8)");
    },
    info(p) {
      const peak = 2.898e6 / p.T, L = Math.pow(p.T / 5772, 4);
      const ex = p.T < 3800 ? "like Betelgeuse or Antares" : p.T < 5200 ? "like Aldebaran or Arcturus" : p.T < 6000 ? "like our Sun" : p.T < 10500 ? "like Sirius or Vega" : "like Rigel or Spica";
      return `<div><b>${peak.toFixed(0)} nm</b><span>peak wavelength (Wien's law λ<sub>max</sub>T = 2.9 × 10⁻³ m·K)</span></div>
        <div><b>${L < 10 ? L.toFixed(2) : G.fmt(Math.round(L))}×</b><span>light from each square metre vs the Sun (∝ T⁴)</span></div>
        <div style="grid-column:1/-1"><span>A star ${ex}. Hot stars peak in blue or even ultraviolet, cool ones in red or infrared. It is exactly why a stove coil glows red before it glows white.</span></div>`;
    }
  };

  /* Hertzsprung-Russell diagram (approximate values) */
  const HRS = [
    ["Sun", 5772, 1, "Our middle-aged, perfectly average star."], ["Proxima Centauri", 3040, 0.0017, "The nearest star to the Sun. A small red dwarf."],
    ["Barnard's Star", 3130, 0.0035, "A red dwarf racing across our sky faster than any other star."], ["Alpha Centauri A", 5790, 1.5, "Almost a twin of the Sun, 4.4 light years away."],
    ["Sirius A", 9940, 25, "The brightest star in the night sky."], ["Sirius B", 25000, 0.056, "A white dwarf. Earth-sized, Sun-heavy."],
    ["Procyon B", 7740, 0.0005, "Another white dwarf, orbiting Procyon."], ["Vega", 9600, 40, "A bright blue-white star in Lyra. Abhijit."],
    ["Spica", 25300, 20000, "A hot blue giant in Virgo. Chitra in Indian astronomy."], ["Rigel", 12100, 120000, "Orion's blue supergiant foot."],
    ["Deneb", 8500, 100000, "Extremely luminous and far away. Values uncertain."], ["Betelgeuse", 3600, 100000, "Orion's red supergiant shoulder. Future supernova."],
    ["Antares", 3600, 75000, "The red heart of Scorpius. Jyeshtha."], ["Aldebaran", 3900, 440, "The orange eye of Taurus. Rohini."],
    ["Arcturus", 4290, 170, "An orange giant. Swati in Indian astronomy."], ["Polaris", 6000, 1260, "The Pole Star, a pulsing supergiant."], ["Procyon A", 6530, 7, "A bright white star in Canis Minor."]
  ];
  SIMS.hr = {
    name: "The H-R diagram", ratio: 0.7, mratio: 1.05,
    controls: [{ k: "i", label: "Star", v: 0, options: HRS.map((s, i) => [i, s[0]]) }],
    draw(ctx, W, H, p) {
      bg(ctx, W, H);
      const x0 = 50, y0 = 20, w = W - 70, h = H - 60;
      plot(ctx, x0, y0, w, h, "← hotter · surface temperature · cooler →", "brightness (× Sun)");
      const X = T => x0 + w * (Math.log10(40000) - Math.log10(T)) / (Math.log10(40000) - Math.log10(2500));
      const Y = L => y0 + h - h * (Math.log10(L) + 4) / 10;
      ctx.strokeStyle = "rgba(255,210,122,0.18)"; ctx.lineWidth = 26; ctx.lineCap = "round"; ctx.beginPath(); ctx.moveTo(X(30000), Y(50000)); ctx.lineTo(X(5772), Y(1)); ctx.lineTo(X(2800), Y(0.0003)); ctx.stroke(); ctx.lineCap = "butt";
      text(ctx, "main sequence", X(9000), Y(3) + 34, "rgba(255,210,122,0.8)");
      text(ctx, "white dwarfs", X(15000), Y(0.0003) + 16, "rgba(221,230,255,0.7)");
      text(ctx, "giants", X(4200), Y(300) - 14, "rgba(255,162,94,0.8)");
      text(ctx, "supergiants", X(8000), Y(150000) + 14, "rgba(255,111,94,0.8)");
      [1e-4, 1e-2, 1, 1e2, 1e4, 1e6].forEach(L => text(ctx, L >= 1 ? G.fmt(L) : String(L), 6, Y(L) + 4, "rgba(170,186,255,0.6)"));
      HRS.forEach((s, i) => {
        const x = X(s[1]), y = Y(s[2]), c = G.kelvinRGB(s[1]);
        if (i === p.i) { glow(ctx, x, y, 22, G.rgb(c, 0.8)); text(ctx, s[0], x + 10, y - 8, "#fff"); }
        dot(ctx, x, y, i === p.i ? 6 : 4, G.rgb(c));
      });
    },
    info(p) {
      const s = HRS[p.i];
      return `<div><b>${s[0]}</b><span>${s[3]}</span></div><div><b>${G.fmt(s[1])} K</b><span>surface temperature</span></div><div><b>${s[2] < 1 ? s[2] : G.fmt(s[2])}×</b><span>luminosity vs the Sun (approximate)</span></div>`;
    }
  };

  /* Balloon universe: Hubble's law */
  SIMS.balloon = {
    name: "Expanding universe", ratio: 0.55, mratio: 0.85, live: true,
    controls: [{ k: "home", label: "Your home galaxy", v: 0, options: [[0, "Centre one"], [1, "Edge one"]] }],
    init(p, st) {
      st.t = 0; st.g = [];
      let seed = 7; const r = () => (seed = (seed * 9301 + 49297) % 233280) / 233280;
      for (let i = 0; i < 46; i++) st.g.push([r() - 0.5, r() - 0.5]);
      st.g[0] = [0, 0]; st.g[1] = [0.38, -0.3];
    },
    draw(ctx, W, H, p, st, dt) {
      bg(ctx, W, H);
      st.t = (st.t + dt * 0.15) % 1;
      const a = 1 + st.t * 1.2, cx = W / 2, cy = H / 2, S = Math.min(W, H) * 0.9;
      const home = st.g[p.home];
      ctx.strokeStyle = "rgba(134,168,255,0.08)";
      for (let k = -6; k <= 6; k++) { ctx.beginPath(); ctx.moveTo(cx + k * 0.1 * a * S, 0); ctx.lineTo(cx + k * 0.1 * a * S, H); ctx.stroke(); ctx.beginPath(); ctx.moveTo(0, cy + k * 0.1 * a * S); ctx.lineTo(W, cy + k * 0.1 * a * S); ctx.stroke(); }
      st.g.forEach((g, i) => {
        const x = cx + (g[0] - home[0]) * a * S, y = cy + (g[1] - home[1]) * a * S;
        if (x < -10 || x > W + 10 || y < -10 || y > H + 10) return;
        if (i !== p.home) arrow(ctx, x, y, x + (g[0] - home[0]) * S * 0.25, y + (g[1] - home[1]) * S * 0.25, "rgba(239,122,160,0.6)", 1.2);
        glow(ctx, x, y, i === p.home ? 16 : 9, i === p.home ? "rgba(255,210,122,0.9)" : "rgba(221,230,255,0.7)");
      });
      text(ctx, "Arrows: how fast each galaxy moves away from you", 12, H - 10);
    },
    info(p) {
      return `<div style="grid-column:1/-1"><b style="font-family:var(--body);font-size:1rem">Twice as far away means moving away twice as fast.</b><span>Switch your home galaxy: the view looks exactly the same from everywhere. There is no centre! This is Hubble's law, v = H₀d, with H₀ ≈ 70 km/s for every megaparsec (3.26 million light years). Astronomers still argue whether it is closer to 67 or 73: the "Hubble tension".</span></div>`;
    }
  };

  /* Moon phases */
  SIMS.moon = {
    name: "Why the Moon has phases", ratio: 0.5, mratio: 0.95,
    controls: [{ k: "d", label: "Days since new moon", min: 0, max: 29.5, step: 0.5, v: 7.5 }],
    draw(ctx, W, H, p) {
      bg(ctx, W, H);
      const th = p.d / 29.53 * TAU;
      const cx = W * 0.3, cy = H / 2, R = Math.min(W * 0.2, H * 0.36);
      for (let y = 20; y < H; y += 26) arrow(ctx, 4, y, 30, y, "rgba(255,210,122,0.35)", 1);
      text(ctx, "sunlight →", 8, 14, "#ffd27a");
      ctx.strokeStyle = "rgba(170,186,255,0.2)"; ctx.beginPath(); ctx.arc(cx, cy, R, 0, TAU); ctx.stroke();
      dot(ctx, cx, cy, 14, "#4f86d9");
      // Sun on the left: new moon sits between Earth and Sun (angle pi)
      const ang = Math.PI + th, mx = cx + Math.cos(ang) * R, my = cy - Math.sin(ang) * R;
      dot(ctx, mx, my, 10, "#2a2f45");
      ctx.fillStyle = "#e9ecf7"; ctx.beginPath(); ctx.arc(mx, my, 10, Math.PI / 2, Math.PI * 1.5); ctx.fill();
      // as seen from Earth
      const vx = W * 0.72, vy = H / 2, r = Math.min(W * 0.16, H * 0.34);
      dot(ctx, vx, vy, r, "#2a2f45");
      const k = Math.cos(th); // 1 new, -1 full
      ctx.fillStyle = "#e9ecf7"; ctx.beginPath();
      const waxing = p.d < 14.765;
      ctx.arc(vx, vy, r, -Math.PI / 2, Math.PI / 2, !waxing);
      ctx.ellipse(vx, vy, Math.abs(k) * r, r, 0, Math.PI / 2, -Math.PI / 2, (k > 0) === waxing);
      ctx.fill();
      text(ctx, "what you see from Earth", vx, vy + r + 20, null, "center");
      text(ctx, "view from above", cx, H - 10, null, "center");
    },
    info(p) {
      const th = p.d / 29.53 * TAU, f = (1 - Math.cos(th)) / 2;
      const names = [[1, "New moon"], [6.4, "Waxing crescent"], [8.4, "First quarter"], [13.8, "Waxing gibbous"], [15.8, "Full moon"], [21.1, "Waning gibbous"], [23.1, "Last quarter"], [28.5, "Waning crescent"], [30, "New moon"]];
      const n = names.find(x => p.d < x[0])[1];
      return `<div><b>${n}</b><span>phase</span></div><div><b>${(f * 100).toFixed(0)}%</b><span>of the face lit</span></div>
        <div style="grid-column:1/-1"><span>Half the Moon is ALWAYS lit by the Sun. Phases are just how much of that lit half faces us as the Moon goes round. Earth's shadow has nothing to do with it (that is an eclipse).</span></div>`;
    }
  };

  /* Twin paradox */
  const DEST = { prox: ["Proxima Centauri", 4.24], vega: ["Vega", 25], plei: ["the Pleiades", 444], gc: ["the galaxy's centre", 26000] };
  SIMS.twin = {
    name: "Kutush's space trip", ratio: 0.42, mratio: 0.7, live: true,
    controls: [
      { k: "dst", label: "Destination", v: "vega", options: Object.entries(DEST).map(([k, v]) => [k, v[0]]) },
      { k: "v", label: "Rocket speed", min: 0.1, max: 0.9999, step: 0.0001, v: 0.99, fmt: v => (v * 100).toFixed(2) + "% of light" }
    ],
    draw(ctx, W, H, p, st, dt, t) {
      bg(ctx, W, H);
      const g = 1 / Math.sqrt(1 - p.v * p.v);
      const ph = (t * 0.25) % 2, x = ph < 1 ? ph : 2 - ph;
      const ex = 40, dx = W - 50, y = H * 0.45;
      dot(ctx, ex, y, 14, "#4f86d9"); text(ctx, "Earth", ex, y + 30, null, "center");
      glow(ctx, dx, y, 24, "rgba(221,230,255,0.8)"); text(ctx, DEST[p.dst][0], dx, y + 30, null, "right");
      const rx = ex + 20 + (dx - ex - 40) * x;
      ctx.fillStyle = "#ffd27a"; ctx.beginPath();
      const dir = ph < 1 ? 1 : -1; ctx.moveTo(rx + 12 * dir, y); ctx.lineTo(rx - 8 * dir, y - 6); ctx.lineTo(rx - 8 * dir, y + 6); ctx.fill();
      // contracted length marker
      ctx.strokeStyle = "rgba(239,122,160,0.6)"; ctx.beginPath(); ctx.moveTo(ex + 20, y + 50); ctx.lineTo(ex + 20 + (dx - ex - 40) / g, y + 50); ctx.stroke();
      text(ctx, "distance as measured by the rocket crew (length contraction)", ex + 20, y + 66, "rgba(239,122,160,0.8)");
    },
    info(p) {
      const g = 1 / Math.sqrt(1 - p.v * p.v), d = DEST[p.dst][1];
      const earth = 2 * d / p.v, trav = earth / g, age = 17;
      const f = y => y >= 1000 ? G.fmt(Math.round(y)) : y.toFixed(1);
      return `<div><b>${f(earth)} yr</b><span>round trip, by Earth clocks</span></div><div><b>${f(trav)} yr</b><span>round trip, by Kutush's watch</span></div>
        <div><b>${g.toFixed(2)}</b><span>time dilation factor γ</span></div>
        <div style="grid-column:1/-1"><span>Kutush leaves at ${age} and returns aged ${f(age + trav)}. Her classmates would be ${f(age + earth)}${age + earth > 120 ? ", long gone" : ""}. This is real: particles called muons live longer when they move fast, exactly as Einstein predicted.</span></div>`;
    }
  };
})();
