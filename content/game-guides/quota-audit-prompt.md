# Quota (Chicago) — Feature Audit Prompt

> **Context:** Quota is the 12th and final game in Stick's lineup. It was built with the Events feature in mind (multi-group tournaments for 20-30+ players). This audit is critical because Quota is the only game designed to scale beyond a single foursome. Copy this prompt into Claude Code in the app repo (`Stick/`).

---

## Prompt

Run a full feature audit of the **Quota** game engine. I need this to write the game guide for the website. Quota (also called Chicago or Point Quota) is a points-based game where each player has a target score derived from their handicap, and they earn points for scoring relative to par on each hole. The player who exceeds their quota by the most wins.

Cover these areas in detail:

**1. Configuration fields** — List every configurable option with its type, allowed values, and default. Include: point values per scoring level (eagle, birdie, par, bogey, double+), target/quota calculation method, dollar-per-point or fixed payout, scoring mode (net/gross), handicap settings, any tournament/event-related fields, and any per-player or per-hole settings. Note which fields are optional or conditional.

**2. Point system** — This is the core mechanic. How does the engine assign points per hole? Walk through:
- What point values are used? (Common system: eagle = 4, birdie = 3, par = 2, bogey = 1, double bogey+ = 0)
- Is this configurable or hardcoded?
- Are points based on net score or gross score?
- How are points assigned on holes where the player gets handicap strokes?
- What happens with scores worse than double bogey (triple, quad, etc.)?

**3. Quota/target calculation** — How does each player's quota get set?
- Is it handicap-based? What's the formula? (Common: 36 minus handicap = quota)
- Does it use courseHandicap, playingHandicap, or handicapIndex?
- Can quotas be manually set/overridden?
- Is the quota calculated once at round start, or does it adjust?
- What happens if a player doesn't have a handicap?

**4. Settlement** — How is the final payout calculated? Several models exist:
- Point pool: all players contribute, winners split the pot based on how much they exceeded quota
- Fixed per-point: dollar amount per point over/under quota
- Pairwise: each player settles against each other player (unlikely for Quota but check)
- Does the engine support multiple settlement models?
- Is it zero-sum? How is the math verified?
- Integer cent arithmetic?

**5. Handicap support** — Net vs gross modes. How do handicap strokes interact with point scoring? If a player gets a stroke on a hole and shoots gross bogey (net par), do they get par points (2) or bogey points (1)? This is the key question for Quota.

**6. Player count** — What's the range? Minimum? Maximum? Quota is supposed to scale to 20-30+ players for the Events feature. Does the engine enforce limits? How does it handle large player counts in terms of performance and settlement?

**7. Scoring variants** — Does the engine support any of these common variations?
- Modified Stableford (different point values, e.g., eagle = 5, birdie = 2, par = 0, bogey = -1, double = -3)
- Double points on par 3s or par 5s
- Bonus points for specific achievements (chip-ins, longest drive, etc.)
- Different point scales (some groups use 8-5-3-1-0 instead of 4-3-2-1-0)
- "Wipe out" rule (if you go over a certain score on a hole, you get negative points)

**8. Leaderboard and ranking** — How does the engine rank players?
- By total points? By points over/under quota? By percentage of quota achieved?
- How are ties broken?
- Is there a running leaderboard during the round?
- What does the "leader" display look like mid-round?

**9. Edge cases** — What happens with:
- Missing scores on a hole (player picks up / no score entered)
- Score corrections mid-round
- Very high handicap players (30+) — do they get more strokes than holes?
- Players with 0 handicap (scratch) — is their quota 36?
- Partial rounds (9 holes only)
- Holes with par other than 3/4/5 (par 6, etc.)

**10. Test coverage** — How many dedicated tests? Any property-based invariant checks? What do they verify? How many random iterations per property test? What's the overall test health?

**11. Architecture** — Pure functional? Stateless? Score correction behavior? Shared modules with other games? Any known limitations, TODOs, or incomplete features in the code? Any code comments about future plans or Events integration?

**12. UI integration** — What does the scorecard/viewer look like for Quota? What selectors exist? Do they show:
- Running point total per player?
- Points over/under quota?
- Leaderboard ranking?
- Per-hole point breakdown?
- Any display bugs or selector assumptions?

**13. Events readiness** — This is critical for future plans. How well does the Quota engine scale?
- Can it handle 20-30 players in a single instance?
- Is there any cross-group aggregation logic?
- Are there any fields or interfaces designed for multi-group tournament use?
- Any code comments or TODOs referencing Events?
- What would need to change to support multi-group leaderboards?

**Output format:** Provide a bullet-point feature audit organized by these 13 categories. List every capability so I can compare against web research on how golfers actually play Quota/Chicago to identify feature gaps. Also preserve the full raw output — I'll save it alongside the gap analysis.

**Bonus context from research:** Quota is one of the most popular formats for large-group golf outings and weekly club games. The standard point system is eagle = 4, birdie = 3, par = 2, bogey = 1, double+ = 0. Target is typically 36 minus handicap. The game is popular because it works for any number of players (they don't need to be in the same group), everyone plays their own ball, and the handicap system makes it fair across ability levels. "Chicago" and "Quota" are used interchangeably. Modified Stableford is a related format that uses a different (sometimes negative) point scale and is used on the PGA Tour's alternate events.
