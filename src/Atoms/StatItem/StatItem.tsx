import React from 'react'

export interface StatItemProps {
  /** The big value — can include symbols, e.g. "250", "+ 350 000", "-65KG" */
  value: string
  /** Description label shown beside the value */
  label: string
  className?: string
}

export function StatItem({ value, label, className = '' }: StatItemProps) {
  return (
    <div className={`flex items-center gap-4 ${className}`}>
      <span
        className="text-h2 shrink-0 font-black leading-none tracking-tight"
        style={{ color: 'inherit' }}
      >
        {value}
      </span>
      <span
        className="text-text-xsmall leading-snug"
        style={{ color: 'inherit' }}
      >
        {label}
      </span>
    </div>
  )
}
