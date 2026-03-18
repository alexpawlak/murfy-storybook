import React from 'react'

interface InputProps {
  label?: string
  placeholder?: string
  value?: string
  onChange?: (value: string) => void
  type?: 'text' | 'email' | 'tel' | 'number'
  error?: string
  disabled?: boolean
  hint?: string
}

export function Input({ label, placeholder, value, onChange, type = 'text', error, disabled, hint }: InputProps) {
  return (
    <div className="flex flex-col gap-1 w-full">
      {label && (
        <label className="text-text-small font-semibold text-text-default">
          {label}
        </label>
      )}
      <input
        type={type}
        value={value}
        placeholder={placeholder}
        disabled={disabled}
        onChange={e => onChange?.(e.target.value)}
        className={[
          'w-full px-4 py-3 rounded-dropdown border bg-bg-2 text-text-default text-text-main',
          'outline-none transition-colors',
          'focus:ring-2 focus:ring-btn-bg',
          error
            ? 'border-red-500 focus:ring-red-500'
            : 'border-border hover:border-btn-bg',
          disabled ? 'opacity-50 cursor-not-allowed' : '',
        ].join(' ')}
      />
      {hint && !error && (
        <span className="text-text-xsmall text-text-2">{hint}</span>
      )}
      {error && (
        <span className="text-text-xsmall text-red-500">{error}</span>
      )}
    </div>
  )
}
