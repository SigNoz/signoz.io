import type { StaticImageData } from 'next/image'

import apmStage from '@/public/img/graphics/homepage/bento/apm.svg?url'
import logsStage from '@/public/img/graphics/homepage/bento/logs.svg?url'
import tracingStage from '@/public/img/graphics/homepage/bento/tracing.svg?url'
import alertsStage from '@/public/img/graphics/homepage/bento/alerts.svg?url'
import llmStage from '@/public/img/graphics/homepage/bento/llm-observability.svg?url'
import infraStage from '@/public/img/graphics/homepage/bento/infra-monitoring.svg?url'
import dashboardsStage from '@/public/img/graphics/homepage/bento/dashboards.svg?url'

export interface FeatureBentoAsset {
  src: StaticImageData | string
  alt: string
  fit?: 'cover' | 'contain'
  objectPosition?: string
  /** Overrides fit/objectPosition entirely when set. */
  className?: string
}

// Asset slots for the bento cards; `null` falls back to the animated visual.
export const featureBentoAssets: Record<string, FeatureBentoAsset | null> = {
  'APM.': { src: apmStage, alt: 'SigNoz APM service dashboards with latency and error charts' },
  'Logs.': {
    src: logsStage,
    alt: 'SigNoz log stream with highlighted request logs',
    objectPosition: 'left bottom',
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
    className: 'object-cover object-[center_bottom] md:object-contain md:object-[left_bottom]',
  },
  'Dashboards.': {
    src: dashboardsStage,
    alt: 'SigNoz dashboard panels for latency and pod metrics',
    className: 'object-cover object-[left_bottom] md:object-contain md:object-bottom',
  },
}
