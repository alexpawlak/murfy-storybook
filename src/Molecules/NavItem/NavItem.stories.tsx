import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { NavItem, NavBar } from './NavItem'
import { Button } from '../../Atoms/Button/Button'

const meta: Meta<typeof NavItem> = {
  title: 'Molecules/NavItem',
  component: NavItem,
  tags: ['autodocs'],
}
export default meta
type Story = StoryObj<typeof NavItem>

export const Default: Story = {
  args: { label: 'Électroménager', href: 'https://murfy.fr' },
}

export const Active: Story = {
  args: { label: 'Électroménager', href: 'https://murfy.fr', active: true },
}

export const WithDropdown: Story = {
  args: {
    label: 'Électroménager',
    active: true,
    dropdown: [
      { label: 'Réparer à domicile', href: 'https://murfy.fr/rendez-vous-reparateur' },
      { label: 'Notre offre électroménager', href: 'https://murfy.fr/' },
      { label: 'Réparer en visio', href: 'https://reco.murfy.fr/reparation-video-en-24h' },
      { label: 'Acheter un appareil reconditionné', href: 'https://murfy.fr/reconditionne' },
      { label: 'Bonus réparation', href: 'https://murfy.fr/landing/bonus-reparation-informations' },
    ],
  },
}

// Real murfy.fr navbar
const murfyNavItems = [
  {
    label: 'Électroménager',
    href: 'https://murfy.fr',
    active: true,
    dropdown: [
      { label: 'Réparer à domicile', href: 'https://murfy.fr/rendez-vous-reparateur' },
      { label: 'Notre offre électroménager', href: 'https://murfy.fr/' },
      { label: 'Réparer en visio', href: 'https://reco.murfy.fr/reparation-video-en-24h' },
      { label: 'Acheter un appareil reconditionné', href: 'https://murfy.fr/reconditionne' },
      { label: 'Bonus réparation', href: 'https://murfy.fr/landing/bonus-reparation-informations' },
    ],
  },
  {
    label: 'Chauffage',
    href: 'https://murfy.fr/chauffage',
    dropdown: [
      { label: 'Prendre un RDV entretien', href: 'https://murfy.fr/chauffage/contact-entretien' },
      { label: 'Notre offre chauffage', href: 'https://murfy.fr/chauffage/' },
      { label: 'Réparer', href: 'https://murfy.fr/chauffage/contact-reparation' },
      { label: 'Installer', href: 'https://murfy.fr/chauffage/contact-installation' },
    ],
  },
  {
    label: 'Solaire',
    href: 'https://solaire.murfy.fr',
    dropdown: [
      { label: 'Simuler mes économies', href: 'https://simulation-solaire.murfy.fr/simulateur' },
      { label: 'Notre offre solaire', href: 'https://solaire.murfy.fr/' },
      { label: 'Nos installations', href: 'https://solaire.murfy.fr/nos-installations' },
      { label: 'Pourquoi nous', href: 'https://solaire.murfy.fr/qui-sommes-nous' },
    ],
  },
]

const MurfyLogo = () => (
  <a href="https://murfy.fr" style={{ display: 'inline-flex', alignItems: 'center' }}>
    <svg width="80" height="28" viewBox="0 0 80 28" fill="none" xmlns="http://www.w3.org/2000/svg">
      <text
        x="0" y="22"
        style={{
          fontFamily: 'inherit',
          fontSize: '22px',
          fontWeight: 900,
          fill: 'var(--text)',
          letterSpacing: '-0.04em',
        }}
      >
        murfy
      </text>
    </svg>
  </a>
)

export const FullNavBar: StoryObj = {
  parameters: { layout: 'fullscreen' },
  render: () => (
    <NavBar
      logo={<MurfyLogo />}
      items={murfyNavItems}
      cta={<Button size="sm">Prendre RDV</Button>}
    />
  ),
}

export const NavBarDark: StoryObj = {
  parameters: { layout: 'fullscreen' },
  decorators: [
    Story => (
      <div data-theme="dark">
        <Story />
      </div>
    ),
  ],
  render: () => (
    <NavBar
      logo={<MurfyLogo />}
      items={murfyNavItems}
      cta={<Button size="sm">Prendre RDV</Button>}
    />
  ),
}
