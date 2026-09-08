'use client'

import React from 'react'
import Image from 'next/image'
import {
  CHECK_PRICING_BUTTON,
  EXCEPTIONS_HEADER_BUTTONS,
  EXCEPTIONS_HERO_IMAGE,
  EXCEPTIONS_OVERVIEW_PANELS,
  EXCEPTIONS_PRICING_CARDS,
  GET_STARTED_BUTTONS,
  GET_STARTED_IMAGE,
  WHY_EXCEPTIONS_CARDS,
} from './ExceptionsPage.constants'
import { TrustedByTeams } from '@/components/trusted-by'
import SectionLayout from '@/shared/components/molecules/FeaturePages/SectionLayout'
import FeaturePageHeader from '@/shared/components/molecules/FeaturePages/FeaturePageHeader'
import IconTitleDescriptionCardGrid from '@/shared/components/molecules/FeaturePages/IconTitleDescriptionCard'
import SigNozStats from '@/shared/components/molecules/FeaturePages/SignozStats'
import FeaturePageLayout from '@/shared/components/molecules/FeaturePages/FeaturePageLayout'
import Divider from '@/shared/components/molecules/FeaturePages/Divider'
import SplitSection from '@/shared/components/molecules/FeaturePages/SplitSection'
import { SplitSectionPanel } from '@/shared/components/molecules/FeaturePages/SplitSection/SplitSection.types'
import FeatureButton from '@/shared/components/molecules/FeaturePages/FeatureButton'
import CTABanner from '@/shared/components/molecules/FeaturePages/CTABanner'
import ButtonGroup from '@/shared/components/molecules/FeaturePages/ButtonGroup'

// Main Component Sections
const Header: React.FC = () => {
  return (
    <FeaturePageHeader
      className="theme-invert-images"
      title={
        <>
          Record Exceptions Automatically and <br />
          See detailed Stack Traces
        </>
      }
      description={
        <>
          Monitor exceptions automatically in Python, Java, Ruby, and Javascript.
          <br className="hidden lg:inline" />
          For other languages, just drop in a few lines of code and start monitoring exceptions.
        </>
      }
      buttons={EXCEPTIONS_HEADER_BUTTONS}
      heroImage={EXCEPTIONS_HERO_IMAGE.src}
      heroImageAlt={EXCEPTIONS_HERO_IMAGE.alt}
    />
  )
}

const SectionHeading: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="bg-[url('/img/background_blur/Frame_1862.webp')] bg-[length:65%] bg-[center_top_5rem] sm:bg-no-repeat">
      <div className="flex flex-col items-center justify-center py-28 text-center">
        <h2 className="m-0 max-w-4xl text-4xl font-semibold leading-[3.25rem] text-[var(--callout-sienna-title)] lg:text-[44px]">
          {children}
        </h2>
      </div>
    </div>
  )
}

const AlignedRowText: React.FC<{ panel: SplitSectionPanel; className: string }> = ({
  panel,
  className,
}) => {
  return (
    <div className={`flex flex-col px-6 pt-10 ${className}`}>
      <h2 className="mb-6 text-[var(--l1-foreground)]">{panel.title}</h2>
      <div className="mb-8 leading-relaxed text-[var(--l2-foreground)]">{panel.description}</div>
      {panel.button && (
        <FeatureButton button={panel.button} className="mb-8 flex w-fit items-center gap-2" />
      )}
    </div>
  )
}

const AlignedRowImage: React.FC<{ panel: SplitSectionPanel; className: string }> = ({
  panel,
  className,
}) => {
  return (
    <div className={`px-6 pb-10 ${className}`}>
      {panel.image && (
        <Image
          src={panel.image}
          alt={panel.imageAlt || ''}
          width={1440}
          height={810}
          sizes="(max-width: 768px) 100vw, 50vw"
          className="theme-invert"
        />
      )}
    </div>
  )
}

// Text blocks share the first grid row, so both images start on the same horizontal line
// even when one panel has a button or a longer description.
const AlignedSplitRow: React.FC<{ left: SplitSectionPanel; right: SplitSectionPanel }> = ({
  left,
  right,
}) => {
  return (
    <div className="relative">
      <div className="grid grid-cols-1 lg:grid-cols-2 lg:grid-rows-[auto_1fr]">
        <AlignedRowText panel={left} className="order-1 lg:col-start-1 lg:row-start-1" />
        <AlignedRowImage panel={left} className="order-2 lg:col-start-1 lg:row-start-2" />
        <AlignedRowText panel={right} className="order-3 lg:col-start-2 lg:row-start-1" />
        <AlignedRowImage panel={right} className="order-4 lg:col-start-2 lg:row-start-2" />
      </div>
      <Divider orientation="vertical" className="absolute left-1/2 top-0 hidden lg:block" />
    </div>
  )
}

