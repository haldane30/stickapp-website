import type { Metadata } from "next";
import Link from "next/link";
import { getAllBlogPosts } from "@/lib/content";
import { JsonLd } from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "Blog — Golf Betting Strategy, Guides & Tips",
  description:
    "Expert golf betting strategy, game guides, settlement tips, and the stories behind the games. From the team that built the calculators.",
  alternates: { canonical: "/blog/" },
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
      name: "Blog",
      item: "https://stickapp.golf/blog/",
    },
  ],
};

const categoryLabels: Record<string, string> = {
  comparison: "Comparison",
  strategy: "Strategy",
  guide: "Guide",
  culture: "Culture",
};

export default function BlogIndex() {
  const posts = getAllBlogPosts();
  const featured = posts.find((p) => p.featured);
  const rest = posts.filter((p) => p.slug !== featured?.slug);

  return (
    <>
      <JsonLd data={breadcrumbSchema} />

      {/* ─── Hero ─────────────────────────────────────────────────────── */}
      <section className="section-dark pt-32 pb-16">
        <div className="mx-auto max-w-[var(--content-max-width)] px-6">
          <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[var(--color-text-secondary)] mb-4">
            Blog
          </p>
          <h1
            className="font-serif text-[var(--color-text-on-dark)]"
            style={{ fontSize: "clamp(36px, 5vw, 64px)", lineHeight: 1.1 }}
          >
            The golf betting playbook.
          </h1>
          <p className="mt-6 text-[var(--color-text-secondary)] text-lg max-w-2xl leading-relaxed">
            Strategy, guides, and the stories behind the games — from the team
            that built the calculators.
          </p>
        </div>
      </section>

      {/* ─── Featured post ────────────────────────────────────────────── */}
      {featured && (
        <section
          className="section-light"
          style={{ padding: "var(--section-padding-y) 0" }}
        >
          <div className="mx-auto max-w-[var(--content-max-width)] px-6">
            <Link href={`/blog/${featured.slug}`} className="group block">
              <div className="grid md:grid-cols-2 gap-10 items-center">
                {/* Image placeholder */}
                <div className="aspect-[16/10] rounded-xl bg-[var(--color-canvas-dark)]/5 overflow-hidden">
                  <div className="w-full h-full bg-gradient-to-br from-[var(--color-forest)]/10 to-transparent" />
                </div>

                {/* Text */}
                <div>
                  <div className="flex items-center gap-4 mb-4">
                    <span className="text-xs font-semibold uppercase tracking-wider text-[var(--color-coral)]">
                      {categoryLabels[featured.category] || featured.category}
                    </span>
                    <span className="text-xs text-[var(--color-text-secondary)]">
                      {featured.readingTime}
                    </span>
                  </div>
                  <h2
                    className="font-serif text-[var(--color-text-on-light)] group-hover:text-[var(--color-coral)] transition-colors"
                    style={{
                      fontSize: "clamp(24px, 3vw, 36px)",
                      lineHeight: 1.2,
                    }}
                  >
                    {featured.title}
                  </h2>
                  <p className="mt-4 text-[var(--color-text-secondary)] leading-relaxed">
                    {featured.description}
                  </p>
                  <p className="mt-4 text-sm text-[var(--color-text-secondary)]">
                    {new Date(featured.publishedAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </div>
              </div>
            </Link>
          </div>
        </section>
      )}

      {/* ─── All posts grid ───────────────────────────────────────────── */}
      {rest.length > 0 && (
        <section
          className="section-light"
          style={{ paddingBottom: "var(--section-padding-y)" }}
        >
          <div className="mx-auto max-w-[var(--content-max-width)] px-6">
            <div className="border-t border-[var(--color-canvas-dark)]/10 pt-16">
              <div className="grid md:grid-cols-3 gap-8">
                {rest.map((post) => (
                  <Link
                    key={post.slug}
                    href={`/blog/${post.slug}`}
                    className="group"
                  >
                    <div className="aspect-[16/10] rounded-xl bg-[var(--color-canvas-dark)]/5 mb-5 overflow-hidden">
                      <div className="w-full h-full bg-gradient-to-br from-[var(--color-forest)]/10 to-transparent" />
                    </div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-[var(--color-text-secondary)] mb-2">
                      {categoryLabels[post.category] || post.category}
                    </p>
                    <h3 className="font-serif text-xl text-[var(--color-text-on-light)] group-hover:text-[var(--color-coral)] transition-colors">
                      {post.title}
                    </h3>
                    <p className="mt-2 text-sm text-[var(--color-text-secondary)] leading-relaxed">
                      {post.description}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ─── Empty state (just in case) ───────────────────────────────── */}
      {posts.length === 0 && (
        <section
          className="section-light"
          style={{ padding: "var(--section-padding-y) 0" }}
        >
          <div className="mx-auto max-w-[var(--content-max-width)] px-6">
            <p className="text-[var(--color-text-secondary)] italic">
              Blog posts coming soon.
            </p>
          </div>
        </section>
      )}
    </>
  );
}
