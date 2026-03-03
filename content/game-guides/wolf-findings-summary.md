# Wolf Golf Game: Key Findings Summary

**Date:** February 28, 2026
**Purpose:** Executive summary of research findings for content planning & feature audit

---

## What Was Asked

Deep research on Wolf variations beyond the standard ruleset, including:
1. Uncommon variations not typically documented
2. Real-world house rules & edge cases
3. Regional differences & naming conventions
4. Common disputes & how groups resolve them
5. What players actually do (vs. what rule books say)
6. App implementation issues

---

## What We Found

### Tier 1: Confirmed & Common (Nearly Universal)

| Variation | Prevalence | Status | Content Priority |
|-----------|-----------|--------|------------------|
| **Standard 4-player Wolf** | 90%+ | ✓ Documented | MUST INCLUDE |
| **Lone Wolf** | 90%+ | ✓ Documented | MUST INCLUDE |
| **Blind Wolf** | Very Common | ✓ Documented | MUST INCLUDE |
| **Pig / Spit / Divorce** | Very Common | ✓ Documented | MUST INCLUDE |
| **3-player Wolf** | Common | ✓ Documented | INCLUDE |
| **5-player Wolf** | Less common but real | ✓ Documented | INCLUDE (optional) |
| **Last Place Wolf on 17-18** | Common | ✓ Documented | INCLUDE |
| **Carry-Over Points (Ties)** | Common secondary rule | ✓ Documented | INCLUDE (variations) |

---

### Tier 2: Documented but Niche

| Variation | Prevalence | Status | Notes |
|-----------|-----------|--------|-------|
| **Hammer / Re-Hammer** | Real groups play it | ✓ Documented | Complex. Post-launch feature? |
| **Scotch Wolf** (Alternate Shot) | Niche | ✓ Confirmed exists | Requires alt-shot support |
| **Canadian Wolf** (Net score based) | Niche | ✓ Confirmed exists | Requires handicap integration |
| **Pro Wolf** / Blind variant | Rare | ✓ Mentioned | Slight variation of Blind Wolf |
| **Par-based multipliers** | Some groups | ✓ Implied | Par 3 = 1x, Par 4 = 2x, Par 5 = 3x |
| **Junk Scoring** (Birdie/Eagle bonuses) | Some groups | ✓ Implied | Separate from hole points |

---

### Tier 3: Questions Without Clear Answers

| Question | Finding | Impact |
|----------|---------|--------|
| **Tee order: Wolf first or last?** | Both played. Most sources say LAST. | Design choice. Default to LAST, allow toggle? |
| **3-player: Can Wolf pick both partners?** | Not found as standard. Appears NOT played. | Not needed for MVP |
| **What's "Roll the Dice"?** | Mentioned once, no clear rules | Probably informal regional variant |
| **Regional variants beyond Canada?** | None documented (Australia, UK, Europe all use same rules) | No regional content needed |
| **"Great White" Wolf variation** | Zero results. Likely doesn't exist. | Can dismiss |

---

### Tier 4: Discovered But NOT Actually Played

