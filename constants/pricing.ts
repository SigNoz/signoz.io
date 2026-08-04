/**
 * Single source of truth for SigNoz Cloud rates.
 *
 * Consumed by the pricing calculator, the pricing overview card, and the
 * agent-facing /pricing.md route. Update rates here only.
 */

/** USD per GB ingested, keyed by retention in days. */
export const TRACES_AND_LOGS_PRICES: Record<number, number> = {
  15: 0.3,
  30: 0.4,
  90: 0.6,
  180: 0.8,
  365: 1.4,
}

/** USD per million samples, keyed by retention in months. */
export const METRICS_PRICES: Record<number, number> = {
  1: 0.1,
  3: 0.12,
  6: 0.15,
  13: 0.18,
}

export const TEAMS_BASE_PRICE_USD = 49
export const TEAMS_LIST_PRICE_USD = 199
export const STARTUP_PRICE_USD = 19
export const ENTERPRISE_FLOOR_USD = 4000
export const DEDICATED_SUPPORT_THRESHOLD_USD = 999

const sortedRecordKeys = (record: Record<number, number>) =>
  (Object.keys(record) as string[]).map(Number).sort((a, b) => a - b)

/** Retention options are derived from price keys so tiers stay in sync. */
export const RETENTION_PERIOD = {
  TRACES_AND_LOGS: sortedRecordKeys(TRACES_AND_LOGS_PRICES).map((days) => ({ days })),
  METRICS: sortedRecordKeys(METRICS_PRICES).map((months) => ({ months })),
}
