import Image from 'next/image'
import Link from 'next/link'
import Button from '@/components/ui/Button'
import { Info } from 'lucide-react'
import TrackingLink from '@/components/TrackingLink'
import SourcesTabsGrid from '@/shared/components/molecules/SourcesTabsGrid'

export const ENTERPRISE_DEMO_HUBSPOT_DATA = {
  portalId: '22308423',
  formId: 'a908efee-9ec5-4969-9ca4-6e91d0a32b8a',
}

const OBSERVABILITY_LANDSCAPE_SOURCE_LINK_CLASS_NAME =
  'mt-1 inline-flex items-center gap-1 text-xs text-signoz_vanilla-400 underline decoration-signoz_slate-400 underline-offset-2 hover:text-signoz_robin-400'

const OBSERVABILITY_LANDSCAPE_ITEM_DATA = [
  {
    id: 'cost-reduction',
    stat: '99%',
    body: 'Businesses actively reducing observability costs',
    source: {
      href: 'https://www.gartner.com/en',
      label: 'Gartner',
    },
  },
  {
    id: 'tool-consolidation',
    stat: '57%',
    body: 'Teams cut costs with tool consolidation',
    source: {
      href: 'https://dimensionalresearch.com',
      label: 'Dimensional Research',
    },
  },
  {
    id: 'observability-overages',
    stat: '71%',
    body: 'Engineering teams hit unexpected observability overages regularly',
    source: {
      href: 'https://futurecio.tech/gartner-says-security-vendor-consolidation-to-improve-risk-posture/',
      label: 'FutureCIO',
    },
  },
] as const

export const OBSERVABILITY_LANDSCAPE_CARDS = OBSERVABILITY_LANDSCAPE_ITEM_DATA.map((item) => ({
  id: item.id,
  title: <span className="text-2xl font-bold">{item.stat}</span>,
  description: (
    <div className="flex flex-col items-start justify-between gap-2">
      {item.body}
      <Link
        href={item.source.href}
        className={OBSERVABILITY_LANDSCAPE_SOURCE_LINK_CLASS_NAME}
        target="_blank"
        rel="noopener noreferrer"
        prefetch={false}
      >
        {item.source.label}
        <Info className="size-3 shrink-0" />
      </Link>
    </div>
  ),
}))

export const TRUSTED_BY_LOGOS = [
  { src: '/svgs/icons/eltropy.svg', alt: 'Eltropy' },
  { src: '/svgs/icons/omnicell.svg', alt: 'Omnicell' },
  { src: '/img/users/salesforce.svg', alt: 'Salesforce' },
  { src: '/img/users/comcast.svg', alt: 'Comcast' },
  { src: '/svgs/icons/parallel-ai.svg', alt: 'Parallel AI' },
  { src: '/svgs/icons/blackforestlabs.svg', alt: 'Blackforest Labs' },
  { src: '/svgs/icons/blaxel.svg', alt: 'Blaxel' },
  { src: '/svgs/icons/sarvam.svg', alt: 'sarvam logo' },
]

export const NUMBERS_THAT_SPEAK_CARDS = [
  {
    icon: <div className="text-4xl font-bold text-signoz_cherry-500">47%</div>,
    title: <div className="min-h-14">Reduction in MTTR and TCO</div>,
    description: (
      <div className="flex min-h-36 flex-col items-start justify-between">
        Our logs, metrics, traces work on an innovative co-related architecture so you find the
        needle in the haystack - faster
        <Button
          variant="secondary"
          to="/blog/cost-effective-datadog-alternative/"
          className="mt-4 block w-fit"
          rounded="full"
        >
          Learn more
        </Button>
      </div>
    ),
  },
  {
    icon: <div className="text-4xl font-bold text-signoz_cherry-500">10 TB+/Day</div>,
    title: <div className="min-h-14">Daily Ingest - Single Deployment</div>,
    description: (
      <div className="flex min-h-36 flex-col items-start justify-between">
        ClickHouse core handles high-cardinality Kubernetes and AI workloads at all scale. 30%
        higher throughput. Guaranteed
        <Button
          variant="secondary"
          to="/blog/optimizing-log-processing-at-scale/"
          className="mt-4 block w-fit"
          rounded="full"
        >
          Learn more
        </Button>
      </div>
    ),
  },
  {
    icon: <div className="text-4xl font-bold text-signoz_cherry-500">1,000s</div>,
    title: <div className="min-h-14">Engineering Teams in Production</div>,
    description: (
      <div className="flex min-h-36 flex-col items-start justify-between">
        Seed-stage startups to public companies. Self-hosted, cloud, or BYOC. Your choice. With
        Enterprise-Grade Observability.
        <Button variant="secondary" to="/case-study/" className="mt-4 block w-fit" rounded="full">
          Learn more
        </Button>
      </div>
    ),
  },
]

