# Quota (Chicago) — Raw Claude Code Audit Output

**Date:** March 1, 2026
**Source:** Claude Code feature audit of Quota game engine in Stick app repo

---

## 1. Configuration Fields

| Field | Type | Allowed Values | Default | Notes |
|-------|------|---------------|---------|-------|
| type | string literal | 'quota' | 'quota' | Discriminator |
| playerIds | string[] | Any player IDs | Set at round creation | Required |
| quotaBase | 36 \| 39 | 36 or 39 | 36 | 36 = standard, 39 = Chicago variant |
| stakePerPoint | number | Integer cents (1-99900) | UI default from setup | Per-point-of-differential pairwise. $1.00 = 100 |
| eaglePoints | 6 \| 8 | 6 or 8 | 8 | Points for eagle or better. 8 = standard, 6 = modified (flatter scale) |
| tripleBogeyOrWorsePoints | 0 \| -1 | 0 or -1 | 0 | 0 = no penalty (standard), -1 = penalty mode |
| scoringMode | 'gross' | Only 'gross' | 'gross' | Always gross. Handicap is baked into the quota target, never applied per-hole. This field exists for interface consistency. |

UI config form exposes: Stake per point (dollar input, converted to cents), Quota base (segmented control: Standard 36 / Chicago 39), Eagle points (segmented control: 8 standard / 6), Triple bogey penalty (toggle in Advanced section).

What's NOT configurable (V1): Birdie (4), Par (2), Bogey (1), Double Bogey (0) point values are hardcoded. The `QuotaPointValues` interface and `getPointValues()` function are explicitly designed to support future custom point scales without refactoring — the comment says "a future 'custom point values' feature simply passes a different PointValues object."

## 2. Point System

Standard point scale (hardcoded middle, configurable extremes):

| Score vs Par | Relative | Points (Standard) | Points (Modified Eagle) | Points (Penalty Mode) |
|---|---|---|---|---|
| Albatross or better | ≤ -3 | 8 | 6 | 8 |
| Eagle | -2 | 8 | 6 | 8 |
| Birdie | -1 | 4 | 4 | 4 |
| Par | 0 | 2 | 2 | 2 |
| Bogey | +1 | 1 | 1 | 1 |
| Double Bogey | +2 | 0 | 0 | 0 |
| Triple Bogey or worse | ≥ +3 | 0 | 0 | -1 |

How it works:
- `getPointsForScore(gross, par, pointValues)` computes `relativeToPar = gross - par`, then does a bracket lookup
- Points are based on gross score only — no handicap strokes applied per hole
- Albatross, double-albatross, etc. all collapse into the `eagleOrBetter` bucket (≤ -2)
- Triple bogey, quadruple bogey, etc. all collapse into `tripleBogeyOrWorse` (≥ +3)
- The point lookup is par-aware — a gross 3 on a par 5 is an eagle (8 pts), but on a par 4 it's a birdie (4 pts)
- Points can be negative only in penalty mode (`tripleBogeyOrWorsePoints = -1`)

Property test verified: Points are always in range [-1, 8]. Better gross score always yields ≥ points (monotonically non-increasing). 500 random iterations per property.

## 3. Quota/Target Calculation

Formula: `quota = quotaBase - courseHandicap`

- Uses `player.courseHandicap` (not handicapIndex or playingHandicap)
- `quotaBase` is 36 (standard) or 39 (Chicago variant)
- Calculated once at round start from the player array — not recalculated mid-round
- Cannot be manually overridden — always derived from handicap
- Negative quotas are valid and handled: A 40-handicap player with base 36 gets quota = -4. This means they "beat quota" if they earn any points at all. The math works identically (`differential = totalPoints - (-4) = totalPoints + 4`)
- Scratch player (0 handicap): quota = 36 (or 39). They need 36+ points to beat quota. On standard 18-hole par 72, all pars on par-72 = exactly 36 points = exactly hitting quota.
- No-handicap player: Engine uses whatever `courseHandicap` is set to. If 0, they get a scratch quota. There's no special "no handicap" handling — the UI/setup layer is responsible for setting a valid courseHandicap.

Property test verified: Quota is always an integer. Always equals `quotaBase - courseHandicap`. 200 random iterations.

## 4. Settlement

**Model: Pairwise Differential**

Every pair of players settles independently based on the difference in their differentials:

```
For each pair (i, j) where i < j:
  pointGap = |differential_i - differential_j|
  amountCents = pointGap × stakePerPoint
  Higher differential player wins that amount from the lower
  If equal → push (no transaction)
```

