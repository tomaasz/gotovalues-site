# 04 — Audyt UX Writing & CRO `gotovalues.com`

**Data:** 2026-11-27  
**Tryb:** wyłącznie analiza; bez zmian w kodzie, planach, testach, Git i produkcji.  
**Zakres:** strona główna, wspólne elementy nawigacji i stopki, formularze, FAQ oraz relacja strony głównej z indeksowanymi podstronami.  
**Źródła:** `00-AUDIT-BRIEF.md`, `01-CURRENT-STATE.md`, `DESIGN.md`, kod wskazanych komponentów oraz snapshot produkcyjny `/tmp/gv_prod_audit.json`.

> **Metoda i granice pewności.** Wnioski o wyglądzie i kolejności elementów wynikają z kodu CSS/React oraz opisu wyrenderowanej produkcji w `01-CURRENT-STATE.md`. Nie używam niezweryfikowanych danych o konwersji, klientach, referencjach ani efektach biznesowych. „Problem konwersyjny” oznacza tu wykryte tarcie w ścieżce użytkownika, a nie udowodniony spadek współczynnika konwersji.

---

## 1. Executive summary

Strona ma bardzo charakterystyczny, zapamiętywalny interfejs: jeden arkusz „rysunku roboczego”, grube linie, numerowane elementy i interaktywną tabelę rewizji. To może skutecznie odróżniać gotovalues od zwykłego serwisu IT. Obecna treść używa jednak tej wysokiej jakości oprawy do komunikowania głównie awarii Wi-Fi, naprawy komputera i konfiguracji poczty. W pierwszych sekundach użytkownik widzi więc atrakcyjną formę, ale nie dostaje krótkiej odpowiedzi na trzy pytania: **dla kogo to jest, jaki problem rozwiązuję i jaki jest następny krok**.

Największe tarcia są strukturalne, nie kosmetyczne:

1. **Above the fold jest podzielony między rysunek, tabelę rewizji i formularz.** H1 nie ma pod nim lede’u; objaśnienie oferty jest rozproszone po SVG i kilku wierszach rewizji.
2. **Dwa światy marki spotykają się w jednej domenie.** Strona główna mówi „lokalne IT dla JDG”, a blog, stopka i podstrony mówią „automatyzacja, aplikacje, AI i procesy dla MŚP”.
3. **Brakuje publicznej warstwy dowodowej.** Po usunięciu przykładów produktów i wdrożeń użytkownik ma przede wszystkim deklaracje, nie ma zaś scenariuszy, artefaktów ani opisów sposobu dojścia do efektu.
4. **Formularze konkurują zamiast tworzyć jedną ścieżkę.** Górny formularz pojawia się przed zbudowaniem zaufania i zbiera te same dane co formularz końcowy; dodatkowo formularz globalny ma lokalny, „Wi-Fi/serwisowy” kontekst także na stronach B2B/AI.
5. **CTA „Napisz” jest zbyt mało informacyjne.** Nie mówi, co stanie się po kliknięciu ani jakiego rodzaju wiadomości oczekuje gotovalues.

### Najkrótsza rekomendacja

Nie przebudowywać od razu systemu wizualnego. Najpierw ustalić jeden nadrzędny komunikat i kolejność informacji, a następnie:

- dodać krótkie zdanie objaśniające bezpośrednio pod H1;
- wybrać jedną główną akcję na pierwszym ekranie, a drugi formularz zdegradować do konsekwentnego końca ścieżki;
- rozdzielić kontekst formularza według strony;
- przywrócić skromną, prawdziwą warstwę dowodową (artefakty, scenariusze, zakres odpowiedzialności — bez wymyślonych klientów i wyników);
- uporządkować stopkę i indeksowane podstrony tak, aby nie obiecywały innej firmy niż homepage.

---

## 2. Pierwsze wrażenie i above the fold

### 2.1. Co widzi użytkownik w pierwszych pięciu sekundach

Na desktopie 1280 px pierwszy arkusz jest złożony z dwóch kolumn: po lewej rysunek procesu, po prawej H1 nad blokiem tytułowym z formularzem. Kod układa to w `grid-template-areas: 'drawing title' / 'drawing block'` (`src/app/home.css:119-132`). H1 brzmi: **„Sprawne IT dla małej firmy i JDG.”** (`src/components/home/home-sheets.tsx:34-37`). Poniżej nie ma lede’u, jednego zdania wyjaśniającego ani listy najważniejszych rezultatów. Zamiast tego wzrok przechodzi do:

- SVG z węzłami typu „Wi-Fi / sieć”, „Komputery”, „Poczta / pliki”, „Drukarka”;
- wiersza „Spokojna praca” i kropki wartości;
- legendy;
- **„Tabeli zmian: zobacz, jak porządkuję IT w firmie”** z rewizjami 0/A/B/C;
- formularza w bloku tytułowym.

