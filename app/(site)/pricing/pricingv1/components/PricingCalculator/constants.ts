import type { Section } from './types'

export { METRICS_PRICES, RETENTION_PERIOD, TRACES_AND_LOGS_PRICES } from '@/constants/pricing'

export const ALL_SECTIONS: Section[] = ['traces', 'logs', 'metrics']

export const MIN_VALUE = 0
export const MAX_VALUE = 100000
export const MIN_LOG_VALUE = 0.1
