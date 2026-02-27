# Technical SEO Specification — stickapp.golf

> This is the engineering blueprint for SEO. Every technical decision documented here should be implemented before content goes live.
> Last updated: February 27, 2026

---

## Why This Document Exists

Our SEO master strategy defines *what* to build and *why*. This document defines *how* — the exact technical implementation that ensures every page we publish is optimized from day one. It covers rendering, schema markup, internal linking architecture, image handling, performance targets, and the patterns that compound over time.

This was informed by deep research into 2025-2026 SEO best practices, competitor technical analysis, and Google's current ranking factors.

---

## 1. Rendering Strategy

### Static Generation First

Every content page (game guides, blog posts, hub pages) should be statically generated at build time using Next.js `generateStaticParams`. This gives us:

- Fully rendered HTML that search bots receive immediately (no JavaScript execution needed)
- Sub-second load times from Vercel's edge CDN
- Perfect Lighthouse scores out of the box

Use Incremental Static Regeneration (ISR) with a 24-hour revalidation window so content updates propagate without full rebuilds.

```typescript
// app/games/[slug]/page.tsx
export async function generateStaticParams() {
  return games.map((game) => ({ slug: game.slug }));
}

export const revalidate = 86400; // 24 hours
```

### Server Components by Default

All content pages should be React Server Components (no `"use client"` directive). This keeps the JavaScript bundle minimal — only ship JS for interactive elements (calculators, mobile nav toggle, etc.). Smaller bundles = faster INP = better rankings.

Client components should be isolated to specific interactive widgets and lazy-loaded below the fold where possible.

---

## 2. Metadata Implementation

### Per-Page Metadata via Next.js API

Every content page exports a `generateMetadata` function. This ensures metadata is server-rendered and visible to crawlers without JS execution.

