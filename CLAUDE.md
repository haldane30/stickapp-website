# Claude Collaboration Guide for Stick Website & Business

**What is this repo?** The marketing website (stickapp.golf) and all business strategy for Stick, a premium golf betting app.

**What is Stick?** A React Native golf betting app with 12 games (Nassau, Skins, Snake, Wolf, Match Play, Nine Point, Split Sixes, Sixes, Junk, Vegas, Scotch, Quota). The app code lives in a separate repo (`Stick/`). This repo is for the website, content, SEO, competitive intelligence, and business strategy.

**Who am I working with?** Justin — solo founder, 25 years UI/UX design, former creative director at large marketing agencies. He cares deeply about quality, aesthetics, and doing things right. He's not a developer but he's technical enough to understand architecture decisions. Treat him as a co-founder and strategic partner.

---

## Folder Structure

```
stickapp-website/
├── CLAUDE.md                    # This file
├── site/                        # ⭐ THE NEXT.JS SITE
│   ├── src/
│   │   ├── app/                 # Next.js App Router pages
│   │   ├── content/             # ⭐ WHERE CONTENT LIVES (deployed as .mdx)
│   │   │   ├── blog/            # Blog posts
│   │   │   ├── games/           # Game guides (all 12 live)
│   │   │   └── guides/          # Reference guides
│   │   ├── components/          # React components (Header, Footer, GameCard, mdx/)
│   │   └── lib/                 # content.ts, tokens.ts
│   └── public/                  # Static assets, OG images
├── strategy/                    # All strategy docs (see index below)
├── content/                     # Content drafts and audits (NOT deployed)
│   ├── game-guides/             # Drafts + audit files per game
│   └── blog/
└── assets/                      # Photography, illustrations, screenshots
```

**IMPORTANT:** Drafts live in `content/` at repo root. When finalized, they move to `site/src/content/` as `.mdx` files for deployment.

---

## Business Context

### Current State (April 2026)

| Dimension | Status |
|-----------|--------|
| **App** | Build 21, 12 games, 1,448+ tests, pre-launch |
| **Launch phase** | Phase 1 Closed Beta → Masters Week (April 7-13) target |
| **Pricing** | 3-round reverse trial → $59.99/yr hard paywall |
| **Website** | Next.js site live: 12 game guides, 4 blog posts, 4 reference guides, OG images, UTM tracking, alias redirects |
| **Revenue** | $0. Pre-revenue. |

