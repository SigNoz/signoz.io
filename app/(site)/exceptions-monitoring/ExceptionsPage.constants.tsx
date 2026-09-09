import Image from 'next/image'
import { ArrowRight, BookOpen } from 'lucide-react'
import fastIconUrl from '@/public/img/log-management/fast.svg?url'
import { BUTTON_CLASS_NAME } from '@/shared/components/molecules/FeaturePages/constants'
import { IconTitleDescriptionCardData } from '@/shared/components/molecules/FeaturePages/IconTitleDescriptionCard'
import { SplitSectionPanel } from '@/shared/components/molecules/FeaturePages/SplitSection/SplitSection.types'
import { ButtonGroupButton } from '@/shared/components/molecules/FeaturePages/ButtonGroup/ButtonGroup.types'

export const EXCEPTIONS_HEADER_BUTTONS: ButtonGroupButton[] = [
  {
    text: 'Get Started - Free',
    href: '/teams/',
    variant: 'default' as const,
    icon: <ArrowRight size={14} />,
    className: BUTTON_CLASS_NAME,
    tracking: {
      clickType: 'Primary CTA',
      clickName: 'Get Started Button',
      clickLocation: 'Exceptions Hero',
      clickText: 'Get Started - Free',
    },
  },
  {
    text: 'Read Documentation',
    href: '/docs/introduction/',
    variant: 'secondary' as const,
    icon: <BookOpen size={14} />,
    className: BUTTON_CLASS_NAME,
    tracking: {
      clickType: 'Secondary CTA',
      clickName: 'Docs Link',
      clickLocation: 'Exceptions Hero',
      clickText: 'Read Documentation',
    },
  },
]

export const EXCEPTIONS_HERO_IMAGE = {
  src: '/img/features/exceptions/exceptions-overview.webp',
  alt: 'SigNoz exception details view with a stack trace and related trace graph',
}

const cardIcon = (src: string, alt: string) => (
  <Image src={src} alt={alt} width={24} height={24} className="theme-invert h-5 w-5" />
)

export const WHY_EXCEPTIONS_CARDS: IconTitleDescriptionCardData[] = [
  {
    icon: cardIcon(fastIconUrl, 'Monitor Exceptions with no-code changes'),
    title: 'Monitor Exceptions with no-code changes',
    description:
      'Monitor exceptions automatically in Python, Java, Ruby, and JavaScript. For other languages, just drop in a few lines of code and start monitoring exceptions.',
  },
  {
    icon: cardIcon(fastIconUrl, 'See detailed stack traces'),
    title: 'See detailed stack traces',
    description:
      'See detailed stack traces for all exceptions caught from your application. You can also log custom attributes to add more context to your exceptions. For example, you can add attributes to identify users for which exceptions occurred.',
  },
  {
    icon: cardIcon(fastIconUrl, 'Exceptions to Traces'),
    title: 'Exceptions to Traces',
    description:
      'We capture exceptions from trace data powered by OpenTelemetry. See your exception in the trace graph to get a richer context for debugging your exceptions. Traces will make it clear where the exception occurred in the request flow—one of the perks of using OpenTelemetry.',
    button: {
      text: 'Learn More',
      href: 'https://signoz.io/docs/userguide/exceptions/',
      tracking: {
        clickType: 'Secondary CTA',
        clickName: 'Docs Link',
        clickLocation: 'Exceptions Why SigNoz Section',
        clickText: 'Learn More',
      },
    },
  },
]

export const EXCEPTIONS_OVERVIEW_PANELS: SplitSectionPanel[] = [
  {
    title: 'Record exception automatically',
    description:
      'Monitor exceptions automatically in Python, Java, Ruby, and JavaScript. For other languages, just drop in a few lines of code and start monitoring exceptions.',
    button: {
      text: 'Learn More',
      href: 'https://signoz.io/docs/userguide/exceptions/',
      tracking: {
        clickType: 'Secondary CTA',
        clickName: 'Docs Link',
        clickLocation: 'Exceptions Overview Section',
        clickText: 'Learn More',
      },
    },
  },
  {
    title: 'Detailed stack trace with every exception',
    description:
      'See a detailed stack trace for every exception caught from your application. You can also log custom attributes to add more context to your exceptions. For example, you can add attributes to identify users for which exceptions occurred.',
    image: '/img/features/exceptions/stacktrace.webp',
    imageAlt: 'Detailed stack trace with every exception',
  },
  {
    title: 'Correlate exceptions with traces',
    description:
      'See your exception in the trace graph to get a richer context for debugging your exceptions. Traces will make it clear where the exception occurred in the request flow—one of the perks of using OpenTelemetry.',
    image: '/img/features/exceptions/excceptions.webp',
    imageAlt: 'Correlate exceptions with traces',
  },
  {
    title: 'Granular control',
    description:
      'You can configure your code to catch exceptions for custom use cases with manual instrumentation - just drop in a few lines of code.',
    image: '/img/features/exceptions/granular-controls.webp',
    imageAlt: 'Granular control',
  },
]

export const EXCEPTIONS_PRICING_CARDS = [
  {
    title: 'Pay only for data you send',
    description:
      'SigNoz Cloud doesn’t have any SKU-based pricing. Get access to all features in the selected plan and only pay for the data you send. Pay only $0.10 per million samples for metrics.',
  },
  {
    title: 'No special pricing for custom metrics',
    description:
      'Vendors like Datadog charge $0.05 per custom metric, which limits a team’s ability to send and analyze custom metrics for monitoring. SigNoz Cloud does not treat custom metrics any differently. The charges remain $0.10 per million samples no matter what type of metrics you send.',
  },
  {
    title: 'Add unlimited team members',
    description:
      'Observability should be available to every developer at your company. After all, anyone can need debugging. That’s why SigNoz Cloud does not charge for user seats, and you can add as many team members as you want.',
  },
  {
    title: 'No Host (container or node) based pricing',
    description:
      'For modern cloud-based applications, it doesn’t make sense to charge based on the number of hosts or containers. With SigNoz Cloud, you don’t need to worry about autoscaling during peak hours. Only pay for the amount of data sent, no matter the number of hosts.',
  },
]

export const CHECK_PRICING_BUTTON: ButtonGroupButton = {
  text: 'Check Pricing',
  href: '/pricing/',
  variant: 'default' as const,
  icon: <ArrowRight size={14} />,
  tracking: {
    clickType: 'Primary CTA',
    clickName: 'Check Pricing Button',
    clickLocation: 'Exceptions Pricing Section',
    clickText: 'Check Pricing',
  },
}

export const GET_STARTED_BUTTONS: ButtonGroupButton[] = [
  {
    text: 'Get Started - Free',
    href: '/teams/',
    variant: 'default' as const,
    icon: <ArrowRight size={14} />,
    className: BUTTON_CLASS_NAME,
    tracking: {
      clickType: 'Primary CTA',
      clickName: 'Get Started Button',
      clickLocation: 'Exceptions Bottom Banner',
      clickText: 'Get Started - Free',
    },
  },
  {
    text: 'Read Documentation',
    href: '/docs/introduction/',
    variant: 'secondary' as const,
    icon: <BookOpen size={14} />,
    className: BUTTON_CLASS_NAME,
    tracking: {
      clickType: 'Secondary CTA',
      clickName: 'Docs Link',
      clickLocation: 'Exceptions Bottom Banner',
      clickText: 'Read Documentation',
    },
  },
]

export const GET_STARTED_IMAGE = {
  src: '/img/landing/landing_thumbnail.webp',
  alt: 'SigNoz dashboard with application performance metrics - Exceptions',
}
