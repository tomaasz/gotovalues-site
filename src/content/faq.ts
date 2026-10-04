// FAQ shared by the homepage ("Uwagi" notes), FAQPage JSON-LD and /ai/faq.json.
// Voice: first person singular (independent partner). No unverified figures —
// see PRODUCT.md, "Capabilities and Constraints".
export const faqs = [
  // KATEGORIA 1: WSPÓŁPRACA I KOSZTY
  {
    q: 'Od czego zaczyna się współpraca?',
    a: 'Od krótkiego opisu jednego procesu: miejsca, w którym zespół przepisuje dane, szuka statusów albo obsługuje wyjątki ręcznie. Najpierw sprawdzam, czy problem rozwiąże gotowe narzędzie lub integracja tego, co już macie. Dedykowaną aplikację albo agenta AI buduję tylko wtedy, gdy to jedyna sensowna droga.',
    badge: 'Model współpracy',
    category: 'Współpraca i Koszty' as const,
  },
  {
    q: 'Ile kosztuje realizacja projektu i jak rozliczamy współpracę?',
    a: 'Wyceniam projekty stałą stawką za etap albo jako elastyczny budżet iteracyjny. Zanim cokolwiek zapłacisz, dostajesz kosztorys i harmonogram. Proponuję tylko taki zakres, który ma sens biznesowo — bez agencyjnego narzutu i bez budżetu liczonego w dziesiątkach tysięcy na sam start.',
    badge: 'Przejrzysty kosztorys',
    category: 'Współpraca i Koszty' as const,
  },
  {
    q: 'Nie mam specyfikacji technicznej – czy to problem?',
    a: 'Nie. Wystarczy, że w krótkiej rozmowie opowiesz o problemie zwykłymi słowami. Sam przekładam go na zakres, architekturę i pierwszy działający prototyp.',
    badge: 'Brak specyfikacji? OK',
    category: 'Współpraca i Koszty' as const,
  },

  // KATEGORIA 2: BEZPIECZEŃSTWO I RODO
  {
    q: 'Kto posiada prawa autorskie do stworzonego kodu i aplikacji?',
    a: 'Pełne prawa autorskie do kodu, infrastruktury i baz danych przechodzą na Ciebie po zakończeniu projektu. Nie nakładam ograniczeń licencyjnych ani ukrytych opłat.',
    badge: 'Własność kodu',
    category: 'Bezpieczeństwo i RODO' as const,
  },
  {
    q: 'Co z poufnością moich danych biznesowych i zgodnością z RODO/GDPR?',
    a: 'Pracuję na zabezpieczonych środowiskach i korzystam z komercyjnych instancji modeli AI, których warunki wykluczają trenowanie modeli na Twoich danych. Na życzenie podpisuję umowę o poufności (NDA) przed rozpoczęciem rozmów.',
    badge: 'Poufność i RODO',
    category: 'Bezpieczeństwo i RODO' as const,
  },

  // KATEGORIA 3: TECHNOLOGIA I REALIZACJA
  {
    q: 'Czy kod tworzony z pomocą AI jest bezpieczny i łatwy w utrzymaniu?',
    a: 'AI to narzędzie w mojej pracy, nie autor projektu: każdy fragment kodu przeglądam i testuję. Używam sprawdzonych technologii (React, Next.js, Python, PostgreSQL), a szyfrowanie, walidacja danych, kontrola dostępu i monitoring błędów są standardem każdego wdrożenia.',
    badge: 'Jakość i architektura',
    category: 'Technologia i Realizacja' as const,
  },
  {
    q: 'Jak szybko otrzymam pierwszą działającą wersję?',
    a: 'Działające wdrożenie dostarczam w tygodnie, nie miesiące. Dokładny termin podaję po rozmowie o procesie, razem z kosztorysem.',
    badge: 'Czas realizacji',
    category: 'Technologia i Realizacja' as const,
  },
  {
    q: 'Co się stanie, jeśli w przyszłości będę chciał rozbudować aplikację z innym zespołem?',
    a: 'Dostajesz czyste, udokumentowane repozytorium kodu z testami. Buduję na branżowych standardach, więc inny programista może kontynuować rozwój bez przepisywania od zera — nawet jeśli nie ja będę go dalej rozwijać.',
    badge: 'Bez uzależnienia od dostawcy',
    category: 'Technologia i Realizacja' as const,
  },
];
