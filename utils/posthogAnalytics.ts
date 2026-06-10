import 'server-only'

import { PostHog } from 'posthog-node'
import type { LogEventPayload } from '@/utils/logEvent'
import { detectBotFromUserAgent } from '@/utils/botPatterns'

type RequestContext = {
  ip?: string
  referrer?: string
  userAgent?: string
}

type PostHogEventName =
  | '$pageview'
  | 'site:element_click'
  | 'site:form_submit'
  | 'user_signed_up'
  | 'user:company_association_create'

type PostHogPayload = {
  distinctId?: string
  event: PostHogEventName
  properties: Record<string, unknown>
  groups?: Record<string, string>
  timestamp?: Date
  disableGeoip?: boolean
}

const POSTHOG_HOST = process.env.POSTHOG_HOST || 'https://us.i.posthog.com'
const POSTHOG_ENABLED = process.env.POSTHOG_ENABLED !== 'false'

let posthogClient: PostHog | null = null

const getProjectToken = () => process.env.POSTHOG_PROJECT_TOKEN

const getPostHogClient = () => {
  const projectToken = getProjectToken()

  if (!POSTHOG_ENABLED || !projectToken) {
    return null
  }

  if (!posthogClient) {
    posthogClient = new PostHog(projectToken, {
      host: POSTHOG_HOST,
      flushAt: 1,
      flushInterval: 0,
      disableGeoip: true,
    })
  }

  return posthogClient
}

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null && !Array.isArray(value)

const getString = (value: unknown) =>
  typeof value === 'string' && value.trim() !== '' ? value.trim() : undefined

const getBoolean = (value: unknown) => (typeof value === 'boolean' ? value : undefined)

const getDate = (value: unknown) => {
  if (typeof value !== 'string') return undefined

  const date = new Date(value)
  return Number.isNaN(date.getTime()) ? undefined : date
}

const getDistinctId = (payload: LogEventPayload) => payload.anonymousId || payload.userId

const getCurrentUrl = (attributes: Record<string, unknown>, context: RequestContext) => {
  return getString(attributes.pageUrl) || getString(attributes.hubspot_page_url) || context.referrer
}

const getRawUserAgent = (attributes: Record<string, unknown>, context: RequestContext) =>
  context.userAgent || getString(attributes.custom_user_agent) || getString(attributes.userAgent)

const getPathname = (attributes: Record<string, unknown>) => {
  return (
    getString(attributes.pageLocation) ||
    getString(attributes.hubspot_page_path) ||
    getString(attributes.$pathname)
  )
}

const getUtmProperties = (attributes: Record<string, unknown>) => {
  const properties: Record<string, unknown> = {}

  ;['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content', 'gclid'].forEach(
    (key) => {
      const value = getString(attributes[key])
      if (value) {
        properties[key] = value
      }
    }
  )

  return properties
}

const getCommonProperties = (
  payload: LogEventPayload,
  attributes: Record<string, unknown>,
  context: RequestContext
) => {
  const pathname = getPathname(attributes)
  const currentUrl = getCurrentUrl(attributes, context)
  const pageTitle = getString(attributes.pageTitle)
  const pageType = getString(attributes.pageType)
  const rawUserAgent = getRawUserAgent(attributes, context)

  return {
    source_event_name: payload.eventName,
    source_event_type: payload.eventType,
    source_app: 'signoz.io',
    environment: process.env.VERCEL_ENV || process.env.NODE_ENV || 'development',
    ...(context.ip && { $ip: context.ip }),
    ...(currentUrl && { $current_url: currentUrl, page_url: currentUrl }),
    ...(pathname && { $pathname: pathname, page_location: pathname }),
    ...(pageTitle && { page_title: pageTitle }),
    ...(pageType && { page_type: pageType }),
    ...(getString(attributes.custom_initial_referrer) && {
      initial_referrer: getString(attributes.custom_initial_referrer),
    }),
    ...(getString(attributes.pageReferrer) && {
      page_referrer: getString(attributes.pageReferrer),
    }),
    ...(context.referrer && { request_referrer: context.referrer }),
    ...(rawUserAgent && { user_agent: rawUserAgent, $raw_user_agent: rawUserAgent }),
    ...(getString(attributes.custom_os) && { os: getString(attributes.custom_os) }),
    ...(getString(attributes.custom_timezone) && {
      timezone: getString(attributes.custom_timezone),
    }),
    ...(getBoolean(attributes.custom_is_bot_client) !== undefined && {
      is_bot_client: getBoolean(attributes.custom_is_bot_client),
    }),
    ...getUtmProperties(attributes),
  }
}

