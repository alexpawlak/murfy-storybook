import type { Meta, StoryObj } from '@storybook/react'
import { TestimonialsSection } from './TestimonialsSection'

const meta: Meta<typeof TestimonialsSection> = {
  title: 'Organisms/TestimonialsSection',
  component: TestimonialsSection,
  parameters: { layout: 'fullscreen' },
}
export default meta
type Story = StoryObj<typeof TestimonialsSection>

export const Chauffage: Story = {
  args: {
    title: 'Ils nous ont fait confiance',
    reviews: [
      {
        quote: 'Installation parfaite et très professionnelle, tout fonctionne à merveille',
        author: 'Vincent',
        location: 'Bouches-du-Rhône',
        rating: 5,
      },
      {
        quote: 'Équipe sérieuse et professionnelle, du devis jusqu\'à la réalisation',
        author: 'Pierre',
        location: 'Var',
        rating: 5,
      },
    ],
  },
}
