'use client'

import { useCallback, useRef } from 'react'
import { Search } from 'lucide-react'
import { openDecimalChat } from '@/utils/decimal'
import { NozPeekBodySvg, NozPeekHandsSvg } from './NozPeekIcon'
import { useDecimalChatRestore } from './useDecimalChatRestore'
import { useNozPeekAppearAnimation } from './useNozPeekAppearAnimation'
import { useNozPeekEyeTracking } from './useNozPeekEyeTracking'
import { useNozPeekPosition } from './useNozPeekPosition'
import { useNozPeekVisibility } from './useNozPeekVisibility'
import './NozPeek.css'

export default function NozPeekDock() {
  const bodyRef = useRef<HTMLDivElement>(null)
  const { enabled, isIntro, pathname, dismissed, setDismissed } = useNozPeekVisibility()
  const dockLeft = useNozPeekPosition({ enabled, isIntro, pathname })
  const { anchoredRef, shouldAnimate, settled } = useNozPeekAppearAnimation({ enabled })

  useNozPeekEyeTracking({ enabled, dismissed, anchoredRef, bodyRef })

  const handleRestore = useCallback(() => setDismissed(false), [setDismissed])
  useDecimalChatRestore({ dismissed, onRestore: handleRestore })

  const handleOpen = useCallback(() => {
    if (dismissed) return
    setDismissed(true)
    openDecimalChat({ presentation: 'modal' })
  }, [dismissed, setDismissed])

  if (!enabled) return null

  const animateClass = shouldAnimate ? 'animate' : ''
  const settledClass = settled && !shouldAnimate ? 'settled' : ''

  return (
    <div
      className={`noz-peek-dock ${animateClass} ${settledClass} ${dismissed ? 'dismissed' : ''}`}
      style={{ left: dockLeft || '50%' }}
    >
      {/* Mobile: round orange balloon CTA (desktop keeps the full input bar). */}
      <button
        type="button"
        className={`noz-peek-balloon ${animateClass} ${settledClass}`}
        onClick={handleOpen}
        aria-label="Ask SigNoz AI"
      >
        <Search size={22} strokeWidth={2.25} aria-hidden="true" />
      </button>

      <div className="noz-peek-stage">
        <div
          ref={bodyRef}
          className={`noz-peek-body ${animateClass} ${settledClass}`}
          aria-hidden="true"
        >
          <NozPeekBodySvg />
        </div>
        <NozPeekHandsSvg />
        <button
          type="button"
          className={`noz-peek-input ${animateClass} ${settledClass}`}
          onClick={handleOpen}
          aria-label="Ask SigNoz AI"
        >
          <span className="noz-peek-placeholder">Ask SigNoz AI…</span>
        </button>
      </div>
    </div>
  )
}
