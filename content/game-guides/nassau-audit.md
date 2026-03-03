# Nassau — Feature Audit Gap Analysis

> Date: February 27, 2026
> Source: Claude Code feature audit of Nassau engine
> Compared against: Both Nassau game rules docs + web research on how golfers actually play

---

## 1. Stick Does This (Features to Highlight in Guide)

These are implemented, tested, and can be claimed in the game guide.

### Core Game
- **Three independent bets** (front, back, overall) — invariant-tested across 100 random configs
- **Match play scoring** — hole-by-hole comparison, holes won/lost tracked per segment
- **Independent segment amounts** — front, back, and overall can be set to different values (e.g., $5-$5-$10)
- **Net and gross scoring** — configurable per game, uses upstream handicap calculation
- **Dormie / early closure** — match closes when lead exceeds remaining holes (mathematically insurmountable)

### Press System (This is our competitive moat)
- **Auto-press at 2-down** — triggers automatically, no user interaction needed
- **Manual press** — user-initiated, eligible when 1+ holes down
- **Press-the-press chains** — unlimited cascading (Press 1 → Press 2 → Press 3...)
- **Configurable press amounts** — same, half, or double the original bet
- **Max presses per segment** — configurable cap (1-5 or unlimited)
- **No-press-after-hole cutoff** — configurable absolute hole number
- **Press on strategic holes** — re-triggers on holes 5 and 7 of a segment when still 2+ down

### Team Play
- **Individual (1v1)** — direct head-to-head
- **2v2 Best Ball** — each team's lowest score competes per hole
- **2v2 Combined** — sum of both teammates' scores per hole
- **4-way settlement in team play** — each loser pays each winner (4 line items per bet)

### Settlement
- **Integer cent arithmetic** — no floating point errors, ever
- **Zero-sum verification** — development assertion fires if settlement doesn't balance; property-tested across 100 random configs
- **Line-item breakdown** — each bet and press settles independently with description ("Front 9 - 3 UP")
- **Halved bets produce no settlement** — clean push handling

### Score Corrections
- **Full recalculation on correction** — pure functional engine means same inputs always produce same outputs
- **Press math updates correctly** — corrected scores flow through press calculations automatically
- **Stored presses persist** — a press that was triggered remains even if the correction means it "wouldn't have been triggered" (the money math is still correct)

### Architecture (E-E-A-T talking point)
- **Pure functional engine** — stateless, deterministic, same inputs always produce same outputs
- **13 property-test invariants** verified across 100 random configurations
- **Clean separation** — Nassau calculator handles 3 original bets; press system handles all presses; merged only at settlement

---

## 2. Common Variations (Document Educationally — Don't Claim Stick Tracks These)

These are real things golfers do that Stick's Nassau engine does NOT currently support. The game guide should explain these as variations golfers play, but should NOT say "Stick handles this."

### Ways Games
- **What it is:** Pre-weighted Nassau where front/back/overall have different point values (1-2-2, 1-1-2, 1-2-3). Sometimes includes automatic 1-way presses.
- **How common:** Moderately common in competitive club play, especially in organized groups.
- **Guide treatment:** Explain in Variations section. Note that golfers can approximate this in Stick by setting different amounts for front/back/overall (e.g., $5-$10-$10 for a 1-2-2 Ways). The automatic 1-way press part is not supported.
- **Feature gap?** Low priority. The independent amounts already cover the core use case. The automatic 1-way press is niche.

### Aloha
- **What it is:** A final-hole press bet for half the guaranteed take. Adds drama to hole 18.
- **How common:** Uncommon. Regional, mostly seen in high-stakes club games.
- **Guide treatment:** Brief mention in Variations section. One sentence explaining what it is.
- **Feature gap?** No. Too niche to justify implementation.

### Adjust Bet
- **What it is:** After the front 9, the losing team can propose an "adjusted" bet for the back 9 — essentially a fresh-start side bet with modified terms.
- **How common:** Uncommon. More of a house rule than a standard variation.
- **Guide treatment:** Brief mention in Variations section.
- **Feature gap?** No. This is an informal agreement between players, not something an app needs to automate.

### Doubling the Back 9
- **What it is:** All back 9 bets and presses are worth double their face value.
- **How common:** Moderately common as a house rule.
- **Guide treatment:** Mention in Variations section. Note that golfers can set this up in Stick by doubling the back 9 amount manually (e.g., $5-$10-$5).
- **Feature gap?** Low priority. Users can work around it. An automatic "double the back" toggle would be a nice-to-have, not a must.