```typescript
export async function generateMetadata({ params }): Promise<Metadata> {
  const game = getGame(params.slug);
  return {
    title: `${game.title} | Stick Golf`,
    description: game.metaDescription, // 150-160 chars, keyword + CTA
    alternates: {
      canonical: `https://stickapp.golf/games/${params.slug}/`,
    },
    openGraph: {
      title: game.ogTitle,
      description: game.ogDescription,
      url: `https://stickapp.golf/games/${params.slug}/`,
      siteName: 'Stick Golf',
      images: [{
        url: `/og/${params.slug}.png`,
        width: 1200,
        height: 630,
        alt: game.ogImageAlt,
      }],
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: game.ogTitle,
      description: game.ogDescription,
      images: [`/og/${params.slug}.png`],
    },
  };
}
```

### Title Tag Rules

- Format: `{Page Title} | Stick Golf`
- Max 60 characters (Google truncates longer titles)
- Target keyword near the front
- Game guides: `Nassau Golf Betting Game: Rules, Strategy & Settlement | Stick Golf`
- Blog posts: `Best Golf Betting Apps in 2026 (Honest Comparison) | Stick Golf`

### Meta Description Rules

- 150-160 characters
- Include target keyword naturally
- End with a soft CTA or value proposition
- Example: `Complete Nassau rules with real settlement math, pressing strategy, and house rules. Track your next Nassau automatically with Stick.`

---

## 3. Schema Markup Strategy

All schema uses JSON-LD format exclusively. Placed in `<script type="application/ld+json">` tags rendered server-side.

### 3.1 Organization Schema (Site-Wide)

Applied in the root layout. Establishes Stick Golf as a recognized entity.

```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Stick Golf",
  "url": "https://stickapp.golf",
  "logo": "https://stickapp.golf/logo.png",
  "description": "The golf betting app with 12 games, real-time scoring, and automatic settlement.",
  "sameAs": []
}
```

### 3.2 SoftwareApplication Schema (Homepage + Pricing)

Signals to Google what our product is. Enables potential rich results for app searches.

```json
{
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Stick Golf",
  "operatingSystem": "iOS",
  "applicationCategory": "SportsApplication",
  "description": "Track 12 golf betting games with real-time scoring, automatic settlement, and multi-device sync.",
  "offers": {
    "@type": "Offer",
    "price": "59.99",
    "priceCurrency": "USD",
    "billingIncrement": "P1Y",
    "description": "Annual subscription after 3-round free trial"
  },
  "downloadUrl": "https://apps.apple.com/app/stick-golf/id...",
  "screenshot": "https://stickapp.golf/screenshots/scoring.png"
}
```

### 3.3 Article Schema (Every Game Guide + Blog Post)

```json
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Nassau Golf Betting Game: Rules, Strategy & Settlement",
  "description": "Complete guide to playing Nassau...",
  "author": {
    "@type": "Organization",
    "name": "Stick Golf",
    "url": "https://stickapp.golf"
  },
  "publisher": {
    "@type": "Organization",
    "name": "Stick Golf",
    "logo": {
      "@type": "ImageObject",
      "url": "https://stickapp.golf/logo.png"
    }
  },
  "datePublished": "2026-03-01T00:00:00Z",
  "dateModified": "2026-03-01T00:00:00Z",
  "image": "https://stickapp.golf/images/nassau-hero.webp",
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": "https://stickapp.golf/games/nassau/"
  }
}
```

**Note on authorship:** We publish as "Stick Golf" (the brand), not a personal author. If Justin later wants a personal byline for E-E-A-T signals, we can add a Person schema with credentials. For now, the brand voice is the right call.

### 3.4 FAQPage Schema (Every Game Guide)

Google no longer shows FAQ rich results for most sites (restricted to government/health since 2023). However, FAQ schema still:
- Helps Google understand content structure
- Improves featured snippet eligibility
- Feeds AI Overviews with structured Q&A pairs
- Costs nothing to implement

```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How much does a Nassau bet typically cost?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "A typical Nassau bet ranges from $2-$2-$2 (front, back, overall) for casual groups to $10-$10-$20 or more for competitive players. The three numbers represent the wager on the front nine, back nine, and overall 18-hole match."
      }
    }
  ]
}
```

Include 5-8 genuine questions per game guide. Source these from Google's "People Also Ask" for each target keyword, plus common questions from golf forums.

### 3.5 BreadcrumbList Schema (Every Page Except Homepage)

```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://stickapp.golf/" },
    { "@type": "ListItem", "position": 2, "name": "Games", "item": "https://stickapp.golf/games/" },
    { "@type": "ListItem", "position": 3, "name": "Nassau", "item": "https://stickapp.golf/games/nassau/" }
  ]
}
```

### 3.6 HowTo Schema (Optional, for Step-by-Step Sections)

Use selectively on game guides where the "How It Works" section is genuinely step-by-step. Don't force it — only apply where the content naturally fits the format.

### Schema Implementation Pattern

Create a reusable `<JsonLd>` component that takes typed props and renders the script tag server-side:

```typescript
// components/JsonLd.tsx
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
```

Each page composes multiple schema objects. A game guide page renders Article + FAQPage + BreadcrumbList.

---

## 4. Internal Linking Architecture

### Hub-and-Spoke Model

This is the single most important architectural decision for long-term SEO compounding.

```
/games/                              ← HUB (pillar page)
├── /games/nassau/                   ← SPOKE (game guide)
│   ├── links to: /games/ (hub)
│   ├── links to: /games/skins/ (related game)
│   ├── links to: /games/wolf/ (related game)
│   ├── links to: /blog/nassau-press-strategy/ (deep dive)
│   └── links to: /blog/how-to-settle-nassau/ (deep dive)
│
├── /games/wolf/                     ← SPOKE
│   ├── links to: /games/ (hub)
│   ├── links to: /games/nassau/ (related)
│   └── links to: /blog/wolf-strategy/ (deep dive)
│
└── ... (all 12 games)

/blog/
├── /blog/nassau-press-strategy/     ← SUPPORTING CONTENT
│   ├── links to: /games/nassau/ (parent spoke)
│   ├── links to: /games/ (hub)
│   └── links to: /blog/wolf-strategy/ (related)
│
└── /blog/best-golf-betting-apps/    ← COMMERCIAL CONTENT
    ├── links to: /games/ (hub)
    ├── links to: /games/nassau/ (featured game)
    └── links to: /games/wolf/ (featured game)
