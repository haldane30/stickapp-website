import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { games } from "@/lib/tokens";
import { getGameGuide, getGameGuideSlugs } from "@/lib/content";
import { JsonLd } from "@/components/JsonLd";

// Generate static pages for all games
export async function generateStaticParams() {
  // Start with all game slugs from tokens (creates stub pages even without MDX)
  return games.map((game) => ({ slug: game.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const game = games.find((g) => g.slug === slug);
  if (!game) return {};

  const guide = getGameGuide(slug);
  const title = guide?.meta.title || `${game.name} Golf Betting Game: Rules, Strategy & Settlement`;
  const description =
    guide?.meta.description ||
    `Complete guide to playing ${game.name} in golf. Rules, scoring, settlement examples, variations, and strategy tips.`;

  return {
    title,
    description,
    alternates: { canonical: `/games/${slug}/` },
    openGraph: {
      title: `${title} | Stick Golf`,
      description,
      url: `https://stickapp.golf/games/${slug}/`,
      type: "article",
    },
  };
}

export default async function GameGuidePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const game = games.find((g) => g.slug === slug);
  if (!game) notFound();

  const guide = getGameGuide(slug);

  // Schema markup
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://stickapp.golf/" },
      { "@type": "ListItem", position: 2, name: "Games", item: "https://stickapp.golf/games/" },
      {
        "@type": "ListItem",
        position: 3,
        name: game.name,
        item: `https://stickapp.golf/games/${slug}/`,
      },
    ],
  };

  const articleSchema = guide
    ? {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: guide.meta.title,
        description: guide.meta.description,
        author: { "@type": "Organization", name: "Stick Golf", url: "https://stickapp.golf" },
        publisher: {
          "@type": "Organization",
          name: "Stick Golf",
        },
        datePublished: guide.meta.publishedAt,
        dateModified: guide.meta.updatedAt,
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id": `https://stickapp.golf/games/${slug}/`,
        },
      }
    : null;

  const faqSchema =
    guide && guide.meta.faq.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: guide.meta.faq.map((item) => ({
            "@type": "Question",
            name: item.question,
            acceptedAnswer: { "@type": "Answer", text: item.answer },
          })),
        }
      : null;

  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      {articleSchema && <JsonLd data={articleSchema} />}
      {faqSchema && <JsonLd data={faqSchema} />}

      {/* Hero */}
      <section className="section-dark pt-32 pb-20">
        <div className="mx-auto max-w-[var(--content-max-width)] px-6">
          {/* Breadcrumb */}
          <nav className="text-xs text-[var(--color-text-secondary)] mb-8">
            <a href="/" className="hover:text-[var(--color-text-on-dark)]">
              Home
            </a>
            <span className="mx-2">/</span>
            <a href="/games" className="hover:text-[var(--color-text-on-dark)]">
              Games
            </a>
            <span className="mx-2">/</span>
            <span className="text-[var(--color-text-on-dark)]">{game.name}</span>
          </nav>

          <h1
            className="font-serif text-[var(--color-text-on-dark)]"
            style={{ fontSize: "clamp(36px, 5vw, 64px)", lineHeight: 1.1 }}
          >
            {game.name}
          </h1>
          <p className="mt-4 text-[var(--color-text-secondary)] text-lg max-w-2xl">
            {game.description}
          </p>

          {/* Quick reference */}
          <div className="mt-8 flex flex-wrap gap-4">
            <span className="inline-block text-xs bg-white/5 text-[var(--color-text-secondary)] px-3 py-1.5 rounded-full">
              {game.players}
            </span>
            {guide && (
              <span className="inline-block text-xs bg-white/5 text-[var(--color-text-secondary)] px-3 py-1.5 rounded-full">
                {guide.meta.readingTime}
              </span>
            )}
          </div>

          {/* CTA */}
          <div className="mt-10">
            <a
              href="#download"
              className="inline-block bg-[var(--color-coral)] hover:bg-[var(--color-coral-hover)] text-white font-medium text-sm px-6 py-3 rounded-full transition-colors"
            >
              Track {game.name} with Stick
            </a>
          </div>
        </div>
      </section>

      {/* Content area */}
      <section className="section-light" style={{ padding: "var(--section-padding-y) 0" }}>
        <div className="mx-auto max-w-[var(--content-max-width)] px-6">
          {guide ? (
            <div className="prose mx-auto">
              {/* MDX content will be rendered here once we have actual content files */}
              <p className="text-[var(--color-text-secondary)] italic">
                Full game guide content coming soon. This page will include
                rules, scoring, settlement examples, variations, strategy tips,
                and FAQ.
              </p>
            </div>
          ) : (
            <div className="prose mx-auto">
              <p className="text-[var(--color-text-secondary)] italic">
                Full game guide coming soon.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="section-dark" style={{ padding: "var(--section-padding-y) 0" }}>
        <div className="mx-auto max-w-2xl px-6 text-center">
          <h2
            className="font-serif text-[var(--color-text-on-dark)]"
            style={{ fontSize: "clamp(28px, 3.5vw, 44px)", lineHeight: 1.15 }}
          >
            Stop calculating by hand.
          </h2>
          <p className="mt-4 text-[var(--color-text-secondary)]">
            Stick tracks your {game.name} automatically — the math is always right.
          </p>
          <div className="mt-8">
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
