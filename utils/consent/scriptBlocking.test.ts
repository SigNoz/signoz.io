import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

const consent = vi.hoisted(() => ({
  granted: {} as Record<string, boolean>,
  notify: () => {},
}))

vi.mock('./client', () => ({
  hasConsent: (category: string) => consent.granted[category] === true,
  onConsentChange: (listener: () => void) => {
    consent.notify = listener
    return () => {}
  },
}))

const GTAG = 'https://www.googletagmanager.com/gtag/js?id=G-TEST'
const CLARITY = 'https://www.clarity.ms/tag/test'
const REO = 'https://static.reo.dev/test/reo.js'

const grant = (category: string) => {
  consent.granted[category] = true
  consent.notify()
}

const originalCreateElement = document.createElement

describe('scriptCategory', () => {
  it('maps the scripts GTM’s tags add to their category', async () => {
    const { scriptCategory } = await import('./scriptBlocking')
    expect(scriptCategory(GTAG)).toBe('analytics')
    expect(scriptCategory('https://scripts.clarity.ms/0.8.77/clarity.js')).toBe('analytics')
    expect(scriptCategory('https://snap.licdn.com/li.lms-analytics/insight.min.js')).toBe(
      'advertisement'
    )
    expect(scriptCategory(REO)).toBe('advertisement')
  })

  it('leaves GTM itself, our own scripts and look-alike URLs alone', async () => {
    const { scriptCategory } = await import('./scriptBlocking')
    expect(scriptCategory('https://www.googletagmanager.com/gtm.js?id=GTM-TEST')).toBeNull()
    expect(scriptCategory('/_next/static/chunks/main.js')).toBeNull()
    expect(scriptCategory('https://example.com/?next=static.reo.dev')).toBeNull()
    expect(scriptCategory('https://notreo.dev/reo.js')).toBeNull()
  })
})

describe('holdScriptsUntilConsent', () => {
  beforeEach(async () => {
    vi.resetModules()
    consent.granted = {}
    const { holdScriptsUntilConsent } = await import('./scriptBlocking')
    holdScriptsUntilConsent()
  })

  afterEach(() => {
    document.createElement = originalCreateElement
    document.head.innerHTML = ''
  })

  it('holds a script GTM adds until its category is allowed, then sets its src again', () => {
    const script = document.createElement('script')
    script.type = 'text/javascript'
    script.async = true
    script.src = REO
    document.head.appendChild(script)

    expect(script.getAttribute('type')).toBe('text/plain')
    expect(script.src).toBe(REO)

    const observer = new MutationObserver(() => {})
    observer.observe(script, { attributes: true, attributeFilter: ['src'] })
    grant('advertisement')

    expect(script.getAttribute('type')).toBe('text/javascript')
    expect(script.getAttribute('src')).toBe(REO)
    expect(observer.takeRecords().length).toBeGreaterThan(0)
  })

  it('keeps a type set after the src and restores it on release', () => {
    const script = document.createElement('script')
    script.setAttribute('src', CLARITY)
    script.setAttribute('type', 'text/javascript')

    expect(script.getAttribute('type')).toBe('text/plain')
    grant('analytics')
    expect(script.getAttribute('type')).toBe('text/javascript')
  })

  it('removes the held type from a script that had none', () => {
    const script = document.createElement('script')
    script.src = GTAG

    expect(script.getAttribute('type')).toBe('text/plain')
    grant('analytics')
    expect(script.hasAttribute('type')).toBe(false)
  })

  it('releases only the categories the visitor allows', () => {
    const clarity = document.createElement('script')
    clarity.src = CLARITY
    const reo = document.createElement('script')
    reo.src = REO

    grant('analytics')
    expect(clarity.hasAttribute('type')).toBe(false)
    expect(reo.getAttribute('type')).toBe('text/plain')
  })

  it('leaves allowed and unrelated scripts untouched', () => {
    consent.granted.analytics = true
    const gtag = document.createElement('script')
    gtag.type = 'text/javascript'
    gtag.src = GTAG
    const chunk = document.createElement('script')
    chunk.src = '/_next/static/chunks/main.js'

    expect(gtag.getAttribute('type')).toBe('text/javascript')
    expect(chunk.hasAttribute('type')).toBe(false)
  })
})
