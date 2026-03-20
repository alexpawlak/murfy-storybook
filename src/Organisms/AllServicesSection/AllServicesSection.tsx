import React, { useRef } from 'react'
import { ArrowLeft2, ArrowRight2 } from 'iconsax-react'
import { Button } from '../../Atoms/Button/Button'

export interface ServiceItem {
  title: string
  description: string
  ctaLabel: string
  imageUrl?: string
  onCta?: () => void
}

export interface AllServicesSectionProps {
  title?: string
  items?: ServiceItem[]
}

const DEFAULT_ITEMS: ServiceItem[] = [
  {
    title: 'Réparation à domicile',
    description: "Un réparateur intervient chez vous en 24h pour réparer votre appareil. C'est simple & efficace !",
    ctaLabel: 'Prendre RDV',
  },
  {
    title: 'Diagnostiquer votre panne',
    description: 'Découvrez notre outil de diagnostic en ligne pour résoudre votre panne.',
    ctaLabel: 'Commencer',
  },
  {
    title: 'Diagnostic à distance',
    description: 'Identifiez la panne de votre appareil avec un réparateur au téléphone et trouvez ensemble la solution !',
    ctaLabel: 'Se faire appeler',
  },
  {
    title: "Acheter de l'électroménager durable",
    description: "Des appareils sélectionnés par nos réparateurs pour que ça dure. Jusqu'à 5 ans de garantie inclue.",
    ctaLabel: 'Voir le catalogue',
  },
]

function ServiceCard({ item }: { item: ServiceItem }) {
  return (
    <div
      className="flex flex-col overflow-hidden shrink-0"
      style={{
        width: '240px',
        borderRadius: 'var(--radius-card)',
        background: 'var(--light-100)',
        boxShadow: '0 2px 16px rgba(0,0,0,0.07)',
      }}
    >
      {/* Photo */}
      {item.imageUrl ? (
        <div className="overflow-hidden" style={{ height: '160px' }}>
          <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover" />
        </div>
      ) : (
        <div
          className="flex items-center justify-center text-5xl"
          style={{ height: '160px', background: 'var(--bg-2, #f0f0f0)' }}
        >
          🔧
        </div>
      )}

      {/* Content */}
      <div className="flex flex-col gap-3 p-4 flex-1">
        <h3
          className="text-text-small font-black leading-tight"
          style={{
            letterSpacing: '-0.02em',
            color: 'var(--text)',
          }}
        >
          {item.title}
        </h3>
        <p className="text-text-xsmall leading-snug flex-1" style={{ color: 'var(--text)' }}>
          {item.description}
        </p>
        <Button
          variant="primary"
          size="sm"
          onClick={item.onCta}
          className="self-start gap-2"
        >
          {item.ctaLabel}
          <ArrowRight2 size={14} />
        </Button>
      </div>
    </div>
  )
}

export function AllServicesSection({
  title = 'TOUS NOS SERVICES',
  items = DEFAULT_ITEMS,
}: AllServicesSectionProps) {
  const scrollRef = useRef<HTMLDivElement>(null)

  function scroll(dir: 'left' | 'right') {
    const el = scrollRef.current
    if (!el) return
    el.scrollBy({ left: dir === 'right' ? 256 : -256, behavior: 'smooth' })
  }

  return (
    <section
      className="w-full flex flex-col gap-6 py-10 overflow-hidden"
      style={{ background: 'var(--bg)' }}
    >
      {/* Title */}
      <h2
        className="text-h3 font-black px-4 uppercase leading-tight"
        style={{
          letterSpacing: '-0.04em',
          color: 'var(--text)',
        }}
      >
        {title}
      </h2>

      {/* Horizontal scroll */}
      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto scroll-smooth pl-4 pr-4"
        style={{ scrollbarWidth: 'none' }}
      >
        {items.map((item, i) => (
          <ServiceCard key={i} item={item} />
        ))}
      </div>

      {/* Navigation */}
      <div className="flex justify-center gap-3 px-4">
        <button
          onClick={() => scroll('left')}
          aria-label="Précédent"
          className="flex items-center justify-center rounded-full cursor-pointer hover:opacity-80"
          style={{
            width: '44px',
            height: '44px',
            border: '1.5px solid var(--border)',
            background: 'var(--bg)',
            color: 'var(--text)',
          }}
        >
          <ArrowLeft2 size={18} />
        </button>
        <button
          onClick={() => scroll('right')}
          aria-label="Suivant"
          className="flex items-center justify-center rounded-full cursor-pointer hover:opacity-80"
          style={{
            width: '44px',
            height: '44px',
            background: 'var(--btn-bg)',
            color: 'var(--btn-text)',
            border: 'none',
          }}
        >
          <ArrowRight2 size={18} />
        </button>
      </div>
    </section>
  )
}
