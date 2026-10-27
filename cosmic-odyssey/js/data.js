/* Cosmic Odyssey: content data.
   Facts checked against NASA, ESA, IAU and ISRO public sources.
   Where science is uncertain, the text says so. */

window.DATA = {};

/* ---------- Ranks ---------- */
DATA.ranks = [
  { xp: 0,    name: "Stargazer" },
  { xp: 120,  name: "Space Cadet" },
  { xp: 320,  name: "Navigator" },
  { xp: 650,  name: "Astronomer" },
  { xp: 1100, name: "Astrophysicist" },
  { xp: 1700, name: "Cosmologist" }
];

/* ---------- Badges ---------- */
DATA.badges = [
  { id: "first-light",  name: "First Light",       desc: "Start your odyssey" },
  { id: "big-bang",     name: "Time Traveller",    desc: "Scrub the timeline to today" },
  { id: "calendar",     name: "Cosmic Calendar",   desc: "Find where your life fits in cosmic time" },
  { id: "star-dwarf",   name: "White Dwarf",       desc: "Guide a Sun-like star to its end" },
  { id: "star-neutron", name: "Neutron Star",      desc: "Guide a massive star to a neutron star" },
  { id: "star-bh",      name: "Black Hole",        desc: "Guide a giant star to a black hole" },
  { id: "sky-builder",  name: "Sky Architect",     desc: "Draw 3 constellations from memory" },
  { id: "sky-master",   name: "Star Cartographer", desc: "Draw all 10 constellations" },
  { id: "sky-namer",    name: "Sharp Eyes",        desc: "Name 8 constellations in a row" },
  { id: "orbit",        name: "Newton's Cannon",   desc: "Put a cannonball into orbit" },
  { id: "escape",       name: "Escape Velocity",   desc: "Fire fast enough to leave Earth" },
  { id: "horizon",      name: "Edge of Forever",   desc: "Get close to an event horizon" },
  { id: "myth-buster",  name: "Myth Buster",       desc: "Sort 10 myths and facts correctly" },
  { id: "quiz-cadet",   name: "Cadet Certified",   desc: "Score 8+ in the Cadet quiz" },
  { id: "quiz-explorer",name: "Explorer Certified",desc: "Score 8+ in the Explorer quiz" },
  { id: "quiz-astro",   name: "Astro Certified",   desc: "Score 8+ in the Astrophysicist quiz" },
  { id: "thinker",      name: "Think Like Newton", desc: "Solve 6 Newton puzzles" },
  { id: "heroes",       name: "Giants' Shoulders", desc: "Meet 8 scientists" }
];

/* ---------- Big Bang timeline ---------- */
DATA.epochs = [
  { t: "t = 0", title: "The Big Bang",
    body: "Not an explosion in space. Space itself began expanding everywhere at once. What happened at the exact moment t = 0 is still unknown, because our current physics breaks down there.",
    temp: "?", hue: 0 },
  { t: "10⁻⁴³ s", title: "Planck era",
    body: "The universe is so hot and dense that gravity and quantum physics must both matter. We do not yet have a tested theory for this era. Solving it is one of the biggest open problems in physics.",
    temp: "~10³² K", hue: 10 },
  { t: "10⁻³⁶ to 10⁻³² s", title: "Cosmic inflation",
    body: "A leading theory says space stretched by a factor of at least 10²⁶ in a tiny fraction of a second. It explains why the universe looks so smooth. Strong evidence supports it, but it is not yet proven.",
    temp: "~10²⁸ K", hue: 20 },
  { t: "~1 microsecond", title: "Protons and neutrons form",
    body: "The universe cools enough for quarks to bind into protons and neutrons, the building blocks of every atomic nucleus.",
    temp: "~10¹² K", hue: 30 },
  { t: "3 to 20 minutes", title: "The first nuclei",
    body: "Protons and neutrons fuse into helium and a little lithium. The result, about 75% hydrogen and 25% helium by mass, is exactly what astronomers measure in the oldest gas today.",
    temp: "~10⁹ K", hue: 40 },
  { t: "380,000 years", title: "Light breaks free",
    body: "Electrons join nuclei to form atoms and light can finally travel freely. That light still fills the sky today as the Cosmic Microwave Background, now cooled to 2.725 K.",
    temp: "~3,000 K", hue: 200 },
  { t: "~100 to 200 million years", title: "The first stars",
    body: "After the 'dark ages', gravity pulls hydrogen clouds together and the first stars ignite. These giant first stars have never been seen directly. Finding them is a goal of the James Webb Space Telescope.",
    temp: "~60 K (gas)", hue: 220 },
  { t: "~300 million years", title: "Early galaxies",
    body: "The James Webb Space Telescope has spotted galaxies that already existed less than 300 million years after the Big Bang. They are brighter than many models predicted, which is an exciting puzzle.",
    temp: "", hue: 250 },
  { t: "9.2 billion years", title: "Our Sun is born",
    body: "4.6 billion years ago a gas cloud, enriched with elements from earlier dead stars, collapses to form the Sun and planets. The iron in your blood was made inside stars that died before the Sun existed.",
    temp: "", hue: 45 },
  { t: "~9 to 10 billion years", title: "Expansion speeds up",
    body: "Around 5 billion years ago, a mysterious 'dark energy' starts to dominate and the expansion of the universe begins to accelerate. Discovered in 1998 using exploding stars. Nobel Prize 2011.",
    temp: "", hue: 280 },
  { t: "13.8 billion years", title: "Today",
    body: "You are here. The universe is 13.8 billion years old and the CMB glows at 2.725 K. Ordinary matter (everything you can see and touch) is only about 5% of its contents.",
    temp: "2.725 K", hue: 300 }
];

