import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { TrustpilotSection } from './TrustpilotSection'
import { DocHeader, DocSection, GuidanceGrid, AccessibilityNote } from '../../Foundation/doc-components'

const meta: Meta<typeof TrustpilotSection> = {
  title: 'Organisms/TrustpilotSection',
  component: TrustpilotSection,
  parameters: { layout: 'fullscreen' },
  argTypes: {
    title: { control: 'text' },
    overallLabel: { control: 'text' },
    overallRating: { control: { type: 'number', min: 0, max: 5, step: 0.5 } },
    reviewCount: { control: 'number' },
  },
}

export default meta
type Story = StoryObj<typeof TrustpilotSection>


export const Overview: Story = {
  render: () => (
    <div className="min-h-screen" style={{ background: 'var(--bg)' }}>
      <DocHeader layer="Organisms" title='TrustpilotSection' description='Full reviews section: overall Trustpilot rating badge + a grid of individual review cards. Provides social proof on the homepage and vertical pages. Uses TrustpilotBadge atom plus review card atoms.' />
      <div className="px-8 py-12 max-w-5xl">
        <DocSection label="Composition">
          <div className="rounded-[var(--radius-card)] border border-border px-5 py-4" style={{ background: 'color-mix(in srgb, var(--accent-btn-bg) 5%, var(--bg))' }}>
            <p className="text-text-small text-text" style={{ opacity: 0.75 }}>
              Atoms used: TrustpilotBadge, TrustpilotStars<br />
              Layout: Overall badge on left, review card grid on right — stacked on mobile
            </p>
          </div>
        </DocSection>
        <DocSection label="Best Practices">
          <GuidanceGrid
            dos={[
              { rule: 'Always show the review count alongside the aggregate rating.', rationale: 'A rating of 4.5/5 from 3 reviews is meaningless. The review count provides the credibility context that makes the rating trustworthy. TrustpilotBadge includes this by default.' },
              { rule: 'Keep individual review quotes under 3 sentences.', rationale: "Review cards are scanned, not read. Long quotes overflow on mobile and dilute the social proof density. Truncate with a 'Lire la suite' link if the full review is available on Trustpilot." },
            ]}
            donts={[
              { rule: 'Do not fabricate or selectively curate only 5-star reviews.', rationale: 'Showing only perfect reviews erodes trust when users cross-check Trustpilot directly. Display reviews that reflect the true distribution, including constructive ones.' },
            ]}
          />
        </DocSection>
        <DocSection label="Accessibility & WCAG">
          <div className="flex flex-col gap-4">
            <AccessibilityNote criterion='WCAG 2.1 AA 1.1.1 — Non-text Content' requirement="The Trustpilot logo must have alt='Trustpilot' — not alt='' or alt='logo'" why="The Trustpilot logo identifies the review platform. Marking it as decorative (alt='') leaves users without the context of which platform the reviews come from. The logo is informative, not decorative." />
          </div>
        </DocSection>
      </div>
    </div>
  ),
}

export const Default: Story = {
  args: {},
}
