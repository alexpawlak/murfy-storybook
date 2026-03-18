import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Tag } from './Tag'
import type { TagVariant } from './Tag'

const meta: Meta<typeof Tag> = {
  title: 'Atoms/Tag',
  component: Tag,
  parameters: { layout: 'fullscreen' },
  argTypes: {
    variant: {
      control: 'select',
      options: ['pink', 'outline', 'violet', 'yellow', 'fuschia'],
    },
    size: { control: 'select', options: ['sm', 'md'] },
    selected: { control: 'boolean' },
  },
}
export default meta
type Story = StoryObj<typeof Tag>

// ─── Layout helpers ───────────────────────────────────────────────────────────

function DocRow({
  title,
  description,
  children,
}: {
  title: string
  description: string
  children: React.ReactNode
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-6 border-t border-border">
      <div>
        <h4 className="text-sm font-semibold text-text-default">{title}</h4>
        <p className="text-sm text-text-2 mt-1 leading-relaxed" style={{ color: 'var(--text)' }}>
          {description}
        </p>
      </div>
      <div className="md:col-span-2 flex flex-wrap items-center gap-3">{children}</div>
    </div>
  )
}

// ─── Vertical selector demo ───────────────────────────────────────────────────

const VERTICALS: { label: string; variant: TagVariant; activity: string }[] = [
  { label: 'Électroménager', variant: 'pink',    activity: 'appliance' },
  { label: 'Chauffage',      variant: 'yellow',  activity: 'heating'   },
  { label: 'Solaire',        variant: 'violet',  activity: 'solar'     },
]

function VerticalSelector() {
  const [active, setActive] = React.useState('appliance')
  return (
    <div className="flex flex-wrap gap-2">
      {VERTICALS.map(({ label, variant, activity }) => (
        <Tag
          key={activity}
          variant={active === activity ? variant : 'outline'}
          onClick={() => setActive(activity)}
        >
          {label}
        </Tag>
      ))}
    </div>
  )
}

// ─── Filter group demo ────────────────────────────────────────────────────────

const APPLIANCES = ['Lave-linge', 'Sèche-linge', 'Lave-vaisselle', 'Réfrigérateur', 'Four']

function FilterGroup() {
  const [active, setActive] = React.useState('Lave-linge')
  return (
    <div className="flex flex-wrap gap-2">
      {APPLIANCES.map((item) => (
        <Tag
          key={item}
          variant={active === item ? 'pink' : 'outline'}
          onClick={() => setActive(item)}
        >
          {item}
        </Tag>
      ))}
    </div>
  )
}

// ─── Overview ────────────────────────────────────────────────────────────────

function TagOverview() {
  return (
    <div className="p-8 max-w-4xl space-y-12">
      <div>
        <h2 className="text-2xl font-bold text-text-default">Tag</h2>
        <p className="text-sm mt-1 max-w-xl" style={{ color: 'var(--text)' }}>
          Compact pill for filtering, categorisation, navigation, and status labelling.
          Five visual variants map directly to Murfy's brand palette — use them as static badges
          or interactive selectors for vertical navigation.
        </p>
      </div>

      {/* Variants */}
      <section>
        <h3 className="text-base font-bold mb-1 text-text-default">Variants</h3>
        <p className="text-sm mb-4 max-w-xl" style={{ color: 'var(--text)' }}>
          Five variants cover the full palette. Pink is the brand default. Outline is the neutral
          inactive state. Violet, Yellow and Fuschia align with vertical identities.
        </p>

        <DocRow
          title="Pink (default)"
          description="Soft pink fill — the brand default. Used for active filter chips or general-purpose labels in the électroménager vertical."
        >
          <Tag variant="pink">Lave-linge</Tag>
          <Tag variant="pink">Sèche-linge</Tag>
          <Tag variant="pink">Nouveau</Tag>
        </DocRow>

        <DocRow
          title="Outline"
          description="Transparent with border — the neutral inactive state. Pairs with filled variants in selector groups to show unselected items."
        >
          <Tag variant="outline">Lave-linge</Tag>
          <Tag variant="outline">Chauffage</Tag>
          <Tag variant="outline">Réfrigérateur</Tag>
        </DocRow>

        <DocRow
          title="Violet"
          description="Deep purple — aligned with the chauffage (heating) vertical. Communicates a distinct brand identity within the Murfy family."
        >
          <Tag variant="violet">Chauffage</Tag>
          <Tag variant="violet">Chaudière</Tag>
          <Tag variant="violet">Pompe à chaleur</Tag>
        </DocRow>

        <DocRow
          title="Yellow"
          description="Bright yellow — aligned with the solaire (solar) vertical. High visibility, draws attention to solar-specific content."
        >
          <Tag variant="yellow">Solaire</Tag>
          <Tag variant="yellow">Panneaux</Tag>
          <Tag variant="yellow">Promo</Tag>
        </DocRow>

        <DocRow
          title="Fuschia"
          description="Hot pink — for promotional highlights, special offers, or accent moments that need stronger contrast than the softer pink-500."
        >
          <Tag variant="fuschia">–20%</Tag>
          <Tag variant="fuschia">Offre spéciale</Tag>
          <Tag variant="fuschia">Urgent</Tag>
        </DocRow>
      </section>

      {/* Sizes */}
      <section>
        <h3 className="text-base font-bold mb-1 text-text-default">Sizes</h3>
        <p className="text-sm mb-4 max-w-xl" style={{ color: 'var(--text)' }}>
          Medium is the default. Small suits dense contexts — inside cards, inline annotations, or tight navigation areas.
        </p>

        <DocRow
          title="Medium vs Small"
          description="Same variants, two sizes. Scale down to Small when tags appear alongside small elements or in space-constrained layouts."
        >
          <Tag size="md" variant="pink">Medium</Tag>
          <Tag size="md" variant="outline">Medium</Tag>
          <Tag size="md" variant="violet">Medium</Tag>
          <Tag size="sm" variant="pink">Small</Tag>
          <Tag size="sm" variant="outline">Small</Tag>
          <Tag size="sm" variant="violet">Small</Tag>
        </DocRow>
      </section>

      {/* Navigation selectors */}
      <section>
        <h3 className="text-base font-bold mb-1 text-text-default">Vertical navigation selector</h3>
        <p className="text-sm mb-4 max-w-xl" style={{ color: 'var(--text)' }}>
          Tags as activity switchers. Each vertical gets its brand color when active;
          inactive items fall back to Outline. Click to switch.
        </p>

        <DocRow
          title="Vertical selector"
          description="Ideal for the hero or nav bar to jump between Électroménager, Chauffage, and Solaire activities. The selected ring signals keyboard focus too."
        >
          <VerticalSelector />
        </DocRow>
      </section>

      {/* Filter group */}
      <section>
        <h3 className="text-base font-bold mb-1 text-text-default">Filter group</h3>
        <p className="text-sm mb-4 max-w-xl" style={{ color: 'var(--text)' }}>
          Classic single-select filter row. Active state uses the pink variant; inactive tags become Outline.
        </p>

        <DocRow
          title="Appliance filter"
          description="One tag active at a time. Toggling updates the active fill; all others revert to Outline. Works without any global state."
        >
          <FilterGroup />
        </DocRow>
      </section>
    </div>
  )
}

export const Overview: Story = { render: () => <TagOverview /> }

// ─── Playground ───────────────────────────────────────────────────────────────

export const Playground: Story = {
  args: {
    children: 'Lave-linge',
    variant: 'pink',
    size: 'md',
    selected: false,
  },
}
