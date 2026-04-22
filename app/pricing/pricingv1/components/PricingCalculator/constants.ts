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

export const RETENTION_PERIOD = {
  TRACES_AND_LOGS: [
    { days: 15, price: 0.3 },
    { days: 30, price: 0.4 },
    { days: 90, price: 0.6 },
    { days: 180, price: 0.8 },
    { days: 365, price: 1.4 },
  ],
  METRICS: [
    { months: 1, price: 0.1 },
    { months: 3, price: 0.12 },
    { months: 6, price: 0.15 },
    { months: 13, price: 0.18 },
  ],
}
