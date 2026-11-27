# 05 — Market Research & SEO Research

**Data:** 2026-11-27  
**Tryb:** analiza wyłącznie na podstawie zweryfikowanych źródeł  
**Zakres:** konkurencja, luki rynkowe, intencje wyszukiwania, SEO techniczne i treściowe oraz rekomendowana architektura SEO dla `gotovalues.com`

## 1. Zakres i zastrzeżenia metodologiczne

Raport korzysta wyłącznie z:

- `docs/content-audit/00-AUDIT-BRIEF.md`;
- `docs/content-audit/01-CURRENT-STATE.md`;
- `/tmp/gv_market_sources.md`;
- `/tmp/gv_prod_audit.json`;
- `src/app/layout.tsx`;
- `src/app/sitemap.ts`;
- `src/app/llms.txt/route.ts`;
- tytułów, slugów, opisów, dat i tagów z `src/content/blog.ts`.

Źródło rynkowe podaje łącznie **11 nazwanych podmiotów**, mimo że brief mówi o analizie „9 rzeczywistych podmiotów”. Wynika to z listy 3 lokalnych + 4 regionalnych + 4 ogólnopolskich. Aby nie pomijać podmiotów wskazanych w źródle, poniżej analizuję wszystkie 11 i jawnie zaznaczam tę rozbieżność. Nie wnioskuję z samej obecności firmy w źródle o jej pełnym udziale rynkowym, jakości realizacji ani pozycji w Google.

## 2. Szybki obraz rynku

Rynek dzieli się na trzy wyraźne poziomy:

1. **Lokalne wsparcie infrastruktury i sprzętu** — Wyszków i powiat wyszkowski. Klient kupuje dostępność, naprawę, sieć, sprzęt, backup i opiekę.
2. **Regionalny outsourcing IT** — pas S8 i Mazowsze. Klient kupuje abonament, SLA, pakiet godzin, serwis stanowisk oraz administrację siecią i serwerami.
3. **Doradztwo i wdrożenia procesowe** — cała Polska. Klient kupuje diagnozę procesu, automatyzację, integracje, BI lub dedykowane narzędzie, zwykle w projekcie o większej wartości niż pojedyncza interwencja serwisowa.

Z punktu widzenia gotovalues najważniejsza nie jest walka cenowa o naprawę komputera. Największy potencjał leży w czytelnym połączeniu dwóch zdolności:

- lokalnego, praktycznego wsparcia IT dla małej firmy;
- zdalnego porządkowania procesów, danych, integracji, automatyzacji i aplikacji dla MŚP.

Obecna domena ma już treści dla drugiego poziomu — 17 artykułów o automatyzacji, AI, BI, aplikacjach i integracjach — ale strona główna komunikuje przede wszystkim pierwszy poziom: Wi-Fi, komputery, pocztę, drukarki i awarie w Zabrodziu. To tworzy problem nie tyle braku treści, ile braku jednej zrozumiałej architektury oferty.

## 3. Porównanie konkurencji i podmiotów porównywalnych

### 3.1. Lokalni — Wyszków i powiat wyszkowski

| Podmiot                           | Pozycjonowanie                                   | Komunikacja rynkowa                                                                                     | Model cenowy / współpracy                                                           | Mocne strony                                                                   | Słabe strony / ograniczenia widoczne w źródle                                                                                                          | Luka dla gotovalues                                                                                                                  |
| --------------------------------- | ------------------------------------------------ | ------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------- | ------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------ |
| **ZITCOM**                        | Kompleksowa obsługa IT i outsourcing dla firm    | Serwis, sieci LAN/Wi-Fi, monitoring, pomoc zdalna i stacjonarna; źródło wymienia też AI i automatyzację | Brak zweryfikowanego publicznego cennika w źródle; model obsługi lokalnej i zdalnej | 25+ lat lokalnej obecności; szeroki zakres; połączenie serwisu i outsourcingu  | Szeroka oferta może być odbierana jako ogólna; źródło nie opisuje konkretnej specjalizacji procesowej ani dowodów efektu                               | Wąsko opisana diagnoza procesu, integracje, BI i małe aplikacje jako osobna ścieżka dla firm, które wyrosły poza samą infrastrukturę |
| **DERACOM**                       | Sklep i opieka nad sprzętem oraz oprogramowaniem | Sklep stacjonarny, serwery, sieci, backup, odzyskiwanie danych, urządzenia fiskalne i WAPRO ERP         | Umowy stałe z SLA albo wsparcie doraźne; brak zweryfikowanych kwot w źródle         | Lokalna obecność, sprzęt, serwery, backup, szeroka obsługa urządzeń i systemów | Przekaz skupiony na sprzęcie, serwisie i administracji; brak w źródle wyraźnego pozycjonowania na analizę danych, automatyzację i dedykowane aplikacje | Warstwa „co dalej po ustabilizowaniu IT”: przepływy danych, automatyzacja i narzędzie dopasowane do procesu                          |
| **TOP-SERVICE (Marek Stokarski)** | Lokalny serwis urządzeń                          | Diagnostyka i naprawa PC/laptopów, konfiguracja sieci, odzyskiwanie danych                              | Usługa doraźna; źródło nie podaje cennika                                           | Jasny, prosty zakres usług serwisowych                                         | Wąski zakres i silna ekspozycja pracy reaktywnej; brak potwierdzonej oferty abonamentowej, procesowej lub analitycznej                                 | Odejście od porównania „kto taniej naprawi” do opieki nad całością pracy firmy i jej rozwojem                                        |

