import { getConsentProvider } from '../provider'
import { cookieYesAdapter } from './cookieyes'
import { proboAdapter } from './probo'
import type { ConsentAdapter } from './types'

export const getConsentAdapter = (): ConsentAdapter | null => {
  switch (getConsentProvider()) {
    case 'cookieyes':
      return cookieYesAdapter
    case 'probo':
      return proboAdapter
    default:
      return null
  }
}
