import { describe, expect, it } from 'vitest'
import {
  UNDECIDED_CONSENT,
  consentFromCategoryList,
  hasExplicitChoice,
  parseConsentCookie,
} from './parse'

const cookie = (values: Record<string, string>) =>
  Object.entries({ consentid: 'abc', lastRenewedDate: '1755692567000', ...values })
    .map(([key, value]) => `${key}:${value}`)
    .join(',')

describe('parseConsentCookie', () => {
  it('treats a missing cookie as undecided with everything denied', () => {
    expect(parseConsentCookie(undefined)).toEqual({
      status: 'undecided',
      categories: { functional: false, analytics: false, performance: false, advertisement: false },
    })
  })

  it('treats the GDPR pre-choice cookie as undecided', () => {
    const raw = cookie({
      consent: 'no',
      action: '',
      necessary: 'yes',
      functional: 'no',
      analytics: 'no',
      performance: 'no',
      advertisement: 'no',
    })
    expect(parseConsentCookie(raw).status).toBe('undecided')
  })

  it('reads an explicit reject as decided with everything denied', () => {
    const raw = cookie({
      consent: 'no',
      action: 'yes',
      necessary: 'yes',
      functional: 'no',
      analytics: 'no',
      performance: 'no',
      advertisement: 'no',
    })
    expect(parseConsentCookie(raw)).toEqual({
      status: 'decided',
      categories: { functional: false, analytics: false, performance: false, advertisement: false },
    })
  })

  it('reads a partial accept', () => {
    const raw = cookie({
      consent: 'yes',
      action: 'yes',
      necessary: 'yes',
      functional: 'yes',
      analytics: 'yes',
      performance: 'no',
      advertisement: 'no',
    })
    expect(parseConsentCookie(encodeURIComponent(raw)).categories).toEqual({
      functional: true,
      analytics: true,
      performance: false,
      advertisement: false,
    })
  })

  it('ignores categories pre-set without an explicit choice', () => {
    const raw = cookie({
      consent: 'yes',
      action: '',
      necessary: 'yes',
      functional: 'yes',
      analytics: 'yes',
      performance: 'yes',
      advertisement: 'yes',
    })
    expect(parseConsentCookie(raw)).toEqual(UNDECIDED_CONSENT)
  })
})

describe('consentFromCategoryList', () => {
  it('maps the cookieyes_consent_update accepted list', () => {
    expect(consentFromCategoryList(['necessary', 'analytics']).categories).toEqual({
      functional: false,
      analytics: true,
      performance: false,
      advertisement: false,
    })
  })
})

describe('hasExplicitChoice', () => {
  it('is true only after the visitor acted in the banner', () => {
    expect(hasExplicitChoice(cookie({ action: 'yes', analytics: 'no' }))).toBe(true)
    expect(hasExplicitChoice(cookie({ action: '', analytics: 'yes' }))).toBe(false)
    expect(hasExplicitChoice(undefined)).toBe(false)
  })
})
