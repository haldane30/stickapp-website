# Snake — Feature Audit & Gap Analysis

> Audit source: Claude Code feature audit of the Snake game engine (February 28, 2026)
> Original doc: Snake game rules doc (V1.0, January 2026)
> Gap analysis: Compared against original doc, web research (Golf Digest, Golf Monthly, Golf Compendium, Beezer Golf, Long Bombs Golf, Golf News Net), and game-aliases.md

---

## Section 1: Stick Does This

These are confirmed, implemented features we can claim in the game guide.

### Configuration (6 fields)
- **stakeAmount** — Any positive number, default $5. The base dollar amount at risk.
- **stakeModel** — 'fixed', 'perThreePutt', or 'doubling'. How the snake value evolves.
- **doublingStartAmount** — Optional. Decouples the first-double seed from stakeAmount. Only used when stakeModel is 'doubling'.
- **sameHoleRule** — 'lastToHole', 'higherPuttCount', or 'split'. Determines who gets the snake when multiple players three-putt on the same hole.
- **structure** — '18hole' or 'frontBackSeparate' (NOTE: frontBackSeparate is declared but NOT implemented — see Section 3)

### Core Mechanic
- Three-putt detection: any player with 3+ putts from the green on a hole
- Hot potato transfer: snake passes to whoever three-putted last
- Only reads the `putts` field — gross score is irrelevant
- Every three-putt event is independently recorded (even when multiple occur on the same hole)
- Four-putts and worse are treated as three-putts (puttCount recorded for display)

### Same-Hole Resolution (3 rules)
- **lastToHole (default):** Last player to finish putting among the three-putters gets the snake
- **higherPuttCount:** Player with more putts gets the snake (4-putt beats 3-putt). Ties fall back to lastToHole.
- **split:** Declared but incomplete — falls through to lastToHole for holder determination (see Section 3)

### Stake Models (3 options)
- **Fixed:** Snake value is always exactly stakeAmount. Never changes regardless of how many three-putts occur.
- **Per Three-Putt (pot):** Value = stakeAmount × totalThreePutts. Accumulates across all players' three-putts, not just transfers.
- **Doubling:** Value doubles each three-putt: startAmount × 2^(n-1). First three-putt = $5, second = $10, third = $20, etc.

### Settlement
- **One-to-many model:** Snake holder at round's end pays the current snake value to each other player
- Line-item breakdown: one SettlementLineItem per non-holder player
- Zero-sum verified (property test, 100 random iterations)
- Integer cent arithmetic internally (toCents/toDollars/multiplyCents)
- No three-putts all round = no settlement (currentHolder = null, value = 0)

### Player Count
- Minimum: 2 players
- No hard cap (tests exercise 2-4)
- Fully flexible — settlement scales linearly (holder pays N-1 players)

### Architecture
- Pure functional / stateless engine
- Score corrections trigger full recalculation from scratch
- Shared currency module (toCents, toDollars, multiplyCents)
- whatHappened narrative generator for drama (transfers, escapes, close calls, value changes)
- Viewer-perspective selectors ("You have the snake" vs "Mike has the snake")
- 55 tests (26 unit + 20 property-based + 6 selector + 3 narrative functions)
- Property tests verify: holder invariants, zero-sum settlement, value correctness per model, event consistency, temporal ordering

### Edge Cases Handled
- No three-putts all round → no settlement
- All players three-putt same hole → all events recorded, sameHoleRule resolves holder
- Missing putts field → treated as 0 (no three-putt)
- Partial round → engine processes only holes with scores, valid at any point
- 4-putt or worse → treated as three-putt, actual count recorded

---

## Section 2: Common Variations (Document Educationally, Don't Claim Stick Supports)

These are real things golfers do that the Snake engine does not currently handle. The game guide should explain them as "how some groups play it" without implying Stick tracks them.

### Front 9 / Back 9 Separate Settlement
**In the original doc (Section 6.1-6.2), declared in engine type but NOT implemented.** The config accepts 'frontBackSeparate' but the calculator ignores it — always processes holes 1-18 as one sequence. The idea: play two separate snake games, settle the front 9 holder and back 9 holder independently. Multiple web sources confirm this is a real variation. Prevents a player from "escaping" early and coasting.

**How common:** Moderately common. Several sources mention it as an option.

**Guide treatment:** Mention as a variation some groups play. Note that Stick currently runs Snake as a single 18-hole game.

**Feature gap?** Medium priority. The type is already declared — just needs calculator implementation to split processing at the turn.

### The Zoo / Animal Game
**In the original doc (Section 7), NOT in the engine.** Snake is often part of a larger "Animal Game" where different errors earn different animals: Camel (bunker), Frog/Fish (water), Gorilla (OB), Skunk (double bogey), etc. Each animal works like its own independent snake — last holder pays. Multiple sources confirm this is widely played. "Going to the Vet" (holing out from off the green to shed an animal) is a common Zoo rule.

**How common:** Very common as a concept. Many groups play a simplified version with 2-3 animals rather than the full zoo.

