# Game Engine Feature Audit — Prompt Template

> **How to use:** Replace `[GAME NAME]` with the game you're auditing. Copy the prompt block into Claude Code in the app repo. Paste the output into `content/game-guides/[game]-audit.md`.

---

> Run a full feature audit of the **[GAME NAME]** game engine. I need this to write the game guide for the website. Cover these areas in detail:
>
> **1. Configuration fields** — List every configurable option with its type, allowed values, and default. Include scoring mode, handicap handling, stake/value fields, boolean variation toggles, structure options, and any per-hole or per-player settings. Note which fields are optional or conditional.
>
> **2. Core game logic** — How does the game determine winners, assign points/scores, and handle the fundamental mechanic? Walk through the main scoring loop hole by hole. What inputs does the engine need per hole and what does it output?
>
> **3. Tie handling** — What happens when players tie? Cover all tie scenarios (two-way, three-way, four-way if applicable). Does the game have carryover, push, split, or other tie resolution?
>
> **4. Handicap support** — Net vs gross, stroke index allocation, off-low-man calculation. Does it support partial handicap (50%, 80%) or only full/none?
>
> **5. Variations & special rules** — List every optional variation the engine supports (toggled on/off via config). For each: what triggers it, what it changes, and how it interacts with other variations.
>
> **6. Settlement** — How is the final payout calculated? Pairwise, pooled, or other model? Show the math for a sample round. Is it zero-sum verified? Integer cent arithmetic? Does the engine produce line-item breakdowns?
>
> **7. Player count** — How many players does the engine support? Is it locked to a specific number or flexible? If flexible, how does the logic change with different player counts?
>
> **8. Edge cases** — What happens if a player doesn't finish a hole? What about score corrections? Missing inputs? Player withdrawal mid-round? Any hole-18-specific logic?
>
> **9. Test coverage** — How many dedicated tests? Any property-based invariant checks? What do they verify (zero-sum, point conservation, ranking correctness, etc.)? How many random iterations per property test?
>
> **10. Architecture** — Pure functional? Stateless? Score correction behavior? Shared modules with other games? Any known limitations, TODOs, or incomplete features?
>
> **Output format:** Provide a bullet-point feature audit organized by these categories. List every capability so I can compare against the original game rules doc and web research on how golfers actually play [GAME NAME] to identify feature gaps.
