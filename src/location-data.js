/* ============================================================
   Triton Humming Valley — neighbourhood data
   ------------------------------------------------------------
   Every distance and drive time below is taken from the project
   brochure. Nothing here is estimated. To add a place you need
   its real km and minutes — do not guess them, the sales team
   quotes these numbers to clients.

   `note` is positioning copy for the detail panel. Keep it to one
   or two sentences and keep it defensible.
   ============================================================ */
window.LOCATION_DATA = {
  project: {
    name: "Triton Humming Valley",
    sub: "Luxury villa plots · Nandi Hills, North Bengaluru"
  },

  /* Ordered as they should appear around the dial. */
  categories: [
    { id:"connectivity", name:"Airport & Connectivity", short:"Connectivity", color:"#E0C384", icon:"plane" },
    { id:"work",         name:"Work & Industry",        short:"Work",         color:"#4FB3A8", icon:"work"  },
    { id:"education",    name:"Schools & Universities", short:"Education",    color:"#8FA8D8", icon:"cap"   },
    { id:"health",       name:"Healthcare",             short:"Healthcare",   color:"#E0907F", icon:"cross" },
    { id:"retail",       name:"Retail & Leisure",       short:"Retail",       color:"#C9A6E0", icon:"bag"   },
    { id:"neighbours",   name:"Neighbouring Addresses", short:"Neighbours",   color:"#E6C6A0", icon:"home"  },
    { id:"nature",       name:"Nature & Landmarks",     short:"Nature",       color:"#86C08A", icon:"hill"  }
  ],

  places: [
    /* ---- connectivity ---- */
    { c:"connectivity", n:"Kempegowda International Airport", km:24.5, min:28,
      note:"India's third-busiest airport, and the reason North Bengaluru prices the way it does. A 28-minute run makes this a genuine weekday-commute and second-home address rather than a weekend one." },

    /* ---- work ---- */
    { c:"work", n:"Foxconn Devanahalli", km:15.1, min:26,
      note:"A large electronics manufacturing campus in the Devanahalli belt. Anchor employers of this scale are what convert farmland corridors into rental markets." },
    { c:"work", n:"Embassy Knowledge Park", km:25.6, min:34,
      note:"Part of the office and business-park cluster feeding off the airport corridor: the demand side for leased villas and long-stay tenancies." },

    /* ---- education ---- */
    { c:"education", n:"Gitanjali International School", km:2.6, min:6,
      note:"Six minutes to an international curriculum school. For families relocating, this is usually the first question and the one that closes the decision." },
    { c:"education", n:"Nagarjuna College, Management & Engineering", km:10.1, min:16,
      note:"Established higher-education campus within a quarter of an hour." },
    { c:"education", n:"BGS World School", km:11.8, min:17,
      note:"A second international-standard option inside twenty minutes, which matters: one school nearby is luck, two is a catchment." },
    { c:"education", n:"Innovators International School, Devanahalli", km:13.7, min:20,
      note:"Serves the Devanahalli and airport-corridor families; useful as a fallback catchment for resale buyers." },
    { c:"education", n:"GITAM University Bengaluru", km:16.6, min:29,
      note:"Full university campus on the northern corridor." },
    { c:"education", n:"Amity University Bengaluru", km:19.8, min:26,
      note:"A second university within half an hour. Two universities inside 30 minutes underwrites long-term rental demand independent of the IT cycle." },

    /* ---- health ---- */
    { c:"health", n:"Sri Sathya Sai Sarla Memorial Hospital", km:7.8, min:12,
      note:"The nearest hospital, twelve minutes out. For buyers purchasing with parents in mind, emergency access inside fifteen minutes is close to a hard requirement." },
    { c:"health", n:"New Manasa Hospital", km:12.2, min:18,
      note:"Second hospital option under twenty minutes." },
    { c:"health", n:"Nakshthra Hospital", km:12.4, min:18,
      note:"Part of a cluster of four hospitals inside a 13 km radius: depth of care, not a single point of failure." },
    { c:"health", n:"Shri Shirdi Sai Multispeciality Hospital", km:13, min:19,
      note:"Multispeciality care within nineteen minutes." },
    { c:"health", n:"JD Group Hospital", km:13, min:19,
      note:"Completes a four-hospital catchment reachable in under twenty minutes." },

    /* ---- retail ---- */
    { c:"retail", n:"Prestige Golfshire Club", km:5.9, min:10,
      note:"Championship golf and clubhouse ten minutes away. In this micro-market the golf course is the single strongest signal of who the neighbourhood is built for." },
    { c:"retail", n:"Prestige Forum Mall", km:22.2, min:27,
      note:"Full-format organised retail on the airport corridor for the weekly run and the weekend outing." },

    /* ---- neighbours ---- */
    { c:"neighbours", n:"Mulberry Shades", km:1, min:3,
      note:"Three minutes away. The closest branded development, proof that the immediate address is already validated by another developer's underwriting." },
    { c:"neighbours", n:"Over the Rainbow by Total Environment", km:1.3, min:3,
      note:"A premium name three minutes out. Adjacency to established brands is what protects resale pricing in an emerging corridor." },
    { c:"neighbours", n:"Divyasree Valley of the Winds", km:2.6, min:5,
      note:"Five minutes. Another institutional developer holding land in the same pocket." },
    { c:"neighbours", n:"QVC Mantri Hills", km:3.1, min:5,
      note:"Five minutes away, on the Nandi Hills approach." },
    { c:"neighbours", n:"Prestige Sanctuary", km:4.4, min:7,
      note:"Seven minutes. Five branded neighbours inside 5 km is unusual, and it is the strongest argument that this is an established address rather than a speculative one." },
    { c:"neighbours", n:"Brigade Oasis", km:12.9, min:26,
      note:"A further large-format development on the wider corridor." },

    /* ---- nature ---- */
    { c:"nature", n:"Jeeva Park", km:6.7, min:12,
      note:"Twelve minutes to open green: the everyday version of the outdoors, not the once-a-year version." },
    { c:"nature", n:"Nandi Hills Sunview Point", km:8.2, min:13,
      note:"Thirteen minutes to the sunrise point. This is the view the address is named for, and the reason the micro-climate here runs cooler than the city." },
    { c:"nature", n:"Skandagiri Trek Point", km:11.2, min:18,
      note:"Night-trek destination eighteen minutes away." },
    { c:"nature", n:"Devanahalli Fort", km:12.8, min:18,
      note:"Eighteenth-century fort and the historic core of the Devanahalli township." },
    { c:"nature", n:"Koralahalli Waterfalls", km:18.7, min:30,
      note:"Half an hour to seasonal falls." },
    { c:"nature", n:"Poshettihalli Falls & Trekking", km:25.1, min:41,
      note:"Falls and trekking trails for the longer weekend." },
    { c:"nature", n:"Isha Foundation, Chikkaballapura", km:28.2, min:41,
      note:"Meditation and wellness centre north of the project." },
    { c:"nature", n:"Kethanahalli Falls", km:29.7, min:43,
      note:"The furthest of the weekend destinations, still inside forty-five minutes." }
  ]
};

