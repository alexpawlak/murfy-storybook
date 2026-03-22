import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Button } from '../Atoms/Button/Button'
import tokens from '../../tokens.json'
import { DocHeader, DocSection, AccessibilityNote } from './doc-components'

type ContrastExample = {
  label: string
  backgroundValue: string
  foregroundValue: string
  note: string
  required: string
  previewKind: 'primary-cta' | 'accent-cta' | 'highlight-pill' | 'custom'
  accent?: 'default' | 'violet' | 'yellow' | 'fuschia'
  theme?: 'light' | 'dark' | 'light-pink' | 'pink-mist' | 'pink-vivid'
  customPreviewStyle?: React.CSSProperties
}

function resolveTokenReference(value: string) {
  const primitiveMatch = value.match(/^\{primitives\.([^}]+)\}$/)
  if (primitiveMatch) {
    return tokens.primitives[primitiveMatch[1] as keyof typeof tokens.primitives]
  }
  return value
}

const tokenValues = {
  pink500: resolveTokenReference(tokens.primitives['pink-500']),
  brandText: resolveTokenReference(tokens.primitives['brand-text']),
  light100: resolveTokenReference(tokens.primitives['light-100']),
  yellow600: resolveTokenReference(tokens.primitives['yellow-600']),
  yellowHighlight: resolveTokenReference(tokens.primitives['yellow-highlight']),
  light200: resolveTokenReference(tokens.primitives['light-200']),
  fuschiaHighlight: resolveTokenReference(tokens.primitives['fuschia-highlight']),
  fuschiaText: resolveTokenReference(tokens.primitives['fuschia-text']),
  violetAccentBg: resolveTokenReference(tokens.accents.violet['btn-bg']),
  violetAccentText: resolveTokenReference(tokens.accents.violet['btn-text']),
  yellowAccentBg: resolveTokenReference(tokens.accents.yellow['btn-bg']),
  yellowAccentText: resolveTokenReference(tokens.accents.yellow['btn-text']),
  fuschiaAccentBg: resolveTokenReference(tokens.accents.fuschia['btn-bg']),
  fuschiaAccentText: resolveTokenReference(tokens.accents.fuschia['btn-text']),
  yellowHighlightText: resolveTokenReference(tokens.accents.yellow['accent-text']),
}

const surfaceColors = {
  neutral: 'var(--light-100)',
  yellowHighlight: 'var(--yellow-highlight)',
  fuschiaHighlight: 'var(--fuschia-highlight)',
}

const elevationShadow = '0 2px 16px color-mix(in srgb, var(--dark-900) 8%, transparent)'
const tableRule = '1px solid color-mix(in srgb, var(--text) 12%, transparent)'
const rowRule = '1px solid color-mix(in srgb, var(--text) 8%, transparent)'

const contrastExamples: ContrastExample[] = [
  {
    label: 'Brand primary CTA',
    backgroundValue: tokenValues.pink500,
    foregroundValue: tokenValues.brandText,
    note: 'Approved for the main Murfy CTA on neutral surfaces.',
    required: 'AA text',
    previewKind: 'primary-cta',
    theme: 'light',
    accent: 'default',
  },
  {
    label: 'Violet accent CTA',
    backgroundValue: tokenValues.violetAccentBg,
    foregroundValue: tokenValues.violetAccentText,
    note: 'Approved for vertical-specific calls to action.',
    required: 'AA text',
    previewKind: 'accent-cta',
    theme: 'light',
    accent: 'violet',
  },
  {
    label: 'Yellow accent CTA',
    backgroundValue: tokenValues.yellowAccentBg,
    foregroundValue: tokenValues.yellowAccentText,
    note: 'Use dark text on yellow surfaces and yellow CTAs.',
    required: 'AA text',
    previewKind: 'accent-cta',
    theme: 'light',
    accent: 'yellow',
  },
  {
    label: 'Fuschia accent CTA',
    backgroundValue: tokenValues.fuschiaAccentBg,
    foregroundValue: tokenValues.fuschiaAccentText,
    note: 'Passes AA, but has less visual margin than the other CTA pairs.',
    required: 'AA text',
    previewKind: 'accent-cta',
    theme: 'light',
    accent: 'fuschia',
  },
  {
    label: 'Yellow highlight pill',
    backgroundValue: tokenValues.yellowHighlight,
    foregroundValue: tokenValues.yellowHighlightText,
    note: 'Approved for labels and highlighted text on yellow-tinted surfaces.',
    required: 'AA text',
    previewKind: 'highlight-pill',
    theme: 'light',
    accent: 'yellow',
  },
  {
    label: 'Avoid: yellow-on-yellow text',
    backgroundValue: tokenValues.yellowHighlight,
    foregroundValue: tokenValues.yellow600,
    note: 'Do not use low-contrast yellow text on yellow highlights.',
    required: 'Fails AA',
    previewKind: 'custom',
    theme: 'light',
    accent: 'yellow',
    customPreviewStyle: { backgroundColor: 'var(--yellow-highlight)', color: 'var(--yellow-600)' },
  },
]

