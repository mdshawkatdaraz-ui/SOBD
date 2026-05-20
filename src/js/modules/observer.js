/**
 * observer.js
 * Single shared IntersectionObserver for section reveals.
 * Components opt in by adding the `data-reveal` attribute.
 * Honors prefers-reduced-motion.
 */

let observer = null;

function reduceMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export function initObserver() {
  if (reduceMotion()) {
    document.querySelectorAll('[data-reveal]').forEach(el => el.classList.add('is-revealed'));
    return;
  }

  if (!('IntersectionObserver' in window)) {
    document.querySelectorAll('[data-reveal]').forEach(el => el.classList.add('is-revealed'));
    return;
  }

  observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-revealed');
        observer.unobserve(entry.target);
      }
    });
  }, {
    rootMargin: '0px 0px -10% 0px',
    threshold: 0.1
  });

  document.querySelectorAll('[data-reveal]').forEach(el => observer.observe(el));
}

/**
 * Manually register an element after initial init (e.g., dynamically rendered cards).
 */
export function observe(el) {
  if (!el) return;
  if (!observer) { el.classList.add('is-revealed'); return; }
  observer.observe(el);
}
