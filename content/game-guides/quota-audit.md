# Quota (Chicago) — Three-List Gap Analysis

**Date:** March 1, 2026
**Inputs:** Claude Code feature audit (67 tests, 14 property checks, ~3,200 random iterations) → Game aliases reference
**Note:** No separate research doc yet — Quota research will happen alongside the guide draft. This analysis uses the audit + general knowledge of how Quota/Chicago is played in the wild.
**Raw audit preserved in:** `quota-audit-raw.md`

---

## Key Finding: This Engine Is Architecturally Unique

Quota is fundamentally different from every other game in Stick. While Nassau, Skins, Wolf, etc. apply handicap strokes per-hole and use net scores, Quota bakes the handicap entirely into the target. Every player scores gross points (eagle=8, birdie=4, par=2, bogey=1, double+=0). The fairness comes from the quota formula: `quota = quotaBase - courseHandicap`. A 20-handicap has to beat 16 points. A scratch player has to beat 36. Same point system, different targets.

This design decision has massive implications for the Events feature. Because all scores are gross, there's no ambiguity about stroke allocation across different courses or tees. A birdie is 4 points for everyone, everywhere. This makes cross-group aggregation trivially simple compared to net-based games.

## Key Finding: Zero Bugs, Zero TODOs

Like Split Sixes, Quota came back clean. No bugs, no dead config fields, no display issues, no broken pipelines. The engine is straightforward (point lookup + quota calculation + pairwise settlement) and well-tested. The 67 tests with 3,200 random property iterations are the second-highest coverage in the lineup after Scotch.

## Key Finding: Events-Ready at Engine Level, Nothing Else

The calculator explicitly comments about "a future Events feature" for 30+ players. The engine has no player cap, handles O(n²) pairwise settlement without issue, and uses gross scoring that's universally comparable across groups. But there's zero orchestration code — no cross-group aggregation, no tournament fields, no multi-group leaderboard. The engine is a perfect foundation; everything above it needs to be built.

---

## List 1: Stick Does This (Highlight in Guide)

### Core Mechanics
1. **Gross point scoring** — Eagle or better = 8 pts, birdie = 4, par = 2, bogey = 1, double bogey = 0. Points are always based on gross score vs par. Par-aware (a 3 on a par 5 is an eagle, not a birdie).
2. **Quota target from handicap** — `quota = 36 - courseHandicap`. Scratch player needs 36 points (all pars). 20-handicap needs 16 points. The formula levels the field without per-hole stroke adjustments.
3. **Chicago variant (39-base)** — Toggle between standard (36) and Chicago (39). The 39-base is a harder target — a scratch player needs 39 points, meaning they need to average better than par. Configurable before the round.
4. **Pairwise settlement** — Every pair of players settles independently based on differential difference × stake per point. Not a pot model — direct transfers between each pair.
5. **Any number of players** — Minimum 2, no maximum. Engine explicitly designed for 30+ players. The only game in Stick without a player cap.

### Configurable Variations
6. **Eagle point options (8 or 6)** — Standard gives eagles 8 points (double a birdie). Modified gives 6 (flatter scale, reduces eagle luck factor). Exposed in config form.
7. **Triple bogey penalty mode (-1)** — Optional toggle that penalizes triple bogey or worse with -1 point instead of 0. Adds a sting to blow-up holes. Under "Advanced" in config.
8. **Four combined configurations** — Standard (8-4-2-1-0-0), modified eagle (6-4-2-1-0-0), penalty mode (8-4-2-1-0-(-1)), and modified eagle + penalty (6-4-2-1-0-(-1)).

### Leaderboard & Display
9. **Running leaderboard** — Standings recalculate on every score entry. Shows each player's total points, differential (over/under quota), and rank. Competition ranking (1, 1, 3 for ties).
10. **Viewer-perspective status** — "+5 · +3 lead" (green) when leading, "-2 · 7 back" when trailing, "Tied" when equal. Color-coded per-hole points: green for birdie+, neutral for par/bogey, red for double+.
11. **"What Happened" narratives** — Per-hole point breakdowns, quota progress tracking, lead change detection. Shows the drama as it unfolds.

