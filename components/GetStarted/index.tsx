import React from 'react'
import Button from '@/components/Button/Button'
import { ArrowRight, BookOpen } from 'lucide-react'
import Link from 'next/link'

export const GetStarted = ({ page }) => {
  const getStartedId = `btn-get-started-${page}-bottom`
  const readDocumentationId = `btn-read-documentation-${page}-bottom`

  return (
    <div className="bg-[width:50%] bg-[url('/img/background_blur/Frame_2185.png')] bg-[length:55%] bg-[center_top_4rem] sm:bg-no-repeat">
      <section className="!mx-auto !w-[100vw] border !border-b-0 border-dashed border-signoz_slate-400 md:!w-[80vw]">
        <div className="bg-[url('/img/background_blur/Ellipse_206.png')] bg-[center_top_calc(-250px)] bg-no-repeat">
          <div className="flex flex-col gap-16">
            <div className="flex flex-col gap-12">
              <p className="mb-0 mt-20 text-center text-4xl font-bold">
                Slow is the new <br /> downtime.
              </p>
              <div className="flex items-center justify-center gap-3 pt-4 max-sm:flex-col">
                <Button id={getStartedId}>
                  <Link href="/teams/" className="flex-center">
                    Try SigNoz Cloud
                    <ArrowRight size={14} />
                  </Link>
                </Button>

                <Button type={Button.TYPES.SECONDARY} id={readDocumentationId}>
                  <Link href="/docs/introduction/" className="flex-center">
                    <BookOpen size={14} />
                    Read Documentation
                  </Link>
                </Button>
              </div>
            </div>
            <div className="relative flex items-center justify-center">
              <img
                src="/img/landing/landing_thumbnail.webp"
                alt="Custom Thumbnail"
                className="z-[0] -mb-36 w-3/5 rounded-lg max-sm:-mb-8"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
