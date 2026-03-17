import type { Metadata } from "next";
import Link from "next/link";

import { ProductCard } from "@/components/product-card";
import { siteContent } from "@/content/site";

export const metadata: Metadata = {
  title: "Produkty",
  description:
    "Przykłady aplikacji webowych, systemów dokumentowych i prywatnych wdrożeń gotovalues pokazujących pracę z workflow, dokumentami i danymi.",
};

export default function ProductsPage() {
  return (
    <main className="page-shell">
      <header className="site-header">
        <Link className="brand-mark" href="/">
          {siteContent.brand.name}
        </Link>
        <nav className="site-nav" aria-label="Główna nawigacja">
          <Link href="/#oferta">Oferta</Link>
          <Link href="/produkty">Produkty</Link>
          <Link href="/#o-mnie">O mnie</Link>
          <Link href="/#kontakt">Kontakt</Link>
        </nav>
      </header>

      <section className="section-heading hero-copy products-hero surface">
        <p className="eyebrow">Produkty</p>
        <h1>Przykłady rozwiązań i wdrożeń.</h1>
        <p className="lede">
          Ta strona nie jest galerią portfolio. To zbiór przykładów, które pokazują, jak podchodzę
          do budowy narzędzi wokół procesów, dokumentów, danych i pracy operacyjnej zespołu.
        </p>
      </section>

      <section className="section">
        <div className="section-heading product-section-heading">
          <p className="eyebrow">Produkty publiczne</p>
          <h2>Publiczne przykłady, które można odwiedzić i ocenić na żywo.</h2>
        </div>
        <div className="product-grid">
          {siteContent.products.public.map((product) => (
            <ProductCard key={product.name} product={product} />
          ))}
        </div>
      </section>

      <section className="section">
        <div className="section-heading product-section-heading">
          <p className="eyebrow">Prywatne wdrożenia</p>
          <h2>Wybrane obszary pracy, których nie pokazuję jako otwartego live demo.</h2>
          <p className="section-note">
            Część wdrożeń dotyczy procesów wewnętrznych, dokumentów albo integracji, których nie
            chcę ujawniać publicznie. Pokazuję więc typ problemu, stack i efekt biznesowy bez
            odsłaniania wrażliwych szczegółów.
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
