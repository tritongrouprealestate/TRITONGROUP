/* Cosmic Odyssey: state, XP, badges, routing, shared helpers */
(function () {
  const KEY = "cosmic-odyssey-v1";
  const blank = () => ({ name: "Kutush", xp: 0, badges: {}, awarded: {}, flags: {}, built: {}, heroes: {}, puzzles: {}, speeds: {}, mythsRight: 0, mythsSeen: 0 });

  function load() {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) return Object.assign(blank(), JSON.parse(raw));
    } catch (e) { /* storage blocked: play without saving */ }
    return blank();
  }

  const G = window.G = {
    state: load(),
    views: {},
    current: null,
    reduced: window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches
  };

  G.save = function () {
    try { localStorage.setItem(KEY, JSON.stringify(G.state)); } catch (e) {}
  };

  G.reset = function () {
    G.state = blank();
    G.save();
    location.hash = "";
    location.reload();
  };

  /* ---------- XP and ranks ---------- */
  G.rankFor = function (xp) {
    let r = DATA.ranks[0], next = null;
    for (let i = 0; i < DATA.ranks.length; i++) {
      if (xp >= DATA.ranks[i].xp) { r = DATA.ranks[i]; next = DATA.ranks[i + 1] || null; }
    }
    return { rank: r, next };
  };

  G.addXP = function (n, why) {
    const before = G.rankFor(G.state.xp).rank.name;
    G.state.xp += n;
    G.save();
    G.renderBar();
    if (why) G.toast(`<b>+${n} XP</b> ${why}`);
    const after = G.rankFor(G.state.xp).rank.name;
    if (after !== before) G.toast(`New rank: <b>${after}</b>`, true);
  };

  /* award once per key */
  G.award = function (key, n, why) {
    if (G.state.awarded[key]) return false;
    G.state.awarded[key] = 1;
    G.addXP(n, why);
    return true;
  };

  G.badge = function (id) {
    if (G.state.badges[id]) return;
    const b = DATA.badges.find(x => x.id === id);
    if (!b) return;
    G.state.badges[id] = Date.now();
    G.save();
    G.toast(`Badge unlocked: <b>${b.name}</b>`, true);
    G.addXP(40);
    if (G.current === "home") G.renderHome();
  };

  G.flag = function (k) { if (!G.state.flags[k]) { G.state.flags[k] = 1; G.save(); } };

  /* ---------- Toasts ---------- */
  G.toast = function (html, special) {
    const box = document.getElementById("toasts");
    const t = document.createElement("div");
    t.className = "toast" + (special ? " badge-toast" : "");
    t.innerHTML = html;
    box.appendChild(t);
    while (box.children.length > 4) box.firstChild.remove();
    setTimeout(() => { t.style.opacity = "0"; t.style.transition = "opacity .4s"; }, 2600);
    setTimeout(() => t.remove(), 3100);
  };

  G.renderBar = function () {
    const { rank, next } = G.rankFor(G.state.xp);
    document.getElementById("rank-name").textContent = rank.name;
    document.getElementById("xp-num").textContent = `${G.state.xp} XP`;
    const pct = next ? (G.state.xp - rank.xp) / (next.xp - rank.xp) : 1;
    document.getElementById("xp-fill").style.width = Math.max(3, pct * 100) + "%";
  };

  /* ---------- Helpers ---------- */
  G.esc = s => String(s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  G.shuffle = a => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.random() * (i + 1) | 0; [a[i], a[j]] = [a[j], a[i]]; } return a; };
  G.clamp = (v, a, b) => Math.max(a, Math.min(b, v));

  /* Size a canvas for crisp drawing. Height follows its CSS aspect. */
  G.fit = function (canvas, ratio) {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const w = canvas.clientWidth || canvas.parentElement.clientWidth || 600;
    const h = Math.round(w * ratio);
    canvas.style.height = h + "px";
    canvas.width = Math.round(w * dpr);
    canvas.height = Math.round(h * dpr);
    const ctx = canvas.getContext("2d");
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    return { ctx, w, h };
  };

  /* Approximate blackbody colour for a temperature in kelvin. */
  G.kelvinRGB = function (k) {
    const t = G.clamp(k, 1000, 40000) / 100;
    let r, g, b;
    if (t <= 66) { r = 255; g = 99.47 * Math.log(t) - 161.12; }
    else { r = 329.7 * Math.pow(t - 60, -0.1332); g = 288.12 * Math.pow(t - 60, -0.0755); }
    if (t >= 66) b = 255; else if (t <= 19) b = 0; else b = 138.52 * Math.log(t - 10) - 305.04;
    return [r, g, b].map(v => Math.round(G.clamp(v, 0, 255)));
  };
  G.rgb = (c, a = 1) => `rgba(${c[0]},${c[1]},${c[2]},${a})`;

  G.fmt = function (n, digits = 3) {
    if (!isFinite(n)) return "∞";
    if (n === 0) return "0";
    const abs = Math.abs(n);
    if (abs >= 1e6 || abs < 1e-3) {
      const e = Math.floor(Math.log10(abs));
      const m = n / Math.pow(10, e);
      const sup = String(e).replace(/-/g, "⁻").replace(/\d/g, d => "⁰¹²³⁴⁵⁶⁷⁸⁹"[d]);
      return `${m.toFixed(2)} × 10${sup}`;
    }
    return n.toLocaleString("en-IN", { maximumSignificantDigits: digits });
  };

  /* Human duration from seconds */
  G.duration = function (s) {
    const Y = 31557600;
    if (s < 1) return s < 0.001 ? G.fmt(s) + " s" : s.toFixed(3) + " s";
    if (s < 60) return s.toFixed(1) + " seconds";
    if (s < 3600) return (s / 60).toFixed(1) + " minutes";
    if (s < 86400) return (s / 3600).toFixed(1) + " hours";
    if (s < Y) return (s / 86400).toFixed(1) + " days";
    const y = s / Y;
    if (y < 1e3) return y.toFixed(y < 10 ? 1 : 0) + " years";
    if (y < 1e6) return G.fmt(y, 3) + " years";
    if (y < 1e9) return (y / 1e6).toFixed(y < 1e7 ? 1 : 0) + " million years";
    if (y < 1e12) return (y / 1e9).toFixed(1) + " billion years";
    return G.fmt(y) + " years";
  };

  /* ---------- Missions ---------- */
  const icons = {
    origin: '<svg viewBox="0 0 56 56" fill="none" stroke="currentColor" stroke-width="1.4"><circle cx="28" cy="28" r="3" fill="currentColor"/><circle cx="28" cy="28" r="10" opacity=".7"/><circle cx="28" cy="28" r="17" opacity=".45"/><circle cx="28" cy="28" r="24" opacity=".25"/></svg>',
    stars: '<svg viewBox="0 0 56 56" fill="none" stroke="currentColor" stroke-width="1.4"><circle cx="16" cy="36" r="5" fill="currentColor" opacity=".5"/><circle cx="33" cy="28" r="10" fill="currentColor" opacity=".25"/><circle cx="33" cy="28" r="10"/><circle cx="47" cy="20" r="2.5" fill="currentColor"/></svg>',
    sky: '<svg viewBox="0 0 56 56" fill="none" stroke="currentColor" stroke-width="1.2"><path d="M10 14 L20 22 L18 34 L30 30 L44 40 M20 22 L34 16" opacity=".6"/><g fill="currentColor"><circle cx="10" cy="14" r="2.4"/><circle cx="20" cy="22" r="2"/><circle cx="18" cy="34" r="2.2"/><circle cx="30" cy="30" r="1.8"/><circle cx="44" cy="40" r="2.8"/><circle cx="34" cy="16" r="1.6"/></g></svg>',
    spacetime: '<svg viewBox="0 0 56 56" fill="none" stroke="currentColor" stroke-width="1.2"><path d="M4 18 Q28 20 52 18" opacity=".4"/><path d="M4 26 Q18 27 22 34 Q28 48 34 34 Q38 27 52 26" /><path d="M4 34 Q20 35 24 40 Q28 50 32 40 Q36 35 52 34" opacity=".6"/><circle cx="28" cy="40" r="3.5" fill="currentColor"/></svg>',
    newton: '<svg viewBox="0 0 56 56" fill="none" stroke="currentColor" stroke-width="1.4"><circle cx="28" cy="30" r="12" fill="currentColor" opacity=".2"/><circle cx="28" cy="30" r="12"/><ellipse cx="28" cy="30" rx="22" ry="20" stroke-dasharray="3 4"/><circle cx="28" cy="10" r="2.6" fill="currentColor"/></svg>',
    myths: '<svg viewBox="0 0 56 56" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="8" y="12" width="26" height="34" rx="4" opacity=".5" transform="rotate(-10 21 29)"/><rect x="22" y="10" width="26" height="34" rx="4"/><path d="M29 28 l4 4 l8 -9"/></svg>',
    quiz: '<svg viewBox="0 0 56 56" fill="none" stroke="currentColor" stroke-width="1.4"><circle cx="28" cy="28" r="20" opacity=".35"/><path d="M22 22 a6 6 0 1 1 8 5.6 c-1.6.7 -2 1.6 -2 3.4"/><circle cx="28" cy="37" r="1.6" fill="currentColor"/></svg>',
    heroes: '<svg viewBox="0 0 56 56" fill="none" stroke="currentColor" stroke-width="1.4"><circle cx="28" cy="20" r="7"/><path d="M14 46 c2-10 8-14 14-14 s12 4 14 14"/><circle cx="46" cy="10" r="1.8" fill="currentColor"/><circle cx="10" cy="16" r="1.3" fill="currentColor"/></svg>',
    academy: '<svg viewBox="0 0 56 56" fill="none" stroke="currentColor" stroke-width="1.4"><path d="M6 22 L28 12 L50 22 L28 32 Z"/><path d="M14 26 V38 C20 44 36 44 42 38 V26"/><path d="M50 22 V34"/><circle cx="50" cy="36" r="2" fill="currentColor"/></svg>',
    isro: '<svg viewBox="0 0 56 56" fill="none" stroke="currentColor" stroke-width="1.4"><path d="M28 6 C36 14 36 30 32 40 H24 C20 30 20 14 28 6 Z"/><circle cx="28" cy="20" r="3"/><path d="M24 34 L17 42 L23 41 M32 34 L39 42 L33 41"/><path d="M26 44 L28 51 L30 44" opacity=".7"/></svg>',
    scale: '<svg viewBox="0 0 56 56" fill="none" stroke="currentColor" stroke-width="1.4"><path d="M6 40 H50"/><path d="M8 36 v8 M14 37 v6 M20 37 v6 M26 36 v8 M34 37 v6 M42 37 v6 M50 36 v8" opacity=".6"/><circle cx="10" cy="24" r="2" fill="currentColor"/><circle cx="26" cy="22" r="4" fill="currentColor" opacity=".7"/><circle cx="44" cy="20" r="7" fill="currentColor" opacity=".35"/></svg>'
  };

  const S = () => G.state;
  const has = id => S().badges[id] ? 1 : 0;
  G.missions = [
    { id: "origin", title: "From the first second to you", sub: "Scrub a timeline from the Big Bang to today and find your place in the Cosmic Calendar.", c: "var(--rose)",
      p: () => (has("big-bang") + has("calendar")) / 2 },
    { id: "stars", title: "Life and death of a star", sub: "Pick a mass and watch it become a white dwarf, a neutron star or a black hole.", c: "var(--g)",
      p: () => (has("star-dwarf") + has("star-neutron") + has("star-bh")) / 3 },
    { id: "sky", title: "Read the night sky", sub: "Ten constellations with Indian names and myths. Then draw them from memory.", c: "var(--a)",
      p: () => Math.min(1, Object.keys(S().built).length / 10) },
    { id: "spacetime", title: "Bend spacetime", sub: "Warp space, shrink Earth into a black hole and slow down time.", c: "var(--o)",
      p: () => (has("horizon") + (S().flags.warpBH ? 1 : 0) + (S().flags.bhCalc ? 1 : 0)) / 3 },
    { id: "newton", title: "Newton's lab", sub: "Fire Newton's cannon into orbit, weigh yourself on Jupiter and crack 12 physics puzzles.", c: "var(--good)",
      p: () => (has("orbit") + has("escape") + Math.min(1, Object.keys(S().puzzles).length / 12)) / 3 },
    { id: "myths", title: "Myth or fact?", sub: "32 popular beliefs about space and physics. Which ones survive the evidence?", c: "var(--k)",
      p: () => Math.min(1, S().mythsSeen / DATA.myths.length) },
    { id: "quiz", title: "Quiz arena", sub: "3 levels, 13 topics and a mega mix. Over 300 questions, every answer explained.", c: "var(--b)",
      p: () => (has("quiz-cadet") + has("quiz-explorer") + has("quiz-astro") + has("topic-master")) / 4 },
    { id: "heroes", title: "Giants of the cosmos", sub: "Chandrasekhar, Kalpana Chawla, Cecilia Payne, Kalam and the people behind the facts.", c: "var(--m)",
      p: () => Math.min(1, Object.keys(S().heroes).length / DATA.heroes.length) },
    { id: "scale", title: "How far is far?", sub: "From the Moon to the edge of the observable universe, at the speed of a car or of light.", c: "var(--a)",
      p: () => Math.min(1, Object.keys(S().speeds).length / DATA.speeds.length) },
    { id: "academy", title: "Physics Academy: Class 11 and 12", sub: "All 28 CBSE chapters explained simply, each with an experiment, formulas and board-style questions with solutions.", c: "var(--g)",
      p: () => (has("class11") + has("class12") + has("board-ready")) / 3 },
    { id: "isro", title: "India in space", sub: "From a bicycle-carried rocket in 1963 to the Moon's south pole and beyond.", c: "var(--k)",
      p: () => Math.min(1, Object.keys(S().isro || {}).length / DATA.isro.length) }
  ];

  const badgeIcon = on => `<svg viewBox="0 0 36 36" aria-hidden="true"><circle cx="18" cy="18" r="15" fill="none" stroke="${on ? "#ffd27a" : "#6f789c"}" stroke-width="1.3" stroke-dasharray="${on ? "0" : "3 3"}"/><path d="M18 8 L20.6 15.4 L28 18 L20.6 20.6 L18 28 L15.4 20.6 L8 18 L15.4 15.4 Z" fill="${on ? "#ffd27a" : "#3a4264"}"/></svg>`;

  G.renderHome = function () {
    const st = G.state;
    const box = document.getElementById("commander-box");
    if (st.name) {
      const { rank } = G.rankFor(st.xp);
      if (!st.badges["first-light"]) setTimeout(() => G.badge("first-light"), 600);
      box.innerHTML = `<p class="greeting">Hello, ${rank.name} <span class="i">${G.esc(st.name)}</span>. The universe is waiting.</p>
        <div class="row"><button class="btn primary" type="button" data-go="${nextMission()}">Continue the odyssey</button><button class="btn" type="button" data-go="academy">Class 11 and 12 physics</button><button class="chip" type="button" id="rename">Change name</button></div>`;
      box.querySelector("#rename").onclick = () => { st.name = ""; G.save(); G.renderHome(); };
    } else {
      box.innerHTML = `<form class="commander" id="name-form">
          <div class="field"><label for="name-input">What should mission control call you?</label>
          <input class="text-input" id="name-input" maxlength="24" placeholder="Your name" autocomplete="off"></div>
          <button class="btn primary" type="submit">Begin</button></form>`;
      box.querySelector("#name-form").addEventListener("submit", e => {
        e.preventDefault();
        const v = box.querySelector("#name-input").value.trim();
        if (!v) { box.querySelector("#name-input").focus(); return; }
        st.name = v; G.save();
        G.badge("first-light");
        G.renderHome();
      });
    }

    const done = G.missions.filter(m => m.p() >= 1).length;
    document.getElementById("mission-progress").textContent = `${done} of ${G.missions.length} complete`;
    document.getElementById("missions").innerHTML = G.missions.map(m => {
      const p = m.p();
      return `<button class="mission" type="button" data-go="${m.id}" style="--c:${m.c}">
        ${icons[m.id]}
        <div><h3>${m.title}</h3><p>${m.sub}</p>
        <div class="meta"><span>${p >= 1 ? "Complete" : p > 0 ? Math.round(p * 100) + "% explored" : "Not started"}</span><span class="bar-mini"><i style="width:${p * 100}%"></i></span></div></div>
      </button>`;
    }).join("");

    const n = Object.keys(st.badges).length;
    document.getElementById("badge-count").textContent = `${n} of ${DATA.badges.length} earned`;
    document.getElementById("badges").innerHTML = DATA.badges.map(b => {
      const on = !!st.badges[b.id];
      return `<div class="badge ${on ? "on" : ""}">${badgeIcon(on)}<div><b>${b.name}</b><span>${b.desc}</span></div></div>`;
    }).join("");
  };

  function nextMission() {
    const m = G.missions.find(x => x.p() < 1);
    return m ? m.id : "quiz";
  }

  /* ---------- Router ---------- */
  G.go = function (name) {
    if (!document.getElementById("v-" + name)) name = "home";
    if (G.current && G.views[G.current] && G.views[G.current].leave) G.views[G.current].leave();
    document.querySelectorAll(".view").forEach(v => { v.hidden = v.dataset.view !== name; });
    G.current = name;
    document.body.dataset.view = name;
    document.getElementById("back-label").hidden = name === "home";
    document.querySelectorAll("#v-" + name + " [data-sim]:not([data-mounted])").forEach(el => { el.dataset.mounted = "1"; G.mount(el, el.dataset.sim); });
    const mod = G.views[name];
    if (mod) {
      if (!mod._ready && mod.init) { mod.init(); mod._ready = true; }
      if (mod.enter) mod.enter();
    }
    if (name === "home") G.renderHome();
    window.scrollTo(0, 0);
  };

  document.addEventListener("click", e => {
    const t = e.target.closest("[data-go]");
    if (!t) return;
    const id = t.dataset.go;
    if ((location.hash.slice(1) || "home") === id) G.go(id);
    else location.hash = id === "home" ? "" : id;
  });
  window.addEventListener("hashchange", () => G.go(location.hash.slice(1) || "home"));

  /* ---------- Background sky: slow rotation around the celestial pole ---------- */
  G.startBackground = function () {
    const c = document.getElementById("sky-bg");
    const ctx = c.getContext("2d");
    let w, h, stars = [];
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    function size() {
      w = innerWidth; h = innerHeight;
      c.width = w * dpr; c.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const R = Math.hypot(w, h) * 1.2;
      const count = Math.min(520, Math.round(w * h / 3200));
      stars = [];
      for (let i = 0; i < count; i++) {
        const temp = [3200, 4200, 5600, 6500, 8000, 11000, 20000][Math.random() * 7 | 0];
        stars.push({
          r: Math.sqrt(Math.random()) * R, a: Math.random() * Math.PI * 2,
          s: Math.random() < 0.06 ? 1.6 + Math.random() : 0.4 + Math.random() * 0.9,
          c: G.kelvinRGB(temp), tw: Math.random() * Math.PI * 2
        });
      }
    }
    size();
    addEventListener("resize", size);
    let last = 0, rot = 0;
    function frame(t) {
      requestAnimationFrame(frame);
      if (document.hidden || t - last < 40) return;
      const dt = last ? t - last : 16; last = t;
      if (!G.reduced) rot += dt * 0.0000045;
      ctx.clearRect(0, 0, w, h);
      const px = w * 0.86, py = -h * 0.1;
      for (const s of stars) {
        const x = px + Math.cos(s.a + rot) * s.r, y = py + Math.sin(s.a + rot) * s.r;
        if (x < -4 || x > w + 4 || y < -4 || y > h + 4) continue;
        const tw = G.reduced ? 1 : 0.65 + 0.35 * Math.sin(t * 0.0015 + s.tw);
        ctx.fillStyle = G.rgb(s.c, 0.85 * tw);
        ctx.beginPath(); ctx.arc(x, y, s.s, 0, 6.283); ctx.fill();
      }
    }
    requestAnimationFrame(frame);
  };

  /* shared animation loop helper: runs fn only while the view is visible */
  G.loop = function (view, fn) {
    let last = performance.now();
    function f(t) {
      if (G.current !== view) { G.views[view]._loop = false; return; }
      const dt = G.clamp((t - last) / 1000, 0, 0.05); last = t;
      fn(dt, t / 1000);
      requestAnimationFrame(f);
    }
    if (!G.views[view]._loop) { G.views[view]._loop = true; last = performance.now(); requestAnimationFrame(f); }
  };
})();
