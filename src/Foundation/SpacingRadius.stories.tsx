import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'

// ─── Data ─────────────────────────────────────────────────────────────────────

const radii = [
  {
    name: 'radius-pill',
    label: 'Pill',
    value: '9999px',
    cssVar: '--radius-pill',
    usage: 'Tags, badges, filter chips, status indicators',
    tailwind: 'rounded-[var(--radius-pill)]',
  },
  {
    name: 'radius-section',
    label: 'Section',
    value: '48px',
    cssVar: '--radius-section',
    usage: 'Hero sections, full-bleed feature blocks, large card panels',
    tailwind: 'rounded-[var(--radius-section)]',
  },
  {
    name: 'radius-card',
    label: 'Card',
    value: '24px',
    cssVar: '--radius-card',
    usage: 'Product cards, service cards, review cards, pricing tiles',
    tailwind: 'rounded-[var(--radius-card)]',
  },
  {
    name: 'radius-dropdown',
    label: 'Dropdown',
    value: '16px',
    cssVar: '--radius-dropdown',
    usage: 'Dropdown menus, popovers, tooltips, select panels',
    tailwind: 'rounded-[var(--radius-dropdown)]',
  },
  {
    name: 'radius-small',
    label: 'Small',
    value: '8px',
    cssVar: '--radius-small',
    usage: 'Inputs, buttons, small UI controls, inline highlights',
    tailwind: 'rounded-[var(--radius-small)]',
  },
]

const spacingTokens = [
  {
    name: 'spacing-section-y-mobile',
    label: 'Section Y — Mobile',
    value: 64,
    cssVar: '--spacing-section-y-mobile',
    usage: 'Top/bottom padding of every full-width section on mobile screens (<md)',
  },
  {
    name: 'spacing-section-y-desktop',
    label: 'Section Y — Desktop',
    value: 112,
    cssVar: '--spacing-section-y-desktop',
    usage: 'Top/bottom padding of every full-width section on desktop (md+)',
  },
]

// ─── Helpers ──────────────────────────────────────────────────────────────────

function SectionHeader({ label, description }: { label: string; description: string }) {
  return (
    <div className="mb-8">
      <h2 className="text-h4 font-bold text-text mb-1">{label}</h2>
      <p className="text-text-small text-text max-w-2xl" style={{ opacity: 0.6 }}>{description}</p>
    </div>
  )
}

function Divider() {
  return <hr className="border-border my-12" />
}

function Token({ children }: { children: React.ReactNode }) {
  return (
    <code
      className="text-text-xsmall font-mono px-1.5 py-0.5 rounded-[var(--radius-small)]"
      style={{
        background: 'color-mix(in srgb, var(--accent-btn-bg) 12%, var(--bg))',
        color: 'var(--accent-btn-bg)',
      }}
    >
      {children}
    </code>
  )
}

// ─── Radius Section ───────────────────────────────────────────────────────────

