import React from 'react'

interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'accent'
  size?: 'sm' | 'md' | 'lg'
  children: React.ReactNode
  disabled?: boolean
  onClick?: () => void
  className?: string
  type?: 'button' | 'submit' | 'reset'
}

export function Button({ variant = 'primary', size = 'md', children, disabled, onClick, className = '', type = 'button' }: ButtonProps) {
  const base = 'inline-flex items-center justify-center font-bold transition-colors rounded-pill border cursor-pointer'
  const sizes = {
    sm: 'px-4 py-2 text-text-small',
    md: 'px-6 py-3 text-text-main',
    lg: 'px-8 py-4 text-text-large',
  }
  // accent variant pulls from --accent-btn-* CSS vars (set by data-accent attribute)
  const variantClasses: Record<string, string> = {
    primary: 'bg-btn-bg text-btn-text border-transparent hover:bg-btn-bg-hover',
    secondary: 'bg-transparent text-btn2-text border-btn2-border hover:bg-btn2-bg-hover hover:text-btn2-text-hover',
    accent: 'border-transparent bg-[var(--accent-btn-bg)] text-[var(--accent-btn-text)] hover:bg-[var(--accent-btn-bg-hover)] hover:text-[var(--accent-btn-text-hover)]',
  }
  return (
    <button
      className={`${base} ${sizes[size]} ${variantClasses[variant]} ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}
      disabled={disabled}
      onClick={onClick}
      type={type}
    >
      {children}
    </button>
  )
}
