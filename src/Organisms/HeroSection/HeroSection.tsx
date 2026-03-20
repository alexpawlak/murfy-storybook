import React from 'react'
import { Monitor, InfoCircle } from 'iconsax-react'
import { NewsletterForm } from '../../Molecules/NewsletterForm/NewsletterForm'
import { TrustpilotStars } from '../../Atoms/TrustpilotStars/TrustpilotStars'
import { Tick } from '../../Atoms/Icons/Tick'

export interface HeroSectionProps {
  headline?: React.ReactNode
  subtext?: string
  ctaLabel?: string
  checkItems?: string[]
  /** Price shown in the badge (e.g. "75€") */
  price?: string
  priceLabel?: string
  priceSublabel?: string
  /** Hero photo URL */
  imageUrl?: string
  trustpilotRating?: number
  trustpilotLabel?: string
  onCtaSubmit?: (value: string) => void
}

/** Filled pill highlight for a word in the headline — accent-colored background */
function Highlighted({ children }: { children: React.ReactNode }) {
  return (
    <span
      className="inline-block"
      style={{
        border: '2px solid var(--text)',
        borderRadius: '9999px',
        backgroundColor: '#FF6492',
        color: 'var(--text)',
        paddingLeft: '0.4em',
        paddingRight: '0.4em',
        lineHeight: 1,
        marginLeft: '0.15em',
        marginRight: '0.15em',
      }}
    >
      {children}
    </span>
  )
}

export function HeroSection({
  headline,
  subtext = 'Plus de 300 000 français nous ont déjà fait confiance pour réparer leur électroménager.',
  ctaLabel = 'Voir les disponibilités',
  checkItems = ['VOTRE RDV EN 3MIN', 'PAYEZ APRÈS LE RDV'],
  price = '75€',
  priceLabel = 'À partir de',
  priceSublabel = 'avec le Bonus',
  imageUrl,
  trustpilotRating = 4.5,
  trustpilotLabel = 'Excellent',
  onCtaSubmit,
}: HeroSectionProps) {
  const defaultHeadline = (
    <>
      EXPERT<br />
      DE LA <Highlighted>RÉPARATION</Highlighted><br />
      ÉLECTROMÉNAGER
    </>
  )

  return (
    <section
      className="w-full flex flex-col"
      style={{ backgroundColor: 'var(--pink-500)' }}
    >
      <div className="flex flex-col gap-8 px-4 pt-10 pb-0">
        {/* Headline */}
        <div className="flex flex-col gap-4">
          <h1
            className="text-h1 font-black leading-none tracking-tight uppercase"
            style={{
              letterSpacing: '-0.03em',
              color: 'var(--text)',
            }}
          >
            {headline ?? defaultHeadline}
          </h1>
          <p
            className="text-text-small leading-snug"
            style={{ color: 'var(--text)' }}
          >
            {subtext}
          </p>
        </div>

        {/* Form card */}
        <div className="flex flex-col gap-3">
          <NewsletterForm
            ctaLabel={ctaLabel}
            onSubmit={v => onCtaSubmit?.(v)}
            footer={
              <div className="flex items-center gap-2 justify-center pt-1">
                <span className="text-text-xsmall-semibold" style={{ color: 'var(--text)' }}>
                  {trustpilotLabel}
                </span>
                <TrustpilotStars rating={trustpilotRating} size="sm" />
                <span className="text-text-xsmall opacity-60" style={{ color: 'var(--text)' }}>
                  Trustpilot
                </span>
              </div>
            }
          />
        </div>

        {/* Check items — centered */}
        <ul className="flex flex-col gap-2 items-center">
          {checkItems.map(item => (
            <li key={item} className="flex items-center gap-2">
              <Tick
                width={20}
                height={20}
                style={{ color: 'var(--text)', flexShrink: 0 }}
              />
              <span
                className="text-text-xsmall-semibold uppercase tracking-wide font-bold"
                style={{ color: 'var(--text)' }}
              >
                {item}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* TV strip */}
      <div
        className="flex flex-col items-center gap-2 px-4 py-3 mt-4"
        style={{ borderTop: '1px solid rgba(0,0,0,0.1)' }}
      >
        <div className="flex items-center gap-2">
          <Monitor size={14} color="var(--text)" variant="Linear" />
          <span
            className="text-label uppercase tracking-[0.08em]"
            style={{ color: 'var(--text)' }}
          >
            VU À LA TÉLÉ
          </span>
        </div>
        <div className="flex items-start gap-2">
          <InfoCircle size={14} color="var(--text)" variant="Linear" style={{ flexShrink: 0, marginTop: 2 }} />
          <span
            className="text-text-xsmall"
            style={{ color: 'var(--text)' }}
          >
            Ici pas de condition pour profiter de la réduction du Bonus
          </span>
        </div>
      </div>

      {/* Image + price badge area */}
      <div className="relative mt-6">
        {/* Price badge — rotated, absolute top-right */}
        <div
          className="absolute z-10 flex flex-col items-center justify-center text-center"
          style={{
            top: '-48px',
            right: '16px',
            width: '96px',
            height: '96px',
            borderRadius: '9999px',
            background: 'var(--light-100)',
            border: '6px solid var(--teal-100)',
            padding: '8px',
            transform: 'rotate(15deg)',
          }}
        >
          <span
            className="text-label leading-tight"
            style={{ color: 'var(--teal-700)', fontWeight: 400 }}
          >
            {priceLabel}
          </span>
          <span
            className="text-h4 font-black leading-none"
            style={{
              color: 'var(--teal-700)',
            }}
          >
            {price}
          </span>
          <span
            className="text-label leading-tight"
            style={{ color: 'var(--teal-700)', fontWeight: 400 }}
          >
            {priceSublabel}
          </span>
        </div>

        {/* Hero image */}
        {imageUrl ? (
          <img
            src={imageUrl}
            alt="Techniciens Murfy"
            className="w-full object-cover object-top"
            style={{ maxHeight: '400px', display: 'block' }}
          />
        ) : (
          <div
            className="w-full flex items-end justify-center"
            style={{
              height: '280px',
              background: 'rgba(0,0,0,0.06)',
              borderRadius: '1.5rem 1.5rem 0 0',
            }}
          >
            <span className="text-6xl mb-4">🔧</span>
          </div>
        )}
      </div>
    </section>
  )
}
