import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Button } from './Button'

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

/** Two-column doc row: description left, examples right */
function DocRow({ title, description, children }: { title: string; description: string; children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-6 border-t border-border">
      <div>
        <h4 className="text-sm font-semibold">{title}</h4>
        <p className="text-sm text-text-2 mt-1 leading-relaxed">{description}</p>
      </div>
      <div className="md:col-span-2 flex flex-wrap items-center gap-3">
        {children}
      </div>
    </div>
  )
}

function GuidanceColumn({
  title,
  items,
  tone = 'default',
}: {
  title: string
  items: string[]
  tone?: 'default' | 'warning'
}) {
  return (
    <div
      className="rounded-card p-6"
      style={{
        backgroundColor: tone === 'warning' ? 'var(--pink-vivid)' : 'var(--bg-2)',
        boxShadow: '0 2px 16px rgba(0,0,0,0.06)',
      }}
    >
      <h4 className="text-h6 font-bold text-text-default">{title}</h4>
      <ul className="mt-4 flex flex-col gap-3">
        {items.map((item) => (
          <li key={item} className="text-text-small text-text-default" style={{ opacity: 0.8 }}>
            {item}
          </li>
        ))}
      </ul>
    </div>
  )
}

function SurfacePreview({
  title,
  description,
  accent,
  backgroundColor,
  children,
}: {
  title: string
  description: string
  accent: 'default' | 'violet' | 'yellow' | 'fuschia'
  backgroundColor: string
  children: React.ReactNode
}) {
  return (
    <div
      data-theme="light"
      data-accent={accent}
      className="rounded-card p-6"
      style={{ backgroundColor, boxShadow: '0 2px 16px rgba(0,0,0,0.06)' }}
    >
      <h4 className="text-h6 font-bold text-text-default">{title}</h4>
      <p className="mt-2 text-text-small text-text-default" style={{ opacity: 0.78 }}>
        {description}
      </p>
      <div className="mt-5 flex flex-wrap items-center gap-3">
        {children}
      </div>
    </div>
  )
}

// ─── Overview ────────────────────────────────────────────────────────────────

export const Overview: Story = {
  render: () => (
    <div className="p-8 max-w-6xl space-y-12">

      <div>
        <h2 className="text-h4 font-bold text-text-default">Button</h2>
        <p className="mt-2 max-w-2xl text-text-small text-text-default" style={{ opacity: 0.78 }}>
          Three variants cover every CTA context on the site. All colors are driven by CSS variables —
          switch the Theme or Accent in the toolbar to see them update live. The rules below explain how to use
          those variants safely, especially when a surface is already colored.
        </p>
      </div>

      {/* Primary */}
      <section>
        <h3 className="text-base font-bold mb-1">Primary</h3>
        <p className="text-sm text-text-2 mb-4 max-w-xl">
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
        <DocRow title="Disabled" description="Action is not available. Communicates state without removing the button from the layout.">
          <Button variant="primary" size="md" disabled>Indisponible</Button>
        </DocRow>
      </section>

      {/* Secondary */}
      <section>
        <h3 className="text-base font-bold mb-1">Secondary</h3>
        <p className="text-sm text-text-2 mb-4 max-w-xl">
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

      {/* Accent */}
      <section>
        <h3 className="text-base font-bold mb-1">Accent</h3>
        <p className="text-sm text-text-2 mb-4 max-w-xl">
          Filled with the vertical's accent color — pink for électroménager, purple for chauffage, yellow for solaire.
          Use for vertical-specific CTAs. <strong>Switch the Accent toolbar</strong> to see it update live.
          For filled buttons, the atom uses <code>--accent-btn-bg</code> and <code>--accent-btn-text</code>. The darker
          same-family token <code>--accent-accent-text</code> is reserved for lighter accent surfaces such as highlight
          pills, not for every filled CTA.
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
      </section>

      {/* Side-by-side comparison */}
      <section>
        <h3 className="text-h6 font-bold text-text-default mb-1">All variants together</h3>
        <p className="text-text-small text-text-default mb-4" style={{ opacity: 0.78 }}>
          Typical CTA group — one main action, one secondary action, one vertical-specific action.
        </p>
        <div className="flex flex-wrap gap-3">
          <Button variant="primary">Prendre rendez-vous</Button>
          <Button variant="secondary">En savoir plus</Button>
          <Button variant="accent">Accent CTA</Button>
        </div>
      </section>

      <section>
        <h3 className="text-h6 font-bold text-text-default mb-1">Usage guardrails</h3>
        <p className="text-text-small text-text-default mb-4 max-w-2xl" style={{ opacity: 0.78 }}>
          Accessibility is not only about contrast. CTA hierarchy should also stay readable on mobile, where a
          colorful surface plus a colorful button plus an extra border quickly becomes visually too heavy.
        </p>
        <div className="grid gap-4 md:grid-cols-2">
          <GuidanceColumn
            title="Do"
            items={[
              'Keep one filled primary action per viewport when possible.',
              'Use Accent only when the vertical meaning matters.',
              'Prefer neutral or softly tinted backgrounds for filled CTAs.',
              'On yellow surfaces, keep text dark for contrast.',
            ]}
          />
          <GuidanceColumn
            title="Avoid"
            tone="warning"
            items={[
              'Do not stack a saturated accent button on an equally saturated background without extra separation.',
              'Do not add a dark outline around a filled CTA just to make it stand out.',
              'Do not rely on the toolbar alone to decide whether a color pairing is safe.',
              'Do not show multiple filled CTAs with equal emphasis in the same mobile block.',
            ]}
          />
        </div>
      </section>

      <section>
        <h3 className="text-h6 font-bold text-text-default mb-1">Buttons on backgrounds</h3>
        <p className="text-text-small text-text-default mb-4 max-w-2xl" style={{ opacity: 0.78 }}>
          The same button can feel right or wrong depending on its surrounding surface. Use these examples as the
          practical rule of thumb teams should follow.
        </p>
        <div className="grid gap-4 md:grid-cols-3">
          <SurfacePreview
            title="Preferred: neutral surface"
            description="The filled CTA is the main point of contrast, so it remains clear and scannable."
            accent="default"
            backgroundColor="#ffffff"
          >
            <Button variant="primary">Prendre rendez-vous</Button>
            <Button variant="secondary">En savoir plus</Button>
          </SurfacePreview>

          <SurfacePreview
            title="Preferred: soft tint"
            description="Accent CTAs can sit on a tinted surface when the button still has a distinct silhouette and readable text."
            accent="violet"
            backgroundColor="#f3f3f3"
          >
            <Button variant="accent">Demander un devis</Button>
            <Button variant="secondary">Voir les details</Button>
          </SurfacePreview>

          <SurfacePreview
            title="Avoid: loud surface + loud CTA"
            description="When the surface is already saturated, a second strong fill plus an extra outline feels heavy on mobile."
            accent="fuschia"
            backgroundColor="#ff6492"
          >
            <button
              className="rounded-pill px-6 py-3 text-text-small-semibold"
              style={{
                backgroundColor: '#e8006f',
                color: '#ffffff',
                border: '2px solid #3a121e',
              }}
            >
              Too heavy
            </button>
          </SurfacePreview>
        </div>
      </section>

    </div>
  ),
}

// ─── Playground ───────────────────────────────────────────────────────────────

export const Playground: Story = {
  args: { children: 'Prendre rendez-vous', variant: 'primary', size: 'md' },
}
