# 11 — Recenzja krytyczna audytu `gotovalues.com`

**Data:** 2026-11-27  
**Rola:** Agent 5 — niezależny recenzent krytyczny  
**Zakres:** weryfikacja dokumentów `00–10`, propozycji copy, źródeł kodowych i snapshotu produkcji  
**Tryb:** discovery / audit / review; bez zmian w kodzie i bez wdrażania rekomendacji

> **Zasada tej recenzji:** oddzielam fakt, wniosek i hipotezę biznesową. To, że zdanie brzmi rozsądnie, nie znaczy jeszcze, że jest dowiedzione. Brak dowodu nie oznacza, że zdanie jest fałszywe — oznacza, że nie powinno być publikowane jako fakt bez dodatkowej weryfikacji.

---

## 1. Streszczenie wykonawcze recenzenta krytycznego

### Ogólna ocena pakietu `00–10`

Pakiet jest użyteczny diagnostycznie, ale nie jest jeszcze bezpiecznym planem redakcyjnym. Najmocniejsza, dobrze udokumentowana obserwacja brzmi: serwis pokazuje dwie niespójne hierarchie oferty. Strona główna mówi przede wszystkim o lokalnym wsparciu IT, natomiast blog, część podstron, dokumentacja projektu i endpoint `llms.txt` nadal mówią o procesach, automatyzacji, aplikacjach i AI. Potwierdzają to zarówno snapshot produkcyjny (`01-CURRENT-STATE.md:12-20`, `43-54`), jak i kod (`src/content/site.ts:27-88`, `src/components/footer.tsx:14-21`, `src/app/llms.txt/route.ts:12-33`).

Słabsza część pakietu zaczyna się tam, gdzie diagnoza przechodzi w rekomendację Opcji A. Dokumenty poprawnie wymieniają ryzyko „człowieka od wszystkiego”, lecz mimo tego traktują połączenie lokalnego helpdesku i projektów procesowych jako domyślnie najlepsze. Nie ma danych o leadach, marży, dostępności Tomasza, popycie ani gotowości do reaktywnego wsparcia. „Najlepsza” jest więc na razie hipotezą strategiczną, a nie wynikiem walidacji.

`08-PROPOSED-COPY.md` jest wyraźnie lepsze od obecnej strony pod względem hierarchii problemu, osoby gramatycznej, nazwania kompetencji i CTA. Nie jest jednak gotowe do publikacji. Jest za długie jak na pierwszy ekran, miejscami wraca do języka konsultingowego, zawiera obietnice wymagające potwierdzenia i próbuje rozwiązać brak dowodów większą ilością wyjaśnień. To ostatnie jest szczególnie niebezpieczne: więcej copy nie zastępuje dowodu pracy.

### Pięć najważniejszych ryzyk i ślepych plamek

1. **Opcja A może być kompromisem wygodnym dla autora, ale nieczytelnym dla rynku.** „Od sieci do aplikacji” nie jest jedną kategorią zakupową. Klient z awarią potrzebuje dostępności i zakresu reakcji; klient procesowy potrzebuje diagnozy, dowodu warsztatu, budżetu i procesu wdrożenia. Jedna strona może ich obsłużyć, ale tylko przy bardzo wyraźnych, osobnych wejściach. Sama zmiana H1 tego nie zapewni.
2. **Trust vacuum jest niedoszacowany.** Dla projektu za kilka–kilkadziesiąt tysięcy złotych metoda pracy i opis kompetencji pomagają, lecz nie zastępują portfolio, artefaktu, referencji, publicznego produktu albo rozmowy z polecenia. Pakiet mówi „minimalna warstwa dowodowa”, ale nie rozstrzyga, czy właściciel chce i może ją pokazać.
3. **Raporty mieszają źródło faktów ze stanem dokumentacji.** `PRODUCT.md` opisuje konsultanta procesowego i własne produkty (`PRODUCT.md:19-29`), podczas gdy aktualny kod opisuje lokalne IT (`src/content/site.ts:27-88`). `01` zauważa ten rozdźwięk, ale późniejsze raporty nadal traktują część starych opisów jako „potwierdzoną bazę”. Najpierw trzeba ustalić, które źródło jest aktualną prawdą biznesową.
4. **Lokalne dane i promień obsługi są częściowo dopowiedziane.** Zabrodzie i powiat wyszkowski są obecne w kodzie (`src/app/layout.tsx:101-115`, `src/content/site.ts:209-225`). Pas S8, Wyszków, Radzymin, Wołomin i Warszawa występują głównie jako propozycje w raportach rynkowych, nie jako potwierdzony zasięg operacyjny.
5. **„No-regret” i decyzje strategiczne zostały w rejestrze zmian częściowo wymieszane.** Naprawa duplikatu tytułu i kontekstowego placeholdera formularza są prawie bezdyskusyjne. Zmiana H1, kolejność filarów, los produktów, sitemap i noindex to decyzje zależne od modelu biznesowego. Nie powinny być wdrażane jako jeden pakiet tylko dlatego, że wszystkie dostały etykietę P0/P1/P2.

---

## 2. Weryfikacja faktów i źródeł (fact-check)

### 2.1. Co jest dobrze potwierdzone

| Twierdzenie                                                                                                                 | Weryfikacja                                                                        | Ocena                                                                                |
| --------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------ |
| Obecny H1 strony głównej to „Sprawne IT dla małej firmy i JDG.”                                                             | Snapshot produkcyjny (`/tmp/gv_prod_audit.json:6-8`) i `src/content/site.ts:31-34` | Potwierdzone                                                                         |
| Aktualna strona główna eksponuje sieci, komputery, helpdesk, pocztę i backup, a automatyzację przedstawia jako „dodatkowo”. | `src/content/site.ts:33-34`, `46-88`                                               | Potwierdzone                                                                         |
| Stopka kieruje do SupportFlow, TriageFlow i Kalkulatora ROI.                                                                | `src/components/footer.tsx:14-21`                                                  | Potwierdzone                                                                         |
| `llms.txt` łączy lokalne IT z Cavi, Akta, TriageFlow, SupportFlow oraz stronami branżowymi.                                 | `src/app/llms.txt/route.ts:7-33`                                                   | Potwierdzone                                                                         |
| Produkcja i logistyka mają osobne treści procesowe.                                                                         | `src/content/site.ts:300-471`                                                      | Potwierdzone                                                                         |
| Kod ma dane o Zabrodziu, powiecie wyszkowskim i Polsce.                                                                     | `src/app/layout.tsx:101-115`, `src/content/site.ts:209-225`                        | Potwierdzone                                                                         |
| W kodzie istnieją dwa publiczne produkty Cavi i Akta oraz prywatne przykłady.                                               | `src/content/site.ts:90-148`, `244-266`                                            | Potwierdzone jako stan repozytorium, nie jako obowiązek publikacji                   |
| Widoczny formularz ma pola imię, e-mail, firma i wiadomość; dodatkowo ma honeypot.                                          | `src/components/contact-form.tsx:81-140`                                           | Potwierdzone                                                                         |
| Formularz ma obecnie lokalny placeholder o Wi-Fi i serwisie komputera.                                                      | `src/components/contact-form.tsx:133-139`                                          | Potwierdzone                                                                         |
| Obecna treść zawiera obietnicę odpowiedzi w 24 h w dni robocze.                                                             | `src/content/site.ts:219-221`                                                      | Potwierdzone jako publikowany tekst; niepotwierdzone jako realna zdolność operacyjna |
| Globalny tytuł strony głównej jest tylko nazwą marki.                                                                       | `src/app/layout.tsx:33-39`; snapshot `/tmp/gv_prod_audit.json:1-4`                 | Potwierdzone                                                                         |
| Sitemap obejmuje stare i nowe ścieżki razem.                                                                                | `src/app/sitemap.ts:6-83`                                                          | Potwierdzone                                                                         |

