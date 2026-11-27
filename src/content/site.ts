export const brandName = "gotovalues";

export type ServiceRoute =
  | "/automatyzacja"
  | "/dane-i-analityka"
  | "/aplikacje"
  | "/wsparcie-it";

export type OfferPillar = {
  title: string;
  href: ServiceRoute;
  ctaLabel: string;
  description: string;
  bullets: string[];
};

type ApproachPoint = {
  title: string;
  description: string;
};

export type AudiencePath = {
  eyebrow: string;
  title: string;
  description: string;
  linkLabel: string;
  href: string;
};

export type ServiceLandingContent = {
  slug: ServiceRoute;
  title: string;
  metaDescription: string;
  eyebrow: string;
  headline: string;
  intro: string;
  ctaLabel: string;
  panelLabel: string;
  panelItems: string[];
  chips: string[];
  whenHeading: string;
  whenItems: Array<{ title: string; description: string }>;
  scopeHeading: string;
  scopeItems: Array<{ title: string; description: string }>;
  processHeading: string;
  processSteps: Array<{ title: string; description: string }>;
  contactHeading: string;
  contactIntro: string;
  contactPoints: string[];
  formLabel: string;
  formPlaceholder: string;
};

export type ProductCard = {
  name: string;
  category: "public" | "private";
  summary: string;
  stack: string[];
  impact: string;
  url?: string;
  screenshot: {
    src: string;
    alt: string;
  };
};

