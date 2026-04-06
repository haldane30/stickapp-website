# Retroactive Content Audit Plan

> **Created:** March 29, 2026
> **Purpose:** Apply the new Pre-Draft Research Protocol (Part 11) retroactively to all 20 published pages. Every page was written before we formalized keyword harvesting, competitor content audits, and systematic internal linking. This audit catches missed opportunities.
>
> **Process:** Work through each page in priority order. For each page, run the abbreviated research protocol (keyword harvest + competitor check + linking audit), then make targeted improvements. Don't rewrite pages wholesale — make surgical additions that fill gaps.

---

## What We're Checking Per Page

For each of the 20 published pages, run through this checklist:

### 1. Keyword Gap Check
- [ ] Run autocomplete harvest for the page's primary keyword
- [ ] Check PAA questions — are we answering the ones that show up?
- [ ] Check Search Console queries for this specific page (when data available)
- [ ] Are there high-value keywords we're not targeting that we should be?
- [ ] Update `keywords` frontmatter array with any new discoveries

### 2. Competitor Content Check
- [ ] Search the primary keyword — what ranks above us?
- [ ] What do top results cover that we don't?
- [ ] What do we cover that they don't? (Confirm our edge)
- [ ] Any new competitors since we published?

### 3. Internal Linking Audit
- [ ] Count outbound internal links — minimum 5 per page
- [ ] Are links contextual (in body text) or just footer/sidebar?
- [ ] Does this page link to all relevant reference guides (handicaps, presses, settlement)?
- [ ] Do other pages link back to this one? Which ones should but don't?
- [ ] Add missing bidirectional links

### 4. FAQ Audit
- [ ] Do FAQ answers match real PAA questions? (Cross-reference with live PAA data)
- [ ] Are all answers 40-60 words and self-contained?
- [ ] Are we at the FAQ cap? (10-12 game guides, 8 blog posts)
- [ ] Any PAA questions we should add?
- [ ] Do frontmatter FAQs match inline FAQ components exactly?

### 5. Opening Paragraph Check
- [ ] Does the first 60 words directly answer the core question?
- [ ] Is the primary keyword in the first 100 words?
- [ ] Would an AI system extract this paragraph as a complete, useful answer?

### 6. Schema Validation
- [ ] Article schema present with accurate datePublished and dateModified?
- [ ] FAQPage schema present and matching frontmatter?
- [ ] BreadcrumbList schema present?
- [ ] Run Google Rich Results Test — no errors?

### 7. Meta & Technical
- [ ] Title tag under 60 chars with keyword near front?
- [ ] Meta description 130-160 chars with keyword and soft CTA?
- [ ] OG image exists and referenced correctly?
- [ ] Canonical URL self-referencing?
- [ ] `updatedAt` reflects last real edit?

---

## Priority Order

Work through pages in order of SEO impact potential — highest-traffic pages first, then pages with the most room for improvement.

### Tier A — Highest Priority (Most Impressions / Commercial Intent)

These pages are already getting Search Console impressions or target high-value commercial keywords. Improvements here have the highest ROI.

| # | Page | Primary Keyword | Why Priority |
|---|------|----------------|-------------|
| 1 | `/blog/best-golf-betting-apps-2026/` | best golf betting apps | 182+ impressions across keyword cluster. Highest commercial intent page. |
| 2 | `/games/wolf/` | wolf golf game | 46 impressions across 3 variants. Already refreshed for "wolf points" but needs full audit. |
| 3 | `/games/skins/` | golf skins game | 21 impressions. Our second-highest game guide signal. |
| 4 | `/games/nassau/` | nassau golf | Most popular game. Should be our highest-traffic guide long-term. |
| 5 | `/blog/golf-betting-for-beginners/` | golf betting for beginners | High-value entry-point keyword. Check if getting impressions yet. |

### Tier B — Medium Priority (High-Value Content, No Data Yet)

These are strong pages that need the research protocol applied to unlock their potential.

| # | Page | Primary Keyword | Why Priority |
|---|------|----------------|-------------|
| 6 | `/games/match-play/` | match play golf | High search volume keyword, strong content. |
| 7 | `/games/vegas/` | vegas golf game | Unique game, good search interest. |
| 8 | `/games/snake/` | snake golf game | Simple game, high awareness. |
| 9 | `/guides/presses/` | press golf betting | Captures a mechanic that spans multiple games. |
| 10 | `/guides/handicaps/` | handicaps golf betting | Reference hub — links from many game guides. |
| 11 | `/guides/settlement/` | golf bet settlement | Reference hub — links from many game guides. |
| 12 | `/guides/glossary/` | golf betting glossary | Broad keyword capture. |

### Tier C — Lower Priority (Niche Games, Less Search Volume)

Still need the audit but lower urgency. These games have smaller audiences.

| # | Page | Primary Keyword | Notes |
|---|------|----------------|-------|
| 13 | `/games/nine-point/` | nine point golf | Niche but loyal audience |
| 14 | `/games/scotch/` | scotch golf game | Niche, regional |
| 15 | `/games/junk/` | junk golf game | Multiple aliases (dots, trash) |
| 16 | `/games/sixes/` | sixes golf game | Multiple aliases (hollywood) |
| 17 | `/games/split-sixes/` | split sixes golf | 3-player angle is unique |
| 18 | `/games/quota/` | quota golf game | Chicago alias has volume |

### Tier D — Blog Posts (Audit After Game Guides)

| # | Page | Primary Keyword | Notes |
|---|------|----------------|-------|
| 19 | `/blog/best-golf-betting-games-3-players/` | golf betting games 3 players | Specific, niche |
| 20 | `/blog/golf-betting-games-masters-week/` | masters golf betting games | Seasonal — refresh before Masters 2027 |

---

## Audit Log

Track progress here. Mark each page as it's audited and note what changed.

| # | Page | Audited | Keywords Added | Links Added | FAQs Changed | Other Changes |
|---|------|---------|---------------|-------------|-------------|---------------|
| 1 | best-golf-betting-apps-2026 | | | | | |
| 2 | wolf | | | | | |
| 3 | skins | | | | | |
| 4 | nassau | | | | | |
| 5 | golf-betting-for-beginners | | | | | |
| 6 | match-play | | | | | |
| 7 | vegas | | | | | |
| 8 | snake | | | | | |
| 9 | presses | | | | | |
| 10 | handicaps | | | | | |
| 11 | settlement | | | | | |
| 12 | glossary | | | | | |
| 13 | nine-point | | | | | |
| 14 | scotch | | | | | |
| 15 | junk | | | | | |
| 16 | sixes | | | | | |
| 17 | split-sixes | | | | | |
| 18 | quota | | | | | |
| 19 | best-golf-betting-games-3-players | | | | | |
| 20 | golf-betting-games-masters-week | | | | | |

---

## Estimated Pace

Each page audit takes roughly 30-45 minutes (keyword harvest + competitor check + changes). At 3-4 pages per session, the full audit takes 5-7 sessions.

**Suggested cadence:** Audit 2-3 Tier A pages per session, mixed with writing new content. Don't pause new content production for the audit — run them in parallel.

---

## What Changes After This Audit

Once all 20 pages are audited:
1. Every page has a keyword map based on real search data
2. Every page has been checked against competitors
3. Internal linking is systematic and bidirectional
4. FAQ sections reflect actual PAA questions
5. All schema validates clean
6. `content/briefs/` has a retroactive brief for every page (even if abbreviated)
7. The link-back log is complete and current

This creates the baseline. From here, the monthly refresh cycle and quarterly discovery maintain it.