Example from test (matching rules doc):
- Marcus: +3 differential, Sarah: +2, Dev: -2, Pam: -3
- $2/point stake
- Marcus vs Sarah: 1 pt gap = $2 (Sarah pays Marcus)
- Marcus vs Dev: 5 pt gap = $10 (Dev pays Marcus)
- Marcus vs Pam: 6 pt gap = $12 (Pam pays Marcus)
- Sarah vs Dev: 4 pt gap = $8 (Dev pays Sarah)
- Sarah vs Pam: 5 pt gap = $10 (Pam pays Sarah)
- Dev vs Pam: 1 pt gap = $2 (Pam pays Dev)
- Net: Marcus +$24, Sarah +$16, Dev -$16, Pam -$24 = $0

**Zero-sum guarantee:**
- Every transaction is a direct transfer (one gains, one loses the same amount). No money pool, no rounding.
- All arithmetic in integer cents using `toCents()`, `toDollars()`, `Cents` branded type from `currency.ts`
- `isZeroSum` flag checked against `SETTLEMENT_TOLERANCE_CENTS`
- Property tests verify zero-sum for 2, 3, and 4 players with 200 random iterations each
- Additional property tests verify: `totalWon == totalLost` across all players, all transactions have positive amounts, `playerResults` order matches standings order

No other settlement models are supported. Only pairwise differential. The Convex validators reference a future "pool" settlement type but it's not implemented. The current engine is pairwise-only.

## 5. Handicap Support

**Key design decision: Handicap is baked into the quota target, NOT applied per-hole.**

- `scoringMode` is always `'gross'` — this is enforced at the type level
- Points are always calculated from gross score vs par
- A 20-handicap player shooting gross bogey on any hole gets 1 point, period. No stroke adjustment.
- The handicap fairness comes entirely from the quota formula: a 20-handicap has quota 16 (36-20), while a scratch player has quota 36. The higher-handicap player has a much easier target to beat.
- No per-hole stroke interaction — `strokeHoles` from the Player type is unused by the Quota engine
- This is the standard real-world Quota/Chicago approach

## 6. Player Count

| Constraint | Value |
|---|---|
| Minimum | 2 (enforced by engine: throws error) |
| Maximum | No maximum (no `maxPlayers` set in `GAME_REQUIREMENTS`) |
| UI enforcement | `minPlayers: 2`, no `exactPlayers` restriction |

Scalability notes from code comments:
- Calculator comment (line 9): "Accepts any number of players — the engine is not capped at 2-4 so a future Events feature can pass 30+ players through the same function."
- The calculator is a simple O(players × holes) loop — no quadratic or exponential behavior in calculation
- Settlement is O(players²) for pairwise comparisons — for 30 players that's 435 pairs, which is trivial
- No code-level maximum exists. The engine will happily process 100+ players.

## 7. Scoring Variants

**Currently supported:**
- Standard point scale (8-4-2-1-0-0) via `eaglePoints: 8`, `tripleBogeyOrWorsePoints: 0`
- Modified eagle (6-4-2-1-0-0) via `eaglePoints: 6`
- Triple bogey penalty mode (8-4-2-1-0-(-1)) via `tripleBogeyOrWorsePoints: -1`
- Combined: modified eagle + penalty (6-4-2-1-0-(-1))

**NOT supported (but architected for):**
- Full Modified Stableford (e.g., 5-2-0-(-1)-(-3)) — The `QuotaPointValues` interface supports arbitrary values for all 6 brackets, but the config only exposes 2 knobs (`eaglePoints` and `tripleBogeyOrWorsePoints`). Birdie/par/bogey/double are hardcoded at 4/2/1/0.
- Double points on par 3s/5s — Not supported, no mechanism
- Bonus points for achievements (chip-ins, longest drive) — Not supported
- Different full scales (8-5-3-1-0) — Not supported in V1, but `QuotaPointValues` interface is ready
- "Wipe out" rule — Not supported as a named feature, but penalty mode (-1 for triple+) is similar in spirit
- Chicago variant (39-base) — Supported via `quotaBase: 39`

## 8. Leaderboard and Ranking

**Ranking method:** Players ranked by differential (`totalPoints - quota`), highest first.

**Tie handling:** Tied players share the same rank number. Standard competition ranking (1, 1, 3 — not 1, 1, 2).

**Running leaderboard:** Yes — standings array is recalculated on every engine pass as scores come in. The `QuotaPlayerStanding` object always has current `totalPoints`, `differential`, and `rank`.

