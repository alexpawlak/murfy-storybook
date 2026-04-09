import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'

const prototypePath = '/prototypes/pacifica-maison/index.html'

const meta: Meta = {
  title: 'Prototypes/Compte Client Pacifica/Pacifica Maison',
  parameters: {
    layout: 'fullscreen',
  },
}

export default meta

type Story = StoryObj

export const MobileJourney: Story = {
  name: 'Parcours Mobile',
  render: () => (
    <div style={{ minHeight: '100vh', background: '#f3f4f6' }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '16px',
          padding: '16px 20px',
          background: '#ffffff',
          borderBottom: '1px solid #e5e7eb',
        }}
      >
        <div>
          <div style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#009b9d' }}>
            Chantier 09
          </div>
          <h1 style={{ margin: '4px 0 0', fontSize: '20px', fontWeight: 700, color: '#111827' }}>
            Prototype Pacifica Maison
          </h1>
          <p style={{ margin: '6px 0 0', fontSize: '14px', color: '#4b5563' }}>
            Version de revue importee dans le repo Storybook pour demo et partage.
          </p>
        </div>

        <a
          href={prototypePath}
          target="_blank"
          rel="noreferrer"
          style={{
            flexShrink: 0,
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '10px 14px',
            borderRadius: '999px',
            background: '#009b9d',
            color: '#ffffff',
            fontSize: '14px',
            fontWeight: 700,
            textDecoration: 'none',
          }}
        >
          Ouvrir la page directe
        </a>
      </div>

      <iframe
        title="Prototype Pacifica Maison"
        src={prototypePath}
        style={{
          display: 'block',
          width: '100%',
          height: 'calc(100vh - 89px)',
          border: 0,
          background: '#e5e7eb',
        }}
      />
    </div>
  ),
}