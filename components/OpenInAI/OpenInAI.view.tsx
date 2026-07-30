'use client'

import { memo, useCallback, useMemo, useRef, useState, type CSSProperties } from 'react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@signozhq/ui/dropdown-menu'
import { ChevronDown, Copy, Check, ArrowUpRight } from 'lucide-react'

import { cn } from '../../app/lib/utils'
import { useLogEvent } from '@/hooks/useLogEvent'

import { AI_OPTIONS, COPY_AS_MARKDOWN_LABEL, COPY_FEEDBACK_DURATION_MS } from './OpenInAI.constants'
import type { AIOption, OpenInAIProps } from './OpenInAI.types'
import { getAbsoluteUrl } from './OpenInAI.utils'

const openInAIMenuVars = {
  '--dropdown-menu-content-min-width': '16rem',
  '--dropdown-menu-content-border-radius': '4px',
  '--dropdown-menu-content-padding': 'var(--spacing-2)',
  '--dropdown-menu-content-background': 'var(--l1-background-60)',
  '--dropdown-menu-content-border-color': 'var(--l1-border)',
  '--dropdown-menu-item-padding': 'var(--spacing-5) var(--spacing-6)',
  '--dropdown-menu-item-border-radius': '0',
  '--dropdown-menu-item-gap': 'var(--spacing-4)',
  '--dropdown-menu-item-min-width': '0',
  '--dropdown-menu-item-foreground': 'var(--l2-foreground)',
  '--dropdown-menu-item-hover-background': 'var(--l1-background-hover)',
  '--dropdown-menu-item-focus-background': 'var(--l1-background-hover)',
} as CSSProperties

const shellClass =
  'inline-flex h-8 items-stretch overflow-hidden rounded-[4px] border border-[var(--l1-border)] bg-[var(--l2-background-60)] text-[13px] leading-none tracking-[-0.065px] text-[var(--l2-foreground)]'

const segmentClass =
  'inline-flex h-full items-center justify-center px-2.5 leading-none transition-colors disabled:cursor-not-allowed disabled:opacity-50'

const segmentHoverClass =
  'hover:bg-[var(--l1-background-hover)] hover:text-[var(--l1-foreground-hover)]'

const segmentActiveClass = 'bg-[var(--l1-background-hover)] text-[var(--l1-foreground-hover)]'

function OpenInAI({
  markdownContent,
  getMarkdownContent,
  pageUrl,
  docSlug,
  className,
  copyLabel = 'Copy markdown',
}: OpenInAIProps) {
  const [copied, setCopied] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [open, setOpen] = useState(false)
  const [menuAlignOffset, setMenuAlignOffset] = useState(0)
  const isCopyingRef = useRef(false)
  const shellRef = useRef<HTMLDivElement>(null)
  const chevronRef = useRef<HTMLButtonElement>(null)
  const logEvent = useLogEvent()

  const absolutePageUrl = useMemo(() => getAbsoluteUrl(pageUrl), [pageUrl])
  const canCopy = Boolean(markdownContent || getMarkdownContent)

  const handleOpenChange = useCallback((nextOpen: boolean) => {
    if (nextOpen && shellRef.current && chevronRef.current) {
      // Anchor the menu to the full split button, not just the chevron trigger.
      setMenuAlignOffset(
        shellRef.current.getBoundingClientRect().left -
          chevronRef.current.getBoundingClientRect().left
      )
    }
    setOpen(nextOpen)
  }, [])

  const handleCopy = useCallback(async () => {
    if (!canCopy || isCopyingRef.current) return

    isCopyingRef.current = true
    setIsLoading(true)
    try {
      const resolvedContent = getMarkdownContent ? await getMarkdownContent() : markdownContent
      if (!resolvedContent) return

      await navigator.clipboard.writeText(resolvedContent)
      logEvent({
        eventName: 'Website Click',
        eventType: 'track',
        attributes: {
          clickType: 'button',
          clickName: 'copy_markdown',
          clickLocation: 'docs_header',
          clickText: copyLabel,
          docSlug,
        },
      })
      setCopied(true)
      setTimeout(() => setCopied(false), COPY_FEEDBACK_DURATION_MS)
    } catch (error) {
      console.error('Failed to copy markdown content:', error)
    } finally {
      isCopyingRef.current = false
      setIsLoading(false)
    }
  }, [canCopy, markdownContent, getMarkdownContent, logEvent, copyLabel, docSlug])

  const handleOpenInAI = useCallback(
    (option: AIOption) => {
      logEvent({
        eventName: 'Website Click',
        eventType: 'track',
        attributes: {
          clickType: 'button',
          clickName: `open_in_${option.id}`,
          clickLocation: 'docs_header',
          clickText: option.name,
          docSlug,
        },
      })
      window.open(option.getUrl(absolutePageUrl), '_blank', 'noopener,noreferrer')
    },
    [logEvent, absolutePageUrl, docSlug]
  )

  const isCopyDisabled = isLoading || !canCopy

  return (
    <div className={cn('flex items-center', className)}>
      <div ref={shellRef} className={cn(shellClass, 'relative')}>
        <button
          type="button"
          onClick={handleCopy}
          disabled={isCopyDisabled}
          className={cn(segmentClass, segmentHoverClass, 'gap-1.5', copied && segmentActiveClass)}
          aria-label={copyLabel}
          title={copyLabel}
        >
          {copied ? (
            <Check className="size-3.5 shrink-0" aria-hidden="true" />
          ) : (
            <Copy className="size-3.5 shrink-0" aria-hidden="true" />
          )}
          <span className="hidden whitespace-nowrap lg:inline">
            {copied ? 'Copied' : copyLabel}
          </span>
        </button>

        <div className="w-px shrink-0 self-stretch bg-[var(--l1-border)]" aria-hidden="true" />

        <DropdownMenu open={open} onOpenChange={handleOpenChange} modal={false}>
          <DropdownMenuTrigger asChild>
            <button
              ref={chevronRef}
              type="button"
              className={cn(segmentClass, segmentHoverClass, open && segmentActiveClass)}
              aria-label="More options"
              title="More options"
            >
              <ChevronDown
                className={cn(
                  'size-3.5 shrink-0 transition-transform duration-150',
                  open && 'rotate-180'
                )}
                aria-hidden="true"
              />
            </button>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            side="bottom"
            align="start"
            sideOffset={4}
            alignOffset={menuAlignOffset}
            avoidCollisions={false}
            style={openInAIMenuVars}
            className="z-50 w-64 backdrop-blur-[20px]"
          >
            <DropdownMenuItem
              disabled={isCopyDisabled}
              clickable
              onSelect={() => {
                void handleCopy()
              }}
              leftIcon={
                copied ? (
                  <Check className="size-3.5" aria-hidden="true" />
                ) : (
                  <Copy className="size-3.5" aria-hidden="true" />
                )
              }
            >
              {copied ? 'Copied' : COPY_AS_MARKDOWN_LABEL}
            </DropdownMenuItem>

            {AI_OPTIONS.map((option) => (
              <DropdownMenuItem
                key={option.id}
                clickable
                onSelect={() => handleOpenInAI(option)}
                leftIcon={<option.Icon className="size-3.5" aria-hidden="true" />}
                rightIcon={<ArrowUpRight className="size-3.5" aria-hidden="true" />}
              >
                {option.name}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  )
}

export default memo(OpenInAI)
