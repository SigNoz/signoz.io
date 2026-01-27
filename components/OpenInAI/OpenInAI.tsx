'use client'

import { memo, useCallback, useMemo, useState } from 'react'
import { ChevronDown, Copy, Check, ExternalLink } from 'lucide-react'
import { Popover, PopoverTrigger, PopoverContent } from '@nextui-org/react'
import { cn } from 'app/lib/utils'
import { useLogEvent } from 'hooks/useLogEvent'

// Constants moved outside component to prevent recreation on each render
const COPY_FEEDBACK_DURATION_MS = 2000
const SIGNOZ_BASE_URL = 'https://signoz.io'

// AI service icons memoized as pure components to prevent unnecessary re-renders
const ChatGPTIcon = memo(function ChatGPTIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M22.282 9.821a5.985 5.985 0 0 0-.516-4.91 6.046 6.046 0 0 0-6.51-2.9A6.065 6.065 0 0 0 4.981 4.18a5.985 5.985 0 0 0-3.998 2.9 6.046 6.046 0 0 0 .743 7.097 5.98 5.98 0 0 0 .51 4.911 6.051 6.051 0 0 0 6.515 2.9A5.985 5.985 0 0 0 13.26 24a6.056 6.056 0 0 0 5.772-4.206 5.99 5.99 0 0 0 3.997-2.9 6.056 6.056 0 0 0-.747-7.073zM13.26 22.43a4.476 4.476 0 0 1-2.876-1.04l.141-.081 4.779-2.758a.795.795 0 0 0 .392-.681v-6.737l2.02 1.168a.071.071 0 0 1 .038.052v5.583a4.504 4.504 0 0 1-4.494 4.494zM3.6 18.304a4.47 4.47 0 0 1-.535-3.014l.142.085 4.783 2.759a.771.771 0 0 0 .78 0l5.843-3.369v2.332a.08.08 0 0 1-.033.062L9.74 19.95a4.5 4.5 0 0 1-6.14-1.646zM2.34 7.896a4.485 4.485 0 0 1 2.366-1.973V11.6a.766.766 0 0 0 .388.676l5.815 3.355-2.02 1.168a.076.076 0 0 1-.071 0l-4.83-2.786A4.504 4.504 0 0 1 2.34 7.896zm16.597 3.855l-5.833-3.387L15.119 7.2a.076.076 0 0 1 .071 0l4.83 2.791a4.494 4.494 0 0 1-.676 8.105v-5.678a.79.79 0 0 0-.407-.667zm2.01-3.023l-.141-.085-4.774-2.782a.776.776 0 0 0-.785 0L9.409 9.23V6.897a.066.066 0 0 1 .028-.061l4.83-2.787a4.5 4.5 0 0 1 6.68 4.66zm-12.64 4.135l-2.02-1.164a.08.08 0 0 1-.038-.057V6.075a4.5 4.5 0 0 1 7.375-3.453l-.142.08L8.704 5.46a.795.795 0 0 0-.393.681zm1.097-2.365l2.602-1.5 2.607 1.5v2.999l-2.597 1.5-2.607-1.5z" />
    </svg>
  )
})

const ClaudeIcon = memo(function ClaudeIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 512 509.64"
      xmlns="http://www.w3.org/2000/svg"
      shapeRendering="geometricPrecision"
      textRendering="geometricPrecision"
      imageRendering="optimizeQuality"
      fillRule="evenodd"
      clipRule="evenodd"
      aria-hidden="true"
    >
      <path
        fill="#D77655"
        d="M115.612 0h280.775C459.974 0 512 52.026 512 115.612v278.415c0 63.587-52.026 115.612-115.613 115.612H115.612C52.026 509.639 0 457.614 0 394.027V115.612C0 52.026 52.026 0 115.612 0z"
      />
      <path
        fill="#FCF2EE"
        fillRule="nonzero"
        d="M142.27 316.619l73.655-41.326 1.238-3.589-1.238-1.996-3.589-.001-12.31-.759-42.084-1.138-36.498-1.516-35.361-1.896-8.897-1.895-8.34-10.995.859-5.484 7.482-5.03 10.717.935 23.683 1.617 35.537 2.452 25.782 1.517 38.193 3.968h6.064l.86-2.451-2.073-1.517-1.618-1.517-36.776-24.922-39.81-26.338-20.852-15.166-11.273-7.683-5.687-7.204-2.451-15.721 10.237-11.273 13.75.935 3.513.936 13.928 10.716 29.749 23.027 38.848 28.612 5.687 4.727 2.275-1.617.278-1.138-2.553-4.271-21.13-38.193-22.546-38.848-10.035-16.101-2.654-9.655c-.935-3.968-1.617-7.304-1.617-11.374l11.652-15.823 6.445-2.073 15.545 2.073 6.547 5.687 9.655 22.092 15.646 34.78 24.265 47.291 7.103 14.028 3.791 12.992 1.416 3.968 2.449-.001v-2.275l1.997-26.641 3.69-32.707 3.589-42.084 1.239-11.854 5.863-14.206 11.652-7.683 9.099 4.348 7.482 10.716-1.036 6.926-4.449 28.915-8.72 45.294-5.687 30.331h3.313l3.792-3.791 15.342-20.372 25.782-32.227 11.374-12.789 13.27-14.129 8.517-6.724 16.1-.001 11.854 17.617-5.307 18.199-16.581 21.029-13.75 17.819-19.716 26.54-12.309 21.231 1.138 1.694 2.932-.278 44.536-9.479 24.062-4.347 28.714-4.928 12.992 6.066 1.416 6.167-5.106 12.613-30.71 7.583-36.018 7.204-53.636 12.689-.657.48.758.935 24.164 2.275 10.337.556h25.301l47.114 3.514 12.309 8.139 7.381 9.959-1.238 7.583-18.957 9.655-25.579-6.066-59.702-14.205-20.474-5.106-2.83-.001v1.694l17.061 16.682 31.266 28.233 39.152 36.397 1.997 8.999-5.03 7.102-5.307-.758-34.401-25.883-13.27-11.651-30.053-25.302-1.996-.001v2.654l6.926 10.136 36.574 54.975 1.895 16.859-2.653 5.485-9.479 3.311-10.414-1.895-21.408-30.054-22.092-33.844-17.819-30.331-2.173 1.238-10.515 113.261-4.929 5.788-11.374 4.348-9.478-7.204-5.03-11.652 5.03-23.027 6.066-30.052 4.928-23.886 4.449-29.674 2.654-9.858-.177-.657-2.173.278-22.37 30.71-34.021 45.977-26.919 28.815-6.445 2.553-11.173-5.789 1.037-10.337 6.243-9.2 37.257-47.392 22.47-29.371 14.508-16.961-.101-2.451h-.859l-98.954 64.251-17.618 2.275-7.583-7.103.936-11.652 3.589-3.791 29.749-20.474-.101.102.024.101z"
      />
    </svg>
  )
})

