/* CBSE Class 12 Physics (042), 2025-26 syllabus: 9 units, 14 chapters.
   Original practice questions in the board pattern (MCQ, assertion-reason, numericals, case study).
   Unit marks: I+II 16, III+IV 17, V+VI 18, VII+VIII 12, IX 7 (theory 70). */
window.DATA = window.DATA || {};
DATA.AR_OPTS = [
  "Both A and R are true, and R is the correct explanation of A",
  "Both A and R are true, but R is NOT the correct explanation of A",
  "A is true, but R is false",
  "Both A and R are false"
];
DATA.cbse12 = [
  {
    n: 1, title: "Electric Charges and Fields", unit: "Unit I · Electrostatics", marks: "Units I and II together: 16 marks", sim: "fieldlines",
    kid: [
      "Rub a balloon on your hair and it sticks to the wall. You just moved tiny electrons from your hair to the balloon. Charge is never made or destroyed, only moved around.",
      "Every charge spreads an invisible 'force zone' around itself called an electric field. Field lines are like arrows showing which way a tiny positive charge would be pushed. They start on + charges and end on − charges, and they never cross.",
      "Coulomb found the rule: the force gets 4 times weaker if you double the distance. Exactly the same inverse-square pattern as gravity!"
    ],
    space: "The solar wind is a stream of charged particles. When it hits Earth's upper atmosphere near the poles, it lights up the sky as auroras.",
    formulas: [["F = kq₁q₂ / r²,  k = 9 × 10⁹ N m²/C²", "Coulomb's law"], ["E = F / q₀ = kq / r²", "field of a point charge"], ["q = ne,  e = 1.6 × 10⁻¹⁹ C", "charge is quantised"], ["Φ = q_enclosed / ε₀", "Gauss's law"], ["E = λ / 2πε₀r", "infinite line charge"], ["E = σ / 2ε₀", "infinite plane sheet"], ["p = q × 2a", "dipole moment"]],
    qs: [
      { t: "mcq", q: "Two point charges repel with force F. If each charge is doubled and the distance between them is halved, the new force is", o: ["F", "4F", "8F", "16F"], a: 3, e: "F ∝ q₁q₂/r². Charges give 2 × 2 = 4 times, halving r gives 2² = 4 times. Total 16F." },
      { t: "mcq", q: "The SI unit of electric flux is", o: ["N/C", "N m²/C", "C/m²", "V/m"], a: 1, e: "Flux Φ = E × area, so (N/C)(m²) = N m²/C. It can also be written as V m." },
      { t: "mcq", q: "The electric field inside a uniformly charged thin spherical shell is", o: ["maximum at the centre", "zero everywhere inside", "same as outside", "infinite"], a: 1, e: "A Gaussian surface inside the shell encloses no charge, so by Gauss's law E = 0." },
      { t: "ar", A: "Electric field lines never cross each other.", R: "At any point, the electric field has only one direction.", a: 0, e: "If two lines crossed, the field would point in two directions at one point, which is impossible. R explains A." },
      { t: "num", q: "Charges +2 μC and +8 μC are 30 cm apart in air. Find the force between them.", s: "F = kq₁q₂/r² = (9 × 10⁹)(2 × 10⁻⁶)(8 × 10⁻⁶) / (0.3)² = 0.144 / 0.09", ans: "1.6 N, repulsive" },
      { t: "num", q: "For the same two charges (+2 μC and +8 μC, 30 cm apart), where on the line joining them is the electric field zero?", s: "Let the point be x from the 2 μC charge. k(2)/x² = k(8)/(0.3 − x)² ⇒ (0.3 − x)/x = 2 ⇒ 0.3 = 3x", ans: "x = 0.1 m, i.e. 10 cm from the +2 μC charge (closer to the smaller charge)" },
      { t: "num", q: "A closed surface encloses a net charge of 8.85 nC. What is the total electric flux through it? (ε₀ = 8.85 × 10⁻¹² C²/N m²)", s: "Φ = q/ε₀ = 8.85 × 10⁻⁹ / 8.85 × 10⁻¹²", ans: "1000 N m²/C. The shape and size of the surface do not matter" },
      { t: "short", q: "Why can a charge never be 2.5e?", ans: "Charge is quantised: every charge is a whole-number multiple of e (q = ne). There is no free charge smaller than one electron's charge. (Quarks have fractional charge but are never found alone.)" }
    ]
  },
  {
    n: 2, title: "Electrostatic Potential and Capacitance", unit: "Unit I · Electrostatics", marks: "Units I and II together: 16 marks", sim: "capacitor",
    kid: [
      "Think of potential as 'electric height'. A charge rolls from high potential to low potential, like water flowing downhill. Voltage is just the difference in height.",
      "A capacitor is two metal plates with a gap. It is like a tiny rechargeable bucket for charge. Bigger plates, a smaller gap, or an insulator (dielectric) in between all make the bucket hold more.",
      "Camera flashes use capacitors: charge slowly, then dump all the energy in a split second."
    ],
    space: "A thundercloud and the ground act like a giant capacitor. When the voltage gets too high the air breaks down and lightning jumps across.",
    formulas: [["V = kq / r", "potential of a point charge"], ["U = kq₁q₂ / r", "potential energy of two charges"], ["E = −dV/dr", "field is the slope of potential"], ["C = Q / V", "capacitance"], ["C = Kε₀A / d", "parallel plate capacitor"], ["1/C = 1/C₁ + 1/C₂ (series);  C = C₁ + C₂ (parallel)", "combinations"], ["U = ½CV² = Q²/2C", "energy stored"]],
    qs: [
      { t: "mcq", q: "Equipotential surfaces are always", o: ["parallel to field lines", "perpendicular to field lines", "at 45° to field lines", "circular"], a: 1, e: "No work is done moving along an equipotential, so the field has no component along it: E ⊥ surface." },
      { t: "mcq", q: "Work done in moving a 2 μC charge between two points on the same equipotential surface is", o: ["zero", "2 J", "depends on path", "infinite"], a: 0, e: "W = qΔV and ΔV = 0." },
      { t: "mcq", q: "A dielectric slab is inserted into a capacitor still connected to a battery. The charge on the plates", o: ["decreases", "stays the same", "increases", "becomes zero"], a: 2, e: "V is fixed by the battery and C increases by K, so Q = CV increases." },
      { t: "ar", A: "A capacitor blocks steady direct current.", R: "The plates of a capacitor are separated by an insulator.", a: 0, e: "Once charged, no steady charge can flow through the insulating gap." },
      { t: "num", q: "A parallel plate capacitor has plate area 0.02 m² and separation 1 mm in air. Find C. What happens if a dielectric of K = 5 fills the gap?", s: "C = ε₀A/d = (8.85 × 10⁻¹²)(0.02)/(10⁻³) = 1.77 × 10⁻¹⁰ F. With K = 5, C becomes 5 times larger.", ans: "177 pF in air, 885 pF with the dielectric" },
      { t: "num", q: "A 10 μF capacitor is charged to 100 V. How much energy does it store?", s: "U = ½CV² = ½ (10 × 10⁻⁶)(100)²", ans: "0.05 J" },
      { t: "num", q: "Find the equivalent capacitance of 2 μF and 3 μF in (a) series (b) parallel.", s: "(a) 1/C = 1/2 + 1/3 = 5/6 ⇒ C = 1.2 μF. (b) C = 2 + 3", ans: "1.2 μF in series, 5 μF in parallel" },
      { t: "num", q: "What is the potential 9 cm from a 1 nC point charge?", s: "V = kq/r = (9 × 10⁹)(10⁻⁹)/0.09", ans: "100 V" }
    ]
  },
  {
    n: 3, title: "Current Electricity", unit: "Unit II · Current Electricity", marks: "Units I and II together: 16 marks", sim: "circuit",
    kid: [
      "Current is how much charge flows past a point every second. Voltage is the push, resistance is how hard the wire resists. Ohm's law ties them: V = IR.",
      "Surprise: electrons in a wire crawl slower than a snail (about a tenth of a millimetre per second)! The bulb still lights instantly because the push (electric field) travels through the wire almost at light speed. It is like a pipe already full of water: push one end and water comes out the other end at once.",
      "Every real battery has a little resistance inside it too. That is why a battery gets warm and its voltage drops when you draw a big current."
    ],
    space: "Satellites run on solar panels and batteries. Engineers use exactly these laws to make sure the power lasts through the dark half of every orbit.",
    formulas: [["I = nAev_d", "current and drift velocity"], ["V = IR,  R = ρL/A", "Ohm's law, resistivity"], ["ρ_T = ρ₀[1 + α(T − T₀)]", "resistivity rises with temperature in metals"], ["I = ε / (R + r),  V = ε − Ir", "cell with internal resistance"], ["P = VI = I²R = V²/R", "power"], ["ΣI = 0 (junction),  ΣIR = Σε (loop)", "Kirchhoff's rules"], ["P/Q = R/S", "balanced Wheatstone bridge"]],
    qs: [
      { t: "mcq", q: "The drift speed of electrons in a typical copper wire is of the order of", o: ["10⁸ m/s", "10³ m/s", "10⁻⁴ m/s", "10⁻¹² m/s"], a: 2, e: "Only about 0.1 mm/s. The signal is fast, the electrons are slow." },
      { t: "mcq", q: "A wire is stretched to double its length (volume constant). Its resistance becomes", o: ["2R", "4R", "R/2", "R/4"], a: 1, e: "L doubles and A halves, so R = ρL/A becomes 2 × 2 = 4 times." },
      { t: "mcq", q: "Kirchhoff's junction rule is based on conservation of", o: ["energy", "momentum", "charge", "mass"], a: 2, e: "Charge entering a junction must leave it. The loop rule comes from conservation of energy." },
      { t: "ar", A: "A bulb glows almost instantly when switched on, although drift velocity is very small.", R: "The electric field is set up throughout the circuit almost at the speed of light.", a: 0, e: "Electrons everywhere in the wire start drifting at the same time." },
      { t: "num", q: "A cell of emf 12 V and internal resistance 0.5 Ω is connected to a 5.5 Ω resistor. Find the current and the terminal voltage.", s: "I = ε/(R + r) = 12/6 = 2 A. V = ε − Ir = 12 − 2 × 0.5", ans: "I = 2 A, V = 11 V" },
      { t: "num", q: "A Wheatstone bridge is balanced with P = 10 Ω, Q = 20 Ω, R = 15 Ω. Find S.", s: "P/Q = R/S ⇒ S = QR/P = 20 × 15 / 10", ans: "S = 30 Ω" },
      { t: "num", q: "Three 6 Ω resistors are connected in parallel across a 12 V supply. Find the total current.", s: "1/R = 3/6 ⇒ R = 2 Ω. I = V/R = 12/2", ans: "6 A" },
      { t: "short", q: "Why does the resistance of a metal increase with temperature?", ans: "Hotter ions vibrate more, so electrons collide more often. The average time between collisions (relaxation time τ) falls, and ρ = m/(ne²τ) rises." }
    ]
  },
  {
    n: 4, title: "Moving Charges and Magnetism", unit: "Unit III · Magnetic effects of current and magnetism", marks: "Units III and IV together: 17 marks", sim: "lorentz",
    kid: [
      "In 1820 Oersted noticed a compass needle twitch near a wire carrying current. Electricity makes magnetism!",
      "A magnetic field pushes a moving charge sideways, at right angles to its motion. A sideways push can only turn it, never speed it up. So charges in a magnetic field go round in circles.",
      "Coil a wire into a spring shape (a solenoid) and pass current: you have an electromagnet. MRI machines and electric motors are built on this."
    ],
    space: "Earth's magnetic field grabs charged particles from the Sun and makes them spiral along field lines towards the poles, trapping many in the Van Allen belts. Without this shield, the solar wind would slowly strip our atmosphere.",
    formulas: [["F = q(v × B),  F = qvB sin θ", "Lorentz magnetic force"], ["r = mv / qB,  T = 2πm / qB", "circular motion in a field"], ["dB = (μ₀/4π) I dl sin θ / r²", "Biot–Savart law"], ["B = μ₀I / 2R", "centre of a circular loop"], ["B = μ₀I / 2πr", "long straight wire"], ["B = μ₀nI", "long solenoid"], ["F/L = μ₀I₁I₂ / 2πd", "force between parallel wires"], ["τ = NIAB sin θ", "torque on a coil"]],
    qs: [
      { t: "mcq", q: "The work done by a magnetic field on a moving charge is", o: ["always positive", "always zero", "negative", "depends on speed"], a: 1, e: "The force is perpendicular to velocity, so F·v = 0 and no work is done." },
      { t: "mcq", q: "Two long parallel wires carry currents in the same direction. They", o: ["attract", "repel", "do not interact", "rotate"], a: 0, e: "Like currents attract, unlike currents repel (the opposite of charges!)." },
      { t: "mcq", q: "A charged particle enters a magnetic field moving parallel to it. Its path is", o: ["circle", "helix", "straight line", "parabola"], a: 2, e: "θ = 0, so F = qvB sin 0 = 0." },
      { t: "ar", A: "A magnetic field cannot change the speed of a charged particle.", R: "The magnetic force is always perpendicular to the velocity.", a: 0, e: "A perpendicular force changes direction only." },
      { t: "num", q: "A proton moves at 3 × 10⁶ m/s perpendicular to a 0.5 T field. Find the radius of its path. (m = 1.67 × 10⁻²⁷ kg)", s: "r = mv/qB = (1.67 × 10⁻²⁷ × 3 × 10⁶)/(1.6 × 10⁻¹⁹ × 0.5)", ans: "≈ 0.063 m, about 6.3 cm" },
      { t: "num", q: "A solenoid has 1000 turns per metre and carries 2 A. Find B inside.", s: "B = μ₀nI = (4π × 10⁻⁷)(1000)(2)", ans: "2.5 × 10⁻³ T" },
      { t: "num", q: "Find B at the centre of a circular loop of radius 10 cm carrying 5 A.", s: "B = μ₀I/2R = (4π × 10⁻⁷ × 5)/(0.2)", ans: "3.14 × 10⁻⁵ T" },
      { t: "short", q: "How is a galvanometer converted into (a) an ammeter (b) a voltmeter?", ans: "(a) Connect a small resistance (shunt) in parallel, so most current bypasses it. (b) Connect a large resistance in series, so it draws very little current." }
    ]
  },
  {
    n: 5, title: "Magnetism and Matter", unit: "Unit III · Magnetic effects of current and magnetism", marks: "Units III and IV together: 17 marks", sim: "magmat",
    kid: [
      "A bar magnet behaves exactly like a solenoid carrying current. Inside every magnet, countless spinning electrons act like tiny current loops.",
      "Magnetic field lines always form closed loops. Cut a magnet in half and you get two smaller magnets, never a lone north pole. A single 'monopole' has never been found.",
      "Materials react differently. Iron is grabbed strongly (ferromagnetic). Aluminium is pulled weakly (paramagnetic). Water and even your body are weakly pushed away (diamagnetic)."
    ],
    space: "Neutron stars called magnetars have the strongest magnetic fields known, around a thousand trillion times Earth's field.",
    formulas: [["m = NIA", "magnetic moment of a loop"], ["τ = m × B", "torque on a magnetic dipole"], ["U = −mB cos θ", "energy of a dipole in a field"], ["B = μ₀(H + M),  χ = M/H", "magnetisation and susceptibility"], ["μ_r = 1 + χ", "relative permeability"]],
    qs: [
      { t: "mcq", q: "Magnetic field lines", o: ["start at N and end at S", "form closed continuous loops", "can intersect", "exist only outside the magnet"], a: 1, e: "Inside the magnet they run S to N, completing the loop." },
      { t: "mcq", q: "A diamagnetic material placed in a magnetic field is", o: ["strongly attracted", "weakly attracted", "weakly repelled", "unaffected"], a: 2, e: "Its susceptibility is small and negative. A strong enough magnet has levitated a live frog this way!" },
      { t: "mcq", q: "Above its Curie temperature a ferromagnet becomes", o: ["diamagnetic", "paramagnetic", "superconducting", "stronger"], a: 1, e: "Heat scrambles the aligned domains. For iron this is about 770 °C." },
      { t: "mcq", q: "The magnetic susceptibility of a superconductor is", o: ["0", "+1", "−1", "infinite"], a: 2, e: "It is a perfect diamagnet and expels the field completely (Meissner effect)." },
      { t: "ar", A: "A freely suspended bar magnet comes to rest roughly along north-south.", R: "Earth behaves like a huge magnet.", a: 0, e: "The magnet aligns with Earth's magnetic field." },
      { t: "num", q: "A bar magnet of moment 0.5 A m² is placed at 30° to a uniform field of 0.2 T. Find the torque.", s: "τ = mB sin θ = 0.5 × 0.2 × sin 30°", ans: "0.05 N m" },
      { t: "num", q: "How much work is needed to turn that magnet (m = 0.5 A m², B = 0.2 T) from aligned (0°) to opposite (180°)?", s: "W = U₁₈₀ − U₀ = (+mB) − (−mB) = 2mB", ans: "0.2 J" }
    ]
  },
  {
    n: 6, title: "Electromagnetic Induction", unit: "Unit IV · EMI and alternating currents", marks: "Units III and IV together: 17 marks", sim: "emi",
    kid: [
      "Faraday flipped Oersted's idea: if electricity makes magnetism, can magnetism make electricity? Yes, but only when the magnetic field through a coil is CHANGING. A still magnet does nothing.",
      "Lenz's law is nature being stubborn: the induced current always fights the change that made it. Push a magnet in, the coil pushes back. That is energy conservation in action.",
      "Every power station, from coal to hydro to nuclear, spins a coil in a magnetic field to make your electricity."
    ],
    space: "Jupiter's moon Io moves through Jupiter's huge magnetic field and generates a current of millions of amperes that flows between them.",
    formulas: [["Φ = BA cos θ", "magnetic flux"], ["ε = −N dΦ/dt", "Faraday's law with Lenz's sign"], ["ε = Blv", "motional emf of a rod"], ["ε = −L dI/dt", "self-induction"], ["L = μ₀N²A / l", "inductance of a solenoid"], ["U = ½LI²", "energy in an inductor"], ["ε = NBAω sin ωt", "AC generator"]],
    qs: [
      { t: "mcq", q: "Lenz's law is a consequence of conservation of", o: ["charge", "energy", "momentum", "mass"], a: 1, e: "If the induced current helped the change, you would get energy from nothing." },
      { t: "mcq", q: "A 1 m rod moves at 5 m/s perpendicular to a 0.4 T field. The induced emf is", o: ["0.2 V", "2 V", "5 V", "20 V"], a: 1, e: "ε = Blv = 0.4 × 1 × 5 = 2 V." },
      { t: "mcq", q: "The SI unit of inductance is", o: ["weber", "tesla", "henry", "farad"], a: 2, e: "1 H = 1 V s/A." },
      { t: "ar", A: "A magnet dropped through a vertical copper tube falls much more slowly than normal.", R: "Currents induced in the tube oppose the motion of the magnet.", a: 0, e: "Lenz's law: the induced currents create a field that brakes the falling magnet." },
      { t: "num", q: "The flux through each turn of a 100-turn coil falls from 5 mWb to zero in 0.1 s. Find the average induced emf.", s: "ε = NΔΦ/Δt = 100 × 0.005 / 0.1", ans: "5 V" },
      { t: "num", q: "How much energy is stored in a 2 H inductor carrying 3 A?", s: "U = ½LI² = ½ × 2 × 9", ans: "9 J" },
      { t: "short", q: "Why does a generator produce alternating current?", ans: "As the coil rotates, the flux through it is BA cos ωt. Its rate of change, and so the emf, varies as sin ωt, reversing direction every half turn." }
    ]
  },
  {
    n: 7, title: "Alternating Current", unit: "Unit IV · EMI and alternating currents", marks: "Units III and IV together: 17 marks", sim: "ac",
    kid: [
      "Household current in India swings back and forth 50 times every second. The '230 V' is an average-like value called rms. The actual peak is about 325 V.",
      "An inductor hates quick changes, so it resists high frequencies. A capacitor is the opposite: it blocks steady DC but lets fast AC through. Put them together with a resistor and you get an LCR circuit that 'rings' at one favourite frequency: resonance.",
      "Tuning a radio is exactly this: you adjust C until the circuit resonates with one station."
    ],
    space: "Radio telescopes like the GMRT near Pune use tuned circuits to pick out very faint signals at chosen frequencies from space.",
    formulas: [["I_rms = I₀ / √2,  V_rms = V₀ / √2", "rms values"], ["X_L = ωL,  X_C = 1/ωC", "reactances"], ["Z = √(R² + (X_L − X_C)²)", "impedance"], ["tan φ = (X_L − X_C)/R", "phase angle"], ["ω₀ = 1/√(LC)", "resonance"], ["P = V_rms I_rms cos φ", "average power"], ["V_s/V_p = N_s/N_p = I_p/I_s", "ideal transformer"]],
    qs: [
      { t: "mcq", q: "India's mains supply is 230 V rms. Its peak value is about", o: ["163 V", "230 V", "325 V", "460 V"], a: 2, e: "V₀ = √2 × 230 ≈ 325 V." },
      { t: "mcq", q: "At resonance in a series LCR circuit, the impedance is", o: ["maximum", "equal to R (minimum)", "zero", "equal to X_L + X_C"], a: 1, e: "X_L = X_C cancel, so Z = R and current is maximum." },
      { t: "mcq", q: "Average power consumed by a pure inductor over a full cycle is", o: ["maximum", "V₀I₀/2", "zero", "negative"], a: 2, e: "φ = 90°, cos φ = 0. This is called wattless current." },
      { t: "ar", A: "A capacitor lets AC pass but blocks DC.", R: "Capacitive reactance X_C = 1/ωC is infinite for DC (ω = 0).", a: 0, e: "R directly explains A." },
      { t: "num", q: "Find the reactance of a 0.1 H inductor at 50 Hz.", s: "X_L = 2πfL = 2π × 50 × 0.1", ans: "≈ 31.4 Ω" },
      { t: "num", q: "A step-down transformer converts 220 V to 11 V. The primary has 2000 turns. How many turns does the secondary have?", s: "N_s = N_p × V_s/V_p = 2000 × 11/220", ans: "100 turns" },
      { t: "num", q: "Find the resonant frequency of a circuit with L = 1 mH and C = 1 μF.", s: "ω₀ = 1/√(LC) = 1/√(10⁻⁹) ≈ 31,623 rad/s; f₀ = ω₀/2π", ans: "≈ 5.0 kHz" }
    ]
  },
  {
    n: 8, title: "Electromagnetic Waves", unit: "Unit V · Electromagnetic waves", marks: "Units V and VI together: 18 marks", sim: "emspec",
    kid: [
      "Maxwell realised a changing electric field makes a magnetic field, and a changing magnetic field makes an electric field. They can keep creating each other and fly off through empty space as a wave.",
      "He calculated its speed and got the speed of light. Light IS an electromagnetic wave! So are radio, microwaves, X-rays and more. They differ only in wavelength.",
      "Your eyes see only a tiny slice, from about 400 nm (violet) to 700 nm (red). Astronomers build telescopes for every other slice."
    ],
    space: "The James Webb Space Telescope sees in infrared because the light from the first galaxies has been stretched by the expanding universe from visible into infrared.",
    formulas: [["c = 1/√(μ₀ε₀) ≈ 3 × 10⁸ m/s", "speed of light"], ["c = fλ", "wave relation"], ["E₀ / B₀ = c", "field amplitudes"], ["i_d = ε₀ dΦ_E/dt", "displacement current"]],
    qs: [
      { t: "mcq", q: "Electromagnetic waves are produced by", o: ["charges at rest", "charges moving at constant velocity", "accelerating charges", "neutral particles"], a: 2, e: "Only accelerating (or oscillating) charges radiate." },
      { t: "mcq", q: "In an EM wave, E and B are", o: ["parallel", "perpendicular to each other and to the direction of travel", "along the direction of travel", "90° out of phase"], a: 1, e: "EM waves are transverse, and E and B oscillate in phase." },
      { t: "mcq", q: "The TV remote control uses", o: ["microwaves", "infrared", "ultraviolet", "X-rays"], a: 1, e: "An infrared LED blinks a code at the TV." },
      { t: "mcq", q: "The ozone layer protects us mainly by absorbing", o: ["infrared", "visible light", "ultraviolet", "radio waves"], a: 2, e: "UV damages DNA. Ozone absorbs most of it." },
      { t: "ar", A: "X-ray telescopes are launched into space.", R: "Earth's atmosphere absorbs X-rays.", a: 0, e: "That is why Chandra and India's AstroSat work from orbit." },
      { t: "num", q: "Cold hydrogen gas in space emits radio waves of wavelength 21 cm. Find their frequency.", s: "f = c/λ = 3 × 10⁸ / 0.21", ans: "≈ 1.43 × 10⁹ Hz (1420 MHz). Radio astronomers map the whole Milky Way with this line" },
      { t: "num", q: "An EM wave has electric field amplitude 60 V/m. Find the magnetic field amplitude.", s: "B₀ = E₀/c = 60 / (3 × 10⁸)", ans: "2 × 10⁻⁷ T" },
      { t: "short", q: "Why did Maxwell need 'displacement current'?", ans: "Between capacitor plates no charge flows, yet a magnetic field exists there. The changing electric field acts like a current (ε₀ dΦ_E/dt), keeping Ampère's law consistent. This term is what predicts EM waves." }
    ]
  },
  {
    n: 9, title: "Ray Optics and Optical Instruments", unit: "Unit VI · Optics", marks: "Units V and VI together: 18 marks", sim: "lens",
    kid: [
      "Light travels in straight lines until it hits something. Mirrors bounce it back. Lenses bend it, because light slows down in glass.",
      "If light tries to leave glass or water at too steep an angle, it cannot get out and reflects back completely. This is total internal reflection. It makes diamonds sparkle and carries internet data through optical fibres.",
      "A telescope uses one lens (or mirror) to collect a lot of light and form an image, and a second lens (the eyepiece) to magnify that image."
    ],
    space: "Newton invented the reflecting telescope in 1668 to avoid the rainbow blurring of lenses. Every giant telescope today, including JWST, uses mirrors.",
    formulas: [["1/v + 1/u = 1/f,  f = R/2", "mirror formula"], ["n₁ sin i = n₂ sin r", "Snell's law"], ["sin c = 1/n", "critical angle"], ["1/v − 1/u = 1/f", "lens formula"], ["1/f = (n − 1)(1/R₁ − 1/R₂)", "lens maker's formula"], ["P = 1/f (m)", "power in dioptre"], ["m = f_o/f_e,  L = f_o + f_e", "telescope, normal adjustment"], ["n = sin((A + D_m)/2) / sin(A/2)", "prism"]],
    qs: [
      { t: "mcq", q: "Diamonds sparkle mainly because of", o: ["dispersion only", "total internal reflection", "diffraction", "polarisation"], a: 1, e: "Diamond's refractive index is 2.42, so its critical angle is only about 24°. Light gets trapped and bounces around inside." },
      { t: "mcq", q: "The power of a convex lens of focal length 25 cm is", o: ["+0.25 D", "+4 D", "−4 D", "+25 D"], a: 1, e: "P = 1/f = 1/0.25 m = +4 D." },
      { t: "mcq", q: "An object is placed at 2F of a convex lens. The image is", o: ["at F, diminished", "at 2F, same size, real, inverted", "at infinity", "virtual and magnified"], a: 1, e: "Try it in the experiment: set u = 2f." },
      { t: "ar", A: "A glass rod dipped in water appears bent at the surface.", R: "Light changes direction when it passes between media of different refractive index.", a: 0, e: "Refraction at the water surface shifts where the underwater part appears." },
      { t: "num", q: "An object is 25 cm in front of a concave mirror of focal length 15 cm. Find the image position and magnification.", s: "u = −25, f = −15. 1/v = 1/f − 1/u = −1/15 + 1/25 = −2/75 ⇒ v = −37.5 cm. m = −v/u = −(−37.5)/(−25)", ans: "v = −37.5 cm (real, in front), m = −1.5 (inverted, magnified)" },
      { t: "num", q: "Find the critical angle for glass of refractive index 1.5.", s: "sin c = 1/n = 1/1.5 = 0.667", ans: "c ≈ 41.8°" },
      { t: "num", q: "A telescope has objective f₀ = 100 cm and eyepiece fₑ = 5 cm. Find its magnifying power and length in normal adjustment.", s: "m = f₀/fₑ = 100/5; L = f₀ + fₑ", ans: "m = 20, L = 105 cm" },
      { t: "case", p: "Astronomers want to see faint, distant galaxies. A telescope's objective gathers light, and the amount gathered depends on its area. Its ability to separate two close stars (resolving power) also improves with a larger objective, because the smallest angle it can resolve is about 1.22λ/D. Large modern telescopes use mirrors instead of lenses.", parts: [
        { q: "If the objective diameter doubles, light gathered becomes", o: ["2 times", "4 times", "8 times", "half"], a: 1, e: "Area ∝ D², so 2² = 4." },
        { q: "The smallest resolvable angle when D doubles", o: ["doubles", "halves", "stays the same", "becomes 4 times"], a: 1, e: "θ ≈ 1.22λ/D, so θ halves: finer detail." },
        { q: "One reason mirrors are preferred to lenses in big telescopes:", o: ["mirrors are transparent", "mirrors show no chromatic aberration", "mirrors magnify more", "lenses cannot focus"], a: 1, e: "All colours reflect the same way. A mirror can also be supported from behind." },
        { q: "The magnifying power of a telescope in normal adjustment is", o: ["f₀ × fₑ", "f₀/fₑ", "fₑ/f₀", "f₀ + fₑ"], a: 1, e: "A long-focus objective and short-focus eyepiece give high magnification." }
      ] }
    ]
  },
  {
    n: 10, title: "Wave Optics", unit: "Unit VI · Optics", marks: "Units V and VI together: 18 marks", sim: "ydse",
    kid: [
      "Is light a stream of particles or a wave? In 1801 Thomas Young shone light through two thin slits and saw bright and dark stripes. Particles cannot do that. Waves can!",
      "Where crest meets crest the light gets brighter. Where crest meets trough it cancels to darkness. This is interference.",
      "Light also spreads a little around edges (diffraction) and can be filtered to vibrate in one direction only (polarisation). Polarised sunglasses cut glare this way."
    ],
    space: "Radio telescopes around the world combine their signals using interference. The Event Horizon Telescope did this with dishes across Earth to photograph a black hole.",
    formulas: [["Path difference = nλ (bright),  (n + ½)λ (dark)", "interference conditions"], ["β = λD / d", "fringe width in Young's experiment"], ["a sin θ = nλ", "single-slit minima"], ["I = I₀ cos²θ", "Malus's law"], ["θ ≈ 1.22λ / D", "resolving limit"]],
    qs: [
      { t: "mcq", q: "In Young's experiment, if the slit separation d is doubled, the fringe width", o: ["doubles", "halves", "stays the same", "becomes 4 times"], a: 1, e: "β = λD/d." },
      { t: "mcq", q: "Polarisation of light proves that light is", o: ["longitudinal", "transverse", "a particle", "a sound wave"], a: 1, e: "Only transverse waves have a vibration direction that can be filtered." },
      { t: "mcq", q: "Two sources are coherent if they have", o: ["same amplitude", "a constant phase difference", "different frequencies", "same intensity"], a: 1, e: "Sustained interference needs a fixed phase relationship." },
      { t: "ar", A: "With white light in Young's experiment, the central fringe is white and the others are coloured.", R: "Fringe width depends on wavelength.", a: 0, e: "At the centre all colours have zero path difference. Away from it, each colour's fringes are spaced differently." },
      { t: "num", q: "In Young's experiment λ = 600 nm, d = 0.5 mm and D = 1 m. Find the fringe width.", s: "β = λD/d = (600 × 10⁻⁹ × 1)/(0.5 × 10⁻³)", ans: "1.2 × 10⁻³ m = 1.2 mm" },
      { t: "num", q: "Unpolarised light of intensity I₀ passes through a polariser and then an analyser at 60° to it. Find the final intensity.", s: "After the polariser: I₀/2. After the analyser: (I₀/2) cos² 60° = (I₀/2)(1/4)", ans: "I₀/8" },
      { t: "short", q: "Why don't two torches shining on a wall show interference?", ans: "They are not coherent. Their phases change randomly millions of times a second, so the pattern shifts too fast to see and averages out." }
    ]
  },
  {
    n: 11, title: "Dual Nature of Radiation and Matter", unit: "Unit VII · Dual nature", marks: "Units VII and VIII together: 12 marks", sim: "photo",
    kid: [
      "Shine ultraviolet light on some metals and electrons pop out. Weird detail: dim UV works, but blinding red light never does, however bright.",
      "Einstein explained it in 1905: light comes in packets called photons. Each photon's energy depends on its colour (E = hf). One photon kicks one electron. A red photon simply does not have enough energy, no matter how many of them arrive.",
      "Then de Broglie said: if waves can act like particles, particles can act like waves. Electrons really do diffract! Electron microscopes use this."
    ],
    space: "Solar panels on satellites and on Aditya-L1 turn sunlight into electricity, one photon at a time.",
    formulas: [["E = hf = hc/λ", "photon energy"], ["hc ≈ 1240 eV nm", "handy shortcut"], ["K_max = hf − φ₀", "Einstein's photoelectric equation"], ["eV₀ = K_max", "stopping potential"], ["φ₀ = hf₀", "threshold frequency"], ["λ = h/p = h/mv", "de Broglie wavelength"], ["λ = 1.227/√V nm", "electron accelerated through V volts"]],
    qs: [
      { t: "mcq", q: "The stopping potential in the photoelectric effect depends on", o: ["intensity of light", "frequency of light", "area of the plate", "time of exposure"], a: 1, e: "eV₀ = hf − φ. Intensity changes the number of electrons only." },
      { t: "mcq", q: "Above the threshold frequency, increasing the intensity increases", o: ["maximum KE", "stopping potential", "photocurrent", "work function"], a: 2, e: "More photons per second eject more electrons per second." },
      { t: "mcq", q: "If a particle's momentum is halved, its de Broglie wavelength", o: ["halves", "doubles", "stays same", "becomes 4 times"], a: 1, e: "λ = h/p." },
      { t: "ar", A: "Photoelectric emission starts with no measurable time delay.", R: "Energy is delivered in photons, each absorbed by one electron at once.", a: 0, e: "A wave picture would predict a delay while energy builds up." },
      { t: "num", q: "Find the energy of a photon of wavelength 500 nm, in eV.", s: "E = hc/λ = 1240 eV nm / 500 nm", ans: "2.48 eV" },
      { t: "num", q: "Light of photon energy 3.5 eV falls on a metal with work function 2 eV. Find the maximum KE and the stopping potential.", s: "K_max = 3.5 − 2 = 1.5 eV. V₀ = K_max/e", ans: "1.5 eV and 1.5 V" },
      { t: "num", q: "Find the de Broglie wavelength of an electron accelerated through 100 V.", s: "λ = 1.227/√100 nm", ans: "≈ 0.123 nm, similar to the spacing of atoms in a crystal" }
    ]
  },
  {
    n: 12, title: "Atoms", unit: "Unit VIII · Atoms and nuclei", marks: "Units VII and VIII together: 12 marks", sim: "bohr",
    kid: [
      "Rutherford fired alpha particles at thin gold foil. Almost all went straight through, but a few bounced back 'like a shell bouncing off tissue paper'. Conclusion: the atom is mostly empty space with a tiny, heavy nucleus.",
      "Bohr said electrons can only live on certain 'floors', like a building with no stairs between floors. Jumping down a floor releases a photon of an exact colour.",
      "Every element has its own set of floors, so its own barcode of colours. Astronomers read these barcodes in starlight to know what stars are made of without going there."
    ],
    space: "Glowing hydrogen clouds in space shine pink-red because electrons jump from level 3 to level 2 and emit the 656 nm H-alpha line. The Orion Nebula is full of it.",
    formulas: [["r_n = 0.53 n² Å", "Bohr radius"], ["E_n = −13.6 / n² eV", "energy levels of hydrogen"], ["hf = E_i − E_f", "photon from a jump"], ["1/λ = R(1/n_f² − 1/n_i²)", "Rydberg formula, R ≈ 1.097 × 10⁷ m⁻¹"], ["mvr = nh/2π", "angular momentum is quantised"]],
    qs: [
      { t: "mcq", q: "Most alpha particles passed straight through the gold foil. This shows", o: ["the nucleus is large", "the atom is mostly empty space", "electrons are heavy", "gold is soft"], a: 1, e: "Only the rare direct hits on the tiny nucleus scattered strongly." },
      { t: "mcq", q: "The ionisation energy of hydrogen in its ground state is", o: ["3.4 eV", "10.2 eV", "13.6 eV", "1.51 eV"], a: 2, e: "From E₁ = −13.6 eV up to 0." },
      { t: "mcq", q: "The Balmer series of hydrogen lies in the", o: ["ultraviolet", "visible", "infrared", "X-ray"], a: 1, e: "Jumps ending on n = 2. Lyman (to n = 1) is UV, Paschen (to n = 3) is infrared." },
      { t: "ar", A: "Hydrogen gives a spectrum of sharp separate lines, not a continuous rainbow.", R: "Electron energy levels in an atom are quantised.", a: 0, e: "Only fixed energy differences, so only fixed wavelengths." },
      { t: "num", q: "Find the wavelength of the photon emitted when a hydrogen electron drops from n = 3 to n = 2.", s: "ΔE = 13.6(1/4 − 1/9) = 13.6 × 5/36 = 1.89 eV. λ = 1240/1.89", ans: "≈ 656 nm, red (the H-alpha line)" },
      { t: "num", q: "Find the radius of the n = 2 orbit of hydrogen.", s: "r = 0.53 × n² = 0.53 × 4", ans: "2.12 Å" },
      { t: "num", q: "What is the energy of a hydrogen electron in n = 4?", s: "E₄ = −13.6/16", ans: "−0.85 eV" }
    ]
  },
  {
    n: 13, title: "Nuclei", unit: "Unit VIII · Atoms and nuclei", marks: "Units VII and VIII together: 12 marks", sim: "binding",
    kid: [
      "The nucleus is 100,000 times smaller than the atom. Protons repel each other, so what holds them together? The strong nuclear force: super strong, but it only works at very short distances.",
      "Weigh a nucleus and it is slightly lighter than its separate protons and neutrons! The missing mass became the energy that glues it together (E = mc²). This is binding energy.",
      "Iron has the most tightly glued nucleus. Light nuclei release energy by joining (fusion, like the Sun). Heavy nuclei release energy by splitting (fission, like nuclear power plants)."
    ],
    space: "The Sun fuses about 600 million tonnes of hydrogen every second. Massive stars fuse all the way up to iron, and then they collapse, because iron cannot give any more energy.",
    formulas: [["R = R₀A^(1/3),  R₀ ≈ 1.2 fm", "nuclear radius"], ["Δm = [Zm_p + (A − Z)m_n] − M", "mass defect"], ["E_b = Δm c²,  1 u = 931.5 MeV", "binding energy"], ["E_bn = E_b / A", "binding energy per nucleon"]],
    qs: [
      { t: "mcq", q: "The density of nuclear matter", o: ["increases with A", "is roughly the same for all nuclei", "decreases with A", "is zero"], a: 1, e: "Since R³ ∝ A, density ≈ constant, about 2.3 × 10¹⁷ kg/m³." },
      { t: "mcq", q: "Nuclear force is", o: ["long-range and weak", "short-range and very strong", "only between protons", "the same as gravity"], a: 1, e: "It acts only within a few femtometres and is roughly charge-independent." },
      { t: "mcq", q: "The Sun's energy comes from", o: ["fission of uranium", "fusion of hydrogen into helium", "chemical burning", "gravitational collapse only"], a: 1, e: "Fusion in the 15-million-kelvin core." },
      { t: "ar", A: "Both fission of heavy nuclei and fusion of light nuclei release energy.", R: "In both cases, the binding energy per nucleon increases.", a: 0, e: "Both move towards the iron peak of the curve." },
      { t: "num", q: "Estimate the radius of a nucleus with A = 64. (R₀ = 1.2 fm)", s: "R = 1.2 × 64^(1/3) = 1.2 × 4", ans: "4.8 fm" },
      { t: "num", q: "A reaction has a mass defect of 0.03 u. How much energy is released?", s: "E = 0.03 × 931.5 MeV", ans: "≈ 27.9 MeV" },
      { t: "num", q: "Helium-4 has a total binding energy of 28.3 MeV. Find its binding energy per nucleon.", s: "28.3 / 4", ans: "≈ 7.07 MeV per nucleon, unusually high for such a light nucleus" }
    ]
  },
  {
    n: 14, title: "Semiconductor Electronics", unit: "Unit IX · Electronic devices", marks: "Unit IX: 7 marks", sim: "diode",
    kid: [
      "Metals conduct easily, rubber does not. Semiconductors like silicon are in between, and we can control them by adding a pinch of other atoms (doping).",
      "Add phosphorus and you get extra electrons (n-type). Add boron and you get missing electrons called holes (p-type). Join the two and you have a p-n junction diode.",
      "A diode is a one-way door for current. Every phone charger uses diodes to turn AC from the wall into DC for the battery."
    ],
    space: "Satellite solar panels are giant p-n junctions. Sunlight creates electron-hole pairs at the junction and pushes current around a circuit.",
    formulas: [["n_e n_h = n_i²", "carrier concentration"], ["Barrier ≈ 0.7 V (Si), 0.3 V (Ge)", "forward knee voltage"], ["Half-wave: output f = input f", "rectifier"], ["Full-wave: output f = 2 × input f", "rectifier"]],
    qs: [
      { t: "mcq", q: "Doping pure silicon with phosphorus makes it", o: ["p-type", "n-type", "intrinsic", "an insulator"], a: 1, e: "Phosphorus has 5 valence electrons, one extra." },
      { t: "mcq", q: "In a p-type semiconductor the majority carriers are", o: ["electrons", "holes", "protons", "ions"], a: 1, e: "Boron-type (trivalent) impurities create holes." },
      { t: "mcq", q: "In forward bias the depletion layer", o: ["widens", "narrows", "stays the same", "vanishes permanently"], a: 1, e: "The applied voltage opposes the barrier, shrinking it." },
      { t: "mcq", q: "A full-wave rectifier is fed 50 Hz AC. The output ripple frequency is", o: ["25 Hz", "50 Hz", "100 Hz", "0 Hz"], a: 2, e: "Both halves of each cycle give a pulse." },
      { t: "ar", A: "A p-n junction diode can be used as a rectifier.", R: "A diode conducts mainly in one direction.", a: 0, e: "It passes forward half-cycles and blocks reverse ones." },
      { t: "short", q: "Why is the depletion region called 'depleted'?", ans: "Near the junction, electrons from the n-side fill holes on the p-side, leaving a thin layer with almost no free charge carriers, only fixed ions." },
      { t: "case", p: "A student studies a silicon p-n junction diode used in a satellite's power circuit. In forward bias, current stays very small until about 0.7 V and then rises steeply. In reverse bias only a tiny current flows until very high voltages. The satellite's solar panels produce DC, but a test bench supplies AC that must first be rectified.", parts: [
        { q: "The knee voltage of the silicon diode is about", o: ["0.1 V", "0.3 V", "0.7 V", "5 V"], a: 2, e: "Germanium would be about 0.3 V." },
        { q: "The tiny reverse current is due to", o: ["majority carriers", "minority carriers", "photons", "protons"], a: 1, e: "Thermally generated minority carriers drift across." },
        { q: "To convert both halves of AC into DC you use", o: ["one diode half-wave", "a full-wave rectifier", "a capacitor alone", "an inductor alone"], a: 1, e: "Two diodes with a centre-tap transformer, or a bridge of four." },
        { q: "In forward bias, the p-side is connected to the battery's", o: ["negative terminal", "positive terminal", "earth", "either terminal"], a: 1, e: "Positive to p pushes holes towards the junction." }
      ] }
    ]
  }
];
