# Phase 2 patterns

- Keep `ContactForm` as a client leaf with browser `FormData`, `fetch('/api/contact')`, local pending/success/error state, and one `role="status"` region.
- Keep `contactFormSchema` authoritative on the server; normalize optional company to an empty string and reject malformed direct POSTs.
- Keep `buildContactEmail` responsible for readable text and escaped HTML; do not interpolate raw visitor text.
- Test accessible labels and exact request/email contracts together so removing a field cannot leave stale schema or mail output.