/* Cosmic calendar. years ago, label */
DATA.calendar = [
  { ago: 13.8e9, label: "Big Bang" },
  { ago: 13.6e9, label: "Oldest stars in the Milky Way" },
  { ago: 4.6e9,  label: "Sun and Earth form" },
  { ago: 3.7e9,  label: "Earliest evidence of life" },
  { ago: 541e6,  label: "Explosion of animal life (Cambrian)" },
  { ago: 230e6,  label: "First dinosaurs" },
  { ago: 66e6,   label: "Asteroid ends the dinosaurs" },
  { ago: 300e3,  label: "Homo sapiens appears" },
  { ago: 5000,   label: "Writing is invented" },
  { ago: 339,    label: "Newton publishes the Principia (1687)" }
];

/* ---------- Constellations ----------
   ra in hours, dec in degrees, mag = apparent magnitude (smaller is brighter) */
DATA.constellations = [
  {
    id: "orion", name: "Orion", meaning: "The Hunter", indian: "Mrigashira and Ardra region",
    best: "December to February, evening", dir: "South (overhead from India)",
    stars: [
      ["Betelgeuse", 5.919, 7.407, 0.5], ["Bellatrix", 5.419, 6.350, 1.6], ["Meissa", 5.585, 9.934, 3.4],
      ["Mintaka", 5.533, -0.299, 2.2], ["Alnilam", 5.604, -1.202, 1.7], ["Alnitak", 5.679, -1.943, 1.8],
      ["Saiph", 5.796, -9.670, 2.1], ["Rigel", 5.242, -8.202, 0.1]
    ],
    lines: [[0,2],[2,1],[0,5],[1,3],[3,4],[4,5],[5,6],[3,7]],
    facts: [
      "Betelgeuse (Ardra in Indian astronomy) is a red supergiant so large that, placed where the Sun is, its surface would reach well past the orbit of Mars.",
      "Betelgeuse will explode as a supernova, but astronomers expect that within roughly the next 100,000 years, not tomorrow.",
      "Its 'Great Dimming' in 2019 to 2020 set off supernova rumours. Hubble later showed it was a huge cloud of dust the star had puffed out.",
      "Below the belt hangs a fuzzy 'sword'. That is the Orion Nebula, a stellar nursery about 1,300 light years away where new stars are forming right now."
    ]
  },
  {
    id: "ursa-major", name: "Big Dipper", meaning: "Part of Ursa Major, the Great Bear", indian: "Saptarishi (the Seven Sages)",
    best: "March to May, evening", dir: "North",
    stars: [
      ["Dubhe", 11.062, 61.751, 1.8], ["Merak", 11.031, 56.382, 2.4], ["Phecda", 11.897, 53.695, 2.4],
      ["Megrez", 12.257, 57.033, 3.3], ["Alioth", 12.900, 55.960, 1.8], ["Mizar", 13.399, 54.925, 2.2],
      ["Alkaid", 13.792, 49.313, 1.9]
    ],
    lines: [[0,1],[1,2],[2,3],[3,0],[3,4],[4,5],[5,6]],
    facts: [
      "In India these seven stars are the Saptarishi. Mizar is Vasishtha and its faint companion Alcor is Arundhati.",
      "Spotting Alcor next to Mizar was an old eyesight test. Try it on a dark night.",
      "Draw a line from Merak through Dubhe and extend it about five times. You land on Polaris, the Pole Star.",
      "The Dipper is an 'asterism', a pattern inside the larger official constellation Ursa Major."
    ]
  },
  {
    id: "ursa-minor", name: "Little Dipper", meaning: "Ursa Minor, the Little Bear", indian: "Dhruva Tara (Polaris)",
    best: "All year from North India, low in the north", dir: "North",
    stars: [
      ["Polaris", 2.530, 89.264, 2.0], ["Yildun", 17.537, 86.586, 4.4], ["Epsilon UMi", 16.766, 82.037, 4.2],
      ["Zeta UMi", 15.734, 77.795, 4.3], ["Eta UMi", 16.292, 75.755, 5.0], ["Pherkad", 15.345, 71.834, 3.0],
      ["Kochab", 14.845, 74.156, 2.1]
    ],
    lines: [[0,1],[1,2],[2,3],[3,4],[4,5],[5,6],[6,3]],
    facts: [
      "Polaris sits less than 1° from the north celestial pole, so it barely moves while every other star circles around it.",
      "Polaris is NOT the brightest star in the sky. It ranks around 48th. Sirius is the brightest.",
      "Its height above your horizon equals your latitude. From Delhi (about 28.6°N) it stands about 28.6° high.",
      "Earth's axis wobbles over about 26,000 years, so the pole star changes. Around 14,000 CE, Vega will be close to the pole."
    ]
  },
  {
    id: "cassiopeia", name: "Cassiopeia", meaning: "The Queen", indian: "",
    best: "October to December, evening", dir: "North",
    stars: [
      ["Caph", 0.153, 59.150, 2.3], ["Schedar", 0.675, 56.537, 2.2], ["Gamma Cas", 0.945, 60.717, 2.4],
      ["Ruchbah", 1.430, 60.235, 2.7], ["Segin", 1.907, 63.670, 3.4]
    ],
    lines: [[0,1],[1,2],[2,3],[3,4]],
    facts: [
      "Its bright W (or M) shape sits on the opposite side of Polaris from the Big Dipper, so one of the two is usually up.",
      "In 1572 a 'new star' blazed in Cassiopeia. Tycho Brahe's careful study proved the heavens could change, shaking a 2,000-year-old belief.",
      "Cassiopeia A, the remains of another exploded star here, is one of the brightest radio sources in the sky."
    ]
  },
  {
    id: "scorpius", name: "Scorpius", meaning: "The Scorpion", indian: "Vrishchika. Antares is Jyeshtha",
    best: "June to August, evening", dir: "South",
    stars: [
      ["Acrab", 16.091, -19.806, 2.6], ["Dschubba", 16.006, -22.622, 2.3], ["Fang", 15.981, -26.114, 2.9],
      ["Alniyat", 16.353, -25.593, 2.9], ["Antares", 16.490, -26.432, 1.0], ["Paikauhale", 16.598, -28.216, 2.8],
      ["Larawag", 16.836, -34.293, 2.3], ["Mu Sco", 16.864, -38.047, 3.0], ["Zeta Sco", 16.910, -42.362, 3.6],
      ["Eta Sco", 17.203, -43.239, 3.3], ["Sargas", 17.622, -42.998, 1.9], ["Iota Sco", 17.793, -40.127, 3.0],
      ["Girtab", 17.708, -39.030, 2.4], ["Shaula", 17.560, -37.104, 1.6]
    ],
    lines: [[0,1],[1,2],[1,3],[3,4],[4,5],[5,6],[6,7],[7,8],[8,9],[9,10],[10,11],[11,12],[12,13]],
    facts: [
      "Antares means 'rival of Mars' because its red colour looks like the red planet.",
      "Antares is a red supergiant roughly 700 times wider than the Sun. It is another future supernova.",
      "Greek myth says the scorpion killed Orion, so the gods placed them on opposite sides of the sky. Orion sets as Scorpius rises.",
      "Scorpius lies toward the centre of our Milky Way, so the sky around it is packed with star clouds."
    ]
  },
  {
    id: "crux", name: "Southern Cross", meaning: "Crux", indian: "Trishanku (in some traditions)",
    best: "April and May, low in the south", dir: "South (from southern India)",
    stars: [
      ["Acrux", 12.443, -63.099, 0.8], ["Mimosa", 12.795, -59.689, 1.3],
      ["Gacrux", 12.519, -57.113, 1.6], ["Imai", 12.252, -58.749, 2.8]
    ],
    lines: [[0,2],[1,3]],
    facts: [
      "Crux is the smallest of the 88 official constellations.",
      "It appears on the flags of Australia, New Zealand, Brazil, Samoa and Papua New Guinea.",
      "From southern India it rises just above the southern horizon on April and May evenings. From Delhi it barely peeks up.",
      "Gacrux, the top star, is a red giant. The others are hot blue-white stars."
    ]
  },
  {
    id: "leo", name: "Leo", meaning: "The Lion", indian: "Simha. Regulus is Magha",
    best: "March to May, evening", dir: "East to overhead",
    stars: [
      ["Regulus", 10.139, 11.967, 1.4], ["Eta Leo", 10.122, 16.763, 3.5], ["Algieba", 10.333, 19.842, 2.0],
      ["Adhafera", 10.278, 23.417, 3.4], ["Rasalas", 9.879, 26.007, 3.9], ["Epsilon Leo", 9.764, 23.774, 3.0],
      ["Zosma", 11.235, 20.524, 2.6], ["Chertan", 11.237, 15.430, 3.3], ["Denebola", 11.818, 14.572, 2.1]
    ],
    lines: [[0,1],[1,2],[2,3],[3,4],[4,5],[2,6],[6,8],[8,7],[7,0]],
    facts: [
      "The lion's head looks like a backwards question mark called 'the Sickle', with Regulus at its base.",
      "Regulus spins so fast (one turn in about 16 hours) that it bulges at its equator.",
      "Every November the Leonid meteor shower appears to radiate from Leo. It is dust left by comet Tempel-Tuttle."
    ]
  },
  {
    id: "cygnus", name: "Cygnus", meaning: "The Swan (Northern Cross)", indian: "",
    best: "July to October, evening", dir: "Overhead to north-east",
    stars: [
      ["Deneb", 20.690, 45.280, 1.3], ["Sadr", 20.370, 40.257, 2.2], ["Albireo", 19.512, 27.960, 3.1],
      ["Gienah", 20.770, 33.970, 2.5], ["Fawaris", 19.750, 45.131, 2.9]
    ],
    lines: [[0,1],[1,2],[4,1],[1,3]],
    facts: [
      "Deneb is one of the most luminous stars visible to the naked eye, tens of thousands of times brighter than the Sun. Its distance is uncertain, somewhere around 1,500 to 2,600 light years.",
      "Deneb, Vega and Altair form the 'Summer Triangle', easy to spot on monsoon-free nights.",
      "Cygnus X-1, in this constellation, was the first object widely accepted as a black hole. Stephen Hawking once bet it was NOT a black hole, and happily lost.",
      "Through a small telescope, Albireo splits into a gold star and a blue star. One of the prettiest sights in the sky."
    ]
  },
  {
    id: "lyra", name: "Lyra", meaning: "The Lyre (harp)", indian: "Vega is Abhijit",
    best: "June to September, evening", dir: "Overhead",
    stars: [
      ["Vega", 18.616, 38.784, 0.0], ["Epsilon Lyr", 18.739, 39.670, 4.7], ["Zeta Lyr", 18.746, 37.605, 4.4],
      ["Delta Lyr", 18.908, 36.899, 4.3], ["Sulafat", 18.982, 32.690, 3.3], ["Sheliak", 18.835, 33.363, 3.5]
    ],
    lines: [[0,1],[1,2],[2,0],[2,5],[5,4],[4,3],[3,2]],
    facts: [
      "Vega is only about 25 light years away and was the first star (after the Sun) ever photographed, in 1850.",
      "Vega was the pole star around 12,000 BCE and will be again around 14,000 CE.",
      "Epsilon Lyrae is the 'Double Double'. Two stars, each of which is itself a pair.",
      "In the film 'Contact', the alien signal comes from Vega."
    ]
  },
  {
    id: "taurus", name: "Taurus", meaning: "The Bull", indian: "Vrishabha. Aldebaran is Rohini, the Pleiades are Krittika",
    best: "November to February, evening", dir: "East to overhead",
    stars: [
      ["Aldebaran", 4.599, 16.509, 0.9], ["Elnath", 5.438, 28.608, 1.7], ["Zeta Tau", 5.627, 21.143, 3.0],
      ["Theta Tau", 4.478, 15.871, 3.4], ["Gamma Tau", 4.330, 15.628, 3.7], ["Delta Tau", 4.382, 17.543, 3.8],
      ["Epsilon Tau", 4.477, 19.180, 3.5], ["Pleiades", 3.791, 24.105, 2.9]
    ],
    lines: [[4,5],[5,6],[6,1],[4,3],[3,0],[0,2]],
    facts: [
      "The Pleiades (Krittika) is a cluster of young stars about 440 light years away. Most people see six or seven. Binoculars show dozens.",
      "Aldebaran (Rohini) looks like part of the V-shaped Hyades cluster, but it is actually much closer to us. A trick of perspective.",
      "The Crab Nebula near the bull's horn is the wreck of a star that exploded in 1054 CE. Chinese astronomers recorded it being visible in daylight for weeks.",
      "At the heart of the Crab spins a pulsar, a neutron star turning about 30 times a second."
    ]
  }
];

