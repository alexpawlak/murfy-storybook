import React from 'react'
import { ArrowRight } from 'iconsax-react'
import { Button } from '../../Atoms/Button/Button'
import { Tag } from '../../Atoms/Tag/Tag'

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
  /** 'primary' = pink btn  |  'accent' = accent btn  |  'arrow' = floating accent circle */
  variant?: 'primary' | 'accent' | 'arrow'
  onClick?: () => void
}

// ─── Main props ───────────────────────────────────────────────────────────────

export interface CardProps {
  /** 'dark' = dark-green surface (step cards). Overrides bg, text, and circle colours. */
  surface?: 'default' | 'dark'

  // ── Top image ──────────────────────────────────────────────────────────────
  imageUrl?: string
  imageAlt?: string
  /** Put the image at the bottom of the card instead of the top */
  imagePosition?: 'top' | 'bottom'
  /** Small pink pill overlaid bottom-left of image (e.g. "La Bédoulé (13)") */
  imageBadge?: string
  /** Centered dark overlay with play icon + text (e.g. "Voir le témoignage") */
  imageOverlay?: string

  // ── Icon / step circle ─────────────────────────────────────────────────────
  /** Content rendered inside the pink circle — image, icon, or step number */
  circleContent?: React.ReactNode
  /** Diameter of the icon circle in px. Default 88 (service card). Use smaller for step cards. */
  circleSize?: number

  // ── Core content ───────────────────────────────────────────────────────────
  title?: string
  /** When present, the card switches to centred layout (service card pattern) */
  subtitle?: string
  body?: string

  // ── Data rows ──────────────────────────────────────────────────────────────
  /** Pink pill tags (e.g. "17 panneaux", "7.25 kWc") */
  tags?: string[]
  /** Pricing rows: label above, pink-pill value below */
  prices?: CardPrice[]
  /** 3-column product images with name + brand label */
  products?: CardProduct[]
  /** Key-value stats with pink-pill value */
  stats?: CardStat[]

  // ── Action ─────────────────────────────────────────────────────────────────
  cta?: CardCta

  className?: string
}

// ─── Internal atom ────────────────────────────────────────────────────────────

function Circle({ children, size = 88, dark = false }: { children: React.ReactNode; size?: number; dark?: boolean }) {
  return (
    <div
      className="flex items-center justify-center shrink-0 overflow-hidden"
      style={{
        width: size,
        height: size,
        borderRadius: '50%',
        background: dark ? 'var(--light-100)' : 'var(--btn-bg)',
        color: dark ? 'var(--dark-800)' : 'var(--btn-text)',
      }}
    >
      {children}
    </div>
  )
}

// ─── Card ─────────────────────────────────────────────────────────────────────

