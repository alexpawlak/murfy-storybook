import React, { useState } from 'react'
import { Input } from '../../Atoms/Input/Input'
import { Button } from '../../Atoms/Button/Button'

interface PostalCodeFormProps {
  onSubmit?: (postalCode: string) => void
  heading?: string
  subheading?: string
}

function isValidFrenchPostalCode(code: string): boolean {
  return /^\d{5}$/.test(code)
}

export function PostalCodeForm({
  onSubmit,
  heading = 'Trouvez un technicien près de chez vous',
  subheading = 'Entrez votre code postal pour voir les disponibilités',
}: PostalCodeFormProps) {
  const [value, setValue] = useState('')
  const [error, setError] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!isValidFrenchPostalCode(value)) {
      setError('Veuillez entrer un code postal valide (ex: 75001)')
      return
    }
    setError('')
    setSubmitted(true)
    onSubmit?.(value)
  }

  if (submitted) {
    return (
      <div className="rounded-card p-6 bg-bg-2 border border-border text-center space-y-3">
        <div className="text-4xl">✓</div>
        <p className="font-bold text-text-default" style={{ fontSize: 'var(--font-size-h5)' }}>
          Super ! Nous intervenons à {value}.
        </p>
        <Button variant="secondary" onClick={() => { setValue(''); setSubmitted(false) }}>
          Changer de code postal
        </Button>
      </div>
    )
  }

  return (
    <div className="rounded-card p-6 bg-bg-2 border border-border space-y-4 max-w-md">
      {heading && (
        <h2 className="font-bold" style={{ fontSize: 'var(--font-size-h4)', letterSpacing: '-0.05em', color: 'var(--text)' }}>
          {heading}
        </h2>
      )}
      {subheading && (
        <p style={{ fontSize: 'var(--font-size-text-small)', color: 'var(--text)', opacity: 0.7 }}>
          {subheading}
        </p>
      )}
      <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:flex-row sm:items-start">
        <div className="flex-1">
          <Input
            placeholder="75001"
            value={value}
            onChange={setValue}
            error={error}
            type="text"
          />
        </div>
        <Button variant="primary" onClick={() => {}}>
          Rechercher
        </Button>
      </form>
    </div>
  )
}
