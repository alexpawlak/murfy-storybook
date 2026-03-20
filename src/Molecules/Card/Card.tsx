import React from 'react'
import { ArrowRight } from 'iconsax-react'

// ─── Sub-types ────────────────────────────────────────────────────────────────

export interface CardPrice {
  label: string
  value: string
}

export interface CardStat {
  label: string
  value: string
}

export interface CardProduct {
  imageUrl?: string
  name: string
  label: string
}

export interface CardCta {
  label: string
  /** 'primary' = pink pill  |  'accent' = dark teal pill  |  'arrow' = floating pink circle → */
  variant?: 'primary' | 'accent' | 'arrow'
  onClick?: () => void
}

// ─── Main props ───────────────────────────────────────────────────────────────

export interface CardProps {
  // ── Top image ──────────────────────────────────────────────────────────────
  imageUrl?: string
  imageAlt?: string
  /** Put the image at the bottom of the card instead of the top */
  imagePosition?: 'top' | 'bottom'
  /** Small pill overlaid bottom-left of image (e.g. "La Bédoulé (13)") */
  imageBadge?: string
  /** Centered dark overlay with play icon + text (e.g. "Voir le témoignage") */
  imageOverlay?: string

  // ── Icon / step circle ─────────────────────────────────────────────────────
  /** Content rendered inside the pink circle — usually an icon or a step number */
  circleContent?: React.ReactNode

  // ── Core content ───────────────────────────────────────────────────────────
  title?: string
  subtitle?: string
  body?: string

  // ── Data rows ──────────────────────────────────────────────────────────────
  /** Pink pill tags below the image (e.g. "17 panneaux", "7.25 kWc") */
  tags?: string[]
  /** Pricing rows: label above, pink-pill value below. Displayed in a row. */
  prices?: CardPrice[]
  /** 3-column product icons with name + brand label */
  products?: CardProduct[]
  /** Key-value stats with pink-pill value (e.g. "Économies mensuelles / 220 €") */
  stats?: CardStat[]

  // ── Action ─────────────────────────────────────────────────────────────────
  cta?: CardCta

  className?: string
}

// ─── Internal atoms ──────────────────────────────────────────────────────────

function PinkPill({ children }: { children: React.ReactNode }) {
  return (
    <span
      className="inline-flex items-center px-3 py-1 text-text-xsmall-semibold whitespace-nowrap"
      style={{
        background: 'var(--btn-bg)',
        color: 'var(--text)',
        borderRadius: 'var(--radius-pill)',
      }}
    >
      {children}
    </span>
  )
}

function Circle({ children, size = 48 }: { children: React.ReactNode; size?: number }) {
  return (
    <div
      className="flex items-center justify-center shrink-0"
      style={{
        width: size,
        height: size,
        borderRadius: '50%',
        background: 'var(--btn-bg)',
        color: 'var(--text)',
      }}
    >
      {children}
    </div>
  )
}

// ─── Card ─────────────────────────────────────────────────────────────────────

