/* Organail London · Links — micro-interactions */
(function () {
  "use strict";

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* Current year */
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* Staggered reveal on load */
  var reveals = Array.prototype.slice.call(document.querySelectorAll(".reveal"));
  if (reduceMotion) {
    reveals.forEach(function (el) { el.classList.add("in"); });
  } else {
    window.requestAnimationFrame(function () {
      reveals.forEach(function (el) {
        var delay = parseInt(el.getAttribute("data-delay") || "0", 10) * 70;
        setTimeout(function () { el.classList.add("in"); }, 120 + delay);
      });
    });
  }

  var links = Array.prototype.slice.call(document.querySelectorAll(".link"));
  var isFinePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

  links.forEach(function (link) {
    /* Magnetic hover (desktop, fine pointer only) */
    if (isFinePointer && !reduceMotion) {
      link.addEventListener("mousemove", function (e) {
        var r = link.getBoundingClientRect();
        var mx = (e.clientX - r.left - r.width / 2) / r.width;
        var my = (e.clientY - r.top - r.height / 2) / r.height;
        link.style.transform =
          "translateY(-3px) translate(" + (mx * 6).toFixed(2) + "px," + (my * 4).toFixed(2) + "px)";
      });
      link.addEventListener("mouseleave", function () {
        link.style.transform = "";
      });
    }

    /* Ripple on tap/click */
    link.addEventListener("pointerdown", function (e) {
      if (reduceMotion) return;
      var r = link.getBoundingClientRect();
      var size = Math.max(r.width, r.height) * 1.4;
      var ripple = document.createElement("span");
      ripple.className = "ripple";
      ripple.style.width = ripple.style.height = size + "px";
      ripple.style.left = (e.clientX - r.left) + "px";
      ripple.style.top = (e.clientY - r.top) + "px";
      link.appendChild(ripple);
      setTimeout(function () { ripple.remove(); }, 620);
    });
  });
})();
