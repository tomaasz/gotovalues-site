# 07 — Rekomendowana struktura oferty i architektura treści

**Data:** 2026-11-27  
**Kierunek bazowy:** Opcja A — Dwutorowy partner technologiczny dla małych i średnich firm (z zachowaniem estetyki `DESIGN.md` — „The Working Drawing” bez przebudowy systemu wizualnego).

---

## 1. Rekomendowana struktura oferty (3 czytelne warstwy wartości zamiast 4 „serwisowych” wierszy)

Zamiast mieszać naprawę laptopa z budową aplikacji w jednej płaskiej liście, oferta układa się w **logiczną drabinę dojrzałości technologicznej firmy**. Każdy wiersz zaczyna się od **efektu biznesowego**, a dopiero potem wymienia konkretne usługi:

### Filar 1 — Porządek w procesach, danych i narzędziach *(rdzeń wartości biznesowej, zdalnie w całej Polsce)*
- **Problem klienta:** informacje krążą między Excelem, mailem, PDF-ami i kilkoma programami; zespół traci godziny na ręczne przepisywanie, sprawdzanie statusów i ręczne raporty.
- **Zakres:**
  - analiza biznesowa procesu i diagnoza wąskich gardeł przed wyborem technologii,
  - porządkowanie danych, raportowanie i czytelne widoki decyzyjne (dashboardy / KPI),
  - integracje istniejących systemów i automatyzacja powtarzalnych zadań (w tym praktyczne wykorzystanie AI / OCR tam, gdzie skraca pracę z dokumentami).
- **Wartość:** mniej ręcznej pracy, mniej błędów i pełny obraz sytuacji bez wymiany głównych systemów firmy.

### Filar 2 — Dedykowane aplikacje i narzędzia dopasowane do firmy *(projekty, zdalnie w całej Polsce)*
- **Problem klienta:** gotowy program „z pudełka” jest za sztywny lub za drogi w dostosowaniu, a firma potrzebuje prostego, własnego widoku pracy dla zespołu lub klientów.
- **Zakres:**
  - projektowanie i budowa lekkich aplikacji webowych pod konkretny proces (panele operacyjne, obiegi dokumentów, formularze, portale),
  - rozbudowa istniejących narzędzi zamiast kosztownej przebudowy całego środowiska,
  - czyste przekazanie kodu, pełna własność po stronie klienta i proste utrzymanie.
- **Wartość:** narzędzie dopasowane dokładnie do sposobu pracy firmy — bez abonamentu od każdego użytkownika i bez zbędnych funkcji.

### Filar 3 — Stabilne IT i bieżąca opieka dla małych firm i JDG *(lokalnie: Zabrodzie, pow. wyszkowski i okolice + zdalnie w całej Polsce)*
- **Problem klienta:** awarie sprzętu, niestabilna sieć, nieuporządkowana poczta i brak kopii zapasowych przerywają pracę, a firma nie potrzebuje informatyka na etat.
- **Zakres:**
  - stabilna sieć biurowa, Wi-Fi, VPN, drukarki sieciowe i współdzielone pliki (NAS),
  - konfiguracja, serwis i przygotowanie stanowisk komputerowych do pracy,
  - zdalny i lokalny helpdesk, poczta firmowa (Microsoft 365 / Google Workspace), uporządkowane dostępy oraz sprawdzone kopie zapasowe (backup).
- **Wartość:** ciągłość pracy bez gaszenia pożarów i jeden bezpośredni kontakt zamiast infolinii.

> **Dlaczego 3 filary w tej kolejności?**  
> Gdy Filar 1 i Filar 2 otwierają ofertę (albo gdy wszystkie 3 są ułożone jako „Technologia pod kontrolą: od podstaw IT po procesy i aplikacje”), odbiorca z MŚP od razu widzi partnera o wysokich kompetencjach biznesowo-inżynieryjnych, a lokalna mała firma nadal błyskawicznie odnajduje sieci, sprzęt, backup i helpdesk (dodatkowo wsparte dedykowaną podstroną `/uslugi-it-dla-firm`).  
> *Uwaga alternatywna:* Jeśli Tomasz zdecyduje, że lokalne IT ma być na pozycji 1 w tabeli na `/`, to i tak powinno nosić nazwę biznesową **„Stabilne IT, sieci i stała opieka”** (zamiast osobnego wiersza „Naprawa i konfiguracja komputerów”), aby nie rozbijać serwisu na 3 z 4 wierszy i nie spychać analizy/aplikacji/AI na margines.

---

## 2. Architektura strony głównej (`/`) — dopasowana do `DESIGN.md`

Zachowujemy strukturę 5 arkuszy „The Working Drawing”, ale każdy arkusz dostaje **jedną wyraźną funkcję** (zero powtarzania tych samych przykładów w 4 miejscach):

