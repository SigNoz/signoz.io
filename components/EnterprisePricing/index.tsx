'use client'

import { ArrowRight } from 'lucide-react'
import MonthlyEstimate from '@/components/Monthly-estimate/MonthlyEstimate'
import MonthlyEstimateMobile from '@/components/Monthly-estimate/MonthlyEstimateMobile'
import Link from 'next/link'
import { useEffect } from 'react'
import { useState } from 'react'

const EnterprisePricing = () => {
  const [width, setWidth] = useState<number>(typeof window !== 'undefined' ? window.innerWidth : 0)

  function handleWindowSizeChange() {
    setWidth(window.innerWidth)
  }

  useEffect(() => {
    window.addEventListener('resize', handleWindowSizeChange)
    return () => {
      window.removeEventListener('resize', handleWindowSizeChange)
    }
  }, [])

  const isMobile = width <= 768

  return (
    <>
      <div className="section-container max-w-8xl border-border !mx-auto w-full border !border-b-0 border-dashed !px-0">
        <div className="flex flex-col sm:flex-row">
          <div className="!w-[100%] flex-1 md:!w-[300px]">
            <p className="text-l1-foreground sticky top-[100px] px-8 pt-10 pl-0 text-4xl !leading-[3.5rem] font-bold sm:text-4xl md:px-0 md:pl-12">
              Pricing <br /> suited for <br /> Enterprise-scale{' '}
            </p>
          </div>
          <div className="flex-[2_2_0%]">
            <div className="border-border ml-0 flex flex-col justify-between gap-8 border !border-t-0 !border-r-0 !border-b-0 border-dashed py-10 sm:flex-row md:pl-10">
              <div className="flex shrink-[10] flex-col gap-8 px-8">
                <div>
                  <p className="text-l1-foreground mb-2 block text-lg font-bold">
                    Control costs with Ingest Guard
                  </p>
                  <p className="text-muted-foreground m-0 block text-sm leading-9 font-normal">
                    Set data ingestion limits based on telemetery type, engineering teams, and
                    environment. <br /> Prevent Data Spikes with Second-Level Limits.
                  </p>

                  <Link
                    href="/blog/introducing-ingest-guard-feature/"
                    className="bg-l3-background text-foreground hover:bg-l3-background mt-4 inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium no-underline"
                    prefetch={false}
                  >
                    Learn more <ArrowRight size={16} />
                  </Link>
                </div>

                <div>
                  <p className="text-l1-foreground mb-2 block text-base font-medium">
                    Simple usage-based pricing with vol. based discounts
                  </p>
                  <p className="text-muted-foreground m-0 block text-sm leading-9 font-normal">
                    Only pay for the data you send. Estimate your monthly billing.
                  </p>
                </div>
              </div>
            </div>

            <div className="border-border ml-0 flex flex-col justify-between gap-8 border !border-r-0 !border-b-0 border-dashed py-10 sm:flex-row md:pl-10">
              <div className="flex w-full flex-col gap-8 px-8">
                <div>
                  <p className="text-l1-foreground mb-2 block text-lg font-bold">
                    Pricing you can trust
                  </p>
                  <p className="text-muted-foreground m-0 block text-sm leading-9 font-normal">
                    Tired of unpredictable bills or user-based pricing? We’re here for you.
                  </p>
                </div>

                <div className="flex flex-col gap-4">
                  <div className="border-border bg-card rounded-md border p-4">
                    <div className="text-l1-foreground text-base">No user-based pricing</div>
                    <div className="text-muted-foreground -mt-1 text-sm leading-9 font-light">
                      Add as many team members as you want.
                    </div>
                  </div>

                  <div className="border-border bg-card rounded-md border p-4">
                    <div className="text-l1-foreground text-base">
                      No host (container or node) based pricing
                    </div>
                    <div className="text-muted-foreground -mt-1 text-sm leading-9 font-light">
                      No need to worry about auto-scaling during peak hours. Suitable for
                      architectures that requires lots of nodes/machines but less data from each
                      machine. For example, IoT & robotics applications.
                    </div>
                  </div>

                  <div className="border-border bg-card rounded-md border p-4">
                    <div className="text-l1-foreground text-base">
                      No special pricing for custom metrics
                    </div>
                    <div className="text-muted-foreground -mt-1 text-sm leading-9 font-light">
                      All metrics charged simply at $0.1 per million samples. Estimate your metrics
                      cost with the{' '}
                      <a
                        href="/pricing/metrics-cost-estimation/"
                        target="_blank"
                        className="text-primary font-bold"
                      >
                        Metrics Price Calculator.
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full">{isMobile ? <MonthlyEstimateMobile /> : <MonthlyEstimate />}</div>
    </>
  )
}

export default EnterprisePricing
