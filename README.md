# gotovalues

Nowa wersja `gotovalues.com` zbudowana w `Next.js + TypeScript`.

## Zakres etapu 1

- homepage z dwoma filarami oferty:
  - `Analityka i automatyzacja`
  - `Aplikacje webowe i AI`
- osobna strona `/produkty`
- publiczne produkty:
  - `Cavi`
  - `Akta`
- sekcja `Prywatne wdrożenia` bez publicznych linków
- działający formularz kontaktowy przez `Resend`

## Uruchomienie lokalne

```bash
npm install
npm run dev
```

Aplikacja startuje domyślnie pod `http://localhost:3000`.

## Wymagane zmienne środowiskowe

Skopiuj `.env.example` do `.env.local` i ustaw:

- `RESEND_API_KEY`
- `CONTACT_TO_EMAIL`
- `CONTACT_FROM_EMAIL` opcjonalnie

Bez `RESEND_API_KEY` i `CONTACT_TO_EMAIL` formularz zwróci odpowiedź `503`.

## Skrypty

```bash
pnpm test
pnpm lint
pnpm build
```

## Deployment Vercel

Produkcja `gotovalues.com` jest obecnie publikowana przez **Vercel**. GitHub Actions uruchamia testy i build, ale nie wdraża strony.

Przed ręcznym wdrożeniem przejdź na aktualny `main` i uruchom testy, lint oraz build. Token Vercel pozostaje w 1Password; szczegółowa procedura, weryfikacja klientowego UI i rollback są w [`docs/deployment.md`](docs/deployment.md).

## Uwagi

- backup starej wersji został zapisany w branchu `archive/pre-nextjs-migration-20260317`
- punkt odniesienia przed migracją został zapisany tagiem `pre-nextjs-migration-20260317`
- stare pliki statyczne nadal są w repo jako materiał referencyjny podczas migracji

<!-- VERIFIED-PROJECT-OVERVIEW:BEGIN -->
## Opis projektu i technologii

**Cel:** Strona gotovalues.com zbudowana w Next.js i TypeScript.

**Sprawdzono:** 2026-10-11, na podstawie plików repozytorium z [commitu `d1f22a9e2e`](https://github.com/tomaasz/gotovalues-site/commit/d1f22a9e2e65921716ca766f5ceeb9559e8f7199).
Opis plików nie potwierdza, że aplikacja jest wdrożona, działa bez błędów ani że wszystkie zadeklarowane narzędzia są używane.

### Technologie i narzędzia

- Główny język według GitHuba: **JavaScript**.
- Rozpoznane technologie w wybranych manifestach: ESLint, JavaScript / Node.js, Next.js, Playwright, React, TypeScript, Vite, Vitest.
- Narzędzia zadeklarowane w wybranych plikach: GitHub Actions, npm script:build, npm script:build-storybook, npm script:dev, npm script:lint, npm script:start, npm script:storybook, npm script:test.

### Wybrane pakiety

| Pakiet | Wymaganie z manifestu | Plik |
|---|---|---|
| @hermes/design-tokens | zewnętrzne źródło lub warunek (adres pominięty) | package.json |
| @hermes/ui | zewnętrzne źródło lub warunek (adres pominięty) | package.json |
| @sentry/nextjs | ^11.2.0 | package.json |
| clsx | ^2.1.1 | package.json |
| lucide-react | ^1.49.0 | package.json |
| next | 16.3.8 | package.json |
| posthog-js | ^1.435.6 | package.json |
| react | 19.3.0 | package.json |

To wybrane deklaracje, nie pełna lista i nie wynik pomiaru wersji uruchomionej aplikacji. Pełny wykaz zależności oraz lockfile, jeżeli istnieje, pozostają w repozytorium.

### Skąd pochodzą informacje

- [`README.md`](README.md).
- [`package.json`](package.json).
- [`tsconfig.json`](tsconfig.json).
- [`.github/workflows/bot-fixer-automerge.yml`](.github/workflows/bot-fixer-automerge.yml).
- [`.github/workflows/ci.yml`](.github/workflows/ci.yml).
- [`.github/workflows/codeql.yml`](.github/workflows/codeql.yml).
- [`.github/workflows/dependabot-automerge.yml`](.github/workflows/dependabot-automerge.yml).
- [`.github/workflows/jules-ci-fix.yml`](.github/workflows/jules-ci-fix.yml).
- [`.github/workflows/jules-issue-label.yml`](.github/workflows/jules-issue-label.yml).
- [`.github/workflows/jules-security-scan.yml`](.github/workflows/jules-security-scan.yml).

### Zakres sprawdzenia

Przegląd obejmuje wybrane pliki gałęzi domyślnej. Nie uruchamiano aplikacji ani nie zmieniano wdrożeń. Limity przeglądu mogą pomijać część modułów; brak pozycji w tym opisie nie dowodzi braku funkcji lub narzędzia.
<!-- VERIFIED-PROJECT-OVERVIEW:END -->
