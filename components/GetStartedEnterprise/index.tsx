'use client'

import Button from '@/components/Button/Button'
import { Cloud, CloudUpload, Server } from 'lucide-react'
import Link from 'next/link'

export const GetStartedEnterprise = () => {
  const getStartedId = `btn-get-started-enterprise-bottom`
  const readDocumentationId = `btn-read-documentation-enterprise-bottom`

  return (
    <div className="bg-[width:50%] bg-[url('/img/background_blur/Frame_2185.png')] bg-[length:55%] bg-[center_top_4rem] sm:bg-no-repeat">
      <section className="!mx-auto !w-[100vw] border !border-b-0 border-dashed border-signoz_slate-400 md:!w-[80vw]">
        <div className="bg-[url('/img/background_blur/Ellipse_206.png')] bg-[center_top_calc(-250px)] bg-no-repeat">
          <div className="flex flex-col gap-16">
            <div className="flex flex-col gap-12">
              <p className="mb-0 mt-20 text-center text-4xl font-bold">
                Sign up for <br /> SigNoz Enterprise
              </p>
              <div className="flex items-center justify-center gap-3 pt-4 max-sm:flex-col">
                <Button id={getStartedId} className="gap-2">
                  <Cloud size={16} />
                  <Link href="/enterprise-cloud" className="flex-center gap-8">
                    Enterprise Cloud
                  </Link>
                </Button>

                <Button type={Button.TYPES.SECONDARY} id={readDocumentationId} className="gap-2">
                  <Server size={16} />
                  <Link href="/enterprise-self-hosted" className="flex-center gap-8">
                    Enterprise Self-Hosted
                  </Link>
                </Button>

                <Button type={Button.TYPES.SECONDARY} id={readDocumentationId} className="gap-2">
                  <CloudUpload size={16} />
                  <Link href="/enterprise-self-hosted" className="flex-center gap-8">
                    Bring your own cloud
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
