import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { getOrCreateAnalyticsSessionId } from './userClient'

describe('getOrCreateAnalyticsSessionId', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('migrates an active session from the legacy PostHog storage keys', () => {
    localStorage.setItem('app_posthog_session_id', 'existing-session')
    localStorage.setItem('app_posthog_session_last_activity', '1000')
    vi.spyOn(Date, 'now').mockReturnValue(2000)

    expect(getOrCreateAnalyticsSessionId()).toBe('existing-session')
    expect(localStorage.getItem('app_analytics_session_id')).toBe('existing-session')
    expect(localStorage.getItem('app_analytics_session_last_activity')).toBe('2000')
    expect(localStorage.getItem('app_posthog_session_id')).toBeNull()
    expect(localStorage.getItem('app_posthog_session_last_activity')).toBeNull()
  })

  it('reuses an active session and rotates an expired one', () => {
    vi.spyOn(Date, 'now').mockReturnValue(10_000)
    const first = getOrCreateAnalyticsSessionId()

    expect(getOrCreateAnalyticsSessionId()).toBe(first)

    vi.spyOn(Date, 'now').mockReturnValue(10_000 + 31 * 60 * 1000)
    const rotated = getOrCreateAnalyticsSessionId()
    expect(rotated).toBeTruthy()
    expect(rotated).not.toBe(first)
  })
})
