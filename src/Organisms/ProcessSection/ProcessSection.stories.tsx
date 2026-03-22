import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { ProcessSection } from './ProcessSection'
import { DocHeader, DocSection, GuidanceGrid, AccessibilityNote } from '../../Foundation/doc-components'

const meta: Meta<typeof ProcessSection> = {
  title: 'Organisms/ProcessSection',
  component: ProcessSection,
  parameters: { layout: 'fullscreen' },
}
export default meta
type Story = StoryObj<typeof ProcessSection>


export const Overview: Story = {
  render: () => (
    <div className="min-h-screen" style={{ background: 'var(--bg)' }}>
      <DocHeader layer="Organisms" title='ProcessSection' description="Step-by-step process section explaining how Murfy's service works. Uses numbered step cards with photo and description. Used on vertical pages (Chauffage, Solaire) to set user expectations before conversion." />
      <div className="px-8 py-12 max-w-5xl">
        <DocSection label="Composition">
          <div className="rounded-[var(--radius-card)] border border-border px-5 py-4" style={{ background: 'color-mix(in srgb, var(--accent-btn-bg) 5%, var(--bg))' }}>
            <p className="text-text-small text-text" style={{ opacity: 0.75 }}>
              Molecules used: Card (step variant with number circle + photo + body)<br />
              Layout: Horizontal step rail on desktop — vertical on mobile
            </p>
          </div>
        </DocSection>
        <DocSection label="Best Practices">
          <GuidanceGrid
            dos={[
              { rule: "Keep step titles action-oriented: 'Analyse de consommation', 'Proposition personnalisée'.", rationale: "Action verbs in step titles (analyse, propose, install) communicate forward momentum and progress. Noun-only titles ('L'analyse', 'La proposition') feel static." },
              { rule: 'Use 3–5 steps — not 2, not 6+.', rationale: 'Two steps feels oversimplified (are you hiding complexity?). Six or more steps looks daunting. Three to five is the psychological range that feels thorough but manageable.' },
            ]}
            donts={[
              { rule: 'Do not include pricing in step descriptions.', rationale: 'The process section sets expectations about the journey, not the cost. Price belongs in the hero and pricing section — introducing it in process steps creates premature evaluation and can trigger drop-off before the user has been persuaded.' },
            ]}
          />
        </DocSection>
        <DocSection label="Accessibility & WCAG">
          <div className="flex flex-col gap-4">
            <AccessibilityNote criterion='WCAG 2.1 AA 1.3.3 — Sensory Characteristics' requirement='Step order must not rely solely on visual position' why='The numbered circles (1, 2, 3) communicate sequence visually. Screen readers must also receive this sequence information in the DOM order — steps must appear in order in the HTML, not just visually via CSS grid positioning. The step number must be part of the accessible content, not just decoration.' />
          </div>
        </DocSection>
      </div>
    </div>
  ),
}

export const Chauffage: Story = {
  args: {
    title: 'Ni plus ni moins : un chauffage dimensionné pour vos besoins',
    steps: [
      {
        number: 1,
        title: 'Analyse de consommation',
        description:
          'On étudie vos factures et équipements existants pour comprendre vos besoins réels.',
      },
      {
        number: 2,
        title: 'Étude du logement',
        description:
          'Surface, isolation, faisabilité gaz : on prend tout en compte avant de proposer quoi que ce soit.',
      },
      {
        number: 3,
        title: 'Proposition personnalisée',
        description:
          'Un devis clair, sans forfait standard. Adapté à votre logement, pas à une moyenne.',
      },
      {
        number: 4,
        title: 'Installation & suivi',
        description:
          'Une installation pensée pour évoluer dans le temps, avec un premier entretien inclus.',
      },
    ],
  },
}
