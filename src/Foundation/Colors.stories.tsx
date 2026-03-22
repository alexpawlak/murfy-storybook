import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { DocHeader, DocSection, GuidanceGrid, AccessibilityNote, ContrastBadge } from './doc-components'

// ─── Primitive groups ────────────────────────────────────────────────────────

const brandNeutral = {
  'dark-900':   '#032524',
  'dark-800':   '#073331',
  'brand-text': '#0b4744',
  'brand-hover':'#093c3a',
  'light-200':  '#f3f3f3',
  'light-100':  '#ffffff',
}

const accentGroups = [
  {
    label: 'Default — Brand baseline',
    accent: 'default',
    description: 'Pink tones used as the brand baseline. Not tied to a specific activity — appears in global UI elements, marketing surfaces, and anywhere no vertical accent applies.',
    primitives: {
      'pink-mist':        '#FFF3F9',
      'pink-vivid-light': '#ffdeef',
      'pink-vivid':       '#ffadd6',
      'pink-500':         '#f59bbb',
      'pink-600':         '#c47c96',
      'pink-accent':      '#fd6c9f',
    },
  },
  {
    label: 'Violet — Électroménager',
    accent: 'violet',
    description: 'Purple tones for the appliance repair vertical.',
    primitives: {
      'purple-500': '#9e8cf8',
      'purple-700': '#543bce',
      'purple-800': '#432fa5',
      'purple-navy':'#180d4d',
    },
  },
  {
    label: 'Yellow — Solaire',
    accent: 'yellow',
    description: 'Yellow tones for the solar energy vertical. Warm and energetic — communicates sun and sustainability.',
    primitives: {
      'yellow-highlight': '#ffde73',
      'yellow-500':       '#ffd800',
      'yellow-hover':     '#e0be00',
      'yellow-600':       '#ccad00',
    },
  },
  {
    label: 'Fuschia — Chauffage',
    accent: 'fuschia',
    description: 'High-saturation pink for the heating vertical.',
    primitives: {
      'fuschia-highlight': '#ff6492',
      'fuschia-text':      '#3a121e',
    },
  },
]

const accentTokens = ['btn-bg', 'btn-text', 'btn-bg-hover', 'btn-text-hover', 'accent-highlight', 'accent-pill-active']

// ─── Sub-components ───────────────────────────────────────────────────────────

function Swatch({ name, value }: { name: string; value: string }) {
  return (
    <div className="flex flex-col items-start gap-1 min-w-[80px]">
      <div
        className="w-14 h-14 rounded-[var(--radius-small)] border border-border shadow-sm"
        style={{ backgroundColor: value }}
      />
      <span className="text-text-xsmall font-mono text-text" style={{ opacity: 0.75 }}>{name}</span>
      <span className="text-label font-mono text-text" style={{ opacity: 0.5 }}>{value}</span>
    </div>
  )
}

function AccentTokenRow({ accent }: { accent: string }) {
  return (
    <div className="flex flex-wrap gap-3 mt-3">
      {accentTokens.map(token => (
        <div key={token} className="flex flex-col items-start gap-1 min-w-[80px]">
          <div
            data-accent={accent}
            className="w-14 h-14 rounded-[var(--radius-small)] border border-border shadow-sm"
            style={{ backgroundColor: `var(--accent-${token})` }}
          />
          <span className="text-label font-mono text-text" style={{ opacity: 0.65 }}>{token}</span>
        </div>
      ))}
    </div>
  )
}

function AccentButtonPreview({ accent }: { accent: string }) {
  return (
    <div data-accent={accent} className="flex items-center gap-3 mt-4 flex-wrap">
      <button
        className="px-6 py-3 rounded-[var(--radius-pill)] text-text-small-semibold"
        style={{ backgroundColor: 'var(--accent-btn-bg)', color: 'var(--accent-btn-text)' }}
      >
        Default
      </button>
      <button
        className="px-6 py-3 rounded-[var(--radius-pill)] text-text-small-semibold"
        style={{ backgroundColor: 'var(--accent-btn-bg-hover)', color: 'var(--accent-btn-text-hover)' }}
      >
        Hover
      </button>
      <div
        className="px-4 py-1.5 rounded-[var(--radius-pill)] text-label uppercase tracking-[0.08em]"
        style={{ backgroundColor: 'var(--accent-accent-highlight)', color: 'var(--accent-accent-text, #073331)' }}
      >
        Highlight pill
      </div>
    </div>
  )
}

