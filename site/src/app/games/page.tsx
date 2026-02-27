import type { Metadata } from "next";
import { games } from "@/lib/tokens";
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
    </>
  );
}
