# 03 — Audyt treści, copy i wiarygodności `gotovalues.com`

**Data:** 2026-11-27  
**Zakres:** strona główna, podstrony ofertowe, formularze, FAQ, stopka, metadane i endpointy dla modeli AI.  
**Tryb:** audyt analityczny; bez zmian w kodzie i bez założeń wykraczających poza dostarczone źródła.

## Werdykt w jednym zdaniu

Serwis nie komunikuje dziś jednej firmy. Strona główna sprzedaje lokalne, doraźne wsparcie IT dla małych firm i JDG, a stopka, blog, podstrony oraz endpointy AI sprzedają konsultanta i wykonawcę automatyzacji, aplikacji webowych i narzędzi AI dla firm. To nie jest drobna niespójność redakcyjna. To konflikt obietnic, odbiorców, poziomu cenowego i oczekiwanego problemu.

Największa strata polega na tym, że kompetencje o najwyższej wartości — analiza procesu, dane, aplikacje, integracje, automatyzacja i AI — zostały zepchnięte do słowa „dodatkowo”, podczas gdy na pierwszym planie stoją awarie, Wi-Fi i naprawa komputera. Jednocześnie istniejące podstrony B2B nie mają dostępu do właściwego formularza i są osłabione przez pozostałości po innym kierunku marki.

---

## 1. Materiał dowodowy i ograniczenia

Audyt opiera się na:

- `docs/content-audit/00-AUDIT-BRIEF.md` — cel, ograniczenia i zweryfikowana baza kompetencji;
- `docs/content-audit/01-CURRENT-STATE.md` — snapshot produkcji i porównanie produkcji z repozytorium;
- `src/content/site.ts` — główne treści marki, oferty, FAQ-ów AI i landingów;
- `src/content/faq.ts` — siedem pytań i odpowiedzi FAQ;
- `src/components/home/home-sheets.tsx` — renderowanie strony głównej;
- `src/components/home/process-drawing.tsx` — rysunek i tabela rewizji;
- `src/components/home/title-block-form.tsx` i `src/components/contact-form.tsx` — formularze;
- `src/app/layout.tsx` — globalne metadane i Schema.org;
- `/tmp/gv_prod_audit.json` — wyrenderowana produkcja, nagłówki, stopka i podglądy tekstu.

Nie ma w raporcie zmyślonych klientów, wdrożeń, certyfikatów, opinii ani wyników. W kodzie i briefie wskazano brak publicznych referencji, logotypów klientów, nazwanych case studies z twardym ROI, publicznego cennika i certyfikatów (`01-CURRENT-STATE.md`, sekcja 2). Dlatego rekomendacje dowodowe mówią o sposobach pokazania pracy, a nie o dopisywaniu sukcesów.

---

## 2. Najpoważniejszy problem: dwie firmy pod jedną domeną

### 2.1. Co obiecuje strona główna

W `src/content/site.ts:29-33` marka ma kąt komunikacyjny:

> „Sieci, komputery, helpdesk zdalny i na miejscu dla małych firm oraz JDG.”

Nad nim stoi:

> „Wsparcie IT dla małych firm i JDG.”

oraz H1:

> „Sprawne IT dla małej firmy i JDG.”

Intro rozwija tę obietnicę przez:

> „Sieci i Wi-Fi, naprawa i konfiguracja komputerów, zdalny i lokalny helpdesk (...) poczta oraz kopie zapasowe — a dodatkowo proste narzędzia i automatyzacja.”

Pierwsze trzy filary są usługą serwisową: „Sieci, Wi-Fi i sprzęt biurowy”, „Naprawa i konfiguracja komputerów”, „Zdalny i lokalny helpdesk IT” (`site.ts:48`, `58`, `68`). Dopiero czwarty mówi o automatyzacji.

To pozycjonuje gotovalues jako osobę, do której dzwoni się, gdy nie działa sieć, komputer lub poczta. Nie jako partnera od uporządkowania procesu, danych czy aplikacji.

### 2.2. Co obiecują podstrony

`/dla-produkcji`:

> „Porządkuję dokumenty, jakość i wyjątki operacyjne — bez wymiany ERP.”

`/dla-logistyki`:

> „Porządkuję statusy zleceń, dokumenty przewozowe i wymianę danych tam, gdzie TMS i ERP nie domykają realnej pracy spedycji.”

`/jak-pracuje`:

> „Proces, gotowiec albo dedykowane narzędzie — wybór zależy od problemu, nie etykiety dostawcy”.

To jest język analizy procesów, integracji i projektowania rozwiązania. Odbiorca tych stron nie szuka naprawy laptopa; szuka sposobu na uporządkowanie pracy operacyjnej.

`/supportflow` sprzedaje produkt AI:

> „AI, które naprawdę odciąża Twój support”

z obietnicą klasyfikacji zgłoszeń, roboczych odpowiedzi, eskalacji i integracji z helpdeskiem (`gv_prod_audit.json`, `/supportflow`, h1/h2/h3).

`/triageflow` mówi:

> „Zgłoszenia, które segregują się same”

oraz wymienia GitHub Issues, e-mail, fora, priorytety P0–P3 i reguły per projekt (`gv_prod_audit.json`, `/triageflow`).

Blog ma 17 wpisów i — według `01-CURRENT-STATE.md` — wszystkie dotyczą AI, BI/KPI, automatyzacji, integracji i aplikacji webowych. Nie ma ani jednego artykułu o sieciach, naprawie PC lub helpdesku. To silny dowód, że właściwy, wcześniejszy rdzeń marki był bliżej usług technologiczno-procesowych niż lokalnego serwisu.

### 2.3. Stopka wzmacnia konflikt

Na stronie głównej, której H1 mówi „Sprawne IT dla małej firmy i JDG”, stopka linkuje do:

> „SupportFlow AI”  
> „TriageFlow”  
> „Kalkulator ROI”

(`gv_prod_audit.json`, `/`, pola `footer`). Dla odbiorcy szukającego lokalnego wsparcia IT są to obce, nieobjaśnione produkty. Dla odbiorcy szukającego automatyzacji jest to sygnał, że strona główna jest serwisem komputerowym, a nie ofertą B2B.

### 2.4. Formularz potwierdza niewłaściwą hierarchię

Globalny formularz renderuje się także na podstronach produkcji, logistyki, SupportFlow, TriageFlow i „Jak pracuję”. Jego placeholder brzmi:

> „Np. rwie się Wi-Fi w biurze, komputer wymaga serwisu, trzeba ustawić pocztę i backup albo szukam zdalnego wsparcia IT.”

