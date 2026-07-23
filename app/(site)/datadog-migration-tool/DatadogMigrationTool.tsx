'use client'

import React from 'react'
import { ArrowRight } from 'lucide-react'
import Button from '@/components/ui/Button'
import { AppModal as Modal } from '@/components/ui/Modal'
import { useDisclosure } from '@/hooks/useDisclosure'
import Image from 'next/image'
import {
  CARDS,
  LLM_POWERED_INTELLIGENCE_CARDS,
  HUBSPOT_DATA,
  WHAT_WE_SUPPORT_ITEMS,
} from './DatadogMigrationTool.constants'
import UsageBasedPricing from '@/shared/components/molecules/FeaturePages/UsageBasedPricing'
import SigNozStats from '@/shared/components/molecules/FeaturePages/SignozStats'
import SectionLayout from '@/shared/components/molecules/FeaturePages/SectionLayout'
import HeroCards from '@/shared/components/molecules/FeaturePages/HeroCards'
import HubspotCustomForm from '@/components/hubspot-custom-form/HubspotCustomForm'
import GridLayout from '@/shared/components/molecules/FeaturePages/GridLayout'
import Divider from '@/shared/components/molecules/FeaturePages/Divider'
import FeaturePageLayout from '@/shared/components/molecules/FeaturePages/FeaturePageLayout'
import CustomerStoriesSection from '@/shared/components/molecules/FeaturePages/CustomerStoriesSection'

const RequestEarlyAccessButton: React.FC<{ className?: string }> = ({ className = '' }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  return (
    <div className={`max-w-8xl relative z-[1] mx-2 ${className}`}>
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

      <p className="text-muted-foreground mt-3 text-center text-xs">
        Available on SigNoz Cloud paid plans
      </p>

      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        size="3xl"
        panelClassName="max-w-2xl rounded-3xl border border-border bg-background px-10 py-8 shadow-[0_20px_60px_rgba(9,16,29,0.35)]"
      >
        <HubspotCustomForm
          portalId={HUBSPOT_DATA.portalId}
          formId={HUBSPOT_DATA.formId}
          formName="Datadog Migration Tool"
        />
      </Modal>
    </div>
  )
}

const ReadyToMigrateBanner: React.FC = () => {
  return (
    <>
      <SectionLayout variant="bordered" className="pb-10">
        <h2 className="text-l1-foreground mb-6 pt-10 text-center text-4xl">
          Ready to Migrate from Datadog?
        </h2>

        <RequestEarlyAccessButton className="!mx-auto" />
      </SectionLayout>
    </>
  )
}

// Main Component Sections
const Header: React.FC = () => {
  return (
    <header className="relative">
      {/* Main content */}
      <div className="border-border absolute top-0 right-[12px] bottom-0 left-[12px] z-[0] border !border-t-0 !border-b-0 border-dashed md:right-[24px] md:left-[24px]" />

      <SectionLayout
        variant="bordered"
        className="relative !mx-auto flex flex-col items-center px-2 pt-12 pb-4 text-center"
      >
        <h1 className="text-gradient z-[1] my-4 !p-3 text-2xl font-semibold tracking-tight sm:my-2 sm:my-5 sm:text-3xl md:leading-[3.5rem] lg:text-[44px] dark:text-white">
          Migrate from Datadog to SigNoz <br className="hidden md:block" /> in Minutes
        </h1>

        <p className="text-muted-foreground m-0 p-3 text-lg leading-8 font-normal sm:p-0">
          LLM-powered migration tool that automatically translates your Datadog dashboards to{' '}
          <br className="hidden md:block" /> SigNoz through a simple UI, preserving your
          configurations, queries, and panels.
        </p>
      </SectionLayout>

      {/* Buttons */}
      <RequestEarlyAccessButton className="max-w-8xl border-border !mx-auto border !border-t-0 !border-b-0 border-dashed pt-4 pb-12 md:mx-5" />

      {/* Hero image */}
      <SectionLayout variant="bordered" className="!mt-0 max-md:-mb-[3rem]">
        <Image
          src="/img/platform/DatadogMigrationToolHero.webp"
          alt="Datadog migration tool hero"
          className="w-full rounded-xl"
          width={10000}
          height={10000}
        />
      </SectionLayout>
    </header>
  )
}

const TopHeroSection: React.FC = () => {
  return (
    <SectionLayout variant="bordered" className="!px-0">
      <Divider />
      <div className="mb-8 text-center">
        <h2 className="text-l1-foreground dark:text-sienna-100 mb-6 pt-12 text-4xl font-semibold">
          Typical Migration Pain
        </h2>
      </div>
      <HeroCards cards={CARDS} layoutVariant={'no-border'} variant="combined" />
      <Divider />
    </SectionLayout>
  )
}

