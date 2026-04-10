import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { MessageText1 } from 'iconsax-react'
import { DocHeader, DocSection, GuidanceGrid } from './doc-components'

// ─── ToneChip ────────────────────────────────────────────────────────────────

type ToneVariant = 'always' | 'often' | 'sometimes' | 'never'

const TONE_STYLES: Record<ToneVariant, { bg: string; color: string }> = {
  always: {
    bg: 'color-mix(in srgb, #22c55e 12%, transparent)',
    color: '#15803d',
  },
  often: {
    bg: 'color-mix(in srgb, var(--accent-btn-bg) 12%, transparent)',
    color: 'var(--accent-btn-bg)',
  },
  sometimes: {
    bg: 'color-mix(in srgb, #eab308 14%, transparent)',
    color: '#92400e',
  },
  never: {
    bg: 'color-mix(in srgb, #ef4444 10%, transparent)',
    color: '#b91c1c',
  },
}

function ToneChip({ label, variant }: { label: string; variant: ToneVariant }) {
  const s = TONE_STYLES[variant]
  return (
    <span
      className="inline-block rounded-[var(--radius-pill)] px-3 py-1 text-text-small-semibold"
      style={{ background: s.bg, color: s.color }}
    >
      {label}
    </span>
  )
}

// ─── ToneDial ────────────────────────────────────────────────────────────────

interface ToneColumn {
  label: string
  variant: ToneVariant
  items: string[]
}