function hexToRgb(value: string) {
  const hex = value.replace('#', '')
  return {
    r: parseInt(hex.slice(0, 2), 16) / 255,
    g: parseInt(hex.slice(2, 4), 16) / 255,
    b: parseInt(hex.slice(4, 6), 16) / 255,
  }
}

function toLuminance(value: string) {
  const { r, g, b } = hexToRgb(value)
  const convert = (channel: number) => (channel <= 0.03928 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4)
  return 0.2126 * convert(r) + 0.7152 * convert(g) + 0.0722 * convert(b)
}

function getContrastRatio(background: string, foreground: string) {
  const lighter = Math.max(toLuminance(background), toLuminance(foreground))
  const darker = Math.min(toLuminance(background), toLuminance(foreground))
  return (lighter + 0.05) / (darker + 0.05)
}

function ContrastPreview({ example }: { example: ContrastExample }) {
  const previewTheme = example.theme ?? 'light'
  const previewAccent = example.accent ?? 'default'
  let previewStyle: React.CSSProperties

  if (example.previewKind === 'primary-cta') {
    previewStyle = { backgroundColor: 'var(--btn-bg)', color: 'var(--btn-text)' }
  } else if (example.previewKind === 'accent-cta') {
    previewStyle = { backgroundColor: 'var(--accent-btn-bg)', color: 'var(--accent-btn-text)' }
  } else if (example.previewKind === 'highlight-pill') {
    previewStyle = { backgroundColor: 'var(--accent-accent-highlight)', color: 'var(--accent-accent-text)' }
  } else {
    previewStyle = example.customPreviewStyle ?? {}
  }

  return (
    <div data-theme={previewTheme} data-accent={previewAccent}>
      <div
        className="inline-flex rounded-[var(--radius-pill)] px-4 py-2 text-text-small-semibold"
        style={previewStyle}
      >
        Aa Sample
      </div>
    </div>
  )
}

function ContrastRatingBadge({ ratio }: { ratio: number }) {
  const passes = ratio >= 4.5
  return (
    <span
      className="inline-flex items-center rounded-[var(--radius-pill)] px-3 py-1 text-label uppercase tracking-[0.08em]"
      style={{
        backgroundColor: passes ? '#d1fae5' : '#fee2e2',
        color: passes ? '#065f46' : '#991b1b',
      }}
    >
      {passes ? 'AA pass' : 'Avoid'}
    </span>
  )
}

