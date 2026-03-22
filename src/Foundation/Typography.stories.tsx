import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import tokens from '../../tokens.json'
import { DocHeader, DocSection, GuidanceGrid, AccessibilityNote } from './doc-components'

type TypographyScaleName = keyof typeof tokens.typography

type TypographyRow = {
  name: TypographyScaleName
  label: string
  sample: string
}

const WEIGHTS = [
  { label: 'Regular', value: 400 },
  { label: 'Medium', value: 500 },
  { label: 'SemiBold', value: 600 },
  { label: 'Bold', value: 700 },
  { label: 'ExtraBold', value: 800 },
  { label: 'Black', value: 900 },
  { label: 'Ultra', value: 950 },
]

const HEADING_ROWS: TypographyRow[] = [
  { name: 'display', label: 'Display', sample: 'Murfy' },
  { name: 'h1', label: 'H1', sample: 'Réparez, ne remplacez pas' },
  { name: 'h2', label: 'H2', sample: 'Nos services de réparation' },
  { name: 'h3', label: 'H3', sample: 'Réparation à domicile' },
  { name: 'h4', label: 'H4', sample: 'Lave-linge, sèche-linge, lave-vaisselle' },
  { name: 'h5', label: 'H5', sample: 'Prise en charge rapide et efficace' },
  { name: 'h6', label: 'H6', sample: 'Techniciens certifiés et expérimentés' },
]

const BODY_ROWS: TypographyRow[] = [
  { name: 'text-large', label: 'Large', sample: 'Nous réparons vos appareils électroménagers à domicile.' },
  { name: 'text-main', label: 'Main', sample: 'Prenez rendez-vous en ligne en quelques clics. Un technicien se déplace chez vous.' },
  { name: 'text-small', label: 'Small', sample: "Réparation garantie 6 mois. Pièces d'origine constructeur." },
  { name: 'text-xsmall', label: 'XSmall', sample: 'Mentions légales · Politique de confidentialité · CGV' },
  { name: 'text-large-semibold', label: 'Large Semibold', sample: 'Nous réparons vos appareils électroménagers à domicile.' },
  { name: 'text-main-semibold', label: 'Main Semibold', sample: 'Prenez rendez-vous en ligne en quelques clics.' },
  { name: 'text-small-semibold', label: 'Small Semibold', sample: "Réparation garantie 6 mois. Pièces d'origine constructeur." },
  { name: 'text-xsmall-semibold', label: 'XSmall Semibold', sample: 'Techniciens certifiés et expérimentés' },
  { name: 'label', label: 'Label', sample: 'Section label · Form field · Badge text' },
]

function getWeightLabel(value: number) {
  return WEIGHTS.find((weight) => weight.value === value)?.label ?? String(value)
}

function getTypographyModeVars(mode: 'mobile' | 'desktop') {
  return Object.entries(tokens.typography).reduce<Record<string, string>>((acc, [name, scale]) => {
    const values = scale[mode]
    acc[`--font-size-${name}`] = `${values.fontSize}px`
    acc[`--line-height-${name}`] = String(values.lineHeight)
    acc[`--font-weight-${name}`] = String(scale.fontWeight)
    acc[`--letter-spacing-${name}`] = `${scale.letterSpacing}em`
    acc[`--text-transform-${name}`] = scale.textTransform
    return acc
  }, {})
}

function TypeRow({ name, label, sample }: TypographyRow) {
  const scale = tokens.typography[name]

  return (
    <div
      className="grid grid-cols-1 gap-4 border-t py-5 md:grid-cols-[260px_1fr]"
      style={{ borderColor: 'var(--border)' }}
    >
      <div className="pt-1">
        <div className="text-text-xsmall-semibold text-text">{label}</div>
        <div className="mt-0.5 text-label text-text" style={{ opacity: 0.5 }}>
          Desktop {scale.desktop.fontSize}px / Mobile {scale.mobile.fontSize}px
        </div>
        <div className="text-label text-text" style={{ opacity: 0.5 }}>
          {scale.fontWeight} — {getWeightLabel(scale.fontWeight)}
        </div>
        <div className="text-label text-text" style={{ opacity: 0.5 }}>
          lh {scale.desktop.lineHeight} / {scale.mobile.lineHeight}
        </div>
        <div className="text-label text-text" style={{ opacity: 0.5 }}>
          ls {scale.letterSpacing}em
        </div>
        <div className="text-label text-text" style={{ opacity: 0.5 }}>
          case {scale.textTransform}
        </div>
        <code
          className="mt-1.5 inline-block rounded-[var(--radius-small)] px-1.5 py-0.5 text-label font-mono"
          style={{
            background: 'color-mix(in srgb, var(--accent-btn-bg) 10%, var(--bg))',
            color: 'var(--accent-btn-bg)',
          }}
        >
          {`--font-size-${name}`}
        </code>
      </div>
      <div
        style={{
          fontSize: `var(--font-size-${name})`,
          fontWeight: `var(--font-weight-${name})`,
          lineHeight: `var(--line-height-${name})`,
          letterSpacing: `var(--letter-spacing-${name})`,
          textTransform: `var(--text-transform-${name})` as React.CSSProperties['textTransform'],
          color: 'var(--text)',
        }}
      >
        {sample}
      </div>
    </div>
  )
}

