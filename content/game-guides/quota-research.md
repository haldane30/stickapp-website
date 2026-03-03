# Quota Golf Game Research — Wild-Play Documentation

**Last Updated:** March 1, 2026

This document captures comprehensive research on how golfers actually play Quota (also called Chicago, Point Quota) in the wild. It covers rules, settlement models, variations, large-group usage, strategy, and regional naming. This research informs the Quota game guide draft and identifies feature gaps vs. real-world play.

---

## 1. RULES AND POINT SYSTEMS

### The Standard Point System

All sources agree on the same point value scale:
- **Bogey:** 1 point
- **Par:** 2 points
- **Birdie:** 4 points
- **Eagle:** 8 points
- **Double Eagle:** 16 points (rare, mentioned in some sources)

**Double Bogey and Worse:** Most sources default to **0 points** (you can "pick up" after a double bogey and move to the next hole). One source (GolfLeagueTracker) mentions **-1 point for triple bogey** in some leagues, but this is non-standard.

**Source:** [LiveAbout: How to Play a Quota Golf Game](https://www.liveabout.com/play-a-quota-golf-tournament-1564249), [Golf Digest: How to play Chicago](https://www.golfdigest.com/story/how-to-play-chicago-golf-game-explained), [GolfCompendium: The Chicago Golf Format Explained](https://www.golfcompendium.com/2023/08/chicago-golf-format.html)

### Alternative Point Scales (Rare)

One source mentions a variation: "Eagle=8pts, Birdie=5, Par=3, Bogey=1" but this is presented as an Excel experiment, not standard practice.

**Source:** [GolfWRX: Quota points excel program](https://forums.golfwrx.com/topic/774704-quota-points-excel-program/)

---

## 2. QUOTA/TARGET CALCULATION

### The Dominant Formula: "36 Minus Handicap"

**36 minus handicap** is the most common baseline across all sources.

- A 10-handicap golfer: Quota = 36 - 10 = **26 points**
- A 15-handicap golfer: Quota = 36 - 15 = **21 points**
- A 20-handicap golfer: Quota = 36 - 20 = **16 points**
- Scratch golfer (0 hc): Quota = 36 points

**Sources mentioning 36 as standard:** [CaddieHQ: How to Play the Quota Golf Game](https://www.caddiehq.com/resources/how-to-play-quota-golf-game), [TheGolfNewsNet: Golf betting games: How to play Quota](https://thegolfnewsnet.com/golfnewsnetteam/2016/07/06/golf-betting-games-how-to-play-quota-rules-46071/), [GreatGamesForGolfers: Quota](https://greatgamesforgolfes.com/golf-games/quota/), [Beezer Golf: Quota Tournament Guide](https://www.beezergolf.com/games-guide/Quota-tournament), [LiveAbout](https://www.liveabout.com/play-a-quota-golf-tournament-1564249)

### The "39 Minus Handicap" Variant (The "Chicago" Formula)

**39 minus handicap** is the alternative used in the "Chicago" variant (also called "Thirty-Nines" or "39s"):

- A scratch golfer: Quota = 39 - 0 = **39 points** (vs 36 in standard Quota)
- A 1-handicap: Quota = 39 - 1 = **38 points**
- A 10-handicap: Quota = 39 - 10 = **29 points**
- A 20-handicap: Quota = 39 - 20 = **19 points**

**Why 39?** In a perfect round, an average golfer would score 18 pars (18 holes × 2 points per par = 36 points). The "39" provides a slightly higher baseline that assumes a solid, slightly better-than-handicap performance. This makes the target more challenging than the 36-point version.

**Sources:** [Golf Digest: How to play Chicago](https://www.golfdigest.com/story/how-to-play-chicago-golf-game-explained), [GolfCompendium: The Chicago Golf Format Explained](https://www.golfcompendium.com/2023/08/chicago-golf-format.html), [Beezer Golf: Chicago Game Guide](https://www.beezergolf.com/games-guide/Chicago), [MyScoreCard: Chicago](https://www.myscorecard.com/cgi-bin/knowledgecenter.pl?mode=article&category=golf_games&file=chicago&article=Chicago)

### GolfWRX Forum Debate: 36 vs 39

A GolfWRX thread explicitly addresses this question. The consensus:
- **36 minus is more common** in casual play
- **39 minus (Chicago variant) is also valid**, just makes the game slightly harder
- The key is that **your group agrees on which baseline before you tee off**
- Some groups use **38** as a middle ground

**Source:** [GolfWRX: Quota game 36 vs 39](https://forums.golfwrx.com/topic/1501714-quota-game-36-vs-39/)

### Minimum Quota for High Handicaps

For golfers with handicaps 36+, the minimum quota is typically **2-3 points** (calculated using 36 or 39 as the base).

**Source:** [GolfCompendium: The Chicago Golf Format Explained](https://www.golfcompendium.com/2023/08/chicago-golf-format.html)

---

## 3. SETTLEMENT MODELS

### Settlement Method 1: Fixed Pot / Winner-Take-All

Players contribute a **fixed amount to a pot at the beginning** ($5, $10, etc.), and after the round:
- **Winner-take-all:** The player with the most points above their quota takes the entire pot
- **Tiered payouts:** 1st, 2nd, and 3rd place split the pot (common in large groups)

**Example:** 8 players × $10 = $80 pot. Winner takes all, or 1st gets $40, 2nd gets $30, 3rd gets $10.

**Tiered Payout Structure (by number of players):**
- 0–7 players: Pay out 1st place only
- 8–14 players: Pay out 1st and 2nd
- 15+ players: Pay out 1st, 2nd, and 3rd

**Sources:** [CaddieHQ: How to Play the Quota Golf Game](https://www.caddiehq.com/resources/how-to-play-quota-golf-game), [Beezer Golf: Quota Tournament Guide](https://www.beezergolf.com/games-guide/Quota-tournament), [GolfTheBull: Quota League](https://golfthebull.com/golf/quota-league/)

### Settlement Method 2: Per-Point Model

After the winner is determined, **losing players pay the winner a fixed amount for each point they lost by**. This is common in 4-player games.

**Example:**
- Justin beats Jason by 7 points, earns $7 (if $1 per point)
- Justin beats Evan by 12 points, earns $12
- Jason beats Evan by 5 points, earns $5
- Total: Justin +$19, Jason -$5, Evan -$14 (zero-sum)

This is **pairwise settlement** — each pair settles independently. It scales well and keeps everyone engaged throughout the round (you know at every point what you're up/down against your opponents).

**Sources:** [TheGolfNewsNet: Golf betting games: How to play Quota](https://thegolfnewsnet.com/golfnewsnetteam/2016/07/06/golf-betting-games-how-to-play-quota-rules-46071/), [Beezer Golf: Quota Betting Game Rules](https://beezergolf.com/golf-betting-games/quota-game-rules), [SkinsApp: Quota Game](https://skinsapp.com/golf-games/quota)

### Settlement Method 3: Hybrid (Pot + Per-Point)

Some groups use both:
1. A small pot for participating ($5 per player)
2. Per-point settlement for the actual winnings on top

This keeps players engaged with both a "safety" pool and the running tally.

**Sources:** Mentioned implicitly in [CaddieHQ: How to Play the Quota Golf Game](https://www.caddiehq.com/resources/how-to-play-quota-golf-game)

### Tie-Breaking

When players tie on points above quota:
- **Match of cards** (compare individual hole scores in a predetermined order)
- **Number of birdies or better** (highest birdie count wins)
- **Split the pot** (tied players split winnings equally)

**Sources:** [Beezer Golf: Quota Betting Game Rules](https://beezergolf.com/golf-betting-games/quota-game-rules), [GolfWRX: Quota Tournament Tie](https://forums.golfwrx.com/topic/1907263-quota-tournament-tie/)

---

## 4. COMMON VARIATIONS AND HOUSE RULES

### Team Play

Quota scales easily to team formats. In team play:
1. Calculate the individual quota for each player on the team
2. Add all team quotas together to get the **team quota**
3. Add all team players' points together to get the **team score**
4. **Team score minus team quota = team result**

This works for 2-man, 4-man, or any team size.

**Example (2-man team):**
- Player A (10 hc) quota: 26, scores 28 = +2
- Player B (15 hc) quota: 21, scores 19 = -2
- Team quota: 26 + 21 = 47
- Team score: 28 + 19 = 47
- Team result: +0 (tied with quota)

**Sources:** [LiveAbout: How to Play a Quota Golf Game](https://www.liveabout.com/play-a-quota-golf-tournament-1564249), [GolfGenius: Quota Tournaments](https://docs.golfgenius.com/article/show/22665-quota-tournaments), [TournamentManagement (Tournament Management Help Center)](https://intercom.help/tournament-management/en/articles/10778674-how-can-i-set-up-a-chicago-quota-tournament/)

### Dynamic Quota Adjustment (Multi-Round Leagues)

In leagues that play multiple rounds, quotas can be adjusted after each round to keep the game fair as player performance changes:

**Adjustment Formula:**
- If a player scored **+5 above quota**, their next quota increases by **+2 or +3** (50-100% of the overage)
- If a player scored **-3 below quota**, their next quota decreases by **-1 or -2** (50-100% of the shortage)

This ensures that as players improve (or decline), their quotas adjust to keep the game challenging and fair.

**Sources:** [On Golf Handicaps: Quota System Vs. Stableford System](http://www.ongolfhandicaps.com/2018/05/quota-system-vs-stableford-system.html), [GolfLeagueTracker: Quota vs Handicaps](https://www.golfleaguetracker.com/glthome/cms/faq/quota-vs-handicaps)

### Playoff/Sudden-Death Rules

Sources don't mention sudden-death playoffs (common in match play). Ties appear to be settled via "match of cards" or pot-splitting.

---

## 5. LARGE-GROUP USAGE (30+ Players, Tournaments, Outings)

### Why Quota is Ideal for Large Groups

1. **Handicap-neutral:** A 25-handicapper has just as good a chance to win as a scratch golfer
2. **Scales to any number of players:** Unlike stroke play, no complex handicap calculations
3. **Easy to implement:** One calculation (36 minus hc), then track points per hole
4. **Keeps everyone engaged:** Every player is chasing their own personal quota, not competing directly on the scorecard
5. **Works with tiered payouts:** In 15+ player groups, pay 1st/2nd/3rd from a pool

### Multi-Group Tournament Structure

When running Quota across multiple groups in a tournament:
- Each player plays in their own group (4 players, 3 players, etc.)
- All players' quotas and point totals are tracked centrally
- A **single leaderboard** shows all players ranked by (points above quota)
- The player with the **most points above quota wins overall**, regardless of which group they played in

**Example (20 players, 5 groups of 4):**
```
Group 1: Justin (10 hc, quota 26, score 34) = +8
Group 2: Jason (8 hc, quota 28, score 29) = +1
Group 3: Evan (12 hc, quota 24, score 26) = +2
Group 4: Tyler (5 hc, quota 31, score 33) = +2
Group 5: Patrick (15 hc, quota 21, score 20) = -1

Overall Leaderboard:
1. Justin: +8
2. Tyler: +2 (tie)
2. Evan: +2 (tie)
4. Jason: +1
5. Patrick: -1
```

**Sources:** [GolfGenius: Quota Tournaments](https://docs.golfgenius.com/article/show/22665-quota-tournaments), [Golf Genius Help: How can I set up a Chicago Quota Tournament?](https://docs.golfgenius.com/article/show/22666-how-can-i-set-up-a-chicago-quota-tournament), [GolfCourseGurus: Tournament Formats/Side Games](https://golfcoursegurus.com/tournament/), [LiveAbout: Here's How to Play a Quota Golf Tournament](https://www.liveabout.com/play-a-quota-golf-tournament-1564249)

### Equipment for Large-Group Quota

Tournament software used for Quota includes:
- **GolfGenius:** Tournament management platform with built-in Quota support
- **GolfSoftware (DogFight/Quota modules):** Older but established
- **UnknownGolf:** Modern golf betting app with live leaderboards and Venmo settlement
- **Squabbit Golf:** Free tournament and league software with live leaderboards
- **SkinsApp:** Multi-game app that includes Quota scoring

**Sources:** [GolfGenius: Quota Tournaments](https://docs.golfgenius.com/article/show/22665-quota-tournaments), [UnknownGolf: Golf Wager App](https://www.unknowngolf.com/golf-wager-app), [Squabbit Golf: Free Golf Tournament Software](https://squabbitgolf.com/), [SkinsApp: Quota](https://skinsapp.com/golf-games/quota)

---

## 6. STABLEFORD VS QUOTA VS MODIFIED STABLEFORD

### The Fundamental Difference

| Aspect | Stableford | Quota |
|--------|-----------|-------|
| **Scoring basis** | Net score (with handicap applied hole-by-hole) | Gross score (no hole-by-hole handicap) |
| **Target** | Maximize points (no target, just highest score wins) | Beat a pre-set quota (36 minus handicap) |
| **Winner determination** | Highest total points | Most points above quota |
| **Handicap application** | Applied hole-by-hole via stroke index | Applied once upfront (affects quota only) |
| **Fairness** | For scratch/near-scratch golfers | For mixed-handicap groups |

**Example (Par 4, 18 handicap, Player B has 2 strokes):**
- Gross score: 7 (double bogey)
- **In Stableford:** Net score = 7 - 2 = 5 = 1 point
- **In Quota:** Gross score = 7 = 0 points (double bogey)
- The handicap in Quota is only used to calculate the quota (36 - 18 = 18), not applied per hole

**Sources:** [On Golf Handicaps: Quota System Vs. Stableford System](http://www.ongolfhandicaps.com/2018/05/quota-system-vs-stableford-system.html), [GolfLeagueTracker: Quota vs Handicaps](https://www.golfleaguetracker.com/glthome/cms/faq/quota-vs-handicaps), [MyGolfSpy: Stableford Scoring System](https://mygolfspy.com/news-opinion/stableford-scoring-system/)

### Modified Stableford (Tournament Format)

Modified Stableford is an official PGA tour format that uses different point values than standard Stableford and allows "picking up" after a certain score (e.g., double bogey) to keep pace.

**Relationship to Quota:** Quota is sometimes described as a "modified Stableford" because it uses the same point system (bogey=1, par=2, birdie=4, eagle=8) but applies it to gross scores with an upfront quota target.

**Sources:** [JBSGolf: Modified Stableford Format](http://www.jbsgolf.com/modified-stableford-format.html), [GolfSoftware: Golf Dogfight – Quota Game](http://golfsoftware.com/lm/golf-dogfight-quota-game.html)

### Why Golfers Confuse Them

All three (Stableford, Modified Stableford, Quota) use similar **point-per-hole scoring** and often similar point values. The confusion arises because:
1. They look similar on a scorecard (columns of points)
2. They're all used in casual and tournament golf
3. Regional familiarity varies (some clubs call it "Chicago," others call it "Quota" or "Dogfight")
4. Online golf instruction mixes terminology

**Sources:** [On Golf Handicaps: Quota System Vs. Stableford System](http://www.ongolfhandicaps.com/2018/05/quota-system-vs-stableford-system.html)

---

## 7. COMMON MISTAKES AND STRATEGY

### What New Quota Players Get Wrong

1. **Overthinking shots during the round** — Players focus on calculation instead of natural play
2. **Forgetting their quota** — Not keeping the target in mind throughout the round
3. **Scorecard/math errors** — Miscalculating points, leading to incorrect final scores
4. **Difficulty tracking during play** — The point system is harder to follow than match play (no ball-by-ball comparison)
5. **Poor risk management** — Overly aggressive or overly conservative play based on misunderstanding the quota math

**Solution mentioned in sources:** Use a digital golf app to track scores automatically, removing mental math from the game.

**Sources:** [CaddieHQ: How to Play the Quota Golf Game](https://www.caddiehq.com/resources/how-to-play-quota-golf-game), [TheClubWasher: How to Play the Quota Golf Game](https://theclubwasher.com/blogs/resources/how-to-play-quota-golf-game), [Beezer Golf: Quota Tournament Guide](https://www.beezergolf.com/games-guide/Quota-tournament), [GolfTheBull: Quota League](https://golfthebull.com/golf/quota-league/)

### Strategy Tips from the Wild

1. **Focus on your strengths, not the quota itself** — If you're a great putter, capitalize on the greens; if you're a bomber off the tee, hit more fairways
2. **Maximize consistency over perfection** — In Quota, steady play (string of 2-3-4 point holes) beats occasional brilliant shots followed by blow-ups
3. **Every hole is independent** — A triple bogey is just 0 points; it doesn't linger like in stroke play. Pick it up and move to the next hole fresh
4. **Play it safe sometimes** — Although aiming for maximum points is tempting, sometimes a safe bogey (1 point) beats a risky birdie attempt that lands you a double (0 points)
5. **Mental reset on bad holes** — The slate is wiped clean on every new tee. The hole is over emotionally; a single good swing can put you right back on track

**Sources:** [LiveAbout: How to Play a Quota Golf Game](https://www.liveabout.com/play-a-quota-golf-tournament-1564249), [OwnTheFairway: Quota Golf Game – Everything You Need To Know](https://ownthefairway.com/quota-golf-game/), [OreateAI: Mastering the Quota Golf Game](https://www.oreateai.com/blog/mastering-the-quota-golf-game-strategies-for-success/)

### Psychological Advantage of Quota

Unlike stroke play (where a bad hole can demoralize you for hours), Quota resets on every hole. The point floor is 0 (after double bogey). This creates a unique psychology:
- **Loss aversion is reduced** — You don't dwell on bad holes
- **Momentum is fragile** — A single birdie can change your confidence
- **Every group member can still win** — No one is "out of it" until the final hole

**Sources:** [TheClubWasher: What Is a Quota Game in Golf?](https://www.theclubwasher.com/blogs/resources/what-is-a-quota-game-in-golf)

---

## 8. REGIONAL NAMING AND TERMINOLOGY

### "Quota" (Most Common in General Use)

The generic name used across the US. Most common in casual play, golf apps, and online resources.

**Sources:** [CaddieHQ](https://www.caddiehq.com/resources/how-to-play-quota-golf-game), [OwnTheFairway](https://ownthefairway.com/quota-golf-game/), [Beezer Golf](https://www.beezergolf.com/games-guide/Quota-tournament)

### "Chicago" (Regional, Especially Midwest/Northeastern US)

Used primarily in and around Chicago and the Midwest, but also seen in northeastern US. Often specifically refers to the **39-minus variant**.

The term "Chicago" emphasizes:
- The 39-point baseline (harder than 36)
- The "hurdle" concept (starting at a negative, trying to get to positive)
- Historical origin (popularized from Chicago area clubs)

**Sources:** [Golf Digest: How to play Chicago](https://www.golfdigest.com/story/how-to-play-chicago-golf-game-explained), [GolfCompendium: The Chicago Golf Format Explained](https://www.golfcompendium.com/2023/08/chicago-golf-format.html), [ChicagoGolfGuy: How to play golf Chicago Style?](https://chicagogolfguy.com/2011/12/31/chicago-golf-a-tournament-format/), [MyScoreCard: Chicago](https://www.myscorecard.com/cgi-bin/knowledgecenter.pl?mode=article&category=golf_games&file=chicago&article=Chicago)

### "Point Quota" (Formal/Technical Use)

Used in official tournament documentation, golf software, and formal rule-writing. Emphasizes that it's a "point-based quota" system.

**Sources:** [Mulligan Software: Point-Quota](https://www.mulligansoftware.com/GamesWePlay/point-quota.html), [GolfLeagueTracker: Quota vs Handicaps](https://www.golfleaguetracker.com/glthome/cms/faq/quota-vs-handicaps)

### "Dogfight" (Older Regional Term, Mostly Obsolete)

An older casual name, still used in some regions but declining in popularity. Appears in software names ("GolfDogFight") but rarely used by players today.

**Sources:** [GolfSoftware: Golf Dogfight – Quota Game](http://golfsoftware.com/lm/golf-dogfight-quota-game.html), [TheLeftRough: Dogfight in Golf](https://theleftrough.com/dogfight-in-golf/)

### "Thirty-Nines" or "39s" (Informal, Chicago-Specific)

Slang for the 39-minus variant, used in casual play. Not widely known outside the Midwest.

**Sources:** [GolfCompendium: The Chicago Golf Format Explained](https://www.golfcompendium.com/2023/08/chicago-golf-format.html)

---

## 9. FEATURE GAPS: REAL WORLD vs. STICK ENGINE

Based on the audit and research, here are gap areas:

### Real-World Variations Stick Doesn't Support (Yet)

1. **Alternative quotas (38, 39)** — Stick hardcodes 36-minus. Most golfers use 36, but some prefer 39 (Chicago) or 38 (middle ground).
2. **Negative points for triple bogey** — Most groups use 0-point floor, but some leagues allow -1 for triple bogey.
3. **Dynamic quota adjustment (multi-round leagues)** — Stick doesn't adjust quotas after each round based on performance.
4. **Tiered settlement structures** — Stick can calculate payouts, but doesn't have a built-in "8+ players = payout top 2" rule.
5. **Match of cards tie-breaking** — Stick would need to store and compare individual hole scores in a predetermined order.

### Common Real-World Practices Stick DOES Support

1. **Pairwise settlement** (per-point model) — ✓ Engine calculates all pairwise differences
2. **Team play** — ✓ Engine can add quotas and points for team totals
3. **Multi-group tournaments** — ✓ Engine can aggregate all players on one leaderboard
4. **Gross scoring** — ✓ Engine uses gross scores, not net
5. **Up to 30+ players** — ✓ No player cap in engine

---

## 10. RESEARCH SUMMARY FOR GUIDE DRAFT

### Must Cover in the Guide

1. **Standard calculation (36 minus)** with examples
2. **The Chicago variant (39 minus)** as a valid alternative
3. **Point system** (bogey=1, par=2, birdie=4, eagle=8)
4. **Double bogey is 0 points** (can pick up and move on)
5. **Settlement models** — pot, per-point, hybrid
6. **Team play structure** (for 2-man, 4-man formats)
7. **Large-group tournament use** (why Quota works for 20+ players)
8. **Stableford comparison** (what makes Quota different)
9. **Strategy tips** — focus on consistency, mental reset, risk management
10. **Common mistakes** — scorecard errors, overthinking, forgetting quota

### Nice-to-Have (If Space Allows)

1. Dynamic quota adjustment (leagues only, not casual play)
2. Regional naming ("Chicago" for northeast, "Quota" elsewhere)
3. Tie-breaking methods (match of cards, birdie count)
4. Dogfight history (mostly obsolete term)

### What NOT to Claim About Stick

- Stick does **not** support alternative quotas (39-minus, 38-minus)
- Stick does **not** support -1 points for triple bogeys
- Stick does **not** support dynamic quota adjustment between rounds
- Stick does **not** have built-in "match of cards" tie-breaker (would need manual review)

### What TO Claim About Stick

- Stick tracks gross scores and calculates all point values correctly
- Stick supports team play (adds quotas and points automatically)
- Stick can handle unlimited players (30+ for multi-group tournaments)
- Stick can calculate pairwise settlements (who owes whom, per-point model)
- Stick resets the slate on every hole (no carryover emotion)

---

## 11. SOURCE INVENTORY (All URLs)

### Primary Instructional Sources

- [LiveAbout: How to Play a Quota Golf Game](https://www.liveabout.com/play-a-quota-golf-tournament-1564249)
- [Golf Digest: How to play Chicago](https://www.golfdigest.com/story/how-to-play-chicago-golf-game-explained)
- [GolfCompendium: The Chicago Golf Format Explained](https://www.golfcompendium.com/2023/08/chicago-golf-format.html)
- [CaddieHQ: How to Play the Quota Golf Game](https://www.caddiehq.com/resources/how-to-play-quota-golf-game)
- [CaddieHQ: How to Determine Quota Points in Golf](https://www.caddiehq.com/resources/how-to-determine-quota-points-in-golf)
- [TheGolfNewsNet: Golf betting games: How to play Quota](https://thegolfnewsnet.com/golfnewsnetteam/2016/07/06/golf-betting-games-how-to-play-quota-rules-46071/)
- [OwnTheFairway: Quota Golf Game – Everything You Need To Know](https://ownthefairway.com/quota-golf-game/)
- [TheClubWasher: How to Play the Quota Golf Game](https://theclubwasher.com/blogs/resources/how-to-play-quota-golf-game)
- [GreatGamesForGolfers: Quota](https://greatgamesforgolfers.com/golf-games/quota/)

### Beezer Golf (Competitor)

- [Beezer Golf: Quota Tournament Guide](https://www.beezergolf.com/games-guide/Quota-tournament)
- [Beezer Golf: Quota Betting Game Rules](https://beezergolf.com/golf-betting-games/quota-game-rules)
- [Beezer Golf: Chicago Game Guide](https://www.beezergolf.com/games-guide/Chicago)

### Tournament Management & Software

- [GolfGenius: Quota Tournaments](https://docs.golfgenius.com/article/show/22665-quota-tournaments)
- [GolfGenius: How to set up a Chicago Quota Tournament](https://docs.golfgenius.com/article/show/22666-how-can-i-set-up-a-chicago-quota-tournament)
- [Tournament Management Help Center: How to set up a Chicago Quota Tournament](https://intercom.help/tournament-management/en/articles/10778674-how-can-i-set-up-a-chicago-quota-tournament)
- [GolfSoftware: Golf Dogfight – Quota Game](http://golfsoftware.com/lm/golf-dogfight-quota-game.html)
- [Mulligan Software: Point-Quota](https://www.mulligansoftware.com/GamesWePlay/point-quota.html)
- [Mulligan Software: Chicago](https://www.mulligansoftware.com/GamesWePlay/chicago.html)
- [UnknownGolf: Golf Wager App](https://www.unknowngolf.com/golf-wager-app)
- [Squabbit Golf: Free Golf Tournament Software](https://squabbitgolf.com/)
- [SkinsApp: Quota](https://skinsapp.com/golf-games/quota)

### Technical/Scoring References

- [On Golf Handicaps: Quota System Vs. Stableford System](http://www.ongolfhandicaps.com/2018/05/quota-system-vs-stableford-system.html)
- [GolfLeagueTracker: Quota vs Handicaps](https://www.golfleaguetracker.com/glthome/cms/faq/quota-vs-handicaps)
- [MyScoreCard: Chicago](https://www.myscorecard.com/cgi-bin/knowledgecenter.pl?mode=article&category=golf_games&file=chicago&article=Chicago)
- [MyGolfSpy: Stableford Scoring System](https://mygolfspy.com/news-opinion/stableford-scoring-system/)
- [TheLeftRough: Dogfight in Golf](https://theleftrough.com/dogfight-in-golf/)
- [TheLeftRough: Stableford Scoring System](https://theleftrough.com/stableford-scoring-system/)
- [JBSGolf: Modified Stableford Format](http://www.jbsgolf.com/modified-stableford-format.html)
- [Wikipedia: Stableford](https://en.wikipedia.org/wiki/Stableford)
- [PMC/NIH: Stableford: Equitable golf-scoring system or quality-of-life measure?](https://pmc.ncbi.nlm.nih.gov/articles/PMC137340/)

### GolfWRX Forum Discussions

- [GolfWRX: Has anyone played the QUOTA betting game?](https://forums.golfwrx.com/topic/1627590-has-anyone-played-the-quota-betting-game/)
- [GolfWRX: Quota game 36 vs 39](https://forums.golfwrx.com/topic/1501714-quota-game-36-vs-39/)
- [GolfWRX: Quota Tournament Tie](https://forums.golfwrx.com/topic/1907263-quota-tournament-tie/)
- [GolfWRX: Chicago Points System Scoring](https://forums.golfwrx.com/topic/1876868-chicago-points-system-scoring-for-fairness-across-all-handicaps/)
- [GolfWRX: Quota points excel program](https://forums.golfwrx.com/topic/774704-quota-points-excel-program/)

### Regional/Chicago-Specific

- [ChicagoGolfGuy: How to play golf Chicago Style?](https://chicagogolfguy.com/2011/12/31/chicago-golf-a-tournament-format/)

### Course-Specific League Rules (Examples)

- [Southers Marsh: League Rules](https://southersmarsh.com/league-rules/)
- [Wenham Country Club: Golf Games Explained](https://www.wenham.golf/golf-games-explained)

### Other References

- [GolfCourseGurus: Tournament Formats/Side Games](https://golfcoursegurus.com/tournament/)
- [OreateAI: Mastering the Quota Golf Game](https://www.oreateai.com/blog/mastering-the-quota-golf-game-strategies-for-success/)
- [GolfTheBull: Quota League](https://golfthebull.com/golf/quota-league/)
- [GolfWeGo: Quota, Golf Game Rules, Sample Scorecard](https://golfwego.com/golf-games/quota/)

---

## 12. READY FOR GUIDE DRAFT

This research is comprehensive enough to write the Quota game guide. Key sections are documented with multiple sources. The guide should:

1. Lead with the 36-minus calculation and examples
2. Explain the 39-minus Chicago variant as a valid alternative
3. Walk through point system and settlement models with real scenarios
4. Include a team play example (2-man and 4-man)
5. Address large-group tournament use (20+ players)
6. Compare to Stableford clearly
7. Provide strategy tips and common mistakes
8. Include FAQ section (settlement, team play, Chicago vs. Quota, alternatives to 36-minus)
9. Mention Stick's strength: accurate gross scoring, pairwise settlement, no player cap (Events-ready)

All sources are catalogued above. Cross-reference as needed.
