import React, { useState } from 'react'

interface AccordionItemProps {
  question: string
  answer: string
  defaultOpen?: boolean
}

export function AccordionItem({ question, answer, defaultOpen = false }: AccordionItemProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen)

  return (
    <div className="border-b border-border last:border-b-0">
      <button
        className="w-full flex items-center justify-between gap-4 py-4 text-left transition-colors hover:opacity-80"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
        <span
          className="font-semibold text-text-default"
          style={{ fontSize: 'var(--font-size-text-main)', fontWeight: 600 }}
        >
          {question}
        </span>
        <span
          className="shrink-0 w-6 h-6 rounded-full flex items-center justify-center transition-transform"
          style={{
            backgroundColor: 'var(--accent-accent-highlight)',
            color: 'var(--accent-accent-text)',
            transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)',
            transition: 'transform 0.2s ease',
          }}
        >
          +
        </span>
      </button>
      {isOpen && (
        <div
          className="pb-4 text-text-default opacity-80"
          style={{ fontSize: 'var(--font-size-text-small)', lineHeight: 'var(--line-height-text-small)' }}
        >
          {answer}
        </div>
      )}
    </div>
  )
}

interface AccordionProps {
  items: { question: string; answer: string }[]
}

export function Accordion({ items }: AccordionProps) {
  return (
    <div className="rounded-card border border-border bg-bg-2 p-6 divide-y divide-border max-w-2xl">
      {items.map((item, i) => (
        <AccordionItem key={i} {...item} />
      ))}
    </div>
  )
}