| Concept | Status | Why |
|---------|--------|-----|
| "Great White" Wolf | ✗ Not found | Mythical (doesn't appear to exist) |
| Multi-player conditional partnerships (1+1 vs. 1) | ✗ Not found as standard | Too complex for 3-player, not needed |
| Heavy regional rule variations | ✗ Not found | Wolf is surprisingly standardized globally |

---

## Critical Design Questions for Stick

### Must Decide Before Writing Guide

1. **Tee Order**
   - Standard sources: Wolf tees LAST
   - Real world: Some groups prefer FIRST
   - Decision: Default to LAST, or support both?

2. **Partner Refusal (Spit/Divorce)**
   - This is confusing terminology in real play
   - Stick should simplify: "Reject Partner" or "Go Alone" (once picked)
   - Question: Can player reject after partner is chosen but before play starts? Or only immediately?

3. **Hammer**
   - Real groups love this
   - Complex in app (real-time multiplier, Re-Hammer rules)
   - Candidate for post-launch feature?

4. **Scotch Wolf**
   - Requires alternate-shot format support
   - Is this in Stick's scope?

5. **Canadian Wolf**
   - Requires handicap integration
   - Is this in Stick's scope?

---

## What Real Golfers Actually Argue About

### The 5 Most Common Disputes (from sources)

1. **When can Wolf pick a partner?**
   - "Can Wolf change mind after hitting their own shot?" (Answer: Not once next player hits)
   - "Do they decide before or after their own shot?" (Groups disagree)

2. **What happens when player rejects partner (Pig/Spit)?**
   - Happens pre-tee-box? Or can happen mid-hole?
   - Do bets double? (Yes, seems universal)
   - Can Wolf then pick someone else? (No, appears universal)

3. **How to handle ties?**
   - Wash (no points)? OR
   - Carry-over to next hole?
   - Groups decide upfront

4. **What's the point multiplier?**
   - Lone Wolf: 4 points (or 6, or varies)?
   - Blind Wolf: Double of Lone? (So 8?)
   - Pig: Bets double? (Yes, universal)
   - Each group customizes

5. **Who is Wolf on holes 17-18?**
   - Last place player? (Most common)
   - Leader? (Less common)
   - Whoever wasn't Wolf on 16? (Rare)
   - Some groups play 5x multiplier instead

---

## What Variations Matter Most for Content

### For the Wolf Game Guide

**Must include:**
- Standard Wolf (4-player, 2v2 or 1v3)
- Lone Wolf
- Blind Wolf
- Pig/Spit/Divorce
- Hammer (if Stick supports)

**Should include (in Variations section):**
- 3-player Wolf
- 5-player Wolf (briefly)
- Last Place Wolf on 17-18
- Carry-over rule
- Common house rules (point multipliers, junk scoring)

**Could include (if relevant to Stick features):**
- Scotch Wolf (if Stick has alternate-shot)
- Canadian Wolf (if Stick has handicap)

**Don't include:**
- "Great White" (doesn't exist)
- Conditional 3-player partnerships (not real)
- Overly regional variants (not needed—Wolf is global standard)

---

## App Feature Gaps Discovered

### High Priority (Likely Needed for MVP)

- [ ] **Tee order configuration** (first vs. last Wolf)
- [ ] **Partner refusal UI** (Spit/Divorce—needs clearer naming)
- [ ] **3-player support** (Wolf configuration for 3 players)
- [ ] **Last place Wolf on 17-18** (or configurable final hole rules)
- [ ] **Carry-over rule for ties** (optional)

### Medium Priority (Nice-to-Have)

- [ ] **Hammer / Re-Hammer** (real-time betting multiplier)
- [ ] **Junk scoring** (birdie/eagle bonuses)
- [ ] **Par-based multipliers** (1x, 2x, 3x per hole type)

### Lower Priority (Post-Launch)

- [ ] **Scotch Wolf** (requires alt-shot format)
- [ ] **Canadian Wolf** (requires handicap)
- [ ] **Blind Wolf advanced variants** (Pro Wolf terminology)

---

## Key Insight: Tee Order Debate

**Finding:** Sources conflict on whether Wolf tees FIRST or LAST.

**Industry standard:** Most instructional content says LAST
- Gives Wolf information advantage
- More strategic
- Golf Digest, 18Birdies, Beezer all describe as LAST

**Real-world play:** Both happen
- Some groups prefer FIRST (speeds up play, less psychology)
- Tee order is often a local house rule decision

**Recommendation for Stick:**
1. Default to LAST (matches industry standard)
2. Allow configuration to FIRST (accommodate groups who prefer it)
3. In guide, note both are played and explain tradeoff

---

## Key Insight: Partner Refusal Mechanics

**Finding:** "Spit," "Pig," and "Divorce" are all the same mechanic but with confusing names.

**What happens:**
1. Wolf picks a player as partner
2. Picked player can REJECT the partnership (throw Wolf back)
3. Rejecting player plays ALONE against the other three (including Wolf)
4. ALL BETS DOUBLE

**Terminology mess:**
- "Spit" = player spits out the partnership
- "Pig" = player "pigs" the Wolf (throws them back)
- "Divorce" = divorcing the Wolf

**Recommendation for Stick:**
- Internally call it "Partner Refusal" or "Reject Partner"
- In guide: Explain all three terms are the same, note that player can ONLY reject if already chosen
- UI should make this one-tap or one-swipe action during partner selection phase

---

## Key Insight: Scoring Variation Chaos

**Finding:** No universal point system. Every group customizes.

**Variations found:**
1. **1-2-3 system** (winner gets 1, non-Wolf side gets 2, etc.)
2. **2-3 system** (Wolf+partner get 2 each, non-Wolf get 3)
3. **Lone Wolf multiplier** (4 points, or 6, or 8)
4. **Blind Wolf multiplier** (double of Lone, or triple, or custom)
5. **Back-nine multipliers** (holes 10-18 worth 2x or 3x)
6. **Par-based multipliers** (Par 3 = 1x, Par 4 = 2x, Par 5 = 3x)
7. **Junk scoring** (birdie = +1 or double, eagle = +2 or triple)

**Recommendation for Stick:**
- Allow custom point configuration
- Provide presets for common systems (2-3, 1-2-3)
- Let groups define Wolf Lone value, Blind multiplier, etc.
- Note in guide: "No universal standard—groups customize"

---

## One-Paragraph Summary

Wolf is a simple core concept (Wolf picks partner or goes alone; teams compete 2v2 or 1v3) but has enormous customization. Every group tweaks point multipliers, house rules, and edge-case handling. The most common secondary rules are Pig/Spit/Divorce (player can reject partnership), Blind Wolf (go alone before anyone tees), Hammer (double bets mid-hole), and Last Place Wolf on 17-18. Real debates center on tee order (first vs. last), point values, and how to handle ties. Most variations (3-player, 5-player, Scotch Wolf, Canadian Wolf) are documented but played by niche groups. Stick should support the core game, offer configuration for house rules, and note that groups customize heavily.

---

## Files Created

1. **wolf-research.md** (14 sections, 13K words)
   - Comprehensive research document
   - All variations with context and real-world prevalence
   - Edge cases and dispute scenarios
   - Appendix of design questions for app audit

2. **wolf-findings-summary.md** (this file)
   - Executive summary
   - Key questions resolved / unresolved
   - Feature gap analysis
   - Recommendations for content & design

---

## Next Steps

1. **Share findings with Justin**
   - Get feedback on tee order, scoring system, partner refusal mechanics
   - Clarify which variations are in-scope for Stick

2. **Request Wolf feature audit from Claude Code**
   - Use the "Feature Audit Questions" appendix from wolf-research.md
   - Determine what's MVP vs. post-launch

3. **Write wolf-audit.md**
   - Once app audit is complete
   - Document "Stick Does This," "Common Variations," "Feature Gaps"

4. **Draft wolf.md game guide**
   - Use wolf-research.md and wolf-audit.md as sources
   - Follow Content Framework (section 1500-2500 words)
   - Settle on which variations to include (Tier 1 minimum, Tier 2 optional)

5. **Update game-aliases.md**
   - Add any regional names discovered (none found except "Canadian Wolf")
   - Confirm "Captain," "Boss," "Manager," "Pig," "Ship," "Crew," "Pack" are all just regional names for standard Wolf

---

**Research completed:** February 28, 2026
**Status:** Ready for feature audit & content development