/* ---------- Life of a star ---------- */
DATA.stages = {
  nebula:   { name: "Stellar nursery",  body: "Every star begins in a cold cloud of gas and dust. A nudge, maybe a shock wave from a nearby supernova, makes a clump collapse under its own gravity." },
  proto:    { name: "Protostar",        body: "The collapsing clump heats up and starts to glow. It is not a true star yet, because nuclear fusion has not started." },
  main:     { name: "Main sequence",    body: "The core reaches about 10 million K and hydrogen fuses into helium. The outward push of this energy balances gravity. Stars spend about 90% of their lives here." },
  redgiant: { name: "Red giant",        body: "Core hydrogen runs out. The core shrinks and heats while the outer layers swell up and cool, glowing red. The Sun will grow to swallow Mercury and Venus, and maybe Earth." },
  pn:       { name: "Planetary nebula", body: "The dying star gently puffs its outer layers into space as a glowing shell. Nothing to do with planets. Early telescopes just made them look round like planets." },
  wd:       { name: "White dwarf",      body: "The leftover core: about the size of Earth but with roughly half the Sun's mass. A teaspoon would weigh several tonnes. It has no fuel left and slowly cools for trillions of years." },
  rsg:      { name: "Red supergiant",   body: "Heavy stars fuse heavier and heavier elements in layers like an onion: helium, carbon, oxygen, silicon, and finally iron." },
  sn:       { name: "Supernova",        body: "Fusing iron takes energy instead of releasing it. The core collapses in under a second and the star explodes, briefly outshining its whole galaxy and scattering new elements into space." },
  ns:       { name: "Neutron star",     body: "A city-sized ball (about 20 km across) of neutrons. A teaspoon would weigh roughly a billion tonnes on Earth. Some spin hundreds of times a second and beam radiation like lighthouses. We call those pulsars." },
  bh:       { name: "Black hole",       body: "If the collapsing core is heavy enough, nothing can stop it. Gravity wins completely and even light cannot escape from inside the event horizon." },
  rd:       { name: "Red dwarf, still burning", body: "Small red dwarfs burn so slowly they can live for trillions of years. The universe is only 13.8 billion years old, so not a single red dwarf has ever died." }
};

