import { TrustpilotStars } from '../../Atoms/TrustpilotStars/TrustpilotStars'

export interface Testimonial {
  quote: string
  author: string
  location: string
  rating: number
}

export interface TestimonialsSectionProps {
  title?: string
  reviews?: Testimonial[]
}

interface ReviewCardProps {
  testimonial: Testimonial
}

function ReviewCard({ testimonial }: ReviewCardProps) {
  return (
    <div
      style={{
        width: 280,
        flexShrink: 0,
        background: 'var(--light-100)',
        borderRadius: 'var(--radius-card)',
        boxShadow: '0 2px 16px rgba(0,0,0,0.07)',
      }}
      className="md:w-auto md:flex-shrink p-5"
    >
      <TrustpilotStars rating={testimonial.rating} size="md" />
      <p
        className="text-text-main-semibold mt-3 italic"
        style={{ color: 'var(--text)' }}
      >
        {testimonial.quote}
      </p>
      <p
        className="text-text-xsmall mt-2"
        style={{ color: 'var(--text)', opacity: 0.65 }}
      >
        — {testimonial.author}, {testimonial.location}
      </p>
    </div>
  )
}

export function TestimonialsSection({ title, reviews = [] }: TestimonialsSectionProps) {
  return (
    <section
      className="px-4 py-10"
      style={{ background: 'var(--bg)' }}
    >
      {title && (
        <h3
          className="text-h3 font-black uppercase mb-6"
          style={{ letterSpacing: '-0.04em', color: 'var(--text)' }}
        >
          {title}
        </h3>
      )}
      <div
        className="flex gap-4 overflow-x-auto md:grid md:grid-cols-2 md:gap-4 md:overflow-visible"
        style={{ scrollbarWidth: 'none' }}
      >
        {reviews.map((review, index) => (
          <ReviewCard key={index} testimonial={review} />
        ))}
      </div>
    </section>
  )
}
