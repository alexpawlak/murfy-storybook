import React from 'react'

export interface AccessibilityNoteProps {
  /**
   * The WCAG criterion identifier, e.g. "WCAG 2.1 AA 1.4.3"
   * Can be an array for multiple criteria.
   */
  criterion: string | string[]
  /** Short requirement statement, e.g. "4.5:1 contrast ratio for normal text" */
  requirement: string
  /** Plain-language explanation aimed at non-developer designers */
  why: string
  /** Optional link to WCAG documentation */
  href?: string
}

/**
 * Tinted callout block for WCAG accessibility notes.
 * Designed for non-developer readers (UX/UI designers, brand team).
 */
export function AccessibilityNote({ criterion, requirement, why, href }: AccessibilityNoteProps) {
  const criteria = Array.isArray(criterion) ? criterion : [criterion]

  return (
    <div
      className="rounded-[var(--radius-card)] border px-6 py-5 flex gap-4"
      style={{
        background: 'color-mix(in srgb, var(--accent-btn-bg) 8%, var(--bg))',
        borderColor: 'color-mix(in srgb, var(--accent-btn-bg) 25%, var(--border))',
      }}
    >
      {/* Icon */}
      <div
        className="flex-shrink-0 w-8 h-8 rounded-[var(--radius-small)] flex items-center justify-center text-text-main-semibold"
        style={{
          background: 'color-mix(in srgb, var(--accent-btn-bg) 18%, var(--bg))',
          color: 'var(--accent-btn-bg)',
        }}
      >
        ♿
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        {/* Criterion badges */}
        <div className="flex flex-wrap gap-2 mb-2">
          {criteria.map((c) => (
            <code
              key={c}
              className="text-label font-mono px-2 py-0.5 rounded-[var(--radius-small)]"
              style={{
                background: 'color-mix(in srgb, var(--accent-btn-bg) 15%, var(--bg))',
                color: 'var(--accent-btn-bg)',
              }}
            >
              {c}
            </code>
          ))}
        </div>

        {/* Requirement */}
        <p className="text-text-small-semibold text-text mb-1">{requirement}</p>

        {/* Why */}
        <p className="text-text-xsmall text-text" style={{ opacity: 0.7 }}>
          {why}
        </p>

        {/* Optional link */}
        {href && (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 inline-block text-text-xsmall underline"
            style={{ color: 'var(--accent-btn-bg)' }}
          >
            WCAG reference ↗
          </a>
        )}
      </div>
    </div>
  )
}
