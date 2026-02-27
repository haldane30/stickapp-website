import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { JsonLd } from "@/components/JsonLd";

/**
 * FONTS
 *
 * Source Serif 4 — Editorial serif for body text and major headlines (H1).
 * Designed by Frank Grießhammer at Adobe. Has an optical size (opsz) axis
 * that automatically adjusts letterforms for headlines vs body. Variable
 * font covers all weights from ExtraLight to Black.
 *
 * Figtree — Warm geometric sans-serif by Erik Kennedy. Used for navigation,
 * buttons, section headers (H2, H3), metadata, labels, and all structural
 * UI. Friendly and modern without being childish.
 *
 * Using next/font/local because Google Fonts CDN isn't reachable at build time.
 */
const serif = localFont({
  src: [
    { path: "../../public/fonts/SourceSerif4-VariableFont_opsz,wght.ttf", style: "normal" },
    { path: "../../public/fonts/SourceSerif4-Italic-VariableFont_opsz,wght.ttf", style: "italic" },
  ],
  display: "swap",
  variable: "--font-serif",
});

const sans = localFont({
  src: [
    { path: "../../public/fonts/Figtree-VariableFont_wght.ttf", style: "normal" },
    { path: "../../public/fonts/Figtree-Italic-VariableFont_wght.ttf", style: "italic" },
  ],
  display: "swap",
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: {
    default: "Stick Golf — Every Bet. Every Hole. Settled.",
    template: "%s | Stick Golf",
  },
  description:
    "Track 12 golf betting games from one scorecard. Real-time scoring, automatic settlement, and the math that's always right.",
  metadataBase: new URL("https://stickapp.golf"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    siteName: "Stick Golf",
    title: "Stick Golf — Every Bet. Every Hole. Settled.",
    description:
      "Track 12 golf betting games from one scorecard. Real-time scoring, automatic settlement, and the math that's always right.",
    url: "https://stickapp.golf",
    // images: [{ url: '/og/home.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Stick Golf — Every Bet. Every Hole. Settled.",
    description: "Track 12 golf betting games from one scorecard.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

// Organization schema — site-wide
const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Stick Golf",
  url: "https://stickapp.golf",
  description:
    "The golf betting app with 12 games, real-time scoring, and automatic settlement.",
  sameAs: [],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${serif.variable} ${sans.variable}`}>
      <body className="antialiased">
        <JsonLd data={organizationSchema} />
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
