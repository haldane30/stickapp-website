# Sixes — Three-List Gap Analysis

**Date:** March 1, 2026
**Inputs:** Original game doc (Sixes rules v1) → Claude Code feature audit (71 tests) → Web research (18 sources)

---

## Important Note: This Audit Covers 4-Player Sixes ONLY

The Stick app's Sixes engine is the **4-player rotating partnership** version (Hollywood / Round Robin). The 3-player point-distribution game (Split Sixes) is a **separate game** in Stick's codebase. This audit covers only the 4-player engine. Split Sixes has its own game entry in the tracker and will need its own audit when the time comes.

---

## List 1: Stick Does This (Highlight in Guide)

These are confirmed, tested features the guide can confidently promote.

### Core Mechanics
1. **Three 6-hole matches with rotating partnerships** — [A,B] vs [C,D], [A,C] vs [B,D], [A,D] vs [B,C]. Every player partners with every other player exactly once. Property-tested.
2. **Best-ball match play scoring** — Each team's lowest net score compared per hole. Lower wins. Equal = halved. This is the standard format golfers expect.
3. **Match status tracking** — Running integer (+N/-N) with "2 UP", "1 DOWN", "AS" display. Dormie detection.
4. **Early closeout** — Match ends when lead exceeds remaining holes (e.g., "3 & 2"). Properly detected and reported.
5. **Configurable bet per match** — `betPerMatch` field, default $10, validated > 0.
6. **Fisher-Yates shuffle** — UI button randomizes player order before the round starts, which changes partnership assignments. Replaces manual "who's with who" negotiation.

### Handicap System
7. **Net and gross scoring modes** — `scoringMode: 'net' | 'gross'`, default net.
8. **Off-low-man calculation** — Lowest courseHandicap becomes scratch, others get difference × allowance percentage. Standard approach golfers expect.
9. **Handicap allowance percentage** — Engine supports 0–100% (e.g., 90%, 80%). Default 100%.
10. **Stroke allocation by stroke index** — Strokes distributed hardest-holes-first, wraps for handicaps > 18. Tested with 36-handicap player.

### Press Mechanics
11. **Auto-press** — Fires when trailing by configurable threshold (default 2 holes down). Creates new sub-match from next hole through end of 6-hole segment.
12. **Press bet amount** — `pressAmount: 'same' | 'half'` relative to match bet.
13. **Max presses per match** — `maxPressesPerMatch` caps total presses. null = unlimited.
14. **Press deduplication** — No duplicate presses on the same starting hole.
15. **Press completion and settlement** — Each press resolves independently with its own winner/loser and payout.

### Settlement
16. **Pairwise settlement** — Each losing player pays each winning player the match bet. Won = +$20 from 2 opponents (at $10/match). Lost = -$20 to 2 opponents. Halved = $0.
17. **Zero-sum verification** — Property-tested with 100 random iterations. Sum of all netResults within 1 cent tolerance.
18. **Integer cent arithmetic** — Uses `toCents()`/`toDollars()` from shared currency module. No floating-point drift.
19. **Line-item transaction breakdown** — `transactions[]` with `{ from, to, amount, reason }` for every payment.

### Robustness
20. **Pure functional, stateless** — Full recalculation from scores on every call. Score corrections ripple correctly.
21. **Incomplete hole handling** — If < 4 scores for a hole, it's skipped (no crash, no partial result).
22. **Extra player filtering** — 5th player scores ignored gracefully (tested with "zombie scorer").
23. **71 dedicated tests** — 44 unit tests + 25 property-based invariants + 2 regression tests.

---

## List 2: Common Variations (Document Educationally, Don't Claim Stick Does These)

These are things golfers do in the wild that Stick's V1 engine doesn't support. Mention them in the guide's "Variations" section as educational content.

### Pressing
1. **Manual presses** — Very common in casual match play. The losing team verbally declares a press on any hole. Stick only supports auto-press (fires at threshold). `storedPresses` is typed but the calculator never reads it. **Mention:** "Many groups prefer manual presses where you declare 'I'm pressing' on any hole. Stick uses automatic presses that trigger when you're down by a set number of holes."

### Scoring Alternatives
2. **Stroke play within segments** — Some groups use total combined strokes per 6-hole block instead of hole-by-hole match play. `scoringMethod: 'bestBall'` is hardcoded. **Mention as variation, don't claim support.**
3. **Stableford scoring** — Rare in Sixes but some groups use it. Not supported.
4. **Both scores count** — Instead of best-ball, both players' scores matter per hole. Changes the dynamic. Not supported.

