export const brandName = "gotovalues";

export type OfferPillar = {
  title: string;
  description: string;
  bullets: string[];
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
    eyebrow:
      "Dedykowane aplikacje i narzędzia AI dla firm, w których procesy wyrosły z Excela i maila.",
    headline:
      "Buduję narzędzia, które porządkują procesy tam, gdzie Excel, mail i gotowe systemy przestają wystarczać.",
    intro:
      "Pomagam firmom produkcyjnym i operacyjnym uporządkować dokumenty, statusy i ręczną pracę. Projektuję lekkie aplikacje webowe i praktyczne wdrożenia AI pod konkretny proces, bez wymiany całego istniejącego środowiska pracy.",
    cta: {
      primary: {
        label: "Opisz proces do uporządkowania",
        href: "#kontakt",
      },
      secondary: {
        label: "Zobacz działające przykłady",
        href: "/produkty",
      },
    },
  },
  offer: {
    pillars: [
      {
        title: "Analityka i automatyzacja",
        description:
          "Porządkuję dane, statusy i obieg informacji tam, gdzie zespół traci czas na ręczne przepisywanie, szukanie dokumentów i sprawdzanie wyjątków.",
        bullets: [
          "dashboardy i raporty dla bieżącej pracy operacyjnej",
          "automatyzacja pracy na dokumentach, plikach i danych",
          "integracje między narzędziami bez dokładania kolejnej ręcznej pracy",
        ],
      },
      {
        title: "Aplikacje webowe i AI",
        description:
          "Buduję dedykowane aplikacje i narzędzia AI, które rozwiązują jeden konkretny problem operacyjny zamiast dokładania kolejnego arkusza, maila albo obejścia.",
        bullets: [
          "lekkie aplikacje webowe dla procesów wewnętrznych i pracy zespołu",
          "narzędzia AI do ekstrakcji, klasyfikacji i wyszukiwania danych",
          "systemy dokumentowe, OCR i workflow pod realne wyjątki procesu",
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
          "Publiczny przykład produktu z własnym workflow, logiką aplikacyjną i funkcjami AI osadzonymi w realnym procesie użytkownika.",
        stack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "AI workflows"],
        impact:
          "Pokazuje umiejętność budowy lekkiego narzędzia webowego, które łączy interfejs, dane i automatyzację w jednej aplikacji.",
        url: "https://cavi.gotova.pl/",
        screenshot: {
          src: "/images/products/cavi-dashboard.svg",
          alt: "Panel aplikacji Cavi do zarządzania CV i ofertami pracy.",
        },
      },
      {
        name: "Akta",
        category: "public",
        summary:
          "Publiczny system do pracy z dokumentami i danymi archiwalnymi, pokazujący sposób budowy narzędzi wokół wyszukiwania, eksploracji i struktury danych.",
        stack: ["Next.js", "TypeScript", "FastAPI", "Python", "PostgreSQL"],
        impact:
          "Pokazuje umiejętność budowy pełnego rozwiązania: frontend, API i model danych pod dokumenty, wyszukiwanie i operacyjną pracę na zasobach.",
        url: "https://akta.gotova.pl",
        screenshot: {
          src: "/images/products/akta-portal.svg",
          alt: "Widok portalu Akta do pracy z archiwami i danymi genealogicznymi.",
        },
      },
    ] satisfies ProductCard[],
    private: [
      {
        name: "OCR dla dokumentów operacyjnych",
        category: "private",
        summary:
          "Prywatne wdrożenie do odczytu danych z dokumentów i kontroli jakości procesu OCR w pracy operacyjnej zespołu.",
        stack: ["FastAPI", "Python", "Playwright", "OpenCV", "Tesseract", "LLM"],
        impact:
          "Pokazuje doświadczenie w budowie własnych narzędzi do dokumentów, walidacji danych i obsługi wyjątków bez ręcznego przepisywania.",
        screenshot: {
          src: "/images/private/ocr-operations.svg",
          alt: "Widok prywatnego wdrożenia OCR do przetwarzania dokumentów i kontroli pipeline'u.",
        },
      },
      {
        name: "Workflow tłumaczenia i normalizacji akt",
        category: "private",
        summary:
          "Prywatne wdrożenie do czyszczenia OCR, tłumaczenia treści i porządkowania danych z dokumentów o nieregularnej strukturze.",
        stack: ["Python", "Flask", "PostgreSQL", "Translation pipeline", "LLM"],
        impact:
          "Pokazuje budowę narzędzia, które zamienia nieuporządkowane źródła w dane gotowe do dalszej pracy, wyszukiwania i decyzji operacyjnych.",
        screenshot: {
          src: "/images/private/akta-translate.svg",
          alt: "Widok prywatnego wdrożenia do tłumaczenia i strukturyzacji treści dokumentów archiwalnych.",
        },
      },
    ] satisfies ProductCard[],
  },
  about: {
    title: "O mnie",
    body: "Łączę myślenie operacyjne, produktowe i techniczne. Pomagam firmom nazwać problem, zawęzić pierwszy sensowny zakres i wdrożyć narzędzie, które naprawdę odciąża ludzi w codziennej pracy.",
    partnerNote:
      "Nie działam jak duża agencja, która zaczyna od długiego procesu i listy modnych technologii. Pracuję bezpośrednio z klientem, upraszczam problem i proponuję tylko taki zakres, który ma sens dla codziennej pracy zespołu.",
  },
  contact: {
    intro:
      "Nie musisz mieć gotowej specyfikacji. Wystarczy krótki opis jednego procesu, wąskiego problemu albo miejsca, w którym dziś zespół robi za dużo ręcznie.",
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
} as const;

export type SiteContent = typeof siteContent;
