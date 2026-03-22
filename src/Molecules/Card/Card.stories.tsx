import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Card } from './Card'
import pacImg from '../../Assets/icons/icone pompe à chaleur.png'
import panneauxImg from '../../Assets/icons/imgPanneauxSolaires.png'
import batterieImg from '../../Assets/icons/imgBatterie.png'
import apSystemImg from '../../Assets/icons/imgAPSystem.png'
import { WhyMurfyCard } from '../WhyMurfyCard/WhyMurfyCard'
import { DocHeader, DocSection, AccessibilityNote } from '../../Foundation/doc-components'

const cardDecorator: StoryObj<typeof Card>['decorators'] = [
  (Story) => (
    <div style={{ width: 300 }}>
      <Story />
    </div>
  ),
]

const meta: Meta<typeof Card> = {
  title: 'Molecules/Card',
  component: Card,
  parameters: { layout: 'fullscreen' },
}

export default meta
type Story = StoryObj<typeof Card>

function GuidanceCard({
  title,
  description,
  tone = 'default',
}: {
  title: string
  description: string
  tone?: 'default' | 'warning'
}) {
  return (
    <div
      className="rounded-card p-6"
      style={{
        backgroundColor: tone === 'warning' ? 'var(--pink-vivid)' : 'var(--bg-2)',
        boxShadow: '0 2px 16px rgba(0,0,0,0.06)',
      }}
    >
      <h3 className="text-h6 font-bold text-text-default">{title}</h3>
      <p className="mt-2 text-text-small text-text-default" style={{ opacity: 0.8 }}>
        {description}
      </p>
    </div>
  )
}

