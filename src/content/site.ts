export const brandName = "gotovalues";

type OfferPillar = {
  title: string;
  description: string;
  bullets: string[];
};

type ApproachPoint = {
  title: string;
  description: string;
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
    angle: "Dokumenty, statusy i dane bez ręcznego pilnowania.",
    eyebrow: "Dla firm produkcyjnych i przetwórczych.",
    headline: "Porządkuję dokumenty, ręczną pracę, statusy i wyjątki.",
    intro:
      "Dobieram najprostsze narzędzie do konkretnego procesu: aplikację webową, integrację albo praktyczne AI.",
    cta: {
      primary: {
        label: "Napisz",
        href: "#kontakt",
      },
      secondary: {
        label: "Zobacz działające przykłady",
        href: "#produkty",
      },
    },
  },
  offer: {
    pillars: [
      {
        title: "Dokumenty i dane",
        description:
          "Porządkuję informacje rozproszone między mailami, arkuszami i systemami.",
        bullets: [
          "odczyt i walidacja dokumentów",
          "jedno miejsce dla statusów i decyzji",
          "dane gotowe do dalszej pracy",
        ],
      },
      {
        title: "Ręczna praca i wyjątki",
        description:
          "Skracam czynności, które zespół codziennie przepisuje, sprawdza i poprawia.",
        bullets: [
          "workflow dla powtarzalnych zadań",
          "obsługa wyjątków zamiast ukrywania ich w skrzynce",
          "alerty, gdy status wymaga reakcji",
        ],
      },
      {
        title: "Narzędzie dopasowane do procesu",
        description:
          "Jeśli gotowy system nie wystarcza, dokładam lekką aplikację, integrację lub AI.",
        bullets: [
          "własny widok dla pracy operacyjnej",
          "integracje bez wymiany całego środowiska",
          "AI z kontrolą jakości danych",
        ],
      },
    ] satisfies OfferPillar[],
  },
  products: {
    public: [
      {
        name: "Cavi",
        category: "public",
        summary:
          "Aplikacja webowa z własnym workflow i funkcjami AI.",
        stack: ["aplikacja webowa", "AI"],
        impact:
          "Przykład narzędzia, które prowadzi użytkownika przez konkretny proces.",
        url: "https://cavi.gotova.pl/",
        screenshot: {
          src: "/images/products/cavi-live.jpg",
          alt: "Strona startowa Cavi: kreator CV, skaner CV pod ATS i analizator profilu LinkedIn.",
        },
      },
      {
        name: "Akta",
        category: "public",
        summary:
          "System do pracy z dokumentami i uporządkowanymi danymi.",
        stack: ["dokumenty", "wyszukiwanie"],
        impact:
          "Przykład pracy z wyszukiwaniem i strukturą danych.",
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
        summary:
          "Prywatne wdrożenie do odczytu dokumentów i kontroli jakości danych.",
        stack: ["OCR", "walidacja"],
        impact:
          "Anonimowy przykład automatyzacji pracy z dokumentami.",
        screenshot: {
          src: "/images/private/ocr-operations.svg",
          alt: "Widok prywatnego wdrożenia OCR do przetwarzania dokumentów i kontroli pipeline'u.",
        },
      },
      {
        name: "Workflow tłumaczenia i normalizacji akt",
        category: "private",
        summary:
          "Prywatne wdrożenie do czyszczenia OCR i porządkowania danych.",
        stack: ["normalizacja", "dokumenty"],
        impact:
          "Anonimowy przykład przygotowania danych do dalszej pracy.",
        screenshot: {
          src: "/images/private/akta-translate.svg",
          alt: "Widok prywatnego wdrożenia do tłumaczenia i strukturyzacji treści dokumentów archiwalnych.",
        },
      },
    ] satisfies ProductCard[],
  },
  approach: {
    eyebrow: "Podejście techniczne",
    headline: "Proste w utrzymaniu",
    points: [
      {
        title: "Nowoczesny stack, niskie koszty",
        description:
          "Dobieram React, Next.js, Python i PostgreSQL do zakresu procesu, żeby rozwiązanie było łatwe w utrzymaniu.",
      },
      {
        title: "Od automatyzacji do własnej aplikacji",
        description:
          "Zaczynam od gotowych integracji. Gdy proces potrzebuje własnego widoku albo logiki, dokładam lekką aplikację webową.",
      },
      {
        title: "Bezpieczeństwo od pierwszego dnia",
        description:
          "Walidacja danych, kontrola dostępu i nagłówki bezpieczeństwa są częścią wdrożenia.",
      },
      {
        title: "Monitoring i kontrola jakości",
        description:
          "Śledzenie błędów i alerty pokazują, co działa i co wymaga uwagi.",
      },
      {
        title: "Łatwe do rozbudowy",
        description:
          "Czytelny kod, testy i dokumentacja ułatwiają dalszą rozbudowę.",
      },
    ] satisfies ApproachPoint[],
  },
  about: {
    title: "O mnie",
    headline: "Tomasz Gołaszewski. Porządkuję procesy i buduję narzędzia.",
    role: "Tomasz Gołaszewski — niezależnie pomagam firmom uporządkować pracę operacyjną.",
    profileLink: {
      label: "Zobacz profil na LinkedIn",
      href: "https://www.linkedin.com/in/tomasz-golaszewski/",
    },
    summary:
      "Znam pracę z dokumentami, aktywami i danymi, dlatego zaczynam od procesu, nie od technologii.",
    points: [
      {
        label: "Procesy",
        value:
          "leasing, asset management, wycena i cyfryzacja pracy operacyjnej.",
      },
      {
        label: "Dane",
        value:
          "dokumenty, statusy i informacje, które muszą być dostępne i sprawdzalne.",
      },
      {
        label: "Narzędzia",
        value:
          "aplikacje webowe, integracje i AI dobrane do konkretnego zadania.",
      },
    ],
  },
  contact: {
    intro:
      "Opisz jeden proces, który dziś zabiera zespołowi za dużo ręcznej pracy. Odpowiem, czy wystarczy gotowe narzędzie, integracja, automatyzacja albo lekka aplikacja.",
    signals: [
      {
        label: "E-mail",
        value: "kontakt@gotovalues.com",
        href: "mailto:kontakt@gotovalues.com",
      },
      {
        label: "Czas odpowiedzi",
        value: "Odpowiadam w 24h w dni robocze.",
      },
      {
        label: "Tryb współpracy",
        value: "Pracuję zdalnie i bezpośrednio z firmami z Warszawy, Mazowsza i całej Polski.",
      },
    ],
  },
  aiSummary: {
    title: "gotovalues — aplikacje webowe i automatyzacja procesów",
    positioning:
      "gotovalues buduje aplikacje webowe, automatyzuje procesy i dobiera AI tam, gdzie skraca pracę.",
    sitemap: "https://gotovalues.com/sitemap.xml",
    bestFor: [
      "firmy, które tracą czas na dokumenty, statusy, wyjątki i ręczne przepisywanie danych",
      "zespoły potrzebujące prostego narzędzia webowego zamiast dużego systemu enterprise",
      "procesy, w których AI lub OCR skraca pracę i wymaga kontroli jakości",
    ],
    notFor: [
      "projekty wymagające dużego zespołu wdrożeniowego",
      "AI bez jasno opisanego procesu",
    ],
    proof: ["Cavi", "Akta", "prywatne workflow OCR i normalizacji dokumentów"],
  },
  proofOfCompetence: {
    eyebrow: "Proof of competence",
    headline: "Przykłady działających narzędzi.",
    items: [
      {
        name: "Cavi",
        url: "https://cavi.gotova.pl/",
        summary: "Aplikacja webowa z własnym workflow i funkcjami AI.",
        evidence: [
          "workflow użytkownika",
          "dane i decyzje w jednym procesie",
        ],
      },
      {
        name: "Akta",
        url: "https://akta.gotova.pl",
        summary: "System do pracy z dokumentami i uporządkowanymi danymi.",
        evidence: [
          "wyszukiwanie w dokumentach",
          "dane gotowe do dalszej pracy",
        ],
      },
    ],
  },
  comparisonLanding: {
    eyebrow: "Jak pracuję",
    headline: "Proces, gotowiec albo dedykowane narzędzie — wybór zależy od problemu, nie etykiety dostawcy",
    intro:
      "Nie chcę stawiać gotovalues w kontrze do freelancerów, automatyzatorów ani software house'ów — sam pracuję bezpośrednio i projektowo. Różnica, którą chcę pokazać, dotyczy sposobu pracy: zaczynam od zrozumienia procesu, potem wybieram najprostsze rozwiązanie — gotowe narzędzie, integrację, automatyzację albo dedykowaną aplikację.",
    audiences: [
      {
        slug: "proces-przed-kodem",
        title: "Najpierw proces, dopiero potem kod",
        pain: "Jeśli specyfikacja opisuje obejście zamiast problemu, samo wykonanie kodu może tylko utrwalić ręczną pracę w nowej formie.",
        gotovaluesAdvantage: [
          "najpierw sprawdzam, czy w ogóle trzeba budować dedykowaną aplikację",
          "łączę analizę biznesową, UX, kod, automatyzację i utrzymanie",
          "projektuję mały zakres, który da się wdrożyć i zmierzyć w realnej pracy",
        ],
      },
      {
        slug: "automatyzacja-i-aplikacja",
        title: "Automatyzacja, gdy wystarczy. Aplikacja, gdy jest potrzebna.",
        pain: "Make, Zapier i n8n są świetne do wielu przepływów. Problem zaczyna się wtedy, gdy zespół potrzebuje własnego widoku pracy, obsługi wyjątków albo kontroli kosztów AI.",
        gotovaluesAdvantage: [
          "buduję własny UI tam, gdzie zespół potrzebuje jednego miejsca pracy",
          "dopinam brakujące integracje kodem, gdy gotowy moduł nie istnieje",
          "kontroluję koszty AI i hosting, zamiast mnożyć opłaty per operacja",
        ],
      },
    ],
    cta: {
      label: "Opisz proces do uporządkowania",
      href: "#kontakt",
    },
  },
  productionLanding: {
    metadataDescription:
      "Lekkie narzędzia gotovalues dla firm produkcyjnych i przetwórczych: dokumenty jakościowe, reklamacje, statusy partii i wyjątki operacyjne bez wymiany ERP.",
    eyebrow: "Dla produkcji i przetwórstwa",
    headline:
      "Porządkuję dokumenty, jakość i wyjątki operacyjne — bez wymiany ERP.",
    intro:
      "Gdy protokoły jakościowe, reklamacje, statusy partii i decyzje krążą między Excelem, mailem i PDF-ami, dokładam lekkie narzędzie dokładnie w ten fragment procesu.",
    cta: {
      label: "Opisz proces w zakładzie",
      href: "#kontakt",
    },
    panel: {
      label: "Typowe obszary problemu",
      items: [
        "dokumenty jakościowe, reklamacje i protokoły",
        "statusy partii, decyzji i wyjątków operacyjnych",
        "ręczne przepisywanie danych między plikami i systemami",
      ],
      chips: ["jakość", "reklamacje", "partie", "wyjątki"],
    },
    sections: {
      symptoms: {
        eyebrow: "Objawy",
        heading: "Praca wraca do maila, Excela i ręcznych obejść",
      },
      solutions: {
        eyebrow: "Co porządkuję",
        heading: "Lekkie narzędzia wokół procesu — bez wymiany ERP",
      },
      proof: {
        eyebrow: "Dowód pracy",
        intro:
          "Dwa publiczne produkty (Cavi, Akta) z linkami oraz dwa anonimowe wdrożenia prywatne OCR i normalizacji dokumentów — bez nazw klientów i bez linków.",
      },
      firstStep: {
        eyebrow: "Pierwszy krok",
        heading: "Mały zakres na start, nie wielki projekt",
      },
      contact: {
        eyebrow: "Kontakt",
        heading: "Opisz jeden proces w kilku zdaniach",
        intro:
          "Wrócę z konkretną oceną, czy wystarczy gotowe narzędzie, integracja albo lekka aplikacja pod dokumenty, jakość lub wyjątki operacyjne.",
        points: [
          "wystarczy jeden konkretny przykład z zakładu albo back office",
          "nie potrzebujesz gotowej specyfikacji ani listy funkcji",
          "jeśli problem nie wymaga customowego narzędzia, powiem to wprost",
        ],
      },
    },
    symptoms: [
      {
        title: "Dokumenty są, ale trudno na nich pracować",
        description:
          "Specyfikacje, protokoły, reklamacje i załączniki leżą w mailach i na dyskach, więc znalezienie aktualnej wersji zajmuje za dużo czasu.",
      },
      {
        title: "Status trzeba ręcznie dopytywać",
        description:
          "Zespół wie, na jakim etapie jest partia, reklamacja albo dokument dopiero po telefonie, mailu lub sprawdzeniu kilku arkuszy.",
      },
      {
        title: "Wyjątki zjadają czas ludziom operacyjnym",
        description:
          "Przy niestandardowych przypadkach proces wraca do ręcznego pilnowania, przepisywania i doraźnego sprawdzania.",
      },
    ],
    solutions: [
      {
        title: "Narzędzia wokół dokumentów i jakości",
        description:
          "Lekkie aplikacje do pracy z dokumentami, reklamacjami, partiami i decyzjami — bez dokładania kolejnego arkusza i bez wymiany ERP.",
      },
      {
        title: "Workflow pod realne wyjątki",
        description:
          "Obsługa tego, co naprawdę blokuje pracę: braków danych, niezgodności jakościowych, nieregularnych załączników i ręcznych obejść.",
      },
      {
        title: "Praktyczne AI tam, gdzie skraca pracę",
        description:
          "OCR, ekstrakcja, klasyfikacja i wyszukiwanie jako część procesu z kontrolą jakości danych — nie osobny eksperyment.",
      },
    ],
    proofHeading: "Przykłady narzędzi i wdrożeń",
    processSteps: [
      {
        title: "1. Jeden konkretny proces",
        description:
          "Zaczynamy od jednego wąskiego gardła: dokumentów jakościowych, reklamacji, statusów partii albo obiegu decyzji.",
      },
      {
        title: "2. Mała pierwsza wersja",
        description:
          "Proponuję krótki, mierzalny zakres do sprawdzenia na realnej pracy zespołu zamiast wielkiego projektu od startu.",
      },
      {
        title: "3. Wdrożenie pod codzienną pracę",
        description:
          "Narzędzie ma odciążać zakład i back office w codziennych operacjach i łatwo dawać się utrzymać.",
      },
    ],
    closing:
      "Nie zaczynam od dużego wdrożenia. Zaczynam od jednego procesu, który dziś zabiera zespołowi za dużo ręcznej pracy.",
  },
  logisticsLanding: {
    eyebrow: "Dla logistyki i spedycji",
    headline:
      "Porządkuję statusy zleceń, dokumenty przewozowe i wymianę danych tam, gdzie TMS i ERP nie domykają realnej pracy spedycji.",
    intro:
      "Jeśli statusy przesyłek, awizacje, dokumenty przewozowe i rozliczenia z przewoźnikami żyją między Excelem, mailem i portalami kurierskimi, projektuję lekkie narzędzie, które porządkuje ten fragment procesu i łączy istniejące systemy — bez wymiany środowiska.",
    cta: {
      label: "Opisz proces w spedycji",
      href: "#kontakt",
    },
    symptoms: [
      {
        title: "Statusy przesyłek trzeba sprawdzać ręcznie",
        description:
          "Gdzie jest zlecenie, czy doszło, czy jest opóźnione — odpowiedź wymaga zaglądania do kilku portali kurierskich i dopytywania kierowców albo magazynu.",
      },
      {
        title: "Dane przepisywane między systemami",
        description:
          "Zlecenia, awizacje i dane do faktur wędrują ręcznie między ERP, arkuszem, mailem i portalami przewoźników — każdy przeskok to czas i ryzyko błędu.",
      },
      {
        title: "Dokumenty przewozowe rozsiane i trudne do odnalezienia",
        description:
          "Listy przewozowe, potwierdzenia dostawy (POD), zlecenia i reklamacje leżą w mailach i na dyskach, więc skompletowanie historii zlecenia zajmuje za długo.",
      },
    ],
    solutions: [
      {
        title: "Jeden widok statusów zleceń i przesyłek",
        description:
          "Buduję panel, który zbiera statusy z różnych źródeł w jedno miejsce — bez ręcznego sprawdzania portali i telefonów do kierowców.",
      },
      {
        title: "Integracja przewoźników, ERP i magazynu",
        description:
          "Spinam systemy i portale kurierskie, żeby dane wpisywać raz i żeby same przepływały między spedycją, magazynem i fakturowaniem.",
      },
      {
        title: "AI do dokumentów przewozowych",
        description:
          "OCR i ekstrakcja danych z listów przewozowych, POD-ów i faktur od przewoźników wdrażam tam, gdzie realnie skracają ręczną pracę i kontrolę rozliczeń.",
      },
    ],
    proofHeading:
      "Przykłady pokazują kierunek: statusy, dokumenty i dane spedycyjne da się uporządkować lekkim narzędziem zamiast kolejnym arkuszem i przeklejaniem.",
    processSteps: [
      {
        title: "Rozpoznanie jednego procesu",
        description:
          "Zaczynamy od konkretnego obszaru: statusy przesyłek, awizacje, dokumenty przewozowe albo rozliczenia z przewoźnikami.",
      },
      {
        title: "Pierwsza wersja z jasnym zakresem",
        description:
          "Proponuję pierwszy sensowny zakres, który da się sprawdzić na żywej pracy zespołu, zamiast planować duży projekt od razu.",
      },
      {
        title: "Wdrożenie pod codzienną operację",
        description:
          "Narzędzie ma odciążać spedytorów i back office, a nie być kolejnym miejscem do ręcznego uzupełniania.",
      },
    ],
    closing:
      "Jeśli w Twojej spedycji statusy i dokumenty dalej spina się ręcznie między portalami, Excelem i mailem, zacznijmy od jednego konkretnego procesu.",
  },
} as const;
