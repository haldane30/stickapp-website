# Vegas — Three-List Gap Analysis

**Date:** March 1, 2026
**Inputs:** Original game doc (v1.0) → Feature audit (92 tests) → Web research (12+ sources)

---

## Section 1: Stick Does This (Claimable in Guide)

These features are confirmed working in the engine and safe to reference in the game guide.

### Configuration (18 fields)
- `pointValue` — Dollar per point, $0–$99 in $0.50 steps
- `playerCount` — 3 or 4 (3-player forces fixed teams)
- `teamFormation` — Fixed or Low/High dynamic
- `fixedTeams` — Manual team assignment (3-player uses `[soloId, soloId]` for solo team)
- `scoringVariant` — Vegas (low first) or Daytona (both-over-par = high first)
- `scoringMode` — Net or Gross
- `flipTheBird` — Master toggle for birdie/eagle flip mechanics
- `birdieType` — Net or Gross birdie detection (independent of scoring mode)
- `eagleBonus` — Config exists but always flip+double (see bugs below)
- `bothBirdieRule` — Config exists but always cancels (see bugs below)
- `carryoverEnabled` — Config exists but carryover always applies (see bugs below)
- `carryoverType` — Linear only (exponential is Phase 2)
- `hammerEnabled` — Working via shared hammer module (but not exposed in UI setup)

### Core Game Logic
- **Score pairing** — Concatenate two scores as digits, lower first. Priority: 10+ exception → Daytona penalty → lower first
- **10+ exception** — When either score ≥ 10, higher goes first. Tested for 10, 11, 12, combinations (10+10=1010, 10+11=1110, 11+12=1211)
- **Daytona variant** — Both players over par = higher score goes first. Working at unit level (no integration test)
- **Birdie/eagle detection** — Configurable net or gross. Birdie = par − 1 exactly. Eagle = par − 2 or better
- **Flip mechanics** — Priority cascade: both eagles cancel → one eagle flips + doubles → eagle outranks opposing birdie → both birdies cancel → one birdie flips → no flip
- **Flip application** — Digit reversal via string ops: 46→64, 104→401
- **Eagle bonus** — Flips opponent AND doubles the point differential
- **Carryover** — Linear: points × (consecutiveTies + 1). Counter increments on tie, resets on win
- **Team freezing** — Low/High dynamic teams freeze during carryover streaks
- **Hammer** — Shared module, doubles on each take, forfeit overrides winner

### Handicap Support
- Net vs. Gross via `scoringMode`
- Off-low-man calculation via `calculateVegasHandicaps()` (Vegas-specific, not shared module)
- Standard USGA stroke allocation across 18 holes by stroke index
- Separate birdie detection mode (can check net birdies even with gross scoring)

### Settlement
- **Fixed teams:** Pairwise — each winner receives from each loser. 4 transactions (2×2)
- **Dynamic teams:** Individual point accumulation, proportional transaction generation, floor arithmetic with last-winner-gets-remainder
- **Zero-sum verification** — `verifyZeroSum()` sums all `netResult` in integer cents, < 1 cent tolerance
- **Integer cent arithmetic** — Uses `toCents()`, `addCents()`, `toDollars()`, branded `Cents` type
- **Line-item breakdowns** — `transactions[]` array with payer, receiver, amount for each pair
- **Settlement UI** — `VegasBreakdown.tsx` renders transaction details

### Player Count
- 4 players: Full support (all team modes, all variations)
- 3 players: Code exists — solo player ID duplicated in team2, forces fixed formation

### Edge Cases
- **Incomplete hole:** Skipped if any player missing score
- **Score corrections:** Stateless recalculation from scratch — corrections propagate automatically including carryover chains
- **10+ pairing:** Extensively tested (10, 11, 12, combinations)
- **Leading zeros after flip:** `flipScore(1110) = 0111 = 111` — parseInt drops leading zeros. Tested
- **Palindrome scores:** `flipScore(66) = 66` — no change. Tested
- **Hammer forfeit + score:** Forfeiting team loses regardless of actual score; points still based on differential

### Test Coverage
- 48 unit tests (vegas.test.ts)
- 23 property-based tests with fast-check (vegas.properties.test.ts), 50–100 runs each
- 21 narrative engine tests (whatHappened.test.ts)
- **92 total tests**
- Property tests verify: zero-sum (5 tests, 100 runs each), score pairing (4 tests), flip correctness (4 tests), carryover (2 tests), team assignment (2 tests), outcome consistency (3 tests), state consistency (3 tests)