const ExceptionsOverviewSections: React.FC = () => {
  const rows: Array<[number, number]> = []
  for (let i = 0; i < EXCEPTIONS_OVERVIEW_PANELS.length; i += 2) {
    rows.push([i, i + 1])
  }

  return (
    <>
      {rows.map(([leftIndex, rightIndex], rowIndex) => {
        const left = EXCEPTIONS_OVERVIEW_PANELS[leftIndex]
        const right: SplitSectionPanel | undefined = EXCEPTIONS_OVERVIEW_PANELS[rightIndex]
        const alignImages = right && (left.button || right.button) && (left.image || right.image)

        return (
          <React.Fragment key={leftIndex}>
            {rowIndex > 0 && <Divider />}
            {alignImages ? (
              <AlignedSplitRow left={left} right={right} />
            ) : (
              <SplitSection
                left={{ ...left, className: 'py-10', imageClassName: 'theme-invert' }}
                right={
                  right ? { ...right, className: 'py-10', imageClassName: 'theme-invert' } : <div />
                }
                withVerticalDivider={Boolean(right)}
              />
            )}
          </React.Fragment>
        )
      })}
    </>
  )
}

const InfoCardList: React.FC<{ cards: Array<{ title: string; description: string }> }> = ({
  cards,
}) => {
  return (
    <div className="flex w-full flex-col gap-4">
      {cards.map((card) => (
        <div
          key={card.title}
          className="rounded-md border border-[var(--l2-border)] bg-[var(--l2-background)] p-4"
        >
          <h3 className="mb-2 text-base font-medium text-[var(--l1-foreground)]">{card.title}</h3>
          <p className="mb-0 text-sm font-normal text-[var(--l2-foreground)]">{card.description}</p>
        </div>
      ))}
    </div>
  )
}

const ExceptionsPricingSection: React.FC = () => {
  return (
    <SectionLayout
      variant="bordered"
      className="!border-b-1 !border-t-1 border-dashed border-[var(--l2-border)] !px-0"
    >
      <div className="flex flex-col sm:flex-row">
        <div className="!w-[100%] flex-1 md:!w-[300px]">
          <p className="sticky top-[100px] px-10 pt-10 text-4xl font-bold !leading-[3.5rem] text-[var(--l1-foreground)] sm:text-4xl md:px-0 md:pl-12">
            Simple
            <br /> usage-based <br /> pricing
          </p>
        </div>
        <div className="flex-[2_2_0%]">
          <div className="border-l border-dashed border-[var(--l2-border)] bg-transparent p-0">
            <div className="flex flex-col gap-2 px-10 py-10">
              <div className="text-2xl font-semibold text-[var(--l1-foreground)]">
                SigNoz Cloud pricing you can trust
              </div>
              <p className="text-base font-normal text-[var(--l2-foreground)]">
                Tired of Datadog’s unpredictable bills or New Relic’s user-based pricing?
                <br />
                We’re here for you.
              </p>
              <InfoCardList cards={EXCEPTIONS_PRICING_CARDS} />
              <ButtonGroup buttons={[CHECK_PRICING_BUTTON]} className="mt-5 md:!justify-start" />
            </div>
          </div>
        </div>
      </div>
    </SectionLayout>
  )
}

const GetStartedBanner: React.FC = () => {
  return (
    <SectionLayout variant="bordered" className="!px-0">
      <CTABanner
        title={
          <>
            Get started with <br /> SigNoz Cloud today
          </>
        }
        buttons={GET_STARTED_BUTTONS}
      />
      <div className="flex items-center justify-center px-6 pb-16">
        <Image
          src={GET_STARTED_IMAGE.src}
          alt={GET_STARTED_IMAGE.alt}
          width={10000}
          height={10000}
          className="theme-invert w-full rounded-lg md:w-3/5"
        />
      </div>
    </SectionLayout>
  )
}

// Main Component
const ExceptionsPage: React.FC = () => {
  return (
    <FeaturePageLayout>
      <div className="mx-auto w-full">
        <Header />
        <TrustedByTeams page="Exceptions" />

        <SectionLayout variant="bordered" className="!px-0">
          <SectionHeading>
            Exceptions In <br /> SigNoz Cloud
          </SectionHeading>
          <Divider />
          <IconTitleDescriptionCardGrid cards={WHY_EXCEPTIONS_CARDS} variant="xl" titleLevel="h3" />
          <Divider />
          <SectionHeading>
            Exceptions Monitoring <br /> Overview
          </SectionHeading>
          <Divider />
          <ExceptionsOverviewSections />
          <Divider />
        </SectionLayout>

        <ExceptionsPricingSection />
        <SigNozStats />
        <GetStartedBanner />
      </div>
    </FeaturePageLayout>
  )
}

export default ExceptionsPage
