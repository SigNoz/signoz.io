'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import Image from 'next/image'

type Testimonial = {
  quote: string
  name: string
  title: string
  logo: string
}

type TestimonialSliderProps = {
  testimonials: Testimonial[]
}

export default function TestimonialSlider({ testimonials }: TestimonialSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0)

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1))
  }

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1))
  }

  return (
    <>
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
    </>
  )
}
