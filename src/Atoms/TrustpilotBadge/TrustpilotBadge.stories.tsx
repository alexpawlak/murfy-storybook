import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { TrustpilotBadge } from './TrustpilotBadge'
import { DocHeader, DocSection, GuidanceGrid, AccessibilityNote } from '../../Foundation/doc-components'

const meta: Meta<typeof TrustpilotBadge> = {
  title: 'Atoms/TrustpilotBadge',
  component: TrustpilotBadge,
  parameters: { layout: 'fullscreen' },
  argTypes: {
    reviewCount: { control: 'number' },
    label: { control: 'text' },
    rating: { control: { type: 'number', min: 0, max: 5, step: 0.5 } },
  },
}

export default meta
type Story = StoryObj<typeof TrustpilotBadge>

// ─── Overview ─────────────────────────────────────────────────────────────────

export const Overview: Story = {
  render: () => (
    <div className="min-h-screen" style={{ background: 'var(--bg)' }}>
      <DocHeader
        layer="Atoms"
        title="TrustpilotBadge"
        description="Composed trust signal: rating label + star row + review count + Trustpilot logo. Used in the hero section and anywhere social proof is needed. Combines TrustpilotStars with text metadata into a single semantic unit."
      />

      <div className="px-8 py-12 max-w-3xl">

        {/* ── Showcase ──────────────────────────────────────────────────── */}
        <DocSection label="Showcase" subtitle="Common configurations used across the site.">
          <div className="flex flex-col gap-8">
            <div>
              <p className="text-text-xsmall-semibold text-text mb-3" style={{ opacity: 0.5 }}>Standard — hero section</p>
              <TrustpilotBadge reviewCount={3500} label="Excellent" rating={4.5} />
            </div>
            <div className="border-t border-border pt-8">
              <p className="text-text-xsmall-semibold text-text mb-3" style={{ opacity: 0.5 }}>Five stars</p>
              <TrustpilotBadge reviewCount={3500} label="Excellent" rating={5} />
            </div>
            <div className="border-t border-border pt-8">
              <p className="text-text-xsmall-semibold text-text mb-3" style={{ opacity: 0.5 }}>High review count</p>
              <TrustpilotBadge reviewCount={12000} label="Excellent" rating={4.7} />
            </div>

            <div
              className="border-t border-border pt-8 p-6 rounded-[var(--radius-card)] text-white"
              style={{ background: 'var(--dark-900)' }}
            >
              <p className="text-text-xsmall-semibold text-white mb-4" style={{ opacity: 0.6 }}>On dark background</p>
              <TrustpilotBadge reviewCount={3500} label="Excellent" rating={4.5} />
            </div>
          </div>
        </DocSection>

        {/* ── Best Practices ────────────────────────────────────────────── */}
        <DocSection label="Best Practices">
          <GuidanceGrid
            dos={[
              {
                rule: 'Keep the label text accurate — only use "Excellent" or "Très bien" when the rating matches.',
                rationale: 'Trustpilot has defined rating labels: Excellent (4.5–5.0), Très bien (4.0–4.4), Bien (3.5–3.9). Using "Excellent" for a 3.8 rating is misleading and violates Trustpilot\'s usage guidelines.',
              },
              {
                rule: 'Always show the review count alongside the rating.',
                rationale: 'A star rating without context can be misleading — 5/5 from 3 reviews is very different from 4.5/5 from 12,000 reviews. The review count provides the credibility context.',
              },
            ]}
            donts={[
              {
                rule: 'Do not modify the Trustpilot logo color or size.',
                rationale: 'The Trustpilot logo is a third-party brand mark. It must appear at its designated size and colors — altering it violates Trustpilot\'s brand guidelines and erodes the trust signal.',
              },
              {
                rule: 'Do not use fabricated review counts.',
                rationale: 'The badge is a trust signal. False or rounded-up numbers erode user trust if discovered and may create legal liability under French consumer protection law (Code de la consommation).',
              },
            ]}
          />
        </DocSection>

        {/* ── Accessibility ─────────────────────────────────────────────── */}
        <DocSection label="Accessibility & WCAG">
          <div className="flex flex-col gap-4">
            <AccessibilityNote
              criterion="WCAG 2.1 AA 1.1.1 — Non-text Content"
              requirement="The Trustpilot logo image must have a descriptive alt attribute"
              why="The Trustpilot logo has alt='Trustpilot' which correctly identifies the platform for screen reader users. The star row uses role='img' with aria-label='Note 4.5 sur 5'. Together, a screen reader will announce: 'Excellent — [star rating image] Note 4.5 sur 5 — Basé sur 3 500 avis sur Trustpilot'."
              href="https://www.w3.org/WAI/WCAG21/Understanding/non-text-content.html"
            />
            <AccessibilityNote
              criterion="WCAG 2.1 AA 1.4.3 — Contrast"
              requirement="Review count text at 12px must meet 4.5:1 against its background"
              why="The review count uses the label scale (12px) at 60% opacity, which may approach the contrast threshold on light backgrounds. On dark surfaces, verify the reduced-opacity text still passes 4.5:1. If not, remove the opacity and use a lighter text color variable instead."
            />
          </div>
        </DocSection>

      </div>
    </div>
  ),
}

// ─── Playground ───────────────────────────────────────────────────────────────

export const Playground: Story = {
  args: { reviewCount: 3500, label: 'Excellent', rating: 4.5 },
  decorators: [(Story) => <div className="p-8"><Story /></div>],
}