export const siteContent = {
  brand: {
    name: brandName,
    angle:
      "Niezależny partner technologiczny: automatyzacja i integracje, dane i analityka, aplikacje oraz infrastruktura i wsparcie IT.",
    eyebrow: "Dla firm i klientów indywidualnych · zdalnie i lokalnie po umówieniu",
    headline: "Automatyzacja, aplikacje, dane i wsparcie IT.",
    intro:
      "Od uporządkowania sprzętu, serwerów i kopii zapasowych po integracje systemów, analitykę danych i dedykowane oprogramowanie.",
    cta: {
      primary: {
        label: "Opisz swój temat",
        href: "#kontakt",
      },
      secondary: {
        label: "Zobacz pełny zakres",
        href: "#oferta",
      },
    },
    audiencePaths: [
      {
        eyebrow: "Dla firm",
        title: "Procesy, dane i oprogramowanie",
        description:
          "Integracje między systemami, automatyzacja pracy, raportowanie danych, dedykowane aplikacje webowe i infrastruktura IT.",
        linkLabel: "Zobacz 4 obszary usług",
        href: "#oferta",
      },
      {
        eyebrow: "Wsparcie IT i osoby prywatne",
        title: "Komputery, serwery, sieci i konfiguracja",
        description:
          "Instalacja i modernizacja sprzętu, serwery (NAS), poczta i automatyczne kopie zapasowe — zdalnie lub lokalnie po umówieniu.",
        linkLabel: "Szczegóły wsparcia IT",
        href: "/wsparcie-it",
      },
    ] satisfies AudiencePath[],
  },
  offer: {
    pillars: [
      {
        title: "Automatyzacja i integracje",
        href: "/automatyzacja",
        ctaLabel: "Więcej o automatyzacji",
        description:
          "Eliminuję ręczne przepisywanie informacji między pocztą, arkuszami, ERP, CRM i zewnętrznymi systemami.",
        bullets: [
          "automatyczne przepływy danych między programami i bazami (API, skrypty, workflow)",
          "automatyzacja obiegu dokumentów, zgłoszeń i powtarzalnych zadań operacyjnych",
          "punktowe wdrożenia AI i OCR tam, gdzie skracają pracę i mają jasną kontrolę jakości",
        ],
      },
      {
        title: "Dane i analityka",
        href: "/dane-i-analityka",
        ctaLabel: "Więcej o danych",
        description:
          "Porządkuję rozproszone pliki i bazy w jedno wiarygodne źródło danych oraz czytelne raporty do bieżących decyzji.",
        bullets: [
          "łączenie, czyszczenie i strukturyzacja danych z arkuszy, systemów i baz SQL",
          "czytelne raporty i dashboardy zamiast ręcznego składania zestawień co tydzień",
          "definicja miar operacyjnych i kontrola spójności danych przed podjęciem decyzji",
        ],
      },
      {
        title: "Aplikacje i oprogramowanie",
        href: "/aplikacje",
        ctaLabel: "Więcej o aplikacjach",
        description:
          "Projektuję i buduję dedykowane aplikacje webowe oraz narzędzia wewnętrzne wtedy, gdy gotowe programy ograniczają sposób pracy.",
        bullets: [
          "panele operacyjne, formularze, obiegi dokumentów, wyszukiwarki i narzędzia webowe",
          "szybkie, przejrzyste strony internetowe dopasowane do realnej oferty",
          "czytelna architektura, dokumentacja i przekazanie kodu oraz kont na uzgodnionych zasadach",
        ],
      },
      {
        title: "Infrastruktura i wsparcie IT",
        href: "/wsparcie-it",
        ctaLabel: "Więcej o wsparciu IT",
        description:
          "Zapewniam uporządkowane środowisko sprzętowe i programowe dla firm oraz klientów indywidualnych — zdalnie i lokalnie po umówieniu.",
        bullets: [
          "instalacja, konfiguracja i modernizacja komputerów, serwerów (w tym NAS) oraz sieci",
          "poczta we własnej domenie, Microsoft 365, Google Workspace i automatyczne kopie zapasowe",
          "dobór i diagnostyka sprzętu, porządek w uprawnieniach oraz planowane wsparcie techniczne",
        ],
      },
    ] satisfies OfferPillar[],
  },
  products: {
    public: [
      {
        name: "Cavi",
        category: "public",
        summary: "Aplikacja webowa z własnym workflow i funkcjami AI.",
        stack: ["aplikacja webowa", "AI"],
        impact: "Przykład narzędzia, które prowadzi użytkownika przez konkretny proces.",
        url: "https://cavi.gotova.pl/",
        screenshot: {
          src: "/images/products/cavi-live.jpg",
          alt: "Strona startowa Cavi: kreator CV, skaner CV pod ATS i analizator profilu LinkedIn.",
        },
      },
      {
        name: "Akta",
        category: "public",
        summary: "System do pracy z dokumentami i uporządkowanymi danymi.",
        stack: ["dokumenty", "wyszukiwanie"],
        impact: "Przykład pracy z wyszukiwaniem i strukturą danych.",
        url: "https://akta.gotova.pl",
        screenshot: {
          src: "/images/products/akta-live.jpg",
          alt: "Strona startowa Akta: wyszukiwarka archiwów genealogicznych.",
        },
      },
    ] satisfies ProductCard[],
    private: [
      {
        name: "OCR dla dokumentów operacyjnych",
        category: "private",
        summary: "Prywatne wdrożenie do odczytu dokumentów i kontroli jakości danych.",
        stack: ["OCR", "walidacja"],
        impact: "Anonimowy przykład automatyzacji pracy z dokumentami.",
        screenshot: {
          src: "/images/private/ocr-operations.svg",
          alt: "Widok prywatnego wdrożenia OCR do przetwarzania dokumentów i kontroli pipeline'u.",
        },
      },
      {
        name: "Workflow tłumaczenia i normalizacji akt",
        category: "private",
        summary: "Prywatne wdrożenie do czyszczenia OCR i porządkowania danych.",
        stack: ["normalizacja", "dokumenty"],
        impact: "Anonimowy przykład przygotowania danych do dalszej pracy.",
        screenshot: {
          src: "/images/private/akta-translate.svg",
          alt: "Widok prywatnego wdrożenia do tłumaczenia i strukturyzacji treści dokumentów archiwalnych.",
        },
      },
    ] satisfies ProductCard[],
  },
  approach: {
    eyebrow: "Jak pracuję",
    headline: "Planowo, etapami i bez zbędnej złożoności",
    points: [
      {
        title: "Najpierw diagnoza, potem technologia",
        description:
          "Zanim zaproponuję budowę narzędzia lub zakup sprzętu, sprawdzam, gdzie realnie powstaje wąskie gardło.",
      },
      {
        title: "Zamknięte etapy i jasny zakres",
        description:
          "Większe prace dzielę na konkretne etapy z określonym rezultatem, terminem i wyceną przed startem.",
      },
      {
        title: "Jeden bezpośredni kontakt",
        description:
          "Od pierwszej rozmowy po wdrożenie rozmawiasz bezpośrednio z osobą, która projektuje i realizuje rozwiązanie.",
      },
      {
        title: "Kontrola po Twojej stronie",
        description:
          "Konta, domeny, kopie zapasowe, poufność i prawa do rozwiązań ustalamy wprost przed rozpoczęciem prac.",
      },
    ] satisfies ApproachPoint[],
  },
  about: {
    title: "O gotovalues",
    headline: "Perspektywa biznesowa, analityczna i inżynierska w jednym kontakcie.",
    role: "Niezależny partner technologiczny — automatyzacja, dane, oprogramowanie i wsparcie IT.",
    summary:
      "gotovalues łączy analizę procesów i danych z tworzeniem oprogramowania oraz praktycznym wsparciem IT. Dzięki temu jeden partner pomaga przejść całą drogę spójnie — od diagnozy problemu, przez dobór narzędzi lub sprzętu, po działające wdrożenie.",
    points: [
      {
        label: "Procesy i dane",
        value:
          "mapowanie obiegu informacji, porządkowanie źródeł danych, raportowanie i ocena opłacalności wdrożeń.",
      },
      {
        label: "Oprogramowanie i IT",
        value:
          "aplikacje webowe i integracje (TypeScript/Next.js, Python, SQL), OCR/AI oraz konfiguracja serwerów, NAS, sieci i komputerów.",
      },
      {
        label: "Obszar działania",
        value:
          "zdalnie w całej Polsce; wybrane prace sprzętowe i instalacyjne lokalnie po umówieniu (Zabrodzie, powiat wyszkowski).",
      },
    ],
  },
  contact: {
    intro:
      "Napisz kilka zdań zwykłym językiem — czy chodzi o automatyzację, dane, aplikację webową, czy o komputer, serwer lub wsparcie IT. Jeśli temat wykracza poza mój zakres, powiem to wprost na początku.",
    signals: [
      {
        label: "E-mail",
        value: "kontakt@gotovalues.com",
        href: "mailto:kontakt@gotovalues.com",
      },
      {
        label: "Odpowiedź",
        value: "Odpowiadam w dni robocze.",
      },
      {
        label: "Tryb pracy",
        value: "Zdalnie (cała Polska) · lokalnie po umówieniu (Zabrodzie, pow. wyszkowski).",
      },
    ],
  },
  aiSummary: {
    title: "gotovalues — automatyzacja, aplikacje, dane i wsparcie IT",
    positioning:
      "gotovalues to niezależny partner technologiczny dla firm i klientów indywidualnych: automatyzacja i integracje, dane i analityka, dedykowane aplikacje webowe oraz infrastruktura i wsparcie IT (komputery, serwery, NAS, sieci, kopie zapasowe). Praca zdalna w całej Polsce oraz sprawy sprzętowe po umówieniu (Zabrodzie, powiat wyszkowski).",
    sitemap: "https://gotovalues.com/sitemap.xml",
    bestFor: [
      "firmy tracące czas na ręczne przepisywanie danych między pocztą, arkuszami, ERP i CRM",
      "firmy potrzebujące wiarygodnych raportów, dashboardów lub dedykowanej aplikacji webowej dopasowanej do procesu",
      "firmy i osoby prywatne szukające wsparcia IT: instalacji i konfiguracji komputerów, serwerów (NAS), sieci, poczty i kopii zapasowych",
    ],
    notFor: [
      "organizacje wymagające całodobowych dyżurów awaryjnych 24/7 i natychmiastowego serwisu SLA",
      "rozległe wdrożenia ERP dla setek użytkowników wymagające dużego zespołu wdrożeniowego",
    ],
    proof: [
      "automatyzacja i integracje",
      "dane i analityka",
      "aplikacje i oprogramowanie",
      "infrastruktura i wsparcie IT",
    ],
  },
  comparisonLanding: {
    eyebrow: "Jak pracuję",
    headline: "Od konkretnego problemu do rozwiązania dopasowanego do skali",
    intro:
      "Zaczynam od zrozumienia, co w codziennej pracy zabiera najwięcej czasu albo powoduje błędy. Dopiero potem wybieram poziom rozwiązania — konfigurację obecnych narzędzi lub sprzętu, integrację danych, automatyzację albo dedykowaną aplikację webową.",
    audiences: [
      {
        slug: "proces-przed-kodem",
        title: "Najpierw diagnoza, dopiero potem budowa",
        pain: "Gdy zlecenie powiela stare obejście zamiast źródła problemu, napisanie nowego oprogramowania utrwala tylko zbędną pracę.",
        gotovaluesAdvantage: [
          "sprawdzam, czy wystarczy konfiguracja narzędzi, z których już korzystasz",
          "łączę analizę procesu, dane, kod i infrastrukturę IT w jednym bezpośrednim kontakcie",
          "dzielę pracę na zamknięte etapy z jasnym kryterium odbioru przed startem",
        ],
      },
      {
        slug: "automatyzacja-i-aplikacja",
        title: "Integracja, gdy wystarczy. Aplikacja, gdy jest potrzebna.",
        pain: "Gotowe narzędzia sprawdzają się w standardowych zadaniach, ale przy własnych widokach pracy, wyjątkach i kontroli danych bywają zbyt sztywne.",
        gotovaluesAdvantage: [
          "łączę istniejące arkusze, pocztę i systemy zamiast wymieniać całe środowisko",
          "buduję dedykowany interfejs webowy wtedy, gdy potrzebujesz jednego miejsca pracy",
          "przekazuję kod, konta i dokumentację na zasadach ustalonych przed startem",
        ],
      },
    ],
    cta: {
      label: "Opisz temat do uporządkowania",
      href: "#kontakt",
    },
  },
  serviceLandings: {
    automatyzacja: {
      slug: "/automatyzacja",
      title: "Automatyzacja procesów i integracje systemów",
      metaDescription:
        "Automatyzacja powtarzalnej pracy i integracje między pocztą, arkuszami, ERP, CRM oraz dokumentami. Punktowe wdrożenia AI i OCR z kontrolą jakości.",
      eyebrow: "Automatyzacja i integracje",
      headline: "Automatyzacja i integracje, które zdejmują ręczne przepisywanie danych.",
      intro:
        "Łączę pocztę, arkusze, CRM, ERP i zewnętrzne narzędzia w jeden spójny przepływ — z kontrolą wyjątków i punktowym użyciem AI tam, gdzie ma to uzasadnienie.",
      ctaLabel: "Opisz proces do automatyzacji",
      panelLabel: "Typowe zastosowania",
      panelItems: [
        "synchronizacja zamówień, statusów i danych między systemami",
        "automatyczny obieg dokumentów, zgłoszeń i powiadomień",
        "odczyt dokumentów (OCR/AI) z obowiązkową walidacją wyjątków",
      ],
      chips: ["API", "workflow", "OCR", "AI", "integracje"],
      whenHeading: "Kiedy automatyzacja daje realny zwrot",
      whenItems: [
        {
          title: "Te same dane w kilku miejscach",
          description:
            "Informacje z maila, PDF-ów i arkuszy są ręcznie przepisywane do kolejnego programu, co generuje pomyłki i stratę godzin.",
        },
        {
          title: "Statusy trzeba dopytywać ręcznie",
          description:
            "Ustalenie, na jakim etapie jest sprawa lub zlecenie, wymaga przeszukiwania skrzynek i wykonywania telefonów.",
        },
        {
          title: "Gotowe narzędzia blokują się na wyjątkach",
          description:
            "Proste automatyzacje przestają wystarczać, gdy pojawiają się niestandardowe dokumenty, reguły walidacji albo rosnące opłaty za operacje.",
        },
      ],
      scopeHeading: "Jakie rozwiązania wdrażam",
      scopeItems: [
        {
          title: "Integracje systemów i API",
          description:
            "Łączenie istniejących baz danych, arkuszy, poczty, ERP i CRM bez wymiany całego środowiska.",
        },
        {
          title: "Obieg dokumentów i zgłoszeń",
          description:
            "Porządkowanie przepływu dokumentów, klasyfikacji spraw i generowania powtarzalnych plików w firmowych szablonach.",
        },
        {
          title: "Punktowe AI i OCR z nadzorem",
          description:
            "Wykorzystanie modeli językowych i OCR wyłącznie w konkretnych krokach z weryfikacją jakości danych przez człowieka.",
        },
      ],
      processHeading: "Jak przebiega realizacja",
      processSteps: [
        {
          title: "1. Mapa realnego obiegu",
          description:
            "Spisujemy rzeczywisty przebieg pracy i liczymy, gdzie znika najwięcej czasu oraz skąd biorą się błędy.",
        },
        {
          title: "2. Wybór najprostszego poziomu",
          description:
            "Dobieram rozwiązanie: konfiguracja obecnych narzędzi, lekki skrypt/integracja API albo dedykowany moduł.",
        },
        {
          title: "3. Pierwszy zamknięty etap",
          description:
            "Wdrażamy usprawnienie dla jednego wybranego procesu, weryfikujemy wynik w praktyce i przekazujemy dokumentację.",
        },
      ],
      contactHeading: "Opisz proces, który zabiera zbyt dużo ręcznej pracy",
      contactIntro:
        "Wystarczy kilka zdań o tym, skąd przychodzą dane i dokąd muszą trafić. Sprawdzę, czy wystarczy prosta integracja, czy potrzebny jest osobny przepływ.",
      contactPoints: [
        "nie potrzebujesz gotowej specyfikacji technicznej",
        "przed startem ustalamy jasny zakres, termin i wycenę",
        "jeśli automatyzacja nie ma sensu biznesowego — powiem to wprost",
      ],
      formLabel: "Opisz proces do automatyzacji",
      formPlaceholder:
        "Np. jakie programy lub pliki biorą udział w procesie (poczta, Excel, ERP, PDF) i co dziś trzeba robić ręcznie?",
    },
    dane: {
      slug: "/dane-i-analityka",
      title: "Dane i analityka — porządkowanie danych i raportowanie",
      metaDescription:
        "Porządkowanie rozproszonych danych, budowa źródeł SQL oraz czytelne raporty i dashboardy wspierające codzienne decyzje w firmie.",
      eyebrow: "Dane i analityka",
      headline: "Jedno źródło danych i raporty, którym można ufać przy decyzjach.",
      intro:
        "Pomagam przejść od rozproszonych arkuszy Excel i ręcznych zestawień do uporządkowanych baz danych oraz przejrzystych widoków analitycznych.",
      ctaLabel: "Opisz swoje dane i raporty",
      panelLabel: "Typowe obszary prac",
      panelItems: [
        "łączenie i czyszczenie danych z arkuszy, ERP, CRM i baz SQL",
        "automatyczne odświeżanie raportów operacyjnych i finansowych",
        "czytelne dashboardy pokazujące wyjątki i kluczowe miary",
      ],
      chips: ["SQL", "raporty", "dashboardy", "ETL", "analiza"],
      whenHeading: "Kiedy warto uporządkować warstwę danych",
      whenItems: [
        {
          title: "Każdy dział ma inne liczby",
          description:
            "Różne wersje arkuszy i ręczne eksporty sprawiają, że spotkania zaczynają się od ustalania, które dane są aktualne.",
        },
        {
          title: "Zestawienia powstają ręcznie co tydzień",
          description:
            "Sklejanie plików CSV, kopiowanie tabel i poprawianie formuł zabiera czas, który powinien służyć analizie wniosków.",
        },
        {
          title: "Brak szybkiego podglądu sytuacji",
          description:
            "Dane istnieją w systemach, ale nie są zebrane w jeden prosty widok pokazujący odchylenia i priorytety.",
        },
      ],
      scopeHeading: "Co przygotowuję w obszarze danych",
      scopeItems: [
        {
          title: "Porządkowanie i łączenie źródeł",
          description:
            "Automatyczne pobieranie, czyszczenie i ujednolicanie danych z arkuszy, baz danych i eksportów systemowych.",
        },
        {
          title: "Raporty i dashboardy decyzyjne",
          description:
            "Przejrzyste widoki skupione na konkretnych decyzjach operacyjnych zamiast przeładowanych tabel.",
        },
        {
          title: "Kontrola spójności i jakości danych",
          description:
            "Reguły walidacji wyłapujące braki, duplikaty i rozbieżności, zanim trafią do końcowego raportu.",
        },
      ],
      processHeading: "Jak pracuję z danymi",
      processSteps: [
        {
          title: "1. Decyzje przed wykresami",
          description:
            "Zaczynamy od listy konkretnych pytań, na które raport ma odpowiadać — bez budowania zbędnych wskaźników.",
        },
        {
          title: "2. Weryfikacja źródeł",
          description:
            "Sprawdzamy dostępność, format i jakość obecnych danych w systemach i arkuszach.",
        },
        {
          title: "3. Pierwszy działający widok",
          description:
            "Dostarczam automatycznie odświeżany raport lub widok SQL/webowy, który od razu sprawdza się w codziennej pracy.",
        },
      ],
      contactHeading: "Opisz, z jakimi danymi i raportami pracujesz",
      contactIntro:
        "Napisz krótko, skąd dziś pochodzą dane i jakie zestawienia sprawiają największy problem. Zaproponuję najprostszy sposób uporządkowania tego w pierwszym etapie.",
      contactPoints: [
        "pracuję na istniejących źródłach (arkusze, CSV, SQL, API)",
        "zaczynamy od jednego kluczowego zestawienia zamiast wielkiej hurtowni",
        "jasny zakres i zasady poufności ustalone przed startem",
      ],
      formLabel: "Opisz źródła danych i cel raportu",
      formPlaceholder:
        "Np. skąd pochodzą dane (Excel, ERP, CRM, baza SQL) i jakich informacji lub raportów najbardziej brakuje?",
    },
    aplikacje: {
      slug: "/aplikacje",
      title: "Dedykowane aplikacje webowe i oprogramowanie",
      metaDescription:
        "Projektowanie i budowa dedykowanych aplikacji webowych, paneli operacyjnych, wyszukiwarek dokumentów i szybkich stron internetowych.",
      eyebrow: "Aplikacje i oprogramowanie",
      headline: "Dedykowane aplikacje webowe dopasowane do realnego sposobu pracy.",
      intro:
        "Gdy gotowe oprogramowanie wymusza ręczne obejścia albo płacisz za dziesiątki zbędnych funkcji, buduję lekką aplikację webową dokładnie pod Twój proces.",
      ctaLabel: "Opisz potrzebne narzędzie",
      panelLabel: "Co buduję",
      panelItems: [
        "panele operacyjne, formularze i obiegi dokumentów w przeglądarce",
        "wyszukiwarki i bazy danych z walidacją oraz funkcjami AI",
        "szybkie, przejrzyste strony internetowe i narzędzia klienckie",
      ],
      chips: ["Next.js", "TypeScript", "Python", "PostgreSQL", "web app"],
      whenHeading: "Kiedy własne oprogramowanie ma sens",
      whenItems: [
        {
          title: "Arkusz Excel przestał wystarczać",
          description:
            "Plik ma wiele wersji, łatwo w nim o przypadkowy błąd, a kilka osób musi pracować na tych samych danych równocześnie.",
        },
        {
          title: "Gotowy SaaS nie pasuje do procesu",
          description:
            "Narzędzia z półki wymagają ciągłego obchodzenia ograniczeń albo wysokich opłat abonamentowych za każdego użytkownika.",
        },
        {
          title: "Potrzebujesz cienkiej warstwy nad obecnym systemem",
          description:
            "Nie trzeba wymieniać ERP ani księgowości — wystarczy prosty interfejs webowy spinający brakujący fragment pracy.",
        },
      ],
      scopeHeading: "Zakres prac programistycznych",
      scopeItems: [
        {
          title: "Narzędzia wewnętrzne i panele",
          description:
            "Dedykowane aplikacje do obsługi zleceń, dokumentów, statusów, walidacji danych i pracy zespołowej.",
        },
        {
          title: "Strony internetowe i portale",
          description:
            "Przejrzyste, szybkie strony ofertowe i lekkie portale zbudowane w nowoczesnym stacku bez ciężkich kreatorów.",
        },
        {
          title: "Architektura i przekazanie",
          description:
            "Czytelny kod, dokumentacja wdrożeniowa i jasne zasady własności kont, repozytorium oraz hostingu.",
        },
      ],
      processHeading: "Od pomysłu do działającej wersji",
      processSteps: [
        {
          title: "1. Weryfikacja gotowców",
          description:
            "Najpierw sprawdzam, czy problemu nie da się rozwiązać taniej istniejącym narzędziem lub prostą integracją.",
        },
        {
          title: "2. Wąski zakres pierwszej wersji",
          description:
            "Ustalamy minimalny zestaw funkcji, który rozwiązuje główny problem i pozwala szybko przetestować narzędzie w praktyce.",
        },
        {
          title: "3. Wdrożenie i przekazanie",
          description:
            "Publikacja, testy, dokumentacja i przekazanie pełnej kontroli nad środowiskiem po Twojej stronie.",
        },
      ],
      contactHeading: "Opisz narzędzie lub stronę, której potrzebujesz",
      contactIntro:
        "Napisz własnymi słowami, co aplikacja ma ułatwić i z czego korzystasz obecnie. Wrócę z propozycją najprostszego zakresu albo uczciwą informacją, jeśli lepiej sprawdzi się gotowiec.",
      contactPoints: [
        "nowoczesny, sprawdzony stack (TypeScript/Next.js, Python, PostgreSQL)",
        "realizacja etapami z jasną wyceną przed startem",
        "pełna przejrzystość kont, kodu i dokumentacji",
      ],
      formLabel: "Opisz potrzebną aplikację lub stronę",
      formPlaceholder:
        "Np. jaką czynność miałaby uprościć aplikacja, kto będzie z niej korzystać i z jakimi danymi ma współpracować?",
    },
    wsparcieIt: {
      slug: "/wsparcie-it",
      title: "Wsparcie IT, serwery, sieci i sprzęt — zdalnie i lokalnie",
      metaDescription:
        "Wsparcie IT dla firm i klientów indywidualnych: instalacja i konfiguracja komputerów, serwerów (NAS), sieci, poczty i automatycznych kopii zapasowych.",
      eyebrow: "Infrastruktura i wsparcie IT",
      headline: "Wsparcie IT, sprzęt i serwery — dla firm i klientów indywidualnych.",
      intro:
        "Pomagam uporządkować środowisko sprzętowe i programowe: od komputerów, serwerów (NAS) i sieci po pocztę we własnej domenie oraz automatyczne kopie zapasowe.",
      ctaLabel: "Zapytaj o wsparcie IT",
      panelLabel: "Tryb realizacji",
      panelItems: [
        "zdalnie w całej Polsce (konfiguracja, poczta, backup, diagnostyka)",
        "lokalnie po wcześniejszym umówieniu (Zabrodzie, powiat wyszkowski i okolice)",
        "planowana praca na konkretny termin — bez dyżurów awaryjnych 24/7",
      ],
      chips: ["komputery", "serwery / NAS", "sieci", "poczta", "backup"],
      whenHeading: "W jakich sytuacjach pomagam",
      whenItems: [
        {
          title: "Nowy sprzęt, modernizacja lub instalacja",
          description:
            "Trzeba dobrać, złożyć, zainstalować albo skonfigurować komputer, serwer plików (NAS) lub sieć bez tracenia całego dnia.",
        },
        {
          title: "Brak pewnych kopii zapasowych i porządku w kontach",
          description:
            "Kluczowe pliki leżą tylko na jednym dysku, a dostęp do poczty, domeny i haseł nie jest spójnie uporządkowany.",
        },
        {
          title: "Potrzeba jednego, konkretnego wsparcia bez abonamentu",
          description:
            "Szukasz pomocy przy konfiguracji oprogramowania, poczty firmowej lub sprzętu bez podpisywania sztywnej umowy serwisowej.",
        },
      ],
      scopeHeading: "Zakres wsparcia IT i hardware",
      scopeItems: [
        {
          title: "Komputery, serwery i sieci",
          description:
            "Dobór, instalacja, konfiguracja i modernizacja komputerów, serwerów (w tym NAS), routerów, Wi-Fi oraz urządzeń biurowych.",
        },
        {
          title: "Poczta, chmura i kopie zapasowe",
          description:
            "Konfiguracja poczty we własnej domenie (Microsoft 365, Google Workspace), automatyczny backup i porządek w uprawnieniach.",
        },
        {
          title: "Planowane wsparcie techniczne",
          description:
            "Zdalna diagnostyka, konfiguracja programów i bieżąca pomoc techniczna dla firm oraz klientów indywidualnych.",
        },
      ],
      processHeading: "Jak wygląda współpraca",
      processSteps: [
        {
          title: "1. Krótki opis sprawy",
          description:
            "Piszesz, czego potrzebujesz — nowy komputer, konfiguracja serwera/NAS, poczta, backup czy pomoc z oprogramowaniem.",
        },
        {
          title: "2. Ustalenie zakresu i terminu",
          description:
            "Oceniam, czy sprawę załatwimy w pełni zdalnie, czy umawiamy konkretny termin na miejscu (powiat wyszkowski i okolice).",
        },
        {
          title: "3. Realizacja i przekazanie dostępów",
          description:
            "Po zakończeniu prac wszystkie konta, hasła i konfiguracja pozostają po Twojej stronie z krótkim podsumowaniem zmian.",
        },
      ],
      contactHeading: "Opisz krótko, w czym potrzebujesz wsparcia IT",
      contactIntro:
        "Napisz zwykłym językiem, co chcesz skonfigurować, zainstalować albo uporządkować. Odpowiem w dni robocze z propozycją rozwiązania i wyceny.",
      contactPoints: [
        "obsługa firm i klientów indywidualnych",
        "bez wymogu stałego abonamentu",
        "zdalnie w całej Polsce · sprzęt lokalnie po umówieniu (Zabrodzie, pow. wyszkowski)",
      ],
      formLabel: "W czym potrzebujesz wsparcia IT?",
      formPlaceholder:
        "Np. konfiguracja komputera, serwera lub NAS, instalacja oprogramowania, poczta w domenie, kopie zapasowe albo pomoc ze sprzętem.",
    },
  } satisfies Record<string, ServiceLandingContent>,
} as const;
