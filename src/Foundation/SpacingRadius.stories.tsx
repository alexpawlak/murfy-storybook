import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'

const radii = [
  { name: 'radius-section', label: 'Section', value: '48px', cssVar: '--radius-section' },
  { name: 'radius-card', label: 'Card', value: '24px', cssVar: '--radius-card' },
  { name: 'radius-small', label: 'Small', value: '8px', cssVar: '--radius-small' },
  { name: 'radius-pill', label: 'Pill', value: '9999px', cssVar: '--radius-pill' },
  { name: 'radius-dropdown', label: 'Dropdown', value: '16px', cssVar: '--radius-dropdown' },
]

const spacings = [
  { name: 'spacing-section-y-mobile', label: 'Section Y (mobile)', value: 64 },
  { name: 'spacing-section-y-desktop', label: 'Section Y (desktop)', value: 112 },
]

function SpacingDoc() {
  return (
    <div className="p-6 space-y-10">
      <section>
        <h2 className="text-2xl font-bold mb-6">Border Radius</h2>
        <div className="flex flex-wrap gap-8">
          {radii.map(({ label, value, cssVar }) => (
            <div key={label} className="flex flex-col items-center gap-2">
              <div
                className="w-24 h-24 bg-pink-500 border-2 border-pink-600"
                style={{ borderRadius: `var(${cssVar})` }}
              />
              <span className="text-sm font-semibold">{label}</span>
              <span className="text-xs font-mono text-gray-500">{value}</span>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-6">Spacing — Section Y</h2>
        <div className="flex gap-8 items-end">
          {spacings.map(({ label, value }) => (
            <div key={label} className="flex flex-col items-center gap-2">
              <div
                className="w-12 bg-purple-500 rounded"
                style={{ height: value }}
              />
              <span className="text-sm font-semibold">{label}</span>
              <span className="text-xs font-mono text-gray-500">{value}px</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

const meta: Meta = {
  title: 'Foundation/Spacing & Radius',
  component: SpacingDoc,
  parameters: { layout: 'fullscreen' },
}
export default meta

type Story = StoryObj
export const RadiusAndSpacing: Story = {}
