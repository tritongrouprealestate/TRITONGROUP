/* Missions 6 to 9: Myths, Quiz, Heroes, Scale */
(function () {
  /* ================= MYTHS ================= */
  const My = G.views.myths = {};
  let deck = [], mi = 0, sessionRight = 0, currentGroup = "Surprise me";
  const mythGroups = [
    ["Space & sky", "Planets, moons, stars, black holes and the universe", "var(--rose)"],
    ["Motion & forces", "Gravity, motion, friction, energy and everyday mechanics", "var(--good)"],
    ["Waves, light & heat", "Sound, light, optics, heat and thermodynamics", "var(--a)"],
    ["Electricity & magnetism", "Circuits, lightning, magnets and induction", "var(--o)"],
    ["Quantum & modern physics", "Atoms, photons, relativity and quantum weirdness", "var(--b)"],
    ["Classic deck", "The original Cosmic Odyssey myths", "var(--k)"]
  ];

  My.init = function () { renderMythPicker(); };
  My.enter = function () { if (!deck.length || mi >= deck.length) renderMythPicker(); };

  function mythId(m, idx) { return m.id || `MF-${idx}`; }
  function sourceHTML(ids) {
    if (!ids || !ids.length) return '<p class="small muted">No external link is attached to this classic card.</p>';
    const rows = ids.map(id => {
      const s = DATA.referenceSources && DATA.referenceSources[id];
      if (!s) return '';
      return `<a class="source-link" href="${G.esc(s.url)}" target="_blank" rel="noopener noreferrer">${G.esc(s.title)} ↗</a>`;
    }).filter(Boolean).join('');
    return rows || '<p class="small muted">Source metadata unavailable.</p>';
  }

  function renderMythPicker() {
    deck = []; mi = 0; sessionRight = 0;
    const box = document.getElementById("deck");
    const missed = Object.keys(G.state.mythMissed || {}).filter(id => G.state.mythMissed[id]);
    const seen = G.state.mythsSeen || 0, right = G.state.mythsRight || 0;
    box.innerHTML = `<div class="myth-hub">
      <div class="panel myth-stats">
        <div><span class="eyebrow">Evidence record</span><b>${right}</b><span>correct answers</span></div>
        <div><span class="eyebrow">Explored</span><b>${Math.min(seen, DATA.myths.length)}</b><span>of ${DATA.myths.length} cards</span></div>
        <div><span class="eyebrow">Review pile</span><b>${missed.length}</b><span>tricky cards</span></div>
      </div>
      <div class="section-label"><h2>Choose a 10-card mission</h2><span class="eyebrow">short rounds · immediate explanations</span></div>
      <div class="myth-missions">
        ${mythGroups.map(([name,sub,c])=>`<button class="myth-mission" type="button" data-group="${G.esc(name)}" style="--c:${c}"><span class="eyebrow">10 cards</span><b>${G.esc(name)}</b><span>${G.esc(sub)}</span></button>`).join('')}
        <button class="myth-mission surprise" type="button" data-group="Surprise me" style="--c:var(--g)"><span class="eyebrow">mixed mission</span><b>Surprise me</b><span>Ten random claims from the entire evidence deck.</span></button>
        <button class="myth-mission tricky" type="button" data-group="My tricky cards" style="--c:var(--rose)" ${missed.length ? '' : 'disabled'}><span class="eyebrow">adaptive review</span><b>My tricky cards</b><span>${missed.length ? `${missed.length} cards you previously missed. Get each right twice later to clear it.` : 'Miss a card and it will appear here for a later rematch.'}</span></button>
      </div>
      <div class="panel evidence-tip"><span class="eyebrow">Scientist habit</span><p><b>Do not just guess Myth or Fact.</b> Make a reason in your head first. After you answer, open <i>Why?</i>, <i>Why it tricks people</i>, or <i>But wait…</i> whenever something still feels wrong.</p></div>
    </div>`;
    box.querySelectorAll('[data-group]').forEach(b => b.onclick = () => startMythRound(b.dataset.group));
  }

  function startMythRound(group) {
    currentGroup = group;
    let pool;
    if (group === "My tricky cards") {
      const ids = new Set(Object.keys(G.state.mythMissed || {}).filter(id => G.state.mythMissed[id]));
      pool = DATA.myths.map((m,i)=>i).filter(i=>ids.has(mythId(DATA.myths[i],i)));
    } else if (group === "Surprise me") {
      pool = DATA.myths.map((_,i)=>i);
    } else {
      pool = DATA.myths.map((m,i)=>m.group === group ? i : -1).filter(i=>i>=0);
    }
    // keep rounds honest: mix in up to 3 true "Fact" cards when the group has them, so "always Myth" never wins
    if (group === "My tricky cards") deck = G.shuffle(pool).slice(0, 10);
    else {
      const facts = G.shuffle(pool.filter(i => DATA.myths[i].fact)), myths = G.shuffle(pool.filter(i => !DATA.myths[i].fact));
      const nf = Math.min(facts.length, 3);
      deck = G.shuffle(facts.slice(0, nf).concat(myths.slice(0, 10 - nf)));
    }
    mi = 0; sessionRight = 0;
    renderMyth();
  }

  function renderMyth() {
    const box = document.getElementById("deck");
    if (!deck.length) { renderMythPicker(); return; }
    if (mi >= deck.length) {
      const pct = deck.length ? sessionRight / deck.length : 0;
      box.innerHTML = `<div class="myth-card round-end"><span class="eyebrow">${G.esc(currentGroup)} · mission complete</span>
        <p class="round-score">${sessionRight}<span> / ${deck.length}</span></p>
        <p class="muted">${pct === 1 ? "Perfect evidence run. You did not just trust the wording — you tested it." : pct >= .8 ? "Excellent. The few uncomfortable cards are the useful ones: they show where intuition needs an upgrade." : pct >= .5 ? "Good start. Open your tricky-card deck later — spaced rematches are how knowledge sticks." : "These claims are designed to fool intuition. Read the reasons, then come back for a rematch."}</p>
        <div class="row"><button class="btn primary" type="button" id="m-again">Another ${G.esc(currentGroup)} round</button><button class="btn" type="button" id="m-pick">Choose mission</button></div></div>`;
      box.querySelector('#m-again').onclick = () => startMythRound(currentGroup);
      box.querySelector('#m-pick').onclick = renderMythPicker;
      return;
    }

    const idx = deck[mi], m = DATA.myths[idx];
    box.innerHTML = `<div class="myth-card" id="m-card">
      <div class="myth-card-top"><span class="eyebrow">${G.esc(currentGroup)} · ${mi+1}/${deck.length}</span><span class="myth-cat">${G.esc(m.category || 'Science')}</span></div>
      <div class="xp-track myth-progress"><div class="xp-fill" style="width:${mi/deck.length*100}%"></div></div>
      <p class="s">“${G.esc(m.s)}”</p>
      <p class="prediction-prompt">Before tapping: <b>what observation would make this true or false?</b></p>
      <div id="m-body" class="row myth-choice"><button class="btn" type="button" data-ans="0">Myth</button><button class="btn" type="button" data-ans="1">Fact</button></div>
      <button class="chip myth-exit" id="m-exit" type="button">← Choose another mission</button>
    </div>`;
    box.querySelector('#m-exit').onclick = renderMythPicker;
    box.querySelector('#m-body').onclick = e => {
      const b = e.target.closest('button[data-ans]'); if (!b) return;
      const said = b.dataset.ans === '1', ok = said === m.fact, id = mythId(m,idx);
      if (ok) sessionRight++;
      if (G.award('myth-seen-' + id, 3)) G.state.mythsSeen++;
      if (ok && G.award('myth-right-' + id, 4)) G.state.mythsRight++;

      G.state.mythMissed = G.state.mythMissed || {};
      G.state.mythMastery = G.state.mythMastery || {};
      if (!ok) {
        G.state.mythMissed[id] = (G.state.mythMissed[id] || 0) + 1;
        G.state.mythMastery[id] = 0;
      } else if (G.state.mythMissed[id]) {
        G.state.mythMastery[id] = (G.state.mythMastery[id] || 0) + 1;
        if (G.state.mythMastery[id] >= 2) { delete G.state.mythMissed[id]; delete G.state.mythMastery[id]; G.toast('Tricky card cleared: <b>mastered twice</b>'); }
      }
      G.save();
      if (G.state.mythsRight >= 10) G.badge('myth-buster');
      if (G.state.mythsRight >= 25) G.badge('evidence-hunter');
      if (G.state.mythsRight >= 75) G.badge('skeptic-scientist');

      const doubts = (m.doubts || []).map((d,j)=>`<details class="doubt"><summary>${G.esc(d[0])}</summary><p>${G.esc(d[1])}</p></details>`).join('');
      document.getElementById('m-body').outerHTML = `<div class="myth-answer stack">
        <p class="verdict ${m.fact ? 't' : 'f'}">${m.fact ? 'FACT' : 'MYTH'} · ${ok ? 'you got it' : 'good trap'}</p>
        <p class="myth-quick">${G.esc(m.quick || m.e)}</p>
        ${!ok ? '<p class="gentle-correct">Wrong answers are useful here: this one has been added to <b>My tricky cards</b> for a later rematch.</p>' : ''}
        <div class="layer-tabs">
          <button class="chip" data-layer="why" type="button">Why?</button>
          <button class="chip" data-layer="trick" type="button">Why does this fool people?</button>
          <button class="chip" data-layer="try" type="button">Try it</button>
          ${doubts ? '<button class="chip" data-layer="doubts" type="button">But wait…</button>' : ''}
          ${m.sources && m.sources.length ? '<button class="chip" data-layer="sources" type="button">Sources</button>' : ''}
        </div>
        <div class="myth-layer" data-panel="why" hidden><span class="eyebrow">Go deeper</span><p>${G.esc(m.deep || m.e)}</p></div>
        <div class="myth-layer" data-panel="trick" hidden><span class="eyebrow">Why intuition gets fooled</span><p>${G.esc(m.why || '')}</p></div>
        <div class="myth-layer try-layer" data-panel="try" hidden><span class="eyebrow">Mini investigation</span><p>${G.esc(m.interaction || '')}</p><p class="small muted">Say your prediction out loud before revealing or testing it. Predictions make the result easier to remember.</p>${G.simFor(m.category, m.s) ? `<button class="btn" type="button" data-trysim="${G.simFor(m.category, m.s)}">Try it for real: open the experiment</button><div class="try-sim"></div>` : ''}</div>
        ${doubts ? `<div class="myth-layer" data-panel="doubts" hidden><span class="eyebrow">Common follow-up doubts</span>${doubts}</div>` : ''}
        ${m.sources && m.sources.length ? `<div class="myth-layer sources" data-panel="sources" hidden><span class="eyebrow">Check the evidence</span>${sourceHTML(m.sources)}</div>` : ''}
        <div class="row myth-next-row"><button class="btn primary" type="button" id="m-next">Next card</button><button class="btn" type="button" id="m-picker">Change mission</button></div>
      </div>`;

      const ans = document.querySelector('.myth-answer');
      ans.querySelectorAll('[data-layer]').forEach(btn => btn.onclick = () => {
        const key = btn.dataset.layer;
        const p = ans.querySelector(`[data-panel="${key}"]`);
        if (!p) return;
        const willOpen = p.hidden;
        ans.querySelectorAll('.myth-layer').forEach(x=>x.hidden=true);
        ans.querySelectorAll('[data-layer]').forEach(x=>x.setAttribute('aria-pressed','false'));
        p.hidden = !willOpen;
        btn.setAttribute('aria-pressed', willOpen ? 'true' : 'false');
        if (willOpen) p.scrollIntoView({behavior:G.reduced?'auto':'smooth',block:'nearest'});
      });
      const ts = ans.querySelector('[data-trysim]'); if (ts) ts.onclick = () => { G.mount(ans.querySelector('.try-sim'), ts.dataset.trysim); ts.remove(); G.award('trysim-' + id, 4, 'Tested a claim'); };
      document.getElementById('m-picker').onclick = renderMythPicker;
      document.getElementById('m-next').onclick = () => {
        const card = document.getElementById('m-card');
        card.classList.add(ok ? 'gone-r' : 'gone-l');
        setTimeout(()=>{ mi++; renderMyth(); }, G.reduced ? 0 : 220);
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
      <div class="section-label"><h2>By topic</h2><span class="eyebrow">hand-written + calculated questions</span></div>
      <div class="topic-grid" id="topic-grid">${DATA.topics.map(t => `<button class="topic" type="button" data-t="${t.id}" style="--c:${t.c}">
        <b>${t.name}</b><span>${G.poolInfo("topic-" + t.id).total.toLocaleString("en-IN")} questions · ${topicBest(t.id) != null ? "best " + topicBest(t.id) + "/10" : "not tried"}</span></button>`).join("")}
        ${[["class11", "Class 11 physics", "var(--good)"], ["class12", "Class 12 physics", "var(--o)"], ["ready", "ISRO Ready", "var(--k)"], ["myths", "Fact or myth", "var(--rose)"], ["heroes", "History of science", "var(--m)"]].map(([id, n, c]) => `<button class="topic" type="button" data-t="${id}" style="--c:${c}"><b>${n}</b><span>${G.poolInfo(id).total.toLocaleString("en-IN")} questions · ${topicBest(id) != null ? "best " + topicBest(id) + "/10" : "not tried"}</span></button>`).join("")}
        <button class="topic mega" type="button" data-t="mega" style="--c:var(--g)"><b>Mega mix</b><span>20 random questions from all ${G.poolInfo("mega").total.toLocaleString("en-IN")}</span></button></div>`;
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
    const pid = id === "mega" || G.POOLS[id] ? id : "topic-" + id, n = id === "mega" ? 20 : 10;
    const label = id === "mega" ? "Mega mix" : (DATA.topics.find(x => x.id === id) || G.POOLS[pid] || {}).name || id;
    run = { topic: id, qs: G.drawSet(pid, n), i: 0, score: 0, label };
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
      root.querySelector("#q-fb").innerHTML = `<p><b class="${ok ? "ok" : "no"}">${ok ? "Correct." : "Not this time."}</b> ${q.whys && !ok ? q.whys[pick] + " " : ""}${q.e || ""}</p>${q.steps ? `<ol class="steps">${q.steps.map(x => `<li>${x}</li>`).join("")}</ol>` : ""}
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
  function para(s) { return String(s || '').split(/\n\s*\n/).map(x=>`<p>${G.esc(x)}</p>`).join(''); }
  function heroSources(h) {
    const ids = h && h.expanded && h.expanded.sources || [];
    return ids.map(id=>{
      const s=DATA.referenceSources && DATA.referenceSources[id];
      return s ? `<a class="source-link" href="${G.esc(s.url)}" target="_blank" rel="noopener noreferrer">${G.esc(s.title)} ↗</a>` : '';
    }).filter(Boolean).join('');
  }
  Hr.init = function () {
    const box = document.getElementById("heroes");
    box.insertAdjacentHTML('beforebegin', `<div class="hero-tools" id="hero-tools"><input class="text-input" id="hero-search" placeholder="Search scientist, discovery or idea…" autocomplete="off"><button class="chip" type="button" id="hero-random">Surprise me</button></div>`);
    renderHeroes('');
    document.getElementById('hero-search').addEventListener('input', e=>renderHeroes(e.target.value));
    document.getElementById('hero-random').onclick=()=>{
      const i=Math.floor(Math.random()*DATA.heroes.length); renderHeroes('',i); setTimeout(()=>document.querySelector(`[data-h="${i}"] .hero-open`).click(),0);
    };
  };

  function renderHeroes(filter='', focusIndex=null) {
    const box = document.getElementById('heroes');
    const q=filter.trim().toLowerCase();
    const list=DATA.heroes.map((h,i)=>({h,i})).filter(({h})=>!q || [h.n,h.tag,h.b,h.expanded&&h.expanded.discovery,h.expanded&&h.expanded.why_it_matters].join(' ').toLowerCase().includes(q));
    box.innerHTML = list.map(({h,i})=>{
      const x=h.expanded;
      const short=x ? x.hook : h.b;
      return `<article class="panel hero-card" data-h="${i}">
        <button class="hero-open" type="button" aria-expanded="false"><span class="y">${G.esc(h.y)}</span><h3>${G.esc(h.n)}</h3><span class="tag">${G.esc(h.tag)}</span><p class="hero-hook">${G.esc(short)}</p><span class="more">${G.state.heroes[i] ? 'Read · tap to open' : 'Tap to explore'}</span></button>
        <div class="hero-full" hidden></div>
      </article>`;
    }).join('') || `<div class="panel"><p>No Giant matches that search yet.</p></div>`;
    if (focusIndex != null) setTimeout(()=>box.querySelector(`[data-h="${focusIndex}"]`)?.scrollIntoView({behavior:G.reduced?'auto':'smooth',block:'start'}),20);

    box.querySelectorAll('.hero-open').forEach(open=>open.onclick=()=>toggleHero(open.closest('.hero-card')));
  }

  function toggleHero(c) {
    const i=+c.dataset.h, h=DATA.heroes[i], x=h.expanded, full=c.querySelector('.hero-full'), opening=full.hidden;
    document.querySelectorAll('.hero-card .hero-full:not([hidden])').forEach(p=>{ if(p!==full){p.hidden=true; p.closest('.hero-card').querySelector('.hero-open').setAttribute('aria-expanded','false');}});
    full.hidden=!opening; c.querySelector('.hero-open').setAttribute('aria-expanded',opening);
    c.querySelector('.more').textContent=opening?'Tap title to close':'Read · tap to open';
    if (!opening) return;
    if (!G.state.heroes[i]) {
      G.state.heroes[i]=1; G.save(); G.addXP(5,'met a Giant');
      const n=Object.keys(G.state.heroes).length;
      if(n>=8) G.badge('heroes');
      if(n>=DATA.heroes.length) G.award('heroes-done',30,'Mission complete');
    }
    if (!full.dataset.built) {
      full.dataset.built='1';
      if (!x) { full.innerHTML=`<div class="hero-section"><span class="eyebrow">Story</span><p>${G.esc(h.b)}</p></div>`; return; }
      const quiz=x.quiz || null;
      full.innerHTML=`
        <div class="hero-tabs" role="tablist">
          <button class="chip" type="button" data-hero-tab="story" aria-pressed="true">Story</button>
          <button class="chip" type="button" data-hero-tab="discovery">Discovery</button>
          <button class="chip" type="button" data-hero-tab="matter">Why it matters</button>
          <button class="chip" type="button" data-hero-tab="kid">Explain like I'm 9</button>
          <button class="chip" type="button" data-hero-tab="try">Try it</button>
          ${quiz ? '<button class="chip" type="button" data-hero-tab="quiz">Mini quiz</button>' : ''}
          ${x.sources && x.sources.length ? '<button class="chip" type="button" data-hero-tab="sources">Sources</button>' : ''}
        </div>
        <div class="hero-pane" data-hero-pane="story"><span class="eyebrow">The human story</span>${para(x.story)}${x.challenge_or_context?`<div class="context-note"><b>Context worth knowing</b><p>${G.esc(x.challenge_or_context)}</p></div>`:''}</div>
        <div class="hero-pane" data-hero-pane="discovery" hidden><span class="eyebrow">What changed because of them?</span><p>${G.esc(x.discovery)}</p></div>
        <div class="hero-pane" data-hero-pane="matter" hidden><span class="eyebrow">Why this matters today</span><p>${G.esc(x.why_it_matters)}</p></div>
        <div class="hero-pane kid-pane" data-hero-pane="kid" hidden><span class="eyebrow">Imagine this</span><p>${G.esc(x.kid_analogy)}</p></div>
        <div class="hero-pane try-layer" data-hero-pane="try" hidden><span class="eyebrow">Make the idea move</span><p>${G.esc(x.interaction)}</p>${G.HERO_SIM[h.n] ? `<button class="btn" type="button" data-hsim="${G.HERO_SIM[h.n]}">Open the related experiment</button><div class="try-sim"></div>` : ''}</div>
        ${quiz?`<div class="hero-pane" data-hero-pane="quiz" hidden><span class="eyebrow">One-question challenge</span><p class="hero-q">${G.esc(quiz.q)}</p><div class="hero-options">${quiz.options.map((o,j)=>`<button class="opt" type="button" data-ho="${j}">${G.esc(o)}</button>`).join('')}</div><div class="feedback hero-qfb" aria-live="polite"></div></div>`:''}
        ${x.sources&&x.sources.length?`<div class="hero-pane sources" data-hero-pane="sources" hidden><span class="eyebrow">Read the evidence</span>${heroSources(h)}</div>`:''}`;
      full.querySelectorAll('[data-hero-tab]').forEach(btn=>btn.onclick=()=>{
        const key=btn.dataset.heroTab;
        full.querySelectorAll('[data-hero-pane]').forEach(p=>p.hidden=p.dataset.heroPane!==key);
        full.querySelectorAll('[data-hero-tab]').forEach(b=>b.setAttribute('aria-pressed', b===btn?'true':'false'));
      });
      const hs = full.querySelector('[data-hsim]'); if (hs) hs.onclick = () => { G.mount(full.querySelector('.try-sim'), hs.dataset.hsim); hs.remove(); };
      if (quiz) {
        full.querySelector('.hero-options').onclick=e=>{
          const b=e.target.closest('[data-ho]'); if(!b||b.disabled) return;
          const pick=+b.dataset.ho, ok=pick===quiz.answer;
          full.querySelectorAll('[data-ho]').forEach(o=>{o.disabled=true;if(+o.dataset.ho===quiz.answer)o.classList.add('right');else if(o===b)o.classList.add('wrong');});
          full.querySelector('.hero-qfb').innerHTML=`<p><b class="${ok?'ok':'no'}">${ok?'Correct.':'Not this time.'}</b> ${G.esc(quiz.why)}</p>`;
          G.state.heroQuiz=G.state.heroQuiz||{};
          if(ok&&!G.state.heroQuiz[i]){G.state.heroQuiz[i]=1;G.save();G.addXP(5,'Giant challenge');if(Object.keys(G.state.heroQuiz).length>=8)G.badge('hero-scholar');}
        };
      }
    }
    setTimeout(()=>c.scrollIntoView({behavior:G.reduced?'auto':'smooth',block:'start'}),20);
  }

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
