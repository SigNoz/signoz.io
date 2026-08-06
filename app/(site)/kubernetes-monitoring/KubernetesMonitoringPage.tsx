'use client'

import { ArrowRight } from 'lucide-react'
import Button from '@/components/ui/Button'
import SectionLayout from '@/shared/components/molecules/FeaturePages/SectionLayout'
import FeaturePageHeader from '@/shared/components/molecules/FeaturePages/FeaturePageHeader'
import IconTitleDescriptionCardGrid from '@/shared/components/molecules/FeaturePages/IconTitleDescriptionCard'
import FeaturePageLayout from '@/shared/components/molecules/FeaturePages/FeaturePageLayout'
import { HEADER_BUTTONS, FEATURE_CARDS } from './KubernetesMonitoringPage.constants'
import TrackingLink from '@/components/TrackingLink'
import DitherCanvas from '@/components/DitherCanvas/DitherCanvas'
import Divider from '@/shared/components/molecules/FeaturePages/Divider'
import Link from 'next/link'

const Header: React.FC = () => {
  return (
    <DitherCanvas enableClick>
      <FeaturePageHeader
        title={
          <>
            Supercharge your Kubernetes Monitoring. <br className="hidden md:block" /> With AI
            powered insights.
          </>
        }
        description={
          <span className="text-base">
            SigNoz Cloud gives you actionable insights across pods, nodes, namespaces, workloads,
            and the services running inside them. All unified across logs, traces, and metrics in a
            consolidated OTel-native architecture. Prefer to manage it yourself? Use{' '}
            <Link className="underline" href="/docs/install/">
              Self-Hosted SigNoz
            </Link>
            .
          </span>
        }
        buttons={HEADER_BUTTONS}
        heroImage="/img/website/hero-tabs/infrastructure.webp"
        heroImageAlt="SigNoz Kubernetes Infrastructure Monitoring"
        sectionLayoutClassName="!mt-0 !border-x-1 !border-dashed !border-signoz_slate-400 max-md:-mb-[3rem]"
        className="mt-0"
        align="left"
      />
    </DitherCanvas>
  )
}

const FeatureSections: React.FC = () => {
  return (
    <section className="relative mx-auto max-w-8xl overflow-hidden border-t border-dashed border-signoz_slate-400 pt-14">
      <div className="relative mx-auto flex flex-col items-center gap-6 text-center">
        <div className="flex flex-col items-center gap-14 text-2xl font-medium leading-[3.25rem] text-signoz_sienna-100">
          <IconTitleDescriptionCardGrid cards={FEATURE_CARDS} variant="lg" titleLevel="h2" />
        </div>
      </div>
    </section>
  )
}

const BottomCTA: React.FC = () => {
  return (
    <SectionLayout
      variant="full-width"
      className="flex flex-col items-center justify-center gap-6 !px-8 !py-20 md:!px-0"
    >
      <h2 className="mx-auto mb-6 max-w-4xl text-center text-4xl font-semibold text-signoz_vanilla-100">
        Supercharge your Kubernetes Monitoring. <br className="hidden md:block" /> With AI powered
        insights.
      </h2>
      <div className="flex flex-col items-center justify-center gap-4">
        <div className="flex flex-col items-center justify-center gap-3 md:flex-row">
          <Button asChild variant="default" rounded="full" className="!w-fit items-center gap-2">
            <TrackingLink
              href="/teams/"
              clickType="Primary CTA"
              clickName="Get Started Free"
              clickLocation="Kubernetes Monitoring Page Bottom CTA"
              clickText="Get Started Free"
            >
              Get Started Free
              <ArrowRight size={14} />
            </TrackingLink>
          </Button>
          <Button asChild variant="secondary" rounded="full" className="!w-fit items-center gap-2">
            <TrackingLink
              href="/docs/infrastructure-monitoring/user-guides/k8s-metrics/"
              clickType="Secondary CTA"
              clickName="Read the Docs"
              clickLocation="Kubernetes Monitoring Page Bottom CTA"
              clickText="Read the Docs"
            >
              Read the Docs
              <ArrowRight size={14} />
            </TrackingLink>
          </Button>
        </div>
      </div>
    </SectionLayout>
  )
}

const KubernetesMonitoringPage: React.FC = () => {
  return (
    <FeaturePageLayout showProductNav={false} fullWidth>
      <Header />
      <div className="relative mx-auto max-w-8xl">
        <SectionLayout variant="bordered" className="!px-0">
          <FeatureSections />
          <Divider />
          <BottomCTA />
        </SectionLayout>
      </div>
    </FeaturePageLayout>
  )
}

export default KubernetesMonitoringPage
