import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { TextLink } from './TextLink'
import { DocHeader, DocSection, GuidanceGrid } from '../../Foundation/doc-components'

const meta: Meta<typeof TextLink> = {
  title: 'Atoms/TextLink',
  component: TextLink,
  parameters: { layout: 'fullscreen' },
  argTypes: {
    size: { control: 'select', options: ['large', 'main', 'small', 'xsmall'] },
    arrow: { control: 'boolean' },
  },
}
export default meta
type Story = StoryObj<typeof TextLink>

function DocRow({ title, description, children }: { title: string; description: string; children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-5 border-t border-border">
      <div>
        <h4 className="text-text-small-semibold text-text">{title}</h4>
        <p className="text-text-xsmall text-text mt-1" style={{ opacity: 0.65 }}>{description}</p>
      </div>
      <div className="md:col-span-2 flex flex-wrap items-center gap-4">
        {children}
      </div>
    </div>
  )
}

export const Overview: Story = {
  render: () => (
    <div className="min-h-screen" style={{ background: 'var(--bg)' }}>
      <DocHeader
        layer="Atoms"
        title="TextLink"
        description="Lien hypertexte — texte souligné pour les actions secondaires et les renvois éditoriaux. Basé sur le composant Figma « Lien hypertexte » (node 337:37916)."
      />

      <div className="px-8 py-12 max-w-4xl">

        <DocSection label="Tailles" subtitle="Même échelle que le corps de texte — le lien hérite de la taille de son contexte.">
          <DocRow title="Large (18px)" description="Intro paragraphs, hero copy.">
            <TextLink size="large" href="#">En savoir plus</TextLink>
            <TextLink size="large" href="#" arrow>Voir le catalogue</TextLink>
          </DocRow>
          <DocRow title="Main (16px)" description="Corps de texte standard.">
            <TextLink size="main" href="#">En savoir plus</TextLink>
            <TextLink size="main" href="#" arrow>Voir le catalogue</TextLink>
          </DocRow>
          <DocRow title="Small (14px)" description="Contexte par défaut — correspond exactement au composant Figma.">
            <TextLink size="small" href="#">En savoir plus</TextLink>
            <TextLink size="small" href="#" arrow>Voir le catalogue</TextLink>
          </DocRow>
          <DocRow title="XSmall (12px)" description="Labels, notes de bas de page, mentions légales.">
            <TextLink size="xsmall" href="#">En savoir plus</TextLink>
            <TextLink size="xsmall" href="#" arrow>Voir le catalogue</TextLink>
          </DocRow>
        </DocSection>

        <DocSection label="Dans le texte" subtitle="Le lien doit être identifiable par son seul style — couleur + soulignement — sans icône obligatoire.">
          <div
            className="rounded-[var(--radius-card)] border border-border p-6 text-text-main text-text leading-relaxed"
          >
            Nos réparateurs interviennent chez vous en moins de 48h.{' '}
            <TextLink size="main" href="#">Vérifier ma zone</TextLink>{' '}
            pour confirmer la disponibilité dans votre ville. Si vous avez une question avant de réserver,{' '}
            <TextLink size="main" href="#">contactez-nous</TextLink>{' '}
            — on répond rapidement.
          </div>
        </DocSection>

        <DocSection label="Avec flèche" subtitle="Utilisée pour les liens de navigation — « En savoir plus », « Voir le détail ». Ne pas utiliser à l'intérieur d'un paragraphe.">
          <div className="flex flex-col gap-3">
            <TextLink size="small" href="#" arrow>En savoir plus</TextLink>
            <TextLink size="main" href="#" arrow>Voir le détail</TextLink>
            <TextLink size="large" href="#" arrow>Voir le catalogue</TextLink>
          </div>
        </DocSection>

        <DocSection label="Bonnes pratiques" subtitle="">
          <GuidanceGrid
            dos={[
              {
                rule: 'Texte de lien descriptif — le lien doit faire sens hors contexte.',
                rationale: '"Vérifier ma zone" est préférable à "cliquer ici". Les lecteurs d\'écran listent les liens isolément.',
              },
              {
                rule: 'Utiliser la flèche (arrow) pour les liens de navigation entre pages.',
                rationale: 'La flèche signal une transition de page, pas une action inline.',
              },
              {
                rule: 'Taille cohérente avec le texte environnant.',
                rationale: 'Un lien `size="xsmall"` dans un paragraphe `text-main` rompt le rythme typographique.',
              },
            ]}
            donts={[
              {
                rule: 'Ne pas utiliser "Cliquez ici" ou "En savoir davantage".',
                rationale: 'Formules sans contexte — ni pour le lecteur, ni pour les moteurs de recherche.',
              },
              {
                rule: 'Ne pas remplacer un bouton primaire par un TextLink.',
                rationale: 'Le TextLink est une action secondaire. Pour la conversion principale, utiliser Button.',
              },
              {
                rule: 'Ne pas ajouter de flèche à un lien inline dans un paragraphe.',
                rationale: 'La flèche crée une rupture visuelle dans le flux du texte.',
              },
            ]}
          />
        </DocSection>

      </div>
    </div>
  ),
}

export const Playground: Story = {
  args: { children: 'En savoir plus', size: 'small', arrow: true, href: '#' },
}
