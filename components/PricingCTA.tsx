import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

const PricingCTA: React.FC = () => {
  return (
    <div className="my-4 mx-auto max-w-3xl">
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg shadow-lg overflow-hidden p-4 sm:p-6 flex items-center">
        <div className="flex-1 flex flex-col justify-center">
          <h2 className="text-xl font-bold text-white mb-2 mt-0">Tired of unpredictable pricing?</h2>
          <p className="text-blue-100 text-sm mb-4">
            SigNoz provides up to 9X ROI compared to DataDog, with no user-based or host-based pricing.
          </p>
          <Link
            href="https://signoz.io/pricing/#estimate-your-monthly-bill"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-indigo-600 bg-white hover:bg-indigo-50 transition duration-150 ease-in-out no-underline"
          >
            Estimate Your Monthly Bill &rarr;
          </Link>
        </div>
        <div className="hidden sm:block w-1/2 ml-4 self-center">
          <Image
            src="/img/graphics/homepage/feature-graphic-data-protection-2.webp"
            alt="SigNoz Pricing"
            width={400}
            height={223}
            layout="responsive"
            className="rounded-lg"
          />
        </div>
      </div>
    </div>
  )
}

export default PricingCTA