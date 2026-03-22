import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { TrustpilotStars } from './TrustpilotStars'
import { DocHeader, DocSection, GuidanceGrid, AccessibilityNote } from '../../Foundation/doc-components'

const meta: Meta<typeof TrustpilotStars> = {
  title: 'Atoms/TrustpilotStars',
  component: TrustpilotStars,
  parameters: { layout: 'fullscreen' },
  argTypes: {
    rating: { control: { type: 'number', min: 0, max: 5, step: 0.5 } },
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
  },
}

export default meta
type Story = StoryObj<typeof TrustpilotStars>

// ─── Overview ─────────────────────────────────────────────────────────────────

export const Overview: Story = {
  render: () => (
    <div className="min-h-screen" style={{ background: 'var(--bg)' }}>
      <DocHeader
        layer="Atoms"
        title="TrustpilotStars"
        description="Trustpilot star rating display. Renders 1–5 stars with full and half-star fidelity. Used inside TrustpilotBadge and standalone in hero sections. Stars are decorative SVGs — the accessible label is applied to the container via role='img' and aria-label."
      />

      <div className="px-8 py-12 max-w-3xl">

        {/* ── Showcase ──────────────────────────────────────────────────── */}
        <DocSection
          label="Showcase"
          subtitle="All rating values and three sizes. Stars use Trustpilot brand green — do not recolor."
        >
          <div className="space-y-6">
            {[5, 4.5, 4, 3.5, 3].map(rating => (
              <div key={rating} className="flex items-center gap-4 border-t border-border pt-4 first:border-0 first:pt-0">
                <span className="text-text-xsmall font-mono text-text w-8" style={{ opacity: 0.5 }}>{rating}</span>
                <div className="flex items-center gap-6">
                  <TrustpilotStars rating={rating} size="sm" />
                  <TrustpilotStars rating={rating} size="md" />
                  <TrustpilotStars rating={rating} size="lg" />
                </div>
                <span className="text-text-xsmall text-text" style={{ opacity: 0.4 }}>sm / md / lg</span>
              </div>
            ))}
          </div>
        </DocSection>

        {/* ── Best Practices ────────────────────────────────────────────── */}
        <DocSection label="Best Practices">
          <GuidanceGrid
            dos={[
              {
                rule: 'Always wrap TrustpilotStars in a container that provides context (rating label or review count).',
                rationale: 'Stars alone don\'t tell users what the rating is out of. Pair with a numeric label or use TrustpilotBadge which includes both the label and review count.',
                wcag: 'WCAG 2.1 AA 1.1.1',
              },
              {
                rule: 'Use the size that matches the surrounding text hierarchy.',
                rationale: 'Stars at lg (28px) pair with h4/h5 headings. Stars at md (20px) pair with body text. Stars at sm (16px) pair with label/caption text. Mismatched sizes create visual imbalance.',
              },
            ]}
            donts={[
              {
                rule: 'Do not recolor the stars.',
                rationale: 'The Trustpilot brand uses a specific green for filled stars. Recoloring them violates Trustpilot\'s brand guidelines and removes the recognized visual signal that users associate with the platform.',
              },
              {
                rule: 'Do not use non-0.5 increments for the rating value.',
                rationale: 'The component only renders full and half stars. A rating of 4.3 renders identically to 4.5 — the visual fidelity doesn\'t support arbitrary decimal values. Round to the nearest 0.5.',
              },
            ]}
          />
        </DocSection>

        {/* ── Accessibility ─────────────────────────────────────────────── */}
        <DocSection label="Accessibility & WCAG">
          <div className="flex flex-col gap-4">
            <AccessibilityNote
              criterion="WCAG 2.1 AA 1.1.1 — Non-text Content"
              requirement="Images must have a text alternative that describes the same information"
              why="The component wraps the star row in a div with role='img' and aria-label='Note 4.5 sur 5'. Each individual star SVG is aria-hidden='true' to prevent screen readers from announcing 'image image image image image'. This is the correct pattern for composite graphical ratings."
              href="https://www.w3.org/WAI/WCAG21/Understanding/non-text-content.html"
            />
          </div>
        </DocSection>

      </div>
    </div>
  ),
}

// ─── Playground ───────────────────────────────────────────────────────────────

export const Playground: Story = {
  args: { rating: 4.5, size: 'md' },
  decorators: [(Story) => <div className="p-8"><Story /></div>],
}
