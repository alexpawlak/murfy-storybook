import React from 'react'
import { Button } from '../../Atoms/Button/Button'
import arrowRight from '../../Assets/icons/arrow-chevron-right.svg'

export interface ServiceAreaSectionProps {
  title?: string
  body?: string
  ctaLabel?: string
  onCta?: () => void
}

export function ServiceAreaSection({
  title = 'Murfy intervient chez vous ?',
  body = 'Nos réparateurs sont présents aux quatre coins de la France.',
  ctaLabel = 'Vérifier',
  onCta,
}: ServiceAreaSectionProps) {
  return (
    <section
      className="w-full px-4 py-10"
      style={{ background: 'var(--bg)' }}
    >
      <div
        className="flex flex-col items-center gap-8 px-6 py-10 text-center"
        style={{
          backgroundColor: 'var(--pink-vivid)',
          borderRadius: 'var(--radius-card)',
        }}
      >
        <h2
          className="text-h3 font-black leading-tight"
          style={{
            letterSpacing: '-0.04em',
            color: 'var(--text)',
          }}
        >
          {title}
        </h2>
        <p className="text-text-small leading-snug" style={{ color: 'var(--text)' }}>
          {body}
        </p>
        <Button variant="primary" onClick={onCta} className="inline-flex items-center gap-4">
          {ctaLabel}
          <img src={arrowRight} alt="" width={20} height={20} />
        </Button>
      </div>
    </section>
  )
}
