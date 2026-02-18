import { SiClaude, SiOpenai, SiPerplexity } from 'react-icons/si'

import type { AIOption } from './OpenInAI.types'
import { buildChatGPTUrl, buildClaudeUrl, buildPerplexityUrl } from './OpenInAI.utils'

export const COPY_FEEDBACK_DURATION_MS = 2000
export const SIGNOZ_BASE_URL = 'https://signoz.io'

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
