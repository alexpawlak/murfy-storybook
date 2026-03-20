import type { Meta, StoryObj } from '@storybook/react'
import { WhyMurfyCard } from './WhyMurfyCard'

const meta: Meta<typeof WhyMurfyCard> = {
  title: 'Molecules/WhyMurfyCard',
  component: WhyMurfyCard,
  argTypes: {
    title: { control: 'text' },
    body: { control: 'text' },
    imageUrl: { control: 'text' },
  },
}

export default meta
type Story = StoryObj<typeof WhyMurfyCard>

export const WithoutImage: Story = {
  args: {
    title: 'Réparé ou remplacé',
    body: "On répare votre appareil ou vous bénéficiez automatiquement d'une remise de 50€ sur votre prochain appareil Murfy !",
  },
}

export const WithImage: Story = {
  args: {
    title: 'RDV en 24h',
    body: 'Un réparateur électroménager chez vous dès demain, ou optez pour un RDV en vidéo.',
    imageUrl: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=400&h=300&fit=crop',
    imageAlt: 'Technicien Murfy',
  },
}

export const Guarantee: Story = {
  args: {
    title: 'Garantie 6 mois sur la panne',
    body: 'Si la même panne réapparait, nous intervenons de nouveau, sans frais supplémentaire.',
  },
}
