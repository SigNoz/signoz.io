'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, ChevronUp, MessageSquare } from 'lucide-react'

// FAQ Item data
const faqItems = [
  {
    question: 'Who is eligible for the SigNoz Startup Program?',
    answer:
      'Startups that are less than 3 years old, have fewer than 30 employees, and have raised less than $6 million in funding are eligible for our startup program.',
  },
  {
    question: 'How long does the startup pricing last?',
    answer:
      'The startup pricing is available for 12 months. After that, you can transition to our regular pricing plans, which will be matched to your usage needs.',
  },
  {
    question: 'What comes included in $99?',
    answer:
      'Our usage-based pricing is applicable for any data you send to SigNoz. If your usage doesn’t cross $99, your monthly bill will be $99. If it does, final bill will be calculated based on the amount of data you sent to SigNoz.',
  },
  {
    question: 'Can we cancel our subscription at any time?',
    answer:
      'Yes, you can cancel your subscription at any time with no penalties. We believe in providing value, not locking you into contracts.',
  },
]

// FAQ Item component
const FAQItem = ({
  question,
  answer,
  isOpen,
  onClick,
}: {
  question: string
  answer: string
  isOpen: boolean
  onClick: () => void
}) => {
  return (
    <motion.div
      className="overflow-hidden rounded-lg border border-gray-800 bg-[#1c1c21]/60"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <button
        className="flex w-full items-center justify-between p-5 text-left"
        onClick={onClick}
        aria-expanded={isOpen}
      >
        <span className="font-medium">{question}</span>
        {isOpen ? (
          <ChevronUp className="h-5 w-5 text-gray-400" />
        ) : (
          <ChevronDown className="h-5 w-5 text-gray-400" />
        )}
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="p-5 pt-0 text-gray-300">
              <p>{answer}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0) // First one open by default

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section className="bg-background py-16">
      <div className="container mx-auto max-w-4xl px-4 md:px-6 lg:px-8">
        <motion.div
          className="mb-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="mb-4 text-3xl font-bold">
            Frequently Asked <span className="gradient-text pinkish-gradient">Questions</span>
          </h2>
          <p className="text-lg text-gray-300">
            Everything you need to know about the startup program.
          </p>
        </motion.div>
        <div className="space-y-4">
          {faqItems.map((item, index) => (
            <FAQItem
              key={index}
              question={item.question}
              answer={item.answer}
              isOpen={openIndex === index}
              onClick={() => toggleFAQ(index)}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default FAQ