### 2.2. Miejsca, w których raporty nadinterpretują dane

#### A. „Potwierdzone kompetencje” a „potwierdzona oferta”

`PRODUCT.md` mówi o konsultancie, który porządkuje procesy, dane i automatyzacje, oraz wymienia Cavi i Akta jako dowód warsztatu (`PRODUCT.md:19-29`, `50-56`). Aktualny kod strony głównej mówi natomiast o lokalnym IT, a o automatyzacji jako dodatku (`src/content/site.ts:27-88`). `01-CURRENT-STATE.md:28-39` słusznie nazywa to rozjazdem, ale `02`, `05`, `06` i `07` często piszą o „rzeczywiście potwierdzonym połączeniu kompetencji” tak, jakby z tego automatycznie wynikała aktualna, gotowa do sprzedaży oferta.

**Wniosek:** repozytorium potwierdza istnienie opisów, kodu i materiałów wskazujących na kompetencje. Nie potwierdza popytu, aktualnej gotowości do przyjmowania każdego typu projektu, terminów, zakresu utrzymania ani wyników klientów.

#### B. „Working deployment in weeks, not months”

To zdanie występuje w `PRODUCT.md:27`. Nie znalazłem w dostarczonych materiałach metody, zakresu projektu, przykładu ani danych, które uzasadniałyby stałą obietnicę „w tygodnie, nie miesiące”. Nie powinno być używane jako claim marketingowy bez ograniczenia do konkretnego, małego zakresu.

**Bezpieczniej:** „Zaczynam od małego, jasno opisanego etapu. Termin zależy od zakresu, danych i dostępów.”

#### C. Stawki rynkowe nie są stawkami gotovalues

`05-MARKET-SEO-RESEARCH.md:20-23` i `/tmp/gv_market_sources.md:20-24` podają orientacyjne przedziały: pomoc IT, abonamenty oraz projekty procesowe. To może być materiał do hipotezy cenowej, ale nie dowodzi:

- że wszystkie liczby są reprezentatywne dla rynku;
- że podmioty porównawcze mają porównywalny zakres;
- że Tomasz może lub chce przyjąć taki cennik;
- że projekt za 4 000–30 000+ zł będzie sprzedawalny z obecnej strony.

`06-POSITIONING-OPTIONS.md:86-94` wpisuje te liczby do macierzy potencjału przychodowego. To jest wniosek modelowy, nie fakt. W przyszłej wersji należy oznaczyć go jako „orientacyjna hipoteza z jednego zestawu źródeł”, nie jako przewidywanie przychodu.

#### D. „Topical authority” bloga

`07-CONTENT-ARCHITECTURE.md:82` nazywa 17 artykułów „ogromnym zasobem topical authority”. Kod potwierdza tematykę artykułów (`src/content/blog.ts:11-28`), a snapshot potwierdza ich obecność. Nie ma jednak danych o pozycjach, kliknięciach, linkach, indeksacji każdego wpisu ani leadach z bloga. „Topical authority” jest tu hipotezą SEO, nie zaobserwowanym aktywem.

#### E. „Wzrost konwersji”, „spadek konwersji” i problemy CRO

`04-UX-CRO-AUDIT.md:7` uczciwie zastrzega, że problemy konwersyjne są wykrytym tarciem, a nie zmierzonym spadkiem. To dobre zastrzeżenie. Należy je jednak zachować przy całym użyciu tego raportu. Nie można pisać, że zmiana CTA „podniesie konwersję” bez testu. Można powiedzieć: „powinna zmniejszyć niepewność, do zweryfikowania testem”.

#### F. Lokalizacja i obszar obsługi

Zabrodzie, powiat wyszkowski i Polska są potwierdzone w kodzie (`src/app/layout.tsx:107-115`, `src/content/site.ts:223-225`). „Pas S8”, Wyszków, Radzymin, Wołomin i Warszawa pojawiają się jako pomysł SEO/obsługi (`05:58`, `05:96-99`, `07:83`), ale nie jako potwierdzona gotowość do dojazdu. Propozycja copy nie powinna rozszerzać obietnicy poza to, co właściciel świadomie zatwierdzi.

#### G. `Cavi` i `Akta`

Ich istnienie i linki są w repozytorium (`src/content/site.ts:90-120`, `244-266`) oraz w `public/llms.txt:13-15`. To potwierdza własne produkty / przykłady warsztatu. Nie potwierdza:

- ich aktualnego utrzymania;
- skali użycia i użytkowników;
- wyników biznesowych;
- podobieństwa do problemów klienta MŚP;
- zgody na publikowanie ich jako dowodu na każdej stronie.

`06:103-105` dobrze rozdziela własne produkty od referencji klientów, ale `08:173` proponuje opis, który nie rozstrzyga jeszcze, czy są to aktywne produkty, archiwum czy tylko portfolio.

#### H. Wpis o „~120h miesięcznie”

`07:82`, `10:18`, `05:340` słusznie wskazują konieczność weryfikacji. To nie jest jeszcze dowód, że wpis jest fałszywy. Jest natomiast dowód ryzyka: sam tytuł brzmi jak opublikowany wynik klienta. Do czasu uzyskania źródła należy traktować go jako niezweryfikowany claim, a nie jako case study. Nie wystarczy dopisać słowo „przykład”; cały tekst musi jasno odróżniać model obliczeniowy od realnego wdrożenia.

#### I. „24 h” i „1 dzień roboczy”

Aktualny kod publikuje „Odpowiadam w 24h w dni robocze” (`src/content/site.ts:219-221`). `08:62`, `134` utrzymuje tę obietnicę w formie „w ciągu 1 dnia roboczego”, a `10:22` mówi o jej ujednoliceniu. Żaden z dostarczonych materiałów nie dowodzi, że Tomasz może utrzymać tę regułę przy pracy projektowej, awariach i urlopie.

**Decyzja:** właściciel musi potwierdzić, czy to jest realny standard odpowiedzi, czy tylko aspiracja. Jeśli nie ma systemu zastępstwa i jasnych godzin, bezpieczniej napisać „Zwykle odpowiadam w dni robocze” albo w ogóle nie podawać czasu.

#### J. Podstrony SupportFlow, TriageFlow, produkcja, logistyka i ROI

Raporty poprawnie wykrywają rozjazd formularza i stopki. Nie rozstrzygają jednak statusu biznesowego tych tras. `src/app/sitemap.ts:39-67` dowodzi indeksowania w sitemapie, ale nie dowodzi, że strony są aktywnymi ofertami ani że trzeba je usunąć. `07:73-85` przedstawia kilka wariantów (zostawić, noindex, zarchiwizować), lecz `10` nadal układa część działań tak, jakby decyzja była już podjęta.

#### K. „Schema.org oznacza Tomasza jako founder”

`src/app/layout.tsx:129-133` istotnie używa typu `Person` z `name`, ale w odczytanym fragmencie nie ma pola `jobTitle: founder`. Słowo „founder” może występować na stronie SupportFlow, lecz nie należy przypisywać go samemu Schema.org bez dokładnego wskazania. To drobny, ale wymowny przykład potrzeby rozdzielania obserwacji od interpretacji.

#### L. Aktualny formularz a propozycja „kontekstowych propów”

