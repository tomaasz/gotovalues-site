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
    angle:
      "Boutique AI & Web App Partner — demokratyzuję technologię, którą wielkie agencje wdrażają tylko dla korporacji.",
    eyebrow:
      "Nowoczesne aplikacje webowe i rozwiązania AI — bezpieczne, tanie w utrzymaniu i dopasowane do realnych procesów firmy.",
    headline:
      "Buduję narzędzia wokół Twoich danych i procesów. Z AI lub bez — zawsze bez korporacyjnych cenników.",
    intro:
      "Nie jestem zwykłym koderem do wynajęcia. Pomagam firmom uporządkować dokumenty, statusy i ręczną pracę. Najpierw sprawdzam, czy problem rozwiąże gotowe narzędzie lub integracja. Dedykowaną aplikację buduję tylko wtedy, gdy to jedyna sensowna droga — bez wymiany całego istniejącego środowiska pracy.",
    cta: {
      primary: {
        label: "Opisz proces do uporządkowania",
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
        title: "Analityka i automatyzacja",
        description:
          "Porządkuję dane, statusy i obieg informacji tam, gdzie zespół traci czas na ręczne przepisywanie i sprawdzanie wyjątków.",
        bullets: [
          "dashboardy i raporty dla bieżącej pracy operacyjnej",
          "automatyzacja pracy na dokumentach i danych",
          "integracje między narzędziami bez dokładania ręcznej pracy",
        ],
      },
      {
        title: "Aplikacje webowe i AI",
        description:
          "Buduję dedykowane aplikacje i narzędzia AI pod konkretne problemy operacyjne — od odczytu dokumentów po wieloetapowe pipeline'y przetwarzania danych.",
        bullets: [
          "lekkie aplikacje webowe z wyszukiwaniem i nawigacją po danych",
          "pipeline'y AI: klasyfikacja, ekstrakcja, normalizacja, walidacja",
          "OCR i systemy dokumentowe z monitoringiem i kontrolą kosztów",
        ],
      },
      {
        title: "Gotowe produkty i platformy",
        description:
          "Buduję kompletne aplikacje gotowe do oddania użytkownikom — od logowania i ról po płatności i eksport danych.",
        bullets: [
          "aplikacje webowe z autoryzacją, rolami i panelem administracyjnym",
          "płatności, generowanie PDF/DOCX i eksport danych",
          "rozszerzenia przeglądarki i automatyzacja pracy użytkownika",
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
    headline:
      "Łączę doświadczenie operacyjne, analityczne i techniczne, dlatego rozumiem nie tylko narzędzie, ale też proces, który ma działać po wdrożeniu.",
    role: "Tomasz Gołaszewski, niezależny partner do porządkowania procesów operacyjnych i budowy dedykowanych narzędzi.",
    profileLink: {
      label: "Zobacz profil na LinkedIn",
      href: "https://www.linkedin.com/in/tomasz-golaszewski/",
    },
    summary:
      "Przez lata pracowałem przy remarketingu, wycenie środków technicznych, zarządzaniu aktywami i cyfryzacji procesów w firmach leasingowych oraz środowiskach, w których dane, dokumenty i decyzje operacyjne muszą się spinać w codziennej pracy.",
    detail:
      "Budowałem zespoły, standardy analityczne i wewnętrzne narzędzia IT. Projektowałem raportowanie, automatyzację, workflow i rozwiązania wspierające sprzedaż, wyceny, jakość danych oraz pracę operacyjną. Nie działam jak duża agencja: pracuję bezpośrednio z klientem i proponuję tylko taki zakres, który ma sens biznesowo.",
    points: [
      {
        label: "Doświadczenie",
        value:
          "wieloletnia praca w leasingu, asset management, wycenie maszyn i cyfryzacji procesów.",
      },
      {
        label: "Zakres",
        value:
          "od analizy problemu, przez dobór gotowego narzędzia lub integracji, po wdrożenie raportowania, automatyzacji i dedykowanego rozwiązania.",
      },
      {
        label: "Styl współpracy",
        value:
          "bezpośrednia praca z klientem, wąski i sensowny zakres, bez agencyjnego narzutu i zbędnej złożoności.",
      },
      {
        label: "Technologie",
        value:
          "React, Next.js, Python, FastAPI, Flask, PostgreSQL, wielomodelowe AI (Gemini, Claude, GPT), Cloudflare, Vercel, monitoring produkcyjny.",
      },
    ],
  },
  contact: {
    intro:
      "Nie musisz mieć gotowej specyfikacji. Wystarczy krótki opis jednego procesu, wąskiego problemu albo miejsca, w którym dziś zespół robi za dużo ręcznie. Nie zawsze odpowiedzią jest budowa od zera — często wystarczy gotowe narzędzie, integracja albo automatyzacja tego, co już macie.",
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
