# Phase 3: Brand and product proof - Research

**Researched:** 2026-11-26
**Domain:** Next.js content, homepage product proof, metadata and crawler-facing brand copy
**Confidence:** HIGH

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions

#### Porządki marki i copy
- **D-01:** Zakres obejmuje wszystkie aktywne powierzchnie: widoczne strony, metadata, endpointy AI, stopkę, teksty mailowe i dane katalogu.
- **D-02:** Ujednolicić zapis marki do `gotovalues` małymi literami wszędzie, gdzie jest to aktywna nazwa marki.
- **D-03:** Skrócić i uprościć także opisy techniczne w endpointach AI i katalogu; zachować sens, pola, schematy i prawdziwe informacje.
- **D-04:** Usunąć przechwałki, ogólne wizje i niesprawdzone obietnice, ale nie usuwać informacji potrzebnych do zrozumienia produktu lub działania endpointu.

#### Produkty i proof
- **D-05:** Pozostawić produkty w sekcji `#produkty` na homepage; nie tworzyć osobnej strony `/produkty` w tej fazie.
- **D-06:** Cavi, Akta i prywatne wdrożenia pokazać równorzędnie w jednej siatce kart.
- **D-07:** Prywatne wdrożenia mają bardzo krótkie, anonimowe opisy; bez klienta, logo i linku. Nie rozbudowywać ich do poziomu publicznych produktów.
- **D-08:** Zachować dokładnie dwa publiczne linki produktowe: Cavi i Akta. Prywatne przykłady pozostają bez linków.

### the agent's Discretion
- Dobór konkretnych skróconych sformułowań, o ile pozostają rzeczowe i nie tworzą nowych obietnic.
- Zachowanie istniejących komponentów, schematów JSON i nazw pól, gdy ich zmiana nie jest potrzebna do usunięcia marketingowego nadmiaru.

### Deferred Ideas (OUT OF SCOPE)
None — discussion stayed within phase scope.
</user_constraints>

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|------------------|
| REQ-brand-products | Active brand strings, metadata, mail text, and public docs use lowercase gotovalues; homepage product proof uses calmer copy, stronger cards, reduced heading scale and adequate contrast. | `brandName` is already the central source; metadata, email, AI routes, footer/header and catalog seams are identifiable and testable. Existing `ProductCard`/homepage drawing styles can be tightened without a new route. |
| REQ-products-proof | Product proof explains purpose, shows public proof, describes private categories honestly and translates examples into business capabilities. | `siteContent.products`, `proofOfCompetence`, `ProductCard` and `ProofSheet` already provide public/private data and link behavior; tests enforce exactly two public URLs and unlinked private items. |
</phase_requirements>

## Summary

The phase is a content and presentation refactor inside the existing Next.js App Router, not a new product route. The current homepage renders the proof section from `siteContent.products` in `ProofSheet`; it currently gives full visual detail only to public products and renders private examples as a separate list. The locked direction is to keep the `#produkty` anchor, render public and private examples in one comparable card grid, shorten private cards to a name plus one sentence, and retain exactly the Cavi and Akta public links. [VERIFIED: src/components/home/home-sheets.tsx:129-183; src/content/site.ts:80-138]

The lowercase brand is already centralized as `brandName = "gotovalues"`, and the contact mail subject/body already consume it. The remaining work is an audit and copy pass over active metadata, JSON-LD, crawler endpoints, MCP catalog descriptions, footer/header strings and other visible route metadata. Preserve response shapes, catalog schema fields, public URLs, email escaping, and route boundaries while shortening prose. [VERIFIED: src/content/site.ts:1-1,199-256; src/app/layout.tsx:35-125; src/lib/contact.ts:1-62]

The ingested legacy design documents mention a `/produkty` route, but the current code has no `src/app/produkty` route and the user explicitly locked products to the homepage section. Planning must therefore map the requirement's “/produkty” wording to the existing `#produkty` homepage proof section rather than create a new route. [VERIFIED: src/components/home/home-sheets.tsx:135-183; src/app/page.tsx:1-40; docs/plans/2026-03-17-products-copy-design.md:1-29]

**Primary recommendation:** Make `siteContent` the source of concise brand/product copy, update every active consumer without changing schemas, and refactor `ProofSheet`/its styles into one accessible responsive grid that preserves two public links and unlinked private examples.

