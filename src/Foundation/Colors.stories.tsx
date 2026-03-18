import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'

// ─── Primitive groups ────────────────────────────────────────────────────────

const brandNeutral = {
  'dark-900':   '#032524',
  'dark-800':   '#073331',
  'brand-text': '#0b4744',
  'brand-hover':'#093c3a',
  'light-200':  '#f3f3f3',
  'light-100':  '#ffffff',
}

const accentGroups = [
  {
    label: 'Default — Brand baseline',
    accent: 'default',
    description: 'Pink tones used as the brand baseline. Not tied to a specific activity — appears in global UI elements, marketing surfaces, and anywhere no vertical accent applies.',
    primitives: {
      'pink-mist':        '#FFF3F9',
      'pink-vivid-light': '#ffdeef',
      'pink-vivid':       '#ffadd6',
      'pink-500':         '#f59bbb',
      'pink-600':         '#c47c96',
      'pink-accent':      '#fd6c9f',
    },
  },
  {
    label: 'Violet — Électroménager',
    accent: 'violet',
    description: 'Purple tones for the appliance repair vertical.',
    primitives: {
      'purple-500': '#9e8cf8',
      'purple-700': '#543bce',
      'purple-800': '#432fa5',
      'purple-navy':'#180d4d',
    },
  },
  {
    label: 'Yellow — Solaire',
    accent: 'yellow',
    description: 'Yellow tones for the solar energy vertical. Warm and energetic — communicates sun and sustainability.',
    primitives: {
      'yellow-highlight': '#ffde73',
      'yellow-500':       '#ffd800',
      'yellow-hover':     '#e0be00',
      'yellow-600':       '#ccad00',
    },
  },
  {
    label: 'Fuschia — Chauffage',
    accent: 'fuschia',
    description: 'High-saturation pink for the heating vertical.',
    primitives: {
      'fuschia-highlight': '#ff6492',
      'fuschia-text':      '#3a121e',
    },
  },
]

const accentTokens = ['btn-bg', 'btn-text', 'btn-bg-hover', 'btn-text-hover', 'accent-highlight', 'accent-pill-active']

// ─── Sub-components ───────────────────────────────────────────────────────────

function Swatch({ name, value }: { name: string; value: string }) {
  const isLight = parseInt(value.slice(1, 3), 16) > 200
  return (
    <div className="flex flex-col items-start gap-1 min-w-[80px]">
      <div
        className="w-14 h-14 rounded-lg border border-black/10 shadow-sm"
        style={{ backgroundColor: value }}
      />
      <span className="text-xs font-mono leading-tight" style={{ color: '#073331' }}>{name}</span>
      <span className="text-xs" style={{ color: '#6b7280' }}>{value}</span>
    </div>
  )
}

function AccentTokenRow({ accent }: { accent: string }) {
  return (
    <div className="flex flex-wrap gap-3 mt-3">
      {accentTokens.map(token => (
        <div key={token} className="flex flex-col items-start gap-1 min-w-[80px]">
          <div
            data-accent={accent}
            className="w-14 h-14 rounded-lg border border-black/10 shadow-sm"
            style={{ backgroundColor: `var(--accent-${token})` }}
          />
          <span className="text-xs font-mono leading-tight" style={{ color: '#073331' }}>{token}</span>
        </div>
      ))}
    </div>
  )
}

function AccentButtonPreview({ accent }: { accent: string }) {
  return (
    <div data-accent={accent} className="flex items-center gap-3 mt-4 flex-wrap">
      <button
        className="px-6 py-3 rounded-full text-sm font-medium"
        style={{ backgroundColor: 'var(--accent-btn-bg)', color: 'var(--accent-btn-text)' }}
      >
        Default
      </button>
      <button
        className="px-6 py-3 rounded-full text-sm font-medium"
        style={{ backgroundColor: 'var(--accent-btn-bg-hover)', color: 'var(--accent-btn-text-hover)' }}
      >
        Hover
      </button>
      <div
        className="px-4 py-1.5 rounded-full text-xs font-medium"
        style={{ backgroundColor: 'var(--accent-accent-highlight)', color: 'var(--accent-accent-text, #073331)' }}
      >
        Highlight pill
      </div>
    </div>
  )
}

// ─── Main doc component ───────────────────────────────────────────────────────

function ColorsDoc() {
  return (
    <div className="p-8 space-y-14 max-w-5xl" style={{ color: '#073331' }}>

      {/* Brand & Neutral */}
      <section>
        <h2 className="text-xl font-bold mb-1">Brand & Neutral</h2>
        <p className="text-sm mb-4" style={{ color: '#6b7280' }}>
          Core dark greens and whites shared across all themes and verticals.
        </p>
        <div className="flex flex-wrap gap-5">
          {Object.entries(brandNeutral).map(([name, value]) => (
            <Swatch key={name} name={name} value={value} />
          ))}
        </div>
      </section>

      <hr style={{ borderColor: '#e5e7eb' }} />

      {/* Accent groups */}
      {accentGroups.map(({ label, accent, description, primitives }) => (
        <section key={accent}>
          <h2 className="text-xl font-bold mb-1">{label}</h2>
          <p className="text-sm mb-5" style={{ color: '#6b7280' }}>{description}</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Primitives */}
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: '#9ca3af' }}>
                Primitives
              </h3>
              <div className="flex flex-wrap gap-4">
                {Object.entries(primitives).map(([name, value]) => (
                  <Swatch key={name} name={name} value={value} />
                ))}
              </div>
            </div>

            {/* Accent tokens + preview */}
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: '#9ca3af' }}>
                Accent Tokens
              </h3>
              <AccentTokenRow accent={accent} />
              <AccentButtonPreview accent={accent} />
            </div>
          </div>
        </section>
      ))}
    </div>
  )
}

// ─── Story ────────────────────────────────────────────────────────────────────

const meta: Meta = {
  title: 'Foundation/Colors',
  component: ColorsDoc,
  parameters: { layout: 'fullscreen' },
}
export default meta

type Story = StoryObj
export const Overview: Story = {}
