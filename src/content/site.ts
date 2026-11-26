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
          alt: "Strona startowa Akta (Archiwa Gotova): wyszukiwarka cyfrowych archiwów genealogicznych.",
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
    headline: "Nowoczesne, bezpieczne i tanie w utrzymaniu",
    points: [
      {
        title: "Nowoczesny stack, niskie koszty",
        description:
          "Używam sprawdzonych technologii (React, Next.js, Python, PostgreSQL) i bezpłatnych warstw monitoringu, hostingu i AI — tak aby rozwiązanie było tanie w utrzymaniu bez kompromisu na jakości.",
      },
      {
        title: "Od automatyzacji do własnej aplikacji",
        description:
          "Automatyzacje w Make i Zapier to początek, nie koniec. Gdy proces wymaga własnego interfejsu, logiki AI i skalowania — buduję to jako lekką aplikację webową, a nie kolejną warstwę automatyzacji.",
      },
      {
        title: "Bezpieczeństwo od pierwszego dnia",
        description:
          "Szyfrowanie, walidacja danych, kontrola dostępu i nagłówki bezpieczeństwa nie są dodatkiem — to standard każdego wdrożenia.",
      },
      {
        title: "Monitoring i kontrola jakości",
        description:
          "Każde rozwiązanie ma wbudowane śledzenie błędów, metryki użytkowania i alerty — wiesz co działa, co wymaga uwagi i ile kosztuje.",
      },
      {
        title: "Łatwe do rozbudowy",
        description:
          "Czytelny kod, testy i dokumentacja pozwalają rozbudowywać rozwiązanie bez przepisywania od zera — nawet jeśli nie ja będę je rozwijać dalej.",
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
    title: "gotovalues — AI, automatyzacja i lekkie aplikacje webowe dla MŚP",
    positioning:
      "gotovalues buduje lekkie aplikacje webowe, automatyzacje procesów i praktyczne wdrożenia AI dla małych i średnich firm. Najpierw sprawdzam gotowe narzędzia i integracje, a dedykowaną aplikację tworzę dopiero wtedy, gdy realny proces tego wymaga.",
    sitemap: "https://gotovalues.com/sitemap.xml",
    bestFor: [
      "firmy, które tracą czas na dokumenty, statusy, wyjątki i ręczne przepisywanie danych",
      "zespoły potrzebujące prostego narzędzia webowego zamiast dużego systemu enterprise",
      "procesy, w których AI/OCR/LLM skraca pracę operacyjną, ale musi mieć kontrolę jakości i niski koszt utrzymania",
    ],
    notFor: [
      "projekty wymagające dużego software house'u lub rozbudowanego zespołu body-leasing",
      "wdrożenia AI bez jasnego procesu biznesowego i bez mierzalnego efektu operacyjnego",
    ],
    proof: ["Cavi", "Akta", "prywatne workflow OCR i normalizacji dokumentów"],
  },
  proofOfCompetence: {
    eyebrow: "Proof of competence",
    headline: "Dwa publiczne przykłady pracy.",
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
    eyebrow: "Dla produkcji i przetwórstwa",
    headline:
      "Porządkuję dokumenty, jakość i wyjątki operacyjne tam, gdzie gotowy system nie domyka realnej pracy zakładu.",
    intro:
      "Jeśli dokumenty jakościowe, reklamacje, statusy partii i decyzje operacyjne żyją między Excelem, mailem i PDF-ami, projektuję lekkie narzędzie, które porządkuje ten konkretny fragment procesu bez wymiany całego środowiska.",
    cta: {
      label: "Opisz proces w zakładzie",
      href: "#kontakt",
    },
    symptoms: [
      {
        title: "Dokumenty są, ale trudno na nich pracować",
        description:
          "Specyfikacje, protokoły, reklamacje i załączniki są rozproszone, więc znalezienie właściwej wersji albo historii sprawy zajmuje za dużo czasu.",
      },
      {
        title: "Status procesu trzeba ręcznie dopytywać",
        description:
          "Zespół wie, co dzieje się z partią, reklamacją albo dokumentem dopiero po telefonie, mailu albo sprawdzeniu kilku miejsc naraz.",
      },
      {
        title: "Wyjątki zjadają czas ludziom operacyjnym",
        description:
          "Proces niby działa, ale przy niestandardowych przypadkach wszystko wraca do ręcznego pilnowania, przepisywania i weryfikacji.",
      },
    ],
    solutions: [
      {
        title: "Narzędzia wokół dokumentów i jakości",
        description:
          "Buduję lekkie systemy do pracy na dokumentach, statusach, reklamacjach, partiach i ścieżkach decyzji bez dokładania kolejnego arkusza.",
      },
      {
        title: "Workflow pod realne wyjątki procesu",
        description:
          "Projektuję rozwiązania pod to, co dzieje się naprawdę na zakładzie: braki danych, wyjątki jakościowe, nieregularne dokumenty i ręczne obejścia.",
      },
      {
        title: "Praktyczne funkcje AI jako element narzędzia",
        description:
          "OCR, ekstrakcja, klasyfikacja i wyszukiwanie wdrażam tam, gdzie rzeczywiście skracają pracę ludzi, a nie jako osobny projekt bez zastosowania.",
      },
    ],
    proofHeading:
      "Przykłady pokazują kierunek: dokumenty, dane i workflow da się uporządkować lekkim narzędziem zamiast kolejnym obejściem.",
    processSteps: [
      {
        title: "Rozpoznanie jednego procesu",
        description:
          "Zaczynamy od konkretnego obszaru: dokumenty jakościowe, reklamacje, statusy, partie albo obieg decyzji.",
      },
      {
        title: "Pierwsza wersja z jasnym zakresem",
        description:
          "Proponuję pierwszy sensowny zakres, który można sprawdzić na żywej pracy zespołu zamiast planować duży projekt od razu.",
      },
      {
        title: "Wdrożenie pod codzienną operację",
        description:
          "Narzędzie ma odciążać ludzi na zakładzie i w back office, a nie być tylko ładną warstwą nad problemem.",
      },
    ],
    closing:
      "Jeśli w Twoim zakładzie część pracy dalej spina się ręcznie między dokumentami, Excelem i mailem, zacznijmy od jednego konkretnego procesu.",
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
