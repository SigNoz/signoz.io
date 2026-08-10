'use client'

import { memo, useCallback, useMemo } from 'react'
import { usePathname } from 'next/navigation'
import { ArrowUpRight } from 'lucide-react'

import { cn } from '../../app/lib/utils'
import { useLogEvent } from '@/hooks/useLogEvent'

import { AI_OPTIONS } from '../OpenInAI/OpenInAI.constants'
import type { AIOption } from '../OpenInAI/OpenInAI.types'
import { getAbsoluteUrl } from '../OpenInAI/OpenInAI.utils'

const buttonClass =
  'inline-flex h-8 items-center gap-1.5 rounded-[4px] border border-[var(--l1-border)] bg-[var(--l2-background-60)] px-2.5 text-[13px] leading-none text-[var(--l2-foreground)] transition-colors hover:bg-[var(--l1-background-hover)] hover:text-[var(--l1-foreground-hover)]'

const providerLabel = (option: AIOption): string => option.name.replace(/^Open in /, '')

function AskAIRow({ className }: { className?: string }) {
  const pathname = usePathname()
  const logEvent = useLogEvent()
  const absolutePageUrl = useMemo(() => getAbsoluteUrl(pathname || '/'), [pathname])

  const handleClick = useCallback(
    (option: AIOption) => {
      logEvent({
        eventName: 'Website Click',
        eventType: 'track',
        attributes: {
          clickType: 'button',
          clickName: `ask_ai_${option.id}`,
          clickLocation: 'footer',
          clickText: option.name,
          pagePath: pathname,
        },
      })
      window.open(option.getUrl(absolutePageUrl), '_blank', 'noopener,noreferrer')
    },
    [logEvent, absolutePageUrl, pathname]
  )

  return (
    <div
      data-markdown-ignore=""
      className={cn('flex flex-wrap items-center gap-x-4 gap-y-3', className)}
    >
      <span className="text-sm font-medium text-[var(--l2-foreground)]">
        Ask AI about this page
      </span>
      <div className="flex flex-wrap items-center gap-2">
        {AI_OPTIONS.map((option) => (
          <button
            key={option.id}
            type="button"
            onClick={() => handleClick(option)}
            className={buttonClass}
            aria-label={option.name}
            title={option.name}
          >
            <option.Icon className="size-3.5 shrink-0" aria-hidden="true" />
            <span className="whitespace-nowrap">{providerLabel(option)}</span>
            <ArrowUpRight className="size-3 shrink-0" aria-hidden="true" />
          </button>
        ))}
      </div>
    </div>
  )
}

export default memo(AskAIRow)