**Wniosek lokalny:** gotovalues nie powinno udawać, że nie istnieje lokalny popyt na sieć i sprzęt. Powinno jednak oddzielić usługę wejściową („ustabilizuję podstawy IT”) od usługi o wyższej wartości („uporządkuję proces i dane”). ZITCOM i DERACOM pokazują, że lokalny klient rozumie outsourcing i stałą opiekę; TOP-SERVICE reprezentuje segment interwencji serwisowych. Przewagą gotovalues nie jest sam fakt dojazdu, lecz przejście od problemu technicznego do rozwiązania operacyjnego.

### 3.2. Regionalni — Mazowsze i pas S8

| Podmiot                | Pozycjonowanie                         | Komunikacja rynkowa                                                   | Model cenowy / współpracy                                                                                                                               | Mocne strony                                                                             | Słabe strony / ograniczenia widoczne w źródle                                                        | Luka dla gotovalues                                                                                               |
| ---------------------- | -------------------------------------- | --------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| **Ravnet**             | Outsourcing IT dla małych firm         | Audyt infrastruktury, sieci, backupy, SLA, abonamenty                 | Abonamenty i SLA; brak zweryfikowanych kwot w źródle                                                                                                    | Jasny model opieki i infrastruktury; dopasowanie do małych firm                          | Brak w źródle wyraźnego przekazu o aplikacjach, BI, automatyzacji i analizie procesu                 | „Opieka IT plus warstwa usprawnień”: najpierw stabilność, potem integracja i automatyzacja                        |
| **Pat15**              | Obsługa informatyczna firm na pasie S8 | Pomoc zdalna, dojazd, pakiety godzinowe                               | Źródło podaje pakiety 2–6 h/mies. około 500–1700 zł netto oraz pomoc zdalną 150–300 zł netto/h                                                          | Przejrzyste jednostki zakupu; geograficzne dopasowanie do pasa S8; niska bariera wejścia | Model godzinowy może ustawiać rozmowę na czas reakcji, nie na efekt biznesowy                        | Oferta projektowa rozliczana za uporządkowany rezultat oraz ścieżka od wsparcia do automatyzacji                  |
| **Syslink / Darnet24** | Sieci i infrastruktura                 | LAN/Wi-Fi, routery, switche, AP, firewalle/UTM, okablowanie           | Źródło podaje orientacyjnie: 200–500 zł netto za urządzenie, firewalle od 1500 zł netto, 120–150 zł za punkt LAN, wizyty 250–350 zł netto/h             | Konkretna infrastruktura i zakresy prac; łatwo zrozumiała oferta techniczna              | Skupienie na warstwie sieciowej; brak w źródle oferty procesowej, analitycznej lub aplikacyjnej      | Przejęcie rozmowy po infrastrukturze: dane, obiegi dokumentów, dashboardy i narzędzia wokół istniejących systemów |
| **eBit / IT-Leader**   | Stała opieka IT dla małych firm        | Stanowiska, serwery, backup i ochrona przed ransomware, pomoc doraźna | Źródło podaje abonamenty dla 5–10 stanowisk około 500–2000 zł netto/mies.; także 70–200 zł/stanowisko/mies. lub 40–90 zł/stanowisko + 200–500 zł/serwer | Przewidywalna opieka, backup i komunikat bezpieczeństwa; jasny abonament                 | Oferta pozostaje głównie w obszarze utrzymania IT; brak w źródle mocnego mostu do automatyzacji i BI | Pakiet „spokojna infrastruktura + usprawnienie jednego procesu” bez konieczności zmiany dostawcy wszystkiego      |

**Wniosek regionalny:** pas S8 jest naturalnym obszarem komunikacji, bo łączy lokalną dostępność z możliwością obsługi zdalnej. Nie należy kopiować abonamentów ani deklarować stawek bez decyzji biznesowej. W SEO można natomiast jasno mówić o obszarze obsługi: Zabrodzie, powiat wyszkowski, Wyszków, Radzymin, Wołomin, Warszawa i zdalnie cała Polska.

### 3.3. Ogólnopolscy — konsulting, automatyzacja, BI i aplikacje dla MŚP

