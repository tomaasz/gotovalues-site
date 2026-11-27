# 08 — Kompletna propozycja nowych tekstów dla `gotovalues.com`

**Data:** 2026-11-27  
**Kierunek główny:** **Opcja A (Rekomendowana)** — Dwutorowy partner technologiczny dla małych i średnich firm (IT + procesy, dane, automatyzacja i narzędzia).  
**Zasada uczciwości:** zero wymyślonych klientów, case studies, certyfikatów, cenników i niezweryfikowanych liczb. Wszystko w naturalnej, konkretnej polszczyźnie, w 1. osobie liczby pojedynczej i z zapisem marki `gotovalues` małymi literami.

---

## CZĘŚĆ I — STRONA GŁÓWNA (`/`) — WARIANT REKOMENDOWANY (OPCJA A)

### 1. Metadane SEO i Schema.org (`src/app/layout.tsx`)

- **`<title>` strony głównej:**
  > `gotovalues — porządek w IT, danych i procesach dla małych firm`
- **`meta description`:**
  > `Pomagam małym i średnim firmom uporządkować technologię, dane i codzienną pracę: od stabilnej sieci, sprzętu i opieki IT (Zabrodzie, powiat wyszkowski i zdalnie) po analizę procesów, automatyzację i dedykowane aplikacje w całej Polsce.`
- **OpenGraph / Twitter description:**
  > `Niezależny partner IT dla małych i średnich firm: analiza procesów, dane, automatyzacja i aplikacje webowe w całej Polsce oraz lokalne i zdalne wsparcie IT (Zabrodzie, powiat wyszkowski).`
- **Schema.org `ProfessionalService.description`:**
  > `gotovalues — niezależne wsparcie technologiczne dla małych i średnich firm: porządkowanie procesów i danych, automatyzacja, dedykowane aplikacje webowe (zdalnie w całej Polsce) oraz bieżąca opieka IT, sieci, sprzęt i kopie zapasowe (Zabrodzie, powiat wyszkowski i zdalnie).`

---

### 2. Nawigacja górna (`SiteHeader`)

> `Oferta` · `Jak pracuję` · `O mnie` · `Blog` · `Kontakt`

*(Po uruchomieniu dedykowanej podstrony lokalnej opcjonalnie: `Oferta` · `Obsługa IT` · `O mnie` · `Blog` · `Kontakt`.)*

---

### 3. Arkusz 1 — Pierwszy ekran (`DrawingSheet`)

- **H1:**
  > **Porządkuję IT, dane i codzienną pracę w małej firmie.**
- **Lede bezpośrednio pod H1 *(nowy, krótki element — 1 zdanie)*:**
  > **Od stabilnej sieci, sprzętu i opieki IT po integracje, raportowanie i dedykowane narzędzia — zaczynam od diagnozy problemu, nie od sprzedaży gotowego pakietu.**
- **Blok metadanych w tabelce rysunkowej (`gv-tb-meta`):**
  - **Zakres:** `procesy, dane, aplikacje i opieka IT`
  - **Prowadzi:** `Tomasz Gołaszewski`
  - **Obszar:** `cała Polska zdalnie · Zabrodzie i pow. wyszkowski na miejscu`
  - **Marka:** `gotovalues`

#### Interaktywny rysunek techniczny (`ProcessDrawing` — 4 rewizje)
- **Węzeł końcowy (ciemny prostokąt):** `Kontrola i porządek` *(lub `Sprawny proces`)*
- **Legenda kreskowania:** `linia kreskowa i kreskowanie: ręczne obejścia i przestoje`
- **Nagłówek tabeli zmian:** `Tabela zmian: od problemu do adekwatnego rozwiązania`

