'use client'

import React from 'react'
import { ArrowRight, BookOpen } from 'lucide-react'
import Button from '@/components/ui/Button'
import StatsCard from '@/components/Card/card'
import { Card } from '@/components/ui/Card'
import { Badge } from "@signozhq/badge"
import ProductNav from '@/components/ProductNav/ProductNav'
import Image from 'next/image'
import AlternatingSides from '@/components/AlternatingSides/AlternatingSides'
import PricingCalculator from 'app/pricing/pricingv1/components/PricingCalculator'
import { CARDS, FEATURES, TESTIMONIALS } from './LogManagement.constants'

const CustomerStories = () => {
  return (
    <>
      <section className="relative mx-auto w-[100vw] border !border-b-0 !border-t-0 border-dashed border-signoz_slate-400 bg-[url('/img/background_blur/Ellipse_388.png')] bg-[center_top_calc(-78px)] md:w-[80vw] overflow-hidden">
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-signoz_ink-500/50 via-signoz_ink-500/25 to-signoz_ink-500/90 pointer-events-none" />
        
        <div className="relative">
          <div className={`container pb-16`}>
            <div className="flex flex-col gap-6 pb-32">
              <div className="mx-auto mt-[50px] flex max-w-4xl flex-col items-center text-center">
                <div className="text-2xl font-medium leading-[3.25rem] text-signoz_sienna-100 flex flex-col items-center gap-12">
                  <Image src="/img/case_study/logos/shaped-logo.svg" alt="Shaped" width={100} height={100} />
                  Every single time we have an issue, SigNoz is always the first place to check. It was super straightforward to migrate - just updating the exporter configuration, basically three lines of code.
                  <span className="text-signoz_vanilla-400 text-sm"><span className="font-semibold">Karl Lyons</span> <br /> Senior SRE, Shaped</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <div className="section-container !mx-auto !w-[100vw] border !border-b-0 !border-t-0 border-none border-signoz_slate-400 max-sm:-mb-[3rem] md:!w-[80vw] md:border-dashed p-0">
        <div className="container pb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 px-20">
            {TESTIMONIALS.map((testimonial, index) => (
              <Card key={index} className="p-0 [&>*]:border-1 [&>*]:border-solid">
                <div className="flex flex-col gap-4 p-6">
                  <div className="flex items-center gap-4">
                    <Image 
                      src={testimonial.image} 
                      alt={testimonial.name} 
                      width={48} 
                      height={48} 
                      className="rounded-full"
                    />
                    <div>
                      <h3 className="text-signoz_vanilla-100 font-medium">{testimonial.name}</h3>
                      <p className="text-signoz_vanilla-400 text-sm">{testimonial.role}</p>
                    </div>
                  </div>
                  <p className="text-signoz_vanilla-100">{testimonial.testimonial}</p>
                </div>
              </Card>
            ))}
          </div>
          
          <div className="flex justify-center items-end -mt-96 z-5 bg-gradient-to-t from-signoz_ink-500 to-transparent relative h-[50vh] py-6">
            <Button 
              variant="secondary" 
              rounded="full"
              className="flex items-center gap-2"
              to="/case-study/"
            >
              Read customer stories
              <ArrowRight size={14} />
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}

const STORAGE_DATA = {
  headers: {
    hot: "HOT STORAGE PERIOD",
    cold: "PERIOD IN COLD STORAGE AFTER HOT STORAGE"
  },
  subHeader: "$ / GB",
  coldPeriods: [
    { value: "0", unit: "days" },
    { value: "90", unit: "days" },
    { value: "180", unit: "days" },
    { value: "1", unit: "year" },
    { value: "2", unit: "years" }
  ],
  rows: [
    {
      period: { value: "15", unit: "days" },
      prices: [0.3, 0.45, 0.6, 0.9, 1.3]
    },
    {
      period: { value: "30", unit: "days" },
      prices: [0.4, 0.55, 0.7, 1.0, 1.4]
    },
    {
      period: { value: "90", unit: "days" },
      prices: [0.6, 0.75, 0.9, 1.2, 1.6]
    },
    {
      period: { value: "180", unit: "days" },
      prices: [0.8, 0.95, 1.1, 1.4, 1.8]
    }
  ]
};

function LogsManagement() {
  return (
    <main className="!mt-[-10px] mb-auto">
      <ProductNav />
      <div className="relative bg-signoz_ink-500">
        <div className="bg-dot-pattern masked-dots absolute top-0 flex h-screen w-full items-center justify-center" />
        <div className="absolute left-0 right-0 top-0 mx-auto h-[450px] w-full  flex-shrink-0 rounded-[956px] bg-gradient-to-b from-[rgba(190,107,241,1)] to-[rgba(69,104,220,0)] bg-[length:110%] bg-no-repeat opacity-30 blur-[300px] sm:bg-[center_-500px] md:h-[956px]" />
        <Header />
        <HeroCards />
        <div className="section-container !mx-auto !w-[100vw] border !border-b-0 border-dashed border-signoz_slate-400 !px-0 md:!w-[80vw]">
          <AlternatingSides items={FEATURES} />
          <div className="p-0 border-signoz_slate-400 border-dashed bg-transparent">
            <div className="flex flex-col md:flex-row gap-12 items-start h-full p-6">
              <div className="flex-1 h-full flex flex-col justify-between">
                <h2 className="font-semibold text-signoz_vanilla-100">Store your Data</h2>
                <p className="text-signoz_vanilla-400 mb-24 leading-relaxed">Configurable hot and cold storage periods let you balance query performance with storage costs for long-term log retention and compliance needs.</p>
                <div className="flex gap-12">
                  <div className="border-r border-signoz_slate-400/60 border-dashed pr-12">
                    <h3 className=" font-semibold text-signoz_vanilla-100 mb-4">50%</h3>
                    <div className="text-signoz_vanilla-400">Storage Savings</div>
                  </div>
                  <div>
                    <h3 className=" font-semibold text-signoz_vanilla-100 mb-4">2 years</h3>
                    <div className="text-signoz_vanilla-400">Configurable Retention</div>
                  </div>
                </div>
              </div>
              <div className="flex-1">
                <div className="w-full">
                  <table className="w-full border-collapse">
                    <thead className='!border-1 !border-signoz_slate-400'>
                      <tr className='!border-signoz_slate-400 border-y-1'>
                        <td className="!border-none !border-signoz_slate-800 px-2 py-4 bg-signoz_ink-400/60">
                          <div className="text-xs font-medium text-signoz_vanilla-400">
                            HOT STORAGE PERIOD
                          </div>
                        </td>
                        <td className="!border-none !border-signoz_slate-800 px-2 py-4 text-center bg-signoz_ink-400" colSpan={5}>
                          <div className="text-xs font-medium text-signoz_vanilla-400">
                            PERIOD IN COLD STORAGE AFTER HOT STORAGE
                          </div>
                        </td>
                      </tr>
                      <tr className='!border-signoz_slate-400 border-y-1'>
                        <td className="!border-none p-2 bg-signoz_ink-400" />
                        {STORAGE_DATA.coldPeriods.map((period, index) => (
                          <td key={index} className="!border-none p-4 text-center">
                            <div className="text-xs font-medium text-signoz_vanilla-400">
                              {period.value} {period.unit}
                            </div>
                          </td>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="w-full !border-1 !border-signoz_slate-400">
                      {STORAGE_DATA.rows.map((row, rowIndex) => (
                        <tr key={rowIndex} className="!border-signoz_slate-400 border-y-1 bg-signoz_ink-400/40">
                          <td className="!border-none p-2 bg-signoz_ink-400/60">
                            <div className="flex justify-between items-center text-signoz_robin-400 text-xs">
                              {row.period.value} {row.period.unit} <Badge color="vanilla">$ / GB</Badge>
                            </div>
                          </td>
                          {row.prices.map((price, priceIndex) => (
                            <td key={priceIndex} className="!border-none p-2 text-center text-signoz_vanilla-100 text-xs">
                              {price}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
        <UsageBasedPricing />
        <SigNozStats />
        <CustomerStories />
      </div>
    </main>
  )
}

const HeroCards = () => {
  return (
    <div className="section-container !mx-auto !w-[90vw] border !border-b-0 !border-t-0 border-none border-signoz_slate-400 max-sm:-mb-[3rem] md:!w-[80vw] md:border-dashed p-0">
      <div className="grid grid-cols-1 md:grid-cols-3">
        {CARDS.map((card, index) => (
          <div key={index} className="p-0 border-r border-t border-signoz_slate-400 border-dashed bg-transparent">
            <div className="p-8">
              <div className="grid grid-cols-1 gap-4">
                {card.icon}
                <h3 className="text-xl font-semibold text-signoz_vanilla-100 m-0">{card.title}</h3>
              </div>
              <p className="mt-2 mb-0 text-sm text-signoz_vanilla-400">{card.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default LogsManagement

const PlatformCard = ({ title, description }) => {
  return (
    <div className="rounded-md border border-signoz_slate-500 bg-signoz_ink-400 p-4">
      <h3 className="mb-2 text-base font-medium text-signoz_vanilla-100">{title}</h3>
      <p className="mb-0 text-sm font-normal text-signoz_vanilla-400">{description}</p>
    </div>
  )
}

const DevelopersLoveSigNozCards = () => {
  const Usage = [
    {
      title: 'Cloud',
      description:
        'Add as many teamFully managed, SOC 2-compliant, ideal for teams who want to start quickly without managing infrastructure members as you want.',
    },
    {
      title: 'Self-Host',
      description:
        'For tighter security & data residency requirements. It is Apache 2.0 open source, built on open standards.'
    },
  ]

  return (
    <div className="flex w-full flex-col gap-4">
      {Usage.map((feature, index) => (
        <PlatformCard key={index} title={feature.title} description={feature.description} />
      ))}
    </div>
  )
}

const Header = () => {
  return (
    <header className="relative !mx-auto mt-16 !w-[100vw] md:!w-[80vw]">
      <div className="absolute bottom-0 left-[12px] right-[12px] top-0 z-[0] border !border-b-0 !border-t-0 border-dashed border-signoz_slate-400 md:left-[24px] md:right-[24px]" />
      <div className="relative !mx-auto flex !w-[100vw] flex-col items-center border !border-b-0 border-dashed border-signoz_slate-400 px-2 pb-4 pt-12 text-center md:!w-[80vw] md:px-5 md:pt-[8.5rem]">
        <div className="absolute left-0 top-[101px] z-[0] h-9 !w-[100vw] border !border-l-0 !border-r-0 border-dashed border-signoz_slate-400 sm:h-14 md:top-[225px] md:!w-[80vw]" />

        <h1 className="text-gradient z-[1] my-4 !p-3 text-2xl font-semibold tracking-tight dark:text-white sm:my-2 sm:my-5 sm:text-3xl md:leading-[3.5rem] lg:text-[44px]">
          High-Performance Log Analytics <br /> Built on Columnar Database
        </h1>

        <p className="m-0 p-3 text-lg font-normal leading-8 text-signoz_vanilla-400 sm:p-0">
          Ingest logs from anywhere, quickly search and analyze with a powerful query <br /> builder backed by ClickHouse, and correlate your logs with other signals.
        </p>
      </div>
      <div className="relative z-[1] !mx-auto mx-2 flex !w-[100vw] flex-col items-center justify-center gap-3 border !border-b-0 !border-t-0 border-dashed border-signoz_slate-400 pb-12 pt-4 md:mx-5 md:!w-[80vw] md:flex-row">
        <Button 
          to="/teams/"
          variant="default" 
          rounded="full" 
          className="flex-center !w-fit" 
          id="btn-get-started-homepage-hero"
        >
          Get Started - Free
          <ArrowRight size={14} />
        </Button>

        <Button 
          to="/docs/introduction/"
          variant="secondary" 
          rounded="full" 
          className="flex-center !w-fit" 
          id="btn-read-documentation-homepage-hero"
        >
          Read Documentation
          <ArrowRight size={14} />
        </Button>
      </div>
      <div className="section-container !mx-auto !mt-0 !w-[90vw] border !border-b-0 !border-t-0 border-none border-signoz_slate-400 max-sm:-mb-[3rem] md:!w-[80vw] md:border-dashed">
        <div className="w-100 mx-[-28px]">
          <div className="product-explainer-video hero-figure rounded-xl px-3">
            <div className="embed-container">
              <div className="absolute w-full">
                <div className="p-1">
                  <Image
                    src="/img/log-management/LogManagementHero.svg"
                    alt="Log management hero"
                    className="w-full rounded-xl"
                    width={10000}
                    height={10000}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

const UsageBasedPricing = () => {
  return (
    <div className="section-container !mx-auto !w-[100vw] border !border-b-0 border-dashed border-signoz_slate-400 !px-0 md:!w-[80vw]">
      <div className="flex flex-col sm:flex-row">
        <div className="!w-[100%]  flex-1 md:!w-[300px]">
          <p className="sticky top-[100px] px-10 pl-0 pt-10 text-4xl font-bold !leading-[3.5rem] text-signoz_vanilla-100 sm:text-[44px] md:px-0 md:pl-12">
            Simple
            <br /> usage-based <br /> pricing
          </p>
        </div>
        <div className="flex-[2_2_0%]">
          <div className="bg-transparent p-0 border-b border-l border-signoz_slate-400 border-dashed">
            <div className="px-10 py-10 flex flex-col gap-2">
              <div className="text-2xl font-semibold text-signoz_vanilla-100">
                Pricing you can trust
              </div>
              <p className="text-base font-normal text-signoz_vanilla-400">
                Tired of Datadog's unpredictable bills or New Relic's user-based pricing?
                <br />
                We're here for you.
              </p>
              <div className="[&>div]:border-0 [&>div]:bg-transparent">
                <PricingCalculator show={["logs"]} showHeader={false} showFooter={false} />
              </div>
              <Card className="bg-transparent p-0 [&>div]:border-0">
                <div className="flex items-center justify-between gap-4 p-4 bg-signoz_robin-500/10 rounded-lg">
                  <span className="text-signoz_robin-400">Calculate your exact monthly bill</span>
                  <Button variant="default" rounded="full" className="flex-center !w-fit" id="btn-get-started-homepage-hero" to="/pricing/">
                    Check Pricing
                    <ArrowRight size={14} />
                  </Button>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const SigNozStats = () => {
  const STATS_LIST = [
    {
      id: 1,
      logo: '/img/index_features/download.svg',
      name: 'OSS Downloads',
      value: '10 million+',
    },
    { id: 2, logo: '/img/index_features/github.svg', name: 'GitHub Stars', value: '23k+' },
  ]

  return (
    <section>
      <div className="">
        <div className="section-container !mx-auto flex !w-[100vw] flex-col border !border-b-0 !border-t-0 border-dashed border-signoz_slate-400 !px-0 sm:flex-row md:!w-[80vw]">
          <div className="!w-[300px] flex-1 border !border-b-0 !border-l-0 !border-r-0 border-dashed border-signoz_slate-400">
            <p className="pl-12 pt-10 text-left text-4xl font-bold !leading-[3.5rem] text-signoz_vanilla-100 sm:text-[44px]">
              Developers <br />
              Love
              <br />
              SigNoz
            </p>
          </div>

          <div className="flex flex-[2_2_0%] flex-col">
            <div className="p-0 bg-transparent border-b border-l border-signoz_slate-400 border-dashed">
              <div className="p-6">
                <DevelopersLoveSigNozCards />
              </div>
              <div className="grid grid-cols-1 text-left sm:grid-cols-2 [&>div]:border-l-0 [&>div]:!border-r-1 [&>div]:border-signoz_slate-400">
                {STATS_LIST.map((stat, index) => (
                  <StatsCard
                    logo={stat.logo}
                    stats={stat.value}
                    description={stat.name}
                    logoSize={24}
                    key={index}
                  />
                ))}
              </div>
              <div className="flex flex-col items-center gap-3 border-t border-signoz_slate-400 border-dashed py-6 sm:flex-row sm:py-6 sm:pl-10">
                <Button variant="default" rounded="full" href="https://signoz.io/slack/" className="flex-center !w-fit" id="btn-join-community-homepage">
                  <BookOpen className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                  Join the community
                  <ArrowRight className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                </Button>
                <Button variant="secondary" rounded="full" href="https://github.com/SigNoz/signoz/" className="flex-center !w-fit" id="btn-github-repo-homepage">
                  <BookOpen className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                  GitHub Repository
                  <ArrowRight className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}