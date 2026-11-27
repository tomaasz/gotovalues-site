import Image from "next/image";
import Link from "next/link";

import { siteContent } from "@/content/site";

/**
 * Stała, jednolita nawigacja na wszystkich podstronach.
 */
export function SiteHeader() {
  return (
    <header className="site-header">
      <Link className="brand-mark" href="/">
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
        <Link href="/#oferta">Zakres</Link>
        <Link href="/wsparcie-it">Wsparcie IT</Link>
        <Link href="/jak-pracuje">Jak pracuję</Link>
        <Link href="/blog">Blog</Link>
        <Link href="/#kontakt">Kontakt</Link>
      </nav>
    </header>
  );
}
