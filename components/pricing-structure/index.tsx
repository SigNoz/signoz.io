import React from 'react'
import Heading from '../../components/ui/Heading'
import SubHeading from '../../components/ui/SubHeading'
import { H1, H4 } from '../Headings/Headings'

const PricingStructure = () => {
  return (
    <section className="">
      <div className="container mx-auto px-5 py-24">
        <div className="mb-10 flex flex-col items-center justify-center text-center">
          <Heading type={H4}>Pricing you can trust.</Heading>
          <SubHeading>
            Tired of Datadog’s unpredictable bills or New Relic’s user-based pricing?&nbsp;
            <br className="hidden lg:inline" />
            We’re here for you.
          </SubHeading>
        </div>
        <div className="mx-auto flex flex-wrap justify-center gap-y-5 md:max-w-md lg:max-w-5xl">
          <div className="pricing-card px-8 py-1 md:w-full lg:w-1/3 xl:w-1/3">
            <Heading type={3}>No user-based pricing</Heading>
            <p className="mb-4 text-base leading-relaxed text-gray-400">
              Add as many team members as you want.
            </p>
          </div>
          <div className="pricing-card px-8 py-1 md:w-full lg:w-1/3 xl:w-1/3">
            <Heading type={3}>Simple usage-based pricing</Heading>
            <p className="mb-4 text-base leading-relaxed text-gray-400">
              Only pay for the data you send.
            </p>
          </div>
          <div className="pricing-card px-8 py-1 md:w-full lg:w-1/3 xl:w-1/3">
            <Heading type={3}>No special pricing for custom metrics</Heading>
            <p className="mb-4 text-base leading-relaxed text-gray-400">
              All metrics charged simply at $0.1 per million samples.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
export default PricingStructure
