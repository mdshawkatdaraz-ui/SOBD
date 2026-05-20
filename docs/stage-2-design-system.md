# SkyOutfit — Stage 2: Design System

> The atomic vocabulary every screen will speak.
> Token-first. Mobile-first. Performance-first.

This document defines tokens and standards only. No CSS, no XML — those land in Stages 4 and 5. Token names use the same identifiers we will compile to CSS custom properties later, so design and engineering share one language.

---

## 1. Color System

### 1.1 Brand foundation
Four anchor colors only. Everything else is a tint, shade, or alpha of these.

| Role | Token | Hex | OKLCH (approx) | Use |
|---|---|---|---|---|
| Primary | `--c-sky` | `#7CC2E8` | `oklch(80% 0.09 235)` | Brand identity, links, focus rings, active tab |
| Secondary | `--c-navy` | `#0F2742` | `oklch(25% 0.07 255)` | Text, headings, borders, authority surfaces |
| Accent | `--c-sun` | `#E8B86B` | `oklch(80% 0.12 80)` | Primary CTA, sale highlight, key icons |
| Neutral | `--c-cloud` | `#FAFAFA` | `oklch(98% 0 0)` | Page background, card bg, generous whitespace |

> The four anchors are deliberately desaturated. Sky Blue is a *cloudy* sky, not a Crayola sky. Navy is a *midnight* navy, not a navy-blue uniform. Sun is *late-afternoon* gold, not a marigold. Cloud is *off*-white, not pure `#FFF`.

### 1.2 Full neutral ramp (Cloud + Slate)
Used for backgrounds, dividers, body copy, captions.

| Token | Hex | Use |
|---|---|---|
| `--c-cloud-50` | `#FFFFFF` | True white (used only for cards on tinted backgrounds) |
| `--c-cloud-100` | `#FAFAFA` | Page bg |
| `--c-cloud-200` | `#F2F4F7` | Section bg, soft separators |
| `--c-cloud-300` | `#E6E9EF` | Card border, hairline dividers |
| `--c-slate-400` | `#9AA4B2` | Disabled text, placeholder |
| `--c-slate-500` | `#697586` | Captions, meta, eyebrow text |
| `--c-slate-600` | `#4A5568` | Secondary body text |
| `--c-slate-700` | `#2D3748` | Body text (preferred over pure navy for paragraphs) |
| `--c-slate-900` | `#0F2742` | = `--c-navy`, headings |

### 1.3 Sky tints (primary scale)
| Token | Hex | Use |
|---|---|---|
| `--c-sky-50` | `#F0F8FD` | Hover background on light surfaces |
| `--c-sky-100` | `#DBEEF8` | Selected chip background |
| `--c-sky-200` | `#B6DCF1` | Subtle highlight, active size chip |
| `--c-sky-500` | `#7CC2E8` | = `--c-sky`, primary brand |
| `--c-sky-600` | `#4FA8D6` | Hover state on primary |
| `--c-sky-700` | `#357FA8` | Pressed / focus ring on dark bg |

### 1.4 Sun tints (accent scale)
| Token | Hex | Use |
|---|---|---|
| `--c-sun-100` | `#FBEFD8` | Sale tag background, soft highlight |
| `--c-sun-500` | `#E8B86B` | = `--c-sun`, primary CTA fill |
| `--c-sun-600` | `#C99947` | Primary CTA hover |
| `--c-sun-700` | `#A57930` | Primary CTA pressed |

### 1.5 Semantic colors (used sparingly)
| Token | Hex | Use |
|---|---|---|
| `--c-success` | `#3F9A6B` | "In stock", confirmation toast |
| `--c-warning` | `#C99947` | "Low stock" (≤ 3) — note: same as `--c-sun-600` for palette discipline |
| `--c-error` | `#C25450` | Form validation, "Out of stock" |
| `--c-info` | `--c-sky-700` | Informational toast |

> Reds are deliberately desaturated and warm-leaning. We never use a fire-engine red.

### 1.6 Color application rules

1. **Three-color cap per section.** Counted as: text + bg + 1 accent. Never 4.
2. **Sun is reserved.** Only primary CTA, sale highlight, and 1 brand icon may use it. If everything is highlighted, nothing is.
3. **Navy for authority, never decoration.** Use it on headings, footer, and structural lines — not on backgrounds or buttons.
4. **Cloud over white.** Default page bg is `--c-cloud-100`, not `#FFF`. True white is reserved for product cards on tinted sections.
5. **Sky for trust.** Primary brand interactions (links, focus, "selected" state) all use Sky. Builds subliminal brand recall.
6. **Contrast minimums (WCAG 2.2 AA):**
   - Body text on bg: ≥ 4.5:1 (use `--c-slate-700` on `--c-cloud-100` → ~9.4:1 ✅)
   - Large text / headings: ≥ 3:1
   - UI components / focus rings: ≥ 3:1
   - Sun on Cloud-100: ~2.8:1 → **never use Sun for text**, only for fills with dark text on top

