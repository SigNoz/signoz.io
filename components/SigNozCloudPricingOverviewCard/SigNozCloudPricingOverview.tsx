'use client'

import React from 'react'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import Button from '@/components/Button/Button'
import { Info, Zap, CircleCheck, Flame, Server } from 'lucide-react'

interface SigNozCloudPricingOverviewProps {
  className?: string
}

const SigNozCloudPricingOverview = ({ className = '' }: SigNozCloudPricingOverviewProps) => {
  return (
    <div className={`rounded-lg border border-signoz_slate-400 bg-signoz_ink-400/30 p-6 shadow-[0_12px_32px_-6px_rgba(255,255,255,0.06)] transition-all duration-300 hover:shadow-[0_16px_48px_-6px_rgba(255,255,255,0.1)] hover:-translate-y-1 ${className}`}>
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div className="flex flex-col justify-center text-left">
            <h3 className="mx-0 mt-0 mb-1 p-0 text-lg font-semibold">SigNoz Cloud / Teams</h3>
            <p className="text-sm m-0 text-gray-400">For teams that need no-hassle setup</p>
          </div>
          <div className="flex items-center">
            <div className="flex flex-col items-end justify-center">
              <div className="flex items-center">
                <span className="text-sm text-gray-400">Starts at</span>
                <span className="mx-1 text-3xl font-bold text-signoz_robin-300">$199</span>
              </div>
              <div className="text-sm text-gray-400">/month</div>
            </div>
            <button className="ml-2 flex items-center justify-center rounded-full p-1 hover:bg-signoz_slate-500">
              <Info className="h-4 w-4 text-gray-400" />
            </button>
          </div>
        </div>
      </div>

      <div className="my-14 space-y-4">
        <div className="flex justify-around mb-10 relative">
          <div className="text-left">
            <h4 className="font-medium text-2xl mb-1">Logs</h4>
            <p className="text-sm text-gray-400">0.3/GB ingested</p>
          </div>
          <div className="absolute left-[25%] top-[1.25rem] w-[15%] border-t border-dashed border-gray-400/30"></div>
          <div className="text-left">
            <h4 className="font-medium text-2xl mb-1">Traces</h4>
            <p className="text-sm text-gray-400">0.3/GB ingested</p>
          </div>
          <div className="absolute left-[60%] top-[1.25rem] w-[15%] border-t border-dashed border-gray-400/30"></div>
          <div className="text-left">
            <h4 className="font-medium text-2xl mb-1">Metrics</h4>
            <p className="text-sm text-gray-400">0.1/mil samples</p>
          </div>
        </div>

        <div className="flex items-center justify-between text-left p-4">
          <div className="flex items-start gap-2 text-sm text-gray-400">
            <Zap className="h-5 w-5 flex-shrink-0" />
            <span>Pay only for data you send</span>
          </div>
          <div className="h-4 w-[1px] bg-gray-400/30 mx-4"></div>
          <div className="flex items-start gap-2 text-sm text-gray-400">
            <Flame className="h-5 w-5 flex-shrink-0" />
            <span>Add unlimited team members</span>
          </div>
          <div className="h-4 w-[1px] bg-gray-400/30 mx-4"></div>
          <div className="flex items-start gap-2 text-sm text-gray-400">
            <Server className="h-5 w-5 flex-shrink-0" />
            <span>No host (container or node) based pricing</span>
          </div>
          <div className="h-4 w-[1px] bg-gray-400/30 mx-4"></div>
          <div className="flex items-start gap-2 text-sm text-gray-400">
            <CircleCheck className="h-5 w-5 flex-shrink-0" />
            <span>No special pricing for custom metrics</span>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <Link href="/teams">
          <Button className="w-full flex items-center justify-center font-bold">
            Get Started with SigNoz Cloud for Free
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
        
        <button className="w-full opacity-80 px-4 py-2 text-signoz_robin-300 hover:text-signoz_robin-400 bg-transparent transition-colors duration-200">
          <Link href="#estimate-your-monthly-bill" className="flex items-center justify-end">
            Estimate Your Bill with Pricing Calculator
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </button>
      </div>
    </div>
  )
}

export default SigNozCloudPricingOverview