function RadiusSection() {
  return (
    <section>
      <SectionHeader
        label="Border Radius"
        description="Five named radius tokens cover every shape in the Murfy UI. Always reference a token — never use a raw px value. Tokens are consumed via CSS variable or the corresponding Tailwind utility."
      />

      {/* Visual showcase */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-6 mb-10">
        {radii.map(({ label, value, cssVar }) => (
          <div key={label} className="flex flex-col items-center gap-3">
            <div
              className="w-20 h-20"
              style={{
                borderRadius: `var(${cssVar})`,
                background: 'var(--accent-btn-bg)',
                opacity: 0.9,
              }}
            />
            <div className="text-center">
              <p className="text-text-small-semibold text-text">{label}</p>
              <p className="text-text-xsmall font-mono" style={{ color: 'var(--text)', opacity: 0.5 }}>{value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Detailed table */}
      <div className="rounded-[var(--radius-card)] border border-border overflow-hidden">
        <table className="w-full text-left text-text-small">
          <thead>
            <tr className="border-b border-border" style={{ background: 'var(--bg)', opacity: 1 }}>
              <th className="px-5 py-3 text-text-xsmall-semibold uppercase tracking-[0.08em] text-text" style={{ opacity: 0.5 }}>Token</th>
              <th className="px-5 py-3 text-text-xsmall-semibold uppercase tracking-[0.08em] text-text" style={{ opacity: 0.5 }}>Value</th>
              <th className="px-5 py-3 text-text-xsmall-semibold uppercase tracking-[0.08em] text-text" style={{ opacity: 0.5 }}>Preview</th>
              <th className="px-5 py-3 text-text-xsmall-semibold uppercase tracking-[0.08em] text-text" style={{ opacity: 0.5 }}>Used for</th>
            </tr>
          </thead>
          <tbody>
            {radii.map(({ name, label, value, cssVar, usage }, i) => (
              <tr
                key={name}
                className="border-b border-border last:border-0"
                style={{ background: i % 2 === 0 ? 'transparent' : 'color-mix(in srgb, var(--border) 40%, transparent)' }}
              >
                <td className="px-5 py-4">
                  <Token>{`var(${cssVar})`}</Token>
                </td>
                <td className="px-5 py-4 font-mono text-text-xsmall text-text" style={{ opacity: 0.7 }}>{value}</td>
                <td className="px-5 py-4">
                  <div
                    className="w-10 h-10"
                    style={{
                      borderRadius: `var(${cssVar})`,
                      background: 'var(--accent-btn-bg)',
                    }}
                  />
                </td>
                <td className="px-5 py-4 text-text-xsmall text-text" style={{ opacity: 0.65 }}>{usage}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Usage note */}
      <div
        className="mt-6 rounded-[var(--radius-dropdown)] border border-border px-5 py-4 flex gap-3 items-start"
        style={{ background: 'color-mix(in srgb, var(--accent-btn-bg) 8%, transparent)' }}
      >
        <span className="text-text-main-semibold leading-none mt-px" style={{ color: 'var(--accent-btn-bg)' }}>↗</span>
        <p className="text-text-xsmall text-text" style={{ opacity: 0.75 }}>
          In Tailwind, use <Token>rounded-[var(--radius-card)]</Token> syntax.
          In Figma, every radius is a variable in the <strong>Dimensions</strong> collection — never enter raw pixels.
        </p>
      </div>
    </section>
  )
}

// ─── Spacing Section ──────────────────────────────────────────────────────────

function SpacingSection() {
  const maxVal = Math.max(...spacingTokens.map(t => t.value))

  return (
    <section>
      <SectionHeader
        label="Spacing"
        description="Spacing tokens govern the vertical rhythm of the page — the breathing room between full-width sections. Consistent application keeps the page from feeling cramped on mobile or too spaced-out on desktop."
      />

      {/* Visual bar chart */}
      <div className="flex items-end gap-10 mb-10">
        {spacingTokens.map(({ label, value, cssVar }) => (
          <div key={label} className="flex flex-col items-center gap-3">
            {/* bar */}
            <div className="relative flex items-end" style={{ height: maxVal + 24 }}>
              <div
                className="w-20 rounded-t-[var(--radius-small)]"
                style={{
                  height: value,
                  background: 'var(--accent-btn-bg)',
                  opacity: 0.85,
                }}
              />
              {/* measurement line */}
              <div
                className="absolute right-[-28px] top-0 flex flex-col items-center gap-0"
                style={{ height: value }}
              >
                <div className="flex-1 border-r border-dashed border-border" />
              </div>
            </div>
            {/* label */}
            <div className="text-center">
              <p className="text-text-small-semibold text-text">{label}</p>
              <p className="text-text-xsmall font-mono" style={{ color: 'var(--text)', opacity: 0.5 }}>{value}px</p>
            </div>
          </div>
        ))}
      </div>

      {/* Detail table */}
      <div className="rounded-[var(--radius-card)] border border-border overflow-hidden">
        <table className="w-full text-left text-text-small">
          <thead>
            <tr className="border-b border-border">
              <th className="px-5 py-3 text-text-xsmall-semibold uppercase tracking-[0.08em] text-text" style={{ opacity: 0.5 }}>Token</th>
              <th className="px-5 py-3 text-text-xsmall-semibold uppercase tracking-[0.08em] text-text" style={{ opacity: 0.5 }}>Value</th>
              <th className="px-5 py-3 text-text-xsmall-semibold uppercase tracking-[0.08em] text-text" style={{ opacity: 0.5 }}>Breakpoint</th>
              <th className="px-5 py-3 text-text-xsmall-semibold uppercase tracking-[0.08em] text-text" style={{ opacity: 0.5 }}>Used for</th>
            </tr>
          </thead>
          <tbody>
            {spacingTokens.map(({ name, cssVar, value, usage }, i) => (
              <tr
                key={name}
                className="border-b border-border last:border-0"
                style={{ background: i % 2 === 0 ? 'transparent' : 'color-mix(in srgb, var(--border) 40%, transparent)' }}
              >
                <td className="px-5 py-4">
                  <Token>{`var(${cssVar})`}</Token>
                </td>
                <td className="px-5 py-4 font-mono text-text-xsmall text-text" style={{ opacity: 0.7 }}>{value}px</td>
                <td className="px-5 py-4 text-text-xsmall text-text" style={{ opacity: 0.7 }}>
                  {name.includes('mobile') ? '< md (640px)' : '≥ md (640px)'}
                </td>
                <td className="px-5 py-4 text-text-xsmall text-text" style={{ opacity: 0.65 }}>{usage}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Tailwind pattern */}
      <div
        className="mt-6 rounded-[var(--radius-dropdown)] border border-border px-5 py-4"
        style={{ background: 'color-mix(in srgb, var(--accent-btn-bg) 8%, transparent)' }}
      >
        <p className="text-text-xsmall-semibold text-text mb-2" style={{ opacity: 0.85 }}>Tailwind pattern for section padding</p>
        <code className="block text-text-xsmall font-mono text-text" style={{ opacity: 0.7 }}>
          {'py-[var(--spacing-section-y-mobile)] md:py-[var(--spacing-section-y-desktop)]'}
        </code>
      </div>
    </section>
  )
}

// ─── Usage Principles ─────────────────────────────────────────────────────────

function PrinciplesSection() {
  const rules = [
    {
      icon: '✦',
      title: 'Token-first, always',
      body: 'Never hardcode a px value for radius or section spacing. If a value isn\'t in the token list, add it to tokens.json and run npm run build-tokens.',
    },
    {
      icon: '⊞',
      title: 'Scale with context',
      body: 'Use smaller radii (small, dropdown) for functional controls and inputs. Reserve larger radii (card, section) for containers and surfaces that hold content.',
    },
    {
      icon: '↕',
      title: 'Vertical rhythm consistency',
      body: 'Every top-level section on murfy.fr uses the section-y spacing tokens. This creates a predictable rhythm as users scroll — avoid one-off padding values on sections.',
    },
    {
      icon: '⬡',
      title: 'Pill for interactive states',
      body: 'Tags, filters, and status chips use radius-pill. This creates an obvious visual distinction between interactive identifiers and rectangular content cards.',
    },
  ]

  return (
    <section>
      <SectionHeader
        label="Usage Principles"
        description="Guidelines for applying spacing and radius tokens consistently across all Murfy surfaces."
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {rules.map(({ icon, title, body }) => (
          <div
            key={title}
            className="rounded-[var(--radius-card)] border border-border px-6 py-5 flex gap-4"
          >
            <span className="text-h5 leading-none mt-0.5" style={{ color: 'var(--accent-btn-bg)' }}>{icon}</span>
            <div>
              <p className="text-text-small-semibold text-text mb-1">{title}</p>
              <p className="text-text-xsmall text-text" style={{ opacity: 0.65 }}>{body}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

function SpacingRadiusDoc() {
  return (
    <div className="min-h-screen" style={{ background: 'var(--bg)' }}>
      {/* Page header */}
      <div
        className="px-8 py-10 border-b border-border"
        style={{ background: 'color-mix(in srgb, var(--accent-btn-bg) 5%, var(--bg))' }}
      >
        <p className="text-label uppercase tracking-[0.08em] font-semibold mb-2" style={{ color: 'var(--accent-btn-bg)' }}>
          Foundation
        </p>
        <h1 className="text-h2 font-bold text-text mb-3">Spacing & Radius</h1>
        <p className="text-text-main text-text max-w-2xl" style={{ opacity: 0.65 }}>
          The spatial vocabulary of the Murfy design system. Five radius tokens control every
          rounded shape; two spacing tokens regulate vertical rhythm across all page sections.
          These tokens are the same in code (CSS variables) and design (Figma variables).
        </p>
      </div>

      {/* Content */}
      <div className="px-8 py-12 max-w-5xl space-y-0">
        <RadiusSection />
        <Divider />
        <SpacingSection />
        <Divider />
        <PrinciplesSection />
      </div>
    </div>
  )
}

// ─── Meta ─────────────────────────────────────────────────────────────────────

const meta: Meta = {
  title: 'Foundation/Spacing & Radius',
  component: SpacingRadiusDoc,
  parameters: { layout: 'fullscreen' },
}
export default meta

type Story = StoryObj
export const RadiusAndSpacing: Story = {}
