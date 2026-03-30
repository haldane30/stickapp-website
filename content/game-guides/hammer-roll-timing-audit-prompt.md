# Hammer vs Roll Timing Audit

## Context

The website content team discovered that **hammer** (Wolf) and **roll** (Scotch) are mechanically different in real-world play, despite both being "double the stakes, take it or fold" concepts:

- **Hammer (Wolf):** Can be thrown at any point during a hole — mid-hole, reactionary. Either team initiates.
- **Roll (Scotch):** Pre-shot declaration. The leading team tees off first, then the trailing team decides to roll *before* their tee shot. Re-rolls also happen before the next shots. It's sequential and structured.
- **Scope difference:** Hammer affects the current hole only. Roll doubles stakes on all remaining holes in the round.

Both use a "shared hammer module" per the previous Scotch audit. We want to understand whether this shared module creates any inaccurate behavior, or whether it's fine because the app is score-entry-based (not real-time shot tracking).

## What to Audit

### 1. Shared Hammer Module
- Where does the shared hammer module live? Read it fully.
- What does it actually control? (multiplier math, take/drop state, re-hammer alternation, stacking)
- Is it purely a multiplier calculator, or does it have any timing/sequencing logic?

### 2. Wolf Hammer Implementation
- How does Wolf expose the hammer UI? When in the score-entry flow can a user throw a hammer?
- Is it tied to the WolfDecisionSheet (pre-score entry), or can it happen during/after score entry?
- Can both teams initiate a hammer, or only one side?
- How are hammer events stored and synced?

### 3. Scotch Roll Implementation
- How does Scotch expose the roll UI? When in the score-entry flow can a user roll?
- Is the roll decision per-hole or per-remaining-round?
- When a team rolls in Scotch, does the multiplier apply to just the current hole or all remaining holes?
- Can both teams initiate a roll, or only the trailing team?
- Is there any UI or logic difference between Scotch's roll and Wolf's hammer, or do they use identical UI flows?

### 4. Key Questions
- **Does the shared module treat both identically?** If so, that's probably fine for a score-entry app — the real-world timing difference (mid-hole vs pre-shot) doesn't translate to a digital score-entry flow anyway. But document this clearly.
- **Does Scotch's roll apply to remaining holes or just the current hole?** This is the critical scope question. If the module treats both as current-hole-only, Scotch is wrong. If Scotch applies the multiplier to remaining holes, it's correct.
- **Who can initiate?** In real-world Scotch, only the trailing team can roll. In Wolf, either team can hammer. Does the app enforce this distinction?
- **Is maxMultiplier working?** (Previous audit flagged this as a bug in Scotch — the cap never reaches the engine.)

### 5. Output Format

Please provide:

1. **Architecture summary** — How the shared module works, what's shared vs game-specific
2. **Wolf behavior** — Exact UI flow for throwing/accepting/declining a hammer
3. **Scotch behavior** — Exact UI flow for rolling/accepting/declining
4. **Differences list** — Every behavioral difference between Wolf hammer and Scotch roll in the app
5. **Accuracy assessment** — Is the app's behavior reasonable for a score-entry tool, even if it doesn't perfectly mirror real-world timing? Any actual bugs or misleading behaviors?
6. **maxMultiplier bug status** — Is this still broken from the previous audit?

Don't worry about the real-world timing distinction being perfectly replicated — we know the app is score-entry-based, not shot-by-shot. We just want to confirm the *scope* (current hole vs remaining holes) and *initiation rules* (either team vs trailing team only) are correct for each game.
