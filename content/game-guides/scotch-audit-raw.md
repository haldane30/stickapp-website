# Scotch Game Engine — Raw Claude Code Audit Output

**Date:** March 1, 2026
**Source:** Claude Code audit of Stick app Scotch engine
**Purpose:** Preserved raw technical detail for future reference. Gap analysis derived from this lives in `scotch-audit.md`.

---

## 1. Configuration Fields

Engine Config (ScotchConfig — src/engine/src/games/scotch/types.ts:51-73)

| # | Field | Type | Default | Read by Calculator? | Notes |
|---|-------|------|---------|-------------------|-------|
| 1 | gameType | 'scotch' | — | Type guard only | Discriminator field |
| 2 | playerIds | PlayerId[] | — | Yes (validation) | Must be exactly 4 |
| 3 | teams | {team1: [P,P], team2: [P,P]} | — | Yes (core logic) | 2 per team |
| 4 | dollarPerPoint | number | 1 | Yes (settlement) | Must be >0 |
| 5 | scoringMode | 'net' \| 'gross' | 'net' | Indirectly | Calculator never reads it directly for lowBall/lowTotal/highBall — those use r.netScore from upstream. Only read by birdie/eagle evaluators via naturalBirdieOnly. |
| 6 | categories | ScotchCategory[] | getDefaultCategories(false) | Yes (core loop) | Filters to enabled: true |
| 7 | umbrellaEnabled | boolean | true | Yes | Controls sweep doubling |
| 8 | rollEnabled | boolean | true | Via canRoll selector | Not read by calculator, only by selector |
| 9 | useHighBall | boolean | false | No | Only used at setup time to build categories. Redundant once categories are constructed. |
| 10 | threePuttLosesProx | boolean | false | Yes (prox evaluator) | UI never sets the input data it needs (see Bug #2) |
| 11 | naturalBirdieOnly | boolean | true | Yes (birdie + eagle) | |
| 12 | eagleBonusEnabled | boolean | false | Yes | |
| 13 | eagleBonusPoints | number | 1 | Yes | Default 1, max 6 in UI |
| 14 | maxMultiplier | number? | undefined | Yes (cap logic) | Bug: never reaches engine (see Bug #1) |

Dead / semi-dead fields:
- scoringMode — The calculator trusts upstream PlayerHoleResult.netScore. The field exists for future flexibility but is only meaningful for birdie/eagle natural-vs-net distinction, which is controlled by naturalBirdieOnly instead.
- useHighBall — Consumed at config construction time (getDefaultCategories(useHighBall)), then redundant. The calculator reads categories, not useHighBall.
- rollEnabled — Not read by the calculator. Only the canRoll selector reads it.

### UI Config Mapping (ScotchConfigForm.tsx → useRoundSetup.ts)

| UI Control | UI Field | Engine Field | Mapping |
|-----------|----------|-------------|---------|
| Dollar Per Point ($) | dollarPerPoint | dollarPerPoint | Direct |
| Handicaps toggle | handicapsEnabled | scoringMode | true → 'net', false → 'gross' |
| Team Selector | teams | teams | Direct |
| Umbrella toggle | umbrellaEnabled | umbrellaEnabled | Direct |
| Roll toggle | rollEnabled | rollEnabled | Direct |
| High Ball toggle | useHighBall | useHighBall + categories | getDefaultCategories(useHighBall) |
| 3-Putt Loses Prox toggle | threePuttLosesProx | threePuttLosesProx | Direct |
| Natural Birdie Only toggle | naturalBirdieOnly | naturalBirdieOnly | Direct |
| Eagle Bonus toggle | eagleBonusEnabled | eagleBonusEnabled | Direct |
| Eagle Bonus Points | eagleBonusPoints | eagleBonusPoints | Direct |
| Cap Multipliers toggle + value | maxMultiplier | NEVER MAPPED | Bug #1 |

---

## 2. Core Game Logic

- Player count: Exactly 4. Validated by both the engine (validateConfig() throws) and the UI (gameRequirements.ts: exactPlayers: [4]).
- Format: 2v2 team play, teams fixed for the full 18 holes.
- Point system: 6 points per hole distributed across 4 categories:

| Category | Points | How It Works |
|----------|--------|-------------|
| Low Ball | 2 | Best individual net score wins |
| Low Total | 2 | Combined team net total wins (or High Ball variant: team whose worst ball is lower) |
| Proximity | 1 | Manual input — scorekeeper picks winning team |
| Birdie | 1 | Any player with gross birdie (or net if naturalBirdieOnly: false); cancels if both teams birdie |

- Tie handling per category: Winner is 'none' — points are not awarded (not split). This is important: tied categories produce 0 points for both teams. On an all-tied hole, 0 of 6 points are awarded.
- Partial ties: Handled naturally. E.g., tied low ball (0 of 2 points awarded) + team1 wins low total (2 pts) + team2 wins prox (1 pt) + no birdies (0 pts) = team1: 2, team2: 1.

---

## 3. Point Distribution

- Standard breakdown: 2-2-1-1 (Low Ball, Low Total, Prox, Birdie) = 6 total.
- Configurable? The engine processes categories generically from a ScotchCategory[] array. The points field is per-category. In theory any distribution works. In practice, the UI does not expose category point editing — it always uses getDefaultCategories(useHighBall) which hard-codes 2-2-1-1.
- Tie-split behavior: Points are not split — they vanish. If both teams tie low ball, the 2 points for that category are not awarded to anyone. This is the "points disappear" model, not the "points split" model. This is a legitimate variation (some groups prefer split points, some prefer void).
- All four players tie a hole: Every category evaluates independently. Low Ball: tied → 0 pts. Low Total: tied → 0 pts. Prox: depends on manual input (could still be awarded). Birdie: both birdie → cancels (0 pts), no birdies → 0 pts. So an all-tied hole could yield 0-6 total points depending on prox and birdie.

---

## 4. Scoring Mode

- Net vs. gross: Controlled by scoringMode ('net' | 'gross'), mapped from the UI's "Handicaps" toggle.
- Handicap method: The Scotch engine itself doesn't calculate handicaps — it receives PlayerHoleResult objects from the upstream handicap pipeline with netScore already computed. The upstream uses the standard "off low man" method with full stroke allocation to holes by stroke index.
- What net scoring affects:
  - Low Ball: compares r.netScore (always, regardless of scoringMode)
  - Low Total: sums r.netScore
  - High Ball: compares r.netScore
  - Birdie: uses grossRelativeToPar or netRelativeToPar based on naturalBirdieOnly
  - Prox: unaffected (manual input)
- Handicap allowance: Not configurable within Scotch. Uses whatever the upstream handicap system provides (full strokes off low man is the current default).

---

## 5. Settlement

- Model: Team-based. Point differential × dollar-per-point = total pot. Each winner gets half, each loser pays half.
- Calculation (settlement.ts):
  1. diff = state.netPointDifferential (effective points: after umbrella + roll)
  2. If diff === 0: all players at $0
  3. totalCents = toCents(dollarPerPoint) × |diff|
  4. perWinnerCents = floor(totalCents / 2), first winner gets remainder cent
  5. Each loser pays same structure (negated)
- Zero-sum verification: Yes — computed inline with sumCents() and stored as isZeroSum boolean. Also verified by: 4 dedicated unit tests, 101-iteration loop test (diff from -50 to +50), 210-combination loop test (10 dollar values × 21 differentials), 5 fast-check property tests (350+ random runs), Integration test (all-11-games stress test).
- Integer cent arithmetic: Yes — all math uses toCents(), multiplyCents(), negateCents(), sumCents() from currency.ts. No floating-point dollar arithmetic.
- Line-item breakdown: Yes — playerResults array has one ScotchPlayerSettlement per player with netResult in cents.
- Maximum exposure: With defaults (no multiplier cap): a 6-point sweep + umbrella (12 effective) on every hole × any number of roll doublings → unbounded. With maxMultiplier cap: capped. But since maxMultiplier doesn't reach the engine (Bug #1), there is currently no exposure limit in practice.

---

## 6. Variations & Special Rules

**Umbrella (Sweep):** When one team wins ALL base category points on a hole (no ties allowed), their points are doubled. Requires every category to have a winner (tied categories make umbrella impossible). Configurable via umbrellaEnabled.

**Roll (Double):** The trailing team can "roll" (double) the stakes via the shared hammer module. Receiving team can "take" (accept the double) or "drop" (forfeit the hole at current stakes). Re-rolls stack (2x → 4x → 8x...). Umbrella and roll stack multiplicatively.

**Eagle Bonus:** Optional extra category (configurable points, default 1). Eagles earn bonus points. If both teams eagle, cancels. Uses birdie categoryId (stacks with birdie category). Eagle bonus does NOT affect umbrella eligibility (only base categories count).

**High Ball Variant:** Replaces Low Total with High Ball (best worst-ball). Rewards consistent play from both teammates rather than one player carrying.

**3-Putt Loses Prox:** If the prox-winning team 3-putted, the point flips to the other team. However, the UI never populates this data (Bug #2).

**Multiplier Cap:** Caps the combined umbrella × roll multiplier. Engine supports it. UI exposes it but it never reaches the engine (Bug #1).

**Not Supported:**
- No press mechanics. No auto-press, no 2-down press, no individual press creation.
- No carryover on ties. Tied category points vanish; they don't carry to the next hole.
- No 7-point variant. No birdie bonus point beyond the standard birdie category.
- No segment play. No 6-6-6 rotation or per-segment settlement.
- No individual low ball. Always team-based (best of 2).
- No custom category editing in UI. Always 2-2-1-1 preset.

---

## 7. Edge Cases

| Edge Case | Handling | Verified? |
|-----------|---------|-----------|
| Incomplete hole data | Skipped (needs all 4 players) | Yes — unit test |
| Score corrections | Recalculated from scratch (pure function) | Yes — determinism property test |
| Equal handicaps | Works fine — net scores are same as gross | Tested at evaluator level |
| Very high handicaps (36+) | No cap in Scotch engine — upstream handles | Not explicitly tested |
| Player count ≠ 4 | validateConfig() throws | Yes — unit test |
| Team size ≠ 2 | validateConfig() throws | Yes — unit test |
| Team player not in playerIds | validateConfig() throws | Yes — implicit |
| dollarPerPoint ≤ 0 | validateConfig() throws | Yes — implicit |
| 0 holes completed | Valid state (empty results, 0 differential) | Not explicitly tested |
| All 18 holes tied | 0 differential, $0 settlement | Tested via property tests |
| Single-hole partial round | Zero-sum verified for 1-18 holes | Yes — fast-check property |

---

## 8. Test Coverage

| Test File | Test Cases | Type |
|-----------|-----------|------|
| scotch.test.ts | 49 | Unit + integration |
| scotch.properties.test.ts | 18 | Property-based (fast-check) |
| whatHappened.test.ts | 38 | Narrative unit tests |
| selectors.test.ts | 6 | Selector unit tests |
| Integration (shared files) | ~7 | Multi-game integration |
| **Total** | **~118** | |

Property-based invariants verified:
1. Zero-sum settlement (full rounds, partial rounds, various dollar amounts)
2. Category points sum to expected total per hole
3. At most one winning team per category
4. Umbrella requires sweep of ALL categories
5. State consistency (holesCompleted, isComplete, standings accumulation)
6. Determinism (same inputs → same output)
7. Non-negative per-hole team points

Coverage gaps:
- maxMultiplier cap logic has zero tests (engine supports it, but no tests exercise it)
- Eagle bonus + umbrella interaction (not tested in combination)
- threePuttLosesProx through full calculator pipeline (only tested at evaluator level)
- Empty round (0 holes) not explicitly tested
- scoringMode: 'net' with handicap strokes in property tests (property tests all use gross/0 strokes)
- Prox category disabled + prox data present (no test that prox input is ignored)

---

## 9. Architecture

- Pure functional / stateless: Yes. calculateScotchState() is a pure function. No side effects, no mutations, no React, no Convex.
- Shared modules used: shared/hammer/ — Roll mechanic delegates to calculateHammerResult() for multiplier computation. currency.ts — All settlement math uses integer cents.
- Modular design: The CategoryEvaluator interface + CATEGORY_EVALUATORS registry is clean and extensible. Adding a new category requires only: (1) new evaluator function, (2) register in the map. No changes to calculator, settlement, or types.
- TODOs / future comments:
  - types.ts:24-25: "V1 supports 4 core + 1 variant. Designed to grow for V2/V3."
  - types.ts:61: "V1: always 6-point preset, calculator processes generically"
  - categories.ts:4-5: "modular foundation for Scotch and future 'build your own game'"
  - categories.ts:184: "Future categories just need a new entry here."
- Dead code: getEvaluator() in categories.ts:198 — exported public function with zero consumers. ScotchConfig.useHighBall — redundant once categories are built (setup-time only). Status badge ternary in adapters/scotch.ts:167 — always returns 'neutral' regardless of condition.

---

## 10. Confirmed Bugs

### Bug #1: maxMultiplier Never Reaches the Engine (Severity: Medium)
- UI exposes it (ScotchConfigForm.tsx:144-152): User can toggle "Cap Multipliers" and set a value.
- Engine supports it (calculator.ts:210-217): The calculator reads config.maxMultiplier and caps effectiveNetPoints.
- But the mapping is broken in two places:
  1. useRoundSetup.ts:506-536 — Builds EngineScotchConfig but omits maxMultiplier. The field simply isn't there.
  2. convexGameConfig.ts — The Scotch field mapper does not include maxMultiplier, so even if it reached the engine locally, it would be lost on Convex round-trip (rejoin, history, multi-device).
- Impact: A user who enables multiplier caps gets zero actual protection. The UI is purely cosmetic. With umbrella + re-rolls, exposure is unbounded.

### Bug #2: proxPlayerThreePutt Never Populated from UI (Severity: Low)
- Config toggle works (ScotchConfigForm.tsx): User can enable "3-Putt Loses Prox".
- Engine evaluator works (categories.ts:137): Checks ctx.holeInput.proxPlayerThreePutt.
- But the score entry flow never sets it:
  - RoundContext.tsx:606-608 — Creates ScotchHoleInput with only holeNumber and proxWinner. No proxPlayerThreePutt.
  - ScoreEntrySheet.tsx — Shows a prox team picker but never asks about 3-putts for prox purposes.
  - The app DOES track 3-putts for Dots/Snake games, but that data is never connected to Scotch prox input.
- Impact: The "3-Putt Loses Prox" rule is configurable but non-functional. The prox evaluator's penalty branch is dead code in practice.

### Bug #3: Game Info Sheet Missing Multiplier Cap Documentation (Severity: Cosmetic)
GameInfoSheet.tsx Scotch section documents all advanced options EXCEPT "Cap Multipliers". Users who discover the toggle have no rules explanation.

---

## 11. Feature Gaps vs. Real-World Play

| Feature | Engine Status | Real-World Expectation | Gap? |
|---------|--------------|----------------------|------|
| 6-point basic (2-2-1-1) | Implemented | Standard | No |
| Low Ball (best individual) | Implemented | Universal | No |
| Low Total (combined team) | Implemented | Universal | No |
| High Ball variant | Implemented (toggle) | Common variant | No |
| Proximity (manual input) | Implemented | Standard | No |
| Birdie bonus (1 pt) | Implemented | Standard | No |
| Umbrella / sweep | Implemented | Very common | No |
| Roll / press doubling | Implemented (via hammer) | Common | No |
| Net scoring | Implemented | Standard | No |
| Eagle bonus | Implemented (configurable) | Less common variant | No |
| 3-putt loses prox | Config present, data pipeline broken | Common house rule | Bug #2 |
| Multiplier caps | Engine present, UI→engine broken | Risk-management tool | Bug #1 |
| Custom point distributions | Engine supports generically, UI hardcoded to 2-2-1-1 | Some groups prefer 3-3 LB/LT split | Mild gap |
| Carryover on ties | Not supported | Common variant — tied points carry to next hole | Gap |
| Press mechanics (2-down auto-press) | Not supported | Very common in competitive groups | Gap |
| 7-point variant | Not supported (eagle bonus is separate, not 7th category) | Some groups add a 7th "bonus" point | Gap |
| Segment play (6-6-6 with rotation) | Not supported | Some groups combine Scotch points with Sixes rotation | Gap |
| Split points on ties | Not supported (points vanish) | Some groups split tied points 50/50 | Gap |
| Junk / side bets | Not supported | Common additions to Scotch | Gap (separate game concern) |
| Nassau integration | Not supported | Some groups overlay front-9/back-9 bets on Scotch | Gap |
| Individual low ball | Not applicable (always team) | Some 4-player variants use individual | N/A (different game) |

### Summary Table

| Metric | Value |
|--------|-------|
| Engine config fields | 14 (12 used by calculator, 2 setup-only) |
| UI config controls | 12 (11 functional, 1 broken: maxMultiplier) |
| Category evaluators | 5 (lowBall, lowTotal, highBall, prox, birdie) |
| Total test cases | ~118 |
| Property-based test cases | 18 (fast-check) |
| Zero-sum verification points | 9 (across 4 files) |
| Confirmed bugs | 3 (1 medium, 1 low, 1 cosmetic) |
| Dead code items | 3 (getEvaluator(), useHighBall post-setup, adapter status ternary) |
| Missing real-world features | 6 (carryover, press, split-ties, custom points, 7-point, segment) |
| Files in Scotch module | 7 source + 4 test = 11 |
| Lines of engine code | ~1,320 (source + tests) |
