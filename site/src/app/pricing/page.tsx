import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { games } from "@/lib/tokens";

export const metadata: Metadata = {
  title: "Pricing — Try 3 Rounds Free",
  description:
    "Start with 3 free rounds of any game. Then $7.99/month or $59.99/year to keep creating rounds. Everyone you invite plays free.",
  alternates: { canonical: "/pricing/" },
  openGraph: {
    type: "website",
    title: "Pricing — Try 3 Rounds Free | Stick Golf",
    description:
      "Start with 3 free rounds of any game. Then $7.99/month or $59.99/year to keep creating rounds.",
    url: "https://stickapp.golf/pricing/",
    images: [{ url: "/og/home.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Pricing — Try 3 Rounds Free | Stick Golf",
    description:
      "Start with 3 free rounds of any game. Then $7.99/month or $59.99/year.",
    images: ["/og/home.png"],
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://stickapp.golf/" },
    { "@type": "ListItem", position: 2, name: "Pricing", item: "https://stickapp.golf/pricing/" },
  ],
};

// Features included in every tier
const allFeatures = [
  "All 12 games",
  "Real-time scoring",
  "Automatic settlement",
  "Multi-device sync",
  "Handicap support",
  "Press tracking",
];

// FAQ structured data
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Is Stick Golf really free to try?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. You get 3 full rounds with every feature unlocked — no credit card required. After your 3 rounds, you'll need a subscription to create new rounds.",
      },
    },
    {
      "@type": "Question",
      name: "Do the people I invite need to pay?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. Only the person who creates the round needs a subscription. Everyone else — players and viewers — joins free, always.",
      },
    },
    {
      "@type": "Question",
      name: "What happens after my 3 free rounds?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "You can still join rounds created by others for free. To create your own rounds, choose either the monthly plan at $7.99/month or the annual plan at $59.99/year (saving 37%).",
      },
    },
    {
      "@type": "Question",
      name: "Can I cancel anytime?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Both plans are managed through the App Store. Cancel anytime and keep access until the end of your billing period.",
      },
    },
  ],
};