| Arkusz | Rola w lejku | Kluczowa zmiana względem stanu obecnego |
|---|---|---|
| **1. `DrawingSheet` (Hero + Rysunek + Szybki kontakt)** | Orientacja w 5 sekund: kim jestem, dla kogo, jaka wartość + szybki punkt wejścia | Dodanie **jednego zwięzłego zdania (lede) pod H1** łączącego IT z procesami i danymi; rysunek techniczny pokazujący realną ścieżkę decyzyjną (*Stan obecny* → *Stabilne podstawy IT* / *Porządek w danych i integracje* / *Dedykowane narzędzie*); blok tytułowy z neutralnym pytaniem i kontekstowym CTA **„Opisz swój temat”** (zamiast ogólnego „Napisz”). |
| **2. `PartsListSheet` (`#oferta` — Wykaz usług + Jak pracuję)** | Zrozumienie zakresu i granic współpracy | 3 filary zamiast 4 (połączenie sieci, stanowisk i helpdesku w jeden mocny filar „Stabilne IT i opieka” + 2 filary o wyższej wartości: procesy/dane/automatyzacja oraz dedykowane narzędzia/aplikacje) + 5 zasad pracy opartych na metodzie (diagnoza przed technologią, własność po stronie firmy, jasny zakres). |
| **3. `AuthorSheet` (`#o-mnie` — Kim jestem i skąd moje doświadczenie)** | Budowanie wiarygodności kompetencyjnej (bez wymyślonych klientów) | Wyeksponowanie realnej, unikalnej przewagi Tomasza: **doświadczenie operacyjno-biznesowe (leasing, zarządzanie aktywami, wycena maszyn, cyfryzacja procesów)** połączone z praktyką inżynierską (aplikacje webowe, dane, automatyzacja) i codzienną infrastrukturą IT. Wyraźne oddzielenie skali pracy jednej osoby. |
| **4. `NotesSheet` (`#faq` — Pytania przed współpracą)** | Rozbrojenie realnych obiekcji obu grup odbiorców | 7–8 konkretnych pytań pokrywających: współpracę zdalną vs lokalną (Zabrodzie / pow. wyszkowski), brak wymogu abonamentu, model wyceny, brak potrzeby specyfikacji technicznej, współpracę z istniejącymi systemami (bez wymiany ERP), bezpieczeństwo/backup i pełną własność kont/kodu. |
| **5. `ContactSheet` (`#kontakt` — Pełny kontakt)** | Konwersja bez tarcia dla osób zdecydowanych po lekturze | Neutralne, biznesowe zaproszenie (dla obu ścieżek: IT oraz procesy/dane/aplikacje), chroniony przed botami `PhoneReveal` z jasnym mikrotekstem (*„Pokaż numer i zadzwoń”*), `kontakt@gotovalues.com`, obszar działania, 4-polowy formularz z **kontekstowym placeholderem** (przekazywanym jako prop per trasa!). |

---

## 3. Architektura całego serwisu (mapa tras, nawigacja, stopka, SEO/GEO)

### 3.1. Nawigacja główna (`SiteHeader`)
Prosta, 5-elementowa, zrozumiała dla obu segmentów:
- `Oferta` (`/#oferta`)
- `Obsługa IT` (`/uslugi-it-dla-firm` — nowa kanoniczna strona lokalna dla Zabrodzia, Wyszkowa i pasa S8) *lub* `Jak pracuję` (`/jak-pracuje`)
- `O mnie` (`/#o-mnie`)
- `Blog` (`/blog`)
- `Kontakt` (`/#kontakt`)

*(Wariant jeszcze prostszy na start przed utworzeniem nowej podstrony: `Oferta`, `Jak pracuję`, `O mnie`, `Blog`, `Kontakt` — z wyraźnym linkiem do lokalnej obsługi IT w sekcji Oferta.)*

### 3.2. Globalna stopka (`Footer`) — koniec rozjazdu z `/`
Zamiast obecnego przypadkowego zestawu (`SupportFlow AI`, `TriageFlow`, `Kalkulator ROI`), uporządkowana stopka spójna z nową architekturą:
- **Usługi:** `Obsługa IT lokalnie i zdalnie`, `Automatyzacja i procesy`, `Jak pracuję`
- **Zasoby:** `Blog`, `Kalkulator ROI` *(opcjonalnie)*
- **Informacje i kontakt:** `Polityka prywatności`, `Ustawienia cookies`, `kontakt@gotovalues.com`

### 3.3. Los istniejących podstron „w tle” (decyzja do zatwierdzenia)

