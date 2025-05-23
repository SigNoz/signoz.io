'use client'

import React, { useState, useEffect, useRef } from 'react'
import { Slider, Tooltip } from '@nextui-org/react'
import { ArrowUpRight, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import Button from '../../../../components/Button/Button'
import TrackingLink from '../../../../components/TrackingLink'

// Format numbers for display
const formatNumber = (number: number) =>
  number.toLocaleString(undefined, { maximumFractionDigits: 2, minimumFractionDigits: 0 })

// Format bytes (GB, TB) for display
const formatBytes = (size: number) => {
  if (size < 1000) {
    return `${formatNumber(size)} GB`
  }
  return `${formatNumber(size / 1000)} TB`
}

// Format metrics (million, billion) for display
const formatMetrics = (size: number) => {
  if (size < 1000) {
    return `${formatNumber(size)} mn`
  }
  return `${formatNumber(size / 1000)} bn`
}

// Constants for slider ranges
const MIN_VALUE = 0
const MAX_VALUE = 100000
const MIN_LOG_VALUE = 0.1 // Small positive number for logarithmic calculations

// Transform linear slider value to logarithmic scale
const linearToLog = (value: number, minLog: number, maxLog: number) => {
  if (value === 0) return 0
  const minValue = Math.log(MIN_LOG_VALUE)
  const maxValue = Math.log(maxLog)
  const scale = (maxValue - minValue) / (maxLog - MIN_LOG_VALUE)
  return Math.floor(Math.exp(minValue + scale * (value - MIN_LOG_VALUE)))
}

// Transform logarithmic value back to linear scale for slider
const logToLinear = (value: number, minLog: number, maxLog: number) => {
  if (value === 0) return 0
  const minValue = Math.log(MIN_LOG_VALUE)
  const maxValue = Math.log(maxLog)
  const scale = (maxLog - MIN_LOG_VALUE) / (maxValue - minValue)
  return Math.floor(MIN_LOG_VALUE + scale * (Math.log(value) - minValue))
}

const PricingCalculator: React.FC = () => {
  // Constants for pricing and retention periods
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

  // State for retention periods
  const [tracesRetentionPeriod, setTracesRetentionPeriod] = useState(
    RETENTION_PERIOD.TRACES_AND_LOGS[0].days
  )
  const [logsRetentionPeriod, setLogsRetentionPeriod] = useState(
    RETENTION_PERIOD.TRACES_AND_LOGS[0].days
  )
  const [metricsRetentionPeriod, setMetricsRetentionPeriod] = useState(
    RETENTION_PERIOD.METRICS[0].months
  )

  // State for slider values
  const [tracesValue, setTracesValue] = useState(logToLinear(20, MIN_LOG_VALUE, MAX_VALUE))
  const [inputTracesValue, setInputTracesValue] = useState('20')

  const [logsValue, setLogsValue] = useState(logToLinear(100, MIN_LOG_VALUE, MAX_VALUE))
  const [inputLogsValue, setInputLogsValue] = useState('100')

  const [metricsValue, setMetricsValue] = useState(logToLinear(80, MIN_LOG_VALUE, MAX_VALUE))
  const [inputMetricsValue, setInputMetricsValue] = useState('80')

  // State for active tab in mobile view
  const [activeTab, setActiveTab] = useState('traces')

  // Used to track whether we're client-side rendered
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  // Handle slider changes
  const handleChangeTraces = (value: number | number[]) => {
    const numValue = typeof value === 'number' ? value : value[0]
    if (isNaN(numValue)) return
    setTracesValue(numValue)
    setInputTracesValue(linearToLog(numValue, MIN_LOG_VALUE, MAX_VALUE).toString())
  }

  const handleChangeLogs = (value: number | number[]) => {
    const numValue = typeof value === 'number' ? value : value[0]
    if (isNaN(numValue)) return
    setLogsValue(numValue)
    setInputLogsValue(linearToLog(numValue, MIN_LOG_VALUE, MAX_VALUE).toString())
  }

  const handleChangeMetrics = (value: number | number[]) => {
    const numValue = typeof value === 'number' ? value : value[0]
    if (isNaN(numValue)) return
    setMetricsValue(numValue)
    setInputMetricsValue(linearToLog(numValue, MIN_VALUE, MAX_VALUE).toString())
  }

  // Handle direct input changes
  const handleInputTracesChange = (value: string) => {
    setInputTracesValue(value)
    const numValue = Number(value)
    if (isNaN(numValue) || numValue < 0) return
    const linearValue =
      numValue === 0 ? 0 : logToLinear(Math.min(numValue, MAX_VALUE), MIN_LOG_VALUE, MAX_VALUE)
    setTracesValue(linearValue)
  }

  const handleInputLogsChange = (value: string) => {
    setInputLogsValue(value)
    const numValue = Number(value)
    if (isNaN(numValue) || numValue < 0) return
    const linearValue =
      numValue === 0 ? 0 : logToLinear(Math.min(numValue, MAX_VALUE), MIN_LOG_VALUE, MAX_VALUE)
    setLogsValue(linearValue)
  }

  const handleInputMetricsChange = (value: string) => {
    setInputMetricsValue(value)
    const numValue = Number(value)
    if (isNaN(numValue) || numValue < 0) return
    const linearValue =
      numValue === 0 ? 0 : logToLinear(Math.min(numValue, MAX_VALUE), MIN_LOG_VALUE, MAX_VALUE)
    setMetricsValue(linearValue)
  }

  // Copy link to clipboard
  const copyLinkToClipboard = () => {
    navigator.clipboard.writeText('https://signoz.io/pricing/pricingv1/#estimate-your-monthly-bill')
  }

  // Get price per unit based on type and retention period
  const getPricePerUnit = (type: string, retentionPeriod: number) => {
    if (type === 'metrics') {
      return METRICS_PRICES[retentionPeriod]
    } else {
      return TRACES_AND_LOGS_PRICES[retentionPeriod]
    }
  }

  // Calculate subtotal for each data type
  const calculateSubtotal = (type: string, value: number, retentionPeriod: number) => {
    if (value === 0) return 0
    const pricePerUnit = getPricePerUnit(type, retentionPeriod)
    const estimatedUsage = linearToLog(value, MIN_LOG_VALUE, MAX_VALUE)
    return Number(pricePerUnit) * Number(estimatedUsage)
  }

  // Calculate subtotals and total estimate
  const tracesSubtotal = calculateSubtotal('traces', tracesValue, tracesRetentionPeriod)
  const logsSubtotal = calculateSubtotal('logs', logsValue, logsRetentionPeriod)
  const metricsSubtotal = calculateSubtotal('metrics', metricsValue, metricsRetentionPeriod)
  const totalEstimate = Math.max(49, tracesSubtotal + logsSubtotal + metricsSubtotal)

  // Check if high volume for custom pricing suggestion
  const isHighVolume = totalEstimate >= 2500

  // Detect if on mobile
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768)
    }

    // Set initial value
    handleResize()

    // Add event listener
    window.addEventListener('resize', handleResize)

    // Clean up
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Render a slider with consistent styling
  const renderSlider = (
    value: number,
    onChange: (val: number | number[]) => void,
    color: 'secondary' | 'danger' | 'warning',
    minLabel: string,
    maxLabel: string,
    formatFunc: (val: number) => string,
    thumbColor: string,
    ariaLabel: string
  ) => (
    <Slider
      size="sm"
      step={0.01}
      maxValue={MAX_VALUE}
      minValue={MIN_VALUE}
      showTooltip={true}
      tooltipProps={{
        content: value === 0 ? '0' : formatFunc(linearToLog(value, MIN_LOG_VALUE, MAX_VALUE)),
      }}
      color={color}
      marks={[
        { value: MIN_VALUE, label: minLabel },
        { value: MAX_VALUE, label: maxLabel },
      ]}
      classNames={{
        base: 'max-w-full',
        label: 'text-medium',
      }}
      aria-label={ariaLabel}
      renderThumb={(props) => (
        <div
          {...props}
          className="group top-1/2 cursor-grab rounded-full border-small border-signoz_vanilla-100 bg-background shadow-medium data-[dragging=true]:cursor-grabbing"
          aria-valuetext={
            value === 0 ? '0' : formatFunc(linearToLog(value, MIN_LOG_VALUE, MAX_VALUE))
          }
        >
          <span
            className={`block h-5 w-5 rounded-full bg-${thumbColor} transition-transform group-data-[dragging=true]:scale-80`}
          />
        </div>
      )}
      value={value}
      onChange={onChange}
    />
  )

  return (
    <div
      id="estimate-your-monthly-bill"
      className="pricing-calculator mb-6 mt-0 w-full rounded-md border border-dashed border-signoz_slate-400 p-3 md:p-4"
    >
      <div className="mb-4">
        <span className="group relative text-lg font-semibold text-signoz_vanilla-100 md:text-2xl">
          Estimate your monthly bill
          {isMounted && (
            <a
              href="#estimate-your-monthly-bill"
              onClick={copyLinkToClipboard}
              className="ml-2 opacity-0 transition-opacity duration-200 group-hover:opacity-100"
              aria-label="Copy link to this section"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="#4E74F8"
                className="linkicon h-6 w-6"
              >
                <path d="M12.232 4.232a2.5 2.5 0 0 1 3.536 3.536l-1.225 1.224a.75.75 0 0 0 1.061 1.06l1.224-1.224a4 4 0 0 0-5.656-5.656l-3 3a4 4 0 0 0 .225 5.865.75.75 0 0 0 .977-1.138 2.5 2.5 0 0 1-.142-3.667l3-3Z" />
                <path d="M11.603 7.963a.75.75 0 0 0-.977 1.138 2.5 2.5 0 0 1 .142 3.667l-3 3a2.5 2.5 0 0 1-3.536-3.536l1.225-1.224a.75.75 0 0 0-1.061-1.06l-1.224 1.224a4 4 0 1 0 5.656 5.656l3-3a4 4 0 0 0-.225-5.865Z" />
              </svg>
            </a>
          )}
        </span>
        {isMounted && (
          <p className="mt-1 text-sm text-signoz_vanilla-400">
            You can also set data ingestion limits so you never get a surprise bill.
            <Link
              href="https://signoz.io/docs/ingestion/signoz-cloud/keys/"
              className="ml-1 font-medium text-signoz_robin-400"
            >
              Learn more
              <ArrowUpRight className="inline" size={16} />
            </Link>
          </p>
        )}
      </div>

      {isMobile ? (
        // Mobile view with tabs
        <div>
          {/* Tab navigation */}
          <div className="tabs mb-4 flex justify-between gap-2">
            <button
              className={`tab flex w-full items-center justify-center gap-2 p-1 text-base font-normal text-signoz_vanilla-400 ${activeTab === 'traces' ? 'rounded-md bg-signoz_ink-400 !text-signoz_vanilla-100' : ''}`}
              onClick={() => setActiveTab('traces')}
            >
              {activeTab === 'traces' ? (
                <img
                  src="/img/index_features/drafting-compass.svg"
                  alt="Traces Icon"
                  className="h-4 w-4"
                />
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="17"
                  height="16"
                  viewBox="0 0 17 16"
                  fill="none"
                >
                  <path
                    d="M8.83382 4.66667C9.5702 4.66667 10.1672 4.06971 10.1672 3.33333C10.1672 2.59695 9.5702 2 8.83382 2C8.09744 2 7.50049 2.59695 7.50049 3.33333C7.50049 4.06971 8.09744 4.66667 8.83382 4.66667Z"
                    stroke="#C0C1C3"
                    strokeWidth="1.33333"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M2.8335 14L8.18016 4.49329"
                    stroke="#C0C1C3"
                    strokeWidth="1.33333"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M9.49365 4.49329L10.7803 6.78662"
                    stroke="#C0C1C3"
                    strokeWidth="1.33333"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M13.5003 8C10.9203 10.6667 6.74699 10.6667 4.16699 8"
                    stroke="#C0C1C3"
                    strokeWidth="1.33333"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M14.8336 13.9999L13.3936 11.4399"
                    stroke="#C0C1C3"
                    strokeWidth="1.33333"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
              Traces
            </button>

            <button
              className={`tab flex w-full items-center justify-center gap-2 p-1 text-base font-normal text-signoz_vanilla-400 ${activeTab === 'logs' ? 'rounded-md bg-signoz_ink-400 !text-signoz_vanilla-100' : ''}`}
              onClick={() => setActiveTab('logs')}
            >
              {activeTab === 'logs' ? (
                <img src="/img/index_features/logs.svg" alt="Logs Icon" className="h-4 w-4" />
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 17 16"
                  fill="none"
                >
                  <path d="M3.8335 3.66675L3.8335 12.6667" stroke="#C0C1C3" strokeWidth="1.33333" />
                  <ellipse
                    cx="7.8335"
                    cy="3.66667"
                    rx="4"
                    ry="1.66667"
                    stroke="#C0C1C3"
                    strokeWidth="1.33333"
                  />
                  <ellipse cx="7.8335" cy="3.61674" rx="1" ry="0.416667" fill="#C0C1C3" />
                  <path
                    d="M11.8335 12.6667C11.8335 13.4031 10.0426 14.0001 7.8335 14.0001C5.62436 14.0001 3.8335 13.4031 3.8335 12.6667"
                    stroke="#C0C1C3"
                    strokeWidth="1.33333"
                  />
                  <path
                    d="M6.5 7.33337V8.61023C6.5 8.64282 6.52356 8.67063 6.55571 8.67599L8.44429 8.99076C8.47644 8.99611 8.5 9.02393 8.5 9.05652V11.3334"
                    stroke="#C0C1C3"
                    strokeWidth="1.33333"
                    strokeLinecap="round"
                  />
                  <path
                    d="M11.8335 3.66675V7.21313C11.8335 7.26549 11.8911 7.29742 11.9355 7.26966L14.4224 5.71535C14.4608 5.69136 14.5114 5.71179 14.5224 5.75572L14.8249 6.96568C14.8303 6.98719 14.8246 7.00996 14.8098 7.02644L11.8506 10.3144C11.8396 10.3266 11.8335 10.3425 11.8335 10.359V12.6667"
                    stroke="#C0C1C3"
                    strokeWidth="1.33333"
                  />
                </svg>
              )}
              Logs
            </button>

            <button
              className={`tab flex w-full items-center justify-center gap-2 p-1 text-base font-normal text-signoz_vanilla-400 ${activeTab === 'metrics' ? 'rounded-md bg-signoz_ink-400 !text-signoz_vanilla-100' : ''}`}
              onClick={() => setActiveTab('metrics')}
            >
              {activeTab === 'metrics' ? (
                <img
                  src="/img/index_features/bar-chart-2.svg"
                  alt="Metrics Icon"
                  className="h-4 w-4"
                />
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 17 16"
                  fill="none"
                >
                  <path
                    d="M12.167 13.3333V6.66663"
                    stroke="#C0C1C3"
                    strokeWidth="1.33333"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M8.16699 13.3333V2.66663"
                    stroke="#C0C1C3"
                    strokeWidth="1.33333"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M4.16699 13.3333V9.33325"
                    stroke="#C0C1C3"
                    strokeWidth="1.33333"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
              Metrics
            </button>
          </div>

          {/* Traces tab content */}
          {activeTab === 'traces' && (
            <div className="data-section rounded-md bg-signoz_ink-400 bg-opacity-5 px-3 pb-4 pt-6">
              <div className="mb-4 flex justify-between">
                <span className="text-xs font-semibold uppercase text-signoz_vanilla-400">
                  Price per unit
                </span>
                <span className="text-xs font-semibold uppercase text-signoz_vanilla-400">
                  Retention
                </span>
              </div>

              <div className="mb-6 flex justify-between">
                <div className="text-signoz_robin-400">
                  ${TRACES_AND_LOGS_PRICES[tracesRetentionPeriod]}/GB
                </div>
                <select
                  className="block h-[32px] w-32 rounded-sm border border-signoz_slate-400 bg-signoz_ink-400 py-1.5 pl-2 pr-1.5 text-xs text-signoz_vanilla-100"
                  value={tracesRetentionPeriod}
                  onChange={(e) => setTracesRetentionPeriod(Number(e.target.value))}
                >
                  {RETENTION_PERIOD.TRACES_AND_LOGS.map((option, idx) => (
                    <option key={`traces-${option.days}-${idx}`} value={option.days}>
                      {`${option.days} days`}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-2">
                <span className="text-xs font-semibold uppercase text-signoz_vanilla-400">
                  Scale of ingestion (per month)
                </span>
                <div className="mt-4">
                  {renderSlider(
                    tracesValue,
                    handleChangeTraces,
                    'secondary',
                    '0GB',
                    '100TB',
                    formatBytes,
                    'signoz_robin-500',
                    'Adjust traces ingestion volume'
                  )}
                </div>
              </div>

              <div className="mb-4 mt-10 flex justify-between uppercase">
                <span className="text-xs font-semibold text-signoz_vanilla-400">
                  Estimated usage
                </span>
                <span className="text-xs font-semibold text-signoz_vanilla-400">Subtotal</span>
              </div>
              <div className="mb-2 flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    type="number"
                    value={inputTracesValue}
                    onChange={(e) => handleInputTracesChange(e.target.value)}
                    className="mr-2 w-20 border-0 border-b border-signoz_robin-400/50 bg-transparent text-right text-signoz_vanilla-400 outline-none"
                    min="0"
                  />
                  <span className="text-base text-signoz_vanilla-400">GB</span>
                </div>
                <div className="w-[45%] border-b border-dashed border-signoz_slate-400"></div>
                <span className="text-base font-medium text-signoz_vanilla-100">
                  ${formatNumber(tracesSubtotal)}
                </span>
              </div>
            </div>
          )}

          {/* Logs tab content */}
          {activeTab === 'logs' && (
            <div className="data-section rounded-md bg-signoz_ink-400 bg-opacity-5 px-3 pb-4 pt-6">
              <div className="mb-4 flex justify-between">
                <span className="text-xs font-semibold uppercase text-signoz_vanilla-400">
                  Price per unit
                </span>
                <span className="text-xs font-semibold uppercase text-signoz_vanilla-400">
                  Retention
                </span>
              </div>

              <div className="mb-6 flex justify-between">
                <div className="text-signoz_sakura-400">
                  ${TRACES_AND_LOGS_PRICES[logsRetentionPeriod]}/GB
                </div>
                <select
                  className="block h-[32px] w-32 rounded-sm border border-signoz_slate-400 bg-signoz_ink-400 py-1.5 pl-2 pr-1.5 text-xs text-signoz_vanilla-100"
                  value={logsRetentionPeriod}
                  onChange={(e) => setLogsRetentionPeriod(Number(e.target.value))}
                >
                  {RETENTION_PERIOD.TRACES_AND_LOGS.map((option, idx) => (
                    <option key={`logs-${option.days}-${idx}`} value={option.days}>
                      {`${option.days} days`}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-2">
                <span className="text-xs font-semibold uppercase text-signoz_vanilla-400">
                  Scale of ingestion (per month)
                </span>
                <div className="mt-4">
                  {renderSlider(
                    logsValue,
                    handleChangeLogs,
                    'danger',
                    '0GB',
                    '100TB',
                    formatBytes,
                    'signoz_sakura-500',
                    'Adjust logs ingestion volume'
                  )}
                </div>
              </div>

              <div className="mb-4 mt-10 flex justify-between uppercase">
                <span className="text-xs font-semibold text-signoz_vanilla-400">
                  Estimated usage
                </span>
                <span className="text-xs font-semibold text-signoz_vanilla-400">Subtotal</span>
              </div>
              <div className="mb-2 flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    type="number"
                    value={inputLogsValue}
                    onChange={(e) => handleInputLogsChange(e.target.value)}
                    className="mr-2 w-20 border-0 border-b border-signoz_sakura-400/50 bg-transparent text-right text-signoz_vanilla-400 outline-none"
                    min="0"
                  />
                  <span className="text-base text-signoz_vanilla-400">GB</span>
                </div>
                <div className="w-[45%] border-b border-dashed border-signoz_slate-400"></div>
                <span className="text-base font-medium text-signoz_vanilla-100">
                  ${formatNumber(logsSubtotal)}
                </span>
              </div>
            </div>
          )}

          {/* Metrics tab content */}
          {activeTab === 'metrics' && (
            <div className="data-section rounded-md bg-signoz_ink-400 bg-opacity-5 px-3 pb-4 pt-6">
              <div className="mb-4 flex justify-between">
                <span className="text-xs font-semibold uppercase text-signoz_vanilla-400">
                  Price per unit
                </span>
                <span className="text-xs font-semibold uppercase text-signoz_vanilla-400">
                  Retention
                </span>
              </div>

              <div className="mb-6 flex justify-between">
                <div className="text-signoz_amber-400">
                  ${METRICS_PRICES[metricsRetentionPeriod]}/mn samples
                </div>
                <select
                  className="block h-[32px] w-32 rounded-sm border border-signoz_slate-400 bg-signoz_ink-400 py-1.5 pl-2 pr-1.5 text-xs text-signoz_vanilla-100"
                  value={metricsRetentionPeriod}
                  onChange={(e) => setMetricsRetentionPeriod(Number(e.target.value))}
                >
                  {RETENTION_PERIOD.METRICS.map((option, idx) => (
                    <option key={`metrics-${option.months}-${idx}`} value={option.months}>
                      {`${option.months} ${option.months === 1 ? 'month' : 'months'}`}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-2">
                <span className="text-xs font-semibold uppercase text-signoz_vanilla-400">
                  Scale of ingestion (per month)
                </span>
                <div className="mt-4">
                  {renderSlider(
                    metricsValue,
                    handleChangeMetrics,
                    'warning',
                    '0M',
                    '100B',
                    formatMetrics,
                    'signoz_amber-500',
                    'Adjust metrics ingestion volume'
                  )}
                </div>
              </div>

              <div className="mb-4 mt-10 flex justify-between uppercase">
                <span className="text-xs font-semibold text-signoz_vanilla-400">
                  Estimated usage
                </span>
                <span className="text-xs font-semibold text-signoz_vanilla-400">Subtotal</span>
              </div>
              <div className="mb-2 flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    type="number"
                    value={inputMetricsValue}
                    onChange={(e) => handleInputMetricsChange(e.target.value)}
                    className="mr-2 w-20 border-0 border-b border-signoz_amber-400/50 bg-transparent text-right text-signoz_vanilla-400 outline-none"
                    min="0"
                  />
                  <span className="text-base text-signoz_vanilla-400">mn</span>
                </div>
                <div className="w-[45%] border-b border-dashed border-signoz_slate-400"></div>
                <span className="text-base font-medium text-signoz_vanilla-100">
                  ${formatNumber(metricsSubtotal)}
                </span>
              </div>
            </div>
          )}
        </div>
      ) : (
        // Desktop view - Grid Layout
        <div className="grid grid-cols-6 grid-rows-4 gap-y-3">
          {/* Header Row */}
          <div className="col-start-1 p-2"></div>
          <div className="col-start-2 py-2 pr-2 text-xs font-semibold uppercase text-signoz_vanilla-400">
            Pricing per unit
          </div>
          <div className="col-start-3 py-2 pr-2 text-xs font-semibold uppercase text-signoz_vanilla-400">
            Retention
          </div>
          <div className="col-start-4 py-2 pr-2 text-xs font-semibold uppercase text-signoz_vanilla-400">
            Scale of ingestion (per month)
          </div>
          <div className="col-start-5 py-2 pr-2 text-right text-xs font-semibold uppercase text-signoz_vanilla-400">
            Estimated usage
          </div>
          <div className="col-start-6 py-2 pr-2 text-right text-xs font-semibold uppercase text-signoz_vanilla-400">
            Subtotal
          </div>

          {/* Traces Row */}
          <div className="metrics-background col-start-1 flex items-center gap-2 p-2">
            <img
              src="/img/index_features/drafting-compass.svg"
              alt="Traces Icon"
              className="h-5 w-5"
            />
            <span>Traces</span>
          </div>
          <div className="metrics-background col-start-2 flex items-center gap-1">
            <span className="text-base font-medium text-signoz_robin-400">
              ${TRACES_AND_LOGS_PRICES[tracesRetentionPeriod]}
            </span>
            /GB
          </div>
          <div className="metrics-background col-start-3 flex items-center">
            <select
              className="block h-[28px] w-28 rounded-sm border border-signoz_slate-400 bg-signoz_ink-400 p-1 text-xs text-signoz_vanilla-100"
              value={tracesRetentionPeriod}
              onChange={(e) => setTracesRetentionPeriod(Number(e.target.value))}
            >
              {RETENTION_PERIOD.TRACES_AND_LOGS.map((option, idx) => (
                <option key={`traces-${option.days}-${idx}`} value={option.days}>
                  {`${option.days} days`}
                </option>
              ))}
            </select>
          </div>
          <div className="metrics-background col-start-4 flex items-center">
            {renderSlider(
              tracesValue,
              handleChangeTraces,
              'secondary',
              '0GB',
              '100TB',
              formatBytes,
              'signoz_robin-500',
              'Adjust traces ingestion volume'
            )}
          </div>
          <div className="metrics-background col-start-5 p-2 text-right text-signoz_vanilla-400">
            <div className="flex items-center justify-end">
              <input
                type="number"
                value={inputTracesValue}
                onChange={(e) => handleInputTracesChange(e.target.value)}
                className="mr-2 w-20 border-0 border-b border-signoz_robin-400/50 bg-transparent text-right text-signoz_vanilla-400 outline-none"
                min="0"
              />
              <span>GB</span>
            </div>
          </div>
          <div className="metrics-background col-start-6 p-2 text-right">
            ${formatNumber(tracesSubtotal)}
          </div>

          {/* Logs Row */}
          <div className="metrics-background col-start-1 flex items-center gap-2 p-2">
            <img src="/img/index_features/logs.svg" alt="Logs Icon" className="h-5 w-5" />
            <span>Logs</span>
          </div>
          <div className="metrics-background col-start-2 flex items-center gap-1">
            <span className="text-base font-medium text-signoz_sakura-400">
              ${TRACES_AND_LOGS_PRICES[logsRetentionPeriod]}
            </span>
            /GB
          </div>
          <div className="metrics-background col-start-3 flex items-center">
            <select
              className="block h-[28px] w-28 rounded-sm border border-signoz_slate-400 bg-signoz_ink-400 p-1 text-xs text-signoz_vanilla-100"
              value={logsRetentionPeriod}
              onChange={(e) => setLogsRetentionPeriod(Number(e.target.value))}
            >
              {RETENTION_PERIOD.TRACES_AND_LOGS.map((option, idx) => (
                <option key={`logs-${option.days}-${idx}`} value={option.days}>
                  {`${option.days} days`}
                </option>
              ))}
            </select>
          </div>
          <div className="metrics-background col-start-4 flex items-center">
            {renderSlider(
              logsValue,
              handleChangeLogs,
              'danger',
              '0GB',
              '100TB',
              formatBytes,
              'signoz_sakura-500',
              'Adjust logs ingestion volume'
            )}
          </div>
          <div className="metrics-background col-start-5 p-2 text-right text-signoz_vanilla-400">
            <div className="flex items-center justify-end">
              <input
                type="number"
                value={inputLogsValue}
                onChange={(e) => handleInputLogsChange(e.target.value)}
                className="mr-2 w-20 border-0 border-b border-signoz_sakura-400/50 bg-transparent text-right text-signoz_vanilla-400 outline-none"
                min="0"
              />
              <span>GB</span>
            </div>
          </div>
          <div className="metrics-background col-start-6 p-2 text-right">
            ${formatNumber(logsSubtotal)}
          </div>

          {/* Metrics Row */}
          <div className="metrics-background col-start-1 flex items-center gap-2 p-2">
            <img src="/img/index_features/bar-chart-2.svg" alt="Metrics Icon" className="h-5 w-5" />
            <span>Metrics</span>
          </div>
          <div className="metrics-background col-start-2 flex items-center gap-1">
            <span className="text-base font-medium text-signoz_amber-400">
              ${METRICS_PRICES[metricsRetentionPeriod]}
            </span>
            /mn samples
          </div>
          <div className="metrics-background col-start-3 flex items-center">
            <select
              className="block h-[28px] w-28 rounded-sm border border-signoz_slate-400 bg-signoz_ink-400 p-1 text-xs text-signoz_vanilla-100"
              value={metricsRetentionPeriod}
              onChange={(e) => setMetricsRetentionPeriod(Number(e.target.value))}
            >
              {RETENTION_PERIOD.METRICS.map((option, idx) => (
                <option key={`metrics-${option.months}-${idx}`} value={option.months}>
                  {`${option.months} ${option.months === 1 ? 'month' : 'months'}`}
                </option>
              ))}
            </select>
          </div>
          <div className="metrics-background col-start-4 flex items-center">
            {renderSlider(
              metricsValue,
              handleChangeMetrics,
              'warning',
              '0M',
              '100B',
              formatMetrics,
              'signoz_amber-500',
              'Adjust metrics ingestion volume'
            )}
          </div>
          <div className="metrics-background col-start-5 p-2 text-right text-signoz_vanilla-400">
            <div className="flex items-center justify-end">
              <input
                type="number"
                value={inputMetricsValue}
                onChange={(e) => handleInputMetricsChange(e.target.value)}
                className="mr-2 w-20 border-0 border-b border-signoz_amber-400/50 bg-transparent text-right text-signoz_vanilla-400 outline-none"
                min="0"
              />
              <span>mn</span>
            </div>
          </div>
          <div className="metrics-background col-start-6 p-2 text-right">
            ${formatNumber(metricsSubtotal)}
          </div>
        </div>
      )}

      {/* Total estimate - always shown */}
      <div className="button-background mt-6 flex items-center justify-between rounded-md px-3 py-4">
        <span className="text-base font-medium text-signoz_vanilla-100">Monthly estimate</span>
        <div className="w-[45%] border-b border-dashed border-signoz_slate-400"></div>
        <div className="text-xl font-bold text-signoz_vanilla-100">
          ${formatNumber(totalEstimate)}
        </div>
      </div>

      {/* Actions section */}
      <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        {/* Cost comparison link */}
        <div className="mb-4 hidden md:block">
          <a
            href="/blog/pricing-comparison-signoz-vs-datadog-vs-newrelic-vs-grafana/"
            target="_blank"
            className="inline-flex items-center justify-center rounded-md bg-signoz_ink-400 px-5 py-2.5 text-sm text-white transition-colors hover:bg-signoz_ink-300"
          >
            SigNoz saves you up to 80% on datadog bills.
            <ArrowUpRight size={18} className="ml-1 inline" />
          </a>
        </div>

        <TrackingLink
          href="/teams"
          clickType="Primary CTA"
          clickName="Sign Up Button"
          clickText="Get Started - Free"
          clickLocation="Pricing Calculator"
        >
          <Button className="flex w-full items-center justify-center sm:w-auto">
            Get Started - Free
            <ArrowRight size={14} className="ml-2" />
          </Button>
        </TrackingLink>
      </div>

      {/* High volume message when applicable */}
      {isHighVolume && (
        <div className="mt-4 rounded-md border border-dashed border-signoz_robin-500 bg-signoz_robin-500/10 p-3">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <span className="mb-2 text-sm font-medium text-signoz_robin-400 sm:mb-0">
              For high volume usage, reach out to us for custom pricing and retention options
            </span>
            <TrackingLink
              href="https://share.hsforms.com/1AZy88ajlRsCPZUP0kSMb2gda5af"
              clickType="Secondary CTA"
              clickName="Volume Discount Form Link"
              clickText="Contact Us"
              clickLocation="Pricing Calculator"
            >
              <Button variant="secondary" className="w-full sm:w-auto">
                Contact us
              </Button>
            </TrackingLink>
          </div>
        </div>
      )}
    </div>
  )
}

export default PricingCalculator
