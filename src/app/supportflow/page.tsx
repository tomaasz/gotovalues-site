import type { Metadata } from "next";


import { ContactFormLazy as ContactForm } from "@/components/contact-form-lazy";
import { ContactSignals } from "@/components/contact-signals";
import { SectionHeading } from "@/components/section-heading";
import { SiteHeader } from "@/components/site-header";
import { escapeMap } from "@/lib/utils";

export const metadata: Metadata = {
  title: "SupportFlow AI — automatyzacja wsparcia B2B",
  alternates: { canonical: "/supportflow" },
  description:
    "Nie chatbot — konkretne agenty AI, które klasyfikują zgłoszenia, piszą robocze odpowiedzi i eskalują trudne sprawy do człowieka. 2 tygodnie wdrożenia, od 4 000 PLN. Polski język, bezpośredni kontakt z founderem.",
  openGraph: {
    title: "SupportFlow AI — automatyzacja wsparcia B2B",
    description:
      "Nie chatbot — konkretne agenty AI, które klasyfikują zgłoszenia, piszą robocze odpowiedzi i eskalują trudne sprawy do człowieka. 2 tygodnie wdrożenia, od 4 000 PLN.",
    url: "https://gotovalues.com/supportflow",
    siteName: "gotovalues",
    locale: "pl_PL",
    type: "website",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: "SupportFlow AI",
  description:
    "Agenci AI do automatyzacji wsparcia B2B — klasyfikacja zgłoszeń, robocze odpowiedzi, eskalacja. Wdrożenie w 2 tygodnie, od 4 000 PLN.",
  offers: {
    "@type": "AggregateOffer",
    lowPrice: "4000",
    highPrice: "18000",
    priceCurrency: "PLN",
    offerCount: "3",
  },
};

const features = [
  {
    title: "Klasyfikacja zgłoszeń",
    desc: "Agent automatycznie kategoryzuje zgłoszenia i wykrywa pilność — zespół widzi od razu, od czego zacząć.",
  },
  {
    title: "Robocze odpowiedzi",
    desc: "AI pisze propozycje odpowiedzi z cytowaniem bazy wiedzy — człowiek tylko zatwierdza lub koryguje.",
  },
  {
    title: "Eskalacja do człowieka",
    desc: "Trudne sprawy trafiają do właściwej osoby z kontekstem — bez przeklejania i gubienia wątku.",
  },
  {
    title: "Integracja z helpdeskiem",
    desc: "Działa z Twoim obecnym systemem zgłoszeń — Freshdesk, Zendesk, Jira, a nawet mailbox. Bez migracji danych.",
  },
  {
    title: "Dashboard z metrykami",
    desc: "Ile spraw załatwia agent, ile trafia do eskalacji, średni czas odpowiedzi — wszystko na jednym ekranie.",
  },
  {
    title: "Baza wiedzy z cytowaniem",
    desc: "Agent cytuje źródła z Waszej dokumentacji, FAQ i historii ticketów. Odpowiedzi są weryfikowalne, nie zmyślone.",
  },
];

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

const competition = [
  { label: "Cena", them: "$50–150/mies/os", us: "4 000 PLN jednorazowo" },
  { label: "Konfiguracja", them: "Gotowiec", us: "Szyty na miarę" },
  { label: "Integracja z PL systemami", them: "Nie", us: "Tak" },
  { label: "Język polski", them: "Słaby / brak", us: "Natywny" },
  { label: "Opieka człowieka", them: "Support ticket", us: "Bezpośredni kontakt" },
];

const timeline = [
  { week: "Tydzień 1", steps: ["Warsztat mapowania procesów", "Prototyp agenta na danych historycznych", "Demo + feedback klienta"] },
  { week: "Tydzień 2", steps: ["Integracja z systemami + poprawki", "Testy na żywo + szkolenie", "Przekazanie"] },
];

const pilotBenefits = [
  "Priorytetowe wdrożenie w 2 tygodnie — Twój workflow jako pierwszy",
  "Bezpośredni kontakt z founderem przez cały proces (Slack / mail / telefon)",
  "Możliwość wpływania na roadmapę — Twoje potrzeby kształtują kolejne funkcje",
  "Rabat 25% na pakiet BUSINESS lub ENTERPRISE dla pierwszych 3 klientów",
  "Case study z Twoją nazwą (lub anonimowe) do celów marketingowych za zgodą",
  "Gwarancja: jeśli po 30 dniach agent nie odciąża zespołu — zwracam pieniądze",
];

export default function SupportFlowPage() {
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
            a trudne sprawy eskalują do człowieka. Działa z Twoim obecnym helpdeskiem.{" "}
            <strong>🇵🇱 Polski język, polski rynek, bezpośredni kontakt z founderem.</strong>
          </p>
          <div className="hero-actions">
            <a className="button button-primary" href="#kontakt">
              Opisz proces wsparcia
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

      {/* Features — 6 cards */}
      <section className="section" id="jak-dziala">
        <SectionHeading
          eyebrow="Jak działa"
          heading="Agent, który naprawdę odciąża zespół"
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
          heading="Twój zespół supportu traci godziny na powtarzalne pytania"
        />
        <div className="approach-grid">
          <div className="surface pillar-card">
            <h3>Bez automatyzacji</h3>
            <ul>
              <li>10–20h tygodniowo na te same odpowiedzi</li>
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

      {/* Competition */}
      <section className="section" id="konkurencja">
        <SectionHeading
          eyebrow="Konkurencja"
          heading="Szyty na miarę, a nie gotowiec"
        />
        <div className="surface pillar-card overflow-x">
          <table className="compare-table">
            <thead>
              <tr>
                <th></th>
                <th>Intercom / Zendesk AI</th>
                <th>SupportFlow AI</th>
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
          heading="Kiedy SupportFlow AI ma sens, a kiedy lepiej nie"
        />
        <div className="approach-grid">
          <div className="surface pillar-card">
            <h3>Ma sens, gdy:</h3>
            <ul>
              <li>zespół traci 10+ h tygodniowo na powtarzalne pytania, których wzór już znacie</li>
              <li>macie obecny helpdesk lub system zgłoszeń, do którego trzeba się wpiąć</li>
              <li>baza wiedzy istnieje (instrukcje, FAQ, historia ticketów) i można z niej cytować</li>
              <li>chcecie zachować kontrolę nad odpowiedziami — agent ma sugerować, człowiek zatwierdza</li>
              <li>polskie systemy, polski język klientów i krótki dystans do osoby decyzyjnej</li>
            </ul>
          </div>
          <div className="surface pillar-card">
            <h3>Lepiej szukać dalej, gdy:</h3>
            <ul>
              <li>zapytań jest mniej niż ~50 tygodniowo — ręczna obsługa wychodzi taniej</li>
              <li>nie macie jeszcze żadnego systemu zgłoszeń — najpierw warto uporządkować proces</li>
              <li>szukacie chatbota na stronę WWW dla anonimowych gości — wystarczy standardowy widget</li>
              <li>oczekujecie, że AI samo odpowie 100% spraw bez nadzoru człowieka — to nie ten produkt</li>
              <li>budżet musi być rozliczony w modelu SaaS per-seat — pracuję projektowo, nie subskrypcyjnie</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Pilot program */}
      <section className="section" id="program-pilotazowy">
        <SectionHeading
          eyebrow="Program pilotażowy"
          heading="Zostań pierwszym klientem referencyjnym"
        />
        <div className="surface pillar-card">
          <p>
            Szukam 3 firm, które chcą jako pierwsze wdrożyć SupportFlow AI w swoim zespole.
            W zamian za feedback i zgodę na wykorzystanie wdrożenia jako case study (z nazwą lub anonimowo){" "}
            oferuję warunki, jakich później już nie będzie:
          </p>
          <ul style={{ marginTop: "22px" }}>
            {pilotBenefits.map((b) => (
              <li key={b}>{b}</li>
            ))}
          </ul>
          <p style={{ marginTop: "22px", color: "var(--gv-muted)", fontSize: "0.92rem" }}>
            <em>Program pilotażowy jest ograniczony do pierwszych 3 klientów. Po ich wdrożeniu{" "}
            standardowe ceny i warunki wracają bez rabatu.</em>
          </p>
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
            <p>
              Nie musisz mieć gotowej specyfikacji. Wystarczą 2–4 zdania o
              jednym konkretnym workflow, w którym zespół traci czas — sprawdzę,
              czy agent AI ma sens, czy lepiej wzmocnić to, co już macie.
            </p>
            <ul className="contact-points">
              <li>opisz proces obsługi 1 typu zgłoszeń (np. status zamówienia, reklamacja, FAQ)</li>
              <li>powiedz, na jakim helpdesku pracujecie i ile zgłoszeń tygodniowo</li>
              <li>jeśli problem rozwiąże gotowy dodatek do Waszego systemu — powiem to wprost</li>
            </ul>
            <ContactSignals />
            <p className="helper-text" style={{ marginTop: "18px" }}>
              <strong>🇵🇱 Pracuję bezpośrednio z klientami z Polski.</strong>{" "}
              Nie ma account managerów, salesów ani call center — piszesz do mnie,{" "}
              odpowiadam ja.
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
