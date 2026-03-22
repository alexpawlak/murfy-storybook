import React from 'react'

type Rating = 'AAA' | 'AA' | 'AA ⚠' | 'Fail'

interface ContrastBadgeProps {
  /** Background color — hex, rgb, or CSS variable reference label */
  bg: string
  /** Actual background color for the swatch (hex/rgb) */
  bgColor: string
  /** Text/foreground color label */
  fg: string
  /** Actual foreground color for the swatch */
  fgColor: string
  /** Calculated contrast ratio, e.g. "4.5:1" */
  ratio: string
  /** WCAG rating */
  rating: Rating
  /** Optional context label, e.g. "Primary button, light theme" */
  context?: string
}

const ratingStyle: Record<Rating, { bg: string; color: string }> = {
  AAA:      { bg: '#d1fae5', color: '#065f46' },
  AA:       { bg: '#dbeafe', color: '#1e40af' },
  'AA ⚠':  { bg: '#fff0c0', color: '#7a4a00' },
  Fail:     { bg: '#fee2e2', color: '#991b1b' },
}

/**
 * Color pair swatch with contrast ratio and pass/fail badge.
 * Used on Colors and Typography pages.
 */
export function ContrastBadge({
  bg, bgColor, fg, fgColor, ratio, rating, context,
}: ContrastBadgeProps) {
  const { bg: badgeBg, color: badgeColor } = ratingStyle[rating]

  return (
    <div
      className="rounded-[var(--radius-card)] border border-border overflow-hidden"
      style={{ background: 'var(--bg)' }}
    >
      {/* Preview swatch */}
      <div
        className="px-4 py-5 flex items-center justify-center"
        style={{ background: bgColor }}
      >
        <span
          className="text-text-main-semibold"
          style={{ color: fgColor }}
        >
          Aa
        </span>
      </div>

      {/* Info row */}
      <div className="px-4 py-3 flex flex-col gap-1">
        {context && (
          <p className="text-text-xsmall text-text" style={{ opacity: 0.5 }}>
            {context}
          </p>
        )}
        <div className="flex items-center gap-2 flex-wrap">
          {/* Swatches */}
          <span className="flex items-center gap-1">
            <span
              className="inline-block w-3 h-3 rounded-sm border border-border"
              style={{ background: bgColor }}
            />
            <code className="text-label font-mono" style={{ color: 'var(--text)', opacity: 0.6 }}>{bg}</code>
          </span>
          <span className="text-text-xsmall text-text" style={{ opacity: 0.4 }}>on</span>
          <span className="flex items-center gap-1">
            <span
              className="inline-block w-3 h-3 rounded-sm border border-border"
              style={{ background: fgColor }}
            />
            <code className="text-label font-mono" style={{ color: 'var(--text)', opacity: 0.6 }}>{fg}</code>
          </span>
        </div>
        <div className="flex items-center gap-2 mt-1">
          <span className="text-text-small-semibold text-text">{ratio}</span>
          <span
            className="inline-block rounded-[var(--radius-pill)] px-2 py-0.5 text-label uppercase tracking-[0.08em]"
            style={{ background: badgeBg, color: badgeColor }}
          >
            {rating}
          </span>
        </div>
      </div>
    </div>
  )
}
