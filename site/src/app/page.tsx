import { games } from "@/lib/tokens";
import { GameCard } from "@/components/GameCard";
import { JsonLd } from "@/components/JsonLd";

// SoftwareApplication schema for homepage
const appSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Stick Golf",
  operatingSystem: "iOS",
  applicationCategory: "SportsApplication",
  description:
    "Track 12 golf betting games with real-time scoring, automatic settlement, and multi-device sync.",
  offers: {
    "@type": "Offer",
    price: "59.99",
    priceCurrency: "USD",
  },
  // downloadUrl: "https://apps.apple.com/app/stick-golf/id...",
};

// Published blog posts
const blogPosts = [
  {
    slug: "best-golf-betting-apps-2026",
    category: "Comparison",
    title: "Best Golf Betting Apps in 2026",
    excerpt:
      "An honest look at every app that tracks your golf bets — including ours.",
  },
  {
    slug: "best-golf-betting-games-3-players",
    category: "Guide",
    title: "Best Golf Betting Games for 3 Players",
    excerpt:
      "The 5 best formats when your foursome is short a player. Rules, math, and what actually works.",
  },
  {
    slug: "golf-betting-games-masters-week",
    category: "Guide",
    title: "Best Golf Betting Games for Masters Week",
    excerpt:
      "6 games to play during the biggest week in golf. Settlement math, real stakes, and the right format for the energy.",
  },
];

