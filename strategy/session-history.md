# Stick Website — Session History

Archive of past Claude Code session summaries. Not needed in active context — referenced only when debugging decisions or understanding historical context.

---

### Sessions 1-2 — February 27, 2026

Established all strategic foundations:
- Deep codebase review of the Stick app
- Created website & SEO strategy (competitive landscape, site architecture, content calendar)
- Created website design brief (visual direction, color palette, typography, watercolor illustrations, motion)
- Researched and prioritized game roadmap (confirmed Quota as #12, documented Events vision)
- Created strategic roadmap as living document
- Researched Quota game rules and created full game rules doc with V1 implementation scope
- Set up folder structure and CLAUDE.md
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
- Ran Part 8 checklist audit on the blog post — found 6 issues and fixed all
- Saved Skins research document to `content/game-guides/skins-research.md`
- Created Skins feature audit prompt for Claude Code
- Added Content Status Tracker to CLAUDE.md

### Session 5 — February 27, 2026

Skins game guide — full audit-first workflow:
- Received Skins feature audit from Claude Code (65 tests, 12 property-based checks, 9 config fields)
- Created three-list gap analysis (`content/game-guides/skins-audit.md`)
- Key finding: Half-handicap mode is the #1 feature gap — common in tournaments, Justin's buddy asked about it, critical for Events vision
- Key finding: Viewer selectors assume fixed value model (pot/escalating display incorrect)
- Created Claude Code prompt for half-handicap implementation and selector fixes
- Wrote Skins game guide draft (~2,300 words) — carryover walkthrough, two settlement examples (fixed + pot), validation/proofs, 8 FAQ questions
- Verified all product claims against audit — zero false claims

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
- Key finding: Manual presses are the biggest gap vs. real-world play
- Key finding: Dead config fields (scoringMethod, matchPlayScoring, initialRotation, storedPresses) — tech debt, no user impact
- Wrote Sixes game guide draft (~2,200 words) with full settlement walkthrough
- Part 8 checklist passed after fixing 5 issues

### Session 8 — March 1, 2026 (continued)

Scotch game guide — full audit-first workflow (no original game doc):
- Established raw audit storage practice: `scotch-audit-raw.md` preserves full Claude Code output alongside the gap analysis
- Researched Scotch from 18+ sources
- Received Scotch feature audit from Claude Code (118 tests, 14 config fields, 5 category evaluators)
- Key finding: Tie handling conflict — Stick voids tied category points, most golfers expect them to split
- Key finding: Bug #1 — maxMultiplier never reaches engine. UI toggle is cosmetic. Exposure unbounded with umbrella + rolls.
- Key finding: Bug #2 — "3-Putt Loses Prox" toggle exists but UI never populates the data. Feature is non-functional.
- Key finding: Scotch is most feature-rich engine in Stick. Competitive advantage over Beezer/18Birdies.
- Wrote Scotch game guide draft (~2,250 words)
- Part 8 checklist found and fixed 10 issues including multiple settlement math errors

### Session 9 — March 1, 2026 (continued)

Split Sixes audit + engine bug prompts:
- Wrote Claude Code bug fix prompt for all outstanding Sixes + Scotch engine issues (`content/game-guides/sixes-scotch-bugfix-prompt.md`)
  - 6 bugs total: 3 Sixes, 3 Scotch. Scotch maxMultiplier flagged as highest priority (fix before launch).
- Wrote Claude Code audit prompt for Split Sixes
- Received Split Sixes feature audit from Claude Code (40 tests, 9 config fields, 0 bugs)
- Created three-list gap analysis (`content/game-guides/splitsixes-audit.md`)
  - Key finding: Cleanest engine in Stick's lineup — zero bugs, zero dead code, zero display issues
  - Key finding: Blitz and Birdie Double are genuine differentiators no competitor highlights
  - Key finding: Biggest real-world gap is "Nasty" penalty for 0-point holes

### Session 10 — March 1, 2026 (continued)

Split Sixes guide + Quota audit:
- Drafted Split Sixes game guide (~1,800 words)
  - Leads with three-player angle; full settlement example zero-sum verified
  - Part 8 checklist passed
- Wrote Claude Code audit prompt for Quota
- Received Quota feature audit from Claude Code (67 tests, 14 property checks, ~3,200 random iterations, 0 bugs)
- Created three-list gap analysis (`content/game-guides/quota-audit.md`)
  - Key finding: Architecturally unique — only game using gross scoring with handicap baked into quota target
  - Key finding: No player cap — engine explicitly designed for 30+ players. Events-ready.
  - Key finding: QuotaPointValues supports full custom point scales; Modified Stableford is architecturally ready.

### Session 11 — March 4, 2026

Gemini audit review + strategic SEO buildout:
- Reviewed Gemini AI audit of the website — verified 4 technical fixes
- Built 22 permanent 301 alias redirects in `next.config.ts`
- Created `/guides/[slug]` content type infrastructure
- Wrote 3 reference guide pages: Handicaps, Presses, Settlement
- Internal linking pass across all 12 game guides + both blog posts
- Converted "Best Golf Betting Games for 3 Players" draft to deployed MDX blog post
- Fixed UTM tracking on Header, Footer, and blog post Download CTAs

### Session 12 — March 4, 2026 (continued)

OG images + CLAUDE.md update:
- Generated 18 OG images (1200×630 PNG) for all pages
- Added OG image references to blog post metadata
- Added twitter card image tags to all page types

### Session 13 — March 5, 2026

Homepage rework:
- Redesigned GameCard component: emoji-based cards (emoji + name + hook + players)
- Added `gameEmojis` mapping to `tokens.ts`
- Removed "The App" section entirely (placeholder divs — will rebuild with real screenshots)
- Removed fake testimonial
- Reworked social proof into "Built to be trusted" section
- Fixed dark/light section rhythm: Hero → Problem → Games → Trust → Blog → CTA

### Session 14 — March 2026

Best Golf Betting Apps 2026 post update:
- Added new competitors: GolfApp.com, BetCaddie, Fairway Funds
- Verified all existing app pricing and features current
- Noted Skins App blog now active

### Session 15 — April 1, 2026 (automated + live)

Q2 quarterly keyword discovery sweep + hammer guide:
- Ran automated quarterly keyword sweep (25+ web searches across 10 seed terms)
- Wrote `strategy/seo/quarterly-discovery/Q2-2026-discovery.md` — 387 lines, 15 ranked opportunities
- Updated `strategy/content/game-aliases.md` — added BBB/Banker/Aces & Deuces/Amigos as educational games
- Updated `strategy/content/content-pipeline.md` — 7 new items; updated competitor monitoring table with 4 new entrants
- Key findings: Hammer content window open (TGL S2 just ended); "Is golf betting legal?" is zero-competition opportunity; BBB is most-searched game with zero content; GolfBetSettler.com confirms calculator demand
