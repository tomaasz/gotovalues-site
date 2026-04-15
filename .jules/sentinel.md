## 2024-05-24 - Rate Limit Bypass via IP Spoofing
**Vulnerability:** Rate Limiting Bypass due to improper IP extraction. The application prioritizes `x-forwarded-for` (user controllable) over `cf-connecting-ip` (securely set by Cloudflare) when checking IP addresses.
**Learning:** In proxy environments like Cloudflare, using client-provided headers like `x-forwarded-for` first allows an attacker to easily spoof their IP and bypass rate limits. The secure header provided by the CDN/WAF must take precedence.
**Prevention:** Always prioritize trusted infrastructure headers (e.g., `cf-connecting-ip` or `True-Client-IP`) over easily spoofable headers (`x-forwarded-for`). If falling back to `x-forwarded-for`, parse it correctly to handle proxy chains.

## 2026-03-29 - HTML Injection in Emails
**Vulnerability:** User inputs (name, email, company) were interpolated into HTML email templates without sanitization, leading to an HTML Injection / XSS vulnerability when rendering the emails.
**Learning:** Only `message` was being escaped correctly. Other seemingly benign fields like `name` or `company` can contain malicious payloads if left unescaped.
**Prevention:** Always sanitize/escape all user-provided data before injecting it into any HTML template, including email templates.

## 2024-03-30 - [Fix Client-Side Only Honeypot Validation]
**Vulnerability:** The honeypot form field (`bot_field`) intended to block bot submissions was only being checked on the client-side (`ContactForm.tsx`) but totally ignored by the server-side validation schema (`contactFormSchema` in `src/lib/contact.ts`).
**Learning:** This is a classic client-side bypass pattern. Spam bots frequently submit payloads directly to the API (`/api/contact`), completely bypassing the frontend logic and generating spam emails.
**Prevention:** Always enforce honeypot checks and any form constraint within the server-side parsing layer (e.g. Zod schemas) because client-side restrictions offer zero actual security against programmatic attacks.
When injecting JSON into a `<script>` tag via `dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}`, always escape HTML-sensitive characters (e.g., `.replace(/</g, '\u003c').replace(/>/g, '\u003e').replace(/&/g, '\u0026')`) to prevent XSS, as standard `JSON.stringify` does not inherently escape them.
API route rate limiting (e.g., in Cloudflare Workers/Pages isolate) is implemented using an in-memory `Map` bounded to 2000 entries (`MAX_RATE_LIMIT_ENTRIES`). To prevent IP spoofing bypasses, it strictly relies on `cf-connecting-ip` and must NEVER fall back to the client-controlled `x-forwarded-for` header. It uses a deterministic FIFO eviction strategy (`rateLimitMap.delete(rateLimitMap.keys().next().value)`) to prevent OOM crashes, freshening entries on access for LRU behavior.

## 2026-04-08 - Masked Security Scan Failures in CI
**Vulnerability:** The GitGuardian secret scan job in `.github/workflows/ci.yml` used `continue-on-error: true`, meaning failures during the scan (such as discovered secrets) did not fail the CI build.
**Learning:** Masking security scan failures undermines their purpose. A Security Hotspot is triggered if a step designed to catch vulnerabilities can silently fail, allowing sensitive data to leak or poor practices to merge.
**Prevention:** Never use `continue-on-error: true` on critical security scanners unless strictly necessary and well-documented. To mitigate rate limits instead of masking failures, reduce scan depth (e.g., `fetch-depth: 1`).
- Masked Security Scan Failures in CI: The Snyk and Socket Security dependency scanning jobs in `.github/workflows/ci.yml` used `continue-on-error: true`, meaning failures during the scan would not fail the CI build. This masks critical security vulnerabilities. Removed `continue-on-error: true` from both jobs.
