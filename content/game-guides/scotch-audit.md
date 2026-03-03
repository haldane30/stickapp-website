# Scotch — Three-List Gap Analysis

**Date:** March 1, 2026
**Inputs:** Claude Code feature audit (118 tests) → Web research (18+ sources)
**Note:** No original game doc exists for Scotch — this was built from first principles. The research + audit are our only inputs.
**Raw audit preserved in:** `scotch-audit-raw.md`

---

## Major Finding: Tie Handling Conflict

**The audit and real-world research disagree on how tied categories should work.**

- **Stick's engine:** Tied categories produce 0 points for both teams. Points vanish.
- **Most real-world sources:** Tied categories split points evenly (each team gets half — e.g., tied low ball = 1 point each from the 2-point pool).

Both are legitimate variations — some groups do play "vanish" — but the split model appears to be the default assumption among most golfers. This is worth flagging because it affects the game guide's settlement examples and what we tell users to expect. The engine's behavior is a valid house rule, but the guide should note the difference.

**Recommendation for the guide:** Document both models. Frame Stick's current behavior ("points vanish on ties") as the default, mention split-points as a common house rule. If there's appetite to add a config toggle for tie behavior, that would cover both camps.

---

## List 1: Stick Does This (Highlight in Guide)

### Core Mechanics
1. **6-point system (2-2-1-1)** — Low Ball (2), Low Total (2), Proximity (1), Birdie (1). Property-tested. Standard breakdown golfers expect.
2. **2v2 fixed teams for 18 holes** — Exactly 4 players, 2 per team. Validated at engine and UI levels.
3. **Low Ball** — Best individual net score across all 4 players. Team with lowest individual wins the 2 points.
4. **Low Total** — Combined team net scores. Lower combined total wins 2 points.
5. **Proximity** — Manual input (scorekeeper picks winning team). Separate from automatic categories.
6. **Birdie** — Any player with a birdie earns the point for their team. Both teams birdie = cancels (0 points). Configurable: natural birdie only (gross, default) or net birdie.
7. **Tie handling** — Tied categories = 0 points awarded (points vanish). Not split. See Major Finding above.

### Advanced Features
8. **Umbrella / Sweep** — When one team wins ALL base category points on a hole, points double (6 → 12). Togglable. Requires every category to have a winner (no ties).
9. **Roll / Hammer** — Trailing team can double the stakes. Receiving team can accept ("take") or forfeit ("drop"). Re-rolls stack (2x → 4x → 8x). Umbrella and roll stack multiplicatively. This is a competitive differentiator — research suggests pressing/doubling is less common in Scotch but Stick's implementation is clean.
10. **Eagle Bonus** — Optional extra category (configurable points, default 1). Both teams eagle = cancels. Does NOT affect umbrella eligibility.
11. **High Ball Variant** — Toggle replaces Low Total with High Ball (team whose worst individual score is lower). Rewards consistency from both partners.
12. **Natural Birdie Only toggle** — Controls whether birdies must be gross (natural) or can be net. Default: natural only. This matches real-world expectation.

### Handicap System
13. **Net and gross scoring modes** — Toggle in UI. Default net.
14. **Off-low-man through upstream pipeline** — Scotch engine receives pre-computed net scores. Standard handicap calculation.

### Settlement
15. **Team-based settlement** — Point differential × dollar-per-point. Each winner gets half, each loser pays half.
16. **Zero-sum verified** — 9 verification points across 4 test files, 350+ random property-test runs.
17. **Integer cent arithmetic** — No floating-point drift. Uses shared currency module.
18. **Line-item breakdown** — Per-player settlement amounts.
19. **118 dedicated tests** — 49 unit, 18 property-based, 38 narrative, 6 selector, 7 integration.

### Architecture
20. **Pure functional, stateless** — Full recalculation from scratch on every call. Score corrections ripple correctly.
21. **Modular category system** — CategoryEvaluator interface + registry. Adding new categories requires only a new evaluator function + registration. No calculator/settlement changes needed.
22. **"Build your own game" foundation** — Code comments indicate V2/V3 plans for custom category editing. Engine already processes categories generically.

---

## List 2: Common Variations (Document Educationally)

### Tie Handling
1. **Split points on ties** — Most groups split tied category points 50/50 (e.g., tied low ball = 1 point each). Stick uses "points vanish" model. **Both are legitimate.** Document as: "Stick awards zero when a category ties. Some groups split the points instead — agree before the round."

### Point Distributions
2. **3-3 Low Ball / Low Total** — Some groups skip Prox and Birdie and just play 3 for low ball, 3 for low total. Simpler, faster. Engine supports this generically but UI is hardcoded to 2-2-1-1.
3. **5-Point Scotch** — Drops one category (usually Prox). Beezer supports this variant. Stick could support it by disabling a category if the UI exposed it.
4. **7-Point Scotch** — Adds a "scramble" or extra bonus point. Less common. Some groups count it as a bonus for eagle or for both partners making birdie. Not supported.