**Mid-round display:**
- Scorecard header: `getQuotaStatus()` shows the leader's initials and gap from second place (e.g., "MA +3") or "Tied"
- Viewer perspective: `getQuotaStatusForViewer()` shows:
  - If viewer is leading: "+5 · +3 lead" (green badge)
  - If viewer is tied for lead: "+5 · Tied" (neutral)
  - If viewer is behind: "-2 · 7 back" (neutral, or red if last place)
  - Before any holes played: "Quota: 0" (neutral)
- Per-hole point breakdown: `getQuotaYourResults()` returns per-hole points with color coding:
  - 4+ points = green (birdie or better)
  - 1-3 points = neutral (par or bogey)
  - 0 or negative = red (double bogey or worse)

**Scorecard result rows:** One row per player showing per-hole points earned (label: "[Name] PTS", short label: initials).

## 9. Edge Cases

| Edge Case | Behavior |
|---|---|
| Missing score (player picks up) | Hole is skipped entirely — all players must have a score for the hole to be processed. The hole simply doesn't appear in `holes[]`. This means a "pick up" acts like the hole never happened. |
| Score correction mid-round | Fully supported by recalculation. Engine is stateless — recalculating with corrected scores produces correct state. No stored intermediate state to corrupt. |
| Very high handicap (30+) | Works correctly. Quota = 36 - 40 = -4. Differential = totalPoints - (-4) = totalPoints + 4. Even 0 points yields differential +4. |
| Handicap > quotaBase | Negative quota. Fully tested (quota.test.ts line 409-435). |
| Scratch player (0 handicap) | Quota = 36 (or 39). All pars on par-72 = exactly 36 points = differential 0. Tested. |
| Partial round (9 holes) | Engine processes whatever holes have complete scores. `isComplete` stays false, `holesRemaining` reflects remaining holes. Settlement can still be calculated on incomplete state. |
| Mixed par holes (3/4/5) | Fully supported — `getPointsForScore()` is par-aware. Tested with mixed par holes (quota.test.ts line 554-579). |
| Par 6 | Would work — it's just `gross - par` for the bracket lookup. Not explicitly tested but the math is generic. |
| All players tie | Zero transactions, everyone nets $0. Tested. |
| All players earn 0 points | Handled — differential = 0 - quota = negative number. Tested. |
| Only 1 player has score on a hole | Hole skipped (requires all players to have scores). Tested (quota.test.ts line 501-521). |

## 10. Test Coverage

| Test File | Tests | Lines | Focus |
|---|---|---|---|
| quota.test.ts | ~40 unit tests | 1,022 | Point lookup, quota formula, calculator, settlement, rules doc examples |
| quota.properties.test.ts | 12 property tests | 542 | Zero-sum (2/3/4 players), point range invariants, monotonicity, standings sort, quota formula, totalWon==totalLost |
| whatHappened.test.ts | ~15 tests | 336 | Null returns, extraction, topPointsEarned, eagle/birdie flags, lead change detection, standings snapshots |

Total: ~67 dedicated tests across 3 files (~1,900 lines of test code).

**Property test iterations:**
- Point range invariant: 500 runs
- Monotonicity invariant: 500 runs
- Quota formula: 200 runs
- Standings length: 100 runs
- Holes played + remaining = total: 100 runs
- Differential = totalPoints - quota: 100 runs
- Standings sorted descending: 100 runs
- Zero-sum (2 players): 200 runs
- Zero-sum (3 players): 200 runs
- Zero-sum (4 players): 200 runs
- isZeroSum flag always true: 200 runs
- totalWon == totalLost: 200 runs
- All transactions positive: 200 runs
- playerResults matches standings order: 100 runs

**Key verified invariants:**
1. Settlement is exactly zero-sum for any number of players
2. Points always in [-1, 8]
3. Better score → more or equal points (monotonically non-increasing)
4. Quotas always integers
5. Differential always equals totalPoints - quota
6. Standings always sorted by differential descending

## 11. Architecture

- **Pure functional:** `calculateQuotaState()` is `(config, players, holeScores, holes) → QuotaState`. No side effects, no mutation.
- **Stateless:** Same inputs always produce same output. Engine recalculates from scratch every time.
- **Score correction:** Transparent — just recalculate with corrected scores. No intermediate state to worry about.
- **Shared modules:** Uses `currency.ts` (`toCents`, `toDollars`, `SETTLEMENT_TOLERANCE_CENTS`, `Cents` branded type). Uses shared `StatusBadge` type from `games/shared/results`. Does NOT use shared settlement, press, or hammer modules (Quota is simpler than team games).
- **Extensibility hooks in code:**
  - `QuotaPointValues` interface supports arbitrary point values for all 6 brackets
  - `getPointValues()` derives the map from config — future custom scales just need new config fields
  - Calculator comment explicitly references "future Events feature" for 30+ players
  - No per-hole stroke adjustments = simpler scaling
