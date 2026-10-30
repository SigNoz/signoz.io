import { hasConsent, onConsentChange } from './client'
import type { ConsentCategory } from './parse'

// The scripts GTM's tags add, by the category they need. The tags have no consent settings in
// GTM, so without this every tag runs for a visitor who allows either category.
const SCRIPT_CATEGORIES: { host: string; path?: string; category: ConsentCategory }[] = [
  { host: 'googletagmanager.com', path: '/gtag/', category: 'analytics' },
  { host: 'clarity.ms', category: 'analytics' },
  { host: 'licdn.com', category: 'advertisement' },
  { host: 'reo.dev', category: 'advertisement' },
]

export const scriptCategory = (src: string): ConsentCategory | null => {
  let url: URL
  try {
    url = new URL(src, document.baseURI)
  } catch {
    return null
  }
  const match = SCRIPT_CATEGORIES.find(
    ({ host, path = '/' }) =>
      (url.hostname === host || url.hostname.endsWith(`.${host}`)) && url.pathname.startsWith(path)
  )
  return match?.category ?? null
}

// Browsers neither fetch nor run a script of an unknown type, and still run it later when it gets
// a JavaScript type and its src is set again.
const HELD_TYPE = 'text/plain'

type Native = {
  setAttribute: Element['setAttribute']
  src: PropertyDescriptor
  type: PropertyDescriptor
}

const held = new Map<HTMLScriptElement, { category: ConsentCategory; type: string | null }>()

const release = (native: Native) => {
  held.forEach(({ category, type }, script) => {
    if (!hasConsent(category)) return
    held.delete(script)
    if (type === null) script.removeAttribute('type')
    else native.setAttribute.call(script, 'type', type)
    const src = script.getAttribute('src')
    if (src === null) return
    script.removeAttribute('src')
    native.setAttribute.call(script, 'src', src)
  })
}

const guard = (script: HTMLScriptElement, native: Native) => {
  const hold = (src: string) => {
    if (held.has(script)) return
    const category = scriptCategory(src)
    if (!category || hasConsent(category)) return
    held.set(script, { category, type: script.getAttribute('type') })
    native.setAttribute.call(script, 'type', HELD_TYPE)
  }
  const setType = (value: string) => {
    const entry = held.get(script)
    if (entry) entry.type = value
    return Boolean(entry)
  }

  Object.defineProperties(script, {
    src: {
      configurable: true,
      get: () => native.src.get?.call(script),
      set: (value: string) => {
        hold(String(value))
        native.src.set?.call(script, value)
      },
    },
    type: {
      configurable: true,
      get: () => native.type.get?.call(script),
      set: (value: string) => {
        if (!setType(String(value))) native.type.set?.call(script, value)
      },
    },
    setAttribute: {
      configurable: true,
      writable: true,
      value: (name: string, value: string) => {
        const attribute = String(name).toLowerCase()
        if (attribute === 'type' && setType(String(value))) return
        if (attribute === 'src') hold(String(value))
        native.setAttribute.call(script, name, value)
      },
    },
  })
}

let installed = false

// Holds back the scripts listed above until the visitor allows their category, then loads them.
export const holdScriptsUntilConsent = () => {
  if (installed || typeof document === 'undefined') return
  installed = true

  const native: Native = {
    setAttribute: Element.prototype.setAttribute,
    src: Object.getOwnPropertyDescriptor(HTMLScriptElement.prototype, 'src') ?? {},
    type: Object.getOwnPropertyDescriptor(HTMLScriptElement.prototype, 'type') ?? {},
  }
  const createElement = document.createElement
  document.createElement = function (this: Document, ...args: [string, ElementCreationOptions?]) {
    const element = createElement.apply(this, args)
    if (element instanceof HTMLScriptElement) guard(element, native)
    return element
  } as Document['createElement']

  onConsentChange(() => release(native))
}
