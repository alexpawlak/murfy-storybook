import type { Meta, StoryObj } from '@storybook/react'
import { AllServicesSection } from './AllServicesSection'

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
