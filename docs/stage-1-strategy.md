# SkyOutfit — Stage 1: Brand Strategy & UX Architecture

> Premium baby fashion (06 months – 12 years) for Bangladesh's modern parents.
> Built on Blogger, but engineered to never *feel* like Blogger.

---

## 1. Brand Experience Strategy

### 1.1 Strategic positioning
**"The calm corner of the internet for parents who care."**

SkyOutfit does not compete on price — it competes on *emotional certainty*. In Bangladesh's saturated baby-clothing market, most stores shout (red banners, "MEGA SALE", cluttered grids, stock images). SkyOutfit whispers. The whisper itself becomes the differentiator.

### 1.2 Brand experience pillars
| Pillar | What the user feels | How the site delivers it |
|---|---|---|
| **Softness** | "This brand handles babies gently." | Generous whitespace, soft curves, muted Sky Blue, lifestyle imagery |
| **Certainty** | "I won't regret this purchase." | COD reassurance, return policy visible, real testimonials, fabric clarity |
| **Modernity** | "This is not aunty's shop." | Editorial typography, restrained motion, clean grid, premium product cards |
| **Closeness** | "They are reachable, like a friend." | WhatsApp-first ordering, conversational microcopy, Bangla-friendly tone |
| **Authority** | "They know babies." | Parenting blog, fabric education, founder voice, Scandinavian visual codes |

### 1.3 Brand voice
- **First-person plural**: "We chose this fabric because…"
- **Calm imperatives**: "Wash gently. Wear often."
- **No hype words**: never "MEGA", "BLAST", "CRAZY", "ULTIMATE"
- **Bangla-friendly**: short English words, occasional Bangla phrase in trust copy ("নিশ্চিন্তে অর্ডার করুন")
- **Always reassuring, never urgent.** Urgency is reserved only for genuine stock scarcity.

### 1.4 What we deliberately *do not* do
- No countdown timers
- No spinning discount wheels
- No popups before the user has scrolled
- No "Only 2 left!" fake scarcity
- No carousel auto-play sliders on hero
- No emoji-heavy CTA buttons
- No discount-store red/yellow palette

---

## 2. Emotional UX Philosophy

### 2.1 The core emotional contract
> Every screen must answer one silent question a parent is asking:
> **"Is this safe for my baby, and is this safe for my wallet?"**

If a section doesn't answer that question — directly or indirectly — it doesn't belong on the page.

### 2.2 The three emotional layers (top to bottom of every page)

1. **Reassurance layer** — first 1.5 screens
   - Soft hero imagery, calm headline, clear category entry, COD/Return badges visible
2. **Discovery layer** — middle scroll zone
   - Curated collections, new arrivals, fabric storytelling, Instagram social proof
3. **Confidence layer** — pre-footer
   - Testimonials, parenting blog teaser, FAQ entry, contact reassurance

### 2.3 Emotional design principles
- **Breathing room over density** — a half-empty section that feels calm beats a full section that feels noisy.
- **One emotion per section** — never mix "trust" + "urgency" in the same block.
- **Imagery does the persuasion, copy does the reassurance** — photos sell, words protect.
- **Touch must feel deliberate** — every tap target is an emotional micro-decision; no accidental adds.
- **Loading is part of the brand** — soft skeleton placeholders, not spinners. Even a slow load should feel intentional.

### 2.4 Anti-patterns we ban
- Flashing badges
- Auto-playing video
- Modal popups within first 30 seconds
- Toast notifications that move violently
- Hover effects that change layout (cause CLS)
- Color-changing CTAs on press

---

## 3. Website Architecture

### 3.1 Site map (logical, not visual)

```
SkyOutfit
├── Home
├── Shop
│   ├── New Arrivals
│   ├── Best Sellers
│   ├── By Age
│   │   ├── 0–6 months  (Newborn)
│   │   ├── 6–12 months (Infant)
│   │   ├── 1–3 years   (Toddler)
│   │   ├── 4–7 years   (Kids)
│   │   └── 8–12 years  (Junior)
│   ├── By Category
│   │   ├── Bodysuits & Rompers
│   │   ├── Dresses
│   │   ├── Tops & T-shirts
│   │   ├── Bottoms
│   │   ├── Sets & Outfits
│   │   ├── Sleepwear
│   │   └── Accessories
│   ├── By Occasion
│   │   ├── Everyday Soft
│   │   ├── Eid Edit
│   │   ├── Winter Warmth
│   │   └── Family Photoshoot
│   └── Sale Edit  (used sparingly, never red)
├── Product Detail Page (PDP)
├── Search Results
├── About
│   ├── Our Story
│   ├── Fabric Philosophy
│   └── Sustainability Note
├── Journal (Blog)
│   ├── Parenting Tips
│   ├── Fabric Guides
│   ├── Seasonal Care
│   └── Style Stories
├── Help
│   ├── Shipping & Delivery
│   ├── Returns & Exchange
│   ├── FAQ
│   └── Size Guide
├── Contact
├── Privacy Policy
├── Terms
└── 404
```

