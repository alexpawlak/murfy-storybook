import React from 'react'

export interface ProcessStep {
  number: number
  title: string
  description: string
}

export interface ProcessSectionProps {
  title?: string
  steps?: ProcessStep[]
}

interface ProcessStepCardProps {
  step: ProcessStep
}

function ProcessStepCard({ step }: ProcessStepCardProps) {
  return (
    <div
      className="flex flex-col gap-3 p-5"
      style={{
        backgroundColor: 'var(--light-100)',
        borderRadius: 'var(--radius-card)',
        boxShadow: '0 2px 16px rgba(0,0,0,0.07)',
      }}
    >
      <div
        className="flex items-center justify-center text-text-main-semibold font-black"
        style={{
          width: 40,
          height: 40,
          borderRadius: '50%',
          backgroundColor: 'var(--accent-btn-bg)',
          color: 'var(--accent-btn-text)',
          flexShrink: 0,
        }}
      >
        {step.number}
      </div>
      <h3
        className="text-h5 font-bold"
        style={{ color: 'var(--text)', letterSpacing: '-0.02em' }}
      >
        {step.title}
      </h3>
      <p
        className="text-text-xsmall"
        style={{ color: 'var(--text)', opacity: 0.75 }}
      >
        {step.description}
      </p>
    </div>
  )
}

const defaultSteps: ProcessStep[] = [
  {
    number: 1,
    title: 'Étape 1',
    description: 'Description de la première étape du processus.',
  },
  {
    number: 2,
    title: 'Étape 2',
    description: 'Description de la deuxième étape du processus.',
  },
  {
    number: 3,
    title: 'Étape 3',
    description: 'Description de la troisième étape du processus.',
  },
  {
    number: 4,
    title: 'Étape 4',
    description: 'Description de la quatrième étape du processus.',
  },
]

export function ProcessSection({
  title = 'Notre processus',
  steps = defaultSteps,
}: ProcessSectionProps) {
  return (
    <section
      className="px-4 py-10"
      style={{ backgroundColor: 'var(--bg)' }}
    >
      <h2
        className="text-h3 font-black uppercase mb-8"
        style={{ color: 'var(--text)', letterSpacing: '-0.04em' }}
      >
        {title}
      </h2>
      <div className="flex flex-col gap-6 md:grid md:grid-cols-2 md:gap-8">
        {steps.map((step) => (
          <ProcessStepCard key={step.number} step={step} />
        ))}
      </div>
    </section>
  )
}
