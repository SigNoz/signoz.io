import SectionLayout from '../SectionLayout'
import PricingCalculator from 'app/(site)/pricing/pricingv1/components/PricingCalculator'
import { Card } from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import { ArrowRight } from 'lucide-react'
import { Section } from 'app/(site)/pricing/pricingv1/components/PricingCalculator'
import Divider from '../Divider'

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
      className="border-border !border-t-1 !border-b-1 border-dashed !px-0"
    >
      <div className="flex flex-col sm:flex-row">
        <div className="!w-[100%] flex-1 md:!w-[300px]">
          <p className="text-l1-foreground sticky top-[100px] px-10 pt-10 text-4xl !leading-[3.5rem] font-bold sm:text-4xl md:px-0 md:pl-12">
            Simple
            <br /> usage-based <br /> pricing
          </p>
        </div>
        <div className="flex-[2_2_0%]">
          <div className="border-border border-l border-dashed bg-transparent p-0">
            <div className="flex flex-col gap-2 px-10 py-10">
              <div className="text-l1-foreground text-2xl font-semibold">{sectionTitle}</div>
              <p className="text-muted-foreground text-base font-normal">{sectionDescription}</p>
              <div className="[&>div]:border-0 [&>div]:bg-transparent">
                <PricingCalculator
                  show={show}
                  showHeader={false}
                  showFooter={false}
                  embedded={true}
                />
              </div>
              <Card className="bg-transparent p-0 [&>div]:border-0">
                <div className="bg-primary/10 flex items-center justify-between gap-4 rounded-lg p-4">
                  <span className="text-accent-primary">Calculate your exact monthly bill</span>
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
