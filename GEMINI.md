# GEMINI.md — Kontekst i reguły dla Gemini CLI & Antigravity

## Przegląd projektu

Serwis firmowy **gotovalues.com** — wizytówka, oferta konsultingowo-inżynieryjna (automatyzacja procesów, aplikacje webowe i systemy AI) oraz katalog produktów technologicznych (`Cavi`, `Akta`).

## Stack technologiczny

- **Framework:** Next.js 16 (App Router, `typedRoutes: true`)
- **UI:** React 19, TypeScript (strict), Tailwind CSS v4, `@hermes/ui`, `@hermes/design-tokens`
- **Monorepo / Workspace:** pnpm workspace (`.` oraz `packages/*`)
- **Analityka & Monitoring:** PostHog, Microsoft Clarity, Sentry
- **E-mail & Formularze:** Resend (`/api/contact`), Zod
- **Testy:** Node test runner (`tsx --test`), Vitest, Storybook 10, Playwright
- **Hosting:** Vercel (projekt produkcyjny `gotovalues`)

## Struktura katalogów

```text
src/
├── app/                    # Next.js App Router (strony, layouty, api)
│   ├── api/contact/        # Handler formularza kontaktowego (Resend)
│   ├── dla-produkcji/      # Landing dedykowany
│   ├── dla-logistyki/      # Landing dedykowany
│   ├── layout.tsx          # Główny layout (fonty, metadata, analityka)
│   ├── page.tsx            # Strona główna
│   └── globals.css         # Style globalne Tailwind v4
├── components/             # Komponenty React (UI, formularze, nawigacja)
│   └── ui/                 # Elementy bazowe (przyciski, karty, inputy)
└── lib/                    # Logika biznesowa, walidacja Zod, analityka
packages/
├── design-tokens/          # Tokeny projektowe Hermes
└── ui/                     # Współdzielone komponenty UI Hermes
tests/                      # Testy jednostkowe i integracyjne (tsx --test)
docs/                       # Dokumentacja operacyjna (deployment.md)
process/                    # Pamięć i plany agentów AI (context, decisions, routing)
```

## Polecenia deweloperskie i weryfikacja

```bash
# Uruchomienie testów jednostkowych
npx tsx --test tests/*.test.ts tests/*.test.tsx

# Linter ESLint
pnpm lint

# Build produkcyjny
pnpm build

# Storybook (komponenty UI)
pnpm storybook
```

## Kluczowe zasady

1. **Język:** Treści dla użytkowników po polsku. Kod, nazwy zmiennych, komentarze techniczne i commity po angielsku.
2. **Brand:** Nazwa marki w tekstach zawsze pisana małymi literami: `gotovalues`.
3. **Produkty:** Publicznie linkowane są wyłącznie dwa zatwierdzone produkty: `Cavi` oraz `Akta`. Wdrożenia prywatne pozostają bez zewnętrznych linków.
4. **Zero sekretów:** Nigdy nie zapisuj kluczy API, tokenów ani zawartości `.env` do repozytorium ani do Obsidian Vault.
5. **Deployment:** Produkcja wdrożona na Vercel z poziomu czystego brancha `main`. Token w 1Password: `op://hosty-debianovh/vercel/token`. Szczegóły: [`docs/deployment.md`](docs/deployment.md).
6. **Wspólna wiedza:** Przed i po pracy sprawdź kontrakt w `~/obsidian-vault/agents/GLOBAL.md` oraz stan przekazania w `~/obsidian-vault/projects/gotovalues.md`.
