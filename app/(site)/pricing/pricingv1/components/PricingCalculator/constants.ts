import type { Section } from './types'

export const ALL_SECTIONS: Section[] = ['traces', 'logs', 'metrics']

export const MIN_VALUE = 0
export const MAX_VALUE = 100000
export const MIN_LOG_VALUE = 0.1

// Rates live in @/constants/pricing so the pricing page, the overview card, and
// /pricing.md all read the same numbers. Re-exported here for existing imports.
export { TRACES_AND_LOGS_PRICES, METRICS_PRICES, RETENTION_PERIOD } from '@/constants/pricing'
