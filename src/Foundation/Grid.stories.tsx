import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'

const GRID_GUIDELINES = [
  {
    title: 'Desktop master grid',
    body: 'Use 12 columns as the default composition grid for desktop surfaces. It gives enough flexibility for asymmetrical layouts, cards, forms, and editorial content without becoming noisy.',
  },
  {
    title: '8px spacing rhythm',
    body: 'Keep spacing decisions on an 8px baseline. It reduces one-off values, makes interfaces feel calmer, and keeps implementation predictable across atoms, molecules, and sections.',
  },
  {
    title: 'Responsive simplification',
    body: 'Keep the same logic across breakpoints, but reduce column count as screens shrink. A practical system is 4 columns on mobile, 8 on tablet, and 12 on desktop.',
  },
]

const BREAKPOINTS = [
  { label: 'Mobile', columns: 4, gutter: '16px', margin: '16px', note: 'Stack early, preserve rhythm, avoid micro-columns.' },
  { label: 'Tablet', columns: 8, gutter: '24px', margin: '24px', note: 'Useful for split layouts and medium-density content.' },
  { label: 'Desktop', columns: 12, gutter: '24px', margin: '32px', note: 'Primary reference grid for landing pages and documentation.' },
]

const RHYTHM_STEPS = [8, 16, 24, 32, 40, 48, 64, 80, 96]

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-label font-semibold uppercase tracking-[0.08em]" style={{ color: 'var(--text)', opacity: 0.55 }}>
      {children}
    </p>
  )
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-h4 font-bold" style={{ color: 'var(--text)' }}>
      {children}
    </h2>
  )
}

function SectionBody({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-text-small" style={{ color: 'var(--text)', opacity: 0.75 }}>
      {children}
    </p>
  )
}

function DocCard({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={`rounded-card border p-6 ${className}`.trim()}
      style={{ backgroundColor: 'var(--bg)', borderColor: 'var(--border)' }}
    >
      {children}
    </div>
  )
}

function ColumnGrid({
  columns,
  title,
  subtitle,
}: {
  columns: number
  title: string
  subtitle: string
}) {
  return (
    <DocCard className="flex flex-col gap-5">
      <div className="flex flex-col gap-2">
        <Eyebrow>{title}</Eyebrow>
        <SectionBody>{subtitle}</SectionBody>
      </div>

      <div
        className="grid gap-2"
        style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }}
      >
        {Array.from({ length: columns }).map((_, index) => (
          <div
            key={index}
            className="flex h-24 items-end justify-center rounded-sm border pb-2"
            style={{ backgroundColor: 'var(--bg-2)', borderColor: 'var(--border)' }}
          >
            <span
              className="text-text-xsmall-semibold"
              style={{ color: 'var(--text)', opacity: 0.65, fontFamily: 'monospace' }}
            >
              {index + 1}
            </span>
          </div>
        ))}
      </div>
    </DocCard>
  )
}

function SpanExample({
  title,
  items,
}: {
  title: string
  items: Array<{ label: string; span: number }>
}) {
  return (
    <DocCard className="flex flex-col gap-5">
      <div className="flex flex-col gap-2">
        <Eyebrow>{title}</Eyebrow>
        <SectionBody>
          Example spans on a 12-column desktop grid. Use these as layout references, not rigid templates.
        </SectionBody>
      </div>

      <div className="grid grid-cols-12 gap-2">
        {items.map((item) => (
          <div
            key={item.label}
            className="rounded-sm px-3 py-4"
            style={{
              gridColumn: `span ${item.span} / span ${item.span}`,
              backgroundColor: 'var(--btn-bg)',
              color: 'var(--btn-text)',
            }}
          >
            <div className="text-label font-semibold uppercase tracking-[0.08em]">
              {item.span}/12
            </div>
            <div className="mt-1 text-text-xsmall-semibold">{item.label}</div>
          </div>
        ))}
      </div>
    </DocCard>
  )
}

