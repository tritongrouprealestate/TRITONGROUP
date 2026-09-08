/* ============================================================
   PORTAL DATA
   ------------------------------------------------------------
   `label` is what the portal shows.  `name` is the fixed filename
   on disk.  Replace the file, keep the name — nothing else to do.

   Wording below (tagline / location / tag) is yours to edit.
   ============================================================ */
window.PORTAL_DATA = {

  brand: {
    name: "Triton Group",
    root: "Sales Kit",
    logo: "Sales Kit/_Portal/logo.png",
    hero: {
      wordA: "TRITON",
      wordB: "GROUP",
      date:  "Sales Deck · Kit",
      cue:   "Scroll to expand",
      video:  "Sales Kit/_Portal/hero.mp4",
      poster: "Sales Kit/_Portal/hero-poster.jpg",
      bg:     "Sales Kit/_Portal/hero-bg.jpg"
    }
  },

  /* --- BEGIN GENERATED PROJECTS --- */
  projects: [
    {
      id: "sanvi",
      name: "Sanvi",
      location: "Sanvi Aero Gardens · Near Bengaluru Airport",
      tagline: "1, 2 & 3 BHK luxury apartments. Full pitch kit: brochure, live pricing, availability and the project film.",
      tag: "Residential",
      cover: "Sales Kit/Sanvi/cover.jpg",
      accent: "linear-gradient(155deg,#6d8399,#3b4a5c 55%,#8a7a52)",
      folders: [
        { id: "brochure", name: "Brochure", files: [
          { label: "Brochure",            name: "Brochure.pdf" },
          { label: "Presentation Deck",   name: "Presentation.pptx" } ] },
        { id: "cost-sheet", name: "Cost Sheet", files: [
          { label: "Cost Sheet",          name: "Cost Sheet.png" },
          { label: "Price List",          name: "Price List.xlsx" } ] },
        { id: "availability-sheet", name: "Availability Sheet", files: [
          { label: "Availability",        name: "Availability.xlsx" } ] },
        { id: "comparison-sheet", name: "Comparison Sheet", files: [
          { label: "Competitor Comparison", name: "Comparison.xlsx" } ] },
        { id: "location-advantage", name: "Location Advantage", files: [
          { label: "Location Advantage",  name: "Location Advantage.html" } ] },
        { id: "video", name: "Video", files: [
          { label: "Project Walkthrough", name: "Walkthrough.mp4" } ] }
      ]
    },
    {
      id: "hummingvalley",
      name: "Hummingvalley",
      location: "Triton Humming Valley · Luxury Villas Near Nandi Hills",
      tagline: "Villa inventory near Nandi Hills. Brochure, deck, master plan and two walkthrough films.",
      tag: "Villas",
      cover: "Sales Kit/Hummingvalley/cover.jpg",
      accent: "linear-gradient(155deg,#6f8a72,#3a4a3c 55%,#7d8552)",
      /* Shown on the project page under the folders. These open on YouTube in a
         new tab — the one thing in the kit that needs an internet connection. */
      links: [
        { label: "Old Film", youtube: "1SuGJy0W7fY" },
        { label: "New Film", youtube: "85QY818IoOc" }
      ],
      folders: [
        { id: "brochure", name: "Brochure", files: [
          { label: "Brochure",            name: "Brochure.pdf" },
          { label: "Presentation Deck",   name: "Presentation.pptx" } ] },
        { id: "cost-sheet", name: "Cost Sheet", files: [
          { label: "Villa 20",            name: "Villa 20.png" },
          { label: "Villa 21",            name: "Villa 21.png" } ] },
        { id: "master-plan", name: "Master Plan", files: [
          { label: "Master Plan",         name: "Master Plan.png" } ] },
        { id: "location-advantage", name: "Location Advantage", files: [
          { label: "Location Advantage",  name: "Location Advantage.html" } ] },
        { id: "emi-calculator", name: "EMI Calculator", files: [
          { label: "Home Loan EMI Calculator", name: "EMI Calculator.html" } ] },
        { id: "video", name: "Video", files: [
          { label: "Project Walkthrough", name: "Walkthrough.mp4" },
          { label: "AV Film",             name: "AV Film.mp4" } ] }
      ]
    },
    {
      id: "triton-branded",
      name: "Triton Branded",
      location: "Corporate · Brand-level collateral",
      tagline: "Company-level material that is not tied to a single project. Main brochure and sales forms.",
      tag: "Corporate",
      cover: "Sales Kit/Triton Branded/cover.jpg",
      accent: "linear-gradient(155deg,#9a8358,#4d4331 55%,#5c5a63)",
      folders: [
        { id: "general", name: "General", files: [
          { label: "Main Brochure",       name: "Main Brochure.pdf" },
          { label: "Sales Feedback Form", name: "Feedback Form.pdf" } ] }
      ]
    }
  ]
  /* --- END GENERATED PROJECTS --- */
};

/* Fill in each file's full path from its project + folder + name, so the
   manifest above stays readable and the paths can never drift out of sync. */
(function (D) {
  var root = (D.brand && D.brand.root) || 'Sales Kit';
  function link(l) {
    l.url   = 'https://www.youtube.com/watch?v=' + l.youtube;
    l.thumb = root + '/_Portal/thumbs/' + l.youtube + '.jpg';
    l.name  = l.name || l.label;
  }
  D.projects.forEach(function (p) {
    (p.links || []).forEach(link);
    (p.folders || []).forEach(function (f) {
      (f.files || []).forEach(function (file) {
        file.path = file.path || [root, p.name, f.name, file.name].join('/');
        file.label = file.label || file.name;
      });
    });
  });
})(window.PORTAL_DATA);
