import React from 'react'

type Scale = 'display' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'text-large' | 'text-main' | 'text-small' | 'text-xsmall'

interface TypographyProps {
  scale: Scale
  children: React.ReactNode
  as?: React.ElementType
  accentColor?: boolean
  className?: string
}

const scaleToTag: Record<Scale, React.ElementType> = {
  display: 'h1',
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  h4: 'h4',
  h5: 'h5',
  h6: 'h6',
  'text-large': 'p',
  'text-main': 'p',
  'text-small': 'p',
  'text-xsmall': 'span',
}

export function Typography({ scale, children, as, accentColor, className = '' }: TypographyProps) {
  const Tag = as ?? scaleToTag[scale]
  const style: React.CSSProperties = {
    fontSize: `var(--font-size-${scale})`,
    fontWeight: `var(--font-weight-${scale})`,
    lineHeight: `var(--line-height-${scale})`,
    color: accentColor ? 'var(--heading-accent)' : undefined,
  }
  if (['display', 'h1', 'h2', 'h3', 'h4'].includes(scale)) {
    style.letterSpacing = '-0.05em'
  }

  return (
    <Tag style={style} className={className}>
      {children}
    </Tag>
  )
}
