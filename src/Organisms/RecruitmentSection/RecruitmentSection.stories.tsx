import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { RecruitmentSection } from './RecruitmentSection'
import { DocHeader, DocSection, GuidanceGrid, AccessibilityNote } from '../../Foundation/doc-components'

const meta: Meta<typeof RecruitmentSection> = {
  title: 'Organisms/RecruitmentSection',
  component: RecruitmentSection,
  parameters: { layout: 'fullscreen' },
  argTypes: {
    headline: { control: 'text' },
    body: { control: 'text' },
    ctaLabel: { control: 'text' },
    imageUrl: { control: 'text' },
  },
}

export default meta
type Story = StoryObj<typeof RecruitmentSection>

export const Overview: Story = {
  render: () => (
    <div className="min-h-screen" style={{ background: 'var(--bg)' }}>
      <DocHeader
        layer="Organisms"
        title="RecruitmentSection"
        description="A section inviting users to consider a career at Murfy as a field technician. Combines a compelling headline, benefit copy, a CTA, and an optional photo. Serves a secondary business goal — talent acquisition — alongside the primary repair conversion funnel."
      />
      <div className="px-8 py-12 max-w-4xl">
        <DocSection label="Composition">
          <div className="rounded-[var(--radius-card)] border border-border px-5 py-4 mb-6" style={{ background: 'color-mix(in srgb, var(--accent-btn-bg) 5%, var(--bg))' }}>
            <p className="text-text-small text-text" style={{ opacity: 0.75 }}>
              <strong>Layout:</strong> Content column left, photo right — two-column on desktop, stacked on mobile
              <br />
              <strong>Position on page:</strong> Near the bottom — after conversion CTAs — to avoid competing with the primary funnel
              <br />
              <strong>Audience:</strong> Secondary audience (potential technicians), not the primary customer audience
            </p>
          </div>
        </DocSection>
        <DocSection label="Best Practices">
          <GuidanceGrid
            dos={[
              { rule: 'Frame the headline around the candidate\'s aspiration, not Murfy\'s needs.', rationale: '"Formez-vous au métier de réparateur" (candidate benefit) outperforms "Nous recrutons des techniciens" (company need). The candidate decides whether to engage — lead with what they gain, not what Murfy needs from them.' },
              { rule: 'Place this section after all primary conversion CTAs.', rationale: 'The primary goal of the homepage is to book a repair. The recruitment CTA serves a completely different audience segment. Placing it early in the page intercepts users who came to book a repair — reducing conversion on the primary goal.' },
            ]}
            donts={[
              { rule: 'Do not use the same accent color CTA as the primary booking CTA.', rationale: 'If both the booking CTA and the recruitment CTA use the primary accent button style, users cannot distinguish which action is primary. Use a secondary or ghost button variant for recruitment to visually subordinate it to the booking CTA.', wcag: '' },
              { rule: 'Do not show this section on vertical-specific pages (chauffage, solaire).', rationale: 'Vertical pages target customers with a specific service need. The recruitment section is for the homepage and the dedicated careers page — injecting it on service pages dilutes the vertical message and reduces relevance.' },
            ]}
          />
        </DocSection>
        <DocSection label="Accessibility & WCAG">
          <div className="flex flex-col gap-4">
            <AccessibilityNote
              criterion="WCAG 2.1 AA 1.1.1 — Non-text Content"
              requirement="The recruitment photo must have descriptive alt text"
              why="The photo of a technician being trained communicates professionalism and the work environment — this is meaningful content that supports the recruitment message. Alt text should describe what's happening: alt='Technicien Murfy en formation pratique'. Only use alt='' if the image is purely decorative."
              href="https://www.w3.org/WAI/WCAG21/Understanding/non-text-content.html"
            />
            <AccessibilityNote
              criterion="WCAG 2.1 AA 2.4.4 — Link Purpose"
              requirement="The recruitment CTA label must clearly describe the destination"
              why="'En savoir plus' provides no context about where the link goes. 'Découvrir nos formations' or 'Postuler maintenant' communicates the destination and the action. Screen reader users navigating by links need this context to decide whether to follow the link."
            />
          </div>
        </DocSection>
      </div>
    </div>
  ),
}

export const Default: Story = {
  args: {
    imageUrl: 'https://cdn.prod.website-files.com/66a7929afe102548a244c1d2/66cd7d3bb0f0a821c6c07bcf_formation_visual.avif',
  },
}
