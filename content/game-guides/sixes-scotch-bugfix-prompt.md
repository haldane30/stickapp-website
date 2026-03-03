# Bug Fix Prompt — Sixes + Scotch Engines

> **Context:** These bugs were found during game engine feature audits for the website game guides. Copy this prompt into Claude Code in the app repo (`Stick/`).

---

## Prompt

Fix the following bugs across the Sixes and Scotch game engines. These were discovered during feature audits. I've grouped them by game and severity. For each fix, write or update tests to cover the corrected behavior.

---

### Sixes Engine — 3 Issues

**Bug #1: "1 & 0" display instead of "1 UP" (Severity: Medium — users will notice)**

When a Sixes match ends on the final hole of a 6-hole segment with a 1-hole lead, the result displays as "1 & 0" instead of "1 UP." This happens because the early-closeout check fires when `holesRemaining === 0`. In golf, "1 & 0" is meaningless — golfers expect "1 UP" when a match is decided on the last hole. Find where the match result string is formatted and add a condition: if `holesRemaining === 0` (or the match ends on the final hole), display the lead as "[N] UP" instead of "[N] & 0".

- Add tests for: 1 UP, 2 UP (when a match goes to the final hole but isn't a closeout)
- Confirm existing "[N] & [M]" early-closeout results still work (e.g., "3 & 2")

**Bug #2: Narrative reports bet amount instead of payout amount (Severity: Medium — user confusion)**

`settlementNarrative.ts` for Sixes reports the per-match bet (e.g., "$10 match") rather than the actual payout amount. Because Sixes uses pairwise settlement, the real exposure is bet × 2 opponents = $20. A user who sees "$10 match" but gets charged $20 will be confused. Update the narrative to show the actual payout amount, or clearly explain that the $10 bet means $10 to each opponent ($20 total if you lose).

- Add narrative tests that verify the dollar amounts shown match actual settlement amounts
- Test with different bet amounts ($5, $10, $25) to make sure the math is right

**Bug #3: Infinite loop risk in `calculateStrokeHoles` (Severity: Low — not triggerable today, but latent)**

When `courseHoles` is empty and `playingHandicap` is non-zero, the while loop in `calculateStrokeHoles` runs forever. This can't happen in practice right now (empty courses produce equal handicaps = 0 strokes), but it's a ticking time bomb. Add a defensive guard — if `courseHoles` is empty, return an empty stroke allocation immediately before entering the loop.

- Add a test with empty `courseHoles` and non-zero handicap to confirm it returns safely

---

### Scotch Engine — 3 Issues

**Bug #4: maxMultiplier never reaches the engine (Severity: Medium — HIGH PRIORITY, fix before launch)**

This is the most important fix. The UI lets users toggle "Cap Multipliers" and set a value, but the config mapping pipeline drops the field before it reaches the engine. Two files need changes:

1. **`useRoundSetup.ts`** — When building the Scotch engine config from UI state, `maxMultiplier` is not included. Add it to the config object that gets passed to the engine.
2. **`convexGameConfig.ts`** — The Scotch field mapper doesn't include `maxMultiplier` in its mapping. Add it.

The engine itself already supports `maxMultiplier` — it's the pipeline from UI → storage → engine that's broken. Without this fix, users who enable caps get zero protection. With umbrella + re-rolls enabled, exposure is theoretically unbounded.

- Add integration tests that verify: (a) maxMultiplier flows from UI config to engine, (b) the engine actually caps the multiplier at the configured value, (c) umbrella + roll combinations respect the cap
- Test edge cases: cap of 1 (no multiplication allowed), cap of 2 with umbrella (should cap at 2x, not allow umbrella to push to 12x)

**Bug #5: `proxPlayerThreePutt` data never populated from UI (Severity: Low — feature is non-functional)**

The config toggle "3-Putt Loses Prox" exists and the engine evaluator checks `ctx.holeInput.proxPlayerThreePutt`, but the score entry flow never sets this field. `RoundContext.tsx` creates `ScotchHoleInput` with only `holeNumber` and `proxWinner` — no 3-putt data. The app already tracks 3-putts for Snake/Junk, so the data exists somewhere in the round context.

- Find where 3-putt data is collected for Snake/Junk
- Pipe that same data into `ScotchHoleInput.proxPlayerThreePutt` during Scotch score entry
- Add tests: (a) when toggle is ON and prox winner 3-putted, prox point is voided, (b) when toggle is OFF, 3-putts don't affect prox, (c) when toggle is ON and prox winner did NOT 3-putt, prox is awarded normally

**Bug #6: Game Info Sheet missing multiplier cap docs (Severity: Cosmetic)**

`GameInfoSheet.tsx` documents all Scotch configuration options except "Cap Multipliers." Users who discover the toggle have no rules explanation on the info sheet. Add a description that explains: what the cap does, what the default is (no cap), and how it interacts with umbrella and roll (caps the combined multiplier, so if cap is 4x, umbrella × roll can't exceed 4x).

- No test needed, but verify the info sheet renders the new text correctly

---

### Testing Summary

After all fixes, run the full Sixes and Scotch test suites to make sure nothing regressed. List the test counts before and after so I can verify coverage increased. If any of these fixes touch shared modules (like the match result formatter or stroke allocation), run those shared module tests too.
