import type { Meta, StoryObj } from '@storybook/react'
import { StatItem } from './StatItem'

const meta: Meta<typeof StatItem> = {
  title: 'Atoms/StatItem',
  component: StatItem,
  argTypes: {
    value: { control: 'text' },
    label: { control: 'text' },
  },
}

export default meta
type Story = StoryObj<typeof StatItem>

export const Technicians: Story = {
  args: { value: '250', label: 'Réparateurs partout en France' },
}

export const Appliances: Story = {
  args: { value: '+ 350 000', label: 'Appareils réparés' },
}

export const Waste: Story = {
  args: { value: '-65KG', label: 'de déchets par appareil réparé' },
}