### Robustness
12. **Zero-sum verified** — Property-tested for 2, 3, and 4 players (200 iterations each). Every dollar won is a dollar lost.
13. **Integer cent arithmetic** — Uses `toCents()`/`toDollars()` from shared currency module. No floating-point drift.
14. **Pure functional, stateless** — Full recalculation from scores on every call. Score corrections are transparent.
15. **Negative quotas handled** — A 40-handicap player gets quota = -4. They "beat quota" by earning any points at all. The math works correctly.
16. **67 dedicated tests, 14 property invariants** — Second-highest test coverage in the Stick lineup.

### UI
17. **Full scorecard integration** — Per-player per-hole point rows, status badges, stake display, summary card with differential.
18. **Game Info Sheet** — Complete in-app documentation of how it works, points per hole, settlement, and options.
19. **Config form** — Stake, quota base, eagle points, triple bogey penalty all exposed with clean UI controls.

---

## List 2: Common Variations (Document Educationally, Don't Claim Stick Does These)

### Modified Stableford
1. **Full Modified Stableford scoring** — The PGA Tour's alternate-event format uses a different point scale: double eagle = 8, eagle = 5, birdie = 2, par = 0, bogey = -1, double bogey = -3. This creates negative total possibilities and rewards aggressive play. Stick's engine is architecturally ready (`QuotaPointValues` interface supports arbitrary values) but the config only exposes 2 of the 6 brackets. **Mention:** "Modified Stableford uses a more aggressive scale with negative points for bogey and worse. It's what the PGA Tour uses at Barracuda Championship. Stick uses the traditional Quota scale by default, but the engine is built to support custom point values in a future update."

### Pool/Pot Settlement
2. **Pool model** — Some groups (especially large outings) collect a fixed entry fee and split the pot among the top finishers by differential. No pairwise settlement — just a prize pool. The Convex validators reference a future "pool" settlement type but it's not implemented. **Mention:** "For larger groups, some clubs collect a fixed entry fee and pay out the top 3-5 finishers. Stick uses pairwise settlement (each pair settles independently), which works well for groups under 10. For big outings, your organizer might prefer a pot model — that's on the roadmap."

### Skins + Quota Hybrid
3. **Running skins alongside Quota** — Very common in weekly club games. Quota for the overall competition, skins for hole-by-hole drama. Stick tracks these as separate games in the same round. **Mention naturally.**

### Team Quota
4. **Team/scramble Quota** — Some outings use Quota scoring for team scrambles or best-ball formats. One team quota target instead of individual. Not supported — Quota is individual-only. **Mention as a variation for large outings.**

### Quota with Presses
5. **Pressing in Quota** — Uncommon but exists. A player who's behind on differential can press for the remaining holes at double stakes. Not supported. **Mention briefly.**

### Double Points
6. **Double points on par 3s** — Some groups award double points on par 3s (birdie = 8 instead of 4). Not supported — no par-specific multiplier. **Mention as a house rule.**

### Bonus Points
7. **Bonus points for achievements** — Chip-in bonus (+1), longest putt bonus (+1), sand save bonus. Separate from the scoring brackets. Not supported. **Mention:** "Some groups add bonus points for chip-ins or sand saves. Track those with Stick's Junk game running alongside Quota."

### Handicap Floor
8. **Quota floor** — Some clubs set a minimum quota (e.g., no target below 10) to prevent very high handicappers from having too easy a target. Not supported — quota is always `quotaBase - courseHandicap` with no floor. **Mention as a club-specific rule.**

---

## List 3: Feature Gaps (Potential App Improvements)

