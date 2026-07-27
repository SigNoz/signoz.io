import { MonitorCog, Telescope, Microscope } from 'lucide-react'
import BanknoteCheckIcon from '@/public/img/icons/banknote-check.svg'
import { BUTTON_CLASS_NAME } from '@/shared/components/molecules/FeaturePages/constants'
import section1Url from '@/public/img/google-cloud-monitoring/section-1.svg?url'
import section2Url from '@/public/img/google-cloud-monitoring/section-2.svg?url'
import section3Url from '@/public/img/google-cloud-monitoring/section-3.svg?url'
import section4Url from '@/public/img/google-cloud-monitoring/section-4.svg?url'
import { IconTitleDescriptionCardData } from '@/shared/components/molecules/FeaturePages/IconTitleDescriptionCard'

export const GCP_MONITORING_HEADER_BUTTONS = [
  {
    text: 'Get Started Free',
    href: '/teams/',
    variant: 'default' as const,
    className: BUTTON_CLASS_NAME,
    tracking: {
      clickType: 'Primary CTA',
      clickName: 'Sign Up Button',
      clickLocation: 'GCP Monitoring Hero',
      clickText: 'Get Started Free',
    },
  },
  {
    text: 'Read the Docs',
    href: '/docs/gcp-monitoring/',
    variant: 'secondary' as const,
    className: BUTTON_CLASS_NAME,
    tracking: {
      clickType: 'Secondary CTA',
      clickName: 'Docs Link',
      clickLocation: 'GCP Monitoring Hero',
      clickText: 'Read the Docs',
    },
  },
]

export const UNIFY_GCP_PANEL = {
  title: 'Unify Your Entire Google Cloud Environment',
  description: (
    <p className="leading-relaxed text-signoz_vanilla-400">
      When Cloud Run latency spikes, jump from the GCP infrastructure metric to the application
      trace to the log line that explains it; without switching to the multiple consoles. SigNoz
      stores all three signal types in a single ClickHouse backend, so correlation is native, not
      manual.
    </p>
  ),
  image: section1Url,
  imageAlt: 'Unified Google Cloud monitoring in SigNoz',
  button: {
    text: 'Explore More',
    href: '/docs/gcp-monitoring/',
    tracking: {
      clickType: 'Secondary CTA',
      clickName: 'Explore Link',
      clickLocation: 'GCP Monitoring Unify Section',
      clickText: 'Explore More',
    },
  },
  className: 'py-10',
}

export const SCRAPE_GCP_PANEL = {
  title: 'Scrape GCP metrics via the OTel Collector with no proprietary exporter',
  description: (
    <p className="leading-relaxed text-signoz_vanilla-400">
      Use the OTel Collector&apos;s googlecloudmonitoring receiver to scrape metrics from any GCP
      service - Cloud SQL, App Engine, BigQuery, Cloud Storage, Pub/Sub - and send them to SigNoz.
      Select exactly which metrics to collect. No proprietary agents, no vendor lock-in, your config
      stays yours.
    </p>
  ),
  image: section2Url,
  imageAlt: 'GCP metrics collection via OTel Collector',
  button: {
    text: 'Explore More',
    href: '/docs/gcp-monitoring/app-engine/metrics/',
    tracking: {
      clickType: 'Secondary CTA',
      clickName: 'Explore Link',
      clickLocation: 'GCP Monitoring Scrape Section',
      clickText: 'Explore More',
    },
  },
  className: 'py-10',
}

export const NOZ_AI_PANEL = {
  title: 'Talk to your GCP infrastructure. In plain English. With Noz AI',
  description: (
    <p className="leading-relaxed text-signoz_vanilla-400">
      SigNoz MCP Server connects to Claude Code, Cursor, and other AI coding agents. Give your agent
      full GCP context - Cloud Run latency, GKE pod status, Cloud SQL query performance, Pub/Sub
      backlog - and debug production GCP issues without leaving your terminal.
    </p>
  ),
  button: {
    text: 'Explore More',
    href: '/docs/ai/signoz-mcp-server/',
    tracking: {
      clickType: 'Secondary CTA',
      clickName: 'Explore Link',
      clickLocation: 'GCP Monitoring Noz AI Section',
      clickText: 'Explore More',
    },
  },
  className: 'justify-center',
}

