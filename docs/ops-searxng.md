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

1. `SEARXNG_URL` set to `http://127.0.0.1:8888` (config env or shell env)
2. `web.search_backend: searxng` in `config.yaml`

Set via:
```bash
export SEARXNG_URL=http://127.0.0.1:8888
```
Or add to Hermes config's environment section.

## Troubleshooting

- **Engine suspension**: All default upstream engines (Brave, DuckDuckGo, Startpage, Google CSE) are currently blocked — Brave is suspended (`too many requests`), DuckDuckGo/Startpage require CAPTCHA. This means **no search results** reach Hermes even though the SearXNG API responds HTTP 200.
- **Fix — Brave Search API key**: The most reliable fix is to add a Brave Search API key to SearXNG's settings. Brave's paid API (https://api.search.brave.com) has no rate limits and bypasses the free-tier suspension. Add to `settings.yml` under `outgoing:`:
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
