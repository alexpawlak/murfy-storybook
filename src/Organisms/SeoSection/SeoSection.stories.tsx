import type { Meta, StoryObj } from '@storybook/react'
import { SeoSection } from './SeoSection'

const meta: Meta<typeof SeoSection> = {
  title: 'Organisms/SeoSection',
  component: SeoSection,
  parameters: { layout: 'fullscreen' },
  argTypes: {
    title: { control: 'text' },
    subheading: { control: 'text' },
    body: { control: 'text' },
  },
}

export default meta
type Story = StoryObj<typeof SeoSection>

export const Default: Story = {}

export const BodyExpanded: Story = {
  args: {
    body: "Murfy c'est une jeune PME qui a décidé de s'attaquer à nos déchets électroménagers et à l'obsolescence programmée. Chez Murfy nous avons à cœur de vous accompagner dans la réparation d'électroménager pour prolonger la durée de vie de vos appareils électroménagers et ainsi éviter des déchets inutiles.",
  },
}
