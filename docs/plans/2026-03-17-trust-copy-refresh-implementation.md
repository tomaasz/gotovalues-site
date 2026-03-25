# Trust Copy Refresh Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Wzmocnić sekcje `O mnie` i `Kontakt` o sygnały zaufania ze starej wersji strony bez cofania nowego pozycjonowania gotovalues.

**Architecture:** Zmiana pozostaje content-first. Rozszerzamy centralny obiekt `siteContent` o bardziej osobisty opis współpracy i jawne sygnały kontaktowe, a następnie renderujemy je na homepage i na landing page dla produkcji.

**Tech Stack:** Next.js App Router, TypeScript, statyczny content, node:test

---

### Task 1: Rozszerzenie contentu o sygnały zaufania

**Files:**
- Modify: `src/content/site.ts`
- Test: `tests/site-content.test.ts`

**Step 1: Dopisać copy dla sekcji `about`**

- zachować obecny kierunek operacyjny
- dodać element bezpośredniej współpracy i prostszego sposobu pracy

**Step 2: Dodać wspólny payload dla sekcji kontaktowej**

- krótki lead
- lista punktów
- sygnały kontaktowe: e-mail, czas odpowiedzi, opcjonalnie lokalność

**Step 3: Dopisać testy treści**

- sprawdzić obecność sygnału bezpośredniej współpracy
- sprawdzić obecność adresu e-mail i deklaracji czasu odpowiedzi

### Task 2: Renderowanie na stronie głównej i landing page

**Files:**
- Modify: `src/app/page.tsx`
- Modify: `src/app/dla-produkcji/page.tsx`

**Step 1: Użyć nowych pól `siteContent.about` na homepage**

- dodać drugi akapit lub rozszerzyć kartę
- utrzymać aktualny układ sekcji

**Step 2: Użyć wspólnych sygnałów kontaktowych**

- homepage: wyświetlić je obok formularza
- landing page: wyświetlić je w tej samej logice

### Task 3: Weryfikacja

**Files:**
- none

**Step 1: Run tests**

Run: `npm test`

**Step 2: Run lint**

Run: `npm run lint`

**Step 3: Run production build**

Run: `npm run build`
