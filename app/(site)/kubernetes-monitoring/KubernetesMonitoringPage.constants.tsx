import Image from 'next/image'
import TrackingLink from '@/components/TrackingLink'
import Button from '@/components/ui/Button'
import { BUTTON_CLASS_NAME } from '@/shared/components/molecules/FeaturePages/constants'
import featureGraphicOtel from '@/public/img/graphics/homepage/feature-graphic-otel.svg?url'

export const HEADER_BUTTONS = [
  {
    text: 'Get Started Free',
    href: '/teams/',
    variant: 'default' as const,
    className: BUTTON_CLASS_NAME,
    tracking: {
      clickType: 'Primary CTA',
      clickName: 'K8s Monitoring Page Hero Get Started Free',
      clickLocation: 'Kubernetes Monitoring Page Hero',
      clickText: 'Get Started Free',
    },
  },
  {
    text: 'Read the Docs',
    href: '/docs/infrastructure-monitoring/k8s-metrics/',
    variant: 'secondary' as const,
    className: BUTTON_CLASS_NAME,
    tracking: {
      clickType: 'Secondary CTA',
      clickName: 'K8s Monitoring Page Hero Read the Docs',
      clickLocation: 'Kubernetes Monitoring Page Hero',
      clickText: 'Read the Docs',
    },
  },
]

