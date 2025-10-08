import "./globals.css";
import type { Metadata } from "next";
import { site } from "@/site.config";

// You can add a real OG image later (1200x630). Leaving a placeholder path is fine.
const ogImage = "/templates/education-hero.jpg";

export const metadata: Metadata = {
  title: site.metaTitle,
  description: site.metaDescription,
  openGraph: {
    title: site.metaTitle,
    description: site.metaDescription,
    url: site.baseUrl,
    siteName: site.brand,
    images: [
      {
        url: ogImage,
        width: 1200,
        height: 630,
        alt: `Spa Lounge – ${site.brand}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: site.metaTitle,
    description: site.metaDescription,
    images: [ogImage],
  },
  metadataBase: new URL(site.baseUrl),
  themeColor: "#0B1B3A",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Favicon + social icon */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="theme-color" content="#11264D" />
      </head>
      <body>{children}</body>
    </html>
  );
}


