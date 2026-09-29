import React from 'react'

const SELECT_OPEN_ATTR = 'regionSelectOpen'
const SCROLL_UNLOCK_EVENTS = ['wheel', 'touchmove'] as const

/**
 * Radix Select always enables RemoveScroll (no modal={false}). That locks body
 * scroll and breaks position:sticky rails (sidebar/TOC jump off-screen). While
 * a sidenav select menu is open we keep the menu open (sticky sidebar keeps
 * alignment) and defeat the lock so the page can scroll. Dialog/Drawer lock is
 * untouched — we only unlock when this attr is present (see global.css
 * [data-region-select-open]).
 */
export function useSelectScrollUnlock(open: boolean) {
  React.useLayoutEffect(() => {
    if (!open) return

    document.body.dataset[SELECT_OPEN_ATTR] = ''

    const unlockScrollEvents = (event: Event) => {
      if (document.body.hasAttribute('data-scroll-locked')) {
        event.stopImmediatePropagation()
      }
    }

    const listenerOptions: AddEventListenerOptions = { capture: true, passive: false }
    SCROLL_UNLOCK_EVENTS.forEach((type) => {
      window.addEventListener(type, unlockScrollEvents, listenerOptions)
    })

    return () => {
      delete document.body.dataset[SELECT_OPEN_ATTR]
      SCROLL_UNLOCK_EVENTS.forEach((type) => {
        window.removeEventListener(type, unlockScrollEvents, listenerOptions)
      })
    }
  }, [open])
}
