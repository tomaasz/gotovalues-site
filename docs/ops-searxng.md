# SearXNG — self-hosted meta-search engine

Deployed as a local Docker container providing JSON API for Hermes Agent.

## Container

| Field | Value |
|---|---|
| Name | `searxng-local` |
| Image | `docker.io/searxng/searxng:latest` |
| Port | `127.0.0.1:8888 → 8080/tcp` |
| Restart | `unless-stopped` |
| Created | 2026-07-08 |

### Run command

```bash
docker run -d \
  --name searxng-local \
  --restart unless-stopped \
  -p 127.0.0.1:8888:8080 \
  -v /home/tomaasz/docker/searxng/searxng/settings.yml:/etc/searxng/settings.yml:ro \
  -v searxng-data:/var/cache/searxng:rw \
  --cap-drop ALL \
  --cap-add CAP_CHOWN \
  --cap-add CAP_DAC_OVERRIDE \
  --cap-add CAP_SETGID \
  --cap-add CAP_SETUID \
  docker.io/searxng/searxng:latest
```

### Docker Compose

Existing compose file: `/home/tomaasz/searxng/docker-compose.yaml`
Settings: `/home/tomaasz/docker/searxng/searxng/settings.yml`

## Configuration

Key settings (`/home/tomaasz/docker/searxng/searxng/settings.yml`):

- `search.formats: [html, json]` — JSON API enabled
- `server.bind_address: "0.0.0.0"` — listens on container port 8080
- `server.limiter: false` — no rate limiting (local use)
- `server.secret_key: <generated>` — unique per instance
- `search.safe_search: 0` — unfiltered results
- `outgoing.request_timeout: 10.0`

## Verification

```bash
# JSON API query
curl -s 'http://127.0.0.1:8888/search?q=test&format=json' | jq '.results | length'

# Health check
curl -so /dev/null -w '%{http_code}' 'http://127.0.0.1:8888/search?q=test&format=json'
# Expect: 200
```

## Hermes integration

Hermes Agent must have:

1. `SEARXNG_URL` set to `https://searxng.gotova.pl` (public URL) or `http://127.0.0.1:8888` (local only)
2. `web.search_backend: searxng` in `config.yaml`

**Current config** (verified 2026-07-10):
- `~/.hermes/.env`: `SEARXNG_URL=https://searxng.gotova.pl`
- `~/.hermes/config.yaml`: `search_backend: searxng`
- `~/.hermes/profiles/hermes-worker/config.yaml`: `search_backend: searxng`

Set via:
```bash
export SEARXNG_URL=https://searxng.gotova.pl
```
Or add to Hermes config's environment section.

## Verification

```bash
# JSON API test (local)
curl -s 'http://127.0.0.1:8888/search?q=test&format=json' | jq '.results | length'

# JSON API test (public)
curl -s 'https://searxng.gotova.pl/search?q=test&format=json' | jq '.results | length'
# Expect: ≥1 result, HTTP 200

# Hermes search routing
hermes chat -q 'search: python programming language'
# Expect: search tool shows 🔍 icon, routes through SearXNG
```

## Known issues

### Engine availability (2026-07-10)

| Engine | Status | Detail |
|--------|--------|--------|
| Wikipedia | ✅ Works | Always available, no API key needed |
| Google CSE | ✅ Works | May have rate limits |
| Brave | ❌ Suspended | `too many requests` — free tier exhausted |
| DuckDuckGo | ❌ CAPTCHA | Requires CAPTCHA bypass |
| Startpage | ❌ Suspended | CAPTCHA lock |

### web_search tool format mismatch

Hermes' `web_search` tool (used internally by the agent) returns empty results even though SearXNG's raw API returns full results. The raw API call works when curl'd directly. The tool may expect a different JSON schema. This means SearXNG-backed searches in Hermes may appear empty unless the agent falls back to manual API calls.

**Workaround**: Hermes agents that encounter empty SearXNG results can curl the API directly:
```python
import requests, json
r = requests.get('https://searxng.gotova.pl/search', params={'q': query, 'format': 'json'})
results = r.json().get('results', [])
```

## Troubleshooting

- **Engine suspension**: See table above. Most likely cause of empty search results.
- **Fix — Brave Search API key**: Add a Brave Search API key to SearXNG's settings. Brave's paid API (https://api.search.brave.com) has no rate limits. Add to `settings.yml` under `outgoing:`:
  ```yaml
  outgoing:
    # existing settings...
    brave_api_key: "YOUR_BRAVE_API_KEY"
  ```
  Then restart: `docker restart searxng-local`.
- **Alternative**: Configure fewer engines or use SearXNG's rate-limit avoidance. See https://docs.searxng.org/admin/engines/.
- **Logs**: `docker logs searxng-local`
- **Restart**: `docker restart searxng-local`
- **Settings reload**: SearXNG reads settings on container start. Restart after changes.
