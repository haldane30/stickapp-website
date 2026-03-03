# Skins — Pre-Audit Research Notes

> Source: Initial game rules research (January 2026). This document captures what we know about Skins from research — NOT what the app actually supports. See `skins-audit.md` (once created) for the verified feature list.

---

## Overview

Skins is one of golf's most popular betting formats. Each hole is its own independent contest — the player with the **lowest unique score** wins the "skin" for that hole. If two or more players tie for the lowest score, **no one wins** and the skin carries over to the next hole.

### Why Skins is Popular
- Simple rules everyone understands
- Any player can win on any hole (unlike match play where you can be eliminated)
- Carryovers create dramatic high-stakes holes
- High handicappers can compete with scratch golfers
- Works for 3-100+ players

### Origin
The name likely derives from old slang for a dollar bill. The format gained TV prominence in 1983 with the PGA Tour Skins Game featuring Palmer, Nicklaus, Player, and Watson. Fred Couples holds the record with $4.4M won across 11 appearances.

### Also Known As
- "Cats", "Scats", "Skats", "Syndicates" (regional variations)
- "Dollar Game" (when $1/hole)

---

## Core Rules

### Basic Mechanic

| Rule | Description |
|------|-------------|
| **Win condition** | Lowest score on a hole, with NO ties |
| **Tie = Push** | If any players tie for low, skin carries to next hole |
| **Carryover** | Pushed skins accumulate until someone wins outright |
| **18 skins available** | Maximum of 18 skins in a round (one per hole) |

### Carryover Example

| Hole | Scores (A, B, C, D) | Result | Skins at Stake |
|------|---------------------|--------|----------------|
| 1 | 4, 4, 5, 5 | TIE (A & B) | 1 → carries |
| 2 | 5, 4, 4, 6 | TIE (B & C) | 2 → carries |
| 3 | 3, 5, 4, 6 | **A WINS** | A takes 3 skins |
| 4 | 4, 4, 4, 4 | TIE (all) | 1 → carries |
| 5 | 5, 5, 5, 4 | **D WINS** | D takes 2 skins |

### Stakes Models

#### Model 1: Fixed Value Per Hole
Each skin has a predetermined value. Winner collects from each other player.

**Example:** $2/skin, 4 players
- Player A wins hole 1
- A collects $2 from B, $2 from C, $2 from D = **$6 won**

#### Model 2: Pot System (Common for Large Groups)
All players buy in. Pot is divided by number of skins won.

**Example:** 12 players × $10 buy-in = $120 pot
- 6 skins won total
- Each skin = $20
- Player A wins 3 skins = **$60**
- Player B wins 2 skins = **$40**
- Player C wins 1 skin = **$20**

#### Model 3: Escalating Values
Skin values increase through the round.

**Example:**
- Holes 1-6: $1/skin
- Holes 7-12: $2/skin
- Holes 13-18: $3/skin

This creates drama on the back nine as carryovers compound.

---

## Handicaps

### Gross vs Net

| Mode | Description | Best For |
|------|-------------|----------|
| **Gross** | Actual strokes, no adjustment | Similar skill levels |
| **Net** | Apply handicap strokes | Mixed skill levels |

### Net Skins Calculation

Same as other games — lower handicap plays scratch, others get the difference.

**Example:**

| Player | Course Handicap | Strokes Received |
|--------|-----------------|------------------|
| A | 4 | 0 (scratch) |
| B | 12 | 8 strokes |
| C | 18 | 14 strokes |
| D | 24 | 20 strokes |

Strokes fall on holes ranked by stroke index (hardest first).

### "Gross Beats Net" Variation

Also called "half strokes." When net scores tie, gross score wins.

**Example:**
- Player A (scratch): Gross 4, Net 4
- Player B (gets stroke): Gross 5, Net 4
- Both net 4, but **A wins** because gross beats net

This variation prevents higher handicappers from "backing in" to skins with bogeys.

### Half-Handicap Variation

Players receive only 50% of their handicap. If result is X.5, player gets half-stroke on the SI (X+1) hole.

**Example:** 13 handicap becomes 6.5
- Full strokes on SI 1-6
- Half stroke on SI 7 (gross 5 = net 4.5)

**Use case:** Multi-foursome tournaments where full handicaps create too many ties.

---

## Variations

### Carryover vs No Carryover

| Mode | Description | Effect |
|------|-------------|--------|
| **Carryover (Standard)** | Tied holes push to next | Creates drama, high-stakes holes |
| **No Carryover** | Tied holes = no skin awarded | More individual wins, less drama |

