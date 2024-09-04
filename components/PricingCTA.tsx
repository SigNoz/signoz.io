import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, CheckCircle } from 'lucide-react'

const PricingCTA: React.FC = () => {
  return (
    <div className="my-2 mx-auto max-w-3xl">
      <div className="bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 text-white rounded-lg shadow-lg overflow-hidden px-6 py-7">
        <h2 className="text-2xl font-bold my-0">Tired of Unpredictable Pricing with DataDog?</h2>
        <p className="text-base text-gray-400 mt-1 mb-4">SigNoz offers up to 9X ROI compared to DataDog</p>
        
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-1">
            <h3 className="text-xl font-semibold mb-3">Why choose SigNoz?</h3>
            <ul className="space-y-2 pl-0">
              {[
                'No user-based or host-based pricing',
                'Transparent, predictable pricing',
                'No hidden fees or surprises',
                'Scale without breaking the bank'
              ].map((item, index) => (
                <li key={index} className="flex items-center">
                  <CheckCircle className="text-green-500 mr-2 flex-shrink-0" size={16} />
                  <span className="text-base">{item}</span>
                </li>
              ))}
            </ul>
            <p className="mt-0 text-gray-400 text-base">Just pay for what you use.</p>
          </div>
          
          <div className="flex-1">
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
  )
}

export default PricingCTA