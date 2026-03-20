import React from 'react'
import { StatItem } from '../../Atoms/StatItem/StatItem'

export interface ImpactStat {
  value: string
  label: string
}

export interface ImpactSectionProps {
  title?: string
  stats?: ImpactStat[]
  /** Photo of a technician at work */
  imageUrl?: string
}

const DEFAULT_STATS: ImpactStat[] = [
  { value: '250', label: 'Réparateurs partout en France' },
  { value: '+ 350 000', label: 'Appareils réparés' },
  { value: '-65KG', label: 'de déchets par appareil réparé' },
]

export function ImpactSection({
  title = 'Réparer pour moins cher',
  stats = DEFAULT_STATS,
  imageUrl,
}: ImpactSectionProps) {
  return (
    <section
      className="w-full flex flex-col gap-0"
      style={{ background: 'var(--bg)' }}
    >
      {/* Stats card */}
      <div
        className="mx-4 flex flex-col gap-10 p-10"
        style={{
          backgroundColor: 'var(--pink-500)',
          border: '1px solid var(--border)',
          borderRadius: 'var(--radius-card)',
        }}
      >
        <h2
          className="text-h3 font-black leading-tight"
          style={{
            letterSpacing: '-0.04em',
            color: 'var(--text)',
          }}
        >
          {title}
        </h2>

        <div className="flex flex-col gap-8">
          {stats.map((stat, i) => (
            <React.Fragment key={i}>
              <StatItem value={stat.value} label={stat.label} />
              {i < stats.length - 1 && (
                <hr style={{ border: 'none', borderTop: '1px solid var(--border)', opacity: 0.3 }} />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Technician photo */}
      {imageUrl ? (
        <div
          className="mx-4 mt-4 overflow-hidden"
          style={{ borderRadius: 'var(--radius-card)', height: '280px' }}
        >
          <img src={imageUrl} alt="Technicien Murfy" className="w-full h-full object-cover" />
        </div>
      ) : (
        <div
          className="mx-4 mt-4 flex items-center justify-center"
          style={{
            borderRadius: 'var(--radius-card)',
            height: '240px',
            background: 'var(--bg-2, #f0f0f0)',
          }}
        >
          <span className="text-6xl">👨‍🔧</span>
        </div>
      )}
    </section>
  )
}