### Architecture
- Pure functional, stateless — `calculateVegasState()` takes immutable inputs, returns complete state
- Shared modules: `currency.ts`, `shared/hammer/`, `shared/threeWaySettlement.ts`
- Vegas-specific handicap calculation (not shared module)

---

## Section 2: Common Variations Stick Doesn't Track (Document Educationally)

These are real-world variations that Stick does not currently support. Cover in the guide's "Variations" section without implying Stick handles them.

### Both-Birdie Both-Flip (Medium Priority)
- **What:** When both teams birdie, instead of canceling, both teams flip each other's scores
- **Real-world prevalence:** Less common than cancel; some groups prefer it for more volatility
- **Audit status:** Config option `bothBirdieRule: 'bothFlip'` exists in UI but engine always returns same result as 'cancel'
- **Guide treatment:** Mention as a house rule variation. Note that most groups use the cancel rule

### Eagle Flip-Only (No Double) (Low Priority)
- **What:** Eagle flips opponent but doesn't double the differential
- **Real-world prevalence:** Some casual groups find the double too punishing
- **Audit status:** Config option `eagleBonus: 'flipOnly'` exists in UI but engine always doubles
- **Guide treatment:** Mention as a less common variant

### Exponential Carryover (Low Priority)
- **What:** Points × 2^ties instead of points × (ties + 1)
- **Real-world prevalence:** Rare; most groups use linear or no carryover
- **Audit status:** Not implemented, listed as Phase 2
- **Guide treatment:** Brief mention under Variations

### Press Mechanics (Low Priority for Vegas)
- **What:** Team that's behind can start a new side bet for remaining holes
- **Real-world prevalence:** Much less common in Vegas than in Nassau/Match Play. Most Vegas groups rely on carryover for comeback mechanics
- **Audit status:** Not implemented, Phase 2
- **Guide treatment:** Brief mention. Link to Nassau guide where presses are covered in depth

### Monte Carlo (Separate Game)
- **What:** Multiply scores instead of pairing (4×5=20 instead of 45)
- **Real-world prevalence:** Niche. Recognized but rarely played
- **Audit status:** Not implemented, listed as Phase 3 / separate game
- **Guide treatment:** Mention under Variations as an extreme variant. Note it's fundamentally different math

### Left/Right Dynamic Teams (Phase 2)
- **What:** Teams form based on tee shot position — two balls furthest left vs. two balls furthest right
- **Real-world prevalence:** Niche. Requires ball position data that's hard to capture
- **Audit status:** Not implemented, Phase 2. Requires data model extension
- **Guide treatment:** Brief mention under Variations as a fun twist for adventurous groups

### Amigos (Separate Game)
- **What:** Rotating partners based on fairway position, 3–6+ players, scoring via ladder not concatenation
- **Real-world prevalence:** Separate game entirely, often mentioned alongside Vegas but structurally different
- **Audit status:** Not implemented, not planned
- **Guide treatment:** Mention briefly that "Amigos" is sometimes confused with Vegas but is a different game. One sentence

### Solo Rotation (3-Player)
- **What:** Solo player rotates every 6 holes for fairness
- **Real-world prevalence:** Less common than fixed solo; acknowledged as fairer
- **Audit status:** Code exists for 3-player but no rotation. Phase 2
- **Guide treatment:** Mention in Variations section — "for fairness, rotate the solo player every 6 holes"

### House Rule Presets
- **What:** "Conservative Vegas" (no flip, no carryover) vs. "Full Vegas" (flip + carryover + eagle double)
- **Real-world prevalence:** Research shows Vegas is less standardized than other games — every group plays differently
- **Audit status:** No preset system
- **Guide treatment:** The Variations section effectively serves this role. Structure it so readers can pick their style

---

## Section 3: Feature Gaps (Potential Improvements)

Issues found by comparing the original game doc → audit → research.

### Bug: `carryoverEnabled` Config Not Checked (High Priority)
- **Issue:** The `carryoverEnabled` boolean exists in config but the engine never checks it. Carryover always applies on ties
- **Impact:** Users who toggle carryover off in the UI will still get carryover behavior
- **Recommendation:** Fix before launch. Simple conditional check before incrementing `consecutiveTies`

