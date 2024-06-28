'use client'

import React, { useState } from 'react'

import FAQBody from '../../components/FAQPricing'
import styles from './styles.module.css'
import { TrustedByTeams } from '@/components/trusted-by'
import { CostComparison } from '@/components/cost-comparison'
import { DataProtection } from '@/components/data-protection'
import { TalkToExpert } from '@/components/talk-to-expert'
import { CommunityEdition } from '@/components/community-edition'
import { UserReview } from '@/components/user-review'
import { TrySigNozCTA } from '@/components/try-signoz-cta'
import WhySelectSignoz from '@/components/why-select-signoz'
import { Testimonials } from '@/components/testimonials'
import MonthlyEstimate from '@/components/Monthly-estimate/MonthlyEstimate'
import Link from 'next/link'
import Divider from '@/components/ui/Divider'
import Heading from '@/components/ui/Heading'
import Line from '@/components/ui/Line'
import SubHeading from '@/components/ui/SubHeading'
import { Chevron, RightSVG } from '@/components/svgs/common'
import { ArrowBigLeft, ArrowRight, MoveLeft, ArrowUpRight, ArrowDown, Cloud, Server } from 'lucide-react'
import { CircleCheckSolid, CircleInfoSolid, ZapSolid, ClockSolid, CheckSolid, CrossSolid, FlameSolid, CloudSolid, ServerSolid } from "@/components/homepage-icons/icons"

function Pricing() {
  return (
    <div title="SigNoz Plans">
      {/* Plans */}
      <PricingPlans />
      {/* All Features */}
      <TrustedByTeams />
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
      <MonthlyEstimate />
      <WhySelectSignoz isInPricingPage />
      <FAQ />
      {/* User Review */}
      {/* <UserReview /> */}
      {/* Give a Try CTA */}
      {/* <TrySigNozCTA /> */}
      <Testimonials />
    </div>
  )
}

export default Pricing

