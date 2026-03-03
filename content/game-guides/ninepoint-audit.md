# Nine Point — Feature Audit & Gap Analysis

> Audit source: Claude Code feature audit of the Nine Point game engine (February 28, 2026)
> Original doc: Nine Point game rules doc (V1.0, January 2026)
> Gap analysis: Compared against original doc, web research, and game-aliases.md

---

## Section 1: Stick Does This

These are confirmed, implemented features we can claim in the game guide.

### Configuration (10 fields)
- **pointSystem** — '5-3-1' or '4-2-0' (covers both Nine Point and Split Sixes)
- **dollarPerPoint** — Any positive number, default $1
- **scoringMode** — 'net' or 'gross'
- **blitzEnabled** — On/off, default off. Winner takes all 9 (or 6) when beating both opponents by 2+ strokes
- **birdieDoubleEnabled** — On/off, default off. All points on a hole double when any player makes birdie
- **structure** — '18hole' or 'nassau' (front/back/overall segments)
- **frontAmount** — Optional per-segment stake for Nassau front 9
- **backAmount** — Optional per-segment stake for Nassau back 9
- **overallAmount** — Optional per-segment stake for Nassau overall

### Point Distribution
- Standard 5-3-1: Low gets 5, middle gets 3, high gets 1
- Alternative 4-2-0: Low gets 4, middle gets 2, high gets 0 (Split Sixes mode)
- Every hole sums to exactly 9 (5-3-1) or 6 (4-2-0) — property-test verified
- 18 holes = 162 (5-3-1) or 108 (4-2-0) total points — property-test verified

### Tie Handling (all mathematically derived via averaging)
- **No ties:** 5 / 3 / 1
- **Two tie for low:** 4 / 4 / 1 — average of positions 1 and 2: (5+3)/2 = 4
- **Two tie for high:** 5 / 2 / 2 — average of positions 2 and 3: (3+1)/2 = 2
- **Three-way tie:** 3 / 3 / 3 — average of all three: (5+3+1)/3 = 3
- All splits produce whole numbers (no fractional points)

### Blitz / Shutout
- Triggers when one player beats BOTH opponents by 2+ net strokes
- Winner takes all 9 points (or 6 in 4-2-0)
- Blocked by any tie — if any two players tie, blitz cannot fire
- Stacks with birdie double: blitz + birdie = 18 points (5-3-1) or 12 (4-2-0)

### Birdie Double
- Triggers when any player's net score is below par
- Doubles ALL points on the hole (everyone's, not just the birdie-maker's)
- Multiplier applies before distribution
- Stacks with blitz

### Handicap Support
- Off-low-man calculation: lowest courseHandicap plays scratch, others get the difference
- Stroke allocation by stroke index (hardest holes first)
- Supports 18+ strokes (wraps around for second pass)
- Net score = gross score minus strokes received on that hole
- Gross mode: all handicaps set to 0

### Settlement
- **Pairwise model:** Each player settles with each other player based on point differential
- Formula: (Player A points − Player B points) × dollarPerPoint for each pair
- Three settlement lines: A↔B, A↔C, B↔C
- **Nassau settlement:** Three separate pairwise settlements (front, back, overall), each with optional independent amounts
- Zero-sum verified (tolerance < $0.01)
- Integer cent arithmetic throughout — no floating-point errors
- Branded `Cents` type for all accumulation, converted to dollars only at display

### Architecture
- Pure functional / stateless engine
- Score corrections trigger full recalculation from scratch
- Shared modules: reuses relativeRanking, pointDistribution, threeWaySettlement (shared with Split Sixes)
- Split Sixes delegates entirely to the Nine Point engine with pointSystem: '4-2-0'
- 81 dedicated tests (unit + property-based), all passing
- Property tests verify: point conservation, zero-sum settlement, ranking correctness, segment math, game state

### Player Count
- Locked to exactly 3 players (type system + validator enforce this)
- The entire engine is built on the 3-player model — this is correct for Nines

### Additional Engine Features
- **whatHappened narrative generator** — hole-by-hole commentary (blitz headlines, three-way tie callouts, birdie double details, standings updates)
- **Viewer-perspective selectors** — UI shows results from each player's point of view
- **Status badges** — visual indicators for current game state

---

## Section 2: Common Variations (Document Educationally, Don't Claim Stick Supports)

These are real things golfers do that the Nine Point engine does not currently handle. The game guide should explain them as "how some groups play it" without implying Stick tracks them.

### Par Bonus (7-1-1)
**In the original doc (Section 4.4), NOT in the engine.** If you're the only player to make par or better, you get 7 points instead of 5; the other two split the remaining 2 (1 each). Multiple web sources confirm this is a real variation. Golf Digest and The Fried Egg both mention it. It rewards par-making and adds incentive on harder holes.

**How common:** Moderately common. Several sources list it as a standard house rule option. Not as universal as blitz, but well-known.

**Guide treatment:** Mention in Variations section. Explain how it works. Note that Stick doesn't track it — groups can play it by manually adjusting if they want.

**Feature gap?** Medium priority. It's in the original doc as a planned config option. Would require a new point distribution path (check: is one player at par or better while the other two are above par?). Not complex to implement.

### Press-Repress
**In the original doc (Section 4.5), NOT in the engine.** The player with the most points tees off first. The player in last place can "press" (double points for the hole) before teeing off. The leader can "repress" (double again). Creates escalation — a pressed + repressed hole is worth 4× normal points.

**How common:** Uncommon. Only a couple of sources mention it. It's a more advanced/high-stakes variation that most casual threesomes don't play.

**Guide treatment:** Brief mention in Variations section. Explain the concept. Note it adds significant volatility.

