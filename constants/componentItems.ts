/**
 * Single source of truth for data-bearing component items.
 *
 * Both the UI components (icon cards) and agent markdown stubs import from
 * here so the two can never drift out of sync.
 *
 * Pure data — no React, no icons, no framework dependencies.
 *
 * ## Data shapes
 *
 * **Flat array** (`ComponentItem[]`) — used when all items belong to a single
 * logical group and need no sub-grouping in the UI (e.g. `LLM_MONITORING_ITEMS`,
 * `DASHBOARD_TEMPLATES_ITEMS`). Export a bare array; no `getAll*` helper needed.
 *
 * **Sectioned object** — used when items must be rendered in labelled
 * sub-sections. Two forms:
 * - Single-level: `{ sectionKey: ComponentItem[] }` — each top-level key is
 *   one sub-section. Use `Object.values(CONSTANT).flat()` in the `getAll*`
 *   helper (e.g. `getAllCollectionAgentsItems`).
 * - Two-level: `{ group: { subKey: ComponentItem[] } }` — for constants where
 *   one logical group (e.g. `cloud`) itself splits into named sub-groups
 *   (e.g. `aws`, `azure`, `gcp`). Write the `getAll*` helper with explicit
 *   spreads instead of `Object.values().flat()` since the nested object would
 *   not flatten correctly (e.g. `getAllLogsInstrumentationItems`).
 *
 * ## Adding items to a listicle component
 *
 * 1. Add the new `{ name, href, clickName }` entry to the correct array or
 *    sub-section here. Do **not** use index-based slicing to split sections —
 *    use named sub-keys instead.
 * 2. If the component renders icons via an `ICON_MAP`, add a matching entry
 *    keyed by `href` in that component's icon map.
 * 3. Run `yarn tsc --noEmit` and `node --test tests/component-items-sync.test.js`
 *    to verify nothing is broken.
 */

export interface ComponentItem {
  name: string
  href: string
  clickName: string
}

// ---------------------------------------------------------------------------
// LLM Monitoring
// ---------------------------------------------------------------------------

export const LLM_MONITORING_ITEMS: ComponentItem[] = [
  { name: 'Agno', href: '/docs/agno-monitoring', clickName: 'Agno Monitoring' },
  {
    name: 'Amazon Bedrock',
    href: '/docs/amazon-bedrock-monitoring',
    clickName: 'Amazon Bedrock Monitoring',
  },
  {
    name: 'Anthropic API',
    href: '/docs/anthropic-monitoring',
    clickName: 'Anthropic API Monitoring',
  },
  { name: 'AutoGen', href: '/docs/autogen-observability', clickName: 'AutoGen Monitoring' },
  {
    name: 'Azure OpenAI API',
    href: '/docs/azure-openai-monitoring',
    clickName: 'Azure OpenAI API Monitoring',
  },
  {
    name: 'Claude Code',
    href: '/docs/claude-code-monitoring',
    clickName: 'Claude Code Monitoring',
  },
  {
    name: 'Claude Agent SDK',
    href: '/docs/claude-agent-monitoring',
    clickName: 'Claude Agent SDK Monitoring',
  },
  {
    name: 'Codex (OpenAI)',
    href: '/docs/codex-monitoring',
    clickName: 'Codex (OpenAI) Monitoring',
  },
  { name: 'Crew AI', href: '/docs/crewai-observability', clickName: 'Crew AI Monitoring' },
  { name: 'DeepSeek API', href: '/docs/deepseek-monitoring', clickName: 'DeepSeek Monitoring' },
  {
    name: 'Google ADK',
    href: '/docs/google-adk-observability',
    clickName: 'Google ADK Monitoring',
  },
  {
    name: 'Google Gemini',
    href: '/docs/google-gemini-monitoring',
    clickName: 'Google Gemini Monitoring',
  },
  { name: 'Grok', href: '/docs/grok-monitoring', clickName: 'Grok Monitoring' },
  { name: 'Groq', href: '/docs/groq-observability', clickName: 'Groq Monitoring' },
  { name: 'Haystack', href: '/docs/haystack-monitoring', clickName: 'Haystack Monitoring' },
  {
    name: 'Hugging Face',
    href: '/docs/huggingface-observability',
    clickName: 'Hugging Face Monitoring',
  },
  { name: 'Inkeep', href: '/docs/inkeep-monitoring', clickName: 'Inkeep Monitoring' },
  {
    name: 'LangChain/LangGraph',
    href: '/docs/langchain-observability',
    clickName: 'LangChain Monitoring',
  },
  { name: 'Langtrace', href: '/docs/langtrace', clickName: 'Langtrace' },
  { name: 'LiteLLM', href: '/docs/litellm-observability', clickName: 'LiteLLM Monitoring' },
  { name: 'LiveKit', href: '/docs/livekit-observability', clickName: 'LiveKit Monitoring' },
  {
    name: 'LlamaIndex',
    href: '/docs/llamaindex-observability',
    clickName: 'LlamaIndex Monitoring',
  },
  { name: 'Mastra', href: '/docs/mastra-observability', clickName: 'Mastra Monitoring' },
  {
    name: 'Mistral AI',
    href: '/docs/mistral-observability',
    clickName: 'Mistral AI Monitoring',
  },
  { name: 'Ollama', href: '/docs/ollama-monitoring', clickName: 'Ollama Monitoring' },
  { name: 'OpenAI', href: '/docs/openai-monitoring', clickName: 'OpenAI Monitoring' },
  { name: 'OpenClaw', href: '/docs/openclaw-monitoring', clickName: 'OpenClaw Monitoring' },
  { name: 'OpenLIT', href: '/docs/openlit', clickName: 'OpenLIT' },
  {
    name: 'OpenRouter',
    href: '/docs/openrouter-observability',
    clickName: 'OpenRouter Monitoring',
  },
  { name: 'Pipecat', href: '/docs/pipecat-monitoring', clickName: 'Pipecat Monitoring' },
  {
    name: 'Pydantic AI',
    href: '/docs/pydantic-ai-observability',
    clickName: 'Pydantic AI Monitoring',
  },
  {
    name: 'Semantic Kernel',
    href: '/docs/semantic-kernel-observability',
    clickName: 'Semantic Kernel Monitoring',
  },
  { name: 'Temporal', href: '/docs/temporal-observability', clickName: 'Temporal Monitoring' },
  {
    name: 'Traceloop (OpenLLMetry)',
    href: '/docs/traceloop',
    clickName: 'Traceloop (OpenLLMetry)',
  },
  {
    name: 'Vercel AI SDK',
    href: '/docs/vercel-ai-sdk-observability',
    clickName: 'Vercel AI SDK Monitoring',
  },
]

// ---------------------------------------------------------------------------
// Kubernetes Installation
// ---------------------------------------------------------------------------

export const K8S_INSTALLATION_ITEMS: ComponentItem[] = [
  { name: 'AWS', href: '/docs/install/kubernetes/aws', clickName: 'Deploy to AWS' },
  { name: 'GCP', href: '/docs/install/kubernetes/gcp', clickName: 'Deploy to GCP' },
  { name: 'AKS', href: '/docs/install/kubernetes/aks', clickName: 'Deploy to AKS' },
  {
    name: 'DigitalOcean',
    href: '/docs/install/digital-ocean',
    clickName: 'Deploy to DigitalOcean',
  },
  {
    name: 'Other Platform',
    href: '/docs/install/kubernetes/others',
    clickName: 'Deploy to Other Platform',
  },
  { name: 'Local', href: '/docs/install/kubernetes/local', clickName: 'Deploy Locally' },
  { name: 'ArgoCD', href: '/docs/install/argocd', clickName: 'Deploy with ArgoCD' },
  {
    name: 'Openshift',
    href: '/docs/install/kubernetes/openshift',
    clickName: 'Deploy to OpenShift',
  },
]

// ---------------------------------------------------------------------------
// Marketplace Installation
// ---------------------------------------------------------------------------

export const MARKETPLACE_INSTALLATION_ITEMS: ComponentItem[] = [
  { name: 'Railway', href: 'https://railway.com/deploy/signoz', clickName: 'Deploy to Railway' },
  {
    name: 'DigitalOcean',
    href: 'https://marketplace.digitalocean.com/apps/signoz',
    clickName: 'Deploy to DigitalOcean',
  },
  {
    name: 'Vultr',
    href: 'https://www.vultr.com/marketplace/apps/signoz/',
    clickName: 'Deploy to Vultr',
  },
  {
    name: 'Coolify',
    href: 'https://github.com/coollabsio/coolify/blob/v4.x/templates/compose/signoz.yaml',
    clickName: 'Deploy to Coolify',
  },
]

// ---------------------------------------------------------------------------
// Self-Host Installation (sectioned)
// ---------------------------------------------------------------------------