### 1.7 Dark mode
**Out of scope for v1.** Tokens are namespaced (`--c-…`) so a `[data-theme="dark"]` override can be added later without touching components.

---

## 2. Typography System

### 2.1 Type families
One typeface family. Two weights. One numeric tabular variant for prices.

| Role | Family | Weights | Source |
|---|---|---|---|
| Primary (UI + body + headings) | **Inter** | 400 (Regular), 600 (SemiBold) | Google Fonts, self-hosted woff2, `font-display: swap` |
| Numeric (prices) | Inter (with `font-feature-settings: "tnum" 1, "ss01" 1`) | 600 | Same file, no extra payload |
| Bangla (when needed) | **Hind Siliguri** | 400, 600 | Google Fonts, loaded only on pages that include Bangla text |

> One family enforces brand calm. Two weights forces hierarchy through *size and color*, not weight clutter. Hind Siliguri pairs visually with Inter because both are humanist and have similar x-height.

### 2.2 Type scale (modular, base 16, ratio 1.25 — Major Third)

| Token | Mobile (rem / px) | Desktop (rem / px) | Use |
|---|---|---|---|
| `--fs-display` | 2.25 / 36 | 3.5 / 56 | Hero headline only |
| `--fs-h1` | 1.75 / 28 | 2.5 / 40 | Page titles |
| `--fs-h2` | 1.5 / 24 | 2 / 32 | Section headlines |
| `--fs-h3` | 1.25 / 20 | 1.5 / 24 | Card titles, sub-sections |
| `--fs-h4` | 1.125 / 18 | 1.25 / 20 | Compact card titles |
| `--fs-body` | 1 / 16 | 1 / 16 | Paragraphs, default |
| `--fs-body-sm` | 0.9375 / 15 | 0.9375 / 15 | Dense text, captions in lists |
| `--fs-caption` | 0.8125 / 13 | 0.8125 / 13 | Meta, helper text |
| `--fs-eyebrow` | 0.75 / 12 | 0.75 / 12 | All-caps labels, tracking 0.08em |
| `--fs-price` | 1.125 / 18 | 1.25 / 20 | Product price (always SemiBold + tabular) |
| `--fs-price-lg` | 1.5 / 24 | 1.75 / 28 | PDP price |

> Body stays at 16px on both mobile and desktop. Bangladesh users on mid-range Androids depend on this — anything smaller forces zoom.

### 2.3 Line-height tokens
| Token | Value | Use |
|---|---|---|
| `--lh-tight` | 1.1 | Display, hero |
| `--lh-snug` | 1.25 | H1–H3 |
| `--lh-normal` | 1.5 | Body, paragraphs |
| `--lh-loose` | 1.75 | Long-form blog reading |

### 2.4 Letter-spacing tokens
| Token | Value | Use |
|---|---|---|
| `--ls-tight` | -0.02em | Display headlines only |
| `--ls-normal` | 0 | Default |
| `--ls-wide` | 0.04em | Buttons |
| `--ls-eyebrow` | 0.08em | All-caps eyebrows |

### 2.5 Hierarchy and pairing rules

1. **Weight or size, never both** to mark hierarchy. A SemiBold 24px heading; never a SemiBold 24px Bold-italic-underlined heading.
2. **Eyebrow → Heading → Body → CTA** is the canonical section pattern.
3. **Headings use `--c-navy`** (full strength), body uses `--c-slate-700` (softer, easier to read at length).
4. **Prices always Inter SemiBold + tabular numerals.** No exceptions. Price alignment is a trust cue.
5. **Bangla and English never mix mid-sentence in headings.** Bangla appears in trust copy and microcopy only.
6. **Maximum line length:** 65 characters for body, 45 for hero, 80 for blog reading column.
7. **No text below 13px.** No exceptions. No "fine print" hidden in 10px gray.

### 2.6 Font loading strategy (defined here, implemented Stage 5)
- Self-host Inter 400 + 600 as woff2 (~30 KB combined gzipped).
- `<link rel="preload">` only the Regular weight; SemiBold loads on demand.
- `font-display: swap` to prevent invisible text.
- System font fallback stack matches Inter metrics: `Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif`.
- Hind Siliguri loaded only on pages with `[lang="bn"]` content.

---

## 3. Spacing System

### 3.1 Base unit and scale
**Base: 8 px.** Every spatial value is a multiple, with 4 px allowed for icon-text and small-component spacing only.

