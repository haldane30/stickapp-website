# Homepage Wireframe — stickapp.golf

> Visual hierarchy and content structure for the homepage.
> This maps directly to the design brief (Section 5.1) with specific content decisions locked in.
> Last updated: February 27, 2026

---

## Section 1: Hero (Dark, Full-Bleed)

**Background:** Static editorial golf photograph with slow Ken Burns drift (subtle 15-second CSS animation, scaling from 100% to 105%). Warm color grading, moody — think golden hour links course. The image should have enough negative space in the upper-center or center for text overlay.

**Visual hierarchy (top to bottom, centered):**

```
[Stick wordmark — white, medium size, ~24px equivalent]

                    spacing: ~40px

        Every bet. Every hole. Settled.
         [Serif headline, 64-80px, warm white #F0EBE3]

                    spacing: ~20px

    Track 12 golf betting games from one scorecard.
         [Sans-serif subtitle, 18-20px, #8A8580]

                    spacing: ~32px

          [ Download on the App Store ]
         [Coral #E8735A button, rounded, prominent]

                    spacing: ~12px

                   Available on iOS
              [Caption, 13px, #8A8580]
```

**Notes:**
- The wordmark anchors the brand at top. Not the S icon alone — the full "Stick" or "Stick Golf" text treatment.
- The headline is the only serif text on the page above the fold. It should feel like a magazine cover line.
- The subtitle explains what Stick is in one sentence. Deliberately understated.
- The CTA is the only coral element visible — it should draw the eye naturally.
- No scroll indicator. The content below earns the scroll.

---

## Section 2: The Problem (Light — #FAF8F5)

**Purpose:** Create empathy. Acknowledge the frustration. Then pivot to the solution.

**Visual hierarchy:**

```
                    Overline: THE PROBLEM
         [Sans, 11-12px, uppercase, tracked, #8A8580]

                    spacing: ~16px

        You know how this goes.
         [Serif headline, 40-48px, #1A1A1A]

                    spacing: ~24px

  [Two-column layout on desktop, stacked on mobile]

  LEFT COLUMN:                    RIGHT COLUMN:
  Someone birdies the 7th.        Stick tracks every bet,
  Now nobody can remember          every press, every stroke —
  if the press is live.            and settles the math
  The back-nine Nassau is          before you reach the
  two presses deep. Dave           parking lot.
  thinks he's up. Marcus
  thinks Dave's wrong.
  The scorecard is covered
  in arrows and question marks.

                    spacing: ~16px

              [Small Stick icon or subtle divider]
```

**Notes:**
- Left column paints the pain. Right column is the relief. The contrast should be felt visually — left could be slightly smaller/lighter text, right could be standard weight.
- The "You know how this goes" headline works because every golfer has lived this moment. It's conversational, not clinical.
- Keep this section short. The empathy should land in under 5 seconds of reading.

---

## Section 3: Game Showcase (Dark — #0F0F0F)

**Purpose:** Show the breadth of games. Each card is a gateway to a game guide. This is where the watercolor illustrations shine.

**Visual hierarchy:**

```
                    Overline: 12 GAMES
         [Sans, 11-12px, uppercase, tracked, #8A8580]

                    spacing: ~16px

         Every game your group plays.
         [Serif headline, 40-48px, warm white #F0EBE3]

                    spacing: ~12px

   The most complete game library in golf, with the
   math to back it up.
         [Sans subtitle, 16-18px, #8A8580]

                    spacing: ~48px

  [Card Grid — 4 columns on desktop, 2 on tablet, 1 on mobile]

  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐
  │ [watercolor] │  │ [watercolor] │  │ [watercolor] │  │ [watercolor] │
  │             │  │             │  │             │  │             │
  │   Nassau    │  │    Skins    │  │    Wolf     │  │   Snake     │
  │ The classic │  │ Winner      │  │ Choose your │  │ Don't       │
  │ three-bet   │  │ takes all   │  │ partner —   │  │ three-putt. │
  │ format.     │  │ hole by     │  │ or go it    │  │ Trust us.   │
  │             │  │ hole.       │  │ alone.      │  │             │
  │  2-4 players│  │  2-8 players│  │  4 players  │  │  3-4 players│
  └─────────────┘  └─────────────┘  └─────────────┘  └─────────────┘

  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐
  │ [watercolor] │  │ [watercolor] │  │ [watercolor] │  │ [watercolor] │
  │             │  │             │  │             │  │             │
  │  Match Play │  │    Vegas    │  │ Nine Point  │  │    Dots     │
  │ Head to     │  │ Team up.    │  │ The perfect │  │ Score every │
  │ head.       │  │ Multiply    │  │ three-player│  │ detail.     │
  │ Hole by     │  │ the stakes. │  │ game.       │  │             │
  │ hole.       │  │             │  │             │  │             │
  │  2 players  │  │  4 players  │  │  3 players  │  │  2-4 players│
  └─────────────┘  └─────────────┘  └─────────────┘  └─────────────┘

  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐
  │ [watercolor] │  │ [watercolor] │  │ [watercolor] │  │ [watercolor] │
  │             │  │             │  │             │  │             │
  │    Sixes    │  │ Split Sixes │  │   Scotch    │  │   Quota     │
  │ Rotating    │  │ Three-way   │  │ Alternate   │  │ Play against│
  │ teams.      │  │ battle.     │  │ shot with   │  │ your own    │
  │ Shifting    │  │ Every hole  │  │ a wager.    │  │ handicap.   │
  │ alliances.  │  │ counts.     │  │             │  │             │
  │  6 players  │  │  3 players  │  │  4 players  │  │  4-30+      │
  └─────────────┘  └─────────────┘  └─────────────┘  └─────────────┘

  Each card links to /games/[slug]/
```

