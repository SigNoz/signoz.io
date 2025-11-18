import React from 'react'
import Button from '@/components/ui/Button'
import { BookOpen } from 'lucide-react'
import { ArrowRight } from 'lucide-react'
import Image from 'next/image'

const CTASection = () => {
  return (
    <div className="relative bg-[url('/img/background_blur/Rectangle_959.png')] bg-[length:68%] bg-[center_top_-20rem] sm:bg-no-repeat">
      <div className="bg-[url('/img/background_blur/Frame_2185.png')] bg-[length:68%] bg-[center_top_-20rem] sm:bg-no-repeat">
        <section className="!mx-auto !w-[100vw] border-t border-dashed border-signoz_slate-400 md:!w-[80vw]">
          <div className="bg-[url('/img/background_blur/Ellipse_206.png')] bg-[center_top_calc(-250px)] bg-no-repeat">
            <div className="flex flex-col gap-16">
              <div className="flex flex-col gap-12">
                <h2 className="mb-0 mt-20 text-center font-bold">
                  Get started with <br /> SigNoz Cloud today
                </h2>
                <div className="mx-10 md:absolute md:left-[5%] md:top-[15%] md:z-50 md:mx-0 md:-mb-0 md:mt-0 md:w-1/3">
                  <Image
                    src="/img/events/kubecon-2025/edited-photo.png"
                    alt="Mascot Olly"
                    width={600}
                    height={600}
                    className="object-contain"
                    priority
                  />
                </div>
                <div className="flex items-center justify-center gap-3 pt-4 max-sm:flex-col">
                  <Button to="/teams/" variant={'default'} rounded={'full'}>
                    <span className="flex-center">
                      Sign up for SigNoz
                      <ArrowRight size={14} />
                    </span>
                  </Button>
                  <Button to="/docs/introduction/" variant="secondary" rounded={'full'}>
                    <span className="flex-center">
                      <BookOpen size={14} />
                      Read Documentation
                    </span>
                  </Button>
                </div>
              </div>
              <div className="relative flex items-center justify-center">
                <Image
                  src="/img/landing/landing_thumbnail.webp"
                  alt="Landing Thumbnail"
                  className="z-[0] -mb-24 w-3/5 rounded-lg max-sm:-mb-8"
                  width={10000}
                  height={10000}
                />
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

export default CTASection
