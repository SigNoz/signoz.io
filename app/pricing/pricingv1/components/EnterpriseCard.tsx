import React from 'react'
import { CheckCircle, ArrowRight } from 'lucide-react'
import Link from 'next/link'

export default function EnterpriseCard() {
  return (
    <div className="pricing-card rounded-md border border-dashed border-signoz_slate-400 bg-signoz_ink-400 bg-opacity-5 px-6 py-8">
      <div>
        <h3 className="orangish-gradient mb-1 text-3xl font-bold tracking-tight">Enterprise</h3>
        <p className="mb-6 text-base text-gray-400">
          For larger orgs with advanced security, compliance and support.
        </p>

        <Link
          href="/enterprise-cloud/"
          className="mb-4 flex w-full items-center justify-center gap-2 rounded-full border border-signoz_robin-500 bg-transparent px-4 py-3 font-medium text-signoz_robin-500 hover:bg-signoz_robin-500/10"
        >
          Contact Us <ArrowRight size={14} />
        </Link>

        <div className="mb-2">
          <span className="text-sm text-signoz_vanilla-400">From</span>
        </div>
        <div className="mb-3 flex items-baseline">
          <span className="text-4xl font-bold text-signoz_vanilla-100">$4000</span>
          <span className="ml-1 text-signoz_vanilla-400">/month</span>
        </div>

        <Link
          href="/enterprise/"
          className="mb-6 text-center text-sm text-signoz_robin-300 hover:text-signoz_robin-400"
        >
          We offer enterprise cloud, self hosted, and bring your own cloud options. Check All
          Enterprise Plans
        </Link>

        <div className="my-6 w-full border-t border-dashed border-signoz_slate-400"></div>

        <h4 className="mb-4 text-lg font-bold text-signoz_vanilla-100">Benefits</h4>
        <ul className="mb-6 space-y-3">
          <li className="flex items-start gap-2">
            <CheckCircle className="mt-1 min-w-4 text-green-500" size={16} />
            <span className="text-signoz_vanilla-400">Everything included in Teams plan</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle className="mt-1 min-w-4 text-green-500" size={16} />
            <span className="text-signoz_vanilla-400">Dedicated Support</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle className="mt-1 min-w-4 text-green-500" size={16} />
            <span className="text-signoz_vanilla-400">Custom Pricing & Retention Period</span>
          </li>
        </ul>

        <h4 className="mb-4 text-lg font-bold text-signoz_vanilla-100">Support</h4>
        <ul className="mb-6 space-y-3">
          <li className="flex items-start gap-2">
            <CheckCircle className="mt-1 min-w-4 text-green-500" size={16} />
            <span className="text-signoz_vanilla-400">Email</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle className="mt-1 min-w-4 text-green-500" size={16} />
            <span className="text-signoz_vanilla-400">Dedicated Slack Channel</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle className="mt-1 min-w-4 text-green-500" size={16} />
            <span className="text-signoz_vanilla-400">In-Product Chat Support</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle className="mt-1 min-w-4 text-green-500" size={16} />
            <span className="text-signoz_vanilla-400">
              Support for Migrating DataDog Dashboards
            </span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle className="mt-1 min-w-4 text-green-500" size={16} />
            <span className="text-signoz_vanilla-400">Team Training</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle className="mt-1 min-w-4 text-green-500" size={16} />
            <span className="text-signoz_vanilla-400">Dashboard Configuration Support</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle className="mt-1 min-w-4 text-green-500" size={16} />
            <span className="text-signoz_vanilla-400">Instrumentation Support</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle className="mt-1 min-w-4 text-green-500" size={16} />
            <span className="text-signoz_vanilla-400">SLA w/ downtime developer pairing</span>
          </li>
        </ul>

        <Link
          href="/enterprise-cloud/"
          className="flex w-full items-center justify-center gap-2 rounded-full border border-signoz_robin-500 bg-transparent px-4 py-3 font-medium text-signoz_robin-500 hover:bg-signoz_robin-500/10"
        >
          Contact Us <ArrowRight size={14} />
        </Link>
      </div>
    </div>
  )
}