export const SELF_HOST_INSTALLATION_ITEMS = {
  docker: [
    { name: 'Standalone', href: '/docs/install/docker', clickName: 'Install Docker Standalone' },
    { name: 'Swarm', href: '/docs/install/docker-swarm', clickName: 'Install Docker Swarm' },
    { name: 'SELinux', href: '/docs/install/docker-selinux', clickName: 'Install Docker SELinux' },
  ] satisfies ComponentItem[],
  binary: [
    { name: 'Linux', href: '/docs/install/linux', clickName: 'Install Binary Linux' },
  ] satisfies ComponentItem[],
  kubernetes: [
    { name: 'AWS', href: '/docs/install/kubernetes/aws', clickName: 'Deploy to AWS' },
    { name: 'GCP', href: '/docs/install/kubernetes/gcp', clickName: 'Deploy to GCP' },
    { name: 'AKS', href: '/docs/install/kubernetes/aks', clickName: 'Deploy to AKS' },
    {
      name: 'DigitalOcean',
      href: '/docs/install/digital-ocean',
      clickName: 'Deploy to DigitalOcean',
    },
    {
      name: 'Other Platform',
      href: '/docs/install/kubernetes/others',
      clickName: 'Deploy to Other Platform',
    },
    { name: 'Local', href: '/docs/install/kubernetes/local', clickName: 'Deploy Locally' },
    { name: 'ArgoCD', href: '/docs/install/argocd', clickName: 'Deploy with ArgoCD' },
    {
      name: 'OpenShift',
      href: '/docs/install/kubernetes/openshift',
      clickName: 'Deploy to OpenShift',
    },
  ] satisfies ComponentItem[],
  others: [
    { name: 'ECS', href: '/docs/install/ecs/', clickName: 'Deploy to ECS' },
    {
      name: 'Azure Container Apps',
      href: '/docs/install/azure-container-apps',
      clickName: 'Deploy to Azure Container Apps',
    },
    { name: 'Render', href: '/docs/setup/render', clickName: 'Deploy to Render' },
    { name: 'Railway', href: 'https://railway.com/deploy/signoz', clickName: 'Deploy to Railway' },
    {
      name: 'DigitalOcean (Marketplace)',
      href: 'https://marketplace.digitalocean.com/apps/signoz',
      clickName: 'Deploy to DigitalOcean Marketplace',
    },
    {
      name: 'Vultr',
      href: 'https://www.vultr.com/marketplace/apps/signoz/',
      clickName: 'Deploy to Vultr',
    },
    {
      name: 'Coolify',
      href: 'https://github.com/coollabsio/coolify/blob/v4.x/templates/compose/signoz.yaml',
      clickName: 'Deploy to Coolify',
    },
  ] satisfies ComponentItem[],
} as const

export const getAllSelfHostInstallationItems = (): ComponentItem[] =>
  Object.values(SELF_HOST_INSTALLATION_ITEMS).flat()

// ---------------------------------------------------------------------------
// Collection Agents (sectioned)
// ---------------------------------------------------------------------------

export const COLLECTION_AGENTS_ITEMS = {
  docker: [
    {
      name: 'Docker',
      href: '/docs/opentelemetry-collection-agents/docker/install',
      clickName: 'Collection Agent on Docker',
    },
    {
      name: 'Docker Swarm',
      href: '/docs/opentelemetry-collection-agents/docker-swarm/install',
      clickName: 'Collection Agent on Docker Swarm',
    },
  ] satisfies ComponentItem[],
  ecs: [
    {
      name: 'ECS EC2 (Daemon Service)',
      href: '/docs/opentelemetry-collection-agents/ecs/ec2/overview',
      clickName: 'ECS EC2 Daemon Service',
    },
    {
      name: 'ECS Serverless (Sidecar)',
      href: '/docs/opentelemetry-collection-agents/ecs/sidecar/overview',
      clickName: 'ECS Serverless Sidecar',
    },
  ] satisfies ComponentItem[],
  kubernetes: [
    {
      name: 'K8s-Infra (Helm Chart)',
      href: '/docs/opentelemetry-collection-agents/k8s/k8s-infra/overview',
      clickName: 'K8s Infra Overview',
    },
    {
      name: 'OpenTelemetry Operator',
      href: '/docs/opentelemetry-collection-agents/k8s/otel-operator/overview',
      clickName: 'OTel Operator Overview',
    },
    {
      name: 'K8s Serverless (EKS Fargate)',
      href: '/docs/opentelemetry-collection-agents/k8s/serverless/overview',
      clickName: 'K8s Serverless Overview',
    },
  ] satisfies ComponentItem[],
  vm: [
    {
      name: 'OpenTelemetry Binary',
      href: '/docs/tutorial/opentelemetry-binary-usage-in-virtual-machine/',
      clickName: 'OpenTelemetry Binary',
    },
  ] satisfies ComponentItem[],
} as const

export const getAllCollectionAgentsItems = (): ComponentItem[] =>
  Object.values(COLLECTION_AGENTS_ITEMS).flat()

// ---------------------------------------------------------------------------
// APM Instrumentation (sectioned)
// ---------------------------------------------------------------------------

export const APM_INSTRUMENTATION_ITEMS = {
  javascript: [
    {
      name: 'Node.js',
      href: '/docs/instrumentation/opentelemetry-nodejs',
      clickName: 'Node.js Instrumentation Link',
    },
    {
      name: 'Next.js',
      href: '/docs/instrumentation/opentelemetry-nextjs',
      clickName: 'Next.js Instrumentation Link',
    },
    {
      name: 'ReactJS',
      href: '/docs/instrumentation/opentelemetry-reactjs',
      clickName: 'ReactJS Instrumentation Link',
    },
    {
      name: 'React Native',
      href: '/docs/instrumentation/opentelemetry-react-native',
      clickName: 'React Native Instrumentation Link',
    },
    {
      name: 'NuxtJS',
      href: '/docs/instrumentation/opentelemetry-nuxtjs',
      clickName: 'Nuxt.js Instrumentation Link',
    },
    {
      name: 'Cloudflare Workers',
      href: '/docs/instrumentation/opentelemetry-cloudflare',
      clickName: 'Cloudflare Workers Instrumentation Link',
    },
    {
      name: 'Frontend Monitoring',
      href: '/docs/frontend-monitoring',
      clickName: 'Frontend Monitoring Overview Link',
    },
  ] satisfies ComponentItem[],
  python: [
    {
      name: 'Python',
      href: '/docs/instrumentation/python',
      clickName: 'Python Instrumentation Link',
    },
    {
      name: 'Django',
      href: '/docs/instrumentation/django',
      clickName: 'Django Instrumentation Link',
    },
    {
      name: 'FastAPI',
      href: '/docs/instrumentation/fastapi',
      clickName: 'FastAPI Instrumentation Link',
    },
    { name: 'Flask', href: '/docs/instrumentation/flask', clickName: 'Flask Instrumentation Link' },
    {
      name: 'Falcon',
      href: '/docs/instrumentation/falcon',
      clickName: 'Falcon Instrumentation Link',
    },
    {
      name: 'Hypercorn/Unicorn',
      href: '/docs/instrumentation/hypercorn-unicorn-support',
      clickName: 'Hypercorn/Unicorn Instrumentation Link',
    },
    {
      name: 'Celery',
      href: '/docs/instrumentation/celery',
      clickName: 'Celery Instrumentation Link',
    },
  ] satisfies ComponentItem[],
  java: [
    {
      name: 'Java / Spring Boot',
      href: '/docs/instrumentation/java/opentelemetry-java',
      clickName: 'Java Instrumentation Link',
    },
    {
      name: 'Quarkus',
      href: '/docs/instrumentation/opentelemetry-quarkus',
      clickName: 'Quarkus Instrumentation Link',
    },
    {
      name: 'Tomcat',
      href: '/docs/instrumentation/tomcat',
      clickName: 'Tomcat Instrumentation Link',
    },
    { name: 'JBoss', href: '/docs/instrumentation/jboss', clickName: 'JBoss Instrumentation Link' },
  ] satisfies ComponentItem[],
  other: [
    {
      name: 'Golang (Go)',
      href: '/docs/instrumentation/golang',
      clickName: 'Golang Instrumentation Link',
    },
    {
      name: 'Deno',
      href: '/docs/instrumentation/opentelemetry-deno',
      clickName: 'Deno Instrumentation Link',
    },
    { name: 'PHP', href: '/docs/instrumentation/php', clickName: 'PHP Instrumentation Link' },
    {
      name: 'Laravel',
      href: '/docs/instrumentation/laravel',
      clickName: 'Laravel Instrumentation Link',
    },
    { name: '.NET', href: '/docs/instrumentation/dotnet', clickName: '.NET Instrumentation Link' },
    {
      name: 'Ruby',
      href: '/docs/instrumentation/ruby-on-rails',
      clickName: 'Ruby on Rails Instrumentation Link',
    },
    {
      name: 'Elixir',
      href: '/docs/instrumentation/elixir',
      clickName: 'Elixir Instrumentation Link',
    },
    { name: 'Rust', href: '/docs/instrumentation/rust', clickName: 'Rust Instrumentation Link' },
    {
      name: 'C++',
      href: '/docs/instrumentation/opentelemetry-cpp',
      clickName: 'C++ Instrumentation Link',
    },
    { name: 'Swift', href: '/docs/instrumentation/swift', clickName: 'Swift Instrumentation Link' },
  ] satisfies ComponentItem[],
  mobile: [
    {
      name: 'Android (Java)',
      href: '/docs/instrumentation/mobile-instrumentation/opentelemetry-java',
      clickName: 'Android (Java) Instrumentation Link',
    },
    {
      name: 'Android (Kotlin)',
      href: '/docs/instrumentation/mobile-instrumentation/opentelemetry-kotlin',
      clickName: 'Android (Kotlin) Instrumentation Link',
    },
    {
      name: 'iOS (SwiftUI)',
      href: '/docs/instrumentation/mobile-instrumentation/opentelemetry-swiftui',
      clickName: 'iOS (SwiftUI) Instrumentation Link',
    },
    {
      name: 'Flutter',
      href: '/docs/instrumentation/mobile-instrumentation/opentelemetry-flutter',
      clickName: 'Flutter Instrumentation Link',
    },
  ] satisfies ComponentItem[],
  additional: [
    {
      name: 'NGINX',
      href: '/docs/instrumentation/opentelemetry-nginx',
      clickName: 'NGINX Instrumentation Link',
    },
    {
      name: 'Manual JS',
      href: '/docs/instrumentation/manual-instrumentation/javascript/opentelemetry-nodejs',
      clickName: 'Manual JavaScript Instrumentation Link',
    },
    {
      name: 'WordPress',
      href: '/docs/instrumentation/opentelemetry-wordpress',
      clickName: 'WordPress Instrumentation Link',
    },
  ] satisfies ComponentItem[],
} as const

