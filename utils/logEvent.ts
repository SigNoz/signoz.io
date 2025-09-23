// utils/logEvent.ts

export type EventType = 'identify' | 'group' | 'track'

export type LogEventPayload = {
  eventName: string
  attributes?: Record<string, any>
  eventType: EventType
  userId?: string
  groupId?: string
  anonymousId?: string
  timestamp?: string
}

type LogEventOptions = {
  queryParams?: Record<string, string>
}

const buildQueryString = (queryParams?: Record<string, string>) => {
  if (!queryParams) return ''

  const sanitized = Object.entries(queryParams).reduce<Record<string, string>>((acc, [key, value]) => {
    if (typeof value === 'string' && value.trim() !== '') {
      acc[key] = value
    }
    return acc
  }, {})

  const searchParams = new URLSearchParams(sanitized)
  const serialized = searchParams.toString()
  return serialized ? `?${serialized}` : ''
}

export const logEvent = async (payload: LogEventPayload, options?: LogEventOptions) => {
  const endpoint = process.env.NEXT_PUBLIC_TUNNEL_ENDPOINT

  if (!endpoint) {
    console.warn('No tunnel endpoint configured for client-side logging')
    return
  }

  try {
    const queryString = buildQueryString(options?.queryParams)

    await fetch(`${endpoint}/log${queryString}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...payload,
        timestamp: payload.timestamp || new Date().toISOString(),
      }),
    })
  } catch (err) {
    console.error('Error logging event:', err)
  }
}

// Server-side compatible logging function
export const logEventServerSide = async (
  payload: LogEventPayload,
  tunnelEndpoint?: string,
  options?: LogEventOptions
) => {
  try {
    const endpoint = tunnelEndpoint || process.env.NEXT_PUBLIC_TUNNEL_ENDPOINT
    if (!endpoint) {
      console.warn('No tunnel endpoint available for server-side logging')
      return
    }

    const queryString = buildQueryString(options?.queryParams)

    await fetch(`${endpoint}/log${queryString}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...payload,
        timestamp: payload.timestamp || new Date().toISOString(),
      }),
    })
  } catch (err) {
    console.error('Error logging server-side event:', err)
  }
}

// Bot detection patterns - shared between client and server
export const BOT_USER_AGENT_PATTERNS = [
  // AI/LLM Bots (General patterns)
  /gpt/i,
  /openai/i,
  /claude/i,
  /anthropic/i,
  /bard/i,
  /chatgpt/i,
  /llama/i,
  /palm/i,
  /gemini/i,
  /grok/i,

  // AI Data Scrapers (Specific bots from Dark Visitors)
  /gptbot/i, // OpenAI's official crawler
  /claudebot/i, // Anthropic's official crawler
  /ccbot/i, // Common Crawl (trains many LLMs)
  /google-extended/i, // Google's AI training crawler
  /applebot-extended/i, // Apple's AI training crawler
  /bytespider/i, // ByteDance/TikTok AI crawler
  /ai2bot/i, // AI2 research institute
  /diffbot/i, // Diffbot AI crawler
  /meta-externalagent/i, // Meta's AI training crawler
  /facebookbot/i, // Facebook's AI crawler
  /pangubot/i, // Huawei's AI crawler
  /timpibot/i, // Timpi's AI crawler
  /omgili/i, // Webz.io AI training data
  /webzio-extended/i, // Webz.io extended crawler
  /cohere-training-data-crawler/i, // Cohere's training crawler

  // AI Assistants (User-triggered)
  /chatgpt-user/i, // ChatGPT user-triggered requests
  /perplexity-user/i, // Perplexity user requests
  /duckassistbot/i, // DuckDuckGo AI assistant
  /meta-externalfetcher/i, // Meta AI link fetching

  // AI Search Crawlers
  /amazonbot/i, // Amazon/Alexa search
  /applebot/i, // Apple/Siri search
  /oai-searchbot/i, // OpenAI SearchGPT
  /perplexitybot/i, // Perplexity search crawler
  /youbot/i, // You.com AI search

  // Undocumented AI Agents
  /anthropic-ai/i, // Unofficial Anthropic agent
  /claude-web/i, // Undocumented Claude web agent
  /cohere-ai/i, // Unofficial Cohere agent

  // Search Engine Crawlers (Traditional)
  /googlebot/i,
  /bingbot/i,
  /slurp/i,
  /duckduckbot/i,
  /baiduspider/i,
  /yandexbot/i,
  /facebookexternalhit/i,
  /twitterbot/i,
  /linkedinbot/i,

  // Other Common Bots
  /crawler/i,
  /spider/i,
  /scraper/i,
  /bot/i,
  /curl/i,
  /wget/i,
  /python-requests/i,
  /axios/i,
  /node-fetch/i,
  /postman/i,
  /httpie/i,
  /insomnia/i,
]

// Utility to detect bots from user agent
export const detectBotFromUserAgent = (
  userAgent: string
): { isBot: boolean; botType: string | null } => {
  if (!userAgent) {
    return { isBot: false, botType: null }
  }

  for (const pattern of BOT_USER_AGENT_PATTERNS) {
    if (pattern.test(userAgent)) {
      const match = userAgent.match(pattern)
      return {
        isBot: true,
        botType: match ? match[0].toLowerCase() : 'unknown',
      }
    }
  }

  return { isBot: false, botType: null }
}

// Client-side bot detection (additional checks)
export const detectBotClientSide = (): {
  isBot: boolean
  botType: string | null
  reason?: string
} => {
  if (typeof window === 'undefined') {
    return { isBot: false, botType: null }
  }

  const userAgent = window.navigator.userAgent

  // First check user agent patterns
  const userAgentCheck = detectBotFromUserAgent(userAgent)
  if (userAgentCheck.isBot) {
    return { ...userAgentCheck, reason: 'user_agent_pattern' }
  }

  // Additional client-side bot detection heuristics
  try {
    // Check for headless browser indicators
    if (window.navigator.webdriver) {
      return { isBot: true, botType: 'webdriver', reason: 'webdriver_detected' }
    }

    // Check for missing features that real browsers have
    if (!window.navigator.languages || window.navigator.languages.length === 0) {
      return { isBot: true, botType: 'suspicious_browser', reason: 'missing_languages' }
    }

    // Check for PhantomJS
    if (window.navigator.platform === 'PhantomJS' || (window as any).callPhantom) {
      return { isBot: true, botType: 'phantomjs', reason: 'phantom_detected' }
    }

    // Check for unusual screen dimensions (common in headless browsers)
    if (window.screen && (window.screen.width === 0 || window.screen.height === 0)) {
      return { isBot: true, botType: 'headless_browser', reason: 'zero_screen_dimensions' }
    }
  } catch (error) {
    // If we can't access these properties, might be a bot
    return { isBot: true, botType: 'restricted_access', reason: 'property_access_error' }
  }

  return { isBot: false, botType: null }
}
