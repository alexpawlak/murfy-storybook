import React from 'react'
import { Fatrows, Flash, Star1, ClipboardTick, StatusUp, Verify, Calendar } from 'iconsax-react'
import { MurfyNavbar } from '../../Organisms/MurfyNavbar/MurfyNavbar'
import { VerticalHeroSection } from '../../Organisms/VerticalHeroSection/VerticalHeroSection'
import { AllServicesSection } from '../../Organisms/AllServicesSection/AllServicesSection'
import { ProcessSection } from '../../Organisms/ProcessSection/ProcessSection'
import { WhyMurfySection } from '../../Organisms/WhyMurfySection/WhyMurfySection'
import { ImpactSection } from '../../Organisms/ImpactSection/ImpactSection'
import { TestimonialsSection } from '../../Organisms/TestimonialsSection/TestimonialsSection'
import { TrustpilotSection } from '../../Organisms/TrustpilotSection/TrustpilotSection'
import { FaqSection } from '../../Organisms/FaqSection/FaqSection'
import { ServiceAreaSection } from '../../Organisms/ServiceAreaSection/ServiceAreaSection'
import { CitiesSection } from '../../Organisms/CitiesSection/CitiesSection'
import { SeoSection } from '../../Organisms/SeoSection/SeoSection'
import { Footer } from '../../Molecules/Footer/Footer'

// ─── Chauffage content constants ──────────────────────────────────────────────

const HERO_CTAS = [
  { label: 'Demander à être rappelé', variant: 'secondary' as const },
  { label: 'Demander un devis', variant: 'primary' as const },
  { label: 'RDV entretien', variant: 'accent' as const },
]

const SOLUTIONS = [
  {
    title: 'PAC air-air',
    description: 'Une pompe à chaleur air-air pour réguler la température de votre logement avec une efficacité maximale.',
    ctaLabel: 'En savoir plus',
  },
  {
    title: 'PAC air-eau',
    description: 'Une pompe à chaleur air-eau raccordée à votre chauffage central pour chauffer toutes les pièces.',
    ctaLabel: 'En savoir plus',
  },
  {
    title: 'Chaudière haute performance',
    description: 'Une chaudière à gaz à haute efficacité énergétique pour réduire votre facture dès la première année.',
    ctaLabel: 'En savoir plus',
  },
  {
    title: 'Chauffe-eau thermodynamique',
    description: "Un système de production d'eau chaude sanitaire qui utilise les calories de l'air pour consommer moins.",
    ctaLabel: 'En savoir plus',
  },
]

const PROCESS_STEPS = [
  {
    number: 1,
    title: 'Analyse de consommation',
    description: 'On étudie vos factures et équipements existants pour comprendre vos besoins réels.',
  },
  {
    number: 2,
    title: 'Étude du logement',
    description: 'Surface, isolation, faisabilité gaz : on prend tout en compte avant de proposer quoi que ce soit.',
  },
  {
    number: 3,
    title: 'Proposition personnalisée',
    description: 'Un devis clair, sans forfait standard. Adapté à votre logement, pas à une moyenne.',
  },
  {
    number: 4,
    title: 'Installation & suivi',
    description: 'Une installation pensée pour évoluer dans le temps, avec un premier entretien inclus.',
  },
]

const WHY_ITEMS = [
  {
    title: 'Fiabilité héritée du terrain',
    body: 'Durabilité et savoir-faire terrain depuis 2018 — chaque installation est pensée pour durer.',
    icon: <Fatrows size={64} color="var(--accent-btn-bg)" variant="TwoTone" />,
  },
  {
    title: 'Plus de chaleur, moins de consommation',
    body: "Diviser ses factures par deux, voire plus : c\u2019est ce que nos solutions permettent, vraiment.",
    icon: <Flash size={64} color="var(--accent-btn-bg)" variant="TwoTone" />,
  },
  {
    title: 'Une expertise locale & certifiée',
    body: 'Techniciens salariés Murfy, certifiés RGE — pas de sous-traitance, pas de surprise.',
    icon: <Verify size={64} color="var(--accent-btn-bg)" variant="TwoTone" />,
  },
  {
    title: 'Du matériel qui dure, posé par des pros',
    body: 'Mitsubishi, LG, De Dietrich — des équipements de 15 à 25 ans de durée de vie.',
    icon: <ClipboardTick size={64} color="var(--accent-btn-bg)" variant="TwoTone" />,
  },
  {
    title: "Plus qu'une installation : l'entretien",
    body: 'Premier entretien inclus dans chaque installation, avec planification automatique.',
    icon: <Calendar size={64} color="var(--accent-btn-bg)" variant="TwoTone" />,
  },
]

