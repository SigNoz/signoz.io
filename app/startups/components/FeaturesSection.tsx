import React from 'react'
import FeatureItem from './FeatureItem'
import { featureItems } from '../data'

export default function FeaturesSection() {
  return (
    <section className="bg-background py-16">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <h2 className="mb-4 text-3xl font-bold">
            Why Startups <span className="text-gradient">Choose SigNoz</span>
          </h2>
          <p className="text-lg text-gray-300">All your observability needs at one place.</p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {featureItems.map((feature, index) => (
            <FeatureItem key={index} feature={feature} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
