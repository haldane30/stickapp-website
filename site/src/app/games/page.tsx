import type { Metadata } from "next";
import Link from "next/link";
import { games } from "@/lib/tokens";
import { getAllGuidePages } from "@/lib/content";
import { GameCard } from "@/components/GameCard";
import { JsonLd } from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "Golf Betting Games: Complete Guide to 12 Formats",
  description:
    "Learn how to play Nassau, Skins, Wolf, Snake, and 8 more golf betting games. Rules, scoring, settlement examples, and strategy tips.",
  alternates: { canonical: "/games/" },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://stickapp.golf/" },
    { "@type": "ListItem", position: 2, name: "Games", item: "https://stickapp.golf/games/" },
  ],
};

export default function GamesHub() {
  const guides = getAllGuidePages();

  return (
    <>
      <JsonLd data={breadcrumbSchema} />

      {/* Hero */}
      <section className="section-dark pt-32 pb-16">
        <div className="mx-auto max-w-[var(--content-max-width)] px-6">
          <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[var(--color-text-secondary)] mb-4">
            12 Games
          </p>
          <h1
            className="font-serif text-[var(--color-text-on-dark)]"
            style={{ fontSize: "clamp(36px, 5vw, 64px)", lineHeight: 1.1 }}
          >
            Golf Betting Games
          </h1>
          <p className="mt-6 text-[var(--color-text-secondary)] text-lg max-w-2xl leading-relaxed">
            From the classic Nassau to the chaos of Snake, every game your group
            plays — explained with real rules, real settlement math, and the
            strategy that separates winners from donors.
          </p>
        </div>
      </section>

      {/* Game grid */}
      <section className="section-dark" style={{ paddingBottom: "var(--section-padding-y)" }}>
        <div className="mx-auto max-w-[var(--content-max-width)] px-6">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {games.map((game) => (
              <GameCard key={game.slug} game={game} />
            ))}
          </div>
        </div>
      </section>

      {/* Reference guides */}
      {guides.length > 0 && (
        <section className="section-light" style={{ padding: "var(--section-padding-y) 0" }}>
          <div className="mx-auto max-w-[var(--content-max-width)] px-6">
            <h2
              className="font-serif text-[var(--color-text-on-light)]"
              style={{ fontSize: "clamp(24px, 3vw, 36px)", lineHeight: 1.2 }}
            >
              Before you play
            </h2>
            <p className="mt-4 text-[var(--color-text-secondary)] max-w-2xl leading-relaxed">
              The concepts that apply across every game — handicaps, presses,
              and settlement math.
            </p>
            <div className="mt-10 grid md:grid-cols-3 gap-8">
              {guides.map((guide) => (
                <Link
                  key={guide.slug}
                  href={`/guides/${guide.slug}`}
                  className="group block p-6 rounded-xl border border-[var(--color-canvas-dark)]/10 hover:border-[var(--color-coral)]/30 transition-colors"
                >
                  <p className="text-xs font-semibold uppercase tracking-wider text-[var(--color-gold)] mb-3">
                    Reference
                  </p>
                  <h3 className="font-serif text-lg text-[var(--color-text-on-light)] group-hover:text-[var(--color-coral)] transition-colors">
                    {guide.title}
                  </h3>
                  <p className="mt-2 text-sm text-[var(--color-text-secondary)] leading-relaxed">
                    {guide.description}
                  </p>
                  <p className="mt-3 text-xs text-[var(--color-text-secondary)]">
                    {guide.readingTime}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
