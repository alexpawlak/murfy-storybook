import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { DocHeader, DocSection, GuidanceGrid, AccessibilityNote } from './doc-components'

// ─── Data ─────────────────────────────────────────────────────────────────────

const radii = [
  {
    name: 'radius-0',
    label: 'None',
    value: '0px',
    cssVar: '--radius-0',
    usage: 'Sharp-cornered elements, table cells, full-bleed banners',
    tailwind: 'rounded-[var(--radius-0)]',
  },
  {
    name: 'radius-small',
    label: 'Small',
    value: '8px',
    cssVar: '--radius-small',
    usage: 'Inputs, buttons, small UI controls, inline highlights',
    tailwind: 'rounded-[var(--radius-small)]',
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
    name: 'radius-card',
    label: 'Card',
    value: '24px',
    cssVar: '--radius-card',
    usage: 'Product cards, service cards, review cards, pricing tiles',
    tailwind: 'rounded-[var(--radius-card)]',
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
    name: 'radius-pill',
    label: 'Pill',
    value: '9999px',
    cssVar: '--radius-pill',
    usage: 'Tags, badges, filter chips, status indicators',
    tailwind: 'rounded-[var(--radius-pill)]',
  },
]

const spacingTokens = [
  { name: 'space-0',   value: 0,   cssVar: '--space-0' },
  { name: 'space-4',   value: 4,   cssVar: '--space-4' },
  { name: 'space-8',   value: 8,   cssVar: '--space-8' },
  { name: 'space-12',  value: 12,  cssVar: '--space-12' },
  { name: 'space-16',  value: 16,  cssVar: '--space-16' },
  { name: 'space-24',  value: 24,  cssVar: '--space-24' },
  { name: 'space-32',  value: 32,  cssVar: '--space-32' },
  { name: 'space-40',  value: 40,  cssVar: '--space-40' },
  { name: 'space-48',  value: 48,  cssVar: '--space-48' },
  { name: 'space-56',  value: 56,  cssVar: '--space-56' },
  { name: 'space-64',  value: 64,  cssVar: '--space-64' },
  { name: 'space-72',  value: 72,  cssVar: '--space-72' },
  { name: 'space-80',  value: 80,  cssVar: '--space-80' },
  { name: 'space-88',  value: 88,  cssVar: '--space-88' },
  { name: 'space-96',  value: 96,  cssVar: '--space-96' },
  { name: 'space-128', value: 128, cssVar: '--space-128' },
  { name: 'space-160', value: 160, cssVar: '--space-160' },
]

const sectionSpacingTokens = [
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
      <div className="grid grid-cols-3 md:grid-cols-6 gap-6 mb-10">
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
  const maxBarHeight = 120
  const maxVal = Math.max(...spacingTokens.map(t => t.value))

  return (
    <>
      {/* ── Space scale visual ── */}
      <div className="overflow-x-auto pb-2 mb-10">
        <div className="flex items-end gap-3" style={{ minWidth: 'max-content' }}>
          {spacingTokens.map(({ name, value, cssVar }) => {
            const barH = value === 0 ? 2 : Math.max(4, Math.round((value / maxVal) * maxBarHeight))
            return (
              <div key={name} className="flex flex-col items-center gap-2">
                <span className="text-text-xsmall font-mono" style={{ color: 'var(--text)', opacity: 0.5 }}>{value}</span>
                <div
                  className="w-8 rounded-t-[var(--radius-small)]"
                  style={{ height: barH, background: 'var(--accent-btn-bg)', opacity: value === 0 ? 0.25 : 0.85 }}
                />
                <span className="text-text-xsmall font-mono" style={{ color: 'var(--text)', opacity: 0.6, fontSize: 11 }}>
                  {cssVar.replace('--', '')}
                </span>
              </div>
            )
          })}
        </div>
      </div>

      {/* ── Token table ── */}
      <div className="rounded-[var(--radius-card)] border border-border overflow-hidden mb-10">
        <table className="w-full text-left text-text-small">
          <thead>
            <tr className="border-b border-border" style={{ background: 'var(--bg)' }}>
              <th className="px-5 py-3 text-text-xsmall-semibold uppercase tracking-[0.08em] text-text" style={{ opacity: 0.5 }}>Token</th>
              <th className="px-5 py-3 text-text-xsmall-semibold uppercase tracking-[0.08em] text-text" style={{ opacity: 0.5 }}>Value</th>
              <th className="px-5 py-3 text-text-xsmall-semibold uppercase tracking-[0.08em] text-text" style={{ opacity: 0.5 }}>Preview</th>
            </tr>
          </thead>
          <tbody>
            {spacingTokens.map(({ name, cssVar, value }, i) => (
              <tr
                key={name}
                className="border-b border-border last:border-0"
                style={{ background: i % 2 === 0 ? 'transparent' : 'color-mix(in srgb, var(--border) 40%, transparent)' }}
              >
                <td className="px-5 py-3"><Token>{`var(${cssVar})`}</Token></td>
                <td className="px-5 py-3 font-mono text-text-xsmall text-text" style={{ opacity: 0.7 }}>{value}px</td>
                <td className="px-5 py-3">
                  <div
                    style={{
                      width: value === 0 ? 2 : value,
                      height: 16,
                      background: 'var(--accent-btn-bg)',
                      opacity: value === 0 ? 0.2 : 0.75,
                      borderRadius: 2,
                      maxWidth: 160,
                    }}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ── Section spacing ── */}
      <p className="text-text-main-semibold text-text mb-4">Section spacing</p>
      <div className="rounded-[var(--radius-card)] border border-border overflow-hidden">
        <table className="w-full text-left text-text-small">
          <thead>
            <tr className="border-b border-border" style={{ background: 'var(--bg)' }}>
              <th className="px-5 py-3 text-text-xsmall-semibold uppercase tracking-[0.08em] text-text" style={{ opacity: 0.5 }}>Token</th>
              <th className="px-5 py-3 text-text-xsmall-semibold uppercase tracking-[0.08em] text-text" style={{ opacity: 0.5 }}>Value</th>
              <th className="px-5 py-3 text-text-xsmall-semibold uppercase tracking-[0.08em] text-text" style={{ opacity: 0.5 }}>Breakpoint</th>
              <th className="px-5 py-3 text-text-xsmall-semibold uppercase tracking-[0.08em] text-text" style={{ opacity: 0.5 }}>Used for</th>
            </tr>
          </thead>
          <tbody>
            {sectionSpacingTokens.map(({ name, cssVar, value, usage, label }, i) => (
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
        description="The spatial vocabulary of the Murfy design system. Six radius tokens control every rounded shape; 17 space tokens cover component gaps and paddings; two section tokens regulate vertical rhythm. All tokens are shared between code (CSS variables) and Figma (Dimensions collection)."
      />

      <div className="px-8 py-12 max-w-5xl">

        {/* ── Border Radius ─────────────────────────────────────────────── */}
        <DocSection
          label="Border Radius"
          subtitle="Six named radius tokens cover every shape in the Murfy UI — from sharp corners (radius-0) to full pills. Always reference a token — never use a raw px value."
        >
          <RadiusShowcase />
        </DocSection>

        {/* ── Spacing ───────────────────────────────────────────────────── */}
        <DocSection
          label="Spacing"
          subtitle="17 space tokens (space-0 → space-160) cover component-level gaps, paddings, and margins. Two section tokens govern the vertical rhythm of full-width page sections across breakpoints."
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
