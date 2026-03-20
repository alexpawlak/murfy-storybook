import type { Meta, StoryObj } from '@storybook/react'
import { WhyMurfySection } from './WhyMurfySection'

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