(`src/components/contact-form.tsx:137-139`). To jest konkretna sprzeczność doświadczenia: użytkownik czyta o ERP, TMS albo agencie AI, po czym formularz pyta językiem awarii Wi-Fi.

### 2.5. Endpointy AI utrwalają sprzeczność

`01-CURRENT-STATE.md` wskazuje, że `/llms.txt` ma nagłówek o wsparciu IT w Zabrodziu/JDG, ale nadal publikuje sekcję „Proof of competence” z `Cavi` i `Akta` oraz linki do stron AI/automatyzacji. Globalne Schema.org w `src/app/layout.tsx:107-127` opisuje jednocześnie:

> „Kompleksowe usługi IT dla małych firm i JDG (...) sieci i Wi-Fi, naprawa komputerów, helpdesk, poczta, kopie zapasowe oraz automatyzacja.”

To nadal jest lista usług, nie jasne pozycjonowanie. Model, wyszukiwarka i człowiek dostają sygnał: lokalny informatyk plus firma od AI — bez wyjaśnienia, co jest główną ofertą, a co uzupełnieniem.

---

## 3. Audyt wiarygodności i wartości biznesowej

### Mocne, wiarygodne elementy

1. **Jasna odpowiedzialność osobista.** „Rozmawiasz bezpośrednio ze mną” (`site.ts:154-156`) jest konkretne i możliwe do zweryfikowania.
2. **Przejrzysty zakres lokalny i zdalny.** „Zabrodzie, powiat wyszkowski i okolice (...) oraz zdalnie w całej Polsce” pojawia się konsekwentnie w treści i metadanych (`site.ts:222-224`, `layout.tsx:39`, `107-114`).
3. **Brak obietnic bez pokrycia na stronie głównej.** Tekst nie dopisuje klientów ani procentowych oszczędności.
4. **Rozsądna zasada „najpierw proces”.** Na `/jak-pracuje` zdanie „zaczynam od zrozumienia procesu” jest dobrą podstawą pozycjonowania, ale pozostaje odłączone od głównego H1 i formularza.
5. **Własność i dostęp do zasobów.** FAQ odpowiada: „Domena, poczta, konta w chmurze (...) są zawsze zarejestrowane na Twoją firmę i masz do nich pełne dostępy” (`faq.ts:37-38`). To redukuje realną obawę klienta.

### Elementy obniżające wiarygodność

- „Od ręki” (`site.ts:70`, `faq.ts:6`) brzmi jak obietnica dostępności i szybkości bez warunków. Jeśli nie ma SLA, lepiej pisać „zdalnie rozwiązuję wiele spraw” albo „zaczynam od zdalnej diagnozy”.
- „Zawsze wiesz z góry, ile kosztuje usługa” (`site.ts:169-172`) jest zbyt absolutne. Przy diagnozie, naprawie i nieznanym zakresie często można obiecać wycenę etapu lub widełki, nie zawsze końcową cenę.
- „Bez ukrytych kosztów” (`faq.ts:17-19`) jest formułą reklamową bez dowodu. Wiarygodniejszy jest opis mechanizmu: zakres, stawka, warunki i moment akceptacji.
- „Podstawowe bezpieczeństwo danych” (`site.ts:72-75`) jest nieprecyzyjne. Nie wiadomo, co konkretnie obejmuje i czego nie obejmuje.
- „Praktyczne AI tam, gdzie realnie oszczędzają czas” (`site.ts:82-85`) jest rozsądne intencjonalnie, ale nadal nie pokazuje sposobu oceny, danych wejściowych ani granic odpowiedzialności.
- „Wrócę z konkretną oceną” (`site.ts:341-343`) obiecuje ocenę przed poznaniem procesu. Bezpieczniejsze: „odpiszę, jakie widzę możliwe następne kroki”.
- `layout.tsx:129-133` oznacza Tomasza jako `founder`. Na stronie SupportFlow dodatkowo pojawia się „bezpośredni kontakt z founderem”. Jeśli marka ma mówić po polsku i w pierwszej osobie, „właściciel” albo po prostu „Tomasz” jest naturalniejsze. „Founder” nie dodaje dowodu kompetencji.

---

## 4. Audyt AI-slopu i nienaturalnej polszczyzny

Poniżej „AI-slop” oznacza nie tekst napisany koniecznie przez AI, tylko tekst o cechach generatywnego marketingu: ogólnik, powtórzona konstrukcja, angielska kalka, przesadny absolut albo obietnica bez konkretu.

### 4.1. Kalki i hybrydy językowe

| Cytat                                                             | Problem                                                                                                                          | Lepszy kierunek                                                                                                  |
| ----------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| „domu-biurze” (`site.ts:50`)                                      | Nienaturalne połączenie; po polsku: „biurze domowym” albo „firmie prowadzonej z domu”.                                           | „w biurze, małej firmie albo warsztacie”                                                                         |
| „Proof of competence” (`site.ts:244`)                             | Angielski nagłówek w polskiej komunikacji; brzmi jak etykieta z prezentacji inwestorskiej.                                       | „Przykłady pracy” / „Co zbudowałem” — tylko jeśli sekcja wróci.                                                  |
| „founder” (`gv_prod_audit.json`, `/supportflow`)                  | Anglicyzm i rejestr startupowy, niespójny z lokalnym IT.                                                                         | „bezpośredni kontakt z Tomaszem”                                                                                 |
| „support”, „helpdesk”, „backup”, „workflow”, „low-code”, „custom” | Część terminów jest branżowo zrozumiała, ale nagromadzenie brzmi jak opis narzędzi, nie korzyści.                                | Termin można zostawić po pierwszym polskim objaśnieniu; nie budować całych nagłówków z angielskich rzeczowników. |
| „AI, które...”                                                    | Konstrukcja jest gramatycznie możliwa, ale powtarzana w marketingu AI tak często, że jest pusta bez wskazania sytuacji i granic. | „Automatyczna klasyfikacja zgłoszeń; trudne sprawy nadal trafiają do człowieka.”                                 |

### 4.2. Puste lub zużyte obietnice

- „Sprawne IT” (`site.ts:31`) — nie mówi, co zmienia się w pracy firmy.
- „Po prostu działały” (`site.ts:50`) — potoczne i zbyt ogólne; nie odróżnia konfiguracji od efektu.
- „Praktyczne AI” (`site.ts:380-382`) — „praktyczne” jest deklaracją, nie dowodem.
- „realnie skracają pracę” (`site.ts:382`, `447`) — bez określenia jaką pracę, w którym miejscu i czym mierzoną.
- „pierwszy sensowny zakres” (`site.ts:459-461`) — „sensowny” jest oceną autora. Lepiej powiedzieć, co zakres obejmuje i jak będzie sprawdzony.
- „codzienna operacja” (`site.ts:464-466`) — szeroki korporacyjny zwrot; można nazwać konkretną pracę: statusy, dokumenty, rozliczenia, zgłoszenia.
- „bez wymiany środowiska” (`site.ts:411`) — dobra obiekcja biznesowa, ale powtarza się obok „bez wymiany ERP”. Wybierz jedno sformułowanie zależnie od odbiorcy.
- „nie wielki projekt” (`site.ts:337`) — potoczna negacja zamiast konkretnego opisu małego pierwszego etapu.

