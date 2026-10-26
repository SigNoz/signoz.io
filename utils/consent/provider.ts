export type ConsentProviderName = 'cookieyes' | 'probo'

export const getConsentProvider = (): ConsentProviderName | null => {
  const selected = process.env.NEXT_PUBLIC_CONSENT_PROVIDER
  if (selected === 'cookieyes' || selected === 'probo') return selected
  return process.env.NEXT_PUBLIC_COOKIEYES_ID ? 'cookieyes' : null
}

export const getProboSettings = () => ({
  bannerId: process.env.NEXT_PUBLIC_PROBO_BANNER_ID ?? '',
  apiUrl: process.env.NEXT_PUBLIC_PROBO_API_URL ?? '',
})

export const PROBO_PROXY_PATH = '/api/site-preferences/'
