import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "Delete Your Account — Stick Golf",
  description:
    "How to delete your Stick Golf account, in the app or by email, and exactly what is removed and what is kept.",
  alternates: { canonical: "/delete-account/" },
  openGraph: {
    type: "website",
    title: "Delete Your Account | Stick Golf",
    description:
      "How to delete your Stick Golf account, and exactly what is removed and what is kept.",
    url: "https://stickapp.golf/delete-account/",
    images: [{ url: "/og/home.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Delete Your Account | Stick Golf",
    description:
      "How to delete your Stick Golf account, and exactly what is removed and what is kept.",
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
      name: "Delete Your Account",
      item: "https://stickapp.golf/delete-account/",
    },
  ],
};

export default function DeleteAccountPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema} />

      {/* Hero */}
      <section className="section-dark pt-32 pb-16">
        <div className="mx-auto max-w-[var(--reading-max-width)] px-6 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[var(--color-text-secondary)] mb-4">
            Legal
          </p>
          <h1
            className="font-serif text-[var(--color-text-on-dark)] mx-auto"
            style={{
              fontSize: "clamp(36px, 5vw, 56px)",
              lineHeight: 1.1,
              maxWidth: "600px",
            }}
          >
            Delete Your Account
          </h1>
          <p
            className="mt-6 text-[var(--color-text-secondary)] mx-auto"
            style={{
              fontSize: "clamp(16px, 1.5vw, 19px)",
              lineHeight: 1.6,
              maxWidth: "480px",
            }}
          >
            Stick Golf &middot; com.stick.golfapp
          </p>
        </div>
      </section>

      {/* Content */}
      <section
        className="section-light"
        style={{ padding: "var(--section-padding-y) 0" }}
      >
        <div className="prose mx-auto max-w-[640px] px-6">
          <p>
            You can permanently delete your Stick Golf account at any time.
            There are two ways to do it.
          </p>

          <h2>1. In the app</h2>
          <ol>
            <li>
              Open Stick and go to <strong>Settings</strong>.
            </li>
            <li>
              Tap <strong>Delete Account</strong>.
            </li>
            <li>Confirm. Deletion happens immediately and cannot be undone.</li>
          </ol>
          <p>
            If you have an active subscription, cancel it separately through
            the App Store or Google Play first. Deleting your account does not
            cancel billing.
          </p>

          <h2>2. By email</h2>
          <p>
            If you no longer have the app installed, email{" "}
            <a
              href="mailto:support@stickapp.golf?subject=Delete%20my%20Stick%20account"
              className="text-[var(--color-coral)] hover:underline"
            >
              support@stickapp.golf
            </a>{" "}
            from the address associated with your account and ask us to delete
            it. We will confirm your identity, delete the account, and reply
            when it is done &mdash; normally within 7 days, and always within
            30 days.
          </p>

          <h2>What is deleted</h2>
          <ul>
            <li>Your user profile and sign-in credentials</li>
            <li>
              Your saved playing partners, and your name on other players&apos;
              partner lists
            </li>
            <li>Your course history</li>
            <li>Your saved game setups</li>
            <li>Any feedback you submitted</li>
            <li>Your device registrations and notification tokens</li>
            <li>Data stored on your device</li>
          </ul>

          <h2>What is kept, and why</h2>
          <p>
            Golf rounds are shared records. A round belongs to everyone who
            played in it, so deleting your account does <strong>not</strong>{" "}
            delete rounds you took part in &mdash; erasing them would destroy
            the other players&apos; scorecards and settlement history too.
          </p>
          <p>
            When you delete your account, we sever the link between you and
            those rounds: your account identifier is removed from them, so the
            round is no longer connected to any account. The scorecard itself
            remains, including the player name and scores as they were recorded
            on the day, because the other players&apos; records do not make
            sense without them.
          </p>

          <div className="overflow-x-auto my-6">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b border-[var(--color-canvas-dark)]/10">
                  <th className="text-left py-3 pr-4 font-semibold text-[var(--color-text-on-light)]">
                    Data
                  </th>
                  <th className="text-left py-3 font-semibold text-[var(--color-text-on-light)]">
                    After deletion
                  </th>
                </tr>
              </thead>
              <tbody className="text-[var(--color-text-secondary)]">
                <tr className="border-b border-[var(--color-canvas-dark)]/5">
                  <td className="py-3 pr-4 font-medium text-[var(--color-text-on-light)]">
                    Account, profile, sign-in
                  </td>
                  <td className="py-3">Permanently deleted</td>
                </tr>
                <tr className="border-b border-[var(--color-canvas-dark)]/5">
                  <td className="py-3 pr-4 font-medium text-[var(--color-text-on-light)]">
                    Playing partners, course history, saved setups, feedback
                  </td>
                  <td className="py-3">Permanently deleted</td>
                </tr>
                <tr className="border-b border-[var(--color-canvas-dark)]/5">
                  <td className="py-3 pr-4 font-medium text-[var(--color-text-on-light)]">
                    Your name on other players&apos; partner lists
                  </td>
                  <td className="py-3">Replaced with &ldquo;Deleted User&rdquo;</td>
                </tr>
                <tr className="border-b border-[var(--color-canvas-dark)]/5">
                  <td className="py-3 pr-4 font-medium text-[var(--color-text-on-light)]">
                    Rounds you played in
                  </td>
                  <td className="py-3">
                    Kept for the other players; your account link is removed
                  </td>
                </tr>
                <tr>
                  <td className="py-3 pr-4 font-medium text-[var(--color-text-on-light)]">
                    Scorecard entries within those rounds
                  </td>
                  <td className="py-3">
                    Kept as recorded, no longer linked to an account
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <p>
            If you want your name removed from a specific round as well, email{" "}
            <a
              href="mailto:support@stickapp.golf"
              className="text-[var(--color-coral)] hover:underline"
            >
              support@stickapp.golf
            </a>{" "}
            and we will handle it individually.
          </p>

          <hr className="my-10 border-[var(--color-canvas-dark)]/10" />

          <p className="text-sm text-[var(--color-text-secondary)]">
            See also our{" "}
            <Link
              href="/privacy/"
              className="text-[var(--color-coral)] hover:underline"
            >
              Privacy Policy
            </Link>
            .
          </p>
        </div>
      </section>
    </>
  );
}
