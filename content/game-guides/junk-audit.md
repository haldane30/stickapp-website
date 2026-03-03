# Junk (Dots) — Three-List Gap Analysis

**Date:** March 1, 2026
**Inputs:** Original game doc → Feature audit (66 tests) → Web research (30+ sources)

---

## Section 1: Stick Does This (Claimable in Guide)

These features are confirmed working in the engine and safe to reference.

### Configuration
- `dollarPerDot` — Dollar value per dot point (currency, no min/max enforced)
- `greenieMustMakePar` — Boolean toggle. When true, greenie holder must score par or better to collect. Default: false
- `categories` — Array of per-category configs, each with `categoryId`, `enabled`, `points` (overridable)

### 11 Built-In Categories
| Category | Type | Default Pts | Negative? | Eligible Holes |
|----------|------|-------------|-----------|----------------|
| Birdie | auto | +1 | No | All |
| Eagle | auto | +2 | No | All |
| Greenie | exclusive | +1 | No | Par 3 |
| Prox (Closest to Pin) | exclusive | +1 | No | All |
| Sandy | anyone | +1 | No | All |
| Chippie (Chip-in) | anyone | +1 | No | All |
| Barkie | anyone | +1 | No | All |
| Long Drive | exclusive | +1 | No | Par 4+ |
| 3-Putt (Snake) | anyone | −1 | Yes | All |
| Double+ | auto | −1 | Yes | All |
| Water/OB | anyone | −1 | Yes | All |

### Three Dot Types (Working Correctly)
- **Auto-detected:** Birdie (exactly −1 vs par), Eagle (−2 or better, covers albatross), Double+ (2+ over par). Score-driven, can't be manually overridden, update instantly on score corrections
- **Exclusive:** Greenie, Prox, Long Drive. One winner per hole per category. Last selection wins (Map.set). UI replaces previous winner
- **Anyone:** Sandy, Chippie, Barkie, 3-Putt, Water/OB. Multiple players can earn same dot on same hole. All occurrences accepted

### Greenie Must-Make-Par
- Fully implemented. Bogey or worse → greenie voided entirely (not carried over)
- Par or better → greenie awarded
- No player result → greenie awarded (benefit of the doubt)
- 4 dedicated tests

### Settlement
- **Pairwise differential model** — Each unique pair of players settles based on dot difference
- **Integer cent arithmetic** — toCents(), multiplyCents(), toDollars()
- **Zero-sum verified** — Property test, 100 random iterations
- **Per-category breakdowns** — `playerDotsByCategory` provides full breakdown per player
- **Line items** — Settlement produces individual transactions per player pair

### Player Count
- 2–8 players (property tests exercise this range). No hardcoded limit
- Settlement generates n×(n−1)/2 transactions (4 players = 6 items)

### Edge Cases Handled
- No dots earned → all zeros, no settlement
- Negative totals → fully supported
- Score corrections → full recalculation, auto dots update instantly
- Multiple dots same hole → supported (birdie + sandy + prox on one hole = 3 dots)
- All players tied → 0 settlement items
- Disabled category occurrence → silently skipped

### Test Coverage
- 27 unit tests (dots.test.ts)
- 15 property-based tests (dots.properties.test.ts), 50–100 runs each
- 16 narrative engine tests (whatHappened.test.ts)
- 7 selector tests (selectors.test.ts)
- 1 partial round test
- **66 total tests**

### Architecture
- Pure functional, stateless — full recalculation every time
- Shared currency module (toCents/toDollars/multiplyCents)

---

## Section 2: Common Variations Stick Doesn't Track (Document Educationally)

### Custom/User-Defined Categories (High Demand)
- **What:** Groups add their own categories — Hogie (hole-in-one as distinct from eagle), Poley (long putt made), Murphy (called up-and-down), Nasty (automatic hole-out for par+), Shark (water + par), Arnie (par without fairway), Ferret (chip-in for birdie)
- **Real-world prevalence:** Very high. Research shows 20+ categories in the wild beyond the 11 Stick supports
- **Audit status:** Category set hardcoded to 11. No custom category creation
- **Guide treatment:** List the most popular additional categories educationally. Note which ones Stick's existing categories cover (Chippie covers chip-ins, Prox covers closest to pin). Mention the others as common house rules

### Per-Category Dollar Values (Medium Demand)
- **What:** Some groups assign different dollar values to different categories (eagle worth $5, sandy worth $1) instead of a single dollarPerDot
- **Real-world prevalence:** Moderate — mainly in serious/tournament play
- **Audit status:** Engine supports per-category *point* values but settlement uses a single `dollarPerDot` multiplier. Groups can approximate by setting eagle to 5 points and sandy to 1 point (same effect)
- **Guide treatment:** Explain the point-value system as the way to differentiate category worth. $1/dot with eagle at 2 points = eagle worth $2

