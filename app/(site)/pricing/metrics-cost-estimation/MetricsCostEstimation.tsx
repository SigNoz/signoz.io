'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import metricsThumbnail from '@/public/img/metrics-thumbnail.webp'
import playIconUrl from '@/public/svgs/icons/play-icon.svg?url'
import { ArrowRight } from 'lucide-react'
import { AppModal as Modal } from '@/components/ui/Modal'
import { useDisclosure } from '@/hooks/useDisclosure'
import { PricingRangeSlider } from '@/components/ui/PricingRangeSlider'
import VimeoPlayer from '@/components/VimeoPlayer/VimeoPlayer'

const formatNumber = (number: number) =>
  number.toLocaleString(undefined, { maximumFractionDigits: 2, minimumFractionDigits: 0 })

const MetricsCostEstimation = () => {
  const METRICS_PRICES = {
    1: 0.1,
    3: 0.12,
    6: 0.15,
    13: 0.18,
  }

  const RETENTION_PERIOD = {
    METRICS: [
      { months: 1, price: 0.1 },
      { months: 3, price: 0.12 },
      { months: 6, price: 0.15 },
      { months: 13, price: 0.18 },
    ],
  }

  const { isOpen, onOpen, onOpenChange } = useDisclosure()

  const MIN_VALUE = 1
  const MAX_VALUE = 6

  const [metricsValue, setMetricsValue] = React.useState<number>(1)
  const [inputMetricsValue, setinputMetricsValue] = React.useState<string>('1')
  const [metricsRetentionPeriod, setMetricsRetentionPeriod] = useState(
    RETENTION_PERIOD.METRICS[0].months
  )

  const [selectedVideoID, setSelectedVideoID] = useState<string | null>(null)

  const handleChangeMetrics = (value: number | number[]) => {
    const v = typeof value === 'number' ? value : value[0]
    if (isNaN(Number(v))) return
    setMetricsValue(v)
    setinputMetricsValue(v.toString())
  }

  const [inputValue, setInputValue] = useState('0.1')

  const totalSamplesMonthly = Number(inputValue) * Number(metricsValue) * 30 * 60 * 24

  const monthlyEstimate = totalSamplesMonthly * METRICS_PRICES[metricsRetentionPeriod]

  const MAX_INPUT_VALUE = 10000

  const handleOpenVideo = (videoId: string | number): void => {
    setSelectedVideoID(String(videoId))
    onOpen()
  }

  return (
    <div className="bg-background relative mt-[-56px]">
      <div className="bg-dot-pattern masked-dots absolute top-0 flex h-screen w-full items-center justify-center" />
      <div className="absolute top-0 right-0 left-0 mx-auto h-[450px] w-full flex-shrink-0 rounded-[956px] bg-gradient-to-b from-[rgba(190,107,241,1)] to-[rgba(69,104,220,0)] bg-[length:110%] bg-no-repeat opacity-30 blur-[300px] sm:bg-[center_-500px] md:h-[956px]" />
      <main className="landing-section relative z-[1] pt-12 sm:pt-0">
        <div className="">
          <div className="flex flex-col md:flex-row">
            <div className="bg-background flex-1 px-6 py-6 md:px-36 md:py-32">
              <div className="flex flex-col gap-7">
                <div>
                  <div className="text-l1-foreground mb-2 text-2xl font-semibold">
                    Metrics price calculator
                  </div>
                  <div className="text-muted-foreground text-base font-normal">
                    We use a transparent and usage-based pricing model that helps you prevent costs
                    from ballooning.
                  </div>
                </div>
                <div></div>
                <div>
                  <div className="flex flex-col gap-2">
                    <div className="text-l1-foreground text-sm"># of time series in million</div>
                    <div>
                      <input
                        className="border-border bg-l3-background text-l1-foreground block w-full rounded-sm border px-1.5 py-3 text-sm font-normal"
                        type="number"
                        value={inputValue}
                        onChange={(e) => {
                          let value = parseFloat(e.target.value)
                          if (value > MAX_INPUT_VALUE) {
                            value = MAX_INPUT_VALUE
                          }
                          setInputValue(value.toString())
                        }}
                        onKeyDown={(e) => {
                          if (e.key === '-' || e.key === 'e') {
                            e.preventDefault()
                          }
                        }}
                      />
                      {/* Hide the spinner */}
                      <style>
                        {`
                    input[type=number]::-webkit-outer-spin-button,
                    input[type=number]::-webkit-inner-spin-button {
                       -webkit-appearance: none;
                      margin: 0;
                    }
                    input[type=number] {
                     -moz-appearance: textfield;
                   }
                `}
                      </style>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="flex flex-col gap-7">
                    <div className="text-l1-foreground flex justify-between text-sm">
                      <div className=""> # of datapoints per minute in a time-series</div>
                      <div className=""> {inputMetricsValue} </div>
                    </div>
                    <div>
                      <PricingRangeSlider
                        value={metricsValue}
                        onChange={handleChangeMetrics}
                        min={MIN_VALUE}
                        max={MAX_VALUE}
                        step={1}
                        color="secondary"
                        minLabel="1"
                        maxLabel="6"
                        markLabels={['1', '2', '3', '4', '5', '6']}
                        tooltipText={formatNumber(metricsValue)}
                        thumbColorToken="robin-500"
                        aria-label="Datapoints per minute in a time-series"
                      />
                    </div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between gap-7">
                    <div className="text-l1-foreground flex-1 self-center text-sm">
                      Retention period
                    </div>
                    <div className="flex-1">
                      <select
                        className="border-border bg-card text-l1-foreground accent-robin-400 focus:border-primary focus:ring-ring block w-full rounded-sm border p-0.5 text-xs placeholder-gray-400 md:p-1 md:text-sm"
                        value={metricsRetentionPeriod}
                        onChange={(e) => setMetricsRetentionPeriod(Number(e.target.value))}
                      >
                        {RETENTION_PERIOD.METRICS.map((option, idx) => (
                          <option
                            key={`${option.months}-${idx}`}
                            value={option.months}
                          >{`${option.months} ${option.months === 1 ? 'month' : 'months'}`}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="bg-card flex items-center justify-between rounded-t rounded-b-none border border-transparent px-3 py-4 pt-4">
                    <span className="text-l1-foreground text-sm font-medium">
                      # of samples in a month
                    </span>
                    <div className="border-border w-3/5 border-b border-dashed" />
                    <div>{formatNumber(totalSamplesMonthly)}</div>
                  </div>
                  <div className="bg-card flex items-center justify-between border border-transparent px-3 py-4 pt-4">
                    <span className="text-l1-foreground text-sm font-medium">
                      Price (per million samples)
                    </span>
                    <div className="border-border w-3/5 border-b border-dashed" />
                    <div className="justify-left metrics-background flex items-center gap-1">
                      <span className="text-base font-medium">
                        ${METRICS_PRICES[metricsRetentionPeriod]}
                      </span>
                    </div>
                  </div>
                  <div className="bg-l3-background flex items-center justify-between rounded-b border border-transparent px-3 py-4 pt-4">
                    <span className="text-l1-foreground text-sm font-medium">Monthly cost</span>
                    <div className="border-border w-3/5 border-b border-dashed" />
                    <div>${formatNumber(monthlyEstimate)}</div>
                  </div>
                </div>
                <div className="flex flex-col gap-4">
                  <Link
                    href="/teams/"
                    className="bg-primary text-primary-foreground hover:text-primary-foreground flex h-10 w-full items-center justify-center gap-1.5 rounded-full px-4 text-sm leading-5 font-medium no-underline outline-none"
                  >
                    Start your free 30-day trial
                    <ArrowRight size={14} />
                  </Link>
                  <Link
                    href="/docs/introduction/"
                    className="button-background text-foreground hover:text-foreground flex h-10 w-full items-center justify-center gap-1.5 rounded-full px-4 text-sm leading-5 font-medium no-underline outline-none"
                  >
                    Read the docs
                    <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            </div>

            <div className="flex-1 p-4 max-sm:mt-10 md:p-28">
              <div className="flex flex-col gap-7">
                <div className="relative flex flex-col gap-3">
                  <div className="relative">
                    <Image
                      src={metricsThumbnail}
                      className="h-auto w-full max-w-full"
                      alt="Metrics pricing video thumbnail"
                      sizes="(max-width: 768px) 100vw, 600px"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <button
                        type="button"
                        className="cursor-pointer border-0 bg-transparent p-0"
                        onClick={() => handleOpenVideo(973012522)}
                        aria-label="Play metrics pricing video"
                      >
                        <Image
                          src={playIconUrl}
                          alt=""
                          width={80}
                          height={80}
                          className="h-6 w-6 md:h-20 md:w-20"
                        />
                      </button>
                    </div>
                  </div>
                  <div className="text-muted-foreground text-center text-base font-normal">
                    👆 Watch this video to get more clarity on metrics pricing
                  </div>
                </div>
                <div className="flex flex-col gap-3">
                  <Link href="/pricing/" className="cursor-default no-underline">
                    <div className="group bg-card hover:bg-l3-background flex w-full cursor-pointer items-center rounded border border-none p-4 text-white">
                      <div className="mr-4 shrink-0">
                        <Image src={playIconUrl} alt="" width={24} height={24} />
                      </div>
                      <div className="flex-grow">
                        <div className="text-muted-foreground cursor-pointer text-[10px] sm:text-sm">
                          Learn more about pricing
                        </div>
                      </div>
                      <div className="ml-4 transform transition-transform group-hover:translate-x-1">
                        <ArrowRight size={16} />
                      </div>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Modal
        size="5xl"
        backdrop="blur"
        isOpen={isOpen}
        onOpenChange={(open) => {
          onOpenChange(open)
          if (!open) setSelectedVideoID(null)
        }}
        panelClassName="bg-transparent p-0"
      >
        <div className="px-6 py-6">
          {selectedVideoID ? <VimeoPlayer videoId={selectedVideoID} /> : null}
        </div>
      </Modal>
    </div>
  )
}

export default MetricsCostEstimation
