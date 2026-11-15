/* DumpsterWare — small progressive enhancements. */
(function () {
  "use strict";

  var header = document.querySelector(".site-header");

  /* Backdrop: follows the scroll, then pins in place */
  var backdrop = document.createElement("div");
  backdrop.className = "site-backdrop";
  backdrop.setAttribute("aria-hidden", "true");
  document.body.prepend(backdrop);

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var backdropStart = 0;
  var backdropDistance = 0;
  var backdropTicking = false;

  function measureBackdrop() {
    var w = window.innerWidth;
    var scale = 0.88;
    var imageAspect = 1200 / 699;
    var displayedWidth = w * scale;
    var imageHeight = displayedWidth / imageAspect;
    var headerHeight = header ? header.offsetHeight : 0;
    var isMobile = w <= 760;
    // D top = 41.0% of image height; half D width = 3.72% of image width.
    // Keep the D half a D-width below the sticky header.
    var rise = imageHeight * 0.41 - headerHeight - displayedWidth * 0.0372;
    var pin = reduceMotion || isMobile ? 0 : -rise;
    backdrop.style.height = imageHeight + "px";
    backdropStart = 0;
    backdropDistance = backdropStart - pin;
  }

  function renderBackdrop() {
    var shift = Math.min(window.scrollY, backdropDistance);
    backdrop.style.transform = "translate3d(0, " + (backdropStart - shift).toFixed(1) + "px, 0)";
    backdropTicking = false;
  }

  function requestBackdrop() {
    if (backdropTicking) return;
    backdropTicking = true;
    window.requestAnimationFrame(renderBackdrop);
  }

  measureBackdrop();
  renderBackdrop();
  window.addEventListener("scroll", requestBackdrop, { passive: true });
  window.addEventListener("resize", function () {
    measureBackdrop();
    requestBackdrop();
  });

  /* Sticky header state */
  function onScroll() {
    if (!header) return;
    header.classList.toggle("scrolled", window.scrollY > 8);
  }
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  /* Reveal on scroll */
  var revealables = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && revealables.length) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.08 }
    );
    revealables.forEach(function (el) {
      observer.observe(el);
    });
  } else {
    revealables.forEach(function (el) {
      el.classList.add("in");
    });
  }

  /* Current year */
  var year = document.getElementById("year");
  if (year) year.textContent = String(new Date().getFullYear());
})();
