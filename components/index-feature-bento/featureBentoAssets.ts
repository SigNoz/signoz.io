import type { StaticImageData } from 'next/image'

import apmStage from '@/public/img/graphics/homepage/bento/apm.webp'
import logsStage from '@/public/img/graphics/homepage/bento/logs.webp'
import tracingStage from '@/public/img/graphics/homepage/bento/tracing.webp'
import alertsStage from '@/public/img/graphics/homepage/bento/alerts.webp'
import llmStage from '@/public/img/graphics/homepage/bento/llm-observability.webp'
import infraStage from '@/public/img/graphics/homepage/bento/infra-monitoring.webp'
import dashboardsStage from '@/public/img/graphics/homepage/bento/dashboards.webp'

export interface FeatureBentoAsset {
  src: StaticImageData | string
  alt: string
  fit?: 'cover' | 'contain'
  objectPosition?: string
}

// Asset slots for the bento cards; `null` falls back to the animated visual.
export const featureBentoAssets: Record<string, FeatureBentoAsset | null> = {
  'APM.': { src: apmStage, alt: 'SigNoz APM service dashboards with latency and error charts' },
  'Logs.': {
    src: logsStage,
    alt: 'SigNoz log stream with highlighted request logs',
    objectPosition: 'left top',
  },
  'Tracing.': { src: tracingStage, alt: 'SigNoz trace tree with span durations' },
  'Alerts.': {
    src: alertsStage,
    alt: 'SigNoz firing alert with related logs shortcut',
    fit: 'contain',
  },
  'LLM Observability.': { src: llmStage, alt: 'Supported LLM provider logos', fit: 'contain' },
  'Infra Monitoring.': {
    src: infraStage,
    alt: 'CPU and memory usage charts',
    fit: 'contain',
    objectPosition: 'left top',
  },
  'Dashboards.': {
    src: dashboardsStage,
    alt: 'SigNoz dashboard panels for latency and pod metrics',
    fit: 'contain',
  },
}
