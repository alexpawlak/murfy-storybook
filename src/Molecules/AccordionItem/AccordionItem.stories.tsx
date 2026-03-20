import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { AccordionItem, Accordion } from './AccordionItem'

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

// ─── Layout helper ────────────────────────────────────────────────────────────

function DocRow({ title, description, children }: {
  title: string
  description: string
  children: React.ReactNode
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-6 border-t border-border">
      <div>
        <h4 className="text-text-xsmall-semibold" style={{ color: 'var(--text)' }}>{title}</h4>
        <p className="text-text-xsmall mt-1 leading-relaxed opacity-60" style={{ color: 'var(--text)' }}>{description}</p>
      </div>
      <div className="md:col-span-2">
        {children}
      </div>
    </div>
  )
}

const faqItems = [
  {
    question: 'Combien coûte une réparation ?',
    answer: 'Le tarif de déplacement est de 49€. Le coût total dépend de la panne et des pièces nécessaires. Nos techniciens établissent un devis avant toute intervention.',
  },
  {
    question: 'Quelle est la durée d\'intervention ?',
    answer: 'La plupart des réparations prennent entre 1h et 2h. Nos techniciens viennent équipés des pièces les plus courantes.',
  },
  {
    question: 'Y a-t-il une garantie sur la réparation ?',
    answer: 'Oui, toutes nos réparations sont garanties 6 mois pièces et main-d\'œuvre.',
  },
  {
    question: 'Quels appareils réparez-vous ?',
    answer: 'Nous réparons les lave-linges, sèche-linges, lave-vaisselles, réfrigérateurs, congélateurs et fours.',
  },
]

// ─── Overview ─────────────────────────────────────────────────────────────────

export const Overview: Story = {
  render: () => (
    <div className="p-8 max-w-3xl space-y-12">

      <div>
        <h2 className="text-h4 font-bold" style={{ color: 'var(--text)' }}>AccordionItem</h2>
        <p className="text-text-xsmall mt-1 max-w-xl opacity-60" style={{ color: 'var(--text)' }}>
          FAQ dropdown component. Closed state shows a full card with border; open state goes flat (no card).
          Icon is a "+" that rotates 45° to "×" when expanded. Switch the Theme toolbar to test across themes.
        </p>
      </div>

      <section>
        <h3 className="text-text-small font-bold mb-1" style={{ color: 'var(--text)' }}>States</h3>
        <p className="text-text-xsmall mb-4 opacity-60" style={{ color: 'var(--text)' }}>
          Closed and open states of a single accordion item.
        </p>

        <DocRow title="Closed" description="Default resting state — question visible, answer hidden.">
          <AccordionItem
            question="Combien coûte une réparation ?"
            answer="Le tarif de déplacement est de 49€. Le coût total dépend de la panne et des pièces nécessaires."
          />
        </DocRow>

        <DocRow title="Open" description="Answer is expanded below the question.">
          <AccordionItem
            question="Y a-t-il une garantie sur la réparation ?"
            answer="Oui, toutes nos réparations sont garanties 6 mois pièces et main-d'œuvre."
            defaultOpen
          />
        </DocRow>
      </section>

      <section>
        <h3 className="text-text-small font-bold mb-4" style={{ color: 'var(--text)' }}>FAQ Group</h3>
        <Accordion items={faqItems} />
      </section>

    </div>
  ),
}

// ─── Playground ───────────────────────────────────────────────────────────────

export const Playground: Story = {
  args: {
    question: 'Combien coûte une réparation ?',
    answer: 'Le tarif de déplacement est de 49€. Le coût total dépend de la panne et des pièces nécessaires. Nos techniciens établissent un devis avant toute intervention.',
    defaultOpen: false,
  },
  decorators: [
    (Story) => (
      <div className="p-8 max-w-xl">
        <Story />
      </div>
    ),
  ],
}
