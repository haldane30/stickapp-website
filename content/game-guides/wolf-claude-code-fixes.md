# Wolf Engine Fixes — Claude Code Prompt

> Copy this entire prompt into Claude Code in the Stick app repo. These are prioritized fixes identified during a feature audit for the marketing website game guide.

---

## Context

We just completed a feature audit of the Wolf game engine for the stickapp.golf website content. The engine is solid for the base case (partner/lone/blind modes are zero-sum verified across 3/4/5 players with 1,650–3,300 random property test scenarios). But the audit found one correctness issue and several test coverage gaps in the advanced features — all of which involve money calculations.

The zero-sum guarantee is our strongest marketing claim. We can't confidently make that claim for groups using Pig, Hammer, birdie/eagle bonuses, or multiplier caps because none of those features have dedicated tests.

Please work through these in order. Each fix builds on the previous one.

---

## Fix 1: Pig Mechanic Is Backwards (Correctness Bug)

### The Problem

In standard Wolf, when a partner "pigs" (rejects) the Wolf's selection:
- The **Wolf** is forced into Lone Wolf (1v3 solo)
- The **rejecting partner** returns to the opponent side (joins the other two)
- Stakes double

In Stick's current implementation, it's flipped:
- The **rejecting partner** plays 1v3 solo
- The **Wolf** joins the opponent team

This contradicts our own rules doc (`docs/games/Wolf_Game_Rules.md`, Section 3.4) which describes the standard version. It also contradicts how virtually every Wolf group plays Pig — the whole point is that rejecting punishes the Wolf for making a bad pick, not the person who rejected.

### What To Fix

1. **`processPiggedHole()` (or equivalent)** — Flip the logic so the Wolf goes solo when pigged, not the rejecting partner.
2. **Fix the "wolfTeam" semantic confusion** — The audit noted that the "wolfTeam" slot currently holds the pig player instead of the wolf. After fixing the mechanic, make sure the naming is consistent: wolfTeam should contain the wolf.
3. **Point calculation after pig:**
   - Wolf plays 1v3 alone
   - If Wolf wins: Wolf gets +3 × totalMultiplier (one from each opponent), each opponent gets −1 × totalMultiplier
   - If Wolf loses: Wolf gets −3 × totalMultiplier, each opponent gets +1 × totalMultiplier
   - Pig multiplier (default 2x) stacks multiplicatively with other multipliers (carryover, hammer, score bonus), still capped by maxMultiplier
4. **Verify zero-sum holds** after the fix across all player counts (3, 4, 5).

### After Fixing

Run existing tests to make sure nothing else broke. Some narrative tests or integration tests may reference the old pig behavior and need updating.

---

## Fix 2: Add Pig Test Coverage

### The Problem

Pig is a configurable money feature with zero engine-level tests. Every property test hardcodes `pigEnabled: false`. There are no unit tests for pig scoring at all.

### What To Add

**Unit tests (wolf.test.ts or new wolf-pig.test.ts):**
1. Basic pig: Wolf picks partner, partner rejects, Wolf plays 1v3 — verify correct point distribution
2. Pig where Wolf wins solo — verify Wolf gets +3 × pigMultiplier from each opponent
3. Pig where Wolf loses solo — verify Wolf pays −3 × pigMultiplier, each opponent gets +1 × pigMultiplier
4. Pig with carryover — tied holes accumulate, then pig on next hole: verify carryover × pig multiplier stacking
5. Pig with hammer — hammer escalation + pig: verify correct stacking
6. Pig with hammer + carryover + pig multiplier — the kitchen sink: verify multiplicative stacking and zero-sum
7. Pig with 3 players — Wolf pigged plays 1v2
8. Pig with 5 players — Wolf pigged plays 1v4
9. Pig on a tied hole (with carryover) — verify carryover increments correctly when pig hole ties

**Property tests (wolf.properties.test.ts):**
10. Include `pigEnabled: true` with random pig multipliers in the arbitrary config generator
11. Verify zero-sum holds with pig across all player counts
12. Verify pig results never have the wrong player going solo

---

## Fix 3: Add Hammer Test Coverage (Wolf-Specific)

### The Problem

Hammer is fully implemented and UI-wired but has zero Wolf-specific tests. The shared hammer module has its own tests, but Wolf-specific integration (hammer + carryover stacking, hammer + pig, hammer forfeit overriding best-ball) is untested.

### What To Add

