'use client'

import { useEffect, useId, useRef, useState, useSyncExternalStore } from 'react'
import { X } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { useConsent } from '@/hooks/useConsent'
import {
  DECIMAL_PRIMARY_COLOR,
  getDecimalStatus,
  isDecimalConfigured,
  isDecimalLauncherShown,
  openDecimalChat,
  subscribeDecimalStatus,
} from '@/utils/decimal'

// Stands in for Decimal's launcher until the widget loads, so nothing reaches Decimal before the
// visitor allows functional cookies or starts a chat. Below the consent banners' z-index.
const LAUNCHER_Z = 'z-[2147482000]'
const HANDOVER_TIMEOUT_MS = 10000

const ChatIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.75}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden
    className="h-6 w-6"
  >
    <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" />
  </svg>
)

export default function DecimalLauncher() {
  const status = useSyncExternalStore(subscribeDecimalStatus, getDecimalStatus, () => 'idle')
  const hasFunctionalConsent = useConsent().categories.functional
  const [open, setOpen] = useState(false)
  const [handedOver, setHandedOver] = useState(isDecimalLauncherShown)
  const startRef = useRef<HTMLButtonElement>(null)
  const noticeId = useId()

  useEffect(() => {
    if (open) startRef.current?.focus()
  }, [open])

  // Stay until Decimal's own launcher is visible, so there is never a moment without one.
  useEffect(() => {
    if (status !== 'loaded') return
    const startedAt = Date.now()
    const timer = window.setInterval(() => {
      if (!isDecimalLauncherShown() && Date.now() - startedAt < HANDOVER_TIMEOUT_MS) return
      window.clearInterval(timer)
      setHandedOver(true)
    }, 100)
    return () => window.clearInterval(timer)
  }, [status])

  if (!isDecimalConfigured || handedOver) return null

  // Once the widget has loaded, the chat itself opens instead.
  const showNotice = open && status !== 'loaded'

  const onLauncherClick = () => {
    if (hasFunctionalConsent || status === 'loaded') openDecimalChat()
    else setOpen((value) => !value)
  }

  return (
    <div
      onKeyDown={(event) => {
        if (event.key === 'Escape') setOpen(false)
      }}
    >
      {showNotice ? (
        <div
          id={noticeId}
          role="dialog"
          aria-labelledby={`${noticeId}-title`}
          aria-describedby={`${noticeId}-description`}
          className={`fixed bottom-[84px] right-5 ${LAUNCHER_Z} w-[min(320px,calc(100vw-40px))] rounded-md border border-[var(--l2-border)] bg-[var(--popover)] p-4 shadow-[0_12px_32px_color-mix(in_srgb,var(--bg-base-black)_45%,transparent)]`}
        >
          <h2
            id={`${noticeId}-title`}
            className="text-[15px] font-medium text-[var(--l1-foreground)]"
          >
            Chat with SigNoz AI
          </h2>
          <p
            id={`${noticeId}-description`}
            className="mt-2 text-[13px] leading-[1.55] text-[var(--l2-foreground)]"
          >
            The chat is provided by Decimal. Starting it loads Decimal&apos;s chat and sets one
            cookie that keeps your conversation for 90 minutes.
          </p>
          {status === 'failed' ? (
            <p role="alert" className="mt-2 text-[13px] text-[var(--l1-foreground)]">
              The chat couldn&apos;t load. Try again later.
            </p>
          ) : null}
          <Button
            ref={startRef}
            size="sm"
            className="mt-4"
            disabled={status === 'loading'}
            onClick={() => openDecimalChat()}
          >
            {status === 'loading' ? 'Starting…' : 'Start chat'}
          </Button>
        </div>
      ) : null}
      <button
        type="button"
        aria-label={showNotice ? 'Close' : 'Open chat'}
        aria-expanded={hasFunctionalConsent ? undefined : showNotice}
        aria-controls={showNotice ? noticeId : undefined}
        onClick={onLauncherClick}
        style={{ backgroundColor: DECIMAL_PRIMARY_COLOR }}
        className={`fixed bottom-5 right-5 ${LAUNCHER_Z} flex h-12 w-12 items-center justify-center rounded-full text-white shadow-[0_0_0_1px_rgba(0,0,0,0.08),0_4px_6px_rgba(0,0,0,0.04),0_12px_20px_rgba(0,0,0,0.08)] transition-transform duration-200 hover:scale-105`}
      >
        {showNotice ? <X size={22} aria-hidden /> : <ChatIcon />}
      </button>
    </div>
  )
}