const LlmPoweredIntelligenceSection: React.FC = () => {
  return (
    <SectionLayout variant="bordered" className="bg-background !px-0">
      <div className="mb-6 max-w-4xl px-8 py-6">
        <h2 className="text-l1-foreground dark:text-sienna-100 mb-6 text-4xl font-semibold">
          LLM-Powered Intelligence
        </h2>
        <p className="text-muted-foreground leading-relaxed">
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

const SimpleAutomatedMigrationSection: React.FC = () => {
  return (
    <SectionLayout variant="bordered" className="!px-0">
      <div className="pt-10 pb-0">
        <h2 className="text-l1-foreground dark:text-sienna-100 text-center text-4xl font-semibold">
          Simple, Automated Migration
        </h2>
      </div>
      <GridLayout variant="split" className="px-10 pb-10 max-lg:!grid max-lg:grid-cols-1">
        <div className="flex w-full flex-col gap-4 pr-4 max-lg:pr-0">
          <div className="mb-4">
            <span className="flex items-center gap-2 font-bold text-red-400 uppercase">I</span>
            <h2 className="text-l1-foreground dark:text-sienna-100 mb-6">
              Get Your Dashboard Data
            </h2>
            <p className="text-muted-foreground leading-relaxed">
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
            className="border-border/40 w-full rounded-lg border"
          />
          <div className="hidden lg:block">
            <span className="flex items-center gap-2 font-bold text-red-400 uppercase">III</span>
            <h2 className="text-l1-foreground dark:text-sienna-100 mb-6">Import to SigNoz</h2>
            <p className="text-muted-foreground leading-relaxed">
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
            <span className="flex items-center gap-2 font-bold text-red-400 uppercase">II</span>
            <h2 className="text-l1-foreground dark:text-sienna-100 mb-6">
              LLM-Powered Translation
            </h2>
            <p className="text-muted-foreground leading-relaxed">
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
          <span className="flex items-center gap-2 font-bold text-red-400 uppercase">III</span>
          <h2 className="text-l1-foreground dark:text-sienna-100 mb-6">Import to SigNoz</h2>
          <p className="text-muted-foreground leading-relaxed">
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
      index !== WHAT_WE_SUPPORT_ITEMS.length - 1 ? 'border-b border-border border-dashed' : ''
    const desktopRowBorder =
      index < WHAT_WE_SUPPORT_ITEMS.length / 2
        ? 'md:border-b md:border-border md:border-dashed'
        : 'md:border-b-0'
    const desktopColumnBorder =
      index % 2 === 1 ? 'md:border-l md:border-border md:border-dashed' : ''

    return `${baseClasses} ${mobileBorder} ${desktopRowBorder} ${desktopColumnBorder}`.trim()
  }

  return (
    <SectionLayout variant="bordered">
      <div className="px-6 py-8">
        <h2 className="text-l1-foreground dark:text-sienna-100 mb-6 text-4xl font-semibold">
          What We Support
        </h2>
        <p className="text-muted-foreground leading-relaxed">
          The tool manages the migration of metrics, logs, and traces dashboards, and also supports
          Datadog integrations such as Redis, PostgreSQL, and AWS. Here's what gets automatically
          translated:
        </p>
      </div>
      <div className="w-full">
        <div className="grid grid-cols-1 md:grid-cols-2">
          {WHAT_WE_SUPPORT_ITEMS.map((item, index) => (
            <div key={index} className={`${getCellClasses(index)}`}>
              <span className="text-muted-foreground flex items-center gap-2 text-xs uppercase">
                {item.label} {item.title}
              </span>
              <p className="m-0 leading-relaxed">{item.description}</p>
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
    <FeaturePageLayout showProductNav={false}>
      <Header />
      <TopHeroSection />
      <SimpleAutomatedMigrationSection />
      <Divider />
      <WhatWeSupportSection />
      <Divider />
      <LlmPoweredIntelligenceSection />
      <Divider />
      <ReadyToMigrateBanner />
      <UsageBasedPricing show={['logs', 'traces', 'metrics']} />
      <SigNozStats />
      <Divider />
      <CustomerStoriesSection
        tracking={{
          clickName: 'Customer Stories Button',
          clickLocation: 'Datadog Migration Tool Page',
        }}
      />
    </FeaturePageLayout>
  )
}

export default DatadogMigrationTool
