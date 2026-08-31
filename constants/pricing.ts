/**
 * Canonical SigNoz Cloud pricing data.
 *
 * The pricing page renders these numbers in its calculator, and /pricing.md
 * renders them as markdown for agents, so both surfaces stay in sync. Update
 * the rates here when pricing changes.
 *
 * Keep this module dependency-free so tests can load it via loadTsModule.
 */

/** Logs and traces: price per GB ingested, keyed by retention in days. */
export const TRACES_AND_LOGS_PRICES: Record<number, number> = {
  15: 0.3,
  30: 0.4,
  90: 0.6,
  180: 0.8,
  365: 1.4,
}

/** Metrics: price per million samples ingested, keyed by retention in months. */
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

/** Minimum retention per signal; retention cannot be set below these. */
export const MIN_TRACES_AND_LOGS_RETENTION_DAYS = sortedRecordKeys(TRACES_AND_LOGS_PRICES)[0]
export const MIN_METRICS_RETENTION_MONTHS = sortedRecordKeys(METRICS_PRICES)[0]

/** Base rates at minimum retention, quoted as the "starts at" prices. */
export const BASE_TRACES_AND_LOGS_PRICE_PER_GB =
  TRACES_AND_LOGS_PRICES[MIN_TRACES_AND_LOGS_RETENTION_DAYS]
export const BASE_METRICS_PRICE_PER_MILLION_SAMPLES = METRICS_PRICES[MIN_METRICS_RETENTION_MONTHS]

/** Plan-level monthly amounts, in USD. */
export const PLAN_PRICING = {
  /** Teams: monthly minimum, which is also the included usage allowance. */
  TEAMS_MONTHLY_MINIMUM: 49,
  /** Teams list price shown struck through on the pricing page. */
  TEAMS_LIST_PRICE: 199,
  /** Enterprise: monthly minimum, which includes ingestion usage up to that amount. */
  ENTERPRISE_MONTHLY_MINIMUM: 4000,
  /** Startup program: monthly minimum for the first 12 months. */
  STARTUP_MONTHLY_MINIMUM: 19,
  /** Spend threshold above which Teams unlocks a dedicated Slack channel and migration help. */
  TEAMS_DEDICATED_SUPPORT_SPEND_THRESHOLD: 999,
}
