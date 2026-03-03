# Split Sixes — Raw Claude Code Audit Output

**Date:** March 1, 2026
**Source:** Claude Code feature audit of Split Sixes game engine in Stick app repo

---

## 1. Configuration Fields

The engine config (`SplitSixesConfig` in `src/engine/src/games/splitSixes/types.ts`) has these fields:

| Field | Type | Default | Notes |
|-------|------|---------|-------|
| gameType | 'splitSixes' (literal) | 'splitSixes' | Discriminator for type guards |
| dollarPerPoint | number | 1 | Dollar amount won/lost per point differential. Must be > 0. |
| scoringMode | 'net' \| 'gross' | 'net' | Net uses handicap strokes off low man; gross ignores handicaps |
| blitzEnabled | boolean | false | If true, beating BOTH opponents by 2+ strokes sweeps all 6 points |
| birdieDoubleEnabled | boolean | false | If true, all points on a hole are doubled (6 becomes 12) when any player makes birdie |
| structure | '18hole' \| 'nassau' | '18hole' | 18-hole settles on total; Nassau settles front/back/overall separately |
| frontAmount | number (optional) | undefined | Nassau front 9 dollar rate. Falls back to dollarPerPoint if unset. Must be > 0 if set. |
| backAmount | number (optional) | undefined | Nassau back 9 dollar rate. Same fallback. |
| overallAmount | number (optional) | undefined | Nassau overall dollar rate. Same fallback. |

UI config (`src/types/setup.ts`) differs slightly — it uses `handicapsEnabled: boolean` (maps to engine `scoringMode: 'net'|'gross'`) and `playerIds: string[]`. It does NOT expose the Nassau structure toggle or the `frontAmount/backAmount/overallAmount` fields in the config form.

Config form (`SplitSixesConfigForm.tsx`) exposes:
- Point Value ($) — dollarPerPoint
- Handicaps toggle — handicapsEnabled
- Blitz toggle — blitzEnabled
- Birdie Double toggle (under "Advanced") — birdieDoubleEnabled

Not exposed in UI: Nassau structure, front/back/overall amounts. The engine supports it but the config form hardcodes `structure: '18hole'`.

## 2. Point Distribution System

Split Sixes delegates entirely to the Nine Point engine with `pointSystem: '4-2-0'`. The point distribution is defined in `src/engine/src/games/shared/types.ts`:

```
SPLIT_SIXES = { points: [4, 2, 0], totalPerHole: 6 }
```

The distribution per hole:

| Scenario | Best | Middle | Worst | Total |
|----------|------|--------|-------|-------|
| All different scores | 4 | 2 | 0 | 6 |
| Two tied for best | 3 | 3 | 0 | 6 |
| Two tied for worst | 4 | 1 | 1 | 6 |
| Three-way tie | 2 | 2 | 2 | 6 |
| Blitz (enabled, 2+ margin over both) | 6 | 0 | 0 | 6 |
| Birdie double (any birdie) | 8 | 4 | 0 | 12 |
| Blitz + Birdie double | 12 | 0 | 0 | 12 |

The 6-point total always holds (or 12 with birdie double). This is verified by property tests across 50 random iterations of full 18-hole rounds. There is no mechanism for points to be lost or created.

## 3. Tie Handling in Detail

Tie logic is in `src/engine/src/games/shared/pointDistribution.ts` and `relativeRanking.ts`.

- **Two tied for low (best):** Split positions 1+2 evenly → (4+2)/2 = 3 each. Third player gets 0. Result: **3-3-0**. This is the "split the top two prizes" approach.
- **Two tied for high (worst):** Winner gets 4 (position 1 untouched). Tied players split positions 2+3 → (2+0)/2 = 1 each. Result: **4-1-1**.
- **Three-way tie:** All three split equally → 6/3 = 2 each. Result: **2-2-2**.

None of this is configurable. The tie resolution is hardcoded in the shared `distributePoints` function. There is no toggle to switch between "3-3-0" vs "3-2-1" for the low tie scenario. The engine always uses the "split the prize pool for tied positions" approach.

Ranking logic (`relativeRanking.ts`): Players are sorted by net score ascending (lowest = best). Ties are detected by comparing adjacent scores. The `TieType` enum has four values: `'none'`, `'low'`, `'high'`, `'three-way'`.

