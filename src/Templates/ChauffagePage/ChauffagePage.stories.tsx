import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { ChauffagePage } from './ChauffagePage'
import { DocHeader, DocSection, GuidanceGrid, AccessibilityNote } from '../../Foundation/doc-components'

const meta: Meta<typeof ChauffagePage> = {
  title: 'Templates/ChauffagePage',
  component: ChauffagePage,
  parameters: { layout: 'fullscreen' },
}

export default meta
type Story = StoryObj<typeof ChauffagePage>

export const Overview: Story = {
  render: () => (
    <div className="min-h-screen" style={{ background: 'var(--bg)' }}>
      <DocHeader
        layer="Templates"
        title="ChauffagePage"
        description="The vertical-specific page scaffold for the Chauffage (heating) service. Uses a longer, education-first section order suited to a higher-ticket purchase — includes ProcessSection and TestimonialsSection not present on the HomePage. Accent color is violet (data-accent='violet')."
      />
      <div className="px-8 py-12 max-w-5xl">
        <DocSection label="Section map" subtitle="Organisms in page order — top to bottom. Compare with HomePage to see where the two templates differ.">
          <div className="flex flex-col gap-3">
            {[
              { pos: '1', name: 'MurfyNavbar', role: 'Persistent navigation — activeVerticalId="chauffage" highlights the Chauffage pill', diff: false },
              { pos: '2', name: 'VerticalHeroSection', role: 'Multi-CTA hero — "rappel / devis / entretien" for 3 distinct customer intents', diff: true },
              { pos: '3', name: 'AllServicesSection', role: 'Heating-specific service cards (PAC air-air, PAC air-eau, chaudière, etc.)', diff: false },
              { pos: '4', name: 'ProcessSection', role: 'Step-by-step customer journey — unique to vertical pages, builds confidence for a longer sales cycle', diff: true },
              { pos: '5', name: 'WhyMurfySection', role: 'Trust building — benefit cards adapted to heating expertise', diff: false },
              { pos: '6', name: 'ImpactSection', role: 'Environmental impact — reinforces Murfy\'s sustainability mission for eco-conscious heating buyers', diff: false },
              { pos: '7', name: 'TestimonialsSection', role: 'Customer reviews specific to the heating vertical — unique to vertical pages', diff: true },
              { pos: '8', name: 'TrustpilotSection', role: 'Trustpilot aggregate rating — cross-vertical credibility badge', diff: false },
              { pos: '9', name: 'FaqSection', role: 'Heating-specific FAQ — SEO content + objection handling for heating queries', diff: true },
              { pos: '10', name: 'ServiceAreaSection', role: 'Coverage map — "we serve your area" reassurance', diff: false },
              { pos: '11', name: 'CitiesSection', role: 'Local SEO — crawlable city list', diff: false },
              { pos: '12', name: 'SeoSection', role: 'Chauffage-specific brand copy for search engine indexing', diff: false },
              { pos: '13', name: 'Footer', role: 'Site-wide navigation links, legal notices', diff: false },
            ].map(({ pos, name, role, diff }) => (
              <div key={pos} className="flex gap-4 items-start rounded-[var(--radius-card)] border px-4 py-3" style={{ background: diff ? 'color-mix(in srgb, var(--accent-btn-bg) 8%, var(--bg))' : 'var(--bg)', borderColor: diff ? 'color-mix(in srgb, var(--accent-btn-bg) 40%, var(--bg))' : 'var(--border)' }}>
                <span className="text-label font-semibold uppercase tracking-[0.08em] mt-0.5 min-w-[1.5rem] text-center" style={{ color: 'var(--text)', opacity: 0.35 }}>{pos}</span>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-text-small-semibold" style={{ color: 'var(--text)' }}>{name}</span>
                    {diff && <span className="text-label uppercase tracking-[0.08em] px-2 py-0.5 rounded-pill" style={{ background: 'color-mix(in srgb, var(--accent-btn-bg) 25%, var(--bg))', color: 'var(--text)' }}>Vertical-only</span>}
                  </div>
                  <p className="text-text-xsmall mt-0.5" style={{ color: 'var(--text)', opacity: 0.6 }}>{role}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="mt-4 text-text-xsmall" style={{ color: 'var(--text)', opacity: 0.5 }}>
            Highlighted rows are sections present in ChauffagePage but not in HomePage, or using a different organism variant.
          </p>
        </DocSection>
        <DocSection label="Layout rationale">
          <div className="flex flex-col gap-3">
            {[
              { heading: 'Longer sales cycle → more education before the CTA', body: 'A heating installation (PAC, chaudière) is a 5 000–15 000€ decision. Users research for weeks. The ProcessSection (how it works) and TestimonialsSection (proof it works) are essential to build confidence before a conversion. On the homepage, the same user books a 75€ repair — a low-consideration transaction that needs no education funnel.' },
              { heading: 'Three-CTA hero reflects three distinct intents', body: 'Chauffage users have different readiness levels: some want a quote (ready to buy), some want to be called back (interested but unsure), some need a maintenance appointment (existing customer). VerticalHeroSection exposes all three CTAs clearly, ordered by commercial priority.' },
              { heading: 'FaqSection is vertical-specific', body: 'The FaqSection on the Chauffage page must contain heating-specific questions ("Quels types de chauffages réparez-vous ?") — not the generic électroménager FAQ. The component accepts a custom items prop to support this. Using the default FAQ content on a vertical page reduces topical relevance for SEO.' },
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
              { rule: 'Wrap the template in data-accent="violet" for the Chauffage vertical.', rationale: 'The Chauffage vertical uses the violet accent. Without data-accent="violet", all accent-colored elements (active pills, CTA buttons) will render in the default accent color — breaking the visual identity of the vertical. The ChauffagePage component handles this internally, but any preview wrapper must replicate it.' },
              { rule: 'Customize all content props per vertical — never reuse homepage copy.', rationale: 'Every text prop (hero headline, FAQ items, service cards, section titles) must be chauffage-specific. A vertical page that displays generic électroménager content signals to both users and search engines that the page is not genuinely about heating — reducing trust and SEO relevance.' },
            ]}
            donts={[
              { rule: 'Do not add ProcessSection to the HomePage template.', rationale: 'ProcessSection explains a multi-step customer journey (consultation → installation → commissioning). This is appropriate for a considered purchase like a heat pump. For the homepage, which targets repair bookings (a transactional intent), a process section creates unnecessary friction before the CTA.', wcag: '' },
              { rule: 'Do not reuse TestimonialsSection reviews across verticals.', rationale: 'A review about "installation parfaite de la pompe à chaleur" displayed on the électroménager homepage creates a context mismatch. Reviews must be filtered to the current vertical — a customer who hired Murfy to fix their washing machine is not a testimonial for the Chauffage service.' },
            ]}
          />
        </DocSection>
        <DocSection label="Accessibility & WCAG">
          <div className="flex flex-col gap-4">
            <AccessibilityNote
              criterion="WCAG 2.1 AA 2.4.2 — Page Titled"
              requirement="Each vertical page must have a unique, descriptive <title> element"
              why="The ChauffagePage template must produce a page title like 'Réparation et installation chauffage | Murfy' — not the generic 'Murfy | Réparation électroménager'. Screen readers announce the page title when the page loads, and search engines display it in results. A non-specific title reduces both accessibility and SEO."
              href="https://www.w3.org/WAI/WCAG21/Understanding/page-titled.html"
            />
            <AccessibilityNote
              criterion="WCAG 2.1 AA 1.3.2 — Meaningful Sequence"
              requirement="Section order in the DOM must match the intended reading sequence"
              why="The ChauffagePage has 13 sections. If any sections are positioned using absolute CSS or flexbox order that differs from DOM order, assistive technology users receive the content in the wrong sequence. Verify that the DOM order of organisms matches the visual top-to-bottom reading sequence."
            />
          </div>
        </DocSection>
      </div>
    </div>
  ),
}

export const Default: Story = {}
