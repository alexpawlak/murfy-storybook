import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Button } from '../Atoms/Button/Button'
import tokens from '../../tokens.json'

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
    customPreviewStyle: {
      backgroundColor: 'var(--yellow-highlight)',
      color: 'var(--yellow-600)',
    },
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
  const convert = (channel: number) => (
    channel <= 0.03928 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4
  )

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
    previewStyle = {
      backgroundColor: 'var(--btn-bg)',
      color: 'var(--btn-text)',
    }
  } else if (example.previewKind === 'accent-cta') {
    previewStyle = {
      backgroundColor: 'var(--accent-btn-bg)',
      color: 'var(--accent-btn-text)',
    }
  } else if (example.previewKind === 'highlight-pill') {
    previewStyle = {
      backgroundColor: 'var(--accent-accent-highlight)',
      color: 'var(--accent-accent-text)',
    }
  } else {
    previewStyle = example.customPreviewStyle ?? {}
  }

  return (
    <div data-theme={previewTheme} data-accent={previewAccent}>
      <div
        className="inline-flex rounded-pill px-4 py-2 text-text-small-semibold"
        style={previewStyle}
      >
        Aa Sample
      </div>
    </div>
  )
}

function ContrastBadge({ ratio }: { ratio: number }) {
  const passes = ratio >= 4.5

  return (
    <span
      className="inline-flex items-center rounded-pill px-3 py-1 text-label uppercase tracking-[0.08em]"
      style={{
        backgroundColor: passes ? 'var(--accent-accent-highlight)' : 'var(--pink-vivid)',
        color: 'var(--text)',
      }}
    >
      {passes ? 'AA pass' : 'Avoid'}
    </span>
  )
}

function RuleCard({
  title,
  body,
}: {
  title: string
  body: string
}) {
  return (
    <div
      className="rounded-card p-6"
      style={{
        backgroundColor: 'var(--bg-2)',
        boxShadow: elevationShadow,
      }}
    >
      <h3 className="text-h6 font-bold text-text-default">{title}</h3>
      <p className="mt-2 text-text-small text-text-default" style={{ opacity: 0.78 }}>
        {body}
      </p>
    </div>
  )
}

function SurfaceExample({
  title,
  description,
  accent,
  background,
  children,
}: {
  title: string
  description: string
  accent: 'default' | 'violet' | 'yellow' | 'fuschia'
  background: string
  children: React.ReactNode
}) {
  return (
    <div
      data-theme="light"
      data-accent={accent}
      className="rounded-card p-6"
      style={{ backgroundColor: background, boxShadow: elevationShadow }}
    >
      <h3 className="text-h6 font-bold text-text-default">{title}</h3>
      <p className="mt-2 text-text-small text-text-default" style={{ opacity: 0.78 }}>
        {description}
      </p>
      <div className="mt-5 flex flex-wrap gap-3">
        {children}
      </div>
    </div>
  )
}

