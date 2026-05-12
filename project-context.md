# gotovalues.com — Kontekst Projektu

> **Zasada:** przed każdym zadaniem programistycznym sprawdź ten plik, aby uniknąć halucynacji o strukturze kodu.
> Ostatnia aktualizacja: 2026-05-12

## Stack technologiczny

| Warstwa | Technologia |
|---------|-------------|
| Framework | Next.js 16.2.4 (App Router, typedRoutes) |
| UI | React 19.2.3 |
| Język | TypeScript (strict) |
| Hosting | Cloudflare Workers (wrangler + opennextjs-cloudflare ^1.17.1) |
| Monitoring | Sentry (@sentry/nextjs ^10.49.0) |
| Analityka | PostHog (posthog-js ^1.364.4) |
| Email | Resend (^6.2.0) |
| Stylowanie | Tailwind CSS + PostCSS + clsx |
| Lint | ESLint + Prettier + SonarQube |
| Testy | tsx --test (Node test runner) |

## Struktura katalogów

```
src/
├── app/                    # Next.js App Router
│   ├── api/               # API routes (Cloudflare Workers)
│   ├── dla-produkcji/     # /dla-produkcji
│   ├── produkty/           # /produkty
│   ├── polityka-prywatnosci/ # /polityka-prywatnosci
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Homepage
│   ├── globals.css         # Global styles
│   └── robots.ts, sitemap.ts
├── components/             # Komponenty React
├── content/                # Treści (MDX?)
├── lib/                    # Biblioteki pomocnicze
tests/                     # Testy (tsx --test)
public/                    # Statyczne assety
assets/                    # Dodatkowe assety
docs/                      # Dokumentacja
scripts/                   # Skrypty pomocnicze
tools/                     # Narzędzia
```

## Deployment

- **Produkcja:** Cloudflare Workers (`wrangler.jsonc`)
- **Build:** `opennextjs-cloudflare build && opennextjs-cloudflare deploy`
- **CI/CD:** GitHub Actions (`.github/workflows/ci.yml`)
- **Preview:** `opennextjs-cloudflare preview`
- **Worker name:** `gotovalues-site`

## Konwencje

- Język kodu: angielski (nazwy zmiennych, funkcji, komentarze techniczne)
- Treści strony: polski
- Formatter: Prettier (`.prettierrc.json`)
- Node.js: >= 20.0.0
- Routing: App Router z typedRoutes: true

## Baza danych / Storage

- Brak zewnętrznej bazy — dane prawdopodobnie statyczne lub API-driven
- Assets via Cloudflare ASSETS binding

## Aktualny stan (2026-05-12)

- Strona działa na gotovalues.com
- CI przechodzi przez GitHub Actions + SonarQube
- Monitoring Sentry aktywny
