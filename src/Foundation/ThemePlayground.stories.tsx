import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Button } from '../Atoms/Button/Button'

/**
 * ThemePlayground — use the Theme + Accent toolbar dropdowns to see how
 * every token responds in a realistic section layout.
 *
 * Primary button  → --btn-bg / --btn-text  (changes per theme)
 * Secondary button → --btn2-bg / --btn2-border / --btn2-text
 * Accent button   → --accent-btn-bg / --accent-btn-text  (changes per accent)
 * Heading accent  → --heading-accent  (the coloured word in the title)
 * Highlight bar   → --accent-accent-highlight
 */

function PlaygroundSection() {
  return (
    <section
      className="min-h-screen flex flex-col"
      style={{ backgroundColor: 'var(--bg)' }}
    >
      {/* Simulated navbar strip */}
      <header
        className="flex items-center justify-between px-8 py-4"
        style={{ borderBottom: '1px solid var(--border)' }}
      >
        <span style={{ color: 'var(--text)', fontWeight: 900, fontSize: 'var(--font-size-h5)', letterSpacing: '-0.04em' }}>
          murfy
        </span>
        <div className="flex gap-3">
          <Button variant="secondary" size="sm">En savoir plus</Button>
          <Button variant="primary" size="sm">Prendre RDV</Button>
        </div>
      </header>

      {/* Hero content */}
      <div className="flex-1 flex flex-col items-center justify-center px-8 py-20 text-center max-w-3xl mx-auto gap-8">
        {/* Accent highlight pill */}
        <div
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-pill text-sm font-semibold"
          style={{
            backgroundColor: 'var(--accent-accent-highlight)',
            color: 'var(--accent-accent-text)',
          }}
        >
          <span>✦</span>
          <span>Changer l'accent avec la toolbar ci-dessus</span>
        </div>

        {/* Main heading */}
        <h1 className="text-h1 font-black" style={{ color: 'var(--text)' }}>
          Réparer, c'est{' '}
          <span style={{ color: 'var(--heading-accent)' }}>
            mieux
          </span>
          {' '}que jeter
        </h1>

        {/* Subtext */}
        <p
          style={{
            fontSize: 'var(--font-size-text-large)',
            color: 'var(--text)',
            opacity: 0.7,
            maxWidth: '480px',
          }}
        >
          Murfy répare vos appareils électroménagers à domicile, en visio ou en atelier — rapidement et durablement.
        </p>

        {/* CTA row */}
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Button variant="primary" size="lg">Prendre rendez-vous</Button>
          <Button variant="secondary" size="lg">Comment ça marche</Button>
          <Button variant="accent" size="lg">Accent CTA</Button>
        </div>

        {/* Token reference table */}
        <div
          className="mt-12 w-full max-w-lg rounded-card p-6 text-left"
          style={{ backgroundColor: 'var(--bg-2)', border: '1px solid var(--border)' }}
        >
          <p
            className="text-xs font-semibold uppercase tracking-widest mb-4"
            style={{ color: 'var(--text)', opacity: 0.5 }}
          >
            Tokens actifs
          </p>
          <div className="grid grid-cols-2 gap-x-6 gap-y-3">
            {[
              { label: '--bg', var: '--bg' },
              { label: '--bg-2', var: '--bg-2' },
              { label: '--text', var: '--text' },
              { label: '--heading-accent', var: '--heading-accent' },
              { label: '--btn-bg', var: '--btn-bg' },
              { label: '--btn2-border', var: '--btn2-border' },
              { label: '--accent-btn-bg', var: '--accent-btn-bg' },
              { label: '--accent-highlight', var: '--accent-accent-highlight' },
            ].map(({ label, var: cssVar }) => (
              <div key={label} className="flex items-center gap-2">
                <div
                  className="w-5 h-5 rounded shrink-0"
                  style={{
                    backgroundColor: `var(${cssVar})`,
                    border: '1px solid var(--border)',
                  }}
                />
                <span style={{ fontSize: 'var(--font-size-text-xsmall)', color: 'var(--text)', fontFamily: 'monospace' }}>
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

const meta: Meta = {
  title: 'Foundation/Theme Playground',
  component: PlaygroundSection,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Switch Theme and Accent in the toolbar to see all semantic tokens respond live across a realistic section.',
      },
    },
  },
}
export default meta

type Story = StoryObj
export const Interactive: Story = {}
