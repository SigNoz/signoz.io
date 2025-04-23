'use client'

import React, { useEffect } from 'react'
import { HubspotProvider } from '@aaronhayes/react-use-hubspot-form'
import PricingForm from '../pricing-form'
import { motion } from 'framer-motion'
import Features from './Features'
import Testimonials from './Testimonials'
import FAQ from './FAQ'
import CTA from './CTA'

const StartUpsData = {
  TITLE: 'SigNoz for Startups',
  DESC: "Observability That Doesn't Burn Your Startup Budget",
  PRICE: {
    originalPrice: '$199',
    discountedPrice: '$99',
    period: 'month',
  },
  PORTAL_ID: '22308423',
  FORM_ID: '93cf9682-374a-489f-92c6-d3f2d34862e1',
  ELIGIBILITY_POINTS: [
    {
      title: 'Less than 3 years old',
      icon: (
        <svg
          className="h-5 w-5 text-yellow-400"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
          <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
          <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
          <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
        </svg>
      ),
      bgColor: 'bg-yellow-500/10',
      textColor: 'text-yellow-400',
    },
    {
      title: 'Fewer than 30 employees',
      icon: (
        <svg
          className="h-5 w-5 text-blue-400"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      ),
      bgColor: 'bg-blue-500/10',
      textColor: 'text-blue-400',
    },
    {
      title: 'Raised less than $6 million',
      icon: (
        <svg
          className="h-5 w-5 text-green-400"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect width="20" height="16" x="2" y="4" rx="2" />
          <path d="M12 4v16" />
          <path d="M2 12h20" />
        </svg>
      ),
      bgColor: 'bg-green-500/10',
      textColor: 'text-green-400',
    },
  ],
  TESTIMONIAL: {
    quote:
      "SigNoz is easy, simple, and affordable. It's made me very happy. I'm very happy with SigNoz. Now I'm about to go on vacation for a week, and I'm going to sleep beautifully because I know that if something's wrong, I'm going to get paged about it.",
    author: 'Shiv Ansal',
    position: 'Co-founder & CTO, Bands',
  },
}

function StartUps() {
  useEffect(() => {
    // Scroll to top on page load
    window.scrollTo(0, 0)

    // Update document title
    document.title = "SigNoz for Startups | Observability That Doesn't Burn Your Budget"
  }, [])

  return (
    <div className="relative flex min-h-screen flex-col bg-signoz_ink-500">
      {/* Hero Section */}
      <section
        className="hero-pattern relative overflow-hidden pb-16 pt-32"
        style={{
          backgroundImage:
            'radial-gradient(circle at 30% 20%, rgba(110, 70, 231, 0.15), transparent 35%), radial-gradient(circle at 80% 80%, rgba(59, 130, 246, 0.1), transparent 35%)',
        }}
      >
        {/* Animated background particles */}
        <div className="bg-dot-pattern masked-dots absolute inset-0 overflow-hidden opacity-20"></div>
        <div className="absolute left-0 right-0 top-0 mx-auto h-[450px] w-full flex-shrink-0 rounded-[956px] bg-gradient-to-b from-[rgba(190,107,241,1)] to-[rgba(69,104,220,0)] bg-[length:110%] bg-no-repeat opacity-30 blur-[300px] sm:bg-[center_-500px] md:h-[956px]" />

        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="grid items-center gap-12 md:grid-cols-2 lg:gap-16">
            {/* Left column: text content */}
            <motion.div
              className="max-w-xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="mb-6 text-4xl font-bold md:text-5xl">
                <span className="gradient-text pinkish-gradient">{StartUpsData.TITLE}</span>
              </h1>
              <h2 className="mb-8 text-xl text-signoz_vanilla-100 md:text-2xl">
                {StartUpsData.DESC}
              </h2>

              <motion.div
                className="mb-8 inline-flex rounded-lg border border-signoz_slate-400 bg-[#1c1c21]/60 p-4 backdrop-blur-sm"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                <div className="flex items-center">
                  <div className="mr-3 text-lg font-medium text-signoz_vanilla-100">
                    Now Starts at
                  </div>
                  <div className="flex items-center">
                    <span className="mr-2 text-signoz_vanilla-400 line-through opacity-70">
                      {StartUpsData.PRICE.originalPrice}
                    </span>
                    <span className="text-2xl font-bold text-signoz_robin-300">
                      {StartUpsData.PRICE.discountedPrice}
                    </span>
                    <span className="ml-1 text-signoz_vanilla-400">
                      / {StartUpsData.PRICE.period}
                    </span>
                  </div>
                </div>
              </motion.div>

              <div className="space-y-4">
                {StartUpsData.ELIGIBILITY_POINTS.map((point, idx) => (
                  <motion.div
                    key={idx}
                    className="flex items-center"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + idx * 0.1, duration: 0.5 }}
                  >
                    <div
                      className={`h-10 w-10 rounded-full ${point.bgColor} mr-4 flex items-center justify-center`}
                    >
                      {point.icon}
                    </div>
                    <div className="text-signoz_vanilla-100">{point.title}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Right column: application form */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.7 }}
              className="rounded-xl border border-signoz_slate-400 bg-[#1c1c21]/80 p-6 shadow-xl backdrop-blur-sm"
            >
              <HubspotProvider>
                <PricingForm portalId={StartUpsData.PORTAL_ID} formId={StartUpsData.FORM_ID} />
              </HubspotProvider>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <Features />

      {/* Testimonials Section */}
      <Testimonials />

      {/* FAQ Section */}
      <FAQ />

      {/* CTA Section */}
      <CTA />
    </div>
  )
}

export default StartUps
