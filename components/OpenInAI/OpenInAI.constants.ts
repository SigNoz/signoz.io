import { SiClaude, SiGooglegemini, SiOpenai, SiPerplexity } from 'react-icons/si'

import type { AIOption, AIOptionsSection } from './OpenInAI.types'
import {
  buildChatGPTUrl,
  buildClaudeUrl,
  buildExplainPrompt,
  buildGoogleAIModeUrl,
  buildPerplexityUrl,
} from './OpenInAI.utils'

export const COPY_FEEDBACK_DURATION_MS = 2000
export const SIGNOZ_BASE_URL = 'https://signoz.io'
export const COPY_AS_MARKDOWN_LABEL = 'Copy as markdown'

export const AI_OPTIONS: AIOption[] = [
  {
    id: 'chatgpt',
    name: 'Open in ChatGPT',
    Icon: SiOpenai,
    getUrl: buildChatGPTUrl,
  },
  {
    id: 'claude',
    name: 'Open in Claude',
    Icon: SiClaude,
    getUrl: buildClaudeUrl,
  },
  {
    id: 'perplexity',
    name: 'Open in Perplexity',
    Icon: SiPerplexity,
    getUrl: buildPerplexityUrl,
  },
]

export const EXPLAIN_AI_SECTION: AIOptionsSection = {
  title: 'Ask AI to explain',
  description: 'Get a quick, plain-language summary of this page.',
}

export const EXPLAIN_AI_OPTIONS: AIOption[] = [
  {
    id: 'chatgpt',
    name: 'ChatGPT',
    Icon: SiOpenai,
    getUrl: (pageUrl) => buildChatGPTUrl(pageUrl, buildExplainPrompt),
  },
  {
    id: 'claude',
    name: 'Claude',
    Icon: SiClaude,
    getUrl: (pageUrl) => buildClaudeUrl(pageUrl, buildExplainPrompt),
  },
  {
    id: 'ai-mode',
    name: 'AI Mode',
    Icon: SiGooglegemini,
    getUrl: (pageUrl) => buildGoogleAIModeUrl(pageUrl, buildExplainPrompt),
  },
  {
    id: 'perplexity',
    name: 'Perplexity',
    Icon: SiPerplexity,
    getUrl: (pageUrl) => buildPerplexityUrl(pageUrl, buildExplainPrompt),
  },
]
