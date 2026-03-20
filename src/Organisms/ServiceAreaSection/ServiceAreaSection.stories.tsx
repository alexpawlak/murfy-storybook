import type { Meta, StoryObj } from '@storybook/react'
import { ServiceAreaSection } from './ServiceAreaSection'

const meta: Meta<typeof ServiceAreaSection> = {
  title: 'Organisms/ServiceAreaSection',
  component: ServiceAreaSection,
  parameters: { layout: 'fullscreen' },
  argTypes: {
    title: { control: 'text' },
    body: { control: 'text' },
    ctaLabel: { control: 'text' },
  },
}

export default meta
type Story = StoryObj<typeof ServiceAreaSection>

export const Default: Story = { args: {} }
