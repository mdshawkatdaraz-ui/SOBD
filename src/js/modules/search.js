/**
 * search.js
 * Open/close the search overlay; submit redirects to Blogger search URL.
 */

let overlay;
let input;

function open() {
  if (!overlay) return;
  overlay.hidden = false;
  void overlay.offsetWidth;
  overlay.classList.add('is-open');
  document.body.classList.add('is-locked');
  setTimeout(() => input && input.focus(), 100);
}

function close() {
  if (!overlay) return;
  overlay.classList.remove('is-open');
  document.body.classList.remove('is-locked');
  setTimeout(() => { overlay.hidden = true; }, 240);
}

function onKey(event) {
  if (event.key === 'Escape' && overlay && !overlay.hidden) close();
}

export function initSearch() {
  overlay = document.querySelector('[data-search-overlay]');
  if (!overlay) return;
  input = overlay.querySelector('input[type="search"]');

  document.querySelectorAll('[data-search-open]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      open();
    });
  });

  overlay.querySelectorAll('[data-search-close]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      close();
    });
  });

  document.addEventListener('keydown', onKey);

  // Form submit: Blogger search URL pattern
  const form = overlay.querySelector('form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const q = input.value.trim();
      if (!q) return;
      window.location.assign(`/search?q=${encodeURIComponent(q)}`);
    });
  }
}
