import React, { useState } from 'react';
import Link from 'next/link';
import { Slider } from "@nextui-org/react";
import { ArrowUpRight } from 'lucide-react';
import Button from '@/components/Button/Button'


const MonthlyEstimate = () => {

  const TRACES_AND_LOGS_PRICES = {
    15: 0.3,
    30: 0.4,
    90: 0.6,
    180: 0.8,
  }
  const METRICS_PRICES = {
    1: 0.1,
    3: 0.12,
    6: 0.15,
    13: 0.18,
  }
  const RETENTION_PERIOD = {
    TRACES_AND_LOGS: [
      { days: 15, price: 0.3 },
      { days: 30, price: 0.4 },
      { days: 90, price: 0.6 },
      { days: 180, price: 0.8 },
    ],
    METRICS: [
      { months: 1, price: 0.1 },
      { months: 3, price: 0.12 },
      { months: 6, price: 0.15 },
      { months: 13, price: 0.18 },
    ],
  }

  const [tracesRetentionPeriod, setTracesRetentionPeriod] = useState(
    RETENTION_PERIOD.TRACES_AND_LOGS[0].days
  )
  const [logsRetentionPeriod, setLogsRetentionPeriod] = useState(
    RETENTION_PERIOD.TRACES_AND_LOGS[0].days
  )
  const [metricsRetentionPeriod, setMetricsRetentionPeriod] = useState(
    RETENTION_PERIOD.METRICS[0].months
  )

  return (

    <div className="container my-10 mb-16 !w-[80vw] border border-signoz_slate-400 border-dashed">
      <div className='flex flex-col gap-2 mt-5'>
        <span className='text-signoz_vanilla-100 text-2xl font-semibold p-0'>Estimate your monthly bill</span>
        <span className='mb-16 text-signoz_vanilla-400 font-normal text-base'>You can also set data ingestion limits so you never get a surprise bill.<span className='text-signoz_robin-400 font-medium'> Learn more<ArrowUpRight className="inline" size={16} /></span></span>
      </div>
      <div className="grid grid-cols-6 grid-rows-4 gap-y-4">
        <div className="p-2"> </div>
        <div className="py-2 pr-2 uppercase text-[13px] font-semibold text-signoz_vanilla-400">Pricing per unit</div>
        <div className="py-2 pr-2 uppercase text-[13px] font-semibold text-signoz_vanilla-400">Retention</div>
        <div className="py-2 pr-2 uppercase text-[13px] font-semibold text-signoz_vanilla-400">Scale of ingestion</div>
        <div className="py-2 pr-2 uppercase text-[13px] font-semibold text-signoz_vanilla-400">Estimated usage</div>
        <div className="py-2 pr-2 uppercase text-[13px] font-semibold text-signoz_vanilla-400">subtotal</div>

        <div className="flex p-2 gap-2 metrics-background">
          <img src="/img/index_features/drafting-compass.svg" alt="Logs Icon" className="w-6 h-6" />Traces
        </div>
        <div className="flex items-center justify-left gap-1 metrics-background">
          <span className="text-base font-medium text-signoz_robin-400">
            ${TRACES_AND_LOGS_PRICES[logsRetentionPeriod]}
          </span>{' '}
          /GB
        </div>
        <span className=' border border-none rounded metrics-background'>
          <select
            className="block w-[100px] h-[32px] rounded-sm border border-signoz_slate-400 p-0.5 text-xs text-signoz_vanilla-100 placeholder-gray-400 accent-primary-400 bg-signoz_ink-400 focus:border-primary-500 focus:ring-primary-500 md:p-1 md:text-sm"
            value={logsRetentionPeriod}
            onChange={(e) => setLogsRetentionPeriod(Number(e.target.value))}
          >
            {RETENTION_PERIOD.TRACES_AND_LOGS.map((option, idx) => (
              <option
                key={`${option.days}-${idx}`}
                value={option.days}
              >{`${option.days} days`}</option>
            ))}
          </select>
        </span>
        <Slider
          size="sm"
          step={0.2}
          color="secondary"
          showSteps={true}
          maxValue={1}
          minValue={0}
          defaultValue={0.2}
          className="max-w-md metrics-background"
        />
        <div className="p-2 metrics-background">600GB</div>
        <div className="p-2 metrics-background">0.3</div>


        <div className="flex p-2 gap-2 metrics-background">
          <img src="/img/index_features/logs.svg" alt="Logs Icon" className="w-6 h-6" />Logs</div>
        <span className="flex items-center justify-left gap-1 metrics-background">
          <span className="text-base font-medium text-signoz_sakura-400">
            ${TRACES_AND_LOGS_PRICES[tracesRetentionPeriod]}
          </span>{' '}
          /GB
        </span>
        <span className='metrics-background'>
          <select
            className="block w-[100px] h-[32px] rounded-sm border border-signoz_slate-400 p-0.5 text-xs text-signoz_vanilla-100 placeholder-gray-400 accent-primary-400 bg-signoz_ink-400 focus:border-primary-500 focus:ring-primary-500 md:p-1 md:text-sm"
            value={tracesRetentionPeriod}
            onChange={(e) => setTracesRetentionPeriod(Number(e.target.value))}
          >
            {RETENTION_PERIOD.TRACES_AND_LOGS.map((option, idx) => (
              <option
                key={`${option.days}-${idx}`}
                value={option.days}
              >{`${option.days} days`}</option>
            ))}
          </select>

        </span>
        <Slider
          size="sm"
          step={0.2}
          color="danger"
          showSteps={true}
          maxValue={1}
          minValue={0}
          defaultValue={0.2}
          className="max-w-md metrics-background"
        />
        <div className="flex align-right p-2 metrics-background">600Gb</div>
        <div className="flex align-right p-2 metrics-background">0.3</div>







        <div className="flex p-2 gap-2 metrics-background">
          <img src="/img/index_features/bar-chart-2.svg" alt="Logs Icon" className="w-6 h-6" />Metrics</div>
        <span className="flex items-center justify-left gap-1 metrics-background">
          <span className="text-base font-medium text-signoz_amber-400">
            ${METRICS_PRICES[metricsRetentionPeriod]}
          </span>{' '}
          / mn samples
        </span>
        <span className='metrics-background'>

          <select
            className="block w-[100px] h-[32px] rounded-sm border border-signoz_slate-400 p-0.5 text-xs text-signoz_vanilla-100 placeholder-gray-400 accent-primary-400 bg-signoz_ink-400 focus:border-primary-500 focus:ring-primary-500 md:p-1 md:text-sm"
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
        </span>
        <Slider
          size="sm"
          step={0.2}
          color="warning"
          showSteps={true}
          maxValue={1}
          minValue={0}
          defaultValue={0.2}
          className="max-w-md metrics-background"
        />
        <div className="p-2 metrics-background">600</div>
        <div className="p-2 metrics-background">0.3</div>
      </div>


      <div className="flex justify-between items-center mt-6 pt-4 button-background px-3 py-4 border border-transparent rounded-md">
        <span className='text-signoz_vanilla-100 text-base font-medium'>Monthly estimate for usage-based plan</span>
        <div className='w-3/5 border-b border-signoz_slate-400 border-dashed' />
        <div>$199</div>
      </div>
      <div className="flex justify-between items-center mt-3 mb-6 bg-[#4E74F81A] px-3 py-4 border border-transparent rounded-md">
        <span className='text-signoz_vanilla-100 text-base font-medium'>Reach out to us for custom pricing and retention for high volume</span>
        <div className='w-2/5 border-b border-signoz_slate-400 border-dashed' />
        <Link href={'/enterprise/'}>
          <Button className='w-full'>
            Contact us
          </Button>
        </Link>
      </div>
    </div>

  )
};

export default MonthlyEstimate;
