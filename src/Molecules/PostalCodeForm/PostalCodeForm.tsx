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
      <div
        className="max-w-md rounded-card p-6 text-center space-y-3"
        style={{
          backgroundColor: 'var(--light-100)',
          boxShadow: '0 4px 16px -1px rgba(0,0,0,0.19)',
        }}
      >
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
    <div className="max-w-md space-y-4">
      {heading && (
        <h2 className="text-h4 font-bold text-text-default">
          {heading}
        </h2>
      )}
      {subheading && (
        <p style={{ fontSize: 'var(--font-size-text-small)', color: 'var(--text)', opacity: 0.7 }}>
          {subheading}
        </p>
      )}
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-2 rounded-card p-2"
        style={{
          backgroundColor: 'var(--light-100)',
          boxShadow: '0 4px 16px -1px rgba(0,0,0,0.19)',
        }}
      >
        <div className="flex-1">
          <Input
            placeholder="75001"
            value={value}
            onChange={setValue}
            error={error}
            type="text"
            inputMode="numeric"
            maxLength={5}
            aria-label="Code postal"
          />
        </div>
        <Button variant="primary" type="submit" className="w-full justify-center">
          Rechercher
        </Button>
      </form>
    </div>
  )
}
