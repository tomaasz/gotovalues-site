# GoToValues – statyczna strona ofertowa (HTML + Tailwind + vanilla JS)

Strona jest statyczna: **czysty HTML**, gotowy build **Tailwind CSS** i **vanilla JavaScript** bez frameworków i backendu.  
Priorytety: **prostota, szybkość, bezpieczeństwo** (restrykcyjny CSP) i brak „martwego kodu”.

## Struktura projektu (kanoniczna)

- `index.html` – jedyny entry point
- `assets/tailwind.css` – wygenerowany CSS (runtime)
- `assets/app.js` – jedyny JS runtime (CSP-safe)
- `assets/fonts/*.woff2` – lokalnie hostowany Inter
- `favicon/` – favicony (bez PWA / manifestu)
- `nginx/default.conf` – konfiguracja nginx (cache + MIME)
- `tools/` – narzędzia pomocnicze (nie runtime)

## Runtime JavaScript

`assets/app.js` wykonuje tylko:
- inicjalizację ikon Lucide (`lucide.createIcons()`)
- obsługę menu mobilnego
- wstrzyknięcie SVG logo z `<template>` do kontenerów:
  - `.header-logo`
  - `.footer-logo`

**Założenie:** brak inline JavaScript w `index.html` (zgodność z CSP).

## CSP i nagłówki bezpieczeństwa

Nagłówki są ustawiane na reverse-proxy (Caddy). Minimalny zestaw:
- `Content-Security-Policy`
- `Strict-Transport-Security`
- `X-Content-Type-Options`
- `X-Frame-Options`
- `Referrer-Policy`
- `Permissions-Policy`
- `Cross-Origin-Opener-Policy`
- `Cross-Origin-Resource-Policy`

Aktualna CSP (skrót):
- `default-src 'self'`
- brak inline JS
- `object-src 'none'`
- `frame-ancestors 'none'`

## Cache policy

- HTML (`/` oraz `*.html`) → krótki cache (np. `max-age=300`)
- `/assets/*` → długi cache + `immutable`

## Sanity checks (PRZED / PO zmianie)

Uruchom:

```bash
./tools/check.sh
```

Skrypt sprawdza m.in.:
- brak inline `<script>` w `index.html`
- poprawne targety dla wstrzyknięcia logo
- nagłówki security + CSP
- cache dla HTML i assets
- porty 80/443 (docker-proxy) i kontener Caddy

Wyniki zapisywane są do:
- `/tmp/gotovalues_check/<timestamp>/headers.txt`
- `/tmp/gotovalues_check/<timestamp>/headers_filtered.txt`

## Lighthouse

Typowe wyniki:
- Performance ≈ 99
- Accessibility ≥ 95
- Best Practices = 100
- SEO = 100

Uwaga: Lighthouse może ostrzegać o wpływie rozszerzeń Chrome — najlepiej testować w trybie incognito lub czystym profilu.

## Hosting

- Caddy działa w Dockerze jako reverse proxy
- nginx serwuje statyczne pliki
- systemowy `caddy.service` jest **wyłączony**, aby nie było konfliktu na porcie 443