function AccessibilityGuidelinesDoc() {
  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-12 p-8">
      <section className="max-w-3xl">
        <h2 className="text-h3 font-bold text-text-default">Accessibility and usage guardrails</h2>
        <p className="mt-3 text-text-main text-text-default" style={{ opacity: 0.8 }}>
          Storybook should do more than switch themes. It should teach brand, UI, and product teams which color
          combinations are approved, how CTA priority behaves on different surfaces, and when visual treatments become
          too heavy on mobile.
        </p>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        <RuleCard
          title="1. Contrast first"
          body="Every filled CTA and every text-on-color pairing needs an approved contrast ratio. Yellow surfaces should always use dark text."
        />
        <RuleCard
          title="2. One strong CTA at a time"
          body="On mobile, one filled CTA should carry the main action. If the whole surface is already colorful, reduce the CTA intensity instead of stacking saturation."
        />
        <RuleCard
          title="3. Do not add a heavy outline by default"
          body="Radius, spacing, and surface shifts should separate content first. Borders are for structure, selection, or emphasis, not for every flat card."
        />
      </section>

      <section>
        <div className="max-w-3xl">
          <h3 className="text-h5 font-bold text-text-default">How accent token naming works</h3>
          <p className="mt-2 text-text-small text-text-default" style={{ opacity: 0.78 }}>
            The naming is doing an important job. Filled accent buttons and lighter accent surfaces do not use the same
            text token, because they solve different contrast problems.
          </p>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <RuleCard
            title="Filled accent CTA"
            body="Use `--accent-btn-bg` with `--accent-btn-text` for a filled button, plus `--accent-btn-bg-hover` and `--accent-btn-text-hover` for hover. This is what the Button atom should use."
          />
          <RuleCard
            title="Light accent surface"
            body="Use `--accent-accent-highlight` with `--accent-accent-text` for lighter accent pills, highlighted labels, and tinted surfaces. The darker same-family text token belongs here, not on every filled button."
          />
        </div>

        <p className="mt-4 max-w-3xl text-text-small text-text-default" style={{ opacity: 0.78 }}>
          In practice: violet and fuschia filled buttons keep light text because the darker same-shade text does not
          pass contrast on the stronger fill. Yellow is the exception because its filled button is light enough to use
          dark text safely.
        </p>
      </section>

      <section>
        <div className="max-w-3xl">
          <h3 className="text-h5 font-bold text-text-default">Approved text-on-color pairs</h3>
          <p className="mt-2 text-text-small text-text-default" style={{ opacity: 0.78 }}>
            These ratios are based on the current design tokens. Use them as a source of truth when evaluating CTA
            text color, highlight pills, and accent surfaces.
          </p>
        </div>

        <div className="mt-6 overflow-x-auto rounded-card" style={{ boxShadow: elevationShadow }}>
          <table className="w-full border-collapse" style={{ backgroundColor: 'var(--bg)' }}>
            <thead>
              <tr style={{ borderBottom: tableRule }}>
                <th className="p-4 text-left text-label uppercase tracking-[0.08em]" style={{ color: 'var(--text)' }}>Pair</th>
                <th className="p-4 text-left text-label uppercase tracking-[0.08em]" style={{ color: 'var(--text)' }}>Preview</th>
                <th className="p-4 text-left text-label uppercase tracking-[0.08em]" style={{ color: 'var(--text)' }}>Contrast</th>
                <th className="p-4 text-left text-label uppercase tracking-[0.08em]" style={{ color: 'var(--text)' }}>Guidance</th>
              </tr>
            </thead>
            <tbody>
              {contrastExamples.map((example) => {
                const ratio = getContrastRatio(example.backgroundValue, example.foregroundValue)

                return (
                  <tr key={example.label} style={{ borderTop: rowRule }}>
                    <td className="p-4 align-top">
                      <div className="text-text-small-semibold text-text-default">{example.label}</div>
                      <div className="mt-1 text-text-xsmall text-text-default" style={{ opacity: 0.65 }}>
                        {example.required}
                      </div>
                    </td>
                    <td className="p-4 align-top">
                      <ContrastPreview example={example} />
                    </td>
                    <td className="p-4 align-top">
                      <div className="flex items-center gap-3">
                        <span className="text-text-small-semibold text-text-default">{ratio.toFixed(2)}:1</span>
                        <ContrastBadge ratio={ratio} />
                      </div>
                    </td>
                    <td className="p-4 align-top">
                      <p className="text-text-small text-text-default" style={{ opacity: 0.78 }}>
                        {example.note}
                      </p>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <div className="max-w-3xl">
          <h3 className="text-h5 font-bold text-text-default">CTA behavior on backgrounds</h3>
          <p className="mt-2 text-text-small text-text-default" style={{ opacity: 0.78 }}>
            The toolbar shows token changes, but teams still need examples of what to do when the surrounding surface
            is quiet, tinted, or already visually loud.
          </p>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-3">
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
            title="Preferred: tinted surface with dark text"
            description="Yellow-tinted backgrounds can work when text stays dark and the CTA still has a clear shape contrast."
            accent="yellow"
            background={surfaceColors.yellowHighlight}
          >
            <span
              className="inline-flex rounded-pill px-4 py-2 text-text-small-semibold"
              style={{ backgroundColor: 'var(--yellow-500)', color: 'var(--dark-900)' }}
            >
              Highlight with dark text
            </span>
            <Button variant="accent">Demander un devis</Button>
          </SurfaceExample>

          <SurfaceExample
            title="Avoid: saturated on saturated"
            description="If the whole block is already loud, do not stack a second strong filled CTA plus extra outline. Reduce intensity or place the CTA in a neutral container."
            accent="fuschia"
            background={surfaceColors.fuschiaHighlight}
          >
            <button
              className="rounded-pill px-5 py-3 text-text-small-semibold"
              style={{
                backgroundColor: 'var(--accent-btn-bg)',
                color: 'var(--accent-btn-text)',
                border: '2px solid var(--fuschia-text)',
              }}
            >
              Too heavy on mobile
            </button>
          </SurfaceExample>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        <RuleCard
          title="Document what to do"
          body="Each component story should explain its role, where it works best, which backgrounds are approved, and which combinations are accessibility-safe."
        />
        <RuleCard
          title="Document what not to do"
          body="Each component story should also show one or two misuse patterns: low-contrast text, duplicated strong CTAs, or decorative borders that make mobile layouts feel heavier than intended."
        />
      </section>
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
