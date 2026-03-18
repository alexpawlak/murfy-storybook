import React, { useState } from 'react'
import { ArrowDown2, ArrowUp2 } from 'iconsax-react'
import { MurfyLogo } from '../../Atoms/Icons/MurfyLogo'
import { Facebook } from '../../Atoms/Icons/Facebook'
import { Instagram } from '../../Atoms/Icons/Instagram'
import { LinkedIn } from '../../Atoms/Icons/LinkedIn'
import { X } from '../../Atoms/Icons/X'
import { YouTube } from '../../Atoms/Icons/YouTube'

// ─── Types ────────────────────────────────────────────────────────────────────

interface FooterSection {
  title: string
  links: { label: string; href?: string }[]
  faq?: { question: string; answer: string }[]
}

export interface FooterProps {
  /** Whether the FAQ accordion inside Électroménager is open by default */
  defaultFaqOpen?: boolean
}

// ─── Content ──────────────────────────────────────────────────────────────────

const SECTIONS: FooterSection[] = [
  {
    title: 'Électroménager',
    links: [
      { label: 'Réparation lave-linge' },
      { label: 'Réparation lave-vaisselle' },
      { label: 'Réparation réfrigérateur' },
      { label: 'Réparation four' },
      { label: 'Réparation sèche-linge' },
    ],
    faq: [
      {
        question: 'Comment fonctionne la réparation à domicile ?',
        answer: 'Nos techniciens se déplacent chez vous pour diagnostiquer et réparer votre appareil en une seule intervention.',
      },
      {
        question: 'Quels sont vos délais d\'intervention ?',
        answer: 'Nous intervenons généralement sous 24 à 48h selon votre zone géographique.',
      },
      {
        question: 'Y a-t-il une garantie sur la réparation ?',
        answer: 'Oui, toutes nos réparations sont garanties 6 mois pièces et main-d\'œuvre.',
      },
    ],
  },
  {
    title: 'Chauffage',
    links: [
      { label: 'Réparation chaudière' },
      { label: 'Réparation pompe à chaleur' },
      { label: 'Réparation climatisation' },
    ],
  },
  {
    title: 'Solaire',
    links: [
      { label: 'Installation panneaux solaires' },
      { label: 'Entretien installation solaire' },
      { label: 'Audit énergétique' },
    ],
  },
  {
    title: 'Murfy et vous',
    links: [
      { label: 'Notre engagement' },
      { label: 'Impact environnemental' },
      { label: 'Avis clients' },
      { label: 'Blog' },
    ],
  },
  {
    title: 'Nous rejoindre',
    links: [
      { label: 'Devenir technicien' },
      { label: 'Offres d\'emploi' },
      { label: 'Devenir partenaire' },
    ],
  },
]

const SOCIAL_LINKS = [
  { Icon: Facebook, label: 'Facebook' },
  { Icon: LinkedIn, label: 'LinkedIn' },
  { Icon: Instagram, label: 'Instagram' },
  { Icon: YouTube, label: 'YouTube' },
  { Icon: X, label: 'X (Twitter)' },
]

const LEGAL_LINKS = ['Mentions légales', 'Politique de confidentialité', 'CGU']

// ─── Sub-components ───────────────────────────────────────────────────────────

function FaqAccordion({ items }: { items: { question: string; answer: string }[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <div className="flex flex-col gap-1 mt-2">
      {items.map((item, i) => (
        <div key={i} className="border-b" style={{ borderColor: 'rgba(255,255,255,0.15)' }}>
          <button
            className="w-full flex items-center justify-between gap-2 py-2 text-left"
            onClick={() => setOpenIndex(openIndex === i ? null : i)}
            aria-expanded={openIndex === i}
          >
            <span className="text-xs" style={{ color: 'var(--light-100)', opacity: 0.8 }}>
              {item.question}
            </span>
            {openIndex === i
              ? <ArrowUp2 size={12} color="var(--light-100)" />
              : <ArrowDown2 size={12} color="var(--light-100)" />
            }
          </button>
          {openIndex === i && (
            <p className="text-xs pb-2 leading-relaxed" style={{ color: 'var(--light-100)', opacity: 0.6 }}>
              {item.answer}
            </p>
          )}
        </div>
      ))}
    </div>
  )
}

function NavSection({ section }: { section: FooterSection }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="border-b" style={{ borderColor: 'rgba(255,255,255,0.15)' }}>
      <button
        className="w-full flex items-center justify-between py-4 text-left"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
        <span className="text-sm font-semibold" style={{ color: 'var(--light-100)' }}>
          {section.title}
        </span>
        {isOpen
          ? <ArrowUp2 size={16} color="var(--light-100)" />
          : <ArrowDown2 size={16} color="var(--light-100)" />
        }
      </button>
      {isOpen && (
        <div className="flex flex-col gap-2 pb-4">
          {section.links.map((link, i) => (
            <a
              key={i}
              href={link.href ?? '#'}
              className="text-sm transition-opacity hover:opacity-100"
              style={{ color: 'var(--light-100)', opacity: 0.7, textDecoration: 'none' }}
            >
              {link.label}
            </a>
          ))}
          {section.faq && (
            <div className="mt-2">
              <span className="text-xs font-semibold" style={{ color: 'var(--light-100)', opacity: 0.9 }}>
                Questions / réponses
              </span>
              <FaqAccordion items={section.faq} />
            </div>
          )}
        </div>
      )}
    </div>
  )
}

// ─── Footer ───────────────────────────────────────────────────────────────────

export function Footer({ defaultFaqOpen: _defaultFaqOpen = false }: FooterProps) {
  return (
    <footer
      className="w-full px-4 pt-8 pb-6 flex flex-col gap-6"
      style={{ backgroundColor: 'var(--brand-text)' }}
    >
      {/* Logo + social */}
      <div className="flex flex-col items-center gap-4">
        <MurfyLogo
          width={48}
          height={46}
          style={{ color: 'var(--pink-500)' }}
        />

        <p className="text-sm font-semibold" style={{ color: 'var(--light-100)' }}>
          Suivez-nous
        </p>

        <div className="flex items-center gap-5">
          {SOCIAL_LINKS.map(({ Icon, label }) => (
            <a
              key={label}
              href="#"
              aria-label={label}
              className="transition-opacity hover:opacity-70"
            >
              <Icon width={20} height={20} style={{ color: 'var(--light-100)' }} />
            </a>
          ))}
        </div>
      </div>

      {/* Nav sections */}
      <nav>
        {SECTIONS.map((section) => (
          <NavSection key={section.title} section={section} />
        ))}
      </nav>

      {/* Separator */}
      <div className="h-px w-full" style={{ backgroundColor: 'rgba(255,255,255,0.2)' }} />

      {/* Legal */}
      <div className="flex flex-col items-center gap-3">
        <p className="text-xs text-center" style={{ color: 'var(--light-100)', opacity: 0.5 }}>
          © {new Date().getFullYear()} Murfy. Tous droits réservés.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          {LEGAL_LINKS.map((link) => (
            <a
              key={link}
              href="#"
              className="text-xs transition-opacity hover:opacity-100"
              style={{ color: 'var(--light-100)', opacity: 0.5, textDecoration: 'none' }}
            >
              {link}
            </a>
          ))}
        </div>
      </div>
    </footer>
  )
}
