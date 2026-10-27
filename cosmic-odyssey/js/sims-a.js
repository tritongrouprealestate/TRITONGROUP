/* Interactive experiments, part A: the engine + Class 12 physics sims */
(function () {
  const TAU = Math.PI * 2;
  const MONO = "500 11px 'JetBrains Mono', monospace";
  const SIMS = G.SIMS = {};

  /* ---------- engine ---------- */
  G.sim = function (host, spec) {
    const wrap = document.createElement("div");
    wrap.className = "sim";
    wrap.innerHTML = `<canvas class="stage" aria-label="${spec.name || "Experiment"}"></canvas><div class="sim-controls"></div><div class="sim-read readout"></div>`;
    host.appendChild(wrap);
    const cv = wrap.querySelector("canvas"), ctrl = wrap.querySelector(".sim-controls"), read = wrap.querySelector(".sim-read");
    const p = {}, st = { W: 0, H: 0 };
    let ctx, W = 0, H = 0, touched = false;

    (spec.controls || []).forEach(c => {
      p[c.k] = c.v;
      const box = document.createElement("div");
      box.className = "field";
      if (c.options) {
        box.innerHTML = `<label>${c.label}</label><div class="row">${c.options.map(o => `<button class="chip" type="button" data-v="${o[0]}" aria-pressed="${o[0] === c.v}">${o[1]}</button>`).join("")}</div>`;
        box.addEventListener("click", e => {
          const b = e.target.closest("button[data-v]"); if (!b) return;
          const raw = b.dataset.v; p[c.k] = isNaN(+raw) ? raw : +raw;
          box.querySelectorAll("button").forEach(x => x.setAttribute("aria-pressed", x === b));
          changed(true);
        });
      } else {
        const fmt = c.fmt || (v => v);
        box.innerHTML = `<label>${c.label}: <b class="mono">${fmt(c.v)}</b>${c.unit ? " " + c.unit : ""}</label><input type="range" min="${c.min}" max="${c.max}" step="${c.step || 1}" value="${c.v}">`;
        const inp = box.querySelector("input"), out = box.querySelector("b");
        inp.addEventListener("input", () => { p[c.k] = +inp.value; out.textContent = fmt(p[c.k]); changed(true); });
      }
      ctrl.appendChild(box);
    });
    (spec.buttons || []).forEach(b => {
      const btn = document.createElement("button");
      btn.className = "btn" + (b.primary ? " primary" : ""); btn.type = "button"; btn.textContent = b.label;
      btn.addEventListener("click", () => { b.fn(p, st); changed(true); });
      ctrl.appendChild(btn);
    });

    function changed(user) {
      if (W && spec.change) spec.change(p, st);
      if (spec.info) read.innerHTML = spec.info(p, st);
      if (user && !touched) { touched = true; G.award("sim-" + spec.id, 6, "Experiment: " + (spec.name || spec.id)); }
    }
    function fit() {
      const ratio = (innerWidth < 700 && spec.mratio) || spec.ratio || 0.55;
      const r = G.fit(cv, ratio); ctx = r.ctx; W = st.W = r.w; H = st.H = r.h;
    }
    if (spec.init) spec.init(p, st);
    if (spec.info) read.innerHTML = spec.info(p, st);

    let last = performance.now(), lw = -1, lastInfo = 0;
    function frame(t) {
      if (!document.body.contains(cv)) return;
      requestAnimationFrame(frame);
      if (cv.offsetParent === null) { last = t; return; }
      if (cv.clientWidth !== lw) { lw = cv.clientWidth; fit(); if (spec.change) spec.change(p, st); }
      const dt = G.clamp((t - last) / 1000, 0, 0.05); last = t;
      spec.draw(ctx, W, H, p, st, dt, t / 1000);
      if (spec.live && spec.info && t - lastInfo > 250) { lastInfo = t; read.innerHTML = spec.info(p, st); }
    }
    requestAnimationFrame(frame);
    const pt = e => { const r = cv.getBoundingClientRect(); return [(e.clientX - r.left) * (W / r.width), (e.clientY - r.top) * (H / r.height)]; };
    cv.addEventListener("pointermove", e => { if (spec.move) { const [x, y] = pt(e); spec.move(x, y, p, st); if (spec.info) read.innerHTML = spec.info(p, st); } });
    cv.addEventListener("pointerleave", () => { if (spec.move) { st.hover = null; if (spec.info) read.innerHTML = spec.info(p, st); } });
    cv.addEventListener("click", e => {
      if (!spec.click) return;
      const r = cv.getBoundingClientRect();
      spec.click((e.clientX - r.left) * (W / r.width), (e.clientY - r.top) * (H / r.height), p, st);
      changed(true);
    });
    return { p, st, refresh: () => changed(false) };
  };

  G.mount = function (host, id) { const s = SIMS[id]; if (s) G.sim(host, Object.assign({ id }, s)); };

  /* ---------- shared drawing helpers ---------- */
  const H_ = G.simkit = {
    bg(ctx, W, H) { ctx.fillStyle = "#050814"; ctx.fillRect(0, 0, W, H); },
    text(ctx, s, x, y, col, align) { ctx.font = MONO; ctx.fillStyle = col || "rgba(200,210,240,0.8)"; ctx.textAlign = align || "left"; ctx.fillText(s, x, y); ctx.textAlign = "left"; },
    arrow(ctx, x1, y1, x2, y2, col, w) {
      ctx.strokeStyle = ctx.fillStyle = col; ctx.lineWidth = w || 2;
      ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.stroke();
      const a = Math.atan2(y2 - y1, x2 - x1), s = 7 + (w || 2);
      ctx.beginPath(); ctx.moveTo(x2, y2); ctx.lineTo(x2 - s * Math.cos(a - 0.4), y2 - s * Math.sin(a - 0.4)); ctx.lineTo(x2 - s * Math.cos(a + 0.4), y2 - s * Math.sin(a + 0.4)); ctx.fill();
    },
    dot(ctx, x, y, r, col) { ctx.fillStyle = col; ctx.beginPath(); ctx.arc(x, y, r, 0, TAU); ctx.fill(); },
    glow(ctx, x, y, r, col) {
      const g = ctx.createRadialGradient(x, y, 0, x, y, Math.max(1, r));
      g.addColorStop(0, col); g.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = g; ctx.beginPath(); ctx.arc(x, y, Math.max(1, r), 0, TAU); ctx.fill();
    },
    /* axes box for plots; returns mapping helpers */
    plot(ctx, x0, y0, w, h, xl, yl) {
      ctx.strokeStyle = "rgba(170,186,255,0.35)"; ctx.lineWidth = 1;
      ctx.beginPath(); ctx.moveTo(x0, y0); ctx.lineTo(x0, y0 + h); ctx.lineTo(x0 + w, y0 + h); ctx.stroke();
      ctx.strokeStyle = "rgba(170,186,255,0.07)";
      for (let i = 1; i < 5; i++) { ctx.beginPath(); ctx.moveTo(x0, y0 + h * i / 5); ctx.lineTo(x0 + w, y0 + h * i / 5); ctx.stroke(); }
      if (xl) H_.text(ctx, xl, x0 + w, y0 + h + 16, null, "right");
      if (yl) H_.text(ctx, yl, x0 + 4, y0 - 6);
    }
  };
  /* visible wavelength (nm) to rgb */
  G.wlRGB = function (w) {
    let r = 0, g = 0, b = 0;
    if (w >= 380 && w < 440) { r = -(w - 440) / 60; b = 1; }
    else if (w >= 440 && w < 490) { g = (w - 440) / 50; b = 1; }
    else if (w >= 490 && w < 510) { g = 1; b = -(w - 510) / 20; }
    else if (w >= 510 && w < 580) { r = (w - 510) / 70; g = 1; }
    else if (w >= 580 && w < 645) { r = 1; g = -(w - 645) / 65; }
    else if (w >= 645 && w <= 780) { r = 1; }
    let f = 1;
    if (w < 420) f = 0.3 + 0.7 * (w - 380) / 40; else if (w > 700) f = 0.3 + 0.7 * (780 - w) / 80;
    if (w < 380 || w > 780) f = 0;
    return [r, g, b].map(v => Math.round(255 * Math.pow(Math.max(0, v) * Math.max(0, f), 0.8)));
  };
  const { bg, text, arrow, dot, glow, plot } = H_;

  /* ================= CLASS 12 ================= */

  /* Ch 1: field lines of two charges */
  SIMS.fieldlines = {
    name: "Electric field lines", ratio: 0.55, mratio: 0.8,
    controls: [
      { k: "q1", label: "Left charge", min: -3, max: 3, v: 2, fmt: v => (v > 0 ? "+" : "") + v + " μC" },
      { k: "q2", label: "Right charge", min: -3, max: 3, v: -2, fmt: v => (v > 0 ? "+" : "") + v + " μC" }
    ],
    change(p, st) {
      const { W, H } = st;
      const ch = [{ x: W * 0.34, y: H / 2, q: p.q1 }, { x: W * 0.66, y: H / 2, q: p.q2 }].filter(c => c.q !== 0);
      st.ch = ch; st.lines = [];
      const hasPos = ch.some(c => c.q > 0);
      const E = (x, y) => {
        let ex = 0, ey = 0;
        for (const c of ch) { const dx = x - c.x, dy = y - c.y, r2 = dx * dx + dy * dy + 30, r = Math.sqrt(r2); ex += c.q * dx / (r2 * r); ey += c.q * dy / (r2 * r); }
        return [ex, ey];
      };
      for (const c of ch) {
        if (hasPos ? c.q < 0 : false) continue;
        const sign = c.q > 0 ? 1 : -1, n = 8 * Math.abs(c.q);
        for (let i = 0; i < n; i++) {
          const a = (i + 0.5) / n * TAU;
          let x = c.x + Math.cos(a) * 12, y = c.y + Math.sin(a) * 12;
          const pts = [[x, y]];
          for (let s = 0; s < 700; s++) {
            const [ex, ey] = E(x, y), m = Math.hypot(ex, ey) || 1;
            x += sign * 3 * ex / m; y += sign * 3 * ey / m;
            pts.push([x, y]);
            if (x < -20 || x > W + 20 || y < -20 || y > H + 20) break;
            if (ch.some(o => o !== c && Math.hypot(x - o.x, y - o.y) < 10)) break;
          }
          st.lines.push(pts);
        }
      }
    },
    draw(ctx, W, H, p, st, dt, t) {
      bg(ctx, W, H);
      if (!st.lines) return;
      ctx.lineWidth = 1.2;
      for (const L of st.lines) {
        ctx.strokeStyle = "rgba(169,198,255,0.45)"; ctx.beginPath();
        L.forEach(([x, y], i) => i ? ctx.lineTo(x, y) : ctx.moveTo(x, y)); ctx.stroke();
        const k = Math.floor((t * 40) % 30);
        for (let i = k; i < L.length; i += 30) dot(ctx, L[i][0], L[i][1], 1.6, "rgba(255,210,122,0.9)");
      }
      for (const c of st.ch) {
        glow(ctx, c.x, c.y, 34, c.q > 0 ? "rgba(255,111,94,0.5)" : "rgba(134,168,255,0.5)");
        dot(ctx, c.x, c.y, 11, c.q > 0 ? "#ff6f5e" : "#86a8ff");
        ctx.fillStyle = "#050814"; ctx.font = "700 14px Figtree, sans-serif"; ctx.textAlign = "center"; ctx.fillText(c.q > 0 ? "+" : "−", c.x, c.y + 5); ctx.textAlign = "left";
      }
      text(ctx, "Yellow dots flow the way a + test charge would be pushed", 12, H - 12);
    },
    info(p) {
      if (!p.q1 || !p.q2) return `<div><b>one charge</b><span>Field lines spread out like sunbeams from a single charge.</span></div>`;
      const like = p.q1 * p.q2 > 0;
      const a = Math.sqrt(Math.abs(p.q1)), b = Math.sqrt(Math.abs(p.q2));
      const F = 9e9 * Math.abs(p.q1 * p.q2) * 1e-12 / 0.01;
      return `<div><b>${like ? "Repel" : "Attract"}</b><span>${like ? "like charges push apart" : "opposite charges pull together"}</span></div>
        <div><b>${F.toFixed(0)} N</b><span>force if they were 10 cm apart (F = kq₁q₂/r²)</span></div>
        <div><b>${like ? (a / (a + b) * 100).toFixed(0) + "% of the gap" : "outside the pair"}</b><span>where the field is zero${like ? ", from the left charge" : ""}</span></div>`;
    }
  };

  /* Ch 2: parallel plate capacitor */
  SIMS.capacitor = {
    name: "Build a capacitor", ratio: 0.5, mratio: 0.75,
    controls: [
      { k: "A", label: "Plate area", min: 10, max: 400, v: 200, unit: "cm²" },
      { k: "d", label: "Gap", min: 0.5, max: 5, step: 0.1, v: 1, unit: "mm" },
      { k: "K", label: "Dielectric constant K", min: 1, max: 10, step: 0.5, v: 1 },
      { k: "V", label: "Battery voltage", min: 1, max: 100, v: 50, unit: "V" }
    ],
    draw(ctx, W, H, p, st, dt, t) {
      bg(ctx, W, H);
      const cx = W / 2, cy = H / 2, gap = 12 + p.d * 22, hgt = Math.min(H * 0.8, 40 + Math.sqrt(p.A) * 12);
      const xl = cx - gap / 2, xr = cx + gap / 2;
      if (p.K > 1) { ctx.fillStyle = `rgba(134,168,255,${0.08 + p.K * 0.025})`; ctx.fillRect(xl + 3, cy - hgt / 2, gap - 6, hgt); }
      const C = 8.85e-12 * p.K * p.A * 1e-4 / (p.d * 1e-3), Q = C * p.V;
      const lines = G.clamp(Math.round(p.V / p.d / 6), 2, 16);
      for (let i = 0; i < lines; i++) {
        const y = cy - hgt / 2 + (i + 0.5) * hgt / lines;
        arrow(ctx, xl + 6, y, xr - 6, y, "rgba(255,210,122,0.55)", 1.2);
      }
      ctx.fillStyle = "#ff6f5e"; ctx.fillRect(xl - 6, cy - hgt / 2, 6, hgt);
      ctx.fillStyle = "#86a8ff"; ctx.fillRect(xr, cy - hgt / 2, 6, hgt);
      const n = G.clamp(Math.round(Q * 1e9 / 2), 1, 30);
      ctx.font = "700 12px Figtree"; ctx.textAlign = "center";
      for (let i = 0; i < n; i++) {
        const y = cy - hgt / 2 + (i + 0.5) * hgt / n;
        ctx.fillStyle = "#ff6f5e"; ctx.fillText("+", xl - 16, y + 4);
        ctx.fillStyle = "#86a8ff"; ctx.fillText("−", xr + 16, y + 4);
      }
      ctx.textAlign = "left";
      text(ctx, `Charges shown: more signs = more stored charge`, 12, H - 12);
    },
    info(p) {
      const C = 8.85e-12 * p.K * p.A * 1e-4 / (p.d * 1e-3), Q = C * p.V, U = 0.5 * C * p.V * p.V;
      return `<div><b>${(C * 1e12).toFixed(1)} pF</b><span>C = Kε₀A/d</span></div>
        <div><b>${(Q * 1e9).toFixed(2)} nC</b><span>charge Q = CV</span></div>
        <div><b>${(U * 1e6).toFixed(2)} μJ</b><span>energy U = ½CV²</span></div>
        <div><b>${G.fmt(p.V / (p.d * 1e-3) / p.K)} V/m</b><span>field between plates</span></div>`;
    }
  };

  /* Ch 3: battery with internal resistance */
  SIMS.circuit = {
    name: "Battery and bulb circuit", ratio: 0.5, mratio: 0.8, live: false,
    controls: [
      { k: "E", label: "Battery emf ε", min: 1, max: 24, v: 12, unit: "V" },
      { k: "r", label: "Internal resistance r", min: 0, max: 5, step: 0.1, v: 0.5, unit: "Ω" },
      { k: "R", label: "Bulb resistance R", min: 0.5, max: 50, step: 0.5, v: 5.5, unit: "Ω" }
    ],
    draw(ctx, W, H, p, st, dt, t) {
      bg(ctx, W, H);
      const I = p.E / (p.R + p.r), P = I * I * p.R;
      const x0 = W * 0.18, x1 = W * 0.82, y0 = H * 0.2, y1 = H * 0.78;
      ctx.strokeStyle = "rgba(200,210,240,0.6)"; ctx.lineWidth = 3;
      ctx.strokeRect(x0, y0, x1 - x0, y1 - y0);
      // battery on left
      ctx.fillStyle = "#050814"; ctx.fillRect(x0 - 12, (y0 + y1) / 2 - 22, 24, 44);
      ctx.fillStyle = "#ffd27a"; ctx.fillRect(x0 - 14, (y0 + y1) / 2 - 10, 28, 4); ctx.fillRect(x0 - 8, (y0 + y1) / 2 + 6, 16, 4);
      text(ctx, "ε, r", x0 + 12, (y0 + y1) / 2 + 4);
      // bulb on right
      const bx = x1, by = (y0 + y1) / 2, glowR = 14 + Math.min(80, Math.sqrt(P) * 9);
      glow(ctx, bx, by, glowR, `rgba(255,220,140,${Math.min(0.95, 0.15 + P / 60)})`);
      dot(ctx, bx, by, 13, P > 0.2 ? "#ffe7a8" : "#555a70");
      // electrons flowing (conventional current opposite)
      const per = 2 * ((x1 - x0) + (y1 - y0)), speed = I * 18;
      for (let i = 0; i < 28; i++) {
        let s = ((i / 28) * per - t * speed) % per; if (s < 0) s += per;
        let x, y;
        if (s < x1 - x0) { x = x0 + s; y = y0; } else if ((s -= x1 - x0) < y1 - y0) { x = x1; y = y0 + s; }
        else if ((s -= y1 - y0) < x1 - x0) { x = x1 - s; y = y1; } else { s -= x1 - x0; x = x0; y = y1 - s; }
        dot(ctx, x, y, 2.6, "#86a8ff");
      }
      text(ctx, "Blue dots: electrons (their real drift is only about 0.1 mm/s)", 12, H - 12);
    },
    info(p) {
      const I = p.E / (p.R + p.r), V = p.E - I * p.r, P = I * I * p.R;
      return `<div><b>${I.toFixed(2)} A</b><span>current I = ε/(R + r)</span></div>
        <div><b>${V.toFixed(2)} V</b><span>terminal voltage V = ε − Ir</span></div>
        <div><b>${P.toFixed(1)} W</b><span>power to the bulb, I²R</span></div>
        <div><b>${Math.abs(p.R - p.r) < 0.3 ? "Maximum!" : "R = r"}</b><span>the bulb gets the most power when R equals r</span></div>`;
    }
  };

  /* Ch 4: charged particle in a magnetic field */
  const PART = { p: { n: "proton", m: 1.67e-27, q: 1.6e-19 }, e: { n: "electron", m: 9.11e-31, q: -1.6e-19 }, a: { n: "alpha particle", m: 6.64e-27, q: 3.2e-19 } };
  SIMS.lorentz = {
    name: "Charges spiral in a magnetic field", ratio: 0.55, mratio: 0.85,
    controls: [
      { k: "pt", label: "Particle", v: "p", options: [["p", "Proton"], ["e", "Electron"], ["a", "Alpha"]] },
      { k: "v", label: "Speed", min: 1, max: 10, step: 0.5, v: 3, unit: "× 10⁶ m/s" },
      { k: "B", label: "Magnetic field B", min: 0.1, max: 2, step: 0.1, v: 0.5, unit: "T" }
    ],
    init(p, st) { st.a = 0; },
    draw(ctx, W, H, p, st, dt, t) {
      bg(ctx, W, H);
      ctx.font = "12px Figtree"; ctx.fillStyle = "rgba(170,186,255,0.25)";
      for (let x = 20; x < W; x += 36) for (let y = 20; y < H; y += 36) ctx.fillText("×", x, y);
      const P = PART[p.pt], r = P.m * p.v * 1e6 / (Math.abs(P.q) * p.B);
      const cm = r * 100, px = G.clamp(cm * 3.2, 10, Math.min(W, H) * 0.42);
      const cx = W / 2, cy = H / 2;
      ctx.strokeStyle = "rgba(255,210,122,0.35)"; ctx.setLineDash([4, 5]); ctx.beginPath(); ctx.arc(cx, cy, px, 0, TAU); ctx.stroke(); ctx.setLineDash([]);
      st.a += dt * 2 * (P.q > 0 ? -1 : 1);
      const x = cx + Math.cos(st.a) * px, y = cy + Math.sin(st.a) * px;
      glow(ctx, x, y, 16, P.q > 0 ? "rgba(255,111,94,0.6)" : "rgba(134,168,255,0.6)");
      dot(ctx, x, y, 5, P.q > 0 ? "#ff6f5e" : "#86a8ff");
      const vx = -Math.sin(st.a) * (P.q > 0 ? -1 : 1), vy = Math.cos(st.a) * (P.q > 0 ? -1 : 1);
      arrow(ctx, x, y, x + vx * 36, y + vy * 36, "#74e0b5", 2);
      arrow(ctx, x, y, x + (cx - x) / px * 30, y + (cy - y) / px * 30, "#ffd27a", 2);
      text(ctx, "× = field into the screen · green: velocity · gold: magnetic force", 12, H - 12);
      if (cm * 3.2 < 10 || cm * 3.2 > Math.min(W, H) * 0.42) text(ctx, "circle size not to scale", 12, 20, "#ffa25e");
    },
    info(p) {
      const P = PART[p.pt], r = P.m * p.v * 1e6 / (Math.abs(P.q) * p.B), T = TAU * P.m / (Math.abs(P.q) * p.B);
      return `<div><b>${r >= 0.01 ? (r * 100).toFixed(2) + " cm" : (r * 1000).toFixed(3) + " mm"}</b><span>radius r = mv/qB for a ${P.n}</span></div>
        <div><b>${G.fmt(T)} s</b><span>time per circle, 2πm/qB. It does not depend on speed!</span></div>
        <div><b>0 J</b><span>work done by the magnetic force. Speed never changes</span></div>`;
    }
  };

  /* Ch 5: dia, para, ferro, superconductor in a uniform field (streamlines) */
  SIMS.magmat = {
    name: "Materials in a magnetic field", ratio: 0.55, mratio: 0.8,
    controls: [{ k: "m", label: "Material", v: "para", options: [["dia", "Diamagnetic"], ["para", "Paramagnetic"], ["ferro", "Ferromagnetic"], ["sc", "Superconductor"]] }],
    change(p, st) {
      const mu = { dia: 0.6, para: 1.8, ferro: 40, sc: 0.001 }[p.m];
      const k = (mu - 1) / (mu + 1), { W, H } = st, a = Math.min(W, H) * 0.18, cx = W / 2, cy = H / 2;
      const B = (x, y) => {
        const dx = x - cx, dy = y - cy, r2 = dx * dx + dy * dy;
        if (r2 < a * a) return [1 + k, 0];
        const f = k * a * a / (r2 * r2);
        return [1 + f * (dx * dx - dy * dy), f * 2 * dx * dy];
      };
      st.lines = []; st.a = a;
      for (let i = -9; i <= 9; i++) {
        let x = 0, y = cy + i * H / 19; const pts = [[x, y]];
        for (let s = 0; s < 900 && x < W; s++) { const [bx, by] = B(x, y), m = Math.hypot(bx, by) || 1; x += 2 * bx / m; y += 2 * by / m; pts.push([x, y]); }
        st.lines.push(pts);
      }
    },
    draw(ctx, W, H, p, st) {
      bg(ctx, W, H); if (!st.lines) return;
      const col = { dia: "#86a8ff", para: "#ffd27a", ferro: "#ff6f5e", sc: "#74e0b5" }[p.m];
      ctx.fillStyle = col + "33"; ctx.strokeStyle = col; ctx.lineWidth = 2;
      ctx.beginPath(); ctx.arc(W / 2, H / 2, st.a, 0, TAU); ctx.fill(); ctx.stroke();
      ctx.strokeStyle = "rgba(169,198,255,0.6)"; ctx.lineWidth = 1.2;
      for (const L of st.lines) { ctx.beginPath(); L.forEach(([x, y], i) => i ? ctx.lineTo(x, y) : ctx.moveTo(x, y)); ctx.stroke(); }
      text(ctx, "Effect exaggerated so you can see it (except ferro and superconductor)", 12, H - 12);
    },
    info(p) {
      const d = {
        dia: ["χ slightly negative", "Field lines spread out. The material is weakly pushed away. Water, bismuth and even you are diamagnetic. A strong enough magnet has levitated a live frog!"],
        para: ["χ slightly positive", "Field lines crowd in a little. Weakly attracted. Aluminium and oxygen are paramagnetic."],
        ferro: ["χ huge (hundreds to thousands)", "Lines rush into it. Strongly attracted and can become a permanent magnet. Iron, nickel, cobalt. Heat iron above 770°C (its Curie temperature) and this vanishes."],
        sc: ["χ = −1", "Perfect diamagnet: the field is pushed out completely (Meissner effect). This is how magnets float above superconductors."]
      }[p.m];
      return `<div><b>${d[0]}</b><span>magnetic susceptibility</span></div><div style="grid-column:1/-1"><span>${d[1]}</span></div>`;
    }
  };

  /* Ch 6: magnet through a coil */
  SIMS.emi = {
    name: "Faraday's magnet and coil", ratio: 0.55, mratio: 0.85, live: true,
    controls: [
      { k: "s", label: "Magnet speed", min: 0, max: 3, step: 0.1, v: 1 },
      { k: "N", label: "Turns in the coil", min: 5, max: 50, v: 20 }
    ],
    init(p, st) { st.ph = 0; st.hist = []; st.emf = 0; },
    draw(ctx, W, H, p, st, dt) {
      bg(ctx, W, H);
      st.ph += dt * p.s * 1.6;
      const cx = W / 2, cy = H * 0.34, amp = W * 0.3;
      const pos = Math.sin(st.ph), vel = Math.cos(st.ph) * p.s;
      const mx = cx + pos * amp;
      const flux = x => Math.exp(-(x * x) / 0.08);
      const dphi = -2 * pos / 0.08 * flux(pos) * vel;
      st.emf = -p.N * dphi * 0.02;
      st.hist.push(st.emf); if (st.hist.length > 240) st.hist.shift();
      // coil
      ctx.strokeStyle = "#ffa25e"; ctx.lineWidth = 2;
      for (let i = 0; i < Math.min(p.N, 24); i++) { const x = cx - 40 + i * 80 / Math.min(p.N, 24); ctx.beginPath(); ctx.ellipse(x, cy, 6, 34, 0, 0, TAU); ctx.stroke(); }
      // magnet
      ctx.fillStyle = "#ff6f5e"; ctx.fillRect(mx - 50, cy - 12, 50, 24);
      ctx.fillStyle = "#86a8ff"; ctx.fillRect(mx, cy - 12, 50, 24);
      ctx.fillStyle = "#050814"; ctx.font = "700 13px Figtree"; ctx.fillText("N", mx - 30, cy + 5); ctx.fillText("S", mx + 20, cy + 5);
      // galvanometer
      const gx = cx, gy = H * 0.66, R = 34;
      ctx.strokeStyle = "rgba(200,210,240,0.6)"; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.arc(gx, gy, R, Math.PI, 0); ctx.stroke();
      const ang = -Math.PI / 2 + G.clamp(st.emf / 3, -1.3, 1.3);
      arrow(ctx, gx, gy, gx + Math.cos(ang) * (R - 4), gy + Math.sin(ang) * (R - 4), "#ffd27a", 2);
      text(ctx, "G", gx - 4, gy + 16);
      // emf graph
      const y0 = H * 0.86, w = W - 40;
      ctx.strokeStyle = "rgba(170,186,255,0.2)"; ctx.beginPath(); ctx.moveTo(20, y0); ctx.lineTo(20 + w, y0); ctx.stroke();
      ctx.strokeStyle = "#74e0b5"; ctx.beginPath();
      st.hist.forEach((e, i) => { const x = 20 + i / 240 * w, y = y0 - G.clamp(e, -6, 6) * 4; i ? ctx.lineTo(x, y) : ctx.moveTo(x, y); }); ctx.stroke();
      text(ctx, "induced emf over time", 20, H - 6);
    },
    info(p, st) {
      return `<div><b>${Math.abs(st.emf || 0).toFixed(2)}</b><span>induced emf (arbitrary units)</span></div>
        <div style="grid-column:span 2"><span>No motion, no current. Faster magnet or more turns, bigger kick: ε = −N dΦ/dt. The needle flips direction as the magnet enters and leaves. That flip is Lenz's law: the current always fights the change.</span></div>`;
    }
  };

  /* Ch 7: series LCR, impedance vs frequency */
  SIMS.ac = {
    name: "Tune an LCR circuit", ratio: 0.55, mratio: 0.85,
    controls: [
      { k: "R", label: "Resistance R", min: 5, max: 200, v: 20, unit: "Ω" },
      { k: "L", label: "Inductance L", min: 10, max: 500, v: 100, unit: "mH" },
      { k: "C", label: "Capacitance C", min: 5, max: 200, v: 50, unit: "μF" },
      { k: "f", label: "Frequency f", min: 10, max: 300, v: 50, unit: "Hz" }
    ],
    draw(ctx, W, H, p, st, dt, t) {
      bg(ctx, W, H);
      const L = p.L * 1e-3, C = p.C * 1e-6;
      const Z = f => { const w = TAU * f; return Math.hypot(p.R, w * L - 1 / (w * C)); };
      const x0 = 50, y0 = 26, w = W - 70, h = H * 0.5;
      plot(ctx, x0, y0, w, h, "frequency →", "current (V = 230 V)");
      const Imax = 230 / p.R;
      ctx.strokeStyle = "#ffd27a"; ctx.lineWidth = 2; ctx.beginPath();
      for (let i = 0; i <= 200; i++) { const f = 10 + 290 * i / 200, I = 230 / Z(f); const x = x0 + w * i / 200, y = y0 + h - h * I / Imax; i ? ctx.lineTo(x, y) : ctx.moveTo(x, y); }
      ctx.stroke();
      const f0 = 1 / (TAU * Math.sqrt(L * C));
      if (f0 >= 10 && f0 <= 300) { const x = x0 + w * (f0 - 10) / 290; ctx.strokeStyle = "rgba(116,224,181,0.6)"; ctx.setLineDash([3, 4]); ctx.beginPath(); ctx.moveTo(x, y0); ctx.lineTo(x, y0 + h); ctx.stroke(); ctx.setLineDash([]); text(ctx, "resonance", x + 4, y0 + 12, "#74e0b5"); }
      const xm = x0 + w * (p.f - 10) / 290, ym = y0 + h - h * (230 / Z(p.f)) / Imax;
      dot(ctx, xm, ym, 5, "#ef7aa0");
      // waves: voltage and current with phase lag
      const wv = TAU * p.f, phi = Math.atan2(wv * L - 1 / (wv * C), p.R);
      const yb = H * 0.82, A = H * 0.1;
      ctx.lineWidth = 1.6;
      [["#86a8ff", 0], ["#ef7aa0", -phi]].forEach(([c, ph]) => {
        ctx.strokeStyle = c; ctx.beginPath();
        for (let i = 0; i <= 200; i++) { const x = 20 + (W - 40) * i / 200, y = yb - A * (c === "#ef7aa0" ? 0.7 : 1) * Math.sin(i / 200 * TAU * 2 - t * 2 + ph); i ? ctx.lineTo(x, y) : ctx.moveTo(x, y); }
        ctx.stroke();
      });
      text(ctx, "blue: voltage · pink: current", 20, H - 6);
    },
    info(p) {
      const L = p.L * 1e-3, C = p.C * 1e-6, w = TAU * p.f;
      const XL = w * L, XC = 1 / (w * C), Z = Math.hypot(p.R, XL - XC), f0 = 1 / (TAU * Math.sqrt(L * C));
      return `<div><b>${XL.toFixed(1)} Ω</b><span>X<sub>L</sub> = ωL</span></div><div><b>${XC.toFixed(1)} Ω</b><span>X<sub>C</sub> = 1/ωC</span></div>
        <div><b>${Z.toFixed(1)} Ω</b><span>impedance Z</span></div><div><b>${f0.toFixed(1)} Hz</b><span>resonance f₀ = 1/2π√LC</span></div>
        <div><b>${(p.R / Z).toFixed(2)}</b><span>power factor cos φ</span></div>`;
    }
  };

  /* Ch 8: electromagnetic spectrum explorer */
  const BANDS = [
    { n: "Gamma rays", lo: -14, hi: -11, src: "Exploding stars, pulsars, gamma-ray bursts", ground: "No. The atmosphere blocks them (lucky for us)", scope: "NASA's Fermi telescope in orbit", col: "#b58cff" },
    { n: "X-rays", lo: -11, hi: -8, src: "Gas swirling into black holes, the Sun's corona", ground: "No. Only from space", scope: "Chandra, and India's AstroSat", col: "#9cc3ff" },
    { n: "Ultraviolet", lo: -8, hi: Math.log10(4e-7), src: "Hot young stars, the Sun", ground: "Mostly blocked by ozone", scope: "Hubble, AstroSat's UVIT, Aditya-L1's SUIT", col: "#c9b6ff" },
    { n: "Visible light", lo: Math.log10(4e-7), hi: Math.log10(7e-7), src: "Stars, the Sun, your torch", ground: "Yes, through the 'optical window'", scope: "Your eyes, Hubble, Vera Rubin Observatory", col: "#ffffff" },
    { n: "Infrared", lo: Math.log10(7e-7), hi: -3, src: "Warm dust, baby stars, the very first galaxies (stretched by expansion)", ground: "Only partly. Water vapour absorbs a lot", scope: "James Webb Space Telescope", col: "#ff8a6b" },
    { n: "Microwaves", lo: -3, hi: -1, src: "The Cosmic Microwave Background, the Big Bang's afterglow", ground: "Partly", scope: "Planck satellite", col: "#ffb86b" },
    { n: "Radio waves", lo: -1, hi: 2, src: "Pulsars, cold hydrogen (the 21 cm line), black hole jets", ground: "Yes, the 'radio window'", scope: "GMRT near Pune, FAST in China", col: "#ffd27a" }
  ];
  SIMS.emspec = {
    name: "Electromagnetic spectrum explorer", ratio: 0.42, mratio: 0.7,
    controls: [{ k: "lg", label: "Wavelength", min: -13, max: 1.5, step: 0.05, v: Math.log10(5.5e-7), fmt: v => { const m = Math.pow(10, v); return m >= 1 ? m.toFixed(1) + " m" : m >= 1e-3 ? (m * 1e3).toFixed(1) + " mm" : m >= 1e-6 ? (m * 1e6).toFixed(1) + " μm" : m >= 1e-9 ? (m * 1e9).toFixed(0) + " nm" : (m * 1e12).toFixed(2) + " pm"; } }],
    draw(ctx, W, H, p, st, dt, t) {
      bg(ctx, W, H);
      const x0 = 16, w = W - 32, y = H * 0.62, hh = 26;
      const X = lg => x0 + w * (lg + 14) / 16;
      BANDS.forEach(b => {
        const a = Math.max(X(b.lo), x0), c = Math.min(X(b.hi), x0 + w);
        if (b.n === "Visible light") {
          const g = ctx.createLinearGradient(a, 0, c, 0);
          for (let i = 0; i <= 6; i++) { const wl = 400 + 300 * i / 6; g.addColorStop(i / 6, G.rgb(G.wlRGB(wl))); }
          ctx.fillStyle = g;
        } else ctx.fillStyle = b.col + "44";
        ctx.fillRect(a, y, c - a, hh);
      });
      const band = BANDS.find(b => p.lg >= b.lo && p.lg < b.hi) || BANDS[BANDS.length - 1];
      const xm = X(p.lg);
      ctx.strokeStyle = "#fff"; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(xm, y - 8); ctx.lineTo(xm, y + hh + 8); ctx.stroke();
      text(ctx, "← short wavelength, high energy", x0, y + hh + 22); text(ctx, "long wavelength, low energy →", x0 + w, y + hh + 22, null, "right");
      // wave drawing
      const wlnm = Math.pow(10, p.lg) * 1e9;
      const col = band.n === "Visible light" ? G.rgb(G.wlRGB(wlnm)) : band.col;
      const pxw = 10 + 150 * (p.lg + 14) / 16;
      ctx.strokeStyle = col; ctx.lineWidth = 2; ctx.beginPath();
      for (let x = 0; x <= W; x += 2) { const yy = H * 0.28 + Math.sin((x - t * 60) / pxw * TAU) * H * 0.12; x ? ctx.lineTo(x, yy) : ctx.moveTo(x, yy); }
      ctx.stroke();
      text(ctx, "wave drawn wider for longer wavelengths (not to scale)", 16, 18);
    },
    info(p) {
      const band = BANDS.find(b => p.lg >= b.lo && p.lg < b.hi) || BANDS[BANDS.length - 1];
      const lam = Math.pow(10, p.lg), f = 3e8 / lam, E = 1240e-9 / lam;
      G.flag("band-" + band.n);
      return `<div><b>${band.n}</b><span>band</span></div><div><b>${G.fmt(f)} Hz</b><span>frequency f = c/λ</span></div>
        <div><b>${G.fmt(E)} eV</b><span>energy of one photon</span></div>
        <div style="grid-column:1/-1"><span><b style="display:inline;font-size:inherit;font-family:inherit">Made by:</b> ${band.src}. <b style="display:inline;font-size:inherit;font-family:inherit">Reaches the ground?</b> ${band.ground}. <b style="display:inline;font-size:inherit;font-family:inherit">Telescope:</b> ${band.scope}.</span></div>`;
    }
  };

  /* Ch 9: convex/concave lens ray diagram */
  SIMS.lens = {
    name: "Lens ray diagram", ratio: 0.5, mratio: 0.8,
    controls: [
      { k: "type", label: "Lens", v: "convex", options: [["convex", "Convex"], ["concave", "Concave"]] },
      { k: "f", label: "Focal length", min: 5, max: 25, v: 15, unit: "cm" },
      { k: "u", label: "Object distance", min: 3, max: 60, v: 30, unit: "cm" }
    ],
    draw(ctx, W, H, p, st) {
      bg(ctx, W, H);
      const cx = W / 2, cy = H * 0.55, s = (W / 2 - 20) / 65, oh = H * 0.18;
      const f = p.type === "convex" ? p.f : -p.f, u = -p.u;
      const v = 1 / (1 / f + 1 / u), m = v / u;
      ctx.strokeStyle = "rgba(170,186,255,0.3)"; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(0, cy); ctx.lineTo(W, cy); ctx.stroke();
      ctx.strokeStyle = "#9cc3ff"; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(cx, cy - H * 0.4); ctx.lineTo(cx, cy + H * 0.38); ctx.stroke();
      [-1, 1].forEach(d => {
        const y = d < 0 ? cy - H * 0.4 : cy + H * 0.38;
        ctx.beginPath(); if (p.type === "convex") { ctx.moveTo(cx - 8, y + 8 * -d); ctx.lineTo(cx, y); ctx.lineTo(cx + 8, y + 8 * -d); } else { ctx.moveTo(cx - 8, y - 8 * -d); ctx.lineTo(cx, y); ctx.lineTo(cx + 8, y - 8 * -d); } ctx.stroke();
      });
      [[f, "F"], [-f, "F"], [2 * f, "2F"], [-2 * f, "2F"]].forEach(([x, l]) => { const X = cx + x * s; if (X > 0 && X < W) { dot(ctx, X, cy, 3, "#ffd27a"); text(ctx, l, X - 5, cy + 16, "#ffd27a"); } });
      const ox = cx + u * s, oy = cy - oh;
      arrow(ctx, ox, cy, ox, oy, "#74e0b5", 3);
      const ix = cx + v * s, iy = cy - oh * m, real = v > 0;
      ctx.lineWidth = 1.4;
      const ray = pts => { ctx.strokeStyle = "rgba(255,210,122,0.85)"; ctx.beginPath(); pts.forEach(([x, y], i) => i ? ctx.lineTo(x, y) : ctx.moveTo(x, y)); ctx.stroke(); };
      const ext = (x1, y1, x2, y2, toX) => [toX, y1 + (y2 - y1) * (toX - x1) / (x2 - x1)];
      ray([[ox, oy], [cx, oy], ext(cx, oy, cx + f * s, cy, W)]);
      ray([[ox, oy], ext(ox, oy, cx, cy, W)]);
      if (!real && isFinite(v)) {
        ctx.setLineDash([4, 4]); ctx.strokeStyle = "rgba(255,210,122,0.45)";
        ctx.beginPath(); ctx.moveTo(cx, oy); ctx.lineTo(ix, iy); ctx.moveTo(cx, cy); ctx.lineTo(ix, iy); ctx.stroke();
        ctx.setLineDash([]);
      }
      if (isFinite(v) && Math.abs(v) < 400) {
        if (real) arrow(ctx, ix, cy, ix, iy, "#ef7aa0", 3);
        else { ctx.setLineDash([5, 4]); arrow(ctx, ix, cy, ix, iy, "#ef7aa0", 2); ctx.setLineDash([]); }
      }
      text(ctx, "green: object · pink: image (dashed if virtual)", 12, H - 10);
    },
    info(p) {
      const f = p.type === "convex" ? p.f : -p.f, u = -p.u;
      if (Math.abs(1 / f + 1 / u) < 1e-4) return `<div style="grid-column:1/-1"><b>Image at infinity</b><span>Object exactly at the focus: rays come out parallel. This is how a searchlight works.</span></div>`;
      const v = 1 / (1 / f + 1 / u), m = v / u;
      return `<div><b>${v.toFixed(1)} cm</b><span>image distance v (1/v − 1/u = 1/f)</span></div>
        <div><b>${m.toFixed(2)}×</b><span>magnification m = v/u</span></div>
        <div><b>${v > 0 ? "Real, inverted" : "Virtual, upright"}</b><span>${Math.abs(m) > 1 ? "magnified" : Math.abs(m) < 1 ? "diminished" : "same size"}</span></div>
        <div><b>${(100 / f).toFixed(1)} D</b><span>power P = 1/f (f in metres)</span></div>`;
    }
  };

  /* Ch 10: Young's double slit */
  SIMS.ydse = {
    name: "Young's double slit", ratio: 0.5, mratio: 0.8,
    controls: [
      { k: "lam", label: "Wavelength λ", min: 400, max: 700, v: 600, unit: "nm" },
      { k: "d", label: "Slit separation d", min: 0.1, max: 1, step: 0.05, v: 0.5, unit: "mm" },
      { k: "D", label: "Screen distance D", min: 0.5, max: 2, step: 0.1, v: 1, unit: "m" }
    ],
    draw(ctx, W, H, p, st, dt, t) {
      bg(ctx, W, H);
      const col = G.wlRGB(p.lam), sx = W * 0.12, s1 = H / 2 - 10 - p.d * 30, s2 = H / 2 + 10 + p.d * 30, scr = W * 0.72;
      ctx.fillStyle = "#3a4264"; ctx.fillRect(sx - 3, 0, 6, H); ctx.fillStyle = "#050814"; ctx.fillRect(sx - 3, s1 - 3, 6, 6); ctx.fillRect(sx - 3, s2 - 3, 6, 6);
      const wl = 10 + (p.lam - 400) / 30;
      ctx.lineWidth = 1;
      [s1, s2].forEach(sy => { for (let r = (t * 30) % wl; r < scr - sx; r += wl) { ctx.strokeStyle = G.rgb(col, 0.25 * (1 - r / (scr - sx))); ctx.beginPath(); ctx.arc(sx, sy, r, -1.2, 1.2); ctx.stroke(); } });
      const beta = p.lam * 1e-9 * p.D / (p.d * 1e-3);
      const pxPerMm = H / 16;
      for (let y = 0; y < H; y++) {
        const ymm = (y - H / 2) / pxPerMm, I = Math.pow(Math.cos(Math.PI * ymm / (beta * 1e3)), 2);
        ctx.fillStyle = G.rgb(col, I); ctx.fillRect(scr, y, 18, 1);
        ctx.fillStyle = G.rgb(col, 0.8); ctx.fillRect(scr + 26 + I * (W - scr - 40), y, 1.5, 1.5);
      }
      text(ctx, "screen", scr - 2, 14); text(ctx, "brightness", scr + 26, 14);
    },
    info(p) {
      const beta = p.lam * 1e-9 * p.D / (p.d * 1e-3);
      return `<div><b>${(beta * 1e3).toFixed(2)} mm</b><span>fringe width β = λD/d</span></div>
        <div style="grid-column:span 2"><span>Bright bands: the two waves arrive in step (crest on crest). Dark bands: crest meets trough and they cancel. Light + light can make darkness!</span></div>`;
    }
  };

  /* Ch 11: photoelectric effect */
  const METALS = { Cs: ["Caesium", 2.1], Na: ["Sodium", 2.3], Zn: ["Zinc", 4.3], Cu: ["Copper", 4.7] };
  SIMS.photo = {
    name: "Photoelectric effect", ratio: 0.5, mratio: 0.8,
    controls: [
      { k: "metal", label: "Metal", v: "Na", options: Object.entries(METALS).map(([k, v]) => [k, v[0]]) },
      { k: "lam", label: "Light wavelength", min: 150, max: 700, v: 400, unit: "nm" },
      { k: "I", label: "Brightness (intensity)", min: 1, max: 10, v: 5 }
    ],
    init(p, st) { st.ph = []; st.el = []; st.acc = 0; },
    draw(ctx, W, H, p, st, dt, t) {
      bg(ctx, W, H);
      const E = 1240 / p.lam, phi = METALS[p.metal][1], K = E - phi;
      const col = p.lam < 380 ? [200, 170, 255] : G.wlRGB(p.lam);
      const px = W * 0.62;
      ctx.fillStyle = "#8b8fa8"; ctx.fillRect(px, H * 0.15, 16, H * 0.7);
      text(ctx, METALS[p.metal][0], px - 4, H * 0.12);
      st.acc += dt * p.I * 3;
      while (st.acc > 1) { st.acc--; st.ph.push({ x: 0, y: H * 0.2 + Math.random() * H * 0.6 }); }
      ctx.strokeStyle = G.rgb(col, 0.9); ctx.lineWidth = 1.6;
      st.ph = st.ph.filter(ph => {
        ph.x += dt * 260;
        ctx.beginPath(); for (let i = 0; i < 24; i++) { const x = ph.x - i * 1.5, y = ph.y + Math.sin((x) / (p.lam / 60)) * 5; i ? ctx.lineTo(x, y) : ctx.moveTo(x, y); } ctx.stroke();
        if (ph.x >= px) { if (K > 0) st.el.push({ x: px - 2, y: ph.y, v: 40 + Math.sqrt(K) * 90, a: Math.PI + (Math.random() - 0.5) * 1.4 }); return false; }
        return true;
      });
      st.el = st.el.filter(e => { e.x += Math.cos(e.a) * e.v * dt; e.y += Math.sin(e.a) * e.v * dt; dot(ctx, e.x, e.y, 3, "#86a8ff"); return e.x > 0 && e.y > 0 && e.y < H; });
      text(ctx, K > 0 ? "Blue dots: photoelectrons flying out" : "Photons bounce off: no electrons, however bright!", 12, H - 10, K > 0 ? null : "#ffa25e");
    },
    info(p) {
      const E = 1240 / p.lam, phi = METALS[p.metal][1], K = E - phi;
      return `<div><b>${E.toFixed(2)} eV</b><span>photon energy E = hc/λ</span></div><div><b>${phi} eV</b><span>work function φ</span></div>
        <div><b>${K > 0 ? K.toFixed(2) + " eV" : "none"}</b><span>max kinetic energy = E − φ</span></div>
        <div><b>${K > 0 ? K.toFixed(2) + " V" : "–"}</b><span>stopping potential</span></div>
        <div style="grid-column:1/-1"><span>Brightness changes how MANY electrons come out, never how FAST. Only the colour (frequency) sets their energy. Einstein won his Nobel Prize for explaining this.</span></div>`;
    }
  };

  /* Ch 12: Bohr model hydrogen transitions */
  SIMS.bohr = {
    name: "Hydrogen atom: make light", ratio: 0.55, mratio: 0.9,
    controls: [
      { k: "from", label: "Electron starts in level", min: 2, max: 6, v: 3 },
      { k: "to", label: "Drops to level", min: 1, max: 5, v: 2 }
    ],
    buttons: [{ label: "Emit photon", primary: true, fn: (p, st) => { st.jump = 0; } }],
    init(p, st) { st.jump = 0; },
    draw(ctx, W, H, p, st, dt, t) {
      bg(ctx, W, H);
      const to = Math.min(p.to, p.from - 1), cx = W * 0.35, cy = H / 2, R = n => 12 + n * (Math.min(W * 0.3, H * 0.45) - 12) / 6;
      for (let n = 1; n <= 6; n++) { ctx.strokeStyle = n === p.from || n === to ? "rgba(255,210,122,0.55)" : "rgba(170,186,255,0.18)"; ctx.lineWidth = 1; ctx.beginPath(); ctx.arc(cx, cy, R(n), 0, TAU); ctx.stroke(); text(ctx, "n=" + n, cx + R(n) - 12, cy - 3, "rgba(170,186,255,0.5)"); }
      glow(ctx, cx, cy, 14, "rgba(255,111,94,0.8)"); dot(ctx, cx, cy, 5, "#ff6f5e");
      st.jump = Math.min(2.5, st.jump + dt);
      const k = G.clamp(st.jump / 0.6, 0, 1), rr = R(p.from) + (R(to) - R(p.from)) * k;
      const a = t * 1.5;
      dot(ctx, cx + Math.cos(a) * rr, cy + Math.sin(a) * rr, 4.5, "#86a8ff");
      const dE = 13.6 * (1 / (to * to) - 1 / (p.from * p.from)), lam = 1240 / dE;
      const col = lam >= 380 && lam <= 780 ? G.wlRGB(lam) : lam < 380 ? [190, 160, 255] : [255, 120, 90];
      if (st.jump > 0.6 && st.jump < 2.5) {
        const d = (st.jump - 0.6) * 260;
        ctx.strokeStyle = G.rgb(col); ctx.lineWidth = 2; ctx.beginPath();
        for (let i = 0; i < 60; i++) { const x = cx + R(to) + d - i * 2, y = cy + Math.sin(i / 3) * 7; i ? ctx.lineTo(x, y) : ctx.moveTo(x, y); }
        ctx.stroke();
      }
      // spectrum strip
      const x0 = W * 0.62, w = W * 0.34, y = H * 0.75;
      for (let i = 0; i < w; i++) { ctx.fillStyle = G.rgb(G.wlRGB(380 + 400 * i / w), 0.25); ctx.fillRect(x0 + i, y, 1, 22); }
      if (lam >= 380 && lam <= 780) { const x = x0 + w * (lam - 380) / 400; ctx.fillStyle = G.rgb(col); ctx.fillRect(x - 1.5, y - 6, 3, 34); }
      text(ctx, "visible spectrum", x0, y + 40);
    },
    info(p) {
      const to = Math.min(p.to, p.from - 1), dE = 13.6 * (1 / (to * to) - 1 / (p.from * p.from)), lam = 1240 / dE;
      const series = ["", "Lyman (ultraviolet)", "Balmer (visible)", "Paschen (infrared)", "Brackett (infrared)", "Pfund (infrared)"][to];
      const special = p.from === 3 && to === 2 ? " This red line, H-alpha, is why glowing nebulae look pink in photos!" : "";
      return `<div><b>${p.from} → ${to}</b><span>jump</span></div><div><b>${dE.toFixed(2)} eV</b><span>energy of the photon</span></div>
        <div><b>${lam.toFixed(0)} nm</b><span>wavelength λ = 1240/E</span></div><div><b>${series}</b><span>series</span></div>
        <div style="grid-column:1/-1"><span>Eₙ = −13.6/n² eV. Each jump gives a fixed colour, like a fingerprint. That is how we know what distant stars are made of.${special}</span></div>`;
    }
  };

  /* Ch 13: binding energy per nucleon curve */
  const NUC = [["²H", 2, 1.11], ["⁴He", 4, 7.07], ["⁶Li", 6, 5.33], ["¹²C", 12, 7.68], ["¹⁶O", 16, 7.98], ["²⁰Ne", 20, 8.03], ["⁵⁶Fe", 56, 8.79], ["¹⁰⁷Ag", 107, 8.55], ["¹⁹⁷Au", 197, 7.92], ["²³⁵U", 235, 7.59]];
  SIMS.binding = {
    name: "The binding energy curve", ratio: 0.55, mratio: 0.85,
    controls: [{ k: "i", label: "Nucleus", v: 6, options: NUC.map((n, i) => [i, n[0]]) }],
    draw(ctx, W, H, p, st) {
      bg(ctx, W, H);
      const x0 = 46, y0 = 24, w = W - 66, h = H - 70;
      plot(ctx, x0, y0, w, h, "mass number A →", "binding energy per nucleon (MeV)");
      const X = A => x0 + w * A / 240, Y = b => y0 + h - h * b / 9.5;
      const sem = A => { const Z = A / (2 + 0.0154 * Math.pow(A, 2 / 3)); const B = 15.8 * A - 18.3 * Math.pow(A, 2 / 3) - 0.714 * Z * Z / Math.pow(A, 1 / 3) - 23.2 * Math.pow(A - 2 * Z, 2) / A; return B / A; };
      ctx.strokeStyle = "#ffd27a"; ctx.lineWidth = 2; ctx.beginPath();
      ctx.moveTo(X(2), Y(1.11)); ctx.lineTo(X(4), Y(7.07)); ctx.lineTo(X(6), Y(5.33)); ctx.lineTo(X(12), Y(7.68));
      for (let A = 14; A <= 240; A += 2) ctx.lineTo(X(A), Y(sem(A)));
      ctx.stroke();
      arrow(ctx, X(10), Y(6.2), X(46), Y(7.9), "rgba(116,224,181,0.9)", 2); text(ctx, "fusion", X(12), Y(6.2) + 16, "#74e0b5");
      arrow(ctx, X(225), Y(7.0), X(130), Y(7.9), "rgba(239,122,160,0.9)", 2); text(ctx, "fission", X(170), Y(7.0) + 16, "#ef7aa0");
      NUC.forEach((n, i) => { dot(ctx, X(n[1]), Y(n[2]), i === p.i ? 6 : 3.5, i === p.i ? "#fff" : "#86a8ff"); if (i === p.i) text(ctx, n[0], X(n[1]) + 8, Y(n[2]) - 8, "#fff"); });
      for (let b = 0; b <= 9; b += 3) text(ctx, String(b), x0 - 14, Y(b) + 4);
    },
    info(p) {
      const n = NUC[p.i];
      const note = n[1] === 56 ? "Iron sits near the very top. Nothing can gain energy by fusing or splitting it. That is why a massive star dies when its core fills with iron." : n[1] < 56 ? "Joining light nuclei (fusion) climbs up the curve and releases energy. This powers the Sun." : "Splitting heavy nuclei (fission) climbs up the curve and releases energy. This powers nuclear reactors.";
      return `<div><b>${n[0]}</b><span>nucleus (A = ${n[1]})</span></div><div><b>${n[2]} MeV</b><span>binding energy per nucleon</span></div><div style="grid-column:1/-1"><span>${note}</span></div>`;
    }
  };

  /* Ch 14: p-n junction diode I-V curve */
  SIMS.diode = {
    name: "p-n junction diode", ratio: 0.55, mratio: 0.9,
    controls: [{ k: "V", label: "Applied voltage", min: -5, max: 0.85, step: 0.01, v: 0.6, unit: "V" }],
    draw(ctx, W, H, p, st, dt, t) {
      bg(ctx, W, H);
      const I = V => 1e-14 * (Math.exp(V / 0.0259) - 1) * 1e3;
      // junction picture
      const jx = W * 0.25, jy = H * 0.3, jw = W * 0.4, jh = H * 0.22;
      const dep = G.clamp(20 * Math.sqrt(Math.max(0.05, 0.7 - p.V)), 2, jw * 0.4);
      ctx.fillStyle = "rgba(255,111,94,0.18)"; ctx.fillRect(jx - jw / 2, jy - jh / 2, jw / 2 - dep / 2, jh);
      ctx.fillStyle = "rgba(134,168,255,0.18)"; ctx.fillRect(jx + dep / 2, jy - jh / 2, jw / 2 - dep / 2, jh);
      ctx.fillStyle = "rgba(255,255,255,0.05)"; ctx.fillRect(jx - dep / 2, jy - jh / 2, dep, jh);
      text(ctx, "p (holes)", jx - jw / 2 + 4, jy - jh / 2 - 6, "#ff6f5e"); text(ctx, "n (electrons)", jx + jw / 2, jy - jh / 2 - 6, "#86a8ff", "right");
      text(ctx, "depletion layer", jx, jy + jh / 2 + 14, null, "center");
      const flow = I(p.V) > 0.5;
      for (let i = 0; i < 10; i++) {
        const s = (t * (flow ? 50 : 3) + i * 13) % (jw / 2 - dep / 2);
        dot(ctx, jx + jw / 2 - s, jy - jh / 3 + (i % 4) * jh / 5, 2.5, "#86a8ff");
        dot(ctx, jx - jw / 2 + s, jy - jh / 3 + ((i + 2) % 4) * jh / 5, 2.5, "#ff6f5e");
      }
      // I-V plot
      const x0 = W * 0.52, y0 = 20, w = W * 0.45, h = H * 0.62;
      const X = V => x0 + w * (V + 5) / 5.9, Y = i => y0 + h * 0.85 - h * 0.8 * G.clamp(i, -2, 50) / 50;
      ctx.strokeStyle = "rgba(170,186,255,0.35)"; ctx.beginPath(); ctx.moveTo(x0, Y(0)); ctx.lineTo(x0 + w, Y(0)); ctx.moveTo(X(0), y0); ctx.lineTo(X(0), y0 + h); ctx.stroke();
      ctx.strokeStyle = "#ffd27a"; ctx.lineWidth = 2; ctx.beginPath();
      for (let V = -5; V <= 0.85; V += 0.01) { const x = X(V), y = Y(I(V)); V === -5 ? ctx.moveTo(x, y) : ctx.lineTo(x, y); }
      ctx.stroke();
      dot(ctx, X(p.V), Y(I(p.V)), 5, "#ef7aa0");
      text(ctx, "I (mA)", X(0) + 4, y0 + 10); text(ctx, "V", x0 + w - 8, Y(0) + 14);
      text(ctx, p.V >= 0 ? "Forward bias: the barrier shrinks" : "Reverse bias: the barrier grows, almost no current", 12, H - 10);
    },
    info(p) {
      const I = 1e-14 * (Math.exp(p.V / 0.0259) - 1);
      return `<div><b>${Math.abs(I) < 1e-9 ? "≈ 0" : I < 1e-3 ? (I * 1e6).toFixed(2) + " μA" : (I * 1e3).toFixed(1) + " mA"}</b><span>current</span></div>
        <div style="grid-column:span 2"><span>A silicon diode barely conducts until about 0.7 V forward, then the current shoots up. In reverse it is almost a closed door. That one-way behaviour lets it turn AC into DC (rectification).</span></div>`;
    }
  };
})();