**Card anatomy:**
- Watercolor illustration (top ~60% of card)
- Game name (Sans, semibold, 18-20px, white)
- One-line hook (Sans, 14-16px, #8A8580) — not a rules summary, a feeling
- Player count (Caption, 12-13px, #8A8580)
- Entire card is clickable, links to the game guide
- Subtle hover: card lifts slightly (2px translateY), illustration warms (slight brightness increase)

**Why all 12:** It's a differentiator. When someone sees 12 beautifully illustrated cards, the message is clear without saying it: this app is serious about golf betting. The 4×3 grid is also a strong visual rhythm — 12 is a better number than 11 for this exact reason.

---

## Section 4: The Product (Light — #FAF8F5)

**Purpose:** Show the app doing something impressive. Prove the craft.

**Visual hierarchy:**

```
                    Overline: THE APP
         [Sans, 11-12px, uppercase, tracked, #8A8580]

                    spacing: ~16px

    The math is always right.
         [Serif headline, 40-48px, #1A1A1A]

                    spacing: ~24px

  [Two-column layout: text left, app screenshot right]

  LEFT:                              RIGHT:
  Stick handles the scoring          [App screenshot showing
  so you can focus on                 a real Nassau settlement
  the round.                          with named players,
                                      dollar amounts, and
  • Real-time multi-device sync       "who pays whom" breakdown]
  • Automatic press tracking
  • Transparent settlement —
    every dollar accounted for
  • 1,448 tests verify the math

                    spacing: ~48px

  [Second row: screenshot left, text right — mirror layout]

  LEFT:                              RIGHT:
  [App screenshot showing             One scorecard.
   the game selection or               Multiple games running
   multi-game scoring view]            simultaneously.

                                      Run a Nassau, Skins,
                                      and Snake from the same
                                      round. Every game tracks
                                      independently. Settle
                                      everything at once.
```

**Screenshot notes:**
- Screenshots should show REAL game states with realistic scores and names
- No "lorem ipsum" or placeholder data
- Dark mode screenshots on the dark-section backgrounds would look natural
- Phone frames optional — could just show the UI clean with rounded corners and a subtle shadow
- The settlement screenshot is the money shot (literally) — it should show the zero-sum breakdown clearly

---

## Section 5: Social Proof (Dark — #0F0F0F)

**Purpose:** Build trust. Pre-launch, we don't have user testimonials, so we lead with trust signals.

**Visual hierarchy:**

```
                    spacing: ~80px top padding

  [Three stats in a row, large numbers, coral accent]

     12                 1,448              $0.00
   games               tests           rounding
   supported           verify the      errors —
                        math           ever

  [Sans numbers at 56-64px, coral #E8735A]
  [Sans labels at 14-16px, #8A8580]

                    spacing: ~48px

  "Finally, an app that gets Nassau right."
  [Serif, italic, 28-32px, warm white — styled as a pull quote]

                    spacing: ~8px

                 — Every golfer, eventually
                 [Sans, 14px, #8A8580]

                    spacing: ~80px bottom padding
```

**Notes:**
- The pull quote is aspirational — it's not attributed to a real person yet, which is fine. It reads as a voice-of-the-customer without claiming to be a testimonial. Alternatively, use a real beta tester quote if one exists by launch.
- The three stats should feel monumental — large type, generous spacing. The "$0.00 rounding errors" stat is unique and speaks directly to what makes Stick different.
- As real testimonials come in, this section evolves to feature them.

---

## Section 6: From the Blog (Light — #FAF8F5)

**Purpose:** Show editorial authority. Provide internal links for SEO. Give returning visitors a reason to come back.

**Visual hierarchy:**

```
                    Overline: FROM THE BLOG
         [Sans, 11-12px, uppercase, tracked, #8A8580]

                    spacing: ~16px

          The golf betting playbook.
         [Serif headline, 40-48px, #1A1A1A]

                    spacing: ~40px

  [Three blog post cards in a row — editorial layout, not SaaS cards]

  ┌────────────────────────────────────────────────────────┐
  │                                                        │
  │  [Hero image — full width of card]                     │
  │                                                        │
  │  STRATEGY                              February 2026   │
  │                                                        │
  │  Best Golf Betting Apps in 2026                        │
  │  [Serif, 24px, linked]                                 │
  │                                                        │
  │  An honest look at every app that tracks               │
  │  your golf bets — including ours.                      │
  │  [Sans, 15px, #8A8580]                                 │
  │                                                        │
  └────────────────────────────────────────────────────────┘

  [Two more cards in the same style, side by side below or in a 3-col grid]

                    spacing: ~24px

              View all posts →
              [Sans, 14px, coral #E8735A, links to /blog/]
```

**Notes:**
- The blog cards should feel editorial — more magazine than SaaS. Large images, clean typography, category labels.
- Only show 3 posts. This section exists to signal authority and recency, not to be a full archive.
- The "View all posts" link is subtle but important for internal linking.

---

## Section 7: Final CTA (Dark — #0F0F0F)

**Purpose:** Last chance to convert. Different photography from the hero to maintain visual variety.

**Visual hierarchy:**

```
  [Full-bleed atmospheric golf photograph — different from hero]
  [Darker overlay to ensure text readability]

                    spacing: ~120px top

         Every bet. Every hole. Settled.
         [Serif headline, 48-56px, warm white — echoes hero but smaller]

                    spacing: ~24px

          [ Download on the App Store ]
         [Coral #E8735A button — same style as hero CTA]

                    spacing: ~120px bottom
```

**Notes:**
- This is intentionally simple. The page has told the full story — this just catches anyone who scrolled all the way.
- Repeating the hero headline creates bookend symmetry. It's the last thing you read.
- No subtitle needed. If you've read the page, you know what Stick is.

---

## Section 8: Footer (Dark — #0F0F0F, slightly lighter than CTA section)

**Visual hierarchy:**

```
  ┌──────────────────────────────────────────────────────┐
  │                                                      │
  │  [Stick wordmark — left aligned]                     │
  │                                                      │
  │  PRODUCT        LEARN           COMPANY              │
  │  Download       Games           About                │
  │  Pricing        Blog            Privacy              │
  │  Support        Nassau Guide    Terms                │
  │                 Skins Guide                          │
  │                 Wolf Guide                           │
  │                                                      │
  │  ─────────────────────────────────────────           │
  │                                                      │
  │  © 2026 Stick Golf             [Social icons]        │
  │                                                      │
  └──────────────────────────────────────────────────────┘
```

**Notes:**
- The "LEARN" column with individual game guide links is an SEO play — footer links on every page give each game guide a site-wide internal link.
- Keep it minimal. The footer is not a second homepage.
- Social icons: only show platforms Stick is actually active on (TBD — open question from design brief).

---

## Responsive Behavior

### Desktop (1280px+ content width)
- Full grid layouts as described above
- Side-by-side text/screenshot sections
- 4-column game card grid

### Tablet (768px - 1279px)
- Game cards collapse to 2-column grid (2×6)
- Text/screenshot sections stack vertically
- Typography scales down ~15%
- Section padding reduces to 80-120px

### Mobile (< 768px)
- Single column throughout
- Game cards in a single column or 2-column grid (2×6 still works on most phones)
- Hero headline drops to 40-48px
- Section padding reduces to 60-80px
- Screenshots are full-width
- Stats stack vertically instead of 3-across

---

## Content Inventory (What Needs to Be Written/Created)

| Asset | Status | Notes |
|-------|--------|-------|
| Hero headline + subtitle | ✅ Decided | "Every bet. Every hole. Settled." |
| Problem section copy | ⬜ Needs writing | Keep it conversational, 2 short paragraphs |
| Game card descriptions (12) | ⬜ Needs writing | One-line hooks, not rules summaries |
| Product section copy | ⬜ Needs writing | Feature highlights, 2 blocks |
| Social proof stats | ✅ Ready | 12 games, 1,448 tests, $0 rounding errors |
| Pull quote | ✅ Ready | Placeholder — replace with real testimonial later |
| Blog post cards (3) | ⬜ Needs blog posts | Requires at least 3 published posts |
| Hero photograph | ⬜ Needs sourcing | Editorial, moody, atmospheric |
| CTA photograph | ⬜ Needs sourcing | Different from hero, same style |
| Watercolor illustrations (12) | ⬜ Needs creation | AI-generated first pass, refine later |
| App screenshots (2-3) | ⬜ Needs capturing | Real game states, real data |
| Stick wordmark | ⬜ Open question | Full "Stick" or "Stick Golf" treatment |
| OG image | ⬜ Needs creation | 1200×630, for social sharing |

---

## Related Documents

| Document | What It Covers |
|----------|---------------|
| [Design Brief](design-brief.md) | Full visual direction, brand territory, design principles |
| [Technical SEO Spec](../seo/technical-seo-spec.md) | Schema markup, rendering strategy, performance targets |
| [Content Strategy](../content/content-strategy.md) | Content architecture, blog standards, CTA guidelines |
| [Voice & Tone](../content/voice-and-tone.md) | Writing rules, example players, formatting conventions |