/* ============================================================
   Upcoming infrastructure & major employers — North Bangalore
   ------------------------------------------------------------
   These do NOT have a verified distance/drive-time from the
   project (no coordinates were available when this was built),
   so they are shown as a separate briefing list, not plotted on
   the distance dial. Every figure below is sourced; update the
   `source` field if you re-verify a number.
   ============================================================ */
window.INFRA_DATA = [
  { name: "Kempegowda International Airport: Terminal 2 & capacity expansion",
    tag: "Airport", stage: "In progress",
    fact: "T2 was built in two phases (25M then 45M passengers/year); the airport handled 41.88M passengers in FY 2024-25. A further expansion targets 85M+ annual capacity by 2028.",
    source: "Airport Authority / Aviation A2Z, Deccan Herald, 2025-2026 reporting" },
  { name: "Bengaluru Airport City",
    tag: "Business park", stage: "Under development",
    fact: "A 463-acre mixed-use district planned next to KIA: offices, hotels (including a 775-room hotel targeted for late 2026), retail, an arena, an Air India training school and an MRO park.",
    source: "Bengaluru Airport City / Regional Gateway, Tradebrains, 2026" },
  { name: "KIADB Aerospace Park & Aerospace SEZ",
    tag: "Industrial", stage: "Operational, expanding",
    fact: "847-acre Aerospace Park plus a 3,000-acre Aero SEZ near Devanahalli. Anchor tenants include Boeing's India campus, Airbus, Rolls-Royce, Shell, HAL and DRDO units.",
    source: "KIADB / industry press, 2025-2026" },
  { name: "Foxconn, Devanahalli manufacturing campus",
    tag: "Employer", stage: "Operational",
    fact: "iPhone assembly operations began August 2025 on a reported $2.8B investment; officials cited roughly 30,000 employees at launch with a stated target near 50,000.",
    source: "Government statements / industry press, August 2025" },
  { name: "SAP Labs Innovation Park",
    tag: "Employer", stage: "Operational",
    fact: "A 41-acre campus that opened in 2025 with an investment of about €194 million; first-phase headcount reported around 3,200 employees.",
    source: "SAP / industry press, 2025" },
  { name: "Carl Zeiss manufacturing facility",
    tag: "Employer", stage: "Under construction",
    fact: "Reported to be Zeiss's largest lens factory worldwide, a roughly ₹2,500 crore investment expected to scale to about 5,000 employees.",
    source: "Industry press, 2025-2026" },
  { name: "Namma Metro Phase 2B, Airport Line",
    tag: "Metro", stage: "Under construction",
    fact: "A roughly 37 km elevated line linking KR Puram to Kempegowda International Airport with about 17 planned stations; Phase 2 overall is targeted for mid-2026 completion.",
    source: "BMRCL / Wikipedia, Metro Rail Guy, 2025-2026" },
  { name: "NH-44 (Bellary Road) widening",
    tag: "Highway", stage: "Ongoing works",
    fact: "The primary Hebbal–Devanahalli–airport corridor is undergoing NHAI widening and junction upgrades to handle rising airport and industrial traffic.",
    source: "NHAI / regional press, 2025-2026" },
  { name: "Bengaluru Suburban Rail, Devanahalli corridor",
    tag: "Rail", stage: "Planned",
    fact: "A KSR Bengaluru–Yelahanka–Devanahalli suburban rail corridor is planned to complement the metro and road network into the airport region.",
    source: "K-RIDE / regional press, 2025-2026" }
];
