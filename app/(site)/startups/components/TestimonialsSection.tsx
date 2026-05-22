import React from 'react'
import TestimonialSlider from './TestimonialSlider'
import { testimonials } from '../data'

export default function TestimonialsSection() {
  return (
    <section className="bg-background py-16">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <h2 className="mb-4 text-3xl font-bold">
            Loved by <span className="text-gradient">Startup Founders</span>
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
