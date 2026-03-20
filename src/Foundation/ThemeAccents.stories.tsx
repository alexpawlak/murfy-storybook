import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'

const themes = ['light', 'dark', 'light-pink', 'pink-mist', 'pink-vivid'] as const
const accents = ['default', 'violet', 'yellow', 'fuschia'] as const

function ThemeAccentsGrid() {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Theme × Accent Matrix</h2>
      <div
        className="mb-6 rounded-card p-5"
        style={{ backgroundColor: 'var(--bg-2)', boxShadow: '0 2px 16px rgba(0,0,0,0.06)' }}
      >
        <p className="text-text-small text-text-default" style={{ opacity: 0.78 }}>
          Use this matrix to preview how tokens react across themes and accents. It does <strong>not</strong> replace
          usage guidance. A combination can be technically available here and still be a poor accessibility or hierarchy
          choice in a real component. Use <strong>Foundation/Accessibility Guidelines</strong> and the component stories
          to decide what is approved.
        </p>
      </div>
      <div className="overflow-x-auto">
        <table className="border-collapse w-full">
          <thead>
            <tr>
              <th className="p-2 text-left text-sm font-semibold text-gray-500">Theme / Accent</th>
              {accents.map(accent => (
                <th key={accent} className="p-2 text-center text-sm font-semibold text-gray-500 capitalize">{accent}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {themes.map(theme => (
              <tr key={theme}>
                <td className="p-2 text-sm font-semibold text-gray-500 capitalize">{theme}</td>
                {accents.map(accent => (
                  <td key={accent} className="p-2">
                    <div
                      data-theme={theme}
                      data-accent={accent}
                      className="p-3 rounded-card flex flex-col gap-2 min-w-[140px]"
                      style={{ backgroundColor: 'var(--bg)' }}
                    >
                      <div style={{ color: 'var(--text)', fontSize: '11px', fontWeight: 600 }}>
                        {theme} / {accent}
                      </div>
                      <button
                        className="px-3 py-1.5 rounded-pill text-xs font-bold transition-colors"
                        style={{
                          backgroundColor: 'var(--btn-bg)',
                          color: 'var(--btn-text)',
                        }}
                      >
                        Primary
                      </button>
                      <button
                        className="px-3 py-1.5 rounded-pill text-xs font-bold border transition-colors"
                        style={{
                          backgroundColor: 'transparent',
                          color: 'var(--btn2-text)',
                          borderColor: 'var(--btn2-border)',
                        }}
                      >
                        Secondary
                      </button>
                      <div
                        className="w-full h-2 rounded-full"
                        style={{ backgroundColor: 'var(--accent-accent-highlight)' }}
                      />
                    </div>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

const meta: Meta = {
  title: 'Foundation/Theme × Accent Matrix',
  component: ThemeAccentsGrid,
  parameters: { layout: 'fullscreen' },
}
export default meta

type Story = StoryObj
export const Matrix: Story = {}
