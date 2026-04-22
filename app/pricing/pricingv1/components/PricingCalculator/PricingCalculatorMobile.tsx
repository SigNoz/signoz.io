import Button from '@/components/ui/Button'
import { MAX_VALUE, METRICS_PRICES, RETENTION_PERIOD, TRACES_AND_LOGS_PRICES } from './constants'
import {
  formatBytes,
  formatMetrics,
  formatNumber,
  formatTracesAndLogsRetentionLabel,
} from './format'
import { DraftingCompass, LogsIcon, MetricsIcon } from './icons'
import { PricingCalculatorRangeSlider } from './PricingCalculatorRangeSlider'
import type { UsePricingCalculatorReturn } from './usePricingCalculator'

interface PricingCalculatorMobileProps {
  calculator: UsePricingCalculatorReturn
}

export const PricingCalculatorMobile: React.FC<PricingCalculatorMobileProps> = ({ calculator }) => {
  const { activeTab, setActiveTab, isSectionVisible, traces, logs, metrics } = calculator

  return (
    <div>
      {/* Tab navigation */}
      <div className="tabs mb-4 flex justify-between gap-2">
        {isSectionVisible('traces') && (
          <Button
            isButton={true}
            variant={'secondary'}
            rounded={'default'}
            className={`w-full bg-transparent hover:bg-transparent ${activeTab === 'traces' ? 'opacity-100' : 'opacity-50'}`}
            onClick={() => setActiveTab('traces')}
          >
            <DraftingCompass isActive={activeTab === 'traces'} />
            Traces
          </Button>
        )}

        {isSectionVisible('logs') && (
          <Button
            isButton={true}
            variant={'secondary'}
            rounded={'default'}
            className={`w-full bg-transparent hover:bg-transparent ${activeTab === 'logs' ? 'opacity-100' : 'opacity-50'}`}
            onClick={() => setActiveTab('logs')}
          >
            <LogsIcon isActive={activeTab === 'logs'} />
            Logs
          </Button>
        )}

        {isSectionVisible('metrics') && (
          <Button
            variant={'secondary'}
            rounded={'default'}
            isButton={true}
            className={`w-full bg-transparent hover:bg-transparent ${activeTab === 'metrics' ? 'opacity-100' : 'opacity-50'}`}
            onClick={() => setActiveTab('metrics')}
          >
            <MetricsIcon isActive={activeTab === 'metrics'} />
            Metrics
          </Button>
        )}
      </div>

      {isSectionVisible('traces') && activeTab === 'traces' && (
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
              ${TRACES_AND_LOGS_PRICES[traces.retentionPeriod]}/GB
            </div>
            <select
              className="block h-[32px] w-32 rounded-sm border border-signoz_slate-400 bg-signoz_ink-400 py-1.5 pl-2 pr-1.5 text-xs text-signoz_vanilla-100"
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

          <div className="mb-2">
            <span className="text-xs font-semibold uppercase text-signoz_vanilla-400">
              Scale of ingestion (per month)
            </span>
            <div className="mt-4">
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
          </div>

          <div className="mb-4 mt-10 flex justify-between uppercase">
            <span className="text-xs font-semibold text-signoz_vanilla-400">Estimated usage</span>
            <span className="text-xs font-semibold text-signoz_vanilla-400">Subtotal</span>
          </div>
          <div className="mb-2 flex items-center justify-between">
            <div className="flex items-center">
              <input
                type="number"
                value={traces.inputValue}
                onChange={(e) => traces.handleInputChange(e.target.value)}
                className=" w-full border-0 border-b border-signoz_robin-400/50 bg-transparent text-right text-signoz_vanilla-400 outline-none"
                min="0"
                max={MAX_VALUE.toString()}
              />
              <span className="text-base text-signoz_vanilla-400">GB</span>
            </div>
            <div className="w-[45%] border-b border-dashed border-signoz_slate-400"></div>
            <span className="text-base font-medium text-signoz_vanilla-100">
              ${formatNumber(traces.subtotal)}
            </span>
          </div>
        </div>
      )}

      {isSectionVisible('logs') && activeTab === 'logs' && (
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
              ${TRACES_AND_LOGS_PRICES[logs.retentionPeriod]}/GB
            </div>
            <select
              className="block h-[32px] w-32 rounded-sm border border-signoz_slate-400 bg-signoz_ink-400 py-1.5 pl-2 pr-1.5 text-xs text-signoz_vanilla-100"
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

          <div className="mb-2">
            <span className="text-xs font-semibold uppercase text-signoz_vanilla-400">
              Scale of ingestion (per month)
            </span>
            <div className="mt-4">
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
          </div>

          <div className="mb-4 mt-10 flex justify-between uppercase">
            <span className="text-xs font-semibold text-signoz_vanilla-400">Estimated usage</span>
            <span className="text-xs font-semibold text-signoz_vanilla-400">Subtotal</span>
          </div>
          <div className="mb-2 flex items-center justify-between">
            <div className="flex items-center">
              <input
                type="number"
                value={logs.inputValue}
                onChange={(e) => logs.handleInputChange(e.target.value)}
                className=" w-full border-0 border-b border-signoz_sakura-400/50 bg-transparent text-right text-signoz_vanilla-400 outline-none"
                min="0"
                max={MAX_VALUE.toString()}
              />
              <span className="text-base text-signoz_vanilla-400">GB</span>
            </div>
            <div className="w-[45%] border-b border-dashed border-signoz_slate-400"></div>
            <span className="text-base font-medium text-signoz_vanilla-100">
              ${formatNumber(logs.subtotal)}
            </span>
          </div>
        </div>
      )}

      {isSectionVisible('metrics') && activeTab === 'metrics' && (
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
              ${METRICS_PRICES[metrics.retentionPeriod]}/mn samples
            </div>
            <select
              className="block h-[32px] w-32 rounded-sm border border-signoz_slate-400 bg-signoz_ink-400 py-1.5 pl-2 pr-1.5 text-xs text-signoz_vanilla-100"
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

          <div className="mb-2">
            <span className="text-xs font-semibold uppercase text-signoz_vanilla-400">
              Scale of ingestion (per month)
            </span>
            <div className="mt-4">
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
          </div>

          <div className="mb-4 mt-10 flex justify-between uppercase">
            <span className="text-xs font-semibold text-signoz_vanilla-400">Estimated usage</span>
            <span className="text-xs font-semibold text-signoz_vanilla-400">Subtotal</span>
          </div>
          <div className="mb-2 flex items-center justify-between">
            <div className="flex items-center">
              <input
                type="number"
                value={metrics.inputValue}
                onChange={(e) => metrics.handleInputChange(e.target.value)}
                className="w-full border-0 border-b border-signoz_amber-400/50 bg-transparent text-right text-signoz_vanilla-400 outline-none"
                min="0"
                max={MAX_VALUE.toString()}
              />
              <span className="text-base text-signoz_vanilla-400">mn</span>
            </div>
            <div className="w-[45%] border-b border-dashed border-signoz_slate-400"></div>
            <span className="text-base font-medium text-signoz_vanilla-100">
              ${formatNumber(metrics.subtotal)}
            </span>
          </div>
        </div>
      )}
    </div>
  )
}