export const HIGH_GROWTH_TEAMS_CARDS = [
  {
    description: (
      <Image
        src="/img/unified-observability/unified-observability-unified-vs-fragmented.webp"
        alt="Unified vs Fragmented Observability"
        width={1200}
        height={600}
        className="rounded-lg shadow-2xl"
      />
    ),
  },
  {
    title: 'Unified Observability — Single Pane of Glass',
    description: (
      <div>
        <p>
          Logs, metrics, distributed traces, and alerts live in one highly optimized-backed store
          One-click navigation UI from a trace to its correlated log line to the underlying
          infrastructure metric makes it an easy choice.
        </p>
        <TrackingLink
          href="/unified-observability/"
          clickType="Secondary CTA"
          clickName="High Growth Teams Section Unified Observability"
          clickLocation="Why SigNoz Page"
          clickText="Learn more"
        >
          <Button variant="secondary" rounded="full" isButton>
            Learn more
          </Button>
        </TrackingLink>
      </div>
    ),
    className: 'flex-col items-start justify-center gap-4',
  },
  {
    title: 'AI & LLM Workload Observability — Zero Silos',
    description: (
      <div>
        <p>
          Token-level tracing, per-model cost attribution, prompt latency breakdown, and inference
          pipeline metrics via OpenTelemetry. Unlike LLM-only observability tools, our AI layer
          correlates with the entire infrastructure - Databases, microservices, and applications.
        </p>
        <TrackingLink
          href="/observability-for-ai-native-companies/"
          clickType="Secondary CTA"
          clickName="High Growth Teams Section AI & LLM Workload Observability"
          clickLocation="Why SigNoz Page"
          clickText="Learn more"
        >
          <Button variant="secondary" rounded="full" isButton>
            Learn more
          </Button>
        </TrackingLink>
      </div>
    ),
    className: 'flex-col items-start justify-center gap-4',
  },
  {
    description: (
      <Image
        src="/img/platform/ObservabilityForAiNativeCompaniesMeta.webp"
        alt="Open Source + OpenTelemetry"
        width={1200}
        height={675}
      />
    ),
  },
  {
    description: (
      <Image
        src="/img/comparisons/2024/10/opentelemetry-vs-cloudwatch-image-dark.webp"
        alt="OpenTelemetry Framework"
        width={1200}
        height={675}
        className="rounded-lg"
      />
    ),
  },
  {
    title: 'Open Source + OpenTelemetry — No Lock-In',
    description: (
      <div>
        <p>
          Built natively on OpenTelemetry with native features like Messaging Queues. Your
          instrumentation becomes a company asset — not a vendor dependency. Instrument once, stay
          flexible, no learning curve.
        </p>
        <TrackingLink
          href="/resource-center/opentelemetry/"
          clickType="Secondary CTA"
          clickName="High Growth Teams Section Open Source + OpenTelemetry"
          clickLocation="Why SigNoz Page"
          clickText="Learn more"
        >
          <Button variant="secondary" rounded="full" isButton>
            Learn more
          </Button>
        </TrackingLink>
      </div>
    ),
    className: 'flex-col items-start justify-center gap-4',
  },
  {
    title: 'TCO Advantage — Predictable Pricing at Scale',
    description: (
      <div>
        <p>
          Our usage-based transparent pricing model charges on the telemetry data being ingested.
          This ensures you only pay for what you use, with no surprise costs. No per-host penalties
          for auto-scaling. No custom metric charges for adopting open standards.
        </p>
        <TrackingLink
          href="/pricing/"
          clickType="Secondary CTA"
          clickName="High Growth Teams Section TCO Advantage"
          clickLocation="Why SigNoz Page"
          clickText="Learn more"
        >
          <Button variant="secondary" rounded="full" isButton>
            Learn more
          </Button>
        </TrackingLink>
      </div>
    ),
    className: 'flex-col items-start justify-center gap-4',
  },

  {
    description: (
      <Image
        src="/img/graphics/homepage/feature-graphic-data-protection-2.webp"
        alt="Enterprise & Platform Ready"
        width={1200}
        height={675}
      />
    ),
  },
  {
    description: (
      <div className="flex h-full min-h-28 w-full flex-row items-center justify-center gap-8 bg-[url('/svgs/graph-bg.svg')] bg-cover bg-center">
        <TrackingLink
          clickType="HIPAA Image"
          clickName="High Growth Teams Section Enterprise & Platform Ready HIPAA"
          clickLocation="Why SigNoz Page"
          clickText="Learn more"
          href="https://trust.signoz.io/"
          target="_blank"
          rel="noopener noreferrer"
          className="opacity-60 hover:opacity-100"
        >
          <Image
            src="/svgs/icons/hipaa.svg"
            width={90}
            height={90}
            alt="HIPAA compliance certificate"
            loading="lazy"
          />
        </TrackingLink>
        <TrackingLink
          clickType="SOC-2 Image"
          clickName="High Growth Teams Section Enterprise & Platform Ready SOC-2"
          clickLocation="Why SigNoz Page"
          clickText="Learn more"
          href="https://trust.signoz.io/"
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-full opacity-60 shadow-[0px_0_40px_0_rgba(255,255,255,0.27)] transition-opacity hover:opacity-100"
        >
          <Image
            src="/svgs/icons/SOC-2.svg"
            width={60}
            height={60}
            alt="SOC-2 compliance certificate"
            loading="lazy"
          />
        </TrackingLink>
      </div>
    ),
  },
  {
    title: 'Enterprise & Platform Ready — Compliance, Scale, RBAC',
    description: (
      <div>
        <p>
          SOC 2 Type II. Self-hosted bring-your-own-cloud for HIPAA and GDPR requirements.
          Fine-grained RBAC for team-level data access. With enterprise-grade support.
          High-cardinality is a breeze with ClickHouse.
        </p>
        <TrackingLink
          href="https://trust.signoz.io/"
          clickType="Secondary CTA"
          clickName="High Growth Teams Section Enterprise & Platform Ready"
          clickLocation="Why SigNoz Page"
          clickText="Learn more"
        >
          <Button variant="secondary" rounded="full" isButton>
            Learn more
          </Button>
        </TrackingLink>
      </div>
    ),
    className: 'flex-col items-start justify-center gap-4',
  },

  {
    title: 'Integrations — Terraform, Kubernetes, Your Stack',
    description: (
      <>
        <p>
          Native Kubernetes monitoring. Terraform provider for IaC-managed alerting and dashboards.
          100+ collector integrations via OpenTelemetry. Connects to your CI/CD, on-call tooling,
          and cloud-native ecosystem — without overheads and downtime.
        </p>
        <TrackingLink
          href="/docs/integrations/integrations-list/"
          clickType="Secondary CTA"
          clickName="High Growth Teams Section Integrations"
          clickLocation="Why SigNoz Page"
          clickText="Learn more"
        >
          <Button variant="secondary" rounded="full" isButton>
            Learn more
          </Button>
        </TrackingLink>
      </>
    ),
    className: 'flex-col items-start justify-center gap-4',
  },
  {
    description: <SourcesTabsGrid />,
  },
]

