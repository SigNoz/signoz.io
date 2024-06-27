import React from 'react'
import Heading from '../../components/ui/Heading'
import SubHeading from '../../components/ui/SubHeading'
import { H1, H4 } from '../Headings/Headings'

const PricingStructure = () => {
  return (
    <section className="border border-signoz_slate-400 border-dashed">
      <div className="container mx-auto px-10 py-10">
        <div className="mb-10 flex flex-col justify-start">
          <p className="text-2xl font-semibold text-signoz_vanilla-100">Pricing you can trust</p>
          <p className="text-signoz_vanilla-400 text-base font-normal leading-9">
            Tired of Datadog’s unpredictable bills or New Relic’s user-based pricing?&nbsp;
            <br className="hidden lg:inline" />
            We’re here for you.
          </p>
        </div>
        <div className="mx-auto flex flex-col justify-center gap-y-5 md:max-w-md lg:max-w-5xl">
          <div className="bg-signoz_ink-400 p-4 border border-signoz_slate-500 rounded w-full">
            <p className="text-signoz_vanilla-100 text-base font-medium mb-2">No user-based pricing</p>
            <p className="text-signoz_vanilla-400 text-sm font-normal leading-9 m-0">
              Add as many team members as you want.
            </p>
          </div>
          <div className="bg-signoz_ink-400 p-4 border border-signoz_slate-500 rounded w-full">
            <p className="text-signoz_vanilla-100 text-base font-medium mb-2">Simple usage-based pricing</p>
            <p className="text-signoz_vanilla-400 text-sm font-normal leading-9 m-0">
              Only pay for the data you send.
            </p>
          </div>
          <div className="bg-signoz_ink-400 p-4 border border-signoz_slate-500 rounded w-full">
            <p className="text-signoz_vanilla-100 text-base font-medium mb-2">No special pricing for custom metrics</p>
            <p className="text-signoz_vanilla-400 text-sm font-normal leading-9 m-0">
              All metrics charged simply at $0.1 per million samples.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
export default PricingStructure