Na mobile 375 px układ jest liniowy: najpierw H1, potem rysunek, następnie formularz, legenda i tabela rewizji (`src/app/home.css:1148-1198`). SVG jest pomniejszone do maksymalnie 220 px wysokości (`src/app/home.css:1168-1177`), ale jego etykiety i linie nadal zajmują znaczną część pierwszego arkusza. Formularz i tabela są więc po sobie, przed użytkownikiem, który jeszcze nie zobaczył pełnej oferty, „O mnie”, FAQ ani kontaktu końcowego.

### 2.2. Co działa

- **H1 jest jasny co do bazowej grupy odbiorców.** „Mała firma i JDG” jest konkretniejsze niż ogólne „usługi IT”.
- **Rysunek szybko pokazuje, że interfejs jest interaktywny.** Rewizje 0/A/B/C nie są tylko ozdobą: zmieniają SVG i opis procesu (`src/components/home/process-drawing.tsx:165-257`).
- **Numeracja i tabela tworzą spójną metaforę.** To może budować wrażenie metodyczności i pracy na konkretnym problemie.
- **Formularz jest krótki.** W górnej wersji są opis problemu, imię, e-mail i firma; nie ma długiego briefu.
- **Mobilna kolejność jest logiczna technicznie.** H1 → rysunek → formularz → objaśnienie. Problemem nie jest sam responsywny CSS, tylko to, że za dużo funkcji próbuje pełnić pierwszy arkusz.

### 2.3. Co nie działa i dlaczego

#### Brak lede’u pod H1 — P0/P1

H1 nazywa kategorię, ale nie obiecuje rezultatu ani nie tłumaczy zakresu. W `DrawingSheet` po H1 następuje bezpośrednio rysunek i formularz; nie ma krótkiego zdania typu: „Pomagam małym firmom ustabilizować codzienne IT, a gdy trzeba — uporządkować proces lub zbudować proste narzędzie” (`src/components/home/home-sheets.tsx:34-44`).

**Skutek:** użytkownik lokalny rozumie „informatyk”; użytkownik szukający automatyzacji, danych lub aplikacji może uznać, że trafił nie tam, gdzie trzeba. Z kolei użytkownik potrzebujący pilnej naprawy nie wie, czy otrzyma serwis, stałą opiekę czy projekt.

**Rekomendacja:** pod H1 dodać jedno zdanie z kolejnością oferty: podstawowa stabilność IT → stała opieka → narzędzia i automatyzacja, bez dokładania nowego nagłówka-kickeru. To pozostaje zgodne z `DESIGN.md`, które zabrania uppercase eyebrow nad nagłówkiem.

#### Interaktywność przed orientacją — P1

Tabela rewizji jest ciekawa, ale wymaga czytania i wyboru. W desktopie dzieli uwagę z formularzem; na mobile jest po nim. Użytkownik musi najpierw zrozumieć metaforę „rewizji”, zanim dowie się, czym konkretnie gotovalues może się zająć.

**Rekomendacja:** zachować interakcję, ale uczynić ją ilustracją po krótkim komunikacie. W pierwszym stanie („Stan obecny”) powinien być widoczny jeden zwięzły opis problemu i jednoznaczna etykieta działania. Tabela nie powinna być jedynym lede’em oferty.

#### Formularz w pierwszym arkuszu jest zbyt wcześnie — P1

`TitleBlockForm` występuje obok H1, zanim użytkownik zobaczy ofertę, sposób pracy, autora, FAQ i sygnały zaufania. To skraca drogę dla osoby z pilnym problemem, ale podnosi koszt poznawczy dla osoby, która dopiero porównuje usługodawców. Górny formularz nie ma dedykowanego tekstu redukującego obawę „czy to właściwe miejsce?” poza placeholderem.

**Rekomendacja:** zachować go jako szybki kontakt, ale zmienić jego rolę na „krótki opis problemu” i wyraźnie zaznaczyć, że nie trzeba znać terminów technicznych. Formularz końcowy powinien być główną wersją pełnego kontaktu, a nie duplikatem.

#### Obciążenie poznawcze

W ciągu kilku sekund użytkownik dostaje jednocześnie:

- markę i nawigację;
- H1;
- schemat SVG z wieloma węzłami i liniami;
- legendę i pozycje;
- cztery rewizje z długimi opisami;
- cztery pola formularza i przycisk;
- techniczne oznaczenia arkusza A–F / 1–4.

Każdy element osobno jest uzasadniony, ale razem walczą o pierwszeństwo. Forma „working drawing” staje się instrukcją obsługi, zanim stanie się ofertą.

