import React from 'react'
import { AccordionItem } from '../../Molecules/AccordionItem/AccordionItem'

export interface FaqItem {
  question: string
  answer: string
}

export interface FaqSectionProps {
  heading: string
  subheading: string
  body: React.ReactNode
  items: FaqItem[]
}

export function FaqSection({ heading, subheading, body, items }: FaqSectionProps) {
  return (
    <section
      className="w-full py-16 px-6 flex flex-col gap-10"
      style={{ backgroundColor: 'var(--dark-800)' }}
    >
      {/* Header */}
      <div className="flex flex-col gap-6">
        <h2
          className="uppercase font-black leading-none tracking-tight"
          style={{
            color: 'var(--light-100)',
            fontSize: 'var(--font-size-h2)',
            fontWeight: 'var(--font-weight-h1)',
            letterSpacing: 'var(--letter-spacing-h1)',
            lineHeight: 'var(--line-height-h1)',
          }}
        >
          {heading}
        </h2>

        <div className="flex flex-col gap-3">
          <p
            className="uppercase font-bold"
            style={{
              color: 'var(--light-100)',
              fontSize: 'var(--font-size-text-small)',
              fontWeight: 700,
            }}
          >
            {subheading}
          </p>
          <div
            className="leading-relaxed"
            style={{
              color: 'var(--light-100)',
              fontSize: 'var(--font-size-text-small)',
              lineHeight: 'var(--line-height-text-main)',
            }}
          >
            {body}
          </div>
        </div>
      </div>

      {/* Accordion */}
      <div data-theme="light" className="flex flex-col gap-3">
        {items.map((item, i) => (
          <AccordionItem key={i} question={item.question} answer={item.answer} />
        ))}
      </div>
    </section>
  )
}
