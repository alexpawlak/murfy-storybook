import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { MurfyLogo } from '../Atoms/Icons/MurfyLogo'
import { Facebook } from '../Atoms/Icons/Facebook'
import { Instagram } from '../Atoms/Icons/Instagram'
import { LinkedIn } from '../Atoms/Icons/LinkedIn'
import { X } from '../Atoms/Icons/X'
import { YouTube } from '../Atoms/Icons/YouTube'

const meta: Meta = {
  title: 'Foundation/Icons',
  parameters: {
    layout: 'centered',
  },
}

export default meta
type Story = StoryObj

export const BrandIcons: Story = {
  render: () => (
    <div className="flex flex-col items-center gap-4">
      <h1 className="text-lg font-bold" style={{ color: 'var(--text)' }}>Murfy Logo</h1>
      <MurfyLogo width={200} height={200} className="text-brand-text" />
      <p className="text-xs text-text/50" style={{ color: 'var(--text)' }}>
        Custom brand logo for Murfy.
      </p>
    </div>
  ),
}

export const SocialIcons: Story = {
  render: () => (
    <div className="flex flex-col items-center gap-6">
      <h1 className="text-lg font-bold" style={{ color: 'var(--text)' }}>Social Icons</h1>
      <p className="text-xs text-text/50 mb-4" style={{ color: 'var(--text)' }}>
        Social media icons from the murfy.fr footer.
      </p>
      <div className="flex gap-6">
        <div className="flex flex-col items-center gap-2">
          <Facebook width={48} height={48} className="text-brand-text" />
          <span className="text-xs" style={{ color: 'var(--text)' }}>Facebook</span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <Instagram width={48} height={48} className="text-brand-text" />
          <span className="text-xs" style={{ color: 'var(--text)' }}>Instagram</span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <LinkedIn width={48} height={48} className="text-brand-text" />
          <span className="text-xs" style={{ color: 'var(--text)' }}>LinkedIn</span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <X width={48} height={48} className="text-brand-text" />
          <span className="text-xs" style={{ color: 'var(--text)' }}>X (Twitter)</span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <YouTube width={48} height={48} className="text-brand-text" />
          <span className="text-xs" style={{ color: 'var(--text)' }}>YouTube</span>
        </div>
      </div>
    </div>
  ),
}
