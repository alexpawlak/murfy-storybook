import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'

const primitives = {
  'pink-500': '#f59bbb',
  'pink-accent': '#fd6c9f',
  'pink-600': '#c47c96',
  'yellow-500': '#ffd800',
  'yellow-600': '#ccad00',
  'dark-800': '#073331',
  'dark-900': '#032524',
  'brand-text': '#0b4744',
  'light-100': '#ffffff',
  'light-200': '#f3f3f3',
  'purple-navy': '#180d4d',
  'purple-500': '#9e8cf8',
  'purple-700': '#543bce',
  'purple-800': '#432fa5',
  'pink-vivid': '#ffadd6',
  'pink-vivid-light': '#ffdeef',
  'pink-mist': '#FFF3F9',
  'fuschia-highlight': '#ff6492',
  'fuschia-text': '#3a121e',
  'yellow-highlight': '#ffde73',
  'yellow-hover': '#e0be00',
  'brand-hover': '#093c3a',
}

const themes = ['light', 'dark', 'light-pink', 'pink-mist', 'pink-vivid'] as const
const semanticTokens = ['bg', 'bg-2', 'bg-3', 'text', 'text-2', 'border', 'heading-accent', 'btn-bg', 'btn-text', 'btn2-bg', 'btn2-text', 'btn2-border']

function Swatch({ name, value }: { name: string; value: string }) {
  return (
    <div className="flex flex-col items-start gap-1">
      <div
        className="w-16 h-16 rounded-card border border-gray-200 shadow-sm"
        style={{ backgroundColor: value }}
      />
      <span className="text-xs font-mono text-gray-700">{name}</span>
      <span className="text-xs text-gray-400">{value}</span>
    </div>
  )
}

function ColorsDoc() {
  return (
    <div className="p-6 space-y-10">
      <section>
        <h2 className="text-2xl font-bold mb-4">Primitive Colors</h2>
        <div className="flex flex-wrap gap-4">
          {Object.entries(primitives).map(([name, value]) => (
            <Swatch key={name} name={name} value={value} />
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">Semantic Tokens by Theme</h2>
        <div className="overflow-x-auto">
          <table className="text-sm border-collapse w-full">
            <thead>
              <tr>
                <th className="text-left p-2 border border-gray-200 bg-gray-50">Token</th>
                {themes.map(t => (
                  <th key={t} className="text-left p-2 border border-gray-200 bg-gray-50 capitalize">{t}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {semanticTokens.map(token => (
                <tr key={token}>
                  <td className="p-2 border border-gray-200 font-mono text-xs">{token}</td>
                  {themes.map(theme => (
                    <td key={theme} className="p-2 border border-gray-200">
                      <div
                        data-theme={theme}
                        className="w-8 h-8 rounded border border-gray-200 inline-block"
                        style={{ backgroundColor: `var(--${token})` }}
                      />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )
}

const meta: Meta = {
  title: 'Foundation/Colors',
  component: ColorsDoc,
  parameters: { layout: 'fullscreen' },
}
export default meta

type Story = StoryObj
export const Primitives: Story = {}
