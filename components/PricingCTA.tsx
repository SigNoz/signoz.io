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
        <div className="transform rounded-xl bg-gradient-to-r from-gray-800 to-gray-900 p-6 shadow-lg transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-xl">
          <div className="space-y-4">
            <h3 className="my-0 text-xl font-bold text-white">
              Tired of Unpredictable Pricing with DataDog?
            </h3>
            <p className="text-sm text-gray-300">
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
              <div className="absolute -right-2 -top-2 rounded-full bg-red-600 px-2 py-0.5 text-xs font-bold text-white shadow-md">
                Save up to 90%
              </div>
            </div>

            <div className="mt-4">
              <Link
                href="https://signoz.io/pricing/#estimate-your-monthly-bill"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: 'white' }}
                className="inline-flex items-center justify-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white no-underline transition duration-150 ease-in-out hover:bg-blue-700"
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
      <div className="transform rounded-xl bg-gradient-to-r from-gray-800 to-gray-900 p-8 shadow-lg transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-xl">
        <div className="space-y-4">
          <h3 className="my-0 text-2xl font-bold text-white">
            Tired of Unpredictable Pricing with DataDog?
          </h3>
          <p className="text-gray-300">
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
                  <li key={index} className="flex items-center text-gray-300">
                    <CheckCircle className="mr-2 flex-shrink-0 text-green-500" size={16} />
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
                <div className="absolute -right-3 -top-3 rounded-full bg-red-600 px-3 py-1 text-xs font-bold text-white shadow-md">
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
              style={{ color: 'white' }}
              className="inline-flex items-center justify-center rounded-md bg-blue-600 px-6 py-2 text-base font-medium text-white no-underline transition duration-150 ease-in-out hover:bg-blue-700"
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
