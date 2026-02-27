/**
 * Custom MDX components for blog posts.
 *
 * Design philosophy: editorial, not UI. These components should feel
 * like they belong in a well-designed magazine or Medium post — not
 * a product dashboard. Let typography and whitespace do the work.
 *
 * Color strategy: stay within the warm palette. Canvas light (#FAF8F5),
 * warm greys for secondary text, coral (#E8735A) sparingly for emphasis.
 * No greens, no ambers, no traffic-light colors.
 */

import React from "react";

// ─── App Review ──────────────────────────────────────────────────────────────
// Renders as a section with a quiet metadata line — no card, no container.
// The H2 comes from markdown. This just adds the specs underneath.

export function AppReview({
  name,
  price,
  games,
  rating,
  platform,
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
  const specs = [
    price,
    `${games} games`,
    rating ? `${rating} stars` : null,
    platform,
  ].filter(Boolean);

  return (
    <div className="review-section">
      <h2 className="review-name">{name}</h2>
      <p className="review-specs">{specs.join("  ·  ")}</p>
      <div className="review-body">{children}</div>
    </div>
  );
}

// ─── Callout Boxes ───────────────────────────────────────────────────────────
// Subtle, on-palette. No colored backgrounds or borders.
// Just a left-border accent and quiet label.

export function Good({ children }: { children: React.ReactNode }) {
  return (
    <div className="callout callout-good">
      <p className="callout-label">What&apos;s good</p>
      <p className="callout-text">{children}</p>
    </div>
  );
}

export function Watch({ children }: { children: React.ReactNode }) {
  return (
    <div className="callout callout-watch">
      <p className="callout-label">What to know</p>
      <p className="callout-text">{children}</p>
    </div>
  );
}

// ─── Verdict / Bottom Line ───────────────────────────────────────────────────
// Visually set apart but still editorial. Thin top/bottom rule, not a box.

export function Verdict({ children }: { children: React.ReactNode }) {
  return (
    <div className="verdict">
      <p className="verdict-label">The Bottom Line</p>
      <div className="verdict-body">{children}</div>
    </div>
  );
}

// ─── FAQ Section ─────────────────────────────────────────────────────────────

export function FAQ({ children }: { children: React.ReactNode }) {
  return (
    <div className="faq-section">
      <h2 className="faq-heading">Frequently Asked Questions</h2>
      <div className="faq-list">{children}</div>
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
    <div className="faq-item">
      <h3 className="faq-question">{question}</h3>
      <div className="faq-answer">{children}</div>
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
};
