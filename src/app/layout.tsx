import type { Metadata } from "next";
import { Fraunces, Manrope } from "next/font/google";

import { brandName } from "@/content/site";

import { PostHogProvider } from "@/components/posthog-provider";

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": brandName,
    "url": "https://gotovalues.com",
    "description": "Dedykowane aplikacje webowe i narzędzia AI dla firm, które chcą uporządkować dokumenty, workflow i ręczną pracę w procesach operacyjnych.",
    "inLanguage": "pl"
  };


  const jsonString = JSON.stringify(jsonLd);
  let escapedHtml = '';
  for (let i = 0; i < jsonString.length; i++) {
    const char = jsonString[i];
    if (char === '<') escapedHtml += '\\u003c';
    else if (char === '>') escapedHtml += '\\u003e';
    else if (char === '&') escapedHtml += '\\u0026';
    else escapedHtml += char;
  }

  return (
    <html lang="pl">
      <body className={`${displayFont.variable} ${bodyFont.variable}`}>
        <a href="#main" className="skip-link">Przejdź do głównej treści</a>
        <PostHogProvider>
          {children}
        </PostHogProvider>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: escapedHtml,
          }}
        />
      </body>
    </html>
  );
}
