import React from 'react'
import IconCardGrid from '../Card/IconCardGrid'
import {
  SiOpenai,
  SiVercel,
  SiLangchain,
  SiClaude,
  SiGooglegemini,
  SiAnthropic,
  SiAmazonwebservices,
  SiPydantic,
  SiTemporal,
} from 'react-icons/si'

interface IconCardData {
  name: string
  href: string
  icon: React.ReactNode
  clickName: string
}

const LLMMonitoringData: IconCardData[] = [
  {
    name: 'Agno',
    href: '/docs/agno-monitoring',
    icon: (
      <img src="/svgs/icons/LLMMonitoring/agno-logo.webp" alt="Agno Icon" className="h-7 w-7" />
    ),
    clickName: 'Agno Monitoring',
  },
  {
    name: 'Amazon Bedrock',
    href: '/docs/amazon-bedrock-monitoring',
    icon: <SiAmazonwebservices className="h-7 w-7 text-white" />,
    clickName: 'Amazon Bedrock Monitoring',
  },
  {
    name: 'Anthropic API',
    href: '/docs/anthropic-monitoring',
    icon: <SiAnthropic className="h-7 w-7 text-orange-500" />,
    clickName: 'Anthropic API Monitoring',
  },
  {
    name: 'AutoGen',
    href: '/docs/autogen-observability',
    icon: (
      <img
        src="/svgs/icons/LLMMonitoring/autogen-logo.webp"
        alt="AutoGen Icon"
        className="h-7 w-7"
      />
    ),
    clickName: 'AutoGen Monitoring',
  },
  {
    name: 'Azure OpenAI API',
    href: '/docs/azure-openai-monitoring',
    icon: (
      <img
        src="/svgs/icons/LLMMonitoring/azure-logo.webp"
        alt="Azure OpenAI Icon"
        className="h-7 w-7"
      />
    ),
    clickName: 'Azure OpenAI API Monitoring',
  },
  {
    name: 'Claude Code',
    href: '/docs/claude-code-monitoring',
    icon: <SiClaude className="h-7 w-7 text-orange-500" />,
    clickName: 'Claude Code Monitoring',
  },
  {
    name: 'Crew AI',
    href: '/docs/crewai-observability',
    icon: (
      <img src="/svgs/icons/LLMMonitoring/crewai-logo.svg" alt="Crew AI Icon" className="h-7 w-7" />
    ),
    clickName: 'Crew AI Monitoring',
  },
  {
    name: 'DeepSeek API',
    href: '/docs/deepseek-monitoring',
    icon: (
      <img
        src="/svgs/icons/LLMMonitoring/deepseek-icon.svg"
        alt="DeepSeek Icon"
        className="h-7 w-7"
      />
    ),
    clickName: 'DeepSeek Monitoring',
  },
  {
    name: 'Google Gemini',
    href: '/docs/google-gemini-monitoring',
    icon: <SiGooglegemini className="h-7 w-7 text-blue-500" />,
    clickName: 'Google Gemini Monitoring',
  },
  {
    name: 'Grok',
    href: '/docs/grok-monitoring',
    icon: <img src="/svgs/icons/LLMMonitoring/grok-logo.svg" alt="Grok Icon" className="h-7 w-7" />,
    clickName: 'Grok Monitoring',
  },
  {
    name: 'Inkeep',
    href: '/docs/inkeep-monitoring',
    icon: (
      <img src="/svgs/icons/LLMMonitoring/inkeep-logo.webp" alt="Inkeep Icon" className="h-7 w-7" />
    ),
    clickName: 'Inkeep Monitoring',
  },
  {
    name: 'LangChain/LangGraph',
    href: '/docs/langchain-observability',
    icon: <SiLangchain className="h-7 w-7 text-white" />,
    clickName: 'LangChain Monitoring',
  },
  {
    name: 'LiteLLM',
    href: '/docs/litellm-observability',
    icon: (
      <img src="/img/docs/llm/litellm/litellm-logo.webp" alt="LiteLLM Icon" className="h-7 w-7" />
    ),
    clickName: 'LiteLLM Monitoring',
  },
  {
    name: 'LiveKit',
    href: '/docs/livekit-observability',
    icon: (
      <img src="/img/docs/llm/livekit/livekit-icon.svg" alt="LiveKit Icon" className="h-7 w-7" />
    ),
    clickName: 'LiveKit Monitoring',
  },
  {
    name: 'LlamaIndex',
    href: '/docs/llamaindex-observability',
    icon: (
      <img
        src="/svgs/icons/LLMMonitoring/llamaindex-icon.svg"
        alt="LlamaIndex Icon"
        className="h-7 w-7"
      />
    ),
    clickName: 'LlamaIndex Monitoring',
  },
  {
    name: 'Mastra',
    href: '/docs/mastra-observability',
    icon: <img src="/img/docs/llm/mastra/mastra-icon.webp" alt="Mastra Icon" className="h-7 w-7" />,
    clickName: 'Mastra Monitoring',
  },
  {
    name: 'OpenAI',
    href: '/docs/openai-monitoring',
    icon: <SiOpenai className="h-7 w-7 text-green-400" />,
    clickName: 'OpenAI Monitoring',
  },
  {
    name: 'Pipecat',
    href: '/docs/pipecat-monitoring',
    icon: (
      <img
        src="/svgs/icons/LLMMonitoring/pipecat-logo.webp"
        alt="Pipecat Icon"
        className="h-7 w-7"
      />
    ),
    clickName: 'Pipecat Monitoring',
  },
  {
    name: 'Pydantic AI',
    href: '/docs/pydantic-ai-observability',
    icon: <SiPydantic className="h-7 w-7 text-pink-600" />,
    clickName: 'Pydantic AI Monitoring',
  },
  {
    name: 'Semantic Kernel',
    href: '/docs/semantic-kernel-observability',
    icon: (
      <img
        src="/img/docs/llm/semantic-kernel/sk-logo.webp"
        alt="Semantic Kernel Icon"
        className="h-7 w-7"
      />
    ),
    clickName: 'Semantic Kernel Monitoring',
  },
  {
    name: 'Temporal',
    href: '/docs/temporal-observability',
    icon: <SiTemporal className="h-7 w-7 text-purple-600" />,
    clickName: 'Temporal Monitoring',
  },
  {
    name: 'Vercel AI SDK',
    href: '/docs/vercel-ai-sdk-observability',
    icon: <SiVercel className="h-7 w-7 text-white" />,
    clickName: 'Vercel AI SDK Monitoring',
  },
]

export default function LLMMonitoringListicle() {
  return (
    <IconCardGrid
      cards={LLMMonitoringData}
      sectionName="LLM Monitoring Integrations Section"
      viewAllText="View all LLM Monitoring Integrations"
      gridCols="grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4"
    />
  )
}
