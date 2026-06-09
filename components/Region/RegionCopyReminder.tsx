'use client'

import React from 'react'
import Link from 'next/link'
import { cn } from 'app/lib/utils'
import { CopiedRegion, REGION_HELP_HREF } from './regionCopy'

export interface RegionCopyReminderState {
  /** Bumped on every copy so the toast re-arms its auto-dismiss timer and re-animates. */
  id: number
  copied: CopiedRegion
}

interface RegionCopyReminderProps {
  reminder: RegionCopyReminderState | null
  onClose: () => void
}

const AUTO_DISMISS_MS = 6000

const codeClass = 'rounded bg-signoz_slate-400 px-1 py-0.5 text-xs font-semibold'

/**
 * Transient reminder shown after a region-specific endpoint / MCP URL is copied
 * (via the copy button or Cmd/Ctrl+C). Auto-dismisses like the site's other
 * toasts and mirrors the AppTooltip surface so it reads as a native element.
 */
export const RegionCopyReminder = ({ reminder, onClose }: RegionCopyReminderProps) => {
  React.useEffect(() => {
    if (!reminder) return undefined
    const timer = setTimeout(onClose, AUTO_DISMISS_MS)
    return () => clearTimeout(timer)
  }, [reminder, onClose])

  if (!reminder || !reminder.copied) return null

  const { copied } = reminder
  const isPlaceholder = copied.kind === 'placeholder'
  const regionCode = copied.kind === 'region' ? copied.token : ''

  return (
    <div
      role="status"
      aria-live="polite"
      className={cn(
        'animate-in fade-in slide-in-from-top-2 duration-200',
        'fixed left-1/2 top-5 z-[200] w-[380px] max-w-[calc(100vw-2rem)] -translate-x-1/2',
        'rounded-lg border border-signoz_robin-500 bg-signoz_ink-400 px-4 py-3',
        'text-sm leading-relaxed text-signoz_vanilla-100 shadow-[0_8px_30px_rgba(0,0,0,0.45)]'
      )}
    >
      {isPlaceholder ? (
        <p className="m-0">
          This snippet still contains the <code className={codeClass}>&lt;region&gt;</code>{' '}
          placeholder. Replace it with your workspace region before using it.
        </p>
      ) : (
        <p className="m-0">
          Copied a snippet for the <code className={codeClass}>{regionCode}</code> region.
          Double-check this matches your SigNoz workspace region.
        </p>
      )}
      <Link
        href={REGION_HELP_HREF}
        prefetch={false}
        className="mt-2 inline-block text-xs font-medium text-signoz_robin-400 hover:underline"
      >
        How do I find my workspace region? →
      </Link>
    </div>
  )
}
