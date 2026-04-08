import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import tokens from '../../tokens.json'
import { DocHeader, DocSection, GuidanceGrid, AccessibilityNote, ContrastBadge } from './doc-components'

// ─── Primitive groups ────────────────────────────────────────────────────────

function primitive(name: keyof typeof tokens.primitives) {
  return tokens.primitives[name]
}

function resolvePrimitiveReference(value: string) {
  const match = value.match(/^\{primitives\.([^}]+)\}$/)
  if (!match) return value
  return primitive(match[1] as keyof typeof tokens.primitives)
}

const brandNeutral = {
  'dark-900':   primitive('dark-900'),
  'dark-800':   primitive('dark-800'),
  'brand-text': primitive('brand-text'),
  'brand-hover': primitive('brand-hover'),
  'light-200':  primitive('light-200'),
  'light-100':  primitive('light-100'),
}

const accentGroups = [
  {
    label: 'Default — Brand baseline',
    accent: 'default',
    description: 'The default Murfy accent uses the dark green brand CTA (`brand-text`) with a darker green hover (`brand-hover`). Pink primitives remain part of the broader brand palette, but the default accent button itself is green and its lighter highlight surfaces resolve to white.',
    primitives: {
      'brand-text':       primitive('brand-text'),
      'brand-hover':      primitive('brand-hover'),
      'pink-mist':        primitive('pink-mist'),
      'pink-vivid-light': primitive('pink-vivid-light'),
      'pink-vivid':       primitive('pink-vivid'),
      'pink-500':         primitive('pink-500'),
      'pink-600':         primitive('pink-600'),
      'pink-accent':      primitive('pink-accent'),
    },
  },
  {
    label: 'Fuschia — Électroménager (réparation)',
    accent: 'fuschia',
    description: 'Fuchsia tones for the appliance repair vertical. Identity color `fuschia-highlight`, CTA `fuschia-700` — both WCAG AA compliant.',
    primitives: {
      'fuschia-highlight': primitive('fuschia-highlight'),
      'fuschia-700':       primitive('fuschia-700'),
      'fuschia-hover':     primitive('fuschia-hover'),
      'fuschia-text':      primitive('fuschia-text'),
    },
  },
  {
    label: 'Violet — Chauffage (entretien)',
    accent: 'violet',
    description: 'Purple tones for the heating vertical. Identity color `purple-500`, CTA `purple-600` — WCAG AA compliant.',
    primitives: {
      'purple-500':  primitive('purple-500'),
      'purple-600':  primitive('purple-600'),
      'purple-hover': primitive('purple-hover'),
      'purple-navy': primitive('purple-navy'),
    },
  },
  {
    label: 'Yellow — Solaire (installation)',
    accent: 'yellow',
    description: 'Yellow tones for the solar energy vertical. The CTA now uses `yellow-btn-bg` (#FFDE73) with a stronger hover step on `yellow-500`, while `yellow-highlight` stays lighter for pills and tinted surfaces.',
    primitives: {
      'yellow-btn-bg':    primitive('yellow-btn-bg'),
      'yellow-highlight': primitive('yellow-highlight'),
      'yellow-500':       primitive('yellow-500'),
      'yellow-hover':     primitive('yellow-hover'),
      'yellow-600':       primitive('yellow-600'),
    },
  },
  {
    label: 'Blue — Formation (nouveau vertical)',
    accent: 'blue',
    description: 'Blue tones for the training vertical. Identity color `blue-highlight`, CTA `blue-btn-bg` — requires `dark-900` text. White text on this CTA fails WCAG (2.10:1).',
    primitives: {
      'blue-highlight': primitive('blue-highlight'),
      'blue-btn-bg':    primitive('blue-btn-bg'),
      'blue-btn-hover': primitive('blue-btn-hover'),
      'blue-navy':      primitive('blue-navy'),
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
  const accentValues = tokens.accents[accent as keyof typeof tokens.accents]

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
          <span className="text-label font-mono text-text" style={{ opacity: 0.5 }}>
            {resolvePrimitiveReference(accentValues[token as keyof typeof accentValues])}
          </span>
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
        style={{ backgroundColor: 'var(--accent-accent-highlight)', color: 'var(--accent-accent-text)' }}
      >
        Highlight pill
      </div>
    </div>
  )
}

// ─── Contrast pairs for accessibility section ─────────────────────────────────

const contrastPairs = [
  { bg: 'pink-vivid',   bgColor: primitive('pink-vivid'), fg: 'brand-text', fgColor: primitive('brand-text'), ratio: '6.1:1',  rating: 'AA'  as const, context: 'Primary button · thème clair (default accent)' },
  { bg: 'brand-text',   bgColor: primitive('brand-text'), fg: 'white', fgColor: primitive('light-100'), ratio: '10.51:1', rating: 'AAA' as const, context: 'Accent CTA par défaut (Murfy green)' },
  { bg: 'fuschia-700',  bgColor: primitive('fuschia-700'), fg: 'white', fgColor: primitive('light-100'), ratio: '4.77:1', rating: 'AA'  as const, context: 'CTA Électroménager (fuschia)' },
  { bg: 'purple-600',   bgColor: primitive('purple-600'), fg: 'white', fgColor: primitive('light-100'), ratio: '5.07:1', rating: 'AA'  as const, context: 'CTA Chauffage (violet)' },
  { bg: 'yellow-btn-bg',bgColor: primitive('yellow-btn-bg'), fg: 'dark-900', fgColor: primitive('dark-900'), ratio: '12.32:1',rating: 'AAA' as const, context: 'CTA Solaire (yellow)' },
  { bg: 'blue-btn-bg',  bgColor: primitive('blue-btn-bg'), fg: 'dark-900', fgColor: primitive('dark-900'), ratio: '7.73:1', rating: 'AAA' as const, context: 'CTA Formation (blue) — texte foncé obligatoire' },
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
                rule: 'Do not use white text on the blue Formation CTA (`blue-btn-bg`).',
                rationale: 'White on `blue-btn-bg` produces only 2.10:1 — a hard WCAG Fail. Always use `dark-900` as the button text color for the blue vertical.',
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
              why="Users with low vision, color blindness, or who are in bright outdoor conditions need sufficient contrast between text and its background. 4.5:1 is the minimum for body-size text. The default primary button uses `pink-vivid` in light theme — 6.1:1 AA — and `pink-500` in dark theme — 5.15:1 AA. All vertical CTAs clear AA. Formation (blue) requires `dark-900` text; white text on `blue-btn-bg` produces only 2.10:1 which is a hard WCAG Fail."
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

// ─── Accent usage guide data ──────────────────────────────────────────────────

const accentTokenDefs = [
  {
    variable: '--accent-btn-bg',
    use: 'CTA button background',
    when: 'Primary action buttons, links styled as buttons',
  },
  {
    variable: '--accent-btn-text',
    use: 'CTA button text color',
    when: 'Text/icons inside the primary CTA — always pair with btn-bg',
  },
  {
    variable: '--accent-btn-bg-hover',
    use: 'CTA button background on hover/focus',
    when: ':hover and :focus-visible states on the primary CTA',
  },
  {
    variable: '--accent-btn-text-hover',
    use: 'CTA button text on hover/focus',
    when: 'Text inside the CTA during hover — usually matches btn-text',
  },
  {
    variable: '--accent-accent-highlight',
    use: 'Tinted surface background',
    when: 'Card tints, section backgrounds, colored banners — lighter than the CTA',
  },
  {
    variable: '--accent-accent-pill-active',
    use: 'Active pill / badge background',
    when: 'Selected state in pill groups, category badges, active nav indicators',
  },
  {
    variable: '--accent-accent-text',
    use: 'Body text on tinted surfaces',
    when: 'Readable text placed on top of accent-highlight or accent-pill-active backgrounds',
  },
]

const accentVerticals = [
  {
    accent: 'default',
    label: 'Default — Brand',
    vertical: 'Murfy.fr generic / brand pages',
    darkText: false,
    note: null,
  },
  {
    accent: 'fuschia',
    label: 'Fuschia — Électroménager',
    vertical: 'Appliance repair section',
    darkText: false,
    note: null,
  },
  {
    accent: 'violet',
    label: 'Violet — Chauffage',
    vertical: 'Heating maintenance section',
    darkText: false,
    note: null,
  },
  {
    accent: 'yellow',
    label: 'Yellow — Solaire',
    vertical: 'Solar energy section',
    darkText: true,
    note: 'Yellow is very light (luminance ~0.93). White text on yellow = 1.1:1 — hard WCAG fail. Always use dark text via var(--accent-btn-text).',
  },
  {
    accent: 'blue',
    label: 'Blue — Formation',
    vertical: 'Training section',
    darkText: true,
    note: 'White text on blue-btn-bg = 2.10:1 — WCAG fail. Always use var(--accent-btn-text) which resolves to dark-900 for this accent.',
  },
]

// ─── Accent usage guide component ─────────────────────────────────────────────

function AccentUsageDoc() {
  return (
    <div className="min-h-screen" style={{ background: 'var(--bg)' }}>
      <DocHeader
        layer="Foundation"
        title="Accent Color Usage Guide"
        description="How to implement the accent color system in components. Covers CSS variable names, what each token is designed for, which accent maps to which vertical, and the rules you must follow when implementing CTAs and tinted surfaces."
      />

      <div className="px-8 py-12 max-w-5xl">

        {/* ── How the system works ──────────────────────────────────────── */}
        <DocSection
          label="How it works"
          subtitle="Accent colors are resolved through a three-layer chain. You write a CSS variable in your component — the active data-accent attribute on a parent element determines what it resolves to."
        >
          <div
            className="rounded-[var(--radius-card)] border border-border px-6 py-5 mb-6"
            style={{ background: 'color-mix(in srgb, var(--accent-btn-bg) 6%, var(--bg))' }}
          >
            <p className="text-text-small text-text mb-4" style={{ opacity: 0.85 }}>
              Set <code className="font-mono text-text-xsmall px-1.5 py-0.5 rounded" style={{ background: 'rgba(0,0,0,0.06)', color: 'var(--text)' }}>data-accent="yellow"</code> on
              a parent element (page root, section wrapper, layout). All child components that
              use <code className="font-mono text-text-xsmall px-1.5 py-0.5 rounded" style={{ background: 'rgba(0,0,0,0.06)', color: 'var(--text)' }}>var(--accent-*)</code> variables
              will automatically pick up that vertical's colors — no per-component changes required.
            </p>
            <div
              className="font-mono text-text-xsmall rounded-[var(--radius-small)] px-5 py-4 overflow-x-auto"
              style={{ background: 'color-mix(in srgb, var(--bg) 60%, var(--border))' }}
            >
              <div className="flex flex-col gap-1 text-text" style={{ opacity: 0.8 }}>
                <span><span style={{ opacity: 0.45 }}>{'// Resolution chain'}</span></span>
                <span>data-accent="yellow"</span>
                <span style={{ opacity: 0.45 }}>{'  → [data-accent="yellow"] { --accent-btn-bg: var(--yellow-btn-bg) }'}</span>
                <span style={{ opacity: 0.45 }}>{'  → var(--yellow-btn-bg) = #FFDE73'}</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Correct usage */}
            <div>
              <p className="text-label uppercase tracking-[0.08em] font-semibold mb-2" style={{ color: '#0B4744' }}>
                Correct — uses CSS variables
              </p>
              <div
                className="font-mono text-text-xsmall rounded-[var(--radius-small)] px-5 py-4 overflow-x-auto"
                style={{ background: 'color-mix(in srgb, var(--bg) 60%, var(--border))' }}
              >
                <pre className="text-text whitespace-pre-wrap m-0" style={{ opacity: 0.85 }}>{`<section data-accent="yellow">
  <button
    style={{
      background: 'var(--accent-btn-bg)',
      color: 'var(--accent-btn-text)',
    }}
  >
    Obtenir un devis
  </button>
</section>`}</pre>
              </div>
            </div>
            {/* Wrong usage */}
            <div>
              <p className="text-label uppercase tracking-[0.08em] font-semibold mb-2" style={{ color: '#D33167' }}>
                Wrong — hardcoded hex
              </p>
              <div
                className="font-mono text-text-xsmall rounded-[var(--radius-small)] px-5 py-4 overflow-x-auto"
                style={{ background: 'color-mix(in srgb, var(--bg) 60%, var(--border))' }}
              >
                <pre className="text-text whitespace-pre-wrap m-0" style={{ opacity: 0.85 }}>{`<button
  style={{
    background: '#FFDE73',
    color: '#032524',
  }}
>
  Obtenir un devis
</button>
{/* Breaks on every other vertical */}`}</pre>
              </div>
            </div>
          </div>
        </DocSection>

        {/* ── Token reference table ─────────────────────────────────────── */}
        <DocSection
          label="Token reference"
          subtitle="All seven accent CSS variables, what they're designed for, and when to reach for each one."
        >
          <div className="overflow-x-auto">
            <table className="w-full text-text-small text-text border-collapse">
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border)' }}>
                  <th className="text-left text-label uppercase tracking-[0.08em] font-semibold pb-3 pr-6" style={{ opacity: 0.5 }}>Variable</th>
                  <th className="text-left text-label uppercase tracking-[0.08em] font-semibold pb-3 pr-6" style={{ opacity: 0.5 }}>Designed for</th>
                  <th className="text-left text-label uppercase tracking-[0.08em] font-semibold pb-3" style={{ opacity: 0.5 }}>When to use</th>
                </tr>
              </thead>
              <tbody>
                {accentTokenDefs.map((row, i) => (
                  <tr
                    key={row.variable}
                    style={{ borderBottom: i < accentTokenDefs.length - 1 ? '1px solid var(--border)' : 'none' }}
                  >
                    <td className="py-3 pr-6 align-top">
                      <code
                        className="font-mono text-text-xsmall px-2 py-0.5 rounded whitespace-nowrap"
                        style={{ background: 'rgba(0,0,0,0.06)', color: 'var(--text)' }}
                      >
                        {row.variable}
                      </code>
                    </td>
                    <td className="py-3 pr-6 align-top" style={{ opacity: 0.85 }}>{row.use}</td>
                    <td className="py-3 align-top text-text-xsmall" style={{ opacity: 0.6 }}>{row.when}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </DocSection>

        {/* ── Per-accent cards ──────────────────────────────────────────── */}
        <DocSection
          label="Accent by vertical"
          subtitle="Live examples of every accent. Each card is isolated — it always shows its own accent regardless of the Storybook toolbar selection."
        >
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {accentVerticals.map(({ accent, label, vertical, darkText, note }) => {
              const accentValues = tokens.accents[accent as keyof typeof tokens.accents]
              return (
                <div
                  key={accent}
                  data-accent={accent}
                  className="rounded-[var(--radius-card)] border border-border p-5 flex flex-col gap-4"
                  style={{ background: 'var(--bg)' }}
                >
                  {/* Header */}
                  <div>
                    <p className="text-text-small-semibold text-text mb-0.5">{label}</p>
                    <p className="text-text-xsmall text-text" style={{ opacity: 0.55 }}>{vertical}</p>
                    <code
                      className="font-mono text-label px-2 py-0.5 rounded mt-2 inline-block"
                      style={{ background: 'color-mix(in srgb, var(--accent-btn-bg) 12%, var(--bg))', color: 'var(--accent-accent-text)' }}
                    >
                      data-accent="{accent}"
                    </code>
                  </div>

                  {/* Live examples */}
                  <div className="flex flex-wrap gap-2 items-center">
                    <button
                      className="px-5 py-2.5 rounded-[var(--radius-pill)] text-text-xsmall-semibold"
                      style={{ background: 'var(--accent-btn-bg)', color: 'var(--accent-btn-text)' }}
                    >
                      CTA default
                    </button>
                    <button
                      className="px-5 py-2.5 rounded-[var(--radius-pill)] text-text-xsmall-semibold"
                      style={{ background: 'var(--accent-btn-bg-hover)', color: 'var(--accent-btn-text-hover)' }}
                    >
                      Hover
                    </button>
                    <div
                      className="px-3 py-1 rounded-[var(--radius-pill)] text-label uppercase tracking-[0.08em]"
                      style={{ background: 'var(--accent-accent-highlight)', color: 'var(--accent-accent-text)' }}
                    >
                      Pill
                    </div>
                  </div>

                  {/* Token values */}
                  <div className="flex flex-col gap-1">
                    {(['btn-bg', 'btn-text', 'accent-highlight'] as const).map(token => (
                      <div key={token} className="flex justify-between items-center gap-2">
                        <span className="font-mono text-label text-text" style={{ opacity: 0.55 }}>--accent-{token}</span>
                        <span
                          className="font-mono text-label px-1.5 py-0.5 rounded"
                          style={{ background: 'rgba(0,0,0,0.06)', color: 'var(--text)' }}
                        >
                          {resolvePrimitiveReference(accentValues[token as keyof typeof accentValues])}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Dark text warning */}
                  {darkText && note && (
                    <div
                      className="rounded-[var(--radius-small)] px-4 py-3 text-text-xsmall"
                      style={{ background: 'color-mix(in srgb, #ff6492 12%, var(--bg))', color: 'var(--text)' }}
                    >
                      <span className="font-semibold">Dark text required. </span>
                      {note}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </DocSection>

        {/* ── When to use each accent ───────────────────────────────────── */}
        <DocSection
          label="When to use each accent"
          subtitle="Map your page or section to its vertical, then set data-accent once on the outermost container. Every component inside inherits it."
        >
          <div className="overflow-x-auto mb-6">
            <table className="w-full text-text-small text-text border-collapse">
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border)' }}>
                  <th className="text-left text-label uppercase tracking-[0.08em] font-semibold pb-3 pr-8" style={{ opacity: 0.5 }}>Page / section context</th>
                  <th className="text-left text-label uppercase tracking-[0.08em] font-semibold pb-3 pr-8" style={{ opacity: 0.5 }}>data-accent value</th>
                  <th className="text-left text-label uppercase tracking-[0.08em] font-semibold pb-3" style={{ opacity: 0.5 }}>Vertical</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { context: 'murfy.fr homepage, brand pages, 404', accent: 'default', vertical: 'Brand baseline (dark green CTA)' },
                  { context: 'Électroménager — réparation, entretien', accent: 'fuschia', vertical: 'Appliance repair' },
                  { context: 'Chauffage — entretien chaudière, clim', accent: 'violet', vertical: 'Heating maintenance' },
                  { context: 'Solaire — installation panneaux', accent: 'yellow', vertical: 'Solar energy' },
                  { context: 'Formation — cours & certifications', accent: 'blue', vertical: 'Training' },
                ].map((row, i, arr) => (
                  <tr key={row.accent} style={{ borderBottom: i < arr.length - 1 ? '1px solid var(--border)' : 'none' }}>
                    <td className="py-3 pr-8 align-top" style={{ opacity: 0.85 }}>{row.context}</td>
                    <td className="py-3 pr-8 align-top">
                      <code
                        className="font-mono text-text-xsmall px-2 py-0.5 rounded"
                        style={{ background: 'rgba(0,0,0,0.06)', color: 'var(--text)' }}
                      >
                        "{row.accent}"
                      </code>
                    </td>
                    <td className="py-3 align-top text-text-xsmall" style={{ opacity: 0.6 }}>{row.vertical}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div
            className="rounded-[var(--radius-card)] border border-border px-5 py-4"
            style={{ background: 'color-mix(in srgb, var(--accent-btn-bg) 5%, var(--bg))' }}
          >
            <p className="text-text-small text-text" style={{ opacity: 0.8 }}>
              <strong>One attribute, whole section.</strong> Set <code className="font-mono text-text-xsmall px-1.5 py-0.5 rounded" style={{ background: 'rgba(0,0,0,0.06)', color: 'var(--text)' }}>data-accent</code> once
              on the outermost element of a section or page — a <code className="font-mono text-text-xsmall px-1.5 py-0.5 rounded" style={{ background: 'rgba(0,0,0,0.06)', color: 'var(--text)' }}>{`<main>`}</code>,
              a <code className="font-mono text-text-xsmall px-1.5 py-0.5 rounded" style={{ background: 'rgba(0,0,0,0.06)', color: 'var(--text)' }}>{`<section>`}</code>, or a layout wrapper.
              Every child component that uses <code className="font-mono text-text-xsmall px-1.5 py-0.5 rounded" style={{ background: 'rgba(0,0,0,0.06)', color: 'var(--text)' }}>var(--accent-*)</code> inherits
              the correct colors automatically via CSS cascade.
            </p>
          </div>
        </DocSection>

        {/* ── Common mistakes ───────────────────────────────────────────── */}
        <DocSection
          label="Common mistakes"
          subtitle="Implementation errors that break the accent system or fail WCAG."
        >
          <GuidanceGrid
            dos={[
              {
                rule: 'Set data-accent once on a parent — let CSS cascade handle children.',
                rationale: 'The CSS variable system cascades automatically. Setting data-accent per-component is redundant and creates drift if the vertical changes.',
              },
              {
                rule: 'Use --accent-accent-highlight (not --accent-btn-bg) for pill and badge backgrounds.',
                rationale: 'The highlight token is a lighter tint calibrated for large surfaces and pills. The btn-bg token is intended for small high-contrast CTAs — at scale it becomes visually overwhelming.',
              },
              {
                rule: 'Always read button text color from var(--accent-btn-text), never hardcode white or dark.',
                rationale: 'Yellow and blue accents require dark text. White text on those accents fails WCAG at 1.1:1 and 2.1:1 respectively — far below the 4.5:1 minimum for normal text.',
                wcag: 'WCAG 2.1 AA 1.4.3',
              },
              {
                rule: 'Test new components at all five accents before shipping.',
                rationale: 'A component that only works with one accent is fragile. The design system is built to serve all verticals — confirm every accent renders correctly.',
              },
            ]}
            donts={[
              {
                rule: 'Do not mix accent colors from different verticals on the same page.',
                rationale: 'Accent colors encode vertical identity. Showing yellow (solaire) CTAs alongside violet (chauffage) navigation confuses users about which service they are on.',
              },
              {
                rule: 'Do not reach for primitives (var(--yellow-btn-bg)) in components.',
                rationale: 'Primitives bypass the accent system. A component using a raw primitive is permanently locked to one vertical and cannot be reused across the system.',
              },
              {
                rule: 'Do not apply --accent-btn-bg as a section or card background.',
                rationale: 'The btn-bg token is calibrated for small, high-contrast interactive elements. As a large background it saturates the page and makes it impossible to visually identify the primary CTA.',
              },
              {
                rule: 'Do not set data-accent on leaf components (buttons, pills, tags).',
                rationale: 'Accent is a context, not a prop. It belongs on layout containers that define a vertical section — not on individual UI elements. Scoping it too narrowly defeats the cascade-based system.',
              },
            ]}
          />
        </DocSection>

      </div>
    </div>
  )
}

// ─── Accent Matrix ────────────────────────────────────────────────────────────

const allAccents: Array<{ accent: string; label: string }> = [
  { accent: 'default', label: 'Default' },
  { accent: 'fuschia', label: 'Fuschia' },
  { accent: 'violet',  label: 'Violet'  },
  { accent: 'yellow',  label: 'Yellow'  },
  { accent: 'blue',    label: 'Blue'    },
]

const matrixTokens: Array<{ token: string; cssVar: string }> = [
  { token: 'btn-bg',             cssVar: '--accent-btn-bg'             },
  { token: 'btn-text',           cssVar: '--accent-btn-text'           },
  { token: 'btn-bg-hover',       cssVar: '--accent-btn-bg-hover'       },
  { token: 'btn-text-hover',     cssVar: '--accent-btn-text-hover'     },
  { token: 'accent-highlight',   cssVar: '--accent-accent-highlight'   },
  { token: 'accent-pill-active', cssVar: '--accent-accent-pill-active' },
  { token: 'accent-text',        cssVar: '--accent-accent-text'        },
]

function MatrixCell({ accent, token }: { accent: string; token: string }) {
  const accentValues = tokens.accents[accent as keyof typeof tokens.accents]
  const rawValue = accentValues[token as keyof typeof accentValues] as string | undefined
  const hex = rawValue ? resolvePrimitiveReference(rawValue) : '#ffffff'
  // extract the primitive name from "{primitives.xxx}"
  const primitiveName = rawValue?.match(/^\{primitives\.([^}]+)\}$/)?.[1] ?? rawValue ?? ''

  return (
    <td className="py-3 px-4 align-top" style={{ borderBottom: '1px solid var(--border)', minWidth: 160 }}>
      <div className="flex items-center gap-2.5">
        <div
          className="shrink-0 w-8 h-8 rounded-[var(--radius-small)] border"
          style={{ backgroundColor: hex, borderColor: 'var(--border)' }}
        />
        <div className="flex flex-col gap-0.5 min-w-0">
          <span
            className="font-mono text-label block truncate"
            style={{ color: 'var(--text)', opacity: 0.75 }}
          >
            {primitiveName}
          </span>
          <span
            className="font-mono text-label block uppercase tracking-[0.04em]"
            style={{ color: 'var(--text)', opacity: 0.45 }}
          >
            {hex}
          </span>
        </div>
      </div>
    </td>
  )
}

function AccentMatrixDoc() {
  return (
    <div className="min-h-screen" style={{ background: 'var(--bg)' }}>
      <DocHeader
        layer="Foundation"
        title="Accent Token Matrix"
        description="Every accent token value across all five verticals — a Webflow-ready reference. Each cell shows the primitive alias and its resolved hex value."
      />

      <div className="px-8 py-12 max-w-[1200px]">

        {/* ── Webflow usage callout ─────────────────────────────────────── */}
        <div
          className="rounded-[var(--radius-card)] border border-border px-6 py-5 mb-10"
          style={{ background: 'color-mix(in srgb, var(--accent-btn-bg) 6%, var(--bg))' }}
        >
          <p className="text-text-small-semibold text-text mb-2">Using this in Webflow</p>
          <ol className="flex flex-col gap-1.5 list-decimal list-inside text-text-small text-text" style={{ opacity: 0.8 }}>
            <li>
              Paste the contents of <code className="font-mono text-text-xsmall px-1.5 py-0.5 rounded" style={{ background: 'rgba(0,0,0,0.06)', color: 'var(--text)' }}>src/styles/tokens.css</code> into{' '}
              <strong>Project Settings → Custom Code → Head Code</strong> (or a site-wide embed).
            </li>
            <li>
              On any Webflow section or div, add a custom attribute:{' '}
              <code className="font-mono text-text-xsmall px-1.5 py-0.5 rounded" style={{ background: 'rgba(0,0,0,0.06)', color: 'var(--text)' }}>data-accent</code>{' '}
              = <code className="font-mono text-text-xsmall px-1.5 py-0.5 rounded" style={{ background: 'rgba(0,0,0,0.06)', color: 'var(--text)' }}>yellow</code>{' '}
              (or <code className="font-mono text-text-xsmall px-1.5 py-0.5 rounded" style={{ background: 'rgba(0,0,0,0.06)', color: 'var(--text)' }}>fuschia</code> · <code className="font-mono text-text-xsmall px-1.5 py-0.5 rounded" style={{ background: 'rgba(0,0,0,0.06)', color: 'var(--text)' }}>violet</code> · <code className="font-mono text-text-xsmall px-1.5 py-0.5 rounded" style={{ background: 'rgba(0,0,0,0.06)', color: 'var(--text)' }}>blue</code> · <code className="font-mono text-text-xsmall px-1.5 py-0.5 rounded" style={{ background: 'rgba(0,0,0,0.06)', color: 'var(--text)' }}>default</code>).
            </li>
            <li>
              In your element styles, use the CSS variables from the table below (e.g.{' '}
              <code className="font-mono text-text-xsmall px-1.5 py-0.5 rounded" style={{ background: 'rgba(0,0,0,0.06)', color: 'var(--text)' }}>background-color: var(--accent-btn-bg)</code>).
              All children inherit the active accent automatically via CSS cascade.
            </li>
          </ol>
        </div>

        {/* ── Matrix table ──────────────────────────────────────────────── */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse" style={{ minWidth: 860 }}>
            <thead>
              <tr style={{ borderBottom: '2px solid var(--border)' }}>
                {/* Row label header */}
                <th
                  className="text-left text-label uppercase tracking-[0.08em] font-semibold pb-3 pr-6 pl-2 align-bottom"
                  style={{ opacity: 0.5, color: 'var(--text)', minWidth: 230 }}
                >
                  CSS Variable
                </th>
                {allAccents.map(({ accent, label }) => (
                  <th
                    key={accent}
                    className="pb-3 px-4 text-left align-bottom"
                    style={{ minWidth: 160 }}
                  >
                    <div className="flex items-center gap-2">
                      {/* Live color dot using CSS var — needs data-accent isolation */}
                      <div
                        data-accent={accent}
                        className="w-3.5 h-3.5 rounded-full shrink-0 border"
                        style={{ backgroundColor: 'var(--accent-btn-bg)', borderColor: 'var(--border)' }}
                      />
                      <span
                        className="text-label uppercase tracking-[0.08em] font-semibold"
                        style={{ color: 'var(--text)', opacity: 0.65 }}
                      >
                        {label}
                      </span>
                    </div>
                    <code
                      className="font-mono text-label block mt-1 px-1.5 py-0.5 rounded w-fit"
                      style={{ background: 'rgba(0,0,0,0.06)', color: 'var(--text)', opacity: 0.55 }}
                    >
                      data-accent="{accent}"
                    </code>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {matrixTokens.map(({ token, cssVar }, rowIdx) => (
                <tr
                  key={token}
                  style={{
                    background: rowIdx % 2 === 0 ? 'transparent' : 'color-mix(in srgb, var(--border) 20%, var(--bg))',
                  }}
                >
                  {/* Row label */}
                  <td className="py-3 pl-2 pr-6 align-middle" style={{ borderBottom: '1px solid var(--border)' }}>
                    <code
                      className="font-mono text-text-xsmall px-2 py-0.5 rounded whitespace-nowrap"
                      style={{ background: 'rgba(0,0,0,0.06)', color: 'var(--text)' }}
                    >
                      {cssVar}
                    </code>
                  </td>
                  {/* Cells per accent */}
                  {allAccents.map(({ accent }) => (
                    <MatrixCell key={accent} accent={accent} token={token} />
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* ── Legend ────────────────────────────────────────────────────── */}
        <div
          className="mt-8 rounded-[var(--radius-card)] border border-border px-6 py-4 flex flex-wrap gap-x-8 gap-y-2"
          style={{ background: 'color-mix(in srgb, var(--border) 15%, var(--bg))' }}
        >
          <div className="flex items-start gap-2 text-text-xsmall text-text" style={{ opacity: 0.7 }}>
            <span className="font-semibold shrink-0">Primitive name</span>
            <span>— the token alias in <code className="font-mono text-label px-1 py-0.5 rounded" style={{ background: 'rgba(0,0,0,0.08)' }}>tokens.json</code> (e.g. <code className="font-mono text-label">brand-text</code>)</span>
          </div>
          <div className="flex items-start gap-2 text-text-xsmall text-text" style={{ opacity: 0.7 }}>
            <span className="font-semibold shrink-0">Hex</span>
            <span>— the resolved hex value from <code className="font-mono text-label px-1 py-0.5 rounded" style={{ background: 'rgba(0,0,0,0.08)' }}>tokens.json → primitives</code></span>
          </div>
          <div className="flex items-start gap-2 text-text-xsmall text-text" style={{ opacity: 0.7 }}>
            <span className="font-semibold shrink-0">Note on yellow &amp; blue</span>
            <span>— <code className="font-mono text-label">btn-text</code> resolves to <code className="font-mono text-label">dark-900</code> (dark) for WCAG compliance. White text on these accents fails contrast.</span>
          </div>
        </div>

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
export const AccentUsage: Story = { render: () => <AccentUsageDoc /> }
export const AccentMatrix: Story = { render: () => <AccentMatrixDoc /> }