**Rekomendacja:** w pierwszym ekranie wyróżnić tylko trzy rzeczy: dla kogo, podstawowy rezultat, następny krok. Resztę zachować niżej lub wizualnie odsunąć: legenda i pełna tabela rewizji mogą pozostać, ale nie powinny być równorzędne z H1 i formularzem.

---

## 3. Spójność treści ze stylem „The Working Drawing”

### 3.1. Dlaczego styl jest mocnym atutem

`DESIGN.md` definiuje świat „The Working Drawing”: papier, tusz, szałwia, proste narożniki, grubości linii 2/1,5/1 px, numerowane pozycje, kreskowanie i oznaczenia rewizji. Ten język dobrze wspiera treści, które wymagają:

- **diagnozy i porządku** — „co jest dziś, gdzie jest wąskie gardło, jaka rewizja je usuwa”;
- **doradztwa inżynieryjnego** — decyzje są pokazane jako konstrukcja, nie jako slogan;
- **architektury i systemów** — węzły, połączenia, zależności i przepływy są naturalnym nośnikiem znaczenia;
- **danych i procesów** — tabela, rewizja i ślad zmian sugerują kontrolę nad stanem oraz odpowiedzialność za szczegóły;
- **pracy konsultacyjnej** — rysunek roboczy może sugerować wspólne dopracowywanie rozwiązania, a nie sprzedaż gotowego pakietu.

To jest odróżnialne i trudne do pomylenia z typową stroną agencji. Płaski papier, brak gradientów i precyzyjna typografia nadają komunikacji powagę. Największą wartością jest możliwość pokazania drogi od problemu do rozwiązania, nie tylko listy usług.

### 3.2. Gdzie forma zgrzyta z copy

| Element treści                                                        | Co komunikuje copy                 | Co komunikuje forma                                        | Zgrzyt                                                                                                        |
| --------------------------------------------------------------------- | ---------------------------------- | ---------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| `rwie Wi-Fi, wolny komputer, brak kopii` (`process-drawing.tsx:49`)   | doraźny serwis i gaszenie awarii   | dokumentacja techniczna, inżynieria i kontrolowana rewizja | opakowanie wygląda bardziej premium i systemowo niż sam problem                                               |
| `naprawić komputer`, `ustabilizować Wi-Fi` (`process-drawing.tsx:73`) | czynność serwisowa                 | projektowanie rozwiązania                                  | styl podnosi oczekiwanie na diagnozę i metodę, których copy nie dopowiada                                     |
| `Drukarka`, `Poczta / pliki`                                          | elementy sprzętowo-administracyjne | model procesu i architektury                               | połączenie jest wiarygodne tylko wtedy, gdy pokazane są zasady, np. bezpieczeństwo, własność i ciągłość pracy |
| `Opracował: Tomasz Gołaszewski` (`home-sheets.tsx:160`)               | podpis autora / dokumentu          | autorstwo projektu inżynieryjnego                          | przy ofercie serwisowej może brzmieć teatralnie lub sugerować większy zakres realizacji niż użytkownik widzi  |
| `Uwagi: pytania przed współpracą` (`home-sheets.tsx:190`)             | FAQ                                | adnotacja na rysunku                                       | działa jako metafora, ale przy słabym dowodzie może wyglądać jak stylizacja zamiast odpowiedzi                |
| `Napisz` (`title-block-form.tsx:110-112`)                             | ogólna wiadomość                   | przycisk w tabelce rysunkowej                              | forma sugeruje precyzyjne zgłoszenie, etykieta nie mówi, co zgłosić                                           |

### 3.3. Jak zachować styl bez przebudowy design systemu

Nie trzeba usuwać rysunku ani zamieniać strony w typowy landing page. Trzeba zmienić poziom obietnicy i słownictwo:

- zamiast przedstawiać rysunek jako „serwis komputera”, opisać go jako **diagnozę stanu IT i plan uporządkowania**;
- nazwać rewizje rezultatami, nie tylko usługami: „stabilna sieć”, „jedna osoba do bieżących spraw”, „proste narzędzie wokół procesu”;
- zostawić konkretne przykłady Wi-Fi i komputera, ale umieścić je jako wejściowe symptomy, nie pełną definicję marki;
- „Opracował” uzupełnić zdaniem o obszarze odpowiedzialności, a nie tylko imieniem;
- używać technicznej metafory w miejscach, w których rzeczywiście pomaga zrozumieć decyzję.

---

## 4. Ścieżki kluczowych odwiedzających

### 4.1. Typ 1 — lokalny właściciel JDG/małej firmy z awarią albo potrzebą stałej opieki IT

**Prawdopodobna ścieżka:** Google lub polecenie → homepage → H1/rysunek → szybki formularz albo telefon → FAQ → kontakt.

