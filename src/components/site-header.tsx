import Link from "next/link";

import { siteContent } from "@/content/site";

interface SiteHeaderProps {
  variant?: "home" | "production" | "support-ai";
}

export function SiteHeader({ variant = "home" }: SiteHeaderProps) {
  return (
    <header className="site-header">
      <Link className="brand-mark" href="/">
        {siteContent.brand.name}
      </Link>
      <nav className="site-nav" aria-label="Główna nawigacja">
        {variant === "support-ai" ? (
          <Link href="/#pakiety">Pakiety</Link>
        ) : variant === "production" ? (
          <Link href="/">Strona główna</Link>
        ) : (
          <Link href="/#oferta">Oferta</Link>
        )}
        <Link href="/produkty">Produkty</Link>
        {variant !== "production" && variant !== "support-ai" && <Link href="/#serwisy">Serwisy</Link>}
        {variant !== "production" && variant !== "support-ai" && <Link href="/#o-mnie">O mnie</Link>}
        <Link href="/blog">Blog</Link>
        {variant === "support-ai" ? (
          <Link href="/#kontakt">Zapytaj o wycenę</Link>
        ) : (
          <Link href="/#kontakt">Kontakt</Link>
        )}
      </nav>
    </header>
  );
}
