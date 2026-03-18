import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { HeroSearchBar } from './HeroSearchBar'

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

// ─── Wrapper with hero pink bg ────────────────────────────────────────────────

function HeroBg({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="w-full min-h-screen flex items-center justify-center p-8"
      style={{ backgroundColor: 'var(--btn-bg)' }}
    >
      <div className="w-full max-w-2xl">{children}</div>
    </div>
  )
}

// ─── Stories ──────────────────────────────────────────────────────────────────

export const Desktop: Story = {
  args: {
    placeholder: 'Saisissez votre code postal',
    ctaLabel: 'Voir les disponibilités',
    usps: ['Votre RDV en 3min', 'Payez après le RDV'],
  },
  parameters: {
    viewport: { defaultViewport: 'desktop' },
  },
  decorators: [
    (Story) => (
      <HeroBg>
        <Story />
      </HeroBg>
    ),
  ],
}

export const Mobile: Story = {
  args: {
    placeholder: 'Saisissez votre code postal',
    ctaLabel: 'Voir les disponibilités',
    usps: ['Votre RDV en 3min', 'Payez après le RDV'],
  },
  parameters: {
    viewport: { defaultViewport: 'mobile1' },
  },
  decorators: [
    (Story) => (
      <div
        className="w-full min-h-screen flex items-start justify-center p-6 pt-12"
        style={{ backgroundColor: 'var(--btn-bg)' }}
      >
        <div className="w-full">
          <Story />
        </div>
      </div>
    ),
  ],
}

export const OnDarkBg: Story = {
  args: {
    placeholder: 'Saisissez votre code postal',
    ctaLabel: 'Voir les disponibilités',
    usps: ['Votre RDV en 3min', 'Payez après le RDV'],
  },
  decorators: [
    (Story) => (
      <div data-theme="dark">
        <div
          className="w-full min-h-screen flex items-center justify-center p-8"
          style={{ backgroundColor: 'var(--bg)' }}
        >
          <div className="w-full max-w-2xl">
            <Story />
          </div>
        </div>
      </div>
    ),
  ],
}

export const Playground: Story = {
  args: {
    placeholder: 'Saisissez votre code postal',
    ctaLabel: 'Voir les disponibilités',
    usps: ['Votre RDV en 3min', 'Payez après le RDV'],
  },
  decorators: [
    (Story) => (
      <HeroBg>
        <Story />
      </HeroBg>
    ),
  ],
}
