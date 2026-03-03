# Skins — Feature Audit & Gap Analysis

> Audit source: Claude Code feature audit of the Skins game engine (February 27, 2026)
> Gap analysis: Compared against `skins-research.md` and game-aliases.md

---

## Section 1: Stick Does This

These are confirmed, implemented features we can claim in the game guide.

### Configuration (9 fields)
- **skinValue** — Any positive number, default $5
- **valueModel** — Fixed, pot, or escalating (three settlement models)
- **scoringMode** — Net or gross
- **grossBeatsNet** — Tiebreaker: when net scores tie, lower gross wins
- **carryoversEnabled** — On/off toggle for carryover behavior
- **validationRequired** — Winner must "prove it" on the next hole to keep the skin
- **maxScoreToWin** — None, par, bogey, or double bogey threshold
- **lastHoleRule** — Normal or winner-takes-all (sweeps remaining carryovers)
- **tieOn18** — Split, sudden death (UI-handled), or carryback

### Winner Determination
- Lowest unique score wins the skin
- Ties push (no winner, skin carries or is lost depending on carryover setting)
- Gross-beats-net tiebreaker for net scoring ties
- Max score threshold filters out scores above par/bogey/double bogey
- Full handicap stroke allocation via stroke index

### Carryover Mechanics
- Consecutive ties compound (3 ties → hole 4 worth 4 skins)
- Winner collects all accumulated skins, carryover resets
- No-carryover mode: tied holes simply have no winner, skin is lost
- Carryback on hole 18: scans backwards to find most recent winner

### Validation / Proofs
- Winner must score par or better on next hole, OR have lowest score on next hole
- Failed validation returns skins to carryover pool (not stolen)
- Hole 18 wins are awarded immediately (no validation needed)
- Pending validation from hole 17 resolves at end of round

### Settlement
- **Fixed model:** Pairwise settlement based on skins difference × skinValue
- **Pot model:** Buy-in pool divided by skins won, waterfall pairing for line items
- **Escalating model:** 1×/2×/3× multipliers for holes 1-6/7-12/13-18
- All three models produce line-item breakdowns
- Zero-sum verified (settlements sum to zero, tolerance < $0.01)
- Integer cent arithmetic throughout

### Structural
- Purely functional / stateless engine
- Score corrections trigger full recalculation from scratch (no mutable state)
- 2+ players supported (no hard-coded maximum)
- 65 dedicated tests including 12 property-based invariant checks (100 random runs each)

---

## Section 2: Common Variations (Document Educationally, Don't Claim Stick Supports)

These are real things golfers do that the Skins engine does not currently handle. The game guide should explain them as "how some groups play it" without implying Stick tracks them.

