/* Mission 1: Big Bang timeline + Cosmic Calendar */
(function () {
  const M = G.views.origin = {};
  let idx = 0, shown = 0, cv, ctx, W, H, parts = [];

  M.init = function () {
    cv = document.getElementById("origin-canvas");
    const slider = document.getElementById("origin-slider");
    const ticks = document.getElementById("epoch-ticks");
    ticks.innerHTML = DATA.epochs.map((e, i) => `<button type="button" aria-label="${e.title}" data-i="${i}"></button>`).join("");
    ticks.addEventListener("click", e => { const b = e.target.closest("button"); if (b) { slider.value = b.dataset.i; setEpoch(+b.dataset.i); } });
    slider.addEventListener("input", () => setEpoch(+slider.value));
    size();
    addEventListener("resize", () => { if (G.current === "origin") size(); });
    for (let i = 0; i < 260; i++) parts.push({ x: Math.random(), y: Math.random(), z: Math.random(), s: Math.random() });
    setEpoch(0);
    renderCalendar();
    document.getElementById("age-btn").addEventListener("click", placeMe);
  };
  M.enter = function () { size(); G.loop("origin", draw); };

  function size() { const r = G.fit(cv, innerWidth < 600 ? 0.75 : 0.42); ctx = r.ctx; W = r.w; H = r.h; }

  function setEpoch(i) {
    idx = i;
    const e = DATA.epochs[i];
    document.querySelectorAll("#epoch-ticks button").forEach((b, j) => b.setAttribute("aria-current", j === i));
    document.getElementById("epoch-card").innerHTML =
      `<span class="t">${e.t}${e.temp ? ` · temperature ${e.temp}` : ""}</span><h3>${e.title}</h3><p>${e.body}</p>${e.kid ? `<p class="kidline"><b>In simple words:</b> ${e.kid}</p>` : ""}`;
    G.award("epoch-" + i, 5, e.title);
    if (i === DATA.epochs.length - 1) G.badge("big-bang");
    checkDone();
  }

  function checkDone() { if (G.state.badges["big-bang"] && G.state.badges["calendar"]) G.award("origin-done", 30, "Mission complete"); }

  /* ---------- drawing ---------- */
  function draw(dt, t) {
    shown += (idx - shown) * Math.min(1, dt * 4);
    const i = Math.round(shown);
    const cx = W / 2, cy = H / 2;
    ctx.globalCompositeOperation = "source-over";
    ctx.fillStyle = "#050814"; ctx.fillRect(0, 0, W, H);

    if (i <= 1) {
      // blinding birth: white-hot glow that pulses outwards
      const r = (i === 0 ? 40 + 30 * Math.sin(t * 3) : Math.max(W, H)) ;
      const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, r + 60);
      g.addColorStop(0, "#ffffff"); g.addColorStop(0.3, i === 0 ? "#fff6e0" : "#fffaf0"); g.addColorStop(1, i === 0 ? "rgba(255,200,150,0)" : "#ffe7c4");
      ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
      if (i === 1) noise(t, "rgba(255,255,255,", 0.5);
    } else if (i === 2) {
      // inflation: grid racing outward
      ctx.fillStyle = "#ffdcb0"; ctx.fillRect(0, 0, W, H);
      const s = ((t * 0.9) % 1);
      ctx.strokeStyle = "rgba(120,60,20,0.35)"; ctx.lineWidth = 1;
      for (let k = 0; k < 8; k++) {
        const sc = Math.pow(2.6, k + s) * 6;
        ctx.strokeRect(cx - sc, cy - sc * 0.6, sc * 2, sc * 1.2);
      }
      text("Space stretches faster than light can cross it", "#5b2c0c");
    } else if (i === 3 || i === 4) {
      // particle soup: quarks (3) or nuclei (4)
      const bg = i === 3 ? "#ff9d4d" : "#e0662a";
      ctx.fillStyle = bg; ctx.fillRect(0, 0, W, H);
      for (const p of parts) {
        const x = (p.x * W + Math.sin(t * 2 + p.s * 20) * 6), y = (p.y * H + Math.cos(t * 2.3 + p.s * 17) * 6);
        ctx.fillStyle = i === 3 ? ["#fff3d6", "#ffe0a8", "#ffffff"][p.s * 3 | 0] : (p.s < 0.25 ? "#fff" : "#ffe7c2");
        ctx.beginPath(); ctx.arc(x, y, i === 3 ? 1.6 : (p.s < 0.25 ? 3.4 : 2), 0, 6.283); ctx.fill();
        if (i === 4 && p.s < 0.25) { ctx.beginPath(); ctx.arc(x + 3, y + 1, 2.4, 0, 6.283); ctx.fill(); }
      }
      text(i === 3 ? "Quarks → protons and neutrons" : "Hydrogen (single) and helium (pairs) nuclei", "#3a1204");
    } else if (i === 5) {
      // CMB: mottled baby picture of the universe
      for (const p of parts) {
        const col = p.s > 0.5 ? `rgba(255,${120 + p.z * 80},60,0.22)` : `rgba(60,${110 + p.z * 60},220,0.22)`;
        ctx.fillStyle = col;
        ctx.beginPath(); ctx.ellipse(p.x * W, p.y * H, 30 + p.z * 40, 22 + p.s * 30, p.s * 3, 0, 6.283); ctx.fill();
      }
      text("The CMB: the oldest light, photographed by Planck", "#ffe3c4");
    } else if (i === 6 || i === 7) {
      // dark ages, first stars / first galaxies
      for (const p of parts) {
        if (i === 6 && p.s < 0.93) { ctx.fillStyle = "rgba(90,100,140,0.15)"; ctx.fillRect(p.x * W, p.y * H, 1.5, 1.5); continue; }
        if (i === 7 && p.s < 0.7) { ctx.fillStyle = "rgba(170,190,255,0.5)"; ctx.fillRect(p.x * W, p.y * H, 1.2, 1.2); continue; }
        const x = p.x * W, y = p.y * H, r = i === 6 ? 5 + p.z * 5 : 10 + p.z * 14;
        const g = ctx.createRadialGradient(x, y, 0, x, y, r);
        g.addColorStop(0, i === 6 ? "#e8f0ff" : "#fff1dc"); g.addColorStop(0.3, i === 6 ? "rgba(140,170,255,0.8)" : "rgba(255,190,150,0.4)"); g.addColorStop(1, "rgba(0,0,0,0)");
        ctx.fillStyle = g; ctx.beginPath(); ctx.arc(x, y, r * (1 + 0.08 * Math.sin(t * 2 + p.s * 9)), 0, 6.283); ctx.fill();
      }
      text(i === 6 ? "The first stars switch on" : "Young galaxies, seen by the James Webb telescope", "#c8d4ff");
    } else if (i === 8) {
      stars(0.4);
      const R = Math.min(W, H) * 0.12;
      const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, R * 2.4);
      g.addColorStop(0, "#fffbe8"); g.addColorStop(0.35, "#ffd27a"); g.addColorStop(0.42, "rgba(255,170,80,0.35)"); g.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = g; ctx.beginPath(); ctx.arc(cx, cy, R * 2.4, 0, 6.283); ctx.fill();
      ctx.strokeStyle = "rgba(255,210,122,0.25)";
      for (let k = 1; k <= 4; k++) { ctx.beginPath(); ctx.ellipse(cx, cy, R * (1.4 + k * 0.7), R * (0.35 + k * 0.17), 0, 0, 6.283); ctx.stroke(); }
      const a = t * 0.6;
      ctx.fillStyle = "#6fb7ff"; ctx.beginPath(); ctx.arc(cx + Math.cos(a) * R * 2.8, cy + Math.sin(a) * R * 0.69, 3.5, 0, 6.283); ctx.fill();
      text("The Sun and a young Earth, 4.6 billion years ago", "#ffe7b8");
    } else {
      // expansion speeds up / today: galaxies drifting apart
      const k = i === 9 ? (t * 0.08) % 1 : 0;
      stars(0.3);
      for (let n = 0; n < 40; n++) {
        const p = parts[n];
        const dx = (p.x - 0.5), dy = (p.y - 0.5);
        const f = 1 + k * 1.2;
        const x = cx + dx * W * f, y = cy + dy * H * f;
        spiral(x, y, 6 + p.z * 10, p.s * 6, i === 9 ? 0.8 : 0.9, t);
      }
      if (i === 10) {
        spiral(cx, cy, Math.min(W, H) * 0.2, 0.4, 1, t);
        ctx.fillStyle = "#ef7aa0"; ctx.beginPath(); ctx.arc(cx + Math.min(W, H) * 0.11, cy + 4, 3.5, 0, 6.283); ctx.fill();
        ctx.font = "600 12px Figtree, sans-serif"; ctx.fillStyle = "#ef7aa0"; ctx.fillText("You are here", cx + Math.min(W, H) * 0.11 + 8, cy + 8);
      }
      text(i === 9 ? "Dark energy pushes galaxies apart faster and faster" : "The Milky Way today", "#dde6ff");
    }
  }

  function noise(t, base, a) {
    for (const p of parts) {
      ctx.fillStyle = base + (a * (0.5 + 0.5 * Math.sin(t * 8 + p.s * 40))) + ")";
      ctx.fillRect(p.x * W, p.y * H, 3, 3);
    }
  }
  function stars(a) {
    for (const p of parts) { ctx.fillStyle = `rgba(210,220,255,${a * p.z})`; ctx.fillRect(p.x * W, p.y * H, 1.3, 1.3); }
  }
  function spiral(x, y, r, rot, a, t) {
    ctx.save(); ctx.translate(x, y); ctx.rotate(rot + t * 0.05); ctx.scale(1, 0.55);
    const g = ctx.createRadialGradient(0, 0, 0, 0, 0, r);
    g.addColorStop(0, `rgba(255,240,215,${a})`); g.addColorStop(0.25, `rgba(255,210,160,${a * 0.5})`); g.addColorStop(1, "rgba(120,140,255,0)");
    ctx.fillStyle = g; ctx.beginPath(); ctx.arc(0, 0, r, 0, 6.283); ctx.fill();
    if (r > 20) {
      ctx.strokeStyle = `rgba(170,190,255,${a * 0.35})`; ctx.lineWidth = r * 0.08;
      for (let arm = 0; arm < 2; arm++) {
        ctx.beginPath();
        for (let s = 0; s < 60; s++) { const th = s * 0.12 + arm * Math.PI; const rr = r * 0.12 + s * r * 0.014; ctx.lineTo(Math.cos(th) * rr, Math.sin(th) * rr); }
        ctx.stroke();
      }
    }
    ctx.restore();
  }
  function text(s, col) {
    ctx.font = "500 12px 'JetBrains Mono', monospace";
    ctx.fillStyle = col; ctx.globalAlpha = 0.85;
    ctx.fillText(s, 14, H - 14); ctx.globalAlpha = 1;
  }

  /* ---------- cosmic calendar ---------- */
  const AGE = 13.8e9, YEAR_S = 365 * 86400;
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  function calDate(ago) {
    const sec = (1 - ago / AGE) * YEAR_S;
    const d = new Date(Date.UTC(2025, 0, 1) + sec * 1000);
    const hh = String(d.getUTCHours()).padStart(2, "0"), mm = String(d.getUTCMinutes()).padStart(2, "0"), ss = String(d.getUTCSeconds()).padStart(2, "0");
    const lastDay = d.getUTCMonth() === 11 && d.getUTCDate() === 31;
    return `${d.getUTCDate()} ${months[d.getUTCMonth()]}${lastDay ? `, ${hh}:${mm}:${ss}` : ""}`;
  }
  function renderCalendar() {
    document.getElementById("cal-list").innerHTML = DATA.calendar.map(c =>
      `<div class="cal-row"><span>${c.label}</span><span class="mono">${calDate(c.ago)}</span></div>`).join("") +
      `<div class="cal-row you" id="cal-you" hidden></div>`;
  }
  function placeMe() {
    const age = G.clamp(+document.getElementById("age-input").value || 17, 1, 120);
    const s = age / AGE * YEAR_S;
    document.getElementById("age-out").innerHTML =
      `Your ${age} years fill only the last <b class="mono" style="color:var(--rose)">${s.toFixed(3)} seconds</b> before midnight on 31 December. All of recorded history fits in the last 11 seconds. Every atom in you heavier than hydrogen and helium was cooked in stars during the months before.`;
    const row = document.getElementById("cal-you");
    row.hidden = false;
    row.innerHTML = `<span>You are born</span><span class="mono">31 Dec, 23:59:${(60 - s).toFixed(2)}</span>`;
    G.badge("calendar");
    checkDone();
  }
})();