**Guide treatment:** Dedicated section explaining the Zoo concept and common animals. Educational — don't claim Stick tracks it. The doc notes Zoo is a V2+ feature.

**Feature gap?** Low priority for Snake specifically (V2+ roadmap item). The engine architecture would need multiple independent "snake" trackers running in parallel.

### Beginner Adjustment (4-Putt Threshold)
**NOT in original doc or engine.** Some groups let high-handicappers need a 4-putt (not 3-putt) to get the snake. Mentioned by Long Bombs Golf as a standard house rule for beginners.

**How common:** Uncommon in competitive groups. More of a teaching/beginner accommodation.

**Guide treatment:** Brief mention in a tips section. One sentence.

**Feature gap?** No. Too niche. Groups can informally agree to this.

### Double Bogey Snake (Alternative Trigger)
**NOT in original doc or engine.** Some groups use double bogey (or worse) as the trigger instead of three-putts. This changes Snake from a putting game to a scoring game.

**How common:** Uncommon. Only one source mentions it. Changes the fundamental nature of the game.

**Guide treatment:** Brief mention as a house rule variant. One sentence.

**Feature gap?** No. This is essentially a different game.

### Escalating by Hole (Time-Based Stakes)
**In the original doc (Section 4.4), NOT in the engine.** Stakes increase as the round progresses: holes 1-6 at $1, 7-12 at $2, 13-18 at $3. Creates more drama on the back nine.

**How common:** Uncommon. Only the original doc mentions it. No web sources reference this specific variation for Snake (though escalating stakes exist in other games).

**Guide treatment:** Brief mention as a creative house rule.

**Feature gap?** Low priority. Niche variation, not widely practiced.

### Split Settlement (When Multiple Three-Putt Same Hole)
**In the original doc (Section 3.5), declared in engine but NOT fully implemented.** The 'split' sameHoleRule is in the config type but the settlement code doesn't implement split-specific logic — it falls through to lastToHole. The idea: when two players three-putt on the same hole, they share the snake and pay reduced amounts.

**How common:** Rare. Most groups use "last to hole out" as the standard.

**Guide treatment:** Brief mention as a house rule.

**Feature gap?** Low priority. The lastToHole default is the standard. If implemented, would need to define exactly how "split" settlement works (half penalty each? Both full penalty?).

### Rubber Snake Token
**NOT in doc or engine.** Multiple web sources mention groups carrying an actual rubber snake that gets passed around. Pure culture/tradition, not a feature.

**How common:** Common enough that multiple sources mention it. A fun detail.

**Guide treatment:** Worth a sentence in the guide for personality/color. "Some groups carry a rubber snake and make the holder display it on their bag."

### Multi-Round Play (Golf Trips)
**NOT in original doc or engine.** Playing Snake across multiple rounds (e.g., a 3-day golf trip). The doubling model gets brutal over 54+ holes.

**How common:** Uncommon for regular play. Common on golf trips.

**Guide treatment:** Brief mention as a golf-trip variation.

**Feature gap?** No. This is a social convention, not an engine feature.

### No Doubling Cap
**Not a variation — but a user safety concern.** The engine has no max value cap on the doubling model. 18 three-putts at $1 start = $131,072. The audit flagged this. While it's technically correct (the doubling math is right), it's worth documenting for users.

**Guide treatment:** Include a warning table showing how doubling escalates, and recommend starting low ($0.10 or $0.25).

---

## Section 3: Feature Gaps (Things the App Should Probably Support)

### 1. Front/Back Separate Structure — Medium Priority
- **Why:** Config type already declares it, multiple sources confirm it's real, prevents coasting
- **Scope:** Calculator needs to split processing at hole 9, track two independent snake holders, produce two settlement blocks
- **The type work is done** — just needs calculator implementation

### 2. Split Same-Hole Rule — Low Priority
- **Why:** Config type declares it, but settlement doesn't implement split logic
- **Scope:** Define what "split" means for settlement (half penalty each? both full?), then implement
- **Not urgent** — lastToHole is the standard and nobody complains about it

### 3. Doubling Cap — Low Priority (UX/Safety)
- **Why:** No max value means the doubling model can produce absurd amounts
- **Scope:** Add optional `doublingMaxValue` field to config. When value would exceed cap, it stays at cap.
- **Not a correctness issue** — just a UX guardrail

---

## Summary

The Snake engine covers the core game thoroughly. The three stake models (fixed, per-three-putt, doubling) match how golfers actually play Snake in the wild. Same-hole resolution with lastToHole as default is correct. Zero-sum settlement, integer cent arithmetic, pure functional architecture, 55 tests — all solid.

The two incomplete features (frontBackSeparate structure, split same-hole rule) are declared in the type system but not implemented in the calculator. Of these, frontBackSeparate is the more useful one — it's a real variation that multiple sources confirm.

No handicap support is correct — Snake is purely about putting, not relative scoring.

For the game guide: we have everything we need. The engine supports the standard game and all three common betting models. The Zoo/Animal game is the biggest educational opportunity — it's well-known, widely played, and we can cover it as context without claiming Stick tracks it. The lack of a doubling cap is worth a prominent warning in the guide.