const PerplexityIcon = memo(function PerplexityIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 512 509.64"
      xmlns="http://www.w3.org/2000/svg"
      shapeRendering="geometricPrecision"
      textRendering="geometricPrecision"
      imageRendering="optimizeQuality"
      fillRule="evenodd"
      clipRule="evenodd"
      aria-hidden="true"
    >
      <path
        fill="#1F1F1F"
        d="M115.613 0h280.774C459.974 0 512 52.025 512 115.612v278.415c0 63.587-52.026 115.613-115.613 115.613H115.613C52.026 509.64 0 457.614 0 394.027V115.612C0 52.025 52.026 0 115.613 0z"
      />
      <path
        fill="#fff"
        fillRule="nonzero"
        d="M348.851 128.063l-68.946 58.302h68.946v-58.302zm-83.908 48.709l100.931-85.349v94.942h32.244v143.421h-38.731v90.004l-94.442-86.662v83.946h-17.023v-83.906l-96.596 86.246v-89.628h-37.445V186.365h38.732V90.768l95.309 84.958v-83.16h17.023l-.002 84.206zm-29.209 26.616c-34.955.02-69.893 0-104.83 0v109.375h20.415v-27.121l84.415-82.254zm41.445 0l82.208 82.324v27.051h21.708V203.388c-34.617 0-69.274.02-103.916 0zm-42.874-17.023l-64.669-57.646v57.646h64.669zm13.617 124.076v-95.2l-79.573 77.516v88.731l79.573-71.047zm17.252-95.022v94.863l77.19 70.83c0-29.485-.012-58.943-.012-88.425l-77.178-77.268z"
      />
    </svg>
  )
})

// Types
interface OpenInAIProps {
  /** The raw markdown content - for copy functionality */
  markdownContent: string
  /** The current page URL (can be relative, will be made absolute) */
  pageUrl: string
  /** Optional slug for analytics */
  docSlug?: string
  /** Additional CSS classes */
  className?: string
  /** Label for the copy markdown button */
  copyLabel?: string
}

interface AIOption {
  id: string
  name: string
  description: string
  icon: React.ReactNode
  getUrl: (pageUrl: string) => string
}

// URL builder functions - pure functions for better testability
const buildChatGPTUrl = (pageUrl: string): string =>
  `https://chatgpt.com/?hints=search&q=${encodeURIComponent(`Read from ${pageUrl} so I can ask questions about it.`)}`

const buildClaudeUrl = (pageUrl: string): string =>
  `https://claude.ai/new?q=${encodeURIComponent(`Read from ${pageUrl}.md so I can ask questions about it.`)}`

const buildPerplexityUrl = (pageUrl: string): string =>
  `https://www.perplexity.ai/search/new?q=${encodeURIComponent(`Read from ${pageUrl}.md so I can ask questions about it.`)}`

// AI options configuration - defined outside component as static data
const AI_OPTIONS: AIOption[] = [
  {
    id: 'chatgpt',
    name: 'Open in ChatGPT',
    description: 'Ask questions about this page',
    icon: <ChatGPTIcon />,
    getUrl: buildChatGPTUrl,
  },
  {
    id: 'claude',
    name: 'Open in Claude',
    description: 'Ask questions about this page',
    icon: <ClaudeIcon />,
    getUrl: buildClaudeUrl,
  },
  {
    id: 'perplexity',
    name: 'Open in Perplexity',
    description: 'Ask questions about this page',
    icon: <PerplexityIcon />,
    getUrl: buildPerplexityUrl,
  },
]

