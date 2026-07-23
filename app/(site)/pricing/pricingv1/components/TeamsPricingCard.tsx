import React from 'react'
import { ArrowUpRight, CheckCircle, ChevronDown, Info } from 'lucide-react'
import Image from 'next/image'
import draftingCompassIconUrl from '@/public/img/index_features/drafting-compass.svg?url'
import logsIconUrl from '@/public/img/index_features/logs.svg?url'
import barChartIconUrl from '@/public/img/index_features/bar-chart-2.svg?url'
import Button from '@/components/ui/Button'
import TrackingLink from '@/components/TrackingLink'
import { AppTooltip as Tooltip } from '@/components/ui/AppTooltip'
import { Card } from '@/components/ui/Card'

export default function TeamsPricingCard() {
  return (
    <Card variant={'aqua'}>
      <div className="m-6 flex flex-grow flex-col">
        <div className="mb-4 flex flex-col md:flex-row md:justify-between">
          <div className="w-full md:w-[60%]">
            <h3
              id="teams"
              className="pinkish-gradient mb-1 text-2xl font-bold tracking-tight md:text-3xl"
            >
              Teams
            </h3>
            <p className="text-muted-foreground text-base">
              For fast-scaling teams that need observability to scale with them.
            </p>
          </div>
          <div className="mt-4 flex w-full flex-col items-start md:mt-0 md:w-[40%] md:items-end">
            <span className="text-muted-foreground text-sm">starts from</span>
            <div className="flex items-baseline">
              <span className="text-l1-foreground text-3xl font-bold md:text-4xl">
                <span className="text-muted-foreground text-2xl line-through">$199</span> $49
              </span>
              <span className="text-muted-foreground ml-1">/month</span>
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
          <Button variant="legacyPrimary" className="mb-6 w-full px-4 py-3 md:py-6">
            Get Started with SigNoz Cloud
          </Button>
        </TrackingLink>

        <div className="border-border my-3 w-full border-t border-dashed"></div>

        {/* Base pricing table */}
        <div className="bg-card bg-opacity-10 mb-6 rounded-md p-3">
          <h5 className="text-l1-foreground mb-3 text-sm font-medium">After $49, billed at:</h5>
          <div className="grid grid-cols-1 gap-2 md:grid-cols-3">
            <div className="flex items-center gap-2">
              <Image
                src={draftingCompassIconUrl}
                alt="Traces Icon"
                width={20}
                height={20}
                className="h-5 w-5"
              />
              <div>
                <div className="text-muted-foreground text-xs">Traces</div>
                <div className="text-sm">
                  <span className="text-accent-primary font-medium">$0.30</span>
                  <span className="text-muted-foreground">/GB</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Image src={logsIconUrl} alt="Logs Icon" width={20} height={20} className="h-5 w-5" />
              <div>
                <div className="text-muted-foreground text-xs">Logs</div>
                <div className="text-sm">
                  <span className="text-sakura-400 font-medium">$0.30</span>
                  <span className="text-muted-foreground">/GB</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Image
                src={barChartIconUrl}
                alt="Metrics Icon"
                width={20}
                height={20}
                className="h-5 w-5"
              />
              <div>
                <div className="text-muted-foreground text-xs">Metrics</div>
                <div className="text-sm">
                  <span className="text-callout-warning-title font-medium">$0.10</span>
                  <span className="text-muted-foreground">/mn samples</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <h4 className="text-l1-foreground mb-4 text-lg font-bold">What's included in $49/month?</h4>
        <ul className="mb-10 space-y-3">
          <li className="flex items-start gap-2">
            <CheckCircle className="mt-1 min-w-4 text-green-500" size={16} />
            <span className="text-muted-foreground">
              Access to all{' '}
              <TrackingLink
                href="#all-features"
                clickType="In Page Link"
                clickName="Features Detail Link"
                clickText="features"
                clickLocation="Teams Pricing Card"
              >
                <span className="text-accent-primary hover:text-primary inline-flex items-center">
                  features
                  <ChevronDown size={12} className="ml-1" />
                </span>
              </TrackingLink>
            </span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle className="mt-1 min-w-4 text-green-500" size={16} />
            <span className="text-muted-foreground">Send any mix of logs, traces & metrics</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle className="mt-1 min-w-4 text-green-500" size={16} />
            <span className="text-muted-foreground">
              Usage worth $49 (e.g. 163 GB logs/traces or 490 mn metric samples)
            </span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle className="mt-1 min-w-4 text-green-500" size={16} />
            <span className="text-muted-foreground">
              <span className="flex items-center gap-1">
                Access to MCP Server and Noz: Our new AI teammate
                <Tooltip
                  content={
                    <div className="max-w-xs">
                      <p className="text-muted-foreground m-0 text-sm">
                        <TrackingLink
                          href="/docs/ai/noz/"
                          clickType="In Page Link"
                          clickName="Agent Native Link"
                          clickText="Learn more"
                          clickLocation="Teams Pricing Card"
                        >
                          <span className="text-accent-primary hover:text-primary">Read Docs</span>
                        </TrackingLink>
                      </p>
                    </div>
                  }
                  contentClassName="border border-border bg-card p-2"
                >
                  <Info className="text-accent-primary mt-0.5 min-w-4 cursor-pointer" size={14} />
                </Tooltip>
              </span>
            </span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle className="mt-1 min-w-4 text-green-500" size={16} />
            <span className="text-muted-foreground">
              Need more?{' '}
              <TrackingLink
                href="#estimate-your-monthly-bill"
                clickType="In Page Link"
                clickName="Pricing Calculator Link"
                clickText="Pay only for what exceeds $49 based on usage"
                clickLocation="Teams Pricing Card"
              >
                <span className="text-accent-primary hover:text-primary">
                  Pay only for what exceeds $49 based on usage
                </span>
              </TrackingLink>
            </span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle className="mt-1 min-w-4 text-green-500" size={16} />
            <span className="text-muted-foreground">
              Add unlimited teammates and monitor any number of hosts
            </span>
          </li>

          {/* Support */}
          <li className="flex items-start gap-2">
            <CheckCircle className="mt-1 min-w-4 text-green-500" size={16} />
            <span className="text-muted-foreground">
              <span className="flex items-center gap-1">
                Support via in-product Chat, Email, and Slack
                <Tooltip
                  content={
                    <div className="max-w-xs">
                      <p className="text-l1-foreground mb-1 font-medium">Support includes:</p>
                      <ul className="text-muted-foreground list-disc pl-4 text-sm">
                        <li>In-Product Chat Support</li>
                        <li>Email</li>
                        <li>Dedicated Slack Channel (on spends above $999/mo)</li>
                        <li>Support for Migrating DataDog Dashboards (on spends above $999/mo)</li>
                      </ul>
                    </div>
                  }
                  contentClassName="border border-border bg-card p-2"
                >
                  <Info className="text-accent-primary mt-0.5 min-w-4 cursor-pointer" size={14} />
                </Tooltip>
              </span>
            </span>
          </li>

          {/* Compliance */}
          <li className="flex items-start gap-2">
            <CheckCircle className="mt-1 min-w-4 text-green-500" size={16} />
            <span className="text-muted-foreground">
              <span className="flex items-center gap-1">
                SOC2 Type II & HIPAA Compliant
                <Tooltip
                  content={
                    <div className="max-w-xs">
                      <p className="text-l1-foreground mb-1 font-medium">Compliance details:</p>
                      <ul className="text-muted-foreground list-disc pl-4 text-sm">
                        <li>SOC2 Type II Compliant</li>
                        <li>HIPAA Compliant</li>
                        <li>BAA Agreement (Add On)</li>
                      </ul>
                    </div>
                  }
                  contentClassName="border border-border bg-card p-2"
                >
                  <Info className="text-accent-primary mt-0.5 min-w-4 cursor-pointer" size={14} />
                </Tooltip>
              </span>
            </span>
          </li>

          {/* Data Centers */}
          <li className="flex items-start gap-2">
            <CheckCircle className="mt-1 min-w-4 text-green-500" size={16} />
            <span className="text-muted-foreground">
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
                <span className="text-muted-foreground hover:text-primary">
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
            <Button variant="legacyPrimary" className="mb-3 w-full px-4 py-3 md:py-6">
              Estimate your monthly bill
            </Button>
          </TrackingLink>
        </div>
      </div>
    </Card>
  )
}
