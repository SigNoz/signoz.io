import React from 'react'
import TrackingLink from '@/components/TrackingLink'
import { ArrowUpRight } from 'lucide-react'

const StartupProgram = () => {
  return (
    <div className="section-container !mx-auto !w-[100vw] border !border-b-0 border-dashed border-signoz_slate-400 !px-0 md:!w-[80vw]">
      <div className="flex flex-col sm:flex-row">
        <div className="!w-[100%] flex-1 md:!w-[300px]">
          <p className="sticky top-[100px] px-8 pl-0 pt-10 text-4xl font-bold !leading-[3.5rem] text-signoz_vanilla-100 sm:text-[44px] md:px-0 md:pl-12">
            SigNoz for <br /> Startups
          </p>
        </div>
        <div className="flex-[2_2_0%]">
          <div className="ml-0 flex flex-col justify-between gap-8 border !border-b-0 !border-r-0 !border-t-0 border-dashed border-signoz_slate-400 py-10 sm:flex-row md:pl-10">
            <div className="flex shrink-[10] flex-col gap-16 px-8 md:px-0">
              <div>
                <p className="mb-2 block text-base font-medium text-signoz_vanilla-100">
                  Special Pricing
                </p>
                <p className="m-0 block text-sm font-normal leading-9 text-signoz_vanilla-400">
                  Get 50% off on SigNoz standard pricing with our Startup Program -{' '}
                  <span className="font-bold">just $19/month</span> instead of $49/month. <br />
                  <br />
                  Perfect for early-stage companies looking for enterprise-grade observability that
                  won't burn your startup budget.
                </p>
              </div>
              <div>
                <p className="mb-2 block text-base font-medium text-signoz_vanilla-100">
                  Eligibility Requirements
                </p>
                <ul className="m-0 block list-disc text-sm font-normal leading-9 text-signoz_vanilla-400">
                  <li>Less than 3 years old</li>
                  <li>Fewer than 30 employees</li>
                  <li>Raised less than $6 million</li>
                </ul>
              </div>
              <div>
                <TrackingLink
                  href="/startups"
                  target="_blank"
                  clickType="Primary CTA"
                  clickName="Startup Program Link"
                  clickLocation="Pricing Page Start Up Section"
                  clickText="Learn More & Apply"
                  className="bg-primary hover:bg-primary/90 hover:shadow-primary/20 inline-flex items-center justify-center rounded-md py-3 text-base font-medium text-white transition-all hover:shadow-lg"
                >
                  Learn More & Apply
                  <ArrowUpRight className="ml-2 h-4 w-4" />
                </TrackingLink>
              </div>
            </div>
            <div className="mx-auto aspect-[272/352] w-[320px] max-w-[50vw]">
              <img src="/img/graphics/homepage/feature-graphic-otel.webp" alt="Startup Program" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default StartupProgram
