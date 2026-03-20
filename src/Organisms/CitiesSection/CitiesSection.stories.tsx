import type { Meta, StoryObj } from '@storybook/react'
import { CitiesSection } from './CitiesSection'

const meta: Meta<typeof CitiesSection> = {
  title: 'Organisms/CitiesSection',
  component: CitiesSection,
  parameters: { layout: 'fullscreen' },
  argTypes: {
    title: { control: 'text' },
  },
}

export default meta
type Story = StoryObj<typeof CitiesSection>

export const Default: Story = {}

export const SingleRegion: Story = {
  args: {
    regions: [
      {
        name: 'Île-de-France',
        cities: ['Paris', 'Versailles', 'Montreuil'],
      },
    ],
  },
}
