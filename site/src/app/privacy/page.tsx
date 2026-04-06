import type { Metadata } from "next";
import { JsonLd } from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "Privacy Policy — Stick Golf",
  description:
    "How Stick Golf collects, uses, and protects your information. We don't sell your data, run ads, or track you with analytics SDKs.",
  alternates: { canonical: "/privacy/" },
  openGraph: {
    type: "website",
    title: "Privacy Policy | Stick Golf",
    description:
      "How Stick Golf collects, uses, and protects your information.",
    url: "https://stickapp.golf/privacy/",
    images: [{ url: "/og/home.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Privacy Policy | Stick Golf",
    description:
      "How Stick Golf collects, uses, and protects your information.",
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
      name: "Privacy Policy",
      item: "https://stickapp.golf/privacy/",
    },
  ],
};

export default function PrivacyPage() {
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
            Privacy Policy
          </h1>
          <p
            className="mt-6 text-[var(--color-text-secondary)] mx-auto"
            style={{
              fontSize: "clamp(16px, 1.5vw, 19px)",
              lineHeight: 1.6,
              maxWidth: "480px",
            }}
          >
            Last updated: February 21, 2026
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
            Stick Golf (&ldquo;we,&rdquo; &ldquo;our,&rdquo; or &ldquo;the
            App&rdquo;) is a golf scorekeeper and betting tracker for iOS. This
            privacy policy explains what information we collect, how we use it,
            and your rights regarding your data.
          </p>

          <h2>1. Information We Collect</h2>

          <h3>Account Information</h3>
          <p>When you sign in with Google or Apple, we receive:</p>
          <ul>
            <li>Your name</li>
            <li>Your email address</li>
            <li>Your profile picture (if available from your sign-in provider)</li>
          </ul>
          <p>
            You can also use the App without signing in. In that case, we
            identify your device using an anonymous device identifier generated
            locally on your phone.
          </p>

          <h3>Golf Data</h3>
          <p>When you use the App, we store:</p>
          <ul>
            <li>Round information (course played, date, players in the group)</li>
            <li>Hole-by-hole scores and putt counts</li>
            <li>Betting game configurations and results</li>
            <li>Settlement calculations (who owes whom)</li>
            <li>
              Your preferences (handicap index, preferred tee box, avatar color)
            </li>
            <li>Players you&apos;ve recently played with (for quick re-selection)</li>
            <li>Courses you&apos;ve recently played</li>
          </ul>

          <h3>Device Information</h3>
          <p>
            We generate and store a random unique identifier on your device. This
            identifier is used to associate your rounds and data with your
            device, enable multi-device sync, and support anonymous usage before
            sign-in. We do not collect your device model, operating system
            version, or other hardware identifiers for tracking purposes.
          </p>

          <h3>Location Data (Optional)</h3>
          <p>
            If you choose to search for nearby golf courses, we request access to
            your device&apos;s location. This data is used only in real-time to find
            courses near you and is not stored on our servers. You can deny this
            permission and search for courses by name instead.
          </p>

          <h3>Feedback</h3>
          <p>
            If you submit feedback through the App, we collect your message, the
            feedback category you select, and basic context (app version,
            platform, which screen you were on). If you are signed in, your name
            may be associated with the feedback.
          </p>

          <h2>2. How We Use Your Information</h2>

          <p>We use your information to:</p>
          <ul>
            <li>Provide the core scorekeeper and betting tracker functionality</li>
            <li>Save your rounds, preferences, and game history</li>
            <li>
              Enable multiplayer features (inviting others to follow a round in
              real time)
            </li>
            <li>Calculate betting settlements accurately</li>
            <li>Diagnose and fix errors and crashes</li>
            <li>Respond to your feedback and support requests</li>
            <li>Process your subscription (when applicable)</li>
          </ul>

          <h2>3. Third-Party Services</h2>

          <p>
            The App uses the following third-party services. Each operates under
            its own privacy policy:
          </p>

          <div className="overflow-x-auto my-6">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b border-[var(--color-canvas-dark)]/10">
                  <th className="text-left py-3 pr-4 font-semibold text-[var(--color-text-on-light)]">
                    Service
                  </th>
                  <th className="text-left py-3 pr-4 font-semibold text-[var(--color-text-on-light)]">
                    Purpose
                  </th>
                  <th className="text-left py-3 font-semibold text-[var(--color-text-on-light)]">
                    Data Shared
                  </th>
                </tr>
              </thead>
              <tbody className="text-[var(--color-text-secondary)]">
                <tr className="border-b border-[var(--color-canvas-dark)]/5">
                  <td className="py-3 pr-4 font-medium text-[var(--color-text-on-light)]">Clerk</td>
                  <td className="py-3 pr-4">Authentication (Google/Apple sign-in)</td>
                  <td className="py-3">Name, email, profile picture</td>
                </tr>
                <tr className="border-b border-[var(--color-canvas-dark)]/5">
                  <td className="py-3 pr-4 font-medium text-[var(--color-text-on-light)]">Convex</td>
                  <td className="py-3 pr-4">Cloud database</td>
                  <td className="py-3">All App data (rounds, scores, user profiles)</td>
                </tr>
                <tr className="border-b border-[var(--color-canvas-dark)]/5">
                  <td className="py-3 pr-4 font-medium text-[var(--color-text-on-light)]">Sentry</td>
                  <td className="py-3 pr-4">Error and crash monitoring</td>
                  <td className="py-3">Error messages, stack traces, device identifier</td>
                </tr>
                <tr className="border-b border-[var(--color-canvas-dark)]/5">
                  <td className="py-3 pr-4 font-medium text-[var(--color-text-on-light)]">RevenueCat</td>
                  <td className="py-3 pr-4">Subscription management</td>
                  <td className="py-3">App user ID, purchase tokens from Apple</td>
                </tr>
                <tr>
                  <td className="py-3 pr-4 font-medium text-[var(--color-text-on-light)]">GolfCourseAPI</td>
                  <td className="py-3 pr-4">Golf course data (hole info, ratings)</td>
                  <td className="py-3">Search queries (course names or locations)</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p>
            We do not use any advertising networks, analytics SDKs, or
            behavioral tracking tools.
          </p>

          <h2>4. Data Sharing</h2>

          <p>
            We do <strong>not</strong>:
          </p>
          <ul>
            <li>Sell your personal information to anyone</li>
            <li>Share your data with advertisers</li>
            <li>Use your data for purposes unrelated to the App</li>
          </ul>

          <p>We may share data in the following limited circumstances:</p>
          <ul>
            <li>
              <strong>With other players in your round.</strong> When you create
              or join a round, the other participants can see player names,
              handicaps, scores, and settlement results for that round.
            </li>
            <li>
              <strong>With our service providers.</strong> The third-party
              services listed above process data on our behalf to operate the
              App.
            </li>
            <li>
              <strong>If required by law.</strong> We may disclose information if
              required by a valid legal process.
            </li>
          </ul>

          <h2>5. Data Retention</h2>

          <p>
            We retain your data for as long as your account is active. Completed
            rounds are kept indefinitely so you can review your history. If you
            delete your account, all your data is permanently removed (see
            Section 7).
          </p>

          <h2>6. Data Security</h2>

          <p>
            Your data is stored securely in Convex, a cloud database with
            industry-standard security practices. Authentication tokens are
            stored in your device&apos;s secure storage. All data transmitted
            between the App and our servers is encrypted in transit using HTTPS.
          </p>

          <p>
            No method of electronic storage is 100% secure, but we take
            reasonable measures to protect your information.
          </p>

          <h2>7. Your Rights and Choices</h2>

          <h3>Delete Your Account</h3>
          <p>
            You can permanently delete your account and all associated data
            directly within the App. Go to Settings and tap &ldquo;Delete
            Account.&rdquo; This will remove your user profile, all rounds you
            created, player connections, course history, saved game
            configurations, feedback submissions, and device mappings. This
            action cannot be undone.
          </p>

          <h3>Location Permission</h3>
          <p>
            You can grant or revoke location access at any time through your
            device&apos;s Settings. The App works fully without location access.
          </p>

          <h3>Sign Out</h3>
          <p>
            You can sign out at any time from the Settings screen. Your data
            remains stored and will be available when you sign back in.
          </p>

          <h3>Contact Us</h3>
          <p>
            For any questions about your data or to request information about
            what we store, contact us at{" "}
            <a
              href="mailto:support@stickapp.golf"
              className="text-[var(--color-coral)] hover:underline"
            >
              support@stickapp.golf
            </a>
            .
          </p>

          <h2>8. Betting and Financial Data</h2>

          <p>
            Stick Golf is a scorekeeper that tracks friendly wagers between
            players. The App calculates who owes whom based on the betting games
            you configure. <strong>No real money is exchanged through the App.</strong>{" "}
            We do not process payments between players, and we have no access to
            your bank account, credit card, or payment apps. Settlement amounts
            are informational only.
          </p>

          <p>
            Subscription payments for the App itself are handled entirely by
            Apple through the App Store. We never see or store your payment card
            information.
          </p>

          <h2>9. Children&apos;s Privacy</h2>

          <p>
            Stick Golf is intended for users aged 17 and older. We do not
            knowingly collect information from children under 17. If you believe
            a child has provided us with personal information, please contact us
            and we will delete it promptly.
          </p>

          <h2>10. Changes to This Policy</h2>

          <p>
            We may update this privacy policy from time to time. When we make
            significant changes, we will update the &ldquo;Last updated&rdquo;
            date at the top of this page. We encourage you to review this policy
            periodically.
          </p>

          <h2>11. Contact</h2>

          <p>For questions about this privacy policy or your data, contact:</p>
          <p>
            <a
              href="mailto:support@stickapp.golf"
              className="text-[var(--color-coral)] hover:underline"
            >
              support@stickapp.golf
            </a>
          </p>

          <hr className="my-10 border-[var(--color-canvas-dark)]/10" />

          <p className="text-sm text-[var(--color-text-secondary)]">
            This privacy policy is effective as of February 21, 2026.
          </p>
        </div>
      </section>
    </>
  );
}
