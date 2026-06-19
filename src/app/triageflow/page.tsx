import type { Metadata } from "next";
import Link from "next/link";

import { ContactFormLazy as ContactForm } from "@/components/contact-form-lazy";
import { ContactSignals } from "@/components/contact-signals";
import { SectionHeading } from "@/components/section-heading";
import { SiteHeader } from "@/components/site-header";

export const metadata: Metadata = {
  title: "TriageFlow — automatyczny triage zgłoszeń (GitHub, e-mail)",
  alternates: { canonical: "/triageflow" },
  description:
    "Agent AI, który automatycznie kategoryzuje, priorytetyzuje i przypisuje zgłoszenia — GitHub Issues, e-mail, fora. Działa na Twojej infrastrukturze, reguły konfigurowalne per projekt.",
  openGraph: {
    title: "TriageFlow — automatyczny triage zgłoszeń",
    description:
      "Agent AI do triażu zgłoszeń: kategoryzacja, priorytety, przypisywanie. GitHub Issues, e-mail, fora. Na Twojej infrastrukturze, konfigurowalne reguły.",
    url: "https://gotovalues.com/triageflow",
    siteName: "gotovalues",
    locale: "pl_PL",
    type: "website",
  },
};

const escapeMap: Record<string, string> = {
  '<': '\\u003c',
  '>': '\\u003e',
  '&': '\\u0026',
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: "TriageFlow",
  description:
    "Agent AI do automatycznego triażu zgłoszeń (GitHub Issues, e-mail, fora) — kategoryzacja, priorytetyzacja, przypisywanie. Działa na infrastrukturze klienta.",
  offers: {
    "@type": "AggregateOffer",
    lowPrice: "2000",
    highPrice: "12000",
    priceCurrency: "PLN",
    offerCount: "3",
  },
};

const features = [
  {
    title: "Kategoryzacja zgłoszeń",
    desc: "Agent czyta treść i przypisuje kategorię (bug / feature / dokumentacja / pytanie / duplikat) — w kilka sekund od pojawienia się zgłoszenia.",
  },
  {
    title: "Priorytetyzacja",
    desc: "Każde zgłoszenie dostaje priorytet P0–P3 na podstawie treści i reguł projektu. Pilne nie giną w tłumie.",
  },
  {
    title: "Przypisywanie do osób",
    desc: "Sugestia właściwego opiekuna na bazie CODEOWNERS i historii — bez ręcznego rozdzielania.",
  },
  {
    title: "Triage e-maili",
    desc: "Skrzynka supportowa: filtrowanie, kategoryzacja i kierowanie powtarzalnych zapytań do właściwej osoby.",
  },
  {
    title: "Cotygodniowy digest",
    desc: "Podsumowanie: ile zgłoszeń, jakie kategorie, co utknęło, gdzie rośnie zaległość. Bez logowania się do pięciu narzędzi.",
  },
  {
    title: "Reguły konfigurowalne per projekt",
    desc: "Nie sztywny model ML — jasne reguły, które dopasowujesz do swojego repozytorium i procesu. Pełna kontrola.",
  },
];

const packages = [
  {
    name: "Starter",
    price: "2 000 PLN / mies",
    desc: "GitHub Issues: auto-etykietowanie, priorytetyzacja i przypisywanie dla jednego projektu.",
    features: [
      "Triage GitHub Issues (kategoria, priorytet, assignee)",
      "Automatyczne etykiety i komentarz z podsumowaniem triażu",
      "Reguły dopasowane do jednego repozytorium",
      "Uruchomienie na Twojej infrastrukturze",
    ],
  },
  {
    name: "Pro",
    price: "5 000 PLN / mies",
    desc: "GitHub + e-mail + moderacja forum, z cotygodniowym digestem i metrykami.",
    features: [
      "Wszystko ze Startera",
      "Triage e-maili (filtrowanie, kierowanie, powtarzalne odpowiedzi)",
      "Moderacja / routing forum (Discourse)",
      "Cotygodniowy digest i metryki jakości triażu",
      "Reguły dla wielu projektów",
    ],
    recommended: true,
  },
  {
    name: "Enterprise",
    price: "12 000 PLN / mies",
    desc: "Reguły szyte na miarę, monitoring SLA i dashboard wieloprojektowy.",
    features: [
      "Wszystko z Pro",
      "Reguły niestandardowe i integracje per projekt",
      "Monitoring SLA (czas do pierwszego triażu, zaległości)",
      "Dashboard wieloprojektowy",
      "Testy regresji agenta (anti-drift)",
    ],
  },
];

