import type { Metadata } from "next";
import { appStoreUrl, openInAppUrl } from "@/lib/appStore";

/**
 * Round invite landing page.
 *
 * The app shares `https://stickapp.golf/round/<code>` when a scorekeeper
 * invites their group. If Stick is installed, iOS opens the app directly
 * (universal link, see public/.well-known/apple-app-site-association) and
 * this page is never seen. If it isn't installed, Safari lands here — and
 * until this page existed, "here" was a 404. Everyone the invite was meant
 * for is by definition someone without the app yet.
 */

const CODE_PATTERN = /^\d{6}$/;

type Params = { code: string };

function formatCode(code: string): string {
  return `${code.slice(0, 3)} ${code.slice(3)}`;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { code } = await params;
  const valid = CODE_PATTERN.test(code);
  const url = `https://stickapp.golf/round/${code}/`;
  return {
    title: "You're invited to a round",
    description:
      "Someone in your group is keeping score on Stick. Join the round free and see every hole and every bet live.",
    // Invite pages are transient and personal; keep them out of search.
    robots: { index: false, follow: false },
    alternates: { canonical: url },
    // Smart App Banner: opens the app straight to this round when installed.
    itunes: valid ? { appId: "6758226317", appArgument: url } : { appId: "6758226317" },
    openGraph: {
      type: "website",
      siteName: "Stick Golf",
      title: "You're invited to a round on Stick",
      description: "Join free. Only the scorekeeper pays.",
      url,
      images: [{ url: "/og/home.png", width: 1200, height: 630 }],
    },
  };
}

export default async function RoundInvitePage({ params }: { params: Promise<Params> }) {
  const { code } = await params;
  const valid = CODE_PATTERN.test(code);
  const storeHref = appStoreUrl("round-invite");

  return (
    <section className="section-dark min-h-screen flex items-center justify-center pt-24 pb-16">
      <div className="text-center px-6 max-w-xl mx-auto">
        <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[var(--color-coral)] mb-4">
          You&apos;re invited
        </p>

        <h1
          className="font-serif text-[var(--color-text-on-dark)] leading-[1.1] tracking-tight"
          style={{ fontSize: "clamp(36px, 5vw, 56px)" }}
        >
          Join the round on Stick.
        </h1>

        <p className="mt-5 text-lg text-[var(--color-text-secondary)]">
          Someone in your group is keeping score on Stick. Join and you&apos;ll see every hole
          and every bet live, settled to the cent.{" "}
          <span className="text-[var(--color-text-on-dark)]">
            It&apos;s free. Only the scorekeeper pays.
          </span>
        </p>

        {valid ? (
          <div className="mt-10">
            <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[var(--color-text-secondary)] mb-3">
              Your round code
            </p>
            <p
              className="font-sans font-bold text-[var(--color-text-on-dark)] tabular-nums tracking-[0.12em]"
              style={{ fontSize: "clamp(44px, 8vw, 72px)", lineHeight: 1 }}
              aria-label={`Round code ${code.split("").join(" ")}`}
            >
              {formatCode(code)}
            </p>
          </div>
        ) : (
          <p className="mt-10 text-[var(--color-text-secondary)]">
            That link is missing its 6-digit code. Ask your scorekeeper to share it again, or
            enter the code they give you inside the app.
          </p>
        )}

        <div className="mt-10 flex flex-col items-center gap-4">
          <a
            href={storeHref}
            className="inline-block bg-[var(--color-coral)] hover:bg-[var(--color-coral-hover)] text-white font-medium text-base px-8 py-4 rounded-full transition-colors"
          >
            Get Stick on the App Store
          </a>
          {valid && (
            <a
              href={openInAppUrl(code)}
              className="text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text-on-dark)] underline underline-offset-4 transition-colors"
            >
              Already have Stick? Open the round
            </a>
          )}
        </div>

        <ol className="mt-14 text-left mx-auto max-w-sm space-y-4 text-[var(--color-text-secondary)]">
          {[
            "Download Stick. It's free, and no card is needed to join a round.",
            "Open it, sign in, and tap “Join a Round”.",
            valid
              ? `Enter the code ${formatCode(code)} and you're in.`
              : "Enter the 6-digit code from your scorekeeper and you're in.",
          ].map((step, i) => (
            <li key={i} className="flex gap-4">
              <span className="shrink-0 w-7 h-7 rounded-full border border-white/15 text-[var(--color-text-on-dark)] text-sm flex items-center justify-center">
                {i + 1}
              </span>
              <span className="pt-0.5">{step}</span>
            </li>
          ))}
        </ol>

        <p className="mt-12 text-xs text-[var(--color-text-secondary)]">
          Available on iPhone. Round codes work while the round is in progress.
        </p>
      </div>
    </section>
  );
}
