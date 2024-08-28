import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

const PricingCTA: React.FC = () => {
  return (
    <div className="my-8 mx-auto max-w-4xl">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden p-6 sm:p-8 flex flex-col sm:flex-row items-center">
        <div className="flex-1 flex flex-col justify-center mb-6 sm:mb-0 sm:mr-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 mt-0">Tired of unpredictable pricing?</h2>
          <p className="text-gray-600 dark:text-gray-300 text-base mb-6">
            SigNoz provides up to 9X ROI compared to DataDog, with no user-based or host-based pricing.
          </p>
          <div className="flex justify-start">
            <Link
              href="https://signoz.io/pricing/#estimate-your-monthly-bill"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-6 py-2 border border-primary text-base font-medium rounded-md text-primary bg-white hover:bg-gray-50 transition duration-150 ease-in-out no-underline"
            >
              Estimate Your Monthly Bill &rarr;
            </Link>
          </div>
        </div>
        <div className="w-full sm:w-1/2">
          <Image
            src="/img/graphics/homepage/feature-graphic-data-protection-2.webp"
            alt="SigNoz Pricing"
            width={400}
            height={223}
            layout="responsive"
            className="rounded-md p-1 bg-black"
          />
        </div>
      </div>
    </div>
  )
}

export default PricingCTA