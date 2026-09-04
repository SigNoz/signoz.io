import type { StaticImageData } from 'next/image'

export interface FeatureBentoAsset {
  src: StaticImageData | string
  alt: string
}

// Asset slots for the bento cards; `null` falls back to the animated visual.
export const featureBentoAssets: Record<string, FeatureBentoAsset | null> = {
  'APM.': null,
  'Logs.': null,
  'Tracing.': null,
  'Alerts.': null,
  'LLM Observability.': null,
  'Infra Monitoring.': null,
  'Dashboards.': null,
}
