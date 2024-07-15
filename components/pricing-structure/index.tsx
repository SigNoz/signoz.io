import React from 'react'
import Heading from '../../components/ui/Heading'
import SubHeading from '../../components/ui/SubHeading'
import { H1, H4 } from '../Headings/Headings'

const PricingStructure = () => {
  return (
    <section className="border !border-b-0 !border-r-0 border-dashed border-signoz_slate-400">
      <div className="section-container mx-auto px-8 py-10 md:px-10">
        <div className="flex flex-col justify-between">
          <div className="mb-5">
            <div className="flex flex-col justify-start">
              <p className="mb-4 block text-2xl font-semibold text-signoz_vanilla-100 md:mb-2">
                Pricing you can trust
              </p>
              <p className="text-sm font-normal leading-9 text-signoz_vanilla-400 md:text-base">
                Tired of Datadog’s unpredictable bills or New Relic’s user-based pricing?&nbsp;
                <br className="hidden lg:inline" />
                We’re here for you.
              </p>
            </div>
          </div>
          <div>
            <div className="flex flex-col justify-center gap-y-4">
              <div className="w-full rounded border border-signoz_slate-500 bg-signoz_ink-400 p-4">
                <p className="mb-2 text-base font-medium text-signoz_vanilla-100">
                  No user-based pricing
                </p>
                <p className="m-0 text-sm font-normal leading-9 text-signoz_vanilla-400">
                  Add as many team members as you want.
                </p>
              </div>
              <div className="w-full rounded border border-signoz_slate-500 bg-signoz_ink-400 p-4">
                <p className="mb-2 text-base font-medium text-signoz_vanilla-100">
                  No host (container or nodes) based pricing
                </p>
                <p className="m-0 text-sm font-normal leading-9 text-signoz_vanilla-400">
                  No need to worry about auto-scaling during peak hours.
                </p>
              </div>
              <div className="w-full rounded border border-signoz_slate-500 bg-signoz_ink-400 p-4">
                <p className="mb-2 text-base font-medium text-signoz_vanilla-100">
                  Simple usage-based pricing
                </p>
                <p className="m-0 text-sm font-normal leading-9 text-signoz_vanilla-400">
                  Only pay for the data you send.
                </p>
              </div>
              <div className="w-full rounded border border-signoz_slate-500 bg-signoz_ink-400 p-4">
                <p className="mb-2 text-base font-medium text-signoz_vanilla-100">
                  No special pricing for custom metrics
                </p>
                <p className="m-0 text-sm font-normal leading-9 text-signoz_vanilla-400">
                  All metrics charged simply at $0.1 per million samples.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
export default PricingStructure
