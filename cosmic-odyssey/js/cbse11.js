/* CBSE Class 11 Physics (042), 2025-26 syllabus: 14 NCERT chapters in 10 units.
   Original practice questions in the board pattern. */
DATA.cbse11 = [
  {
    n: 1, title: "Units and Measurement", unit: "Unit I · Physical world and measurement", sim: "powers10",
    kid: [
      "Physics is about measuring things, and everyone must agree on the units. The SI system has 7 base units: metre, kilogram, second, ampere, kelvin, mole and candela. Every other unit is built from these.",
      "Dimensions are a superpower for checking formulas. You cannot add metres to seconds, just like you cannot add apples to Tuesdays. If both sides of an equation do not have the same dimensions, it is wrong.",
      "Astronomers need extra-big units: the astronomical unit (Earth to Sun), the light year and the parsec."
    ],
    space: "A parsec is the distance at which a star shifts by one arcsecond (1/3600 of a degree) as Earth goes round the Sun. It equals about 3.26 light years.",
    formulas: [["7 SI base units: m, kg, s, A, K, mol, cd", "base quantities"], ["1 AU ≈ 1.496 × 10¹¹ m", "astronomical unit"], ["1 ly ≈ 9.46 × 10¹⁵ m", "light year"], ["1 pc ≈ 3.086 × 10¹⁶ m ≈ 3.26 ly", "parsec"], ["[G] = M⁻¹ L³ T⁻²", "dimensions of G"], ["Relative error of ab or a/b = Δa/a + Δb/b", "combining errors"]],
    qs: [
      { t: "mcq", q: "How many base units are there in the SI system?", o: ["5", "6", "7", "9"], a: 2, e: "Metre, kilogram, second, ampere, kelvin, mole, candela." },
      { t: "mcq", q: "The dimensional formula of the gravitational constant G is", o: ["M L² T⁻²", "M⁻¹ L³ T⁻²", "M L T⁻²", "M⁻² L² T"], a: 1, e: "From F = Gm₁m₂/r²: G = Fr²/m² = (MLT⁻²)(L²)/M²." },
      { t: "mcq", q: "The number of significant figures in 0.00340 is", o: ["2", "3", "5", "6"], a: 1, e: "Leading zeros do not count. The trailing zero after the decimal does. So 3, 4, 0." },
      { t: "ar", A: "Dimensional analysis cannot give the value of a constant like 2π in T = 2π√(l/g).", R: "Pure numbers have no dimensions.", a: 0, e: "Dimensions can tell you √(l/g), but never the 2π." },
      { t: "num", q: "Show that 1 parsec ≈ 3.26 light years. (1 pc = 3.086 × 10¹⁶ m, 1 ly = 9.46 × 10¹⁵ m)", s: "3.086 × 10¹⁶ / 9.46 × 10¹⁵", ans: "≈ 3.26" },
      { t: "num", q: "Using dimensions, find how the period T of a pendulum depends on length l and g.", s: "Let T = k lᵃ gᵇ. [T] = [L]ᵃ[LT⁻²]ᵇ ⇒ a + b = 0 and −2b = 1 ⇒ b = −½, a = ½", ans: "T = k√(l/g)" },
      { t: "short", q: "A student writes v² = u² + 2as². Is this dimensionally correct?", ans: "No. v² has L²T⁻², but as² has (LT⁻²)(L²) = L³T⁻². The correct formula is v² = u² + 2as." }
    ]
  },
  {
    n: 2, title: "Motion in a Straight Line", unit: "Unit II · Kinematics", sim: "vt",
    kid: [
      "Distance is how far you walked. Displacement is how far you ended up from where you started, with a direction. Walk around a full circle and your displacement is zero!",
      "Velocity is displacement per second. Acceleration is how quickly velocity changes. Braking is acceleration too, just negative.",
      "Graphs tell stories: the slope of a velocity-time graph is acceleration, and the area under it is the displacement."
    ],
    space: "A rocket at launch accelerates at around 1.5 to 3 g. Astronauts feel pressed into their seats because their bodies want to stay at rest (inertia).",
    formulas: [["v = u + at", "first equation"], ["s = ut + ½at²", "second equation"], ["v² = u² + 2as", "third equation"], ["slope of x–t = v;  slope of v–t = a", "graphs"], ["area under v–t = displacement", "graphs"], ["v_AB = v_A − v_B", "relative velocity"]],
    qs: [
      { t: "mcq", q: "The slope of a velocity-time graph gives", o: ["displacement", "acceleration", "speed", "jerk"], a: 1, e: "Δv/Δt = a." },
      { t: "mcq", q: "A ball thrown straight up is at its highest point. There,", o: ["v = 0 and a = 0", "v = 0 and a = g downward", "v is maximum", "a = 0"], a: 1, e: "It stops for an instant, but gravity is still acting." },
      { t: "mcq", q: "The area under a velocity-time graph equals", o: ["acceleration", "displacement", "force", "velocity"], a: 1, e: "Velocity × time = displacement." },
      { t: "ar", A: "A body can have zero velocity and still be accelerating.", R: "At the top of a vertical throw velocity is zero while acceleration is g.", a: 0, e: "R is the classic example that proves A." },
      { t: "num", q: "A car starts from rest with acceleration 2 m/s² for 10 s. Find its final velocity and distance travelled.", s: "v = 0 + 2 × 10 = 20 m/s. s = ½ × 2 × 10²", ans: "20 m/s and 100 m" },
      { t: "num", q: "A ball is dropped from 45 m. Taking g = 10 m/s², find the time to fall and speed on landing.", s: "45 = ½ × 10 × t² ⇒ t = 3 s. v = gt", ans: "3 s and 30 m/s" },
      { t: "num", q: "A car at 20 m/s brakes with a deceleration of 5 m/s². Find its stopping distance.", s: "0 = 20² − 2 × 5 × s ⇒ s = 400/10", ans: "40 m. Double the speed and the stopping distance becomes 4 times" }
    ]
  },
  {
    n: 3, title: "Motion in a Plane", unit: "Unit II · Kinematics", sim: "projectile",
    kid: [
      "Throw a ball and it moves sideways and up-down at the same time. Physics treats these as two separate stories: sideways at constant speed, and up-down just like free fall.",
      "Put them together and you get a parabola. On Earth 45° gives the longest throw (without air).",
      "Going round in a circle at a steady speed is still acceleration, because the direction keeps changing. That acceleration always points to the centre."
    ],
    space: "On the Moon, where gravity is 1/6 of Earth's, the same throw goes 6 times farther. Astronaut Alan Shepard famously hit golf balls on the Moon in 1971.",
    formulas: [["R = u² sin 2θ / g", "range"], ["H = u² sin²θ / 2g", "maximum height"], ["T = 2u sin θ / g", "time of flight"], ["y = x tan θ − gx² / (2u² cos²θ)", "trajectory: a parabola"], ["a_c = v²/r = ω²r", "centripetal acceleration"]],
    qs: [
      { t: "mcq", q: "Ignoring air, the range of a projectile is maximum at an angle of", o: ["30°", "45°", "60°", "90°"], a: 1, e: "sin 2θ is largest (= 1) at θ = 45°." },
      { t: "mcq", q: "At the highest point of a projectile's path, its speed is", o: ["zero", "u", "u cos θ", "u sin θ"], a: 2, e: "The vertical part is zero there. The horizontal part never changes." },
      { t: "mcq", q: "In uniform circular motion, the acceleration is", o: ["zero", "along the velocity", "towards the centre, v²/r", "away from the centre"], a: 2, e: "Direction changes constantly, so there is acceleration." },
      { t: "ar", A: "Projectiles launched at 30° and 60° with the same speed have the same range.", R: "sin 2θ is the same for complementary angles.", a: 0, e: "sin 60° = sin 120°." },
      { t: "num", q: "A ball is thrown at 20 m/s at 45°. Using g = 10 m/s², find the range, maximum height and time of flight.", s: "R = 400 × sin 90°/10 = 40 m. H = 400 × (0.5)/20 = 10 m. T = 2 × 20 × 0.707/10", ans: "R = 40 m, H = 10 m, T ≈ 2.83 s" },
      { t: "num", q: "The same throw (20 m/s at 45°) on the Moon, where g = 1.62 m/s². Find the range.", s: "R = u²/g = 400/1.62", ans: "≈ 247 m, over 6 times farther" },
      { t: "num", q: "A stone on a 0.5 m string whirls at 2 revolutions per second. Find its speed and centripetal acceleration.", s: "v = 2πr × f = 2π × 0.5 × 2 = 6.28 m/s. a = v²/r = 39.4/0.5", ans: "6.28 m/s and ≈ 79 m/s²" }
    ]
  },
  {
    n: 4, title: "Laws of Motion", unit: "Unit III · Laws of motion", sim: "fma",
    kid: [
      "First law: things keep doing what they are doing unless a force changes it. A football in space would roll forever.",
      "Second law: force = mass × acceleration. The same push moves a bicycle more than a truck.",
      "Third law: every push has an equal and opposite push back, on the OTHER object. Friction is the sneaky force that makes walking, braking and holding a pen possible."
    ],
    space: "In the ISS, a tiny push sends an astronaut drifting across the module, and they must push off something else to stop. The first law is on display every day.",
    formulas: [["F = ma = dp/dt", "second law"], ["p = mv,  impulse J = FΔt = Δp", "momentum and impulse"], ["m₁u₁ + m₂u₂ = m₁v₁ + m₂v₂", "momentum conservation"], ["f_s ≤ μ_sN,  f_k = μ_kN", "friction"], ["v_max = √(μrg)", "car on a flat curve"], ["tan θ = v²/rg", "banked road without friction"], ["Apparent weight in lift: m(g + a) up, m(g − a) down", "lift problems"]],
    qs: [
      { t: "mcq", q: "Impulse is equal to", o: ["force × distance", "change in momentum", "mass × velocity²", "force / time"], a: 1, e: "J = FΔt = Δp." },
      { t: "mcq", q: "A lift accelerates downward at a. The apparent weight of a person of mass m is", o: ["mg", "m(g + a)", "m(g − a)", "zero"], a: 2, e: "The floor pushes less. In free fall (a = g) it would read zero." },
      { t: "mcq", q: "A cricketer pulls hands back while catching a fast ball in order to", o: ["reduce the change in momentum", "increase the time of impact and reduce the force", "increase the force", "reduce the ball's mass"], a: 1, e: "Same Δp, longer Δt, smaller F. Airbags use the same idea." },
      { t: "ar", A: "It is easier to pull a lawn roller than to push it.", R: "Pulling at an angle reduces the normal reaction and hence friction.", a: 0, e: "Pulling lifts slightly (N = mg − F sin θ); pushing presses down (N = mg + F sin θ)." },
      { t: "num", q: "A 5 kg block is pushed with 20 N on a floor with μ_k = 0.2. Find its acceleration (g = 10 m/s²).", s: "f = 0.2 × 5 × 10 = 10 N. a = (20 − 10)/5", ans: "2 m/s²" },
      { t: "num", q: "A 4 kg gun fires a 20 g bullet at 400 m/s. Find the recoil speed of the gun.", s: "0 = 0.02 × 400 − 4v ⇒ v = 8/4", ans: "2 m/s backwards" },
      { t: "num", q: "Find the maximum safe speed on a flat curve of radius 50 m if μ = 0.4 (g = 10 m/s²).", s: "v = √(μrg) = √(0.4 × 50 × 10) = √200", ans: "≈ 14.1 m/s (about 51 km/h)" }
    ]
  },
  {
    n: 5, title: "Work, Energy and Power", unit: "Unit IV · Work, energy and power", sim: "pendulum",
    kid: [
      "In physics, work is done only when a force moves something along its direction. Holding a heavy bag still? Tiring, but zero work!",
      "Energy is the ability to do work. Moving things have kinetic energy, lifted things have potential energy. On a swing, the two keep trading places, but the total stays the same.",
      "Power is how FAST you do work. Running up the stairs and walking up them need the same work, but running needs more power."
    ],
    space: "A spacecraft on an elliptical orbit is like a swing: it trades kinetic and potential energy, fastest when closest to the planet.",
    formulas: [["W = F s cos θ", "work"], ["K = ½mv² = p²/2m", "kinetic energy"], ["U = mgh;  U = ½kx²", "potential energy"], ["W_net = ΔK", "work-energy theorem"], ["P = W/t = Fv", "power"], ["Elastic: momentum and KE conserved", "collisions"], ["e = (v₂ − v₁)/(u₁ − u₂)", "coefficient of restitution"]],
    qs: [
      { t: "mcq", q: "The work done by the centripetal force in uniform circular motion is", o: ["positive", "negative", "zero", "mv²"], a: 2, e: "Force is always perpendicular to displacement." },
      { t: "mcq", q: "If the momentum of a body doubles, its kinetic energy becomes", o: ["2 times", "4 times", "half", "unchanged"], a: 1, e: "K = p²/2m." },
      { t: "mcq", q: "In a perfectly elastic collision, which are conserved?", o: ["only momentum", "only kinetic energy", "both momentum and kinetic energy", "neither"], a: 2, e: "In inelastic collisions only momentum is conserved." },
      { t: "ar", A: "The work done by kinetic friction on a sliding block is negative.", R: "Friction acts opposite to the direction of motion.", a: 0, e: "θ = 180°, so cos θ = −1." },
      { t: "num", q: "A 2 kg ball is dropped from 20 m. Find its speed and KE just before hitting the ground (g = 10 m/s²).", s: "mgh = ½mv² ⇒ v = √(2gh) = √400. KE = mgh = 2 × 10 × 20", ans: "20 m/s and 400 J" },
      { t: "num", q: "A motor lifts 100 kg through 10 m in 20 s. Find its power (g = 10 m/s²).", s: "P = mgh/t = 100 × 10 × 10 / 20", ans: "500 W" },
      { t: "short", q: "Two equal masses collide head-on elastically, one initially at rest. What happens?", ans: "They exchange velocities: the moving one stops dead and the other moves off with its speed. Newton's cradle shows this." }
    ]
  },
  {
    n: 6, title: "System of Particles and Rotational Motion", unit: "Unit V · Rotational motion", sim: "skater",
    kid: [
      "Every object has a balance point called the centre of mass. Throw a spinning hammer and that point follows a perfect parabola while the rest wobbles around it.",
      "Torque is a turning push. Door handles are far from the hinges because a longer lever gives more torque for the same push.",
      "Angular momentum is spin that refuses to change. An ice skater pulls in her arms and spins faster, with nobody pushing her."
    ],
    space: "When a massive star's core collapses to about 20 km across, conservation of angular momentum makes it spin hundreds of times a second. Pulsars are the proof.",
    formulas: [["τ = r × F = rF sin θ", "torque"], ["L = r × p = Iω", "angular momentum"], ["τ = dL/dt = Iα", "rotational second law"], ["I₁ω₁ = I₂ω₂ (no external torque)", "conservation of L"], ["K_rot = ½Iω²", "rotational KE"], ["I_ring = MR²,  I_disc = ½MR²,  I_sphere = ⅖MR²", "moments of inertia"], ["I = I_cm + Md²", "parallel axis theorem"]],
    qs: [
      { t: "mcq", q: "When a spinning ice skater pulls in her arms,", o: ["I increases, ω decreases", "I decreases, ω increases", "both increase", "both decrease"], a: 1, e: "L = Iω stays constant." },
      { t: "mcq", q: "The SI unit of torque is", o: ["N/m", "N m", "J/s", "kg m/s"], a: 1, e: "Same units as energy, but it is a different quantity (a vector)." },
      { t: "mcq", q: "The centre of mass of a uniform ring lies", o: ["on the ring", "at its geometric centre, where there is no mass", "anywhere", "outside the plane"], a: 1, e: "The centre of mass need not be inside the material." },
      { t: "ar", A: "A collapsing star spins faster and faster.", R: "Angular momentum is conserved when no external torque acts.", a: 0, e: "Smaller I, so larger ω." },
      { t: "num", q: "A skater with I = 2 kg m² spins at 10 rad/s. She pulls in her arms so I = 1 kg m². Find the new ω and compare kinetic energies.", s: "ω₂ = I₁ω₁/I₂ = 20 rad/s. K₁ = ½ × 2 × 100 = 100 J. K₂ = ½ × 1 × 400 = 200 J", ans: "ω = 20 rad/s. KE doubles, the extra comes from the work her muscles do pulling in" },
      { t: "num", q: "A 20 N force is applied perpendicular to a spanner at 0.5 m from the bolt. Find the torque.", s: "τ = rF = 0.5 × 20", ans: "10 N m" },
      { t: "num", q: "The Sun rotates once in about 25 days and has radius 7 × 10⁵ km. If it shrank to 10 km without losing mass or angular momentum (ω ∝ 1/R²), what would its rotation period be?", s: "Factor = (7 × 10⁵ / 10)² = 4.9 × 10⁹. T = 25 × 86400 s / 4.9 × 10⁹", ans: "≈ 4.4 × 10⁻⁴ s, over 2000 spins per second (a simplified model, but it shows why pulsars spin so fast)" }
    ]
  },
  {
    n: 7, title: "Gravitation", unit: "Unit VI · Gravitation", sim: "kepler",
    kid: [
      "Kepler found three rules for planets: they move in ellipses, they speed up near the Sun, and farther planets take much longer to go round.",
      "Newton explained all three with one law: every mass pulls every other mass, and the pull weakens with distance squared.",
      "Throw something fast enough sideways and it falls around Earth forever: that is an orbit. Throw it at 11.2 km/s and it escapes Earth completely."
    ],
    space: "India's GSAT communication satellites sit about 36,000 km up in geostationary orbit, circling once every 24 hours so they stay above the same spot.",
    formulas: [["F = Gm₁m₂/r²,  G = 6.67 × 10⁻¹¹ N m²/kg²", "universal gravitation"], ["g = GM/R²", "surface gravity"], ["g_h ≈ g(1 − 2h/R);  g_d = g(1 − d/R)", "variation with height and depth"], ["U = −GMm/r", "gravitational potential energy"], ["v_e = √(2GM/R) = √(2gR)", "escape speed"], ["v_o = √(GM/r)", "orbital speed"], ["T² = (4π²/GM) r³", "Kepler's third law"], ["E = −GMm/2r", "total energy of a satellite"]],
    qs: [
      { t: "mcq", q: "At a depth d below Earth's surface, g becomes", o: ["g(1 + d/R)", "g(1 − d/R)", "g(1 − 2d/R)", "unchanged"], a: 1, e: "Only the mass inside radius (R − d) pulls you." },
      { t: "mcq", q: "Escape speed from a planet depends on", o: ["the mass of the object launched", "the planet's mass and radius", "the direction of launch", "the object's shape"], a: 1, e: "v_e = √(2GM/R): no m of the object." },
      { t: "mcq", q: "The period of a geostationary satellite is", o: ["12 h", "24 h", "90 min", "27 days"], a: 1, e: "Strictly one sidereal day, about 23 h 56 min." },
      { t: "mcq", q: "The total energy of a satellite in a bound orbit is", o: ["positive", "zero", "negative", "infinite"], a: 2, e: "E = −GMm/2r. Negative means bound." },
      { t: "ar", A: "A planet moves faster when it is closer to the Sun.", R: "The planet's angular momentum about the Sun is conserved.", a: 0, e: "Smaller r means larger v for the same L = mvr." },
      { t: "num", q: "Calculate Earth's escape speed. (g = 9.8 m/s², R = 6.4 × 10⁶ m)", s: "v = √(2gR) = √(2 × 9.8 × 6.4 × 10⁶) = √(1.25 × 10⁸)", ans: "≈ 11.2 km/s" },
      { t: "num", q: "At what height above Earth's surface does g become g/4?", s: "g' = g R²/(R + h)² = g/4 ⇒ R + h = 2R", ans: "h = R ≈ 6400 km" },
      { t: "num", q: "Mars orbits at 1.52 AU. Using Kepler's third law, find its year in Earth years.", s: "T² ∝ a³ ⇒ T = 1.52^1.5", ans: "≈ 1.87 years" }
    ]
  },
  {
    n: 8, title: "Mechanical Properties of Solids", unit: "Unit VII · Properties of bulk matter", sim: "stress",
    kid: [
      "Pull a rubber band and it stretches. Let go and it snaps back. That springiness is elasticity.",
      "Stress is how hard you pull per square metre. Strain is how much it stretches compared to its length. For small pulls they are proportional: Hooke's law.",
      "Pull too hard and it stays stretched forever (plastic), or breaks. Engineers design bridges and lifts to stay well inside the elastic zone."
    ],
    space: "Rockets and satellites are built from materials with a high strength-to-weight ratio, such as titanium and carbon fibre, because every kilogram launched is expensive.",
    formulas: [["Stress = F/A (Pa)", "stress"], ["Strain = ΔL/L (no unit)", "strain"], ["Y = (F/A)/(ΔL/L)", "Young's modulus"], ["B = −ΔP/(ΔV/V)", "bulk modulus"], ["G = shear stress / shear strain", "shear modulus"]],
    qs: [
      { t: "mcq", q: "The Young's modulus of a perfectly rigid body is", o: ["zero", "one", "infinite", "negative"], a: 2, e: "It would have zero strain for any stress." },
      { t: "mcq", q: "The SI unit of stress is", o: ["N", "N/m²", "N m", "no unit"], a: 1, e: "Same as pressure: pascal." },
      { t: "ar", A: "Steel is more elastic than rubber.", R: "For the same stress, steel shows much less strain, so its Young's modulus is much higher.", a: 0, e: "In physics, 'more elastic' means a larger restoring force per unit strain." },
      { t: "mcq", q: "The part of the stress-strain curve where the material stays permanently deformed is the", o: ["proportional region", "elastic region", "plastic region", "origin"], a: 2, e: "Beyond the yield point." },
      { t: "num", q: "A 2 m wire of area 1 mm² is pulled by 100 N. Y = 2 × 10¹¹ Pa. Find the extension.", s: "ΔL = FL/(AY) = (100 × 2)/(10⁻⁶ × 2 × 10¹¹)", ans: "10⁻³ m = 1 mm" },
      { t: "num", q: "Find the stress in that wire (100 N on 1 mm²).", s: "Stress = F/A = 100 / 10⁻⁶", ans: "10⁸ Pa" },
      { t: "short", q: "Why are girders and rails I-shaped?", ans: "The top and bottom flanges carry most of the bending stress, so an I-section gives high stiffness and strength with much less material and weight." }
    ]
  },
  {
    n: 9, title: "Mechanical Properties of Fluids", unit: "Unit VII · Properties of bulk matter", sim: "terminal",
    kid: [
      "Pressure in a fluid pushes equally in all directions and grows with depth. That is why dams are thicker at the bottom.",
      "Squeeze a fluid at one point and the pressure spreads everywhere (Pascal's law). A small push on a small piston lifts a car on a big piston.",
      "Fluids have 'stickiness' called viscosity. Honey is very viscous. Objects falling through fluids speed up until drag balances their weight: that top speed is terminal velocity."
    ],
    space: "Spacecraft returning to Earth use parachutes to lower their terminal velocity. Chandrayaan-3's lander had to use rockets instead, because the Moon has no air.",
    formulas: [["P = P₀ + ρgh", "pressure at depth"], ["F₁/A₁ = F₂/A₂", "Pascal's law, hydraulic lift"], ["A₁v₁ = A₂v₂", "equation of continuity"], ["P + ½ρv² + ρgh = constant", "Bernoulli's principle"], ["F = 6πηrv", "Stokes' law"], ["v_t = 2r²(ρ − σ)g / 9η", "terminal velocity"], ["Excess pressure in a drop = 2S/r", "surface tension"]],
    qs: [
      { t: "mcq", q: "Hydraulic brakes work on", o: ["Bernoulli's principle", "Pascal's law", "Archimedes' principle", "Stokes' law"], a: 1, e: "Pressure applied at the pedal is transmitted to all wheels." },
      { t: "mcq", q: "Terminal velocity of a small sphere in a fluid is proportional to", o: ["r", "r²", "1/r", "r³"], a: 1, e: "v_t = 2r²(ρ − σ)g/9η." },
      { t: "mcq", q: "Rain drops are spherical because of", o: ["viscosity", "surface tension", "gravity", "air pressure"], a: 1, e: "A sphere has the least surface area for a given volume." },
      { t: "ar", A: "When you stand, blood pressure in your feet is higher than in your brain.", R: "Pressure in a fluid increases with depth as hρg.", a: 0, e: "The feet are about 1.5 m 'deeper' in the blood column." },
      { t: "num", q: "A hydraulic lift has pistons of 10 cm² and 1000 cm². What load can a 100 N force lift?", s: "F₂ = F₁ × A₂/A₁ = 100 × 100", ans: "10,000 N (about a 1-tonne car)" },
      { t: "num", q: "Find the extra pressure at 10 m depth in water (ρ = 1000 kg/m³, g = 10 m/s²).", s: "ΔP = ρgh = 1000 × 10 × 10", ans: "10⁵ Pa, about one extra atmosphere" },
      { t: "num", q: "Water flows through a pipe whose area halves. What happens to its speed?", s: "A₁v₁ = A₂v₂ ⇒ v₂ = v₁ × A₁/A₂", ans: "It doubles" }
    ]
  },
  {
    n: 10, title: "Thermal Properties of Matter", unit: "Unit VII · Properties of bulk matter", sim: "heating",
    kid: [
      "Heat is energy moving from hot to cold. Temperature tells us how hot something is, which is really how fast its particles jiggle.",
      "Most things expand when heated. Railway tracks have small gaps so they do not buckle in summer.",
      "Water is a heat sponge: it takes a lot of heat to warm up (high specific heat). And while ice melts or water boils, the temperature stays stuck, because the heat goes into breaking bonds (latent heat)."
    ],
    space: "On the Moon, with no air or oceans to store heat, the ground swings from about +120 °C in the day to about −130 °C at night. Chandrayaan-3's ChaSTE probe measured lunar soil temperature directly.",
    formulas: [["T_F = (9/5)T_C + 32,  T_K = T_C + 273.15", "temperature scales"], ["ΔL = αLΔT,  β ≈ 3α", "thermal expansion"], ["Q = mcΔT", "specific heat"], ["Q = mL", "latent heat"], ["H = KA(T₁ − T₂)/x", "conduction"]],
    qs: [
      { t: "mcq", q: "At what temperature do the Celsius and Fahrenheit scales read the same number?", o: ["0", "−40", "100", "−273"], a: 1, e: "Solve C = 9C/5 + 32 ⇒ C = −40." },
      { t: "mcq", q: "While ice is melting, its temperature", o: ["rises", "falls", "stays constant", "first rises then falls"], a: 2, e: "Heat goes into latent heat of fusion." },
      { t: "mcq", q: "Coastal cities have milder climates mainly because water has", o: ["low density", "high specific heat", "low boiling point", "high viscosity"], a: 1, e: "Seas warm and cool slowly, smoothing temperature changes." },
      { t: "ar", A: "Small gaps are left between railway track sections.", R: "Metals expand on heating.", a: 0, e: "Without gaps, summer expansion would buckle the rails." },
      { t: "num", q: "How much heat is needed to warm 2 kg of water from 20 °C to 70 °C? (c = 4186 J/kg K)", s: "Q = mcΔT = 2 × 4186 × 50", ans: "418,600 J ≈ 419 kJ" },
      { t: "num", q: "How much heat melts 0.5 kg of ice at 0 °C? (L_f = 3.34 × 10⁵ J/kg)", s: "Q = mL = 0.5 × 3.34 × 10⁵", ans: "1.67 × 10⁵ J" },
      { t: "num", q: "A 10 m steel rail (α = 1.2 × 10⁻⁵ /K) warms by 40 K. Find its expansion.", s: "ΔL = αLΔT = 1.2 × 10⁻⁵ × 10 × 40", ans: "4.8 × 10⁻³ m = 4.8 mm" }
    ]
  },
  {
    n: 11, title: "Thermodynamics", unit: "Unit VIII · Thermodynamics", sim: "pv",
    kid: [
      "Zeroth law: if A and B are each the same temperature as C, they are the same temperature as each other. That is why thermometers work.",
      "First law: energy is never created or destroyed. Heat you give a gas either warms it up or lets it push outward (do work), or both.",
      "Second law: heat naturally flows from hot to cold, never the other way on its own, and no engine can turn heat completely into work. Some always escapes."
    ],
    space: "The second law explains why the universe is slowly running down. Stars shine by turning useful concentrated energy into spread-out heat, and in trillions of years they will all fade.",
    formulas: [["ΔU = Q − W", "first law (W = work done BY the gas)"], ["W = PΔV", "isobaric work"], ["W = nRT ln(V₂/V₁)", "isothermal work"], ["PV^γ = constant", "adiabatic process"], ["W = (P₁V₁ − P₂V₂)/(γ − 1)", "adiabatic work"], ["η = W/Q₁ = 1 − Q₂/Q₁", "engine efficiency"]],
    qs: [
      { t: "mcq", q: "The zeroth law of thermodynamics leads to the concept of", o: ["heat", "temperature", "entropy", "internal energy"], a: 1, e: "Thermal equilibrium defines temperature." },
      { t: "mcq", q: "In an isothermal process of an ideal gas, the change in internal energy is", o: ["maximum", "equal to Q", "zero", "equal to −W"], a: 2, e: "U of an ideal gas depends only on T." },
      { t: "mcq", q: "In an adiabatic process", o: ["temperature is constant", "no heat is exchanged", "volume is constant", "pressure is constant"], a: 1, e: "Q = 0. Fast compression in a bicycle pump is nearly adiabatic, so the pump warms." },
      { t: "ar", A: "A gas cools when it expands adiabatically.", R: "It does work at the expense of its own internal energy.", a: 0, e: "ΔU = −W when Q = 0. Rising air cools this way and forms clouds." },
      { t: "num", q: "A gas absorbs 500 J of heat and does 200 J of work. Find the change in internal energy.", s: "ΔU = Q − W = 500 − 200", ans: "300 J" },
      { t: "num", q: "An engine takes in 1000 J and rejects 600 J each cycle. Find its efficiency.", s: "η = 1 − Q₂/Q₁ = 1 − 600/1000", ans: "40%" },
      { t: "num", q: "A gas expands by 2 × 10⁻³ m³ at a constant pressure of 10⁵ Pa. Find the work done.", s: "W = PΔV = 10⁵ × 2 × 10⁻³", ans: "200 J" }
    ]
  },
  {
    n: 12, title: "Kinetic Theory", unit: "Unit IX · Kinetic theory of gases", sim: "gas",
    kid: [
      "A gas is billions of tiny molecules zooming around and bouncing off walls. Pressure is just the drumming of all those tiny hits.",
      "Temperature is a measure of how fast they move on average. Heat a gas and the molecules speed up and hit harder.",
      "Light molecules like hydrogen move much faster than heavy ones at the same temperature. That is why Earth has lost almost all its free hydrogen to space."
    ],
    space: "The Moon's escape speed is only 2.4 km/s. Gas molecules warmed by the Sun eventually leak away, which is why the Moon has almost no atmosphere.",
    formulas: [["PV = nRT = Nk_BT", "ideal gas equation"], ["P = ⅓ρv²_rms", "pressure from molecules"], ["v_rms = √(3RT/M) = √(3k_BT/m)", "rms speed"], ["KE avg = (3/2)k_BT per molecule", "temperature and energy"], ["½k_BT per degree of freedom", "equipartition of energy"], ["λ = 1/(√2 nπd²)", "mean free path"]],
    qs: [
      { t: "mcq", q: "The average kinetic energy of a gas molecule depends only on", o: ["pressure", "volume", "temperature", "molar mass"], a: 2, e: "(3/2)k_BT." },
      { t: "mcq", q: "If the absolute temperature of a gas is made 4 times, v_rms becomes", o: ["4 times", "2 times", "16 times", "half"], a: 1, e: "v_rms ∝ √T." },
      { t: "mcq", q: "At the same temperature, which moves fastest on average?", o: ["O₂", "N₂", "H₂", "CO₂"], a: 2, e: "Lightest molecule, so highest v_rms." },
      { t: "ar", A: "The Moon has almost no atmosphere.", R: "Gas molecules there move at speeds that are a significant fraction of the Moon's low escape speed.", a: 0, e: "Over time, the fastest molecules escape." },
      { t: "num", q: "Find v_rms of nitrogen (M = 0.028 kg/mol) at 300 K. (R = 8.314 J/mol K)", s: "v = √(3 × 8.314 × 300 / 0.028) = √267,000", ans: "≈ 517 m/s" },
      { t: "num", q: "Find v_rms of hydrogen (M = 0.002 kg/mol) at 300 K.", s: "v = √(3 × 8.314 × 300 / 0.002)", ans: "≈ 1934 m/s, almost 4 times nitrogen's" },
      { t: "num", q: "What volume does 1 mole of an ideal gas occupy at 273 K and 1.013 × 10⁵ Pa?", s: "V = nRT/P = 8.314 × 273 / 1.013 × 10⁵", ans: "≈ 0.0224 m³ = 22.4 L" }
    ]
  },
  {
    n: 13, title: "Oscillations", unit: "Unit X · Oscillations and waves", sim: "shm",
    kid: [
      "A swing, a guitar string, your heartbeat: all repeat. When the restoring pull is proportional to how far you are from the middle, you get simple harmonic motion (SHM).",
      "The cool part: the time for one swing does not depend on how big the swing is (for small swings). Galileo noticed this watching a lamp sway in a cathedral.",
      "A heavier mass on a spring swings slower. A stiffer spring swings faster. A pendulum's period depends only on its length and g, not its mass."
    ],
    space: "A pendulum clock taken to the Moon would run about 2.5 times slower, because g is only 1/6 as strong.",
    formulas: [["x = A sin(ωt + φ)", "SHM displacement"], ["a = −ω²x", "defining property of SHM"], ["T = 2π√(m/k)", "spring-mass system"], ["T = 2π√(l/g)", "simple pendulum"], ["v = ω√(A² − x²)", "speed in SHM"], ["E = ½kA²", "total energy"]],
    qs: [
      { t: "mcq", q: "In SHM, the acceleration is", o: ["constant", "proportional to displacement and opposite to it", "proportional to velocity", "zero at extremes"], a: 1, e: "a = −ω²x." },
      { t: "mcq", q: "The period of a simple pendulum does not depend on", o: ["length", "g", "mass of the bob", "location"], a: 2, e: "T = 2π√(l/g)." },
      { t: "mcq", q: "At the mean position in SHM,", o: ["speed is max, acceleration is zero", "speed is zero, acceleration is max", "both max", "both zero"], a: 0, e: "No displacement, so no restoring force." },
      { t: "ar", A: "A pendulum clock runs slow at the top of a mountain.", R: "g decreases with height, so the period increases.", a: 0, e: "Longer period means fewer ticks per real hour." },
      { t: "num", q: "Find the period of a 1 m pendulum on Earth (g = 9.8 m/s²) and on the Moon (g = 1.62 m/s²).", s: "T = 2π√(1/9.8) and 2π√(1/1.62)", ans: "≈ 2.0 s on Earth, ≈ 4.9 s on the Moon" },
      { t: "num", q: "A 0.5 kg mass hangs on a spring of k = 50 N/m. Find its period.", s: "T = 2π√(0.5/50) = 2π × 0.1", ans: "≈ 0.63 s" },
      { t: "num", q: "A tunnel through Earth's centre: a dropped ball does SHM with T = 2π√(R/g). Find the time to reach the other side. (R = 6.4 × 10⁶ m, g = 9.8 m/s²)", s: "T = 2π√(6.4 × 10⁶ / 9.8) ≈ 2π × 808 ≈ 5077 s. One way = T/2", ans: "≈ 42 minutes (uniform-density Earth)" }
    ]
  },
  {
    n: 14, title: "Waves", unit: "Unit X · Oscillations and waves", sim: "standing",
    kid: [
      "A wave carries energy from place to place without carrying the stuff itself. A stadium 'Mexican wave' travels around, but each person just stands up and sits down.",
      "In transverse waves the wiggle is sideways (like a string). In longitudinal waves it is back and forth along the direction (like sound, which squeezes and stretches air).",
      "Pluck a guitar string and waves bounce back and forth to make a standing wave with still points called nodes. Only certain notes fit: the harmonics."
    ],
    space: "Sound cannot travel through empty space, but the Sun rings like a bell with pressure waves inside it. Scientists study these to see inside the Sun (helioseismology).",
    formulas: [["v = fλ", "wave equation"], ["v = √(T/μ)", "speed on a string"], ["v = √(γP/ρ)", "speed of sound in a gas (Laplace)"], ["f_n = nv/2L", "string fixed at both ends; open pipe"], ["f_n = nv/4L,  n = 1, 3, 5…", "pipe closed at one end"], ["f_beat = |f₁ − f₂|", "beats"]],
    qs: [
      { t: "mcq", q: "Sound waves in air are", o: ["transverse", "longitudinal", "electromagnetic", "standing only"], a: 1, e: "Air is compressed and rarefied along the direction of travel." },
      { t: "mcq", q: "The speed of a wave on a stretched string is proportional to", o: ["T", "√T", "1/T", "T²"], a: 1, e: "v = √(T/μ)." },
      { t: "mcq", q: "The distance between two consecutive nodes in a standing wave is", o: ["λ", "λ/2", "λ/4", "2λ"], a: 1, e: "Node to antinode is λ/4." },
      { t: "ar", A: "Sound cannot travel through vacuum.", R: "Sound is a mechanical wave that needs a medium.", a: 0, e: "Astronauts use radios, which use EM waves." },
      { t: "num", q: "A 256 Hz tuning fork sounds in air where v = 340 m/s. Find the wavelength.", s: "λ = v/f = 340/256", ans: "≈ 1.33 m" },
      { t: "num", q: "A 1 m string fixed at both ends has wave speed 200 m/s. Find the fundamental and third harmonic.", s: "f₁ = v/2L = 100 Hz; f₃ = 3f₁", ans: "100 Hz and 300 Hz" },
      { t: "num", q: "Tuning forks of 256 Hz and 260 Hz sound together. How many beats per second?", s: "|260 − 256|", ans: "4 beats per second" },
      { t: "num", q: "Find the fundamental of a 0.5 m pipe (v = 340 m/s) when (a) open at both ends (b) closed at one end.", s: "(a) v/2L = 340/1. (b) v/4L = 340/2", ans: "340 Hz open, 170 Hz closed. A closed pipe sounds an octave lower" }
    ]
  }
];
