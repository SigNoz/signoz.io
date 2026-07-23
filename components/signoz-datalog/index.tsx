import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import homepageDataProtectionGraphic2 from '@/public/img/graphics/homepage/feature-graphic-data-protection-2.webp'

export const SignozDatalog = () => {
  return (
    <section>
      <div className="section-container border-border flex h-auto border !border-r-0 !border-b-0 border-dashed !px-10 !py-10">
        <div className="flex w-full flex-col">
          <div>
            <p className="text-l1-foreground text-2xl font-semibold">
              SigNoz provides up to 9X ROI than DataDog
            </p>
            <p className="text-muted-foreground text-base leading-9 font-normal">
              You can also set data ingestion limits so you never get a surprise bill.
              <span className="text-accent-primary font-medium">
                <Link
                  href={
                    'https://signoz.io/blog/pricing-comparison-signoz-vs-datadog-vs-newrelic-vs-grafana/'
                  }
                >
                  &nbsp;Learn more
                  <ArrowUpRight className="inline" size={16} />
                </Link>
              </span>
            </p>
          </div>
          <Image
            src={homepageDataProtectionGraphic2}
            alt="Bar chart comparing observability costs for small, mid-sized, and large teams"
            sizes="(max-width: 768px) 100vw, 80vw"
          />
          <div className="mt-[18px] flex flex-row gap-3"></div>
        </div>
      </div>
    </section>
  )
}
