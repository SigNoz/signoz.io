import React from 'react'
import FAQAccordion from './FAQAccordion'

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
    question: 'What happens if we exceed the included usage limits?',
    answer:
      "If you exceed the included limits, you'll be charged for the additional usage at our standard rates. We'll always notify you before you reach your limits so there are no surprises.",
  },
  {
    question: 'How do we verify our startup status?',
    answer:
      'After applying, our team will review your application and may request documentation to verify your eligibility, such as incorporation documents or funding information.',
  },
  {
    question: 'Can we cancel our subscription at any time?',
    answer:
      'Yes, you can cancel your subscription at any time with no penalties. We believe in providing value, not locking you into contracts.',
  },
]

export default function FAQSection() {
  return (
    <section className="bg-background py-16">
      <div className="container mx-auto max-w-4xl px-4 md:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold">
            Frequently Asked <span className="gradient-text pinkish-gradient">Questions</span>
          </h2>
          <p className="text-lg text-gray-300">
            Everything you need to know about the startup program.
          </p>
        </div>
        <FAQAccordion faqItems={faqItems} />
      </div>
    </section>
  )
}
