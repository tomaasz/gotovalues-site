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
      "Procesy, dane, lekkie aplikacje webowe i planowane zdalne wsparcie IT dla małych firm oraz MŚP.",
    eyebrow: "Zdalnie dla firm i JDG · Polska",
    headline: "Porządkuję procesy, dane i IT w małej firmie.",
    intro:
      "Łączę narzędzia, buduję proste aplikacje i pomagam zdalnie uporządkować firmowe IT — w jasno ustalonych etapach.",
    cta: {
      primary: {
        label: "Wyślij wiadomość",
        href: "#kontakt",
      },
      secondary: {
        label: "Zobacz zakres",
        href: "#oferta",
      },
    },
  },
  offer: {
    pillars: [
      {
        title: "Procesy, dane i automatyzacja",
        description:
          "Łączę dane z poczty, arkuszy i programów, żeby zespół nie przepisywał tych samych informacji ręcznie.",
        bullets: [
          "integracje między pocztą, arkuszami, CRM i bazami danych",
          "porządkowanie danych i czytelne raporty do codziennych decyzji",
          "praktyczne wykorzystanie AI tam, gdzie realnie skraca powtarzalną pracę",
        ],
      },
      {
        title: "Dedykowane narzędzia i aplikacje",
        description:
          "Gdy gotowe programy nie pasują do sposobu pracy firmy, buduję lekkie narzędzie webowe pod konkretny proces.",
        bullets: [
          "wewnętrzne panele, formularze, obiegi dokumentów i proste aplikacje webowe",
          "przejrzyste strony firmowe dopasowane do realnej oferty",
          "kod, konta i dokumentacja przekazywane firmie na jasnych zasadach",
        ],
      },
      {
        title: "Uporządkowanie IT i zdalne wsparcie",
        description:
          "Pomagam małym firmom i JDG uporządkować podstawy IT oraz rozwiązuję bieżące sprawy techniczne zdalnie.",
        bullets: [
          "poczta we własnej domenie, Microsoft 365 i Google Workspace",
          "automatyczne kopie zapasowe, porządek w hasłach i uprawnieniach",
          "zdalna konfiguracja stanowisk, programów i planowane wsparcie techniczne",
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
    headline: "Tomasz Gołaszewski. Jeden kontakt od diagnozy po wdrożenie.",
    role: "Tomasz Gołaszewski — automatyzacja procesów, aplikacje webowe i zdalne wsparcie IT.",
    profileLink: {
      label: "Zobacz profil na LinkedIn",
      href: "https://www.linkedin.com/in/tomasz-golaszewski/",
    },
    summary:
      "Pracuję bezpośrednio z właścicielami małych firm i MŚP. Najpierw sprawdzam, gdzie dokładnie powstaje problem — a potem dobieram najprostsze rozwiązanie: od konfiguracji gotowych narzędzi i zdalnego wsparcia IT, przez integracje danych, po lekką aplikację webową.",
    points: [
      {
        label: "Obszar pracy",
        value:
          "automatyzacja procesów, analiza danych, lekkie aplikacje webowe (TypeScript/Next.js, Python, SQL) i zdalne wsparcie IT.",
      },
      {
        label: "Model współpracy",
        value:
          "planowane, małe etapy z jasnym zakresem przed startem — bezpośrednio ze mną, bez pośredników.",
      },
      {
        label: "Lokalizacja",
        value: "działam zdalnie w całej Polsce (siedziba: Zabrodzie, powiat wyszkowski).",
      },
    ],
  },
  contact: {
    intro:
      "Napisz krótko, jaki proces chcesz usprawnić albo co w firmowym IT wymaga zdalnego uporządkowania. Jeśli temat wykracza poza mój zakres, powiem to wprost na początku.",
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
        value: "Zdalnie w całej Polsce (Zabrodzie, powiat wyszkowski).",
      },
    ],
  },
  aiSummary: {
    title: "gotovalues — procesy, dane, aplikacje i zdalne IT dla firm",
    positioning:
      "gotovalues pomaga małym firmom i MŚP zdalnie w całej Polsce porządkować powtarzalną pracę, dane i narzędzia IT: integracje i automatyzacja procesów (z praktycznym AI tam, gdzie ma sens), lekkie aplikacje webowe oraz planowane zdalne wsparcie IT (poczta, kopie zapasowe, konfiguracja). Siedziba: Zabrodzie, powiat wyszkowski.",
    sitemap: "https://gotovalues.com/sitemap.xml",
    bestFor: [
      "małe firmy i MŚP tracące czas na ręczne przepisywanie danych między pocztą, arkuszami i systemami",
      "firmy potrzebujące prostego, dedykowanego narzędzia webowego zamiast rozbudowanego systemu enterprise",
      "małe firmy i JDG szukające planowanego zdalnego uporządkowania poczty, kopii zapasowych, uprawnień i narzędzi IT",
    ],
    notFor: [
      "firmy wymagające serwisu sprzętowego z dojazdem na miejsce lub dyżurów awaryjnych 24/7",
      "rozległe wdrożenia ERP dla setek użytkowników wymagające dużego zespołu wdrożeniowego",
    ],
    proof: [
      "procesy, dane i automatyzacja",
      "dedykowane lekkie aplikacje webowe",
      "planowane zdalne wsparcie IT",
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
