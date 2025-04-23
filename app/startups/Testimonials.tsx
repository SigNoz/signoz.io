'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import Image from 'next/image'

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

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0)

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1))
  }

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1))
  }

  return (
    <section className="bg-background py-16">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <motion.div
          className="mx-auto mb-12 max-w-3xl text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="mb-4 text-3xl font-bold">
            Loved by <span className="gradient-text pinkish-gradient">Startup Founders</span>
          </h2>
          <p className="text-lg text-gray-300">
            Hear from startups that have transformed their observability with SigNoz.
          </p>
        </motion.div>

        <div className="relative mx-auto max-w-3xl">
          {/* Navigation Buttons */}
          <button
            onClick={handlePrevious}
            className="absolute left-0 top-1/2 z-10 -translate-x-4 -translate-y-1/2 transform rounded-full bg-secondary/80 p-2 text-white focus:outline-none md:-translate-x-10"
            aria-label="Previous testimonial"
          >
            <ChevronLeft size={20} />
          </button>

          <button
            onClick={handleNext}
            className="absolute right-0 top-1/2 z-10 -translate-y-1/2 translate-x-4 transform rounded-full bg-secondary/80 p-2 text-white focus:outline-none md:translate-x-10"
            aria-label="Next testimonial"
          >
            <ChevronRight size={20} />
          </button>

          {/* Testimonial Slider */}
          <div className="overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5 }}
                className="rounded-xl border border-gray-800 bg-[#1c1c21]/60 p-8"
              >
                <div className="flex flex-col items-start gap-6 md:flex-row">
                  <div className="flex-shrink-0">
                    <div className="flex h-20 w-20 items-center justify-center overflow-hidden rounded-md bg-gray-800 p-2">
                      <Image
                        src={testimonials[currentIndex].logo}
                        alt={`${testimonials[currentIndex].name}'s company logo`}
                        width={80}
                        height={80}
                        style={{
                          maxWidth: '100%',
                          height: 'auto',
                          objectFit: 'contain',
                        }}
                      />
                    </div>
                  </div>
                  <div>
                    <div className="mb-4">
                      <blockquote>
                        <p className="text-lg italic text-gray-200">
                          "{testimonials[currentIndex].quote}"
                        </p>
                      </blockquote>
                    </div>
                    <div>
                      <h4 className="font-semibold">{testimonials[currentIndex].name}</h4>
                      <p className="text-sm text-gray-400">{testimonials[currentIndex].title}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Pagination Dots */}
          <div className="mt-8 flex justify-center space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`h-3 w-3 rounded-full transition-all duration-300 ${
                  index === currentIndex ? 'bg-primary' : 'bg-gray-600'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              ></button>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Testimonials