### 4.3. Konstrukcje brzmiące jak wygenerowany landing

1. `/dla-logistyki` ma H1 długości 21 słów i trzy równoległe rzeczowniki: „statusy zleceń, dokumenty przewozowe i wymianę danych”. Jest precyzyjny, ale nie jest dobrym pierwszym zdaniem. Człowiek powinien najpierw usłyszeć problem i efekt.
2. Nagłówki „Objawy”, „Co porządkuję”, „Pierwszy krok”, „Kontakt” są szablonem sekcji. Same nie są błędem, lecz bez dowodu i przykładu dają wrażenie powtarzalnego generatora landingów.
3. `/jak-pracuje`: „Nie chodzi o etykietę dostawcy — chodzi o dobór właściwego poziomu rozwiązania” (`gv_prod_audit.json`) powtarza myśl z H1, zamiast posuwać argument naprzód.
4. `/supportflow`: „Agent, który naprawdę odciąża zespół”, „AI, które naprawdę odciąża Twój support” — powtórzenie słowa „naprawdę” nie zwiększa wiarygodności.
5. `/triageflow`: „Zgłoszenia, które segregują się same” — personifikacja jest chwytliwa, ale ukrywa warunki: co agent robi, kiedy nie jest pewny i kto zatwierdza decyzję.
6. Formuła „Kiedy X ma sens, a kiedy lepiej nie” powtarza się na stronach produktowych. Jest dobra jako uczciwy filtr, lecz trzeba usunąć startupowe pakiety i dopisać konkretne kryteria.

---

## 5. Katalog sformułowań zaniżających wartość usług

### Zbyt serwisowe lub lokalnie niskomarżowe

- „Naprawa i konfiguracja komputerów” (`site.ts:58`)
- „gdy komputer zwolnił, nie startuje” (`site.ts:60`)
- „diagnostyka, serwis, naprawa i przyspieszanie komputerów” (`site.ts:62`)
- „rwie się Wi-Fi” (`site.ts:210`, formularze)
- „awarie i gaszenie” (`process-drawing.tsx:57`, `49`)
- „wolny komputer, brak kopii i wszystko na Twojej głowie” (`process-drawing.tsx:49`)
- „codzienne problemy IT” (`process-drawing.tsx:93`)
- „żeby internet, drukarki i urządzenia po prostu działały” (`site.ts:50`)

Te zwroty mogą istnieć jako przykłady problemów. Nie mogą jednak definiować H1, pierwszego akapitu i całej hierarchii oferty. W obecnym układzie definiują.

### Defensywne lub umniejszające

- „proste narzędzia” (`site.ts:33`, `80`, `228-230`) — „proste” może oznaczać łatwe w użyciu, ale w sprzedaży często brzmi jak małe i tanie.
- „lekkie narzędzie” (`site.ts:307`, `328`, `411`) — mówi o masie rozwiązania, nie o wartości. Można zachować tylko w kontrze do dużego wdrożenia, po pokazaniu efektu.
- „dodatkowo” (`site.ts:33`, `230`, `235`) — spycha automatyzację i AI do roli dodatku, nawet gdy są najcenniejszą kompetencją.
- „jako naturalne uzupełnienie codziennej obsługi IT” (`faq.ts:45-46`) — przyznaje pierwszeństwo serwisowi, a aplikacje opisuje jako doczepkę.
- „prosta strona” (`site.ts:80`, `176`, `204`) — klient kupuje stronę, która ma wspierać sprzedaż lub obsługę, nie jej rzekomą prostotę.
- „nie chcę stawiać gotovalues w kontrze...” (`site.ts:272`) — otwarcie jest defensywne. Odbiorca nie potrzebuje wyjaśnienia, że marka nie atakuje konkurencji; potrzebuje wiedzieć, jaki problem rozwiązuje lepiej.
- „jeśli problem nie wymaga customowego narzędzia, powiem to wprost” (`site.ts:347`) — uczciwe, ale eksponuje możliwość odmowy zamiast kompetencji doboru rozwiązania. Można zachować niżej na stronie.

### Jak podnosić wartość bez zadęcia

Zamiast „naprawię komputer”:

> „Przywracam stanowisko do pracy i sprawdzam, dlaczego problem wraca.”

Zamiast „ustawię Wi-Fi”:

> „Porządkuję sieć tak, aby zespół mógł pracować, drukować i korzystać z plików bez ciągłego gaszenia awarii.”

Zamiast „zrobię prostą automatyzację”:

> „Usuwam ręczne przepisywanie danych między narzędziami, które firma już ma.”

Zamiast „lekka aplikacja”:

> „Buduję tylko ten fragment narzędzia, którego brakuje w obecnym procesie.”

To nadal jest proste i uczciwe. Różnica polega na tym, że mówi o pracy firmy, nie o czynności wykonawcy.

---

## 6. Powtórzenia, zbędne informacje i niespójność rejestru

### 6.1. Powtórzenia

- „proste” / „lekki” / „dodatkowo” pojawia się w głównym przekazie, ofercie, FAQ, metadanych i landingach. Efekt: marka sama pomniejsza swoje rozwiązania.
- „bez wymiany ERP/środowiska” powtarza się na produkcji i logistyce. Warto rozdzielić: produkcja — ERP; logistyka — TMS/ERP i istniejące systemy.
- „jeden proces”, „mały zakres”, „nie wielki projekt” powtarzają tę samą zasadę. Wystarczy jedna mocna zasada i konkretne kroki.
- „realnie” występuje jako wzmacniacz („realnie oszczędzają czas”, „realna praca”, „realnie skraca”) bez liczb lub kryterium. Usunąć albo dopisać sposób sprawdzenia.
- FAQ powtarza treść hero: zdalnie/lokalnie, sieć, poczta, backup. FAQ powinno odpowiadać na obiekcje i warunki współpracy, nie ponownie wyliczać usług.

### 6.2. Zderzenia rejestrów

