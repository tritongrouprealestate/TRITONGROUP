/* Extra content: kid-friendly explanations, more myths, more scientists, India in space */

/* one-line "imagine this" for each Big Bang epoch (same order as DATA.epochs) */
[
  "Imagine every bit of the universe squeezed tighter than anything you can picture, and then space itself starting to stretch like a balloon.",
  "So hot and tiny that even our best rules of physics give up. Scientists call this the edge of what we know.",
  "Imagine a speck smaller than an atom growing bigger than a football in far less than a blink. That is inflation.",
  "Like cooking: once the soup cools a little, tiny bits (quarks) clump into bigger bits (protons and neutrons).",
  "In just 20 minutes the universe made almost all the hydrogen and helium it will ever have. The rest waited for stars.",
  "Before this, light kept bumping into loose electrons, like trying to see through fog. Then the fog cleared.",
  "Hundreds of millions of years of darkness end when the first giant stars switch on, like streetlights at dusk.",
  "Stars gather into cities of stars: galaxies. JWST sees some that formed surprisingly early.",
  "Gold in jewellery, calcium in bones, oxygen you breathe: all made in older stars that died before the Sun was born.",
  "Something nobody understands yet, called dark energy, starts pushing galaxies apart faster and faster.",
  "Kutush, you are made of 13.8-billion-year-old hydrogen and star-cooked atoms. You are literally stardust that can think."
].forEach((k, i) => { if (DATA.epochs[i]) DATA.epochs[i].kid = k; });

/* kid lines for star stages */
Object.assign(DATA.stages.nebula, { kid: "A cloud so big that light takes years to cross it, slowly clumping like flour lumps in water." });
Object.assign(DATA.stages.proto, { kid: "Like a baby star in its egg: warm, glowing, but not yet 'switched on'." });
Object.assign(DATA.stages.main, { kid: "Gravity squeezes in, fusion pushes out. As long as they balance, the star shines steadily." });
Object.assign(DATA.stages.redgiant, { kid: "Like popcorn: the inside tightens up while the outside puffs out huge." });
Object.assign(DATA.stages.pn, { kid: "A star blowing a glowing smoke ring as its goodbye." });
Object.assign(DATA.stages.wd, { kid: "The glowing ember left after a campfire, slowly cooling for longer than the universe has existed." });
Object.assign(DATA.stages.rsg, { kid: "A giant onion: every layer is a different fusion factory." });
Object.assign(DATA.stages.sn, { kid: "The heart of the star collapses faster than you can blink, then bounces back in one of the brightest explosions in the universe." });
Object.assign(DATA.stages.ns, { kid: "Squeeze a mountain into a sugar cube and you get close to how dense this is." });
Object.assign(DATA.stages.bh, { kid: "A place where gravity is so strong that the escape speed is faster than light." });
Object.assign(DATA.stages.rd, { kid: "The tortoise of stars: slow, dim, and it will outlive everyone." });

DATA.myths.push(
  { s: "The Sun is a giant ball of fire, burning like a campfire.", fact: false,
    e: "Fire needs oxygen and would burn out in a few thousand years. The Sun shines by nuclear fusion, squeezing hydrogen into helium, and has done so for 4.6 billion years." },
  { s: "There is no gravity on the Moon.", fact: false,
    e: "The Moon has about one sixth of Earth's gravity. Astronauts bounced around, but they never floated away." },
  { s: "An astronaut without a spacesuit would explode instantly.", fact: false,
    e: "They would not explode. They would lose consciousness in about 15 seconds as oxygen leaves the blood, and the body would swell. Still deadly within minutes, but no explosion." },
  { s: "Meteorites are red hot when they land.", fact: false,
    e: "Only a thin outer skin melts during the fall, and it cools quickly. The inside was frozen in space for billions of years. Most feel only warm or even cold." },
  { s: "Mars has two moons.", fact: true,
    e: "Phobos and Deimos, both small and potato-shaped. Phobos is slowly spiralling inwards and will break apart in tens of millions of years." },
  { s: "When it is summer in India, it is winter in Australia.", fact: true,
    e: "Earth's tilt points one hemisphere towards the Sun while the other points away." },
  { s: "The Pole Star is directly overhead for everyone in the Northern Hemisphere.", fact: false,
    e: "Its height above the horizon equals your latitude. It is overhead only at the North Pole. From Chennai (13°N) it sits just 13° up." },
  { s: "Lightning never strikes the same place twice.", fact: false,
    e: "Tall buildings get hit again and again. New York's Empire State Building is struck around 20 times a year." },
  { s: "The Moon makes its own light.", fact: false,
    e: "Moonlight is reflected sunlight. The Moon's surface is actually about as dark as worn asphalt." },
  { s: "Black holes are proven tunnels to other universes.", fact: false,
    e: "Some equations allow wormholes, but there is zero evidence that real black holes lead anywhere. Science keeps an open mind but needs proof." },
  { s: "Sound travels faster in water than in air.", fact: true,
    e: "About 1,480 m/s in water versus 343 m/s in air. Whales can hear each other hundreds of kilometres away." },
  { s: "You could stand on the surface of Jupiter.", fact: false,
    e: "Jupiter is a gas giant with no solid surface. Its atmosphere just gets thicker and hotter until it becomes an ocean of liquid metallic hydrogen." },
  { s: "Time passes at exactly the same speed everywhere.", fact: false,
    e: "Einstein showed time runs slower in stronger gravity and at higher speeds. GPS satellites must correct their clocks by about 38 microseconds every day." },
  { s: "Comets are mostly ice and dust.", fact: true,
    e: "Often called 'dirty snowballs' (or 'icy dirtballs'). Near the Sun the ice turns to gas and forms the glowing tail." },
  { s: "Astronauts grow slightly taller in space.", fact: true,
    e: "Without gravity squeezing the spine, they can grow up to about 3% taller. They shrink back after returning to Earth." },
  { s: "The Earth is perfectly round.", fact: false,
    e: "It bulges at the equator because it spins. The equator's diameter is about 43 km more than the pole-to-pole diameter." }
);

