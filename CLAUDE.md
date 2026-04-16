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

See `src/Foundation/NamingConventions.stories.tsx` for the full naming conventions reference.

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

**Full component & token catalogue:** `.claude/FIGMA_LIBRARY.md` — read this before starting any Figma work.

> **MANDATORY:** After adding or updating any component in Figma, update `.claude/FIGMA_LIBRARY.md` with the component name, ID, position, variants, and instantiation snippet. Same rule applies when adding tokens to `tokens.json`.

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

### Reuse rules — MANDATORY before creating anything in Figma

**Before drawing any frame or shape, always ask:**

1. **Does a component already exist?** Check the component map above. If yes, use `component.createInstance()` — never recreate from scratch.
2. **Does the color exist as a variable?** All fills and strokes must use a bound Figma variable (`figma.variables.setBoundVariableForPaint`). Never pass a raw `{ r, g, b }` color for brand/theme colors.
3. **Does the spacing/radius exist as a variable?** Use Dimensions variables (`radius-pill`, `radius-card`, `radius-small`, `radius-dropdown`, `radius-section`) — never hardcode px values for these.
4. **Does the text style exist?** Use `setTextStyleIdAsync()` with an existing style ID. Never set `fontName`, `fontSize`, `fontWeight` manually on a text node unless overriding a single property on top of a style.

**All component IDs, text styles, variable IDs, and instantiation snippets are in `.claude/FIGMA_LIBRARY.md`.**

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

### Typography rules — MANDATORY

**Font family**
- `font-sans` and `font-brand` both map to Murfy Sans — it is already the default body font
- **NEVER** set `fontFamily: 'GT Walsheim Pro'` or `fontFamily: '"Murfy Sans"'` inline — it is already the default and inline overrides are redundant noise
- The only valid use of inline `fontFamily` is `monospace` for code/debug contexts

**Font size — always use the mapped Tailwind classes, never `text-sm/xs/base/lg/xl` etc.**

| Class | Size | Paired weight | Use for |
|---|---|---|---|
| `text-display` | 112px | `font-bold` | Hero display |
| `text-h1` | 61px | `font-black` | Page titles |
| `text-h2` | 46px | `font-bold` | Section titles |
| `text-h3` | 32px | `font-bold` | Sub-section titles |
| `text-h4` | 24px | `font-bold` | Card titles |
| `text-h5` | 20px | `font-bold` | Small headings |
| `text-h6` | 18px | `font-bold` | Sub-headings |
| `text-text-large` | 20px | `font-normal` | Large body |
| `text-text-main` | 18px | `font-normal` | Main body |
| `text-text-small` | 16px | `font-normal` | Small body |
| `text-text-xsmall` | 14px | `font-normal` | XSmall body |
| `text-text-large-semibold` | 20px | `font-semibold` | Emphasized large |
| `text-text-main-semibold` | 18px | `font-semibold` | Emphasized body |
| `text-text-small-semibold` | 16px | `font-semibold` | Emphasized small |
| `text-text-xsmall-semibold` | 14px | `font-semibold` | Emphasized xsmall |
| `text-label` | 12px | `font-semibold` | Labels, pills, badges (also add `uppercase tracking-[0.08em]`) |

**NEVER use:** `text-xs`, `text-sm`, `text-base`, `text-lg`, `text-xl`, `text-2xl`, `text-3xl`, `text-4xl` — these are Tailwind defaults and do **not** map to the Murfy type scale.

**NEVER use:** `style={{ fontSize: '...' }}` with raw px/rem values. Use the nearest Tailwind class above. Only exception: a Figma-specified size between scale steps — use `style={{ fontSize: 'var(--font-size-h4)' }}` with the CSS var, never a raw value.

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
