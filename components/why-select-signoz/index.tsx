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
        'section-container border-border mx-auto w-full border !border-b-0 border-dashed !px-0',
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
          <p className="text-l1-foreground sticky top-[3rem] px-8 pt-4 text-4xl !leading-[3.5rem] font-bold sm:px-4 sm:text-4xl lg:px-8 lg:pt-10">
            Why <br className="hidden md:block" /> select <br className="hidden md:block" />{' '}
            SigNoz?{' '}
          </p>
        </div>
        <div className="min-w-0">
          <div className="border-border ml-0 flex flex-col gap-8 border !border-t-0 !border-r-0 !border-b-0 border-dashed md:flex-row md:items-center md:py-10 md:pl-10">
            <div className="flex min-w-0 flex-1 flex-col gap-16 px-8 md:px-0">
              <div>
                <p className="text-l1-foreground mb-2 block text-base font-medium">
                  Built for scale
                </p>
                <p className="text-muted-foreground m-0 block text-sm leading-9 font-normal">
                  Our powerful ingestion engine has a proven track record of handling 10TB+ data
                  ingestion per day.
                </p>
              </div>
              <div>
                <p className="text-l1-foreground mb-2 block text-base font-medium">
                  Trusted across the globe
                </p>
                <p className="text-muted-foreground m-0 block text-sm leading-9 font-normal">
                  Used by teams in all 5 continents ⎯ across the mountains, rivers, and the high
                  seas.
                </p>
              </div>
              <div>
                <p className="text-l1-foreground mb-2 block text-base font-medium">
                  Powering observability for teams of all sizes
                </p>
                <p className="text-muted-foreground m-0 block text-sm leading-9 font-normal">
                  Hundreds of companies ⎯from early-stage start-ups to public enterprises use SigNoz
                  to build more reliable products.
                </p>
              </div>
            </div>
            <div className="mx-auto aspect-[272/352] w-[272px] max-w-full md:shrink-0">
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
