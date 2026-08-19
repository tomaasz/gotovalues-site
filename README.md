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
