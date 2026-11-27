# 17 — Strategia komunikacji, rozdzielenie odbiorców i architektura treści (`gotovalues.com`)

**Data:** 2026-11-27  
**Stan bazowy:** `main` @ `8cb79af`  
**Cel:** połączyć ambicję pozycjonowania `gotovalues` jako niezależnego partnera technologicznego (automatyzacja, dane, oprogramowanie, IT) z pełnym poszanowaniem obecnych uwarunkowań właściciela (promocja marki `gotovalues` bez indeksowania nazwiska, praca obok etatu, brak dyżurów 24/7, uczciwe rozdzielenie dowodów pracy).

---

## 1. Rekomendowane pozycjonowanie marki (`gotovalues`)

### Rdzeń pozycjonowania (pod marką własną `gotovalues`, z 1. osobą w narracji)
- **Kim jest `gotovalues`:** niezależny partner technologiczny łączący analizę biznesową, pracę z danymi, tworzenie oprogramowania oraz praktyczną infrastrukturę i wsparcie IT.
- **Jak działa:** zamiast sprzedawać gotowy pakiet lub „narzędzie pod modę”, zaczyna od diagnozy realnego problemu, sprawdza najprostszy sensowny poziom rozwiązania (konfiguracja → integracja → dedykowana aplikacja) i realizuje prace etapowo.
- **Wyróżnik rynkowy:** jedno miejsce, które rozumie zarówno **warstwę biznesowo-analityczną** (procesy, dane, decyzje), **warstwę software'ową** (aplikacje webowe, API, OCR/AI), jak i **warstwę sprzętowo-infrastrukturalną** (komputery, serwery, NAS, sieci, kopie zapasowe) — bez narzutu agencyjnego i bez wciskania wielkich systemów.
- **Zasada prywatności (aktywna do czasu zmiany decyzji właściciela):** cała komunikacja SEO, `Schema.org`, blog i podstrony budują markę **`gotovalues`** (a nie nazwisko właściciela). Imię, nazwisko, profil LinkedIn i numer telefonu pozostają wyłącznie za komponentami click-to-reveal (`OwnerReveal`, `PhoneReveal`), niewidocznymi dla wyszukiwarek.

---

## 2. Cztery filary oferty — ocena i mapowanie na rysunek SVG

Rozbicie dotychczasowego 1. filaru na osobne **Automatyzacja i integracje** oraz **Dane i analityka** porządkuje ofertę i bezpośrednio łączy stronę główną z istniejącym blogiem (który ma mocny klaster dashboardów/KPI i osobny klaster integracji/workflow):

| Poz. | Filar oferty | Główny odbiorca | Konkretna wartość dla odbiorcy | Powiązana rewizja na rysunku SVG |
|---|---|---|---|---|
| **01** | **Automatyzacja i integracje** | Firmy (MŚP, JDG) | Koniec ręcznego przepisywania danych między pocztą, arkuszami, ERP i zewnętrznymi systemami; punktowe AI/OCR tam, gdzie realnie skraca pracę. | Rew. `B` — Integracje i automatyzacja |
| **02** | **Dane i analityka** | Firmy (MŚP, JDG) | Uporządkowane źródła danych i przejrzyste raporty/dashboardy do bieżących decyzji zamiast sklejania plików przed każdym spotkaniem. | Rew. `B` — Jedno źródło i widok danych |
| **03** | **Aplikacje i oprogramowanie** | Firmy (i projekty indywidualne) | Dedykowane aplikacje webowe, panele operacyjne, obiegi dokumentów i strony dopasowane do realnego procesu, gdy gotowce nie wystarczają. | Rew. `C` — Dedykowana aplikacja / AI |
| **04** | **Infrastruktura i wsparcie IT** | Firmy + klienci indywidualni | Sprawny sprzęt, serwery (w tym NAS), stabilne sieci, poczta firmowa, automatyczne kopie zapasowe i planowane wsparcie IT (zdalnie w Polsce; sprzęt/instalacje po umówieniu w Zabrodziu, pow. wyszkowski). | Rew. `A` — Sprawna infrastruktura i IT |

### Alternatywa do rozważenia (3 vs 4 filary)
- **Wariant 4 filary (z rekomendacji zewnętrznej):** lepiej eksponuje kompetencje analityczne i danych, lepiej mapuje się na intencje wyszukiwania i podstrony usługowe. Wymaga jednak skrócenia opisów w tabeli `PartsListSheet`, żeby strona główna nie spuchła.
- **Wariant 3 filary (obecny układ):** prostszy do przeskanowania na jednym ekranie, jeśli na tym etapie nie chcesz otwierać osobnej podstrony dla „Danych i analityki”.

---

