import { BUTTON_CLASS_NAME } from '@/shared/components/molecules/FeaturePages/constants'

export const ALERTS_HEADER_BUTTONS = [
  {
    text: 'Start your free trial',
    href: '/teams/',
    variant: 'default' as const,
    className: BUTTON_CLASS_NAME,
  },
  {
    text: 'Read Documentation',
    href: '/docs/alerts/',
    variant: 'secondary' as const,
    className: BUTTON_CLASS_NAME,
  },
]

export const ALERTS_MANAGEMENT_CARDS = [
  {
    title: 'Create alerts from metrics, logs, traces, and exceptions',
    description:
      'Set threshold-based alerts on metrics, logs, traces, and exceptions. For metrics, use anomaly detection to catch unexpected deviations from historical patterns.',
  },
  {
    title: 'Define sophisticated alert conditions',
    description:
      'Combine multiple queries with formulas to calculate error rates, latency percentiles, or custom metrics using Query Builder, ClickHouse SQL, or PromQL.',
  },
]

export const CREATE_ALERTS_SHOWCASE = {
  image: '/img/alerts-management/create-alerts.png',
  imageAlt: 'Create alerts',
}

export const SET_MULTIPLE_SEVERITY_THRESHOLDS_SHOWCASE = {
  title: 'Set multiple severity thresholds in one alert rule',
  description:
    'Define warning, critical, and info thresholds in a single alert rule. Control how conditions are evaluated (trigger at least once, all the time, on average, or in total) and set evaluation windows to reduce false positives.',
  image: '/img/alerts-management/set-multiple-severity-thresholds.png',
  imageAlt: 'Set multiple severity thresholds in one alert rule',
}

export const ROUTE_ALERTS_DYNAMICALLY_SHOWCASE = {
  title: 'Route alerts dynamically with label-based policies',
  description:
    'Define routing policies that match alerts based on service, environment, severity, Kubernetes labels, or custom attributes. Automatically send notifications to the right teams and channels based on alert context. One alert can match multiple policies and notify different channels.',
  image: '/img/alerts-management/route-alerts-dynamically.png',
  imageAlt: 'Route alerts dynamically with label-based policies',
  button: {
    text: 'Read Documentation',
    href: '/docs/alerts-management/routing-policy/',
  },
}

export const ANALYZE_ALERT_PATTERNS_SHOWCASE = {
  title: 'Analyze alert patterns with history and timelines',
  description:
    'Understand why alerts fire repeatedly, identify which services or pods are contributing most, and jump directly to related logs, traces, or metrics for faster root cause analysis.',
  image: '/img/alerts-management/analyze-alert-patterns.png',
  imageAlt: 'Analyze alert patterns',
}

export const FINE_TUNE_ALERT_BEHAVIOR_PANEL = {
  title: 'Fine-tune alert behavior',
  description:
    'Set evaluation frequency and minimum data point requirements. Set alert when data stops flowing and test notifications before saving.',
  image: '/img/alerts-management/fine-tune-alert-behavior.png',
  imageAlt: 'Fine-tune alert behavior',
  imageClassName: 'mb-8',
  className: 'py-16',
}

export const MAINTENANCE_WINDOWS_PANEL = {
  title: 'Schedule maintenance windows',
  description:
    'Schedule one-time or recurring maintenance windows. Silence all alerts or select specific ones during planned downtime.',
  image: '/img/alerts-management/schedule-maintenance-windows.png',
  imageAlt: 'Schedule maintenance windows',
  className: 'py-16',
}

export const MANAGE_ALERTS_AS_CODE_PANEL = {
  title: 'Manage alerts as code with Terraform',
  description:
    'Define alerts as Terraform resources with full version control. Import existing alerts from the UI into your codebase. Deploy consistent alert configurations across environments through standard Terraform workflows.',
  button: {
    text: 'Read Documentation',
    href: '/docs/alerts-management/terraform-provider-signoz/',
  },
}

export const MANAGE_ALERTS_AS_CODE_IMAGE = {
  src: '/img/alerts-management/manage-alerts-as-code.png',
  alt: 'Manage alerts as code',
}

export const STOP_ALERT_FATIGUE_BUTTONS = [
  {
    text: 'Start your free trial',
    href: '/teams/',
    variant: 'default' as const,
    className: BUTTON_CLASS_NAME,
  },
  {
    text: 'Read Documentation',
    href: '/docs/alerts/',
    variant: 'secondary' as const,
    className: BUTTON_CLASS_NAME,
  },
]