| Rew. | Nazwa | Kolumna „Kiedy” | Podpis wymiarowy pod rysunkiem | Węzły na rysunku |
|---|---|---|---|---|
| **0** | `Stan obecny` | `dane krążą między Excelem, mailem i systemami, a awarie IT odrywają od pracy` | `dziś: rozproszone informacje, ręczne przepisywanie i gaszenie usterek` | `E-mail / PDF`, `Arkusze`, `Systemy`, `Sieć / sprzęt`, `ręczna praca i przestoje` *(kreskowany)* → `Kontrola i porządek` `?` |
| **A** | `Stabilne IT` | `gdy najpierw trzeba uporządkować sieć, sprzęt, pocztę, backup i bieżącą opiekę` | `rewizja A: stabilna infrastruktura, kopie zapasowe i jeden kontakt do wsparcia` | `Sieć / Wi-Fi`, `Stanowiska`, `Poczta / backup`, `opieka i porządek IT` *(narzędzie)* → `Kontrola i porządek` ● |
| **B** | `Dane i integracje` | `gdy firma ma już programy, ale zespół ręcznie przepisuje dane i szuka statusów` | `rewizja B: połączone źródła, automatyczny przepływ i czytelny widok danych` | `E-mail / PDF`, `Systemy`, `Arkusze`, `integracja + raport` *(narzędzie)* → `Kontrola i porządek` ● |
| **C** | `Własne narzędzie` | `gdy gotowe programy nie domykają procesu i potrzebny jest własny widok pracy` | `rewizja C: dopasowana aplikacja webowa lub automatyzacja AI pod konkretny proces` | `Dokumenty`, `Dane`, `walidacja / AI` *(kreskowany)*, `dedykowana aplikacja` *(app)* → `Kontrola i porządek` ● |

#### Szybki formularz w bloku tytułowym (`TitleBlockForm`)
- **Etykieta pola wiadomości:** `Co chcesz uporządkować lub naprawić?`
- **Placeholder:** `Np. zespół ręcznie przepisuje dane między mailem a Excelem, brakuje czytelnych raportów, potrzebujemy własnego narzędzia albo stałej opieki IT i sprawnej sieci w biurze.`
- **Pozostałe pola:** `Imię` · `E-mail` · `Firma (opcjonalnie)`
- **Przycisk CTA:** `Opisz swój temat` *(lub `Wyślij opis` — krótki i precyzyjny; warianty do wyboru w sekcji decyzji)*
- **Komunikat walidacji (< 20 znaków):** `Napisz przynajmniej jedno pełne zdanie (min. 20 znaków), żebym mógł zrozumieć temat i zaproponować sensowny krok.`
- **Komunikat sukcesu:** `Dziękuję za wiadomość. Zapoznam się z opisem i wrócę z oceną możliwych rozwiązań w ciągu 1 dnia roboczego.`

---

### 4. Arkusz 2 — Oferta i sposób pracy (`PartsListSheet`, `#oferta`)

- **H2:** `W czym pomagam małym i średnim firmom`
- **Link w nagłówku arkusza:** `Jak dobieram rozwiązanie krok po kroku →` (`/jak-pracuje`)

#### Tabela oferty (3 filary — efekt biznesowy + konkretny zakres)

| Poz. | Nazwa | Zakres (wartość biznesowa) | Elementy |
|---|---|---|---|
| **1** | **Procesy, dane i automatyzacja** | Ograniczam ręczne przepisywanie informacji i chaos między mailem, arkuszami a systemami, żeby zespół pracował na aktualnych danych. | • analiza procesu i wskazanie miejsc, gdzie firma traci czas<br>• porządkowanie danych, raportowanie i czytelne widoki KPI<br>• integracje programów oraz automatyzacja obiegu dokumentów (w tym OCR i AI z kontrolą jakości) |
| **2** | **Dedykowane narzędzia i aplikacje** | Gdy gotowe oprogramowanie nie pasuje do specyfiki firmy, projektuję i buduję konkretny brakujący moduł — bez wymiany całego środowiska. | • aplikacje webowe pod codzienną pracę operacyjną, statusy i wyjątki<br>• panele i formularze łączące istniejące bazy, pliki i systemy<br>• pełna własność kodu, dokumentacja i niskie koszty utrzymania |
| **3** | **Stabilne IT i opieka dla firm i JDG** | Zapewniam ciągłość pracy w biurze i w pracy zdalnej — od uporządkowanej sieci i stanowisk po kopie zapasowe oraz bieżący helpdesk. | • sieci LAN/Wi-Fi, VPN, drukarki sieciowe i współdzielone pliki (NAS)<br>• konfiguracja, diagnostyka i przygotowanie komputerów do pracy<br>• zdalna pomoc IT w całej Polsce, dojazd w Zabrodziu i pow. wyszkowskim, poczta firmowa i testowany backup |

