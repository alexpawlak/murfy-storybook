import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { VerticalSelector, DEFAULT_VERTICALS } from './VerticalSelector'

const meta: Meta<typeof VerticalSelector> = {
  title: 'Molecules/VerticalSelector',
  component: VerticalSelector,
  parameters: { layout: 'fullscreen' },
  argTypes: {
    activeId: {
      control: 'select',
      options: DEFAULT_VERTICALS.map(v => v.id),
    },
  },
}
export default meta
type Story = StoryObj<typeof VerticalSelector>

// ─── Overview ─────────────────────────────────────────────────────────────────

export const Overview: Story = {
  render: () => (
    <div className="p-8 max-w-3xl space-y-10">

      <div>
        <h2 className="text-h4 font-bold mb-2" style={{ color: 'var(--text)' }}>
          Vertical Selector
        </h2>
        <p className="text-text-small opacity-70 max-w-xl" style={{ color: 'var(--text)' }}>
          Pill-style tab row for switching between Murfy verticals (Électroménager, Chauffage, Solaire).
          Each vertical uses its own accent color (Violet, Fuschia, Yellow) when active.
        </p>
      </div>

      <section>
        <h3 className="text-xs font-semibold uppercase tracking-widest opacity-50 mb-4" style={{ color: 'var(--text)', letterSpacing: '0.08em' }}>
          Default — all three verticals
        </h3>
        <VerticalSelector />
      </section>

      <section>
        <h3 className="text-xs font-semibold uppercase tracking-widest opacity-50 mb-4" style={{ color: 'var(--text)', letterSpacing: '0.08em' }}>
          Chauffage active
        </h3>
        <VerticalSelector activeId="chauffage" />
      </section>

      <section>
        <h3 className="text-xs font-semibold uppercase tracking-widest opacity-50 mb-4" style={{ color: 'var(--text)', letterSpacing: '0.08em' }}>
          Solaire active
        </h3>
        <VerticalSelector activeId="solaire" />
      </section>

    </div>
  ),
}

// ─── Playground ───────────────────────────────────────────────────────────────

export const Playground: Story = {
  args: {
    verticals: DEFAULT_VERTICALS,
    activeId: 'electromenager',
  },
}
