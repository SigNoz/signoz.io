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
import Button from '@/components/Button/Button'
import Line from '@/components/ui/Line'
import SubHeading from '@/components/ui/SubHeading'
import { Chevron, RightSVG } from '@/components/svgs/common'
import { ArrowBigLeft, ArrowRight, MoveLeft, ArrowUpRight, ArrowDown, Cloud, Server } from 'lucide-react'
import { CircleCheckSolid, CircleInfoSolid, ZapSolid, ClockSolid, CheckSolid, CrossSolid, FlameSolid, CloudSolid, ServerSolid } from "@/components/homepage-icons/icons"


function Pricing() {
  return (
    <div className='bg-signoz_ink-500 relative'>

      <div title="SigNoz Plans">
        {/* Plans */}
        <div className="flex flex-col items-center pt-24 px-5 relative !w-[80vw] !mx-auto border border-signoz_slate-400 border-dashed !border-b-0">
        <PricingPlans />
        </div>
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
    </div>
  )
}

export default Pricing

function FAQ() {
  return (
    <section className={styles.faq}>
      <div className={`container !w-[80vw] border border-signoz_slate-400 border-dashed !border-b-0 !px-0`}>
        <div className="row mx-auto">
          <div className="flex flex-col sm:flex-row w-full">
            <div className='flex-1 !w-[300px]'>
              <p className="text-4xl sm:text-[44px] font-semibold text-signoz_vanilla-100 leading-[3.5rem] pl-12 pt-10">Frequently<br />Asked <br />Questions</p>
            </div>
            <div className="card-demo flex-[2_2_0%] border border-signoz_slate-400 border-dashed left-0 !border-b-0 !border-r-0 !border-t-0">
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
    <section className={`${styles.pricing} relative`}>
      <div className={`container !w-[80vw] !mx-auto  border border-signoz_slate-400 border-dashed !my-0 !border-t-0 !border-b-0 ${styles.pricingContainer}`}>

        {tab === 'cloud' ? (
          <>
            {/* Cloud Plan */}
            <div className="mx-auto mb-5 flex max-w-4xl flex-col items-center text-center">
            <div className='absolute !w-[80vw] h-[7rem] border border-signoz_slate-400 border-dashed top-[-80px] !border-r-0 !border-l-0 !border-t-0 z-[0]'/>
              <Heading type={1} className='z-[1]'>Pricing</Heading>
              <SubHeading>
                Tired of unpredictable pricing and complex billing structure? Save up to{' '}
                <Link href="/blog/pricing-comparison-signoz-vs-datadog-vs-newrelic-vs-grafana/">
                  <span className="mx-0 rounded-none px-0 py-0.5 text-signoz_robin-300 border border-signoz_robin-300 border-dashed !border-t-0 !border-r-0 !border-l-0">
                    80% on your Datadog bill <br />
                  </span>
                </Link>{' '}
                with SigNoz. No user-based and host-based pricing.
              </SubHeading>
              <div className='absolute h-[22.5rem] border border-signoz_slate-400 border-dashed top-[-95px] left-[29px] right-[29px] !border-t-0 !border-b-0 z-[1]'/>
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
                      className={`cursor-pointer border-none px-4 py-2 text-xs text-signoz_vanilla-400 ml-0`}
                      onClick={() => setTab('self-managed')}
                    >
                      <div className='relative flex gap-1.5 z-[3]'>
                        <Server size={14} />
                        Self-Hosted
                      </div>
                    </button>
                  </nav>
                </div>
              </div>
            </div>


            <div className="pricing-plans mx-auto grid grid-cols-1 justify-center gap-y-10 md:max-w-md lg:max-w-6xl lg:grid-cols-2">
              <div className="pricing-card bg-opacity-5 px-4 py-5 md:px-8 border border-signoz_slate-400 border-dashed !mb-0 !border-b-0 !border-r-0">
                <div>
                  <h3 className="text-2xl font-bold tracking-tight pinkish-gradient">Teams</h3>
                  <p className="mb-4 text-base leading-relaxed text-gray-400">
                    For teams that need high-performing applications.
                  </p>
                  <div className="flex items-center justify-between mb-6">
                    <p className="m-0 min-w-[72px]">
                      Starts at
                    </p>
                    <div className='w-3/5 border-b border-signoz_slate-400 border-dashed' />
                    <div className='flex gap-1.5 items-center'>
                      <span className="text-base font-medium text-signoz_robin-300">$199/Month</span><CircleInfoSolid height='16' width='16' />
                    </div>
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

                <div className="__card__body">
                  <div className={`mt-7 ${styles.packageDetailBlock}`}>
                    <h4 className={`${styles.packageDetailTitle}`}>Pricing</h4>
                    <div>
                      <div className='gap-3'>
                        <img src="/img/index_features/logs.svg" alt="Logs Icon" className="w-5 h-5" />
                        <span>Logs</span>
                      </div>
                      <div className='w-1/4 border-b border-signoz_slate-400 border-dashed' />
                      <span className="item-center flex flex-nowrap justify-center">
                        <span className="flex items-center justify-center gap-1">
                          <span className="text-base font-medium text-signoz_robin-300">
                            ${TRACES_AND_LOGS_PRICES[logsRetentionPeriod]}
                          </span>{' '}
                          per GB ingested &mdash;&nbsp;
                        </span>
                        <select
                          className="block w-[100px] rounded-sm border border-signoz_slate-400 p-0.5 text-xs text-signoz_vanilla-100 placeholder-gray-400 accent-primary-400 bg-signoz_ink-400 focus:border-primary-500 focus:ring-primary-500 md:p-1 md:text-sm"
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
                      <div className='gap-3'>
                        <img src="/img/index_features/drafting-compass.svg" alt="Logs Icon" className="w-5 h-5" />
                        <span>Traces</span>
                      </div>
                      <div className='w-1/4 border-b border-signoz_slate-400 border-dashed' />
                      <span className="item-center flex flex-nowrap justify-center">
                        <span className="flex items-center justify-center gap-1">
                          <span className="text-base font-medium text-signoz_robin-300">
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
                      <div className='gap-3'>
                        <img src="/img/index_features/bar-chart-2.svg" alt="Logs Icon" className="w-5 h-5" />
                        <span>Metrics</span>
                      </div>
                      <div className='w-1/4 border-b border-signoz_slate-400 border-dashed' />
                      <span className="item-center flex flex-nowrap justify-center">
                        <span className="flex items-center justify-center gap-1">
                          <span className="text-base font-medium text-signoz_robin-300">
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
                        <span className='text-signoz_vanilla-400'>
                          Add as many teammates as you want.
                        </span>
                      </div>
                    </div>
                    <div>
                      <div className='gap-3'>
                        <CircleCheckSolid />
                        <span className='text-signoz_vanilla-400'>
                          No host-based pricing
                        </span>
                      </div>
                    </div>
                    <div>
                      <div className='gap-3'>
                        <CircleInfoSolid />
                        <span>
                        <button onClick={() => {
                          const element = document.getElementById('my-section');
                          element?.scrollIntoView({
                            behavior: 'smooth'
                          });
                        }}>
                          Learn how the price for metrics is calculated <ArrowUpRight size={20} className='inline' />
                        </button>
                        </span>

                      </div>
                    </div>
                    <div>
                      <div className='gap-3'>
                        <CircleInfoSolid />
                        <span>
                          What comes included in the $199? <ArrowUpRight size={20} className='inline' />
                        </span>
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
                    <h4 className={`${styles.packageDetailTitle}`}>Support</h4>
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
                        <span className='text-signoz_vanilla-400'>Dedicated Slack Channel</span>
                        <span className="uppercase !text-[10px] sm:text-xs text-signoz_vanilla-400 text-center bg-signoz_slate-400 border border-none px-2 py-1 rounded-full">On spends above $999</span>
                      </div>
                    </div>
                  </div>
                  <div className={styles.packageDetailBlock}>
                    <h4 className={`mt-7 ${styles.packageDetailTitle}`}>Features</h4>
                    <ul className='ul-no-padding'>
                      <li className='flex gap-3 items-center mb-3'> <CircleCheckSolid /> APM & Distributed Tracing</li>
                      <li className='flex gap-3 items-center mb-3'> <CircleCheckSolid /> Log Management</li>
                      <li className='flex gap-3 items-center mb-3'> <CircleCheckSolid /> Infrastructure Monitoring</li>
                      <li className='flex gap-3 items-center mb-3'> <CircleCheckSolid /> Exceptions Monitoring</li>
                      <li className='flex gap-3 items-center mb-3'> <CircleCheckSolid /> Alerts Management</li>
                      <li className='flex gap-3 items-center mb-3'> <CircleCheckSolid /> SSO and SAML Support</li>
                      <li className='flex gap-3 items-center mb-3'> <CircleCheckSolid /> Service Dependency Visualization</li>
                      <li className='flex gap-3 items-center mb-3'> <CircleCheckSolid /> Run aggregates on ingested spans</li>
                      <li className='flex gap-3 items-center mb-3'> <CircleCheckSolid /> Live Tail Logging</li>
                      <li className='flex gap-3 items-center mb-3'> <CircleCheckSolid /> Unlimited Logs & Traces based Dashboards</li>
                      <li className='flex gap-3 items-center mb-3'> <CircleCheckSolid /> Dashboard locking</li>
                      <li className='flex gap-3 items-center mb-3'> <CircleCheckSolid /> Visualize very large traces<span className="uppercase text-xs text-signoz_vanilla-400 bg-signoz_slate-400 border border-none px-2 py-1 rounded-full">&gt;10k spans</span></li>
                      <li className='flex gap-3 items-center mb-6'> <CircleCheckSolid /> Data centers available in the US, EU & India</li>
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
                <div className=''>
                  <Link href={'/teams/'}>
                    <Button className='w-full'>
                      Get started with SigNoz Cloud
                      <ArrowRight size={14} />
                    </Button>
                  </Link>
                </div>

                <div className='mt-3'>
                  <Link href={'/teams/'}>
                    <Button className='w-full' type={Button.TYPES.SECONDARY}>
                      Estimate your monthly bill
                      <ArrowDown size={14} />
                    </Button>
                  </Link>
                  <div>
                    <br></br>
                  </div>

                </div>
              </div>
              <div className="pricing-card bg-opacity-5 px-4 py-5 md:px-8 border border-signoz_slate-400 border-dashed !mb-0 !border-b-0">
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
                      Contact Us <ArrowRight size={14} />
                    </Link>
                  </div>
                </div>
                <div className="__card__body">
                  <div className={`mt-7 ${styles.pricingDetails} ${styles.packageDetailBlock}`}>
                    <h4 className={`${styles.packageDetailTitle}`}>Pricing</h4>
                    <div></div>
                    <div>
                      <div className='gap-3'>
                        <CircleCheckSolid />
                        <span className='text-signoz_vanilla-400'>Custom Pricing</span>
                      </div>
                    </div>
                    <div>
                      <div className='gap-3'>
                        <CircleCheckSolid />
                        <span className='text-signoz_vanilla-400'>Custom Retention</span>
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
                  <div className={`mt-7`}>
                    <h4 className={`${styles.packageDetailTitle}`}>Support</h4>
                    <ul className="ul-no-padding">
                      <li className='flex gap-3 items-center mb-2 text-signoz_vanilla-400'> <CircleCheckSolid color="signoz_sienna-400" /> Email</li>
                      <li className='flex gap-3 items-center mb-2 text-signoz_vanilla-400'> <CircleCheckSolid color="signoz_sienna-400" /> Dedicated Slack Channel</li>
                      <li className='flex gap-3 items-center mb-2 text-signoz_vanilla-400'> <CircleCheckSolid color="signoz_sienna-400" /> Team Training</li>
                      <li className='flex gap-3 items-center mb-2 text-signoz_vanilla-400'> <CircleCheckSolid color="signoz_sienna-400" /> Dashboard Configuration Support</li>
                      <li className='flex gap-3 items-center mb-2 text-signoz_vanilla-400'> <CircleCheckSolid color="signoz_sienna-400" /> Instrumentation Support</li>
                      <li className='flex gap-3 items-center text-signoz_vanilla-400'> <CircleCheckSolid color="signoz_sienna-400" /> SLA w/ downtime developer pairing</li>
                    </ul>
                  </div>
                  <div className={styles.packageDetailBlock}>
                    <h4 className={`mt-7 mb-4 ${styles.packageDetailTitle}`}>Features</h4>
                    <ul className="ul-no-padding">
                      <li className='flex gap-3 items-center mb-3'> <CircleCheckSolid /> Includes all features in Teams plan</li>
                      <li className='flex gap-3 items-center mb-3'> <CircleCheckSolid /> Custom integration for metrics and logs<div className="uppercase text-[10px] text-signoz_ink-400 font-semibold bg-signoz_aqua-400 border border-none py-px px-1.5 rounded-[50px] !mb-0">new</div></li>
                      <li className='flex gap-3 items-center mb-3'> <CircleCheckSolid /> AWS Private Link<div className="uppercase text-[10px] text-signoz_ink-400 font-semibold bg-signoz_aqua-400 border border-none py-px px-1.5 rounded-[50px] !mb-0">new</div></li>
                      <li className='flex gap-3 items-center mb-3'> <CircleCheckSolid /> VPC Peering</li>
                      <li className='flex gap-3 items-center mb-3'> <CircleCheckSolid /> Query API Keys (access data from anywhere)</li>
                    </ul>
                  </div>
                  <div className={styles.packageDetailBlock}>
                    <h4 className={`mt-7 ${styles.packageDetailTitle}`}>Coming soon</h4>
                    <ul className="ul-no-padding">
                      <li className='flex gap-3 items-center mb-2 text-signoz_vanilla-400'> <ClockSolid /> Finer RBAC with custom roles</li>
                      <li className='flex gap-3 items-center mb-2 text-signoz_vanilla-400'> <ClockSolid /> Audit Logs</li>
                      <li className='flex gap-3 items-center mb-2 text-signoz_vanilla-400'> <ClockSolid /> Custom retention for different sources of logs</li>
                      <li className='flex gap-3 items-center mb-4 text-signoz_vanilla-400'> <ClockSolid /> Multi-tenancy</li>
                    </ul>
                  </div>
                </div>
                <div className={`__card__footer ${styles.card__footer}`}>
                  <Link href={'/enterprise-cloud/'}>
                    <Button className='w-full' type={Button.TYPES.SECONDARY}>
                      Contact us
                      <ArrowRight size={14} />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            {/* Self Managed Plan */}

            <div className="mx-auto mb-5 flex max-w-4xl flex-col items-center text-center">
            <div className='absolute !w-[80vw] h-[7rem] border border-signoz_slate-400 border-dashed top-[-80px] !border-r-0 !border-l-0 !border-t-0'/>
              <Heading type={1} className='z-[1]'>Run SigNoz within your infrastructure</Heading>
              <SubHeading>
                Get started with Community Edition and upgrade for enterprise-ready features or get
                it managed by SigNoz in your cloud (BYOC)
              </SubHeading>
              <div className='absolute h-[22.5rem] border border-signoz_slate-400 border-dashed top-[-90px] left-[29px] right-[29px] !border-t-0 !border-b-0 z-[1]'/>
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
                      className={`cursor-pointer px-4 py-2 text-xs text-white relative z-[2] bg-signoz_slate-400 !ml-0 ${tab === 'self-managed'
                        ? " "
                        : 'bg-transparent'
                        }`}
                      onClick={() => setTab('self-managed')}
                    >
                      <div className='flex gap-1.5'>
                        <Server size={14} />
                        Self-Hosted
                      </div>
                    </button>
                  </nav>
                </div>
              </div>
            </div>

            <div className="pricing-plans mx-auto grid grid-cols-1 justify-center gap-y-10 md:max-w-md lg:max-w-6xl lg:grid-cols-2">
              <div className="pricing-card bg-opacity-5 px-4 py-5 md:px-8 border border-signoz_slate-400 border-dashed !mb-0 !border-b-0 !border-r-0">
                <div>
                  <h3 className="font-heading text-2xl font-bold  pinkish-gradient">Community Edition</h3>
                  <p className="mb-4 text-base leading-relaxed text-gray-400">Free to Self Host
                  </p>
                  <div className="flex items-center gap-3">
                    <p>Install in your infra</p>
                  </div>
                  <div>
                    <Link href={'/docs/install/'}>
                      <Button className='w-full'>
                        Documentation
                      </Button>
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
                      <li className='flex gap-3 items-center mb-3'> <CircleCheckSolid /> APM & Distributed Tracing</li>
                      <li className='flex gap-3 items-center mb-3'> <CircleCheckSolid /> Log Management</li>
                      <li className='flex gap-3 items-center mb-3'> <CircleCheckSolid /> Infrastructure Monitoring</li>
                      <li className='flex gap-3 items-center mb-3'> <CircleCheckSolid /> Exceptions Monitoring</li>
                      <li className='flex gap-3 items-center mb-3'> <CircleCheckSolid /> Alerts Management</li>
                      <li className='flex gap-3 items-center mb-3'> <CircleCheckSolid /> SSO and SAML Support</li>
                      <li className='flex gap-3 items-center mb-6'> <CircleCheckSolid /> Service Dependency Visualization</li>
                    </ul>
                  </div>
                </div>
                <div className={`__card__footer ${styles.card__footer}`}>
                  <Link href={'/docs/install/'}>
                    <Button className='w-full'>
                      Documentation
                    </Button>
                  </Link>

                </div>
              </div>
              <div className="pricing-card bg-opacity-5 px-4 py-5 md:px-8 border border-signoz_slate-400 border-dashed !mb-0 !border-b-0">
                <div>
                  <h3 className="font-heading text-2xl font-bold orangish-gradient">Enterprise Edition</h3>
                  <p className="mb-4 text-base leading-relaxed text-gray-400">
                    For at-scale orgs who want to host SigNoz in their own infra.
                  </p>
                  <div className="flex items-center justify-between mb-6">
                    <p className="m-0 min-w-[72px]">
                      Starts at
                    </p>
                    <div className='w-3/5 border-b border-signoz_slate-400 border-dashed' />
                    <div className='flex gap-1.5 items-center'>
                      <span className="text-base font-medium text-signoz_robin-300">$2500/Month*</span><CircleInfoSolid height='16' width='16' />
                    </div>
                  </div>
                  <div>
                    <Link href={'/enterprise/'}>
                      <Button className='w-full' type={Button.TYPES.SECONDARY}>
                        Contact us<ArrowRight size={14} />
                      </Button>
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
                    <h4 className={`${styles.packageDetailTitle}`}>Deployment Options</h4>
                    <div>
                      <ul className='ul-no-padding'>
                        <li className='flex gap-3 items-center mb-3'> <CircleCheckSolid /> Self Host with support contract by SigNoz team</li>
                        <li className='flex gap-3 items-center'> <CircleCheckSolid /> Managed by SigNoz in your cloud</li>
                      </ul>
                    </div>
                  </div>
                  <div className={`mt-7`}>
                    <h4 className={`${styles.packageDetailTitle}`}>Support</h4>
                    <ul className="ul-no-padding">
                      <li className='flex gap-3 items-center mb-2 text-signoz_vanilla-400'> <CircleCheckSolid color="signoz_sienna-400" /> Email</li>
                      <li className='flex gap-3 items-center mb-2 text-signoz_vanilla-400'> <CircleCheckSolid color="signoz_sienna-400" /> Dedicated Slack Channel</li>
                      <li className='flex gap-3 items-center mb-2 text-signoz_vanilla-400'> <CircleCheckSolid color="signoz_sienna-400" /> Team Training</li>
                      <li className='flex gap-3 items-center mb-2 text-signoz_vanilla-400'> <CircleCheckSolid color="signoz_sienna-400" /> Dashboard Configuration Support</li>
                      <li className='flex gap-3 items-center mb-2 text-signoz_vanilla-400'> <CircleCheckSolid color="signoz_sienna-400" /> Instrumentation Support</li>
                      <li className='flex gap-3 items-center text-signoz_vanilla-400'> <CircleCheckSolid color="signoz_sienna-400" /> SLA w/ downtime developer pairing</li>
                    </ul>
                  </div>
                  <div className={`mt-7 ${styles.packageDetailBlock}`}>
                    <h4 className={`${styles.packageDetailTitle}`}>Features</h4>
                    <p className="mt-1 text-sm text-signoz_vanilla-400">Includes all features in community edition</p>
                    <ul className="ul-no-padding">
                      <li className='flex gap-3 items-center mb-3'> <CircleCheckSolid /> SSO and SAML Support</li>
                      <li className='flex gap-3 items-center mb-3'> <CircleCheckSolid /> Dashboard locking</li>
                      <li className='flex gap-3 items-center mb-3'> <CircleCheckSolid /> Visualize very large traces<span className="uppercase text-xs text-signoz_vanilla-400 bg-signoz_slate-400 border border-none px-2 py-1 rounded-full">&gt;10k spans</span></li>
                      <li className='flex gap-3 items-center mb-3'> <CircleCheckSolid /> Run aggregates on ingested spans</li>
                      <li className='flex gap-3 items-center mb-3'> <CircleCheckSolid /> Security tightening for on-prem installation</li>
                      <li className='flex gap-3 items-center mb-3'> <CircleCheckSolid /> Monitor Health of SigNoz</li>
                      <li className='flex gap-3 items-center'> <CircleCheckSolid /> Query API Keys (access data from anywhere)</li>
                    </ul>
                  </div>
                  <div className={`mt-7 ${styles.packageDetailBlock}`}>
                    <h4 className={`${styles.packageDetailTitle}`}>Coming soon</h4>
                    <ul className="ul-no-padding">
                      <li className='flex gap-3 items-center mb-2 text-signoz_vanilla-400'> <ClockSolid />  Finer RBAC with custom roles</li>
                      <li className='flex gap-3 items-center mb-2 text-signoz_vanilla-400'> <ClockSolid />  Audit Logs</li>
                      <li className='flex gap-3 items-center mb-2 text-signoz_vanilla-400'> <ClockSolid />  Custom retention for different sources of logs</li>
                      <li className='flex gap-3 items-center mb-2 text-signoz_vanilla-400'> <ClockSolid />  Multi-tenancy</li>
                    </ul>
                  </div>
                </div>
                <div className={`__card__footer ${styles.card__footer}`}>
                  <Link href={'/enterprise/'}>
                    <Button className='w-full' type={Button.TYPES.SECONDARY}>
                      Contact us<ArrowRight size={14} />
                    </Button>
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
      { heading: 'Community Edition', desc: '$0 ⎯ host in your infra', action: <Link href={'/docs/introduction'} className='button-background h-8 px-4 py-2 rounded-full text-[7px] sm:text-sm flex items-center justify-center gap-1.5 truncate text-center font-medium leading-5 text-white w-full'>Read Documenation</Link> },
      { heading: 'Teams', desc: 'Cloud ⎯ starts at $199/mo', action: <Link href={'/teams/'} className='bg-signoz_robin-500 h-8 px-4 py-2 rounded-full text-[8px] sm:text-sm flex items-center justify-center gap-1.5 truncate text-center font-medium leading-5 text-white w-full'>Get Started</Link> },
      {
        heading: 'Enterprise', desc: 'Cloud / Self-Hosted', action: <Link href={'/enterprise-cloud/'} className='button-background h-8 px-4 py-2 rounded-full text-[8px] sm:text-sm flex items-center justify-center gap-1.5 text-center font-medium leading-5 text-white w-full'>Contact Us</Link>
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
              <span className="ml-1.5 text-[8px] sm:text-xs">COMING SOON</span>
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
              <span className="ml-1.5 text-[8px] sm:text-xs">EARLY ACCESS</span>
            </div>,
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
            feature: 'MS Teams as alert channel',
            inCommunity: <CrossSolid />,
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
            inTeams: <div className="flex items-center">
              <FlameSolid />
              <span className="ml-1.5 text-[8px] sm:text-xs">EARLY ACCESS</span>
            </div>,
            inEnterprise: <div className="flex items-center">
              <FlameSolid />
              <span className="ml-1.5 text-[8px] sm:text-xs">EARLY ACCESS</span>
            </div>,
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
            feature: 'SSO/SAML support',
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
            feature: 'Security tightening for on-premise installation',
            inCommunity: <CrossSolid />,
            inTeams: <CheckSolid />,
            inEnterprise: <div className="flex items-center">
              <ServerSolid />
              <span className="ml-1.5 text-[8px] sm:text-xs">SELF-HOSTED</span>
            </div>,
          },
          {
            feature: 'Monitor Health of SigNoz',
            inCommunity: <CrossSolid />,
            inTeams: <CheckSolid />,
            inEnterprise: <div className="flex items-center">
              <ServerSolid />
              <span className="ml-1.5 text-[8px] sm:text-xs">SELF-HOSTED</span>
            </div>,
          },
          {
            feature: 'Finer RBAC with custom roles',
            inCommunity: <CrossSolid />,
            inTeams: <CheckSolid />,
            inEnterprise: <div className="flex items-center">
              <ClockSolid height='15' width='15' />
              <span className="ml-1.5 text-[8px] sm:text-xs">COMING SOON</span>
            </div>,
          },
          {
            feature: 'AWS Private link',
            inCommunity: <CrossSolid />,
            inTeams: <CheckSolid />,
            inEnterprise: <div className="flex items-center">
              <CloudSolid />
              <span className="ml-1.5 text-[8px] sm:text-xs">CLOUD</span>
            </div>,
          },
          {
            feature: 'Alert as code',
            inCommunity: <CrossSolid />,
            inTeams: <CheckSolid />,
            inEnterprise: <div className="flex items-center">
              <ClockSolid height='15' width='15' />
              <span className="ml-1.5 text-[8px] sm:text-xs">COMING SOON</span>
            </div>,
          },
          {
            feature: 'Audit Logs',
            inCommunity: <CrossSolid />,
            inTeams: <CheckSolid />,
            inEnterprise: <div className="flex items-center">
              <ClockSolid height='15' width='15' />
              <span className="ml-1.5 text-[8px] sm:text-xs">COMING SOON</span>
            </div>,
          },
          {
            feature: 'Custom retention for different sources of logs',
            inCommunity: <CrossSolid />,
            inTeams: <CheckSolid />,
            inEnterprise: <div className="flex items-center">
              <ClockSolid height='15' width='15' />
              <span className="ml-1.5 text-[8px] sm:text-xs">COMING SOON</span>
            </div>,
          },
          {
            feature: 'Access Data in SigNoz from Anywhere (via API keys)',
            inCommunity: <CrossSolid />,
            inTeams: <CheckSolid />,
            inEnterprise: <CheckSolid />,
          },
          {
            feature: 'Multi-tenancy',
            inCommunity: <CrossSolid />,
            inTeams: <CheckSolid />,
            inEnterprise: <CheckSolid />,
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
            inEnterprise: <CheckSolid />,
          },
          {
            feature: 'Dedicated Slack Channel',
            inCommunity: <CrossSolid />,
            inTeams: <CrossSolid />,
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
    <div className="relative mx-5 md:mx-0 !mx-auto !w-[80vw] border border-signoz_slate-400 border-dashed !border-t-0 !m-0">
      <div className="mx-auto overflow-hidden md:max-w-md lg:max-w-6xl">
        <div className="mt-10">
          <div className="ovc-table_top-wrapper grid grid-cols-3 gap-1 md:grid-cols-[3fr_1fr_1fr_1fr]">
            {ALL_FEATURES_DATA.HEADER.map((h, idx) => {
              return (
                <div
                  key={idx}
                  className={`${idx === 2 ? `rounded-lg !rounded-b-none p-3 teamColumnBackground` : idx !== 0 ? `rounded-lg p-3 ${Opacity[idx]}` : 'hidden md:block'
                    }`}
                >
                  <h2 className="m-0 text-lg md:text-base">{h.heading}</h2>
                  <p className="text-base md:text-xs text-signoz_vanilla-400">{h.desc}</p>
                  <div className='flex justify-cente w-fullr'>{h.action}</div>
                </div>
              )
            })}
          </div>
          <Line />
        </div>
      </div>

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
                    <div className='gird grid-cols-1'>
                      <div className="grid grid-cols-3 gap-1 md:grid-cols-[3fr_1fr_1fr_1fr]">
                        <div className="mt-12 mb-3 pl-6 pr-2 py-2 text-center text-sm font-medium md:text-left">{row.section}</div>
                        <div>
                        </div>
                        <div className='teamColumnBackground'>
                        </div>
                        <div>
                        </div>
                      </div>
                    </div>
                    <Line />
                    <div className="grid grid-cols-1">
                      {row.features.map((r, idx) => {
                        return (
                          <div key={idx}>
                            <div className="grid grid-cols-3 gap-1 md:grid-cols-[3fr_1fr_1fr_1fr]">
                              <h4 className="col-span-3 m-0 pl-6 pr-2 py-3 text-center text-sm text-signoz_vanilla-400 font-normal md:col-span-1 md:text-left">
                                {r.feature}
                              </h4>
                              <div
                                className={`flex items-center rounded-lg p-3 justify-center sm:justify-left`}
                              >
                                {r.inCommunity}
                              </div>
                              <div
                                className={`flex items-center rounded-lg p-3 justify-center sm:justify-left teamColumnBackground rounded-none`}
                              >
                                {r.inTeams}
                              </div>
                              <div
                                className={`flex items-center rounded-lg p-3 justify-center sm:justify-left`}
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
              <div className="grid grid-cols-3 gap-1 md:grid-cols-[3fr_1fr_1fr_1fr] h-[18px]">
                <div />
                <div />
                <div className='teamColumnBackground rounded-lg !rounded-t-none' />
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
