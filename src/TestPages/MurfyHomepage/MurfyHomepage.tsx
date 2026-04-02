import React from 'react'
import troisGarsImg from '../../Assets/photos/3 gars.png'
import { MurfyNavbar } from '../../Organisms/MurfyNavbar/MurfyNavbar'
import { HeroSection } from '../../Organisms/HeroSection/HeroSection'
import { WhyMurfySection } from '../../Organisms/WhyMurfySection/WhyMurfySection'
import { TrustpilotSection } from '../../Organisms/TrustpilotSection/TrustpilotSection'
import { AllServicesSection } from '../../Organisms/AllServicesSection/AllServicesSection'
import { NewsletterSection } from '../../Organisms/NewsletterSection/NewsletterSection'
import { ImpactSection } from '../../Organisms/ImpactSection/ImpactSection'
import { ServiceAreaSection } from '../../Organisms/ServiceAreaSection/ServiceAreaSection'
import { FaqSection } from '../../Organisms/FaqSection/FaqSection'
import { RecruitmentSection } from '../../Organisms/RecruitmentSection/RecruitmentSection'
import { CitiesSection } from '../../Organisms/CitiesSection/CitiesSection'
import { SeoSection } from '../../Organisms/SeoSection/SeoSection'
import { Footer } from '../../Molecules/Footer/Footer'

// ─── Layered section wrapper ───────────────────────────────────────────────────

const OVERLAP = 32 // px — how much each section slides under the previous one

interface SectionLayerProps {
  children: React.ReactNode
  zIndex: number
  /** data-theme applied to this layer (controls var(--bg), var(--text), etc.) */
  theme?: string
  /**
   * Explicit background color for this layer.
   * Needed when the organism has its own hardcoded background (FaqSection, Footer, Hero)
   * so the paddingTop area shows the correct color.
   * Defaults to 'var(--bg)' which resolves against the layer's data-theme.
   */
  bg?: string
  first?: boolean
}

/**
 * Wraps a section with rounded top corners + negative margin overlap,
 * creating the "layered cards" stacking effect from the Vercel reference design.
 *
 * paddingTop compensates for the overlap so organism content starts at the
 * visual boundary of the previous section (organism's own internal padding
 * then adds the actual breathing room above the content).
 *
 * overflow:hidden clips the child's background to the rounded shape.
 */
function SectionLayer({ children, zIndex, theme, bg = 'var(--bg)', first = false }: SectionLayerProps) {
  return (
    <div
      data-theme={theme}
      style={{
        backgroundColor: bg,
        borderTopLeftRadius: first ? 0 : 'var(--radius-section)',
        borderTopRightRadius: first ? 0 : 'var(--radius-section)',
        marginTop: first ? 0 : `-${OVERLAP}px`,
        paddingTop: first ? 0 : `${OVERLAP}px`,
        position: 'relative',
        zIndex,
        overflow: 'hidden',
      }}
    >
      {children}
    </div>
  )
}

// ─── FAQ content (murfy.fr électroménager homepage) ────────────────────────────

const FAQ_ITEMS = [
  {
    question: 'Des tutos réparer vous-même votre électroménager',
    answer:
      'Retrouvez nos tutoriels vidéo et guides pas-à-pas pour diagnostiquer et réparer vos appareils électroménagers vous-même, en toute sécurité.',
  },
  {
    question: "Réparation et dépannage d'électroménager à domicile",
    answer:
      "Nos techniciens se déplacent à votre domicile pour réparer votre appareil sur place, sans que vous ayez besoin de le déposer en atelier.",
  },
  {
    question: 'Un prix de dépannage fixe, sans surprise',
    answer:
      "Murfy, c'est un forfait fixe et sans surprise qui comprend toutes les interventions à domicile de notre technicien. Le premier rendez-vous permet de diagnostiquer les causes de la panne, et de réparer (dans la moitié de nos interventions nous réparons le jour même sans pièces détachées électroménager). En cas de panne, si la réparation nécessite de(s) pièce(s) détachée(s), nous vous proposons un devis que vous pouvez accepter.",
  },
  {
    question: 'Des appareils électroménagers reconditionnés',
    answer:
      "Découvrez notre sélection d'appareils reconditionnés testés et garantis, pour une seconde vie à moindre coût.",
  },
  {
    question: 'Reprise de votre électroménager usagé',
    answer:
      "Nous reprenons votre vieil appareil et lui donnons une seconde vie ou nous assurons son recyclage dans le respect de l'environnement.",
  },
]

