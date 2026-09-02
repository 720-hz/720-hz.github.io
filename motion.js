(function () {
  var prefersReduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var els = document.querySelectorAll('.reveal');

  if (prefersReduced || !('IntersectionObserver' in window)) {
    els.forEach(function (el) { el.classList.add('in-view'); });
    return;
  }

  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  els.forEach(function (el) { io.observe(el); });

  // Safety net: if anything is still hidden after a few seconds (a slow
  // device, a tab backgrounded before it could scroll, or a genuinely
  // unreachable section), just show it rather than leaving it invisible.
  window.setTimeout(function () {
    document.querySelectorAll('.reveal:not(.in-view)').forEach(function (el) {
      el.classList.add('in-view');
    });
  }, 3000);
})();
