// utils/botPatterns.ts
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

  // Mixpanel-aligned additions (from mixpanel-js BLOCKED_UA_STRS)
  /petalbot/i, // Huawei search
  /screaming frog/i, // SEO tool
  /bingpreview/i, // Bing Preview
  /storebot-google/i, // Google Store crawler
  /adsbot-google/i, // Google Ads bot
  /apis-google/i, // Google APIs
  /duplexweb-google/i, // Google Duplex
  /feedfetcher-google/i, // Google Feed Fetcher
  /google favicon/i, // Google Favicon fetcher
  /google web preview/i, // Google Web Preview
  /google-read-aloud/i, // Google Read Aloud
  /googleweblight/i, // Google Web Light
  /mediapartners-google/i, // Google AdSense
  /pinterest/i, // Pinterest crawler

  // Monitoring & Uptime Bots
  /uptimerobot/i,
  /pingdom/i,
  /site24x7/i,
  /newrelic/i,
  /datadog/i,
  /statuscake/i,

  // SEO & Marketing Tools
  /ahrefsbot/i, // Ahrefs crawler
  /ahrefssiteaudit/i, // Ahrefs site audit
  /semrush/i,
  /dotbot/i, // Moz's crawler
  /rogerbot/i, // Moz's crawler
  /majestic/i,
  /mj12bot/i, // Majestic-12 bot
  /ia_archiver/i, // Internet Archive

  // Social & Preview Bots
  /whatsapp/i,
  /telegrambot/i,
  /discordbot/i,
  /slackbot/i,
  /embedly/i,

  // Common HTTP Libraries
  /go-http-client/i,
  /java\//i,
  /okhttp/i,
  /aiohttp/i,
  /httpx/i,
  /libwww-perl/i,
  /python-urllib/i,
  /pycurl/i,
  /lwp-trivial/i,

  // From useragentstring.com crawler list
  /exabot/i, // Exalead crawler
  /sogou/i, // Sogou spider
  /sosospider/i, // Soso spider
  /seznambot/i, // Seznam.cz
  /mojeekbot/i, // Mojeek search
  /yeti/i, // Naver's crawler
  /nutch/i, // Apache Nutch
  /teoma/i, // Ask.com crawler
  /gigabot/i,
  /speedy spider/i, // Entireweb
  /turnitinbot/i, // Turnitin plagiarism
  /voilabot/i, // Orange search
  /yodaobot/i, // Yodao search
  /youdaobot/i, // Youdao search
  /omgilibot/i, // Omgili
  /masscan/i, // masscan-ng
  /msnbot/i, // MSN bot
  /ichiro/i, // Goo crawler
  /larbin/i, // Larbin crawler
  /yacybot/i, // YaCy search
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
