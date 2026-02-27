import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { JsonLd } from "@/components/JsonLd";

/**
 * FONTS — Currently using system fonts via CSS variables in globals.css.
 *
 * When Justin selects the final typefaces:
 * 1. Import the font via next/font/google or next/font/local
 * 2. Apply the .variable class to the <html> tag
 * 3. The CSS variable (--font-serif / --font-sans) cascades everywhere automatically
 *
 * Example (uncomment and update when ready):
 *
 *   import { Playfair_Display, Inter } from "next/font/google";
 *   const serif = Playfair_Display({ subsets: ["latin"], display: "swap", variable: "--font-serif" });
 *   const sans = Inter({ subsets: ["latin"], display: "swap", variable: "--font-sans" });
 *   // Then add ${serif.variable} ${sans.variable} to the <html> className
 */

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
    <html lang="en">
      <body className="antialiased">
        <JsonLd data={organizationSchema} />
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