| Podmiot                   | Pozycjonowanie                                                | Komunikacja rynkowa                                                                                 | Model cenowy / współpracy                                   | Mocne strony                                                                      | Słabe strony / ograniczenia widoczne w źródle                                                                                    | Luka dla gotovalues                                                                                                     |
| ------------------------- | ------------------------------------------------------------- | --------------------------------------------------------------------------------------------------- | ----------------------------------------------------------- | --------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| **ITmore**                | Konsulting operacyjno-technologiczny dla MŚP, w tym produkcji | Optymalizacja procesów, ERP, dedykowane aplikacje branżowe zastępujące papier i Excel               | Projekty wdrożeniowe; brak zweryfikowanego cennika w źródle | Łączy proces, technologię i domenę produkcyjną                                    | Może być odbierany jako cięższy konsulting lub większe wdrożenie; źródło nie podaje lekkiej ścieżki dla małego lokalnego biznesu | Lekki start: jedno wąskie gardło, krótka diagnoza, mały zakres i możliwość zakończenia na integracji lub automatyzacji  |
| **DigitalDevelopment.pl** | Agencja automation-first                                      | Make, n8n, AppSheet, low-code/no-code, szybkie MVP i back-office                                    | MVP w kilkanaście dni; brak zweryfikowanych kwot w źródle   | Szybkość i niski próg wejścia; narzędzia łatwe do wyjaśnienia                     | Ryzyko postrzegania jako wykonawca automatyzacji narzędziowej; źródło nie opisuje pełnej opieki nad infrastrukturą IT            | Niezależna diagnoza: najpierw proces i koszt błędu, dopiero potem wybór low-code, integracji lub kodu                   |
| **PIRXON**                | Inteligentna automatyzacja procesów biznesowych               | BPA, RPA, low-code, AI, integracja rozproszonych danych i back-office bez kosztownej przebudowy ERP | Projekty; brak zweryfikowanego cennika w źródle             | Bardzo bliskie potrzebom procesowym MŚP; mocny przekaz integracji i automatyzacji | Silna konkurencja w obszarze, w którym gotovalues nie może opierać przewagi wyłącznie na słowach „AI” i „automatyzacja”          | Przewaga osobistej, krótkiej ścieżki decyzyjnej oraz połączenia wiedzy operacyjnej z lokalnym wsparciem IT              |
| **FRNT**                  | Dedykowane oprogramowanie dla MŚP i BI                        | MES, rozliczanie usług, dashboardy i wdrożenia Business Intelligence                                | Projekty wdrożeniowe; brak zweryfikowanego cennika w źródle | Konkretne rozwiązania branżowe i BI                                               | Specjalizacja może wyglądać na cięższą lub bardziej branżową niż potrzeba małej firmy z jednym problemem                         | Oferta małych, mierzalnych usprawnień: dashboard lub narzędzie wokół istniejącego systemu, bez deklarowania pełnego MES |

**Wniosek ogólnopolski:** gotovalues ma pole do pozycjonowania jako niezależny specjalista „od procesu do działającego rozwiązania”, ale nie może twierdzić, że jest jedynym takim podmiotem. Podobny wzorzec niezależnego konsultanta jest wymieniony w źródle rynkowym. Przewagę trzeba budować przez konkretny sposób pracy, ograniczony zakres pierwszego kroku, połączenie kompetencji operacyjnych i technicznych oraz uczciwe wskazanie, kiedy nie budować aplikacji.

### 3.4. Orientacyjne poziomy wartości zleceń

Źródło rynkowe podaje następujące orientacyjne poziomy, których nie należy traktować jako cennika gotovalues:

- doraźna pomoc zdalna lub serwis PC: około 100–300 zł netto za interwencję lub godzinę;
- stały abonament IT dla małej firmy z 5–10 stanowiskami: około 500–2000 zł netto miesięcznie;
- konsulting procesowy, automatyzacja, BI i dedykowane aplikacje webowe dla MŚP: projekty wielotysięczne, około 4000–30 000+ zł netto za etap lub wdrożenie.

Z samego porównania wynika różnica ekonomiczna: interwencja serwisowa jest produktem o wysokiej wrażliwości cenowej, a uporządkowanie procesu jest produktem projektowym. Raport nie przesądza, jaką strukturę cenową powinno przyjąć gotovalues.

## 4. Realne luki i nisze dla gotovalues

### 4.1. Most między stabilnym IT a usprawnieniem pracy

Konkurencja lokalna i regionalna dobrze zagospodarowuje pytanie: „kto naprawi komputer, sieć, backup lub serwer?”. Konkurencja ogólnopolska odpowiada na pytanie: „kto zautomatyzuje proces, zintegruje systemy albo zbuduje aplikację?”. Mniej oczywista jest oferta dla firmy, która:

1. potrzebuje najpierw uporządkować podstawy IT;
2. ma pracę rozproszoną między mailem, Excelem, PDF-ami i kilkoma systemami;
3. nie chce od razu wielkiego wdrożenia ERP ani dużego software house’u;
4. potrzebuje jednego partnera, który potrafi rozpoznać, czy wystarczy konfiguracja, integracja, automatyzacja czy kod.

To jest najważniejsza luka komunikacyjna. Nie należy przedstawiać jej jako potwierdzonej luki całego rynku w sensie liczbowym; jest to wniosek strategiczny z porównania zakresów opisanych w źródle.

