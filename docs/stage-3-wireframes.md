# SkyOutfit — Stage 3: Wireframes & Layout Planning

> Block-level layout for every key surface. Mobile-first, then desktop upgrades.
> No code, no copy decisions — just placement, hierarchy, and behavior.

Wireframes use ASCII box diagrams. Pixel values reference the Stage 2 token scale.

---

## 1. Wireframe Conventions

```
[ICON]      tappable icon, 44x44 px tap target
[CTA]       button (primary unless noted)
{component} reusable component from Stage 2 list
~~~~~~~     visible divider
░░░░░░░     image / media (with aspect ratio noted)
. . .       implied repetition (carousel, list)
v           scrollable region
<->         horizontal swipe / scroll
[x]         filled (active) state
[ ]         empty (inactive) state
```

**Mobile canvas:** 360 x 800 (sm baseline phone)
**Desktop canvas:** 1280 x 900 (lg baseline)
All measurements are in px unless noted.

---

## 2. Homepage Wireframe — Mobile (360 px)

The homepage is roughly **9–10 viewport heights tall**. Each section earns its scroll.

### 2.1 Top stack — fixed and above-fold

```
+----------------------------------------+ <- viewport top
| Free shipping over BDT 1,990 in Dhaka x| 36 px  announcement-bar
+----------------------------------------+
| =    SkyOutfit              Q    [2]   | 56 px  site-header (sticky)
+----------------------------------------+
|                                        |
|         ░░░░░░░░░░░░░░░░░░░░░          |
|         ░░ HERO IMAGE 16:10 ░░         |
|         ░░ baby + parent  ░░           | ~480 px (75 vh on baseline)
|         ░░░░░░░░░░░░░░░░░░░░░          |
|                                        |
|   eyebrow: NEW SEASON                  |
|   Soft starts. Scandinavian            |
|   essentials for 0-12 years.           |
|                                        |
|   [ Shop New Arrivals -> ]             | 52 px primary CTA
|                                        |
+----------------------------------------+
```

**Section gap below: 48 px (`--sp-7`).** Hero never auto-plays, never carousels — one image, owned.

### 2.2 Featured Categories

```
+----------------------------------------+
|  Shop by age                           | H2, navy
|  4 collections curated for every stage | caption, slate-500
|                                        |
|  +----------+  +----------+            |
|  | ░░░░░░░░ |  | ░░░░░░░░ |            |
|  | Newborn  |  | Infant   |            | tile = 1:1
|  | 0-6m     |  | 6-12m    |            | label overlay bottom-left
|  +----------+  +----------+            |
|  +----------+  +----------+            |
|  | ░░░░░░░░ |  | ░░░░░░░░ |            |
|  | Toddler  |  | Kids     |            |
|  | 1-3y     |  | 4-12y    |            |
|  +----------+  +----------+            |
|                                        |
|  [ View all collections -> ]           | ghost CTA
+----------------------------------------+
```

**Grid:** 2x2, gap 12 px, gutter 16 px. Tile uses `--r-xl` (24 px), gradient overlay 50%.

### 2.3 Trust strip

```
+----------------------------------------+
|   [truck]  [shield]    [refresh]  [*]  |
|   Cash on   100%       7-day      Free | 32 px icons
|   Delivery  Verified   Exchange   Care | 16 px label + 13 px sub
|   in BD     Cotton                Tips |
+----------------------------------------+
```

**Layout:** 4 columns, equal width, no dividers. Background `--c-cloud-200`. Padding 32 / 16. Icons sky-700.

### 2.4 New Arrivals (horizontal scroll)

```
+----------------------------------------+
|  Newest in                             |
|  Soft picks added this week  [View all]|
|                                        |
|  +---------+ +---------+ +-->          |
|  | NEW ░░░ | | NEW ░░░ | | NEW   <->   |
|  | ░░░░░░░ | | ░░░░░░░ | | ░░░         | product cards
|  | ░░░░░░░ | | ░░░░░░░ | | ░░░         | 4:5 image
|  | ░░ (h)  | | ░░ (h)  | | ░░          |
|  +---------+ +---------+ +---          |
|  | Eyebrow | | Eyebrow | |             |
|  | Name    | | Name    | |             |
|  | BDT1290 | | BDT1690 | |             |
|  +---------+ +---------+ +--           |
|                                        |
|  ●●○○○                                 | scroll progress dots
+----------------------------------------+
```