export const getAllAPMInstrumentationItems = (): ComponentItem[] =>
  Object.values(APM_INSTRUMENTATION_ITEMS).flat()

// ---------------------------------------------------------------------------
// Java Instrumentation (sectioned)
// ---------------------------------------------------------------------------

export const JAVA_INSTRUMENTATION_ITEMS = {
  frameworks: [
    {
      name: 'Java / Spring Boot',
      href: '/docs/instrumentation/java/opentelemetry-java',
      clickName: 'Java Spring Boot Instrumentation Link',
    },
    {
      name: 'Quarkus',
      href: '/docs/instrumentation/java/opentelemetry-quarkus',
      clickName: 'Quarkus Instrumentation Link',
    },
    {
      name: 'Tomcat',
      href: '/docs/instrumentation/java/opentelemetry-tomcat',
      clickName: 'Tomcat Instrumentation Link',
    },
    {
      name: 'JBoss / WildFly',
      href: '/docs/instrumentation/java/opentelemetry-jboss',
      clickName: 'JBoss WildFly Instrumentation Link',
    },
  ] satisfies ComponentItem[],
  advanced: [
    {
      name: 'Manual Instrumentation',
      href: '/docs/instrumentation/java/manual-instrumentation',
      clickName: 'Java Manual Instrumentation Link',
    },
  ] satisfies ComponentItem[],
} as const

export const getAllJavaInstrumentationItems = (): ComponentItem[] =>
  Object.values(JAVA_INSTRUMENTATION_ITEMS).flat()

// ---------------------------------------------------------------------------
// JavaScript Instrumentation (sectioned)
// ---------------------------------------------------------------------------

export const JAVASCRIPT_INSTRUMENTATION_ITEMS = {
  server: [
    {
      name: 'Node.js',
      href: '/docs/instrumentation/javascript/opentelemetry-nodejs',
      clickName: 'Node.js Instrumentation Link',
    },
    {
      name: 'Next.js',
      href: '/docs/instrumentation/javascript/opentelemetry-nextjs',
      clickName: 'Next.js Instrumentation Link',
    },
    {
      name: 'Nuxt.js',
      href: '/docs/instrumentation/javascript/opentelemetry-nuxtjs',
      clickName: 'Nuxt.js Instrumentation Link',
    },
  ] satisfies ComponentItem[],
  frontend: [
    {
      name: 'Send Frontend Traces',
      href: '/docs/frontend-monitoring/sending-traces-with-opentelemetry',
      clickName: 'Frontend Traces Instrumentation Link',
    },
    {
      name: 'Send Frontend Logs',
      href: '/docs/frontend-monitoring/sending-logs-with-opentelemetry',
      clickName: 'Frontend Logs Instrumentation Link',
    },
    {
      name: 'Send Frontend Metrics',
      href: '/docs/frontend-monitoring/sending-metrics-with-opentelemetry',
      clickName: 'Frontend Metrics Instrumentation Link',
    },
    {
      name: 'React Native',
      href: '/docs/instrumentation/javascript/opentelemetry-react-native',
      clickName: 'React Native Instrumentation Link',
    },
    {
      name: 'Monitor Web Vitals',
      href: '/docs/frontend-monitoring/opentelemetry-web-vitals',
      clickName: 'Web Vitals Instrumentation Link',
    },
    {
      name: 'Document Load Timings',
      href: '/docs/frontend-monitoring/document-load',
      clickName: 'Document Load Instrumentation Link',
    },
  ] satisfies ComponentItem[],
  advanced: [
    {
      name: 'Manual Node.js Instrumentation',
      href: '/docs/instrumentation/javascript/nodejs-manual-instrumentation',
      clickName: 'Manual Node.js Instrumentation Link',
    },
    {
      name: 'Selective Auto-Instrumentation',
      href: '/docs/instrumentation/javascript/nodejs-selective-instrumentation',
      clickName: 'Selective Auto-Instrumentation Link',
    },
    {
      name: 'Enable OTLP HTTP CORS',
      href: '/docs/userguide/otlp-http-enable-cors',
      clickName: 'OTLP HTTP CORS Guide Link',
    },
  ] satisfies ComponentItem[],
} as const

export const getAllJavascriptInstrumentationItems = (): ComponentItem[] =>
  Object.values(JAVASCRIPT_INSTRUMENTATION_ITEMS).flat()

// ---------------------------------------------------------------------------
// Logs Instrumentation (sectioned)
// ---------------------------------------------------------------------------

export const LOGS_INSTRUMENTATION_ITEMS = {
  platforms: [
    {
      name: 'Kubernetes',
      href: '/docs/userguide/collect_kubernetes_pod_logs',
      clickName: 'Kubernetes Logs Link',
    },
    { name: 'Docker', href: '/docs/userguide/collect_docker_logs', clickName: 'Docker Logs Link' },
    {
      name: 'Heroku',
      href: '/docs/userguide/heroku_logs_to_signoz',
      clickName: 'Heroku Logs Link',
    },
    {
      name: 'Vercel',
      href: '/docs/userguide/vercel_logs_to_signoz',
      clickName: 'Vercel Logs Link',
    },
    {
      name: 'Tomcat',
      href: '/docs/logs-management/send-logs/collect-tomcat-access-and-garbage-collector-logs',
      clickName: 'Tomcat Logs Link',
    },
    {
      name: 'Windows Event',
      href: '/docs/logs-management/send-logs/windows-events-log',
      clickName: 'Windows Logs Link',
    },
    {
      name: 'Cloudflare',
      href: '/docs/logs-management/send-logs/cloudflare-logs',
      clickName: 'Cloudflare Logs Link',
    },
    { name: 'Neon', href: '/docs/integrations/opentelemetry-neondb', clickName: 'Neon Logs Link' },
    {
      name: 'Convex',
      href: '/docs/logs-management/send-logs/convex-log-streams-signoz',
      clickName: 'Convex Logs Link',
    },
  ] satisfies ComponentItem[],
  languages: [
    {
      name: 'Python',
      href: '/docs/logs-management/send-logs/python-logs',
      clickName: 'Python Logs Link',
    },
    {
      name: 'Java',
      href: '/docs/logs-management/send-logs/java-logs',
      clickName: 'Java Logs Link',
    },
    {
      name: 'Node.js',
      href: '/docs/logs-management/send-logs/nodejs-logs',
      clickName: 'Node.js Logs Link',
    },
    {
      name: 'Bunyan (Node.js)',
      href: '/docs/logs-management/send-logs/opentelemetry-nodejs-bunyan-logs',
      clickName: 'Bunyan Logs Link',
    },
    {
      name: 'Winston (Node.js)',
      href: '/docs/logs-management/send-logs/nodejs-winston-logs',
      clickName: 'Winston Logs Link',
    },
    {
      name: 'Pino (Node.js)',
      href: '/docs/logs-management/send-logs/nodejs-pino-logs',
      clickName: 'Pino Logs Link',
    },
    {
      name: 'Lambda (Node.js)',
      href: '/docs/logs-management/send-logs/aws-lambda-nodejs',
      clickName: 'Lambda Node.js Logs Link',
    },
    {
      name: 'Logrus (Go)',
      href: '/docs/logs-management/send-logs/logrus-to-signoz',
      clickName: 'Logrus Logs Link',
    },
    {
      name: 'Zap (Go)',
      href: '/docs/logs-management/send-logs/zap-to-signoz',
      clickName: 'Zap Logs Link',
    },
    { name: 'Deno', href: '/docs/instrumentation/opentelemetry-deno', clickName: 'Deno Logs Link' },
  ] satisfies ComponentItem[],
  collectors: [
    {
      name: 'Log Files',
      href: '/docs/userguide/collect_logs_from_file',
      clickName: 'File Logs Link',
    },
    { name: 'HTTP Logs', href: '/docs/userguide/send-logs-http', clickName: 'HTTP Logs Link' },
    { name: 'Syslogs', href: '/docs/userguide/collecting_syslogs', clickName: 'Syslogs Link' },
    { name: 'FluentD', href: '/docs/userguide/fluentd_to_signoz', clickName: 'FluentD Logs Link' },
    {
      name: 'FluentBit',
      href: '/docs/userguide/fluentbit_to_signoz',
      clickName: 'FluentBit Logs Link',
    },
    {
      name: 'Logstash',
      href: '/docs/userguide/logstash_to_signoz',
      clickName: 'Logstash Logs Link',
    },
    {
      name: 'Vector',
      href: '/docs/logs-management/send-logs/vector-logs-to-signoz',
      clickName: 'Vector Logs Link',
    },
  ] satisfies ComponentItem[],
  cloud: {
    aws: [
      { name: 'EC2', href: '/docs/aws-monitoring/ec2/ec2-logs', clickName: 'EC2 Logs Link' },
      { name: 'ECS', href: '/docs/integrations/aws/ecs', clickName: 'ECS Link' },
      {
        name: 'EKS',
        href: '/docs/collection-agents/k8s/k8s-infra/install-k8s-infra/',
        clickName: 'EKS Logs Link',
      },
      { name: 'Lambda', href: '/docs/integrations/aws/lambda', clickName: 'AWS Lambda Link' },
      { name: 'S3', href: '/docs/aws-monitoring/s3', clickName: 'S3 Link' },
      { name: 'RDS', href: '/docs/integrations/aws/rds', clickName: 'RDS Link' },
      { name: 'DynamoDB', href: '/docs/integrations/aws/dynamodb', clickName: 'DynamoDB Link' },
      {
        name: 'ElastiCache',
        href: '/docs/integrations/aws/elasticache',
        clickName: 'ElastiCache Link',
      },
      { name: 'ELB', href: '/docs/aws-monitoring/elb', clickName: 'ELB Link' },
      { name: 'ALB', href: '/docs/integrations/aws/alb', clickName: 'ALB Link' },
      {
        name: 'API Gateway',
        href: '/docs/integrations/aws/api-gateway',
        clickName: 'API Gateway Link',
      },
      { name: 'MSK', href: '/docs/integrations/aws/msk', clickName: 'MSK Link' },
      { name: 'SNS', href: '/docs/integrations/aws/sns', clickName: 'SNS Link' },
      { name: 'SQS', href: '/docs/integrations/aws/sqs', clickName: 'SQS Link' },
      { name: 'VPC', href: '/docs/aws-monitoring/vpc', clickName: 'VPC Link' },
      {
        name: 'Cloudwatch',
        href: '/docs/userguide/send-cloudwatch-logs-to-signoz',
        clickName: 'Cloudwatch Logs Link',
      },
    ] satisfies ComponentItem[],
    azure: [
      {
        name: 'App Service',
        href: '/docs/azure-monitoring/app-service/logging/',
        clickName: 'App Service Logs Link',
      },
      {
        name: 'AKS',
        href: '/docs/collection-agents/k8s/k8s-infra/install-k8s-infra/',
        clickName: 'AKS Logs Link',
      },
      {
        name: 'Container Apps',
        href: '/docs/azure-monitoring/az-container-apps/logging/',
        clickName: 'Container Apps Logs Link',
      },
      {
        name: 'Azure Functions',
        href: '/docs/azure-monitoring/az-fns/logging/',
        clickName: 'Azure Functions Logs Link',
      },
      {
        name: 'Blob Storage',
        href: '/docs/azure-monitoring/az-blob-storage/logging/',
        clickName: 'Blob Storage Logs Link',
      },
      {
        name: 'Virtual Machines',
        href: '/docs/azure-monitoring/virtual-machines/vm-metrics',
        clickName: 'Azure VMs Link',
      },
      {
        name: 'MySQL Flexible Server',
        href: '/docs/azure-monitoring/mysql-flexible-server',
        clickName: 'Azure MySQL Link',
      },
    ] satisfies ComponentItem[],
    gcp: [
      {
        name: 'Cloud Functions',
        href: '/docs/gcp-monitoring/gcp-fns/logging/',
        clickName: 'Cloud Functions Logs Link',
      },
      {
        name: 'App Engine',
        href: '/docs/gcp-monitoring/app-engine/logging/',
        clickName: 'App Engine Logs Link',
      },
      {
        name: 'Compute Engine',
        href: '/docs/gcp-monitoring/compute-engine/logging/',
        clickName: 'Compute Engine Logs Link',
      },
      {
        name: 'Cloud Storage',
        href: '/docs/gcp-monitoring/gcs/logging/',
        clickName: 'Cloud Storage Logs Link',
      },
      {
        name: 'Cloud SQL',
        href: '/docs/gcp-monitoring/cloud-sql/logging/',
        clickName: 'Cloud SQL Logs Link',
      },
      {
        name: 'Cloud Load Balancer',
        href: '/docs/gcp-monitoring/gcp-clb/logging/',
        clickName: 'Cloud Load Balancer Logs Link',
      },
      { name: 'VPC', href: '/docs/gcp-monitoring/vpc/logging/', clickName: 'VPC Logs Link' },
      {
        name: 'GKE',
        href: '/docs/gcp-monitoring/gke/gke-logging-and-metrics/',
        clickName: 'GKE Logs Link',
      },
      {
        name: 'Cloud Run',
        href: '/docs/gcp-monitoring/cloud-run/logging/',
        clickName: 'Cloud Run Logs Link',
      },
    ] satisfies ComponentItem[],
  },
} as const