**Co działa:** H1 wskazuje małą firmę i JDG; oferta wymienia sieci, komputery, pocztę, backup i helpdesk; FAQ odpowiada na pracę zdalną/lokalną, rozliczenie i brak konieczności abonamentu (`src/content/faq.ts:5-27`). `PhoneReveal` pozwala odsłonić numer dopiero po interakcji (`src/components/phone-reveal.tsx:24-42`).

**Punkty zagubienia i tarcia:**

- nie wiadomo, czy „Napisz” oznacza zgłoszenie awarii, bezpłatną rozmowę czy brief do większego projektu;
- brak jawnego czasu odpowiedzi w górnym formularzu;
- numer telefonu jest ukryty pod przyciskiem — na telefonie dodatkowy krok może być rozsądny antybotowo, ale dla osoby w pilnej awarii tworzy barierę;
- „automatyzacja i proste narzędzia” w tej samej ofercie może sugerować zbyt szeroki zakres;
- stopka wyprowadza użytkownika do SupportFlow, TriageFlow i kalkulatora ROI, czyli do produktów o innym odbiorcy.

**Najważniejsze usprawnienie:** główne CTA powinno brzmieć jak niskotarciowe zgłoszenie: „Opisz problem” / „Zapytaj o pomoc IT”, z mikrocopy „Wystarczą 2–3 zdania; odpowiem, czy mogę pomóc i jaki będzie następny krok”.

### 4.2. Typ 2 — właściciel MŚP szukający uporządkowania danych, procesów, aplikacji lub AI

**Prawdopodobna ścieżka:** Google/blog/podstrona B2B → artykuł lub landing → próba znalezienia dowodu kompetencji → formularz → kontakt.

**Co działa:** istniejące podstrony produkcji i logistyki mają język problemów operacyjnych, a blog obejmuje aplikacje webowe, AI, BI, automatyzację i integracje (`01-CURRENT-STATE.md`, sekcja 3). Styl rysunku dobrze pasuje do procesu, wyjątków i systemów.

**Punkty zagubienia i tarcia:**

- homepage komunikuje przede wszystkim serwis i lokalne IT, a nie analizę biznesową, dane, aplikacje i automatyzację;
- po wejściu na `/dla-produkcji` lub `/dla-logistyki` użytkownik widzi formularz, którego placeholder nadal mówi o rwącym Wi-Fi i serwisie komputera (`src/components/contact-form.tsx:126-139`);
- po usunięciu sekcji przykładów nie ma widocznych dowodów, które uzasadniałyby zaawansowaną obietnicę;
- stopka nie wyjaśnia, że linki prowadzą do innej ścieżki biznesowej;
- brak wyraźnego przejścia „od diagnozy procesu do małego pierwszego narzędzia”.

**Najważniejsze usprawnienie:** oddzielić język wejściowego problemu IT od języka pracy nad procesem. Nie trzeba tworzyć dwóch marek, ale trzeba zapewnić na każdej podstronie zgodność: H1, dowód, CTA i formularz powinny mówić o tym samym problemie.

### 4.3. Typ 3 — osoba z Google na blog lub `/dla-produkcji` / `/supportflow`

**Prawdopodobna ścieżka:** wynik wyszukiwania → landing o AI/procesie → lektura → CTA → formularz.

**Punkty zagubienia i tarcia:**

- podstrona jest obietnicą B2B/AI, ale kontakt kończy się formularzem lokalnego wsparcia IT;
- blog ma 17 wpisów o AI, BI, automatyzacji i aplikacjach, bez wpisów o Wi-Fi, PC lub helpdesku — użytkownik z bloga dostaje więc silny sygnał kompetencji doradczo-wdrożeniowych, sprzeczny z homepage;
- `SupportFlow` używa innego rejestru („founder”, „pierwszy klient referencyjny”, pakiety i cena), co zwiększa wrażenie, że to osobny biznes;
- użytkownik może trafić do ślepego końca: CTA prowadzi do `/#kontakt`, ale formularz nie pamięta kontekstu strony.

**Najważniejsze usprawnienie:** CTA powinno przekazywać kontekst („Opisz proces wsparcia”, „Opisz proces w zakładzie”), a formularz powinien wyświetlać stosowny przykład wiadomości i opcjonalnie zachować źródło zapytania.

### 4.4. Typ 4 — osoba weryfikująca wiarygodność przed kontaktem

**Prawdopodobna ścieżka:** homepage → „O mnie” → FAQ → blog/podstrony → kontakt.

**Co działa:** jest imię i nazwisko, link do profilu, opis roli, FAQ o bezpieczeństwie i własności kont (`src/content/faq.ts:29-41`). Deklaracja, że domena, poczta, konta i narzędzia należą do firmy, odpowiada na realną obiekcję małego biznesu.

**Punkty zagubienia i tarcia:**

