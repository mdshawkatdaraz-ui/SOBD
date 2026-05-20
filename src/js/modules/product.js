/**
 * product.js
 * PDP hydration: parses the in-body product data block, wires interactions.
 *
 * Expects in the page:
 *   <script type="application/json" data-product>{ ... }</script>
 *   [data-product-name], [data-product-id], [data-product-image], [data-product-slug]
 *   .c-size__chip[data-size]    (rendered as static HTML; we toggle availability)
 *   [data-pdp-bar]              (sticky action bar)
 *   [data-pdp-add]              (Add to bag button — main + sticky)
 *   [data-pdp-whatsapp]         (Order on WhatsApp button)
 *   [data-pdp-anchor]           (element after which the sticky bar should appear)
 *   [data-pdp-qty-input], [data-pdp-qty-inc], [data-pdp-qty-dec]
 *   [data-pdp-price], [data-pdp-price-old]
 */

import { add as cartAdd } from './cart.js';
import { open as openDrawer } from './drawer.js';
import { openOrder } from './whatsapp.js';

function parseDataBlock() {
  const node = document.querySelector('script[type="application/json"][data-product]');
  if (!node) return null;
  try {
    return JSON.parse(node.textContent);
  } catch (e) {
    console.warn('Invalid product data block', e);
    return null;
  }
}

function fmtBDT(n) { return 'BDT ' + Number(n).toLocaleString('en-IN'); }

function hydrateSizes(data, root) {
  const chips = root.querySelectorAll('[data-size]');
  if (chips.length === 0) return;
  const map = {};
  (data.sizes || []).forEach(s => { map[s.label] = s.available; });

  chips.forEach(chip => {
    const label = chip.dataset.size;
    if (label in map && map[label] === false) {
      chip.setAttribute('aria-disabled', 'true');
      chip.disabled = true;
    }
  });
}

function selectedSize(root) {
  const chip = root.querySelector('.c-size__chip.is-selected');
  return chip ? chip.dataset.size : '';
}

function bindSizeSelect(root) {
  const chips = root.querySelectorAll('[data-size]');
  chips.forEach(chip => {
    chip.addEventListener('click', () => {
      if (chip.disabled || chip.getAttribute('aria-disabled') === 'true') return;
      chips.forEach(c => c.classList.remove('is-selected'));
      chip.classList.add('is-selected');
      document.dispatchEvent(new CustomEvent('product:size-change', { detail: { size: chip.dataset.size } }));
    });
  });
}

function bindQuantity(root) {
  const input = root.querySelector('[data-pdp-qty-input]');
  const inc = root.querySelector('[data-pdp-qty-inc]');
  const dec = root.querySelector('[data-pdp-qty-dec]');
  if (!input) return () => 1;

  const get = () => Math.max(1, parseInt(input.value, 10) || 1);
  const setVal = (v) => { input.value = Math.max(1, v); };

  if (inc) inc.addEventListener('click', () => setVal(get() + 1));
  if (dec) dec.addEventListener('click', () => setVal(get() - 1));
  input.addEventListener('input', () => setVal(get()));

  return get;
}

function buildItem(meta, size, qty) {
  return {
    id: meta.id,
    name: meta.name,
    slug: meta.slug,
    image: meta.image,
    price: Number(meta.price) || 0,
    size,
    qty
  };
}

function bindStickyBar() {
  const bar = document.querySelector('[data-pdp-bar]');
  const anchor = document.querySelector('[data-pdp-anchor]');
  if (!bar || !anchor) return;

  if (!('IntersectionObserver' in window)) {
    bar.classList.add('is-visible');
    return;
  }
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      // When anchor is OUT of view (scrolled past), show sticky bar
      bar.classList.toggle('is-visible', !entry.isIntersecting);
    });
  }, { rootMargin: '0px 0px -100% 0px' });
  io.observe(anchor);
}

function meta() {
  const root = document.querySelector('[data-pdp]') || document.body;
  return {
    id:    root.dataset.productId    || (root.querySelector('[data-product-id]')    || {}).dataset?.productId    || '',
    name:  root.dataset.productName  || (root.querySelector('[data-product-name]')  || {}).dataset?.productName  || document.title,
    slug:  root.dataset.productSlug  || window.location.pathname,
    image: root.dataset.productImage || (root.querySelector('[data-product-image]') || {}).dataset?.productImage || ''
  };
}

function whatsappNumber() {
  const node = document.querySelector('[data-whatsapp-number]');
  return node ? node.dataset.whatsappNumber : '';
}

export function initProduct() {
  const root = document.querySelector('[data-pdp]') || document.body;
  const data = parseDataBlock();
  if (!data) return;

  // Inject price into DOM (in case theme provides hooks)
  const priceEl = root.querySelector('[data-pdp-price]');
  if (priceEl) priceEl.textContent = fmtBDT(data.price);
  const oldEl = root.querySelector('[data-pdp-price-old]');
  if (oldEl && data.oldPrice) oldEl.textContent = fmtBDT(data.oldPrice);

  hydrateSizes(data, root);
  bindSizeSelect(root);
  const getQty = bindQuantity(root);
  bindStickyBar();

  const m = meta();
  m.price = data.price;

  const handleAdd = (e) => {
    e.preventDefault();
    const size = selectedSize(root);
    if (!size && data.sizes && data.sizes.length > 0) {
      // Inline error: highlight size selector
      const sel = root.querySelector('.c-size');
      if (sel) {
        sel.classList.add('is-error');
        setTimeout(() => sel.classList.remove('is-error'), 1500);
      }
      return;
    }
    const item = buildItem(m, size, getQty());
    cartAdd(item);
    openDrawer('cart');
  };

  const handleWhatsApp = (e) => {
    e.preventDefault();
    const size = selectedSize(root);
    const item = buildItem(m, size, getQty());
    const number = whatsappNumber();
    if (!number) return;
    openOrder(number, [item], item.price * item.qty);
  };

  root.querySelectorAll('[data-pdp-add]').forEach(btn => btn.addEventListener('click', handleAdd));
  root.querySelectorAll('[data-pdp-whatsapp]').forEach(btn => btn.addEventListener('click', handleWhatsApp));

  // Wishlist toggle (UI only in v1)
  root.querySelectorAll('[data-pdp-wishlist]').forEach(btn => {
    btn.addEventListener('click', () => btn.classList.toggle('is-active'));
  });

  // Gallery thumb click
  const main = root.querySelector('.c-gallery__main img');
  root.querySelectorAll('.c-gallery__thumb').forEach(thumb => {
    thumb.addEventListener('click', () => {
      root.querySelectorAll('.c-gallery__thumb').forEach(t => t.classList.remove('is-active'));
      thumb.classList.add('is-active');
      const img = thumb.querySelector('img');
      if (img && main) main.src = img.src;
    });
  });

  // Accordion toggles (FAQ)
  root.querySelectorAll('.c-accordion__btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const expanded = btn.getAttribute('aria-expanded') === 'true';
      btn.setAttribute('aria-expanded', String(!expanded));
    });
  });
}
