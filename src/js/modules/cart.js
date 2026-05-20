/**
 * cart.js
 * Single source of truth for cart state.
 * Persists to localStorage. Communicates via custom events on `document`.
 *
 * Item shape:
 * { id, name, slug, image, price, size, qty }
 *
 * Identity: id + size (same product in two sizes = two lines).
 */

import { get, set, onChange } from './store.js';

const KEY = 'cart';
let state = { items: [], updatedAt: 0 };

function emit() {
  document.dispatchEvent(new CustomEvent('cart:update', {
    detail: {
      items: state.items.slice(),
      subtotal: getSubtotal(),
      count: getCount()
    }
  }));
}

function persist() {
  state.updatedAt = Date.now();
  set(KEY, state);
}

function load() {
  const raw = get(KEY);
  if (raw && Array.isArray(raw.items)) {
    state = raw;
  } else {
    state = { items: [], updatedAt: 0 };
  }
}

function findIndex(id, size) {
  return state.items.findIndex(it => it.id === id && it.size === size);
}

export function add(item) {
  if (!item || !item.id) return;
  const idx = findIndex(item.id, item.size);
  if (idx >= 0) {
    state.items[idx].qty += (item.qty || 1);
  } else {
    state.items.push({
      id: item.id,
      name: item.name || '',
      slug: item.slug || '',
      image: item.image || '',
      price: Number(item.price) || 0,
      size: item.size || '',
      qty: Number(item.qty) || 1
    });
  }
  persist();
  emit();
  document.dispatchEvent(new CustomEvent('cart:add', { detail: { item } }));
}

export function remove(id, size) {
  const idx = findIndex(id, size);
  if (idx < 0) return;
  state.items.splice(idx, 1);
  persist();
  emit();
}

export function updateQty(id, size, qty) {
  const idx = findIndex(id, size);
  if (idx < 0) return;
  if (qty <= 0) {
    remove(id, size);
    return;
  }
  state.items[idx].qty = qty;
  persist();
  emit();
}

export function clear() {
  state = { items: [], updatedAt: Date.now() };
  persist();
  emit();
}

export function getItems() {
  return state.items.slice();
}

export function getSubtotal() {
  return state.items.reduce((sum, it) => sum + (it.price * it.qty), 0);
}

export function getCount() {
  return state.items.reduce((sum, it) => sum + it.qty, 0);
}

export function initCart() {
  load();
  // Cross-tab sync
  onChange(KEY, (newState) => {
    if (newState && Array.isArray(newState.items)) {
      state = newState;
      emit();
    }
  });
  emit();
}
