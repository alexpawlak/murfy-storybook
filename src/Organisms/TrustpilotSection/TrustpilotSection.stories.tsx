import type { Meta, StoryObj } from '@storybook/react'
import { TrustpilotSection } from './TrustpilotSection'

const meta: Meta<typeof TrustpilotSection> = {
  title: 'Organisms/TrustpilotSection',
  component: TrustpilotSection,
  parameters: { layout: 'fullscreen' },
  argTypes: {
    title: { control: 'text' },
    overallLabel: { control: 'text' },
    overallRating: { control: { type: 'number', min: 0, max: 5, step: 0.5 } },
    reviewCount: { control: 'number' },
  },
}

export default meta
type Story = StoryObj<typeof TrustpilotSection>

export const Default: Story = {
  args: {},
}
