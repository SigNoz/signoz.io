import { beforeEach, describe, expect, it, vi } from 'vitest'
import { UNDECIDED_CONSENT, decidedConsent } from './parse'

const commands = () =>
  (window.dataLayer ?? []).map((entry) => Array.from(entry as ArrayLike<unknown>))

describe('syncGoogleConsentMode', () => {
  beforeEach(() => {
    vi.resetModules()
    window.dataLayer = []
  })

  it('queues a denied default before the first update', async () => {
    const { syncGoogleConsentMode } = await import('./googleConsentMode')
    syncGoogleConsentMode(decidedConsent({ analytics: true }))

    const [[, kind, defaults], [, updateKind, update]] = commands() as [
      [string, string, Record<string, string>],
      [string, string, Record<string, string>],
    ]
    expect(kind).toBe('default')
    expect(Object.entries(defaults).filter(([, state]) => state === 'granted')).toEqual([
      ['security_storage', 'granted'],
    ])
    expect(updateKind).toBe('update')
    expect(update).toMatchObject({
      analytics_storage: 'granted',
      ad_storage: 'denied',
      ad_user_data: 'denied',
      ad_personalization: 'denied',
      functionality_storage: 'denied',
    })
  })

  it('maps advertisement to every ads signal', async () => {
    const { googleConsentState } = await import('./googleConsentMode')
    expect(googleConsentState(decidedConsent({ advertisement: true }))).toMatchObject({
      ad_storage: 'granted',
      ad_user_data: 'granted',
      ad_personalization: 'granted',
      analytics_storage: 'denied',
    })
    expect(googleConsentState(UNDECIDED_CONSENT).analytics_storage).toBe('denied')
  })

  it('pushes arguments objects, which is the only form GTM reads as a consent command', async () => {
    const { syncGoogleConsentMode } = await import('./googleConsentMode')
    syncGoogleConsentMode(decidedConsent({}))
    expect(Object.prototype.toString.call(window.dataLayer?.[0])).toBe('[object Arguments]')
  })

  it('sends an update only when the state changes', async () => {
    const { syncGoogleConsentMode } = await import('./googleConsentMode')
    syncGoogleConsentMode(decidedConsent({ analytics: true }))
    syncGoogleConsentMode(decidedConsent({ analytics: true }))
    syncGoogleConsentMode(decidedConsent({ analytics: true, functional: true }))
    expect(commands().map(([, kind]) => kind)).toEqual(['default', 'update', 'update'])
  })
})
