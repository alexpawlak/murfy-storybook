import React from 'react'
import { ArrowRight } from 'iconsax-react'

export interface WhyMurfyCardProps {
  title: string
  body: string
  /** Optional photo shown in the bottom half of the card */
  imageUrl?: string
  imageAlt?: string
  /** Optional icon shown in the bottom half instead of a photo (e.g. iconsax-react node) */
  icon?: React.ReactNode
  onClick?: () => void
  className?: string
}

export function WhyMurfyCard({
  title,
  body,
  imageUrl,
  imageAlt = '',
  icon,
  onClick,
  className = '',
}: WhyMurfyCardProps) {
  return (
    <div
      className={`flex flex-col overflow-hidden shrink-0 ${className}`}
      style={{
        background: 'var(--bg)',
        borderRadius: 'var(--radius-card)',
        boxShadow: '0 2px 16px rgba(0,0,0,0.07)',
        width: '300px',
        height: '360px',
      }}
    >
      {/* Text content — fills remaining space, keeping image pinned to bottom */}
      <div className="flex flex-col gap-3 p-5 flex-1 overflow-hidden">
        {/* Title row with arrow button */}
        <div className="flex items-start justify-between gap-2">
          <h3
            className="text-text-main-semibold font-black leading-tight flex-1"
            style={{
              letterSpacing: '-0.03em',
              color: 'var(--text)',
            }}
          >
            {title}
          </h3>
          <button
            onClick={onClick}
            aria-label="En savoir plus"
            className="flex items-center justify-center rounded-full transition-opacity hover:opacity-80 active:scale-95 cursor-pointer shrink-0"
            style={{
              width: '48px',
              height: '48px',
              backgroundColor: 'var(--btn-bg)',
              border: 'none',
            }}
          >
            <ArrowRight size={20} color="var(--btn-text)" />
          </button>
        </div>

        <p
          className="text-text-xsmall leading-snug"
          style={{ color: 'var(--text)' }}
        >
          {body}
        </p>
      </div>

      {/* Photo, icon, or placeholder */}
      <div className="overflow-hidden" style={{ height: '180px' }}>
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={imageAlt || title}
            className="w-full h-full object-cover"
          />
        ) : icon ? (
          <div
            className="w-full h-full flex items-center justify-center"
            style={{ backgroundColor: 'var(--bg-2, #f5f5f5)' }}
          >
            {icon}
          </div>
        ) : (
          <div
            className="w-full h-full flex items-center justify-center"
            style={{ backgroundColor: 'var(--bg-2, #f5f5f5)' }}
          >
            <span className="text-text-xsmall opacity-40" style={{ color: 'var(--text)' }}>
              Image
            </span>
          </div>
        )}
      </div>
    </div>
  )
}
