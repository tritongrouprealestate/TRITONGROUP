/* ============================================================
   Triton Group — Price Calculator data
   ------------------------------------------------------------
   One calculator (Price Calculator.html), many projects. Every
   project is a self-contained entry below — its own units, its
   own charges, its own GST rule, its own payment-schedule
   milestones. Nothing in Price Calculator.html is specific to
   any one project; add a new project by copying the shape of an
   existing entry into this array and it appears in the project
   switcher automatically. No rebuild step.

   Charge line-item "type" values the engine understands:
     "fixed"          — a flat rupee amount, same for every unit
     "perSqft"        — rate x the unit's SBA (built-up area)
     "perSqftByFloor" — rate x SBA, rate looked up by the unit's
                         floor number (rates object keyed by floor)
   Every charge is editable in the app regardless of type; "type"
   only decides the *default* value shown before a rep changes it.
   Set enabledByDefault:false to make a charge an opt-in toggle
   (unticked, ₹0) rather than always-on.

   Payment-schedule row "type" values:
     "fixed"            — a flat rupee amount (e.g. Booking Amount)
     "percent"          — percent x Grand Total
     "percentMinusPaid" — percent x Grand Total, minus every
                           milestone already listed above it
                           (matches "Advance ... minus Booking")
   ============================================================ */
