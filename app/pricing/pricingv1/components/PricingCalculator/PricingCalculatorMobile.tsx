import Button from '@/components/ui/Button'
import { DraftingCompass, LogsIcon, MetricsIcon } from './icons'
import { PricingCalculatorMobileIngestionSection } from './PricingCalculatorMobileIngestionSection'
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
        <PricingCalculatorMobileIngestionSection mode="traces" state={traces} />
      )}

      {isSectionVisible('logs') && activeTab === 'logs' && (
        <PricingCalculatorMobileIngestionSection mode="logs" state={logs} />
      )}

      {isSectionVisible('metrics') && activeTab === 'metrics' && (
        <PricingCalculatorMobileIngestionSection mode="metrics" state={metrics} />
      )}
    </div>
  )
}
