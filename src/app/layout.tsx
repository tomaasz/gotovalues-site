import type { Metadata } from "next";
import { Fraunces, Manrope } from "next/font/google";

import { brandName } from "@/content/site";

import "./globals.css";

const displayFont = Fraunces({
  subsets: ["latin", "latin-ext"],
  variable: "--font-display",
});

const bodyFont = Manrope({
  subsets: ["latin", "latin-ext"],
  variable: "--font-body",
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pl">
      <body className={`${displayFont.variable} ${bodyFont.variable}`}>{children}</body>
    </html>
  );
}