window.PRICE_CALC_DATA = {
  projects: [
    {
      id: "sanvi",
      name: "Sanvi Aero Gardens",
      developer: "Sanvi Group",
      tagline: "Evolving Lifestyles",
      logo: "sanvi-logo.png",
      theme: { primary: "#7A1B35", primaryDark: "#5C1427", ink: "#1B1B1D" },
      contact: "+91 90366 82626",
      payee: "SANVI CONSTRUCTIONS IMPACT SANVI AERO GARDENS MAS COLL ACCOUNT",
      bankAccount: "Account No - 57500001873732, IFSC CODE - HDFC0001078",
      unitLabel: "Flat No",
      blockLabel: "Block B",
      areaLabel: "SBA — Super Built-up Area (sqft)",
      hasPlotArea: false,

  units: [
    { no:"3", floor:0, sba:720, config:"1 BHK", facing:"West Facing", status:"available" },
    { no:"7", floor:0, sba:925, config:"2 BHK", facing:"East Facing", status:"available" },
    { no:"9", floor:0, sba:925, config:"2 BHK", facing:"East Facing", status:"available" },
    { no:"12", floor:0, sba:925, config:"2 BHK", facing:"East Facing", status:"available" },
    { no:"19", floor:0, sba:625, config:"1 BHK", facing:"North Facing", status:"available" },
    { no:"20", floor:0, sba:960, config:"2 BHK", facing:"North Facing", status:"available" },
    { no:"21", floor:0, sba:625, config:"1 BHK", facing:"North Facing", status:"available" },
    { no:"120", floor:1, sba:1090, config:"2 BHK", facing:"North Facing", status:"available" },
    { no:"124", floor:1, sba:625, config:"1 BHK", facing:"West Facing", status:"available" },
    { no:"126", floor:1, sba:625, config:"1 BHK", facing:"North Facing", status:"available" },
    { no:"127", floor:1, sba:1265, config:"3 BHK", facing:"East Facing", status:"available" },
    { no:"128", floor:1, sba:625, config:"1 BHK", facing:"West Facing", status:"available" },
    { no:"130", floor:1, sba:625, config:"1 BHK", facing:"North Facing", status:"sold" },
    { no:"131", floor:1, sba:955, config:"2 BHK", facing:"West Facing", status:"available" },
    { no:"132", floor:1, sba:625, config:"1 BHK", facing:"West Facing", status:"available" },
    { no:"135", floor:1, sba:625, config:"1 BHK", facing:"West Facing", status:"available" },
    { no:"225", floor:2, sba:1085, config:"2 BHK", facing:"North Facing", status:"sold" },
    { no:"227", floor:2, sba:1265, config:"3 BHK", facing:"East Facing", status:"available" },
    { no:"228", floor:2, sba:625, config:"1 BHK", facing:"West Facing", status:"available" },
    { no:"231", floor:2, sba:1075, config:"2 BHK", facing:"West Facing", status:"available" },
    { no:"232", floor:2, sba:625, config:"1 BHK", facing:"West Facing", status:"available" },
    { no:"235", floor:2, sba:625, config:"1 BHK", facing:"West Facing", status:"sold" },
    { no:"236", floor:2, sba:1100, config:"2 BHK", facing:"North Facing", status:"available" },
    { no:"237", floor:2, sba:1395, config:"3 BHK", facing:"West Facing", status:"available" },
    { no:"238", floor:2, sba:1055, config:"2 BHK", facing:"West Facing", status:"available" },
    { no:"304", floor:3, sba:1040, config:"2 BHK", facing:"East Facing", status:"available" },
    { no:"320", floor:3, sba:1215, config:"2 BHK", facing:"North Facing", status:"available" },
    { no:"324", floor:3, sba:625, config:"1 BHK", facing:"West Facing", status:"available" },
    { no:"327", floor:3, sba:1265, config:"3 BHK", facing:"East Facing", status:"available" },
    { no:"328", floor:3, sba:625, config:"1 BHK", facing:"West Facing", status:"available" },
    { no:"337", floor:3, sba:1395, config:"3 BHK", facing:"West Facing", status:"available" },
    { no:"401", floor:4, sba:900, config:"2 BHK", facing:"South Facing", status:"available" },
    { no:"414", floor:4, sba:925, config:"2 BHK", facing:"East Facing", status:"available" },
    { no:"437", floor:4, sba:1395, config:"3 BHK", facing:"West Facing", status:"available" },
    { no:"501", floor:5, sba:900, config:"2 BHK", facing:"South Facing", status:"available" },
    { no:"524", floor:5, sba:625, config:"1 BHK", facing:"West Facing", status:"available" },
    { no:"531", floor:5, sba:1075, config:"2 BHK", facing:"West Facing", status:"available" },
    { no:"601", floor:6, sba:900, config:"2 BHK", facing:"South Facing", status:"available" },
    { no:"603", floor:6, sba:790, config:"1 BHK", facing:"West Facing", status:"available" },
    { no:"613", floor:6, sba:925, config:"2 BHK", facing:"East Facing", status:"available" },
    { no:"614", floor:6, sba:925, config:"2 BHK", facing:"East Facing", status:"available" },
    { no:"616", floor:6, sba:925, config:"2 BHK", facing:"East Facing", status:"available" },
    { no:"624", floor:6, sba:625, config:"1 BHK", facing:"West Facing", status:"available" },
    { no:"637", floor:6, sba:1395, config:"3 BHK", facing:"West Facing", status:"available" }
  ],

      /* Flat 120's config is shown as "2 BHK" (from the Availability sheet).
         Its own master list (Sheet3) called it "3 BHK", and at 1,090 sqft it
         doesn't match any named type on the official Price List either
         (925 / 1,040 / 1,075 / 1,215 for 2 BHK; 1,265 / 1,395 for 3 BHK) —
         flagged for the sales team to confirm; editable in the app regardless. */

      ratePerSqft: 8999,

      charges: [
        { id: "carParking", label: "Car Parking", type: "fixed", default: 300000 },
        { id: "floorRise", label: "Floor Rise Charges", type: "perSqftByFloor",
          rates: { "4": 50, "5": 100, "6": 150 },
          note: "₹50/sqft (4th floor), ₹100/sqft (5th floor), ₹150/sqft (6th floor) only" },
        { id: "amenities", label: "Amenities Charges", type: "fixed", default: 200000 },
        { id: "keb", label: "KEB (Electricity)", type: "perSqft", rate: 200,
          note: "₹200/- per sqft" },
        { id: "legal", label: "Legal Charges", type: "fixed", default: 25000 },
        { id: "plc", label: "Preferential Location Charge (PLC)", type: "perSqft", rate: 100,
          enabledByDefault: false,
          note: "₹100/sqft for North, East & Corner-facing units — printed as a footnote on the original sheet but never actually charged; off by default here, tick to apply it" }
      ],

      gstPercent: 5,
      gstBase: ["basePrice", "otherCharges"],

      paymentSchedule: [
        { label: "Booking Amount", type: "fixed", amount: 100000 },
        { label: "Advance (15 days from Booking Date)", type: "percentMinusPaid", percent: 20 },
        { label: "On Completion of Footings", type: "percent", percent: 15 },
        { label: "On Completion of Ground Floor Slab", type: "percent", percent: 15 },
        { label: "On Completion of Second Floor Slab", type: "percent", percent: 15 },
        { label: "On Completion of 4th Floor Slab", type: "percent", percent: 15 },
        { label: "On Completion of 6th Floor Slab", type: "percent", percent: 5 },
        { label: "On Completion of Bricks & Plastering", type: "percent", percent: 5 },
        { label: "On Completion of Flooring & Tilings", type: "percent", percent: 5 },
        { label: "On Possession Day", type: "percent", percent: 5 }
      ],

      notes: [
        "The given price is valid for one week only.",
        "All payments (DD/Cheque/Online transfer) should be in favour of “SANVI CONSTRUCTIONS IMPACT SANVI AERO GARDENS MAS COLL ACCOUNT”, Account No - 57500001873732, IFSC CODE - HDFC0001078.",
        "E-stamp, stamp duty charges towards the agreement, registration and service charge at the time of registration will be borne by the purchaser.",
        "BWSSB charges will be applicable as per govt norms.",
        "Floor rise charges: 4th Flr ₹50/sqft, 5th Flr ₹100/sqft & 6th Flr ₹150/sqft.",
        "One-time corpus deposit will be collected before registration on demand.",
        "1 year maintenance will be collected in advance before registration on demand.",
        "Sanvi Group reserves the right to withdraw or change the offer, prices & availability of units without prior notice.",
        "E & OE. Contact: +91 90366 82626"
      ]
    },

    {
      id: "hummingvalley",
      name: "Triton Humming Valley",
      developer: "Triton Group",
      tagline: "",
      logo: null,
      theme: { primary: "#8A6D1E", primaryDark: "#6B5417", ink: "#0E1512" },
      contact: "",
      payee: "TRITON HOMES LLP",
      bankAccount: "Account No - 10209499009 - IFSC CODE : IDFB0080179 IDFC First Bank",
      unitLabel: "Villa No",
      blockLabel: "",
      areaLabel: "SBU — Super Built-up Area (sqft)",
      hasPlotArea: true,
      plotAreaLabel: "Plot Area (sqft)",

      /* Live source of truth for this project's unit list — opened via the
         Reference Sheet tab's "Open Live Sheet" link. This session's network
         policy blocks docs.google.com outright, so nothing here was fetched
         from it; whoever maintains the sheet should keep this array in sync
         by hand until an online sync mechanism exists. */
      referenceSheetUrl: "https://docs.google.com/spreadsheets/d/13T_4bnqwi3Ewt8GFwd1hpdLye9K_-oxrANtJ8sPgYRQ/edit?gid=0#gid=0",

      /* Five villas confirmed available: 8, 11, 20, 22, 23. Facing is each
         villa's "Aspect" wording from its reference card (e.g. "Central
         row"), not a compass direction — Humming Valley's cards didn't give
         one. Villa 8's plot size wasn't given on its card either (its
         Plot field is TBD below). These "all-inclusive" headline prices
         from the reference cards (₹2.9–4.5 Cr) are marketing figures, not
         the same number this calculator computes bottom-up from rate +
         charges + GST — expect the two not to match exactly, by design.
         Villa 21 (4 BHK+HT, 3,474 sqft, rate ₹8,750/sqft) was the one
         example used to work out the charges/GST/payment-schedule rules
         below — it is not one of the five confirmed-available villas, so
         it isn't listed as a unit, but its numbers already shaped the
         pricing model every villa here uses. */
      units: [
        { no: "8",  floor: null, sba: 2660, plotArea: null, config: "3 BHK", facing: "North row", status: "available" },
        { no: "11", floor: null, sba: 4448, plotArea: 1555, config: "5 BHK", facing: "Central row", status: "available" },
        { no: "20", floor: null, sba: 3724, plotArea: 1389, config: "4 BHK", facing: "Central row", status: "available" },
        { no: "22", floor: null, sba: 2680, plotArea: 1080, config: "3 BHK", facing: "South row, clubhouse side", status: "available" },
        { no: "23", floor: null, sba: 2680, plotArea: 1080, config: "3 BHK", facing: "South row, clubhouse side", status: "available" }
      ],

      ratePerSqft: 8750,

      charges: [
        { id: "clubhouse", label: "Recreation / Club House Charges", type: "fixed", default: 500000 },
        { id: "keb", label: "KEB (Electricity)", type: "perSqft", rate: 150, note: "₹150/- per sqft" },
        { id: "legal", label: "Legal Charges", type: "fixed", default: 25000 },
        { id: "plc", label: "PLC Charges", type: "perSqft", rate: 500, enabledByDefault: true,
          note: "₹500/sqft — unlike Sanvi, Humming Valley's reference sheet applies this by default" },
        { id: "jacuzzi", label: "Jacuzzi", type: "fixed", default: 800000 },
        { id: "dgBackup", label: "DG Backup / Generator Charges", type: "fixed", default: 154000 }
      ],

      gstPercent: 5,
      gstBase: ["basePrice"],

      paymentSchedule: [
        { label: "Booking Amount", type: "fixed", amount: 500000 },
        { label: "Agreement (15 days from Booking Date)", type: "percentMinusPaid", percent: 20 },
        { label: "On Land Registration", type: "percent", percent: 40 },
        { label: "On Completion of Plinth", type: "percent", percent: 5 },
        { label: "On Completion up to Ground Floor Slab", type: "percent", percent: 10 },
        { label: "On Completion up to 1st Floor Slab", type: "percent", percent: 10 },
        { label: "On Completion of 2nd Floor Slab", type: "percent", percent: 5 },
        { label: "On Completion of Flooring & Painting", type: "percent", percent: 5 },
        { label: "On Possession Day", type: "percent", percent: 5 }
      ],

      notes: [
        "The above computation is for reference only. The actual allocation between the Land and BUA components shall be as per the agreements.",
        "The prices above are subject to revisions. Any other taxes or escalation in the prices shall be borne by the Purchaser.",
        "All payments (DD/Cheque/Online transfer) should be in favour of “TRITON HOMES LLP”, Account No - 10209499009, IFSC CODE - IDFB0080179, IDFC First Bank.",
        "Registration charges and stamp duty are payable on actuals as per the guidance value or agreement value, whichever is higher.",
        "Triton Homes reserves the right to withdraw the offer without prior notice. Prices are subject to change.",
        "Cancellation policy: the following amount shall be forfeited in case of cancellation due to any reason other than legal title of the property — before signing of agreement: ₹50,000/-; after signing of agreement: 10% of the sale consideration. No interest shall be payable by Triton on the amount received."
      ]
    }
  ]
};
