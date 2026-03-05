import Link from "next/link";
import type { GameInfo } from "@/lib/tokens";
import { gameEmojis } from "@/lib/tokens";

export function GameCard({ game }: { game: GameInfo }) {
  const emoji = gameEmojis[game.slug] || "⛳";

  return (
    <Link
      href={`/games/${game.slug}`}
      className="group card-hover block rounded-2xl overflow-hidden bg-white/5 border border-white/5 p-6 transition-colors hover:bg-white/[0.08]"
    >
      {/* Emoji */}
      <span className="text-4xl block" role="img" aria-label={game.name}>
        {emoji}
      </span>

      {/* Card content */}
      <h3 className="mt-4 text-[var(--color-text-on-dark)] font-semibold text-lg group-hover:text-[var(--color-coral)] transition-colors">
        {game.name}
      </h3>
      <p className="mt-1.5 text-[var(--color-text-secondary)] text-sm leading-relaxed">
        {game.hook}
      </p>
      <p className="mt-3 text-xs text-[var(--color-text-secondary)]/60">
        {game.players}
      </p>
    </Link>
  );
}