```

### Why This Compounds

When any page in a cluster earns a backlink, the authority flows through internal links to every other page in the cluster. A backlink to your Nassau press strategy blog post strengthens the Nassau game guide, the games hub, and indirectly every other game guide. Over time, the entire cluster rises together.

### Link Rules

**Contextual links (in body text) are king.** These carry more weight than sidebar, footer, or programmatic "related posts" links. Every internal link should be embedded naturally in the content.

**Per-page targets:**
- Game guides: 5-8 internal links (hub + 2-3 related games + 1-2 blog posts)
- Blog posts: 3-5 internal links (parent game guide + hub + 1-2 related posts)
- Hub page: Links to all 12 game guides + 2-3 featured blog posts

**Anchor text rules:**
- Descriptive and varied: "Nassau pressing strategy," "when to press in Nassau," "the press bet"
- Never use "click here" or "learn more" — these carry zero topical signal
- Don't use the exact same anchor text for every link to a page — vary it naturally
- 3-5 anchor text variations per target page

### Programmatic Linking (Supplementary)

In addition to contextual links, each game guide should have:
- **"Related Games" section** at the bottom linking to 2-3 games that pair well
- **Breadcrumb navigation** (Home > Games > Nassau)
- **"Further Reading" block** linking to related blog posts

These supplement contextual links but don't replace them.

### Link Map (Build Before Writing Content)

Before writing the first game guide, create a link map that defines:
- Which games link to each other (based on relatedness)
- Which blog posts support which game guides
- The anchor text variations for each target page

This prevents ad-hoc linking that creates an inconsistent structure.

### Relatedness Map (Which Games Link to Each Other)

| Game | Related Games (Link To) | Why |
|------|------------------------|-----|
| Nassau | Skins, Match Play, Wolf | Most common pairings |
| Skins | Nassau, Dots, Vegas | Often played as side bets |
| Wolf | Nassau, Nine Point | Strategy depth + player count overlap |
| Snake | Skins, Dots | Side bet family |
| Match Play | Nassau, Skins | Head-to-head family |
| Nine Point | Wolf, Split Sixes | 3-player games |
| Split Sixes | Sixes, Nine Point | Scoring structure similarity |
| Sixes | Split Sixes, Wolf | Rotating partner games |
| Dots | Skins, Snake | Point-based side bets |
| Vegas | Nassau, Skins | Team game family |
| Scotch | Nassau, Match Play | Alternate shot format |
| Quota | Skins, Dots | Individual scoring games |

---

## 5. Content Structure for Rankings

### Inverted Pyramid: Answer First, Then Elaborate

Google's AI Overviews and featured snippets both pull from the opening paragraphs. Every page should answer the core question in the first 100 words, then expand.

```
PARAGRAPH 1: Direct answer (50-80 words)
"Nassau is a three-bet golf game where players compete on the front nine,
back nine, and overall 18 holes separately. Each segment has its own wager,
and presses let you create new bets mid-round. It's the most popular
betting format in golf."

SECTION 2-N: Depth, examples, variations, strategy
...

FAQ: Specific questions answered in 2-3 sentences each
```

### Table of Contents

Include a visible, linked TOC at the top of every game guide and long blog post (1,000+ words). Benefits:
- Users jump to the section they need (better engagement metrics)
- Google can use section anchors to understand content structure
- Mobile users especially benefit from easy navigation
- AI systems can parse and cite specific sections

### Featured Snippet Optimization

For each game guide, include at least one section formatted to win a featured snippet:

**Definition snippet** (paragraph format, 40-60 words):
```
## What Is a Nassau in Golf?
A Nassau is a three-part betting format where players wager separately
on the front nine, back nine, and overall 18 holes. Each segment is
its own independent match. Presses allow players to start additional
bets mid-round, typically when trailing by 2 or more holes.
```

**List snippet** (for "how to" queries):
```
## How to Set Up a Nassau
1. Agree on the wager amount for each segment (e.g., $5-$5-$10)
2. Decide on handicap strokes (if playing net)
3. Set press rules (automatic at 2-down, or by choice)
4. Play the front nine as match play
5. Reset for the back nine
6. Settle all three bets plus any presses after 18
```

**Table snippet** (for comparison queries):
```
## Nassau Bet Structure
| Segment | Wager | Winner |
|---------|-------|--------|
| Front 9 | $5 | Player with more holes won |
| Back 9 | $5 | Player with more holes won |
| Overall | $10 | Player with more total holes won |
```

### AI Overview Optimization (Google SGE)

AI Overviews now appear in ~47% of searches. They prioritize:

- **E-E-A-T signals**: Experience, Expertise, Authoritativeness, Trust. Our content demonstrates experience (we built the calculators), expertise (settlement math with edge cases), and trust (zero-sum verification, honest competitor comparisons).
- **Comprehensive coverage**: AI Overviews synthesize from sources that answer the full scope of a query. Our 2,000+ word guides with variations, edge cases, and FAQ sections provide exactly this.
- **Structured data**: Article, FAQPage, and HowTo schema help AI systems extract and attribute content correctly.
- **Cited sources**: When AI Overview cites you, it drives traffic. Structured, clear content with distinct sections is more likely to be cited.

### People Also Ask (PAA) Optimization

For each target keyword, research the "People Also Ask" questions that appear in Google results. Structure H2/H3 headings to match these questions naturally.

Common PAA patterns for golf betting:
- "What is [game] in golf?"
- "How do you score [game]?"
- "How many players do you need for [game]?"
- "What's the difference between [game A] and [game B]?"
- "How much do you bet on [game]?"

Answer each in 2-3 sentences under the heading, then expand with detail below.

---

## 6. Image Optimization

### Format Priority

Use `next/image` component for automatic optimization. It handles format negotiation (serves AVIF or WebP based on browser support), lazy loading, and responsive sizing.

```tsx
import Image from 'next/image';

