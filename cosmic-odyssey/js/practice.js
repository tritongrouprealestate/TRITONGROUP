/* Practice panels (for every section) and the deep-dive lesson reader (300 imported lessons). */
(function () {
  const LV = G.LEVELS, esc = G.esc;
  const st = () => (G.state.prac = G.state.prac || { total: 0, right: 0, sh: 0, by: {} });

  /* ================= PRACTICE PANEL ================= */
  G.practice = function (host, poolId, opts = {}) {
    const info = G.poolInfo(poolId);
    let lv = 0, cur = null, streak = 0;
    const seen = new Set();
    host.classList.add("practice");
    host.innerHTML = `
      <div class="pr-head">
        <div><h3>${opts.title || "Practice questions"}</h3>
        <p class="small muted"><b class="mono pr-total">${info.total.toLocaleString("en-IN")}</b> questions in this section. Easy ones build confidence, super-hard ones stretch you. Every answer is explained.</p></div>
        <div class="row pr-lv" role="group" aria-label="Difficulty">
          <button class="chip" type="button" data-lv="0" aria-pressed="true">All</button>
          ${[1, 2, 3, 4].map(l => info.by[l] ? `<button class="chip lvchip lv${l}" type="button" data-lv="${l}" aria-pressed="false">${LV[l]} <span class="mono">${info.by[l]}</span></button>` : "").join("")}
        </div>
      </div>
      <div class="panel pr-card" aria-live="polite"></div>`;
    const card = host.querySelector(".pr-card");
    host.querySelector(".pr-lv").addEventListener("click", e => {
      const b = e.target.closest("[data-lv]"); if (!b) return;
      lv = +b.dataset.lv;
      host.querySelectorAll("[data-lv]").forEach(x => x.setAttribute("aria-pressed", x === b));
      next();
    });
    function next() {
      cur = G.drawQ(poolId, lv, seen);
      if (!cur) { card.innerHTML = `<p class="muted">No questions at this level yet. Try another difficulty.</p>`; return; }
      seen.add(cur.key);
      const s = st(), mine = s.by[poolId] || { n: 0, r: 0 };
      card.innerHTML = `
        <div class="row pr-meta"><span class="lvpill lv${cur.lv}">${LV[cur.lv]}</span><span class="small muted">Streak <b class="mono">${streak}</b> · answered here <b class="mono">${mine.n}</b> · correct <b class="mono">${mine.r}</b></span></div>
        <p class="pr-q">${cur.q}</p>
        <div class="options pr-opts">${cur.o.map((o, i) => `<button class="opt" type="button" data-i="${i}"><span class="opt-k">${"ABCD"[i] || i + 1}</span>${o}</button>`).join("")}</div>
        <div class="pr-fb"></div>
        <div class="row pr-actions">
          <button class="btn" type="button" data-hint>Stuck? Explain the idea</button>
          <button class="btn primary" type="button" data-next>${opts.nextLabel || "Next question"}</button>
        </div>`;
      card.querySelector(".pr-opts").addEventListener("click", answer);
      card.querySelector("[data-next]").onclick = () => { next(); card.scrollIntoView({ block: "nearest", behavior: G.reduced ? "auto" : "smooth" }); };
      card.querySelector("[data-hint]").onclick = hint;
    }
    function hint() {
      const term = cur.c || (G.termsIn(cur.q.replace(/<[^>]+>/g, " "), 1)[0] || {}).t;
      if (term) G.explain(term); else G.search("");
    }
    function answer(e) {
      const b = e.target.closest(".opt"); if (!b || b.disabled) return;
      const pick = +b.dataset.i, ok = pick === cur.a;
      card.querySelectorAll(".opt").forEach(o => { o.disabled = true; const i = +o.dataset.i; if (i === cur.a) o.classList.add("right"); else if (o === b) o.classList.add("wrong"); });
      const s = st(), mine = s.by[poolId] = s.by[poolId] || { n: 0, r: 0 };
      s.total++; mine.n++;
      if (ok) { s.right++; mine.r++; streak++; if (cur.lv === 4) s.sh++; G.addXP(cur.lv * 3); }
      else { streak = 0; G.addXP(1); }
      G.save();
      if (s.right >= 100) G.badge("century");
      if (s.sh >= 10) G.badge("super-hard");
      if (poolId === "ready" && mine.r >= 30) G.badge("isro-ready");
      const whyPick = cur.whys && !ok ? `<p class="small"><b>Why ${"ABCD"[pick]} is not right:</b> ${cur.whys[pick]}</p>` : "";
      card.querySelector(".pr-fb").innerHTML = `
        <div class="fb ${ok ? "fb-ok" : "fb-no"}"><b>${ok ? (streak >= 5 ? `Brilliant, ${streak} in a row!` : "Correct!") : "Not quite."}</b> ${ok ? "" : `The answer is <b>${"ABCD"[cur.a]}</b>.`}</div>
        ${whyPick}
        ${cur.steps ? `<ol class="steps">${cur.steps.map(x => `<li>${x}</li>`).join("")}</ol>` : ""}
        ${cur.e ? `<p class="pr-e">${cur.e}</p>` : ""}
        ${cur.lesson ? `<button class="btn" type="button" data-lesson="${cur.lesson}">Read the full lesson</button>` : ""}`;
      const lb = card.querySelector("[data-lesson]"); if (lb) lb.onclick = () => G.lessonModal(+lb.dataset.lesson);
      card.querySelector("[data-next]").focus({ preventScroll: true });
    }
    next();
    return { next };
  };

  /* ================= LESSONS ================= */
  const SIMMAP = { photoelectric: "photo", interference: "ydse", lens: "lens", capacitor: "capacitor", blackbody: "blackbody", binding: "binding", magnetic: "lorentz", induction: "emi", projectile: "projectile", friction: "fma", oscillator: "shm", ohm: "ohm", coulomb: "invsq", inverseSquare: "invsq", vector: "vector", wave: "wave", debroglie: "debroglie", uncertainty: "uncert", tunneling: "tunnel", bell: "bell", qubit: "qubit", decay: "decay" };
  const lst = () => (G.state.lessons = G.state.lessons || {});
  const fmtText = text => String(text || "").split(/\n\s*\n/).map(block => {
    const lines = block.split("\n").filter(x => x.trim());
    if (!lines.length) return "";
    if (lines.every(x => x.trim().startsWith("- "))) return "<ul>" + lines.map(x => "<li>" + esc(x.trim().slice(2)) + "</li>").join("") + "</ul>";
    if (lines.length === 1 && /[=≥≤∝∫Σ√]|→/.test(lines[0]) && lines[0].length < 115) return `<div class="formula mono">${esc(lines[0])}</div>`;
    return "<p>" + lines.map(esc).join("<br>") + "</p>";
  }).join("");
  G.fmtText = fmtText;

  function doubts(L) {
    const f = L.f && L.f.length;
    return [
      ["What should I picture in my head?", L.kid.split("\n\n")[0]],
      ["What is the most common trap?", L.trap],
      ["Do I just memorise the formula?", f ? "No. First say in words what each quantity means and when the relationship applies. Then use the formula as a compact summary: " + L.f.slice(0, 2).join(" ; ") : "No. This lesson is mainly about an idea. Be able to explain the cause and effect in your own words and give an example."],
      ["Is this exact in every situation?", "Not automatically. Every physics model has limits. Watch for words like ideal, constant, small angle, negligible resistance, point particle or non-relativistic. They tell you when a simple equation can be trusted."],
      ["What is the exam-ready takeaway?", L.take + (f ? " Key relation: " + L.f[0] : "")]
    ];
  }

  G.renderLesson = function (host, L) {
    const done = lst()[L.n];
    host.innerHTML = `
      <div class="lesson" data-n="${L.n}">
        <div class="row lesson-meta"><span class="eyebrow">Lesson ${L.n} of 300</span><span class="lvpill lv${L.lv}">${L.dif}</span><span class="small muted">${esc(L.ch.replace(/^CLASS (XI|XII) — /, "Class $1 · "))}</span></div>
        <h3 class="lesson-q">${esc(L.q)}</h3>
        <div class="predict">
          <p class="small"><b>Predict first:</b> ${esc(L.mp)}</p>
          <div class="options l-opts">${L.mcq.map((m, i) => `<button class="opt" type="button" data-i="${i}"><span class="opt-k">${"ABCD"[i]}</span>${esc(m[0])}<span class="opt-why" hidden>${esc(m[1])}</span></button>`).join("")}</div>
          <p class="feedback l-fb" aria-live="polite"></p>
          <button class="btn" type="button" data-reveal>Skip and show the full lesson</button>
        </div>
        <div class="l-body" hidden>
          <div class="eli5"><span class="eyebrow">Kutush, imagine this</span>${fmtText(L.kid)}</div>
          <p class="whycare"><b>Why it matters:</b> ${esc(L.why)}</p>
          <div class="section-mini"><h4>The full answer</h4><div class="answer-body">${fmtText(L.ans)}</div></div>
          <div class="takeaway"><span class="eyebrow">Takeaway</span>${fmtText(L.take)}</div>
          ${L.f && L.f.length ? `<div class="section-mini"><h4>Formulas to know</h4>${L.f.map(f => `<div class="formula mono">${esc(f)}</div>`).join("")}</div>` : ""}
          <div class="trap"><span class="eyebrow">Common trap</span><p>${esc(L.trap)}</p></div>
          ${L.sim && SIMMAP[L.sim] ? `<div class="section-mini"><h4>Mini-lab</h4><p class="small muted">${esc(L.vis || "Change one slider at a time and explain the trend before moving on.")}</p><div class="l-sim"></div></div>` : L.vis ? `<p class="note small"><b>Picture it:</b> ${esc(L.vis)}</p>` : ""}
          <div class="section-mini"><h4>Doubts students usually have</h4><div class="doubts">${doubts(L).map(d => `<details class="qa"><summary><span class="qa-q">${esc(d[0])}</span><span class="qa-toggle" aria-hidden="true">+</span></summary><div class="qa-body">${fmtText(d[1])}</div></details>`).join("")}</div></div>
          <div class="section-mini"><h4>Words in this lesson</h4><div class="row">${G.termsIn(L.q + " " + L.ans, 10).map(t => `<button class="chip" type="button" data-term="${esc(t.t)}">${esc(t.t)}</button>`).join("") || `<span class="small muted">No special words here.</span>`}</div></div>
        </div>
      </div>`;
    const opts = host.querySelector(".l-opts"), body = host.querySelector(".l-body");
    const reveal = () => {
      if (!body.hidden) return;
      body.hidden = false; host.querySelector("[data-reveal]").hidden = true;
      const s = host.querySelector(".l-sim"); if (s && !s.dataset.m) { s.dataset.m = 1; G.mount(s, SIMMAP[L.sim]); }
      G.award("lesson-" + L.n, 4);
    };
    const mark = (pick, silent) => {
      opts.querySelectorAll(".opt").forEach(o => { const i = +o.dataset.i; o.disabled = true; o.classList.add("revealed"); o.querySelector(".opt-why").hidden = false; if (i === L.ok) o.classList.add("right"); else if (i === pick) o.classList.add("wrong"); });
      const ok = pick === L.ok;
      host.querySelector(".l-fb").innerHTML = silent ? `<b>Already attempted.</b> Review why each option is right or wrong.` : ok ? `<b class="ok">Nice prediction.</b> ${esc(L.mcq[pick][1])}` : `<b class="no">Useful miss.</b> ${esc(L.mcq[pick][1])} Compare it with the green option.`;
    };
    opts.addEventListener("click", e => {
      const b = e.target.closest(".opt"); if (!b || b.disabled) return;
      const pick = +b.dataset.i, ok = pick === L.ok;
      if (!lst()[L.n]) { lst()[L.n] = ok ? 1 : 2; G.addXP(ok ? 6 : 2); }
      G.save(); mark(pick); reveal(); checkBadges();
      host.dispatchEvent(new CustomEvent("lesson-done", { bubbles: true }));
    });
    host.querySelector("[data-reveal]").onclick = reveal;
    if (done) { mark(-1, true); reveal(); }
  };

  function checkBadges() {
    const s = lst(), n = Object.keys(s).length;
    if (n >= 50) G.badge("deep-diver");
    const q = (DATA.lessons || []).filter(L => L.sec.startsWith("quantum") && s[L.n]).length;
    if (q >= 40) G.badge("quantum-mind");
    if (q >= 76) G.award("quantum-done", 40, "Mission complete");
  }

  G.lessonModal = function (n) {
    const L = DATA.lessons.find(x => x.n === n); if (!L) return;
    G.modal.open(`<div id="gm-title" class="sr-only">Lesson ${n}</div><div class="lesson-modal"></div>`, "Deep-dive lesson");
    G.renderLesson(document.querySelector("#gm-body .lesson-modal"), L);
    G.linkify(document.getElementById("gm-body"));
  };

  /* lesson browser: searchable list + reader */
  G.lessonBrowser = function (host, lessons, opts = {}) {
    let dif = 0, q = "", open = opts.open || null;
    host.innerHTML = `
      <div class="lb-tools row">
        <div class="field lb-search"><label for="lb-q-${opts.id}">Search these lessons</label><input class="text-input" id="lb-q-${opts.id}" type="search" placeholder="e.g. tunnelling, torque, qubit" autocomplete="off"></div>
        <div class="row" role="group" aria-label="Difficulty">${[0, 1, 2, 3, 4].map(l => `<button class="chip ${l ? "lvchip lv" + l : ""}" type="button" data-d="${l}" aria-pressed="${l === 0}">${l ? LV[l] : "All"}</button>`).join("")}</div>
        <span class="eyebrow lb-count" style="margin-left:auto"></span>
      </div>
      <div class="lb ${opts.compact ? "lb-compact" : ""}">
        <div class="lb-list" role="list"></div>
        <div class="lb-reader panel"><p class="muted">Pick a lesson from the list. Each one starts with a prediction question, then explains the idea simply, step by step.</p></div>
      </div>`;
    const list = host.querySelector(".lb-list"), reader = host.querySelector(".lb-reader");
    const draw = () => {
      const s = lst();
      const shown = lessons.filter(L => (!dif || L.lv === dif) && (!q || (L.q + " " + L.ans).toLowerCase().includes(q)));
      const done = lessons.filter(L => s[L.n]).length;
      host.querySelector(".lb-count").textContent = `${done} of ${lessons.length} lessons done`;
      list.innerHTML = shown.map(L => `<button class="lb-item" type="button" role="listitem" data-n="${L.n}" aria-pressed="${L.n === open}">
        <span class="lb-state ${s[L.n] === 1 ? "ok" : s[L.n] ? "tried" : ""}" aria-label="${s[L.n] === 1 ? "answered correctly" : s[L.n] ? "attempted" : "not started"}"></span>
        <span class="lb-q">${esc(L.q)}</span><span class="lvpill lv${L.lv}">${L.dif}</span></button>`).join("") || `<p class="muted small">No lessons match. Clear the search or pick another difficulty.</p>`;
    };
    const show = n => {
      open = n; draw();
      const L = lessons.find(x => x.n === n); if (!L) return;
      G.renderLesson(reader, L);
      const i = lessons.indexOf(L);
      const nav = document.createElement("div"); nav.className = "row lb-nav";
      nav.innerHTML = `${i > 0 ? `<button class="btn" type="button" data-to="${lessons[i - 1].n}">← Previous lesson</button>` : "<span></span>"}${i < lessons.length - 1 ? `<button class="btn primary" type="button" data-to="${lessons[i + 1].n}">Next lesson →</button>` : ""}`;
      reader.appendChild(nav);
      nav.onclick = e => { const b = e.target.closest("[data-to]"); if (b) { show(+b.dataset.to); reader.scrollIntoView({ behavior: G.reduced ? "auto" : "smooth", block: "start" }); } };
    };
    list.addEventListener("click", e => { const b = e.target.closest("[data-n]"); if (b) { show(+b.dataset.n); if (innerWidth < 900) reader.scrollIntoView({ behavior: G.reduced ? "auto" : "smooth", block: "start" }); } });
    host.querySelector(".lb-tools").addEventListener("click", e => { const b = e.target.closest("[data-d]"); if (!b) return; dif = +b.dataset.d; host.querySelectorAll("[data-d]").forEach(x => x.setAttribute("aria-pressed", x === b)); draw(); });
    host.querySelector("input[type=search]").addEventListener("input", e => { q = e.target.value.trim().toLowerCase(); draw(); });
    reader.addEventListener("lesson-done", draw);
    draw();
    if (open) show(open);
  };


  /* ================= "Try it for real" links from myths and scientists to experiments ================= */
  const CAT = { "Moon & eclipses": "moon", "Moon & tides": "moon", Mars: "orbitchart", Planets: "kepler", "Small bodies": "kepler", "Sky & light": "emspec", "Sun & light": "blackbody", Stars: "hr", "Black holes": "gamma", "Gravity & spacetime": "gamma", "Motion & forces": "fma", "Circular motion": "orbitchart", "Reference frames": "vt", Forces: "fma", Friction: "fma", "Mass & inertia": "fma", "Work & energy": "pendulum", Rotation: "skater", "Falling through fluids": "terminal", "Projectile motion": "projectile", Gravity: "orbitchart", Relativity: "gamma", "Relativity & technology": "gamma", "Waves & sound": "wave", "Oscillations & waves": "standing", "Electromagnetic waves": "emspec", Optics: "lens", Light: "emspec", "Light & polarization": "ydse", "Thermal radiation": "blackbody", "Heat transfer": "heating", Thermodynamics: "pv", Microwaves: "emspec", "Quantum & temperature": "gas", Electricity: "circuit", "Electricity & water": "circuit", "Electricity & lightning": "fieldlines", Magnetism: "magmat", "Magnetism & Earth": "magmat", Materials: "stress", "Electromagnetic induction": "emi", "Electric circuits": "circuit", "Electric power": "ohm", "Atoms & quantum": "bohr", Photons: "photo", "Photoelectric effect": "photo", "Quantum entanglement": "bell", "Quantum information": "qubit", Radioactivity: "decay", Radiation: "emspec" };
  const KEY = [[/tunnel/i, "tunnel"], [/superposition|qubit|coin|cat\b/i, "qubit"], [/uncertain|heisenberg/i, "uncert"], [/half-life|radioactive/i, "decay"], [/moon/i, "moon"], [/hammer|feather|fall|drop/i, "projectile"], [/sound|echo/i, "wave"], [/time|clock|gps/i, "gamma"], [/black hole/i, "gamma"], [/venus|mercury|planet|jupiter/i, "kepler"], [/star/i, "hr"], [/sun\b|sunlight/i, "blackbody"], [/gravity|space station|iss|orbit/i, "orbitchart"], [/lightning|charge/i, "fieldlines"], [/magnet|compass/i, "magmat"], [/light|colour|color/i, "emspec"], [/big bang|galaxy|universe/i, "balloon"]];
  G.simFor = function (cat, text) {
    if (CAT[cat]) return CAT[cat];
    if (cat === "Quantum mechanics") { for (const [r, id] of KEY.slice(0, 3)) if (r.test(text)) return id; return "uncert"; }
    for (const [r, id] of KEY) if (r.test(text || "")) return id;
    return null;
  };
  G.HERO_SIM = { "Subrahmanyan Chandrasekhar": "lifetime", "Cecilia Payne-Gaposchkin": "blackbody", "Meghnad Saha": "bohr", "Jocelyn Bell Burnell": "skater", "Henrietta Swan Leavitt": "hr", "Vera Rubin": "kepler", "Kalpana Chawla": "orbitchart", "Ritu Karidhal": "hohmann", "Andrea Ghez": "kepler", "Isaac Newton": "projectile", "Albert Einstein": "gamma", "Aryabhata": "moon", "Stephen Hawking": "gamma", "Galileo Galilei": "pendulum", "Johannes Kepler": "kepler", "Marie Curie": "decay", "Edwin Hubble": "balloon", "C. V. Raman": "emspec", "Satyendra Nath Bose": "photo", "Vikram Sarabhai": "rocketeq", "A. P. J. Abdul Kalam": "rocketeq", "Nancy Grace Roman": "ydse", "Sunita Williams": "orbitchart" };

  /* ================= QUANTUM WORLD view ================= */
  const Q = G.views.quantum = {};
  const QLABS = [["photo", "Photoelectric effect"], ["debroglie", "Electron waves"], ["ydse", "Double slit"], ["uncert", "Uncertainty"], ["tunnel", "Tunnelling"], ["qubit", "Qubit"], ["bell", "Bell test"], ["bohr", "Atom energy levels"], ["decay", "Half-life"], ["blackbody", "Blackbody glow"]];
  Q.init = function () {
    const tabs = document.getElementById("qlab-tabs"), box = document.getElementById("qlab");
    const pick = id => { tabs.querySelectorAll("[data-lab]").forEach(b => b.setAttribute("aria-pressed", b.dataset.lab === id)); box.innerHTML = ""; G.mount(box, id); };
    tabs.innerHTML = QLABS.map(([id, n]) => `<button class="chip" type="button" data-lab="${id}" aria-pressed="false">${n}</button>`).join("");
    tabs.onclick = e => { const b = e.target.closest("[data-lab]"); if (b) pick(b.dataset.lab); };
    pick("uncert");
    const qs = DATA.lessons.filter(L => L.sec.startsWith("quantum"));
    G.lessonBrowser(document.getElementById("quantum-lessons"), qs, { id: "qw", open: qs[0].n });
  };
})();