DATA.heroes.push(
  { n: "Galileo Galilei", y: "1564 to 1642", tag: "Pointed a telescope at the sky",
    b: "In 1610 he saw mountains on the Moon, four moons orbiting Jupiter and the phases of Venus. This was strong evidence that Earth is not the centre of everything. He was put on trial for it in 1633, but the evidence won in the end." },
  { n: "Johannes Kepler", y: "1571 to 1630", tag: "Cracked the shape of orbits",
    b: "Working with Tycho Brahe's careful measurements of Mars, he found that planets move in ellipses and speed up near the Sun. His three laws gave Newton the clues he needed." },
  { n: "Marie Curie", y: "1867 to 1934", tag: "Pioneer of radioactivity",
    b: "The first woman to win a Nobel Prize, and still the only person to win Nobel Prizes in two different sciences (Physics 1903, Chemistry 1911). She discovered polonium and radium." },
  { n: "Edwin Hubble", y: "1889 to 1953", tag: "Found the universe is expanding",
    b: "He proved that fuzzy 'nebulae' like Andromeda are separate galaxies, and that farther galaxies move away faster. The space telescope is named after him." },
  { n: "C. V. Raman", y: "1888 to 1970", tag: "Light that changes colour",
    b: "He discovered that light scattered by molecules shifts slightly in colour, revealing the molecule's vibrations. The first Asian to win a Nobel Prize in science (1930). India celebrates National Science Day on 28 February for his discovery." },
  { n: "Satyendra Nath Bose", y: "1894 to 1974", tag: "Half of all particles carry his name",
    b: "In 1924 he sent Einstein a new way to count particles of light. Einstein translated it into German himself. Particles like photons are now called bosons in his honour." },
  { n: "Vikram Sarabhai", y: "1919 to 1971", tag: "Father of India's space programme",
    b: "He believed space technology should help ordinary people with weather, communication and education. He led the founding of ISRO. Chandrayaan's Vikram lander is named after him." },
  { n: "A. P. J. Abdul Kalam", y: "1931 to 2015", tag: "The Missile Man who inspired millions",
    b: "Project director of SLV-3, India's first home-made satellite launcher, which put the Rohini satellite into orbit in 1980. He later became President of India and spent his life encouraging students to dream big." },
  { n: "Nancy Grace Roman", y: "1925 to 2018", tag: "The 'Mother of Hubble'",
    b: "NASA's first chief of astronomy. She fought for years to get a big telescope into space, which became Hubble. NASA's next great telescope is named the Nancy Grace Roman Space Telescope." },
  { n: "Sunita Williams", y: "born 1965", tag: "Record-breaking spacewalker",
    b: "A NASA astronaut of Indian heritage, she has spent more than 600 days in space over her career and made many spacewalks. Her 2024 test flight turned into a 9-month stay on the ISS when her spacecraft had problems, and she handled it calmly." }
);

