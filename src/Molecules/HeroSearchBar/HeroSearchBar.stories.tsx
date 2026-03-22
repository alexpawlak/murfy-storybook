import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { HeroSearchBar } from './HeroSearchBar'
import { DocHeader, DocSection, GuidanceGrid, AccessibilityNote } from '../../Foundation/doc-components'

const meta: Meta<typeof HeroSearchBar> = {
  title: 'Molecules/HeroSearchBar',
  component: HeroSearchBar,
  parameters: { layout: 'fullscreen' },
  argTypes: {
    placeholder: { control: 'text' },
    ctaLabel: { control: 'text' },
  },
}
export default meta
type Story = StoryObj<typeof HeroSearchBar>

function HeroBg({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full min-h-screen flex items-center justify-center p-8" style={{ backgroundColor: 'var(--btn-bg)' }}>
      <div className="w-full max-w-2xl">{children}</div>
    </div>
  )
}

const defaultArgs = {
  placeholder: 'Saisissez votre code postal',
  ctaLabel: 'Voir les disponibilités',
  usps: ['Votre RDV en 3min', 'Payez après le RDV'],
}

// ─── Overview ─────────────────────────────────────────────────────────────────

export const Overview: Story = {
  render: () => (
    <div className="min-h-screen" style={{ background: 'var(--bg)' }}>
      <DocHeader
        layer="Molecules"
        title="HeroSearchBar"
        description="The primary conversion entry point — a postal code input combined with a CTA button and two USP badges. Positioned prominently in the hero section on a pink brand background. Combines Input + Button atoms."
      />

      <div className="px-8 py-12 max-w-4xl">

        <DocSection
          label="Showcase"
          subtitle="Desktop and mobile viewport contexts, plus on-dark background variant."
        >
          <div className="space-y-8">
            <div>
              <p className="text-text-xsmall-semibold text-text mb-3" style={{ opacity: 0.5 }}>On pink hero background (default context)</p>
              <div className="rounded-[var(--radius-card)] overflow-hidden">
                <HeroBg>
                  <HeroSearchBar {...defaultArgs} />
                </HeroBg>
              </div>
            </div>
            <div>
              <p className="text-text-xsmall-semibold text-text mb-3" style={{ opacity: 0.5 }}>On dark background</p>
              <div
                className="rounded-[var(--radius-card)] overflow-hidden flex items-center justify-center p-8"
                data-theme="dark"
                style={{ background: 'var(--bg)', minHeight: 200 }}
              >
                <div className="w-full max-w-2xl">
                  <HeroSearchBar {...defaultArgs} />
                </div>
              </div>
            </div>
          </div>
        </DocSection>

        <DocSection label="Best Practices">
          <GuidanceGrid
            dos={[
              {
                rule: 'Keep the placeholder text as a format hint, not an instruction.',
                rationale: 'A placeholder like "75001" shows the expected format without instructing. Instructions ("Enter your postal code") are for the label — which must remain visible and persistent.',
                wcag: 'WCAG 2.1 AA 1.3.1',
              },
              {
                rule: 'Keep USP badges to 3–5 words each.',
                rationale: 'USP badges are scanned at a glance alongside the CTA. Long text wraps on mobile and competes with the search field for attention at exactly the moment the user is ready to convert.',
              },
              {
                rule: 'Validate postal code format before submitting.',
                rationale: 'A 5-digit French postal code has a predictable format. Client-side validation prevents server round-trips for obviously invalid inputs and gives immediate feedback — reducing frustration at the critical conversion moment.',
                wcag: 'WCAG 2.1 AA 3.3.1',
              },
            ]}
            donts={[
              {
                rule: 'Do not rely on placeholder color alone to indicate the field is interactive.',
                rationale: 'On the pink hero background, the input border is the primary cue that this is an editable field. Ensure the border maintains 3:1 contrast against the background for users who do not distinguish color.',
                wcag: 'WCAG 2.1 AA 1.4.11',
              },
              {
                rule: 'Do not place a second HeroSearchBar further down the page.',
                rationale: 'The HeroSearchBar is the hero\'s single conversion action. A duplicate lower on the page dilutes its urgency. Use a simpler PostalCodeForm or CTA button for secondary conversion points.',
              },
            ]}
          />
        </DocSection>

        <DocSection label="Accessibility & WCAG">
          <div className="flex flex-col gap-4">
            <AccessibilityNote
              criterion="WCAG 2.1 AA 1.3.1 — Info and Relationships"
              requirement="The search input must have a programmatically associated label"
              why="The HeroSearchBar uses a visual placeholder for the input. A visually-hidden label (or aria-label) must still exist in the HTML so screen readers can announce the field's purpose when it receives focus. Without a label, the field is announced as 'edit text' — users have no context."
              href="https://www.w3.org/WAI/WCAG21/Understanding/info-and-relationships.html"
            />
            <AccessibilityNote
              criterion="WCAG 2.1 AA 1.4.3 — Contrast"
              requirement="Input text and CTA label must meet 4.5:1 against their backgrounds"
              why="The input text on the white field background and the CTA label on the pink/accent background both require 4.5:1. The pink hero background itself does not require contrast checking — it is a decorative surface, not text. Only elements that convey information need contrast verification."
            />
          </div>
        </DocSection>

      </div>
    </div>
  ),
}

// ─── Standard stories ─────────────────────────────────────────────────────────

export const Desktop: Story = {
  args: defaultArgs,
  parameters: { viewport: { defaultViewport: 'desktop' } },
  decorators: [(Story) => <HeroBg><Story /></HeroBg>],
}

export const Mobile: Story = {
  args: defaultArgs,
  parameters: { viewport: { defaultViewport: 'mobile1' } },
  decorators: [
    (Story) => (
      <div className="w-full min-h-screen flex items-start justify-center p-6 pt-12" style={{ backgroundColor: 'var(--btn-bg)' }}>
        <div className="w-full"><Story /></div>
      </div>
    ),
  ],
}

export const OnDarkBg: Story = {
  args: defaultArgs,
  decorators: [
    (Story) => (
      <div data-theme="dark">
        <div className="w-full min-h-screen flex items-center justify-center p-8" style={{ backgroundColor: 'var(--bg)' }}>
          <div className="w-full max-w-2xl"><Story /></div>
        </div>
      </div>
    ),
  ],
}

export const Playground: Story = {
  args: defaultArgs,
  decorators: [(Story) => <HeroBg><Story /></HeroBg>],
}
