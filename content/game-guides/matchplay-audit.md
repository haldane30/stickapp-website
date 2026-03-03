# Match Play — Feature Audit & Gap Analysis

> Audit source: Claude Code feature audit of the Match Play game engine (February 28, 2026)
> Original doc: Match Play game rules doc (V1.0, January 2026)
> Gap analysis: Compared against original doc, engine audit, web research (Golf Digest, Golf Monthly, Golf Compendium, FSGA, GolfNow Blog, Left Rough, Gears Sports), and game-aliases.md

---

## Section 1: Stick Does This

These are confirmed, implemented features we can claim in the game guide.

### Configuration (10+ fields)
- **betAmount** — Any positive number, default $10
- **format** — Singles (1v1) or Four-Ball / Best Ball (2v2)
- **structure** — 18-Hole (single match) or Nassau (front/back/overall as three matches)
- **scoringMode** — Net or gross (net = 100% handicap allowance from low man)
- **pressesEnabled** — On/off toggle (requires Nassau structure)
- **autoPress** — Boolean, with configurable threshold (default 2 down)
- **autoPressThreshold** — Number of holes down to trigger auto-press
- **pressAmount** — Same, half, or double the base bet
- **maxPresses** — Cap per segment (null = unlimited, engine caps at 5)
- **noPressAfterHole** — Optional cutoff hole for press creation
- **concessions** — Array of hole or match concessions

### Match Formats
- **Singles (1v1):** Direct head-to-head comparison of net/gross scores
- **Four-Ball (Best Ball 2v2):** Team best ball vs team best ball, lowest score on each team counts
- Four-Ball requires 3+ players in the round (UI enforces)
- Team selection via TeamSelector component in setup

### Match Status & Scoring
- Running status: numeric (+N = player1/team1 up, -N = down, 0 = All Square)
- Status display: "3 UP", "2 DOWN", "AS" (All Square)
- **Dormie detection:** When |status| === holesRemaining > 0 (can't lose in regulation)
- **Early match completion:** When |status| > holesRemaining (mathematically decided)
- **Final result notation:** "4 & 3" (early close), "1 UP" (on 18th), "HALVED" (tied after 18)
- Halved holes when scores are equal (no status change)
- Missing scores treated as Infinity (auto-loss)

### Handicap Support
- Net scoring: 100% handicap allowance, strokes calculated from low man using course stroke index
- Gross scoring: No adjustments, raw scores compared
- Handles 25+ handicap (multiple strokes per hole on hardest holes)
- Off-low-man calculation (same as Nassau, Skins, Nine Point)

### Nassau Segments
- Three independent matches: Front 9 (holes 1-9), Back 9 (holes 10-18), Overall (holes 1-18)
- Each segment has independent status, completion, and dormie tracking
- Segment results feed independently into settlement

### Press System (Nassau only)
- Manual or auto-press at configurable threshold (default 2 down)
- Press creates new side bet from that hole to segment end
- Press-the-press chains via parent/child press IDs
- Press amount: same, half, or double the base bet
- Press eligibility: must be trailing, within hole limits, within max press count
- Each press calculated independently with own status/dormie/completion
- UI: "Press" button appears when eligible

### Concessions
- **Hole concession:** Opponent wins the hole outright (stored in config, checked first in hole determination)
- **Match concession:** Entire match conceded (overrides normal completion)
- Both types stored in config and respected by the calculator

### Settlement
- **Singles:** Winner receives betAmount from loser (one transaction)
- **Four-Ball:** Each loser pays each winner (2x2 = 4 transactions)
- **Nassau:** Per-segment + per-press settlements as separate line items
- **Halved matches:** No settlement (push)
- **Incomplete matches:** No settlement
- Zero-sum verified by property tests
- Integer cent arithmetic throughout
- Line-item settlement breakdowns

### Architecture
- Pure functional / stateless engine
- Score corrections trigger full match recalculation from scratch
- ~50+ unit tests, 28 property-based invariant tests
- whatHappened narrative generator for hole-by-hole impact
- Viewer-perspective selectors

---

## Section 2: Common Variations (Document Educationally, Don't Claim Stick Supports)

### Closeout Bet
**In the original doc (Section 6.4 as "Close-Out Bonus"), NOT in the engine.** When a match ends early (e.g., 4&3), a new mini-match starts on the remaining holes for half the original bet. Keeps all 18 holes meaningful. Very common in casual groups.

**How common:** Very common. Multiple sources describe it.
**Guide treatment:** Dedicated mention in Variations section.
**Feature gap?** Medium priority.

### Hammer / Re-Hammer
**NOT in original doc or engine.** Each hole is a separate bet. Either player can "hammer" (double) at any point. Made famous by Spieth/Thomas on Netflix's Full Swing. Air hammers (calling hammer while opponent's ball is in flight) add drama.

**How common:** Very popular since Full Swing aired. High search volume.
**Guide treatment:** Mention as a popular related game. Frame as its own game, not standard match play.
**Feature gap?** Low priority for Match Play. Wolf already has hammer.

### Foursomes (Alternate Shot)
**In the original doc (Section 5.2), NOT in the engine.** Partners alternate shots on one ball per team. Less common in recreational play.

**How common:** Common in tournaments. Uncommon in casual betting.
**Guide treatment:** Brief mention to clarify distinction from Four-Ball.
**Feature gap?** Low priority.

### Four-Ball 90% Handicap Allowance
**In the original doc (Section 4.5), NOT in the engine.** USGA recommends 90% for four-ball match play. Engine uses 100%.

**How common:** USGA standard. Most casual groups don't know about it.
**Guide treatment:** Mention in handicap section.
**Feature gap?** Medium priority. Recurring Stick-wide gap.

### Sudden Death / Playoff
**In the original doc (Section 6.2), NOT in the engine.** When halved after 18, some groups play sudden death.

**How common:** Moderately common. Most casual groups push.
**Guide treatment:** Mention as option. Note Stick treats halved as push.
**Feature gap?** Low priority.

### Mercy Rule
**In the original doc (Section 6.5), NOT in the engine.** End match at predetermined deficit.

**How common:** Uncommon.
**Guide treatment:** Brief mention as house rule.
**Feature gap?** No.

### Press Acceptance (Optional vs Mandatory)
**In engine type but NOT in UI.** Config includes `pressAcceptance` but UI doesn't prompt opponent.

**How common:** Mixed. Most groups play mandatory.
**Guide treatment:** Mention groups should agree before teeing off.
**Feature gap?** Low priority.

---

## Section 3: Feature Gaps

### 1. Four-Ball 90% Handicap Allowance — Medium Priority
- USGA standard, in original doc. Recurring Stick-wide gap.

### 2. Closeout Bet — Medium Priority
- Very common, differentiator, keeps all 18 holes meaningful.

### 3. Press Acceptance UI — Low Priority
- Type supports it, most groups play mandatory anyway.

---

## Summary

Most feature-rich engine in the Stick lineup. Singles, Four-Ball, full Nassau + press system, concessions, dormie, early match completion, zero-sum settlement, 50+ unit tests and 28 property tests.

**Guide framing:** Match play is the format, Nassau is the betting structure. Link heavily to the Nassau guide for press mechanics. Focus this guide on: hole-by-hole psychology, dormie situations, concessions/gimmes as strategy, Four-Ball team play, and the "match ends early" mechanic.

**Content opportunity:** Concessions and gimme strategy. No competitor covers this well.
**Keyword opportunity:** "match play golf betting" and "match play with presses" are underserved.
