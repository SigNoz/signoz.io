import * as Sentry from '@sentry/nextjs'

export async function register() {
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    await import('./error-tracking.server.config')
  }

  if (process.env.NEXT_RUNTIME === 'edge') {
    await import('./error-tracking.edge.config')
  }
}

export const onRequestError = Sentry.captureRequestError