## Architectural Responsibility Map

| Capability | Primary Tier | Secondary Tier | Rationale |
|------------|-------------|----------------|-----------|
| Brand and product source copy | Frontend Server / Content | API / crawler routes | Typed `siteContent` is imported by homepage, metadata and AI routes; keeping copy there prevents drift. [VERIFIED: src/content/site.ts:1-290] |
| Product proof rendering | Frontend Server (SSR) | Browser / Client | `ProofSheet` and `ProductCard` render static cards; no client state is needed. [VERIFIED: src/components/home/home-sheets.tsx:129-183; src/components/product-card.tsx:1-57] |
| Metadata and JSON-LD | Frontend Server (SSR) | CDN / crawlers | `layout.tsx` exports metadata and serialized Schema.org data; preserve valid structure while changing descriptions. [VERIFIED: src/app/layout.tsx:35-125] |
| AI-readable summaries | API / Backend route handlers | Content | Route handlers serialize `siteContent.aiSummary`/offer into text or JSON; preserve keys and content types. [VERIFIED: src/app/ai.txt/route.ts:1-23; src/app/llms.txt/route.ts:1-43; src/app/ai/summary.json/route.ts:1-18; src/app/ai/service.json/route.ts:1-17] |
| MCP catalog descriptions | API / Backend | Content | `RAW_CATALOG_ITEMS` feeds a strict Zod output schema and JSON-RPC/GET routes; descriptions may shorten, schema and provenance fields must not change. [VERIFIED: src/lib/mcp/catalog-data.ts:10-88; src/lib/mcp/catalog-schema.ts:19-40] |
| Contact mail brand text | API / Backend | Content | `buildContactEmail` uses `brandName`; preserve escaping and four-field contract from Phase 2. [VERIFIED: src/lib/contact.ts:16-48] |

## Standard Stack

### Core

| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| Next.js | `16.4.6` | App Router pages, metadata and route handlers | Existing application framework; no replacement is needed. [VERIFIED: package.json:18-29] |
| React | `19.3.1` | Server-rendered homepage and card components | Existing UI runtime; proof is static and should remain server-rendered. [VERIFIED: package.json:24-29] |
| TypeScript | `6.0.3` | Typed `siteContent`, product cards and route contracts | Existing strict content/domain layer. [VERIFIED: package.json:39-56] |
| Zod | `^4.6.7` | MCP output schema and contact validation | Existing schema boundary; no new validation library is required. [VERIFIED: package.json:28-29; src/lib/mcp/catalog-schema.ts:19-40] |

### Supporting

| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| `next/image` | Next.js 16.4.6 | Product screenshot rendering and sizing | Keep existing image dimensions, alt text and responsive `sizes` in proof cards. [VERIFIED: src/components/home/home-sheets.tsx:147-154; src/components/product-card.tsx:27-35] |
| `clsx` | `^2.1.1` | Conditional product-card classes | Reuse existing `ProductCard` styling rather than adding a parallel card abstraction. [VERIFIED: package.json:21-24; src/components/product-card.tsx:1-19] |

**Installation:** None. This phase adds no packages; use the installed stack.

## Architecture Patterns

### System Architecture Diagram

```text
typed siteContent.brand/products/aiSummary/offer
        ├──> homepage ProofSheet (#produkty) ──> responsive product proof cards
        ├──> RootLayout metadata + JSON-LD
        ├──> ai.txt / llms.txt / summary.json / service.json
        ├──> MCP catalog data ──> Zod schema ──> GET/JSON-RPC output
        └──> buildContactEmail ──> escaped Resend text/HTML
```

### Pattern 1: Content-first brand and product copy

**What:** Keep user-facing product summaries, impact text, URLs and screenshot metadata in `siteContent.products`; keep `brandName` as the active brand source. [VERIFIED: src/content/site.ts:1-25,80-138]

**When to use:** Any copy change shared by homepage, metadata or crawler-facing output. Prefer changing the source object over duplicating strings in route components.

**Example:**

```typescript
export const brandName = "gotovalues";
// ProductCard consumes category, summary, stack, impact, optional url and screenshot.
```

### Pattern 2: Public/private link boundary

