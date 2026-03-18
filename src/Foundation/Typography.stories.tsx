import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'

// ─── Data ─────────────────────────────────────────────────────────────────────

const WEIGHTS = [
  { label: 'Regular',   value: 400 },
  { label: 'Medium',    value: 500 },
  { label: 'SemiBold',  value: 600 },
  { label: 'Bold',      value: 700 },
  { label: 'ExtraBold', value: 800 },
  { label: 'Black',     value: 900 },
  { label: 'Ultra',     value: 950 },
]

const HEADINGS = [
  { name: 'display',  label: 'Display', size: '112px', weight: '700 — Bold',  sample: 'Murfy' },
  { name: 'h1',       label: 'H1',      size: '61px',  weight: '900 — Black', sample: 'Réparez, ne remplacez pas' },
  { name: 'h2',       label: 'H2',      size: '46px',  weight: '700 — Bold',  sample: 'Nos services de réparation' },
  { name: 'h3',       label: 'H3',      size: '32px',  weight: '700 — Bold',  sample: 'Réparation à domicile' },
  { name: 'h4',       label: 'H4',      size: '24px',  weight: '700 — Bold',  sample: 'Lave-linge, sèche-linge, lave-vaisselle' },
  { name: 'h5',       label: 'H5',      size: '20px',  weight: '700 — Bold',  sample: 'Prise en charge rapide et efficace' },
  { name: 'h6',       label: 'H6',      size: '18px',  weight: '700 — Bold',  sample: 'Techniciens certifiés et expérimentés' },
]

const BODY = [
  { name: 'text-large',          label: 'Large',           size: '20px', weight: '400 — Regular',   sample: 'Nous réparons vos appareils électroménagers à domicile.' },
  { name: 'text-main',           label: 'Main',            size: '18px', weight: '400 — Regular',   sample: 'Prenez rendez-vous en ligne en quelques clics. Un technicien se déplace chez vous.' },
  { name: 'text-small',          label: 'Small',           size: '16px', weight: '400 — Regular',   sample: 'Réparation garantie 6 mois. Pièces d\'origine constructeur.' },
  { name: 'text-xsmall',         label: 'XSmall',          size: '14px', weight: '400 — Regular',   sample: 'Mentions légales · Politique de confidentialité · CGV' },
  { name: 'text-large-semibold', label: 'Large Semibold',  size: '20px', weight: '600 — SemiBold',  sample: 'Nous réparons vos appareils électroménagers à domicile.' },
  { name: 'text-main-semibold',  label: 'Main Semibold',   size: '18px', weight: '600 — SemiBold',  sample: 'Prenez rendez-vous en ligne en quelques clics.' },
  { name: 'text-small-semibold', label: 'Small Semibold',  size: '16px', weight: '600 — SemiBold',  sample: 'Réparation garantie 6 mois. Pièces d\'origine constructeur.' },
  { name: 'text-xsmall-semibold',label: 'XSmall Semibold', size: '14px', weight: '600 — SemiBold',  sample: 'Techniciens certifiés et expérimentés' },
  { name: 'label',               label: 'Label',           size: '12px', weight: '600 — SemiBold',  sample: 'SECTION LABEL · FORM FIELD · BADGE TEXT', letterSpacing: '0.08em', uppercase: true },
]

// ─── Row component ─────────────────────────────────────────────────────────────

function TypeRow({ name, label, size, weight, sample, letterSpacing, uppercase }: {
  name: string
  label: string
  size: string
  weight: string
  sample: string
  letterSpacing?: string
  uppercase?: boolean
}) {
  const isHeading = name.startsWith('h') || name === 'display'
  return (
    <div
      className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-4 py-5 border-t"
      style={{ borderColor: 'var(--border)', opacity: 1 }}
    >
      <div className="pt-1">
        <div className="text-xs font-semibold" style={{ color: 'var(--text)' }}>{label}</div>
        <div className="text-xs opacity-50 mt-0.5" style={{ color: 'var(--text)' }}>{size}</div>
        <div className="text-xs opacity-50" style={{ color: 'var(--text)' }}>{weight}</div>
        {letterSpacing && (
          <div className="text-xs opacity-50" style={{ color: 'var(--text)' }}>ls: {letterSpacing}</div>
        )}
        <code
          className="text-[10px] mt-1.5 inline-block px-1.5 py-0.5 rounded"
          style={{ backgroundColor: 'var(--bg-2)', color: 'var(--text)', opacity: 0.7 }}
        >
          var(--font-size-{name})
        </code>
      </div>
      <div
        style={{
          fontSize: `var(--font-size-${name})`,
          fontWeight: `var(--font-weight-${name})`,
          lineHeight: `var(--line-height-${name})`,
          letterSpacing: isHeading ? '-0.05em' : letterSpacing,
          textTransform: uppercase ? 'uppercase' : undefined,
          color: 'var(--text)',
          fontFamily: '"Murfy A2", sans-serif',
        }}
      >
        {sample}
      </div>
    </div>
  )
}

