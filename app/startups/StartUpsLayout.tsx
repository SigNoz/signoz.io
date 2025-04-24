import React from 'react'
import StartUpsHero from './components/StartUpsHero'
import FeaturesSection from './components/FeaturesSection'
import TestimonialsSection from './components/TestimonialsSection'
import FAQSection from './components/FAQSection'
import CTASection from './components/CTASection'
import { StartUpsData } from './data'

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