## 4. Handicap Support

- **Net mode** (`scoringMode: 'net'`): Uses "off low man" calculation. The player with the lowest courseHandicap plays scratch (0 strokes). All other players receive `courseHandicap - lowestCourseHandicap` strokes.
- **Gross mode** (`scoringMode: 'gross'`): All players get 0 playing strokes. Pure scratch scoring.
- **Stroke allocation:** Strokes are distributed by hole stroke index (SI 1 = hardest hole gets first stroke). If a player has >18 strokes, a second pass occurs (so SI-1 gets 2 strokes, etc.).
- **Net score calculation:** `grossScore - strokesOnThisHole`. Simple subtraction per hole.
- **No partial handicap percentages.** There is no `handicapAllowance` field (50%, 80%, etc.). It's full strokes or none. The engine takes `courseHandicap` directly — any percentage reduction would need to happen upstream before the engine receives it.
- **Birdie double with net scoring:** The birdie check is `netScore < holePar`, so a net birdie (after handicap strokes) triggers the double even if the gross score isn't a birdie.

## 5. Settlement

Settlement uses pairwise differential via the shared `calculateThreeWaySettlement` function (`src/engine/src/games/shared/threeWaySettlement.ts`).

How it works:
1. After all holes, each player has a total point count
2. Each pair of players settles independently based on point differential
3. The player with more points in each pair receives `(pointDiff × dollarPerPoint)` from the other

**Sample math — 18 holes, $2/point:**
- Alice: 72 points (won every hole with 4 pts)
- Bob: 36 points (always middle with 2 pts)
- Carol: 0 points (always worst with 0 pts)

Pairwise:
- Alice vs Bob: 72 - 36 = 36 pts × $2 = Bob pays Alice $72
- Alice vs Carol: 72 - 0 = 72 pts × $2 = Carol pays Alice $144
- Bob vs Carol: 36 - 0 = 36 pts × $2 = Carol pays Bob $72

Net: Alice +$216, Bob $0, Carol -$216. Zero-sum verified.

**Nassau structure:** If `structure: 'nassau'`, settlement happens three times (front 9, back 9, overall) with potentially different dollar amounts. Results are aggregated using cents-based arithmetic.

**Integer cent arithmetic:** Yes. All settlement calculations use the `currency.ts` module internally:
- `toCents()` converts dollar amounts to integer cents
- `multiplyCents()` for point × rate calculations
- `toDollars()` only at the output boundary
- Zero-sum verification uses `SETTLEMENT_TOLERANCE_CENTS = 1` (max 1 cent deviation)

## 6. Player Count

- **Locked to exactly 3 players.** The `GAME_REQUIREMENTS` in `src/constants/gameRequirements.ts` specifies `exactPlayers: [3]`.
- The UI's `isGameAvailable('splitSixes', playerCount)` blocks adding the game unless exactly 3 players are in the round.
- The engine function signature is typed as `players: [Player, Player, Player]` (3-tuple).
- **What happens with wrong player count:** The engine-level calculator doesn't validate player count itself — it receives whatever it gets. However:
  - With 2 players: the ranking system expects 3 scores per hole; only 2 found means `allPlayersScored` check fails and holes are skipped. State would show 0 holes played.
  - With 4+ players: only the first 3 scores per hole would be used (since `calculateRelativeRanking` takes a 3-tuple). The 4th player would be invisible.
  - The UI prevents both scenarios via the `exactPlayers: [3]` requirement.

## 7. Variations & Special Rules

**Implemented:**

| Variation | Config Field | Behavior |
|-----------|-------------|----------|
| Blitz | blitzEnabled | Winner must beat BOTH opponents by 2+ strokes. Takes all 6 points (or 12 with birdie double). Ties prevent blitz. |
| Birdie Double | birdieDoubleEnabled | If ANY player's net score is below par, all points on the hole are doubled (6→12). Both blitz and non-blitz holes can be doubled. |
| Nassau structure | structure: 'nassau' | Split settlement into front 9 / back 9 / overall, each with configurable dollar amounts. Engine supports it; UI does not expose it. |

