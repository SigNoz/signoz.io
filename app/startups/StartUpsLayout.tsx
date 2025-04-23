import React from 'react'
import StartUpsHero from './components/StartUpsHero'
import FeaturesSection from './components/FeaturesSection'
import TestimonialsSection from './components/TestimonialsSection'
import FAQSection from './components/FAQSection'
import CTASection from './components/CTASection'

// Static data that can be server-rendered
export const StartUpsData = {
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

export default function StartUpsLayout() {
  return (
    <div className="relative flex min-h-screen flex-col bg-signoz_ink-500">
      {/* Hero Section */}
      <StartUpsHero startUpsData={StartUpsData} />

      {/* Features Section */}
      <FeaturesSection />

      {/* Testimonials Section */}
      <TestimonialsSection />

      {/* FAQ Section */}
      <FAQSection />

      {/* CTA Section */}
      <CTASection />
    </div>
  )
}
