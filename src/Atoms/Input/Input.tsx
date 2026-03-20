import React, { useId } from 'react'

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'size'> {
  label?: string
  value?: string
  onChange?: (value: string) => void
  error?: string
  hint?: string
  containerClassName?: string
  inputClassName?: string
}

export function Input({
  label,
  value,
  onChange,
  type = 'text',
  error,
  disabled,
  hint,
  containerClassName = '',
  inputClassName = '',
  id,
  'aria-describedby': inputAriaDescribedBy,
  ...inputProps
}: InputProps) {
  const generatedId = useId()
  const inputId = id ?? generatedId
  const helperText = error || hint
  const helperId = helperText ? `${inputId}-message` : undefined
  const ariaDescribedBy = [inputAriaDescribedBy, helperId].filter(Boolean).join(' ') || undefined

  return (
    <div className={`flex w-full flex-col gap-2 ${containerClassName}`.trim()}>
      {label && (
        <label
          htmlFor={inputId}
          className="text-label font-semibold uppercase tracking-[0.08em] text-text-default"
        >
          {label}
        </label>
      )}
      <input
        id={inputId}
        type={type}
        value={value}
        disabled={disabled}
        {...inputProps}
        aria-invalid={error ? true : undefined}
        aria-describedby={ariaDescribedBy}
        onChange={e => onChange?.(e.target.value)}
        className={[
          'w-full h-11 rounded-pill border bg-light-100 px-6',
          'text-text-main text-text-default placeholder:text-text-default placeholder:opacity-45',
          'outline-none transition-colors',
          'disabled:cursor-not-allowed disabled:bg-bg-2 disabled:opacity-60',
          'focus:ring-2 focus:ring-btn-bg',
          error
            ? 'border-red-500 focus:ring-red-500'
            : 'border-border hover:border-btn-bg',
          inputClassName,
        ].join(' ')}
      />
      {hint && !error && (
        <span
          id={helperId}
          className="text-text-xsmall text-text-default"
          style={{ opacity: 0.65 }}
        >
          {hint}
        </span>
      )}
      {error && (
        <span id={helperId} className="text-text-xsmall text-red-500">
          {error}
        </span>
      )}
    </div>
  )
}
