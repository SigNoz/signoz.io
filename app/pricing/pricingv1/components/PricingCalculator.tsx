import React, { useState, useEffect, useRef } from 'react'
import { Slider, Tooltip, Switch } from '@nextui-org/react'
import { ArrowUpRight } from 'lucide-react'
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

// Transform linear slider value to logarithmic scale
const linearToLog = (value: number, minLog: number, maxLog: number) => {
  const minValue = Math.log(minLog)
  const maxValue = Math.log(maxLog)
  const scale = (maxValue - minValue) / (maxLog - minLog)
  return Math.floor(Math.exp(minValue + scale * (value - minLog)))
}

// Transform logarithmic value back to linear scale for slider
const logToLinear = (value: number, minLog: number, maxLog: number) => {
  const minValue = Math.log(minLog)
  const maxValue = Math.log(maxLog)
  const scale = (maxLog - minLog) / (maxValue - minValue)
  return Math.floor(minLog + scale * (Math.log(value) - minValue))
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
  const [tracesValue, setTracesValue] = useState(0)
  const [inputTracesValue, setInputTracesValue] = useState('0')

  const [logsValue, setLogsValue] = useState(0)
  const [inputLogsValue, setInputLogsValue] = useState('0')

  const [metricsValue, setMetricsValue] = useState(0)
  const [inputMetricsValue, setInputMetricsValue] = useState('0')

  // State for advanced mode toggle
  const [isAdvancedMode, setIsAdvancedMode] = useState(false)

  // Constants for slider ranges
  const MIN_VALUE = 1
  const MAX_VALUE = 200000

  // Handle slider changes
  const handleChangeTraces = (value: number | number[]) => {
    const numValue = typeof value === 'number' ? value : value[0]
    if (isNaN(numValue)) return
    setTracesValue(numValue)
    setInputTracesValue(linearToLog(numValue, MIN_VALUE, MAX_VALUE).toString())
  }

  const handleChangeLogs = (value: number | number[]) => {
    const numValue = typeof value === 'number' ? value : value[0]
    if (isNaN(numValue)) return
    setLogsValue(numValue)
    setInputLogsValue(linearToLog(numValue, MIN_VALUE, MAX_VALUE).toString())
  }

  const handleChangeMetrics = (value: number | number[]) => {
    const numValue = typeof value === 'number' ? value : value[0]
    if (isNaN(numValue)) return
    setMetricsValue(numValue)
    setInputMetricsValue(linearToLog(numValue, MIN_VALUE, MAX_VALUE).toString())
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
    const pricePerUnit = getPricePerUnit(type, retentionPeriod)
    const estimatedUsage = linearToLog(value, MIN_VALUE, MAX_VALUE)
    return Number(pricePerUnit) * Number(estimatedUsage)
  }

  // Calculate subtotals and total estimate
  const tracesSubtotal = calculateSubtotal('traces', tracesValue, tracesRetentionPeriod)
  const logsSubtotal = calculateSubtotal('logs', logsValue, logsRetentionPeriod)
  const metricsSubtotal = calculateSubtotal('metrics', metricsValue, metricsRetentionPeriod)
  const totalEstimate = Math.max(199, tracesSubtotal + logsSubtotal + metricsSubtotal)

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
    thumbColor: string
  ) => (
    <Slider
      size="sm"
      step={0.01}
      maxValue={MAX_VALUE}
      minValue={MIN_VALUE}
      showTooltip={true}
      tooltipProps={{
        content: formatFunc(linearToLog(value, MIN_VALUE, MAX_VALUE)),
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
      renderThumb={(props) => (
        <div
          {...props}
          className="group top-1/2 cursor-grab rounded-full border-small border-signoz_vanilla-100 bg-background shadow-medium data-[dragging=true]:cursor-grabbing"
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
    <div className="pricing-calculator mb-6 mt-0 w-full rounded-md border border-dashed border-signoz_slate-400 p-4 md:p-6">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-signoz_vanilla-100 md:text-xl">
          Estimate your monthly bill
        </h3>

        <div className="flex items-center gap-2">
          <span className="text-sm text-signoz_vanilla-400">Choose Retention Period</span>
          <Switch
            size="sm"
            isSelected={isAdvancedMode}
            onValueChange={setIsAdvancedMode}
            aria-label="Toggle advanced calculator mode"
          />
        </div>
      </div>

      {!isAdvancedMode ? (
        // Simple mode
        <div className="simple-calculator space-y-10">
          <div className="slider-container grid grid-cols-[150px_1fr] items-center gap-4">
            <div className="flex items-center gap-2">
              <img
                src="/img/index_features/drafting-compass.svg"
                alt="Traces Icon"
                className="h-5 w-5"
              />
              <span className="text-base font-medium text-signoz_vanilla-100">Traces</span>
            </div>
            <div>
              {renderSlider(
                tracesValue,
                handleChangeTraces,
                'secondary',
                '0GB',
                '200TB',
                formatBytes,
                'signoz_robin-500'
              )}
            </div>
          </div>

          <div className="slider-container grid grid-cols-[150px_1fr] items-center gap-4">
            <div className="flex items-center gap-2">
              <img src="/img/index_features/logs.svg" alt="Logs Icon" className="h-5 w-5" />
              <span className="text-base font-medium text-signoz_vanilla-100">Logs</span>
            </div>
            <div>
              {renderSlider(
                logsValue,
                handleChangeLogs,
                'danger',
                '0GB',
                '200TB',
                formatBytes,
                'signoz_sakura-500'
              )}
            </div>
          </div>

          <div className="slider-container grid grid-cols-[150px_1fr] items-center gap-4">
            <div className="flex items-center gap-2">
              <img
                src="/img/index_features/bar-chart-2.svg"
                alt="Metrics Icon"
                className="h-5 w-5"
              />
              <span className="text-base font-medium text-signoz_vanilla-100">Metrics</span>
            </div>
            <div>
              {renderSlider(
                metricsValue,
                handleChangeMetrics,
                'warning',
                '0M',
                '200B',
                formatMetrics,
                'signoz_amber-500'
              )}
            </div>
          </div>
        </div>
      ) : (
        // Advanced mode
        <div className="advanced-calculator">
          {isMobile ? (
            // Mobile advanced view
            <div className="mobile-advanced space-y-6">
              {/* Traces section */}
              <div className="data-section rounded-md bg-signoz_ink-400 bg-opacity-5 p-4">
                <div className="mb-4 flex items-center gap-2">
                  <img
                    src="/img/index_features/drafting-compass.svg"
                    alt="Traces Icon"
                    className="h-5 w-5"
                  />
                  <span className="text-base font-medium text-signoz_vanilla-100">Traces</span>
                </div>

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
                    className="block h-[32px] w-28 rounded-sm border border-signoz_slate-400 bg-signoz_ink-400 p-1 text-xs text-signoz_vanilla-100"
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

                <div className="mb-4">
                  <span className="text-xs font-semibold uppercase text-signoz_vanilla-400">
                    Scale of ingestion (per month)
                  </span>
                  {renderSlider(
                    tracesValue,
                    handleChangeTraces,
                    'secondary',
                    '0GB',
                    '200TB',
                    formatBytes,
                    'signoz_robin-500'
                  )}
                </div>

                <div className="mt-4 flex justify-between">
                  <span className="text-sm text-signoz_vanilla-400">
                    {formatBytes(linearToLog(tracesValue, MIN_VALUE, MAX_VALUE))}
                  </span>
                  <span className="text-base font-medium text-signoz_vanilla-100">
                    ${formatNumber(tracesSubtotal)}
                  </span>
                </div>
              </div>

              {/* Logs section */}
              <div className="data-section rounded-md bg-signoz_ink-400 bg-opacity-5 p-4">
                <div className="mb-4 flex items-center gap-2">
                  <img src="/img/index_features/logs.svg" alt="Logs Icon" className="h-5 w-5" />
                  <span className="text-base font-medium text-signoz_vanilla-100">Logs</span>
                </div>

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
                    className="block h-[32px] w-28 rounded-sm border border-signoz_slate-400 bg-signoz_ink-400 p-1 text-xs text-signoz_vanilla-100"
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

                <div className="mb-4">
                  <span className="text-xs font-semibold uppercase text-signoz_vanilla-400">
                    Scale of ingestion (per month)
                  </span>
                  {renderSlider(
                    logsValue,
                    handleChangeLogs,
                    'danger',
                    '0GB',
                    '200TB',
                    formatBytes,
                    'signoz_sakura-500'
                  )}
                </div>

                <div className="mt-4 flex justify-between">
                  <span className="text-sm text-signoz_vanilla-400">
                    {formatBytes(linearToLog(logsValue, MIN_VALUE, MAX_VALUE))}
                  </span>
                  <span className="text-base font-medium text-signoz_vanilla-100">
                    ${formatNumber(logsSubtotal)}
                  </span>
                </div>
              </div>

              {/* Metrics section */}
              <div className="data-section rounded-md bg-signoz_ink-400 bg-opacity-5 p-4">
                <div className="mb-4 flex items-center gap-2">
                  <img
                    src="/img/index_features/bar-chart-2.svg"
                    alt="Metrics Icon"
                    className="h-5 w-5"
                  />
                  <span className="text-base font-medium text-signoz_vanilla-100">Metrics</span>
                </div>

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
                    className="block h-[32px] w-28 rounded-sm border border-signoz_slate-400 bg-signoz_ink-400 p-1 text-xs text-signoz_vanilla-100"
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

                <div className="mb-4">
                  <span className="text-xs font-semibold uppercase text-signoz_vanilla-400">
                    Scale of ingestion (per month)
                  </span>
                  {renderSlider(
                    metricsValue,
                    handleChangeMetrics,
                    'warning',
                    '0M',
                    '200B',
                    formatMetrics,
                    'signoz_amber-500'
                  )}
                </div>

                <div className="mt-4 flex justify-between">
                  <span className="text-sm text-signoz_vanilla-400">
                    {formatMetrics(linearToLog(metricsValue, MIN_VALUE, MAX_VALUE))}
                  </span>
                  <span className="text-base font-medium text-signoz_vanilla-100">
                    ${formatNumber(metricsSubtotal)}
                  </span>
                </div>
              </div>
            </div>
          ) : (
            // Desktop advanced view - table layout
            <div className="desktop-advanced">
              <div className="grid grid-cols-6 gap-4">
                <div className="col-span-6 grid grid-cols-6 gap-4 pb-2">
                  <div className="col-span-1"></div>
                  <div className="col-span-1 text-xs font-semibold uppercase text-signoz_vanilla-400">
                    Price per unit
                  </div>
                  <div className="col-span-1 text-xs font-semibold uppercase text-signoz_vanilla-400">
                    Retention
                  </div>
                  <div className="col-span-1 text-xs font-semibold uppercase text-signoz_vanilla-400">
                    Scale of ingestion
                  </div>
                  <div className="col-span-1 text-right text-xs font-semibold uppercase text-signoz_vanilla-400">
                    Estimated usage
                  </div>
                  <div className="col-span-1 text-right text-xs font-semibold uppercase text-signoz_vanilla-400">
                    Subtotal
                  </div>
                </div>

                {/* Traces row */}
                <div className="col-span-6 grid grid-cols-6 gap-4 bg-signoz_ink-400 bg-opacity-5 py-4">
                  <div className="col-span-1 flex items-center gap-2 pl-2">
                    <img
                      src="/img/index_features/drafting-compass.svg"
                      alt="Traces Icon"
                      className="h-5 w-5"
                    />
                    <span>Traces</span>
                  </div>
                  <div className="col-span-1 flex items-center text-signoz_robin-400">
                    ${TRACES_AND_LOGS_PRICES[tracesRetentionPeriod]}/GB
                  </div>
                  <div className="col-span-1 flex items-center">
                    <select
                      className="block h-[32px] w-full rounded-sm border border-signoz_slate-400 bg-signoz_ink-400 p-1 text-xs text-signoz_vanilla-100"
                      value={tracesRetentionPeriod}
                      onChange={(e) => setTracesRetentionPeriod(Number(e.target.value))}
                    >
                      {RETENTION_PERIOD.TRACES_AND_LOGS.map((option, idx) => (
                        <option key={`traces-desk-${option.days}-${idx}`} value={option.days}>
                          {`${option.days} days`}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="col-span-1 flex items-center">
                    {renderSlider(
                      tracesValue,
                      handleChangeTraces,
                      'secondary',
                      '0GB',
                      '200TB',
                      formatBytes,
                      'signoz_robin-500'
                    )}
                  </div>
                  <div className="col-span-1 flex items-center justify-end text-signoz_vanilla-400">
                    {formatBytes(linearToLog(tracesValue, MIN_VALUE, MAX_VALUE))}
                  </div>
                  <div className="col-span-1 flex items-center justify-end pr-2">
                    ${formatNumber(tracesSubtotal)}
                  </div>
                </div>

                {/* Logs row */}
                <div className="col-span-6 grid grid-cols-6 gap-4 bg-signoz_ink-400 bg-opacity-5 py-4">
                  <div className="col-span-1 flex items-center gap-2 pl-2">
                    <img src="/img/index_features/logs.svg" alt="Logs Icon" className="h-5 w-5" />
                    <span>Logs</span>
                  </div>
                  <div className="col-span-1 flex items-center text-signoz_sakura-400">
                    ${TRACES_AND_LOGS_PRICES[logsRetentionPeriod]}/GB
                  </div>
                  <div className="col-span-1 flex items-center">
                    <select
                      className="block h-[32px] w-full rounded-sm border border-signoz_slate-400 bg-signoz_ink-400 p-1 text-xs text-signoz_vanilla-100"
                      value={logsRetentionPeriod}
                      onChange={(e) => setLogsRetentionPeriod(Number(e.target.value))}
                    >
                      {RETENTION_PERIOD.TRACES_AND_LOGS.map((option, idx) => (
                        <option key={`logs-desk-${option.days}-${idx}`} value={option.days}>
                          {`${option.days} days`}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="col-span-1 flex items-center">
                    {renderSlider(
                      logsValue,
                      handleChangeLogs,
                      'danger',
                      '0GB',
                      '200TB',
                      formatBytes,
                      'signoz_sakura-500'
                    )}
                  </div>
                  <div className="col-span-1 flex items-center justify-end text-signoz_vanilla-400">
                    {formatBytes(linearToLog(logsValue, MIN_VALUE, MAX_VALUE))}
                  </div>
                  <div className="col-span-1 flex items-center justify-end pr-2">
                    ${formatNumber(logsSubtotal)}
                  </div>
                </div>

                {/* Metrics row */}
                <div className="col-span-6 grid grid-cols-6 gap-4 bg-signoz_ink-400 bg-opacity-5 py-4">
                  <div className="col-span-1 flex items-center gap-2 pl-2">
                    <img
                      src="/img/index_features/bar-chart-2.svg"
                      alt="Metrics Icon"
                      className="h-5 w-5"
                    />
                    <span>Metrics</span>
                  </div>
                  <div className="col-span-1 flex items-center text-signoz_amber-400">
                    ${METRICS_PRICES[metricsRetentionPeriod]}/mn samples
                  </div>
                  <div className="col-span-1 flex items-center">
                    <select
                      className="block h-[32px] w-full rounded-sm border border-signoz_slate-400 bg-signoz_ink-400 p-1 text-xs text-signoz_vanilla-100"
                      value={metricsRetentionPeriod}
                      onChange={(e) => setMetricsRetentionPeriod(Number(e.target.value))}
                    >
                      {RETENTION_PERIOD.METRICS.map((option, idx) => (
                        <option key={`metrics-desk-${option.months}-${idx}`} value={option.months}>
                          {`${option.months} ${option.months === 1 ? 'month' : 'months'}`}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="col-span-1 flex items-center">
                    {renderSlider(
                      metricsValue,
                      handleChangeMetrics,
                      'warning',
                      '0M',
                      '200B',
                      formatMetrics,
                      'signoz_amber-500'
                    )}
                  </div>
                  <div className="col-span-1 flex items-center justify-end text-signoz_vanilla-400">
                    {formatMetrics(linearToLog(metricsValue, MIN_VALUE, MAX_VALUE))}
                  </div>
                  <div className="col-span-1 flex items-center justify-end pr-2">
                    ${formatNumber(metricsSubtotal)}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Total estimate - always shown */}
      <div className="button-background mt-6 flex items-center justify-between rounded-md px-3 py-4 pt-4">
        <span className="text-base font-medium text-signoz_vanilla-100">Monthly estimate</span>
        <div className="w-[45%] border-b border-dashed border-signoz_slate-400"></div>
        <div className="text-xl font-bold text-signoz_vanilla-100">
          ${formatNumber(totalEstimate)}
        </div>
      </div>

      {/* High volume message when applicable */}
      {isHighVolume && (
        <div className="mt-4 rounded-md border border-dashed border-signoz_robin-500 bg-signoz_robin-500/10 p-3 text-center">
          <span className="text-sm font-medium text-signoz_robin-400">
            For high volume usage, reach out to us for custom pricing and retention options
          </span>
        </div>
      )}
    </div>
  )
}

export default PricingCalculator
