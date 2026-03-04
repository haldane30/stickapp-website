# Claude Collaboration Guide for Stick Website & Business

**What is this repo?** The marketing website (stickapp.golf) and all business strategy for Stick, a premium golf betting app.

**What is Stick?** A React Native golf betting app with 12 games (Nassau, Skins, Snake, Wolf, Match Play, Nine Point, Split Sixes, Sixes, Junk, Vegas, Scotch, Quota). The app code lives in a separate repo (`Stick/`). This repo is for the website, content, SEO, competitive intelligence, and business strategy.

**Who am I working with?** Justin — solo founder, 25 years UI/UX design, former creative director at large marketing agencies. He cares deeply about quality, aesthetics, and doing things right. He's not a developer but he's technical enough to understand architecture decisions. Treat him as a co-founder and strategic partner.

---

## Folder Structure

```
stickapp-website/
├── CLAUDE.md                    # This file — context for every session
├── CNAME                        # Domain: stickapp.golf
├── index.html                   # Original placeholder page
├── privacy/                     # Privacy policy (live, needed for App Store)
├── terms/                       # Terms of service (live, needed for App Store)
│
├── site/                        # ⭐ THE NEXT.JS SITE (this is the actual website)
│   ├── src/
│   │   ├── app/                 # Next.js App Router pages
│   │   │   ├── page.tsx         # Homepage
│   │   │   ├── layout.tsx       # Root layout
│   │   │   ├── blog/            # Blog listing + [slug] dynamic routes
│   │   │   ├── games/           # Games listing + [slug] dynamic routes
│   │   │   ├── guides/          # Reference guide [slug] dynamic routes
│   │   │   ├── robots.ts        # robots.txt generation
│   │   │   ├── sitemap.ts       # Sitemap generation
│   │   │   └── globals.css      # Global styles (Tailwind)
│   │   ├── content/             # ⭐ WHERE CONTENT ACTUALLY LIVES
│   │   │   ├── blog/            # Blog posts as .mdx files
│   │   │   │   ├── best-golf-betting-apps-2026.mdx
│   │   │   │   └── best-golf-betting-games-3-players.mdx
│   │   │   └── guides/          # Reference guide pages as .mdx files
│   │   │       ├── handicaps.mdx
│   │   │       ├── presses.mdx
│   │   │       └── settlement.mdx
│   │   ├── components/          # React components
│   │   │   ├── Header.tsx
│   │   │   ├── Footer.tsx
│   │   │   ├── GameCard.tsx
│   │   │   ├── JsonLd.tsx
│   │   │   └── mdx/index.tsx    # MDX components (AppReview, Verdict, QA, etc.)
│   │   └── lib/                 # Utilities
│   │       ├── content.ts       # Content loading/parsing
│   │       └── tokens.ts        # Design tokens
│   ├── public/                  # Static assets
│   ├── next.config.ts
│   ├── package.json
│   └── tsconfig.json
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
│   │   ├── content-framework.md        # THE master content framework — structure, voice, SEO, GEO, quality control
│   │   ├── game-aliases.md             # Alternate names/regional variations for every game (SEO keyword reference)
│   │   ├── content-strategy.md         # Overall content approach and guidelines
│   │   ├── content-calendar.md         # What to publish and when
│   │   └── voice-and-tone.md           # Writing guidelines for all Stick content
│   └── brand/                   # Brand and design direction
│       └── design-brief.md             # Website design brief (visual direction, brand territory)
│
├── content/                     # Content drafts and audits (working files, NOT deployed)
│   ├── game-guides/             # Game guide drafts + feature audits
│   │   ├── nassau.md            # Nassau guide draft
│   │   ├── nassau-audit.md      # Nassau feature audit from Claude Code
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

**IMPORTANT:** Content drafts live in `content/` at the repo root. When a draft is finalized, it gets moved to `site/src/content/` as an `.mdx` file for deployment. The `site/` directory is the actual Next.js project that builds and deploys to stickapp.golf.

---

## Business Context

### Current State (March 2026)

| Dimension | Status |
|-----------|--------|
| **App** | Build 21, 12 games (Quota building), 1,448+ tests, pre-launch |
| **Launch phase** | Phase 1 Closed Beta → Masters Week (April 7-13) target |
| **Pricing** | 3-round reverse trial → $59.99/yr hard paywall |
| **Website** | Next.js site live with blog, game routes, guide routes, OG images, UTM tracking, alias redirects |
| **Content** | 12 game guide drafts complete (all waiting review). 2 blog posts live. 3 reference guides live. All 12 games audited. |
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

### The Audit-First Rule (CRITICAL)

**Never write a game guide without first auditing what the app actually does.**

Before writing any game guide, Justin must provide a feature audit from Claude Code (in the app repo). The audit confirms what the game engine supports, what's configurable, what edge cases are handled, and what it does NOT support. This prevents the guide from claiming Stick does something it doesn't.

The audit also works in reverse: research done for the content reveals variations and edge cases that the app might be missing. This feeds improvements back to the app. Every game guide audit produces three outputs:

1. **"Stick Does This" list** — Features to highlight in the guide
2. **"Common Variation" list** — Things golfers do that Stick doesn't track (document educationally, no false product claims)
3. **"Feature Gap" list** — Things the app should probably support (tasks for Claude Code)

Full workflow details in `strategy/content/content-framework.md` Part 10.

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

## Content Status Tracker

At-a-glance view of every content piece — what exists, where it lives, and what state it's in.

### Game Guides

| Game | Research | Audit | Gap Analysis | Draft | Review | Published |
|------|----------|-------|-------------|-------|--------|-----------|
| **Nassau** | Done (`content/game-guides/nassau.md` has inline research) | Done (`content/game-guides/nassau-audit.md`) | Done (in audit doc) | Done (`content/game-guides/nassau.md`) | **Waiting on Justin** | Not yet |
| **Skins** | Done (`content/game-guides/skins-research.md`) | Done (`content/game-guides/skins-audit.md`) | Done (in audit doc) | Done (`content/game-guides/skins.md`) | **Waiting on Justin** | Not yet |
| **Wolf** | Done | Done | Done | Done | **Waiting on Justin** | Not yet |
| **Snake** | Done | Done (`content/game-guides/snake-audit.md`) | Done (in audit doc) | Done (`content/game-guides/snake.md`) | **Waiting on Justin** | Not yet |
| **Match Play** | Done (`content/game-guides/matchplay-audit.md`) | Done (`content/game-guides/matchplay-audit.md`) | Done (in audit doc) | Done (`content/game-guides/matchplay.md`) | **Waiting on Justin** | Not yet |
| **Nine Point** | Done (`content/game-guides/ninepoint-audit.md`) | Done (`content/game-guides/ninepoint-audit.md`) | Done (in audit doc) | Done (`content/game-guides/ninepoint.md`) | **Waiting on Justin** | Not yet |
| **Split Sixes** | Done (`content/game-guides/sixes-research.md`, Game 2 section) | Done (`content/game-guides/splitsixes-audit.md`) | Done (in audit doc) | Done (`content/game-guides/splitsixes.md`) | **Waiting on Justin** | Not yet |
| **Sixes** | Done (`content/game-guides/sixes-research.md`) | Done (`content/game-guides/sixes-audit.md`) | Done (in audit doc) | Done (`content/game-guides/sixes.md`) | **Waiting on Justin** | Not yet |
| **Junk** | Done (`content/game-guides/junk-research.md`) | Done (`content/game-guides/junk-audit.md`) | Done (in audit doc) | Done (`content/game-guides/junk.md`) | **Waiting on Justin** | Not yet |
| **Vegas** | Done (`content/game-guides/vegas-research.md`) | Done (`content/game-guides/vegas-audit.md`) | Done (in audit doc) | Done (`content/game-guides/vegas.md`) | **Waiting on Justin** | Not yet |
| **Scotch** | Done (`content/game-guides/scotch-research.md`) | Done (`content/game-guides/scotch-audit.md` + `scotch-audit-raw.md`) | Done (in audit doc) | Done (`content/game-guides/scotch.md`) | **Waiting on Justin** | Not yet |
| **Quota** | Not yet (will do alongside guide) | Done (`content/game-guides/quota-audit.md`) | Done (in audit doc) | Not started | — | — |

### Blog Posts

| Post | Draft | Review | Published | Live URL |
|------|-------|--------|-----------|----------|
| **Best Golf Betting Apps 2026** | Done | Done | **Live** | `site/src/content/blog/best-golf-betting-apps-2026.mdx` |
| **Best Golf Betting Games for 3 Players** | Done | Done | **Live** | `site/src/content/blog/best-golf-betting-games-3-players.mdx` |

### Reference Guides

| Guide | Draft | Review | Published | Live URL |
|-------|-------|--------|-----------|----------|
| **Handicaps in Golf Betting** | Done | **Waiting on Justin** | **Live** | `site/src/content/guides/handicaps.mdx` |
| **Presses in Golf Betting** | Done | **Waiting on Justin** | **Live** | `site/src/content/guides/presses.mdx` |
| **Settlement Methods** | Done | **Waiting on Justin** | **Live** | `site/src/content/guides/settlement.mdx` |

### Strategy Docs (Reference — All Complete)

| Document | Location |
|----------|----------|
| Content Framework (13 parts) | `strategy/content/content-framework.md` |
| Game Aliases Reference | `strategy/content/game-aliases.md` |
| SEO Master Strategy | `strategy/seo/seo-master-strategy.md` |
| Technical SEO Spec | `strategy/seo/technical-seo-spec.md` |
| Content Strategy | `strategy/content/content-strategy.md` |
| Content Calendar | `strategy/content/content-calendar.md` |
| Voice & Tone Guide | `strategy/content/voice-and-tone.md` |
| Design Brief | `strategy/brand/design-brief.md` |
| Competitive Landscape | `strategy/competitive/landscape.md` |
| SEO Audit | `strategy/competitive/seo-audit.md` |
| Game Comparison | `strategy/competitive/game-comparison.md` |

---

## Workflow for Every Game Guide

This is the established workflow. Future sessions must follow this order:

1. **Original game doc** — Justin provides the game rules doc that the engine was built from. This is the source of truth for what was intended.
2. **Feature audit** — Justin provides Claude Code output showing what the game engine actually supports (what was actually built vs. what was planned)
3. **Research** — Claude researches how golfers actually play the game in the wild (forums, golf sites, Reddit). This fills gaps the original doc may have missed and validates that we're covering the majority of real-world play.
4. **Gap analysis** — Claude compares all three inputs (original doc → audit → real-world research) and produces "Stick Does This" / "Common Variation" / "Feature Gap" lists
5. **Alias and keyword research** — Check `game-aliases.md`, do fresh research, update the doc
6. **Draft the guide** — Following the content framework, verified against the audit
7. **Justin reviews** — Voice, accuracy, "would I share this?" check
8. **Publish** — Technical pass, deploy, index, link back

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

### Session 3 — February 27, 2026

Deep research and framework creation for content production:
- Researched 2026 SEO best practices, AI Overview optimization, GEO (Generative Engine Optimization)
- Researched AI content detection patterns — built comprehensive "Kill List" of words/phrases to avoid
- Created the Content Framework (`strategy/content/content-framework.md`) — 13-part master document covering structure, voice, SEO, GEO, E-E-A-T, production workflow, and skill plan
- Introduced "First 60 Words Rule" — every page opens with a direct, extractable answer for AI citation
- Introduced "Dual Optimization Principle" — writing for both human scanning and AI passage extraction
- Researched alternate names for all 12 games across Reddit, forums, golf blogs
- Created Game Aliases Reference (`strategy/content/game-aliases.md`) — every known alternate name per game
- Established the Audit-First Rule and three-list gap analysis workflow
- Wrote Nassau game guide draft (~2,700 words), verified against feature audit, passed Part 8 checklist

### Session 4 — February 27, 2026

Content audit and system improvements:
- Discovered Next.js site already exists in `site/` directory — updated CLAUDE.md folder structure to reflect reality
- Found "Best Golf Betting Apps 2026" blog post already live at `site/src/content/blog/best-golf-betting-apps-2026.mdx`
- Ran Part 8 checklist audit on the blog post — found 6 issues:
  1. Kill list violation: "landscape" → replaced with plain language
  2. Corporate speak: "distribution advantage" → plain language
  3. Zero outbound links → added USGA link on equitable stroke control
  4. Three FAQ answers under 40-word minimum → expanded all three
  5. FAQ self-containment violation (Nassau Q referenced another page) → rewrote as standalone
  6. Noted review length asymmetry (Stick 250 words vs competitors 85-150) — flagged for Justin
- Saved Skins research document to `content/game-guides/skins-research.md`
- Created Skins feature audit prompt for Claude Code
- Added Content Status Tracker to CLAUDE.md — at-a-glance table showing every content piece, its state, and file location
- Updated CLAUDE.md with corrected folder structure, current state, and session history

### Session 5 — February 27, 2026

Skins game guide — full audit-first workflow:
- Received Skins feature audit from Claude Code (65 tests, 12 property-based checks, 9 config fields)
- Created three-list gap analysis (`content/game-guides/skins-audit.md`)
- Key finding: Half-handicap mode is the #1 feature gap — common in tournaments, Justin's buddy asked about it, critical for Events vision
- Key finding: Viewer selectors assume fixed value model (pot/escalating display incorrect)
- Created Claude Code prompt for half-handicap implementation and selector fixes
- Wrote Skins game guide draft (~2,300 words) — carryover walkthrough, two settlement examples (fixed + pot), validation/proofs, 8 FAQ questions
- Verified all product claims against audit — zero false claims
- Ran Part 8 checklist — fixed: kill list violation ("landscape" → "math"), added 3 internal links (match-play, nassau, dots), added outbound link (PGA Tour Skins Game history), trimmed meta description to 140 chars
- Guide ready for Justin's voice/accuracy review

### Session 6 — February 28, 2026

Continued game guide production (Vegas, Junk, Sixes):
- Completed Vegas game guide — full audit-first workflow, fixed settlement math errors, added Daytona/Las Vegas aliases
- Renamed Dots → Junk across 19 files (Stick's internal name changed; Dots kept as SEO alias)
- Completed Junk game guide — 11 categories, three dot types, fixed greenie carryover false claim
- Provided Sixes audit prompt
- Started Sixes research (18 sources)

### Session 7 — March 1, 2026

Sixes game guide — full audit-first workflow:
- Received Sixes feature audit from Claude Code (71 tests, 13 config fields, 4 dead)
- Created three-list gap analysis (`content/game-guides/sixes-audit.md`)
- Key finding: "1 & 0" display bug — should show "1 UP" when match ends on final hole
- Key finding: Narrative reports bet amount ($10) not payout amount ($20) — user confusion risk
- Key finding: Manual presses are the biggest gap vs. real-world play (typed infrastructure exists but calculator ignores it)
- Key finding: Dead config fields (scoringMethod, matchPlayScoring, initialRotation, storedPresses) — tech debt, no user impact
- Updated game-aliases.md with expanded Sixes entry (FAQ candidates, new search terms)
- Wrote Sixes game guide draft (~2,200 words) — partnership rotation table, best-ball scoring, full 3-match settlement walkthrough
- Part 8 checklist review found and fixed:
  1. Settlement table math wrong — losers showed -$10 instead of -$20 (pairwise = pay each winner). Fixed entire table.
  2. Meta description too long (171 chars → trimmed to 139)
  3. Missing mid-content CTA → added after handicaps section
  4. Nassau-style Sixes description had wrong hole numbers → rewritten
  5. No Wolf internal link → added naturally in partnerships section
- Final guide: 5 internal links (Nassau, Wolf, Junk, Skins, Match Play), 1 outbound (USGA), 9 FAQ questions, zero kill list violations, zero false product claims
- Guide ready for Justin's voice/accuracy review

### Session 8 — March 1, 2026 (continued)

Scotch game guide — full audit-first workflow (no original game doc):
- This was the first game without an original game doc — relied entirely on research + audit
- Established raw audit storage practice: `scotch-audit-raw.md` preserves full Claude Code output alongside the gap analysis
- Researched Scotch from 18+ sources (`content/game-guides/scotch-research.md`)
- Received Scotch feature audit from Claude Code (118 tests, 14 config fields, 5 category evaluators)
- Created three-list gap analysis (`content/game-guides/scotch-audit.md`)
- Key finding: Tie handling conflict — Stick voids tied category points, most golfers expect them to split. Both are valid but guide must address honestly.
- Key finding: Bug #1 — maxMultiplier never reaches engine. UI toggle is cosmetic. Users who enable caps get zero protection. Exposure unbounded with umbrella + rolls.
- Key finding: Bug #2 — "3-Putt Loses Prox" toggle exists but UI never populates the data. Feature is non-functional.
- Key finding: Scotch is most feature-rich engine in Stick (umbrella, roll/hammer, eagle bonus, high ball, natural birdie toggle). Competitive advantage over Beezer/18Birdies.
- Updated game-aliases.md with expanded Scotch entry (FAQ candidates, Scotch Foursomes disambiguation, "6-Point" ambiguity)
- Wrote Scotch game guide draft (~2,250 words) — four-category point table, umbrella mechanics, 6-hole settlement walkthrough, roll/hammer explanation
- Part 8 checklist review found and fixed:
  1. Settlement table had multiple math errors (wrong winners, wrong point totals, umbrella not applied). Rebuilt entire 6-hole table from scratch.
  2. Per-hole example had a draft artifact mid-cell ("—wait, team B has 7"). Rewritten cleanly.
  3. Meta description too long (168 chars → trimmed to 142)
  4. Natural birdie description contradicted itself (said "gross birdies—actual net-or-better"). Fixed to clearly explain gross vs net.
  5. High Ball description was confused (said "combined" when it means "worst individual"). Fixed.
  6. Missing mid-content CTA → added after roll/hammer section
  7. Missing outbound link → added USGA stroke allocation
  8. Missing Junk internal link → added in comparisons section
  9. False claim about Stick "randomly assigning" prox → fixed to "manual entry"
  10. FAQ settlement answer had wrong math → fixed to match team-based model
- Final guide: 5 internal links (Nassau, Skins, Match Play, Sixes, Junk), 1 outbound (USGA), 9 FAQ questions, zero kill list violations, zero false product claims
- Guide ready for Justin's voice/accuracy review

### Session 9 — March 1, 2026 (continued)

Split Sixes audit + engine bug prompts:
- Wrote Claude Code bug fix prompt for all outstanding Sixes + Scotch engine issues (`content/game-guides/sixes-scotch-bugfix-prompt.md`)
  - 6 bugs total: 3 Sixes (1 & 0 display, narrative bet/payout mismatch, infinite loop guard), 3 Scotch (maxMultiplier pipeline, proxPlayerThreePutt data flow, Game Info Sheet docs)
  - Each bug includes specific file references, expected fix approach, and test requirements
  - Scotch maxMultiplier flagged as highest priority (fix before launch)
- Wrote Claude Code audit prompt for Split Sixes (`content/game-guides/splitsixes-audit-prompt.md`)
  - Customized from template with 11 sections (added UI integration section)
  - Front-loaded tie distribution questions (the tricky part of Split Sixes)
  - Seeded with research context from `sixes-research.md`
- Received Split Sixes feature audit from Claude Code (40 tests, 9 config fields, 0 bugs)
- Saved raw audit output (`content/game-guides/splitsixes-audit-raw.md`)
- Created three-list gap analysis (`content/game-guides/splitsixes-audit.md`)
  - Key finding: Cleanest engine in Stick's lineup — zero bugs, zero dead code, zero display issues
  - Key finding: Thin wrapper over Nine Point engine with `pointSystem: '4-2-0'` — inherits Nine Point's robustness
  - Key finding: Blitz (sweep all 6 on 2+ margin) and Birdie Double (all points ×2 on birdie) are genuine differentiators no competitor highlights
  - Key finding: Nassau structure supported in engine but not exposed in UI — uncommon for Split Sixes anyway
  - Key finding: Biggest real-world gap is "Nasty" penalty for 0-point holes (common house rule, low engineering effort)
  - Key finding: No partial handicap allowance (same gap as Skins and Sixes — important for Events)
- Updated game-aliases.md with expanded Split Sixes entry (FAQ candidates, Nine Point confusion angle, new search terms)
- Updated Content Status Tracker: Split Sixes now at Research ✓, Audit ✓, Gap Analysis ✓

### Session 10 — March 1, 2026 (continued)

Split Sixes guide + Quota audit:
- Drafted Split Sixes game guide (~1,800 words) (`content/game-guides/splitsixes.md`)
  - Leads with three-player angle ("the best golf betting game for 3 players" in title — strong search term)
  - 5-hole walkthrough with full handicap math, fixed stroke inconsistency on hole 5
  - Full settlement example: Justin +$18, Jason +$6, Evan -$24 = $0 zero-sum verified
  - Blitz and birdie double explained with stacking scenario (12 points on a single hole)
  - Split Sixes vs Nine Point comparison table — highlights the 0 vs 1 for worst player difference
  - 8 internal links (Skins, Wolf, Nassau, Nine Point, Sixes, Match Play, Junk, Scotch), 1 outbound (USGA)
  - 8 FAQ questions targeting key search confusion (Sixes vs Split Sixes, vs Nine Point, English alias, 4-player question)
  - Part 8 checklist passed: zero kill list violations, zero false product claims, all math verified
- Wrote Claude Code audit prompt for Quota (`content/game-guides/quota-audit-prompt.md`)
  - 13 sections (added Leaderboard/Ranking and Events Readiness beyond standard 11)
  - Front-loaded the gross-scoring question (Quota is unique — handicap in target, not per-hole)
  - Events readiness section asks about scaling, cross-group aggregation, tournament fields
- Received Quota feature audit from Claude Code (67 tests, 14 property checks, ~3,200 random iterations, 0 bugs)
- Saved raw audit output (`content/game-guides/quota-audit-raw.md`)
- Created three-list gap analysis (`content/game-guides/quota-audit.md`)
  - Key finding: Architecturally unique — only game that uses gross scoring with handicap baked into quota target (not per-hole strokes)
  - Key finding: Zero bugs, zero dead config, zero display issues. Second-highest test coverage in lineup.
  - Key finding: No player cap — engine explicitly designed for 30+ players. Calculator comment references "future Events feature."
  - Key finding: Engine is Events-ready (O(n×h) calc, O(n²) settlement, gross scores universal). Orchestration layer is what needs building.
  - Key finding: QuotaPointValues interface supports full custom point scales (all 6 brackets) but only 2 are exposed in config (eagle, triple bogey). Modified Stableford is architecturally ready.
  - Key finding: Chicago 39 variant supported (harder target). Convex validators reference a future "pool" settlement type (not yet implemented).
- Updated game-aliases.md with expanded Quota entry (FAQ candidates, Stableford/Modified Stableford distinction, large groups angle, 36-vs-39 explanation)
- Updated Content Status Tracker: All 12 games now audited. Split Sixes guide drafted. Quota ready for research + guide.

### Session 11 — March 4, 2026

Gemini audit review + strategic SEO buildout:
- Reviewed Gemini AI audit of the website — verified 4 technical fixes (sitemap updatedAt, OG image tags, UTM tracking, commented internal links)
- Noted Gemini's OG image tags were pointing to nonexistent files — flagged for fix
- Brainstormed 4 strategic ideas, ranked by ROI: D (alias redirects) → B (reference pages) → A (calculators, park) → C (video, park)
- Built 22 permanent 301 alias redirects in `next.config.ts` (Dots→Junk, Hollywood→Sixes, Chicago→Quota, etc.)
- Created `/guides/[slug]` content type infrastructure (GuidePageMeta type, content loading, routing, sitemap, JSON-LD schemas)
- Wrote 3 reference guide pages:
  - **Handicaps** (`site/src/content/guides/handicaps.mdx`) — off-low-man net scoring, which games use which model, team handicaps, 8 FAQ
  - **Presses** (`site/src/content/guides/presses.mdx`) — auto vs manual, press chains, 5 rules to set, settlement walkthrough, 8 FAQ
  - **Settlement** (`site/src/content/guides/settlement.mdx`) — 3 methods (pairwise, team pot, single liability), comparison table for all 12 games, 8 FAQ
- Internal linking pass across all 12 game guides + both blog posts — added contextual links to reference pages
- Added reference guides sections to blog listing page and games hub page (discovery surfaces)
- Converted "Best Golf Betting Games for 3 Players" draft to deployed MDX blog post
- Added reference guide links to Footer "Learn" column
- Fixed UTM tracking on Header, Footer, and blog post Download CTAs (were pointing to `#download`, now App Store URLs with UTM params)
- Uncommitted the Nassau handicaps internal link