**Scroll mechanics:**
- Card width: 60% viewport (~216 px) — 1.5 cards visible, signaling "scroll me"
- `scroll-snap-type: x mandatory; scroll-snap-align: start`
- 12 px gap between cards
- Progress dots reflect scroll position via JS (one observer)

### 2.5 Editorial / Brand Story

```
+----------------------------------------+
|                                        |
|         ░░░░░░░░░░░░░░░░░              |
|         ░░ 3:2 image  ░░               | macro fabric closeup
|         ░░░░░░░░░░░░░░░░░              |
|                                        |
|  eyebrow: OUR FABRIC                   |
|  Why we chose                          | H2 navy
|  100% combed cotton                    |
|                                        |
|  Two paragraphs of warm body copy      |
|  about softness, breathability, and    | slate-700, lh-loose
|  the choice that protects baby skin.   |
|                                        |
|  [ Read our fabric story -> ]          | secondary CTA
+----------------------------------------+
```

**Mobile:** stacked. **Desktop:** side-by-side, image left 50%.

### 2.6 Best Sellers + Why Trust + Testimonials + Instagram + Journal + Newsletter

These follow the same rhythm — section header (eyebrow + H2 + caption), content, optional CTA, 48 px gap. Detailed specs:

- **Best Sellers** — same layout as New Arrivals (carousel mobile, 4-grid desktop), tag = "Bestseller" navy.
- **Why Parents Trust SkyOutfit** — 4-up grid (2x2 mobile, 4x1 desktop): icon + title + 2-line description.
- **Testimonials** — 3 cards stacked mobile, 3 across desktop. 5-star sun icons + quote + name/city.
- **Instagram** — 3x2 grid mobile, 6x1 strip desktop. Square images with subtle dark hover overlay.
- **Journal teasers** — 3 blog cards stacked mobile, 3-column desktop. 16:9 image + eyebrow + title + meta.
- **Newsletter** — full-width band, cloud-200 bg, single inline form (email + arrow CTA).

### 2.7 Footer

```
+----------------------------------------+
|  Stay in the soft lane                 | H3
|  +--------------------------+          |
|  | your@email.com           | [->]     | inline newsletter
|  +--------------------------+          |
|                                        |
|  --------------------------------      |
|                                        |
|  SkyOutfit                             | logo + tagline
|  Dhaka, Bangladesh                     |
|                                        |
|  + Shop                                | accordion sections
|  + Help                                | on mobile (collapsed)
|  + About                               |
|  + Connect                             |
|                                        |
|  --------------------------------      |
|                                        |
|  [bKash] [Nagad] [Rocket] [COD]        |
|  [Visa]  [MC]                          |
|                                        |
|  --------------------------------      |
|                                        |
|  (c) 2026 SkyOutfit . Privacy . Terms  | 13 px slate-500
+----------------------------------------+
```

### 2.8 Mobile bottom navigation (fixed across all pages)

```
+----------------------------------------+ <- bottom of viewport
|  [home]  [shop]  [Q]  [bag(2)] [user]  | 64 px + safe-area
|  Home    Shop    Search   Bag   Account|
|  [x]___                                | active indicator (sky underline 2px)
+----------------------------------------+
                                          <- above this: WhatsApp FAB
                                            56x56, sun fill, navy icon
                                            16 px from edge, 80 px from bottom
                                            (above tab bar)
```

---

## 3. Homepage Wireframe — Desktop (1280 px)

### 3.1 Header (sticky, 80 px tall)

```
+----------------------------------------------------------------+
|                                                                |
|  SkyOutfit       Shop v  Journal  About  Help    Q  user  bag  |
|                                                                |
+----------------------------------------------------------------+
                  ^
          mega-menu trigger (hover or focus)
```

### 3.2 Mega-menu (Shop hover)

