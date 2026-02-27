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

export default function Home() {
  return (
    <>
      <JsonLd data={appSchema} />

      {/* ═══════════════════════════════════════════════════════════════════
          SECTION 1: HERO (Dark, Full-Bleed)
          ═══════════════════════════════════════════════════════════════════ */}
      <section className="section-dark relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background image placeholder — replace with editorial golf photography */}
        <div className="absolute inset-0 animate-ken-burns">
          <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-canvas-dark)]/40 via-[var(--color-canvas-dark)]/20 to-[var(--color-canvas-dark)]/70" />
          {/* TODO: Replace with <Image> when hero photo is ready
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
              href="#download"
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
          SECTION 4: THE PRODUCT (Light)
          ═══════════════════════════════════════════════════════════════════ */}
      <section className="section-light" style={{ padding: "var(--section-padding-y) 0" }}>
        <div className="mx-auto max-w-[var(--content-max-width)] px-6">
          {/* Overline */}
          <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[var(--color-text-secondary)] mb-4">
            The App
          </p>

          {/* Headline */}
          <h2
            className="font-serif text-[var(--color-text-on-light)]"
            style={{ fontSize: "clamp(32px, 4vw, 48px)", lineHeight: 1.15 }}
          >
            The math is always right.
          </h2>

          {/* Feature blocks */}
          <div className="mt-14 grid md:grid-cols-2 gap-16 items-center">
            {/* Text */}
            <div>
              <p className="text-[var(--color-text-on-light)] text-base md:text-lg leading-relaxed mb-6">
                Stick handles the scoring so you can focus on the round.
              </p>
              <ul className="space-y-4">
                {[
                  "Real-time multi-device sync",
                  "Automatic press tracking",
                  "Transparent settlement — every dollar accounted for",
                  "1,448 tests verify the math",
                ].map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[var(--color-coral)] flex-shrink-0" />
                    <span className="text-[var(--color-text-on-light)] text-base">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Screenshot placeholder */}
            <div className="bg-[var(--color-canvas-dark)] rounded-2xl aspect-[9/16] max-w-[320px] mx-auto flex items-center justify-center">
              <p className="text-[var(--color-text-secondary)] text-sm italic">
                {/* TODO: Replace with actual app screenshot */}
                App screenshot
              </p>
            </div>
          </div>

          {/* Second feature row — mirrored */}
          <div className="mt-24 grid md:grid-cols-2 gap-16 items-center">
            {/* Screenshot placeholder */}
            <div className="bg-[var(--color-canvas-dark)] rounded-2xl aspect-[9/16] max-w-[320px] mx-auto flex items-center justify-center order-2 md:order-1">
              <p className="text-[var(--color-text-secondary)] text-sm italic">
                App screenshot
              </p>
            </div>

            {/* Text */}
            <div className="order-1 md:order-2">
              <h3
                className="font-serif text-[var(--color-text-on-light)]"
                style={{ fontSize: "clamp(24px, 3vw, 36px)", lineHeight: 1.2 }}
              >
                One scorecard.
                <br />
                Multiple games.
              </h3>
              <p className="mt-6 text-[var(--color-text-on-light)] text-base md:text-lg leading-relaxed">
                Run a Nassau, Skins, and Snake from the same round. Every game
                tracks independently. Settle everything at once.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          SECTION 5: SOCIAL PROOF (Dark)
          ═══════════════════════════════════════════════════════════════════ */}
      <section className="section-dark" style={{ padding: "var(--section-padding-y) 0" }}>
        <div className="mx-auto max-w-[var(--content-max-width)] px-6">
          {/* Stats row */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-12 sm:gap-8 text-center">
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

          {/* Pull quote */}
          <div className="mt-20 text-center max-w-2xl mx-auto">
            <blockquote
              className="font-serif italic text-[var(--color-text-on-dark)]"
              style={{ fontSize: "clamp(22px, 3vw, 32px)", lineHeight: 1.4 }}
            >
              &ldquo;Finally, an app that gets Nassau right.&rdquo;
            </blockquote>
            <p className="mt-4 text-sm text-[var(--color-text-secondary)]">
              — Every golfer, eventually
            </p>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          SECTION 6: FROM THE BLOG (Light)
          ═══════════════════════════════════════════════════════════════════ */}
      <section className="section-light" style={{ padding: "var(--section-padding-y) 0" }}>
        <div className="mx-auto max-w-[var(--content-max-width)] px-6">
          {/* Overline */}
          <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[var(--color-text-secondary)] mb-4">
            From the Blog
          </p>

          <h2
            className="font-serif text-[var(--color-text-on-light)]"
            style={{ fontSize: "clamp(32px, 4vw, 48px)", lineHeight: 1.15 }}
          >
            The golf betting playbook.
          </h2>

          {/* Blog posts — mix of live + placeholder */}
          <div className="mt-14 grid md:grid-cols-3 gap-8">
            {/* Live post */}
            <a href="/blog/best-golf-betting-apps-2026" className="group">
              <div className="aspect-[16/10] rounded-xl bg-[var(--color-canvas-dark)]/5 mb-5 overflow-hidden">
                <div className="w-full h-full bg-gradient-to-br from-[var(--color-forest)]/10 to-transparent" />
              </div>
              <p className="text-xs font-semibold uppercase tracking-wider text-[var(--color-text-secondary)] mb-2">
                Comparison
              </p>
              <h3 className="font-serif text-xl text-[var(--color-text-on-light)] group-hover:text-[var(--color-coral)] transition-colors">
                Best Golf Betting Apps in 2026
              </h3>
              <p className="mt-2 text-sm text-[var(--color-text-secondary)] leading-relaxed">
                An honest look at every app that tracks your golf bets — including ours.
              </p>
            </a>

            {/* Placeholder posts — replace with live links as content is published */}
            {[
              {
                category: "Strategy",
                title: "Nassau Press Strategy",
                excerpt:
                  "When to press, when to hold, and the math behind the decision.",
              },
              {
                category: "Guide",
                title: "Golf Betting for Beginners",
                excerpt:
                  "Everything you need to know to start betting with your group.",
              },
            ].map((post) => (
              <article key={post.title} className="group cursor-pointer opacity-60">
                <div className="aspect-[16/10] rounded-xl bg-[var(--color-canvas-dark)]/5 mb-5 overflow-hidden">
                  <div className="w-full h-full bg-gradient-to-br from-[var(--color-forest)]/10 to-transparent" />
                </div>
                <p className="text-xs font-semibold uppercase tracking-wider text-[var(--color-text-secondary)] mb-2">
                  {post.category}
                </p>
                <h3 className="font-serif text-xl text-[var(--color-text-on-light)]">
                  {post.title}
                </h3>
                <p className="mt-2 text-sm text-[var(--color-text-secondary)] leading-relaxed">
                  {post.excerpt}
                </p>
                <p className="mt-2 text-xs text-[var(--color-text-secondary)] italic">
                  Coming soon
                </p>
              </article>
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
          SECTION 7: FINAL CTA (Dark)
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
              href="#download"
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
