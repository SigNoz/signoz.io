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
  | '$pageleave'
  | 'site:element_click'
  | 'site:form_submit'
  | 'experiment_viewed'
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
      // Serverless invocations need each waitUntil task to flush before the function is frozen.
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

const getNumber = (value: unknown) => (typeof value === 'number' ? value : undefined)

const getDate = (value: unknown) => {
  if (typeof value !== 'string') return undefined

  const date = new Date(value)
  return Number.isNaN(date.getTime()) ? undefined : date
}

const getDistinctId = (payload: LogEventPayload) => payload.userId || payload.anonymousId

const getAnonymousDistinctId = (payload: LogEventPayload) => {
  if (!payload.anonymousId || payload.anonymousId === payload.userId) {
    return undefined
  }

  return payload.anonymousId
}

const getCurrentUrl = (attributes: Record<string, unknown>, context: RequestContext) => {
  return (
    getString(attributes.pageUrl) ||
    getString(attributes.$current_url) ||
    getString(attributes.hubspot_page_url) ||
    context.referrer
  )
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

const POSTHOG_UTM_PROPERTIES: Record<string, string> = {
  utm_source: '$utm_source',
  utm_medium: '$utm_medium',
  utm_campaign: '$utm_campaign',
  utm_term: '$utm_term',
  utm_content: '$utm_content',
  gclid: '$gclid',
}

const getHost = (url?: string) => {
  if (!url) return undefined

  try {
    return new URL(url).host
  } catch {
    return undefined
  }
}

const getReferrerProperties = (referrer?: string) => {
  if (!referrer) return {}

  const referrerHost = getHost(referrer)

  return {
    $referrer: referrer,
    ...(referrerHost && { $referring_domain: referrerHost }),
  }
}

const getUtmProperties = (attributes: Record<string, unknown>) => {
  const properties: Record<string, unknown> = {}

  Object.entries(POSTHOG_UTM_PROPERTIES).forEach(([key, postHogKey]) => {
    const value = getString(attributes[key])
    if (value) {
      properties[postHogKey] = value
    }
  })

  return properties
}

const getCommonProperties = (
  payload: LogEventPayload,
  attributes: Record<string, unknown>,
  context: RequestContext
) => {
  const pathname = getPathname(attributes)
  const currentUrl = getCurrentUrl(attributes, context)
  const currentHost = getHost(currentUrl)
  const pageTitle = getString(attributes.pageTitle)
  const pageType = getString(attributes.pageType)
  const pageReferrer = getString(attributes.pageReferrer)
  const rawUserAgent = getRawUserAgent(attributes, context)
  const os = getString(attributes.custom_os)
  const sessionId = getString(attributes.$session_id)

  return {
    source_event_name: payload.eventName,
    source_event_type: payload.eventType,
    source_app: 'signoz.io',
    environment: process.env.VERCEL_ENV || process.env.NODE_ENV || 'development',
    ...(context.ip && { $ip: context.ip }),
    ...(sessionId && { $session_id: sessionId }),
    ...(currentUrl && { $current_url: currentUrl }),
    ...(currentHost && { $host: currentHost }),
    ...(pathname && { $pathname: pathname }),
    ...(pageTitle && { page_title: pageTitle }),
    ...(pageType && { page_type: pageType }),
    ...(getString(attributes.custom_initial_referrer) && {
      initial_referrer: getString(attributes.custom_initial_referrer),
    }),
    ...getReferrerProperties(pageReferrer),
    ...(rawUserAgent && { $raw_user_agent: rawUserAgent }),
    ...(os && { $os: os }),
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

  if (payload.eventName === 'Website Page Leave') {
    return {
      distinctId: getDistinctId(payload),
      event: '$pageleave',
      timestamp: getDate(payload.timestamp),
      disableGeoip: false,
      properties: withAnonymousProfileMode({
        ...common,
        ...(getNumber(attributes.$prev_pageview_duration) !== undefined && {
          $prev_pageview_duration: getNumber(attributes.$prev_pageview_duration),
        }),
        ...(getString(attributes.$prev_pageview_pathname) && {
          $prev_pageview_pathname: getString(attributes.$prev_pageview_pathname),
        }),
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

  if (payload.eventName === 'experiment_viewed') {
    return {
      distinctId: getDistinctId(payload),
      event: 'experiment_viewed',
      timestamp: getDate(payload.timestamp),
      disableGeoip: false,
      properties: withAnonymousProfileMode({
        ...common,
        ...(getString(attributes.experiment_id) && {
          experiment_id: getString(attributes.experiment_id),
        }),
        ...(getString(attributes.variant_id) && { variant_id: getString(attributes.variant_id) }),
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
    ...(context.userAgent && { $raw_user_agent: context.userAgent }),
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

  const email = payload.userId || getString(attributes.email)
  const distinctId = email || getDistinctId(payload)

  if (!distinctId || !email) return

  const client = getPostHogClient()
  if (!client) return

  const anonymousDistinctId = getAnonymousDistinctId(payload)

  const personProperties = {
    ...buildSignupProperties({ ...attributes, email }, context),
    email,
  }

  await client.identifyImmediate({
    distinctId,
    properties: {
      ...personProperties,
      ...(anonymousDistinctId && { $anon_distinct_id: anonymousDistinctId }),
    },
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
  const attributes: Record<string, unknown> = isRecord(payload.attributes) ? payload.attributes : {}

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
