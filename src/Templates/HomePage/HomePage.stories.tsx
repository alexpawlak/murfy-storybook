import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { HomePage } from './HomePage'
import { DocHeader, DocSection, GuidanceGrid, AccessibilityNote } from '../../Foundation/doc-components'

const meta: Meta<typeof HomePage> = {
  title: 'Templates/HomePage',
  component: HomePage,
  parameters: { layout: 'fullscreen' },
  argTypes: {
    heroImageUrl: { control: 'text' },
    impactImageUrl: { control: 'text' },
    recruitmentImageUrl: { control: 'text' },
  },
}

export default meta
type Story = StoryObj<typeof HomePage>

export const Overview: Story = {
  render: () => (
    <div className="min-h-screen" style={{ background: 'var(--bg)' }}>
      <DocHeader
        layer="Templates"
        title="HomePage"
        description="The full murfy.fr homepage scaffold — wires together all organisms in the correct order for the électroménager vertical. This is the reference layout for the primary conversion funnel: Navbar → Hero → Trust → Services → Newsletter → Impact → Coverage → SEO → Recruitment → Cities → Footer."
      />
      <div className="px-8 py-12 max-w-5xl">
        <DocSection label="Section map" subtitle="Organisms in page order — top to bottom.">
          <div className="flex flex-col gap-3">
            {[
              { pos: '1', name: 'MurfyNavbar', role: 'Persistent navigation — vertical selector + account/menu actions', layer: 'Organism' },
              { pos: '2', name: 'HeroSection', role: 'Primary conversion — postal code CTA + trust signals above the fold', layer: 'Organism' },
              { pos: '3', name: 'WhyMurfySection', role: 'Trust building — 3 benefit cards explaining Murfy\'s differentiation', layer: 'Organism' },
              { pos: '4', name: 'TrustpilotSection', role: 'Social proof — Trustpilot rating + review count to reduce hesitation', layer: 'Organism' },
              { pos: '5', name: 'AllServicesSection', role: 'Service discovery — 4 service channels (home repair, diagnosis, etc.)', layer: 'Organism' },
              { pos: '6', name: 'NewsletterSection', role: 'Secondary conversion — postal code / email capture for leads who didn\'t convert in hero', layer: 'Organism' },
              { pos: '7', name: 'ImpactSection', role: 'Brand credibility — environmental impact stats and mission statement', layer: 'Organism' },
              { pos: '8', name: 'ServiceAreaSection', role: 'Coverage reassurance — confirms the user\'s area is served', layer: 'Organism' },
              { pos: '9', name: 'SeoSection', role: 'SEO content — keyword-rich brand copy for search engine indexing', layer: 'Organism' },
              { pos: '10', name: 'RecruitmentSection', role: 'Talent acquisition — secondary CTA for aspiring technicians', layer: 'Organism' },
              { pos: '11', name: 'CitiesSection', role: 'Local SEO — crawlable city list grouped by region', layer: 'Organism' },
              { pos: '12', name: 'Footer', role: 'Site-wide navigation links, social icons, and legal notices', layer: 'Molecule' },
            ].map(({ pos, name, role, layer }) => (
              <div key={pos} className="flex gap-4 items-start rounded-[var(--radius-card)] border border-border px-4 py-3" style={{ background: 'var(--bg)' }}>
                <span className="text-label font-semibold uppercase tracking-[0.08em] mt-0.5 min-w-[1.5rem] text-center" style={{ color: 'var(--text)', opacity: 0.35 }}>{pos}</span>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-text-small-semibold" style={{ color: 'var(--text)' }}>{name}</span>
                    <span className="text-label uppercase tracking-[0.08em] px-2 py-0.5 rounded-pill" style={{ background: 'color-mix(in srgb, var(--accent-btn-bg) 15%, var(--bg))', color: 'var(--text)', opacity: 0.7 }}>{layer}</span>
                  </div>
                  <p className="text-text-xsmall mt-0.5" style={{ color: 'var(--text)', opacity: 0.6 }}>{role}</p>
                </div>
              </div>
            ))}
          </div>
        </DocSection>
        <DocSection label="Layout rationale">
          <div className="flex flex-col gap-3">
            {[
              { heading: 'Conversion funnel first', body: 'The Hero (pos 2) must be the first thing a user sees. WhyMurfy and Trustpilot follow immediately to handle the "why should I trust them?" objection before the user scrolls away. These three sections work as a unit — never separate them with a promotional section.' },
              { heading: 'Secondary conversion mid-page', body: 'The NewsletterSection (pos 6) catches users who weren\'t ready to convert in the hero. Placed after the service discovery section, it targets users who are now informed about the service but still hesitating. Placing it too early (before AllServices) means users haven\'t yet understood what they\'re signing up for.' },
              { heading: 'SEO and utility content at the bottom', body: 'SeoSection, CitiesSection, and the secondary RecruitmentSection are placed below the fold because they serve Googlebot and secondary audiences — not the primary conversion user. Placing them higher on the page would dilute the conversion-focused layout.' },
            ].map(({ heading, body }) => (
              <div key={heading} className="rounded-[var(--radius-card)] border border-border px-5 py-4" style={{ background: 'color-mix(in srgb, var(--accent-btn-bg) 5%, var(--bg))' }}>
                <p className="text-text-small-semibold mb-1" style={{ color: 'var(--text)' }}>{heading}</p>
                <p className="text-text-xsmall" style={{ color: 'var(--text)', opacity: 0.7 }}>{body}</p>
              </div>
            ))}
          </div>
        </DocSection>
        <DocSection label="Best Practices">
          <GuidanceGrid
            dos={[
              { rule: 'Maintain section order — the funnel depends on sequence.', rationale: 'The conversion rate of the postal code CTA depends partly on the trust signals that precede it. WhyMurfy and Trustpilot reduce hesitation before the user sees the newsletter CTA mid-page. Reordering sections without A/B testing risks breaking the validated funnel sequence.' },
              { rule: 'Pass imageUrl props for HeroSection, ImpactSection, and RecruitmentSection.', rationale: 'These sections have optional photo slots that significantly improve visual quality. Without photos, the sections fall back to color-only backgrounds. The image URLs should point to production-quality photos — not placeholders — before the homepage goes live.' },
            ]}
            donts={[
              { rule: 'Do not add new organisms to this template without auditing the conversion funnel.', rationale: 'Every additional section above the fold pushes the HeroSection down, reducing the chance a user sees the CTA without scrolling. Any new section proposal must be validated with the product team against conversion data before being added to the homepage template.', wcag: '' },
              { rule: 'Do not use the HomePage template for vertical-specific pages.', rationale: 'The ChauffagePage template exists specifically for vertical pages — it uses VerticalHeroSection (multi-CTA), ProcessSection (step-by-step journey), and a different section order suited to longer sales cycles. Reusing HomePage for a vertical page applies the wrong funnel structure to a different user intent.' },
            ]}
          />
        </DocSection>
        <DocSection label="Accessibility & WCAG">
          <div className="flex flex-col gap-4">
            <AccessibilityNote
              criterion="WCAG 2.1 AA 2.4.1 — Bypass Blocks"
              requirement="A skip-to-main-content link must be the first focusable element on the page"
              why="The MurfyNavbar contains multiple interactive elements (vertical pills, account button, menu button). Keyboard users must tab through all of them before reaching the HeroSection on every page load. A visually-hidden 'Aller au contenu principal' anchor link as the first element in the DOM lets keyboard users skip straight to the hero CTA."
              href="https://www.w3.org/WAI/WCAG21/Understanding/bypass-blocks.html"
            />
            <AccessibilityNote
              criterion="WCAG 2.1 AA 1.3.2 — Meaningful Sequence"
              requirement="The visual order of sections must match the DOM order"
              why="If sections are visually reordered using CSS (e.g. flexbox order or absolute positioning), the DOM order may differ from the visual order. Screen readers and keyboard users navigate the DOM order — if it doesn't match the visual sequence, the page tells a different story to assistive technology users than to sighted users."
            />
          </div>
        </DocSection>
      </div>
    </div>
  ),
}

export const Default: Story = {}