- „Opracował: Tomasz Gołaszewski” (`home-sheets.tsx:160`) buduje formalny rysunek techniczny.
- „rwie się Wi-Fi” (`process-drawing.tsx:49`, formularze) jest potoczne i serwisowe.
- „founder” i emoji Polski na `/supportflow` (`gv_prod_audit.json`) są startupowo-produktowe.
- „P0–P3”, „TMS”, „ERP”, „OCR”, „POD” są branżowe i właściwe dla konkretnych odbiorców, ale nie powinny być wymieszane z językiem naprawy domowego komputera na wspólnej ścieżce.
- „Uwagi: pytania przed współpracą” (`home-sheets.tsx:190`) pasuje do rysunku technicznego, lecz mniej do zwykłego klienta małej firmy. To styl może zostać, ale tekst pod nim powinien być bardziej biznesowy.

### 6.3. Zbędne lub ryzykowne elementy

- Na homepage istnieje komponent `ProofSheet`, ale bieżąca strona nie pokazuje sekcji produktów/dowodów; jednocześnie podstrony i `/llms.txt` nadal mówią o Cavi i Akta. To nie tylko problem kodu, ale problem obietnicy: dowód jest raz ukryty, raz publikowany.
- Globalny `title.default` to samo `gotovalues` (`layout.tsx:35`). Produkcyjny snapshot potwierdza `<title>` „gotovalues” na `/`. To marnuje najważniejsze miejsce na opis oferty i lokalizacji.
- `/jak-pracuje` ma tytuł `gotovalues — jak pracuję: AI, web apps, procesy | gotovalues` (`gv_prod_audit.json`), z powtórzeniem marki i angielskim „web apps”.
- Placeholder formularza nie powinien wymieniać Wi-Fi na każdej podstronie. Powinien być kontekstowy albo neutralny: „Opisz proces, problem lub narzędzie, które chcesz uporządkować.”

---

## 7. Strona główna — przegląd sekcja po sekcji

### 7.1. Hero: nagłówek i wstęp

**Obecny tekst:**

> „Sprawne IT dla małej firmy i JDG.”

> „Sieci i Wi-Fi, naprawa i konfiguracja komputerów, zdalny i lokalny helpdesk (...) — a dodatkowo proste narzędzia i automatyzacja.”

**Diagnoza:** H1 jest zrozumiały, ale generyczny. Intro wylicza czynności i od razu umniejsza najwyżej wartościowane kompetencje słowem „dodatkowo”. Zabrodzie jest wciśnięte w nawias, więc lokalność nie jest ani mocną przewagą, ani świadomie drugorzędną informacją.

**Mocniejsza propozycja, jeśli główną marką ma być technologia/procesy:**

> **Porządkuję procesy, dane i narzędzia, które dziś zabierają firmie czas.**
>
> **Zaczynam od tego, co już działa: sprawdzam proces, łączę istniejące systemy i buduję tylko brakujący fragment — od automatyzacji i danych po aplikację. Dla firm zdalnie w całej Polsce; lokalne wsparcie IT w Zabrodziu i powiecie wyszkowskim.**

**Alternatywa, jeśli świadomie zostaje lokalne IT jako główna oferta:**

> **IT, na którym mała firma może pracować bez ciągłego gaszenia awarii.**
>
> **Porządkuję sieć, sprzęt, pocztę i kopie zapasowe. Gdy problem leży w ręcznej pracy lub danych, dokładam integrację albo narzędzie dopasowane do firmy. Zdalnie w całej Polsce, na miejscu w Zabrodziu i powiecie wyszkowskim.**

Druga wersja nadal jest lokalna, ale nie przedstawia automatyzacji jako dodatku bez znaczenia.

### 7.2. Rysunek i tabela zmian

**Obecne cytaty:**

> „rwie Wi-Fi, wolny komputer, brak kopii i wszystko na Twojej głowie” (`process-drawing.tsx:49`)

> „awarie i gaszenie” (`process-drawing.tsx:57`)

> „Tabela zmian: zobacz, jak porządkuję IT w firmie” (`process-drawing.tsx:234`)

> „Spokojna praca” (`process-drawing.tsx:43`)

**Diagnoza:** Forma rysunku technicznego komunikuje precyzję i inżynierię. Treść rewizji komunikuje serwis i frustrację. „Spokojna praca” jest dobrym ludzkim efektem, ale nie jest wystarczająco konkretna jako finał procesu. Rysunek powinien pokazywać zmianę od ręcznego obiegu do uporządkowanego przepływu, nie tylko od zepsutego Wi-Fi do pomocy.

**Propozycja:** zachować interakcję, zmienić nazwy rewizji:

- `0 Stan obecny`: „Dane i zadania krążą między mailem, arkuszem i kilkoma systemami.”
- `A Uporządkowanie`: „Jedno miejsce dla najważniejszych informacji i jasny właściciel zadania.”
- `B Integracja`: „Dane wpisujesz raz; dalej przechodzą do właściwego narzędzia.”
- `C Narzędzie`: „Brakujący fragment procesu działa w aplikacji dopasowanej do zespołu.”

Jeśli lokalne IT pozostaje centralne, należy mieć osobny rysunek dla tej ścieżki, a nie mieszać go z procesowym językiem podstron.

### 7.3. Tytułowy blok formularza

**Obecne cytaty:**

> „W czym mogę pomóc?” (`title-block-form.tsx:80`)

> „Np. rwie się Wi-Fi w biurze, komputer wolno działa, trzeba ustawić pocztę i backup albo szukam zdalnego wsparcia IT…” (`title-block-form.tsx:89`)

> „Zakres: sieci, serwis, helpdesk, narzędzia” (`home-sheets.tsx:48`)

**Diagnoza:** Formularz jest szybki, ale kwalifikuje wyłącznie do serwisu. „Narzędzia” na końcu listy nie równoważą trzech przykładów awarii.

**Propozycja neutralna:**

> **Co chcesz usprawnić?**
>
> „Np. ręczne przepisywanie danych, problem z siecią, dokumenty w kilku miejscach albo narzędzie, którego brakuje w obecnym procesie.”

Jeżeli formularz ma być różny dla dwóch ścieżek, nie należy udawać, że jeden placeholder pasuje do wszystkich landingów. Formularz dla `/dla-produkcji`, `/dla-logistyki` i produktów powinien mówić o procesie; formularz lokalnego IT może mówić o sieci i sprzęcie.

### 7.4. Oferta — cztery filary

#### Filar 1: Sieci, Wi-Fi i sprzęt biurowy

**Cytat:**

> „Konfiguruję i porządkuję sieć (...) tak, żeby internet, drukarki i urządzenia po prostu działały.”

**Diagnoza:** „Po prostu działały” jest naturalne, ale niskowartościowe. Brakuje efektu dla firmy: dostęp do zasobów, ciągłość pracy, rozdzielenie dostępu, mniej przestojów.

