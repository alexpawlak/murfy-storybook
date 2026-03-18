# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
# Storybook (primary dev environment)
npm run storybook          # Start Storybook dev server on :6006
npm run build-storybook    # Build static Storybook

# Token pipeline (run after editing tokens.json)
npm run build-tokens       # Regenerate src/styles/tokens.css from tokens.json

# App build
npm run build              # TypeScript check + Vite build
npm run dev                # Start Vite dev server
```

## Architecture

### Atomic Design Layers

- `src/Foundation/` — Design token documentation stories (Colors, Typography, Spacing, ThemePlayground)
- `src/Atoms/` — Primitive components: Button, Input, Tag, Typography
- `src/Molecules/` — Functional units combining 2–3 atoms: NavItem/NavBar, ServiceCard, PostalCodeForm, AccordionItem
- `src/Organisms/` — Self-contained sections built from molecules/atoms: Navbar, ProductCard, PricingTable, ReviewList
- `src/Templates/` — Full page layout scaffolds wiring organisms together (no real content). Pages are out of scope.

### Token Pipeline

**Source of truth:** `tokens.json` → `scripts/build-tokens.ts` → `src/styles/tokens.css`

Never edit `tokens.css` directly — it is auto-generated. Run `npm run build-tokens` after changing `tokens.json`.

Token layers in `tokens.json`:
1. **Primitives** — Raw values (`--pink-500`, `--yellow-500`, etc.) emitted to `:root`
2. **Themes** — Semantic roles per theme emitted as `[data-theme="light|dark|light-pink|pink-mist|pink-vivid"]` selectors
3. **Accents** — Per-vertical overrides emitted as `[data-accent="default|violet|yellow|fuschia"]` selectors

Token references like `{primitives.pink-500}` are resolved to `var(--pink-500)` by the build script.

### Theming System

Components are wrapped by Storybook's global decorator (`.storybook/preview.tsx`) with `data-theme` and `data-accent` attributes. Switching themes/accents in the Storybook toolbar changes all CSS variables without any code changes. Tailwind classes in `tailwind.config.js` map to these same CSS variables.

**Theme × Accent matrix**: 5 themes × 4 accents — each combination is supported by design.

### Storybook Config

- Stories discovered at: `src/Introduction.mdx`, `src/**/*.stories.@(ts|tsx)`, `src/**/*.mdx`
- Addons: essentials, a11y, interactions
- Framework: `@storybook/react-vite`

### Component Conventions

Each component lives in its own directory with:
- `ComponentName.tsx` — component + TypeScript interface
- `ComponentName.stories.tsx` — Storybook stories with `argTypes`

Components use Tailwind utility classes for layout/spacing and CSS variables (`var(--btn-bg)`, `var(--text)`, etc.) for theme-sensitive colors.

### Business Context

Murfy is an appliance repair company (électroménager) expanding into heating (chauffage) and solar (solaire). Each vertical has its own accent color. Components should adapt visually via CSS variables rather than hardcoded per-vertical code.

## Project Goal

This Storybook is the foundation for a **murfy.fr brand refresh**. The objective is to:

1. **Inventory** the components currently used on the murfy.fr website
2. **Redesign** them with the new brand identity — using the accent color system to visually unify all verticals (électroménager, chauffage, solaire) under a single coherent brand
3. **Propose** new designs in Storybook so stakeholders can review and validate before implementation on the live site

When adding or redesigning components, always consider how they behave across all accent colors — a component should feel at home whether it represents appliance repair or solar energy.

## Figma MCP Integration Rules

**Design system Figma file:** `mAUdca2csMWlBqyQI0fIVl` (`Design-system-new-claude`)

### Component map (design system page)

> Before adding a component, place it at y ≥ 3000 to avoid overlap.

| Component | y position |
|---|---|
| Accordion | 0 |
| Footer-mobile | 0 |
| Tag | 430 |
| Button | 1106 |
| VerticalSelector | 2500 |
| MurfyNavbar | 2750 |
| **Next slot** | **3000+** |

### Figma variables — skip re-fetching, use these directly

Theme vars (pass to `figma.variables.getVariableByIdAsync()`):
- `bg` → `VariableID:1:30`, `bg-2` → `VariableID:1:31`, `text` → `VariableID:1:33`
- `border` → `VariableID:1:35`, `btn-bg` → `VariableID:1:37`, `btn-text` → `VariableID:1:38`

Accent modes (use with `setExplicitVariableModeForCollection(accentCol, modeId)`):
- `fuschia` → `1:9`, `violet` → `1:7`, `yellow` → `1:8`, `default` → `1:6`

Label text style ID: `S:479da77ce6b4ab1fe07a3aea3d5ef221b582e83a,`

Always load fonts before creating text nodes:
```js
await figma.loadFontAsync({ family: 'Inter', style: 'Regular' })
await figma.loadFontAsync({ family: 'Murfy A2', style: 'SemiBold' })
```

### Vertical → accent mapping

| Vertical | data-accent | Figma mode |
|---|---|---|
| Électroménager | fuschia | `1:9` |
| Chauffage | violet | `1:7` |
| Solaire | yellow | `1:8` |

### Required workflow for every Figma-driven task

1. Call `get_design_context` with the node ID and file key from the Figma URL
2. If the response is truncated, call `get_metadata` to get the node map, then re-fetch only the needed nodes
3. Call `get_screenshot` for a visual reference of the exact node/variant being implemented
4. Only after you have both outputs: implement the component
5. Validate visually against the screenshot before marking complete

### Color & token mapping

- **IMPORTANT: Never hardcode hex colors.** Every color in Figma must map to a CSS variable from `src/styles/tokens.css`
- Theme-sensitive colors → semantic vars: `var(--bg)`, `var(--text)`, `var(--btn-bg)`, `var(--btn-text)`, `var(--border)`, `var(--heading-accent)`, etc.
- Accent/vertical colors → accent vars: `var(--accent-btn-bg)`, `var(--accent-btn-text)`, `var(--accent-accent-highlight)`, `var(--accent-accent-pill-active)`
- Raw brand colors → primitive vars: `var(--pink-500)`, `var(--yellow-500)`, etc.
- If a Figma color has no matching token, add it to `tokens.json` and run `npm run build-tokens` — do not hardcode it

### Styling rules

- Use Tailwind utility classes for layout, spacing, and typography
- Use CSS variables (via `var()`) for all theme/accent-sensitive colors — never Tailwind's built-in color palette for brand colors
- Tailwind color classes like `bg-btn-bg` are available because `tailwind.config.js` maps them to CSS vars — prefer these over inline `style={{ color: 'var(--btn-bg)' }}`
- Responsive breakpoint: `md:` is the desktop breakpoint used throughout this project

### Component placement

- Primitive/single-purpose UI → `src/Atoms/ComponentName/`
- Functional unit combining 2–3 atoms → `src/Molecules/ComponentName/`
- Self-contained section built from molecules/atoms → `src/Organisms/ComponentName/`
- Full page layout scaffold → `src/Templates/ComponentName/`
- Each directory must contain `ComponentName.tsx` and `ComponentName.stories.tsx`
- Export the component as a named export (not default)

### Storybook story requirements

Every new component must have a `.stories.tsx` file that:
- Exports a `meta` with `title` following the pattern `Atoms/Button` or `Molecules/NavBar`
- Includes `argTypes` for all variant props so the Controls panel works
- Has at least one story that exercises the accent color (uses `data-accent` switching via the toolbar)
- Does NOT hardcode a theme/accent — the global Storybook decorator handles wrapping

### Assets & icons

- Icon library: **[Iconsax](https://iconsax.io/)** — install `iconsax-react` if not already present
- Find icons first in the Figma design system (node `10:742` in file `mAUdca2csMWlBqyQI0fIVl`). If the needed icon isn't in the Figma library, look it up on iconsax.io and use the matching `iconsax-react` component
- IMPORTANT: If the Figma MCP returns a localhost URL for an image or SVG asset, use it directly — do not create placeholders
- Store any downloaded static assets in `src/assets/`

### Typography

- Font sizes and line heights are defined as CSS vars (`--text-sm`, `--text-base`, etc.) and mapped in `tailwind.config.js`
- Use the Tailwind `text-` classes that map to these vars (e.g. `text-base`, `text-lg`) rather than arbitrary values
