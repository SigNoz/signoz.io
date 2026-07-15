import React from 'react'
import Heading from '../../components/ui/Heading'
import SubHeading from '../../components/ui/SubHeading'
import { H1, H4 } from '../Headings/Headings'
import { cn } from '../../app/lib/utils'

const PricingStructure = ({ className }: { className?: string }) => {
  return (
    <section
      className={cn('border-border border !border-r-0 !border-b-0 border-dashed', className)}
    >
      <div className="section-container mx-auto px-8 py-10 md:px-10">
        <div className="flex flex-col justify-between">
          <div className="mb-5">
            <div className="flex flex-col justify-start">
              <p className="text-l1-foreground mb-4 block text-2xl font-semibold md:mb-2">
                Pricing you can trust
              </p>
              <p className="text-muted-foreground text-sm leading-9 font-normal md:text-base">
                Tired of Datadog’s unpredictable bills or New Relic’s user-based pricing?&nbsp;
                <br className="hidden lg:inline" />
                We’re here for you.
              </p>
            </div>
          </div>
          <div>
            <div className="flex flex-col justify-center gap-y-4">
              <div className="border-border bg-card w-full rounded border p-4">
                <p className="text-l1-foreground mb-2 text-base font-medium">
                  No user-based pricing
                </p>
                <p className="text-muted-foreground m-0 text-sm leading-9 font-normal">
                  Add as many team members as you want.
                </p>
              </div>
              <div className="border-border bg-card w-full rounded border p-4">
                <p className="text-l1-foreground mb-2 text-base font-medium">
                  No host (container or nodes) based pricing
                </p>
                <p className="text-muted-foreground m-0 text-sm leading-9 font-normal">
                  No need to worry about auto-scaling during peak hours.
                </p>
              </div>
              <div className="border-border bg-card w-full rounded border p-4">
                <p className="text-l1-foreground mb-2 text-base font-medium">
                  Simple usage-based pricing
                </p>
                <p className="text-muted-foreground m-0 text-sm leading-9 font-normal">
                  Only pay for the data you send.
                </p>
              </div>
              <div className="border-border bg-card w-full rounded border p-4">
                <p className="text-l1-foreground mb-2 text-base font-medium">
                  No special pricing for custom metrics
                </p>
                <p className="text-muted-foreground m-0 text-sm leading-9 font-normal">
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
