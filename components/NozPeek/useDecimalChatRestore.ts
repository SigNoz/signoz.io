'use client'

import { useEffect } from 'react'
import { isDecimalChatOpen } from '@/utils/decimal'

/** Restore the dock when Decimal chat closes. */
export function useDecimalChatRestore({
  dismissed,
  onRestore,
}: {
  dismissed: boolean
  onRestore: () => void
}) {
  useEffect(() => {
    if (!dismissed) return

    let sawOpen = isDecimalChatOpen()

    const restoreIfClosed = () => {
      const open = isDecimalChatOpen()
      if (open) {
        sawOpen = true
        return
      }
      if (sawOpen) onRestore()
    }

    const onMessage = (event: MessageEvent) => {
      if (event.origin !== 'https://app.getdecimal.ai') return
      if (event.data?.type === 'decimal-widget-request-close') {
        window.setTimeout(restoreIfClosed, 50)
      }
    }

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') window.setTimeout(restoreIfClosed, 50)
    }

    const onClickCapture = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null
      if (!target) return
      if (target.closest?.('.decimal-widget-button, .decimal-widget-modal-backdrop')) {
        window.setTimeout(restoreIfClosed, 50)
      }
    }

    const observer = new MutationObserver(() => {
      restoreIfClosed()
    })

    let bodyObserver: MutationObserver | null = null
    const observeContainer = () => {
      const el = document.querySelector('.decimal-widget-container')
      if (!el) return false
      observer.observe(el, { attributes: true, attributeFilter: ['class'] })
      return true
    }

    if (!observeContainer()) {
      bodyObserver = new MutationObserver(() => {
        if (observeContainer()) bodyObserver?.disconnect()
      })
      bodyObserver.observe(document.body, { childList: true, subtree: true })
    }

    const poll = window.setInterval(() => {
      if (isDecimalChatOpen()) {
        sawOpen = true
        window.clearInterval(poll)
      }
    }, 100)
    const pollStop = window.setTimeout(() => window.clearInterval(poll), 5000)

    window.addEventListener('message', onMessage)
    window.addEventListener('keydown', onKeyDown)
    document.addEventListener('click', onClickCapture, true)

    return () => {
      observer.disconnect()
      bodyObserver?.disconnect()
      window.clearInterval(poll)
      window.clearTimeout(pollStop)
      window.removeEventListener('message', onMessage)
      window.removeEventListener('keydown', onKeyDown)
      document.removeEventListener('click', onClickCapture, true)
    }
  }, [dismissed, onRestore])
}
