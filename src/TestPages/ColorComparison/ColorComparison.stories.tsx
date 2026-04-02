import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import {
  DocHeader,
  DocSection,
  AccessibilityNote,
  ContrastBadge,
} from '../../Foundation/doc-components'

// ─── Types ───────────────────────────────────────────────────────────────────

interface AccentColors {
  btnBg: string
  btnHover: string
  btnText: string
  highlight: string
}

interface ChangeEntry {
  token: string
  before: string
  after: string
  changed: boolean
}

interface TokenEntry {
  name: string
  value: string
  note: string
}

interface ContrastData {
  ratio: string
  rating: 'AAA' | 'AA' | 'AA ⚠' | 'Fail'
  textColor: string
}

interface VerticalData {
  id: string
  vertical: string
  activity: string
  ctaText: string
  status: 'changed' | 'unchanged' | 'new'
  before: AccentColors | null
  after: AccentColors
  contrastBefore: ContrastData | null
  contrastAfter: ContrastData
  contrastFailure?: ContrastData  // shows a Fail warning (Formation white text)
  changes: ChangeEntry[]
  proposedTokens: TokenEntry[]
  note: string
}

// ─── Data ────────────────────────────────────────────────────────────────────

const verticals: VerticalData[] = [
  {
    id: 'electro',
    vertical: 'Électroménager',
    activity: 'Réparation électroménager',
    ctaText: 'Réparer mon appareil',
    status: 'changed',
    before: {
      btnBg:    '#e8006f',
      btnHover: '#cc0062',
      btnText:  '#ffffff',
      highlight:'#ff6492',
    },
    after: {
      btnBg:    '#D33167',
      btnHover: '#A82752',
      btnText:  '#ffffff',
      highlight:'#FF6492',
    },
    contrastBefore: { ratio: '4.51:1', rating: 'AA', textColor: '#ffffff' },
    contrastAfter:  { ratio: '4.77:1', rating: 'AA', textColor: '#ffffff' },
    changes: [
      { token: 'btn-bg',    before: '#e8006f', after: '#D33167', changed: true },
      { token: 'btn-hover', before: '#cc0062', after: '#A82752', changed: true },
      { token: 'highlight', before: '#ff6492', after: '#FF6492', changed: false },
      { token: 'btn-text',  before: '#ffffff', after: '#ffffff', changed: false },
    ],
    proposedTokens: [
      { name: 'fuschia-highlight', value: '#FF6492', note: 'inchangé — déjà existant' },
      { name: 'fuschia-700',       value: '#D33167', note: 'NOUVEAU — remplace #e8006f pour btn-bg' },
      { name: 'fuschia-hover',     value: '#A82752', note: 'hover proposé — plus sombre que D33167' },
    ],
    note: "La couleur identitaire #FF6492 (identique au highlight actuel) reste le point d'ancrage visuel du vertical. Seul le btn-bg est assombri pour un meilleur contraste.",
  },
  {
    id: 'chauffage',
    vertical: 'Chauffage',
    activity: 'Entretien chauffage',
    ctaText: 'Entretenir ma chaudière',
    status: 'changed',
    before: {
      btnBg:    '#543bce',
      btnHover: '#432fa5',
      btnText:  '#ffffff',
      highlight:'#9e8cf8',
    },
    after: {
      btnBg:    '#6D51F5',
      btnHover: '#5840D4',
      btnText:  '#ffffff',
      highlight:'#9E8CF8',
    },
    contrastBefore: { ratio: '6.5:1', rating: 'AA', textColor: '#ffffff' },
    contrastAfter:  { ratio: '5.07:1', rating: 'AA', textColor: '#ffffff' },
    changes: [
      { token: 'btn-bg',    before: '#543bce', after: '#6D51F5', changed: true },
      { token: 'btn-hover', before: '#432fa5', after: '#5840D4', changed: true },
      { token: 'highlight', before: '#9e8cf8', after: '#9E8CF8', changed: false },
      { token: 'btn-text',  before: '#ffffff', after: '#ffffff', changed: false },
    ],
    proposedTokens: [
      { name: 'purple-500',   value: '#9E8CF8', note: 'inchangé — déjà existant' },
      { name: 'purple-600',   value: '#6D51F5', note: 'NOUVEAU — entre purple-500 et purple-700 existants' },
      { name: 'purple-hover', value: '#5840D4', note: 'hover proposé' },
    ],
    note: 'Note : ce changement fait passer le contraste de 6.5:1 (AA) à 5.07:1 (AA) — intentionnel, toujours conforme WCAG AA. Le highlight #9E8CF8 reste inchangé.',
  },
  {
    id: 'solaire',
    vertical: 'Solaire',
    activity: 'Installation solaire',
    ctaText: 'Installer mes panneaux',
    status: 'unchanged',
    before: {
      btnBg:    '#ffd800',
      btnHover: '#e0be00',
      btnText:  '#032524',
      highlight:'#ffde73',
    },
    after: {
      btnBg:    '#ffd800',
      btnHover: '#e0be00',
      btnText:  '#032524',
      highlight:'#ffde73',
    },
    contrastBefore: null,
    contrastAfter:  { ratio: '11.65:1', rating: 'AAA', textColor: '#032524' },
    changes: [],
    proposedTokens: [],
    note: 'Aucun changement nécessaire. Les tokens Solaire passent WCAG AAA (11.65:1) — la palette est optimale.',
  },
  {
    id: 'formation',
    vertical: 'Formation',
    activity: 'Formation professionnelle',
    ctaText: 'Voir les formations',
    status: 'new',
    before: null,
    after: {
      btnBg:    '#5CBBFF',
      btnHover: '#2E9FEF',
      btnText:  '#032524',
      highlight:'#40AFFF',
    },
    contrastBefore: null,
    contrastAfter:  { ratio: '7.73:1', rating: 'AAA', textColor: '#032524' },
    contrastFailure: { ratio: '2.10:1', rating: 'Fail', textColor: '#ffffff' },
    changes: [],
    proposedTokens: [
      { name: 'blue-highlight', value: '#40AFFF', note: 'couleur identitaire du vertical' },
      { name: 'blue-btn-bg',    value: '#5CBBFF', note: 'fond CTA — plus clair que le highlight (inhabituel, voir note)' },
      { name: 'blue-btn-hover', value: '#2E9FEF', note: 'hover proposé — plus sombre' },
      { name: 'blue-text',      value: '#032524', note: 'texte foncé OBLIGATOIRE sur CTA bleu' },
      { name: 'blue-navy',      value: '#0A3A5C', note: 'texte foncé pour surfaces bleues' },
    ],
    note: '⚠ btn-bg (#5CBBFF) est plus clair que le highlight (#40AFFF) — ce qui inverse le pattern habituel. Texte foncé (#032524) obligatoire : texte blanc sur #5CBBFF = 2.10:1 (échec WCAG).',
  },
]

