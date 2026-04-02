import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Button } from './Button'
import { DocHeader, DocSection, GuidanceGrid, AccessibilityNote } from '../../Foundation/doc-components'

const meta: Meta<typeof Button> = {
  title: 'Atoms/Button',
  component: Button,
  parameters: { layout: 'fullscreen' },
  argTypes: {
    variant: { control: 'select', options: ['primary', 'secondary', 'accent'] },
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    disabled: { control: 'boolean' },
  },
}
export default meta
type Story = StoryObj<typeof Button>

// ─── Layout helpers ───────────────────────────────────────────────────────────

function DocRow({ title, description, children }: { title: string; description: string; children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-6 border-t border-border">
      <div>
        <h4 className="text-text-small-semibold text-text">{title}</h4>
        <p className="text-text-xsmall text-text mt-1 leading-relaxed" style={{ opacity: 0.65 }}>{description}</p>
      </div>
      <div className="md:col-span-2 flex flex-wrap items-center gap-3">
        {children}
      </div>
    </div>
  )
}

function SurfacePreview({
  title, description, accent, backgroundColor, children,
}: {
  title: string; description: string; accent: 'default' | 'violet' | 'yellow' | 'fuschia'; backgroundColor: string; children: React.ReactNode
}) {
  return (
    <div
      data-theme="light"
      data-accent={accent}
      className="rounded-[var(--radius-card)] p-6"
      style={{ backgroundColor, boxShadow: '0 2px 16px rgba(0,0,0,0.06)' }}
    >
      <h4 className="text-h6 font-bold text-text">{title}</h4>
      <p className="mt-2 text-text-small text-text" style={{ opacity: 0.78 }}>{description}</p>
      <div className="mt-5 flex flex-wrap items-center gap-3">{children}</div>
    </div>
  )
}

// ─── Overview ────────────────────────────────────────────────────────────────

