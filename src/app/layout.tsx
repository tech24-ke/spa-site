// /app/layout.tsx
import "./globals.css";
import type { Metadata } from "next";
import { site } from "@/site.config";

// Use your hero as OG image (1200x630 recommended)
const ogImage = "/templates/spa-hero.jpg";

export const metadata: Metadata = {
  title: site.metaTitle,
  description: site.metaDescription,
  openGraph: {
    title: site.metaTitle,
    description: site.metaDescription,
    url: site.baseUrl,
    siteName: site.brand,
    images: [{ url: ogImage, width: 1200, height: 630, alt: `${site.brand} – Wellness in Nairobi` }],
  },
  twitter: {
    card: "summary_large_image",
    title: site.metaTitle,
    description: site.metaDescription,
    images: [ogImage],
  },
  metadataBase: new URL(site.baseUrl),
  themeColor: "#7A5C6A", // spa accent
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Favicon + PWA bits */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="theme-color" content="#7A5C6A" />
      </head>
      <body>{children}</body>
    </html>
  );
}
