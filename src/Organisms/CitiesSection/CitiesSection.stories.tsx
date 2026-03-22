import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { CitiesSection } from './CitiesSection'
import { DocHeader, DocSection, GuidanceGrid, AccessibilityNote } from '../../Foundation/doc-components'

const meta: Meta<typeof CitiesSection> = {
  title: 'Organisms/CitiesSection',
  component: CitiesSection,
  parameters: { layout: 'fullscreen' },
  argTypes: {
    title: { control: 'text' },
  },
}

export default meta
type Story = StoryObj<typeof CitiesSection>

export const Overview: Story = {
  render: () => (
    <div className="min-h-screen" style={{ background: 'var(--bg)' }}>
      <DocHeader
        layer="Organisms"
        title="CitiesSection"
        description="A structured list of cities and regions where Murfy operates. Used at the bottom of pages to support local SEO — rendering city names as crawlable HTML text so search engines index Murfy's coverage footprint."
      />
      <div className="px-8 py-12 max-w-4xl">
        <DocSection label="Composition">
          <div className="rounded-[var(--radius-card)] border border-border px-5 py-4 mb-6" style={{ background: 'color-mix(in srgb, var(--accent-btn-bg) 5%, var(--bg))' }}>
            <p className="text-text-small text-text" style={{ opacity: 0.75 }}>
              <strong>Layout:</strong> Region name as heading, cities as a comma-separated or grid list below
              <br />
              <strong>SEO role:</strong> City names must be plain HTML text — not embedded in images or SVG — so search engines index the coverage area
              <br />
              <strong>Design intent:</strong> Low visual hierarchy — this section is for bots and determined users, not the primary user journey
            </p>
          </div>
        </DocSection>
        <DocSection label="Best Practices">
          <GuidanceGrid
            dos={[
              { rule: 'Group cities by region or department for readability.', rationale: 'A flat list of 50+ cities is visually overwhelming. Grouping by region (Île-de-France, PACA, Occitanie) allows users to quickly scan for their area and helps search engines understand the geographical structure of Murfy\'s coverage.' },
              { rule: 'Link city names to dedicated city landing pages when they exist.', rationale: 'City links (e.g. "Réparation électroménager Paris") create internal links that distribute page authority to local landing pages, improving their ranking. This is the primary SEO value of the CitiesSection beyond raw text presence.' },
            ]}
            donts={[
              { rule: 'Do not make this section visually prominent.', rationale: 'The CitiesSection is an SEO utility, not a UX feature. If it is styled as a hero or given large typography, it draws user attention away from conversion CTAs. Keep it low-contrast and compact — it should be almost invisible to users who don\'t need it.', wcag: '' },
              { rule: 'Do not use JavaScript-rendered city names.', rationale: 'Googlebot indexes server-rendered HTML reliably but may not execute JavaScript for dynamically rendered content. City names must be in the initial HTML response, not injected by client-side JS, to be reliably indexed.' },
            ]}
          />
        </DocSection>
        <DocSection label="Accessibility & WCAG">
          <div className="flex flex-col gap-4">
            <AccessibilityNote
              criterion="WCAG 2.1 AA 2.4.6 — Headings and Labels"
              requirement="Region names used as headings must use semantic heading elements"
              why="If region names (Île-de-France, PACA) are styled to look like headings but rendered as <div> or <p>, screen reader users navigating by headings will skip this entire section. Use h2/h3/h4 at the correct hierarchy level so the document outline reflects the region → city structure."
              href="https://www.w3.org/WAI/WCAG21/Understanding/headings-and-labels.html"
            />
            <AccessibilityNote
              criterion="WCAG 2.1 AA 2.4.4 — Link Purpose"
              requirement="City links must be distinguishable from surrounding text"
              why="City names that are links must be visually distinguishable from non-linked city names — either by underline, color contrast, or another visual cue. Relying solely on color to indicate a link fails WCAG 1.4.1 (Use of Color). A consistent underline or hover state satisfies both 1.4.1 and 2.4.4."
            />
          </div>
        </DocSection>
      </div>
    </div>
  ),
}

export const Default: Story = {}

export const SingleRegion: Story = {
  args: {
    regions: [
      {
        name: 'Île-de-France',
        cities: ['Paris', 'Versailles', 'Montreuil'],
      },
    ],
  },
}
