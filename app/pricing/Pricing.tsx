'use client'

import React, { useState, useEffect } from 'react'

import FAQBody from '../../components/FAQPricing'
import styles from './styles.module.css'
import { TrustedByTeams } from '@/components/trusted-by'
import WhySelectSignoz from '@/components/why-select-signoz'
import { Testimonials } from '@/components/testimonials'
import MonthlyEstimate from '@/components/Monthly-estimate/MonthlyEstimate'
import MonthlyEstimateMobile from '@/components/Monthly-estimate/MonthlyEstimateMobile'
import { GetStarted } from '@/components/GetStarted'
import Link from 'next/link'
import Heading from '@/components/ui/Heading'
import Button from '@/components/Button/Button'
import Line from '@/components/ui/Line'
import { Chevron } from '@/components/svgs/common'
import { ArrowRight, ArrowUpRight, ArrowDown, Cloud, Server } from 'lucide-react'
import {
  CircleCheckSolid,
  CircleInfoSolid,
  ZapSolid,
  ClockSolid,
  CheckSolid,
  CrossSolid,
  CloudSolid,
  ServerSolid,
} from '@/components/homepage-icons/icons'

import SigNozCloudPricingOverview from '@/components/SigNozCloudPricingOverviewCard/SigNozCloudPricingOverview'
import TrackingLink from '@/components/TrackingLink'
import TrackingButton from '@/components/TrackingButton'
import TrackingButtonSigNozTheme from '@/components/TrackingButtonSigNozTheme'

const CloseButton = () => <div className="absolute right-0 top-0">Close</div>

function Pricing() {
  const [hasMounted, setHasMounted] = useState(false)
  const [width, setWidth] = useState<number>(0) // Initialize to 0 to match server

  useEffect(() => {
    setHasMounted(true)
    setWidth(window.innerWidth) // Set actual width on client mount

    function handleWindowSizeChange() {
      setWidth(window.innerWidth)
    }
    window.addEventListener('resize', handleWindowSizeChange)
    return () => {
      window.removeEventListener('resize', handleWindowSizeChange)
    }
  }, []) // Empty dependency array, runs once on mount

  const isMobile = width <= 768

  return (
    <div className="relative bg-signoz_ink-500">
      <div className="bg-dot-pattern masked-dots absolute top-0 flex h-screen w-full items-center justify-center" />
      <div className="absolute left-0 right-0 top-0 mx-auto h-[450px] w-full  flex-shrink-0 rounded-[956px] bg-gradient-to-b from-[rgba(190,107,241,1)] to-[rgba(69,104,220,0)] bg-[length:110%] bg-no-repeat opacity-30 blur-[300px] sm:bg-[center_-500px] md:h-[956px]" />
      <div title="SigNoz Plans">
        {/* Plans */}
        <div className="relative !mx-auto flex !w-[100vw] flex-col items-center border !border-b-0 border-dashed border-signoz_slate-400 px-0 pt-12 md:!w-[80vw] md:px-5 md:pt-24">
          <PricingPlans />
        </div>
        {/* All Features */}
        <TrustedByTeams page="pricing" />
        {/* Cost Comparison Graph */}
        <ExploreAllFeature />
        {/* Companies Logo */}
        {/* <CostComparison /> */}
        {/* <WhySelectSignoz/> */}
        {/* Data protection */}
        {/* <DataProtection /> */}
        {/* Talk To Expert */}
        {/* <TalkToExpert /> */}
        {/* More Options */}
        {/* <CommunityEdition /> */}
        {/* FAQ section */}
        {hasMounted ? (
          isMobile ? (
            <MonthlyEstimateMobile />
          ) : (
            <MonthlyEstimate />
          )
        ) : (
          <MonthlyEstimateMobile />
        )}
        <WhySelectSignoz isInPricingPage />
        <FAQ />
        {/* User Review */}
        {/* <UserReview /> */}
        {/* Give a Try CTA */}
        {/* <TrySigNozCTA /> */}
        <Testimonials page="pricing" />
        <GetStarted page="pricing" />
      </div>
    </div>
  )
}

export default Pricing