## 3. Rozdzielenie komunikacji do dwóch grup odbiorców (Punkt 4)

Zamiast mieszać *„dla firm i osób prywatnych”* w każdym akapicie, najlepiej rozdzielić ścieżki już w **Arkuszu 1 (prawa kolumna Hero)** — przy okazji **usuwając obecne powtórzenie listy filarów między Arkuszem 1 a Arkuszem 2**:

```text
┌──────────────────────────────────────────────────────────┐
│  Arkusz 1 — Prawa kolumna (zamiast duplikatu 3 filarów)  │
├──────────────────────────────────────────────────────────┤
│  ŚCIEŻKA 1: DLA FIRM (procesy, dane, aplikacje, IT)      │
│  Automatyzacja, raportowanie, dedykowane narzędzia       │
│  webowe i infrastruktura IT realizowane etapowo.         │
│  → [Przejdź do zakresu dla firm] / [Opisz temat]         │
├──────────────────────────────────────────────────────────┤
│  ŚCIEŻKA 2: WSPARCIE IT I KLIENCI INDYWIDUALNI           │
│  Komputery, serwery/NAS, sieci, instalacje, poczta       │
│  i kopie zapasowe — zdalnie lub lokalnie po umówieniu.   │
│  → [Zobacz wsparcie IT] / [Zapytaj o pomoc]              │
├──────────────────────────────────────────────────────────┤
│  [ Główny CTA: Napisz wiadomość (#kontakt) ]             │
└──────────────────────────────────────────────────────────┘
```

**Co to rozwiązuje jednocześnie:**
1. Eliminuje powtórzenie treści między Arkuszem 1 a Arkuszem 2 (Punkt 6).
2. Właściciel firmy MŚP od razu widzi poważną, biznesowo-inżynieryjną ścieżkę (bez rozmywania jej przez naprawę domowego komputera).
3. Osoba prywatna lub lokalna mikrofirma z powiatu wyszkowskiego od razu widzi jasne zaproszenie do spraw sprzętowych i wsparcia IT (bez poczucia, że „to agencja tylko dla dużych firm”).

---

## 4. Architektura podstron — 3 warianty do wyboru (Punkt 10)

| Wariant | Mapa aktywnych URL-i | Zalety | Wady / koszt utrzymania |
|---|---|---|---|
| **S1 — Zbalansowany (2 nowe/odświeżone podstrony rozdzielające światy)** *(rekomendowany obok etatu)* | `/`, `/wsparcie-it` (hardware, serwery, sieci, klienci indywidualni i lokalni), `/jak-pracuje` (`200 OK`, bez 307!), `/blog`, `/polityka-prywatnosci` (`noindex`) | Rozdziela SEO i komunikację dla wsparcia IT/sprzętu od projektów software/danych bez mnożenia podstron; mały koszt utrzymania dla 1 osoby. | Mniej dedykowanych landingów SEO pod osobne frazy typu „dashboardy analityczne” czy „automatyzacja”. |
| **S2 — Pełne 4 podstrony usługowe (z punktu 10)** | `/`, `/automatyzacja`, `/dane-i-analityka`, `/aplikacje`, `/wsparcie-it`, `/jak-pracuje`, `/blog`, `/polityka-prywatnosci` (`noindex`) | Maksymalne dopasowanie do intencji wyszukiwania (każdy filar ma własny URL, H1, FAQ, kontekstowy formularz i linkowanie z odpowiedniego klastra bloga); można przekierować stare `/dla-produkcji`, `/supportflow` itd. na najbardziej pasujące podstrony. | 4 dodatkowe strony do utrzymania spójności treści, testów i linkowania wewnętrznego. |
| **S3 — Minimum (stan obecny + naprawa `/jak-pracuje`)** | `/`, `/jak-pracuje` (`200 OK`), `/blog`, `/polityka-prywatnosci` (`noindex`) | Zero dodatkowych stron do utrzymania. | Jedna strona główna musi unieść zarówno zapytania o serwery/komputery, jak i o analitykę danych czy aplikacje webowe. |

### Obowiązkowe porządki URL / przekierowań (niezależnie od wariantu S1/S2/S3)
1. `https://www.gotovalues.com/*` → **`308` → `https://gotovalues.com/*`** (koniec podwójnego cache `www` vs apex!).
2. `/jak-pracuje` → **`200 OK`** bezpośrednio (self-canonical `https://gotovalues.com/jak-pracuje`).
3. `/vs-freelancer-automatyzator` → **`308` → `/jak-pracuje`** (i usunięcie z `sitemap.xml`).
4. W `sitemap.xml`: wyłącznie aktywne strony HTML z `index, follow` (bez `/llms.txt`, `/ai.txt`, `/vs-freelancer-automatyzator`, `/polityka-prywatnosci`).

