import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { MessageText1 } from 'iconsax-react'
import { DocHeader, DocSection, GuidanceGrid } from './doc-components'
import { Button } from '../Atoms/Button/Button'
import { TextLink } from '../Atoms/TextLink/TextLink'

// ─── Pillar card ──────────────────────────────────────────────────────────────

interface PillarProps {
  number: string
  title: string
  description: string
  quote: string
}

function PillarCard({ number, title, description, quote }: PillarProps) {
  return (
    <div
      className="rounded-[var(--radius-card)] border border-border p-6 flex flex-col gap-3"
      style={{ background: 'var(--bg)' }}
    >
      <span
        className="text-label uppercase tracking-[0.08em] font-semibold"
        style={{ color: 'var(--accent-btn-bg)' }}
      >
        {number}
      </span>
      <h3 className="text-h5 font-bold text-text">{title}</h3>
      <p className="text-text-small text-text" style={{ opacity: 0.65 }}>
        {description}
      </p>
      <blockquote
        className="mt-1 pl-3 text-text-small-semibold text-text italic"
        style={{
          borderLeft: '3px solid var(--accent-btn-bg)',
          opacity: 0.85,
        }}
      >
        "{quote}"
      </blockquote>
    </div>
  )
}

// ─── Vocabulary table ─────────────────────────────────────────────────────────

interface VocabRow {
  say: string
  avoid: string
  note?: string
}

