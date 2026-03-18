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

// ─── Overview ────────────────────────────────────────────────────────────────

export const Overview: Story = {
  render: () => (
    <div className="p-8 max-w-4xl space-y-12">

      <div>
        <h2 className="text-2xl font-bold">Button</h2>
        <p className="text-sm text-text-2 mt-1 max-w-xl">
          Three variants cover every CTA context on the site. All colors are driven by CSS variables —
          switch the Theme or Accent in the toolbar to see them update live.
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
        <h3 className="text-base font-bold mb-1">All variants together</h3>
        <p className="text-sm text-text-2 mb-4">Typical CTA group — one of each variant at medium size.</p>
        <div className="flex flex-wrap gap-3">
          <Button variant="primary">Prendre rendez-vous</Button>
          <Button variant="secondary">En savoir plus</Button>
          <Button variant="accent">Accent CTA</Button>
        </div>
      </section>

    </div>
  ),
}

// ─── Playground ───────────────────────────────────────────────────────────────

export const Playground: Story = {
  args: { children: 'Prendre rendez-vous', variant: 'primary', size: 'md' },
}
