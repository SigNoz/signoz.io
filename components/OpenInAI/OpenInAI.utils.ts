import { SIGNOZ_BASE_URL } from './OpenInAI.constants'

export function getAbsoluteUrl(url: string): string {
  if (url.startsWith('http')) return url

  if (typeof window !== 'undefined') {
    const origin = window.location.origin
    return `${origin}${url.startsWith('/') ? '' : '/'}${url}`
  }

  return `${SIGNOZ_BASE_URL}${url.startsWith('/') ? '' : '/'}${url}`
}

export function buildAgentPrompt(pageUrl: string): string {
  const trimmed = pageUrl.replace(/\/+$/, '')
  // The homepage has no .md alternate; every other page does.
  const isOriginOnly = /^https?:\/\/[^/]+$/.test(trimmed)
  const readUrl = isOriginOnly ? pageUrl : `${trimmed}.md`
  return `Read ${readUrl} so I can ask questions about it. For the full SigNoz docs index, see ${SIGNOZ_BASE_URL}/llms.txt.`
}

export function buildChatGPTUrl(pageUrl: string): string {
  return `https://chatgpt.com/?hints=search&q=${encodeURIComponent(buildAgentPrompt(pageUrl))}`
}

export function buildClaudeUrl(pageUrl: string): string {
  return `https://claude.ai/new?q=${encodeURIComponent(buildAgentPrompt(pageUrl))}`
}

export function buildPerplexityUrl(pageUrl: string): string {
  return `https://www.perplexity.ai/search/new?q=${encodeURIComponent(buildAgentPrompt(pageUrl))}`
}