function FAQ() {
  return (
    <section className={styles.faq}>
      <div className={`container ${styles.faqContainer} border border-signoz_slate-400 border-dashed`}>
        <div className="row max-w-6xl mx-auto">
          <div className="flex w-full">
            <div className='flex-1'>
              <p className="text-5xl font-semibold text-signoz_vanilla-100 leading-[3.5rem]">Frequently<br />Asked <br />Questions</p>
            </div>
            <div className="card-demo flex-2">
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

  return (
    <section className={`${styles.pricing }`}>
      <div className={`container  border border-signoz_slate-400 border-dashed ${styles.pricingContainer}`}>

        {tab === 'cloud' ? (
          <>
            {/* Cloud Plan */}
            <div className="mx-auto mb-5 flex max-w-4xl flex-col items-center text-center ">
              <Heading type={1}>
                Pricing
              </Heading>
              <SubHeading>
                Tired of unpredictable pricing and complex billing structure? Save up to{' '}
                <Link href="/blog/pricing-comparison-signoz-vs-datadog-vs-newrelic-vs-grafana/">
                  <u className="mx-0 rounded px-0 py-0.5 text-primary-400">
                    80% on your Datadog bill <br />
                  </u>
                </Link>{' '}
                with SigNoz. No user-based and host-based pricing.
              </SubHeading>
              <div className="my-5 flex justify-center">
                <div className="flex">
                  <nav
                    className={`flex items-center space-x-2 border border-signoz_slate-400 rounded-sm`}
                  >
                    <button
                      type="button"
                      className={`cursor-pointer border-none px-4 py-2 text-xs text-white relative z-[2] bg-signoz_slate-400`}
                      onClick={() => setTab('cloud')}
                    >
                      <div className='flex gap-1.5'>
                        <Cloud size={14} />
                        SigNoz Cloud
                      </div>
                    </button>
                    <button
                      type="button"
                      className={`cursor-pointer border-none px-4 py-2 text-xs text-signoz_vanilla-400`}
                      onClick={() => setTab('self-managed')}
                    >
                      <div className='flex gap-1.5'>
                        <Server size={14} />
                        Hosted in your infra
                      </div>
                    </button>
                  </nav>
                </div>
              </div>
            </div>


            {/* <div className='flex justify-center'>
              <div className='flex w-fit border border-[#1D212D] rounded-sm'>
                <button
                  type='button'
                  className={`flex justify-center cursor-pointer gap-1.5 items-center w-[10.69rem] h-[2rem] ${tab === 'cloud' ? 'bg-signoz_slate-400' : 'bg-signoz_ink-400'}`}
                  onClick={() => setTab('cloud')}
                >
                  <Cloud size={16} />
                  SigNoz Cloud
                </button>
                <button
                  type='button'
                  className={`flex justify-center cursor-pointer gap-1.5 items-center w-[10.69rem] h-[2rem] ${tab === 'self-managed' ? 'bg-signoz_slate-400' : 'bg-signoz_ink-400'}`}
                  onClick={() => setTab('self-managed')}
                >
                  <Server size={16} />
                  Self-Hosted
                </button>
              </div>
            </div> */}

            <div className="pricing-plans mx-auto grid grid-cols-1 justify-center gap-x-8 gap-y-10 md:max-w-md lg:max-w-6xl lg:grid-cols-2">
              <div className="pricing-card rounded-lg bg-opacity-5 px-4 py-5 md:px-8">
                <div>
                  <h3 className="text-2xl font-bold tracking-tight pinkish-gradient">For Teams</h3>
                  <p className="mb-4 text-base leading-relaxed text-gray-400">
                    For teams that need high-performing applications.
                  </p>
                  <div className="flex items-center justify-between mb-6">
                    <p className="m-0">
                      Starts at
                    </p>
                    <div className='w-3/5 border-b border-signoz_slate-400 border-dashed'/>
                    <span className="text-xl text-primary-400">$199/Month*</span>
                  </div>
                  <div>
                    <Link
                      id="btn-pricing-signoz-cloud-1"
                      className={`flex justify-center items-center py-2 pr-3 pl-4 bg-signoz_robin-500 rounded-full h-10 text-sm gap-1.5`}
                      href={'/teams/'}
                    >
                      Get started with SigNoz Cloud <ArrowRight size={14} />
                    </Link>
                  </div>
                </div>
                {/* <Divider isDashed /> */}
                <div className="__card__body">
                  <div className={`mt-7 ${styles.packageDetailBlock}`}>
                    <h4 className={styles.packageDetailTitle}>Pricing</h4>
                    <div>
                      <div className='gap-2'>
                        <img src="/img/index_features/logs.svg" alt="Logs Icon" className="w-6 h-6" />
                        <span>Logs</span>
                      </div>
                      <div className='w-1/4 border-b border-signoz_slate-400 border-dashed'/>
                      <span className="item-center flex flex-nowrap justify-center">
                        <span className="flex items-center justify-center gap-1">
                          <span className="text-primary-500">
                            ${TRACES_AND_LOGS_PRICES[logsRetentionPeriod]}
                          </span>{' '}
                          per GB ingested &mdash;&nbsp;
                        </span>
                        <select
                          className="t block w-[100px] rounded-sm border border-signoz_slate-400 p-0.5 text-xs text-signoz_vanilla-100 placeholder-gray-400 accent-primary-400 bg-signoz_ink-400 focus:border-primary-500 focus:ring-primary-500 md:p-1 md:text-sm"
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
                    <div>
                      <div className='gap-2'>
                        <img src="/img/index_features/drafting-compass.svg" alt="Logs Icon" className="w-6 h-6" />
                        <span>Traces</span>
                      </div>
                      <div className='w-1/4 border-b border-signoz_slate-400 border-dashed'/>
                      <span className="item-center flex flex-nowrap justify-center">
                        <span className="flex items-center justify-center gap-1">
                          <span className="text-primary-500">
                            ${TRACES_AND_LOGS_PRICES[tracesRetentionPeriod]}
                          </span>{' '}
                          per GB ingested &mdash;&nbsp;
                        </span>
                        <select
                          className="block w-[100px] rounded-sm border border-signoz_slate-400 p-0.5 text-xs text-signoz_vanilla-100 placeholder-gray-400 accent-primary-400 bg-signoz_ink-400 focus:border-primary-500 focus:ring-primary-500 md:p-1 md:text-sm"
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
                    <div>
                      <div className='gap-2'>
                        <img src="/img/index_features/bar-chart-2.svg" alt="Logs Icon" className="w-6 h-6" />
                        <span>Metrics</span>
                      </div>
                      <div className='w-1/4 border-b border-signoz_slate-400 border-dashed'/>
                      <span className="item-center flex flex-nowrap justify-center">
                        <span className="flex items-center justify-center gap-1">
                          <span className="text-primary-500">
                            ${METRICS_PRICES[metricsRetentionPeriod]}
                          </span>{' '}
                          per mn samples &mdash;&nbsp;
                        </span>
                        <select
                          className="block w-[100px] rounded-sm border border-signoz_slate-400 p-0.5 text-xs text-signoz_vanilla-100 placeholder-gray-400 accent-primary-400 bg-signoz_ink-400 focus:border-primary-500 focus:ring-primary-500 md:p-1 md:text-sm"
                          value={metricsRetentionPeriod}
                          onChange={(e) => setMetricsRetentionPeriod(Number(e.target.value))}
                        >
                          {RETENTION_PERIOD.METRICS.map((option, idx) => (
                            <option
                              key={`${option.months}-${idx}`}
                              value={option.months}
                            >{`${option.months} ${option.months === 1 ? 'month' : 'months'
                              }`}</option>
                          ))}
                        </select>
                      </span>
                    </div>
                    <br />
                    <div>
                      <div className='gap-3'>
                        <CircleCheckSolid />
                        <span>
                          Add as many teammates as you want.
                        </span>
                      </div>
                    </div>
                    <div>
                      <div className='gap-3'>
                        <CircleCheckSolid />
                        <span>
                          No host-based pricing
                        </span>
                      </div>
                    </div>
                    <div>
                      <div className='gap-3'>
                        <CircleInfoSolid />
                        <span>
                          Learn how the price for metrics is calculated
                        </span>
                        <ArrowUpRight size={20} />
                      </div>
                    </div>
                    <div>
                      <div className='gap-3'>
                        <CircleInfoSolid />
                        <span>
                          What comes included in the $199?
                        </span>
                        <ArrowUpRight size={20} />
                      </div>
                    </div>
                    <br/>

                    <div>
                    <span>
                    How does pricing of metrics work in SigNoz? <a href='https://vimeo.com/973012522' target='_blank' className='mx-0 rounded px-0 py-0.5 text-primary-400'> Explainer Video </a> 
                      </span>
                    </div>

                  </div>
                  <div className={` mt-7 ${styles.support} ${styles.packageDetailBlock}`}>
                    <h4 className={styles.packageDetailTitle}>Support</h4>
                    <div>
                      <div className='gap-3'>
                        <CircleCheckSolid color="signoz_sienna-400" />
                        <span className='text-signoz_vanilla-400'>Community Slack</span>
                      </div>
                    </div>
                    <div>
                      <div className='gap-3'>
                        <CircleCheckSolid color="signoz_sienna-400" />
                        <span className='text-signoz_vanilla-400'>Email</span>
                      </div>
                    </div>
                    <div>
                      <div className='gap-3'>
                        <CircleCheckSolid color="signoz_sienna-400" />
                        <span>Dedicated Slack Channel</span>
                        <span className="uppercase text-xs bg-signoz_slate-100">On spends above $999</span>
                      </div>
                    </div>
                  </div>
                  <div className={styles.packageDetailBlock}>
                    <h4 className={`mt-7 ${styles.packageDetailTitle}`}>Features</h4>
                    <ul className='ul-no-padding'>
                      <li className='flex gap-3 items-center'> <CircleCheckSolid /> APM & Distributed Tracing</li>
                      <li className='flex gap-3 items-center'> <CircleCheckSolid /> Log Management</li>
                      <li className='flex gap-3 items-center'> <CircleCheckSolid /> Infrastructure Monitoring</li>
                      <li className='flex gap-3 items-center'> <CircleCheckSolid /> Exceptions Monitoring</li>
                      <li className='flex gap-3 items-center'> <CircleCheckSolid /> Alerts Management</li>
                      <li className='flex gap-3 items-center'> <CircleCheckSolid /> SSO and SAML Support</li>
                      <li className='flex gap-3 items-center'> <CircleCheckSolid /> Service Dependency Visualization</li>
                      <li className='flex gap-3 items-center'> <CircleCheckSolid /> Run aggregates on ingested spans</li>
                      <li className='flex gap-3 items-center'> <CircleCheckSolid /> Live Tail Logging</li>
                      <li className='flex gap-3 items-center'> <CircleCheckSolid /> Unlimited Logs & Traces based Dashboards</li>
                      <li className='flex gap-3 items-center'> <CircleCheckSolid /> Dashboard locking</li>
                      <li className='flex gap-3 items-center'> <CircleCheckSolid /> Visualize very large traces (&gt;10K spans)</li>
                      <li className='flex gap-3 items-center'> <CircleCheckSolid /> Data centers available in the US, EU & India</li>
                      <li className='flex gap-3 items-center'> <CircleCheckSolid /> SOC2 Type 1 Compliant</li>
                    </ul>
                  </div>
                  {/* <Divider isDashed />
                  <div className={styles.packageDetailBlock}>
                    <h4 className={styles.packageDetailTitle}>Upcoming</h4>
                    <ul className="list-icon-right">
                      <li>AWS Cloudwatch Integration</li>
                    </ul>
                  </div> */}
                </div>
                <div className={`__card__footer ${styles.card__footer}`}>
                  <Link
                    id="btn-pricing-signoz-cloud-2"
                    className={`flex justify-center items-center py-2 pr-3 pl-4 bg-signoz_robin-500 rounded-full h-10 text-sm font-medium gap-1.5`}
                    href={'/teams/'}
                  >
                    Get started with Signoz Cloud <ArrowRight size={14} />
                  </Link>
                  <div>
                    <br></br>
                  </div>

                </div>
                <div className=''>
                  <Link
                    id="btn-pricing-signoz-cloud-2"
                    className={`flex justify-center items-center py-2 px-4 button-background rounded-full h-10 text-sm font-medium gap-1.5`}
                    href={'/teams/'}
                  >
                    Estimate your monthly bill <ArrowDown size={14} />
                  </Link>
                  <div>
                    <br></br>
                  </div>

                </div>
              </div>
              <div className="pricing-card rounded-lg bg-opacity-5 px-4 py-5 md:px-8">
                <div>
                  <h3 className="font-heading text-2xl font-bold orangish-gradient">Enterprise Cloud</h3>
                  <p className="mb-4 text-base leading-relaxed text-gray-400">
                    For larger orgs with advanced security, compliance and support.
                  </p>
                  <div className="flex items-center gap-3 mb-6">
                    <ZapSolid />
                    <p className="m-0">Flexible Pricing for scale and long term commitments</p>
                  </div>
                  <div>
                    <Link
                      id="btn-pricing-signoz-enterprise-1"
                      className={`flex justify-center items-center py-2 px-4 button-background rounded-full h-10 text-sm font-medium gap-1.5`}
                      href={'/enterprise-cloud/'}
                    >
                      Contact Us <ArrowRight size={14}/>
                    </Link>
                  </div>
                </div>
                <div className="__card__body">
                  <div className={`mt-7 ${styles.pricingDetails} ${styles.packageDetailBlock}`}>
                    <h4 className={styles.packageDetailTitle}>Pricing</h4>
                    <div></div>
                    <div>
                      <div className='gap-3'>
                        <CircleCheckSolid />
                        <span>Custom Pricing</span>
                      </div>
                    </div>
                    <div>
                      <div className='gap-3'>
                        <CircleCheckSolid />
                        <span>Custom Retention</span>
                      </div>
                    </div>
                  </div>
                  {/* <div
                    className={`${styles.deploymentOptions} ${styles.packageDetailBlock}`}
                  >
                    <h4 className={styles.packageDetailTitle}>
                      Deployment Options
                    </h4>
                    <div>
                      <span>SaaS</span>
                      <span>
                        <RightSVG />
                      </span>
                    </div>
                    <div>
                      <span>Managed by SigNoz in your cloud</span>
                      <span>
                        <RightSVG />
                      </span>
                    </div>
                  </div>
                  <Divider isDashed /> */}
                  <div className={`mt-7 ${styles.support} ${styles.packageDetailBlock}`}>
                    <h4 className={styles.packageDetailTitle}>Support</h4>
                    <div>
                      <div className='gap-3'>
                        <CircleCheckSolid color="signoz_sienna-400" />
                        <span>Email</span>
                      </div>
                    </div>
                    <div>
                      <div className='gap-3'>
                        <CircleCheckSolid color="signoz_sienna-400" />
                        <span>Dedicated Slack Channel</span>
                      </div>
                    </div>
                    <div>
                      <div className='gap-3'>
                        <CircleCheckSolid color="signoz_sienna-400" />
                        <span>Team Training</span>
                      </div>
                    </div>
                    <div>
                      <div className='gap-3'>
                        <CircleCheckSolid color="signoz_sienna-400" />
                        <span>Dashboard Configuration Support</span>
                      </div>
                    </div>
                    <div>
                      <div className='gap-3'>
                        <CircleCheckSolid color="signoz_sienna-400" />
                        <span>Instrumentation Support</span>
                      </div>
                    </div>
                    <div>
                      <div className='gap-3'>
                        <CircleCheckSolid color="signoz_sienna-400" />
                        <span>SLA w/ downtime developer pairing</span>
                      </div>
                    </div>
                  </div>
                  <div className={styles.packageDetailBlock}>
                    <h4 className={`mt-7 ${styles.packageDetailTitle}`}>Features</h4>
                    <ul className="ul-no-padding">
                      <li className='flex gap-3 items-center'> <CircleCheckSolid /> Includes all features in Teams plan</li>
                      <li className='flex gap-3 items-center'> <CircleCheckSolid /> Custom integration for metrics and logs</li>
                      <li className='flex gap-3 items-center'> <CircleCheckSolid /> AWS Private Link</li>
                      <li className='flex gap-3 items-center'> <CircleCheckSolid /> VPC Peering</li>
                      <li className='flex gap-3 items-center'> <CircleCheckSolid /> Query API Keys (access data from anywhere)</li>
                    </ul>
                  </div>
                  <div className={styles.packageDetailBlock}>
                    <h4 className={`mt-7 ${styles.packageDetailTitle}`}>Coming soon</h4>
                    <ul className="ul-no-padding">
                      <li className='flex gap-3 items-center'> <ClockSolid /> Finer RBAC with custom roles</li>
                      <li className='flex gap-3 items-center'> <ClockSolid /> Audit Logs</li>
                      <li className='flex gap-3 items-center'> <ClockSolid /> Custom retention for different sources of logs</li>
                      <li className='flex gap-3 items-center'> <ClockSolid /> Multi-tenancy</li>
                    </ul>
                  </div>
                </div>
                <div className={`__card__footer ${styles.card__footer}`}>
                  <Link
                    id="btn-pricing-signoz-enterprise-2"
                    className={`flex justify-center items-center py-2 px-4 button-background rounded-full h-10 text-sm font-medium gap-1.5`}
                    href={'/enterprise-cloud/'}
                  >
                    Contact Us <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            {/* Self Managed Plan */}

            <div className="mx-auto mb-5 flex max-w-4xl flex-col items-center text-center">
              <Heading type={1}>Run SigNoz within your infrastructure</Heading>
              <SubHeading>
                Get started with Community Edition and upgrade for enterprise-ready features or get
                it managed by SigNoz in your cloud (BYOC)
              </SubHeading>
              <div className="my-5 flex justify-center">
                <div className="flex rounded-3xl">
                  <nav
                    className={`flex items-center space-x-2 border border-signoz_slate-400 rounded-sm`}
                  >
                    <button
                      type="button"
                      className={`cursor-pointer border-none px-4 py-2 text-xs text-signoz_vanilla-400 relative z-[2] bg-signoz_slate-400 ${tab === 'cloud'
                        ? " "
                        : 'bg-transparent'
                        }`}
                      onClick={() => setTab('cloud')}
                    >
                      <div className='flex gap-1.5'>
                        <Cloud size={14} />
                        SigNoz Cloud
                      </div>
                    </button>
                    <button
                      type="button"
                      className={`cursor-pointer px-4 py-2 text-xs text-white relative z-[2] bg-signoz_slate-400 ${tab === 'self-managed'
                        ? " "
                        : 'bg-transparent'
                        }`}
                      onClick={() => setTab('self-managed')}
                    >
                      <div className='flex gap-1.5'>
                        <Server size={14} />
                        Hosted in your infra
                      </div>
                    </button>
                  </nav>
                </div>
              </div>
            </div>

            <div className="pricing-plans mx-auto grid grid-cols-1 justify-center gap-x-8 gap-y-10 md:max-w-md lg:max-w-6xl lg:grid-cols-2">
              <div className="pricing-card rounded-lg bg-opacity-5 px-4 py-5 md:px-8">
                <div>
                  <h3 className="font-heading text-2xl font-bold ">Community Edition</h3>
                  <p className="mb-4 text-base leading-relaxed text-gray-400">Free to Self Host
                  </p>
                  <div className="flex items-center gap-3">
                    <p className="m-0">Install in your infra</p>
                  </div>
                  <div>
                    <Link
                      id="btn-pricing-signoz-cloud-1"
                      className={`flex justify-center items-center button button--primary ${styles.pricingCtaBtn}`}
                      href={'/docs/install/'}
                    >
                      Documentation
                    </Link>
                  </div>
                </div>
                <div>

                </div>
                <div className="__card__body">
                  <div className={`mt-7 ${styles.support} ${styles.packageDetailBlock}`}>
                    <h4 className={styles.packageDetailTitle}>Support</h4>
                    <div>
                      <div className='gap-3'>
                        <CircleCheckSolid color="signoz_sienna-400" />
                        <span className='text-signoz_vanilla-400'>Community Slack</span>
                      </div>
                    </div>
                  </div>
                  <div className={`mt-7 ${styles.packageDetailBlock}`}>
                    <h4 className={styles.packageDetailTitle}>Features</h4>
                    <ul className='ul-no-padding'>
                      <li className='flex gap-3 items-center'> <CircleCheckSolid /> APM & Distributed Tracing</li>
                      <li className='flex gap-3 items-center'> <CircleCheckSolid /> Log Management</li>
                      <li className='flex gap-3 items-center'> <CircleCheckSolid /> Infrastructure Monitoring</li>
                      <li className='flex gap-3 items-center'> <CircleCheckSolid /> Exceptions Monitoring</li>
                      <li className='flex gap-3 items-center'> <CircleCheckSolid /> Alerts Management</li>
                      <li className='flex gap-3 items-center'> <CircleCheckSolid /> SSO and SAML Support</li>
                      <li className='flex gap-3 items-center'> <CircleCheckSolid /> Service Dependency Visualization</li>
                    </ul>
                  </div>
                </div>
                <div className={`__card__footer ${styles.card__footer}`}>
                  <Link
                    id="btn-pricing-signoz-cloud-2"
                    className={`flex justify-center items-center button button--primary ${styles.pricingCtaBtn}`}
                    href={'/docs/install/'}
                  >
                    Documentation
                  </Link>
                </div>
              </div>
              <div className="pricing-card rounded-lg bg-opacity-5 px-4 py-5 md:px-8">
                <div>
                  <h3 className="font-heading text-2xl font-bold ">Enterprise Edition</h3>
                  <p className="mb-4 text-base leading-relaxed text-gray-400">
                    For at-scale orgs who want to host SigNoz in their own infra.
                  </p>
                  <div className="flex items-center justify-between">
                    <p className="m-0">
                      Starts at just
                    </p>
                    <span className="text-xl text-primary-400">$2500/Month*</span>
                  </div>
                  <div>
                    <Link
                      id="btn-pricing-signoz-cloud-1"
                      className={`flex justify-center items-center py-2 px-4 button-background rounded-full h-10 text-sm font-medium gap-1.5`}
                      href={'/enterprise/'}
                    >
                      Contact us<ArrowRight size={14} />
                    </Link>
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
                    <h4 className={styles.packageDetailTitle}>Deployment Options</h4>
                    <div>
                      <ul className='ul-no-padding'>
                        <li className='flex gap-3 items-center'> <CircleCheckSolid /> Self Host with support contract by SigNoz team</li>
                        <li className='flex gap-3 items-center'> <CircleCheckSolid /> Managed by SigNoz in your cloud</li>
                      </ul>
                    </div>
                  </div>
                  <div className={`mt-7 ${styles.support} ${styles.packageDetailBlock}`}>
                    <h4 className={styles.packageDetailTitle}>Support</h4>
                    <div>
                      <div className='gap-3'>
                        <CircleCheckSolid color="signoz_sienna-400" />
                        <span>Email</span>
                      </div>
                    </div>
                    <div>
                      <div className='gap-3'>
                        <CircleCheckSolid color="signoz_sienna-400" />
                        <span>Dedicated Slack Channel</span>
                      </div>
                    </div>
                    <div>
                      <div className='gap-3'>
                        <CircleCheckSolid color="signoz_sienna-400" />
                        <span>Team Training</span>
                      </div>
                    </div>
                    <div>
                      <div className='gap-3'>
                        <CircleCheckSolid color="signoz_sienna-400" />
                        <span>Dashboard Configuration Support</span>
                      </div>
                    </div>
                    <div>
                      <div className='gap-3'>
                        <CircleCheckSolid color="signoz_sienna-400" />
                        <span>Instrumentation Support</span>
                      </div>
                    </div>
                    <div>
                      <div className='gap-3'>
                        <CircleCheckSolid color="signoz_sienna-400" />
                        <span>SLA w/ downtime developer pairing</span>
                      </div>
                    </div>
                  </div>
                  <div className={`mt-7 ${styles.packageDetailBlock}`}>
                    <h4 className={styles.packageDetailTitle}>Features</h4>
                    <p className={styles.featureBlur}>Includes all features in community edition</p>
                    <ul className="ul-no-padding">
                      <li className='flex gap-3 items-center'> <CircleCheckSolid /> SSO and SAML Support</li>
                      <li className='flex gap-3 items-center'> <CircleCheckSolid /> Dashboard locking</li>
                      <li className='flex gap-3 items-center'> <CircleCheckSolid /> Visualize very large traces (&gt;10K spans)</li>
                      <li className='flex gap-3 items-center'> <CircleCheckSolid /> Run aggregates on ingested spans</li>
                      <li className='flex gap-3 items-center'> <CircleCheckSolid /> Security tightening for on-prem installation</li>
                      <li className='flex gap-3 items-center'> <CircleCheckSolid /> Monitor Health of SigNoz</li>
                      <li className='flex gap-3 items-center'> <CircleCheckSolid /> Query API Keys (access data from anywhere)</li>
                    </ul>
                  </div>
                  <div className={`mt-7 ${styles.packageDetailBlock}`}>
                    <h4 className={styles.packageDetailTitle}>Coming soon</h4>
                    <ul className="ul-no-padding">
                      <li className='flex gap-3 items-center'> <ClockSolid />  Finer RBAC with custom roles</li>
                      <li className='flex gap-3 items-center'> <ClockSolid />  Audit Logs</li>
                      <li className='flex gap-3 items-center'> <ClockSolid />  Custom retention for different sources of logs</li>
                      <li className='flex gap-3 items-center'> <ClockSolid />  Multi-tenancy</li>
                    </ul>
                  </div>
                </div>
                <div className={`__card__footer ${styles.card__footer}`}>
                  <Link
                    id="btn-pricing-signoz-enterprise-2"
                    className={`flex justify-center items-center py-2 px-4 button-background rounded-full h-10 text-sm font-medium gap-1.5`}
                    href={'/enterprise/'}
                  >
                    Contact Us <ArrowRight size={14} />
                  </Link>
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
      { heading: 'Community Edition', desc: '$0 ⎯ host in your infra', action: <Link href={'/docs/introduction'} className='button-background h-8 pr-3 pl-4 py-2 rounded-full text-sm flex items-center justify-center gap-1.5 truncate text-center font-medium leading-5 text-white'>Read Documenation</Link> },
      { heading: 'Teams', desc: 'Cloud ⎯ starts at $199/mo', action: <Link href={'/teams/'} className='bg-signoz_robin-500 h-8 pr-3 pl-4 py-2 rounded-full text-sm flex items-center justify-center gap-1.5 truncate text-center font-medium leading-5 text-white '>Get Started</Link> },
      {
        heading: 'Enterprise', desc: 'Cloud / Self-Hosted', action: <Link href={'/enterprise-cloud/'} className='button-background h-8 pr-3 pl-4 py-2 rounded-full text-sm flex items-center justify-center gap-1.5 text-center font-medium leading-5 text-white'>Contact Us</Link>
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
            inCommunity: (
              <div className="flex flex-col items-center justify-center">
                <CrossSolid />
                {/* <small>(Limited to 5 dashboard panels & alerts)</small> */}
              </div>
            ),
            inTeams: <div className="flex items-center">
              <ClockSolid height='15' width='15' />
              <span className="ml-1.5 text-xs">COMING SOON</span>
            </div>,
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
            inTeams: <div className="flex items-center ">
              <FlameSolid />
              <span className="ml-1.5 text-xs">EARLY ACCESS</span>
            </div>,
            inEnterprise: <CheckSolid />,
          },
          {
            feature: 'Create direct filters from JSON logs',
            inCommunity: null,
            inTeams: null,
            inEnterprise: null,
          },
        ],
      },
      {
        section: 'Features',
        features: [
          {
            feature: 'Role-based Access Control',
            inCommunity: null,
            inTeams: null,
            inEnterprise: null,
          },
          {
            feature: 'Audit log',
            inCommunity: null,
            inTeams: null,
            inEnterprise: null,
          },
          {
            feature: 'Reports & Insights',
            inCommunity: null,
            inTeams: null,
            inEnterprise: null,
          },
          {
            feature: 'API & Webhooks',
            inCommunity: null,
            inTeams: null,
            inEnterprise: null,
          },
        ],
      },
      {
        section: 'Support',
        features: [
          {
            feature: 'Community Support',
            inCommunity: <div className="flex items-center">
              <FlameSolid />
              <span className="ml-1.5 text-xs">EARLY ACCESS</span>
            </div>,
            inTeams: <CheckSolid />,
            inEnterprise: <div className="flex items-center">
              <CloudSolid />
              <span className="ml-1.5 text-xs">CLOUD</span>
            </div>,
          },
          {
            feature: 'Priority Support',
            inCommunity: <CrossSolid />,
            inTeams: <CheckSolid />,
            inEnterprise: <div className="flex items-center">
              <ServerSolid />
              <span className="ml-1.5 text-xs">SELF-HOSTED</span>
            </div>,
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
    <div className="relative mx-5 md:mx-0 border border-signoz_slate-400 border-dashed">
      <div className="mx-auto overflow-hidden md:max-w-md lg:max-w-6xl">
        <div className="mt-10">
          <div className="ovc-table_top-wrapper grid grid-cols-3 gap-1 md:grid-cols-4">
            {ALL_FEATURES_DATA.HEADER.map((h, idx) => {
              return (
                <div
                  key={idx}
                  className={`${idx !== 0 ? `rounded-lg p-2 ${Opacity[idx]}` : 'hidden md:block'
                    }`}
                >
                  <h2 className="m-0 text-lg md:text-2xl">{h.heading}</h2>
                  <p className="text-base md:text-lg">{h.desc}</p>
                  <div className='flex justify-center'>{h.action}</div>
                </div>
              )
            })}
          </div>
          <Line />
        </div>
      </div>
      {/* {!isOpened ? (
        <div
          className={`wavy-line relative mb-16
        after:absolute after:top-[50%] after:h-0 after:w-full after:bg-transparent after:content-['']
      `}
        >
          <div
            className={`relative my-5 flex justify-center
            before:absolute before:left-0 before:top-[0] before:h-20 before:w-full before:bg-[#1b1b1d] before:opacity-100 before:blur-xl before:backdrop-blur-xl before:content-['']  
            after:absolute after:bottom-[0] after:left-0 after:h-20 after:w-full after:bg-[#1b1b1d] after:opacity-100 after:blur-xl after:backdrop-blur-xl after:content-['']
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
        </div>
      ) : null} */}
      {/* {isOpened ? ( */}
      <div className="mx-auto md:max-w-md lg:max-w-6xl">
        <div className="mb-10">
          <div className="container-medium">
            <div className="table-body">
              {ALL_FEATURES_DATA.ROWS.map((row, i) => {
                return (
                  <div
                    key={i}
                    className={`${false ? `rounded-lg bg-opacity-[${i}]` : ''}`}
                  >

                    <h3 className="mt-12 mb-3 p-2 text-center text-sm font-medium md:text-left">{row.section}</h3>
                    <Line />
                    <div className=" grid grid-cols-1 gap-1">
                      {row.features.map((r, idx) => {
                        return (
                          <div key={idx}>
                            <div className="grid grid-cols-3 gap-1 md:grid-cols-4 mb-3">
                              <h4 className="col-span-3 m-0 p-2 text-center text-sm text-signoz_vanilla-400 font-normal md:col-span-1 md:text-left">
                                {r.feature}
                              </h4>
                              <div
                                className={`flex items-center rounded-lg p-2 text-center`}
                              >
                                {r.inCommunity}
                              </div>
                              <div
                                className={`flex items-center rounded-lg p-2 text-center`}
                              >
                                {r.inTeams}
                              </div>
                              <div
                                className={`flex items-center rounded-lg  p-2 text-center`}
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
