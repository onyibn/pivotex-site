// Footer year
document.getElementById('year').textContent = new Date().getFullYear();

// Scroll reveal for sections (skipped entirely if reduced motion is preferred,
// since the CSS already shows .reveal elements at full opacity in that case)
var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

document.querySelectorAll('.about, .contact').forEach(function (el) {
  el.classList.add('reveal');
});

if (!prefersReducedMotion && 'IntersectionObserver' in window) {
  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  document.querySelectorAll('.reveal').forEach(function (el) {
    observer.observe(el);
  });
} else {
  document.querySelectorAll('.reveal').forEach(function (el) {
    el.classList.add('is-visible');
  });
}

// Assemble the email link at render time so no "@" or address exists
// anywhere in the page's raw HTML source (defeats static scrapers).
// The link starts as obfuscated placeholder text ("hello [at] ...") in the
// HTML itself, then both its visible text and href are set to the real
// address here, after the page has loaded.
(function () {
  var link = document.getElementById('js-mail-link');
  if (!link) return;
  var address = atob('aGVsbG9AcGl2b3RleC5hZnJpY2E=');
  link.textContent = address;
  link.href = 'mailto:' + address;
})();
