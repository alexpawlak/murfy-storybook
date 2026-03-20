import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import tokens from '../../tokens.json'

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
  { name: 'text-small', label: 'Small', sample: 'Réparation garantie 6 mois. Pièces d’origine constructeur.' },
  { name: 'text-xsmall', label: 'XSmall', sample: 'Mentions légales · Politique de confidentialité · CGV' },
  { name: 'text-large-semibold', label: 'Large Semibold', sample: 'Nous réparons vos appareils électroménagers à domicile.' },
  { name: 'text-main-semibold', label: 'Main Semibold', sample: 'Prenez rendez-vous en ligne en quelques clics.' },
  { name: 'text-small-semibold', label: 'Small Semibold', sample: 'Réparation garantie 6 mois. Pièces d’origine constructeur.' },
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
        <div className="text-xs font-semibold" style={{ color: 'var(--text)' }}>{label}</div>
        <div className="mt-0.5 text-xs opacity-50" style={{ color: 'var(--text)' }}>
          Desktop {scale.desktop.fontSize}px / Mobile {scale.mobile.fontSize}px
        </div>
        <div className="text-xs opacity-50" style={{ color: 'var(--text)' }}>
          {scale.fontWeight} — {getWeightLabel(scale.fontWeight)}
        </div>
        <div className="text-xs opacity-50" style={{ color: 'var(--text)' }}>
          lh {scale.desktop.lineHeight} / {scale.mobile.lineHeight}
        </div>
        <div className="text-xs opacity-50" style={{ color: 'var(--text)' }}>
          ls {scale.letterSpacing}em
        </div>
        <div className="text-xs opacity-50" style={{ color: 'var(--text)' }}>
          case {scale.textTransform}
        </div>
        <code
          className="mt-1.5 inline-block rounded px-1.5 py-0.5 text-[10px]"
          style={{ backgroundColor: 'var(--bg-2)', color: 'var(--text)', opacity: 0.7 }}
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
          fontFamily: 'var(--font-family-brand)',
        }}
      >
        {sample}
      </div>
    </div>
  )
}

function TypographySpecimen({
  mode,
  widthClassName,
}: {
  mode: 'mobile' | 'desktop'
  widthClassName: string
}) {
  return (
    <div
      className={`rounded-card p-6 ${widthClassName}`}
      style={{
        backgroundColor: 'var(--bg)',
        boxShadow: '0 2px 16px color-mix(in srgb, var(--dark-900) 8%, transparent)',
        ...getTypographyModeVars(mode),
      } as React.CSSProperties}
    >
      <div className="text-label font-semibold text-text-default opacity-60">
        {mode === 'mobile' ? 'Mobile specimen' : 'Desktop specimen'}
      </div>
      <div className="mt-4 text-display font-bold text-text-default">Murfy</div>
      <h2 className="mt-4 text-h2 font-bold text-text-default">Réparer plutôt que remplacer</h2>
      <p className="mt-4 text-text-main text-text-default opacity-80">
        Une hiérarchie rapide à scanner pour vérifier la différence entre les valeurs mobiles et desktop.
      </p>
      <div className="mt-5 flex flex-wrap gap-3">
        <span className="text-label font-semibold text-text-default" style={{ backgroundColor: 'var(--bg-2)', borderRadius: 'var(--radius-pill)', padding: '8px 12px' }}>
          Type system
        </span>
        <span className="text-text-small-semibold text-text-default">
          {mode === 'mobile' ? '390px reference' : 'Desktop reference'}
        </span>
      </div>
    </div>
  )
}

function TypographyPage() {
  return (
    <div className="max-w-5xl p-8">
      <div className="mb-12 rounded-card p-8" style={{ backgroundColor: 'var(--bg-2)' }}>
        <div
          className="mb-3 text-xs font-semibold uppercase tracking-widest opacity-50"
          style={{ color: 'var(--text)', letterSpacing: '0.08em' }}
        >
          Brand typeface
        </div>
        <h1 className="mb-4 text-h2 font-bold" style={{ color: 'var(--text)' }}>
          Murfy A2
        </h1>
        <p
          className="mb-6 max-w-2xl text-text-main"
          style={{ color: 'var(--text)', opacity: 0.7 }}
        >
          Murfy A2 is the brand&apos;s custom typeface. The typography system is now mobile-first in code, with a
          desktop override at the `md` breakpoint and a matching Desktop/Mobile mode strategy planned for Figma.
          Only the Display style is uppercase by system rule. `H1` to `H6` keep their normal casing unless a component
          intentionally applies uppercase for a specific design.
        </p>

        <div className="grid gap-4 md:grid-cols-4">
          {WEIGHTS.map(({ label, value }) => (
            <div
              key={label}
              className="rounded-sm p-4"
              style={{ backgroundColor: 'var(--bg)' }}
            >
              <div
                style={{
                  fontFamily: 'var(--font-family-brand)',
                  fontWeight: value,
                  fontSize: 'var(--font-size-h5)',
                  color: 'var(--text)',
                  lineHeight: 1.2,
                }}
              >
                Aa
              </div>
              <div className="mt-2 text-xs opacity-50" style={{ color: 'var(--text)' }}>
                {label}
              </div>
              <div className="text-xs opacity-40" style={{ color: 'var(--text)' }}>
                {value}
              </div>
            </div>
          ))}
        </div>
      </div>

      <section className="mb-12">
        <h2
          className="mb-1 text-xs font-semibold uppercase tracking-widest opacity-50"
          style={{ color: 'var(--text)', letterSpacing: '0.08em' }}
        >
          Responsive preview
        </h2>
        <p className="mb-6 text-sm opacity-50" style={{ color: 'var(--text)' }}>
          These specimen cards pin the typography variables to each mode so you can compare the mobile and desktop
          versions side by side in the same Storybook page.
        </p>
        <div className="flex flex-col gap-6 xl:flex-row xl:items-start">
          <TypographySpecimen mode="mobile" widthClassName="w-full max-w-[390px]" />
          <TypographySpecimen mode="desktop" widthClassName="w-full xl:flex-1" />
        </div>
      </section>

      <section className="mb-12">
        <h2
          className="mb-1 text-xs font-semibold uppercase tracking-widest opacity-50"
          style={{ color: 'var(--text)', letterSpacing: '0.08em' }}
        >
          Headings
        </h2>
        <p className="mb-6 text-sm opacity-50" style={{ color: 'var(--text)' }}>
          Only `Display` is uppercase by design. Mobile values are the default and desktop values take over from the
          `md` breakpoint so the same semantic class scales cleanly across layouts.
        </p>
        {HEADING_ROWS.map((row) => <TypeRow key={row.name} {...row} />)}
      </section>

      <section>
        <h2
          className="mb-1 text-xs font-semibold uppercase tracking-widest opacity-50"
          style={{ color: 'var(--text)', letterSpacing: '0.08em' }}
        >
          Body & UI
        </h2>
        <p className="mb-6 text-sm opacity-50" style={{ color: 'var(--text)' }}>
          Body styles stay sentence case. These tokens follow the same desktop/mobile structure so Storybook and Figma
          can share one semantic type system instead of separate scales.
        </p>
        {BODY_ROWS.map((row) => <TypeRow key={row.name} {...row} />)}
      </section>
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