/* ---------- India in space ---------- */
DATA.isro = [
  { y: "1963", n: "First rocket from Thumba", d: "sub", kid: "India's first rocket was launched from a fishing village near Thiruvananthapuram. Rocket parts were carried on bicycles and a bullock cart, and a church served as the office.", fact: "A small American-made sounding rocket, launched on 21 November 1963." },
  { y: "1969", n: "ISRO is founded", d: "none", kid: "Vikram Sarabhai sets up the Indian Space Research Organisation on 15 August 1969 with a big idea: use space to help people on the ground.", fact: "Same year that humans first walked on the Moon." },
  { y: "1975", n: "Aryabhata", d: "leo", kid: "India's very first satellite, named after the 5th-century mathematician-astronomer. It rode to orbit on a Soviet rocket.", fact: "Launched 19 April 1975." },
  { y: "1980", n: "SLV-3 and Rohini", d: "leo", kid: "For the first time, an Indian rocket carried an Indian satellite into orbit. The project was led by A. P. J. Abdul Kalam.", fact: "18 July 1980, from Sriharikota." },
  { y: "1984", n: "Rakesh Sharma in space", d: "leo", kid: "The first Indian in space. Asked how India looked from above, he answered 'Saare Jahan Se Achha'.", fact: "Flew on a Soviet Soyuz to the Salyut 7 station in April 1984." },
  { y: "1994", n: "PSLV takes off", d: "leo", kid: "The Polar Satellite Launch Vehicle had its first successful flight. It became ISRO's trusted workhorse, launching Chandrayaan-1, Mangalyaan and Aditya-L1.", fact: "PSLV has launched hundreds of satellites for India and other countries." },
  { y: "2008", n: "Chandrayaan-1", d: "moon", kid: "India's first mission to the Moon. It helped find evidence of water molecules on the Moon's surface.", fact: "Carried a NASA instrument (M3) that mapped the water signal." },
  { y: "2014", n: "Mangalyaan", d: "mars", kid: "India reached Mars orbit on its first try, something no country had managed before. And it cost less than many Hollywood space films!", fact: "Entered Mars orbit on 24 September 2014." },
  { y: "2015", n: "AstroSat", d: "leo", kid: "India's own space observatory, seeing the sky in ultraviolet, visible light and X-rays at the same time.", fact: "Launched 28 September 2015." },
  { y: "2017", n: "104 satellites in one launch", d: "leo", kid: "One PSLV rocket carried 104 satellites into orbit, a world record at that time. Imagine dropping 104 friends at the right bus stops in one trip!", fact: "PSLV-C37, 15 February 2017." },
  { y: "2019", n: "Chandrayaan-2", d: "moon", kid: "The Vikram lander was lost during its landing. But the orbiter kept working and is still mapping the Moon. Failure taught ISRO exactly what to fix.", fact: "Science is full of 'not yet' moments. The next attempt succeeded." },
  { y: "2023", n: "Chandrayaan-3 lands", d: "moon", kid: "Vikram landed softly near the Moon's south pole, and the Pragyan rover rolled out. India became the first country to land in that region.", fact: "23 August 2023, now celebrated as National Space Day." },
  { y: "2023", n: "Aditya-L1", d: "l1", kid: "India's first solar observatory, parked 1.5 million km away at a balance point between Earth's and the Sun's gravity, watching the Sun non-stop.", fact: "Launched 2 September 2023, reached L1 on 6 January 2024." },
  { y: "2025", n: "SpaDeX docking", d: "leo", kid: "Two spacecraft chased each other in orbit and locked together. India became only the fourth country to do this, a key skill for building space stations.", fact: "Docked on 16 January 2025." },
  { y: "2025", n: "Shubhanshu Shukla on the ISS", d: "leo", kid: "An Indian Air Force pilot became the first Indian to visit the International Space Station, and the second Indian in space, 41 years after Rakesh Sharma.", fact: "Axiom-4 mission, June to July 2025." },
  { y: "2025", n: "NISAR", d: "leo", kid: "A radar satellite built with NASA that can see through clouds and darkness, tracking earthquakes, glaciers and crops across the whole planet.", fact: "Launched on 30 July 2025." },
  { y: "Next", n: "Gaganyaan and beyond", d: "leo", kid: "ISRO is testing step by step to fly Indian astronauts on an Indian rocket. The first uncrewed flight carries a robot called Vyommitra. Plans also include an Indian space station and a Moon sample-return mission.", fact: "Dates depend on safety tests, so they can move. That is normal for human spaceflight." }
];

DATA.badges.push(
  { id: "class11",      name: "Class 11 Scholar",  desc: "Try 4+ questions in every Class 11 chapter" },
  { id: "class12",      name: "Class 12 Scholar",  desc: "Try 4+ questions in every Class 12 chapter" },
  { id: "board-ready",  name: "Board Ready",       desc: "Answer 100 board-style questions" },
  { id: "topic-master", name: "Topic Master",      desc: "Score 8+ in five different topic quizzes" },
  { id: "mega",         name: "Mega Mind",         desc: "Score 16+ out of 20 in the Mega mix" },
  { id: "isro",         name: "ISRO Explorer",     desc: "Explore 10 Indian space missions" }
);

DATA.badges.push(
  { id: "word-nerd",    name: "Word Nerd",         desc: "Open 20 word explanations" },
  { id: "century",      name: "Century",           desc: "Answer 100 practice questions correctly" },
  { id: "super-hard",   name: "Super Solver",      desc: "Crack 10 super-hard questions" },
  { id: "isro-ready",   name: "ISRO Ready",        desc: "30 correct in ISRO Ready practice" },
  { id: "deep-diver",   name: "Deep Diver",        desc: "Complete 50 deep-dive lessons" },
  { id: "quantum-mind", name: "Quantum Mind",      desc: "Complete 40 quantum lessons" }
);
