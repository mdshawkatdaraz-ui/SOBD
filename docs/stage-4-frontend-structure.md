# SkyOutfit — Stage 4: Front-End Structure

> Real code. Standalone source. Not yet wrapped as Blogger XML.

This stage defines and ships the source tree that Stage 5 will compile into a Blogger XML theme. Working in `/src/` as plain HTML/CSS/JS lets us verify the system end-to-end before Blogger templating constraints get layered on top.

---

## 1. Source Tree

```
src/
├── index.html              # Homepage reference template
├── product.html            # PDP reference template
├── icons.svg               # SVG sprite (referenced via <use>)
│
├── css/
│   ├── tokens.css          # All design tokens from Stage 2
│   ├── reset.css           # Modern CSS reset
│   ├── base.css            # Body, typography defaults, focus
│   ├── layout.css          # .container, .section, .grid primitives
│   ├── components.css      # All 25 components (one file for Blogger)
│   └── utilities.css       # Small, single-purpose helpers
│
└── js/
    ├── main.js             # Entry point — wires modules
    └── modules/
        ├── store.js        # localStorage abstraction (versioned)
        ├── cart.js         # Cart state + line items + subtotal
        ├── drawer.js       # Drawer primitive (cart, menu, filter)
        ├── product.js      # PDP hydration from data block
        ├── whatsapp.js     # WhatsApp message builder
        ├── observer.js     # IntersectionObserver for reveals
        ├── menu.js         # Mobile menu + mega-menu
        └── search.js       # Search overlay
```

**Why one `components.css` file** instead of per-component files: Blogger compiles all CSS into a single `<b:skin>` block in Stage 5. Keeping it as one file from the start removes a build step and makes the path to Stage 5 trivial. Internally it is divided by clear section comments.

---

## 2. Semantic HTML Structure

### 2.1 Document skeleton (every page)

```
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
    <title>...</title>
    <meta name="description" content="...">

    <!-- Open Graph + Twitter (auto-generated per page in Stage 5) -->
    <!-- Preconnect + preload critical font -->
    <!-- Inline critical CSS (Stage 5 build step) -->
    <link rel="stylesheet" href="/css/tokens.css">
    <link rel="stylesheet" href="/css/reset.css">
    <link rel="stylesheet" href="/css/base.css">
    <link rel="stylesheet" href="/css/layout.css">
    <link rel="stylesheet" href="/css/components.css">
    <link rel="stylesheet" href="/css/utilities.css">
  </head>
  <body>
    <!-- Skip link -->
    <a href="#main" class="u-sr-only u-focus-visible">Skip to content</a>

    <!-- SVG sprite included once -->
    <div hidden id="icon-sprite"><!-- contents of icons.svg --></div>

    <!-- Components, ordered by visual priority -->
    <div class="c-announcement" role="region" aria-label="Site announcement">...</div>
    <header class="c-header" role="banner">...</header>
    <main id="main">...</main>
    <footer class="c-footer" role="contentinfo">...</footer>

    <!-- Overlays / portals — last in DOM, on top via z-index -->
    <aside class="c-drawer c-drawer--cart" hidden>...</aside>
    <aside class="c-drawer c-drawer--menu" hidden>...</aside>
    <div class="c-search-overlay" hidden>...</div>
    <a class="c-fab c-fab--whatsapp" href="...">...</a>
    <nav class="c-bottom-nav" role="navigation" aria-label="Primary mobile">...</nav>
    <div class="c-toast" role="status" aria-live="polite" hidden></div>

    <script type="module" src="/js/main.js"></script>
  </body>
</html>
```

### 2.2 Landmark and heading rules
- One `<header role="banner">`, one `<main>`, one `<footer role="contentinfo">` per page.
- Exactly one `<h1>` per page. Homepage `h1` is visually hidden (the hero headline is `h2`) so the SEO/AT title can be plain ("SkyOutfit — Premium baby fashion for Bangladesh").
- Section landmarks use `<section aria-labelledby="...">` referencing each section's eyebrow heading id.

### 2.3 Component-to-element map

