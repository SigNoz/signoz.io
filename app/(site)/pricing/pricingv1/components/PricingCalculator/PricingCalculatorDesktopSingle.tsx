import { METRICS_PRICES, RETENTION_PERIOD, TRACES_AND_LOGS_PRICES } from './constants'
import {
  formatBytes,
  formatMetrics,
  formatNumber,
  formatTracesAndLogsRetentionLabel,
} from './format'
import { DraftingCompass, LogsIcon, MetricsIcon } from './icons'
import { PricingCalculatorRangeSlider } from './PricingCalculatorRangeSlider'
import type { UsePricingCalculatorReturn } from './usePricingCalculator'

interface PricingCalculatorDesktopSingleProps {
  calculator: UsePricingCalculatorReturn
}

export const PricingCalculatorDesktopSingle: React.FC<PricingCalculatorDesktopSingleProps> = ({
  calculator,
}) => {
  const { isSectionVisible, traces, logs, metrics } = calculator

  return (
    <div className="space-y-6">
      {/* Header section with icon, pricing, estimated usage, and subtotal */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {isSectionVisible('traces') && (
            <>
              <DraftingCompass isActive={true} />
              <span className="text-md font-medium text-signoz_vanilla-100">Traces</span>
            </>
          )}
          {isSectionVisible('logs') && (
            <>
              <LogsIcon isActive={true} />
              <span className="text-md font-medium text-signoz_vanilla-100">Logs</span>
            </>
          )}
          {isSectionVisible('metrics') && (
            <>
              <MetricsIcon isActive={true} />
              <span className="text-md font-medium text-signoz_vanilla-100">Metrics</span>
            </>
          )}
          <span className="text-md font-medium text-signoz_robin-400">
            $
            {isSectionVisible('metrics')
              ? METRICS_PRICES[metrics.retentionPeriod]
              : TRACES_AND_LOGS_PRICES[
                  isSectionVisible('traces') ? traces.retentionPeriod : logs.retentionPeriod
                ]}{' '}
            / {isSectionVisible('metrics') ? 'mn samples' : 'GB'}
          </span>
        </div>
        <div className="flex items-center gap-8">
          <div className="text-center">
            <div className="text-xs font-semibold uppercase text-signoz_vanilla-400">
              ESTIMATED USAGE
            </div>
            <div className="text-md font-medium text-signoz_vanilla-100">
              {isSectionVisible('traces') && `${formatNumber(Number(traces.inputValue))} GB`}
              {isSectionVisible('logs') && `${formatNumber(Number(logs.inputValue))} GB`}
              {isSectionVisible('metrics') && `${formatNumber(Number(metrics.inputValue))} mn`}
            </div>
          </div>
          <div className="text-center">
            <div className="text-xs font-semibold uppercase text-signoz_vanilla-400">SUBTOTAL</div>
            <div className="text-md font-medium text-signoz_vanilla-100">
              $
              {formatNumber(
                isSectionVisible('traces')
                  ? traces.subtotal
                  : isSectionVisible('logs')
                    ? logs.subtotal
                    : metrics.subtotal
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Configuration section */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div>
            <div className="mb-2 text-xs font-semibold uppercase text-signoz_vanilla-400">
              RETENTION
            </div>
            <select
              className="block h-8 w-32 rounded-sm border border-signoz_slate-400 bg-signoz_ink-400 py-1.5 pl-2 pr-1.5 text-sm text-signoz_vanilla-100"
              value={
                isSectionVisible('traces')
                  ? traces.retentionPeriod
                  : isSectionVisible('logs')
                    ? logs.retentionPeriod
                    : metrics.retentionPeriod
              }
              onChange={(e) => {
                const value = Number(e.target.value)
                if (isSectionVisible('traces')) traces.setRetentionPeriod(value)
                else if (isSectionVisible('logs')) logs.setRetentionPeriod(value)
                else metrics.setRetentionPeriod(value)
              }}
            >
              {isSectionVisible('traces') || isSectionVisible('logs')
                ? RETENTION_PERIOD.TRACES_AND_LOGS.map((option, idx) => (
                    <option
                      key={`${isSectionVisible('traces') ? 'traces' : 'logs'}-${option.days}-${idx}`}
                      value={option.days}
                    >
                      {`${formatTracesAndLogsRetentionLabel(option.days)}`}
                    </option>
                  ))
                : RETENTION_PERIOD.METRICS.map((option, idx) => (
                    <option key={`metrics-${option.months}-${idx}`} value={option.months}>
                      {`${option.months} ${option.months === 1 ? 'month' : 'months'}`}
                    </option>
                  ))}
            </select>
          </div>
        </div>
        <div className="ml-8 max-w-md flex-1">
          <div className="mb-2 text-xs font-semibold uppercase text-signoz_vanilla-400">
            SCALE OF INGESTION
          </div>
          {isSectionVisible('traces') && (
            <PricingCalculatorRangeSlider
              value={traces.sliderValue}
              onChange={traces.handleChange}
              color="secondary"
              minLabel="0 GB"
              maxLabel="500TB"
              formatFunc={formatBytes}
              thumbColor="signoz_robin-500"
              ariaLabel="Adjust traces ingestion volume"
              inputValue={traces.inputValue}
            />
          )}
          {isSectionVisible('logs') && (
            <PricingCalculatorRangeSlider
              value={logs.sliderValue}
              onChange={logs.handleChange}
              color="danger"
              minLabel="0 GB"
              maxLabel="500TB"
              formatFunc={formatBytes}
              thumbColor="signoz_sakura-500"
              ariaLabel="Adjust logs ingestion volume"
              inputValue={logs.inputValue}
            />
          )}
          {isSectionVisible('metrics') && (
            <PricingCalculatorRangeSlider
              value={metrics.sliderValue}
              onChange={metrics.handleChange}
              color="warning"
              minLabel="0M"
              maxLabel="500B"
              formatFunc={formatMetrics}
              thumbColor="signoz_amber-500"
              ariaLabel="Adjust metrics ingestion volume"
              inputValue={metrics.inputValue}
            />
          )}
        </div>
      </div>
    </div>
  )
}