export const getAllLogsInstrumentationItems = (): ComponentItem[] => [
  ...LOGS_INSTRUMENTATION_ITEMS.platforms,
  ...LOGS_INSTRUMENTATION_ITEMS.languages,
  ...LOGS_INSTRUMENTATION_ITEMS.collectors,
  ...LOGS_INSTRUMENTATION_ITEMS.cloud.aws,
  ...LOGS_INSTRUMENTATION_ITEMS.cloud.azure,
  ...LOGS_INSTRUMENTATION_ITEMS.cloud.gcp,
]

// ---------------------------------------------------------------------------
// Integrations (sectioned)
// ---------------------------------------------------------------------------

export const INTEGRATIONS_ITEMS = {
  temporal: [
    {
      name: 'Cloud Metrics',
      href: '/docs/integrations/temporal-cloud-metrics',
      clickName: 'Temporal Cloud Metrics Link',
    },
    {
      name: 'Golang',
      href: '/docs/integrations/temporal-golang-opentelemetry',
      clickName: 'Temporal Golang Link',
    },
    {
      name: 'Typescript',
      href: '/docs/integrations/temporal-typescript-opentelemetry',
      clickName: 'Temporal Typescript Link',
    },
  ] satisfies ComponentItem[],
  databases: [
    { name: 'Redis', href: '/docs/integrations/redis', clickName: 'Redis Integration Link' },
    {
      name: 'PostgreSQL',
      href: '/docs/integrations/postgresql',
      clickName: 'PostgreSQL Integration Link',
    },
    { name: 'MongoDB', href: '/docs/integrations/mongodb', clickName: 'MongoDB Integration Link' },
    {
      name: 'Clickhouse',
      href: '/docs/integrations/clickhouse',
      clickName: 'Clickhouse Integration Link',
    },
    {
      name: 'Neon',
      href: '/docs/integrations/opentelemetry-neondb',
      clickName: 'Neon Integration Link',
    },
    {
      name: 'Microsoft SQL Server',
      href: '/docs/integrations/sql-server',
      clickName: 'Microsoft SQL Server Integration Link',
    },
  ] satisfies ComponentItem[],
  aws: [
    {
      name: 'One-Click AWS Integrations',
      href: '/docs/integrations/aws/one-click-aws-integrations',
      clickName: 'One-Click AWS Integrations Link',
    },
    {
      name: 'AWS RDS PostgreSQL (Manual)',
      href: '/docs/integrations/aws-rds-postgres',
      clickName: 'AWS RDS PostgreSQL Link',
    },
    {
      name: 'AWS RDS MySQL (Manual)',
      href: '/docs/integrations/aws-rds-mysql',
      clickName: 'AWS RDS MySQL Link',
    },
    {
      name: 'AWS Elasticache Redis (Manual)',
      href: '/docs/integrations/aws-elasticache-redis',
      clickName: 'AWS Elasticache Redis Link',
    },
  ] satisfies ComponentItem[],
  other: [
    { name: 'Nginx', href: '/docs/integrations/nginx', clickName: 'Nginx Integration Link' },
  ] satisfies ComponentItem[],
} as const

export const getAllIntegrationsItems = (): ComponentItem[] =>
  Object.values(INTEGRATIONS_ITEMS).flat()

// ---------------------------------------------------------------------------
// CI/CD Monitoring (sectioned)
// ---------------------------------------------------------------------------

export const CICD_MONITORING_ITEMS = {
  github: [
    {
      name: 'GitHub Actions Traces',
      href: '/docs/cicd/github/github-actions-traces',
      clickName: 'GitHub Actions Traces Link',
    },
    {
      name: 'GitHub Metrics',
      href: '/docs/cicd/github/github-metrics',
      clickName: 'GitHub Metrics Link',
    },
  ] satisfies ComponentItem[],
  jenkins: [
    {
      name: 'Jenkins Agent Monitoring',
      href: '/docs/cicd/jenkins/agent-node-monitoring',
      clickName: 'Jenkins Agent Monitoring Link',
    },
    {
      name: 'Jenkins Tracing',
      href: '/docs/cicd/jenkins/jenkins-tracing',
      clickName: 'Jenkins Tracing Link',
    },
  ] satisfies ComponentItem[],
  argocd: [
    {
      name: 'ArgoCD Metrics',
      href: '/docs/cicd/argocd/argocd-metrics',
      clickName: 'ArgoCD Metrics Link',
    },
  ] satisfies ComponentItem[],
} as const

export const getAllCICDMonitoringItems = (): ComponentItem[] =>
  Object.values(CICD_MONITORING_ITEMS).flat()

// ---------------------------------------------------------------------------
// AWS Monitoring (sectioned)
// ---------------------------------------------------------------------------

