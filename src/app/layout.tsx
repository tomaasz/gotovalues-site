import type { Metadata } from "next";
import { Fraunces, Manrope } from "next/font/google";

import { brandName } from "@/content/site";

import { Footer } from "@/components/footer";
import { PostHogProvider } from "@/components/posthog-provider";
import { escapeJsonLd } from "@/lib/utils";

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
  },
  robots: {
    index: true,
    follow: true,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": brandName,
  "url": "https://gotovalues.com",
  "description": "Dedykowane aplikacje webowe i narzędzia AI dla firm, które chcą uporządkować dokumenty, workflow i ręczną pracę w procesach operacyjnych.",
  "inLanguage": "pl"
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
            __html: escapeJsonLd(jsonLd),
          }}
        />
      </body>
    </html>
  );
}
