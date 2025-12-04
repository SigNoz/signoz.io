import {
  TextSearch,
  Atom,
  ChartBarIncreasing,
  DraftingCompass,
  ChartNoAxesColumn,
  DatabaseZap,
  Check,
  X,
} from 'lucide-react'
import { IconTitleDescriptionCardData } from '@/shared/components/molecules/FeaturePages/IconTitleDescriptionCard'

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

export const LLM_COMPARISON_TABLE_ROWS = [
  {
    feature: 'LLM Tracing',
    signoz: (
      <span className="flex items-center gap-2">
        <Check size={20} className="text-green-400" /> Full traces with OpenTelemetry
      </span>
    ),
    langfuse: (
      <span className="flex items-center gap-2">
        <Check size={20} className="text-green-400" /> OpenTelemetry-based
      </span>
    ),
    langsmith: (
      <span className="flex items-center gap-2">
        <Check size={20} className="text-green-400" /> Async distributed tracing
      </span>
    ),
    braintrust: (
      <span className="flex items-center gap-2">
        <Check size={20} className="text-green-400" /> Request-level tracing
      </span>
    ),
  },
  {
    feature: 'Production Alerts',
    signoz: (
      <span className="flex items-center gap-2">
        <Check size={20} className="text-green-400" /> Any metric
      </span>
    ),
    langfuse: (
      <span className="flex items-center gap-2">
        <X size={20} className="text-red-400" /> No alerting
      </span>
    ),
    langsmith: (
      <span className="flex items-center gap-2">
        <Check size={20} className="text-green-400" /> LLM metrics only
      </span>
    ),
    braintrust: (
      <span className="flex items-center gap-2">
        <Check size={20} className="text-green-400" /> LLM metrics only
      </span>
    ),
  },
  {
    feature: 'Prompt Management',
    signoz: (
      <span className="flex items-center gap-2">
        <Check size={20} className="text-green-400" /> Via integrations
      </span>
    ),
    langfuse: (
      <span className="flex items-center gap-2">
        <Check size={20} className="text-green-400" /> Version control with caching
      </span>
    ),
    langsmith: (
      <span className="flex items-center gap-2">
        <Check size={20} className="text-green-400" /> A/B testing built-in
      </span>
    ),
    braintrust: (
      <span className="flex items-center gap-2">
        <Check size={20} className="text-green-400" /> Side-by-side comparison
      </span>
    ),
  },
  {
    feature: 'Evaluation/Scoring',
    signoz: (
      <span className="flex items-center gap-2">
        <Check size={20} className="text-green-400" /> Via integrations
      </span>
    ),
    langfuse: (
      <span className="flex items-center gap-2">
        <Check size={20} className="text-green-400" /> LLM-as-judge, custom evals
      </span>
    ),
    langsmith: (
      <span className="flex items-center gap-2">
        <Check size={20} className="text-green-400" /> Built-in evaluators
      </span>
    ),
    braintrust: (
      <span className="flex items-center gap-2">
        <Check size={20} className="text-green-400" /> Dataset/task/scorer framework
      </span>
    ),
  },
  {
    feature: 'Infra Correlation',
    signoz: (
      <span className="flex items-center gap-2">
        <Check size={20} className="text-green-400" /> Metrics, logs, traces together
      </span>
    ),
    langfuse: (
      <span className="flex items-center gap-2">
        <X size={20} className="text-red-400" /> LLM-only
      </span>
    ),
    langsmith: (
      <span className="flex items-center gap-2">
        <X size={20} className="text-red-400" /> LLM-only
      </span>
    ),
    braintrust: (
      <span className="flex items-center gap-2">
        <X size={20} className="text-red-400" /> LLM-only
      </span>
    ),
  },
  {
    feature: 'Kubernetes/Docker Monitoring',
    signoz: (
      <span className="flex items-center gap-2">
        <Check size={20} className="text-green-400" /> Native support
      </span>
    ),
    langfuse: (
      <span className="flex items-center gap-2">
        <X size={20} className="text-red-400" />{' '}
      </span>
    ),
    langsmith: (
      <span className="flex items-center gap-2">
        <X size={20} className="text-red-400" />{' '}
      </span>
    ),
    braintrust: (
      <span className="flex items-center gap-2">
        <X size={20} className="text-red-400" />{' '}
      </span>
    ),
  },
  {
    feature: 'Database Query Tracking',
    signoz: (
      <span className="flex items-center gap-2">
        <Check size={20} className="text-green-400" /> Built-in
      </span>
    ),
    langfuse: (
      <span className="flex items-center gap-2">
        <X size={20} className="text-red-400" />{' '}
      </span>
    ),
    langsmith: (
      <span className="flex items-center gap-2">
        <X size={20} className="text-red-400" />{' '}
      </span>
    ),
    braintrust: (
      <span className="flex items-center gap-2">
        <X size={20} className="text-red-400" />{' '}
      </span>
    ),
  },
  {
    feature: 'Application Correlation',
    signoz: (
      <span className="flex items-center gap-2">
        <Check size={20} className="text-green-400" /> Cross-service tracing
      </span>
    ),
    langfuse: (
      <span className="flex items-center gap-2">
        <X size={20} className="text-red-400" />{' '}
      </span>
    ),
    langsmith: (
      <span className="flex items-center gap-2">
        <X size={20} className="text-red-400" />{' '}
      </span>
    ),
    braintrust: (
      <span className="flex items-center gap-2">
        <X size={20} className="text-red-400" />{' '}
      </span>
    ),
  },
  {
    feature: 'Dashboards',
    signoz: (
      <span className="flex items-center gap-2">
        <Check size={20} className="text-green-400" /> Advanced query builder
      </span>
    ),
    langfuse: (
      <span className="flex items-center gap-2">
        <Check size={20} className="text-green-400" /> Limited presets
      </span>
    ),
    langsmith: (
      <span className="flex items-center gap-2">
        <Check size={20} className="text-green-400" /> Limited presets
      </span>
    ),
    braintrust: (
      <span className="flex items-center gap-2">
        <Check size={20} className="text-green-400" /> Basic charts
      </span>
    ),
  },
]

