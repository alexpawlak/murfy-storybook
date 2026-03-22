import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { PostalCodeForm } from './PostalCodeForm'
import { DocHeader, DocSection, GuidanceGrid, AccessibilityNote } from '../../Foundation/doc-components'

const meta: Meta<typeof PostalCodeForm> = {
  title: 'Molecules/PostalCodeForm',
  component: PostalCodeForm,
  parameters: { layout: 'fullscreen' },
  argTypes: {
    heading: { control: 'text' },
    subheading: { control: 'text' },
  },
}
export default meta
type Story = StoryObj<typeof PostalCodeForm>

// ─── Overview ─────────────────────────────────────────────────────────────────

export const Overview: Story = {
  render: () => (
    <div className="min-h-screen" style={{ background: 'var(--bg)' }}>
      <DocHeader
        layer="Molecules"
        title="PostalCodeForm"
        description="Standalone postal code entry form with heading, subheading, and submit CTA. Used in the Newsletter/Service Area sections as a secondary conversion point. A lighter alternative to HeroSearchBar — no USP badges, no hero styling."
      />

      <div className="px-8 py-12 max-w-3xl">

        <DocSection label="Showcase" subtitle="Default, custom heading, and with callback variants.">
          <div className="space-y-10">
            <div>
              <p className="text-text-xsmall-semibold text-text mb-3" style={{ opacity: 0.5 }}>Default</p>
              <PostalCodeForm />
            </div>
            <div className="border-t border-border pt-10">
              <p className="text-text-xsmall-semibold text-text mb-3" style={{ opacity: 0.5 }}>Custom heading</p>
              <PostalCodeForm
                heading="Intervention dans votre ville ?"
                subheading="Vérifiez en quelques secondes si nous couvrons votre zone."
              />
            </div>
            <div className="border-t border-border pt-10">
              <p className="text-text-xsmall-semibold text-text mb-3" style={{ opacity: 0.5 }}>With callback (submit logs to console)</p>
              <PostalCodeForm onSubmit={code => console.log('Code postal soumis :', code)} />
            </div>
          </div>
        </DocSection>

        <DocSection label="Best Practices">
          <GuidanceGrid
            dos={[
              {
                rule: 'Show a clear error message when the postal code format is invalid.',
                rationale: 'French postal codes are exactly 5 digits. Immediate, specific error messages ("Format invalide, ex: 75001") reduce re-submission attempts and user frustration.',
                wcag: 'WCAG 2.1 AA 3.3.1',
              },
              {
                rule: 'Provide a success state after submission.',
                rationale: 'After the form submits, users need confirmation that something happened. A success message or redirect prevents double submissions and communicates that the action was received.',
                wcag: 'WCAG 2.1 AA 3.3.4',
              },
              {
                rule: 'Keep heading text to a single question or instruction.',
                rationale: 'The form heading is the user\'s entry point to the conversion. A focused question ("Intervenons-nous dans votre ville ?") has higher cognitive resonance than a generic heading ("Zone d\'intervention").',
              },
            ]}
            donts={[
              {
                rule: 'Do not submit the form silently without feedback.',
                rationale: 'Users who click submit and see no response will click again (double submit) or assume the site is broken. Always provide visible feedback — a spinner, a success state, or an error.',
                wcag: 'WCAG 2.1 AA 4.1.3',
              },
              {
                rule: 'Do not place this form and HeroSearchBar on the same page without clear visual separation.',
                rationale: 'Two postal code entry points on the same page create confusion about which one to use. Reserve PostalCodeForm for secondary sections (newsletter, service area) where HeroSearchBar\'s prominence would be out of context.',
              },
            ]}
          />
        </DocSection>

        <DocSection label="Accessibility & WCAG">
          <div className="flex flex-col gap-4">
            <AccessibilityNote
              criterion="WCAG 2.1 AA 3.3.1 — Error Identification"
              requirement="Input errors must be identified in text and described to the user"
              why="When a user enters '75abc' and submits, the error state must: (1) appear as visible text, (2) identify which field has the error, (3) describe what went wrong in plain language. Turning the field border red without a text message fails this criterion for colorblind users."
              href="https://www.w3.org/WAI/WCAG21/Understanding/error-identification.html"
            />
            <AccessibilityNote
              criterion="WCAG 2.1 AA 3.3.2 — Labels or Instructions"
              requirement="Forms must provide labels or instructions for fields that require specific formats"
              why="The postal code field must indicate that a 5-digit French format is expected. This can be done via a persistent label, a hint text below the field, or a placeholder that shows the format ('ex: 75001'). Relying solely on placeholder text that disappears on focus is insufficient for users who need format reminders while typing."
              href="https://www.w3.org/WAI/WCAG21/Understanding/labels-or-instructions.html"
            />
          </div>
        </DocSection>

      </div>
    </div>
  ),
}

// ─── Standard stories ─────────────────────────────────────────────────────────

export const Default: Story = {
  decorators: [(Story) => <div className="p-8"><Story /></div>],
}

export const CustomHeading: Story = {
  args: {
    heading: 'Intervention dans votre ville ?',
    subheading: 'Vérifiez en quelques secondes si nous couvrons votre zone.',
  },
  decorators: [(Story) => <div className="p-8"><Story /></div>],
}

export const WithCallback: Story = {
  render: () => (
    <div className="p-8">
      <PostalCodeForm onSubmit={code => alert(`Code postal soumis : ${code}`)} />
    </div>
  ),
}
