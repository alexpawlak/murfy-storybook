import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { HeroSection } from './HeroSection'
import heroPhoto from '../../Assets/photos/3 gars.png'
import { DocHeader, DocSection, GuidanceGrid, AccessibilityNote } from '../../Foundation/doc-components'

const meta: Meta<typeof HeroSection> = {
  title: 'Organisms/HeroSection',
  component: HeroSection,
  parameters: { layout: 'fullscreen' },
  argTypes: {
    subtext: { control: 'text' },
    ctaLabel: { control: 'text' },
    price: { control: 'text' },
    trustpilotRating: { control: { type: 'number', min: 0, max: 5, step: 0.5 } },
  },
}

export default meta
type Story = StoryObj<typeof HeroSection>

export const Overview: Story = {
  render: () => (
    <div className="min-h-screen" style={{ background: 'var(--bg)' }}>
      <DocHeader
        layer="Organisms"
        title="HeroSection"
        description="The primary above-the-fold section of murfy.fr. Combines the HeroSearchBar (postal code CTA), a price badge, TrustpilotBadge, USP checklist items, and an optional photo. This is the highest-conversion area of the page."
      />
      <div className="px-8 py-12 max-w-5xl">
        <DocSection label="Composition">
          <div className="rounded-[var(--radius-card)] border border-border p-6 mb-6" style={{ background: 'color-mix(in srgb, var(--accent-btn-bg) 5%, var(--bg))' }}>
            <p className="text-text-small text-text" style={{ opacity: 0.75 }}>
              <strong>Molecules used:</strong> HeroSearchBar (postal code input + CTA + USP badges), TrustpilotBadge (rating + review count + logo)
              <br />
              <strong>Atoms used:</strong> Button (primary + secondary), TrustpilotStars
              <br />
              <strong>Layout:</strong> Two-column on desktop (content left, photo right) — single column on mobile
            </p>
          </div>
          <HeroSection
            subtext="Plus de 300 000 français nous ont déjà fait confiance pour réparer leur électroménager."
            ctaLabel="Voir les disponibilités"
            price="75€"
            priceLabel="À partir de"
            priceSublabel="avec le Bonus"
            trustpilotRating={4.5}
            trustpilotLabel="Excellent"
            checkItems={['VOTRE RDV EN 3MIN', 'PAYEZ APRÈS LE RDV']}
            imageUrl={heroPhoto}
          />
        </DocSection>
        <DocSection label="Best Practices">
          <GuidanceGrid
            dos={[
              { rule: 'Keep the hero headline under 8 words — it must be instantly scannable.', rationale: 'Users spend on average 5.6 seconds on a page before deciding to stay or leave. A headline that can\'t be read in one glance during this window fails its job.' },
              { rule: 'Surface the price prominently alongside the CTA.', rationale: '"À partir de 75€" prequalifies users before they enter their postal code — reducing drop-off from users who would have been surprised by the price post-conversion.' },
              { rule: 'Use the TrustpilotBadge to provide social proof near the conversion point.', rationale: 'Social proof (3 500 reviews, 4.5/5) placed near the CTA reduces hesitation. This is the highest-impact location for the badge on the page.' },
            ]}
            donts={[
              { rule: 'Do not place a second equally-prominent CTA in the hero.', rationale: 'The hero\'s single job is to get a postal code entered. A second CTA (e.g. "Watch a video") splits attention and reduces conversion rate on the primary action.' },
              { rule: 'Do not use the hero on interior pages without adapting the headline.', rationale: 'The HeroSection headline is tuned for the homepage. Service-specific and city-specific pages need adapted copy — using the same generic headline creates irrelevant context for returning users.', },
            ]}
          />
        </DocSection>
        <DocSection label="Accessibility & WCAG">
          <div className="flex flex-col gap-4">
            <AccessibilityNote
              criterion="WCAG 2.1 AA 1.4.3 — Contrast"
              requirement="All text on the hero background must meet 4.5:1"
              why="The pink hero background (btn-bg) is lighter than a neutral surface. Text color, CTA text, and USP badge text all require verification on this background. The search input field on the pink background uses a white fill — the input text must meet 4.5:1 against white, not against the pink."
            />
            <AccessibilityNote
              criterion="WCAG 2.1 AA 1.1.1 — Non-text Content"
              requirement="The hero photo must have descriptive alt text if it conveys meaning"
              why="If the hero photo shows technicians at work (communicating professionalism and trust), the alt text should describe that: alt='Techniciens Murfy en intervention'. If purely decorative, alt='' is acceptable — but only if the trust message is conveyed by other text on the page."
            />
          </div>
        </DocSection>
      </div>
    </div>
  ),
}

export const Default: Story = {
  args: {
    subtext: 'Plus de 300 000 français nous ont déjà fait confiance pour réparer leur électroménager.',
    ctaLabel: 'Voir les disponibilités',
    price: '75€',
    priceLabel: 'À partir de',
    priceSublabel: 'avec le Bonus',
    trustpilotRating: 4.5,
    trustpilotLabel: 'Excellent',
    checkItems: ['VOTRE RDV EN 3MIN', 'PAYEZ APRÈS LE RDV'],
    imageUrl: heroPhoto,
  },
}

export const NoImage: Story = {
  args: {
    ...Default.args,
    imageUrl: undefined,
  },
}
