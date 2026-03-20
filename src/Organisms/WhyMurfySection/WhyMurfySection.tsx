import React, { useRef } from 'react'
import { WhyMurfyCard } from '../../Molecules/WhyMurfyCard/WhyMurfyCard'
import arrowLeft from '../../Assets/icons/arrow-chevron-left.svg'
import arrowRight from '../../Assets/icons/arrow-chevron-right.svg'

export interface WhyMurfyItem {
  title: string
  body: string
  imageUrl?: string
  imageAlt?: string
  icon?: React.ReactNode
}

export interface WhyMurfySectionProps {
  title?: string
  items?: WhyMurfyItem[]
}

const DEFAULT_ITEMS: WhyMurfyItem[] = [
  {
    title: 'Réparé ou remplacé',
    body: "On répare votre appareil ou vous bénéficiez automatiquement d'une remise de 50€ sur votre prochain appareil Murfy !",
  },
  {
    title: 'Labellisé QualiRépar',
    body: "Grâce au label QualiRépar, bénéficiez d'une aide de -20€ à -50€ sur votre réparation.",
  },
  {
    title: 'Plusieurs déplacements ? Pas de supplément !',
    body: "Le forfait réparation Murfy, c'est main d'œuvre et déplacements illimités.",
  },
  {
    title: 'RDV en 24h',
    body: 'Un réparateur électroménager chez vous dès demain, ou optez pour un RDV en vidéo.',
  },
  {
    title: 'Garantie 6 mois sur la panne',
    body: 'Si la même panne réapparait, nous intervenons de nouveau, sans frais supplémentaire.',
  },
  {
    title: 'Un doute sur votre panne ?',
    body: "Échangez avec un dépanneur d'électroménager ou faites votre auto-diagnostic en ligne.",
  },
]

export function WhyMurfySection({
  title = 'POURQUOI RÉPARER AVEC MURFY',
  items = DEFAULT_ITEMS,
}: WhyMurfySectionProps) {
  const scrollRef = useRef<HTMLDivElement>(null)

  function scroll(dir: 'left' | 'right') {
    const el = scrollRef.current
    if (!el) return
    el.scrollBy({ left: dir === 'right' ? 316 : -316, behavior: 'smooth' })
  }

  return (
    <section
      className="w-full flex flex-col gap-12 py-10 overflow-hidden"
      style={{ backgroundColor: 'var(--bg)' }}
    >
      {/* Title */}
      <h2
        className="text-h3 font-black px-4 leading-tight uppercase"
        style={{
          letterSpacing: '-0.04em',
          color: 'var(--text)',
        }}
      >
        {title}
      </h2>

      {/* Horizontal scroll rail */}
      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto scroll-smooth pl-4 pr-4"
        style={{ scrollbarWidth: 'none' }}
      >
        {items.map((item, i) => (
          <WhyMurfyCard
            key={i}
            title={item.title}
            body={item.body}
            imageUrl={item.imageUrl}
            imageAlt={item.imageAlt}
            icon={item.icon}
          />
        ))}
      </div>

      {/* Navigation arrows — right-aligned */}
      <div className="flex justify-end gap-3 px-4">
        <button
          onClick={() => scroll('left')}
          aria-label="Précédent"
          className="flex items-center justify-center rounded-full transition-colors hover:opacity-80 cursor-pointer"
          style={{
            width: '48px',
            height: '48px',
            border: '1.5px solid var(--brand-text)',
            background: 'var(--bg)',
            color: 'var(--text)',
          }}
        >
          <img src={arrowLeft} alt="" width={34} height={34} />
        </button>
        <button
          onClick={() => scroll('right')}
          aria-label="Suivant"
          className="flex items-center justify-center rounded-full transition-colors hover:opacity-80 cursor-pointer"
          style={{
            width: '48px',
            height: '48px',
            background: 'var(--btn-bg)',
            border: 'none',
          }}
        >
          <img src={arrowRight} alt="" width={34} height={34} />
        </button>
      </div>
    </section>
  )
}
