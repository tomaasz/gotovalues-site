# 00 — Audit Brief: Kompleksowy audyt treści, pozycjonowania marki i strategii komunikacji `gotovalues.com`

**Data:** 2026-11-27
**Tryb:** `/gsd-explore` — wyłącznie discovery, research i audyt (bez zmian w kodzie, UI, `ROADMAP.md`, commitów i wdrożeń)
**Repozytorium / HEAD:** `gotovalues-site` @ `main` (`802b6cc`, w sync z `origin/main`)
**Środowisko produkcyjne:** `https://gotovalues.com` (Vercel, projekt `gotovalues`)

---

## 1. Cel audytu

Właściciel marki (Tomasz Gołaszewski) jest niezadowolony z obecnych treści `gotovalues.com` pod względem merytorycznym, stylistycznym i marketingowym. Celem audytu jest bezstronne sprawdzenie:

1. Jakości i spójności wszystkich obecnych treści (strona główna, podstrony, nawigacja, stopka, formularze, FAQ, metadane, endpointy AI).
2. Fundamentalnych założeń dotyczących pozycjonowania marki, hierarchii oferty i grup docelowych — bez traktowania dotychczasowych decyzji jako nienaruszalnych.
3. Kluczowego napięcia strategicznego: czy obecny przekaz nie spycha właściciela do roli lokalnego serwisanta komputerowego (niskomarżowa praca, silna lokalna konkurencja stacjonarna) i nie ukrywa jego wyższych kompetencji (IT, tworzenie aplikacji, analiza biznesowa, analiza danych, automatyzacja, AI) — a jednocześnie czy i jak sensownie połączyć lub rozdzielić lokalne wsparcie IT dla małych firm z usługami doradczo-wdrożeniowymi.
4. Dopasowania treści do istniejącego systemu wizualnego („The Working Drawing” / `DESIGN.md`).

---

## 2. Zweryfikowana baza kompetencji właściciela (tylko fakty z repozytorium i źródeł projektu)

> **Zasada anty-halucynacyjna:** Audyt opiera się wyłącznie na zweryfikowanych faktach z repozytorium (`PRODUCT.md`, `DESIGN.md`, `process/`, `.planning/`, `src/`). Nie wymyślamy klientów, case studies, certyfikatów ani mierzalnych wyników.

- **Właściciel:** Tomasz Gołaszewski, niezależny specjalista (działający w 1. osobie liczby pojedynczej), baza lokalna: **Zabrodzie, powiat wyszkowski (Mazowsze)**; zasięg zdalny: **cała Polska**.
- **Doświadczenie biznesowo-operacyjne:** wieloletnie doświadczenie w obszarach **leasingu, zarządzania aktywami (asset management), wyceny maszyn i cyfryzacji procesów operacyjnych** (`PRODUCT.md`, `src/content/site.ts` historia).
- **Kompetencje techniczno-inżynieryjne:**
  - tworzenie aplikacji webowych (Next.js, React, TypeScript, Python, PostgreSQL),
  - analiza biznesowa i projektowanie procesów (od diagnozy wąskich gardeł przed pisaniem kodu),
  - analiza danych i dashboardy analityczne / BI,
  - automatyzacja procesów, integracje systemów, pipeline'y OCR / ekstrakcji / klasyfikacji / walidacji dokumentów z AI,
  - własne działające produkty technologiczne zbudowane w tym stacku: `Cavi` (aplikacja webowa z AI) i `Akta` (wyszukiwarka i OCR archiwów) — obecnie celowo ukryte na stronach publicznych,
  - praktyczna infrastruktura IT: sieci LAN/Wi-Fi, VPN, serwery/NAS, sprzęt komputerowy, poczta firmowa (M365/Google Workspace), kopie zapasowe (backup) i zdalny/lokalny helpdesk.
- **Braki dowodowe (nie wolno ich fabrykować):** brak publicznych referencji/opinii klientów, brak logotypów klientów, brak nazwanych case studies z twardym zwrotem z inwestycji, brak publicznego cennika i certyfikatów.

---

## 3. Metodyka i architektura pracy wieloagentowej

Audyt przeprowadzono z udziałem 5 niezależnych ról analitycznych:

| Rola | Zakres odpowiedzialności | Artefakt wynikowy |
|---|---|---|
| **Agent 1 — Brand & Business Strategy** | Pozycjonowanie, propozycja wartości, grupy docelowe, hierarchia usług, potencjał komercyjny, wykorzystanie rzeczywistych kompetencji właściciela | `02-BRAND-STRATEGY.md` |
| **Agent 2 — Content & Copywriting** | Jakość merytoryczna, naturalność polszczyzny, wykrywanie AI-slopu, sprzeczności, frazy obniżające postrzeganą wartość, konkretne przepisania | `03-CONTENT-AUDIT.md` |
| **Agent 3 — UX Writing & CRO** | Hierarchia informacji, pierwsze wrażenie, ścieżki odbiorców, CTA, formularze, FAQ, bariery konwersji, spójność z estetyką `DESIGN.md` | `04-UX-CRO-AUDIT.md` |
| **Agent 4 — Market Research & SEO** | Analiza 8–10 realnych konkurentów (lokalnych w pow. wyszkowskim, regionalnych na Mazowszu/S8 i ogólnopolskich butików automatyzacji/BI), intencje wyszukiwania, nagłówki, metadane, SEO lokalne i ogólnopolskie | `05-MARKET-SEO-RESEARCH.md` |
| **Agent 5 — Critical Reviewer** | Niezależna weryfikacja raportów Agentów 1–4 i propozycji tekstów, wykrycie sprzeczności, niepotwierdzonych założeń i ocena wykonalności biznesowej | `11-CRITICAL-REVIEW.md` |

Rozbieżności pomiędzy agentami nie są wygładzane na siłę — są jawnie zestawiane jako alternatywy decyzyjne dla właściciela.

---

## 4. Zakres ograniczeń (Discovery Only)

- Zero modyfikacji w `src/`, `tests/`, `packages/`, `.planning/ROADMAP.md`.
- Zero instalacji zależności, commitów, tagów, PR, GitHub Issues oraz deploymentów.
- Praca kończy się kompletnym zestawem 14 raportów w `docs/content-audit/` oraz listą decyzji wymagających zatwierdzenia przez Tomasza przed wejściem w fazę formalnego planowania GSD.
