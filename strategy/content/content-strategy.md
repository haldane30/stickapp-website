# Stick Golf — Content Strategy

> Master document for content approach, priorities, and execution guidelines.
> Last updated: February 27, 2026

---

## Strategic Goal

Use content to own the search conversation around golf betting games, then convert readers into Stick users. Every piece we publish should do at least two of these three things: rank for a valuable keyword, teach something useful, and make the reader want to try Stick.

---

## The Opportunity

Golf betting content is a wide-open space. Our primary SEO competitor (Beezer Golf) publishes thin 300-word game summaries with no calculators, no examples, and no depth. Most golf apps don't invest in content at all — they rely on App Store search and word-of-mouth. This means:

- We can rank quickly for high-intent keywords with genuinely useful content
- There's no established authority to dethrone — we're building on open ground
- The gap between what's available and what golfers actually need is enormous

---

## Content Architecture

### Three Layers

**Layer 1: Game Guide Pillar Pages (12 total)**
One comprehensive guide per game Stick supports. These are our SEO foundation — the pages most likely to rank because they have the most depth and the least competition. Each guide becomes a hub that blog posts link back to.

**Layer 2: Blog Posts (strategy, culture, how-to)**
Supporting content that targets long-tail keywords and internal-links back to game guides. Divided into three flavors:
- **Strategy posts** — press timing, partner picking, when to go lone wolf. These attract experienced golfers.
- **How-to posts** — settling bets, understanding handicaps in betting. These attract newer golfers searching for answers.
- **Culture/lifestyle posts** — relatable golf betting moments, group dynamics. These are sharable and build brand personality.

**Layer 3: Comparison and Commercial Content**
Pages designed to capture golfers who are actively choosing an app: "Best Golf Betting Apps," competitor comparisons, pricing justification. Lower volume but high conversion intent.

### Internal Linking Model

```
Blog Post (strategy/how-to)
  └── links to → Game Guide (pillar page)
                    └── links to → App / Download page

Blog Post (comparison)
  └── links to → Multiple Game Guides
  └── links to → App / Download page
```

Every blog post links to at least one game guide. Every game guide links to the app. This creates a clear path from search → learn → download.

---

## Game Guide Standard

Game guides are our most important content. They need to be definitively better than anything else online.

### What Makes a Stick Game Guide Different

- **Real settlement walkthroughs** with named players and actual math. Not "Player A wins" — "Marcus birdies the 7th and takes 3 points from the group."
- **Edge case coverage** that other sites skip. What happens when someone picks up? What if all players tie? What about incomplete rounds?
- **Variant documentation.** Nassau with presses, skins with carryover, wolf with lone wolf. Competitors mention variants exist; we explain exactly how each one works.
- **Interactive calculators** (future). When the tech is ready, embed live calculators so readers can plug in their own scenarios.

### Game Guide Template

Each game guide follows this structure:

1. **Intro paragraph** — what the game is, who it's for, why it's fun. 2-3 sentences max.
2. **Quick reference box** — players, bet type, difficulty, Stick's one-sentence pitch.
3. **How it works** — core rules explained clearly, with examples.
4. **Handicap & scoring** — how handicaps apply, net vs gross, stroke allocation if relevant.
5. **Variations** — each variant as its own subsection with full rules.
6. **Settlement walkthrough** — full 18-hole example with our standard cast (Marcus, Sarah, Dev, Pam), showing every dollar.
7. **Strategy tips** — what experienced players know that beginners don't.
8. **FAQ** — 5-8 questions pulled from real search queries (People Also Ask, forums).
9. **CTA** — natural, non-pushy. "Track your next [game] in Stick" with download link.

### Quality Bar

Before publishing any game guide, it must pass these checks:
- All math in settlement examples is verified (zero-sum: every dollar won = every dollar lost)
- Every variant mentioned is fully explained, not just name-dropped
- A golfer who has never played the game could set it up after reading
- A golfer who has played the game would learn something new
- No jargon is used without explanation on first mention
- The page is longer and more useful than any competing page for the same query

---

## Blog Post Standards

### Strategy Posts

Target audience: golfers who already play betting games and want to play them better.

Structure: Lead with the insight ("pressing 2-down on 15 is almost always worth it"), then explain the math/reasoning, then show an example. End with a natural connection to the relevant game guide.

Length: 800-1,200 words. Long enough to be thorough, short enough to read during lunch.

### How-To Posts

Target audience: golfers who are new to betting games or confused about a specific mechanic.

Structure: Answer the question in the first paragraph. Then explain in detail with examples. Link to the full game guide for more depth.

Length: 600-1,000 words. These are utility content — get to the answer fast.

### Culture/Lifestyle Posts

Target audience: golfers who will recognize themselves in the writing and share it with their group chat.

Structure: Whatever feels right — storytelling, lists, observations. The voice guide (voice-and-tone.md) matters most here. These should feel like they were written by someone in the Saturday morning group, not someone in a marketing department.

Length: 500-800 words. Short, punchy, personality-forward.

### Comparison Posts

Target audience: golfers actively shopping for a golf betting app.

Structure: Honest assessment of all options. Name competitors, describe what they do well, explain where Stick differs. Never trash-talk — let the comparison speak for itself.

Length: 1,500-2,500 words. These are reference pages that should feel comprehensive and trustworthy.

---

