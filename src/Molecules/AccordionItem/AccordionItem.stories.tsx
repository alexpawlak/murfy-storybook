import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { AccordionItem, Accordion } from './AccordionItem'

const meta: Meta<typeof AccordionItem> = {
  title: 'Molecules/AccordionItem',
  component: AccordionItem,
  tags: ['autodocs'],
}
export default meta
type Story = StoryObj<typeof AccordionItem>

export const Default: Story = {
  args: {
    question: 'Combien coûte une réparation ?',
    answer: 'Le tarif de déplacement est de 49€. Le coût total dépend de la panne et des pièces nécessaires. Nos techniciens établissent un devis avant toute intervention.',
  },
}

export const DefaultOpen: Story = {
  args: {
    question: 'Quelle est la zone d\'intervention ?',
    answer: 'Nous intervenons dans plus de 200 villes en France métropolitaine. Entrez votre code postal pour vérifier la disponibilité dans votre secteur.',
    defaultOpen: true,
  },
}

const faqItems = [
  {
    question: 'Combien coûte une réparation ?',
    answer: 'Le tarif de déplacement est de 49€. Le coût total dépend de la panne et des pièces nécessaires.',
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

export const FAQGroup: Story = {
  render: () => <Accordion items={faqItems} />,
}
