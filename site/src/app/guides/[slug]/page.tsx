import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import { getGuidePage, getGuidePageSlugs } from "@/lib/content";
import { JsonLd } from "@/components/JsonLd";
import { mdxComponents } from "@/components/mdx";
import Link from "next/link";

// ─── Static params for all guide pages ────────────────────────────────────

export function generateStaticParams() {
  return getGuidePageSlugs().map((slug) => ({ slug }));
}

// ─── Dynamic metadata per guide ───────────────────────────────────────────

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const guide = getGuidePage(slug);
  if (!guide) return {};

  return {
    title: guide.meta.title,
    description: guide.meta.description,
    keywords: guide.meta.keywords,
    alternates: { canonical: `/guides/${slug}/` },
    openGraph: {
      type: "article",
      title: `${guide.meta.title} | Stick Golf`,
      description: guide.meta.description,
      url: `https://stickapp.golf/guides/${slug}/`,
      images: [{ url: `/og/${slug}.png`, width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title: guide.meta.title,
      description: guide.meta.description,
      images: [`/og/${slug}.png`],
    },
  };
}

// ─── Page component ──────────────────────────────────────────────────────

export default async function GuidePageRoute({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const guide = getGuidePage(slug);
  if (!guide) notFound();

  const { meta, content } = guide;

  // ─── Structured data ───────────────────────────────────────────────────

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
      {
        "@type": "ListItem",
        position: 3,
        name: meta.title,
        item: `https://stickapp.golf/guides/${slug}/`,
      },
    ],
  };

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: meta.title,
    description: meta.description,
    datePublished: meta.publishedAt,
    dateModified: meta.updatedAt,
    author: {
      "@type": "Organization",
      name: "Stick Golf",
      url: "https://stickapp.golf",
    },
    publisher: {
      "@type": "Organization",
      name: "Stick Golf",
      url: "https://stickapp.golf",
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://stickapp.golf/guides/${slug}/`,
    },
  };

  const faqSchema =
    meta.faq && meta.faq.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: meta.faq.map((item) => ({
            "@type": "Question",
            name: item.question,
            acceptedAnswer: {
              "@type": "Answer",
              text: item.answer,
            },
          })),
        }
      : null;

  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      <JsonLd data={articleSchema} />
      {faqSchema && <JsonLd data={faqSchema} />}

      {/* ─── Hero ─────────────────────────────────────────────────────── */}
      <section className="section-dark" style={{ padding: "128px 0 64px" }}>
        <div className="mx-auto max-w-[var(--reading-max-width)] px-6">
          {/* Breadcrumb */}
          <nav
            className="mb-10"
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "13px",
              color: "var(--color-text-secondary)",
            }}
          >
            <Link
              href="/"
              className="hover:text-[var(--color-coral)] transition-colors"
            >
              Home
            </Link>
            <span className="mx-2 opacity-40">/</span>
            <Link
              href="/guides"
              className="hover:text-[var(--color-coral)] transition-colors"
            >
              Guides
            </Link>
            <span className="mx-2 opacity-40">/</span>
            <span className="text-[var(--color-text-on-dark)]">
              {meta.title}
            </span>
          </nav>

          {/* Category & reading time */}
          <div
            className="flex items-center gap-3 mb-5"
            style={{ fontFamily: "var(--font-sans)", fontSize: "12px" }}
          >
            <span
              className="font-semibold uppercase text-[var(--color-coral)]"
              style={{ letterSpacing: "0.1em" }}
            >
              Reference
            </span>
            <span className="text-[var(--color-text-secondary)] opacity-40">
              ·
            </span>
            <span className="text-[var(--color-text-secondary)]">
              {meta.readingTime}
            </span>
          </div>

          {/* Title */}
          <h1
            className="text-[var(--color-text-on-dark)]"
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "clamp(32px, 4.5vw, 48px)",
              fontWeight: 700,
              lineHeight: 1.15,
              letterSpacing: "-0.02em",
            }}
          >
            {meta.title}
          </h1>

          {/* Description */}
          <p
            className="mt-5 text-[var(--color-text-secondary)] max-w-2xl"
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "18px",
              lineHeight: 1.6,
            }}
          >
            {meta.description}
          </p>

          {/* Date */}
          <p
            className="mt-5 text-[var(--color-text-secondary)]"
            style={{ fontFamily: "var(--font-sans)", fontSize: "13px" }}
          >
            Published{" "}
            {new Date(meta.publishedAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
            {meta.updatedAt !== meta.publishedAt && (
              <>
                {" · Updated "}
                {new Date(meta.updatedAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </>
            )}
          </p>
        </div>
      </section>

      {/* ─── Content ──────────────────────────────────────────────────── */}
      <section className="section-light" style={{ padding: "64px 0 var(--section-padding-y)" }}>
        <div className="mx-auto max-w-[var(--reading-max-width)] px-6">
          <article className="prose">
            <MDXRemote
              source={content}
              components={mdxComponents}
              options={{
                mdxOptions: {
                  remarkPlugins: [remarkGfm],
                },
              }}
            />
          </article>
        </div>
      </section>

      {/* ─── CTA ──────────────────────────────────────────────────────── */}
      <section className="section-dark" style={{ padding: "80px 0" }}>
        <div className="mx-auto max-w-[var(--reading-max-width)] px-6 text-center">
          <h2
            className="text-[var(--color-text-on-dark)]"
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "clamp(24px, 3vw, 32px)",
              fontWeight: 700,
              lineHeight: 1.25,
              letterSpacing: "-0.015em",
            }}
          >
            Track every game from one scorecard.
          </h2>
          <p
            className="mt-4 text-[var(--color-text-secondary)]"
            style={{ fontFamily: "var(--font-sans)", fontSize: "15px" }}
          >
            Nassau, Skins, Wolf, and 9 more — with the math that&apos;s always
            right.
          </p>
          <div className="mt-8">
            <a
              href={`https://apps.apple.com/app/stick-golf/id-placeholder?utm_source=stickapp.golf&utm_medium=website&utm_campaign=${slug}-guide`}
              className="inline-block bg-[var(--color-coral)] hover:bg-[var(--color-coral-hover)] text-white text-sm font-medium px-8 py-4 rounded-full transition-colors"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              Download on the App Store
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