export const FEATURE_CARDS = [
  {
    title: 'One click end-to-end observability from clusters to containers',
    description: (
      <div>
        <p>
          As a pod restarts or error rate spikes, get the full picture; not three uncorrelated tabs.
          SigNoz aligns infrastructure metrics, distributed traces, log lines in a single backend.
          Go from node CPU to service trace to the exact log line in one click. No copy-pasting
          trace IDs or manually matching any timestamps.
        </p>
        <Button asChild variant="secondary" rounded="full" className="mt-4">
          <TrackingLink
            href="/docs/infrastructure-monitoring/k8s-metrics/"
            clickType="Secondary CTA"
            clickName="K8s Monitoring Feature 1 Read More"
            clickLocation="Kubernetes Monitoring Page"
            clickText="Read More"
          >
            Read More
          </TrackingLink>
        </Button>
      </div>
    ),
    className: 'flex-col items-start justify-center gap-4',
  },
  {
    description: (
      <div className="relative h-full min-h-[300px] w-full overflow-hidden rounded-lg">
        <Image
          src="/img/unified-observability/unified-observability-infrastructure-monitoring.webp"
          alt="SigNoz infrastructure monitoring — end-to-end observability from clusters to containers"
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover object-top"
        />
      </div>
    ),
  },
  {
    description: (
      <div className="relative h-full min-h-[300px] w-full overflow-hidden rounded-lg">
        <Image
          src="/img/unified-observability/unified-observability-alerts.webp"
          alt="SigNoz alerts management — proactive Kubernetes alerts and resolution"
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover object-top"
        />
      </div>
    ),
  },
  {
    title: 'Proactive Alerts and Resolution before your users get disrupted',
    description: (
      <div>
        <p>
          Create alerts on any K8s signal - pod restart rate, node memory pressure, OOMKilled
          events, or service error rates, directly from your dashboard, alerts tab, or a query.
          Route to Slack, PagerDuty, Opsgenie, Teams, Incident.io. No extra configuration layer for
          maintenance windows or multi-severity rules
        </p>
        <Button asChild variant="secondary" rounded="full" className="mt-4">
          <TrackingLink
            href="/docs/alerts-management/user-guides/kubernetes-pod-startup-alerts/"
            clickType="Secondary CTA"
            clickName="K8s Monitoring Feature 2 Read More"
            clickLocation="Kubernetes Monitoring Page"
            clickText="Read More"
          >
            Read More
          </TrackingLink>
        </Button>
      </div>
    ),
    className: 'flex-col items-start justify-center gap-4',
  },
  {
    title: 'Predictable Pricing as you scale',
    description: (
      <div>
        <p>
          Most observability platforms force a trade-off between data you process and price you pay.
          SigNoz adds full visibility into every layer of your Kubernetes cluster, nodes, control
          plane, and workloads without the operational overhead or tradeoffs.
        </p>
      </div>
    ),
    className: 'flex-col items-start justify-center gap-4',
  },
  {
    description: (
      <div className="relative flex h-full min-h-[300px] w-full items-center justify-center overflow-hidden rounded-lg bg-signoz_ink-500">
        <Image
          src="/img/graphics/homepage/feature-graphic-columnar-db.svg"
          alt="SigNoz columnar database — predictable pricing with efficient storage"
          width={449}
          height={352}
          className="object-contain"
          loading="lazy"
          decoding="async"
        />
      </div>
    ),
  },
  {
    description: (
      <div className="relative h-full min-h-[300px] w-full overflow-hidden rounded-lg">
        <Image
          src="/img/graphics/homepage/infra-cpu-request-limit.webp"
          alt="SigNoz CPU request vs limit monitoring — dynamic resource scaling"
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover object-top"
        />
      </div>
    ),
  },
  {
    title: 'Dynamic resource scaling for cost optimization and performance',
    description: (
      <div>
        <p>
          See actual CPU and memory usage against requests and limits across every workload.
          Identify over-provisioned deployments, pods running near OOM, and nodes with headroom to
          consolidate. CronJob monitoring shows run history, duration, and failure rates. GPU
          utilisation tracked for AI and ML workloads alongside standard compute.
        </p>
      </div>
    ),
    className: 'flex-col items-start justify-center gap-4',
  },
  {
    title: 'Ask about your Kubernetes cluster in plain English. From where you Work',
    description: (
      <div>
        <p>
          SigNoz connects to Claude Code, Cursor, and other coding agents via MCP. Noz AI agent gets
          full cluster context with pod status, node metrics, trace data, service topology and debug
          production Kubernetes issues without leaving your terminal - all in one session. No
          separate AI SRE tool.
        </p>
        <Button asChild variant="secondary" rounded="full" className="mt-4">
          <TrackingLink
            href="/agent-native-observability/"
            clickType="Secondary CTA"
            clickName="K8s Monitoring Feature 5 Read More"
            clickLocation="Kubernetes Monitoring Page"
            clickText="Read More"
          >
            Read More
          </TrackingLink>
        </Button>
      </div>
    ),
    className: 'flex-col items-start justify-center gap-4',
  },
  {
    description: (
      <div className="relative h-full min-h-[300px] w-full overflow-hidden rounded-lg">
        <Image
          src="/img/graphics/homepage/noz-agent-native-panel.webp"
          alt="SigNoz Noz AI agent — ask about your Kubernetes cluster in plain English"
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover object-top"
        />
      </div>
    ),
  },
  {
    description: (
      <div className="relative flex h-full min-h-[300px] w-full items-center justify-center overflow-hidden rounded-lg bg-signoz_ink-500">
        <Image
          className="object-contain"
          src={featureGraphicOtel}
          alt="SigNoz built on OpenTelemetry — your instrumentation stays yours"
          width={449}
          height={352}
          loading="lazy"
          decoding="async"
        />
      </div>
    ),
  },
  {
    title: 'Get started in mins. OpenTelemetry-native. Your instrumentation stays yours.',
    description: (
      <div>
        <p>
          SigNoz is built on OpenTelemetry from day one not just compatible with it. Deploy the OTel
          Collector via Helm, instrument your services with any OTel SDK, and your telemetry flows
          in. No proprietary agents, no DaemonSet sprawl, no re-instrumentation if you ever want to
          switch backends. Your instrumentation is a company asset, not a vendor dependency.
        </p>
        <Button asChild variant="secondary" rounded="full" className="mt-4">
          <TrackingLink
            href="/docs/setup/kubernetes/kustomize/"
            clickType="Secondary CTA"
            clickName="K8s Monitoring Feature 6 Read More"
            clickLocation="Kubernetes Monitoring Page"
            clickText="Read More"
          >
            Read More
          </TrackingLink>
        </Button>
      </div>
    ),
    className: 'flex-col items-start justify-center gap-4',
  },
  {
    title: 'Auto-discovers new services. No config update needed.',
    description: (
      <div>
        <p>
          Kubernetes workloads are ephemeral as pods come and go, deployments scale, and new
          services ship daily. SigNoz via the OTel Collector auto-discovers new services as they
          appear and starts collecting telemetry immediately. Metadata enrichment on ingest means
          every signal is tagged with namespace, cluster, pod, and workload &mdash; so filters just
          work,for services that didn&apos;t exist last week.
        </p>
        <Button asChild variant="secondary" rounded="full" className="mt-4">
          <TrackingLink
            href="/docs/infrastructure-monitoring/k8s-metrics/"
            clickType="Secondary CTA"
            clickName="K8s Monitoring Feature 7 Read More"
            clickLocation="Kubernetes Monitoring Page"
            clickText="Read More"
          >
            Read More
          </TrackingLink>
        </Button>
      </div>
    ),
    className: 'flex-col items-start justify-center gap-4',
  },
  {
    description: (
      <div className="relative h-full min-h-[300px] w-full overflow-hidden rounded-lg">
        <Image
          src="/img/features/apm/service-maps.webp"
          alt="SigNoz service maps — auto-discovers new services with no config update needed"
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover object-top"
        />
      </div>
    ),
  },
  {
    description: (
      <div className="relative h-full min-h-[300px] w-full overflow-hidden rounded-lg">
        <Image
          src="/img/unified-observability/unified-observability-anomaly-detection.webp"
          alt="SigNoz anomaly detection — detect outliers before they surprise you"
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover object-top"
        />
      </div>
    ),
  },
  {
    title: 'Advanced Anomaly Detection before they surprise you',
    description: (
      <div>
        <p>
          Not every incident announces itself. Anomaly detection in SigNoz surfaces outliers in
          response times, error rates, and resource usage that threshold-based alerts miss because
          you didn&apos;t know what threshold to set. Detect problematic services, unusual traffic
          patterns, and pod behaviour that deviates from seasonal baselines automatically.
        </p>
        <Button asChild variant="secondary" rounded="full" className="mt-4">
          <TrackingLink
            href="/docs/alerts-management/anomaly-based-alerts/"
            clickType="Secondary CTA"
            clickName="K8s Monitoring Feature 8 Read More"
            clickLocation="Kubernetes Monitoring Page"
            clickText="Read More"
          >
            Read More
          </TrackingLink>
        </Button>
      </div>
    ),
    className: 'flex-col items-start justify-center gap-4',
  },
]
