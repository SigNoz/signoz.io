import React from 'react'
import { ArrowUpRight, CheckCircle, ChevronDown, Info } from 'lucide-react'
import Image from 'next/image'
import Button from 'components/Button/Button'
import TrackingLink from '../../../../components/TrackingLink'
import { Tooltip } from '@nextui-org/react'

export default function TeamsPricingCard() {
  return (
    <div className="pricing-card relative flex h-full flex-col rounded-md border border-dashed border-signoz_slate-400 bg-signoz_ink-400 bg-opacity-5 px-6 py-8 shadow-[0_0_20px_rgba(78,116,248,0.2)] transition-all duration-300">
      <div className="flex flex-grow flex-col">
        <div className="mb-4 flex flex-col md:flex-row md:justify-between">
          <div className="w-full md:w-[60%]">
            <h3 className="pinkish-gradient mb-1 text-2xl font-bold tracking-tight md:text-3xl">
              Teams
            </h3>
            <p className="text-base text-gray-400">
              For teams that need high-performing applications.
            </p>
          </div>
          <div className="mt-4 flex w-full flex-col items-start md:mt-0 md:w-[40%] md:items-end">
            <span className="text-sm text-signoz_vanilla-400">starts from</span>
            <div className="flex items-baseline">
              <span className="text-3xl font-bold text-signoz_vanilla-100 md:text-4xl">
                <span className="text-2xl text-signoz_vanilla-400 line-through">$199</span> $49
              </span>
              <span className="ml-1 text-signoz_vanilla-400">/month</span>
            </div>
          </div>
        </div>

        <TrackingLink
          href="/teams/"
          clickType="Primary CTA"
          clickName="Sign Up Button"
          clickText="Get Started with SigNoz Cloud"
          clickLocation="Teams Pricing Card"
        >
          <Button className="mb-6 w-full px-4 py-3 md:py-6">Get Started with SigNoz Cloud</Button>
        </TrackingLink>

        <div className="my-3 w-full border-t border-dashed border-signoz_slate-400"></div>

        {/* Base pricing table */}
        <div className="mb-6 rounded-md bg-signoz_ink-400 bg-opacity-10 p-3">
          <h5 className="mb-3 text-sm font-medium text-signoz_vanilla-100">
            After $49, billed at:
          </h5>
          <div className="grid grid-cols-1 gap-2 md:grid-cols-3">
            <div className="flex items-center gap-2">
              <Image
                src="/img/index_features/drafting-compass.svg"
                alt="Traces Icon"
                width={20}
                height={20}
                className="h-5 w-5"
              />
              <div>
                <div className="text-xs text-signoz_vanilla-400">Traces</div>
                <div className="text-sm">
                  <span className="font-medium text-signoz_robin-400">$0.30</span>
                  <span className="text-signoz_vanilla-400">/GB</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Image
                src="/img/index_features/logs.svg"
                alt="Logs Icon"
                width={20}
                height={20}
                className="h-5 w-5"
              />
              <div>
                <div className="text-xs text-signoz_vanilla-400">Logs</div>
                <div className="text-sm">
                  <span className="font-medium text-signoz_sakura-400">$0.30</span>
                  <span className="text-signoz_vanilla-400">/GB</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Image
                src="/img/index_features/bar-chart-2.svg"
                alt="Metrics Icon"
                width={20}
                height={20}
                className="h-5 w-5"
              />
              <div>
                <div className="text-xs text-signoz_vanilla-400">Metrics</div>
                <div className="text-sm">
                  <span className="font-medium text-signoz_amber-400">$0.10</span>
                  <span className="text-signoz_vanilla-400">/mn samples</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <h4 className="mb-4 text-lg font-bold text-signoz_vanilla-100">
          What's included in $49/month?
        </h4>
        <ul className="mb-10 space-y-3">
          <li className="flex items-start gap-2">
            <CheckCircle className="mt-1 min-w-4 text-green-500" size={16} />
            <span className="text-signoz_vanilla-400">
              Access to all{' '}
              <TrackingLink
                href="#all-features"
                clickType="In Page Link"
                clickName="Features Detail Link"
                clickText="features"
                clickLocation="Teams Pricing Card"
              >
                <span className="inline-flex items-center text-signoz_robin-400 hover:text-signoz_robin-500">
                  features
                  <ChevronDown size={12} className="ml-1" />
                </span>
              </TrackingLink>
            </span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle className="mt-1 min-w-4 text-green-500" size={16} />
            <span className="text-signoz_vanilla-400">Send any mix of logs, traces & metrics</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle className="mt-1 min-w-4 text-green-500" size={16} />
            <span className="text-signoz_vanilla-400">
              Usage worth $49 (e.g. 163 GB logs/traces or 490 mn metric samples)
            </span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle className="mt-1 min-w-4 text-green-500" size={16} />
            <span className="text-signoz_vanilla-400">
              Need more?{' '}
              <TrackingLink
                href="#estimate-your-monthly-bill"
                clickType="In Page Link"
                clickName="Pricing Calculator Link"
                clickText="Pay only for what exceeds $49 based on usage"
                clickLocation="Teams Pricing Card"
              >
                <span className="text-signoz_robin-400 hover:text-signoz_robin-500">
                  Pay only for what exceeds $49 based on usage
                </span>
              </TrackingLink>
            </span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle className="mt-1 min-w-4 text-green-500" size={16} />
            <span className="text-signoz_vanilla-400">
              Add unlimited teammates and monitor any number of hosts
            </span>
          </li>

          {/* Support */}
          <li className="flex items-start gap-2">
            <CheckCircle className="mt-1 min-w-4 text-green-500" size={16} />
            <span className="text-signoz_vanilla-400">
              <span className="flex items-center gap-1">
                Support via in-product Chat, Email, and Slack
                <Tooltip
                  className="border border-signoz_slate-400 bg-signoz_ink-400 p-2"
                  content={
                    <div className="max-w-xs">
                      <p className="mb-1 font-medium text-signoz_vanilla-100">Support includes:</p>
                      <ul className="list-disc pl-4 text-sm text-signoz_vanilla-400">
                        <li>In-Product Chat Support</li>
                        <li>Email</li>
                        <li>Dedicated Slack Channel (on spends above $999/mo)</li>
                        <li>Support for Migrating DataDog Dashboards (on spends above $999/mo)</li>
                      </ul>
                    </div>
                  }
                >
                  <Info className="mt-0.5 min-w-4 cursor-pointer text-signoz_robin-400" size={14} />
                </Tooltip>
              </span>
            </span>
          </li>

          {/* Compliance */}
          <li className="flex items-start gap-2">
            <CheckCircle className="mt-1 min-w-4 text-green-500" size={16} />
            <span className="text-signoz_vanilla-400">
              <span className="flex items-center gap-1">
                SOC2 Type II & HIPAA Compliant
                <Tooltip
                  className="border border-signoz_slate-400 bg-signoz_ink-400 p-2"
                  content={
                    <div className="max-w-xs">
                      <p className="mb-1 font-medium text-signoz_vanilla-100">
                        Compliance details:
                      </p>
                      <ul className="list-disc pl-4 text-sm text-signoz_vanilla-400">
                        <li>SOC2 Type II Compliant</li>
                        <li>HIPAA Compliant</li>
                        <li>BAA Agreement (Add On)</li>
                      </ul>
                    </div>
                  }
                >
                  <Info className="mt-0.5 min-w-4 cursor-pointer text-signoz_robin-400" size={14} />
                </Tooltip>
              </span>
            </span>
          </li>

          {/* Data Centers */}
          <li className="flex items-start gap-2">
            <CheckCircle className="mt-1 min-w-4 text-green-500" size={16} />
            <span className="text-signoz_vanilla-400">
              Data centers available in the US, EU & India
            </span>
          </li>

          {/* Additional information links */}
          <li className="flex items-start gap-2">
            <div className="flex flex-col space-y-2">
              <TrackingLink
                href="/pricing/metrics-cost-estimation/"
                clickType="Nav Click"
                clickName="Metrics Pricing Calculator Link"
                clickText="Learn how the price for metrics is calculated"
                clickLocation="Teams Pricing Card"
              >
                <span className="text-signoz_vanilla-400 hover:text-signoz_robin-500">
                  <ArrowUpRight size={20} className="mr-1 inline" />
                  Learn how the price for metrics is calculated
                </span>
              </TrackingLink>
            </div>
          </li>
        </ul>

        <div className="mt-auto">
          <TrackingLink
            href="#estimate-your-monthly-bill"
            clickType="Secondary CTA"
            clickName="Pricing Calculator Button"
            clickText="Estimate your monthly bill"
            clickLocation="Teams Pricing Card"
          >
            <Button className="mb-3 w-full px-4 py-3 md:py-6">Estimate your monthly bill</Button>
          </TrackingLink>
        </div>
      </div>
    </div>
  )
}
