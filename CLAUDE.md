# Claude Collaboration Guide for Stick Website & Business

**What is this repo?** The marketing website (stickapp.golf) and all business strategy for Stick, a premium golf betting app.

**What is Stick?** A React Native golf betting app with 12 games (Nassau, Skins, Snake, Wolf, Match Play, Nine Point, Split Sixes, Sixes, Dots, Vegas, Scotch, Quota). The app code lives in a separate repo (`Stick/`). This repo is for the website, content, SEO, competitive intelligence, and business strategy.

**Who am I working with?** Justin — solo founder, 25 years UI/UX design, former creative director at large marketing agencies. He cares deeply about quality, aesthetics, and doing things right. He's not a developer but he's technical enough to understand architecture decisions. Treat him as a co-founder and strategic partner.

---

## Folder Structure

```
stickapp-website/
├── CLAUDE.md                    # This file — context for every session
├── CNAME                        # Domain: stickapp.golf
├── index.html                   # Current placeholder (will become Next.js)
├── privacy/                     # Privacy policy (live, needed for App Store)
├── terms/                       # Terms of service (live, needed for App Store)
│
├── strategy/                    # All strategy docs
│   ├── seo/                     # SEO strategy, keyword research, tracking
│   │   ├── seo-master-strategy.md      # The master SEO plan (includes keyword research)
│   │   └── technical-seo-spec.md       # Engineering blueprint: schema, rendering, linking, performance
│   ├── competitive/             # Competitive intelligence
│   │   ├── landscape.md                # Who the competitors are and how they position
│   │   ├── seo-audit.md                # Who ranks for what, content gaps
│   │   └── game-comparison.md          # Game-by-game feature comparison
│   ├── content/                 # Content strategy and calendar
│   │   ├── content-strategy.md         # Overall content approach and guidelines
│   │   ├── content-calendar.md         # What to publish and when
│   │   └── voice-and-tone.md           # Writing guidelines for all Stick content
│   └── brand/                   # Brand and design direction
│       └── design-brief.md             # Website design brief (visual direction, brand territory)
│
├── content/                     # Actual content files
│   ├── game-guides/             # Deep game guide pages (1500-2500 words each)
│   │   ├── nassau.md
│   │   ├── skins.md
│   │   └── ... (one per game)
│   └── blog/
│       ├── drafts/              # Work in progress
│       └── published/           # Final versions
│
└── assets/                      # Visual assets
    ├── photography/             # Course photography, hero images
    ├── illustrations/           # Watercolor game illustrations
    └── screenshots/             # App screenshots for the website
```

---

## Business Context

### Current State (February 2026)

| Dimension | Status |
|-----------|--------|
| **App** | Build 21, 12 games (Quota building), 1,448+ tests, pre-launch |
| **Launch phase** | Phase 1 Closed Beta → Masters Week (April 7-13) target |
| **Pricing** | 3-round reverse trial → $59.99/yr hard paywall |
| **Website** | Placeholder page live. Next.js rebuild planned. |
| **Content** | Zero published content. Strategy complete. |
| **Revenue** | $0. Pre-revenue. |

### Business Model

