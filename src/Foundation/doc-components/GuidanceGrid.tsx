import React from 'react'

export interface GuidanceItem {
  rule: string
  /** Plain-language explanation of why the rule exists */
  rationale?: string
  /** WCAG criterion badge text, e.g. "WCAG 2.1 AA 4.5:1" */
  wcag?: string
}

interface GuidanceGridProps {
  dos: GuidanceItem[]
  donts: GuidanceItem[]
}

function GuidanceBadge({ text, tone }: { text: string; tone: 'do' | 'dont' }) {
  const isDo = tone === 'do'
  return (
    <span
      className="inline-block rounded-[var(--radius-pill)] px-2.5 py-0.5 text-label uppercase tracking-[0.08em] font-semibold"
      style={{
        background: isDo
          ? 'color-mix(in srgb, #22c55e 15%, transparent)'
          : 'color-mix(in srgb, #ef4444 12%, transparent)',
        color: isDo ? '#15803d' : '#b91c1c',
      }}
    >
      {isDo ? '✓ Do' : '✕ Don\'t'}
    </span>
  )
}

function WcagBadge({ text }: { text: string }) {
  return (
    <code
      className="text-label font-mono px-2 py-0.5 rounded-[var(--radius-small)]"
      style={{
        background: 'color-mix(in srgb, var(--accent-btn-bg) 10%, transparent)',
        color: 'var(--accent-btn-bg)',
      }}
    >
      {text}
    </code>
  )
}

function GuidanceCard({ item, tone }: { item: GuidanceItem; tone: 'do' | 'dont' }) {
  return (
    <div
      className="rounded-[var(--radius-card)] border px-5 py-4 flex flex-col gap-2"
      style={{
        borderColor: tone === 'do'
          ? 'color-mix(in srgb, #22c55e 30%, var(--border))'
          : 'color-mix(in srgb, #ef4444 25%, var(--border))',
        background: tone === 'do'
          ? 'color-mix(in srgb, #22c55e 4%, var(--bg))'
          : 'color-mix(in srgb, #ef4444 4%, var(--bg))',
      }}
    >
      <GuidanceBadge tone={tone} text="" />
      <p className="text-text-small-semibold text-text">{item.rule}</p>
      {item.rationale && (
        <p className="text-text-xsmall text-text" style={{ opacity: 0.6 }}>
          {item.rationale}
        </p>
      )}
      {item.wcag && <WcagBadge text={item.wcag} />}
    </div>
  )
}

/**
 * Two-column Do / Don't grid.
 * Each item accepts a rule, an optional rationale (the *why*), and an optional WCAG badge.
 */
export function GuidanceGrid({ dos, donts }: GuidanceGridProps) {
  const maxRows = Math.max(dos.length, donts.length)
  const rows = Array.from({ length: maxRows }, (_, i) => ({ do: dos[i], dont: donts[i] }))

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="flex flex-col gap-3">
        {rows.map((row, i) => row.do && <GuidanceCard key={i} item={row.do} tone="do" />)}
      </div>
      <div className="flex flex-col gap-3">
        {rows.map((row, i) => row.dont && <GuidanceCard key={i} item={row.dont} tone="dont" />)}
      </div>
    </div>
  )
}
