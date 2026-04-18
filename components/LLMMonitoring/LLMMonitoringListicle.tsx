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
  SiOllama,
  SiHuggingface,
  SiN8N,
} from 'react-icons/si'
import { LLM_MONITORING_ITEMS } from '@/constants/componentItems'

const ICON_MAP: Record<string, React.ReactNode> = {
  '/docs/agno-monitoring': (
    <img src="/svgs/icons/LLMMonitoring/agno-logo.webp" alt="Agno Icon" className="h-7 w-7" />
  ),
  '/docs/amazon-bedrock-monitoring': <SiAmazonwebservices className="h-7 w-7 text-white" />,
  '/docs/anthropic-monitoring': <SiAnthropic className="h-7 w-7 text-orange-500" />,
  '/docs/autogen-observability': (
    <img src="/svgs/icons/LLMMonitoring/autogen-logo.webp" alt="AutoGen Icon" className="h-7 w-7" />
  ),
  '/docs/azure-openai-monitoring': (
    <img
      src="/svgs/icons/LLMMonitoring/azure-logo.webp"
      alt="Azure OpenAI Icon"
      className="h-7 w-7"
    />
  ),
  '/docs/baseten-monitoring': (
    <img src="/svgs/icons/LLMMonitoring/baseten-logo.webp" alt="Baseten Icon" className="h-7 w-7" />
  ),
  '/docs/claude-code-monitoring': <SiClaude className="h-7 w-7 text-orange-500" />,
  '/docs/claude-agent-monitoring': <SiClaude className="h-7 w-7" style={{ color: '#b55c04' }} />,
  '/docs/codex-monitoring': <SiOpenai className="h-7 w-7 text-white" />,
  '/docs/crewai-observability': (
    <img src="/svgs/icons/LLMMonitoring/crewai-logo.svg" alt="Crew AI Icon" className="h-7 w-7" />
  ),
  '/docs/deepseek-monitoring': (
    <img
      src="/svgs/icons/LLMMonitoring/deepseek-icon.svg"
      alt="DeepSeek Icon"
      className="h-7 w-7"
    />
  ),
  '/docs/google-adk-observability': (
    <img
      src="/svgs/icons/LLMMonitoring/google-adk-logo.webp"
      alt="Google ADK Icon"
      className="h-7 w-7"
    />
  ),
  '/docs/google-gemini-monitoring': <SiGooglegemini className="h-7 w-7 text-blue-500" />,
  '/docs/grok-monitoring': (
    <img src="/svgs/icons/LLMMonitoring/grok-logo.webp" alt="Grok Icon" className="h-7 w-7" />
  ),
  '/docs/groq-observability': (
    <img src="/svgs/icons/LLMMonitoring/groq-logo.webp" alt="Groq Icon" className="h-7 w-7" />
  ),
  '/docs/haystack-monitoring': (
    <img
      src="/svgs/icons/LLMMonitoring/haystack-logo.webp"
      alt="Haystack Icon"
      className="h-7 w-7"
    />
  ),
  '/docs/huggingface-observability': (
    <SiHuggingface className="h-7 w-7" style={{ color: '#fcba03' }} />
  ),
  '/docs/inkeep-monitoring': (
    <img src="/svgs/icons/LLMMonitoring/inkeep-logo.webp" alt="Inkeep Icon" className="h-7 w-7" />
  ),
  '/docs/langchain-observability': <SiLangchain className="h-7 w-7 text-white" />,
  '/docs/langtrace': (
    <img
      src="/svgs/icons/LLMMonitoring/langtrace-logo.webp"
      alt="Langtrace Icon"
      className="h-7 w-7"
    />
  ),
  '/docs/litellm-observability': (
    <img src="/img/docs/llm/litellm/litellm-logo.webp" alt="LiteLLM Icon" className="h-7 w-7" />
  ),
  '/docs/livekit-observability': (
    <img src="/img/docs/llm/livekit/livekit-icon.svg" alt="LiveKit Icon" className="h-7 w-7" />
  ),
  '/docs/llamaindex-observability': (
    <img
      src="/svgs/icons/LLMMonitoring/llamaindex-icon.svg"
      alt="LlamaIndex Icon"
      className="h-7 w-7"
    />
  ),
  '/docs/mastra-observability': (
    <img src="/img/docs/llm/mastra/mastra-icon.webp" alt="Mastra Icon" className="h-7 w-7" />
  ),
  '/docs/mistral-observability': (
    <img src="/img/docs/llm/mistral/mistral-logo.webp" alt="Mistral AI Icon" className="h-7 w-7" />
  ),
  '/docs/n8n-monitoring': <SiN8N className="h-7 w-7 text-gray-400" />,
  '/docs/ollama-monitoring': <SiOllama className="h-7 w-7 text-white" />,
  '/docs/openai-monitoring': <SiOpenai className="h-7 w-7 text-green-400" />,
  '/docs/openclaw-monitoring': (
    <img src="/img/docs/llm/openclaw/openclaw-logo.svg" alt="OpenClaw Icon" className="h-7 w-7" />
  ),
  '/docs/opencode-observability': (
    <img
      src="/svgs/icons/LLMMonitoring/opencode-logo.webp"
      alt="OpenCode Icon"
      className="h-7 w-7"
    />
  ),
  '/docs/openlit': (
    <img src="/svgs/icons/LLMMonitoring/openlit-logo.webp" alt="OpenLIT Icon" className="h-7 w-7" />
  ),
  '/docs/openrouter-observability': (
    <img
      src="/svgs/icons/LLMMonitoring/openrouter-logo.webp"
      alt="OpenRouter Icon"
      className="h-7 w-7"
    />
  ),
  '/docs/pipecat-monitoring': (
    <img src="/svgs/icons/LLMMonitoring/pipecat-logo.webp" alt="Pipecat Icon" className="h-7 w-7" />
  ),
  '/docs/pydantic-ai-observability': <SiPydantic className="h-7 w-7 text-pink-600" />,
  '/docs/qwen-observability': (
    <img src="/svgs/icons/LLMMonitoring/qwen-logo.webp" alt="Qwen Icon" className="h-7 w-7" />
  ),
  '/docs/semantic-kernel-observability': (
    <img
      src="/img/docs/llm/semantic-kernel/sk-logo.webp"
      alt="Semantic Kernel Icon"
      className="h-7 w-7"
    />
  ),
  '/docs/temporal-observability': <SiTemporal className="h-7 w-7 text-purple-600" />,
  '/docs/traceloop': (
    <img
      src="/svgs/icons/LLMMonitoring/traceloop-logo.webp"
      alt="Traceloop Icon"
      className="h-7 w-7"
    />
  ),
  '/docs/vercel-ai-sdk-observability': <SiVercel className="h-7 w-7 text-white" />,
}

const LLMMonitoringData = LLM_MONITORING_ITEMS.map((item) => ({
  ...item,
  icon: ICON_MAP[item.href],
}))

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
