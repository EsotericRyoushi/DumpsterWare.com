/* DumpsterWare — screenshot carousel. */
(function () {
  "use strict";

  var carousels = document.querySelectorAll(".shot-carousel");
  if (!carousels.length) return;

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  Array.prototype.forEach.call(carousels, function (carousel) {
    var viewport = carousel.querySelector(".shot-viewport");
    var track = carousel.querySelector(".shot-track");
    var slides = track ? Array.prototype.slice.call(track.children) : [];
    var prev = carousel.querySelector(".shot-prev");
    var next = carousel.querySelector(".shot-next");
    var count = carousel.querySelector(".shot-count");
    if (!viewport || !slides.length) return;

    function step() {
      var style = window.getComputedStyle(track);
      var gap = parseFloat(style.columnGap || style.gap || 0) || 0;
      return slides[0].getBoundingClientRect().width + gap;
    }

    function maxScroll() {
      return Math.max(0, viewport.scrollWidth - viewport.clientWidth);
    }

    function indexAtEdge() {
      var size = step();
      if (!size) return 0;
      return Math.max(0, Math.min(slides.length - 1, Math.round(viewport.scrollLeft / size)));
    }

    function update() {
      var size = step();
      if (!size || !count) return;
      var start = indexAtEdge();
      var visible = Math.max(1, Math.floor(viewport.clientWidth / size) + 1);
      var end = Math.min(slides.length, start + visible);
      count.textContent =
        start + 1 + (end > start + 1 ? "\u2013" + end : "") + " / " + slides.length;
      if (prev) prev.disabled = viewport.scrollLeft <= 2;
      if (next) next.disabled = viewport.scrollLeft >= maxScroll() - 2;
    }

    function goTo(index) {
      var size = step();
      var target = Math.max(0, Math.min(maxScroll(), index * size));
      viewport.scrollTo({ left: target, behavior: reduceMotion ? "auto" : "smooth" });
    }

    if (prev) {
      prev.addEventListener("click", function () {
        goTo(indexAtEdge() - 1);
      });
    }

    if (next) {
      next.addEventListener("click", function () {
        goTo(indexAtEdge() + 1);
      });
    }

    viewport.addEventListener(
      "scroll",
      function () {
        window.requestAnimationFrame(update);
      },
      { passive: true }
    );

    viewport.addEventListener("keydown", function (event) {
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        goTo(indexAtEdge() - 1);
      } else if (event.key === "ArrowRight") {
        event.preventDefault();
        goTo(indexAtEdge() + 1);
      }
    });

    /* Mouse drag, for people without a trackpad. Touch uses native scrolling. */
    var dragging = false;
    var startX = 0;
    var startScroll = 0;

    viewport.addEventListener("pointerdown", function (event) {
      if (event.pointerType !== "mouse") return;
      dragging = true;
      startX = event.clientX;
      startScroll = viewport.scrollLeft;
      viewport.classList.add("dragging");
      viewport.setPointerCapture(event.pointerId);
    });

    viewport.addEventListener("pointermove", function (event) {
      if (!dragging) return;
      viewport.scrollLeft = startScroll - (event.clientX - startX);
    });

    function endDrag() {
      dragging = false;
      viewport.classList.remove("dragging");
    }

    viewport.addEventListener("pointerup", endDrag);
    viewport.addEventListener("pointercancel", endDrag);
    viewport.addEventListener("dragstart", function (event) {
      event.preventDefault();
    });

    window.addEventListener("resize", update);
    update();
  });
})();
