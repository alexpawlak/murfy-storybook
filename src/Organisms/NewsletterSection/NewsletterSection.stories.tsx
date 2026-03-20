import type { Meta, StoryObj } from '@storybook/react'
import { NewsletterSection } from './NewsletterSection'

const meta: Meta<typeof NewsletterSection> = {
  title: 'Organisms/NewsletterSection',
  component: NewsletterSection,
  parameters: { layout: 'fullscreen' },
  argTypes: {
    title: { control: 'text' },
    body: { control: 'text' },
    ctaLabel: { control: 'text' },
  },
}

export default meta
type Story = StoryObj<typeof NewsletterSection>

export const Default: Story = { args: {} }

export const WithImage: Story = {
  args: {
    imageUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=400&fit=crop',
  },
}
