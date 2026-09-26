/* Glossary: tap-to-explain pop-ups for difficult words.
   Own entries (astronomy, space, physics) are merged with the 92 terms from Physics Quest (DATA.lgloss). */
(function () {
  /* t: title, d: simple explanation, f: formula, x: example / where you meet it, m: mission to explore, alt: other spellings, nl: don't auto-link */
  const E = [
    ["Big Bang", "The moment, 13.8 billion years ago, when space itself began expanding from an extremely hot, dense state. Not an explosion in space, but an expansion of space everywhere.", "", "The Cosmic Microwave Background is its leftover glow.", "origin"],
    ["cosmic calendar", "Carl Sagan's trick: squeeze all 13.8 billion years into one calendar year so the huge timescales make sense.", "1 cosmic day ≈ 37.8 million years", "All of human history fits in the last few seconds of 31 December.", "origin"],
    ["cosmic microwave background", "Faint microwave light filling the whole sky, released 380,000 years after the Big Bang when atoms first formed. It is the oldest light we can see.", "T today = 2.725 K", "Discovered by accident in 1965 by Penzias and Wilson.", "origin", ["CMB"]],
    ["redshift", "Light from something moving away (or crossing expanding space) gets stretched to longer, redder wavelengths.", "z = (λ_observed − λ_emitted) / λ_emitted", "The most distant galaxies JWST sees have z above 10: their light is stretched over 11 times.", "origin"],
    ["Hubble's law", "The farther away a galaxy is, the faster it moves away from us. The clue that the universe is expanding.", "v = H₀ × d,  H₀ ≈ 70 km/s per Mpc", "A galaxy 100 Mpc away recedes at about 7,000 km/s.", "origin", ["Hubble constant"]],
    ["dark matter", "Invisible matter that does not glow or absorb light, but whose gravity holds galaxies together. About 27% of the universe.", "", "Vera Rubin found stars at galaxy edges orbiting too fast without it.", "origin"],
    ["dark energy", "The unknown something making the universe's expansion speed up. About 68% of the universe's energy.", "", "Discovered in 1998 using exploding white dwarfs (Type Ia supernovae).", "origin"],
    ["inflation", "A proposed instant of super-fast expansion in the first tiny fraction of a second. It explains why the universe looks so smooth. Strongly supported, not yet proven.", "", "", "origin"],
    ["light year", "The distance light travels in one year. It measures distance, not time!", "1 ly ≈ 9.46 × 10¹² km", "Proxima Centauri is 4.24 light years away.", "scale", ["light-year", "light years"]],
    ["astronomical unit", "The average distance from Earth to the Sun, used for distances inside the Solar System.", "1 AU ≈ 1.496 × 10⁸ km", "Jupiter is about 5.2 AU from the Sun.", "scale", ["AU"]],
    ["parsec", "The distance at which a star shifts by one arcsecond as Earth goes around the Sun. Astronomers' favourite unit.", "1 pc ≈ 3.26 light years ≈ 3.09 × 10¹³ km", "The Milky Way's centre is about 8,000 parsecs away.", "stars"],
    ["parallax", "The apparent shift of a nearby object against far background when you change your viewpoint. Blink one eye, then the other, and your thumb jumps!", "d (parsec) = 1 / p (arcsecond)", "Used to measure distances to nearby stars.", "stars"],
    ["magnitude", "The brightness scale for stars. Smaller numbers mean brighter, and negative numbers are very bright.", "5 magnitudes = 100 times in brightness", "Sirius is −1.46, the faintest naked-eye stars are about +6.", "stars"],
    ["spectral class", "A star's letter grade by temperature: O, B, A, F, G, K, M, from hottest (blue) to coolest (red).", "", "The Sun is class G. Betelgeuse is class M.", "stars", ["spectral type"]],
    ["main sequence", "The long, stable 'adult' stage of a star's life, when it fuses hydrogen into helium in its core.", "lifetime ≈ 10¹⁰ × M^−2.5 years", "The Sun is about halfway through its 10-billion-year main sequence.", "stars"],
    ["red giant", "A star near the end of its life whose core has shrunk and outer layers have swollen up and cooled.", "", "The Sun will become one in about 5 billion years.", "stars"],
    ["white dwarf", "The hot, Earth-sized core left behind by a Sun-like star. No fusion, just slowly cooling.", "maximum mass ≈ 1.4 Suns (Chandrasekhar limit)", "Sirius B is a white dwarf.", "stars"],
    ["neutron star", "The collapsed core of a massive star, about 20 km across but heavier than the Sun. A teaspoon would weigh about a billion tonnes.", "", "Pulsars are spinning neutron stars.", "stars"],
    ["pulsar", "A spinning neutron star whose radio beams sweep past Earth like a lighthouse, giving regular pulses.", "", "Discovered by Jocelyn Bell Burnell in 1967.", "stars"],
    ["supernova", "The colossal explosion of a star, either a massive star's core collapsing or a white dwarf blowing up.", "", "The Crab Nebula is the remains of a supernova seen in 1054 CE.", "stars", ["supernovae"]],
    ["Chandrasekhar limit", "The heaviest a white dwarf can be, about 1.4 times the Sun's mass. Heavier cores must collapse further.", "M ≈ 1.4 M☉", "Worked out by 19-year-old Subrahmanyan Chandrasekhar in 1930.", "stars"],
    ["nebula", "A giant cloud of gas and dust in space. Some are star nurseries, others are the remains of dying stars.", "", "The Orion Nebula is visible below Orion's belt.", "stars", ["nebulae"]],
    ["Wien's law", "Hotter objects glow brightest at shorter wavelengths. That is why hot stars look blue and cool stars look red.", "λ_max × T = 2.898 × 10⁻³ m·K", "The Sun (5,772 K) peaks at about 500 nm, green-yellow light.", "stars", ["Wien's displacement law"]],
    ["Stefan–Boltzmann law", "The power a hot object radiates rises with the fourth power of its temperature. Double the temperature, 16 times the power.", "P = σAT⁴", "Explains why hot blue stars are so luminous.", "stars", ["Stefan-Boltzmann law"]],
    ["luminosity", "The total energy a star gives out every second, however far away it is.", "L = 4πR²σT⁴", "Rigel is roughly 100,000 times more luminous than the Sun.", "stars"],
    ["black hole", "A region where so much mass is packed so tightly that nothing, not even light, can escape from inside its event horizon.", "r_s = 2GM/c²", "Our galaxy's centre hosts Sagittarius A*, about 4 million Suns.", "spacetime"],
    ["event horizon", "The point of no return around a black hole. Cross it and even light cannot get back out.", "r_s = 2GM/c² ≈ 2.95 km per solar mass", "Earth squeezed to 9 mm would have an event horizon.", "spacetime", ["Schwarzschild radius"]],
    ["photon sphere", "The distance from a black hole (1.5 times the horizon radius) where light itself can travel in a circle.", "r = 3GM/c²", "", "spacetime"],
    ["spacetime", "Space and time woven into one four-dimensional fabric. Mass curves it, and objects follow the curves.", "", "Einstein's general relativity, 1915.", "spacetime"],
    ["time dilation", "Time really runs slower for fast-moving clocks and for clocks deep in gravity.", "γ = 1/√(1 − v²/c²)", "GPS satellites correct their clocks by 38 microseconds every day.", "spacetime"],
    ["length contraction", "A fast-moving object measures shorter along its direction of motion.", "L = L₀/γ", "Only noticeable near the speed of light.", "spacetime"],
    ["twin paradox", "A twin who travels at nearly light speed and returns is younger than the twin who stayed home.", "t_traveller = t_Earth / γ", "Real: atomic clocks flown on planes come back slightly behind.", "spacetime"],
    ["E = mc²", "Mass is a super-concentrated form of energy. A tiny bit of mass can become a huge amount of energy.", "E = mc²,  c = 3 × 10⁸ m/s", "The Sun turns about 4 million tonnes of mass into energy every second.", "spacetime", ["mass-energy equivalence"]],
    ["gravitational wave", "Ripples in spacetime itself, made by very heavy objects accelerating, like two black holes spiralling together.", "", "First detected by LIGO in 2015.", "spacetime", ["gravitational waves"]],
    ["constellation", "A named pattern of stars, and officially one of 88 regions that divide up the whole sky.", "", "Orion, Scorpius and Cassiopeia are constellations.", "sky", ["constellations"]],
    ["asterism", "A famous star pattern that is not one of the 88 official constellations.", "", "The Big Dipper is an asterism inside Ursa Major.", "sky"],
    ["nakshatra", "One of the 27 (or 28) lunar mansions of Indian astronomy, star groups the Moon passes through during its monthly journey.", "", "Rohini (Aldebaran), Krittika (Pleiades), Jyeshtha (Antares).", "sky", ["nakshatras"]],
    ["moon phase", "How much of the Moon's sunlit half we can see from Earth. It cycles every 29.5 days.", "lit fraction = (1 − cos θ) / 2", "Full moon happens when the Moon is opposite the Sun in our sky.", "sky", ["phases of the Moon", "lunar phase"]],
    ["eclipse", "When one body moves into another's shadow. Solar eclipse: Moon blocks the Sun. Lunar eclipse: Earth's shadow falls on the Moon.", "", "", "sky"],
    ["latitude", "How far north or south of the equator you are, in degrees.", "altitude of Polaris = your latitude", "Delhi is at about 28.6°N.", "sky"],
    ["Pole Star", "Polaris, the star almost exactly above Earth's North Pole. It stays nearly still while other stars circle it.", "", "Called Dhruva Tara in India.", "sky", ["Polaris"]],
    ["precession", "The slow 26,000-year wobble of Earth's axis, like a spinning top. It changes which star is the pole star.", "", "Vega will be near the pole around 14,000 CE.", "sky"],
    ["Newton's second law", "The net force on an object equals its mass times its acceleration.", "F = ma = dp/dt", "The same push moves a bicycle more than a truck.", "newton"],
    ["Newton's third law", "Every force has an equal and opposite partner force, acting on the other object.", "F_AB = −F_BA", "A rocket pushes gas down; the gas pushes the rocket up.", "newton"],
    ["weight", "The force of gravity on an object. It changes from planet to planet, while mass does not.", "W = mg", "A 50 kg person weighs about 490 N on Earth and 81 N on the Moon.", "newton", null, 1],
    ["mass", "How much matter something contains. It is the same everywhere in the universe.", "SI unit: kilogram", "", "newton", null, 1],
    ["momentum", "Mass times velocity. It measures how hard it is to stop something, and it is conserved in collisions.", "p = mv", "Guns recoil because momentum is conserved.", "newton"],
    ["impulse", "The change in momentum produced by a force acting for a time.", "J = FΔt = Δp", "Airbags increase Δt so the force on you is smaller.", "newton"],
    ["projectile motion", "The curved path of something thrown: steady sideways motion plus falling motion together, making a parabola.", "R = u² sin 2θ / g", "Maximum range at 45° without air resistance.", "newton", ["projectile"]],
    ["centripetal force", "The inward force that keeps something moving in a circle. Without it, the object flies off in a straight line.", "F = mv²/r", "For the Moon, gravity provides it.", "newton", ["centripetal acceleration"]],
    ["acceleration due to gravity", "How fast things speed up when falling freely.", "g = GM/R² ≈ 9.8 m/s² on Earth", "g decreases with height and with depth.", "newton", ["g"], 1],
    ["universal gravitation", "Every mass attracts every other mass. The pull weakens with the square of distance.", "F = Gm₁m₂/r²,  G = 6.67 × 10⁻¹¹ N m²/kg²", "The same law drops apples and holds the Moon.", "newton", ["law of gravitation", "gravitational constant"]],
    ["orbital speed", "The sideways speed needed to keep falling around a planet without hitting it.", "v = √(GM/r)", "About 7.7 km/s at the ISS's height.", "newton", ["orbital velocity"]],
    ["escape velocity", "The minimum launch speed to break free from a planet's gravity for good (ignoring air).", "v = √(2GM/R)", "About 11.2 km/s for Earth and 2.4 km/s for the Moon.", "newton", ["escape speed"]],
    ["Kepler's third law", "Planets farther from the Sun take much longer to orbit: the square of the period is proportional to the cube of the orbit size.", "T² ∝ a³", "Mars at 1.52 AU takes 1.88 years.", "newton", ["Kepler's laws"]],
    ["geostationary orbit", "An orbit 35,786 km above the equator where a satellite circles once a day, so it seems to hover over one spot.", "T = 24 h (sidereal day)", "India's GSAT and INSAT satellites.", "ready", ["geostationary"]],
    ["low Earth orbit", "Orbits from about 160 to 2,000 km up. Fast, and close enough for sharp photos.", "one lap ≈ 90 minutes", "The ISS and most Earth-observation satellites.", "ready", ["LEO"]],
    ["sun-synchronous orbit", "A near-polar orbit that passes over each place at the same local time every day, so lighting stays consistent for photos.", "precesses ≈ 0.986° per day", "Used by India's Cartosat and Resourcesat satellites.", "ready"],
    ["Lagrange point", "A spot where the gravity of two big bodies and the orbital motion balance, so a spacecraft can 'park' there.", "L1 is ≈ 1.5 million km from Earth, towards the Sun", "Aditya-L1 watches the Sun from L1; JWST sits near L2.", "ready", ["L1", "L2", "Lagrange points"]],
    ["rocket equation", "Tsiolkovsky's equation: how much speed a rocket can gain depends on its exhaust speed and how much of its mass is fuel.", "Δv = v_e ln(m₀/m_f)", "Why rockets have stages and why ISRO built cryogenic engines.", "ready", ["Tsiolkovsky rocket equation"]],
    ["specific impulse", "A rocket engine's fuel efficiency: how long it can push with one unit of propellant weight.", "I_sp = v_e / g₀", "Cryogenic hydrogen-oxygen engines reach about 450 s.", "ready", ["Isp"]],
    ["thrust", "The push a rocket engine produces by throwing gas backwards.", "F = ṁ v_e", "", "ready"],
    ["cryogenic engine", "A rocket engine burning super-cold liquid hydrogen (−253 °C) and liquid oxygen (−183 °C). Very efficient but hard to build.", "", "Powers the upper stages of GSLV and LVM3.", "ready"],
    ["Hohmann transfer", "The most fuel-efficient way to move between two circular orbits: two engine burns and half an ellipse in between.", "", "Used for LEO to GEO, and roughly for Earth to Mars.", "ready"],
    ["remote sensing", "Studying Earth from far away using the light or radar signals it reflects or gives off.", "", "ISRO's Resourcesat, Cartosat and NISAR.", "ready"],
    ["apogee", "The farthest point of an orbit around Earth. The closest point is the perigee.", "", "", "ready", ["perigee"]],
    ["gravity assist", "Swinging past a planet to steal a little of its orbital speed and change direction for free.", "", "Voyager used Jupiter and Saturn.", "ready", ["slingshot"]],
    ["ISRO", "The Indian Space Research Organisation, founded in 1969 by Vikram Sarabhai. India's space agency.", "", "Chandrayaan, Mangalyaan, Aditya-L1, Gaganyaan.", "isro"],
    ["surface gravity", "How strongly a planet pulls things at its surface.", "g = GM/R²", "Jupiter's is 2.5 times Earth's; the Moon's is 1/6.", "newton"],
    ["greenhouse effect", "Gases like CO₂ let sunlight in but trap outgoing heat, warming a planet.", "", "It makes Venus hotter than Mercury.", "myths"],
    ["Doppler effect", "A wave's frequency rises when the source approaches and falls when it moves away.", "Δf/f ≈ v/c (light, small speeds)", "Ambulance sirens, and redshift of galaxies.", "ready"],
    ["electromagnetic wave", "A wave of linked electric and magnetic fields that travels at the speed of light, even through empty space.", "c = fλ", "Radio, microwaves, infrared, light, UV, X-rays and gamma rays.", "academy", ["electromagnetic waves", "EM wave"]],
    ["electromagnetic spectrum", "The full family of electromagnetic waves, ordered by wavelength.", "", "Radio (longest) to gamma rays (shortest).", "academy"],
    ["photoelectric effect", "Light knocking electrons out of a metal. It only works if each photon has enough energy.", "K_max = hf − φ", "Einstein's Nobel Prize (1921).", "academy"],
    ["binding energy", "The energy needed to pull a nucleus apart into its protons and neutrons. It comes from the 'missing' mass.", "E_b = Δm c²", "Iron-56 is among the most tightly bound nuclei.", "academy"],
    ["mass defect", "A nucleus weighs a little less than its separate parts. The missing mass became binding energy.", "Δm = (Zm_p + Nm_n) − M", "", "academy"],
    ["Coulomb's law", "The force between two charges gets 4 times weaker when you double the distance.", "F = kq₁q₂/r²", "", "academy"],
    ["Ohm's law", "For many conductors, current is proportional to voltage.", "V = IR", "", "academy"],
    ["Lenz's law", "An induced current always flows to oppose the change that created it.", "ε = −N dΦ/dt", "A magnet falls slowly through a copper pipe.", "academy"],
    ["total internal reflection", "When light inside glass or water hits the surface at too steep an angle, it reflects back completely.", "sin c = 1/n", "Makes diamonds sparkle and optical fibres work.", "academy"],
    ["lens formula", "Links an object's distance, its image's distance and the lens's focal length.", "1/v − 1/u = 1/f", "", "academy"],
    ["focal length", "The distance from a lens or mirror to the point where parallel rays meet.", "P = 1/f (dioptre, f in metres)", "", "academy"],
    ["Bohr model", "The atom as a tiny nucleus with electrons on fixed energy 'floors'. Jumping down a floor releases a photon of one exact colour.", "E_n = −13.6/n² eV", "Explains hydrogen's spectral lines.", "academy"],
    ["spectral line", "A sharp bright or dark line at one exact wavelength, the fingerprint of a particular atom.", "", "Hydrogen's red H-alpha line at 656 nm.", "academy", ["spectral lines", "absorption lines"]],
    ["rectifier", "A circuit using diodes to turn alternating current into one-way (direct) current.", "full-wave output = 2 × input frequency", "Every phone charger has one.", "academy"],
    ["solar constant", "The sunlight power arriving on each square metre just above Earth's atmosphere.", "≈ 1,361 W/m²", "Used to size satellite solar panels.", "ready"],
    ["Hawking radiation", "A predicted faint glow from black holes, due to quantum effects near the horizon. Not yet observed.", "", "", "spacetime"],
    ["quasar", "The blazing centre of a distant galaxy, powered by gas falling into a supermassive black hole.", "", "", "origin"],
    ["exoplanet", "A planet orbiting a star other than the Sun. Thousands are known.", "", "The first around a Sun-like star was found in 1995.", "heroes", ["exoplanets"]],
    ["scientific method", "Observe, guess an explanation, predict, test with experiments, and change your mind if the evidence says so.", "", "", "heroes", null, 1],
    ["powers of ten", "Writing numbers as 10 multiplied by itself, so huge and tiny numbers fit on one line.", "10³ = 1000,  10⁻³ = 0.001", "", "scale", ["scientific notation"]],
    ["units", "Agreed standard amounts used to measure things, like the metre, kilogram and second.", "7 SI base units", "", "academy", null, 1],
    ["meteor", "A streak of light when a small space rock burns up in our atmosphere. If it reaches the ground, it is a meteorite.", "", "", "myths", ["meteorite", "shooting star"]],
    ["comet", "An icy body that grows a glowing head and tail when it comes near the Sun.", "", "Halley's comet returns every 76 years.", "myths", ["comets"]],
    ["tidal locking", "When a moon's spin slows until it turns once per orbit, always showing the same face.", "", "Why we only ever see one side of the Moon.", "sky", ["tidally locked"]],
    ["zodiac", "The band of 12 (really 13) constellations the Sun appears to pass through during the year. An astronomy idea, separate from astrology.", "", "Ophiuchus is the 13th.", "myths"],
    ["galaxy", "A huge system of stars, gas, dust and dark matter held together by gravity.", "", "The Milky Way has 100 to 400 billion stars.", "origin", ["galaxies"]],
    ["Milky Way", "Our home galaxy, a barred spiral about 100,000 light years across.", "", "", "origin"]
  ];

  const G2 = G.GLOSS = {};
  const add = (t, o) => { G2[t.toLowerCase()] = Object.assign({ t, alt: [] }, o); };
  E.forEach(([t, d, f, x, m, alt, nl]) => add(t, { d, f, x, m, alt: alt || [], nl: !!nl }));
  const NOLINK = ["work", "power", "heat", "spin", "operator", "observable", "quantum", "accuracy", "precision", "temperature", "pressure", "electron", "atom", "nucleus", "voltage", "unitary", "locality", "dimension", "scalar", "vector", "velocity", "displacement", "acceleration", "electric charge"];
  Object.entries(DATA.lgloss || {}).forEach(([t, d]) => {
    const k = t.toLowerCase();
    if (G2[k]) G2[k].def = d;
    else add(t, { d, m: /qubit|entangle|bell|decoherence|wavefunction|superposition|eigen|tunnel|quantum|boson|fermion|cloning|hidden|vacuum|probability amplitude/i.test(t) ? "quantum" : "academy", nl: NOLINK.includes(k) });
  });
  G.glossCount = () => Object.keys(G2).length;

  /* ---------- lookup ---------- */
  const alias = {};
  Object.values(G2).forEach(e => { alias[e.t.toLowerCase()] = e; e.alt.forEach(a => alias[a.toLowerCase()] = e); });
  G.findTerm = s => alias[String(s || "").toLowerCase()] || null;
  const linkable = Object.keys(alias).filter(k => !alias[k].nl && k.length > 2).sort((a, b) => b.length - a.length);
  const re = new RegExp("(^|[^A-Za-z0-9])(" + linkable.map(k => k.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|") + ")(?=$|[^A-Za-z0-9])", "i");
  G.termsIn = function (text, max) {
    const low = String(text || "").toLowerCase(), found = [];
    for (const k of linkable) { if (found.length >= (max || 12)) break; const e = alias[k]; if (!found.includes(e) && new RegExp("(^|[^a-z0-9])" + k.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + "($|[^a-z0-9])").test(low)) found.push(e); }
    return found;
  };

  /* ---------- auto-link words inside readable text ---------- */
  const SKIP = "BUTTON,A,INPUT,LABEL,SELECT,TEXTAREA,CANVAS,SCRIPT,STYLE,H1,H2,H3,CODE,SVG";
  G.linkify = function (root) {
    const blocks = root.querySelectorAll ? root.querySelectorAll("p, li, dd, .kidline, .answer-body p") : [];
    blocks.forEach(block => {
      if (block.dataset.lk || block.closest("button, .opt, .chip, .brand, .bar, .no-gloss")) return;
      block.dataset.lk = "1";
      let links = 0; const used = new Set();
      const walker = document.createTreeWalker(block, NodeFilter.SHOW_TEXT, { acceptNode: n => n.parentElement.closest(SKIP) ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_ACCEPT });
      const nodes = []; while (walker.nextNode()) nodes.push(walker.currentNode);
      const rg = new RegExp(re.source, "gi");
      for (const node of nodes) {
        if (links >= 3) break;
        const text = node.nodeValue, frag = document.createDocumentFragment();
        let m, last = 0, changed = false; rg.lastIndex = 0;
        while (links < 3 && (m = rg.exec(text))) {
          const word = m[2], e = alias[word.toLowerCase()], start = m.index + m[1].length;
          if (!e || used.has(e)) continue;
          used.add(e); links++; changed = true;
          frag.appendChild(document.createTextNode(text.slice(last, start)));
          const b = document.createElement("button");
          b.type = "button"; b.className = "term"; b.dataset.term = e.t; b.textContent = word;
          b.setAttribute("aria-haspopup", "dialog");
          frag.appendChild(b);
          last = start + word.length;
        }
        if (changed) { frag.appendChild(document.createTextNode(text.slice(last))); node.parentNode.replaceChild(frag, node); }
      }
    });
  };

  /* ---------- the pop-up ---------- */
  let lastFocus = null;
  function modal() {
    let m = document.getElementById("gloss-modal");
    if (m) return m;
    m = document.createElement("div");
    m.id = "gloss-modal"; m.className = "modal"; m.hidden = true;
    m.innerHTML = `<div class="modal-card" role="dialog" aria-modal="true" aria-labelledby="gm-title">
      <div class="modal-head"><span class="eyebrow" id="gm-kicker">Explain this word</span><button class="icon-btn" type="button" id="gm-close" aria-label="Close">✕</button></div>
      <div id="gm-body"></div></div>`;
    document.body.appendChild(m);
    m.addEventListener("click", e => { if (e.target === m) close(); });
    m.querySelector("#gm-close").addEventListener("click", close);
    document.addEventListener("keydown", e => { if (e.key === "Escape" && !m.hidden) close(); });
    return m;
  }
  function close() { const m = modal(); m.hidden = true; document.body.classList.remove("modal-open"); if (lastFocus) lastFocus.focus(); }
  function open(html, kicker) {
    const m = modal();
    if (m.hidden) lastFocus = document.activeElement;
    m.querySelector("#gm-kicker").textContent = kicker || "Explain this word";
    m.querySelector("#gm-body").innerHTML = html;
    m.hidden = false; document.body.classList.add("modal-open");
    m.querySelector("#gm-close").focus();
  }
  G.modal = { open, close };

  const MNAME = { origin: "From the first second", stars: "Life of a star", sky: "Night sky", spacetime: "Bend spacetime", newton: "Newton's lab", myths: "Myth or fact", heroes: "Giants of the cosmos", scale: "How far is far", academy: "Physics Academy", isro: "India in space", ready: "ISRO Ready", quantum: "Quantum World" };
  G.explain = function (term) {
    const e = G.findTerm(term);
    if (!e) { G.search(term); return; }
    const opened = G.state.words || (G.state.words = {});
    if (!opened[e.t]) { opened[e.t] = 1; G.save(); if (Object.keys(opened).length >= 20) G.badge("word-nerd"); }
    const related = G.termsIn(e.d + " " + (e.x || "") + " " + (e.def || ""), 6).filter(r => r !== e);
    open(`<h2 id="gm-title" class="gm-title">${e.t}</h2>
      <p class="gm-simple"><b>In simple words:</b> ${e.d}</p>
      ${e.def && e.def !== e.d ? `<p class="muted">${e.def}</p>` : ""}
      ${e.f ? `<div class="gm-formula mono">${e.f}</div>` : ""}
      ${e.x ? `<p class="gm-ex"><b>Example:</b> ${e.x}</p>` : ""}
      ${related.length ? `<div class="gm-rel"><span class="eyebrow">Related words</span><div class="row">${related.map(r => `<button class="chip" type="button" data-term="${r.t}">${r.t}</button>`).join("")}</div></div>` : ""}
      <div class="row gm-actions">${e.m && MNAME[e.m] ? `<button class="btn" type="button" data-go-close="${e.m}">Explore it: ${MNAME[e.m]}</button>` : ""}<button class="btn" type="button" id="gm-search">Look up another word</button></div>`);
    document.getElementById("gm-search").onclick = () => G.search("");
  };
  G.search = function (q) {
    open(`<h2 id="gm-title" class="gm-title">Stuck on a word?</h2>
      <div class="field"><label for="gm-q">Type any physics or space word</label><input class="text-input" id="gm-q" type="search" autocomplete="off" value="${G.esc(q || "")}" placeholder="e.g. redshift, torque, qubit"></div>
      <p class="small muted">${G.glossCount()} words explained, from astronomy to quantum physics.</p>
      <div class="gm-list" id="gm-list"></div>`, "Word finder");
    const inp = document.getElementById("gm-q"), list = document.getElementById("gm-list");
    const all = Object.values(G2).sort((a, b) => a.t.localeCompare(b.t));
    const draw = () => {
      const s = inp.value.trim().toLowerCase();
      const hits = all.filter(e => !s || e.t.toLowerCase().includes(s) || e.alt.some(a => a.toLowerCase().includes(s)) || e.d.toLowerCase().includes(s)).slice(0, s ? 40 : 200);
      list.innerHTML = hits.length ? hits.map(e => `<button class="gm-item" type="button" data-term="${e.t}"><b>${e.t}</b><span>${e.d.length > 90 ? e.d.slice(0, 88) + "…" : e.d}</span></button>`).join("") : `<p class="muted">No match yet. Try a shorter word, or ask your teacher and add it to your notebook.</p>`;
    };
    inp.addEventListener("input", draw); draw(); inp.focus();
  };

  document.addEventListener("click", e => {
    const t = e.target.closest("[data-term]");
    if (t) { e.preventDefault(); G.explain(t.dataset.term); return; }
    const g = e.target.closest("[data-go-close]");
    if (g) { close(); location.hash = g.dataset.goClose; }
  });

  /* auto-link new content as it appears */
  let pend = null;
  const mo = new MutationObserver(() => { clearTimeout(pend); pend = setTimeout(() => G.linkify(document.getElementById("app")), 60); });
  window.addEventListener("DOMContentLoaded", () => { const app = document.getElementById("app"); if (app) { mo.observe(app, { childList: true, subtree: true }); G.linkify(app); } });
  if (document.readyState !== "loading") setTimeout(() => { const app = document.getElementById("app"); if (app) { mo.observe(app, { childList: true, subtree: true }); G.linkify(app); } }, 0);
})();
