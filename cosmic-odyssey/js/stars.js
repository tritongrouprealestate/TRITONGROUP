/* Mission 2: Life and death of a star */
(function () {
  const M = G.views.stars = {};
  let cv, ctx, W, H, mass = 1, path = [], stage = 0, stageT = 0, playing = false, playTimer = null, flecks = [];
  const sliderToMass = v => 0.1 * Math.pow(400, v / 1000);
  const massToSlider = m => Math.log(m / 0.1) / Math.log(400) * 1000;

  M.init = function () {
    cv = document.getElementById("star-canvas");
    const s = document.getElementById("mass-slider");
    s.value = massToSlider(1);
    s.addEventListener("input", () => setMass(sliderToMass(+s.value)));
    document.querySelectorAll("[data-mass]").forEach(b => b.addEventListener("click", () => {
      s.value = massToSlider(+b.dataset.mass); setMass(+b.dataset.mass);
    }));
    document.getElementById("play-life").addEventListener("click", play);
    document.getElementById("star-path").addEventListener("click", e => {
      const b = e.target.closest("button[data-i]"); if (!b) return;
      stopPlay(); goStage(+b.dataset.i);
    });
    // position mass labels on the real log scale
    const lab = document.querySelector(".mass-labels");
    lab.style.position = "relative"; lab.style.height = "1.2em";
    lab.innerHTML = [0.1, 1, 8, 25, 40].map((m, i, a) => {
      const x = massToSlider(m) / 10;
      const tf = i === 0 ? "none" : i === a.length - 1 ? "translateX(-100%)" : "translateX(-50%)";
      return `<span style="position:absolute;left:${x}%;transform:${tf}">${m}</span>`;
    }).join("");
    for (let i = 0; i < 160; i++) flecks.push({ a: Math.random() * 6.283, r: Math.random(), s: Math.random(), v: 0.5 + Math.random() });
    size();
    addEventListener("resize", () => { if (G.current === "stars") size(); });
    setMass(1);
  };
  M.enter = function () { size(); G.loop("stars", draw); };
  M.leave = stopPlay;

  function size() { const r = G.fit(cv, innerWidth < 860 ? 0.8 : 0.78); ctx = r.ctx; W = r.w; H = r.h; }

  function props(m) {
    const L = m < 0.43 ? 0.23 * Math.pow(m, 2.3) : m < 2 ? Math.pow(m, 4) : 1.4 * Math.pow(m, 3.5);
    const R = m <= 1 ? Math.pow(m, 0.8) : Math.pow(m, 0.57);
    const T = 5772 * Math.pow(L / (R * R), 0.25);
    const life = Math.max(3e6, 1e10 * m / L);
    const cls = T > 30000 ? "O" : T > 10000 ? "B" : T > 7500 ? "A" : T > 6000 ? "F" : T > 5200 ? "G" : T > 3700 ? "K" : "M";
    return { L, R, T, life, cls };
  }

  function pathFor(m) {
    if (m < 0.5) return ["nebula", "proto", "main", "rd"];
    if (m < 8) return ["nebula", "proto", "main", "redgiant", "pn", "wd"];
    if (m < 25) return ["nebula", "proto", "main", "rsg", "sn", "ns"];
    return ["nebula", "proto", "main", "rsg", "sn", "bh"];
  }

  function setMass(m) {
    mass = m;
    document.getElementById("mass-val").textContent = m < 1 ? m.toFixed(2) : m < 10 ? m.toFixed(1) : m.toFixed(0);
    const p = props(m);
    const col = G.kelvinRGB(p.T);
    const lifeTxt = p.life >= 1e9 ? (p.life / 1e9).toFixed(p.life < 1e10 ? 1 : 0) + " billion yr" : (p.life / 1e6).toFixed(0) + " million yr";
    document.getElementById("star-readout").innerHTML = `
      <div><b><span class="spec-chip"><i style="background:${G.rgb(col)};color:${G.rgb(col)}"></i>${p.cls}-type</span></b><span>spectral class</span></div>
      <div><b>${G.fmt(Math.round(p.T / 100) * 100)} K</b><span>surface temperature</span></div>
      <div><b>${p.L < 1 ? p.L.toFixed(3) : G.fmt(Math.round(p.L))}×</b><span>Sun's brightness</span></div>
      <div><b>~${lifeTxt}</b><span>life on main sequence</span></div>`;
    const newPath = pathFor(m);
    const changed = newPath.join() !== path.join();
    path = newPath;
    if (changed) { stopPlay(); renderPath(); goStage(Math.min(stage, 2)); }
  }

  function renderPath() {
    document.getElementById("star-path").innerHTML = path.map((k, i) =>
      (i ? '<span class="arrow" aria-hidden="true">→</span>' : "") +
      `<button type="button" data-i="${i}">${DATA.stages[k].name}</button>`).join("");
  }

  function goStage(i) {
    stage = i; stageT = 0;
    document.querySelectorAll("#star-path button").forEach((b, j) => b.setAttribute("aria-current", j === i));
    const k = path[i], s = DATA.stages[k];
    let extra = "";
    if (k === "rd") extra = " Far in the future it should heat up into a 'blue dwarf', then fade as a white dwarf.";
    if (k === "main" && mass > 0.9 && mass < 1.1) extra = " Our Sun is about halfway through this stage, around 4.6 billion years in.";
    document.getElementById("stage-text").innerHTML =
      `<span class="eyebrow">Stage ${i + 1} of ${path.length}</span><h3>${s.name}</h3><p>${s.body}${extra}</p>`;
    if (i === path.length - 1) {
      const badge = { wd: "star-dwarf", ns: "star-neutron", bh: "star-bh" }[k];
      if (badge) G.badge(badge);
      if (G.state.badges["star-dwarf"] && G.state.badges["star-neutron"] && G.state.badges["star-bh"]) G.award("stars-done", 30, "Mission complete");
    }
  }

  function play() {
    stopPlay(); playing = true; goStage(0);
    playTimer = setInterval(() => {
      if (stage >= path.length - 1) { stopPlay(); return; }
      goStage(stage + 1);
    }, 3200);
    document.getElementById("play-life").textContent = "Playing…";
  }
  function stopPlay() {
    playing = false; clearInterval(playTimer);
    const b = document.getElementById("play-life"); if (b) b.textContent = "▶ Play its life";
  }

  /* ---------- drawing ---------- */
  function glow(x, y, r, inner, outer) {
    const g = ctx.createRadialGradient(x, y, 0, x, y, r);
    g.addColorStop(0, inner); g.addColorStop(0.4, outer); g.addColorStop(1, "rgba(0,0,0,0)");
    ctx.fillStyle = g; ctx.beginPath(); ctx.arc(x, y, r, 0, 6.283); ctx.fill();
  }
  function label(s) {
    ctx.font = "500 12px 'JetBrains Mono', monospace"; ctx.fillStyle = "rgba(200,210,240,0.8)";
    ctx.fillText(s, 14, H - 14);
  }

  function draw(dt, t) {
    stageT += dt;
    ctx.fillStyle = "#050814"; ctx.fillRect(0, 0, W, H);
    for (const f of flecks) { ctx.fillStyle = `rgba(200,210,255,${0.25 * f.s})`; ctx.fillRect(((f.a / 6.283) * W), f.r * H, 1.2, 1.2); }
    const cx = W / 2, cy = H / 2, U = Math.min(W, H);
    const p = props(mass), col = G.kelvinRGB(p.T);
    const baseR = U * (0.06 + 0.06 * Math.log10(mass * 10) / Math.log10(400));
    const k = path[stage];
    const e = Math.min(1, stageT / 1.2); // ease-in for each stage

    if (k === "nebula") {
      for (const f of flecks) {
        const r = U * (0.08 + f.r * 0.38) * (1.05 - 0.15 * e);
        const x = cx + Math.cos(f.a + t * 0.05 * f.v) * r, y = cy + Math.sin(f.a + t * 0.05 * f.v) * r * 0.7;
        ctx.fillStyle = f.s > 0.5 ? `rgba(239,122,160,${0.06 + 0.05 * f.s})` : `rgba(120,150,255,${0.05 + 0.05 * f.s})`;
        ctx.beginPath(); ctx.arc(x, y, 18 + f.s * 26, 0, 6.283); ctx.fill();
      }
      glow(cx, cy, U * 0.12 * e, "rgba(255,220,200,0.5)", "rgba(239,122,160,0.15)");
      label("Cold gas and dust, about 10 K");
    } else if (k === "proto") {
      ctx.save(); ctx.translate(cx, cy);
      ctx.fillStyle = "rgba(255,160,110,0.18)"; ctx.beginPath(); ctx.ellipse(0, 0, U * 0.32, U * 0.05, 0, 0, 6.283); ctx.fill();
      ctx.strokeStyle = "rgba(160,190,255,0.5)"; ctx.lineWidth = 2;
      for (let s = -1; s <= 1; s += 2) {
        const len = U * 0.3 * (0.7 + 0.3 * Math.sin(t * 3));
        const g = ctx.createLinearGradient(0, 0, 0, s * len);
        g.addColorStop(0, "rgba(170,200,255,0.8)"); g.addColorStop(1, "rgba(170,200,255,0)");
        ctx.fillStyle = g; ctx.beginPath(); ctx.moveTo(-4, 0); ctx.lineTo(4, 0); ctx.lineTo(10, s * len); ctx.lineTo(-10, s * len); ctx.fill();
      }
      ctx.restore();
      glow(cx, cy, baseR * 1.4, "rgba(255,210,170,1)", "rgba(255,120,80,0.4)");
      label("Glowing from gravity alone. Jets shoot from the poles");
    } else if (k === "main" || k === "rd") {
      const r = k === "rd" ? U * 0.05 : baseR;
      glow(cx, cy, r * 3.2, G.rgb(col, 0.9), G.rgb(col, 0.18));
      ctx.fillStyle = G.rgb(col); ctx.beginPath(); ctx.arc(cx, cy, r, 0, 6.283); ctx.fill();
      for (let i = 0; i < 24; i++) {
        const f = flecks[i], a = f.a + t * 0.2;
        const rr = r * Math.sqrt(f.r) * 0.85;
        ctx.fillStyle = `rgba(255,255,255,${0.035 + 0.035 * Math.sin(t * 3 + f.s * 10)})`;
        ctx.beginPath(); ctx.arc(cx + Math.cos(a) * rr, cy + Math.sin(a) * rr, r * 0.1, 0, 6.283); ctx.fill();
      }
      if (k === "rd" && Math.sin(t * 1.3) > 0.97) glow(cx + r * 0.7, cy - r * 0.5, r * 1.3, "rgba(255,255,255,0.9)", "rgba(255,160,120,0.3)");
      label(k === "rd" ? "Slow and steady: fusion for trillions of years" : `Hydrogen → helium in the core · ${G.fmt(Math.round(p.T / 100) * 100)} K surface`);
    } else if (k === "redgiant" || k === "rsg") {
      const grow = k === "rsg" ? 3.6 : 3.0;
      const r = baseR * (1 + (grow - 1) * e);
      const c2 = k === "rsg" ? [255, 95, 60] : [255, 140, 80];
      glow(cx, cy, r * 1.8, G.rgb(c2, 0.6), G.rgb(c2, 0.15));
      ctx.fillStyle = G.rgb(c2, 0.95);
      ctx.beginPath();
      for (let a = 0; a <= 6.3; a += 0.1) {
        const rr = r * (1 + 0.03 * Math.sin(a * 7 + t * 1.5) + 0.02 * Math.sin(a * 13 - t));
        ctx.lineTo(cx + Math.cos(a) * rr, cy + Math.sin(a) * rr);
      }
      ctx.fill();
      if (k === "rsg") {
        const layers = [["H", "#ff9d6e"], ["He", "#ffc27a"], ["C", "#ffe08c"], ["O", "#b8e6a8"], ["Si", "#9ec8ff"], ["Fe", "#c9c9d6"]];
        ctx.save(); ctx.beginPath(); ctx.moveTo(cx, cy); ctx.arc(cx, cy, r * 0.72, -0.9, 0.2); ctx.closePath(); ctx.clip();
        layers.forEach(([n, c], i) => { ctx.fillStyle = c; ctx.beginPath(); ctx.arc(cx, cy, r * 0.72 * (1 - i / 6.2), 0, 6.283); ctx.fill(); });
        ctx.restore();
        ctx.font = "600 11px 'JetBrains Mono', monospace"; ctx.fillStyle = "#1a0c05";
        layers.forEach(([n], i) => {
          const rr = r * 0.72 * (1 - (i + 0.5) / 6.2);
          ctx.fillText(n, cx + Math.cos(-0.35) * rr - 6, cy + Math.sin(-0.35) * rr + 4);
        });
        label("Onion layers of fusion. Iron at the centre is the end of the line");
      } else {
label("Core shrinks and heats while the outer layers swell and cool");
      }
    } else if (k === "pn") {
      const r = U * (0.12 + 0.2 * e);
      for (let i = 0; i < 90; i++) {
        const f = flecks[i], a = f.a + t * 0.03;
        const rr = r * (0.75 + f.r * 0.35);
        ctx.fillStyle = f.s > 0.4 ? `rgba(239,122,160,0.12)` : `rgba(110,220,210,0.12)`;
        ctx.beginPath(); ctx.arc(cx + Math.cos(a) * rr, cy + Math.sin(a) * rr * 0.9, 14 + f.s * 16, 0, 6.283); ctx.fill();
      }
      glow(cx, cy, r * 0.7, "rgba(120,230,220,0.25)", "rgba(80,180,200,0.08)");
      glow(cx, cy, 16, "#ffffff", "rgba(200,220,255,0.6)");
      label("Like the Ring Nebula in Lyra. The white dot is the new white dwarf");
    } else if (k === "wd") {
      glow(cx, cy, 40, "#ffffff", "rgba(200,220,255,0.35)");
      ctx.fillStyle = "#fff"; ctx.beginPath(); ctx.arc(cx, cy, 7, 0, 6.283); ctx.fill();
      ctx.fillStyle = "#4f86d9"; ctx.beginPath(); ctx.arc(cx + 50, cy, 7.4, 0, 6.283); ctx.fill();
      ctx.font = "500 11px 'JetBrains Mono', monospace"; ctx.fillStyle = "rgba(200,210,240,0.8)";
      ctx.fillText("Earth, same scale", cx + 62, cy + 4);
      label("Earth-sized, half a Sun of mass, cooling for trillions of years");
    } else if (k === "sn") {
      const f = stageT;
      const R = U * 0.05 + f * U * 0.2;
      if (f < 0.35) { ctx.fillStyle = `rgba(255,255,255,${1 - f * 2})`; ctx.fillRect(0, 0, W, H); }
      glow(cx, cy, R * 1.2, `rgba(255,250,235,${Math.max(0, 1 - f * 0.25)})`, `rgba(255,150,90,${Math.max(0, 0.5 - f * 0.1)})`);
      for (const q of flecks) {
        const rr = R * (0.7 + q.r * 0.6);
        ctx.fillStyle = q.s > 0.5 ? "rgba(255,190,120,0.7)" : "rgba(150,190,255,0.7)";
        ctx.fillRect(cx + Math.cos(q.a) * rr, cy + Math.sin(q.a) * rr, 2, 2);
      }
      label("Core collapse in under a second. Brighter than billions of Suns");
    } else if (k === "ns") {
      const a = t * 4;
      ctx.save(); ctx.translate(cx, cy); ctx.rotate(a);
      for (let s = -1; s <= 1; s += 2) {
        const g = ctx.createLinearGradient(0, 0, 0, s * U * 0.45);
        g.addColorStop(0, "rgba(170,200,255,0.9)"); g.addColorStop(1, "rgba(170,200,255,0)");
        ctx.fillStyle = g; ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(-U * 0.05, s * U * 0.45); ctx.lineTo(U * 0.05, s * U * 0.45); ctx.fill();
      }
      ctx.restore();
      glow(cx, cy, 34, "#ffffff", "rgba(150,190,255,0.6)");
      ctx.fillStyle = "#fff"; ctx.beginPath(); ctx.arc(cx, cy, 5, 0, 6.283); ctx.fill();
      label("About 20 km wide. Its beams sweep past like a lighthouse: a pulsar");
    } else if (k === "bh") {
      const r = U * 0.08;
      ctx.save(); ctx.translate(cx, cy);
      const disk = (front) => {
        for (let i = 0; i < 3; i++) {
          ctx.strokeStyle = `rgba(255,${170 + i * 30},${100 + i * 40},${0.55 - i * 0.12})`;
          ctx.lineWidth = r * (0.35 - i * 0.08);
          ctx.beginPath(); ctx.ellipse(0, 0, r * (2.2 + i * 0.5), r * (0.45 + i * 0.1), -0.08, front ? 0 : Math.PI, front ? Math.PI : 2 * Math.PI); ctx.stroke();
        }
      };
      disk(false);
      // lensed image of the far side of the disk arcing over the top
      ctx.strokeStyle = "rgba(255,200,140,0.45)"; ctx.lineWidth = r * 0.22;
      ctx.beginPath(); ctx.arc(0, 0, r * 1.45, Math.PI * 1.05, Math.PI * 1.95); ctx.stroke();
      ctx.strokeStyle = "rgba(255,230,200,0.9)"; ctx.lineWidth = 2;
      ctx.beginPath(); ctx.arc(0, 0, r * 1.08, 0, 6.283); ctx.stroke();
      ctx.fillStyle = "#000"; ctx.beginPath(); ctx.arc(0, 0, r, 0, 6.283); ctx.fill();
      disk(true);
      ctx.restore();
      label("Glowing disk of gas, bent light, and darkness at the centre");
    }
  }
})();
