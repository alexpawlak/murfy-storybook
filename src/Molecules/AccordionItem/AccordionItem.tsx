import React, { useState } from 'react'
import { Add } from 'iconsax-react'

interface AccordionItemProps {
  question: string
  answer: string
  defaultOpen?: boolean
}

export function AccordionItem({ question, answer, defaultOpen = false }: AccordionItemProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen)

  return (
    <div
      className="rounded-[10px] overflow-hidden transition-colors bg-bg border border-border"
    >
      <button
        className="w-full flex items-center justify-between gap-2 px-4 py-4 text-left transition-opacity hover:opacity-80"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
        <span
          className="flex-1 font-semibold text-text"
          style={{ fontSize: 'var(--font-size-text-main)', fontWeight: 600 }}
        >
          {question}
        </span>
        <Add
          size={20}
          color="var(--text)"
          className={`shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-45' : ''}`}
        />
      </button>
      {isOpen && (
        <div
          className="px-4 pb-4 text-text"
          style={{
            fontSize: 'var(--font-size-text-xsmall)',
            lineHeight: 'var(--line-height-text-xsmall)',
          }}
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
    <div className="flex flex-col gap-3 max-w-2xl">
      {items.map((item, i) => (
        <AccordionItem key={i} {...item} />
      ))}
    </div>
  )
}
