'use client'

import React, { useState } from 'react'
import { ArrowDownRight, ArrowRight, CheckCircle, Hash } from 'lucide-react'
import Button from '@/components/Button/Button'
import TrackingLink from '@/components/TrackingLink'

interface SigNozCloudPricingOverviewProps {
  className?: string
}

interface TracesAndLogsRetention {
  days: number
  price: number
}

interface MetricsRetention {
  months: number
  price: number
}

const SigNozCloudPricingOverview: React.FC<SigNozCloudPricingOverviewProps> = ({
  className = '',
}) => {
  const RETENTION_PERIOD = {
    TRACES_AND_LOGS: [
      { days: 15, price: 0.3 },
      { days: 30, price: 0.4 },
      { days: 90, price: 0.6 },
      { days: 180, price: 0.8 },
    ] as TracesAndLogsRetention[],
    METRICS: [
      { months: 1, price: 0.1 },
      { months: 3, price: 0.12 },
      { months: 6, price: 0.15 },
      { months: 13, price: 0.18 },
    ] as MetricsRetention[],
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

  const getPrice = (type: 'TRACES_AND_LOGS' | 'METRICS', period: number) => {
    const prices = RETENTION_PERIOD[type]
    if (type === 'TRACES_AND_LOGS') {
      const price = (prices as TracesAndLogsRetention[]).find((p) => p.days === period)
      return price?.price || prices[0].price
    } else {
      const price = (prices as MetricsRetention[]).find((p) => p.months === period)
      return price?.price || prices[0].price
    }
  }

  return (
    <div className={`py-4 ${className}`}>
      <div className="flex flex-col gap-4">
        {/* Top features section */}
        <div className="flex items-center justify-between gap-4 font-bold">
          <div className="flex items-center gap-2">
            <CheckCircle className="text-green-500" size={16} />
            <span className="text-base text-signoz_vanilla-400">No user-based pricing</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className="text-green-500" size={16} />
            <span className="text-base text-signoz_vanilla-400">No host-based pricing</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className="text-green-500" size={16} />
            <span className="text-base text-signoz_vanilla-400">
              No special pricing for custom metrics
            </span>
          </div>
        </div>

        {/* Get Started button */}
        <div className="my-6 flex flex-col gap-3 sm:flex-row sm:items-center">
          <TrackingLink
            id="pricing-page-get-started-card-cta"
            href="/teams"
            clickType="Primary CTA"
            clickName="Sign Up Button"
            clickLocation="Pricing Overview Card"
            clickText="Get Started - Free"
            className="flex-1 sm:flex-[0.6]"
          >
            <Button
              type={Button.TYPES.PRIMARY}
              className="!w-full !px-16 py-3 text-lg font-bold shadow-lg transition-all duration-200 hover:shadow-xl"
            >
              Get Started - Free <ArrowRight className="h-5 w-5" />
            </Button>
          </TrackingLink>

          <TrackingLink
            id="pricing-page-estimate-your-monthly-bill-card-cta"
            href="#estimate-your-monthly-bill"
            clickType="Secondary CTA"
            clickName="Pricing Calculator Button"
            clickLocation="Pricing Overview Card"
            clickText="Estimate Your Monthly Bill"
            className="flex-1 sm:flex-[0.4]"
          >
            <Button
              type={Button.TYPES.SECONDARY}
              className="!w-full !px-6 !py-3 text-base font-semibold"
            >
              Estimate Your Monthly Bill
              <ArrowDownRight className="h-4 w-4" />
            </Button>
          </TrackingLink>
        </div>

        {/* Pricing info */}
        <div className="flex items-center gap-4 text-center text-sm text-signoz_vanilla-400">
          <div className="flex-1 border-t border-dashed border-gray-500"></div>
          <div>
            <p className="mb-1">
              Starts at <span className="line-through">$199</span> $49/month
            </p>
            <p className="mb-0 text-xs opacity-75"></p>
          </div>
          <div className="flex-1 border-t border-dashed border-gray-500"></div>
        </div>

        {/* Telemetry types */}
        <div className="mb-8 mt-4 flex items-center justify-between">
          <div className="text-left">
            <h4 className="mb-1 text-xl font-medium">Logs</h4>
            <p className="mb-0 text-sm text-gray-400">
              ${getPrice('TRACES_AND_LOGS', logsRetentionPeriod)}/GB ingested
            </p>
            <span className="relative cursor-pointer border-b border-gray-400 text-sm text-gray-400">
              {logsRetentionPeriod} days retention
              <select
                value={logsRetentionPeriod}
                onChange={(e) => setLogsRetentionPeriod(Number(e.target.value))}
                className="absolute left-0 top-0 z-10 h-full w-max cursor-pointer opacity-0"
              >
                {RETENTION_PERIOD.TRACES_AND_LOGS.map(({ days }) => (
                  <option key={days} value={days}>
                    {days} days retention
                  </option>
                ))}
              </select>
            </span>
          </div>
          <div className="w-16 border-t border-dashed border-gray-600"></div>
          <div className="text-left">
            <h4 className="mb-1 text-xl font-medium">Traces</h4>
            <p className="mb-0 text-sm text-gray-400">
              ${getPrice('TRACES_AND_LOGS', tracesRetentionPeriod)}/GB ingested
            </p>
            <span className="relative cursor-pointer border-b border-gray-400 text-sm text-gray-400">
              {tracesRetentionPeriod} days retention
              <select
                value={tracesRetentionPeriod}
                onChange={(e) => setTracesRetentionPeriod(Number(e.target.value))}
                className="absolute left-0 top-0 z-10 h-full w-max cursor-pointer opacity-0"
              >
                {RETENTION_PERIOD.TRACES_AND_LOGS.map(({ days }) => (
                  <option key={days} value={days}>
                    {days} days retention
                  </option>
                ))}
              </select>
            </span>
          </div>
          <div className="w-16 border-t border-dashed border-gray-600"></div>
          <div className="text-left">
            <h4 className="mb-1 text-xl font-medium">Metrics</h4>
            <p className="mb-0 text-sm text-gray-400">
              ${getPrice('METRICS', metricsRetentionPeriod)}/mil samples
            </p>
            <span className="relative cursor-pointer border-b border-gray-400 text-sm text-gray-400">
              {metricsRetentionPeriod} month{metricsRetentionPeriod > 1 ? 's' : ''} retention
              <select
                value={metricsRetentionPeriod}
                onChange={(e) => setMetricsRetentionPeriod(Number(e.target.value))}
                className="absolute left-0 top-0 z-10 h-full w-max cursor-pointer opacity-0"
              >
                {RETENTION_PERIOD.METRICS.map(({ months }) => (
                  <option key={months} value={months}>
                    {months} month{months > 1 ? 's' : ''} retention
                  </option>
                ))}
              </select>
            </span>
          </div>
        </div>

        {/* Bottom link */}
        <div className="text-center text-sm">
          <p className="text-signoz_vanilla-400">
            Tired of unpredictable pricing and complex billing structure?
            <br />
            Migrate your Datadog dashboards in minutes with our{' '}
            <TrackingLink
              href="https://signoz.io/datadog-migration-tool/"
              className="text-signoz_robin-500 hover:underline"
              clickType="Nav Click"
              clickName="Migration Tool Link"
              clickLocation="Pricing Overview Card"
              clickText="automated migration tool"
            >
              automated migration tool
            </TrackingLink>{' '}
            and save up to{' '}
            <TrackingLink
              href="https://signoz.io/blog/pricing-comparison-signoz-vs-datadog-vs-newrelic-vs-grafana/"
              className="text-signoz_robin-500 hover:underline"
              clickType="Nav Click"
              clickName="Pricing Comparison Blog Link"
              clickLocation="Pricing Overview Card"
              clickText="80% on your Datadog bill"
            >
              80% on your Datadog bill
            </TrackingLink>{' '}
            with SigNoz.
          </p>
        </div>
      </div>
    </div>
  )
}

export default SigNozCloudPricingOverview