`10:14` rekomenduje propsy `messagePlaceholder`, `messageLabel`, `submitLabel`. To rozsądna implementacyjnie sugestia, ale nie fakt o istniejącej architekturze: `ContactForm` nie przyjmuje obecnie propsów (`src/components/contact-form.tsx:11-15`) i ma twardo wpisane teksty (`:126-169`). Ponadto propozycja `08:137-142` dotyczy formularza na stronie głównej, a nie opisuje pełnej macierzy kontekstów wszystkich tras. To trzeba zaprojektować, nie tylko przepisać.

### 2.3. Wrażliwe twierdzenia — werdykt

| Obszar                             | Werdykt recenzenta                                                                                                |
| ---------------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| Usunięcie Cavi/Akta z frontu       | Potwierdzone jako kierunek/stan publicznej strony w audycie; nie jest to dowód, że należy je ukrywać bezterminowo |
| Artykuł `~120h`                    | Niezweryfikowany claim wymagający sprawdzenia źródła lub zmiany całego framingu                                   |
| Zabrodzie / powiat wyszkowski      | Potwierdzone w kodzie i Schema.org                                                                                |
| Pas S8 / dalszy promień dojazdu    | Niepotwierdzone; wymaga odpowiedzi właściciela                                                                    |
| 24 h / 1 dzień roboczy             | Tekst istnieje; zdolność operacyjna niepotwierdzona                                                               |
| `/supportflow`, `/triageflow`      | Istnieją, są publiczne i w sitemapie; ich przyszły status nie jest rozstrzygnięty                                 |
| `/kalkulator-roi`                  | Istnieje; użyteczność dla obecnej strony zależy od dopasowania CTA i modelu oferty                                |
| `/dla-produkcji`, `/dla-logistyki` | Istnieją i mają sensowną treść problemową; brak dowodu, że są priorytetowymi segmentami sprzedaży                 |

---

## 3. Mapa sprzeczności i rozbieżności między agentami oraz syntezą

| Spór                                          | Argument za pierwszą stroną                                                                     | Argument za drugą stroną                                                                                                                                | Jak rozstrzyga `06–10`                                                                           | Czy decyzja właściciela została zamaskowana?                                                                                           |
| --------------------------------------------- | ----------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------- |
| **Rola lokalnego IT na stronie głównej**      | Agent 1/2: lokalne IT jest realnym wejściem, może dać szybszy popyt i retainer.                 | Agent 3: zostawienie lokalnego H1 może być prostsze i czytelniejsze dla lokalnego odbiorcy; Agent 1/2: w obecnej hierarchii spycha markę do serwisu PC. | Opcja A: lokalne IT zostaje, ale schodzi do osobnej ścieżki; H1 ma być nadrzędny.                | **Tak.** Nie wiadomo, czy właściciel chce gotowości do awarii i wizyt, czy tylko nie chciał, by jego kompetencje zostały pomniejszone. |
| **3 czy 4 filary**                            | 4 obecne wiersze są proste do skanowania i zachowują język usług.                               | 3 filary lepiej grupują ofertę i przestają przedstawiać automatyzację jako dodatek.                                                                     | `07` i `08` przyjmują 3 filary: procesy/dane, aplikacje, stabilne IT.                            | **Częściowo.** To decyzja architektury komunikatu, ale wynika z niepotwierdzonej hierarchii przychodów.                                |
| **Pozycja usług procesowych wobec lokalnych** | Projekty procesowe wykorzystują blog, doświadczenie i wyższy potencjał wartości.                | Lokalne IT może być tym, czego Tomasz faktycznie chce i co szybciej sprzedaje.                                                                          | Synteza rekomenduje Opcję A jako „najlepszą”.                                                    | **Tak.** Brakuje danych o preferowanym miksie pracy, marży i leadach.                                                                  |
| **Cavi/Akta**                                 | Agent 1/4: własne produkty są uczciwym dowodem budowania i lepszym niż same deklaracje.         | Właściciel świadomie usunął przykłady z frontu; nie należy przywracać ich bez zgody.                                                                    | `06` zostawia je jako opcjonalną decyzję, ale `08` buduje copy bez nich.                         | **Nie w pełni.** Alternatywa jest zapisana, lecz rekomendacje nadal zakładają, że brak dowodu da się zastąpić metodą i opisem.         |
| **SupportFlow/TriageFlow**                    | Mogą być produktami, demonstracją albo ruchem do automatyzacji.                                 | Są w innym tonie, z ceną, founderem i CTA o kliencie referencyjnym; łamią bieżącą narrację.                                                             | Usunięcie ze stopki i `llms.txt`; noindex, archiwum lub przekierowanie zostawione właścicielowi. | **Nie.** Spór jest widoczny, ale rejestr zmian mógłby mocniej oznaczyć go jako blocker przed zmianą sitemap/robots.                    |
| **Produkcja/logistyka**                       | `05/07`: dobre wejścia problemowe i materiał dla outreachu; wykorzystują kompetencje procesowe. | Brak dowodu priorytetu, referencji i wydolności jednej osoby; mogą zawęzić markę zbyt wcześnie.                                                         | Zostawić, skrócić nagłówki i dopasować formularze.                                               | **Tak, częściowo.** „Zostawić” jest już decyzją, choć status segmentów nadal jest pytaniem do właściciela.                             |
| **Hero: lede czy zwięzłość**                  | Agent 2/3: jedno zdanie pod H1 objaśnia zakres bez klikania w rysunek.                          | `DESIGN.md` wymaga zwięzłości, czystych proporcji first viewport i niechęci do dodatkowego sloganu.                                                     | `08` dodaje lede oraz rozbudowuje rysunek i tabelę.                                              | **Tak.** Nie ma makiety ani testu wysokości pierwszego ekranu.                                                                         |
| **Rozbudowane „O mnie”**                      | Pokazuje doświadczenie operacyjne i odsuwa etykietę serwisanta.                                 | Długie CV przed dowodem pracy może brzmieć jak deklaracja kompetencji.                                                                                  | `08` dodaje pełny akapit i tabelę faktów.                                                        | **Tak.** Właściciel musi zdecydować, czy chce komunikować tę biografię i czy jest gotów ją udokumentować publicznie.                   |
| **7–8 FAQ**                                   | Rozbraja obiekcje obu ścieżek.                                                                  | Może wydłużyć arkusz, powtarzać ofertę i obciążyć stronę.                                                                                               | `07/08` proponują 8 pytań.                                                                       | **Tak.** Liczba pytań nie wynika z testów ani ograniczeń projektu.                                                                     |
| **Cennik i widełki**                          | `05` pokazuje rynek i zachęca do kwalifikacji.                                                  | Ceny w starym SupportFlow mogą być nieaktualne; publiczny cennik bez zakresu przyciąga złe zapytania.                                                   | Nowe copy nie publikuje cen, FAQ mówi o wycenie etapowej/godzinowej.                             | **Tak.** Nie potwierdzono modelu rozliczeń, minimalnego zlecenia ani gotowości do stawek godzinowych.                                  |
| **Marka gotovalues czy Tomasz Gołaszewski**   | `gotovalues` może wyglądać jak oferta; nazwa osobista buduje zaufanie do jednej osoby.          | Nazwa marki jest już ustalona, a „ja” jest spójne z modelem niezależnego wykonawcy.                                                                     | `08` używa gotovalues jako marki i Tomasza w „O mnie”.                                           | **Tak.** Nie rozstrzygnięto, czy docelowo marka ma pozostać osobistą usługą, czy kiedyś obsługiwać innych wykonawców.                  |
| **Blog**                                      | 17 tematów daje gotową bazę pod procesy/AI.                                                     | Nie ma dowodu ruchu ani leadów; tematyka może przyciągać osoby szukające informacji, nie usług.                                                         | Zostawić, klastryzować i linkować.                                                               | **Tak.** To hipoteza SEO bez danych Search Console/Analytics.                                                                          |
| **Dowód bez case studies**                    | Metoda, scenariusze, artefakty i własne produkty mogą pomóc.                                    | Przy dużym projekcie deklaracje nie zastąpią referencji, zakresu, zrzutu, demo lub rozmowy z polecenia.                                                 | Pakiet zakłada, że „skromna warstwa dowodowa” wystarczy, ale nie ma planu minimum.               | **Tak.** To najważniejsza luka strategiczna całego pakietu.                                                                            |