#### Podsekcja: `Jak pracuję na co dzień` (5 punktów)

1. **Najpierw rozumiem biznes, dopiero potem dobieram technologię.** Zanim zaproponuję narzędzie, sprawdzam, gdzie dokładnie powstaje blokada — w infrastrukturze, w danych czy w samym obiegu pracy.
2. **Wybieram najmniejsze rozwiązanie, które rozwiąże problem.** Jeśli wystarczy dobra konfiguracja gotowego programu lub połączenie tego, co już masz, powiem o tym wprost zamiast sprzedawać budowę aplikacji.
3. **Jeden bezpośredni kontakt zamiast pośredników.** Rozmawiasz bezpośrednio z osobą, która diagnozuje problem i wdraża rozwiązanie — bez handlowców, infolinii i gubienia kontekstu.
4. **Pełna kontrola i bezpieczeństwo po stronie firmy.** Konta, domeny, kopie zapasowe, konfiguracje i tworzony kod pozostają własnością Twojej firmy, z jasnym opisem dostępów.
5. **Przejrzysty zakres przed startem.** Pracujemy na zrozumiałym planie — od pojedynczej interwencji lub małego pierwszego etapu, po stałą opiekę, jeśli ma sens w Twojej skali.

---

### 5. Arkusz 3 — O mnie (`AuthorSheet`, `#o-mnie`)

- **H2:** `Kim jestem: Tomasz Gołaszewski`
- **Lede:** `Łączę doświadczenie biznesowo-operacyjne z praktyczną inżynierią IT, analizą danych i tworzeniem oprogramowania.`
- **Akapit główny:** `Przez lata pracowałem w obszarach leasingu, zarządzania aktywami, wyceny maszyn i cyfryzacji procesów operacyjnych. Dzięki temu patrzę na technologię oczami właściciela i zespołu, który musi dowozić codzienną pracę — a nie tylko przez pryzmat kodu czy sprzętu. Pomagam zarówno wtedy, gdy trzeba ustabilizować podstawowe IT w małej firmie, jak i wtedy, gdy trzeba uporządkować dane, zautomatyzować obieg dokumentów lub zbudować brakujące narzędzie.`
- **Link:** `Zobacz profil na LinkedIn ↗`

#### Tabela faktów (`gv-author-table`)
- **Rola:** `Niezależny partner technologiczny — gotovalues`
- **Biznes i dane:** `doświadczenie w leasingu, asset management, wycenie maszyn, analizie biznesowej i raportowaniu danych.`
- **Aplikacje i AI:** `tworzenie aplikacji webowych (Next.js, React, Python, PostgreSQL), integracje systemów, automatyzacja i przetwarzanie dokumentów (OCR/AI).`
- **Infrastruktura IT:** `sieci biurowe, Wi-Fi, VPN, serwery plików (NAS), stanowiska pracy, poczta firmowa, backup i helpdesk (Zabrodzie, pow. wyszkowski + zdalnie).`

---

### 6. Arkusz 4 — FAQ (`NotesSheet`, `#faq`)

- **H2:** `Najczęstsze pytania przed współpracą`

