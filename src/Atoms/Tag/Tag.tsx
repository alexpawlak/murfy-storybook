import React from 'react'

interface TagProps {
  children: React.ReactNode
  variant?: 'default' | 'active' | 'highlight'
  size?: 'sm' | 'md'
  onClick?: () => void
}

export function Tag({ children, variant = 'default', size = 'md', onClick }: TagProps) {
  const base = 'inline-flex items-center justify-center font-semibold rounded-pill transition-colors'

  const sizes = {
    sm: 'px-3 py-1 text-text-xsmall',
    md: 'px-4 py-2 text-text-small',
  }

  const variants = {
    default: 'bg-bg-2 text-text-default border border-border',
    active: 'border-2',
    highlight: 'border',
  }

  const activeStyle =
    variant === 'active'
      ? { backgroundColor: 'var(--accent-accent-pill-active)', color: 'var(--accent-accent-text)', borderColor: 'var(--accent-accent-pill-active)' }
      : variant === 'highlight'
      ? { backgroundColor: 'var(--accent-accent-highlight)', color: 'var(--accent-accent-text)', borderColor: 'var(--accent-accent-highlight)' }
      : {}

  return (
    <span
      className={`${base} ${sizes[size]} ${variants[variant]} ${onClick ? 'cursor-pointer hover:opacity-80' : ''}`}
      style={activeStyle}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
    >
      {children}
    </span>
  )
}