export function Card({
  imageUrl,
  imageAlt = '',
  imagePosition = 'top',
  imageBadge,
  imageOverlay,
  circleContent,
  title,
  subtitle,
  body,
  tags,
  prices,
  products,
  stats,
  cta,
  className = '',
}: CardProps) {
  // Image block — reused at top or bottom
  const imageBlock = imageUrl ? (
    <div className="relative overflow-hidden shrink-0" style={{ height: 200 }}>
      <img src={imageUrl} alt={imageAlt} className="w-full h-full object-cover" />

      {/* Location badge overlay */}
      {imageBadge && (
        <div className="absolute bottom-3 left-3">
          <PinkPill>{imageBadge}</PinkPill>
        </div>
      )}

      {/* Video / testimonial overlay */}
      {imageOverlay && (
        <div
          className="absolute inset-0 flex flex-col items-center justify-center gap-3"
          style={{ background: 'rgba(0,0,0,0.45)' }}
        >
          {/* Play circle */}
          <div
            className="flex items-center justify-center"
            style={{
              width: 48,
              height: 48,
              borderRadius: '50%',
              background: 'var(--btn-bg)',
            }}
          >
            <svg width={18} height={18} viewBox="0 0 24 24" fill="none">
              <path d="M6 4l15 8-15 8V4z" fill="white" />
            </svg>
          </div>
          <span
            className="text-text-main-semibold text-center px-4"
            style={{ color: 'var(--btn-bg)' }}
          >
            {imageOverlay}
          </span>
        </div>
      )}
    </div>
  ) : null

  // Whether we have any content to render in the text/data area
  const hasContent = circleContent || title || subtitle || body || tags || prices || products || stats || cta

  return (
    <div
      className={`flex flex-col overflow-hidden ${className}`}
      style={{
        background: 'var(--light-100)',
        borderRadius: 'var(--radius-card)',
        boxShadow: '0 2px 16px rgba(0,0,0,0.07)',
      }}
    >
      {/* Top image */}
      {imagePosition === 'top' && imageBlock}

      {/* Content area */}
      {hasContent && (
        <div className="flex flex-col flex-1 p-4 gap-4 relative">
          {/* Circle (icon or step number) */}
          {circleContent && (
            <Circle size={48}>{circleContent}</Circle>
          )}

          {/* Title + subtitle */}
          {(title || subtitle) && (
            <div className="flex flex-col gap-1">
              {title && (
                <h3
                  className="text-h5 font-black leading-snug"
                  style={{ letterSpacing: '-0.03em', color: 'var(--text)' }}
                >
                  {title}
                </h3>
              )}
              {subtitle && (
                <p
                  className="text-text-small-semibold"
                  style={{ color: 'var(--text)' }}
                >
                  {subtitle}
                </p>
              )}
            </div>
          )}

          {/* Vertical divider between subtitle and prices (service card pattern) */}
          {subtitle && prices && (
            <div style={{ width: 1, height: 24, background: 'var(--border)', alignSelf: 'center' }} />
          )}

          {/* Pricing pairs */}
          {prices && prices.length > 0 && (
            <div className="flex gap-4 justify-center flex-wrap">
              {prices.map((p, i) => (
                <div key={i} className="flex flex-col items-center gap-1">
                  <span className="text-text-xsmall" style={{ color: 'var(--text)', opacity: 0.65 }}>
                    {p.label}
                  </span>
                  <PinkPill>
                    <span className="text-h5 font-black">{p.value}</span>
                  </PinkPill>
                </div>
              ))}
            </div>
          )}

          {/* Tags */}
          {tags && tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {tags.map((t, i) => (
                <PinkPill key={i}>{t}</PinkPill>
              ))}
            </div>
          )}

          {/* Products */}
          {products && products.length > 0 && (
            <div className="flex justify-around gap-2">
              {products.map((p, i) => (
                <div key={i} className="flex flex-col items-center gap-2 flex-1">
                  {p.imageUrl ? (
                    <img src={p.imageUrl} alt={p.name} className="w-16 h-16 object-contain" />
                  ) : (
                    <div
                      className="w-16 h-16 rounded-lg"
                      style={{ background: 'var(--bg-2, #f0f0f0)' }}
                    />
                  )}
                  <div className="flex flex-col items-center text-center">
                    <span className="text-text-xsmall" style={{ color: 'var(--text)' }}>{p.name}</span>
                    <span className="text-label uppercase tracking-[0.08em]" style={{ color: 'var(--text)', opacity: 0.55 }}>{p.label}</span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Stats separator (= circle) */}
          {stats && stats.length > 0 && products && products.length > 0 && (
            <div className="flex justify-center">
              <Circle size={36}>
                <span className="text-text-small-semibold">=</span>
              </Circle>
            </div>
          )}

          {/* Stats key-value rows */}
          {stats && stats.length > 0 && (
            <div className="flex flex-col gap-3">
              {stats.map((s, i) => (
                <div key={i} className="flex items-center justify-between gap-4">
                  <span className="text-text-small" style={{ color: 'var(--text)' }}>{s.label}</span>
                  <PinkPill>
                    <span className="text-text-small-semibold">{s.value}</span>
                  </PinkPill>
                </div>
              ))}
            </div>
          )}

          {/* Body text */}
          {body && (
            <p className="text-text-xsmall leading-snug" style={{ color: 'var(--text)', opacity: 0.75 }}>
              {body}
            </p>
          )}

          {/* CTA */}
          {cta && cta.variant !== 'arrow' && (
            <button
              onClick={cta.onClick}
              className="flex items-center justify-center gap-2 text-text-small-semibold cursor-pointer transition-opacity hover:opacity-80"
              style={{
                borderRadius: 'var(--radius-pill)',
                border: 'none',
                padding: '12px 20px',
                background: cta.variant === 'accent' ? 'var(--accent-btn-bg)' : 'var(--btn-bg)',
                color: cta.variant === 'accent' ? 'var(--accent-btn-text)' : 'var(--text)',
              }}
            >
              {cta.label}
              {cta.variant === 'primary' && <ArrowRight size={16} />}
            </button>
          )}

          {/* Arrow CTA — floating circle, bottom-right */}
          {cta && cta.variant === 'arrow' && (
            <div className="flex justify-end mt-auto">
              <button
                onClick={cta.onClick}
                aria-label={cta.label}
                className="flex items-center justify-center cursor-pointer transition-opacity hover:opacity-80"
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: '50%',
                  border: 'none',
                  background: 'var(--btn-bg)',
                  color: 'var(--text)',
                }}
              >
                <ArrowRight size={20} />
              </button>
            </div>
          )}
        </div>
      )}

      {/* Bottom image */}
      {imagePosition === 'bottom' && imageBlock}
    </div>
  )
}
