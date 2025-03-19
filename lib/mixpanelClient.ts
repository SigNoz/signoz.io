import mixpanel from 'mixpanel-browser';  
   
const MIXPANEL_TOKEN = process.env.NEXT_PUBLIC_MIXPANEL_TOKEN;  
   
export const initMixpanel = (): void => {  
  if (!MIXPANEL_TOKEN) {  
    console.warn('Mixpanel token is missing! Check your .env file.');  
    return;  
  }  
   
  mixpanel.init(MIXPANEL_TOKEN, { 
    debug: process.env.NODE_ENV === 'development',
    // Keeping autocapture off as requested
    // The property isn't recognized in the type definition, but it works at runtime
    // @ts-ignore
    autocapture: false
  });  
}

// Helper function to track events
export const track = (eventName: string, properties: Record<string, any> = {}): void => {
  if (mixpanel && mixpanel.track) {
    mixpanel.track(eventName, properties);
  }
};

// Helper function to identify users
export const identify = (id: string): void => {
  if (mixpanel && mixpanel.identify) {
    mixpanel.identify(id);
  }
};

// Helper function to set user properties
export const setPeople = (properties: Record<string, any>): void => {
  if (mixpanel && mixpanel.people && mixpanel.people.set) {
    mixpanel.people.set(properties);
  }
}; 