// ─── Page ──────────────────────────────────────────────────────────────────────

function TypographyPage() {
  return (
    <div className="p-8 max-w-5xl">

      {/* Intro */}
      <div
        className="rounded-card p-8 mb-12"
        style={{ backgroundColor: 'var(--bg-2)' }}
      >
        <div
          className="text-xs font-semibold uppercase tracking-widest mb-3 opacity-50"
          style={{ color: 'var(--text)', letterSpacing: '0.08em' }}
        >
          Brand typeface
        </div>
        <h1
          className="mb-4"
          style={{
            fontSize: 'var(--font-size-h2)',
            fontWeight: 'var(--font-weight-h2)',
            lineHeight: 'var(--line-height-h2)',
            letterSpacing: '-0.05em',
            color: 'var(--text)',
            fontFamily: '"Murfy A2", sans-serif',
          }}
        >
          Murfy A2
        </h1>
        <p
          className="max-w-2xl mb-6"
          style={{
            fontSize: 'var(--font-size-text-main)',
            lineHeight: 'var(--line-height-text-main)',
            color: 'var(--text)',
            opacity: 0.7,
          }}
        >
          Murfy A2 is the brand's custom typeface — designed to feel modern, friendly, and confident.
          It replaces GT Walsheim Pro across all touchpoints. Use it exclusively: never substitute
          system fonts or other typefaces in brand contexts.
        </p>

        {/* Weight specimen */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {WEIGHTS.map(({ label, value }) => (
            <div
              key={label}
              className="rounded-sm p-4"
              style={{ backgroundColor: 'var(--bg)' }}
            >
              <div
                style={{
                  fontFamily: '"Murfy A2", sans-serif',
                  fontWeight: value,
                  fontSize: 'var(--font-size-h5)',
                  color: 'var(--text)',
                  lineHeight: 1.2,
                }}
              >
                Aa
              </div>
              <div className="text-xs mt-2 opacity-50" style={{ color: 'var(--text)' }}>
                {label}
              </div>
              <div className="text-xs opacity-40" style={{ color: 'var(--text)' }}>
                {value}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Headings */}
      <section className="mb-12">
        <h2
          className="text-xs font-semibold uppercase tracking-widest mb-1 opacity-50"
          style={{ color: 'var(--text)', letterSpacing: '0.08em' }}
        >
          Headings
        </h2>
        <p className="text-sm mb-6 opacity-50" style={{ color: 'var(--text)' }}>
          Tight letter-spacing (−0.05em). Bold for most scales, Black for H1 impact.
        </p>
        {HEADINGS.map(row => <TypeRow key={row.name} {...row} />)}
      </section>

      {/* Body */}
      <section>
        <h2
          className="text-xs font-semibold uppercase tracking-widest mb-1 opacity-50"
          style={{ color: 'var(--text)', letterSpacing: '0.08em' }}
        >
          Body & UI
        </h2>
        <p className="text-sm mb-6 opacity-50" style={{ color: 'var(--text)' }}>
          Regular for long-form content. Semibold for labels, nav items, emphasized copy.
          Label style adds letter-spacing for small uppercase use cases.
        </p>
        {BODY.map(row => <TypeRow key={row.name} {...row} />)}
      </section>

    </div>
  )
}

// ─── Story ────────────────────────────────────────────────────────────────────

const meta: Meta = {
  title: 'Foundation/Typography',
  parameters: { layout: 'fullscreen' },
}
export default meta

type Story = StoryObj
export const Overview: Story = {
  render: () => <TypographyPage />,
}
