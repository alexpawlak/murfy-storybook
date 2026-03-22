import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { AccordionItem, Accordion } from './AccordionItem'
import { DocHeader, DocSection, GuidanceGrid, AccessibilityNote } from '../../Foundation/doc-components'

const meta: Meta<typeof AccordionItem> = {
  title: 'Molecules/AccordionItem',
  component: AccordionItem,
  parameters: { layout: 'fullscreen' },
  argTypes: {
    question: { control: 'text' },
    answer: { control: 'text' },
    defaultOpen: { control: 'boolean' },
  },
}
export default meta
type Story = StoryObj<typeof AccordionItem>

const faqItems = [
  { question: 'Combien coûte une réparation ?', answer: 'Le tarif de déplacement est de 49€. Le coût total dépend de la panne et des pièces nécessaires. Nos techniciens établissent un devis avant toute intervention.' },
  { question: 'Quelle est la durée d\'intervention ?', answer: 'La plupart des réparations prennent entre 1h et 2h. Nos techniciens viennent équipés des pièces les plus courantes.' },
  { question: 'Y a-t-il une garantie sur la réparation ?', answer: 'Oui, toutes nos réparations sont garanties 6 mois pièces et main-d\'œuvre.' },
  { question: 'Quels appareils réparez-vous ?', answer: 'Nous réparons les lave-linges, sèche-linges, lave-vaisselles, réfrigérateurs, congélateurs et fours.' },
]

export const Overview: Story = {
  render: () => (
    <div className="min-h-screen" style={{ background: 'var(--bg)' }}>
      <DocHeader
        layer="Molecules"
        title="AccordionItem"
        description="FAQ dropdown component built from the Input and Typography atoms. Closed state shows a full card with border; open state goes flat. Used inside FaqSection to answer common customer questions."
      />

      <div className="px-8 py-12 max-w-3xl">

        <DocSection
          label="States"
          subtitle="Closed and open states of a single item, plus a full FAQ group."
        >
          <div className="space-y-4">
            <div>
              <p className="text-text-xsmall-semibold text-text mb-3" style={{ opacity: 0.5 }}>Closed — default resting state</p>
              <AccordionItem
                question="Combien coûte une réparation ?"
                answer="Le tarif de déplacement est de 49€. Le coût total dépend de la panne et des pièces nécessaires."
              />
            </div>
            <div>
              <p className="text-text-xsmall-semibold text-text mb-3" style={{ opacity: 0.5 }}>Open — answer expanded</p>
              <AccordionItem
                question="Y a-t-il une garantie sur la réparation ?"
                answer="Oui, toutes nos réparations sont garanties 6 mois pièces et main-d'œuvre."
                defaultOpen
              />
            </div>
            <div>
              <p className="text-text-xsmall-semibold text-text mb-3 mt-6" style={{ opacity: 0.5 }}>Full FAQ group</p>
              <Accordion items={faqItems} />
            </div>
          </div>
        </DocSection>

        <DocSection label="Best Practices">
          <GuidanceGrid
            dos={[
              {
                rule: 'Keep question text to a single line where possible.',
                rationale: 'FAQ questions are scanned, not read. Short questions (under 60 characters) allow users to quickly identify what they\'re looking for. Longer questions slow down scanning and may wrap awkwardly.',
              },
              {
                rule: 'Limit answers to 2–3 sentences of plain text.',
                rationale: 'Users open an accordion because they have a specific question. A concise answer respects that intent. Long answers with multiple paragraphs belong on a dedicated help page, not in an FAQ accordion.',
              },
              {
                rule: 'Use only one accordion group per section.',
                rationale: 'Multiple accordion groups on the same page are disorienting — users don\'t know which group to look in. If more than one category of questions exists, separate them with clear section headings.',
              },
            ]}
            donts={[
              {
                rule: 'Do not put critical information inside a collapsed accordion.',
                rationale: 'Information hidden inside an accordion has lower discoverability. Pricing, legal notices, and primary CTAs must always be visible — accordion is appropriate for supplemental Q&A, not for core conversion content.',
              },
              {
                rule: 'Do not use custom animation durations that can\'t be disabled.',
                rationale: 'The expand/collapse animation must respect prefers-reduced-motion. Users with vestibular disorders may experience discomfort from sliding or fading animations.',
                wcag: 'WCAG 2.1 AA 2.3.3',
              },
            ]}
          />
        </DocSection>

        <DocSection label="Accessibility & WCAG">
          <div className="flex flex-col gap-4">
            <AccessibilityNote
              criterion="WCAG 2.1 AA 4.1.2 — Name, Role, Value"
              requirement="Accordion trigger must expose role='button', its expanded/collapsed state, and control its content panel"
              why="Screen readers must announce the accordion trigger as a button (role='button'), its current state (aria-expanded='true'/'false'), and associate it with the content panel (aria-controls). Without these attributes, blind users hear 'clickable text' with no indication that content is hidden below — they may scroll past questions assuming there is no answer."
              href="https://www.w3.org/WAI/WCAG21/Understanding/name-role-value.html"
            />
            <AccessibilityNote
              criterion="WCAG 2.1 AA 2.1.1 — Keyboard"
              requirement="All accordion functionality must be operable by keyboard alone"
              why="Users should be able to Tab to the accordion trigger, press Enter or Space to expand/collapse, and Tab into the answer content when expanded. The + icon that rotates to × must not be a separate focusable element — it is decorative and should be aria-hidden."
              href="https://www.w3.org/WAI/WCAG21/Understanding/keyboard.html"
            />
          </div>
        </DocSection>

      </div>
    </div>
  ),
}

export const Playground: Story = {
  args: {
    question: 'Combien coûte une réparation ?',
    answer: 'Le tarif de déplacement est de 49€. Le coût total dépend de la panne et des pièces nécessaires. Nos techniciens établissent un devis avant toute intervention.',
    defaultOpen: false,
  },
  decorators: [(Story) => <div className="p-8 max-w-xl"><Story /></div>],
}
