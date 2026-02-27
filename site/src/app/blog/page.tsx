import type { Metadata } from "next";
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
    { "@type": "ListItem", position: 1, name: "Home", item: "https://stickapp.golf/" },
    { "@type": "ListItem", position: 2, name: "Blog", item: "https://stickapp.golf/blog/" },
  ],
};

export default function BlogIndex() {
  return (
    <>
      <JsonLd data={breadcrumbSchema} />

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

      <section className="section-light" style={{ padding: "var(--section-padding-y) 0" }}>
        <div className="mx-auto max-w-[var(--content-max-width)] px-6">
          <p className="text-[var(--color-text-secondary)] italic">
            Blog posts coming soon. First up: Best Golf Betting Apps in 2026.
          </p>
        </div>
      </section>
    </>
  );
}
