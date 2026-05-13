import type { Metadata } from "next";
import Link from "next/link";

import { ContactFormLazy as ContactForm } from "@/components/contact-form-lazy";
import { ContactSignals } from "@/components/contact-signals";
import { SectionHeading } from "@/components/section-heading";
import { SiteHeader } from "@/components/site-header";

export const metadata: Metadata = {
  title: "SupportFlow AI — automatyzacja wsparcia B2B",
  description:
    "Nie chatbot — konkretne agenty AI, które klasyfikują zgłoszenia, piszą robocze odpowiedzi i eskalują trudne sprawy do człowieka. 2 tygodnie wdrożenia, od 4 000 PLN.",
};

const packages = [
  {
    name: "START",
    price: "4 000 PLN",
    desc: "Prototyp agenta triage dla 1 workflowu — warsztat, integracja i dashboard w 2 tygodnie.",
    features: [
      "Mapowanie 3 workflowów wsparcia (warsztat 1 dzień)",
      "Prototyp agenta triage dla 1 workflowu",
      "Integracja z 1 systemem zgłoszeń",
      "Dashboard z metrykami (przekierowania, eskalacje, SLA)",
      "Dokumentacja + szkolenie",
    ],
  },
  {
    name: "BUSINESS",
    price: "8 000 PLN + 1 500 PLN/mies",
    desc: "3 agenty + CRM + Slack — pełna obsługa powtarzalnych zapytań i follow-upów.",
    features: [
      "Mapowanie do 6 workflowów",
      "3 agenty: triage, dokumentacyjny, follow-up",
      "Integracja z CRM + helpdesk + Slack/Teams",
      "Baza wiedzy z cytowaniem źródeł",
      "Cotygodniowy raport jakości odpowiedzi",
      "Support techniczny",
    ],
    recommended: true,
  },
  {
    name: "ENTERPRISE",
    price: "18 000 PLN + 3 000 PLN/mies",
    desc: "Nielimitowane workflowy, audyt RODO, testy regresji i dedykowany opiekun.",
    features: [
      "Nielimitowane workflowy i agenci",
      "Integracja z dowolnym systemem",
      "Audyt bezpieczeństwa (RODO, dane osobowe)",
      "Testy regresji agentów (anti-drift)",
      "Szkolenie zespołu (2 dni)",
      "SLA 4h + dedykowany opiekun",
    ],
  },
];

const timeline = [
  { week: "Tydzień 1", steps: ["Warsztat mapowania procesów", "Prototyp agenta na danych historycznych", "Demo + feedback klienta"] },
  { week: "Tydzień 2", steps: ["Integracja z systemami + poprawki", "Testy na żywo + szkolenie", "Przekazanie"] },
];