export const AWS_MONITORING_ITEMS = {
  compute: [
    { name: 'EC2', href: '/docs/aws-monitoring/ec2/', clickName: 'EC2 Monitoring Link' },
    { name: 'ECS', href: '/docs/aws-monitoring/ecs/', clickName: 'ECS Monitoring Link' },
    { name: 'EKS', href: '/docs/aws-monitoring/eks', clickName: 'EKS Monitoring Link' },
    { name: 'Lambda', href: '/docs/aws-monitoring/lambda', clickName: 'Lambda Monitoring Link' },
  ] satisfies ComponentItem[],
  databases: [
    { name: 'RDS', href: '/docs/aws-monitoring/rds', clickName: 'RDS Monitoring Link' },
    {
      name: 'DynamoDB',
      href: '/docs/aws-monitoring/dynamodb',
      clickName: 'DynamoDB Monitoring Link',
    },
    {
      name: 'ElastiCache',
      href: '/docs/aws-monitoring/elasticache',
      clickName: 'ElastiCache Monitoring Link',
    },
  ] satisfies ComponentItem[],
  networking: [
    { name: 'ALB', href: '/docs/aws-monitoring/alb', clickName: 'ALB Monitoring Link' },
    { name: 'ELB', href: '/docs/aws-monitoring/elb-logs', clickName: 'ELB Monitoring Link' },
    { name: 'VPC', href: '/docs/aws-monitoring/vpc', clickName: 'VPC Monitoring Link' },
    {
      name: 'API Gateway',
      href: '/docs/aws-monitoring/api-gateway',
      clickName: 'API Gateway Monitoring Link',
    },
  ] satisfies ComponentItem[],
  messaging: [
    { name: 'MSK', href: '/docs/aws-monitoring/msk', clickName: 'MSK Monitoring Link' },
    { name: 'SQS', href: '/docs/aws-monitoring/sqs', clickName: 'SQS Monitoring Link' },
    { name: 'SNS', href: '/docs/aws-monitoring/sns', clickName: 'SNS Monitoring Link' },
  ] satisfies ComponentItem[],
  storage: [
    { name: 'S3', href: '/docs/aws-monitoring/s3', clickName: 'S3 Monitoring Link' },
  ] satisfies ComponentItem[],
} as const

export const getAllAWSMonitoringItems = (): ComponentItem[] =>
  Object.values(AWS_MONITORING_ITEMS).flat()

// ---------------------------------------------------------------------------
// AWS One-Click Integrations (sectioned)
// ---------------------------------------------------------------------------

export const AWS_ONE_CLICK_ITEMS = {
  compute: [
    { name: 'EC2', href: '/docs/integrations/aws/ec2', clickName: 'EC2 Integration Link' },
    { name: 'ECS', href: '/docs/integrations/aws/ecs', clickName: 'ECS Integration Link' },
    { name: 'EKS', href: '/docs/integrations/aws/eks', clickName: 'EKS Integration Link' },
    { name: 'Lambda', href: '/docs/integrations/aws/lambda', clickName: 'Lambda Integration Link' },
  ] satisfies ComponentItem[],
  databases: [
    { name: 'RDS', href: '/docs/integrations/aws/rds', clickName: 'RDS Integration Link' },
    {
      name: 'DynamoDB',
      href: '/docs/integrations/aws/dynamodb',
      clickName: 'DynamoDB Integration Link',
    },
    {
      name: 'ElastiCache',
      href: '/docs/integrations/aws/elasticache',
      clickName: 'ElastiCache Integration Link',
    },
  ] satisfies ComponentItem[],
  networking: [
    { name: 'ALB', href: '/docs/integrations/aws/alb', clickName: 'ALB Integration Link' },
    {
      name: 'API Gateway',
      href: '/docs/integrations/aws/api-gateway',
      clickName: 'API Gateway Integration Link',
    },
  ] satisfies ComponentItem[],
  messaging: [
    { name: 'MSK', href: '/docs/integrations/aws/msk', clickName: 'MSK Integration Link' },
    { name: 'SQS', href: '/docs/integrations/aws/sqs', clickName: 'SQS Integration Link' },
    { name: 'SNS', href: '/docs/integrations/aws/sns', clickName: 'SNS Integration Link' },
  ] satisfies ComponentItem[],
} as const

export const getAllAWSOneClickItems = (): ComponentItem[] =>
  Object.values(AWS_ONE_CLICK_ITEMS).flat()

// ---------------------------------------------------------------------------
// Dashboard Templates (flat)
// ---------------------------------------------------------------------------