### Ready to Expose (Already Architected)
1. **Custom point values** — The `QuotaPointValues` interface supports arbitrary values for all 6 brackets. Only eagle and triple-bogey-or-worse are configurable today. Exposing birdie, par, bogey, and double bogey would allow full Modified Stableford and any custom scale. **Priority: Medium — wait for user demand. The architecture is ready; it's just a config form expansion.**

### Nice to Have (Medium Impact)
2. **Pool/pot settlement model** — The Convex validators already reference a "pool" type. For large outings (10+ players), pairwise settlement creates too many individual transactions. A pot model (entry fee → prize pool → top finishers) is more practical. **Priority: Medium — important for Events. Pairwise works fine for small groups.**

3. **Quota floor/ceiling** — Allow organizers to set min/max quota values. Prevents very high handicappers from having trivially easy targets and scratch players from having unreachable ones. **Priority: Low — edge case, but useful for organized events.**

4. **Manual quota override** — Let the organizer set a custom quota for a specific player. Some clubs use historical performance or adjusted quotas rather than pure handicap-based. **Priority: Low — advanced feature for organized play.**

### Events-Specific (Future)
5. **Cross-group aggregation** — The big one. Collect scores from multiple round instances (each representing one foursome) into a unified leaderboard. The engine handles the math; the orchestration layer needs to be built. **Priority: High — this IS the Events feature.**

6. **Tournament config fields** — `eventId`, `groupId`, `flightId` on QuotaConfig. Allow grouping players into flights by handicap range. **Priority: High for Events.**

7. **Multi-round support** — Carry differentials across rounds for multi-day events. **Priority: Medium for Events.**

8. **Pool settlement for Events** — For 28+ players, pairwise settlement creates 378 transactions. A pool model (entry fee → payout to top N) is more practical at scale. **Priority: High for Events.**

### Watch List (Lower Priority)
9. **Modified Stableford preset** — A one-button toggle to switch from traditional Quota to Modified Stableford (5-2-0-(-1)-(-3)). Uses the existing `QuotaPointValues` interface. **Priority: Low — niche audience (PGA Tour fans), but easy to build once custom values are exposed.**

10. **Par-specific point multipliers** — Double points on par 3s or par 5s. No per-hole multiplier system exists. **Priority: Very low — rare house rule.**

---

## Audit Summary

| Category | Count |
|----------|-------|
| Config fields (total) | 7 |
| Config fields exposed in UI | 4 (stakePerPoint, quotaBase, eaglePoints, tripleBogeyOrWorsePoints) |
| Config fields not in UI | 2 (playerIds — set automatically, scoringMode — always gross) |
| Unit tests | ~55 |
| Property-based tests | 14 (~3,200 iterations) |
| **Total tests** | **~67** |
| Confirmed bugs | **0** |
| Dead config fields | **0** |
| Display bugs | **0** |
| Player cap | **None (Events-ready)** |

### Verdict

Quota is clean, well-tested, and architecturally unique in the Stick lineup. The gross-scoring + quota-target approach is elegant — it solves the handicap fairness problem without any per-hole stroke adjustments, which makes it the simplest game to understand and the easiest to scale for Events.

The engine is the strongest foundation for the Events feature. No player cap, O(n × h) calculation, O(n²) settlement that's still fast at 30+ players, and gross scores that are universally comparable across groups and courses. The gap isn't in the engine — it's in the orchestration layer above it.

For the game guide: lead with the "personal target" concept (it's what makes Quota click for new players), show the quota formula with real handicaps, give a full round walkthrough with named players, explain why gross scoring + quota target = fair competition. The comparison to Modified Stableford is a strong SEO angle since the Barracuda Championship keeps it in the golf conversation. The "works for any number of players" angle connects directly to the Events vision without overselling what's built today.

The biggest content opportunity: "best golf game for large groups" is a search query with zero good results. Quota is the answer, and nobody else is making that case.