```
+----------------------------------------------------------------+
|                                                                |
|  By Age           By Category        By Occasion       |       |
|  ---------        ---------          ---------         | promo |
|  Newborn          Bodysuits          Eid Edit          | ░░░░░ |
|  Infant           Dresses            Winter Warmth     | image |
|  Toddler          Tops               Photoshoot        | ░░░░░ |
|  Kids             Bottoms            Everyday Soft     |       |
|  Junior           Sets               Sale Edit         | "New  |
|                   Sleepwear                            | Eid   |
|                   Accessories                          | Edit" |
|                                                        |  ->   |
+----------------------------------------------------------------+
```

3 columns of links + 1 promotional column with image and CTA. Width: container (1200 max). Padding: 32. Drops on hover-capable devices, opens on click for keyboard.

### 3.3 Hero (desktop, 21:9, side-by-side)

```
+----------------------------------------------------------------+
|                                                                |
|  eyebrow: NEW SEASON                ░░░░░░░░░░░░░░░░░          |
|                                     ░░░░░░░░░░░░░░░░░          |
|  Soft starts.                       ░░░░░░░░░░░░░░░░░          |
|  Scandinavian essentials            ░░ baby + parent ░░         |
|  for 0-12 years.                    ░░  21:9 image  ░░          |
|                                     ░░░░░░░░░░░░░░░░░          |
|  Body copy ~25 words about          ░░░░░░░░░░░░░░░░░          |
|  softness, calm, certainty.         ░░░░░░░░░░░░░░░░░          |
|                                                                |
|  [ Shop New Arrivals -> ]                                      |
|                                                                |
+----------------------------------------------------------------+
            split: 5 cols copy / 7 cols image (12-col grid)
```

### 3.4 Product grids (desktop)

- New Arrivals: **4 cards across**, 24 px gap, no horizontal scroll
- Best Sellers: **4 cards across**, "View all" linked
- Category grid: **4 across in a single row** (was 2x2 on mobile)
- Instagram: **6 across in single row** (was 3x2 on mobile)
- Footer: **4 columns** with full sitemap visible (no accordion)

### 3.5 No bottom tab bar on desktop. The header is sufficient. WhatsApp FAB remains visible on desktop (bottom-right, 24 px from edges, 56x56 px).

---

## 4. Section Hierarchy (canonical pattern)

Every content section follows this 5-part vertical pattern:

```
+------------------------------------+
|  EYEBROW  (12 px, all-caps, slate) |  <- what kind of section
|  Section title (H2, navy)          |  <- the promise
|  Caption / supporting line         |  <- why care, optional
|                                    |
|  ░░ CONTENT (cards, image, etc.) ░░|  <- the substance
|                                    |
|  [ Optional CTA -> ]               |  <- where to go next
+------------------------------------+
       ^                          ^
   24 px top                  24 px bottom
   padding inside section
```

**Section padding:** 48 px top + 48 px bottom on mobile, 80 / 80 on desktop.
**Section gap:** there is *no extra gap*. The 48 px padding on adjacent sections handles it. We don't double-stack.

---

## 5. Spacing Behavior (cross-section)

### 5.1 Mobile vertical rhythm (top to bottom)

| Boundary | Gap |
|---|---|
| Header bottom edge -> first section top | 0 (sections own their padding) |
| Section top padding | 48 px |
| Eyebrow -> H2 | 8 px |
| H2 -> caption | 8 px |
| Caption -> content | 24 px |
| Content -> CTA | 24 px |
| CTA -> section bottom padding | 48 px |
| Section -> next section | 0 (handled by padding) |

### 5.2 Inside grids and cards

| Pair | Gap |
|---|---|
| Card image -> text block | 12 px |
| Card name -> price | 8 px |
| Price -> old price (horizontal) | 8 px |
| Eyebrow -> name | 4 px |
| Adjacent cards (grid) | 12 px mobile / 24 px desktop |
| Form label -> input | 4 px |
| Input -> helper / error | 4 px |
| Form fields stack | 16 px |

### 5.3 Edge handling
- No content touches the viewport edge on any breakpoint.
- Mobile: 16 px side gutter is *outside* the section's own padding — applied at the container level, so a section's background still extends edge-to-edge.

```
viewport edge
|
| <- 16 px gutter
|
|   ░░ section content ░░
|
| <- 16 px gutter
|
viewport edge

  but: section background (e.g., cloud-200) extends 0 -> 100 vw
```

---

## 6. Product Grid Layout

### 6.1 Card dimensions across breakpoints