export const DASHBOARD_TEMPLATES_ITEMS: ComponentItem[] = [
  {
    name: 'Agno',
    href: '/docs/dashboards/dashboard-templates/agno-dashboard',
    clickName: 'Agno Dashboard Template',
  },
  {
    name: 'Amazon Bedrock',
    href: '/docs/dashboards/dashboard-templates/amazon-bedrock-dashboard',
    clickName: 'Amazon Bedrock Dashboard Template',
  },
  {
    name: 'Anthropic API',
    href: '/docs/dashboards/dashboard-templates/anthropic-dashboard',
    clickName: 'Anthropic API Dashboard Template',
  },
  {
    name: 'Apache Web Server',
    href: '/docs/dashboards/dashboard-templates/apache-web-server',
    clickName: 'Apache Web Server Dashboard Template',
  },
  {
    name: 'APM',
    href: '/docs/dashboards/dashboard-templates/apm-dashboards',
    clickName: 'APM Dashboard Template',
  },
  {
    name: 'ArgoCD',
    href: '/docs/dashboards/dashboard-templates/argocd-dashboard',
    clickName: 'ArgoCD Dashboard Template',
  },
  {
    name: 'Autogen',
    href: '/docs/dashboards/dashboard-templates/autogen-dashboard',
    clickName: 'Autogen Dashboard Template',
  },
  {
    name: 'AWS ElastiCache Redis',
    href: '/docs/dashboards/dashboard-templates/aws-elasticache-redis',
    clickName: 'AWS ElastiCache Redis Dashboard Template',
  },
  {
    name: 'AWS RDS',
    href: 'https://github.com/SigNoz/dashboards/tree/main/aws-rds',
    clickName: 'AWS RDS Dashboard Template',
  },
  {
    name: 'AWS SQS Prometheus',
    href: 'https://github.com/SigNoz/dashboards/tree/main/aws-sqs-prometheus',
    clickName: 'AWS SQS Prometheus Dashboard Template',
  },
  {
    name: 'Azure OpenAI API',
    href: '/docs/dashboards/dashboard-templates/azure-openai-dashboard',
    clickName: 'Azure OpenAI API Dashboard Template',
  },
  {
    name: 'CI/CD',
    href: '/docs/dashboards/dashboard-templates/cicd',
    clickName: 'CI/CD Dashboard Template',
  },
  {
    name: 'Claude Code',
    href: '/docs/dashboards/dashboard-templates/claude-code-dashboard/',
    clickName: 'Claude Code Dashboard Template',
  },
  {
    name: 'Claude Agent SDK',
    href: '/docs/dashboards/dashboard-templates/claude-agent-sdk-dashboard/',
    clickName: 'Claude Agent SDK Dashboard Template',
  },
  {
    name: 'ClickHouse',
    href: '/docs/dashboards/dashboard-templates/clickhouse-monitoring',
    clickName: 'ClickHouse Dashboard Template',
  },
  {
    name: 'Codex (OpenAI)',
    href: '/docs/dashboards/dashboard-templates/codex-dashboard',
    clickName: 'Codex Dashboard Template',
  },
  {
    name: 'Cost Meter',
    href: '/docs/dashboards/dashboard-templates/cost-meter',
    clickName: 'Cost Meter Dashboard Template',
  },
  {
    name: 'CouchDB',
    href: '/docs/dashboards/dashboard-templates/couchdb',
    clickName: 'CouchDB Dashboard Template',
  },
  {
    name: 'Crew AI',
    href: '/docs/dashboards/dashboard-templates/crewai-dashboard',
    clickName: 'Crew AI Dashboard Template',
  },
  {
    name: 'DeepSeek API',
    href: '/docs/dashboards/dashboard-templates/deepseek-dashboard',
    clickName: 'DeepSeek API Dashboard Template',
  },
  {
    name: 'Docker Container Metrics',
    href: '/docs/dashboards/dashboard-templates/docker-container-metrics',
    clickName: 'Docker Container Metrics Dashboard Template',
  },
  {
    name: 'ECS Infra Metrics',
    href: 'https://github.com/SigNoz/dashboards/tree/main/ecs-infra-metrics',
    clickName: 'ECS Infra Metrics Dashboard Template',
  },
  {
    name: 'Envoy Proxy',
    href: '/docs/dashboards/dashboard-templates/envoy-dashboard',
    clickName: 'Envoy Proxy Dashboard Template',
  },
  {
    name: 'Flask Monitoring',
    href: '/docs/dashboards/dashboard-templates/flask-monitoring',
    clickName: 'Flask Monitoring Dashboard Template',
  },
  {
    name: 'Frontend Monitoring',
    href: '/docs/dashboards/dashboard-templates/frontend-monitoring',
    clickName: 'Frontend Monitoring Dashboard Template',
  },
  {
    name: 'GCP Compute Engine',
    href: 'https://github.com/SigNoz/dashboards/tree/main/gcp/compute-engine',
    clickName: 'GCP Compute Engine Dashboard Template',
  },
  {
    name: 'Google ADK',
    href: '/docs/dashboards/dashboard-templates/google-adk-dashboard',
    clickName: 'Google ADK Dashboard Template',
  },
  {
    name: 'Google Gemini',
    href: 'https://github.com/SigNoz/dashboards/tree/main/google-gemini',
    clickName: 'Google Gemini Dashboard Template',
  },
  {
    name: 'Go Runtime',
    href: '/docs/dashboards/dashboard-templates/go-runtime-metrics',
    clickName: 'Go Runtime Dashboard Template',
  },
  {
    name: 'Grok',
    href: '/docs/dashboards/dashboard-templates/grok-dashboard',
    clickName: 'xAi Grok Dashboard Template',
  },
  {
    name: 'Groq',
    href: '/docs/dashboards/dashboard-templates/groq-dashboard',
    clickName: 'Groq Dashboard Template',
  },
  {
    name: 'Hadoop',
    href: 'https://github.com/SigNoz/dashboards/tree/main/hadoop',
    clickName: 'Hadoop Dashboard Template',
  },
  {
    name: 'HAProxy',
    href: '/docs/dashboards/dashboard-templates/haproxy-monitoring',
    clickName: 'HAProxy Dashboard Template',
  },
  {
    name: 'Haystack',
    href: '/docs/dashboards/dashboard-templates/haystack-dashboard',
    clickName: 'Haystack Dashboard Template',
  },
  {
    name: 'Host Metrics',
    href: '/docs/dashboards/dashboard-templates/hostmetrics-dashboards',
    clickName: 'Host Metrics Dashboard Template',
  },
  {
    name: 'Hugging Face',
    href: '/docs/dashboards/dashboard-templates/huggingface-dashboard',
    clickName: 'Hugging Face Dashboard Template',
  },
  {
    name: 'Inkeep',
    href: '/docs/dashboards/dashboard-templates/inkeep-dashboard',
    clickName: 'Inkeep Dashboard Template',
  },
  {
    name: 'Jenkins',
    href: 'https://github.com/SigNoz/dashboards/tree/main/jenkins',
    clickName: 'Jenkins Dashboard Template',
  },
  {
    name: 'JMX',
    href: 'https://github.com/SigNoz/dashboards/tree/main/jmx',
    clickName: 'JMX Dashboard Template',
  },
  {
    name: 'JVM',
    href: '/docs/dashboards/dashboard-templates/jvm-metrics',
    clickName: 'JVM Dashboard Template',
  },
  {
    name: 'Kubernetes',
    href: '/docs/dashboards/dashboard-templates/kubernetes-dashboards',
    clickName: 'K8s Infra Metrics Dashboard Template',
  },
  {
    name: 'KEDA',
    href: 'https://github.com/SigNoz/dashboards/tree/main/keda',
    clickName: 'KEDA Dashboard Template',
  },
  {
    name: 'Key Operations',
    href: '/docs/dashboards/dashboard-templates/key-operations',
    clickName: 'Key Operations Dashboard Template',
  },
  {
    name: 'LiteLLM',
    href: '/docs/dashboards/dashboard-templates/litellm-dashboards',
    clickName: 'LiteLLM Dashboard Template',
  },
  {
    name: 'LiveKit',
    href: '/docs/dashboards/dashboard-templates/livekit-dashboard',
    clickName: 'LiveKit Dashboard Template',
  },
  {
    name: 'LLM Observability',
    href: 'https://github.com/SigNoz/dashboards/tree/main/llm-observability',
    clickName: 'LLM Observability Dashboard Template',
  },
  {
    name: 'Mastra',
    href: '/docs/dashboards/dashboard-templates/mastra-dashboard',
    clickName: 'Mastra Dashboard Template',
  },
  {
    name: 'Memcached',
    href: '/docs/dashboards/dashboard-templates/memcached',
    clickName: 'Memcached Dashboard Template',
  },
  {
    name: 'Mistral AI',
    href: '/docs/dashboards/dashboard-templates/mistral-dashboard',
    clickName: 'Mistral AI Dashboard Template',
  },
  {
    name: 'MongoDB',
    href: 'https://github.com/SigNoz/dashboards/tree/main/mongodb',
    clickName: 'MongoDB Dashboard Template',
  },
  {
    name: 'MySQL',
    href: '/docs/dashboards/dashboard-templates/mysql',
    clickName: 'MySQL Dashboard Template',
  },
  {
    name: 'Nginx',
    href: '/docs/dashboards/dashboard-templates/nginx',
    clickName: 'Nginx Dashboard Template',
  },
  {
    name: 'NVIDIA DCGM',
    href: 'https://github.com/SigNoz/dashboards/tree/main/nvidia-dcgm',
    clickName: 'NVIDIA DCGM Dashboard Template',
  },
  {
    name: 'Nomad',
    href: 'https://github.com/SigNoz/dashboards/tree/main/nomad',
    clickName: 'Nomad Dashboard Template',
  },
  {
    name: 'Ollama',
    href: '/docs/dashboards/dashboard-templates/ollama-dashboard',
    clickName: 'Ollama Dashboard Template',
  },
  {
    name: 'OpenAI',
    href: '/docs/dashboards/dashboard-templates/openai-dashboard',
    clickName: 'OpenAI Dashboard Template',
  },
  {
    name: 'OpenClaw',
    href: '/docs/dashboards/dashboard-templates/openclaw-dashboard',
    clickName: 'OpenClaw Dashboard Template',
  },
  {
    name: 'OpenRouter',
    href: '/docs/dashboards/dashboard-templates/openrouter-dashboard',
    clickName: 'OpenRouter Dashboard Template',
  },
  {
    name: 'Pipecat',
    href: '/docs/dashboards/dashboard-templates/pipecat-dashboard',
    clickName: 'Pipecat Dashboard Template',
  },
  {
    name: 'PostgreSQL',
    href: '/docs/dashboards/dashboard-templates/postgresql',
    clickName: 'PostgreSQL Dashboard Template',
  },
  {
    name: 'Pydantic AI',
    href: '/docs/dashboards/dashboard-templates/pydantic-ai-dashboard',
    clickName: 'Pydantic AI Dashboard Template',
  },
  {
    name: 'RabbitMQ',
    href: '/docs/dashboards/dashboard-templates/rabbitmq',
    clickName: 'RabbitMQ Dashboard Template',
  },
  {
    name: 'Redis',
    href: 'https://github.com/SigNoz/dashboards/tree/main/redis',
    clickName: 'Redis Dashboard Template',
  },
  {
    name: 'Render',
    href: '/docs/dashboards/dashboard-templates/render-dashboard',
    clickName: 'Render Dashboard Template',
  },
  {
    name: 'Semantic Kernel',
    href: '/docs/dashboards/dashboard-templates/semantic-kernel-dashboard',
    clickName: 'Semantic Kernel Dashboard Template',
  },
  {
    name: 'SigNoz Ingestion Analysis',
    href: '/docs/dashboards/dashboard-templates/signoz-ingestion-analysis',
    clickName: 'SigNoz Ingestion Analysis Dashboard Template',
  },
  {
    name: 'SLURM',
    href: 'https://github.com/SigNoz/dashboards/tree/main/slurm',
    clickName: 'SLURM Dashboard Template',
  },
  {
    name: 'Snowflake',
    href: 'https://github.com/SigNoz/dashboards/tree/main/snowflake',
    clickName: 'Snowflake Dashboard Template',
  },
  {
    name: 'Supabase',
    href: '/docs/dashboards/dashboard-templates/supabase',
    clickName: 'Supabase Dashboard Template',
  },
  {
    name: 'Temporal Agents',
    href: '/docs/dashboards/dashboard-templates/temporal-dashboard',
    clickName: 'Temporal Agents Dashboard Template',
  },
  {
    name: 'Temporal.io',
    href: 'https://github.com/SigNoz/dashboards/tree/main/temporal.io',
    clickName: 'Temporal.io Dashboard Template',
  },
  {
    name: 'Vercel AI SDK',
    href: 'https://github.com/SigNoz/dashboards/tree/main/vercel-ai-sdk',
    clickName: 'Vercel AI SDK Dashboard Template',
  },
]

// ---------------------------------------------------------------------------
// APM Dashboards (flat)
// ---------------------------------------------------------------------------

export const APM_DASHBOARDS_ITEMS: ComponentItem[] = [
  {
    name: 'APM Metrics',
    href: '/docs/dashboards/dashboard-templates/apm-metrics',
    clickName: 'APM Metrics Dashboard Template',
  },
  {
    name: 'Database Calls Monitoring',
    href: '/docs/dashboards/dashboard-templates/db-calls-monitoring',
    clickName: 'Database Calls Monitoring Dashboard Template',
  },
  {
    name: 'HTTP API Monitoring',
    href: '/docs/dashboards/dashboard-templates/http-api-monitoring',
    clickName: 'HTTP API Monitoring Dashboard Template',
  },
]

// ---------------------------------------------------------------------------
// Kubernetes Dashboards (flat)
// ---------------------------------------------------------------------------

export const KUBERNETES_DASHBOARDS_ITEMS: ComponentItem[] = [
  {
    name: 'Kubernetes Cluster Metrics (Overview)',
    href: '/docs/dashboards/dashboard-templates/kubernetes-cluster-metrics',
    clickName: 'Kubernetes Cluster Metrics Dashboard Template',
  },
  {
    name: 'Kubernetes Events',
    href: '/docs/dashboards/dashboard-templates/kubernetes-events',
    clickName: 'Kubernetes Events Dashboard Template',
  },
  {
    name: 'Kubernetes Pod Metrics (Overall)',
    href: '/docs/dashboards/dashboard-templates/kubernetes-pod-metrics-overall',
    clickName: 'Kubernetes Pod Metrics Overall Dashboard Template',
  },
  {
    name: 'Kubernetes Pod Metrics (Detailed)',
    href: '/docs/dashboards/dashboard-templates/kubernetes-pod-metrics-detailed',
    clickName: 'Kubernetes Pod Metrics Detailed Dashboard Template',
  },
  {
    name: 'Kubernetes Node Metrics (Overall)',
    href: '/docs/dashboards/dashboard-templates/kubernetes-node-metrics-overall',
    clickName: 'Kubernetes Node Metrics Overall Dashboard Template',
  },
  {
    name: 'Kubernetes Node Metrics (Detailed)',
    href: '/docs/dashboards/dashboard-templates/kubernetes-node-metrics-detailed',
    clickName: 'Kubernetes Node Metrics Detailed Dashboard Template',
  },
  {
    name: 'Kubernetes PVC Metrics',
    href: '/docs/dashboards/dashboard-templates/kubernetes-pvc',
    clickName: 'Kubernetes PVC Metrics Dashboard Template',
  },
  {
    name: 'Host Metrics',
    href: '/docs/dashboards/dashboard-templates/hostmetrics-k8s',
    clickName: 'Host Metrics Dashboard Template',
  },
]