### Betting Variations
5. **Nassau-style Sixes** — Each 6-hole segment subdivided into front-3, back-3, overall-6 (like a mini-Nassau). Creates 9 bets instead of 3. Popular in serious money games. Not supported.
6. **Progressive stakes** — Match 1 = $5, Match 2 = $10, Match 3 = $15. Increasing pressure. Not supported (betPerMatch is fixed across all three matches).
7. **Umbrella/sweep bonus** — If one team wins all 6 holes in a segment, the payout doubles. Not supported.

### Tie Handling
8. **Carryover on halved holes** — Some groups carry the hole's value forward when halved, making the next hole worth double. Stick treats halves as non-events (match status unchanged). **Mention as house rule.**

### Partnership
9. **Rotation customization** — Some groups want to choose who they partner with first (strategic choice). The `initialRotation` config field exists but is dead code. Only the shuffle button influences rotation. **Mention the shuffle feature as the way to randomize.**

### Junk/Side Bets
10. **Greenies, sandies, etc. layered on Sixes** — Common. These are tracked by Stick's separate Junk game, but not integrated into the Sixes game itself. **Mention:** "Many groups layer Junk bets on top of Sixes — Stick tracks those as a separate game in the same round."

---

## List 3: Feature Gaps (Potential App Improvements)

These are things the audit revealed that should probably be fixed or built.

### Bugs / Dead Code
1. **"1 & 0" display bug** — When a match ends on the final hole (6th of segment) with a 1-hole lead, the result reads "1 & 0" instead of "1 UP" because the early-closeout check fires when `holesRemaining === 0`. Golfers expect "1 UP" in this scenario. **Priority: Medium — cosmetic but noticeable.**

2. **Dead config fields** — Four fields are typed but never read by the calculator:
   - `scoringMethod` (hardcoded to 'bestBall')
   - `matchPlayScoring` (hardcoded to true)
   - `initialRotation` (never used — rotation determined by array order)
   - `storedPresses` (manual press infrastructure exists but isn't wired)
   **Priority: Low — no user impact, but tech debt.**

3. **Narrative mismatch** — `settlementNarrative.ts` reports the per-match bet ($10) rather than the actual payout ($20 = bet × 2 opponents). Could confuse users who see "$10 match" but get charged $20. **Priority: Medium — user confusion risk.**

### Missing Features
4. **Manual presses** — The most common pressing style in casual match play. `storedPresses` type exists but the calculator ignores it. **Priority: Medium — auto-press covers most use cases but manual is expected by experienced players.**

5. **Handicap allowance UI selector** — Engine supports 0–100% but UI only toggles on (100%) / off (0%). Tournament standard is often 90% or 80%. **Priority: Low for V1 — nice-to-have for Events feature.**

6. **Infinite loop risk** — `calculateStrokeHoles` with empty courseHoles and non-zero playing handicap enters infinite while loop. Currently impossible in practice (empty courses = all handicaps equal = 0 strokes), but a defensive guard would eliminate the latent bug. **Priority: Low — not triggerable today.**

### Competitive Differentiators to Build
7. **Manual press support** — Would differentiate from apps that only do auto-press. The type infrastructure is already there.

8. **Rotation visualization** — Show which partnerships are in each block before the round starts (after shuffle). Helps players understand the rotation without mental math. No competitor does this well.

9. **Mid-round match status** — Real-time "you're 2 UP in Match 2, your partner is Justin" display. The data exists in the engine; it's a UI opportunity.

---

## Audit Summary

| Category | Count |
|----------|-------|
| Config fields (total) | 13 |
| Config fields (dead/unused) | 4 (scoringMethod, matchPlayScoring, initialRotation, storedPresses) |
| Unit tests | 44 |
| Property-based tests | 25+ |
| Regression tests | 2 |
| **Total tests** | **~71** |
| Confirmed bugs | 1 ("1 & 0" display) |
| Narrative issues | 1 (bet vs payout mismatch) |
| Latent risks | 1 (infinite loop with empty courseHoles) |

### Verdict

The Sixes engine is solid for V1. The core mechanics — rotating partnerships, best-ball match play, match status, auto-press, pairwise settlement — all work correctly and are well-tested. The "1 & 0" display bug is the most visible issue (golfers will notice). The narrative bet/payout mismatch could cause confusion on settlement screens. Dead config fields are tech debt but harmless.

The biggest gap vs. how golfers actually play is **manual presses** — experienced match play bettors expect to press on demand, not just at a threshold. The type infrastructure exists, so wiring it up should be tractable.

For the game guide: we can confidently promote the rotation system, handicap support, auto-press, and settlement math. Avoid claiming manual press support. Mention Nassau-style Sixes and progressive stakes as variations without implying Stick tracks them.
