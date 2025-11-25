'use client'

import React from 'react'
import { ArrowRight } from 'lucide-react'
import Button from '@/components/ui/Button'
import { Modal, ModalBody, ModalContent, useDisclosure } from '@nextui-org/react'
import ProductNav from '@/components/ProductNav/ProductNav'
import Image from 'next/image'
import {
  CARDS,
  LLM_POWERED_INTELLIGENCE_CARDS,
  HUBSPOT_DATA,
  WHAT_WE_SUPPORT_ITEMS,
} from './DatadogMigrationTool.constants'
import UsageBasedPricing from '@/shared/components/molecules/FeaturePages/UsageBasedPricing'
import SigNozStats from '@/shared/components/molecules/FeaturePages/SignozStats'
import TestimonialCards from '@/shared/components/molecules/FeaturePages/TestimonialCard'
import SectionLayout from '@/shared/components/molecules/FeaturePages/SectionLayout'
import HeroCards from '@/shared/components/molecules/FeaturePages/HeroCards'
import { HubspotProvider } from '@aaronhayes/react-use-hubspot-form'
import PricingForm from '../pricing-form'
import GridLayout from '@/shared/components/molecules/FeaturePages/GridLayout'

const RequestEarlyAccessButton: React.FC<{ className?: string }> = ({ className = '' }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  return (
    <div className={`relative z-[1] mx-2 ${className}`}>
      <div className="flex items-center justify-center">
        <Button
          variant="default"
          isButton
          rounded="full"
          className="flex items-center gap-2"
          onClick={onOpen}
          data-modal-trigger="datadog-migration-modal"
        >
          Request Early Access
          <ArrowRight size={14} />
        </Button>
      </div>

      <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="3xl" placement="center">
        <ModalContent className="max-w-2xl rounded-3xl border border-signoz_slate-200 bg-white text-signoz_ink-500 shadow-[0_20px_60px_rgba(9,16,29,0.35)]">
          {(closeHandler) => (
            <ModalBody className="px-10 py-8 text-signoz_ink-500">
              <HubspotProvider>
                <PricingForm portalId={HUBSPOT_DATA.portalId} formId={HUBSPOT_DATA.formId} />
              </HubspotProvider>
            </ModalBody>
          )}
        </ModalContent>
      </Modal>
    </div>
  )
}

const ReadyToMigrateBanner: React.FC = () => {
  return (
    <SectionLayout
      variant="no-border"
      className="!border-x-0 !border-t-1 !border-dashed !border-signoz_slate-400 py-10"
    >
      <h2 className="mb-6 text-center text-4xl text-signoz_vanilla-100">
        Ready to Migrate from Datadog?
      </h2>
      <RequestEarlyAccessButton className="!mx-auto" />
    </SectionLayout>
  )
}

// Main Component Sections
const Header: React.FC = () => {
  return (
    <header className="relative !mx-auto mt-16 !w-[100vw] md:!w-[80vw]">
      {/* Border decorations */}
      <div className="absolute bottom-0 left-[12px] right-[12px] top-0 z-[0] border !border-b-0 !border-t-0 border-dashed border-signoz_slate-400 md:left-[24px] md:right-[24px]" />

      {/* Main content */}
      <div className="relative !mx-auto flex !w-[100vw] flex-col items-center border !border-b-0 border-dashed border-signoz_slate-400 px-2 pb-4 pt-12 text-center md:!w-[80vw] md:px-5 md:pt-[4rem]">
        <h1 className="text-gradient z-[1] my-4 !p-3 text-2xl font-semibold tracking-tight dark:text-white sm:my-2 sm:my-5 sm:text-3xl md:leading-[3.5rem] lg:text-[44px]">
          Migrate from Datadog to SigNoz <br className="hidden md:block" /> in Minutes
        </h1>

        <p className="m-0 p-3 text-lg font-normal leading-8 text-signoz_vanilla-400 sm:p-0">
          LLM-powered migration tool that automatically translates your Datadog dashboards to{' '}
          <br className="hidden md:block" /> SigNoz through a simple UI, preserving your
          configurations, queries, and panels.
        </p>
      </div>

      {/* Buttons */}
      <RequestEarlyAccessButton className="!mx-auto !w-[100vw] border !border-b-0 !border-t-0 border-dashed border-signoz_slate-400 pb-12 pt-4 md:mx-5 md:!w-[80vw]" />

      {/* Hero image */}
      <SectionLayout variant="bordered" className="!mt-0 max-md:-mb-[3rem]">
        <div className="w-100 mx-[-28px]">
          <Image
            src="/img/platform/DatadogMigrationToolHero.png"
            alt="Datadog migration tool hero"
            className="w-full rounded-xl"
            width={10000}
            height={10000}
          />
        </div>
      </SectionLayout>
    </header>
  )
}

