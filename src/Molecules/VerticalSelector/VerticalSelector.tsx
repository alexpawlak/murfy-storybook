import React from 'react'
import { Tag } from '../../Atoms/Tag/Tag'
import type { TagVariant } from '../../Atoms/Tag/Tag'

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
        const variant: TagVariant = isActive ? v.accent : 'outline'
        return (
          <Tag
            key={v.id}
            variant={variant}
            size="sm"
            onClick={() => handleClick(v.id)}
            className="uppercase tracking-[0.08em]"
          >
            {v.label}
          </Tag>
        )
      })}
    </div>
  )
}
