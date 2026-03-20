import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { MurfyLogo } from '../../Atoms/BrandIcons/MurfyLogo'
import { Facebook } from '../../Atoms/Icons/Facebook'
import { Instagram } from '../../Atoms/Icons/Instagram'
import { LinkedIn } from '../../Atoms/Icons/LinkedIn'
import { X } from '../../Atoms/Icons/X'
import { YouTube } from '../../Atoms/Icons/YouTube'
import { Tick } from '../../Atoms/Icons/Tick'
import { ChevronRight } from '../../Atoms/Icons/ChevronRight'
import { ChevronLeft } from '../../Atoms/Icons/ChevronLeft'
import { ChevronUp } from '../../Atoms/Icons/ChevronUp'
import { ChevronDown } from '../../Atoms/Icons/ChevronDown'

const meta: Meta = {
  title: 'Foundation/Icons/Brand Icons',
  parameters: {
    layout: 'centered',
  },
}

export default meta
type Story = StoryObj

export const BrandLogo: Story = {
  render: () => (
    <div className="flex flex-col items-center gap-4">
      <h1 className="text-lg font-bold" style={{ color: 'var(--text)' }}>Murfy Logo</h1>
      <MurfyLogo width={200} height={200} className="text-brand-text" />
      <p className="text-xs" style={{ color: 'var(--text)', opacity: 0.5 }}>
        Custom brand logo for Murfy.
      </p>
    </div>
  ),
}

export const SocialIcons: Story = {
  render: () => (
    <div className="flex flex-col items-center gap-6">
      <h1 className="text-lg font-bold" style={{ color: 'var(--text)' }}>Social Icons</h1>
      <p className="text-xs mb-4" style={{ color: 'var(--text)', opacity: 0.5 }}>
        Social media icons from the murfy.fr footer.
      </p>
      <div className="flex gap-6">
        {[
          { Icon: Facebook, name: 'Facebook' },
          { Icon: Instagram, name: 'Instagram' },
          { Icon: LinkedIn, name: 'LinkedIn' },
          { Icon: X, name: 'X (Twitter)' },
          { Icon: YouTube, name: 'YouTube' },
        ].map(({ Icon, name }) => (
          <div key={name} className="flex flex-col items-center gap-2">
            <Icon width={48} height={48} className="text-brand-text" />
            <span className="text-xs" style={{ color: 'var(--text)' }}>{name}</span>
          </div>
        ))}
      </div>
    </div>
  ),
}

export const UIIcons: Story = {
  render: () => (
    <div className="flex flex-col items-center gap-6">
      <h1 className="text-lg font-bold" style={{ color: 'var(--text)' }}>UI Icons</h1>
      <p className="text-xs mb-4" style={{ color: 'var(--text)', opacity: 0.5 }}>
        Custom Murfy UI icons. All use <code>currentColor</code> — set color via <code>style</code> or Tailwind class.
      </p>
      <div className="flex gap-8">
        {[
          { Icon: Tick, name: 'Tick' },
          { Icon: ChevronRight, name: 'ChevronRight' },
          { Icon: ChevronLeft, name: 'ChevronLeft' },
          { Icon: ChevronUp, name: 'ChevronUp' },
          { Icon: ChevronDown, name: 'ChevronDown' },
        ].map(({ Icon, name }) => (
          <div key={name} className="flex flex-col items-center gap-2">
            <div
              className="flex items-center justify-center rounded-lg"
              style={{ width: 48, height: 48, background: 'var(--bg-2)' }}
            >
              <Icon width={24} height={24} style={{ color: 'var(--text)' }} />
            </div>
            <span className="text-xs" style={{ color: 'var(--text)' }}>{name}</span>
          </div>
        ))}
      </div>
    </div>
  ),
}