// Shared button styles - defined outside component to prevent recreation
const BASE_BUTTON_STYLES =
  'inline-flex items-center justify-center text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signoz_robin-500 focus-visible:ring-offset-2 focus-visible:ring-offset-signoz_ink-500 disabled:cursor-not-allowed disabled:opacity-50'

// Utility function to get absolute URL - handles SSR safely
function getAbsoluteUrl(url: string): string {
  // Already absolute
  if (url.startsWith('http')) return url

  // Client-side: use window.location.origin
  if (typeof window !== 'undefined') {
    const origin = window.location.origin
    return `${origin}${url.startsWith('/') ? '' : '/'}${url}`
  }

  // SSR fallback
  return `${SIGNOZ_BASE_URL}${url.startsWith('/') ? '' : '/'}${url}`
}

// Main component
function OpenInAI({
  markdownContent,
  pageUrl,
  docSlug,
  className,
  copyLabel = 'Copy markdown',
}: OpenInAIProps) {
  const [copied, setCopied] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const logEvent = useLogEvent()

  // Memoize absolute URL to prevent recalculation on every render
  const absolutePageUrl = useMemo(() => getAbsoluteUrl(pageUrl), [pageUrl])

  // Memoized copy handler
  const handleCopy = useCallback(async () => {
    if (!markdownContent || isLoading) return

    setIsLoading(true)
    try {
      await navigator.clipboard.writeText(markdownContent)
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
      setIsLoading(false)
    }
  }, [markdownContent, isLoading, logEvent, copyLabel, docSlug])

  // Memoized AI open handler factory
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
      setIsOpen(false)
    },
    [logEvent, absolutePageUrl, docSlug]
  )

  const isDisabled = isLoading || !markdownContent

  return (
    <div className={cn('flex items-center', className)}>
      {/* Button group container */}
      <div className="flex items-center rounded-md border border-signoz_slate-400 bg-signoz_ink-400">
        {/* Copy markdown button */}
        <button
          type="button"
          onClick={handleCopy}
          disabled={isDisabled}
          className={cn(
            BASE_BUTTON_STYLES,
            'h-8 gap-1.5 rounded-l-md px-3 text-signoz_vanilla-400',
            'hover:bg-signoz_ink-300 hover:text-signoz_vanilla-100',
            copied && 'text-signoz_forest-500'
          )}
          aria-label={copyLabel}
          title={copyLabel}
        >
          {copied ? <Check size={14} aria-hidden="true" /> : <Copy size={14} aria-hidden="true" />}
          <span className="hidden lg:inline">{copied ? 'Copied!' : copyLabel}</span>
        </button>

        {/* Divider */}
        <div className="h-4 w-px bg-signoz_slate-400" aria-hidden="true" />

        {/* Dropdown trigger */}
        <Popover
          isOpen={isOpen}
          onOpenChange={setIsOpen}
          placement="bottom-end"
          offset={4}
          classNames={{
            content: 'p-0 bg-signoz_ink-400 border border-signoz_slate-400 rounded-lg shadow-xl',
          }}
        >
          <PopoverTrigger>
            <button
              type="button"
              className={cn(
                BASE_BUTTON_STYLES,
                'size-8 rounded-r-md text-signoz_vanilla-400',
                'hover:bg-signoz_ink-300 hover:text-signoz_vanilla-100',
                isOpen && 'bg-signoz_ink-300 text-signoz_vanilla-100'
              )}
              aria-label="More options"
              aria-expanded={isOpen}
              aria-haspopup="menu"
              title="More options"
            >
              <ChevronDown
                size={14}
                aria-hidden="true"
                className={cn('transition-transform duration-150', isOpen && 'rotate-180')}
              />
            </button>
          </PopoverTrigger>
          <PopoverContent>
            <div className="min-w-[280px] py-1" role="menu">
              {/* Copy markdown option in dropdown */}
              <button
                type="button"
                role="menuitem"
                onClick={handleCopy}
                disabled={isDisabled}
                className="flex w-full items-start gap-3 px-4 py-3 text-left transition-colors hover:bg-signoz_ink-300 disabled:cursor-not-allowed disabled:opacity-50"
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

              {/* Divider */}
              <div
                className="my-1 border-t border-signoz_slate-400"
                role="separator"
                aria-hidden="true"
              />

              {/* AI options */}
              {AI_OPTIONS.map((option) => (
                <button
                  key={option.id}
                  type="button"
                  role="menuitem"
                  onClick={() => handleOpenInAI(option)}
                  className="flex w-full items-start gap-3 px-4 py-3 text-left transition-colors hover:bg-signoz_ink-300"
                >
                  <div className="mt-0.5 flex-shrink-0" aria-hidden="true">
                    {option.icon}
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
                    <span className="text-xs text-signoz_vanilla-400">{option.description}</span>
                  </div>
                </button>
              ))}
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  )
}

export default memo(OpenInAI)
