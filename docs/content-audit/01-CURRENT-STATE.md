# 01 — Current State: Audyt obecnego stanu `gotovalues.com` (produkcja vs repozytorium)

**Data badania:** 2026-11-27
**Źródła empiryczne:**
- Rzeczywiste renderowanie produkcyjne w Chromium/Playwright (`/`, `/dla-produkcji`, `/dla-logistyki`, `/jak-pracuje`, `/supportflow`, `/triageflow`, `/kalkulator-roi`, `/blog`)
- Bezpośredni odczyt produkcyjnych endpointów: `/llms.txt`, `/ai.txt`, `/ai/summary.json`, `/ai/service.json`, `/sitemap.xml`
- Kod i dokumentacja repozytorium (`main` @ `802b6cc`): `src/content/site.ts`, `src/content/faq.ts`, `src/content/blog.ts`, `src/components/home/*`, `src/components/site-header.tsx`, `src/components/footer.tsx`, `src/app/layout.tsx`, `PRODUCT.md`, `DESIGN.md`, `.planning/*`, `process/*`.

---

## 1. Zgodność produkcji z repozytorium

| Obszar | Wersja w repo (`802b6cc`) | Wersja produkcyjna (`https://gotovalues.com`) | Status |
|---|---|---|---|
| Strona główna (`/`) | H1: *„Sprawne IT dla małej firmy i JDG.”*, 4 filary IT, Zabrodzie / pow. wyszkowski, `PhoneReveal` | Identyczna (`HTTP 200`, 704 słowa) | Zgodna |
| Nawigacja (`SiteHeader`) | 5 linków: `Oferta`, `O mnie`, `Pytania`, `Blog`, `Kontakt` | Identyczna na wszystkich 8 sprawdzonych trasach | Zgodna |
| Stopka (`Footer`) | `SupportFlow AI`, `TriageFlow`, `Kalkulator ROI`, `Blog`, `Polityka prywatności`, `kontakt@gotovalues.com` | Identyczna na wszystkich trasach | Zgodna |
| Podstrony ofertowe i blog | `/dla-produkcji`, `/dla-logistyki`, `/jak-pracuje`, `/supportflow`, `/triageflow`, `/kalkulator-roi`, `/blog` (17 wpisów) | Wszystkie zwracają `HTTP 200`, brak sekcji `#produkty`/`#proof` na `/`, `/dla-produkcji`, `/dla-logistyki`, `/jak-pracuje` | Zgodna |
| Endpointy AI i SEO | `/ai.txt`, `/llms.txt`, `/ai/summary.json`, `/ai/service.json`, `/sitemap.xml` | Zgodne z `802b6cc` | Zgodna |

**Kluczowy wniosek:** nie ma rozjazdu deploymentu (produkcja = `HEAD` na `main`). Istnieje natomiast **głęboki rozjazd strategiczno-treściowy wewnątrz samego serwisu i jego dokumentacji** wynikający z gwałtownych zwrotów kierunku na przestrzeni ostatnich tygodni i godzin.

---

## 2. Mapa źródeł treści w repozytorium

