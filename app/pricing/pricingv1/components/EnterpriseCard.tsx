import React from 'react'
import { CheckCircle, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import Button from 'components/Button/Button'
import TrackingLink from '../../../../components/TrackingLink'

export default function EnterpriseCard() {
  return (
    <div className="pricing-card relative flex h-full flex-col rounded-md border border-dashed border-signoz_slate-400 bg-signoz_ink-400 bg-opacity-5 px-6 py-8 transition-all duration-300">
      <div className="flex flex-grow flex-col">
        <div className="mb-4 flex flex-col md:flex-row md:justify-between">
          <div className="w-full md:w-[60%]">
            <h3 className="orangish-gradient mb-1 text-2xl font-bold tracking-tight md:text-3xl">
              Enterprise
            </h3>
            <p className="text-base text-gray-400">
              For larger orgs with advanced security, compliance and support.
            </p>
          </div>
          <div className="mt-4 flex w-full flex-col items-start md:mt-0 md:w-[40%] md:items-end">
            <span className="text-2xl font-bold text-signoz_vanilla-100 md:text-3xl">Custom</span>
            <div className="mt-1 text-sm text-signoz_vanilla-400">starts at $4000/month</div>
          </div>
        </div>

        <TrackingLink
          href="/contact-us/"
          clickType="Secondary CTA"
          clickName="Enterprise Contact Button"
          clickText="Contact Us"
          clickLocation="Enterprise Pricing Card Top"
        >
          <Button
            type={Button.TYPES.SECONDARY}
            className="mb-4 flex w-full items-center justify-center gap-2 px-4 py-3 md:py-6"
          >
            Contact Us <ArrowRight size={14} />
          </Button>
        </TrackingLink>

        <div className="my-5 w-full border-t border-dashed border-signoz_slate-400"></div>

        <h4 className="mb-4 text-lg font-bold text-signoz_vanilla-100">
          Choose between the following offerings
        </h4>
        <ul className="mb-3 space-y-3">
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

        <div className="mb-7 mt-6 w-full border-t border-dashed border-signoz_slate-400"></div>

        <h4 className="mb-4 text-lg font-bold text-signoz_vanilla-100">Enterprise benefits</h4>
        <ul className="mb-10 space-y-3">
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
            <span className="text-signoz_vanilla-400">Team training</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle className="mt-1 min-w-4 text-green-500" size={16} />
            <span className="text-signoz_vanilla-400">SLA w/ downtime developer pairing</span>
          </li>
        </ul>

        <div className="mt-auto">
          <TrackingLink
            href="/contact-us/"
            clickType="Secondary CTA"
            clickName="Enterprise Contact Button"
            clickText="Contact Us"
            clickLocation="Enterprise Pricing Card Bottom"
          >
            <Button
              type={Button.TYPES.SECONDARY}
              className="mb-3 flex w-full items-center justify-center gap-2 px-4 py-3 md:py-6"
            >
              Contact Us <ArrowRight size={14} />
            </Button>
          </TrackingLink>
        </div>
      </div>
    </div>
  )
}