**Unit tests:**
1. Basic hammer: one team hammers, other takes — verify 2x point value
2. Hammer escalation: hammer → re-hammer → verify 4x
3. Triple hammer: hammer → re-hammer → re-hammer → verify 8x
4. Hammer drop/forfeit: team declines hammer — verify they lose the hole at current (pre-hammer) multiplier, and best-ball scoring is overridden
5. Hammer + carryover: 2 tied holes, then hammer on hole 3 — verify carryover(3) × hammer(2x) = 6x points
6. Hammer + pig: Wolf is pigged AND there's a hammer — verify all multipliers stack correctly and zero-sum holds
7. Hammer + birdie bonus: winning team's best ball is birdie, hammer is active — verify bonus × hammer stacking
8. Hammer on a tie (with carryover): hammer thrown, hole ties — verify carryover increments and hammer state resets appropriately for next hole

**Property tests:**
9. Include `hammerEnabled: true` in arbitrary config generator
10. Verify zero-sum holds with hammer across all player counts

---

## Fix 4: Add Birdie/Eagle Bonus Test Coverage

### The Problem

Calculation logic exists but every test sets `birdieMultiplierEnabled: false`. The 2x/4x stacking behavior is unverified.

### What To Add

**Unit tests:**
1. Birdie bonus only: winning team's best ball is birdie — verify 2x multiplier applied
2. Eagle bonus: winning team's best ball is eagle — verify birdie(2x) × eagle(2x) = 4x
3. Bonus on a loss: losing team had birdie — verify bonus is NOT applied (only winning team's best ball counts)
4. Bonus on a tie: both teams birdie, hole ties — verify no bonus applied (ties get 0 points)
5. Bonus + hammer: birdie + hammer active — verify multiplicative stacking
6. Bonus + carryover: birdie on a hole with 3 carryovers — verify stacking
7. Bonus + pig: Wolf pigged, wins with birdie — verify pig × birdie stacking

**Property tests:**
8. Include `birdieMultiplierEnabled: true` and `eagleMultiplierEnabled: true` in arbitrary config generator with random multipliers
9. Verify zero-sum holds with bonuses active

---

## Fix 5: Add Multiplier Cap Test Coverage

### The Problem

`maxMultiplier` capping logic exists but no test ever exercises it.

### What To Add

**Unit tests:**
1. Scenario that would exceed cap: carryover(4) × status(3x blind) × hammer(4x) = 48x, with maxMultiplier set to 32 — verify capped at 32
2. Scenario at exactly the cap — verify not reduced
3. Scenario under the cap — verify no capping applied
4. Cap with zero-sum verification — verify settlement still sums to zero when capping is applied (this is the tricky one — capping one player's multiplier shouldn't break the other side's payout)

**Property tests:**
5. Include random `maxMultiplier` values in arbitrary config generator
6. Verify zero-sum invariant holds with capping

---

## Fix 6: Clean Up Dead Code

### The Problem

Two config fields exist in types and Zod schemas but are never used by the engine. This makes the codebase misleading — it looks like these features are implemented when they're not.

### Option A (Preferred): Wire Them Up

**lastPlaceWolfEnabled:**
- `getWolfForHole()` already accepts a `_config` parameter (placeholder). Implement the override: when `lastPlaceWolfEnabled` is true and hole is 17 or 18, return the player in last/second-to-last place instead of the modulo rotation result.
- Add a toggle in the config form UI.
- Add tests: verify last-place player is Wolf on 17, second-to-last on 18. Verify normal rotation on holes 1-16. Verify 3-player and 5-player variants.

**wolfTees:**
- `getTeeOrderForHole()` already works but is never called. If this is genuinely useful for any UI display, wire it up. If not, remove it.
- Fix the default inconsistency: `useRoundSetup.ts` defaults to 'last', Convex converter defaults to 'first'. Pick one.

### Option B (Acceptable): Remove Them

If these aren't shipping soon, remove the dead config fields, Zod schema entries, and unused functions. Clean codebase > aspirational code.

### Either Way

- Remove the `_config` underscore prefix from `getWolfForHole()` if implementing lastPlaceWolf, or remove the parameter entirely if not.

---

## After All Fixes

1. Run the full Wolf test suite and verify everything passes
2. Run property tests and confirm zero-sum holds with ALL features enabled (pig + hammer + bonuses + carryover + cap)
3. Let me know the final test count and any issues you encountered
4. If the Pig mechanic fix changed any user-visible behavior, note what the UX impact is (e.g., does the confirmation dialog text need to change?)

---

## Summary Table

| Fix | Type | Risk Level | Why |
|-----|------|------------|-----|
| 1. Pig mechanic | Bug fix | **High** | Wrong player goes solo — contradicts our own spec |
| 2. Pig tests | Test coverage | **High** | Money feature with zero tests |
| 3. Hammer tests | Test coverage | **High** | Money feature with zero Wolf-specific tests |
| 4. Bonus tests | Test coverage | **Medium** | Money feature untested |
| 5. Cap tests | Test coverage | **Medium** | Safety feature untested |
| 6. Dead code | Cleanup | **Low** | Misleading but harmless |