export function Card({
  surface = 'default',
  imageUrl,
  imageAlt = '',
  imagePosition = 'top',
  imageBadge,
  imageOverlay,
  circleContent,
  circleSize = 88,
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
  const isDark = surface === 'dark'

  // Service card pattern = centred layout
  const centred = !!subtitle

  // Image block — reused at top or bottom
  const imageBlock = imageUrl ? (
    <div className="relative overflow-hidden shrink-0" style={{ height: 200 }}>
      <img src={imageUrl} alt={imageAlt} className="w-full h-full object-cover" />

      {/* Location badge */}
      {imageBadge && (
        <div className="absolute bottom-3 left-3">
          <Tag variant="pink" size="sm">{imageBadge}</Tag>
        </div>
      )}

      {/* Video overlay */}
      {imageOverlay && (
        <div
          className="absolute inset-0 flex flex-col items-center justify-center gap-3"
          style={{ background: 'rgba(0,0,0,0.45)' }}
        >
          <div
            className="flex items-center justify-center"
            style={{ width: 48, height: 48, borderRadius: '50%', background: 'var(--btn-bg)' }}
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

  const hasContent = circleContent || title || subtitle || body || tags || prices || products || stats || cta

  return (
    <div
      className={`flex flex-col overflow-hidden ${className}`}
      style={{
        background: isDark ? 'var(--dark-800)' : 'var(--bg)',
        borderRadius: 'var(--radius-card)',
        boxShadow: isDark ? 'none' : '0 2px 16px rgba(0,0,0,0.07)',
      }}
    >
      {imagePosition === 'top' && imageBlock}

      {hasContent && (
        <div className={`flex flex-col flex-1 p-4 gap-4 relative ${centred ? 'items-center' : ''}`}>

          {/* Circle (icon or step number) */}
          {circleContent && (
            <Circle size={circleSize} dark={isDark}>{circleContent}</Circle>
          )}

          {/* Title + subtitle */}
          {(title || subtitle) && (
            <div className={`flex flex-col gap-1 ${centred ? 'text-center' : ''}`}>
              {title && (
                <h3
                  className="text-h5 font-black leading-snug"
                  style={{ letterSpacing: '-0.03em', color: isDark ? 'var(--light-100)' : 'var(--text)' }}
                >
                  {title}
                </h3>
              )}
              {subtitle && (
                <p className="text-text-small" style={{ color: isDark ? 'var(--light-100)' : 'var(--text)', opacity: 0.7 }}>
                  {subtitle}
                </p>
              )}
            </div>
          )}

          {/* Divider (service card) */}
          {subtitle && prices && (
            <div style={{ width: 1, height: 24, background: 'var(--border)', alignSelf: 'center' }} />
          )}

          {/* Pricing pairs */}
          {prices && prices.length > 0 && (
            <div className="flex gap-6 justify-center flex-wrap">
              {prices.map((p, i) => (
                <div key={i} className="flex flex-col items-center gap-1">
                  <span className="text-text-xsmall text-center" style={{ color: 'var(--text)', opacity: 0.65 }}>
                    {p.label}
                  </span>
                  <Tag variant="pink" size="md">{p.value}</Tag>
                </div>
              ))}
            </div>
          )}

          {/* Tags */}
          {tags && tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {tags.map((t, i) => (
                <Tag key={i} variant="pink" size="sm">{t}</Tag>
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
                    <div className="w-16 h-16 rounded-lg" style={{ background: 'var(--bg-2, #f0f0f0)' }} />
                  )}
                  <div className="flex flex-col items-center text-center">
                    <span className="text-text-xsmall" style={{ color: 'var(--text)' }}>{p.name}</span>
                    <span className="text-label uppercase tracking-[0.08em]" style={{ color: 'var(--text)', opacity: 0.55 }}>{p.label}</span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Stats separator */}
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
                  <Tag variant="pink" size="sm">{s.value}</Tag>
                </div>
              ))}
            </div>
          )}

          {/* Body text */}
          {body && (
            <p className="text-text-xsmall leading-snug" style={{ color: isDark ? 'var(--light-100)' : 'var(--text)', opacity: isDark ? 0.8 : 0.75 }}>
              {body}
            </p>
          )}

          {/* CTA button */}
          {cta && cta.variant !== 'arrow' && (
            <Button
              variant={cta.variant === 'accent' ? 'accent' : 'primary'}
              size="sm"
              onClick={cta.onClick}
              className="gap-2 w-full justify-center"
            >
              {cta.label}
              <ArrowRight
                size={16}
                color={cta.variant === 'accent' ? 'var(--accent-btn-text)' : 'var(--btn-text)'}
              />
            </Button>
          )}

          {/* Arrow CTA — centred circle */}
          {cta && cta.variant === 'arrow' && (
            <div className="flex justify-center mt-auto">
              <button
                onClick={cta.onClick}
                aria-label={cta.label}
                className="flex items-center justify-center cursor-pointer transition-opacity hover:opacity-80"
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: '50%',
                  border: 'none',
                  background: 'var(--accent-btn-bg)',
                }}
              >
                <ArrowRight size={20} color="var(--accent-btn-text)" />
              </button>
            </div>
          )}
        </div>
      )}

      {imagePosition === 'bottom' && imageBlock}
    </div>
  )
}
