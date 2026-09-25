/* Missions 6 to 9: Myths, Quiz, Heroes, Scale */
(function () {
  /* ================= MYTHS ================= */
  const My = G.views.myths = {};
  let deck = [], mi = 0, sessionRight = 0;
  My.init = function () { deck = G.shuffle(DATA.myths.map((_, i) => i)); mi = 0; renderMyth(); };

  function renderMyth() {
    const box = document.getElementById("deck");
    if (mi >= deck.length) {
      box.innerHTML = `<div class="myth-card"><span class="eyebrow">Deck complete</span>
        <p class="s">You sorted ${sessionRight} of ${deck.length} correctly.</p>
        <p class="muted">${sessionRight >= Math.round(deck.length * 0.8) ? "A true sceptic. Scientists would be proud." : "Some of these fool adults and even teachers. Try the deck again and see what stuck."}</p>
        <div class="row"><button class="btn primary" type="button" id="m-again">Shuffle and play again</button></div></div>`;
      box.querySelector("#m-again").onclick = () => { deck = G.shuffle(deck); mi = 0; sessionRight = 0; renderMyth(); };
      if (G.state.mythsSeen >= DATA.myths.length) G.award("myths-done", 30, "Mission complete");
      return;
    }
    const m = DATA.myths[deck[mi]];
    box.innerHTML = `<div class="myth-card" id="m-card"><span class="eyebrow">Card ${mi + 1} of ${deck.length} · ${sessionRight} correct</span>
      <p class="s">“${m.s}”</p>
      <div id="m-body" class="row"><button class="btn" type="button" data-ans="0">Myth</button><button class="btn" type="button" data-ans="1">Fact</button></div></div>`;
    box.querySelector("#m-body").onclick = e => {
      const b = e.target.closest("button[data-ans]"); if (!b) return;
      const said = b.dataset.ans === "1", ok = said === m.fact, idx = deck[mi];
      if (ok) sessionRight++;
      if (G.award("myth-seen-" + idx, 5)) { G.state.mythsSeen++; }
      if (ok && G.award("myth-right-" + idx, 5)) { G.state.mythsRight++; }
      G.save();
      if (G.state.mythsRight >= 10) G.badge("myth-buster");
      document.getElementById("m-body").outerHTML = `<div class="stack">
        <p class="verdict ${m.fact ? "t" : "f"}">${m.fact ? "Fact" : "Myth"} · ${ok ? "you got it" : "tricky one"}</p>
        <p class="muted">${m.e}</p>
        <div class="row"><button class="btn primary" type="button" id="m-next">Next card</button></div></div>`;
      document.getElementById("m-next").onclick = () => {
        const card = document.getElementById("m-card");
        card.classList.add(ok ? "gone-r" : "gone-l");
        setTimeout(() => { mi++; renderMyth(); }, G.reduced ? 0 : 280);
      };
    };
  }

  /* ================= QUIZ ================= */
  const Q = G.views.quiz = {};
  const levels = [
    { id: 1, name: "Cadet", sub: "Solar System, stars and basics", badge: "quiz-cadet" },
    { id: 2, name: "Explorer", sub: "Star lives, galaxies, the Big Bang", badge: "quiz-explorer" },
    { id: 3, name: "Astrophysicist", sub: "Relativity, black holes, Class 12 physics", badge: "quiz-astro" }
  ];
  let run = null;
  Q.init = function () { picker(); };
  Q.enter = function () { if (!run) picker(); };

  function picker() {
    run = null;
    const root = document.getElementById("quiz-root");
    const topicBest = id => G.state.flags["tbest-" + id];
    root.innerHTML = `<div class="section-label" style="margin-top:0"><h2>By level</h2><span class="eyebrow">10 questions each</span></div>
      <div class="missions" id="lvl-grid">${levels.map(l => {
      const best = G.state.flags["best" + l.id];
      return `<button class="mission" type="button" data-l="${l.id}" style="--c:${["", "var(--b)", "var(--g)", "var(--rose)"][l.id]}; grid-template-columns:1fr">
        <div><span class="eyebrow">Level ${l.id}</span><h3 style="font-family:var(--display);font-weight:400;font-size:2rem;margin-top:4px">${l.name}</h3><p>${l.sub}</p>
        <div class="meta"><span>${best != null ? `Best score ${best} / 10` : "Not attempted"}</span>${G.state.badges[l.badge] ? "<span style='color:var(--g)'>Certified</span>" : ""}</div></div></button>`;
    }).join("")}</div>
      <div class="section-label"><h2>By topic</h2><span class="eyebrow">${DATA.topics.reduce((s, t) => s + t.qs.length, 0)} questions in 13 topics</span></div>
      <div class="topic-grid" id="topic-grid">${DATA.topics.map(t => `<button class="topic" type="button" data-t="${t.id}" style="--c:${t.c}">
        <b>${t.name}</b><span>${t.qs.length} questions · ${topicBest(t.id) != null ? "best " + topicBest(t.id) + "/10" : "not tried"}</span></button>`).join("")}
        <button class="topic mega" type="button" data-t="mega" style="--c:var(--g)"><b>Mega mix</b><span>20 random questions from everything</span></button></div>`;
    root.querySelector("#lvl-grid").onclick = e => { const b = e.target.closest("[data-l]"); if (b) start(+b.dataset.l); };
    root.querySelector("#topic-grid").onclick = e => { const b = e.target.closest("[data-t]"); if (b) startTopic(b.dataset.t); };
  }

  function shuffleOpts(q) {
    const order = G.shuffle(q.o.map((_, i) => i));
    return { q: q.q, o: order.map(i => q.o[i]), a: order.indexOf(q.a), e: q.e };
  }
  function start(l) {
    const qs = G.shuffle(DATA.quiz[l]).slice(0, 10).map(shuffleOpts);
    run = { l, qs, i: 0, score: 0, label: levels[l - 1].name };
    ask();
  }
  function startTopic(id) {
    const toQ = x => ({ q: x[0], o: x[1], a: x[2], e: x[3] });
    let pool, label, n = 10;
    if (id === "mega") { pool = DATA.topics.flatMap(t => t.qs.map(toQ)).concat(Object.values(DATA.quiz).flat()); label = "Mega mix"; n = 20; }
    else { const t = DATA.topics.find(x => x.id === id); pool = t.qs.map(toQ); label = t.name; }
    run = { topic: id, qs: G.shuffle(pool).slice(0, n).map(shuffleOpts), i: 0, score: 0, label };
    ask();
  }

  function ask() {
    const root = document.getElementById("quiz-root");
    const q = run.qs[run.i];
    root.innerHTML = `<div class="panel stack" style="max-width:760px">
      <div class="row" style="justify-content:space-between"><span class="eyebrow">${run.label} · question ${run.i + 1} of ${run.qs.length}</span><span class="xp-num">${run.score} correct</span></div>
      <div class="xp-track" style="width:100%"><div class="xp-fill" style="width:${run.i / run.qs.length * 100}%"></div></div>
      <h3 style="font-family:var(--display);font-weight:400;font-size:clamp(1.6rem,4vw,2.2rem);line-height:1.15">${q.q}</h3>
      <div class="options" id="q-opts">${q.o.map((o, i) => `<button class="opt" type="button" data-i="${i}">${o}</button>`).join("")}</div>
      <div id="q-fb" class="feedback" aria-live="polite"></div>
      <div><button class="chip" type="button" id="q-quit">Quit to levels</button></div></div>`;
    root.querySelector("#q-quit").onclick = picker;
    root.querySelector("#q-opts").onclick = e => {
      const b = e.target.closest("button[data-i]"); if (!b || b.disabled) return;
      const pick = +b.dataset.i, ok = pick === q.a;
      root.querySelectorAll(".opt").forEach(o => { o.disabled = true; if (+o.dataset.i === q.a) o.classList.add("right"); else if (o === b) o.classList.add("wrong"); });
      if (ok) { run.score++; G.addXP(8); }
      const last = run.i === run.qs.length - 1;
      root.querySelector("#q-fb").innerHTML = `<p><b class="${ok ? "ok" : "no"}">${ok ? "Correct." : "Not this time."}</b> ${q.e}</p>
        <button class="btn primary" type="button" id="q-next" style="margin-top:12px">${last ? "See results" : "Next question"}</button>`;
      root.querySelector("#q-next").onclick = () => { if (last) finish(); else { run.i++; ask(); } };
      root.querySelector("#q-next").focus();
    };
  }

  function finish() {
    const s = run.score, n = run.qs.length;
    let again;
    if (run.topic) {
      const key = "tbest-" + run.topic;
      if (run.topic !== "mega") { G.state.flags[key] = Math.max(G.state.flags[key] || 0, s); }
      G.save();
      const mastered = DATA.topics.filter(t => (G.state.flags["tbest-" + t.id] || 0) >= 8).length;
      if (mastered >= 5) G.badge("topic-master");
      if (run.topic === "mega" && s >= 16) G.badge("mega");
      const id = run.topic; again = () => startTopic(id);
    } else {
      const l = levels[run.l - 1];
      G.state.flags["best" + l.id] = Math.max(G.state.flags["best" + l.id] || 0, s); G.save();
      if (s >= 8) G.badge(l.badge);
      if (["quiz-cadet", "quiz-explorer", "quiz-astro"].every(b => G.state.badges[b])) G.award("quiz-done", 30, "Mission complete");
      const id = l.id; again = () => start(id);
    }
    const pct = s / n;
    const msg = pct === 1 ? "Perfect score, Kutush. Flawless." : pct >= 0.8 ? "Brilliant! You clearly know your stuff." : pct >= 0.5 ? "Solid. Read the explanations and you will ace it next time." : "Every astronomer started here. Try again, the questions shuffle.";
    document.getElementById("quiz-root").innerHTML = `<div class="panel stack" style="max-width:640px">
      <span class="eyebrow">${run.label} complete</span>
      <p style="font-family:var(--display);font-size:clamp(3rem,10vw,5rem);line-height:1">${s} <span class="muted" style="font-size:.5em">/ ${n}</span></p>
      <p class="muted">${msg}</p>
      <div class="row"><button class="btn primary" type="button" id="q-again">Play again</button><button class="btn" type="button" id="q-levels">Choose another quiz</button></div></div>`;
    document.getElementById("q-again").onclick = again;
    document.getElementById("q-levels").onclick = picker;
  }

  /* ================= HEROES ================= */
  const Hr = G.views.heroes = {};
  Hr.init = function () {
    const box = document.getElementById("heroes");
    box.innerHTML = DATA.heroes.map((h, i) => `<button class="panel hero-card" type="button" data-h="${i}" aria-expanded="false">
      <span class="y">${h.y}</span><h3>${h.n}</h3><span class="tag">${h.tag}</span>
      <p class="bio" hidden>${h.b}</p><span class="more">${G.state.heroes[i] ? "Read · tap to open" : "Tap to read"}</span></button>`).join("");
    box.onclick = e => {
      const c = e.target.closest("[data-h]"); if (!c) return;
      const bio = c.querySelector(".bio"), open = bio.hidden;
      bio.hidden = !open; c.setAttribute("aria-expanded", open);
      c.querySelector(".more").textContent = open ? "Tap to close" : "Read · tap to open";
      const i = +c.dataset.h;
      if (open && !G.state.heroes[i]) {
        G.state.heroes[i] = 1; G.save(); G.addXP(5);
        const n = Object.keys(G.state.heroes).length;
        if (n >= 8) G.badge("heroes");
        if (n >= DATA.heroes.length) G.award("heroes-done", 30, "Mission complete");
      }
    };
  };

  /* ================= SCALE ================= */
  const Sc = G.views.scale = {};
  let speed = "light";
  Sc.init = function () {
    const chips = document.getElementById("speed-chips");
    chips.innerHTML = `<span class="eyebrow" style="margin-right:6px">Travel at</span>` + DATA.speeds.map(s => `<button class="chip" type="button" data-s="${s.id}">${s.name}</button>`).join("");
    chips.onclick = e => { const b = e.target.closest("[data-s]"); if (b) setSpeed(b.dataset.s); };
    setSpeed("light");
  };
  function setSpeed(id) {
    speed = id;
    G.state.speeds[id] = 1; G.save();
    if (Object.keys(G.state.speeds).length >= DATA.speeds.length) G.award("scale-done", 30, "Mission complete");
    document.querySelectorAll("#speed-chips [data-s]").forEach(b => b.setAttribute("aria-pressed", b.dataset.s === id));
    const sp = DATA.speeds.find(s => s.id === id);
    const lo = 5, hi = Math.log10(DATA.distances[DATA.distances.length - 1].km);
    document.getElementById("scale-list").innerHTML = DATA.distances.map((d, i) => {
      const last = i === DATA.distances.length - 1;
      const w = (Math.log10(d.km) - lo) / (hi - lo) * 100;
      const tt = last ? "never" : G.duration(d.km / sp.kms);
      return `<div class="scale-row"><div><div class="nm">${d.name}</div><div class="nt">${G.fmt(d.km)} km · ${d.note}</div></div>
        <div class="tt">${tt}</div><div class="logbar"><i style="width:${w}%"></i></div></div>`;
    }).join("") + `<p class="small muted" style="padding-top:12px">Travel times at a steady ${G.fmt(sp.kms < 1 ? sp.kms * 3600 : sp.kms)} ${sp.kms < 1 ? "km/h" : "km/s"}. The universe is currently about 13.8 billion years old, so anything longer than that is a very long trip indeed.</p>`;
  }
})();
