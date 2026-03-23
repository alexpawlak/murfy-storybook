import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { StatItem } from './StatItem'
import { DocHeader, DocSection, GuidanceGrid, AccessibilityNote } from '../../Foundation/doc-components'

const meta: Meta<typeof StatItem> = {
  title: 'Atoms/StatItem',
  component: StatItem,
  parameters: { layout: 'fullscreen' },
  argTypes: {
    value: { control: 'text' },
    label: { control: 'text' },
  },
}

export default meta
type Story = StoryObj<typeof StatItem>

// ─── Overview ─────────────────────────────────────────────────────────────────

export const Overview: Story = {
  render: () => (
    <div className="min-h-screen" style={{ background: 'var(--bg)' }}>
      <DocHeader
        layer="Atoms"
        title="StatItem"
        description="A key metric display: a large bold value paired with a short description label. Used in the Impact Section to communicate Murfy's scale — technicians, repaired appliances, waste saved. The value is prominent (h2 scale); the label is supporting copy."
      />

      <div className="px-8 py-12 max-w-3xl">

        {/* ── Showcase ──────────────────────────────────────────────────── */}
        <DocSection
          label="Showcase"
          subtitle="The three stat items used in the live Impact section."
        >
          <div className="flex flex-col gap-8 text-[color:var(--text)]">
            <StatItem value="250" label="Réparateurs partout en France" />
            <StatItem value="+ 350 000" label="Appareils réparés" />
            <StatItem value="-65KG" label="de déchets par appareil réparé" />
          </div>

          <div
            className="mt-10 rounded-[var(--radius-card)] p-6"
            style={{ background: 'var(--dark-900)' }}
          >
            <p className="text-text-xsmall-semibold text-white mb-6" style={{ opacity: 0.5 }}>On dark background — typical Impact Section context</p>
            <div className="flex flex-col gap-8 text-white">
              <StatItem value="250" label="Réparateurs partout en France" />
              <StatItem value="+ 350 000" label="Appareils réparés" />
              <StatItem value="-65KG" label="de déchets par appareil réparé" />
            </div>
          </div>
        </DocSection>

        {/* ── Best Practices ────────────────────────────────────────────── */}
        <DocSection label="Best Practices">
          <GuidanceGrid
            dos={[
              {
                rule: 'Keep value strings short — 2–8 characters maximum.',
                rationale: 'The value renders at h2 scale (46px desktop). A long string like "Plus de 350 000" pushes the label off-axis and breaks the horizontal alignment. Prefer compact notation: "+ 350 000".',
              },
              {
                rule: 'Keep description labels under 5 words.',
                rationale: 'The label wraps next to the value at a small scale (text-xsmall). Long labels create uneven columns and push the visual balance off when multiple StatItems appear side by side.',
              },
            ]}
            donts={[
              {
                rule: 'Do not animate the value counter without providing a prefers-reduced-motion override.',
                rationale: 'Counting animations can trigger vestibular disorders in users sensitive to motion. Any animation on the value must respect prefers-reduced-motion by disabling or reducing the animation.',
                wcag: 'WCAG 2.1 AA 2.3.3',
              },
              {
                rule: 'Do not use vague or unverified numbers.',
                rationale: 'Stats are trust signals. "Environ 250 000" is weaker than "+ 350 000". Unverifiable claims also create legal risk under French advertising law.',
              },
            ]}
          />
        </DocSection>

        {/* ── Accessibility ─────────────────────────────────────────────── */}
        <DocSection label="Accessibility & WCAG">
          <div className="flex flex-col gap-4">
            <AccessibilityNote
              criterion="WCAG 2.1 AA 1.4.3 — Contrast"
              requirement="Value text (h2 bold) and label text (xsmall) must both meet 4.5:1 against background"
              why="Both the large value and the small label use var(--text) which resolves to brand dark green on light themes. On the dark Impact Section background (dark-900), the text uses var(--text) which should resolve to a light value. Verify the token resolves correctly in dark contexts — if the dark theme token is not set, the text may become invisible."
            />
            <AccessibilityNote
              criterion="WCAG 2.1 AA 2.3.3 — Animation from Interactions"
              requirement="Users must be able to disable motion-based animations"
              why="If a count-up animation is ever added to StatItem values (a common pattern for impact sections), it must check for prefers-reduced-motion: reduce media query and skip the animation entirely. Users with vestibular disorders can experience nausea from rapid number changes."
              href="https://www.w3.org/WAI/WCAG21/Understanding/animation-from-interactions.html"
            />
          </div>
        </DocSection>

      </div>
    </div>
  ),
}

// ─── Playground ───────────────────────────────────────────────────────────────

export const Playground: Story = {
  args: { value: '+ 350 000', label: 'Appareils réparés' },
  decorators: [(Story) => <div className="p-8"><Story /></div>],
}