- „Opracował” pojawia się jako podpis techniczny, zanim użytkownik pozna człowieka i jego kompetencje;
- brak konkretnych, weryfikowalnych artefaktów lub scenariuszy pracy po usunięciu sekcji proof;
- blog może budować wiarygodność w AI/automatyzacji, ale nie odpowiada na pytanie, jak to łączy się z lokalnym helpdeskiem;
- stopka sugeruje wiele produktów, lecz nie przedstawia ich relacji do głównej oferty.

**Najważniejsze usprawnienie:** w „O mnie” wyjaśnić dwutorowość kompetencji: praktyczna infrastruktura IT oraz projektowanie narzędzi/procesów. Dodać tylko dowody, które rzeczywiście istnieją: własne publiczne projekty, opis stosu, przykładowy artefakt procesu, nieanonimową informację o zakresie pracy — bez nazw klientów i wyników, jeśli ich nie można opublikować.

---

## 5. Hierarchia informacji, skanowalność i zrozumiałość oferty

### 5.1. Kolejność arkuszy

Homepage renderuje arkusze w kolejności: `DrawingSheet` → `PartsListSheet` → `AuthorSheet` → `NotesSheet` → `ContactSheet` (`src/app/page.tsx:22-30`). To jest logiczne jako dokument techniczny, ale nie w pełni jako ścieżka zakupowa:

1. **Rysunek** pokazuje problem i kilka możliwych rewizji, ale nie mówi wystarczająco szybko, czym różni się pomoc doraźna od pracy projektowej.
2. **Tabela usług** dopiero później ujawnia pełny zakres.
3. **O mnie** buduje zaufanie po ofercie, choć część użytkowników potrzebuje minimum wiarygodności przed wysłaniem formularza.
4. **FAQ** odpowiada na obiekcje dopiero tuż przed kontaktem.
5. **Kontakt** jest pełnym formularzem, mimo że podobny formularz był już na pierwszym arkuszu.

Rekomendowana kolejność bez przebudowy layoutu:

- arkusz 1: jasne pozycjonowanie + jeden szybki krok;
- arkusz 2: zakres usług podzielony na „stabilność IT”, „opieka”, „narzędzia/procesy”;
- arkusz 3: krótki dowód kompetencji i sposób pracy;
- arkusz 4: scenariusze/dowody lub FAQ zależnie od dostępnych materiałów;
- arkusz 5: pełny kontakt.

### 5.2. Tabela `gv-parts` kontra karty

Tabela jest odpowiednia dla dokumentu i porównania zakresów. Na desktopie ma cztery kolumny: pozycja, nazwa, zakres, elementy (`src/components/home/home-sheets.tsx:79-107`). Na mobile zamienia się w stosowane bloki z numerem po lewej (`src/app/home.css:1209-1247`). To zachowuje skanowalność lepiej niż poziomy overflow, ale użytkownik traci nagłówki kolumn i musi odtworzyć relację między opisem a elementami.

**Ocena:** tabela jest lepsza niż dekoracyjne karty, jeśli celem jest pokazanie zakresu i granic. Nie jest jednak najlepsza do hierarchizowania decyzji zakupowej. Cztery pozycje są podobnie ciężkie, a „Automatyzacja i proste narzędzia” wygląda jak dodatek mimo strategicznie wyższej wartości.

**Rekomendacja:** zachować tabelę, ale dodać krótką nadrzędną zasadę wyboru („najpierw stabilizujemy podstawy; potem dokładamy opiekę lub narzędzie”). Wyróżnić rezultat każdego wiersza, nie tylko listę czynności.

### 5.3. Dublowanie treści

Te same motywy wracają w kilku miejscach:

- rysunek: Wi-Fi, komputery, poczta, backup, helpdesk, narzędzia;
- tabela oferty: te same obszary w bardziej szczegółowej formie;
- formularz górny i dolny: te same przykłady w placeholderach;
- „O mnie”: ponownie opis zakresu;
- FAQ: ponownie zdalnie/lokalnie, abonament, bezpieczeństwo i narzędzia.

Dublowanie nie jest samo w sobie złe, ale obecnie nie pełni różnych funkcji. Użytkownik dostaje ten sam zakres kilka razy, a nie dostaje kolejnych odpowiedzi: **dla kogo dokładnie, jak wygląda diagnoza, co otrzymam po pierwszym kontakcie, jakie są granice usługi, dlaczego można zaufać**.

**Rekomendacja:** nadać każdemu arkuszowi jedną funkcję:

- Drawing: rozpoznanie problemu;
- Oferta: zakres i granice;
- O mnie/metoda: kompetencje i sposób pracy;
- FAQ: obiekcje i ryzyko;
- Kontakt: konkretna decyzja i następny krok.

---

## 6. Audyt konwersji, CTA, formularzy i mikrotekstów

### 6.1. Dwa formularze: pomoc czy konkurencja?

