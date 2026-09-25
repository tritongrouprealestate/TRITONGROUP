/* Mission 3: Sky atlas. Explore, draw and name constellations. */
(function () {
  const M = G.views.sky = {};
  let cv, ctx, W, H, mode = "explore", ci = 0, pts = [], bg = [], anim = 0;
  let drawn = new Set(), sel = -1, flash = null, hintLine = null;
  let nameQ = null, streak = 0;
  const C = DATA.constellations;
  const temps = { Betelgeuse: 3500, Rigel: 12100, Bellatrix: 22000, Antares: 3600, Aldebaran: 3900, Gacrux: 3600, Dubhe: 4700, Kochab: 4000,
    Schedar: 4500, Deneb: 8500, Vega: 9600, Regulus: 12500, Albireo: 4400, Elnath: 13800, Mimosa: 27000, Acrux: 28000, Polaris: 6000,
    Pherkad: 8300, Denebola: 8500, Algieba: 4500, Sadr: 5800, Shaula: 25000, Sargas: 7200, Alkaid: 15500, Mizar: 9000, Alioth: 9000 };

  M.init = function () {
    cv = document.getElementById("sky-canvas");
    document.querySelectorAll("[data-skymode]").forEach(b => b.addEventListener("click", () => setMode(b.dataset.skymode)));
    document.getElementById("const-list").addEventListener("click", e => {
      const b = e.target.closest("button[data-c]"); if (!b) return; select(+b.dataset.c);
    });
    cv.addEventListener("click", onClick);
    size();
    addEventListener("resize", () => { if (G.current === "sky") { size(); layout(); } });
    select(0);
  };
  M.enter = function () { size(); layout(); G.loop("sky", draw); };

  function size() { const r = G.fit(cv, innerWidth < 860 ? 0.9 : 0.82); ctx = r.ctx; W = r.w; H = r.h; }

  /* gnomonic projection centred on the constellation, north up, east left */
  function project(c) {
    const v = c.stars.map(([, ra, dec]) => {
      const a = ra * 15 * Math.PI / 180, d = dec * Math.PI / 180;
      return [Math.cos(d) * Math.cos(a), Math.cos(d) * Math.sin(a), Math.sin(d)];
    });
    let m = v.reduce((s, p) => [s[0] + p[0], s[1] + p[1], s[2] + p[2]], [0, 0, 0]);
    const L = Math.hypot(...m); m = m.map(x => x / L);
    const a0 = Math.atan2(m[1], m[0]), d0 = Math.asin(m[2]);
    const e = [-Math.sin(a0), Math.cos(a0), 0];
    const n = [-Math.sin(d0) * Math.cos(a0), -Math.sin(d0) * Math.sin(a0), Math.cos(d0)];
    return v.map(p => {
      const dd = p[0] * m[0] + p[1] * m[1] + p[2] * m[2];
      return [-(p[0] * e[0] + p[1] * e[1]) / dd, -(p[0] * n[0] + p[1] * n[1] + p[2] * n[2]) / dd];
    });
  }

  function layout() {
    const c = C[ci], raw = project(c);
    const xs = raw.map(p => p[0]), ys = raw.map(p => p[1]);
    const minX = Math.min(...xs), maxX = Math.max(...xs), minY = Math.min(...ys), maxY = Math.max(...ys);
    const pad = Math.min(W, H) * 0.14;
    const sc = Math.min((W - 2 * pad) / Math.max(maxX - minX, 1e-6), (H - 2 * pad) / Math.max(maxY - minY, 1e-6));
    const ox = (W - (maxX - minX) * sc) / 2, oy = (H - (maxY - minY) * sc) / 2;
    pts = raw.map((p, i) => {
      const [name, , , mag] = c.stars[i];
      return { x: ox + (p[0] - minX) * sc, y: oy + (p[1] - minY) * sc, name, mag, col: G.kelvinRGB(temps[name] || 9000) };
    });
    let seed = ci * 9301 + 49297;
    const rnd = () => (seed = (seed * 9301 + 49297) % 233280) / 233280;
    bg = [];
    for (let i = 0; i < 220; i++) bg.push({ x: rnd() * W, y: rnd() * H, s: rnd() * 1.1 + 0.2, a: rnd() * 0.5 + 0.1, t: rnd() * 6 });
  }

  function select(i) {
    ci = i; anim = 0; drawn = new Set(); sel = -1; hintLine = null; flash = null;
    layout();
    renderList(); renderSide();
  }

  function setMode(m) {
    mode = m;
    document.querySelectorAll("[data-skymode]").forEach(b => b.setAttribute("aria-pressed", b.dataset.skymode === m));
    if (m === "name") newNameQ(); else select(ci);
    renderList(); renderSide();
  }

  function renderList() {
    const list = document.getElementById("const-list");
    list.hidden = mode === "name";
    list.innerHTML = C.map((c, i) => `<button class="chip" type="button" data-c="${i}" aria-pressed="${i === ci}">${c.name}${G.state.built[c.id] ? '<span class="done-dot" aria-label="drawn"></span>' : ""}</button>`).join("");
  }

  function renderSide() {
    const side = document.getElementById("sky-side"), c = C[ci];
    if (mode === "explore") {
      G.award("see-" + c.id, 5, c.name);
      side.innerHTML = `<span class="eyebrow">${c.meaning}</span><h2 style="font-size:2.4rem">${c.name}</h2>
        <dl class="kv">${c.indian ? `<dt>Indian sky</dt><dd>${c.indian}</dd>` : ""}<dt>Best seen</dt><dd>${c.best}</dd><dt>Look</dt><dd>${c.dir}</dd>
        <dt>Brightest</dt><dd>${[...c.stars].sort((a, b) => a[3] - b[3])[0][0]}</dd></dl>
        <ul class="facts">${c.facts.map(f => `<li>${f}</li>`).join("")}</ul>
        <button class="btn" type="button" id="try-draw">Draw ${c.name} from memory</button>`;
      side.querySelector("#try-draw").onclick = () => setMode("build");
    } else if (mode === "build") {
      const total = c.lines.length;
      const done = G.state.built[c.id];
      side.innerHTML = `<span class="eyebrow">Draw it</span><h2 style="font-size:2.4rem">${c.name}</h2>
        <p class="muted">Tap one star, then another, to connect them. Get all <b>${total}</b> lines right.</p>
        <div class="readout"><div><b id="b-prog">${drawn.size} / ${total}</b><span>lines drawn</span></div><div><b>${Object.keys(G.state.built).length} / 10</b><span>constellations mastered</span></div></div>
        <p class="feedback" id="b-fb">${done ? "You have drawn this one before. Try it again or pick another." : "Start anywhere."}</p>
        <div class="row"><button class="btn" type="button" id="b-hint">Show a hint</button><button class="chip" type="button" id="b-reset">Clear</button></div>`;
      side.querySelector("#b-hint").onclick = () => {
        const next = c.lines.find(l => !drawn.has(key(l[0], l[1])));
        if (next) { hintLine = next; setTimeout(() => { hintLine = null; }, 1600); }
      };
      side.querySelector("#b-reset").onclick = () => { drawn = new Set(); sel = -1; renderSide(); };
    } else {
      if (!nameQ) newNameQ();
      side.innerHTML = `<span class="eyebrow">Name it · streak ${streak}</span><h2 style="font-size:2.2rem">Which pattern is this?</h2>
        <div class="options" id="n-opts">${nameQ.opts.map(i => `<button class="opt" type="button" data-o="${i}">${C[i].name}</button>`).join("")}</div>
        <p class="feedback" id="n-fb">Eight in a row earns a badge.</p>`;
      side.querySelector("#n-opts").addEventListener("click", answerName);
    }
  }

  function newNameQ() {
    let target;
    do { target = Math.random() * C.length | 0; } while (nameQ && target === nameQ.target && C.length > 1);
    const others = G.shuffle(C.map((_, i) => i).filter(i => i !== target)).slice(0, 3);
    nameQ = { target, opts: G.shuffle([target, ...others]), answered: false };
    ci = target; anim = 0; layout();
  }

  function answerName(e) {
    const b = e.target.closest("button[data-o]"); if (!b || nameQ.answered) return;
    nameQ.answered = true;
    const pick = +b.dataset.o, ok = pick === nameQ.target;
    document.querySelectorAll("#n-opts .opt").forEach(o => {
      o.disabled = true;
      if (+o.dataset.o === nameQ.target) o.classList.add("right"); else if (o === b) o.classList.add("wrong");
    });
    const c = C[nameQ.target];
    if (ok) { streak++; G.addXP(5); if (streak >= 8) G.badge("sky-namer"); } else streak = 0;
    document.getElementById("n-fb").innerHTML = `<b class="${ok ? "ok" : "no"}">${ok ? "Correct" : "Not quite"}.</b> This is ${c.name}${c.indian ? ` (${c.indian.split(".")[0]})` : ""}. Streak: ${streak}. ` +
      `<button class="btn" type="button" id="n-next" style="margin-top:10px">Next pattern</button>`;
    document.getElementById("n-next").onclick = () => { newNameQ(); renderSide(); };
  }

  const key = (a, b) => a < b ? a + "-" + b : b + "-" + a;

  function onClick(e) {
    if (mode !== "build") return;
    const r = cv.getBoundingClientRect();
    const x = (e.clientX - r.left) * (W / r.width), y = (e.clientY - r.top) * (H / r.height);
    let best = -1, bd = 30;
    pts.forEach((p, i) => { const d = Math.hypot(p.x - x, p.y - y); if (d < bd) { bd = d; best = i; } });
    if (best < 0) return;
    if (sel < 0 || sel === best) { sel = sel === best ? -1 : best; return; }
    const c = C[ci], k = key(sel, best);
    const valid = c.lines.some(l => key(l[0], l[1]) === k);
    const fb = document.getElementById("b-fb");
    if (valid && !drawn.has(k)) {
      drawn.add(k);
      fb.innerHTML = `<b class="ok">Nice.</b> ${pts[sel].name} to ${pts[best].name}.`;
      document.getElementById("b-prog").textContent = `${drawn.size} / ${c.lines.length}`;
      if (drawn.size === c.lines.length) complete();
    } else if (valid) {
      fb.textContent = "Already drawn. Find a new line.";
    } else {
      flash = { a: sel, b: best, t: 0.6 };
      fb.innerHTML = `<b class="no">Not a line in ${c.name}.</b> Try a different pair.`;
    }
    sel = best;
  }

  function complete() {
    const c = C[ci];
    const first = !G.state.built[c.id];
    G.state.built[c.id] = 1; G.save();
    if (first) G.addXP(25, `${c.name} drawn`);
    const n = Object.keys(G.state.built).length;
    if (n >= 3) G.badge("sky-builder");
    if (n >= C.length) { G.badge("sky-master"); G.award("sky-done", 30, "Mission complete"); }
    renderList();
    setTimeout(() => {
      const nextI = C.findIndex(x => !G.state.built[x.id]);
      document.getElementById("b-fb").innerHTML = `<b class="ok">${c.name} complete!</b> ` +
        (nextI >= 0 ? `<button class="btn" type="button" id="b-next" style="margin-top:10px">Next: ${C[nextI].name}</button>` : "You have mastered the whole atlas.");
      const nb = document.getElementById("b-next"); if (nb) nb.onclick = () => select(nextI);
      sel = -1;
    }, 50);
  }

  function draw(dt, t) {
    anim = Math.min(1, anim + dt * 0.9);
    ctx.fillStyle = "#050814"; ctx.fillRect(0, 0, W, H);
    // faint RA/Dec style grid, like a printed star chart
    ctx.strokeStyle = "rgba(134,168,255,0.06)"; ctx.lineWidth = 1;
    for (let x = 0; x < W; x += 60) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke(); }
    for (let y = 0; y < H; y += 60) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke(); }
    for (const s of bg) { ctx.fillStyle = `rgba(210,220,255,${s.a * (0.7 + 0.3 * Math.sin(t * 1.5 + s.t))})`; ctx.beginPath(); ctx.arc(s.x, s.y, s.s, 0, 6.283); ctx.fill(); }

    const c = C[ci];
    ctx.lineCap = "round";
    if (mode === "explore" || mode === "name") {
      const n = c.lines.length;
      c.lines.forEach((l, i) => {
        const p = G.clamp(anim * n - i, 0, 1); if (p <= 0) return;
        const a = pts[l[0]], b = pts[l[1]];
        ctx.strokeStyle = "rgba(169,198,255,0.55)"; ctx.lineWidth = 1.4;
        ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(a.x + (b.x - a.x) * p, a.y + (b.y - a.y) * p); ctx.stroke();
      });
    } else {
      drawn.forEach(k => {
        const [i, j] = k.split("-").map(Number);
        ctx.strokeStyle = "rgba(255,210,122,0.8)"; ctx.lineWidth = 2;
        ctx.beginPath(); ctx.moveTo(pts[i].x, pts[i].y); ctx.lineTo(pts[j].x, pts[j].y); ctx.stroke();
      });
      if (hintLine) {
        ctx.setLineDash([4, 6]); ctx.strokeStyle = "rgba(169,198,255,0.6)"; ctx.lineWidth = 1.5;
        ctx.beginPath(); ctx.moveTo(pts[hintLine[0]].x, pts[hintLine[0]].y); ctx.lineTo(pts[hintLine[1]].x, pts[hintLine[1]].y); ctx.stroke(); ctx.setLineDash([]);
      }
      if (flash) {
        flash.t -= dt;
        ctx.strokeStyle = `rgba(255,122,122,${Math.max(0, flash.t)})`; ctx.lineWidth = 2;
        ctx.beginPath(); ctx.moveTo(pts[flash.a].x, pts[flash.a].y); ctx.lineTo(pts[flash.b].x, pts[flash.b].y); ctx.stroke();
        if (flash.t <= 0) flash = null;
      }
    }

    pts.forEach((p, i) => {
      const r = Math.max(1.8, 5.4 - p.mag * 0.9);
      if (p.name === "Pleiades") {
        const off = [[0, 0], [-7, -4], [6, -5], [-3, 6], [8, 3], [-9, 3], [2, -9]];
        off.forEach(([dx, dy]) => { ctx.fillStyle = "rgba(190,210,255,0.9)"; ctx.beginPath(); ctx.arc(p.x + dx, p.y + dy, 1.8, 0, 6.283); ctx.fill(); });
      } else {
        const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, r * 4);
        g.addColorStop(0, G.rgb(p.col, 0.9)); g.addColorStop(1, G.rgb(p.col, 0));
        ctx.fillStyle = g; ctx.beginPath(); ctx.arc(p.x, p.y, r * 4, 0, 6.283); ctx.fill();
        ctx.fillStyle = "#fff"; ctx.beginPath(); ctx.arc(p.x, p.y, r, 0, 6.283); ctx.fill();
      }
      if (mode === "build" && i === sel) {
        ctx.strokeStyle = "#ffd27a"; ctx.lineWidth = 1.5;
        ctx.beginPath(); ctx.arc(p.x, p.y, 13 + Math.sin(t * 5) * 2, 0, 6.283); ctx.stroke();
      }
      if (mode === "explore" && anim > 0.6 && p.mag < 3.1) {
        ctx.font = "500 11px 'JetBrains Mono', monospace"; ctx.fillStyle = "rgba(220,228,255,0.75)";
        ctx.fillText(p.name, p.x + 9, p.y - 8);
      }
    });
    ctx.font = "500 11px 'JetBrains Mono', monospace"; ctx.fillStyle = "rgba(160,170,200,0.6)";
    ctx.fillText("N ↑   E ←", 12, 20);
  }
})();