| Token | Value | Use |
|---|---|---|
| `--sp-0` | 0 | Reset |
| `--sp-1` | 4 px | Icon ↔ text, dense chip padding |
| `--sp-2` | 8 px | Tight component internal padding |
| `--sp-3` | 12 px | Card content gap |
| `--sp-4` | 16 px | Default component padding, gap between cards |
| `--sp-5` | 24 px | Section internal spacing, paragraph gap |
| `--sp-6` | 32 px | Between component groups |
| `--sp-7` | 48 px | Between page sections (mobile) |
| `--sp-8` | 64 px | Between page sections (tablet+) |
| `--sp-9` | 96 px | Hero top/bottom (desktop) |
| `--sp-10` | 128 px | Editorial breathing room (desktop only) |

### 3.2 Spacing rules

1. **Sections breathe.** Mobile gap between sections = 48 px (`--sp-7`). Desktop = 64–96 px.
2. **Vertical rhythm > horizontal density.** Better tall and quiet than wide and crowded.
3. **Tap targets ≥ 44 × 44 px** with **≥ 8 px** between adjacent targets.
4. **Container max-widths:**
   - `--w-content` = 1200 px (hero, sections, footer)
   - `--w-narrow` = 720 px (blog reading column, about)
   - `--w-wide` = 1440 px (rare, only for full-bleed editorial)
5. **Page side gutters:**
   - Mobile: 16 px (`--sp-4`)
   - Tablet: 24 px (`--sp-5`)
   - Desktop: 32 px (`--sp-6`)
6. **Grid gap:** mobile 12 px (`--sp-3`), desktop 24 px (`--sp-5`).

### 3.3 Safe-area handling
- Bottom tab bar respects `env(safe-area-inset-bottom)`.
- Sticky PDP action bar adds `env(safe-area-inset-bottom)` to its bottom padding.
- Floating WhatsApp FAB is offset by both safe-area + 64 px (above the bottom tab bar) on mobile.

---

## 4. Design Tokens (full set)

### 4.1 Border-radius
| Token | Value | Use |
|---|---|---|
| `--r-none` | 0 | Full-bleed images, dividers |
| `--r-sm` | 6 px | Inputs, chips |
| `--r-md` | 12 px | Buttons, small cards |
| `--r-lg` | 16 px | Product cards |
| `--r-xl` | 24 px | Hero image, modals |
| `--r-full` | 9999 px | Pills, avatars, FAB |

> No element gets `border-radius: 0` unless it's a divider or a full-bleed image. Soft corners are part of the brand.

### 4.2 Shadow / elevation
Soft, never harsh. Always Sky-tinted, not pure gray, to keep the cool brand mood.

| Token | Value | Use |
|---|---|---|
| `--sh-0` | none | Flat surfaces |
| `--sh-1` | `0 1px 2px rgba(15,39,66,0.06), 0 1px 3px rgba(15,39,66,0.04)` | Cards at rest |
| `--sh-2` | `0 4px 12px rgba(15,39,66,0.08)` | Card hover, dropdown |
| `--sh-3` | `0 12px 32px rgba(15,39,66,0.12)` | Modal, drawer |
| `--sh-4` | `0 24px 48px rgba(15,39,66,0.16)` | Reserved (not used in v1) |
| `--sh-focus` | `0 0 0 3px rgba(124,194,232,0.5)` | Focus ring (Sky-50% alpha) |

### 4.3 Border tokens
| Token | Value | Use |
|---|---|---|
| `--bd-thin` | `1px solid var(--c-cloud-300)` | Cards, inputs |
| `--bd-strong` | `1px solid var(--c-slate-700)` | Pressed/active |
| `--bd-focus` | `2px solid var(--c-sky-600)` | Inputs on focus |
| `--bd-error` | `2px solid var(--c-error)` | Invalid input |

### 4.4 Z-index map (single source of truth)
| Token | Value | Layer |
|---|---|---|
| `--z-base` | 0 | Default flow |
| `--z-sticky` | 100 | Sticky headers, sticky filters |
| `--z-bottom-tab` | 200 | Mobile bottom nav |
| `--z-pdp-bar` | 210 | Sticky PDP action bar (above bottom tab) |
| `--z-fab` | 220 | WhatsApp floating button |
| `--z-drawer` | 300 | Cart drawer, menu drawer |
| `--z-overlay` | 290 | Drawer backdrop |
| `--z-modal` | 400 | Modals (size guide, quick view) |
| `--z-toast` | 500 | Toasts, never blocked |

> No element may invent its own z-index. Every layer has a token.