const withAnonymousProfileMode = (properties: Record<string, unknown>) => ({
  ...properties,
  $process_person_profile: false,
})

const hasTrueBoolean = (attributes: Record<string, unknown>, keys: string[]) =>
  keys.some((key) => getBoolean(attributes[key]) === true)

const shouldDropForHumanAnalytics = (
  payload: LogEventPayload,
  attributes: Record<string, unknown>,
  context: RequestContext
) => {
  if (payload.eventName.toLowerCase().includes('bot')) {
    return true
  }

  if (
    hasTrueBoolean(attributes, [
      'custom_is_bot',
      'custom_is_bot_client',
      'is_bot',
      'isBot',
      'custom_webdriver',
      'custom_headless',
    ])
  ) {
    return true
  }

  const rawUserAgent = getRawUserAgent(attributes, context)
  if (!rawUserAgent && payload.eventType === 'track') {
    return true
  }

  return Boolean(rawUserAgent && detectBotFromUserAgent(rawUserAgent).isBot)
}

const buildTrackPayload = (
  payload: LogEventPayload,
  attributes: Record<string, unknown>,
  context: RequestContext
): PostHogPayload | null => {
  const common = getCommonProperties(payload, attributes, context)

  if (payload.eventName === 'Website Page View') {
    return {
      distinctId: getDistinctId(payload),
      event: '$pageview',
      timestamp: getDate(payload.timestamp),
      disableGeoip: false,
      properties: withAnonymousProfileMode({
        ...common,
      }),
    }
  }

  if (payload.eventName === 'Website Click') {
    return {
      distinctId: getDistinctId(payload),
      event: 'site:element_click',
      timestamp: getDate(payload.timestamp),
      disableGeoip: false,
      properties: withAnonymousProfileMode({
        ...common,
        ...(getString(attributes.clickType) && { click_type: getString(attributes.clickType) }),
        ...(getString(attributes.clickName) && { click_name: getString(attributes.clickName) }),
        ...(getString(attributes.clickLocation) && {
          click_location: getString(attributes.clickLocation),
        }),
        ...(getString(attributes.clickText) && { click_text: getString(attributes.clickText) }),
        ...(getString(attributes.trigger) && { trigger: getString(attributes.trigger) }),
        ...(getString(attributes.dataRegion) && { data_region: getString(attributes.dataRegion) }),
        ...(getString(attributes.target) && { target: getString(attributes.target) }),
        ...(getString(attributes.experiment_id) && {
          experiment_id: getString(attributes.experiment_id),
        }),
        ...(getString(attributes.variant_id) && { variant_id: getString(attributes.variant_id) }),
      }),
    }
  }

  if (
    payload.eventName === 'Website Form Submitted' ||
    payload.eventName === 'HubSpot Form Submitted'
  ) {
    const isHubspotForm = payload.eventName === 'HubSpot Form Submitted'
    const formName = getString(attributes.formName) || getString(attributes.hubspot_form_name)
    const formLocation = getString(attributes.formLocation) || getString(attributes.clickLocation)
    const formId = getString(attributes.formId) || getString(attributes.hubspot_form_id)

    return {
      distinctId: getDistinctId(payload),
      event: 'site:form_submit',
      timestamp: getDate(payload.timestamp),
      disableGeoip: false,
      properties: withAnonymousProfileMode({
        ...common,
        form_provider: isHubspotForm ? 'hubspot' : 'signoz',
        ...(formName && { form_name: formName }),
        ...(formLocation && { form_location: formLocation }),
        ...(formId && { form_id: formId }),
        ...(getString(attributes.hubspot_portal_id) && {
          hubspot_portal_id: getString(attributes.hubspot_portal_id),
        }),
      }),
    }
  }

  return null
}

