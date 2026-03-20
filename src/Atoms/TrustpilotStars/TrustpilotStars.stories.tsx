import type { Meta, StoryObj } from '@storybook/react'
import { TrustpilotStars } from './TrustpilotStars'

const meta: Meta<typeof TrustpilotStars> = {
  title: 'Atoms/TrustpilotStars',
  component: TrustpilotStars,
  argTypes: {
    rating: { control: { type: 'number', min: 0, max: 5, step: 0.5 } },
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
  },
}

export default meta
type Story = StoryObj<typeof TrustpilotStars>

export const FiveStars: Story = {
  args: { rating: 5, size: 'md' },
}

export const HalfStar: Story = {
  args: { rating: 4.5, size: 'md' },
}

export const FourStars: Story = {
  args: { rating: 4, size: 'md' },
}

export const Large: Story = {
  args: { rating: 5, size: 'lg' },
}

export const Small: Story = {
  args: { rating: 4.5, size: 'sm' },
}
