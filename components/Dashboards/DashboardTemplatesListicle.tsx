'use client'

import React, { useState } from 'react'
import {
  SiKubernetes,
  SiPostgresql,
  SiMysql,
  SiMongodb,
  SiRedis,
  SiApache,
  SiNginx,
  SiRabbitmq,
  SiDocker,
  SiJenkins,
  SiSnowflake,
  SiClickhouse,
  SiVercel,
  SiClaude,
  SiGooglegemini,
  SiAnthropic,
  SiAmazonwebservices,
  SiPydantic,
  SiGo,
  SiTemporal,
  SiOpenai,
  SiSupabase,
  SiOllama,
  SiHuggingface,
  SiN8N,
} from 'react-icons/si'
import {
  Monitor,
  Database,
  Server,
  MessageSquare,
  Activity,
  Cloud,
  BarChart3,
  Settings,
  GitBranch,
  Layers,
  Globe,
  Zap,
  Shield,
  HardDrive,
  Cpu,
  Network,
  Container,
  Brain,
  Eye,
  Target,
  Clock,
  Award,
  Search,
} from 'lucide-react'
import IconCardGrid from '../Card/IconCardGrid'
import { DASHBOARD_TEMPLATES_ITEMS } from '@/constants/componentItems'

const ICON_MAP: Record<string, React.ReactNode> = {
  '/docs/dashboards/dashboard-templates/agno-dashboard': (
    <img src="/svgs/icons/LLMMonitoring/agno-logo.webp" alt="Agno Icon" className="h-7 w-7" />
  ),
  '/docs/dashboards/dashboard-templates/amazon-bedrock-dashboard': (
    <SiAmazonwebservices className="h-7 w-7 text-white" />
  ),
  '/docs/dashboards/dashboard-templates/anthropic-dashboard': (
    <SiAnthropic className="h-7 w-7 text-orange-600" />
  ),
  '/docs/dashboards/dashboard-templates/apache-web-server': (
    <SiApache className="h-7 w-7 text-red-600" />
  ),
  '/docs/dashboards/dashboard-templates/apm-dashboards': (
    <Activity className="h-7 w-7 text-blue-500" />
  ),
  '/docs/dashboards/dashboard-templates/argocd-dashboard': (
    <GitBranch className="h-7 w-7 text-orange-500" />
  ),
  '/docs/dashboards/dashboard-templates/autogen-dashboard': (
    <img src="/svgs/icons/LLMMonitoring/autogen-logo.webp" alt="Autogen Icon" className="h-7 w-7" />
  ),
  '/docs/dashboards/dashboard-templates/aws-elasticache-redis': (
    <Cloud className="h-7 w-7 text-orange-600" />
  ),
  'https://github.com/SigNoz/dashboards/tree/main/aws-rds': (
    <Database className="h-7 w-7 text-blue-600" />
  ),
  'https://github.com/SigNoz/dashboards/tree/main/aws-sqs-prometheus': (
    <MessageSquare className="h-7 w-7 text-purple-600" />
  ),
  '/docs/dashboards/dashboard-templates/azure-openai-dashboard': (
    <img
      src="/svgs/icons/LLMMonitoring/azure-logo.webp"
      alt="Azure OpenAI Icon"
      className="h-7 w-7"
    />
  ),
  '/docs/dashboards/dashboard-templates/cicd': <Settings className="h-7 w-7 text-green-600" />,
  '/docs/dashboards/dashboard-templates/claude-code-dashboard/': (
    <SiClaude className="h-7 w-7 text-orange-500" />
  ),
  '/docs/dashboards/dashboard-templates/claude-agent-sdk-dashboard/': (
    <SiClaude className="h-7 w-7" style={{ color: '#b55c04' }} />
  ),
  '/docs/dashboards/dashboard-templates/clickhouse-monitoring': (
    <SiClickhouse className="h-7 w-7 text-yellow-500" />
  ),
  '/docs/dashboards/dashboard-templates/codex-dashboard': (
    <SiOpenai className="h-7 w-7 text-white" />
  ),
  '/docs/dashboards/dashboard-templates/cost-meter': (
    <BarChart3 className="h-7 w-7 text-blue-500" />
  ),
  '/docs/dashboards/dashboard-templates/couchdb': <Database className="h-7 w-7 text-red-500" />,
  '/docs/dashboards/dashboard-templates/crewai-dashboard': (
    <img src="/svgs/icons/LLMMonitoring/crewai-logo.svg" alt="Crew AI Icon" className="h-7 w-7" />
  ),
  '/docs/dashboards/dashboard-templates/deepseek-dashboard': (
    <img
      src="/svgs/icons/LLMMonitoring/deepseek-icon.svg"
      alt="DeepSeek Icon"
      className="h-7 w-7"
    />
  ),
  '/docs/dashboards/dashboard-templates/docker-container-metrics': (
    <SiDocker className="h-7 w-7 text-blue-400" />
  ),
  'https://github.com/SigNoz/dashboards/tree/main/ecs-infra-metrics': (
    <Container className="h-7 w-7 text-orange-500" />
  ),
  '/docs/dashboards/dashboard-templates/envoy-dashboard': (
    <Network className="h-7 w-7 text-purple-500" />
  ),
  '/docs/dashboards/dashboard-templates/flask-monitoring': <Globe className="h-7 w-7 text-black" />,
  '/docs/dashboards/dashboard-templates/frontend-monitoring': (
    <Network className="h-7 w-7 text-white" />
  ),
  'https://github.com/SigNoz/dashboards/tree/main/gcp/compute-engine': (
    <Cloud className="h-7 w-7 text-blue-500" />
  ),
  '/docs/dashboards/dashboard-templates/google-adk-dashboard': (
    <img
      src="/svgs/icons/LLMMonitoring/google-adk-logo.webp"
      alt="Google ADK Icon"
      className="h-7 w-7"
    />
  ),
  'https://github.com/SigNoz/dashboards/tree/main/google-gemini': (
    <SiGooglegemini className="h-7 w-7 text-blue-500" />
  ),
  '/docs/dashboards/dashboard-templates/go-runtime-metrics': (
    <SiGo className="h-7 w-7 text-cyan-500" />
  ),
  '/docs/dashboards/dashboard-templates/grok-dashboard': (
    <img src="/svgs/icons/LLMMonitoring/grok-logo.webp" alt="Grok Icon" className="h-7 w-7" />
  ),
  '/docs/dashboards/dashboard-templates/groq-dashboard': (
    <img src="/svgs/icons/LLMMonitoring/groq-logo.webp" alt="Groq Icon" className="h-7 w-7" />
  ),
  'https://github.com/SigNoz/dashboards/tree/main/hadoop': (
    <Server className="h-7 w-7 text-yellow-600" />
  ),
  '/docs/dashboards/dashboard-templates/haproxy-monitoring': (
    <Shield className="h-7 w-7 text-blue-600" />
  ),
  '/docs/dashboards/dashboard-templates/haystack-dashboard': (
    <img
      src="/svgs/icons/LLMMonitoring/haystack-logo.webp"
      alt="Haystack Icon"
      className="h-7 w-7"
    />
  ),
  '/docs/dashboards/dashboard-templates/hostmetrics-dashboards': (
    <Monitor className="h-7 w-7 text-blue-500" />
  ),
  '/docs/dashboards/dashboard-templates/huggingface-dashboard': (
    <SiHuggingface className="h-7 w-7" style={{ color: '#fcba03' }} />
  ),
  '/docs/dashboards/dashboard-templates/inkeep-dashboard': (
    <img src="/svgs/icons/LLMMonitoring/inkeep-logo.webp" alt="Inkeep Icon" className="h-7 w-7" />
  ),
  'https://github.com/SigNoz/dashboards/tree/main/jenkins': (
    <SiJenkins className="h-7 w-7 text-blue-700" />
  ),
  'https://github.com/SigNoz/dashboards/tree/main/jmx': <Cpu className="h-7 w-7 text-red-600" />,
  '/docs/dashboards/dashboard-templates/jvm-metrics': <Cpu className="h-7 w-7 text-orange-600" />,
  '/docs/dashboards/dashboard-templates/kubernetes-dashboards': (
    <SiKubernetes className="h-7 w-7 text-blue-600" />
  ),
  'https://github.com/SigNoz/dashboards/tree/main/keda': (
    <Zap className="h-7 w-7 text-purple-500" />
  ),
  '/docs/dashboards/dashboard-templates/key-operations': (
    <Target className="h-7 w-7 text-green-500" />
  ),
  '/docs/dashboards/dashboard-templates/litellm-dashboards': (
    <img src="/svgs/icons/LLMMonitoring/litellm-logo.webp" alt="LiteLLM Icon" className="h-7 w-7" />
  ),
  '/docs/dashboards/dashboard-templates/livekit-dashboard': (
    <img src="/svgs/icons/LLMMonitoring/livekit-icon.svg" alt="LiveKit Icon" className="h-7 w-7" />
  ),
  'https://github.com/SigNoz/dashboards/tree/main/llm-observability': (
    <Brain className="h-7 w-7 text-purple-600" />
  ),
  '/docs/dashboards/dashboard-templates/mastra-dashboard': (
    <img src="/svgs/icons/LLMMonitoring/mastra-icon.webp" alt="Mastra Icon" className="h-7 w-7" />
  ),
  '/docs/dashboards/dashboard-templates/memcached': (
    <HardDrive className="h-7 w-7 text-green-600" />
  ),
  '/docs/dashboards/dashboard-templates/mistral-dashboard': (
    <img
      src="/svgs/icons/LLMMonitoring/mistral-logo.webp"
      alt="Mistral AI Icon"
      className="h-7 w-7"
    />
  ),
  'https://github.com/SigNoz/dashboards/tree/main/mongodb': (
    <SiMongodb className="h-7 w-7 text-green-600" />
  ),
  '/docs/dashboards/dashboard-templates/mysql': <SiMysql className="h-7 w-7 text-orange-500" />,
  '/docs/dashboards/dashboard-templates/nginx': <SiNginx className="h-7 w-7 text-green-500" />,
  'https://github.com/SigNoz/dashboards/tree/main/nvidia-dcgm': (
    <Cpu className="h-7 w-7 text-green-600" />
  ),
  'https://github.com/SigNoz/dashboards/tree/main/nomad': (
    <Layers className="h-7 w-7 text-purple-600" />
  ),
  '/docs/dashboards/dashboard-templates/n8n-dashboard': <SiN8N className="h-7 w-7 text-gray-500" />,
  '/docs/dashboards/dashboard-templates/ollama-dashboard': (
    <SiOllama className="h-7 w-7 text-white" />
  ),
  '/docs/dashboards/dashboard-templates/openai-dashboard': (
    <SiOpenai className="h-7 w-7 text-white" />
  ),
  '/docs/dashboards/dashboard-templates/openclaw-dashboard': (
    <img
      src="/svgs/icons/LLMMonitoring/openclaw-logo.svg"
      alt="OpenClaw Icon"
      className="h-7 w-7"
    />
  ),
  '/docs/dashboards/dashboard-templates/openrouter-dashboard': (
    <img
      src="/svgs/icons/LLMMonitoring/openrouter-logo.webp"
      alt="OpenRouter Icon"
      className="h-7 w-7"
    />
  ),
  '/docs/dashboards/dashboard-templates/pipecat-dashboard': (
    <img src="/svgs/icons/LLMMonitoring/pipecat-logo.webp" alt="Pipecat Icon" className="h-7 w-7" />
  ),
  '/docs/dashboards/dashboard-templates/postgresql': (
    <SiPostgresql className="h-7 w-7 text-blue-600" />
  ),
  '/docs/dashboards/dashboard-templates/pydantic-ai-dashboard': (
    <SiPydantic className="h-7 w-7 text-pink-600" />
  ),
  '/docs/dashboards/dashboard-templates/qwen-dashboard': (
    <img src="/svgs/icons/LLMMonitoring/qwen-logo.webp" alt="Qwen Icon" className="h-7 w-7" />
  ),
  '/docs/dashboards/dashboard-templates/rabbitmq': (
    <SiRabbitmq className="h-7 w-7 text-orange-600" />
  ),
  'https://github.com/SigNoz/dashboards/tree/main/redis': (
    <SiRedis className="h-7 w-7 text-red-600" />
  ),
  '/docs/dashboards/dashboard-templates/render-dashboard': (
    <Cloud className="h-7 w-7 text-purple-400" />
  ),
  '/docs/dashboards/dashboard-templates/semantic-kernel-dashboard': (
    <img
      src="/svgs/icons/LLMMonitoring/sk-logo.webp"
      alt="Semantic Kernel Icon"
      className="h-7 w-7"
    />
  ),
  '/docs/dashboards/dashboard-templates/signoz-ingestion-analysis': (
    <BarChart3 className="h-7 w-7 text-blue-500" />
  ),
  'https://github.com/SigNoz/dashboards/tree/main/slurm': (
    <Server className="h-7 w-7 text-green-600" />
  ),
  '/docs/dashboards/dashboard-templates/snowflake': (
    <SiSnowflake className="h-7 w-7 text-blue-400" />
  ),
  '/docs/dashboards/dashboard-templates/supabase': (
    <SiSupabase className="h-7 w-7 text-green-500" />
  ),
  '/docs/dashboards/dashboard-templates/temporal-dashboard': (
    <SiTemporal className="h-7 w-7 text-purple-600" />
  ),
  'https://github.com/SigNoz/dashboards/tree/main/temporal.io': (
    <Clock className="h-7 w-7 text-blue-600" />
  ),
  'https://github.com/SigNoz/dashboards/tree/main/vercel-ai-sdk': (
    <SiVercel className="text-black-600 h-7 w-7" />
  ),
}

const allCards = DASHBOARD_TEMPLATES_ITEMS.map((item) => ({
  ...item,
  icon: ICON_MAP[item.href],
}))

export default function DashboardTemplatesListicle() {
  const [searchQuery, setSearchQuery] = useState('')

  const filteredData = allCards.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="space-y-6">
      <div className="relative mx-auto mb-8 max-w-md">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          placeholder="Search dashboard templates..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="block w-full rounded-lg border border-gray-300 bg-white py-2 pl-10 pr-3 leading-5 placeholder-gray-500 focus:border-blue-500 focus:placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:placeholder-gray-400 sm:text-sm"
        />
      </div>

      {filteredData.length > 0 ? (
        <IconCardGrid
          cards={filteredData}
          sectionName="Dashboard Templates Section"
          viewAllText="View all dashboard templates"
          gridCols="grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4"
        />
      ) : (
        <div className="py-8 text-center text-gray-500">
          No dashboard templates found matching "{searchQuery}"
        </div>
      )}
    </div>
  )
}
