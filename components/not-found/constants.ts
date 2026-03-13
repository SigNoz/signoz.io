import type { SuggestedDoc } from './types'

export const NOT_FOUND_PATHNAME_HEADER = 'x-pathname'

export const QUICK_LINK_FALLBACK: SuggestedDoc[] = [
  {
    title: 'Get Started with SigNoz',
    href: '/docs/introduction',
  },
  {
    title: 'Instrument Your Application with OpenTelemetry',
    href: '/docs/instrumentation',
  },
  {
    title: 'Send Logs to SigNoz',
    href: '/docs/logs-management/send-logs-to-signoz',
  },
]

// Candidate pool fetched from Algolia before local reranking.
export const ALGOLIA_CANDIDATE_LIMIT = 8

// Short cache to reduce Algolia calls on repeated 404s.
export const ALGOLIA_SUGGESTIONS_REVALIDATE_SECONDS = 60
