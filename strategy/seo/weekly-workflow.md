# Stick SEO Weekly Workflow

> **What this is:** The operating system for how Justin and Claude work together to grow stickapp.golf's search presence. Defines what's automated, what's manual, and the weekly rhythm.
>
> **Last updated:** March 29, 2026

---

## The System at a Glance

```
AUTOMATED (Claude does this without being asked)
├── Monday: Weekly SEO Intelligence Briefing
│   └── Keyword discovery, Reddit scan, trending queries, pipeline check
│   └── Output: strategy/seo/weekly-briefings/[date]-briefing.md
├── 1st of Month: Content Refresh Sweep
│   └── Updates 5 highest-priority pages with small meaningful improvements
│   └── Output: strategy/seo/content-refresh-log.md (appended)
└── Quarterly (Jan/Apr/Jul/Oct): Deep Keyword Discovery
    └── Exhaustive question discovery, autocomplete harvesting, gap analysis
    └── Output: strategy/seo/quarterly-discovery/[quarter]-discovery.md

MANUAL (Justin does this — takes ~15 min/week)
├── Weekly: Share Search Console screenshot in session
├── Monthly: Pull Pages tab data from Search Console (per-page positions)
├── As needed: Review weekly briefings and flag priorities
└── As needed: Review content refresh log and approve/revert changes

COLLABORATIVE (We do together in sessions)
├── Monthly: Scoreboard review + strategy adjustment
├── As needed: Write new content (blog posts, guide expansions)
├── As needed: Brainstorm on opportunities from briefings
└── Quarterly: Full strategy recalibration
```

---

## Justin's Weekly Checklist (15 min)

### Every Week
- [ ] **Share Search Console screenshot** — Open Google Search Console → Performance → 28 days → screenshot the Queries tab. Share in a session. (2 min)
- [ ] **Skim the Monday briefing** — Check `strategy/seo/weekly-briefings/` for the latest. Flag anything that looks interesting or wrong. (5 min)
- [ ] **Quick action check** — Look at the "Recommended Actions" section of the briefing. Pick 1-2 to act on. (5 min)

### Every Month (add to weekly routine on the 1st)
- [ ] **Pull Pages tab data** — Search Console → Performance → Pages tab → screenshot. This shows per-page impressions and positions (the Queries tab only shows aggregate). (3 min)
- [ ] **Review content refresh log** — Check `strategy/seo/content-refresh-log.md`. Make sure the automated refreshes look good. Flag anything off. (5 min)
- [ ] **Session with Claude** — Review the updated Scoreboard together. Discuss what's working, what to adjust, what to write next. (30 min)

### Every Quarter (add to monthly routine in Jan/Apr/Jul/Oct)
- [ ] **Review quarterly discovery doc** — Check `strategy/seo/quarterly-discovery/`. Discuss findings and pipeline updates in a session. (15 min)

---

## What Claude Automates vs. What Needs Justin

| Task | Who | Frequency | Why |
|------|-----|-----------|-----|
| Keyword discovery (web search, Reddit, trends) | Claude (automated) | Weekly | Claude can search faster and broader |
| Content refresh (FAQ additions, internal links, meta tweaks) | Claude (automated) | Monthly | Small updates that compound, tedious for humans |
| Deep keyword gap analysis | Claude (automated) | Quarterly | Exhaustive research that takes hours manually |
| Search Console data collection | Justin (manual) | Weekly | Claude can't access GSC directly |
| Content strategy decisions | Together | As needed | Justin has context Claude doesn't (app status, user feedback, gut instinct) |
| New content creation | Together | 2-4x/month | Claude drafts, Justin reviews for voice and accuracy |
| Pipeline reprioritization | Together | Monthly | Data-informed but needs human judgment |
| App Store link updates | Justin (manual) | As needed | Requires app repo access |

---

## Tools in the System

