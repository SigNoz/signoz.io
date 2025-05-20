import React from 'react'
import HeroForm from './HeroForm'
import EligibilityPoint from './EligibilityPoint'
import { StartUpsData } from '../data'

type StartUpsHeroProps = {
  startUpsData: typeof StartUpsData
}

export default function StartUpsHero({ startUpsData }: StartUpsHeroProps) {
  return (
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
          <div className="max-w-xl">
            <h1 className="mb-6 text-4xl font-bold md:text-5xl">
              <span className="text-gradient">{startUpsData.TITLE}</span>
            </h1>
            <h2 className="mb-8 text-xl text-signoz_vanilla-100 md:text-2xl">
              {startUpsData.DESC}
            </h2>

            <div className="mb-8 inline-flex flex-col rounded-lg border border-signoz_slate-400 bg-[#1c1c21]/60 p-4 backdrop-blur-sm">
              <div className="flex items-center">
                <div className="mr-3 text-lg font-medium text-signoz_vanilla-100">
                  Now Starts at
                </div>
                <div className="flex items-center">
                  <span className="mr-2 text-signoz_vanilla-400 line-through opacity-70">
                    {startUpsData.PRICE.originalPrice}
                  </span>
                  <span className="text-2xl font-bold text-signoz_robin-300">
                    {startUpsData.PRICE.discountedPrice}
                  </span>
                  <span className="ml-1 text-signoz_vanilla-400">
                    / {startUpsData.PRICE.period}
                  </span>
                </div>
              </div>
              <div className="mt-2 text-sm text-signoz_vanilla-100/80">
                Includes Data Sent till $19USD
              </div>
            </div>

            <div className="space-y-4">
              {startUpsData.ELIGIBILITY_POINTS.map((point, idx) => (
                <EligibilityPoint key={idx} point={point} index={idx} />
              ))}
            </div>
          </div>

          {/* Right column: application form */}
          <div className="rounded-xl border border-signoz_slate-400 bg-[rgb(244_242_250)] p-6 shadow-xl backdrop-blur-sm">
            <HeroForm portalId={startUpsData.PORTAL_ID} formId={startUpsData.FORM_ID} />
          </div>
        </div>
      </div>
    </section>
  )
}
