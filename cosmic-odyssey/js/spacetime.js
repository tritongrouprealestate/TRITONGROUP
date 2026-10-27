/* Mission 4: Spacetime, black holes and time dilation */
(function () {
  const M = G.views.spacetime = {};
  let cv, ctx, W, H, s = 20, shown = 20, ang = 0, trail = [];
  const Gc = 6.674e-11, c = 299792458, MSUN = 1.989e30;
  const objects = [
    { n: "You", kg: null },
    { n: "Earth", kg: 5.972e24 },
    { n: "Jupiter", kg: 1.898e27 },
    { n: "Sun", kg: MSUN },
    { n: "Sagittarius A*", kg: 4.3e6 * MSUN },
    { n: "M87*", kg: 6.5e9 * MSUN }
  ];

  M.init = function () {
    cv = document.getElementById("warp-canvas");
    const sl = document.getElementById("warp-slider");
    sl.addEventListener("input", () => setWarp(+sl.value));
    document.querySelectorAll("[data-warp]").forEach(b => b.addEventListener("click", () => { sl.value = b.dataset.warp; setWarp(+b.dataset.warp); }));
    size();
    addEventListener("resize", () => { if (G.current === "spacetime") size(); });
    setWarp(20);

    const row = document.getElementById("bh-objects");
    row.innerHTML = objects.map((o, i) => `<button class="chip" type="button" data-o="${i}" aria-pressed="${i === 1}">${o.n}</button>`).join("");
    row.addEventListener("click", e => { const b = e.target.closest("button[data-o]"); if (b) showBH(+b.dataset.o, true); });
    showBH(1, false);

    const td = document.getElementById("td-slider");
    td.addEventListener("input", () => timeDil(+td.value));
    timeDil(+td.value);
  };
  M.enter = function () { size(); G.loop("spacetime", draw); };

  function size() { const r = G.fit(cv, innerWidth < 860 ? 0.8 : 0.85); ctx = r.ctx; W = r.w; H = r.h; }

  function setWarp(v) {
    s = v;
    let t;
    if (v === 0) t = "Flat spacetime. With no mass around, a moving object just goes in a straight line forever. That is Newton's first law, in Einstein's language.";
    else if (v < 45) t = "A Sun-sized dent. Planets are not pulled by a rope: they follow the straightest possible path through curved spacetime, and that path is an orbit.";
    else if (v < 90) t = "Same mass, squeezed smaller. Far away nothing changes, but near the surface the well gets steep. On a neutron star, surface gravity is around 100 billion times Earth's.";
    else t = "A black hole. The well has no bottom. Inside the event horizon every possible path, even for light, leads further in.";
    document.getElementById("warp-text").textContent = t;
    if (v >= 95) { G.flag("warpBH"); G.award("warp-bh", 15, "Made a black hole"); }
  }

  function depth(r) {
    if (shown < 0.5) return 0;
    const a = 0.55 * (1 - shown / 100) + 0.035;
    const A = 0.16;
    return -Math.min(A / Math.sqrt(r * r + a * a) - A / 1.6, shown > 95 ? 1.25 : 0.95);
  }

  function draw(dt, t) {
    shown += (s - shown) * Math.min(1, dt * 3);
    ctx.fillStyle = "#050814"; ctx.fillRect(0, 0, W, H);
    const S = Math.min(W * 0.46, H * 0.62), cx = W / 2, cy = H * 0.36;
    const proj = (x, y) => { const r = Math.hypot(x, y); const z = depth(r); return [cx + x * S, cy - y * 0.42 * S - z * 0.95 * S]; };
    const N = 26;
    ctx.lineWidth = 1;
    for (let pass = 0; pass < 2; pass++) {
      for (let i = 0; i <= N; i++) {
        const u = -1 + 2 * i / N;
        ctx.strokeStyle = `rgba(134,168,255,${0.18 + 0.25 * (1 - Math.abs(u))})`;
        ctx.beginPath();
        for (let j = 0; j <= 80; j++) {
          const v = -1 + 2 * j / 80;
          const [x, y] = pass ? proj(v, u) : proj(u, v);
          j ? ctx.lineTo(x, y) : ctx.moveTo(x, y);
        }
        ctx.stroke();
      }
    }
    const [bx, by] = proj(0, 0);
    if (shown > 0.5) {
      if (shown > 95) {
        ctx.fillStyle = "#000"; ctx.beginPath(); ctx.ellipse(bx, by - 2, S * 0.07, S * 0.03, 0, 0, 6.283); ctx.fill();
        ctx.strokeStyle = "rgba(255,200,140,0.8)"; ctx.lineWidth = 1.5; ctx.stroke();
      } else {
        const r = 6 + 26 * (1 - shown / 100);
        const col = shown > 45 ? [200, 220, 255] : [255, 210, 122];
        const g = ctx.createRadialGradient(bx, by - r, 0, bx, by - r, r * 2.6);
        g.addColorStop(0, G.rgb(col, 1)); g.addColorStop(0.35, G.rgb(col, 0.8)); g.addColorStop(1, G.rgb(col, 0));
        ctx.fillStyle = g; ctx.beginPath(); ctx.arc(bx, by - r, r * 2.6, 0, 6.283); ctx.fill();
      }
      // a small planet following the curve
      const r0 = 0.58;
      ang += dt * (0.4 + shown / 180);
      const px = Math.cos(ang) * r0, py = Math.sin(ang) * r0;
      const [sx, sy] = proj(px, py);
      trail.push([sx, sy]); if (trail.length > 60) trail.shift();
      ctx.strokeStyle = "rgba(111,183,255,0.35)"; ctx.lineWidth = 2; ctx.beginPath();
      trail.forEach(([x, y], i) => i ? ctx.lineTo(x, y) : ctx.moveTo(x, y)); ctx.stroke();
      ctx.fillStyle = "#6fb7ff"; ctx.beginPath(); ctx.arc(sx, sy - 5, 5, 0, 6.283); ctx.fill();
    } else {
      trail = [];
      const x = ((t * 0.12) % 2) - 1;
      const [sx, sy] = proj(x, -0.3);
      ctx.fillStyle = "#6fb7ff"; ctx.beginPath(); ctx.arc(sx, sy - 5, 5, 0, 6.283); ctx.fill();
    }
  }

  function showBH(i, clicked) {
    document.querySelectorAll("#bh-objects .chip").forEach((b, j) => b.setAttribute("aria-pressed", j === i));
    const o = objects[i];
    const kg = o.kg || 50;
    const rs = 2 * Gc * kg / (c * c);
    let size, compare;
    if (rs < 1e-9) { size = G.fmt(rs) + " m"; compare = `about ${G.fmt(Math.round(1.7e-15 / rs / 1e9))} billion times smaller than a single proton`; }
    else if (rs < 1) { size = (rs * 1000).toFixed(1) + " mm"; compare = "about the size of a marble. All of Earth, squeezed that small"; }
    else if (rs < 1000) { size = rs.toFixed(2) + " m"; compare = "about the height of a room. The largest planet, crushed to that"; }
    else if (rs < 1e5) { size = (rs / 1000).toFixed(2) + " km"; compare = "smaller than most cities"; }
    else if (rs < 1e11) { size = G.fmt(rs / 1000) + " km"; compare = `about ${(rs / 1.496e11).toFixed(2)} AU, a fifth of Mercury's orbit`; }
    else { size = G.fmt(rs / 1000) + " km"; compare = `about ${Math.round(rs / 1.496e11)} AU, several times wider than Neptune's orbit`; }
    const rho = kg / (4 / 3 * Math.PI * Math.pow(rs, 3));
    let rhoTxt = G.fmt(rho) + " kg/m³";
    let rhoNote = "average density inside the horizon";
    if (rho < 1.2) rhoNote = "average density: less than air (1.2 kg/m³)!";
    document.getElementById("bh-out").innerHTML = `
      <div><b>${size}</b><span>event horizon radius ${o.kg ? "" : "(for 50 kg)"}</span></div>
      <div><b>${rhoTxt}</b><span>${rhoNote}</span></div>
      <div style="grid-column:1/-1"><span>${compare}.</span></div>`;
    if (clicked) { G.flag("bhCalc"); G.award("bh-calc", 10, "Black hole maths"); }
  }

  function timeDil(v) {
    const x = 1 + 9 * Math.pow(v / 1000, 2.5) + 0.0001;
    const f = 1 / Math.sqrt(1 - 1 / x);
    document.getElementById("td-r").textContent = x.toFixed(x < 1.1 ? 4 : 2);
    const friendMin = 60 * f;
    let zone = "You would need powerful rockets to hover here.";
    if (x < 1.5) zone = "Inside the photon sphere: here light itself can orbit the black hole.";
    else if (x > 3) zone = "Outside 3 × the horizon, stable orbits are possible.";
    document.getElementById("td-out").innerHTML = `
      <div><b>${f.toFixed(f < 10 ? 3 : 1)}×</b><span>time slows by this factor</span></div>
      <div><b>${friendMin < 120 ? friendMin.toFixed(1) + " min" : (friendMin / 60).toFixed(1) + " hours"}</b><span>pass for your friend while 1 hour passes for you</span></div>
      <div style="grid-column:1/-1"><span>${zone}</span></div>`;
    if (f >= 10) G.badge("horizon");
    if (G.state.badges.horizon && G.state.flags.warpBH && G.state.flags.bhCalc) G.award("spacetime-done", 30, "Mission complete");
  }
})();
