import React from 'react'
import starImg from '../../Assets/icons/star.svg'
import halfStarImg from '../../Assets/icons/half-star.svg'

export type StarSize = 'sm' | 'md' | 'lg'

export interface TrustpilotStarsProps {
  /** Rating out of 5 — supports half-star increments (e.g. 4.5) */
  rating?: number
  size?: StarSize
  className?: string
}

const SIZE_PX: Record<StarSize, number> = { sm: 16, md: 20, lg: 28 }

function Star({ fill, sizePx }: { fill: 'full' | 'half' | 'empty'; sizePx: number }) {
  if (fill === 'half') {
    return (
      <img
        src={halfStarImg}
        width={sizePx}
        height={sizePx}
        alt=""
        aria-hidden="true"
        style={{ display: 'block' }}
      />
    )
  }

  return (
    <img
      src={starImg}
      width={sizePx}
      height={sizePx}
      alt=""
      aria-hidden="true"
      style={{
        display: 'block',
        filter: fill === 'empty' ? 'grayscale(1) brightness(1.1)' : undefined,
      }}
    />
  )
}

export function TrustpilotStars({
  rating = 5,
  size = 'sm',
  className = '',
}: TrustpilotStarsProps) {
  const sizePx = SIZE_PX[size]

  return (
    <div
      className={`flex gap-0.5 ${className}`}
      role="img"
      aria-label={`Note ${rating} sur 5`}
    >
      {[1, 2, 3, 4, 5].map(i => {
        const fill: 'full' | 'half' | 'empty' =
          rating >= i ? 'full' : rating >= i - 0.5 ? 'half' : 'empty'
        return <Star key={i} fill={fill} sizePx={sizePx} />
      })}
    </div>
  )
}