**Propozycja:**

> „Porządkuję sieć, dostęp do plików i urządzeń tak, aby zespół mógł pracować bez ciągłych przerw i ręcznego obchodzenia problemów.”

#### Filar 2: Naprawa i konfiguracja komputerów

**Cytat:**

> „Pomagam, gdy komputer zwolnił, nie startuje albo trzeba szybko przygotować nowe stanowisko do pracy bez tracenia całego dnia.”

**Diagnoza:** To oferta serwisanta. Może być potrzebna, ale jako filar numer dwa ustawia oczekiwanie niskiej ceny i pojedynczego zlecenia.

**Propozycja:**

> „Przywracam stanowiska do pracy i przygotowuję nowe tak, aby sprzęt, dane i programy były gotowe do użycia — nie tylko chwilowo uruchomione.”

#### Filar 3: Zdalny i lokalny helpdesk IT

**Cytat:**

> „Większość spraw rozwiązuję zdalnie od ręki, a gdy trzeba, przyjeżdżam na miejsce.”

**Diagnoza:** „Od ręki” jest ryzykowną obietnicą. „Stała lub doraźna pomoc” dobrze opisuje model, ale nie opisuje granic, reakcji ani odpowiedzialności.

**Propozycja:**

> „Jedna osoba do bieżących spraw IT: zdalna diagnoza, pomoc na miejscu tam, gdzie potrzebny jest sprzęt lub sieć, oraz porządek w poczcie, dostępach i kopiach zapasowych.”

#### Filar 4: Automatyzacja i proste narzędzia

**Cytat:**

> „Gdy poza sprawnym IT chcesz ograniczyć ręczne przepisywanie danych, dokładam prostą stronę, integrację albo lekkie narzędzie.”

**Diagnoza:** To najcenniejszy kierunek opisany językiem dodatku. „Dokładam” brzmi jak drobna usługa obok naprawy. „Prosta” i „lekkie” obniżają cenę jeszcze przed rozmową.

**Propozycja:**

> „Gdy problemem jest ręczne przepisywanie danych lub praca w kilku narzędziach, porządkuję przepływ informacji: łączę istniejące systemy albo buduję brakujący fragment aplikacji.”

### 7.5. „Jak pracuję”

**Obecny nagłówek:**

> „Prosto, rzetelnie i bez infolinii” (`site.ts:151`).

**Obecne punkty:**

> „Jeden kontakt zamiast infolinii”  
> „Zdalnie od ręki, lokalnie na miejscu”  
> „Kopie zapasowe i bezpieczeństwo”  
> „Prosty język i jasna wycena”  
> „Od sprawnej sieci po proste narzędzia”

**Diagnoza:** Pierwsze cztery punkty opisują wygodę obsługi i serwis. Piąty dopiero wraca do narzędzi. „Bez infolinii” jest przewagą organizacyjną, nie wartością dla procesu. „Zdalnie od ręki” powtarza ryzykowny absolut.

**Propozycja hierarchii:**

1. **Najpierw rozumiem problem** — zaczynam od procesu i miejsca, w którym praca się zatrzymuje.
2. **Dobieram najmniejsze rozwiązanie, które wystarczy** — konfiguracja, integracja, automatyzacja albo własna aplikacja.
3. **Zostawiam firmie kontrolę** — konta, domeny, dane i dostęp są po stronie firmy.
4. **Wdrażam na realnym przykładzie** — zakres można sprawdzić w codziennej pracy, zanim urośnie.
5. **Tłumaczę decyzje i koszty** — bez żargonu, z jasno opisanym zakresem.

Jeśli wsparcie IT jest osobną ofertą, należy pokazać je w osobnym bloku „Bieżące IT”, a nie mieszać z metodą wdrożeń.

### 7.6. „O mnie”

**Obecny tekst:**

> „Tomasz Gołaszewski. Twój lokalny i zdalny partner IT.” (`site.ts:182`)

> „Łączę codzienne wsparcie IT — sieci, naprawy komputerów i pomoc zdalną — z praktycznym doświadczeniem w porządkowaniu danych i prostych narzędzi.” (`site.ts:188-189`)

**Diagnoza:** „Partner IT” jest szerokie i generyczne. Zdanie zaczyna od napraw, a doświadczenie biznesowe, analityczne i procesowe redukuje do „porządkowania danych i prostych narzędzi”. To nie pokazuje, dlaczego ta osoba może dobrze rozpoznać problem firmy.

**Propozycja, wyłącznie w granicach potwierdzonych faktów:**

> **Tomasz Gołaszewski — łączę praktykę IT z rozumieniem pracy firmy.**
>
> **Zajmuję się sieciami, sprzętem i codziennym wsparciem, ale zaczynam od pytania, gdzie naprawdę powstaje problem: w narzędziu, danych czy samym procesie. Mam doświadczenie w porządkowaniu danych, cyfryzacji procesów operacyjnych i budowie narzędzi webowych.**

Ten tekst nie dopisuje klientów ani wyników. Lepiej wykorzystuje fakty z briefu niż obecna wersja.

### 7.7. FAQ — wszystkie siedem pytań

#### 1. „Czy pomagasz zdalnie, czy też na miejscu?”

**Obecna odpowiedź:**

> „Jedno i drugie. Większość codziennych problemów (...) rozwiązuję zdalnie od ręki (...). Gdy sprawa wymaga pracy fizycznej (...) przyjeżdżam na miejsce...” (`faq.ts:5-6`)

**Diagnoza:** Dobra odpowiedź na logistykę, ale „od ręki” jest absolutem. „Praca fizyczna” brzmi niezgrabnie i technicznie.

**Propozycja:**

> „Pracuję zdalnie w całej Polsce, a w Zabrodziu, powiecie wyszkowskim i okolicach także na miejscu. Zdalnie można rozwiązać wiele spraw z pocztą, dostępami i programami; do sieci, okablowania, drukarek lub sprzętu przyjeżdżam, gdy potrzebna jest praca na miejscu.”

#### 2. „Czy muszę podpisywać stałą umowę abonamentową?”

**Obecna odpowiedź:**

> „Możemy współpracować jednorazowo (...) albo w lekkiej stałej opiece IT...” (`faq.ts:11-12`)

**Diagnoza:** „Lekka opieka” brzmi jak mniej wartościowa wersja abonamentu. „Zależnie od tego, co ma sens przy Twojej skali” jest poprawne, ale ogólne.

**Propozycja:**

> „Nie. Możemy zacząć od jednego zadania albo ustalić stałą opiekę. Zakres zależy od tego, czy potrzebujesz pojedynczej konfiguracji, regularnego wsparcia czy uporządkowania większego problemu.”