**What:** Public products carry external `url` values; private product records omit `url`, causing `ProductCard` to render an `<article>` instead of an anchor. [VERIFIED: src/content/site.ts:80-138; src/components/product-card.tsx:12-20]

**When to use:** Preserve the exact two public URLs and never add links, client names or logos to private records.

### Pattern 3: Contract-preserving route output

**What:** AI routes and MCP catalog serialize source content while retaining response keys/content types. `catalogToolOutputSchema` requires `items`, integer `total`, literal publisher `gotovalues` and a URL methodology field. [VERIFIED: src/app/ai/summary.json/route.ts:4-17; src/app/ai/service.json/route.ts:4-16; src/lib/mcp/catalog-schema.ts:35-40]

**When to use:** Shorten descriptions only. Do not rename JSON keys, remove catalog provenance fields, change enum values, or change text/plain vs JSON response headers.

### Anti-Patterns to Avoid

- **Adding `/produkty` despite the locked scope:** the current site uses `#produkty`; a new route would expand architecture and contradict D-05. [VERIFIED: src/app/page.tsx:1-40; src/components/home/home-sheets.tsx:135-183]
- **Blind global replacement:** URLs such as `cavi.gotova.pl`, `akta.gotova.pl` and archived assets are product/domain identifiers, not active brand casing. Audit each occurrence before changing it.
- **Changing schemas while shortening copy:** keep AI/MCP response shapes and Zod enums stable; only edit descriptions and source strings.
- **Making private proof look public:** no links, customer names, logos or unsupported outcome claims.
- **Creating a second card system:** reuse `ProductCard` styles and existing `ProofSheet` classes; do not duplicate product models.

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Product card rendering | A second product-card component or ad hoc card markup | Existing `ProductCard` and `ProductCard` type | Existing component already handles public/private anchor behavior, image rendering, focus and labels. [VERIFIED: src/components/product-card.tsx:1-57] |
| Brand duplication | Per-route brand constants | `brandName` from `src/content/site.ts` | Prevents metadata/mail/footer drift. [VERIFIED: src/content/site.ts:1-1; src/app/layout.tsx:35-38; src/lib/contact.ts:1-3] |
| Catalog validation | Manual output checks or a new schema | Existing `catalogToolOutputSchema` and `catalogItemSchema` | MCP tests rely on strict provenance and URL fields. [VERIFIED: src/lib/mcp/catalog-schema.ts:19-40] |
| HTML escaping | New mail formatter | Existing `escapeHtml` path in `buildContactEmail` | Prevents regressions at an input boundary. [VERIFIED: src/lib/contact.ts:36-62] |

## Runtime State Inventory

| Category | Items Found | Action Required |
|----------|-------------|------------------|
| Stored data | No database/storage migrations are referenced by the active app; this phase changes static source content only. [VERIFIED: src/app src/lib package.json] | None; code/content edit only. |
| Live service config | No live-service configuration for the display brand was found in tracked source; Vercel/Resend display-name settings are outside the repository and must not be guessed. [ASSUMED] | Do not edit external dashboards from this phase; if a sender display name is configured externally, verify separately before changing it. |
| OS-registered state | No systemd, launchd, Task Scheduler or pm2 registrations are part of this repository. [VERIFIED: repository file inventory] | None. |
| Secrets/env vars | `.env*` values are not read or copied; contact secrets and provider keys remain unchanged. [VERIFIED: AGENTS.md zero-secrets rule; src/lib/contact.ts:1-3] | None; never write secret values to docs or tests. |
| Build artifacts / installed packages | `.next` and generated caches are build artifacts; no package rename is required. [VERIFIED: package.json:1-56; repository inventory] | Run tests/lint/build; do not commit generated output. |

## Common Pitfalls

### Pitfall 1: Requirement wording drifts from locked scope
**What goes wrong:** A planner creates `/produkty` because legacy documents mention it, despite the user locking products to `#produkty`.
**Why it happens:** Ingested plans predate the current homepage architecture and use a route that does not exist.
**How to avoid:** Treat `03-CONTEXT.md` D-05 as authoritative; map `/produkty` requirement language to the homepage proof anchor and update tests accordingly.
**Warning signs:** A new `src/app/produkty/page.tsx` appears in the plan or route list.