// ─── Sub-components ───────────────────────────────────────────────────────────

function StatusBadge({ status }: { status: VerticalData['status'] }) {
  const styles = {
    changed:   { bg: '#fff0c0', color: '#7a4a00', label: 'Modifié' },
    unchanged: { bg: '#d1fae5', color: '#065f46', label: 'Inchangé' },
    new:       { bg: '#dbeafe', color: '#1e40af', label: 'Nouveau vertical' },
  }[status]
  return (
    <span
      className="inline-block rounded-[var(--radius-pill)] px-3 py-0.5 text-label uppercase tracking-[0.08em] font-semibold"
      style={{ background: styles.bg, color: styles.color }}
    >
      {styles.label}
    </span>
  )
}

function ColorSwatch({ label, hex }: { label: string; hex: string }) {
  return (
    <div className="flex flex-col items-start gap-1">
      <div
        className="w-12 h-12 rounded-[var(--radius-small)] border border-border shadow-sm"
        style={{ backgroundColor: hex }}
      />
      <span className="text-label font-mono text-text" style={{ opacity: 0.6 }}>{label}</span>
      <span className="text-label font-mono text-text" style={{ opacity: 0.4 }}>{hex}</span>
    </div>
  )
}

function MiniCardPreview({
  colors,
  vertical,
  activity,
  ctaText,
  label,
}: {
  colors: AccentColors
  vertical: string
  activity: string
  ctaText: string
  label: string
}) {
  return (
    <div className="flex flex-col gap-3">
      <p className="text-label uppercase tracking-[0.08em] font-semibold text-text" style={{ opacity: 0.4 }}>
        {label}
      </p>
      {/* Swatches row */}
      <div className="flex flex-wrap gap-3">
        <ColorSwatch label="btn-bg"    hex={colors.btnBg} />
        <ColorSwatch label="hover"     hex={colors.btnHover} />
        <ColorSwatch label="highlight" hex={colors.highlight} />
      </div>
      {/* Mini card */}
      <div
        className="rounded-[var(--radius-card)] border border-border overflow-hidden"
        style={{ background: 'var(--bg-2, #f3f3f3)', maxWidth: 260 }}
      >
        {/* Highlight strip */}
        <div className="h-2" style={{ backgroundColor: colors.highlight }} />
        {/* Content */}
        <div className="px-5 py-4 flex flex-col gap-3">
          <div>
            <p className="text-h5 font-bold" style={{ color: '#073331' }}>{vertical}</p>
            <p className="text-text-small" style={{ color: '#073331', opacity: 0.6 }}>{activity}</p>
          </div>
          {/* CTA buttons — default + hover state */}
          <div className="flex flex-wrap gap-2">
            <button
              className="rounded-[var(--radius-pill)] px-4 py-2 text-text-small-semibold border-0 cursor-default"
              style={{ backgroundColor: colors.btnBg, color: colors.btnText }}
            >
              {ctaText}
            </button>
            <button
              className="rounded-[var(--radius-pill)] px-4 py-2 text-text-small-semibold border-0 cursor-default"
              style={{ backgroundColor: colors.btnHover, color: colors.btnText, opacity: 0.9 }}
            >
              (hover)
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

function ContrastPair({
  vertical,
  before,
  after,
  beforeColors,
  afterColors,
  failureWarning,
}: {
  vertical: string
  before: ContrastData | null
  after: ContrastData
  beforeColors: AccentColors | null
  afterColors: AccentColors
  failureWarning?: ContrastData
}) {
  return (
    <div className="mt-6">
      <p className="text-label uppercase tracking-[0.08em] font-semibold mb-3 text-text" style={{ opacity: 0.4 }}>
        Contraste WCAG — texte sur CTA
      </p>
      <div className="flex flex-wrap gap-4">
        {before && beforeColors && (
          <div className="flex-1 min-w-[160px] max-w-[220px]">
            <ContrastBadge
              bg="btn-bg (avant)"
              bgColor={beforeColors.btnBg}
              fg="btn-text"
              fgColor={before.textColor}
              ratio={before.ratio}
              rating={before.rating}
              context={`${vertical} — actuel`}
            />
          </div>
        )}
        <div className="flex-1 min-w-[160px] max-w-[220px]">
          <ContrastBadge
            bg="btn-bg (après)"
            bgColor={afterColors.btnBg}
            fg="btn-text"
            fgColor={after.textColor}
            ratio={after.ratio}
            rating={after.rating}
            context={`${vertical} — proposé`}
          />
        </div>
        {failureWarning && (
          <div className="flex-1 min-w-[160px] max-w-[220px]">
            <ContrastBadge
              bg="btn-bg"
              bgColor={afterColors.btnBg}
              fg="texte blanc ⚠"
              fgColor={failureWarning.textColor}
              ratio={failureWarning.ratio}
              rating={failureWarning.rating}
              context="Texte blanc sur bleu — INTERDIT"
            />
          </div>
        )}
      </div>
    </div>
  )
}

function ChangeSummary({ changes }: { changes: ChangeEntry[] }) {
  if (changes.length === 0) return null
  return (
    <div className="mt-6">
      <p className="text-label uppercase tracking-[0.08em] font-semibold mb-2 text-text" style={{ opacity: 0.4 }}>
        Résumé des changements
      </p>
      <div className="flex flex-wrap gap-x-6 gap-y-2">
        {changes.map(c => (
          <span key={c.token} className="flex items-center gap-1.5 text-text-xsmall font-mono text-text">
            <span style={{ opacity: 0.55 }}>{c.token}:</span>
            {c.changed ? (
              <>
                <span className="inline-block w-3 h-3 rounded-sm border border-border" style={{ backgroundColor: c.before }} />
                <span style={{ opacity: 0.5 }}>{c.before}</span>
                <span style={{ opacity: 0.35 }}> → </span>
                <span className="inline-block w-3 h-3 rounded-sm border border-border" style={{ backgroundColor: c.after }} />
                <span style={{ fontWeight: 600 }}>{c.after}</span>
              </>
            ) : (
              <span style={{ opacity: 0.4 }}>inchangé ({c.before})</span>
            )}
          </span>
        ))}
      </div>
    </div>
  )
}

function ProposedTokens({ tokens }: { tokens: TokenEntry[] }) {
  if (tokens.length === 0) return null
  return (
    <div className="mt-6">
      <p className="text-label uppercase tracking-[0.08em] font-semibold mb-3 text-text" style={{ opacity: 0.4 }}>
        Tokens proposés (tokens.json)
      </p>
      <div className="flex flex-col gap-2">
        {tokens.map(t => (
          <div key={t.name} className="flex items-start flex-wrap gap-x-3 gap-y-1">
            <code
              className="text-label font-mono px-2 py-0.5 rounded-[var(--radius-small)] shrink-0"
              style={{
                background: 'color-mix(in srgb, var(--accent-btn-bg) 10%, var(--bg))',
                color: 'var(--accent-btn-bg)',
              }}
            >
              {t.name}
            </code>
            <span className="inline-block w-3 h-3 rounded-sm border border-border mt-0.5 shrink-0" style={{ backgroundColor: t.value }} />
            <span className="text-label font-mono text-text shrink-0" style={{ opacity: 0.65 }}>{t.value}</span>
            <span className="text-text-xsmall text-text" style={{ opacity: 0.5 }}>— {t.note}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function VerticalSection({ data }: { data: VerticalData }) {
  const isUnchanged = data.status === 'unchanged'
  const isNew = data.status === 'new'
  const isChanged = data.status === 'changed'

  return (
    <DocSection
      label={`${data.vertical} — ${data.activity}`}
      subtitle={data.note}
    >
      <div className="mb-5">
        <StatusBadge status={data.status} />
      </div>

      {/* Before / After card grid */}
      {isUnchanged ? (
        <div
          className="rounded-[var(--radius-card)] border border-border px-6 py-5 inline-block"
          style={{ background: 'var(--bg)' }}
        >
          <MiniCardPreview
            colors={data.after}
            vertical={data.vertical}
            activity={data.activity}
            ctaText={data.ctaText}
            label="Couleurs actuelles — aucun changement"
          />
        </div>
      ) : isNew ? (
        <div
          className="rounded-[var(--radius-card)] border-2 px-6 py-5 inline-block"
          style={{
            borderColor: 'color-mix(in srgb, #3b82f6 50%, var(--border))',
            background: 'color-mix(in srgb, #3b82f6 4%, var(--bg))',
          }}
        >
          <MiniCardPreview
            colors={data.after}
            vertical={data.vertical}
            activity={data.activity}
            ctaText={data.ctaText}
            label="Palette proposée — nouveau vertical"
          />
        </div>
      ) : (
        /* Changed: side-by-side before / after */
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div
            className="rounded-[var(--radius-card)] border border-border px-6 py-5"
            style={{ background: 'var(--bg)' }}
          >
            <MiniCardPreview
              colors={data.before!}
              vertical={data.vertical}
              activity={data.activity}
              ctaText={data.ctaText}
              label="Avant (actuel)"
            />
          </div>
          <div
            className="rounded-[var(--radius-card)] border-2 px-6 py-5"
            style={{
              borderColor: 'color-mix(in srgb, #22c55e 50%, var(--border))',
              background: 'color-mix(in srgb, #22c55e 4%, var(--bg))',
            }}
          >
            <MiniCardPreview
              colors={data.after}
              vertical={data.vertical}
              activity={data.activity}
              ctaText={data.ctaText}
              label="Après (proposé)"
            />
          </div>
        </div>
      )}

      {/* WCAG contrast badges */}
      <ContrastPair
        vertical={data.vertical}
        before={isChanged ? data.contrastBefore : null}
        after={data.contrastAfter}
        beforeColors={data.before}
        afterColors={data.after}
        failureWarning={data.contrastFailure}
      />

      {/* Change summary */}
      {isChanged && <ChangeSummary changes={data.changes} />}

      {/* Proposed tokens */}
      <ProposedTokens tokens={data.proposedTokens} />
    </DocSection>
  )
}

// ─── Main doc component ───────────────────────────────────────────────────────

function ColorComparisonDoc() {
  return (
    <div className="min-h-screen" style={{ background: 'var(--bg)' }}>
      <DocHeader
        layer="Foundation"
        title="Comparaison couleurs — Avant / Après"
        description="Page de validation stakeholder. Aperçu des couleurs d'accent proposées par vertical, avec tests de contraste WCAG avant et après. Aucun changement appliqué aux tokens — cette page utilise des hex hardcodés pour prévisualisation uniquement."
      />

      <div className="px-8 py-12 max-w-5xl">

        {/* Intro callout */}
        <DocSection
          label="Comment lire cette page"
          subtitle="Chaque section correspond à un vertical Murfy. Les panneaux avec bordure verte montrent les nouvelles couleurs proposées. Les tests WCAG sont affichés pour les états actuel ET proposé."
        >
          <div
            className="rounded-[var(--radius-card)] border border-border px-6 py-5"
            style={{ background: 'color-mix(in srgb, var(--accent-btn-bg) 6%, var(--bg))' }}
          >
            <p className="text-text-small text-text" style={{ opacity: 0.8 }}>
              Cette page est en <strong>lecture seule</strong> — elle n'affecte pas{' '}
              <code>tokens.json</code>. Les valeurs hex sont hardcodées directement dans la story.
              Une fois les couleurs validées par les stakeholders, les tokens seront mis à jour séparément via une PR dédiée.
              Les previews de cartes ne sont <strong>pas affectées</strong> par le sélecteur Accent/Thème de la barre d'outils Storybook.
            </p>
          </div>
        </DocSection>

        {/* One section per vertical */}
        {verticals.map(v => (
          <VerticalSection key={v.id} data={v} />
        ))}

        {/* Global accessibility note */}
        <DocSection
          label="Accessibilité & WCAG"
          subtitle="Critères appliqués sur cette page."
        >
          <div className="flex flex-col gap-4">
            <AccessibilityNote
              criterion="WCAG 2.1 AA 1.4.3 — Contraste (Minimum)"
              requirement="4.5:1 pour le texte normal · 3:1 pour le texte large (≥18pt ou ≥14pt gras)"
              why="Toutes les CTA proposées passent WCAG AA. Chauffage passe de AA (6.5:1) à AA (5.07:1) — intentionnel, toujours conforme. Formation (bleu) requiert obligatoirement du texte foncé (#032524) — le texte blanc sur #5CBBFF produit seulement 2.10:1, un échec WCAG qui ne peut pas être utilisé en production."
              href="https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum.html"
            />
            <AccessibilityNote
              criterion="WCAG 2.1 AA 1.4.1 — Utilisation de la couleur"
              requirement="La couleur ne doit pas être le seul moyen de transmettre une information"
              why="Les boutons CTA doivent toujours combiner couleur + label textuel. Ne jamais utiliser la couleur seule pour indiquer un état actif, une erreur ou une sélection."
              href="https://www.w3.org/WAI/WCAG21/Understanding/use-of-color.html"
            />
          </div>
        </DocSection>

      </div>
    </div>
  )
}

// ─── Story ────────────────────────────────────────────────────────────────────

const meta: Meta = {
  title: 'TestPages/ColorComparison',
  component: ColorComparisonDoc,
  parameters: { layout: 'fullscreen' },
}
export default meta

type Story = StoryObj
export const Comparison: Story = {}
