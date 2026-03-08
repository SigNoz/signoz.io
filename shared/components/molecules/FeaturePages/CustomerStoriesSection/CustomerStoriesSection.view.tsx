import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import Button from '@/components/ui/Button'
import TrackingLink from '@/components/TrackingLink'
import SectionLayout from '../SectionLayout'
import TestimonialCards from '../TestimonialCard'
import { CustomerStoriesSectionProps } from './CustomerStoriesSection.types'

const CustomerStoriesSection: React.FC<CustomerStoriesSectionProps> = ({ tracking }) => {
  return (
    <>
      <section className="relative mx-auto w-[100vw] max-w-8xl overflow-hidden border !border-b-0 !border-t-0 border-dashed border-signoz_slate-400 bg-[url('/img/background_blur/Ellipse_388.webp')] bg-[center_top_calc(-78px)] md:w-[80vw]">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-signoz_ink-500/50 via-signoz_ink-500/25 to-signoz_ink-500/90" />

        <div className="relative">
          <div className="container pb-16">
            <div className="flex flex-col gap-6 py-32">
              <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
                <div className="flex flex-col items-center gap-12 text-2xl font-medium leading-[3.25rem] text-signoz_sienna-100">
                  <Image
                    src="/img/case_study/logos/shaped-logo.svg"
                    alt="Shaped"
                    width={100}
                    height={100}
                  />
                  Every single time we have an issue, SigNoz is always the first place to check. It
                  was super straightforward to migrate - just updating the exporter configuration,
                  basically three lines of code.
                  <span className="text-sm text-signoz_vanilla-400">
                    <span className="font-semibold">Karl Lyons</span> <br /> Senior SRE, Shaped
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <SectionLayout variant="bordered" className="!mx-auto p-0 max-md:-mb-[3rem]">
        <div className="container pb-16">
          <TestimonialCards />

          <div className="z-5 relative -mt-[25rem] flex h-96 items-end justify-center bg-gradient-to-t from-signoz_ink-500 to-transparent py-6 max-md:py-16">
            {tracking ? (
              <Button
                variant="secondary"
                rounded="full"
                className="flex items-center gap-2"
                asChild
              >
                <TrackingLink
                  href="/case-study/"
                  clickType="Secondary CTA"
                  clickName={tracking.clickName}
                  clickLocation={tracking.clickLocation}
                  clickText="Read customer stories"
                >
                  Read customer stories
                  <ArrowRight size={14} />
                </TrackingLink>
              </Button>
            ) : (
              <Button
                variant="secondary"
                rounded="full"
                className="flex items-center gap-2"
                to="/case-study/"
              >
                Read customer stories
                <ArrowRight size={14} />
              </Button>
            )}
          </div>
        </div>
      </SectionLayout>
    </>
  )
}

export default CustomerStoriesSection