// ── Overview ──────────────────────────────────────────────────────────────────
export const Overview: Story = {
  render: () => (
    <div className="min-h-screen" style={{ background: 'var(--bg)' }}>
      <DocHeader
        layer="Molecules"
        title="Card"
        description="Six card variants for media, services, case studies, process steps, and content. Cards group media, supporting facts, and a single clear action. Separation is achieved through elevation (box-shadow) and surface contrast — not borders."
      />

      <div className="flex max-w-6xl flex-col gap-10 p-8">

        {/* ── Design rules ── */}
        <DocSection label="Design rules">
          <section className="grid gap-4 md:grid-cols-2">
            <GuidanceCard
              title="Use cards for grouped content"
              description="Choose this pattern when the user needs to scan a complete mini-story: image, headline, supporting detail, and one next step."
            />
            <GuidanceCard
              title="Let the surface do the work"
              description="Radius, spacing, and elevation create separation. Use borders only when structure or state must be explicitly called out."
            />
            <GuidanceCard
              title="Cards don't use border outlines"
              tone="warning"
              description="A card outline adds a third edge to the page — alongside the section/grid boundary and any interior rule lines. Separation is handled entirely by box-shadow and background-color contrast."
            />
            <GuidanceCard
              title="Keep mobile weight under control"
              tone="warning"
              description="Avoid adding a dark outline around an already filled or tinted card. It often increases visual noise more than clarity on small screens."
            />
          </section>
        </DocSection>

        {/* ── All variants ── */}
        <DocSection label="All variants">
          <p className="mb-6 text-text-small" style={{ color: 'var(--text)', opacity: 0.65 }}>
            Switch the accent in the toolbar to see pills and arrow buttons change color. Switch the theme to see card backgrounds change.
          </p>

          <div className="flex flex-wrap gap-6 items-start">

            {/* 1. Service card */}
            <div className="flex flex-col gap-2" style={{ width: 300 }}>
              <p className="text-label uppercase tracking-[0.08em]" style={{ color: 'var(--text)', opacity: 0.5 }}>1 — Service</p>
              <Card
                circleContent={<img src={pacImg} alt="Pompe à chaleur" className="w-full h-full object-contain" />}
                title="Pompe à chaleur"
                subtitle="Air-Air ou Air-Eau"
                prices={[
                  { label: 'Air-Air à partir de', value: '2 500 €' },
                  { label: 'Air-Eau à partir de', value: '14 500 €' },
                ]}
                cta={{ label: 'Demander un devis', variant: 'primary' }}
              />
            </div>

            {/* 2. Project card */}
            <div className="flex flex-col gap-2" style={{ width: 300 }}>
              <p className="text-label uppercase tracking-[0.08em]" style={{ color: 'var(--text)', opacity: 0.5 }}>2 — Project</p>
              <Card
                imageUrl="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80"
                imageBadge="La Bédoulé (13)"
                tags={['17 panneaux', '7,25 kWc', 'Batterie 10kWh']}
              />
            </div>

            {/* 3. Case study / testimonial */}
            <div className="flex flex-col gap-2" style={{ width: 300 }}>
              <p className="text-label uppercase tracking-[0.08em]" style={{ color: 'var(--text)', opacity: 0.5 }}>3 — Case study</p>
              <Card
                imageUrl="https://images.unsplash.com/photo-1600180758890-6b94519a8ba6?w=600&q=80"
                imageOverlay="Voir le témoignage"
                tags={['12 panneaux', '7,25 kWc', 'Batterie 10kWh']}
                products={[
                  { imageUrl: panneauxImg, name: 'Panneaux x12', label: 'Dualsun' },
                  { imageUrl: batterieImg, name: 'Batterie', label: 'Huawei' },
                  { imageUrl: apSystemImg, name: 'Suivi temps réel', label: 'APsystem' },
                ]}
                stats={[
                  { label: 'Économies mensuelles', value: '220 €' },
                  { label: 'Économies annuelles', value: '13 330 €' },
                  { label: 'Autoconsommation', value: '83 %' },
                ]}
              />
            </div>

            {/* 4. Step + photo */}
            <div className="flex flex-col gap-2" style={{ width: 300 }}>
              <p className="text-label uppercase tracking-[0.08em]" style={{ color: 'var(--text)', opacity: 0.5 }}>4 — Step + photo</p>
              <Card
                surface="dark"
                imageUrl="https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=600&q=80"
                circleContent={<span className="text-h5 font-black">1</span>}
                circleSize={48}
                title="Visite technique offerte"
                body="Un de nos techniciens se déplace chez vous pour étudier vos besoins et les possibilités d'installation."
              />
            </div>

            {/* 5. Content + arrow */}
            <div className="flex flex-col gap-2" style={{ width: 300 }}>
              <p className="text-label uppercase tracking-[0.08em]" style={{ color: 'var(--text)', opacity: 0.5 }}>5 — Content + arrow</p>
              <Card
                title="Ni plus ni moins : un chauffage dimensionné pour vos besoins"
                body="Ni plus ni moins : un chauffage dimensionné pour vos besoins"
                cta={{ label: 'En savoir plus', variant: 'arrow' }}
                imageUrl="https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=600&q=80"
                imagePosition="bottom"
              />
            </div>

            {/* 6. Media + content */}
            <div className="flex flex-col gap-2" style={{ width: 300 }}>
              <p className="text-label uppercase tracking-[0.08em]" style={{ color: 'var(--text)', opacity: 0.5 }}>6 — Media + content</p>
              <Card
                imageUrl="https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&q=80"
                title="Réparation à domicile"
                body="Un réparateur intervient chez vous en 24h pour réparer votre appareil. C'est simple & efficace !"
                cta={{ label: 'Prendre RDV', variant: 'primary' }}
              />
            </div>

          </div>
        </DocSection>

        {/* ── WhyMurfyCard ── */}
        <DocSection label="WhyMurfyCard variant">
          <p className="mb-6 text-text-small" style={{ color: 'var(--text)', opacity: 0.65 }}>
            Fixed-size card (300 × 360 px) used in the "Why Murfy" horizontal scroll section.
          </p>
          <div className="flex flex-wrap gap-6">
            <WhyMurfyCard
              title="Des techniciens salariés, pas des sous-traitants"
              body="Nos techniciens sont formés et certifiés en interne. Ils interviennent dans les meilleurs délais."
            />
            <WhyMurfyCard
              title="Une garantie pièces et main-d'œuvre"
              body="Toutes nos réparations sont couvertes par une garantie de 6 mois pièces et main-d'œuvre."
            />
          </div>
        </DocSection>

        {/* ── Backgrounds ── */}
        <DocSection label="Cards on all brand backgrounds">
          <p className="mb-6 text-text-small" style={{ color: 'var(--text)', opacity: 0.65 }}>
            All valid page backgrounds are white or a shade of pink. Cards sit on these surfaces using elevation alone — no borders needed.
          </p>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {[
              { label: 'light — #ffffff', bg: '#ffffff' },
              { label: 'pink-mist — #FFF3F9', bg: '#FFF3F9' },
              { label: 'light-pink — #ffdeef', bg: '#ffdeef' },
              { label: 'pink-vivid — #ffadd6', bg: '#ffadd6' },
            ].map(({ label, bg }) => (
              <div key={bg} className="rounded-card p-5" style={{ backgroundColor: bg }}>
                <p className="text-label uppercase tracking-[0.08em] mb-4" style={{ color: '#032524', opacity: 0.55 }}>{label}</p>
                <Card
                  title="Techniciens salariés Murfy"
                  body="Pas de sous-traitance, pas de surprise."
                  cta={{ label: 'En savoir plus', variant: 'primary' }}
                />
              </div>
            ))}
          </div>
        </DocSection>

        {/* ── Theme matrix ── */}
        <DocSection label="Theme matrix">
          <p className="mb-6 text-text-small" style={{ color: 'var(--text)', opacity: 0.65 }}>
            All 5 themes rendered simultaneously — independent of the toolbar selection. Shows how card background (var(--bg)) adapts per theme.
          </p>
          <div className="flex flex-wrap gap-6 items-start">
            {(['light', 'dark', 'light-pink', 'pink-mist', 'pink-vivid'] as const).map((theme) => (
              <div key={theme} data-theme={theme} style={{ borderRadius: 12, padding: 16, background: 'var(--bg)' }}>
                <p className="text-label uppercase tracking-[0.08em] mb-3" style={{ color: 'var(--text)', opacity: 0.55 }}>
                  {theme}
                </p>
                <div style={{ width: 260 }}>
                  <Card
                    imageUrl="https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&q=80"
                    title="Réparation à domicile"
                    body="Un réparateur intervient chez vous en 24h."
                    tags={['RGE certifié', 'Garantie 6 mois']}
                    cta={{ label: 'Prendre RDV', variant: 'primary' }}
                  />
                </div>
              </div>
            ))}
          </div>
        </DocSection>

        {/* ── Accessibility ── */}
        <DocSection label="Accessibility & WCAG">
          <div className="flex flex-col gap-4">
            <AccessibilityNote
              criterion="WCAG 2.1 AA 1.4.11 — Non-text Contrast"
              requirement="Card boundaries must achieve 3:1 against their surrounding surface"
              why="The Murfy card system uses box-shadow for visual separation instead of borders. On surfaces where the card background is very close in luminance to the page background, an additional subtle border may be needed to maintain the 3:1 boundary requirement."
              href="https://www.w3.org/WAI/WCAG21/Understanding/non-text-contrast.html"
            />
            <AccessibilityNote
              criterion="WCAG 2.1 AA 2.4.4 — Link Purpose"
              requirement="Card CTAs must have descriptive labels — either visible text or accessible context"
              why="Generic labels like 'En savoir plus' on multiple cards are indistinguishable for screen reader users. The card title must appear as a heading before the CTA so screen readers can announce the full context."
              href="https://www.w3.org/WAI/WCAG21/Understanding/link-purpose-in-context.html"
            />
          </div>
        </DocSection>

      </div>
    </div>
  ),
}

