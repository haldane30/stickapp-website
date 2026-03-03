# Wolf — Feature Audit & Gap Analysis

> Audit source: Claude Code feature audit of the Wolf game engine (February 28, 2026)
> Gap analysis: Compared against `wolf-research.md`, `Wolf_Game_Rules.md` (spec), and `game-aliases.md`

---

## Section 1: Stick Does This

These are confirmed, implemented features we can claim in the game guide.

### Configuration
- **playerCount** — 3, 4, or 5 players. Validated at engine level with property tests across all three counts.
- **pointValue** — Configurable dollar amount per point (stakes).
- **scoringMode** — Net or gross. Handicap strokes applied when net.
- **teeOrder** — Custom wolf rotation order. Players can be reordered in setup; includes a shuffle button.
- **Multiplier presets** — Three presets: Standard (1/2/3), Aggressive (1/3/4), Custom (user-defined 1–10 per level).
- **maxMultiplier** — Optional cap on total stacked multiplier per hole (default 32, range 2–1024). Safety valve for runaway stacking.
- **Carryover** — On/off toggle. Tied holes accumulate a +1 carryover multiplier that stacks with all other multipliers.
- **Pig rule** — On/off toggle with configurable pig multiplier (default 2x). See Section 3 for a mechanics note.
- **Hammer** — On/off toggle. Full mid-hole doubling with re-hammer support.
- **Birdie bonus** — On/off + configurable multiplier (default 2x). Applied when winning team's best ball is birdie or better.
- **Eagle bonus** — On/off + configurable multiplier (default 2x). Stacks multiplicatively with birdie (eagle = 4x default).

### Wolf Decision Mechanics
- **Per-hole Wolf selection** — Mandatory decision before scoring: Partner, Lone Wolf, or Blind Wolf.
- **Partner selection** — Wolf picks any other player. Creates 2v2 (4 players), 2v1 (3 players), or 2v3 (5 players).
- **Lone Wolf** — 1v(N-1) after own drive. Default 2x multiplier, configurable on/off and custom multiplier.
- **Blind Wolf** — 1v(N-1) declared before anyone tees off. Default 3x multiplier, configurable on/off and custom multiplier.
- **Decisions persisted and synced** — Wolf decisions stored in Convex, real-time sync across all devices via `addWolfDecision` mutation.

### Pig (Partner Rejection)
- **Implemented and configurable** — On/off toggle with separate pig multiplier.
- **Flow:** Wolf picks a partner → partner receives confirmation prompt → partner can accept or "go Pig."
- **Pig multiplier stacks** with carryover, hammer, and score bonuses.
- **Tracked in wolf record** — Results logged under `wolfRecord.asPigged`.
- **⚠️ IMPORTANT: Stick's Pig plays differently than the common house rule.** See Section 3 for details.

### Hole Scoring
- **Best ball per team** — Lowest score on Wolf's team vs. lowest score on opponents, regardless of team size.
- **Team-size agnostic** — Same best-ball logic handles 2v2, 1v3, 2v1, 1v4, 2v3.
- **Ties** — 0 points awarded. If carryover enabled, ties increment a running multiplier that applies to the next decisive hole.

