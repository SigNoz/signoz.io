'use client'

import React from 'react'
import Heading from '../../components/ui/Heading'
import SubHeading from '../../components/ui/SubHeading'
import { ArrowRight, Book, BookOpen } from 'lucide-react'
import Button from '@/components/Button/Button'
import TrackingLink from '@/components/TrackingLink'

const DataProtectionLaws = ({ isInPricingPage = false }) => {
  return (
    <section>
      <div className="section-container flex h-auto w-auto border !border-b-0 !border-r-0 border-dashed border-signoz_slate-400 px-8 py-10 md:px-10">
        <div className="flex flex-col">
          <div>
            <p className="mb-4 block text-2xl font-semibold text-signoz_vanilla-100 md:mb-2">
              Worried about Data Protection Laws?
            </p>
            {!isInPricingPage ? (
              <ul className="list-['—_'] pl-5 ">
                <li className="mb-2 max-w-[100vw] text-sm font-normal leading-9 text-signoz_vanilla-400 sm:w-[35rem] md:max-w-[50vw] md:text-base">
                  &nbsp;Store your data in the US, EU or India region depending on your needs.
                </li>
                <li className="max-w-[100vw] text-sm font-normal leading-9 text-signoz_vanilla-400 sm:w-[35rem] md:max-w-[50vw] md:text-base">
                  &nbsp;You can self-host SigNoz or opt for our managed self-hosted offerings to
                  have complete adherence to data privacy and regulation laws.
                </li>
              </ul>
            ) : (
              <div className="mb-10 text-base font-normal leading-9 text-signoz_vanilla-400">
                No need to send data outside your region. We have data centers in US, EU and India
                to comply with data privacy regulations. You can also host SigNoz in your own cloud.
              </div>
            )}
          </div>
          <img src="/img/graphics/homepage/feature-graphic-data-protection.webp" alt="" />
          {!isInPricingPage ? (
            <div className="mt-[18px] flex flex-col gap-3 sm:flex-row">
              <TrackingLink
                href="/teams/"
                className="inline-block"
                clickType="Primary CTA"
                clickName="Sign Up Button"
                clickText="Use SigNoz Cloud"
                clickLocation="Data Protection Section"
              >
                <Button
                  className="flex-center text-xs sm:text-sm"
                  id="btn-use-signoz-cloud-homepage"
                >
                  Use SigNoz Cloud <ArrowRight className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                </Button>
              </TrackingLink>
              <TrackingLink
                href="/docs/install/"
                className="inline-block"
                clickType="Secondary CTA"
                clickName="Self-Host Link"
                clickText="Self-Host SigNoz"
                clickLocation="Data Protection Section"
              >
                <Button
                  type={Button.TYPES.SECONDARY}
                  className="flex-center text-xs sm:text-sm"
                  id="btn-self-host-signoz-homepage"
                >
                  <BookOpen className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                  Self-Host SigNoz
                </Button>
              </TrackingLink>
              <TrackingLink
                href="/enterprise/"
                className="inline-block"
                clickType="Secondary CTA"
                clickName="On-Prem Link"
                clickText="On-prem, managed by SigNoz"
                clickLocation="Data Protection Section"
              >
                <Button
                  type={Button.TYPES.SECONDARY}
                  className="flex-center text-xs sm:text-sm"
                  id="btn-on-prem-signoz-homepage"
                >
                  <BookOpen className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                  On-prem, managed by SigNoz
                </Button>
              </TrackingLink>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  )
}

export default DataProtectionLaws
