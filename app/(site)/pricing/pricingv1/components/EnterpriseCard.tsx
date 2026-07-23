import React from 'react'
import { CheckCircle, ArrowRight, Info } from 'lucide-react'
import Button from '@/components/ui/Button'
import TrackingLink from '@/components/TrackingLink'
import { Card } from '@/components/ui/Card'

export default function EnterpriseCard() {
  return (
    <Card>
      <div className="px-6 py-8">
        <div className="flex flex-grow flex-col">
          <div className="mb-4 flex flex-col md:flex-row md:justify-between">
            <div className="w-full md:w-[60%]">
              <h3
                id="enterprise"
                className="orangish-gradient mb-1 text-2xl font-bold tracking-tight md:text-3xl"
              >
                Enterprise
              </h3>
              <p className="text-base text-gray-400">
                For larger orgs that need data residency, compliance and support.
              </p>
            </div>
            <div className="mt-4 flex w-full flex-col items-start md:mt-0 md:w-[40%] md:items-end">
              <span className="text-l1-foreground text-2xl font-bold md:text-3xl">Custom</span>
              <div className="text-muted-foreground mt-1 text-sm">starts at $4000/month</div>
            </div>
          </div>

          <TrackingLink
            href="/contact-us/?source=pricing"
            clickType="Secondary CTA"
            clickName="Enterprise Contact Button"
            clickText="Contact Us"
            clickLocation="Enterprise Pricing Card Bottom"
          >
            <Button
              variant="legacySecondary"
              className="mb-4 flex w-full items-center justify-center gap-2 px-4 py-3 md:py-6"
            >
              Contact Us <ArrowRight size={14} />
            </Button>
          </TrackingLink>

          <div className="border-border my-5 w-full border-t border-dashed"></div>

          <h4 className="text-l1-foreground mb-4 text-lg font-bold">
            Choose between the following offerings
          </h4>
          <ul className="mb-3 space-y-3">
            <li className="flex items-start gap-2">
              <CheckCircle className="mt-1 min-w-4 text-green-500" size={16} />
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <span className="text-muted-foreground">
                    A dedicated environment on SigNoz cloud
                  </span>
                </div>
                <span className="text-muted-foreground mt-1 ml-3 flex items-center gap-2 text-sm italic">
                  <Info className="text-muted-foreground" size={14} />
                  Includes monthly ingestion usage till $4000
                </span>
              </div>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="mt-1 min-w-4 text-green-500" size={16} />
              <span className="text-muted-foreground">
                Bring your own cloud(managed by SigNoz in your cloud)
              </span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="mt-1 min-w-4 text-green-500" size={16} />
              <span className="text-muted-foreground">Self-host with support contract</span>
            </li>
          </ul>

          <div className="border-border mt-6 mb-7 w-full border-t border-dashed"></div>

          <h4 className="text-l1-foreground mb-4 text-lg font-bold">Enterprise benefits</h4>
          <ul className="mb-10 space-y-3">
            <li className="flex items-start gap-2">
              <CheckCircle className="mt-1 min-w-4 text-green-500" size={16} />
              <span className="text-muted-foreground">Volume discounts & annual contracts</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="mt-1 min-w-4 text-green-500" size={16} />
              <span className="text-muted-foreground">
                HIPAA, BAA agreement and other certifications
              </span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="mt-1 min-w-4 text-green-500" size={16} />
              <span className="text-muted-foreground">
                Dedicated Slack, email & in-product support
              </span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="mt-1 min-w-4 text-green-500" size={16} />
              <span className="text-muted-foreground">Guided migration support</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="mt-1 min-w-4 text-green-500" size={16} />
              <span className="text-muted-foreground">Ongoing professional services</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="mt-1 min-w-4 text-green-500" size={16} />
              <span className="text-muted-foreground">Team training</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="mt-1 min-w-4 text-green-500" size={16} />
              <span className="text-muted-foreground">SLA w/ downtime developer pairing</span>
            </li>
          </ul>

          <div className="mt-auto">
            <TrackingLink
              href="/contact-us/?source=pricing"
              clickType="Secondary CTA"
              clickName="Enterprise Contact Button"
              clickText="Contact Us"
              clickLocation="Enterprise Pricing Card Top"
            >
              <Button
                variant="legacySecondary"
                className="mb-3 flex w-full items-center justify-center gap-2 px-4 py-3 md:py-6"
              >
                Contact Us <ArrowRight size={14} />
              </Button>
            </TrackingLink>
          </div>
        </div>
      </div>
    </Card>
  )
}
