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
