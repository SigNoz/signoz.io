import { TextSearch, Atom, ChevronsDown, TrendingUpDown, ArrowRight } from 'lucide-react'
import { IconTitleDescriptionCardData } from '@/shared/components/molecules/FeaturePages/IconTitleDescriptionCard'
import React from 'react'
import Image from 'next/image'
import Button from '@/components/ui/Button'
import TrackingLink from '@/components/TrackingLink'
import { type ComparisonTableRow } from '@/shared/components/molecules/FeaturePages/ComparisonTable'
import {
  type VendorKey,
  type TraditionalVendorKey,
} from './ObservabilityForAiNativeCompaniesPage.types'

export const CAPABILITIES_CARDS1: IconTitleDescriptionCardData[] = [
  {
    title: 'Span-Level Alerting',
    description:
      'Set alerts on specific spans within a trace to isolate internal latency from third-party provider slowness. Configure thresholds on individual service spans rather than entire trace duration, so you only get notified when your code is slow, not when external APIs degrade.',
    className: 'md:min-h-96 md:justify-center',
  },
  {
    title: '',
    description: (
      <>
        <div className="flex flex-col justify-center">
          <Image
            src="/img/observability-for-ai-native-companies/apm-to-logs.webp"
            className="w-full object-contain"
            alt="APM to Logs"
            width={1000}
            height={1000}
          />
        </div>
      </>
    ),
  },
  {
    title: 'Trace Funnels',
    description: (
      <div className="flex flex-col gap-4">
        Track multi-step workflows like "calls dialed" to "leads qualified" for voice agents, or
        visualize drop-off rates across your AI agent pipelines to identify where users abandon
        flows.
        <Button
          variant="secondary"
          rounded="full"
          className="flex w-fit items-center gap-2"
          asChild
        >
          <TrackingLink
            href="/docs/trace-funnels/overview/"
            clickType="Observability for AI Native Companies Card CTA"
            clickName="Trace Funnels Button"
            clickLocation="Capabilities Section"
            clickText="Read Documentation"
            target="_blank"
          >
            Read Documentation
            <ArrowRight size={14} />
          </TrackingLink>
        </Button>
      </div>
    ),
  },
  {
    title: 'MCP Server for Agentic SRE',
    description: (
      <div className="flex flex-col gap-4">
        Enable AI agents to query your telemetry via Model Context Protocol. Agents can debug
        themselves, create dashboards, or perform root-cause analysis by importing telemetry data
        directly.
        <Button
          variant="secondary"
          rounded="full"
          className="flex w-fit items-center gap-2"
          asChild
        >
          <TrackingLink
            href="/docs/signoz-mcp-server/"
            clickType="Observability for AI Native Companies Card CTA"
            clickName="MCP Server for Agentic SRE Button"
            clickLocation="Capabilities Section"
            clickText="Read Documentation"
            target="_blank"
          >
            Read Documentation
            <ArrowRight size={14} />
          </TrackingLink>
        </Button>
      </div>
    ),
  },
  {
    title: 'Self-Hosted / BYOC Compliance',
    description:
      'Deploy on your infrastructure to meet HIPAA/GDPR compliance requirements. Keep sensitive prompt data on-premise for healthcare, banking, and government contracts.',
  },
  {
    title: 'Monitoring Model Token Usage',
    description:
      'Track token usage and costs per model, operation, and user. View cost breakdowns, prompt efficiency scores, and configure budget alerts to optimize spending without sacrificing quality.',
  },
]

export const CAPABILITIES_CARDS2: IconTitleDescriptionCardData[] = [
  {
    title: 'ClickHouse Architecture',
    description:
      'Handle high-cardinality tagging without performance degradation or out-of-memory crashes using columnar storage optimized for analytical queries.',
  },
  {
    icon: '',
    iconText: '',
    title: 'Query Any Field Without Re-Instrumentation',
    description:
      "Unlike Langfuse's fixed observation schema, you can track custom reasoning steps, tool calls, or model parameters without code changes.",
  },
  {
    title: 'OpenTelemetry Native',
    description:
      'Avoid vendor lock-in with industry standard instrumentation. Switch observability providers without rewriting instrumentation or removing proprietary agents.',
  },
  {
    icon: '',
    iconText: '',
    title: 'Configuration as Code',
    description:
      'Manage dashboards and alerts with Terraform to maintain stability during rapid product updates. Version control your observability configuration.',
  },
  {
    title: 'Alert Segmentation for On-Call Health',
    description:
      'Define granular alert severity levels instead of blanket alerts that cause on-call burnout. Route notifications dynamically by service, environment, or customer.',
  },
  {
    title: 'Out-of-the-Box Dashboards',
    description:
      'Start monitoring immediately with pre-built dashboards for OpenAI, Anthropic, LangChain, database queries, Kubernetes pods, and API latency. Get visibility into your LLM applications, infrastructure, and application performance on day 1.',
  },
]

