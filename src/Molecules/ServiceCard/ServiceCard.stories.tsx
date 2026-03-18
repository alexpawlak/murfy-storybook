import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { ServiceCard } from './ServiceCard'

const meta: Meta<typeof ServiceCard> = {
  title: 'Molecules/ServiceCard',
  component: ServiceCard,
  tags: ['autodocs'],
}
export default meta
type Story = StoryObj<typeof ServiceCard>

export const Default: Story = {
  args: {
    title: 'Réparation Lave-linge',
    description: 'Nos techniciens interviennent à domicile pour réparer votre lave-linge. Diagnostic rapide et réparation le jour même.',
    price: '89€',
    tag: 'Populaire',
    ctaLabel: 'Prendre rendez-vous',
  },
}

export const WithImage: Story = {
  args: {
    title: 'Réparation Lave-vaisselle',
    description: 'Intervention rapide à domicile. Pièces d\'origine constructeur. Garantie 6 mois.',
    price: '89€',
    imageUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop',
    ctaLabel: 'Prendre rendez-vous',
  },
}

export const NoPrice: Story = {
  args: {
    title: 'Diagnostic gratuit',
    description: 'Faites diagnostiquer votre appareil gratuitement par nos experts avant toute intervention.',
    ctaLabel: 'En savoir plus',
  },
}

export const CardGrid: Story = {
  render: () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
      {[
        { title: 'Lave-linge', desc: 'Réparation rapide à domicile.', price: '89€', tag: 'Populaire' },
        { title: 'Sèche-linge', desc: 'Intervention le jour même disponible.', price: '89€' },
        { title: 'Lave-vaisselle', desc: 'Techniciens certifiés. Garantie 6 mois.', price: '89€', tag: 'Nouveau' },
      ].map(card => (
        <ServiceCard
          key={card.title}
          title={`Réparation ${card.title}`}
          description={card.desc}
          price={card.price}
          tag={card.tag}
        />
      ))}
    </div>
  ),
}
