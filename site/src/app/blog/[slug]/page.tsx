import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getBlogPost, getBlogPostSlugs, getAllBlogPosts } from "@/lib/content";
import { JsonLd } from "@/components/JsonLd";
import { mdxComponents } from "@/components/mdx";
import Link from "next/link";

// ─── Static params for all blog posts ──────────────────────────────────────

export function generateStaticParams() {
  return getBlogPostSlugs().map((slug) => ({ slug }));
}

// ─── Dynamic metadata per post ─────────────────────────────────────────────

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) return {};

  return {
    title: post.meta.title,
    description: post.meta.description,
    keywords: post.meta.keywords,
    alternates: { canonical: `/blog/${slug}/` },
    openGraph: {
      type: "article",
      title: post.meta.title,
      description: post.meta.description,
      url: `https://stickapp.golf/blog/${slug}/`,
      publishedTime: post.meta.publishedAt,
      modifiedTime: post.meta.updatedAt,
    },
    twitter: {
      card: "summary_large_image",
      title: post.meta.title,
      description: post.meta.description,
    },
  };
}

// ─── Category display labels ───────────────────────────────────────────────

const categoryLabels: Record<string, string> = {
  comparison: "Comparison",
  strategy: "Strategy",
  guide: "Guide",
  culture: "Culture",
};

// ─── Page component ────────────────────────────────────────────────────────

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) notFound();

  const { meta, content } = post;

  // Get other posts for "More from the blog" section
  const allPosts = getAllBlogPosts().filter((p) => p.slug !== slug);

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
        name: "Blog",
        item: "https://stickapp.golf/blog/",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: meta.title,
        item: `https://stickapp.golf/blog/${slug}/`,
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
      "@id": `https://stickapp.golf/blog/${slug}/`,
    },
  };

  // FAQ schema — only if post has FAQ data in frontmatter
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
      <section className="section-dark pt-32 pb-16">
        <div className="mx-auto max-w-[var(--reading-max-width)] px-6">
          {/* Breadcrumb */}
          <nav className="text-sm text-[var(--color-text-secondary)] mb-8">
            <Link
              href="/"
              className="hover:text-[var(--color-coral)] transition-colors"
            >
              Home
            </Link>
            <span className="mx-2">/</span>
            <Link
              href="/blog"
              className="hover:text-[var(--color-coral)] transition-colors"
            >
              Blog
            </Link>
            <span className="mx-2">/</span>
            <span className="text-[var(--color-text-on-dark)]">
              {meta.title}
            </span>
          </nav>

          {/* Category & reading time */}
          <div className="flex items-center gap-4 mb-6">
            <span className="text-xs font-semibold uppercase tracking-wider text-[var(--color-coral)]">
              {categoryLabels[meta.category] || meta.category}
            </span>
            <span className="text-xs text-[var(--color-text-secondary)]">
              {meta.readingTime}
            </span>
          </div>

          {/* Title */}
          <h1
            className="font-serif text-[var(--color-text-on-dark)]"
            style={{
              fontSize: "clamp(32px, 4vw, 52px)",
              lineHeight: 1.15,
            }}
          >
            {meta.title}
          </h1>

          {/* Description */}
          <p className="mt-6 text-lg text-[var(--color-text-secondary)] leading-relaxed max-w-2xl">
            {meta.description}
          </p>

          {/* Date */}
          <p className="mt-6 text-sm text-[var(--color-text-secondary)]">
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
      <section
        className="section-light"
        style={{ padding: "var(--section-padding-y) 0" }}
      >
        <div className="mx-auto max-w-[var(--reading-max-width)] px-6">
          <article className="prose text-[var(--color-text-on-light)]">
            <MDXRemote source={content} components={mdxComponents} />
          </article>
        </div>
      </section>

      {/* ─── CTA ──────────────────────────────────────────────────────── */}
      <section className="section-dark" style={{ padding: "80px 0" }}>
        <div className="mx-auto max-w-[var(--reading-max-width)] px-6 text-center">
          <h2
            className="font-serif text-[var(--color-text-on-dark)]"
            style={{ fontSize: "clamp(24px, 3vw, 36px)", lineHeight: 1.2 }}
          >
            Track every game from one scorecard.
          </h2>
          <p className="mt-4 text-[var(--color-text-secondary)]">
            Nassau, Skins, Wolf, and 9 more — with the math that&apos;s always
            right.
          </p>
          <div className="mt-8">
            <a
              href="/#download"
              className="inline-block bg-[var(--color-coral)] hover:bg-[var(--color-coral-hover)] text-white font-medium text-base px-8 py-4 rounded-full transition-colors"
            >
              Download on the App Store
            </a>
          </div>
        </div>
      </section>

      {/* ─── More posts ───────────────────────────────────────────────── */}
      {allPosts.length > 0 && (
        <section
          className="section-light"
          style={{ padding: "var(--section-padding-y) 0" }}
        >
          <div className="mx-auto max-w-[var(--content-max-width)] px-6">
            <h2
              className="font-serif text-[var(--color-text-on-light)]"
              style={{ fontSize: "clamp(24px, 3vw, 36px)", lineHeight: 1.2 }}
            >
              More from the blog
            </h2>
            <div className="mt-10 grid md:grid-cols-3 gap-8">
              {allPosts.slice(0, 3).map((p) => (
                <Link
                  key={p.slug}
                  href={`/blog/${p.slug}`}
                  className="group"
                >
                  <div className="aspect-[16/10] rounded-xl bg-[var(--color-canvas-dark)]/5 mb-5 overflow-hidden">
                    <div className="w-full h-full bg-gradient-to-br from-[var(--color-forest)]/10 to-transparent" />
                  </div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-[var(--color-text-secondary)] mb-2">
                    {categoryLabels[p.category] || p.category}
                  </p>
                  <h3 className="font-serif text-xl text-[var(--color-text-on-light)] group-hover:text-[var(--color-coral)] transition-colors">
                    {p.title}
                  </h3>
                  <p className="mt-2 text-sm text-[var(--color-text-secondary)] leading-relaxed">
                    {p.description}
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
