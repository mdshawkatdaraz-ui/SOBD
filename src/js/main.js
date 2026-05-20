/**
 * main.js
 * Entry point. Wires modules to the DOM.
 *
 * - Always-loaded: store, cart, drawer, menu, search, observer
 * - Lazy-loaded:   product (PDP only)
 *
 * Cross-module communication happens via custom events on document:
 *   cart:update, cart:add, drawer:open, drawer:close, product:size-change
 */

import { initObserver } from './modules/observer.js';
import { initDrawer, open as openDrawer, close as closeDrawer } from './modules/drawer.js';
import { initCart, getItems, getSubtotal, getCount, remove as cartRemove, updateQty } from './modules/cart.js';
import { initMenu } from './modules/menu.js';
import { initSearch } from './modules/search.js';
import { openOrder } from './modules/whatsapp.js';

/* -----------------------------------------------------------
   Format helpers
----------------------------------------------------------- */
function fmtBDT(n) { return 'BDT ' + Number(n).toLocaleString('en-IN'); }

/* -----------------------------------------------------------
   Cart UI sync (header + bottom nav badges + drawer body)
----------------------------------------------------------- */
function renderBadges(count) {
  document.querySelectorAll('[data-cart-count]').forEach(el => {
    el.dataset.count = count;
    el.textContent = count > 0 ? count : '';
  });
}

function renderCartDrawer() {
  const body = document.querySelector('[data-cart-body]');
  const summary = document.querySelector('[data-cart-subtotal]');
  const checkout = document.querySelector('[data-cart-checkout]');
  if (!body) return;

  const items = getItems();
  const subtotal = getSubtotal();

  if (items.length === 0) {
    body.innerHTML = `
      <div class="u-text-center" style="padding-block: 48px;">
        <p class="u-eyebrow">Your bag</p>
        <h3 style="margin-top: 8px;">Looks quiet here.</h3>
        <p class="u-text-muted" style="margin-top: 8px;">Soft picks for any moment.</p>
        <a href="/" class="c-button c-button--primary" style="margin-top: 24px;">Shop new arrivals</a>
      </div>`;
    if (summary) summary.textContent = fmtBDT(0);
    if (checkout) checkout.setAttribute('aria-disabled', 'true');
    return;
  }

  body.innerHTML = items.map(it => `
    <div class="c-cart-line" data-line-id="${it.id}" data-line-size="${it.size}">
      <div class="c-cart-line__image">
        ${it.image ? `<img src="${it.image}" alt="${it.name}" loading="lazy">` : ''}
      </div>
      <div class="c-cart-line__body">
        <a class="c-cart-line__name" href="${it.slug}">${it.name}</a>
        <span class="c-cart-line__meta">Size: ${it.size || '-'}</span>
        <span class="c-cart-line__price u-tnum">${fmtBDT(it.price)}</span>
        <div class="c-cart-line__controls">
          <div class="c-stepper" aria-label="Quantity">
            <button type="button" data-line-dec aria-label="Decrease">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><line x1="5" y1="12" x2="19" y2="12"/></svg>
            </button>
            <input type="number" inputmode="numeric" min="1" value="${it.qty}" data-line-qty>
            <button type="button" data-line-inc aria-label="Increase">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
            </button>
          </div>
          <button class="c-button c-button--ghost c-button--sm" data-line-remove>Remove</button>
        </div>
      </div>
    </div>
  `).join('');

  if (summary) summary.textContent = fmtBDT(subtotal);
  if (checkout) checkout.removeAttribute('aria-disabled');
}

function bindCartLineActions() {
  const body = document.querySelector('[data-cart-body]');
  if (!body) return;

  body.addEventListener('click', (e) => {
    const line = e.target.closest('[data-line-id]');
    if (!line) return;
    const id = line.dataset.lineId;
    const size = line.dataset.lineSize;
    const input = line.querySelector('[data-line-qty]');
    const qty = Math.max(1, parseInt(input?.value, 10) || 1);

    if (e.target.closest('[data-line-inc]'))    updateQty(id, size, qty + 1);
    if (e.target.closest('[data-line-dec]'))    updateQty(id, size, qty - 1);
    if (e.target.closest('[data-line-remove]')) cartRemove(id, size);
  });

  body.addEventListener('change', (e) => {
    if (!e.target.matches('[data-line-qty]')) return;
    const line = e.target.closest('[data-line-id]');
    if (!line) return;
    const v = Math.max(1, parseInt(e.target.value, 10) || 1);
    updateQty(line.dataset.lineId, line.dataset.lineSize, v);
  });
}

function bindCartCheckout() {
  const btn = document.querySelector('[data-cart-checkout]');
  if (!btn) return;
  btn.addEventListener('click', (e) => {
    e.preventDefault();
    if (btn.getAttribute('aria-disabled') === 'true') return;
    const items = getItems();
    if (items.length === 0) return;
    const numNode = document.querySelector('[data-whatsapp-number]');
    if (!numNode) return;
    openOrder(numNode.dataset.whatsappNumber, items, getSubtotal());
  });
}

/* -----------------------------------------------------------
   Toast (transient feedback)
----------------------------------------------------------- */
let toastTimer;
function showToast(message, actionLabel, actionHandler) {
  const toast = document.querySelector('[data-toast]');
  if (!toast) return;
  toast.innerHTML = `
    <span>${message}</span>
    ${actionLabel ? `<button type="button" class="c-toast__action">${actionLabel}</button>` : ''}
  `;
  toast.classList.add('is-visible');
  if (actionLabel && actionHandler) {
    toast.querySelector('.c-toast__action').addEventListener('click', actionHandler, { once: true });
  }
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('is-visible'), 3500);
}

/* -----------------------------------------------------------
   Announcement bar dismiss (session-only)
----------------------------------------------------------- */
function bindAnnouncement() {
  const ann = document.querySelector('[data-announcement]');
  if (!ann) return;
  if (sessionStorage.getItem('skyoutfit.announcement.dismissed') === '1') {
    ann.hidden = true;
    return;
  }
  const close = ann.querySelector('[data-announcement-close]');
  if (close) close.addEventListener('click', () => {
    ann.hidden = true;
    try { sessionStorage.setItem('skyoutfit.announcement.dismissed', '1'); } catch {}
  });
}

/* -----------------------------------------------------------
   Boot
----------------------------------------------------------- */
function boot() {
  initObserver();
  initDrawer();
  initMenu();
  initSearch();
  initCart();
  bindCartLineActions();
  bindCartCheckout();
  bindAnnouncement();

  // Subscribe to cart updates → header badges + drawer render
  document.addEventListener('cart:update', (e) => {
    renderBadges(e.detail.count);
    renderCartDrawer();
  });

  document.addEventListener('cart:add', (e) => {
    const name = e.detail?.item?.name || 'Item';
    showToast(`${name} added to bag`);
  });

  // PDP-only modules loaded lazily
  if (document.querySelector('script[type="application/json"][data-product]')) {
    import('./modules/product.js').then(({ initProduct }) => initProduct());
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', boot);
} else {
  boot();
}
