---
name: stick-audit
description: "Run a content quality audit across all published pages on stickapp.golf. Checks every MDX file against the Part 8 checklist from the content framework — kill list violations, meta description length, internal link count, FAQ count and answer length, CTA placement, outbound links, corporate speak, and more. Use this skill whenever you want to audit content quality, check for regressions, or verify a page before publishing. Trigger on: audit, content check, quality check, Part 8, checklist, pre-publish review, regression check."
---

# Stick Content Audit Skill

You are auditing content pages for stickapp.golf against the quality standards defined in the content framework.

## What This Does

Runs an automated quality check across all (or specific) published MDX content files. It catches the issues we've historically found manually: kill list violations, meta descriptions that are too long, missing CTAs, insufficient internal links, FAQ answers that are too short, and corporate speak.

## How to Run

1. Run the audit script: `python3 /path/to/scripts/audit.py /path/to/site/src/content/`
2. Review the output — it's organized by file with issues grouped by category
3. Present a summary to the user with the most actionable findings first

If the user asks to audit a specific page, pass the file path directly: `python3 audit.py /path/to/file.mdx`

## What It Checks

The audit covers three categories from the Part 8 checklist:

### Content Checks
- Opening paragraph answers the core question in under 60 words
- Target keyword appears in title, first 100 words, and meta description
- At least 3 internal links (markdown links to other stickapp.golf pages)
- At least 1 outbound link to a trusted external source
- FAQ section has 5-8 questions
- Each FAQ answer is 40-60 words (self-contained)
- No kill list words or phrases (see below)
- No cheesy phrases (see below)
- At least one CTA mentioning Stick or the app

### Technical Checks
- Title tag under 60 characters
- Meta description between 130-160 characters
- Has publishedAt and updatedAt dates
- Has keywords array in frontmatter

### Voice Checks
- No corporate speak (leverage, utilize, functionality, solution, etc.)
- Maximum one exclamation point per piece
- Uses first-person voice ("we," "our")
- Has named players in examples (Justin, Jason, Evan, Todd)

## The Kill List

These words and phrases must never appear in Stick content:

delve, it's important to note, in today's, landscape (as metaphor), leverage, seamless, seamlessly, transformative, unlock (potential/value), comprehensive (self-describing), navigate (as metaphor), cutting-edge, robust, multifaceted, revolutionize, it's worth noting, testament to, pivotal, game-changer, embark, moreover, furthermore, in terms of, arguably

## The Cheesy Phrases List

gets the blood pumping, where things get interesting, that's when the real fun begins, things can get wild, the drama unfolds, it's a whole different ballgame, the stakes are high, you won't want to miss, at the end of the day, it all comes down to, here's where it gets good, buckle up

## Corporate Speak List

leverage, utilize, functionality, solution, optimize (when meaning "improve"), synergy, stakeholder, deliverable, actionable, streamline, ecosystem, paradigm, bandwidth (non-technical), circle back, deep dive (as noun), unpack (as metaphor)

## Output Format

Present results as a clean summary:

```
## Content Audit Results — [date]

### Pages Audited: X

### Issues Found: Y total across Z pages

**Critical (fix before publish):**
- [file]: [issue description]

**Warnings (should fix):**
- [file]: [issue description]

**Clean Pages:**
- [list of pages with no issues]
```

Critical issues: kill list violations, missing FAQs, meta description wrong length, zero internal links
Warnings: FAQ answers outside 40-60 word range, missing outbound link, missing CTA, only 1-2 internal links, missing first-person voice

## After the Audit

Offer to fix issues automatically where possible (kill list word replacements, meta description trimming). For subjective issues (voice, personality), flag them but let Justin decide.
