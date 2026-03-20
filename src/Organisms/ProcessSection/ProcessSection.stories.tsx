import type { Meta, StoryObj } from '@storybook/react'
import { ProcessSection } from './ProcessSection'

const meta: Meta<typeof ProcessSection> = {
  title: 'Organisms/ProcessSection',
  component: ProcessSection,
  parameters: { layout: 'fullscreen' },
}
export default meta
type Story = StoryObj<typeof ProcessSection>

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
