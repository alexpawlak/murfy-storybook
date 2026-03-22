import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { NewsletterSection } from './NewsletterSection'
import { DocHeader, DocSection, GuidanceGrid, AccessibilityNote } from '../../Foundation/doc-components'

const meta: Meta<typeof NewsletterSection> = {
  title: 'Organisms/NewsletterSection',
  component: NewsletterSection,
  parameters: { layout: 'fullscreen' },
  argTypes: {
    title: { control: 'text' },
    body: { control: 'text' },
    ctaLabel: { control: 'text' },
  },
}

export default meta
type Story = StoryObj<typeof NewsletterSection>

export const Overview: Story = {
  render: () => (
    <div className="min-h-screen" style={{ background: 'var(--bg)' }}>
      <DocHeader
        layer="Organisms"
        title="NewsletterSection"
        description="A conversion section combining a headline, body copy, and the NewsletterForm molecule (postal code or email input + optional GDPR consent checkbox). Used below the fold to capture leads who didn't convert in the hero."
      />
      <div className="px-8 py-12 max-w-4xl">
        <DocSection label="Composition">
          <div className="rounded-[var(--radius-card)] border border-border px-5 py-4 mb-6" style={{ background: 'color-mix(in srgb, var(--accent-btn-bg) 5%, var(--bg))' }}>
            <p className="text-text-small text-text" style={{ opacity: 0.75 }}>
              <strong>Molecules used:</strong> NewsletterForm (postal code input + CTA + optional consent checkbox)
              <br />
              <strong>Layout:</strong> Centered single column, max-width constrained — full-width background tint signals a new section
              <br />
              <strong>Accent:</strong> CTA button follows the active accent color — switch accents to preview all verticals
            </p>
          </div>
        </DocSection>
        <DocSection label="Best Practices">
          <GuidanceGrid
            dos={[
              { rule: 'Show the GDPR consent checkbox whenever collecting emails for marketing.', rationale: 'French and EU law (GDPR / CNIL) requires explicit opt-in before adding someone to a marketing list. The NewsletterForm has a showConsent prop — always set it to true in newsletter contexts, not just postal code entry.' },
              { rule: 'Write a headline that restates the value proposition.', rationale: 'Users who reach the newsletter section have scrolled past the hero. The headline here should offer something new ("Recevez nos conseils d\'experts") rather than repeat the hero message — it provides a secondary reason to engage.' },
            ]}
            donts={[
              { rule: 'Do not use this section as a second hero.', rationale: 'The NewsletterSection is a mid-page or end-of-page conversion moment, not a primary CTA. Using a large photo and bold headline here competes with the actual hero section and confuses the page hierarchy.', wcag: '' },
              { rule: 'Do not submit the form silently if the consent checkbox is unchecked.', rationale: 'If consent is required and unchecked, the form must block submission and show an error — not collect the data and filter later. Collecting data without valid consent is a GDPR violation regardless of what happens with it after collection.', wcag: 'WCAG 2.1 AA 3.3.1' },
            ]}
          />
        </DocSection>
        <DocSection label="Accessibility & WCAG">
          <div className="flex flex-col gap-4">
            <AccessibilityNote
              criterion="WCAG 2.1 AA 1.3.1 — Info and Relationships"
              requirement="The consent checkbox must be programmatically associated with its label"
              why="The consent label text must be linked to the checkbox via htmlFor/id or aria-labelledby. Without this, screen readers announce only 'checkbox unchecked' — the user has no idea what they're consenting to. This is a legal requirement under GDPR as well as a WCAG AA requirement."
              href="https://www.w3.org/WAI/WCAG21/Understanding/info-and-relationships.html"
            />
            <AccessibilityNote
              criterion="WCAG 2.1 AA 3.3.2 — Labels or Instructions"
              requirement="The email/postal code input must have a visible label or descriptive placeholder"
              why="Placeholder text alone is not an accessible label — it disappears when the user starts typing, leaving no indication of what the field expects. Use a visible label (or at minimum aria-label) that remains visible at all times."
            />
          </div>
        </DocSection>
      </div>
    </div>
  ),
}

export const Default: Story = { args: {} }

export const WithImage: Story = {
  args: {
    imageUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=400&fit=crop',
  },
}
