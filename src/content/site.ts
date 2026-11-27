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
      "Automatyzacja, lekkie aplikacje webowe, serwery, sprzęt i wsparcie IT dla firm oraz osób prywatnych.",
    eyebrow: "Dla firm i osób prywatnych · zdalnie i lokalnie po umówieniu",
    headline: "Automatyzacja, aplikacje i wsparcie IT.",
    intro:
      "Pomagam firmom i osobom prywatnym w automatyzacji pracy, tworzeniu prostych aplikacji oraz wsparciu IT — od oprogramowania po komputery, serwery i sieci.",
    cta: {
      primary: {
        label: "Napisz wiadomość",
        href: "#kontakt",
      },
      secondary: {
        label: "Zobacz pełny zakres",
        href: "#oferta",
      },
    },
  },
  offer: {
    pillars: [
      {
        title: "Procesy, dane i automatyzacja",
        description:
          "Łączę dane z poczty, arkuszy i programów, żeby nie przepisywać tych samych informacji ręcznie.",
        bullets: [
          "integracje między pocztą, arkuszami, CRM i bazami danych",
          "porządkowanie danych i czytelne raporty do codziennych decyzji",
          "praktyczne wykorzystanie AI tam, gdzie realnie skraca powtarzalną pracę",
        ],
      },
      {
        title: "Dedykowane narzędzia i aplikacje",
        description:
          "Gdy gotowe programy nie pasują do sposobu pracy, buduję lekkie narzędzie webowe pod konkretny proces.",
        bullets: [
          "wewnętrzne panele, formularze, obiegi dokumentów i proste aplikacje webowe",
          "przejrzyste strony internetowe dopasowane do realnej oferty",
          "kod, konta i dokumentacja przekazywane na jasnych zasadach",
        ],
      },
      {
        title: "Wsparcie IT, serwery i sprzęt",
        description:
          "Pomagam firmom i osobom prywatnym w sprawach sprzętowych, instalacjach, konfiguracji serwerów i bieżącym wsparciu IT.",
        bullets: [
          "instalacja, konfiguracja i modernizacja komputerów, serwerów (w tym NAS) oraz sieci",
          "poczta we własnej domenie, Microsoft 365, Google Workspace i automatyczne kopie zapasowe",
          "diagnostyka, dobór sprzętu, porządek w uprawnieniach i planowane wsparcie IT",
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
        title: "Najpierw problem, potem narzędzie",
        description:
          "Jeśli wystarczy konfiguracja tego, co już masz, nie proponuję pisania aplikacji od zera.",
      },
      {
        title: "Małe, zamknięte etapy",
        description:
          "Zaczynamy od jednego konkretnego usprawnienia z ustalonym zakresem, terminem i wyceną z góry.",
      },
      {
        title: "Bezpośredni kontakt",
        description:
          "Rozmawiasz ze mną od pierwszego maila do odbioru prac — prostym językiem i bez pośredników.",
      },
      {
        title: "Jasne zasady po stronie firmy",
        description:
          "Konta, dostępy, poufność i prawa do rozwiązań ustalamy wprost przed startem prac.",
      },
    ] satisfies ApproachPoint[],
  },
  about: {
    title: "O mnie",
    headline: "gotovalues — jeden bezpośredni kontakt od rozmowy po wdrożenie.",
    role: "Niezależny specjalista — automatyzacja, aplikacje webowe, serwery i wsparcie IT.",
    summary:
      "Pracuję bezpośrednio z firmami i osobami prywatnymi. Najpierw sprawdzam, gdzie dokładnie leży problem — a potem dobieram najprostsze rozwiązanie: od spraw sprzętowych, instalacji i wsparcia IT, przez integracje danych, po lekką aplikację webową.",
    points: [
      {
        label: "Obszar pracy",
        value:
          "automatyzacja, analiza danych, lekkie aplikacje webowe (TypeScript/Next.js, Python, SQL), serwery, sprzęt i wsparcie IT.",
      },
      {
        label: "Model współpracy",
        value:
          "planowane, małe etapy z jasnym zakresem przed startem — bezpośrednio ze mną, bez pośredników.",
      },
      {
        label: "Lokalizacja",
        value: "zdalnie w całej Polsce; sprawy sprzętowe lokalnie po umówieniu (Zabrodzie, powiat wyszkowski).",
      },
    ],
  },
  contact: {
    intro:
      "Napisz krótko, jaki proces chcesz usprawnić albo w czym potrzebujesz wsparcia IT — od aplikacji i automatyzacji po komputery, serwery czy konfigurację. Jeśli temat wykracza poza mój zakres, powiem to wprost na początku.",
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
    title: "gotovalues — automatyzacja, aplikacje i wsparcie IT",
    positioning:
      "gotovalues pomaga firmom i osobom prywatnym w automatyzacji powtarzalnej pracy, porządkowaniu danych, budowie lekkich aplikacji webowych oraz wsparciu IT (komputery, serwery, NAS, instalacje, poczta, kopie zapasowe). Praca zdalna w całej Polsce oraz sprawy sprzętowe po umówieniu (Zabrodzie, powiat wyszkowski).",
    sitemap: "https://gotovalues.com/sitemap.xml",
    bestFor: [
      "firmy i osoby tracące czas na ręczne przepisywanie danych między pocztą, arkuszami i programami",
      "firmy potrzebujące prostego, dedykowanego narzędzia webowego zamiast rozbudowanego systemu enterprise",
      "firmy i osoby prywatne szukające wsparcia IT: instalacji i konfiguracji komputerów, serwerów (NAS), sieci, poczty i kopii zapasowych",
    ],
    notFor: [
      "firmy wymagające całodobowych dyżurów awaryjnych 24/7 i natychmiastowego serwisu SLA",
      "rozległe wdrożenia ERP dla setek użytkowników wymagające dużego zespołu wdrożeniowego",
    ],
    proof: [
      "procesy, dane i automatyzacja",
      "dedykowane lekkie aplikacje webowe",
      "wsparcie IT, serwery i sprzęt",
    ],
  },
  comparisonLanding: {
    eyebrow: "Jak pracuję",
    headline: "Od konkretnego problemu do najprostszego rozwiązania",
    intro:
      "Zaczynam od zrozumienia, co w codziennej pracy zabiera najwięcej czasu albo powoduje błędy. Dopiero potem wybieram poziom rozwiązania — konfigurację gotowych narzędzi, integrację danych, automatyzację albo lekką aplikację webową.",
    audiences: [
      {
        slug: "proces-przed-kodem",
        title: "Najpierw proces, dopiero potem kod",
        pain: "Gdy opis zlecenia powiela stare obejście zamiast źródła problemu, napisanie nowego oprogramowania utrwala tylko niepotrzebną pracę.",
        gotovaluesAdvantage: [
          "sprawdzam, czy wystarczy konfiguracja narzędzi, z których firma już korzysta",
          "łączę analizę procesu, dane, kod i wdrożenie w jednym bezpośrednim kontakcie",
          "dzielę pracę na małe, zamknięte etapy z jasnym kryterium odbioru",
        ],
      },
      {
        slug: "automatyzacja-i-aplikacja",
        title: "Integracja, gdy wystarczy. Aplikacja, gdy jest potrzebna.",
        pain: "Gotowe narzędzia automatyzacji sprawdzają się w prostych przepływach, ale przy własnych widokach pracy, wyjątkach i walidacji danych bywają zbyt sztywne.",
        gotovaluesAdvantage: [
          "łączę istniejące arkusze, pocztę i systemy zamiast wymieniać całe środowisko",
          "buduję lekki interfejs webowy wtedy, gdy zespół potrzebuje jednego miejsca pracy",
          "przekazuję kod, konta i dokumentację na zasadach ustalonych przed startem",
        ],
      },
    ],
    cta: {
      label: "Opisz temat do uporządkowania",
      href: "#kontakt",
    },
  },
} as const;
