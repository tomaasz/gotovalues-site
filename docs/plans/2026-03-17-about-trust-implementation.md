# About Trust Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Wdrożyć mocniejszą sekcję `O mnie`, która buduje zaufanie przez rolę, doświadczenie domenowe i styl współpracy.

**Architecture:** Zmiana pozostaje content-first. Rozszerzamy obiekt `siteContent.about` o pola potrzebne do pełniejszej prezentacji i lekko aktualizujemy render homepage, bez przebudowy całego layoutu.

**Tech Stack:** Next.js App Router, TypeScript, statyczny content, node:test

---

### Task 1: Rozszerzyć model treści `about`

**Files:**
- Modify: `src/content/site.ts`
- Test: `tests/site-content.test.ts`

**Step 1: Dodać pola identyfikujące rolę i doświadczenie**

- `headline`
- `role`
- `summary`
- `detail`
- `points`

**Step 2: Oprzeć treść na zatwierdzonym kierunku i faktach z CV**

- doświadczenie leasing / asset management / wycena / cyfryzacja
- projektowanie narzędzi IT, workflow i automatyzacji
- bezpośredni styl współpracy

**Step 3: Dopisać testy treści**

- sprawdzić obecność roli
- sprawdzić odniesienie do doświadczenia operacyjnego lub aktywów
- sprawdzić liczbę punktów zaufania

### Task 2: Zmienić render sekcji na homepage

**Files:**
- Modify: `src/app/page.tsx`

**Step 1: Pokazać nowy nagłówek sekcji**

- oprzeć `h2` na `siteContent.about.headline`

**Step 2: Dodać linię tożsamości**

- wyświetlić rolę pod eyebrow albo w karcie

**Step 3: Wyrenderować dwa akapity i trzy punkty**

- zachować obecny styl sekcji
- nie dodawać nowego ciężkiego komponentu

### Task 3: Weryfikacja

**Files:**
- none

**Step 1: Run tests**

Run: `npm test`

**Step 2: Run lint**

Run: `npm run lint`

**Step 3: Run production build**

Run: `npm run build`
