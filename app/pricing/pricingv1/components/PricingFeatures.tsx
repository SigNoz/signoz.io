import React from 'react'
import { CheckCircle } from 'lucide-react'

export default function PricingFeatures() {
  return (
    <div className="my-6 flex w-full max-w-4xl flex-col items-center gap-3 font-bold md:flex-row md:justify-between md:gap-4">
      <div className="flex items-center gap-2">
        <CheckCircle className="text-green-500" size={16} />
        <span className="text-base text-signoz_vanilla-400">No user-based pricing</span>
      </div>
      <div className="flex items-center gap-2">
        <CheckCircle className="text-green-500" size={16} />
        <span className="text-base text-signoz_vanilla-400">No host-based pricing</span>
      </div>
      <div className="flex items-center gap-2">
        <CheckCircle className="text-green-500" size={16} />
        <span className="text-base text-signoz_vanilla-400">
          No special pricing for custom metrics
        </span>
      </div>
    </div>
  )
}
