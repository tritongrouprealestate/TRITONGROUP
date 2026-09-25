/* Mission 5: Newton's cannon, planetary weights and puzzles */
(function () {
  const M = G.views.newton = {};
  const GM = 3.986e14, R = 6.371e6, ALT = 200e3;
  let cv, ctx, W, H, v = 6, shot = null, old = [], warp = 700, earthSpin = 0;

  M.init = function () {
    cv = document.getElementById("cannon-canvas");
    const sl = document.getElementById("v-slider");
    sl.addEventListener("input", () => setV(+sl.value / 10));
    document.querySelectorAll("[data-v]").forEach(b => b.addEventListener("click", () => { sl.value = Math.round(+b.dataset.v * 10); setV(+b.dataset.v); }));
    document.getElementById("fire-btn").addEventListener("click", fire);
    size();
    addEventListener("resize", () => { if (G.current === "newton") size(); });
    setV(6);

    const mi = document.getElementById("mass-input");
    mi.addEventListener("input", () => weights(true));
    weights(false);
    renderPuzzles();
  };
  M.enter = function () { size(); G.loop("newton", draw); };

  function size() { const r = G.fit(cv, innerWidth < 860 ? 0.95 : 0.9); ctx = r.ctx; W = r.w; H = r.h; }

  function predict(vk) {
    const r0 = R + ALT, vv = vk * 1000;
    const E = vv * vv / 2 - GM / r0;
    const vc = Math.sqrt(GM / r0) / 1000, ve = Math.sqrt(2 * GM / r0) / 1000;
    if (E >= 0) return { kind: "escape", vc, ve };
    const a = -GM / (2 * E), h = r0 * vv;
    const e = Math.sqrt(Math.max(0, 1 + 2 * E * h * h / (GM * GM)));
    const rp = a * (1 - e), ra = a * (1 + e);
    const T = 2 * Math.PI * Math.sqrt(a * a * a / GM);
    return { kind: rp < R ? "crash" : "orbit", rp, ra, T, e, vc, ve };
  }

  function setV(x) {
    v = x;
    document.getElementById("v-val").textContent = x.toFixed(1);
    const p = predict(x);
    const out = document.getElementById("cannon-out");
    const alt = r => Math.max(0, (r - R) / 1000);
    out.innerHTML = `
      <div><b>${p.vc.toFixed(2)}</b><span>km/s for a circular orbit</span></div>
      <div><b>${p.ve.toFixed(2)}</b><span>km/s to escape Earth</span></div>
      ${p.kind === "orbit" ? `<div><b>${G.fmt(Math.round(alt(p.ra)))} km</b><span>highest point</span></div><div><b>${(p.T / 60).toFixed(0)} min</b><span>one lap</span></div>` :
        p.kind === "crash" ? `<div><b>${G.fmt(Math.round(alt(p.ra)))} km</b><span>highest point</span></div><div><b>no</b><span>it hits the ground</span></div>` :
        `<div><b>∞</b><span>it never comes back</span></div>`}`;
  }

  function fire() {
    if (shot) old.unshift(shot.trail), old = old.slice(0, 3);
    shot = { x: 0, y: R + ALT, vx: v * 1000, vy: 0, trail: [[0, R + ALT]], swept: 0, lastA: Math.atan2(R + ALT, 0), done: false, kind: predict(v).kind };
    document.getElementById("cannon-verdict").textContent = "Fired. Watch it fly...";
  }

  function step(dt) {
    const s = shot;
    const r = Math.hypot(s.x, s.y), a = -GM / (r * r * r);
    s.vx += a * s.x * dt; s.vy += a * s.y * dt;
    s.x += s.vx * dt; s.y += s.vy * dt;
    const ang = Math.atan2(s.y, s.x);
    let d = ang - s.lastA; if (d > Math.PI) d -= 2 * Math.PI; if (d < -Math.PI) d += 2 * Math.PI;
    s.swept += Math.abs(d); s.lastA = ang;
  }

  function verdict(txt) { document.getElementById("cannon-verdict").innerHTML = txt; }

  function draw(dt) {
    ctx.fillStyle = "#050814"; ctx.fillRect(0, 0, W, H);
    const Rpx = Math.min(W, H) * 0.2, k = Rpx / R, cx = W / 2, cy = H / 2 + Rpx * 0.25;
    const P = (x, y) => [cx + x * k, cy - y * k];

    // physics
    if (shot && !shot.done) {
      const simT = dt * warp;
      const n = Math.ceil(simT / 4);
      for (let i = 0; i < n; i++) {
        step(simT / n);
        const r = Math.hypot(shot.x, shot.y);
        if (i % 3 === 0) shot.trail.push([shot.x, shot.y]);
        if (r <= R) {
          shot.done = true;
          verdict(`<b style="color:var(--k)">Crashed.</b> Too slow: gravity bent its path into the ground. Newton's point: every thrown object is already 'orbiting', it just hits Earth first.`);
          break;
        }
        if (r > R * 9 && shot.kind === "orbit") {
          shot.done = true;
          const T = predict(v).T;
          verdict(`<b style="color:var(--good)">A giant orbit!</b> It flies off our map, but it is still bound to Earth and will swing back in about ${(T / 3600).toFixed(1)} hours. Add a little more speed to escape for good.`);
          G.badge("orbit");
          break;
        }
        if (r > R * 9) {
          shot.done = true;
          verdict(`<b style="color:var(--good)">Escaped!</b> Faster than escape velocity, it will never return. This is how Voyager and Mangalyaan left Earth, with help from rockets.`);
          G.badge("escape");
          break;
        }
        if (shot.swept > 2 * Math.PI && shot.kind === "orbit") {
          shot.done = true;
          const circ = Math.abs(v - predict(v).vc) < 0.15;
          verdict(`<b style="color:var(--good)">Orbit!</b> ${circ ? "Almost perfectly circular. " : "An elliptical orbit. "}It is falling toward Earth all the time and always missing. This is exactly what the Moon and the ISS do.`);
          G.badge("orbit");
          break;
        }
      }
      if (shot.done) checkDone();
      if (shot.trail.length > 4000) shot.trail.splice(0, shot.trail.length - 4000);
    }

    // orbit trails
    old.forEach((tr, i) => pathOf(tr, `rgba(169,198,255,${0.28 - i * 0.08})`, P));
    if (shot) pathOf(shot.trail, "rgba(255,210,122,0.9)", P);

    // Earth
    const [ex, ey] = P(0, 0);
    const g = ctx.createRadialGradient(ex - Rpx * 0.3, ey - Rpx * 0.3, Rpx * 0.1, ex, ey, Rpx);
    g.addColorStop(0, "#5ea3ff"); g.addColorStop(0.7, "#1f4f9e"); g.addColorStop(1, "#0f2a5c");
    ctx.fillStyle = "rgba(111,183,255,0.12)"; ctx.beginPath(); ctx.arc(ex, ey, Rpx * 1.06, 0, 6.283); ctx.fill();
    ctx.fillStyle = g; ctx.beginPath(); ctx.arc(ex, ey, Rpx, 0, 6.283); ctx.fill();
    earthSpin += dt * 0.05;
    ctx.save(); ctx.beginPath(); ctx.arc(ex, ey, Rpx, 0, 6.283); ctx.clip();
    ctx.fillStyle = "rgba(116,224,181,0.35)";
    for (let i = 0; i < 6; i++) {
      const a = earthSpin + i * 1.1;
      ctx.beginPath(); ctx.ellipse(ex + Math.cos(a) * Rpx * 0.55, ey + Math.sin(a * 1.3) * Rpx * 0.4, Rpx * 0.22, Rpx * 0.13, a, 0, 6.283); ctx.fill();
    }
    ctx.restore();
    // Newton's (exaggerated) mountain and cannon
    const [mx, my] = P(0, R);
    const top = P(0, R + ALT)[1];
    ctx.fillStyle = "#8b8fa8"; ctx.beginPath(); ctx.moveTo(mx - 16, my + 4); ctx.lineTo(mx, top); ctx.lineTo(mx + 16, my + 4); ctx.fill();
    ctx.fillStyle = "#ffd27a"; ctx.fillRect(mx - 2, top - 3, 10, 4);

    if (shot) {
      const [bx, by] = P(shot.x, shot.y);
      ctx.fillStyle = "#fff"; ctx.beginPath(); ctx.arc(bx, by, 3.5, 0, 6.283); ctx.fill();
    }
    ctx.font = "500 11px 'JetBrains Mono', monospace"; ctx.fillStyle = "rgba(200,210,240,0.7)";
    ctx.fillText(`Time sped up ${warp}×  ·  mountain not to scale`, 12, H - 12);
  }

  function pathOf(tr, col, P) {
    if (tr.length < 2) return;
    ctx.strokeStyle = col; ctx.lineWidth = 1.6; ctx.beginPath();
    tr.forEach(([x, y], i) => { const [px, py] = P(x, y); i ? ctx.lineTo(px, py) : ctx.moveTo(px, py); });
    ctx.stroke();
  }

  function checkDone() {
    if (G.state.badges.orbit && G.state.badges.escape && Object.keys(G.state.puzzles).length >= DATA.puzzles.length) G.award("newton-done", 30, "Mission complete");
  }

  /* ---------- weights ---------- */
  function weights(user) {
    const m = G.clamp(+document.getElementById("mass-input").value || 50, 1, 300);
    const list = DATA.planets.filter(p => p.g < 100);
    const max = Math.max(...list.map(p => p.g));
    document.getElementById("weights").innerHTML = list.map(p => `
      <div class="weight-row ${p.n === "Earth" ? "earth" : ""}"><span>${p.n}</span><span class="track"><i style="width:${p.g / max * 100}%"></i></span><span class="mono">${(m * p.g / 9.81).toFixed(1)} kg</span></div>`).join("") +
      `<p class="small muted" style="margin-top:8px">Numbers show what an Earth bathroom scale would read. On the Sun's surface (g = 274 m/s²) it would read about <b class="mono">${G.fmt(Math.round(m * 274 / 9.81))} kg</b>, far off this chart.</p>`;
    const jump = g => (0.5 * 9.81 / g);
    document.getElementById("jump-out").innerHTML = `
      <div><b>${G.fmt(Math.round(m * 9.81))} N</b><span>your weight on Earth</span></div>
      <div><b>${jump(1.62).toFixed(1)} m</b><span>a 0.5 m Earth jump, on the Moon</span></div>
      <div><b>${jump(3.71).toFixed(1)} m</b><span>the same jump on Mars</span></div>
      <div><b>${(jump(24.79) * 100).toFixed(0)} cm</b><span>the same jump on Jupiter</span></div>`;
    if (user) G.award("weights", 10, "Weighed yourself in space");
  }

  /* ---------- puzzles ---------- */
  function renderPuzzles() {
    const box = document.getElementById("puzzles");
    box.innerHTML = DATA.puzzles.map((p, i) => {
      const open = !!G.state.puzzles[i];
      return `<div class="panel puzzle"><span class="law">${p.law}</span><p class="q">${p.q}</p>
        ${open ? `<p class="a">${p.a}</p>` : `<button class="btn" type="button" data-p="${i}">Think first, then reveal</button>`}</div>`;
    }).join("");
    count();
    box.onclick = e => {
      const b = e.target.closest("button[data-p]"); if (!b) return;
      const i = +b.dataset.p;
      G.state.puzzles[i] = 1; G.save();
      const a = document.createElement("p"); a.className = "a"; a.textContent = DATA.puzzles[i].a;
      b.replaceWith(a);
      G.addXP(10, "Puzzle solved");
      if (Object.keys(G.state.puzzles).length >= 6) G.badge("thinker");
      count(); checkDone();
    };
  }
  function count() { document.getElementById("puzzle-count").textContent = `${Object.keys(G.state.puzzles).length} of ${DATA.puzzles.length} revealed`; }
})();
