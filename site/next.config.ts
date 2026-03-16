import type { NextConfig } from "next";
import createMDX from "@next/mdx";

const nextConfig: NextConfig = {
  // Enable MDX pages
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],

  // Serve pages at trailing-slash URLs (e.g. /games/nassau/).
  // Must match the URLs declared in sitemap.ts, canonical tags, and OG tags.
  // Without this, Vercel 308-redirects trailing-slash URLs to non-slash,
  // which Google reports as "Redirect error" for every sitemap entry.
  trailingSlash: true,

  // Static export for Vercel (can remove if using server features)
  // output: 'export',

  images: {
    // Domains for external images (add as needed)
    remotePatterns: [],
  },

  // ─── Game Alias Redirects ──────────────────────────────────────────────────
  // 301 redirects from common alternate names to canonical game slugs.
  // With trailingSlash: true, Vercel normalizes /games/dots → /games/dots/
  // before matching these rules, so we only need trailing-slash sources.
  // Source: strategy/content/game-aliases.md
  async redirects() {
    return [
      // Junk aliases (Dots, Trash, Garbage are all equally common)
      { source: "/games/dots/", destination: "/games/junk/", permanent: true },
      { source: "/games/trash/", destination: "/games/junk/", permanent: true },
      { source: "/games/garbage/", destination: "/games/junk/", permanent: true },

      // Sixes aliases (Hollywood and Round Robin are equally common)
      { source: "/games/hollywood/", destination: "/games/sixes/", permanent: true },
      { source: "/games/round-robin/", destination: "/games/sixes/", permanent: true },

      // Quota aliases (Chicago is equally common in many regions)
      { source: "/games/chicago/", destination: "/games/quota/", permanent: true },
      { source: "/games/point-quota/", destination: "/games/quota/", permanent: true },

      // Nine Point aliases (Nines is possibly more common than Nine Point)
      { source: "/games/nines/", destination: "/games/nine-point/", permanent: true },
      { source: "/games/5-3-1/", destination: "/games/nine-point/", permanent: true },

      // Split Sixes aliases (English is common in certain US regions)
      { source: "/games/english/", destination: "/games/split-sixes/", permanent: true },
      { source: "/games/4-2-0/", destination: "/games/split-sixes/", permanent: true },

      // Vegas aliases
      { source: "/games/las-vegas/", destination: "/games/vegas/", permanent: true },
      { source: "/games/daytona/", destination: "/games/vegas/", permanent: true },

      // Snake aliases (Animals / Zoo refer to the broader category)
      { source: "/games/animals/", destination: "/games/snake/", permanent: true },
      { source: "/games/zoo/", destination: "/games/snake/", permanent: true },

      // Scotch aliases
      { source: "/games/six-point-scotch/", destination: "/games/scotch/", permanent: true },

      // Match Play alias (with/without hyphen)
      { source: "/games/matchplay/", destination: "/games/match-play/", permanent: true },

      // Nine Point alias (without hyphen)
      { source: "/games/ninepoint/", destination: "/games/nine-point/", permanent: true },

      // Split Sixes alias (without hyphen)
      { source: "/games/splitsixes/", destination: "/games/split-sixes/", permanent: true },
    ];
  },
};

const withMDX = createMDX({
  // Add MDX plugins here if needed
  options: {
    remarkPlugins: [],
    rehypePlugins: [],
  },
});

export default withMDX(nextConfig);
