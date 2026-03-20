import React from 'react'
import { Button } from '../../Atoms/Button/Button'
import { Tag } from '../../Atoms/Tag/Tag'

export interface RecruitmentSectionProps {
  headline?: string
  body?: string
  ctaLabel?: string
  imageUrl?: string
  onCtaClick?: () => void
}

export function RecruitmentSection({
  headline = 'Devenez réparateur',
  body = 'Rejoignez une équipe de passionnés et apprenez un nouveau métier grâce à notre formation intégrée, la Murfy Académie.',
  ctaLabel = 'En savoir plus',
  imageUrl = 'https://cdn.prod.website-files.com/66a7929afe102548a244c1d2/66cd7d3bb0f0a821c6c07bcf_formation_visual.avif',
  onCtaClick,
}: RecruitmentSectionProps) {
  return (
    <section
      className="w-full px-4 py-16 flex flex-col gap-8"
      style={{ backgroundColor: 'var(--bg-2)' }}
    >
      {/* Tags row */}
      <div className="flex items-center gap-2 flex-wrap">
        <Tag variant="pink">Formation certifiée</Tag>
      </div>

      {/* Headline */}
      <h2
        className="text-h2 font-black leading-tight"
        style={{ letterSpacing: '-0.03em', color: 'var(--text)' }}
      >
        {headline}
      </h2>

      {/* Body */}
      <p className="text-text-main" style={{ color: 'var(--text)' }}>
        {body}
      </p>

      {/* CTA */}
      <Button variant="primary" onClick={onCtaClick}>
        {ctaLabel}
      </Button>

      {/* Image */}
      {imageUrl ? (
        <div
          className="overflow-hidden"
          style={{ borderRadius: 'var(--radius-card)', height: '280px' }}
        >
          <img src={imageUrl} alt="Technicien Murfy Académie" className="w-full h-full object-cover" />
        </div>
      ) : (
        <div
          className="flex items-center justify-center"
          style={{
            borderRadius: 'var(--radius-card)',
            height: '240px',
            background: 'var(--bg, #f0f0f0)',
            border: '1px solid var(--border)',
          }}
        >
          <span className="text-6xl">🎓</span>
        </div>
      )}
    </section>
  )
}
