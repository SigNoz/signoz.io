import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import Button from '@/components/ui/Button'
import TrackingLink from '@/components/TrackingLink'
import SectionLayout from '../SectionLayout'
import TestimonialCards from '../TestimonialCard'
import { CustomerStoriesSectionProps } from './CustomerStoriesSection.types'

const CustomerStoriesSection: React.FC<CustomerStoriesSectionProps> = ({
  tracking,
  showOverlay = true,
  showFeaturedCaseStudy = true,
}) => {
  const sectionClassName = showOverlay
    ? 'relative mx-auto max-w-8xl overflow-hidden border !border-b-0 !border-t-0 border-dashed border-border bg-blur-ellipse-388'
    : 'relative mx-auto max-w-8xl overflow-hidden border !border-b-0 !border-t-0 border-dashed border-border'

  return (
    <>
      <section className={sectionClassName}>
        {showOverlay && (
          <div className="from-muted via-muted/50 to-background dark:from-ink-500/50 dark:via-ink-500/25 dark:to-ink-500/90 pointer-events-none absolute inset-0 bg-gradient-to-b" />
        )}

        {showFeaturedCaseStudy && (
          <div className="relative">
            <div className="container pb-16">
              <div className="flex flex-col gap-6 py-32">
                <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
                  <div className="text-foreground dark:text-sienna-100 flex flex-col items-center gap-12 text-2xl font-medium">
                    <Image
                      src="/img/case_study/logos/shaped-logo.svg"
                      alt="Shaped"
                      width={100}
                      height={100}
                      className="invert dark:invert-0"
                    />
                    Every single time we have an issue, SigNoz is always the first place to check.
                    It was super straightforward to migrate - just updating the exporter
                    configuration, basically three lines of code.
                    <span className="text-muted-foreground text-sm">
                      <span className="text-foreground font-semibold">Karl Lyons</span> <br />{' '}
                      Senior SRE, Shaped
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>

      <SectionLayout variant="bordered" className="!mx-auto p-0 max-md:-mb-[3rem]">
        <div className="container pb-16">
          <TestimonialCards excludeLastCard={!showOverlay} />

          <div
            className={
              showOverlay
                ? 'from-background dark:from-ink-500 relative z-5 -mt-[25rem] flex h-[25rem] items-end justify-center bg-gradient-to-t to-transparent py-6 max-md:py-16'
                : 'flex items-center justify-center py-6 max-md:py-16'
            }
          >
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
