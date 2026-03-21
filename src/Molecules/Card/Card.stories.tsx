import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Flashy, Sun1, Wind } from 'iconsax-react'
import { Card } from './Card'

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

function SurfaceStage({
  title,
  description,
  backgroundColor,
  children,
}: {
  title: string
  description: string
  backgroundColor: string
  children: React.ReactNode
}) {
  return (
    <div className="rounded-card p-6" style={{ backgroundColor }}>
      <h3 className="text-h6 font-bold text-text-default">{title}</h3>
      <p className="mt-2 text-text-small text-text-default" style={{ opacity: 0.78 }}>
        {description}
      </p>
      <div className="mt-5">
        {children}
      </div>
    </div>
  )
}

export const Overview: Story = {
  render: () => (
    <div className="flex max-w-6xl flex-col gap-10 p-8">
      <section className="max-w-3xl">
        <h2 className="text-h4 font-bold text-text-default">Card</h2>
        <p className="mt-2 text-text-small text-text-default" style={{ opacity: 0.78 }}>
          Cards group media, supporting facts, and a single clear action. They should feel calm enough for content to
          breathe, especially on mobile where strong borders can make already colorful surfaces feel crowded.
        </p>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        <GuidanceCard
          title="Use cards for grouped content"
          description="Choose this pattern when the user needs to scan a complete mini-story: image, headline, supporting detail, and one next step."
        />
        <GuidanceCard
          title="Let the surface do the work"
          description="Radius, spacing, and elevation should create separation first. Use borders only when structure or state really needs to be called out."
        />
        <GuidanceCard
          title="Keep mobile weight under control"
          tone="warning"
          description="Avoid adding a dark outline around an already filled or tinted card. It often increases visual noise more than clarity on small screens."
        />
        <GuidanceCard
          title="Cards don't use border outlines"
          tone="warning"
          description="A card outline adds a third edge to the page — alongside the section/grid boundary and any interior rule lines — making the layout feel crowded on mobile. Separation is handled entirely by box-shadow and background-color contrast. A card border must also pass a 3:1 contrast ratio against the surrounding surface across all five themes × four accents — a brittle check that the shadow system sidesteps by using luminance depth instead of stroke color."
        />
      </section>

      <section>
        <h3 className="text-h6 font-bold text-text-default mb-1">Cards on different surfaces</h3>
        <p className="mb-4 max-w-3xl text-text-small text-text-default" style={{ opacity: 0.78 }}>
          These examples are meant to teach when the card should carry separation itself and when the surrounding
          surface is already doing enough.
        </p>

        <div className="grid gap-4 md:grid-cols-3">
          <SurfaceStage
            title="Preferred: neutral page surface"
            description="A subtle shadow is enough to make the content block feel clickable and distinct."
            backgroundColor="#ffffff"
          >
            <Card
              title="Techniciens salaries Murfy"
              body="Pas de sous-traitance, pas de surprise - nos techniciens certifies interviennent chez vous."
              cta={{ label: 'En savoir plus', variant: 'primary' }}
            />
          </SurfaceStage>

          <SurfaceStage
            title="Preferred: tinted container"
            description="A softer tinted section can hold cards, but the card itself should stay calmer than the section around it."
            backgroundColor="#fff3f9"
          >
            <Card
              title="Fiabilite heritee du terrain"
              body="Une carte neutre dans une section teintee garde une hierarchie claire sans ajouter de contour fort."
              cta={{ label: 'En savoir plus', variant: 'accent' }}
            />
          </SurfaceStage>

          <SurfaceStage
            title="Avoid: border on top of color"
            description="A second dark outline on a colored card usually adds noise rather than hierarchy on mobile."
            backgroundColor="#ffde73"
          >
            <div
              className="rounded-card p-5"
              style={{
                backgroundColor: '#ffd800',
                border: '2px solid #032524',
              }}
            >
              <h4 className="text-h6 font-bold" style={{ color: '#032524' }}>Too heavy</h4>
              <p className="mt-2 text-text-small" style={{ color: '#032524', opacity: 0.82 }}>
                Prefer a calmer card surface or a neutral container instead of doubling down on outlines.
              </p>
            </div>
          </SurfaceStage>
        </div>
      </section>
    </div>
  ),
}

// ── 1. Service card ───────────────────────────────────────────────────────────
// Pink circle icon · title · subtitle · pricing · dark CTA button
export const ServiceCard: Story = {
  name: 'Service — PAC',
  decorators: cardDecorator,
  parameters: { layout: 'centered' },
  args: {
    circleContent: <Flashy size={56} color="var(--text)" variant="Bold" />,
    title: 'Pompe à chaleur',
    subtitle: 'Air-Air ou Air-Eau',
    prices: [
      { label: 'Air-Air à partir de', value: '2 500 €' },
      { label: 'Air-Eau à partir de', value: '14 500 €' },
    ],
    cta: { label: 'Demander un devis', variant: 'accent' },
  },
}

// ── 2. Project card ───────────────────────────────────────────────────────────
// Full photo · location badge · tag pills
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

