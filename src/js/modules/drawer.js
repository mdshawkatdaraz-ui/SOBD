/**
 * drawer.js
 * Generic drawer primitive used by cart + menu (+ filter, future).
 * Handles focus trap, body scroll lock, Esc close, backdrop click, swipe to close.
 *
 * Usage:
 *   <aside class="c-drawer" data-drawer="cart" hidden>
 *     <div class="c-drawer__backdrop" data-drawer-close></div>
 *     <div class="c-drawer__panel">
 *       <button data-drawer-close>X</button>
 *       ...
 *     </div>
 *   </aside>
 *
 *   <button data-drawer-open="cart">Cart</button>
 */

const FOCUSABLE = 'a[href], button:not(:disabled), input:not(:disabled), select:not(:disabled), textarea:not(:disabled), [tabindex]:not([tabindex="-1"])';
const drawers = new Map(); // id -> element
let lastFocused = null;

function trapFocus(panel, event) {
  if (event.key !== 'Tab') return;
  const focusable = panel.querySelectorAll(FOCUSABLE);
  if (focusable.length === 0) return;
  const first = focusable[0];
  const last = focusable[focusable.length - 1];
  if (event.shiftKey && document.activeElement === first) {
    event.preventDefault();
    last.focus();
  } else if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault();
    first.focus();
  }
}

export function open(id) {
  const drawer = drawers.get(id);
  if (!drawer || drawer.classList.contains('is-open')) return;

  // Close other drawers (only one at a time)
  drawers.forEach((d, otherId) => {
    if (otherId !== id) close(otherId);
  });

  lastFocused = document.activeElement;
  drawer.hidden = false;
  // Force reflow before adding open class for transition
  void drawer.offsetWidth;
  drawer.classList.add('is-open');
  document.body.classList.add('is-locked');

  // Focus close button after transition starts
  requestAnimationFrame(() => {
    const closeBtn = drawer.querySelector('[data-drawer-close]:not(.c-drawer__backdrop)');
    if (closeBtn) closeBtn.focus();
  });

  document.dispatchEvent(new CustomEvent('drawer:open', { detail: { id } }));
}

export function close(id) {
  const drawer = drawers.get(id);
  if (!drawer || !drawer.classList.contains('is-open')) return;

  drawer.classList.remove('is-open');
  document.body.classList.remove('is-locked');

  // Wait for transition before hiding
  setTimeout(() => {
    if (!drawer.classList.contains('is-open')) drawer.hidden = true;
  }, 280);

  if (lastFocused && lastFocused.focus) {
    lastFocused.focus();
    lastFocused = null;
  }
  document.dispatchEvent(new CustomEvent('drawer:close', { detail: { id } }));
}

export function toggle(id) {
  const drawer = drawers.get(id);
  if (!drawer) return;
  if (drawer.classList.contains('is-open')) close(id);
  else open(id);
}

function bindDrawer(drawer) {
  const id = drawer.dataset.drawer;
  if (!id) return;
  drawers.set(id, drawer);

  // Backdrop and any data-drawer-close click
  drawer.addEventListener('click', (event) => {
    const closer = event.target.closest('[data-drawer-close]');
    if (closer) close(id);
  });

  const panel = drawer.querySelector('.c-drawer__panel');
  if (!panel) return;

  // Focus trap
  drawer.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') { close(id); return; }
    trapFocus(panel, event);
  });

  // Swipe-to-close (mobile, right-anchored = swipe right; left-anchored = swipe left)
  let startX = 0;
  let dx = 0;
  let active = false;
  const isMenu = drawer.classList.contains('c-drawer--menu');

  panel.addEventListener('touchstart', (e) => {
    if (e.touches.length !== 1) return;
    startX = e.touches[0].clientX;
    dx = 0;
    active = true;
  }, { passive: true });

  panel.addEventListener('touchmove', (e) => {
    if (!active) return;
    dx = e.touches[0].clientX - startX;
    const valid = isMenu ? dx < 0 : dx > 0;
    if (valid) {
      panel.style.transform = `translateX(${dx}px)`;
    }
  }, { passive: true });

  panel.addEventListener('touchend', () => {
    if (!active) return;
    panel.style.transform = '';
    const threshold = panel.offsetWidth * 0.3;
    if (isMenu ? dx < -threshold : dx > threshold) close(id);
    active = false;
  });
}

export function initDrawer() {
  document.querySelectorAll('[data-drawer]').forEach(bindDrawer);

  // Open triggers
  document.addEventListener('click', (event) => {
    const opener = event.target.closest('[data-drawer-open]');
    if (opener) {
      event.preventDefault();
      open(opener.dataset.drawerOpen);
    }
  });
}
