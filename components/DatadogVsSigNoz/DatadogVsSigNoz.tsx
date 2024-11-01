'use client'

import React from 'react'
import Button from '../Button/Button'

export default function DatadogVsSigNoz() {
  return (
    <div className="w-full my-8">
      <div className="bg-gradient-to-r from-gray-800 to-gray-900 rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out transform hover:-translate-y-1">
        <div className="space-y-4">
          <h3 className="text-2xl my-0 font-bold text-white">Ready to Optimize Your Observability Costs?</h3>
          <p className="text-gray-300">
            Discover how SigNoz offers a seamless migration path from Datadog with comparable features and significant
            cost savings.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button>
              <a href="/product-comparison/signoz-vs-datadog/" style={{ textDecoration: 'none', color: 'inherit' }}>
                Compare SigNoz vs. Datadog
              </a>
            </Button>
            <Button
              href="/teams/"
              type={Button.TYPES.SECONDARY}
            >
              <a href="/teams/" style={{ textDecoration: 'none', color: 'inherit' }}>
                Try SigNoz for Free &rarr;
              </a>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