// ── 3. Case study / testimonial card ─────────────────────────────────────────
// Photo + overlay · product row · stats table
export const CaseStudyCard: Story = {
  name: 'Case study — Testimonial',
  decorators: cardDecorator,
  parameters: { layout: 'centered' },
  args: {
    imageUrl: 'https://images.unsplash.com/photo-1600180758890-6b94519a8ba6?w=600&q=80',
    imageOverlay: 'Voir le témoignage',
    products: [
      { name: 'Panneaux x12', label: 'Dualsun' },
      { name: 'Batterie', label: 'Huawei' },
      { name: 'Suivi temps réel', label: 'APsystem' },
    ],
    stats: [
      { label: 'Économies mensuelles', value: '220 €' },
      { label: 'Économies annuelles', value: '13 330 €' },
      { label: 'Autoconsommation', value: '83 %' },
    ],
  },
}

// ── 4. Step + photo card ──────────────────────────────────────────────────────
// Full photo · step number circle · title · body
export const StepPhotoCard: Story = {
  name: 'Step + photo',
  decorators: cardDecorator,
  parameters: { layout: 'centered' },
  args: {
    imageUrl: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=600&q=80',
    circleContent: <span className="text-text-main-semibold font-black">1</span>,
    title: 'Analyse de consommation',
    body: 'On étudie vos factures et équipements existants pour comprendre vos besoins réels.',
  },
}

// ── 5. Content + arrow card ───────────────────────────────────────────────────
// Title · body · floating arrow circle · photo at bottom
export const ContentArrowCard: Story = {
  name: 'Content + arrow',
  decorators: cardDecorator,
  parameters: { layout: 'centered' },
  args: {
    title: 'Fiabilité héritée du terrain',
    body: 'Durabilité et savoir-faire depuis 2018 — chaque installation pensée pour durer.',
    cta: { label: 'En savoir plus', variant: 'arrow' },
    imageUrl: 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=600&q=80',
    imagePosition: 'bottom',
  },
}

// ── 6. Media + content card ───────────────────────────────────────────────────
// Photo at top · title · body · pink pill CTA
export const MediaContentCard: Story = {
  name: 'Media + content',
  decorators: cardDecorator,
  parameters: { layout: 'centered' },
  args: {
    imageUrl: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&q=80',
    title: 'Techniciens salariés Murfy',
    body: 'Pas de sous-traitance, pas de surprise — nos techniciens certifiés RGE interviennent chez vous.',
    cta: { label: 'En savoir plus', variant: 'primary' },
  },
}

// ── All 6 in a row ────────────────────────────────────────────────────────────
export const AllVariants: Story = {
  name: 'All variants',
  render: () => (
    <div className="flex flex-wrap gap-6 items-start" style={{ maxWidth: 1400 }}>
      {/* Service */}
      <div style={{ width: 300 }}>
        <Card
          circleContent={<Flashy size={56} color="var(--text)" variant="Bold" />}
          title="Pompe à chaleur"
          subtitle="Air-Air ou Air-Eau"
          prices={[
            { label: 'Air-Air à partir de', value: '2 500 €' },
            { label: 'Air-Eau à partir de', value: '14 500 €' },
          ]}
          cta={{ label: 'Demander un devis', variant: 'accent' }}
        />
      </div>
      {/* Project */}
      <div style={{ width: 300 }}>
        <Card
          imageUrl="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80"
          imageBadge="La Bédoulé (13)"
          tags={['17 panneaux', '7,25 kWc', 'Batterie 10kWh']}
        />
      </div>
      {/* Case study */}
      <div style={{ width: 300 }}>
        <Card
          imageUrl="https://images.unsplash.com/photo-1600180758890-6b94519a8ba6?w=600&q=80"
          imageOverlay="Voir le témoignage"
          products={[
            { name: 'Panneaux x12', label: 'Dualsun' },
            { name: 'Batterie', label: 'Huawei' },
            { name: 'Suivi temps réel', label: 'APsystem' },
          ]}
          stats={[
            { label: 'Économies mensuelles', value: '220 €' },
            { label: 'Économies annuelles', value: '13 330 €' },
            { label: 'Autoconsommation', value: '83 %' },
          ]}
        />
      </div>
      {/* Step + photo */}
      <div style={{ width: 300 }}>
        <Card
          imageUrl="https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=600&q=80"
          circleContent={<span className="text-text-main-semibold font-black">1</span>}
          title="Analyse de consommation"
          body="On étudie vos factures et équipements existants pour comprendre vos besoins réels."
        />
      </div>
      {/* Content + arrow */}
      <div style={{ width: 300 }}>
        <Card
          title="Fiabilité héritée du terrain"
          body="Durabilité et savoir-faire depuis 2018 — chaque installation pensée pour durer."
          cta={{ label: 'En savoir plus', variant: 'arrow' }}
          imageUrl="https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=600&q=80"
          imagePosition="bottom"
        />
      </div>
      {/* Media + content */}
      <div style={{ width: 300 }}>
        <Card
          imageUrl="https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&q=80"
          title="Techniciens salariés Murfy"
          body="Pas de sous-traitance, pas de surprise — nos techniciens certifiés RGE interviennent chez vous."
          cta={{ label: 'En savoir plus', variant: 'primary' }}
        />
      </div>
    </div>
  ),
}
