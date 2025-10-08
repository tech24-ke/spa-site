// /app/layout.tsx
import "./globals.css";
import type { Metadata } from "next";
import { site } from "@/site.config";

// Use your hero as OG image (1200x630 recommended)
const ogImage = "/templates/spa-hero.jpg";
// add alongside your metadata export
export const viewport = { themeColor: "#7A5C6A" };

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
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Favicon + PWA bits */}
        <link rel="icon" href="/spa-favicon.svg?v=4" type="image/svg+xml" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-96x96.png?v=4" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png?v=4" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#7A5C6A" />
        
        <meta name="theme-color" content="#7A5C6A" />
      </head>
      <body>{children}</body>
    </html>
  );
}
