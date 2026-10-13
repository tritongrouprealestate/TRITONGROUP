/* ============================================================
   Portal-wide config — written by Marketing → Settings → PINs,
   never by hand. The hashes are SHA-256 hex digests, not the PINs
   themselves; this is a deterrent for a customer handed the device,
   not real security (anyone with a text editor can read this
   folder). setupDone stays false until the first PIN is ever set.
   marketingPinHash unlocks everything (file manager, branding,
   folder visibility, PIN management, plus everything Sales can do).
   salesPinHash is optional and lower-privilege — unit status only —
   meant for reps, set up by Marketing once there's a reason to hand
   out a separate PIN. Leave it "" and only the Marketing PIN works.
   ============================================================ */
window.PORTAL_CONFIG = {
  setupDone: false,
  marketingPinHash: "",
  salesPinHash: ""
};
