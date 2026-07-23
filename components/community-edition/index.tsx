import React from 'react'
import { ArrowRight } from 'lucide-react'
import TrackingLink from '@/components/TrackingLink'
import SignozIcon from '@/public/svgs/icons/signoz.svg'

export const CommunityEdition = () => {
  return (
    <section>
      <div className="section-container !md:px-10 border-border flex h-auto border !border-r-0 !border-b-0 border-dashed !px-10 !py-10">
        <div className="flex w-full flex-col">
          <div>
            <p className="text-l1-foreground text-2xl font-semibold">
              {' '}
              Get started with Community Edition
            </p>
            <p className="text-muted-foreground text-base leading-9 font-normal">
              You always have the open source version of SigNoz to get started with your
              observability journey.
            </p>
          </div>
          <div className="h-[72px] md:h-[250px]">
            <TrackingLink
              href="https://github.com/SigNoz/signoz"
              clickType="External Click"
              clickName="GitHub Repository Link"
              clickText="SigNoz / signoz"
              clickLocation="Community Edition Section"
            >
              <div className="group bg-card text-foreground hover:bg-l3-background flex items-center rounded border border-none p-4">
                <div className="mr-4">
                  <SignozIcon className="h-10 w-10" role="img" aria-label="SigNoz Icon" />
                </div>
                <div className="flex-grow">
                  <div className="text-muted-foreground text-sm font-medium sm:text-base">
                    SigNoz / <span className="text-foreground">signoz</span>
                  </div>
                  <div className="text-muted-foreground text-[10px] sm:text-sm">
                    The open-source observability platform
                  </div>
                </div>
                <div className="ml-4 transform transition-transform group-hover:translate-x-1">
                  <ArrowRight size={16} />
                </div>
              </div>
            </TrackingLink>
          </div>
          <div className="mt-[18px] flex flex-row gap-3"></div>
        </div>
      </div>
    </section>
  )
}
