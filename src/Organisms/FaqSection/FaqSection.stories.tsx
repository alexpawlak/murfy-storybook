import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { FaqSection } from './FaqSection'
import { DocHeader, DocSection, GuidanceGrid, AccessibilityNote } from '../../Foundation/doc-components'

const meta: Meta<typeof FaqSection> = {
  title: 'Organisms/FaqSection',
  component: FaqSection,
  parameters: { layout: 'fullscreen' },
  argTypes: {
    heading: { control: 'text' },
    subheading: { control: 'text' },
  },
}
export default meta
type Story = StoryObj<typeof FaqSection>

const defaultItems = [
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
  {
    question: 'Formez-vous au métier de Réparateur Electroménager',
    answer:
      "Murfy propose des formations certifiantes pour devenir technicien en réparation d'électroménager. Un métier d'avenir, utile et concret.",
  },
]

const defaultBody = (
  <>
    {"Murfy c'est une jeune PME qui a décidé de s'attaquer à nos déchets électroménagers et à l'obsolescence programmée. Chez Murfy nous avons à cœur de vous accompagner dans "}
    <span style={{ textDecoration: 'underline' }}>
      {"la réparation d'électroménager"}
    </span>
    {" pour prolonger la durée de vie de vos appareils électroménagers et ainsi éviter des déchets inutiles. Chez Murfy, il y a forcément une solution pour chaque panne. Ainsi plusieurs solutions s'offrent à vous."}
  </>
)

export const Overview: Story = {
  render: () => (
    <div className="min-h-screen" style={{ background: 'var(--bg)' }}>
      <DocHeader
        layer="Organisms"
        title="FaqSection"
        description="A full-page FAQ section: heading + intro text + expandable AccordionItem list. Used on the homepage and vertical-specific pages to answer common customer questions and improve SEO through structured content."
      />
      <div className="px-8 py-12 max-w-4xl">
        <DocSection label="Composition">
          <div className="rounded-[var(--radius-card)] border border-border px-5 py-4 mb-6" style={{ background: 'color-mix(in srgb, var(--accent-btn-bg) 5%, var(--bg))' }}>
            <p className="text-text-small text-text" style={{ opacity: 0.75 }}>
              <strong>Molecules used:</strong> AccordionItem (× n), Accordion group
              <br />
              <strong>Layout:</strong> Heading + body text column left, accordion list right — two-column on desktop
              <br />
              <strong>Accent:</strong> Switch the Accent toolbar to see the section adapt to each vertical (Chauffage, Solaire, etc.)
            </p>
          </div>
        </DocSection>
        <DocSection label="Best Practices">
          <GuidanceGrid
            dos={[
              { rule: 'Write questions from the customer\'s perspective, not the brand\'s.', rationale: '"Combien coûte une réparation ?" (customer voice) is more findable in search and more resonant than "Tarification de nos services" (brand voice). FAQ content is often indexed by search engines.' },
              { rule: 'Order questions by frequency — most common first.', rationale: 'Users scan the first 2–3 questions before deciding whether to scroll. Putting low-frequency questions first means most users leave without getting an answer to their actual question.' },
            ]}
            donts={[
              { rule: 'Do not open all accordion items by default.', rationale: 'An FAQ with all items open is a wall of text. The accordion contract is: questions visible, answers hidden until requested. Opening all defeats the scan-then-read interaction model.', wcag: 'WCAG 2.1 AA 4.1.2' },
              { rule: 'Do not put the only instance of key pricing info inside an accordion.', rationale: 'Information inside a collapsed accordion has lower discoverability. Pricing must also appear in the hero/CTA areas — the FAQ answer is a supplement, not the primary source.' },
            ]}
          />
        </DocSection>
        <DocSection label="Accessibility & WCAG">
          <div className="flex flex-col gap-4">
            <AccessibilityNote
              criterion="WCAG 2.1 AA 4.1.2 — Name, Role, Value"
              requirement="Each accordion trigger must expose role, expanded state, and associated panel"
              why="Screen readers must announce each FAQ question as an interactive button with its expand/collapse state. Without aria-expanded and aria-controls, users cannot determine which questions have answers or navigate between them using keyboard shortcuts for buttons."
              href="https://www.w3.org/WAI/WCAG21/Understanding/name-role-value.html"
            />
            <AccessibilityNote
              criterion="WCAG 2.1 AA 2.4.6 — Headings and Labels"
              requirement="Section must have a descriptive heading at the correct hierarchy level"
              why="The FaqSection heading must use the correct HTML heading level (h2 on the homepage, h3 if nested inside a section with its own h2). Screen reader users navigate by headings — a skipped level or incorrect level disrupts the document outline."
            />
          </div>
        </DocSection>
      </div>
    </div>
  ),
}

export const Default: Story = {
  args: {
    heading: "Notre expertise en réparation d'électroménager",
    subheading: "Murfy, l'expert de l'électroménager en France",
    body: defaultBody,
    items: defaultItems,
  },
}

export const Chauffage: Story = {
  args: {
    heading: 'Notre expertise en réparation de chauffage',
    subheading: "Murfy, l'expert du chauffage en France",
    body: "Murfy intervient sur tous vos équipements de chauffage : chaudières, pompes à chaleur, radiateurs. Nos techniciens qualifiés vous accompagnent de l'entretien à la réparation pour garantir votre confort toute l'année.",
    items: [
      {
        question: 'Quels types de chauffages réparez-vous ?',
        answer: "Nous intervenons sur les chaudières gaz, pompes à chaleur, radiateurs électriques et planchers chauffants.",
      },
      {
        question: 'Mon chauffage ne démarre plus, que faire ?',
        answer: "Nos techniciens peuvent diagnostiquer et réparer la plupart des pannes de démarrage lors d'une seule intervention.",
      },
      {
        question: "Proposez-vous des contrats d'entretien ?",
        answer: "Oui, nous proposons des contrats d'entretien annuel pour garantir la longévité et l'efficacité de votre chauffage.",
      },
    ],
  },
  decorators: [
    (Story) => (
      <div data-accent="violet">
        <Story />
      </div>
    ),
  ],
}
