'use client'

import { Fragment, memo, useCallback, useMemo, useRef, useState } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { ChevronDown, Copy, Check, ExternalLink } from 'lucide-react'

import { cn } from '../../app/lib/utils'
import { useLogEvent } from '@/hooks/useLogEvent'
import Button from '@/components/ui/Button'

import { AI_OPTIONS, COPY_FEEDBACK_DURATION_MS } from './OpenInAI.constants'
import type { AIOption, OpenInAIProps } from './OpenInAI.types'
import { getAbsoluteUrl } from './OpenInAI.utils'

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
      <div className="flex items-center rounded-md border border-signoz_slate-400 bg-signoz_ink-400">
        <Button
          isButton={true}
          type="button"
          onClick={handleCopy}
          disabled={isCopyDisabled}
          variant="secondary"
          size="sm"
          className={cn(
            'gap-1.5 rounded-l-md rounded-r-none px-3',
            copied && 'text-signoz_forest-500'
          )}
          aria-label={copyLabel}
          title={copyLabel}
        >
          {copied ? <Check size={14} aria-hidden="true" /> : <Copy size={14} aria-hidden="true" />}
          <span className="hidden lg:inline">{copied ? 'Copied!' : copyLabel}</span>
        </Button>

        <div className="h-4 w-px bg-signoz_slate-400" aria-hidden="true" />

        <Menu as="div" className="relative">
          {({ open }) => (
            <>
              <Menu.Button
                as={Button}
                isButton={true}
                type="button"
                variant="secondary"
                size="sm"
                className={cn(
                  'size-9 rounded-l-none rounded-r-md px-0',
                  open && 'bg-signoz_ink-300 text-signoz_vanilla-100'
                )}
                aria-label="More options"
                title="More options"
              >
                <ChevronDown
                  size={14}
                  aria-hidden="true"
                  className={cn('transition-transform duration-150', open && 'rotate-180')}
                />
              </Menu.Button>

              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items
                  modal={false}
                  className="absolute right-0 z-50 mt-2 min-w-[280px] origin-top-right rounded-lg border border-signoz_slate-400 bg-signoz_ink-400 py-1 shadow-xl focus:outline-none"
                >
                  <Menu.Item disabled={isCopyDisabled}>
                    {({ active, disabled }) => (
                      <button
                        type="button"
                        onClick={handleCopy}
                        disabled={disabled}
                        className={cn(
                          'flex w-full items-start gap-3 px-4 py-3 text-left transition-colors',
                          active && 'bg-signoz_ink-300',
                          disabled && 'cursor-not-allowed opacity-50'
                        )}
                      >
                        <div
                          className={cn(
                            'mt-0.5 flex-shrink-0',
                            copied ? 'text-signoz_forest-500' : 'text-signoz_vanilla-400'
                          )}
                          aria-hidden="true"
                        >
                          {copied ? <Check size={16} /> : <Copy size={16} />}
                        </div>
                        <div className="flex flex-col">
                          <span className="text-sm font-medium text-signoz_vanilla-100">
                            {copied ? 'Copied!' : 'Copy page'}
                          </span>
                          <span className="text-xs text-signoz_vanilla-400">
                            Copy page as Markdown for LLMs
                          </span>
                        </div>
                      </button>
                    )}
                  </Menu.Item>

                  <div
                    className="my-1 border-t border-signoz_slate-400"
                    role="separator"
                    aria-hidden="true"
                  />

                  {AI_OPTIONS.map((option) => (
                    <Menu.Item key={option.id}>
                      {({ active }) => (
                        <button
                          type="button"
                          onClick={() => handleOpenInAI(option)}
                          className={cn(
                            'flex w-full items-start gap-3 px-4 py-3 text-left transition-colors',
                            active && 'bg-signoz_ink-300'
                          )}
                        >
                          <div className="mt-0.5 flex-shrink-0 text-signoz_vanilla-400">
                            <option.Icon className="h-4 w-4" aria-hidden="true" />
                          </div>
                          <div className="flex flex-col">
                            <div className="flex items-center gap-1.5">
                              <span className="text-sm font-medium text-signoz_vanilla-100">
                                {option.name}
                              </span>
                              <ExternalLink
                                size={12}
                                className="text-signoz_vanilla-400"
                                aria-hidden="true"
                              />
                            </div>
                            <span className="text-xs text-signoz_vanilla-400">
                              {option.description}
                            </span>
                          </div>
                        </button>
                      )}
                    </Menu.Item>
                  ))}
                </Menu.Items>
              </Transition>
            </>
          )}
        </Menu>
      </div>
    </div>
  )
}

export default memo(OpenInAI)
