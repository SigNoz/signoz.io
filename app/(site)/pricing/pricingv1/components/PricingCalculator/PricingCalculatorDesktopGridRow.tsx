import Image from 'next/image'
import { METRICS_PRICES, RETENTION_PERIOD, TRACES_AND_LOGS_PRICES } from './constants'
import {
  formatBytes,
  formatMetrics,
  formatNumber,
  formatTracesAndLogsRetentionLabel,
} from './format'
import { PricingCalculatorRangeSlider } from './PricingCalculatorRangeSlider'
import type { SectionState } from './usePricingCalculator'

type DesktopIngestionMode = 'traces' | 'logs' | 'metrics'

const GRID_SLIDER: Record<
  DesktopIngestionMode,
  {
    color: 'secondary' | 'danger' | 'warning'
    minLabel: string
    maxLabel: string
    formatFunc: (n: number) => string
    thumbColor: string
    ariaLabel: string
  }
> = {
  traces: {
    color: 'secondary',
    minLabel: '0GB',
    maxLabel: '100TB',
    formatFunc: formatBytes,
    thumbColor: 'signoz_robin-500',
    ariaLabel: 'Adjust traces ingestion volume',
  },
  logs: {
    color: 'danger',
    minLabel: '0GB',
    maxLabel: '100TB',
    formatFunc: formatBytes,
    thumbColor: 'signoz_sakura-500',
    ariaLabel: 'Adjust logs ingestion volume',
  },
  metrics: {
    color: 'warning',
    minLabel: '0M',
    maxLabel: '100B',
    formatFunc: formatMetrics,
    thumbColor: 'signoz_amber-500',
    ariaLabel: 'Adjust metrics ingestion volume',
  },
}

const GRID_INPUT_BORDER: Record<DesktopIngestionMode, string> = {
  traces:
    'ml-1 w-full border-0 border-b border-signoz_robin-400/50 bg-transparent text-right text-signoz_vanilla-400 outline-none',
  logs: 'ml-1 w-full border-0 border-b border-signoz_sakura-400/50 bg-transparent text-right text-signoz_vanilla-400 outline-none',
  metrics:
    'ml-1 w-full border-0 border-b border-signoz_amber-400/50 bg-transparent text-right text-signoz_vanilla-400 outline-none',
}

const USAGE_UNIT: Record<DesktopIngestionMode, string> = {
  traces: 'GB',
  logs: 'GB',
  metrics: 'mn',
}

interface PricingCalculatorDesktopGridRowProps {
  mode: DesktopIngestionMode
  /** Resolved URL from `*.svg?url` */
  icon: string
  iconAlt: string
  label: string
  state: SectionState
}

/**
 * One grid row (six columns) for the desktop pricing table so traces/logs/metrics stay in sync.
 */
export const PricingCalculatorDesktopGridRow: React.FC<PricingCalculatorDesktopGridRowProps> = ({
  mode,
  icon,
  iconAlt,
  label,
  state,
}) => {
  const slider = GRID_SLIDER[mode]

  const priceCell =
    mode === 'metrics' ? (
      <div className="metrics-background col-start-2 flex items-center gap-1">
        <span className="text-base font-medium text-signoz_amber-400">
          ${METRICS_PRICES[state.retentionPeriod]}
        </span>
        /mn samples
      </div>
    ) : (
      <div className="metrics-background col-start-2 flex items-center gap-1">
        <span
          className={`text-base font-medium ${
            mode === 'traces' ? 'text-signoz_robin-400' : 'text-signoz_sakura-400'
          }`}
        >
          ${TRACES_AND_LOGS_PRICES[state.retentionPeriod]}
        </span>
        /GB
      </div>
    )

  return (
    <>
      <div className="metrics-background col-start-1 flex items-center gap-2 p-2">
        <Image src={icon} alt={iconAlt} width={20} height={20} className="h-5 w-5" />
        <span>{label}</span>
      </div>
      {priceCell}
      <div className="metrics-background col-start-3 flex items-center">
        <select
          className="block h-[28px] w-20 rounded-sm border border-signoz_slate-400 bg-signoz_ink-400 p-1 text-xs text-signoz_vanilla-100"
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
      <div className="metrics-background col-start-4 flex items-center">
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
      <div className="metrics-background col-start-5 p-2 text-right text-signoz_vanilla-400">
        <div className="flex items-center justify-end">
          <input
            type="number"
            value={state.inputValue}
            onChange={(e) => state.handleInputChange(e.target.value)}
            className={GRID_INPUT_BORDER[mode]}
            min="0"
          />
          <span>{USAGE_UNIT[mode]}</span>
        </div>
      </div>
      <div className="metrics-background col-start-6 p-2 text-right">
        ${formatNumber(state.subtotal)}
      </div>
    </>
  )
}
