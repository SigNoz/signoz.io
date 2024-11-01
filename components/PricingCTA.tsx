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
      <div className="w-full my-4">
        <div className="bg-gradient-to-r from-gray-800 to-gray-900 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out transform hover:-translate-y-1">
          <div className="space-y-4">
            <h3 className="text-xl my-0 font-bold text-white">Tired of Unpredictable Pricing with DataDog?</h3>
            <p className="text-gray-300 text-sm">
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
              <div className="absolute -top-2 -right-2 bg-red-600 text-white px-2 py-0.5 rounded-full text-xs font-bold shadow-md">
                Save up to 90%
              </div>
            </div>

            <div className="mt-4">
              <Link
                href="https://signoz.io/pricing/#estimate-your-monthly-bill"
                target="_blank"
                rel="noopener noreferrer"
                style={{color: 'white'}}
                className="inline-flex items-center justify-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 transition duration-150 ease-in-out no-underline"
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
    <div className="w-full my-8">
      <div className="bg-gradient-to-r from-gray-800 to-gray-900 rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out transform hover:-translate-y-1">
        <div className="space-y-4">
          <h3 className="text-2xl my-0 font-bold text-white">Tired of Unpredictable Pricing with DataDog?</h3>
          <p className="text-gray-300">
            SigNoz offers up to 9X ROI compared to DataDog with simple, transparent pricing:
          </p>

          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-1">
              <ul className="space-y-2 pl-0">
                {[
                  'No user-based pricing',
                  'No host (container or nodes) based pricing',
                  'Simple usage-based pricing',
                  'No special pricing for custom metrics'
                ].map((item, index) => (
                  <li key={index} className="flex items-center text-gray-300">
                    <CheckCircle className="text-green-500 mr-2 flex-shrink-0" size={16} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex-1 hidden md:block">
              <div className="relative">
                <Image
                  src="/img/graphics/homepage/feature-graphic-data-protection-2.webp"
                  alt="SigNoz Pricing Comparison"
                  width={350}
                  height={195}
                  layout="responsive"
                  className="rounded-md"
                />
                <div className="absolute -top-3 -right-3 bg-red-600 text-white px-3 py-1 rounded-full text-xs font-bold shadow-md">
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
              style={{color: 'white'}}
              className="inline-flex items-center justify-center px-6 py-2 bg-blue-600 text-white text-base font-medium rounded-md hover:bg-blue-700 transition duration-150 ease-in-out no-underline"
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