**NOT implemented (from research list):**
- **Junk/bonus points** (extra point for birdies, eagles, chip-ins on top of the 6): Not supported. No mechanism for adding bonus points beyond the base distribution.
- **Double points on par-3s:** Not supported. No par-based multiplier system.
- **"Nasty" rule** (0 points = extra penalty): Not supported. Getting 0 has no additional consequence.
- **Point carry on ties** (three-way tie carries points to next hole): Not supported. Points are always distributed on every hole. Three-way ties give 2-2-2 immediately — no carryover.
- **Alternative base distributions** (5-3-1, 6-3-0, etc.): The Nine Point engine supports '5-3-1' and '4-2-0' as point systems, but Split Sixes is hardcoded to '4-2-0'. Adding other distributions (like 6-3-0) would require adding a new entry to POINT_SYSTEMS.

## 8. Edge Cases

- **Missing scores:** If a player has no score on a hole, the calculator skips that hole entirely (`if (holeScores.length < 3) continue`). No partial point distribution. The hole simply doesn't appear in results.
- **Score corrections:** The engine is stateless and pure functional — recalculated from scratch every time scores change. Correcting a score on hole 5 will recalculate ALL 18 holes from scratch. No stale state.
- **Missing hole data:** If courseHoles doesn't contain a hole, that hole is skipped (`if (!holeData) continue`).
- **Hole 18 specific logic:** None. There is no final-hole special rule, no carryover resolution, no "double or nothing" on the last hole.
- **Birdie double edge case — fractional points from ties:** With birdie double on a three-way tie: `(6/3) × 2 = 4` points each. Total = 12. Still whole numbers. With birdie double on a low tie: `((4+2)/2) × 2 = 6` each, worst gets 0. Total = 12. Still clean.
- **Blitz + tie:** Blitz requires `tieType === 'none'`. Any tie prevents blitz, even with blitz enabled.

## 9. Test Coverage

**Dedicated test files: 2 files**

1. `splitSixes.test.ts` — 22 tests covering:
   - toNinePointConfig conversion (sets pointSystem: '4-2-0', preserves all fields)
   - Calculator basics (valid state, 6 points/hole, 4-2-0 distribution, complete after 18 holes, total = 108)
   - Type guard (isSplitSixesConfig — true for splitSixes, false for ninePoint, null, undefined)
   - Config validation (valid, zero dollarPerPoint, negative nassau amounts, default config)

2. `splitSixes.properties.test.ts` — 3 property-based tests (fast-check), plus 15 unit tests:
   - **Unit tests:** 4-2-0 distribution (4 scenarios: clear winner, low tie, high tie, three-way tie), blitz (3 tests: enabled+triggered, not triggered at margin 1, disabled), birdie double (3 tests: doubled, no birdie, disabled), settlement (3 tests: from differentials, zero-sum varied, all-tied=zero), partial round (3 tests: 9 holes, partial zero-sum, single hole), nassau structure (1 test), net scoring (2 tests: strokes change distribution, net settlement zero-sum)
   - **Property tests:** 50 random iterations each for:
     - Settlement is always zero-sum
     - Each hole distributes exactly 6 points
     - Total points after 18 holes = 108

**What they verify:**
- 6-point conservation per hole (unit + property)
- 108-point conservation per round (unit + property)
- Zero-sum settlement (unit + property, 50 random rounds)
- Correct tie distribution for all 4 tie types
- Blitz triggering logic (margin thresholds, enabled/disabled)
- Birdie double logic (birdie detected, not doubled without birdie, not doubled when disabled)
- Net scoring changes point distribution
- Partial round handling

## 10. Architecture

- **Pure functional and stateless.** `calculateSplitSixesState()` takes `(config, players, scores, courseHoles)` and returns a full `SplitSixesState`. No mutable state, no side effects.
- **Complete delegation to Nine Point engine.** Split Sixes is a thin wrapper:
  - `calculator.ts` → converts `SplitSixesConfig` to `NinePointConfig` with `pointSystem: '4-2-0'`, calls `calculateNinePointState()`
  - `settlement.ts` → re-exports `calculateNinePointSettlement`
  - `selectors.ts` → re-exports all Nine Point selectors under Split Sixes names
  - `whatHappened.ts` → re-exports `generateNinePointImpact`
  - `types.ts` → `SplitSixesState = NinePointState` (type alias)
