import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { WhyMurfyCard } from './WhyMurfyCard'
import { DocHeader, DocSection, GuidanceGrid, AccessibilityNote } from '../../Foundation/doc-components'

const meta: Meta<typeof WhyMurfyCard> = {
  title: 'Molecules/WhyMurfyCard',
  component: WhyMurfyCard,
  parameters: { layout: 'fullscreen' },
  argTypes: {
    title: { control: 'text' },
    body: { control: 'text' },
    imageUrl: { control: 'text' },
  },
}

export default meta
type Story = StoryObj<typeof WhyMurfyCard>

export const Overview: Story = {
  render: () => (
    <div className="min-h-screen" style={{ background: 'var(--bg)' }}>
      <DocHeader
        layer="Molecules"
        title="WhyMurfyCard"
        description="A value proposition card used in the 'Why Murfy' section. Presents a single benefit with a title and descriptive body text, optionally with a supporting image. Used in a grid of 3 cards that collectively justify the Murfy service."
      />

      <div className="px-8 py-12 max-w-4xl">

        <DocSection label="Showcase">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <WhyMurfyCard title="Réparé ou remplacé" body="On répare votre appareil ou vous bénéficiez automatiquement d'une remise de 50€ sur votre prochain appareil Murfy !" />
            <WhyMurfyCard title="RDV en 24h" body="Un réparateur électroménager chez vous dès demain, ou optez pour un RDV en vidéo." />
            <WhyMurfyCard title="Garantie 6 mois sur la panne" body="Si la même panne réapparait, nous intervenons de nouveau, sans frais supplémentaire." />
          </div>
        </DocSection>

        <DocSection label="Best Practices">
          <GuidanceGrid
            dos={[
              {
                rule: 'Lead the title with the benefit, not the feature.',
                rationale: '"Garantie 6 mois sur la panne" (benefit) is more persuasive than "Garantie 6 mois" (feature) because it immediately answers "what\'s in it for me?". Benefits-first framing increases conversion on value proposition cards.',
              },
              {
                rule: 'Keep body text under 25 words.',
                rationale: 'These cards appear in a row of 3. Long body text creates uneven heights and breaks the visual rhythm. If more detail is needed, link to a dedicated page.',
              },
            ]}
            donts={[
              {
                rule: 'Do not use images that require alt text describing the service — write that in the body instead.',
                rationale: 'Images in these cards are illustrative. If the image is purely decorative (a smiling technician), alt="" is correct. If the image conveys information (a diagram of the repair process), that information must also exist in the text.',
                wcag: 'WCAG 2.1 AA 1.1.1',
              },
            ]}
          />
        </DocSection>

        <DocSection label="Accessibility & WCAG">
          <AccessibilityNote
            criterion="WCAG 2.1 AA 1.1.1 — Non-text Content"
            requirement="Images must have appropriate alt text or be marked decorative"
            why="WhyMurfyCard accepts an optional image. If the image is decorative (illustrative photography), use alt='' to hide it from screen readers. If the image conveys unique information not present in the title or body, write a descriptive alt attribute."
            href="https://www.w3.org/WAI/WCAG21/Understanding/non-text-content.html"
          />
        </DocSection>

      </div>
    </div>
  ),
}

export const WithoutImage: Story = {
  args: { title: 'Réparé ou remplacé', body: "On répare votre appareil ou vous bénéficiez automatiquement d'une remise de 50€ sur votre prochain appareil Murfy !" },
  decorators: [(Story) => <div className="p-8 max-w-sm"><Story /></div>],
}

export const WithImage: Story = {
  args: { title: 'RDV en 24h', body: 'Un réparateur électroménager chez vous dès demain, ou optez pour un RDV en vidéo.', imageUrl: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=400&h=300&fit=crop', imageAlt: 'Technicien Murfy' },
  decorators: [(Story) => <div className="p-8 max-w-sm"><Story /></div>],
}
