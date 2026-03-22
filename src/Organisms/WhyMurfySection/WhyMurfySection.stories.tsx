import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { WhyMurfySection } from './WhyMurfySection'
import { DocHeader, DocSection, GuidanceGrid, AccessibilityNote } from '../../Foundation/doc-components'

const meta: Meta<typeof WhyMurfySection> = {
  title: 'Organisms/WhyMurfySection',
  component: WhyMurfySection,
  parameters: { layout: 'fullscreen' },
  argTypes: {
    title: { control: 'text' },
  },
}

export default meta
type Story = StoryObj<typeof WhyMurfySection>


export const Overview: Story = {
  render: () => (
    <div className="min-h-screen" style={{ background: 'var(--bg)' }}>
      <DocHeader layer="Organisms" title='WhyMurfySection' description='Three-column value proposition section. Presents the Murfy guarantee, appointment speed, and 6-month warranty using WhyMurfyCard atoms. Used on the homepage to justify choosing Murfy over competitors.' />
      <div className="px-8 py-12 max-w-5xl">
        <DocSection label="Composition">
          <div className="rounded-[var(--radius-card)] border border-border px-5 py-4" style={{ background: 'color-mix(in srgb, var(--accent-btn-bg) 5%, var(--bg))' }}>
            <p className="text-text-small text-text" style={{ opacity: 0.75 }}>
              Molecules used: WhyMurfyCard (× 3)<br />
              Layout: Three equal columns on desktop — single column on mobile<br />
              Theme: Accent color appears in highlight elements per vertical
            </p>
          </div>
        </DocSection>
        <DocSection label="Best Practices">
          <GuidanceGrid
            dos={[
              { rule: 'Lead each card with a concrete benefit, not a feature.', rationale: "Benefits-first framing (what the user gains) outperforms feature-first framing in conversion contexts. 'Garantie 6 mois sur la panne' is more persuasive than 'Notre garantie'." },
              { rule: 'Show three cards — no more, no fewer.', rationale: "Three is the cognitive sweet spot for a value proposition grid. Fewer feels thin; more creates overwhelm. The classic 'rule of three' applies both psychologically and visually." },
            ]}
            donts={[
              { rule: 'Do not use this section for technical specifications.', rationale: "The 'Why Murfy' section is trust-building copy, not technical documentation. Specs belong on service detail pages where users have already expressed intent." },
            ]}
          />
        </DocSection>
        <DocSection label="Accessibility & WCAG">
          <div className="flex flex-col gap-4">
            <AccessibilityNote criterion='WCAG 2.1 AA 1.1.1 — Non-text Content' requirement='Card images must have appropriate alt text or be marked decorative' why="WhyMurfyCard accepts an optional image. Decorative photos should use alt=''. If the image shows a specific scenario that conveys information not in the title/body, write descriptive alt text." />
          </div>
        </DocSection>
      </div>
    </div>
  ),
}

export const Default: Story = {
  args: {},
}

export const WithImages: Story = {
  args: {
    items: [
      {
        title: 'Réparé ou remplacé',
        body: "On répare votre appareil ou vous bénéficiez automatiquement d'une remise de 50€ sur votre prochain appareil Murfy !",
        imageUrl: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=400&h=240&fit=crop',
        imageAlt: 'Technicien Murfy',
      },
      {
        title: 'RDV en 24h',
        body: 'Un réparateur électroménager chez vous dès demain, ou optez pour un RDV en vidéo.',
        imageUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=240&fit=crop',
        imageAlt: 'Réparateur chez client',
      },
      {
        title: 'Garantie 6 mois sur la panne',
        body: 'Si la même panne réapparait, nous intervenons de nouveau, sans frais supplémentaire.',
        imageUrl: 'https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?w=400&h=240&fit=crop',
        imageAlt: 'Garantie Murfy',
      },
    ],
  },
}
