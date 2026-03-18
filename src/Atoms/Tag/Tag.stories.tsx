import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Tag } from './Tag'

const meta: Meta<typeof Tag> = {
  title: 'Atoms/Tag',
  component: Tag,
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'select', options: ['default', 'active', 'highlight'] },
    size: { control: 'select', options: ['sm', 'md'] },
  },
}
export default meta
type Story = StoryObj<typeof Tag>

export const Default: Story = { args: { children: 'Lave-linge', variant: 'default' } }
export const Active: Story = { args: { children: 'Lave-linge', variant: 'active' } }
export const Highlight: Story = { args: { children: 'Nouveau', variant: 'highlight' } }
export const Small: Story = { args: { children: 'Sèche-linge', size: 'sm' } }

export const FilterGroup: Story = {
  render: () => {
    const [active, setActive] = React.useState('Lave-linge')
    const items = ['Lave-linge', 'Sèche-linge', 'Lave-vaisselle', 'Réfrigérateur', 'Four']
    return (
      <div className="flex flex-wrap gap-2">
        {items.map(item => (
          <Tag
            key={item}
            variant={active === item ? 'active' : 'default'}
            onClick={() => setActive(item)}
          >
            {item}
          </Tag>
        ))}
      </div>
    )
  },
}
