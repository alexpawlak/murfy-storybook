import React from 'react'
import { Button } from '../../Atoms/Button/Button'

export interface VerticalHeroCta {
  label: string
  href?: string
  variant: 'primary' | 'secondary' | 'accent'
  onClick?: () => void
}

export interface VerticalHeroSectionProps {
  headline: string
  subheadline?: string
  stat?: string
  ctas?: VerticalHeroCta[]
  imageUrl?: string
}

export function VerticalHeroSection({
  headline,
  subheadline,
  stat,
  ctas,
  imageUrl,
}: VerticalHeroSectionProps) {
  return (
    <section
      className="px-4 py-12"
      style={{ backgroundColor: 'var(--accent-btn-bg)' }}
    >
      <div className="md:max-w-5xl md:mx-auto md:flex md:items-center md:gap-12">
        {/* Text column */}
        <div className="flex-1">
          {/* Stat pill */}
          {stat && (
            <div className="inline-block mb-4">
              <span
                className="text-text-small-semibold px-3 py-1"
                style={{
                  backgroundColor: 'var(--btn-bg)',
                  color: 'var(--btn-text)',
                  borderRadius: 'var(--radius-pill)',
                }}
              >
                {stat}
              </span>
            </div>
          )}

          {/* Headline */}
          <h2
            className="text-h2 font-black mb-4"
            style={{
              letterSpacing: '-0.04em',
              color: 'var(--accent-btn-text)',
            }}
          >
            {headline}
          </h2>

          {/* Subheadline */}
          {subheadline && (
            <p
              className="text-text-main mb-8"
              style={{
                color: 'var(--accent-btn-text)',
                opacity: 0.85,
              }}
            >
              {subheadline}
            </p>
          )}

          {/* CTAs */}
          {ctas && ctas.length > 0 && (
            <div className="flex flex-wrap gap-3">
              {ctas.map((cta, index) => (
                <Button
                  key={index}
                  variant={cta.variant}
                  onClick={cta.onClick}
                >
                  {cta.label}
                </Button>
              ))}
            </div>
          )}
        </div>

        {/* Image column */}
        <div className="flex-shrink-0 mt-8 md:mt-0 md:w-96">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt=""
              className="w-full object-cover"
              style={{
                borderRadius: 'var(--radius-card)',
                maxHeight: '320px',
              }}
            />
          ) : (
            <div
              className="w-full"
              style={{
                backgroundColor: 'var(--btn-bg)',
                opacity: 0.2,
                height: '200px',
                borderRadius: 'var(--radius-card)',
              }}
            />
          )}
        </div>
      </div>
    </section>
  )
}