export const RESOLVE_PERFORMANCE_SHOWCASE = {
  title: 'Resolve Google Cloud Performance Issues Faster',
  description:
    'Jump from a Cloud Run latency spike to the failing trace to the Cloud SQL query that caused it, without switching tools. Overlay GCP deployment events on your metrics and catch regressions the moment they ship.',
  image: section4Url,
  imageAlt: 'Resolve Google Cloud performance issues with correlated signals',
  button: {
    text: 'Explore More',
    href: '/docs/gcp-monitoring/cloud-run/tracing/',
    tracking: {
      clickType: 'Secondary CTA',
      clickName: 'Explore Link',
      clickLocation: 'GCP Monitoring Resolve Section',
      clickText: 'Explore More',
    },
  },
}

export { section3Url }

export const GCP_ICON_GRID_CARDS: IconTitleDescriptionCardData[] = [
  {
    icon: <MonitorCog size={20} />,
    title: 'One config. Every GCP service logs automatically. Forever.',
    description:
      "Traditional log shipping means installing an agent on every VM, repeating for every new instance. With GCP's Log Router, configure routing once. Logs from Compute Engine, App Engine, Cloud Functions, and every GCP service flow automatically into SigNoz; all searchable and correlated. No per-VM setup.",
    button: {
      text: 'Explore More',
      href: '/docs/gcp-monitoring/app-engine/logging/',
      tracking: {
        clickType: 'Secondary CTA',
        clickName: 'Explore Link',
        clickLocation: 'GCP Monitoring Log Config Section',
        clickText: 'Explore More',
      },
    },
  },
  {
    icon: <Telescope size={20} />,
    title: 'Built on OpenTelemetry - Your GCP Instrumentation Stays Yours',
    description:
      'SigNoz is built on OpenTelemetry, not just compatible with it. Every Cloud Run trace, GKE metric, and Compute Engine log uses standard OTel attributes, correlated across signals automatically, no custom mapping needed. No proprietary agents, no re-instrumentation, no premium for using open standards.',
    button: {
      text: 'Explore More',
      href: '/docs/gcp-monitoring/',
      tracking: {
        clickType: 'Secondary CTA',
        clickName: 'Explore Link',
        clickLocation: 'GCP Monitoring OTel Section',
        clickText: 'Explore More',
      },
    },
  },
  {
    icon: <Microscope size={20} />,
    title: 'APM & Distributed Tracing for Cloud Run',
    description: (
      <>
        See inside every Cloud Run request - not just infrastructure metrics.
        <br />
        <br />
        Instrument your Cloud Run service with the OTel SDK. Every request is traced end-to-end:
        spans, downstream calls, latency per endpoint, errors by service. Correlated with CPU,
        memory, and instance counts in the same view.
      </>
    ),
    button: {
      text: 'Explore More',
      href: '/docs/gcp-monitoring/cloud-run/tracing/',
      tracking: {
        clickType: 'Secondary CTA',
        clickName: 'Explore Link',
        clickLocation: 'GCP Monitoring APM Section',
        clickText: 'Explore More',
      },
    },
  },
  {
    icon: <BanknoteCheckIcon className="h-5 w-5" aria-hidden="true" />,
    title: 'Predictable Pricing for Google Cloud Observability',
    description:
      "GCP already charges you for Cloud Monitoring metrics queries, log ingestion, and log storage. Your observability tool shouldn't add another unpredictable bill on top. SigNoz charges $0.30/GB for logs and traces. $0.10 per million metric samples. No per-host fees. No per-metric charges. No surprise at month-end.",
    button: {
      text: 'View Pricing',
      href: '/pricing/',
      tracking: {
        clickType: 'Secondary CTA',
        clickName: 'Pricing Link',
        clickLocation: 'GCP Monitoring Pricing Section',
        clickText: 'View Pricing',
      },
    },
  },
]

export const BOTTOM_CTA_BUTTONS = [
  {
    text: 'Get Started Free',
    href: '/teams/',
    variant: 'default' as const,
    className: BUTTON_CLASS_NAME,
    tracking: {
      clickType: 'Primary CTA',
      clickName: 'Sign Up Button',
      clickLocation: 'GCP Monitoring Bottom CTA',
      clickText: 'Get Started Free',
    },
  },
  {
    text: 'Read Doc',
    href: '/docs/gcp-monitoring/',
    variant: 'secondary' as const,
    className: BUTTON_CLASS_NAME,
    tracking: {
      clickType: 'Secondary CTA',
      clickName: 'Docs Link',
      clickLocation: 'GCP Monitoring Bottom CTA',
      clickText: 'Read Doc',
    },
  },
]
