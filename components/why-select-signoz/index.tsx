import React from 'react'
import Observability from '@/components/observability'
import DataProtectionLaws from '@/components/data-protection-laws'
import PricingStructure from '@/components/pricing-structure'
import { CommunityEdition } from '@/components/community-edition'
import { SignozDatalog } from '@/components/signoz-datalog'
import Image from 'next/image'
import featureGraphicEnterprise from '@/public/img/graphics/homepage/feature-graphic-enterprise.svg?url'
import { cn } from '../../app/lib/utils'

const WhySelectSignoz = ({
  isInPricingPage = false,
  className,
}: {
  isInPricingPage?: boolean
  className?: string
}) => {
  return (
    <div
      className={cn(
        'section-container mx-auto w-full border !border-b-0 border-dashed border-signoz_slate-400 !px-0 md:w-[80vw]',
        className
      )}
    >
      <div
        className={cn(
          `grid grid-cols-1 sm:grid-cols-[1fr_2fr]`,
          !isInPricingPage && 'md:grid-cols-[300px_1fr]'
        )}
      >
        <div className="min-w-0">
          <p className="sticky top-[3rem] px-8 pt-4 text-4xl font-bold !leading-[3.5rem] text-signoz_vanilla-100 sm:px-4 sm:text-4xl lg:px-8 lg:pt-10">
            Why <br className="hidden md:block" /> select <br className="hidden md:block" /> SigNoz?{' '}
          </p>
        </div>
        <div className="min-w-0">
          <div className="ml-0 grid grid-cols-1 gap-8 border !border-b-0 !border-r-0 !border-t-0 border-dashed border-signoz_slate-400 md:py-10 md:pl-10 2xl:grid-cols-[minmax(0,1fr)_auto] 2xl:items-start">
            <div className="grid min-w-0 grid-cols-1 gap-16 px-8 md:px-0">
              <div>
                <p className="mb-2 block text-base font-medium text-signoz_vanilla-100">
                  Built for scale
                </p>
                <p className="m-0 block text-sm font-normal leading-9 text-signoz_vanilla-400">
                  Our powerful ingestion engine has a proven track record of handling 10TB+ data
                  ingestion per day.
                </p>
              </div>
              <div>
                <p className="mb-2 block text-base font-medium text-signoz_vanilla-100">
                  Trusted across the globe
                </p>
                <p className="m-0 block text-sm font-normal leading-9 text-signoz_vanilla-400">
                  Used by teams in all 5 continents ⎯ across the mountains, rivers, and the high
                  seas.
                </p>
              </div>
              <div>
                <p className="mb-2 block text-base font-medium text-signoz_vanilla-100">
                  Powering observability for teams of all sizes
                </p>
                <p className="m-0 block text-sm font-normal leading-9 text-signoz_vanilla-400">
                  Hundreds of companies ⎯from early-stage start-ups to public enterprises use SigNoz
                  to build more reliable products.
                </p>
              </div>
            </div>
            <div className="mx-auto aspect-[272/352] w-[272px] max-w-[80vw]">
              <Image
                className="w-full"
                src={featureGraphicEnterprise}
                alt="Illustration of SigNoz connecting observability, security, and data controls"
                width={272}
                height={352}
                loading="lazy"
              />
            </div>
          </div>
          {isInPricingPage ? (
            <>
              <SignozDatalog />
              <DataProtectionLaws isInPricingPage={isInPricingPage} />
              <Observability />
              <CommunityEdition />
            </>
          ) : (
            <>
              <Observability />
              <DataProtectionLaws isInPricingPage={isInPricingPage} />
              <PricingStructure className="py-4 md:py-8" />
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default WhySelectSignoz