/* ---------- Myth or fact ---------- */
DATA.myths = [
  { s: "The Great Wall of China is visible from space with the naked eye.", fact: false,
    e: "It is very long but only a few metres wide, about the same colour as the land around it. China's first astronaut Yang Liwei said he could not see it. Cities at night and big highways are far easier to spot." },
  { s: "Summer happens because Earth gets closer to the Sun.", fact: false,
    e: "Earth is actually closest to the Sun in early January, during northern winter. Seasons come from Earth's 23.4° tilt, which changes how directly sunlight hits each hemisphere." },
  { s: "There is no gravity on the International Space Station.", fact: false,
    e: "At the ISS's height gravity is still about 90% as strong as on the ground. Astronauts float because the station and everyone in it are falling around Earth together, forever missing it." },
  { s: "Most stars you see at night are already dead.", fact: false,
    e: "Popular but wrong. Almost every naked-eye star is within a few thousand light years, and stars live for millions to billions of years. The light is old, but the stars are almost certainly still there." },
  { s: "A black hole sucks in everything around it like a cosmic vacuum cleaner.", fact: false,
    e: "From far away a black hole pulls like any object with the same mass. If the Sun were replaced by a black hole of equal mass, Earth would keep orbiting exactly as it does now. It would just get very cold." },
  { s: "A day on Venus is longer than its year.", fact: true,
    e: "Venus takes about 243 Earth days to spin once but only about 225 Earth days to go around the Sun. It also spins backwards compared to most planets." },
  { s: "Mercury is the hottest planet because it is closest to the Sun.", fact: false,
    e: "Venus is hotter, around 465°C everywhere, day and night. Its thick carbon dioxide atmosphere traps heat in a runaway greenhouse effect." },
  { s: "The far side of the Moon is always dark.", fact: false,
    e: "The far side gets just as much sunlight as the near side. We never see it from Earth because the Moon is tidally locked: it spins once for every orbit. 'Far side' is better than 'dark side'." },
  { s: "In a vacuum, a hammer and a feather fall at the same speed.", fact: true,
    e: "Astronaut David Scott tested this on the Moon during Apollo 15 in 1971. Both hit the ground together, just as Galileo predicted. On Earth only air resistance makes the feather slower." },
  { s: "Stars twinkle because they pulse and flicker.", fact: false,
    e: "Twinkling is caused by our turbulent atmosphere bending starlight back and forth. Seen from space, stars shine steadily. Planets twinkle less because they look like tiny discs, not points." },
  { s: "A teaspoon of neutron star would weigh about a billion tonnes on Earth.", fact: true,
    e: "A neutron star packs more mass than the Sun into a ball about 20 km wide, so its matter is unimaginably dense." },
  { s: "The Big Bang was an explosion that happened at one point in space.", fact: false,
    e: "The Big Bang happened everywhere. It was the start of space itself expanding, not stuff flying out from a centre into empty space. There is no centre of the universe." },
  { s: "Polaris is the brightest star in the night sky.", fact: false,
    e: "Polaris is famous for staying still, not for being bright. It is around the 48th brightest. Sirius is the brightest star at night." },
  { s: "You can see another galaxy with just your eyes.", fact: true,
    e: "From a dark site the Andromeda Galaxy is a faint smudge, 2.5 million light years away. The light hitting your eye left it before humans existed." },
  { s: "Space is completely silent.", fact: true,
    e: "Sound needs something to travel through, like air or water. Space is almost empty, so explosions in space films should be silent. Gas clouds can carry pressure waves, but nothing your ears could hear." },
  { s: "Your zodiac sign matches the constellation the Sun was really in on your birthday.", fact: false,
    e: "Earth's slow wobble (precession) has shifted the sky by almost one full sign over about 2,000 years. The Sun also passes through a 13th constellation, Ophiuchus. Astronomy and astrology split long ago." }
];