export default function Home() {
  return (
    <>
      <JsonLd data={appSchema} />

      {/* ═══════════════════════════════════════════════════════════════════
          SECTION 1: HERO (Dark, Full-Bleed)
          ═══════════════════════════════════════════════════════════════════ */}
      <section className="section-dark relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background — replace with editorial golf photography or video loop */}
        <div className="absolute inset-0 animate-ken-burns">
          <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-canvas-dark)]/40 via-[var(--color-canvas-dark)]/20 to-[var(--color-canvas-dark)]/70" />
          {/* TODO: Replace with <Image> or <video> when hero asset is ready
          <Image
            src="/images/hero.jpg"
            alt="Golf course at golden hour"
            fill
            className="object-cover"
            priority
          />
          */}
          <div className="absolute inset-0 bg-[var(--color-canvas-dark)]/60" />
        </div>

        <div className="relative z-10 text-center px-6 max-w-3xl mx-auto pt-20">
          {/* Wordmark */}
          <p className="text-[var(--color-text-on-dark)] font-semibold text-lg tracking-wider uppercase mb-10 opacity-70">
            Stick Golf
          </p>

          {/* Headline */}
          <h1
            className="font-serif leading-[1.1] tracking-tight text-[var(--color-text-on-dark)]"
            style={{ fontSize: "clamp(40px, 6vw, 80px)" }}
          >
            Every bet. Every hole.
            <br />
            Settled.
          </h1>

          {/* Subtitle */}
          <p className="mt-6 text-lg md:text-xl text-[var(--color-text-secondary)] max-w-lg mx-auto">
            Track 12 golf betting games from one scorecard.
          </p>

          {/* CTA */}
          <div className="mt-10">
            <a
              href="https://apps.apple.com/app/stick-golf/id-placeholder?utm_source=stickapp.golf&utm_medium=website&utm_campaign=homepage"
              className="inline-block bg-[var(--color-coral)] hover:bg-[var(--color-coral-hover)] text-white font-medium text-base px-8 py-4 rounded-full transition-colors"
            >
              Download on the App Store
            </a>
            <p className="mt-3 text-xs text-[var(--color-text-secondary)]">
              Available on iOS
            </p>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          SECTION 2: THE PROBLEM (Light)
          ═══════════════════════════════════════════════════════════════════ */}
      <section className="section-light" style={{ padding: "var(--section-padding-y) 0" }}>
        <div className="mx-auto max-w-[var(--content-max-width)] px-6">
          {/* Overline */}
          <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[var(--color-text-secondary)] mb-4">
            The Problem
          </p>

          {/* Headline */}
          <h2
            className="font-serif text-[var(--color-text-on-light)]"
            style={{ fontSize: "clamp(32px, 4vw, 48px)", lineHeight: 1.15 }}
          >
            You know how this goes.
          </h2>

          {/* Two columns */}
          <div className="mt-10 grid md:grid-cols-2 gap-10 md:gap-16 max-w-4xl">
            <div className="text-[var(--color-text-secondary)] text-base md:text-lg leading-relaxed">
              <p>
                Someone birdies the 7th. Now nobody can remember if the press is
                live. The back-nine Nassau is two presses deep. Dave thinks he&apos;s
                up. Marcus thinks Dave&apos;s wrong. The scorecard is covered in
                arrows and question marks.
              </p>
            </div>
            <div className="text-[var(--color-text-on-light)] text-base md:text-lg leading-relaxed">
              <p>
                Stick tracks every bet, every press, every stroke — and settles
                the math before you reach the parking lot.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          SECTION 3: GAME SHOWCASE (Dark)
          ═══════════════════════════════════════════════════════════════════ */}
      <section className="section-dark" style={{ padding: "var(--section-padding-y) 0" }}>
        <div className="mx-auto max-w-[var(--content-max-width)] px-6">
          {/* Overline */}
          <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[var(--color-text-secondary)] mb-4">
            12 Games
          </p>

          {/* Headline */}
          <h2
            className="font-serif text-[var(--color-text-on-dark)]"
            style={{ fontSize: "clamp(32px, 4vw, 48px)", lineHeight: 1.15 }}
          >
            Every game your group plays.
          </h2>

          <p className="mt-4 text-[var(--color-text-secondary)] text-base md:text-lg max-w-xl">
            The most complete game library in golf, with the math to back it up.
          </p>

          {/* Game card grid */}
          <div className="mt-14 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {games.map((game) => (
              <GameCard key={game.slug} game={game} />
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          SECTION 4: SOCIAL PROOF / TRUST (Dark)
          ═══════════════════════════════════════════════════════════════════ */}
      <section className="section-light" style={{ padding: "var(--section-padding-y) 0" }}>
        <div className="mx-auto max-w-[var(--content-max-width)] px-6 text-center">
          {/* Overline */}
          <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[var(--color-text-secondary)] mb-4">
            Built to be trusted
          </p>

          <h2
            className="font-serif text-[var(--color-text-on-light)]"
            style={{ fontSize: "clamp(32px, 4vw, 48px)", lineHeight: 1.15 }}
          >
            The math is always right.
          </h2>

          <p className="mt-4 text-[var(--color-text-secondary)] text-base md:text-lg max-w-xl mx-auto">
            Every game engine is zero-sum verified. What one player wins, the others lose — to the cent.
          </p>

          {/* Stats row */}
          <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-12 sm:gap-8 max-w-3xl mx-auto">
            {[
              { number: "12", label: "games supported" },
              { number: "1,448", label: "tests verify the math" },
              { number: "$0.00", label: "rounding errors — ever" },
            ].map((stat) => (
              <div key={stat.label}>
                <p
                  className="font-sans font-bold text-[var(--color-coral)]"
                  style={{ fontSize: "clamp(40px, 5vw, 64px)" }}
                >
                  {stat.number}
                </p>
                <p className="mt-2 text-sm text-[var(--color-text-secondary)]">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          SECTION 5: FROM THE BLOG (Light)
          ═══════════════════════════════════════════════════════════════════ */}
      <section className="section-dark" style={{ padding: "var(--section-padding-y) 0" }}>
        <div className="mx-auto max-w-[var(--content-max-width)] px-6">
          {/* Overline */}
          <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[var(--color-text-secondary)] mb-4">
            From the Blog
          </p>

          <h2
            className="font-serif text-[var(--color-text-on-dark)]"
            style={{ fontSize: "clamp(32px, 4vw, 48px)", lineHeight: 1.15 }}
          >
            The golf betting playbook.
          </h2>

          {/* Blog posts — all published */}
          <div className="mt-14 grid md:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <a key={post.slug} href={`/blog/${post.slug}`} className="group">
                <div className="aspect-[16/10] rounded-xl bg-white/5 border border-white/5 mb-5 overflow-hidden">
                  <div className="w-full h-full bg-gradient-to-br from-[var(--color-forest)]/20 to-transparent" />
                </div>
                <p className="text-xs font-semibold uppercase tracking-wider text-[var(--color-text-secondary)] mb-2">
                  {post.category}
                </p>
                <h3 className="font-serif text-xl text-[var(--color-text-on-dark)] group-hover:text-[var(--color-coral)] transition-colors">
                  {post.title}
                </h3>
                <p className="mt-2 text-sm text-[var(--color-text-secondary)] leading-relaxed">
                  {post.excerpt}
                </p>
              </a>
            ))}
          </div>

          <div className="mt-10">
            <a
              href="/blog"
              className="text-sm font-medium text-[var(--color-coral)] hover:text-[var(--color-coral-hover)] transition-colors"
            >
              View all posts &rarr;
            </a>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          SECTION 6: FINAL CTA (Dark)
          ═══════════════════════════════════════════════════════════════════ */}
      <section
        id="download"
        className="section-dark relative overflow-hidden"
        style={{ padding: "var(--section-padding-y) 0" }}
      >
        {/* Background gradient — replace with photography when ready */}
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-forest)]/20 to-[var(--color-canvas-dark)]" />

        <div className="relative z-10 text-center px-6 max-w-2xl mx-auto">
          <h2
            className="font-serif text-[var(--color-text-on-dark)]"
            style={{ fontSize: "clamp(32px, 4vw, 56px)", lineHeight: 1.15 }}
          >
            Every bet. Every hole.
            <br />
            Settled.
          </h2>

          <div className="mt-10">
            <a
              href="https://apps.apple.com/app/stick-golf/id-placeholder?utm_source=stickapp.golf&utm_medium=website&utm_campaign=homepage"
              className="inline-block bg-[var(--color-coral)] hover:bg-[var(--color-coral-hover)] text-white font-medium text-base px-8 py-4 rounded-full transition-colors"
            >
              Download on the App Store
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
