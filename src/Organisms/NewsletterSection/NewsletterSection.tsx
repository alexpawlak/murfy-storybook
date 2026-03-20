import React from 'react'
import { NewsletterForm } from '../../Molecules/NewsletterForm/NewsletterForm'

export interface NewsletterSectionProps {
  title?: string
  body?: string
  imageUrl?: string
  ctaLabel?: string
  onSubmit?: (value: string, consent: boolean) => void
}

export function NewsletterSection({
  title = 'Pas encore de panne ?',
  body = "1 panne sur 2 est due à un manque d'entretien 😳. Pour éviter une future panne, on vous envoie GRATUITEMENT nos guides anti-panne.",
  imageUrl,
  ctaLabel = 'Voir les disponibilités',
  onSubmit,
}: NewsletterSectionProps) {
  return (
    <section
      className="w-full flex flex-col gap-8 px-4 py-10"
      style={{ backgroundColor: 'var(--bg)' }}
    >
      {/* Image / visual */}
      {imageUrl && (
        <div
          className="w-full overflow-hidden"
          style={{ borderRadius: 'var(--radius-card)', height: '300px' }}
        >
          <img src={imageUrl} alt="Guides anti-panne Murfy" className="w-full h-full object-cover" />
        </div>
      )}

      {/* Text */}
      <div className="flex flex-col gap-3">
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
      </div>

      {/* Form */}
      <NewsletterForm
        ctaLabel={ctaLabel}
        showConsent
        onSubmit={onSubmit}
      />
    </section>
  )
}
