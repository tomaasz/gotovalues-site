import type { Metadata } from "next";
import { Archivo, JetBrains_Mono } from "next/font/google";

import { brandName } from "@/content/site";

import { Footer } from "@/components/footer";
import { PostHogProvider } from "@/components/posthog-provider";
import { ClarityProvider } from "@/components/clarity-provider";
import { GaProvider } from "@/components/ga-provider";
import { CookieConsent } from "@/components/cookie-consent";

import { escapeMap } from "@/lib/utils";

import "./globals.css";

// "Working drawing" world: one industrial grotesque (variable width) for
// titles and text, one monospace reserved for measurements, positions and
// revision data. Self-hosted by next/font.
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

export const metadata: Metadata = {
  title: {
    default: brandName,
    template: `%s | ${brandName}`,
  },
  description:
    "Wsparcie IT dla małych firm i JDG — Zabrodzie, powiat wyszkowski i zdalnie w całej Polsce: sieci i Wi-Fi, naprawa komputerów, helpdesk, poczta, backup oraz proste narzędzia.",
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
    title: brandName,
    description:
      "Wsparcie IT dla małych firm i JDG: sieci i Wi-Fi, naprawa komputerów, zdalny i lokalny helpdesk, poczta, backup oraz proste narzędzia.",
    url: "https://gotovalues.com",
    siteName: brandName,
    locale: "pl_PL",
    type: "website",
    images: [
      {
        url: "/images/og.png",
        width: 1200,
        height: 630,
        alt: "gotovalues — wsparcie IT dla małych firm i JDG",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: brandName,
    description:
      "Wsparcie IT dla małych firm i JDG: sieci, naprawa komputerów, zdalny i lokalny helpdesk, backup oraz proste narzędzia.",
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
      "description": "Wsparcie IT dla małych firm i JDG: sieci, naprawa komputerów, zdalny i lokalny helpdesk, backup oraz proste narzędzia i automatyzacja.",
      "inLanguage": "pl",
      "publisher": { "@id": "https://gotovalues.com/#org" },
      "sameAs": [
        "https://www.linkedin.com/in/tomasz-golaszewski/",
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
      "description": "Kompleksowe usługi IT dla małych firm i JDG (Zabrodzie, powiat wyszkowski na miejscu oraz zdalnie w całej Polsce): sieci i Wi-Fi, naprawa komputerów, helpdesk, poczta, kopie zapasowe oraz automatyzacja.",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Zabrodzie",
        "addressRegion": "mazowieckie",
        "addressCountry": "PL"
      },
      "areaServed": ["Zabrodzie", "powiat wyszkowski", "PL"],
      "inLanguage": "pl",
      "sameAs": [
        "https://www.linkedin.com/in/tomasz-golaszewski/",
        "https://github.com/gotovalues",
        "https://www.facebook.com/gotovalues"
      ],
      "knowsAbout": [
        "usługi IT dla małych firm i JDG",
        "sieci komputerowe i Wi-Fi",
        "naprawa i konfiguracja komputerów",
        "zdalny i lokalny helpdesk IT",
        "kopie zapasowe i poczta firmowa",
        "automatyzacja i proste narzędzia webowe"
      ],
      "founder": {
        "@type": "Person",
        "name": "Tomasz Gołaszewski",
        "url": "https://www.linkedin.com/in/tomasz-golaszewski/"
      }
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
        <ClarityProvider />
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
