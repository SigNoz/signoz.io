'use client'

import { memo, useCallback, useMemo, useRef, useState, type CSSProperties } from 'react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@signozhq/ui/dropdown-menu'
import { ChevronDown, Copy, Check, ExternalLink } from 'lucide-react'

import { cn } from '../../app/lib/utils'
import { useLogEvent } from '@/hooks/useLogEvent'
import Button from '@/components/ui/Button'

import { AI_OPTIONS, COPY_FEEDBACK_DURATION_MS } from './OpenInAI.constants'
import type { AIOption, OpenInAIProps } from './OpenInAI.types'
import { getAbsoluteUrl } from './OpenInAI.utils'

const openInAIMenuVars = {
  '--dropdown-menu-content-min-width': '17.5rem',
  '--dropdown-menu-content-border-radius': 'var(--spacing-4)',
  '--dropdown-menu-content-padding': 'var(--spacing-2) 0',
  '--dropdown-menu-item-padding': 'var(--spacing-6) var(--spacing-8)',
  '--dropdown-menu-item-border-radius': '0',
  '--dropdown-menu-item-gap': 'var(--spacing-6)',
  '--dropdown-menu-item-min-width': '0',
} as CSSProperties

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
  const isCopyingRef = useRef(false)
  const logEvent = useLogEvent()

  const absolutePageUrl = useMemo(() => getAbsoluteUrl(pageUrl), [pageUrl])
  const canCopy = Boolean(markdownContent || getMarkdownContent)

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
      <div className="border-border bg-card flex items-center rounded-md border">
        <Button
          isButton={true}
          type="button"
          onClick={handleCopy}
          disabled={isCopyDisabled}
          variant="secondary"
          size="sm"
          className={cn(
            'gap-1.5 rounded-l-md rounded-r-none px-3',
            copied && 'text-callout-success-title'
          )}
          aria-label={copyLabel}
          title={copyLabel}
        >
          {copied ? <Check size={14} aria-hidden="true" /> : <Copy size={14} aria-hidden="true" />}
          <span className="hidden lg:inline">{copied ? 'Copied!' : copyLabel}</span>
        </Button>

        <div className="bg-muted h-4 w-px" aria-hidden="true" />

        <DropdownMenu open={open} onOpenChange={setOpen} modal={false}>
          <DropdownMenuTrigger asChild>
            <Button
              isButton={true}
              type="button"
              variant="secondary"
              size="sm"
              className={cn(
                'size-9 rounded-l-none rounded-r-md px-0',
                open && 'bg-l3-background text-foreground'
              )}
              aria-label="More options"
              title="More options"
            >
              <ChevronDown
                size={14}
                aria-hidden="true"
                className={cn('transition-transform duration-150', open && 'rotate-180')}
              />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end" sideOffset={8} style={openInAIMenuVars} className="z-50">
            <DropdownMenuItem
              disabled={isCopyDisabled}
              clickable
              onSelect={() => {
                void handleCopy()
              }}
              className="items-start"
            >
              <div
                className={cn(
                  'mt-0.5 flex-shrink-0',
                  copied ? 'text-callout-success-title' : 'text-muted-foreground'
                )}
                aria-hidden="true"
              >
                {copied ? <Check size={16} /> : <Copy size={16} />}
              </div>
              <div className="flex flex-col">
                <span className="text-l1-foreground text-sm font-medium">
                  {copied ? 'Copied!' : 'Copy page'}
                </span>
                <span className="text-muted-foreground text-xs">
                  Copy page as Markdown for LLMs
                </span>
              </div>
            </DropdownMenuItem>

            <DropdownMenuSeparator />

            {AI_OPTIONS.map((option) => (
              <DropdownMenuItem
                key={option.id}
                clickable
                onSelect={() => handleOpenInAI(option)}
                className="items-start"
              >
                <div className="text-muted-foreground mt-0.5 flex-shrink-0">
                  <option.Icon className="h-4 w-4" aria-hidden="true" />
                </div>
                <div className="flex flex-col">
                  <div className="flex items-center gap-1.5">
                    <span className="text-l1-foreground text-sm font-medium">{option.name}</span>
                    <ExternalLink size={12} className="text-muted-foreground" aria-hidden="true" />
                  </div>
                  <span className="text-muted-foreground text-xs">{option.description}</span>
                </div>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  )
}

export default memo(OpenInAI)