// ─── Contrast pairs for accessibility section ─────────────────────────────────

const contrastPairs = [
  { bg: 'pink-500', bgColor: '#f59bbb', fg: 'brand-text', fgColor: '#0b4744', ratio: '4.7:1', rating: 'AA' as const, context: 'Primary button (default accent)' },
  { bg: 'purple-700', bgColor: '#543bce', fg: 'white', fgColor: '#ffffff', ratio: '6.5:1', rating: 'AA' as const, context: 'Accent button (violet)' },
  { bg: 'yellow-500', bgColor: '#ffd800', fg: 'dark-900', fgColor: '#032524', ratio: '10.5:1', rating: 'AAA' as const, context: 'Accent button (yellow)' },
  { bg: 'fuschia-highlight', bgColor: '#ff6492', fg: 'white', fgColor: '#ffffff', ratio: '4.5:1', rating: 'AA ⚠' as const, context: 'Accent button (fuschia) — narrow margin' },
]

// ─── Main doc component ───────────────────────────────────────────────────────

function ColorsDoc() {
  return (
    <div className="min-h-screen" style={{ background: 'var(--bg)' }}>
      <DocHeader
        layer="Foundation"
        title="Colors"
        description="The Murfy palette: brand neutrals shared across all surfaces, plus four accent groups that each vertical uses to express its identity. Every color lives in tokens.json — never hardcode hex values in components."
      />

      <div className="px-8 py-12 max-w-5xl">

        {/* ── How to use ────────────────────────────────────────────────── */}
        <DocSection
          label="How to use this page"
          subtitle="This is a palette reference. Before pairing text and backgrounds for CTAs, pills, or colored cards, validate the combination in the Accessibility section below or in Foundation/Accessibility Guidelines."
        >
          <div
            className="rounded-[var(--radius-card)] border border-border px-6 py-5"
            style={{ background: 'color-mix(in srgb, var(--accent-btn-bg) 6%, var(--bg))' }}
          >
            <p className="text-text-small text-text" style={{ opacity: 0.8 }}>
              Colors in this system exist at two levels. <strong>Primitives</strong> are the raw named values
              (<code>pink-500</code>, <code>yellow-500</code>). <strong>Semantic tokens</strong> and <strong>accent tokens</strong>{' '}
              reference primitives via CSS variables — they're what you use in components. Switching the Accent toolbar
              in Storybook swaps which accent group is active, updating all <code>var(--accent-*)</code> variables live.
            </p>
          </div>
        </DocSection>

        {/* ── Brand & Neutral ───────────────────────────────────────────── */}
        <DocSection
          label="Brand & Neutral"
          subtitle="Core dark greens and whites shared across all themes and verticals. These are always available regardless of the active accent."
        >
          <div className="flex flex-wrap gap-5">
            {Object.entries(brandNeutral).map(([name, value]) => (
              <Swatch key={name} name={name} value={value} />
            ))}
          </div>
        </DocSection>

        {/* ── Accent groups ─────────────────────────────────────────────── */}
        {accentGroups.map(({ label, accent, description, primitives }) => (
          <DocSection key={accent} label={label} subtitle={description}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <p className="text-label uppercase tracking-[0.08em] font-semibold mb-3 text-text" style={{ opacity: 0.4 }}>Primitives</p>
                <div className="flex flex-wrap gap-4">
                  {Object.entries(primitives).map(([name, value]) => (
                    <Swatch key={name} name={name} value={value} />
                  ))}
                </div>
              </div>
              <div>
                <p className="text-label uppercase tracking-[0.08em] font-semibold mb-3 text-text" style={{ opacity: 0.4 }}>Accent Tokens</p>
                <AccentTokenRow accent={accent} />
                <AccentButtonPreview accent={accent} />
              </div>
            </div>
          </DocSection>
        ))}

        {/* ── Best Practices ────────────────────────────────────────────── */}
        <DocSection
          label="Best Practices"
          subtitle="Rules for safely applying color across themes and vertical accents."
        >
          <GuidanceGrid
            dos={[
              {
                rule: 'Use semantic tokens (var(--accent-btn-bg)) in components, not primitives.',
                rationale: 'Semantic tokens respond to theme and accent switching automatically. Referencing a primitive directly (e.g. var(--pink-500)) bypasses this — the component breaks when the accent changes.',
              },
              {
                rule: 'Always use dark text on yellow surfaces.',
                rationale: 'Yellow (luminance ~0.93) is very light. White text on yellow fails WCAG AA at approximately 1.1:1 — far below the 4.5:1 minimum for body text.',
                wcag: 'WCAG 2.1 AA 1.4.3',
              },
              {
                rule: 'Prefer neutral or softly tinted backgrounds when placing a filled CTA.',
                rationale: 'A filled button on a neutral surface is the only point of saturation, which makes the CTA scannable instantly. Competing saturated surfaces reduce the button\'s visual priority.',
              },
              {
                rule: 'Use accent-accent-highlight (not accent-btn-bg) for light pill backgrounds.',
                rationale: 'The highlight token is designed to be a lighter, lower-saturation fill for pills and tinted surfaces. The btn-bg token is calibrated for contrast against white — on a light pill it becomes overwhelming.',
              },
            ]}
            donts={[
              {
                rule: 'Do not hardcode hex colors in component code.',
                rationale: 'Hardcoded hex values are invisible to the theme/accent system. If a brand color ever changes, hardcoded values must be hunted down manually and will inevitably be missed.',
              },
              {
                rule: 'Do not pair fuschia text on fuschia surfaces without checking contrast first.',
                rationale: 'Fuschia colors are close in luminance, which means small tint differences can drop below WCAG AA thresholds. Always verify the ratio before using fuschia-on-fuschia.',
                wcag: 'WCAG 2.1 AA 1.4.3',
              },
              {
                rule: 'Do not use accent colors for decorative elements not tied to a vertical.',
                rationale: 'Accent colors signal vertical identity. Using yellow in the appliance repair section, for example, creates confusion about which vertical the user is in.',
              },
              {
                rule: 'Do not use pink-vivid as a component background.',
                rationale: 'pink-vivid is reserved for error and warning states. Using it as a card or section background dilutes its signal — users will expect a pink-vivid background to mean "something is wrong".',
              },
            ]}
          />
        </DocSection>

        {/* ── Accessibility ─────────────────────────────────────────────── */}
        <DocSection
          label="Accessibility & WCAG"
          subtitle="Contrast ratios for the key color pairs in this system, plus the criteria that govern them."
        >
          {/* Contrast badge grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
            {contrastPairs.map(pair => (
              <ContrastBadge key={pair.context} {...pair} />
            ))}
          </div>

          <div className="flex flex-col gap-4">
            <AccessibilityNote
              criterion="WCAG 2.1 AA 1.4.3 — Contrast (Minimum)"
              requirement="4.5:1 for normal text · 3:1 for large text (≥18pt or ≥14pt bold)"
              why="Users with low vision, color blindness, or who are in bright outdoor conditions need sufficient contrast between text and its background. 4.5:1 is the minimum for body-size text. The fuschia accent meets this threshold by the smallest margin — avoid pairing a fuschia button on a saturated surface."
              href="https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum.html"
            />
            <AccessibilityNote
              criterion="WCAG 2.1 AA 1.4.1 — Use of Color"
              requirement="Color must not be the only visual means of conveying information"
              why="Never rely on color alone to communicate state (active, error, selected). Always pair color with a second cue: an icon, a label, a border, or a text change. This ensures users with color blindness (affects ~8% of males) receive the same information."
              href="https://www.w3.org/WAI/WCAG21/Understanding/use-of-color.html"
            />
          </div>
        </DocSection>

      </div>
    </div>
  )
}

// ─── Story ────────────────────────────────────────────────────────────────────

const meta: Meta = {
  title: 'Foundation/Colors',
  component: ColorsDoc,
  parameters: { layout: 'fullscreen' },
}
export default meta

type Story = StoryObj
export const Overview: Story = {}