export const GETTING_STARTED_CARDS = [
  {
    title: <div className="min-h-10">Analyze, Migrate, Instrument OTel</div>,
    description: (
      <div className="flex min-h-36 flex-col items-start justify-between">
        Analyze current stack; use our connectors to migrate fast. Add OTel SDK to your services —
        any language, any framework. Auto-instrumentation covers most stacks out of the box. No
        vendor lock-in, minimal learning curve
        <TrackingLink
          href="/docs/integrations/integrations-list/"
          clickType="Secondary CTA"
          clickName="Getting Started Section Analyze, Migrate, Instrument OTel"
          clickLocation="Why SigNoz Page"
          clickText="Learn more"
        >
          <Button variant="secondary" rounded="full" isButton>
            Learn more
          </Button>
        </TrackingLink>
      </div>
    ),
  },
  {
    title: <div className="min-h-10">Use SigNoz Cloud or host in your infrastructure</div>,
    description: (
      <div className="flex min-h-36 flex-col items-start justify-between">
        SigNoz Cloud is fully managed, SOC 2 compliant, and is live in minutes. If you want to run
        in your infra - Self-host via Helm chart runs in your own VPC or air-gapped environment. Or
        you can bring your own cloud.
        <TrackingLink
          href="/enterprise-cloud/"
          clickType="Secondary CTA"
          clickName="Getting Started Section Use SigNoz Cloud or host in your infrastructure"
          clickLocation="Why SigNoz Page"
          clickText="Learn more"
        >
          <Button variant="secondary" rounded="full" isButton>
            Learn more
          </Button>
        </TrackingLink>
      </div>
    ),
  },
  {
    title: <div className="min-h-10">Observability Experts and Support Plans - 24 x 7</div>,
    description: (
      <div className="flex min-h-36 flex-col items-start justify-between">
        Engineers with deep experience across observability stacks — OpenTelemetry, distributed
        tracing, log pipeline design, cost governance. Support aligns to your business outcomes:
        reduced MTTR, high cardinality, low TCO
        <TrackingLink
          href="/case-study/tableflow/"
          clickType="Secondary CTA"
          clickName="Getting Started Section Observability Experts and Support Plans"
          clickLocation="Why SigNoz Page"
          clickText="Learn more"
        >
          <Button variant="secondary" rounded="full" isButton>
            Learn more
          </Button>
        </TrackingLink>
      </div>
    ),
  },
]
