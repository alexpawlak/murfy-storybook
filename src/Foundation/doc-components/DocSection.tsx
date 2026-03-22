import React from 'react'

interface DocSectionProps {
  /** Section heading label — rendered as UPPERCASE label style */
  label: string
  /** Optional one-line subtitle below the label */
  subtitle?: string
  children: React.ReactNode
}

/**
 * Labelled section wrapper used on every doc page.
 * Enforces visual consistency between sections: uppercase label heading + optional subtitle.
 */
export function DocSection({ label, subtitle, children }: DocSectionProps) {
  return (
    <section className="py-10 border-t border-border first:border-t-0 first:pt-0">
      <div className="mb-6">
        <p
          className="text-label uppercase tracking-[0.08em] font-semibold mb-1"
          style={{ color: 'var(--text)', opacity: 0.45 }}
        >
          {label}
        </p>
        {subtitle && (
          <p className="text-text-small text-text max-w-2xl" style={{ opacity: 0.65 }}>
            {subtitle}
          </p>
        )}
      </div>
      {children}
    </section>
  )
}