// ---------------------------------------------------------------------------
// LiteLLM Dashboards (flat)
// ---------------------------------------------------------------------------

export const LITELLM_DASHBOARDS_ITEMS: ComponentItem[] = [
  {
    name: 'LiteLLM Proxy',
    href: '/docs/dashboards/dashboard-templates/litellm-proxy-dashboard',
    clickName: 'LiteLLM Proxy Dashboard Template',
  },
  {
    name: 'LiteLLM SDK',
    href: '/docs/dashboards/dashboard-templates/litellm-sdk-dashboard',
    clickName: 'LiteLLM SDK Dashboard Template',
  },
]

// ---------------------------------------------------------------------------
// Host Metrics Dashboards (flat)
// ---------------------------------------------------------------------------

export const HOST_METRICS_DASHBOARDS_ITEMS: ComponentItem[] = [
  {
    name: 'Host Metrics K8s',
    href: '/docs/dashboards/dashboard-templates/hostmetrics-k8s',
    clickName: 'Host Metrics K8s Dashboard Template',
  },
  {
    name: 'Host Metrics (VM)',
    href: '/docs/dashboards/dashboard-templates/hostmetrics-vm',
    clickName: 'Host Metrics VM Dashboard Template',
  },
]

// ---------------------------------------------------------------------------
// APM Quick Start (flat)
// ---------------------------------------------------------------------------

export const APM_QUICK_START_ITEMS: ComponentItem[] = [
  {
    name: 'Python',
    href: '/docs/instrumentation/python',
    clickName: 'Python Instrumentation Link',
  },
  {
    name: 'Java',
    href: '/docs/instrumentation/java/overview',
    clickName: 'Java Instrumentation Link',
  },
  {
    name: 'JavaScript',
    href: '/docs/instrumentation/javascript/overview',
    clickName: 'JavaScript Instrumentation Link',
  },
  {
    name: 'Golang (Go)',
    href: '/docs/instrumentation/opentelemetry-golang',
    clickName: 'Golang Instrumentation Link',
  },
  { name: 'PHP', href: '/docs/instrumentation/php', clickName: 'PHP Instrumentation Link' },
  {
    name: '.NET',
    href: '/docs/instrumentation/opentelemetry-dotnet',
    clickName: '.NET Instrumentation Link',
  },
  {
    name: 'Ruby',
    href: '/docs/instrumentation/ruby-on-rails',
    clickName: 'Ruby on Rails Instrumentation Link',
  },
  {
    name: 'Elixir',
    href: '/docs/instrumentation/elixir',
    clickName: 'Elixir Instrumentation Link',
  },
  { name: 'Rust', href: '/docs/instrumentation/rust', clickName: 'Rust Instrumentation Link' },
  {
    name: 'C++',
    href: '/docs/instrumentation/opentelemetry-cpp',
    clickName: 'C++ Instrumentation Link',
  },
  { name: 'Swift', href: '/docs/instrumentation/swift', clickName: 'Swift Instrumentation Link' },
  {
    name: 'Deno',
    href: '/docs/instrumentation/opentelemetry-deno',
    clickName: 'Deno Instrumentation Link',
  },
]

// ---------------------------------------------------------------------------
// Logs Quick Start (flat)
// ---------------------------------------------------------------------------

export const LOGS_QUICK_START_ITEMS: ComponentItem[] = [
  {
    name: 'Kubernetes',
    href: '/docs/userguide/collect_kubernetes_pod_logs',
    clickName: 'Kubernetes Logs Link',
  },
  { name: 'Docker', href: '/docs/userguide/collect_docker_logs', clickName: 'Docker Logs Link' },
  {
    name: 'Log Files',
    href: '/docs/userguide/collect_logs_from_file',
    clickName: 'File Logs Link',
  },
  { name: 'Syslogs', href: '/docs/userguide/collecting_syslogs', clickName: 'Syslogs Link' },
  {
    name: 'Python',
    href: '/docs/logs-management/send-logs/python-logs',
    clickName: 'Python Logs Link',
  },
  { name: 'Java', href: '/docs/logs-management/send-logs/java-logs', clickName: 'Java Logs Link' },
  {
    name: 'Node.js',
    href: '/docs/logs-management/send-logs/nodejs-logs',
    clickName: 'Node.js Logs Link',
  },
  {
    name: 'Go',
    href: '/docs/logs-management/send-logs/logrus-to-signoz',
    clickName: 'Go Logs Link',
  },
  {
    name: 'FluentBit',
    href: '/docs/userguide/fluentbit_to_signoz',
    clickName: 'FluentBit Logs Link',
  },
  { name: 'Logstash', href: '/docs/userguide/logstash_to_signoz', clickName: 'Logstash Logs Link' },
  { name: 'HTTP', href: '/docs/userguide/send-logs-http', clickName: 'HTTP Logs Link' },
  {
    name: 'AWS',
    href: '/docs/userguide/send-cloudwatch-logs-to-signoz',
    clickName: 'AWS Logs Link',
  },
]

// ---------------------------------------------------------------------------
// Metrics Quick Start (sectioned)
// ---------------------------------------------------------------------------

