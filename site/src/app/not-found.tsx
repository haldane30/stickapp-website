import Link from "next/link";

export default function NotFound() {
  return (
    <section className="section-dark min-h-screen flex items-center justify-center">
      <div className="text-center px-6">
        <p className="text-[var(--color-coral)] font-mono text-sm mb-4">404</p>
        <h1
          className="font-serif text-[var(--color-text-on-dark)]"
          style={{ fontSize: "clamp(32px, 4vw, 48px)" }}
        >
          Page not found.
        </h1>
        <p className="mt-4 text-[var(--color-text-secondary)] max-w-md mx-auto">
          The page you&apos;re looking for doesn&apos;t exist. Maybe it sliced
          into the rough.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="inline-block bg-[var(--color-coral)] hover:bg-[var(--color-coral-hover)] text-white font-medium text-sm px-6 py-3 rounded-full transition-colors"
          >
            Back to Home
          </Link>
          <Link
            href="/games"
            className="inline-block border border-white/10 text-[var(--color-text-on-dark)] hover:border-white/20 font-medium text-sm px-6 py-3 rounded-full transition-colors"
          >
            Browse Games
          </Link>
        </div>
      </div>
    </section>
  );
}