const IMPACT_STATS = [
  { value: '4,9/5', label: 'Satisfaction client' },
  { value: '350 000', label: 'Foyers nous font confiance' },
  { value: '250+', label: 'Installations réalisées' },
]

const TESTIMONIALS = [
  {
    quote: 'Installation parfaite et très professionnelle, tout fonctionne à merveille.',
    author: 'Vincent',
    location: 'Bouches-du-Rhône',
    rating: 5,
  },
  {
    quote: "Équipe sérieuse et professionnelle, du devis jusqu\u2019à la réalisation.",
    author: 'Pierre',
    location: 'Var',
    rating: 5,
  },
]

const FAQ_ITEMS = [
  {
    question: "Quelles sont les aides disponibles pour l\u2019installation d\u2019une PAC ?",
    answer:
      "MaPrimeRénov, CEE, éco-PTZ — plusieurs dispositifs coexistent. Nos techniciens certifiés RGE vous permettent d\u2019y accéder. Nous vous aidons à constituer le dossier.",
  },
  {
    question: 'Quelle est la différence entre une PAC air-air et une PAC air-eau ?',
    answer:
      "La PAC air-air chauffe (ou rafraîchit) directement l\u2019air intérieur. La PAC air-eau chauffe l\u2019eau de votre circuit de chauffage central — idéale si vous avez déjà des radiateurs ou un plancher chauffant.",
  },
  {
    question: 'Combien de temps dure une installation ?',
    answer:
      "En général, entre 1 et 3 jours selon le type d\u2019équipement et la configuration de votre logement. Nous planifions avec vous pour minimiser la gêne.",
  },
  {
    question: "Murfy propose-t-il un service d\u2019entretien annuel ?",
    answer:
      "Oui. Le premier entretien est inclus dans chaque installation. Ensuite, nous proposons des contrats d\u2019entretien annuels pour maintenir les performances et la garantie constructeur.",
  },
]

// ─── Template ─────────────────────────────────────────────────────────────────

export function ChauffagePage() {
  return (
    <div className="w-full flex flex-col" data-accent="violet">
      <MurfyNavbar activeVerticalId="chauffage" />

      <VerticalHeroSection
        headline="Fiabilité héritée du terrain"
        subheadline="Installer, réparer, entretenir, faire durer : c'est notre métier chez Murfy."
        stat="350 000 foyers nous ont déjà fait confiance."
        ctas={HERO_CTAS}
      />

      <AllServicesSection
        title="NOS SOLUTIONS CHAUFFAGE"
        items={SOLUTIONS}
      />

      <ProcessSection
        title="Ni plus ni moins : un chauffage dimensionné pour vos besoins"
        steps={PROCESS_STEPS}
      />

      <WhyMurfySection
        title="POURQUOI CHOISIR MURFY CHAUFFAGE"
        items={WHY_ITEMS}
      />

      <ImpactSection
        title="Des chiffres qui parlent"
        stats={IMPACT_STATS}
      />

      <TestimonialsSection
        title="ILS NOUS ONT FAIT CONFIANCE"
        reviews={TESTIMONIALS}
      />

      <TrustpilotSection
        title="Un service 5 étoiles"
        pillars={['Experts certifiés RGE', 'Techniciens salariés', 'Entretien inclus']}
        overallRating={4.9}
        overallLabel="Excellent"
        reviewCount={26137}
      />

      <FaqSection
        heading="Questions fréquentes"
        subheading="Tout ce que vous devez savoir avant de vous lancer."
        body={
          <p style={{ color: 'var(--text)', opacity: 0.8 }} className="text-text-small">
            Vous avez d'autres questions ? Notre équipe est disponible pour vous répondre.
          </p>
        }
        items={FAQ_ITEMS}
      />

      <ServiceAreaSection
        title="Murfy chauffage intervient chez vous ?"
        body="Nos techniciens certifiés RGE sont présents dans toute la France."
      />

      <CitiesSection />

      <SeoSection
        title="Tout savoir sur le chauffage avec Murfy"
        subheading="Guides, conseils et FAQ pour mieux comprendre vos équipements de chauffage."
        body="Chez Murfy, nous croyons qu\u2019un bon équipement de chauffage commence par un bon conseil. Retrouvez nos ressources pour faire le bon choix, bénéficier des aides disponibles et entretenir votre installation dans la durée."
        items={[
          { question: 'Comment choisir entre une PAC et une chaudière ?', answer: 'Cela dépend de votre logement, de votre budget et de vos objectifs en matière de consommation. Un audit énergétique est souvent la première étape.' },
          { question: "Quelles économies attendre d\u2019une pompe à chaleur ?", answer: "En moyenne, une PAC consomme 3 à 4 fois moins d\u2019énergie qu\u2019un radiateur électrique pour produire la même quantité de chaleur." },
        ]}
      />

      <Footer />
    </div>
  )
}