1. **Czy pomagasz przy codziennym IT, czy zajmujesz się głównie automatyzacją i aplikacjami?**
   > Łączę oba obszary, bo w małych i średnich firmach często się zazębiają. Możemy zacząć od uporządkowania sieci, stanowisk, poczty i kopii zapasowych albo od razu zająć się analizą procesu, danymi, integracją lub budową narzędzia webowego. Nie musisz szukać osobnej firmy do każdego etapu.
2. **Gdzie działasz na miejscu, a co robisz zdalnie?**
   > Zdalnie pracuję z firmami w całej Polsce — dotyczy to analizy procesów, danych, integracji, budowy aplikacji oraz bieżącego wsparcia helpdesk (poczta, dostępy, konfiguracja programów). Na miejscu dojeżdżam do firm w Zabrodziu, powiecie wyszkowskim i okolicach, gdy praca wymaga fizycznej obecności przy sieci, sprzęcie lub okablowaniu.
3. **Czy trzeba zaczynać od dużego projektu albo stałego abonamentu?**
   > Nie. Możemy zacząć od jednego konkretnego zadania — np. uporządkowania sieci i backupu, diagnozy jednego procesu albo małego pierwszego etapu integracji. Stała opieka IT ma sens wtedy, gdy firma faktycznie potrzebuje regularnego wsparcia.
4. **Jak wygląda wycena i rozliczenie współpracy?**
   > Zanim zaczniemy, dostajesz jasny opis zakresu i sposób rozliczenia. Przy zadaniach o określonym zakresie proponuję stałą wycenę za etap; przy doraźnej diagnozie lub wsparciu IT — rozliczenie godzinowe. Jeśli w trakcie pojawi się dodatkowy zakres, omawiamy go przed wykonaniem. Rozliczamy się na fakturę.
5. **Nie mam specyfikacji technicznej i nie znam żargonu — czy to problem?**
   > Żaden. Wystarczy, że w kilku zdaniach opiszesz swoimi słowami, co dzisiaj blokuje pracę, zabiera czas albo nie działa tak, jak powinno. Dopytam o konkrety i przetłumaczę je na zrozumiałe opcje działania.
6. **Czy możesz pracować na systemach, które firma już ma (bez wymiany ERP)?**
   > Tak — to moja domyślna zasada. Zamiast proponować kosztowną wymianę całego oprogramowania, najpierw sprawdzam, jak połączyć obecne narzędzia, uporządkować dane albo dołożyć niewielki brakujący moduł wokół istniejącego procesu.
7. **Kto ma własność kont, domen, danych i stworzonego oprogramowania?**
   > Zawsze Twoja firma. Domeny, poczta, konta w chmurze, konfiguracje sieci oraz prawa do stworzonego na zamówienie kodu i baz danych należą do klienta. Każde wdrożenie kończy się przekazaniem uporządkowanych dostępów i dokumentacji.
8. **Jak podchodzisz do bezpieczeństwa danych i kopii zapasowych?**
   > Przy opiece IT skupiam się na praktycznych podstawach: segmentacji sieci, porządku w uprawnieniach i automatycznym backupie z jasną procedurą odtwarzania. Przy pracy z danymi i AI korzystam ze środowisk wykluczających trenowanie modeli na danych klienta, a na życzenie podpisuję NDA przed rozmową o szczegółach.

---

### 7. Arkusz 5 — Kontakt (`ContactSheet`, `#kontakt`)

- **H2:** `Opisz temat, który chcesz uporządkować`
- **Akapit:** `Napisz w kilku zdaniach, czego dotyczy sprawa — czy chodzi o ręczną pracę na dokumentach i danych, integrację, potrzebne narzędzie, czy o uporządkowanie sieci, sprzętu i opieki IT w firmie. Odpowiem, jak mogę pomóc i jaki ma sens pierwszy krok.`
- **Tabela kontaktu:**
  - **Telefon:** `[Pokaż numer i zadzwoń]` *(po kliknięciu: `+48 600 468 473`, chroniony przed botami)*
  - **E-mail:** `kontakt@gotovalues.com`
  - **Odpowiedź:** `Zwykle w ciągu 1 dnia roboczego.`
  - **Obszar:** `Zdalnie w całej Polsce · na miejscu: Zabrodzie, powiat wyszkowski i okolice.`