| Breakpoint | Cards/row | Card width formula | Approx width @ container |
|---|---|---|---|
| < 480 (default) | 2 | `(100% - gutter*2 - gap) / 2` | ~158 px @ 360 |
| 480–767 | 2 | same | ~218 px @ 480 |
| 768–1023 | 3 | `(100% - gutter*2 - gap*2) / 3` | ~236 px @ 768 |
| 1024–1279 | 4 | `(100% - gutter*2 - gap*3) / 4` | ~226 px @ 1024 |
| >= 1280 | 4 | within `--w-content` 1200 | ~270 px |

### 6.2 Card height behavior
- Image area locked by `aspect-ratio: 4/5` — never shifts.
- Text area: name uses `-webkit-line-clamp: 2` (always reserves 2 lines of space, even if title is short — keeps grid aligned).
- Total card height equal across the row, achieved by `align-items: stretch` on the grid and `display: flex; flex-direction: column` on the card.

### 6.3 Carousel vs grid choice
| Surface | Mobile | Desktop |
|---|---|---|
| New Arrivals | Carousel <-> | Grid (4 cards) |
| Best Sellers | Carousel <-> | Grid (4 cards) |
| Related on PDP | Carousel <-> | Carousel (4 visible) |
| Search results | Grid (2 col) | Grid (4 col) |
| Category page | Grid (2 col) | Grid (3–4 col) |

Rule: **carousels for curated/finite sets, grids for browse/infinite**. Carousels show 1.5–1.7 cards to signal scrollability.

### 6.4 Filtering and sort (category page)

```
mobile:                          desktop:
+----------------------+         +---------------------------------+
| Category Title       |         | Breadcrumb home / shop / dresses|
| 24 items             |         |                                 |
|                      |         | Category Title         24 items |
| [Filter]   Sort: v   | sticky  |                                 |
|                      |         | +------+  +-----------------+   |
| ░░ chips: New, Sale… |         | |Filter|  | Sort: v         |   |
|                      |         | |Side  |  +-----------------+   |
| +------+ +------+    |         | |Bar   |  | +--+ +--+ +--+ |   |
| | card | | card |    |         | |      |  | |c | |c | |c | |   |
| +------+ +------+    |         | | [Age]|  | +--+ +--+ +--+ |   |
| +------+ +------+    |         | | [Cat]|  | +--+ +--+ +--+ |   |
| | card | | card |    |         | | [Occ]|  | |c | |c | |c | |   |
| +------+ +------+    |         | |      |  | +--+ +--+ +--+ |   |
|                      |         | +------+  +-----------------+   |
| [ Load more ]        |         |                                 |
+----------------------+         +---------------------------------+
       ^                                    ^
   filter opens as              persistent left sidebar
   bottom sheet drawer          ~240 px wide
```

**Mobile filter** opens as a full-height bottom sheet (the cart drawer pattern, but from bottom). **Apply** button at bottom is sticky.

---

## 7. Cart Drawer UX

### 7.1 Anatomy

```
+---------------------------------+
|  Your bag (2)              x    | 64 px header, sticky
+---------------------------------+
|                                 |
|  +------+ Soft Cotton Romper    | 80x100 image
|  | ░░░░ | Size: 6-12m           | + name + meta
|  | ░░░░ | BDT 1,290             |
|  +------+ [-] 1 [+]      x      | qty stepper + remove
|                                 |
|  ---------------------------    |
|                                 |
|  +------+ Linen Daydress        |
|  | ░░░░ | Size: 1-2y            |
|  | ░░░░ | BDT 1,690             |
|  +------+ [-] 1 [+]      x      |
|                                 |
|  ---------------------------    |
|                                 | v scrollable region
|                                 |
+---------------------------------+
|  Subtotal              BDT 2,980| 56 px summary, sticky bottom
|  Delivery shown after WhatsApp  | 13 px slate-500
|                                 |
|  [ Order on WhatsApp ->     ]   | xl primary
|                                 |
|  Continue shopping              | ghost link
+---------------------------------+
```

