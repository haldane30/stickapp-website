import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "Support — Get Help with Stick Golf",
  description:
    "Need help with Stick Golf? Find answers to common questions about your trial, billing, and account — or reach out to our team directly.",
  alternates: { canonical: "/support/" },
  openGraph: {
    type: "website",
    title: "Support — Get Help with Stick Golf | Stick Golf",
    description:
      "Find answers to common questions about your trial, billing, and account — or reach out to our team directly.",
    url: "https://stickapp.golf/support/",
    images: [{ url: "/og/home.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Support — Get Help with Stick Golf | Stick Golf",
    description:
      "Find answers to common questions or reach out to our team directly.",
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
      name: "Support",
      item: "https://stickapp.golf/support/",
    },
  ],
};

const faqItems = [
  {
    q: "How does the free trial work?",
    a: "When you download Stick, you get 3 full rounds with every game and feature unlocked — no credit card required. After those 3 rounds, you'll need a subscription to create new rounds. You can still join rounds created by others for free, always.",
  },
  {
    q: "How does billing work?",
    a: "Stick offers two plans: $7.99/month or $59.99/year (saves 37%). Both are managed entirely through the App Store. You can switch plans, upgrade, or cancel anytime from your App Store subscription settings. Your access continues until the end of your current billing period.",
  },
  {
    q: "How do I cancel my subscription?",
    a: "Open the Settings app on your iPhone, tap your name at the top, then tap Subscriptions. Find Stick Golf and tap Cancel Subscription. You'll keep access to all features until the end of your current billing period.",
  },
  {
    q: "How do I delete my account?",
    a: "Open Stick, go to Settings, and tap Delete Account. This permanently removes your account and all associated data. If you have an active subscription, make sure to cancel it separately through the App Store first — deleting your account doesn't automatically cancel billing.",
  },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqItems.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.a,
    },
  })),
};