/* ---------- Newton's puzzles ---------- */
DATA.puzzles = [
  { q: "A horse pulls a cart. By Newton's third law, the cart pulls back on the horse with an equal force. So how does anything move?",
    law: "Third law",
    a: "The two forces act on different objects, so they never cancel. The horse moves forward because the ground pushes it forward (friction on its hooves) harder than the cart pulls back. Always ask: forces on WHICH object?" },
  { q: "When a bus brakes suddenly, why do you lurch forward? Nothing pushed you.",
    law: "First law",
    a: "Nothing did push you. Your body was moving and simply kept moving (inertia) while the bus slowed underneath you. The seatbelt is what finally applies a force to stop you." },
  { q: "A rocket in empty space has nothing to push against. How does it accelerate?",
    law: "Third law and momentum",
    a: "It pushes against its own exhaust. The engine shoves hot gas backward, and the gas shoves the rocket forward with equal force. Rockets actually work slightly better in a vacuum, because there is no air pressure in the way." },
  { q: "Earth pulls an apple down. The apple pulls Earth up with exactly the same force. Why does only the apple visibly move?",
    law: "Second law, a = F/m",
    a: "Same force, very different mass. Earth has about 6 × 10²⁴ kg, so its acceleration is far too small to notice. Both do move toward each other." },
  { q: "The Moon is falling toward Earth right now. Why doesn't it hit us?",
    law: "Gravitation",
    a: "It is moving sideways so fast that it keeps missing. Newton checked this: the Moon is 60 Earth-radii away, so gravity there should be 1/3600 of g. That predicts the Moon curves about 1.4 mm off a straight line every second, which matches its real orbit. That is how he knew one law rules both apples and moons." },
  { q: "Astronauts on the ISS float. Is gravity switched off up there?",
    law: "Free fall",
    a: "No. Gravity at 400 km is about 90% as strong as on the ground. The station and the astronauts fall together, so nothing presses them against the floor. That feeling is called weightlessness, but the weight is still there." },
  { q: "You are floating outside your spaceship with only a wrench and no rope. How do you get back?",
    law: "Conservation of momentum",
    a: "Throw the wrench hard, directly away from the ship. The wrench gets momentum one way, you get equal momentum the other way, and you drift back toward safety." },
  { q: "Do you weigh more at the North Pole or at the equator?",
    law: "Gravity and rotation",
    a: "At the poles, by about 0.5%. Earth bulges at the equator, so you are farther from the centre there, and Earth's spin also uses a little gravity to keep you moving in a circle. g is about 9.83 m/s² at the poles and 9.78 m/s² at the equator." },
  { q: "If a satellite has no engine running, why doesn't it slow down and fall?",
    law: "First law",
    a: "In near-vacuum there is almost nothing to slow it, so it keeps its speed, and gravity bends its path into a circle. Two sides to this: low orbits still brush the thin upper atmosphere, so the ISS does need a small boost every few weeks or months." },
  { q: "Imagine a tunnel straight through Earth. You jump in. What happens?",
    law: "Simple harmonic motion",
    a: "You speed up to the centre, where gravity becomes zero, then slow down and pop out at the other side, then fall back. Ignoring air, for a uniform Earth the one-way trip takes about 42 minutes. Using Earth's real (denser) core gives about 38 minutes." },
  { q: "If you double the distance between two stars, what happens to the gravitational force between them?",
    law: "Inverse square law",
    a: "It becomes one quarter. F = Gm₁m₂/r², so doubling r divides the force by 2² = 4. Triple it and the force drops to one ninth." },
  { q: "Why do GPS satellites need Einstein, not just Newton?",
    law: "Relativity",
    a: "Their clocks run fast by about 38 microseconds a day compared to ground clocks: weaker gravity speeds them up by about 45, their speed slows them by about 7. Without correcting for this, GPS positions would drift by kilometres every day." }
];

