import type { Metadata } from "next";
import Link from "next/link";

import { ProductCard } from "@/components/product-card";
import { siteContent } from "@/content/site";

export const metadata: Metadata = {
  title: "Produkty",
  description:
    "Publiczne produkty i prywatne wdrożenia GoToValues: aplikacje webowe, systemy dokumentowe, OCR i workflow automation.",
};

export default function ProductsPage() {
  return (
    <main className="page-shell">
      <header className="site-header">
        <Link className="brand-mark" href="/">
          GoToValues
        </Link>
        <nav className="site-nav" aria-label="Główna nawigacja">
          <Link href="/#oferta">Oferta</Link>
          <Link href="/produkty">Produkty</Link>
          <Link href="/#o-mnie">O mnie</Link>
          <Link href="/#kontakt">Kontakt</Link>
        </nav>
      </header>

      <section className="section-heading hero-copy products-hero">
        <p className="eyebrow">Produkty</p>
        <h1>Produkty publiczne i prywatne wdrożenia jako dowód sposobu pracy.</h1>
        <p className="lede">
          Publicznie pokazuję te projekty, które można bezpiecznie odwiedzić. Pozostałe
          wdrożenia traktuję jako prezentację możliwości: bez linków, z opisem problemu, stacku
          i efektu.
        </p>
      </section>

      <section className="section">
        <div className="section-heading">
          <p className="eyebrow">Produkty publiczne</p>
          <h2>Gotowe narzędzia, które można odwiedzić i ocenić na żywo.</h2>
        </div>
        <div className="product-grid">
          {siteContent.products.public.map((product) => (
            <ProductCard key={product.name} product={product} />
          ))}
        </div>
      </section>

      <section className="section">
        <div className="section-heading">
          <p className="eyebrow">Prywatne wdrożenia</p>
          <h2>Wybrane obszary, których nie publikuję jako otwarte live demo.</h2>
          <p className="section-note">
            Część wdrożeń wykorzystuje mechanizmy lub integracje, których nie chcę eksponować
            publicznie. Pokazuję więc zakres możliwości bez ujawniania wrażliwych szczegółów.
          </p>
        </div>
        <div className="product-grid">
          {siteContent.products.private.map((product) => (
            <ProductCard key={product.name} product={product} />
          ))}
        </div>
      </section>
    </main>
  );
}
