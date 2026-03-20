import type { Meta, StoryObj } from '@storybook/react'
import { HeroSection } from './HeroSection'
import heroPhoto from '../../Assets/photos/3 gars.png'

const meta: Meta<typeof HeroSection> = {
  title: 'Organisms/HeroSection',
  component: HeroSection,
  parameters: { layout: 'fullscreen' },
  argTypes: {
    subtext: { control: 'text' },
    ctaLabel: { control: 'text' },
    price: { control: 'text' },
    trustpilotRating: { control: { type: 'number', min: 0, max: 5, step: 0.5 } },
  },
}

export default meta
type Story = StoryObj<typeof HeroSection>

export const Default: Story = {
  args: {
    subtext: 'Plus de 300 000 français nous ont déjà fait confiance pour réparer leur électroménager.',
    ctaLabel: 'Voir les disponibilités',
    price: '75€',
    priceLabel: 'À partir de',
    priceSublabel: 'avec le Bonus',
    trustpilotRating: 4.5,
    trustpilotLabel: 'Excellent',
    checkItems: ['VOTRE RDV EN 3MIN', 'PAYEZ APRÈS LE RDV'],
    imageUrl: heroPhoto,
  },
}

export const NoImage: Story = {
  args: {
    ...Default.args,
    imageUrl: undefined,
  },
}
