import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { ImpactSection } from './ImpactSection'
import { DocHeader, DocSection, GuidanceGrid, AccessibilityNote } from '../../Foundation/doc-components'

const meta: Meta<typeof ImpactSection> = {
  title: 'Organisms/ImpactSection',
  component: ImpactSection,
  parameters: { layout: 'fullscreen' },
  argTypes: { title: { control: 'text' } },
}

export default meta
type Story = StoryObj<typeof ImpactSection>


export const Overview: Story = {
  render: () => (
    <div className="min-h-screen" style={{ background: 'var(--bg)' }}>
      <DocHeader layer="Organisms" title='ImpactSection' description="Key metrics section showcasing Murfy's scale and environmental impact: number of technicians, appliances repaired, and CO₂/waste saved per repair. Uses StatItem atoms on a dark background." />
      <div className="px-8 py-12 max-w-5xl">
        <DocSection label="Composition">
          <div className="rounded-[var(--radius-card)] border border-border px-5 py-4" style={{ background: 'color-mix(in srgb, var(--accent-btn-bg) 5%, var(--bg))' }}>
            <p className="text-text-small text-text" style={{ opacity: 0.75 }}>
              Atoms used: StatItem (× 3)<br />
              Layout: Three stats in a row — stacked on mobile<br />
              Background: Dark (dark-900) surface — not theme-dependent
            </p>
          </div>
        </DocSection>
        <DocSection label="Best Practices">
          <GuidanceGrid
            dos={[
              { rule: 'Verify that var(--text) resolves to a light color on the dark-900 background.', rationale: 'The ImpactSection uses a fixed dark background. If the current theme sets var(--text) to a dark value, it will be invisible against dark-900. The dark theme token set should resolve this — but verify.' },
              { rule: 'Keep values precise and verifiable.', rationale: "Impact statistics are trust signals. Round numbers ('environ 300 000') feel fabricated. Specific numbers ('+ 350 000') feel data-backed." },
            ]}
            donts={[
              { rule: 'Do not animate value counters without a prefers-reduced-motion override.', rationale: 'Counting animations on the stat values can trigger vestibular disorders. Any count-up animation must pause or skip for users who have enabled reduced motion in their OS settings.', wcag: 'WCAG 2.1 AA 2.3.3' },
            ]}
          />
        </DocSection>
        <DocSection label="Accessibility & WCAG">
          <div className="flex flex-col gap-4">
            <AccessibilityNote criterion='WCAG 2.1 AA 1.4.3 — Contrast' requirement='StatItem text must meet 4.5:1 against the dark-900 background' why="The large value (h2 scale) and the small label (text-xsmall) both use var(--text). On dark-900, this must resolve to a light color meeting 4.5:1 contrast. If a theme sets var(--text) to a dark value, the ImpactSection will fail contrast — it may need a dedicated data-theme='dark' wrapper." />
          </div>
        </DocSection>
      </div>
    </div>
  ),
}

export const Default: Story = { args: {} }

export const WithPhoto: Story = {
  args: {
    imageUrl: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=600&h=400&fit=crop',
  },
}