export const VENDORS: { key: VendorKey; label: string }[] = [
  { key: 'signoz', label: 'SigNoz' },
  { key: 'langfuse', label: 'Langfuse' },
  { key: 'langsmith', label: 'LangSmith' },
  { key: 'braintrust', label: 'Braintrust' },
]

export const TRADITIONAL_VENDORS: { key: TraditionalVendorKey; label: string }[] = [
  { key: 'signoz', label: 'SigNoz' },
  { key: 'datadog', label: 'Datadog' },
  { key: 'honeycomb', label: 'Honeycomb' },
  { key: 'grafana', label: 'Grafana LGTM' },
]

export const LLM_COMPARISON_TABLE_ROWS: ComparisonTableRow<VendorKey>[] = [
  {
    feature: 'LLM Tracing',
    vendors: {
      signoz: { supported: true, text: 'Full traces with OpenTelemetry' },
      langfuse: { supported: true, text: 'OpenTelemetry-based' },
      langsmith: { supported: true, text: 'Async distributed tracing' },
      braintrust: { supported: true, text: 'Request-level tracing' },
    },
  },
  {
    feature: 'Production Alerts',
    vendors: {
      signoz: { supported: true, text: 'Any metric' },
      langfuse: { supported: false, text: 'No alerting' },
      langsmith: { supported: true, text: 'LLM metrics only' },
      braintrust: { supported: true, text: 'LLM metrics only' },
    },
  },
  {
    feature: 'Prompt Management',
    vendors: {
      signoz: { supported: true, text: 'Via integrations' },
      langfuse: { supported: true, text: 'Version control with caching' },
      langsmith: { supported: true, text: 'A/B testing built-in' },
      braintrust: { supported: true, text: 'Side-by-side comparison' },
    },
  },
  {
    feature: 'Evaluation/Scoring',
    vendors: {
      signoz: { supported: true, text: 'Via integrations' },
      langfuse: { supported: true, text: 'LLM-as-judge, custom evals' },
      langsmith: { supported: true, text: 'Built-in evaluators' },
      braintrust: { supported: true, text: 'Dataset/task/scorer framework' },
    },
  },
  {
    feature: 'Infra Correlation',
    vendors: {
      signoz: { supported: true, text: 'Metrics, logs, traces together' },
      langfuse: { supported: false, text: 'LLM-only' },
      langsmith: { supported: false, text: 'LLM-only' },
      braintrust: { supported: false, text: 'LLM-only' },
    },
  },
  {
    feature: 'Kubernetes/Docker Monitoring',
    vendors: {
      signoz: { supported: true, text: 'Native support' },
      langfuse: { supported: false, text: '' },
      langsmith: { supported: false, text: '' },
      braintrust: { supported: false, text: '' },
    },
  },
  {
    feature: 'Database Query Tracking',
    vendors: {
      signoz: { supported: true, text: 'Built-in' },
      langfuse: { supported: false, text: '' },
      langsmith: { supported: false, text: '' },
      braintrust: { supported: false, text: '' },
    },
  },
  {
    feature: 'Application Correlation',
    vendors: {
      signoz: { supported: true, text: 'Cross-service tracing' },
      langfuse: { supported: false, text: '' },
      langsmith: { supported: false, text: '' },
      braintrust: { supported: false, text: '' },
    },
  },
  {
    feature: 'Dashboards',
    vendors: {
      signoz: { supported: true, text: 'Advanced query builder' },
      langfuse: { supported: true, text: 'Limited presets' },
      langsmith: { supported: true, text: 'Limited presets' },
      braintrust: { supported: true, text: 'Basic charts' },
    },
  },
]