### Pitfall 2: Over-shortening machine-readable output
**What goes wrong:** AI clients lose enough context to understand services/products, or JSON/schema fields change.
**Why it happens:** “Shorten technical descriptions” is mistaken for “remove fields.”
**How to avoid:** Keep response keys, enum values, URLs and categories; shorten only prose descriptions and labels, then run endpoint/schema tests.
**Warning signs:** `tests/ai-endpoints.test.ts` or `tests/mcp-catalog.test.ts` failures, changed content types, or missing `connected_to_publisher`.

### Pitfall 3: Public/private proof boundary breaks
**What goes wrong:** A private implementation receives a link or customer-identifying copy, or public product count changes.
**Why it happens:** A shared grid is implemented by adding URLs to every card or by duplicating records.
**How to avoid:** Preserve `category`, omit private `url`, assert exactly two public URLs, and add tests for one-grid rendering plus unlinked private examples.
**Warning signs:** `ProductCard` renders private items as anchors or `siteContent.products.public.length !== 2`.

### Pitfall 4: Brand casing replacement damages identifiers
**What goes wrong:** Domain URLs, asset filenames or product names are changed along with display text.
**Why it happens:** A global search/replace treats `gotova` in product domains and `Archiwa Gotova` as active brand copy.
**How to avoid:** Change active display text and metadata only; leave product/domain identifiers unless separately verified.
**Warning signs:** Cavi/Akta URLs or screenshot paths change unexpectedly.

## Code Examples

### Preserve catalog output shape while shortening descriptions

```typescript
return {
  items,
  total: items.length,
  publisher: "gotovalues",
  methodology_url: METHODOLOGY_URL,
};
```

Source: `src/lib/mcp/catalog-data.ts:136-141` [VERIFIED: source read this session].

### Preserve public/private card behavior

```typescript
const hasUrl = 'url' in product && product.url;
const Wrapper: ElementType = hasUrl ? 'a' : 'article';
```

Source: `src/components/product-card.tsx:12-19` [VERIFIED: source read this session].

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|-------------|--------|
| Separate editorial `/produkty` plan in legacy docs | Existing homepage `#produkty` proof section | Phase 3 discussion, 2026-11-26 | Keep implementation within current route architecture. |
| Long technical/marketing descriptions | Short, problem-first source copy with stable machine contracts | Phase 1–3 decisions | Human and crawler readers get the same concise truth without schema drift. |

## Assumptions Log

| # | Claim | Section | Risk if Wrong |
|---|-------|---------|---------------|
| A1 | External Resend/Vercel sender display-name configuration is not tracked in this repository. | Runtime State Inventory | A production sender label may require a separate manual configuration change. |
| A2 | Legacy documents' `/produkty` references are superseded by the user-locked homepage-only scope. | Summary / pitfalls | If a real route is later required, it belongs in a separate roadmap decision. |

## Open Questions

None blocking planning. The homepage-only product location and two-link public/private boundary are locked in `03-CONTEXT.md`.

## Environment Availability

This phase is code/config-only and adds no external dependency. Existing Node, pnpm, Next.js, TypeScript and test tooling are available through the repository scripts. [VERIFIED: package.json:5-16,18-56]

## Validation Architecture

### Test Framework
| Property | Value |
|----------|-------|
| Framework | Node test runner via `tsx --test` |
| Config file | None — scripts are defined in `package.json` |
| Quick run command | `npx tsx --test tests/site-content.test.ts tests/seo.test.ts tests/ai-endpoints.test.ts tests/mcp-catalog.test.ts tests/contact.test.ts` |
| Full suite command | `npx tsx --test tests/*.test.ts tests/*.test.tsx` |

### Phase Requirements → Test Map
| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|-------------|
| REQ-brand-products | Lowercase brand and concise product/metadata/AI/catalog/mail output while preserving contracts | unit/integration | `npx tsx --test tests/site-content.test.ts tests/seo.test.ts tests/ai-endpoints.test.ts tests/mcp-catalog.test.ts tests/contact.test.ts` | ✅ existing; extend assertions |
| REQ-products-proof | Exactly two public links, private cards unlinked/anonymous, homepage proof grid renders all categories | unit/component | `npx tsx --test tests/site-content.test.ts tests/homepage-copy.test.tsx tests/product-card.test.tsx` | ✅ existing; extend assertions |

