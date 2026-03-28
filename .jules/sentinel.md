## 2024-05-24 - Rate Limit Bypass via IP Spoofing
**Vulnerability:** Rate Limiting Bypass due to improper IP extraction. The application prioritizes `x-forwarded-for` (user controllable) over `cf-connecting-ip` (securely set by Cloudflare) when checking IP addresses.
**Learning:** In proxy environments like Cloudflare, using client-provided headers like `x-forwarded-for` first allows an attacker to easily spoof their IP and bypass rate limits. The secure header provided by the CDN/WAF must take precedence.
**Prevention:** Always prioritize trusted infrastructure headers (e.g., `cf-connecting-ip` or `True-Client-IP`) over easily spoofable headers (`x-forwarded-for`). If falling back to `x-forwarded-for`, parse it correctly to handle proxy chains.