// ── Individual variant stories (Controls panel) ───────────────────────────────

export const ServiceVariant: Story = {
  name: 'Service — PAC',
  decorators: cardDecorator,
  parameters: { layout: 'centered' },
  args: {
    circleContent: <img src={pacImg} alt="Pompe à chaleur" className="w-full h-full object-contain" />,
    title: 'Pompe à chaleur',
    subtitle: 'Air-Air ou Air-Eau',
    prices: [
      { label: 'Air-Air à partir de', value: '2 500 €' },
      { label: 'Air-Eau à partir de', value: '14 500 €' },
    ],
    cta: { label: 'Demander un devis', variant: 'primary' },
  },
}

export const ProjectCard: Story = {
  name: 'Project — Solar install',
  decorators: cardDecorator,
  parameters: { layout: 'centered' },
  args: {
    imageUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80',
    imageBadge: 'La Bédoulé (13)',
    tags: ['17 panneaux', '7,25 kWc', 'Batterie 10kWh'],
  },
}

export const CaseStudyCard: Story = {
  name: 'Case study — Testimonial',
  decorators: cardDecorator,
  parameters: { layout: 'centered' },
  args: {
    imageUrl: 'https://images.unsplash.com/photo-1600180758890-6b94519a8ba6?w=600&q=80',
    imageOverlay: 'Voir le témoignage',
    tags: ['12 panneaux', '7,25 kWc', 'Batterie 10kWh'],
    products: [
      { imageUrl: panneauxImg, name: 'Panneaux x12', label: 'Dualsun' },
      { imageUrl: batterieImg, name: 'Batterie', label: 'Huawei' },
      { imageUrl: apSystemImg, name: 'Suivi temps réel', label: 'APsystem' },
    ],
    stats: [
      { label: 'Économies mensuelles', value: '220 €' },
      { label: 'Économies annuelles', value: '13 330 €' },
      { label: 'Autoconsommation', value: '83 %' },
    ],
  },
}

export const StepPhotoCard: Story = {
  name: 'Step + photo',
  decorators: cardDecorator,
  parameters: { layout: 'centered' },
  args: {
    surface: 'dark',
    imageUrl: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=600&q=80',
    circleContent: <span className="text-h5 font-black">1</span>,
    circleSize: 48,
    title: 'Visite technique offerte',
    body: "Un de nos techniciens se déplace chez vous pour étudier vos besoins et les possibilités d'installation.",
  },
}

export const ContentArrowCard: Story = {
  name: 'Content + arrow',
  decorators: cardDecorator,
  parameters: { layout: 'centered' },
  args: {
    title: 'Ni plus ni moins : un chauffage dimensionné pour vos besoins',
    body: 'Ni plus ni moins : un chauffage dimensionné pour vos besoins',
    cta: { label: 'En savoir plus', variant: 'arrow' },
    imageUrl: 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=600&q=80',
    imagePosition: 'bottom',
  },
}

export const MediaContentCard: Story = {
  name: 'Media + content',
  decorators: cardDecorator,
  parameters: { layout: 'centered' },
  args: {
    imageUrl: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&q=80',
    title: 'Réparation à domicile',
    body: "Un réparateur intervient chez vous en 24h pour réparer votre appareil. C'est simple & efficace !",
    cta: { label: 'Prendre RDV', variant: 'primary' },
  },
}
