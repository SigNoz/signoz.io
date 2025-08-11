import React from 'react'
import IconCardGrid from '../Card/IconCardGrid'
import {
  SiOpenai,
  SiVercel,
  SiOllama,
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
    href: '/docs/llm/opentelemetry-openai-monitoring',
    icon: <SiOpenai className="h-7 w-7 text-white" />,
    clickName: 'OpenAI Monitoring',
  },
  {
    name: 'Vercel AI SDK',
    href: '/docs/llm/vercel-ai-sdk-monitoring',
    icon: <SiVercel className="h-7 w-7 text-white" />,
    clickName: 'Vercel AI SDK Monitoring',
  },
  {
    name: 'LlamaIndex',
    href: '/docs/llm/llamaindex-monitoring',
    icon: <SiOllama className="h-7 w-7 text-purple" />,
    clickName: 'LlamaIndex Monitoring',
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