function TypographySpecimen({ mode, widthClassName }: { mode: 'mobile' | 'desktop'; widthClassName: string }) {
  return (
    <div
      className={`rounded-[var(--radius-card)] p-6 ${widthClassName}`}
      style={{
        backgroundColor: 'var(--bg)',
        border: '1px solid var(--border)',
        boxShadow: '0 2px 16px color-mix(in srgb, var(--dark-900) 8%, transparent)',
        ...getTypographyModeVars(mode),
      } as React.CSSProperties}
    >
      <div className="text-label font-semibold text-text" style={{ opacity: 0.6 }}>
        {mode === 'mobile' ? 'Mobile specimen' : 'Desktop specimen'}
      </div>
      <div className="mt-4 text-display font-bold text-text">Murfy</div>
      <h2 className="mt-4 text-h2 font-bold text-text">Réparer plutôt que remplacer</h2>
      <p className="mt-4 text-text-main text-text" style={{ opacity: 0.8 }}>
        Une hiérarchie rapide à scanner pour vérifier la différence entre les valeurs mobiles et desktop.
      </p>
      <div className="mt-5 flex flex-wrap gap-3">
        <span
          className="text-label font-semibold text-text"
          style={{ backgroundColor: 'color-mix(in srgb, var(--accent-btn-bg) 10%, var(--bg))', borderRadius: 'var(--radius-pill)', padding: '8px 12px' }}
        >
          Type system
        </span>
        <span className="text-text-small-semibold text-text">
          {mode === 'mobile' ? '390px reference' : 'Desktop reference'}
        </span>
      </div>
    </div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

function TypographyPage() {
  return (
    <div className="min-h-screen" style={{ background: 'var(--bg)' }}>
      <DocHeader
        layer="Foundation"
        title="Typography"
        description="Murfy A2 is the brand's custom typeface. The type system is mobile-first with a desktop override at the md breakpoint. Fourteen named steps cover every use case from display headings to micro labels — only one all-caps style exists by design."
      />

      <div className="px-8 py-12 max-w-5xl">

        {/* ── Typeface ──────────────────────────────────────────────────── */}
        <DocSection
          label="Murfy A2 — Typeface"
          subtitle="The brand's custom typeface. Seven weights are available. Mobile values are the default; desktop values take over at the md breakpoint."
        >
          <div className="rounded-[var(--radius-card)] border border-border p-6 mb-6" style={{ background: 'color-mix(in srgb, var(--accent-btn-bg) 5%, var(--bg))' }}>
            <div className="grid gap-4 md:grid-cols-4">
              {WEIGHTS.map(({ label, value }) => (
                <div key={label} className="rounded-[var(--radius-small)] p-4 border border-border" style={{ background: 'var(--bg)' }}>
                  <div style={{ fontWeight: value, fontSize: 'var(--font-size-h5)', color: 'var(--text)', lineHeight: 1.2 }}>
                    Aa
                  </div>
                  <div className="mt-2 text-text-xsmall text-text" style={{ opacity: 0.6 }}>{label}</div>
                  <div className="text-label text-text" style={{ opacity: 0.4 }}>{value}</div>
                </div>
              ))}
            </div>
          </div>
        </DocSection>

        {/* ── Responsive preview ────────────────────────────────────────── */}
        <DocSection
          label="Responsive preview"
          subtitle="These specimen cards pin the typography variables to each mode so you can compare mobile and desktop side by side."
        >
          <div className="flex flex-col gap-6 xl:flex-row xl:items-start">
            <TypographySpecimen mode="mobile" widthClassName="w-full max-w-[390px]" />
            <TypographySpecimen mode="desktop" widthClassName="w-full xl:flex-1" />
          </div>
        </DocSection>

        {/* ── Headings ──────────────────────────────────────────────────── */}
        <DocSection
          label="Headings"
          subtitle="Only Display is uppercase by design. H1–H6 keep sentence case unless a component intentionally applies uppercase for a specific design purpose."
        >
          {HEADING_ROWS.map((row) => <TypeRow key={row.name} {...row} />)}
        </DocSection>

        {/* ── Body & UI ─────────────────────────────────────────────────── */}
        <DocSection
          label="Body & UI"
          subtitle="Body styles stay sentence case. Semibold variants provide emphasis without changing the scale step — prefer these over a heavier weight on the same step."
        >
          {BODY_ROWS.map((row) => <TypeRow key={row.name} {...row} />)}
        </DocSection>

        {/* ── Best Practices ────────────────────────────────────────────── */}
        <DocSection
          label="Best Practices"
          subtitle="Rules for using the type system correctly — covering class names, all-caps, and sizing."
        >
          <GuidanceGrid
            dos={[
              {
                rule: 'Use the Murfy Tailwind classes: text-h1, text-text-main, text-label, etc.',
                rationale: 'The custom classes map to CSS variables that respond to the token system. Tailwind defaults (text-sm, text-xl) bypass the system and break responsive scaling.',
              },
              {
                rule: 'Apply text-label (12px, semibold, uppercase) only for 4-word-or-fewer labels.',
                rationale: 'Word-shape recognition fails above ~28 characters of all-caps text, dropping reading speed significantly. The label style is calibrated for short identifiers only.',
                wcag: 'WCAG 2.1 AA 1.4.8',
              },
              {
                rule: 'Use the semibold variant for emphasis within body text rather than bumping the scale step.',
                rationale: 'Jumping from text-main to text-h5 for inline emphasis disrupts line height and visual flow. The semibold variant (text-main-semibold) adds emphasis without breaking the rhythm.',
              },
              {
                rule: 'Set minimum body text at text-text-xsmall (14px) for any readable content.',
                rationale: 'Text below 14px is difficult to read for users with moderate visual impairments even with 20/20 vision. It also fails WCAG minimum contrast at standard contrast ratios.',
                wcag: 'WCAG 2.1 AA 1.4.3',
              },
            ]}
            donts={[
              {
                rule: 'Do not use text-xs, text-sm, text-base, text-lg, text-xl — any Tailwind default sizes.',
                rationale: 'Tailwind default sizes do not map to the Murfy type scale. They create visual inconsistency and ignore the responsive mobile/desktop scaling system.',
              },
              {
                rule: 'Do not uppercase H1–H6 headings.',
                rationale: 'All-caps headings strip letter-shape differentiation (ascenders and descenders) which makes headings 10–14% slower to read. Headings are scanned, not read linearly — shape differentiation is essential.',
              },
              {
                rule: 'Do not set font sizes via inline styles with raw px or rem values.',
                rationale: 'Raw px/rem values bypass the token system. Use the nearest Tailwind class, or var(--font-size-h4) if a size falls between scale steps — never a raw number.',
              },
              {
                rule: 'Do not set fontFamily: "GT Walsheim Pro" or fontFamily: "Murfy A2" inline.',
                rationale: 'Murfy A2 is already the default body font. Setting it inline creates redundant overrides that may conflict when the font stack changes in the future.',
              },
            ]}
          />
        </DocSection>

        {/* ── Accessibility ─────────────────────────────────────────────── */}
        <DocSection
          label="Accessibility & WCAG"
          subtitle="Typography standards that protect readability for all users."
        >
          <div className="flex flex-col gap-4">
            <AccessibilityNote
              criterion="WCAG 2.1 AA 1.4.3 — Contrast (Minimum)"
              requirement="4.5:1 for normal text · 3:1 for large text (≥18pt or ≥14pt bold)"
              why="Body text (text-main, text-small) must achieve 4.5:1 contrast against its background. Heading text at h3 and above (large text) requires 3:1. The Murfy dark green (#0b4744) on white achieves 9.1:1 — well above both thresholds."
              href="https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum.html"
            />
            <AccessibilityNote
              criterion="WCAG 2.1 AA 1.4.12 — Text Spacing"
              requirement="Content must not be lost when letter-spacing, word-spacing, and line-height are overridden by users"
              why="Some users with dyslexia or cognitive disabilities override type spacing in their browser. Murfy's type tokens use CSS variables which allows these overrides to work correctly. Avoid overriding line-height or letter-spacing with !important — this blocks user accessibility settings."
              href="https://www.w3.org/WAI/WCAG21/Understanding/text-spacing.html"
            />
            <AccessibilityNote
              criterion="WCAG 2.1 AA 1.4.8 — Visual Presentation"
              requirement="Text blocks must not be fully justified; line length should target 80 characters or fewer"
              why="The Murfy type system uses max-w-2xl (42rem ≈ 65–72 characters at text-main) for body text containers. This is within the optimal reading range. Do not apply text-align: justify — uneven word spacing caused by full justification creates 'rivers of white' that disrupt reading flow."
              href="https://www.w3.org/WAI/WCAG21/Understanding/visual-presentation.html"
            />
          </div>
        </DocSection>

      </div>
    </div>
  )
}

const meta: Meta = {
  title: 'Foundation/Typography',
  parameters: { layout: 'fullscreen' },
}

export default meta

type Story = StoryObj

export const Overview: Story = {
  render: () => <TypographyPage />,
}
