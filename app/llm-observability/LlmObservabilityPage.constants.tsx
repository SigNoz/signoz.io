import {
  TextSearch,
  Atom,
  ChartBarIncreasing,
  DraftingCompass,
  ChartNoAxesColumn,
  DatabaseZap,
} from 'lucide-react'
import { IconTitleDescriptionCardData } from '@/shared/components/molecules/FeaturePages/IconTitleDescriptionCard'
import { ComparisonTableRow, VendorKey } from './LlmObservabilityPage.types'
import React from 'react'

export const LLM_OBSERVABILITY_CARDS: IconTitleDescriptionCardData[] = [
  {
    icon: <TextSearch size={14} className="text-signoz_vanilla-400" />,
    iconText: 'UNIFIED OBSERVABILITY PLATFORM',
    title: 'Correlate LLM Traces with System Logs',
    description:
      'Jump from a slow LLM trace to application logs to infrastructure metrics in one click. Understand if latency is from model inference, database queries, or network issues. No context switching between tools.',
  },
  {
    icon: <Atom size={14} className="text-signoz_vanilla-400" />,
    iconText: 'POWERFUL ALERTS AND CUSTOM DASHBOARDS',
    title: 'Get Notified Before Issues Impact Users',
    description:
      'Set alerts on any metric or trace attribute - token limits, error rates, P99 latency, or custom thresholds. Build dashboards that combine LLM metrics with infrastructure health.',
  },
  {
    icon: <ChartBarIncreasing size={14} className="text-signoz_vanilla-400" />,
    iconText: 'END-TO-END REQUEST TRACING',
    title: 'Trace Every Step from User Input to Final Response',
    description:
      'Visualize complete agent workflows with distributed tracing. See every model call, tool invocation, and reasoning step in waterfall views. Quickly identify loops, bottlenecks, and failed tool calls.',
  },
  {
    icon: <DraftingCompass size={14} className="text-signoz_vanilla-400" />,
    iconText: 'TOKEN USAGE & COST ANALYTICS',
    title: 'Control Your LLM Costs with Granular Token Tracking',
    description:
      'Track input/output tokens by model, operation, and user. Get cost breakdowns, prompt efficiency scores, and budget alerts to optimize spending without sacrificing quality.',
  },
  {
    icon: <ChartNoAxesColumn size={14} className="text-signoz_vanilla-400" />,
    iconText: 'PRODUCTION-READY INFRASTRUCTURE MONITORING',
    title: 'Monitor LLMs Alongside Your Entire Stack',
    description:
      'Track Kubernetes pods running your agents, database queries in your RAG pipeline, and API gateway traffic to your LLM endpoints. One platform for complete system observability.',
  },
  {
    icon: <DatabaseZap size={14} className="text-signoz_vanilla-400" />,
    iconText: 'PRE-BUILT FRAMEWORK INTEGRATIONS',
    title: 'Start Monitoring in Minutes, Not Days',
    description:
      'Instant setup for LangChain, LlamaIndex, CrewAI. Automatic instrumentation for OpenAI, Anthropic, Bedrock. Framework-specific dashboards included.',
  },
]

export const VENDORS: { key: VendorKey; label: string }[] = [
  { key: 'signoz', label: 'SigNoz' },
  { key: 'langfuse', label: 'Langfuse' },
  { key: 'langsmith', label: 'LangSmith' },
  { key: 'braintrust', label: 'Braintrust' },
]

export const LLM_COMPARISON_TABLE_ROWS: ComparisonTableRow[] = [
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
    feature: 'Application Correlation',
    vendors: {
      signoz: { supported: true, text: 'Cross-service tracing' },
      langfuse: { supported: false, text: '' },
      langsmith: { supported: false, text: '' },
      braintrust: { supported: false, text: '' },
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
    feature: 'Dashboards',
    vendors: {
      signoz: { supported: true, text: 'Advanced query builder' },
      langfuse: { supported: true, text: 'Limited presets' },
      langsmith: { supported: true, text: 'Limited presets' },
      braintrust: { supported: true, text: 'Basic charts' },
    },
  },
]

export const LLM_TOOLS_DATA = [
  {
    title: 'LLM Frameworks',
    items: [
      {
        id: 1,
        content: (
          <React.Fragment>
            Capture full agent execution and chain tracing with <strong>LangChain</strong>
          </React.Fragment>
        ),
      },
      {
        id: 2,
        content: (
          <React.Fragment>
            Monitor query engines and indexing pipelines in <strong>LlamaIndex</strong>
          </React.Fragment>
        ),
      },
      {
        id: 3,
        content: (
          <React.Fragment>
            Track multi-agent orchestration and delegation using <strong>CrewAI</strong>
          </React.Fragment>
        ),
      },
      {
        id: 4,
        content: (
          <React.Fragment>
            Observe complete RAG pipeline performance with <strong>Haystack</strong>
          </React.Fragment>
        ),
      },
      {
        id: 5,
        content: (
          <React.Fragment>
            Trace conversational agent interactions in <strong>AutoGen</strong>
          </React.Fragment>
        ),
      },
      {
        id: 6,
        content: (
          <React.Fragment>
            Monitor real-time voice AI pipelines with <strong>Pipecat</strong>
          </React.Fragment>
        ),
      },
    ],
  },
  {
    title: 'Model Providers',
    items: [
      {
        id: 7,
        content: (
          <React.Fragment>
            Monitor <strong>OpenAI</strong> GPT-4, GPT-3.5, and embedding calls
          </React.Fragment>
        ),
      },
      {
        id: 8,
        content: (
          <React.Fragment>
            Track requests to <strong>Anthropic</strong> Claude 3 and Claude 2
          </React.Fragment>
        ),
      },
      {
        id: 9,
        content: (
          <React.Fragment>
            Cover all <strong>Amazon Bedrock</strong> models including Claude, Llama, and Titan
          </React.Fragment>
        ),
      },
      {
        id: 10,
        content: (
          <React.Fragment>
            Observe <strong>Google Vertex AI</strong> Gemini and PaLM inference
          </React.Fragment>
        ),
      },
    ],
  },
  {
    title: 'Vector Stores & Databases',
    items: [
      {
        id: 11,
        content: (
          <React.Fragment>
            Trace vector search operations and latency in <strong>Pinecone</strong>
          </React.Fragment>
        ),
      },
      {
        id: 12,
        content: (
          <React.Fragment>
            Monitor hybrid search queries and filters with <strong>Weaviate</strong>
          </React.Fragment>
        ),
      },
      {
        id: 13,
        content: (
          <React.Fragment>
            Route and monitor any model through <strong>LiteLLM</strong> proxy
          </React.Fragment>
        ),
      },
      {
        id: 14,
        content: (
          <React.Fragment>
            Observe vector similarity search performance using <strong>Qdrant</strong>
          </React.Fragment>
        ),
      },
    ],
  },
  {
    title: 'Tools & APIs',
    items: [
      {
        id: 15,
        content: (
          <React.Fragment>
            Track real-time communication infrastructure with <strong>LiveKit</strong>
          </React.Fragment>
        ),
      },
      {
        id: 16,
        content: (
          <React.Fragment>
            Monitor voice AI application flows in <strong>Vapi</strong>
          </React.Fragment>
        ),
      },
      {
        id: 17,
        content: (
          <React.Fragment>
            Observe workflow automation and LLM chains in <strong>n8n</strong>
          </React.Fragment>
        ),
      },
      {
        id: 18,
        content: (
          <React.Fragment>
            Validate data structures and responses with <strong>Pydantic</strong>
          </React.Fragment>
        ),
      },
    ],
  },
]