function RhythmBar({ value }: { value: number }) {
  return (
    <div className="flex flex-col items-center gap-3">
      <div
        className="w-10 rounded-pill"
        style={{
          height: Math.max(value, 8),
          backgroundColor: 'var(--heading-accent)',
        }}
      />
      <div className="text-center">
        <div className="text-text-xsmall-semibold" style={{ color: 'var(--text)' }}>
          {value}px
        </div>
        <div
          className="text-label font-semibold uppercase tracking-[0.08em]"
          style={{ color: 'var(--text)', opacity: 0.5, fontFamily: 'monospace' }}
        >
          {value / 8}x
        </div>
      </div>
    </div>
  )
}

function RuleList({ items }: { items: string[] }) {
  return (
    <ul className="flex flex-col gap-3">
      {items.map((item) => (
        <li key={item} className="flex gap-3">
          <span className="mt-1 h-2.5 w-2.5 rounded-pill" style={{ backgroundColor: 'var(--btn-bg)' }} />
          <span className="text-text-small" style={{ color: 'var(--text)', opacity: 0.8 }}>
            {item}
          </span>
        </li>
      ))}
    </ul>
  )
}

function GridFoundationPage() {
  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-4 py-8 md:px-8">
      <section
        className="rounded-card border p-8 md:p-10"
        style={{ backgroundColor: 'var(--bg-2)', borderColor: 'var(--border)' }}
      >
        <div className="max-w-3xl">
          <Eyebrow>Foundation</Eyebrow>
          <h1 className="mt-3 text-h2 font-bold" style={{ color: 'var(--text)' }}>
            Layout grid
          </h1>
          <p className="mt-4 text-text-main" style={{ color: 'var(--text)', opacity: 0.78 }}>
            Murfy layouts should feel structured, calm, and easy to scan. The recommended system is a
            responsive grid with a <strong>12-column desktop master grid</strong> and an{' '}
            <strong>8px spacing rhythm</strong> used across sections, cards, forms, and content blocks.
          </p>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {GRID_GUIDELINES.map((item) => (
            <div
              key={item.title}
              className="rounded-card border p-5"
              style={{ backgroundColor: 'var(--bg)', borderColor: 'var(--border)' }}
            >
              <h3 className="text-h6 font-bold" style={{ color: 'var(--text)' }}>
                {item.title}
              </h3>
              <p className="mt-2 text-text-small" style={{ color: 'var(--text)', opacity: 0.72 }}>
                {item.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <ColumnGrid
          columns={12}
          title="Desktop grid anatomy"
          subtitle="Twelve columns are the main desktop reference. This is where landing pages, split heroes, card rows, and editorial surfaces should snap."
        />

        <DocCard className="flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <Eyebrow>Recommended behavior</Eyebrow>
            <SectionTitle>Column count changes, rhythm stays consistent</SectionTitle>
          </div>

          <div className="flex flex-col gap-4">
            {BREAKPOINTS.map((item) => (
              <div
                key={item.label}
                className="rounded-card border p-4"
                style={{ backgroundColor: 'var(--bg-2)', borderColor: 'var(--border)' }}
              >
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <div className="text-text-small-semibold" style={{ color: 'var(--text)' }}>
                      {item.label}
                    </div>
                    <div className="text-text-xsmall" style={{ color: 'var(--text)', opacity: 0.65 }}>
                      {item.note}
                    </div>
                  </div>
                  <div
                    className="rounded-pill px-3 py-1"
                    style={{ backgroundColor: 'var(--bg)', color: 'var(--text)' }}
                  >
                    <span className="text-text-xsmall-semibold">{item.columns} cols</span>
                  </div>
                </div>

                <div className="mt-4 grid grid-cols-3 gap-2">
                  {[
                    ['Gutter', item.gutter],
                    ['Margin', item.margin],
                    ['Rhythm', '8px'],
                  ].map(([label, value]) => (
                    <div
                      key={label}
                      className="rounded-sm border p-3"
                      style={{ backgroundColor: 'var(--bg)', borderColor: 'var(--border)' }}
                    >
                      <div
                        className="text-label font-semibold uppercase tracking-[0.08em]"
                        style={{ color: 'var(--text)', opacity: 0.5 }}
                      >
                        {label}
                      </div>
                      <div className="mt-1 text-text-small-semibold" style={{ color: 'var(--text)' }}>
                        {value}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </DocCard>
      </section>

      <section className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
        <DocCard className="flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <Eyebrow>Spacing rhythm</Eyebrow>
            <SectionTitle>Default to multiples of 8</SectionTitle>
            <SectionBody>
              Use 8px as the smallest repeatable unit for spacing. This keeps components aligned and
              makes implementation decisions predictable across design and code.
            </SectionBody>
          </div>

          <div className="flex flex-wrap items-end gap-x-5 gap-y-8">
            {RHYTHM_STEPS.map((value) => (
              <RhythmBar key={value} value={value} />
            ))}
          </div>
        </DocCard>

        <DocCard className="flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <Eyebrow>How to use it</Eyebrow>
            <SectionTitle>Where the rhythm should appear</SectionTitle>
          </div>

          <RuleList
            items={[
              'Component padding, stack gaps, and card spacing should land on 8px multiples.',
              'Section spacing can scale up, but should still resolve to the same rhythm: 32, 48, 64, 80, 96, etc.',
              'Avoid mixing 10px / 14px / 18px spacing patterns unless there is a strong visual reason.',
              'Use tighter spacing inside dense UI, and larger multiples for page-level breathing room.',
            ]}
          />
        </DocCard>
      </section>

      <section className="grid gap-6">
        <SpanExample
          title="Common desktop spans"
          items={[
            { label: 'Feature hero copy', span: 7 },
            { label: 'Illustration / visual', span: 5 },
            { label: 'Service cards', span: 4 },
            { label: 'Service cards', span: 4 },
            { label: 'Service cards', span: 4 },
          ]}
        />

        <div className="grid gap-6 lg:grid-cols-2">
          <SpanExample
            title="Readable content widths"
            items={[
              { label: 'Article or FAQ content', span: 7 },
              { label: 'Secondary aside / summary', span: 5 },
            ]}
          />

          <DocCard className="flex flex-col gap-5">
            <div className="flex flex-col gap-2">
              <Eyebrow>Best-practice rules</Eyebrow>
              <SectionTitle>Do / Don’t</SectionTitle>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div
                className="rounded-card border p-5"
                style={{ backgroundColor: 'var(--bg-2)', borderColor: 'var(--border)' }}
              >
                <div className="text-text-small-semibold" style={{ color: 'var(--text)' }}>
                  Do
                </div>
                <RuleList
                  items={[
                    'Align major content edges to the grid.',
                    'Keep repeated cards on consistent spans.',
                    'Use the same spacing rhythm inside and outside components.',
                  ]}
                />
              </div>

              <div
                className="rounded-card border p-5"
                style={{ backgroundColor: 'var(--bg-2)', borderColor: 'var(--border)' }}
              >
                <div className="text-text-small-semibold" style={{ color: 'var(--text)' }}>
                  Don’t
                </div>
                <RuleList
                  items={[
                    'Mix arbitrary widths that break column alignment.',
                    'Center everything when a structured asymmetric layout is stronger.',
                    'Introduce one-off spacing values that fight the 8px rhythm.',
                  ]}
                />
              </div>
            </div>
          </DocCard>
        </div>
      </section>
    </div>
  )
}

const meta: Meta = {
  title: 'Foundation/Grid',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Recommended Murfy layout system: a 12-column desktop grid with an 8px spacing rhythm and responsive simplification for smaller screens.',
      },
    },
  },
}

export default meta

type Story = StoryObj

export const Overview: Story = {
  render: () => <GridFoundationPage />,
}