- **Formularz (`ContactForm` — domyślny na `/`):**
  - Etykieta wiadomości: `W czym mogę pomóc?`
  - Placeholder domyślny (`/`): `Np. ręczne przepisywanie danych między mailem a arkuszem, brak czytelnego raportowania, potrzeba dedykowanego narzędzia albo uporządkowanie sieci, backupu i opieki IT.`
  - Placeholder kontekstowy dla `/dla-produkcji`: `Np. dokumenty jakościowe, reklamacje lub statusy partii krążą między mailem, PDF-ami i Excelem.`
  - Placeholder kontekstowy dla `/dla-logistyki`: `Np. statusy przesyłek, dokumenty przewozowe albo rozliczenia wymagają ręcznego sprawdzania w kilku portalach.`
  - Przycisk CTA: `Wyślij wiadomość`
  - Helper text: `Wystarczą 2–3 zdania bez technicznego żargonu. Wiadomość trafia bezpośrednio do mnie.`

---

## CZĘŚĆ II — WARIANTY ALTERNATYWNE HERO (DO PORÓWNANIA PRZEZ WŁAŚCICIELA)

### Wariant B (jeśli wybierzesz czyste pozycjonowanie doradczo-inżynieryjne MŚP, bez lokalnego serwisu IT na `/`)
- **H1:** `Porządkuję procesy, dane i narzędzia w małych i średnich firmach.`
- **Lede:** `Zaczynam od analizy problemu biznesowego, a potem dobieram najmniejsze rozwiązanie, które działa: integrację, raportowanie danych, automatyzację z AI albo dedykowaną aplikację webową — bez wymiany głównych systemów.`
- **CTA:** `Opisz jeden proces`

### Wariant C (jeśli wybierzesz lokalne IT na pierwszym planie, ale bez zaniżania rangi do „naprawiacza laptopów”)
- **H1:** `Stabilne IT i porządek w narzędziach dla małej firmy.`
- **Lede:** `Zapewniam ciągłość pracy w biurze i zdalnie — od sieci, stanowisk, poczty i backupu po automatyzację powtarzalnej pracy. Zabrodzie, powiat wyszkowski i zdalnie w całej Polsce.`
- **CTA:** `Opisz swój temat`

---

## CZĘŚĆ III — PRZYKŁADOWA PODSTRONA `/jak-pracuje` (WSTĘP BEZ DEFENSYWNOŚCI)

- **`<title>`:** `Jak dobieram rozwiązanie IT i procesowe | gotovalues` *(usunięcie duplikatu marki i anglicyzmu „web apps”)*
- **H1:** `Najpierw problem w firmie, dopiero potem wybór technologii.`
- **Wstęp:** `Nie zaczynam od gotowego cennika ani od narzucania jednego narzędzia. Najpierw sprawdzam, gdzie ucieka czas, gdzie zrywają się dane i co realnie blokuje zespół. Dopiero potem wybieram najprostszy poziom działania — konfigurację tego, co już masz, integrację, automatyzację albo dedykowaną aplikację.`

---

## CZĘŚĆ IV — SPÓJNY `/llms.txt` (FRAGMENT DOCELOWY)

```text
# gotovalues — porządek w IT, danych i procesach dla małych i średnich firm

> gotovalues (Tomasz Gołaszewski) to niezależny partner technologiczny dla MŚP i JDG. Zdalnie w całej Polsce pomaga porządkować procesy, dane, integracje, automatyzacje (w tym OCR/AI) i dedykowane aplikacje webowe. Lokalnie (Zabrodzie, powiat wyszkowski i okolice) oraz zdalnie zapewnia bieżącą opiekę IT: sieci, Wi-Fi, stanowiska, pocztę firmową i kopie zapasowe.
```
