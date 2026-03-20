import type { Meta, StoryObj } from '@storybook/react'
import { VerticalHeroSection } from './VerticalHeroSection'

const meta: Meta<typeof VerticalHeroSection> = {
  title: 'Organisms/VerticalHeroSection',
  component: VerticalHeroSection,
  parameters: { layout: 'fullscreen' },
  argTypes: {
    headline: { control: 'text' },
    subheadline: { control: 'text' },
    stat: { control: 'text' },
    imageUrl: { control: 'text' },
    ctas: { control: 'object' },
  },
}
export default meta
type Story = StoryObj<typeof VerticalHeroSection>

export const Chauffage: Story = {
  args: {
    headline: 'Fiabilité héritée du terrain',
    subheadline: "Installer, réparer, entretenir, faire durer : c'est notre métier chez Murfy.",
    stat: '350 000 foyers nous ont déjà fait confiance.',
    ctas: [
      { label: 'Demander à être rappelé', variant: 'secondary' },
      { label: 'Demander un devis', variant: 'primary' },
      { label: 'RDV entretien', variant: 'accent' },
    ],
  },
}

export const Default: Story = {
  args: {
    headline: 'Réparation rapide et fiable',
    subheadline: 'Nos techniciens interviennent chez vous pour réparer vos appareils.',
    stat: '10 000 réparations par mois.',
    ctas: [
      { label: 'Prendre rendez-vous', variant: 'primary' },
      { label: 'En savoir plus', variant: 'secondary' },
    ],
  },
}
