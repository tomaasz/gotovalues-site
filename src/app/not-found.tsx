import { SiteHeader } from "@/components/site-header";

export default function NotFound() {
  return (
    <main id="main" className="page-shell" tabIndex={-1}>
      <SiteHeader />

      <section className="hero surface">
        <div className="hero-copy">
          <p className="eyebrow">Błąd 404</p>
          <h1>Nie znaleziono strony</h1>
          <p className="lede">
            Strona, której szukasz, nie istnieje lub została przeniesiona.
          </p>
        </div>
      </section>
    </main>
  );
}
