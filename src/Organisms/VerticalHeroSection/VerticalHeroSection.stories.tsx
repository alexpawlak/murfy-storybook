import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { VerticalHeroSection } from './VerticalHeroSection'
import { DocHeader, DocSection, GuidanceGrid, AccessibilityNote } from '../../Foundation/doc-components'

const meta: Meta<typeof VerticalHeroSection> = {
  title: 'Organisms/VerticalHeroSection',
  component: VerticalHeroSection,
  parameters: { layout: 'fullscreen' },
  argTypes: {
    headline: { control: 'text' },
    subheadline: { control: 'text' },
    stat: { control: 'text' },
    imageUrl: { control: 'text' },
    ctas: { control: 'object' },
  },
}
export default meta
type Story = StoryObj<typeof VerticalHeroSection>

export const Overview: Story = {
  render: () => (
    <div className="min-h-screen" style={{ background: 'var(--bg)' }}>
      <DocHeader
        layer="Organisms"
        title="VerticalHeroSection"
        description="The above-the-fold hero for vertical-specific pages (Chauffage, Solaire, etc.). Unlike the homepage HeroSection, this variant emphasizes multiple CTAs for different customer intents — quote request, callback, and direct booking — and adapts its accent color per vertical."
      />
      <div className="px-8 py-12 max-w-4xl">
        <DocSection label="Composition">
          <div className="rounded-[var(--radius-card)] border border-border px-5 py-4 mb-6" style={{ background: 'color-mix(in srgb, var(--accent-btn-bg) 5%, var(--bg))' }}>
            <p className="text-text-small text-text" style={{ opacity: 0.75 }}>
              <strong>Atoms used:</strong> Button (primary, secondary, accent variants)
              <br />
              <strong>Layout:</strong> Headline + subheadline + stat line + multi-CTA row — full-width with optional background photo
              <br />
              <strong>Accent:</strong> The active accent sets CTA button color — switch Chauffage (violet) or Solaire (yellow) to preview
            </p>
          </div>
        </DocSection>
        <DocSection label="Best Practices">
          <GuidanceGrid
            dos={[
              { rule: 'Limit the hero to a maximum of 3 CTAs, ordered by conversion priority.', rationale: 'Vertical pages serve users at different stages: some want a quote (high intent), some want to be called back (medium intent), some want to book now (transactional). Offering all three is valid — but the primary CTA must be visually dominant. Use variant="primary" or "accent" for the highest-priority action only.' },
              { rule: 'Adapt the headline to the specific vertical — never reuse the homepage headline.', rationale: '"Réparation rapide et fiable" is too generic for a Chauffage page where users have a specific heating emergency. "Votre chaudière en panne ? Murfy intervient en 24h" speaks directly to the search intent that brought the user to this page, improving conversion and quality score.' },
            ]}
            donts={[
              { rule: 'Do not use the same CTA variant for multiple buttons in the row.', rationale: 'Three primary-variant buttons create visual noise and give users no guidance on which action to take. Use one accent/primary CTA and one or two secondary/ghost buttons. The visual hierarchy must match the business priority hierarchy.', wcag: '' },
              { rule: 'Do not omit the stat line if Murfy has relevant data for the vertical.', rationale: '"350 000 foyers nous ont déjà fait confiance" provides social proof at the highest-attention moment. For a Chauffage page, a stat like "98% de clients satisfaits sur nos interventions chauffage" is even more relevant. Empty stat areas reduce trust without adding clarity.' },
            ]}
          />
        </DocSection>
        <DocSection label="Accessibility & WCAG">
          <div className="flex flex-col gap-4">
            <AccessibilityNote
              criterion="WCAG 2.1 AA 1.4.3 — Contrast"
              requirement="All text must meet 4.5:1 against the hero background"
              why="The VerticalHeroSection may use a full-bleed background photo. Text overlaid on photos has unpredictable contrast — the same text may be readable over a dark sky but invisible over a bright wall. Use a dark overlay (scrim) between the photo and the text, or test every text element against the actual background color it renders over."
              href="https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum.html"
            />
            <AccessibilityNote
              criterion="WCAG 2.1 AA 2.4.3 — Focus Order"
              requirement="CTA buttons must receive focus in logical order matching visual order"
              why="When a user tabs through the hero, the focus order must match the visual left-to-right order of the CTA buttons. If buttons are positioned with absolute/flex ordering that differs from DOM order, a keyboard user receives focus in a confusing sequence that doesn't match what they see on screen."
            />
          </div>
        </DocSection>
      </div>
    </div>
  ),
}

export const Chauffage: Story = {
  args: {
    headline: 'Fiabilité héritée du terrain',
    subheadline: "Installer, réparer, entretenir, faire durer : c'est notre métier chez Murfy.",
    stat: '350 000 foyers nous ont déjà fait confiance.',
    ctas: [
      { label: 'Demander à être rappelé', variant: 'secondary' },
      { label: 'Demander un devis', variant: 'primary' },
      { label: 'RDV entretien', variant: 'accent' },
    ],
  },
}

export const Default: Story = {
  args: {
    headline: 'Réparation rapide et fiable',
    subheadline: 'Nos techniciens interviennent chez vous pour réparer vos appareils.',
    stat: '10 000 réparations par mois.',
    ctas: [
      { label: 'Prendre rendez-vous', variant: 'primary' },
      { label: 'En savoir plus', variant: 'secondary' },
    ],
  },
}
