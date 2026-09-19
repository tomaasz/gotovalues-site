---
name: tailwind-hermes-ui
description: Design tokens and component styling guidelines using Tailwind CSS v4 and @hermes/ui.
---

# Tailwind CSS v4 & Hermes UI in gotovalues-site

This skill provides guidelines on styling and UI component architecture in `gotovalues-site`.

## Setup & Packages

The project uses a pnpm workspace monorepo with Hermes design packages:
- `packages/design-tokens`: Shared color tokens, spacing, typography scales.
- `packages/ui`: Shared reusable UI components.
- `src/components/ui`: Project-local UI primitives.

## Styling Rules

1. **Tailwind CSS v4:**
   - Styles are defined in `src/app/globals.css`.
   - Use utility classes cleanly. Use `clsx` (and `cn` helper if defined) for conditional classes.
   - Avoid ad-hoc inline styles or custom hex codes when design token utilities exist.

2. **Visual Style & Themes:**
   - Dark, modern aesthetic: Zinc/neutral backgrounds (`bg-zinc-950`, `bg-zinc-900`), emerald/amber accents, subtle glowing radial gradients.
   - Glassmorphism: backdrop blur (`backdrop-blur-md`, `bg-zinc-900/50`, `border-zinc-800/80`).
   - Clean micro-interactions: smooth transitions (`transition-colors`, `hover:border-zinc-700`).

3. **Accessibility (a11y):**
   - Ensure sufficient color contrast for text on dark backgrounds.
   - Interactive elements must have clear focus rings (`focus-visible:ring-2 focus-visible:ring-emerald-500`).
   - Form inputs must have connected labels or `aria-label`.
   - Loading states and feedback messages must use `aria-live="polite"` regions.