function VocabTable({ rows }: { rows: VocabRow[] }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse text-text-small">
        <thead>
          <tr style={{ borderBottom: '2px solid var(--border)' }}>
            <th className="text-left py-2 pr-6 text-text-small-semibold text-text w-1/3">
              On dit
            </th>
            <th className="text-left py-2 pr-6 text-text-small-semibold text-text w-1/3">
              On évite
            </th>
            <th
              className="text-left py-2 text-text-small-semibold text-text w-1/3"
              style={{ opacity: 0.5 }}
            >
              Pourquoi
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr
              key={i}
              className="border-t border-border"
              style={{ borderColor: 'var(--border)' }}
            >
              <td className="py-3 pr-6">
                <span
                  className="inline-block rounded-[var(--radius-pill)] px-2.5 py-0.5 text-label uppercase tracking-[0.08em] font-semibold"
                  style={{
                    background: 'color-mix(in srgb, #22c55e 12%, transparent)',
                    color: '#15803d',
                  }}
                >
                  {row.say}
                </span>
              </td>
              <td className="py-3 pr-6">
                <span
                  className="inline-block rounded-[var(--radius-pill)] px-2.5 py-0.5 text-label uppercase tracking-[0.08em] font-semibold line-through"
                  style={{
                    background: 'color-mix(in srgb, #ef4444 10%, transparent)',
                    color: '#b91c1c',
                  }}
                >
                  {row.avoid}
                </span>
              </td>
              <td className="py-3 text-text" style={{ opacity: 0.55 }}>
                {row.note ?? '—'}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

// ─── CTA template block ───────────────────────────────────────────────────────

interface CtaExample {
  label: string
  type: 'primary' | 'secondary' | 'link' | 'avoid'
  note?: string
  arrow?: boolean
}

const CTA_TYPE_LABEL: Record<CtaExample['type'], string> = {
  primary: 'Bouton principal',
  secondary: 'Bouton secondaire',
  link: 'Lien texte',
  avoid: 'À éviter',
}

function CtaRow({ label, type, note, arrow }: CtaExample) {
  return (
    <div className="flex items-center gap-4 py-3 border-t border-border">
      <div className="w-36 flex-shrink-0">
        <span
          className="text-label uppercase tracking-[0.08em] font-semibold"
          style={{ color: 'var(--text)', opacity: 0.4 }}
        >
          {CTA_TYPE_LABEL[type]}
        </span>
      </div>
      <div className="flex-shrink-0">
        {type === 'primary' && <Button variant="primary" size="sm">{label}</Button>}
        {type === 'secondary' && <Button variant="secondary" size="sm">{label}</Button>}
        {type === 'link' && <TextLink size="small" arrow={arrow}>{label}</TextLink>}
        {type === 'avoid' && (
          <span
            className="text-text-small-semibold line-through"
            style={{ color: '#b91c1c', opacity: 0.7 }}
          >
            {label}
          </span>
        )}
      </div>
      {note && (
        <p className="text-text-xsmall text-text" style={{ opacity: 0.5 }}>
          {note}
        </p>
      )}
    </div>
  )
}

// ─── Micro-copy block ─────────────────────────────────────────────────────────

interface MicroRow {
  context: string
  copy: string
  avoid?: string
}

function MicroCopyTable({ rows }: { rows: MicroRow[] }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse text-text-small">
        <thead>
          <tr style={{ borderBottom: '2px solid var(--border)' }}>
            <th className="text-left py-2 pr-6 text-text-small-semibold text-text w-1/4">
              Contexte
            </th>
            <th className="text-left py-2 pr-6 text-text-small-semibold text-text w-1/3">
              On écrit
            </th>
            <th
              className="text-left py-2 text-text-small-semibold text-text w-1/3"
              style={{ opacity: 0.5 }}
            >
              Pas ça
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr
              key={i}
              className="border-t border-border"
              style={{ borderColor: 'var(--border)' }}
            >
              <td
                className="py-3 pr-6 text-text-xsmall-semibold uppercase tracking-[0.06em] text-text"
                style={{ opacity: 0.45 }}
              >
                {row.context}
              </td>
              <td className="py-3 pr-6 text-text font-medium">{row.copy}</td>
              <td className="py-3 text-text" style={{ opacity: 0.4 }}>
                {row.avoid ? (
                  <span style={{ textDecoration: 'line-through' }}>{row.avoid}</span>
                ) : (
                  '—'
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

// ─── Banned phrase card ───────────────────────────────────────────────────────

function BannedPhrase({ phrase, reason }: { phrase: string; reason: string }) {
  return (
    <div
      className="rounded-[var(--radius-card)] border px-5 py-4 flex flex-col gap-1"
      style={{
        borderColor: 'color-mix(in srgb, #ef4444 20%, var(--border))',
        background: 'color-mix(in srgb, #ef4444 4%, var(--bg))',
      }}
    >
      <p
        className="text-text-small-semibold"
        style={{ color: '#b91c1c', textDecoration: 'line-through' }}
      >
        "{phrase}"
      </p>
      <p className="text-text-xsmall text-text" style={{ opacity: 0.6 }}>
        {reason}
      </p>
    </div>
  )
}

// ─── Punctuation rule ─────────────────────────────────────────────────────────

function PunctuationRule({
  rule,
  correct,
  wrong,
}: {
  rule: string
  correct: string
  wrong?: string
}) {
  return (
    <div className="border-t border-border pt-4 pb-1 flex flex-col gap-1">
      <p className="text-text-small-semibold text-text">{rule}</p>
      <div className="flex flex-wrap gap-3 mt-1">
        <code
          className="text-text-small px-2.5 py-1 rounded-[var(--radius-small)]"
          style={{
            background: 'color-mix(in srgb, #22c55e 10%, transparent)',
            color: '#15803d',
          }}
        >
          ✓ {correct}
        </code>
        {wrong && (
          <code
            className="text-text-small px-2.5 py-1 rounded-[var(--radius-small)]"
            style={{
              background: 'color-mix(in srgb, #ef4444 10%, transparent)',
              color: '#b91c1c',
              textDecoration: 'line-through',
            }}
          >
            {wrong}
          </code>
        )}
      </div>
    </div>
  )
}

// ─── Story shell ──────────────────────────────────────────────────────────────

function ToneOfVoicePage() {
  return (
    <div className="px-8 py-10 max-w-4xl" style={{ color: 'var(--text)' }}>
      <DocHeader
        layer="Foundation"
        title="Tone of Voice"
        description="Comment Murfy parle — à ses clients, dans ses composants, dans ses micro-copies. Cette page est la référence pour designers et copywriters."
        icon={<MessageText1 size={20} />}
      />

      {/* ── 1. Identité de voix ────────────────────────────────────────── */}
      <div className="mt-10">
        <DocSection
          label="Identité de voix"
          subtitle="Murfy n'est pas une marque corporate. C'est une équipe de réparateurs qui ont décidé de s'attaquer à l'obsolescence programmée. Ça se sent dans chaque mot."
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <PillarCard
              number="01"
              title="Expert de terrain"
              description="On parle depuis l'atelier, pas depuis un open-space. Ce qu'on dit est concret, fondé sur l'expérience du réparateur qui intervient chaque jour."
              quote="Nos techniciens repèrent les signes d'usure invisibles et anticipent les pannes avant qu'elles n'arrivent."
            />
            <PillarCard
              number="02"
              title="Direct et sans détour"
              description="Pas de formules creuses. On dit ce qu'on fait, on dit ce que ça coûte, on dit combien de temps ça prend. La clarté est un acte de respect envers le client."
              quote="Rendez-vous sous 48h. Zéro sous-traitance. Bilan technique complet."
            />
            <PillarCard
              number="03"
              title="Rassurant, pas vendeur"
              description="Le client a une panne — il est déjà stressé. Notre rôle est de supprimer l'anxiété, pas d'en profiter. On rassure sur le prix, le délai et ce qui se passe si ça ne se répare pas."
              quote="Réparé ou remplacé : si ce n'est pas réparable, on prend le Bonus à notre charge."
            />
            <PillarCard
              number="04"
              title="Engagé, sans sermon"
              description="On répare parce que c'est mieux pour la planète — et pour le portefeuille. On le dit une fois, clairement. On ne culpabilise pas le client qui hésite à réparer."
              quote="97% des appareils sont réparables. Alors réparez, ne jetez pas."
            />
            <PillarCard
              number="05"
              title="Chaleureux, pas familier"
              description={"On est accessibles, humains, proches. Mais on vouvoie toujours le client. Jamais de « tu », jamais d'argot, jamais d'émojis hors contexte marketing très ciblé."}
              quote="Un réparateur chez vous dès demain. Payez le jour du RDV."
            />
          </div>
        </DocSection>

        {/* ── 2. Vocabulaire ──────────────────────────────────────────────── */}
        <DocSection
          label="Vocabulaire"
          subtitle="Les mots qu'on préfère et ceux qu'on laisse aux autres. La cohérence du lexique construit la confiance."
        >
          <VocabTable
            rows={[
              {
                say: 'réparateur',
                avoid: 'technicien',
                note: "Pour l'électroménager. Pour le chauffage : « technicien Murfy ».",
              },
              {
                say: 'panne',
                avoid: 'défaillance / dysfonctionnement',
                note: 'Mot du quotidien, pas jargon SAV.',
              },
              {
                say: 'appareil',
                avoid: 'machine / équipement',
                note: 'Neutre, inclusif (lave-linge, chaudière, etc.).',
              },
              {
                say: 'entretien',
                avoid: 'maintenance',
                note: 'Maintenance est perçu comme industriel.',
              },
              {
                say: 'forfait réparation',
                avoid: 'devis / tarif',
                note: 'Le forfait inclut les déplacements — insister sur ce différenciateur.',
              },
              {
                say: 'chez vous',
                avoid: 'à votre domicile',
                note: 'Plus direct, plus chaleureux.',
              },
              {
                say: 'RDV',
                avoid: 'intervention planifiée',
                note: 'Abréviation acceptée partout sauf CGV.',
              },
              {
                say: 'Bonus Réparation',
                avoid: 'aide / subvention',
                note: 'Nom officiel du dispositif — avec majuscules.',
              },
              {
                say: 'reconditionné',
                avoid: 'occasion / d\'occasion',
                note: 'Murfy sélectionne et garantit — pas du vide-grenier.',
              },
              {
                say: 'garantie 6 mois',
                avoid: 'SAV / service après-vente',
                note: 'On nomme la promesse concrète, pas le processus interne.',
              },
            ]}
          />
        </DocSection>

        {/* ── 3. Do / Don't ───────────────────────────────────────────────── */}
        <DocSection
          label="Dos & Don'ts rédactionnels"
          subtitle="Règles d'écriture qui s'appliquent à tous les textes : titres, descriptions, labels de composants."
        >
          <GuidanceGrid
            dos={[
              {
                rule: 'Commencer par le bénéfice, finir par le mécanisme.',
                rationale:
                  '"Chez vous dès demain — prenez rendez-vous en 3 minutes." Le client comprend d\'abord ce qu\'il gagne.',
              },
              {
                rule: 'Utiliser des chiffres pour ancrer la promesse.',
                rationale:
                  '"Garantie 6 mois", "sous 48h", "à partir de 75 €" — les chiffres rassurent et différencient.',
              },
              {
                rule: 'Une idée par phrase. Une phrase par idée.',
                rationale:
                  'Les pages Murfy sont scannées, pas lues. Chaque phrase doit tenir seule.',
              },
              {
                rule: 'CTAs à l\'infinitif, verbe d\'action.',
                rationale:
                  '"Prendre rendez-vous", "Voir les disponibilités" — pas "En savoir plus" ni "Cliquez ici".',
              },
              {
                rule: 'Voix active, sujet explicite.',
                rationale:
                  '"Nos réparateurs interviennent chez vous" plutôt que "Une intervention peut être organisée".',
              },
            ]}
            donts={[
              {
                rule: 'Ne pas entasser des qualificatifs vides.',
                rationale:
                  '"Rapide, efficace, professionnel, certifié" — si tout est qualifié, rien ne l\'est. Choisir 2 attributs max par bloc.',
              },
              {
                rule: 'Ne pas utiliser le passif pour masquer la responsabilité.',
                rationale:
                  '"Votre RDV a été annulé" → "Nous avons annulé votre RDV. Voici pourquoi."',
              },
              {
                rule: 'Ne pas promettre ce que la page ne tient pas.',
                rationale:
                  'Si le CTA dit "Voir les disponibilités", la page suivante doit montrer des créneaux.',
              },
              {
                rule: 'Ne pas écrire pour le SEO au détriment de la lisibilité.',
                rationale:
                  'Le footer de murfy.fr actuel est un contre-exemple — une phrase bourrée de mots-clés n\'est ni lue ni utile.',
              },
              {
                rule: "Ne pas abréger au point d'être ambigu.",
                rationale:
                  '"PAC" est acceptable après avoir écrit "pompe à chaleur (PAC)". En isolation sur un label : écrire en toutes lettres.',
              },
            ]}
          />
        </DocSection>

        {/* ── 4. Formules à bannir ────────────────────────────────────────── */}
        <DocSection
          label="Formules à bannir"
          subtitle="Expressions héritées du corporate ou du marketing générique. Elles sonnent faux dans la voix Murfy."
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <BannedPhrase
              phrase="à cœur de vous accompagner"
              reason="Vague et corporate. Dire ce qu'on fait concrètement : « on répare, on entretient, on conseille »."
            />
            <BannedPhrase
              phrase="adopter le réflexe"
              reason="Condescendant. On propose, on ne prescrit pas un comportement."
            />
            <BannedPhrase
              phrase="n'hésitez pas à nous contacter"
              reason="Formule passe-partout. Préférer un CTA concret : « Posez-nous la question » ou « On vous rappelle »."
            />
            <BannedPhrase
              phrase="dans les meilleurs délais"
              reason="Flou et anxiogène. Murfy donne des délais réels : « sous 48h », « dès demain »."
            />
            <BannedPhrase
              phrase="solution innovante / acteur de référence"
              reason="Jargon startup. Murfy ne se dit pas innovant — il montre des preuves : 450 000 clients, label QualiRépar."
            />
            <BannedPhrase
              phrase="votre satisfaction est notre priorité"
              reason="Promesse vide entendue partout. La preuve : Trustpilot 4,6/5 sur 6 100 avis — c'est ça qui convainc."
            />
            <BannedPhrase
              phrase="pensez-y !"
              reason="Injonction paternaliste. Si l'argument est bon, le point d'exclamation est inutile."
            />
            <BannedPhrase
              phrase="il y a forcément une solution pour vous"
              reason="Trop vague, trop générique. Nommer la solution : « réparation, pièce, ou bon d'achat »."
            />
          </div>
        </DocSection>

        {/* ── 5. Ponctuation & style ──────────────────────────────────────── */}
        <DocSection
          label="Ponctuation & style"
          subtitle="Règles typographiques et stylistiques pour une cohérence visuelle entre tous les composants."
        >
          <div className="flex flex-col gap-0">
            <PunctuationRule
              rule="Points d'exclamation — avec parcimonie."
              correct="Réparé ou remplacé, c'est notre promesse."
              wrong="Réparé ou remplacé, c'est notre promesse !"
            />
            <PunctuationRule
              rule="Majuscule aux noms de marque et dispositifs officiels."
              correct="Bonus Réparation, QualiRépar, Murfy Académie"
              wrong="bonus réparation, qualirépar"
            />
            <PunctuationRule
              rule="Chiffres en numériques pour les données clés."
              correct="75 €, 6 mois, 24h, 450 000 clients"
              wrong="soixante-quinze euros, six mois"
            />
            <PunctuationRule
              rule="Espace insécable avant : ; ! ? et après «."
              correct="Disponible sous 48 h ; sans supplément."
              wrong="Disponible sous 48h; sans supplément."
            />
            <PunctuationRule
              rule="Tiret long (—) pour les apartés, pas le tiret court."
              correct="Forfait fixe — déplacements inclus."
              wrong="Forfait fixe - déplacements inclus."
            />
            <PunctuationRule
              rule="Pas de majuscule aux substantifs communs dans les titres."
              correct="Expert de la réparation électroménager"
              wrong="Expert de la Réparation Électroménager"
            />
            <PunctuationRule
              rule="Abréviations : RDV accepté partout sauf documents légaux."
              correct="Prenez RDV en 3 minutes."
              wrong="Prenez un rendez-vous en 3 minutes. (labels)"
            />
          </div>
        </DocSection>

        {/* ── 6. Templates CTA ────────────────────────────────────────────── */}
        <DocSection
          label="Templates CTA"
          subtitle="Formules validées pour les boutons et liens. Le CTA est le dernier mot que lit le client avant d'agir — il doit être précis."
        >
          <div className="flex flex-col">
            <CtaRow type="primary" label="Prendre rendez-vous" note="CTA principal universel" />
            <CtaRow
              type="primary"
              label="Voir les disponibilités"
              note="Quand le clic mène à un calendrier"
            />
            <CtaRow type="primary" label="Commencer mon diagnostic" note="Funnel auto-diagnostic" />
            <CtaRow
              type="secondary"
              label="En savoir plus"
              note="Bouton secondaire — action alternative sur la même page"
            />
            <CtaRow
              type="link"
              label="En savoir plus"
              arrow
              note="Lien texte avec flèche — navigation vers une autre page"
            />
            <CtaRow
              type="link"
              label="Voir le détail"
              arrow
              note="Fiches produit / tarifs"
            />
            <CtaRow type="link" label="Se faire rappeler" note="Action douce, sans engagement" />
            <CtaRow type="link" label="Vérifier ma zone" note="Couverture géographique" />
            <CtaRow
              type="avoid"
              label="Cliquez ici"
              note="Ne décrit pas l'action ni la destination"
            />
            <CtaRow
              type="avoid"
              label="En savoir davantage"
              note="Tournure alambiquée — « En savoir plus » suffit"
            />
            <CtaRow
              type="avoid"
              label="Découvrir nos offres"
              note="Vague — préférer « Voir les tarifs » ou « Voir les formules »"
            />
          </div>
        </DocSection>

        {/* ── 7. Micro-copy ────────────────────────────────────────────────── */}
        <DocSection
          label="Micro-copy produit"
          subtitle="Messages système, états vides, confirmations et erreurs. Même ton que le reste du site — expert, direct, rassurant."
        >
          <MicroCopyTable
            rows={[
              {
                context: 'Confirmation RDV',
                copy: 'Votre RDV est confirmé pour le [date] entre [h] et [h].',
                avoid: 'Votre demande a bien été prise en compte.',
              },
              {
                context: 'Erreur formulaire',
                copy: 'Ce champ est obligatoire.',
                avoid: 'Erreur de saisie détectée dans le formulaire.',
              },
              {
                context: 'Erreur réseau',
                copy: 'Quelque chose a bloqué. Réessayez ou contactez-nous.',
                avoid: 'Une erreur technique est survenue (code 500).',
              },
              {
                context: 'État vide – agenda',
                copy: 'Aucun RDV prévu pour l\'instant.',
                avoid: 'Vous n\'avez pas encore de rendez-vous enregistrés.',
              },
              {
                context: 'Chargement',
                copy: 'On cherche les disponibilités…',
                avoid: 'Chargement en cours. Veuillez patienter.',
              },
              {
                context: 'Succès paiement',
                copy: 'C\'est réglé. À bientôt !',
                avoid: 'Transaction validée avec succès.',
              },
              {
                context: 'RDV annulé',
                copy: 'Nous avons annulé votre RDV du [date]. Besoin d\'un nouveau créneau ?',
                avoid: 'Votre rendez-vous a été annulé.',
              },
              {
                context: 'Zone non couverte',
                copy: 'On n\'est pas encore dans votre ville — mais on arrive.',
                avoid: 'Votre code postal n\'est pas couvert par notre service.',
              },
              {
                context: 'Diagnostic — aucune panne trouvée',
                copy: 'Bonne nouvelle : votre appareil semble fonctionner normalement.',
                avoid: 'Aucun problème détecté.',
              },
              {
                context: 'Hors garantie',
                copy: 'Votre appareil n\'est plus sous garantie — la réparation Murfy prend le relais.',
                avoid: 'La garantie constructeur est expirée.',
              },
            ]}
          />
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