### Sampling Rate
- **Per task commit:** `npx tsx --test tests/site-content.test.ts tests/seo.test.ts tests/ai-endpoints.test.ts tests/mcp-catalog.test.ts tests/contact.test.ts`
- **Per wave merge:** `npx tsx --test tests/*.test.ts tests/*.test.tsx`
- **Phase gate:** Full suite, `pnpm lint`, `pnpm build`, and `git diff --check` green before verification.

### Wave 0 Gaps
- [ ] Add/extend tests for all active brand surfaces and exact short-copy invariants.
- [ ] Add/extend homepage proof render tests asserting one grid contains public and private items, with only Cavi/Akta links.

## Security Domain

### Applicable ASVS Categories

| ASVS Category | Applies | Standard Control |
|---------------|---------|-----------------|
| V2 Authentication | no | No authentication changes in this static content phase. |
| V3 Session Management | no | No session changes. |
| V4 Access Control | yes | Preserve public/private link boundary; do not expose private customer identity or URLs. |
| V5 Input Validation | yes | Preserve Zod contact schema and escaped email rendering; this phase must not alter input handling. |
| V6 Cryptography | no | No cryptography changes. |

### Known Threat Patterns for Next.js content and crawler surfaces

| Pattern | STRIDE | Standard Mitigation |
|---------|--------|---------------------|
| Private proof accidentally linked or identified | Information disclosure | Keep private items without `url`, names and logos; test anchor/article behavior. |
| User-controlled contact text altered while editing brand mail copy | Tampering / disclosure | Leave `buildContactEmail` escaping and schema untouched; run contact regression tests. |
| JSON/MCP contract drift | Tampering / repudiation | Preserve Zod schema, literal publisher, provenance flags and endpoint content types. |
| Unescaped metadata/JSON-LD copy | Injection | Keep existing JSON-LD escaping in `layout.tsx`; only insert static reviewed strings. |

## Project Constraints (from AGENTS.md)

- Use lowercase `gotovalues` in Polish marketing copy; exactly two public linked products: Cavi and Akta.
- Keep Next.js 16 App Router routes under `src/app/`, server components by default, and client components only for interactive leaves.
- Preserve unrelated working-tree changes; do not use destructive reset/clean commands.
- Never write secrets, API keys, tokens or `.env` contents to repository or Obsidian vault.
- After changes run `npx tsx --test tests/*.test.ts tests/*.test.tsx` and `pnpm lint`; build verification is also required by phase plans.

## Sources

### Primary (HIGH confidence)
- `src/content/site.ts:1-290` — brand, products, proof, metadata source values read this session.
- `src/components/home/home-sheets.tsx:129-183` — current homepage proof rendering.
- `src/components/product-card.tsx:1-57` — public/private card behavior and image/accessibility pattern.
- `src/app/layout.tsx:35-125` — metadata and JSON-LD.
- `src/app/ai.txt/route.ts:1-23`, `src/app/llms.txt/route.ts:1-43`, `src/app/ai/summary.json/route.ts:1-18`, `src/app/ai/service.json/route.ts:1-17` — crawler surfaces.
- `src/lib/mcp/catalog-data.ts:1-141`, `src/lib/mcp/catalog-schema.ts:1-89` — catalog records and strict schema.
- `src/lib/contact.ts:1-62` — mail subject/body, schema and escaping.
- `tests/site-content.test.ts:1-112`, `tests/seo.test.ts:1-88`, `tests/ai-endpoints.test.ts:1-35`, `tests/mcp-catalog.test.ts:1-120`, `tests/contact.test.ts:1-130` — current regression contracts.
- `package.json:1-56` — versions and verification scripts.
- `AGENTS.md` — project constraints and security rules.

### Secondary (MEDIUM confidence)
- `docs/plans/2026-03-17-gotovalues-brand-products-design.md` — approved historic brand/product direction; partially superseded by current phase context because it assumes `/produkty`.
- `docs/plans/2026-03-17-products-copy-design.md` — historic proof narrative; use only where compatible with homepage-only scope.

### Tertiary (LOW confidence)
- None.

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH — package versions and scripts read directly.
- Architecture: HIGH — current source and tests read directly.
- Pitfalls: HIGH — derived from locked decisions, source boundaries and regression tests.

**Research date:** 2026-11-26
**Valid until:** 2026-12-26 for stable repository architecture; recheck copy if roadmap decisions change.