- Free to join any round (viewers/players don't pay)
- Free to create 3 rounds (reverse trial — full access, creates loss aversion)
- $59.99/year or $7.99/month to create rounds after trial
- The viral loop: one person pays to create a round, invites 1-3 free players who experience the full app

### Competitors

| Competitor | Price | Games | Threat Level | SEO Presence |
|------------|-------|-------|-------------|-------------|
| **Skins App** | $40/yr | 13+ | High (Troon partnership) | Low (no content strategy) |
| **Beezer Golf** | $29.99/yr | ~30 | Medium | **High** (ranks #1 for niche queries) |
| **18 Birdies** | $99.99/yr | 10 | Low (GPS-first, betting is secondary) | Medium |
| **GolfApp.com** | Free | ~8 | Watch | Low |
| **Golf Bettor** | $9.99/yr | 12 | Low | Low |

### Our Moat

- 12 games with depth (press-the-press chains, hammer mode, zero-sum verification)
- 1,448+ engine tests — every edge case covered
- Multi-device real-time sync
- Designer-built UI (Justin's 25 years of experience)
- Future: Events feature for multi-group tournaments (30+ players)

---

## Website Strategy (Key Decisions)

### Tech Stack (Decided)
- **Framework:** Next.js 14+ (App Router)
- **Styling:** Tailwind CSS
- **Content:** MDX files (content as code)
- **Hosting:** Vercel
- **Analytics:** Vercel Analytics + Google Search Console + PostHog
- **Domain:** stickapp.golf

### Design Direction (Decided)
- Inspired by The Golfer's Journal (editorial authority) and microsoft.ai (purposeful motion)
- Serif headlines + sans-serif body (editorial voice + product voice)
- Dark/light alternating section rhythm
- Watercolor illustrations for each of the 12 games
- Color palette: Canvas Dark #0F0F0F, Canvas Light #FAF8F5, Coral #E8735A, Forest #2A4A3A, Gold #C4A45A
- Full design brief in `strategy/brand/design-brief.md`

### SEO Strategy (Decided)
- **Core insight:** Nobody owns "golf betting" on the internet. Beezer is the only competitor doing SEO, and their content is thin (300-500 words).
- **Approach:** Build the internet's best golf betting resource, game by game
- **Game guides:** 1500-2500 words each, deeply authoritative, with real settlement examples
- **Blog cadence:** 2-4 posts/month
- **Priority keywords:** "best golf betting apps" (zero competition), nassau golf, wolf golf game, golf skins game
- **Day-one priority:** "Best Golf Betting Apps 2026" blog post (no roundup exists yet)
- Full strategy in `strategy/seo/seo-master-strategy.md`

### Content Strategy (Decided)
- 3-layer approach: Game guide pillar pages → Blog content → Authority/link building
- Game guide publishing order: Nassau → Skins → Wolf → Snake (highest search volume first)
- Launch with 4 game guides + 2 blog posts, then add 2 game guides/week until all 12 live
- Voice: Authoritative but approachable. "We know because we built the calculators."
- Brand voice: "Stick Golf" (not personal brand)

---

## Content Quality Standards

### Game Guide Template

Every game guide follows this structure (1500-2500 words):

1. **Hero / TL;DR** — One-paragraph summary
2. **What You Need** — Player count, what to track, equipment
3. **How It Works** — Step-by-step rules with named player examples
4. **Scoring & Settlement** — Real scenario with actual math (this is where we crush Beezer)
5. **Variations** — Common house rules, regional differences
6. **Strategy Tips** — When to press, when to go lone wolf, etc.
7. **Common Mistakes** — What new players get wrong
8. **FAQ Section** — 5-8 questions (structured data for rich snippets)
9. **CTA** — "Track [Game] automatically with Stick" + App Store link

### Before Any Content Goes Live

- [ ] Target keyword in title, H1, first 100 words, meta description
- [ ] At least 3 internal links to other site pages
- [ ] FAQ section with 5+ questions (JSON-LD structured data)
- [ ] App Store CTA appears at least twice (mid-content and end)
- [ ] Images have descriptive alt text
- [ ] Meta description is 150-160 chars with keyword and CTA
- [ ] Content is genuinely useful even without the app pitch
- [ ] Settlement example uses realistic numbers and named players
- [ ] Mobile formatting checked

### Voice & Tone

- **Authoritative:** We built calculators that handle every edge case
- **Approachable:** Write for the Saturday morning foursome
- **Practical:** Always include "here's what to do" not just "here's what it is"
- **Honest:** When comparing competitors, be fair
- **No corporate speak:** "Stick tracks your Nassau" not "Stick provides automated Nassau tracking functionality"

---

## SEO Technical Requirements

### Every Page Must Have
1. Unique title tag: `{Page Title} | Stick Golf`
2. Meta description: 150-160 chars with target keyword and CTA
3. Open Graph tags (title, description, image)
4. Canonical URL (self-referencing)
5. JSON-LD structured data (Article, FAQPage, SoftwareApplication)
6. Alt text on all images
7. Internal links to 2-3 other pages minimum
8. Mobile-first design

### URL Structure
- Game guides: `/games/[slug]/` (e.g., `/games/nassau/`)
- Blog posts: `/blog/[slug]/` (no dates in URLs)
- Clean, keyword-rich, lowercase, hyphens, no trailing slashes

---

## Competitive Intelligence Protocol

When researching competitors, track:

1. **Product:** What games do they offer? What's their UX like? What do users complain about?
2. **SEO:** What keywords do they rank for? What content do they publish? How deep is it?
3. **Pricing:** What do they charge? What's in free vs paid?
4. **Distribution:** Where do they show up? Partnerships? Press coverage?
5. **Gaps:** What are they NOT doing that we could own?

Store findings in `strategy/competitive/` and update regularly.

---

## Medium-Term Vision: Events (Multi-Group Tournaments)

Justin's club runs weekly quota + skins for 20-30 players across 6-8 groups. No competitor supports this. The Events feature would:

- Let one organizer create an event containing multiple groups
- Aggregate results across groups in real time
- Show cross-group leaderboards (quota rankings, skins resolution)
- Create the "did my birdie hold?" real-time tension moment
- Turn the viral loop from 1:3 to 1:30

This is post-launch (2-4 months after App Store release). The Quota game engine is designed to scale to 30+ players in anticipation of this.

---

## Cross-Reference: App Repo Docs

These documents live in the app repo (`Stick/`) and contain relevant context:

| Document | Location | Relevance |
|----------|----------|-----------|
| Game rules (all 12) | `Stick/docs/games/*.md` | Source material for game guide content |
| Capabilities spec | `Stick/docs/STICK-CAPABILITIES-SPEC.md` | Technical details of each game |
| Launch plan | `Stick/docs/business/launch-plan.md` | Timeline, ASO, compliance |
| Pricing strategy | `Stick/docs/business/pricing-strategy.md` | $59.99/yr rationale |
| Partnerships | `Stick/docs/business/partnerships.md` | Influencer strategy |
| Strategic roadmap | `Stick/docs/business/strategic-roadmap.md` | Master plan, all decisions |
| Game roadmap | `Stick/docs/business/game-roadmap.md` | What to build next, Events vision |

When writing game guide content, always reference the corresponding game rules doc in the app repo for accuracy. The rules docs contain settlement math, edge cases, and configuration options that should inform the website content.

---

## Session History

### Sessions 1-2 — February 27, 2026

Established all strategic foundations:
- Deep codebase review of the Stick app
- Created website & SEO strategy (competitive landscape, site architecture, content calendar)
- Created website design brief (visual direction, color palette, typography, watercolor illustrations, motion)
- Researched and prioritized game roadmap (confirmed Quota as #12, documented Events vision)
- Created strategic roadmap as living document
- Researched Quota game rules and created full game rules doc with V1 implementation scope
- Set up this folder structure and CLAUDE.md
- Migrated strategy docs from app repo to this website repo
- Created competitive intelligence framework (SEO audit tracker, game comparison matrix)
- Created content strategy framework (master strategy, content calendar, voice & tone guide)

### What's Ready to Execute

1. **Write first game guide (Nassau)** — highest priority content piece
2. **Write "Best Golf Betting Apps 2026" blog post** — zero competition keyword
3. **Scaffold Next.js project** — technical foundation for the site
4. **Begin competitive intelligence tracking** — fill in the SEO audit tracker with real data
