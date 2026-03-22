import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { MurfyNavbar } from './MurfyNavbar'
import { DEFAULT_VERTICALS } from '../../Molecules/VerticalSelector/VerticalSelector'
import { DocHeader, DocSection, GuidanceGrid, AccessibilityNote } from '../../Foundation/doc-components'

const meta: Meta<typeof MurfyNavbar> = {
  title: 'Organisms/MurfyNavbar',
  component: MurfyNavbar,
  parameters: { layout: 'fullscreen' },
  argTypes: {
    activeVerticalId: {
      control: 'select',
      options: DEFAULT_VERTICALS.map(v => v.id),
    },
  },
}
export default meta
type Story = StoryObj<typeof MurfyNavbar>

// ─── Overview ─────────────────────────────────────────────────────────────────

export const Overview: Story = {
  render: () => (
    <div className="min-h-screen" style={{ background: 'var(--bg)' }}>
      <DocHeader
        layer="Organisms"
        title="MurfyNavbar"
        description="Mobile-first top navigation bar with the Murfy logomark, account and menu actions, and the VerticalSelector pill row below. The active vertical pill adapts to the active accent color — switch Theme and Accent in the toolbar to preview all combinations."
      />
      <div className="px-8 py-12 max-w-2xl">
        <DocSection label="Showcase" subtitle="Three active-vertical states — the pill row updates to reflect the selected vertical.">
          <div className="space-y-8">
            <div>
              <p className="text-label uppercase tracking-[0.08em] font-semibold mb-3" style={{ color: 'var(--text)', opacity: 0.5 }}>
                Électroménager (default)
              </p>
              <MurfyNavbar />
            </div>
            <div>
              <p className="text-label uppercase tracking-[0.08em] font-semibold mb-3" style={{ color: 'var(--text)', opacity: 0.5 }}>
                Chauffage active
              </p>
              <MurfyNavbar activeVerticalId="chauffage" />
            </div>
            <div>
              <p className="text-label uppercase tracking-[0.08em] font-semibold mb-3" style={{ color: 'var(--text)', opacity: 0.5 }}>
                Solaire active
              </p>
              <MurfyNavbar activeVerticalId="solaire" />
            </div>
          </div>
        </DocSection>
        <DocSection label="Best Practices">
          <GuidanceGrid
            dos={[
              { rule: 'Keep the navbar height fixed — never let content push it taller.', rationale: 'The navbar is a persistent chrome element. If it grows (e.g. when a second pill row wraps), page content shifts and the user loses their scroll position context. The VerticalSelector must scroll horizontally on overflow, not wrap to a second line.' },
              { rule: 'Ensure the Murfy logomark links to the homepage.', rationale: 'The logo-as-home-link is a web convention that virtually all users rely on. Removing this link or changing its destination breaks a fundamental navigation expectation — especially critical on mobile where the back button is often used in place of explicit nav links.' },
            ]}
            donts={[
              { rule: 'Do not hide the navbar on scroll-down without a scroll-up reveal.', rationale: 'Auto-hiding navbars that don\'t reappear on scroll-up trap mobile users. If the navbar hides on scroll-down, it must reappear immediately on the slightest scroll-up gesture — hiding without reveal is a usability failure on pages with long content.', wcag: 'WCAG 2.1 AA 2.4.8' },
              { rule: 'Do not render inactive vertical pills in the accent color.', rationale: 'Only the active vertical pill should use the accent background. Inactive pills must use a neutral or ghost style — using accent color on all pills removes the visual distinction that communicates which vertical the user is currently in.' },
            ]}
          />
        </DocSection>
        <DocSection label="Accessibility & WCAG">
          <div className="flex flex-col gap-4">
            <AccessibilityNote
              criterion="WCAG 2.1 AA 4.1.2 — Name, Role, Value"
              requirement="The hamburger menu button must expose its role and expanded state"
              why="A hamburger menu icon with no label is announced by screen readers as 'button' with no context about what it does. The button needs aria-label='Menu' or equivalent visible text. When the menu is open, aria-expanded='true' must be set so screen readers announce 'Menu button expanded'."
              href="https://www.w3.org/WAI/WCAG21/Understanding/name-role-value.html"
            />
            <AccessibilityNote
              criterion="WCAG 2.1 AA 2.4.1 — Bypass Blocks"
              requirement="A skip-to-content link should precede the navbar in the DOM"
              why="The navbar appears on every page and contains the VerticalSelector with multiple interactive pills. Keyboard users must tab through all navbar elements before reaching page content on every page load. A visually-hidden 'Aller au contenu' link as the first focusable element lets keyboard users skip the navbar entirely."
              href="https://www.w3.org/WAI/WCAG21/Understanding/bypass-blocks.html"
            />
          </div>
        </DocSection>
      </div>
    </div>
  ),
}

// ─── Mobile preview ───────────────────────────────────────────────────────────

export const MobilePreview: Story = {
  render: () => (
    <div className="flex items-start justify-center min-h-screen py-12" style={{ backgroundColor: 'var(--bg-2)' }}>
      <div
        className="w-[390px] overflow-hidden"
        style={{ borderRadius: '40px', boxShadow: '0 24px 80px rgba(0,0,0,0.2)', border: '8px solid var(--border)' }}
      >
        <MurfyNavbar />
        {/* Placeholder page content */}
        <div className="p-6 space-y-3" style={{ backgroundColor: 'var(--bg)' }}>
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="h-4 rounded-pill opacity-10"
              style={{ backgroundColor: 'var(--text)', width: `${70 + (i % 3) * 15}%` }}
            />
          ))}
        </div>
      </div>
    </div>
  ),
}

// ─── Playground ───────────────────────────────────────────────────────────────

export const Playground: Story = {
  args: {
    activeVerticalId: 'electromenager',
    verticals: DEFAULT_VERTICALS,
  },
}
