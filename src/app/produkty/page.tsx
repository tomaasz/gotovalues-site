import type { Metadata } from "next";
import Link from "next/link";

import { ProductCard } from "@/components/product-card";
import { SectionHeading } from "@/components/section-heading";
import { siteContent } from "@/content/site";

export const metadata: Metadata = {
  title: "Produkty",
  description:
    "Przykłady aplikacji webowych, systemów dokumentowych i prywatnych wdrożeń gotovalues pokazujących pracę z workflow, dokumentami i danymi.",
};

export default function ProductsPage() {
  return (
    <main id="main" className="page-shell" tabIndex={-1}>
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

      <SectionHeading
        as="section"
        level="h1"
        className="hero-copy products-hero surface"
        eyebrow="Produkty"
        heading="Przykłady rozwiązań i wdrożeń."
      >
        <p className="lede">
          Ta strona nie jest galerią portfolio. To zbiór przykładów, które pokazują, jak podchodzę
          do budowy narzędzi wokół procesów, dokumentów, danych i pracy operacyjnej zespołu.
        </p>
      </SectionHeading>

      <section className="section">
        <SectionHeading
          className="product-section-heading"
          eyebrow="Produkty publiczne"
          heading="Publiczne przykłady, które można odwiedzić i ocenić na żywo."
        />
        <div className="product-grid">
          {siteContent.products.public.map((product) => (
            <ProductCard key={product.name} product={product} />
          ))}
        </div>
      </section>

      <section className="section">
        <SectionHeading
          className="product-section-heading"
          eyebrow="Prywatne wdrożenia"
          heading="Wybrane obszary pracy, których nie pokazuję jako otwartego live demo."
        >
          <p className="section-note">
            Część wdrożeń dotyczy procesów wewnętrznych, dokumentów albo integracji, których nie
            chcę ujawniać publicznie. Pokazuję więc typ problemu, stack i efekt biznesowy bez
            odsłaniania wrażliwych szczegółów.
          </p>
        </SectionHeading>
        <div className="product-grid">
          {siteContent.products.private.map((product) => (
            <ProductCard key={product.name} product={product} />
          ))}
        </div>
      </section>
    </main>
  );
}
