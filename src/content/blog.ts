import type { Metadata } from "next";

export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
  body: string; // HTML content
};

export const blogPosts: BlogPost[] = [
  {
    slug: "dedykowane-aplikacje-webowe-ai-excel",
    title:
      "Dedykowane aplikacje webowe i AI — kiedy Excel i gotowe systemy przestają wystarczać",
    description:
      "W którym momencie warto odejść od arkuszy, maili i gotowych systemów na rzecz dedykowanej aplikacji? Praktyczne sygnały, koszty ukryte i jak ocenić, czy to już czas.",
    date: "2026-05-12",
    tags: [
      "Aplikacje webowe",
      "AI dla firm",
      "Automatyzacja",
    ],
    body: `<p>
  Każda firma przechodzi przez ten moment: proces, który działał na Excelu
  i mailu, przestaje być wystarczający. Rośnie liczba wyjątków, ludzie tracą
  czas na ręczne przepisywanie, a Ty nie wiesz, gdzie proces się zatyka.
</p>

<h2>Sygnały, że Excel już nie wystarcza</h2>

<p>
  Nie chodzi o to, żeby wymieniać narzędzia dla samej wymiany. Oto
  konkretne sygnały, które widzę u klientów przed rozpoczęciem współpracy:
</p>

<ul>
  <li>
    <strong>Rozproszone źródła prawdy</strong> — dokumenty, statusy i decyzje
    są w kilku miejscach naraz. Nikt nie wie, która wersja jest aktualna, a
    znalezienie historii sprawy wymaga przekopywania maili.
  </li>
  <li>
    <strong>Ręczne przepisywanie między systemami</strong> — dane z ERP
    trafiają do Excela, potem do maila, potem do PDF-a. Każdy krok to
    miejsce na błąd i czas, który można odzyskać.
  </li>
  <li>
    <strong>Brak widoczności</strong> — nie wiesz, które zadania są w toku,
    które utknęły i gdzie proces się zatyka. Decyzje podejmujesz na
    podstawie domysłów, nie danych.
  </li>
  <li>
    <strong>Wyłącznie ręczna obsługa wyjątków</strong> — gdy proces napotyka
    niestandardową sytuację, wszystko wraca do ręcznego sprawdzania i
    pilnowania.
  </li>
</ul>

<h2>Gotowe narzędzie czy dedykowana aplikacja?</h2>

<p>
  Zanim zaproponuję budowę czegokolwiek od zera, zawsze sprawdzam trzy
  ścieżki:
</p>

<ol>
  <li>
    <strong>Czy problem rozwiązuje istniejące narzędzie?</strong> Często
    wystarczy integracja lub lepsze wykorzystanie tego, co już macie.
  </li>
  <li>
    <strong>Czy wystarczy lekka automatyzacja?</strong> Pipeline AI albo
    workflow między narzędziami potrafi wyeliminować ręczną pracę bez
    budowy nowej aplikacji.
  </li>
  <li>
    <strong>Dedykowana aplikacja</strong> — tylko wtedy, gdy dwie pierwsze
    ścieżki nie wystarczają. Buduję dokładnie to, czego potrzebuje proces,
    bez przepisywania całego środowiska pracy.
  </li>
</ol>

<h2>Ile kosztuje proces, którego nie porządkujesz?</h2>

<p>
  Firmy często patrzą na koszt budowy aplikacji, ale rzadko liczą koszt
  braku aplikacji. Kilka przykładów z moich wdrożeń:
</p>

<ul>
  <li>
    <strong>2 godziny dziennie × 3 osoby × 250 dni</strong> = 1500 godzin
    rocznie na ręczne sprawdzanie i przepisywanie statusów między systemami.
  </li>
  <li>
    <strong>Błędy w danych</strong> — każdy błąd z ręcznego przepisywania
    kosztuje czas na korektę, a czasem pieniądze klienta.
  </li>
  <li>
    <strong>Utracone okazje</strong> — gdy nie widzisz, gdzie proces się
    zatyka, nie możesz go usprawnić. A konkurencja już to robi.
  </li>
</ul>

<h2>AI jako praktyczne narzędzie, nie osobny projekt</h2>

<p>
  AI nie musi być oddzielnym wdrożeniem z big-bangowym budżetem. Wdrażam
  modele AI jako <strong>element narzędzia</strong> — dokładnie tam, gdzie
  skracają pracę ludzi:
</p>

<ul>
  <li>
    <strong>OCR i ekstrakcja danych</strong> — odczyt dokumentów, faktur,
    formularzy bez ręcznego przepisywania.
  </li>
  <li>
    <strong>Klasyfikacja i routing</strong> — automatyczne przypisywanie
    spraw do właściwych osób na podstawie treści.
  </li>
  <li>
    <strong>Inteligentny dobór modeli</strong> — tani model do prostych
    zadań, precyzyjny do trudnych. Płacisz tylko za to, czego naprawdę
    potrzebujesz.
  </li>
</ul>

<h2>Od czego zacząć?</h2>

<p>
  Nie potrzebujesz gotowej specyfikacji. Wystarczy jeden konkretny proces,
  który zabiera czas, wymyka się spod kontroli albo działa nieefektywnie.
  Ocenię, czy wystarczy gotowe narzędzie, integracja, czy trzeba budować
  coś dedykowanego — i powiem to wprost.
</p>

<p>
  <a href="/#kontakt">Opisz proces do uporządkowania →</a>
</p>`,
  },
  {
    slug: "konsultant-ai-procesy-operacyjne-automatyzacja",
    title:
      "Konsultant AI i procesy operacyjne — co naprawdę daje automatyzacja w firmie",
    description:
      "Automatyzacja procesów to nie wymiana ludzi na boty. To odciążenie zespołu z ręcznej, powtarzalnej pracy. Jak wygląda realna automatyzacja procesów z AI w 2026 roku.",
    date: "2026-05-12",
    tags: [
      "AI dla firm",
      "Automatyzacja",
      "Procesy operacyjne",
    ],
    body: `<p>
  Automatyzacja procesów to jedno z najbardziej nadużywanych haseł w
  IT — obok "AI" i "transformacji cyfrowej". Za hasłami kryje się jednak
  konkretna wartość: odciążenie zespołu z pracy, którą można powierzyć
  maszynie.
</p>

<h2>Czym naprawdę jest automatyzacja procesów w 2026?</h2>

<p>
  W 2026 roku automatyzacja przestała oznaczać "napiszemy skrypt, który
  raz dziennie scali dwa pliki". Dziś mówimy o:
</p>

<ul>
  <li>
    <strong>Pipeline'ach AI</strong> — wieloetapowym przetwarzaniu:
    dokument wchodzi, przechodzi przez OCR, klasyfikację, ekstrakcję,
    walidację i trafia do systemu jako ustrukturyzowana dana.
  </li>
  <li>
    <strong>Inteligentnym routingu</strong> — sprawa nie trafia "do
    działu", tylko do konkretnej osoby na podstawie treści, priorytetu
    i obciążenia.
  </li>
  <li>
    <strong>Monitoringu i alertach w czasie rzeczywistym</strong> —
    wiesz, gdzie proces utknął zanim ktoś to zgłosi.
  </li>
</ul>

<h2>Co automatyzacja NIE robi (i nie powinna)</h2>

<p>
  Zanim zaczniesz automatyzować, warto wiedzieć, czego automatyzacja
  nie rozwiązuje:
</p>

<ul>
  <li>
    <strong>Nie naprawi zepsutego procesu.</strong> Jeśli proces jest
    chaotyczny, automatyzacja tylko przyspieszy chaos. Najpierw
    porządkuję, potem automatyzuję.
  </li>
  <li>
    <strong>Nie zastąpi decyzji.</strong> AI może przygotować
    rekomendację, ale decyzja — szczególnie przy wyjątkach — zostaje
    po stronie człowieka.
  </li>
  <li>
    <strong>Nie działa bez danych.</strong> Jeśli dane są niekompletne
    lub niespójne, automatyzacja wzmocni błędy zamiast je wyeliminować.
  </li>
</ul>

<h2>Jak wygląda współpraca z konsultantem AI od strony praktycznej</h2>

<p>
  Nie przychodzę z gotowym rozwiązaniem i 200-stronicową strategią.
  Pracuję iteracyjnie:
</p>

<ol>
  <li>
    <strong>Rozpoznanie jednego procesu.</strong> Wybieramy konkretny
    obszar: dokumenty, reklamacje, statusy, workflow decyzji.
  </li>
  <li>
    <strong>Sprawdzenie, czy wystarczy integracja.</strong> Często
    problem rozwiązuje połączenie istniejących narzędzi — bez budowy
    nowej aplikacji.
  </li>
  <li>
    <strong>Pierwsza wersja z jasnym zakresem.</strong> Coś, co można
    sprawdzić na żywej pracy zespołu w ciągu tygodni, nie miesięcy.
  </li>
  <li>
    <strong>Wdrożenie i pomiar.</strong> Narzędzie działa, zespół
    odzyskuje czas, Ty widzisz konkretne metryki.
  </li>
</ol>

<h2>Ile kosztuje automatyzacja?</h2>

<p>
  To zależy od procesu — ale zasada jest prosta: nie buduję więcej niż
  potrzeba. Dla prostych zadań używam tańszych modeli AI. Dla
  wymagających — precyzyjnych. Zawsze z kontrolą kosztów widoczną od
  pierwszego dnia.
</p>

<p>
  <strong>Zasada:</strong> jeśli problem rozwiązuje darmowe lub tanie
  narzędzie z rynku — mówię to wprost. Nie buduję aplikacji tam, gdzie
  wystarczy integracja.
</p>

<h2>Co dalej?</h2>

<p>
  Masz proces, który zabiera czas, wymyka się spod kontroli albo
  działa nieefektywnie? Opisz go — ocenię, czym go uporządkować.
  Bez zobowiązań, bez strategii na 200 stron.
</p>

<p>
  <a href="/#kontakt">Opisz proces →</a>
</p>`,
  },
];

export function getPost(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug);
}

export function getPostMetadata(slug: string): Metadata {
  const post = getPost(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.date,
      tags: post.tags,
    },
  };
}
