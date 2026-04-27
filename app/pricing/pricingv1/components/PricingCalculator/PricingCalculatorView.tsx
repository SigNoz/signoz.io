'use client'

import { Card } from '@/components/ui/Card'
import { PricingCalculatorDesktopGrid } from './PricingCalculatorDesktopGrid'
import { PricingCalculatorDesktopSingle } from './PricingCalculatorDesktopSingle'
import { PricingCalculatorHeader } from './PricingCalculatorHeader'
import { PricingCalculatorMobile } from './PricingCalculatorMobile'
import { PricingCalculatorSummary } from './PricingCalculatorSummary'
import type { PricingCalculatorProps } from './types'
import { usePricingCalculator } from './usePricingCalculator'

const PricingCalculatorView: React.FC<PricingCalculatorProps> = ({
  show,
  showHeader = true,
  showFooter = true,
  embedded = false,
}) => {
  const calculator = usePricingCalculator({ show, embedded })
  const { isMounted, isMobile, showCopiedToast, copyLinkToClipboard, shareWithTeam } = calculator

  return (
    <Card className={`${show?.length === 1 || embedded ? `p-0 md:p-0 [&>div]:border-0` : ''}`}>
      <div
        id="estimate-your-monthly-bill"
        className={`p-3 md:p-4 ${show?.length === 1 || embedded ? '!p-0 md:!p-0' : ''}`}
      >
        {showHeader && (
          <PricingCalculatorHeader
            isMounted={isMounted}
            showCopiedToast={showCopiedToast}
            copyLinkToClipboard={copyLinkToClipboard}
            shareWithTeam={shareWithTeam}
          />
        )}

        {isMobile ? (
          <PricingCalculatorMobile calculator={calculator} />
        ) : (
          <>
            {show?.length === 1 ? (
              <PricingCalculatorDesktopSingle calculator={calculator} />
            ) : (
              <PricingCalculatorDesktopGrid calculator={calculator} show={show} />
            )}
          </>
        )}

        <PricingCalculatorSummary
          show={show}
          showFooter={showFooter}
          totalEstimate={calculator.totalEstimate}
          isHighVolume={calculator.isHighVolume}
        />
      </div>
    </Card>
  )
}

export default PricingCalculatorView
