import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { HambergerMenu, ProfileCircle, AddSquare, MinusCirlce } from 'iconsax-react'

const meta: Meta = {
  title: 'Foundation/Icons/Iconsax',
  parameters: {
    layout: 'centered',
  },
}

export default meta
type Story = StoryObj

export const UsedIcons: Story = {
  render: () => (
    <div className="flex flex-col items-center gap-6">
      <h1 className="text-lg font-bold" style={{ color: 'var(--text)' }}>Iconsax Icons</h1>
      <p className="text-xs text-text/50 mb-4" style={{ color: 'var(--text)' }}>
        Icons from the <a href="https://iconsax.io/" target="_blank" rel="noopener noreferrer" className="underline">iconsax-react</a> library used in the project.
      </p>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        <div className="flex flex-col items-center gap-2">
          <HambergerMenu size={48} variant="Bold" color="var(--text)" />
          <span className="text-xs" style={{ color: 'var(--text)' }}>HambergerMenu</span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <ProfileCircle size={48} variant="Bold" color="var(--text)" />
          <span className="text-xs" style={{ color: 'var(--text)' }}>ProfileCircle</span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <AddSquare size={48} variant="Bold" color="var(--text)" />
          <span className="text-xs" style={{ color: 'var(--text)' }}>AddSquare</span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <MinusCirlce size={48} variant="Bold" color="var(--text)" />
          <span className="text-xs" style={{ color: 'var(--text)' }}>MinusCirlce</span>
        </div>
      </div>
      <div className="mt-4 p-4 rounded-lg" style={{ backgroundColor: 'var(--bg-2)', color: 'var(--text)' }}>
        <h3 className="text-sm font-semibold mb-2">Usage</h3>
        <pre className="text-xs font-mono">
{`import { HambergerMenu, ProfileCircle } from 'iconsax-react'

<HambergerMenu size={24} variant="Bold" color="currentColor" />`}
        </pre>
      </div>
    </div>
  ),
}
