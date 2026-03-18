import React from 'react'

export interface Vertical {
  id: string
  label: string
  accent: 'violet' | 'fuschia' | 'yellow'
}

export const DEFAULT_VERTICALS: Vertical[] = [
  { id: 'electromenager', label: 'Électroménager', accent: 'fuschia' },
  { id: 'chauffage', label: 'Chauffage', accent: 'violet' },
  { id: 'solaire', label: 'Solaire', accent: 'yellow' },
]

export interface VerticalSelectorProps {
  verticals?: Vertical[]
  activeId?: string
  onChange?: (id: string) => void
}

export function VerticalSelector({
  verticals = DEFAULT_VERTICALS,
  activeId,
  onChange,
}: VerticalSelectorProps) {
  const [active, setActive] = React.useState(activeId ?? verticals[0]?.id)

  React.useEffect(() => {
    if (activeId !== undefined) setActive(activeId)
  }, [activeId])

  const handleClick = (id: string) => {
    setActive(id)
    onChange?.(id)
  }

  return (
    <div className="flex items-center justify-center gap-2">
      {verticals.map(v => {
        const isActive = v.id === active
        return (
          <div
            key={v.id}
            data-accent={v.accent}
            className="inline-block"
          >
            <button
              onClick={() => handleClick(v.id)}
              className="px-4 py-2 rounded-pill border font-semibold uppercase tracking-widest transition-all whitespace-nowrap"
              style={{
                letterSpacing: '0.08em',
                fontSize: 'var(--font-size-label)',
                backgroundColor: isActive ? 'var(--accent-btn-bg)' : 'transparent',
                color: isActive ? 'var(--accent-btn-text)' : 'var(--text)',
                borderColor: isActive ? 'var(--accent-btn-bg)' : 'var(--border)',
              }}
            >
              {v.label}
            </button>
          </div>
        )
      })}
    </div>
  )
}
