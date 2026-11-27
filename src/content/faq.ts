// FAQ shared by the homepage ("Uwagi" notes), FAQPage JSON-LD and /ai/faq.json.
// Voice: first person singular (remote-first, planned work for small firms, JDG and SMEs).
export const faqs = [
  {
    q: 'Czy pracujesz zdalnie, czy przyjeżdżasz na miejsce?',
    a: 'Pracuję wyłącznie zdalnie na terenie całej Polski — od konfiguracji narzędzi i wsparcia technicznego po integracje danych i budowę aplikacji. Nie prowadzę serwisu z dojazdem ani dyżurów awaryjnych 24/7; zadania planujemy wcześniej na konkretny termin.',
    badge: 'Zdalnie i planowo',
    category: 'Współpraca i Koszty' as const,
  },
  {
    q: 'Czy muszę podpisywać stałą umowę abonamentową?',
    a: 'Nie. Możemy zacząć od jednego konkretnego zlecenia — na przykład uporządkowania poczty i kopii zapasowych, integracji arkuszy albo małego narzędzia. Dalszą współpracę ustalamy dopiero wtedy, gdy ma to sens.',
    badge: 'Etapowo bez abonamentu',
    category: 'Współpraca i Koszty' as const,
  },
  {
    q: 'Jak wygląda wycena i rozliczenie?',
    a: 'Po krótkim opisie problemu przygotowuję propozycję zakresu i wycenę przed startem — za zamknięty etap albo w rozliczeniu godzinowym przy doraźnych pracach zdalnych. Rozliczamy się na fakturę.',
    badge: 'Jasny zakres i wycena',
    category: 'Współpraca i Koszty' as const,
  },
  {
    q: 'Nie znam się na sprawach technicznych — jak mam opisać problem?',
    a: 'Wystarczy kilka zdań zwykłym językiem: co zajmuje za dużo czasu, co sprawia kłopot albo jaki efekt chcesz osiągnąć. Dopytam o potrzebne szczegóły i przedstawię opcje po ludzku.',
    badge: 'Prostym językiem',
    category: 'Współpraca i Koszty' as const,
  },
  {
    q: 'Kto ma dostęp do kont, danych i kodu po zakończeniu prac?',
    a: 'Konta, domeny, dostępy oraz zasady poufności i praw do stworzonego rozwiązania ustalamy wprost przed rozpoczęciem prac — tak, żeby firma zachowała kontrolę nad swoimi danymi i narzędziami.',
    badge: 'Kontrola po stronie firmy',
    category: 'Bezpieczeństwo i RODO' as const,
  },
];
