import React, { useState } from 'react'
import { Button } from '../../Atoms/Button/Button'

// Trustpilot brand green — intentionally hardcoded as it's an external brand colour
const TP_GREEN = '#00b67a'

function TrustpilotStars() {
  // 4.5 / 5 stars — Trustpilot style filled rectangles
  return (
    <div className="flex items-center gap-px" aria-label="4.5 étoiles sur 5">
      {[1, 2, 3, 4].map(i => (
        <span
          key={i}
          style={{ backgroundColor: TP_GREEN, width: 18, height: 18, display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="white">
            <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.3L12 17l-6.2 4.2 2.4-7.3L2 9.4h7.6z" />
          </svg>
        </span>
      ))}
      {/* Half star */}
      <span
        style={{ width: 18, height: 18, display: 'inline-flex', overflow: 'hidden', position: 'relative' }}
      >
        <span style={{ backgroundColor: '#dce0e0', width: 18, height: 18, position: 'absolute', inset: 0, display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="white">
            <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.3L12 17l-6.2 4.2 2.4-7.3L2 9.4h7.6z" />
          </svg>
        </span>
        <span style={{ backgroundColor: TP_GREEN, width: 9, height: 18, position: 'absolute', left: 0 }} />
      </span>
    </div>
  )
}

function TrustpilotBadge() {
  return (
    <div className="flex items-center gap-2 flex-wrap">
      <span className="font-bold" style={{ color: 'var(--brand-text)', fontSize: 'var(--font-size-text-small)' }}>
        Excellent
      </span>
      <TrustpilotStars />
      {/* Trustpilot wordmark */}
      <span className="flex items-center gap-1" style={{ color: TP_GREEN }}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill={TP_GREEN}>
          <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.3L12 17l-6.2 4.2 2.4-7.3L2 9.4h7.6z" />
        </svg>
        <span className="font-semibold" style={{ fontSize: 'var(--font-size-text-xsmall)' }}>
          Trustpilot
        </span>
      </span>
    </div>
  )
}

export interface HeroSearchBarProps {
  placeholder?: string
  ctaLabel?: string
  usps?: string[]
  onSubmit?: (postalCode: string) => void
}

export function HeroSearchBar({
  placeholder = 'Saisissez votre code postal',
  ctaLabel = 'Voir les disponibilités',
  usps = ['Votre RDV en 3min', 'Payez après le RDV'],
  onSubmit,
}: HeroSearchBarProps) {
  const [value, setValue] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit?.(value)
  }

  return (
    <div className="flex flex-col gap-3 w-full">
      <form onSubmit={handleSubmit}>
        {/*
          Mobile: rounded card with large radius, stacked — Trustpilot sits inside
          Desktop (md): pill bar, inline — Trustpilot lives below outside
        */}
        <div
          className="flex flex-col gap-3 rounded-card p-4 md:flex-row md:rounded-pill md:p-2 md:items-center md:gap-2"
          style={{
            backgroundColor: 'var(--light-100)',
            boxShadow: '0 4px 16px -1px rgba(0,0,0,0.19)',
          }}
        >
          <input
            type="text"
            inputMode="numeric"
            maxLength={5}
            value={value}
            onChange={e => setValue(e.target.value)}
            placeholder={placeholder}
            aria-label={placeholder}
            className={[
              'w-full flex-1 bg-transparent outline-none',
              'px-4 py-3',
              'rounded-pill border border-border',
              'text-text-main placeholder:opacity-50',
              'md:border-none md:py-2',
            ].join(' ')}
            style={{ color: 'var(--brand-text)' }}
          />
          <Button
            variant="primary"
            size="md"
            type="submit"
            className="w-full md:w-auto md:shrink-0"
          >
            {ctaLabel}
          </Button>

          {/* Trustpilot inside the card on mobile, hidden on desktop */}
          <div className="md:hidden pt-1 pb-0.5">
            <TrustpilotBadge />
          </div>
        </div>
      </form>

      {/* Desktop-only trust row: Trustpilot + USPs outside the pill */}
      <div className="hidden md:flex items-center gap-6">
        <TrustpilotBadge />
        {usps.length > 0 && usps.map(usp => (
          <span
            key={usp}
            className="flex items-center gap-1.5 font-bold uppercase tracking-wide"
            style={{ color: 'var(--brand-text)', fontSize: 'var(--font-size-text-xsmall)' }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
            {usp}
          </span>
        ))}
      </div>
    </div>
  )
}
