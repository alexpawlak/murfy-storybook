import React from 'react'
import { TrustpilotStars } from '../../Atoms/TrustpilotStars/TrustpilotStars'
import { TickCircle } from 'iconsax-react'

export interface TrustpilotReview {
  rating: number
  name: string
  timeAgo: string
  title: string
}

export interface TrustpilotSectionProps {
  title?: string
  pillars?: string[]
  overallRating?: number
  overallLabel?: string
  reviewCount?: number
  reviews?: TrustpilotReview[]
}

const DEFAULT_PILLARS = ['Experts', 'Travail soigné', 'Sans surprise !']

const DEFAULT_REVIEWS: TrustpilotReview[] = [
  { rating: 4.5, name: 'Fabienne Duchamp', timeAgo: 'Il y a 2 heures', title: 'Le rendez-vous est pris rapidement' },
  { rating: 4.5, name: 'Anne Françoise', timeAgo: 'Il y a 2 heures', title: 'Dépannage lave vaisselle' },
  { rating: 4.5, name: 'Hélène', timeAgo: 'Il y a 2 heures', title: 'Efficacité' },
]

function ReviewCard({ review }: { review: TrustpilotReview }) {
  return (
    <div
      className="flex flex-col gap-2 p-4 rounded-xl"
      style={{ background: 'var(--bg-2, #f5f5f5)' }}
    >
      <div className="flex items-center gap-2">
        <TrustpilotStars rating={review.rating} size="sm" />
        <span className="flex items-center gap-1 text-label" style={{ color: '#00B67A' }}>
          <TickCircle size={14} variant="Bold" />
          Vérifié
        </span>
      </div>
      <div className="flex items-baseline gap-2">
        <span className="text-text-xsmall-semibold" style={{ color: 'var(--text)' }}>{review.name}</span>
        <span className="text-label opacity-50" style={{ color: 'var(--text)' }}>{review.timeAgo}</span>
      </div>
      <p className="text-text-xsmall font-bold" style={{ color: 'var(--text)' }}>
        {review.title}
      </p>
      <button
        className="text-label text-center opacity-60 hover:opacity-100 cursor-pointer"
        style={{ color: 'var(--text)', background: 'none', border: 'none', padding: 0 }}
      >
        En savoir plus
      </button>
    </div>
  )
}

export function TrustpilotSection({
  title = 'Un service 5 étoiles',
  pillars = DEFAULT_PILLARS,
  overallRating = 4.5,
  overallLabel = 'Excellent',
  reviewCount = 26137,
  reviews = DEFAULT_REVIEWS,
}: TrustpilotSectionProps) {
  const STAR_PATH = 'M12 2L14.9 8.6L22 9.7L17 14.6L18.2 21.8L12 18.4L5.8 21.8L7 14.6L2 9.7L9.1 8.6Z'

  return (
    <section
      className="w-full flex flex-col gap-6 px-4 py-10"
      style={{ background: 'var(--bg)' }}
    >
      {/* Title */}
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
        {/* Pillar check items */}
        <div className="flex flex-wrap gap-x-4 gap-y-1">
          {pillars.map(p => (
            <span key={p} className="flex items-center gap-1 text-text-xsmall" style={{ color: 'var(--text)' }}>
              <TickCircle size={16} variant="Linear" color="var(--text)" />
              {p}
            </span>
          ))}
        </div>
      </div>

      {/* Review card */}
      <div
        className="flex flex-col gap-4 p-6"
        style={{
          background: 'var(--light-100)',
          borderRadius: 'var(--radius-card)',
          boxShadow: '0 2px 16px rgba(0,0,0,0.07)',
        }}
      >
        {/* Overall rating */}
        <div className="flex flex-col items-center gap-2 text-center">
          <div className="flex items-center gap-3">
            <span
              className="text-h4 font-black"
              style={{ color: 'var(--text)' }}
            >
              {overallLabel}
            </span>
            <TrustpilotStars rating={overallRating} size="md" />
          </div>
          <div className="flex items-center gap-1.5 text-text-xsmall" style={{ color: 'var(--text)' }}>
            <span>Basé sur {reviewCount.toLocaleString('fr-FR')} avis sur</span>
            <svg width={14} height={14} viewBox="0 0 24 24">
              <path d={STAR_PATH} fill="#00B67A" />
            </svg>
            <span className="font-semibold">Trustpilot</span>
          </div>
          <p className="text-text-xsmall opacity-70" style={{ color: 'var(--text)' }}>
            Nos avis 4 et 5 étoiles
          </p>
        </div>

        {/* Individual reviews */}
        <div className="flex flex-col gap-2">
          {reviews.map((r, i) => (
            <ReviewCard key={i} review={r} />
          ))}
        </div>
      </div>
    </section>
  )
}