const TopHeroSection: React.FC = () => {
  return (
    <SectionLayout
      variant="bordered"
      className="!border-b-1 !border-t-1 !border-dashed !border-signoz_slate-400"
    >
      <div className="mb-8 text-center">
        <h2 className="mb-6 pt-12 text-4xl font-semibold text-signoz_sienna-100">
          Typical Migration Pain
        </h2>
      </div>
      <HeroCards cards={CARDS} layoutVariant={'no-border'} variant="combined" />
    </SectionLayout>
  )
}

const LlmPoweredIntelligenceSection: React.FC = () => {
  return (
    <SectionLayout
      variant="bordered"
      className="!border-t-1 !border-dashed !border-signoz_slate-400 bg-signoz_ink-500"
    >
      <div className="mb-6 max-w-4xl px-8 py-6">
        <h2 className="mb-6 text-4xl font-semibold text-signoz_sienna-100">
          LLM-Powered Intelligence
        </h2>
        <p className="leading-relaxed text-signoz_vanilla-400">
          The migration tool uses LLM to intelligently translate dashboards between platforms,
          understanding context and intent rather than relying on literal syntax matching. This
          allows for a more accurate and efficient migration.
        </p>
      </div>
      <HeroCards
        cards={LLM_POWERED_INTELLIGENCE_CARDS}
        layoutVariant={'no-border'}
        variant="combined"
      />
    </SectionLayout>
  )
}

const CustomerStories: React.FC = () => {
  return (
    <>
      {/* Featured testimonial */}
      <section className="relative mx-auto w-[100vw] overflow-hidden border !border-b-0 !border-t-0 border-dashed border-signoz_slate-400 bg-[url('/img/background_blur/Ellipse_388.png')] bg-[center_top_calc(-78px)] md:w-[80vw]">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-signoz_ink-500/50 via-signoz_ink-500/25 to-signoz_ink-500/90" />

        <div className="relative">
          <div className="container pb-16">
            <div className="flex flex-col gap-6 py-32">
              <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
                <div className="flex flex-col items-center gap-12 text-2xl font-medium leading-[3.25rem] text-signoz_sienna-100">
                  <Image
                    src="/img/case_study/logos/shaped-logo.svg"
                    alt="Shaped"
                    width={100}
                    height={100}
                  />
                  Every single time we have an issue, SigNoz is always the first place to check. It
                  was super straightforward to migrate - just updating the exporter configuration,
                  basically three lines of code.
                  <span className="text-sm text-signoz_vanilla-400">
                    <span className="font-semibold">Karl Lyons</span> <br /> Senior SRE, Shaped
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials grid */}
      <SectionLayout variant="bordered" className="!mx-auto p-0 max-md:-mb-[3rem]">
        <div className="container pb-16">
          <TestimonialCards />

          <div className="z-5 relative -mt-[25rem] flex h-96 items-end justify-center bg-gradient-to-t from-signoz_ink-500 to-transparent py-6 max-md:py-16">
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
      </SectionLayout>
    </>
  )
}

const SimpleAutomatedMigrationSection: React.FC = () => {
  return (
    <SectionLayout variant="bordered" className="!px-0">
      <div className="pb-0 pt-10">
        <h2 className="text-center text-4xl font-semibold text-signoz_sienna-100">
          Simple, Automated Migration
        </h2>
      </div>
      <GridLayout variant="split" className="px-10 pb-10 max-lg:!grid max-lg:grid-cols-1">
        <div className="flex w-full flex-col gap-4 pr-4 max-lg:pr-0">
          <div className="mb-4">
            <span className="flex items-center gap-2 font-bold uppercase text-red-400">I</span>
            <h2 className="mb-6 text-signoz_sienna-100">Get Your Dashboard Data</h2>
            <p className="leading-relaxed text-signoz_vanilla-400">
              Export your Datadog dashboard configurations in JSON format. This includes all panels,
              queries, visualizations, and alert configurations so there’s nothing manual for your
              team to migrate.
            </p>
          </div>
          <Image
            src="/img/datadog-migration-tool/get-your-dashboard-data.png"
            alt="Get Your Dashboard Data"
            width={10000}
            height={10000}
            className="w-full rounded-lg border border-signoz_slate-400/40"
          />
          <div className="hidden lg:block">
            <span className="flex items-center gap-2 font-bold uppercase text-red-400">III</span>
            <h2 className="mb-6 text-signoz_sienna-100">Import to SigNoz</h2>
            <p className="leading-relaxed text-signoz_vanilla-400">
              Import the translated dashboards into SigNoz through a UI. Your dashboards are ready
              to use immediately with the same visual layouts, queries, and alerting logic you had
              in Datadog.
            </p>
          </div>
        </div>

        <div className="flex w-full flex-col gap-0 pl-4 max-lg:pl-0">
          <div className="-mb-12 -ml-24 flex justify-start pt-16 max-lg:hidden">
            <Image
              src="/img/datadog-migration-tool/downwards-arrow-1.svg"
              alt="Downwards Arrow"
              width={100}
              height={100}
              className="h-3/4 w-2/3 object-contain"
            />
          </div>
          <div className="order-first lg:order-none">
            <span className="flex items-center gap-2 font-bold uppercase text-red-400">II</span>
            <h2 className="mb-6 text-signoz_sienna-100">LLM-Powered Translation</h2>
            <p className="leading-relaxed text-signoz_vanilla-400">
              Our tool automatically translates your dashboards, mapping metrics, queries, and panel
              configurations to SigNoz formats. The LLM intelligently learns from sample dashboards,
              auto-fills mappings, and gently surfaces differences between platforms.
            </p>
          </div>
          <div className="flex justify-start max-lg:hidden">
            <Image
              src="/img/datadog-migration-tool/downwards-arrow-2.svg"
              alt="Downwards Arrow"
              width={100}
              height={100}
              className="h-full w-1/2 object-contain"
            />
          </div>
        </div>

        <div className="lg:hidden">
          <span className="flex items-center gap-2 font-bold uppercase text-red-400">III</span>
          <h2 className="mb-6 text-signoz_sienna-100">Import to SigNoz</h2>
          <p className="leading-relaxed text-signoz_vanilla-400">
            Import the translated dashboards into SigNoz through a UI. Your dashboards are ready to
            use immediately with the same visual layouts, queries, and alerting logic you had in
            Datadog.
          </p>
        </div>
      </GridLayout>
    </SectionLayout>
  )
}

