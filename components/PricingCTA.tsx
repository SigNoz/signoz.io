'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, CheckCircle } from 'lucide-react'

interface PricingCTAProps {
  concise?: boolean
}

const PricingCTA: React.FC<PricingCTAProps> = ({ concise = false }) => {
  if (concise) {
    return (
      <div className="my-4 w-full">
        <div className="border-border bg-card transform rounded-xl border p-6 shadow-lg transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-xl">
          <div className="space-y-4">
            <h3 className="text-l1-foreground my-0 text-xl font-bold">
              Tired of Unpredictable Pricing with DataDog?
            </h3>
            <p className="text-muted-foreground text-sm">
              SigNoz offers up to 9X ROI compared to DataDog with simple, transparent pricing:
            </p>

            <div className="relative">
              <Image
                src="/img/graphics/homepage/feature-graphic-data-protection-2.webp"
                alt="SigNoz Pricing Comparison"
                width={250}
                height={140}
                layout="responsive"
                className="rounded-md"
              />
              <div className="bg-danger text-primary-foreground absolute -top-2 -right-2 rounded-full px-2 py-0.5 text-xs font-bold shadow-md">
                Save up to 90%
              </div>
            </div>

            <div className="mt-4">
              <Link
                href="https://signoz.io/pricing/#estimate-your-monthly-bill"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-primary text-primary-foreground hover:bg-primary/90 inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium no-underline transition duration-150 ease-in-out"
                prefetch={false}
              >
                Calculate Your Savings with SigNoz Now <ArrowRight size={14} className="ml-1" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="my-8 w-full">
      <div className="border-border bg-card transform rounded-xl border p-8 shadow-lg transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-xl">
        <div className="space-y-4">
          <h3 className="text-l1-foreground my-0 text-2xl font-bold">
            Tired of Unpredictable Pricing with DataDog?
          </h3>
          <p className="text-muted-foreground">
            SigNoz offers up to 9X ROI compared to DataDog with simple, transparent pricing:
          </p>

          <div className="flex flex-col gap-6 md:flex-row">
            <div className="flex-1">
              <ul className="space-y-2 pl-0">
                {[
                  'No user-based pricing',
                  'No host (container or nodes) based pricing',
                  'Simple usage-based pricing',
                  'No special pricing for custom metrics',
                ].map((item, index) => (
                  <li key={index} className="text-muted-foreground flex items-center">
                    <CheckCircle
                      className="text-callout-success-title mr-2 flex-shrink-0"
                      size={16}
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="hidden flex-1 md:block">
              <div className="relative">
                <Image
                  src="/img/graphics/homepage/feature-graphic-data-protection-2.webp"
                  alt="SigNoz Pricing Comparison"
                  width={350}
                  height={195}
                  layout="responsive"
                  className="rounded-md"
                />
                <div className="bg-danger text-primary-foreground absolute -top-3 -right-3 rounded-full px-3 py-1 text-xs font-bold shadow-md">
                  Save up to 90%
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 flex">
            <Link
              href="https://signoz.io/pricing/#estimate-your-monthly-bill"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-primary text-primary-foreground hover:bg-primary/90 inline-flex items-center justify-center rounded-md px-6 py-2 text-base font-medium no-underline transition duration-150 ease-in-out"
              prefetch={false}
            >
              Calculate Your Savings with SigNoz Now <ArrowRight size={16} className="ml-2" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PricingCTA