### 7.2 Drawer behavior
- **Open trigger:** any "Add to bag" button + cart icon tap.
- **Mobile width:** 100% (full screen). **Desktop width:** 420 px (lg), 480 px (xl).
- **Slide direction:** from right.
- **Backdrop:** semi-transparent navy overlay (`rgba(15,39,66,0.5)`) blocking scroll, dismissible by tap.
- **Animation:** 240 ms `--ease-soft` slide; backdrop fades in same duration.
- **Focus management:** focus moves to close button on open; trap inside drawer; restore to opener on close.
- **Body scroll lock** while open.
- **Esc closes** on desktop. Swipe-right closes on mobile (gesture detection in JS).

### 7.3 Empty state

```
+---------------------------------+
|  Your bag                  x    |
+---------------------------------+
|                                 |
|         ░░░░░░░░                | small illustration
|         ░░░░░░░░                | (linear, soft, brand SVG)
|                                 |
|       Looks quiet here.         | H3
|   Soft picks for any moment.    | caption
|                                 |
|   +----+ +----+ +----+ +----+   | 4 best-seller compact cards
|   | p  | | p  | | p  | | p  |   | horizontal scroll
|   +----+ +----+ +----+ +----+   |
|                                 |
|   [ Shop new arrivals -> ]      | primary CTA
+---------------------------------+
```

### 7.4 Cart line item rules
- Quantity stepper: tap targets 36x36, with 8 px gaps; `aria-live="polite"` announces "Quantity 2 of Soft Cotton Romper".
- Removing: the row gets a 240 ms slide-out + opacity fade, then collapses height. Toast confirms with an "Undo" link (kept for 5s).
- If the only item is removed, drawer transitions to empty state.
- Size cannot be changed inside the drawer (that requires intent — go back to PDP). Tapping the product name reopens the PDP.

### 7.5 WhatsApp message templating (final shape, implemented Stage 5)

```
Hi SkyOutfit, I want to order:

1) Soft Cotton Romper
   Size: 6-12m
   Qty: 1
   Price: BDT 1,290
   Link: skyoutfit.com/p/soft-cotton-romper

2) Linen Daydress
   Size: 1-2y
   Qty: 1
   Price: BDT 1,690
   Link: skyoutfit.com/p/linen-daydress

Subtotal: BDT 2,980

My details:
Name:
Phone:
Address:
Payment: bKash / Nagad / Rocket / Cash on Delivery
```

Line breaks use `%0A` URL-encoded; the message is built client-side and opens via `https://wa.me/<number>?text=...`.

---

## 8. Footer Architecture

### 8.1 Mobile footer (collapsed accordions)

```
+----------------------------------------+
|  Stay in the soft lane                 |
|  Email + arrow inline                  |
|                                        |
|  -------------------------             |
|                                        |
|  SkyOutfit                             |
|  House 12, Road 4, Banani, Dhaka 1213  |
|  Bangladesh                            |
|                                        |
|  + Shop                          v     | accordion (closed by default)
|  -------------------------             |
|  + Help                          v     |
|  -------------------------             |
|  + About                         v     |
|  -------------------------             |
|  + Connect                       v     |
|  -------------------------             |
|                                        |
|  We accept                             |
|  [bKash] [Nagad] [Rocket] [COD]        |
|  [Visa]  [Mastercard]                  |
|                                        |
|  -------------------------             |
|                                        |
|  (c) 2026 SkyOutfit . Privacy . Terms  |
|  Made with care in Bangladesh          |
+----------------------------------------+
```

### 8.2 Desktop footer (4 columns expanded)

```
+----------------------------------------------------------------+
|  Stay in the soft lane                                         |
|  +-----------------------------------------+                   |
|  | your@email.com                          | [Subscribe ->]    |
|  +-----------------------------------------+                   |
|  Soft notes, no spam.                                          |
|                                                                |
|  ----------------------------------------------------------    |
|                                                                |
|  Shop          Help            About          Connect          |
|  ----          ----            -----          -------          |
|  Newborn       Shipping        Our story      Instagram        |
|  Infant        Returns         Fabric         Facebook         |
|  Toddler       FAQ             Sustainability TikTok           |
|  Kids          Size guide      Press          WhatsApp         |
|  All products  Contact         Wholesale      hello@...        |
|                                                                |
|  ----------------------------------------------------------    |
|                                                                |
|  SkyOutfit                                                     |
|  House 12, Road 4, Banani, Dhaka 1213, Bangladesh              |
|                                                                |
|  We accept   [bKash] [Nagad] [Rocket] [COD] [Visa] [MC]        |
|                                                                |
|  ----------------------------------------------------------    |
|                                                                |
|  (c) 2026 SkyOutfit . Privacy . Terms . Made in Bangladesh     |
+----------------------------------------------------------------+
```

