import Link from "next/link";
import { games } from "@/lib/tokens";

export function Footer() {
  // Show a curated set of game links in the footer (not all 12)
  const featuredGames = games.slice(0, 4);

  return (
    <footer className="section-dark border-t border-white/5">
      <div className="mx-auto max-w-[var(--content-max-width)] px-6 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-12">
          {/* Brand column */}
          <div className="col-span-2 md:col-span-1">
            <Link
              href="/"
              className="text-[var(--color-text-on-dark)] font-semibold text-lg tracking-tight"
            >
              Stick Golf
            </Link>
            <p className="mt-3 text-sm text-[var(--color-text-secondary)] leading-relaxed">
              Every bet. Every hole. Settled.
            </p>
          </div>

          {/* Product */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-[var(--color-text-secondary)] mb-4">
              Product
            </h3>
            <ul className="space-y-2.5">
              <li>
                <a
                  href="#download"
                  className="text-sm text-[var(--color-text-on-dark)] hover:text-[var(--color-coral)] transition-colors"
                >
                  Download
                </a>
              </li>
              <li>
                <Link
                  href="/pricing"
                  className="text-sm text-[var(--color-text-on-dark)] hover:text-[var(--color-coral)] transition-colors"
                >
                  Pricing
                </Link>
              </li>
              <li>
                <Link
                  href="/games"
                  className="text-sm text-[var(--color-text-on-dark)] hover:text-[var(--color-coral)] transition-colors"
                >
                  All Games
                </Link>
              </li>
            </ul>
          </div>

          {/* Learn — game guide links for SEO */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-[var(--color-text-secondary)] mb-4">
              Learn
            </h3>
            <ul className="space-y-2.5">
              {featuredGames.map((game) => (
                <li key={game.slug}>
                  <Link
                    href={`/games/${game.slug}`}
                    className="text-sm text-[var(--color-text-on-dark)] hover:text-[var(--color-coral)] transition-colors"
                  >
                    {game.name} Guide
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/blog"
                  className="text-sm text-[var(--color-text-on-dark)] hover:text-[var(--color-coral)] transition-colors"
                >
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-[var(--color-text-secondary)] mb-4">
              Company
            </h3>
            <ul className="space-y-2.5">
              <li>
                <Link
                  href="/about"
                  className="text-sm text-[var(--color-text-on-dark)] hover:text-[var(--color-coral)] transition-colors"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="text-sm text-[var(--color-text-on-dark)] hover:text-[var(--color-coral)] transition-colors"
                >
                  Privacy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-sm text-[var(--color-text-on-dark)] hover:text-[var(--color-coral)] transition-colors"
                >
                  Terms
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[var(--color-text-secondary)]">
            &copy; {new Date().getFullYear()} Stick Golf. All rights reserved.
          </p>
          {/* Social icons — add when platforms are decided */}
          <div className="flex items-center gap-4">
            {/* Placeholder for social links */}
          </div>
        </div>
      </div>
    </footer>
  );
}
