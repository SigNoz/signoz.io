import React from 'react'
import IconCardGrid from '../Card/IconCardGrid'
import {
  SiOpenai,
  SiVercel,
  SiLangchain,
  SiClaude
} from 'react-icons/si'

interface IconCardData {
  name: string
  href: string
  icon: React.ReactNode
  clickName: string
}

const LLMMonitoringData: IconCardData[] = [
  {
    name: 'OpenAI',
    href: '/docs/opentelemetry-openai-monitoring',
    icon: <SiOpenai className="h-7 w-7 text-white" />,
    clickName: 'OpenAI Monitoring',
  },
  {
    name: 'Vercel AI SDK',
    href: '/docs/vercel-ai-sdk-monitoring',
    icon: <SiVercel className="h-7 w-7 text-white" />,
    clickName: 'Vercel AI SDK Monitoring',
  },
  {
    name: 'LlamaIndex',
    href: '/docs/llamaindex-monitoring',
    icon: <img src="/svgs/icons/LLMMonitoring/llamaindex-icon.svg" alt="LlamaIndex Icon" className="h-7 w-7" />,
    clickName: 'LlamaIndex Monitoring',
  },
  {
    name: 'LangChain',
    href: '/docs/langchain-monitoring',
    icon: <SiLangchain className="h-7 w-7 text-white" />,
    clickName: 'LangChain Monitoring',
  },
  {
    name: 'Claude Code',
    href: '/docs/claude-code-monitoring',
    icon: <SiClaude className="h-7 w-7 text-orange-500" />,
    clickName: 'Claude Code Monitoring',
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
