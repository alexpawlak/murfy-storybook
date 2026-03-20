import type { Meta, StoryObj } from '@storybook/react'
import { ImpactSection } from './ImpactSection'

const meta: Meta<typeof ImpactSection> = {
  title: 'Organisms/ImpactSection',
  component: ImpactSection,
  parameters: { layout: 'fullscreen' },
  argTypes: { title: { control: 'text' } },
}

export default meta
type Story = StoryObj<typeof ImpactSection>

export const Default: Story = { args: {} }

export const WithPhoto: Story = {
  args: {
    imageUrl: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=600&h=400&fit=crop',
  },
}