### Half-Handicap Mode
Players receive 50% of their handicap. Common in multi-foursome tournaments where full handicaps create too many ties. The engine only supports full handicap (100%) or gross. **This is the most commonly requested missing variation** (Justin's buddy has asked about it).

### Birdie/Eagle Multipliers
Some groups double the skin value for birdies, triple for eagles. Rewards quality of scoring, not just having the lowest. The engine treats all wins equally regardless of score quality.

### Validation "Steal" Rule
Some groups allow a failed validation to be "stolen" by whoever wins the validation hole, rather than returning skins to the carryover pool. Stick returns failed validations to carryover only.

### Custom Escalating Tiers
The escalating model is hardcoded to 1×/2×/3× at holes 1-6/7-12/13-18. Some groups use different breakpoints (e.g., front nine/back nine) or different multipliers.

### Per-Hole Custom Values
Some groups assign specific values to certain holes (e.g., "hole 17 is worth double"). The engine uses uniform valuation within each model.

### Team Skins (2v2)
Some groups play team skins where the best ball of each team competes. Engine is individual-only.

### Sudden Death Playoff
When hole 18 ties with carryovers, some groups play sudden death. Config option exists (`tieOn18: 'suddenDeath'`) but is treated identically to 'split' at the engine level — UI expected to handle.

### "Last Man Standing" / Elimination Skins
Variant where players are eliminated after losing N skins. Not implemented.

### Player Withdrawal
No explicit "withdrew" state or refund logic. Engine just processes whatever holes have scores — a player who stops playing simply doesn't have scores for later holes. Works, but not graceful.

### 9-Hole Skins
Not a distinct mode. A 9-hole round would only cover the first escalating tier (1×). Works but isn't purpose-built.

### Multi-Foursome / Cross-Group Skins
Not supported. Engine processes a single game with one player list. Cross-group skins (best score across all groups wins the skin) would need a new orchestration layer. **Key future feature tied to Events vision.**

---

## Section 3: Feature Gaps (Potential App Improvements)

Items worth considering for the app, prioritized by how often golfers actually encounter them.

### Should Fix (High Impact)

**1. Half-Handicap Mode**
- **Why:** Common in organized events and tournaments. Justin's buddy has specifically asked about it. Multi-foursome tournaments at clubs frequently use half handicaps because full handicaps create too many ties in skins.
- **Scope:** Add a handicap percentage option (50%, 75%, 100%) at the Skins config level, or a global handicap modifier. Half-stroke rounding on the relevant stroke index hole.
- **Content impact:** Guide can mention half-handicap as a variation. If implemented, becomes a feature highlight — most competing apps don't support it.
- **Ties to Events vision:** When Events launches for 20-30 player skins, half handicaps will be essentially required.

### Nice to Have (Medium Impact)

**2. Selector bugs for pot/escalating models**
- **Why:** The audit notes that `selectSkinsYourPosition`, `selectSkinsSummary`, and `selectSkinsCurrentPot` all assume fixed value model. Pot and escalating would show incorrect values in the viewer badge and summary.
- **Scope:** These are display/selector issues, not engine issues. Engine calculates correctly; UI shows approximate values.
- **Content impact:** None directly, but if we're claiming three settlement models, the UX should reflect them accurately.

**3. Birdie/Eagle Multipliers**
- **Why:** Popular house rule. Adds another layer of reward for exceptional play. Would differentiate from competitors.
- **Scope:** Add optional multiplier config. Engine already knows the score; just need to multiply the skin value.
- **Content impact:** Currently documented as a variation. If implemented, strong feature highlight.

### Watch List (Lower Priority)

**4. Validation "Steal" Rule**
- **Why:** Some groups play this way, but it's less common than the "return to pool" approach Stick uses.
- **Scope:** Small change in validation failure handling.
- **Content impact:** Minor. Current behavior is the more common version.

**5. Custom Escalating Tiers**
- **Why:** Hardcoded 1×/2×/3× is the standard. Custom tiers are rare.
- **Content impact:** Can document the standard tiers as a feature. Custom tiers aren't expected.

**6. Sudden Death Engine Support**
- **Why:** Config exists but engine doesn't actually run a playoff. Fine for now since this requires being on the course anyway.
- **Content impact:** Guide should say Stick supports carryback and split for unresolved skins. Can mention sudden death is handled through the app interface.

---

## Technical Notes from Audit

### Known Tech Debt (from audit, for Claude Code reference)
1. Selectors assume fixed value model (incorrect for pot/escalating viewer display)
2. `suddenDeath` tieOn18 treated identically to `split` at engine level
3. `_players` parameter unused in `calculateSkinsState` but kept for interface consistency
4. No Skins-specific Convex validators (fields stored but not validated at DB level)
5. Pot settlement rounding can lose up to 1 cent per division (within zero-sum tolerance)
6. `SkinsHoleImpact` doesn't extend shared base types (minor inconsistency)

### Property Tests (12 properties, 100 random runs each)
- Conservation: skins awarded ≤ 18, awarded + remaining = 18
- Winner: at most one per hole, has lowest score, ties push correctly
- Carryover: accumulates after push, respects disabled config, resets after win
- Settlement: sums to zero, no self-settlement, all amounts positive, equal skins = no settlement

---

## Guide Writing Notes

### What the Guide CAN Claim
- Three settlement models (fixed, pot, escalating)
- Full carryover system with configurable on/off
- Validation/proofs (must prove it on next hole)
- Gross-beats-net tiebreaker
- Max score thresholds
- Winner-takes-all last hole rule
- Carryback for unresolved hole 18
- Score corrections handled automatically
- Zero-sum verified settlement with line-item breakdowns
- 65 tests including property-based verification

### What the Guide CANNOT Claim
- Half-handicap skins
- Birdie/eagle multipliers
- Team skins
- Cross-group / multi-foursome skins
- Sudden death playoffs (mention carryback and split instead)
- Player withdrawal handling (beyond "engine processes whatever scores exist")
- Custom escalating tiers
- Per-hole custom values
