import React from 'react'
import Button from '@/components/Button/Button'
import TrackingLink from '@/components/TrackingLink'
import { ArrowRight, ChevronRight } from 'lucide-react'

export default function QuickStartCloud() {
  const sectionName = 'Quick Start Cloud Section'

  return (
    <div className="mx-auto mb-12 mt-16 w-full max-w-7xl bg-[url('/img/background_blur/Frame_2185.png')] bg-[length:100%_auto] bg-[center_top] bg-no-repeat py-8 sm:bg-[length:55%] sm:bg-[center_top_-2rem] sm:py-12 md:py-16">
      <div className="bg-[url('/img/background_blur/Ellipse_206.png')] bg-[center_top_calc(-150px)] bg-no-repeat sm:bg-[center_top_calc(-250px)]">
        <div className="flex flex-col items-center gap-2 px-4 text-center sm:px-0">
          <h2 className="text-4xl font-bold text-signoz_vanilla-100 md:text-5xl">
            SigNoz Cloud is the Fastest Way to Try Out SigNoz
          </h2>

          <div className="mt-6 flex w-full max-w-4xl flex-col items-center rounded-lg border border-signoz_slate-500 bg-signoz_ink-400 p-4 shadow-md md:flex-row md:items-stretch">
            {/* Step 1: Sign Up */}
            <div className="mb-4 flex flex-1 items-center justify-center md:mb-0 md:justify-start">
              <div className="mr-3 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-signoz_robin-500 text-sm font-bold text-white">
                1
              </div>
              <span className="text-base font-medium text-signoz_vanilla-100">Sign Up</span>
            </div>

            {/* Separator 1 - Hidden by default, shown on md */}
            <div className="hidden items-center justify-center px-4 md:flex">
              <ChevronRight size={32} className="text-orange-500" strokeWidth={1.5} />
            </div>

            {/* Step 2: Choose Data Source */}
            <div className="mb-4 flex flex-1 items-center justify-center md:mb-0 md:justify-start">
              <div className="mr-3 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-signoz_robin-500 text-sm font-bold text-white">
                2
              </div>
              <span className="text-base font-medium text-signoz_vanilla-100">
                Choose Data Source
              </span>
            </div>

            {/* Separator 2 - Hidden by default, shown on md */}
            <div className="hidden items-center justify-center px-4 md:flex">
              <ChevronRight size={32} className="text-orange-500" strokeWidth={1.5} />
            </div>

            {/* Step 3: Set Up and Visualize */}
            <div className="flex flex-1 items-center justify-center md:justify-start">
              <div className="mr-3 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-signoz_robin-500 text-sm font-bold text-white">
                3
              </div>
              <span className="text-base font-medium text-signoz_vanilla-100">
                Set Up & Visualize
              </span>
            </div>
          </div>

          {/* Button remains below the stepper */}
          <div className="mt-8">
            <Button id="btn-quick-start-cloud">
              <TrackingLink
                href="/teams/" // Link to the signup page
                className="flex-center"
                clickType="Primary CTA"
                clickName="Sign Up Button"
                clickText="Get Started - Free"
                clickLocation={sectionName}
              >
                Get Started - Free
                <ArrowRight size={14} className="ml-2" />
              </TrackingLink>
            </Button>
          </div>
        </div>
        {/* Add the missing thumbnail image */}
        <div className="relative flex items-center justify-center px-4 pt-8 sm:px-0 md:pt-12">
          <img
            src="/img/landing/landing_thumbnail.webp"
            alt="SigNoz Dashboard"
            className="z-[0] -mb-8 w-full max-w-md rounded-lg sm:-mb-12 sm:max-w-lg md:-mb-16 md:max-w-2xl lg:max-w-3xl"
          />
        </div>
      </div>
    </div>
  )
}
