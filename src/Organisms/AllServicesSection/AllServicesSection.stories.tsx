import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { AllServicesSection } from './AllServicesSection'
import { DocHeader, DocSection, GuidanceGrid, AccessibilityNote } from '../../Foundation/doc-components'

const meta: Meta<typeof AllServicesSection> = {
  title: 'Organisms/AllServicesSection',
  component: AllServicesSection,
  parameters: { layout: 'fullscreen' },
  argTypes: {
    title: { control: 'text' },
  },
}

export default meta
type Story = StoryObj<typeof AllServicesSection>

export const Overview: Story = {
  render: () => (
    <div className="min-h-screen" style={{ background: 'var(--bg)' }}>
      <DocHeader
        layer="Organisms"
        title="AllServicesSection"
        description="A full-width section listing Murfy's four service channels — home repair, online diagnosis, remote diagnosis, and refurbished appliances. Each card leads users to the appropriate conversion funnel."
      />
      <div className="px-8 py-12 max-w-4xl">
        <DocSection label="Composition">
          <div className="rounded-[var(--radius-card)] border border-border px-5 py-4 mb-6" style={{ background: 'color-mix(in srgb, var(--accent-btn-bg) 5%, var(--bg))' }}>
            <p className="text-text-small text-text" style={{ opacity: 0.75 }}>
              <strong>Molecules used:</strong> Card (Media + content variant) × 4
              <br />
              <strong>Layout:</strong> 2 × 2 grid on desktop, single column on mobile
              <br />
              <strong>Accent:</strong> CTA buttons follow the active accent — switch in the toolbar to preview each vertical
            </p>
          </div>
        </DocSection>
        <DocSection label="Best Practices">
          <GuidanceGrid
            dos={[
              { rule: 'Keep each card description to one sentence.', rationale: 'Four cards compete for attention in the same grid. Short descriptions (15–20 words) let users scan all options quickly before clicking. Longer descriptions slow scanning and hide the CTA below the fold on mobile.' },
              { rule: 'Use action-oriented CTA labels that match the service.', rationale: '"Prendre RDV" for home repair vs. "Commencer" for the diagnosis tool — each label sets the right expectation for what clicking will do. Generic labels like "En savoir plus" reduce click confidence.' },
            ]}
            donts={[
              { rule: 'Do not display all four cards with equal visual weight.', rationale: 'Home repair is Murfy\'s primary conversion funnel. Consider giving it a larger card or first position to reflect business priority. Identical weight signals equal importance to users, diluting the primary CTA.', wcag: '' },
              { rule: 'Do not add a fifth card without restructuring the grid.', rationale: 'A 2×2 grid works because users see all options without scrolling on desktop. A fifth card breaks the symmetry and forces a scroll. If a new service is added, evaluate redesigning the section layout first.' },
            ]}
          />
        </DocSection>
        <DocSection label="Accessibility & WCAG">
          <div className="flex flex-col gap-4">
            <AccessibilityNote
              criterion="WCAG 2.1 AA 2.4.4 — Link Purpose"
              requirement="Each card CTA must have a unique, descriptive label or accessible context"
              why="If all four cards use 'En savoir plus', screen reader users navigating by links hear four identical entries with no context. The card heading (rendered before the CTA in the DOM) provides context — but only if the heading is a semantic element (h2/h3) that screen readers can associate with the CTA."
              href="https://www.w3.org/WAI/WCAG21/Understanding/link-purpose-in-context.html"
            />
            <AccessibilityNote
              criterion="WCAG 2.1 AA 1.1.1 — Non-text Content"
              requirement="Card images must have descriptive alt text if they convey meaning"
              why="The service card images show the type of service being offered (a technician at work, a laptop for online diagnosis). These images convey meaning about the service — alt text should describe the scene, not just the object. If an image is purely decorative, alt='' is acceptable."
            />
          </div>
        </DocSection>
      </div>
    </div>
  ),
}

export const Default: Story = {
  args: {},
}

export const WithPhotos: Story = {
  args: {
    items: [
      {
        title: 'Réparation à domicile',
        description: "Un réparateur intervient chez vous en 24h pour réparer votre appareil. C'est simple & efficace !",
        ctaLabel: 'Prendre RDV',
        imageUrl: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=400&h=300&fit=crop',
      },
      {
        title: 'Diagnostiquer votre panne',
        description: 'Découvrez notre outil de diagnostic en ligne pour résoudre votre panne.',
        ctaLabel: 'Commencer',
        imageUrl: 'https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?w=400&h=300&fit=crop',
      },
      {
        title: 'Diagnostic à distance',
        description: 'Identifiez la panne de votre appareil avec un réparateur au téléphone.',
        ctaLabel: 'Se faire appeler',
        imageUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop',
      },
      {
        title: "Acheter de l'électroménager durable",
        description: "Des appareils sélectionnés par nos réparateurs. Jusqu'à 5 ans de garantie inclue.",
        ctaLabel: 'Voir le catalogue',
        imageUrl: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop',
      },
    ],
  },
}
