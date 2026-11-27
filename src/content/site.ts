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
    angle: "Sieci, komputery, helpdesk zdalny i na miejscu dla małych firm oraz JDG.",
    eyebrow: "Wsparcie IT dla małych firm i JDG.",
    headline: "Sprawne IT dla małej firmy i JDG.",
    intro:
      "Sieci i Wi-Fi, naprawa i konfiguracja komputerów, zdalny i lokalny helpdesk, poczta oraz kopie zapasowe — a dodatkowo proste narzędzia i automatyzacja.",
    cta: {
      primary: {
        label: "Napisz",
        href: "#kontakt",
      },
      secondary: {
        label: "Zobacz zakres usług",
        href: "#oferta",
      },
    },
  },
  offer: {
    pillars: [
      {
        title: "Sieci, Wi-Fi i sprzęt biurowy",
        description:
          "Konfiguruję i porządkuję sieć w biurze, domu-biurze lub warsztacie — tak, żeby internet, drukarki i urządzenia po prostu działały.",
        bullets: [
          "routery, stabilne Wi-Fi, okablowanie i bezpieczny dostęp zdalny (VPN)",
          "drukarki sieciowe, skanery i współdzielone pliki firmowe (NAS)",
          "rozdzielenie sieci firmowej od sieci dla gości",
        ],
      },
      {
        title: "Naprawa i konfiguracja komputerów",
        description:
          "Pomagam, gdy komputer zwolnił, nie startuje albo trzeba szybko przygotować nowe stanowisko do pracy bez tracenia całego dnia.",
        bullets: [
          "diagnostyka, serwis, naprawa i przyspieszanie komputerów oraz laptopów",
          "instalacja systemu, przeniesienie danych i konfiguracja programów",
          "doradztwo przy zakupie sprzętu dopasowanego do budżetu firmy",
        ],
      },
      {
        title: "Zdalny i lokalny helpdesk IT",
        description:
          "Stała lub doraźna pomoc dla małych firm i JDG — większość spraw rozwiązuję zdalnie od ręki, a gdy trzeba, przyjeżdżam na miejsce.",
        bullets: [
          "szybka pomoc zdalna przy codziennych awariach, błędach i aktualizacjach",
          "poczta we własnej domenie, Microsoft 365 i Google Workspace",
          "automatyczne kopie zapasowe (backup) i podstawowe bezpieczeństwo danych",
        ],
      },
      {
        title: "Automatyzacja i proste narzędzia",
        description:
          "Gdy poza sprawnym IT chcesz ograniczyć ręczne przepisywanie danych, dokładam prostą stronę, integrację albo lekkie narzędzie.",
        bullets: [
          "proste strony wizytówki i formularze kontaktowe dla małej firmy",
          "łączenie poczty, arkuszy i programów, z których już korzystasz",
          "praktyczne usprawnienia i AI tam, gdzie realnie oszczędzają czas",
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
    eyebrow: "Jak pracuję",
    headline: "Prosto, rzetelnie i bez infolinii",
    points: [
      {
        title: "Jeden kontakt zamiast infolinii",
        description:
          "Rozmawiasz bezpośrednio ze mną — bez przekierowań i tłumaczenia problemu za każdym razem od nowa.",
      },
      {
        title: "Zdalnie od ręki, lokalnie na miejscu",
        description:
          "Większość spraw z komputerem, pocztą czy programami rozwiązuję zdalnie. Przy sieci i sprzęcie przyjeżdżam na miejsce.",
      },
      {
        title: "Kopie zapasowe i bezpieczeństwo",
        description:
          "Pilnuję aktualizacji, bezpiecznego Wi-Fi i automatycznego backupu, żeby awaria dysku nie zatrzymała firmy.",
      },
      {
        title: "Prosty język i jasna wycena",
        description:
          "Tłumaczę po ludzku, co się stało i jakie są opcje. Zawsze wiesz z góry, ile kosztuje usługa.",
      },
      {
        title: "Od sprawnej sieci po proste narzędzia",
        description:
          "Kiedy sprzęt i sieć już działają, mogę też zrobić prostą stronę, spiąć programy albo zautomatyzować powtarzalną pracę.",
      },
    ] satisfies ApproachPoint[],
  },
  about: {
    title: "O mnie",
    headline: "Tomasz Gołaszewski. Twój lokalny i zdalny partner IT.",
    role: "Tomasz Gołaszewski — kompleksowe wsparcie IT dla małych firm i JDG.",
    profileLink: {
      label: "Zobacz profil na LinkedIn",
      href: "https://www.linkedin.com/in/tomasz-golaszewski/",
    },
    summary:
      "Łączę codzienne wsparcie IT — sieci, naprawy komputerów i pomoc zdalną — z praktycznym doświadczeniem w porządkowaniu danych i prostych narzędzi.",
    points: [
      {
        label: "Sprzęt i sieci",
        value:
          "routery, Wi-Fi, drukarki, serwis, naprawa i przygotowanie komputerów do pracy.",
      },
      {
        label: "Helpdesk i opieka",
        value:
          "szybka pomoc zdalna i na miejscu, poczta firmowa, backup i bezpieczeństwo danych.",
      },
      {
        label: "Narzędzia",
        value:
          "proste strony, integracje i automatyzacje jako uzupełnienie codziennego wsparcia IT.",
      },
    ],
  },
  contact: {
    intro:
      "Napisz krótko, z czym masz problem — rwie się sieć, komputer wymaga serwisu, trzeba skonfigurować pocztę lub backup albo szukasz stałego wsparcia IT dla swojej firmy.",
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
        label: "Obszar działania",
        value: "Lokalnie na miejscu oraz zdalnie w całej Polsce.",
      },
    ],
  },
  aiSummary: {
    title: "gotovalues — wsparcie IT dla małych firm i JDG",
    positioning:
      "gotovalues świadczy usługi IT dla małych firm i JDG: sieci i Wi-Fi, naprawa komputerów, helpdesk zdalny i na miejscu, backup oraz dodatkowo proste narzędzia i automatyzacja AI.",
    sitemap: "https://gotovalues.com/sitemap.xml",
    bestFor: [
      "małe firmy i jednoosobowe działalności (JDG) potrzebujące rzetelnego wsparcia IT bez zatrudniania informatyka na etat",
      "biura i lokalne firmy z problemami z siecią Wi-Fi, komputerami, drukarkami, pocztą firmową lub kopiami zapasowymi",
      "firmy szukające zdalnego helpdesku oraz opcjonalnie prostych stron, integracji lub automatyzacji",
    ],
    notFor: [
      "duże korporacje wymagające całodobowego zespołu serwisowego 24/7 w wielu lokalizacjach",
      "rozległe wdrożenia systemów ERP dla setek użytkowników",
    ],
    proof: ["sieci i Wi-Fi", "naprawa i konfiguracja komputerów", "zdalny i lokalny helpdesk IT"],
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