<Image
  src="/images/nassau-settlement.png"
  alt="Nassau settlement example showing front nine, back nine, and overall results for a four-player group"
  width={800}
  height={450}
  priority={false} // true only for above-fold hero images
/>
```

### Rules

- **Hero images**: Set `priority={true}` (disables lazy loading, preloads for LCP)
- **Below-fold images**: Default lazy loading (automatic with next/image)
- **Alt text**: Descriptive, keyword-relevant where natural. Not "nassau.png" — "Nassau settlement table showing Marcus winning the front nine and Sarah winning overall"
- **Responsive**: Let next/image handle srcset generation
- **File naming**: Descriptive slugs — `nassau-settlement-example.png` not `IMG_4523.png`

### OG Images

Generate static OG images (1200×630) for each page. These appear in social shares and messaging apps. Include:
- Page title
- Stick Golf branding
- Relevant visual (game illustration or screenshot)
- The watercolor illustration for that game (when available)

Can use `@vercel/og` for dynamic generation or pre-generate static images.

---

## 7. Performance Targets

These are direct ranking factors. Monitor monthly via Vercel Analytics and Google PageSpeed Insights.

| Metric | Target | What It Measures |
|--------|--------|-----------------|
| LCP | < 2.5s | When main content finishes loading |
| INP | < 200ms | Responsiveness when users interact |
| CLS | < 0.1 | Visual stability (no layout shifts) |
| Lighthouse Performance | > 90 | Overall performance score |
| Time to First Byte | < 200ms | Server response speed (Vercel edge handles this) |

### How to Hit These

- Static generation eliminates server rendering time
- Server Components minimize client-side JS
- next/image handles image optimization
- Vercel's edge CDN serves assets from nearest location
- Lazy-load everything below the fold
- No external fonts that block rendering (self-host fonts)
- Minimize third-party scripts (analytics should load async)

---

## 8. URL & Routing

### Structure

```
/                           → Homepage
/games/                     → Games hub (pillar page)
/games/nassau/              → Game guide
/games/wolf/                → Game guide
/blog/                      → Blog index
/blog/best-golf-betting-apps/  → Blog post
/pricing/                   → Pricing page
/about/                     → About page
/privacy/                   → Privacy policy
/terms/                     → Terms of service
```

### Rules

- Lowercase only, hyphens for word separation
- No trailing slashes (pick one convention and enforce it)
- No dates in URLs (`/blog/best-apps/` not `/blog/2026/03/best-apps/`)
- No file extensions (`/games/nassau/` not `/games/nassau.html`)
- Self-referencing canonical on every page
- 301 redirect any URL variations to canonical (e.g., trailing slash → no trailing slash)

### Handling the Existing Site

The current `stickapp.golf` has `index.html`, `/privacy/`, and `/terms/`. When we deploy Next.js:
- Redirect `/index.html` → `/` (301)
- Migrate `/privacy/` and `/terms/` content into Next.js pages at the same URLs
- Preserve the CNAME configuration

---

## 9. Sitemap & Robots

### sitemap.ts

```typescript
import { MetadataRoute } from 'next';
import { getAllGames, getAllBlogPosts } from '@/lib/content';

