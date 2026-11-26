---
phase: 02-contact-conversion
status: approved
date: 2026-11-26
---

# Phase 2 context

## Goal

Visitor can send a useful description of one operational problem with minimal effort and receives clear feedback.

## Decisions

- **D-01:** The first-contact form has exactly four visitor-facing inputs: `name`, `email`, optional `company`, and one main `message`; the hidden `bot_field` remains for spam protection.
- **D-02:** Remove `service`, `supportSystem`, `weeklyTicketVolume`, and `pilotInterest` end-to-end from the public form contract, server schema, email rendering, and tests. The first conversation should not feel like qualification.
- **D-03:** Keep the existing `/api/contact` endpoint, generic response shape, Zod validation, rate limiter, honeypot, escaping, and Server/Client boundaries.
- **D-04:** Use Polish, concise helper/success/error copy and the exact primary action `Napisz`; preserve visible labels, native constraints, live status, focus states, and reduced-motion behavior.

## Boundaries

- No new route, product, service taxonomy, CRM, dependency, or email provider.
- Do not expose credentials or change environment configuration.
- Phase 3 owns product proof; Phase 4 owns production-specific landing content.

## Deferred

- Any later qualification or routing fields require a separate product decision after observing contact quality.
