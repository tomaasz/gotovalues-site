// FAQ shared by the homepage ("Uwagi" notes), FAQPage JSON-LD and /ai/faq.json.
// Voice: first person singular (independent local & remote IT partner for small firms and JDG).
export const faqs = [
  // KATEGORIA 1: WSPÓŁPRACA I KOSZTY
  {
    q: 'Czy pomagasz zdalnie, czy też na miejscu?',
    a: 'Jedno i drugie. Większość codziennych problemów z komputerem, pocztą, programami czy uprawnieniami rozwiązuję zdalnie od ręki — na terenie całej Polski. Gdy sprawa wymaga pracy fizycznej (sieć, Wi-Fi, okablowanie, drukarka, serwis sprzętu), przyjeżdżam na miejsce — działam w Zabrodziu, powiecie wyszkowskim i okolicach.',
    badge: 'Zdalnie i na miejscu',
    category: 'Współpraca i Koszty' as const,
  },
  {
    q: 'Czy muszę podpisywać stałą umowę abonamentową?',
    a: 'Nie. Możemy współpracować jednorazowo (np. konfiguracja sieci, naprawa komputera, wdrożenie poczty i kopii zapasowych) albo w lekkiej stałej opiece IT dla małej firmy i JDG — zależnie od tego, co ma sens przy Twojej skali.',
    badge: 'Doraźnie lub stale',
    category: 'Współpraca i Koszty' as const,
  },
  {
    q: 'Ile kosztuje usługa i jak rozliczamy współpracę?',
    a: 'Zanim zaczniemy, dostajesz jasną wycenę za konkretną usługę albo stawkę godzinową przy doraźnym wsparciu. Rozliczamy się przejrzyście na fakturę — bez ukrytych kosztów i bez pakietów korporacyjnych.',
    badge: 'Przejrzysta wycena',
    category: 'Współpraca i Koszty' as const,
  },
  {
    q: 'Nie znam się na technikaliach — czy wystarczy opisać problem swoimi słowami?',
    a: 'Oczywiście. Wystarczy krótka wiadomość zwykłym językiem: co przestało działać albo co chcesz uporządkować. Dopytam o szczegóły, zaproponuję najprostsze rozwiązanie i wytłumaczę je bez żargonu.',
    badge: 'Po ludzku',
    category: 'Współpraca i Koszty' as const,
  },

  // KATEGORIA 2: BEZPIECZEŃSTWO I DANE
  {
    q: 'Jak dbasz o bezpieczeństwo danych, haseł i kopii zapasowych?',
    a: 'Kopie zapasowe (backup) i bezpieczeństwo to podstawa małej firmy. Pomagam ustawić automatyczny backup kluczowych plików, uporządkować dostępy i hasła oraz zabezpieczyć sieć Wi-Fi. Na życzenie podpisuję umowę o poufności (NDA).',
    badge: 'Bezpieczeństwo i backup',
    category: 'Bezpieczeństwo i RODO' as const,
  },
  {
    q: 'Czy po konfiguracji wszystkie konta, domeny i sprzęty należą do mnie?',
    a: 'Tak. Domena, poczta, konta w chmurze, konfiguracja sieci i ewentualne stworzone narzędzia są zawsze zarejestrowane na Twoją firmę i masz do nich pełne dostępy.',
    badge: 'Pełna własność',
    category: 'Bezpieczeństwo i RODO' as const,
  },

  // KATEGORIA 3: ZAKRES USŁUG
  {
    q: 'Czy oprócz sieci, napraw i helpdesku robisz też strony lub automatyzacje?',
    a: 'Tak, jako naturalne uzupełnienie codziennej obsługi IT. Gdy sprzęt, sieć i poczta już działają stabilnie, mogę przygotować prostą stronę firmową, połączyć programy albo zautomatyzować powtarzalne zadania.',
    badge: 'IT + narzędzia',
    category: 'Technologia i Realizacja' as const,
  },
];