const competition = [
  { label: "Gdzie działa agent", them: "Chmura dostawcy (SaaS)", us: "Twoja infrastruktura" },
  { label: "Reguły triażu", them: "Sztywny model / black box", us: "Konfigurowalne per projekt" },
  { label: "Kontrola nad danymi", them: "U dostawcy", us: "U Ciebie — pełna" },
  { label: "Otwartość", them: "Zamknięty kod", us: "Oparty o open-source" },
  { label: "Opieka", them: "Support ticket", us: "Bezpośredni kontakt" },
];

const metrics = [
  { label: "Czas do pierwszego triażu", target: "< 5 min od utworzenia zgłoszenia" },
  { label: "Trafność kategoryzacji", target: "> 85% (weryfikowane przez opiekuna)" },
  { label: "Błędne klasyfikacje (bug↔feature)", target: "< 5%" },
  { label: "Zgłoszenia bez opiekuna po 24h", target: "0" },
];

export default function TriageFlowPage() {
  return (
    <main id="main" className="page-shell" tabIndex={-1}>
      <SiteHeader />

      {/* Hero */}
      <section className="hero surface">
        <div className="hero-copy">
          <p className="eyebrow">TriageFlow</p>
          <h1>Zgłoszenia, które segregują się same</h1>
          <p className="lede">
            Agent AI, który automatycznie kategoryzuje, priorytetyzuje i
            przypisuje zgłoszenia — GitHub Issues, e-mail, fora. Działa na
            Twojej infrastrukturze, na jasnych regułach, które kontrolujesz.{" "}
            <strong>Bez sztywnego black-boxa i bez oddawania danych do chmury dostawcy.</strong>
          </p>
          <div className="hero-actions">
            <a className="button button-primary" href="#kontakt">
              Opisz swój strumień zgłoszeń
            </a>
            <a className="button button-secondary" href="#pakiety">
              Zobacz pakiety
            </a>
          </div>
        </div>
        <div className="hero-panel">
          <div className="hero-panel-card">
            <span className="hero-panel-label">Co automatyzujemy</span>
            <ul>
              <li>kategoryzacja i priorytety zgłoszeń (P0–P3)</li>
              <li>przypisywanie do właściwej osoby</li>
              <li>cotygodniowy digest tego, co utknęło</li>
            </ul>
          </div>
          <div className="hero-panel-grid">
            <div className="hero-chip">GitHub Issues</div>
            <div className="hero-chip">e-mail</div>
            <div className="hero-chip">fora</div>
            <div className="hero-chip">priorytety</div>
            <div className="hero-chip">digest</div>
            <div className="hero-chip">open-source</div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="section" id="jak-dziala">
        <SectionHeading
          eyebrow="Jak działa"
          heading="Triage bez ręcznego rozdzielania"
        />
        <div className="pillar-grid">
          {features.map((f) => (
            <div key={f.title} className="surface pillar-card">
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Problem / Solution */}
      <section className="section" id="problem">
        <SectionHeading
          eyebrow="Problem"
          heading="Nowe zgłoszenia leżą, zanim ktoś je w ogóle przeczyta"
        />
        <div className="approach-grid">
          <div className="surface pillar-card">
            <h3>Bez triażu</h3>
            <ul>
              <li>Pilne zgłoszenia giną wśród mniej ważnych</li>
              <li>Ręczne etykietowanie i rozdzielanie zżera czas opiekunów</li>
              <li>Brak danych — nie wiadomo, co rośnie i gdzie jest zator</li>
            </ul>
          </div>
          <div className="surface pillar-card">
            <h3>Z TriageFlow</h3>
            <ul>
              <li>Każde zgłoszenie ma kategorię i priorytet w kilka sekund</li>
              <li>Sugestia opiekuna i etykiety dodawane automatycznie</li>
              <li>Cotygodniowy digest pokazuje zaległości i trendy</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Packages */}
      <section className="section" id="pakiety">
        <SectionHeading
          eyebrow="Pakiety"
          heading="Od jednego repo po wiele projektów"
        />
        <div className="pillar-grid">
          {packages.map((pkg) => (
            <div
              key={pkg.name}
              className={`surface pillar-card${pkg.recommended ? " pillar-card-featured" : ""}`}
            >
              {pkg.recommended && (
                <span className="pillar-card-badge">Najczęściej wybierany</span>
              )}
              <h3>{pkg.name}</h3>
              <p className="pillar-card-price">{pkg.price}</p>
              <p>{pkg.desc}</p>
              <ul>
                {pkg.features.map((f) => (
                  <li key={f}>{f}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Competition */}
      <section className="section" id="czym-sie-rozni">
        <SectionHeading
          eyebrow="Czym się różni"
          heading="Na Twojej infrastrukturze, na Twoich regułach"
        />
        <div className="surface pillar-card overflow-x">
          <table className="compare-table">
            <thead>
              <tr>
                <th></th>
                <th>Typowy SaaS do triażu</th>
                <th>TriageFlow</th>
              </tr>
            </thead>
            <tbody>
              {competition.map((row) => (
                <tr key={row.label}>
                  <td>{row.label}</td>
                  <td>{row.them}</td>
                  <td>{row.us}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Dla kogo */}
      <section className="section" id="dla-kogo">
        <SectionHeading
          eyebrow="Dla kogo"
          heading="Kiedy TriageFlow ma sens, a kiedy lepiej nie"
        />
        <div className="approach-grid">
          <div className="surface pillar-card">
            <h3>Ma sens, gdy:</h3>
            <ul>
              <li>dostajecie dużo zgłoszeń (Issues, maile, posty), które ktoś ręcznie segreguje</li>
              <li>zależy Wam, by dane i agent działały na własnej infrastrukturze</li>
              <li>chcecie jasnych, konfigurowalnych reguł, a nie nieprzejrzystego modelu</li>
              <li>macie projekt open-source lub firmowe repo z rosnącą kolejką</li>
            </ul>
          </div>
          <div className="surface pillar-card">
            <h3>Lepiej szukać dalej, gdy:</h3>
            <ul>
              <li>zgłoszeń jest niewiele — ręczny triage wychodzi taniej</li>
              <li>nie macie ustalonego procesu obsługi — najpierw warto go uporządkować</li>
              <li>oczekujecie, że agent zamknie sprawy bez nadzoru człowieka — to nie ten produkt</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Metrics */}
      <section className="section" id="metryki">
        <SectionHeading
          eyebrow="Mierzalność"
          heading="Triage, który da się rozliczyć z liczb"
        />
        <div className="surface pillar-card overflow-x">
          <table className="compare-table">
            <thead>
              <tr>
                <th>Metryka</th>
                <th>Cel</th>
              </tr>
            </thead>
            <tbody>
              {metrics.map((m) => (
                <tr key={m.label}>
                  <td>{m.label}</td>
                  <td>{m.target}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* CTA */}
      <section className="section" id="kontakt">
        <SectionHeading
          eyebrow="Zacznijmy"
          heading="Opisz swój strumień zgłoszeń — sprawdzę, co da się odciążyć"
        />
        <div className="surface contact-card">
          <div className="contact-copy">
            <p>
              Nie musisz mieć gotowej specyfikacji. Wystarczą 2–4 zdania o tym,
              skąd płyną zgłoszenia i kto je dziś segreguje — sprawdzę, czy
              triage agentem ma sens, czy lepiej wzmocnić to, co już macie.
            </p>
            <ul className="contact-points">
              <li>powiedz, gdzie spływają zgłoszenia (GitHub, mail, forum) i ile ich tygodniowo</li>
              <li>opisz, jak dziś wygląda segregowanie i kto je robi</li>
              <li>jeśli wystarczy gotowy dodatek do Waszego narzędzia — powiem to wprost</li>
            </ul>
            <ContactSignals />
            <p className="helper-text" style={{ marginTop: "18px" }}>
              Zobacz też <Link href="/supportflow">SupportFlow AI</Link> —
              uzupełniający produkt do automatyzacji obsługi klienta.
            </p>
          </div>
          <ContactForm />
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/[<>&]/g, (c) => escapeMap[c]),
        }}
      />
    </main>
  );
}
