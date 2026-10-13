/* ============================================================
   Unit status overrides — written by Sales → Settings → Unit
   Status, never by hand. Layered on top of each project's own
   `units` array in price-calculator-data.js: whatever status is
   recorded here for a project id + unit number wins over what
   that array says, without ever touching that hand-authored file.
   Starts empty — every unit's status still comes from
   price-calculator-data.js until someone changes one here.
   ============================================================ */
window.STATUS_OVERRIDES = {};
