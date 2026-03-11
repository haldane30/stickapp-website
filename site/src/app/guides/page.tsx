import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { getAllGuidePages } from "@/lib/content";
import { JsonLd } from "@/components/JsonLd";
import { contentImages } from "@/lib/tokens";

export const metadata: Metadata = {
  title: "Golf Betting Guides — Handicaps, Presses & Settlement",
  description:
    "The concepts that apply across every golf betting game. Learn how handicaps work, when to press, and how to settle bets fairly.",
  alternates: { canonical: "/guides/" },
  openGraph: {
    type: "website",
    title: "Golf Betting Guides | Stick Golf",
    description:
      "The concepts that apply across every golf betting game. Handicaps, presses, and settlement — explained clearly.",
    url: "https://stickapp.golf/guides/",
    images: [{ url: "/og/home.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Golf Betting Guides | Stick Golf",
    description:
      "Handicaps, presses, and settlement — the concepts behind every golf betting game.",
    images: ["/og/home.png"],
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: "https://stickapp.golf/",
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Guides",
      item: "https://stickapp.golf/guides/",
    },
  ],
};

export default function GuidesIndex() {
  const guides = getAllGuidePages();

  return (
    <>
      <JsonLd data={breadcrumbSchema} />

      {/* ─── Hero ─────────────────────────────────────────────────────── */}
      <section className="section-dark pt-32 pb-16">
        <div className="mx-auto max-w-[var(--content-max-width)] px-6">
          <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[var(--color-text-secondary)] mb-4">
            Reference Guides
          </p>
          <h1
            className="font-serif text-[var(--color-text-on-dark)]"
            style={{ fontSize: "clamp(36px, 5vw, 64px)", lineHeight: 1.1 }}
          >
            Before you play.
          </h1>
          <p className="mt-6 text-[var(--color-text-secondary)] text-lg max-w-2xl leading-relaxed">
            The concepts that apply across every golf betting game — handicaps,
            presses, and settlement math. Understand these and you&apos;ll never
            be confused at the turn again.
          </p>
        </div>
      </section>

      {/* ─── Guide cards ──────────────────────────────────────────────── */}
      <section
        className="section-light"
        style={{ padding: "var(--section-padding-y) 0" }}
      >
        <div className="mx-auto max-w-[var(--content-max-width)] px-6">
          <div className="grid md:grid-cols-3 gap-8">
            {guides.map((guide) => (
              <Link
                key={guide.slug}
                href={`/guides/${guide.slug}`}
                className="group"
              >
                <div className="aspect-[16/10] rounded-xl bg-[var(--color-canvas-dark)]/5 mb-5 overflow-hidden">
                  {contentImages[guide.slug] ? (
                    <Image
                      src={contentImages[guide.slug].card}
                      alt={contentImages[guide.slug].alt}
                      width={1200}
                      height={800}
                      className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-[var(--color-gold)]/10 to-transparent" />
                  )}
                </div>
                <p className="text-xs font-semibold uppercase tracking-wider text-[var(--color-gold)] mb-2">
                  Reference
                </p>
                <h2 className="font-serif text-xl text-[var(--color-text-on-light)] group-hover:text-[var(--color-coral)] transition-colors">
                  {guide.title}
                </h2>
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

      {/* ─── Cross-link to games ──────────────────────────────────────── */}
      <section className="section-dark" style={{ padding: "80px 0" }}>
        <div className="mx-auto max-w-[var(--content-max-width)] px-6 text-center">
          <h2
            className="font-serif text-[var(--color-text-on-dark)]"
            style={{ fontSize: "clamp(24px, 3vw, 32px)", lineHeight: 1.25 }}
          >
            Ready to pick a game?
          </h2>
          <p
            className="mt-4 text-[var(--color-text-secondary)]"
            style={{ fontFamily: "var(--font-sans)", fontSize: "15px" }}
          >
            Browse all 12 golf betting games with rules, scoring, and settlement examples.
          </p>
          <div className="mt-8 flex items-center justify-center gap-4 flex-wrap">
            <Link
              href="/games"
              className="inline-block bg-[var(--color-coral)] hover:bg-[var(--color-coral-hover)] text-white text-sm font-medium px-8 py-3.5 rounded-full transition-colors"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              Browse all games
            </Link>
            <Link
              href="/blog"
              className="inline-block border border-white/[0.15] text-[var(--color-text-on-dark)] hover:border-white/30 hover:bg-white/[0.04] text-sm font-medium px-8 py-3.5 rounded-full transition-all"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              Read the blog
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
