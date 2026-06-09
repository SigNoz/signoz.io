import { SplitSectionPanel } from '@/shared/components/molecules/FeaturePages/SplitSection'

export const CARD_PANEL_1: SplitSectionPanel = {
  title: 'Monitor Exceptions with no-code changes',
  description:
    'Monitor exceptions automatically in Python, Java, Ruby, and Javascript. For other languages, just drop in a few lines of code and start monitoring exceptions.',
  image: '/img/log-management/fast.svg',
  imageAlt: 'Monitor Exceptions with no-code changes',
}

export const CARD_PANEL_2: SplitSectionPanel = {
  title: 'See detailed Stacktraces',
  description:
    'See detailed stacktrace for all exceptions caught from your application. You can also log in custom attributes to add more context to your exceptions. For example, you can add attributes to identify users for which exceptions occurred.',
  image: '/img/log-management/fast.svg',
  imageAlt: 'See detailed Stacktraces',
}

export const CARD_PANEL_3: SplitSectionPanel = {
  title: 'Exceptions to Traces',
  description:
    'We capture exceptions from trace data powered by OpenTelemetry. See your exception in the trace graph to get a richer context for debugging your exceptions. Traces will make it clear where the exception occurred in the request flow\u2014one of the perks of using OpenTelemetry.',
  image: '/img/log-management/fast.svg',
  imageAlt: 'Exceptions to Traces',
  button: {
    text: 'Learn More',
    href: 'https://signoz.io/docs/userguide/exceptions/',
  },
}

export const CARD_PANEL_EMPTY: SplitSectionPanel = {
  title: '',
  description: '',
}

export const FEATURE_PANEL_1: SplitSectionPanel = {
  title: 'Record exception automatically',
  description:
    'Monitor exceptions automatically in Python, Java, Ruby, and Javascript. For other languages, just drop in a few lines of code and start monitoring exceptions.',
  button: {
    text: 'Learn More',
    href: 'https://signoz.io/docs/userguide/exceptions/',
  },
}

export const FEATURE_PANEL_2: SplitSectionPanel = {
  title: 'Detailed Stacktrace with every exception',
  description:
    'See detailed stacktrace for all exceptions caught from your application. You can also log in custom attributes to add more context to your exceptions. For example, you can add attributes to identify users for which exceptions occurred.',
  image: '/img/features/exceptions/stacktrace.webp',
  imageAlt: 'Detailed Stacktrace with every exception',
}

export const FEATURE_PANEL_3: SplitSectionPanel = {
  title: 'Correlate exceptions with traces',
  description:
    'See your exception in the trace graph to get a richer context for debugging your exceptions. Traces will make it clear where the exception occurred in the request flow\u2014one of the perks of using OpenTelemetry.',
  image: '/img/features/exceptions/excceptions.webp',
  imageAlt: 'Correlate exceptions with traces',
}

export const FEATURE_PANEL_4: SplitSectionPanel = {
  title: 'Granular control',
  description:
    'You can configure your code to catch exceptions for custom use cases with manual instrumentation - just drop in a few lines of code.',
  image: '/img/features/exceptions/granular-controls.webp',
  imageAlt: 'Granular control',
}
