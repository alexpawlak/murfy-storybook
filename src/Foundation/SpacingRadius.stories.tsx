import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { DocHeader, DocSection, GuidanceGrid, AccessibilityNote } from './doc-components'

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

// ─── Showcase sections ────────────────────────────────────────────────────────

function RadiusShowcase() {
  return (
    <>
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
            <tr className="border-b border-border" style={{ background: 'var(--bg)' }}>
              <th className="px-5 py-3 text-text-xsmall-semibold uppercase tracking-[0.08em] text-text" style={{ opacity: 0.5 }}>Token</th>
              <th className="px-5 py-3 text-text-xsmall-semibold uppercase tracking-[0.08em] text-text" style={{ opacity: 0.5 }}>Value</th>
              <th className="px-5 py-3 text-text-xsmall-semibold uppercase tracking-[0.08em] text-text" style={{ opacity: 0.5 }}>Preview</th>
              <th className="px-5 py-3 text-text-xsmall-semibold uppercase tracking-[0.08em] text-text" style={{ opacity: 0.5 }}>Used for</th>
            </tr>
          </thead>
          <tbody>
            {radii.map(({ name, value, cssVar, usage }, i) => (
              <tr
                key={name}
                className="border-b border-border last:border-0"
                style={{ background: i % 2 === 0 ? 'transparent' : 'color-mix(in srgb, var(--border) 40%, transparent)' }}
              >
                <td className="px-5 py-4"><Token>{`var(${cssVar})`}</Token></td>
                <td className="px-5 py-4 font-mono text-text-xsmall text-text" style={{ opacity: 0.7 }}>{value}</td>
                <td className="px-5 py-4">
                  <div className="w-10 h-10" style={{ borderRadius: `var(${cssVar})`, background: 'var(--accent-btn-bg)' }} />
                </td>
                <td className="px-5 py-4 text-text-xsmall text-text" style={{ opacity: 0.65 }}>{usage}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

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
    </>
  )
}

function SpacingShowcase() {
  const maxVal = Math.max(...spacingTokens.map(t => t.value))

  return (
    <>
      {/* Visual bar chart */}
      <div className="flex items-end gap-10 mb-10">
        {spacingTokens.map(({ label, value }) => (
          <div key={label} className="flex flex-col items-center gap-3">
            <div className="relative flex items-end" style={{ height: maxVal + 24 }}>
              <div
                className="w-20 rounded-t-[var(--radius-small)]"
                style={{ height: value, background: 'var(--accent-btn-bg)', opacity: 0.85 }}
              />
              <div
                className="absolute right-[-28px] top-0 flex flex-col items-center gap-0"
                style={{ height: value }}
              >
                <div className="flex-1 border-r border-dashed border-border" />
              </div>
            </div>
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
                <td className="px-5 py-4"><Token>{`var(${cssVar})`}</Token></td>
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

      <div
        className="mt-6 rounded-[var(--radius-dropdown)] border border-border px-5 py-4"
        style={{ background: 'color-mix(in srgb, var(--accent-btn-bg) 8%, transparent)' }}
      >
        <p className="text-text-xsmall-semibold text-text mb-2" style={{ opacity: 0.85 }}>Tailwind pattern for section padding</p>
        <code className="block text-text-xsmall font-mono text-text" style={{ opacity: 0.7 }}>
          {'py-[var(--spacing-section-y-mobile)] md:py-[var(--spacing-section-y-desktop)]'}
        </code>
      </div>
    </>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

function SpacingRadiusDoc() {
  return (
    <div className="min-h-screen" style={{ background: 'var(--bg)' }}>
      <DocHeader
        layer="Foundation"
        title="Spacing & Radius"
        description="The spatial vocabulary of the Murfy design system. Five radius tokens control every rounded shape; two spacing tokens regulate vertical rhythm across all page sections. These tokens are the same in code (CSS variables) and design (Figma variables)."
      />

      <div className="px-8 py-12 max-w-5xl">

        {/* ── Border Radius ─────────────────────────────────────────────── */}
        <DocSection
          label="Border Radius"
          subtitle="Five named radius tokens cover every shape in the Murfy UI. Always reference a token — never use a raw px value."
        >
          <RadiusShowcase />
        </DocSection>

        {/* ── Spacing ───────────────────────────────────────────────────── */}
        <DocSection
          label="Spacing"
          subtitle="Spacing tokens govern the vertical rhythm of the page — the breathing room between full-width sections. Consistent application keeps the page from feeling cramped on mobile or too spaced-out on desktop."
        >
          <SpacingShowcase />
        </DocSection>

        {/* ── Best Practices ────────────────────────────────────────────── */}
        <DocSection
          label="Best Practices"
          subtitle="Follow these rules to keep the design system coherent across all surfaces and verticals."
        >
          <GuidanceGrid
            dos={[
              {
                rule: 'Use radius-pill for interactive tags and filter chips.',
                rationale: 'The pill shape creates an unmistakable visual distinction from rectangular card containers, helping users instantly identify clickable identifiers.',
              },
              {
                rule: 'Use section-y spacing tokens for every top-level section.',
                rationale: 'Consistent vertical rhythm creates a predictable scrolling experience. Users subconsciously expect similar breathing room between sections — one-off values break that expectation.',
                wcag: 'WCAG 2.5.5 Target Size',
              },
              {
                rule: 'Scale radius to context: small for controls, large for containers.',
                rationale: 'Inputs and buttons use radius-small (8px); cards and panels use radius-card (24px). The visual hierarchy mirrors the content hierarchy — smaller controls feel contained inside larger surfaces.',
              },
              {
                rule: 'Reference tokens in both Tailwind and Figma — never enter raw pixels.',
                rationale: 'If a token value ever changes, a single update to tokens.json propagates everywhere. Hardcoded values silently diverge.',
              },
            ]}
            donts={[
              {
                rule: 'Do not mix radius-pill with radius-card on the same interactive element.',
                rationale: 'Mixing pill and card radii on a single component creates visual ambiguity about what level of the hierarchy the element belongs to.',
              },
              {
                rule: 'Do not add one-off vertical padding to sections outside the token values.',
                rationale: 'Arbitrary spacing values break the page rhythm and make future layout changes unpredictable. If a new value is genuinely needed, add it to tokens.json first.',
              },
              {
                rule: 'Do not use radius-section for small UI controls like buttons or inputs.',
                rationale: 'A 48px radius on a 40px tall button is visually indistinguishable from a pill — use radius-pill explicitly for that intent to keep naming meaningful.',
              },
              {
                rule: 'Do not set spacing values with Tailwind defaults (p-4, p-8) on full-width sections.',
                rationale: 'Tailwind spacing utilities are for component-level spacing. Section-level vertical rhythm must come from the design token to stay consistent across breakpoints.',
              },
            ]}
          />
        </DocSection>

        {/* ── Accessibility ─────────────────────────────────────────────── */}
        <DocSection
          label="Accessibility & WCAG"
          subtitle="Spacing and radius are invisible to screen readers but critical for users with motor and visual impairments."
        >
          <div className="flex flex-col gap-4">
            <AccessibilityNote
              criterion="WCAG 2.5.5 — Target Size (AA)"
              requirement="Interactive elements must be at least 44×44 CSS pixels"
              why="Users with motor impairments, tremors, or who are on small touch screens need a generous tap target. The 64px section spacing ensures interactive elements never crowd each other vertically on mobile. Buttons and tags must maintain at least 44px height — never reduce spacing to the point where tap targets fall below this threshold."
              href="https://www.w3.org/WAI/WCAG21/Understanding/target-size.html"
            />
            <AccessibilityNote
              criterion="WCAG 1.4.10 — Reflow (AA)"
              requirement="Content must reflow to a single column at 320px width without horizontal scrolling"
              why="The mobile section-y spacing token (64px) was chosen to maintain readable vertical rhythm at 320px viewport width. Reducing it further squeezes content sections together and forces users with low vision who zoom to 400% to scroll both horizontally and vertically."
              href="https://www.w3.org/WAI/WCAG21/Understanding/reflow.html"
            />
          </div>
        </DocSection>

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