### Greenie Carryover (Low-Medium Demand)
- **What:** When greenie is voided (didn't make par), the dot carries to the next par 3 instead of disappearing
- **Real-world prevalence:** Some groups use this. Adds drama ("there's a greenie riding on this one")
- **Audit status:** Not implemented. Original game doc Section 3.2 mentions it as configurable. Engine only voids
- **Guide treatment:** Mention as a house rule variation. Note that Stick voids the greenie when must-make-par is on

### Called vs. Automatic Categories (Niche)
- **What:** Some categories require the player to "call it" before the shot (Murphy, Poley). Others are always automatic
- **Real-world prevalence:** Source of disputes. Groups that use Poley or Murphy must pre-decide
- **Audit status:** No call/automatic distinction in engine. All dots are either auto-detected or manually entered
- **Guide treatment:** Explain the distinction in the Variations section. Recommend groups agree on call rules before the round

### Sandie Variants (Niche)
- **What:** Super Sandie (par from fairway bunker, 2 pts), Exotic Sandie (both bunkers same hole, 4 pts)
- **Real-world prevalence:** Niche. Standard Sandy covers the vast majority
- **Audit status:** Not separate categories. Groups could use the points override (set sandy to 2 for a house rule)
- **Guide treatment:** Brief mention under Variations

### Net Scoring Option (Rare)
- **What:** Auto-detection based on net score instead of gross
- **Real-world prevalence:** ~5% of groups. Almost everyone plays gross
- **Audit status:** Engine uses grossRelativeToPar only. No net option
- **Guide treatment:** Mention that most groups play gross. Don't position as a gap — research confirms this is the standard

---

## Section 3: Feature Gaps (Potential Improvements)

### Snake/Dots 3-Putt Sync Not Implemented (High Priority)
- **Issue:** Original game doc Section 10 describes bidirectional sync — tapping 3-putt in Dots should create a Snake occurrence and vice versa. No evidence of UI-layer sync code
- **Impact:** Groups running Snake + Junk simultaneously have to mark 3-putts in both games manually
- **Recommendation:** Implement UI-layer sync. When 3-putt is recorded in either game, create occurrence in the other. The engines are correctly independent — this is a UI concern

### eligibleHoles Not Enforced by Engine (Medium Priority)
- **Issue:** Greenie is tagged as par-3-only, Long Drive as par-4+, but the engine doesn't enforce this. A UI bug could create invalid data (greenie on a par 5)
- **Impact:** Low if UI is correct. But a safety net in the engine would prevent bad data
- **Recommendation:** Add validation in engine: skip occurrences where category eligibleHoles doesn't match hole par

### greenie_denied Dramatic Moment Never Generated (Low Priority)
- **Issue:** The `greenie_denied` moment type exists in whatHappened.ts but is dead code. When greenieMustMakePar voids a greenie, no narrative event fires
- **Impact:** Missed "what just happened" moment. The drama of losing a greenie to a bogey should be narrated
- **Recommendation:** Generate greenie_denied event when greenie is voided. Low effort, high UX impact

### Albatross/Hole-in-One Not Distinct from Eagle (Low Priority)
- **What:** Eagle covers −2 or better, so albatross triggers eagle. No separate "ace" or "albatross" category
- **Real-world prevalence:** Research shows hole-in-one is universally recognized as a separate achievement worth more than eagle (2–5 points)
- **Recommendation:** Consider adding ace/hole-in-one as a distinct auto-detected category. Would require checking par-3 + score-of-1 specifically

### Double+ Doesn't Scale (Low Priority)
- **Issue:** doublePlus is −1 regardless of severity. Triple bogey, quad, and worse all cost the same
- **Real-world prevalence:** Some groups differentiate (triple bogey = −2, quad = −3)
- **Recommendation:** Low priority. Current implementation matches what most groups do

### groupResultsByHole Duplicated (Low Priority)
- **Issue:** Dots has its own `groupResultsByHole` function. Should use shared version
- **Recommendation:** Consolidate. Code hygiene

---

## Summary

| Category | Count |
|----------|-------|
| **Claimable features** | 11 categories, 3 dot types, greenie must-make-par, pairwise settlement, 66 tests |
| **Educational variations** | 6 (custom categories, per-category $, greenie carryover, called vs auto, sandie variants, net scoring) |
| **Feature gaps** | 3 priority (Snake sync, eligibleHoles enforcement, greenie_denied narrative) |
| **Low priority gaps** | 3 (ace category, double+ scaling, code duplication) |

### Key Findings

1. **Stick's 11 categories cover the core set well.** Research shows Birdie, Eagle, Greenie, Sandy, Barkie, Snake (3-putt) are the universal 6. Stick has all of them plus Chippie, Prox, Long Drive, Double+, and Water/OB — covering the "standard 8–10" most groups use
2. **Custom categories are the #1 missing feature.** 20+ categories exist in the wild. Stick's 11 cover the most common ones, but power users will want Poley, Murphy, Arnie, Shark at minimum
3. **Snake/Dots sync is the most impactful quick win.** Groups running both games shouldn't have to double-enter 3-putts
4. **Gross-only scoring is correct.** Research confirms ~95% of groups play gross. No need to add net scoring for Junk
5. **Negative categories are a competitive advantage.** 18Birdies doesn't support them. Stick has 3-Putt, Double+, and Water/OB — covering the most requested negatives
6. **The point-value system solves per-category pricing.** Groups wanting eagle worth more than sandy can set eagle to 2 points and sandy to 1 point at $1/dot. Same economic effect as per-category dollar values
