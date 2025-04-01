import mixpanel from 'mixpanel-browser'

// Constants
const MIXPANEL_TOKEN = process.env.NEXT_PUBLIC_MIXPANEL_TOKEN || ''

// Initialize mixpanel only on the client side with safeguards to prevent SSR issues
export const initMixpanel = () => {
  if (typeof window !== 'undefined' && MIXPANEL_TOKEN) {
    mixpanel.init(MIXPANEL_TOKEN, {
      debug: process.env.NODE_ENV === 'development',
      track_pageview: false, // We'll handle page views manually
      persistence: 'localStorage', // Use localStorage instead of cookies
      api_host: 'https://api.mixpanel.com',
      ip: false, // Respect privacy by not collecting IP
      opt_out_tracking_by_default: false, // Default to tracking enabled
      opt_out_persistence_by_default: false, // Default to persistence enabled
      disable_persistence: false, // Enable persistence
      disable_cookie: true, // Disable cookies to avoid issues with GDPR
      secure_cookie: true, // Use secure cookies if used
      ignore_dnt: false, // Respect Do Not Track browser setting
    })
    return true
  }
  return false
}

// Helper to check if we're in a browser environment
export const isBrowser = typeof window !== 'undefined'

// Track a page view
export const trackPageView = (
  pageLocation: string,
  pageType: string = 'Other',
  customProps = {}
) => {
  if (!isBrowser) return

  try {
    mixpanel.track('Website Page View', {
      pageLocation,
      pageType,
      ...customProps,
    })
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error('Error tracking page view:', error)
    }
  }
}

// Track a click event
export const trackClick = (
  clickType: string,
  clickName: string,
  clickLocation: string,
  clickText: string,
  pageLocation: string,
  customProps = {}
) => {
  if (!isBrowser) return

  try {
    mixpanel.track('Website Click', {
      clickType,
      clickName,
      clickLocation,
      clickText,
      pageLocation,
      ...customProps,
    })
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error('Error tracking click:', error)
    }
  }
}

// Track a form submission
export const trackFormSubmission = (
  formType: string,
  formName: string,
  pageLocation: string,
  pageType: string = 'Other',
  formData = {}
) => {
  if (!isBrowser) return

  try {
    mixpanel.track('Website Form Submitted', {
      formType,
      formName,
      pageLocation,
      pageType,
      ...formData,
    })
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error('Error tracking form submission:', error)
    }
  }
}

// Helper to determine content page type
export const getPageType = (pathname: string): string => {
  if (pathname === '/') return 'Home Page'
  if (pathname.startsWith('/docs')) return 'Docs Page'
  if (pathname.startsWith('/distributed-tracing')) return 'Feature Page'
  if (pathname === '/resource-center/blog/') return 'Blog Listing Page'
  if (pathname.startsWith('/blog/')) return 'Blog Page'
  if (pathname === '/resource-center/comparisons/') return 'Comparison Listing Page'
  if (pathname.startsWith('/comparisons/')) return 'Comparison Page'
  if (pathname === '/resource-center/guides/') return 'Guide Listing Page'
  if (pathname.startsWith('/guides/')) return 'Guide Page'
  if (pathname === '/resource-center/opentelemetry/') return 'OTel Listing Page'
  if (pathname.startsWith('/opentelemetry/')) return 'OTel Page'
  if (pathname === '/faqs/') return 'Product FAQ Listing Page'
  if (pathname.startsWith('/faqs/')) return 'Product FAQ Page'
  if (pathname === '/dashboards/') return 'Dashboard Listing Page'
  if (pathname === '/pricing/') return 'Pricing Page'
  if (pathname === '/case-study/') return 'Case Study Listing Page'
  if (pathname.startsWith('/case-study/')) return 'Case Study Page'
  if (pathname === '/login/') return 'Sign In Page'
  if (pathname === '/teams/') return 'Teams Page'
  if (pathname === '/api-reference/') return 'API Reference Page'
  if (pathname === '/support/') return 'Support Page'
  if (pathname === '/product-comparison/') return 'Product Comparison Listing Page'
  if (pathname.startsWith('/product-comparison/')) return 'Product Comparison Page'
  if (pathname === '/about-us/') return 'About Page'
  if (pathname === '/terms-of-service/') return 'Terms Page'
  if (pathname === '/privacy/') return 'Privacy Page'
  if (pathname === '/enterprise/') return 'Enterprise Page'
  if (pathname === '/enterprise-cloud/') return 'Enterprise Cloud Form Page'
  if (pathname === '/enterprise-self-hosted/') return 'Enterprise Self Hosted Form Page'

  return 'Other'
}

// Track a custom event
export const trackCustomEvent = (eventName: string, eventProps = {}) => {
  if (!isBrowser) return

  try {
    mixpanel.track(eventName, eventProps)
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error(`Error tracking ${eventName}:`, error)
    }
  }
}

// Identify a user
export const identifyUser = (userId: string, userProps = {}) => {
  if (!isBrowser) return

  try {
    mixpanel.identify(userId)
    if (Object.keys(userProps).length > 0) {
      mixpanel.people.set(userProps)
    }
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error('Error identifying user:', error)
    }
  }
}

// Reset user identification (logout)
export const resetUser = () => {
  if (!isBrowser) return

  try {
    mixpanel.reset()
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error('Error resetting user:', error)
    }
  }
}

// Send a test event (for debugging)
export const sendTestEvent = () => {
  if (!isBrowser) return

  try {
    mixpanel.track('Test Event', {
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV,
    })
    return true
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error('Error sending test event:', error)
    }
    return false
  }
}

export default {
  initMixpanel,
  trackPageView,
  trackClick,
  trackFormSubmission,
  trackCustomEvent,
  identifyUser,
  resetUser,
  sendTestEvent,
}
