// Use a lazy-loaded approach for mixpanel
let mixpanelInstance: any = null
const MIXPANEL_TOKEN = process.env.NEXT_PUBLIC_MIXPANEL_TOKEN

export const initMixpanel = async (): Promise<void> => {
  // Only run on client
  if (typeof window === 'undefined') return

  if (!MIXPANEL_TOKEN) {
    console.warn('Mixpanel token is missing! Check your .env file.')
    return
  }

  try {
    // Dynamically import mixpanel only when needed
    if (!mixpanelInstance) {
      const mixpanel = await import('mixpanel-browser')
      mixpanelInstance = mixpanel.default

      mixpanelInstance.init(MIXPANEL_TOKEN, {
        debug: process.env.NODE_ENV === 'development',
        // Keeping autocapture off as requested
        autocapture: false,
        // Disable cross-subdomain cookies for hosted subdomains
        cross_subdomain_cookie: false,
      })
    }
  } catch (error) {
    // Fail gracefully if mixpanel can't be loaded
    console.warn('Failed to initialize Mixpanel:', error)
  }
}

// Helper function to track events
export const track = (eventName: string, properties: Record<string, any> = {}): void => {
  // Skip if not on client or mixpanel failed to initialize
  if (typeof window === 'undefined' || !mixpanelInstance) return

  try {
    mixpanelInstance.track(eventName, properties)
  } catch (error) {
    console.warn(`Failed to track event "${eventName}":`, error)
  }
}

// Helper function to identify users
export const identify = (id: string): void => {
  // Skip if not on client or mixpanel failed to initialize
  if (typeof window === 'undefined' || !mixpanelInstance) return

  try {
    mixpanelInstance.identify(id)
  } catch (error) {
    console.warn(`Failed to identify user "${id}":`, error)
  }
}

// Helper function to set user properties
export const setPeople = (properties: Record<string, any>): void => {
  // Skip if not on client or mixpanel failed to initialize
  if (typeof window === 'undefined' || !mixpanelInstance) return

  try {
    mixpanelInstance.people.set(properties)
  } catch (error) {
    console.warn('Failed to set people properties:', error)
  }
}

// Helper function to reset Mixpanel user identity
export const reset = (): void => {
  // Skip if not on client or mixpanel failed to initialize
  if (typeof window === 'undefined' || !mixpanelInstance) return

  try {
    mixpanelInstance.reset()
  } catch (error) {
    console.warn('Failed to reset mixpanel identity:', error)
  }
}
