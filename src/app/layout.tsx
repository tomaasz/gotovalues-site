import type { Metadata } from "next";
import { Fraunces, Manrope } from "next/font/google";

import { brandName } from "@/content/site";

import { Footer } from "@/components/footer";
import { PostHogProvider } from "@/components/posthog-provider";
import { escapeMap } from "@/lib/utils";

import "./globals.css";

const displayFont = Fraunces({
  subsets: ["latin", "latin-ext"],
  variable: "--font-display",
  display: "swap",
  preload: true,
  axes: ["SOFT", "WONK"],
});

const bodyFont = Manrope({
  subsets: ["latin", "latin-ext"],
  variable: "--font-body",
  display: "swap",
  preload: true,
});

export const metadata: Metadata = {
  title: {
    default: brandName,
    template: `%s | ${brandName}`,
  },
  description:
    "Dedykowane aplikacje webowe i narzędzia AI dla firm, które chcą uporządkować dokumenty, workflow i ręczną pracę w procesach operacyjnych.",
  metadataBase: new URL("https://gotovalues.com"),
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: "/favicon/favicon.ico",
    apple: "/favicon/apple-touch-icon.png",
  },
  openGraph: {
    title: brandName,
    description: "Dedykowane aplikacje webowe i narzędzia AI dla firm, które chcą uporządkować dokumenty, workflow i ręczną pracę w procesach operacyjnych.",
    url: "https://gotovalues.com",
    siteName: brandName,
    locale: "pl_PL",
    type: "website",
    images: [
      {
        url: "/images/og.png",
        width: 1200,
        height: 630,
        alt: "gotovalues — gotowe wdrożenia AI dla MŚP",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: brandName,
    description: "Dedykowane aplikacje webowe i narzędzia AI dla firm, które chcą uporządkować dokumenty, workflow i ręczną pracę w procesach operacyjnych.",
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
      "description": "Dedykowane aplikacje webowe i narzędzia AI dla firm, które chcą uporządkować dokumenty, workflow i ręczną pracę w procesach operacyjnych.",
      "inLanguage": "pl",
      "publisher": { "@id": "https://gotovalues.com/#org" }
    },
    {
      "@type": "ProfessionalService",
      "@id": "https://gotovalues.com/#org",
      "name": brandName,
      "url": "https://gotovalues.com",
      "image": "https://gotovalues.com/images/og.png",
      "email": "kontakt@gotovalues.com",
      "description": "Boutique konsulting: dedykowane aplikacje webowe, agenci AI i automatyzacja procesów dla małych i średnich firm w Polsce.",
      "areaServed": "PL",
      "inLanguage": "pl",
      "knowsAbout": [
        "automatyzacja procesów",
        "aplikacje webowe dla firm",
        "AI dla firm",
        "dashboardy analityczne",
        "integracja systemów IT"
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
    <html lang="pl">
      <body className={`${displayFont.variable} ${bodyFont.variable}`}>
        <a href="#main" className="skip-link">Przejdź do głównej treści</a>
        <PostHogProvider>
          {children}
        </PostHogProvider>
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