### 4.5 Motion tokens
| Token | Value | Use |
|---|---|---|
| `--dur-instant` | 80 ms | Micro-feedback (button press) |
| `--dur-fast` | 160 ms | Hover, focus transitions |
| `--dur-base` | 240 ms | Drawer slide, default UI |
| `--dur-slow` | 400 ms | Section reveal, hero fade |
| `--ease-out` | `cubic-bezier(0.2, 0.8, 0.2, 1)` | Default for entries |
| `--ease-in` | `cubic-bezier(0.4, 0, 1, 1)` | Exits |
| `--ease-soft` | `cubic-bezier(0.22, 1, 0.36, 1)` | Premium soft motion (preferred) |

### 4.6 Breakpoints
**Mobile-first.** Every base style is mobile; breakpoints are upgrades only.

| Token | Min-width | Class hint | Target devices |
|---|---|---|---|
| `--bp-sm` | 480 px | `sm` | Large phones (landscape, big Android) |
| `--bp-md` | 768 px | `md` | Tablets, foldables |
| `--bp-lg` | 1024 px | `lg` | Small laptops |
| `--bp-xl` | 1280 px | `xl` | Desktops |
| `--bp-2xl` | 1536 px | `2xl` | Large monitors (rare optimization) |

We optimize seriously for `< sm` (default) and `lg+` (desktop). `sm`–`md` are graceful interpolations.

### 4.7 Aspect-ratio tokens
| Token | Value | Use |
|---|---|---|
| `--ar-product` | 4 / 5 | Product card image (portrait) |
| `--ar-hero` | 16 / 10 mobile, 21 / 9 desktop | Hero |
| `--ar-blog` | 16 / 9 | Blog hero |
| `--ar-square` | 1 / 1 | Instagram, category tile |
| `--ar-wide` | 3 / 2 | Editorial split image |

> Locking aspect ratios eliminates CLS by reserving space before images load. This is a non-negotiable performance contract.

---

## 5. Card Systems

### 5.1 Product card (the most critical UI in the system)

**Anatomy (top to bottom):**
```
┌──────────────────────────┐
│ [tag chip top-left]      │  ← optional: New / Bestseller / Sale
│         IMAGE            │  ← aspect 4:5, lazy-loaded
│ [♡ wishlist top-right]   │  ← 36×36 tap target inside card
├──────────────────────────┤
│ Eyebrow (age range)      │  ← 12px, slate-500
│ Product Name             │  ← 16px SemiBold navy, 2-line clamp
│ ৳1,290  ৳1,490           │  ← price + struck old price
└──────────────────────────┘
```

**Design rules:**
| Rule | Value |
|---|---|
| Background | `--c-cloud-50` (true white) on tinted sections, `--c-cloud-100` otherwise |
| Border | `--bd-thin` |
| Border-radius | `--r-lg` (16 px) |
| Shadow at rest | `--sh-1` |
| Shadow on hover | `--sh-2` (no transform — protects CLS) |
| Image transition on hover | `transform: scale(1.03)` over 400ms — image only, not card |
| Padding (text area) | 12 px mobile, 16 px desktop |
| Gap between price and old price | 8 px |
| Old price | `--c-slate-500`, `text-decoration: line-through` |
| Sale tag | `--c-sun-100` bg, `--c-sun-700` text |
| New tag | `--c-sky-100` bg, `--c-sky-700` text |
| Bestseller tag | `--c-navy` bg, `--c-cloud-50` text |

**Behavior:**
- Entire card is one tap target (link). Wishlist button uses `e.stopPropagation()`.
- On mobile, secondary actions (quick add) are not shown on cards — too cluttered. They live on the PDP.
- Images use `srcset` with 3 widths (320/480/720) and `loading="lazy"` for off-screen cards.

### 5.2 Compact product card
Used in: cart drawer, related products on PDP, blog in-content product blocks.
- Horizontal layout: 80×100 image | name + price stack
- No tag chips
- 12 px padding, no shadow

### 5.3 Category tile
- Aspect: 1:1 (square) on mobile, 4:5 on desktop
- Image fills, label overlay bottom-left with `--c-cloud-50` text and a soft gradient overlay (`linear-gradient(to top, rgba(15,39,66,0.5), transparent 50%)`)
- Border-radius: `--r-xl`
- Hover (desktop): label lifts 4 px, gradient deepens slightly

### 5.4 Testimonial card
- Background: `--c-cloud-200` (soft tinted)
- 16 px star rating in `--c-sun-500`
- Body: 15 px slate-700
- Author line: SemiBold navy + city in slate-500 ("— Ayesha, Dhaka")
- Padding: 24 px
- Border-radius: `--r-lg`
- No shadow

### 5.5 Blog teaser card
- Image (16:9, `--r-md`)
- Eyebrow (category, 12 px slate-500)
- Title (h3, 2-line clamp)
- Reading time + date (caption row)
- No body excerpt on the card — keeps it visually clean

