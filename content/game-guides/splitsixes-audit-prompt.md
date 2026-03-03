# Split Sixes — Feature Audit Prompt

> **Context:** This is for the 3-player point-distribution game, NOT the 4-player rotating partnership game (which was audited separately as "Sixes"). Split Sixes is a separate game in Stick's codebase. Copy this prompt into Claude Code in the app repo (`Stick/`).

---

## Prompt

Run a full feature audit of the **Split Sixes** game engine. I need this to write the game guide for the website. This is the 3-player game where 6 points are distributed per hole based on scoring position (4-2-0, or 3-2-1 on ties, etc.) — NOT the 4-player rotating partnership Sixes game (that's already audited).

Cover these areas in detail:

**1. Configuration fields** — List every configurable option with its type, allowed values, and default. Include: point value per point (dollar amount), scoring mode (net/gross), handicap settings, any variation toggles, tie distribution rules, and any per-hole or per-player settings. Note which fields are optional or conditional.

**2. Point distribution system** — This is the heart of the game. How does the engine distribute 6 points per hole? Walk through every scenario:
- Clear winner (all three different scores): expected 4-2-0
- Two-way tie for best: how are points split? (expected 3-3-0 or 3-2-1 depending on variant)
- Two-way tie for worst: how are points split? (expected 4-1-1)
- Three-way tie: how are points split? (expected 2-2-2)
- Does the 6-point total always hold, or can points be lost/gained in edge cases?

**3. Tie handling in detail** — This is where Split Sixes gets complicated. Different groups handle ties differently. Document exactly what the engine does for each tie scenario and whether it's configurable. Specifically:
- Two tied for low: does the engine do 3-3-0 (split the top two prizes) or 3-2-1 (winner/middle/loser)?
- Two tied for high: does the engine do 4-1-1 (split the bottom two)?
- All three tied: 2-2-2?
- Is any of this configurable or hardcoded?

**4. Handicap support** — Net vs gross modes. Stroke index allocation. Off-low-man calculation. Does it support partial handicap percentages (50%, 80%) or only full/none? How do handicap strokes affect the point distribution?

**5. Settlement** — How is the final payout calculated? Points accumulated over 18 holes, then what? Pairwise settlement (each player pays/collects based on point differential vs each other player)? Or pooled? Show the math for a sample round. Is it zero-sum verified? Integer cent arithmetic?

**6. Player count** — Is it locked to exactly 3 players, or does it support 2 or 4+? If locked to 3, what validation exists? What happens if the engine receives 2 or 4 player scores?

**7. Variations & special rules** — List every optional variation the engine supports. Things I'd expect based on research:
- Junk/bonus points (extra point for birdies, eagles, chip-ins on top of the 6)
- Double points on par-3s
- "Nasty" rule (if you get 0 points, you owe extra)
- Point carry on ties (if all three tie, do the 6 points carry to the next hole?)
- Different base point distributions (some groups play 5-3-1 or 6-3-0 instead of 4-2-0)

**8. Edge cases** — What happens if a player doesn't finish a hole (no score)? Score corrections mid-round? Missing inputs? Hole-18-specific logic (final settlement, carryover resolution)?

**9. Test coverage** — How many dedicated tests? Any property-based invariant checks? What do they verify (6-point conservation per hole, zero-sum settlement, ranking correctness, tie distribution)? How many random iterations per property test?

**10. Architecture** — Pure functional? Stateless? Score correction behavior? Shared modules with other games (currency, handicap, settlement)? Any known limitations, TODOs, or incomplete features in the code? Any code comments about future plans?

**11. UI integration** — What does the scorecard/viewer look like for Split Sixes? What selectors exist? Do they show running point totals? Per-hole point breakdown? Any display bugs or selector assumptions (like the Skins pot/escalating issue)?

**Output format:** Provide a bullet-point feature audit organized by these 11 categories. List every capability so I can compare against web research on how golfers actually play Split Sixes to identify feature gaps. Also preserve the full raw output — I'll save it alongside the gap analysis.

**Bonus context from research:** The most common names for this game are Split Sixes, 6-Point Game, English, and Cricket. The standard distribution is 4-2-0 with clear winner, 3-3-0 for two tied for best, 4-1-1 for two tied for worst, 2-2-2 for all tied. It's most popular as a 3-player game in Europe/Australia and is gaining traction in the U.S. Settlement is typically pairwise (each player settles against each other player based on point differential). Some groups play "double or nothing" on the last hole or add junk points on top.
