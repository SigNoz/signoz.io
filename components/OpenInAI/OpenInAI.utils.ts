import { SIGNOZ_BASE_URL } from './OpenInAI.constants'

export function getAbsoluteUrl(url: string): string {
  if (url.startsWith('http')) return url

  if (typeof window !== 'undefined') {
    const origin = window.location.origin
    return `${origin}${url.startsWith('/') ? '' : '/'}${url}`
  }

  return `${SIGNOZ_BASE_URL}${url.startsWith('/') ? '' : '/'}${url}`
}

type PromptBuilder = (pageUrl: string) => string

function getReadUrl(pageUrl: string): string {
  const trimmed = pageUrl.replace(/\/+$/, '')
  // The homepage has no .md alternate; every other page does.
  const isOriginOnly = /^https?:\/\/[^/]+$/.test(trimmed)
  return isOriginOnly ? pageUrl : `${trimmed}.md`
}

export function buildAgentPrompt(pageUrl: string): string {
  return `Read ${getReadUrl(pageUrl)} so I can ask questions about it. For the full SigNoz docs index, see ${SIGNOZ_BASE_URL}/llms.txt.`
}

export function buildExplainPrompt(pageUrl: string): string {
  return `Read ${getReadUrl(pageUrl)} and give me a quick, plain-language summary of this SigNoz page without the legal jargon. Cover the key points, what they mean for me as a SigNoz user, and any rights or obligations I should know about.`
}

export function buildChatGPTUrl(pageUrl: string, buildPrompt: PromptBuilder = buildAgentPrompt) {
  return `https://chatgpt.com/?hints=search&q=${encodeURIComponent(buildPrompt(pageUrl))}`
}

export function buildClaudeUrl(pageUrl: string, buildPrompt: PromptBuilder = buildAgentPrompt) {
  return `https://claude.ai/new?q=${encodeURIComponent(buildPrompt(pageUrl))}`
}

export function buildGoogleAIModeUrl(
  pageUrl: string,
  buildPrompt: PromptBuilder = buildAgentPrompt
) {
  return `https://www.google.com/search?udm=50&q=${encodeURIComponent(buildPrompt(pageUrl))}`
}

export function buildPerplexityUrl(pageUrl: string, buildPrompt: PromptBuilder = buildAgentPrompt) {
  return `https://www.perplexity.ai/search/new?q=${encodeURIComponent(buildPrompt(pageUrl))}`
}