/* ---------- Quiz ---------- */
DATA.quiz = {
  1: [
    { q: "Which star is closest to Earth?", o: ["The Sun", "Proxima Centauri", "Sirius", "Polaris"], a: 0,
      e: "The Sun is a star, about 8.3 light-minutes away. The next closest, Proxima Centauri, is 4.24 light years away." },
    { q: "About how long does sunlight take to reach Earth?", o: ["8 seconds", "8 minutes 20 seconds", "1 hour", "1 day"], a: 1,
      e: "Light travels 150 million km in about 500 seconds. You always see the Sun as it was 8 minutes ago." },
    { q: "What is the brightest star in the night sky?", o: ["Polaris", "Betelgeuse", "Sirius", "Vega"], a: 2,
      e: "Sirius, the Dog Star, shines at magnitude −1.46. Polaris is much fainter." },
    { q: "A light year measures...", o: ["time", "distance", "brightness", "speed"], a: 1,
      e: "It is the distance light travels in one year, about 9.46 trillion km." },
    { q: "Which planet has the hottest surface?", o: ["Mercury", "Venus", "Mars", "Jupiter"], a: 1,
      e: "Venus, around 465°C, thanks to a runaway greenhouse effect. Mercury has no thick atmosphere to trap heat." },
    { q: "What powers the Sun?", o: ["Burning coal-like fuel", "Nuclear fission of uranium", "Nuclear fusion of hydrogen into helium", "Electricity"], a: 2,
      e: "In the core, about 600 million tonnes of hydrogen fuse into helium every second, turning a little mass into energy via E = mc²." },
    { q: "Gravity on the Moon is about what fraction of Earth's?", o: ["1/2", "1/6", "1/10", "Zero"], a: 1,
      e: "About 1.62 m/s², roughly one sixth. You could jump about six times higher." },
    { q: "Why does Polaris seem to stay still all night?", o: ["It is the closest star", "It lies almost exactly above Earth's North Pole axis", "It orbits with Earth", "It is actually a planet"], a: 1,
      e: "It sits less than 1° from the point Earth's axis points to, so it barely moves while other stars circle around it." },
    { q: "Which mission made India the first country to land near the Moon's south pole?", o: ["Chandrayaan-1", "Mangalyaan", "Chandrayaan-3", "Aditya-L1"], a: 2,
      e: "Chandrayaan-3's lander Vikram touched down on 23 August 2023. India now marks 23 August as National Space Day." },
    { q: "What is a 'shooting star'?", o: ["A star falling to Earth", "A small space rock burning up in our atmosphere", "A comet exploding", "A satellite"], a: 1,
      e: "Meteors are usually grains of dust or pebbles hitting the air at tens of km per second and heating up until they glow." },
    { q: "Betelgeuse and Rigel belong to which constellation?", o: ["Scorpius", "Orion", "Leo", "Taurus"], a: 1,
      e: "Red Betelgeuse is Orion's shoulder and blue-white Rigel is his foot." },
    { q: "What kind of star is our Sun?", o: ["Red giant", "White dwarf", "Yellow dwarf (G-type main sequence)", "Neutron star"], a: 2,
      e: "The Sun is a G2V star, a middle-aged star about halfway through its roughly 10-billion-year main sequence life." },
    { q: "India's Mars Orbiter Mission (Mangalyaan) was special because...", o: ["It landed a rover", "India reached Mars orbit on its first attempt", "It brought back Mars rock", "It carried astronauts"], a: 1,
      e: "It entered Mars orbit on 24 September 2014, making ISRO the first space agency to succeed on its first try." }
  ],
  2: [
    { q: "How old is the universe?", o: ["4.6 billion years", "13.8 billion years", "100 billion years", "It has always existed"], a: 1,
      e: "Measurements of the Cosmic Microwave Background give 13.8 billion years. 4.6 billion is the age of the Sun." },
    { q: "The Cosmic Microwave Background is light from about when?", o: ["The first second", "380,000 years after the Big Bang", "The first stars", "The Sun's birth"], a: 1,
      e: "When atoms first formed, light could travel freely. It has been stretched into microwaves by cosmic expansion." },
    { q: "How will our Sun most likely end?", o: ["As a black hole", "In a supernova", "As a white dwarf", "It will never end"], a: 2,
      e: "The Sun is not massive enough to explode. It will become a red giant, shed a planetary nebula, and leave a white dwarf." },
    { q: "The maximum mass of a white dwarf, about 1.4 Suns, is named after which Indian-born scientist?", o: ["C. V. Raman", "Meghnad Saha", "Subrahmanyan Chandrasekhar", "Homi Bhabha"], a: 2,
      e: "Chandrasekhar worked it out at age 19, on a ship to England in 1930. He won the Nobel Prize in Physics in 1983." },
    { q: "Why does iron in a massive star's core trigger its death?", o: ["Iron is magnetic", "Fusing iron absorbs energy instead of releasing it", "Iron is radioactive", "Iron evaporates"], a: 1,
      e: "Iron has the most tightly bound nucleus. Fusing it takes energy, so the core loses its support and collapses." },
    { q: "Much of the gold on Earth was likely made in...", o: ["The Big Bang", "The Sun", "Collisions of neutron stars", "Earth's core"], a: 2,
      e: "In 2017, gravitational waves and light from a neutron star collision (GW170817) revealed heavy elements being forged. Supernovae likely contribute too." },
    { q: "What is a pulsar?", o: ["A pulsing planet", "A rapidly spinning neutron star", "A dying galaxy", "A comet"], a: 1,
      e: "Discovered in 1967 by PhD student Jocelyn Bell Burnell. Its beams sweep past Earth like a lighthouse." },
    { q: "Why do we always see the same side of the Moon?", o: ["The Moon does not spin", "It spins once per orbit (tidal locking)", "Earth blocks the other side", "The far side is always dark"], a: 1,
      e: "Earth's tides slowed the Moon's spin until it matched its 27.3-day orbit." },
    { q: "Earth's seasons are caused by...", o: ["Distance from the Sun", "The 23.4° tilt of Earth's axis", "Solar flares", "The Moon"], a: 1,
      e: "Tilt changes how directly sunlight falls on each hemisphere. Earth is actually closest to the Sun in January." },
    { q: "The nearest large galaxy to the Milky Way is...", o: ["Andromeda", "The Large Magellanic Cloud", "Sombrero", "Whirlpool"], a: 0,
      e: "Andromeda is about 2.5 million light years away. It will merge with the Milky Way in roughly 4 to 5 billion years. Recent studies suggest the merger is less certain than once thought." },
    { q: "Hubble's law says that more distant galaxies...", o: ["are older", "move away from us faster", "are bigger", "are fainter only"], a: 1,
      e: "Recession speed grows with distance, the first key evidence that the universe is expanding." },
    { q: "What are stars mostly made of?", o: ["Iron and nickel", "Hydrogen and helium", "Oxygen and carbon", "Plasma of gold"], a: 1,
      e: "Cecilia Payne showed this in her 1925 PhD thesis, using Meghnad Saha's ionisation equation. Experts first refused to believe her." },
    { q: "Kepler's third law says a planet's orbital period T and orbit size a follow...", o: ["T ∝ a", "T² ∝ a³", "T³ ∝ a²", "T ∝ 1/a"], a: 1,
      e: "Newton later showed this follows directly from his inverse-square law of gravity." }
  ],
  3: [
    { q: "If the Sun were squeezed into a black hole, its event horizon radius would be about...", o: ["3 mm", "3 km", "3,000 km", "Same as now"], a: 1,
      e: "Schwarzschild radius r = 2GM/c² ≈ 2.95 km for one solar mass. Earth would need to shrink to about 9 mm." },
    { q: "Escape velocity from Earth's surface is about...", o: ["7.9 km/s", "11.2 km/s", "30 km/s", "300,000 km/s"], a: 1,
      e: "v = √(2GM/R) ≈ 11.2 km/s, ignoring air. It does not depend on the mass of the thing you launch." },
    { q: "At the same height, escape velocity is how many times orbital velocity?", o: ["2", "√2", "1/2", "π"], a: 1,
      e: "v_orbit = √(GM/r) and v_escape = √(2GM/r), so the ratio is √2 ≈ 1.414. Near Earth: 7.9 km/s × 1.414 ≈ 11.2 km/s." },
    { q: "Due to relativity, GPS satellite clocks run fast by about how much per day?", o: ["38 nanoseconds", "38 microseconds", "38 seconds", "They don't"], a: 1,
      e: "About +45 μs from weaker gravity minus 7 μs from their speed. Uncorrected, GPS would drift by around 10 km a day." },
    { q: "What is the event horizon?", o: ["The black hole's surface of rock", "The boundary beyond which nothing, not even light, can escape", "The edge of the observable universe", "Where the accretion disk ends"], a: 1,
      e: "It is not a solid surface. Crossing a huge black hole's horizon, you might not notice anything at that moment." },
    { q: "If the distance between two masses is tripled, the gravitational force becomes...", o: ["1/3", "1/6", "1/9", "3 times"], a: 2,
      e: "Inverse square law: F ∝ 1/r², so (1/3)² = 1/9." },
    { q: "Assuming uniform density, what is g at the exact centre of Earth?", o: ["9.8 m/s²", "Infinite", "Zero", "19.6 m/s²"], a: 2,
      e: "Mass surrounds you equally in every direction, so the pulls cancel." },
    { q: "Hawking radiation suggests that black holes...", o: ["grow forever", "slowly lose mass and could evaporate", "are made of light", "are wormholes"], a: 1,
      e: "Quantum effects near the horizon make black holes glow very faintly. For stellar black holes this is far too weak to detect so far. It is a strong prediction, still unconfirmed by observation." },
    { q: "The first image of a black hole's shadow (M87*) was released in...", o: ["1995", "2012", "2019", "2024"], a: 2,
      e: "The Event Horizon Telescope linked radio dishes across Earth into a planet-sized telescope. Our own galaxy's Sagittarius A* followed in 2022." },
    { q: "Gravitational waves were first directly detected by LIGO from...", o: ["The Big Bang", "Two merging black holes", "A pulsar", "The Sun"], a: 1,
      e: "Detected on 14 September 2015, a century after Einstein predicted them. India is building its own LIGO detector in Maharashtra." },
    { q: "What stops a white dwarf from collapsing further?", o: ["Nuclear fusion", "Electron degeneracy pressure", "Magnetic fields", "Rotation"], a: 1,
      e: "A quantum effect: electrons refuse to be squeezed into the same state. Above about 1.4 solar masses (the Chandrasekhar limit) even this fails." },
    { q: "Roughly what share of the universe is ordinary matter (atoms)?", o: ["About 5%", "About 25%", "About 68%", "100%"], a: 0,
      e: "Planck satellite data: about 5% ordinary matter, 27% dark matter, 68% dark energy. We still do not know what 95% of the universe is." },
    { q: "Near a black hole, time runs slower for you than for a faraway friend. This is called...", o: ["Redshift", "Gravitational time dilation", "Spaghettification", "Parallax"], a: 1,
      e: "Stronger gravity means slower clocks. The film Interstellar's water planet, where 1 hour equals 7 years, needed an extremely fast-spinning black hole." }
  ]
};