### 8.3 Footer rules
- Accordion items start *closed* on mobile to keep the page exit short.
- Newsletter is the **first** element in the footer — high intent capture before users scroll into the link list.
- The address is a real address, not just a city. Trust signal.
- "Made with care in Bangladesh" is a one-line cultural anchor — local pride without being touristy.
- Social icons live in their own column (Connect), not in the bottom strip — they earn space.

---

## 9. Product Detail Page (PDP) Structure

This is the most important page in the system. Every layout decision is justified by the conversion psychology in Stage 1.

### 9.1 PDP — Mobile structure (top to bottom)

```
+----------------------------------------+
| =   SkyOutfit              Q    [2]    | standard header
+----------------------------------------+
|  home / shop / dresses / linen daydress| breadcrumb 13 px
+----------------------------------------+
|                                        |
|   ░░░░░░░░░░░░░░░░░░░░░░░░░░░          |
|   ░░ MAIN PRODUCT IMAGE 4:5  ░░         | swipeable gallery
|   ░░░░░░░░░░░░░░░░░░░░░░░░░░░          | (main image first)
|                                        |
|   ●●●○○○                               | slide indicator
|                                        |
|   [t][t][t][t][t][t]                   | thumbnail strip <->
+----------------------------------------+
|                                        |
|   eyebrow: BODYSUITS . NEW             |
|   Soft Cotton Romper                   | H1 navy
|   BDT 1,290   BDT 1,490                | price + old price
|   * 4.8 (124 reviews)  optional        |
|                                        |
|   Size                                 |
|   [ ] 0-6m  [ ] 6-12m [ ] 1-2y [x] 2-3y| chips
|   [ ] 3-4y                              |
|                                        |
|   [ Size guide ]                       | ghost link, opens modal
|                                        |
|   Quantity   [-] 1 [+]                 | stepper                                        |
+----------------------------------------+
|  [truck] Dhaka 1-2 days . Out 3-5 days | trust line 1
|  [refresh]  7-day exchange on unworn   | trust line 2
|  [card] bKash . Nagad . Rocket . COD   | pay-with strip
+----------------------------------------+
|                                        |
|   Why parents love it                  | H3
|   3-4 sentences of warm copy. Fabric.  | slate-700
|   Comfort. Care. Why we made it.       |
|                                        |
|   -- Fabric --                         | structured detail
|   100% combed cotton, 220 GSM          |
|   OEKO-TEX Standard 100 certified      |
|                                        |
|   -- Care --                           |
|   Wash cold. Tumble low. No bleach.    |
|                                        |
|   -- Made in --                        |
|   Sourced and stitched in Bangladesh   |
|                                        |
+----------------------------------------+
|                                        |
|   Questions parents ask                | H3 collapsible FAQ
|   + Will the size shrink?         v    |
|   + How is delivery handled?      v    |
|   + Can I pay COD?                v    |
|                                        |
+----------------------------------------+
|                                        |
|   You may also like                    | related rail <->
|   +----+ +----+ +----+ +--             |
|   |card| |card| |card| |ca<->          |
|   +----+ +----+ +----+ +--             |
|                                        |
+----------------------------------------+
|  {site footer}                         |
+----------------------------------------+

  ^ above bottom tab + WhatsApp FAB:
  +----------------------------------------+
  |  (h)    [ Add to bag ]    [ WhatsApp ] | 56 px sticky PDP action bar
  +----------------------------------------+  appears once user scrolls past hero gallery
```

### 9.2 PDP — Sticky action bar behavior
- **Hidden** until the user scrolls past the inline "Add to bag / Quantity" block.
- **Slides up** with `--dur-base` ease-soft.
- **Hides** again if user scrolls back up to where the inline buttons are visible (avoids stacking duplicate CTAs).
- Sits at z-index `--z-pdp-bar` (210), above the bottom tab bar.

### 9.3 PDP — Desktop structure