### Free Tools We Use
| Tool | Purpose | Who Uses It | Setup Needed |
|------|---------|-------------|-------------|
| **Google Search Console** | Rankings, impressions, clicks, indexed pages | Justin (shares screenshots) | Already set up |
| **F5Bot** (f5bot.com) | Reddit alerts for golf betting keywords | Justin (receives emails) | See setup below |
| **Answer Socrates** (answersocrates.com) | Question discovery around keywords | Claude (in scheduled tasks) | None — free, no account |
| **Google Trends** (trends.google.com) | Seasonal interest tracking | Claude (in scheduled tasks) | None — free |
| **Google Autocomplete** | Emerging long-tail keyword discovery | Claude (in quarterly task) | None — built into search |

### F5Bot Setup (One-Time, 5 Minutes)
1. Go to https://f5bot.com
2. Create a free account with your email
3. Add these keyword alerts:
   - `golf betting`
   - `golf side game`
   - `nassau bet`
   - `wolf golf`
   - `skins golf`
   - `golf press bet`
   - `golf settlement`
4. F5Bot will email you whenever these terms appear on Reddit
5. Forward interesting threads to Claude in a session — "someone's asking about [X], should we write about it?"

---

## How the Weekly Rhythm Works

### Monday
**Claude runs automatically:** Weekly SEO Intelligence Briefing
- Searches web for new golf betting discussions, questions, trends
- Checks Reddit for emerging topics
- Reviews pipeline and calendar for upcoming deadlines
- Writes briefing to `strategy/seo/weekly-briefings/`

### Midweek (whenever Justin has time)
**Justin reviews:** Skim the Monday briefing
- Check the "New Opportunities Found" section — anything worth pursuing?
- Check "Recommended Actions" — pick 1-2 to act on
- If something's urgent or exciting, start a session with Claude

### Weekend or Next Session
**Together:** Work on whatever's most impactful
- Could be: writing a new blog post triggered by a discovery
- Could be: refreshing a page that's close to ranking
- Could be: brainstorming on a trend spotted in the briefing
- Always starts with: "What did the briefing say this week?"

---

## Monthly Process: Scoreboard Review

When Justin shares the monthly Search Console data:

1. **Update the Scoreboard** (`strategy/seo/seo-scoreboard.md`)
   - Log site-level metrics (impressions, clicks, CTR, avg position)
   - Update keyword tracking table with per-keyword positions
   - Log emerging keywords

2. **Apply the Decision Framework**
   - Position 5-20 with high impressions → Striking distance, optimize immediately
   - Position 1-5 → Protect, add internal links from new content
   - Indexed but 0 impressions → Diagnose (wrong keyword? cannibalization? weak title?)
   - New emerging keyword → Add to Pipeline if no content exists
   - CTR below 2% → Rewrite title and meta description

3. **Reprioritize Pipeline**
   - Move highest-opportunity items to top of queue
   - Flag time-sensitive seasonal content
   - Ensure 3-4 pieces remain at "Researched + Outlined" stage

4. **Plan Next Month's Content**
   - What to publish (from pipeline, data-informed)
   - What to refresh (from refresh tracker)
   - What to research (from keyword gaps)

---

## What "World Class" Looks Like in 6 Months

By September 2026, this system should have:

- **100+ unique queries** driving clicks (up from 167 impressions-only)
- **5-10 pages ranking position 1-10** for target keywords
- **Monthly refresh cadence** keeping all content fresh for AI citation
- **Keyword discovery pipeline** surfacing 5-10 new opportunities per quarter
- **Weekly rhythm** that takes Justin 15 min and produces compounding results
- **Content library of 30-40 pages** — deeper than any competitor
- **First organic app downloads** tracked via UTM parameters

The system gets smarter over time. More data → better decisions → better content → more data. That's the flywheel.

---

## Related Documents

| Document | Purpose |
|----------|---------|
| [SEO Scoreboard](seo-scoreboard.md) | Monthly data + analysis |
| [Content Pipeline](../content/content-pipeline.md) | What to write next |
| [Content Calendar](../content/content-calendar.md) | When to publish |
| [Content Framework](../content/content-framework.md) | How to write it |
| [SEO Master Strategy](seo-master-strategy.md) | Strategic foundations |