### 4.2. Pas S8 jako obszar obecności, nie obietnica wyłączności

Zabrodzie i powiat wyszkowski mogą być bazą lokalnej wiarygodności. Wyszków, Radzymin, Wołomin i Warszawa tworzą logiczny pas obsługi dojazdowej i zdalnej. Komunikat powinien rozróżniać:

- **na miejscu:** podstawowe wsparcie IT, sieci, Wi-Fi, sprzęt, poczta, backup i helpdesk;
- **zdalnie w całej Polsce:** analiza procesu, integracje, automatyzacja, dashboardy i aplikacje webowe;
- **hybrydowo:** stabilizacja środowiska plus usprawnienie wybranego procesu.

Nie należy używać sformułowania „obsługuję cały pas S8” bez potwierdzenia realnej gotowości dojazdów i warunków obsługi.

### 4.3. Proces przed narzędziem

DigitalDevelopment.pl, PIRXON i podmioty podobnego typu konkurują w słowniku automatyzacji. Samo używanie słów „AI”, „RPA”, „low-code” lub „n8n” nie wyróżnia. Bardziej użyteczne pozycjonowanie to:

- opis problemu i jego kosztu przed wyborem technologii;
- sprawdzenie, czy wystarczy obecne narzędzie lub integracja;
- mały pierwszy zakres zamiast obietnicy transformacji;
- możliwość zakończenia na rekomendacji, jeśli budowa nie ma sensu;
- człowiek odpowiedzialny za decyzję, a nie anonimowy zespół dostawcy.

### 4.4. Analityka jako warstwa decyzyjna

Blog obejmuje dashboardy, KPI i analizę danych, ale obecna strona główna praktycznie tego nie pokazuje. To luka między deklarowaną kompetencją a pierwszym wrażeniem. Należy wyjaśnić, że dashboard lub raport nie jest ozdobnym ekranem, tylko sposobem zobaczenia:

- gdzie proces się zatrzymuje;
- które dane są przepisywane ręcznie;
- jakie wyjątki wymagają pracy człowieka;
- czy usprawnienie dało oczekiwany efekt.

Nie wolno dodawać niepotwierdzonych wyników, nazw klientów ani case studies. Można opisywać typowe problemy i sposób analizy bez przypisywania efektów konkretnemu wdrożeniu.

## 5. Mapa intencji wyszukiwania

### 5.1. Warstwa lokalna

#### Intencja transakcyjna — „potrzebuję pomocy teraz”

Przykładowe klastry słów kluczowych:

- usługi IT dla firm Zabrodzie;
- informatyk dla firmy Zabrodzie;
- wsparcie IT dla małej firmy Wyszków;
- obsługa informatyczna firm Wyszków;
- serwis komputerowy dla firmy Wyszków;
- naprawa komputerów firmowych Wyszków;
- pomoc IT dla firmy powiat wyszkowski;
- sieci Wi-Fi dla firmy Wyszków;
- konfiguracja sieci firmowej Wyszków;
- backup dla małej firmy Wyszków;
- zdalny helpdesk dla małej firmy;
- informatyk dla JDG Wyszków.

**Treść docelowa:** jedna strona lokalnej usługi IT, z jasnym obszarem obsługi, zakresem, sposobem kontaktu i ograniczeniami. Nie tworzyć wielu prawie identycznych stron dla każdej miejscowości bez osobnej, realnej treści.

#### Intencja abonamentowa — „chcę stałej opieki”

- abonament IT dla małej firmy;
- outsourcing IT dla małej firmy Wyszków;
- opieka informatyczna firmy Wyszków;
- helpdesk IT dla firmy;
- stała opieka nad komputerami i siecią;
- backup i bezpieczeństwo małej firmy.

**Treść docelowa:** opis modelu opieki bez publikowania ceny, dopóki nie ma zatwierdzonego cennika. Można przedstawić zakres i sposób kwalifikacji.

#### Intencja problemowa — „mam konkretną awarię lub ryzyko”

- rwie Wi-Fi w biurze;
- konfiguracja poczty firmowej;
- kopie zapasowe dla małej firmy;
- wolne komputery w firmie;
- zabezpieczenie komputerów firmowych;
- jak uporządkować IT w małej firmie.

**Treść docelowa:** poradnik lub sekcja FAQ prowadząca do usługi, bez obietnic natychmiastowej naprawy i bez udawania całodobowego SLA.

#### Intencja regionalna

Klastry lokalizacyjne do ostrożnego testowania:

- usługi IT Wyszków, Wołomin, Radzymin, Warszawa;
- outsourcing IT pas S8;
- informatyk dla firmy Wołomin / Radzymin;
- sieci i Wi-Fi dla firmy powiat wyszkowski;
- zdalne wsparcie IT Mazowsze.

Lokalizacje powinny być przypisane do faktycznie dostępnej usługi. Dla usług projektowych lepsza będzie jedna strona „Mazowsze i zdalnie cała Polska” niż seria stron z powtarzanym tekstem.

