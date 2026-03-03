# Split Sixes — Three-List Gap Analysis

**Date:** March 1, 2026
**Inputs:** Claude Code feature audit (40 tests) → Web research (18 sources in `sixes-research.md`)
**Note:** No original game doc for Split Sixes — engine was built as a Nine Point wrapper with `pointSystem: '4-2-0'`.
**Raw audit preserved in:** `splitsixes-audit-raw.md`

---

## Key Finding: This Engine Is Clean

Unlike most audits that uncover bugs or broken pipelines, Split Sixes is remarkably solid. No confirmed bugs. No dead config fields. No display issues. The entire engine delegates to Nine Point (which has its own thorough test coverage), so Split Sixes inherits that stability. The main gaps are feature omissions (things golfers do that the engine doesn't support), not broken behavior.

The one architectural quirk worth noting: `state.config` inside the returned `SplitSixesState` is actually a `NinePointConfig`, not a `SplitSixesConfig`. This is a consequence of the delegation pattern. No user impact, but something to be aware of if debugging.

---

## List 1: Stick Does This (Highlight in Guide)

These are confirmed, tested features the guide can confidently promote.

### Core Mechanics
1. **4-2-0 point distribution** — Standard Split Sixes scoring. Low score = 4 points, middle = 2, high = 0. Six points every hole, no exceptions. Property-tested across 50 random 18-hole rounds.
2. **Tie splitting** — All four tie scenarios handled correctly:
   - Two tied for best → 3-3-0 (split top two prizes)
   - Two tied for worst → 4-1-1 (split bottom two prizes)
   - Three-way tie → 2-2-2 (equal split)
   - Clear winner → 4-2-0 (standard)
3. **108-point conservation** — 18 holes × 6 points = 108 total. Property-tested. Never gains or loses points.
4. **Pairwise settlement** — Each pair of players settles independently based on point differential × dollar per point. Three pairwise calculations for three players.
5. **Configurable dollar per point** — `dollarPerPoint` field, default $1, validated > 0.
6. **Locked to 3 players** — `exactPlayers: [3]` in game requirements. UI blocks adding Split Sixes unless exactly 3 players. No ambiguity.

### Variations
7. **Blitz** — When one player beats BOTH opponents by 2+ strokes on a hole, that player sweeps all 6 points. Any tie prevents blitz. Togglable. This is a genuine competitive differentiator — adds a "big play" dimension most golfers love.
8. **Birdie Double** — When ANY player makes a birdie (net score below par), all points on the hole double (6 → 12). Stacks with blitz (blitz + birdie double = 12 points to the blitzer). Togglable. Also a differentiator.

### Handicap System
9. **Net and gross scoring modes** — `scoringMode: 'net' | 'gross'`, default net.
10. **Off-low-man calculation** — Lowest courseHandicap plays scratch, others get the difference. Standard approach.
11. **Stroke allocation by stroke index** — Hardest holes first. Wraps for handicaps > 18.
12. **Net birdie triggers birdie double** — When birdie double is enabled, a net birdie (after handicap strokes) counts. Means higher-handicap players can trigger doubles more often — keeps it fair.

### Settlement & Robustness
13. **Zero-sum verified** — Property-tested across 50 random rounds. Sum of all settlements within 1 cent tolerance.
14. **Integer cent arithmetic** — Uses `toCents()`/`toDollars()` from shared currency module. No floating-point drift.
15. **Pure functional, stateless** — Full recalculation from scores on every call. Score corrections ripple correctly.
16. **Incomplete hole handling** — If fewer than 3 scores for a hole, it's skipped entirely (no crash, no partial distribution).
17. **40 dedicated tests** — 22 unit tests + 15 unit tests in property file + 3 property-based tests (50 iterations each).

### UI
18. **Full scorecard integration** — Per-player per-hole point rows, running totals, leader badge, viewer-perspective status ("You: X pts + N lead/back/Tied").
19. **Game Info Sheet** — Complete documentation of how it works, points, ties, bonus rules, settlement, options. Users can read the rules in-app.

---

## List 2: Common Variations (Document Educationally, Don't Claim Stick Does These)

These are things golfers do in the wild that the engine doesn't support. Mention in the guide's "Variations" section.

### Point Carry / Carryover
1. **Three-way tie carryover** — When all three players tie on a hole, some groups carry the 6 points to the next hole (making it worth 12). Stick distributes 2-2-2 immediately on ties — no carryover mechanism. **Mention:** "Some groups play that a three-way tie carries the 6 points to the next hole, doubling the stakes. Stick awards 2-2-2 immediately on ties."

### Bonus / Penalty Rules
2. **"Nasty" rule** — If you score 0 points on a hole (worst score outright), you owe an extra penalty (often $1 per nasty). Stick has no penalty system for zero-point holes. **Mention as a common house rule.**
3. **Junk / bonus points on top** — Some groups add extra points for birdies, eagles, chip-ins (e.g., +1 point for a birdie on top of the 4-2-0). Stick's Junk game handles side bets separately, but there's no mechanism to add bonus points to the Split Sixes tally. **Mention:** "Many groups layer Junk bets on top of Split Sixes — Stick tracks those as a separate game in the same round."
4. **Double points on par-3s** — Rare house rule where par-3 holes are worth 12 points instead of 6. Not supported.

### Structural Alternatives
5. **Nassau-style Split Sixes** — Settle front 9, back 9, and overall separately with different dollar amounts. The engine actually supports this (`structure: 'nassau'` + `frontAmount/backAmount/overallAmount`), but the UI doesn't expose it. Config form hardcodes `structure: '18hole'`. **Mention as a variation; note it's uncommon for Split Sixes.**
6. **Last hole double-or-nothing** — Some groups double the points on hole 18 for drama. Not supported.

### Alternative Distributions
7. **5-3-1 system** — That's Nine Point, which is a separate game in Stick. The Nine Point engine uses `pointSystem: '5-3-1'`. If someone plays this way, they should use Nine Point instead of Split Sixes. **Mention:** "If your group plays 5-3-1 instead of 4-2-0, that's Nine Point — Stick has a separate game for that."
8. **6-3-0 system** — Some groups play with a wider spread. Not supported. Would require adding a new entry to `POINT_SYSTEMS`.

### Pressing
9. **Pressing in 3-player games** — Research says pressing doesn't really make sense in individual play (it's a team mechanic). No pressing in Split Sixes. **Mention for clarity:** "Unlike 4-player Sixes, there's no pressing in Split Sixes — it's every player for themselves."