| Component | Element | ARIA |
|---|---|---|
| `c-header` | `<header role="banner">` | — |
| `c-bottom-nav` | `<nav>` | `aria-label="Primary mobile"` |
| `c-drawer` | `<aside>` | `role="dialog" aria-modal="true" aria-labelledby="..."` |
| `c-product-card` | `<article>` | — (link inside) |
| `c-button` | `<button>` or `<a>` | `aria-label` if icon-only |
| `c-form-input` | `<input>` + `<label>` | `aria-describedby` for helper / error |
| `c-toast` | `<div role="status">` | `aria-live="polite"` |
| `c-fab` | `<a>` (WhatsApp deep link) | `aria-label="Order on WhatsApp"` |

---

## 3. Modular CSS Architecture

### 3.1 Cascade order (load order matters)

```
1. tokens.css          → :root variables only, zero selectors
2. reset.css           → normalize defaults
3. base.css            → typography, body bg, focus, body { margin: 0 }
4. layout.css          → container, section, grid (page primitives)
5. components.css      → all .c-* classes (the bulk)
6. utilities.css       → .u-* helpers (loaded last to override safely)
```

### 3.2 Naming convention (BEM-lite)

```
.c-product-card                  block (component)
.c-product-card__image           element
.c-product-card__price           element
.c-product-card--featured        modifier
.c-product-card.is-loading       state (chained .is-* class)
.c-product-card[data-tag="new"]  data-attr for variants where modifier would explode
```

**Prefixes:**
- `c-` component (styled)
- `u-` utility (single property, no overrides)
- `js-` JS hook (no styling allowed; brittle if styled)
- `is-` / `has-` state (chained, never alone)

### 3.3 CSS rules (enforced by review, not tooling in v1)

1. **No element selectors** in components (e.g., `.c-card div { ... }`). Always class-based.
2. **Maximum 2 levels of nesting** in source comments (we use flat CSS, no preprocessor).
3. **No `!important`** anywhere. Cascade and specificity must do the work.
4. **No IDs in CSS selectors.** IDs are for JS hooks and `aria-labelledby` only.
5. **Single source of values** — every color, spacing, radius is a token. No hex literals in component files.
6. **Mobile-first media queries** only (`min-width`). No `max-width` queries.
7. **Logical properties** preferred (`padding-inline`, `margin-block`) — sets us up for Bangla RTL/LTR mix later.

### 3.4 File responsibilities

**`tokens.css`** — defines `:root { --c-sky: ... }` only. Zero rule blocks beyond `:root` and `[data-theme="dark"]` placeholder. No selector specificity battles can ever start here.

**`reset.css`** — modern reset (box-sizing, margins, list-style on UL with role, smooth scroll opt-in, etc.). ~30 lines.

**`base.css`** — `html`, `body`, default link, default heading scale, focus-visible ring, selection color, `prefers-reduced-motion` global guard.

**`layout.css`** — three primitives:
- `.container` — max-width with gutters
- `.section` — vertical padding rhythm
- `.grid` and `.grid--<n>` — column counts

**`components.css`** — every `.c-*` block, separated by section comments:
```
/* === ANNOUNCEMENT BAR === */
/* === HEADER === */
/* === BOTTOM NAV === */
/* etc. */
```

**`utilities.css`** — `.u-sr-only`, `.u-flex`, `.u-text-center`, `.u-mt-*`, etc. Capped at ~25 utilities to prevent atomic-CSS sprawl.

---

## 4. Component Logic (JS module map)

### 4.1 Module dependency graph

```
                 main.js
                    │
       ┌────────────┼─────────────┬──────────────┬──────────┐
       ▼            ▼             ▼              ▼          ▼
   observer      drawer         menu          search      product
                    │            (uses           │           │
              ┌─────┴──┐         drawer)       (uses          │
              ▼        ▼                       drawer)        ▼
            cart   (consumed                                whatsapp
              │     by cart                                   ▲
              ▼     drawer)                                   │
            store ─────────────────────────────────────────  │
              ▲                                              │
              └──────────────────────────────────────────────┘
              cart calls whatsapp.build(cart) on checkout tap
```

### 4.2 Module contracts

**`store.js`** — versioned localStorage wrapper. Exposes `get(key)`, `set(key, value)`, `remove(key)`. Namespaced under `skyoutfit.v1.*`. Catches `QuotaExceeded` and JSON errors silently. Future migrations bump the version segment.

**`cart.js`** — single source of truth for cart state. API:
- `add(item)` — item shape: `{ id, name, slug, image, price, size, qty }`
- `remove(id, size)`
- `updateQty(id, size, qty)`
- `clear()`
- `getItems()` / `getSubtotal()` / `getCount()`
- `subscribe(callback)` — pub/sub for UI updates (header badge, drawer)
- Auto-persists to `store` on every mutation.

