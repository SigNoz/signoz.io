import { SIGNOZ_BASE_URL } from './OpenInAI.constants'

export function getAbsoluteUrl(url: string): string {
  if (url.startsWith('http')) return url

  if (typeof window !== 'undefined') {
    const origin = window.location.origin
    return `${origin}${url.startsWith('/') ? '' : '/'}${url}`
  }

  return `${SIGNOZ_BASE_URL}${url.startsWith('/') ? '' : '/'}${url}`
}

export function buildChatGPTUrl(pageUrl: string): string {
  return `https://chatgpt.com/?hints=search&q=${encodeURIComponent(`Read from ${pageUrl} so I can ask questions about it.`)}`
}

export function buildClaudeUrl(pageUrl: string): string {
  return `https://claude.ai/new?q=${encodeURIComponent(`Read from ${pageUrl} so I can ask questions about it.`)}`
}

export function buildPerplexityUrl(pageUrl: string): string {
  return `https://www.perplexity.ai/search/new?q=${encodeURIComponent(`Read from ${pageUrl} so I can ask questions about it.`)}`
}