export default function SupportPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      <JsonLd data={faqSchema} />

      {/* ═══════════════════════════════════════════════════════════════════
          HERO
          ═══════════════════════════════════════════════════════════════════ */}
      <section className="section-dark pt-32 pb-16">
        <div className="mx-auto max-w-[var(--reading-max-width)] px-6 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[var(--color-text-secondary)] mb-4">
            Support
          </p>
          <h1
            className="font-serif text-[var(--color-text-on-dark)] mx-auto"
            style={{
              fontSize: "clamp(36px, 5vw, 56px)",
              lineHeight: 1.1,
              maxWidth: "600px",
            }}
          >
            We&apos;re here to help.
          </h1>
          <p
            className="mt-6 text-[var(--color-text-secondary)] mx-auto"
            style={{
              fontSize: "clamp(16px, 1.5vw, 19px)",
              lineHeight: 1.6,
              maxWidth: "480px",
            }}
          >
            Whether it&apos;s a question about your account, a bug you ran
            into, or just figuring out how a game works — we&apos;ve got you.
          </p>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          CONTACT
          ═══════════════════════════════════════════════════════════════════ */}
      <section
        className="section-light"
        style={{ padding: "var(--section-padding-y) 0" }}
      >
        <div className="mx-auto max-w-[var(--reading-max-width)] px-6">
          <div className="text-center">
            <h2
              className="font-serif text-[var(--color-text-on-light)]"
              style={{
                fontSize: "clamp(24px, 3vw, 32px)",
                lineHeight: 1.2,
              }}
            >
              Reach out directly
            </h2>
            <p
              className="mt-4 text-[var(--color-text-secondary)]"
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "15px",
                lineHeight: 1.6,
              }}
            >
              Email us and a real person will get back to you — usually within
              a day.
            </p>

            <div className="mt-8">
              <a
                href="mailto:support@stickapp.golf"
                className="inline-block bg-[var(--color-coral)] hover:bg-[var(--color-coral-hover)] text-white text-sm font-medium px-8 py-4 rounded-full transition-colors"
                style={{ fontFamily: "var(--font-sans)" }}
              >
                support@stickapp.golf
              </a>
            </div>

            <p
              className="mt-4 text-[var(--color-text-secondary)]"
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "13px",
              }}
            >
              Include your device model and iOS version if you&apos;re
              reporting a bug. It helps us find the issue faster.
            </p>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          FAQ
          ═══════════════════════════════════════════════════════════════════ */}
      <section
        className="section-dark"
        style={{ padding: "var(--section-padding-y) 0" }}
      >
        <div className="mx-auto max-w-[640px] px-6">
          <h2
            className="font-serif text-[var(--color-text-on-dark)] text-center mb-14"
            style={{
              fontSize: "clamp(28px, 3.5vw, 40px)",
              lineHeight: 1.15,
            }}
          >
            Common questions
          </h2>

          <div className="space-y-0">
            {faqItems.map((item, index) => (
              <div
                key={index}
                className="py-6 border-b border-white/[0.06] last:border-b-0"
              >
                <h3
                  className="text-[var(--color-text-on-dark)]"
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: "16px",
                    fontWeight: 600,
                    lineHeight: 1.4,
                    marginBottom: "8px",
                  }}
                >
                  {item.q}
                </h3>
                <p
                  className="text-[var(--color-text-secondary)]"
                  style={{
                    fontFamily: "var(--font-serif)",
                    fontSize: "16px",
                    lineHeight: 1.7,
                  }}
                >
                  {item.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          MORE RESOURCES
          ═══════════════════════════════════════════════════════════════════ */}
      <section
        className="section-light"
        style={{ padding: "var(--section-padding-y) 0" }}
      >
        <div className="mx-auto max-w-[640px] px-6">
          <h2
            className="font-serif text-[var(--color-text-on-light)] text-center mb-10"
            style={{
              fontSize: "clamp(24px, 3vw, 32px)",
              lineHeight: 1.2,
            }}
          >
            Learn the games
          </h2>

          <p
            className="text-center text-[var(--color-text-secondary)] mb-10"
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "15px",
              lineHeight: 1.6,
            }}
          >
            Not sure how a game works? Our guides cover rules, scoring,
            settlement math, and strategy for all 12 games.
          </p>

          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href="/games"
              className="inline-block text-sm font-medium px-6 py-3 rounded-full border border-[var(--color-canvas-dark)]/[0.12] text-[var(--color-text-on-light)] hover:border-[var(--color-coral)]/40 hover:text-[var(--color-coral)] transition-all"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              Game Guides
            </Link>
            <Link
              href="/guides/handicaps/"
              className="inline-block text-sm font-medium px-6 py-3 rounded-full border border-[var(--color-canvas-dark)]/[0.12] text-[var(--color-text-on-light)] hover:border-[var(--color-coral)]/40 hover:text-[var(--color-coral)] transition-all"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              Handicaps
            </Link>
            <Link
              href="/guides/presses/"
              className="inline-block text-sm font-medium px-6 py-3 rounded-full border border-[var(--color-canvas-dark)]/[0.12] text-[var(--color-text-on-light)] hover:border-[var(--color-coral)]/40 hover:text-[var(--color-coral)] transition-all"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              Presses
            </Link>
            <Link
              href="/guides/settlement/"
              className="inline-block text-sm font-medium px-6 py-3 rounded-full border border-[var(--color-canvas-dark)]/[0.12] text-[var(--color-text-on-light)] hover:border-[var(--color-coral)]/40 hover:text-[var(--color-coral)] transition-all"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              Settlement
            </Link>
            <Link
              href="/guides/glossary/"
              className="inline-block text-sm font-medium px-6 py-3 rounded-full border border-[var(--color-canvas-dark)]/[0.12] text-[var(--color-text-on-light)] hover:border-[var(--color-coral)]/40 hover:text-[var(--color-coral)] transition-all"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              Glossary
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          FINAL CTA
          ═══════════════════════════════════════════════════════════════════ */}
      <section
        className="section-dark"
        style={{ padding: "80px 0" }}
      >
        <div className="mx-auto max-w-[var(--reading-max-width)] px-6 text-center">
          <p
            className="text-[var(--color-text-secondary)]"
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "18px",
              lineHeight: 1.6,
            }}
          >
            Can&apos;t find what you need?
          </p>
          <p
            className="mt-2 text-[var(--color-text-on-dark)]"
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "15px",
            }}
          >
            Email{" "}
            <a
              href="mailto:support@stickapp.golf"
              className="text-[var(--color-coral)] hover:underline"
            >
              support@stickapp.golf
            </a>{" "}
            and we&apos;ll sort it out.
          </p>
        </div>
      </section>
    </>
  );
}