### 5.2. Warstwa ogólnopolska

#### Doradztwo i diagnoza procesu

- doradztwo IT dla MŚP;
- konsultant IT dla małej firmy;
- analiza procesu biznesowego przed wdrożeniem;
- jak uporządkować proces w firmie;
- automatyzacja procesów doradztwo;
- audyt procesu i automatyzacja.

#### Automatyzacja i integracje

- automatyzacja procesów w firmie;
- automatyzacja procesów dla MŚP;
- automatyzacja obiegu dokumentów;
- integracja systemów IT w firmie;
- integracja ERP z innymi systemami;
- Make, n8n lub dedykowana automatyzacja;
- pipeline OCR ekstrakcja danych dokumentów;
- automatyzacja back-office.

#### Aplikacje webowe

- dedykowana aplikacja webowa dla firmy;
- aplikacja webowa dla MŚP;
- customowa aplikacja czy gotowe narzędzie;
- kiedy Excel nie wystarcza;
- aplikacja do obiegu dokumentów;
- narzędzie wokół istniejącego ERP;
- ile kosztuje aplikacja webowa dla firmy.

#### Dane, BI i KPI

- dashboard analityczny dla firmy;
- dashboard BI dla MŚP;
- KPI dashboard dla firmy;
- analiza danych w firmie;
- dashboard dla produkcji;
- raportowanie danych z ERP i CRM;
- jak wybrać KPI dla firmy.

#### AI dla firm

- AI dla firmy MŚP;
- automatyzacja procesów z AI;
- AI do dokumentów i OCR;
- agenci AI dla biznesu;
- AI w procesach operacyjnych;
- konsultant AI dla firmy.

**Relacja do istniejącego bloga:** 17 artykułów już obejmuje większość powyższych klastrów. Największym problemem jest brak wyraźnej strony usługowej, która zbiera autorytet z artykułów i tłumaczy, jaki następny krok może wykonać gotovalues. Blog nie powinien zastępować stron ofertowych.

## 6. Audyt SEO technicznego i treściowego

### 6.1. Metadane i tytuły

**Strona główna:** w produkcyjnym audycie `<title>` ma wartość `gotovalues`, mimo że w `layout.tsx` globalny `metadata.title.default` jest równy `brandName`, a template ma postać `%s | gotovalues`. To utrata najważniejszego sygnału tematycznego strony głównej. Opis meta jest znacznie lepszy: zawiera małe firmy, JDG, Zabrodzie, powiat wyszkowski, Polskę i zakres lokalnego IT.

**`/jak-pracuje`:** produkcyjny tytuł `gotovalues — jak pracuję: AI, web apps, procesy | gotovalues` powtarza nazwę marki. To nie jest krytyczny błąd techniczny, ale jest niepotrzebnie długie i niespójne z resztą tytułów.

**Pozostałe trasy:** tytuły stron ofertowych są opisowe, lecz obecna architektura ma problem strategiczny: opisują różne firmy. `/` mówi o lokalnym IT, a `/dla-produkcji`, `/dla-logistyki`, `/supportflow`, `/triageflow`, `/kalkulator-roi` i `/blog` mówią o automatyzacji, AI, procesach oraz aplikacjach.

### 6.2. Kanibalizacja i topical authority

Obecna sytuacja nie jest klasyczną kanibalizacją jednego słowa kluczowego w dwóch artykułach. To przede wszystkim **rozszczepienie tematyczne domeny**:

- strona główna i FAQ celują w lokalne IT, sprzęt, Wi-Fi, helpdesk i backup;
- 17 artykułów celuje w automatyzację, AI, BI, KPI, integracje i aplikacje webowe;
- podstrony ofertowe celują w produkcję, logistykę, SupportFlow i TriageFlow;
- `/llms.txt` łączy lokalne wsparcie z `Proof of competence` dla Cavi i Akta oraz linkami do stron AI.

W efekcie użytkownik i wyszukiwarka dostają kilka różnych odpowiedzi na pytanie „czym jest gotovalues?”. Należy wybrać nadrzędną architekturę: **gotovalues jako niezależny partner IT dla MŚP, od stabilnego środowiska IT do uporządkowania procesu**. Lokalne wsparcie i wdrożenia zdalne powinny być osobnymi ścieżkami, a nie wzajemnie wypierającymi się tożsamościami.

### 6.3. Nagłówki

- H1 strony głównej `Sprawne IT dla małej firmy i JDG.` jest krótki i zrozumiały, ale nie przekazuje różnicy między prostym serwisem a kompetencją procesową.
- H2 strony głównej `Usługi IT dla małych firm i JDG` jest generyczny. Pozostałe H2 — `Opracował`, `Uwagi` — należą do metafory rysunku technicznego, ale nie wzmacniają intencji wyszukiwania.
- H1 `/dla-produkcji` jest konkretny i zawiera ważny problem „bez wymiany ERP”.
- H1 `/dla-logistyki` ma 21 słów i łączy statusy, dokumenty, wymianę danych, TMS, ERP oraz spedycję. To dobry opis zakresu, ale słaby pierwszy komunikat. H2 są również bardzo długie i miejscami pełnią funkcję akapitów.
- H1 `/jak-pracuje` dobrze wyraża metodę, lecz nie zawiera oczywistego terminu „doradztwo IT”, „automatyzacja” lub „aplikacje dla firm”.
- H1 bloga `Praktycznie o aplikacjach, AI i procesach.` jest czytelny, ale nie łączy się z lokalną stroną główną.

