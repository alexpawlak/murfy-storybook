import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { SeoSection } from './SeoSection'
import { DocHeader, DocSection, GuidanceGrid, AccessibilityNote } from '../../Foundation/doc-components'

const meta: Meta<typeof SeoSection> = {
  title: 'Organisms/SeoSection',
  component: SeoSection,
  parameters: { layout: 'fullscreen' },
  argTypes: {
    title: { control: 'text' },
    subheading: { control: 'text' },
    body: { control: 'text' },
  },
}

export default meta
type Story = StoryObj<typeof SeoSection>

export const Overview: Story = {
  render: () => (
    <div className="min-h-screen" style={{ background: 'var(--bg)' }}>
      <DocHeader
        layer="Organisms"
        title="SeoSection"
        description="A text-heavy section positioned below the fold, primarily for search engine indexing. Contains brand copy, FAQs, and service descriptions that reinforce topical relevance for key search queries. Low visual prominence — it is for Googlebot, not the primary user."
      />
      <div className="px-8 py-12 max-w-4xl">
        <DocSection label="Composition">
          <div className="rounded-[var(--radius-card)] border border-border px-5 py-4 mb-6" style={{ background: 'color-mix(in srgb, var(--accent-btn-bg) 5%, var(--bg))' }}>
            <p className="text-text-small text-text" style={{ opacity: 0.75 }}>
              <strong>Layout:</strong> Single column, max-width constrained for readability — no grid
              <br />
              <strong>SEO role:</strong> Dense keyword-relevant text content; heading hierarchy signals topic structure to search engines
              <br />
              <strong>Design intent:</strong> Intentionally low visual weight — this section should not compete with CTAs above it
            </p>
          </div>
        </DocSection>
        <DocSection label="Best Practices">
          <GuidanceGrid
            dos={[
              { rule: 'Use semantic heading elements (h2, h3) to structure the copy.', rationale: 'Search engines use heading structure to understand the topic hierarchy of a page. An h2 "Réparation d\'électroménager à domicile" followed by h3 subtopics signals the main topic and sub-topics clearly — this directly affects keyword ranking.' },
              { rule: 'Keep the visual style understated — this section is for Googlebot, not the user.', rationale: 'A visually heavy SEO section distracts users from conversion CTAs. The copy should be readable and informative for users who do scroll this far, but should not draw the eye with large typography, colors, or decorative elements.' },
            ]}
            donts={[
              { rule: 'Do not stuff keywords at the expense of readability.', rationale: 'Google\'s algorithms penalize unnatural keyword repetition (keyword stuffing). More importantly, human readers who do scroll this far must find the content useful — a page that reads as keyword soup damages brand trust.', wcag: '' },
              { rule: 'Do not hide this section with display:none or opacity:0.', rationale: 'Hiding content via CSS that makes it invisible to users but visible to bots is a cloaking technique that violates Google\'s Webmaster Guidelines and can result in manual penalties. The SeoSection must be fully visible and readable by both users and search engines.' },
            ]}
          />
        </DocSection>
        <DocSection label="Accessibility & WCAG">
          <div className="flex flex-col gap-4">
            <AccessibilityNote
              criterion="WCAG 2.1 AA 1.4.3 — Contrast"
              requirement="Body text must meet 4.5:1 contrast ratio even at reduced opacity"
              why="SEO sections often use reduced-opacity text (opacity: 0.7 etc.) to look less prominent. This frequently fails the 4.5:1 contrast requirement. At 70% opacity on a white background, a medium grey text color (#767676) may drop below the threshold. Always verify contrast of the rendered color, not just the base token."
              href="https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum.html"
            />
            <AccessibilityNote
              criterion="WCAG 2.1 AA 2.4.6 — Headings and Labels"
              requirement="Section headings must be at the correct hierarchy level"
              why="The SeoSection often contains h2 and h3 headings that structure the SEO copy. These headings must fit into the page's overall heading hierarchy — an h2 in the SeoSection should not skip from an h1 in the hero. Screen reader users navigate by headings, and a skipped level disrupts the document outline they rely on."
            />
          </div>
        </DocSection>
      </div>
    </div>
  ),
}

export const Default: Story = {}

export const BodyExpanded: Story = {
  args: {
    body: "Murfy c'est une jeune PME qui a décidé de s'attaquer à nos déchets électroménagers et à l'obsolescence programmée. Chez Murfy nous avons à cœur de vous accompagner dans la réparation d'électroménager pour prolonger la durée de vie de vos appareils électroménagers et ainsi éviter des déchets inutiles.",
  },
}
