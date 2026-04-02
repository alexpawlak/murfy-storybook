import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Tag } from './Tag'
import type { TagVariant } from './Tag'
import { DocHeader, DocSection, GuidanceGrid, AccessibilityNote } from '../../Foundation/doc-components'

const meta: Meta<typeof Tag> = {
  title: 'Atoms/Tag',
  component: Tag,
  parameters: { layout: 'fullscreen' },
  argTypes: {
    variant: { control: 'select', options: ['pink', 'outline', 'violet', 'yellow', 'fuschia'] },
    size: { control: 'select', options: ['sm', 'md'] },
    selected: { control: 'boolean' },
  },
}
export default meta
type Story = StoryObj<typeof Tag>

// ─── Layout helper ────────────────────────────────────────────────────────────

function DocRow({ title, description, children }: { title: string; description: string; children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-6 border-t border-border">
      <div>
        <h4 className="text-text-small-semibold text-text">{title}</h4>
        <p className="text-text-xsmall mt-1 leading-relaxed text-text" style={{ opacity: 0.65 }}>{description}</p>
      </div>
      <div className="md:col-span-2 flex flex-wrap items-center gap-3">{children}</div>
    </div>
  )
}

// ─── Interactive demos ────────────────────────────────────────────────────────

const VERTICALS: { label: string; variant: TagVariant; activity: string }[] = [
  { label: 'Électroménager', variant: 'pink',   activity: 'appliance' },
  { label: 'Chauffage',      variant: 'yellow', activity: 'heating'   },
  { label: 'Solaire',        variant: 'violet', activity: 'solar'     },
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

const APPLIANCES = ['Lave-linge', 'Sèche-linge', 'Lave-vaisselle', 'Réfrigérateur', 'Four']

function FilterGroup() {
  const [active, setActive] = React.useState('Lave-linge')
  return (
    <div className="flex flex-wrap gap-2">
      {APPLIANCES.map((item) => (
        <Tag key={item} variant={active === item ? 'pink' : 'outline'} onClick={() => setActive(item)}>
          {item}
        </Tag>
      ))}
    </div>
  )
}

// ─── Overview ─────────────────────────────────────────────────────────────────

export const Overview: Story = {
  render: () => (
    <div className="min-h-screen" style={{ background: 'var(--bg)' }}>
      <DocHeader
        layer="Atoms"
        title="Tag"
        description="Compact pill for filtering, categorisation, navigation, and status labelling. Five visual variants map to Murfy's brand palette — use them as static badges or interactive selectors for vertical navigation."
      />

      <div className="px-8 py-12 max-w-4xl">

        {/* ── Showcase ──────────────────────────────────────────────────── */}
        <DocSection
          label="Showcase"
          subtitle="Five variants × two sizes. Pink is the brand default. Outline is the neutral inactive state."
        >
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
            description="Transparent with border — the neutral inactive state. Pairs with filled variants in selector groups."
          >
            <Tag variant="outline">Lave-linge</Tag>
            <Tag variant="outline">Chauffage</Tag>
            <Tag variant="outline">Réfrigérateur</Tag>
          </DocRow>

          <DocRow
            title="Violet"
            description="Deep purple — aligned with the chauffage (heating) vertical. Communicates a distinct brand identity."
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
            description="Hot pink — for promotional highlights, special offers, or accent moments that need stronger contrast than the softer pink."
          >
            <Tag variant="fuschia">–20%</Tag>
            <Tag variant="fuschia">Offre spéciale</Tag>
            <Tag variant="fuschia">Urgent</Tag>
          </DocRow>

          <DocRow
            title="Sizes"
            description="Medium is the default. Small suits dense contexts — inside cards, inline annotations, or tight navigation areas."
          >
            <Tag size="md" variant="pink">Medium</Tag>
            <Tag size="md" variant="outline">Medium</Tag>
            <Tag size="md" variant="violet">Medium</Tag>
            <Tag size="sm" variant="pink">Small</Tag>
            <Tag size="sm" variant="outline">Small</Tag>
            <Tag size="sm" variant="violet">Small</Tag>
          </DocRow>
        </DocSection>

        {/* ── Usage demos ───────────────────────────────────────────────── */}
        <DocSection
          label="Usage patterns"
          subtitle="Tags as vertical navigation selectors and single-select filter groups."
        >
          <DocRow
            title="Vertical selector"
            description="Active tag uses the vertical's brand color; inactive tags fall back to Outline. Click to switch."
          >
            <VerticalSelector />
          </DocRow>

          <DocRow
            title="Appliance filter"
            description="One tag active at a time. Toggling updates the active fill; all others revert to Outline."
          >
            <FilterGroup />
          </DocRow>
        </DocSection>

        {/* ── Best Practices ────────────────────────────────────────────── */}
        <DocSection label="Best Practices" subtitle="Rules for tag usage across verticals, states, and contexts.">
          <GuidanceGrid
            dos={[
              {
                rule: 'Use the pill shape (radius-pill) as the visual signal for interactive tags.',
                rationale: 'The fully-rounded pill shape is the universal visual shorthand for "this is a clickable chip or filter". Cards and panels use radius-card — the shape difference is part of the interaction model.',
              },
              {
                rule: 'Always pair color with a shape or text change to communicate active state.',
                rationale: 'Color alone cannot communicate selected vs. unselected for colorblind users. The filled variant vs. outline is a second cue (shape), which satisfies WCAG 1.4.1.',
                wcag: 'WCAG 2.1 AA 1.4.1',
              },
              {
                rule: 'Keep tag text to 1–3 words maximum.',
                rationale: 'Tags are meant to be scanned, not read. Long labels break the pill shape, create uneven tag widths in filter rows, and reduce the scannability of a filter group as a whole.',
              },
              {
                rule: 'For static badges (non-interactive), still use semantic HTML — span with role="status" if dynamic.',
                rationale: 'Non-interactive tags can use <span>, but if the tag value changes dynamically (e.g. a live status badge), it must use role="status" so screen readers announce the change.',
                wcag: 'WCAG 2.1 AA 4.1.3',
              },
            ]}
            donts={[
              {
                rule: 'Do not use yellow tags without verifying text contrast is dark.',
                rationale: 'Yellow is a very light color (luminance ~0.93). Text on yellow must use `dark-900` or an equivalent dark token to pass WCAG AA at 4.5:1. White or light text on yellow fails.',
                wcag: 'WCAG 2.1 AA 1.4.3',
              },
              {
                rule: 'Do not mix the same accent variant across different verticals.',
                rationale: 'Variant colors signal vertical identity. Using violet tags in a solar context creates false brand signaling and confuses users who expect violet = chauffage.',
              },
              {
                rule: 'Do not use the small size for interactive tags in touch interfaces.',
                rationale: 'WCAG 2.5.5 requires 44×44px minimum touch targets. Small tags may fall below this threshold. Reserve the small variant for dense, non-touch contexts (desktop data tables, inline annotation chips).',
                wcag: 'WCAG 2.1 AA 2.5.5',
              },
              {
                rule: 'Do not use tags as a replacement for a proper navigation component.',
                rationale: 'Tags for vertical switching are appropriate inside a section or hero. For site-wide navigation, use the NavBar — tags do not support keyboard navigation patterns expected by screen readers in a nav context (role="navigation", etc.).',
              },
            ]}
          />
        </DocSection>

        {/* ── Accessibility ─────────────────────────────────────────────── */}
        <DocSection label="Accessibility & WCAG">
          <div className="flex flex-col gap-4">
            <AccessibilityNote
              criterion="WCAG 2.1 AA 1.4.3 — Contrast (Minimum)"
              requirement="4.5:1 for tag label text (12px semibold counts as small text)"
              why="Tag text at 12px (the label scale step) is below the 'large text' threshold (18pt / 14pt bold). This means it must meet the stricter 4.5:1 ratio. The pink and outline tags use dark brand text on light backgrounds — both pass comfortably. Yellow tags require `dark-900` text to pass."
              href="https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum.html"
            />
            <AccessibilityNote
              criterion="WCAG 2.1 AA 1.4.1 — Use of Color"
              requirement="Color must not be the only visual means of conveying active/selected state"
              why="The filled vs. outline shape difference provides a second, non-color cue for the active state. This is sufficient for colorblind users. If tags ever become purely color-differentiated without shape change (e.g. two filled variants at different opacities), a third cue (checkmark icon, underline) would be needed."
              href="https://www.w3.org/WAI/WCAG21/Understanding/use-of-color.html"
            />
            <AccessibilityNote
              criterion="WCAG 2.1 AA 2.5.5 — Target Size"
              requirement="Interactive elements must be at least 44×44 CSS pixels"
              why="Medium tags are designed to meet or exceed 44px height. The small variant (sm) may fall below this — avoid using small tags as interactive touch targets on mobile. Use them only for informational badges in desktop contexts."
              href="https://www.w3.org/WAI/WCAG21/Understanding/target-size.html"
            />
          </div>
        </DocSection>

      </div>
    </div>
  ),
}

// ─── Playground ───────────────────────────────────────────────────────────────

export const Playground: Story = {
  args: { children: 'Lave-linge', variant: 'pink', size: 'md', selected: false },
}