### 3.2 Architecture rules
- **Maximum 3 clicks to any product** from the homepage.
- **Maximum 2 clicks to checkout** (PDP → WhatsApp).
- **No orphan pages** — every page has a home in the IA and a path back.
- **Labels = collections.** In Blogger, post labels drive every collection page. One product can carry multiple labels (age + category + occasion).
- **URL structure** is human-readable: `/p/product-slug.html`, `/search/label/dresses`, etc.

### 3.3 Information density per page (target words above the fold)

| Page | Words above fold (mobile) | Reasoning |
|---|---|---|
| Home | ≤ 18 | Hero owns the space, image > copy |
| Shop | ≤ 12 | Product grid is the message |
| PDP | ≤ 25 | Title + price + 1 trust line + CTA |
| Blog post | ≤ 60 | Editorial reading expected |
| About | ≤ 40 | Story-driven |

---

## 4. Conversion Psychology

### 4.1 The Bangladesh parent buying journey (real behavior)

```
Facebook/IG ad seen
    ↓
Tap → land on PDP (NOT homepage — most traffic skips home)
    ↓
Scroll product images quickly
    ↓
Look for: Price → Size availability → COD → Return
    ↓
Hesitation phase  ← THIS IS WHERE WE WIN OR LOSE
    ↓
Tap WhatsApp → ask 1–2 questions → place order
```

### 4.2 The hesitation triggers we must neutralize

| Hesitation | What parent thinks | Our on-page answer |
|---|---|---|
| "Is fabric soft for skin?" | Fear of rashes | Fabric block with material %, "skin-tested" line, close-up texture image |
| "Will size fit?" | Babies grow fast | Inline size guide button + "if it doesn't fit, easy exchange" |
| "Is this real?" | IG ad scams | Real customer photos, founder photo, physical address in footer |
| "What if I don't like it?" | Return friction | "7-day exchange" badge near CTA, not buried in policy |
| "How do I pay?" | Unfamiliar with online | bKash/Nagad/Rocket/COD icons visible on PDP, not just checkout |
| "How fast will it arrive?" | Uncertainty | "Dhaka 1–2 days, outside 3–5 days" near CTA |

### 4.3 Conversion levers, ranked

1. **WhatsApp CTA visible at all times on PDP** (sticky bottom on mobile)
2. **Trust badges within thumb reach** of the CTA
3. **Real photos** of babies wearing products (not catalog flatlay only)
4. **Price clarity** — single price, optional struck-through old price, no hidden charges
5. **Size in stock signal** — greyed-out unavailable sizes, never hidden
6. **One-tap WhatsApp prefilled message** — zero typing for the parent
7. **Social proof rail** — 3 testimonials with first names + locations (Dhaka, Chattogram…)

### 4.4 The "Two Thumb Rule"
Every primary action on a product page must be reachable by either thumb on a 6.1" Android — no stretching. This shapes our sticky CTA placement and bottom navigation.

### 4.5 Friction we deliberately keep
- Cart still requires a "Review order" tap before WhatsApp — this single tap dramatically reduces accidental orders and increases perceived seriousness.
- Size selection is required before "Add to bag" — no defaults, forces conscious choice.

---

## 5. Mobile Journey

### 5.1 Mobile traffic assumptions (Bangladesh)
- 88–92% mobile traffic (FB/IG sourced)
- 50%+ on mid-range Android (4–6 GB RAM, 720p screens)
- 4G average, 3G common in suburbs
- WhatsApp installed on essentially 100% of buyers' phones
- Many users browse with one hand, often while holding a baby

### 5.2 The mobile journey map (ad → order)

```
[FB/IG Ad]
    │
    ▼
[Land on PDP — 1.2s LCP target]
    │
    ▼
[Hero image fills 60vh, price visible without scroll]
    │
    ▼
[Swipe through 4–6 product images]
    │
    ▼
[Tap size selector — bottom sheet opens]
    │
    ▼
[Tap "Add to bag" — cart drawer slides in]
    │
    ▼
[Tap "Order on WhatsApp" — opens WA with prefilled msg]
    │
    ▼
[Conversation → confirmation]
```