function ToneDial({ columns }: { columns: ToneColumn[] }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
      {columns.map((col) => (
        <div key={col.label} className="flex flex-col gap-3">
          <p
            className="text-label uppercase tracking-[0.08em] font-semibold pb-2"
            style={{
              color: TONE_STYLES[col.variant].color,
              borderBottom: `2px solid ${TONE_STYLES[col.variant].color}`,
            }}
          >
            {col.label}
          </p>
          <div className="flex flex-col gap-2">
            {col.items.map((item) => (
              <ToneChip key={item} label={item} variant={col.variant} />
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

// ─── TraitCloud ──────────────────────────────────────────────────────────────

function TraitCloud({ traits }: { traits: string[] }) {
  return (
    <div className="flex flex-wrap gap-2">
      {traits.map((t) => (
        <span
          key={t}
          className="rounded-[var(--radius-pill)] px-4 py-2 text-text-small-semibold"
          style={{
            background: 'color-mix(in srgb, var(--accent-btn-bg) 10%, transparent)',
            color: 'var(--accent-btn-bg)',
            border: '1px solid color-mix(in srgb, var(--accent-btn-bg) 25%, transparent)',
          }}
        >
          {t}
        </span>
      ))}
    </div>
  )
}

// ─── MissionKeyword ──────────────────────────────────────────────────────────

function MissionKeyword({ label }: { label: string }) {
  return (
    <div
      className="rounded-[var(--radius-card)] px-4 py-3 flex items-center gap-3"
      style={{
        background: 'var(--bg)',
        border: '1px solid var(--border)',
      }}
    >
      <span
        className="w-2 h-2 rounded-full flex-shrink-0"
        style={{ background: 'var(--accent-btn-bg)' }}
      />
      <span className="text-text-small text-text">{label}</span>
    </div>
  )
}

// ─── PunchlineCard ───────────────────────────────────────────────────────────

function PunchlineCard({ quote }: { quote: string }) {
  return (
    <blockquote
      className="pl-4 py-2 text-text-small-semibold text-text italic"
      style={{
        borderLeft: '3px solid var(--accent-btn-bg)',
        opacity: 0.85,
      }}
    >
      « {quote} »
    </blockquote>
  )
}

// ─── WordList ────────────────────────────────────────────────────────────────

type WordListKind = 'allowed' | 'forbidden' | 'exception'

const WORD_LIST_STYLES: Record<WordListKind, { label: string; dotColor: string; textColor?: string; strikethrough?: boolean }> = {
  allowed: { label: 'Autorisé', dotColor: '#22c55e' },
  forbidden: { label: 'Interdit', dotColor: '#ef4444', textColor: '#b91c1c', strikethrough: true },
  exception: { label: 'Exception', dotColor: '#eab308', textColor: '#92400e' },
}

interface WordListProps {
  kind: WordListKind
  words: string[]
  note?: string
}

function WordList({ kind, words, note }: WordListProps) {
  const s = WORD_LIST_STYLES[kind]
  return (
    <div className="flex flex-col gap-2">
      <p
        className="text-label uppercase tracking-[0.08em] font-semibold mb-1"
        style={{ color: s.dotColor }}
      >
        {s.label}
      </p>
      {words.map((w) => (
        <div key={w} className="flex items-start gap-2">
          <span
            className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-[7px]"
            style={{ background: s.dotColor }}
          />
          <span
            className="text-text-small text-text"
            style={{
              color: s.textColor ?? 'var(--text)',
              textDecoration: s.strikethrough ? 'line-through' : undefined,
              opacity: s.strikethrough ? 0.7 : 1,
            }}
          >
            {w}
          </span>
        </div>
      ))}
      {note && (
        <p className="text-text-xsmall mt-1" style={{ color: 'var(--text)', opacity: 0.5 }}>
          {note}
        </p>
      )}
    </div>
  )
}

// ─── VocabBlock ──────────────────────────────────────────────────────────────

interface VocabBlockProps {
  title: string
  allowed?: string[]
  forbidden?: string[]
  exception?: string[]
  exceptionNote?: string
}

function VocabBlock({ title, allowed, forbidden, exception, exceptionNote }: VocabBlockProps) {
  return (
    <div
      className="rounded-[var(--radius-card)] p-5 flex flex-col gap-5"
      style={{ background: 'var(--bg)', border: '1px solid var(--border)' }}
    >
      <p className="text-h6 font-bold text-text">{title}</p>
      <div className="flex flex-col gap-5">
        {allowed && <WordList kind="allowed" words={allowed} />}
        {forbidden && <WordList kind="forbidden" words={forbidden} />}
        {exception && <WordList kind="exception" words={exception} note={exceptionNote} />}
      </div>
    </div>
  )
}

// ─── Page ────────────────────────────────────────────────────────────────────

function ToneOfVoicePage() {
  return (
    <div className="px-8 py-10 max-w-5xl" style={{ color: 'var(--text)' }}>
      <DocHeader
        layer="Foundation"
        title="Tone of Voice"
        description="La voix officielle de Murfy — telle que définie dans la Charte Graphique 2.0. Référence pour tout contenu : site, composants, micro-copies, communications."
        icon={<MessageText1 size={20} />}
      />

      {/* ── 1. Le ton ──────────────────────────────────────────────────────── */}
      <div className="mt-10">
        <DocSection
          label="Le ton"
          subtitle="Quatre registres qui définissent le spectre émotionnel de Murfy. Chaque contenu doit s'inscrire dans cette grille."
        >
          <ToneDial
            columns={[
              {
                label: 'Toujours',
                variant: 'always',
                items: ['Positif', 'Engagé & engageant', "Va de l'avant", 'Sûr', 'Objectif', 'Rassurant', 'Pratique', 'Incitatif'],
              },
              {
                label: 'Souvent',
                variant: 'often',
                items: ['Complice', 'Militant', 'Direct', 'Pragmatique', 'Astucieux'],
              },
              {
                label: 'Parfois',
                variant: 'sometimes',
                items: ['Décalé', 'Drôle', 'Léger'],
              },
              {
                label: 'Jamais',
                variant: 'never',
                items: ['Donneur de leçon', 'Moralisateur', 'Pessimiste', 'Négatif', 'Racoleur', 'Déconneur'],
              },
            ]}
          />
        </DocSection>

        {/* ── 2. La personnalité ────────────────────────────────────────────── */}
        <DocSection
          label="La personnalité"
          subtitle="L'identité de Murfy en onze traits. Ces attributs guident le ton dans chaque prise de parole."
        >
          <TraitCloud
            traits={[
              'Expérimenté',
              'Astucieux',
              'Convaincu & convaincant',
              "Ouvert d'esprit",
              'Curieux',
              'Altruiste',
              'Bienveillant',
              'Accessible',
              "À l'écoute",
              'Disponible',
              'Confiant',
            ]}
          />
        </DocSection>

        {/* ── 3. La mission ─────────────────────────────────────────────────── */}
        <DocSection
          label="La mission — réparer au lieu de jeter"
          subtitle="Les mots-clés qui ancrent le discours Murfy dans son engagement environnemental et sociétal."
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-8">
            {[
              'Écologie',
              'Environnement',
              'Durabilité',
              'Économie circulaire',
              'Responsable / Responsabilité',
              'Valorisation du métier de technicien',
              'Faire adopter un réflexe',
              'Changer les habitudes',
              'Lutter contre la surconsommation',
              'Faire attention à nos déchets',
              'Bonnes pratiques pour la planète',
            ].map((kw) => (
              <MissionKeyword key={kw} label={kw} />
            ))}
          </div>

          <p
            className="text-label uppercase tracking-[0.08em] font-semibold mb-4"
            style={{ color: 'var(--accent-btn-bg)' }}
          >
            Expressions & punchlines officielles
          </p>
          <div className="flex flex-col gap-3">
            <PunchlineCard quote="Réparer plutôt que de jeter" />
            <PunchlineCard quote="Le meilleur déchet, c'est celui que l'on ne produit pas !" />
            <PunchlineCard quote="MURFY c'est la nouvelle habitude à adopter pour diminuer nos déchets" />
            <PunchlineCard quote="MURFY, la solution clé en main qui donne le réflexe de réparer plutôt que de jeter" />
            <PunchlineCard quote="La mission de MURFY : installer le réflexe réparation chez tous les français." />
            <PunchlineCard quote="En réparant plutôt qu'en rachetant du neuf, avec MURFY, vous adoptez le bon réflexe pour réduire les déchets d'électroménager, et envisager un monde plus durable" />
            <PunchlineCard quote="Les héros de demain seront les réparateurs d'électroménager !" />
            <PunchlineCard quote="Chez MURFY, on souhaite impulser le réflexe de la réparation chez tout le monde" />
            <PunchlineCard quote="MURFY beaucoup" />
            <PunchlineCard quote="MURFY, et ça répare !" />
          </div>
        </DocSection>

        {/* ── 4. L'univers sémantique ────────────────────────────────────────── */}
        <DocSection
          label="L'univers sémantique"
          subtitle="Les règles éditoriales qui s'appliquent à tous les textes Murfy, quel que soit le canal."
        >
          <GuidanceGrid
            dos={[
              {
                rule: 'Vouvoiement',
                rationale: 'Toujours vouvoyer le client — y compris sur les réseaux sociaux. Le « vous » est chaleureux et respectueux.',
              },
              {
                rule: 'Phrases courtes & punchlines',
                rationale: 'Une idée, une phrase. Les contenus Murfy sont scannés, pas lus linéairement.',
              },
              {
                rule: 'Mots simples',
                rationale: 'Pas de jargon technique. Ce que comprend un client non-initié est ce qu\'on écrit.',
              },
              {
                rule: 'Ponctuation adaptée',
                rationale: "Ponctuation juste et sobre — jamais excessive. L'emphase vient des mots, pas des points d'exclamation.",
              },
              {
                rule: 'Proximité — ton amical & chaleureux',
                rationale: 'Murfy est proche de ses clients. Le ton est accessible, humain, jamais froid ni distant.',
              },
              {
                rule: 'Tournures toujours positives',
                rationale: 'Reformuler le négatif en positif. « Votre appareil semble fonctionner normalement » plutôt que « Aucun problème détecté ».',
              },
            ]}
            donts={[
              {
                rule: 'Tutoiement — même sur les réseaux sociaux',
                rationale: 'Le « tu » n\'est jamais utilisé, quel que soit le canal ou la cible.',
              },
              {
                rule: 'Jargon technique',
                rationale: 'Les termes SAV, itinérant, planneur, créneau, intervention… sont réservés à l\'usage interne.',
              },
              {
                rule: 'Leçons de morales',
                rationale: 'Murfy ne culpabilise pas et ne prescrit pas de comportement. On propose, on ne moralise pas.',
              },
            ]}
          />
        </DocSection>

        {/* ── 5. Qui est Murfy ? ────────────────────────────────────────────── */}
        <DocSection
          label="Qui est Murfy ?"
          subtitle="Le vocabulaire officiel pour parler de l'entreprise, de son secteur et de ses équipes."
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <VocabBlock
              title="Notre secteur d'activité"
              allowed={[
                "Monde d'après",
                'Économie sociale et solidaire',
                'Économie circulaire',
                'Anti-gaspillage',
                'Lutte contre la surconsommation',
              ]}
            />
            <VocabBlock
              title="L'entreprise"
              allowed={[
                'Entreprise',
                'Entreprise française',
                'Entreprise de demain',
                'Acteur du changement',
                'PME',
                'Made in France',
                'Entreprise régionale / locale',
              ]}
              forbidden={['Marque']}
              exception={['Start-up', "Entreprise de l'ESS"]}
              exceptionNote="Uniquement en communication corporate"
            />
            <VocabBlock
              title="Nos techniciens"
              allowed={[
                'Techniciens',
                'Réparateurs',
                'Experts',
                'Experts de la réparation',
                'Salariés MURFY',
                'Service client',
                'Héros / Super héros / Héros de demain',
              ]}
              forbidden={['Techniciens itinérants', 'Géo-trouve-tout']}
              exceptionNote="« Techniciens itinérants » uniquement en RH / communication BtoB"
            />
          </div>
        </DocSection>

        {/* ── 6. Murfy Académie ─────────────────────────────────────────────── */}
        <DocSection
          label="Murfy Académie"
          subtitle="Comment parler de notre centre de formation et de notre programme de recrutement."
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl">
            <VocabBlock
              title="Murfy Académie"
              allowed={[
                'Académie',
                'Académiciens',
                'Centre de formation',
                'Formation',
                'Recrutement',
                'Métier de demain',
                'Revaloriser le métier de réparateur',
              ]}
              forbidden={['Écoles']}
            />
          </div>
        </DocSection>

        {/* ── 7. Nos métiers ────────────────────────────────────────────────── */}
        <DocSection
          label="Nos métiers"
          subtitle="Le lexique précis pour chacun de nos domaines d'activité. La cohérence du vocabulaire construit la confiance."
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <VocabBlock
              title="Cœur de métier"
              allowed={[
                'Service',
                'Réparation',
                'Reconditionnement',
                'Forfait réparation',
                'Forfait fixe / Unique',
                'Prix juste',
                "Bon d'achat",
                'Électroménager',
                'Appareil',
                'Appareils électroménagers',
                'Rendez-vous',
                'Une solution pour 100% des pannes',
              ]}
              forbidden={[
                'Avoir',
                'Promo / Promotion',
                'Affaire',
                'Machine',
                'Produit',
                'Passage (1er passage / 2ème passage)',
                'Intervention',
                'Créneau',
                'Pack « zéro risque »',
              ]}
            />
            <VocabBlock
              title="La réparation"
              allowed={[
                'Réparation',
                'Réparation à domicile',
                'Service',
                'Techniciens compétents',
                'Forfait fixe / unique',
                'Dépanner',
                'Sauver',
                'Prolonger la vie des appareils',
                'Pièces détachées',
                'Coup de la panne',
                'Atelier de reconditionnement',
                'Difficulté à réparer à domicile',
                'Rendez-vous',
                'Une solution pour 100% des pannes',
              ]}
              forbidden={[
                'Baguette magique',
                'Allo Maman Bobo',
                'Non réparable',
                'Machine',
              ]}
            />
            <VocabBlock
              title="Le reconditionné"
              allowed={[
                'Reconditionner / reconditionné',
                'Prolonger la durée de vie des appareils',
                'Offrir une seconde vie',
                'Offrir un nouveau foyer',
                'Faire du neuf avec du vieux',
                'Comme neuf / Comme du neuf',
                'Reconditionné dans nos ateliers',
                'Reconditionné par nos techniciens',
                'Réemploi',
                'Collecte',
                'Remettre en état',
                'Collecter / récupérer les appareils qui ne servent plus',
              ]}
              forbidden={['Approvisionnement', 'Récup\'']}
              exception={['Rebush']}
              exceptionNote="Uniquement en région parisienne"
            />
            <VocabBlock
              title="La collecte"
              allowed={[
                'Nouveau foyer',
                'Déchets électroménager',
                'Appareils oubliés',
                'Appareils abandonnés',
                'Appareils usagés',
              ]}
              forbidden={['Approvisionnement', 'Récupération / Récup\'']}
            />
          </div>
        </DocSection>

        {/* ── 8. Expérience client ──────────────────────────────────────────── */}
        <DocSection
          label="Expérience client"
          subtitle="Le vocabulaire associé à chaque point de contact avec le client — du diagnostic à la boutique."
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <VocabBlock
              title="Entretien des appareils"
              allowed={[
                'Prendre soin',
                'Bichonner',
                "S'occuper de",
                'Comme neuf',
                'Reparti pour un tour',
                'Entretenir / Entretien',
                'Prolonger la durée de vie',
                'Éviter les pannes',
              ]}
            />
            <VocabBlock
              title="Auto-diagnostic"
              allowed={[
                'Outil',
                'Auto réparation',
                'Auto-diagnostic',
                'Pré-diagnostic',
              ]}
            />
            <VocabBlock
              title="Blog Murfy"
              allowed={[
                'Blog / Blog Murfy',
                'Tutos',
                'Articles',
                'Conseils',
                'Astuces',
              ]}
              forbidden={['Tonton MURFY']}
            />
            <VocabBlock
              title="Boutique en ligne"
              allowed={[
                'Boutique en ligne',
                'Boutique MURFY / MURFY Boutique',
                "S'équiper",
                'Site E-commerce',
                'Commande en ligne',
              ]}
              forbidden={['E-commerce']}
              exception={['MURFY shop', 'E-shop']}
              exceptionNote="Exceptions uniquement sur les réseaux sociaux"
            />
            <VocabBlock
              title="Service client"
              allowed={[
                'Service client',
                'Équipe « prise de rendez-vous »',
                'Équipe « suivi rendez-vous »',
                'Équipe « assistance client »',
                'Équipe Collecte',
                'SAV',
              ]}
              forbidden={[
                'Opérateur / opératrice',
                'Planneur',
                'Support',
                'Prise en charge',
              ]}
            />
          </div>
        </DocSection>
      </div>
    </div>
  )
}

// ─── Storybook meta ───────────────────────────────────────────────────────────

const meta = {
  title: 'Foundation/Tone of Voice',
  component: ToneOfVoicePage,
  parameters: {
    layout: 'fullscreen',
    docs: { canvas: { sourceState: 'hidden' } },
  },
} satisfies Meta<typeof ToneOfVoicePage>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
