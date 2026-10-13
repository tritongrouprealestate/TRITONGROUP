/* ============================================================
   Portal-wide config — written by Sales → Settings → Sales PIN,
   never by hand. salesPinHash is a SHA-256 hex digest, not the PIN
   itself; this is a deterrent for a customer handed the device,
   not real security (anyone with a text editor can read this
   folder). setupDone stays false until a PIN is set the first time.
   ============================================================ */
window.PORTAL_CONFIG = {
  setupDone: false,
  salesPinHash: ""
};
