import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { NewsletterForm } from './NewsletterForm'
import { DocHeader, DocSection, GuidanceGrid, AccessibilityNote } from '../../Foundation/doc-components'

const meta: Meta<typeof NewsletterForm> = {
  title: 'Molecules/NewsletterForm',
  component: NewsletterForm,
  parameters: { layout: 'fullscreen' },
  argTypes: {
    inputPlaceholder: { control: 'text' },
    ctaLabel: { control: 'text' },
    showConsent: { control: 'boolean' },
    consentLabel: { control: 'text' },
  },
}

export default meta
type Story = StoryObj<typeof NewsletterForm>

export const Overview: Story = {
  render: () => (
    <div className="min-h-screen" style={{ background: 'var(--bg)' }}>
      <DocHeader
        layer="Molecules"
        title="NewsletterForm"
        description="Compact postal code or email entry form with an optional consent checkbox. Two variants: hero (no consent, for postal code entry) and newsletter (with GDPR consent checkbox). Used in the Newsletter Section."
      />

      <div className="px-8 py-12 max-w-3xl">

        <DocSection label="Showcase" subtitle="Hero variant (no consent) and newsletter variant (with GDPR consent).">
          <div className="space-y-10">
            <div>
              <p className="text-text-xsmall-semibold text-text mb-3" style={{ opacity: 0.5 }}>Hero variant — no consent</p>
              <NewsletterForm inputPlaceholder="Saisissez votre code postal" ctaLabel="Voir les disponibilités" showConsent={false} />
            </div>
            <div className="border-t border-border pt-10">
              <p className="text-text-xsmall-semibold text-text mb-3" style={{ opacity: 0.5 }}>Newsletter variant — with GDPR consent</p>
              <NewsletterForm
                inputPlaceholder="Saisissez votre code postal"
                ctaLabel="Voir les disponibilités"
                showConsent={true}
                consentLabel="Je souhaite recevoir les actualités et les astuces d'experts de Murfy"
              />
            </div>
          </div>
        </DocSection>

        <DocSection label="Best Practices">
          <GuidanceGrid
            dos={[
              {
                rule: 'Always show the consent checkbox when collecting data for marketing purposes.',
                rationale: 'French and EU law (GDPR / CNIL) requires explicit opt-in consent before adding someone to a marketing list. The consent checkbox with a plain-language label satisfies this requirement — pre-ticking the box does not.',
              },
              {
                rule: 'Make the consent label text specific about what the user is agreeing to.',
                rationale: 'Vague consent labels ("I agree to terms") are insufficient under GDPR. The label must describe what the user will receive and imply that they can withdraw consent at any time.',
              },
            ]}
            donts={[
              {
                rule: 'Do not pre-tick the consent checkbox.',
                rationale: 'Pre-ticked consent boxes are explicitly prohibited by GDPR Article 7. Consent must be a deliberate, affirmative action — a pre-ticked box fails this requirement.',
              },
              {
                rule: 'Do not submit the form if the consent checkbox is required but unchecked.',
                rationale: 'Submitting without required consent and then filtering server-side still means the data was collected — which violates GDPR. Prevent submission entirely and show a validation message.',
                wcag: 'WCAG 2.1 AA 3.3.1',
              },
            ]}
          />
        </DocSection>

        <DocSection label="Accessibility & WCAG">
          <div className="flex flex-col gap-4">
            <AccessibilityNote
              criterion="WCAG 2.1 AA 1.3.1 — Info and Relationships"
              requirement="The consent checkbox must be programmatically associated with its label"
              why="The consent label text must be linked to the checkbox input via htmlFor/id or aria-labelledby. Without this association, screen readers announce 'unchecked checkbox' with no context about what the user is consenting to."
              href="https://www.w3.org/WAI/WCAG21/Understanding/info-and-relationships.html"
            />
            <AccessibilityNote
              criterion="WCAG 2.1 AA 2.5.5 — Target Size"
              requirement="The checkbox click area must be at least 44×44px"
              why="The native checkbox control is often very small (16–20px). Wrapping the checkbox and label in a clickable container ensures users with motor difficulties can tap the full label row to toggle the checkbox — not just a tiny square."
              href="https://www.w3.org/WAI/WCAG21/Understanding/target-size.html"
            />
          </div>
        </DocSection>

      </div>
    </div>
  ),
}

export const HeroVariant: Story = {
  args: { inputPlaceholder: 'Saisissez votre code postal', ctaLabel: 'Voir les disponibilités', showConsent: false },
  decorators: [(Story) => <div className="p-8"><Story /></div>],
}

export const NewsletterVariant: Story = {
  args: { inputPlaceholder: 'Saisissez votre code postal', ctaLabel: 'Voir les disponibilités', showConsent: true, consentLabel: "Je souhaite recevoir les actualités et les astuces d'experts de Murfy" },
  decorators: [(Story) => <div className="p-8"><Story /></div>],
}