Zasada docelowa: jeden H1 = jedna obietnica i jeden główny problem odbiorcy. Szczegóły technologiczne, branżowe i wyjątki powinny zejść do krótszych H2/H3.

### 6.4. Schema.org

`layout.tsx` publikuje graf `WebSite` i `ProfessionalService`, wraz z `PostalAddress` dla Zabrodzia, `areaServed` obejmującym Zabrodzie, powiat wyszkowski i Polskę oraz `knowsAbout` dotyczącym lokalnego IT i automatyzacji. To dobry fundament lokalny.

W raporcie bieżącym wskazano także obecność `FAQPage` w warstwie strony głównej. Należy utrzymać zgodność pytań i odpowiedzi ze stroną widoczną dla użytkownika. Nie dodawać schematu dla treści, których strona faktycznie nie pokazuje. `ProfessionalService` powinien opisywać rzeczywistą, nadrzędną ofertę, a nie maskować konflikt między serwisem lokalnym a konsultingiem procesowym.

### 6.5. `sitemap.xml`

`src/app/sitemap.ts` dodaje do mapy:

- stronę główną z priorytetem 1;
- `/jak-pracuje` z priorytetem 0.85;
- `/supportflow`, `/triageflow`, `/dla-produkcji`, `/dla-logistyki` z priorytetem 0.8;
- blog z priorytetem 0.8 i 17 stron artykułów z priorytetem 0.6;
- `/vs-freelancer-automatyzator`, `/llms.txt`, `/ai.txt` i kalkulator ROI.

Priorytety nie są gwarancją rankingu, ale obecna mapa jasno promuje stare strony AI/procesowe mimo lokalnego przekazu strony głównej. Dodatkowo `llms.txt` i `ai.txt` są traktowane jak element sitemap, choć są dokumentami pomocniczymi, a nie stronami docelowymi SEO. Po uporządkowaniu oferty sitemap powinna zawierać przede wszystkim kanoniczne strony usługowe, lokalną stronę usługi, blog i politykę prywatności, a wycofywane lub nieaktualne trasy powinny zostać przekierowane albo wyłączone z indeksowania zgodnie z decyzją biznesową.

### 6.6. `/llms.txt`

`src/app/llms.txt/route.ts` bierze nagłówek i pozycjonowanie z `siteContent.aiSummary`, które mówią o wsparciu IT dla małych firm i JDG. Jednocześnie publikuje:

- sekcję `Proof of competence` z Cavi i Akta;
- kluczowe strony TriageFlow i SupportFlow AI;
- strony workflow dla produkcji i logistyki;
- blog o AI i automatyzacji.

To jest bezpośrednia niespójność dla systemów AI i wyszukiwarek generatywnych. Dokument powinien odpowiadać tej samej architekturze co strona główna: jasno rozdzielać lokalne wsparcie IT, usługi zdalne dla MŚP i ewentualne przykłady kompetencji. Jeśli Cavi i Akta mają pozostać ukryte na publicznych stronach, nie powinny być jednocześnie eksponowane jako proof w publicznym `llms.txt` bez świadomej decyzji.

## 7. Rekomendowana architektura SEO

### 7.1. Nadrzędne pozycjonowanie

Rekomendowana formuła robocza:

> **gotovalues pomaga małym firmom uporządkować IT i procesy: lokalnie stabilizuje podstawy pracy, a zdalnie łączy analizę procesu, dane, integracje, automatyzację i proste aplikacje.**

To nie jest gotowy claim do publikacji bez akceptacji. Jest to architektura, która łączy oba obecne światy bez twierdzenia, że każda usługa jest dla każdego klienta.

### 7.2. Docelowe grupy stron

1. **Strona główna `/`** — nadrzędna oferta dla MŚP; dwa wejścia: „potrzebuję stabilnego IT” i „chcę uporządkować proces”.
2. **`/uslugi-it-dla-firm` lub podobna kanoniczna ścieżka lokalna** — Zabrodzie, powiat wyszkowski, Wyszków i obszar dojazdu; sieci, sprzęt, poczta, backup, helpdesk.
3. **`/automatyzacja-procesow-dla-firm`** — diagnoza, workflow, integracje, OCR i automatyzacja dla MŚP.
4. **`/aplikacje-webowe-dla-firm`** — kiedy wystarczy narzędzie, integracja lub low-code, a kiedy aplikacja dedykowana.
5. **`/analiza-danych-bi-dla-firm`** — dashboardy, KPI, integracja źródeł i decyzje na danych.
6. **Strony problemowe/branżowe** — produkcja i logistyka tylko wtedy, gdy gotovalues faktycznie chce je sprzedawać jako priorytetowe segmenty.
7. **Blog** — klastry wspierające strony usługowe, z linkiem do jednej właściwej strony nadrzędnej dla każdego tematu.

