# Roadmap: gotovalues-site

## Overview

The roadmap turns the existing gotovalues site into a clearer acquisition surface for production and processing companies. It starts with homepage positioning and trust, simplifies contact conversion, strengthens brand and product proof, then adds the focused `/dla-produkcji` route.

## Phases

**Phase Numbering:**
- Integer phases are planned milestone work.

- [x] **Phase 1: Homepage positioning and trust** - Make the homepage explain the offer and establish credible operational trust.
- [x] **Phase 2: Contact conversion** - Let visitors describe one concrete problem through a low-friction form.
- [ ] **Phase 3: Brand and product proof** - Align the brand and turn `/produkty` into useful sales proof.
- [ ] **Phase 4: Production acquisition** - Add the focused `/dla-produkcji` route for outreach.

## Phase Details

### Phase 1: Homepage positioning and trust
**Goal**: Production and processing visitors can recognize their operational problem, understand the kind of tool gotovalues builds, and trust the working style.
**Depends on**: Nothing (first phase)
**Requirements**: REQ-about-trust, REQ-homepage-positioning, REQ-homepage-conversion
**Success Criteria** (what must be TRUE):
  1. A visitor can identify who gotovalues helps and what kind of operational problem it addresses from the hero and offer sections.
  2. The homepage presents Tomasz Gołaszewski and relevant process experience in a concise About section.
  3. Hero, proof, About, contact, and form copy lead to one concrete process conversation without unsupported claims.
**Plans**: 2/2 plans executed
Plans:
- [x] 01-01-PLAN.md — Problem-first hero, oferta, proof i krótkie About
- [x] 01-02-PLAN.md — Spójna ścieżka kontaktu, CTA i dostępne statusy
**UI hint**: yes

### Phase 2: Contact conversion
**Goal**: A visitor can send a useful problem description with minimal effort and receives clear feedback.
**Depends on**: Phase 1
**Requirements**: REQ-contact-form-friction
**Success Criteria** (what must be TRUE):
  1. The form visibly asks for first name, email, optional company, and one main message.
  2. The submitted payload and generated email contain the readable visitor context required by the contact flow.
  3. Success and helper copy explain what happens after submission, and validation errors remain understandable.
**Plans**: 2/2 plans executed
Plans:
- [x] 02-01-PLAN.md — Czteropolowy kontrakt kontaktu i zachowane zabezpieczenia
- [x] 02-02-PLAN.md — Spójny, dostępny formularz i statusy konwersji
**UI hint**: yes

### Phase 3: Brand and product proof
**Goal**: Buyers evaluating gotovalues see a consistent lowercase brand and concrete evidence of product capabilities.
**Depends on**: Phase 1
**Requirements**: REQ-brand-products, REQ-products-proof
**Success Criteria** (what must be TRUE):
  1. Active public brand strings, metadata, and mail references use lowercase gotovalues consistently.
  2. `/produkty` explains why the page exists and connects public and private examples to business capabilities.
  3. The products page has calmer hierarchy, readable contrast, and product cards that carry the visual proof.
**Plans**: 2 plans
Plans:
- [ ] 03-01-PLAN.md — Ujednolicenie marki i skrócenie aktywnych treści
- [ ] 03-02-PLAN.md — Jedna spokojna siatka proof produktów na homepage
**UI hint**: yes

### Phase 4: Production acquisition
**Goal**: A cold-outreach visitor can understand production-specific use cases and take one small next step.
**Depends on**: Phases 1–3
**Requirements**: REQ-production-landing
**Success Criteria** (what must be TRUE):
  1. `/dla-produkcji` names document, quality, and exception-workflow symptoms that production visitors recognize.
  2. The page presents focused tools and honest proof without implying ERP replacement.
  3. The page explains a small first step and offers one short-contact CTA.
**Plans**: TBD
**UI hint**: yes

## Progress

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 1. Homepage positioning and trust | 2/2 | Complete | 2026-11-26 |
| 2. Contact conversion | 2/2 | Complete | 2026-11-26 |
| 3. Brand and product proof | 0/TBD | Not started | - |
| 4. Production acquisition | 0/TBD | Not started | - |