```
+----------------------------------------------------------------+
| {header}                                                       |
+----------------------------------------------------------------+
| home / shop / dresses / linen daydress                         |
+----------------------------------------------------------------+
|                                                                |
|  +--- 7 cols ----+    +---- 5 cols ----+                       |
|  |               |    | eyebrow         |                      |
|  |  +---------+  |    | Product Name    |                      |
|  |  |░░ Main ░|  |    | BDT 1,290 1,490 |                      |
|  |  |░ image ░|  |    | * 4.8 (124)     |                      |
|  |  +---------+  |    |                 |                      |
|  |               |    | Size            |                      |
|  |  [t][t][t]    |    | chips chips     |                      |
|  |  thumb strip  |    | [Size guide]    |                      |
|  |  on left      |    |                 |                      |
|  |  (vertical)   |    | Quantity stepper|                      |
|  |               |    |                 |                      |
|  |               |    | [Add to bag  ]  |                      |
|  |               |    | [WhatsApp -> ]  |                      |
|  |               |    |                 |                      |
|  |               |    | -- trust strip -|                      |
|  |               |    | delivery / ret  |                      |
|  |               |    | [pay-with row]  |                      |
|  +---------------+    +-----------------+                      |
|                                                                |
|  -------- full width below --------                            |
|  Description / Fabric / Care sections (no tabs)                |
|  Reviews snapshot                                              |
|  Related products grid (4 across)                              |
|  ----------------------------------                            |
|                                                                |
| {footer}                                                       |
+----------------------------------------------------------------+
```

- **Image column sticky** until the description section starts (right column scrolls past, image stays).
- **No sticky action bar on desktop** — the inline buttons are always visible because the right column is sticky-readable.

### 9.4 PDP gallery rules
- Mobile: swipeable carousel with snap, indicator dots, optional pinch-to-zoom on a single tap (modal opens).
- Desktop: vertical thumbnail strip on left (32 px wide thumbs, 4 px gap), main image right. Click thumb to swap. Hover thumb to preview (no auto-swap).
- All images preloaded for the first 2; rest lazy-loaded.

### 9.5 PDP — content data block
A hidden `<script type="application/json" data-product>` block at the top of the post body (parsed by JS) contains:
```
{
  "price": 1290,
  "oldPrice": 1490,
  "sizes": [
    { "label": "0-6m", "available": true },
    { "label": "6-12m", "available": true },
    { "label": "1-2y", "available": false }
  ],
  "fabric": "100% combed cotton, 220 GSM",
  "care": "Wash cold. Tumble low.",
  "madeIn": "Bangladesh",
  "tags": ["new", "bestseller"],
  "ageRange": "0-3y"
}
```
The JS parses, hydrates the size selector, builds the WhatsApp message. **This is what makes Blogger feel like a real PIM.** Specified fully in Stage 4.

---

## 10. Blog Structure

### 10.1 Blog index — Mobile

```
+----------------------------------------+
| {header}                               |
+----------------------------------------+
|  eyebrow: JOURNAL                      |
|  Notes for new parents                 | H1
|  Soft reads on fabric, care, and the   | caption slate
|  early years.                          |
|                                        |
|  Categories                            |
|  [All][Tips][Fabric][Seasonal] <->     | chips, scrollable
|                                        |
|  +--------------------------------+    |
|  | ░░░░░░ HERO IMAGE 16:9 ░░░░░░  |    | featured post
|  | eyebrow: PARENTING TIPS        |    |
|  | How to dress a newborn         |    | H3 navy
|  | in winter without overheating  |    |
|  | 6 min read . May 12, 2026      |    | caption
|  +--------------------------------+    |
|                                        |
|  +--------------------------------+    | subsequent posts
|  | ░░ 16:9 ░░                     |    | stacked
|  | eyebrow / title / meta         |    |
|  +--------------------------------+    |
|  +--------------------------------+    |
|  | ░░ 16:9 ░░                     |    |
|  | ...                            |    |
|  +--------------------------------+    |
|                                        |
|  [ Load older notes ]                  |
+----------------------------------------+
```

### 10.2 Blog index — Desktop
- Hero post: full container width (1200), 21:9 image, big H2.
- Subsequent posts: **3-column grid**, blog teaser cards (16:9 image + title + meta).
- Optional sidebar (right, 320 px): "Popular notes" + newsletter capture. Hidden on mobile.

