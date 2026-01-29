import { SIGNOZ_BASE_URL } from './OpenInAI.constants'

export function getAbsoluteUrl(url: string): string {
  if (url.startsWith('http')) return url

  if (typeof window !== 'undefined') {
    const origin = window.location.origin
    return `${origin}${url.startsWith('/') ? '' : '/'}${url}`
  }

  return `${SIGNOZ_BASE_URL}${url.startsWith('/') ? '' : '/'}${url}`
}