**`drawer.js`** — generic drawer primitive used by cart + menu + (future) filter.
- `open(id, opts)` / `close(id)` / `toggle(id)`
- Handles focus trap, body scroll lock, Esc, backdrop click, swipe-to-close.
- Anchor configurable: `right` (cart, menu) | `bottom` (filter on mobile).

**`product.js`** — PDP hydration.
- Reads `<script type="application/json" data-product>` from the page.
- Hydrates size selector states (out-of-stock disabled with strikethrough).
- Wires "Add to bag" → calls `cart.add()`.
- Wires sticky PDP action bar visibility via IntersectionObserver.

**`whatsapp.js`** — pure function `buildMessage(items, subtotal)` returning a URL-encoded string. Plus `openOrder(items, subtotal)` which triggers `window.location.assign(...)`.

**`observer.js`** — single shared `IntersectionObserver` for section reveals. Components opt in by adding `data-reveal` attribute. Handles `prefers-reduced-motion` by no-op.

**`menu.js`** — mobile menu drawer + desktop mega-menu hover/click.

**`search.js`** — search overlay open/close, debounced input, Blogger search redirect (`?q=...`).

### 4.3 Module conventions
- ES modules with named exports.
- No default exports (forces explicit naming and prevents typo aliasing).
- All modules are pure when possible; side effects scoped to one `init()` call from `main.js`.
- No globals on `window`. Communication via custom events (`document.dispatchEvent(new CustomEvent('cart:update'))`) for cross-module updates.

---

## 5. Reusable Classes

### 5.1 The 25 component classes (locked by Stage 2 cap)

| # | Class | File section |
|---|---|---|
| 1 | `.c-announcement` | components.css |
| 2 | `.c-header` | components.css |
| 3 | `.c-bottom-nav` | components.css |
| 4 | `.c-menu-drawer` | components.css |
| 5 | `.c-cart-drawer` | components.css |
| 6 | `.c-footer` | components.css |
| 7 | `.c-fab` | components.css |
| 8 | `.c-pdp-bar` | components.css |
| 9 | `.c-search-overlay` | components.css |
| 10 | `.c-toast` | components.css |
| 11 | `.c-hero` | components.css |
| 12 | `.c-category-grid` | components.css |
| 13 | `.c-product-rail` | components.css |
| 14 | `.c-trust-strip` | components.css |
| 15 | `.c-editorial` | components.css |
| 16 | `.c-testimonials` | components.css |
| 17 | `.c-instagram-grid` | components.css |
| 18 | `.c-blog-grid` | components.css |
| 19 | `.c-product-card` (+ `--compact`) | components.css |
| 20 | `.c-product-gallery` | components.css |
| 21 | `.c-size-selector` | components.css |
| 22 | `.c-fabric-block` | components.css |
| 23 | `.c-form-input` | components.css |
| 24 | `.c-button` | components.css |
| 25 | `.c-skeleton` | components.css |

### 5.2 Compositions (built from the 25, not new components)
- Newsletter band = `.c-section` + `.c-form-input` + `.c-button`
- Pay-with strip = inline list of `<img>` tags + `.u-flex`
- Breadcrumb = `<nav>` + small list + `.u-text-caption`
- Modal = `.c-drawer` reused with anchor `center`
- Tag chip = inline span styled inside `.c-product-card[data-tag]`

---

## 6. Lightweight JS Structure

