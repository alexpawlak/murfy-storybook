import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { MurfyNavbar } from './MurfyNavbar'
import { DEFAULT_VERTICALS } from '../../Molecules/VerticalSelector/VerticalSelector'

const meta: Meta<typeof MurfyNavbar> = {
  title: 'Organisms/MurfyNavbar',
  component: MurfyNavbar,
  parameters: { layout: 'fullscreen' },
  argTypes: {
    activeVerticalId: {
      control: 'select',
      options: DEFAULT_VERTICALS.map(v => v.id),
    },
  },
}
export default meta
type Story = StoryObj<typeof MurfyNavbar>

// ─── Overview ─────────────────────────────────────────────────────────────────

export const Overview: Story = {
  render: () => (
    <div className="max-w-md mx-auto space-y-12 py-8">

      <div className="px-4">
        <h2 className="text-h4 font-bold mb-2" style={{ color: 'var(--text)' }}>
          Murfy Navbar
        </h2>
        <p className="text-text-small opacity-70" style={{ color: 'var(--text)' }}>
          Mobile navigation bar with the Murfy logomark, account & menu actions,
          and the vertical selector pills below. The active pill follows
          the theme's button tokens — switch Theme or Accent to preview all variants.
        </p>
      </div>

      <section>
        <p className="text-xs font-semibold uppercase tracking-widest opacity-50 px-4 mb-3" style={{ color: 'var(--text)', letterSpacing: '0.08em' }}>
          Électroménager (default)
        </p>
        <MurfyNavbar />
      </section>

      <section>
        <p className="text-xs font-semibold uppercase tracking-widest opacity-50 px-4 mb-3" style={{ color: 'var(--text)', letterSpacing: '0.08em' }}>
          Chauffage active
        </p>
        <MurfyNavbar activeVerticalId="chauffage" />
      </section>

      <section>
        <p className="text-xs font-semibold uppercase tracking-widest opacity-50 px-4 mb-3" style={{ color: 'var(--text)', letterSpacing: '0.08em' }}>
          Solaire active
        </p>
        <MurfyNavbar activeVerticalId="solaire" />
      </section>

    </div>
  ),
}

// ─── Mobile preview ───────────────────────────────────────────────────────────

export const MobilePreview: Story = {
  render: () => (
    <div className="flex items-start justify-center min-h-screen py-12" style={{ backgroundColor: 'var(--bg-2)' }}>
      <div
        className="w-[390px] overflow-hidden"
        style={{ borderRadius: '40px', boxShadow: '0 24px 80px rgba(0,0,0,0.2)', border: '8px solid var(--border)' }}
      >
        <MurfyNavbar />
        {/* Placeholder page content */}
        <div className="p-6 space-y-3" style={{ backgroundColor: 'var(--bg)' }}>
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="h-4 rounded-pill opacity-10"
              style={{ backgroundColor: 'var(--text)', width: `${70 + (i % 3) * 15}%` }}
            />
          ))}
        </div>
      </div>
    </div>
  ),
}

// ─── Playground ───────────────────────────────────────────────────────────────

export const Playground: Story = {
  args: {
    activeVerticalId: 'electromenager',
    verticals: DEFAULT_VERTICALS,
  },
}
