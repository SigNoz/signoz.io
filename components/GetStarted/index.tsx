import React from 'react'
import Image from 'next/image'
import Button from '@/components/Button/Button'
import { ArrowRight, BookOpen } from 'lucide-react'
import TrackingLink from '@/components/TrackingLink'
import landingThumbnail from '@/public/img/landing/landing_thumbnail.webp'
import { cn } from '../../app/lib/utils'

export const GetStarted = ({ page, className }: { page: string; className?: string }) => {
  const getStartedId = `btn-get-started-${page}-bottom`
  const readDocumentationId = `btn-read-documentation-${page}-bottom`

  return (
    <>
      <section
        className={cn(
          'mx-auto w-full border !border-b-0 border-dashed border-signoz_slate-400 md:w-[80vw]',
          className
        )}
      >
        <div className="bg-blur-ellipse-206">
          <div className="flex flex-col gap-16">
            <div className="flex flex-col gap-12">
              <p className="mb-0 mt-20 text-center text-4xl font-bold">
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
                  <Button id={getStartedId} className="flex-center">
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
                    type={Button.TYPES.SECONDARY}
                    id={readDocumentationId}
                    className="flex-center"
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
