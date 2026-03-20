import type { Meta, StoryObj } from '@storybook/react'
import { NewsletterForm } from './NewsletterForm'

const meta: Meta<typeof NewsletterForm> = {
  title: 'Molecules/NewsletterForm',
  component: NewsletterForm,
  argTypes: {
    inputPlaceholder: { control: 'text' },
    ctaLabel: { control: 'text' },
    showConsent: { control: 'boolean' },
    consentLabel: { control: 'text' },
  },
}

export default meta
type Story = StoryObj<typeof NewsletterForm>

export const HeroVariant: Story = {
  args: {
    inputPlaceholder: 'Saisissez votre code postal',
    ctaLabel: 'Voir les disponibilités',
    showConsent: false,
  },
}

export const NewsletterVariant: Story = {
  args: {
    inputPlaceholder: 'Saisissez votre code postal',
    ctaLabel: 'Voir les disponibilités',
    showConsent: true,
    consentLabel: "Je souhaite recevoir les actualités et les astuces d'experts de Murfy",
  },
}