### 5.6 Trust strip card (used in 4-up trust block)
- Icon (32 px, `--c-sky-700`)
- Label (16 px SemiBold navy)
- Sub-label (13 px slate-600)
- Text-aligned center on mobile, left on desktop
- No background, no border — visually weightless

### 5.7 Card composition rules
- Cards never sit directly against page edges on mobile — always 16 px gutter.
- Cards in a horizontal scroll (carousel) get a 12 px peek of the next card to signal scrollability.
- Cards never use a full-color background (no Sky or Sun fills) — surface stays calm.

---

## 6. Button Systems

### 6.1 Hierarchy (only 4 variants — exceptions require design review)

| Variant | Token | When to use |
|---|---|---|
| **Primary** | `.btn--primary` | The single most important CTA on a screen — "Add to bag", "Order on WhatsApp", "Subscribe" |
| **Secondary** | `.btn--secondary` | Important but not primary — "Continue shopping", "Save for later" |
| **Ghost** | `.btn--ghost` | Tertiary — "Cancel", "View all" |
| **Icon** | `.btn--icon` | Icon-only buttons (wishlist, close) — must include `aria-label` |

There is **no danger or destructive button variant** in v1 because we have no destructive flows.

### 6.2 Sizes
| Size | Height | Padding-x | Font-size | Use |
|---|---|---|---|---|
| `--btn-sm` | 36 px | 16 px | 14 px | Inline filters, compact lists |
| `--btn-md` | 44 px | 24 px | 15 px | Default |
| `--btn-lg` | 52 px | 32 px | 16 px | Hero CTA, PDP "Add to bag" |
| `--btn-xl` | 56 px | 32 px | 16 px | Sticky PDP action bar |

All sizes ≥ 36 px height. Default is 44 px to satisfy the tap-target rule.

### 6.3 Visual specs

**Primary**
- Background: `--c-sun-500`
- Text: `--c-navy`
- Border-radius: `--r-md` (12 px)
- Font-weight: 600
- Letter-spacing: `--ls-wide`
- Hover (desktop): bg `--c-sun-600`, no scale
- Pressed: bg `--c-sun-700`, transform `translateY(1px)`
- Disabled: bg `--c-cloud-300`, text `--c-slate-400`, no hover
- Focus: shadow `--sh-focus`

**Secondary**
- Background: `--c-cloud-50`
- Text: `--c-navy`
- Border: `--bd-thin`
- Hover: bg `--c-sky-50`, border `--c-sky-500`
- Otherwise mirrors primary specs

**Ghost**
- Background: transparent
- Text: `--c-slate-700`
- Hover: bg `--c-cloud-200`
- Underline on hover for inline link-style ghosts

**Icon**
- 44×44 px square, `--r-full`
- Icon at 20 px stroke 1.5
- Resting bg transparent, hover `--c-cloud-200`

### 6.4 Button behavior rules
1. **One primary per screen-section.** Never two primary buttons in the same viewport — defeats the purpose.
2. **Loading state:** primary buttons get a subtle inline spinner replacing the label, with `aria-busy="true"`. Width is preserved.
3. **WhatsApp button is a primary variant** with a leading WhatsApp glyph and the label "Order on WhatsApp" — the only place where button text exceeds 4 words.
4. **Buttons never wrap** to two lines. If text is long, the layout is wrong.
5. **Press feedback is mandatory** on touch (160 ms ease, 1 px Y translate).
6. **Disabled buttons are not invisible** — they retain a faint outline so users see they exist.

---

## 7. Form Systems

### 7.1 Input anatomy (one base for all)
```
[Label (optional, above)]
┌─────────────────────────────┐
│ Placeholder / value         │  ← 44 px height, 16 px text
└─────────────────────────────┘
[Helper text or error (below)]
```

### 7.2 Input visual specs
| Property | Value |
|---|---|
| Height | 44 px (md), 52 px (lg, used on contact form) |
| Padding | 12 px 16 px |
| Border | `--bd-thin` |
| Border-radius | `--r-sm` |
| Background | `--c-cloud-50` |
| Text | 16 px (prevents iOS auto-zoom), `--c-slate-700` |
| Placeholder | `--c-slate-400` |
| Label | 14 px SemiBold navy, 4 px below input gap |
| Helper | 13 px `--c-slate-500` |
| Focus | border `--bd-focus` + shadow `--sh-focus` |
| Error | border `--bd-error`, error text 13 px `--c-error`, no background tint |
| Disabled | bg `--c-cloud-200`, text `--c-slate-400`, cursor not-allowed |

### 7.3 Specialized inputs
- **Phone (Bangladesh):** `inputmode="tel"`, prefix `+880` non-editable, 10-digit body. Validation pattern accepts both `01XXXXXXXXX` and `+8801XXXXXXXXX` shapes, normalized to `+880` on submit.
- **Email:** `inputmode="email"`, autocomplete `email`.
- **Search:** rounded-full, leading search icon, trailing clear button (visible only with content).
- **Quantity stepper:** [-] [number] [+], each tap target 44 px, number is `<input type="number" inputmode="numeric">`.
- **Size selector:** styled radio chips (see 7.5).

