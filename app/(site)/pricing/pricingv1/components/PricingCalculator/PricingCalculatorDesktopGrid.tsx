import { cn } from 'app/lib/utils'
import draftingCompassIconUrl from '@/public/img/index_features/drafting-compass.svg?url'
import logsIconUrl from '@/public/img/index_features/logs.svg?url'
import barChartIconUrl from '@/public/img/index_features/bar-chart-2.svg?url'
import { PricingCalculatorDesktopGridRow } from './PricingCalculatorDesktopGridRow'
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
        <PricingCalculatorDesktopGridRow
          mode="traces"
          icon={draftingCompassIconUrl}
          iconAlt="Traces Icon"
          label="Traces"
          state={traces}
        />
      )}

      {isSectionVisible('logs') && (
        <PricingCalculatorDesktopGridRow
          mode="logs"
          icon={logsIconUrl}
          iconAlt="Logs Icon"
          label="Logs"
          state={logs}
        />
      )}

      {isSectionVisible('metrics') && (
        <PricingCalculatorDesktopGridRow
          mode="metrics"
          icon={barChartIconUrl}
          iconAlt="Metrics Icon"
          label="Metrics"
          state={metrics}
        />
      )}
    </div>
  )
}
