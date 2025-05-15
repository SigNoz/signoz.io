import React from 'react'
import { CheckCircle, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import Button from 'components/Button/Button'

export default function EnterpriseCard() {
  return (
    <div className="pricing-card rounded-md border border-dashed border-signoz_slate-400 bg-signoz_ink-400 bg-opacity-5 px-6 py-8 transition-all duration-300">
      <div>
        <div className="mb-4 flex justify-between">
          <div className="w-[60%]">
            <h3 className="orangish-gradient mb-1 text-3xl font-bold tracking-tight">Enterprise</h3>
            <p className="text-base text-gray-400">
              For larger orgs with advanced security, compliance and support.
            </p>
          </div>
          <div className="flex w-[40%] flex-col items-end">
            <span className="text-3xl font-bold text-signoz_vanilla-100">Custom</span>
            <div className="mt-1 text-sm text-signoz_vanilla-400">starts at $4000/month</div>
          </div>
        </div>

        <Link href="/enterprise-cloud/">
          <Button type={Button.TYPES.SECONDARY} className="mb-4 w-full px-4 py-3">
            Contact Us <ArrowRight size={14} />
          </Button>
        </Link>

        <div className="my-6 w-full border-t border-dashed border-signoz_slate-400"></div>

        <h4 className="mb-4 text-lg font-bold text-signoz_vanilla-100">Our offerings</h4>
        <ul className="mb-6 space-y-3">
          <li className="flex items-start gap-2">
            <CheckCircle className="mt-1 min-w-4 text-green-500" size={16} />
            <span className="text-signoz_vanilla-400">A dedicated environment on SigNoz cloud</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle className="mt-1 min-w-4 text-green-500" size={16} />
            <span className="text-signoz_vanilla-400">
              Bring your own cloud(managed by SigNoz in your cloud)
            </span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle className="mt-1 min-w-4 text-green-500" size={16} />
            <span className="text-signoz_vanilla-400">Self-host with support contract</span>
          </li>
        </ul>

        <div className="my-6 w-full border-t border-dashed border-signoz_slate-400"></div>

        <h4 className="mb-4 text-lg font-bold text-signoz_vanilla-100">Enterprise benefits</h4>
        <ul className="mb-6 space-y-3">
          <li className="flex items-start gap-2">
            <CheckCircle className="mt-1 min-w-4 text-green-500" size={16} />
            <span className="text-signoz_vanilla-400">Volume discounts & annual contracts</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle className="mt-1 min-w-4 text-green-500" size={16} />
            <span className="text-signoz_vanilla-400">
              HIPAA, BAA agreement and other certifications
            </span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle className="mt-1 min-w-4 text-green-500" size={16} />
            <span className="text-signoz_vanilla-400">Contract, legal and security reviews</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle className="mt-1 min-w-4 text-green-500" size={16} />
            <span className="text-signoz_vanilla-400">
              Dedicated Slack, email & in-product support
            </span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle className="mt-1 min-w-4 text-green-500" size={16} />
            <span className="text-signoz_vanilla-400">Guided migration support</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle className="mt-1 min-w-4 text-green-500" size={16} />
            <span className="text-signoz_vanilla-400">Ongoing professional services</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle className="mt-1 min-w-4 text-green-500" size={16} />
            <span className="text-signoz_vanilla-400">Audit reports</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle className="mt-1 min-w-4 text-green-500" size={16} />
            <span className="text-signoz_vanilla-400">Team training</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle className="mt-1 min-w-4 text-green-500" size={16} />
            <span className="text-signoz_vanilla-400">SLA w/ downtime developer pairing</span>
          </li>
        </ul>

        <Link href="/enterprise-cloud/">
          <Button type={Button.TYPES.SECONDARY} className="w-full px-4 py-3">
            Contact Us <ArrowRight size={14} />
          </Button>
        </Link>
      </div>
    </div>
  )
}