| Obecna trasa | Diagnoza | Rekomendowane działanie |
|---|---|---|
| `/jak-pracuje` | Bardzo dobra merytorycznie baza metody („proces przed kodem”), ale ma zduplikowane `gotovalues` w `<title>` i defensywny wstęp | **Zostawić i odświeżyć:** naprawić `<title>`, usunąć defensywne otwarcie, włączyć w główną architekturę jako wyjaśnienie metody pracy. |
| `/vs-freelancer-automatyzator` | Duplikat treściowy wobec `/jak-pracuje` (`canonical` już wskazuje na `/jak-pracuje`) | **Przekierować (301) na `/jak-pracuje`** i usunąć z `sitemap.xml`. |
| `/dla-produkcji` i `/dla-logistyki` | Dobre wejścia problemowe dla MŚP (zwłaszcza do cold outreachu i z bloga), ale mają niespójny formularz (Wi-Fi!) i zbyt długie H1/H2 na logistyce | **Zostawić jako dedykowane ścieżki MŚP**, ale obowiązkowo podać im **kontekstowy placeholder formularza** (o procesach, nie o Wi-Fi!) i skrócić nagłówki `/dla-logistyki`. |
| `/supportflow` i `/triageflow` | Zupełnie inny rejestr („founder”, emoji, ceny od 4000 PLN, „pierwszy klient referencyjny”, GitHub Issues); rozbijają spójność marki ze stopki | **Usunąć z globalnej stopki i z `/llms.txt`.** Decyzja właściciela: albo ustawić `noindex` (zostają tylko pod starymi linkami), albo zarchiwizować/przekierować na stronę automatyzacji. |
| `/kalkulator-roi` | Użyteczne narzędzie dla ścieżki procesowej, ale obecnie odsyła do formularza o Wi-Fi | **Zostawić jako zasób powiązany z blogiem i automatyzacją**, usunąć z głównej ekspozycji dla klientów lokalnego IT, albo dopasować CTA. |
| `/blog` (17 wpisów) | Ogromny zasób topical authority w AI, BI/KPI, automatyzacji i aplikacjach webowych | **Zostawić i wzmocnić linkowaniem wewnętrznym** do strony głównej i `/jak-pracuje`. Zweryfikować wpis `case-study-firma-produkcyjna-120h-automatyzacja` (czy ma prawdziwe źródło, czy powinien być jawnie oznaczony jako przykład obliczeniowy). |
| **NOWA (opcjonalna): `/uslugi-it-dla-firm`** | Dedykowana kanoniczna strona pod lokalne SEO (Zabrodzie, powiat wyszkowski, Wyszków, okolice + zdalny helpdesk) | **Zbudować w kolejnym etapie**, aby zbierała 100% lokalnych zapytań IT bez narzucania stronie głównej języka serwisanta PC. |
| `/llms.txt`, `/ai.txt`, `/ai/*.json`, `sitemap.xml` | Obecnie mieszają lokalne IT z `Cavi`/`Akta` i produktami AI | **Pełna synchronizacja** z jedną, zatwierdzoną strategią marki (jeśli `Cavi` i `Akta` są ukryte na froncie, usunąć je z `llms.txt` albo świadomie przywrócić jako „własne projekty techniczne”). |

---

## 4. Przepływ dla 4 kluczowych typów odwiedzających w nowej architekturze

1. **Lokalny właściciel JDG / małej firmy (Zabrodzie, Wyszków, okolice):**
   - Wchodzi z Google na `/` lub `/uslugi-it-dla-firm` → w 5 sekund widzi, że obsługuję małe firmy lokalnie i zdalnie → w Filarze 3 (lub na stronie lokalnej) znajduje sieci, sprzęt, pocztę, backup i stałą opiekę → może kliknąć *„Pokaż numer i zadzwoń”* albo wysłać 2 zdania w formularzu.
2. **Właściciel MŚP (5–50 osób, cała Polska — procesy, dane, aplikacje, AI):**
   - Wchodzi z Google / LinkedIn / bloga na `/`, `/dla-produkcji`, `/dla-logistyki` lub `/jak-pracuje` → natychmiast widzi inżynieryjny styl rysunku technicznego spójny z komunikatem biznesowym (*„Porządkuję procesy, dane i IT...”*) → w „O mnie” widzi realne doświadczenie biznesowe (leasing, aktywa, wycena, cyfryzacja) + kompetencje techniczne → wysyła krótki opis procesu w formularzu z dopasowanym kontekstem.
3. **Klient wchodzący od prostego IT, który rośnie:**
   - Zaczyna od uporządkowania sieci, poczty i backupu → na tej samej stronie widzi, że ta sama osoba może później połączyć programy, zbudować raportowanie lub dedykowane narzędzie — naturalny upsell bez zmiany partnera.
4. **Odbiorca weryfikujący wiarygodność przed kontaktem:**
   - Sprawdza spójną nawigację i stopkę (brak przypadkowych produktów SaaS w innym tonie) → czyta konkretne „O mnie” (doświadczenie operacyjne + stack) → czyta uczciwe FAQ (własność zasobów, zasady wyceny, brak naciągania na kod) → przegląda merytoryczne artykuły na blogu.