`TitleBlockForm` (`src/components/home/title-block-form.tsx:77-121`) i `ContactForm` (`src/components/contact-form.tsx:81-177`) zbierają zasadniczo te same dane: opis, imię, e-mail, firma i honeypot. Oba wysyłają do `/api/contact`. Różnią się zachowaniem:

- formularz górny ma lokalną walidację `MIN_MESSAGE = 20`, komunikat sukcesu i krótszy układ;
- formularz dolny ma pola wymagane, placeholdery, komunikaty serwera i helper text;
- oba mają przycisk **„Napisz”**.

**Wniosek:** dwa punkty wejścia mogą pomagać różnym intencjom, ale obecnie konkurują, bo nie mają wyraźnie różnych ról. Pierwszy obiecuje szybki kontakt, drugi nie jest przedstawiony jako pełny brief. Użytkownik może nie wiedzieć, który wybrać, a właściciel utrzymuje dwa miejsca z podobnym copy i różnymi szczegółami walidacji.

**Rekomendacja:**

- górny formularz: „Szybki opis problemu” — tylko opis + e-mail, imię/firma opcjonalnie, jeżeli API na to pozwala;
- dolny formularz: „Pełny kontakt” — pełne pola i kontekst;
- alternatywnie: jeden formularz na stronie głównej, a w pierwszym ekranie tylko CTA przewijające do niego. To jest prostsze i eliminuje rozjazdy.

### 6.2. CTA „Napisz”

„Napisz” jest krótkie i nie brzmi agresywnie, ale jest zbyt ogólne. Nie mówi, czy użytkownik ma:

- opisać awarię;
- zadać pytanie;
- poprosić o wycenę;
- umówić rozmowę;
- opisać proces do automatyzacji.

Na stronie lokalnego IT może działać jako przycisk niskiego tarcia, ale dopiero z mikrocopy obok. Na stronach B2B/AI jest niewystarczające.

**Rekomendacja etykiet według kontekstu:**

- homepage: **„Opisz problem”** albo **„Zapytaj o pomoc IT”**;
- produkcja: **„Opisz proces w zakładzie”**;
- logistyka: **„Opisz proces w spedycji”**;
- SupportFlow: **„Opisz proces wsparcia”**;
- pełny kontakt: **„Wyślij wiadomość”**.

Obok przycisku: „Wystarczą 2–3 zdania. Najpierw sprawdzę, czy mogę pomóc i jaki będzie sensowny następny krok.” Nie obiecywać czasu odpowiedzi, jeśli nie jest to utrzymywana reguła — obecny formularz górny mówi o 24 godzinach, dolny tylko o powrocie z oceną/propozycją (`title-block-form.tsx:63`, `contact-form.tsx:167-169`). Te komunikaty należy ujednolicić albo usunąć obietnicę.

### 6.3. Walidacja `MIN_MESSAGE = 20`

Minimalna długość 20 znaków w formularzu górnym chroni przed pustymi zgłoszeniami i wymusza odrobinę kontekstu (`title-block-form.tsx:13`, `:26-34`). To rozsądny próg, ale komunikat jest długi i wymienia „sieć, komputer, pocztę, pomoc zdalną”, więc dodatkowo zawęża wyobrażenie o ofercie.

**Ryzyko:** osoba z procesem produkcyjnym, automatyzacją albo aplikacją nie dostaje przykładu pasującego do swojej intencji. W formularzu dolnym brak analogicznego jawnego `minLength` na textarea; walidacja końcowa jest po stronie API, a komunikat może przyjść dopiero po wysłaniu.

**Rekomendacja:** zachować próg, ale użyć prostego komunikatu: „Napisz przynajmniej jedno pełne zdanie, żebym mógł ocenić następny krok.” Dodać natywne `minLength` także w pełnym formularzu, jeśli odpowiada schematowi serwera, i pokazywać błąd przy polu, nie tylko w ogólnym statusie.

### 6.4. Etykiety i placeholdery

Etykiety są zasadniczo obecne i powiązane z polami przez `htmlFor`. To mocna strona dostępności. Placeholdery są konkretne, ale pełnią rolę treści oferty, przez co tworzą problem kontekstowy:

- górny: „rwie się Wi-Fi… komputer… poczta i backup… zdalne wsparcie IT” (`title-block-form.tsx:80-90`);
- globalny: ten sam serwisowy przykład (`contact-form.tsx:126-139`);
- `ContactForm` jest używany także na podstronach produkcji, logistyki, SupportFlow i innych, więc przykład nie pasuje do deklarowanej intencji strony (`01-CURRENT-STATE.md`, sekcja 2 i 4).

Placeholder nie powinien być jedynym wyjaśnieniem, bo znika po wpisaniu i ma słabszy kontrast. Powinien pokazywać przykład adekwatny do kontekstu, a stały helper text powinien mówić, czego oczekuje formularz.

