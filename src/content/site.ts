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
    name: "GoToValues",
    eyebrow: "Dane, workflow i aplikacje dla firm, które chcą działać czytelniej.",
    headline: "Projektuję systemy, które porządkują decyzje i usprawniają pracę.",
    intro:
      "Łączę analitykę, automatyzację i budowę aplikacji webowych, żeby firmy miały mniej ręcznej pracy i więcej kontroli nad procesami.",
    cta: {
      primary: {
        label: "Umów konsultację",
        href: "#kontakt",
      },
      secondary: {
        label: "Zobacz produkty",
        href: "/produkty",
      },
    },
  },
  offer: {
    pillars: [
      {
        title: "Analityka i automatyzacja",
        description:
          "Porządkuję dane, raportowanie i przepływy pracy, żeby właściciel lub zespół szybciej widzieli, co się dzieje i gdzie są straty czasu.",
        bullets: [
          "dashboardy i raportowanie operacyjne",
          "automatyzacja obiegu dokumentów i danych",
          "integracje między narzędziami i źródłami danych",
        ],
      },
      {
        title: "Aplikacje webowe i AI",
        description:
          "Buduję dedykowane aplikacje i narzędzia AI, które rozwiązują konkretny problem biznesowy zamiast dokładania kolejnego arkusza lub kolejnej skrzynki mailowej.",
        bullets: [
          "aplikacje webowe dla procesów wewnętrznych i klientów",
          "narzędzia AI do ekstrakcji, klasyfikacji i wyszukiwania",
          "systemy dokumentowe, OCR i workflow automation",
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
          "Aplikacja wspierająca zarządzanie karierą: CV, oferty pracy, wiedza i workflow oparte o AI.",
        stack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "AI workflows"],
        impact:
          "Pokazuje podejście produktowe, nowoczesny frontend i integrację funkcji AI w realnym narzędziu.",
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
          "Portal genealogiczny do pracy z danymi archiwalnymi i dokumentami, z osobnym frontendem i backendem.",
        stack: ["Next.js", "TypeScript", "FastAPI", "Python", "PostgreSQL"],
        impact:
          "Pokazuje umiejętność budowy pełnego systemu: publiczny portal, API i model danych pod wyszukiwanie oraz eksplorację zasobów.",
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
          "Prywatne wdrożenie do ekstrakcji danych z dokumentów oraz kontroli jakości pipeline'u OCR.",
        stack: ["FastAPI", "Python", "Playwright", "OpenCV", "Tesseract", "LLM"],
        impact:
          "Pokazuje doświadczenie w budowie narzędzi dokumentowych, przetwarzaniu obrazów i operacyjnym dashboardzie dla zespołu.",
        screenshot: {
          src: "/images/private/ocr-operations.svg",
          alt: "Widok prywatnego wdrożenia OCR do przetwarzania dokumentów i kontroli pipeline'u.",
        },
      },
      {
        name: "Workflow tłumaczenia i normalizacji akt",
        category: "private",
        summary:
          "Prywatne wdrożenie do czyszczenia OCR, tłumaczenia treści i strukturyzacji danych z archiwów.",
        stack: ["Python", "Flask", "PostgreSQL", "Translation pipeline", "LLM"],
        impact:
          "Pokazuje budowę narzędzia AI do pracy z historycznymi dokumentami oraz przekształcanie nieuporządkowanych źródeł w dane gotowe do użycia.",
        screenshot: {
          src: "/images/private/akta-translate.svg",
          alt: "Widok prywatnego wdrożenia do tłumaczenia i strukturyzacji treści dokumentów archiwalnych.",
        },
      },
    ] satisfies ProductCard[],
  },
  about: {
    title: "O mnie",
    body: "Pomagam firmom uporządkować dane, zautomatyzować powtarzalną pracę i zbudować aplikacje, które realnie wspierają operacje. Łączę myślenie analityczne z podejściem produktowym, dlatego projektuję zarówno dashboardy i workflow, jak i pełne aplikacje webowe.",
  },
} as const;

export type SiteContent = typeof siteContent;