### 7.4 Form behavior rules
1. **No required-field asterisks.** Mark optional fields, not required ones — fewer asterisks = calmer feel.
2. **Inline validation, not on-submit.** Validate on blur; never on every keystroke.
3. **Errors live below the input,** never as floating modals or red borders alone.
4. **Submit is disabled until valid.** No "click to discover what you got wrong."
5. **Autocomplete attributes mandatory** on every input (`autocomplete="name"`, `tel`, `email`, etc.).
6. **Forms use `<label>` always.** No placeholder-as-label patterns.
7. **Loading state on submit:** button enters loading; form fields lock with `pointer-events: none` and 50% opacity.

### 7.5 Size selector chips
- 44 × 44 px minimum, padding adjusts to label width (e.g., "0–6m" needs more room)
- Border `--bd-thin` at rest
- Selected: border `--bd-strong`, bg `--c-sky-100`, text `--c-navy`
- Unavailable (out of stock): bg `--c-cloud-200`, text `--c-slate-400`, diagonal strikethrough line, `aria-disabled="true"`
- Spacing: 8 px gap

---

## 8. Animation Philosophy

### 8.1 Three rules of motion at SkyOutfit

1. **Motion serves meaning.** Every animation either confirms an action, reveals state, or signals continuity. Decorative motion is forbidden.
2. **Soft, never sharp.** Default easing is `--ease-soft`. Linear is forbidden except for progress bars.
3. **Respect intent.** Honor `prefers-reduced-motion` strictly — disable parallax, fade-ins, slide-ins; keep only essential state transitions (color, opacity at 0 ms).

### 8.2 Catalog of allowed motions

| Trigger | Motion | Duration | Easing |
|---|---|---|---|
| Button press | `translateY(1px)` | `--dur-instant` | `--ease-soft` |
| Button color/bg change | color/bg fade | `--dur-fast` | `--ease-soft` |
| Card hover (image) | `scale(1.03)` on inner image | `--dur-slow` | `--ease-soft` |
| Cart drawer open | slide in from right | `--dur-base` | `--ease-soft` |
| Mobile menu open | slide in from left | `--dur-base` | `--ease-soft` |
| Modal | fade + scale 0.96→1 | `--dur-base` | `--ease-soft` |
| Toast | slide up + fade | `--dur-base` | `--ease-soft` |
| Section reveal (one-shot) | opacity 0→1, translateY 8→0 | `--dur-slow` | `--ease-soft` |
| Image load-in | opacity 0→1 once decoded | `--dur-fast` | linear |
| Skeleton shimmer | gentle gradient sweep | 1.4 s loop | linear |

### 8.3 Forbidden motions
- Parallax that responds to scroll position
- Mouse-tracking gradients or 3D tilts
- Auto-playing video on any surface other than user-initiated
- Carousel auto-advance
- Bouncy spring easings (`cubic-bezier(0.68, -0.55, 0.265, 1.55)` and family)
- Looping decorative animations (sparkles, gradients) — except skeleton

### 8.4 Performance contract
- All animations use **only `transform` and `opacity`.** No animating `top`, `left`, `width`, `height`.
- `will-change` is used surgically, only on elements about to animate; removed after.
- No more than **3 elements animating simultaneously** in the viewport.
- Section reveal animations use `IntersectionObserver` with a single observer instance, not one per element.

---

## 9. Iconography Direction

### 9.1 Style
**Linear, 1.5 px stroke, 24 × 24 px viewBox.** Soft round caps and joins. Custom icon set inspired by Phosphor/Lucide families, but simplified to feel calm.

### 9.2 Sizing tokens
| Token | Size | Use |
|---|---|---|
| `--ic-xs` | 16 px | Inline with text, list bullets |
| `--ic-sm` | 20 px | Buttons, form affordances |
| `--ic-md` | 24 px | Standard nav, header icons |
| `--ic-lg` | 32 px | Trust strip, empty states |
| `--ic-xl` | 48 px | Feature blocks, illustrations |

### 9.3 Icon system rules
1. **All icons inline SVG**, no icon fonts. Allows `currentColor` and tree-shaking.
2. **One sprite sheet per page**, referenced via `<use href="#icon-name">`. Reduces request count.
3. **`aria-hidden="true"` by default**; only icons that are sole interactive targets get accessible labels via `aria-label` on the parent button.
4. **No multicolored brand icons** in v1. Single-color icons keep the palette quiet. Brand logos for payment methods (bKash, Nagad, Rocket) are the only exception — they retain official colors.
5. **Active state**: icons fill in (filled variant) and switch from `--c-slate-700` to `--c-sky-700`. Bottom-tab active state uses this.

