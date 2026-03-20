import React, { useState } from 'react'
import { Button } from '../../Atoms/Button/Button'
import { Input } from '../../Atoms/Input/Input'

export interface NewsletterFormProps {
  /** Placeholder for the input field */
  inputPlaceholder?: string
  /** Label for the submit button */
  ctaLabel?: string
  /** Show the newsletter opt-in checkbox */
  showConsent?: boolean
  consentLabel?: string
  onSubmit?: (value: string, consent: boolean) => void
  className?: string
  /** Optional content rendered inside the card below the input+button */
  footer?: React.ReactNode
}

export function NewsletterForm({
  inputPlaceholder = 'Saisissez votre code postal',
  ctaLabel = 'Voir les disponibilités',
  showConsent = false,
  consentLabel = "Je souhaite recevoir les actualités et les astuces d'experts de Murfy",
  onSubmit,
  className = '',
  footer,
}: NewsletterFormProps) {
  const [value, setValue] = useState('')
  const [consent, setConsent] = useState(false)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    onSubmit?.(value, consent)
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={`flex flex-col gap-3 ${className}`}
    >
      {/* Input + CTA card */}
      <div
        className="flex flex-col gap-2 p-2"
        style={{ background: 'var(--bg)', borderRadius: 'var(--radius-card)', boxShadow: '0 4px 16px -1px rgba(0,0,0,0.19)' }}
      >
        <Input
          type="text"
          value={value}
          onChange={setValue}
          placeholder={inputPlaceholder}
          aria-label={inputPlaceholder}
        />
        <Button type="submit" variant="primary" className="w-full justify-center">
          {ctaLabel}
        </Button>
        {footer && footer}
      </div>

      {/* Optional consent checkbox */}
      {showConsent && (
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={consent}
            onChange={e => setConsent(e.target.checked)}
            className="shrink-0"
            style={{ accentColor: 'var(--btn-bg)', width: '16px', height: '16px' }}
          />
          <span className="text-xs leading-snug" style={{ color: 'var(--text)' }}>
            {consentLabel}
          </span>
        </label>
      )}
    </form>
  )
}
