'use client'

import React from 'react'
import { HubspotProvider } from '@aaronhayes/react-use-hubspot-form'
import PricingForm from '../pricing-form'

const StartUpsData = {
  TITLE: 'SigNoz for startups',
  DESC: "Observability That Doesn't Burn Your Startup Budget",
  PRICE: {
    originalPrice: '$199',
    discountedPrice: '$99',
    period: 'month',
  },
  PORTAL_ID: '22308423',
  FORM_ID: '25bb31e3-ee97-46bb-b1d9-cf926e8d5122',
  ELIGIBILITY_POINTS: [
    {
      title: 'Less than 3 years old',
      icon: '👶',
    },
    {
      title: 'Fewer than 30 employees',
      icon: '👥',
    },
    {
      title: 'Raised less than $6 million',
      icon: '💸',
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
  return (
    <div className="relative bg-signoz_ink-500">
      {/* Background elements */}
      <div className="bg-dot-pattern masked-dots absolute top-0 flex h-screen w-full items-center justify-center" />
      <div className="absolute left-0 right-0 top-0 mx-auto h-[450px] w-full flex-shrink-0 rounded-[956px] bg-gradient-to-b from-[rgba(190,107,241,1)] to-[rgba(69,104,220,0)] bg-[length:110%] bg-no-repeat opacity-30 blur-[300px] sm:bg-[center_-500px] md:h-[956px]" />

      {/* Main content */}
      <div className="relative !mx-auto flex !w-[100vw] flex-col items-center border !border-b-0 border-dashed border-signoz_slate-400 px-0 pt-12 md:!w-[80vw] md:px-5 md:pt-24">
        {/* Header section */}
        <div className="mb-16 flex w-full flex-col items-center justify-center text-center">
          <h1 className="pinkish-gradient text-4xl font-bold tracking-tight md:text-5xl">
            {StartUpsData.TITLE}
          </h1>
          <p className="mt-4 max-w-2xl text-xl text-signoz_vanilla-100 md:text-2xl">
            {StartUpsData.DESC}
          </p>
          <div className="mt-6 inline-flex items-center rounded-full bg-white bg-opacity-10 px-6 py-2 text-2xl">
            Now Starts at &nbsp;
            <span className="text-signoz_vanilla-400 line-through opacity-70">
              {StartUpsData.PRICE.originalPrice}
            </span>
            <span className="ml-2 font-bold text-signoz_robin-300">
              {StartUpsData.PRICE.discountedPrice}
            </span>
            <span className="ml-1 text-signoz_vanilla-400">/ {StartUpsData.PRICE.period}</span>
          </div>
        </div>

        {/* Main content section */}
        <div className="w-full pb-24">
          <div className="mx-auto grid gap-8 md:grid-cols-2">
            {/* Left Column: Eligibility points and Testimonial */}
            <div className="flex flex-col justify-start px-6 md:px-12">
              {/* Eligibility points */}
              <div className="mb-12">
                {StartUpsData.ELIGIBILITY_POINTS.map((point, idx) => (
                  <div key={idx} className="mb-6 flex items-center">
                    <span className="mr-4 text-3xl">{point.icon}</span>
                    <span className="text-lg font-medium text-signoz_vanilla-100">
                      {point.title}
                    </span>
                  </div>
                ))}
              </div>

              {/* Testimonial moved to left side */}
              <div className="border-t border-dashed border-signoz_slate-400 pt-8">
                <blockquote className="mb-4 text-lg italic text-signoz_vanilla-400">
                  "{StartUpsData.TESTIMONIAL.quote}"
                </blockquote>
                <p className="text-base font-semibold text-signoz_vanilla-100">
                  — {StartUpsData.TESTIMONIAL.author},{' '}
                  <span className="text-signoz_robin-300">{StartUpsData.TESTIMONIAL.position}</span>
                </p>
              </div>
            </div>

            {/* Form */}
            <div className="flex items-start px-6 md:px-0">
              <div className="w-full rounded-lg border border-signoz_slate-400 bg-signoz_ink-400 p-6 shadow-md">
                <HubspotProvider>
                  <PricingForm portalId={StartUpsData.PORTAL_ID} formId={StartUpsData.FORM_ID} />
                </HubspotProvider>
              </div>
            </div>
          </div>

          {/* CTA Button removed */}
        </div>
      </div>
    </div>
  )
}

export default StartUps
