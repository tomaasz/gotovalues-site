import Link from "next/link";

import { siteContent } from "@/content/site";

interface SiteHeaderProps {
  variant?: "home" | "production" | "support-ai";
}

export function SiteHeader({ variant = "home" }: SiteHeaderProps) {
  const isSupportAi = variant === "support-ai";

  return (
    <header className="site-header">
      <Link className="brand-mark" href="/">
        {siteContent.brand.name}
      </Link>
      <nav className="site-nav" aria-label="Główna nawigacja">
        <Link href="/#oferta">Oferta</Link>
        <Link href="/produkty">Produkty</Link>
        <Link href={isSupportAi ? "#pakiety" : "/support-ai"}>
          SupportFlow AI
        </Link>
        <Link href="/blog">Blog</Link>
        <Link href="/#o-mnie">O mnie</Link>
        <Link href={isSupportAi ? "#kontakt" : "/#kontakt"}>
          {isSupportAi ? "Zapytaj o wycenę" : "Kontakt"}
        </Link>
      </nav>
    </header>
  );
}
