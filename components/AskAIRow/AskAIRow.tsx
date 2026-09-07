'use client'

import { memo, useCallback } from 'react'
import { usePathname } from 'next/navigation'
import { ArrowUpRight } from 'lucide-react'
import type { IconType } from 'react-icons'
import { SiClaude, SiGooglegemini, SiOpenai, SiPerplexity } from 'react-icons/si'

import { cn } from '../../app/lib/utils'
import { useLogEvent } from '@/hooks/useLogEvent'

const ASK_AI_PROMPT = `I want to learn more about SigNoz Cloud which brings traces, metrics, and logs into one OpenTelemetry-native platform, with simple usage-based pricing and the freedom to run it on our own infrastructure.
Read https://signoz.io/, https://signoz.io/docs, and https://signoz.io/agent-native-observability. Explain what SigNoz does, how engineers and AI agents use it to find and troubleshoot production issues, what it integrates with, and how it differs from other monitoring tools. Use clear examples and include links to your sources.`

const ENCODED_PROMPT = encodeURIComponent(ASK_AI_PROMPT)

type AskAIProvider = {
  id: string
  label: string
  Icon: IconType
  url: string
}

const ASK_AI_PROVIDERS: AskAIProvider[] = [
  {
    id: 'chatgpt',
    label: 'ChatGPT',
    Icon: SiOpenai,
    url: `https://chatgpt.com/?hints=search&q=${ENCODED_PROMPT}`,
  },
  {
    id: 'claude',
    label: 'Claude',
    Icon: SiClaude,
    url: `https://claude.ai/new?q=${ENCODED_PROMPT}`,
  },
  {
    id: 'ai-mode',
    label: 'AI Mode',
    Icon: SiGooglegemini,
    url: `https://www.google.com/search?udm=50&q=${ENCODED_PROMPT}`,
  },
  {
    id: 'perplexity',
    label: 'Perplexity',
    Icon: SiPerplexity,
    url: `https://www.perplexity.ai/search/new?q=${ENCODED_PROMPT}`,
  },
]

const buttonClass =
  'inline-flex h-8 items-center gap-1.5 rounded-[4px] border border-[var(--l1-border)] bg-[var(--l2-background-60)] px-2.5 text-[13px] leading-none text-[var(--l2-foreground)] transition-colors hover:bg-[var(--l1-background-hover)] hover:text-[var(--l1-foreground-hover)]'

function AskAIRow({ className }: { className?: string }) {
  const pathname = usePathname()
  const logEvent = useLogEvent()

  const handleClick = useCallback(
    (provider: AskAIProvider) => {
      logEvent({
        eventName: 'Website Click',
        eventType: 'track',
        attributes: {
          clickType: 'External Click',
          clickName: 'Open in AI Button',
          clickText: provider.label,
          clickLocation: 'Footer',
          pageLocation: pathname,
        },
      })
      window.open(provider.url, '_blank', 'noopener,noreferrer')
    },
    [logEvent, pathname]
  )

  return (
    <div
      data-markdown-ignore=""
      className={cn('flex flex-wrap items-center gap-x-4 gap-y-3', className)}
    >
      <span className="text-sm font-medium text-[var(--l2-foreground)]">Ask AI about SigNoz</span>
      <div className="flex flex-wrap items-center gap-2">
        {ASK_AI_PROVIDERS.map((provider) => (
          <button
            key={provider.id}
            type="button"
            onClick={() => handleClick(provider)}
            className={buttonClass}
            aria-label={`Open in ${provider.label}`}
            title={`Open in ${provider.label}`}
          >
            <provider.Icon className="size-3.5 shrink-0" aria-hidden="true" />
            <span className="whitespace-nowrap">{provider.label}</span>
            <ArrowUpRight className="size-3 shrink-0" aria-hidden="true" />
          </button>
        ))}
      </div>
    </div>
  )
}

export default memo(AskAIRow)
