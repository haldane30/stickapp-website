/**
 * Custom MDX components for blog posts.
 *
 * These replace default HTML elements with designed versions
 * that match the Stick visual language. Passed to MDXRemote
 * via the `components` prop.
 */

import React from "react";

// ─── App Review Card ─────────────────────────────────────────────────────────
// Usage in MDX:
//   <AppReview name="Skins App" price="$39.99/yr" games="13+" rating="4.6" platform="iOS, Android">
//     Content here...
//   </AppReview>

export function AppReview({
  name,
  price,
  games,
  rating,
  platform,
  highlight,
  children,
}: {
  name: string;
  price: string;
  games: string;
  rating?: string;
  platform?: string;
  highlight?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div
      className={`
        my-12 rounded-xl overflow-hidden
        ${highlight
          ? "border-2 border-[var(--color-coral)]/30 bg-[var(--color-coral)]/[0.03]"
          : "border border-[var(--color-canvas-dark)]/10 bg-white"
        }
      `}
    >
      {/* Header */}
      <div
        className={`
          px-6 py-5 border-b
          ${highlight
            ? "bg-[var(--color-coral)]/[0.06] border-[var(--color-coral)]/15"
            : "bg-[var(--color-canvas-dark)]/[0.02] border-[var(--color-canvas-dark)]/10"
          }
        `}
      >
        <div className="flex items-center justify-between flex-wrap gap-3">
          <h3
            className="font-serif text-[var(--color-text-on-light)] m-0"
            style={{ fontSize: "clamp(20px, 2.5vw, 28px)", lineHeight: 1.3 }}
          >
            {name}
            {highlight && (
              <span className="ml-3 inline-block text-xs font-sans font-semibold uppercase tracking-wider text-[var(--color-coral)] bg-[var(--color-coral)]/10 px-2.5 py-1 rounded-full align-middle">
                Our Pick
              </span>
            )}
          </h3>
        </div>

        {/* Spec badges */}
        <div className="flex flex-wrap gap-2 mt-3">
          <SpecBadge label="Price" value={price} />
          <SpecBadge label="Games" value={games} />
          {rating && <SpecBadge label="Rating" value={`${rating} stars`} />}
          {platform && <SpecBadge label="Platform" value={platform} />}
        </div>
      </div>

      {/* Body */}
      <div className="px-6 py-6 prose-card">
        {children}
      </div>
    </div>
  );
}

function SpecBadge({ label, value }: { label: string; value: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 text-sm bg-[var(--color-canvas-dark)]/[0.05] rounded-md px-2.5 py-1">
      <span className="text-[var(--color-text-secondary)] text-xs uppercase tracking-wider">
        {label}
      </span>
      <span className="text-[var(--color-text-on-light)] font-medium">
        {value}
      </span>
    </span>
  );
}

// ─── Callout Boxes ───────────────────────────────────────────────────────────
// Usage in MDX:
//   <Good>Multi-device sync, proven track record</Good>
//   <Watch>Some users report sync issues</Watch>

export function Good({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex gap-3 my-4 p-4 rounded-lg bg-[#2e9e5b]/[0.06] border border-[#2e9e5b]/15">
      <span className="flex-shrink-0 w-5 h-5 mt-0.5 rounded-full bg-[#2e9e5b]/15 flex items-center justify-center">
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
          <path d="M2.5 6L5 8.5L9.5 4" stroke="#2e9e5b" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
      <div>
        <p className="text-xs font-semibold uppercase tracking-wider text-[#2e9e5b] mb-1 mt-0">
          What&apos;s good
        </p>
        <p className="text-sm text-[var(--color-text-on-light)] leading-relaxed m-0">
          {children}
        </p>
      </div>
    </div>
  );
}

export function Watch({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex gap-3 my-4 p-4 rounded-lg bg-[#c4a45a]/[0.08] border border-[#c4a45a]/20">
      <span className="flex-shrink-0 w-5 h-5 mt-0.5 rounded-full bg-[#c4a45a]/15 flex items-center justify-center">
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
          <circle cx="6" cy="6" r="4.5" stroke="#a08930" strokeWidth="1.2" />
          <path d="M6 3.5V6.5" stroke="#a08930" strokeWidth="1.2" strokeLinecap="round" />
          <circle cx="6" cy="8.5" r="0.6" fill="#a08930" />
        </svg>
      </span>
      <div>
        <p className="text-xs font-semibold uppercase tracking-wider text-[#a08930] mb-1 mt-0">
          What to know
        </p>
        <p className="text-sm text-[var(--color-text-on-light)] leading-relaxed m-0">
          {children}
        </p>
      </div>
    </div>
  );
}

// ─── Verdict / Bottom Line Box ───────────────────────────────────────────────

export function Verdict({ children }: { children: React.ReactNode }) {
  return (
    <div className="my-10 p-6 rounded-xl bg-[var(--color-canvas-dark)] text-[var(--color-text-on-dark)]">
      <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[var(--color-coral)] mb-3 mt-0">
        The Bottom Line
      </p>
      <div className="text-base leading-relaxed verdict-content">
        {children}
      </div>
    </div>
  );
}

// ─── FAQ Section ─────────────────────────────────────────────────────────────

export function FAQ({ children }: { children: React.ReactNode }) {
  return (
    <div className="my-12 border-t border-[var(--color-canvas-dark)]/10 pt-10">
      <h2
        className="font-serif text-[var(--color-text-on-light)] mb-8"
        style={{ fontSize: "clamp(24px, 3vw, 36px)", lineHeight: 1.2 }}
      >
        Frequently Asked Questions
      </h2>
      <div className="space-y-6">
        {children}
      </div>
    </div>
  );
}

export function QA({
  question,
  children,
}: {
  question: string;
  children: React.ReactNode;
}) {
  return (
    <div className="pb-6 border-b border-[var(--color-canvas-dark)]/[0.07] last:border-0 last:pb-0">
      <h3 className="font-sans font-semibold text-base text-[var(--color-text-on-light)] mb-2 mt-0">
        {question}
      </h3>
      <div className="text-[var(--color-text-secondary)] text-base leading-relaxed faq-answer">
        {children}
      </div>
    </div>
  );
}

// ─── Comparison Table wrapper ────────────────────────────────────────────────
// Wraps a markdown table for enhanced styling

export function ComparisonTable({ children }: { children: React.ReactNode }) {
  return (
    <div className="my-10 -mx-2 overflow-x-auto">
      <div className="comparison-table min-w-[600px]">
        {children}
      </div>
    </div>
  );
}

// ─── Component map for MDXRemote ─────────────────────────────────────────────

export const mdxComponents = {
  AppReview,
  Good,
  Watch,
  Verdict,
  FAQ,
  QA,
  ComparisonTable,
};
