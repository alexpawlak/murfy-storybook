import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Footer } from './Footer'

const meta: Meta<typeof Footer> = {
  title: 'Molecules/Footer',
  component: Footer,
  parameters: { layout: 'fullscreen' },
  argTypes: {
    defaultFaqOpen: { control: 'boolean' },
  },
}
export default meta
type Story = StoryObj<typeof Footer>

// ─── Overview ─────────────────────────────────────────────────────────────────

export const Overview: Story = {
  render: () => (
    <div className="max-w-sm mx-auto">
      <Footer />
    </div>
  ),
}

// ─── Playground ───────────────────────────────────────────────────────────────

export const Playground: Story = {
  args: {
    defaultFaqOpen: false,
  },
  decorators: [
    (Story) => (
      <div className="max-w-sm mx-auto">
        <Story />
      </div>
    ),
  ],
}

// ─── Full width ───────────────────────────────────────────────────────────────

export const FullWidth: Story = {
  render: () => <Footer />,
}