const WhatWeSupportSection: React.FC = () => {
  const getCellClasses = (index: number) => {
    const baseClasses = 'p-6 flex flex-col gap-4 min-h-[200px]'
    const mobileBorder =
      index !== WHAT_WE_SUPPORT_ITEMS.length - 1
        ? 'border-b border-signoz_slate-400 border-dashed'
        : ''
    const desktopRowBorder =
      index < WHAT_WE_SUPPORT_ITEMS.length / 2
        ? 'md:border-b md:border-signoz_slate-400 md:border-dashed'
        : 'md:border-b-0'
    const desktopColumnBorder =
      index % 2 === 1 ? 'md:border-l md:border-signoz_slate-400 md:border-dashed' : ''

    return `${baseClasses} ${mobileBorder} ${desktopRowBorder} ${desktopColumnBorder}`.trim()
  }

  return (
    <SectionLayout
      variant="no-border"
      className="!border-x-0 !border-t-1 !border-dashed !border-signoz_slate-400"
    >
      <div className="px-6 py-8">
        <h2 className="mb-6 text-4xl font-semibold text-signoz_sienna-100">What We Support</h2>
        <p className="leading-relaxed text-signoz_vanilla-400">
          The tool manages the migration of metrics, logs, and traces dashboards, and also supports
          Datadog integrations such as Redis, PostgreSQL, and AWS. Here's what gets automatically
          translated:
        </p>
      </div>
      <div className="w-full">
        <div className="grid grid-cols-1 md:grid-cols-2">
          {WHAT_WE_SUPPORT_ITEMS.map((item, index) => (
            <div key={index} className={`${getCellClasses(index)}`}>
              <span className="flex items-center gap-2 text-xs uppercase text-signoz_vanilla-400">
                {item.label} {item.title}
              </span>
              <p className="leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </SectionLayout>
  )
}

// Main Component
const DatadogMigrationTool: React.FC = () => {
  return (
    <main className="!mt-[-10px] mb-auto">
      <ProductNav />

      <div className="relative bg-signoz_ink-500">
        {/* Background decorations */}
        <div className="bg-dot-pattern masked-dots absolute top-0 flex h-screen w-full items-center justify-center" />
        <div className="absolute left-0 right-0 top-0 mx-auto h-[450px] w-full flex-shrink-0 rounded-[956px] bg-gradient-to-b from-[rgba(190,107,241,1)] to-[rgba(69,104,220,0)] bg-[length:110%] bg-no-repeat opacity-30 blur-[300px] sm:bg-[center_-500px] md:h-[956px]" />

        {/* Main sections */}
        <Header />
        <TopHeroSection />

        <SimpleAutomatedMigrationSection />

        <SectionLayout variant="bordered" className="!px-0">
          <WhatWeSupportSection />
          <LlmPoweredIntelligenceSection />
          <ReadyToMigrateBanner />
        </SectionLayout>

        <UsageBasedPricing show={['logs', 'traces', 'metrics']} />
        <SigNozStats />
        <CustomerStories />
      </div>
    </main>
  )
}

export default DatadogMigrationTool
