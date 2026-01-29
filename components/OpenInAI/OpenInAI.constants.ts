import { SiClaude, SiOpenai, SiPerplexity } from 'react-icons/si'

import type { AIOption } from './OpenInAI.types'

export const COPY_FEEDBACK_DURATION_MS = 2000
export const SIGNOZ_BASE_URL = 'https://signoz.io'

// URL builder functions - pure functions for better testability
const buildChatGPTUrl = (pageUrl: string): string =>
  `https://chatgpt.com/?hints=search&q=${encodeURIComponent(`Read from ${pageUrl} so I can ask questions about it.`)}`

const buildClaudeUrl = (pageUrl: string): string =>
  `https://claude.ai/new?q=${encodeURIComponent(`Read from ${pageUrl} so I can ask questions about it.`)}`

const buildPerplexityUrl = (pageUrl: string): string =>
  `https://www.perplexity.ai/search/new?q=${encodeURIComponent(`Read from ${pageUrl} so I can ask questions about it.`)}`

export const AI_OPTIONS: AIOption[] = [
  {
    id: 'chatgpt',
    name: 'Open in ChatGPT',
    description: 'Ask questions about this page',
    Icon: SiOpenai,
    getUrl: buildChatGPTUrl,
  },
  {
    id: 'claude',
    name: 'Open in Claude',
    description: 'Ask questions about this page',
    Icon: SiClaude,
    getUrl: buildClaudeUrl,
  },
  {
    id: 'perplexity',
    name: 'Open in Perplexity',
    description: 'Ask questions about this page',
    Icon: SiPerplexity,
    getUrl: buildPerplexityUrl,
  },
]
