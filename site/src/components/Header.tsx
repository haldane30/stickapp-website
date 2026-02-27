"use client";

import Link from "next/link";
import { useState } from "react";

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[var(--color-canvas-dark)]/90 backdrop-blur-md border-b border-white/5">
      <nav className="mx-auto flex max-w-[var(--content-max-width)] items-center justify-between px-6 py-4">
        {/* Wordmark — replace with actual wordmark/logo when ready */}
        <Link
          href="/"
          className="text-[var(--color-text-on-dark)] font-semibold text-lg tracking-tight"
        >
          Stick Golf
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          <Link
            href="/games"
            className="text-[var(--color-text-secondary)] hover:text-[var(--color-text-on-dark)] transition-colors text-sm"
          >
            Games
          </Link>
          <Link
            href="/blog"
            className="text-[var(--color-text-secondary)] hover:text-[var(--color-text-on-dark)] transition-colors text-sm"
          >
            Blog
          </Link>
          <Link
            href="/pricing"
            className="text-[var(--color-text-secondary)] hover:text-[var(--color-text-on-dark)] transition-colors text-sm"
          >
            Pricing
          </Link>
          <a
            href="#download"
            className="bg-[var(--color-coral)] hover:bg-[var(--color-coral-hover)] text-white text-sm font-medium px-5 py-2.5 rounded-full transition-colors"
          >
            Download
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden text-[var(--color-text-on-dark)] p-2"
          aria-label="Toggle menu"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            {mobileOpen ? (
              <path d="M18 6L6 18M6 6l12 12" />
            ) : (
              <path d="M3 12h18M3 6h18M3 18h18" />
            )}
          </svg>
        </button>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-[var(--color-canvas-dark)] border-t border-white/5 px-6 py-6 flex flex-col gap-4">
          <Link
            href="/games"
            onClick={() => setMobileOpen(false)}
            className="text-[var(--color-text-on-dark)] text-lg"
          >
            Games
          </Link>
          <Link
            href="/blog"
            onClick={() => setMobileOpen(false)}
            className="text-[var(--color-text-on-dark)] text-lg"
          >
            Blog
          </Link>
          <Link
            href="/pricing"
            onClick={() => setMobileOpen(false)}
            className="text-[var(--color-text-on-dark)] text-lg"
          >
            Pricing
          </Link>
          <a
            href="#download"
            className="bg-[var(--color-coral)] text-white text-center font-medium px-5 py-3 rounded-full mt-2"
          >
            Download
          </a>
        </div>
      )}
    </header>
  );
}