| Plik | Rola | Obecny przekaz |
|---|---|---|
| `src/content/site.ts` | Główne źródło treści (brand, offer, approach, about, contact, aiSummary + podstrony landingowe) | **Hybryda dwóch światów:** `brand`, `offer`, `approach`, `about`, `contact`, `aiSummary` = lokalne i zdalne IT dla JDG/małych firm (Zabrodzie); `comparisonLanding`, `productionLanding`, `logisticsLanding`, `products`, `proofOfCompetence` = B2B aplikacje webowe, procesy, AI i OCR |
| `src/components/home/home-sheets.tsx` | Arkusze strony głównej (`DrawingSheet`, `PartsListSheet`, `AuthorSheet`, `NotesSheet`, `ContactSheet`; nieużywany `ProofSheet`) | Lokalne IT dla małych firm i JDG ubrane w metaforę rysunku technicznego ISO 128 (`Opracował:`, `Uwagi:`, ramka ze strefami A–F / 1–4) |
| `src/components/home/process-drawing.tsx` | Interaktywny rysunek SVG + tabela zmian (`Rew. 0 / A / B / C`) | Przepisany z procesów ERP/Excel na awarie Wi-Fi / komputery / helpdesk / narzędzia |
| `src/content/faq.ts` | 7 pytań FAQ (strona główna + `FAQPage` JSON-LD + `/ai/faq.json`) | Przeorientowane na małe firmy i JDG (dojazd w Zabrodziu i pow. wyszkowskim, abonament vs doraźnie, backup) |
| `src/components/home/title-block-form.tsx` i `src/components/contact-form.tsx` | Formularze kontaktowe (4 pola + honeypot + CTA `Napisz`) | Spójne z nowym przekazem IT (`W czym mogę pomóc?`, przykłady Wi-Fi/komputer/poczta/backup) |
| `src/components/phone-reveal.tsx` | Klikany numer telefonu zabezpieczony przed botami | Działa poprawnie (`+48 600 468 473`, brak cyfr w surowym HTML) |
| `src/components/footer.tsx` | Globalna stopka na każdej podstronie | **Niespójna z `/`:** eksponuje `SupportFlow AI`, `TriageFlow` i `Kalkulator ROI` |
| `src/app/layout.tsx` | Metadane globalne + Schema.org (`WebSite` + `ProfessionalService`) | Przeorientowane na IT dla małych firm/JDG + `PostalAddress: Zabrodzie`, `areaServed: ["Zabrodzie", "powiat wyszkowski", "PL"]` |
| `src/app/llms.txt/route.ts` | Wizytówka dla modeli AI | **Niespójna:** nagłówek = wsparcie IT Zabrodzie/JDG, ale sekcja `Proof of competence` nadal publikuje `Cavi` i `Akta`, a `Key pages` linkuje 6 stron AI/automatyzacji |
| `src/app/supportflow/page.tsx`, `src/app/triageflow/page.tsx`, `src/app/dla-produkcji/page.tsx`, `src/app/dla-logistyki/page.tsx`, `src/app/jak-pracuje/page.tsx`, `src/app/kalkulator-roi/page.tsx` | Podstrony ofertowe „zostawione w tle” | Indeksowane w `sitemap.xml` (priorytety 0.7–0.85) i linkowane ze stopki; prezentują zupełnie inną firmę (agenci AI, 4 000 PLN, ERP/TMS, „founder”) |
| `src/content/blog.ts` | 17 artykułów blogowych (indeksowanych w `/blog`, `/feed.xml`, `sitemap.xml`) | 100% tematyki dotyczy AI, automatyzacji procesów, dashboardów BI, KPI, integracji IT i aplikacji webowych dla MŚP; **0 artykułów** o sieciach, naprawie komputerów czy helpdesku JDG |
| `PRODUCT.md`, `.planning/PROJECT.md`, `process/context.md` | Pamięć projektowa dla agentów | Nieaktualne względem ostatnich zmian (`8df75f4`, `802b6cc`) — nadal opisują pierwotny model doradcy procesowego / AI z publicznymi produktami Cavi i Akta |

---

## 3. Inwentarz wyrenderowanych stron produkcyjnych (snapshot z Playwright, 2026-11-27)