/* ---------- Scientists ---------- */
DATA.heroes = [
  { n: "Subrahmanyan Chandrasekhar", y: "1910 to 1995", tag: "Why stars die the way they do",
    b: "At 19, on a ship from Madras to England, he calculated that a white dwarf cannot be heavier than about 1.4 Suns. Heavier cores must collapse into something stranger. A famous astronomer publicly mocked the idea. Chandra turned out to be right and won the 1983 Nobel Prize. NASA's Chandra X-ray Observatory is named after him." },
  { n: "Cecilia Payne-Gaposchkin", y: "1900 to 1979", tag: "What stars are made of",
    b: "Her 1925 PhD thesis showed stars are made mostly of hydrogen and helium. Leading astronomers told her it was 'clearly impossible' and she had to water it down. Within a few years they admitted she was right. She later became the first woman to head a department at Harvard." },
  { n: "Meghnad Saha", y: "1893 to 1956", tag: "Reading the light of stars",
    b: "His ionisation equation (1920) explained why stars show different spectral lines: it depends on temperature. It gave astronomers a thermometer for stars, and Cecilia Payne used it for her great discovery. He also founded the Saha Institute of Nuclear Physics in Kolkata." },
  { n: "Jocelyn Bell Burnell", y: "born 1943", tag: "Discovered pulsars",
    b: "As a PhD student in 1967 she noticed a tiny repeating 'bit of scruff' on 100 metres of chart paper. It was the first pulsar. Her supervisor shared the Nobel Prize, she did not. In 2018 she gave her entire £2.3 million Breakthrough Prize to fund physics students from under-represented groups." },
  { n: "Henrietta Swan Leavitt", y: "1868 to 1921", tag: "A ruler for the universe",
    b: "Paid a few cents an hour to study photographic plates, she found that certain pulsing stars (Cepheids) blink at a rate tied to their true brightness. That let astronomers measure distances to other galaxies. Hubble used her law to show the universe is expanding." },
  { n: "Vera Rubin", y: "1928 to 2016", tag: "Evidence for dark matter",
    b: "She measured how fast stars orbit in galaxies and found the outer stars move far too fast for the visible mass. Something invisible was there. Today the Vera C. Rubin Observatory in Chile is named after her." },
  { n: "Kalpana Chawla", y: "1962 to 2003", tag: "First Indian-born woman in space",
    b: "From Karnal, Haryana, she studied aeronautical engineering in Chandigarh, went to the USA, and flew on Space Shuttle Columbia in 1997. She died with her crew when Columbia broke apart on re-entry in 2003. Her path from a small town to orbit still inspires millions." },
  { n: "Ritu Karidhal", y: "ISRO scientist", tag: "India's 'Rocket Woman'",
    b: "Deputy Operations Director for Mangalyaan, India's first Mars mission, and Mission Director for Chandrayaan-2. She grew up in Lucknow fascinated by the Moon and joined ISRO in 1997." },
  { n: "Andrea Ghez", y: "born 1965", tag: "Proved our galaxy has a monster black hole",
    b: "She tracked stars whipping around the centre of the Milky Way for over 20 years. Their orbits proved an object of 4 million Suns sits in a tiny space: a supermassive black hole. She shared the 2020 Nobel Prize, only the fourth woman ever to win it in physics." },
  { n: "Isaac Newton", y: "1643 to 1727", tag: "One law for apples and planets",
    b: "In the Principia (1687) he showed that the same gravity that drops an apple keeps the Moon in orbit. He also invented calculus (at the same time as Leibniz), and split white light into colours with a prism." },
  { n: "Albert Einstein", y: "1879 to 1955", tag: "Gravity is curved spacetime",
    b: "His general relativity (1915) says mass bends space and time, and objects follow those curves. It predicted black holes, gravitational waves and the bending of light, all later confirmed." },
  { n: "Aryabhata", y: "476 to 550 CE", tag: "Earth spins",
    b: "In the Aryabhatiya (499 CE) he proposed that the stars appear to move because Earth rotates, and gave a close value of π (3.1416). India's first satellite, launched in 1975, was named after him." },
  { n: "Stephen Hawking", y: "1942 to 2018", tag: "Black holes glow",
    b: "Diagnosed with motor neurone disease at 21 and given two years to live, he worked for 55 more. He showed black holes should slowly radiate energy (Hawking radiation) and wrote 'A Brief History of Time' for everyone." }
];

