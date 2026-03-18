import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Button } from './Button'

const meta: Meta<typeof Button> = {
  title: 'Atoms/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'select', options: ['primary', 'secondary', 'accent'] },
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    disabled: { control: 'boolean' },
  },
}
export default meta
type Story = StoryObj<typeof Button>

export const Primary: Story = { args: { children: 'Prendre rendez-vous', variant: 'primary' } }
export const Secondary: Story = { args: { children: 'En savoir plus', variant: 'secondary' } }
export const Disabled: Story = { args: { children: 'Indisponible', disabled: true } }
export const Small: Story = { args: { children: 'Petit bouton', size: 'sm' } }
export const Large: Story = { args: { children: 'Grand bouton', size: 'lg' } }

export const AllSizes: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-4">
      <Button size="sm">Petit</Button>
      <Button size="md">Moyen</Button>
      <Button size="lg">Grand</Button>
    </div>
  ),
}

export const Accent: Story = { args: { children: 'Accent CTA', variant: 'accent' } }

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-4">
      <Button variant="primary">Prendre rendez-vous</Button>
      <Button variant="secondary">En savoir plus</Button>
      <Button variant="accent">Accent CTA</Button>
    </div>
  ),
}
