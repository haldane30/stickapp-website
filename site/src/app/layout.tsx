import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { JsonLd } from "@/components/JsonLd";

/**
 * FONTS
 *
 * Lora — Editorial serif for body text and headlines.
 * Warm, readable, with beautiful weight variation. Designed for
 * extended reading. The Medium model: serif for everything you *read*.
 *
 * Poppins — Geometric sans-serif for structural/UI elements: nav,
 * buttons, metadata labels, H3 subheadings, specs lines. Clean and
 * modern, lets the serif do the talking.
 *
 * Note: Using next/font/local with files in public/fonts/ because
 * Google Fonts CDN isn't available in the build environment.
 * For production, swap to next/font/google imports for optimal loading.
 */
const serif = localFont({
  src: [
    { path: "../../public/fonts/Lora-Variable.ttf", style: "normal" },
    { path: "../../public/fonts/Lora-Italic-Variable.ttf", style: "italic" },
  ],
  display: "swap",
  variable: "--font-serif",
});

const sans = localFont({
  src: [
    { path: "../../public/fonts/Poppins-Regular.ttf", weight: "400", style: "normal" },
    { path: "../../public/fonts/Poppins-Medium.ttf", weight: "500", style: "normal" },
    { path: "../../public/fonts/Poppins-Bold.ttf", weight: "700", style: "normal" },
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
