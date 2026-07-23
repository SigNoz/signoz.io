import React from 'react'
import Image from 'next/image'
import { ArrowRight, BookOpen } from 'lucide-react'
import Button from '@/components/ui/Button'
import TrackingLink from '@/components/TrackingLink'
import featureGraphicDataProtection from '@/public/img/graphics/homepage/feature-graphic-data-protection.svg?url'

const DataProtectionLaws = ({ isInPricingPage = false }) => {
  return (
    <section>
      <div className="section-container border-border grid h-auto w-auto border !border-r-0 !border-b-0 border-dashed px-8 !py-10 md:px-10">
        <div className="grid min-w-0 grid-cols-1">
          <div>
            <p className="text-l1-foreground mb-4 block text-2xl font-semibold md:mb-2">
              Worried about Data Protection Laws?
            </p>
            {!isInPricingPage ? (
              <ul className="list-['—_'] pl-5">
                <li className="text-muted-foreground mb-2 max-w-full text-sm leading-9 font-normal sm:w-[35rem] md:max-w-[min(35rem,100%)] md:text-base">
                  &nbsp;Store your data in the US, EU or India region depending on your needs.
                </li>
                <li className="text-muted-foreground max-w-full text-sm leading-9 font-normal sm:w-[35rem] md:max-w-[min(35rem,100%)] md:text-base">
                  &nbsp;You can self-host SigNoz or opt for our managed self-hosted offerings to
                  have complete adherence to data privacy and regulation laws.
                </li>
              </ul>
            ) : (
              <div className="text-muted-foreground mb-10 text-base leading-9 font-normal">
                No need to send data outside your region. We have data centers in US, EU and India
                to comply with data privacy regulations. You can also host SigNoz in your own cloud.
              </div>
            )}
          </div>
          <Image
            className="w-full"
            src={featureGraphicDataProtection}
            alt="Map showing SigNoz cloud regions in the United States, European Union, and India"
            width={720}
            height={400}
          />
          {!isInPricingPage ? (
            <div className="mt-[18px] grid grid-cols-1 gap-3 xl:grid-cols-[repeat(3,max-content)]">
              <TrackingLink
                href="/teams/"
                className="inline-block"
                clickType="Primary CTA"
                clickName="Sign Up Button"
                clickText="Use SigNoz Cloud"
                clickLocation="Data Protection Section"
              >
                <Button
                  variant="legacyPrimary"
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
                  variant="legacySecondary"
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
                  variant="legacySecondary"
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
