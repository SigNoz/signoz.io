// utils/browserSignals.ts
// Browser signals for bot detection - client-side only

const getUserAgent = (): string => {
  if (typeof window === 'undefined') return ''
  return window.navigator.userAgent
}

export const getWebdriver = (): boolean => {
  return typeof window !== 'undefined' && !!window.navigator.webdriver
}

export const isHeadless = (): boolean => {
  return /HeadlessChrome/.test(getUserAgent())
}

export const getOS = (): string => {
  if (typeof window === 'undefined') return 'unknown'

  const userAgent = getUserAgent().toLowerCase()

  if (userAgent.indexOf('win') !== -1) return 'Windows'
  if (userAgent.indexOf('ipad') !== -1) return 'iPad'
  if (userAgent.indexOf('iphone') !== -1 || userAgent.indexOf('like mac') !== -1) return 'iOS'
  if (userAgent.indexOf('mac') !== -1) return 'MacOS'
  if (userAgent.indexOf('android') !== -1) return 'Android'
  if (userAgent.indexOf('linux') !== -1) return 'Linux'
  return 'unknown'
}

export const getTimezone = (): string => {
  if (typeof window === 'undefined') return 'unknown'

  try {
    return Intl.DateTimeFormat().resolvedOptions().timeZone
  } catch (error) {
    return 'unknown'
  }
}

export const getUserAgentString = (): string => {
  return getUserAgent()
}

// Browser environment signals for bot detection
export const getBrowserEnvironmentSignals = () => {
  if (typeof window === 'undefined') return {}

  return {
    custom_browser_screen_width: window.screen?.width || 0,
    custom_browser_screen_height: window.screen?.height || 0,
    custom_browser_language_count: window.navigator?.languages?.length || 0,
    custom_browser_has_touch: 'ontouchstart' in window || navigator.maxTouchPoints > 0,
    custom_browser_history_length: window.history?.length || 0,
    custom_browser_visibility_state: document.visibilityState,
  }
}

// JS capability signals for bot detection
export const getJSCapabilitySignals = () => {
  if (typeof window === 'undefined') return {}

  let hasCookies = false
  let hasLocalStorage = false
  let hasSessionStorage = false

  try {
    hasCookies = navigator.cookieEnabled
  } catch (e) {
    /* ignore */
  }
  try {
    hasLocalStorage = typeof localStorage !== 'undefined'
  } catch (e) {
    /* ignore */
  }
  try {
    hasSessionStorage = typeof sessionStorage !== 'undefined'
  } catch (e) {
    /* ignore */
  }

  return {
    custom_browser_has_cookies: hasCookies,
    custom_browser_has_local_storage: hasLocalStorage,
    custom_browser_has_session_storage: hasSessionStorage,
  }
}

// Analytics health check signals
// Returns 3 possible states:
// - "pending": Page still loading, we don't know yet if GTM will load
// - "loaded": GTM loaded successfully
// - "never_loaded": Page finished loading but GTM was blocked or failed
export const getAnalyticsHealthSignals = () => {
  if (typeof window === 'undefined') return {}

  const pageFullyLoaded = document.readyState === 'complete'
  const gtmExists = typeof (window as any).google_tag_manager !== 'undefined'

  let gtmStatus: 'pending' | 'loaded' | 'never_loaded'
  if (gtmExists) {
    gtmStatus = 'loaded'
  } else if (pageFullyLoaded) {
    gtmStatus = 'never_loaded'
  } else {
    gtmStatus = 'pending'
  }

  return {
    custom_browser_gtm_status: gtmStatus,
  }
}

// Combined function to get all browser signals
export const getAllBrowserSignals = () => {
  return {
    custom_os: getOS(),
    custom_timezone: getTimezone(),
    custom_user_agent: getUserAgentString(),
    custom_webdriver: getWebdriver(),
    custom_headless: isHeadless(),
    ...getBrowserEnvironmentSignals(),
    ...getJSCapabilitySignals(),
    ...getAnalyticsHealthSignals(),
  }
}