### 5.3 Mobile-specific UX rules
- **Sticky bottom action bar on PDP**: [♡ Save] [Add to bag] [WhatsApp]
- **Bottom tab bar on every page**: Home · Shop · Search · Cart · Account
- **Hamburger only as secondary** (top right) — main nav is the bottom bar.
- **All tap targets ≥ 44×44 px**, with 8 px gaps minimum.
- **No hover-dependent behavior** — every hover state has a tap equivalent.
- **Forms use `inputmode`** for numeric (phone) to summon correct keyboard.
- **WhatsApp button is always within thumb arc** — sticky bottom-right floating button site-wide.

### 5.4 Mobile performance budget (per page)
- HTML: ≤ 35 KB gzipped
- Critical CSS inlined: ≤ 14 KB
- Total CSS: ≤ 60 KB
- JS: ≤ 35 KB (no frameworks)
- Images above fold: 1 image, ≤ 80 KB WebP, lazy-load everything else
- Font payload: 1 family, 2 weights max, swap display

---

## 6. Page Hierarchy

Pages ranked by strategic importance, dictating where engineering and content effort concentrates:

| Tier | Page | Strategic role | Effort weight |
|---|---|---|---|
| **S** | Product Detail Page | Single most important conversion surface | 30% |
| **S** | Homepage | Brand impression + collection entry | 20% |
| **A** | Category / Label pages | SEO + browse experience | 15% |
| **A** | Cart drawer (component, not page) | Final friction point | 8% |
| **B** | Search results | Returning user discovery | 6% |
| **B** | Blog index + post | Authority + SEO long tail | 6% |
| **B** | Shipping/Returns/FAQ | Trust documents | 5% |
| **C** | About | Brand story for considered buyers | 4% |
| **C** | Contact | Support fallback | 3% |
| **C** | 404, Privacy, Terms | Hygiene | 3% |

**Rule:** No "C" tier page is allowed to compromise an "S" tier page's performance or layout.

---

## 7. User Flows

### 7.1 Flow A — Facebook Ad → Order (primary, 70% of traffic)
```
Ad tap
 → PDP loads (LCP 1.2s)
 → Sees hero image + price + COD badge
 → Swipes images
 → Taps size → bottom sheet → selects
 → Taps "Add to bag"
 → Cart drawer opens
 → Taps "Order on WhatsApp"
 → WhatsApp opens with prefilled message containing:
    • Product name + URL
    • Selected size
    • Quantity
    • Price
 → Sends → done
```

### 7.2 Flow B — Homepage browsing (returning / brand-aware, 15%)
```
Home → Featured Categories → Category page → PDP → Cart → WhatsApp
```

### 7.3 Flow C — Search-driven (5%)
```
Search icon → Type "winter romper" → Results grid → PDP → Cart → WhatsApp
```

### 7.4 Flow D — Content-led (10%, blog/SEO)
```
Google → Blog post ("How to dress a newborn in winter")
 → In-content product card
 → PDP → Cart → WhatsApp
```

### 7.5 Recovery flows
- **Empty cart** → "Looks quiet here." + 4 best sellers + "Shop new arrivals" CTA.
- **Out-of-stock size** → "Notify me on WhatsApp" — opens WA with prefilled "Notify me when available".
- **404** → calm illustration + search bar + 3 best sellers + home link.
- **No internet (offline)** → service-worker-cached "You're offline" page (optional, Stage 5+).

### 7.6 Trust-building micro-flow (parallel, runs alongside main flow)
At every flow step, at least one trust signal is visible within thumb reach. Never more than two simultaneously — clutter destroys trust.

---

## 8. Content Structure

### 8.1 Product post structure (what every product needs in Blogger)
Each product is a **Blogger post** with:

| Field | Source in Blogger | Required |
|---|---|---|
| Product title | Post title | ✅ |
| Slug | Post URL | ✅ |
| Description | Post body (rich) | ✅ |
| Hero + gallery images | Post body images | ✅ (4–6) |
| Price (BDT) | Custom field via search description / template tag | ✅ |
| Old price (optional) | Custom field | — |
| Sizes available | Comma-separated label or in-body data block | ✅ |
| Fabric / material | In-body data block | ✅ |
| Age range | Label (e.g., `age-0-6m`) | ✅ |
| Category | Label (e.g., `cat-romper`) | ✅ |
| Occasion | Label (e.g., `occ-eid`) | optional |
| Tag (new/best/sale) | Label (e.g., `tag-new`) | optional |
| WhatsApp number | Theme-level setting | ✅ |

A **structured data block** at the top of every product post body (hidden via CSS, parsed by JS) carries machine-readable fields. This is the trick that makes Blogger feel like a real e-commerce CMS. Final shape is defined in Stage 4.

