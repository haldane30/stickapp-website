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

// ─── Content Images ─────────────────────────────────────────────────────────
// Central mapping of content slugs → processed image filenames.
// All images live in /images/blog/ and have -card (3:2, 1200px) and -hero (2:1, 1600px) variants.

export const contentImages: Record<string, { card: string; hero: string; alt: string }> = {
  // Blog posts
  "golf-betting-for-beginners": {
    card: "/images/blog/bobby-jones-Scq-tbV_jjs-unsplash-card.jpg",
    hero: "/images/blog/bobby-jones-Scq-tbV_jjs-unsplash-hero.jpg",
    alt: "Morning light filtering through cypress trees on a golf course fairway",
  },
  "golf-betting-games-masters-week": {
    card: "/images/blog/welcome-r1NYKtFS6VQ-unsplash-card.jpg",
    hero: "/images/blog/welcome-r1NYKtFS6VQ-unsplash-hero.jpg",
    alt: "Aerial view of a links golf course at golden hour",
  },
  "best-golf-betting-games-3-players": {
    card: "/images/blog/sugar-golf-mqQ0BuJ5dsA-unsplash-card.jpg",
    hero: "/images/blog/sugar-golf-mqQ0BuJ5dsA-unsplash-hero.jpg",
    alt: "Three golfers cheersing beers on the course at sunset",
  },
  "best-golf-betting-apps-2026": {
    card: "/images/blog/andrew-anderson-6I0LxsA7Pd4-unsplash-card.jpg",
    hero: "/images/blog/andrew-anderson-6I0LxsA7Pd4-unsplash-hero.jpg",
    alt: "Two golfers on a coastal course overlooking the ocean",
  },
  // Reference guides
  handicaps: {
    card: "/images/blog/peter-drew-9idjx1KAyTU-unsplash-card.jpg",
    hero: "/images/blog/peter-drew-9idjx1KAyTU-unsplash-hero.jpg",
    alt: "Golf ball at the edge of the hole with putter in the background",
  },
  presses: {
    card: "/images/blog/andrew-shelley-Yu6Z_Fia1Ls-unsplash-card.jpg",
    hero: "/images/blog/andrew-shelley-Yu6Z_Fia1Ls-unsplash-hero.jpg",
    alt: "Golfer hitting an iron shot on a links course with bunkers",
  },
  settlement: {
    card: "/images/blog/adrian-hernandez-b8JAAnEEPG8-unsplash-card.jpg",
    hero: "/images/blog/adrian-hernandez-b8JAAnEEPG8-unsplash-hero.jpg",
    alt: "Red 18th hole flag waving against the sky",
  },
};

// Homepage hero image
export const heroImage = {
  src: "/images/blog/dan-congdon-gJeusCuFyYA-unsplash-hero.jpg",
  alt: "Mountain golf course at golden hour with dramatic peaks in the background",
};

// ─── Game Data ──────────────────────────────────────────────────────────────

export interface GameInfo {
  slug: string;
  name: string;
  hook: string;
  players: string;
  description: string;
}

// Game emojis — visual identity for each game across cards, lists, etc.
export const gameEmojis: Record<string, string> = {
  nassau: "🏆",
  skins: "💰",
  wolf: "🐺",
  snake: "🐍",
  "match-play": "⚔️",
  vegas: "🎰",
  "nine-point": "9️⃣",
  junk: "🎯",
  sixes: "6️⃣",
  "split-sixes": "🔀",
  scotch: "🥃",
  quota: "🏹",
};

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
    slug: "junk",
    name: "Junk",
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
