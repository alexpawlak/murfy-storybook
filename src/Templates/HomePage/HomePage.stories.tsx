import type { Meta, StoryObj } from '@storybook/react'
import { HomePage } from './HomePage'

const meta: Meta<typeof HomePage> = {
  title: 'Templates/HomePage',
  component: HomePage,
  parameters: { layout: 'fullscreen' },
  argTypes: {
    heroImageUrl: { control: 'text' },
    impactImageUrl: { control: 'text' },
    recruitmentImageUrl: { control: 'text' },
  },
}

export default meta
type Story = StoryObj<typeof HomePage>

export const Default: Story = {}