Nie należy utrzymywać równocześnie kilku stron przedstawiających gotovalues jako lokalnego serwisanta, dostawcę agentów AI, konsultanta produkcyjnego i dostawcę produktu SaaS bez wyjaśnienia relacji między nimi.

### 7.3. Proponowane tytuły i opisy meta

Poniższe teksty są propozycjami do akceptacji, nie opisem stanu obecnego.

| Trasa             | Proponowany `<title>`                                   | Proponowany `meta description` |
| ----------------- | ------------------------------------------------------- | ------------------------------ |
| `/`               | `Wsparcie IT i automatyzacja dla małych firm            | gotovalues`                    | `Pomagam małym firmom uporządkować IT i codzienną pracę: sieci, komputery, poczta, backup, integracje, automatyzacja i proste narzędzia. Zabrodzie, powiat wyszkowski i zdalnie w całej Polsce.` |
| Lokalna usługa IT | `Usługi IT dla firm — Zabrodzie, Wyszków i okolice      | gotovalues`                    | `Lokalne wsparcie IT dla małych firm i JDG: sieci Wi-Fi, komputery, poczta, backup i helpdesk. Zabrodzie, powiat wyszkowski, Wyszków oraz uzgodnione dojazdy.`                                   |
| Automatyzacja     | `Automatyzacja procesów dla MŚP — analiza i wdrożenie   | gotovalues`                    | `Najpierw porządkujemy proces, potem wybieramy gotowe narzędzie, integrację, workflow lub kod. Automatyzacja dokumentów, danych i pracy operacyjnej dla firm w całej Polsce.`                    |
| Aplikacje         | `Dedykowane aplikacje webowe dla firm — kiedy mają sens | gotovalues`                    | `Sprawdź, czy problem rozwiąże gotowe narzędzie, integracja czy aplikacja webowa. Projektuję lekkie rozwiązania wokół istniejących procesów i systemów.`                                         |
| BI                | `Dashboardy i analiza danych dla firm — KPI i BI        | gotovalues`                    | `Dashboardy, KPI i integracja danych dla MŚP. Pomagam zobaczyć, gdzie proces się zatrzymuje i jakie informacje są potrzebne do lepszych decyzji.`                                                |
| `/jak-pracuje`    | `Jak dobieram rozwiązanie IT dla firmy                  | gotovalues`                    | `Zaczynam od procesu i problemu, nie od narzędzia. Sprawdzam, czy wystarczy konfiguracja, integracja, automatyzacja czy dedykowana aplikacja.`                                                   |
| `/dla-produkcji`  | `Automatyzacja procesów produkcyjnych bez wymiany ERP   | gotovalues`                    | `Lekkie narzędzia wokół dokumentów jakościowych, reklamacji, partii i wyjątków operacyjnych — bez wymiany całego ERP.`                                                                           |
| `/dla-logistyki`  | `Automatyzacja i integracje dla logistyki i spedycji    | gotovalues`                    | `Porządkuj statusy zleceń, dokumenty przewozowe i dane między TMS, ERP, Excelem i pocztą — bez wymiany całego środowiska.`                                                                       |
| `/blog`           | `Blog o automatyzacji, danych i aplikacjach dla firm    | gotovalues`                    | `Praktyczne artykuły o automatyzacji procesów, AI, dashboardach, integracjach i aplikacjach webowych dla MŚP — bez marketingowych obietnic.`                                                     |
| `/kalkulator-roi` | `Kalkulator ROI automatyzacji procesu                   | gotovalues`                    | `Oszacuj czas i koszt powtarzalnej pracy, zanim zdecydujesz o automatyzacji. Kalkulator pomaga przygotować rozmowę o konkretnym procesie.`                                                       |

### 7.4. Zasady porządkowania bloga

1. Zostawić obecne 17 artykułów jako bibliotekę tematyczną, ale przypisać każdy do jednego klastra: automatyzacja, integracje, aplikacje, dane/BI albo AI.
2. Wyznaczyć jeden artykuł nadrzędny dla każdego klastra i linkować z niego do strony usługowej.
3. Ograniczyć nakładanie się tematów „automatyzacja procesów”, „automatyzacja z AI”, „AI dla firm”, „AI w MŚP” i „AI agenci”. Każdy powinien odpowiadać na inną intencję: definicja, decyzja, wdrożenie albo konkretny przypadek.
4. Zweryfikować twierdzenia typu „zaoszczędziła ~120 h miesięcznie” i „z moich wdrożeń”. Jeśli nie ma publicznego, zatwierdzonego dowodu, przepisać je jako przykład obliczeniowy albo usunąć. Nie traktować przykładu jako case study.
5. Dodać artykuły lokalne tylko wtedy, gdy wynikają z realnie świadczonej usługi i zawierają własną wartość: np. checklista IT dla małej firmy w powiecie wyszkowskim, a nie tekst z podmienioną nazwą miejscowości.
6. Utrzymać polski język, krótsze tytuły i jasne CTA do właściwej strony, nie zawsze do jednego formularza głównego.

