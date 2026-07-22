import { BUTTON_CLASS_NAME } from '@/shared/components/molecules/FeaturePages/constants'

export const AZURE_MONITORING_HEADER_BUTTONS = [
  {
    text: 'Get Started Free',
    href: '/teams/',
    variant: 'default' as const,
    className: BUTTON_CLASS_NAME,
    tracking: {
      clickType: 'Primary CTA',
      clickName: 'Sign Up Button',
      clickLocation: 'Azure Monitoring Hero',
      clickText: 'Get Started Free',
    },
  },
  {
    text: 'Read the Docs',
    href: '/docs/azure-monitoring/',
    variant: 'secondary' as const,
    className: BUTTON_CLASS_NAME,
    tracking: {
      clickType: 'Secondary CTA',
      clickName: 'Docs Link',
      clickLocation: 'Azure Monitoring Hero',
      clickText: 'Read the Docs',
    },
  },
]

export const INTEGRATE_AZURE_PANEL = {
  title: 'Integrate your Azure account - with just one click - no agents, no config files',
  description: (
    <p className="leading-relaxed text-signoz_vanilla-400">
      SigNoz&apos;s One-Click Azure Integration deploys via an ARM template and automatically
      discovers your Azure resources. VMs, AKS, App Services, Container Apps, Blob Storage, Cosmos
      DB, and databases start sending metrics immediately - no manual OTel Collector setup required.
      The fastest path to full Azure visibility.
    </p>
  ),
  image: '/img/azure-monitoring/section-1.svg',
  imageAlt: 'One-click Azure integration diagram',
  button: {
    text: 'Explore More',
    href: '/docs/integrations/azure/one-click-azure-integrations/',
    tracking: {
      clickType: 'Secondary CTA',
      clickName: 'Explore Link',
      clickLocation: 'Azure Monitoring Integrate Section',
      clickText: 'Explore More',
    },
  },
  className: 'py-10',
}

export const RCA_NOZ_AI_PANEL = {
  title: 'RCA of your Azure infrastructure in plain English. With Noz AI Assistant.',
  description: (
    <p className="leading-relaxed text-signoz_vanilla-400">
      SigNoz MCP Server connects to Claude Code, Cursor, and other AI coding agents. Give your agent
      full Azure context - VM CPU, AKS pod status, App Service traces, SQL Database latency - and
      debug production Azure issues without leaving your terminal. No separate AI SRE tool. Your
      Azure data stays in your environment.
    </p>
  ),
  image: '/img/azure-monitoring/section-2.svg',
  imageAlt: 'Noz AI Assistant for Azure RCA',
  button: {
    text: 'Explore More',
    href: '/docs/ai/signoz-mcp-server/',
    tracking: {
      clickType: 'Secondary CTA',
      clickName: 'Explore Link',
      clickLocation: 'Azure Monitoring RCA Section',
      clickText: 'Explore More',
    },
  },
  className: 'py-10',
}

export const AKS_VISIBILITY_SHOWCASE = {
  title: 'Full AKS cluster visibility into pods, nodes, workloads, and application traces',
  description:
    "Deploy SigNoz's k8s-infra Helm chart on your AKS cluster. Pod logs, node metrics, and application traces all flow into the same backend. Jump from a failing AKS pod to the App Service it was calling to the SQL Database query that was slow - in one investigation session, without tab-switching.",
  image: '/img/azure-monitoring/section-3.svg',
  imageAlt: 'Correlated logs, metrics and traces for Azure AKS',
  button: {
    text: 'Explore More',
    href: '/docs/azure-monitoring/aks/',
    tracking: {
      clickType: 'Secondary CTA',
      clickName: 'Explore Link',
      clickLocation: 'Azure Monitoring AKS Section',
      clickText: 'Explore More',
    },
  },
}

export const DISTRIBUTED_TRACING_PANEL = {
  title: 'End-to-end distributed tracing for Azure App Service and Azure Functions',
  description: (
    <p className="leading-relaxed text-signoz_vanilla-400">
      Instrument your App Service or Functions app with the OTel SDK and see p50/p90/p99 latencies,
      error rates, and service dependency maps alongside underlying Azure infrastructure metrics
      (CPU, memory, requests). See exactly which function invocation, downstream API call, or SQL
      query is the bottleneck.
    </p>
  ),
  button: {
    text: 'Explore More',
    href: '/docs/azure-monitoring/app-service/',
    tracking: {
      clickType: 'Secondary CTA',
      clickName: 'Explore Link',
      clickLocation: 'Azure Monitoring Tracing Section',
      clickText: 'Explore More',
    },
  },
  className: 'justify-center',
}

