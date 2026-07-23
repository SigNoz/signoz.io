import { MAX_VALUE, METRICS_PRICES, RETENTION_PERIOD, TRACES_AND_LOGS_PRICES } from './constants'
import {
  formatBytes,
  formatMetrics,
  formatNumber,
  formatTracesAndLogsRetentionLabel,
} from './format'
import { PricingCalculatorRangeSlider } from './PricingCalculatorRangeSlider'
import type { SectionState } from './usePricingCalculator'

type MobileIngestionMode = 'traces' | 'logs' | 'metrics'

const MODE_SLIDER = {
  traces: {
    color: 'secondary' as const,
    minLabel: '0GB',
    maxLabel: '100TB',
    formatFunc: formatBytes,
    thumbColor: 'robin-500' as const,
    ariaLabel: 'Adjust traces ingestion volume',
  },
  logs: {
    color: 'danger' as const,
    minLabel: '0GB',
    maxLabel: '100TB',
    formatFunc: formatBytes,
    thumbColor: 'sakura-500' as const,
    ariaLabel: 'Adjust logs ingestion volume',
  },
  metrics: {
    color: 'warning' as const,
    minLabel: '0M',
    maxLabel: '100B',
    formatFunc: formatMetrics,
    thumbColor: 'amber-500' as const,
    ariaLabel: 'Adjust metrics ingestion volume',
  },
}

const INPUT_BORDER: Record<MobileIngestionMode, string> = {
  traces:
    ' w-full border-0 border-b border-accent-primary/50 bg-transparent text-right text-muted-foreground outline-none',
  logs: ' w-full border-0 border-b border-sakura-400/50 bg-transparent text-right text-muted-foreground outline-none',
  metrics:
    'w-full border-0 border-b border-warning-background/50 bg-transparent text-right text-muted-foreground outline-none',
}

const USAGE_UNIT: Record<MobileIngestionMode, string> = {
  traces: 'GB',
  logs: 'GB',
  metrics: 'mn',
}

interface PricingCalculatorMobileIngestionSectionProps {
  mode: MobileIngestionMode
  state: SectionState
}

/**
 * Single layout for the traces, logs, and metrics calculator panels (mobile).
 * Kept in one place so copy and behavior stay aligned across the three sections.
 */
export const PricingCalculatorMobileIngestionSection: React.FC<
  PricingCalculatorMobileIngestionSectionProps
> = ({ mode, state }) => {
  const slider = MODE_SLIDER[mode]

  const priceBlock =
    mode === 'metrics' ? (
      <div className="text-callout-warning-title">
        ${METRICS_PRICES[state.retentionPeriod]}/mn samples
      </div>
    ) : (
      <div className={mode === 'traces' ? 'text-accent-primary' : 'text-sakura-400'}>
        ${TRACES_AND_LOGS_PRICES[state.retentionPeriod]}/GB
      </div>
    )

  return (
    <div className="data-section bg-card bg-opacity-5 rounded-md px-3 pt-6 pb-4">
      <div className="mb-4 flex justify-between">
        <span className="text-muted-foreground text-xs font-semibold uppercase">
          Price per unit
        </span>
        <span className="text-muted-foreground text-xs font-semibold uppercase">Retention</span>
      </div>

      <div className="mb-6 flex justify-between">
        {priceBlock}
        <select
          className="border-border bg-card text-l1-foreground block h-[32px] w-32 rounded-sm border py-1.5 pr-1.5 pl-2 text-xs"
          value={state.retentionPeriod}
          onChange={(e) => state.setRetentionPeriod(Number(e.target.value))}
        >
          {mode === 'metrics'
            ? RETENTION_PERIOD.METRICS.map((option, idx) => (
                <option key={`metrics-${option.months}-${idx}`} value={option.months}>
                  {`${option.months} ${option.months === 1 ? 'month' : 'months'}`}
                </option>
              ))
            : RETENTION_PERIOD.TRACES_AND_LOGS.map((option, idx) => (
                <option key={`${mode}-${option.days}-${idx}`} value={option.days}>
                  {`${formatTracesAndLogsRetentionLabel(option.days)}`}
                </option>
              ))}
        </select>
      </div>

      <div className="mb-2">
        <span className="text-muted-foreground text-xs font-semibold uppercase">
          Scale of ingestion (per month)
        </span>
        <div className="mt-4">
          <PricingCalculatorRangeSlider
            value={state.sliderValue}
            onChange={state.handleChange}
            color={slider.color}
            minLabel={slider.minLabel}
            maxLabel={slider.maxLabel}
            formatFunc={slider.formatFunc}
            thumbColor={slider.thumbColor}
            ariaLabel={slider.ariaLabel}
            inputValue={state.inputValue}
          />
        </div>
      </div>

      <div className="mt-10 mb-4 flex justify-between uppercase">
        <span className="text-muted-foreground text-xs font-semibold">Estimated usage</span>
        <span className="text-muted-foreground text-xs font-semibold">Subtotal</span>
      </div>
      <div className="mb-2 flex items-center justify-between">
        <div className="flex items-center">
          <input
            type="number"
            value={state.inputValue}
            onChange={(e) => state.handleInputChange(e.target.value)}
            className={INPUT_BORDER[mode]}
            min="0"
            max={MAX_VALUE.toString()}
          />
          <span className="text-muted-foreground text-base">{USAGE_UNIT[mode]}</span>
        </div>
        <div className="border-border w-[45%] border-b border-dashed"></div>
        <span className="text-l1-foreground text-base font-medium">
          ${formatNumber(state.subtotal)}
        </span>
      </div>
    </div>
  )
}