function SurfaceExample({
  title, description, accent, background, children,
}: {
  title: string; description: string; accent: 'default' | 'violet' | 'yellow' | 'fuschia'; background: string; children: React.ReactNode
}) {
  return (
    <div
      data-theme="light"
      data-accent={accent}
      className="rounded-[var(--radius-card)] p-6"
      style={{ backgroundColor: background, boxShadow: elevationShadow }}
    >
      <h3 className="text-h6 font-bold text-text">{title}</h3>
      <p className="mt-2 text-text-small text-text" style={{ opacity: 0.78 }}>{description}</p>
      <div className="mt-5 flex flex-wrap gap-3">{children}</div>
    </div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

function AccessibilityGuidelinesDoc() {
  return (
    <div className="min-h-screen" style={{ background: 'var(--bg)' }}>
      <DocHeader
        layer="Foundation"
        title="Accessibility Guidelines"
        description="The approved color pairs, CTA hierarchy rules, and WCAG standards that govern every component in this design system. This is the source of truth for accessibility decisions — not the Theme × Accent Matrix."
      />

      <div className="px-8 py-12 max-w-5xl">

        {/* ── Core rules ────────────────────────────────────────────────── */}
        <DocSection
          label="Core Rules"
          subtitle="Three principles that govern every color and interaction decision in the Murfy system."
        >
          <div className="grid gap-4 md:grid-cols-3">
            {[
              {
                num: '1',
                title: 'Contrast first',
                body: 'Every filled CTA and every text-on-color pairing needs an approved contrast ratio. Yellow surfaces should always use dark text. Verify before shipping.',
                wcag: 'WCAG 1.4.3',
              },
              {
                num: '2',
                title: 'One strong CTA at a time',
                body: 'On mobile, one filled CTA should carry the main action. If the whole surface is already colorful, reduce the CTA intensity — don\'t stack saturation.',
                wcag: 'WCAG 1.4.1',
              },
              {
                num: '3',
                title: 'No decorative heavy outlines',
                body: 'Radius, spacing, and surface shifts separate content first. Borders are for structure, selection state, or focus — not for every flat card.',
                wcag: null,
              },
            ].map(({ num, title, body, wcag }) => (
              <div key={num} className="rounded-[var(--radius-card)] border border-border px-5 py-5">
                <div className="flex items-start gap-3 mb-2">
                  <span
                    className="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-label font-bold"
                    style={{ background: 'var(--accent-btn-bg)', color: 'var(--accent-btn-text)' }}
                  >
                    {num}
                  </span>
                  <p className="text-text-small-semibold text-text pt-0.5">{title}</p>
                </div>
                <p className="text-text-xsmall text-text" style={{ opacity: 0.65 }}>{body}</p>
                {wcag && (
                  <code
                    className="mt-2 inline-block text-label font-mono px-2 py-0.5 rounded-[var(--radius-small)]"
                    style={{ background: 'color-mix(in srgb, var(--accent-btn-bg) 10%, var(--bg))', color: 'var(--accent-btn-bg)' }}
                  >
                    {wcag}
                  </code>
                )}
              </div>
            ))}
          </div>
        </DocSection>

        {/* ── Token naming ──────────────────────────────────────────────── */}
        <DocSection
          label="How accent token naming works"
          subtitle="The naming is doing an important job. Filled accent buttons and lighter accent surfaces use different text tokens because they solve different contrast problems."
        >
          <div className="grid gap-4 md:grid-cols-2">
            {[
              {
                title: 'Filled accent CTA',
                body: 'Use --accent-btn-bg with --accent-btn-text for a filled button, plus --accent-btn-bg-hover and --accent-btn-text-hover for hover. This is what the Button atom uses.',
              },
              {
                title: 'Light accent surface',
                body: 'Use --accent-accent-highlight with --accent-accent-text for lighter pills, highlighted labels, and tinted surfaces. The darker same-family text token belongs here — not on every filled button.',
              },
            ].map(({ title, body }) => (
              <div key={title} className="rounded-[var(--radius-card)] border border-border p-6" style={{ background: 'color-mix(in srgb, var(--accent-btn-bg) 5%, var(--bg))' }}>
                <h3 className="text-text-small-semibold text-text mb-2">{title}</h3>
                <p className="text-text-xsmall text-text" style={{ opacity: 0.75 }}>{body}</p>
              </div>
            ))}
          </div>
          <p className="mt-4 text-text-xsmall text-text max-w-3xl" style={{ opacity: 0.7 }}>
            In practice: violet and fuschia filled buttons keep light text because the darker same-shade text does not
            pass contrast on the stronger fill. Yellow is the exception — its filled button is light enough to safely use dark text.
          </p>
        </DocSection>

        {/* ── Contrast table ────────────────────────────────────────────── */}
        <DocSection
          label="Approved text-on-color pairs"
          subtitle="Ratios based on current design tokens. Use as source of truth when evaluating CTA text color, highlight pills, and accent surfaces."
        >
          <div className="overflow-x-auto rounded-[var(--radius-card)]" style={{ boxShadow: elevationShadow }}>
            <table className="w-full border-collapse" style={{ backgroundColor: 'var(--bg)' }}>
              <thead>
                <tr style={{ borderBottom: tableRule }}>
                  {['Pair', 'Preview', 'Contrast', 'Guidance'].map(h => (
                    <th key={h} className="p-4 text-left text-label uppercase tracking-[0.08em] text-text" style={{ opacity: 0.5 }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {contrastExamples.map((example) => {
                  const ratio = getContrastRatio(example.backgroundValue, example.foregroundValue)
                  return (
                    <tr key={example.label} style={{ borderTop: rowRule }}>
                      <td className="p-4 align-top">
                        <div className="text-text-small-semibold text-text">{example.label}</div>
                        <div className="mt-1 text-text-xsmall text-text" style={{ opacity: 0.65 }}>{example.required}</div>
                      </td>
                      <td className="p-4 align-top"><ContrastPreview example={example} /></td>
                      <td className="p-4 align-top">
                        <div className="flex items-center gap-3">
                          <span className="text-text-small-semibold text-text">{ratio.toFixed(2)}:1</span>
                          <ContrastRatingBadge ratio={ratio} />
                        </div>
                      </td>
                      <td className="p-4 align-top">
                        <p className="text-text-small text-text" style={{ opacity: 0.78 }}>{example.note}</p>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </DocSection>

        {/* ── CTA on backgrounds ────────────────────────────────────────── */}
        <DocSection
          label="CTA behavior on backgrounds"
          subtitle="The toolbar shows token changes, but teams need examples of what to do when the surrounding surface is quiet, tinted, or already visually loud."
        >
          <div className="grid gap-4 md:grid-cols-3">
            <SurfaceExample
              title="Preferred: neutral surface"
              description="Use filled CTAs on neutral surfaces when the action should be the strongest visual element."
              accent="default"
              background={surfaceColors.neutral}
            >
              <Button variant="primary">Prendre rendez-vous</Button>
              <Button variant="secondary">En savoir plus</Button>
            </SurfaceExample>

            <SurfaceExample
              title="Preferred: tinted with dark text"
              description="Yellow-tinted backgrounds work when text stays dark and the CTA still has clear shape contrast."
              accent="yellow"
              background={surfaceColors.yellowHighlight}
            >
              <span
                className="inline-flex rounded-[var(--radius-pill)] px-4 py-2 text-text-small-semibold"
                style={{ backgroundColor: 'var(--yellow-500)', color: 'var(--dark-900)' }}
              >
                Highlight with dark text
              </span>
              <Button variant="accent">Demander un devis</Button>
            </SurfaceExample>

            <SurfaceExample
              title="Avoid: saturated on saturated"
              description="If the block is already loud, do not stack a filled CTA plus extra outline. Reduce intensity or place the CTA in a neutral container."
              accent="fuschia"
              background={surfaceColors.fuschiaHighlight}
            >
              <button
                className="rounded-[var(--radius-pill)] px-5 py-3 text-text-small-semibold"
                style={{ backgroundColor: 'var(--accent-btn-bg)', color: 'var(--accent-btn-text)', border: '2px solid var(--fuschia-text)' }}
              >
                Too heavy on mobile
              </button>
            </SurfaceExample>
          </div>
        </DocSection>

        {/* ── WCAG reference ────────────────────────────────────────────── */}
        <DocSection label="WCAG Reference">
          <div className="flex flex-col gap-4">
            <AccessibilityNote
              criterion="WCAG 2.1 AA 1.4.3 — Contrast (Minimum)"
              requirement="4.5:1 for normal text · 3:1 for large text (≥18pt or ≥14pt bold)"
              why="This is the baseline for every text-on-color pair in this document. Normal text (body, labels, button labels) must achieve 4.5:1. Heading text H1–H3 at large sizes qualifies for the 3:1 threshold, but targeting 4.5:1 everywhere gives more resilience when sizes change."
              href="https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum.html"
            />
            <AccessibilityNote
              criterion="WCAG 2.1 AA 1.4.11 — Non-text Contrast"
              requirement="3:1 for UI components (buttons, inputs, checkboxes) and graphical objects"
              why="The button border on the secondary variant, the input field border, and interactive focus indicators all fall under this criterion. At 3:1, they must be distinguishable from their surrounding surface even without color as the only differentiator."
              href="https://www.w3.org/WAI/WCAG21/Understanding/non-text-contrast.html"
            />
            <AccessibilityNote
              criterion="WCAG 2.1 AA 1.4.1 — Use of Color"
              requirement="Color must not be the only visual means of conveying information"
              why="When indicating error (red input border), active state (filled tag), or vertical identity (accent color), always pair color with a second cue: an icon, a label change, a shape change, or a text description. This protects users with color blindness (affects ~8% of men, ~0.5% of women)."
              href="https://www.w3.org/WAI/WCAG21/Understanding/use-of-color.html"
            />
          </div>
        </DocSection>

      </div>
    </div>
  )
}

const meta: Meta = {
  title: 'Foundation/Accessibility Guidelines',
  component: AccessibilityGuidelinesDoc,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Usage rules for color accessibility, CTA hierarchy, and mobile surface treatment.',
      },
    },
  },
}

export default meta

type Story = StoryObj
export const Overview: Story = {}
