import React from 'react'

interface DocHeaderProps {
  layer: 'Foundation' | 'Atoms' | 'Molecules' | 'Organisms' | 'Templates'
  title: string
  description: string
  /** Optional Iconsax icon node */
  icon?: React.ReactNode
}

/**
 * Standardised page header for all doc stories.
 * Shows the layer badge, component name, and a 1–2 sentence description.
 */
export function DocHeader({ layer, title, description, icon }: DocHeaderProps) {
  return (
    <div
      className="px-8 py-10 border-b border-border"
      style={{ background: 'color-mix(in srgb, var(--accent-btn-bg) 5%, var(--bg))' }}
    >
      <div className="flex items-start gap-4">
        {icon && (
          <div
            className="flex-shrink-0 w-10 h-10 rounded-[var(--radius-small)] flex items-center justify-center mt-1"
            style={{ background: 'color-mix(in srgb, var(--accent-btn-bg) 15%, var(--bg))' }}
          >
            <span style={{ color: 'var(--accent-btn-bg)' }}>{icon}</span>
          </div>
        )}
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <span
              className="text-label uppercase tracking-[0.08em] font-semibold"
              style={{ color: 'var(--accent-btn-bg)' }}
            >
              {layer}
            </span>
          </div>
          <h1 className="text-h2 font-bold text-text mb-3">{title}</h1>
          <p className="text-text-main text-text max-w-2xl" style={{ opacity: 0.65 }}>
            {description}
          </p>
        </div>
      </div>
    </div>
  )
}