export const LLM_TOOLS_DATA = [
  {
    title: 'LLM Frameworks',
    items: [
      <>
        Capture full agent execution and chain tracing with <strong>LangChain</strong>
      </>,
      <>
        Monitor query engines and indexing pipelines in <strong>LlamaIndex</strong>
      </>,
      <>
        Track multi-agent orchestration and delegation using <strong>CrewAI</strong>
      </>,
      <>
        Observe complete RAG pipeline performance with <strong>Haystack</strong>
      </>,
      <>
        Trace conversational agent interactions in <strong>AutoGen</strong>
      </>,
    ],
  },
  {
    title: 'Model Providers',
    items: [
      <>
        Monitor <strong>OpenAI</strong> GPT-4, GPT-3.5, and embedding calls
      </>,
      <>
        Track requests to <strong>Anthropic</strong> Claude 3 and Claude 2
      </>,
      <>
        Cover all <strong>Amazon Bedrock</strong> models including Claude, Llama, and Titan
      </>,
      <>
        Observe <strong>Google Vertex AI</strong> Gemini and PaLM inference
      </>,
      <>
        Monitor real-time voice AI pipelines with <strong>Pipecat</strong>
      </>,
    ],
  },
  {
    title: 'Vector Stores & Databases',
    items: [
      <>
        Trace vector search operations and latency in <strong>Pinecone</strong>
      </>,
      <>
        Monitor hybrid search queries and filters with <strong>Weaviate</strong>
      </>,
      <>
        Route and monitor any model through <strong>LiteLLM</strong> proxy
      </>,
      <>
        Observe vector similarity search performance using <strong>Qdrant</strong>
      </>,
    ],
  },
  {
    title: 'Tools & APIs',
    items: [
      <>
        Track real-time communication infrastructure with <strong>LiveKit</strong>
      </>,
      <>
        Monitor voice AI application flows in <strong>Vapi</strong>
      </>,
      <>
        Observe workflow automation and LLM chains in <strong>n8n</strong>
      </>,
      <>
        Validate data structures and responses with <strong>Pydantic</strong>
      </>,
    ],
  },
]
