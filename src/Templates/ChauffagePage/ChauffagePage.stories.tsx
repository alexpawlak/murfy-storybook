import type { Meta, StoryObj } from '@storybook/react'
import { ChauffagePage } from './ChauffagePage'

const meta: Meta<typeof ChauffagePage> = {
  title: 'Templates/ChauffagePage',
  component: ChauffagePage,
  parameters: { layout: 'fullscreen' },
}

export default meta
type Story = StoryObj<typeof ChauffagePage>

export const Default: Story = {}
