import type { Metadata } from "next";
import { Archivo, JetBrains_Mono } from "next/font/google";

import { brandName } from "@/content/site";

import { Footer } from "@/components/footer";
import { PostHogProvider } from "@/components/posthog-provider";
import { GaProvider } from "@/components/ga-provider";
import { CookieConsent } from "@/components/cookie-consent";

import { escapeMap } from "@/lib/utils";

import "./globals.css";

const sansFont = Archivo({
  subsets: ["latin", "latin-ext"],
  variable: "--font-display",
  display: "swap",
  preload: true,
  axes: ["wdth"],
});

const monoFont = JetBrains_Mono({
  subsets: ["latin", "latin-ext"],
  variable: "--font-mono",
  display: "swap",
  preload: false,
});

const defaultTitle = `${brandName} — automatyzacja, aplikacje, dane i wsparcie IT`;
const defaultDescription =
  "Niezależny partner technologiczny dla firm i klientów indywidualnych: automatyzacja i integracje, dane i analityka, aplikacje webowe oraz infrastruktura i wsparcie IT.";

export const metadata: Metadata = {
  title: {
    default: defaultTitle,
    template: `%s | ${brandName}`,
  },
  description: defaultDescription,
  metadataBase: new URL("https://gotovalues.com"),
  alternates: {
    canonical: "/",
    types: { "application/rss+xml": "/feed.xml" },
  },
  icons: {
    icon: [
      { url: "/favicon/favicon.ico", sizes: "48x48" },
      { url: "/favicon/favicon.svg", type: "image/svg+xml" },
    ],
    apple: "/favicon/apple-touch-icon.png",
  },
  manifest: "/favicon/site.webmanifest",
  openGraph: {
    title: defaultTitle,
    description: defaultDescription,
    url: "https://gotovalues.com",
    siteName: brandName,
    locale: "pl_PL",
    type: "website",
    images: [
      {
        url: "/images/og.png",
        width: 1200,
        height: 630,
        alt: defaultTitle,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: defaultTitle,
    description: defaultDescription,
    images: ["/images/og.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": "https://gotovalues.com/#website",
      "name": brandName,
      "url": "https://gotovalues.com",
      "description": defaultDescription,
      "inLanguage": "pl",
      "publisher": { "@id": "https://gotovalues.com/#org" },
      "sameAs": [
        "https://github.com/gotovalues",
        "https://www.facebook.com/gotovalues"
      ]
    },
    {
      "@type": "ProfessionalService",
      "@id": "https://gotovalues.com/#org",
      "name": brandName,
      "url": "https://gotovalues.com",
      "image": "https://gotovalues.com/images/og.png",
      "email": "kontakt@gotovalues.com",
      "description": defaultDescription,
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Zabrodzie",
        "addressRegion": "mazowieckie",
        "addressCountry": "PL"
      },
      "areaServed": "PL",
      "inLanguage": "pl",
      "sameAs": [
        "https://github.com/gotovalues",
        "https://www.facebook.com/gotovalues"
      ],
      "knowsAbout": [
        "automatyzacja procesów i integracje systemów",
        "dane, raportowanie i analityka",
        "dedykowane aplikacje webowe i oprogramowanie",
        "infrastruktura, serwery, komputery i wsparcie IT",
        "praktyczne wdrożenia AI i OCR",
        "poczta firmowa i kopie zapasowe"
      ]
    }
  ]
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pl" className={`${sansFont.variable} ${monoFont.variable}`}>
      <body>
        <a href="#main" className="skip-link">Przejdź do głównej treści</a>
        <PostHogProvider>
          {children}
        </PostHogProvider>
        <GaProvider />
        <CookieConsent />
        <Footer />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd).replace(/[<>&]/g, (c) => escapeMap[c]),
          }}
        />
      </body>
    </html>
  );
}
