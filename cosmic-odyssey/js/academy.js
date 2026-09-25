/* Mission: CBSE Physics Academy (Class 11 and 12) + Mission: India in Space + topic quizzes */
(function () {
  const esc = G.esc;

  /* ================= ACADEMY ================= */
  const A = G.views.academy = {};
  let cls = 12, cur = null;
  const chapters = () => cls === 12 ? DATA.cbse12 : DATA.cbse11;
  const rec = (c, n) => { const k = c + "-" + n; G.state.cbse = G.state.cbse || {}; return G.state.cbse[k] = G.state.cbse[k] || { seen: {}, right: 0 }; };
  const totalAnswered = () => Object.values(G.state.cbse || {}).reduce((s, r) => s + Object.keys(r.seen).length, 0);
  const qCount = ch => ch.qs.reduce((s, q) => s + (q.t === "case" ? q.parts.length : 1), 0);

  A.init = function () {
    document.querySelectorAll("[data-cls]").forEach(b => b.addEventListener("click", () => { cls = +b.dataset.cls; cur = null; render(); }));
    document.getElementById("drill-btn").addEventListener("click", () => drill());
    render();
  };
  A.enter = function () {
    const h = location.hash.slice(1);
    render();
  };

  function render() {
    document.querySelectorAll("[data-cls]").forEach(b => b.setAttribute("aria-pressed", +b.dataset.cls === cls));
    document.getElementById("drill-btn").textContent = `Section A drill: 16 quick questions from Class ${cls}`;
    const grid = document.getElementById("chapter-grid");
    grid.innerHTML = chapters().map(ch => {
      const r = rec(cls, ch.n), done = Object.keys(r.seen).length, tot = qCount(ch);
      return `<button class="chapter" type="button" data-ch="${ch.n}" aria-pressed="${cur === ch.n}">
        <span class="ch-n mono">${String(ch.n).padStart(2, "0")}</span>
        <span class="ch-t">${ch.title}</span>
        <span class="ch-p"><i style="width:${done / tot * 100}%"></i></span></button>`;
    }).join("");
    grid.onclick = e => { const b = e.target.closest("[data-ch]"); if (b) openChapter(+b.dataset.ch); };
    const tot = totalAnswered();
    document.getElementById("academy-stats").textContent = `${tot} practice questions answered`;
    if (cur) openChapter(cur, true);
    else document.getElementById("chapter-view").innerHTML = `<p class="muted">Pick a chapter above. Each one has a simple explanation, a hands-on experiment, the key formulas, and board-style questions with full solutions.</p>`;
  }

  function openChapter(n, keepScroll) {
    cur = n;
    document.querySelectorAll("#chapter-grid [data-ch]").forEach(b => b.setAttribute("aria-pressed", +b.dataset.ch === n));
    const list = chapters(), i = list.findIndex(c => c.n === n), ch = list[i];
    const box = document.getElementById("chapter-view");
    box.innerHTML = `
      <div class="chapter-head">
        <span class="eyebrow">Class ${cls} · Chapter ${ch.n} · ${ch.unit}</span>
        <h2>${ch.title}</h2>
        ${ch.marks ? `<span class="pill">${ch.marks}</span>` : ""}
      </div>
      <div class="eli5"><span class="eyebrow">Kutush, imagine this</span>${ch.kid.map(p => `<p>${p}</p>`).join("")}</div>
      <div class="section-label"><h2>Try it yourself</h2><span class="eyebrow">Experiment</span></div>
      <div id="ch-sim"></div>
      <div class="split" style="margin-top:22px">
        <div class="panel stack"><h3>Key formulas</h3><dl class="formulas">${ch.formulas.map(f => `<div><dt class="mono">${f[0]}</dt><dd>${f[1]}</dd></div>`).join("")}</dl></div>
        <div class="panel stack"><h3>Space connection</h3><p class="muted">${ch.space}</p></div>
      </div>
      <div class="section-label"><h2>Board practice</h2><span class="eyebrow" id="ch-count"></span></div>
      <div class="qlist" id="qlist"></div>
      <div class="row" style="margin-top:22px;justify-content:space-between">
        ${i > 0 ? `<button class="btn" type="button" data-nav="${list[i - 1].n}">← ${list[i - 1].title}</button>` : "<span></span>"}
        ${i < list.length - 1 ? `<button class="btn primary" type="button" data-nav="${list[i + 1].n}">${list[i + 1].title} →</button>` : ""}
      </div>`;
    if (ch.sim) G.mount(document.getElementById("ch-sim"), ch.sim);
    box.querySelectorAll("[data-nav]").forEach(b => b.onclick = () => { openChapter(+b.dataset.nav); box.scrollIntoView({ behavior: G.reduced ? "auto" : "smooth" }); });
    renderQs(ch);
    if (!keepScroll) box.scrollIntoView({ behavior: G.reduced ? "auto" : "smooth" });
    G.award(`ch-${cls}-${n}`, 5, `Opened: ${ch.title}`);
  }

  function renderQs(ch) {
    const r = rec(cls, ch.n);
    const list = document.getElementById("qlist");
    let idx = 0;
    const html = ch.qs.map(q => {
      if (q.t === "case") {
        const start = idx; idx += q.parts.length;
        return `<div class="panel q"><span class="qtype">Case study · 4 marks</span><p class="passage">${q.p}</p>
          ${q.parts.map((pt, j) => mcqHTML(start + j, pt.q, pt.o, `(${"abcd"[j]}) `)).join("")}</div>`;
      }
      const k = idx++;
      if (q.t === "mcq") return `<div class="panel q"><span class="qtype">MCQ · 1 mark</span>${mcqHTML(k, q.q, q.o)}</div>`;
      if (q.t === "ar") return `<div class="panel q"><span class="qtype">Assertion and reason · 1 mark</span>
        <p><b>Assertion (A):</b> ${q.A}</p><p><b>Reason (R):</b> ${q.R}</p>${mcqHTML(k, "", DATA.AR_OPTS)}</div>`;
      return `<div class="panel q" data-k="${k}"><span class="qtype">${q.t === "num" ? "Numerical · 2 to 3 marks" : "Short answer · 2 marks"}</span>
        <p class="qq">${q.q}</p>
        <div class="sol" hidden>${q.s ? `<p class="mono small">${q.s}</p>` : ""}<p><b>Answer:</b> ${q.ans}</p>
          <div class="row self"><span class="small muted">Did you get it?</span><button class="chip" type="button" data-self="1">Yes, got it</button><button class="chip" type="button" data-self="0">Not yet</button></div></div>
        <button class="btn" type="button" data-show>Try it on paper, then show the solution</button></div>`;
    }).join("");
    list.innerHTML = html;
    count(ch);

    const flat = [];
    ch.qs.forEach(q => { if (q.t === "case") q.parts.forEach(p => flat.push(p)); else if (q.t === "mcq") flat.push(q); else if (q.t === "ar") flat.push({ a: q.a, e: q.e }); else flat.push(q); });

    list.onclick = e => {
      const opt = e.target.closest(".opt[data-k]");
      if (opt && !opt.disabled) {
        const k = +opt.dataset.k, pick = +opt.dataset.i, q = flat[k], ok = pick === q.a;
        const group = list.querySelectorAll(`.opt[data-k="${k}"]`);
        group.forEach(o => { o.disabled = true; if (+o.dataset.i === q.a) o.classList.add("right"); else if (o === opt) o.classList.add("wrong"); });
        const fb = list.querySelector(`.feedback[data-k="${k}"]`);
        fb.innerHTML = `<b class="${ok ? "ok" : "no"}">${ok ? "Correct!" : "Not quite."}</b> ${q.e}`;
        mark(ch, k, ok);
        return;
      }
      const show = e.target.closest("[data-show]");
      if (show) { const box = show.closest(".q"); box.querySelector(".sol").hidden = false; show.remove(); return; }
      const self = e.target.closest("[data-self]");
      if (self) {
        const box = self.closest(".q"), k = +box.dataset.k;
        box.querySelector(".self").innerHTML = self.dataset.self === "1" ? `<span class="small" style="color:var(--good)">Brilliant. Marked as solved.</span>` : `<span class="small muted">No problem. Read the solution once more and try again tomorrow.</span>`;
        mark(ch, k, self.dataset.self === "1");
      }
    };
  }

  function mcqHTML(k, q, opts, prefix) {
    return `${q ? `<p class="qq">${prefix || ""}${q}</p>` : ""}<div class="options">${opts.map((o, i) => `<button class="opt" type="button" data-k="${k}" data-i="${i}">${"ABCD"[i]}. ${o}</button>`).join("")}</div><p class="feedback" data-k="${k}" aria-live="polite"></p>`;
  }

  function mark(ch, k, ok) {
    const r = rec(cls, ch.n);
    if (!r.seen[k]) { r.seen[k] = ok ? 1 : 2; if (ok) { r.right++; G.addXP(8); } else G.addXP(2); }
    G.save();
    count(ch);
    checkBadges();
    const tile = document.querySelector(`#chapter-grid [data-ch="${ch.n}"] .ch-p i`);
    if (tile) tile.style.width = Object.keys(r.seen).length / qCount(ch) * 100 + "%";
    document.getElementById("academy-stats").textContent = `${totalAnswered()} practice questions answered`;
  }

  function count(ch) {
    const r = rec(cls, ch.n);
    document.getElementById("ch-count").textContent = `${Object.keys(r.seen).length} of ${qCount(ch)} tried · ${r.right} correct`;
  }

  function checkBadges() {
    const all = (c, list) => list.every(ch => Object.keys(rec(c, ch.n).seen).length >= 4);
    if (all(11, DATA.cbse11)) G.badge("class11");
    if (all(12, DATA.cbse12)) G.badge("class12");
    if (totalAnswered() >= 100) G.badge("board-ready");
    if (G.state.badges.class11 && G.state.badges.class12) G.award("academy-done", 40, "Mission complete");
  }

  /* Section A drill: 16 one-mark questions (MCQ + assertion-reason) */
  function drill() {
    cur = null;
    document.querySelectorAll("#chapter-grid [data-ch]").forEach(b => b.setAttribute("aria-pressed", false));
    const pool = [];
    chapters().forEach(ch => ch.qs.forEach(q => {
      if (q.t === "mcq") pool.push({ q: q.q, o: q.o, a: q.a, e: q.e, ch: ch.title });
      if (q.t === "ar") pool.push({ q: `<b>A:</b> ${q.A}<br><b>R:</b> ${q.R}`, o: DATA.AR_OPTS, a: q.a, e: q.e, ch: ch.title, ar: true });
    }));
    const ar = G.shuffle(pool.filter(p => p.ar)).slice(0, 2), mcq = G.shuffle(pool.filter(p => !p.ar)).slice(0, 14);
    const qs = G.shuffle(mcq).concat(ar);
    let i = 0, score = 0;
    const box = document.getElementById("chapter-view");
    box.scrollIntoView({ behavior: G.reduced ? "auto" : "smooth" });
    const ask = () => {
      const q = qs[i];
      box.innerHTML = `<div class="panel stack" style="max-width:780px">
        <div class="row" style="justify-content:space-between"><span class="eyebrow">Section A drill · Q${i + 1} of ${qs.length} · ${esc(q.ch)}</span><span class="xp-num">${score} marks</span></div>
        <div class="xp-track" style="width:100%"><div class="xp-fill" style="width:${i / qs.length * 100}%"></div></div>
        <p class="qq" style="font-size:1.1rem">${q.q}</p>
        <div class="options">${q.o.map((o, j) => `<button class="opt" type="button" data-j="${j}">${"ABCD"[j]}. ${o}</button>`).join("")}</div>
        <div id="d-fb" class="feedback"></div></div>`;
      box.querySelector(".options").onclick = e => {
        const b = e.target.closest("[data-j]"); if (!b || b.disabled) return;
        const ok = +b.dataset.j === q.a; if (ok) { score++; G.addXP(4); }
        box.querySelectorAll(".opt").forEach(o => { o.disabled = true; if (+o.dataset.j === q.a) o.classList.add("right"); else if (o === b) o.classList.add("wrong"); });
        const last = i === qs.length - 1;
        box.querySelector("#d-fb").innerHTML = `<p><b class="${ok ? "ok" : "no"}">${ok ? "Correct." : "Not this time."}</b> ${q.e}</p><button class="btn primary" type="button" id="d-next" style="margin-top:10px">${last ? "See my score" : "Next"}</button>`;
        box.querySelector("#d-next").onclick = () => { if (last) done(); else { i++; ask(); } };
      };
    };
    const done = () => {
      const best = G.state.flags["drill" + cls] || 0;
      G.state.flags["drill" + cls] = Math.max(best, score); G.save();
      box.innerHTML = `<div class="panel stack" style="max-width:640px"><span class="eyebrow">Section A drill complete</span>
        <p style="font-family:var(--display);font-size:clamp(3rem,10vw,5rem);line-height:1">${score}<span class="muted" style="font-size:.5em"> / 16</span></p>
        <p class="muted">${score >= 14 ? "Board-exam ready for Section A!" : score >= 10 ? "Good. Open the chapters where you slipped and try their experiments." : "Every mistake here is one you won't make in the exam. Try the chapters one by one."}</p>
        <div class="row"><button class="btn primary" type="button" id="d-again">Another drill</button></div></div>`;
      box.querySelector("#d-again").onclick = drill;
    };
    ask();
  }

  /* ================= INDIA IN SPACE ================= */
  const I = G.views.isro = {};
  const DEST = { sub: ["Sounding rocket (up and down)", 200], leo: ["Low Earth orbit", 400], geo: ["Geostationary orbit", 35786], moon: ["The Moon", 384400], l1: ["Sun-Earth L1 point", 1.5e6], mars: ["Mars", 2.25e8], none: ["On the ground", 1] };
  let sim = null;
  I.init = function () {
    const list = document.getElementById("isro-list");
    list.innerHTML = DATA.isro.map((m, i) => `<button class="isro-item" type="button" data-m="${i}">
      <span class="mono yr">${m.y}</span><span class="nm">${m.n}</span><span class="small muted">${DEST[m.d][0]}</span></button>`).join("");
    list.onclick = e => { const b = e.target.closest("[data-m]"); if (b) pick(+b.dataset.m); };
    sim = G.sim(document.getElementById("isro-sim"), {
      id: "isro", name: "India's missions, by distance", ratio: 0.55, mratio: 0.95,
      init(p, st) { st.d = "moon"; st.t = 0; },
      draw(ctx, W, H, p, st, dt, t) {
        const { bg, text, dot, glow } = G.simkit;
        bg(ctx, W, H);
        st.t = Math.min(1, st.t + dt * 0.5);
        const x0 = 40, x1 = W - 40, y = H * 0.55;
        const X = km => x0 + (x1 - x0) * (Math.log10(Math.max(km, 100)) - 2) / (Math.log10(2.25e8) - 2);
        ctx.strokeStyle = "rgba(170,186,255,0.25)"; ctx.setLineDash([3, 5]); ctx.beginPath(); ctx.moveTo(x0, y); ctx.lineTo(x1, y); ctx.stroke(); ctx.setLineDash([]);
        glow(ctx, x0, y, 26, "rgba(79,134,217,0.8)"); dot(ctx, x0, y, 12, "#4f86d9");
        text(ctx, "Earth", x0, y + 32, null, "center");
        Object.entries(DEST).forEach(([k, d]) => {
          if (k === "none") return;
          const x = X(d[1]), on = k === st.d;
          dot(ctx, x, y, on ? 7 : 4, on ? "#ffd27a" : "rgba(169,198,255,0.7)");
          if (k === "sub") { ctx.save(); ctx.translate(x, y + 16); ctx.rotate(0.6); text(ctx, d[0], 0, 0, on ? "#ffd27a" : "rgba(169,198,255,0.7)"); ctx.restore(); }
          else { ctx.save(); ctx.translate(x, y - 14); ctx.rotate(-0.6); text(ctx, d[0], 0, 0, on ? "#ffd27a" : "rgba(169,198,255,0.7)"); ctx.restore(); }
        });
        const target = X(DEST[st.d][1]);
        if (st.d !== "none") {
          const e = 1 - Math.pow(1 - st.t, 3);
          const rx = x0 + (target - x0) * e, ry = y - Math.sin(e * Math.PI) * H * 0.3;
          glow(ctx, rx, ry, 14, "rgba(255,162,94,0.8)");
          ctx.fillStyle = "#fff"; ctx.beginPath(); ctx.arc(rx, ry, 4, 0, 7); ctx.fill();
        }
        text(ctx, "distance on a log scale: each step is 10× farther", 12, H - 10);
      },
      info(p, st) { const d = DEST[st.d]; return `<div><b>${d[0]}</b><span>destination</span></div><div><b>${d[1] > 1 ? G.fmt(d[1]) + " km" : "–"}</b><span>from Earth's surface (typical)</span></div>`; }
    });
    pick(11);
  };
  function pick(i) {
    const m = DATA.isro[i];
    document.querySelectorAll(".isro-item").forEach((b, j) => b.setAttribute("aria-pressed", j === i));
    document.getElementById("isro-detail").innerHTML = `<span class="eyebrow">${m.y}</span><h3 style="font-family:var(--display);font-weight:400;font-size:2rem;line-height:1.05">${m.n}</h3><p>${m.kid}</p><p class="note small">${m.fact}</p>`;
    if (sim) { sim.st.d = m.d; sim.st.t = 0; sim.refresh(); }
    G.state.isro = G.state.isro || {};
    G.state.isro[i] = 1; G.save();
    if (Object.keys(G.state.isro).length >= 10) G.badge("isro");
    if (Object.keys(G.state.isro).length >= DATA.isro.length) G.award("isro-done", 30, "Mission complete");
  }
})();