export const TROUBLESHOOT_PANEL = {
  title: 'Single place to troubleshoot metrics, traces & logs',
  description: (
    <p className="leading-relaxed text-signoz_vanilla-400">
      When an App Service latency alert fires, jump from the Azure infrastructure metric to the
      application trace to the log line that explains it - without opening Azure Monitor, App
      Insights, and your log tool separately. SigNoz stores all three signal types in a single
      ClickHouse backend. One query surface. No manual correlation.
    </p>
  ),
  button: {
    text: 'Learn More',
    href: '/docs/azure-monitoring/',
    tracking: {
      clickType: 'Secondary CTA',
      clickName: 'Learn More Link',
      clickLocation: 'Azure Monitoring Troubleshoot Section',
      clickText: 'Learn More',
    },
  },
  className: 'py-10',
}

export const OTEL_NATIVE_PANEL = {
  title: 'Your Azure instrumentation stays yours. Forever.',
  description: (
    <p className="leading-relaxed text-signoz_vanilla-400">
      SigNoz is built on OpenTelemetry from day one, not just compatible. Every Azure VM metric, AKS
      pod trace, and App Service log uses standard OTel attributes: service.name, cloud.region,
      k8s.pod.name - correlated across signals automatically. No proprietary agents in your
      codebase. No re-instrumentation if you change backends.
    </p>
  ),
  button: {
    text: 'Learn More',
    href: '/docs/azure-monitoring/',
    tracking: {
      clickType: 'Secondary CTA',
      clickName: 'Learn More Link',
      clickLocation: 'Azure Monitoring OTel Section',
      clickText: 'Learn More',
    },
  },
  className: 'py-10',
}

export const DASHBOARD_TEMPLATES_PANEL = {
  title: 'Get started in minutes - First data in, first dashboards live - no setup required',
  description: (
    <p className="leading-relaxed text-signoz_vanilla-400">
      SigNoz ships with pre-built dashboard templates for Azure VMs, AKS, App Services, Container
      Apps, and database services. Import in one click. All templates are open source under Apache
      2.0, maintained by the SigNoz community, and fully customisable. No dashboard-building
      required to get immediate Azure visibility.
    </p>
  ),
  button: {
    text: 'Learn More',
    href: '/docs/dashboards/dashboard-templates/overview/',
    tracking: {
      clickType: 'Secondary CTA',
      clickName: 'Learn More Link',
      clickLocation: 'Azure Monitoring Dashboards Section',
      clickText: 'Learn More',
    },
  },
  className: 'py-10',
}

export const TRANSPARENT_PRICING_PANEL = {
  title: 'One transparent price. No per-VM, per-metric, or per-query charges.',
  description: (
    <p className="leading-relaxed text-signoz_vanilla-400">
      Azure Monitor charges per metric query and per GB of log ingestion. Most observability tools
      add another unpredictable bill on top - per host, per seat, or per custom metric. SigNoz
      charges $0.30/GB for logs and traces, $0.10 per million metric samples. No per-VM fees. No
      premium for OTel metrics. One number you can forecast.
    </p>
  ),
  button: {
    text: 'View Pricing',
    href: '/pricing/',
    tracking: {
      clickType: 'Secondary CTA',
      clickName: 'Pricing Link',
      clickLocation: 'Azure Monitoring Pricing Section',
      clickText: 'View Pricing',
    },
  },
  className: 'py-10',
}

export const BOTTOM_CTA_BUTTONS = [
  {
    text: 'Get Started Free',
    href: '/teams/',
    variant: 'default' as const,
    className: BUTTON_CLASS_NAME,
    tracking: {
      clickType: 'Primary CTA',
      clickName: 'Sign Up Button',
      clickLocation: 'Azure Monitoring Bottom CTA',
      clickText: 'Get Started Free',
    },
  },
  {
    text: 'Read the Docs',
    href: '/docs/azure-monitoring/',
    variant: 'secondary' as const,
    className: BUTTON_CLASS_NAME,
    tracking: {
      clickType: 'Secondary CTA',
      clickName: 'Docs Link',
      clickLocation: 'Azure Monitoring Bottom CTA',
      clickText: 'Read the Docs',
    },
  },
]