---

## 5. Przejrzysta taksonomia portfolio i dowodów pracy (Punkty 8 i 9)

Jeśli właściciel zdecyduje się przywrócić sekcję projektów na stronie głównej (między Arkuszem 2 „Zakres” a Arkuszem „O gotovalues”), **każda pozycja musi mieć jednoznaczną, niepodważalną etykietę kategorii**, żeby nikt nie mylił projektów własnych z realizacjami komercyjnymi:

| Kategoria (jawny badge) | Przykłady | Zasady publikacji i prywatności |
|---|---|---|
| **1. Projekt autorski `gotovalues`** | **Cavi** (aplikacja webowa z workflow i AI do CV/ATS), **Akta** (wyszukiwarka i strukturyzacja dokumentów archiwalnych) | Jasny opis: *„Własny produkt zaprojektowany i wdrożony w ramach gotovalues”*. **Warunek krytyczny prywatności przed włączeniem linku do `Cavi`:** najpierw ukryć nazwisko na `https://cavi.gotova.pl/polityka-prywatnosci` (obecnie `hasSurname: true`!). Do tego czasu można pokazać kartę ze zrzutem i opisem bez linku albo linkować tylko po poprawce na `cavi.gotova.pl`. |
| **2. Zanonimizowane rozwiązanie prywatne** | **Pipeline OCR i walidacji dokumentów**, **Normalizacja i strukturyzacja danych z akt** | Bez nazw klientów, bez linków zewnętrznych, bez niepotwierdzonych procentów oszczędności — wyłącznie opis problemu, architektury i zastosowanego podejścia technicznego. |
| **3. Wdrożenie komercyjne (klient)** | *(Obecnie brak publicznych — puste do czasu zgody klienta)* | Publikowane wyłącznie po realnym wdrożeniu i pisemnej zgodzie klienta na użycie zakresu/wyników. Zero fabrykowania. |
| **4. Scenariusz modelowy (edukacyjny)** | Artykuły na blogu (np. kalkulacja `~120 h/mc`, model `400 faktur/mc`) | Wyłącznie na blogu, z obowiązkową ramką metodologiczną na górze artykułu i bez słowa „Case study” w tytule ani tagach. |

---

## 6. Struktura arkuszy strony głównej `/` (z poszanowaniem `DESIGN.md`)

1. **Arkusz 1 — `DrawingSheet` (Hero + Rysunek + Rozdzielenie odbiorców):**
   - Lewa kolumna: interaktywny diagram SVG (`0 → A → B → C`, 4 rewizje spójne z 4 filarami) + krótka podpowiedź „Kliknij wiersz, aby przełączyć wariant”.
   - Prawa kolumna: H1 (wartość) + 1-zdaniowy podtytuł + **2 zwięzłe ścieżki odbiorców (Firmy / Wsparcie IT i klienci indywidualni)** + 1 główny CTA `#kontakt` + kompaktowa metryczka 4 pól (bez nazwiska).
2. **Arkusz 2 — `PartsListSheet` (Zakres: 4 filary + 4 zasady współpracy):**
   - Tabela 4 filarów (z linkami do podstron usługowych, jeśli wybrany wariant S1 lub S2) + 4 zwięzłe zasady współpracy (bez powtórzeń z Hero).
3. **Arkusz 3 *(opcjonalny — decyzja o Punkcie 8)* — `ProjectsSheet` (Projekty autorskie i rozwiązania):**
   - 2 karty `Projekt autorski gotovalues` (`Cavi`, `Akta`) + 2 karty `Rozwiązanie prywatne` (OCR, normalizacja danych), z wyraźną notą metodologiczną odróżniającą projekty własne od wdrożeń klientów.
4. **Arkusz 4 — `AboutSheet` („O gotovalues” — kompetencje bez deanonimizacji):**
   - Opis połączenia analizy biznesowej, pracy z danymi, inżynierii oprogramowania i infrastruktury IT pod marką `gotovalues` + przycisk `OwnerReveal` (dane osobowe i LinkedIn dopiero po kliknięciu).
5. **Arkusz 5 — `NotesSheet` (Pytania przed współpracą — 5–6 konkretnych FAQ):**
   - Rozdzielenie trybu pracy (zdalnie vs sprzętowo po umówieniu), brak abonamentu, model wyceny bez obietnicy faktury przed JDG, własność kont i kodu, dla kogo są projekty autorskie.
6. **Arkusz 6 — `ContactSheet` (Jedyny formularz kontaktowy na stronie):**
   - Jeden formularz (z opcjonalnym wyborem tematu/ścieżki lub neutralnym polem), e-mail, `PhoneReveal` (kliknij, aby odsłonić numer), odpowiedź w dni robocze, obszar działania.
