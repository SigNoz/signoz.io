import { CarouselCard } from '@/shared/components/molecules/FeaturePages/CarouselCards'
import { BUTTON_CLASS_NAME } from '@/shared/components/molecules/FeaturePages/constants'

export const EXTERNAL_APIS_HEADER_BUTTONS = [
  {
    text: 'Start your free trial',
    href: '/teams/',
    variant: 'default' as const,
    className: BUTTON_CLASS_NAME,
    tracking: {
      clickType: 'Primary CTA',
      clickName: 'External APIs Hero Start Trial',
      clickLocation: 'External APIs Hero',
      clickText: 'Start your free trial',
    },
  },
  {
    text: 'Read Documentation',
    href: '/docs/external-api-monitoring/overview/',
    variant: 'secondary' as const,
    className: BUTTON_CLASS_NAME,
    tracking: {
      clickType: 'Secondary CTA',
      clickName: 'External APIs Hero Docs',
      clickLocation: 'External APIs Hero',
      clickText: 'Read Documentation',
    },
  },
]

export const VIEW_ALL_EXTERNAL_API_DOMAINS_SHOWCASE = {
  title: 'View all external API domains',
  description:
    'View all external domains with endpoints in use, last accessed time, operations per second, error percentage, and average latency.',
  image: '/img/external-apis/view-all-external-api-domains.png',
  imageAlt: 'View all external API domains',
}

export const DRILL_INTO_DOMAINS_SHOWCASE = {
  title: 'Drill into domains to see endpoints and their performance',
  description:
    'Click any domain to see all endpoints with call counts, latency, last used time, and error percentage. View performance visualizations including call response status, status code breakdown, rate over time, and latency trends.',
}

export const CORRELATION_CAROUSEL_DATA: Array<CarouselCard> = [
  {
    id: 0,
    title: 'All Endpoints',
    description: 'View every endpoint with call counts, latency, and error rates.',
    image: '/img/external-apis/all-endpoints.png',
    isActive: true,
  },
  {
    id: 1,
    title: 'Endpoint Stats',
    description: 'View performance charts and dependent services.',
    image: '/img/external-apis/endpoint-stats.png',
    isActive: false,
  },
  // {
  //   id: 2,
  //   title: "APM → Logs",
  //   description: "Go from APM metrics to related logs.",
  //   image: "/img/log-management/APM-to-Logs.png",
  //   isActive: false
  // }
]

export const FILTER_BY_ENVIRONMENT_PANEL = {
  title: 'Filter by environment, service or method',
  description:
    'Use the left panel to filter domains by Deployment Environment, Service Name, or RPC Method. When viewing endpoints for a domain, search for specific endpoints or filter by suggested attributes like deployment environment, host, status code, and more.',
  image: '/img/external-apis/filter-by-environment-service-or-method.png',
  imageAlt: 'Filter by environment, service or method',
  className: 'py-16',
}

export const AUTOMATIC_DETECTION_PANEL = {
  title: 'Automatic detection of external calls',
  description:
    "External API calls are automatically identified using OpenTelemetry's span.kind attribute to detect client spans. API details like domain, endpoint, and URL are extracted from semantic convention attributes (server.address, url.full).",
  className: 'py-16',
}

export const AUTOMATIC_DETECTION_IMAGE = {
  src: '/img/external-apis/automatic-detection-of-external-calls.png',
  alt: 'Automatic detection of external calls',
}

export const SEE_SERVICES_CALLING_APIS_SHOWCASE = {
  title: 'See which services call your API and jump to traces',
  description:
    'View call counts, latency, error rates, and request rates for each service calling an external API. Click any service name to open its dashboard in a new tab. Click any chart to view traces. Correlation is automatic via shared client spans.',
  image: '/img/external-apis/see-services-calling-apis.png',
  imageAlt: 'See which services call your API and jump to traces',
}

export const READY_TO_MONITOR_EXTERNAL_APIS_BUTTONS = [
  {
    text: 'Start your free trial',
    href: '/teams/',
    variant: 'default' as const,
    className: BUTTON_CLASS_NAME,
    tracking: {
      clickType: 'Primary CTA',
      clickName: 'External APIs Banner Start Trial',
      clickLocation: 'External APIs Bottom Banner',
      clickText: 'Start your free trial',
    },
  },
  {
    text: 'Read Documentation',
    href: '/docs/external-api-monitoring/overview/',
    variant: 'secondary' as const,
    className: BUTTON_CLASS_NAME,
    tracking: {
      clickType: 'Secondary CTA',
      clickName: 'External APIs Banner Docs',
      clickLocation: 'External APIs Bottom Banner',
      clickText: 'Read Documentation',
    },
  },
]