#### 3. „Ile kosztuje usługa i jak rozliczamy współpracę?”

**Obecna odpowiedź:**

> „...jasną wycenę (...) albo stawkę godzinową (...) bez ukrytych kosztów i bez pakietów korporacyjnych.” (`faq.ts:17-18`)

**Diagnoza:** „Bez ukrytych kosztów” i „bez pakietów korporacyjnych” są reklamowym kontrastem. Nie wiadomo, kiedy wycena jest stała, a kiedy godzinowa.

**Propozycja:**

> „Przed rozpoczęciem opisuję zakres i sposób rozliczenia. Przy konkretnym zadaniu proponuję cenę za zakres; przy doraźnej diagnozie lub wsparciu — stawkę godzinową. Jeśli w trakcie pojawi się dodatkowa praca, informuję o niej przed jej wykonaniem.”

#### 4. „Nie znam się na technikaliach — czy wystarczy opisać problem swoimi słowami?”

**Obecna odpowiedź:**

> „Wystarczy krótka wiadomość zwykłym językiem (...) zaproponuję najprostsze rozwiązanie...” (`faq.ts:23-24`)

**Diagnoza:** To jedna z najlepszych odpowiedzi FAQ, ale „najprostsze” może brzmieć jak najtańsze lub prowizoryczne. Chodzi o rozwiązanie adekwatne.

**Propozycja:**

> „Tak. Napisz, co przestało działać albo co chcesz usprawnić. Dopytam o szczegóły, wyjaśnię możliwe opcje i zaproponuję rozwiązanie adekwatne do problemu — bez konieczności znajomości technicznego słownictwa.”

#### 5. „Jak dbasz o bezpieczeństwo danych, haseł i kopii zapasowych?”

**Obecna odpowiedź:**

> „Kopie zapasowe (backup) i bezpieczeństwo to podstawa małej firmy. Pomagam ustawić automatyczny backup (...) uporządkować dostępy i hasła oraz zabezpieczyć sieć Wi-Fi.” (`faq.ts:31-32`)

**Diagnoza:** „Bezpieczeństwo to podstawa” jest pustym truizmem. Odpowiedź miesza backup, hasła i Wi-Fi, ale nie mówi o sprawdzeniu odtwarzania ani zakresie odpowiedzialności.

**Propozycja:**

> „Pomagam uporządkować dostępy, zabezpieczyć sieć i ustawić automatyczne kopie kluczowych danych. Zakres ustalamy z góry; kopia ma sens dopiero wtedy, gdy wiadomo, co obejmuje i jak ją odtworzyć. Nie zastępuje to pełnego audytu bezpieczeństwa, jeśli firma go potrzebuje.”

Ostatnie zdanie chroni przed nadmierną obietnicą.

#### 6. „Czy po konfiguracji wszystkie konta, domeny i sprzęty należą do mnie?”

**Obecna odpowiedź:**

> „Tak. Domena, poczta, konta w chmurze, konfiguracja sieci i ewentualne stworzone narzędzia są zawsze zarejestrowane na Twoją firmę...” (`faq.ts:37-38`)

**Diagnoza:** Merytorycznie bardzo dobra obietnica kontroli. „Należą do mnie” w pytaniu jest językowo niezręczne — chodzi o klienta — a „zawsze” powinno być zgodne z faktycznym procesem zakupowym.

**Propozycja:**

> „Tak — zasoby firmy powinny być zarejestrowane na firmę. Domena, poczta, konta, dane i dostęp do konfiguracji pozostają po Twojej stronie. Przy każdym wdrożeniu ustalamy, gdzie są dane dostępowe i kto może z nich korzystać.”

#### 7. „Czy oprócz sieci, napraw i helpdesku robisz też strony lub automatyzacje?”

**Obecna odpowiedź:**

> „Tak, jako naturalne uzupełnienie codziennej obsługi IT.” (`faq.ts:45-46`)

**Diagnoza:** To zdanie samo ujawnia problem strategii: automatyzacja jest dodatkiem do helpdesku. Dalej wymienia „prostą stronę”, „połączyć programy” i „zautomatyzować powtarzalne zadania”, ale nie pokazuje, kiedy taka praca jest główną usługą.

**Propozycja:**

> „Tak. Jeśli problem wynika z ręcznego przepisywania danych, pracy w kilku programach albo braku jednego widoku, mogę przeanalizować proces i zaproponować integrację, automatyzację lub własne narzędzie. Nie zaczynam od budowy — najpierw sprawdzam, które rozwiązanie rzeczywiście wystarczy.”

### 7.8. Kontakt i formularze

**Obecny intro:**

> „Napisz krótko, z czym masz problem — rwie się sieć, komputer wymaga serwisu (...) albo szukasz stałego wsparcia IT...” (`site.ts:208-210`)

**Diagnoza:** „Z czym masz problem” i przykłady awarii zawężają kontakt do sytuacji naprawczej. Brakuje zaproszenia do opisania procesu, danych lub narzędzia.

**Propozycja:**

> **Opisz problem albo pracę, którą chcesz usprawnić.**
>
> „Może chodzić o sieć i sprzęt, ale też o ręczne przepisywanie danych, dokumenty w kilku miejscach, integrację programów albo narzędzie potrzebne zespołowi.”

„Wiadomość trafia bezpośrednio do mnie” (`contact-form.tsx:167-169`) jest dobrym, konkretnym sygnałem i warto go zachować.

### 7.9. Stopka i metadane

**Diagnoza:** Stopka linkuje do produktów AI z głównej strony lokalnego IT. Należy ustalić jeden z dwóch modeli:

1. **Jedna marka, dwie ścieżki:** stopka rozdziela „Wsparcie IT dla małych firm” i „Automatyzacja procesów i aplikacje”; każda ścieżka ma własne CTA i formularz.
2. **Jedna główna oferta:** produkty i kalkulator są wycofane z globalnej stopki, a blog zostaje przepisany lub oznaczony jako archiwum wcześniejszego kierunku.

Nie należy pozostawiać obecnej hybrydy.

**Metadane:**

- `layout.tsx:35` — domyślny tytuł to samo `gotovalues`; produkcja potwierdza tytuł „gotovalues”. Propozycja: `gotovalues — IT i automatyzacja dla małych firm` albo wybrany jeden rdzeń.
- `layout.tsx:39` i `56` — opisy są listami usług; potrzebują jednej obietnicy efektu, nie kolejnych rzeczowników.
- `gv_prod_audit.json` potwierdza, że `/jak-pracuje` ma powtórzone `gotovalues` w tytule oraz angielskie „web apps”.
- `layout.tsx:121-127` — `knowsAbout` powtarza katalog usług. To nie naprawi pozycjonowania, jeśli widoczny tekst nadal mówi co innego.