export default function sitemap(): MetadataRoute.Sitemap {
  const games = getAllGames();
  const posts = getAllBlogPosts();

  return [
    {
      url: 'https://stickapp.golf',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: 'https://stickapp.golf/games/',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    ...games.map((game) => ({
      url: `https://stickapp.golf/games/${game.slug}/`,
      lastModified: game.updatedAt,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    })),
    {
      url: 'https://stickapp.golf/blog/',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    ...posts.map((post) => ({
      url: `https://stickapp.golf/blog/${post.slug}/`,
      lastModified: post.updatedAt,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
    {
      url: 'https://stickapp.golf/pricing/',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
  ];
}
```

### robots.ts

```typescript
import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/_next/'],
    },
    sitemap: 'https://stickapp.golf/sitemap.xml',
  };
}
```

Submit sitemap to Google Search Console and Bing Webmaster Tools on day one.

---

## 10. Fonts & Loading

### Self-Host Fonts

Never load fonts from Google Fonts CDN — it adds a blocking request to a third-party domain. Download the font files and serve them locally.

Next.js has built-in font optimization:

```typescript
// app/layout.tsx
import { Playfair_Display, Inter } from 'next/font/google';

const serif = Playfair_Display({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-serif',
});

const sans = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sans',
});
```

`display: 'swap'` prevents font-blocking render. Text shows immediately in a fallback font, then swaps when the custom font loads. This protects LCP and CLS.

**Note:** The design brief calls for serif headlines + sans-serif body. The specific typefaces haven't been chosen yet — this is an open design decision. The pattern above works for any font pairing.

---

## 11. Analytics Setup

### Day-One Tools

| Tool | Purpose | Implementation |
|------|---------|---------------|
| Google Search Console | Indexing, rankings, crawl errors | Verify domain ownership |
| Vercel Analytics | Core Web Vitals, traffic | Built into Vercel deployment |
| PostHog | User behavior, funnels, UTM tracking | Script tag (async, non-blocking) |

### UTM Parameter Strategy

Every CTA linking to the App Store should include UTM parameters so we can track which content drives downloads:

```
https://apps.apple.com/app/stick-golf/id...
  ?utm_source=stickapp.golf
  &utm_medium=content
  &utm_campaign=nassau-guide
```

Track in PostHog: content page → App Store click-through → (attribution via App Store Connect if possible).

---

## 12. Pre-Launch Checklist

Before the site goes live, verify:

### Technical
- [ ] All pages statically generated (check build output)
- [ ] Sitemap renders correctly at `/sitemap.xml`
- [ ] Robots.txt renders correctly at `/robots.txt`
- [ ] Canonical URLs are self-referencing on every page
- [ ] No `noindex` tags on any content page
- [ ] 301 redirects from old URLs (`/index.html` → `/`)
- [ ] HTTPS working (Vercel handles this)
- [ ] Custom domain (stickapp.golf) configured

### Schema
- [ ] Organization schema on every page (root layout)
- [ ] Article schema on every game guide and blog post
- [ ] FAQPage schema on every game guide
- [ ] BreadcrumbList schema on every page except homepage
- [ ] SoftwareApplication schema on homepage
- [ ] Validate all schema with Google Rich Results Test

### Performance
- [ ] Lighthouse Performance > 90 on homepage
- [ ] Lighthouse Performance > 90 on a game guide page
- [ ] LCP < 2.5s on mobile
- [ ] CLS < 0.1 on all pages
- [ ] No render-blocking resources
- [ ] Images optimized (next/image, WebP/AVIF)

### Content
- [ ] Every page has unique title tag (< 60 chars)
- [ ] Every page has unique meta description (150-160 chars)
- [ ] Every page has OG image (1200×630)
- [ ] All images have descriptive alt text
- [ ] Internal links follow the hub-and-spoke map
- [ ] No orphan pages (every page is linked from at least one other page)

### Analytics
- [ ] Google Search Console verified
- [ ] Bing Webmaster Tools verified
- [ ] Vercel Analytics enabled
- [ ] PostHog installed (async, non-blocking)
- [ ] UTM parameters on all App Store links

---

## Related Documents

| Document | What It Covers |
|----------|---------------|
| [SEO Master Strategy](seo-master-strategy.md) | Competitive landscape, keyword research, content priorities |
| [Content Strategy](../content/content-strategy.md) | Content architecture, quality standards, production workflow |
| [Content Calendar](../content/content-calendar.md) | All 36 planned content pieces with priority |
| [Design Brief](../brand/design-brief.md) | Visual direction, color palette, typography |