### 10.3 Blog post structure — Mobile

```
+----------------------------------------+
| {header}                               |
+----------------------------------------+
|  home / journal / parenting tips       | breadcrumb
|                                        |
|  eyebrow: PARENTING TIPS               |
|                                        |
|  How to dress a newborn                | H1, navy, lh-tight
|  in winter without overheating         |
|                                        |
|  -----                                 |
|  by Tasnim Akhter . 6 min . May 12     | author + meta
|  -----                                 |
|                                        |
|  +--------------------------------+    |
|  | ░░░░ HERO 16:9 ░░░░             |    |
|  +--------------------------------+    |
|                                        |
|  Lede paragraph — slightly larger      |
|  type (18 px), slate-700, lh-loose.    |
|                                        |
|  Body copy. 16 px. Max width 65ch.     |
|  Generous paragraph spacing (24 px).   |
|                                        |
|  ## Subheadings (H2, 24 px navy)       |
|                                        |
|  +- pull quote ------------------+     |
|  | "Babies don't sweat as well   |     |
|  |  as adults do."               |     |
|  +-------------------------------+     |
|                                        |
|  More body. Inline links sky-700       |
|  with subtle underline.                |
|                                        |
|  +---------------------------+         | in-content product card
|  | +---+ Soft cotton romper  |         | horizontal compact card
|  | |░░| Recommended for this |         |
|  | +---+ season BDT 1,290 -> |         |
|  +---------------------------+         |
|                                        |
|  More body...                          |
|                                        |
|  -- share --                           |
|  [Facebook] [Twitter] [Copy link]      | inline share row
|                                        |
|  -- about author --                    |
|  [avatar] Tasnim Akhter                |
|  Mother of two, parenting writer.      |
|                                        |
|  -- related notes --                   |
|  3 blog teaser cards stacked           |
|                                        |
|  -- newsletter inline --               |
|  Stay in the soft lane.                |
|  email + subscribe                     |
|                                        |
+----------------------------------------+
```

### 10.4 Blog reading column rules
- **Max width 720 px** (`--w-narrow`) on desktop — readability over full-bleed.
- **Body: 18 px** (slightly larger than UI body) for sustained reading.
- **Line-height loose (1.75).**
- **Paragraph gap: 24 px.**
- **Subheadings break the column visually** with 32 px top space, 16 px bottom.
- **Inline images** centered, max width 100% of column, captions in 13 px italic slate-500.

### 10.5 In-content product card
A reuse of the **compact product card** component, no new shape. Embedded by author via a Blogger custom HTML block referencing a product post URL. JS hydrates from the linked post's data block. This keeps blog -> product conversion seamless without the author needing to know HTML.

### 10.6 Blog SEO scaffold (defined here, implemented Stage 5)
- `<article>` with `itemscope itemtype="BlogPosting"` (microdata) AND JSON-LD for redundancy
- `headline`, `image`, `datePublished`, `dateModified`, `author`, `publisher`
- Open Graph + Twitter card on every post
- Reading time calculated from word count (200 wpm)

---

## 11. Stage 3 — Decisions locked into Stage 4

Inputs to the Front-End Structure stage:

1. **Product card grid math** (2/2/3/4/4) drives the CSS grid implementation.
2. **Sticky PDP action bar with scroll-based show/hide** drives a dedicated `IntersectionObserver` setup.
3. **Drawer with focus trap, Esc, swipe-right close, body-scroll lock** drives the cart drawer JS module.
4. **Product `<script type="application/json" data-product>` block** is the contract between Blogger post body and JS hydration.
5. **WhatsApp message template** drives the cart-to-WhatsApp builder function.
6. **Mega-menu hover/click duality** drives the navigation JS (hover for pointer, click for keyboard/touch).
7. **Mobile filter as bottom sheet** drives the second drawer pattern (right slide for cart, bottom slide for filter — same primitive, different anchor).
8. **Section padding 48/80** drives the layout primitive `.section` class.
9. **Footer accordions on mobile, expanded on desktop** drives the disclosure component.
10. **In-content product cards via JS hydration from linked post URL** drives the related-products fetcher (one Blogger feed JSON request, cached in localStorage).

---

*End of Stage 3.*