### Opis najważniejszych sporów

`06` jest uczciwe, gdy wymienia cztery warianty, ale staje się mniej ostrożne w sekcji rekomendacji. Macierz nadaje oceny `5/5`, „bardzo wysokie” i „średnia–wysoka” (`06:86-94`), choć nie podaje modelu punktacji ani danych wejściowych. Te liczby sprawiają wrażenie obiektywnego pomiaru, mimo że są opinią analityczną.

Największy spór nie dotyczy samego copy. Dotyczy tego, czy Tomasz chce prowadzić dwa różne typy działalności jedną osobą. Jeśli odpowiedź brzmi „tak”, Opcja A może być sensowną architekturą dwóch ścieżek. Jeśli odpowiedź brzmi „nie”, tekst A będzie eleganckim opakowaniem niewykonalnej obietnicy.

---

## 4. Podważenie słabych, ryzykownych lub nieuzasadnionych rekomendacji

### 4.1. Pułapka Wariantu A: „najlepsze z obu światów”

To może działać tylko pod czterema warunkami:

1. lokalne IT ma osobny zakres reakcji, godziny, obszar i sposób rozliczeń;
2. projekty procesowe mają osobny CTA, kwalifikację i oczekiwania co do terminu;
3. homepage nie próbuje opowiedzieć wszystkiego równą wagą;
4. Tomasz ma fizyczną i psychiczną pojemność na przełączanie między awarią a projektem.

Obecny materiał nie dowodzi żadnego z tych warunków. `site.ts:68-75` zawiera jednocześnie „większość spraw rozwiązuję zdalnie od ręki” i obietnicę lokalnego przyjazdu. `08:77` dodaje z kolei aplikacje, AI, NAS, VPN, helpdesk i backup w jednym filarze. Dla odbiorcy może to oznaczać „wszystko dla każdego”, nie „jedna osoba rozumie całość”.

**Ocena:** A jest rozsądną hipotezą architektury serwisu, ale nie należy nazywać jej najlepszą strategią biznesową. Lepszy opis: „najmniej destrukcyjny wariant komunikacyjny, jeśli właściciel chce utrzymać oba typy pracy”.

**Test przed wdrożeniem:** pokaż dwa osobne wejścia pięciu osobom z każdego segmentu i sprawdź, czy po 5 sekundach potrafią wskazać właściwą ścieżkę. Następnie sprawdź, czy właściciel potrafi podać osobno: minimalne zlecenie, czas reakcji i granice obsługi dla obu torów.

### 4.2. Trust vacuum i projekty za 10–30+ tys. zł

Bez case studies, referencji, próbek, publicznych produktów lub rozmowy z polecenia strona ma głównie cztery rodzaje dowodu:

- opis metody;
- opis biografii i stacku;
- istniejące artykuły;
- formularz i bezpośredni kontakt.

To może wystarczyć do pierwszej rozmowy z osobą, która już zna Tomasza albo trafiła z polecenia. Nie ma podstaw, by zakładać, że wystarczy do zimnego ruchu oceniającego duży projekt. Właściciel firmy nie kupuje samej technologii; kupuje mniejsze ryzyko. Tekst „pełna własność kodu” nie pokazuje, czy wykonawca dowozi zakres, utrzymuje system, dokumentuje pracę i reaguje po wdrożeniu.

**Co uczciwie może zastąpić case studies:**

- publiczne, opisane własne produkty Cavi i Akta — jako własne projekty, nie klienci;
- krótkie, rzeczywiste artefakty procesu z anonimizacją, jeśli Tomasz ma prawo je pokazać;
- zanonimizowane fragmenty architektury, workflow, walidacji OCR lub dashboardu, wyraźnie oznaczone jako przykład techniczny;
- konkretna checklista pierwszego etapu i kryteria „co uznamy za gotowe”;
- demonstracja na syntetycznych danych, jasno oznaczonych jako syntetyczne;
- referencje dopiero po uzyskaniu zgody.

**Czego nie zastąpią same słowa:**

- brak dowodu, że projekt był używany;
- brak dowodu, że zakres został dowieziony;
- brak dowodu utrzymania i bezpieczeństwa;
- brak odpowiedzi na pytanie, dlaczego ten wykonawca, a nie większa firma.

Nie należy przywracać Cavi/Akta na siłę, jeśli właściciel świadomie zrezygnował z tej ekspozycji. Trzeba jednak wtedy zaakceptować dłuższy cykl sprzedaży i większą zależność od poleceń/outreachu.

### 4.3. Napięcie z `DESIGN.md`

`DESIGN.md:15-43`, `60-65` definiuje duży, gęsty, zwięzły język rysunku technicznego, a `250-269` wymaga arkuszy, proporcji, braku zbędnego sloganu i ograniczenia tekstu. Propozycja `08` dodaje równocześnie:

- lede pod H1 (`08:35-37`);
- cztery rewizje z długimi opisami (`08:49-54`);
- trzy obszerne filary (`08:71-77`);
- pięć zasad pracy (`08:79-85`);
- długi akapit biograficzny i tabelę faktów (`08:89-100`);
- osiem FAQ (`08:104-123`);
- rozbudowany kontakt (`08:127-142`).

Każdy element osobno ma sens. Razem mogą zabić to, co w projekcie jest wyjątkowe: szybkie odczytanie arkusza, rytm linii i kontrolowaną ciszę. Lede nie powinien być drugim sloganem. O mnie nie powinno być CV. FAQ nie powinno powtarzać oferty.

**Rekomendacja:** przed wdrożeniem zrobić makietę treści na desktopie i mobile z limitami:

- H1: maksymalnie 2 wiersze na typowym desktopie i 3 na mobile;
- lede: maksymalnie 2 krótkie wiersze desktop / 4 mobile;
- każda rewizja: nazwa + jedno zdanie, bez pełnych akapitów;
- filar: jedno zdanie wartości + maksymalnie 3 punkty;
- FAQ: zacząć od 5 pytań, a dwa–trzy dodać tylko po testach;
- O mnie: jeden akapit i trzy fakty, nie pełna tabela kompetencji.

### 4.4. SEO lokalne kontra ogólnopolskie

`05` słusznie rozdziela trzy poziomy rynku (`05:21-34`) i proponuje osobną stronę lokalną. Przecenia jednak prawdopodobnie siłę samego contentu. Jedna domena i jedna osoba mogą mieć widoczność na frazy niszowe, ale nie ma podstaw, by zakładać szybką konkurencję z silnymi serwisami na ogólnopolskie frazy „automatyzacja procesów”, „dedykowane aplikacje webowe” czy „AI dla firm” bez czasu, linków, dystrybucji i dowodu.

Wniosek „17 artykułów = zasób topical authority” należy zastąpić ostrożniejszym:

> „Domena ma już tematyczny materiał, który warto uporządkować i testować; jego wartość SEO trzeba sprawdzić danymi z Search Console i analityki.”

Lokalne SEO też nie jest automatycznym wygranym. Konkurenci w `/tmp/gv_market_sources.md:2-11` mają dłuższą obecność, lokalny adres, sklep, umowy lub SLA. Sama nazwa Zabrodzia nie wyrówna braku opinii i historii.

### 4.5. Pierwotny impuls właściciela

Z materiałów wynika ważne rozróżnienie: Tomasz wcześniej chciał szerszej oferty dla małych firm/JDG i lokalnego kontekstu Zabrodzia/powiatu wyszkowskiego (`00:9-16`, `02:386-400`). Późniejsze niezadowolenie nie dowodzi, że sam pomysł lokalnego IT był błędem.

Bardziej prawdopodobne są dwa osobne problemy:

1. **Wykonanie:** lokalne IT zostało wysunięte tak mocno, że wyższe kompetencje stały się „dodatkiem”; zniknęła hierarchia i dowód inżynieryjny.
2. **Ryzyko modelu:** może się okazać, że właściciel nie chce przyjmować reaktywnych awarii, dojazdów i zobowiązań helpdeskowych.

Audyt powinien zadać pytanie o tę różnicę wprost, zamiast wnioskować, że naprawą jest zawsze hybryda A.

---

## 5. Lista niepotwierdzonych założeń do odpowiedzi właściciela

1. Jaki udział przychodu Tomasz chce uzyskiwać z lokalnego IT, abonamentów, projektów procesowych i aplikacji?
2. Czy chce przyjmować awarie i interwencje reaktywne, czy tylko planowane uporządkowanie środowiska?
3. Jaki jest realny obszar dojazdu: tylko Zabrodzie/powiat wyszkowski, czy także Wyszków, pas S8, Radzymin, Wołomin i Warszawa?
4. Czy „odpowiedź w 24 h / 1 dzień roboczy” jest obecnie możliwą regułą, także podczas realizacji projektu i urlopu?
5. Czy istnieje jakikolwiek system zastępstwa, gdy klient helpdeskowy ma awarię, a Tomasz jest w projekcie?
6. Czy lokalne IT ma być ofertą docelową, wejściową do projektów, czy tylko opcją dla poleceń?
7. Czy Tomasz chce samodzielnie sprzedawać i dowozić projekty za 10–30+ tys. zł, włącznie z analizą, wdrożeniem, dokumentacją i utrzymaniem?
8. Jaki jest minimalny akceptowany budżet i minimalny zakres zlecenia dla obu ścieżek?
9. Czy stawka godzinowa, wycena etapowa, abonament i dojazd są faktycznie dostępne w oferowanym modelu?
10. Czy Tomasz ma prawo publicznie pokazywać zanonimizowane artefakty, screeny, architekturę lub workflow z wcześniejszych prac?
11. Czy Cavi i Akta mają być publicznie eksponowane jako własne produkty, pokazane na osobnej stronie, czy nadal ukryte?
12. Czy Cavi i Akta są aktualnie utrzymywane i działające dla zewnętrznego odbiorcy?
13. Czy tekst o `~120h` opisuje prawdziwe wdrożenie, model obliczeniowy, czy materiał edukacyjny bez konkretnego klienta?
14. Czy SupportFlow i TriageFlow są aktywną ofertą, eksperymentem, demonstracją, czy archiwum?
15. Czy ceny „od 4 000 PLN” w SupportFlow są nadal aktualne i czy mają pozostać publiczne?
16. Czy produkcja i logistyka są realnymi segmentami sprzedaży, czy tylko przykładami problemów, które mogą wystąpić?
17. Czy doświadczenie w leasingu, asset management, wycenie maszyn i cyfryzacji może być opisane publicznie w proponowany sposób i czy Tomasz chce je eksponować?
18. Czy „pełna własność kodu, baz i konfiguracji” jest prawnie i umownie prawdziwą zasadą każdego zlecenia?
19. Czy „na życzenie podpisuję NDA” jest faktycznie możliwe i czy Tomasz ma gotowy proces/umowę?
20. Co dokładnie znaczy „podstawowe bezpieczeństwo danych”, „testowany backup” i „kontrola jakości AI”? Jakie są granice odpowiedzialności?
21. Czy marka ma pozostać usługą osobistą Tomasza, czy ma w przyszłości obejmować innych wykonawców?
22. Czy blog generuje ruch, zapytania lub kontakty? Bez Search Console/analytics nie można nazywać go aktywem sprzedażowym.
23. Czy aktualne treści mają być w całości polskie, czy wybrane terminy SEO (OCR, AI, KPI, helpdesk) pozostają świadomie?
24. Czy osobne wejścia lokalne i procesowe będą miały osobne CTA, formularze i czas odpowiedzi?

---

## 6. Krytyczna ocena wykonalności wariantów A, B, C, D

Poniższa macierz nie przewiduje wyniku. Pokazuje warunki i ryzyka na podstawie dostępnych materiałów. Nie ma danych o konwersji, pipeline, marży ani dostępności, dlatego oceny są jakościowe.

| Kryterium                                               | A — dwa tory                                                                                  | B — konsultant procesowy                                                                                 | C — lokalny partner IT                                                                         | D — specjalizacja branżowa                                                       |
| ------------------------------------------------------- | --------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------- |
| **Czas do pierwszego płatnego zlecenia z samej strony** | Potencjalnie średni: lokalny problem może skrócić wejście, ale szeroka oferta utrudnia wybór. | Raczej długi: potrzebne zaufanie, dowód i doprecyzowanie problemu.                                       | Potencjalnie najkrótszy przy pilnej potrzebie lokalnej, ale nie ma gwarancji ruchu ani opinii. | Najdłuższy: wąska intencja i potrzeba branżowego zaufania.                       |
| **Wydolność jednej osoby**                              | Największe ryzyko przełączania kontekstu i SLA; wymaga twardego rozdziału.                    | Lepsza kontrola kalendarza, jeśli projekty są planowane; nadal duże ryzyko sprzedaży i realizacji naraz. | Ryzyko dyżurów, dojazdów i przerywania pracy projektowej.                                      | Lepsza specjalizacja, ale projekty mogą być cięższe i wymagać długiej obecności. |
| **Średni bilet**                                        | Mieszany: małe interwencje/abonament + większe etapy; trudny do zakomunikowania.              | Najwyższy potencjał projektowy, lecz niepotwierdzony popyt.                                              | Niski–średni, zależny od abonamentu i dostępności.                                             | Wysoki potencjał, ale długi cykl i większa odpowiedzialność.                     |
| **Cashflow**                                            | Mieszany; abonament może stabilizować, ale reaktywność zjada czas.                            | Projektowy i nieregularny bez stałego źródła leadów.                                                     | Najbardziej przewidywalny przy prawdziwych umowach opieki; jednocześnie kosztowny operacyjnie. | Najmniej przewidywalny bez pipeline’u branżowego.                                |
| **Ryzyko wizerunkowe**                                  | „Od wszystkiego”, jeśli ścieżki nie będą osobne.                                              | „Konsultant AI bez dowodów”, jeśli nie pokaże pracy.                                                     | „Serwis komputerowy”, jeśli komunikat wróci do napraw PC.                                      | „Specjalista od branży”, jeśli brak referencji.                                  |
| **Odwracalność za 6 miesięcy**                          | Średnia: można rozdzielić strony, ale przyjęte leady i obietnice zostają.                     | Dość wysoka komunikacyjnie; trudniej odzyskać lokalny ruch.                                              | Dość wysoka lokalnie, ale kosztowna wizerunkowo przy późniejszym powrocie do projektów.        | Najniższa rynkowo: wąskie pozycjonowanie może odciąć inne zapytania.             |

