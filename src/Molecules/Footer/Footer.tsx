import React from 'react'
import { MurfyLogo } from '../../Atoms/Icons/MurfyLogo'
import { Facebook } from '../../Atoms/Icons/Facebook'
import { Instagram } from '../../Atoms/Icons/Instagram'
import { LinkedIn } from '../../Atoms/Icons/LinkedIn'
import { X } from '../../Atoms/Icons/X'
import { YouTube } from '../../Atoms/Icons/YouTube'

// ─── Content ──────────────────────────────────────────────────────────────────

interface FooterSection {
  title: string
  links: { label: string; href?: string }[]
}

const SECTIONS: FooterSection[] = [
  {
    title: 'Électroménager',
    links: [
      { label: 'Réparation Électroménager' },
      { label: 'Réparer en visio' },
      { label: 'Acheter reconditionné' },
      { label: 'Réparer soi même' },
      { label: 'Donner un appareil' },
      { label: 'Bonus réparation' },
      { label: 'Espace Client' },
    ],
  },
  {
    title: 'Chauffage',
    links: [
      { label: 'Entretenir' },
      { label: 'Réparer' },
      { label: 'Installer' },
    ],
  },
  {
    title: 'Solaire',
    links: [
      { label: 'Simuler mes économies' },
      { label: 'Nos produits' },
      { label: 'Nos installations' },
      { label: "Notre équipe" },
    ],
  },
  {
    title: 'Murfy et vous',
    links: [
      { label: 'Qui est Murfy ?' },
      { label: 'Nos engagements' },
      { label: 'Questions fréquentes' },
      { label: 'Le blog' },
      { label: 'Contact' },
    ],
  },
  {
    title: 'Nous rejoindre',
    links: [
      { label: 'Intégrer la formation' },
      { label: 'Devenir technicien expert' },
      { label: "Offres d'emploi" },
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

const LEGAL_LINKS = [
  'Chartes de protection des données',
  'Mentions légales & CGU',
  'Conditions générales de vente',
]

// ─── Footer ───────────────────────────────────────────────────────────────────

export interface FooterProps {}

export function Footer(_props: FooterProps) {
  return (
    <footer
      className="w-full flex flex-col gap-10 px-6 pt-10 pb-20"
      style={{ backgroundColor: 'var(--brand-text)' }}
    >
      {/* Logo + Suivez-nous + social */}
      <div className="flex flex-col gap-6">
        <MurfyLogo
          width={64}
          height={61}
          style={{ color: 'var(--pink-500)' }}
        />
        <div className="flex flex-col gap-3">
          <p className="text-sm font-bold" style={{ color: 'var(--light-100)' }}>
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
                <Icon width={22} height={22} style={{ color: 'var(--light-100)' }} />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Nav sections — always expanded, no accordion */}
      <nav className="flex flex-col gap-8">
        {SECTIONS.map((section) => (
          <div key={section.title} className="flex flex-col gap-3">
            <p
              className="font-bold text-sm"
              style={{ color: 'var(--light-100)' }}
            >
              {section.title}
            </p>
            <div className="flex flex-col gap-2">
              {section.links.map((link) => (
                <a
                  key={link.label}
                  href={link.href ?? '#'}
                  className="text-sm transition-opacity hover:opacity-100"
                  style={{ color: 'var(--light-100)', opacity: 0.7, textDecoration: 'none' }}
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        ))}
      </nav>

      {/* Separator */}
      <div className="h-px w-full" style={{ backgroundColor: 'rgba(255,255,255,0.2)' }} />

      {/* Legal */}
      <div className="flex flex-col gap-3">
        <p className="text-sm" style={{ color: 'var(--light-100)' }}>
          © {new Date().getFullYear()} Murfy. Tous droits réservés.
        </p>
        <div className="flex flex-col gap-2">
          {LEGAL_LINKS.map((link) => (
            <a
              key={link}
              href="#"
              className="text-sm transition-opacity hover:opacity-100"
              style={{ color: 'var(--light-100)', opacity: 0.7, textDecoration: 'none' }}
            >
              {link}
            </a>
          ))}
        </div>
      </div>
    </footer>
  )
}
