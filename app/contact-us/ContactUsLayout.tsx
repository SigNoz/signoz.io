import React from 'react'
import { CheckCircle } from 'lucide-react'
import ContactForm from './components/ContactForm'
import { contactUsData } from './data'
import Heading from '../../components/ui/Heading'
import Hero from '@/components/ui/Hero'

export default function ContactUsLayout() {
  return (
    <div className="relative flex min-h-screen flex-col bg-signoz_ink-500">
      {/* Background elements without the gradient */}
      <div className="bg-dot-pattern masked-dots absolute inset-0 overflow-hidden opacity-20"></div>
      <div className="absolute left-0 right-0 top-0 mx-auto h-[450px] w-full flex-shrink-0 rounded-[956px] bg-gradient-to-b from-[rgba(190,107,241,1)] to-[rgba(69,104,220,0)] bg-[length:110%] bg-no-repeat opacity-30 blur-[300px] sm:bg-[center_-500px] md:h-[956px]" />

      <div className="py-18 container mx-auto px-4 md:px-6 md:py-20 lg:px-8">
        <div className="mb-24 text-center">
          <Hero>{contactUsData.TITLE}</Hero>

          {/* Features section like in PricingFeatures.tsx */}
          <div className="mx-auto mb-6 mt-2 flex w-full max-w-4xl flex-col items-center gap-3 font-bold md:flex-row md:justify-center md:gap-8">
            {contactUsData.FEATURES.map((feature, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <CheckCircle className="text-green-500" size={16} />
                <span className="text-base text-signoz_vanilla-400">{feature.title}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="grid items-start gap-12 md:grid-cols-2 lg:gap-16">
          {/* Left column: text content */}
          <div className="max-w-xl md:sticky md:top-24 md:self-start">
            <h2 className="mb-6 text-2xl font-bold text-signoz_vanilla-100/70">
              Choose between any of the following options:
            </h2>

            <div className="space-y-6">
              {contactUsData.OPTIONS.map((option, idx) => (
                <div key={idx} className="py-2 first:pt-0 last:pb-0">
                  <h3 className="text-xl font-semibold text-signoz_vanilla-100">{option.title}</h3>
                  <p className="mt-2 text-base leading-relaxed text-signoz_vanilla-100/70">
                    {option.description}
                  </p>
                </div>
              ))}

              <div className="my-5 w-full border-t border-solid border-signoz_slate-300"></div>

              <div className="pt-6 text-base text-signoz_vanilla-100/70">
                {contactUsData.FOOTER}
              </div>
            </div>
          </div>

          {/* Right column: contact form */}
          <div className="rounded-xl border border-signoz_slate-400 bg-[rgb(244_242_250)] p-6 shadow-xl backdrop-blur-sm">
            <ContactForm portalId={contactUsData.PORTAL_ID} formId={contactUsData.FORM_ID} />
          </div>
        </div>
      </div>
    </div>
  )
}