const FAQ_BODY = (
  <>
    {"Murfy c'est une jeune PME qui a décidé de s'attaquer à nos déchets électroménagers et à l'obsolescence programmée. Chez Murfy nous avons à cœur de vous accompagner dans "}
    <span style={{ textDecoration: 'underline' }}>
      {"la réparation d'électroménager"}
    </span>
    {" pour prolonger la durée de vie de vos appareils électroménagers et ainsi éviter des déchets inutiles."}
  </>
)

// ─── Template ─────────────────────────────────────────────────────────────────

export function MurfyHomepage() {
  return (
    <div className="w-full flex flex-col" style={{ backgroundColor: 'var(--dark-900)' }}>

      {/* 1 — Navbar: dark bg, no rounded corners (top of page) */}
      <SectionLayer zIndex={1} first theme="dark" bg="var(--bg-2)">
        <MurfyNavbar />
      </SectionLayer>

      {/* 2 — Hero: pink-500 bg (hardcoded inside HeroSection) */}
      <SectionLayer zIndex={2} bg="var(--pink-500)">
        <HeroSection imageUrl={troisGarsImg} />
      </SectionLayer>

      {/* 3 — Why Murfy: light white bg */}
      <SectionLayer zIndex={3} theme="light" bg="var(--light-100)">
        <WhyMurfySection />
      </SectionLayer>

      {/* 4 — Trustpilot: dark bg */}
      <SectionLayer zIndex={4} theme="dark" bg="var(--dark-800)">
        <TrustpilotSection />
      </SectionLayer>

      {/* 5 — All Services: light white bg */}
      <SectionLayer zIndex={5} theme="light" bg="var(--light-100)">
        <AllServicesSection />
      </SectionLayer>

      {/* 6 — Newsletter: pink-mist bg */}
      <SectionLayer zIndex={6} theme="pink-mist" bg="var(--pink-mist)">
        <NewsletterSection />
      </SectionLayer>

      {/* 7 — Impact / Stats: light white bg + technician photo */}
      <SectionLayer zIndex={7} theme="light" bg="var(--light-100)">
        <ImpactSection imageUrl={troisGarsImg} />
      </SectionLayer>

      {/* 8 — Service Area: dark bg */}
      <SectionLayer zIndex={8} theme="dark" bg="var(--dark-800)">
        <ServiceAreaSection />
      </SectionLayer>

      {/* 9 — FAQ: FaqSection has its own dark-800 hardcoded bg */}
      <SectionLayer zIndex={9} bg="var(--dark-800)">
        <FaqSection
          heading="Notre expertise en réparation d'électroménager"
          subheading="Murfy, l'expert de l'électroménager en France"
          body={FAQ_BODY}
          items={FAQ_ITEMS}
        />
      </SectionLayer>

      {/* 10 — Recruitment: dark bg (uses var(--bg-2) internally = dark-900 in dark theme) */}
      <SectionLayer zIndex={10} theme="dark" bg="var(--dark-900)">
        <RecruitmentSection />
      </SectionLayer>

      {/* 11 — Cities: light white bg */}
      <SectionLayer zIndex={11} theme="light" bg="var(--light-100)">
        <CitiesSection />
      </SectionLayer>

      {/* 12 — SEO: light white bg */}
      <SectionLayer zIndex={12} theme="light" bg="var(--light-100)">
        <SeoSection />
      </SectionLayer>

      {/* 13 — Footer: brand-text hardcoded bg */}
      <SectionLayer zIndex={13} bg="var(--brand-text)">
        <Footer />
      </SectionLayer>

    </div>
  )
}