### Kiedy wygrywa inny wariant niż A

- **Wariant B wygrywa**, jeśli Tomasz chce prawie wyłącznie planowanych projektów procesowych, nie chce dyżurów ani dojazdów i jest gotów zaakceptować dłuższy cykl sprzedaży. Wtedy lokalne IT powinno zostać osobną, nieeksponowaną usługą albo osobną marką.
- **Wariant C wygrywa**, jeśli najważniejsze są szybki lokalny cashflow, abonamenty i praca przy infrastrukturze, a Tomasz akceptuje reaktywność oraz niższy sufit cenowy. Wtedy blog i strony AI powinny być archiwum lub osobnym torem.
- **Wariant D wygrywa**, jeśli istnieje realny dostęp do osób decyzyjnych w produkcji/logistyce oraz prawdziwe przykłady problemów. Bez tego jest tylko elegancką specjalizacją na papierze.
- **Wariant A wygrywa**, jeśli Tomasz rzeczywiście chce obu rodzajów pracy, ma czas na dwa rytmy operacyjne i zgodzi się na osobne wejścia, zasady oraz CTA. Nie wygrywa tylko dlatego, że zachowuje najwięcej treści w repozytorium.

---

## 7. Krytyczny audyt proponowanych tekstów (`08` kontra obecna strona)

### 7.1. Werdykt jakościowy

**Tak, `08-PROPOSED-COPY.md` jest merytorycznie lepsze od obecnej strony, ale nie jest jeszcze publikowalną wersją.**

Realne poprawy:

- przesuwa automatyzację i aplikacje z pozycji „dodatkowo” do jawnych filarów (`08:71-77` vs `src/content/site.ts:78-86`);
- nazywa doświadczenie operacyjne, którego obecna strona nie pokazuje (`08:91-100` vs `src/content/site.ts:181-206`);
- zastępuje ogólne „Napisz” bardziej informacyjnym CTA (`08:56-62`, `127-142`);
- zauważa problem kontekstowego formularza;
- oddziela własne produkty od referencji klientów;
- proponuje lepszą logikę „gotowiec → integracja → automatyzacja → aplikacja”.

Zmiany dyskusyjne:

- H1 „Porządkuję IT, dane i codzienną pracę w małej firmie” nadal jest szeroki i mało charakterystyczny. Jest lepszy strategicznie, ale nie dowodzi, dlaczego akurat gotovalues.
- Lede zawiera dużo zakresu i może być nieczytelny w pierwszym ekranie.
- „W ciągu 1 dnia roboczego” jest przepisaniem niezweryfikowanej obietnicy 24 h.
- „Pełna własność kodu” i „testowany backup” są obietnicami procesowo-prawnymi, nie tylko copy.
- Osiem FAQ i pełna tabela kompetencji mogą zwiększyć długość bez zwiększenia zaufania.
- „MŚP i JDG” w jednym zdaniu pozostaje szerokie: to nie zawsze ten sam problem, budżet ani język.

### 7.2. Fragmenty brzmiące sztucznie, konsultingowo lub zbyt szeroko

| Cytat z `08`                                                                                                                                                                  | Diagnoza                                                                                                  | Ostrzejszy zamiennik / decyzja                                                                                                                 |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| „Od stabilnej sieci, sprzętu i opieki IT po integracje, raportowanie i dedykowane narzędzia — zaczynam od diagnozy problemu, nie od sprzedaży gotowego pakietu.” (`08:36-37`) | Długa lista w lede; „sprzedaż gotowego pakietu” jest kontrastem marketingowym, nie konkretnym rezultatem. | „Najpierw sprawdzam, co blokuje pracę. Potem porządkuję IT, dane albo proces — tylko w potrzebnym zakresie.”                                   |
| „Kontrola i porządek” (`08:45`)                                                                                                                                               | Ogólnik. Nie wiadomo, co użytkownik zobaczy po wdrożeniu.                                                 | „Jedna wersja danych i jasny następny krok” — jeśli to jest faktycznym celem, albo wyciąć z SVG.                                               |
| „Tabela zmian: od problemu do adekwatnego rozwiązania” (`08:47`)                                                                                                              | „Adekwatne” brzmi urzędowo i abstrakcyjnie.                                                               | „Od problemu do rozwiązania” albo „Kolejne możliwe kroki”.                                                                                     |
| „dane krążą między Excelem, mailem i systemami” (`08:51`)                                                                                                                     | Zrozumiałe, ale razem z resztą wiersza przeciążone.                                                       | „Dane są w kilku miejscach. Zespół przepisuje je ręcznie.”                                                                                     |
| „połączone źródła, automatyczny przepływ i czytelny widok danych” (`08:53`)                                                                                                   | Trzy obietnice bez granicy i dowodu.                                                                      | „Łączę źródła i pokazuję jeden uzgodniony widok.”                                                                                              |
| „dedykowana aplikacja webowa lub automatyzacja AI pod konkretny proces” (`08:54`)                                                                                             | „AI” może przyciągać uwagę mimo braku potrzeby; „pod konkretny proces” jest poprawne, ale ogólne.         | „Aplikacja albo automatyzacja dla jednego, opisanego procesu.” AI dopiero w szczegółach, gdy potrzebne.                                        |
| „Ograniczam ręczne przepisywanie informacji i chaos między mailem, arkuszami a systemami...” (`08:75`)                                                                        | Dobre kierunkowo, lecz „chaos” jest metaforą, a nie zakresem.                                             | „Łączę dane z maila, arkuszy i systemów, żeby zespół nie przepisywał ich ręcznie.”                                                             |
| „czytelne widoki KPI” (`08:75`)                                                                                                                                               | Żargon może być niezrozumiały dla JDG; nie każdy potrzebuje KPI.                                          | „Raporty i widoki potrzebne do codziennych decyzji.” KPI dopiero jako przykład.                                                                |
| „pełna własność kodu, dokumentacja i niskie koszty utrzymania” (`08:76`)                                                                                                      | „Niskie koszty” to obietnica bez zakresu i porównania.                                                    | „Kod i dokumentację przekazuję firmie. Koszt utrzymania ustalamy dla konkretnego zakresu.”                                                     |
| „Zapewniam ciągłość pracy...” (`08:77`)                                                                                                                                       | Brzmi jak gwarancja rezultatu, którego jedna osoba nie może zapewnić bez SLA i zakresu.                   | „Pomagam ograniczyć przestoje: porządkuję sieć, stanowiska, pocztę i kopie zapasowe.”                                                          |
| „Najpierw rozumiem biznes, dopiero potem dobieram technologię.” (`08:81`)                                                                                                     | Slogan konsultingowy; dobra zasada, ale powtarza się w wielu dokumentach.                                 | „Najpierw pytam, gdzie dokładnie powstaje problem. Dopiero potem wybieram narzędzie.”                                                          |
| „Pełna kontrola i bezpieczeństwo po stronie firmy.” (`08:84`)                                                                                                                 | „Pełna” jest absolutem, a bezpieczeństwo jest zbyt szerokie.                                              | „Dostępy, konta i zakres zmian są opisane i pozostają po stronie firmy.”                                                                       |
| „Łączę doświadczenie biznesowo-operacyjne z praktyczną inżynierią IT, analizą danych i tworzeniem oprogramowania.” (`08:92`)                                                  | Gładkie zdanie typu bio na stronę konsultingową; dużo rzeczowników abstrakcyjnych.                        | „Znam pracę operacyjną i buduję narzędzia, które mają ją usprawnić. Pracowałem przy leasingu, aktywach, wycenie maszyn i cyfryzacji procesów.” |
| „Dzięki temu patrzę na technologię oczami właściciela...” (`08:93`)                                                                                                           | Nieostre i autopromocyjne; nie wiadomo, co to zmienia w pracy.                                            | „Zaczynam od tego, co zespół musi zrobić, a nie od listy funkcji.”                                                                             |
| „Nie musisz szukać osobnej firmy do każdego etapu.” (`08:109`)                                                                                                                | Obietnica szerokiej odpowiedzialności i potencjalnego lock-inu.                                           | „Jeśli zakres wykracza poza moje możliwości, powiem to przed startem.”                                                                         |
| „Zawsze Twoja firma.” (`08:121`)                                                                                                                                              | Absolut prawny. Wymaga zgodności z umową, licencjami i konkretnym zakresem.                               | „Ustalamy w umowie, które konta, dane i prawa do kodu pozostają po stronie firmy.”                                                             |
| „korzystam ze środowisk wykluczających trenowanie modeli na danych klienta” (`08:123`)                                                                                        | Techniczna obietnica zależna od dostawców, konfiguracji i warunków usług; brak źródła.                    | Usunąć z copy ogólnego albo opisać dopiero przy konkretnym rozwiązaniu i polityce danych.                                                      |
| „Na życzenie podpisuję NDA przed rozmową...” (`08:123`)                                                                                                                       | Twierdzenie o gotowej praktyce prawnej niepotwierdzone w źródłach.                                        | Zostawić tylko po potwierdzeniu procesu; inaczej: „Możemy ustalić zasady poufności przed przekazaniem szczegółów.”                             |
| „Dziękuję za wiadomość... wrócę z oceną możliwych rozwiązań w ciągu 1 dnia roboczego.” (`08:62`)                                                                              | Obietnica terminu i „oceny” przed poznaniem procesu.                                                      | „Dziękuję. Odpowiem, czy widzę sensowny następny krok.” Czas dopisać dopiero po potwierdzeniu.                                                 |
| „Opisz temat, który chcesz uporządkować” (`08:129`)                                                                                                                           | „Uporządkować” nie obejmuje pilnej awarii i może odstraszyć lokalnego klienta.                            | Na stronie głównej: „Opisz, co dziś blokuje pracę”. Na lokalnej: „Zapytaj o wsparcie IT”.                                                      |
| „Niezależny partner technologiczny” (`08:173`)                                                                                                                                | Kategoria szeroka i konsultingowa; nie mówi od razu, co klient może kupić.                                | W `llms.txt` można użyć jako skrótu, ale poprzedzić konkretnym zakresem: „Pomagam firmom uporządkować IT, dane i powtarzalną pracę.”           |

