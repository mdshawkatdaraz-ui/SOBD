/**
 * menu.js
 * Mobile menu drawer triggers + desktop mega-menu hover/click.
 * Drawer logic itself is in drawer.js; this just wires interactions.
 */

import { open, close } from './drawer.js';

function setupMegaMenu() {
  const trigger = document.querySelector('[data-mega-trigger]');
  if (!trigger) return;
  const panel = document.querySelector('[data-mega-panel]');
  if (!panel) return;

  let timer;
  const show = () => {
    clearTimeout(timer);
    panel.classList.add('is-open');
    trigger.setAttribute('aria-expanded', 'true');
  };
  const hide = () => {
    timer = setTimeout(() => {
      panel.classList.remove('is-open');
      trigger.setAttribute('aria-expanded', 'false');
    }, 120);
  };

  // Hover (desktop, pointer-fine)
  if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
    trigger.addEventListener('mouseenter', show);
    trigger.addEventListener('mouseleave', hide);
    panel.addEventListener('mouseenter', show);
    panel.addEventListener('mouseleave', hide);
  }

  // Click toggle (touch, keyboard)
  trigger.addEventListener('click', (e) => {
    e.preventDefault();
    if (panel.classList.contains('is-open')) hide();
    else show();
  });

  // Esc closes
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && panel.classList.contains('is-open')) {
      panel.classList.remove('is-open');
      trigger.setAttribute('aria-expanded', 'false');
      trigger.focus();
    }
  });

  // Click outside
  document.addEventListener('click', (e) => {
    if (!panel.contains(e.target) && !trigger.contains(e.target)) {
      panel.classList.remove('is-open');
      trigger.setAttribute('aria-expanded', 'false');
    }
  });
}

export function initMenu() {
  setupMegaMenu();
}