---

## 8. Podstrony i blog — konkretne decyzje redakcyjne

### `/dla-produkcji`

Treść jest najspójniejsza z ofertą procesową. Dobre są problemy: dokumenty w mailach i na dyskach, ręczne statusy i wyjątki. Słabe są:

- „Lekkie narzędzia” — zastąpić opisem brakującego fragmentu procesu;
- „Praktyczne AI” — nazwać zadanie: OCR, ekstrakcja, klasyfikacja, wyszukiwanie;
- sekcja „Dowód pracy” obiecuje Cavi, Akta i anonimowe wdrożenia, ale według snapshotu `01-CURRENT-STATE.md` po usunięciu sekcji proof na stronie nie ma dowodu. Albo dowód wraca w uczciwej formie, albo nagłówek nie powinien obiecywać dowodu.

Proponowany H1:

> **Mniej ręcznego pilnowania dokumentów i wyjątków w produkcji — bez wymiany ERP.**

### `/dla-logistyki`

Problem jest konkretny, ale H1 za długi. „Nie domykają realnej pracy spedycji” jest abstrakcyjne. Proponowany H1:

> **Statusy, dokumenty i dane spedycji w jednym uporządkowanym przepływie.**

Pod nim:

> „Łączę istniejące systemy tam, gdzie praca nadal wraca do Excela, maila i portali przewoźników. Zaczynam od jednego procesu — bez wymiany całego środowiska.”

„Integracja systemów i automatyzacja triażu” jako drugie CTA jest niejasne: „triaż” w logistyce nie jest oczywistą nazwą problemu. CTA powinno prowadzić do konkretnego artykułu albo zniknąć.

### `/jak-pracuje`

To jest potencjalnie strona nadrzędna dla właściwej strategii, ale obecnie broni się przed konkurencją:

> „Nie chcę stawiać gotovalues w kontrze do freelancerów, automatyzatorów ani software house'ów...”

Usunąć ten wstęp. Zastąpić:

> „Nie zaczynam od wyboru technologii. Najpierw sprawdzam, gdzie proces traci czas i dane. Dopiero potem dobieram gotowe narzędzie, integrację, automatyzację albo aplikację.”

Ta strona powinna być linkowana z hero i stopki, a nie pozostawać w konflikcie z główną stroną.

### `/supportflow`

Treść ma własny produktowy świat i nie może być linkowana bez objaśnienia ze strony lokalnego IT. Do usunięcia albo rewizji:

- „🇵🇱 Polski język, polski rynek” — emoji i deklaracja geograficzna są słabe dowodowo;
- „founder” — angielski startupowy rejestr;
- „Zostań pierwszym klientem referencyjnym” — komunikat ujawnia brak referencji i przenosi problem dowodowy na stronę;
- „od 4 000 PLN” i pakiety `START/BUSINESS/ENTERPRISE` — wymagają potwierdzenia, że są aktualną ofertą i że marka chce prowadzić sprzedaż produktu w tym modelu.

Jeśli SupportFlow jest nadal aktywnym produktem, potrzebuje osobnej ścieżki i formularza o wsparciu, nie globalnego placeholdera o Wi-Fi.

### `/triageflow`

Produkt jest czytelny dla zespołu technicznego, ale nie dla małej firmy z głównej strony. Warto zachować język reguł i kontroli, lecz dodać prostą odpowiedź: jakie zgłoszenia, kto zatwierdza, co dzieje się przy niepewności. „Segregują się same” nie może sugerować pełnej autonomii, jeśli treść równocześnie mówi o regułach i człowieku.

### `/kalkulator-roi`

Strona obiecuje:

> „Pokażę szacunek oszczędności i okres zwrotu.”

To uczciwsze niż obietnica wyniku, ale kalkulator jest linkowany do formularza o Wi-Fi i naprawie komputera. Należy go albo połączyć z ofertą automatyzacji, albo usunąć z globalnej stopki. Nie powinien prowadzić użytkownika z kalkulacji procesu do formularza serwisowego.

### `/blog`

H1:

> „Praktycznie o aplikacjach, AI i procesach.”

To jest jasny sygnał marki technologiczno-procesowej, sprzeczny z H1 homepage. Tytuły artykułów są merytorycznie kierunkowe, ale wiele używa powtarzalnych wzmacniaczy:

- „praktyczny przewodnik”;
- „co naprawdę działa”;
- „realne widełki”;
- „kiedy warto i jak nie przepłacić”.

Nie trzeba usuwać tematów. Trzeba zdecydować, czy blog jest główną strategią marki. Jeśli tak, homepage musi mówić o procesach, danych i narzędziach. Jeśli nie, blog powinien zostać przeniesiony do wyraźnej sekcji „Archiwum / wcześniejsze projekty” lub otrzymać nowy plan tematyczny.

Artykuł:

> „Jak firma produkcyjna zaoszczędziła ~120h miesięcznie dzięki automatyzacji”

jest szczególnie ryzykowny, jeśli nie istnieje publicznie zweryfikowane źródło tego wyniku. Bez dowodu nie należy używać twardej liczby w tytule. Można napisać o metodzie liczenia czasu albo o scenariuszu, bez sugerowania własnego case study.

---

## 9. Wytyczne redakcyjne dla marki

### 9.1. Co wyrzucić ze słownika głównej marki

Nie używać jako głównej obietnicy:

- „sprawne IT” bez dopowiedzenia, co to zmienia;
- „proste narzędzia”, „lekka aplikacja”, „prosta strona”, jeśli nie chodzi świadomie o zakres;
- „dodatkowo” przed automatyzacją, danymi i aplikacjami;
- „od ręki”, „zawsze”, „bez ukrytych kosztów”, gdy nie ma formalnego procesu, który to gwarantuje;
- „founder”, „Proof of competence”, „web apps”, „customowa” w polskich nagłówkach;
- „rwie się Wi-Fi”, „wolny komputer”, „awarie i gaszenie” poza sekcją przykładów problemów;
- „nie wielki projekt”, „nie chcę stawiać w kontrze” — negatywne, defensywne otwarcia;
- „realnie”, „praktycznie”, „naprawdę”, gdy nie następuje po nich konkretny warunek lub dowód.

### 9.2. Jak pisać o wartości biznesowej

Każdy opis usługi powinien odpowiadać kolejno na cztery pytania:

1. **Co dziś zatrzymuje pracę?** — np. dane są przepisywane między ERP, Excelem i mailem.
2. **Co zmieniam?** — łączę źródła, porządkuję statusy, buduję jeden widok.
3. **Co pozostaje pod kontrolą firmy?** — konta, dane, systemy, zakres i decyzje.
4. **Jak sprawdzimy pierwszy efekt?** — na jednym procesie, dokumencie, statusie lub scenariuszu.

Przykład:

> „Jeśli status przesyłki wymaga sprawdzania kilku portali, łączę te informacje w jeden widok. Zaczynam od jednego przewoźnika lub procesu, żeby sprawdzić zakres na codziennej pracy zespołu.”

To jest mocniejsze niż:

> „Buduję lekkie narzędzie, które porządkuje ten fragment procesu.”

### 9.3. Ton

- Polski, prosty, rzeczowy.
- Pierwsza osoba liczby pojedynczej, gdy mowa o Tomaszu; bez korporacyjnego „zespół dostarczy”.
- Najpierw problem klienta i efekt w jego pracy, potem technologia.
- Terminy techniczne tylko wtedy, gdy pomagają podjąć decyzję; przy pierwszym użyciu z krótkim objaśnieniem.
- Zero sztucznej poufałości i zero startupowego zadęcia.
- Nie ukrywać ograniczeń: brak publicznych referencji, brak cennika i brak 24/7 można kompensować procesem, zakresem i uczciwą kwalifikacją, nie obietnicą.
- Nie sprzedawać „AI” jako celu. Sprzedawać krótszą pracę ręczną, lepszy dostęp do informacji, mniej przepisywania i kontrolę nad wyjątkiem — jeśli faktycznie to jest celem procesu.

### 9.4. Dowody bez fabrykowania

Do czasu uzyskania zgody i materiału źródłowego używać:

- opisów własnych produktów jako „zbudowane narzędzie”;
- anonimowych przykładów technicznych bez klienta, wyniku i logo;
- schematów procesu „przed/po” jako ilustracji sposobu pracy, nie jako case study;
- jasnej informacji, co jest przykładem, a co faktycznym wdrożeniem.

Nie używać:

- „klient zaoszczędził X godzin”, jeśli nie ma zgody i dowodu;
- „pierwszy klient referencyjny” w widocznym CTA, jeśli brak referencji ma być problemem do rozwiązania wewnętrznie;
- nazw klientów, certyfikatów i wyników dopowiedzianych na podstawie samego stacku.

---

## 10. Rekomendowana decyzja strategiczno-redakcyjna

Najpierw trzeba rozstrzygnąć, która z tych dwóch dróg jest główną marką:

### Wariant A — gotovalues jako partner od procesów, danych i narzędzi

- Homepage przejmuje język `/jak-pracuje`, `/dla-produkcji`, `/dla-logistyki` i bloga.
- Lokalne IT jest osobną, jasno nazwaną ścieżką: „bieżące IT dla małych firm”, bez przejmowania H1.
- Formularz główny pyta o proces/problem, a formularz lokalny o sieć, sprzęt i pocztę.
- SupportFlow, TriageFlow i kalkulator ROI mogą mieć sens jako produkty/zasoby w osobnej sekcji.
- Cavi i Akta mogą być dowodami własnych umiejętności, ale trzeba jasno wyjaśnić, że nie są ofertą dla każdego klienta.

### Wariant B — gotovalues jako lokalne wsparcie IT

- Podstrony AI, logistyki i produkcji zostają wycofane z globalnej nawigacji, stopki i sitemap albo otrzymują osobną markę.
- Blog zostaje przepisany tak, aby wspierał lokalne IT, albo jest oznaczony jako archiwum.
- Formularze i metadane są lokalne i serwisowe.
- Nie należy utrzymywać strony o „dedykowanych aplikacjach i AI” jako widocznego drugiego biznesu pod tą samą ścieżką.

**Ocena:** Dostarczone źródła przemawiają za wariantem A jako lepszym wykorzystaniem potwierdzonych kompetencji i istniejącego materiału blogowego. Wariant B może być prostszy operacyjnie, ale świadomie spycha właściciela do konkurencji cenowej z lokalnymi serwisantami i czyni większość istniejących treści nieprzydatną.

Nie należy jednak wdrażać wariantu A połowicznie. Najgorszym rozwiązaniem pozostaje obecna hybryda: H1 o Wi-Fi, stopka o agentach AI, blog o aplikacjach, formularz o naprawie komputera i metadane, które próbują opisać wszystko naraz.

---

## 11. Lista decyzji przed przepisywaniem treści

1. Czy główną ofertą jest partner od procesów/danych/aplikacji, czy lokalne IT?
2. Czy lokalne wsparcie IT ma być osobną ścieżką, osobną stroną, czy głównym wejściem?
3. Czy SupportFlow i TriageFlow są aktywną ofertą, produktami demonstracyjnymi czy archiwum?
4. Czy Cavi i Akta mają wrócić jako dowód kompetencji, a jeśli tak — w jakiej uczciwej roli?
5. Czy istnieją potwierdzone dane dla tytułu artykułu o „~120h miesięcznie”? Jeśli nie, tytuł trzeba zmienić.
6. Czy można realnie obiecać odpowiedź w 24 godziny w dni robocze i co oznacza „od ręki”?
7. Jaki jest rzeczywisty model rozliczeń: stały zakres, stawka godzinowa, opieka, czy kilka modeli?
8. Czy marka chce mówić „Tomasz”, „właściciel”, czy formalnie „Tomasz Gołaszewski”? Wszędzie trzeba używać jednej wersji.
9. Które terminy angielskie są niezbędne dla SEO/odbiorcy, a które są pozostałością po poprzednim copy?
10. Czy stopka, sitemap, `/llms.txt`, `/ai.txt` i Schema.org mają opisywać tę samą główną ofertę? Odpowiedź powinna brzmieć: tak.

## Konkluzja

Problemem nie jest brak tekstu. Tekstu jest dużo. Problemem jest brak decyzji, co gotovalues sprzedaje jako pierwsze. Obecna strona mówi „przyjadę naprawić Wi-Fi”, podstrony mówią „uporządkuję proces i zbuduję narzędzie”, a blog mówi „znam AI, BI i aplikacje”. Każda z tych obietnic może być prawdziwa, ale razem — bez hierarchii i osobnych ścieżek — obniżają wiarygodność wszystkich.

Najpierw trzeba wybrać główną obietnicę. Dopiero potem przepisać H1, intro, ofertę, rysunek, formularze, stopkę, metadane i endpointy AI tak, aby wszystkie mówiły jednym głosem. W treści należy przejść od listy czynności do opisu zmiany w pracy firmy, bez dopisywania dowodów, których repozytorium nie potwierdza.
