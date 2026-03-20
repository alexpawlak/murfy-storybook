import React, { useState } from 'react'
import { AccordionItem } from '../../Molecules/AccordionItem/AccordionItem'

export interface SeoFaqItem {
  question: string
  answer: string
}

export interface SeoSectionProps {
  title?: string
  subheading?: string
  body?: string
  bodyCollapsedLines?: number
  items?: SeoFaqItem[]
}

const DEFAULT_ITEMS: SeoFaqItem[] = [
  {
    question: 'Des tutos réparer vous-même votre électroménager',
    answer: 'Retrouvez nos tutoriels vidéo et guides pas-à-pas pour diagnostiquer et réparer vos appareils électroménagers vous-même, en toute sécurité.',
  },
  {
    question: "Réparation et dépannage d'électroménager à domicile",
    answer: "Nos techniciens se déplacent à votre domicile pour réparer votre appareil sur place, sans que vous ayez besoin de le déposer en atelier.",
  },
  {
    question: 'Un prix de dépannage fixe, sans surprise',
    answer: "Murfy, c'est un forfait fixe et sans surprise qui comprend toutes les interventions à domicile de notre technicien. Le premier rendez-vous permet de diagnostiquer les causes de la panne, et de réparer (dans la moitié de nos interventions nous réparons le jour même sans pièces détachées électroménager). En cas de panne, si la réparation nécessite de(s) pièce(s) détachée(s), nous vous proposons un devis que vous pouvez accepter.",
  },
  {
    question: 'Des appareils électroménagers reconditionnés',
    answer: "Découvrez notre sélection d'appareils reconditionnés testés et garantis, pour une seconde vie à moindre coût.",
  },
  {
    question: 'Reprise de votre électroménager usagé',
    answer: "Nous reprenons votre vieil appareil et lui donnons une seconde vie ou nous assurons son recyclage dans le respect de l'environnement.",
  },
  {
    question: 'Formez-vous au métier de Réparateur Electroménager',
    answer: "Murfy propose des formations certifiantes pour devenir technicien en réparation d'électroménager. Un métier d'avenir, utile et concret.",
  },
]

const DEFAULT_BODY =
  "Murfy c'est une jeune PME qui a décidé de s'attaquer à nos déchets électroménagers et à l'obsolescence programmée. Chez Murfy nous avons à cœur de vous accompagner dans la réparation d'électroménager pour prolonger la durée de vie de vos appareils électroménagers et ainsi éviter des déchets inutiles. Chez Murfy, il y a forcément une solution pour chaque panne. Ainsi plusieurs solutions s'offrent à vous."

const BODY_PREVIEW_LENGTH = 120

export function SeoSection({
  title = "NOTRE EXPERTISE EN RÉPARATION D'ÉLECTROMÉNAGER",
  subheading = "Murfy, l'expert de l'électroménager en France",
  body = DEFAULT_BODY,
  items = DEFAULT_ITEMS,
}: SeoSectionProps) {
  const [bodyExpanded, setBodyExpanded] = useState(false)

  const isLong = body.length > BODY_PREVIEW_LENGTH
  const displayedBody =
    !isLong || bodyExpanded ? body : body.slice(0, BODY_PREVIEW_LENGTH).trimEnd()

  return (
    <section
      className="w-full px-4 py-10 flex flex-col gap-8"
      style={{ backgroundColor: 'var(--brand-text)' }}
    >
      {/* Editorial header */}
      <div className="flex flex-col gap-4">
        <h2
          className="text-h2 font-black uppercase leading-none"
          style={{
            color: 'var(--light-100)',
            letterSpacing: '-0.03em',
          }}
        >
          {title}
        </h2>

        <p
          className="text-text-main-semibold font-bold"
          style={{ color: 'var(--light-100)' }}
        >
          {subheading}
        </p>

        <p
          className="text-text-small leading-relaxed"
          style={{ color: 'var(--light-100)', opacity: 0.85 }}
        >
          {displayedBody}
          {isLong && !bodyExpanded && (
            <>
              {'... '}
              <button
                className="underline underline-offset-2 hover:opacity-70 transition-opacity"
                style={{ color: 'var(--light-100)' }}
                onClick={() => setBodyExpanded(true)}
              >
                en savoir plus
              </button>
            </>
          )}
        </p>
      </div>

      {/* Accordion — forced light theme so cards stay white */}
      <div data-theme="light" className="flex flex-col gap-3">
        {items.map((item, i) => (
          <AccordionItem key={i} question={item.question} answer={item.answer} />
        ))}
      </div>
    </section>
  )
}
