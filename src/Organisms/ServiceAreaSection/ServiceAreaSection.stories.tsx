import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { ServiceAreaSection } from './ServiceAreaSection'
import { DocHeader, DocSection, GuidanceGrid, AccessibilityNote } from '../../Foundation/doc-components'

const meta: Meta<typeof ServiceAreaSection> = {
  title: 'Organisms/ServiceAreaSection',
  component: ServiceAreaSection,
  parameters: { layout: 'fullscreen' },
  argTypes: {
    title: { control: 'text' },
    body: { control: 'text' },
    ctaLabel: { control: 'text' },
  },
}

export default meta
type Story = StoryObj<typeof ServiceAreaSection>

export const Overview: Story = {
  render: () => (
    <div className="min-h-screen" style={{ background: 'var(--bg)' }}>
      <DocHeader
        layer="Organisms"
        title="ServiceAreaSection"
        description="A section communicating Murfy's geographical coverage — which cities and regions are served. Combines a headline, body text, and either a map visual or a structured city list. Critical for local SEO and user trust."
      />
      <div className="px-8 py-12 max-w-4xl">
        <DocSection label="Composition">
          <div className="rounded-[var(--radius-card)] border border-border px-5 py-4 mb-6" style={{ background: 'color-mix(in srgb, var(--accent-btn-bg) 5%, var(--bg))' }}>
            <p className="text-text-small text-text" style={{ opacity: 0.75 }}>
              <strong>Layout:</strong> Heading + body column left, map or city grid right — two-column on desktop
              <br />
              <strong>SEO role:</strong> City names rendered as HTML text (not images) so search engines index coverage area
              <br />
              <strong>Accent:</strong> CTA button and accent elements follow the active vertical accent color
            </p>
          </div>
        </DocSection>
        <DocSection label="Best Practices">
          <GuidanceGrid
            dos={[
              { rule: 'Render city names as HTML text, not inside an image or SVG.', rationale: 'Search engines crawl and index text content. If city names are embedded in a map image, they are invisible to search engines — losing the local SEO value of listing covered cities. Use text overlaid on a decorative map background instead.' },
              { rule: 'Include the department number after each city name for French audiences.', rationale: '"Paris (75)", "Lyon (69)" — French users expect this format and it disambiguates between cities with the same name in different regions. It also provides additional indexable keywords for local SEO.' },
            ]}
            donts={[
              { rule: 'Do not list every covered city if the list exceeds 30 items.', rationale: 'A list of 100+ cities is overwhelming and creates a poor visual impression. Group cities by region or department, and link to a dedicated coverage page for the full list. The section should communicate breadth, not enumerate every location.', wcag: '' },
              { rule: 'Do not make coverage claims that are inconsistent with the booking system.', rationale: 'If the ServiceAreaSection lists "Bordeaux" but the postal code form rejects Bordeaux postal codes, users lose trust immediately. Coverage data must be synchronized with the availability system.' },
            ]}
          />
        </DocSection>
        <DocSection label="Accessibility & WCAG">
          <div className="flex flex-col gap-4">
            <AccessibilityNote
              criterion="WCAG 2.1 AA 1.1.1 — Non-text Content"
              requirement="Map visuals must not be the only way coverage is communicated"
              why="A map image showing covered zones is decorative if the city list is also present in text. But if the map is the only visual cue for coverage (no text list), users with visual impairments cannot determine the service area. Always accompany any map with a text-based city list."
              href="https://www.w3.org/WAI/WCAG21/Understanding/non-text-content.html"
            />
            <AccessibilityNote
              criterion="WCAG 2.1 AA 2.4.6 — Headings and Labels"
              requirement="Section heading must accurately describe the content"
              why="The heading 'Zones d'intervention' or 'Où intervenons-nous ?' must be a semantic heading element at the correct hierarchy level (h2 on a standard page). This allows screen reader users to navigate to this section and understand that it describes coverage area, not general company information."
            />
          </div>
        </DocSection>
      </div>
    </div>
  ),
}

export const Default: Story = { args: {} }
