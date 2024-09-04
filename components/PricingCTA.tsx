import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, CheckCircle } from 'lucide-react'

const PricingCTA: React.FC = () => {
  return (
    <div className="my-8 mx-auto max-w-4xl">
      <div className="bg-gray-900 text-white rounded-lg shadow-lg overflow-hidden p-8">
        <h2 className="text-3xl font-bold mb-2">Tired of Unpredictable Pricing with DataDog?</h2>
        <p className="text-xl text-gray-300 mb-6">SigNoz offers up to 9X ROI compared to DataDog</p>
        
        <div className="flex flex-col md:flex-row gap-8">
          <div className="flex-1">
            <h3 className="text-2xl font-semibold mb-4">Why choose SigNoz?</h3>
            <ul className="space-y-3">
              {[
                'No user-based or host-based pricing',
                'Transparent, predictable pricing',
                'No hidden fees or surprises',
                'Scale without breaking the bank'
              ].map((item, index) => (
                <li key={index} className="flex items-center">
                  <CheckCircle className="text-green-500 mr-2" size={20} />
                  <span className="text-lg">{item}</span>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-gray-400 text-lg">Just pay for what you use.</p>
          </div>
          
          <div className="flex-1">
            <div className="relative">
              <Image
                src="/img/graphics/homepage/feature-graphic-data-protection-2.webp"
                alt="SigNoz Pricing Comparison"
                width={400}
                height={223}
                layout="responsive"
                className="rounded-md"
              />
              <div className="absolute top-2 right-2 bg-red-600 text-white px-3 py-1 rounded-full text-sm font-bold">
                Save up to 90%
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-8 flex justify-between items-center">
          <Link
            href="https://signoz.io/pricing/#estimate-your-monthly-bill"
            target="_blank"
            rel="noopener noreferrer"
            style={{color: 'white'}}
            className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white text-lg font-medium rounded-md hover:bg-blue-700 transition duration-150 ease-in-out no-underline"
          >
            Calculate Your Savings Now <ArrowRight size={20} className="ml-2" />
          </Link>
        </div>
      </div>
    </div>
  )
}

export default PricingCTA