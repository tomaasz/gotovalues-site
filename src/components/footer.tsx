import Link from "next/link";

import { brandName } from "@/content/site";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <span className="footer-copy">
          &copy; {year} {brandName}
        </span>
        <nav className="footer-nav" aria-label="Stopka">
          <Link href="/supportflow">SupportFlow AI</Link>
          <Link href="/polityka-prywatnosci">Polityka prywatności</Link>
          <a href="mailto:kontakt@gotovalues.com">kontakt@gotovalues.com</a>
        </nav>
      </div>
    </footer>
  );
}
