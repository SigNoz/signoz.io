import type { Section } from './types'

export const ALL_SECTIONS: Section[] = ['traces', 'logs', 'metrics']

export const MIN_VALUE = 0
export const MAX_VALUE = 100000
export const MIN_LOG_VALUE = 0.1

export const TRACES_AND_LOGS_PRICES: Record<number, number> = {
  15: 0.3,
  30: 0.4,
  90: 0.6,
  180: 0.8,
  365: 1.4,
}

export const METRICS_PRICES: Record<number, number> = {
  1: 0.1,
  3: 0.12,
  6: 0.15,
  13: 0.18,
}

const sortedRecordKeys = (record: Record<number, number>) =>
  (Object.keys(record) as string[]).map(Number).sort((a, b) => a - b)

/** Retention options are derived from price keys so tiers stay in sync. */
export const RETENTION_PERIOD = {
  TRACES_AND_LOGS: sortedRecordKeys(TRACES_AND_LOGS_PRICES).map((days) => ({ days })),
  METRICS: sortedRecordKeys(METRICS_PRICES).map((months) => ({ months })),
}
