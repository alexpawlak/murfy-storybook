import React, { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Input } from './Input'

const meta: Meta<typeof Input> = {
  title: 'Atoms/Input',
  component: Input,
  parameters: { layout: 'fullscreen' },
  argTypes: {
    type: { control: 'select', options: ['text', 'email', 'tel', 'number'] },
    disabled: { control: 'boolean' },
  },
}
export default meta
type Story = StoryObj<typeof Input>

// ─── Layout helpers ───────────────────────────────────────────────────────────

function DocRow({ title, description, children }: { title: string; description: string; children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-6 border-t border-border">
      <div>
        <h4 className="text-sm font-semibold">{title}</h4>
        <p className="text-sm text-text-2 mt-1 leading-relaxed">{description}</p>
      </div>
      <div className="md:col-span-2 max-w-sm">
        {children}
      </div>
    </div>
  )
}

// ─── Overview ────────────────────────────────────────────────────────────────

export const Overview: Story = {
  render: () => (
    <div className="p-8 max-w-4xl space-y-12">

      <div>
        <h2 className="text-2xl font-bold">Input</h2>
        <p className="text-sm text-text-2 mt-1 max-w-xl">
          Text field used in forms — postal code entry, contact details, search.
          The label is always visible above the field so users don't lose context while typing.
        </p>
      </div>

      <section>
        <h3 className="text-base font-bold mb-1">States</h3>
        <p className="text-sm text-text-2 mb-4 max-w-xl">
          The input has four distinct states. Each communicates something different to the user
          — guide them before they type, while they type, and after validation.
        </p>

        <DocRow
          title="Default"
          description="Empty field ready for input. Placeholder shows an example value — not a label replacement."
        >
          <Input label="Code postal" placeholder="75001" type="text" />
        </DocRow>

        <DocRow
          title="With hint"
          description="Helper text below the field. Use to set expectations — accepted formats, privacy notes — before the user makes a mistake."
        >
          <Input label="Email" placeholder="vous@example.com" type="email" hint="Nous ne partageons jamais votre email." />
        </DocRow>

        <DocRow
          title="With error"
          description="Shown after validation fails. The message replaces the hint and turns red. Be specific — tell the user exactly what to fix."
        >
          <Input label="Code postal" placeholder="75001" value="abcde" error="Format invalide, ex: 75001" />
        </DocRow>

        <DocRow
          title="Disabled"
          description="Read-only and non-interactive. Use when a field depends on a prior step not yet completed, or when the value is system-set."
        >
          <Input label="Téléphone" placeholder="06 12 34 56 78" disabled />
        </DocRow>
      </section>

    </div>
  ),
}

// ─── Playground ───────────────────────────────────────────────────────────────

export const Playground: Story = {
  render: () => {
    const [val, setVal] = useState('')
    return (
      <div className="p-8 max-w-xs">
        <Input label="Votre code postal" placeholder="75001" value={val} onChange={setVal} />
        <p className="mt-2 text-text-xsmall text-text-2">Valeur : {val || '—'}</p>
      </div>
    )
  },
}
