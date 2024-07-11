'use client'

import React, { useState } from 'react'
import { Slider, Tooltip, SliderValue } from "@nextui-org/react";
import { Link } from '@nextui-org/react';
import { ArrowRight } from 'lucide-react';
import Button from '@/components/Button/Button'
import VimeoPlayer from '@/components/VimeoPlayer/VimeoPlayer'
import { Modal, ModalContent, ModalBody, useDisclosure } from "@nextui-org/react";


const formatNumber = (number: Number) => number.toLocaleString(undefined, { maximumFractionDigits: 2, minimumFractionDigits: 0 })

const linearToLog = (value, minLog, maxLog) => {
  const minValue = Math.log(minLog);
  const maxValue = Math.log(maxLog);
  const scale = (maxValue - minValue) / (maxLog - minLog);
  return Math.exp(minValue + scale * (value - minLog));
};

const logToLinear = (value, minLog, maxLog) => {
  const minValue = Math.log(minLog);
  const maxValue = Math.log(maxLog);
  const scale = (maxLog - minLog) / (maxValue - minValue);
  return minLog + scale * (Math.log(value) - minValue);
};

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

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const MIN_VALUE = 2;
  const MAX_VALUE = 2000000;

  const [metricsValue, setMetricsValue] = React.useState<SliderValue>(2);
  const [inputMetricsValue, setinputMetricsValue] = React.useState<string>("0.1");

  const [metricsRetentionPeriod, setMetricsRetentionPeriod] = useState(
    RETENTION_PERIOD.METRICS[0].months
  );

  const handleChangeMetrics = (value: SliderValue) => {
    if (isNaN(Number(value))) return;

    const logValue = linearToLog(value, MIN_VALUE, MAX_VALUE);

    setMetricsValue(value);
    setinputMetricsValue(logValue.toString());
  };

  const [inputValue, setInputValue] = useState('0.1');

  const totalSamplesMonthly = Number(inputValue) * Number(linearToLog(metricsValue, MIN_VALUE, MAX_VALUE)) * 30 * 60 * 24;

  const monthlyEstimate = totalSamplesMonthly * METRICS_PRICES[metricsRetentionPeriod];

  return (
    <div className="bg-signoz_ink-500 relative mt-[-56px]">
      <div className="absolute top-0 right-0 left-0 h-screen bg-[length:55%] bg-no-repeat bg-[center_top_4rem] bg-[url('/img/background_blur/Perlin_noise.png')] " />
      <div className="absolute top-0 right-0 left-0 h-screen bg-[center_top_-50rem] bg-[length:110%] bg-no-repeat bg-[url('/img/background_blur/Circle.png')]" />
      <main className="landing-section pt-12 sm:pt-0 relative z-[1]">

        <div className=''>
          <div className='flex flex-row'>
            <div className='flex-1 px-36 py-32  bg-signoz_ink-500'>

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
                        maxValue={MAX_VALUE}
                        minValue={MIN_VALUE}
                        color="secondary"
                        marks={[
                          {
                            value: MIN_VALUE,
                            label: `${MIN_VALUE}`,
                          },
                          {
                            value: MAX_VALUE,
                            label: `${formatNumber(MAX_VALUE)}`,
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
                                    setMetricsValue(logToLinear(Number(inputMetricsValue), MIN_VALUE, MAX_VALUE));
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
                    <div className='flex-1 self-center text-signoz_vanilla-100 text-sm'>
                      Retention period
                    </div>
                    <div className='flex-1'>
                      <select
                        className="block w-full rounded-sm border border-signoz_slate-400 p-0.5 text-xs text-signoz_vanilla-100 placeholder-gray-400 accent-primary-400 bg-signoz_ink-400 focus:border-primary-500 focus:ring-primary-500 md:p-1 md:text-sm"
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
                      Monthly cost
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


            <div className='flex-1 p-28'>
              <div className='flex flex-col gap-7'>

                <div className='relative flex flex-col gap-3'>
                  <div className='relative'>
                    <img
                      src='/img/metrics-thumbnail.png'
                      className='h-auto w-auto'
                      alt='Metrics Thumnail'
                    />

                    <div className='flex items-center justify-center inset-0 absolute'>
                      <img
                        src="/svgs/icons/play-icon.svg"
                        alt="signoz-video-play-btn"
                        onClick={onOpen}
                        style={{ cursor: "pointer" }}
                        className="h-6 w-6 md:h-20 md:w-20"
                      />
                    </div>
                  </div>
                  <div className='text-signoz_vanilla-400 text-base font-normal text-center'>
                    👆 Watch this video to get more clarity on metrics pricing
                  </div>
                </div>
                <Modal size={'5xl'} backdrop='blur' isOpen={isOpen} onOpenChange={onOpenChange} >
                  <ModalContent className='bg-transparent'>
                    {() => (
                      <>
                        <ModalBody className='py-6'>
                          <VimeoPlayer videoId="973012522" />
                        </ModalBody>
                      </>
                    )}
                  </ModalContent>
                </Modal>
                <div className='flex flex-col gap-3'>
                  <Link href={'/pricing/'} style={{ cursor: 'default' }}>
                    <div className="flex w-full items-center p-4 bg-signoz_ink-400 hover:bg-signoz_ink-300 text-white border border-none rounded group">
                      <div className="mr-4">
                        <img src="/svgs/icons/play-icon.svg" alt="SigNoz Icon" height={24} width={24} />
                      </div>
                      <div className="flex-grow">
                        <div className="text-[10px] sm:text-sm text-signoz_vanilla-400">Learn more about pricing</div>
                      </div>
                      <div className="ml-4 transform transition-transform group-hover:translate-x-1">
                        <ArrowRight size={16} />
                      </div>
                    </div>
                  </Link>
                  <div onClick={onOpen} style={{ cursor: 'default' }}>
                    <div className="flex w-full  items-center p-4 bg-signoz_ink-400 hover:bg-signoz_ink-300 text-white border border-none rounded group">
                      <div className="mr-4">
                        <img src="/svgs/icons/play-icon.svg" alt="SigNoz Icon" height={24} width={24} />
                      </div>
                      <div className="flex-grow">
                        <div className="text-[10px] sm:text-sm text-signoz_vanilla-400">What is included in $199?</div>
                      </div>
                      <div className="ml-4 transform transition-transform group-hover:translate-x-1">
                        <ArrowRight size={16} />
                      </div>
                    </div>
                  </div>
                  <Modal size={'5xl'} backdrop='blur' isOpen={isOpen} onOpenChange={onOpenChange}>
                    <ModalContent className='bg-transparent'>
                      {() => (
                        <>
                          <ModalBody className='py-6'>
                            <VimeoPlayer videoId="968489758" />
                          </ModalBody>
                        </>
                      )}
                    </ModalContent>
                  </Modal>
                </div>
              </div>
            </div>
          </div>
        </div>

      </main>
    </div>
  )
}

export default metricsRetentionPeriod;