### Bug: `eagleBonus: 'flipOnly'` Not Implemented (Medium Priority)
- **Issue:** Config option exposed in UI but engine always applies flip + double regardless
- **Impact:** Users who select "Flip Only" will still get doubled points on eagles
- **Recommendation:** Fix or hide the UI option. If hiding, document as "always flip + double" in guide

### Bug: `bothBirdieRule: 'bothFlip'` Not Implemented (Medium Priority)
- **Issue:** Config option exposed in UI but returns same result as 'cancel'
- **Impact:** Users who select "Both Flip" get cancel behavior instead
- **Recommendation:** Fix or hide the UI option

### 3-Player Mode: Zero Test Coverage (High Priority)
- **Issue:** Code exists for 3-player mode but has zero tests. Solo player's ID is duplicated in team2
- **Impact:** Untested code path could produce incorrect results. Solo player settlement may have edge cases
- **Recommendation:** Add comprehensive test suite before promoting 3-player mode in the guide

### Hammer Not in UI Setup (Medium Priority)
- **Issue:** `hammerEnabled` field not in UI setup type — hammer cannot be configured through the normal setup flow
- **Impact:** Feature exists in engine but users can't access it
- **Recommendation:** Add to UI config form or document as hidden/advanced feature

### No Partial Handicap Support (Recurring Stick-Wide Gap)
- **Issue:** Vegas uses 100% allowance only. No 50%/80% option. Uses its own `calculateVegasHandicaps()` instead of shared handicap module
- **Real-world prevalence:** Most casual groups play gross anyway. Net Vegas with partial handicap is rare
- **Recommendation:** Low priority for Vegas specifically. Track as Stick-wide improvement

### Daytona: No Integration Test (Low Priority)
- **Issue:** Daytona variant works at unit level but has no full-game integration test
- **Recommendation:** Add integration test covering 18 holes with Daytona scoring

### Net Scoring: No Targeted Tests (Medium Priority)
- **Issue:** Net scoring only covered randomly via property tests, no dedicated unit tests
- **Recommendation:** Add targeted tests verifying net score pairing with known handicap inputs

### Dynamic Team Settlement: No Unit-Level Money Math Test (Medium Priority)
- **Issue:** Dynamic team (Low/High) settlement has no dedicated money math test
- **Recommendation:** Add unit test with known inputs verifying per-player settlement amounts

### Adapter Duplication (Low Priority)
- **Issue:** `getVegasPlayerPoints` exists in both `adapters/vegas.ts` and `selectors.ts`
- **Recommendation:** Consolidate to single source of truth

### Missing Type Exports (Low Priority)
- **Issue:** `VegasTeamId`, `VegasHammerEvent`, `VegasHoleEvents`, `VegasHammerResult` not exported from `types/index.ts`
- **Recommendation:** Add exports for consumer convenience

---

## Summary

| Category | Count |
|----------|-------|
| **Claimable features** | 18 config fields, full scoring pipeline, 92 tests, zero-sum verified |
| **Educational variations** | 9 (both-flip, flip-only eagle, exponential carryover, press, Monte Carlo, left/right, Amigos, solo rotation, house presets) |
| **Bugs to fix** | 3 (carryoverEnabled, eagleBonus flipOnly, bothBirdieRule bothFlip) |
| **Test gaps** | 4 (3-player, net scoring, Daytona integration, dynamic settlement) |
| **Other gaps** | 4 (hammer UI, partial handicap, adapter duplication, missing exports) |

### Key Findings

1. **Three config bugs where UI exposes options the engine ignores.** The `carryoverEnabled` bug is highest priority — users expect toggling it off to actually disable carryover
2. **3-player mode has zero test coverage.** The guide should mention it exists but can't lean on it heavily until tested
3. **Vegas is Stick's most feature-complete engine for its complexity level.** 92 tests, hammer support, dynamic teams, Daytona variant, separate birdie detection mode — this is a deep implementation
4. **Research confirms Stick covers the core rules well.** The 10+ exception, flip mechanics, carryover, and eagle double are all implemented correctly per real-world consensus
5. **Carryover tracking is a competitive differentiator.** No competitor tracks it automatically — this is Stick's Vegas selling point
