import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { TestimonialsSection } from './TestimonialsSection'
import { DocHeader, DocSection, GuidanceGrid, AccessibilityNote } from '../../Foundation/doc-components'

const meta: Meta<typeof TestimonialsSection> = {
  title: 'Organisms/TestimonialsSection',
  component: TestimonialsSection,
  parameters: { layout: 'fullscreen' },
}
export default meta
type Story = StoryObj<typeof TestimonialsSection>

export const Overview: Story = {
  render: () => (
    <div className="min-h-screen" style={{ background: 'var(--bg)' }}>
      <DocHeader
        layer="Organisms"
        title="TestimonialsSection"
        description="A social proof section displaying customer reviews and ratings. Combines a section headline with a grid of review cards. Reinforces trust near conversion points by showing real customer outcomes."
      />
      <div className="px-8 py-12 max-w-4xl">
        <DocSection label="Composition">
          <div className="rounded-[var(--radius-card)] border border-border px-5 py-4 mb-6" style={{ background: 'color-mix(in srgb, var(--accent-btn-bg) 5%, var(--bg))' }}>
            <p className="text-text-small text-text" style={{ opacity: 0.75 }}>
              <strong>Molecules used:</strong> Review cards with quote, author, location, and star rating
              <br />
              <strong>Layout:</strong> Horizontal scroll on mobile, 2–3 column grid on desktop
              <br />
              <strong>Accent:</strong> Star ratings and accent highlights follow the active vertical color
            </p>
          </div>
        </DocSection>
        <DocSection label="Best Practices">
          <GuidanceGrid
            dos={[
              { rule: 'Include the customer\'s first name and location for authenticity.', rationale: '"Vincent, Bouches-du-Rhône" is far more credible than an anonymous "satisfied customer". First name + region signals a real person and adds local relevance for users in the same area.' },
              { rule: 'Prioritize reviews that describe a specific outcome.', rationale: '"Installation parfaite et très professionnelle" is generic. "Mon chauffage est tombé en panne en janvier et Murfy a tout réparé en 48h" describes a real scenario that resonates with users facing the same problem. Outcome-specific reviews are more persuasive.' },
            ]}
            donts={[
              { rule: 'Do not fabricate or modify customer reviews.', rationale: 'In France, misleading commercial practices (including fake reviews) violate the Code de la consommation and the EU\'s 2022 Omnibus Directive. Reviews must be authentic and traceable to a real transaction. This is both a legal and ethical requirement.', wcag: '' },
              { rule: 'Do not display only 5-star reviews.', rationale: 'An all-5-star review section reads as curated and triggers scepticism. Including an occasional 4-star review with a specific positive comment increases perceived authenticity without damaging the overall impression.' },
            ]}
          />
        </DocSection>
        <DocSection label="Accessibility & WCAG">
          <div className="flex flex-col gap-4">
            <AccessibilityNote
              criterion="WCAG 2.1 AA 1.1.1 — Non-text Content"
              requirement="Star rating icons must have a text alternative"
              why="Star icons rendered as SVG or image elements with no alt text are announced by screen readers as 'image' or nothing at all. Each rating must have a text alternative like aria-label='5 étoiles sur 5' or a visually hidden span so users with visual impairments understand the rating value."
              href="https://www.w3.org/WAI/WCAG21/Understanding/non-text-content.html"
            />
            <AccessibilityNote
              criterion="WCAG 2.1 AA 1.3.1 — Info and Relationships"
              requirement="Review quote, author, and rating must be semantically grouped"
              why="Screen readers navigate by landmark regions and headings. A review card that renders as three separate <div> elements with no semantic relationship may be announced as disconnected text. Use <figure> and <figcaption> or <blockquote> with an attribution element to communicate the review structure programmatically."
            />
          </div>
        </DocSection>
      </div>
    </div>
  ),
}

export const Chauffage: Story = {
  args: {
    title: 'Ils nous ont fait confiance',
    reviews: [
      {
        quote: 'Installation parfaite et très professionnelle, tout fonctionne à merveille',
        author: 'Vincent',
        location: 'Bouches-du-Rhône',
        rating: 5,
      },
      {
        quote: 'Équipe sérieuse et professionnelle, du devis jusqu\'à la réalisation',
        author: 'Pierre',
        location: 'Var',
        rating: 5,
      },
    ],
  },
}