### 9.4 Required v1 icon set (~22 icons)
home, shop, search, cart, user, heart, heart-filled, menu, close, chevron-left, chevron-right, chevron-down, plus, minus, check, star, star-filled, whatsapp, instagram, facebook, truck, shield-check, refresh-ccw, info

### 9.5 Payment / partner logos (raster or simplified SVG)
bKash, Nagad, Rocket, COD badge, Visa, Mastercard. These are *not* part of the icon system; they're treated as logos and use a fixed 24 px height in the pay-with strip.

---

## 10. Image Treatment Rules

### 10.1 Style direction
- **Natural daylight, soft shadows, warm-cool balance.** Never harsh studio lighting.
- **Neutral or pastel backgrounds.** Cream, dove gray, soft sage. Never busy patterns.
- **Babies and parents in the frame** for at least 60% of homepage imagery. Flatlay catalog shots are reserved for PDP secondary images.
- **Scandinavian editorial mood**: lots of negative space, off-center compositions, candid expressions over posed.
- **Texture is hero.** Macro shots of fabric weave appear on PDP and editorial sections — they prove softness.

### 10.2 Image specs

| Use | Aspect | Mobile size | Desktop size | Format |
|---|---|---|---|---|
| Hero | 16:10 mobile, 21:9 desktop | 720×450 | 1600×686 | WebP, JPG fallback |
| Product card | 4:5 | 480×600 | 720×900 | WebP |
| PDP main | 4:5 | 720×900 | 1080×1350 | WebP, AVIF if supported |
| Category tile | 1:1 / 4:5 | 480×480 / 480×600 | 720×900 | WebP |
| Blog hero | 16:9 | 720×405 | 1280×720 | WebP |
| Instagram | 1:1 | 360×360 | 360×360 | WebP, low quality (60) |
| Editorial split | 3:2 | 720×480 | 1080×720 | WebP |

### 10.3 Optimization rules