### Validation (aka "Proofs")

When a player wins a skin (especially with carryovers), they must **validate** it by:
- Scoring par or better on the next hole, OR
- Winning or tying for lowest score on the next hole

**If validation fails:**
- The skin goes back into the pot, OR
- It can be "stolen" by whoever wins the validation hole

**Exception:** Hole 18 requires no validation (end of round).

**Why this exists:** Prevents a player from winning 8 carried-over skins with one lucky birdie, then blowing up. Forces consistency.

### Max Score to Win

Some groups require a minimum standard to claim a skin:
- **Par or better** to win
- **Bogey or better** to win
- **Double bogey or better** to win

If no player meets the threshold, the skin carries over.

### Birdie/Eagle Multipliers

| Score | Skin Value |
|-------|------------|
| Par or worse | 1× |
| Birdie | 2× |
| Eagle | 3× |

This rewards exceptional play, not just being the best of a bad hole.

### Last Hole Winner Takes All

If skins remain unclaimed after hole 18, the winner of hole 18 takes all remaining skins. Creates huge drama on the final hole.

### Sudden Death

If hole 18 is tied with skins remaining:
- Players return to a designated hole (usually #1 or #18)
- Play sudden death until someone wins outright
- That player takes all remaining skins

### Carryback

Alternative to sudden death:
- If hole 18 is tied, whoever won hole 17 gets the remaining skins
- If 17 was also tied, go to 16, etc.

---

## Multi-Foursome Skins

### How It Works

For tournaments or large groups (8-100+ players):
1. All players contribute to a single pot
2. Players play their rounds normally
3. After ALL players finish, scores are compared hole-by-hole
4. A skin is won only if ONE player across ALL groups has the outright lowest score
5. Pot divided by skins won

### Post-Round Reconciliation Flow

This is a **key use case for Stick** at private clubs:
1. All foursomes finish their rounds
2. Groups gather at the 19th hole
3. Scores are called out hole-by-hole
4. App determines who won each skin
5. Settlement calculated and displayed

**Important:** Real-time scoring isn't required for multi-group skins — it's a post-round reconciliation.

---

## Settlement Calculation

### Fixed Value Settlement

**$5/skin, 4 players, results:**

| Player | Skins Won | Won From Others | Paid to Others | Net |
|--------|-----------|-----------------|----------------|-----|
| A | 6 | 6 × $5 × 3 = $90 | 12 × $5 = $60 | +$30 |
| B | 5 | 5 × $5 × 3 = $75 | 13 × $5 = $65 | +$10 |
| C | 4 | 4 × $5 × 3 = $60 | 14 × $5 = $70 | -$10 |
| D | 3 | 3 × $5 × 3 = $45 | 15 × $5 = $75 | -$30 |

**Simpler:** Each player owes each other player $5 × (difference in skins won).

### Pot System Settlement

**$20 buy-in, 4 players, $80 pot, 8 skins won:**
- Each skin = $80 ÷ 8 = $10
- Player A: 4 skins = $40 - $20 buy-in = **+$20**
- Player B: 2 skins = $20 - $20 buy-in = **$0**
- Player C: 2 skins = $20 - $20 buy-in = **$0**
- Player D: 0 skins = $0 - $20 buy-in = **-$20**

---

## Edge Cases

- **No skins won on front 9:** Carryovers just keep accumulating. Hole 10 could be worth 10 skins.
- **All 18 holes tied:** Extremely rare. Options: return pot, split evenly, or sudden death.
- **Skins remaining after 18:** Must decide in advance: sudden death, carryback, last hole winner takes all, or split.
- **Player leaves early:** Options range from forfeit to pro-rate based on holes played.
- **Score correction:** All skins must recalculate from that hole forward. Carryover chains may change.

---

## Content Considerations

### High-Value Aliases (from game-aliases.md)
- Cats, Scats, Skats, Syndicates
- Dollar Game
- Note: "Skins" is by far the dominant term — aliases have lower search value than something like Junk/Dots/Trash

### Key Differentiators for Guide
- Settlement math with real examples (our advantage over Beezer)
- Carryover mechanics explained step-by-step
- Validation/proofs — most guides don't cover this
- Multi-foursome use case ties directly to Stick's Events vision

### Questions the Audit Needs to Answer
- Does Stick support validation/proofs?
- What settlement models exist? (fixed only, or pot too?)
- Is gross-beats-net implemented?
- Max score to win threshold?
- What happens with unresolved skins after hole 18?
- Any multi-group support?
