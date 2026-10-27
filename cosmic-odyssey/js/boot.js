/* Start the game */
(function () {
  G.renderBar();
  G.startBackground();
  document.getElementById("brand").addEventListener("click", () => {
    if (location.hash) location.hash = ""; else G.go("home");
  });
  const rb = document.getElementById("reset-btn"), rc = document.getElementById("reset-confirm");
  rb.addEventListener("click", () => { rc.hidden = false; rb.hidden = true; });
  document.getElementById("reset-no").addEventListener("click", () => { rc.hidden = true; rb.hidden = false; });
  document.getElementById("reset-yes").addEventListener("click", G.reset);
  G.go(location.hash.slice(1) || "home");
})();
