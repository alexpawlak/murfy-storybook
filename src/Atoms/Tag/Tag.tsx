import React from 'react'

export type TagVariant = 'pink' | 'outline' | 'violet' | 'yellow' | 'fuschia'
export type TagSize = 'sm' | 'md'

export interface TagProps {
  children: React.ReactNode
  variant?: TagVariant
  size?: TagSize
  /** Adds a ring indicator — use when the tag acts as an active navigation selector */
  selected?: boolean
  onClick?: () => void
  /** Extra Tailwind/utility classes merged onto the root element */
  className?: string
}

const variantClasses: Record<TagVariant, string> = {
  pink:    'bg-pink-500 text-brand-text',
  outline: 'bg-transparent border-2 border-border text-text-default',
  violet:  'bg-purple-700 text-light-100',
  yellow:  'bg-yellow-500 text-dark-900',
  fuschia: 'bg-pink-accent text-brand-text',
}

const sizeClasses: Record<TagSize, string> = {
  sm: 'px-3 py-1 text-text-xsmall',
  md: 'px-4 py-1.5 text-text-small',
}

export function Tag({
  children,
  variant = 'pink',
  size = 'md',
  selected = false,
  onClick,
  className,
}: TagProps) {
  return (
    <span
      className={[
        'inline-flex items-center justify-center font-semibold rounded-pill transition-all whitespace-nowrap',
        sizeClasses[size],
        variantClasses[variant],
        selected ? 'ring-2 ring-offset-2 ring-current opacity-100' : '',
        onClick ? 'cursor-pointer hover:opacity-75 active:scale-95' : '',
        className ?? '',
      ]
        .filter(Boolean)
        .join(' ')}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      aria-pressed={onClick ? selected : undefined}
    >
      {children}
    </span>
  )
}
