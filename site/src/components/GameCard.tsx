import Link from "next/link";
import type { GameInfo } from "@/lib/tokens";

export function GameCard({ game }: { game: GameInfo }) {
  return (
    <Link
      href={`/games/${game.slug}`}
      className="group card-hover block rounded-2xl overflow-hidden bg-white/5 border border-white/5"
    >
      {/* Watercolor illustration placeholder */}
      <div className="aspect-[4/3] bg-gradient-to-br from-[var(--color-forest)]/30 to-[var(--color-canvas-dark)] flex items-center justify-center">
        <span className="text-[var(--color-text-secondary)] text-sm italic">
          {/* Replace with actual watercolor illustration */}
          illustration
        </span>
      </div>

      {/* Card content */}
      <div className="p-5">
        <h3 className="text-[var(--color-text-on-dark)] font-semibold text-lg group-hover:text-[var(--color-coral)] transition-colors">
          {game.name}
        </h3>
        <p className="mt-1 text-[var(--color-text-secondary)] text-sm leading-relaxed">
          {game.hook}
        </p>
        <p className="mt-3 text-xs text-[var(--color-text-secondary)]/60">
          {game.players}
        </p>
      </div>
    </Link>
  );
}