export default function PricingPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      <JsonLd data={faqSchema} />

      {/* ═══════════════════════════════════════════════════════════════════
          HERO
          ═══════════════════════════════════════════════════════════════════ */}
      <section className="section-dark pt-32 pb-10">
        <div className="mx-auto max-w-[var(--content-max-width)] px-6 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[var(--color-text-secondary)] mb-4">
            Pricing
          </p>
          <h1
            className="font-serif text-[var(--color-text-on-dark)] mx-auto"
            style={{ fontSize: "clamp(36px, 5vw, 64px)", lineHeight: 1.1, maxWidth: "700px" }}
          >
            Try everything. Pay when you&apos;re ready.
          </h1>
          <p
            className="mt-6 text-[var(--color-text-secondary)] mx-auto"
            style={{ fontSize: "clamp(16px, 1.5vw, 19px)", lineHeight: 1.6, maxWidth: "540px" }}
          >
            Start with 3 free rounds — every game, every feature, no credit card.
            Only the round creator pays. Everyone else plays free.
          </p>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          PRICING CARDS
          ═══════════════════════════════════════════════════════════════════ */}
      <section className="section-dark" style={{ paddingBottom: "var(--section-padding-y)" }}>
        <div className="mx-auto max-w-[960px] px-6">
          <div className="grid md:grid-cols-3 gap-5 md:gap-6">

            {/* ─── Free Trial ──────────────────────────────────────────── */}
            <div className="relative rounded-2xl border border-white/[0.08] bg-white/[0.03] p-8 flex flex-col">
              <p
                className="font-semibold uppercase tracking-[0.1em] text-[var(--color-text-secondary)]"
                style={{ fontFamily: "var(--font-sans)", fontSize: "11px" }}
              >
                Free Trial
              </p>

              <div className="mt-5 flex items-baseline gap-1.5">
                <span
                  className="font-serif font-bold text-[var(--color-text-on-dark)]"
                  style={{ fontSize: "48px", lineHeight: 1, letterSpacing: "-0.03em" }}
                >
                  $0
                </span>
              </div>
              <p
                className="mt-2 text-[var(--color-text-secondary)]"
                style={{ fontFamily: "var(--font-sans)", fontSize: "14px" }}
              >
                3 rounds &middot; no credit card
              </p>

              <div className="mt-8 flex-1">
                <ul className="space-y-3">
                  {allFeatures.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <svg
                        className="mt-0.5 shrink-0"
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                      >
                        <path
                          d="M3.5 8.5L6.5 11.5L12.5 4.5"
                          stroke="var(--color-text-secondary)"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <span
                        className="text-[var(--color-text-on-dark)]"
                        style={{ fontFamily: "var(--font-sans)", fontSize: "14px", lineHeight: 1.5 }}
                      >
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <a
                href="https://apps.apple.com/app/stick-golf/id-placeholder?utm_source=stickapp.golf&utm_medium=website&utm_campaign=pricing-free"
                className="mt-8 block w-full text-center text-sm font-medium px-6 py-3.5 rounded-full border border-white/[0.15] text-[var(--color-text-on-dark)] hover:border-white/30 hover:bg-white/[0.04] transition-all"
                style={{ fontFamily: "var(--font-sans)" }}
              >
                Get started free
              </a>
            </div>

            {/* ─── Annual (Recommended) ────────────────────────────────── */}
            <div className="relative rounded-2xl border-2 border-[var(--color-coral)]/60 bg-white/[0.04] p-8 flex flex-col md:scale-[1.03] md:-my-2 shadow-lg shadow-black/20">
              {/* Best value badge */}
              <div
                className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[var(--color-coral)] text-white font-semibold uppercase tracking-[0.08em] px-4 py-1.5 rounded-full"
                style={{ fontFamily: "var(--font-sans)", fontSize: "11px" }}
              >
                Best value
              </div>

              <p
                className="font-semibold uppercase tracking-[0.1em] text-[var(--color-coral)]"
                style={{ fontFamily: "var(--font-sans)", fontSize: "11px" }}
              >
                Annual
              </p>

              <div className="mt-5 flex items-baseline gap-1.5">
                <span
                  className="font-serif font-bold text-[var(--color-text-on-dark)]"
                  style={{ fontSize: "48px", lineHeight: 1, letterSpacing: "-0.03em" }}
                >
                  $59.99
                </span>
                <span
                  className="text-[var(--color-text-secondary)]"
                  style={{ fontFamily: "var(--font-sans)", fontSize: "14px" }}
                >
                  /year
                </span>
              </div>
              <p
                className="mt-2 text-[var(--color-text-secondary)]"
                style={{ fontFamily: "var(--font-sans)", fontSize: "14px" }}
              >
                $5/month &middot; save 37%
              </p>

              <div className="mt-8 flex-1">
                <ul className="space-y-3">
                  {allFeatures.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <svg
                        className="mt-0.5 shrink-0"
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                      >
                        <path
                          d="M3.5 8.5L6.5 11.5L12.5 4.5"
                          stroke="var(--color-coral)"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <span
                        className="text-[var(--color-text-on-dark)]"
                        style={{ fontFamily: "var(--font-sans)", fontSize: "14px", lineHeight: 1.5 }}
                      >
                        {feature}
                      </span>
                    </li>
                  ))}
                  <li className="flex items-start gap-3">
                    <svg
                      className="mt-0.5 shrink-0"
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                    >
                      <path
                        d="M3.5 8.5L6.5 11.5L12.5 4.5"
                        stroke="var(--color-coral)"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <span
                      className="text-[var(--color-text-on-dark)] font-medium"
                      style={{ fontFamily: "var(--font-sans)", fontSize: "14px", lineHeight: 1.5 }}
                    >
                      Unlimited rounds
                    </span>
                  </li>
                </ul>
              </div>

              <a
                href="https://apps.apple.com/app/stick-golf/id-placeholder?utm_source=stickapp.golf&utm_medium=website&utm_campaign=pricing-annual"
                className="mt-8 block w-full text-center text-sm font-medium px-6 py-3.5 rounded-full bg-[var(--color-coral)] hover:bg-[var(--color-coral-hover)] text-white transition-colors"
                style={{ fontFamily: "var(--font-sans)" }}
              >
                Start with 3 free rounds
              </a>
            </div>

            {/* ─── Monthly ─────────────────────────────────────────────── */}
            <div className="relative rounded-2xl border border-white/[0.08] bg-white/[0.03] p-8 flex flex-col">
              <p
                className="font-semibold uppercase tracking-[0.1em] text-[var(--color-text-secondary)]"
                style={{ fontFamily: "var(--font-sans)", fontSize: "11px" }}
              >
                Monthly
              </p>

              <div className="mt-5 flex items-baseline gap-1.5">
                <span
                  className="font-serif font-bold text-[var(--color-text-on-dark)]"
                  style={{ fontSize: "48px", lineHeight: 1, letterSpacing: "-0.03em" }}
                >
                  $7.99
                </span>
                <span
                  className="text-[var(--color-text-secondary)]"
                  style={{ fontFamily: "var(--font-sans)", fontSize: "14px" }}
                >
                  /month
                </span>
              </div>
              <p
                className="mt-2 text-[var(--color-text-secondary)]"
                style={{ fontFamily: "var(--font-sans)", fontSize: "14px" }}
              >
                $95.88/year &middot; flexible
              </p>

              <div className="mt-8 flex-1">
                <ul className="space-y-3">
                  {allFeatures.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <svg
                        className="mt-0.5 shrink-0"
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                      >
                        <path
                          d="M3.5 8.5L6.5 11.5L12.5 4.5"
                          stroke="var(--color-text-secondary)"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <span
                        className="text-[var(--color-text-on-dark)]"
                        style={{ fontFamily: "var(--font-sans)", fontSize: "14px", lineHeight: 1.5 }}
                      >
                        {feature}
                      </span>
                    </li>
                  ))}
                  <li className="flex items-start gap-3">
                    <svg
                      className="mt-0.5 shrink-0"
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                    >
                      <path
                        d="M3.5 8.5L6.5 11.5L12.5 4.5"
                        stroke="var(--color-text-secondary)"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <span
                      className="text-[var(--color-text-on-dark)]"
                      style={{ fontFamily: "var(--font-sans)", fontSize: "14px", lineHeight: 1.5 }}
                    >
                      Unlimited rounds
                    </span>
                  </li>
                </ul>
              </div>

              <a
                href="https://apps.apple.com/app/stick-golf/id-placeholder?utm_source=stickapp.golf&utm_medium=website&utm_campaign=pricing-monthly"
                className="mt-8 block w-full text-center text-sm font-medium px-6 py-3.5 rounded-full border border-white/[0.15] text-[var(--color-text-on-dark)] hover:border-white/30 hover:bg-white/[0.04] transition-all"
                style={{ fontFamily: "var(--font-sans)" }}
              >
                Start with 3 free rounds
              </a>
            </div>
          </div>

          {/* Cancel notice */}
          <p
            className="mt-8 text-center text-[var(--color-text-secondary)]"
            style={{ fontFamily: "var(--font-sans)", fontSize: "13px" }}
          >
            Cancel anytime. Managed through the App Store.
          </p>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          HOW IT WORKS
          ═══════════════════════════════════════════════════════════════════ */}
      <section className="section-light" style={{ padding: "var(--section-padding-y) 0" }}>
        <div className="mx-auto max-w-[960px] px-6">
          <div className="text-center mb-16">
            <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[var(--color-text-secondary)] mb-4">
              How it works
            </p>
            <h2
              className="font-serif text-[var(--color-text-on-light)]"
              style={{ fontSize: "clamp(28px, 3.5vw, 40px)", lineHeight: 1.15 }}
            >
              One person creates. Everyone plays.
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-10 md:gap-14">
            {[
              {
                step: "01",
                title: "Download and play",
                description:
                  "Get 3 full rounds with every game and feature unlocked. No credit card, no limitations — just golf.",
              },
              {
                step: "02",
                title: "Invite your group",
                description:
                  "Share a link. Your playing partners join the round for free. They never need a subscription.",
              },
              {
                step: "03",
                title: "Subscribe when ready",
                description:
                  "After 3 rounds, pick monthly or annual to keep creating. Your group still plays free.",
              },
            ].map((item) => (
              <div key={item.step}>
                <p
                  className="font-bold text-[var(--color-coral)]"
                  style={{ fontFamily: "var(--font-sans)", fontSize: "13px", letterSpacing: "0.05em" }}
                >
                  {item.step}
                </p>
                <h3
                  className="mt-3 text-[var(--color-text-on-light)]"
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: "18px",
                    fontWeight: 700,
                    lineHeight: 1.3,
                  }}
                >
                  {item.title}
                </h3>
                <p
                  className="mt-3 text-[var(--color-text-secondary)]"
                  style={{ fontFamily: "var(--font-sans)", fontSize: "15px", lineHeight: 1.65 }}
                >
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          THE VIRAL LOOP EXPLAINER
          ═══════════════════════════════════════════════════════════════════ */}
      <section className="section-dark" style={{ padding: "var(--section-padding-y) 0" }}>
        <div className="mx-auto max-w-[720px] px-6 text-center">
          <h2
            className="font-serif text-[var(--color-text-on-dark)]"
            style={{ fontSize: "clamp(28px, 3.5vw, 40px)", lineHeight: 1.15 }}
          >
            Why is it free for everyone else?
          </h2>
          <p
            className="mt-6 text-[var(--color-text-secondary)] mx-auto"
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "18px",
              lineHeight: 1.7,
              maxWidth: "560px",
            }}
          >
            Because the best golf app is the one your whole group actually uses.
            One subscription covers every round you create. Everyone you invite
            gets the full experience — real-time scoring, automatic settlement,
            the works. No awkward &ldquo;download this app and pay&rdquo; moment
            on the first tee.
          </p>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          EVERYTHING INCLUDED
          ═══════════════════════════════════════════════════════════════════ */}
      <section className="section-light" style={{ padding: "var(--section-padding-y) 0" }}>
        <div className="mx-auto max-w-[960px] px-6">
          <div className="text-center mb-14">
            <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[var(--color-text-secondary)] mb-4">
              12 Games Included
            </p>
            <h2
              className="font-serif text-[var(--color-text-on-light)]"
              style={{ fontSize: "clamp(28px, 3.5vw, 40px)", lineHeight: 1.15 }}
            >
              Every game your group plays.
            </h2>
            <p
              className="mt-4 text-[var(--color-text-secondary)] mx-auto"
              style={{ fontFamily: "var(--font-sans)", fontSize: "15px", maxWidth: "480px" }}
            >
              No tiers, no add-ons, no &ldquo;premium games.&rdquo;
              Every subscription includes all 12.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {games.map((game) => (
              <Link
                key={game.slug}
                href={`/games/${game.slug}`}
                className="group flex items-center gap-3 p-4 rounded-xl border border-[var(--color-canvas-dark)]/[0.06] hover:border-[var(--color-coral)]/30 hover:bg-[var(--color-coral)]/[0.03] transition-all"
              >
                <span className="text-lg shrink-0">
                  {/* Game emoji from tokens — inline for simplicity */}
                  {game.slug === "nassau" && "🏆"}
                  {game.slug === "skins" && "💰"}
                  {game.slug === "wolf" && "🐺"}
                  {game.slug === "snake" && "🐍"}
                  {game.slug === "match-play" && "⚔️"}
                  {game.slug === "vegas" && "🎰"}
                  {game.slug === "nine-point" && "9️⃣"}
                  {game.slug === "junk" && "🎯"}
                  {game.slug === "sixes" && "6️⃣"}
                  {game.slug === "split-sixes" && "🔀"}
                  {game.slug === "scotch" && "🥃"}
                  {game.slug === "quota" && "🏹"}
                </span>
                <span
                  className="text-[var(--color-text-on-light)] group-hover:text-[var(--color-coral)] transition-colors"
                  style={{ fontFamily: "var(--font-sans)", fontSize: "14px", fontWeight: 600 }}
                >
                  {game.name}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          FAQ
          ═══════════════════════════════════════════════════════════════════ */}
      <section className="section-dark" style={{ padding: "var(--section-padding-y) 0" }}>
        <div className="mx-auto max-w-[640px] px-6">
          <h2
            className="font-serif text-[var(--color-text-on-dark)] text-center mb-14"
            style={{ fontSize: "clamp(28px, 3.5vw, 40px)", lineHeight: 1.15 }}
          >
            Common questions
          </h2>

          <div className="space-y-0">
            {[
              {
                q: "Is Stick Golf really free to try?",
                a: "Yes. You get 3 full rounds with every feature unlocked — no credit card required. After your 3 rounds, you'll need a subscription to create new rounds.",
              },
              {
                q: "Do the people I invite need to pay?",
                a: "Never. Only the person who creates the round needs a subscription. Everyone else — players and viewers — joins free, always.",
              },
              {
                q: "What happens after my 3 free rounds?",
                a: "You can still join rounds created by others for free. To create your own rounds, choose either the monthly plan at $7.99/month or the annual plan at $59.99/year.",
              },
              {
                q: "What's the difference between monthly and annual?",
                a: "Same features, different billing. Annual works out to about $5/month and saves you 37% compared to monthly. Both include unlimited rounds and all 12 games.",
              },
              {
                q: "Can I switch between monthly and annual?",
                a: "Yes. Change your plan anytime through the App Store. If you switch from monthly to annual, the change takes effect at your next billing date.",
              },
              {
                q: "Can I cancel anytime?",
                a: "Absolutely. Both plans are managed through the App Store. Cancel anytime and keep access until the end of your billing period.",
              },
              {
                q: "Do I need a subscription to join someone else's round?",
                a: "No. Joining a round is always free. You only need a subscription to create rounds after your 3-round trial.",
              },
            ].map((item, index) => (
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
          FINAL CTA
          ═══════════════════════════════════════════════════════════════════ */}
      <section className="section-dark relative overflow-hidden" style={{ padding: "var(--section-padding-y) 0" }}>
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-forest)]/20 to-[var(--color-canvas-dark)]" />

        <div className="relative z-10 text-center px-6 max-w-2xl mx-auto">
          <h2
            className="font-serif text-[var(--color-text-on-dark)]"
            style={{ fontSize: "clamp(28px, 4vw, 48px)", lineHeight: 1.15 }}
          >
            Every bet. Every hole.
            <br />
            Settled.
          </h2>
          <p
            className="mt-4 text-[var(--color-text-secondary)]"
            style={{ fontFamily: "var(--font-sans)", fontSize: "15px" }}
          >
            3 free rounds. No credit card. Download now.
          </p>
          <div className="mt-8">
            <a
              href="https://apps.apple.com/app/stick-golf/id-placeholder?utm_source=stickapp.golf&utm_medium=website&utm_campaign=pricing-bottom-cta"
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
