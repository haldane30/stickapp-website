# Game-by-Game Competitor Comparison

> Last updated: March 9, 2026
> Purpose: Track exactly which games each competitor supports, and what depth they offer

---

## Master Comparison Matrix

✅ = Has it | ⚠️ = Partial/basic | ❌ = Doesn't have it | 🏆 = Best implementation

| Game | Stick | GameBook | Skins App | Beezer | 18 Birdies | Golf Bettor | GolfApp |
|------|-------|----------|-----------|--------|------------|-------------|---------|
| **Nassau** | 🏆 (press chains, auto-press, match/stroke) | ❌ | ✅ | ✅ | ✅ | ✅ | ⚠️ |
| **Skins** | ✅ (carryover, validation) | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| **Wolf** | 🏆 (hammer mode, partner picking) | ❌ | ✅ | ⚠️ | ✅ | ✅ | ❌ |
| **Snake** | ✅ (doubling, multiple models) | ❌ | ✅ | ⚠️ | ❌ | ❌ | ❌ |
| **Match Play** | ✅ (press support) | ✅ | ✅ | ✅ | ✅ | ✅ | ⚠️ |
| **Nine Point** | 🏆 (blitz, birdie double, 5-3-1/4-2-0) | ❌ | ❌ | ⚠️ | ❌ | ❌ | ❌ |
| **Split Sixes** | ✅ | ❌ | ❌ | ✅ | ❌ | ❌ | ❌ |
| **Sixes (Hollywood)** | ✅ (press support, rotating teams) | ❌ | ✅ | ✅ | ✅ | ❌ | ❌ |
| **Junk (Dots)** | ✅ | ❌ | ✅ | ✅ | ✅ | ❌ | ❌ |
| **Vegas** | ✅ | ❌ | ✅ | ✅ | ✅ | ✅ | ❌ |
| **Scotch** | ✅ | ❌ | ❌ | ✅ | ❌ | ❌ | ❌ |
| **Quota** | 🏆 (30+ player support, Events-ready) | ❌ | ✅ | ✅ | ❌ | ❌ | ❌ |
| Scramble | ❌ (not building) | ✅ | ❌ | ⚠️ | ❌ | ✅ | ❌ |
| Better Ball | ❌ (not building) | ✅ | ❌ | ✅ | ❌ | ✅ | ❌ |
| Closest to Pin | ❌ (Junk covers this) | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ |
| Banker | ❌ (post-launch) | ❌ | ✅ | ✅ | ❌ | ✅ | ❌ |
| Stableford | ❌ (not building) | ⚠️ | ✅ | ✅ | ❌ | ✅ | ❌ |
| Bingo Bango Bongo | ❌ (evaluating) | ❌ | ❌ | ✅ | ❌ | ❌ | ❌ |
| Rabbit | ❌ (evaluating) | ❌ | ❌ | ✅ | ❌ | ❌ | ❌ |
| **Tournaments (72+ players)** | 🔨 Events (post-launch) | ✅ (72 players, Ryder Cup-style) | ❌ | ❌ | ❌ | ❌ | ❌ |
| **TOTAL betting games** | **12** (at launch) | **~6 betting** + team formats | **13+** | **~30** | **10** | **12** | **~4** |

> **Note on GameBook:** Their 20 formats include team/tournament formats (Scramble, Better Ball, Ryder Cup-style) alongside scoring games (Skins, Match Play, Stableford). They appear to have few or none of the American betting staples (Nassau, Wolf, Snake, Vegas, Scotch, Junk, Sixes, Nine Point). Their strength is organized events and social features, not betting game depth. Depth of implementation is unknown — need hands-on testing to assess configurability, press support, settlement math, etc.

---

## Depth Comparison (Where Stick Wins)

This is the real differentiator. Game count is vanity; implementation depth is the moat.

| Feature | Stick | GameBook | Skins App | Beezer | 18 Birdies |
|---------|-------|----------|-----------|--------|------------|
| Press-the-press chains | ✅ Unlimited | Unknown | ⚠️ Limited | ❌ | ❌ |
| Auto-press configurable | ✅ 2-down, custom | Unknown | ⚠️ Basic | ❌ | ❌ |
| Wolf hammer mode | ✅ Full | ❌ No Wolf | ❌ | ❌ | ❌ |
| Zero-sum verification | ✅ 1,448 tests | Unknown | Unknown | Unknown | Unknown |
| Multi-device real-time sync | ✅ Convex reactive | ✅ Live leaderboards | ⚠️ Basic | ❌ | ✅ |
| Integer cent arithmetic | ✅ No float errors | Unknown | Unknown | Unknown | Unknown |
| Multi-game single scorecard | ✅ Any combination | Unknown | ⚠️ Limited | ⚠️ Limited | ⚠️ Limited |
| Settlement transparency | ✅ Line-item breakdown | Unknown | ⚠️ Summary only | ⚠️ Summary only | ⚠️ Summary only |
| Tournament/Events (30+ players) | 🔨 Post-launch | ✅ 72 players | ❌ | ❌ | ❌ |
| GPS course maps | ❌ | ✅ 42K courses | ✅ | ✅ | ✅ |

---

## Competitor App Store Ratings

| App | Rating | Review Count | Common Complaints | Last Checked |
|-----|--------|-------------|-------------------|---|
| Golf GameBook | ~4.6 | ~5K+ | Premium pricing unclear, some UI complexity | Mar 2026 |
| Skins App | ~4.5 | ~200 | Calculation errors, confusing UI. ⚠️ App reported broken Mar 2026. | Mar 2026 |
| Beezer Golf | ~4.2 | ~50 | No free tier, crashes | Feb 2026 |
| 18 Birdies | ~4.6 | ~10K+ | Expensive ($100/yr), GPS focus | Feb 2026 |
| Golf Bettor | ~3.8 | ~30 | Outdated UI, limited games. Dev responsive to feedback. | Mar 2026 |
| GolfSnap | 5.0 | 17 | Too few ratings to assess. Feature-rich for size. | Mar 2026 |

**Key insight from competitor reviews:** Users complain about broken calculations and confusing settlement, not missing games. Quality > quantity.

**GameBook insight:** Their reviews skew toward social/community features and GPS, not betting game depth. Users praise live leaderboards and tournament features. This confirms their positioning is "digital clubhouse," not "betting app."

---

## Update Log

| Date | What Changed | Source |
|------|-------------|--------|
| Mar 9, 2026 | Added Golf GameBook column to all tables. Added GolfSnap to ratings. Updated Skins App status (broken). Added tournament/GPS rows to depth comparison. | WebSearch, landscape scan |
| Feb 27, 2026 | Initial audit created from web research | WebSearch, app stores |
