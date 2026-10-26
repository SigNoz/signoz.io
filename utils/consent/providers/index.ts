import { getConsentProvider } from '../provider'
import { cookieYesAdapter } from './cookieyes'
import type { ConsentAdapter } from './types'

export const getConsentAdapter = (): ConsentAdapter | null =>
  getConsentProvider() === 'cookieyes' ? cookieYesAdapter : null
