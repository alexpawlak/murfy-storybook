import type { Meta, StoryObj } from '@storybook/react'
import { MurfyHomepage } from './MurfyHomepage'

const meta: Meta<typeof MurfyHomepage> = {
  title: 'TestPages/MurfyHomepage',
  component: MurfyHomepage,
  parameters: {
    layout: 'fullscreen',
  },
}
export default meta
type Story = StoryObj<typeof MurfyHomepage>

export const Default: Story = {}