export const TRADITIONAL_COMPARISON_TABLE_ROWS: ComparisonTableRow<TraditionalVendorKey>[] = [
  {
    feature: 'GPU Cluster Economics',
    vendors: {
      signoz: { supported: true, text: 'Usage-based pricing' },
      datadog: { supported: false, text: 'Host-based pricing' },
      honeycomb: { supported: true, text: 'Usage-based pricing' },
      grafana: { supported: 'partial', text: 'Usage + user seats' },
    },
  },
  {
    feature: 'High-Cardinality Tags',
    vendors: {
      signoz: { supported: true, text: 'No cardinality limits' },
      datadog: { supported: 'partial', text: 'Warns against "unbounded attributes"' },
      honeycomb: { supported: true, text: 'Built for high-cardinality' },
      grafana: { supported: 'partial', text: '4 backends, mixed handling' },
    },
  },
  {
    feature: 'Span-Level Alerting',
    vendors: {
      signoz: { supported: true, text: 'Native trace alerts' },
      datadog: { supported: true, text: 'Trace analytics on span attributes' },
      honeycomb: { supported: true, text: 'Triggers on any span attribute' },
      grafana: { supported: 'partial', text: 'Requires metrics-generator' },
    },
  },
  {
    feature: 'LLM Cost Tracking',
    vendors: {
      signoz: { supported: true, text: '25+ providers via LiteLLM' },
      datadog: { supported: true, text: 'LLM Observability add-on' },
      honeycomb: { supported: 'partial', text: 'Anthropic integration only' },
      grafana: { supported: 'partial', text: 'Cloud only' },
    },
  },
  {
    feature: 'Trace Funnels',
    vendors: {
      signoz: { supported: true, text: 'Direct/Indirect Descendant operators' },
      datadog: { supported: 'partial', text: 'RUM funnel, not APM funnels' },
      honeycomb: { supported: 'partial', text: 'Relational queries, not dedicated' },
      grafana: { supported: 'partial', text: 'TraceQL structural operators' },
    },
  },
  {
    feature: 'Async Workflows (Span Links)',
    vendors: {
      signoz: { supported: true, text: 'Supported' },
      datadog: { supported: true, text: 'Supported' },
      honeycomb: { supported: true, text: 'Supported' },
      grafana: { supported: true, text: 'Tempo native' },
    },
  },
  {
    feature: 'Self-Hosting',
    vendors: {
      signoz: { supported: true, text: 'Built on open-standards' },
      datadog: { supported: false, text: 'SaaS-only' },
      honeycomb: { supported: 'partial', text: 'Private Cloud (Enterprise)' },
      grafana: { supported: true, text: 'Built on open-standards' },
    },
  },
  {
    feature: 'Unified Backend',
    vendors: {
      signoz: { supported: true, text: 'Single, ClickHouse' },
      datadog: { supported: true, text: 'Single backend' },
      honeycomb: { supported: true, text: 'Single backend' },
      grafana: { supported: false, text: '4 separate backends' },
    },
  },
]

export const PILLARS_DATA = [
  {
    icon: <ChevronsDown size={14} className="text-signoz_vanilla-400" />,
    iconText: 'ELASTIC INGESTION AT SCALE',
    title: 'Handle Unpredictable Telemetry Spikes Without Data Loss',
    description:
      'Workloads generate extreme ingestion bursts, jumping from hundreds to tens of thousands of records per second in minutes. Traditional observability systems drop data or lag during these spikes. We buffer telemetry with queued retry processors and memory limiters to prevent data loss during traffic bursts.',
  },
  {
    icon: <TrendingUpDown size={14} className="text-signoz_vanilla-400" />,
    iconText: 'COST PREDICTABILITY',
    title: 'Pay for Data Volume Ingested, Not Host Count',
    description:
      'Companies running large GPU clusters make host-based pricing financially unsustainable. Legacy vendors charge per host and double-charge for ingestion and indexing, leading to surprise bills. We charge based on data volume ingested, not the number of nodes or containers. Set daily rate limits and ingestion quotas to prevent cost overruns.',
  },
  {
    icon: <TextSearch size={14} className="text-signoz_vanilla-400" />,
    iconText: 'HIGH-CARDINALITY DATA HANDLING',
    title: 'Tag Every Request Without Crashing Your Metrics Store',
    description:
      "Applications tag telemetry with user IDs, model versions, and customer IDs across thousands of nodes. Prometheus and Loki crash with out-of-memory errors under this load. We use ClickHouse's columnar storage to handle high-cardinality data natively, letting you tag aggressively without performance degradation.",
  },
  {
    icon: <Atom size={14} className="text-signoz_vanilla-400" />,
    iconText: 'FULL-STACK CORRELATION',
    title: 'Correlate LLM Performance with Infrastructure and Application Logs',
    description:
      'AI debugging requires connecting LLM latency spikes to database queries, infrastructure metrics, and application logs. Fragmented stacks force manual correlation across multiple tools. We unify logs, metrics, and traces with automatic trace_id correlation. Span links connect async workflows that parent-child tracing cannot represent.',
  },
]

export const TRUSTED_BY_LOGOS = [
  {
    src: '/svgs/icons/lovart.svg',
    alt: 'Lovart',
  },
  {
    src: '/svgs/icons/sarvam.svg',
    alt: 'Sarvam',
  },
  {
    src: '/svgs/icons/blaxel.svg',
    alt: 'Blaxel',
  },
  {
    src: '/svgs/icons/salient.svg',
    alt: 'Salient',
  },
  {
    src: '/img/case_study/logos/shaped-logo.svg',
    alt: 'Shaped',
  },
  {
    src: '/svgs/icons/tavus.svg',
    alt: 'Tavus',
  },
  {
    src: '/svgs/icons/inkeep.svg',
    alt: 'Inkeep',
  },
  {
    src: '/svgs/icons/drivetrain.svg',
    alt: 'Drivetrain',
  },
]
