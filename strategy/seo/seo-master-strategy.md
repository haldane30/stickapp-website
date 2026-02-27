# Stick Website & SEO Strategy

> Last updated: February 2026
> Status: Planning — pre-development
> Owner: Justin + Claude (Cowork)

---

## Executive Summary

This document is the master plan for stickapp.golf — the website, SEO strategy, blog content calendar, and authority-building roadmap. Every decision here is informed by competitive research into who ranks for what, where the gaps are, and how a new domain can build authority against sites with 10+ years of history.

**The core insight:** Nobody owns "golf betting" on the internet the way they should. Editorial sites (Golf Digest, Golf Monthly) dominate head terms but their content is surface-level. Beezer Golf is the only competitor app playing the SEO game, and they're winning niche game queries with thin (300-500 word) pages. There is no definitive, deeply authoritative resource for golf betting games — and that's exactly what Stick can become.

**The strategy in one sentence:** Build the internet's best golf betting resource, game by game, then let every page funnel readers toward the app.

---

## Part 1: Competitive SEO Landscape

### Who Ranks for What

#### Head Terms (High Volume, High Competition)

| Query | #1 | #2 | #3 | Apps Present? |
|-------|----|----|----|----|
| "golf betting games" | Swing Minder | Practical Golf | Golf Influence | No apps in top 3 |
| "nassau golf" | Wikipedia | Nassau County Golf | Golf Digest | No |
| "wolf golf game" | Tampa Bay Downs | MyGolfSpy Forum | MyScorecard | No |
| "golf skins game" | ESPN | Wikipedia | Golf Monthly | No |
| "golf side games" | MyGolfSpy | 18Birdies (#2) | Swing Minder | **Yes — 18Birdies, Beezer (#6)** |

**Takeaway:** Editorial sites own head terms. We won't outrank Golf Digest for "nassau golf" in year one. But apps ARE starting to appear for "side games" — signaling Google sees apps as relevant for this intent.

#### Long-Tail Game Queries (Medium Volume, Lower Competition)

| Query | #1 | Apps in Top 5? | Content Quality | Opportunity |
|-------|-----|------|------|------|
| "dots golf game" | **Beezer (#1)** | Beezer, 18Birdies | Strong | Must compete |
| "split sixes golf" | **Beezer (#1)** | Beezer | Thin-medium | High — go deeper |
| "scotch golf game rules" | Fried Egg | Beezer (#2) | Solid | Medium |
| "vegas golf game rules" | Fried Egg | Beezer (#3) | Well-covered | Medium |
| "nine point golf game" | Chicago Golf Guy | **None** | Good editorial | **High — no app present** |
| "snake golf game" | Live About | None | Strong | Medium |
| "best golf games for 3 players" | Tampa Bay Downs | Beezer (#3) | Comprehensive | Medium |
| "golf press bet explained" | The Left Rough | None | Scattered | **High** |
| "how to settle a nassau bet" | Wikipedia | Beezer (#4) | **Thin** | **Very High** |

**Takeaway:** Beezer ranks #1-3 for niche game queries because they have dedicated pages and nobody else bothers. Their content is thin. Going deeper (1500-2500 words) with better structure, examples, and settlement walkthroughs gives us a real shot at outranking them even with a newer domain.

#### Broader Content Opportunities

| Query | Top Rankers | Opportunity for Stick |
|-------|------------|----------------------|
| "golf handicap calculator" | USGA, NCGA | 🔴 Low — official sources dominate |
| "how golf handicaps work" | R&A, Stix Golf | 🟡 Medium — beginner guide angle |
| "course handicap vs index" | England iGolf | 🟡 Medium — explainer content |
| "best golf apps 2026" | Golf Monthly, Today's Golfer | 🟡 Get listed in these roundups |
| **"best golf betting apps"** | **Nobody** | 🟢 **Gap — no roundup exists!** |

**Takeaway:** The "best golf betting apps" roundup doesn't exist yet. Creating this page (featuring Stick prominently alongside honest competitor reviews) is a huge opportunity. It targets high commercial intent and there's literally no competition.

### Competitive Content Strategies

#### Beezer Golf (Primary SEO Competitor)
- **What they do well:** Individual game rules pages at `/golf-betting-games/[game]-game-rules`, a games guide claiming 300+ games, blog content targeting long-tail queries
- **What they do poorly:** Thin content (300-500 words per game), no interactive tools, no settlement examples or calculators, generic voice, no personality
- **Their URL structure:** `beezergolf.com/golf-betting-games/nassau-game-rules`
- **Blog topics:** "Best three player golf games," "Golf betting games cliff notes," "List of games golfers play"

#### Skins App (No SEO Game)
- Their blog is lifestyle fluff — "we went golfing in Red Rocks"
- No game guide pages, no educational content
- **Not a threat on SEO**

#### 18Birdies (Passive SEO)
- Support docs rank for some queries (dots, side games)
- Not actively pursuing SEO for betting content
- Focus is GPS/scoring, not betting

#### Editorial Sites (Indirect Competition)
- Golf Digest, Golf Monthly, The Left Rough, GolfCrow, Tampa Bay Downs
- Own head terms but don't update content frequently
- No app integration or interactive tools
- Can't provide the "try it yourself" funnel that Stick can

---

## Part 2: Website Architecture

### Tech Stack

**Framework:** Next.js 14+ (App Router)

Why Next.js:
- Server-side rendering (SSR) for SEO — Google gets fully rendered HTML
- Built-in image optimization, metadata API, sitemap generation
- MDX support for blog posts (write content in Markdown, render as React)
- Static generation for game pages (fast, cacheable, SEO-perfect)
- Easy to add interactive elements (settlement calculators, game selectors)
- You already know React from the app codebase
- Vercel deployment gives us edge caching, analytics, and easy previews

**Styling:** Tailwind CSS (consistent with the app)
**CMS:** MDX files in the repo (no external CMS dependency to start)
**Hosting:** Vercel (free tier is generous, custom domain support, automatic SSL)
**Analytics:** Vercel Analytics + Google Search Console + PostHog (free tier)
**Domain:** stickapp.golf (already configured with associated domains)

### Site Structure

```
stickapp.golf/
├── /                           # Homepage (conversion-focused)
├── /games/                     # Games hub (pillar page)
│   ├── /games/nassau/          # Deep guide: Nassau
│   ├── /games/skins/           # Deep guide: Skins
│   ├── /games/wolf/            # Deep guide: Wolf
│   ├── /games/snake/           # Deep guide: Snake
│   ├── /games/match-play/      # Deep guide: Match Play
│   ├── /games/nine-point/      # Deep guide: Nine Point
│   ├── /games/split-sixes/     # Deep guide: Split Sixes
│   ├── /games/sixes/           # Deep guide: Sixes
│   ├── /games/dots/            # Deep guide: Dots
│   ├── /games/vegas/           # Deep guide: Vegas
│   └── /games/scotch/          # Deep guide: Scotch
├── /blog/                      # Blog index
│   ├── /blog/[slug]/           # Individual posts
│   └── (categorized by topic)
├── /pricing/                   # Pricing page
├── /about/                     # Brand story
├── /privacy/                   # Privacy policy (exists)
├── /terms/                     # Terms of service (exists)
└── /support/                   # FAQ / Help
```

### URL Strategy (Important for SEO)

- **Clean, keyword-rich URLs:** `/games/nassau/` not `/games/nassau-game-rules`
- **No dates in blog URLs:** `/blog/best-golf-games-for-3-players` not `/blog/2026/03/best-golf-games...`
- **Consistent slugs:** lowercase, hyphens, no trailing slashes
- **Hub-and-spoke model:** `/games/` links to all game pages; each game page links back to hub and to related games

### Page Templates Needed

1. **Homepage** — Hero, feature highlights, game carousel, social proof, download CTA
2. **Games Hub** (`/games/`) — Card grid of all 11 games, filtering by player count, brief descriptions
3. **Game Guide** (`/games/[slug]/`) — Deep content page with structured data, settlement examples, CTA
4. **Blog Post** (`/blog/[slug]/`) — Content with author, date, related posts, CTA
5. **Blog Index** (`/blog/`) — Categorized post list with search
6. **Pricing** — Plan comparison, value anchoring, FAQ
7. **About** — Brand story, credibility
8. **Legal** — Privacy, Terms (migrate existing HTML)

---

## Part 3: SEO Technical Foundation

### Must-Have on Every Page

1. **Unique title tag** — Format: `{Page Title} | Stick Golf`
2. **Meta description** — 150-160 chars, includes target keyword and CTA
3. **Open Graph tags** — Title, description, image (for social sharing)
4. **Canonical URL** — Self-referencing canonical on every page
5. **Structured data (JSON-LD)** — Article schema for blog, FAQ schema for game pages, SoftwareApplication schema sitewide
6. **Alt text on all images**
7. **Internal links** — Every page links to at least 2-3 other pages
8. **Mobile-first design** — Google uses mobile-first indexing

### Technical SEO Checklist

- [ ] XML sitemap at `/sitemap.xml` (auto-generated by Next.js)
- [ ] `robots.txt` allowing all crawlers
- [ ] Google Search Console verified from day one
- [ ] Bing Webmaster Tools verified
- [ ] Page speed: target 90+ on Lighthouse (Next.js + Vercel makes this easy)
- [ ] Core Web Vitals: LCP < 2.5s, INP < 200ms, CLS < 0.1
- [ ] HTTPS everywhere (Vercel handles this)
- [ ] No duplicate content (canonical tags)
- [ ] Breadcrumb navigation with structured data
- [ ] 404 page with helpful navigation
- [ ] Redirect old URLs if we ever restructure

### Structured Data Strategy

> **Deep technical implementation details** — including exact JSON-LD templates, rendering strategy, image optimization, font loading, and the internal linking architecture — are in [`technical-seo-spec.md`](technical-seo-spec.md).

**Every game guide page should have:**
```json
{
  "@type": "Article",
  "headline": "How to Play Nassau in Golf: Rules, Scoring, Presses & Settlement",
  "description": "...",
  "author": { "@type": "Organization", "name": "Stick Golf" }
}
```

**Plus FAQ schema** for common questions (this gets rich snippets in Google):
```json
{
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How much does a Nassau bet cost?",
      "acceptedAnswer": { "@type": "Answer", "text": "..." }
    }
  ]
}
```

**Sitewide:**
```json
{
  "@type": "SoftwareApplication",
  "name": "Stick Golf",
  "operatingSystem": "iOS",
  "applicationCategory": "SportsApplication"
}
```

---

## Part 4: Content Strategy

### Layer 1: Game Guide Pages (Build First)

These are pillar content — the pages that will rank for game-specific queries and serve as the foundation of our internal link structure.

#### Template for Each Game Page

Every game guide follows this structure (targeting 1500-2500 words):

1. **Hero / TL;DR** — One-paragraph summary of the game
2. **What You Need** — Player count, what to track, equipment
3. **How It Works** — Step-by-step rules with examples
4. **Scoring & Settlement** — Detailed breakdown with a real scenario (this is where we crush Beezer — show actual math)
5. **Variations** — Common house rules, regional differences
6. **Strategy Tips** — When to press, when to go lone wolf, etc.
7. **Common Mistakes** — What new players get wrong
8. **FAQ Section** — 5-8 questions (structured data for rich snippets)
9. **CTA** — "Track [Game] automatically with Stick" + App Store link

#### Publishing Priority (Based on Search Demand + Competition)

| Priority | Game | Why | Target Keywords |
|----------|------|-----|-----------------|
| 1 | **Nassau** | Highest search volume, most popular game | nassau golf, nassau bet, how to play nassau |
| 2 | **Skins** | High volume, well-known | golf skins game, skins rules |
| 3 | **Wolf** | High volume, complex (more content opportunity) | wolf golf game, how to play wolf |
| 4 | **Snake** | Popular side bet, good long-tail | snake golf game, 3 putt game |
| 5 | **Vegas** | Strong search volume | vegas golf game rules |
| 6 | **Nine Point** | **No app ranking — easy win** | nine point golf game |
| 7 | **Dots** | Beezer #1 — need to compete | dots golf game |
| 8 | **Sixes** | Moderate demand | sixes golf game, round robin golf |
| 9 | **Match Play** | Well-covered but foundational | match play golf rules |
| 10 | **Split Sixes** | **Beezer #1 — go deeper to win** | split sixes golf |
| 11 | **Scotch** | Niche but dedicated audience | scotch golf game rules |

**Recommended rollout:** Publish games 1-4 at site launch. Add 2 per week until all 11 are live.

### Layer 2: Blog Content Strategy

The blog serves three purposes:
1. **Capture long-tail traffic** that game pages don't cover
2. **Build topical authority** so Google sees us as THE golf betting resource
3. **Earn backlinks** by creating content people want to share and reference

#### Content Categories

**Category A: Game Strategy & Deep Dives**
These extend the game guide pages with more specific, actionable content.

| Post Title | Target Keyword | Priority |
|-----------|---------------|----------|
| Nassau Press Strategy: When to Press and When to Hold | golf press bet strategy | Month 1 |
| How to Settle a Nassau Bet (With Examples) | how to settle nassau bet | Month 1 |
| Wolf Golf Strategy: Picking Partners and Going Lone | wolf golf strategy | Month 2 |
| What Happens When Someone Picks Up? Golf Betting Rules for Incomplete Holes | golf betting pickup rules | Month 2 |
| Skins Carryover Explained: What Happens When Nobody Wins a Hole | skins carryover rules | Month 3 |
| The Complete Guide to Golf Presses: Auto-Press, Press the Press, and More | press the press golf | Month 3 |

**Category B: "Best Games For..." (High Commercial Intent)**
These target golfers actively looking for games to play — our highest-converting traffic.

| Post Title | Target Keyword | Priority |
|-----------|---------------|----------|
| Best Golf Betting Games for 3 Players | best golf games 3 players | Month 1 |
| Best Golf Betting Games for Beginners | golf betting games beginners | Month 1 |
| 5 Best Golf Side Bets to Run Alongside Your Main Game | best golf side bets | Month 2 |
| Best Golf Betting Games for a Couples Round | couples golf games | Month 3 |
| The Best Golf Betting Games for High Handicappers | golf games high handicappers | Month 4 |
| Best Golf Betting Apps in 2026 (Honest Comparison) | best golf betting apps 2026 | **Month 1 — Critical** |

**Category C: Handicap & Scoring Explainers**
These capture informational traffic from golfers who may not be searching for betting but are our audience.

| Post Title | Target Keyword | Priority |
|-----------|---------------|----------|
| How Golf Handicaps Actually Work in Betting Games | handicaps in golf betting | Month 2 |
| Course Handicap vs Handicap Index: What's the Difference and Why It Matters for Bets | course handicap vs index betting | Month 4 |
| Net vs Gross Scoring in Golf Betting: Which Should You Use? | net vs gross golf betting | Month 3 |
| How Stroke Allocation Works (And Why Your Nassau Bet Depends on It) | stroke allocation golf | Month 5 |

**Category D: Golf Culture & Lifestyle**
These are shareable, linkable content that builds brand and attracts backlinks. Lower direct SEO value but high for authority.

| Post Title | Target Keyword | Priority |
|-----------|---------------|----------|
| The Unwritten Rules of Golf Betting Etiquette | golf betting etiquette | Month 2 |
| A History of Golf Gambling: From Nassau Country Club to Today | history of golf gambling | Month 4 |
| What Your Favorite Golf Betting Game Says About You | (shareable, low keyword focus) | Month 3 |
| The Math Behind Why You Always Lose Your Nassau (And What to Do About It) | (shareable, linkable) | Month 5 |
| The Saturday Morning Text: How Golf Groups Actually Pick Their Games | (lifestyle, relatable) | Month 6 |

**Category E: Seasonal & Event Content**
These capitalize on moments of peak golf attention.

| Post Title | Timing | Why |
|-----------|--------|-----|
| Your Masters Week Betting Guide: Games to Play While Watching | Early April (pre-Masters) | Masters = peak golf attention |
| Golf Season Betting Setup: Get Your Group Ready for Spring | Late February/March | Start-of-season timing |
| The US Open Betting Games Guide | Late May (pre-US Open) | Major tournament traffic |
| End of Season Settlement: How to Close Out Your Golf Betting Year | October | Seasonal relevance |

### Layer 3: Authority & Link Building (Ongoing)

#### Strategies That Actually Work for a New Domain

1. **"Best Golf Betting Apps" Roundup**
   - We create the definitive comparison page (honest, including Beezer and Skins App)
   - Position Stick as the best option with clear evidence
   - This page becomes linkable and shareable
   - Over time, it ranks for "best golf betting apps" (currently nobody owns this)

2. **Get Listed in Existing App Roundups**
   - Target: Golf Monthly, Today's Golfer, MyGolfSpy, Golf Insider UK
   - These sites publish "best golf apps" lists annually
   - Outreach approach: offer a review copy, provide screenshots and feature list
   - Even a mention with a backlink is valuable

3. **Guest Posts / Expert Quotes**
   - Reach out to golf blogs that cover betting games
   - Offer to write guest posts about specific game strategies
   - Offer Stick as a source when they update game rules articles
   - Target: The Left Rough, GolfCrow, The Fried Egg

4. **Reddit & Forum Engagement**
   - r/golf has regular threads about betting games
   - GolfWRX forums have active betting discussions
   - Don't spam — genuinely answer questions, link to our guides when helpful
   - This builds brand awareness AND drives referral traffic

5. **Podcast Appearances**
   - Golf podcasts love talking about betting (it's entertaining content)
   - Offer to come on and explain obscure games or settle common betting disputes
   - Every appearance = a backlink from their show notes page
   - Target: Chasing Scratch, The Fried Egg, No Laying Up

6. **Data-Driven Content**
   - Once we have users, publish insights: "The Most Popular Golf Betting Games in 2026" based on real usage data
   - These get picked up by golf media as primary sources
   - Extremely high backlink potential

7. **Course Pro Partnerships**
   - Local golf course pros who recommend Stick to their members
   - Course websites that link to Stick as a recommended app
   - These are local/niche backlinks that Google values for establishing relevance

---

## Part 5: Phased Rollout Plan

### Phase 0: Pre-Launch Foundation (Now)

**Goal:** Get the technical foundation right so we can deploy content immediately when ready.

- [ ] Set up Next.js project with Tailwind
- [ ] Configure stickapp.golf domain on Vercel
- [ ] Set up Google Search Console and submit initial sitemap
- [ ] Create page templates (homepage, game guide, blog post)
- [ ] Migrate privacy policy and terms of service
- [ ] Set up analytics (Vercel Analytics + PostHog)

### Phase 1: Minimal Launch (Target: 2 weeks from start)

**Goal:** Get indexed by Google with our highest-priority pages. Every day we wait is a day we're not building domain age.

**Pages to launch:**
- Homepage (hero, feature highlights, download CTA)
- `/games/` hub page
- `/games/nassau/` — Deep guide
- `/games/skins/` — Deep guide
- `/games/wolf/` — Deep guide
- `/games/snake/` — Deep guide
- `/privacy/` and `/terms/`
- `/blog/best-golf-betting-apps-2026/` — **Publish this immediately** (no competition)
- `/blog/best-golf-betting-games-for-3-players/` — High-intent, Beezer competes but we go deeper

**Why these first:** Nassau, Skins, Wolf, and Snake are the highest-volume game queries. The "best betting apps" post fills a gap nobody else has claimed. Getting indexed early starts building domain age.

### Phase 2: Content Expansion (Weeks 3-6)

**Goal:** Complete all game guide pages and establish a publishing cadence.

- Publish remaining 7 game guides (2 per week)
- Publish 4-6 blog posts from Categories A and B
- Begin Google Search Console monitoring (what queries are we appearing for?)
- Submit site to Bing Webmaster Tools
- Start internal linking audit (ensure every page links to related content)

### Phase 3: Authority Building (Weeks 7-12)

**Goal:** Start earning backlinks and growing organic traffic.

- Reach out to 10-15 golf media sites for app roundup inclusion
- Publish 8-12 blog posts across all categories
- Monitor rankings and double down on what's working
- Create the "Best Golf Betting Apps" comparison page if not already done
- Begin light Reddit/forum engagement
- Optimize pages based on Search Console data (update titles, add FAQ sections for queries we're appearing for)

### Phase 4: Masters Week Push (April 7-13, 2026)

**Goal:** Maximize visibility during peak golf attention.

- Publish Masters-specific content 2 weeks early (needs time to index)
- Social media push coordinated with website content
- Any influencer partnerships timed to this week
- Monitor traffic spikes and ensure site handles load

### Phase 5: Sustained Growth (May 2026+)

**Goal:** Consistent content production, ongoing optimization, data-driven decisions.

- 2-4 blog posts per month
- Quarterly content audit (what's ranking? what needs updating?)
- Seasonal content aligned with PGA Tour calendar
- User data insights posts (once we have volume)
- Explore video content (embeddable game explanations)

---

## Part 6: Content Quality Standards

### What Makes Our Content Better Than Beezer's

1. **Depth over breadth** — 1500-2500 words per game vs their 300-500
2. **Real settlement examples** — Show the actual math with named players and scenarios, not just abstract rules
3. **Strategy that matters** — "When should you press?" not just "what is a press"
4. **Visual settlement breakdowns** — Tables showing who pays whom (we can even build interactive calculators)
5. **FAQ sections** — Structured data for rich snippets in Google
6. **Internal linking** — Every game page connects to related games, strategy posts, and app features
7. **Voice** — Authoritative but approachable. We know these games because we built a calculator for every edge case.

### Content Review Checklist

Before any page goes live:
- [ ] Target keyword appears in title, H1, first 100 words, and meta description
- [ ] At least 3 internal links to other site pages
- [ ] FAQ section with 5+ questions (JSON-LD structured data)
- [ ] App Store CTA appears at least twice (mid-content and end)
- [ ] Images have descriptive alt text
- [ ] Meta description is 150-160 characters with keyword and CTA
- [ ] Content is genuinely useful even without the app pitch
- [ ] Settlement example uses realistic numbers and player names
- [ ] Mobile formatting checked (no tables that break on small screens)

### Voice & Tone Guidelines

- **Authoritative:** We built calculators that handle every edge case. We know these games inside out.
- **Approachable:** Write for the golfer who plays every Saturday, not the PGA tour analyst.
- **Practical:** Always include "here's what to do" not just "here's what it is."
- **Honest:** When comparing to competitors, be fair. Readers trust honest reviews.
- **No corporate speak:** "Stick tracks your Nassau automatically" not "Stick provides automated Nassau tracking functionality."

---

## Part 7: Measurement & KPIs

### Monthly Tracking

| Metric | Tool | Target (Month 3) | Target (Month 6) |
|--------|------|-------------------|-------------------|
| Organic impressions | Google Search Console | 5,000 | 25,000 |
| Organic clicks | Google Search Console | 200 | 1,500 |
| Pages indexed | Google Search Console | 25+ | 40+ |
| Avg position for target keywords | GSC | Top 30 for 5+ keywords | Top 10 for 3+ keywords |
| App Store click-throughs from site | PostHog | Track from day 1 | Track trend |
| Referring domains | Ahrefs/SEMrush free tools | 5 | 20 |
| Blog posts published | Internal | 8 | 20 |

### What "Winning" Looks Like

- **3 months:** Indexed for all target keywords, appearing in top 30 for several long-tail queries
- **6 months:** Top 10 for at least 3 game-specific queries, 1,000+ monthly organic visits
- **12 months:** Ranking alongside Beezer for game queries, featured in at least 2 "best apps" roundups, 5,000+ monthly organic visits driving measurable App Store downloads

---

## Appendix: Keyword Research Summary

### High-Priority Keywords (Year 1 Targets)

| Keyword | Monthly Volume (Est.) | Competition | Current #1 | Our Angle |
|---------|----------------------|-------------|------------|-----------|
| nassau golf | High | Medium | Wikipedia | Deeper guide + settlement tool |
| wolf golf game | Medium | Medium | Tampa Bay Downs | Most comprehensive guide |
| golf skins game | High | High | ESPN | Rules + calculator |
| snake golf game | Medium | Medium | Live About | 3-putt tracking angle |
| dots golf game | Low-Medium | Low | **Beezer** | Go deeper, outrank |
| split sixes golf | Low | Low | **Beezer** | Go deeper, outrank |
| nine point golf game | Low | Low | Chicago Golf Guy | **No app competition** |
| best golf betting apps | Medium | **None** | **Nobody** | **Own this** |
| golf press bet explained | Low-Medium | Low | The Left Rough | Definitive guide |
| how to settle nassau bet | Low | Very Low | Wikipedia | Calculator + examples |
| best golf games 3 players | Medium | Medium | Tampa Bay Downs | App integration |
| golf betting etiquette | Low-Medium | Low | Scattered | Unique angle |

### Keywords to Monitor (But Not Target Yet)

- "golf handicap calculator" — USGA dominance, too competitive
- "best golf apps" — Need app maturity first
- "golf scorecard app" — Different intent, not our primary positioning
