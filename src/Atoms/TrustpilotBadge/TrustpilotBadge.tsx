import React from 'react'
import { TrustpilotStars } from '../TrustpilotStars/TrustpilotStars'
import trustpilotLogo from '../../Assets/icons/trustpilot-logo.svg'

export interface TrustpilotBadgeProps {
  /** Total number of reviews */
  reviewCount?: number
  /** Label shown next to the stars, default "Excellent" */
  label?: string
  /** Rating value passed to the star row */
  rating?: number
  className?: string
}

export function TrustpilotBadge({
  reviewCount = 3500,
  label = 'Excellent',
  rating = 4.5,
  className = '',
}: TrustpilotBadgeProps) {
  const formattedCount = reviewCount.toLocaleString('fr-FR')

  return (
    <div className={`inline-flex flex-col gap-5 px-6 ${className}`}>
      {/* Row 1: label + stars */}
      <div className="flex items-center gap-2">
        <span
          className="text-h4 font-bold"
          style={{ color: 'inherit' }}
        >
          {label}
        </span>
        <TrustpilotStars rating={rating} size="lg" />
      </div>

      {/* Row 2: review count text + Trustpilot logo */}
      <div className="flex items-center gap-1">
        <span
          className="text-label"
          style={{ color: 'inherit', opacity: 0.6 }}
        >
          Basé sur {formattedCount} avis sur
        </span>
        <img
          src={trustpilotLogo}
          alt="Trustpilot"
          style={{ height: 17, width: 'auto', display: 'block' }}
        />
      </div>
    </div>
  )
}
