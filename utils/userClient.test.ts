import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { getOrCreateAnalyticsSessionId } from './userClient'

describe('getOrCreateAnalyticsSessionId', () => {
  const values = new Map<string, string>()
  const storage = {
    clear: () => values.clear(),
    getItem: (key: string) => values.get(key) ?? null,
    removeItem: (key: string) => values.delete(key),
    setItem: (key: string, value: string) => values.set(key, value),
  }

  beforeEach(() => {
    values.clear()
    vi.stubGlobal('localStorage', storage)
  })

  afterEach(() => {
    vi.unstubAllGlobals()
    vi.restoreAllMocks()
  })

  it('keeps an active session when it migrates the old PostHog storage keys', () => {
    localStorage.setItem('app_posthog_session_id', 'existing-session')
    localStorage.setItem('app_posthog_session_last_activity', '1000')
    vi.spyOn(Date, 'now').mockReturnValue(2000)

    expect(getOrCreateAnalyticsSessionId()).toBe('existing-session')
    expect(localStorage.getItem('app_analytics_session_id')).toBe('existing-session')
    expect(localStorage.getItem('app_analytics_session_last_activity')).toBe('2000')
    expect(localStorage.getItem('app_posthog_session_id')).toBeNull()
    expect(localStorage.getItem('app_posthog_session_last_activity')).toBeNull()
  })
})