### 7.3. Ocena wariantów Hero B i C

- **Wariant B** (`08:148-151`) jest najczytelniejszy dla strony procesowej. „Raportowanie danych” i „automatyzacja z AI” nadal są technologiami/hasłami, a nie problemami. Jeśli wybór padnie na B, trzeba dopisać konkretne wejścia: dokumenty, statusy, ręczne przepisywanie, wyjątki.
- **Wariant C** (`08:153-156`) jest lepszy od obecnego H1, bo nie mówi „naprawiam laptopa”, ale nadal łączy lokalne IT z automatyzacją w jednym zdaniu. To może być właściwy wariant przy priorytecie lokalnego cashflow, lecz nie rozwiązuje sam z siebie problemu osobnej ścieżki procesowej.
- **Wariant A** jest najpełniejszy, ale właśnie dlatego najłatwiej staje się katalogiem. Nie powinien być wybierany bez testu 5-sekundowego i bez decyzji operacyjnej.

### 7.4. Ocena `/jak-pracuje`

`08:162-164` jest lepsze od obecnego defensywnego wstępu. Nadal jednak „konfigurację, integrację, automatyzację albo dedykowaną aplikację” powtarza schemat z homepage. Ta strona powinna odpowiedzieć przede wszystkim na trzy pytania: co dzieje się przed wyceną, jaki jest pierwszy zakres i kiedy Tomasz odmawia budowy. Nie powinna być kolejną listą usług.

Najlepszy fragment to zasada „najpierw problem, potem technologia”, ale trzeba ją poprzeć konkretnym przebiegiem: rozmowa → dostępne dane → mały zakres → kryterium odbioru → decyzja o utrzymaniu.

### 7.5. Ocena docelowego `llms.txt`

Fragment `08:170-173` jest spójniejszy od obecnego `src/app/llms.txt/route.ts:12-33`, ale nadal ma trzy ryzyka:

1. „MŚP i JDG” plus pełny zakres lokalny i ogólnopolski nadal opisuje bardzo szeroką firmę.
2. „zapewnia bieżącą opiekę IT” brzmi jak gotowa usługa o określonej dostępności, której parametry nie są ustalone.
3. Nie wskazuje, co jest priorytetem, a co osobnym wejściem.

`llms.txt` powinien być krótką, aktualną mapą oferty, nie miejscem, gdzie zachowujemy wszystkie stare trasy. Najpierw trzeba rozstrzygnąć status stron, a dopiero potem przepisać plik. W przeciwnym razie powstanie spójny opis tekstowy, który nadal będzie rozmijał się z sitemapą, stopką i stronami.

---

## 8. Krytyczna ocena rejestru zmian (`10-CHANGE-REGISTER.md`)

### 8.1. Priorytety są częściowo sensowne, ale P0 jest zbyt szerokie

**Słusznie pilne:**

- `CH-01`: tytuł strony głównej jest konkretnym, niskokosztowym brakiem (`10:12`), choć jego treść zależy od wybranego kierunku.
- `CH-03`: lokalny placeholder na stronach procesowych jest realnym błędem kontekstu (`10:14`); tymczasowa neutralna wersja jest bezpieczna.
- `CH-04`: stopka faktycznie reklamuje inne światy (`10:15`), ale samo usunięcie linków wymaga decyzji, czy produkty są aktywne.
- `CH-06`: duplikat marki i anglicyzm w tytule `/jak-pracuje` są łatwe do poprawy, o ile trasa pozostaje.
- `CH-07`: weryfikacja `~120h` jest bezdyskusyjnie potrzebna przed dalszą promocją wpisu.

**P0, ale zależne od strategii:**

- `CH-02`: nowy H1 nie jest naprawą techniczną; to wybór pozycjonowania.
- `CH-05`: synchronizacja sitemap/`llms.txt`/AI endpointów jest potrzebna, ale właściwy zakres zależy od statusu stron i produktów.

**P1, które powinny poczekać na decyzję:**

- `CH-08`, `CH-09`, `CH-10`: filary, rysunek i „O mnie” są rdzeniem Opcji A, nie uniwersalną poprawką.
- `CH-11`, `CH-12`: CTA, czas odpowiedzi, model rozliczeń i obietnice zależą od realnej operacji.
- `CH-14`: nawigacja nie może wybierać między „Jak pracuję” a „Obsługa IT” przed ustaleniem architektury tras.

**P2, które może stać się P1 albo zostać usunięte:**

