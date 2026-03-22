import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { VerticalSelector, DEFAULT_VERTICALS } from './VerticalSelector'
import { DocHeader, DocSection, GuidanceGrid, AccessibilityNote } from '../../Foundation/doc-components'

const meta: Meta<typeof VerticalSelector> = {
  title: 'Molecules/VerticalSelector',
  component: VerticalSelector,
  parameters: { layout: 'fullscreen' },
  argTypes: {
    activeId: { control: 'select', options: DEFAULT_VERTICALS.map(v => v.id) },
  },
}
export default meta
type Story = StoryObj<typeof VerticalSelector>

export const Overview: Story = {
  render: () => (
    <div className="min-h-screen" style={{ background: 'var(--bg)' }}>
      <DocHeader
        layer="Molecules"
        title="VerticalSelector"
        description="Pill-style tab row for switching between Murfy verticals (Électroménager, Chauffage, Solaire). Each vertical uses its own accent color when active. Built from Tag atoms managed as a controlled radio-group."
      />

      <div className="px-8 py-12 max-w-3xl">

        <DocSection label="Showcase" subtitle="All three vertical states.">
          <div className="space-y-6">
            {['electromenager', 'chauffage', 'solaire'].map(id => (
              <div key={id} className="border-t border-border pt-6 first:border-0 first:pt-0">
                <p className="text-text-xsmall-semibold text-text mb-3 capitalize" style={{ opacity: 0.5 }}>{id} active</p>
                <VerticalSelector activeId={id} />
              </div>
            ))}
          </div>
        </DocSection>

        <DocSection label="Best Practices">
          <GuidanceGrid
            dos={[
              {
                rule: 'Always keep inactive verticals visible as outline tags.',
                rationale: 'Hiding unselected verticals removes discoverability. Users need to see all three options at once to understand that content will change when they switch — and to know which verticals exist.',
              },
              {
                rule: 'Announce the active vertical to screen readers when it changes.',
                rationale: 'When a user clicks a vertical tab, the content below changes. Screen readers must be notified via aria-live or role="status" so blind users know what has been updated.',
                wcag: 'WCAG 2.1 AA 4.1.3',
              },
            ]}
            donts={[
              {
                rule: 'Do not use VerticalSelector inside a dense card — use it at section level.',
                rationale: 'The selector changes the content of an entire section. Placing it inside a card implies it only affects that card\'s content, which creates misleading affordance.',
              },
              {
                rule: 'Do not add a fourth vertical without updating all accent tokens.',
                rationale: 'Each vertical requires its own accent color token. Adding a vertical without a defined accent falls back to the default, which visually suggests it\'s the same service as the general Murfy brand.',
              },
            ]}
          />
        </DocSection>

        <DocSection label="Accessibility & WCAG">
          <div className="flex flex-col gap-4">
            <AccessibilityNote
              criterion="WCAG 2.1 AA 1.4.1 — Use of Color"
              requirement="Active state must not rely on color alone"
              why="The filled tag vs. outline tag provides a shape cue (not just color) for the active state. This ensures colorblind users can identify which vertical is selected. Never remove the shape difference — it is the required non-color cue."
              href="https://www.w3.org/WAI/WCAG21/Understanding/use-of-color.html"
            />
            <AccessibilityNote
              criterion="WCAG 2.1 AA 4.1.2 — Name, Role, Value"
              requirement="Tab controls must expose their role, label, and selected state"
              why="Each vertical button should use role='tab' or role='radio' with aria-selected or aria-checked, grouped inside a role='tablist' or role='radiogroup'. Without these, screen readers announce three anonymous buttons with no indication which is currently active."
              href="https://www.w3.org/WAI/WCAG21/Understanding/name-role-value.html"
            />
          </div>
        </DocSection>

      </div>
    </div>
  ),
}

export const Playground: Story = {
  args: { verticals: DEFAULT_VERTICALS, activeId: 'electromenager' },
  decorators: [(Story) => <div className="p-8"><Story /></div>],
}