- **Known limitations:** None documented. No TODOs in the code.
- **No Events-specific code yet:** No cross-group aggregation, no tournament fields, no multi-group leaderboard logic. The engine is ready to be called with large player counts, but the orchestration layer doesn't exist.

## 12. UI Integration

**Fully wired delivery chain:**
1. Engine → `calculateQuota()` exported from `games/index.ts`
2. Hook → `useGameEngines.ts` calculates `quotaState` from `quotaGame` config
3. Context → `GameEngineContext` provides `quotaState` and `quotaGame`
4. Scorecard → `Scorecard.tsx` renders: Game section header with "Quota" title, Subtitle showing stake (e.g., "$1.00/pt"), Status badge from `getQuotaStatusForViewer()`, Result rows showing per-player per-hole points
5. SummaryTab → Displays quota results via `extractQuotaCard()`, showing differential with sign and lead/back context
6. Config form → `QuotaConfigForm.tsx` with stake, quota base, eagle points, triple bogey penalty
7. Info sheet → `GameInfoSheet.tsx` has full Quota section (How It Works, Points Per Hole, Settlement, Options)
8. Game metadata → `gameInfo.ts`: emoji "🏹", name "Quota", description "Beat your personal points target"
9. Narratives → `generateQuotaMoment()` produces "What Happened" messages with per-player point breakdowns, quota progress, and lead change detection

**Selectors available:**
- `getQuotaStandings(state)` — full standings array
- `getQuotaPlayerStanding(state, playerId)` — single player
- `getQuotaLeader(state)` — current leader
- `hasBeatenQuota(state, playerId)` — boolean
- `getQuotaStatus(state)` — game-level badge
- `getQuotaStatusForViewer(state, viewerId)` — viewer-perspective badge
- `getQuotaYourResults(state, viewerId)` — per-hole points with color coding
- `getQuotaHoleResult(state, holeNumber)` — single hole result
- `getQuotaPlayerHolePoints(state, holeNumber, playerId)` — single player's points on a hole
- `isQuotaComplete(state)` — completion check
- `getQuotaHolesRemaining(state)` — remaining holes

## 13. Events Readiness

**What's ready:**
- Engine accepts any number of players ≥ 2 — no maximum cap
- Calculator is O(players × holes) — handles 30+ players trivially
- Settlement is O(players²) — 30 players = 435 pairs, still fast
- No per-hole stroke adjustments simplifies multi-group aggregation (gross scores are universal)
- `GAME_REQUIREMENTS` has no `maxPlayers` for Quota — UI won't block large groups
- Pairwise settlement works across any player count without pooling logic

**What's NOT ready (would need to be built):**
- No cross-group aggregation logic — Each Quota instance is a single round with a single player array. For multi-group tournaments (e.g., 7 foursomes = 28 players), there's no code to aggregate results from separate round instances into a unified leaderboard.
- No tournament/event fields in config — No `eventId`, `groupId`, or `flightId` on `QuotaConfig`
- No multi-round support — No mechanism to carry points or differentials across rounds
- No flight/division support — No ability to split players into handicap flights within a single event
- No code comments or TODOs referencing Events — Only the calculator header mentions "a future Events feature" as design rationale for uncapped player count
- Settlement across groups: If 28 players from 7 groups settle pairwise, that's 378 pairs. The engine math handles this, but there's no UI or orchestration to collect scores from separate round instances into a single QuotaState.

**What would need to change for multi-group leaderboards:**
1. A new layer above the round level to aggregate scores from multiple round instances
2. A way to construct a "virtual" QuotaState from cross-group scores
3. Tournament configuration (format, flights, tiebreakers)
4. A leaderboard UI component that shows all players across groups
5. Settlement would need to be run on the aggregated state, not per-group

The engine itself is ready — the orchestration and UI layers need to be built.

## Summary Statistics

- Engine implementation: 6 files, ~850 lines of code
- Test code: 3 files, ~1,900 lines, ~67 tests, 14 property-based invariant checks (totaling ~3,200 random iterations)
- UI integration: Fully wired from engine through adapter/selectors to scorecard, summary, config form, info sheet, and narrative generator
- Settlement model: Pairwise differential only (zero-sum verified)
- Point system: 6 brackets, 2 configurable knobs (eagle points, triple bogey penalty), 4 hardcoded values (birdie=4, par=2, bogey=1, double=0), extensible via QuotaPointValues interface
- Player count: 2 to unlimited (Events-ready at engine level)
- Handicap approach: Gross scoring only, handicap baked into quota target