export const Overview: Story = {
  render: () => (
    <div className="min-h-screen" style={{ background: 'var(--bg)' }}>
      <DocHeader
        layer="Atoms"
        title="Button"
        description="Three variants cover every CTA context on the site. All colors are driven by CSS variables — switch Theme or Accent in the toolbar to see them update live."
      />

      <div className="px-8 py-12 max-w-5xl">

        {/* ── Showcase ──────────────────────────────────────────────────── */}
        <DocSection
          label="Showcase"
          subtitle="Three variants × three sizes × disabled state. One main action per view."
        >

          <section className="mb-10">
            <h3 className="text-text-small-semibold text-text mb-1">Primary</h3>
            <p className="text-text-xsmall text-text mb-4 max-w-xl" style={{ opacity: 0.65 }}>
              Strongest visual weight. Use for the single main action on a page — booking, submitting a form.
              Only one Primary button should appear per view.
            </p>
            <DocRow title="Small" description="Inline CTAs, inside cards or compact layouts.">
              <Button variant="primary" size="sm">Prendre rendez-vous</Button>
            </DocRow>
            <DocRow title="Medium" description="Default size for most contexts.">
              <Button variant="primary" size="md">Prendre rendez-vous</Button>
            </DocRow>
            <DocRow title="Large" description="Hero sections and prominent page headers.">
              <Button variant="primary" size="lg">Prendre rendez-vous</Button>
            </DocRow>
            <DocRow title="Disabled" description="Action is not available. Communicates state without removing the button.">
              <Button variant="primary" size="md" disabled>Indisponible</Button>
            </DocRow>
          </section>

          <section className="mb-10">
            <h3 className="text-text-small-semibold text-text mb-1">Secondary</h3>
            <p className="text-text-xsmall text-text mb-4 max-w-xl" style={{ opacity: 0.65 }}>
              Outlined, lower visual weight. Use alongside a Primary for a secondary action — "En savoir plus", "Voir les détails".
              Transparent background lets it sit on any surface without clashing.
            </p>
            <DocRow title="Small" description="Paired with small primary buttons or used in lists.">
              <Button variant="secondary" size="sm">En savoir plus</Button>
            </DocRow>
            <DocRow title="Medium" description="Default pairing with a medium primary.">
              <Button variant="secondary" size="md">En savoir plus</Button>
            </DocRow>
            <DocRow title="Large" description="Used in hero sections alongside a large primary.">
              <Button variant="secondary" size="lg">En savoir plus</Button>
            </DocRow>
            <DocRow title="Disabled" description="Secondary action is unavailable.">
              <Button variant="secondary" size="md" disabled>Indisponible</Button>
            </DocRow>
          </section>

          <section>
            <h3 className="text-text-small-semibold text-text mb-1">Accent</h3>
            <p className="text-text-xsmall text-text mb-4 max-w-xl" style={{ opacity: 0.65 }}>
              Filled with the vertical's accent color — pink for électroménager, purple for chauffage, yellow for solaire.
              Use for vertical-specific CTAs. <strong>Switch the Accent toolbar</strong> to see it update live.
            </p>
            <DocRow title="Small" description="Compact accent CTA, inside vertical-specific cards.">
              <Button variant="accent" size="sm">Accent CTA</Button>
            </DocRow>
            <DocRow title="Medium" description="Default accent button size.">
              <Button variant="accent" size="md">Accent CTA</Button>
            </DocRow>
            <DocRow title="Large" description="Prominent vertical CTA in hero or landing sections.">
              <Button variant="accent" size="lg">Accent CTA</Button>
            </DocRow>
            <DocRow title="Disabled" description="Accent action unavailable.">
              <Button variant="accent" size="md" disabled>Indisponible</Button>
            </DocRow>

            <div className="mt-6">
              <p className="text-text-xsmall-semibold text-text mb-3" style={{ opacity: 0.7 }}>All variants together — typical CTA group</p>
              <div className="flex flex-wrap gap-3">
                <Button variant="primary">Prendre rendez-vous</Button>
                <Button variant="secondary">En savoir plus</Button>
                <Button variant="accent">Accent CTA</Button>
              </div>
            </div>
          </section>
        </DocSection>

        {/* ── Buttons on surfaces ───────────────────────────────────────── */}
        <DocSection
          label="Buttons on backgrounds"
          subtitle="The same button can feel right or wrong depending on its surrounding surface. These examples show the practical rule of thumb."
        >
          <div className="grid gap-4 md:grid-cols-3">
            <SurfacePreview
              title="Preferred: neutral surface"
              description="The filled CTA is the main point of contrast, so it remains clear and scannable."
              accent="default"
              backgroundColor="var(--light-100)"
            >
              <Button variant="primary">Prendre rendez-vous</Button>
              <Button variant="secondary">En savoir plus</Button>
            </SurfacePreview>

            <SurfacePreview
              title="Preferred: soft tint"
              description="Accent CTAs can sit on a tinted surface when the button still has a distinct silhouette and readable text."
              accent="violet"
              backgroundColor="var(--light-200)"
            >
              <Button variant="accent">Demander un devis</Button>
              <Button variant="secondary">Voir les details</Button>
            </SurfacePreview>

            <SurfacePreview
              title="Avoid: loud surface + loud CTA"
              description="When the surface is already saturated, a second strong fill plus an extra outline feels heavy on mobile."
              accent="fuschia"
              backgroundColor="var(--fuschia-highlight)"
            >
              <button
                className="rounded-[var(--radius-pill)] px-6 py-3 text-text-small-semibold"
                style={{ backgroundColor: 'var(--fuschia-700)', color: 'var(--light-100)', border: '2px solid var(--fuschia-text)' }}
              >
                Too heavy
              </button>
            </SurfacePreview>
          </div>
        </DocSection>

        {/* ── Best Practices ────────────────────────────────────────────── */}
        <DocSection label="Best Practices" subtitle="Usage rules for button hierarchy, variant selection, and surface pairing.">
          <GuidanceGrid
            dos={[
              {
                rule: 'Keep one filled primary action per viewport when possible.',
                rationale: 'Multiple filled CTAs compete for attention equally, which makes the main action harder to find. Users benefit from a clear visual hierarchy — one loud action, one quieter one.',
              },
              {
                rule: 'Use Accent only when the vertical meaning matters.',
                rationale: 'Accent buttons signal which vertical the CTA belongs to. Using accent in a context-neutral UI element (like a modal close) creates false vertical signaling.',
              },
              {
                rule: 'Prefer neutral or softly tinted backgrounds for filled CTAs.',
                rationale: 'Filling a CTA on a neutral surface makes the button the single point of saturation — maximum visual priority with minimum noise.',
              },
              {
                rule: 'On yellow surfaces, always verify that CTA text remains dark.',
                rationale: 'Yellow is a light color (luminance ~0.93). White text on yellow fails WCAG AA at roughly 1.1:1. The yellow accent token pre-sets dark text, but custom implementations must be verified.',
                wcag: 'WCAG 2.1 AA 1.4.3',
              },
            ]}
            donts={[
              {
                rule: 'Do not stack a saturated accent button on an equally saturated background without extra separation.',
                rationale: 'When both the surface and button are highly saturated, the button loses shape contrast and legibility drops — especially on mobile where users scan quickly.',
              },
              {
                rule: 'Do not add a dark outline around a filled CTA to make it "stand out".',
                rationale: 'Adding a border to a filled button introduces a third competing edge in the visual layer alongside card borders and dividers. Use fill weight and surface contrast for differentiation, not extra borders.',
              },
              {
                rule: 'Do not show multiple filled CTAs with equal emphasis in the same mobile block.',
                rationale: 'On a small screen, two equally loud CTAs fight for eye movement and touch area. One should visually dominate; the second should be quieter (secondary or text-only).',
              },
              {
                rule: 'Do not rely on the toolbar alone to decide whether a color pairing is safe.',
                rationale: 'The toolbar shows the token in isolation. Check Foundation/Accessibility Guidelines for the measured contrast ratio before shipping any new variant × accent × surface combination.',
              },
            ]}
          />
        </DocSection>

        {/* ── Contrast table ────────────────────────────────────────────── */}
        <DocSection
          label="Contrast & WCAG Compliance"
          subtitle="Measured ratios for each variant across all accent contexts. Computed from actual token values in tokens.css."
        >
          <div className="overflow-x-auto rounded-[var(--radius-card)] border border-border mb-4">
            <table className="w-full text-text-small text-text" style={{ borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ backgroundColor: 'color-mix(in srgb, var(--accent-btn-bg) 5%, var(--bg))', borderBottom: '1px solid var(--border)' }}>
                  {['Variant', 'Context', 'BG', 'Text', 'Ratio', 'Rating'].map(h => (
                    <th key={h} className="px-4 py-3 text-left text-label uppercase tracking-[0.08em] text-text" style={{ opacity: 0.5 }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  { variant: 'Primary', context: 'Light theme', bg: 'var(--pink-vivid)', bgLabel: 'pink-vivid', text: 'var(--brand-text)', textLabel: 'brand-text', ratio: '6.1:1', rating: 'AA', warn: false },
                  { variant: 'Primary', context: 'Dark theme', bg: 'var(--pink-500)', bgLabel: 'pink-500', text: 'var(--brand-text)', textLabel: 'brand-text', ratio: '4.7:1', rating: 'AA', warn: false },
                  { variant: 'Secondary', context: 'Light bg', bg: 'transparent → white', bgLabel: '', text: 'var(--brand-text)', textLabel: 'brand-text', ratio: '9.1:1', rating: 'AAA', warn: false },
                  { variant: 'Accent', context: 'Default', bg: 'var(--brand-text)', bgLabel: 'brand-text', text: 'var(--light-100)', textLabel: 'white', ratio: '9.1:1', rating: 'AAA', warn: false },
                  { variant: 'Accent', context: 'Violet', bg: 'var(--purple-600)', bgLabel: 'purple-600', text: 'var(--light-100)', textLabel: 'white', ratio: '5.07:1', rating: 'AA', warn: false },
                  { variant: 'Accent', context: 'Yellow', bg: 'var(--yellow-btn-bg)', bgLabel: 'yellow-btn-bg', text: 'var(--dark-900)', textLabel: 'dark-900', ratio: '12.32:1', rating: 'AAA', warn: false },
                  { variant: 'Accent', context: 'Fuschia', bg: 'var(--fuschia-700)', bgLabel: 'fuschia-700', text: 'var(--light-100)', textLabel: 'white', ratio: '4.77:1', rating: 'AA', warn: false },
                  { variant: 'Accent', context: 'Blue (Formation)', bg: 'var(--blue-btn-bg)', bgLabel: 'blue-btn-bg', text: 'var(--dark-900)', textLabel: 'dark-900', ratio: '7.73:1', rating: 'AAA', warn: false },
                ].map((row, i) => (
                  <tr key={i} style={{ backgroundColor: i % 2 === 0 ? 'var(--bg)' : 'color-mix(in srgb, var(--border) 30%, var(--bg))', borderBottom: '1px solid var(--border)' }}>
                    <td className="px-4 py-3 text-text-small-semibold">{row.variant}</td>
                    <td className="px-4 py-3 text-text-small" style={{ opacity: 0.8 }}>{row.context}</td>
                    <td className="px-4 py-3">
                      <span className="inline-flex items-center gap-2">
                        <span className="inline-block rounded-sm w-3.5 h-3.5 border border-border" style={{ backgroundColor: row.bg === 'transparent → white' ? 'var(--light-100)' : row.bg, flexShrink: 0 }} />
                        <code className="text-label font-mono" style={{ opacity: 0.7 }}>{row.bgLabel || row.bg}</code>
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span className="inline-flex items-center gap-2">
                        <span className="inline-block rounded-sm w-3.5 h-3.5 border border-border" style={{ backgroundColor: row.text, flexShrink: 0 }} />
                        <code className="text-label font-mono" style={{ opacity: 0.7 }}>{row.textLabel}</code>
                      </span>
                    </td>
                    <td className="px-4 py-3 text-text-small-semibold">{row.ratio}</td>
                    <td className="px-4 py-3">
                      <span
                        className="inline-block rounded-[var(--radius-pill)] px-2 py-0.5 text-label uppercase tracking-[0.08em]"
                        style={{
                          backgroundColor: row.warn ? '#fff0c0' : row.rating === 'AAA' ? '#d1fae5' : '#dbeafe',
                          color: row.warn ? '#7a4a00' : row.rating === 'AAA' ? '#065f46' : '#1e40af',
                        }}
                      >
                        {row.rating}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex flex-col gap-4">
            <AccessibilityNote
              criterion="WCAG 2.1 AA 1.4.3 — Contrast (Minimum)"
              requirement="4.5:1 for button label text · 3:1 for button boundary against surrounding surface"
              why="Button label text counts as normal text regardless of button size — it must meet 4.5:1. The button shape itself (boundary vs. background) must meet 3:1 under WCAG 1.4.11. The secondary button's outlined border at low opacity on a neutral surface may approach this threshold — always check before using secondary on a non-white background."
              href="https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum.html"
            />
            <AccessibilityNote
              criterion="WCAG 2.1 AA 2.5.5 — Target Size"
              requirement="Interactive targets must be at least 44×44 CSS pixels"
              why="Buttons use a minimum height of 44px (medium/large) so they're reachable for users with motor impairments or who use touch devices. The small size (sm) may fall below 44px — use it only for non-primary actions inside dense, touch-free contexts (data tables, inline actions in forms)."
              href="https://www.w3.org/WAI/WCAG21/Understanding/target-size.html"
            />
          </div>
        </DocSection>

      </div>
    </div>
  ),
}

// ─── Playground ───────────────────────────────────────────────────────────────

export const Playground: Story = {
  args: { children: 'Prendre rendez-vous', variant: 'primary', size: 'md' },
}