---

## List 3: Feature Gaps (Potential App Improvements)

### Should Expose (Already Built)
1. **Nassau structure UI** — The engine already supports `structure: 'nassau'` with separate `frontAmount/backAmount/overallAmount`. The config form just doesn't expose it. **Priority: Low — Nassau-style Split Sixes is uncommon. But if a user asks, the engine is ready. Could be exposed with a simple toggle addition to `SplitSixesConfigForm.tsx`.**

### Nice to Have (Medium Impact)
2. **"Nasty" penalty for 0 points** — Common house rule. When a player scores 0 on a hole, they owe an extra fixed penalty. Would need a new config field (`nastyEnabled: boolean`, `nastyAmount: number`) and a post-distribution check in the calculator. **Priority: Medium — adds flavor, differentiates from competitors, low engineering effort.**

3. **Three-way tie carryover** — Points carry to next hole when all three tie. Would need a carryover accumulator in the calculator loop (similar to how Skins handles carryover). **Priority: Low — 2-2-2 is the more common approach, and three-way ties are rare (all three need the exact same net score).**

4. **Partial handicap allowance (50%, 80%)** — Same gap as Skins and Sixes. No `handicapAllowance` field. Full strokes or none. **Priority: Low for V1 — important for Events feature when running organized Split Sixes tournaments.**

### Watch List (Lower Priority)
5. **Bonus points for birdies/eagles** — Layering extra points on top of the 4-2-0 distribution. Different from birdie double (which doubles all points). Would need a new config field and post-distribution bonus logic. **Priority: Low — Junk game handles this use case separately.**

6. **Alternative point distributions in UI** — The shared point distribution system supports multiple systems, but Split Sixes hardcodes '4-2-0'. Exposing a distribution picker would let groups play 6-3-0 or other custom spreads. **Priority: Very low — 4-2-0 is the standard. Anyone wanting 5-3-1 should use Nine Point.**

7. **Double points on specific holes** — Par-3 doubles, last-hole doubles, etc. No per-hole multiplier system. **Priority: Very low — rare house rule.**

---

## Audit Summary

| Category | Count |
|----------|-------|
| Config fields (total) | 9 |
| Config fields exposed in UI | 4 (dollarPerPoint, handicapsEnabled, blitzEnabled, birdieDoubleEnabled) |
| Config fields engine-only | 4 (structure, frontAmount, backAmount, overallAmount) |
| Unit tests | 37 |
| Property-based tests | 3 (50 iterations each) |
| **Total tests** | **~40** |
| Confirmed bugs | **0** |
| Dead config fields | **0** |
| Display bugs | **0** |

### Verdict

Split Sixes is the cleanest engine in the Stick lineup. Zero bugs, zero dead code, zero display issues. The thin-wrapper architecture (delegating to Nine Point) means it inherits Nine Point's robustness without duplicating complexity.

The core game — 4-2-0 point distribution, all four tie scenarios, pairwise settlement — matches exactly what golfers expect. Blitz and Birdie Double are genuine differentiators that add excitement without complexity. No competitor highlights these variations.

The biggest gap vs. how golfers actually play is the **"Nasty" penalty** for scoring 0 points — it's a common house rule that adds psychological pressure. Everything else in the "not implemented" list is either rare or handled by other Stick games (Junk for bonus points, Nine Point for 5-3-1).

For the game guide: confidently promote the 4-2-0 system, all tie scenarios, blitz, birdie double, pairwise settlement, and net scoring. Emphasize the 3-player focus ("the perfect threesome game"). Use the Nine Point comparison as a natural internal link. Avoid claiming Nassau structure support (engine has it, UI doesn't). The FAQ should address "What's the difference between Split Sixes and Nines?" — this confusion is a strong SEO opportunity.
