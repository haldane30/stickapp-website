# Stick — Website Design Brief

> Version: 1.0
> Date: February 27, 2026
> Status: Draft — open for creative review
> Audience: Anyone designing or building stickapp.golf

---

## 1. The Brief in One Paragraph

Design and build the marketing website for Stick, a premium golf betting app. The site must accomplish two things simultaneously: serve as a high-converting funnel to App Store downloads, and establish Stick as the authoritative voice on golf betting through deep, SEO-optimized game guides and editorial content. The design must feel like it belongs in the world of The Golfer's Journal — not in the world of SaaS landing pages. Every decision should pass one test: *would a discerning golfer with taste feel respected by this?*

---

## 2. Brand Territory

### What Stick Is

Stick is the app that finally gets golf betting right. It tracks 11 betting games from a single scorecard, handles the math with cent-level precision, and settles everything transparently — so the four people in the group can focus on playing, talking trash, and enjoying the round instead of arguing about who owes what.

### What Stick Is Not

- Not a GPS or rangefinder app (that's 18Birdies, Arccos)
- Not a handicap tracker (that's GHIN)
- Not a scorecard app that added betting as an afterthought (that's everyone else)
- Not a sports betting / gambling platform (no real money flows through the app)

### Brand Personality

If Stick were a person at the club, they'd be:

- **The member who knows every game** — not because they read about it, but because they've played them all and can explain the nuances over a drink
- **Quietly confident** — doesn't need to be the loudest voice; the quality of their game speaks
- **Respected by both scratch golfers and 20-handicappers** — because they treat the game seriously without taking themselves too seriously
- **The person you trust to settle the bets** — because they're precise, transparent, and fair

### Brand Voice

| Attribute | What It Means | What It Doesn't Mean |
|-----------|---------------|----------------------|
| **Authoritative** | We know these games inside out. We built calculators for every edge case. | Condescending, academic, lecturing |
| **Approachable** | We write for the Saturday morning foursome, not the rules committee | Dumbed down, slangy, trying too hard to be casual |
| **Precise** | Numbers are right. Always. Zero-sum verified. | Cold, robotic, clinical |
| **Confident** | We charge more than competitors because we're better. | Arrogant, dismissive of alternatives |
| **Warm** | We love this game and the culture around it | Sentimental, nostalgic for its own sake |

---

## 3. Design Principles

These are the non-negotiable rules that govern every visual decision on the site.

### 3.1 — Earned Attention

Nothing on the site should grab for attention. Every element — animation, color, typography, photography — should *earn* the viewer's focus by being genuinely beautiful or genuinely useful. If something is decorative but not beautiful, remove it. If something is functional but not considered, redesign it.

**In practice:** No gratuitous parallax. No bouncing elements. No "scroll to see more" chevrons. No confetti. Motion exists to guide, reveal, and create atmosphere — never to perform.

### 3.2 — Space Is Confidence

Premium brands use space the way luxury hotels use lobbies — generously, deliberately, as a signal that they don't need to cram. The Golfer's Journal understands this in print: wide margins, breathing room between images and text, grid discipline that creates rhythm.

**In practice:** Sections should feel like full spreads, not stacked cards. Typography should have room to land. Content density should be low per viewport but rich per scroll. When in doubt, add whitespace.

### 3.3 — Photography Carries the Emotion

The written copy tells you what Stick does. The photography tells you how Stick *feels*. Course photography should evoke the specific feeling of standing on a tee box at golden hour — anticipation, beauty, competitive edge.

**In practice:** Images should be atmospheric, not illustrative. Moody color grading (desaturated greens, warm shadows, dramatic skies). No stock photos of smiling golfers high-fiving. No overhead drone shots of generic fairways. Think editorial, not commercial.

### 3.4 — Typography Does the Heavy Lifting

In a design system built on restraint, type becomes the primary expressive tool. Headlines should feel intentional — sized, weighted, and spaced with the care of a magazine spread. Body copy should be effortlessly readable.

**In practice:** Large, confident headlines. Generous line height. Careful hierarchy (no more than 3-4 distinct type sizes per section). The typeface itself should feel refined but not fussy.

### 3.5 — The App Proves the Craft

When app screenshots appear, they should feel like looking through a window into a working product — not like a marketing mockup. Screenshots should show real game states, real numbers, real settlement breakdowns. The UI itself is the proof.

**In practice:** No generic "lorem ipsum" screenshots. No exaggerated drop shadows on floating phone mockups. When showing the app, show it doing something specific and impressive — a multi-press Nassau settlement, a Wolf partner decision, a transparent "who pays whom" breakdown.

---

## 4. Visual Direction

### 4.1 — Color Palette

The website palette should feel richer and more atmospheric than a typical app marketing site. The coral accent remains the brand signature, but it's supported by deeper, more editorial tones.

#### Primary Palette

| Role | Color | Hex | Usage |
|------|-------|-----|-------|
| **Canvas Dark** | Near black | `#0F0F0F` | Hero sections, dramatic backdrops, footer |
| **Canvas Light** | Warm cream | `#FAF8F5` | Content sections, blog pages, game guides |
| **Text Primary (on dark)** | Warm white | `#F0EBE3` | Headlines and body on dark backgrounds — NOT pure white |
| **Text Primary (on light)** | Rich charcoal | `#1A1A1A` | Headlines and body on light backgrounds |
| **Text Secondary** | Warm gray | `#8A8580` | Captions, metadata, supporting text |

#### Accent & Semantic

| Role | Color | Hex | Usage |
|------|-------|-----|-------|
| **Coral (Brand)** | Stick coral | `#E8735A` | CTAs, links on dark backgrounds, brand moments |
| **Coral Hover** | Deepened coral | `#D4604A` | Button hover states |
| **Forest** | Deep green | `#2A4A3A` | Secondary accent, "golf" feeling, success states |
| **Gold** | Warm brass | `#C4A45A` | Highlight moments, premium signals, editorial flourishes |
| **Positive** | Muted green | `#2E9E5B` | Wins, up status (inherited from app) |
| **Negative** | Muted red | `#E54D42` | Losses, down status (inherited from app) |

#### Color Philosophy

- **Dark sections** create drama and atmosphere (hero, CTAs, transitions between content areas)
- **Light sections** create readability and openness (game guides, blog posts, feature explanations)
- **The alternation between dark and light** creates rhythm as you scroll — like turning pages in a magazine
- **Coral appears sparingly** but always with purpose — it's the color of action, the thing you click, the thing that matters right now
- **Pure white (#FFFFFF) and pure black (#000000) are almost never used** — everything has a slight warmth to it

#### A Note on Color Evolution

These website colors may inform a refinement of the app's color system over time. The app currently uses `#F8F7F6` as its warm background and `#0A0A0A` as its dark mode primary — both are close to what's proposed here. The addition of forest green and gold as secondary accents could enrich the app's palette in future iterations, particularly in the game selection and settlement screens.

### 4.2 — Typography

#### Typeface Selection

The website typeface should balance editorial authority with digital clarity. Two directions to explore:

**Option A: Extend the App's Type System**
- **Headlines:** Figtree Bold/Extrabold (already the app font) at large sizes
- **Body:** Figtree Regular
- **Pro:** Total brand consistency between app and web
- **Con:** Figtree is a clean geometric sans — may lack the editorial warmth of TGJ-style typography

**Option B: Editorial Headline + Clean Body**
- **Headlines:** A refined serif (candidates: Fraunces, Playfair Display, Libre Caslon, or a high-quality commercial face like Canela or GT Sectra)
- **Body:** Figtree or Inter (maintaining app continuity in running text)
- **Pro:** Immediately signals "editorial" and "premium" — the serif/sans pairing is classic for a reason
- **Con:** Introduces a new typeface that the app doesn't currently use

**Recommendation:** Option B, but with restraint. A serif headline font used *only* for large display text (hero headlines, section titles, game guide page titles) creates the TGJ-adjacent editorial feeling without overwhelming the system. All functional text (navigation, buttons, body copy, metadata) stays in the app's clean sans-serif. This gives us two distinct registers: the editorial voice (serif, large, atmospheric) and the product voice (sans, functional, clear).

#### Type Scale (Approximate)

| Role | Size | Weight | Usage |
|------|------|--------|-------|
| Hero headline | 64-80px | Serif, Regular or Medium | One per page, maximum impact |
| Section headline | 40-48px | Serif, Regular | Major content divisions |
| Subsection headline | 24-28px | Sans, Semibold | Within content areas |
| Body large | 18-20px | Sans, Regular | Game guide body, blog body |
| Body | 16px | Sans, Regular | Standard content |
| Caption / Meta | 13-14px | Sans, Medium | Dates, categories, labels |
| Overline | 11-12px | Sans, Semibold, Uppercase, Tracked | Section labels, category tags |

### 4.3 — Photography Direction

#### Style

- **Mood:** Golden hour, dramatic skies, morning fog, long shadows
- **Color grading:** Desaturated and warm — lifted blacks, muted greens, amber highlights. Not Instagram-filtered but definitely graded with intention.
- **Subjects:** Landscapes over people. Courses over equipment. Atmosphere over action. When people appear, they should be mid-swing or walking the course — never posing, never looking at camera.
- **Composition:** Cinematic aspect ratios. Lots of negative space in the frame (for text overlay). Horizon lines that create natural divisions.

#### Reference

The splash image already in the app (`splash_bg_warm.jpg`) is the ideal reference point — that moody links-course shot with the single golfer, dramatic clouds, warm-but-desaturated color palette. This is the photographic voice of Stick.

#### Sourcing

- Unsplash and Pexels have golf photography, but most is generic and overlit
- Premium stock (Offset, Getty Editorial) has better options but costs money
- The best long-term play: commission or license photography from golf photographers who shoot in this editorial style
- For launch: curate carefully from free sources, applying consistent color grading in post to unify the look

### 4.4 — Illustration Direction: Watercolor Game Paintings

#### The Concept

Each of Stick's 11 games gets a signature illustration — a watercolor painting that captures the *feeling* of the game, not a literal diagram of how it works.

#### Style Parameters

- **Medium:** Watercolor — loose, expressive brushwork with areas of intentional imprecision
- **Palette:** Muted, warm tones that harmonize with the photography direction. Not bright or cartoonish. Think vintage botanical illustration meets course architecture sketches.
- **Subjects:** Each painting should evoke the game's character through a scene or metaphor:

| Game | Illustration Concept | Feeling |
|------|---------------------|---------|
| **Nassau** | A par-4 fairway split by a creek at the turn — the dividing line between front and back | Classic, foundational |
| **Skins** | A single flagstick on an island green, the pin casting a long shadow | High stakes, winner-take-all |
| **Wolf** | A lone golfer on a tee box with three others watching from behind | Strategy, isolation, risk |
| **Snake** | A winding path across a putting green with three subtle curves | Tension, dread, passing the burden |
| **Vegas** | A desert course at sunset with deep shadows between paired cacti | Partnership, the gamble |
| **Match Play** | Two golfers walking opposite sides of a fairway | Head-to-head, mano a mano |
| **Nine Point** | A triangular green with three approach shots converging | Three-way competition |
| **Dots** | A scorecard with scattered ink dots — abstract, almost like a constellation | Detail, accumulation |
| **Sixes** | Six golfers in two rotating threesomes on adjacent holes | Rotation, shifting alliances |
| **Split Sixes** | A fairway splitting into two paths around a central bunker | Division, choice |
| **Scotch** | A links-style pot bunker with a small bridge — the Scottish origins | Tradition, grit |

#### Usage

- **Game guide hero images** — large, full-bleed at the top of each game page
- **Game selection cards** — thumbnail versions on the `/games/` hub page
- **App integration (future)** — subtle watermarks or card art in the game selection and settlement screens
- **Social media** — cropped and formatted as post/story images
- **Print (future)** — high-res originals could be used for merchandise, postcards, or print media if Stick ever does physical marketing

#### Why Watercolor Specifically

- Evokes tradition without feeling dated (watercolor is timeless, not trendy)
- Imperfect edges and organic blending create warmth that digital illustration can't replicate
- Pairs naturally with editorial serif typography
- Creates immediate visual distinction from every competitor (nobody in this space is doing anything like this)
- Scales beautifully from thumbnail to full-bleed
- The slight unpredictability of the medium mirrors the nature of golf itself — you plan your shot but the outcome always has an element of surprise

### 4.5 — Motion & Interaction Design

#### Philosophy

Motion on the site should feel like weather, not machinery. Things drift, settle, and emerge — they don't snap, bounce, or stagger in formation.

#### Specific Treatments

| Element | Motion | Duration | Easing |
|---------|--------|----------|--------|
| **Hero video** | Slow loop, 10-15 seconds, crossfade to repeat | Continuous | N/A |
| **Section content** | Fade up + slight upward drift on scroll-into-view | 600-800ms | Ease-out (gentle deceleration) |
| **Photography** | Subtle parallax (10-15% offset), slower than scroll | Continuous | Linear |
| **Game illustrations** | Fade in with a gentle scale-up from 97% to 100% | 800ms | Ease-out |
| **Navigation** | Minimal — instant state changes, no slide-ins | Immediate | N/A |
| **CTAs / Buttons** | Background color transition on hover | 200ms | Ease |
| **Page transitions** | Content fade, not full page animation | 300ms | Ease-in-out |

#### What We Don't Do

- No scroll-jacking (the user controls the pace)
- No staggered list animations (items appearing one-by-one creates a "loading" feeling)
- No cursor effects or custom cursors
- No horizontal scroll sections
- No loading animations that make the user wait for content that should be instant
- No animation that replays every time an element scrolls in and out of view — once is enough

### 4.6 — Layout & Grid

#### Grid System

- **12-column grid** for desktop (1280px max content width)
- **Generous gutters** — 32px minimum, 48px preferred
- **Section padding** — 120-160px vertical padding between major sections (this is where "space is confidence" lives)
- **Content width for reading** — blog posts and game guides should max out at ~720px for comfortable line length, with the grid creating generous margins on either side
- **Full-bleed moments** — hero sections, photography sections, and CTA sections break the grid and go edge-to-edge

#### The Dark/Light Rhythm

The page should alternate between dark and light sections, creating a visual rhythm as the user scrolls:

```
[DARK]  — Hero (video, headline, CTA)
[LIGHT] — Problem statement / value proposition
[DARK]  — Game showcase (watercolor illustrations on dark canvas)
[LIGHT] — App screenshot / feature detail
[DARK]  — Social proof / testimonials
[LIGHT] — Blog preview / latest content
[DARK]  — Final CTA + footer
```

This isn't a rigid rule — some pages (like game guides) will be primarily light for readability. But for the homepage and key landing pages, this alternation creates cinematic pacing.

---

## 5. Page-Level Direction

### 5.1 — Homepage

**Purpose:** Convert visitors to App Store downloads. Tell the Stick story in one scroll.

**Structure:**

1. **Hero (Dark, Full-Bleed)**
   - Looping video background: moody course footage, atmospheric, slow
   - Stick wordmark (not just the S icon — the full brand name)
   - One headline: punchy, emotional, not a feature list
   - One subtitle: a single sentence explaining what Stick is
   - One CTA: "Download on the App Store"
   - Optional: a subtle "Available on iOS" note

2. **The Problem (Light)**
   - Brief, empathetic copy about the pain of settling bets manually
   - Could use a visual metaphor: a crumpled scorecard, a chaotic group chat, a scribbled napkin calculation
   - Transition into "Stick makes this effortless"

3. **Game Showcase (Dark)**
   - 4-6 featured games displayed as cards with watercolor illustrations
   - Each card: illustration, game name, one-line hook, link to full guide
   - Not all 11 games — curate the selection for impact (Nassau, Wolf, Skins, Snake as headliners)
   - A "See All 11 Games" link to the `/games/` hub

4. **The Product (Light)**
   - One or two carefully chosen app screenshots showing Stick in action
   - Not floating phone mockups — screenshots presented with intention
   - Brief annotations or captions explaining what the viewer is seeing
   - This is where you prove the craft: show a real Nassau settlement, a Wolf partner pick, a multi-game scorecard

5. **How It Works (Optional, Light)**
   - Only if needed for clarity: 3 simple steps (Create Round → Enter Scores → Settle Up)
   - Should not feel like a SaaS onboarding flow
   - Could be skipped entirely if the above sections tell the story clearly enough

6. **Social Proof (Dark)**
   - Testimonials when available
   - Until then: key stats or trust signals (11 games, 1,400+ tests, zero-sum verified, etc.)
   - Could include a quote-style treatment: *"Finally, an app that gets Nassau right."*

7. **From the Blog (Light)**
   - 2-3 latest blog posts with thumbnail images and titles
   - Establishes authority and provides internal links for SEO
   - Clean, editorial layout — not a grid of cards

8. **Final CTA (Dark)**
   - Different course photo from the hero (variety)
   - Repeated headline + CTA
   - Simple, atmospheric, decisive

9. **Footer (Dark)**
   - Navigation links, social links, legal links
   - Stick wordmark
   - Minimal — the footer is not a second homepage

### 5.2 — Game Guide Pages (`/games/[slug]/`)

**Purpose:** Be the internet's best resource for each golf betting game, and convert readers to app downloads.

**Structure:**

1. **Hero (Dark)**
   - Full-bleed watercolor illustration for this game
   - Game name in large serif headline
   - One-line subtitle describing the game
   - "Track with Stick" CTA button

2. **Quick Reference (Light)**
   - At-a-glance box: player count, what you need, complexity level, typical stakes range
   - Designed as a scannable reference card, not a paragraph

3. **How It Works (Light)**
   - Step-by-step rules with clear examples
   - Use named players in examples (not "Player A" — say "Marcus" and "Sarah")
   - Include a settlement walkthrough with real numbers

4. **Variations & House Rules (Light)**
   - Common variations, regional differences, optional rules
   - This is where depth beats Beezer — they don't cover variations

5. **Strategy Tips (Light)**
   - When to press, when to go lone wolf, how handicaps change the calculus
   - This is uniquely valuable content because we built the calculators — we know the math

6. **Common Mistakes (Light)**
   - What new players get wrong, disputes that come up, misunderstood rules

7. **FAQ (Light)**
   - 5-8 questions with structured data (JSON-LD) for rich snippets
   - Answer the actual questions people Google

8. **Mid-Content CTA (Coral accent bar)**
   - "Track [Game] automatically with Stick" + App Store button
   - Appears roughly 60% through the content

9. **Related Games (Light or Dark)**
   - "If you like Nassau, try Wolf" — cross-links to other game guides
   - Uses watercolor illustration thumbnails

10. **Bottom CTA (Dark)**
    - Final download prompt with atmospheric photography

### 5.3 — Blog Posts (`/blog/[slug]/`)

**Purpose:** Capture long-tail SEO traffic and build topical authority.

**Layout:** Clean, reading-focused. One column, 720px max content width. Generous typography. Minimal distraction.

**Structure:**
- Category tag + date
- Headline (serif, large)
- Hero image or illustration
- Content body
- Author attribution (Stick Golf — not a person)
- Related posts
- CTA (subtle — a bar, not a popup)

### 5.4 — Games Hub (`/games/`)

**Purpose:** Entry point to all game guides. Key internal linking page for SEO.

**Layout:** Grid of game cards featuring watercolor illustrations, game names, brief descriptions, and player count indicators. Should feel like browsing an art gallery or a curated collection — not a feature comparison table.

---

## 6. Technical Notes for Development

### Stack

- **Framework:** Next.js 14+ (App Router) with static generation for content pages
- **Styling:** Tailwind CSS with custom design tokens mapped from this brief
- **Content:** MDX for blog posts and game guides (content as code, version-controlled)
- **Hosting:** Vercel (edge caching, analytics, preview deployments)
- **Analytics:** Vercel Analytics + Google Search Console + PostHog
- **Images:** Next.js Image component with automatic optimization
- **Video:** Self-hosted MP4 with poster image fallback (no YouTube embeds in hero)
- **Fonts:** Self-hosted via `next/font` for performance (no external requests)

### Performance Targets

- Lighthouse Performance: 95+
- Largest Contentful Paint: < 2.0s
- Cumulative Layout Shift: < 0.05
- First Input Delay: < 50ms
- Total page weight (homepage): < 2MB (excluding video)
- Video: compressed to ~3-5MB, lazy-loaded, poster image shows first

### SEO Requirements

- Server-side rendered or statically generated (no client-side-only content)
- JSON-LD structured data on every page
- XML sitemap auto-generated
- Canonical tags on every page
- Open Graph images generated per page
- Alt text on every image
- Semantic HTML (proper heading hierarchy, landmark elements)

---

## 7. Open Questions

These need answers before or during development. They don't block the initial scaffold, but they shape the finished product.

1. **Hero video:** Do we source/create this now, or launch with a high-quality static image and add video later? (Recommendation: launch with a stunning static image + subtle CSS animation like a slow ken-burns drift, add video when we have the right footage)

2. **Watercolor illustrations:** Do we generate these with AI tools now and refine later, or commission an artist? (Recommendation: generate a first pass with AI to validate the concept and get the site live, then consider commissioning originals as the brand matures)

3. **Serif typeface:** Need to select the specific font. Free options (Fraunces, Playfair Display, Libre Caslon) vs. commercial (Canela, GT Sectra, Freight Display). Budget consideration.

4. **App screenshots:** Need real screenshots from the current app build for the product section. Justin to provide from device.

5. **Testimonials:** Not available yet. What do we show in the social proof section at launch? (Recommendation: stats and trust signals — "11 games, 1,400+ tests, zero-sum verified")

6. **Stick wordmark:** Does a full "Stick" wordmark exist, or just the S icon? Need a wordmark treatment for the site header and hero.

7. **Social media presence:** Which platforms will Stick be active on? This determines which social links appear in the footer and header.

8. **App Store availability:** iOS only at launch? This affects CTA copy and buttons.

---

## 8. Reference Points Summary

| Reference | What We Take From It |
|-----------|---------------------|
| **The Golfer's Journal (print)** | Grid discipline, generous whitespace, photography as emotion, editorial authority |
| **The Golfer's Journal (web)** | Video hero treatment, dark/atmospheric palette, magazine-quality layout |
| **microsoft.ai** | Scroll-driven storytelling, purposeful motion, restraint in animation, confident simplicity |
| **Stick app (existing)** | Coral accent, warm neutral palette, Figtree type, dark mode aesthetic, game-specific color coding |
| **Watercolor illustration (proposed)** | Organic warmth, tradition without nostalgia, unique visual identity |
| **Vintage clubhouse aesthetic (aspirational)** | Leather and wood, not chrome and glass. Warm, earned, timeless. |

---

## 9. What Success Looks Like

A golfer lands on stickapp.golf from a Google search for "how to play nassau." They're immediately struck by how *good* this site looks — not in a flashy way, but in a "someone cares about this" way. They read the game guide, learn something they didn't know, see the settlement example and think "I wish I had this last Saturday." They see the app CTA, think "this is clearly made by people who actually play these games," and download it.

That's the conversion path. But the deeper success metric is simpler: **does this site make you feel something?** If someone can visit stickapp.golf and leave without a reaction — without thinking "that was different" — then we haven't done our job.

---

*This document is a living brief. It will evolve as we build, test, and learn. But the principles in Sections 3 and 4 are load-bearing walls — they shouldn't change without a good reason and a conversation about why.*
