import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-serif",
  subsets: ["latin"],
});

const siteConfig = {
  name: "Relish Realm",
  url: "https://relishrealm.com",
  description: "Discover minimalist cooking and exquisite flavors from around the globe. Kitchen-tested recipes, nutrition focused, and designed for your home.",
};

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} | Exquisite World Recipes`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: ["recipes", "cooking", "food", "cuisine", "kitchen", "meals", "healthy eating", "world recipes", "home cooking"],
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
    title: `${siteConfig.name} | Exquisite World Recipes`,
    description: siteConfig.description,
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Relish Realm - Exquisite World Recipes",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} | Exquisite World Recipes`,
    description: siteConfig.description,
    images: ["/og-image.jpg"],
    creator: "@relishrealm",
  },
  alternates: {
    canonical: siteConfig.url,
  },
  icons: {
    icon: "/icon.png",
  },
  verification: {
    google: "KOg0g-zo-WjwKiB5naZDe2DxmA4gk0rj_uQ58IoCxI0",
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
      <body className={`${inter.variable} ${playfair.variable} antialiased min-h-screen flex flex-col font-sans`}>
        <Navbar />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
