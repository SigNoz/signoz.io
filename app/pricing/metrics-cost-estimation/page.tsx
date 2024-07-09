'use client'

import React, { useState } from 'react'
import { Slider, Tooltip, SliderValue, } from "@nextui-org/react";
import { Link } from '@nextui-org/react';
import { ArrowRight } from 'lucide-react';
import Button from '@/components/Button/Button'


const formatNumber = (number: Number) => number.toLocaleString(undefined, { maximumFractionDigits: 2, minimumFractionDigits: 0 })

const metricsRetentionPeriod = () => {

  const METRICS_PRICES = {
    1: 0.1,
    3: 0.12,
    6: 0.15,
    13: 0.18,
  };

  const RETENTION_PERIOD = {
    METRICS: [
      { months: 1, price: 0.1 },
      { months: 3, price: 0.12 },
      { months: 6, price: 0.15 },
      { months: 13, price: 0.18 }
    ]
  }

  const [metricsValue, setMetricsValue] = React.useState<SliderValue>(2);
  const [inputMetricsValue, setinputMetricsValue] = React.useState<string>("0.1");


  const [metricsRetentionPeriod, setMetricsRetentionPeriod] = useState(
    RETENTION_PERIOD.METRICS[0].months
  )

  const handleChangeMetrics = (value: SliderValue) => {
    if (isNaN(Number(value))) return;

    setMetricsValue(value);
    setinputMetricsValue(value.toString());
  };

  const [inputValue, setInputValue] = useState('0.1');

  const totalSamplesMonthly = Number(inputValue) * Number(metricsValue) * 30 * 60 * 24;

  const monthlyEstimate = totalSamplesMonthly * METRICS_PRICES[metricsRetentionPeriod]


  return (
    <div className='bg-signoz_ink-500'>
      <div className='flex flex-row'>
        <div className='flex-auto p-40'>

          <div className='flex flex-col gap-7'>
            <div>
              <div className='text-signoz_vanilla-100 text-2xl font-semibold'>
                Metrics price calculator
              </div>
              <div className='text-signoz_vanilla-400 text-base font-normal'>
                We use a transparent and usage-based pricing model that helps you <br /> prevent costs from ballooning.
              </div>
            </div>

            <div>


            </div>

            <div>
              <div className='flex flex-col gap-2'>
                <div className='text-signoz_vanilla-100 text-sm'>
                  # of time series in million
                </div>
                <div>
                  <input className='block w-full rounded-sm border border-signoz_slate-400 bg-signoz_ink-300 py-3 px-1.5 text-sm text-signoz_vanilla-100 font-normal '
                    type='number'
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === '-' || e.key === 'e') {
                        e.preventDefault();
                      }
                    }}
                  />
                  {/* Hide the spinner */}
                  <style>{`
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
              <div className='flex flex-col gap-7'>
                <div className='text-signoz_vanilla-100 text-sm'>
                  # of datapoints per minute
                </div>
                <div>
                  <Slider
                    size="sm"
                    step={0.01}
                    maxValue={200 * 10000}
                    minValue={0}
                    color="secondary"
                    marks={[
                      {
                        value: 2,
                        label: "2",
                      },
                      {
                        value: 2000000,
                        label: "2,000,000",
                      },
                    ]}
                    classNames={{
                      base: "max-w-md",
                      label: "text-medium",
                    }}
                    renderThumb={(props) => (
                      <div
                        {...props}
                        className="group top-1/2 bg-background border-small border-signoz_vanilla-100 shadow-medium rounded-full cursor-grab data-[dragging=true]:cursor-grabbing"
                      >
                        <span className="transition-transform bg-signoz_robin-500 rounded-full w-5 h-5 block group-data-[dragging=true]:scale-80" />
                      </div>
                    )}
                    renderValue={({ children, ...props }) => (
                      <output {...props}>
                        <Tooltip
                          className="text-tiny text-default-500 rounded-md"
                        >
                          <input
                            className="px-1 py-0.5 w-12 text-right text-small text-default-700 font-medium bg-default-100 outline-none transition-colors rounded-small border-medium border-transparent hover:border-primary focus:border-primary"
                            type="text"
                            value={inputMetricsValue}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                              const v = e.target.value;
                              setinputMetricsValue(v);
                            }}
                            onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
                              if (e.key === "Enter" && !isNaN(Number(inputMetricsValue))) {
                                setMetricsValue(Number(inputMetricsValue));
                              }
                            }}
                          />
                        </Tooltip>
                      </output>
                    )}
                    value={metricsValue}
                    onChange={handleChangeMetrics}
                  />
                </div>
              </div>
            </div>


            <div>
              <div className='flex gap-7 justify-between'>
                <div className='text-signoz_vanilla-100 text-sm'>
                  Retention period
                </div>
                <div>
                  <select
                    className="block w-[100px] rounded-sm border border-signoz_slate-400 p-0.5 text-xs text-signoz_vanilla-100 placeholder-gray-400 accent-primary-400 bg-signoz_ink-400 focus:border-primary-500 focus:ring-primary-500 md:p-1 md:text-sm"
                    value={metricsRetentionPeriod}
                    onChange={(e) => setMetricsRetentionPeriod(Number(e.target.value))}
                  >
                    {RETENTION_PERIOD.METRICS.map((option, idx) => (
                      <option
                        key={`${option.months}-${idx}`}
                        value={option.months}
                      >{`${option.months} ${option.months === 1 ? 'month' : 'months'
                        }`}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center pt-4 bg-signoz_ink-400 px-3 py-4 border border-transparent rounded-t rounded-b-none">
                <span className="text-signoz_vanilla-100 text-sm font-medium">
                  # of samples in a month
                </span>
                <div className="w-3/5 border-b border-signoz_slate-400 border-dashed" />
                <div>
                  {formatNumber(totalSamplesMonthly)}
                </div>
              </div>
              <div className="flex justify-between items-center pt-4 bg-signoz_ink-400 px-3 py-4 border border-transparent">
                <span className="text-signoz_vanilla-100 text-sm font-medium">
                  Price (per million samples)
                </span>
                <div className="w-3/5 border-b border-signoz_slate-400 border-dashed" />
                <div className="flex items-center justify-left gap-1 metrics-background">
                  <span className="text-base font-medium">
                    ${METRICS_PRICES[metricsRetentionPeriod]}
                  </span>
                </div>
              </div>
              <div className="flex justify-between items-center pt-4 bg-signoz_ink-300 px-3 py-4 border border-transparent rounded-b">
                <span className="text-signoz_vanilla-100 text-sm font-medium">
                  Monthly estimate
                </span>
                <div className="w-3/5 border-b border-signoz_slate-400 border-dashed" />
                <div>${formatNumber(monthlyEstimate)}</div>
              </div>
            </div>

            <div className='flex flex-col gap-4'>
              <Link href={'/enterprise/'}>
                <Button className='w-full'>
                  Start your free 14-day trial<ArrowRight size={14} />
                </Button>
              </Link>

              <Link href={'/docs/introduction/'}>
                <Button className='w-full' type={Button.TYPES.SECONDARY}>
                  Read the docs<ArrowRight size={14} />
                </Button>
              </Link>
            </div>

          </div>


        </div>

        <div className='flex-auto'>

          <span> Modal</span>
        </div>

      </div>
    </div>
  )
}

export default metricsRetentionPeriod;