### 6.5. `PhoneReveal`

`PhoneReveal` nie wysyła numeru w surowym HTML i odsłania go dopiero po kliknięciu (`src/components/phone-reveal.tsx:4-7`, `:24-42`). Z punktu widzenia ochrony przed prostym scrapingiem jest to spójne z założeniem komponentu.

**Korzyści UX:**

- na telefonie po kliknięciu pojawia się link `tel:`;
- użytkownik może wykonać świadomą akcję;
- numer nie konkuruje wizualnie z formularzem.

**Bariery:**

- etykieta „Pokaż numer telefonu” nie mówi, że po kliknięciu będzie można od razu zadzwonić;
- dodatkowy krok jest kłopotliwy dla osoby z pilną awarią;
- ukrywanie numeru może być odczytane jako brak pełnej przejrzystości, zwłaszcza obok braku referencji;
- `aria-expanded="false"` pozostaje takie samo po odsłonięciu, choć element znika — semantyka stanu nie jest tu kluczowa, ale można ją uprościć.

**Rekomendacja:** zachować ochronę, lecz dodać mikrocopy: „Kliknij, aby odsłonić numer i zadzwonić”. Na mobile można rozważyć widoczny tekst „Telefon — odsłoń numer” i umieścić tę opcję obok formularza, nie tylko w dolnym arkuszu. Nie deklarować, że to zabezpieczenie zatrzyma wszystkie boty.

### 6.6. FAQ i obiekcje przed kontaktem

FAQ odpowiada na kilka realnych obiekcji:

- czy pomoc jest zdalna czy na miejscu;
- czy trzeba abonamentu;
- jak wygląda wycena;
- czy można pisać zwykłym językiem;
- bezpieczeństwo, backup i własność kont (`src/content/faq.ts:5-41`);
- czy zakres obejmuje strony i automatyzacje (`src/content/faq.ts:43-49`).

To jest dobra baza, zwłaszcza pytanie o brak wiedzy technicznej. Brakuje jednak pytań, które wynikają z aktualnego pozycjonowania i mogłyby zmniejszyć niepewność:

1. **Czy przyjmujesz nowe firmy i jak wygląda pierwszy kontakt?**
2. **Jak rozróżniasz pilną awarię od planowego uporządkowania IT?**
3. **Czy pracujesz samodzielnie, czy przekazujesz zadania dalej?** — tylko jeśli można odpowiedzieć zgodnie z faktem.
4. **Co dostanę po diagnozie: wycenę, listę zaleceń, plan prac?**
5. **Czy możesz pracować z obecnym dostawcą, ERP, pocztą i narzędziami?** — ważne dla odbiorców B2B.
6. **Jak wygląda dostęp do haseł i danych podczas pracy?**
7. **Czy wykonujesz pracę lokalnie poza Zabrodziem i powiatem wyszkowskim?**
8. **Czy automatyzacja/proste narzędzie jest osobną usługą, czy częścią opieki IT?**

Nie należy dodawać odpowiedzi „na zapas”. FAQ powinno zostać uzupełnione tylko o pytania, na które gotovalues może odpowiedzieć prawdziwie i konkretnie.

---

## 7. Priorytety rekomendacji UX/CRO

### P0 — spójność i brak ślepych końców

1. **Ustalić nadrzędny komunikat marki przed dalszym copywritingiem.** Zdecydować, czy homepage ma być przede wszystkim lokalnym partnerem IT, czy wejściem do szerszej oferty IT + procesy/narzędzia. Obecna hybryda powoduje tarcie na każdej ścieżce.
2. **Naprawić zgodność kontekstu formularza z podstroną.** Placeholder, helper text, etykieta CTA i ewentualne pola muszą odpowiadać stronie, z której użytkownik przychodzi. Formularz o Wi-Fi na `/dla-produkcji` i `/supportflow` jest bezpośrednim dead endem komunikacyjnym.
3. **Ujednolicić obietnicę po wysłaniu i odpowiedzi.** Obecne komunikaty mówią raz o 24 godzinach, raz o ocenie i propozycji następnego kroku. Zostawić tylko obietnicę, która jest faktycznie spełniana.
4. **Uporządkować stopkę.** Linki do SupportFlow, TriageFlow i kalkulatora ROI powinny być opisane jako osobna ścieżka albo tymczasowo nie być pierwszymi linkami dla użytkownika lokalnej strony. Nie należy pozostawiać globalnej stopki, która podważa obietnicę homepage.

### P1 — jasność pierwszego ekranu i konwersja

