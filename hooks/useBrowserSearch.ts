'use client'

import { useSyncExternalStore } from 'react'

const HISTORY_CHANGE_EVENT = 'signoz:history-change'

let isHistoryPatched = false

const dispatchHistoryChange = () => {
  window.dispatchEvent(new Event(HISTORY_CHANGE_EVENT))
}

const patchHistory = () => {
  if (typeof window === 'undefined' || isHistoryPatched) {
    return
  }

  isHistoryPatched = true

  const wrapHistoryMethod = (methodName: 'pushState' | 'replaceState') => {
    const originalMethod = window.history[methodName]

    window.history[methodName] = function (...args) {
      const result = originalMethod.apply(this, args as never)
      dispatchHistoryChange()
      return result
    }
  }

  wrapHistoryMethod('pushState')
  wrapHistoryMethod('replaceState')
}

const subscribe = (onStoreChange: () => void) => {
  if (typeof window === 'undefined') {
    return () => {}
  }

  patchHistory()

  window.addEventListener('popstate', onStoreChange)
  window.addEventListener(HISTORY_CHANGE_EVENT, onStoreChange)

  return () => {
    window.removeEventListener('popstate', onStoreChange)
    window.removeEventListener(HISTORY_CHANGE_EVENT, onStoreChange)
  }
}

const getSnapshot = () => {
  if (typeof window === 'undefined') {
    return ''
  }

  return window.location.search
}

export const useBrowserSearch = () => useSyncExternalStore(subscribe, getSnapshot, () => '')
