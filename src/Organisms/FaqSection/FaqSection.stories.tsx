import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { FaqSection } from './FaqSection'

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
