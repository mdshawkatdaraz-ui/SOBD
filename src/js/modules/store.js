/**
 * store.js
 * Versioned localStorage wrapper.
 * Namespace: skyoutfit.v1.<key>
 * Silently catches JSON / quota errors so UI never breaks.
 */

const NS = 'skyoutfit.v1.';

function k(key) { return NS + key; }

export function get(key, fallback = null) {
  try {
    const raw = localStorage.getItem(k(key));
    if (raw == null) return fallback;
    return JSON.parse(raw);
  } catch {
    return fallback;
  }
}

export function set(key, value) {
  try {
    localStorage.setItem(k(key), JSON.stringify(value));
    return true;
  } catch {
    return false;
  }
}

export function remove(key) {
  try {
    localStorage.removeItem(k(key));
  } catch { /* ignore */ }
}

/**
 * Subscribe to cross-tab changes for a given key.
 * Returns an unsubscribe function.
 */
export function onChange(key, callback) {
  const handler = (event) => {
    if (event.key === k(key)) {
      try {
        callback(event.newValue ? JSON.parse(event.newValue) : null);
      } catch {
        callback(null);
      }
    }
  };
  window.addEventListener('storage', handler);
  return () => window.removeEventListener('storage', handler);
}
