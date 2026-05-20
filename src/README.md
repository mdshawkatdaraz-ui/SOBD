# SkyOutfit — Source Tree

Standalone HTML/CSS/JS that powers the brand. Stage 5 wraps these files as a Blogger XML theme; until then they are runnable in any static file server.

## Run locally

```
# from /SOBD
python3 -m http.server 8080 --directory src
# then open http://localhost:8080/index.html
```

## Files

| File | Purpose |
|---|---|
| `index.html` | Homepage reference template |
| `product.html` | PDP reference template |
| `icons.svg` | SVG sprite (referenced via `<use href="#icon-name">`) |
| `css/tokens.css` | Design tokens — `:root` only |
| `css/reset.css` | Modern CSS reset |
| `css/base.css` | Body, typography, focus defaults |
| `css/layout.css` | `.container`, `.section`, `.grid` primitives |
| `css/components.css` | All 25 components |
| `css/utilities.css` | Single-purpose helpers |
| `js/main.js` | Entry — wires modules |
| `js/modules/store.js` | Versioned localStorage wrapper |
| `js/modules/cart.js` | Cart state + pub/sub |
| `js/modules/drawer.js` | Drawer primitive (cart, menu, filter) |
| `js/modules/product.js` | PDP hydration from data block |
| `js/modules/whatsapp.js` | WhatsApp message builder |
| `js/modules/observer.js` | Section reveal IntersectionObserver |
| `js/modules/menu.js` | Mobile + desktop menu |
| `js/modules/search.js` | Search overlay |

## Conventions

- BEM-lite: `.c-block`, `.c-block__el`, `.c-block--mod`, `.is-state`
- Prefixes: `c-` component, `u-` utility, `js-` JS hook (no styling)
- Mobile-first media queries (`min-width` only)
- All values via tokens — no hex, no magic numbers
- ES modules, named exports, no globals on `window`
- Custom events on `document` for cross-module communication
