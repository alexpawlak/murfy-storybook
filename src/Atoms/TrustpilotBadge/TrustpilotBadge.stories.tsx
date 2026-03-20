import type { Meta, StoryObj } from '@storybook/react'
import { TrustpilotBadge } from './TrustpilotBadge'

const meta: Meta<typeof TrustpilotBadge> = {
  title: 'Atoms/TrustpilotBadge',
  component: TrustpilotBadge,
  argTypes: {
    reviewCount: { control: 'number' },
    label: { control: 'text' },
    rating: { control: { type: 'number', min: 0, max: 5, step: 0.5 } },
  },
}

export default meta
type Story = StoryObj<typeof TrustpilotBadge>

export const Default: Story = {
  args: {
    reviewCount: 3500,
    label: 'Excellent',
    rating: 4.5,
  },
}

export const FiveStars: Story = {
  args: {
    reviewCount: 3500,
    label: 'Excellent',
    rating: 5,
  },
}

export const HighReviewCount: Story = {
  args: {
    reviewCount: 12000,
    label: 'Excellent',
    rating: 4.7,
  },
}
