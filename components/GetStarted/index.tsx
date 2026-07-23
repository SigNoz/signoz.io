import React from 'react'
import Image from 'next/image'
import Button from '@/components/ui/Button'
import { ArrowRight, BookOpen } from 'lucide-react'
import TrackingLink from '@/components/TrackingLink'
import landingThumbnail from '@/public/img/landing/landing_thumbnail.webp'
import { cn } from '../../app/lib/utils'

export const GetStarted = ({
  page,
  className,
  variant = 'default',
  withIcon = false,
}: {
  page: string
  className?: string
  variant?: 'default' | 'homepageRedesign'
  withIcon?: boolean
}) => {
  const getStartedId = `btn-get-started-${page}-bottom`
  const readDocumentationId = `btn-read-documentation-${page}-bottom`
  const isHomepageRedesign = variant === 'homepageRedesign'

  return (
    <>
      <section
        className={cn(
          isHomepageRedesign
            ? 'border-border/35 wide:max-w-8xl wide:px-0 relative left-1/2 mx-auto w-[calc(100dvw-8px)] max-w-none -translate-x-1/2 overflow-hidden border-y px-5 sm:px-6 lg:px-20'
            : 'max-w-8xl border-border mx-auto w-full border !border-b-0 border-dashed',
          className
        )}
      >
        <div className={cn('bg-blur-ellipse-206', isHomepageRedesign && 'max-w-8xl mx-auto')}>
          <div className="flex flex-col gap-16">
            <div className="flex flex-col gap-12">
              <p className="mt-20 mb-0 text-center text-4xl font-bold">
                Slow is the new <br /> downtime.
              </p>
              <div className="flex items-center justify-center gap-3 pt-4 max-sm:flex-col">
                <TrackingLink
                  href="/teams/"
                  className="inline-block"
                  clickType="Primary CTA"
                  clickName="Sign Up Button"
                  clickText="Get Started - Free"
                  clickLocation="Get Started Section"
                >
                  <Button
                    variant="legacyPrimary"
                    as="span"
                    id={getStartedId}
                    className="flex-center"
                    withIcon={withIcon}
                  >
                    Get Started - Free
                    <ArrowRight size={14} />
                  </Button>
                </TrackingLink>

                <TrackingLink
                  href="/docs/introduction/"
                  className="inline-block"
                  clickType="Secondary CTA"
                  clickName="Read Documentation Link"
                  clickText="Read Documentation"
                  clickLocation="Get Started Section"
                  prefetch={false}
                >
                  <Button
                    as="span"
                    variant="legacySecondary"
                    id={readDocumentationId}
                    className="flex-center"
                    withIcon={withIcon}
                  >
                    <BookOpen size={14} />
                    Read Documentation
                  </Button>
                </TrackingLink>
              </div>
            </div>
            <div className="relative flex items-center justify-center">
              <div className="relative -mb-36 aspect-[2400/1194] w-full max-sm:-mb-8 xl:w-3/5">
                <Image
                  src={landingThumbnail}
                  alt="SigNoz dashboard with application performance metrics - Get Started"
                  className="z-[0] rounded-lg"
                  fill
                  loading="lazy"
                  sizes="(max-width: 768px) 100vw, (max-width: 1536px) 60vw, 900px"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
