/**
 * Design tokens for stickapp.golf
 *
 * These map directly to the design brief (strategy/brand/design-brief.md).
 * All visual values should come from here — never hardcode colors, spacing, or fonts.
 *
 * FONTS: Currently using system placeholders. When Justin selects his serif + sans
 * pairing, update the CSS variables in globals.css and the font imports in layout.tsx.
 * Everything else will cascade automatically.
 */

// ─── Colors ─────────────────────────────────────────────────────────────────

export const colors = {
  // Canvas
  canvasDark: "#0F0F0F",
  canvasLight: "#FAF8F5",

  // Text
  textOnDark: "#F0EBE3", // Warm white — NOT pure white
  textOnLight: "#1A1A1A", // Rich charcoal
  textSecondary: "#8A8580", // Warm gray for captions, metadata

  // Accent
  coral: "#E8735A", // Brand coral — CTAs, links on dark
  coralHover: "#D4604A", // Deepened coral for hover states
  forest: "#2A4A3A", // Deep green — secondary accent
  gold: "#C4A45A", // Warm brass — premium moments

  // Semantic
  positive: "#2E9E5B", // Wins, up status
  negative: "#E54D42", // Losses, down status
} as const;

// ─── Spacing ────────────────────────────────────────────────────────────────

export const spacing = {
  sectionPaddingY: {
    desktop: "160px",
    tablet: "120px",
    mobile: "80px",
  },
  contentMaxWidth: "1280px",
  readingMaxWidth: "720px",
  gridGap: {
    desktop: "48px",
    tablet: "32px",
    mobile: "24px",
  },
} as const;

// ─── Typography ─────────────────────────────────────────────────────────────

export const typography = {
  // These reference CSS variables so they're easy to swap
  fontSerif: "var(--font-serif)",
  fontSans: "var(--font-sans)",

  sizes: {
    heroHeadline: "clamp(40px, 6vw, 80px)",
    sectionHeadline: "clamp(32px, 4vw, 48px)",
    subsectionHeadline: "clamp(20px, 2.5vw, 28px)",
    bodyLarge: "clamp(16px, 1.5vw, 20px)",
    body: "16px",
    caption: "14px",
    overline: "12px",
  },
} as const;

// ─── Game Data ──────────────────────────────────────────────────────────────

export interface GameInfo {
  slug: string;
  name: string;
  hook: string;
  players: string;
  description: string;
}

export const games: GameInfo[] = [
  {
    slug: "nassau",
    name: "Nassau",
    hook: "The classic three-bet format.",
    players: "2–4 players",
    description:
      "Three separate bets on the front nine, back nine, and overall 18 holes. The most popular betting format in golf.",
  },
  {
    slug: "skins",
    name: "Skins",
    hook: "Winner takes all, hole by hole.",
    players: "2–8 players",
    description:
      "Each hole is worth a set amount. Win the hole outright, take the skin. Ties carry over to the next hole.",
  },
  {
    slug: "wolf",
    name: "Wolf",
    hook: "Choose your partner — or go it alone.",
    players: "4 players",
    description:
      "The Wolf picks a partner after watching tee shots — or goes lone wolf for double the stakes.",
  },
  {
    slug: "snake",
    name: "Snake",
    hook: "Don't three-putt. Trust us.",
    players: "3–4 players",
    description:
      "The last player to three-putt holds the snake and pays everyone at the end. Pure pressure on every putt.",
  },
  {
    slug: "match-play",
    name: "Match Play",
    hook: "Head to head. Hole by hole.",
    players: "2 players",
    description:
      "Win more holes than your opponent. The original format of competitive golf, distilled to its purest form.",
  },
  {
    slug: "vegas",
    name: "Vegas",
    hook: "Team up. Multiply the stakes.",
    players: "4 players",
    description:
      "Two-person teams combine their scores into a two-digit number. The difference between team numbers determines the payout.",
  },
  {
    slug: "nine-point",
    name: "Nine Point",
    hook: "The perfect three-player game.",
    players: "3 players",
    description:
      "Nine points are distributed among three players on every hole. Best score gets 5, worst gets 1, middle gets 3. Ties split.",
  },
  {
    slug: "dots",
    name: "Dots",
    hook: "Score every detail.",
    players: "2–4 players",
    description:
      "Points for everything — greenies, sandies, birdies, and more. The most customizable betting format in golf.",
  },
  {
    slug: "sixes",
    name: "Sixes",
    hook: "Rotating teams. Shifting alliances.",
    players: "4 players",
    description:
      "Teams rotate every six holes. Play with every possible partner combination across 18 holes.",
  },
  {
    slug: "split-sixes",
    name: "Split Sixes",
    hook: "Three-way battle. Every hole counts.",
    players: "3 players",
    description:
      "Six points split among three players each hole. Best gets 4, worst gets 0, middle gets 2. Similar to Nine Point but different math.",
  },
  {
    slug: "scotch",
    name: "Scotch",
    hook: "Alternate shot with a wager.",
    players: "4 players",
    description:
      "Two-person teams alternate shots on each hole. One ball per team, maximum teamwork, classic Scottish format.",
  },
  {
    slug: "quota",
    name: "Quota",
    hook: "Play against your own handicap.",
    players: "4–30+ players",
    description:
      "Each player has a point target based on their handicap. Beat your quota, win the difference. Perfect for large groups.",
  },
];