### Pressing
5. **Hole press / game press** — Traditional pressing in Scotch. Research says pressing is less common in Scotch than in Nassau/Match Play because point escalation already creates comeback opportunities. Stick has NO press mechanics for Scotch. **Mention as:** "Some competitive groups add presses, but most Scotch groups skip them — the point system already creates enough swings."

### Other
6. **Carryover on ties** — When category points vanish, some groups carry those points to the next hole. Not supported.
7. **Per-hole settlement** — Some groups settle each hole independently rather than cumulative. Stick uses cumulative (point differential at end).
8. **Prox eligibility rules** — Research shows variety: some count "in regulation" only, some count any approach. Stick's prox is manual input (scorekeeper decides), which sidesteps the question elegantly.
9. **Junk/side bets alongside Scotch** — Common. Tracked as separate Junk game in Stick.

---

## List 3: Feature Gaps (Potential App Improvements)

### Bugs (Fix These)
1. **Bug #1: maxMultiplier never reaches the engine (Severity: Medium)** — UI lets users toggle "Cap Multipliers" and set a value, but `useRoundSetup.ts` omits the field when building engine config, and `convexGameConfig.ts` doesn't include it in the Scotch field mapper. Result: users who enable caps get zero protection. With umbrella + re-rolls, exposure is unbounded. **Fix: Add maxMultiplier to both mapping layers. Low effort (2 lines), high impact.**

2. **Bug #2: proxPlayerThreePutt never populated from UI (Severity: Low)** — Config toggle "3-Putt Loses Prox" works. Engine evaluator checks `ctx.holeInput.proxPlayerThreePutt`. But score entry flow never sets it — `RoundContext.tsx` creates `ScotchHoleInput` with only `holeNumber` and `proxWinner`, no 3-putt data. The app tracks 3-putts for Snake/Junk but doesn't pipe that data to Scotch. **Fix: Medium effort — add 3-putt tracking to Scotch score entry UI, connect existing 3-putt data to Scotch prox input.**

3. **Bug #3: Game Info Sheet missing multiplier cap docs (Severity: Cosmetic)** — `GameInfoSheet.tsx` documents all Scotch options except "Cap Multipliers". Users who discover the toggle have no rules explanation.

### Missing Features
4. **Split-points on ties (config toggle)** — Add a toggle for "ties split points" vs. "ties void points." The split model is what most golfers expect by default. Engine change is small (evaluator returns half-points instead of none). **Priority: Medium — affects default user experience.**

5. **Custom point distributions in UI** — Engine processes categories generically, but UI hardcodes 2-2-1-1. Exposing a "custom points" mode would cover 3-3, 5-point, and other variants. **Priority: Low for V1 — "build your own game" is a V2/V3 vision per code comments.**

6. **Press mechanics** — Not supported at all for Scotch (no auto-press, no manual press). Research says pressing is uncommon in casual Scotch, so this is lower priority than for Nassau/Sixes. **Priority: Low — nice to have for competitive groups.**

7. **Carryover on ties** — Tied points carry forward to next hole. Not supported. **Priority: Low — niche variant.**

### Testing Gaps
8. **maxMultiplier cap logic** — Zero tests exercise it (engine supports it but tests don't cover it). Should add tests alongside Bug #1 fix.
9. **Eagle bonus + umbrella interaction** — Not tested in combination. Edge case: does an eagle bonus point count toward umbrella sweep eligibility?
10. **Net scoring in property tests** — All property tests use gross/0 strokes. Should add net-mode tests.

---

## Audit Summary

| Category | Count |
|----------|-------|
| Config fields (total) | 14 |
| Config fields (dead/semi-dead) | 3 (scoringMode indirect, useHighBall setup-only, rollEnabled selector-only) |
| UI config controls | 12 (11 functional, 1 broken: maxMultiplier) |
| Category evaluators | 5 (lowBall, lowTotal, highBall, prox, birdie) |
| Unit tests | 49 |
| Property-based tests | 18 |
| Narrative tests | 38 |
| Selector tests | 6 |
| Integration tests | ~7 |
| **Total tests** | **~118** |
| Confirmed bugs | 3 (1 medium, 1 low, 1 cosmetic) |
| Dead code items | 3 |

### Verdict

Scotch is the most feature-rich game engine in Stick's lineup. The modular category evaluator system is well-designed and extensible. The umbrella, roll/hammer, eagle bonus, and high ball variant give it depth that no competitor matches (Beezer offers 5/6/7-point but doesn't have roll mechanics).

The biggest user-facing issue is **Bug #1** — maxMultiplier caps are cosmetic, leaving exposure unbounded when users think they're protected. This should be fixed before launch.

The tie-handling question (vanish vs. split) is the biggest content challenge. The guide needs to explain both models and be clear about which one Stick uses, without making either feel wrong.

For the game guide: confidently promote the 6-point system, umbrella, roll/hammer, high ball, eagle bonus, and settlement math. Avoid claiming manual press support. Frame tie handling honestly. The "3-putt loses prox" toggle exists but is non-functional — don't mention it in the guide.
