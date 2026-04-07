import React from 'react'
import styles from './styles.module.css'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'

export const SignozDatalog = () => {
  return (
    <section>
      <div className="section-container flex h-auto border !border-b-0 !border-r-0 border-dashed border-signoz_slate-400 px-10 py-10">
        <div className="flex w-full flex-col">
          <div>
            <p className="text-2xl font-semibold text-signoz_vanilla-100">
              SigNoz provides up to 9X ROI than DataDog
            </p>
            <p className="text-base font-normal leading-9 text-signoz_vanilla-400">
              You can also set data ingestion limits so you never get a surprise bill.
              <span className="font-medium text-signoz_robin-400">
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
          <img
            src="/img/graphics/homepage/feature-graphic-data-protection-2.webp"
            alt="Bar chart comparing observability costs for small, mid-sized, and large teams"
          />
          <div className="mt-[18px] flex flex-row gap-3"></div>
        </div>
      </div>
    </section>
  )
}
