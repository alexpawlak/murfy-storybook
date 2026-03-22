import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Footer } from './Footer'
import { DocHeader, DocSection, GuidanceGrid, AccessibilityNote } from '../../Foundation/doc-components'

const meta: Meta<typeof Footer> = {
  title: 'Molecules/Footer',
  component: Footer,
  parameters: { layout: 'fullscreen' },
  argTypes: {
    defaultFaqOpen: { control: 'boolean' },
  },
}
export default meta
type Story = StoryObj<typeof Footer>

export const Overview: Story = {
  render: () => (
    <div className="min-h-screen" style={{ background: 'var(--bg)' }}>
      <DocHeader
        layer="Molecules"
        title="Footer"
        description="Mobile-first site footer containing navigation links, social icons, and legal notices. Used at the bottom of every page. Contains the Murfy logo, vertical navigation links, social media icons, and copyright + legal line."
      />

      <div className="px-8 py-12 max-w-5xl">

        <DocSection label="Showcase">
          <div className="max-w-sm">
            <Footer />
          </div>
        </DocSection>

        <DocSection label="Best Practices">
          <GuidanceGrid
            dos={[
              {
                rule: 'Keep footer navigation links short and scannable.',
                rationale: 'Footer links are used by users who didn\'t find what they needed in the main navigation. Short, descriptive link labels (not paragraphs) allow quick scanning.',
              },
              {
                rule: 'Include the legal notices (Mentions légales, CGV, Politique de confidentialité) in the footer.',
                rationale: 'French law requires these links to be accessible on every page. The footer is the conventional and legally-expected location.',
              },
            ]}
            donts={[
              {
                rule: 'Do not use the footer for primary navigation or CTAs.',
                rationale: 'The footer is a last resort for users who have scrolled to the bottom. Primary CTAs belong in the hero and content sections where users are most engaged.',
              },
              {
                rule: 'Do not make social media links open in the same tab.',
                rationale: 'Social media links should open in a new tab to avoid navigating users away from the murfy.fr session. When opening in a new tab, add aria-label="... (s\'ouvre dans un nouvel onglet)" for screen reader users.',
                wcag: 'WCAG 2.1 AA 3.2.2',
              },
            ]}
          />
        </DocSection>

        <DocSection label="Accessibility & WCAG">
          <div className="flex flex-col gap-4">
            <AccessibilityNote
              criterion="WCAG 2.1 AA 2.4.1 — Bypass Blocks"
              requirement="A mechanism must exist to skip repetitive navigation"
              why="The footer contains repeated links that appear on every page. A 'skip to main content' link at the top of the page (not the footer) satisfies this criterion — keyboard users can bypass the header and jump directly to the main content. This also benefits footer navigation indirectly by keeping the page structure lean."
              href="https://www.w3.org/WAI/WCAG21/Understanding/bypass-blocks.html"
            />
            <AccessibilityNote
              criterion="WCAG 2.1 AA 2.4.4 — Link Purpose"
              requirement="The purpose of each link must be determinable from the link text or context"
              why="Social media icon links (Instagram, LinkedIn, YouTube) must have a text alternative — either visible text or aria-label — that describes where the link goes. An icon of a camera with no label is announced by screen readers as 'image link' or nothing, giving no destination information."
              href="https://www.w3.org/WAI/WCAG21/Understanding/link-purpose-in-context.html"
            />
          </div>
        </DocSection>

      </div>
    </div>
  ),
}

export const Playground: Story = {
  args: { defaultFaqOpen: false },
  decorators: [(Story) => <div className="max-w-sm mx-auto"><Story /></div>],
}

export const FullWidth: Story = {
  render: () => <Footer />,
}