| Trasa | `<title>` | H1 | Liczba słów | Główne CTA | Zauważone anomalie |
|---|---|---|---|---|---|
| `/` | `gotovalues` | *Sprawne IT dla małej firmy i JDG.* | 704 | `Napisz` (submit) | Brak opisu słownego w `<title>` (tylko nazwa marki); stopka kieruje do produktów AI (`SupportFlow AI`, `TriageFlow`, `Kalkulator ROI`); estetyka rysunku technicznego zderza się z copy „serwisowym” |
| `/dla-produkcji` | `Dla produkcji \| gotovalues` | *Porządkuję dokumenty, jakość i wyjątki operacyjne — bez wymiany ERP.* | 380 | `Opisz proces w zakładzie` (`#kontakt`) | Całkowicie inny model biznesowy niż `/` (produkcja/przetwórstwo vs JDG serwis/Wi-Fi); brak jakiegokolwiek dowodu kompetencji po usunięciu `#proof` |
| `/dla-logistyki` | `Dla logistyki i spedycji \| gotovalues` | *Porządkuję statusy zleceń, dokumenty przewozowe i wymianę danych tam, gdzie TMS i ERP nie domykają realnej pracy spedycji.* | 518 | `Opisz proces w spedycji`, `Integracja systemów IT` | 21-słowne H1, 20+ słowne H2, dwa konkurencyjne CTA, brak proof |
| `/jak-pracuje` | `gotovalues — jak pracuję: AI, web apps, procesy \| gotovalues` | *Proces, gotowiec albo dedykowane narzędzie — wybór zależy od problemu, nie etykiety dostawcy* | 416 | `Opisz proces do uporządkowania` | **Zduplikowane `gotovalues` w `<title>`**; sprzeczność z pozycjonowaniem `/` |
| `/supportflow` | `SupportFlow AI — automatyzacja wsparcia B2B \| gotovalues` | *AI, które naprawdę odciąża Twój support* | 852 | `Opisz proces wsparcia` | Inny rejestr językowy (flaga `🇵🇱`, „founder”, „od 4 000 PLN”, „Zostań pierwszym klientem referencyjnym”), pakiety `START/BUSINESS/ENTERPRISE`; widoczne w stopce na `/` |
| `/triageflow` | `TriageFlow — automatyczny triage zgłoszeń (GitHub, e-mail) \| gotovalues` | *Zgłoszenia, które segregują się same* | 659 | `Opisz swój strumień zgłoszeń` | Bardzo techniczny/deweloperski produkt (GitHub Issues, P0–P3) linkowany ze stopki strony kierowanej do JDG |
| `/kalkulator-roi` | `Kalkulator ROI automatyzacji procesów \| gotovalues` | *Ile zwróci Ci automatyzacja procesu?* | 184 | `Policzmy to na Twoim procesie` | Linkowany ze stopki, prowadzi do `/#kontakt`, gdzie formularz pyta teraz o Wi-Fi i naprawę komputera |
| `/blog` | `Blog — dedykowane aplikacje webowe, AI i automatyzacja procesów \| gotovalues` | *Praktycznie o aplikacjach, AI i procesach.* | 806 | `Opisz proces do uporządkowania` | Linkowany w głównym menu `/` (`Blog`), ale 17 na 17 wpisów dotyczy wyłącznie AI, BI/KPI, automatyzacji i aplikacji webowych — ani jednego wpisu o sieciach, naprawie PC czy helpdesku |

---

## 4. Zidentyfikowane główne napięcia strukturalne (punkt wyjścia dla Agentów 1–5)

1. **Kryzys tożsamości („dwie różne firmy pod jedną domeną”):** Strona główna przedstawia lokalnego informatyka/serwisanta dla JDG (Wi-Fi, naprawa komputerów, Zabrodzie), podczas gdy stopka, blog (17 wpisów), `/llms.txt` i 6 podstron indeksowanych w Google sprzedają butikowego inżyniera AI, BI i aplikacji webowych dla MŚP.
2. **Niedocenienie rzeczywistych kompetencji właściciela:** Na `/` niemal zniknęły najcenniejsze i najtrudniejsze do skopiowania kompetencje Tomasza (analiza biznesowa, doświadczenie w leasingu/zarządzaniu aktywami/wycenie maszyn, analiza danych/BI, tworzenie aplikacji webowych, automatyzacja i AI), zepchnięte do 4. wiersza tabeli jako „dodatek”.
3. **Brak warstwy dowodowej (po usunięciu sekcji przykładów):** Po usunięciu Cavi, Akta i wdrożeń prywatnych na stronie nie ma żadnych konkretnych scenariuszy, przykładów efektów ani dowodów kompetencji (poza linkiem do LinkedIn i 3 ogólnymi punktami w „O mnie”).
4. **Dysonans między estetyką a treścią:** Wyjątkowa, wysokiej klasy estetyka rysunku technicznego ISO 128 (`DESIGN.md` — „The Working Drawing”) komunikuje inżynierię systemową, precyzję i doradztwo klasy premium, a obecnie opakowuje komunikaty o naprawie wolnego komputera i rwącym Wi-Fi.
5. **Niespójność formularza na podstronach:** Globalny `ContactForm` został zmieniony na pytania o Wi-Fi/serwis komputera, ale jest renderowany także na `/dla-produkcji`, `/dla-logistyki`, `/supportflow`, `/triageflow` i `/jak-pracuje` — gdzie odbiorca czyta o ERP/TMS lub agentach AI, a w formularzu dostaje placeholder *„Np. rwie się Wi-Fi w biurze, komputer wymaga serwisu...”*!
