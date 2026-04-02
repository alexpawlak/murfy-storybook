# Doc Page Template

This file is the canonical spec for all Storybook documentation pages in this design system.
Follow it when adding new stories or updating existing ones.

---

## Purpose

Every page must answer three questions:
1. **What is this?** — description + visual showcase
2. **How do I use it correctly?** — do/don't guidance with rationale
3. **Why does this rule exist?** — WCAG rationale, accessibility impact, business case

Audience: UX/UI designers and brand people — not necessarily developers.

---

## Section order (mandatory)

```
1. DocHeader          ← layer badge + title + 1–2 sentence description
2. DocSection: SHOWCASE         ← all major variants/states rendered visually
3. DocSection: BEST PRACTICES   ← GuidanceGrid (do/don't + rationale + WCAG badge)
4. DocSection: ACCESSIBILITY    ← one or more AccessibilityNote blocks
5. DocSection: PLAYGROUND       ← live argTypes controls (interactive components only)
```

---

## Shared components

All components are exported from `src/Foundation/doc-components/index.ts`.

### `<DocHeader>`
```tsx
<DocHeader
  layer="Foundation"          // 'Foundation' | 'Atoms' | 'Molecules' | 'Organisms' | 'Templates'
  title="Spacing & Radius"
  description="The spatial vocabulary of the Murfy design system…"
  icon={<SomeIcon size={20} />}  // optional — Iconsax icon
/>
```

### `<DocSection>`
```tsx
<DocSection
  label="SHOWCASE"            // rendered uppercase, muted
  subtitle="Optional subtitle explaining the section in plain language."
>
  {/* content */}
</DocSection>
```

### `<GuidanceGrid>`
```tsx
<GuidanceGrid
  dos={[
    {
      rule: 'Use radius-pill for interactive tags and filter chips.',
      rationale: 'The pill shape creates a clear visual distinction from rectangular card containers, helping users identify clickable elements at a glance.',
      wcag: 'WCAG 2.5.3 Label in Name',  // optional
    },
  ]}
  donts={[
    {
      rule: 'Do not hardcode raw px values for border radius.',
      rationale: 'Hardcoded values break the token contract — if the design system updates a radius, hardcoded values are missed and the UI diverges silently.',
    },
  ]}
/>
```

### `<AccessibilityNote>`
```tsx
<AccessibilityNote
  criterion="WCAG 2.1 AA 1.4.3"               // string or string[]
  requirement="4.5:1 contrast for normal text"
  why="Users with low vision, or anyone in bright outdoor conditions, need sufficient contrast to read body text comfortably. A 4.5:1 ratio is the minimum — higher is always better."
  href="https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum.html"  // optional
/>
```

### `<ContrastBadge>` (Colors and Typography pages)
```tsx
<ContrastBadge
  bg="pink-500"
  bgColor="#f59bbb"
  fg="brand-text"
  fgColor="#0D4743"
  ratio="4.7:1"
  rating="AA"          // 'AAA' | 'AA' | 'AA ⚠' | 'Fail'
  context="Primary button, light theme"  // optional
/>
```

---

## Typography in doc pages

| Element               | Class                                               |
|-----------------------|-----------------------------------------------------|
| Section label         | `text-label uppercase tracking-[0.08em] font-semibold` + opacity 0.45 |
| Page title (DocHeader)| `text-h2 font-bold`                                 |
| Description           | `text-text-main`                                    |
| Do/don't rule text    | `text-text-small-semibold`                          |
| Rationale text        | `text-text-xsmall` + opacity 0.6                    |
| WCAG criterion badge  | `text-label font-mono` (inside `<code>`)            |

---

## Color rules

- Page background: `var(--bg)`
- Section cards/tables: `var(--surface)` or `var(--bg)` with `var(--border)` border
- Accessibility callout tint: `color-mix(in srgb, var(--accent-btn-bg) 8%, var(--bg))`
- Do item background: `color-mix(in srgb, #22c55e 4%, var(--bg))`
- Don't item background: `color-mix(in srgb, #ef4444 4%, var(--bg))`
- Token code chips: `color-mix(in srgb, var(--accent-btn-bg) 12%, var(--bg))` background, `var(--accent-btn-bg)` text

---

## Layout

The main page wrapper:
```tsx
<div className="min-h-screen" style={{ background: 'var(--bg)' }}>
  <DocHeader ... />
  <div className="px-8 py-12 max-w-5xl mx-auto space-y-0">
    <DocSection label="SHOWCASE" ...>...</DocSection>
    <DocSection label="BEST PRACTICES" ...>...</DocSection>
    <DocSection label="ACCESSIBILITY & WCAG" ...>...</DocSection>
    {/* Playground: only for interactive components */}
    <DocSection label="PLAYGROUND" ...>...</DocSection>
  </div>
</div>
```

---

## Checklist for new/updated stories

- [ ] `DocHeader` with correct layer, title, description
- [ ] `DocSection: SHOWCASE` — all variants/states visible
- [ ] `DocSection: BEST PRACTICES` — 2–4 do/don't pairs, each with `rationale`
- [ ] `DocSection: ACCESSIBILITY` — at least one `AccessibilityNote`
- [ ] WCAG criterion linked where applicable
- [ ] No hardcoded hex colors (use CSS vars / Tailwind token classes)
- [ ] No `text-xs/sm/base/lg/xl/2xl/3xl/4xl` — use Murfy type scale classes
- [ ] Theme switching tested (light, dark, pink-vivid)
- [ ] Accent switching tested for interactive components