### 8.2 Blog post structure
- Title (H1)
- Hero image (16:9, lifestyle)
- Author + reading time + date
- Body with H2/H3 hierarchy, pull quotes, in-content product cards
- Related posts (3, by label)
- Newsletter inline
- Comments OFF by default for parenting tips (avoid moderation overhead) — can be enabled per post.

### 8.3 Static page structure (About, Shipping, etc.)
Use Blogger **Pages** (not posts), with consistent template:
- Eyebrow label (e.g., "Help")
- Page title
- Lede paragraph
- Section blocks (text + optional supporting image)
- Trust strip
- "Still have questions? WhatsApp us" CTA

### 8.4 Content tone matrix

| Page type | Tone | Length |
|---|---|---|
| Product | Specific, sensory, reassuring | 80–150 words |
| Blog | Warm, expert, story-led | 700–1200 words |
| About | First-person plural, intimate | 300–500 words |
| Help | Direct, calm, practical | 200–400 words |
| 404 | Light, playful, never apologetic in a needy way | 30 words |

---

## 9. Component Planning

Components ranked by reuse frequency. Each will be designed once in Stage 2 and built once in Stage 4.

### 9.1 Global components
- **Top bar** (announcement, dismissible) — shipping line / Eid edit teaser
- **Header** (logo, search, cart, hamburger)
- **Bottom mobile nav** (5 icons)
- **Floating WhatsApp button** (always visible)
- **Sticky PDP action bar** (mobile only)
- **Footer**
- **Cart drawer** (slides from right, full height mobile)
- **Search overlay** (full-screen on mobile, dropdown on desktop)
- **Mobile menu drawer** (slides from left)
- **Toast / inline confirmation** (e.g., "Added to bag")
- **Cookie/consent strip** (minimal, dismissible)

### 9.2 Section components (homepage + landing)
- **Hero** (image left/right + headline + CTA)
- **Category grid** (4 tiles mobile 2×2, desktop 4×1)
- **Product carousel** (horizontal scroll mobile, grid desktop)
- **Trust strip** (4 icons + labels)
- **Editorial split** (image + paragraph + link)
- **Testimonial trio** (3 cards)
- **Instagram feed grid** (3×2)
- **Blog teaser trio** (3 article cards)
- **Newsletter band**
- **Promo strip** (single image + CTA)

### 9.3 Product components
- **Product card** (image, name, price, sizes-on-hover, wishlist)
- **Product card — compact** (for related/upsell)
- **PDP gallery** (swipe + thumbs)
- **Size selector** (chips)
- **Quantity stepper**
- **Fabric block** (icon + label + %)
- **Trust badges row** (COD, Return, Delivery, Quality)
- **Pay-with strip** (bKash, Nagad, Rocket, COD)
- **Related products rail**

### 9.4 Form components
- **Newsletter input + button** (inline, single row)
- **Search input** (with clear button)
- **Contact form** (name, phone, message)
- All inputs share one base style, one focus ring, one error pattern.

### 9.5 Utility components
- **Skeleton placeholders** (card, text line, image)
- **Empty state**
- **Loading bar** (slim, top of page)
- **Modal** (used sparingly: size guide, quick view)

### 9.6 Component governance
- **No more than 25 reusable components** in v1. Anything else is composition.
- **Every component declares its mobile + desktop behavior** before any code is written.
- **No component depends on JS to render initial layout** (progressive enhancement).

---

## 10. Navigation Logic

### 10.1 Three navigation surfaces, one mental model

| Surface | Where | Purpose | Items |
|---|---|---|---|
| **Top header** | Top of every page | Brand + global actions | Logo · Search · Cart · Menu |
| **Bottom tab (mobile)** | Bottom of every page | Primary navigation | Home · Shop · Search · Cart · Account |
| **Mega-menu drawer** | Slides from left on tap | Full IA exposure | Shop tree, Help, Account, Lang |

### 10.2 Navigation rules
- **Bottom tab is permanent on mobile** — never hidden, even on PDP (the sticky PDP bar sits *above* it).
- **Cart count badge** appears on the cart icon in both header and bottom tab; updates from localStorage.
- **Search is one tap from anywhere** — top icon and bottom tab.
- **Active state is unmistakable** — bottom tab uses Sky Blue underline + filled icon.
- **Back navigation** uses the browser's native back; we don't add custom back buttons except inside modals.

### 10.3 Desktop navigation
- Header expands: Logo (left) · Primary links (center: Shop, Journal, About, Help) · Search · Account · Cart (right).
- Hover on "Shop" reveals a 3-column mega-menu (Age / Category / Occasion).
- No bottom tab bar on desktop.

