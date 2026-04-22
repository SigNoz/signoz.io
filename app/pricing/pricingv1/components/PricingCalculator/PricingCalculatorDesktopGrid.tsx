import { cn } from 'app/lib/utils'
import { METRICS_PRICES, RETENTION_PERIOD, TRACES_AND_LOGS_PRICES } from './constants'
import {
  formatBytes,
  formatMetrics,
  formatNumber,
  formatTracesAndLogsRetentionLabel,
} from './format'
import { PricingCalculatorRangeSlider } from './PricingCalculatorRangeSlider'
import type { Section } from './types'
import type { UsePricingCalculatorReturn } from './usePricingCalculator'

interface PricingCalculatorDesktopGridProps {
  calculator: UsePricingCalculatorReturn
  show?: Section[]
}

export const PricingCalculatorDesktopGrid: React.FC<PricingCalculatorDesktopGridProps> = ({
  calculator,
  show,
}) => {
  const { isSectionVisible, traces, logs, metrics } = calculator

  return (
    <div
      className={cn(
        `grid grid-cols-6 gap-y-3`,
        show?.length === 0 && 'hidden',
        show?.length === 2 && 'grid-rows-3',
        (show?.length === 3 || show?.length === undefined) && 'grid-rows-4'
      )}
    >
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

      {isSectionVisible('traces') && (
        <>
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
              ${TRACES_AND_LOGS_PRICES[traces.retentionPeriod]}
            </span>
            /GB
          </div>
          <div className="metrics-background col-start-3 flex items-center">
            <select
              className="block h-[28px] w-20 rounded-sm border border-signoz_slate-400 bg-signoz_ink-400 p-1 text-xs text-signoz_vanilla-100"
              value={traces.retentionPeriod}
              onChange={(e) => traces.setRetentionPeriod(Number(e.target.value))}
            >
              {RETENTION_PERIOD.TRACES_AND_LOGS.map((option, idx) => (
                <option key={`traces-${option.days}-${idx}`} value={option.days}>
                  {`${formatTracesAndLogsRetentionLabel(option.days)}`}
                </option>
              ))}
            </select>
          </div>
          <div className="metrics-background col-start-4 flex items-center">
            <PricingCalculatorRangeSlider
              value={traces.sliderValue}
              onChange={traces.handleChange}
              color="secondary"
              minLabel="0GB"
              maxLabel="100TB"
              formatFunc={formatBytes}
              thumbColor="signoz_robin-500"
              ariaLabel="Adjust traces ingestion volume"
              inputValue={traces.inputValue}
            />
          </div>
          <div className="metrics-background col-start-5 p-2 text-right text-signoz_vanilla-400">
            <div className="flex items-center justify-end">
              <input
                type="number"
                value={traces.inputValue}
                onChange={(e) => traces.handleInputChange(e.target.value)}
                className="ml-1 w-full border-0 border-b border-signoz_robin-400/50 bg-transparent text-right text-signoz_vanilla-400 outline-none"
                min="0"
              />
              <span>GB</span>
            </div>
          </div>
          <div className="metrics-background col-start-6 p-2 text-right">
            ${formatNumber(traces.subtotal)}
          </div>
        </>
      )}

      {isSectionVisible('logs') && (
        <>
          {/* Logs Row */}
          <div className="metrics-background col-start-1 flex items-center gap-2 p-2">
            <img src="/img/index_features/logs.svg" alt="Logs Icon" className="h-5 w-5" />
            <span>Logs</span>
          </div>
          <div className="metrics-background col-start-2 flex items-center gap-1">
            <span className="text-base font-medium text-signoz_sakura-400">
              ${TRACES_AND_LOGS_PRICES[logs.retentionPeriod]}
            </span>
            /GB
          </div>
          <div className="metrics-background col-start-3 flex items-center">
            <select
              className="block h-[28px] w-20 rounded-sm border border-signoz_slate-400 bg-signoz_ink-400 p-1 text-xs text-signoz_vanilla-100"
              value={logs.retentionPeriod}
              onChange={(e) => logs.setRetentionPeriod(Number(e.target.value))}
            >
              {RETENTION_PERIOD.TRACES_AND_LOGS.map((option, idx) => (
                <option key={`logs-${option.days}-${idx}`} value={option.days}>
                  {`${formatTracesAndLogsRetentionLabel(option.days)}`}
                </option>
              ))}
            </select>
          </div>
          <div className="metrics-background col-start-4 flex items-center">
            <PricingCalculatorRangeSlider
              value={logs.sliderValue}
              onChange={logs.handleChange}
              color="danger"
              minLabel="0GB"
              maxLabel="100TB"
              formatFunc={formatBytes}
              thumbColor="signoz_sakura-500"
              ariaLabel="Adjust logs ingestion volume"
              inputValue={logs.inputValue}
            />
          </div>
          <div className="metrics-background col-start-5 p-2 text-right text-signoz_vanilla-400">
            <div className="flex items-center justify-end">
              <input
                type="number"
                value={logs.inputValue}
                onChange={(e) => logs.handleInputChange(e.target.value)}
                className="ml-1 w-full border-0 border-b border-signoz_sakura-400/50 bg-transparent text-right text-signoz_vanilla-400 outline-none"
                min="0"
              />
              <span>GB</span>
            </div>
          </div>
          <div className="metrics-background col-start-6 p-2 text-right">
            ${formatNumber(logs.subtotal)}
          </div>
        </>
      )}

      {isSectionVisible('metrics') && (
        <>
          {/* Metrics Row */}
          <div className="metrics-background col-start-1 flex items-center gap-2 p-2">
            <img src="/img/index_features/bar-chart-2.svg" alt="Metrics Icon" className="h-5 w-5" />
            <span>Metrics</span>
          </div>
          <div className="metrics-background col-start-2 flex items-center gap-1">
            <span className="text-base font-medium text-signoz_amber-400">
              ${METRICS_PRICES[metrics.retentionPeriod]}
            </span>
            /mn samples
          </div>
          <div className="metrics-background col-start-3 flex items-center">
            <select
              className="block h-[28px] w-20 rounded-sm border border-signoz_slate-400 bg-signoz_ink-400 p-1 text-xs text-signoz_vanilla-100"
              value={metrics.retentionPeriod}
              onChange={(e) => metrics.setRetentionPeriod(Number(e.target.value))}
            >
              {RETENTION_PERIOD.METRICS.map((option, idx) => (
                <option key={`metrics-${option.months}-${idx}`} value={option.months}>
                  {`${option.months} ${option.months === 1 ? 'month' : 'months'}`}
                </option>
              ))}
            </select>
          </div>
          <div className="metrics-background col-start-4 flex items-center">
            <PricingCalculatorRangeSlider
              value={metrics.sliderValue}
              onChange={metrics.handleChange}
              color="warning"
              minLabel="0M"
              maxLabel="100B"
              formatFunc={formatMetrics}
              thumbColor="signoz_amber-500"
              ariaLabel="Adjust metrics ingestion volume"
              inputValue={metrics.inputValue}
            />
          </div>
          <div className="metrics-background col-start-5 p-2 text-right text-signoz_vanilla-400">
            <div className="flex items-center justify-end">
              <input
                type="number"
                value={metrics.inputValue}
                onChange={(e) => metrics.handleInputChange(e.target.value)}
                className="ml-1 w-full border-0 border-b border-signoz_amber-400/50 bg-transparent text-right text-signoz_vanilla-400 outline-none"
                min="0"
              />
              <span>mn</span>
            </div>
          </div>
          <div className="metrics-background col-start-6 p-2 text-right">
            ${formatNumber(metrics.subtotal)}
          </div>
        </>
      )}
    </div>
  )
}
