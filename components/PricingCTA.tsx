import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

const PricingCTA: React.FC = () => {
  return (
    <div className="my-8 mx-auto max-w-4xl">
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg shadow-lg overflow-hidden p-6 sm:p-8">
        <h2 style={{ marginTop: '0rem' }} className="text-2xl font-bold text-white mb-2">Tired of unpredictable pricing?</h2>
        <p className="text-blue-100 mb-6">
          SigNoz provides up to 9X ROI compared to DataDog, with no user-based or host-based pricing.
        </p>
        <div className="bg-white/10 rounded-lg p-4 mb-6">
          <Image
            src="/img/graphics/homepage/feature-graphic-data-protection-2.webp"
            alt="SigNoz Pricing"
            width={600}
            height={200}
            layout="responsive"
            className="rounded-lg text-white my-2"
          />
        </div>
        <div className="flex justify-start">
          <Link
            href="https://signoz.io/pricing/#estimate-your-monthly-bill"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-indigo-50 transition duration-150 ease-in-out no-underline"
          >
            Estimate Your Monthly Bill &rarr;
          </Link>
        </div>
      </div>
    </div>
  )
}

export default PricingCTA