**Feature gap?** Low priority. Complex to implement (tee order tracking, press/repress UI interactions). Very niche audience.

### Carryover on Three-Way Ties
**In the original doc (Section 4.7), NOT in the engine.** When all three players tie, instead of each getting 3 points, the 9 points carry to the next hole (making it worth 18). Similar to skins carryover logic.

**How common:** Rare. The doc itself notes three-way ties are uncommon to begin with. Most sources don't mention this variation.

**Guide treatment:** Brief mention in Variations section. One or two sentences.

**Feature gap?** Low priority. Three-way ties are rare, and the standard 3-3-3 split is universally accepted.

### 4-Player Variant (5-3-1-0)
**NOT in the original doc or engine.** Some groups adapt Nines for 4 players using a 5-3-1-0 distribution (9 points, last place gets 0). Web search confirms this exists but it's explicitly noted that Nines is "made specifically for three players." The 4-player version creates fractional point problems on ties (e.g., 4-way tie = 2.25 each).

**How common:** Uncommon. Most sources say Nines is strictly a 3-player game. Groups with 4 typically play a different game entirely.

**Guide treatment:** Brief mention that some groups try it with 4, but it's not ideal. Recommend Split Sixes or another format for 4 players.

**Feature gap?** No. The 3-player lock is correct. Supporting 4 players would require a fundamentally different engine and creates math problems.

### "Last Place Decides" (Final 3 Holes)
**NOT in original doc or engine.** One source (Golf Digest) mentions: when the threesome reaches the 16th tee, the player in last place gets to set the point values for the final three holes. A comeback mechanic.

**How common:** Very rare. Only one source mentions it. Clearly a house rule, not a standard variation.

**Guide treatment:** Fun mention in Variations section as a creative house rule. One sentence.

**Feature gap?** No. Too niche.

### Pot / Winner-Takes-All Settlement
**In the original doc (Section 6.2), NOT in the engine.** Instead of pairwise differential settlement, everyone antes a flat amount and the player with the most points takes the pot (or pot is split 60/30/10 for 1st/2nd/3rd).

**How common:** Some groups play this way. Simpler than pairwise, but less common. Pairwise is the standard.

**Guide treatment:** Mention as an alternative settlement method.

**Feature gap?** Low-medium priority. It's a simpler settlement model but would need a new settlement path. The doc called it out as a configuration option. Most groups play pairwise.

### Junk / Side Bets (Greenies, Sandies, etc.)
**NOT in original doc or engine.** Some groups layer side bets on top of the base Nine Point game — greenies (closest to pin on par 3s), sandies (up and down from a bunker), etc.

**How common:** Very common in casual golf generally, but not specific to Nine Point. These are universal add-ons that apply to any format.

**Guide treatment:** Mention that groups often layer junk bets on top. Not a Nine Point-specific variation.

**Feature gap?** This is a Stick-wide feature (Junk game covers some of this), not Nine Point-specific.

### Partial Handicap (50%, 80%)
**NOT in original doc or engine.** Some groups use a percentage of handicap strokes instead of full handicap. Reduces the impact of high handicappers receiving many strokes.

**How common:** Moderately common in organized group play. Less common in casual threesomes.

**Guide treatment:** Mention in handicap section as a variation some groups use.

**Feature gap?** Medium priority. Same gap identified in the Skins audit. This is a Stick-wide enhancement, not Nine Point-specific. The engine currently supports only 100% or 0% (net vs gross toggle).

---

## Section 3: Feature Gaps (Things the App Should Probably Support)

These are features worth implementing, ordered by priority.

### 1. Par Bonus (7-1-1) — Medium Priority
- **Why:** In the original game doc, multiple web sources confirm it, adds strategic depth
- **Scope:** New point distribution path — check if exactly one player is at or below par while both others are above par. If yes, distribute 7-1-1 instead of 5-3-1
- **Interaction with blitz:** Need to define — does blitz override par bonus? (Probably yes — blitz takes all 9 regardless)
- **Interaction with birdie double:** Par bonus × 2 = 14-2-2
- **Config:** `parBonusEnabled: boolean`, default false

### 2. Partial Handicap Allowance — Medium Priority (Stick-wide)
- **Why:** Multiple games need this (Skins audit identified it too). Common in organized play.
- **Scope:** Add `handicapAllowance` field (50%, 80%, 90%, 100%) at the engine level
- **Not Nine Point-specific** — applies to all games

### 3. Pot Settlement — Low-Medium Priority
- **Why:** In the original doc, some groups prefer simpler settlement
- **Scope:** New settlement mode. Winner takes pot, or weighted split (e.g., 60/30/10)
- **Config:** Add 'pot' option to settlement type

### 4. Carryover on Three-Way Ties — Low Priority
- **Why:** In the original doc, but very rare in practice
- **Scope:** When three-way tie occurs, accumulate 9 points onto next hole instead of splitting 3-3-3
- **Config:** `carryoverEnabled: boolean`, default false

---

## Summary

The Nine Point engine is in excellent shape. It covers the core game thoroughly — both point systems, all tie scenarios, blitz, birdie double, Nassau structure, pairwise settlement with zero-sum verification, and 81 tests. The big items from the original doc that didn't make it into V1 are Par Bonus (7-1-1), Press-Repress, carryover, and pot settlement. Of these, only Par Bonus seems worth flagging as a near-term gap. The others are either too niche (press-repress, carryover) or lower-priority (pot settlement).

The partial handicap gap is the recurring Stick-wide issue — same one Skins flagged. Worth tracking as a platform enhancement.

For the game guide: we have plenty to work with. The engine supports the way the vast majority of golfers play Nines. The variations we can't claim are all documented as "how some groups play it" — honest, educational, no false product claims.