- **Shared modules used:**
  - `shared/pointDistribution.ts` — point distribution with tie splitting
  - `shared/relativeRanking.ts` — 3-player ranking with tie detection
  - `shared/threeWaySettlement.ts` — pairwise differential settlement in cents
  - `currency.ts` — integer cent arithmetic
- **Score correction:** Fully supported by architecture. State is recalculated from scratch on every score change. No "patch" or "delta" system.
- **No TODOs or incomplete features** in the Split Sixes code. The Nine Point calculator has one informal comment (`// Usually gameId comes from the Game instance`) but nothing actionable.
- **Known architectural note:** The `state.config` inside the returned `SplitSixesState` will be a `NinePointConfig` (since it's set by the Nine Point calculator), not a `SplitSixesConfig`. This is a consequence of the delegation pattern — the engine doesn't "rebrand" the config back after calculation.

## 11. UI Integration

**Delivery chain verified:**
1. Engine → `calculateSplitSixes` exported from `src/engine/src/games/index.ts`
2. Hook → `useGameEngines.ts` imports and calls `calculateSplitSixes`, stores result in `splitSixesState`
3. Context → `GameEngineContext` exposes `splitSixesState` and `splitSixesGame`
4. Scorecard → `Scorecard.tsx` renders a `GameSection` for Split Sixes with:
   - Title: "Split Sixes"
   - Subtitle: `$X/pt` from config
   - Status badge: viewer-perspective from `selectSplitSixesStatusForViewer`
   - Result rows: one row per player showing their points per hole via `selectSplitSixesPlayerPointResults`
5. Summary → `SummaryTab.tsx` renders Split Sixes status with points hero card
6. Config form → `SplitSixesConfigForm.tsx` — functional with all toggles wired
7. Info sheet → `GameInfoSheet.tsx` has a full Split Sixes section (how it works, points, ties, bonus rules, settlement, options)
8. Game selection → `GameSelectionSection.tsx` has `addSplitSixes()` with player count validation

**Selectors available (re-exported from Nine Point):**
- `selectSplitSixesHoleResults` — "A/B/C" string per hole
- `selectSplitSixesPlayerPointResults` — per-player per-hole points (used in scorecard)
- `selectSplitSixesStatus` — leader badge (initials + gap or "Tied")
- `selectSplitSixesYourResults` — viewer's per-hole results with positive/neutral/negative typing
- `selectSplitSixesYourTotal` — viewer's total points
- `selectSplitSixesYourRank` — viewer's rank (1, 2, or 3)
- `selectSplitSixesStatusForViewer` — viewer badge ("You: X pts + N lead" / "N back" / "Tied")

**Adapter** (`src/adapters/splitSixes.ts`): Type-only re-exports from the Nine Point adapter. No logic transformation needed since `SplitSixesState === NinePointState`.

**No display bugs identified in the audit.** The scorecard shows per-player point rows (like Nine Point), not a combined "A/B/C" row.

## Feature Gaps vs. Real-World Play

| Feature | Stick Status | Real-World Common? |
|---------|-------------|-------------------|
| 4-2-0 base distribution | Implemented | Standard |
| Tie splitting (3-3-0, 4-1-1, 2-2-2) | Implemented | Standard |
| Pairwise settlement | Implemented | Standard |
| Net scoring (off low man) | Implemented | Very common |
| Blitz (sweep all 6 on big win) | Implemented | Common |
| Birdie double | Implemented | Common |
| Nassau structure | Engine only (no UI) | Uncommon for Split Sixes |
| Junk/bonus points | Not implemented | Somewhat common |
| Point carry on three-way tie | Not implemented | Uncommon |
| "Nasty" penalty for 0 points | Not implemented | Uncommon |
| Double points on par-3s | Not implemented | Rare |
| Alternative base distributions (5-3-1, 6-3-0) | Not implemented (5-3-1 is Nine Point) | 5-3-1 is its own game |
| Partial handicap allowance (50%, 80%) | Not implemented | Sometimes used |
| Configurable tie resolution | Not implemented | Rare |
| Last hole double-or-nothing | Not implemented | Rare |