function FAQ() {
  return (
    <section className={styles.faq}>
      <div
        className={`section-container !mx-[auto] !w-[100vw] border !border-b-0 border-dashed border-signoz_slate-400 !px-0 md:!w-[80vw]`}
      >
        <div className="row mx-auto">
          <div className="flex w-full flex-col sm:flex-row">
            <div className="!w-[300px] flex-1">
              <p className="pl-12 pt-10 text-4xl font-semibold !leading-[3.5rem] text-signoz_vanilla-100 sm:text-[44px]">
                Frequently <br /> Asked <br /> Questions
              </p>
            </div>
            <div className="card-demo left-0 flex-[2_2_0%] border !border-b-0 !border-r-0 !border-t-0 border-dashed border-signoz_slate-400">
              <FAQBody />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

const RightIcon = () => (
  <svg
    className="h-6 w-6 text-green-500"
    fill="currentColor"
    viewBox="0 0 20 20"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
      clipRule="evenodd"
    ></path>
  </svg>
)

const CrossIcon = () => {
  return (
    <svg
      className="h-5 w-5"
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M0.5 8C0.5 12.1423 3.85775 15.5 8 15.5C12.1423 15.5 15.5 12.1423 15.5 8C15.5 3.85775 12.1423 0.5 8 0.5C3.85775 0.5 0.5 3.85775 0.5 8ZM10.4484 11.5L8 9.05156L5.55157 11.5L4.50002 10.4485L6.94846 8.00001L4.5 5.55155L5.55154 4.5L8 6.94846L10.4485 4.5L11.5 5.55155L9.05154 8.00001L11.5 10.4485L10.4484 11.5Z"
        fill="#FF5E7B"
      />
    </svg>
  )
}

const LoadingIcon = () => {
  return (
    <svg
      className="h-6 w-6 "
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      width="20"
      height="20"
      viewBox="0 0 100 100"
    >
      <circle
        cx="50"
        cy="50"
        fill="none"
        stroke="#fff"
        strokeWidth="10"
        r="35"
        strokeDasharray="164.93361431346415 56.97787143782138"
      ></circle>
    </svg>
  )
}

const PricingPlans = () => {
  const TRACES_AND_LOGS_PRICES = {
    15: 0.3,
    30: 0.4,
    90: 0.6,
    180: 0.8,
  }
  const METRICS_PRICES = {
    1: 0.1,
    3: 0.12,
    6: 0.15,
    13: 0.18,
  }
  const RETENTION_PERIOD = {
    TRACES_AND_LOGS: [
      { days: 15, price: 0.3 },
      { days: 30, price: 0.4 },
      { days: 90, price: 0.6 },
      { days: 180, price: 0.8 },
    ],
    METRICS: [
      { months: 1, price: 0.1 },
      { months: 3, price: 0.12 },
      { months: 6, price: 0.15 },
      { months: 13, price: 0.18 },
    ],
  }

  // Period
  const [tracesRetentionPeriod, setTracesRetentionPeriod] = useState(
    RETENTION_PERIOD.TRACES_AND_LOGS[0].days
  )
  const [logsRetentionPeriod, setLogsRetentionPeriod] = useState(
    RETENTION_PERIOD.TRACES_AND_LOGS[0].days
  )
  const [metricsRetentionPeriod, setMetricsRetentionPeriod] = useState(
    RETENTION_PERIOD.METRICS[0].months
  )

  const [tab, setTab] = useState('cloud')

  const [width, setWidth] = useState<number>(typeof window !== 'undefined' ? window.innerWidth : 0)

  function handleWindowSizeChange() {
    setWidth(window.innerWidth)
  }
  useEffect(() => {
    window.addEventListener('resize', handleWindowSizeChange)
    return () => {
      window.removeEventListener('resize', handleWindowSizeChange)
    }
  }, [])

  const isMobile = width <= 768

  return (
    <section className={`${styles.pricing} relative`}>
      <div
        className={`section-container !mx-auto !my-0 !w-[100vw] border !border-b-0 !border-t-0 border-dashed border-signoz_slate-400 md:!w-[80vw] ${styles.pricingContainer} max-sm:!px-0`}
      >
        <div className="absolute bottom-0 left-[24px] right-[24px] top-[-95px] z-[-1] border !border-b-0 !border-t-0 border-dashed border-signoz_slate-400" />

        {/* Common heading section for both tabs */}
        <div className="mx-auto mb-5 flex max-w-4xl flex-col items-center text-center">
          <div className="absolute top-[-80px] z-[0] h-[7rem] !w-[80vw] border !border-l-0 !border-r-0 !border-t-0 border-dashed border-signoz_slate-400" />
          <Heading type={1} className="z-[1]">
            Simple Usage-based Predictable Observability Costs
          </Heading>
          <div className="hidden md:block">
            <SigNozCloudPricingOverview className="w-full" />
          </div>
          <div className="my-5 flex justify-center">
            <div className="flex">
              <nav
                className={`flex items-center space-x-2 rounded-sm border border-signoz_slate-400`}
              >
                <TrackingButton
                  id="btn-signoz-cloud-pricing"
                  type="button"
                  className={`relative z-[2] cursor-pointer border-none ${
                    tab === 'cloud' ? 'bg-signoz_slate-400' : ''
                  } px-4 py-2 text-xs ${tab === 'cloud' ? 'text-white' : 'text-signoz_vanilla-400'}`}
                  onClick={() => setTab('cloud')}
                  clickType="Tab Click"
                  clickName="SigNoz Cloud Tab"
                  clickLocation="Pricing Tabs"
                  clickText="SigNoz cloud"
                >
                  <div className="flex gap-1.5">
                    <Cloud size={14} />
                    SigNoz cloud
                  </div>
                </TrackingButton>
                <TrackingButton
                  id="btn-hosted-in-your-infra-pricing"
                  type="button"
                  className={`ml-0 cursor-pointer border-none ${
                    tab === 'self-managed' ? 'bg-signoz_slate-400' : ''
                  } px-4 py-2 text-xs ${
                    tab === 'self-managed' ? 'text-white' : 'text-signoz_vanilla-400'
                  }`}
                  onClick={() => setTab('self-managed')}
                  clickType="Tab Click"
                  clickName="Hosted In Your Infra Tab"
                  clickLocation="Pricing Tabs"
                  clickText="Hosted in your infra"
                >
                  <div className="relative z-[3] flex gap-1.5">
                    <Server size={14} />
                    Hosted in your infra
                  </div>
                </TrackingButton>
              </nav>
            </div>
          </div>
        </div>

        {tab === 'cloud' ? (
          // Cloud pricing content
          <>
            {/* Cloud Plan */}
            <div className="pricing-plans mx-[8px] grid !max-w-[100%] grid-cols-1 justify-center gap-y-10 md:!max-w-[calc(80vw-24px)] md:max-w-md lg:max-w-6xl lg:grid-cols-2">
              <div className="pricing-card !mb-0 border !border-b-0 !border-l-0 !border-r-0 border-dashed border-signoz_slate-400 bg-opacity-5 px-4 py-5 md:px-8">
                <div>
                  <h3 className="pinkish-gradient text-2xl font-bold tracking-tight">Teams</h3>
                  <p className="mb-4 text-base leading-relaxed text-gray-400">
                    For teams that need high-performing applications.
                  </p>
                  <div className="mb-6 flex items-center justify-between">
                    <p className="m-0 min-w-[72px]">Starts at</p>
                    <div className="w-3/5 border-b border-dashed border-signoz_slate-400" />
                    <div className="flex items-center gap-1.5">
                      <span className="text-base font-medium text-signoz_robin-300">
                        <span className="line-through">$199</span> $49/month
                      </span>
                    </div>
                  </div>
                  <div>
                    <Button id="btn-get-started-pricing-teams-top" className="w-full">
                      <TrackingLink
                        href={'/teams/'}
                        className="flex-center"
                        clickType="Primary CTA"
                        clickName="Sign Up Button"
                        clickText="Get started with SigNoz Cloud"
                        clickLocation="Pricing Teams Cloud Tab Top"
                      >
                        Get started with SigNoz Cloud
                        <ArrowRight size={14} />
                      </TrackingLink>
                    </Button>
                  </div>
                </div>

                <div className="__card__body">
                  <div className={`mt-7 ${styles.packageDetailBlock}`}>
                    <h4 className={`${styles.packageDetailTitle}`}>Pricing</h4>
                    <div className="mb-8 flex flex-col sm:flex-row">
                      <div className="gap-3">
                        <img
                          src="/img/index_features/logs.svg"
                          alt="Logs Icon"
                          className="h-5 w-5"
                        />
                        <span>Logs</span>
                      </div>
                      {/* <div className="w-1/4 border-b border-dashed border-signoz_slate-400" /> */}
                      <span className="item-center flex flex-nowrap justify-center">
                        <span className="flex min-w-[170px] items-center justify-center gap-1">
                          <span className="text-base font-medium text-signoz_robin-300">
                            ${TRACES_AND_LOGS_PRICES[logsRetentionPeriod]}
                          </span>{' '}
                          per GB ingested <span className="hidden md:inline-block">&mdash;</span>
                          &nbsp;
                        </span>
                        <select
                          className="block w-[100px] rounded-sm border border-signoz_slate-400 bg-signoz_ink-400 p-0.5 text-xs text-signoz_vanilla-100 placeholder-gray-400 accent-primary-400 focus:border-primary-500 focus:ring-primary-500 md:p-1 md:text-sm"
                          value={logsRetentionPeriod}
                          onChange={(e) => setLogsRetentionPeriod(Number(e.target.value))}
                        >
                          {RETENTION_PERIOD.TRACES_AND_LOGS.map((option, idx) => (
                            <option
                              key={`${option.days}-${idx}`}
                              value={option.days}
                              className="text-signoz_slate-300"
                            >{`${option.days} days`}</option>
                          ))}
                        </select>
                      </span>
                    </div>
                    <div className="flex flex-col sm:flex-row">
                      <div className="gap-3">
                        <img
                          src="/img/index_features/drafting-compass.svg"
                          alt="Logs Icon"
                          className="h-5 w-5"
                        />
                        <span>Traces</span>
                      </div>
                      {/* <div className="w-1/4 border-b border-dashed border-signoz_slate-400" /> */}
                      <span className="item-center flex flex-nowrap justify-center">
                        <span className="flex min-w-[170px] items-center justify-center gap-1">
                          <span className="text-base font-medium text-signoz_robin-300">
                            ${TRACES_AND_LOGS_PRICES[tracesRetentionPeriod]}
                          </span>{' '}
                          per GB ingested <span className="hidden md:inline-block">&mdash;</span>
                          &nbsp;
                        </span>
                        <select
                          className="block w-[100px] rounded-sm border border-signoz_slate-400 bg-signoz_ink-400 p-0.5 text-xs text-signoz_vanilla-100 placeholder-gray-400 accent-primary-400 focus:border-primary-500 focus:ring-primary-500 md:p-1 md:text-sm"
                          value={tracesRetentionPeriod}
                          onChange={(e) => setTracesRetentionPeriod(Number(e.target.value))}
                        >
                          {RETENTION_PERIOD.TRACES_AND_LOGS.map((option, idx) => (
                            <option
                              key={`${option.days}-${idx}`}
                              value={option.days}
                            >{`${option.days} days`}</option>
                          ))}
                        </select>
                      </span>
                    </div>
                    <div className="flex flex-col sm:flex-row">
                      <div className="gap-3">
                        <img
                          src="/img/index_features/bar-chart-2.svg"
                          alt="Logs Icon"
                          className="h-5 w-5"
                        />
                        <span>Metrics</span>
                      </div>
                      {/* <div className="w-1/4 border-b border-dashed border-signoz_slate-400" /> */}
                      <span className="item-center flex flex-nowrap justify-center">
                        <span className="flex min-w-[170px] items-center justify-center gap-1">
                          <span className="text-base font-medium text-signoz_robin-300">
                            ${METRICS_PRICES[metricsRetentionPeriod]}
                          </span>{' '}
                          per mn samples
                          <span className="hidden md:inline-block">&mdash;</span>
                          &nbsp;
                        </span>
                        <select
                          className="block w-[100px] rounded-sm border border-signoz_slate-400 bg-signoz_ink-400 p-0.5 text-xs text-signoz_vanilla-100 placeholder-gray-400 accent-primary-400 focus:border-primary-500 focus:ring-primary-500 md:p-1 md:text-sm"
                          value={metricsRetentionPeriod}
                          onChange={(e) => setMetricsRetentionPeriod(Number(e.target.value))}
                        >
                          {RETENTION_PERIOD.METRICS.map((option, idx) => (
                            <option
                              key={`${option.months}-${idx}`}
                              value={option.months}
                            >{`${option.months} ${
                              option.months === 1 ? 'month' : 'months'
                            }`}</option>
                          ))}
                        </select>
                      </span>
                    </div>
                    <br />
                    <div>
                      <div className="gap-3">
                        <CircleCheckSolid />
                        <span className="text-signoz_vanilla-400">
                          Usage worth $49 (e.g. 163 GB logs/traces or 490 mn metric samples)
                        </span>
                      </div>
                    </div>
                    <div>
                      <div className="gap-3">
                        <CircleCheckSolid />
                        <span className="text-signoz_vanilla-400">
                          Add as many teammates as you want.
                        </span>
                      </div>
                    </div>
                    <div>
                      <div className="gap-3">
                        <CircleCheckSolid />
                        <span className="text-signoz_vanilla-400">No host-based pricing</span>
                      </div>
                    </div>

                    <div>
                      <div className="gap-3">
                        <CircleInfoSolid />
                        <span>
                          <TrackingLink
                            href={'/pricing/metrics-cost-estimation/'}
                            clickType="Nav Click"
                            clickName="Metrics Pricing Calculator Button"
                            clickText="Learn how the price for metrics is calculated"
                            clickLocation="Pricing Teams Cloud Tab"
                          >
                            Learn how the price for metrics is calculated{' '}
                            <ArrowUpRight size={20} className="inline" />
                          </TrackingLink>
                        </span>
                      </div>
                    </div>

                    <div>
                      <div className="gap-3">
                        <CircleInfoSolid />
                        <span>
                          <TrackingLink
                            href={'/docs/logs-management/long-term-storage/'}
                            clickType="Nav Click"
                            clickName="Long Term Logs Storage Link"
                            clickText="Long term Logs Storage options"
                            clickLocation="Pricing Teams Cloud Tab"
                          >
                            Long term Logs Storage options{' '}
                            <ArrowUpRight size={20} className="inline" />
                          </TrackingLink>
                        </span>
                      </div>
                    </div>
                    <br />
                  </div>
                  <div className={` mt-7 ${styles.support} ${styles.packageDetailBlock}`}>
                    <h4 className={`${styles.packageDetailTitle}`}>Support</h4>
                    <div>
                      <div className="gap-3">
                        <CircleCheckSolid color="fill-signoz_sienna-400" />
                        <span className="text-signoz_vanilla-400">In-Product Chat Support</span>
                      </div>
                    </div>
                    <div>
                      <div className="gap-3">
                        <CircleCheckSolid color="fill-signoz_sienna-400" />
                        <span className="text-signoz_vanilla-400">Email</span>
                      </div>
                    </div>
                    <div>
                      <div className="gap-3">
                        <CircleCheckSolid color="fill-signoz_sienna-400" />
                        <span className="text-signoz_vanilla-400">
                          Support for Migrating DataDog Dashboards
                        </span>
                        <span className="rounded-full border border-none bg-signoz_slate-400 px-2 py-1 text-center !text-[10px] uppercase text-signoz_vanilla-400 sm:text-xs">
                          On spends above $999 per month
                        </span>
                      </div>
                    </div>
                    <div>
                      <div className="gap-3">
                        <CircleCheckSolid color="fill-signoz_sienna-400" />
                        <span className="text-signoz_vanilla-400">Dedicated Slack Channel</span>
                        <span className="rounded-full border border-none bg-signoz_slate-400 px-2 py-1 text-center !text-[10px] uppercase text-signoz_vanilla-400 sm:text-xs">
                          On spends above $999 per month
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className={styles.packageDetailBlock}>
                    <h4 className={`mt-7 ${styles.packageDetailTitle}`}>Features</h4>
                    <ul className="ul-no-padding">
                      <li className="mb-3 flex items-center gap-3">
                        {' '}
                        <CircleCheckSolid /> APM & Distributed Tracing
                      </li>
                      <li className="mb-3 flex items-center gap-3">
                        {' '}
                        <CircleCheckSolid /> Log Management
                      </li>
                      <li className="mb-3 flex items-center gap-3">
                        {' '}
                        <CircleCheckSolid /> Infrastructure Monitoring
                      </li>
                      <li className="mb-3 flex items-center gap-3">
                        {' '}
                        <CircleCheckSolid /> Exceptions Monitoring
                      </li>
                      <li className="mb-3 flex items-center gap-3">
                        {' '}
                        <CircleCheckSolid /> Alerts Management
                      </li>
                      <li className="mb-3 flex items-center gap-3">
                        {' '}
                        <CircleCheckSolid /> OTel-Native Messaging Queue Monitoring
                      </li>
                      <li className="mb-3 flex items-center gap-3">
                        {' '}
                        <CircleCheckSolid /> Correlation of Signals
                      </li>
                      <li className="mb-3 flex items-center gap-3">
                        {' '}
                        <CircleCheckSolid /> SSO and SAML Support
                      </li>
                      <li className="mb-3 flex items-center gap-3">
                        {' '}
                        <CircleCheckSolid /> Anomaly Detection
                      </li>
                      <li className="mb-3 flex items-center gap-3">
                        {' '}
                        <CircleCheckSolid /> Support for Multiple Ingestion Keys
                      </li>
                      <li className="mb-3 flex items-center gap-3">
                        {' '}
                        <CircleCheckSolid /> Support for Rate Limits based on Ingestion keys
                      </li>
                      <li className="mb-3 flex items-center gap-3">
                        {' '}
                        <CircleCheckSolid /> Service Dependency Visualization
                      </li>
                      <li className="mb-3 flex items-center gap-3">
                        {' '}
                        <CircleCheckSolid /> Live Tail Logging
                      </li>
                      <li className="mb-3 flex items-center gap-3">
                        {' '}
                        <CircleCheckSolid /> Unlimited Logs, Metrics & Traces based Dashboards
                      </li>
                      <li className="mb-3 flex items-center gap-3">
                        {' '}
                        <CircleCheckSolid /> Dashboard locking
                      </li>
                      <li className="mb-3 flex items-center gap-3">
                        {' '}
                        <CircleCheckSolid /> Visualize very large traces
                        <span className="rounded-full border border-none bg-signoz_slate-400 px-2 py-1 text-center !text-[10px] uppercase text-signoz_vanilla-400">
                          &gt;10k spans
                        </span>
                      </li>
                      <li className="mb-3 flex items-center gap-3">
                        {' '}
                        <CircleCheckSolid /> Data centers available in the US, EU & India
                      </li>
                    </ul>
                  </div>
                  <div className={styles.packageDetailBlock}>
                    <h4 className={`mt-7 ${styles.packageDetailTitle}`}>Compliance</h4>
                    <ul className="ul-no-padding">
                      <li className="mb-3 flex items-center gap-3">
                        {' '}
                        <CircleCheckSolid /> SOC2 Type II Compliant
                      </li>
                      <li className="mb-3 flex items-center gap-3">
                        {' '}
                        <CircleCheckSolid /> HIPAA Compliant
                      </li>
                      <li className="mb-6 flex items-center gap-3">
                        {' '}
                        <CircleCheckSolid /> BAA Agreement
                        <span className="rounded-full border border-none bg-signoz_slate-400 px-2 py-1 text-center !text-[10px] uppercase text-signoz_vanilla-400 sm:text-xs">
                          Add On
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="">
                  <Button id="btn-get-started-pricing-teams-bottom" className="w-full">
                    <TrackingLink
                      href={'/teams/'}
                      className="flex-center"
                      clickType="Primary CTA"
                      clickName="Sign Up Button"
                      clickText="Get started with SigNoz Cloud"
                      clickLocation="Pricing Teams Cloud Tab Bottom"
                    >
                      Get started with SigNoz Cloud
                      <ArrowRight size={14} />
                    </TrackingLink>
                  </Button>
                </div>

                <div className="mt-3 md:my-3">
                  <TrackingButtonSigNozTheme
                    id="btn-estimate-monthly-bill-pricing-teams"
                    className="w-full"
                    type={Button.TYPES.SECONDARY}
                    onClick={() => {
                      const element = document.getElementById('estimate-your-monthly-bill')
                      element?.scrollIntoView({
                        behavior: 'smooth',
                      })
                    }}
                    clickType="Secondary CTA"
                    clickName="Pricing Calculator Button"
                    clickText="Estimate your monthly bill"
                    clickLocation="Pricing Teams Cloud Tab Bottom"
                  >
                    Estimate your monthly bill
                    <ArrowDown size={14} />
                  </TrackingButtonSigNozTheme>
                </div>
              </div>
              <div className="pricing-card !mb-0 border !border-b-0 !border-r-0 border-dashed border-signoz_slate-400 bg-opacity-5 px-4 py-5 max-sm:!border-l-0 md:px-8">
                <div>
                  <h3 className="font-heading orangish-gradient text-2xl font-bold">
                    Enterprise Cloud
                  </h3>
                  <p className="mb-4 text-base leading-relaxed text-gray-400">
                    For larger orgs with advanced security, compliance and support.
                  </p>
                  <div className="mb-6 flex items-center justify-between">
                    <p className="m-0 min-w-[72px]">Starts at</p>
                    <div className="w-3/5 border-b border-dashed border-signoz_slate-400" />
                    <div className="flex items-center gap-1.5">
                      <span className="text-base font-medium text-signoz_robin-300">
                        $4000/Month
                      </span>
                    </div>
                  </div>
                  <div className="mb-6 flex items-center gap-3">
                    <ZapSolid />
                    <p className="m-0">Flexible Pricing for scale and long term commitments</p>
                  </div>
                  <div>
                    <Button
                      className="w-full"
                      type={Button.TYPES.SECONDARY}
                      id="btn-contact-us-pricing-enterprise-top"
                    >
                      <TrackingLink
                        href={'/enterprise-cloud/'}
                        className="flex-center"
                        clickType="Secondary CTA"
                        clickName="Enterprise Cloud Contact Button"
                        clickText="Contact us"
                        clickLocation="Pricing Enterprise Cloud Tab Top"
                      >
                        Contact us
                        <ArrowRight size={14} />
                      </TrackingLink>
                    </Button>
                    <div className="mt-4 text-center text-sm text-signoz_robin-300 hover:text-signoz_robin-400">
                      <Link
                        href={'/enterprise/'}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center"
                      >
                        Check All Enterprise Plans
                        <ArrowUpRight className="ml-2 h-4 w-4" />
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="__card__body">
                  <div className={`mt-7 ${styles.pricingDetails} ${styles.packageDetailBlock}`}>
                    <h4 className={`${styles.packageDetailTitle}`}>Pricing</h4>
                    <div></div>
                    <div>
                      <div className="gap-3">
                        <CircleCheckSolid />
                        <span className="text-signoz_vanilla-400">Custom Pricing</span>
                      </div>
                    </div>
                    <div>
                      <div className="gap-3">
                        <CircleCheckSolid />
                        <span className="text-signoz_vanilla-400">Custom Retention</span>
                      </div>
                    </div>
                  </div>

                  <div className={`mt-7`}>
                    <h4 className={`${styles.packageDetailTitle}`}>Support</h4>
                    <ul className="ul-no-padding">
                      <li className="mb-2 flex items-center gap-3 text-signoz_vanilla-400">
                        {' '}
                        <CircleCheckSolid color="fill-signoz_sienna-400" /> Email
                      </li>
                      <li className="mb-2 flex items-center gap-3 text-signoz_vanilla-400">
                        {' '}
                        <CircleCheckSolid color="fill-signoz_sienna-400" /> Dedicated Slack Channel
                      </li>
                      <li className="mb-2 flex items-center gap-3 text-signoz_vanilla-400">
                        {' '}
                        <CircleCheckSolid color="fill-signoz_sienna-400" /> In-Product Chat Support
                      </li>
                      <li className="mb-2 flex items-center gap-3 text-signoz_vanilla-400">
                        {' '}
                        <CircleCheckSolid color="fill-signoz_sienna-400" /> Support for Migrating
                        DataDog Dashboards
                      </li>
                      <li className="mb-2 flex items-center gap-3 text-signoz_vanilla-400">
                        {' '}
                        <CircleCheckSolid color="fill-signoz_sienna-400" /> Team Training
                      </li>
                      <li className="mb-2 flex items-center gap-3 text-signoz_vanilla-400">
                        {' '}
                        <CircleCheckSolid color="fill-signoz_sienna-400" /> Dashboard Configuration
                        Support
                      </li>
                      <li className="mb-2 flex items-center gap-3 text-signoz_vanilla-400">
                        {' '}
                        <CircleCheckSolid color="fill-signoz_sienna-400" /> Instrumentation Support
                      </li>
                      <li className="flex items-center gap-3 text-signoz_vanilla-400">
                        {' '}
                        <CircleCheckSolid color="fill-signoz_sienna-400" /> SLA w/ downtime
                        developer pairing
                      </li>
                    </ul>
                  </div>
                  <div className={styles.packageDetailBlock}>
                    <h4 className={`mb-4 mt-7 ${styles.packageDetailTitle}`}>Features</h4>
                    <ul className="ul-no-padding">
                      <li className="mb-3 flex items-center gap-3">
                        {' '}
                        <CircleCheckSolid /> Includes all features in Teams plan
                      </li>
                      {/* <li className="mb-3 flex items-center gap-3">
                        {' '}
                        <CircleCheckSolid /> Custom integration for metrics and logs
                        <div className="!mb-0 rounded-[50px] border border-none bg-signoz_aqua-400 px-1.5 py-px text-[10px] font-semibold uppercase text-signoz_ink-400">
                          new
                        </div>
                      </li> */}
                      <li className="mb-3 flex items-center gap-3">
                        {' '}
                        <CircleCheckSolid /> AWS Private Link
                        {/* <div className="!mb-0 rounded-[50px] border border-none bg-signoz_aqua-400 px-1.5 py-px text-[10px] font-semibold uppercase text-signoz_ink-400">
                          new
                        </div> */}
                      </li>
                      <li className="mb-3 flex items-center gap-3">
                        {' '}
                        <CircleCheckSolid /> VPC Peering
                      </li>
                    </ul>
                  </div>
                  {/* <div className={styles.packageDetailBlock}>
                    <h4 className={`mb-4 mt-7 ${styles.packageDetailTitle}`}>Compliance</h4>
                    <ul className="ul-no-padding">
                      <li className="mb-3 flex items-center gap-3">
                        {' '}
                        <CircleCheckSolid /> BAA Agreement
                        <span className="rounded-full border border-none bg-signoz_slate-400 px-2 py-1 text-center !text-[10px] uppercase text-signoz_vanilla-400 sm:text-xs">
                          Add On
                        </span>
                      </li>
                    </ul>
                  </div> */}
                  <div className={styles.packageDetailBlock}>
                    <h4 className={`mt-7 ${styles.packageDetailTitle}`}>Coming soon</h4>
                    <ul className="ul-no-padding">
                      <li className="mb-2 flex items-center gap-3 text-signoz_vanilla-400">
                        {' '}
                        <ClockSolid /> Finer RBAC with custom roles
                      </li>
                      <li className="mb-2 flex items-center gap-3 text-signoz_vanilla-400">
                        {' '}
                        <ClockSolid /> Audit Logs
                      </li>
                      <li className="mb-2 flex items-center gap-3 text-signoz_vanilla-400">
                        {' '}
                        <ClockSolid /> Custom retention for different sources of logs
                      </li>
                      <li className="mb-4 flex items-center gap-3 text-signoz_vanilla-400">
                        {' '}
                        <ClockSolid /> Multi-tenancy
                      </li>
                    </ul>
                  </div>
                </div>
                <div className={`__card__footer ${styles.card__footer}`}>
                  <Button
                    className="w-full"
                    type={Button.TYPES.SECONDARY}
                    id="btn-contact-us-pricing-enterprise-bottom"
                  >
                    <TrackingLink
                      href={'/enterprise-cloud/'}
                      className="flex-center"
                      clickType="Primary CTA"
                      clickName="Enterprise Cloud Contact Button"
                      clickText="Contact us"
                      clickLocation="Pricing Enterprise Cloud Tab Bottom"
                    >
                      Contact us
                      <ArrowRight size={14} />
                    </TrackingLink>
                  </Button>
                  <div className="mt-4 text-center text-sm text-signoz_robin-300 hover:text-signoz_robin-400">
                    <Link
                      href={'/enterprise/'}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center"
                    >
                      Check All Enterprise Plans
                      <ArrowUpRight className="ml-2 h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          // Self-managed pricing content
          <>
            <div className="pricing-plans mx-[8px] grid max-w-[100vw] grid-cols-1 justify-center gap-y-10 md:!max-w-[calc(80vw-24px)] lg:max-w-6xl lg:grid-cols-2">
              <div className="pricing-card !mb-0 border !border-b-0 !border-l-0 !border-r-0 border-dashed border-signoz_slate-400 bg-opacity-5 px-4 py-5 md:px-8 ">
                <div>
                  <h3 className="font-heading pinkish-gradient text-2xl font-bold">
                    Community Edition
                  </h3>
                  <p className="mb-4 text-base leading-relaxed text-gray-400">Free to Self Host</p>
                  <div className="flex items-center gap-3">
                    <p>Install in your infra</p>
                  </div>
                  <div>
                    <Button className="w-full" id="btn-documentation-pricing-community-edition-top">
                      <TrackingLink
                        href={'/docs/install/'}
                        className="flex-center"
                        clickType="Primary CTA"
                        clickName="Docs Link"
                        clickText="Documentation"
                        clickLocation="Pricing Community Edition Tab Top"
                      >
                        Documentation
                        <ArrowRight size={14} />
                      </TrackingLink>
                    </Button>
                  </div>
                </div>
                <div></div>
                <div className="__card__body">
                  <div className={`mt-7 ${styles.support} ${styles.packageDetailBlock}`}>
                    <h4 className={styles.packageDetailTitle}>Support</h4>
                    <div>
                      <div className="gap-3">
                        <CircleCheckSolid color="fill-signoz_sienna-400" />
                        <span className="text-signoz_vanilla-400">Community Slack</span>
                      </div>
                    </div>
                  </div>
                  <div className={`mt-7 ${styles.packageDetailBlock}`}>
                    <h4 className={styles.packageDetailTitle}>Features</h4>
                    <ul className="ul-no-padding">
                      <li className="mb-3 flex items-center gap-3">
                        {' '}
                        <CircleCheckSolid /> APM & Distributed Tracing
                      </li>
                      <li className="mb-3 flex items-center gap-3">
                        {' '}
                        <CircleCheckSolid /> Log Management
                      </li>
                      <li className="mb-3 flex items-center gap-3">
                        {' '}
                        <CircleCheckSolid /> Infrastructure Monitoring
                      </li>
                      <li className="mb-3 flex items-center gap-3">
                        {' '}
                        <CircleCheckSolid /> Exceptions Monitoring
                      </li>
                      <li className="mb-3 flex items-center gap-3">
                        {' '}
                        <CircleCheckSolid /> Alerts Management
                      </li>
                      <li className="mb-3 flex items-center gap-3">
                        {' '}
                        <CircleCheckSolid /> OTel-Native Messaging Queue Monitoring
                      </li>
                      <li className="mb-3 flex items-center gap-3">
                        {' '}
                        <CircleCheckSolid /> SSO support with Google OAuth
                      </li>
                      <li className="mb-3 flex items-center gap-3">
                        {' '}
                        <CircleCheckSolid /> Query API Keys
                      </li>
                      <li className="mb-3 flex items-center gap-3">
                        {' '}
                        <CircleCheckSolid /> Correlation of Signals
                      </li>
                      <li className="mb-3 flex items-center gap-3">
                        {' '}
                        <CircleCheckSolid /> Service Dependency Visualization
                      </li>
                      <li className="mb-3 flex items-center gap-3">
                        {' '}
                        <CircleCheckSolid /> Unlimited Logs, Metrics & Traces based Dashboards
                      </li>
                      <li className="mb-6 flex items-center gap-3">
                        {' '}
                        <CircleCheckSolid /> Visualize very large traces
                        <span className="rounded-full border border-none bg-signoz_slate-400 px-2 py-1 text-center !text-[10px] uppercase text-signoz_vanilla-400">
                          &gt;10k spans
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
                <div>
                  <Button className="w-full" id="btn-documentation-pricing-community-edition-top">
                    <TrackingLink
                      href={'/docs/install/'}
                      className="flex-center"
                      clickType="Primary CTA"
                      clickName="Docs Link"
                      clickText="Documentation"
                      clickLocation="Pricing Community Edition Tab Bottom"
                    >
                      Documentation
                      <ArrowRight size={14} />
                    </TrackingLink>
                  </Button>
                </div>
              </div>
              <div className="pricing-card !mb-0 border !border-b-0 !border-r-0 border-dashed border-signoz_slate-400 bg-opacity-5 px-4 py-5 max-sm:!border-l-0 md:px-8">
                <div>
                  <h3 className="font-heading orangish-gradient text-2xl font-bold">
                    Enterprise Edition
                  </h3>
                  <p className="mb-4 text-base leading-relaxed text-gray-400">
                    For at-scale orgs who want to host SigNoz in their own infra.
                  </p>
                  <div className="mb-6 flex items-center justify-between">
                    <p className="m-0 min-w-[72px]">Starts at</p>
                    <div className="w-3/5 border-b border-dashed border-signoz_slate-400" />
                    <div className="flex items-center gap-1.5">
                      <span className="text-base font-medium text-signoz_robin-300">
                        $4000/Month
                      </span>
                    </div>
                  </div>
                  <div>
                    <Button
                      className="w-full"
                      type={Button.TYPES.SECONDARY}
                      id="btn-contact-us-pricing-enterprise-edition-top"
                    >
                      <TrackingLink
                        href={'/enterprise-self-hosted'}
                        className="flex-center"
                        clickType="Secondary CTA"
                        clickName="Self Hosted Enterprise Contact Button"
                        clickText="Contact us"
                        clickLocation="Pricing Self Hosted Enterprise Edition Tab Top"
                      >
                        Contact us
                        <ArrowRight size={14} />
                      </TrackingLink>
                    </Button>
                    <div className="mt-4 text-center text-sm text-signoz_robin-300 hover:text-signoz_robin-400">
                      <Link
                        href={'/enterprise/'}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center"
                      >
                        Check All Enterprise Plans
                        <ArrowUpRight className="ml-2 h-4 w-4" />
                      </Link>
                    </div>
                  </div>

                  <p className="mb-4 text-base leading-relaxed text-gray-400"></p>
                </div>
                <div className="__card__body">
                  {/* <div
                    className={`${styles.pricingDetails} ${styles.packageDetailBlock}`}
                  >
                    <h4 className={styles.packageDetailTitle}>Pricing</h4>
                    <div></div>
                    <div>
                      <span>Custom Pricing</span>
                      <span>
                        <RightSVG />
                      </span>
                    </div>
                  </div>
                  <Divider isDashed /> */}
                  <div className={`mt-7 ${styles.deploymentOptions} ${styles.packageDetailBlock}`}>
                    <h4 className={`${styles.packageDetailTitle}`}>Deployment Options</h4>
                    <div>
                      <ul className="ul-no-padding">
                        <li className="mb-3 flex items-center gap-3">
                          {' '}
                          <CircleCheckSolid /> Self Host with support contract by SigNoz team
                        </li>
                        <li className="flex items-center gap-3">
                          {' '}
                          <CircleCheckSolid /> Managed by SigNoz in your cloud
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className={`mt-7`}>
                    <h4 className={`${styles.packageDetailTitle}`}>Support</h4>
                    <ul className="ul-no-padding">
                      <li className="mb-2 flex items-center gap-3 text-signoz_vanilla-400">
                        {' '}
                        <CircleCheckSolid color="fill-signoz_sienna-400" /> Email
                      </li>
                      <li className="mb-2 flex items-center gap-3 text-signoz_vanilla-400">
                        {' '}
                        <CircleCheckSolid color="fill-signoz_sienna-400" /> Dedicated Slack Channel
                      </li>
                      <li className="mb-2 flex items-center gap-3 text-signoz_vanilla-400">
                        {' '}
                        <CircleCheckSolid color="fill-signoz_sienna-400" /> Support for Migrating
                        DataDog Dashboards
                      </li>
                      <li className="mb-2 flex items-center gap-3 text-signoz_vanilla-400">
                        {' '}
                        <CircleCheckSolid color="fill-signoz_sienna-400" /> Team Training
                      </li>
                      <li className="mb-2 flex items-center gap-3 text-signoz_vanilla-400">
                        {' '}
                        <CircleCheckSolid color="fill-signoz_sienna-400" /> Dashboard Configuration
                        Support
                      </li>
                      <li className="mb-2 flex items-center gap-3 text-signoz_vanilla-400">
                        {' '}
                        <CircleCheckSolid color="fill-signoz_sienna-400" /> Instrumentation Support
                      </li>
                      <li className="flex items-center gap-3 text-signoz_vanilla-400">
                        {' '}
                        <CircleCheckSolid color="fill-signoz_sienna-400" /> SLA w/ downtime
                        developer pairing
                      </li>
                    </ul>
                  </div>
                  <div className={`mt-7 ${styles.packageDetailBlock}`}>
                    <h4 className={`${styles.packageDetailTitle}`}>Features</h4>
                    <p className="mt-1 text-sm text-signoz_vanilla-400">
                      Includes all features in community edition
                    </p>
                    <ul className="ul-no-padding">
                      <li className="mb-3 flex items-center gap-3">
                        {' '}
                        <CircleCheckSolid /> SAML Support
                      </li>
                      <li className="mb-3 flex items-center gap-3">
                        {' '}
                        <CircleCheckSolid /> Security tightening for on-prem installation
                      </li>
                      <li className="mb-3 flex items-center gap-3">
                        {' '}
                        <CircleCheckSolid /> Monitor Health of SigNoz
                      </li>
                      
                    </ul>
                  </div>
                  <div className={`mt-7 ${styles.packageDetailBlock}`}>
                    <h4 className={`${styles.packageDetailTitle}`}>Coming soon</h4>
                    <ul className="ul-no-padding">
                      <li className="mb-2 flex items-center gap-3 text-signoz_vanilla-400">
                        {' '}
                        <ClockSolid /> Finer RBAC with custom roles
                      </li>
                      <li className="mb-2 flex items-center gap-3 text-signoz_vanilla-400">
                        {' '}
                        <ClockSolid /> Audit Logs
                      </li>
                      <li className="mb-2 flex items-center gap-3 text-signoz_vanilla-400">
                        {' '}
                        <ClockSolid /> Custom retention for different sources of logs
                      </li>
                      <li className="mb-2 flex items-center gap-3 text-signoz_vanilla-400">
                        {' '}
                        <ClockSolid /> Multi-tenancy
                      </li>
                    </ul>
                  </div>
                </div>
                <div className={`__card__footer ${styles.card__footer}`}>
                  <Button
                    className="w-full"
                    type={Button.TYPES.SECONDARY}
                    id="btn-contact-us-pricing-enterprise-edition-bottom"
                  >
                    <TrackingLink
                      href={'/enterprise-self-hosted/'}
                      className="flex-center"
                      clickType="Secondary CTA"
                      clickName="Self Hosted Enterprise Contact Button"
                      clickText="Contact us"
                      clickLocation="Pricing Self Hosted Enterprise Edition Tab Bottom"
                    >
                      Contact us
                      <ArrowRight size={14} />
                    </TrackingLink>
                  </Button>
                  <div className="mt-4 text-center text-sm text-signoz_robin-300 hover:text-signoz_robin-400">
                    <Link
                      href={'/enterprise/'}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center"
                    >
                      Check All Enterprise Plans
                      <ArrowUpRight className="ml-2 h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  )
}

const ExploreAllFeature = () => {
  const [isOpened, setIsOpened] = useState(false)

  const ALL_FEATURES_DATA = {
    HEADER: [
      { heading: '', desc: '' },
      {
        heading: 'Community Edition',
        desc: '$0 ⎯ host in your infra',
        action: (
          <TrackingLink
            href={'/docs/introduction'}
            className="button-background flex h-8 w-full items-center justify-center gap-1.5 truncate rounded-full px-4 py-2 text-center text-[7px] font-medium leading-5 text-white sm:text-sm"
            clickType="Secondary CTA"
            clickName="Docs Link"
            clickText="Read Documentation"
            clickLocation="Explore All Features Table"
            id="btn-documentation-pricing-table"
          >
            Read Documentation
          </TrackingLink>
        ),
      },
      {
        heading: 'Teams',
        desc: 'Cloud ⎯ starts at $49/mo',
        action: (
          <TrackingLink
            href={'/teams/'}
            className="flex h-8 w-full items-center justify-center gap-1.5 truncate rounded-full bg-signoz_robin-500 px-4 py-2 text-center text-[9px] font-medium leading-5 text-white sm:text-sm"
            clickType="Secondary CTA"
            clickName="Sign Up Button"
            clickText="Get Started"
            clickLocation="Explore All Features Table"
            id="btn-get-started-pricing-table"
          >
            Get Started
          </TrackingLink>
        ),
      },
      {
        heading: 'Enterprise',
        desc: 'Cloud /  Self-Hosted',
        action: (
          <TrackingLink
            href={'/enterprise-cloud/'}
            className="button-background flex h-8 w-full items-center justify-center gap-1.5 rounded-full px-4 py-2 text-center text-[9px] font-medium text-white sm:text-sm"
            clickType="Secondary CTA"
            clickName="Contact Us Button"
            clickText="Contact Us"
            clickLocation="Explore All Features Table"
            id="btn-contact-us-pricing-table"
          >
            Contact Us
          </TrackingLink>
        ),
      },
    ],
    ROWS: [
      {
        section: 'APM & Distributed Tracing',
        features: [
          {
            feature: 'Out of Box APM metrics',
            inCommunity: <CheckSolid />,
            inTeams: <CheckSolid />,
            inEnterprise: <CheckSolid />,
          },
          {
            feature: 'Filtering and creating dashboards based on traces data',
            inCommunity: <CheckSolid />,
            inTeams: <CheckSolid />,
            inEnterprise: <CheckSolid />,
          },
          {
            feature: 'Creating alerts based on traces data',
            inCommunity: <CheckSolid />,
            inTeams: <CheckSolid />,
            inEnterprise: <CheckSolid />,
          },
          {
            feature: 'Unlimited dashboards & alerts based on traces',
            inCommunity: <CheckSolid />,
            inTeams: <CheckSolid />,
            inEnterprise: <CheckSolid />,
          },
          {
            feature: 'Advanced visualization for very large traces (>10K spans)',
            inCommunity: <CheckSolid />,
            inTeams: <CheckSolid />,
            inEnterprise: <CheckSolid />,
          },
        ],
      },
      {
        section: 'Log Management',
        features: [
          {
            feature: 'Parsing logs via pipeline',
            inCommunity: <CheckSolid />,
            inTeams: <CheckSolid />,
            inEnterprise: <CheckSolid />,
          },
          {
            feature: 'Create direct filters from JSON logs',
            inCommunity: <CheckSolid />,
            inTeams: <CheckSolid />,
            inEnterprise: <CheckSolid />,
          },
          {
            feature: 'Saved Views for logs',
            inCommunity: <CheckSolid />,
            inTeams: <CheckSolid />,
            inEnterprise: <CheckSolid />,
          },
          {
            feature: 'Live tail Logging',
            inCommunity: <CheckSolid />,
            inTeams: <CheckSolid />,
            inEnterprise: <CheckSolid />,
          },
          {
            feature: 'Unlimited dashboards & alerts based on logs',
            inCommunity: <CheckSolid />,
            inTeams: <CheckSolid />,
            inEnterprise: <CheckSolid />,
          },
        ],
      },
      {
        section: 'Infrastructure Monitoring',
        features: [
          {
            feature: 'Out of the box dashboards for hostmetrics',
            inCommunity: <CheckSolid />,
            inTeams: <CheckSolid />,
            inEnterprise: <CheckSolid />,
          },
          {
            feature: 'Kubernetes Monitoring',
            inCommunity: <CheckSolid />,
            inTeams: <CheckSolid />,
            inEnterprise: <CheckSolid />,
          },
          {
            feature: 'Container Monitoring',
            inCommunity: <CheckSolid />,
            inTeams: <CheckSolid />,
            inEnterprise: <CheckSolid />,
          },
          {
            feature: 'Unlimited dashboards & alerts based on metrics',
            inCommunity: <CheckSolid />,
            inTeams: <CheckSolid />,
            inEnterprise: <CheckSolid />,
          },
        ],
      },
      {
        section: 'Exceptions Monitoring',
        features: [
          {
            feature: 'Separate view of exceptions based on Trace data',
            inCommunity: <CheckSolid />,
            inTeams: <CheckSolid />,
            inEnterprise: <CheckSolid />,
          },
        ],
      },
      {
        section: 'Alerts Management',
        features: [
          {
            feature: 'Create alerts directly from dashboards',
            inCommunity: <CheckSolid />,
            inTeams: <CheckSolid />,
            inEnterprise: <CheckSolid />,
          },
          {
            feature: 'Support for Slack, Pagerduty, OpsGenie & webhooks as alert channel',
            inCommunity: <CheckSolid />,
            inTeams: <CheckSolid />,
            inEnterprise: <CheckSolid />,
          },
          {
            feature: 'Anomaly Detection',
            inCommunity: <CrossSolid />,
            inTeams: <CheckSolid />,
            inEnterprise: <CheckSolid />,
          },
          {
            feature: 'Alert as Code',
            inCommunity: <CrossSolid />,
            inTeams: <CheckSolid />,
            inEnterprise: <CheckSolid />,
          },
          {
            feature: 'MS Teams as alert channel',
            inCommunity: <CheckSolid />,
            inTeams: <CheckSolid />,
            inEnterprise: <CheckSolid />,
          },
        ],
      },
      {
        section: 'OTel-native Messaging Queue Monitoring',
        features: [
          {
            feature: 'Producer Latency, Consumer Lag, Partition Latency Views',
            inCommunity: <CheckSolid />,
            inTeams: <CheckSolid />,
            inEnterprise: <CheckSolid />,
          },
        ],
      },
      {
        section: 'Correlation of Signals',
        features: [
          {
            feature: 'APM metrics to traces',
            inCommunity: <CheckSolid />,
            inTeams: <CheckSolid />,
            inEnterprise: <CheckSolid />,
          },
          {
            feature: 'Traces to logs',
            inCommunity: <CheckSolid />,
            inTeams: <CheckSolid />,
            inEnterprise: <CheckSolid />,
          },
          {
            feature: 'Logs to traces',
            inCommunity: <CheckSolid />,
            inTeams: <CheckSolid />,
            inEnterprise: <CheckSolid />,
          },
          {
            feature: 'Logs to infrastructure metrics',
            inCommunity: <CheckSolid />,
            inTeams: <CheckSolid />,
            inEnterprise: <CheckSolid />,
          },
        ],
      },
      {
        section: 'Data Pipelines',
        features: [
          {
            feature: 'Support for Cold Storage for long term data archival',
            inCommunity: <CheckSolid />,
            inTeams: <CheckSolid />,
            inEnterprise: <CheckSolid />,
          },
        ],
      },
      {
        section: 'Service Dependency Visualization',
        features: [
          {
            feature: 'Overview of your application graph with health indication',
            inCommunity: <CheckSolid />,
            inTeams: <CheckSolid />,
            inEnterprise: <CheckSolid />,
          },
        ],
      },
      {
        section: 'Configuration',
        features: [
          {
            feature: 'SSO Support',
            inCommunity: <CheckSolid />,
            inTeams: <CheckSolid />,
            inEnterprise: <CheckSolid />,
          },
          {
            feature: 'SAML Support',
            inCommunity: <CrossSolid />,
            inTeams: <CheckSolid />,
            inEnterprise: <CheckSolid />,
          },
          {
            feature: 'Support for Multiple Ingestion Keys',
            inCommunity: <CrossSolid />,
            inTeams: <CheckSolid />,
            inEnterprise: <CheckSolid />,
          },
          {
            feature: 'Support for Rate Limits based on Ingestion keys',
            inCommunity: <CrossSolid />,
            inTeams: <CheckSolid />,
            inEnterprise: <CheckSolid />,
          },
          {
            feature: 'Dashboard Locking & Access control',
            inCommunity: <CrossSolid />,
            inTeams: <CheckSolid />,
            inEnterprise: <CheckSolid />,
          },
          {
            feature: 'Access Data in SigNoz from Anywhere (via API keys)',
            inCommunity: <CheckSolid />,
            inTeams: <CheckSolid />,
            inEnterprise: <CheckSolid />,
          },
          {
            feature: 'Security tightening for on-premise installation',
            inCommunity: <CrossSolid />,
            inTeams: <CrossSolid />,
            inEnterprise: (
              <div className="flex items-center">
                <ServerSolid />
                <span className="ml-1.5 text-[10px] max-sm:text-[8px]">
                  ENTERPRISE SELF-MANAGED
                </span>
              </div>
            ),
          },
          {
            feature: 'Monitor Health of SigNoz',
            inCommunity: <CrossSolid />,
            inTeams: <CrossSolid />,
            inEnterprise: (
              <div className="flex items-center">
                <ServerSolid />
                <span className="ml-1.5 text-[10px] max-sm:text-[8px]">
                  ENTERPRISE SELF-MANAGED
                </span>
              </div>
            ),
          },
          {
            feature: 'Custom retention for different sources of logs',
            inCommunity: <CrossSolid />,
            inTeams: (
              <div className="flex items-center">
                <ClockSolid height="15" width="15" />
                <span className="ml-1.5 text-[8px] sm:text-xs">COMING SOON</span>
              </div>
            ),
            inEnterprise: (
              <div className="flex items-center">
                <ClockSolid height="15" width="15" />
                <span className="ml-1.5 text-[8px] sm:text-xs">COMING SOON</span>
              </div>
            ),
          },
          {
            feature: 'Finer RBAC with custom roles',
            inCommunity: <CrossSolid />,
            inTeams: <CrossSolid />,
            inEnterprise: (
              <div className="flex items-center">
                <ClockSolid height="15" width="15" />
                <span className="ml-1.5 text-[8px] sm:text-xs">COMING SOON</span>
              </div>
            ),
          },
          {
            feature: 'AWS Private link',
            inCommunity: <CrossSolid />,
            inTeams: <CrossSolid />,
            inEnterprise: (
              <div className="flex items-center">
                <CloudSolid />
                <span className="ml-1.5 text-[8px] sm:text-xs">ENTERPRISE CLOUD</span>
              </div>
            ),
          },
          {
            feature: 'Audit Logs',
            inCommunity: <CrossSolid />,
            inTeams: <CrossSolid />,
            inEnterprise: (
              <div className="flex items-center">
                <ClockSolid height="15" width="15" />
                <span className="ml-1.5 text-[8px] sm:text-xs">COMING SOON</span>
              </div>
            ),
          },
          {
            feature: 'Multi-tenancy',
            inCommunity: <CrossSolid />,
            inTeams: <CrossSolid />,
            inEnterprise: (
              <div className="flex items-center">
                <ClockSolid height="15" width="15" />
                <span className="ml-1.5 text-[8px] sm:text-xs">COMING SOON</span>
              </div>
            ),
          },
        ],
      },

      {
        section: 'Support',
        features: [
          {
            feature: 'Community Support on Slack',
            inCommunity: <CheckSolid />,
            inTeams: <CheckSolid />,
            inEnterprise: <CheckSolid />,
          },
          {
            feature: 'Email Support',
            inCommunity: <CrossSolid />,
            inTeams: <CheckSolid />,
            inEnterprise: <CheckSolid />,
          },
          {
            feature: 'In product chat support',
            inCommunity: <CrossSolid />,
            inTeams: <CheckSolid />,
            inEnterprise: (
              <div className="flex items-center">
                <CloudSolid />
                <span className="ml-1.5 text-[8px] sm:text-xs">ENTERPRISE CLOUD</span>
              </div>
            ),
          },
          {
            feature: 'Support for Migrating DataDog Dashboards',
            inCommunity: <CrossSolid />,
            inTeams: (
              <div className="flex items-center">
                <span className="ml-1.5 text-[8px] uppercase sm:text-xs">
                  {' '}
                  for spends above $999
                </span>
              </div>
            ),
            inEnterprise: <CheckSolid />,
          },
          {
            feature: 'Dedicated Slack Channel',
            inCommunity: <CrossSolid />,
            inTeams: (
              <div className="flex items-center">
                <span className="ml-1.5 text-[8px] uppercase sm:text-xs">
                  {' '}
                  for spends above $999
                </span>
              </div>
            ),
            inEnterprise: <CheckSolid />,
          },
          {
            feature: 'Team Training',
            inCommunity: <CrossSolid />,
            inTeams: <CrossSolid />,
            inEnterprise: <CheckSolid />,
          },
          {
            feature: 'Dashboard Configuration Support',
            inCommunity: <CrossSolid />,
            inTeams: <CrossSolid />,
            inEnterprise: <CheckSolid />,
          },
          {
            feature: 'Instrumentation Support',
            inCommunity: <CrossSolid />,
            inTeams: <CrossSolid />,
            inEnterprise: <CheckSolid />,
          },
          {
            feature: 'SLA w/ downtime developer pairing',
            inCommunity: <CrossSolid />,
            inTeams: <CrossSolid />,
            inEnterprise: <CheckSolid />,
          },
        ],
      },
    ],
  }

  const Opacity = {
    1: 'bg-opacity-10',
    2: 'bg-opacity-20',
    3: 'bg-opacity-30',
  }

  return (
    <div className="xs:mx-5 relative !m-0 !mx-auto !w-[100vw] border !border-t-0 border-dashed border-signoz_slate-400 md:!w-[80vw]">
      <div className="mx-auto overflow-hidden">
        <div className="">
          <div className="ovc-table_top-wrapper grid grid-cols-3 gap-1 md:grid-cols-[3fr_1fr_1fr_1fr]">
            {ALL_FEATURES_DATA.HEADER.map((h, idx) => {
              return (
                <div
                  key={idx}
                  className={`${
                    idx === 2
                      ? `flex flex-col justify-between rounded-lg !rounded-b-none bg-signoz_ink-500 p-3 sm:bg-[#16181d]`
                      : idx !== 0
                        ? `flex flex-col justify-between rounded-lg p-3 ${Opacity[idx]}`
                        : 'hidden md:block'
                  }`}
                >
                  <div className="flex flex-col gap-1">
                    <h2 className="m-0 text-sm max-sm:h-16 md:text-base">{h.heading}</h2>
                    <p className="text-xs text-signoz_vanilla-400">{h.desc}</p>
                  </div>
                  <div className="justify-cente w-fullr flex">{h.action}</div>
                </div>
              )
            })}
          </div>
          <Line />
        </div>
      </div>

      <div className="mx-auto overflow-hidden">
        <div className="mb-10">
          <div className="container-medium">
            <div className="table-body">
              {ALL_FEATURES_DATA.ROWS.map((row, i) => {
                return (
                  <div key={i} className={`${false ? `rounded-lg bg-opacity-[${i}]` : ''}`}>
                    <div className="grid grid-cols-1">
                      <div className="grid grid-cols-1 gap-1 sm:grid-cols-3 md:grid-cols-[3fr_1fr_1fr_1fr]">
                        <div className="mb-3 mt-12 py-2 pl-6 pr-2 text-center text-sm font-medium md:text-left">
                          {row.section}
                        </div>
                        <div></div>
                        <div className="bg-signoz_ink-500 sm:bg-[#16181d]"></div>
                        <div></div>
                      </div>
                    </div>
                    <Line />
                    <div className="grid grid-cols-1">
                      {row.features.map((r, idx) => {
                        return (
                          <div key={idx}>
                            <div className="grid grid-cols-3 gap-1 md:grid-cols-[3fr_1fr_1fr_1fr]">
                              <h4 className="col-span-3 m-0 py-3 pl-6 pr-2 text-center text-sm font-normal text-signoz_vanilla-400 md:col-span-1 md:text-left">
                                {r.feature}
                              </h4>
                              <div
                                className={`sm:justify-left flex items-center justify-center rounded-lg p-3`}
                              >
                                {r.inCommunity}
                              </div>
                              <div
                                className={`sm:justify-left flex items-center justify-center rounded-lg rounded-none bg-signoz_ink-500 p-3 sm:bg-[#16181d]`}
                              >
                                {r.inTeams}
                              </div>
                              <div
                                className={`sm:justify-left flex items-center justify-center rounded-lg p-3`}
                              >
                                {r.inEnterprise}
                              </div>
                            </div>
                            <Line />
                          </div>
                        )
                      })}
                    </div>
                  </div>
                )
              })}
              <div className="grid h-[18px] grid-cols-3 gap-1 md:grid-cols-[3fr_1fr_1fr_1fr]">
                <div />
                <div />
                <div className="rounded-lg !rounded-t-none bg-signoz_ink-500 sm:bg-[#16181d]" />
                <div />
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* ) : null} */}
      <div className="mx-auto overflow-hidden md:max-w-md lg:max-w-6xl">
        {isOpened ? (
          <div
            className={`relative my-5 flex justify-center
            before:absolute before:left-0 before:top-[0] before:h-40 before:w-screen before:rounded-full before:bg-[#1b1b1d] before:opacity-50 before:blur-3xl before:backdrop-blur-xl before:content-['']  
            after:absolute after:bottom-[0] after:left-0 after:h-40 after:w-screen after:rounded-full after:bg-[#1b1b1d] after:opacity-50 after:blur-3xl after:backdrop-blur-xl after:content-['']
          `}
          >
            <div className="z-[1] flex rounded-3xl">
              <nav className={`flex space-x-2 rounded-3xl ${styles.pricingTabContainer}`}>
                <button
                  type="button"
                  className={`button button--primary text-md flex flex-nowrap items-center gap-2 font-bold`}
                  onClick={() => setIsOpened(!isOpened)}
                >
                  <span>Explore all Features</span>
                  <span className={isOpened ? 'rotate-180' : ''}>
                    <Chevron />
                  </span>
                </button>
              </nav>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  )
}
