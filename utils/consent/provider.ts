export type ConsentProviderName = 'cookieyes'

export const getConsentProvider = (): ConsentProviderName | null =>
  process.env.NEXT_PUBLIC_COOKIEYES_ID ? 'cookieyes' : null
