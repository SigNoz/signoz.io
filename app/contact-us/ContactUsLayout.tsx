import React from 'react'
import ContactForm from './components/ContactForm'
import { contactUsData } from './data'

export default function ContactUsLayout() {
  return (
    <div className="relative flex min-h-screen flex-col bg-signoz_ink-500">
      {/* Background elements without the gradient */}
      <div className="bg-dot-pattern masked-dots absolute inset-0 overflow-hidden opacity-20"></div>
      <div className="absolute left-0 right-0 top-0 mx-auto h-[450px] w-full flex-shrink-0 rounded-[956px] bg-gradient-to-b from-[rgba(190,107,241,1)] to-[rgba(69,104,220,0)] bg-[length:110%] bg-no-repeat opacity-30 blur-[300px] sm:bg-[center_-500px] md:h-[956px]" />

      <div className="container mx-auto px-4 py-24 md:px-6 md:py-24 lg:px-8">
        <div className="grid items-start gap-12 md:grid-cols-2 lg:gap-16">
          {/* Left column: text content */}
          <div className="max-w-xl md:sticky md:top-24 md:self-start">
            <h1 className="mb-6 text-3xl font-bold leading-normal sm:leading-normal md:text-4xl md:leading-normal">
              <span className="text-gradient">{contactUsData.TITLE}</span>
            </h1>
            <h2 className="mb-8 text-lg text-signoz_vanilla-400/80 md:text-xl">
              {contactUsData.DESC}
            </h2>

            <div className="space-y-3">
              {contactUsData.OPTIONS.map((option, idx) => (
                <div key={idx} className="py-2 first:pt-0 last:pb-0">
                  {idx > 0 && <div className="mb-4 h-px w-full bg-signoz_slate-500/30"></div>}
                  <h3 className="text-base font-semibold text-signoz_vanilla-100">
                    {option.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-signoz_vanilla-100/70">
                    {option.description}
                  </p>
                </div>
              ))}
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
