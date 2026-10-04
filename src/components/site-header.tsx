import Image from "next/image";
import Link from "next/link";

import { siteContent } from "@/content/site";

/**
 * Stała, jednolita nawigacja na wszystkich podstronach.
 * Wszystkie linki prowadzą do tego samego miejsca, niezależnie od bieżącej strony.
 */
export function SiteHeader() {
  return (
    <header className="site-header">
      <Link className="brand-mark" href="/">
        {/* Logotype "Trasa do wartości" — sources and guidelines in brand/logo/. */}
        <Image
          className="brand-mark-logo"
          src="/brand/gotovalues-logo.svg"
          alt={siteContent.brand.name}
          width={148}
          height={30}
          priority
        />
      </Link>
      <nav className="site-nav" aria-label="Główna nawigacja">
        <Link href="/#oferta">Oferta</Link>
        <Link href="/vs-freelancer-automatyzator">Jak pracuję</Link>
        <Link href="/#produkty">Produkty</Link>
        <Link href="/supportflow">SupportFlow AI</Link>
        <Link href="/blog">Blog</Link>
        <Link href="/#o-mnie">O mnie</Link>
        <Link href="/#kontakt">Kontakt</Link>
      </nav>
    </header>
  );
}
