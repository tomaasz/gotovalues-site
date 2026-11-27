import Link from "next/link";

import { brandName } from "@/content/site";
import { CookieSettingsButton } from "@/components/cookie-settings-button";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <span className="footer-copy">
          &copy; {year} {brandName}
        </span>
        <nav className="footer-nav" aria-label="Stopka">
          <Link href="/#oferta">Zakres</Link>
          <Link href="/jak-pracuje">Jak pracuję</Link>
          <Link href="/blog">Blog</Link>
          <Link href="/polityka-prywatnosci">Polityka prywatności</Link>
          <CookieSettingsButton />
          <a href="mailto:kontakt@gotovalues.com">kontakt@gotovalues.com</a>
        </nav>
      </div>
    </footer>
  );
}