1. **WebP everywhere**, with JPG fallback via `<picture>` only on hero (older browsers).
2. **Three sizes per image** in `srcset` (1x for the device's logical pixel) covering mobile / large mobile / desktop.
3. **Quality 75 for photography, 60 for Instagram thumbnails.**
4. **`loading="lazy"`** on every image except the hero.
5. **`decoding="async"`** on all images.
6. **`fetchpriority="high"`** on hero only.
7. **Aspect ratio preserved via CSS `aspect-ratio`**, not by `width`/`height` attributes alone — eliminates CLS.
8. **Alt text discipline:** descriptive, brand-voiced. "Newborn in cream cotton bodysuit, smiling." Not "image1.jpg" and not stuffed with keywords.

### 10.4 Image overlay rules
- Gradient overlays use `linear-gradient(to top, rgba(15,39,66,X), transparent 50%)` with X between 0.4 and 0.6.
- No solid color overlays.
- Text on imagery uses `--c-cloud-50` and a `text-shadow: 0 1px 2px rgba(15,39,66,0.4)` if contrast is borderline.

### 10.5 Photography don'ts
- No babies crying or distressed (warmth only)
- No babies photographed face-down or in unsafe positions (parent perception is sensitive)
- No babies in our photography younger than ~2 weeks old (legal/sensitivity)
- No props that imply hazard (small toys, food near face)
- No watermarks
- No collage layouts inside a single image — use grid components instead

---

## 11. Responsive Rules

### 11.1 Breakpoint strategy

```
Default (mobile)  →  ≥ sm (480)  →  ≥ md (768)  →  ≥ lg (1024)  →  ≥ xl (1280)
```

Each breakpoint **only adds**, never undoes. We don't write desktop-first rules and override them on mobile.

### 11.2 Layout transitions

| Component | Mobile | sm (480) | md (768) | lg (1024) | xl (1280) |
|---|---|---|---|---|---|
| Container gutters | 16 px | 16 px | 24 px | 32 px | 32 px |
| Product grid | 2 cols | 2 cols | 3 cols | 4 cols | 4 cols |
| Category grid | 2×2 | 2×2 | 4×1 | 4×1 | 4×1 |
| Hero | stacked | stacked | side-by-side | side-by-side | side-by-side |
| Bottom tab bar | visible | visible | visible | hidden | hidden |
| Top header | minimal | minimal | full | full | full |
| Footer columns | 1 | 1 | 2 | 4 | 4 |
| Editorial split | stacked | stacked | side-by-side | side-by-side | side-by-side |
| Cart drawer width | 100% | 100% | 420 px | 420 px | 480 px |
| Mobile menu | full screen | full screen | 360 px panel | n/a (mega menu) | n/a |

### 11.3 Fluid type
- Body stays at 16 px across all breakpoints.
- Display, H1, H2, H3 scale via `clamp()` between mobile and desktop tokens.
   Example pattern: `font-size: clamp(2.25rem, 4vw + 1rem, 3.5rem)` for display.

### 11.4 Touch / pointer adaptations
- `@media (hover: hover) and (pointer: fine)` gates hover-only effects (image scale, dropdown reveal). Touch devices skip them.
- Carousels: snap-scroll on touch, arrow buttons on hover-capable devices.
- Tooltips become inline helper text on touch (since hover doesn't exist).

### 11.5 Orientation and density
- Hero on landscape phones uses a `min-height: 480 px` to avoid squashing.
- Retina-aware images via `srcset` — never serve only 1x.
- All assets pass at `prefers-reduced-data: reduce` by aggressively shrinking secondary imagery (Instagram grid drops to 240 px square).

---

## 12. UI Component Standards

### 12.1 Component contract (every component must declare this)
Before any component is built, it ships with a 6-line contract:

```
- Purpose: one sentence, what user need it satisfies.
- Anatomy: ordered list of visible parts.
- Variants: list of styled variants (≤ 3).
- States: rest, hover, focus, pressed, disabled, loading, empty, error.
- A11y: required ARIA, keyboard, focus order.
- Mobile vs desktop: explicit difference or "identical".
```

### 12.2 Universal accessibility rules

1. **Keyboard accessibility everywhere.** Tab order is always visible focus, focus ring is `--sh-focus`.
2. **Skip-to-content link** at the top of every page, hidden until focused.
3. **Landmark roles** on header (`banner`), nav, main, footer (`contentinfo`).
4. **All interactive elements ≥ 44 px** with focus visible.
5. **Color is never the only indicator.** Selected size = bg + border. Sale = tag chip + label, not color alone.
6. **`prefers-reduced-motion` honored everywhere.**
7. **Forms have explicit labels**, error messages have `aria-live="polite"`, submit success has `role="status"`.
8. **Decorative SVGs:** `aria-hidden="true"`. Meaningful SVGs: `<title>` element + `role="img"`.

### 12.3 Component states (canonical 8)
Every interactive component declares behavior for each state, even if it's "no change":

`rest · hover · focus · pressed · selected · disabled · loading · error`

### 12.4 Component documentation rules (will be enforced in Stage 4)
- One file per component, kebab-case (`product-card.css`, `product-card.html.partial`).
- Component class follows BEM lite: `.c-product-card`, `.c-product-card__image`, `.c-product-card--featured`.
- `c-` prefix denotes component; `u-` denotes utility; `js-` denotes JS hook (no styling).
- No deeply nested selectors (max 2 levels).
- No `!important`.

### 12.5 The 25-component cap (final v1 list)

**Global (10):**
1. announcement-bar
2. site-header
3. mobile-bottom-nav
4. mobile-menu-drawer
5. cart-drawer
6. site-footer
7. whatsapp-fab
8. pdp-action-bar (mobile sticky)
9. search-overlay
10. toast

**Section (8):**
11. hero
12. category-grid
13. product-rail (horizontal scroll / grid)
14. trust-strip
15. editorial-split
16. testimonial-grid
17. instagram-grid
18. blog-teaser-grid

**Product (4):**
19. product-card (with compact variant)
20. product-gallery
21. size-selector
22. fabric-block

**Forms / Utility (3):**
23. form-input (with all input variants)
24. button (with all variants)
25. skeleton-placeholder

> Newsletter band, pay-with strip, breadcrumb, modal, badges, and tags are compositions of these 25 — not new components.

---

## Stage 2 — Decisions locked into Stage 3

These tokens and standards become inputs to wireframing and layout planning:

1. **8 px spacing scale + 44 px tap target** drives every wireframe gap, button, and grid.
2. **Mobile gutter 16 px, section gap 48 px** drives mobile homepage rhythm.
3. **Product card 4:5 aspect** drives all grid heights in Stage 3.
4. **Fluid type via `clamp()`** drives the responsive headline behavior in wireframes.
5. **3-color cap per section** drives the visual zoning of homepage and PDP.
6. **z-index map** drives layering of cart drawer, sticky PDP bar, bottom tab, and FAB in mobile wireframe.
7. **Hero 16:10 mobile / 21:9 desktop** locks hero canvas in Stage 3.
8. **25-component cap** locks the wireframe vocabulary — no new shapes invented in Stage 3.
9. **Motion = transform + opacity only** locks the reveal and drawer behaviors.
10. **Breakpoint upgrades only (mobile-first)** locks Stage 3 wireframe sequence: mobile first, desktop second.

---

*End of Stage 2.*
