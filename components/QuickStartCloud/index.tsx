'use client'

import React from 'react'
import Button from '@/components/Button/Button' // Use alias path
import TrackingLink from '@/components/TrackingLink' // Use alias path
import { ArrowRight, ChevronRight } from 'lucide-react'

export default function QuickStartCloud() {
  const sectionName = 'Quick Start Cloud Section'

  return (
    // Adapted container and background styles from GetStarted component
    <div className="mx-auto mb-12 w-full max-w-7xl bg-[url('/img/background_blur/Frame_2185.png')] bg-[length:55%] bg-[center_top_0rem] bg-no-repeat py-16 sm:bg-[center_top_-2rem]">
      {/* Add inner div for the second background image */}
      <div className="bg-[url('/img/background_blur/Ellipse_206.png')] bg-[center_top_calc(-250px)] bg-no-repeat">
        <div className="flex flex-col items-center gap-2 text-center">
          <h2 className="text-4xl font-bold text-signoz_vanilla-100 md:text-5xl">
            SigNoz Cloud is the Fastest Way to Try Out SigNoz
          </h2>
          {/* Remove the old paragraph and add the new stepper */}
          {/* <p className="text-lg text-signoz_vanilla-400">
            Sign Up <span className="text-signoz_robin-500">&gt;</span> Choose Data Source{' '}
            <span className="text-signoz_robin-500">&gt;</span> Set Up and Visualize
          </p> */}

          {/* Stepper Component */}
          <div className="mt-6 flex w-full max-w-4xl items-stretch rounded-lg border border-signoz_slate-500 bg-signoz_ink-400 p-4 shadow-md">
            {/* Step 1: Sign Up - Removed border & padding adjustment */}
            <div className="flex flex-1 items-center justify-center md:justify-start">
              <div className="mr-3 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-signoz_robin-500 text-sm font-bold text-white">
                1
              </div>
              <span className="text-base font-medium text-signoz_vanilla-100">Sign Up</span>
            </div>

            {/* Angled Separator 1 - Using Lucide Icon */}
            <div className="hidden items-center justify-center px-4 md:flex">
              {/* Replace SVG with Lucide Icon */}
              <ChevronRight size={32} className="text-orange-500" strokeWidth={1.5} />
            </div>

            {/* Step 2: Choose Data Source - Removed border & padding adjustment */}
            <div className="flex flex-1 items-center justify-center md:justify-start">
              <div className="mr-3 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-signoz_robin-500 text-sm font-bold text-white">
                2
              </div>
              <span className="text-base font-medium text-signoz_vanilla-100">
                Choose Data Source
              </span>
            </div>

            {/* Angled Separator 2 - Using Lucide Icon */}
            <div className="hidden items-center justify-center px-4 md:flex">
              {/* Replace SVG with Lucide Icon */}
              <ChevronRight size={32} className="text-orange-500" strokeWidth={1.5} />
            </div>

            {/* Step 3: Set Up and Visualize - Removed padding adjustment */}
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
            {' '}
            {/* Added margin top to space button from stepper */}
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
        <div className="relative flex items-center justify-center pt-12">
          {' '}
          {/* Added padding-top */}
          <img
            src="/img/landing/landing_thumbnail.webp"
            alt="SigNoz Dashboard"
            className="z-[0] -mb-16 w-3/5 rounded-lg max-sm:-mb-8" // Adjusted bottom margin
          />
        </div>
      </div>
    </div>
  )
}
