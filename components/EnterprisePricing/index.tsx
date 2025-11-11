'use client'

import { Card, CardHeader, CardBody, Button } from '@nextui-org/react'
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
      <div className="section-container !mx-auto !w-[100vw] border !border-b-0 border-dashed border-signoz_slate-400 !px-0 md:!w-[80vw]">
        <div className="flex flex-col sm:flex-row">
          <div className="!w-[100%]  flex-1 md:!w-[300px]">
            <p className="sticky top-[100px] px-8 pl-0 pt-10 text-4xl font-bold !leading-[3.5rem] text-signoz_vanilla-100 sm:text-[44px] md:px-0 md:pl-12">
              Pricing <br /> suited for <br /> Enterprise-scale{' '}
            </p>
          </div>
          <div className="flex-[2_2_0%]">
            <div className="ml-0 flex flex-col justify-between gap-8 border !border-b-0 !border-r-0 !border-t-0 border-dashed border-signoz_slate-400 py-10 sm:flex-row  md:pl-10">
              <div className="flex shrink-[10] flex-col gap-8 px-8">
                <div>
                  <p className="mb-2 block text-lg font-bold text-signoz_vanilla-100">
                    Control costs with Ingest Guard
                  </p>
                  <p className="m-0 block text-sm font-normal leading-9 text-signoz_vanilla-400">
                    Set data ingestion limits based on telemetery type, engineering teams, and
                    environment. <br /> Prevent Data Spikes with Second-Level Limits.
                  </p>

                  <Button className="mt-4 gap-2 rounded-full bg-signoz_ink-300" size="sm">
                    <Link href="/blog/introducing-ingest-guard-feature" className="flex-center">
                      Learn more <ArrowRight size={16} />
                    </Link>
                  </Button>
                </div>

                <div>
                  <p className="mb-2 block text-base font-medium text-signoz_vanilla-100">
                    Simple usage-based pricing with vol. based discounts
                  </p>
                  <p className="m-0 block text-sm font-normal leading-9 text-signoz_vanilla-400">
                    Only pay for the data you send. Estimate your monthly billing.
                  </p>
                </div>
              </div>
            </div>

            <div className="ml-0 flex flex-col justify-between gap-8 border !border-b-0 !border-r-0 border-dashed border-signoz_slate-400 py-10 sm:flex-row  md:pl-10">
              <div className="flex w-full flex-col gap-8 px-8">
                <div>
                  <p className="mb-2 block text-lg font-bold text-signoz_vanilla-100">
                    Pricing you can trust
                  </p>
                  <p className="m-0 block text-sm font-normal leading-9 text-signoz_vanilla-400">
                    Tired of unpredictable bills or user-based pricing? We’re here for you.
                  </p>
                </div>

                <div className="flex flex-col gap-4">
                  <Card className="rounded-md border-signoz_slate-500 bg-signoz_ink-400">
                    <CardHeader className="text-base text-signoz_vanilla-100">
                      No user-based pricing
                    </CardHeader>
                    <CardBody className="-mt-4 text-sm font-light leading-9 text-signoz_vanilla-400">
                      Add as many team members as you want.
                    </CardBody>
                  </Card>

                  <Card className="rounded-md border-signoz_slate-500 bg-signoz_ink-400">
                    <CardHeader className="text-base text-signoz_vanilla-100">
                      No host (container or node) based pricing
                    </CardHeader>
                    <CardBody className="-mt-4 text-sm font-light leading-9 text-signoz_vanilla-400">
                      No need to worry about auto-scaling during peak hours. Suitable for
                      architectures that requires lots of nodes/machines but less data from each
                      machine. For example, IoT & robotics applications.
                    </CardBody>
                  </Card>

                  <Card className="rounded-md border-signoz_slate-500 bg-signoz_ink-400">
                    <CardHeader className="text-base text-signoz_vanilla-100">
                      No special pricing for custom metrics
                    </CardHeader>
                    <CardBody className="-mt-4 text-sm font-light leading-9 text-signoz_vanilla-400">
                      All metrics charged simply at $0.1 per million samples. Estimate your metrics
                      cost with the{' '}
                      <a
                        href="/pricing/metrics-cost-estimation/"
                        target="_blank"
                        className="font-bold text-signoz_robin-500"
                      >
                        Metrics Price Calculator.
                      </a>
                    </CardBody>
                  </Card>
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
