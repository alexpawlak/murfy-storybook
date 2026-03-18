import React from 'react'
import { Button } from '../../Atoms/Button/Button'

interface ServiceCardProps {
  title: string
  description: string
  price?: string
  imageUrl?: string
  tag?: string
  onCTA?: () => void
  ctaLabel?: string
}

export function ServiceCard({
  title,
  description,
  price,
  imageUrl,
  tag,
  onCTA,
  ctaLabel = 'Prendre rendez-vous',
}: ServiceCardProps) {
  return (
    <div className="rounded-card overflow-hidden border border-border bg-bg-2 flex flex-col max-w-sm">
      {imageUrl && (
        <div className="h-48 overflow-hidden bg-bg-3">
          <img src={imageUrl} alt={title} className="w-full h-full object-cover" />
        </div>
      )}
      {!imageUrl && (
        <div
          className="h-48 rounded-t-card flex items-center justify-center text-6xl"
          style={{ backgroundColor: 'var(--accent-accent-highlight)' }}
        >
          🔧
        </div>
      )}
      <div className="p-6 flex flex-col gap-3 flex-1">
        {tag && (
          <span
            className="inline-flex self-start px-3 py-1 rounded-pill text-text-xsmall font-semibold"
            style={{ backgroundColor: 'var(--accent-accent-highlight)', color: 'var(--accent-accent-text)' }}
          >
            {tag}
          </span>
        )}
        <h3 className="text-h4 font-bold text-text-default" style={{ fontSize: 'var(--font-size-h4)', fontWeight: 'var(--font-weight-h4)', letterSpacing: '-0.05em' }}>
          {title}
        </h3>
        <p className="text-text-default opacity-80" style={{ fontSize: 'var(--font-size-text-small)', lineHeight: 'var(--line-height-text-small)' }}>
          {description}
        </p>
        {price && (
          <p className="font-bold text-heading-accent" style={{ fontSize: 'var(--font-size-h5)', color: 'var(--heading-accent)' }}>
            À partir de {price}
          </p>
        )}
        <div className="mt-auto pt-2">
          <Button variant="primary" onClick={onCTA}>
            {ctaLabel}
          </Button>
        </div>
      </div>
    </div>
  )
}