### Session 12 — March 4, 2026 (continued)

OG images + CLAUDE.md update:
- Generated 18 OG images (1200×630 PNG) for all pages: homepage, 12 game guides, 3 reference guides, 2 blog posts
  - Brand-consistent: dark background (#0F0F0F), category color-coding (coral=games, forest=reference, gold=blog/home), serif titles
  - Images saved to `site/public/og/[slug].png`
- Added OG image references to blog post metadata (were missing)
- Added twitter card image tags to all page types (games, guides, blog, homepage)
- Updated CLAUDE.md with session history, folder structure, and content tracker

### What's Next

1. **Masters Week content** — April 7 launch target is 5 weeks away. Content needs to publish by mid-March for indexing. Brainstorm angle and write.
2. **Guide reviews** — 12 game guides + 3 reference pages + 2 blog posts waiting on Justin's voice/accuracy pass
3. **Quota guide** — Audit and gap analysis done. Needs web research, then draft. Last remaining game guide.
4. **Engine bug fixes** — Prompt written (`sixes-scotch-bugfix-prompt.md`). Ready to hand to Claude Code. 6 bugs across Sixes + Scotch. Scotch maxMultiplier is highest priority (fix before launch).
5. **Content calendar update** — Calendar shows "Not started" for items that are done. Needs refresh.
6. **Build content skill** — After enough guides reviewed and published
7. **Raw audit backfill** — Raw audit storage established for Scotch, Split Sixes, and Quota. Could backfill earlier games if re-audited.