/* ---------- Cosmic scale ---------- */
DATA.distances = [
  { name: "The Moon",               km: 384400,        note: "Average distance. Light takes 1.3 seconds." },
  { name: "The Sun",                km: 1.496e8,       note: "1 astronomical unit (AU)." },
  { name: "Neptune",                km: 4.5e9,         note: "The farthest planet, about 30 AU." },
  { name: "Voyager 1 (today)",      km: 2.5e10,        note: "The farthest human-made object, still sending data. Launched 1977." },
  { name: "Proxima Centauri",       km: 4.24 * 9.461e12, note: "The nearest star after the Sun: 4.24 light years." },
  { name: "Betelgeuse",             km: 550 * 9.461e12,  note: "Roughly 550 light years. The exact distance is still debated." },
  { name: "Centre of the Milky Way",km: 26000 * 9.461e12,note: "About 26,000 light years, where Sagittarius A* lives." },
  { name: "Andromeda Galaxy",       km: 2.5e6 * 9.461e12,note: "2.5 million light years. The farthest thing your naked eye can see." },
  { name: "Edge of the observable universe", km: 46.5e9 * 9.461e12, note: "About 46.5 billion light years today, because space kept expanding while the light travelled. You could never actually get there." }
];

DATA.speeds = [
  { id: "car",    name: "Car on a highway",   kms: 100 / 3600 },
  { id: "bullet", name: "Rifle bullet",       kms: 1 },
  { id: "voy",    name: "Voyager 1",          kms: 17 },
  { id: "psp",    name: "Parker Solar Probe (fastest ever)", kms: 191.7 },
  { id: "light",  name: "Light",              kms: 299792.458 }
];

DATA.planets = [
  { n: "Mercury", g: 3.70 }, { n: "Venus", g: 8.87 }, { n: "Earth", g: 9.81 }, { n: "Moon", g: 1.62 },
  { n: "Mars", g: 3.71 }, { n: "Jupiter", g: 24.79 }, { n: "Saturn", g: 10.44 }, { n: "Uranus", g: 8.69 },
  { n: "Neptune", g: 11.15 }, { n: "Pluto", g: 0.62 }, { n: "Sun's surface", g: 274 }
];