### Hammer (Mid-Hole Doubling)
- **Full implementation** — Uses shared hammer module (same pattern as Scotch's "Roll").
- **Either team can throw** — Wolf's team or opponents can initiate. Cannot throw if a hammer is already pending.
- **Take = double stakes** — Multiplier escalates: 1x → 2x → 4x → 8x…
- **Drop = forfeit** — Declining concedes the hole at current multiplier, overriding best-ball scoring.
- **Re-hammer** — No limit on back-and-forth, but can't hammer twice consecutively (teams alternate).
- **Persisted** — Hammer events stored on wolf decisions, synced across devices.
- **UI fully wired** — HammerChip in game header, HammerConfirmDialog and HammerResponsePrompt dialogs.

### Point Calculation (Zero-Sum)
- **Pairwise payment model** — Each loser pays each winner 1 × totalMultiplier points.
- **2v2:** Each loser pays −2 × mult, each winner gets +2 × mult.
- **1v3 (Lone/Blind/Pig):** Solo wins = +3 × mult; Solo loses = −3 × mult (each opponent gets +1 × mult).
- **Multiplicative stacking:** total = status × carryover × hammer × scoreBonus, capped by maxMultiplier.
- **Zero-sum verified** — Per-hole, per-round, and settlement. Property tests verify across 1,650–3,300 random scenarios.

### Settlement
- **Pairwise differential** — Every pair of players settles their point differential × pointValue.
- **Line-item breakdowns** — WolfSettlement[] with from/to/points/amount per pair.
- **Zero-sum verified** — Uses shared `verifyNetZeroSum()` from settlement module.
- **Currency-safe** — Integer cents via `toCents()`/`toDollars()`/`multiplyCents()`.

### Rotation
- **Simple modulo** — `(holeNumber - 1) % playerCount`. Handles 3, 4, and 5 players.
- **Visual preview in setup** — Config form shows which holes each player will be Wolf.

### UI
- **WolfDecisionSheet** — Pre-hole decision modal with Partner/Lone/Blind buttons.
- **WolfSelector** — Partner picker with avatars, conditional mode buttons based on config.
- **WolfChoiceChip** — Color-coded status chip (green=partner, amber=lone, red=blind, orange=pigged).
- **Scorecard integration** — 3-4 rows per hole: WOLF, PICK, YOU (dollar result), HAMMER.
- **SummaryTab** — Game summary with config chips and standings.
- **GameInfoSheet** — Rules explanation accessible during play.
- **13 selector functions** — Standings, current wolf, upcoming wolves, hole results, wolf record, leaders (tie-aware), net settlement, viewer-perspective badge, per-hole dollars, points breakdown.

### Structural
- Purely functional, stateless engine — same inputs always produce same outputs.
- Uses shared modules: hammer, settlement (zero-sum verification), utils (hole grouping).
- 115 total tests (54 unit, 33 property × 50-100 iterations, 24 narrative, 4 integration).
- Score corrections trigger full recalculation from scratch.

---

## Section 2: Common Variations (Document Educationally, Don't Claim Stick Supports)

These are real things golfers do that the Wolf engine does not currently handle. The game guide should explain them as "how some groups play it" without implying Stick tracks them.

### Sequential "Watch and Pass" Partner Selection
The real-world Wolf experience: Wolf watches each player tee off one by one. After each drive, Wolf says "pick" or "pass." If you pass, you can't go back — that player is off the table. If you pass on everyone, you're forced Lone Wolf. This is the core strategic tension of the game. Stick handles it as an all-at-once selection (pick mode + partner from a sheet before entering scores). Functionally equivalent in outcome — Wolf still chooses partner or goes alone — but misses the sequential drama. The guide should describe the real-world flow for educational value and frame Stick's approach as "choose your play before the hole."

### Last Place Wolf on Final Holes (17-18)
The trailing player gets Wolf on the final holes as a comeback mechanic. The `lastPlaceWolfEnabled` config field exists in the type definition and Zod schema, but is dead code — the engine never reads it. The guide can explain this as a popular house rule variation without claiming Stick automates it. Groups can manually override the rotation for the last two holes.

### Wolf Tees First vs. Last
Most instructional sources say Wolf tees LAST (information advantage — see all drives before hitting). Some groups prefer FIRST. The `wolfTees` config exists and `getTeeOrderForHole()` is implemented, but the function is never called. The guide should explain both traditions as valid and note that since Stick doesn't enforce tee order, groups can play it either way.

### Scotch Wolf (Alternate Shot After Partner Selection)
After Wolf picks a partner, the pair plays alternate shot instead of best ball. Changes partner evaluation entirely — you want someone whose iron game complements yours, not just someone who hit a good drive. Not implemented. The Scotch game engine exists separately but there's no Wolf variant that uses alternate shot.

### Canadian Wolf (Handicap-Based Dynamic Tee Order)
Instead of rotating, tee order is determined by net scores from the previous hole — worst net score becomes Wolf. Keeps weaker players competitive throughout the round. Not implemented — Wolf rotation is purely modulo-based.

### Par-Based Multipliers
Par 3 = 1x, Par 4 = 2x, Par 5 = 3x. Makes longer holes worth more. Not implemented — all holes have equal base value.

### Escalating Hole Values
Front nine at 1x, back nine at 2x, holes 17-18 at 3x or 5x. Not implemented. Carryover and hammer create organic escalation but it's not structured by hole number.

### Junk / Side Bets (Greenies, Sandies, Barkies)
Separate bonuses tracked independently from hole outcomes. Not implemented for Wolf specifically — the Junk game handles junk scoring as a separate game. Groups would add Junk alongside Wolf.

### "Leader Gets Wolf" on Final Holes
Alternative to last-place-gets-Wolf: the leader gets Wolf on 17-18, intensifying pressure. Less common than last-place version. Not implemented.

### 5x Multiplier on Final Holes
Some groups make holes 17-18 worth 5x normal value rather than changing who is Wolf. Creates a dramatic finish without altering rotation. Not implemented as a structured rule — groups could approximate this by manually hammering.

---

## Section 3: Feature Gaps (Potential App Improvements)

### Must Fix (Correctness / Integrity Issues)

**1. Pig Mechanic — Plays Backwards From Standard Rules**
- **The problem:** In Stick, when a partner "goes Pig," the *rejecting partner* plays 1v3 solo and the Wolf joins the opponent team. In standard Wolf, when a partner pigs the Wolf, the *Wolf* is forced into Lone Wolf (1v3) and the rejecting partner returns to the opponent side. The Wolf's own rules doc (`Wolf_Game_Rules.md` Section 3.4) describes the standard version — but the engine does the opposite.
- **Why it matters:** Groups familiar with Pig will expect the standard mechanic. Having the rejecting partner go solo is unusual — it punishes the person who rejected rather than the Wolf who made a bad pick. Most house rules punish the Wolf.
- **Scope:** Engine logic change in `processPiggedHole()`. The "wolfTeam" slot currently holds the pig player (semantic confusion noted in audit). Would need to flip who goes solo.
- **Content impact:** Critical. The guide needs to accurately describe what happens. If we fix this, we can describe standard Pig. If we don't, we need to explain Stick's variant clearly and risk confusing readers who know the standard rule.
- **Recommendation:** Fix to match the standard rule. The spec already describes it correctly — the engine just diverges from the spec.

**2. Pig Has Zero Engine-Level Tests**
- **The problem:** Pig is implemented and has UI support, but every property test hardcodes `pigEnabled: false`. There are no unit tests for pig scoring, pig + hammer interaction, pig + carryover interaction, or pig zero-sum verification.
- **Why it matters:** This is money code. If Pig math is wrong, players settle incorrectly. Combined with the backwards mechanic above, this is the highest-risk area of the Wolf engine.
- **Scope:** Add dedicated pig tests covering: pig scoring in isolation, pig + hammer stacking, pig + carryover, pig zero-sum across all player counts.
- **Recommendation:** Test before launch. If the Pig mechanic is going to be flipped (per gap #1), test the corrected version.

**3. Hammer Has Zero Wolf-Specific Tests**
- **The problem:** Hammer is fully implemented and UI-wired, but there are no dedicated Wolf hammer tests. The shared hammer module has its own tests, but Wolf-specific integration (hammer + carryover stacking, hammer + pig, hammer forfeit overriding best-ball) is untested.
- **Why it matters:** Hammer multiplier stacking with carryover can produce large swings. Untested money code.
- **Scope:** Add tests for: hammer escalation (1x → 2x → 4x), hammer + carryover interaction, hammer forfeit, hammer + pig, zero-sum with hammer active.

**4. Birdie/Eagle Bonus Has Zero Tests**
- **The problem:** Every test sets `birdieMultiplierEnabled: false`. The 2x/4x stacking logic exists but is never verified.
- **Scope:** Add tests covering: birdie bonus in isolation, eagle stacking (birdie × eagle = 4x), bonus + hammer + carryover combined, zero-sum with bonuses active.

**5. Multiplier Cap Has Zero Tests**
- **The problem:** `maxMultiplier` capping logic exists but no test ever sets it. If carryover × hammer × status × bonus exceeds the cap, there's no verified behavior.
- **Scope:** Add a test with a scenario that would exceed the cap and verify clamping + zero-sum.

### Should Fix (Dead Code / Misleading Config)

**6. lastPlaceWolfEnabled — Dead Config Field**
- Type exists, Zod validates it, but engine ignores it. Either implement it or remove the field. Currently the codebase suggests this feature exists when it doesn't.
- **Priority:** Medium. Popular house rule worth implementing eventually. For now, removing the dead field is cleaner than leaving it.

**7. wolfTees — Dead Config With Implemented But Unwired Engine Code**
- `getTeeOrderForHole()` works correctly but is never called. Config is hardcoded to 'last' in setup and 'first' in Convex converter (inconsistency).
- **Priority:** Low. Since Stick doesn't enforce tee order in gameplay, this is cosmetic. But the inconsistent defaults should be resolved.

**8. processPiggedHole() Semantic Confusion**
- The "wolfTeam" slot holds the pig player, not the wolf. Works but makes the code confusing to maintain.
- **Priority:** Low. Refactor when fixing Pig mechanic (#1).

### Nice to Have (Future Features)

**9. Sequential Pass Mechanic**
- The real-world "watch each drive, pass or pick" flow. Significant UI effort requiring a multi-step decision state machine. Not a launch blocker — Stick's all-at-once approach works. But this would be the definitive Wolf UX if implemented.
- **Priority:** Post-launch. Would be a major differentiator.

**10. Last Place Wolf Implementation**
- Wire up the existing dead config. `getWolfForHole()` already accepts standings — just needs the override logic for holes 17-18.
- **Priority:** Post-launch. Nice drama mechanic.

**11. Net Scoring Test Coverage**
- All tests use gross scoring or 0 handicap strokes. No test verifies that stroke allocation actually changes outcomes.
- **Priority:** Low. Math is straightforward but explicit verification would be good.

---

## Technical Notes from Audit

### Test Summary
| Suite | Count |
|-------|-------|
| Unit tests (wolf.test.ts) | 54 |
| Property tests (wolf.properties.test.ts) | 33 (× 50-100 random iterations) |
| Narrative tests (whatHappened.test.ts) | 24 |
| Integration tests | 4 |
| Adapter tests | 0 |
| **Total** | **115** |

### Property Test Coverage (Important Caveat)
Zero-sum is verified for the base case: partner, lone, and blind modes across 3/4/5 players with 1,650–3,300 random scenarios. **However, all advanced features (pig, hammer, birdie/eagle, multiplier cap) are excluded** from property tests via hardcoded `false` values. The zero-sum guarantee only covers the simplest configuration.

### Architecture Notes
- Pure functional, stateless engine (same inputs → same outputs).
- Uses shared modules: hammer (via adapter), settlement (zero-sum verification), utils.
- Monolithic `index.ts` at 992 lines — other games split calculator/settlement/types into separate files.
- Deepest `RoundContext` integration of any game due to unique decision flow.
- Bidirectional Convex sync for wolf decisions and hammer events.

### Known Tech Debt
1. Monolithic `index.ts` (992 lines) — inconsistent with other game engines that split files.
2. Dead code: `getTeeOrderForHole()` exported but never called; `lastPlaceWolfEnabled` and `wolfTees` are dead config fields.
3. `_config` parameter in `getWolfForHole()` — placeholder for future `lastPlaceWolfEnabled`.
4. `wolfTees` default inconsistency — `useRoundSetup.ts` hardcodes 'last', Convex converter defaults to 'first'.
5. No adapter tests for `src/adapters/wolf.ts`.
6. `processPiggedHole()` semantic overload — "wolfTeam" holds the pig player.

---

## Guide Writing Notes

### What the Guide CAN Claim
- 3, 4, and 5 player support
- Partner, Lone Wolf, and Blind Wolf modes
- Configurable multipliers with three presets (Standard, Aggressive, Custom)
- Multiplier cap to keep stakes controlled
- Pig rule — partner can reject and go solo (describe Stick's specific mechanic accurately)
- Hammer — double stakes mid-hole, opponent can re-hammer or fold
- Carryover ties — tied holes roll forward to increase the next decisive hole's value
- Birdie and eagle bonuses that stack multiplicatively
- Net or gross scoring with full handicap support
- Automatic wolf rotation with visual preview in setup
- Pairwise settlement with line-item breakdowns
- Zero-sum guaranteed
- Real-time sync across all players' devices
- Custom wolf order with shuffle

### What the Guide CANNOT Claim
- ~~Sequential "watch and pass" partner selection~~ — Selection is all-at-once
- ~~Last place gets Wolf on final holes~~ — Dead config, not implemented
- ~~Wolf tees first/last toggle~~ — Dead config, not wired up
- ~~Scotch Wolf or Canadian Wolf variants~~ — Not implemented
- ~~Escalating hole values by hole number~~ — Not implemented
- ~~Par-based point multipliers~~ — Not implemented

### Careful Language Needed
- **Pig:** Describe what Stick actually does — the rejecting partner plays solo, not the Wolf. Frame it clearly. If this gets fixed to match the standard rule before the guide publishes, update accordingly.
- **Blind Wolf timing:** In Stick, "Blind Wolf" means selecting it from the decision sheet before entering scores. In real life, it means declaring before anyone tees off. Functionally equivalent since the decision happens before any scores are entered. Don't describe it as a real-time tee box declaration.
- **Partner selection:** Don't describe the sequential "watch each drive" flow as if Stick replicates it. Frame as "choose your play style and partner before the hole."
- **Zero-sum claim:** Accurate for base config. Technically unverified for pig + hammer + bonus + carryover combinations. Claim it carefully — "zero-sum verified" is true at the engine level, but test coverage gaps exist for advanced feature combinations.

---

## Claude Code Action Items (Prioritized)

These are prompts to send to Claude Code for fixes, in priority order:

### Priority 1: Fix Pig Mechanic
The Pig implementation has the wrong player going solo. In standard Wolf, when a partner pigs the Wolf, the Wolf plays 1v3 alone. In Stick, the rejecting partner plays 1v3 alone. Fix `processPiggedHole()` so the Wolf is forced into Lone Wolf when pigged, and the rejecting partner returns to the opponent side. Also fix the "wolfTeam" semantic confusion.

### Priority 2: Test Pig
Add dedicated tests for pig scoring: pig in isolation, pig + hammer, pig + carryover, pig zero-sum across 3/4/5 players. Include pig in property test config generator (currently hardcoded to false).

### Priority 3: Test Hammer (Wolf-Specific)
Add tests for: hammer escalation, hammer + carryover stacking, hammer forfeit, hammer + pig interaction, zero-sum with hammer active.

### Priority 4: Test Birdie/Eagle Bonus
Add tests for: birdie bonus alone, eagle stacking (2x × 2x = 4x), bonus + hammer + carryover combined, zero-sum with bonuses.

### Priority 5: Test Multiplier Cap
Add a test where stacked multipliers would exceed maxMultiplier and verify clamping + zero-sum.

### Priority 6: Clean Up Dead Code
Either wire up `lastPlaceWolfEnabled` and `wolfTees` or remove them. Resolve the 'first'/'last' default inconsistency.
