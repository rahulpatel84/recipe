import type { Metadata } from "next";
import { Caveat, Fraunces, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CookieBanner from "@/components/CookieBanner";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  axes: ["SOFT", "WONK"],
  display: "swap",
});

const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
  weight: ["600"],
  display: "swap",
});

const siteConfig = {
  name: "Relish Realm",
  url: "https://relishrealm.com",
  description: "Plant based recipes from around the world, written out in full. What the dish looks like when it works, what usually goes wrong, and how to fix it.",
};

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} | Plant Based Recipes, Written Out In Full`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: ["vegan recipes", "plant based recipes", "vegan dinner", "lentil recipes", "chickpea recipes", "tofu recipes", "vegan cooking", "world recipes", "home cooking"],
  authors: [{ name: "Relish Realm" }],
  creator: "Relish Realm",
  publisher: "Relish Realm",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: `${siteConfig.name} | Plant Based Recipes, Written Out In Full`,
    description: siteConfig.description,
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Relish Realm, plant based recipes written out in full",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} | Plant Based Recipes, Written Out In Full`,
    description: siteConfig.description,
    images: ["/og-image.jpg"],
    creator: "@relishrealm",
  },
  alternates: {
    canonical: siteConfig.url,
    types: {
      'application/rss+xml': '/feed.xml',
    },
  },
  icons: {
    icon: "/icon.png",
  },
  verification: {
    google: "KOg0g-zo-WjwKiB5naZDe2DxmA4gk0rj_uQ58IoCxI0",
    other: {
      "msvalidate.01": "C164296CAA87682CF023159F60AA784C",
    },
  },
  other: {
    "p:domain_verify": "e99fcc94e273626e91c61d2d6129a06a",
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${fraunces.variable} ${caveat.variable} antialiased min-h-screen flex flex-col bg-paper font-sans text-ink`}>
        <Navbar />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
        <CookieBanner />
      </body>
    </html>
  );
}