const buildSignupProperties = (attributes: Record<string, unknown>, context: RequestContext) => {
  return {
    email: getString(attributes.email),
    data_region: getString(attributes.dataRegion),
    signup_method: getString(attributes.method),
    source_app: 'signoz.io',
    environment: process.env.VERCEL_ENV || process.env.NODE_ENV || 'development',
    ...(context.ip && { $ip: context.ip }),
    ...(context.userAgent && { user_agent: context.userAgent, $raw_user_agent: context.userAgent }),
  }
}

const captureEvent = async (eventPayload: PostHogPayload) => {
  const client = getPostHogClient()
  if (!client) return

  await client.captureImmediate({
    distinctId: eventPayload.distinctId,
    event: eventPayload.event,
    properties: eventPayload.properties,
    groups: eventPayload.groups,
    timestamp: eventPayload.timestamp,
    disableGeoip: eventPayload.disableGeoip ?? true,
  })
}

const identifySignup = async (
  payload: LogEventPayload,
  attributes: Record<string, unknown>,
  context: RequestContext
) => {
  if (payload.eventType !== 'identify' || payload.eventName !== 'User Signed Up') return

  const distinctId = getDistinctId(payload)
  const email = payload.userId || getString(attributes.email)

  if (!distinctId || !email) return

  const client = getPostHogClient()
  if (!client) return

  const personProperties = {
    ...buildSignupProperties({ ...attributes, email }, context),
    email,
  }

  await client.identifyImmediate({
    distinctId,
    properties: personProperties,
    disableGeoip: true,
  })

  await captureEvent({
    distinctId,
    event: 'user_signed_up',
    timestamp: getDate(payload.timestamp),
    properties: {
      ...personProperties,
      source_event_name: payload.eventName,
      source_event_type: payload.eventType,
    },
  })

  await captureEvent({
    distinctId,
    event: 'site:form_submit',
    timestamp: getDate(payload.timestamp),
    disableGeoip: false,
    properties: {
      ...getCommonProperties(payload, attributes, context),
      form_provider: 'signoz',
      form_name: 'Teams Signup Form',
      form_location: 'Teams Page',
      data_region: getString(attributes.dataRegion),
      signup_method: getString(attributes.method),
    },
  })
}

const identifyCompanyGroup = async (
  payload: LogEventPayload,
  attributes: Record<string, unknown>,
  context: RequestContext
) => {
  if (payload.eventType !== 'group' || payload.eventName !== 'User Associated with Company') return

  const groupId = payload.groupId || getString(attributes.domain)
  if (!groupId) return

  const client = getPostHogClient()
  if (!client) return

  const distinctId = getDistinctId(payload)

  client.groupIdentify({
    groupType: 'company',
    groupKey: groupId,
    distinctId,
    disableGeoip: true,
    properties: {
      name: groupId,
      domain: groupId,
      source_app: 'signoz.io',
      environment: process.env.VERCEL_ENV || process.env.NODE_ENV || 'development',
      ...(context.ip && { $ip: context.ip }),
      ...(context.userAgent && {
        user_agent: context.userAgent,
        $raw_user_agent: context.userAgent,
      }),
    },
  })

  await client.flush()

  await captureEvent({
    distinctId,
    event: 'user:company_association_create',
    properties: {
      source_event_name: payload.eventName,
      source_event_type: payload.eventType,
      group_type: 'company',
      group_key: groupId,
      domain: groupId,
      environment: process.env.VERCEL_ENV || process.env.NODE_ENV || 'development',
      ...(context.ip && { $ip: context.ip }),
      ...(context.userAgent && {
        user_agent: context.userAgent,
        $raw_user_agent: context.userAgent,
      }),
    },
    groups: {
      company: groupId,
    },
    timestamp: getDate(payload.timestamp),
  })
}

export const capturePostHogAnalyticsEvent = async (
  payload: LogEventPayload,
  context: RequestContext = {}
) => {
  if (!isRecord(payload.attributes)) {
    payload.attributes = {}
  }

  const attributes = payload.attributes

  if (shouldDropForHumanAnalytics(payload, attributes, context)) {
    return
  }

  if (payload.eventType === 'track') {
    const eventPayload = buildTrackPayload(payload, attributes, context)
    if (eventPayload) {
      await captureEvent(eventPayload)
    }
    return
  }

  await identifySignup(payload, attributes, context)
  await identifyCompanyGroup(payload, attributes, context)
}