### 7.5. Zasady GEO/AI

- `llms.txt`, `ai.txt`, `ai/summary.json` i `ai/service.json` muszą opisywać tę samą hierarchię oferty co strona główna.
- Każdy dokument powinien rozdzielać: obszar lokalny, obsługę zdalną, typ klienta, problemy, których gotovalues nie obsługuje, oraz dowody kompetencji.
- Nie publikować w `llms.txt` produktów lub przykładów, które są celowo ukryte na stronach publicznych, bez decyzji, że mają być publicznym dowodem.
- Stosować krótkie, faktograficzne definicje usług i linkować do kanonicznych stron, nie do szeregu stron eksperymentalnych.
- Schema.org, meta tags, sitemap i pliki dla AI muszą używać tego samego opisu firmy, obszaru obsługi i zakresu usług.
- Nie dodawać „AI” do każdej strony wyłącznie dla SEO. Termin powinien pojawić się tam, gdzie opisuje rzeczywistą funkcję rozwiązania.

## 8. Priorytety działań

### P0 — przed kolejnymi zmianami treści

1. Podjąć decyzję, czy nadrzędnym pozycjonowaniem jest model hybrydowy: lokalne IT + zdalne usprawnienia procesów.
2. Naprawić tytuł strony głównej i usunąć duplikację marki w `/jak-pracuje`.
3. Ujednolicić `layout.tsx`, `llms.txt`, sitemapę, Schema.org, stopkę i formularze.
4. Ustalić status stron SupportFlow, TriageFlow, produkcji, logistyki i kalkulatora: aktywne oferty, archiwum czy osobne ścieżki.

### P1 — najbliższa architektura SEO

1. Zbudować jedną kanoniczną stronę lokalnych usług IT.
2. Zbudować lub odświeżyć kanoniczne strony automatyzacji, aplikacji oraz analizy danych/BI.
3. Przebudować stronę główną tak, aby prowadziła do dwóch jasnych ścieżek zamiast mieszać ich szczegóły.
4. Przypisać 17 wpisów do klastrów i dodać linkowanie wewnętrzne do stron usługowych.
5. Skrócić H1/H2 stron branżowych oraz dopasować CTA i formularz do kontekstu strony.

### P2 — rozwój i dowody

1. Tworzyć treści lokalne tylko na podstawie realnych pytań i usług.
2. Budować dowody kompetencji bez fabrykowania klientów, opinii, certyfikatów i wyników.
3. Po zebraniu prawdziwych danych dodać case studies, referencje lub opis własnych produktów jako świadomie wybrane dowody.
4. Monitorować zapytania lokalne i ogólnopolskie osobno; nie oceniać obu warstw jedną metryką.

## 9. Decyzje wymagające zatwierdzenia

1. Czy gotovalues ma być komunikowane jako jedna firma hybrydowa, czy jako dwie wyraźnie rozdzielone linie usług?
2. Czy lokalne wsparcie IT jest strategiczną ofertą, ofertą wejściową, czy tylko usługą pomocniczą?
3. Czy strony i produkty SupportFlow, TriageFlow, produkcja i logistyka pozostają publiczne i indeksowane?
4. Czy Cavi i Akta mogą być publicznymi dowodami kompetencji, skoro obecnie są celowo ukryte na stronach publicznych?
5. Jaki jest faktyczny zasięg dojazdu w pasie S8 i które miejscowości można obiecać w SEO lokalnym?
6. Czy gotovalues chce publikować jakiekolwiek ceny, czy wyłącznie opisywać sposób kwalifikacji i zakres prac?
7. Które kompetencje mają być głównym wyróżnikiem: doświadczenie operacyjne, analiza procesu, automatyzacja, aplikacje, BI czy połączenie tych elementów?

## 10. Podsumowanie

Największym problemem SEO gotovalues nie jest brak tematów. Domena ma lokalny opis usług, rozbudowany blog ogólnopolski i kilka stron specjalistycznych. Problemem jest to, że te elementy nie tworzą jednej hierarchii.

Rekomendowana droga to nie wybór między „informatykiem z Zabrodzia” a „konsultantem AI dla MŚP”. To jasne rozdzielenie ścieżek:

- **lokalnie:** stabilne IT dla małej firmy i JDG;
- **zdalnie:** porządkowanie procesów, integracje, automatyzacja, dane i aplikacje;
- **wspólny sposób pracy:** najpierw zrozumienie problemu, potem najprostsze rozwiązanie, bez automatycznego sprzedawania kodu.

Dopiero po tej decyzji warto zmieniać tytuły, strony, linkowanie, sitemapę i dokumenty dla AI. W przeciwnym razie kolejne poprawki SEO tylko utrwalą obecne rozszczepienie tematyczne.