export default function SupportAIPage() {
  return (
    <main id="main" className="page-shell" tabIndex={-1}>
      <SiteHeader variant="support-ai" />

      {/* Hero */}
      <section className="hero surface">
        <div className="hero-copy">
          <p className="eyebrow">SupportFlow AI</p>
          <h1>AI, które naprawdę odciąża Twój support</h1>
          <p className="lede">
            Nie chatbot — konkretne agenty, które klasyfikują zgłoszenia, piszą robocze odpowiedzi,{" "}
            a trudne sprawy eskalują do człowieka. Działa z Twoim obecnym helpdeskiem.
          </p>
          <div className="hero-actions">
            <a className="button button-primary" href="#pakiety">
              Zobacz pakiety
            </a>
            <Link className="button button-secondary" href="/produkty">
              Przykłady wdrożeń
            </Link>
          </div>
        </div>
        <div className="hero-panel">
          <div className="hero-panel-card">
            <span className="hero-panel-label">Co automatyzujemy</span>
            <ul>
              <li>klasyfikacja zgłoszeń i wykrywanie pilności</li>
              <li>robocze odpowiedzi z cytowaniem bazy wiedzy</li>
              <li>eskalacja trudnych spraw do właściwej osoby</li>
            </ul>
          </div>
          <div className="hero-panel-grid">
            <div className="hero-chip">triage</div>
            <div className="hero-chip">helpdesk AI</div>
            <div className="hero-chip">automatyzacja</div>
            <div className="hero-chip">integracje</div>
            <div className="hero-chip">dashboard</div>
            <div className="hero-chip">SLA</div>
          </div>
        </div>
      </section>

      {/* Problem / Solution */}
      <section className="section" id="problem">
        <SectionHeading
          eyebrow="Problem"
          heading="Twój zespół supportu traci godziny na powtarzalne pytania"
        />
        <div className="approach-grid">
          <div className="surface pillar-card">
            <h3>Bez automatyzacji</h3>
            <ul>
              <li>10-20h tygodniowo na te same odpowiedzi</li>
              <li>Brak priorytetyzacji — pilne zgłoszenia czekają</li>
              <li>Brak danych — nie wiadomo, co zajmuje najwięcej czasu</li>
            </ul>
          </div>
          <div className="surface pillar-card">
            <h3>Z SupportFlow AI</h3>
            <ul>
              <li>Agent klasyfikuje i priorytetyzuje w kilka sekund</li>
              <li>Robocze odpowiedzi gotowe do zatwierdzenia</li>
              <li>Dashboard pokazuje: ile auto, ile eskalacji, średni czas</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Packages */}
      <section className="section" id="pakiety">
        <SectionHeading
          eyebrow="Pakiety"
          heading="Od prototypu do pełnego wdrożenia"
        />
        <div className="pillar-grid">
          {packages.map((pkg) => (
            <div key={pkg.name} className={`surface pillar-card${pkg.recommended ? " pillar-card-featured" : ""}`}>
              {pkg.recommended && <span className="pillar-card-badge">Najczęściej wybierany</span>}
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

      {/* Comparison */}
      <section className="section" id="porownanie">
        <SectionHeading
          eyebrow="Porównanie"
          heading="Dlaczego nie Intercom ani Zendesk"
        />
        <div className="surface overflow-x">
          <table className="compare-table">
            <thead>
              <tr>
                <th></th>
                <th>Intercom Fin</th>
                <th>Zendesk AI</th>
                <th>SupportFlow AI</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Cena</td>
                <td>$50–150/mies/os</td>
                <td>$100+/mies/os</td>
                <td><strong>4 000 PLN jednorazowo</strong></td>
              </tr>
              <tr>
                <td>Konfiguracja</td>
                <td>Gotowiec</td>
                <td>Gotowiec</td>
                <td><strong>Szyty na miarę</strong></td>
              </tr>
              <tr>
                <td>Integracja z PL systemami</td>
                <td>Nie</td>
                <td>Nie</td>
                <td><strong>Tak</strong></td>
              </tr>
              <tr>
                <td>Język polski</td>
                <td>Słaby</td>
                <td>Brak</td>
                <td><strong>Natywny</strong></td>
              </tr>
              <tr>
                <td>Opieka</td>
                <td>Support ticket</td>
                <td>Support ticket</td>
                <td><strong>Bezpośredni kontakt</strong></td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Timeline */}
      <section className="section" id="proces">
        <SectionHeading
          eyebrow="Proces"
          heading="2 tygodnie od decyzji do działającego agenta"
        />
        <div className="approach-grid">
          {timeline.map((t) => (
            <div key={t.week} className="surface pillar-card">
              <h3>{t.week}</h3>
              <ol>
                {t.steps.map((s, i) => (
                  <li key={i}>{s}</li>
                ))}
              </ol>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="section" id="kontakt">
        <SectionHeading
          eyebrow="Zacznijmy"
          heading="Opisz swój proces wsparcia — sprawdzę, co można zautomatyzować"
        />
        <div className="surface contact-card">
          <div className="contact-copy">
            <ContactSignals />
          </div>
          <ContactForm />
        </div>
      </section>
    </main>
  );
}