export const METRICS_QUICK_START_ITEMS = {
  collection: [
    {
      name: 'OTel Receivers',
      href: '/docs/userguide/otel-metrics-receivers',
      clickName: 'OTel Receivers Link',
    },
    {
      name: 'Prometheus',
      href: '/docs/userguide/prometheus-metrics',
      clickName: 'Prometheus Metrics Link',
    },
    {
      name: 'GCP Cloud Monitoring',
      href: '/docs/gcp-monitoring/cloud-monitoring/metrics',
      clickName: 'GCP Cloud Monitoring Metrics Link',
    },
    {
      name: 'HTTP Endpoints',
      href: '/docs/monitor-http-endpoints',
      clickName: 'HTTP Endpoints Link',
    },
    {
      name: 'Datadog Receiver',
      href: '/docs/migration/opentelemetry-datadog-receiver',
      clickName: 'Datadog Receiver Link',
    },
    {
      name: 'StatsD',
      href: '/docs/userguide/opentelemetry-statsd',
      clickName: 'StatsD Metrics Link',
    },
  ] satisfies ComponentItem[],
  infrastructure: [
    { name: 'Host Metrics', href: '/docs/userguide/hostmetrics', clickName: 'Host Metrics Link' },
    {
      name: 'Docker',
      href: '/docs/metrics-management/docker-container-metrics',
      clickName: 'Docker Metrics Link',
    },
    {
      name: 'Kubernetes',
      href: '/docs/userguide/k8s-metrics',
      clickName: 'Kubernetes Metrics Link',
    },
    { name: 'AWS ECS', href: '/docs/integrations/aws/ecs', clickName: 'AWS ECS Metrics Link' },
    {
      name: 'AWS ECS Fargate',
      href: '/docs/opentelemetry-collection-agents/ecs/sidecar/overview/',
      clickName: 'AWS ECS Fargate Metrics Link',
    },
    {
      name: 'AWS EC2',
      href: '/docs/opentelemetry-collection-agents/ecs/ec2/overview/',
      clickName: 'AWS EC2 Metrics Link',
    },
    { name: 'AWS EKS', href: '/docs/aws-monitoring/eks', clickName: 'AWS EKS Metrics Link' },
    {
      name: 'GCP Compute Engine',
      href: '/docs/gcp-monitoring/compute-engine/metrics',
      clickName: 'GCP Compute Engine Metrics Link',
    },
    {
      name: 'Azure VM',
      href: '/docs/azure-monitoring/virtual-machines/vm-metrics',
      clickName: 'Azure VM Metrics Link',
    },
    {
      name: 'GCP VPC',
      href: '/docs/gcp-monitoring/vpc/metrics',
      clickName: 'GCP VPC Metrics Link',
    },
    {
      name: 'GKE (GCP)',
      href: '/docs/gcp-monitoring/gke/gke-logging-and-metrics',
      clickName: 'GKE Metrics Link',
    },
    {
      name: 'Traefik',
      href: '/docs/tutorial/traefik-observability',
      clickName: 'Traefik Metrics Link',
    },
    { name: 'Nomad', href: '/docs/integrations/nomad', clickName: 'Nomad Metrics Link' },
    {
      name: 'Fly.io',
      href: '/docs/metrics-management/fly-metrics',
      clickName: 'Fly.io Metrics Link',
    },
    { name: 'Envoy', href: '/docs/userguide/envoy-metrics', clickName: 'Envoy Metrics Link' },
    {
      name: 'NVIDIA GPU (DCGM)',
      href: '/docs/metrics-management/nvidia-dcgm-metrics',
      clickName: 'NVIDIA DCGM Metrics Link',
    },
    {
      name: 'SLURM',
      href: '/docs/metrics-management/slurm-metrics',
      clickName: 'SLURM Metrics Link',
    },
    {
      name: 'Render',
      href: '/docs/metrics-management/render-metrics',
      clickName: 'Render Metrics Link',
    },
  ] satisfies ComponentItem[],
  applications: [
    {
      name: 'Golang',
      href: '/docs/metrics-management/send-metrics/applications/golang',
      clickName: 'Golang Metrics Link',
    },
    {
      name: 'Rust',
      href: '/docs/metrics-management/send-metrics/applications/opentelemetry-rust',
      clickName: 'Rust Metrics Link',
    },
    {
      name: 'Java',
      href: '/docs/metrics-management/send-metrics/applications/opentelemetry-java',
      clickName: 'Java Metrics Link',
    },
    {
      name: '.NET',
      href: '/docs/metrics-management/send-metrics/applications/opentelemetry-dotnet',
      clickName: '.NET Metrics Link',
    },
    {
      name: 'Node.js',
      href: '/docs/metrics-management/send-metrics/applications/opentelemetry-nodejs',
      clickName: 'Node.js Metrics Link',
    },
    {
      name: 'Python',
      href: '/docs/metrics-management/send-metrics/applications/opentelemetry-python',
      clickName: 'Python Metrics Link',
    },
    {
      name: 'Deno',
      href: '/docs/instrumentation/opentelemetry-deno',
      clickName: 'Deno Metrics Link',
    },
  ] satisfies ComponentItem[],
  databases: [
    {
      name: 'ClickHouse',
      href: '/docs/integrations/clickhouse',
      clickName: 'ClickHouse Metrics Link',
    },
    {
      name: 'Snowflake',
      href: '/docs/integrations/snowflake',
      clickName: 'Snowflake Metrics Link',
    },
    { name: 'MongoDB', href: '/docs/tutorial/mongodb-metrics', clickName: 'MongoDB Metrics Link' },
    {
      name: 'MongoDB Atlas',
      href: '/docs/integrations/mongodb-atlas',
      clickName: 'MongoDB Atlas Metrics Link',
    },
    {
      name: 'PostgreSQL',
      href: '/docs/integrations/postgresql',
      clickName: 'PostgreSQL Metrics Link',
    },
    {
      name: 'GCP Cloud SQL',
      href: '/docs/gcp-monitoring/cloud-sql/metrics',
      clickName: 'GCP Cloud SQL Metrics Link',
    },
    { name: 'Redis', href: '/docs/integrations/redis', clickName: 'Redis Metrics Link' },
    {
      name: 'MySQL',
      href: '/docs/metrics-management/mysql-metrics',
      clickName: 'MySQL Metrics Link',
    },
    {
      name: 'Neon',
      href: '/docs/integrations/opentelemetry-neondb',
      clickName: 'Neon Metrics Link',
    },
    {
      name: 'SQL Server',
      href: '/docs/integrations/sql-server',
      clickName: 'SQL Server Metrics Link',
    },
    {
      name: 'Azure SQL Database',
      href: '/docs/azure-monitoring/db-metrics',
      clickName: 'Azure SQL Database Metrics Link',
    },
    {
      name: 'AWS RDS MySQL',
      href: '/docs/integrations/aws-rds-mysql',
      clickName: 'AWS RDS MySQL Link',
    },
    {
      name: 'AWS RDS PostgreSQL',
      href: '/docs/integrations/aws-rds-postgres',
      clickName: 'AWS RDS PostgreSQL Link',
    },
    {
      name: 'AWS ElastiCache',
      href: '/docs/integrations/aws-elasticache-redis',
      clickName: 'AWS ElastiCache Link',
    },
  ] satisfies ComponentItem[],
  webServers: [
    {
      name: 'NGINX',
      href: '/docs/metrics-management/nginx-metrics',
      clickName: 'NGINX Metrics Link',
    },
    {
      name: 'GCP Cloud Load Balancer',
      href: '/docs/gcp-monitoring/gcp-clb/metrics',
      clickName: 'GCP Cloud Load Balancer Metrics Link',
    },
  ] satisfies ComponentItem[],
  messaging: [
    { name: 'Kafka', href: '/docs/messaging-queues/kafka', clickName: 'Kafka Metrics Link' },
    { name: 'MSK', href: '/docs/messaging-queues/msk', clickName: 'MSK Metrics Link' },
    {
      name: 'Confluent Kafka',
      href: '/docs/messaging-queues/confluent-kafka',
      clickName: 'Confluent Kafka Metrics Link',
    },
    { name: 'Strimzi', href: '/docs/messaging-queues/strimzi', clickName: 'Strimzi Metrics Link' },
    {
      name: 'Celery',
      href: '/docs/messaging-queues/celery-setup',
      clickName: 'Celery Metrics Link',
    },
  ] satisfies ComponentItem[],
  runtimes: [
    {
      name: 'JVM',
      href: '/docs/metrics-management/send-metrics/applications/opentelemetry-java/#jvm-runtime-metrics',
      clickName: 'JVM Metrics Link',
    },
    { name: 'JMX', href: '/docs/tutorial/jmx-metrics', clickName: 'JMX Metrics Link' },
  ] satisfies ComponentItem[],
  cloudPlatforms: [
    {
      name: 'GCP Cloud Run',
      href: '/docs/gcp-monitoring/cloud-run/metrics',
      clickName: 'GCP Cloud Run Metrics Link',
    },
    {
      name: 'GCP App Engine',
      href: '/docs/gcp-monitoring/app-engine/metrics',
      clickName: 'GCP App Engine Metrics Link',
    },
    {
      name: 'GCP Cloud Functions',
      href: '/docs/gcp-monitoring/gcp-fns/fns-metrics',
      clickName: 'GCP Cloud Functions Metrics Link',
    },
    {
      name: 'GCP Cloud Storage',
      href: '/docs/gcp-monitoring/gcs/metrics',
      clickName: 'GCP Cloud Storage Metrics Link',
    },
    {
      name: 'Temporal Cloud',
      href: '/docs/integrations/temporal-cloud-metrics',
      clickName: 'Temporal Cloud Link',
    },
    { name: 'Supabase', href: '/docs/integrations/supabase', clickName: 'Supabase Metrics Link' },
    { name: 'ArgoCD', href: '/docs/cicd/argocd/argocd-metrics', clickName: 'ArgoCD Metrics Link' },
    {
      name: 'GitHub Actions',
      href: '/docs/cicd/github/github-metrics',
      clickName: 'GitHub Actions Link',
    },
    {
      name: 'Azure App Service',
      href: '/docs/azure-monitoring/app-service/metrics',
      clickName: 'Azure App Service Metrics Link',
    },
    {
      name: 'Azure Functions',
      href: '/docs/azure-monitoring/az-fns/metrics',
      clickName: 'Azure Functions Metrics Link',
    },
    {
      name: 'Azure Container Apps',
      href: '/docs/azure-monitoring/az-container-apps/metrics',
      clickName: 'Azure Container Apps Metrics Link',
    },
    {
      name: 'Azure Blob Storage',
      href: '/docs/azure-monitoring/az-blob-storage/metrics',
      clickName: 'Azure Blob Storage Metrics Link',
    },
  ] satisfies ComponentItem[],
} as const

export const getAllMetricsQuickStartItems = (): ComponentItem[] =>
  Object.values(METRICS_QUICK_START_ITEMS).flat()

// ---------------------------------------------------------------------------
// Migrate to SigNoz (flat)
// ---------------------------------------------------------------------------

export const MIGRATE_TO_SIGNOZ_ITEMS: ComponentItem[] = [
  {
    name: 'Migrate from Datadog',
    href: '/docs/migration/migrate-from-datadog-to-signoz/',
    clickName: 'Migrate from Datadog',
  },
  {
    name: 'Migrate from Grafana',
    href: '/docs/migration/migrate-from-grafana/',
    clickName: 'Migrate from Grafana',
  },
  {
    name: 'Migrate from ELK',
    href: '/docs/migration/migrate-from-elk/',
    clickName: 'Migrate from ELK',
  },
  {
    name: 'Migrate from New Relic',
    href: '/docs/migration/migrate-from-newrelic/',
    clickName: 'Migrate from New Relic',
  },
  {
    name: 'Migrate from Honeycomb',
    href: '/docs/migration/migrate-from-honeycomb-to-signoz/',
    clickName: 'Migrate from Honeycomb',
  },
  {
    name: 'Migrate from OpenTelemetry',
    href: '/docs/migration/migrate-from-opentelemetry-to-signoz/',
    clickName: 'Migrate from OpenTelemetry',
  },
  {
    name: 'Migrate from Self-Hosted SigNoz',
    href: '/docs/migration/migrate-to-signoz-cloud/',
    clickName: 'Migrate from Self-Hosted SigNoz',
  },
]

// ---------------------------------------------------------------------------
// Web Vitals (flat)
// ---------------------------------------------------------------------------

export const WEB_VITALS_ITEMS: ComponentItem[] = [
  {
    name: 'Sending Web Vitals as Metrics',
    href: '/docs/frontend-monitoring/web-vitals-with-metrics',
    clickName: 'Sending Web Vitals as Metrics',
  },
  {
    name: 'Sending Web Vitals as Traces',
    href: '/docs/frontend-monitoring/web-vitals-with-traces',
    clickName: 'Sending Web Vitals as Traces',
  },
]

// ---------------------------------------------------------------------------
// Hosting Decision
// ---------------------------------------------------------------------------

export const HOSTING_DECISION_ITEMS: ComponentItem[] = [
  {
    name: 'Compare Self Host vs Cloud',
    href: '/blog/cloud-vs-self-hosted-deployment-guide/',
    clickName: 'Compare Self Host vs Cloud',
  },
  {
    name: 'Get Started - Free',
    href: '/teams/',
    clickName: 'Get Started - Free',
  },
]
