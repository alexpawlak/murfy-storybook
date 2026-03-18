import React, { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Input } from './Input'

const meta: Meta<typeof Input> = {
  title: 'Atoms/Input',
  component: Input,
  tags: ['autodocs'],
  argTypes: {
    type: { control: 'select', options: ['text', 'email', 'tel', 'number'] },
    disabled: { control: 'boolean' },
  },
}
export default meta
type Story = StoryObj<typeof Input>

export const Default: Story = {
  args: { label: 'Code postal', placeholder: '75001', type: 'text' },
}

export const WithHint: Story = {
  args: { label: 'Email', placeholder: 'vous@example.com', type: 'email', hint: 'Nous ne partageons jamais votre email.' },
}

export const WithError: Story = {
  args: { label: 'Code postal', placeholder: '75001', value: 'abcde', error: 'Format invalide, ex: 75001' },
}

export const Disabled: Story = {
  args: { label: 'Téléphone', placeholder: '06 12 34 56 78', disabled: true },
}

export const Controlled: Story = {
  render: () => {
    const [val, setVal] = useState('')
    return (
      <div className="max-w-xs">
        <Input label="Votre code postal" placeholder="75001" value={val} onChange={setVal} />
        <p className="mt-2 text-text-xsmall text-text-2">Valeur : {val || '—'}</p>
      </div>
    )
  },
}
