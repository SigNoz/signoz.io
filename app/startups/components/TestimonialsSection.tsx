import React from 'react'
import TestimonialSlider from './TestimonialSlider'

// Static testimonial data
const testimonials = [
  {
    quote:
      "SigNoz is easy, simple, and affordable. It's made me very happy. I'm very happy with SigNoz. Now I'm about to go on vacation for a week, and I'm going to sleep beautifully because I know that if something's wrong, I'm going to get paged about it.",
    name: 'Shiv Ansal',
    title: 'Co-founder & CTO, Bands',
    logo: '/img/case_study/logos/bands-logo.png',
  },
  {
    quote:
      'The experience with SigNoz has been great. The open-source nature and OpenTelemetry support make it a perfect fit for our growing fintech infrastructure.',
    name: 'Alexandre Moray',
    title: 'Senior Software Engineer',
    logo: '/img/case_study/logos/linkcy-logo-white-1.png',
  },
  {
    quote:
      'The ingestion rates and search speeds with SigNoz have significantly improved our troubleshooting speed.',
    name: 'Avneesh Kumar',
    title: 'VP of Engineering at Mailmodo',
    logo: '/img/case_study/mailmodo-logo-white.svg',
  },
]

export default function TestimonialsSection() {
  return (
    <section className="bg-background py-16">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <h2 className="mb-4 text-3xl font-bold">
            Loved by <span className="gradient-text pinkish-gradient">Startup Founders</span>
          </h2>
          <p className="text-lg text-gray-300">
            Hear from startups that have transformed their observability with SigNoz.
          </p>
        </div>

        <div className="relative mx-auto max-w-3xl">
          <TestimonialSlider testimonials={testimonials} />
        </div>
      </div>
    </section>
  )
}
