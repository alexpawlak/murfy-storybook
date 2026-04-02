import React from 'react'

interface TextLinkProps {
  /** Link href — pass '#' for interactive demos */
  href?: string
  /** Size follows the body type scale */
  size?: 'large' | 'main' | 'small' | 'xsmall'
  /** Show a trailing arrow glyph */
  arrow?: boolean
  children: React.ReactNode
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void
  className?: string
}

const sizeClass: Record<NonNullable<TextLinkProps['size']>, string> = {
  large: 'text-text-large',
  main: 'text-text-main',
  small: 'text-text-small',
  xsmall: 'text-text-xsmall',
}

export function TextLink({
  href = '#',
  size = 'xsmall',
  arrow = false,
  children,
  onClick,
  className = '',
}: TextLinkProps) {
  return (
    <a
      href={href}
      onClick={onClick}
      className={`inline-flex items-center gap-1 underline underline-offset-2 decoration-1 transition-opacity hover:opacity-70 ${sizeClass[size]} ${className}`}
      style={{ color: 'var(--text)' }}
    >
      {children}
      {arrow && <span aria-hidden="true">→</span>}
    </a>
  )
}