### Business Model
- Free to join any round (viewers/players don't pay)
- Free to create 3 rounds (reverse trial — full access, creates loss aversion)
- $59.99/year or $7.99/month to create rounds after trial
- The viral loop: one person pays to create, invites 1-3 free players who experience the full app

### Competitors

| Competitor | Price | Games | Threat Level | SEO Presence |
|------------|-------|-------|-------------|-------------|
| **Skins App** | $40/yr | 13+ | High (Troon partnership) | Low |
| **Beezer Golf** | $29.99/yr | ~30 | Medium | **High** (ranks #1 for niche queries) |
| **18 Birdies** | $99.99/yr | 10 | Low (GPS-first) | Medium |
| **GolfApp.com** | Free | ~8 | Watch | Low |
| **Golf Bettor** | $9.99/yr | 12 | Low | Low |

### Our Moat
- 12 games with depth (press-the-press chains, hammer mode, zero-sum verification)
- 1,448+ engine tests — every edge case covered
- Multi-device real-time sync
- Designer-built UI
- Future: Events feature for multi-group tournaments (30+ players)

---

## Website Strategy (Key Decisions)

### Tech Stack
- **Framework:** Next.js 14+ (App Router) | **Styling:** Tailwind CSS | **Content:** MDX | **Hosting:** Vercel
- **Analytics:** Vercel Analytics + Google Search Console + PostHog | **Domain:** stickapp.golf

### Design Direction
- Serif headlines + sans-serif body. Dark/light alternating section rhythm.
- Color palette: Canvas Dark `#0F0F0F`, Canvas Light `#FAF8F5`, Coral `#E8735A`, Forest `#2A4A3A`, Gold `#C4A45A`
- Full brief in `strategy/brand/design-brief.md`

### SEO + Content Strategy
- Core insight: Nobody owns "golf betting" on the internet. Beezer is the only competitor doing SEO, and their content is thin (300-500 words).
- Approach: Build the internet's best golf betting resource, game by game
- Game guides: 1500-2500 words, deeply authoritative, with real settlement examples
- Blog cadence: 2-4 posts/month
- Voice: Authoritative but approachable. "We know because we built the calculators."

---

## Content Operations System

**Three docs that run the content strategy. Read these at the start of every session.**

| Document | Purpose | Location |
|----------|---------|----------|
| **Content Pipeline** | Active queue. Every opportunity by status + priority. Start here. | `strategy/content/content-pipeline.md` |
| **Content Calendar** | Timing layer. Content mapped to golf season moments. | `strategy/content/content-calendar.md` |
| **SEO Scoreboard** | Feedback loop. What's ranking, what's not, where to double down. | `strategy/seo/seo-scoreboard.md` |

### Session Start Protocol
1. Read `content-pipeline.md` — know what's next
2. Read `content-calendar.md` — check for time-sensitive seasonal moments
3. Read `seo-scoreboard.md` — check if new data changes priorities
4. There should always be 3-4 pieces at "Researched + Outlined" status in the pipeline

### Content Production Rules
- Always maintain 3-4 pieces at "Researched + Outlined" stage
- Tier 1 before Tier 2 before Tier 3. Exceptions for seasonal timing.
- After publishing anything, update Pipeline status and Calendar dates.

### Weekly Intelligence Briefing
When Justin asks "what should we focus on?" or "run the briefing," read pipeline + calendar + scoreboard, do a quick web search for trending golf queries and competitor activity, check Pounce List triggers, and write a conversational briefing with recommended focus.

---

## Content Quality Standards

### The Audit-First Rule (CRITICAL)

**Never write a game guide without first auditing what the app actually does.**

Before writing any game guide, Justin provides a feature audit from Claude Code (app repo). Every game guide audit produces three outputs:
1. **"Stick Does This" list** — Features to highlight in the guide
2. **"Common Variation" list** — Things golfers do that Stick doesn't track (document educationally, no false claims)
3. **"Feature Gap" list** — Things the app should probably support (tasks for Claude Code)

Full workflow in `strategy/content/content-framework.md` Part 10.

### Game Guide Template (1500-2500 words)
1. Hero / TL;DR
2. What You Need — player count, what to track
3. How It Works — step-by-step with named player examples
4. Scoring & Settlement — real scenario with actual math
5. Variations — house rules, regional differences
6. Strategy Tips
7. Common Mistakes
8. FAQ Section — 5-8 questions (structured data for rich snippets)
9. CTA — "Track [Game] automatically with Stick" + App Store link

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
- **No corporate speak:** "Stick tracks your Nassau" not "Stick provides automated Nassau tracking functionality"

---

## SEO Technical Requirements

Every page must have:
1. Unique title tag: `{Page Title} | Stick Golf`
2. Meta description: 150-160 chars with target keyword and CTA
3. Open Graph tags + twitter card (title, description, image)
4. Canonical URL (self-referencing)
5. JSON-LD structured data (Article, FAQPage, SoftwareApplication)
6. Alt text on all images
7. Internal links to 2-3 other pages minimum

URL structure: `/games/[slug]/` · `/blog/[slug]/` · `/guides/[slug]/` — clean, lowercase, hyphens, no trailing slashes

---

## Workflow for Every Content Piece

Full details in `strategy/content/content-framework.md` Parts 10 and 11.

1. **Pre-Draft Research Protocol (REQUIRED)** — Keyword harvesting, competitor content audit, search intent classification, internal linking pre-plan, schema strategy, app context loading, existing content review. Present findings to Justin before outlining. Output: content brief in `content/briefs/`
2. **Outline** — Each H2 targets a keyword or PAA question
3. **Draft** — Following content framework, Part 8 checklist, kill list, voice guide
4. **Justin reviews** — Voice, accuracy, "would I share this?" check
5. **Publish** — Technical pass, deploy, index
6. **Ecosystem update (REQUIRED)** — (1) Update existing pages with new research insights, (2) Execute bidirectional linking plan, (3) Bump `updatedAt` on any page with substantive changes
7. **Post-publish validation (within 72 hours)** — Indexing check, AI citation check (Perplexity + ChatGPT), schema validation. Log in SEO Scoreboard.

**Additional steps for game guides:** Justin provides original game doc + Claude Code feature audit before Step 1. Gap analysis between Steps 1-2. Every product claim verified against audit.

**Retroactive Audit:** All published pages need the Pre-Draft Research Protocol applied retroactively. Progress tracked in `strategy/content/retroactive-audit-plan.md`.

---

## Content Status Tracker

All content live on stickapp.golf.

### Game Guides — All 12 Live (`/games/[slug]/`)

| Game | Audit File |
|------|-----------|
| Nassau | `content/game-guides/nassau-audit.md` |
| Skins | `content/game-guides/skins-audit.md` |
| Wolf | `content/game-guides/wolf.md` |
| Snake | `content/game-guides/snake-audit.md` |
| Match Play | `content/game-guides/matchplay-audit.md` |
| Nine Point | `content/game-guides/ninepoint-audit.md` |
| Split Sixes | `content/game-guides/splitsixes-audit.md` |
| Sixes | `content/game-guides/sixes-audit.md` |
| Junk | `content/game-guides/junk-audit.md` |
| Vegas | `content/game-guides/vegas-audit.md` |
| Scotch | `content/game-guides/scotch-audit.md` |
| Quota | `content/game-guides/quota-audit.md` |

### Blog Posts — 4 Live (`/blog/[slug]/`)
- Golf Betting for Beginners
- Best Golf Betting Apps in 2026
- Best Golf Betting Games for 3 Players
- Best Golf Betting Games for Masters Week

### Reference Guides — 4 Live (`/guides/[slug]/`)
- Handicaps in Golf Betting
- Presses in Golf Betting
- Settlement Methods
- Golf Betting Glossary

---

## Strategy Docs Index

| Document | Location |
|----------|----------|
| Content Framework (13 parts + Pre-Draft Protocol) | `strategy/content/content-framework.md` |
| Game Aliases Reference | `strategy/content/game-aliases.md` |
| Content Pipeline (active queue) | `strategy/content/content-pipeline.md` |
| Content Calendar | `strategy/content/content-calendar.md` |
| Voice & Tone Guide | `strategy/content/voice-and-tone.md` |
| Retroactive Audit Plan | `strategy/content/retroactive-audit-plan.md` |
| SEO Master Strategy | `strategy/seo/seo-master-strategy.md` |
| Technical SEO Spec | `strategy/seo/technical-seo-spec.md` |
| SEO Scoreboard (live data) | `strategy/seo/seo-scoreboard.md` |
| Weekly SEO Workflow | `strategy/seo/weekly-workflow.md` |
| Q2 2026 Keyword Discovery | `strategy/seo/quarterly-discovery/Q2-2026-discovery.md` |
| Competitive Landscape | `strategy/competitive/landscape.md` |
| SEO Audit | `strategy/competitive/seo-audit.md` |
| Game Comparison | `strategy/competitive/game-comparison.md` |
| Design Brief | `strategy/brand/design-brief.md` |
| Influencer & Social Strategy | `strategy/marketing/influencer-and-social-media-strategy.md` |
| 90-Day Social Calendar | `strategy/marketing/90day-social-calendar.md` |
| Creator Outreach Templates | `strategy/marketing/creator-outreach-templates.md` |
| Strategic Insights (non-obvious observations) | `strategy/insights.md` |
| Session History (archive) | `strategy/session-history.md` |

---

## Cross-Reference: App Repo Docs

| Document | Location in `Stick/` repo |
|----------|--------------------------|
| Game rules (all 12) | `docs/games/*.md` |
| Capabilities spec | `docs/STICK-CAPABILITIES-SPEC.md` |
| Launch plan | `docs/business/launch-plan.md` |
| Pricing strategy | `docs/business/pricing-strategy.md` |
| Strategic roadmap | `docs/business/strategic-roadmap.md` |
| Game roadmap (Events vision) | `docs/business/game-roadmap.md` |
