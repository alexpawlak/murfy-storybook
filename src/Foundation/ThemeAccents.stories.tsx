import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { DocHeader, DocSection, GuidanceGrid, AccessibilityNote } from './doc-components'

const themes = ['light', 'dark', 'light-pink', 'pink-mist', 'pink-vivid'] as const
const accents = ['default', 'violet', 'yellow', 'fuschia'] as const

// ─── Matrix grid ──────────────────────────────────────────────────────────────

function MatrixCell({ theme, accent }: { theme: string; accent: string }) {
  return (
    <div
      data-theme={theme}
      data-accent={accent}
      className="p-3 rounded-[var(--radius-card)] flex flex-col gap-2 min-w-[140px]"
      style={{ backgroundColor: 'var(--bg)' }}
    >
      <div style={{ color: 'var(--text)', fontSize: '11px', fontWeight: 600, opacity: 0.7 }}>
        {theme} / {accent}
      </div>
      <button
        className="px-3 py-1.5 rounded-[var(--radius-pill)] text-label font-bold"
        style={{ backgroundColor: 'var(--btn-bg)', color: 'var(--btn-text)' }}
      >
        Primary
      </button>
      <button
        className="px-3 py-1.5 rounded-[var(--radius-pill)] text-label font-bold border"
        style={{ backgroundColor: 'transparent', color: 'var(--btn2-text)', borderColor: 'var(--btn2-border)' }}
      >
        Secondary
      </button>
      <div
        className="w-full h-2 rounded-full"
        style={{ backgroundColor: 'var(--accent-accent-highlight)' }}
      />
    </div>
  )
}

function ThemeAccentsGrid() {
  return (
    <div className="min-h-screen" style={{ background: 'var(--bg)' }}>
      <DocHeader
        layer="Foundation"
        title="Theme × Accent Matrix"
        description="The Murfy design system supports 5 themes × 4 accents — 20 combinations in total. Themes control the global surface (light/dark/tinted), accents control the vertical identity color. Every component adapts automatically through CSS variables."
      />

      <div className="px-8 py-12 max-w-5xl">

        {/* ── Why the system exists ─────────────────────────────────────── */}
        <DocSection
          label="Why this system exists"
          subtitle="The theme × accent architecture lets Murfy maintain a single component codebase that serves three different business verticals without any hardcoded per-vertical code."
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              {
                icon: '🎨',
                title: 'Theme = global surface',
                body: 'Themes control backgrounds, text colors, and border colors. Light/dark are standard display modes. Pink-mist and light-pink are brand expressions for marketing surfaces.',
              },
              {
                icon: '⚡',
                title: 'Accent = vertical identity',
                body: 'Accents swap the brand action color: default (pink) for general Murfy, violet for électroménager, yellow for solaire, fuschia for chauffage. One CSS variable swap changes the entire vertical\'s identity.',
              },
              {
                icon: '♿',
                title: 'Accessibility tradeoff',
                body: 'Each accent was validated for contrast at WCAG AA. Yellow is the most complex: it needs dark text instead of white, so its btn-text token differs from the others. Always verify before adding new combinations.',
              },
            ].map(({ icon, title, body }) => (
              <div key={title} className="rounded-[var(--radius-card)] border border-border px-5 py-4">
                <p className="text-h5 mb-2">{icon}</p>
                <p className="text-text-small-semibold text-text mb-1">{title}</p>
                <p className="text-text-xsmall text-text" style={{ opacity: 0.65 }}>{body}</p>
              </div>
            ))}
          </div>
        </DocSection>

        {/* ── Matrix ────────────────────────────────────────────────────── */}
        <DocSection
          label="Full Matrix"
          subtitle="Every cell is a live preview — CSS variables resolve in real-time. This is a reference, not an approval list. Use Foundation/Accessibility Guidelines to validate specific color pairs."
        >
          <div className="overflow-x-auto">
            <table className="border-collapse w-full">
              <thead>
                <tr>
                  <th className="p-2 text-left text-label font-semibold uppercase tracking-[0.08em] text-text" style={{ opacity: 0.4 }}>Theme / Accent</th>
                  {accents.map(accent => (
                    <th key={accent} className="p-2 text-center text-label font-semibold uppercase tracking-[0.08em] text-text capitalize" style={{ opacity: 0.4 }}>{accent}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {themes.map(theme => (
                  <tr key={theme}>
                    <td className="p-2 text-text-xsmall font-semibold text-text capitalize" style={{ opacity: 0.6 }}>{theme}</td>
                    {accents.map(accent => (
                      <td key={accent} className="p-2">
                        <MatrixCell theme={theme} accent={accent} />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </DocSection>

        {/* ── Best Practices ────────────────────────────────────────────── */}
        <DocSection
          label="Best Practices"
          subtitle="How to navigate the 20-combination matrix without creating accessibility or brand consistency issues."
        >
          <GuidanceGrid
            dos={[
              {
                rule: 'Test components across all 4 accents when building anything new.',
                rationale: 'A component that looks great with the default pink accent may be unreadable with yellow (light background) or fuschia (narrow contrast margin). Always run the accent switcher.',
              },
              {
                rule: 'Use the Storybook toolbar to preview themes and accents — it changes CSS vars globally.',
                rationale: 'The toolbar applies data-theme and data-accent attributes to the root wrapper, which triggers the correct CSS variable cascade. This is exactly how the live site switches contexts.',
              },
              {
                rule: 'For yellow accent: always verify that btn-text uses dark (#032524) not white.',
                rationale: 'Yellow (luminance ~0.93) fails contrast when paired with white text. The yellow accent tokens are pre-configured with dark text, but custom implementations that override btn-text must be re-verified.',
                wcag: 'WCAG 2.1 AA 1.4.3',
              },
            ]}
            donts={[
              {
                rule: 'Do not use the matrix as a sign-off for any color combination.',
                rationale: 'The matrix shows all 20 technically-available combinations. Not all are recommended for production. Some theme+accent pairs have low contrast on specific components. Foundation/Accessibility Guidelines is the authoritative source.',
              },
              {
                rule: 'Do not hardcode a theme or accent inside a component.',
                rationale: 'Components must be theme-agnostic. Hardcoding data-theme="light" or a specific CSS variable value inside a component breaks it for all other theme contexts.',
              },
            ]}
          />
        </DocSection>

        {/* ── Accessibility ─────────────────────────────────────────────── */}
        <DocSection label="Accessibility & WCAG">
          <div className="flex flex-col gap-4">
            <AccessibilityNote
              criterion={['WCAG 2.1 AA 1.4.3', 'WCAG 2.1 AA 1.4.11']}
              requirement="4.5:1 for text · 3:1 for UI components and graphical objects"
              why="Every theme × accent combination must maintain minimum contrast ratios — not just the default. This means testing interactive components (buttons, form fields, focus indicators) in every accent before shipping. The matrix view is the fastest way to spot a failing combination visually — any cell where the button text looks washed out is a candidate for review."
              href="https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum.html"
            />
          </div>
        </DocSection>

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