## Content Conversion Model

### How Content Turns Readers into Users

The conversion path isn't aggressive. It's contextual:

1. **Game guide reader** — They came for rules. The guide is so good they bookmark it. At the bottom: "Track your next Nassau in Stick — the math is always right." Some percentage download.

2. **Strategy blog reader** — They came for tips. The post references Stick's calculator ("Stick handles press chains automatically — here's what that looks like"). Some percentage are curious.

3. **Comparison blog reader** — They came to evaluate options. Our honest, thorough comparison earns trust. The fact that we wrote the comparison builds authority. High conversion intent.

4. **Culture blog reader** — They came for entertainment. They share the post in their group chat. One person in the group clicks through to see what Stick is. Social-driven discovery.

### CTA Guidelines

- One primary CTA per page, at the end
- CTAs should feel like a natural next step, not a sales pitch
- Use action-oriented language: "Track your next [game]" not "Download our app"
- On game guides: link directly to the App Store
- On blog posts: link to the relevant game guide first (keeps them on site longer), then the guide links to the app
- Never interrupt the content with a CTA. The content IS the marketing.

---

## SEO Execution Rules

### On-Page Requirements

Every published page must have:
- Title tag under 60 characters, keyword near the front
- Meta description under 155 characters, includes a natural CTA
- H1 matches the page's primary keyword intent
- H2s use related keywords and long-tail variations
- At least 2 internal links to other Stick content
- At least 1 image with descriptive alt text
- Schema markup (Article for blog, HowTo or FAQPage for guides)
- URL slug that matches the primary keyword (e.g., /games/nassau, /blog/best-golf-betting-apps)

### Technical SEO Baseline

Handled at the site level (see seo-master-strategy.md for full details):
- Next.js static generation for all content pages
- Sitemap.xml auto-generated
- Clean URL structure: /games/[slug], /blog/[slug]
- Mobile-first responsive design
- Core Web Vitals targets: LCP < 2.5s, CLS < 0.1, INP < 200ms

### Keyword Targeting Rules

- One primary keyword per page (no cannibalization between pages)
- Game guides own the head terms ("nassau golf", "wolf golf game")
- Blog posts own the long-tail ("how to settle a nassau bet", "when to press in nassau")
- If two pages would target the same keyword, merge them or differentiate clearly

---

## Content Production Workflow

### Writing

1. **Choose the next piece** from the content calendar (content-calendar.md)
2. **Research the keyword** — check search volume, review what's currently ranking, identify gaps
3. **Write the draft** following the voice guide (voice-and-tone.md) and the appropriate template
4. **Verify all math** — every dollar amount, every settlement example, every score
5. **Review against the quality bar** — use the checklist for guides, the litmus test for blog posts
6. **Save the draft** to `content/game-guides/` or `content/blog/drafts/`

### Publishing

1. **Move from draft to published** — once approved, move blog posts to `content/blog/published/`
2. **Update the content calendar** — mark as published with the date
3. **Submit to Google Search Console** — request indexing for new pages
4. **Share on social** — post to chosen platforms with a hook, not just the link
5. **Add internal links** — go back to existing content and add links to the new piece where relevant

### Maintenance

- **Monthly**: Check rankings in Search Console. Identify content climbing (double down with internal links) and content stuck (refresh title, add sections, update examples).
- **Quarterly**: Full content audit per the content calendar's quarterly review checklist.
- **Ongoing**: Monitor "People Also Ask" and golf forums for new content ideas. Add to the calendar.

---

## Measurement

### What We Track

| Metric | Why It Matters | Tool |
|--------|---------------|------|
| Organic impressions | Are we showing up in search? | Google Search Console |
| Click-through rate | Are our titles/descriptions compelling? | Google Search Console |
| Keyword rankings | Are we climbing for target keywords? | Search Console + manual checks |
| Time on page | Is the content actually useful? | Analytics |
| Pages per session | Are internal links working? | Analytics |
| App downloads from content | Is content converting? | Attribution (UTM params) |

### Success Milestones

- **Month 1**: 12 game guides + 4 blog posts published. All indexed by Google.
- **Month 3**: Ranking on page 1 for at least 3 game-specific keywords. "Best golf betting apps" ranking in top 20.
- **Month 6**: Organic traffic exceeding 2,000 sessions/month. At least 50 app downloads attributable to content.
- **Month 12**: Recognized as the go-to resource for golf betting game rules. Organic traffic exceeding 10,000 sessions/month.

These are directional targets, not guarantees. SEO timelines are unpredictable, but the strategy is designed to compound.

---

## Related Documents

| Document | What It Covers |
|----------|---------------|
| [Content Calendar](content-calendar.md) | All 36 planned content pieces with priority and status |
| [Voice & Tone Guide](voice-and-tone.md) | How Stick writes — voice attributes, rules, examples |
| [SEO Master Strategy](../seo/seo-master-strategy.md) | Full SEO strategy including technical, keyword research, site architecture |
| [Competitive Landscape](../competitive/landscape.md) | Who our competitors are and how they position |
| [SEO Audit Tracker](../competitive/seo-audit.md) | Living tracker for keyword rankings and competitor content |
| [Game Comparison Matrix](../competitive/game-comparison.md) | Feature-by-feature comparison across competitors |
| [Design Brief](../brand/design-brief.md) | Visual direction for the website |
