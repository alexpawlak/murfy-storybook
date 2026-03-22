import React, { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Input } from './Input'
import { DocHeader, DocSection, GuidanceGrid, AccessibilityNote } from '../../Foundation/doc-components'

const meta: Meta<typeof Input> = {
  title: 'Atoms/Input',
  component: Input,
  parameters: { layout: 'fullscreen' },
  argTypes: {
    label: { control: 'text' },
    placeholder: { control: 'text' },
    hint: { control: 'text' },
    error: { control: 'text' },
    type: { control: 'select', options: ['text', 'email', 'tel', 'number'] },
    disabled: { control: 'boolean' },
  },
}
export default meta
type Story = StoryObj<typeof Input>

// ─── Layout helper ────────────────────────────────────────────────────────────

function DocRow({ title, description, children }: { title: string; description: string; children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-6 border-t border-border">
      <div>
        <h4 className="text-text-small-semibold text-text">{title}</h4>
        <p className="mt-1 text-text-xsmall text-text" style={{ opacity: 0.65 }}>{description}</p>
      </div>
      <div className="md:col-span-2 max-w-sm">{children}</div>
    </div>
  )
}

// ─── Overview ────────────────────────────────────────────────────────────────

export const Overview: Story = {
  render: () => (
    <div className="min-h-screen" style={{ background: 'var(--bg)' }}>
      <DocHeader
        layer="Atoms"
        title="Input"
        description="Text field used in forms — postal code entry, contact details, search. The label is always visible above the field so users don't lose context while typing. Four states communicate the field's current condition."
      />

      <div className="px-8 py-12 max-w-4xl">

        {/* ── Showcase ──────────────────────────────────────────────────── */}
        <DocSection
          label="States"
          subtitle="The input has four distinct states. Each communicates something different — guide users before they type, while they type, and after validation."
        >
          <DocRow
            title="Search field"
            description="Pill field with placeholder inside the control and no external label — closest to the Figma search bar reference."
          >
            <Input placeholder="Saisissez votre code postal" type="text" />
          </DocRow>

          <DocRow
            title="Default"
            description="Empty field ready for input. Placeholder shows an example value — not a label replacement."
          >
            <Input label="Code postal" placeholder="75001" type="text" />
          </DocRow>

          <DocRow
            title="With hint"
            description="Helper text below the field. Use to set expectations — accepted formats, privacy notes — before the user makes a mistake."
          >
            <Input label="Email" placeholder="vous@example.com" type="email" hint="Nous ne partageons jamais votre email." />
          </DocRow>

          <DocRow
            title="With error"
            description="Shown after validation fails. The message replaces the hint and turns red. Be specific — tell the user exactly what to fix."
          >
            <Input label="Code postal" placeholder="75001" value="abcde" error="Format invalide, ex: 75001" />
          </DocRow>

          <DocRow
            title="Disabled"
            description="Read-only and non-interactive. Use when a field depends on a prior step not yet completed, or when the value is system-set."
          >
            <Input label="Téléphone" placeholder="06 12 34 56 78" disabled />
          </DocRow>
        </DocSection>

        {/* ── Best Practices ────────────────────────────────────────────── */}
        <DocSection
          label="Best Practices"
          subtitle="Rules for form field labelling, error messaging, and state usage."
        >
          <GuidanceGrid
            dos={[
              {
                rule: 'Always provide a visible label above the field.',
                rationale: 'Placeholder text disappears when the user starts typing. Without a persistent label, users with memory or cognitive difficulties lose context mid-entry. The label must remain visible at all times.',
                wcag: 'WCAG 2.1 AA 1.3.1',
              },
              {
                rule: 'Show specific, actionable error messages.',
                rationale: 'Vague errors like "Invalid input" force users to guess what went wrong. Specific messages ("Format invalide, ex: 75001") reduce the number of re-submission attempts and frustration, especially for users with cognitive disabilities.',
                wcag: 'WCAG 2.1 AA 3.3.1',
              },
              {
                rule: 'Use the hint slot to set format expectations before validation.',
                rationale: 'Preventive guidance (hint text) is more effective than corrective guidance (error text). A hint like "Format: 75001" eliminates the most common errors before they happen.',
              },
              {
                rule: 'Use disabled state only when the field will become editable later.',
                rationale: 'Disabled fields fail WCAG contrast requirements (they are intentionally low-contrast). Only disable a field temporarily — if the value is permanently system-set, display it as static text instead.',
                wcag: 'WCAG 2.1 AA 1.4.3',
              },
            ]}
            donts={[
              {
                rule: 'Do not use placeholder text as the sole label.',
                rationale: 'Placeholder text has roughly 50% less contrast than label text by default in most browsers. Screen readers may not announce placeholder as a field label, creating an invisible field for assistive technology users.',
                wcag: 'WCAG 2.1 AA 1.3.1',
              },
              {
                rule: 'Do not remove the label when space is tight — use a compact layout instead.',
                rationale: 'Labels are not optional for accessibility. If space is truly limited, use a visually-hidden label with appropriate aria-label — the label must still exist in the DOM.',
              },
              {
                rule: 'Do not show an error state before the user has had a chance to fill in the field.',
                rationale: 'Pre-emptive error states create anxiety and suggest the form is broken. Validate on blur (after the user leaves the field) or on submit — not on every keystroke.',
                wcag: 'WCAG 2.1 AA 3.3.1',
              },
              {
                rule: 'Do not change input type dynamically (e.g. text ↔ email) based on user action.',
                rationale: 'Screen readers announce the input type at focus time. Dynamically changing the type can confuse users who have already processed the initial announcement.',
              },
            ]}
          />
        </DocSection>

        {/* ── Accessibility ─────────────────────────────────────────────── */}
        <DocSection label="Accessibility & WCAG">
          <div className="flex flex-col gap-4">
            <AccessibilityNote
              criterion="WCAG 2.1 AA 1.3.1 — Info and Relationships"
              requirement="Labels must be programmatically associated with their input fields"
              why="Screen readers announce the label when a field receives focus. If the label is only visually positioned above the field (not semantically linked via htmlFor/id or aria-label), blind users hear 'edit text' with no context. The Input component uses htmlFor to make this association explicit."
              href="https://www.w3.org/WAI/WCAG21/Understanding/info-and-relationships.html"
            />
            <AccessibilityNote
              criterion="WCAG 2.1 AA 3.3.1 — Error Identification"
              requirement="If an input error is automatically detected, the item in error must be described to the user in text"
              why="When validation fails, the error message must: (1) be visible, (2) identify the field in error, (3) describe the error in plain language. Styling the field red without a text message fails this criterion — users who cannot perceive color receive no information."
              href="https://www.w3.org/WAI/WCAG21/Understanding/error-identification.html"
            />
            <AccessibilityNote
              criterion="WCAG 2.1 AA 1.4.3 — Contrast (Minimum)"
              requirement="Placeholder text must meet 4.5:1 · Label text must meet 4.5:1 · Input border must meet 3:1"
              why="Placeholder text is often styled at reduced opacity (commonly failing contrast). The Input component uses a higher-contrast placeholder color. The field border at 3:1 is the minimum to perceive the field boundary — on light backgrounds, a subtle border can easily fall below this threshold."
              href="https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum.html"
            />
          </div>
        </DocSection>

      </div>
    </div>
  ),
}

// ─── Playground ───────────────────────────────────────────────────────────────

export const Playground: Story = {
  render: () => {
    const [val, setVal] = useState('')
    return (
      <div className="p-8 max-w-xs">
        <Input
          label="Votre code postal"
          placeholder="Saisissez votre code postal"
          value={val}
          onChange={setVal}
        />
        <p className="mt-2 text-text-xsmall text-text" style={{ opacity: 0.65 }}>
          Valeur : {val || '—'}
        </p>
      </div>
    )
  },
}