### 6.1 Performance budget recap (Stage 1 constraint)
- Total JS: **≤ 35 KB** uncompressed source, including all modules.
- No frameworks, no transpilation needed (ES2020 baseline).
- Single entry, lazy-loaded modules where possible (PDP-only modules don't load on homepage).

### 6.2 Loading strategy
- `<script type="module" src="main.js" defer>` at end of `<body>`.
- `main.js` imports always-needed modules statically (drawer, menu, observer, store, cart).
- PDP-only modules (`product`) imported dynamically when `document.querySelector('[data-product]')` exists.

### 6.3 Initialization
```
// main.js sketch (full code below in src/)
import { initObserver } from './modules/observer.js';
import { initMenu } from './modules/menu.js';
import { initDrawer } from './modules/drawer.js';
import { initCart } from './modules/cart.js';
import { initSearch } from './modules/search.js';

document.addEventListener('DOMContentLoaded', async () => {
  initObserver();
  initDrawer();
  initMenu();
  initCart();
  initSearch();

  if (document.querySelector('[data-product]')) {
    const { initProduct } = await import('./modules/product.js');
    initProduct();
  }
});
```

### 6.4 Event vocabulary (custom events on `document`)

| Event | Detail | Fired by | Consumed by |
|---|---|---|---|
| `cart:update` | `{ items, subtotal, count }` | `cart` | header badge, bottom-nav badge, cart-drawer |
| `cart:add` | `{ item }` | `cart.add()` | toast |
| `drawer:open` | `{ id }` | `drawer.open()` | observer (pause), menu (close others) |
| `drawer:close` | `{ id }` | `drawer.close()` | observer (resume) |
| `product:size-change` | `{ size }` | size selector | product (update WhatsApp link) |

---

## 7. Cart System Logic

### 7.1 State shape
```
cart = {
  items: [
    {
      id: "soft-cotton-romper",      // post slug
      name: "Soft Cotton Romper",
      slug: "/p/soft-cotton-romper.html",
      image: "https://.../romper-1.webp",
      price: 1290,                    // BDT, integer
      size: "6-12m",
      qty: 1
    }
  ],
  updatedAt: 1716210000000             // ms timestamp
}
```

### 7.2 Persistence
- Key: `skyoutfit.v1.cart`
- Stored as JSON string.
- On `init()`, hydrate from store; if parse fails, start clean.
- Mutations write through synchronously, then debounce a 250 ms "settled" pub event for analytics later.

### 7.3 Identity rule
A line item's identity is `id + size`. Adding the same product in two sizes creates two line items. Adding the same product+size increases qty.

### 7.4 Subtotal rule
`subtotal = sum(item.price * item.qty)`. Currency handled at the formatting layer (`formatBDT(amount)` returning `"BDT 1,290"`). No floating point in storage — all prices are integers (BDT has no subunit in practice).

### 7.5 Cart lifecycle on the page
1. Page loads → `cart.init()` reads from store → fires `cart:update`
2. User taps "Add to bag" on PDP → `cart.add(item)` → store write → `cart:update` + `cart:add`
3. Header badge subscribes to `cart:update` → updates count
4. Cart drawer subscribes to `cart:update` → re-renders item list
5. User taps "Order on WhatsApp" → `whatsapp.openOrder(items, subtotal)` → `window.location.assign(...)`
6. Cart is **not cleared automatically** after WhatsApp open — user may continue browsing. Cleared via explicit "Clear bag" or after 30 days untouched (lazy cleanup on next init).

### 7.6 Edge cases handled
- **localStorage unavailable** (private mode): cart works in-memory for the session, no persistence.
- **Schema bump**: `skyoutfit.v1.*` namespace lets us nuke v1 cleanly when v2 ships.
- **Image broken**: card renders with placeholder gradient, no JS error.
- **Concurrent tabs**: `storage` event listener re-hydrates cart in tab B when tab A mutates.

---

## 8. Blogger-Compatible Structure

This is the bridge to Stage 5. Every front-end decision below was made specifically to survive Blogger templating.

### 8.1 What Blogger gives us
- `<b:skin>...</b:skin>` for theme CSS
- `<b:includable>` for reusable template chunks
- `<b:loop var='post' values='data:posts'>` for post iteration
- Post labels (multi-value) for taxonomy
- Post body (rich HTML) for product content
- Search description (custom field) — single string
- Pages (static) and Posts (dynamic feed)
- Feed JSON at `/feeds/posts/default?alt=json` (paginated)
- Search by label: `/search/label/<label>?max-results=N`

### 8.2 What Blogger does NOT give us
- Custom fields per post (only one `searchDescription`)
- Real product types
- Server-side logic
- Reliable post variables (e.g., price as a typed number)

### 8.3 Our solution: the Product Data Block (PDB)

Every product post body **starts** with:

```html
<script type="application/json" data-product>
{
  "price": 1290,
  "oldPrice": 1490,
  "currency": "BDT",
  "sizes": [
    { "label": "0-6m", "available": true },
    { "label": "6-12m", "available": true },
    { "label": "1-2y", "available": false },
    { "label": "2-3y", "available": true }
  ],
  "fabric": "100% combed cotton, 220 GSM",
  "care": "Wash cold. Tumble low. No bleach.",
  "madeIn": "Bangladesh",
  "ageRange": "0-3y",
  "tags": ["new", "bestseller"]
}
</script>
```

**Why this works:**
- Blogger's rich-text editor preserves `<script type="application/json">` blocks (it's not executable).
- The block is invisible to readers (browsers don't render unknown script types).
- JS reads `JSON.parse(document.querySelector('[data-product]').textContent)` — robust, schema-validated client-side.
- Editors get a copy-paste template; they only edit JSON values, never structure.

### 8.4 Labels as collections (Blogger taxonomy)

| Label prefix | Purpose | Example |
|---|---|---|
| `age-` | Age bucket | `age-0-6m`, `age-1-3y` |
| `cat-` | Category | `cat-romper`, `cat-dress` |
| `occ-` | Occasion | `occ-eid`, `occ-winter` |
| `tag-` | Display tag | `tag-new`, `tag-bestseller`, `tag-sale` |
| `gender-` | Optional | `gender-girls`, `gender-boys`, `gender-unisex` |

Multiple prefixes per post. Collection pages use Blogger's `/search/label/<label>` URL pattern.

### 8.5 Theme settings (Blogger Layout > Theme settings)
Stage 5 will expose these as `<Variable>` declarations editable in the Blogger UI — no code edit needed:
- `whatsappNumber` (e.g., `+8801XXXXXXXXX`)
- `currency` (`BDT`)
- `freeShippingThreshold` (`1990`)
- `dhakaDeliveryDays` (`1-2`)
- `outsideDhakaDays` (`3-5`)
- `instagramHandle` (`@skyoutfit`)
- `facebookUrl`
- `addressLine`
- `featureFlags` (`{ "sale": false, "newsletter": true }`)

### 8.6 Page templates (Stage 5 will produce one each)
- `index` — homepage (static homepage widget + dynamic feeds)
- `item` — single post (PDP for products, blog post for journal)
- `static_page` — Blogger Pages (about, shipping, etc.)
- `archive` — search results, label pages
- `error_page` — 404

The same `components.css` and same JS modules serve all five.

### 8.7 Feed-driven sections
Homepage rails (New Arrivals, Best Sellers) are populated by Blogger feed widgets in Stage 5:
```
<b:widget type='FeaturedPost' ...>     (server-side)
  <b:loop var='post' values='data:posts'>
    {render product card from post fields}
  </b:loop>
</b:widget>
```

The card rendering reads price/sizes from the PDB by fetching the post HTML and extracting the JSON via regex client-side OR by relying on standardized post excerpt format. Stage 5 picks the lighter approach (excerpt-based) with PDB as the authoritative source on the PDP itself.

---

## 9. What Ships in `/src/` This Stage

The remainder of this commit adds:

- `src/css/tokens.css`
- `src/css/reset.css`
- `src/css/base.css`
- `src/css/layout.css`
- `src/css/components.css`
- `src/css/utilities.css`
- `src/js/main.js`
- `src/js/modules/store.js`
- `src/js/modules/cart.js`
- `src/js/modules/drawer.js`
- `src/js/modules/product.js`
- `src/js/modules/whatsapp.js`
- `src/js/modules/observer.js`
- `src/js/modules/menu.js`
- `src/js/modules/search.js`
- `src/icons.svg` (sprite)
- `src/index.html` (homepage reference)
- `src/product.html` (PDP reference)

These files are **standalone-runnable** in any static server. They contain the full visual system, working cart, working WhatsApp checkout, working PDP hydration, and every component from the 25-cap list.

---

## 10. Decisions locked into Stage 5

1. **One `components.css` file** → maps directly to `<b:skin>` block, no concatenation step.
2. **Theme settings list (8.5)** → maps to Blogger `<Variable>` declarations.
3. **Product Data Block schema** → editor template + JS parser contract.
4. **Label prefix taxonomy** → drives `<b:loop>` filters.
5. **Custom event vocabulary** → no Blogger-specific JS rewrites needed.
6. **Page-template list (8.6)** → 5 `<b:if cond="data:view.is...">` branches.
7. **CSS cascade order** → fixed `<link>` order in `<head>`, replicated as inline `<style>` blocks in XML.
8. **No frameworks, no globals** → Blogger XML compatibility automatic.
9. **WhatsApp deep-link via `wa.me`** → no third-party SDK, no consent banner needed.
10. **`<script type="application/json">` PDB** → Blogger sanitizer-safe, editor-friendly.

---

*End of Stage 4.*
