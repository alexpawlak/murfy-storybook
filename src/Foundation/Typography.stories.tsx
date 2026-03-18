import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'

const scales = [
  { name: 'display', label: 'Display', size: '112px', weight: '700', sample: 'Murfy' },
  { name: 'h1', label: 'H1', size: '61px', weight: '900', sample: 'Réparez, ne remplacez pas' },
  { name: 'h2', label: 'H2', size: '46px', weight: '700', sample: 'Nos services de réparation' },
  { name: 'h3', label: 'H3', size: '32px', weight: '700', sample: 'Réparation à domicile' },
  { name: 'h4', label: 'H4', size: '24px', weight: '700', sample: 'Lave-linge, sèche-linge, lave-vaisselle' },
  { name: 'h5', label: 'H5', size: '20px', weight: '700', sample: 'Prise en charge rapide et efficace' },
  { name: 'h6', label: 'H6', size: '18px', weight: '700', sample: 'Techniciens certifiés et expérimentés' },
  { name: 'text-large', label: 'Text Large', size: '20px', weight: '400', sample: 'Nous réparons vos appareils électroménagers à domicile.' },
  { name: 'text-main', label: 'Text Main', size: '18px', weight: '400', sample: 'Prenez rendez-vous en ligne en quelques clics. Un technicien se déplace chez vous.' },
  { name: 'text-small', label: 'Text Small', size: '16px', weight: '400', sample: 'Réparation garantie 6 mois. Pièces d\'origine constructeur.' },
  { name: 'text-xsmall', label: 'Text XSmall', size: '14px', weight: '400', sample: 'Mentions légales · Politique de confidentialité · CGV' },
]

function TypographyDoc() {
  return (
    <div className="p-6 space-y-8 max-w-4xl">
      <h2 className="text-2xl font-bold mb-6">Type Scale</h2>
      {scales.map(({ name, label, size, weight, sample }) => (
        <div key={name} className="flex items-baseline gap-6 border-b border-gray-100 pb-4">
          <div className="w-28 shrink-0">
            <div className="text-xs font-mono text-gray-500">{label}</div>
            <div className="text-xs text-gray-400">{size} / {weight}w</div>
          </div>
          <div
            style={{
              fontSize: `var(--font-size-${name})`,
              fontWeight: `var(--font-weight-${name})`,
              lineHeight: `var(--line-height-${name})`,
              letterSpacing: name.startsWith('h') || name === 'display' ? '-0.05em' : undefined,
            }}
          >
            {sample}
          </div>
        </div>
      ))}
    </div>
  )
}

const meta: Meta = {
  title: 'Foundation/Typography',
  component: TypographyDoc,
  parameters: { layout: 'fullscreen' },
}
export default meta

type Story = StoryObj
export const TypeScale: Story = {}