### Junk / Garbage / Dots as Nassau Companion
- **What it is:** Side bets (greenies, sandies, barkies) tracked alongside the Nassau and added to the final settlement.
- **How common:** Very common. Many groups play Nassau + Junk together.
- **Guide treatment:** Mention that many groups pair Nassau with Junk (link to Junk guide). Note that in Stick, these are separate games that can be run simultaneously on the same scorecard.
- **Feature gap?** Not a Nassau engine gap — this is handled by the multi-game-per-scorecard feature. Worth confirming this works smoothly.

### Stroke Play Nassau
- **What it is:** Instead of match play (win/lose each hole), total strokes per segment determine the winner.
- **How common:** Less common than match play Nassau, but some groups prefer it because it works better for 3+ players.
- **Guide treatment:** Mention in Variations section. Be honest: "Stick currently supports match play Nassau. Stroke play Nassau, where total strokes determine the winner, is a variation some groups play."
- **Feature gap?** See Feature Gap section below.

### Press Acceptance (Decline a Press)
- **What it is:** In some (mostly older) rule sets, the opponent can decline a press.
- **How common:** Very rare in modern play. Traditional etiquette says you must accept.
- **Guide treatment:** Mention briefly: "Traditionally, declining a press is considered bad form. Most groups play mandatory acceptance."
- **Feature gap?** The field exists in the config but is never read by the engine. This is fine — mandatory acceptance is the right default and covers 99% of groups.

---

## 3. Feature Gap List (Potential Tasks for Claude Code)

### Priority: Resolved

**Stroke Play — Dead Code (FIXED)**
- **The issue:** `scoringFormat: 'strokePlay'` existed as a config option but the engine never branched on it.
- **Resolution:** The UI option has been removed. The field no longer appears in the Nassau config form. The engine type still has the field but no user can select it.
- **Content impact:** Guide covers match play only. Clean.

**pressAcceptance — Dead Field (NOT USER-FACING)**
- **The issue:** The field exists in the type and config but is never read by the engine.
- **Resolution:** Was never wired to the UI. Hardcoded to 'mandatory' in useRoundSetup.ts. No user has ever encountered this.
- **Content impact:** None. We describe the etiquette (always accept) and that matches actual behavior.

### Priority: Resolved — Context for Content

**Strategic hole re-trigger (holes 5 and 7) — CLARIFIED**
- **The facts:** Hardcoded in `isStrategicHoleInSegment()`. Hole 5 = midpoint reminder, hole 7 = last call before no-final-hole restriction.
- **Critical nuance:** Only matters in MANUAL press mode. The re-trigger only fires if no press already exists on that segment. With auto-press on, the press fires the moment you hit 2-down, so the strategic hole check never triggers.
- **Content impact:** In the guide, we explain this as: "In manual mode, Stick will suggest pressing at hole 5 (the midpoint) and hole 7 (last realistic chance) if you're still 2 or more down." We do NOT mention this for auto-press since it's invisible there.

### Priority: Not Needed Now

**Ways Games automatic 1-way press** — Niche. Users can approximate with different amounts.
**Aloha** — Too uncommon to justify engineering time.
**Adjust Bet** — Informal house rule, not app territory.
**Press retraction/cancellation** — The current behavior (stored presses persist, math recalculates) is actually correct. A press that was triggered is a real event — you can't un-ring that bell.

---

## Summary for Content Writing

### What the Nassau Guide CAN Say About Stick
- Tracks all three bets independently with configurable amounts
- Auto-press at 2-down with full press-the-press chain support
- Configurable press restrictions (max per segment, hole cutoffs)
- Line-item settlement with zero-sum verification
- Works for 1v1 and 2v2 (best ball or combined)
- Net or gross scoring
- Score corrections recalculate everything automatically

### What the Nassau Guide CANNOT Say About Stick
- "Supports stroke play Nassau" — the engine only does match play (UI option removed)
- "Lets you accept or decline presses" — always mandatory (which is the standard anyway)
- "Tracks Ways/Aloha/Adjust bets" — not implemented
- "Tracks Junk/Dots alongside Nassau in one scorecard" — Junk runs as a separate scorecard. Groups playing both run two games on the same round.

### Workarounds to Mention
- Want a 1-2-2 Ways game? Set amounts to $5-$10-$10
- Want to double the back 9? Set back amount to 2x front amount
- Want to run Junk alongside Nassau? Add Junk as a second game on the same scorecard
