import SectionLayout from '../SectionLayout'
import PricingCalculator from 'app/pricing/pricingv1/components/PricingCalculator'
import { Card } from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import { ArrowRight } from 'lucide-react'
import { Section } from 'app/pricing/pricingv1/components/PricingCalculator'

const UsageBasedPricing: React.FC<{
  show: Section[]
  sectionTitle?: string
  sectionDescription?: string | React.ReactNode
}> = ({
  show,
  sectionTitle = 'Pricing you can trust',
  sectionDescription = "Tired of Datadog's unpredictable bills or New Relic's user-based pricing?\nWe're here for you.",
}) => {
  return (
    <SectionLayout
      variant="bordered"
      className="!border-b-1 !border-t-1 border-dashed border-signoz_slate-400 !px-0"
    >
      <div className="flex flex-col sm:flex-row">
        <div className="!w-[100%] flex-1 md:!w-[300px]">
          <p className="sticky top-[100px] px-10 pt-10 text-4xl font-bold !leading-[3.5rem] text-signoz_vanilla-100 sm:text-[44px] md:px-0 md:pl-12">
            Simple
            <br /> usage-based <br /> pricing
          </p>
        </div>
        <div className="flex-[2_2_0%]">
          <div className="border-b border-l border-dashed border-signoz_slate-400 bg-transparent p-0">
            <div className="flex flex-col gap-2 px-10 py-10">
              <div className="text-2xl font-semibold text-signoz_vanilla-100">{sectionTitle}</div>
              <p className="text-base font-normal text-signoz_vanilla-400">{sectionDescription}</p>
              <div className="[&>div]:border-0 [&>div]:bg-transparent">
                <PricingCalculator
                  show={show}
                  showHeader={false}
                  showFooter={false}
                  embedded={true}
                />
              </div>
              <Card className="bg-transparent p-0 [&>div]:border-0">
                <div className="flex items-center justify-between gap-4 rounded-lg bg-signoz_robin-500/10 p-4">
                  <span className="text-signoz_robin-400">Calculate your exact monthly bill</span>
                  <Button
                    variant="default"
                    rounded="full"
                    className="flex-center !w-fit"
                    to="/pricing/"
                  >
                    Check Pricing
                    <ArrowRight size={14} />
                  </Button>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </SectionLayout>
  )
}

export default UsageBasedPricing
