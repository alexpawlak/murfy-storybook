import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Button } from '../Atoms/Button/Button'
import { DocHeader, DocSection } from './doc-components'

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

function TokenGrid() {
  const pairs = [
    { label: '--bg', var: '--bg' },
    { label: '--bg-2', var: '--bg-2' },
    { label: '--text', var: '--text' },
    { label: '--heading-accent', var: '--heading-accent' },
    { label: '--btn-bg', var: '--btn-bg' },
    { label: '--btn2-border', var: '--btn2-border' },
    { label: '--accent-btn-bg', var: '--accent-btn-bg' },
    { label: '--accent-highlight', var: '--accent-accent-highlight' },
  ]

  return (
    <div
      className="rounded-[var(--radius-card)] border border-border p-6"
      style={{ background: 'color-mix(in srgb, var(--accent-btn-bg) 5%, var(--bg))' }}
    >
      <p className="text-label uppercase tracking-[0.08em] font-semibold text-text mb-4" style={{ opacity: 0.5 }}>
        Tokens actifs
      </p>
      <div className="grid grid-cols-2 gap-x-6 gap-y-3">
        {pairs.map(({ label, var: cssVar }) => (
          <div key={label} className="flex items-center gap-2">
            <div
              className="w-5 h-5 rounded-[var(--radius-small)] shrink-0 border border-border"
              style={{ backgroundColor: `var(${cssVar})` }}
            />
            <code className="text-label font-mono text-text" style={{ opacity: 0.7 }}>
              {label}
            </code>
          </div>
        ))}
      </div>
    </div>
  )
}

function PlaygroundSection() {
  return (
    <div className="min-h-screen" style={{ background: 'var(--bg)' }}>
      <DocHeader
        layer="Foundation"
        title="Theme Playground"
        description="Switch Theme and Accent in the Storybook toolbar to see all semantic tokens respond live across a realistic section. The token reference panel below the hero updates with each switch — use it to understand which CSS variable maps to each visual element."
      />

      <DocSection
        label="How to use"
        subtitle="Use the toolbar at the top of Storybook to switch themes and accents. No code changes needed — all visual updates happen through CSS variables."
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 px-0">
          {[
            { label: 'Theme', desc: 'Controls the surface: light, dark, light-pink, pink-mist, pink-vivid.' },
            { label: 'Accent', desc: 'Controls the vertical brand color: default (pink), violet, yellow, fuschia.' },
          ].map(({ label, desc }) => (
            <div key={label} className="rounded-[var(--radius-card)] border border-border px-5 py-4">
              <p className="text-text-small-semibold text-text mb-1">{label}</p>
              <p className="text-text-xsmall text-text" style={{ opacity: 0.6 }}>{desc}</p>
            </div>
          ))}
        </div>
      </DocSection>

      {/* Live playground */}
      <div className="px-8 pb-12">
        <section style={{ backgroundColor: 'var(--bg)', padding: '48px 0' }}>
          {/* Simulated navbar strip */}
          <header
            className="flex items-center justify-between px-8 py-4 mb-12 rounded-[var(--radius-card)] border border-border"
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
          <div className="flex flex-col items-center text-center max-w-3xl mx-auto gap-8">
            {/* Accent highlight pill */}
            <div
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-[var(--radius-pill)] text-text-small-semibold"
              style={{ backgroundColor: 'var(--accent-accent-highlight)', color: 'var(--accent-accent-text)' }}
            >
              <span>✦</span>
              <span>Changer l'accent avec la toolbar ci-dessus</span>
            </div>

            {/* Main heading */}
            <h1 className="text-h1 font-black" style={{ color: 'var(--text)' }}>
              Réparer, c'est{' '}
              <span style={{ color: 'var(--heading-accent)' }}>mieux</span>
              {' '}que jeter
            </h1>

            {/* Subtext */}
            <p className="text-text-large text-text" style={{ opacity: 0.7, maxWidth: '480px' }}>
              Murfy répare vos appareils électroménagers à domicile, en visio ou en atelier — rapidement et durablement.
            </p>

            {/* CTA row */}
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Button variant="primary" size="lg">Prendre rendez-vous</Button>
              <Button variant="secondary" size="lg">Comment ça marche</Button>
              <Button variant="accent" size="lg">Accent CTA</Button>
            </div>

            {/* Token reference */}
            <div className="mt-8 w-full max-w-lg">
              <TokenGrid />
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

const meta: Meta = {
  title: 'Foundation/Theme Playground',
  component: PlaygroundSection,
  parameters: { layout: 'fullscreen' },
}
export default meta

type Story = StoryObj
export const Interactive: Story = {}