### 10.4 Footer as navigation
The footer is treated as a **navigational sitemap**, not decoration. It contains every page in the IA, grouped logically. This serves SEO (internal linking) and user fallback.

### 10.5 Breadcrumbs
- On all category, product, and blog pages.
- JSON-LD `BreadcrumbList` for SEO.
- Visible breadcrumb on desktop, hidden on mobile (back button + bottom tab cover the same need).

---

## 11. Homepage Section Strategy

The homepage is a **curated gallery**, not a sales floor. Its job is to make the parent feel they've entered a trustworthy space and to surface 2–3 product entry points.

### 11.1 Section order (mobile, top to bottom)

| # | Section | Strategic job | Height (mobile) | Trust signal |
|---|---|---|---|---|
| 0 | Announcement bar | Quiet utility | 36 px | Free shipping line |
| 1 | **Hero** | Emotional first impression | 75 vh | None (image carries it) |
| 2 | **Featured Categories** (4 tiles) | Fast browse entry | 60 vh | Implicit (range visible) |
| 3 | **Trust strip** (4 icons) | Anchor confidence | 18 vh | COD · Return · Delivery · Quality |
| 4 | **New Arrivals** (horizontal scroll) | Product discovery | 70 vh | "New" tag |
| 5 | **Editorial / Brand Story** (split) | Emotional storytelling | 80 vh | Founder voice |
| 6 | **Best Sellers** (carousel) | Social proof via popularity | 70 vh | "Bestseller" tag |
| 7 | **Why Parents Trust SkyOutfit** (4-up) | Direct trust block | 60 vh | Fabric · Tested · Local · Care |
| 8 | **Testimonials** (3 cards) | Peer validation | 50 vh | Names + cities + verified mark |
| 9 | **Instagram feed** (3×2 grid) | Social proof + IRL look | 60 vh | "@skyoutfit" + follower count optional |
| 10 | **Journal teaser** (3 posts) | Authority + SEO | 70 vh | Bylines |
| 11 | **Newsletter** | Retention | 40 vh | "Soft notes, no spam." |
| 12 | **Footer** | Navigation + trust | auto | Address + payment icons + social |

Total mobile homepage height: ~9–10 viewport heights — long, but every section earns its scroll.

### 11.2 Desktop homepage adjustments
- Sections 4 and 6 (carousels) become 4-column grids.
- Section 5 (editorial split) becomes true side-by-side.
- Section 9 (Instagram) becomes 6×1 strip.
- Section 11 (newsletter) shrinks to a single horizontal band.

### 11.3 Section design constraints
- **Color budget**: each section uses ≤ 3 colors from the palette.
- **CTA budget**: each section has at most 1 primary CTA.
- **Image budget**: hero = 1 image, all other sections lazy-loaded.
- **Animation budget**: at most 1 motion event per section, only on enter, ≤ 400ms.

### 11.4 Section reusability
Every homepage section is a reusable block. The same components power:
- Category landing pages (rearranged subset)
- Seasonal campaign pages (Eid, Winter)
- Blog post in-content product blocks

This is what enables one designer + one small team to scale SkyOutfit's marketing without re-engineering anything.

### 11.5 What we explicitly omitted from the homepage and why
| Common feature | Why omitted |
|---|---|
| Full-bleed video hero | Performance + Bangladesh data costs |
| Auto-play carousel | CLS, motion, attention hijack |
| "Featured brand partners" strip | Dilutes SkyOutfit authority |
| Blog category cloud | Visual noise, low CTR |
| Live chat popup | WhatsApp button replaces it, more native |
| Discount code banner above hero | Anti-brand, anti-trust |

---

## Stage 1 — Decisions locked in

These decisions become inputs to Stage 2:

1. **Three-color discipline per section** → drives Stage 2 color tokens.
2. **44 px minimum tap target** → drives Stage 2 spacing scale.
3. **Bottom tab bar on mobile** → drives Stage 2 z-index map and safe-area handling.
4. **Sticky PDP action bar** → drives Stage 3 PDP wireframe.
5. **WhatsApp as the only checkout** → drives Stage 4 cart logic and Stage 5 message templating.
6. **Labels-as-collections** → drives Stage 4 Blogger feed parsing and Stage 5 XML widget structure.
7. **In-body structured data block per product** → drives Stage 4 product parser.
8. **One font family, two weights** → drives Stage 2 typography system and Stage 5 font loading strategy.
9. **No JS required for first paint** → drives Stage 4 architecture (progressive enhancement).
10. **≤ 25 reusable components in v1** → caps Stage 2 design system scope.

---

*End of Stage 1.*