- `CH-15`: SupportFlow/TriageFlow powinny mieć status decyzji, zanim zostaną opisane jako „P2”. Jeśli są publicznie widoczne i sprzeczne, to jest problem spójności teraz; jeśli są archiwum, noindex/redirect może być P0 technicznym.
- `CH-17`: nowa lokalna strona ma sens dopiero po potwierdzeniu realnego obszaru obsługi i oferty.
- `CH-18`: linkowanie bloga przed ustaleniem strony docelowej może utrwalić złą architekturę.

### 8.2. No-regret fixes

Poniższe działania są bezpieczne niezależnie od wariantu, pod warunkiem użycia neutralnego tekstu:

1. **Zweryfikować i oznaczyć artykuł `~120h`** albo tymczasowo zmienić jego tytuł na jawnie modelowy.
2. **Usunąć duplikat `gotovalues` z tytułu `/jak-pracuje`**, jeśli strona zostaje.
3. **Nie pokazywać placeholdera o Wi-Fi/komputerze na stronach procesowych.** Do czasu pełnego systemu propsów użyć neutralnego tekstu.
4. **Nie publikować niespójnego CTA w stopce.** Jeśli nie ma decyzji o produktach, tymczasowo ograniczyć stopkę do stron, które są potwierdzonymi elementami bieżącej oferty — ale sprawdzić wpływ na nawigację i SEO.
5. **Usunąć lub potwierdzić absoluty**: „od ręki”, „zawsze”, „bez ukrytych kosztów”, „w 24 h”, jeśli właściciel nie może ich utrzymać.
6. **Ujednolicić język pierwszej osoby i markę `gotovalues`** — to nie zmienia strategii.
7. **Nie publikować niepotwierdzonych cen, procentów, klientów, certyfikatów ani wyników.**
8. **Nie rozszerzać lokalizacji** poza potwierdzony zasięg, dopóki Tomasz go nie zatwierdzi.

### 8.3. Zmiany wymagające decyzji właściciela

- wybór A/B/C/D;
- H1 i kolejność filarów;
- utrzymanie lokalnego IT jako głównej, pobocznej lub osobnej oferty;
- publiczne przywrócenie Cavi/Akta;
- los SupportFlow/TriageFlow;
- pozostawienie i indeksowanie produkcji/logistyki;
- ceny, widełki, minimalny projekt i model rozliczeń;
- czas odpowiedzi i zakres helpdesku;
- obszar dojazdu;
- treść „O mnie” i poziom ujawniania doświadczenia;
- decyzja, czy gotovalues jest marką osobistą, czy przyszłą marką zespołu.

### 8.4. Luki w `10`

1. Brakuje kolumny **„warunek decyzji / owner input”**.
2. Brakuje kolumny **„dowód gotowości”** dla każdej obietnicy: SLA, NDA, backup, własność kodu, termin.
3. Brakuje rozdzielenia zmian **copy**, **routing/indexation**, **operacyjnych** i **prawnych**.
4. Brakuje planu usunięcia lub aktualizacji starych treści w `PRODUCT.md`, `process/context.md` i innych dokumentach, które mogą ponownie wprowadzać agentów w błąd.
5. Brakuje kryteriów akceptacji na mobile dla H1, lede, rysunku i formularza.
6. Brakuje planu pomiaru: zapytania według ścieżki, formularz lokalny vs procesowy, telefon, źródło wejścia, jakość leadu.
7. Brakuje planu obsługi starych URL-i: redirect, noindex, pozostawienie, aktualizacja canonical i sitemap.
8. Brakuje minimalnego planu warstwy dowodowej, jeśli właściciel nie przywróci Cavi/Akta.
9. Brakuje rozróżnienia publicznego „własnego produktu” od „wdrożenia dla klienta” w każdym endpointcie AI.
10. Brakuje testu czytelności z realnymi odbiorcami; samo przekonanie agentów nie jest walidacją komunikatu.

---

## 9. Podsumowanie i rekomendacja dla Tomasza

### Co jest pewne i udowodnione

- Obecna strona główna sprzedaje przede wszystkim lokalne IT dla małych firm/JDG.
- Kod, stopka, sitemap, blog i `llms.txt` nie tworzą jednej hierarchii oferty.
- Formularz ma lokalny placeholder także w kontekstach procesowych.
- Tytuł strony głównej jest zbyt ubogi.
- `Cavi` i `Akta` istnieją w repozytorium i są własnymi produktami/opisami warsztatu, ale ich publikowanie jest decyzją właściciela.
- Zabrodzie i powiat wyszkowski są obecne w kodzie; szerszy zasięg dojazdu wymaga potwierdzenia.
- Wpis `~120h` oraz obietnica 24 h są ryzykowne, dopóki nie zostaną zweryfikowane.
- `08` poprawia hierarchię i język, ale nie rozwiązuje braku dowodów i jest za obszerne do bezpośredniego wklejenia.

### Pięć decyzji przed jakąkolwiek zmianą kodu

1. **Co ma być głównym biznesem przez najbliższe 12 miesięcy: lokalne IT, projekty procesowe, czy oba?** Nie wybierać A tylko dlatego, że zachowuje wszystko.
2. **Czy Tomasz świadomie przyjmuje zobowiązanie do bieżącego helpdesku i awarii?** Jeśli tak, ustalić granice, godziny, region i termin odpowiedzi.
3. **Czy chce pokazywać dowód warsztatu?** Cavi/Akta, artefakt, demo na danych syntetycznych, anonimowy opis lub tylko metoda pracy — trzeba wybrać jedną realną warstwę.
4. **Jaki jest status każdej starej trasy i produktu?** Aktywna oferta, demonstracja, archiwum, noindex, redirect czy usunięcie.
5. **Jaki jest minimalny kwalifikowany lead i sposób rozliczenia?** Inny dla awarii/opieki, inny dla procesu/aplikacji.

### Co poprawić w `08` przed publikacją

1. Skrócić lede, tabelę rewizji, filary i FAQ; nie próbować opowiedzieć całej firmy w pierwszym arkuszu.
2. Usunąć lub oznaczyć wszystkie absoluty i claims zależne od operacji: 24 h, pełna własność, niskie koszty, testowany backup, NDA, środowiska bez trenowania.
3. Zastąpić gładkie zdania konkretnym opisem czynności, wejścia i granicy.
4. Rozdzielić język lokalnego IT od języka projektów procesowych już na poziomie CTA, nie tylko w jednym lede.
5. Nie używać „KPI”, „AI” i „partner technologiczny” jako skrótów bez przykładu problemu.
6. Przygotować krótszą wersję mobilną i sprawdzić pierwszy ekran na realnym renderze.
7. Dodać jawne oznaczenie własnych produktów i przykładów syntetycznych, jeśli mają zastępować case studies.
8. Nie przepisywać `llms.txt` przed decyzją o sitemapie, statusie tras i hierarchii oferty.
9. Zmienić rekomendację Opcji A z „najlepsza” na „warunkowo rekomendowana, jeśli właściciel chce obu torów”.
10. Po decyzji właściciela zbudować mały test: pięć osób lokalnych i pięć osób procesowych, pytanie po 5 sekundach o ofertę i po 30 sekundach o następny krok.

**Brutalnie szczery werdykt:** obecna strona jest niespójna, ale nie dlatego, że ma lokalne IT. Jest niespójna, bo lokalne IT zostało ustawione jako cała definicja marki, podczas gdy reszta serwisu nadal obiecuje pracę procesową i inżynieryjną. Propozycja A może to naprawić komunikacyjnie, lecz może też tylko elegancko opisać model, którego jedna osoba nie będzie w stanie obsłużyć. Najpierw trzeba wybrać obciążenie i rodzaj pracy, potem pisać tekst. Samo dodanie większej liczby sekcji nie zbuduje zaufania.