1. **Dodać jedno zdanie pod H1.** Ma wyjaśniać rezultat i kolejność oferty, bez buzzwordów i bez drugiego sloganu.
2. **Zdefiniować rolę dwóch formularzy.** Preferowany wariant: górny to szybki opis problemu, dolny to pełny kontakt; prostszy wariant: jedno CTA przewija do jednego formularza.
3. **Zmienić „Napisz” na CTA zależne od intencji.** „Opisz problem”, „Opisz proces” lub „Zapytaj o pomoc IT” redukuje niepewność bez agresywnej sprzedaży.
4. **Przenieść ciężar wyjaśnienia z metafory na treść.** Rysunek może pozostać, ale pierwszy stan powinien być zrozumiały bez kliknięania rewizji.
5. **Dodać minimalną warstwę dowodową.** Tylko prawdziwe materiały: opis własnych produktów, zanonimizowany artefakt procesu, przykładowy zakres diagnozy, publiczny profil lub techniczny sposób pracy. Bez logo klientów, certyfikatów, referencji i wyników, których nie ma w źródłach.
6. **Ustawić jedną deklarację czasu reakcji albo nie deklarować jej wcale.** Jeśli „24 godziny w dni robocze” jest realną regułą, powinna być obok CTA obu formularzy; jeśli nie, użyć „Odpowiem z oceną następnego kroku”.

### P2 — dopracowanie i testowanie

1. **Zróżnicować FAQ według aktualnego modelu oferty.** Dodać pytania o pierwszy krok, zakres diagnozy, dostęp do danych i relację IT ↔ automatyzacja, ale tylko z prawdziwymi odpowiedziami.
2. **Zoptymalizować `PhoneReveal` dla mobile.** Zachować odsłanianie, lecz jasno powiedzieć, co dzieje się po kliknięciu i zapewnić równorzędny kontakt formularzem.
3. **Ograniczyć powtórzenia.** Każdy arkusz powinien odpowiadać na inną obiekcję; nie powielać tych samych przykładów Wi-Fi, komputera i backupu w rysunku, tabeli, formularzu i FAQ.
4. **Przetestować dwa warianty powyżej bez udawania danych.** Test jakościowy z kilkoma osobami z grupy docelowej: po 5 sekundach poprosić o odpowiedź „czym zajmuje się gotovalues?”; po 30 sekundach „co mogę teraz zrobić?”. Dopiero później mierzyć kliknięcia i wysłania formularza.
5. **Zachować język projektowo-inżynieryjny tam, gdzie podnosi zrozumienie.** Nie usuwać tabeli, numeracji ani rysunku tylko dlatego, że są nietypowe; uprościć ich rolę i dostarczyć brakujące objaśnienie.

---

## 8. Proponowany model mikrocopy do dalszej pracy

Poniższe propozycje są kierunkami, nie gotową decyzją strategiczną:

- **H1:** `Sprawne IT dla małej firmy i JDG.` — może zostać.
- **Lede:** `Stabilizuję codzienne IT, pomagam je spokojnie obsługiwać, a gdy trzeba — porządkuję proces lub buduję proste narzędzie pod firmę.`
- **CTA homepage:** `Opisz problem`.
- **Helper pod CTA:** `Wystarczą 2–3 zdania. Nie musisz znać technicznych nazw.`
- **Opis stanu 0:** `Co dziś zabiera czas: awarie, ręczne poprawki i brak jednej osoby, która zna całość.`
- **Opis rewizji A:** `Stabilna sieć i sprzęt — najpierw usuwamy przeszkody w codziennej pracy.`
- **Opis rewizji B:** `Stała opieka — jedna osoba do bieżących problemów, poczty i kopii zapasowych.`
- **Opis rewizji C:** `Narzędzie lub automatyzacja — dopiero wtedy, gdy podstawy działają i wiadomo, co warto uprościć.`
- **Telefon:** `Pokaż numer i zadzwoń`.
- **Sukces formularza:** `Dziękuję. Odpowiem, czy mogę pomóc i jaki będzie sensowny następny krok.`

Te teksty nie dodają żadnych klientów, wyników ani certyfikatów. Ich zadaniem jest tylko zmniejszenie niepewności i uporządkowanie obecnego zakresu.

---

## 9. Konkluzja

Największy potencjał gotovalues nie leży w dodaniu większej liczby sekcji ani w zmianie kolorów. Leży w dopasowaniu treści do już istniejącego języka rysunku roboczego. Forma komunikuje: „rozumiem system, potrafię go rozłożyć na części i poprawiać w kontrolowanych krokach”. Copy obecnie często komunikuje tylko: „naprawię Wi-Fi i komputer”.

Należy zachować wyróżniający interfejs, ale podnieść i uporządkować znaczenie treści: od objawu, przez diagnozę, do rozwiązania i następnego kroku. Najpierw spójność homepage, podstron, stopki i formularzy; dopiero potem dalsze eksperymenty CRO. Bez tej spójności nawet atrakcyjniejszy przycisk lub dodatkowa sekcja nie rozwiąże problemu dwóch różnych firm pod jedną domeną.
